import type { N8nFormPayload, N8nFormResponse, N8nPopupPayload, N8nPopupResponse, PopupFormData, PassFormPayload, LasFormPayload } from '../types';
import { N8N_WEBHOOK_URL, API_TIMEOUT } from '../config/constants';
import { useFormStore } from '../store/useFormStore';
import { SPECIALITES, UNIVERSITES } from '../config/questions.config';

function createAbortController(timeout: number): { controller: AbortController; timeoutId: ReturnType<typeof setTimeout> } {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
}

export async function submitForm(payload: N8nFormPayload): Promise<N8nFormResponse> {
  const { controller, timeoutId } = createAbortController(API_TIMEOUT);

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Le webhook retourne du texte brut (la lettre directement)
    const text = await response.text();

    if (text && text.trim()) {
      return {
        success: true,
        letter: text.trim(),
      };
    }

    return {
      success: false,
      error: 'La lettre générée est vide.',
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'La génération a pris trop de temps. Réessaie dans quelques instants.',
      };
    }

    return {
      success: false,
      error: 'Impossible de contacter le serveur. Vérifie ta connexion et réessaie.',
    };
  }
}

export async function submitPopup(popupData: PopupFormData, formData: N8nFormPayload): Promise<N8nPopupResponse> {
  const { controller, timeoutId } = createAbortController(API_TIMEOUT);

  const payload: N8nPopupPayload = {
    ...popupData,
    formData,
  };

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: 'lead_capture', ...payload }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as N8nPopupResponse;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      return {
        success: false,
        error: 'La requête a pris trop de temps. Réessaie.',
      };
    }

    return {
      success: false,
      error: 'Erreur de connexion. Réessaie.',
    };
  }
}

// Helper to get label from value
function getLabel(value: string, options: { value: string; label: string }[]): string {
  return options.find((opt) => opt.value === value)?.label || value;
}

// Helper to build form payload from store
export function buildFormPayload(): N8nFormPayload {
  const { answers, parcours } = useFormStore.getState();

  // Récupérer les labels au lieu des values pour les dropdowns
  const universityLabel = getLabel(answers.university as string, UNIVERSITES);
  const specialite1Label = getLabel(answers.specialite1 as string, SPECIALITES);
  const specialite2Label = getLabel(answers.specialite2 as string, SPECIALITES);

  // Base commune
  const basePayload = {
    university: universityLabel,
    specialite1: specialite1Label,
    moyenne1: Number(answers.moyenne1),
    specialite2: specialite2Label,
    moyenne2: Number(answers.moyenne2),
    organisation: answers.organisation as string,
    activiteReguliere: answers.activiteReguliere as string,
    jpo: answers.jpo as boolean,
    ...(answers.jpo === true && { jpoRetenu: answers.jpoRetenu as string }),
    attractionFac: answers.attractionFac as string,
  };

  if (parcours === 'PASS') {
    const passPayload: PassFormPayload = {
      ...basePayload,
      parcours: 'PASS',
      mineures: answers.mineures as string,
      projetScientifique: answers.projetScientifique as string,
      motivationSante: answers.motivationSante as string,
      experienceSante: answers.experienceSante as string,
      planB: answers.planB as string,
    };
    return passPayload;
  } else {
    const lasPayload: LasFormPayload = {
      ...basePayload,
      parcours: 'LAS',
      licenceMajeure: answers.licenceMajeure as string,
      motivationLicence: answers.motivationLicence as string,
      projetAcademique: answers.projetAcademique as string,
      projetPro: answers.projetPro as string,
      interetSante: answers.interetSante as string,
      lienLicenceSante: answers.lienLicenceSante as string,
    };
    return lasPayload;
  }
}

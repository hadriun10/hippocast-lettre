import type { N8nFormPayload, N8nFormResponse, N8nPopupPayload, N8nPopupResponse, PopupFormData, PassFormPayload, LasFormPayload } from '../types';
import { N8N_WEBHOOK_URL, N8N_WEBHOOK_URL_LEAD, N8N_WEBHOOK_URL_RDV, API_TIMEOUT } from '../config/constants';
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
    const response = await fetch(N8N_WEBHOOK_URL_LEAD, {
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

// Génère un userId unique
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Récupère l'utm_source de l'URL
function getUtmSource(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get('utm_source') || '';
}

// Helper to build form payload from store
export function buildFormPayload(): N8nFormPayload {
  let { userId } = useFormStore.getState();
  const { answers, parcours, setUserId } = useFormStore.getState();

  // Générer le userId au moment de l'envoi s'il n'existe pas
  if (!userId) {
    userId = generateUserId();
    setUserId(userId);
  }

  // Récupérer l'utm_source
  const utmSource = getUtmSource();

  // Récupérer les labels au lieu des values pour les dropdowns
  const universityLabel = getLabel(answers.university as string, UNIVERSITES);
  const specialite1Label = getLabel(answers.specialite1 as string, SPECIALITES);
  const specialite2Label = getLabel(answers.specialite2 as string, SPECIALITES);

  // Base commune
  const basePayload = {
    userId,
    utmSource,
    classe: answers.classe as string,
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

// Envoie un poke à n8n quand l'utilisateur clique sur "Faire relire ma lettre" (une seule fois par userId)
export async function notifyRdvClick(prepaNom: string, prepaVille: string): Promise<void> {
  if (!N8N_WEBHOOK_URL_RDV) return;

  const { userId, answers, parcours } = useFormStore.getState();

  // Vérifier si on a déjà envoyé pour cet userId
  const storageKey = `rdv_notified_${userId}`;
  if (localStorage.getItem(storageKey)) return;

  const universityLabel = getLabel(answers.university as string, UNIVERSITES);

  try {
    await fetch(N8N_WEBHOOK_URL_RDV, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'rdv_prepa_click',
        userId,
        prepaNom,
        prepaVille,
        university: universityLabel,
        parcours,
        classe: answers.classe as string,
        timestamp: new Date().toISOString(),
      }),
    });

    // Marquer comme envoyé
    localStorage.setItem(storageKey, 'true');
  } catch (error) {
    // Silently fail - on ne bloque pas l'utilisateur si le webhook échoue
    console.error('Failed to notify RDV click:', error);
  }
}

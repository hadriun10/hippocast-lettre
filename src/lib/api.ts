import type { N8nFormPayload, N8nFormResponse, N8nPopupPayload, N8nPopupResponse, PopupFormData } from '../types';
import { N8N_WEBHOOK_URL, API_TIMEOUT } from '../config/constants';
import { useFormStore } from '../store/useFormStore';

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

    const data = await response.json();
    return data as N8nFormResponse;
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

// Helper to build form payload from store
export function buildFormPayload(): N8nFormPayload {
  const { answers, parcours } = useFormStore.getState();

  return {
    parcours: parcours!,
    university: answers.university as string,
    sousVoeux: parcours === 'PASS' ? Number(answers.sousVoeux) : undefined,
    licenceMajeure: parcours === 'LAS' ? (answers.licenceMajeure as string) : undefined,
    ...answers,
  };
}

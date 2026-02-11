import posthog from 'posthog-js';
import { POSTHOG_KEY, POSTHOG_HOST } from '../config/constants';

// Initialize PostHog
export function initPostHog() {
  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: true,
      capture_pageleave: true,
    });
  }
}

// Identify user with their properties
interface UserProperties {
  email: string;
  prenom?: string;
  telephone?: string;
  isParent: boolean;
  consent: boolean;
}

export function identifyUser(properties: UserProperties) {
  if (POSTHOG_KEY) {
    posthog.identify(properties.email, {
      email: properties.email,
      prenom: properties.prenom,
      telephone: properties.telephone,
      is_parent: properties.isParent,
      consent: properties.consent,
    });
  }
}

// Tracking functions
export const track = {
  formStarted: () => {
    if (POSTHOG_KEY) {
      posthog.capture('form_started');
    }
  },

  blocCompleted: (block: number) => {
    if (POSTHOG_KEY) {
      posthog.capture('bloc_completed', { block });
    }
  },

  generationStarted: () => {
    if (POSTHOG_KEY) {
      posthog.capture('generation_started');
    }
  },

  popupDisplayed: () => {
    if (POSTHOG_KEY) {
      posthog.capture('popup_displayed');
    }
  },

  leadCaptured: (consent: string, userType?: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('lead_captured', { consent, user_type: userType });
    }
  },

  letterRevealed: () => {
    if (POSTHOG_KEY) {
      posthog.capture('letter_revealed');
    }
  },

  shareClicked: () => {
    if (POSTHOG_KEY) {
      posthog.capture('share_clicked');
    }
  },

  faireRelireClicked: () => {
    if (POSTHOG_KEY) {
      posthog.capture('faire_relire_clicked');
    }
  },

  rdvClicked: (prepaNom: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('rdv_clicked', { prepa_nom: prepaNom });
    }
  },
};

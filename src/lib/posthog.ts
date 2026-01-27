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

  leadCaptured: (interetPrepa: string) => {
    if (POSTHOG_KEY) {
      posthog.capture('lead_captured', { interet_prepa: interetPrepa });
    }
  },

  letterRevealed: () => {
    if (POSTHOG_KEY) {
      posthog.capture('letter_revealed');
    }
  },
};

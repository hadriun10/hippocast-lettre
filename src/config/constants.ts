// API Configuration
export const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || '';
export const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY || '';
export const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.posthog.com';

// Timeouts
export const API_TIMEOUT = 20000; // 20 seconds
export const MIN_GENERATION_TIME = 5000; // 5 seconds minimum animation

// Validation
export const MAX_LETTER_CHARACTERS = 1500;
export const PHONE_REGEX = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// UI
export const TOTAL_BLOCKS = 4;

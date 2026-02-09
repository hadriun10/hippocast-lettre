import { create } from 'zustand';
import type { FormState, Parcours, BlockStatus } from '../types';
import { getRandomEncouragingMessage } from '../config/questions.config';

export type GenerationPhase = 'idle' | 'loading' | 'letter' | 'popup' | 'waiting' | 'complete';

const initialBlockStatuses: BlockStatus[] = ['active', 'pending', 'pending', 'pending'];

interface ExtendedFormState extends FormState {
  generationPhase: GenerationPhase;
  setGenerationPhase: (phase: GenerationPhase) => void;
}

export const useFormStore = create<ExtendedFormState>((set, get) => ({
  // Navigation
  currentBlock: 0,
  visibleQuestionIndex: 0,

  // Data
  parcours: null,
  answers: {},

  // UI States
  isLoading: false,
  isGenerating: false,
  showPopup: false,
  isLetterBlurred: true,
  blockStatuses: initialBlockStatuses,
  encouragingMessage: null,
  generationPhase: 'idle',

  // Results
  letter: null,
  error: null,

  // Actions
  setAnswer: (questionId: string, value: string | number | boolean) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    }));
  },

  setParcours: (parcours: Parcours) => {
    set({ parcours });
  },

  showNextQuestion: () => {
    set((state) => ({
      visibleQuestionIndex: state.visibleQuestionIndex + 1,
    }));
  },

  goToNextBlock: () => {
    const { currentBlock, blockStatuses } = get();
    if (currentBlock < 3) {
      const newStatuses = [...blockStatuses];
      newStatuses[currentBlock] = 'completed';
      newStatuses[currentBlock + 1] = 'active';

      set({
        currentBlock: currentBlock + 1,
        visibleQuestionIndex: 0,
        blockStatuses: newStatuses,
      });
    }
  },

  goToBlock: (blockIndex: number) => {
    const { blockStatuses } = get();
    // Can only go to completed blocks or the current active one
    if (blockStatuses[blockIndex] === 'completed' || blockStatuses[blockIndex] === 'active') {
      const newStatuses = [...blockStatuses];
      // Mark destination as active
      newStatuses[blockIndex] = 'active';
      // If going back, mark previous active as completed
      const currentActiveIndex = blockStatuses.findIndex((s) => s === 'active');
      if (currentActiveIndex !== -1 && currentActiveIndex !== blockIndex) {
        newStatuses[currentActiveIndex] = 'completed';
      }

      set({
        currentBlock: blockIndex,
        visibleQuestionIndex: 999, // Show all questions for completed blocks
        blockStatuses: newStatuses,
      });
    }
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setGenerating: (generating: boolean) => set({ isGenerating: generating }),

  setShowPopup: (show: boolean) => set({ showPopup: show }),

  setLetter: (letter: string) => set({ letter }),

  revealLetter: () => set({ isLetterBlurred: false, showPopup: false }),

  setError: (error: string | null) => set({ error }),

  setGenerationPhase: (phase: GenerationPhase) => set({ generationPhase: phase }),

  showEncouragement: () => {
    // Only show encouragement randomly (40% chance)
    if (Math.random() > 0.6) {
      set({ encouragingMessage: getRandomEncouragingMessage() });
      setTimeout(() => {
        set({ encouragingMessage: null });
      }, 2500);
    }
  },

  resetForm: () =>
    set({
      currentBlock: 0,
      visibleQuestionIndex: 0,
      parcours: null,
      answers: {},
      isLoading: false,
      isGenerating: false,
      showPopup: false,
      isLetterBlurred: true,
      blockStatuses: initialBlockStatuses,
      encouragingMessage: null,
      generationPhase: 'idle',
      letter: null,
      error: null,
    }),
}));

// Types for the form application

export type Parcours = 'PASS' | 'LAS';

export type QuestionType = 'text' | 'dropdown' | 'number' | 'boolean';

export interface QuestionCondition {
  field: string;
  value: string | number | boolean;
  operator?: '==' | '!=' | '>' | '<' | '>=' | '<=';
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface DynamicLabel {
  field: string;
  value: string | number | boolean;
  label: string;
}

export interface DynamicPlaceholder {
  field: string;
  value: string | number | boolean;
  placeholder: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  dynamicLabel?: DynamicLabel;
  dynamicPlaceholder?: DynamicPlaceholder;
  placeholder?: string;
  required: boolean;
  options?: QuestionOption[];
  min?: number;
  max?: number;
  condition?: QuestionCondition;
  trueLabel?: string;
  falseLabel?: string;
  // Pour grouper spécialité + moyenne sur la même ligne
  inlineWith?: string;
  // Pour exclure la valeur sélectionnée d'un autre dropdown
  excludeFrom?: string;
}

export interface Block {
  id: number;
  title: string;
  shortTitle: string;
  questions: Question[];
}

export type TabState = 'active' | 'completed' | 'ready' | 'upcoming';

export type BlockStatus = 'pending' | 'active' | 'completed';

export interface FormState {
  // Navigation
  currentBlock: number;
  visibleQuestionIndex: number;

  // Data
  parcours: Parcours | null;
  answers: Record<string, string | number | boolean>;

  // UI States
  isLoading: boolean;
  isGenerating: boolean;
  showPopup: boolean;
  isLetterBlurred: boolean;
  blockStatuses: BlockStatus[];
  encouragingMessage: string | null;

  // Results
  letter: string | null;
  error: string | null;

  // Actions
  setAnswer: (questionId: string, value: string | number | boolean) => void;
  setParcours: (parcours: Parcours) => void;
  showNextQuestion: () => void;
  goToNextBlock: () => void;
  goToBlock: (blockIndex: number) => void;
  setLoading: (loading: boolean) => void;
  setGenerating: (generating: boolean) => void;
  setShowPopup: (show: boolean) => void;
  setLetter: (letter: string) => void;
  revealLetter: () => void;
  setError: (error: string | null) => void;
  showEncouragement: () => void;
  resetForm: () => void;
}

export interface PopupFormData {
  email: string;
  telephone: string;
  interetPrepa: 'oui-definitivement' | 'oui-peut-etre' | 'non' | 'je-ne-sais-pas';
}

export interface N8nFormPayload {
  parcours: Parcours;
  university: string;
  sousVoeux?: number;
  licenceMajeure?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface N8nFormResponse {
  success: boolean;
  letter?: string;
  error?: string;
}

export interface N8nPopupPayload extends PopupFormData {
  formData: N8nFormPayload;
}

export interface N8nPopupResponse {
  success: boolean;
  error?: string;
}

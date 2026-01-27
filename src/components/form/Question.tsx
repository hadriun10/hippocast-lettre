import type { Question as QuestionType } from '../../types';
import { TextField, Dropdown, NumberField } from '../ui';
import { BooleanField } from './BooleanField';
import { useFormStore } from '../../store/useFormStore';

interface QuestionProps {
  question: QuestionType;
  isVisible: boolean;
  onAnswered: () => void;
}

export function Question({ question, isVisible, onAnswered }: QuestionProps) {
  const { answers, setAnswer, setParcours } = useFormStore();

  const value = answers[question.id];

  // Compute dynamic label if defined
  const label = question.dynamicLabel && answers[question.dynamicLabel.field] === question.dynamicLabel.value
    ? question.dynamicLabel.label
    : question.label;

  // Compute dynamic placeholder if defined
  const placeholder = question.dynamicPlaceholder && answers[question.dynamicPlaceholder.field] === question.dynamicPlaceholder.value
    ? question.dynamicPlaceholder.placeholder
    : question.placeholder;

  // Filter options if excludeFrom is defined (exclude the value selected in another dropdown)
  const filteredOptions = question.excludeFrom && question.options
    ? question.options.filter(opt => opt.value !== answers[question.excludeFrom!])
    : question.options;

  // Pour les champs texte/number : appeler onAnswered seulement quand on passe de vide à non-vide
  const handleTextChange = (newValue: string | number) => {
    const wasEmpty = value === undefined || value === null || value === '';
    const isNowFilled = newValue !== '' && newValue !== undefined && newValue !== null;

    setAnswer(question.id, newValue);

    // Débloquer la question suivante seulement au premier caractère
    if (wasEmpty && isNowFilled) {
      onAnswered();
    }
  };

  // Pour dropdown/boolean : appeler onAnswered immédiatement
  const handleSelectChange = (newValue: string | boolean) => {
    setAnswer(question.id, newValue);

    // Special handling for parcours
    if (question.id === 'parcours' && (newValue === 'PASS' || newValue === 'LAS')) {
      setParcours(newValue);
    }

    onAnswered();
  };

  if (!isVisible) return null;

  return (
    <div>
      {question.type === 'text' && (
        <TextField
          label={label}
          value={(value as string) || ''}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder={placeholder}
          required={question.required}
          multiline={placeholder?.includes('...') && !placeholder?.startsWith('Exemple :')}
          rows={3}
        />
      )}

      {question.type === 'dropdown' && (
        <Dropdown
          label={label}
          options={filteredOptions || []}
          value={(value as string) || ''}
          onChange={handleSelectChange}
          required={question.required}
        />
      )}

      {question.type === 'number' && (
        <NumberField
          label={label}
          value={(value as number) ?? ''}
          onChange={(v) => handleTextChange(v === '' ? '' : v)}
          min={question.min}
          max={question.max}
          required={question.required}
          placeholder="/20"
        />
      )}

      {question.type === 'boolean' && (
        <BooleanField
          label={label}
          value={value as boolean | null}
          onChange={handleSelectChange}
          required={question.required}
          trueLabel={question.trueLabel}
          falseLabel={question.falseLabel}
        />
      )}
    </div>
  );
}

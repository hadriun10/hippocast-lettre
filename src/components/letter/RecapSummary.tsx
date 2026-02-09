import { useMemo } from 'react';
import { useFormStore } from '../../store/useFormStore';
import { blocks } from '../../config/questions.config';

export function RecapSummary() {
  const { answers, parcours } = useFormStore();

  const answeredQuestions = useMemo(() => {
    const result: { label: string; value: string }[] = [];

    blocks.forEach((block) => {
      block.questions.forEach((q) => {
        // Check condition
        if (q.condition) {
          const conditionValue = answers[q.condition.field];
          if (conditionValue !== q.condition.value) return;
        }

        const value = answers[q.id];
        if (value === undefined || value === null || value === '') return;

        let displayValue: string;

        if (q.type === 'boolean') {
          displayValue = value ? 'Oui' : 'Non';
        } else if (q.type === 'dropdown' && q.options) {
          const option = q.options.find((o) => o.value === value);
          displayValue = option?.label || String(value);
        } else if (q.type === 'number') {
          displayValue = `${value}/20`;
        } else {
          displayValue = String(value);
        }

        result.push({
          label: q.label.replace('?', ''),
          value: displayValue,
        });
      });
    });

    return result;
  }, [answers, parcours]);

  return (
    <div className="h-full overflow-auto">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Récapitulatif de tes réponses</h3>

      <div className="space-y-4">
        {answeredQuestions.map((item, index) => (
          <p key={index} className="text-sm text-text-primary">
            <span className="font-bold">{item.label} :</span> {item.value}
          </p>
        ))}
      </div>
    </div>
  );
}

import { useMemo, useRef, useEffect } from 'react';
import type { Block, Question as QuestionType } from '../../types';
import { Question } from './Question';
import { Button } from '../ui';
import { useFormStore } from '../../store/useFormStore';

interface QuestionBlockProps {
  block: Block;
  isLastBlock: boolean;
  onComplete: () => void;
  onGenerate: () => void;
}

// Group questions that should be displayed inline
interface QuestionGroup {
  main: QuestionType;
  inline?: QuestionType;
}

export function QuestionBlock({ block, isLastBlock, onComplete, onGenerate }: QuestionBlockProps) {
  const { answers, parcours, showEncouragement, blockStatuses, currentBlock } =
    useFormStore();

  const handleQuestionAnswered = () => {
    showEncouragement();
  };

  // Filter questions based on conditions
  const visibleQuestions = useMemo(() => {
    return block.questions.filter((q) => {
      if (!q.condition) return true;

      const conditionValue = answers[q.condition.field];
      const operator = q.condition.operator || '==';

      switch (operator) {
        case '==':
          return conditionValue === q.condition.value;
        case '!=':
          return conditionValue !== q.condition.value;
        default:
          return conditionValue === q.condition.value;
      }
    });
  }, [block.questions, answers, parcours]);

  // Group questions for inline display
  const questionGroups = useMemo(() => {
    const groups: QuestionGroup[] = [];
    const inlinedIds = new Set<string>();

    visibleQuestions.forEach((q) => {
      // Skip if this question is already part of an inline group
      if (inlinedIds.has(q.id)) return;

      if (q.inlineWith) {
        const inlineQuestion = visibleQuestions.find((vq) => vq.id === q.inlineWith);
        if (inlineQuestion) {
          inlinedIds.add(inlineQuestion.id);
          groups.push({ main: q, inline: inlineQuestion });
        } else {
          groups.push({ main: q });
        }
      } else {
        groups.push({ main: q });
      }
    });

    return groups;
  }, [visibleQuestions]);

  // Check if all required questions are answered
  const isBlockComplete = useMemo(() => {
    return visibleQuestions.every((q) => {
      if (!q.required) return true;
      const value = answers[q.id];
      if (value === undefined || value === null || value === '') return false;
      return true;
    });
  }, [visibleQuestions, answers]);

  // Helper pour vérifier si un groupe est complet
  const isGroupComplete = (group: QuestionGroup) => {
    if (group.main.type === 'info') return true;
    if (!group.main.required) return true;

    const mainValue = answers[group.main.id];
    const mainFilled = mainValue !== undefined && mainValue !== null && mainValue !== '';

    if (group.inline) {
      const inlineValue = answers[group.inline.id];
      const inlineFilled = inlineValue !== undefined && inlineValue !== null && inlineValue !== '';
      return mainFilled && inlineFilled;
    }

    return mainFilled;
  };

  // Determine how many groups to show based on completion
  const isBlockAlreadyCompleted = blockStatuses[currentBlock] === 'completed';
  const groupsToShow = useMemo(() => {
    if (isBlockAlreadyCompleted) return questionGroups.length;

    // Afficher tous les groupes jusqu'au premier groupe incomplet + 1
    let count = 1;
    for (let i = 0; i < questionGroups.length - 1; i++) {
      if (isGroupComplete(questionGroups[i])) {
        count++;
      } else {
        break;
      }
    }
    return Math.min(count, questionGroups.length);
  }, [questionGroups, answers, isBlockAlreadyCompleted]);

  // Ref pour le scroll automatique
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll automatique vers le bas quand une nouvelle question apparaît ou le bouton
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [groupsToShow, isBlockComplete]);

  return (
    <div className="bg-bg-form bg-organic-lines border-2 border-border rounded-none rounded-b-xl p-4 md:p-8 relative z-10 md:flex-1 md:overflow-y-auto" ref={scrollRef}>
      <div className="space-y-4">
        {questionGroups.slice(0, groupsToShow).map((group) => (
          <div key={group.main.id} className={group.inline ? 'flex gap-2 md:gap-4 items-end' : ''}>
            <div className={group.inline ? 'flex-1 min-w-0' : ''}>
              <Question
                question={group.main}
                isVisible={true}
                onAnswered={handleQuestionAnswered}
              />
            </div>
            {group.inline && (
              <div className="w-16 md:w-24 flex-shrink-0">
                <Question
                  question={group.inline}
                  isVisible={true}
                  onAnswered={handleQuestionAnswered}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Next block / Generate button */}
      {isBlockComplete && (
        <div className="mt-8">
          {isLastBlock ? (
            <Button onClick={onGenerate} className="w-full">
              Générer ma lettre
            </Button>
          ) : (
            <Button onClick={onComplete} className="w-full">
              Passer à l'étape suivante
            </Button>
          )}
        </div>
      )}

    </div>
  );
}

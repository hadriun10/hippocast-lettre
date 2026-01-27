import { useMemo } from 'react';
import { Tab } from './Tab';
import type { TabState, BlockStatus } from '../../types';
import { blocks } from '../../config/questions.config';
import { useFormStore } from '../../store/useFormStore';

function getTabState(
  status: BlockStatus,
  index: number,
  currentBlock: number,
  isCurrentBlockComplete: boolean
): TabState {
  if (status === 'active') return 'active';
  if (status === 'completed') return 'completed';
  // La languette suivante ne devient "ready" que si le bloc actuel est complété
  if (status === 'pending' && index === currentBlock + 1 && isCurrentBlockComplete) return 'ready';
  return 'upcoming';
}

interface TabsProps {
  disabled?: boolean;
}

export function Tabs({ disabled = false }: TabsProps) {
  const { currentBlock, blockStatuses, goToBlock, answers } = useFormStore();

  // Vérifier si le bloc actuel est complété
  const isCurrentBlockComplete = useMemo(() => {
    const currentBlockData = blocks[currentBlock];
    if (!currentBlockData) return false;

    // Filtrer les questions visibles (selon conditions)
    const visibleQuestions = currentBlockData.questions.filter((q) => {
      if (!q.condition) return true;
      const conditionValue = answers[q.condition.field];
      return conditionValue === q.condition.value;
    });

    // Vérifier que toutes les questions requises sont répondues
    return visibleQuestions.every((q) => {
      if (!q.required) return true;
      const value = answers[q.id];
      if (value === undefined || value === null || value === '') return false;
      return true;
    });
  }, [currentBlock, answers]);

  return (
    <div className="flex w-full gap-1 items-end relative">
      {blocks.map((block, index) => {
        const state = getTabState(blockStatuses[index], index, currentBlock, isCurrentBlockComplete);
        return (
          <Tab
            key={block.id}
            title={block.shortTitle}
            state={disabled ? 'completed' : state}
            onClick={disabled ? undefined : () => goToBlock(index)}
          />
        );
      })}
    </div>
  );
}

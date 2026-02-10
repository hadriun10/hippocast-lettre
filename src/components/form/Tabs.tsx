import { useMemo, useState, useEffect } from 'react';
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

// Messages d'erreur selon le bloc à compléter
const ERROR_MESSAGES: Record<number, string> = {
  0: 'Complète ton profil avant',
  1: 'Complète ton parcours avant',
  2: 'Complète ta méthode de travail avant',
  3: 'Complète tes expériences avant',
};

interface TabsProps {
  disabled?: boolean;
}

export function Tabs({ disabled = false }: TabsProps) {
  const { currentBlock, blockStatuses, goToBlock, goToNextBlock, answers } = useFormStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorTabIndex, setErrorTabIndex] = useState<number | null>(null);

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

  // Cacher le message d'erreur après 3 secondes
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
        setErrorTabIndex(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleTabClick = (index: number, state: TabState) => {
    if (disabled) return;

    // Si l'onglet est accessible, naviguer
    if (state === 'completed' || state === 'active') {
      goToBlock(index);
    } else if (state === 'ready') {
      // Onglet suivant prêt - utiliser goToNextBlock
      goToNextBlock();
    } else {
      // Onglet non accessible - afficher message d'erreur
      // Trouver le premier bloc non complété avant celui-ci
      let blockToComplete = currentBlock;
      for (let i = 0; i < index; i++) {
        if (blockStatuses[i] !== 'completed') {
          blockToComplete = i;
          break;
        }
      }
      setErrorMessage(ERROR_MESSAGES[blockToComplete] || 'Complète les étapes précédentes');
      setErrorTabIndex(index);
    }
  };

  return (
    <div className="flex w-full gap-1 items-end relative">
      {blocks.map((block, index) => {
        const state = getTabState(blockStatuses[index], index, currentBlock, isCurrentBlockComplete);
        return (
          <div key={block.id} className="flex-1 relative">
            <Tab
              title={block.shortTitle}
              state={disabled ? 'completed' : state}
              onClick={() => handleTabClick(index, state)}
              showError={errorTabIndex === index}
              errorMessage={errorMessage}
            />
          </div>
        );
      })}
    </div>
  );
}

import type { TabState } from '../../types';

interface TabProps {
  title: string;
  state: TabState;
  onClick?: () => void;
}

export function Tab({ title, state, onClick }: TabProps) {
  const isClickable = state === 'completed' || state === 'ready';
  const isActive = state === 'active';

  // State-specific styles
  // Toutes les languettes sans bordure en bas
  // L'onglet actif a z-20 (devant le bloc), les autres n'ont pas de z-index (derrière le bloc)
  const stateStyles = {
    active: 'bg-tab-active border-2 border-border border-b-0 py-3 z-20',
    completed: 'bg-tab-completed border-2 border-border border-b-0 py-2 cursor-pointer hover:opacity-80',
    ready: 'bg-violet text-white border-2 border-border border-b-0 py-2 cursor-pointer hover:bg-violet-dark',
    upcoming: 'bg-white border-2 border-border border-b-0 py-2 cursor-not-allowed opacity-60',
  };

  return (
    <button
      type="button"
      onClick={isClickable ? onClick : undefined}
      disabled={!isClickable}
      className={`
        flex-1
        px-4 rounded-t-lg
        flex items-center justify-start
        font-bold text-sm
        transition-all duration-200
        ${stateStyles[state]}
      `}
      style={{ marginBottom: isActive ? '-2px' : '0' }}
    >
      {title}
    </button>
  );
}

import type { TabState } from '../../types';

interface TabProps {
  title: string;
  state: TabState;
  onClick?: () => void;
  showError?: boolean;
  errorMessage?: string | null;
}

export function Tab({ title, state, onClick, showError, errorMessage }: TabProps) {
  const isActive = state === 'active';

  // State-specific styles
  // Toutes les languettes sans bordure en bas
  // L'onglet actif a z-20 (devant le bloc), les autres n'ont pas de z-index (derrière le bloc)
  const stateStyles = {
    active: 'bg-tab-active border-2 border-border border-b-0 py-3 z-20',
    completed: 'bg-tab-completed border-2 border-border border-b-0 py-2 cursor-pointer hover:opacity-80',
    ready: 'bg-violet text-white border-2 border-border border-b-0 py-2 cursor-pointer hover:bg-violet-dark',
    upcoming: 'bg-white border-2 border-border border-b-0 py-2 cursor-pointer opacity-60 hover:opacity-80',
  };

  return (
    <div className="relative">
      {/* Message d'erreur au-dessus de l'onglet */}
      {showError && errorMessage && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-fade-in"
        >
          <div className="bg-red-500 text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            {errorMessage}
          </div>
          {/* Flèche vers le bas */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-500" />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={onClick}
        className={`
          w-full
          px-2 md:px-4 rounded-t-lg
          flex items-center justify-center md:justify-start
          font-bold text-xs md:text-sm
          transition-all duration-200
          truncate
          ${stateStyles[state]}
        `}
        style={{ marginBottom: isActive ? '-2px' : '0' }}
      >
        {title}
      </button>
    </div>
  );
}

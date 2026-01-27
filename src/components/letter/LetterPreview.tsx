import { useFormStore } from '../../store/useFormStore';
import { LoadingAnimation } from './LoadingAnimation';

export function LetterPreview() {
  const { letter, isGenerating, isLetterBlurred, currentBlock, encouragingMessage } = useFormStore();

  // Not yet at generation phase
  if (!isGenerating && !letter) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <div className="w-16 h-16 bg-violet/10 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Ta lettre apparaîtra ici</h3>
        <p className="text-text-secondary text-sm max-w-xs">
          Réponds aux questions pour générer une lettre de motivation personnalisée pour Parcoursup.
        </p>

        {/* Encouraging message */}
        {encouragingMessage && (
          <div className="mt-6 px-4 py-2 bg-violet/10 rounded-lg">
            <p className="text-violet font-medium">{encouragingMessage}</p>
          </div>
        )}

        {/* Progress indicator */}
        <div className="mt-6 flex items-center gap-2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-8 h-1 rounded-full transition-colors ${
                index <= currentBlock ? 'bg-violet' : 'bg-violet/20'
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-text-secondary">Étape {currentBlock + 1} sur 4</p>
      </div>
    );
  }

  // Generating
  if (isGenerating) {
    return <LoadingAnimation />;
  }

  // Letter ready (blurred or revealed)
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Ta lettre de motivation</h3>
        {!isLetterBlurred && (
          <span className="text-xs text-text-secondary">{letter?.length || 0} / 1500 caractères</span>
        )}
      </div>

      <div
        className={`flex-1 bg-white rounded-block border border-border p-6 overflow-auto ${
          isLetterBlurred ? 'blur-letter' : 'blur-letter revealed'
        }`}
      >
        <p className="text-text-primary whitespace-pre-wrap leading-relaxed">{letter}</p>
      </div>

      {isLetterBlurred && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 text-center">
            <p className="text-text-primary font-medium">Remplis le formulaire pour voir ta lettre</p>
          </div>
        </div>
      )}
    </div>
  );
}

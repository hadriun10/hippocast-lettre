interface ConsentReminderModal1Props {
  isOpen: boolean;
  onAccept: () => void;
  onRefuse: () => void;
}

export function ConsentReminderModal1({ isOpen, onAccept, onRefuse }: ConsentReminderModal1Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white border-2 border-black rounded-lg w-full max-w-md shadow-2xl animate-fade-in">
        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-text-primary text-center mb-4">
            Des conseils qui peuvent faire la difference
          </h2>

          {/* Main message */}
          <p className="text-base text-gray-700 mb-4">
            La PASS/LAS, c'est la jungle. Souhaites-tu echanger gratuitement avec quelqu'un qui est
            deja passe par la, pour t'aider dans ton orientation et ta methode de travail ?
          </p>

          {/* Info text */}
          <p className="text-xs text-gray-600 mb-6">
            En acceptant, tu autorises Hippocast a transmettre tes coordonnees a un partenaire
            educatif afin que tu puisses recevoir ces conseils.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onAccept}
              className="w-full px-8 py-3 bg-violet hover:bg-violet-dark text-white font-semibold rounded-lg transition-colors"
            >
              Oui, merci
            </button>
            <button
              onClick={onRefuse}
              className="w-full px-8 py-3 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg transition-colors"
            >
              Non, je continue sans aide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

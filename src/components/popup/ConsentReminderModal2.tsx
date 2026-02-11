interface ConsentReminderModal2Props {
  isOpen: boolean;
  onAccept: () => void;
  onRefuse: () => void;
}

const advantages = [
  'Choisir entre PASS ou LAS selon ton profil',
  'Trouver la mineure la plus facile dans ta fac',
  'Augmenter tes chances de réussir',
  'Savoir quelle fac te correspond vraiment',
];

export function ConsentReminderModal2({ isOpen, onAccept, onRefuse }: ConsentReminderModal2Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white border-2 border-black rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in">
        <div className="p-6">
          {/* Title */}
          <h2 className="text-2xl font-bold text-black mb-6">
            Tu es sur(e) ? Tu risques de passer à côté d'aide pour :
          </h2>

          {/* Advantages list */}
          <div className="space-y-3 mb-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-green-600 text-xl font-bold flex-shrink-0">✓</span>
                <span className="text-base text-gray-700">{advantage}</span>
              </div>
            ))}
          </div>

          {/* Info text */}
          <p className="text-xs text-gray-600 mb-6">
            En acceptant, tu autorises Hippocast a transmettre tes coordonnees a un partenaire
            educatif afin que tu puisses recevoir ces conseils.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onAccept}
              className="w-full px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
            >
              Oui, je veux être aidé(e)
            </button>
            <button
              onClick={onRefuse}
              className="w-full px-8 py-3 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded-lg transition-colors"
            >
              Non merci
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { notifyRdvClick } from '../../lib/api';
import { useFormStore } from '../../store/useFormStore';

interface PrepaRdvPopupProps {
  isOpen: boolean;
  onClose: () => void;
  prepaNom: string;
  prepaVille: string;
  prepaLien: string;
}

export function PrepaRdvPopup({ isOpen, onClose, prepaNom, prepaVille, prepaLien }: PrepaRdvPopupProps) {
  const { parcours } = useFormStore();

  if (!isOpen) return null;

  const handleRdv = () => {
    // Notifier n8n du clic
    notifyRdvClick(prepaNom, prepaVille);
    window.open(prepaLien, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="bg-white border-2 border-black rounded-lg w-full max-w-md shadow-2xl animate-fade-in overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-6"></div>
            <h2 className="text-xl font-bold text-text-primary text-center flex-1">Fais relire ta lettre par un expert</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-text-primary">
              <span className="font-semibold">{prepaNom}</span> à <span className="font-semibold">{prepaVille}</span> est notre prépa partenaire dans ta ville.
            </p>

            {/* Image équipe */}
            <img
              src="/equipe_hippocast.webp"
              alt="Équipe Hippocast"
              className="w-full rounded-lg"
            />
            
            <div className="bg-violet/5 border border-violet/20 rounded-lg p-4">
              <p className="text-sm text-text-primary">
                <span className="font-semibold">Leurs experts en études de santé</span> peuvent relire ta lettre de motivation et te donner des conseils personnalisés pour maximiser tes chances.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                RDV gratuit et sans engagement
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Conseils personnalisés par des experts
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Aucune obligation d'inscription
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={handleRdv}
              className="w-full px-6 py-3 bg-violet text-white font-semibold rounded-lg border border-black hover:bg-violet-dark transition-colors"
            >
              Prendre RDV gratuitement
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-2 bg-white text-text-secondary text-sm border border-black rounded-lg hover:text-text-primary transition-colors"
            >
              Non, je ne veux pas augmenter mes chances d'être pris en {parcours || 'PASS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

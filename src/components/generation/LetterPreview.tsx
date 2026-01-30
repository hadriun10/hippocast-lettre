import { useState, useEffect } from 'react';
import { useFormStore } from '../../store/useFormStore';

// Fallback letter content (1500 characters)
const FALLBACK_LETTER = `Madame, Monsieur,

Actuellement en classe de Terminale au lycée Saint-Exupéry de Lyon, je me permets de vous soumettre ma candidature pour intégrer le Parcours Accès Santé Spécifique (PASS) au sein de votre établissement.

Mon intérêt pour les études de santé est né lors de mon stage d'observation en cabinet de médecine générale, où j'ai pu observer la relation unique qui se tisse entre un médecin et ses patients. Cette expérience a confirmé ma volonté de m'orienter vers une profession où l'humain est au centre de chaque décision.

Mes spécialités en Physique-Chimie et SVT m'ont permis de développer une rigueur scientifique et une méthodologie de travail essentielles pour réussir dans ce parcours exigeant. Ma moyenne de 16,5 en Physique-Chimie et 17,2 en SVT témoigne de mon engagement et de ma capacité à maintenir un niveau d'excellence constant.

En parallèle de mes études, mon engagement bénévole auprès de la Croix-Rouge depuis deux ans m'a appris l'importance de l'écoute et de l'empathie dans l'accompagnement des personnes en difficulté. Ces qualités, je souhaite les mettre au service des patients tout au long de ma future carrière médicale.

Votre faculté représente pour moi l'environnement idéal grâce à son système de tutorat reconnu et à sa proximité avec le CHU, qui offre une immersion précoce dans le milieu hospitalier.

Je reste à votre disposition pour tout entretien complémentaire et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`;

interface LetterPreviewProps {
  onCopy: () => void;
  onDownload: () => void;
  onDiscover: () => void;
  isBlurred: boolean;
}

export function LetterPreview({ onCopy, onDownload, onDiscover, isBlurred }: LetterPreviewProps) {
  const { letter } = useFormStore();
  const [isVisible, setIsVisible] = useState(false);
  const [hippoExiting, setHippoExiting] = useState(false);
  const [letterRevealed, setLetterRevealed] = useState(false);

  // Use real letter from store, or fallback if not ready
  const displayLetter = letter || FALLBACK_LETTER;

  useEffect(() => {
    // Start hippo exit animation
    setHippoExiting(true);

    // After hippo exits, show letter
    const showLetterTimer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

    // Letter reveal animation (top to bottom)
    const revealTimer = setTimeout(() => {
      setLetterRevealed(true);
    }, 600);

    return () => {
      clearTimeout(showLetterTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-[750px] h-[530px] flex flex-col relative">
      {/* Hippo exiting animation */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in ${
          hippoExiting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
        style={{ zIndex: hippoExiting ? 0 : 10 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="154" height="154" viewBox="0 0 154 154" fill="none" className="w-80 h-80">
          <path d="M46.6434 19.8149C46.6009 19.8274 46.565 19.8561 46.5435 19.8948C46.522 19.9336 46.5166 19.9792 46.5285 20.0219C46.5285 20.1752 46.5975 20.1292 47.5403 20.1829C48.3528 20.2289 49.0733 20.2672 49.426 20.2672H49.6406C49.6718 20.2588 49.7003 20.2424 49.7232 20.2195C49.7461 20.1966 49.7625 20.1681 49.7709 20.1369C49.7792 20.106 49.7793 20.0735 49.7713 20.0426C49.7632 20.0117 49.7472 19.9834 49.7249 19.9606C49.4873 19.7229 46.6664 19.8073 46.6434 19.8149Z" fill="none" stroke="black" strokeWidth="1"/>
        </svg>
      </div>

      {/* Letter container */}
      <div
        className={`flex-1 flex flex-col transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Letter box */}
        <div className="bg-white border-2 border-border rounded-xl p-6 flex-1 overflow-hidden flex flex-col relative" style={{ maxHeight: '420px' }}>
          <div className="flex-1 overflow-y-auto">
            <div
              className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed transition-all duration-500"
              style={{
                filter: isBlurred ? 'blur(4px)' : 'blur(0)',
                animation: letterRevealed ? 'revealFromTop 0.8s ease-out forwards' : 'none',
              }}
            >
              {displayLetter}
            </div>
          </div>

          {/* Discover button overlay - shown when blurred */}
          {isBlurred && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={onDiscover}
                className="px-8 py-4 bg-violet text-white font-semibold rounded-xl hover:bg-violet-dark transition-colors shadow-lg text-lg"
              >
                Découvrir la lettre que Hippo t'a rédigée
              </button>
            </div>
          )}
        </div>

        {/* Buttons - only shown when not blurred */}
        {!isBlurred && (
          <div className="flex gap-4 mt-4 justify-center">
            <button
              onClick={onCopy}
              className="flex items-center gap-2 px-6 py-3 bg-violet text-white font-semibold rounded-lg hover:bg-violet-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copier la lettre
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-2 px-6 py-3 bg-violet text-white font-semibold rounded-lg hover:bg-violet-dark transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger la lettre
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

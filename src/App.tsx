import { useState, useEffect, useRef, useCallback } from 'react';
import { Tabs, QuestionBlock } from './components/form';
import { LetterDisplay, RecapSummary } from './components/letter';
import { GenerationLoading, LetterPreview, WaitingScreen } from './components/generation';
import { HippoWithSpeechBubble } from './components/ui';
import { CapturePopup, PrepaRdvPopup } from './components/popup';
import { useFormStore } from './store/useFormStore';
import { blocks } from './config/questions.config';
import { submitForm, submitPopup, buildFormPayload } from './lib/api';
import { track } from './lib/posthog';
import { useResponsive } from './hooks/useResponsive';
import { usePrepaPartenaire } from './hooks/usePrepaPartenaire';
import type { PopupFormData } from './types';

function App() {
  const {
    currentBlock,
    showPopup,
    isLetterBlurred,
    error,
    generationPhase,
    letter,
    goToNextBlock,
    setGenerating,
    setShowPopup,
    setError,
    setLetter,
    revealLetter,
    setGenerationPhase,
  } = useFormStore();

  const { isMobile } = useResponsive();
  const { prepaPartenaire } = usePrepaPartenaire();
  const [showPrepaRdvPopup, setShowPrepaRdvPopup] = useState(false);
  const hasTrackedStart = useRef(false);
  const letterPromiseRef = useRef<Promise<void> | null>(null);

  // Track form start on first interaction
  useEffect(() => {
    if (!hasTrackedStart.current) {
      track.formStarted();
      hasTrackedStart.current = true;
    }
  }, []);

  const handleBlockComplete = () => {
    track.blocCompleted(currentBlock + 1);
    goToNextBlock();
  };

  const handleGenerate = async () => {
    track.generationStarted();
    setGenerating(true);
    setError(null);
    setGenerationPhase('loading');

    // Envoyer les données au webhook n8n pour générer la lettre (en arrière-plan)
    const payload = buildFormPayload();
    letterPromiseRef.current = (async () => {
      try {
        const response = await submitForm(payload);
        if (response.success && response.letter) {
          setLetter(response.letter);
        } else if (response.error) {
          setError(response.error);
        }
      } catch (err) {
        setError('Une erreur inattendue est survenue. Réessaie.');
      }
    })();
  };

  const handleLoadingComplete = useCallback(() => {
    setGenerationPhase('letter');
    setGenerating(false);
  }, [setGenerationPhase, setGenerating]);

  const handleDiscoverLetter = () => {
    // Afficher la popup de capture avant de révéler la lettre
    setGenerationPhase('popup');
    setShowPopup(true);
    track.popupDisplayed();
  };

  const handlePopupSubmit = async (data: PopupFormData) => {
    // Envoyer les données en arrière-plan (sans bloquer)
    const payload = buildFormPayload();
    submitPopup(data, payload); // Pas de await, on n'attend pas la réponse

    track.leadCaptured(data.consent || 'oui', data.isParent === 'oui' ? 'parent' : 'eleve');

    // Fermer la popup immédiatement
    setShowPopup(false);

    // Si la personne veut une prépa et qu'il y a une prépa partenaire, afficher la popup RDV
    if (data.wantsPrepa && prepaPartenaire) {
      setTimeout(() => setShowPrepaRdvPopup(true), 500);
    }

    // Vérifier si la lettre est déjà arrivée
    const currentLetter = useFormStore.getState().letter;

    if (currentLetter) {
      // Lettre déjà prête, afficher directement
      setGenerationPhase('complete');
      revealLetter();
      track.letterRevealed();
    } else {
      // Lettre pas encore prête, afficher écran d'attente
      setGenerationPhase('waiting');

      // Attendre que la lettre arrive
      if (letterPromiseRef.current) {
        await letterPromiseRef.current;
      }

      // Vérifier à nouveau si la lettre est arrivée
      const letterAfterWait = useFormStore.getState().letter;
      if (letterAfterWait) {
        setGenerationPhase('complete');
        revealLetter();
        track.letterRevealed();
      }
    }
  };

  const handleCopyLetter = () => {
    if (letter) {
      navigator.clipboard.writeText(letter);
    }
  };

  const handleDownloadLetter = () => {
    if (!letter) return;

    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lettre-motivation-pass-las.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Current block data
  const currentBlockData = blocks[currentBlock];
  const isLastBlock = currentBlock === blocks.length - 1;

  // Final state - letter revealed
  const isComplete = generationPhase === 'complete';

  // Is in generation flow (loading, letter preview, or popup)
  const isInGenerationFlow = generationPhase !== 'idle';

  // Mobile view when letter is revealed
  if (isMobile && isComplete) {
    return (
      <div className="min-h-screen bg-bg-page flex flex-col p-4">
        <LetterDisplay />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-page flex flex-col">
      {/* Hero / Title Section */}
      <div className="text-center pt-8 pb-6 px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
          Genere ta lettre de motivation PASS/LAS
        </h1>
        <p className="text-text-primary mb-5 max-w-4xl mx-auto">
          En 4 minutes, obtiens une <span className="font-bold">lettre personnalisee</span> basee sur{' '}
          <span className="font-bold">ton profil</span> et les{' '}
          <span className="font-bold">attentes des jurys</span> Parcoursup.
        </p>
        {/* Social proof */}
        <div className="inline-flex items-center gap-3">
          <div className="flex -space-x-2">
            <img src="/user1.png" alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="/user2.png" alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
            <img src="/user3.png" alt="" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
          </div>
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-full px-3 py-1">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-sm text-text-primary font-medium">4,7/5</span>
            <span className="text-sm text-text-secondary">(411 avis)</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Main Content - Ecran divise en 2 moities */}
      <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
        {/* Moitie gauche - Form (caché sur mobile pendant la génération) */}
        <div className={`${isInGenerationFlow ? 'hidden md:flex' : 'flex'} md:justify-end px-4 md:px-8 pb-4`}>
          <div className="w-full max-w-[750px] min-h-0 md:h-[530px] flex flex-col">
            {isInGenerationFlow ? (
              // During generation or complete: show tabs (disabled) + recap
              <>
                <Tabs disabled />
                <div className="bg-bg-form border-2 border-border rounded-none rounded-b-xl p-4 md:p-6 relative z-10 md:flex-1 md:overflow-y-auto">
                  <RecapSummary />
                </div>
              </>
            ) : (
              <>
                <Tabs />
                <QuestionBlock
                  block={currentBlockData}
                  isLastBlock={isLastBlock}
                  onComplete={handleBlockComplete}
                  onGenerate={handleGenerate}
                />
              </>
            )}
          </div>
        </div>

        {/* Moitie droite - Preview ou Hippo (visible sur mobile pendant la génération) */}
        {isInGenerationFlow ? (
          <div className="flex justify-center md:justify-start px-4 md:px-8 pb-4">
            {generationPhase === 'loading' ? (
              <GenerationLoading onComplete={handleLoadingComplete} />
            ) : generationPhase === 'waiting' ? (
              <WaitingScreen />
            ) : (
              <LetterPreview onCopy={handleCopyLetter} onDownload={handleDownloadLetter} onDiscover={handleDiscoverLetter} isBlurred={isLetterBlurred} />
            )}
          </div>
        ) : (
          <div className="hidden md:flex justify-start px-8 pb-4">
            <HippoWithSpeechBubble />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#f5f0ea] text-text-primary py-4 md:py-6 px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm">
              Un outil cree par <span className="font-bold">Hippocast</span>
            </p>
            <p className="text-xs md:text-sm text-text-secondary italic">
              Calcule tes chances de reussir PASS/LAS
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-2 text-xs md:text-sm text-text-secondary">
              <a
                href="https://www.hippocast.fr//cgu-calculateur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary"
              >
                Mentions legales
              </a>
              <a
                href="https://www.hippocast.fr//regles-de-confidentialite-calculateur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary"
              >
                Confidentialite
              </a>
            </div>
          </div>
          <a
            href="mailto:contact@hippocast.fr"
            className="flex items-center justify-center md:justify-start gap-2 text-sm hover:text-text-secondary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Nous contacter
          </a>
        </div>
      </footer>

      {/* Capture popup */}
      <CapturePopup
        isOpen={showPopup}
        onSubmit={handlePopupSubmit}
        isLoading={false}
      />

      {/* Popup RDV Prépa - affichée si la personne veut une prépa */}
      {prepaPartenaire && (
        <PrepaRdvPopup
          isOpen={showPrepaRdvPopup}
          onClose={() => setShowPrepaRdvPopup(false)}
          prepaNom={prepaPartenaire.nom}
          prepaVille={prepaPartenaire.ville}
          prepaLien={prepaPartenaire.lien}
        />
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Button } from '../ui';
import { useFormStore } from '../../store/useFormStore';
import { usePrepaPartenaire } from '../../hooks/usePrepaPartenaire';
import { PrepaRdvPopup } from '../popup/PrepaRdvPopup';

export function LetterDisplay() {
  const { letter } = useFormStore();
  const [copied, setCopied] = useState(false);
  const [showPrepaPopup, setShowPrepaPopup] = useState(false);
  const { prepaPartenaire, hasPrepaPartenaire } = usePrepaPartenaire();

  const handleCopy = async () => {
    if (!letter) return;

    try {
      await navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    if (!letter) return;

    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lettre-motivation-pass-las.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!letter) return null;

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-text-primary">Ta lettre de motivation</h3>
          <span className="text-xs text-text-secondary">{letter.length} / 1500 caractères</span>
        </div>

        <div className="flex-1 bg-white rounded-block border border-border p-4 md:p-6 overflow-auto mb-4">
          <p className="text-xs md:text-base text-text-primary whitespace-pre-wrap leading-relaxed">{letter}</p>
        </div>

        <div className="flex flex-col gap-2">
          {/* Bouton Faire relire - en haut sur mobile, uniquement si prépa partenaire */}
          {hasPrepaPartenaire && (
            <button
              onClick={() => setShowPrepaPopup(true)}
              className="btn-shiny w-full px-6 py-3 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 order-first md:order-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Faire relire ma lettre
            </button>
          )}

          <Button onClick={handleCopy} className="w-full">
            {copied ? (
              <>
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copié !
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copier ma lettre
              </>
            )}
          </Button>

          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Télécharger ma lettre
          </Button>
        </div>
      </div>

      {/* Popup RDV Prépa */}
      {prepaPartenaire && (
        <PrepaRdvPopup
          isOpen={showPrepaPopup}
          onClose={() => setShowPrepaPopup(false)}
          prepaNom={prepaPartenaire.nom}
          prepaVille={prepaPartenaire.ville}
          prepaLien={prepaPartenaire.lien}
        />
      )}
    </>
  );
}

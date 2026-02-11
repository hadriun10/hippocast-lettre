import { useState } from 'react';
import { Button } from '../ui';
import { useFormStore } from '../../store/useFormStore';
import { usePrepaPartenaire } from '../../hooks/usePrepaPartenaire';
import { track } from '../../lib/posthog';

interface LetterDisplayProps {
  onFaireRelireClick?: () => void;
}

export function LetterDisplay({ onFaireRelireClick }: LetterDisplayProps) {
  const { letter } = useFormStore();
  const [copied, setCopied] = useState(false);
  const { hasPrepaPartenaire } = usePrepaPartenaire();

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

  const handleShare = async () => {
    track.shareClicked();
    const { userEmail } = useFormStore.getState();
    const utmSource = userEmail ? `share_${userEmail}` : 'share';
    const shareUrl = `https://lettre.hippocast.fr?utmsource=${encodeURIComponent(utmSource)}`;
    const shareText = `Hello, t'as déjà tes lettres de motivation parcoursup pour PASS/LAS ? Je te conseille cette appli pour créer ta lettre. C'est gratuit et le résultat est incroyable !\n\n${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          text: shareText,
        });
      } catch (err) {
        // L'utilisateur a annulé
      }
    } else {
      // Fallback : copier le message
      try {
        await navigator.clipboard.writeText(shareText);
        alert('Message copié ! Tu peux le coller dans ton app de messagerie.');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
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
          {hasPrepaPartenaire && onFaireRelireClick && (
            <button
              onClick={onFaireRelireClick}
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

          <Button onClick={handleShare} variant="secondary" className="w-full">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Partage l'outil !
          </Button>
        </div>
      </div>
    </>
  );
}

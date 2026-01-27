import { useState } from 'react';
import { Button } from '../ui';
import { useFormStore } from '../../store/useFormStore';

export function LetterDisplay() {
  const { letter } = useFormStore();
  const [copied, setCopied] = useState(false);

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

  if (!letter) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Ta lettre de motivation</h3>
        <span className="text-xs text-text-secondary">{letter.length} / 1500 caractères</span>
      </div>

      <div className="flex-1 bg-white rounded-block border border-border p-6 overflow-auto mb-4">
        <p className="text-text-primary whitespace-pre-wrap leading-relaxed">{letter}</p>
      </div>

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
    </div>
  );
}

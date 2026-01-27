import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  'Analyse de ton profil...',
  'Rédaction en cours...',
  'Personnalisation de ta lettre...',
  'Dernières retouches...',
  'Presque fini !',
];

export function LoadingAnimation() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      {/* Animated spinner */}
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-violet/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-violet rounded-full animate-spin" />
        <div className="absolute inset-2 border-4 border-transparent border-b-violet-dark rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>

      {/* Loading message */}
      <p className="text-lg font-medium text-text-primary text-center animate-pulse">
        {LOADING_MESSAGES[messageIndex]}
      </p>

      <p className="mt-3 text-sm text-text-secondary text-center">
        Ta lettre de motivation personnalisée arrive...
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-6">
        {LOADING_MESSAGES.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index <= messageIndex ? 'bg-violet' : 'bg-violet/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

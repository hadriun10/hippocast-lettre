import { useState, useEffect } from 'react';
import { HippoSvg } from '../ui';

export function WaitingScreen() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-[750px] h-[530px] flex flex-col items-center justify-center relative">
      {/* Hippo SVG */}
      <div className="flex-1 flex items-center justify-center">
        <HippoSvg className="w-64 h-64 animate-pulse" />
      </div>

      {/* Waiting message */}
      <div className="pb-8 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Hippo peaufine ta lettre{dots}
        </h2>
        <p className="text-text-secondary max-w-sm mx-auto">
          Plus que quelques secondes, on y est presque !
        </p>
      </div>

      {/* Loading indicator */}
      <div className="w-64 mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-violet rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}

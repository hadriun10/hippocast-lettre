import { useState, useEffect, useRef } from 'react';
import { HippoSvg } from '../ui';

interface GenerationLoadingProps {
  onComplete: () => void;
}

function useTypewriter(text: string, speed: number = 25) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const previousTextRef = useRef('');

  useEffect(() => {
    if (text !== previousTextRef.current) {
      previousTextRef.current = text;
      setDisplayedText('');
      setIsTyping(true);
    }
  }, [text]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayedText, text, speed, isTyping]);

  return { displayedText, isTyping };
}

export function GenerationLoading({ onComplete }: GenerationLoadingProps) {
  const [progress, setProgress] = useState(0);
  const message = "Bip bip ! Encore quelques secondes...";
  const { displayedText, isTyping } = useTypewriter(message, 25);

  useEffect(() => {
    // Progress bar animation over 5 seconds
    const duration = 5000;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(progressTimer);
  }, [onComplete]);

  return (
    <div className="w-full max-w-[750px] h-[530px] flex flex-col items-center relative">
      {/* Speech bubble - responsive: centered on mobile, left on desktop */}
      <div className="absolute top-6 left-0 right-0 md:left-4 md:right-auto z-10 px-4 md:px-0">
        <div className="relative bg-white border-2 border-border rounded-3xl px-4 md:px-5 py-3 md:py-4 shadow-sm w-full md:w-[440px] min-h-[60px] md:h-[80px] mx-auto md:mx-0">
          <p className="text-text-primary text-lg md:text-xl leading-tight text-center md:text-left" style={{ fontFamily: "'VT323', monospace" }}>
            {displayedText}
            {isTyping && <span className="animate-pulse ml-0.5">|</span>}
          </p>
          {/* Triangle pointing down - centered on mobile, right on desktop */}
          <svg
            className="absolute -bottom-[16px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-12"
            width="24"
            height="18"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 L24 0 L12 18 Z"
              fill="white"
              stroke="#1F2937"
              strokeWidth="2"
            />
            <rect x="0" y="0" width="24" height="3" fill="white" />
          </svg>
        </div>
      </div>

      {/* Hippo SVG */}
      <div className="flex-1 flex items-end justify-center pt-28 pb-2">
        <HippoSvg className="w-64 h-64 animate-float" />
      </div>

      {/* Progress bar instead of text */}
      <div className="pb-8 w-64">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

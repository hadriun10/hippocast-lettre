import { useState, useEffect, useRef } from 'react';
import { HippoSvg } from './HippoSvg';
import { useFormStore } from '../../store/useFormStore';
import { UNIVERSITES } from '../../config/questions.config';

interface HippoMessage {
  block: number;
  getMessage: (answers: Record<string, unknown>) => string;
}

const HIPPO_MESSAGES: HippoMessage[] = [
  {
    block: 0,
    getMessage: () => "Bip bip ! Salut, moi c'est Hippo ! Réponds à mes questions et je t'aide à rédiger ta lettre.",
  },
  {
    block: 1,
    getMessage: (answers) => {
      const universityValue = answers.university as string;
      if (universityValue) {
        const university = UNIVERSITES.find((u) => u.value === universityValue);
        const universityName = university?.label || universityValue;
        return `${universityName}, quelle super fac ! J'ai plein de potes là-bas. Bip bip`;
      }
      return "Super choix de fac ! J'ai plein de potes là-bas. Bip bip";
    },
  },
  {
    block: 2,
    getMessage: () => "Bip bip ! Quelle rigueur ! Même chez les robots, on n'en fait pas tant.",
  },
  {
    block: 3,
    getMessage: () => "Bip bip ! Waouh, tu as de belles raisons. Tu vas faire un super médecin !",
  },
];

function useTypewriter(text: string, speed: number = 30) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const previousTextRef = useRef('');

  useEffect(() => {
    // Si le texte change, redémarrer l'animation
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

export function HippoWithSpeechBubble() {
  const { currentBlock, answers } = useFormStore();
  const [messageKey, setMessageKey] = useState(0);
  const previousBlockRef = useRef(currentBlock);

  // Récupérer le message pour le bloc actuel
  const messageConfig = HIPPO_MESSAGES[currentBlock] || HIPPO_MESSAGES[0];
  const fullMessage = messageConfig.getMessage(answers);

  // Déclencher une nouvelle animation quand le bloc change
  useEffect(() => {
    if (currentBlock !== previousBlockRef.current) {
      previousBlockRef.current = currentBlock;
      setMessageKey((prev) => prev + 1);
    }
  }, [currentBlock]);

  const { displayedText, isTyping } = useTypewriter(fullMessage, 25);

  return (
    <div className="w-full max-w-[750px] h-[530px] flex flex-col items-center relative">
      {/* Speech bubble - responsive: centered on mobile, left on desktop */}
      <div className="absolute top-6 left-0 right-0 md:left-4 md:right-auto z-10 px-4 md:px-0">
        <div className="relative bg-white border-2 border-border rounded-3xl px-4 md:px-5 py-3 md:py-4 shadow-sm w-full md:w-[440px] min-h-[60px] md:h-[80px] mx-auto md:mx-0">
          <p className="text-text-primary text-lg md:text-xl leading-tight text-center md:text-left" style={{ fontFamily: "'VT323', monospace" }} key={messageKey}>
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
            {/* Border triangle */}
            <path
              d="M0 0 L24 0 L12 18 Z"
              fill="white"
              stroke="#1F2937"
              strokeWidth="2"
            />
            {/* Cover the top border */}
            <rect x="0" y="0" width="24" height="3" fill="white" />
          </svg>
        </div>
      </div>

      {/* Hippo SVG - moved down to make room for speech bubble */}
      <div className="flex-1 flex items-end justify-center pt-28 pb-2">
        <HippoSvg className="w-64 h-64 animate-float" />
      </div>

      {/* Text below Hippo */}
      <div className="pb-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Hippo rédige ta lettre</h2>
        <p className="text-text-secondary max-w-sm mx-auto">
          Réponds aux questions et obtiens une lettre de motivation personnalisée en quelques minutes.
        </p>
      </div>
    </div>
  );
}

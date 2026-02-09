import { useState, useRef, useEffect } from 'react';
import type { QuestionOption } from '../../types';

interface DropdownProps {
  label: string;
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  error,
  required,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustom, setIsCustom] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = !isCustom ? options.find((opt) => opt.value === value) : null;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCustom && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCustom]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (optionValue === 'autre') {
      setIsCustom(true);
      onChange('');
    } else {
      setIsCustom(false);
      onChange(optionValue);
    }
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOptionClick(optionValue);
    }
  };

  const handleBackToDropdown = () => {
    setIsCustom(false);
    onChange('');
  };

  if (isCustom) {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Précise ta spécialité..."
            className="flex-1 px-4 py-3 bg-white border-2 border-border rounded-lg text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent transition-colors duration-200"
          />
          <button
            type="button"
            onClick={handleBackToDropdown}
            className="px-3 py-3 text-text-secondary hover:text-text-primary border-2 border-border rounded-lg transition-colors duration-200"
            title="Revenir à la liste"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full" ref={dropdownRef} style={{ position: isOpen ? 'relative' : 'static', zIndex: isOpen ? 9999 : 'auto' }}>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative" style={{ zIndex: isOpen ? 9999 : 'auto' }}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-left
            bg-white border-2 rounded-lg
            flex items-center justify-between
            focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent
            transition-colors duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : 'border-border'}
            ${!selectedOption ? 'text-text-secondary' : 'text-text-primary'}
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span>{selectedOption?.label || placeholder}</span>
          <svg
            className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <ul
            className="absolute w-full mt-1 bg-white border-2 border-border rounded-lg shadow-xl max-h-60 overflow-auto"
            style={{ zIndex: 99999 }}
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                tabIndex={0}
                onClick={() => handleOptionClick(option.value)}
                onKeyDown={(e) => handleOptionKeyDown(e, option.value)}
                className={`
                  px-4 py-3 cursor-pointer
                  flex items-center justify-between
                  hover:bg-violet-light
                  focus:bg-violet-light focus:outline-none
                  ${value === option.value ? 'bg-violet-light' : ''}
                `}
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <svg className="w-5 h-5 text-violet" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

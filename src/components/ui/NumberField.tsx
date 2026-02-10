import { forwardRef } from 'react';

interface NumberFieldProps {
  label: string;
  value: number | '';
  onChange: (value: number | '') => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, value, onChange, min = 0, max = 20, step = 0.5, error, required, disabled, placeholder }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue === '') {
        onChange('');
        return;
      }

      const numValue = parseFloat(inputValue);

      if (!isNaN(numValue)) {
        if (numValue < min) {
          onChange(min);
        } else if (numValue > max) {
          onChange(max);
        } else {
          onChange(numValue);
        }
      }
    };

    const inputId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>

        <input
          ref={ref}
          id={inputId}
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full px-2 md:px-4 py-3
            bg-white border-2 rounded-lg
            text-text-primary placeholder:text-text-secondary text-center
            focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent
            transition-colors duration-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-border'}
          `}
        />

        {error && (
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

NumberField.displayName = 'NumberField';

import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, multiline, rows = 3, className = '', id, ...props }, ref) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    const baseStyles = `
      w-full px-4 py-3
      bg-white border-2 border-border rounded-lg
      text-text-primary placeholder:text-text-secondary
      focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent
      transition-colors duration-200
      disabled:bg-gray-100 disabled:cursor-not-allowed
    `;

    const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';

    return (
      <div className={`w-full ${className}`}>
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>

        {multiline ? (
          <textarea
            id={inputId}
            rows={rows}
            className={`${baseStyles} ${errorStyles} resize-none`}
            {...(props as any)}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${errorStyles}`}
            {...props}
          />
        )}

        {error && (
          <p className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

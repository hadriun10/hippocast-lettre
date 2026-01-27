interface BooleanFieldProps {
  label: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  required?: boolean;
  error?: string;
  trueLabel?: string;
  falseLabel?: string;
}

export function BooleanField({
  label,
  value,
  onChange,
  required,
  error,
  trueLabel = 'Oui',
  falseLabel = 'Non'
}: BooleanFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-primary mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`
            flex-1 px-4 py-3 rounded-lg border-2
            font-medium text-sm
            transition-colors duration-200
            min-h-[44px]
            ${
              value === true
                ? 'bg-violet-light text-text-primary border-border'
                : 'bg-white text-text-primary border-border hover:bg-tab-active'
            }
          `}
        >
          {trueLabel}
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`
            flex-1 px-4 py-3 rounded-lg border-2
            font-medium text-sm
            transition-colors duration-200
            min-h-[44px]
            ${
              value === false
                ? 'bg-violet-light text-text-primary border-border'
                : 'bg-white text-text-primary border-border hover:bg-tab-active'
            }
          `}
        >
          {falseLabel}
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

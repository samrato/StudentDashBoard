import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  id, 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`auth-input ${error ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-destructive animate-slide-down">{error}</p>}
    </div>
  );
};

export default InputField;
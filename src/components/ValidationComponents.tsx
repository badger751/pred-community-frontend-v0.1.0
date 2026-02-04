import React from 'react';
import '../validation.css';

interface ValidationIconProps {
  isValid?: boolean;
  showWarning?: boolean;
  showError?: boolean;
  className?: string;
}

export const ValidationIcon: React.FC<ValidationIconProps> = ({ 
  isValid, 
  showWarning, 
  showError,
  className = '' 
}) => {
  if (!isValid && !showWarning && !showError) return null;

  const iconType = showError ? 'error' : showWarning ? 'warning' : 'success';
  const iconClass = `validation-icon-${iconType}`;

  return (
    <svg 
      className={`validation-icon ${iconClass} ${className}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      width="20"
      height="20"
    >
      {iconType === 'error' && (
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 2v3a1 1 0 001-2v-3z" 
          clipRule="evenodd" 
        />
      )}
      {iconType === 'warning' && (
        <path 
          fillRule="evenodd" 
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334 2.981 1.334 4.486 0zM9 11a1 1 0 11-2 0 1 1 0 012 0zm3-8a1 1 0 00-1 1H8a1 1 0 000-2h3zm1 9a1 1 0 100 2 1 1 0 002-2z" 
          clipRule="evenodd" 
        />
      )}
      {iconType === 'success' && (
        <path 
          fillRule="evenodd" 
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
          clipRule="evenodd" 
        />
      )}
    </svg>
  );
};

interface ValidationMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'success';
  show?: boolean;
  className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
  message, 
  type = 'error',
  show = true,
  className = '' 
}) => {
  if (!show || !message) return null;

  const messageClass = `validation-message validation-${type} ${className}`;

  return (
    <span className={messageClass}>
      {message}
    </span>
  );
};

interface InputWithValidationProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  isValid?: boolean;
  showError?: boolean;
  showWarning?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
}

export const InputWithValidation: React.FC<InputWithValidationProps> = ({
  value = '',
  onChange,
  placeholder,
  type = 'text',
  isValid = true,
  showError = false,
  showWarning = false,
  disabled = false,
  className = '',
  required = false,
  id,
  name
}) => {
  const inputClass = `
    ${!isValid && (showError || showWarning) ? 'input-error' : ''}
    ${isValid ? 'input-success' : ''}
    ${className}
  `.trim();

  const containerClass = `input-with-icon ${!isValid ? 'input-error' : ''}`;

  return (
    <div className={containerClass}>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClass}
        required={required}
      />
      <ValidationIcon 
        isValid={isValid && !showError && !showWarning}
        showError={showError}
        showWarning={showWarning}
      />
    </div>
  );
};

interface TextareaWithValidationProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isValid?: boolean;
  showError?: boolean;
  showWarning?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  rows?: number;
  id?: string;
  name?: string;
}

export const TextareaWithValidation: React.FC<TextareaWithValidationProps> = ({
  value = '',
  onChange,
  placeholder,
  isValid = true,
  showError = false,
  showWarning = false,
  disabled = false,
  className = '',
  required = false,
  rows = 4,
  id,
  name
}) => {
  const textareaClass = `
    ${!isValid && (showError || showWarning) ? 'textarea-error' : ''}
    ${isValid ? 'input-success' : ''}
    ${className}
  `.trim();

  const containerClass = `input-with-icon ${!isValid ? 'input-error' : ''}`;

  return (
    <div className={containerClass}>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={textareaClass}
        required={required}
        rows={rows}
      />
      <ValidationIcon 
        isValid={isValid && !showError && !showWarning}
        showError={showError}
        showWarning={showWarning}
      />
    </div>
  );
};

interface SelectWithValidationProps {
  value?: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  isValid?: boolean;
  showError?: boolean;
  showWarning?: boolean;
  disabled?: boolean;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
}

export const SelectWithValidation: React.FC<SelectWithValidationProps> = ({
  value = '',
  onChange,
  options,
  isValid = true,
  showError = false,
  showWarning = false,
  disabled = false,
  className = '',
  required = false,
  id,
  name,
  placeholder
}) => {
  const selectClass = `
    ${!isValid && (showError || showWarning) ? 'select-error' : ''}
    ${isValid ? 'input-success' : ''}
    ${className}
  `.trim();

  const containerClass = `input-with-icon ${!isValid ? 'input-error' : ''}`;

  return (
    <div className={containerClass}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={selectClass}
        required={required}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ValidationIcon 
        isValid={isValid && !showError && !showWarning}
        showError={showError}
        showWarning={showWarning}
      />
    </div>
  );
};
import type { InputHTMLAttributes } from 'react';

type FormInputProps = InputHTMLAttributes<HTMLInputElement>;

function FormInput({
  className = '',
  ...props
}: FormInputProps) {
  return (
    <input
      className={`ui-input ${className}`}
      {...props}
    />
  );
}

export default FormInput;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { InputHTMLAttributes } from 'react';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  register?: any;
}

const InputField: React.FC<InputProps> = ({
  name,
  type,
  label,
  error,
  placeholder,
  register,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor="password" className="account-label">
          {label}
        </label>
        <span className="text-red-600">{error}</span>
      </div>
      <div className="account-input-box">
        <input
          id={name}
          autoComplete="off"
          type={type}
          placeholder={placeholder}
          className={error ? 'account-error' : 'account-input'}
          {...register(name)}
        />
      </div>
    </div>
  );
};

export default InputField;

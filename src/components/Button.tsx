import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant, disabled = false }) => {
  const baseStyles = 'p-3 rounded-full transition-all duration-200';
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'link';
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-300 ease-out font-mono text-sm";
  
  const variants = {
    primary: "bg-brand-black text-white px-6 py-3 rounded-md hover:bg-gray-800 hover:px-8",
    outline: "border border-gray-300 text-brand-black px-6 py-3 rounded-md hover:bg-gray-50",
    link: "text-brand-accent hover:text-blue-700 underline-offset-4 hover:underline p-0"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4" />}
    </button>
  );
};
import React from 'react';

interface BadgeProps {
  text?: string;
  className?: string;
  theme?: 'light' | 'dark';
}

export const Badge: React.FC<BadgeProps> = ({ text = "AIX - FRAMEWORK", className = "", theme = 'light' }) => {
  const styles = theme === 'dark' 
    ? "border-white/20 bg-white/5 text-white backdrop-blur-md" 
    : "border-gray-300 bg-gray-50/50 text-gray-800 backdrop-blur-sm";

  return (
    <div className={`inline-flex items-center justify-center px-4 py-1.5 border rounded-full ${styles} ${className}`}>
      <span className="w-2.5 h-2.5 rounded-full bg-brand-accent mr-3 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
      <span className="font-mono text-[11px] tracking-wider uppercase font-medium">
        {text}
      </span>
    </div>
  );
};
import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  textClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p' | 'div';
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", textClassName = "text-white mix-blend-difference", as: Component = 'span' }) => {
  return (
    <Component className={`glitch-wrapper ${className}`}>
      <span 
        className={`glitch relative inline-block ${textClassName}`} 
        data-text={text}
      >
        {text}
      </span>
    </Component>
  );
};
import React from 'react';

interface RetroCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  borderColor?: string;
}

export const RetroCard: React.FC<RetroCardProps> = ({ 
  children, 
  title, 
  className = "",
  borderColor = "border-gray-800" 
}) => {
  // Extract color name for text classes
  const colorName = borderColor.replace('border-', '');

  return (
    <div className={`relative bg-white/70 backdrop-blur-sm border ${borderColor} p-6 ${className}`}>
      {/* Decorative lines like technical schematics */}
      <div className={`absolute top-0 left-0 w-full h-[1px] bg-${colorName} opacity-20`} />
      <div className={`absolute bottom-0 right-0 w-full h-[1px] bg-${colorName} opacity-20`} />
      
      <div className={`absolute -top-[1px] -left-[1px] w-4 h-4 border-l border-t ${borderColor}`} />
      <div className={`absolute -top-[1px] -right-[1px] w-4 h-4 border-r border-t ${borderColor}`} />
      <div className={`absolute -bottom-[1px] -left-[1px] w-4 h-4 border-l border-b ${borderColor}`} />
      <div className={`absolute -bottom-[1px] -right-[1px] w-4 h-4 border-r border-b ${borderColor}`} />
      
      {title && (
        <div className="absolute -top-3 left-6">
            <span className={`bg-white px-2 border-l border-r ${borderColor} text-${colorName} text-xs tracking-[0.2em] font-bold`}>
                {title}
            </span>
        </div>
      )}
      
      {children}
    </div>
  );
};
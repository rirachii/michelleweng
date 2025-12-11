import React from 'react';

export const DitherBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#ffffff]">
      {/* Light gradient for subtle depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f8f9fa] to-[#f0f0f0] opacity-90" />
      
      {/* Wired Grid - Dark lines on white */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: 'perspective(500px) rotateX(10deg) scale(1.2)'
        }}
      />

      {/* Aggressive Dither - Dark dots for texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
          backgroundSize: '3px 3px'
        }}
      />
      
      {/* Random glowing orbs - now subtle color splashes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
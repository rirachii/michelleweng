import React from 'react';

export const CRTOverlay: React.FC = () => {
  return (
    <>
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden h-full w-full mix-blend-multiply opacity-50">
        {/* Scanlines - darker on white */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_2px,2px_100%] pointer-events-none" />
        
        {/* Rolling Bar */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.02)] to-transparent h-[5%] w-full animate-scanline pointer-events-none" />
        
        {/* Vignette - slight corner darkening */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.1)_100%)] pointer-events-none" />
      </div>
    </>
  );
};
import React from 'react';
import { RetroCard } from '../components/RetroCard';
import { GlitchText } from '../components/GlitchText';
import { Blog } from './Blog';


export const Home: React.FC = () => {
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto transition-all duration-700">
      
      {/* Background decorative giant text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-bold text-gray-100 opacity-60 pointer-events-none select-none whitespace-nowrap font-vt323 leading-none z-[-1] blur-sm fixed">
         MICHELLE
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* Left Column: Home Base */}
        <div className="text-center md:text-left space-y-6 pt-10 md:pt-20 md:sticky md:top-24">
          <div className="flex items-center justify-center md:justify-start gap-4 text-gray-400 font-mono text-[10px] md:text-xs tracking-[0.5em] animate-pulse">
             <span>⛓</span>
             <span>SYSTEM_OVERRIDE</span>
             <span>⛓</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold leading-none tracking-tighter text-black mix-blend-multiply">
            <GlitchText text="MICHELLE_WENG" />
          </h1>
          
          {/* Compact Bio */}
          <div className="max-w-xl mx-auto md:mx-0 space-y-4">
             <div className="text-sm md:text-lg text-gray-600 font-serif italic tracking-widest">
                cloud_surfing...
             </div>
             
             <p className="text-gray-800 font-mono text-xs md:text-sm leading-relaxed text-justify md:text-left border-t border-b border-gray-200 py-4">
                Michelle Weng. Dwelling in the wired. Constructing maximalist web experiences and efficient backend systems. Obsessed with Y2K aesthetics, clean code, and digital decay.
             </p>

             <div className="flex flex-wrap justify-center md:justify-start gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                 <span className="hover:text-black cursor-crosshair transition-colors">[ React ]</span>
                 <span className="hover:text-black cursor-crosshair transition-colors">[ Next.js ]</span>
                 <span className="hover:text-black cursor-crosshair transition-colors">[ TypeScript ]</span>
                 <span className="hover:text-black cursor-crosshair transition-colors">[ Vim ]</span>
             </div>
          </div>
        </div>

        {/* Right Column: Memory Dump */}
        <div id="blog" className="w-full mt-10 md:mt-0 scroll-mt-24">
           <Blog />
        </div>
      </div>
    </div>
  );
};
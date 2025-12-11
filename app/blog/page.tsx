import React from 'react';
import Link from 'next/link';
import { Blog } from '../../components/Blog';
import { GlitchText } from '../../components/GlitchText';

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-transparent p-6 md:p-12 font-sans relative overflow-x-hidden">
        {/* Navigation / Header */}
        <nav className="flex justify-between items-center mb-16 relative z-10">
          <Link href="/" className="text-xs font-mono text-gray-500 hover:text-black tracking-widest uppercase flex items-center gap-2 group transition-colors">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> 
            RETURN_HOME
          </Link>
           <div className="text-xs font-mono text-gray-400 tracking-widest animate-pulse">
            ARCHIVE_MODE
          </div>
        </nav>
        
        <div className="max-w-4xl mx-auto relative z-10">
            {/* Header */}
            <header className="mb-20 text-center">
                 <div className="flex items-center justify-center gap-4 text-gray-400 font-mono text-[10px] md:text-xs tracking-[0.5em] animate-pulse mb-6">
                     <span>⛓</span>
                     <span>SYSTEM_LOGS</span>
                     <span>⛓</span>
                 </div>
                 <div className="inline-block mb-4 text-5xl md:text-6xl font-bold text-black tracking-widest flicker-text">
                    <GlitchText text="FULL_MEMORY_DUMP" as="h1" textClassName="text-black glitch-home-style" />
                 </div>
                 <p className="text-gray-500 font-mono text-sm max-w-xl mx-auto italic">
                    All recorded thoughts and case studies. Sorted by chronological order.
                 </p>
            </header>

            {/* Full Blog List */}
            <Blog />
        </div>
        
         {/* Background Decor */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-5">
            <div className="absolute top-[10%] left-[5%] text-9xl font-bold font-vt323">ARCHIVE</div>
             <div className="absolute bottom-[20%] right-[10%] text-9xl font-bold font-vt323">LOGS</div>
        </div>
    </div>
  );
}

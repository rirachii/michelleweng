"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CRTOverlay } from './CRTOverlay';
import { DitherBackground } from './DitherBackground';
import { GlitchText } from './GlitchText';
import { MusicPlayer } from './MusicPlayer';

const Navigation = ({ activeSection, scrollToSection }: { activeSection: string, scrollToSection: (id: string) => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const navItems = [
    { id: 'home', label: 'HOME_BASE' },
    { id: 'blog', label: 'THOUGHTS' },
    { id: 'projects', label: 'CREATIONS' },
    { id: 'ai-uplink', label: 'ECHO_AI' },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-gradient-to-b from-white via-white/90 to-transparent pt-4 md:pt-6 pb-8 md:pb-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-start">
        <div className="flex flex-col cursor-pointer group" onClick={() => handleNavClick('home')}>
           <div className="text-lg md:text-3xl font-bold text-black tracking-widest flicker-text">
             <GlitchText text="MICHELLE_WENG_SYSTEM" />
           </div>
           <div className="text-[8px] md:text-[10px] text-gray-500 font-mono mt-1 tracking-[0.2em] md:tracking-[0.3em] uppercase group-hover:text-black transition-colors">
             Status: Down a Rabbit Hole
           </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-col items-end space-y-2 mt-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                font-mono text-sm tracking-widest hover:text-black transition-all duration-200 relative group uppercase text-right bg-transparent border-none cursor-pointer
                ${activeSection === item.id ? 'text-black font-bold underline decoration-1 underline-offset-4' : 'text-gray-400'}
              `}
            >
              <span className="opacity-0 group-hover:opacity-100 mr-2 transition-opacity">†</span>
              {item.label}
              {activeSection === item.id && <span className="absolute -right-4 top-0 animate-pulse text-black">_</span>}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden mt-2 text-black font-mono text-xs border border-gray-300 px-3 py-1 hover:bg-black hover:text-white transition-colors"
        >
          {mobileMenuOpen ? '[×]' : '[≡]'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  font-mono text-xs tracking-widest transition-all duration-200 text-left bg-transparent border-none cursor-pointer uppercase py-2 px-3
                  ${activeSection === item.id ? 'text-black font-bold bg-gray-100' : 'text-gray-600'}
                `}
              >
                {activeSection === item.id && <span className="mr-2">†</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <>
    {/* Bottom Left Socials - Hidden on mobile, shown on desktop */}
    <div className="hidden md:block fixed bottom-4 left-6 z-30">
       <div className="flex flex-col text-[10px] text-gray-400 font-mono leading-tight space-y-1">
          <a href="https://github.com/rirachii" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-alias transition-colors hover:underline">[ GitHub ]</a>
          <a href="https://linkedin.com/in/wengmichelle" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-alias transition-colors hover:underline">[ LinkedIn ]</a>
          <a href="https://twitter.com/mykov20" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-alias transition-colors hover:underline">[ X / Twitter ]</a>
          <a href="mailto:michelleweng25@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-black cursor-alias transition-colors hover:underline">[ Email ]</a>
       </div>
    </div>

    {/* Bottom Right User Info - Adjusted for mobile */}
    <footer className="hidden md:block fixed bottom-4 right-6 z-30 text-right">
      <div className="flex flex-col items-end text-[10px] text-gray-400 font-mono leading-tight">
         <span>USER: MICHELLE_WENG</span>
         <span>LOCATION: NYC/SF/ASIA </span>
         <span>LATEST_SYNC: {new Date().toLocaleTimeString()}</span>
      </div>
    </footer>

    {/* Mobile Footer - Centered at bottom */}
    <footer className="md:hidden fixed bottom-2 left-0 right-0 z-30 px-4">
      <div className="flex flex-col items-center text-[8px] text-gray-400 font-mono leading-tight space-y-1">
         <div className="flex gap-3">
            <a href="https://github.com/rirachii" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GH</a>
            <a href="https://linkedin.com/in/wengmichelle" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">LI</a>
            <a href="https://twitter.com/mykov20" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">X</a>
            <a href="mailto:michelleweng25@gmail.com" className="hover:text-black transition-colors">@</a>
         </div>
         <span>M_WENG • NYC/SF/ASIA</span>
      </div>
    </footer>
  </>
);

const DecorativeElements = () => (
  <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
     {/* Vertical Japanese/Gothic Text */}
     <div className="absolute top-20 left-6 text-gray-200 text-6xl font-bold opacity-40 select-none writing-vertical-rl font-vt323 tracking-widest hidden md:block">
        ミシェル
     </div>
     
     {/* Chains / Lines */}
     <div className="absolute top-0 right-20 w-[1px] h-screen bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-50" />
     <div className="absolute top-0 right-24 w-[1px] h-screen bg-gradient-to-b from-transparent via-gray-300 to-transparent opacity-50" />
  </div>
);

interface LayoutProps {
  children: React.ReactNode;
  activeSection?: string; // Optional because detail pages might not have a section
}

export const Layout: React.FC<LayoutProps> = ({ children, activeSection: propActiveSection }) => {
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync prop active section (from LandingPage) with local state
  useEffect(() => {
    if (propActiveSection) {
      setActiveSection(propActiveSection);
    }
  }, [propActiveSection]);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      if (pathname !== '/') {
        router.push('/?targetId=top');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (pathname !== '/') {
      // Use query param to indicate target section when navigating home
      router.push(`/?targetId=${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen relative text-gray-900 overflow-x-hidden selection:bg-black selection:text-white">
      <DitherBackground />
      <DecorativeElements />
      <CRTOverlay />
      
      <div className="relative z-20 min-h-screen flex flex-col">
        <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
        
        <main className="flex-grow container mx-auto px-4 md:px-6">
          {children}
        </main>
        
        <Footer />
        <MusicPlayer />
      </div>
    </div>
  );
};

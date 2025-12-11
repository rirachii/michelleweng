"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// Adjust imports to relative path from app/page.tsx (which is at root level app/) 
// -> components is ../components? No, app is at root alongside components. So ../components
import { Home } from '../components/Home'; // Changed from pages dir
import { Projects } from '../components/Projects';
import { AIChat } from '../components/AIChat';
import { Layout } from '../components/Layout';

// Component handling search params (must be inside Suspense)
function LandingPageContent() {
  const [activeSection, setActiveSection] = useState('home');
  const searchParams = useSearchParams();
  const targetId = searchParams.get('targetId');

  // Handle navigation from other pages back to specific sections
  // Handle navigation and scroll restoration
  useEffect(() => {
    // Prevent browser from restoring scroll position
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (targetId) {
      setTimeout(() => {
        if (targetId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Force scroll to top on load if no targetId
      window.scrollTo(0, 0);
    }
  }, [targetId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        root: null,
        rootMargin: '-20% 0px -60% 0px', 
        threshold: 0
      }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <Layout activeSection={activeSection}>
      <section id="home" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
         <Home />
      </section>
      
      <section id="projects" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
         <Projects />
      </section>
      
      <section id="ai-uplink" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
         <AIChat />
      </section>
    </Layout>
  );
}

export default function LandingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LandingPageContent />
    </Suspense>
  );
}

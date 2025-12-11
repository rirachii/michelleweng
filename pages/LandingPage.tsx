import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home } from './Home';
import { Projects } from './Projects';
import { AIChat } from './AIChat';
import { Layout } from '../components/Layout';

export const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Handle navigation from other pages back to specific sections
  useEffect(() => {
    if (location.state && location.state.targetId) {
      const targetId = location.state.targetId;
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      // Clear state to avoid scrolling on refresh? optional.
    }
  }, [location]);

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
      
      {/* Blog rendered via Home component layout, so we don't need a separate section unless specifically for mobile/nav targeting if it was separate. 
          Wait, in the previous refactor we moved Blog INSIDE Home. 
          However, the Navigation links point to #blog. 
          The Home component has a div with id="blog". 
          So we don't need a top-level section for blog if it's inside Home.
          
          BUT, the Projects and AI Chat ARE separate sections.
      */}

      <section id="projects" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
         <Projects />
      </section>
      
      <section id="ai-uplink" className="min-h-screen flex flex-col justify-center py-20 scroll-mt-20">
         <AIChat />
      </section>
    </Layout>
  );
};

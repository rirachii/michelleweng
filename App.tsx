import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { BlogPost } from './pages/BlogPost';

import { Transcript } from './pages/Transcript';

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/transcript" element={<Transcript />} />
    </Routes>
  );
}
import React, { useState, useEffect } from 'react';
import { BackgroundScrollCanvas } from './components/BackgroundScrollCanvas';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ServicesSection } from './components/ServicesSection';
import { StatementSection } from './components/StatementSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>(() => {
    try {
      const saved = localStorage.getItem('bestryful_lang');
      if (saved === 'en' || saved === 'ar') return saved;
    } catch {
      // ignore
    }
    return 'ar'; // Default to Arabic on first visit
  });
  const [selectedService, setSelectedService] = useState<string>('Full Stack Development');

  // Sync document direction with current language
  useEffect(() => {
    try {
      localStorage.setItem('bestryful_lang', lang);
    } catch {
      // ignore
    }
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`relative min-h-screen bg-transparent text-white selection:bg-lime-400 selection:text-zinc-950 font-sans`}>
      {/* 1. Seamless Cinematic Background Animation Scrub Engine */}
      <BackgroundScrollCanvas />

      {/* 2. Top Navigation Header */}
      <Header lang={lang} setLang={setLang} />

      {/* 3. Main Translucent Landing Page Content */}
      <main className="relative z-10">
        {/* Section 1: Hero Banner with 3D Arc Curved Projects Carousel */}
        <HeroBanner lang={lang} />

        {/* Section 2: Full Services Menu & Transparent Pricing (~40% width on laptop, centered, more transparent) */}
        <ServicesSection 
          lang={lang} 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

        {/* Section 3: Big Statement Section: Bestryful - Where Ideas Come to Reality */}
        <StatementSection lang={lang} />

        {/* Section 4: Contact Section (Centered header, Channels on one side, Form on the other side) */}
        <ContactSection 
          lang={lang} 
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />
      </main>

      {/* 4. Translucent Footer */}
      <Footer lang={lang} />
    </div>
  );
}

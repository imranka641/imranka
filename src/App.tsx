import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { CVSection } from './components/CVSection';
import { GitHubSpotlight } from './components/GitHubSpotlight';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ChatBot } from './components/ChatBot';
import { CursorAura } from './components/CursorAura';
import { CinematicIntro } from './components/CinematicIntro';
import { prefersReducedMotion } from './utils/webglUtils';

export function AppContent() {
  const { isRTL } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Business Website');
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'experience',
        'services',
        'process',
        'cv',
        'contact',
      ];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectServiceType = (projectType: string) => {
    setSelectedProjectType(projectType);
  };

  const handleOpenCV = () => {
    setIsCVModalOpen(true);
  };

  const handleCloseCV = () => {
    setIsCVModalOpen(false);
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#030612] dark:bg-[#030612] light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 transition-colors duration-300 font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200"
    >
      {/* Brief Non-Blocking Cinematic Load Accent */}
      <CinematicIntro />

      {/* Subtle Ambient Pointer Spotlight (Desktop Only) */}
      <CursorAura />

      {/* Top Sticky Navigation */}
      <Navbar activeSection={activeSection} onOpenCV={handleOpenCV} />

      {/* Main Sections */}
      <main>
        <Hero onOpenCV={handleOpenCV} />
        <About onOpenCV={handleOpenCV} />
        <Skills />
        <Projects />
        <ExperienceEducation />
        <Services onSelectServiceType={handleSelectServiceType} />
        <Process />
        <CVSection onOpenCVModal={handleOpenCV} />
        <GitHubSpotlight />
        <Contact selectedProjectType={selectedProjectType} />
      </main>

      {/* Footer */}
      <Footer onOpenCV={handleOpenCV} />

      {/* Interactive CV Modal Provider */}
      <CVModal isOpen={isCVModalOpen} onClose={handleCloseCV} />

      {/* Interactive AI ChatBot for Overall Experience & Projects Q&A */}
      <ChatBot onOpenCV={handleOpenCV} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

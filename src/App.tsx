import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { CVSection } from './components/CVSection';
import { GitHubSpotlight } from './components/GitHubSpotlight';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';

export function AppContent() {
  const { isRTL } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('Business Website');
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'services', 'process', 'cv', 'contact'];
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
      className="min-h-screen bg-neutral-950 dark:bg-neutral-950 light:bg-neutral-50 text-neutral-100 dark:text-neutral-100 light:text-neutral-900 transition-colors duration-300 font-sans"
    >
      {/* Top Sticky Navigation */}
      <Navbar activeSection={activeSection} onOpenCV={handleOpenCV} />

      {/* Main Sections */}
      <main>
        <Hero onOpenCV={handleOpenCV} />
        <About onOpenCV={handleOpenCV} />
        <Skills />
        <Projects />
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

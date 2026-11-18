import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Github,
  Linkedin,
  Menu,
  X,
  ArrowUpRight,
  FileText,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface NavbarProps {
  activeSection: string;
  onOpenCV?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onOpenCV }) => {
  const { theme, toggleTheme } = useTheme();
  const { t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: '#home', id: 'home' },
    { name: t.nav.about, href: '#about', id: 'about' },
    { name: t.nav.skills, href: '#skills', id: 'skills' },
    { name: t.nav.projects, href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: t.nav.services, href: '#services', id: 'services' },
    { name: t.nav.contact, href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#cv' && onOpenCV) {
      onOpenCV();
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[#030612]/85 dark:bg-[#030612]/85 light:bg-white/90 backdrop-blur-md border-b border-cyan-500/15 light:border-slate-200/90 shadow-lg shadow-black/20'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-lg font-display font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md px-1"
          >
            Imran Kedir
          </a>

          {/* Zone 2: Clean Single-Line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-cyan-400 dark:text-cyan-400 light:text-blue-600'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Utilities & Primary Action */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <LanguageToggle />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-900/50 dark:bg-slate-900/70 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <a
              href="https://github.com/imranka641"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-400 bg-slate-900/50 dark:bg-slate-900/70 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-colors"
              aria-label="GitHub Profile"
              title="GitHub (@imranka641)"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/imranka641/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-400 bg-slate-900/50 dark:bg-slate-900/70 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {onOpenCV && (
              <button
                onClick={onOpenCV}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-cyan-400 dark:text-cyan-300 light:text-blue-700 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all whitespace-nowrap shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.nav.viewCv}</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap shrink-0"
            >
              <span>{t.nav.contactMe}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex sm:hidden items-center gap-1.5">
            <LanguageToggle />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-white bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-200"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#030612]/95 dark:bg-[#030612]/95 light:bg-white/95 border-b border-slate-800 light:border-slate-200 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900/50 light:hover:bg-slate-100'
                    }`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 light:border-slate-200 flex flex-col gap-2">
              {onOpenCV && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCV();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold border border-cyan-500/40 text-cyan-400 bg-cyan-500/10"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.nav.viewCv}</span>
                </button>
              )}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://github.com/imranka641"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-800"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/imranka641/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-medium border border-slate-800 light:border-slate-200 text-slate-300 light:text-slate-800"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                <span>{t.nav.contactMe}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

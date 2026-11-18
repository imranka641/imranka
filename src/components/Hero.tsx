import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Send,
  MapPin,
  FileText,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { HeroCanvas3D } from './HeroCanvas3D';
import { prefersReducedMotion } from '../utils/webglUtils';

interface HeroProps {
  onOpenCV?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const { t, isRTL, language } = useLanguage();
  const { theme } = useTheme();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.75,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayName = language === 'en' ? 'Imran Kedir Ahmed' : t.hero.name;
  const mainTitle =
    language === 'en' ? 'Full-Stack Web & Mobile Developer' : t.hero.titles[0];
  const subTitle =
    language === 'en'
      ? 'Building modern, scalable, and meaningful digital experiences.'
      : t.hero.titles[1] || t.hero.description;

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Interactive 3D Environment Layer */}
      <HeroCanvas3D isLightMode={theme === 'light'} />

      {/* Subtle Ambient Atmospheric Glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-blue-600/12 dark:bg-blue-600/15 blur-[140px] rounded-full pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-purple-600/10 dark:bg-purple-600/15 blur-[140px] rounded-full pointer-events-none -z-10"
      />

      {/* Left-to-right protective contrast scrim on dark mode so text remains razor sharp over 3D particles */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#030612]/90 via-[#030612]/55 to-transparent dark:from-[#030612]/90 dark:via-[#030612]/55 light:from-white/85 light:via-white/55 light:to-transparent pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Cinematic Typography & Actions */}
          <div
            className={`lg:col-span-7 flex flex-col items-start ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            {/* Clean Unboxed Location & Availability Metadata */}
            <div className="hero-reveal flex flex-wrap items-center gap-2.5 text-xs font-mono text-cyan-400 dark:text-cyan-400 light:text-blue-700 mb-5">
              <span>{t.hero.badgeStatus}</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {t.hero.badgeLocation}
              </span>
            </div>

            {/* Oversized Futuristic Name */}
            <h1 className="hero-reveal text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight leading-[1.06] text-slate-900 dark:text-white mb-4 text-balance">
              <span className="block text-slate-400 dark:text-slate-400 light:text-slate-500 text-lg sm:text-xl font-sans font-medium mb-2">
                {t.hero.greeting}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 dark:from-white dark:via-cyan-200 dark:to-purple-300 light:from-slate-900 light:via-blue-700 light:to-cyan-600">
                {displayName}
              </span>
            </h1>

            {/* Main Role Title */}
            <div className="hero-reveal text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-cyan-400 dark:text-cyan-300 light:text-blue-600 mb-4 tracking-tight">
              {mainTitle}
            </div>

            {/* Subtitle */}
            <p className="hero-reveal text-lg sm:text-xl text-slate-700 dark:text-slate-200 font-medium max-w-2xl leading-relaxed mb-3">
              {subTitle}
            </p>

            {/* Concise Engineering Summary */}
            <p className="hero-reveal text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed mb-8">
              {t.hero.description}
            </p>

            {/* Primary CTAs */}
            <div className="hero-reveal flex flex-wrap items-center gap-3.5 mb-8">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Explore My Work</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-900 dark:text-white bg-white/80 dark:bg-[#080e22]/80 border border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 transition-all hover:-translate-y-0.5 backdrop-blur-md whitespace-nowrap"
              >
                <span>Contact Me</span>
                <ArrowUpRight className={`w-4 h-4 text-cyan-400 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </a>

              {onOpenCV && (
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.hero.ctaCv}</span>
                </button>
              )}
            </div>

            {/* Direct Social & Messaging Channels */}
            <div className="hero-reveal flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                Connect:
              </span>

              <a
                href="https://github.com/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/50 dark:bg-[#080e22]/85 light:bg-white border border-slate-800 light:border-slate-200 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/imranka641/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/50 dark:bg-[#080e22]/85 light:bg-white border border-slate-800 light:border-slate-200 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:imranka641@gmail.com"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900/50 dark:bg-[#080e22]/85 light:bg-white border border-slate-800 light:border-slate-200 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                aria-label="Email Imran Kedir Ahmed"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>

              <a
                href="https://t.me/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/50 dark:bg-[#080e22]/85 light:bg-white border border-slate-800 light:border-slate-200 text-slate-700 dark:text-slate-200 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors"
                title="Telegram @imranka641"
                aria-label="Telegram Message"
              >
                <Send className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/251913841757"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900/50 dark:bg-[#080e22]/85 light:bg-white border border-slate-800 light:border-slate-200 text-slate-700 dark:text-slate-200 hover:text-emerald-400 hover:border-emerald-400/50 transition-colors"
                title="WhatsApp +251 913 841 757"
                aria-label="WhatsApp Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Unobstructed 3D Viewport Stage + Subtle Spatial Caption */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-end min-h-[460px] pointer-events-none">
            <div className="mt-auto p-4 rounded-2xl bg-[#080e22]/70 dark:bg-[#080e22]/75 light:bg-white/85 border border-cyan-500/20 backdrop-blur-md text-right space-y-1 max-w-xs">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                Interactive 3D Core
              </div>
              <div className="text-xs text-slate-300 light:text-slate-700">
                Move cursor to steer spatial parallax across the WebGL environment.
              </div>
              <div className="text-[11px] font-mono text-slate-400 tabular-nums pt-1">
                13+ Live Systems · Web &amp; Mobile
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Affordance */}
      <a
        href="#about"
        onClick={(e) => scrollToSection(e, '#about')}
        aria-label="Scroll to About section"
        className="hidden sm:flex items-center gap-2 absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors z-10"
      >
        <span>Scroll to explore</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  );
};

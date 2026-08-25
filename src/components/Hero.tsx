import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Github, 
  Mail, 
  MessageSquare, 
  Send, 
  MapPin, 
  Terminal, 
  Code2, 
  Database, 
  Cpu,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenCV?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const { t, isRTL } = useLanguage();
  const titles = t.hero.titles;
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    setCurrentTitleIndex(0);
  }, [titles]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3600);
    return () => clearInterval(interval);
  }, [titles.length]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const industries = [
    'Healthcare & Dental',
    'Hospitality & Dining',
    'Specialty Coffee',
    'Educational Tech',
    'Islamic Technology',
    'Legal-Tech & Calculators',
    'Productivity Utilities',
    'Management Dashboards'
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 dark:from-emerald-500/15 dark:via-teal-500/10 dark:to-cyan-500/15 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[90px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 dark:bg-cyan-500/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Call-to-Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`lg:col-span-7 flex flex-col items-start ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Status & Location Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-neutral-900/60 dark:bg-neutral-900/80 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-6 backdrop-blur-sm shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t.hero.badgeStatus}</span>
              <span className="text-neutral-400 dark:text-neutral-600">•</span>
              <span className="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {t.hero.badgeLocation}
              </span>
            </div>

            {/* Main Greeting */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15] mb-4">
              {t.hero.greeting} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400">{t.hero.name}</span>{' '}
              <span className="inline-block animate-bounce origin-bottom-right">👋</span>
            </h1>

            {/* Animated Title Switcher */}
            <div className="h-12 sm:h-14 flex items-center mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentTitleIndex}-${t.hero.titles[0]}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-neutral-700 dark:text-neutral-200 font-mono flex items-center gap-2"
                >
                  <span className="text-emerald-500 font-bold">&gt;</span>
                  <span>{titles[currentTitleIndex]}</span>
                  <span className="w-2 h-5 bg-emerald-500 animate-pulse ml-0.5"></span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Paragraph Introduction */}
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed mb-6">
              {t.hero.description}
            </p>

            {/* Industry Expertise Tags */}
            <div className="w-full mb-8">
              <span className="text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-2.5 block">
                Cross-Industry Solutions:
              </span>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span 
                    key={ind}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-900/40 dark:bg-neutral-900/70 light:bg-neutral-100 text-neutral-700 dark:text-neutral-300 border border-neutral-800/80 dark:border-neutral-800 light:border-neutral-200/80"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, '#projects')}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 hover:-translate-y-0.5"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>

              {onOpenCV && (
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all hover:-translate-y-0.5 shadow-sm"
                  title="Open Imran's CV Hub"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.hero.ctaCv}</span>
                </button>
              )}

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-900/40 dark:bg-neutral-900/70 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-300 hover:border-neutral-700 dark:hover:border-neutral-700 hover:bg-neutral-800/50 light:hover:bg-neutral-50 transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <span>{t.hero.ctaContact}</span>
                <ArrowUpRight className={`w-4 h-4 text-emerald-500 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </a>
            </div>

            {/* Quick Contact & Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono mr-1">Direct Channels:</span>
              
              <a
                href="https://github.com/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="mailto:imranka641@gmail.com"
                className="p-2.5 rounded-xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                title="Email imranka641@gmail.com"
                aria-label="Email Imran Kedir"
              >
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/251913841757"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                title="WhatsApp +251 913 841 757"
                aria-label="WhatsApp Message"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <a
                href="https://t.me/imranka641"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/50 transition-colors"
                title="Telegram @imranka641"
                aria-label="Telegram Message"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Developer Abstract Visual & Terminal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Terminal Window Container */}
            <div className="relative rounded-2xl bg-neutral-900/90 dark:bg-neutral-900/95 light:bg-neutral-900 border border-neutral-800/90 shadow-2xl overflow-hidden backdrop-blur-xl">
              
              {/* Window Title Bar */}
              <div className="px-4 py-3 bg-neutral-950/80 border-b border-neutral-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>imran-developer-workspace</span>
                </div>
                <div className="text-xs text-neutral-500 font-mono">v2.6.0</div>
              </div>

              {/* Terminal Code Visuals */}
              <div className="p-5 font-mono text-xs sm:text-sm space-y-3.5 text-neutral-300 text-left" dir="ltr">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-emerald-400">$</span>
                  <span>cat developer-profile.json</span>
                </div>

                <div className="bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/60 text-xs space-y-1.5 leading-relaxed">
                  <div>
                    <span className="text-cyan-400">"name"</span>: <span className="text-emerald-300">"Imran Kedir"</span>,
                  </div>
                  <div>
                    <span className="text-cyan-400">"role"</span>: <span className="text-emerald-300">"Full-Stack Developer"</span>,
                  </div>
                  <div>
                    <span className="text-cyan-400">"location"</span>: <span className="text-emerald-300">"Addis Ababa, Ethiopia"</span>,
                  </div>
                  <div>
                    <span className="text-cyan-400">"stack"</span>: [
                    <span className="text-amber-300">"React"</span>, <span className="text-amber-300">"Node.js"</span>, <span className="text-amber-300">"TypeScript"</span>, <span className="text-amber-300">"PHP"</span>, <span className="text-amber-300">"MySQL"</span>, <span className="text-amber-300">"PostgreSQL"</span>],
                  </div>
                  <div>
                    <span className="text-cyan-400">"status"</span>: <span className="text-emerald-400 font-semibold">"Ready for client projects & deployment"</span>
                  </div>
                </div>

                {/* Real-time System Metrics Simulation */}
                <div className="pt-2 border-t border-neutral-800/80 space-y-2.5">
                  <div className="text-neutral-400 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Cpu className="w-3.5 h-3.5" /> Full Lifecycle Capability
                    </span>
                    <span className="text-neutral-400">100% Operational</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                      <div className="text-emerald-400 font-bold text-sm">9+</div>
                      <div className="text-[10px] text-neutral-400">Featured Apps</div>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                      <div className="text-cyan-400 font-bold text-sm">Full</div>
                      <div className="text-[10px] text-neutral-400">Stack Scope</div>
                    </div>
                    <div className="p-2 rounded-lg bg-neutral-950/70 border border-neutral-800/80">
                      <div className="text-amber-400 font-bold text-sm">Fast</div>
                      <div className="text-[10px] text-neutral-400">Performance</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Tech Badges on Container */}
              <div className="px-5 py-3 bg-neutral-950/90 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-2" dir="ltr">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">React</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">Node.js</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Decorative Floating Tech Badges */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-4 bg-neutral-900/90 dark:bg-neutral-900/95 light:bg-white px-3.5 py-2 rounded-xl shadow-xl border border-neutral-700/60 dark:border-neutral-800 light:border-neutral-200 hidden sm:flex items-center gap-2"
              dir="ltr"
            >
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-neutral-900 dark:text-white">Clean Code</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">TypeScript & React</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 1, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-4 bg-neutral-900/90 dark:bg-neutral-900/95 light:bg-white px-3.5 py-2 rounded-xl shadow-xl border border-neutral-700/60 dark:border-neutral-800 light:border-neutral-200 hidden sm:flex items-center gap-2"
              dir="ltr"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <div className="font-semibold text-neutral-900 dark:text-white">Database Design</div>
                <div className="text-[10px] text-neutral-500 dark:text-neutral-400">MySQL & PostgreSQL</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

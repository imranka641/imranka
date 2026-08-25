import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations/translations';

interface LanguageToggleProps {
  compact?: boolean;
  className?: string;
}

const LANGUAGES: Array<{
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}> = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    region: 'Global / Tech'
  },
  {
    code: 'am',
    name: 'Amharic',
    nativeName: 'አማርኛ',
    flag: '🇪🇹',
    region: 'Addis Ababa / Local'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    region: 'MENA / Regional'
  }
];

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ compact = false, className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-900/40 dark:bg-neutral-900/60 light:bg-neutral-100 border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 hover:border-emerald-500/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm"
        aria-expanded={isOpen}
        aria-label="Switch Language"
        title="Switch Language (English / አማርኛ / العربية)"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-medium tracking-wide font-mono uppercase text-[11px]">
          {currentLang.code}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-neutral-900 dark:bg-neutral-900 light:bg-white border border-neutral-800 dark:border-neutral-800 light:border-neutral-200 shadow-2xl shadow-black/40 z-50 p-1.5 focus:outline-none backdrop-blur-xl"
          >
            <div className="px-3 py-2 text-[10.5px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider border-b border-neutral-800/80 dark:border-neutral-800/80 light:border-neutral-200/80 flex items-center justify-between">
              <span>Select Language</span>
              <span className="text-[10px] text-emerald-500 font-mono">3 Available</span>
            </div>

            <div className="py-1 space-y-0.5">
              {LANGUAGES.map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelect(lang.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-800/50 dark:hover:bg-neutral-800/60 light:hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-neutral-900 dark:text-white">
                          {lang.nativeName}
                        </span>
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          {lang.name} • {lang.region}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

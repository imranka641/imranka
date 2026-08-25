import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language, translations, TranslationDictionary } from '../translations/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('imran_portfolio_lang') as Language | null;
      if (saved === 'en' || saved === 'am' || saved === 'ar') {
        return saved;
      }
    }
    return 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    if (language === 'ar') {
      root.setAttribute('dir', 'rtl');
      root.classList.add('font-arabic');
    } else {
      root.setAttribute('dir', 'ltr');
      root.classList.remove('font-arabic');
    }

    if (language === 'am') {
      root.classList.add('font-ethiopic');
    } else {
      root.classList.remove('font-ethiopic');
    }

    localStorage.setItem('imran_portfolio_lang', language);
  }, [language]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

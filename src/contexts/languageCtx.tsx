'use client'

import { LanguageType, LanguageContextType } from "@/interface/language";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

const STORAGE_KEY = 'lang';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({children}: {children:ReactNode}) => {
  const [language, setLanguage] = useState<LanguageType>('EN');

  // Restore the saved choice after mount (localStorage is client-only)
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY);
      if (savedLang === 'EN' || savedLang === 'JPN') {
        setLanguage(savedLang);
      }
    } catch {
      // Storage blocked (private mode etc.) — stay on default
    }
  }, []);

  // Keep <html lang> in sync for screen readers and font selection
  useEffect(() => {
    document.documentElement.lang = language === 'JPN' ? 'ja' : 'en';
  }, [language]);

  const toggleLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore — choice just won't persist
    }
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

'use client'

import { getCookies } from "@/functions/Internal/cookies";
import { LanguageType, LanguageContextType } from "@/interface/language";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({children}: {children:ReactNode}) => {
  const [language, setLanguage] = useState<LanguageType>('EN');

  useEffect(() => {
    const getLang = async () => {
      const savedLang = await getCookies("lang");
      if (savedLang === 'EN' || savedLang === 'JPN') {
        setLanguage(savedLang);
      }
    }
    getLang();
  }, []);

  const toggleLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem('lang', lang);
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

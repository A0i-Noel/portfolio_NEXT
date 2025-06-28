'use client'

import { getCookies } from "@/functions/Internal/cookies";
import { LanguageType } from "@/interface/language";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

const LanguageContext = createContext<LanguageType | undefined>(undefined);

export const LanguageProvider = ({children}: {children:ReactNode}) => {

  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const getLang = async() => {
      const savedLang = await getCookies("lang")
      if(savedLang){
        setLanguage(savedLang)
      }
    }
    getLang()
  },[])

  const toggleLanguage = (lang:string) => {
    setLanguage(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage
    }} >
    {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext)
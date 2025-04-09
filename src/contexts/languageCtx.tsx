'use client'

import { LanguageType } from "@/interface/language";
import { Cookies } from "js-cookie";
import { createContext, useContext, useEffect, useState, ReactNode } from "react"

const LanguageContext = createContext<LanguageType | undefined>(undefined);

export const LanguageProvider = ({children}: {children:ReactNode}) => {

  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const savedLang = Cookies.get('lang')
    if(savedLang){
      setLanguage(savedLang)
    }
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
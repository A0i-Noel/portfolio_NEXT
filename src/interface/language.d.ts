import { LanguageProvider } from "@/contexts/languageCtx";

export interface LanguageType{
  language : string;
  toggleLanguage: (lang: string) => void;
}

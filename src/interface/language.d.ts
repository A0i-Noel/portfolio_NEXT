export type LanguageType = 'EN' | 'JPN';
export interface LanguageContextType {
  language: LanguageType;
  toggleLanguage: (lang: LanguageType) => void;
}

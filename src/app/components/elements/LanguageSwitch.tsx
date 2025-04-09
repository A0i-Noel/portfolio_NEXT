'use client'

import { useLanguage } from "@/contexts/languageCtx";


const LanguageSwitch = () => {

  const { language, toggleLanguage } = useLanguage();

  const isJPN = language === "JPN"

  const handleChange = () => {
    toggleLanguage(isJPN ? "EN" : "JPN");
  }

  return (
    <div className="l-flex__row">
      <label style={{margin: "0 12px"}}>EN</label>
      <form action="#">
        <label className="switch">
          <input
            type="checkbox"
            checked={isJPN}
            onChange={handleChange}
          />
          <span className="slider"></span>
        </label>
      </form>
      <label style={{margin: "0 12px"}}>JPN</label>
    </div>
  );
}

export default LanguageSwitch;
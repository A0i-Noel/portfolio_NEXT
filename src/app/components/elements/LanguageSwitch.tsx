'use client'

import { useLanguage } from "@/contexts/languageCtx";


const LanguageSwitch = () => {

  const { language, toggleLanguage } = useLanguage();

  const isJPN = language === "JPN"

  const handleChange = () => {
    toggleLanguage(isJPN ? "EN" : "JPN");
  }

  return (
    <div className="l-flex__row p-langSwitch">
      <label style={{margin: "0 12px",color:"#fff"}}>EN</label>
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
      <label style={{margin: "0 12px",color:"#fff"}}>JPN</label>
    </div>
  );
}

export default LanguageSwitch;
'use client';

import { useLanguage } from "@/contexts/languageCtx";
import "./hero.scss";
import { heroTexts } from "./heroText";

const Hero = () => {
  const { language } = useLanguage()
  return (
    <div className="p-hero__container">
      <div className="p-hero__box">
        <h1>{heroTexts.intro[language]}</h1>
      </div>
      <div className="p-hero__box">

      </div>
    </div>
  );
}

export default Hero;
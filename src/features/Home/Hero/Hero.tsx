'use client';

import { useLanguage } from "@/contexts/languageCtx";
import "./hero.scss";
import {motion} from "framer-motion";
import { TypingText } from "@/app/components/elements/Texts/TypeText";
import GalaxyBackground from "@/features/p5/core";
const winImg = "/images/winDay.jpg";
const teamImg = "/images/Team.jpg";
const meImg = "/images/me.jpg";

const Hero = () => {
  const { language } = useLanguage()

  const heroTexts = {
  name : {
    EN : "Aoi Kuriki",
    JPN : "栗木 碧唯"
  },
  intro : {
    EN: ["Co-founder and COO/CTO of Subitt LLC | Bachelor of Computer Science and Finance minor at BYU-I"],
    JPN : [
      "Subitt LLC共同創業者、最高執行責任者(COO)、最高技術責任者(CTO)",
      "ブリガムヤング大学アイダホ校卒業、Computer Science学士号,Finance副専攻証明書"
    ]
  }
  } as const;

  return (
    <div className="p-hero__container">
      <GalaxyBackground className="p-hero__galaxy"/>
      <div className="p-hero__box">
        <TypingText text={heroTexts?.name[language]} tag={"h1"} />
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition:{duration:3}
          }}
        >
          {
            heroTexts?.intro[language].map((e:string,i:number) => (
              <p key={i}>{e}</p>
            ))
          }


        </motion.div>
      </div>
      <div className="p-hero__box">
        <div className="p-hero__imgs">
          <motion.img 
          initial={{
            opacity: 0,
            x:-100,
          }}
          animate={{
            opacity: 1,
            x:0,
            transition:{duration:3.5}
          }}
            src={winImg} 
            alt="win pic" 
            className="p-hero__imgs--win" 
          />
          <motion.img 
          initial={{
            opacity: 0,
            x:100,
          }}
          animate={{
            opacity: 1,
            x:0,
            transition:{
              duration:3,
              delay:.5,
            }
          }}

          src={meImg} 
          alt="me pic" 
          className="p-hero__imgs--me" 
          />
          <motion.img 
          initial={{
            opacity: 0,
            y:100,
          }}
          animate={{
            opacity: 1,
            y:0,
            transition:{
              duration:4,
              delay: 1
            }
          }}
          
          src={teamImg} 
          alt="team pic" 
          className="p-hero__imgs--team" 
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
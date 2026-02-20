"use client"

import { ReactNode, useRef } from "react";
import { motion, useInView } from 'framer-motion'

const TitleFadeIn = ({children, duration=2, delay=0} : {children : ReactNode, duration? : number, delay? : number}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div
    ref={ref}
    initial={{
      opacity:0,
      y:30,
      width: "20%",
      overflow:"hide",
      borderBottom:"#fff 1px solid",
      borderBottomWidth:"0%",
      paddingBottom: 12,
    }}
    animate={isInView ? {
        opacity: 1,
        y: 0,
        width: "50%",
        overflow:"hide",
        borderBottom: "#fff 1px solid",
        borderBottomWidth: "100%",
        paddingBottom: 12,
      } : {}}
    transition={{ 
      duration: duration,
      delay: delay 
    }}
    >
      {children}
    </motion.div>
  );
}

export default TitleFadeIn;
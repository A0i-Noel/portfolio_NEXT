"use client"

import { ReactNode, useRef } from "react";
import { motion, useInView } from 'framer-motion'

const FadeIn = ({children, duration=2, delay=0} : {children : ReactNode, duration? : number, delay? : number}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  return (
    <motion.div
    ref={ref}
    initial={{
      opacity:0,
      width: "100%",
      display:"flex",
      flexDirection:"column",
      justifyContent:"flex-start",
      alignItems:"center",
      y:30,
    }}
    animate={isInView ? {
        opacity: 1,
        width: "100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-start",
        alignItems:"center",
        y: 0,
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

export default FadeIn;
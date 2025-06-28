import { ElementType, useEffect, useState } from "react";
import { motion } from "framer-motion";

type TypingTextProps = {
  text?: string;
  speed?: number;
  tag?: ElementType;
  className?: string; // 'p', 'h1', 'span', etc.
};

export const TypingText = ({ text = "", speed = 100, tag: Tag = "p", className="" }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      return;
    }

    setDisplayedText("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      // Safely get char only if within bounds
      if (currentIndex < text.length) {
        const nextChar = text.charAt(currentIndex); // charAt avoids accidental undefined
        setDisplayedText((prev) => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const MotionTag = motion(Tag);

  return (
    <MotionTag
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {displayedText}
    </MotionTag>
  );
};

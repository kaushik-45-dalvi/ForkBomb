"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GlitchText({ text, className }: { text: string; className?: string }) {
  const [glitchText, setGlitchText] = useState(text);
  const characters = "ABCDEFHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.span 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className={className}
    >
      {glitchText}
    </motion.span>
  );
}

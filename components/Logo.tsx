"use client";

import { motion } from "framer-motion";

export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        {/* Outer Ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="10 5"
          className="text-brand-primary/20"
        />
        
        {/* The Bomb Body */}
        <motion.circle
          cx="50"
          cy="55"
          r="25"
          fill="currentColor"
          className="text-brand-primary"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* The Fork Tines */}
        <motion.path
          d="M35 30V45M50 25V45M65 30V45"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className="text-brand-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        {/* The Fuse */}
        <motion.path
          d="M50 30C50 20 60 15 70 20"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="text-brand-danger"
          animate={{ strokeDashoffset: [0, -20] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* The Spark */}
        <motion.circle
          cx="70"
          cy="20"
          r="3"
          fill="#EF4444"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

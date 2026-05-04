"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Skull, Share2, Zap, TrendingUp, Award } from "lucide-react";

interface RoastRoomProps {
  isOpen: boolean;
  onClose: () => void;
  onNextDuel?: () => void;
  verdict: string;
  scores: {
    performance: number;
    elegance: number;
    creativity: number;
  };
}

export default function RoastRoom({ isOpen, onClose, onNextDuel, verdict, scores }: RoastRoomProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg/95 backdrop-blur-2xl">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-brand-primary/20 bg-[#161412] shadow-[0_0_80px_rgba(245,199,93,0.15)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-brand-text/5 bg-brand-bg px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-serif text-2xl text-brand-text">Match Summary</h2>
                <p className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest">Session #842 // Complete</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-full p-2 hover:bg-brand-text/5 transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-8">
            {/* Match Impact Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-brand-text/5 bg-brand-text/[0.02] p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-brand-text/40 uppercase tracking-widest mb-2">
                  <TrendingUp className="h-3 w-3 text-brand-success" />
                  ELO Impact
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">1,452</span>
                  <span className="text-sm font-bold text-brand-success">+32</span>
                </div>
              </div>
              <div className="rounded-2xl border border-brand-text/5 bg-brand-text/[0.02] p-4">
                <div className="flex items-center gap-2 text-[10px] font-mono text-brand-text/40 uppercase tracking-widest mb-2">
                  <Award className="h-3 w-3 text-brand-primary" />
                  Global Rank
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">#1,284</span>
                  <span className="text-sm font-bold text-brand-primary">↑ 42</span>
                </div>
              </div>
            </div>

            {/* AI Verdict */}
            <div className="relative mb-10 rounded-2xl bg-brand-primary/5 p-8 border border-brand-primary/10">
              <div className="absolute -top-3 left-6 bg-brand-bg px-2 text-[10px] font-mono text-brand-primary uppercase tracking-widest">
                AI Judge Verdict
              </div>
              <p className="font-serif text-2xl leading-relaxed italic text-brand-text">
                "{verdict || "Your code is surprisingly efficient. I expected worse."}"
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Skull className="h-4 w-4 text-brand-danger" />
                <span className="text-[10px] font-mono text-brand-danger uppercase">Savage Rating: Extreme</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { label: "Performance", value: scores.performance, color: "text-brand-primary", bg: "bg-brand-primary" },
                { label: "Elegance", value: scores.elegance, color: "text-brand-danger", bg: "bg-brand-danger" },
                { label: "Creativity", value: scores.creativity, color: "text-brand-success", bg: "bg-brand-success" }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-brand-text/40">
                    <span>{stat.label}</span>
                    <span className={stat.color}>{stat.value}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-brand-text/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className={`h-full rounded-full ${stat.bg}`} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-primary py-4 text-sm font-bold text-brand-bg transition-transform hover:scale-[1.02] active:scale-[0.98]">
                <Share2 className="h-4 w-4" />
                SHARE VICTORY
              </button>
              <button 
                onClick={onNextDuel || onClose}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-text/20 py-4 text-sm font-bold transition-transform hover:bg-brand-text/5 active:scale-[0.98]"
              >
                <Zap className="h-4 w-4 text-brand-primary" />
                NEXT DUEL
              </button>
            </div>
          </div>

          {/* Glitch Overlay Effect */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

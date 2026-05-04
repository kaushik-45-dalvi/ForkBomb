"use client";

import Link from "next/link";
import { Terminal, Zap, Shield, Trophy, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import DemoModal from "@/components/DemoModal";
import Logo from "@/components/Logo";

export default function LandingPage() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden">
      {/* Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />

      {/* Hero Glow (The Moat Style) */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 opacity-20">
        <div className="h-[600px] w-[800px] rounded-full bg-brand-primary blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-8 md:px-12">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
          <span className="text-xl font-bold tracking-tighter text-brand-text">FORKBOMB</span>
        </Link>
        
        <div className="hidden items-center gap-8 md:flex">
          <Link href="#features" className="text-sm font-medium transition-colors hover:text-brand-primary">Features</Link>
          <Link href="/arena" className="text-sm font-medium transition-colors hover:text-brand-primary">Arena</Link>
          <Link href="/leaderboard" className="text-sm font-medium transition-colors hover:text-brand-primary">Leaderboard</Link>
          <Link href="#enterprise" className="text-sm font-medium transition-colors hover:text-brand-primary">Enterprise</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium transition-colors hover:text-brand-primary">Sign In</Link>
          <Link 
            href="/signup" 
            className="rounded-full bg-brand-primary px-6 py-2 text-sm font-bold text-brand-bg transition-transform hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-32 text-center md:px-12 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 px-4 py-1.5 backdrop-blur-md"
        >
          <Zap className="h-4 w-4 text-brand-primary" />
          <span className="text-xs font-semibold tracking-widest text-brand-primary uppercase">v1.0 Ready for Deployment</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl font-serif text-6xl leading-[1.1] md:text-8xl"
        >
          Everything you need to <br />
          <span className="italic text-brand-primary">code faster</span> today
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 max-w-2xl text-lg text-brand-text/60 md:text-xl"
        >
          The digital colosseum where developers face off in real-time. 
          No more boring whiteboards. It's time to turn your code into a combat sport.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col gap-4 sm:flex-row"
        >
          <Link 
            href="/arena" 
            className="group flex items-center justify-center gap-2 rounded-full bg-brand-primary px-8 py-4 text-lg font-bold text-brand-bg transition-all hover:pr-10"
          >
            Enter The Arena
            <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="#how-it-works"
            className="flex items-center justify-center gap-2 rounded-full border border-brand-text/20 bg-transparent px-8 py-4 text-lg font-medium transition-colors hover:bg-brand-text/5"
          >
            How it works
          </Link>
        </motion.div>
      </section>

      {/* How it Works / How to Play Section */}
      <section id="how-it-works" className="relative z-10 bg-[#0F0D0A]/80 py-32 backdrop-blur-3xl">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-20 text-center">
            <h2 className="font-serif text-5xl md:text-6xl">How to Play</h2>
            <p className="mt-4 text-brand-text/40">From clone to conquer in three simple steps.</p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {[
              { 
                step: "01", 
                title: "Initialize Duel", 
                desc: "Choose your language and enter the 1v1 Arena or an 8-player Battle Royale. You'll be matched with an opponent of similar ELO in seconds." 
              },
              { 
                step: "02", 
                title: "Execute Logic", 
                desc: "Solve the algorithmic challenge in our high-performance editor. Every keystroke counts. Watch your opponent's progress in real-time." 
              },
              { 
                step: "03", 
                title: "Savage Verdict", 
                desc: "Submit to trigger 'The Blast'. Our AI Judge roasts your solution for performance, elegance, and creativity. Win to climb the Root Table." 
              }
            ].map((item, i) => (
              <div key={i} className="group relative rounded-3xl border border-brand-text/5 bg-brand-text/[0.02] p-10 transition-colors hover:border-brand-primary/20">
                <div className="mb-6 font-mono text-4xl font-bold text-brand-primary/20 group-hover:text-brand-primary transition-colors">
                  {item.step}
                </div>
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="text-brand-text/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 px-6 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            <div className="flex-1">
              <h2 className="font-serif text-5xl leading-tight md:text-7xl">
                The Moat: <br />
                <span className="italic text-brand-primary">AI Evaluation</span>
              </h2>
              <p className="mt-8 text-xl text-brand-text/60 leading-relaxed">
                Beyond mere test cases. ForkBomb's AI Judge analyzes your code for "Rustacean" patterns, 
                "Pythonic" idioms, and sheer elegance. We don't just care if it works; we care if it's art.
              </p>
              
              <div className="mt-12 space-y-6">
                {[
                  "Isolated Firecracker MicroVMs for 500ms execution",
                  "Real-time progress synchronization via WebSockets",
                  "Savage post-match breakdowns for social shareability"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary/20 text-brand-primary">
                      <Zap className="h-3 w-3" />
                    </div>
                    <span className="text-sm font-medium text-brand-text/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1">
              {/* Arena Preview (Saspo-style Dashboard) */}
              <div className="overflow-hidden rounded-3xl border border-brand-text/10 bg-[#161412] shadow-2xl transition-transform hover:scale-[1.02]">
                {/* Window Header */}
                <div className="flex items-center justify-between border-b border-brand-text/5 bg-brand-bg px-6 py-4">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-xs font-mono text-brand-text/40 tracking-widest uppercase">arena.forkbomb.gg — session_042</div>
                  <div className="w-12" />
                </div>
                
                {/* Terminal Mockup */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="border-r border-brand-text/5 p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-mono text-brand-primary uppercase tracking-wider">Player 1: Root</span>
                      <span className="text-xs font-mono text-brand-success">Status: TYPING...</span>
                    </div>
                    <div className="space-y-3 font-mono text-[10px]">
                      <div className="text-brand-text/80 leading-relaxed">
                        <span className="text-purple-400">def</span> <span className="text-yellow-400">optimize_chaos</span>(systems):
                      </div>
                      <div className="pl-4 text-brand-text/80">
                        <span className="text-purple-400">for</span> sys <span className="text-purple-400">in</span> systems:
                      </div>
                      <div className="pl-8 text-brand-text/80 animate-pulse border-l-2 border-brand-primary ml-1 pl-3">
                        sys.execute_fork_bomb()
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-bg/50 p-8">
                    <h4 className="font-serif text-xl">The AI Judge</h4>
                    <div className="mt-4 rounded-lg border border-brand-danger/20 bg-brand-danger/5 p-4">
                      <p className="font-mono text-[10px] italic text-brand-danger">
                        "Your O(n^2) nested loop suggests you enjoy watching servers suffer."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise / War Rooms Section */}
      <section id="enterprise" className="relative z-10 py-32 bg-brand-primary/5">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="max-w-xl">
              <h2 className="font-serif text-5xl md:text-6xl">Private War Rooms</h2>
              <p className="mt-6 text-xl text-brand-text/60 leading-relaxed">
                Companies like Google and Vercel use ForkBomb for "Live Fire" recruitment. 
                Host custom tournaments, upload your own problem sets, and see candidates' logic under pressure.
              </p>
              <button 
                onClick={() => setIsDemoOpen(true)}
                className="mt-10 rounded-full bg-brand-primary px-8 py-4 font-bold text-brand-bg transition-all hover:shadow-[0_0_20px_rgba(245,199,93,0.3)]"
              >
                Book a Demo
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 w-40 rounded-3xl bg-brand-text/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="font-serif text-2xl opacity-40">GOOG</span>
              </div>
              <div className="h-40 w-40 mt-8 rounded-3xl bg-brand-text/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer">
                <span className="font-serif text-2xl opacity-40">VRC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-brand-text/5 px-6 py-12 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-xs font-mono text-brand-text/30 uppercase tracking-widest">
            © 2026 FORKBOMB.GG — CODE. CLONE. CONQUER.
          </div>
          <div className="flex gap-8 text-xs font-mono text-brand-text/50 uppercase tracking-widest">
            <Link href="#" className="hover:text-brand-primary transition-colors">Github</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">X / Twitter</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">Discord</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

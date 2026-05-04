"use client";
import { supabase } from '@/lib/supabase';

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Terminal, Shield, Trophy, Zap, ChevronLeft, Play, Send, Skull, Users, Layers, Globe, LogOut, Clock, Eye, History } from "lucide-react";
import Link from "next/link";
import RoastRoom from "@/components/RoastRoom";
import GlitchText from "@/components/GlitchText";
import { motion, AnimatePresence } from "framer-motion";
import { challenges, Challenge } from "@/data/challenges";

const LANGUAGES = [
  { id: "python", name: "Python", icon: "🐍", defaultCode: "def solve():\n    # Write your solution here\n    pass" },
  { id: "python", name: "Python3", icon: "🐍", defaultCode: "def solve():\n    # Write your solution here\n    pass" },
  { id: "javascript", name: "JavaScript", icon: "🟨", defaultCode: "function solve() {\n    // Write your solution here\n}" },
  { id: "typescript", name: "TypeScript", icon: "🟦", defaultCode: "function solve(): void {\n    // Write your solution here\n}" },
  { id: "cpp", name: "C++", icon: "⚙️", defaultCode: "#include <iostream>\n\nint main() {\n    // Write your solution here\n    return 0;\n}" },
  { id: "c", name: "C", icon: "⚙️", defaultCode: "#include <stdio.h>\n\nint main() {\n    // Write your solution here\n    return 0;\n}" },
  { id: "java", name: "Java", icon: "☕", defaultCode: "public class Solution {\n    public static void main(String[] args) {\n        // Write your solution here\n    }\n}" },
  { id: "csharp", name: "C#", icon: "🎯", defaultCode: "using System;\n\nclass Program {\n    static void Main() {\n        // Write your solution here\n    }\n}" },
  { id: "go", name: "Go", icon: "🐹", defaultCode: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    // Write your solution here\n}" },
  { id: "rust", name: "Rust", icon: "🦀", defaultCode: "fn main() {\n    // Write your solution here\n}" },
  { id: "kotlin", name: "Kotlin", icon: "🟪", defaultCode: "fun main() {\n    // Write your solution here\n}" },
  { id: "swift", name: "Swift", icon: "🍎", defaultCode: "import Foundation\n\n// Write your solution here" },
  { id: "ruby", name: "Ruby", icon: "💎", defaultCode: "# Write your solution here" },
  { id: "php", name: "PHP", icon: "🐘", defaultCode: "<?php\n// Write your solution here\n?>" },
  { id: "dart", name: "Dart", icon: "🎯", defaultCode: "void main() {\n    // Write your solution here\n}" },
  { id: "scala", name: "Scala", icon: "🔴", defaultCode: "object Solution extends App {\n    // Write your solution here\n}" },
  { id: "elixir", name: "Elixir", icon: "💧", defaultCode: "# Write your solution here" },
  { id: "erlang", name: "Erlang", icon: "🔴", defaultCode: "% Write your solution here" },
  { id: "racket", name: "Racket", icon: "🚀", defaultCode: "#lang racket\n; Write your solution here" },
];

export default function ArenaPage() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const currentChallenge = challenges[currentLevelIndex];

  const [code, setCode] = useState(currentChallenge.initialCode);
  const [status, setStatus] = useState<"idle" | "running" | "submitted" | "finishing">("idle");
  const [runLogs, setRunLogs] = useState<{text: string, type: 'success' | 'danger' | 'info'}[]>([]);
  const [showRoast, setShowRoast] = useState(false);
  const [isBlasting, setIsBlasting] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [opponent, setOpponent] = useState<{name: string, elo: number} | null>(null);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [spectators, setSpectators] = useState(47);
  const [userElo, setUserElo] = useState(1420);

  // Timer & Spectators Effect
  useEffect(() => {
    if (!isReady || status === "submitted" || status === "finishing") return;
    const interval = setInterval(() => setTimeElapsed(prev => prev + 1), 1000);
    const spectInterval = setInterval(() => {
      setSpectators(prev => {
        const change = Math.floor(Math.random() * 7) - 1; 
        const newVal = prev + change;
        return newVal > 500 ? 500 : (newVal < 40 ? 40 : newVal);
      });
    }, 2500);
    return () => {
      clearInterval(interval);
      clearInterval(spectInterval);
    };
  }, [isReady, status, currentLevelIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogout = () => {
    localStorage.removeItem("forkbomb_team");
    window.location.href = "/login";
  };

  const [roastData, setRoastData] = useState({
    verdict: "",
    scores: { performance: 0, elegance: 0, creativity: 0 }
  });

  useEffect(() => {
    const savedTeam = localStorage.getItem("forkbomb_team");
    if (savedTeam) {
      setTeamName(savedTeam);
      setIsReady(true);
    }

    setCode(currentChallenge.initialCode);
  }, [currentChallenge]);

  useEffect(() => {
    async function fetchOpponent() {
      if (!teamName) return;
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .neq('name', teamName)
        .order('created_at', { ascending: false })
        .limit(1);
        
      if (!error && data && data.length > 0) {
        setOpponent({ name: data[0].name, elo: data[0].elo || 1850 });
      }
    }
    
    if (isReady && teamName) {
      fetchOpponent();
      
      const fetchUserElo = async () => {
        const { data } = await supabase.from('teams').select('elo').eq('name', teamName).single();
        if (data && data.elo) setUserElo(data.elo);
      };
      fetchUserElo();
      
      const channel = supabase
        .channel('teams-channel')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'teams' }, payload => {
          if (payload.new.name !== teamName) {
            setOpponent({ name: payload.new.name, elo: payload.new.elo || 1850 });
          }
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isReady, teamName]);

  const handleStartDuel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      const trimmedName = teamName.trim();
      localStorage.setItem("forkbomb_team", trimmedName);
      setIsReady(true);

      // Save or update the team in Supabase
      const { error } = await supabase
        .from('teams')
        .upsert([{ name: trimmedName }], { onConflict: 'name' });

      if (error) {
        console.error("Error saving team to Supabase:", error);
        alert(`Failed to save team: ${error.message || JSON.stringify(error)}`);
      }
    }
  };

  const handleLevelChange = (index: number) => {
    setCurrentLevelIndex(index);
    setStatus("idle");
    setShowRoast(false);
    setTimeElapsed(0);
  };

  const handleRun = () => {
    setStatus("running");
    setRunLogs([]);
    
    let step = 0;
    const totalTests = 12;
    const passedTests = 8;
    
    const interval = setInterval(() => {
      step++;
      if (step <= passedTests) {
        setRunLogs(prev => [...prev, { text: `✓ Test Case ${step}: PASS (${Math.floor(Math.random() * 40) + 10}ms)`, type: 'success' }]);
      } else if (step <= totalTests) {
        setRunLogs(prev => [...prev, { text: `✗ Test Case ${step}: FAIL (Output mismatch)`, type: 'danger' }]);
      }
      
      if (step === totalTests) {
        clearInterval(interval);
        setTimeout(() => {
          setRunLogs(prev => [...prev, { text: `\nResult: ${passedTests}/${totalTests} Tests Passed.`, type: 'info' }]);
          setStatus("idle");
        }, 500);
      }
    }, 150);
  };

  const handleSubmit = async () => {
    setStatus("finishing");
    setIsBlasting(true);

    try {
      // 1. Get the roast from your AI
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language: selectedLang.id })
      });
      const data = await response.json();
      setRoastData(data);

      // 2. Save the submission to Supabase
      const { error } = await supabase
        .from('submissions')
        .insert([
          {
            team_name: teamName || "Anonymous",
            challenge_index: currentLevelIndex,
            language: selectedLang.id,
            code: code,
            verdict: data.verdict,
            score_performance: data.scores.performance,
            score_elegance: data.scores.elegance,
            score_creativity: data.scores.creativity
          }
        ]);

      if (error) {
        console.error("Error saving to Supabase:", JSON.stringify(error, null, 2));
        alert(`Failed to save submission: ${error.message || JSON.stringify(error)}`);
      }

    } catch (error) {
      console.error("Failed to fetch roast:", error);
    }

    setTimeout(() => {
      setIsBlasting(false);
      setStatus("submitted");
      setTimeout(() => setShowRoast(true), 1500);
    }, 1000);
  };

  return (
    <div className={`flex h-screen flex-col bg-brand-bg text-brand-text overflow-hidden transition-transform duration-75 ${isBlasting ? "animate-glitch scale-105" : ""}`}>
      {/* Pre-Match Overlay */}
      <AnimatePresence>
        {!isReady && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-bg/95 backdrop-blur-2xl px-6"
          >
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary text-brand-bg shadow-[0_0_30px_rgba(245,199,93,0.3)]">
                  <Skull className="h-8 w-8" />
                </div>
                <h1 className="font-serif text-4xl mb-2">Identify Your Squad</h1>
                <p className="text-sm text-brand-text/40 font-mono uppercase tracking-widest">Entering Arena // Duel_#284</p>
              </div>

              <form onSubmit={handleStartDuel} className="space-y-6">
                <div>
                  <label className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest block mb-2 text-center">Enter Team Name</label>
                  <input
                    autoFocus
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. SudoSquad"
                    className="w-full rounded-2xl border-2 border-brand-text/10 bg-brand-text/5 px-6 py-4 text-center text-xl font-bold focus:border-brand-primary focus:outline-none transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-primary py-5 text-sm font-bold text-brand-bg shadow-[0_0_40px_rgba(245,199,93,0.2)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  ENTER THE COLOSSEUM
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash Overlay */}
      <AnimatePresence>
        {isBlasting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white pointer-events-none mix-blend-difference"
          />
        )}
      </AnimatePresence>

      {/* Arena Header */}
      <header className="flex items-center justify-between border-b border-brand-text/5 bg-brand-bg/50 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-text/10 hover:bg-brand-text/5 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-brand-text/40 tracking-widest uppercase">Arena // Duel_#284</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-danger animate-pulse" />
            </div>

            {/* Level Selector */}
            <div className="flex items-center gap-1 rounded-full bg-brand-text/5 px-3 py-1 border border-brand-text/10">
              <Layers className="h-3 w-3 text-brand-primary" />
              <select
                value={currentLevelIndex}
                onChange={(e) => handleLevelChange(parseInt(e.target.value))}
                className="bg-transparent text-[10px] font-mono text-brand-text outline-none cursor-pointer"
              >
                {challenges.map((c, i) => (
                  <option key={c.id} value={i} className="bg-brand-bg text-brand-text">
                    Lvl {i + 1}: {c.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Live Timer */}
            <div className="flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 ml-4 shadow-[0_0_10px_rgba(245,199,93,0.1)]">
              <Clock className={`h-3 w-3 ${status === "idle" || status === "running" ? "text-brand-primary animate-pulse" : "text-brand-text/40"}`} />
              <span className={`text-[10px] font-mono font-bold ${status === "idle" || status === "running" ? "text-brand-primary" : "text-brand-text/40"}`}>
                {formatTime(timeElapsed)}
              </span>
            </div>

            {/* Live Spectators */}
            <div className="flex items-center gap-2 rounded-full border border-brand-danger/20 bg-brand-danger/10 px-3 py-1 shadow-[0_0_10px_rgba(255,69,0,0.1)]">
              <Eye className="h-3 w-3 text-brand-danger animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-brand-danger">
                {spectators} SPECTATORS
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Team Name & Logout */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] font-mono text-brand-text/40 uppercase">Team</div>
                <div className="text-sm font-bold text-brand-primary">{teamName || "Anonymous"}</div>
              </div>
              <Users className="h-5 w-5 text-brand-primary" />
            </div>

            <button
              onClick={handleLogout}
              title="Logout / Change Team"
              className="ml-2 rounded-full p-1.5 text-brand-text/40 hover:bg-brand-danger/10 hover:text-brand-danger transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <div className="h-8 w-px bg-brand-text/10" />

          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-[10px] font-mono text-brand-text/40 uppercase">Your ELO</div>
              <div className="text-sm font-bold text-brand-text">{userElo.toLocaleString()}</div>
            </div>
            <Trophy className="h-5 w-5 text-brand-text/60" />
          </div>

          <div className="h-8 w-px bg-brand-text/10" />

          <div className="flex items-center gap-4">
            <button
              onClick={handleRun}
              disabled={status !== "idle"}
              className="flex items-center gap-2 rounded-full border border-brand-text/20 px-4 py-1.5 text-xs font-bold transition-all hover:bg-brand-text/5 active:scale-95 disabled:opacity-50"
            >
              <Play className="h-3 w-3" />
              RUN TEST
            </button>
            <button
              onClick={handleSubmit}
              disabled={status !== "idle"}
              className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-brand-primary px-4 py-1.5 text-xs font-bold text-brand-bg transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              <Send className="h-3 w-3" />
              SUBMIT
              {status === "finishing" && (
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Arena Area */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left Panel: Problem Description */}
        <div className="w-[350px] border-r border-brand-text/5 bg-brand-bg/30 p-6 overflow-y-auto">
          <div className="mb-6 rounded-lg bg-brand-primary/5 p-4 border border-brand-primary/10">
            <h2 className="font-serif text-2xl text-brand-primary">{currentChallenge.title}</h2>
            <div className="mt-2 flex gap-2">
              <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${currentChallenge.difficulty === "Savage" ? "bg-brand-danger text-white" : "bg-brand-danger/10 text-brand-danger"
                }`}>
                {currentChallenge.difficulty}
              </span>
              <span className="text-[10px] font-mono text-brand-text/40 uppercase tracking-tighter">Time Limit: {currentChallenge.timeLimit}</span>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-brand-text/70">
            <p>{currentChallenge.description}</p>

            <div className="mt-8">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-text/40">Constraints</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
                {currentChallenge.constraints.map((constraint, i) => (
                  <li key={i}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Center: Code Editor */}
        <div className="relative flex flex-1 flex-col bg-[#0D0D0D]">
          <div className="flex items-center justify-between bg-brand-bg/80 px-4 py-2 border-b border-brand-text/5">
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <span className="text-[10px] font-mono text-brand-primary border-b-2 border-brand-primary pb-1">solution.{selectedLang.id === "python" ? "py" : selectedLang.id === "cpp" ? "cpp" : "js"}</span>
                <span className="text-[10px] font-mono text-brand-text/30 hover:text-brand-text/60 cursor-pointer pb-1 transition-colors">utils.lib</span>
              </div>

              {/* Language Selector */}
              <div className="flex items-center gap-2 rounded-full border border-brand-text/10 bg-brand-text/5 px-3 py-0.5">
                <Globe className="h-3 w-3 text-brand-text/30" />
                <select
                  value={selectedLang.name}
                  onChange={(e) => {
                    const lang = LANGUAGES.find(l => l.name === e.target.value)!;
                    setSelectedLang(lang);
                    setCode(lang.defaultCode);
                  }}
                  className="bg-transparent text-[10px] font-mono text-brand-text/60 outline-none cursor-pointer"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.name} value={lang.name} className="bg-brand-bg text-brand-text">
                      {lang.icon} {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-[10px] font-mono text-brand-text/30">Latency: 42ms</div>
          </div>

          <div className="flex-1 overflow-hidden pt-4">
            <Editor
              height="100%"
              defaultLanguage={selectedLang.id}
              language={selectedLang.id}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: "var(--font-mono)",
                // backgroundColor: "#0D0D0D",
                scrollBeyondLastLine: false,
                padding: { top: 20 },
                lineNumbersMinChars: 3,
                readOnly: status !== "idle"
              }}
            />
          </div>

          {/* Console / Output */}
          <div className="h-[200px] border-t border-brand-text/5 bg-brand-bg/50 p-4 font-mono text-xs">
            <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-brand-text/40">
              <span>Terminal Output</span>
              <span className={status === "running" ? "text-brand-primary" : ""}>
                {status === "running" ? "Executing..." : "Ready"}
              </span>
            </div>
            <div className="space-y-1 overflow-y-auto h-[140px] text-brand-text/60">
              {(status === "running" || (status === "idle" && runLogs.length > 0)) && (
                <>
                  <div className="text-brand-text/30">$ {selectedLang.id === "python" ? "python3" : selectedLang.id === "cpp" ? "g++" : "node"} solution --test-cases</div>
                  {runLogs.map((log, i) => (
                    <div key={i} className={log.type === 'info' ? 'text-brand-text/80 font-bold mt-2 whitespace-pre-line' : `text-brand-${log.type}`}>
                      {log.text}
                    </div>
                  ))}
                  <div className="animate-pulse mt-1">_</div>
                </>
              )}
              {status === "idle" && runLogs.length === 0 && (
                <div className="text-brand-text/30">Wait for input...</div>
              )}
              {status === "finishing" && (
                <div className="text-brand-primary animate-pulse">DEPLOYING EXPLOIT...</div>
              )}
              {status === "submitted" && (
                <div className="text-brand-danger font-bold text-lg py-4">
                  <GlitchText text="CRITICAL: SYSTEM BREACH DETECTED. AI JUDGE INCOMING." />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Opponent Progress */}
        <div className="w-[300px] border-l border-brand-text/5 bg-brand-bg/30 p-6 overflow-hidden">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-text/40">Opponent: {opponent ? opponent.name : "KernelPanic"}</h3>
              <span className="text-[10px] font-mono text-brand-danger">ELO: {opponent?.elo || "1,850"}</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span>Logic Progress</span>
                  <span>74%</span>
                </div>
                <div className="h-1 w-full bg-brand-text/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '74%' }}
                    animate={{ width: status === "submitted" ? '100%' : '82%' }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    className="h-full bg-brand-primary shadow-[0_0_8px_rgba(245,199,93,0.5)]"
                  />
                </div>
              </div>
              <div className="rounded border border-brand-text/5 bg-brand-text/[0.02] p-3">
                <div className="flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`h-1.5 flex-1 rounded-full ${i < 8 ? 'bg-brand-success' : 'bg-brand-text/10'}`} />
                  ))}
                </div>
                <div className="mt-2 text-[10px] font-mono text-brand-text/40">Tests Passed: 8/12</div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="rounded-xl border border-brand-danger/20 bg-brand-danger/5 p-4 relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <Shield className="h-4 w-4 text-brand-danger" />
                <span className="text-[10px] font-bold text-brand-danger uppercase tracking-widest">Savage Mode Active</span>
              </div>
              <p className="text-[10px] italic text-brand-danger leading-relaxed relative z-10">
                "AI Judge is watching your every move. Don't even think about using O(n^3)."
              </p>
              <div className="absolute inset-0 bg-brand-danger/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </main>

      <RoastRoom
        isOpen={showRoast}
        onClose={() => setShowRoast(false)}
        onNextDuel={() => {
          setShowRoast(false);
          if (currentLevelIndex < challenges.length - 1) {
            handleLevelChange(currentLevelIndex + 1);
          } else {
            handleLevelChange(0); // loop back or handle completion
          }
        }}
        verdict={roastData.verdict}
        scores={roastData.scores}
      />
    </div>
  );
}

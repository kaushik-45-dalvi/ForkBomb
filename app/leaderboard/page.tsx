"use client";

import Link from "next/link";
import { ChevronLeft, Trophy, Search, Filter, Skull } from "lucide-react";
import Logo from "@/components/Logo";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Root", elo: 2840, wins: 412, style: "Extreme", status: "Online" },
  { rank: 2, name: "KernelPanic", elo: 2750, wins: 385, style: "Elegant", status: "Online" },
  { rank: 3, name: "NullPointer", elo: 2620, wins: 310, style: "Savage", status: "Offline" },
  { rank: 4, name: "ForkMaster", elo: 2580, wins: 295, style: "Aggressive", status: "In Match" },
  { rank: 5, name: "ByteMe", elo: 2490, wins: 270, style: "Stealth", status: "Online" },
];

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-text">
      <nav className="flex items-center justify-between border-b border-brand-text/5 px-6 py-6 md:px-12">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-text/10 hover:bg-brand-text/5 transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-serif text-3xl">The Root Table</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-text/30" />
            <input 
              type="text" 
              placeholder="Search hackers..." 
              className="rounded-full border border-brand-text/10 bg-brand-text/5 py-2 pl-10 pr-4 text-xs focus:border-brand-primary/50 focus:outline-none transition-colors"
            />
          </div>
          <button className="rounded-full border border-brand-text/10 p-2 hover:bg-brand-text/5 transition-colors">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </nav>

      <section className="px-6 py-12 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 grid grid-cols-3 gap-6">
            <div className="rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-8 text-center">
              <Trophy className="mx-auto mb-4 h-8 w-8 text-brand-primary" />
              <div className="text-xs font-mono uppercase tracking-widest text-brand-text/40">Total Combatants</div>
              <div className="mt-2 text-4xl font-bold">12,842</div>
            </div>
            <div className="rounded-3xl border border-brand-text/10 bg-brand-text/5 p-8 text-center">
              <Skull className="mx-auto mb-4 h-8 w-8 text-brand-danger" />
              <div className="text-xs font-mono uppercase tracking-widest text-brand-text/40">Daily Crashes</div>
              <div className="mt-2 text-4xl font-bold text-brand-danger">4,120</div>
            </div>
            <div className="rounded-3xl border border-brand-text/10 bg-brand-text/5 p-8 text-center">
              <Logo className="mx-auto mb-4 h-10 w-10" />
              <div className="text-xs font-mono uppercase tracking-widest text-brand-text/40">Active Duels</div>
              <div className="mt-2 text-4xl font-bold">842</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-brand-text/10 bg-[#161412]">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-brand-text/5 bg-brand-bg/50 text-[10px] uppercase tracking-widest text-brand-text/40">
                  <th className="px-8 py-6">Rank</th>
                  <th className="px-8 py-6">Player</th>
                  <th className="px-8 py-6">ELO Rating</th>
                  <th className="px-8 py-6">Wins</th>
                  <th className="px-8 py-6">Style</th>
                  <th className="px-8 py-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {LEADERBOARD_DATA.map((player) => (
                  <tr key={player.rank} className="border-b border-brand-text/5 transition-colors hover:bg-brand-text/[0.02]">
                    <td className="px-8 py-6 font-mono text-brand-text/40">#{player.rank}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xs border border-brand-primary/20">
                          {player.name[0]}
                        </div>
                        <span className="font-bold">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-mono text-brand-primary">{player.elo}</td>
                    <td className="px-8 py-6 font-mono">{player.wins}</td>
                    <td className="px-8 py-6">
                      <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-tighter ${
                        player.style === 'Extreme' ? 'bg-brand-danger/10 text-brand-danger' : 
                        player.style === 'Elegant' ? 'bg-brand-primary/10 text-brand-primary' : 
                        'bg-brand-text/10 text-brand-text/60'
                      }`}>
                        {player.style}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${
                          player.status === 'Online' ? 'bg-brand-success' : 
                          player.status === 'In Match' ? 'bg-brand-danger animate-pulse' : 
                          'bg-brand-text/20'
                        }`} />
                        <span className="text-xs text-brand-text/40">{player.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

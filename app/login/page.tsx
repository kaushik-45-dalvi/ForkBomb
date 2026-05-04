"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Zap, Shield, Skull } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;
    
    setIsLoading(true);
    
    // Simulate login by setting localStorage (since we aren't using Supabase Auth yet)
    localStorage.setItem("forkbomb_team", teamName.trim());
    
    // Redirect to the Arena
    setTimeout(() => {
      router.push("/arena");
    }, 500);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center gap-2 text-xs font-mono text-brand-text/40 hover:text-brand-primary transition-colors">
          <ChevronLeft className="h-4 w-4" />
          BACK TO SURFACE
        </Link>
        
        <div className="rounded-3xl border border-brand-text/10 bg-[#161412] p-8 shadow-2xl">
          <div className="mb-8">
            <h1 className="font-serif text-4xl mb-2">Initialize Session</h1>
            <p className="text-sm text-brand-text/40">Enter your credentials to access the colosseum.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest block mb-2">Team Name</label>
              <input 
                type="text" 
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="SudoSquad"
                className="w-full rounded-xl border border-brand-text/10 bg-brand-text/5 px-4 py-3 text-sm focus:border-brand-primary/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest block mb-2">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-brand-text/10 bg-brand-text/5 px-4 py-3 text-sm focus:border-brand-primary/50 focus:outline-none transition-colors"
              />
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-brand-primary py-4 text-sm font-bold text-brand-bg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "AUTHENTICATING..." : "BYPASS SECURITY"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-brand-text/5 text-center">
            <p className="text-xs text-brand-text/40">
              New combatant? <Link href="/signup" className="text-brand-primary hover:underline">Register your team</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

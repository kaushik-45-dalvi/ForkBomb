"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Zap, Shield, Skull } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !email.trim() || !password.trim()) {
      alert("Please fill out all fields.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const trimmedName = teamName.trim();
      
      // 1. Create or ensure the team exists
      const { error: teamError } = await supabase
        .from('teams')
        .upsert([{ name: trimmedName }], { onConflict: 'name' });
        
      if (teamError) {
        alert(`Failed to create team: ${teamError.message || JSON.stringify(teamError)}`);
        setIsLoading(false);
        return;
      }

      // 2. Add the user as a combatant to that team
      const { error: combatantError } = await supabase
        .from('combatants')
        .insert([{ 
          team_name: trimmedName, 
          email: email.trim(), 
          access_key: password 
        }]);

      if (combatantError) {
        // If the email already exists, just log them in instead of failing completely,
        // or show the error.
        if (combatantError.code === '23505') {
           console.log("User already exists, continuing to login...");
        } else {
           alert(`Failed to register combatant: ${combatantError.message || JSON.stringify(combatantError)}`);
           setIsLoading(false);
           return;
        }
      }

      // Save to local session so the Arena knows who they are
      localStorage.setItem("forkbomb_team", trimmedName);
      localStorage.setItem("forkbomb_email", email.trim());
      
      // Redirect to the Arena
      router.push("/arena");
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
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
            <h1 className="font-serif text-4xl mb-2">Join the Colosseum</h1>
            <p className="text-sm text-brand-text/40">Register your squad and start climbing the Root Table.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
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
              <label className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest block mb-2">Master Hacker Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hacker@forkbomb.gg"
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
              {isLoading ? "INITIALIZING..." : "REGISTER SQUAD"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-brand-text/5 text-center">
            <p className="text-xs text-brand-text/40">
              Already a combatant? <Link href="/login" className="text-brand-primary hover:underline">Initialize Session</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

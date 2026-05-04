"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-bg/90 backdrop-blur-xl">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-brand-primary/20 bg-[#161412] p-8 shadow-2xl"
        >
          <button onClick={onClose} className="absolute right-6 top-6 rounded-full p-2 hover:bg-brand-text/5 transition-colors">
            <X className="h-5 w-5 text-brand-text/40" />
          </button>

          {!submitted ? (
            <>
              <h2 className="font-serif text-3xl text-brand-text mb-2">Book a War Room</h2>
              <p className="text-sm text-brand-text/60 mb-8">
                Ready to deploy ForkBomb for your team? Enter your details and we'll reach out in 24h.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest block mb-2">Work Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="hacker@company.com"
                    className="w-full rounded-xl border border-brand-text/10 bg-brand-text/5 px-4 py-3 text-sm focus:border-brand-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-brand-text/40 uppercase tracking-widest block mb-2">Team Size</label>
                  <select className="w-full rounded-xl border border-brand-text/10 bg-brand-text/5 px-4 py-3 text-sm focus:border-brand-primary/50 focus:outline-none transition-colors">
                    <option>1-10 engineers</option>
                    <option>10-50 engineers</option>
                    <option>50+ engineers</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-brand-primary py-4 text-sm font-bold text-brand-bg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  INITIATE CONTACT
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-brand-success/20 flex items-center justify-center mb-6">
                <CheckCircle className="h-8 w-8 text-brand-success" />
              </div>
              <h2 className="font-serif text-3xl text-brand-text mb-2">Transmission Received</h2>
              <p className="text-sm text-brand-text/60">
                A ForkBomb representative will contact you shortly.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

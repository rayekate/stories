"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Lock, Mail, ArrowRight, Loader2, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showHelper, setShowHelper] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      router.push("/content/dashboard"); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 blur-[150px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-10 relative z-10"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-accent">
            <Sparkles size={12} className="animate-pulse" />
            Writer Sanctum
          </div>
          <h1 className="text-5xl font-black uppercase italic tracking-tighter text-white">
            Enter <br />
            <span className="text-accent underline decoration-accent/20 underline-offset-8">Portal</span>
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="group relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-accent/40 focus:bg-accent/5 transition-all outline-none"
              />
            </div>

            <div className="group relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="ACCESS KEY"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-[10px] font-black uppercase tracking-widest text-white focus:outline-none focus:border-accent/40 focus:bg-accent/5 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-accent text-[10px] font-black uppercase tracking-wider"
              >
                ⚠️ {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-accent text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_50px_-10px_rgba(244,63,94,0.4)] flex items-center justify-center gap-4 transition-all hover:shadow-[0_25px_60px_-10px_rgba(244,63,94,0.6)]"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <>
                  Confirm Access
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={() => setShowHelper(!showHelper)}
            className="flex items-center gap-2 text-white/20 hover:text-white/40 transition-colors text-[9px] font-bold uppercase tracking-[0.3em]"
          >
            <Info size={12} />
            Need credentials?
          </button>
          
          <AnimatePresence>
            {showHelper && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="glass p-6 rounded-2xl border border-white/5 w-full text-center space-y-4"
              >
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">Use these test credentials:</p>
                <div className="space-y-1">
                  <p className="text-[11px] text-white font-black uppercase tracking-widest">test@example.com</p>
                  <p className="text-[11px] text-white/60 font-black uppercase tracking-widest">password123</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-white/10 text-[9px] font-bold uppercase tracking-[0.4em]">
            Unrestricted Matrix Access Only
          </p>
        </div>
      </motion.div>
    </main>
  );
}

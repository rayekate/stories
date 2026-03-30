"use client";

import React, { useEffect, useState } from "react";

const LOADING_LINES = [
  "Weaving the narrative threads...",
  "Consulting ancient tomes...",
  "Summoning the muse...",
  "Crafting your world...",
  "Breathing life into characters...",
];

export default function LoadingScreen() {
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotate the flavour text every 3 seconds
  useEffect(() => {
    const t = setInterval(() => {
      setLineIndex((i) => (i + 1) % LOADING_LINES.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  // Fake progress bar — moves fast at first, slows near the end
  useEffect(() => {
    let current = 0;
    const tick = () => {
      current += current < 70 ? Math.random() * 4 : Math.random() * 0.8;
      if (current >= 95) current = 95; // Never quite finish until real response
      setProgress(Math.min(current, 95));
    };
    const t = setInterval(tick, 300);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0b]">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "hsl(245, 100%, 65%)",
            animation: "blob-drift 8s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: "hsl(350, 89%, 60%)",
            animation: "blob-drift 6s ease-in-out infinite alternate-reverse",
          }}
        />
      </div>

      {/* Pulsing ring */}
      <div className="relative flex items-center justify-center mb-12">
        <div
          className="absolute w-40 h-40 rounded-full border-2 border-accent/20"
          style={{ animation: "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite" }}
        />
        <div
          className="absolute w-28 h-28 rounded-full border border-accent/30"
          style={{ animation: "ping-slow 2s cubic-bezier(0,0,0.2,1) infinite 0.5s" }}
        />
        {/* Spinner */}
        <div
          className="w-20 h-20 rounded-full border-4 border-white/5 border-t-accent"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
        {/* Inner icon */}
        <div className="absolute text-3xl">✦</div>
      </div>

      {/* Text area */}
      <div className="flex flex-col items-center gap-6 z-10">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] text-white/90">
          Generating
        </h2>

        {/* Rotating flavour text */}
        <p
          key={lineIndex}
          className="text-white/40 text-lg font-medium tracking-wide animate-fade-in"
        >
          {LOADING_LINES[lineIndex]}
        </p>

        {/* Progress bar */}
        <div className="w-72 md:w-96 h-1 rounded-full bg-white/10 overflow-hidden mt-4">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, hsl(245,100%,65%), hsl(350,89%,60%))",
              boxShadow: "0 0 12px hsl(245,100%,65%,0.6)",
            }}
          />
        </div>
        <p className="text-white/20 text-xs tracking-widest uppercase">
          This may take 10–20 seconds
        </p>
      </div>

      <style>{`
        @keyframes blob-drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes ping-slow {
          75%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

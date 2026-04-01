"use client";

import React from "react";
import { motion } from "framer-motion";

const GENRES = [
  { id: "sci-fi",     label: "Sci-Fi",      emoji: "🚀" },
  { id: "fantasy",    label: "Fantasy",     emoji: "🧝" },
  { id: "mystery",    label: "Mystery",     emoji: "🔍" },
  { id: "horror",     label: "Horror",      emoji: "👁️" },
  { id: "romance",    label: "Romance",     emoji: "💫" },
  { id: "adventure",  label: "Adventure",   emoji: "⚔️" },
  { id: "thriller",   label: "Thriller",    emoji: "🎭" },
  { id: "historical", label: "Historical",  emoji: "📜" },
  { id: "comedy",     label: "Comedy",      emoji: "✨" },
  { id: "noir",       label: "Noir",        emoji: "🌃" },
];

interface GenrePanelProps {
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

export default function GenrePanel({ selectedGenres, onGenreToggle }: GenrePanelProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in flex flex-col items-center" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Select Narrative Vector</h3>
        <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center w-full max-w-4xl">
        {GENRES.map((genre, idx) => {
          const isActive = selectedGenres.includes(genre.id);
          return (
            <motion.button
              key={genre.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onGenreToggle(genre.id)}
              className={`
                relative flex items-center gap-2 px-5 py-3 md:px-8 md:py-4 rounded-2xl text-[10px] md:text-xs font-black transition-all duration-400 uppercase tracking-[0.15em] overflow-hidden
                ${isActive 
                  ? 'bg-accent text-white shadow-[0_16px_40px_-8px_rgba(244,63,94,0.55)] border-transparent' 
                  : 'glass-card text-white/40 border-white/5 hover:text-white hover:border-white/20 hover:bg-white/5'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"
                />
              )}
              <span className="text-sm">{genre.emoji}</span>
              <span className="relative z-10">{genre.label}</span>
              {isActive && (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="w-1 h-1 rounded-full bg-white/60 ml-1"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedGenres.length > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em]"
        >
          {selectedGenres.length} genre{selectedGenres.length > 1 ? 's' : ''} selected
        </motion.p>
      )}
    </div>
  );
}

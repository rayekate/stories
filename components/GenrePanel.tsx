"use client";

import React from "react";

const GENRES = [
  { id: "sci-fi", label: "Sci-Fi" },
  { id: "fantasy", label: "Fantasy" },
  { id: "mystery", label: "Mystery" },
  { id: "horror", label: "Horror" },
  { id: "romance", label: "Romance" },
  { id: "adventure", label: "Adventure" },
];

interface GenrePanelProps {
  selectedGenres: string[];
  onGenreToggle: (genre: string) => void;
}

export default function GenrePanel({ selectedGenres, onGenreToggle }: GenrePanelProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in flex flex-col items-center" style={{ animationDelay: "0.4s" }}>
      <div className="flex items-center gap-2">
        <span className="text-accent font-black text-2xl tracking-tighter">#</span>
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-white/20">Refine Your Genre</h3>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center w-full">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreToggle(genre.id)}
            className={`
              relative flex items-center px-10 py-5 rounded-full text-base font-black transition-all duration-500 uppercase tracking-widest
              ${selectedGenres.includes(genre.id) 
                ? 'bg-accent text-white scale-110 shadow-[0_12px_32px_-8px_rgba(245,100,65,0.8)]' 
                : 'glass text-white/30 border border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20'}
            `}
          >
            <span className="">{genre.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}





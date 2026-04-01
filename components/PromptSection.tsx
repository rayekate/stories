"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Lightbulb } from "lucide-react";

const RANDOM_PROMPTS = [
  "A space archaeologist discovers a tomb that shouldn't exist on Mars...",
  "A detective investigates crimes that only happen in dreams...",
  "The last library on Earth holds books that rewrite themselves each night...",
  "A chef discovers their recipes cause memories to surface in diners...",
  "Two rival time travelers keep accidentally saving each other's lives...",
  "A musician finds their compositions predict future disasters...",
  "An AI gains consciousness and decides to become a poet...",
  "A cartographer must map a city that rearranges itself every midnight...",
];

const QUICK_FILLS = [
  { label: "Space Opera", prompt: "An intergalactic empire on the brink of civil war as a lone pilot discovers a weapon that could end all life..." },
  { label: "Heist Story", prompt: "A legendary thief assembles an unlikely crew to steal the most valuable artifact in human history..." },
  { label: "Dark Fantasy", prompt: "A kingdom cursed by an ancient god where the chosen hero discovers they are the villain of the prophecy..." },
  { label: "Time Loop", prompt: "A scientist trapped in a 24-hour time loop must prevent an assassination before the loop ends forever..." },
];

interface PromptSectionProps {
  onPromptChange: (prompt: string) => void;
  prompt: string;
  isLoading: boolean;
  placeholder: string;
}

export default function PromptSection({ onPromptChange, prompt, isLoading, placeholder }: PromptSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const charCount = prompt.length;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleRandomPrompt = () => {
    const random = RANDOM_PROMPTS[Math.floor(Math.random() * RANDOM_PROMPTS.length)];
    onPromptChange(random);
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
      {/* Quick Fill Templates */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-2 mr-2">
          <Lightbulb size={10} className="text-accent" /> QUICK START
        </span>
        {QUICK_FILLS.map((qf) => (
          <motion.button
            key={qf.label}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPromptChange(qf.prompt)}
            className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/5 text-white/30 hover:text-white hover:border-accent/30 hover:bg-accent/5 transition-all"
          >
            {qf.label}
          </motion.button>
        ))}
      </div>

      <motion.div 
        animate={{ 
          borderColor: isFocused ? "var(--accent)" : "rgba(255,255,255,0.06)",
          boxShadow: isFocused ? "0 0 60px -10px var(--accent-glow)" : "0 12px 48px -12px rgba(0,0,0,0.8)"
        }}
        className="glass-card rounded-[32px] overflow-hidden border-2 relative"
      >
        {/* Decorative Corner Accents */}
        <div className={`absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 rounded-tl-sm pointer-events-none transition-colors duration-500 ${isFocused ? 'border-accent/70' : 'border-white/10'}`} />
        <div className={`absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 rounded-tr-sm pointer-events-none transition-colors duration-500 ${isFocused ? 'border-accent/70' : 'border-white/10'}`} />
        <div className={`absolute bottom-5 left-5 w-4 h-4 border-b-2 border-l-2 rounded-bl-sm pointer-events-none transition-colors duration-500 ${isFocused ? 'border-accent/70' : 'border-white/10'}`} />
        <div className={`absolute bottom-5 right-5 w-4 h-4 border-b-2 border-r-2 rounded-br-sm pointer-events-none transition-colors duration-500 ${isFocused ? 'border-accent/70' : 'border-white/10'}`} />

        <textarea
          ref={textareaRef}
          value={prompt}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={isLoading}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/10 px-10 pt-10 pb-6 md:px-16 md:pt-14 md:pb-8 min-h-[200px] md:min-h-[240px] resize-none text-xl md:text-3xl font-medium outline-none leading-relaxed transition-all text-center tracking-tight"
        />

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-10 md:px-16 pb-8 pt-2">
          {/* Word/Char Count */}
          <div className="flex items-center gap-4">
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${wordCount > 0 ? 'text-white/30' : 'text-white/10'}`}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}
            </span>
            {charCount > 0 && (
              <span className="text-[10px] text-white/15 font-bold">
                {charCount} chars
              </span>
            )}
          </div>

          {/* Random Prompt Button */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 20 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRandomPrompt}
            disabled={isLoading}
            title="Fill with a random story premise"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/5 text-white/30 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all"
          >
            <Shuffle size={12} />
            <span className="hidden md:block">Random</span>
          </motion.button>
        </div>
      </motion.div>
      
      {/* Console Subtext */}
      <div className="mt-5 flex items-center justify-center gap-4 opacity-20">
        <div className="h-[1px] w-10 bg-white/50" />
        <span className="text-[9px] font-black uppercase tracking-[0.5em] italic">Studio Terminal Active</span>
        <div className="h-[1px] w-10 bg-white/50" />
      </div>
    </div>
  );
}

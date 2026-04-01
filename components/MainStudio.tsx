"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PromptSection from "./PromptSection";
import GenrePanel from "./GenrePanel";
import LoadingScreen from "./LoadingScreen";
import StoryPage from "./StoryPage";

const STORY_LENGTHS = [
  { id: "short",  label: "Short",  desc: "~500 words", icon: "📖" },
  { id: "medium", label: "Medium", desc: "~1000 words", icon: "📚" },
  { id: "epic",   label: "Epic",   desc: "~2000 words", icon: "🏛️" },
];

const STORY_MOODS = [
  { id: "dark",        label: "Dark",        color: "border-gray-700 group-hover:border-gray-500" },
  { id: "whimsical",   label: "Whimsical",   color: "border-amber-900/40 group-hover:border-amber-500/40" },
  { id: "suspenseful", label: "Suspenseful", color: "border-accent/30 group-hover:border-accent/60" },
  { id: "epic",        label: "Epic",        color: "border-purple-900/40 group-hover:border-purple-500/40" },
];

export default function MainStudio() {
  const [prompt, setPrompt] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [story, setStory] = useState<{ title: string; segments: string[] } | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["sci-fi"]);
  const [selectedLength, setSelectedLength] = useState("medium");
  const [selectedMood, setSelectedMood] = useState("suspenseful");
  const [isHovered, setIsHovered] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    setSessionId(crypto.randomUUID());
  }, []);

  const placeholders = [
    "A space explorer finds a forgotten library...",
    "A chef discovers a dragon egg in the pantry...",
    "A time traveler gets stuck in the Victorian era...",
    "A cat who secretly runs a multi-national corporation...",
    "An archaeologist unearths a door that shouldn't exist...",
    "A lighthouse keeper receives messages from a ship that sank 100 years ago...",
  ];

  useEffect(() => {
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timerID: NodeJS.Timeout;

    const type = () => {
      const current = placeholders[index];
      if (isDeleting) {
        setPlaceholder(current.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 30;
      } else {
        setPlaceholder(current.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % placeholders.length;
        typingSpeed = 300;
      }
      timerID = setTimeout(type, typingSpeed);
    };

    timerID = setTimeout(type, typingSpeed);
    return () => clearTimeout(timerID);
  }, []);

  const [error, setError] = useState<string | null>(null);

  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(g => g !== genreId) 
        : [...prev, genreId]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const enrichedPrompt = `${prompt.trim()} [Tone: ${selectedMood}, Length: ${selectedLength}]`;
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
        },
        body: JSON.stringify({ prompt: enrichedPrompt, genres: selectedGenres }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate story.");
      }

      const genrePart = selectedGenres.length > 0
        ? selectedGenres.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(" & ")
        : "Story";
      const truncatedPrompt = prompt.length > 40 ? prompt.substring(0, 40) + "..." : prompt;

      setStory({
        title: `${genrePart}: ${truncatedPrompt}`,
        segments: [data.content],
      });
      setIsStoryOpen(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewStory = async () => {
    await fetch("/api/clear-session", {
      method: "POST",
      headers: { "X-Session-ID": sessionId },
    }).catch(() => {});
    setIsStoryOpen(false);
    setStory(null);
    setPrompt("");
    setError(null);
  };

  const handleContinue = async (followUpPrompt: string) => {
    if (!followUpPrompt.trim() || isContinuing) return;
    setIsContinuing(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
        },
        body: JSON.stringify({ prompt: followUpPrompt, genres: [] }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed.");
      setStory((prev) =>
        prev
          ? { ...prev, segments: [...prev.segments, data.content] }
          : { title: "Continued Story", segments: [data.content] }
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setIsContinuing(false);
    }
  };

  const canGenerate = prompt.trim().length > 0 && !isLoading;

  return (
    <section className="flex flex-col items-center justify-center py-12 md:py-16 px-4 md:px-8 space-y-20 max-w-5xl mx-auto w-full z-10 relative">
      
      {/* Step 1: Prompt */}
      <PromptSection 
        prompt={prompt} 
        onPromptChange={setPrompt} 
        isLoading={isLoading} 
        placeholder={placeholder} 
      />
      
      {/* Step 2: Genre Selection */}
      <GenrePanel 
        selectedGenres={selectedGenres} 
        onGenreToggle={handleGenreToggle} 
      />

      {/* Step 3: Length & Mood */}
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Story Length */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Story Length</span>
          </div>
          <div className="flex gap-3 w-full justify-center">
            {STORY_LENGTHS.map((l) => (
              <motion.button
                key={l.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedLength(l.id)}
                className={`flex flex-col items-center gap-1 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 flex-1 border ${
                  selectedLength === l.id
                    ? 'bg-accent/10 text-accent border-accent/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                    : 'glass-card text-white/30 border-white/5 hover:text-white/60'
                }`}
              >
                <span className="text-lg">{l.icon}</span>
                <span>{l.label}</span>
                <span className="text-[8px] opacity-60">{l.desc}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Story Mood */}
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Story Mood</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {STORY_MOODS.map((m) => (
              <motion.button
                key={m.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMood(m.id)}
                className={`group px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${m.color} ${
                  selectedMood === m.id
                    ? 'bg-white/10 text-white'
                    : 'bg-transparent text-white/30'
                }`}
              >
                {m.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Step 4: Generate Button */}
      <div className="flex flex-col items-center gap-6">
        <motion.button
          onClick={handleGenerate}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={!canGenerate}
          whileHover={canGenerate ? { scale: 1.04, y: -4 } : {}}
          whileTap={canGenerate ? { scale: 0.97 } : {}}
          className={`
            relative flex items-center justify-center gap-5 px-20 md:px-28 py-7 rounded-[20px] font-black text-white uppercase tracking-[0.25em] text-sm transition-all duration-500 overflow-hidden
            ${!canGenerate 
              ? 'opacity-20 cursor-not-allowed bg-white/5 border border-white/10 text-white/20 grayscale' 
              : 'shadow-[0_20px_60px_-10px_rgba(244,63,94,0.5)]'}
          `}
          style={{
            background: canGenerate ? 'hsl(350, 89%, 60%)' : 'rgba(255,255,255,0.02)',
          }}
        >
          {/* Shimmer Effect */}
          {canGenerate && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_ease_infinite] pointer-events-none" />
          )}
          
          {isLoading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
              <span>Generating Story...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>
              </svg>
              Generate Story
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-red-400/80 text-sm font-medium tracking-wide border border-red-500/20 px-6 py-3 rounded-2xl glass">
                ⚠️ {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading overlay */}
      {isLoading && <LoadingScreen />}

      {/* Full-screen story reading */}
      {isStoryOpen && story && (
        <StoryPage
          title={story.title}
          segments={story.segments}
          genres={selectedGenres}
          onNewStory={handleNewStory}
          onContinue={handleContinue}
          isContinuing={isContinuing}
        />
      )}

      {/* Footer Text */}
      <div className="text-white/20 text-[10px] font-black tracking-[0.4em] uppercase animate-fade-in" style={{ animationDelay: "0.8s" }}>
        Powered by Advanced Generative LLM
      </div>
    </section>
  );
}


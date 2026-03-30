"use client";

import React, { useState, useEffect } from "react";
import PromptSection from "./PromptSection";
import GenrePanel from "./GenrePanel";
import LoadingScreen from "./LoadingScreen";
import StoryPage from "./StoryPage";

export default function MainStudio() {
  const [prompt, setPrompt] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [story, setStory] = useState<{ title: string; segments: string[] } | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["sci-fi"]);
  const [isHovered, setIsHovered] = useState(false);
  // One session ID per component mount — persists across "Continue this story" calls
  const [sessionId] = useState<string>(() => crypto.randomUUID());

  // Typing effect logic moved to MainStudio
  const placeholders = [
    "A space explorer finds a forgotten library...",
    "A chef discovers a dragon egg in the pantry...",
    "A time traveler gets stuck in the Victorian era...",
    "A cat who secretly runs a multi-national corporation...",
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
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
        },
        body: JSON.stringify({ prompt, genres: selectedGenres }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate story.");
      }

      // Derive a friendly title from the prompt
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

  // Clear server session and reset local state for a brand-new story
  const handleNewStory = async () => {
    await fetch("/api/clear-session", {
      method: "POST",
      headers: { "X-Session-ID": sessionId },
    }).catch(() => {}); // best-effort
    setIsStoryOpen(false);
    setStory(null);
    setPrompt("");
    setError(null);
  };

  // Continue the story using the same session (no prompt change, no genre reset)
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
      // Append new content as a new segment (shows divider in StoryPage)
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


  return (
    <section className="flex flex-col items-center justify-center p-6 space-y-16 max-w-7xl mx-auto w-full z-10 relative">
      {/* Main Action Area */}
      <div className="w-full flex flex-col items-center gap-12">
        {/* Step 1: Writing Box */}
        <PromptSection 
          prompt={prompt} 
          onPromptChange={setPrompt} 
          isLoading={isLoading} 
          placeholder={placeholder} 
        />
        
        {/* Step 2: Genre Selection (Multiple) */}
        <GenrePanel 
          selectedGenres={selectedGenres} 
          onGenreToggle={handleGenreToggle} 
        />

        {/* Step 3: Global Generate Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleGenerate}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isLoading || !prompt.trim()}
            style={{ 
              backgroundColor: isLoading || !prompt.trim() ? '#1f2937' : 'hsl(350, 89%, 60%)',
              boxShadow: isLoading || !prompt.trim() 
                ? 'none' 
                : isHovered 
                  ? '0 0 60px rgba(244,63,94,0.6), 0 20px 48px -12px rgba(0,0,0,0.5)'
                  : '0 20px 48px -12px hsl(350, 89%, 60%, 0.6)'
            }}
            className={`
              relative flex items-center justify-center gap-6 px-24 py-8 rounded-sm font-black text-white uppercase tracking-[0.25em] transition-all duration-500
              ${isLoading || !prompt.trim() 
                ? 'opacity-50 cursor-not-allowed text-gray-400' 
                : 'hover:scale-[1.03] hover:-translate-y-1 active:scale-95 hover:brightness-110 shadow-2xl'}
            `}
          >
            {isLoading ? (
              <>
                <span className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z"/><path d="m14 7 3 3"/><path d="M5 6v4"/><path d="M19 14v4"/><path d="M10 2v2"/><path d="M7 8H3"/><path d="M21 16h-4"/><path d="M11 3H9"/>
                </svg>
                Generate Story
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center animate-fade-in">
            <p className="text-red-400/80 text-sm font-medium tracking-wide border border-red-500/20 px-6 py-3 rounded-full glass">
              ⚠️ {error}
            </p>
          </div>
        )}
      </div>


      {/* Cinematic loading overlay */}
      {isLoading && <LoadingScreen />}

      {/* Full-screen story reading page */}
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

      {/* Visual background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent blur-[150px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full opacity-20" />
      </div>
      
      {/* Footer Text */}
      <div className="text-white/20 text-sm font-medium tracking-widest mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        POWERED BY ADVANCED GENERATIVE LLM
      </div>
    </section>
  );
}


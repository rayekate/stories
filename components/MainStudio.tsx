"use client";

import React, { useState, useEffect } from "react";
import PromptSection from "./PromptSection";
import StoryDialog from "./StoryDialog";
import GenrePanel from "./GenrePanel";

export default function MainStudio() {
  const [prompt, setPrompt] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [story, setStory] = useState<{ title: string; content: string } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["sci-fi"]);

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
    // Simulate API call with genre context
    setTimeout(() => {
      const genreTags = selectedGenres.length > 0 ? selectedGenres.join(" & ") : "Story";
      const mockStory = {
        title: `The ${genreTags} Saga`,
        content: `In a reality where the boundaries of ${genreTags} were blurred, ${prompt}. \n\nThe world was a masterpiece of ${selectedGenres[0] || 'imagination'}, woven with threads of deep narrative. Every action echoed through the halls of history, driven by ${prompt.substring(0, 30)}... \n\nAs the final chapter of this ${genreTags} epic closed, the weight of the story remained, a testament to the power of pure creation.`
      };
      
      setStory(mockStory);
      setIsLoading(false);
      setIsDialogOpen(true);
    }, 2800);
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center p-6 space-y-16 max-w-7xl mx-auto w-full">
      {/* Header / Title */}
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent opacity-90 leading-tight uppercase">
          AI STORY <span className="text-accent underline decoration-accent-glow underline-offset-8">STUDIO</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl mx-auto tracking-wide">
          Transform your wildest prompts into immersive narrative experiences.
        </p>
      </div>

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
            disabled={isLoading || !prompt.trim()}
            style={{ 
              backgroundColor: isLoading || !prompt.trim() ? '#1f2937' : 'hsl(350, 89%, 60%)',
              boxShadow: isLoading || !prompt.trim() ? 'none' : '0 20px 48px -12px hsl(350, 89%, 60%, 0.6)'
            }}
            className={`
              relative flex items-center justify-center gap-6 px-24 py-8 rounded-full font-black text-white uppercase tracking-[0.25em] transition-all duration-300
              ${isLoading || !prompt.trim() 
                ? 'opacity-50 cursor-not-allowed text-gray-400' 
                : 'hover:scale-105 active:scale-95 hover:brightness-110 shadow-2xl'}
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
      </div>

      {/* Interactive Story Dialog */}
      <StoryDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        title={story?.title || ""} 
        content={story?.content || ""}
      />

      {/* Visual background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent blur-[150px] rounded-full opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 blur-[150px] rounded-full opacity-20" />
      </div>
      
      {/* Footer Text */}
      <div className="text-white/20 text-sm font-medium tracking-widest mt-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        POWERED BY ADVANCED GENERATIVE LLM
      </div>
    </main>
  );
}


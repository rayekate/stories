"use client";

import React, { useState, useEffect, useRef } from "react";

interface PromptSectionProps {
  onPromptChange: (prompt: string) => void;
  prompt: string;
  isLoading: boolean;
  placeholder: string;
}

export default function PromptSection({ onPromptChange, prompt, isLoading, placeholder }: PromptSectionProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="glass rounded-none overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[hsl(350,89%,60%,0.3)] border-white/20">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={isLoading}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:ring-0 text-foreground placeholder:text-white/20 p-8 min-h-[220px] md:min-h-[240px] resize-none text-xl outline-none leading-relaxed transition-all"
        />
      </div>
    </div>
  );
}


"use client";

import React, { useEffect } from "react";

interface StoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function StoryDialog({ isOpen, onClose, title, content }: StoryDialogProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Dialog content */}
      <div className="relative glass rounded-[32px] w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="p-8 border-b border-white/10 flex items-start justify-between">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            {title || "Your Magic Story"}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
          <div className="prose prose-invert max-w-none text-lg leading-[1.8] text-gray-200 indent-8 space-y-4">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-full font-semibold border border-white/20 hover:bg-white/10 transition-colors"
          >
            Close
          </button>
          <button 
            className="px-6 py-2 rounded-full font-semibold bg-accent text-white hover:bg-accent-hover transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(`${title}\n\n${content}`);
              alert("Story copied to clipboard!");
            }}
          >
            Copy Story
          </button>
        </div>
      </div>
    </div>
  );
}

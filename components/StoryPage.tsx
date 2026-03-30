"use client";

import React, { useEffect, useRef, useState } from "react";

const Thumb = ({ type, active, onClick, className="" }: any) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-lg border transition-all duration-300 ${
      active 
        ? "bg-white/10 border-white/20 text-accent scale-110 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
        : "bg-white/[0.03] border-white/5 text-white/30 hover:bg-white/5 hover:text-white/60 hover:border-white/10"
    } ${className}`}
  >
    {type === 'up' ? (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
      </svg>
    ) : (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
      </svg>
    )}
  </button>
);

interface StoryPageProps {
  title: string;
  segments: string[];
  genres: string[];
  onNewStory: () => void;
  onContinue: (followUpPrompt: string) => void;
  isContinuing: boolean;
}

export default function StoryPage({
  title,
  segments,
  genres,
  onNewStory,
  onContinue,
  isContinuing,
}: StoryPageProps) {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [rating, setRating] = useState<null | 'up' | 'down'>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [followUp]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${title}\n\n${segments.join("\n\n")}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleContinue = () => {
    if (!followUp.trim() || isContinuing) return;
    onContinue(followUp.trim());
    setFollowUp("");
  };

  const segmentParagraphs: string[][] = segments.map((seg) =>
    seg.split(/\n\n|\n/).map((p: string) => p.trim()).filter(Boolean)
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden flex flex-col items-center w-full"
      style={{
        background: "#0a0a0b",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div
          className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-[0.07] blur-[130px] rounded-full"
          style={{ background: "hsl(245,100%,65%)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] opacity-[0.05] blur-[120px] rounded-full"
          style={{ background: "hsl(350,89%,60%)" }}
        />
      </div>

      {/* ── Sticky Header ── */}
      <header
        className="sticky top-0 z-20 w-full flex items-center justify-between px-6 md:px-16 py-4 border-b border-white/[0.06]"
        style={{ backdropFilter: "blur(24px)", background: "rgba(10,10,11,0.85)" }}
      >
        {/* Branding */}
        <div className="flex items-center gap-3">
          <span className="text-accent font-black text-lg">✦</span>
          <span className="text-white/30 text-xs uppercase tracking-[0.35em] font-bold hidden sm:block">
            AI Story Studio
          </span>
        </div>

        {/* Genre chips */}
        <div className="hidden md:flex items-center gap-2">
          {genres.map((g) => (
            <span
              key={g}
              className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest border border-white/10 text-white/25"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-sm text-xs font-black uppercase tracking-widest border border-white/10 text-white/50 hover:text-white/90 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            onClick={onNewStory}
            className="group relative px-6 py-2.5 rounded-sm text-xs font-black uppercase tracking-[0.2em] text-white transition-all duration-500 hover:scale-[1.05] hover:-translate-y-0.5 active:scale-95 overflow-hidden border border-white/10"
            style={{
              boxShadow: "0 4px 20px -5px hsla(350,89%,60%,0.4)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(350,89%,58%)] to-[hsl(330,89%,58%)] transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_25px_rgba(244,63,94,0.5)]" />
            <span className="relative flex items-center gap-2">
              <span className="text-lg leading-none mb-[2px]">+</span> New Story
            </span>
          </button>
        </div>
      </header>

      {/* ── Story Content ── */}
      <main
        className="relative z-10 w-full max-w-5xl px-4 md:px-8 pt-6 pb-0 flex flex-col items-center flex-1 overflow-hidden h-full"
        style={{
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
        }}
      >
        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6 text-center w-full shrink-0"
          style={{
            background: "linear-gradient(135deg, #fff 30%, rgba(255,255,255,0.35) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h1>

        {/* Genre chips under title */}
        <div className="flex flex-wrap gap-2 justify-center mb-6 shrink-0">
          {genres.map((g) => (
            <span
              key={g}
              className="px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-accent/30 text-accent/70"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center gap-5 mb-8 shrink-0 w-full max-w-lg">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1))" }} />
          <span className="text-accent/60 text-xl">✦</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), transparent)" }} />
        </div>

        {/* ── Scrollable Story Area ── */}
        <div className="flex-1 w-full max-w-4xl mx-auto overflow-y-auto custom-scrollbar relative bg-black/20 rounded-t-sm border border-white/[0.04] p-6 pb-[280px] md:p-12 md:pb-[300px] shadow-2xl backdrop-blur-sm flex flex-col items-center">
          {/* Story segments with continuation dividers */}
          {segmentParagraphs.map((paragraphs, segIndex) => (
            <div key={segIndex} className="w-full flex flex-col items-center">
              {/* Continuation divider — shown between segments */}
              {segIndex > 0 && (
                <div
                  className="flex flex-col items-center gap-4 my-16"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.8s ease 0.1s`,
                  }}
                >
                  <div className="flex items-center gap-5 w-full">
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, hsl(350,89%,60%,0.4))" }} />
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-[hsl(350,89%,60%)] text-xl">✦</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/25">
                        Continued
                      </span>
                    </div>
                    <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, hsl(350,89%,60%,0.4), transparent)" }} />
                  </div>
                </div>
              )}

              {/* Paragraphs in this segment */}
              <div className="space-y-8 w-full max-w-3xl mx-auto flex flex-col items-center">
                {paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-[1.15rem] md:text-[1.25rem] leading-[1.9] text-white/80 font-light text-center"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 0.7s ease ${0.15 + (segIndex * 5 + pIndex) * 0.04}s, transform 0.7s ease ${0.15 + (segIndex * 5 + pIndex) * 0.04}s`,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* ── End of Story ornament ── */}
          <div className="flex flex-col items-center gap-12 mt-24 mb-8">
            <div className="flex items-center gap-4 w-full max-w-lg">
              <div className="flex-1 h-px bg-white/[0.07]" />
              <span className="text-white/20 text-xs uppercase tracking-[0.35em]">End of Story</span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>
          </div>
        </div>

        {/* Floating Continue / Rating overlapping bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-44 pointer-events-none flex flex-col items-center z-20"
             style={{ 
               background: "linear-gradient(to top, #0a0a0b 45%, transparent 100%)" 
             }}>
          <div className="pointer-events-auto flex w-full max-w-5xl justify-center items-end gap-6 flex-wrap md:flex-nowrap">
            
            {/* ── Continue Chat Box ── */}
            <div
              className="w-full max-w-xl transition-all duration-500 rounded-sm"
              style={{
                background: "rgba(20,20,22,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 12px 40px -16px rgba(0,0,0,0.8)",
                transform: isContinuing ? "scale(1.02)" : "scale(1)",
                borderColor: isContinuing ? "hsl(350,89%,60%,0.3)" : "rgba(255,255,255,0.08)",
              }}
            >
              {/* Interactive Loading Bar */}
              {isContinuing && (
                <div className="w-full h-1 bg-white/5 relative overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 w-1/3 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, hsl(350,89%,60%), transparent)",
                      animation: "chat-loading-sweep 1.5s ease-in-out infinite"
                    }}
                  />
                </div>
              )}

              <div className="flex flex-col gap-4 p-8 relative">
                <textarea
                  ref={textareaRef}
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  disabled={isContinuing}
                  placeholder={isContinuing ? "Crafting the next chapter..." : "What happens next? Twist the plot, add characters..."}
                  className="w-full bg-black/40 rounded-sm px-6 py-5 text-white/90 placeholder:text-white/30 text-sm leading-relaxed outline-none resize-none min-h-[90px] disabled:opacity-50 transition-all border border-white/5 focus:border-white/10"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleContinue();
                    }
                  }}
                />
                
                <div className="flex justify-center w-full">
                  <button
                    onClick={handleContinue}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    disabled={!followUp.trim() || isContinuing}
                    className="group relative flex shrink-0 items-center justify-center gap-3 px-12 py-4 rounded-sm text-sm font-black uppercase tracking-[0.3em] text-white transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.08] hover:-translate-y-1 active:scale-95 w-full sm:w-auto overflow-hidden"
                    style={{
                      background: !followUp.trim() || isContinuing ? "#1f2937" : "hsl(350, 89%, 60%)",
                      boxShadow: !followUp.trim() || isContinuing 
                        ? "none" 
                        : isHovered 
                          ? "0 0 50px rgba(244,63,94,0.7), 0 10px 40px -10px rgba(0,0,0,0.5)" 
                          : "0 10px 30px -10px hsla(350,89%,60%,0.6)",
                    }}
                  >
                    {!followUp.trim() || isContinuing ? null : (
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                    {isContinuing ? (
                      <span className="text-[11px] tracking-[0.3em] font-black animate-pulse">WRITING...</span>
                    ) : (
                      <span className="relative z-10">Continue</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbs Rating Box */}
            <div className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl p-6 rounded-sm border border-white/[0.08] shadow-2xl shrink-0 self-end mb-1">
              <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-4">Did you like it?</span>
              <div className="flex items-center gap-4">
                <Thumb 
                  type="up" 
                  active={rating === 'up'} 
                  onClick={() => setRating(rating === 'up' ? null : 'up')} 
                />
                <Thumb 
                  type="down" 
                  active={rating === 'down'} 
                  onClick={() => setRating(rating === 'down' ? null : 'down')} 
                />
              </div>
              {rating && (
                <span className="text-accent/90 text-[10px] font-bold mt-4 tracking-widest uppercase animate-fade-in text-center">
                  {rating === 'up' ? "Awesome! 💖" : "Thanks for feedback! ✨"}
                </span>
              )}
            </div>

          </div>
        </div>

        <style>{`
          @keyframes chat-loading-sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}</style>
      </main>
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-[#050508]"
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 -z-10 bg-radial-at-tr from-accent/20 to-transparent opacity-40 blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-at-center from-accent-glow to-transparent opacity-20 -z-10 blur-[150px]" 
      />
      
      {/* Geometric Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-white/10 to-transparent blur-[1px]" />
        <div className="absolute bottom-[15%] right-[10%] w-[1px] h-[40%] bg-gradient-to-b from-transparent via-white/10 to-transparent blur-[1px]" />
        <div className="absolute top-[40%] right-[15%] w-64 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-[1px]" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto text-center space-y-16 relative z-10"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border-white/5 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/50 shadow-2xl"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <div className="absolute inset-0 text-accent blur-sm animate-pulse-glow" />
          </div>
          The Future of Interactive Storytelling
        </motion.div>

        {/* Cinematic Heading */}
        <div className="space-y-8">
            <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter italic uppercase leading-[0.85] text-white break-words"
          >
            IMAGINE <br />
            <span className="text-accent relative inline-block">
              LIMITLESS
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-4 left-0 h-4 bg-accent/20 blur-xl -z-10" 
              />
            </span> <br />
            <span className="text-white/20 select-none block sm:inline">EXPERIENCES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/40 font-medium tracking-widest uppercase italic leading-relaxed"
          >
            Transform your wildest prompts into immersive, cinematic narrative experiences. <br className="hidden md:block" /> 
            <span className="text-white/60">The premium AI studio for modern dreamers.</span>
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8"
        >
          <motion.a
            href="#studio"
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-6 bg-accent text-white px-14 py-7 rounded-[24px] font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_50px_-10px_rgba(244,63,94,0.5)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
            <span className="relative z-10">Start Creating</span> 
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          </motion.a>
          
          <motion.button 
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-6 px-12 py-7 rounded-[24px] glass border-white/10 hover:bg-white/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-all border border-white/5 group-hover:border-accent/40">
              <Play className="w-4 h-4 fill-white group-hover:fill-accent transition-colors ml-1" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">Watch Showcase</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating UI Elements (Decorative) */}
      <div className="absolute bottom-20 left-10 hidden lg:block opacity-20 hover:opacity-100 transition-opacity duration-700">
        <div className="glass-card p-6 rounded-3xl space-y-4 max-w-[200px]">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <div className="w-12 h-2 rounded-full bg-white/10" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-1 bg-white/10" />
            <div className="w-2/3 h-1 bg-white/5" />
          </div>
        </div>
      </div>

      <div className="absolute top-40 right-10 hidden lg:block opacity-10 hover:opacity-60 transition-opacity duration-700">
        <div className="text-[120px] font-black text-white/5 select-none leading-none tracking-tighter">
          01
        </div>
      </div>


    </section>
  );
}

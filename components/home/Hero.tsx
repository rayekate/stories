"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

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
      className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-background"
    >
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 -z-10 bg-radial-at-tr from-accent/20 to-transparent opacity-30 blur-3xl" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-at-center from-accent-glow to-transparent opacity-15 -z-10 blur-[150px]" 
      />
      
      {/* Geometric Accents */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[1px] h-[50%] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-[1px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[1px] h-[50%] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-[1px]" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto text-center space-y-12 relative z-10"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass border-white/5 text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/40 shadow-2xl"
        >
          <div className="relative">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <div className="absolute inset-0 text-accent blur-md animate-pulse-glow" />
          </div>
          The Elite Sanctuary for Unconstrained Imagination
        </motion.div>

        {/* Cinematic Heading */}
        <div className="space-y-10">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-tighter italic uppercase leading-[0.8] text-white break-words drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            CRAFT <br />
            <span className="text-accent relative inline-block">
              LIMITLESS
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "110%" }}
                transition={{ duration: 1.5, delay: 1 }}
                className="absolute -bottom-4 -left-2 h-6 bg-accent/10 blur-2xl -z-10" 
              />
            </span> <br />
            <span className="text-white/10 select-none block sm:inline">DESIRES</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="max-w-3xl mx-auto text-base md:text-lg text-white/30 font-medium tracking-[0.2em] uppercase italic leading-relaxed"
          >
            Transform your deepest prompts into unfiltered, cinematic narrative experiences. <br className="hidden md:block" /> 
            <span className="text-white/50">Where dark fantasy meets unrestricted AI power.</span>
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

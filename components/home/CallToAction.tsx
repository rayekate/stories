"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 blur-[100px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-accent/20 text-[10px] font-black uppercase tracking-[0.4em] text-accent"
        >
          <Sparkles size={12} className="animate-pulse" />
          Surrender to Imagination
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white"
        >
          READY TO <br />
          <span className="text-accent relative">
            SURRENDER?
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -bottom-2 left-0 h-3 bg-accent/20 blur-lg -z-10"
            />
          </span> <br />
          <span className="text-white/20 uppercase">No Filters. No Limits.</span>
        </motion.h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl text-lg text-white/40 font-medium tracking-wider uppercase italic leading-relaxed"
        >
          Unleash your deepest creative potential. No boundaries. Just your imagination and our mission — 
          <span className="text-white/60"> generating bespoke, unfiltered narratives in seconds.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#studio"
            whileHover={{ scale: 1.06, y: -4 }}
            whileTap={{ scale: 0.97 }}
            className="group relative inline-flex items-center gap-6 bg-accent text-white px-16 py-8 rounded-[24px] font-black uppercase tracking-[0.3em] text-sm shadow-[0_25px_60px_-10px_rgba(244,63,94,0.55)] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10">Start Creating Now</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20"
        >
          {["Free to Use", "No Sign-up Required", "10 Genre Vectors", "Real-time AI"].map((badge, i) => (
            <React.Fragment key={badge}>
              <span>{badge}</span>
              {i < 3 && <div className="w-1 h-1 rounded-full bg-white/10" />}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

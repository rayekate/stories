"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Indie Game Developer",
    initials: "AM",
    text: "The narratives generated here are genuinely cinematic. I've used it to prototype entire story arcs for my RPG in an afternoon. The tone consistency is remarkable.",
    rating: 5,
    accent: "from-blue-500/30 to-blue-500/5",
    border: "border-blue-500/20",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
  },
  {
    name: "Sofia Laurent",
    role: "Creative Writing Instructor",
    initials: "SL",
    text: "A brilliant tool for overcoming writer's block. The genre-blending leads to such unique prompt combinations—Horror × Romance was surprisingly captivating.",
    rating: 5,
    accent: "from-accent/30 to-accent/5",
    border: "border-accent/20",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia"
  },
  {
    name: "Marcus Chen",
    role: "Screenwriter & Producer",
    initials: "MC",
    text: "The multi-segment memory is what sets this apart. It actually maintains the world-building across chapters, keeping the narrative coherent and immersive.",
    rating: 5,
    accent: "from-purple-500/30 to-purple-500/5",
    border: "border-purple-500/20",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  },
];

const STATS = [
  { value: "15K+", label: "Stories Generated" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "10", label: "Genre Vectors" },
  { value: "∞", label: "Imagination" },
];

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="container-tight">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 p-10 glass-card rounded-[32px]"
        >
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <span className="text-4xl md:text-5xl font-black tracking-tighter text-white">{stat.value}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/40"
          >
            <div className="w-1 h-1 rounded-full bg-accent" />
            Trusted by Creators
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]"
          >
            WHAT <span className="text-accent">DREAMERS</span> <br />
            <span className="text-white/20">ARE SAYING</span>
          </motion.h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8 }}
              className={`glass-card rounded-[32px] p-8 md:p-10 flex flex-col gap-6 group relative overflow-hidden border ${t.border}`}
            >
              {/* Accent glow */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${t.accent} opacity-0 group-hover:opacity-100 blur-[60px] transition-opacity duration-700 pointer-events-none`} />

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-accent fill-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/60 font-medium leading-relaxed text-sm md:text-base flex-1 relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5 relative z-10">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 relative">
                  <Image 
                    src={t.image} 
                    alt={t.name} 
                    fill 
                    className="object-cover" 
                    unoptimized={true} 
                  />
                </div>
                <div>
                  <p className="font-black text-white text-sm uppercase tracking-tight">{t.name}</p>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

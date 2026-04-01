"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Zap, Layers, Share2, Palette, Box, FileDown, Moon } from "lucide-react";

const features = [
  {
    title: "AI Generation",
    description: "Powered by advanced generative models, our studio transforms text into rich, multi-layered narratives with full genre awareness.",
    icon: Brain,
    color: "bg-blue-500",
    glow: "bg-blue-500",
  },
  {
    title: "Interactive Flow",
    description: "Continue the story in real-time. Make choices that shape the future of your characters and craft worlds through dialogue.",
    icon: Zap,
    color: "bg-amber-500",
    glow: "bg-amber-500",
  },
  {
    title: "Genre Explorer",
    description: "From Sci-Fi to Noir, choose from 10 genre vectors and blend them for unique narrative combinations.",
    icon: Palette,
    color: "bg-accent",
    glow: "bg-accent",
  },
  {
    title: "Multi-Segment",
    description: "Build expansive worlds across multiple chapters and episodes with persistent session memory management.",
    icon: Layers,
    color: "bg-emerald-500",
    glow: "bg-emerald-500",
  },
  {
    title: "Immersive UI",
    description: "A cinematic experience designed for focus. From writing to reading, every pixel is intentionally premium.",
    icon: Box,
    color: "bg-purple-500",
    glow: "bg-purple-500",
  },
  {
    title: "Social Stories",
    description: "Share your generated experiences with a global community of writers, gamers, and narrative explorers.",
    icon: Share2,
    color: "bg-rose-500",
    glow: "bg-rose-500",
  },
  {
    title: "Export & Save",
    description: "Download your complete stories as text files or copy them instantly. Your narratives, your way.",
    icon: FileDown,
    color: "bg-teal-500",
    glow: "bg-teal-500",
  },
  {
    title: "Reading Mode",
    description: "A dedicated full-screen reading experience with adjustable typography to match your reading preference.",
    icon: Moon,
    color: "bg-indigo-500",
    glow: "bg-indigo-500",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Write Your Premise",
    desc: "Type any story idea — a single sentence or a detailed scenario. Use quick-fill templates or the random prompt button for inspiration.",
    color: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    step: "02",
    title: "Choose Your Genre",
    desc: "Select one or more of 10 genre vectors to guide the tone, style, and atmosphere of your generated narrative.",
    color: "text-accent",
    border: "border-accent/20",
  },
  {
    step: "03",
    title: "Read & Continue",
    desc: "Receive a cinematic story instantly. Then guide the plot forward, chapter by chapter, with your own follow-up prompts.",
    color: "text-purple-400",
    border: "border-purple-500/20",
  },
];

export default function Features() {
  return (
    <section id="features" className="section-padding relative overflow-hidden bg-transparent">
      <div className="container-tight">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/40"
            >
              <div className="w-1 h-1 rounded-full bg-accent" />
              Core Capabilities
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9]">
              ADVANCED <span className="text-white/20">SYSTEMS</span> <br />
              FOR <span className="text-accent">DREAMERS</span>
            </h2>
          </div>
          <p className="max-w-md text-lg text-white/30 font-medium tracking-wide leading-relaxed uppercase">
            Every detail is meticulously crafted to empower your imagination and provide a seamless cinematic experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              whileHover={{ y: -8 }}
              className="glass-card flex flex-col justify-between h-full rounded-[28px] group relative overflow-hidden"
              style={{ padding: "2.25rem" }}
            >
              {/* Number Badge */}
              <div className="absolute top-6 right-6 text-[11px] font-black text-white/10 tracking-[0.1em] group-hover:text-white/20 transition-colors">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Background Glow */}
              <div className={`absolute top-0 right-0 w-32 h-32 ${feature.glow} opacity-0 group-hover:opacity-15 blur-[60px] transition-opacity duration-500`} />
              
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 shrink-0`}>
                <feature.icon className="text-white w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-black uppercase tracking-tight mb-3 text-white group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/40 font-medium tracking-wide leading-relaxed text-sm mb-6 flex-1">
                {feature.description}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/20 group-hover:text-accent transition-colors">
                <span className="shrink-0">ENGAGE</span>
                <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-accent/40 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-32">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
              <div className="w-1 h-1 rounded-full bg-accent" />
              Process
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              HOW IT <span className="text-accent">WORKS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Connector line desktop */}
            <div className="absolute top-12 left-[16.5%] right-[16.5%] h-[1px] bg-gradient-to-r from-blue-500/20 via-accent/30 to-purple-500/20 hidden md:block" />

            {HOW_IT_WORKS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`glass-card rounded-[28px] p-8 md:p-10 flex flex-col gap-6 relative border ${step.border}`}
              >
                <div className={`text-5xl font-black tracking-tighter ${step.color}`}>
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-3">{step.title}</h3>
                  <p className="text-white/40 font-medium leading-relaxed text-sm">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

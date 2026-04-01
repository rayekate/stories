"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Globe, Mail, MessageCircle, ExternalLink, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Solutions",
      links: [
        { name: "Creative Writing", href: "/#features" },
        { name: "Interactive Gaming", href: "/#features" },
        { name: "Cinematic Narrative", href: "/#features" },
        { name: "Genre Explorer", href: "/#studio" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Case Studies", href: "/#stories" },
        { name: "Blog", href: "/blog" },
        { name: "AI Methodology", href: "/#features" },
        { name: "API Docs", href: "/#studio" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/#hero" },
        { name: "Press", href: "/#hero" },
        { name: "Careers", href: "/#hero" },
        { name: "Contact", href: "/#hero" },
      ],
    },
  ];

  return (
    <footer className="relative z-10 pt-32 pb-12 px-6 border-t border-white/5 bg-[#050508] overflow-hidden">
      {/* Immersive Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[30%] bg-accent/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-[18px] bg-accent flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(244,63,94,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">
                  AI STORY <span className="text-accent">STUDIO</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase mt-1">Creative Matrix v3.0</span>
              </div>
            </Link>
            
            <p className="max-w-xs text-white/40 text-sm font-medium leading-relaxed uppercase tracking-wider italic">
              Pioneering the future of interactive storytelling. <br />
              <span className="text-white/20">Transform your imagination into immersive narrative experiences.</span>
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: Globe, href: "#" },
                { icon: MessageCircle, href: "#" },
                { icon: ExternalLink, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center text-white/30 hover:text-white hover:border-accent/40 hover:scale-110 transition-all group/icon"
                >
                  <social.icon size={20} className="group-hover/icon:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-white/40 hover:text-white transition-all flex items-center gap-2 group/link"
                    >
                      <span className="group-hover/link:translate-x-1 transition-transform">{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-y-0 group-hover/link:translate-x-0 transition-all text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10">
              © {currentYear} AI STORY STUDIO.
            </p>
            <p className="text-[9px] font-bold tracking-[0.4em] text-white/5 uppercase">
              Engineered for the NEXT generation of dreamers.
            </p>
          </div>

          <div className="flex gap-10">
            {["Privacy", "Terms", "Documentation"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Studio", href: "/#studio" },
    { name: "Features", href: "/#features" },
    { name: "Stories", href: "/#stories" },
    { name: "Blog", href: "/blog" },
  ];

  // A link is "active" if its path matches the current pathname
  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false; // hash-only links don't get active state
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`glass rounded-[24px] px-8 py-4 flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "bg-black/40 border-white/10 shadow-2xl backdrop-blur-2xl" : "bg-transparent border-transparent shadow-none"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(244,63,94,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic group-hover:opacity-80 transition-opacity">
              AI STORY <span className="text-accent underline decoration-accent/20 underline-offset-4">STUDIO</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:translate-y-[-1px] ${
                  isActive(link.href)
                    ? "text-white after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-accent"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#studio"
              className="group relative bg-accent text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_-5px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              <span className="relative z-10">Launch Studio</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-3 glass-card rounded-xl hover:bg-white/10 active:scale-90 transition-all z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 p-6 md:hidden"
          >
            <div className="glass rounded-[32px] p-10 flex flex-col gap-8 shadow-2xl border-white/10 backdrop-blur-3xl">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl font-black uppercase tracking-tighter italic flex items-center justify-between group py-2"
                  >
                    <span className={`transition-colors truncate pr-4 ${
                      isActive(link.href) ? "text-accent" : "text-white group-hover:text-accent"
                    }`}>{link.name}</span>
                    <ChevronRight className={`transition-all shrink-0 text-accent ${
                      isActive(link.href) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0"
                    }`} size={24} />
                  </Link>
                </motion.div>
              ))}
              <hr className="border-white/5" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/#studio"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group relative bg-accent text-white py-6 rounded-2xl text-center font-black uppercase tracking-[0.3em] shadow-[0_20px_50px_-10px_rgba(244,63,94,0.5)] flex items-center justify-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                  <span className="relative z-10">Start Creating Now</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

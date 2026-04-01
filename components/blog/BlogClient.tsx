"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  title: string;
  slug: string;
  genre: string;
  excerpt: string;
  createdAt: string;
}

interface BlogClientProps {
  initialBlogs: Blog[];
  genres: string[];
}

export default function BlogClient({ initialBlogs, genres }: BlogClientProps) {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesGenre = !selectedGenre || blog.genre === selectedGenre;
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featured = filteredBlogs[0];
  const rest = filteredBlogs.slice(1);

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-12">
        {/* Genre filter chips */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedGenre(null)}
            className={`text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase transition-all border ${
              !selectedGenre 
                ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" 
                : "bg-white/5 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"
            }`}
          >
            All
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g === selectedGenre ? null : g)}
              className={`text-[10px] font-black px-4 py-2 rounded-full tracking-widest uppercase transition-all border ${
                selectedGenre === g 
                  ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" 
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-accent transition-colors" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-10 text-xs font-medium text-white placeholder:text-white/10 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all uppercase tracking-widest"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredBlogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-32 space-y-4"
          >
            <p className="text-white/20 text-sm font-medium uppercase tracking-widest">
              No stories match your criteria.
            </p>
            <button
              onClick={() => { setSelectedGenre(null); setSearchQuery(""); }}
              className="text-accent text-[10px] font-black uppercase tracking-widest hover:underline"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            {/* Featured Post */}
            {featured && !searchQuery && !selectedGenre && (
              <motion.div layout>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group block glass-card rounded-[28px] p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center hover:border-accent/20 transition-all duration-700"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="bg-accent/10 border border-accent/20 text-accent text-[9px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                        {featured.genre ?? "Featured"}
                      </span>
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Latest
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight italic group-hover:text-accent transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest">
                      Read Full Story
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </div>
                  </div>

                  <div className="relative hidden md:flex items-center justify-center h-56 overflow-hidden rounded-[20px] bg-gradient-to-br from-accent/10 to-accent-secondary/5 border border-white/5">
                    <div className="text-[80px] font-black italic opacity-10 uppercase tracking-tighter select-none">
                      {(featured.genre ?? "AI").slice(0, 2)}
                    </div>
                    <div className="absolute bottom-4 right-4 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                      {new Date(featured.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchQuery || selectedGenre ? filteredBlogs : rest).map((blog) => (
                <motion.div key={blog.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="group glass-card rounded-[20px] p-7 flex flex-col gap-5 hover:border-accent/20 transition-all duration-500 h-full"
                  >
                    <div className="flex items-center justify-between">
                      <span className="bg-accent/10 border border-accent/20 text-accent text-[9px] font-black px-2.5 py-0.5 rounded-full tracking-widest uppercase">
                        {blog.genre ?? "Story"}
                      </span>
                      <time className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    <h2 className="text-xl font-black tracking-tighter leading-snug italic group-hover:text-accent transition-colors line-clamp-2 flex-1">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="text-white/40 text-xs leading-relaxed line-clamp-3">
                        {blog.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-accent/40 group-hover:text-accent transition-colors text-[10px] font-black uppercase tracking-widest mt-auto">
                      Read Story
                      <ArrowUpRight
                        size={12}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

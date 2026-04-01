'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Story {
  _id: string
  title: string
  excerpt: string
  slug: string
  genre: string
}

interface FeaturedSliderProps {
  stories: Story[]
}

export function FeaturedSlider({ stories }: FeaturedSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stories.length)
  }, [stories.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length)
  }, [stories.length])

  useEffect(() => {
    if (stories.length <= 1) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, stories.length])

  if (!stories || stories.length === 0) return null

  // Get 3 items to show (prev, current, next)
  const getVisibleStories = () => {
    if (stories.length === 1) return [null, stories[0], null]
    if (stories.length === 2) return [null, stories[currentIndex], stories[(currentIndex + 1) % 2]]
    
    const prev = (currentIndex - 1 + stories.length) % stories.length
    const next = (currentIndex + 1) % stories.length
    
    return [stories[prev], stories[currentIndex], stories[next]]
  }

  const visibleStories = getVisibleStories()

  return (
    <div className="w-full relative">
      <div className="relative flex items-center justify-center gap-4 md:gap-8 min-h-[440px]">
        <AnimatePresence mode="popLayout">
          {visibleStories.map((story, i) => {
            if (!story) return <div key={`empty-${i}`} className="hidden md:block w-full max-w-sm" />
            
            const isCenter = i === 1
            const isLeft = i === 0
            const isRight = i === 2

            return (
              <motion.div
                key={story._id + i}
                initial={{ opacity: 0, scale: 0.8, x: isLeft ? -100 : isRight ? 100 : 0 }}
                animate={{ 
                  opacity: isCenter ? 1 : 0.4, 
                  scale: isCenter ? 1.05 : 0.9,
                  x: 0,
                  zIndex: isCenter ? 10 : 0,
                  filter: isCenter ? 'blur(0px)' : 'blur(4px)'
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`relative w-full max-w-sm rounded-[32px] overflow-hidden ${isCenter ? 'glass-card' : 'border border-white/5 bg-white/[0.02]'} p-8 md:p-10 flex flex-col h-[400px] cursor-pointer group`}
              >
                {/* Visual Flair for Center Card */}
                {isCenter && (
                    <>
                      <div className="absolute top-0 right-0 w-40 h-40 bg-accent opacity-15 blur-[60px] transition-opacity duration-500 group-hover:opacity-30 pointer-events-none" />
                      <div className="absolute top-0 right-0 p-8 md:p-10 pointer-events-none z-10">
                          <Star size={24} className="text-accent fill-accent animate-pulse drop-shadow-[0_0_15px_rgba(244,63,94,0.6)]" />
                      </div>
                    </>
                )}

                <div className="mb-8 relative z-10 flex gap-2 w-full">
                  <span className={`text-[10px] md:text-xs font-black tracking-[0.2em] px-4 py-2 rounded-2xl uppercase shadow-lg ${isCenter ? 'bg-accent/20 text-accent border border-accent/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                    {story.genre}
                  </span>
                </div>

                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 italic leading-tight relative z-10 transition-colors duration-300 ${isCenter ? 'text-white group-hover:text-accent' : 'text-white/60'}`}>
                  {story.title}
                </h3>

                <p className={`text-sm leading-relaxed flex-1 line-clamp-3 relative z-10 font-medium ${isCenter ? 'text-white/40' : 'text-white/20'}`}>
                  {story.excerpt}...
                </p>

                <div className={`mt-auto pt-6 border-t ${isCenter ? 'border-white/10' : 'border-white/5'} flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] transition-colors relative z-10 w-full`}>
                  <Link 
                    href={`/blog/${story.slug}`}
                    className={`flex items-center gap-3 w-full group/link ${isCenter ? 'text-white group-hover:text-accent' : 'text-white/40 hover:text-white'}`}
                  >
                    <span className="shrink-0 group-hover/link:underline">READ STORY</span>
                    <div className={`h-[1px] flex-1 transition-colors ${isCenter ? 'bg-white/10 group-hover/link:bg-accent/40' : 'bg-white/5 group-hover/link:bg-white/40'}`} />
                    <ArrowRight size={16} className={`shrink-0 transition-transform ${isCenter ? 'group-hover/link:translate-x-2' : ''}`} />
                  </Link>
                </div>

                {/* Glassmorphism gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Navigation Controls */}
        {stories.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-0 md:-left-8 z-30 p-4 rounded-full border border-white/10 glass-card text-white/40 hover:text-white hover:border-accent/40 transition-all active:scale-[0.85] shadow-xl"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 md:-right-8 z-30 p-4 rounded-full border border-white/10 glass-card text-white/40 hover:text-white hover:border-accent/40 transition-all active:scale-[0.85] shadow-xl"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-3 mt-12 pb-8">
          {stories.map((_, i) => (
              <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-10 bg-accent shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'w-3 bg-white/20 hover:bg-white/40'}`}
              />
          ))}
      </div>
    </div>
  )
}

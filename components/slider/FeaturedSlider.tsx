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
    <section className="w-full py-16 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8 text-center">
            <div className="flex items-center gap-2 mb-2">
                <div className="h-[1px] w-8 bg-accent/40" />
                <span className="text-accent text-[10px] font-black tracking-[0.3em] uppercase italic">
                    FEATURED NARRATIVES
                </span>
                <div className="h-[1px] w-8 bg-accent/40" />
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-white/90">
                TOP STORIES BY OUR <span className="text-accent">MODEL</span>
            </h2>
        </div>

        <div className="relative flex items-center justify-center gap-4 md:gap-8 min-h-[380px] mt-16">
          <AnimatePresence mode="popLayout">
            {visibleStories.map((story, i) => {
              if (!story) return <div key={`empty-${i}`} className="hidden md:block w-full max-w-xs" />
              
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
                    filter: isCenter ? 'blur(0px)' : 'blur(2px)'
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative w-full max-w-xs rounded-sm overflow-hidden border ${isCenter ? 'border-accent/30 shadow-[0_0_50px_rgba(255,255,255,0.05)] bg-[#0A0A0A]' : 'border-white/5 bg-white/[0.02]'} p-6 md:p-8 flex flex-col h-[280px] md:h-[320px] cursor-pointer group`}
                >
                  {isCenter && (
                      <div className="absolute top-0 right-0 p-6">
                          <Star size={24} className="text-accent fill-accent animate-pulse" />
                      </div>
                  )}

                  <div className="mb-4">
                    <span className={`text-[10px] font-black tracking-[0.2em] px-3 py-1 rounded-full uppercase ${isCenter ? 'bg-accent/10 text-accent border border-accent/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                      {story.genre}
                    </span>
                  </div>

                  <h3 className={`text-2xl md:text-3xl font-black tracking-tighter mb-4 italic leading-tight ${isCenter ? 'text-white' : 'text-white/60'}`}>
                    {story.title}
                  </h3>

                  <p className={`text-xs md:text-sm leading-relaxed mb-6 flex-1 line-clamp-3 ${isCenter ? 'text-white/60' : 'text-white/20'}`}>
                    {story.excerpt}...
                  </p>

                  <Link 
                    href={`/blog/${story.slug}`}
                    className={`mt-auto flex items-center gap-2 text-sm font-black tracking-tight group-hover:gap-4 transition-all duration-300 ${isCenter ? 'text-accent' : 'text-white/40 group-hover:text-white'}`}
                  >
                    READ STORY <ArrowRight size={18} />
                  </Link>

                  {/* Glassmorphism overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Navigation Controls */}
          {stories.length > 1 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-4 z-30 p-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl text-white/40 hover:text-white hover:border-accent/40 transition-all active:scale-[0.85]"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 z-30 p-4 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl text-white/40 hover:text-white hover:border-accent/40 transition-all active:scale-[0.85]"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-12">
            {stories.map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-white/10'}`}
                />
            ))}
        </div>
      </div>
    </section>
  )
}

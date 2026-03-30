import React from "react";
import MainStudio from "@/components/MainStudio";
import { FeaturedSlider } from "@/components/slider/FeaturedSlider";

async function getFeaturedStories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featured`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const featuredStories = await getFeaturedStories();

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden bg-[#050505]">
      {/* Background Studio Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 bg-radial-at-tr from-accent-glow to-transparent opacity-20" />
      
      {/* Main Server Header (for SEO) */}
      <div className="flex flex-col items-center text-center space-y-4 animate-fade-in py-12 px-6 z-10 w-full">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent opacity-90 leading-tight uppercase italic">
          AI STORY <span className="text-accent underline decoration-accent-glow underline-offset-8">STUDIO</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/50 font-medium max-w-2xl mx-auto tracking-wide text-center uppercase italic opacity-60">
          Transform your wildest prompts into immersive narrative experiences.
        </p>
      </div>

      {/* Interactive UI Studio */}
      <div className="w-full flex justify-center mb-20">
        <MainStudio />
      </div>
      
      {/* Featured Slider Integration */}
      {featuredStories && featuredStories.length > 0 && (
        <FeaturedSlider stories={featuredStories} />
      )}

      {/* Premium Shimmer Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[1px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[1px] pointer-events-none" />
    </main>
  );
}

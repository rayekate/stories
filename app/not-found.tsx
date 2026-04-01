import Link from "next/link";
import { Sparkles, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="text-center space-y-12 max-w-2xl relative z-10">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass border-accent/20 text-[10px] font-black uppercase tracking-[0.5em] text-accent animate-bounce">
          <Sparkles size={12} />
          Timeline Disruption
        </div>

        <div className="space-y-6">
          <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase italic leading-none text-white/10 select-none">
            404
          </h1>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-tight text-white -mt-12 md:-mt-20">
            STORY <span className="text-accent">NOT FOUND</span>
          </h2>
          <p className="text-white/30 text-sm md:text-base font-medium tracking-widest uppercase italic leading-relaxed max-w-lg mx-auto">
            The narrative path you are seeking has drifted into the void. 
            <br />
            <span className="text-white/60">Let's rewrite the beginning.</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link
            href="/"
            className="group relative flex items-center gap-4 bg-accent text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-[0_20px_50px_-10px_rgba(244,63,94,0.5)] transition-all hover:scale-105 active:scale-95 overflow-hidden"
          >
            <Home size={16} />
            Back to Studio
          </Link>
          
          <Link
            href="/blog"
            className="flex items-center gap-4 px-10 py-5 rounded-2xl glass border-white/10 hover:bg-white/5 transition-all text-xs font-black uppercase tracking-[0.3em] text-white/60 hover:text-white"
          >
            <ArrowLeft size={16} />
            Explore Blog
          </Link>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5 -z-20 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100px_100px]" />
    </main>
  );
}

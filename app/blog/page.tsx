import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import BlogModel from "@/lib/models/Blog";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";
import BlogClient from "@/components/blog/BlogClient";

export const metadata: Metadata = {
  title: "Blog | AI Story Studio",
  description:
    "Explore AI-crafted narratives, writing guides, and the latest from the AI Story Studio universe.",
  alternates: {
    canonical: "https://naughtytales.xyz/blog",
  },
};

async function getPublishedBlogs() {
  try {
    await connectDB();
    const blogs = await BlogModel.find({ published: true })
      .select("title slug genre excerpt createdAt")
      .sort({ createdAt: -1 })
      .lean();
    
    // Serialize MongoDB objects for Client Component
    return JSON.parse(JSON.stringify(blogs));
  } catch {
    return [];
  }
}

export default async function BlogListPage() {
  const blogs = await getPublishedBlogs();
  const genres = Array.from(new Set(blogs.map((b: any) => b.genre).filter(Boolean))) as string[];

  return (
    <main className="min-h-screen bg-[#050505] pt-36 pb-24">
      {/* ── Hero Header ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="space-y-5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-white/30">
            <BookOpen size={10} />
            The Archive
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none text-white">
            Stories &{" "}
            <span className="text-accent underline decoration-accent/20 underline-offset-8">
              Insights
            </span>
          </h1>
          <p className="text-white/30 text-sm font-medium leading-relaxed max-w-lg uppercase tracking-wider italic">
            AI-crafted narratives, writing deep-dives, and studio updates —
            every post a world of its own.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        {blogs.length === 0 ? (
          <div className="text-center py-32 space-y-4">
            <p className="text-white/20 text-sm font-medium uppercase tracking-widest">
              No stories published yet.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 bg-accent text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-transform"
            >
              Back to Studio
            </Link>
          </div>
        ) : (
          <BlogClient initialBlogs={blogs} genres={genres} />
        )}
      </div>
    </main>
  );
}

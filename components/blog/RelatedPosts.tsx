import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

interface RelatedPostsProps {
  currentSlug: string;
  genre: string;
}

async function getRelatedPosts(currentSlug: string, genre: string) {
  await connectDB();
  return await Blog.find({
    published: true,
    slug: { $ne: currentSlug },
    genre: genre,
  })
    .select("title slug genre excerpt createdAt")
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
}

export default async function RelatedPosts({
  currentSlug,
  genre,
}: RelatedPostsProps) {
  const posts: any[] = await getRelatedPosts(currentSlug, genre);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t border-white/10">
      {/* Heading */}
      <div className="mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-white/30">
          <div className="w-1 h-1 rounded-full bg-accent" />
          More From {genre}
        </div>
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
          Related{" "}
          <span className="text-white/20">Narratives</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card group rounded-[20px] p-6 flex flex-col gap-4 hover:border-accent/20 transition-all duration-500"
          >
            {/* Genre + Date */}
            <div className="flex items-center justify-between">
              <span className="bg-accent/10 border border-accent/20 text-accent text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest uppercase">
                {post.genre}
              </span>
              <time className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </time>
            </div>

            {/* Title */}
            <h3 className="text-lg font-black tracking-tighter leading-snug italic group-hover:text-accent transition-colors line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-white/40 text-xs leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>
            )}

            {/* CTA Arrow */}
            <div className="flex items-center gap-1 text-accent/50 group-hover:text-accent transition-colors text-[10px] font-black uppercase tracking-widest">
              Read Story
              <ArrowUpRight
                size={12}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

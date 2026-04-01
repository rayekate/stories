import { connectDB } from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ReadingProgress from '@/components/blog/ReadingProgress'
import RelatedPosts from '@/components/blog/RelatedPosts'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

type Props = {
  params: Promise<{ slug: string }>
}

async function getBlog(slug: string) {
  await connectDB()
  return await Blog.findOne({ slug, published: true }).lean()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlog(slug)
  
  if (!blog) return { title: 'Not Found' }

  const title = (blog.metaTitle || blog.title) + " | AI Story Studio Blog";
  const description = blog.metaDescription || "Read immersive stories at AI Story Studio.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://naughtytales.xyz/blog/${blog.slug}`,
    },
    alternates: {
      canonical: `https://naughtytales.xyz/blog/${blog.slug}`,
    },
  }
}

export async function generateStaticParams() {
    await connectDB()
    const blogs = await Blog.find({ published: true }).select('slug').lean()
    return blogs.map((blog) => ({
      slug: blog.slug,
    }))
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params
  const blog: any = await getBlog(slug)

  if (!blog) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.metaDescription,
    "datePublished": new Date(blog.createdAt).toISOString(),
    "dateModified": new Date(blog.updatedAt).toISOString(),
    "author": { "@type": "Organization", "name": "NaughtyTales" }
  }

  return (
    <article className="min-h-screen bg-[#050505] text-white pt-28">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Live reading progress bar */}
      <ReadingProgress />

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-fade-in">

        {/* ── Breadcrumb nav ─────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-white/40 truncate max-w-[200px]">{blog.title}</span>
        </nav>

        {/* ── Article header ─────────────────────────── */}
        <header className="mb-12 space-y-6">
          <div className="flex items-center gap-3">
             <span className="bg-accent/10 border border-accent/20 text-accent text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">
                {blog.genre}
             </span>
             <time className="text-[10px] font-bold text-white/30 uppercase tracking-widest">
               {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
             </time>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight italic">
            {blog.title}
          </h1>

          <div className="w-20 h-1 bg-accent rounded-full" />
        </header>

        {/* ── Article body ───────────────────────────── */}
        <section 
          className="prose prose-invert max-w-none prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter prose-p:text-white/70 prose-p:leading-relaxed prose-a:text-accent prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />

        {/* ── Related posts ──────────────────────────── */}
        <RelatedPosts currentSlug={slug} genre={blog.genre} />

        {/* ── Article footer CTA ─────────────────────── */}
        <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            All Stories
          </Link>

          <div className="flex flex-col items-center sm:items-end text-center sm:text-right gap-3">
            <p className="text-white/20 text-xs font-medium max-w-xs">
              Ready to generate your own immersive narrative?
            </p>
            <Link 
                href="/#studio"
                className="bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-accent/20 transition-all active:scale-[0.95] hover:scale-105"
            >
                Generate Your Story
            </Link>
          </div>
        </footer>
      </main>
    </article>
  )
}

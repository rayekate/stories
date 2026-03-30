import { connectDB } from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

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

  return {
    title: blog.metaTitle,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
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
    <article className="min-h-screen bg-[#050505] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-white/40 hover:text-accent transition-all font-bold text-sm tracking-tight"
          >
            <ChevronLeft size={18} />
            BACK TO HUB
          </Link>
          
          <div className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase italic">
            NaughtyTales <span className="text-accent/40">Studio</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
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

        <section 
          className="prose prose-invert max-w-none prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter prose-p:text-white/70 prose-p:leading-relaxed prose-a:text-accent prose-blockquote:border-accent prose-blockquote:bg-white/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />

        <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center text-center">
            <p className="text-white/20 text-xs font-medium max-w-sm">
                You've just experienced a narrative from NaughtyTales. 
                Ready to generate your own?
            </p>
            <Link 
                href="/"
                className="mt-6 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-2xl text-sm font-black shadow-lg shadow-accent/20 transition-all active:scale-[0.95]"
            >
                GENERATE YOUR STORY
            </Link>
        </footer>
      </main>
    </article>
  )
}

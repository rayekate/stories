'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  FilePlus, LayoutGrid, Star, Trash2, Edit3, 
  LogOut, Plus, ChevronRight, Eye, Globe 
} from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'featured'>('all')
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/blogs')
      if (res.ok) {
        const data = await res.json()
        setBlogs(data)
      } else {
        router.push('/content')
      }
    } catch (err) {
      console.error('Error fetching blogs:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
        if (res.ok) {
          setBlogs(blogs.filter((b) => b._id !== id))
        }
      } catch (err) {
        console.error('Error deleting blog:', err)
      }
    }
  }

  const handleLogout = async () => {
    await fetch('/api/content/logout', { method: 'POST' })
    router.push('/content')
  }

  const filteredBlogs = activeTab === 'all' 
    ? blogs 
    : blogs.filter((b) => b.featuredOnWebsite).sort((a, b) => a.featuredOrder - b.featuredOrder)

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-24 z-30">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-black tracking-tighter italic uppercase">
              STUDIO <span className="text-accent underline decoration-accent-glow underline-offset-4">DASHBOARD</span>
            </h1>
            
            <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'all' ? 'bg-accent text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                <LayoutGrid size={16} />
                BLOG POSTS
              </button>
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'featured' ? 'bg-accent text-white shadow-lg' : 'text-white/40 hover:text-white'
                }`}
              >
                <Star size={16} />
                FEATURED
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/content/dashboard/new"
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-accent/20 transition-all active:scale-[0.98]"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">CREATE NEW STORY</span>
              <span className="sm:hidden">NEW</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 md:px-12 py-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-2 border-white/10 border-t-accent rounded-full animate-spin" />
            <p className="text-white/30 font-medium">Loading your content...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center bg-[#0D0D0D] border-2 border-dashed border-white/20 rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto mt-10">
            <FilePlus size={48} className="text-white/10 mb-4" />
            <h3 className="text-xl font-bold text-white/60 mb-2">No {activeTab === 'featured' ? 'featured' : ''} stories found</h3>
            <p className="text-white/30 max-w-sm mb-6">Start by creating your first narrative experiences for the world to read.</p>
            <Link 
              href="/content/dashboard/new"
              className="text-accent font-bold flex items-center gap-2 hover:underline"
            >
              Create your first post <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog._id}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 hover:border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
                      {blog.genre}
                    </span>
                    {blog.featuredOnWebsite && (
                      <span className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> FEATURED #{blog.featuredOrder}
                      </span>
                    )}
                    {!blog.published && (
                      <span className="bg-white/10 border border-white/20 text-white/40 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
                        DRAFT
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors truncate">
                    {blog.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/30">
                    <span className="flex items-center gap-1 uppercase tracking-tighter font-medium">
                      Modified {new Date(blog.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link 
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                    title="Preview"
                  >
                    <Globe size={18} />
                  </Link>
                  <Link 
                    href={`/content/dashboard/edit/${blog._id}`}
                    className="p-3 bg-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
                    title="Edit"
                  >
                    <Edit3 size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog._id, blog.title)}
                    className="p-3 bg-white/5 rounded-xl text-red-500/40 hover:text-red-500 hover:bg-red-500/10 transition-all border border-white/5 shadow-inner"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { 
  ChevronLeft, Save, Globe, Info, 
  Layout, Search, Type, Feather,
  CheckCircle2, AlertCircle, Eye, Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface BlogFormProps {
  initialData?: any
  isEdit?: boolean
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    slug: initialData?.slug || '',
    genre: initialData?.genre || 'SCI-FI',
    content: initialData?.content || '',
    featuredOnWebsite: initialData?.featuredOnWebsite || false,
    featuredOrder: initialData?.featuredOrder || 0,
    published: initialData?.published ?? true,
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const [isZenMode, setIsZenMode] = useState(false)
  const router = useRouter()

  const genres = ['SCI-FI', 'FANTASY', 'MYSTERY', 'HORROR', 'ROMANCE', 'ADVENTURE']

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    setFormData({ ...formData, title, slug })
  }

  useEffect(() => {
    if (formData.content) {
      const words = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length
      setReadingTime(Math.ceil(words / 200))
    }
  }, [formData.content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const url = isEdit ? `/api/blogs/${initialData._id}` : '/api/blogs'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSuccess(true)
        setTimeout(() => router.push('/content/dashboard'), 1500)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save blog')
      }
    } catch (err) {
      setError('An error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-20 flex flex-col items-center w-full">
      {/* Cinematic Header */}
      <header className="border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-2xl sticky top-24 z-30 w-full flex justify-center">
        <div className="w-full max-w-7xl px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/content/dashboard"
              className="p-2.5 border border-white/5 rounded-xl hover:bg-white/5 text-white/40 hover:text-accent transition-all group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tighter uppercase italic leading-tight">
                {isEdit ? 'Refining' : 'Crafting'} <span className="text-accent underline decoration-accent/20 underline-offset-4">Story</span>
              </h1>
              <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                {readingTime} MIN READ • {formData.content.length} CHARS
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                showPreview ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-white/5 text-white/40 border-white/5 hover:text-white'
              }`}
            >
              <Eye size={14} />
              {showPreview ? 'EDITOR' : 'PREVIEW'}
            </button>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-accent hover:bg-accent-hover text-white px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isEdit ? 'COMMIT CHANGES' : 'UNLEASH STORY'}
            </button>
          </div>
        </div>
      </header>
      <main className="w-full max-w-7xl px-8 py-10">
        <div className={`grid gap-12 transition-all duration-500 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
          {/* Left Side: Editor Form */}
          <div className="space-y-12">
            <div className="space-y-10">
              {error && (
                <div className="p-5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center gap-4 animate-fade-in">
                  <AlertCircle size={20} />
                  <p className="text-[10px] font-black uppercase tracking-wider">{error}</p>
                </div>
              )}
              
              {success && (
                <div className="p-5 bg-green-500/10 border border-green-500/20 text-green-500 rounded-2xl flex items-center gap-4 animate-fade-in shadow-lg shadow-green-500/10">
                  <CheckCircle2 size={20} />
                  <p className="text-[10px] font-black uppercase tracking-wider">Continuum Synchronized. Redirecting...</p>
                </div>
              )}

              {/* Story Architecture Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-accent tracking-[0.4em] text-[9px] font-black uppercase mb-2">
                  <Layout size={14} />
                  Archival Structure
                </div>
                
                <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                  <div className="group relative">
                    <input
                      type="text"
                      placeholder="STORY NOMENCLATURE"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-3xl font-black italic tracking-tighter text-white placeholder:text-white/10 outline-none transition-all focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 group hover:border-accent/20 transition-all cursor-pointer">
                      <label className="text-[9px] font-black text-white/20 tracking-[0.3em] flex items-center gap-2 uppercase">
                        <Feather size={12} className="text-accent" /> Narrative Genre
                      </label>
                      <select
                        value={formData.genre}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        className="bg-transparent text-[11px] font-black text-white outline-none cursor-pointer uppercase tracking-widest hover:text-accent transition-colors"
                      >
                        {genres.map((g) => (
                          <option key={g} value={g} className="bg-[#0D0D0D] p-4 text-xs">
                            {g}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 group hover:border-accent/20 transition-all">
                      <label className="text-[9px] font-black text-white/20 tracking-[0.3em] flex items-center gap-2 uppercase">
                        <Globe size={12} className="text-accent" /> Neural Link
                      </label>
                      <div className="flex items-center gap-1 text-[11px] text-white/40 font-black truncate">
                        <span>/BLOG/</span>
                        <input
                          type="text"
                          placeholder="SLUG-ID"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="bg-transparent text-accent font-black outline-none flex-1 uppercase tracking-widest"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Manuscript Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-accent tracking-[0.4em] text-[9px] font-black uppercase mb-2">
                  <Type size={14} />
                  Main Manuscript
                </div>
                <div className="bg-white/5 border border-white/5 rounded-[40px] p-2 shadow-2xl backdrop-blur-xl min-h-[500px]">
                  <TiptapEditor 
                    content={formData.content} 
                    onChange={(html) => setFormData({ ...formData, content: html })} 
                  />
                </div>
              </div>

              {/* Metadata Stratum */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-accent tracking-[0.4em] text-[9px] font-black uppercase mb-2">
                  <Search size={14} />
                  Discovery Manifest
                </div>
                <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 space-y-8 shadow-2xl backdrop-blur-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">SEO Manifest Designation</label>
                      <span className={`text-[9px] font-black tracking-widest ${formData.metaTitle.length > 60 ? 'text-accent' : 'text-white/10'}`}>
                        {formData.metaTitle.length} / 60
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.metaTitle}
                      onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[11px] font-black uppercase tracking-widest text-white placeholder:text-white/10 outline-none transition-all focus:border-accent/40"
                      placeholder="Title for search reality..."
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">SEO Propagation Abstract</label>
                      <span className={`text-[9px] font-black tracking-widest ${formData.metaDescription.length > 160 ? 'text-accent' : 'text-white/10'}`}>
                        {formData.metaDescription.length} / 160
                      </span>
                    </div>
                    <textarea
                      value={formData.metaDescription}
                      onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-[11px] font-black tracking-widest text-white/60 placeholder:text-white/10 outline-none transition-all focus:border-accent/40 min-h-[120px] leading-relaxed"
                      placeholder="Condensing narrative frequency..."
                    />
                  </div>
                </div>
              </div>

              {/* Sync Configuration */}
              <div className="space-y-6 pb-20">
                <div className="flex items-center gap-3 text-accent tracking-[0.4em] text-[10px] font-black uppercase mb-2">
                  <Sparkles size={14} />
                  Matrix Sync Settings
                </div>
                <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex flex-wrap gap-12 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-5">
                    <div 
                      className={`w-14 h-7 rounded-full relative cursor-pointer transition-all duration-300 ${formData.featuredOnWebsite ? 'bg-accent shadow-[0_0_20px_-5px_rgba(244,63,94,0.6)]' : 'bg-white/10'}`}
                      onClick={() => setFormData({ ...formData, featuredOnWebsite: !formData.featuredOnWebsite })}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${formData.featuredOnWebsite ? 'left-8 shadow-inner' : 'left-1'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">Portal Highlight</span>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Priority Feature</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div 
                      className={`w-14 h-7 rounded-full relative cursor-pointer transition-all duration-300 ${formData.published ? 'bg-accent shadow-[0_0_20px_-5px_rgba(244,63,94,0.6)]' : 'bg-white/10'}`}
                      onClick={() => setFormData({ ...formData, published: !formData.published })}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${formData.published ? 'left-8 shadow-inner' : 'left-1'}`} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">Reality Propagation</span>
                      <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">Live Status</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Reality Reflection Preview */}
          {showPreview && (
            <div className="sticky top-28 hidden lg:block h-[calc(100vh-140px)] animate-fade-in overflow-hidden">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 text-accent tracking-[0.4em] text-[9px] font-black uppercase mb-4 pl-4 font-black">
                  <Globe size={14} />
                  Reality Reflection
                </div>
                <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] flex-1 overflow-y-auto shadow-3xl p-12 custom-scrollbar">
                  <div className="max-w-2xl mx-auto space-y-10">
                    <div className="space-y-6">
                      <span className="text-accent text-[9px] font-black uppercase tracking-[0.5em] inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full">
                        {formData.genre}
                      </span>
                      <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic text-white leading-none">
                        {formData.title || 'Undeclared Narrative'}
                      </h1>
                      <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                        <span>{readingTime} MIN READ</span>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div 
                      className="prose prose-invert prose-p:text-white/60 prose-p:leading-relaxed prose-p:text-sm prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter max-w-none"
                      dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-white/10 italic">Awaiting manuscript input sequence...</p>' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}

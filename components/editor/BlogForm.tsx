'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { 
  ChevronLeft, Save, Globe, 
  Layout, Search, Type, Feather,
  CheckCircle2, AlertCircle, Eye, Sparkles
} from 'lucide-react'
import Link from 'next/link'

interface BlogFormProps {
  initialData?: {
    _id?: string
    title?: string
    metaTitle?: string
    metaDescription?: string
    slug?: string
    genre?: string
    content?: string
    featuredOnWebsite?: boolean
    featuredOrder?: number
    published?: boolean
  }
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
  const [zenMode, setZenMode] = useState(false)
  const [readingTime, setReadingTime] = useState(0)
  const router = useRouter()

  const genres = ['SCI-FI', 'FANTASY', 'MYSTERY', 'HORROR', 'ROMANCE', 'ADVENTURE']

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    setFormData({ ...formData, title, slug })
  }

  const GENRE_THEMES: Record<string, string> = {
    'SCI-FI': '0, 180, 255', // Cyber Blue
    'FANTASY': '160, 100, 255', // Arcane Purple
    'MYSTERY': '100, 120, 140', // Noir Grey
    'HORROR': '255, 50, 50', // Blood Red
    'ROMANCE': '244, 63, 94', // Velvet Rose (Accent)
    'ADVENTURE': '50, 200, 120', // Jungle Green
  }

  const activeTheme = GENRE_THEMES[formData.genre] || '244, 63, 94'

  useEffect(() => {
    if (formData.content) {
      const words = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
      setReadingTime(Math.ceil(words / 200))
    }
  }, [formData.content])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const url = isEdit ? `/api/blogs/${initialData?._id}` : '/api/blogs'
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
    } catch (_err) {
      setError('An error occurred while saving')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div 
      className={`min-h-screen bg-[#050505] text-white pb-32 flex flex-col items-center w-full transition-all duration-700 ${zenMode ? 'bg-[#020202]' : ''}`}
      style={{ '--theme-rgb': activeTheme } as React.CSSProperties}
    >
      {/* Cinematic Header */}
      <header className={`border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-2xl sticky top-16 md:top-24 z-30 w-full flex justify-center transition-all duration-500 ${zenMode ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100'}`}>
        <div className="w-full max-w-7xl px-4 md:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/content/dashboard"
              className="p-2.5 border border-white/5 rounded-xl hover:bg-white/5 text-white/40 hover:text-[rgb(var(--theme-rgb))] transition-all group"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <div className="flex flex-col">
              <h1 className="text-sm md:text-lg font-black tracking-tighter uppercase italic leading-tight">
                <span className="hidden sm:inline">{isEdit ? 'Refining' : 'Crafting'} </span><span className="text-[rgb(var(--theme-rgb))] underline decoration-[rgb(var(--theme-rgb))]/20 underline-offset-4 transition-colors duration-500">Story</span>
              </h1>
              <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                {formData.genre} PROTOCOL
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setZenMode(true)}
              className="p-2.5 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white transition-all group"
              title="Zen Mode"
            >
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`px-3 md:px-4 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border ${
                showPreview ? 'bg-[rgb(var(--theme-rgb))] text-white border-[rgb(var(--theme-rgb))] shadow-lg shadow-[rgb(var(--theme-rgb))]/20' : 'bg-white/5 text-white/40 border-white/5 hover:text-white'
              }`}
            >
              <Eye size={14} />
              <span className="hidden sm:inline">{showPreview ? 'EDITOR' : 'PREVIEW'}</span>
            </button>

            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[rgb(var(--theme-rgb))] hover:opacity-90 text-white px-5 md:px-8 py-2 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 shadow-xl shadow-[rgb(var(--theme-rgb))]/20 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              <span className="hidden sm:inline">{isEdit ? 'COMMIT' : 'UNLEASH'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating HUD / Zen Mode Insights */}
      <div className={`fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[90%] md:w-auto ${zenMode || showPreview ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <div className="glass-card bg-black/60 backdrop-blur-3xl border-white/10 rounded-[24px] md:rounded-full px-6 md:px-8 py-3 md:py-4 flex items-center justify-between md:justify-start gap-4 md:gap-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-[rgb(var(--theme-rgb))]/20">
          <div className="flex flex-col items-center">
            <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Words</span>
            <span className="text-xs md:text-sm font-black text-white tracking-widest">{formData.content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}</span>
          </div>
          <div className="w-[1px] h-6 bg-white/10 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Time</span>
            <span className="text-xs md:text-sm font-black text-white tracking-widest">{readingTime}M</span>
          </div>
          <div className="w-[1px] h-6 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
             <div className="flex flex-col items-end">
                <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Status</span>
                <span className="text-[8px] md:text-[9px] font-black text-[rgb(var(--theme-rgb))] uppercase tracking-widest animate-pulse">Synced</span>
             </div>
             {zenMode && (
               <button
                 onClick={() => setZenMode(false)}
                 className="p-1.5 md:p-2 bg-white/5 border border-white/10 rounded-full text-white/40 hover:text-white transition-all ml-2 md:ml-4"
                 title="Exit Zen Mode"
               >
                 <Sparkles size={12} className="animate-spin-slow" />
               </button>
              )}
          </div>
        </div>
      </div>

      {/* Legacy Zen Mode Exit Button (Hidden replaced by HUD button) */}
      {zenMode && !showPreview && false && (
        <button
          onClick={() => setZenMode(false)}
          className="fixed top-12 right-12 z-50 p-4 bg-white/5 border border-white/10 rounded-2xl text-white/20 hover:text-accent hover:border-accent/40 transition-all group backdrop-blur-3xl animate-fade-in"
          title="Exit Zen Mode"
        >
          <Sparkles size={24} className="group-hover:rotate-180 transition-transform duration-700" />
        </button>
      )}

      <main className={`w-full max-w-7xl px-4 md:px-8 py-6 md:py-10 transition-all duration-700 ${zenMode ? 'max-w-4xl' : ''}`}>
        <div className={`grid gap-12 transition-all duration-500 ${showPreview && !zenMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
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

              {/* Step 1: Metadata & Structure */}
              {!zenMode && (
                <div className="space-y-8 animate-fade-in">
                  <div className="flex items-center gap-3 text-[rgb(var(--theme-rgb))] tracking-[0.4em] text-[9px] font-black uppercase">
                    <Layout size={14} />
                    Core Architecture
                  </div>
                  
                  <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 space-y-6 backdrop-blur-xl">
                    <input
                      type="text"
                      placeholder="STORY NOMENCLATURE"
                      value={formData.title}
                      onChange={handleTitleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-3xl font-black italic tracking-tighter text-white placeholder:text-white/10 outline-none transition-all focus:border-[rgb(var(--theme-rgb))]/40"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
                        <label className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">Genre</label>
                        <select
                          value={formData.genre}
                          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                          className="bg-transparent text-[11px] font-black text-white outline-none uppercase tracking-widest"
                        >
                          {genres.map(g => <option key={g} value={g} className="bg-black">{g}</option>)}
                        </select>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2">
                        <label className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">Slug</label>
                        <input
                          type="text"
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="bg-transparent text-[11px] font-black text-[rgb(var(--theme-rgb))] outline-none uppercase tracking-widest"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Editor */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 text-[rgb(var(--theme-rgb))] tracking-[0.4em] text-[9px] font-black uppercase">
                  <Type size={14} />
                  Main Manuscript
                </div>
                <div className="bg-white/5 border border-white/5 rounded-[32px] p-2 min-h-[600px] backdrop-blur-xl">
                  <TiptapEditor 
                    content={formData.content} 
                    onChange={(html) => setFormData({ ...formData, content: html })} 
                    themeRgb={activeTheme}
                  />
                </div>
              </div>

              {/* Step 3: Advanced Options */}
              {!zenMode && (
                <>
                  <div className="space-y-8 animate-fade-in">
                      <div className="flex items-center gap-3 text-[rgb(var(--theme-rgb))] tracking-[0.4em] text-[9px] font-black uppercase">
                        <Search size={14} />
                        Discovery Manifest
                      </div>
                    <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 space-y-6 backdrop-blur-xl">
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">SEO Title</label>
                        <input
                          type="text"
                          value={formData.metaTitle}
                          onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-black text-white outline-none focus:border-[rgb(var(--theme-rgb))]/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-white/20 tracking-[0.3em] uppercase">SEO Description</label>
                        <textarea
                          value={formData.metaDescription}
                          onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-[11px] font-black text-white/60 outline-none focus:border-[rgb(var(--theme-rgb))]/40 min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 animate-fade-in pb-20">
                    <div className="flex items-center gap-3 text-[rgb(var(--theme-rgb))] tracking-[0.4em] text-[9px] font-black uppercase">
                      <Sparkles size={14} />
                      Sync Controls
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-[32px] p-8 flex gap-10 backdrop-blur-xl">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setFormData({ ...formData, published: !formData.published })}
                          className={`w-12 h-6 rounded-full relative transition-all ${formData.published ? 'bg-[rgb(var(--theme-rgb))]' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.published ? 'left-7' : 'left-1'}`} />
                        </button>
                        <span className="text-[10px] font-black uppercase tracking-widest">Published</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setFormData({ ...formData, featuredOnWebsite: !formData.featuredOnWebsite })}
                          className={`w-12 h-6 rounded-full relative transition-all ${formData.featuredOnWebsite ? 'bg-[rgb(var(--theme-rgb))]' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.featuredOnWebsite ? 'left-7' : 'left-1'}`} />
                        </button>
                        <span className="text-[10px] font-black uppercase tracking-widest">Featured</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Preview */}
          {showPreview && !zenMode && (
            <div className="sticky top-40 hidden lg:block h-[calc(100vh-200px)] animate-fade-in overflow-hidden">
              <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] h-full overflow-y-auto p-12 custom-scrollbar">
                <div className="max-w-2xl mx-auto space-y-8">
                  <span className="text-[rgb(var(--theme-rgb))] text-[9px] font-black uppercase tracking-[0.5em] px-3 py-1 bg-[rgb(var(--theme-rgb))]/10 border border-[rgb(var(--theme-rgb))]/20 rounded-full inline-block">
                    {formData.genre}
                  </span>
                  <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white leading-none">
                    {formData.title || 'Undeclared Narrative'}
                  </h1>
                  <div 
                    className="prose prose-invert max-w-none text-white/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-white/10">Awaiting input...</p>' }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

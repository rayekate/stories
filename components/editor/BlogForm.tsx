'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import TiptapEditor from '@/components/editor/TiptapEditor'
import { 
  ChevronLeft, Save, Globe, Info, 
  Layout, Search, Type, Feather,
  CheckCircle2, AlertCircle
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
  const router = useRouter()

  const genres = ['SCI-FI', 'FANTASY', 'MYSTERY', 'HORROR', 'ROMANCE', 'ADVENTURE']

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    setFormData({ ...formData, title, slug })
  }

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
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-20 w-full flex justify-center">
        <div className="w-full max-w-4xl px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/content/dashboard"
              className="p-2 border border-white/10 rounded-sm hover:bg-white/5 text-white/40 hover:text-accent transition-all"
            >
              <ChevronLeft size={20} />
            </Link>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
              {isEdit ? 'EDIT' : 'CREATE'} <span className="text-accent">STORY</span>
            </h1>
          </div>
          
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="bg-accent hover:bg-accent-hover text-white px-6 py-2 rounded-sm text-sm font-black flex items-center gap-2 shadow-lg shadow-accent/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {isEdit ? 'UPDATE CHANGES' : 'PUBLISH STORY'}
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl px-8 py-8">
        <form className="space-y-8 animate-fade-in w-full">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-sm flex items-center gap-3">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-sm flex items-center gap-3">
              <CheckCircle2 size={20} />
              <p className="text-sm font-medium">Story saved successfully! Redirecting...</p>
            </div>
          )}

          {/* Section: Main Content */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-white/40 mb-4 tracking-widest text-[10px] font-bold">
              <Type size={14} className="text-accent" />
              PRIMARY CONTENT
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Story Title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-6 text-2xl font-black text-white placeholder:text-white/20 outline-none transition-all focus:border-accent/40 focus:ring-1 focus:ring-accent/20"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/40 tracking-widest flex items-center gap-2">
                    <Layout size={12} className="text-accent" /> GENRE
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="bg-transparent text-white font-bold outline-none cursor-pointer hover:text-accent transition-colors"
                  >
                    {genres.map((g) => (
                      <option key={g} value={g} className="bg-[#0D0D0D] p-2 leading-8 h-[200px]">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-sm p-4 flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/40 tracking-widest flex items-center gap-2">
                    <Globe size={12} className="text-accent" /> PERMALINK
                  </label>
                  <div className="flex items-center gap-1 text-white/60 font-medium truncate">
                    <span>naughtytales.xyz/blog/</span>
                    <input
                      type="text"
                      placeholder="slug-url"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="bg-transparent text-accent font-bold outline-none flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Editor */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-white/40 tracking-widest text-[10px] font-bold">
              <Feather size={14} className="text-accent" />
              STORY NARRATIVE
            </div>
            <TiptapEditor 
              content={formData.content} 
              onChange={(html) => setFormData({ ...formData, content: html })} 
            />
          </section>

          {/* Section: SEO */}
          <section className="bg-white/5 border border-white/10 rounded-sm p-6 space-y-6">
            <div className="flex items-center gap-2 text-white/40 tracking-widest text-[10px] font-bold uppercase">
              <Search size={14} className="text-accent" />
              Search Engine Optimization
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-white/60">Meta Title</label>
                  <span className={`text-[10px] font-black ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-white/20'}`}>
                    {formData.metaTitle.length} / 60
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-accent/40"
                  placeholder="Catchy title for Google results..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-white/60">Meta Description</label>
                  <span className={`text-[10px] font-black ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-white/20'}`}>
                    {formData.metaDescription.length} / 160
                  </span>
                </div>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-accent/40 min-h-[100px]"
                  placeholder="A short summary of the story (max 160 chars)..."
                />
              </div>
            </div>
          </section>

          {/* Section: Visibility */}
          <section className="bg-white/5 border border-white/10 rounded-sm p-6 flex flex-wrap gap-12">
             <div className="flex items-center gap-4">
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${formData.featuredOnWebsite ? 'bg-accent shadow-lg shadow-accent/20' : 'bg-white/10'}`}
                onClick={() => setFormData({ ...formData, featuredOnWebsite: !formData.featuredOnWebsite })}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.featuredOnWebsite ? 'left-7' : 'left-1'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white/80">Featured in Slider</span>
                <span className="text-[10px] font-medium text-white/30">Display on homepage</span>
              </div>
              
              {formData.featuredOnWebsite && (
                <div className="ml-4 flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-3 py-1">
                  <span className="text-[10px] font-bold text-white/40">ORDER</span>
                  <input
                    type="number"
                    value={formData.featuredOrder}
                    onChange={(e) => setFormData({ ...formData, featuredOrder: parseInt(e.target.value) })}
                    className="bg-transparent text-accent font-black w-8 text-center outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div 
                className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${formData.published ? 'bg-accent shadow-lg shadow-accent/20' : 'bg-white/10'}`}
                onClick={() => setFormData({ ...formData, published: !formData.published })}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.published ? 'left-7' : 'left-1'}`} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white/80">Public Visibility</span>
                <span className="text-[10px] font-medium text-white/30">Allow everyone to read this</span>
              </div>
            </div>
          </section>
        </form>
      </main>
    </div>
  )
}

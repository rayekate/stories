'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User, LogIn } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/content/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.ok) {
        router.push('/content/dashboard')
      } else {
        setError(data.error || 'Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-40" />
      
      <div className="w-full max-w-md p-8 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 border border-accent/40 shadow-xl shadow-accent/10">
            <Lock className="text-accent w-8 h-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            CONTENT <span className="text-accent underline decoration-accent-glow underline-offset-4">STUDIO</span>
          </h1>
          <p className="text-white/40 mt-2 font-medium">Enter your credentials to manage stories</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center gap-4 w-full bg-[#111] border border-white/10 rounded-xl px-5 transition-all focus-within:border-accent/40 focus-within:ring-1 focus-within:ring-accent/20">
            <User className="text-white/30 shrink-0" size={20} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent py-4 text-white placeholder:text-white/20 outline-none"
              required
            />
          </div>

          <div className="flex items-center gap-4 w-full bg-[#111] border border-white/10 rounded-xl px-5 transition-all focus-within:border-accent/40 focus-within:ring-1 focus-within:ring-accent/20">
            <Lock className="text-white/30 shrink-0" size={20} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent py-4 text-white placeholder:text-white/20 outline-none"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm animate-shake">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-accent/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={20} />
                <span>ENTER STUDIO</span>
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-white/20 text-sm">
          &copy; {new Date().getFullYear()} NaughtyTales. Internal Access Only.
        </p>
      </div>
    </main>
  )
}

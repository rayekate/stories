'use client'

import React from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, 
  Quote, Code, Link as LinkIcon, Undo, Redo,
  Heading1, Heading2, Heading3
} from 'lucide-react'
import { motion } from 'framer-motion'

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
  themeRgb?: string
}

interface MenuButton {
  icon?: React.ReactNode
  action?: () => void
  active?: boolean
  separator?: boolean
}

const MenuBar = ({ editor, themeRgb }: { editor: Editor | null, themeRgb?: string }) => {
  if (!editor) return null
  
  const activeColor = themeRgb ? `rgb(${themeRgb})` : 'var(--accent)'

  const addLink = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const buttons: MenuButton[] = [
    { icon: <Heading1 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive('heading', { level: 1 }) },
    { icon: <Heading2 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
    { icon: <Heading3 size={18} />, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive('heading', { level: 3 }) },
    { separator: true },
    { icon: <Bold size={18} />, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
    { icon: <Italic size={18} />, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
    { icon: <Strikethrough size={18} />, action: () => editor.chain().focus().toggleStrike().run(), active: editor.isActive('strike') },
    { separator: true },
    { icon: <List size={18} />, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
    { icon: <ListOrdered size={18} />, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
    { icon: <Quote size={18} />, action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive('blockquote') },
    { icon: <Code size={18} />, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editor.isActive('codeBlock') },
    { separator: true },
    { icon: <LinkIcon size={18} />, action: addLink, active: editor.isActive('link') },
    { separator: true },
    { icon: <Undo size={18} />, action: () => editor.chain().focus().undo().run() },
    { icon: <Redo size={18} />, action: () => editor.chain().focus().redo().run() },
  ]

  const group1 = buttons.slice(0, 3)
  const group2 = buttons.slice(4, 7)
  const group3 = buttons.slice(8, 12)
  const group4 = [buttons[13]]
  const group5 = buttons.slice(15)

  const renderGroup = (btns: MenuButton[]) => (
    <div className="flex items-center gap-0.5 md:gap-1 px-2 border-r border-white/5 last:border-0">
      {btns.map((btn, i) => (
        <button
          key={i}
          onClick={(e) => { e.preventDefault(); btn.action?.() }}
          className={`p-2 rounded-lg transition-all duration-300 relative group/btn ${
            btn.active ? 'text-white' : 'text-white/30 hover:text-white/60 hover:bg-white/5'
          }`}
          style={btn.active ? { 
            color: activeColor,
            textShadow: `0 0 10px ${activeColor}88`
          } : {}}
        >
          {btn.icon}
          {btn.active && (
            <motion.div 
              layoutId="active-pill"
              className="absolute inset-0 bg-white/[0.03] rounded-lg border border-white/10"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-wrap items-center p-1.5 border-b border-white/5 bg-[#0A0A0A]/40 backdrop-blur-xl sticky top-0 z-10 justify-center md:justify-start">
      {renderGroup(group1)}
      {renderGroup(group2)}
      {renderGroup(group3)}
      {renderGroup(group4)}
      {renderGroup(group5)}
    </div>
  )
}

export default function TiptapEditor({ content, onChange, themeRgb }: TiptapEditorProps) {
  const activeColor = themeRgb ? `rgb(${themeRgb})` : 'var(--accent)'
  const activeGlow = themeRgb ? `rgba(${themeRgb}, 0.2)` : 'rgba(244, 63, 94, 0.2)'

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Start writing your story...' }),
      CharacterCount,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none p-6 md:p-16 min-h-[600px] outline-none font-medium text-white/80 leading-relaxed cinematic-prose selection:bg-white/10 scroll-mt-20',
      },
    },
  })

  return (
    <div 
      className="border border-white/5 rounded-[32px] overflow-hidden bg-[#080808]/60 backdrop-blur-3xl transition-all duration-700"
      style={{ 
        borderColor: `rgba(${themeRgb || '255,255,255'}, 0.05)`, 
        ['--active-theme-color' as string]: activeColor,
        ['--active-theme-glow' as string]: activeGlow
      } as React.CSSProperties}
    >
      <MenuBar editor={editor} themeRgb={themeRgb} />
      <div className="relative">
        <EditorContent editor={editor} />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none opacity-40" />
      </div>
      <div className="px-6 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-white/10 border-t border-white/5 flex justify-between items-center bg-white/[0.02]">
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--active-theme-color))]" style={{ backgroundColor: activeColor }} />
            {editor?.storage?.characterCount?.characters() || 0} Characters
          </span>
          <span className="opacity-40 hidden sm:inline">Editorial Grade Protocol</span>
        </div>
        <div className="flex items-center gap-3">
           <span className="w-2 h-2 rounded-full bg-green-500/40 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.2)]" />
           <span className="tracking-widest">Live Sync Alpha</span>
        </div>
      </div>
    </div>
  )
}

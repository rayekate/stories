'use client'

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

interface TiptapEditorProps {
  content: string
  onChange: (html: string) => void
  themeRgb?: string
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

  const buttons = [
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

  return (
    <div className="flex flex-wrap items-center gap-0.5 md:gap-1 p-1 md:p-2 border-b border-white/10 bg-white/5 sticky top-0 z-10 backdrop-blur-sm justify-center md:justify-start">
      {buttons.map((btn, i) => (
        btn.separator ? (
          <div key={i} className="w-[1px] h-4 bg-white/10 mx-1" />
        ) : (
          <button
            key={i}
            onClick={(e) => { e.preventDefault(); btn.action?.() }}
            className={`p-1.5 rounded transition-all duration-300 ${
              btn.active ? 'text-white shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'
            }`}
            style={btn.active ? { backgroundColor: activeColor, boxShadow: `0 0 15px ${activeColor}44` } : {}}
          >
            {btn.icon}
          </button>
        )
      ))}
    </div>
  )
}

export default function TiptapEditor({ content, onChange, themeRgb }: TiptapEditorProps) {
  const activeColor = themeRgb ? `rgb(${themeRgb})` : 'var(--accent)'

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
        class: 'prose prose-invert max-w-none p-4 md:p-8 min-h-[500px] outline-none font-medium text-white/80 leading-relaxed cinematic-prose',
      },
    },
  })

  return (
    <div 
      className="border border-white/10 rounded-sm overflow-hidden bg-[#0D0D0D] transition-all hover:border-white/20 focus-within:ring-1 transition-all duration-500"
      style={{ 
        borderColor: `rgb(${themeRgb || '255,255,255'}, 0.1)`, 
        ['--theme-color' as string]: activeColor 
      } as React.CSSProperties}
    >
      <MenuBar editor={editor} themeRgb={themeRgb} />
      <EditorContent editor={editor} />
      <div className="p-2 text-xs text-white/40 border-t border-white/5 flex justify-between bg-white/5">
        <span>{editor?.storage?.characterCount?.characters() || 0} characters</span>
        <span>HTML output active</span>
      </div>
    </div>
  )
}

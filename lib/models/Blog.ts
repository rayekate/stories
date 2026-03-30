import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  metaTitle: string
  metaDescription: string
  slug: string
  genre: string
  content: string         // HTML string from Tiptap
  excerpt: string         // First ~160 chars of plain text, auto-generated
  featuredOnWebsite: boolean
  featuredOrder: number   // for ordering in the slider (0 = not set)
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    featuredOnWebsite: { type: Boolean, default: false },
    featuredOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)

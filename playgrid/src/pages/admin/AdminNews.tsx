import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Newspaper, Pencil, Plus, Trash2, X } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import { createNews, deleteNews, getNews, updateNews } from '@/services/news'
import { buildStoragePath, uploadImage } from '@/services/storage'
import { sportsList } from '@/data/mockData'
import type { NewsArticle } from '@/types'
import { formatDate } from '@/utils/format'

const emptyForm: Omit<NewsArticle, 'id'> = {
  title: '',
  summary: '',
  content: '',
  category: 'Cricket',
  imageUrl: '',
  author: 'PLAYGRID Desk',
  publishedAt: new Date().toISOString().slice(0, 10),
  featured: false,
}

export default function AdminNews() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    getNews().then(setNews).catch(() => undefined).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setShowForm(true)
  }

  const openEdit = (n: NewsArticle) => {
    const { id, ...rest } = n
    setForm(rest)
    setEditingId(id)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return
    await deleteNews(id)
    load()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = form.imageUrl
      if (imageFile) imageUrl = await uploadImage(imageFile, buildStoragePath('news', imageFile.name))
      const payload = { ...form, imageUrl: imageUrl || form.imageUrl }
      if (editingId) await updateNews(editingId, payload)
      else await createNews(payload)
      setShowForm(false)
      load()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-10">
        <div className="container-px mx-auto max-w-7xl">
          <Link to="/admin" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
            <h1 className="section-title">Manage News</h1>
            <button onClick={openCreate} className="btn-primary px-5 py-2.5 text-sm">
              <Plus className="h-4 w-4" /> Add Article
            </button>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner size={28} /></div>
        ) : news.length === 0 ? (
          <EmptyState icon={Newspaper} title="No news articles yet" />
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-white/40">
                  <th className="px-5 py-3 font-medium">Title</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Published</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {news.map((n) => (
                  <tr key={n.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white line-clamp-1">{n.title}</td>
                    <td className="px-5 py-3 text-white/60">{n.category}</td>
                    <td className="px-5 py-3 text-white/60">{formatDate(n.publishedAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(n)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDelete(n.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-red-500/10 hover:text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-white/10 bg-surface-100 p-6 shadow-glow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Article' : 'Add Article'}</h3>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <Select
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as NewsArticle['category'] })}
              >
                {[...sportsList, 'General'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
              <Input label="Author" required value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
              <Input
                label="Published Date"
                type="date"
                required
                value={form.publishedAt.slice(0, 10)}
                onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
              />
              <Input label="Image URL (or upload below)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              <div>
                <label className="label flex items-center gap-1.5"><ImagePlus className="h-3.5 w-3.5" /> Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="input cursor-pointer text-xs file:mr-3 file:rounded-full file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface-950"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Summary</label>
                <textarea required rows={2} className="input resize-none" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Full Content (optional)</label>
                <textarea rows={5} className="input resize-none" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              </div>

              <div className="sm:col-span-2 mt-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? <Spinner size={18} /> : editingId ? 'Save Changes' : 'Publish Article'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Pencil, Plus, Trash2, UserCog, X } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import { createCoach, deleteCoach, getCoaches, updateCoach } from '@/services/coaches'
import { buildStoragePath, uploadImage } from '@/services/storage'
import { sportsList } from '@/data/mockData'
import type { Coach } from '@/types'

const emptyForm: Omit<Coach, 'id'> = {
  name: '',
  sport: 'Cricket',
  location: '',
  experienceYears: 1,
  achievements: [],
  bio: '',
  imageUrl: '',
  rating: 4.5,
}

export default function AdminCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [achievementsText, setAchievementsText] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    getCoaches().then(setCoaches).catch(() => undefined).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const openCreate = () => {
    setForm(emptyForm)
    setAchievementsText('')
    setEditingId(null)
    setImageFile(null)
    setShowForm(true)
  }

  const openEdit = (c: Coach) => {
    const { id, ...rest } = c
    setForm(rest)
    setAchievementsText(c.achievements.join(', '))
    setEditingId(id)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coach profile?')) return
    await deleteCoach(id)
    load()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = form.imageUrl
      if (imageFile) imageUrl = await uploadImage(imageFile, buildStoragePath('coaches', imageFile.name))
      const payload = {
        ...form,
        imageUrl: imageUrl || form.imageUrl,
        achievements: achievementsText.split(',').map((a) => a.trim()).filter(Boolean),
      }
      if (editingId) await updateCoach(editingId, payload)
      else await createCoach(payload)
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
            <h1 className="section-title">Manage Coaches</h1>
            <button onClick={openCreate} className="btn-primary px-5 py-2.5 text-sm">
              <Plus className="h-4 w-4" /> Add Coach
            </button>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner size={28} /></div>
        ) : coaches.length === 0 ? (
          <EmptyState icon={UserCog} title="No coach profiles yet" />
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-white/40">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Sport</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Experience</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white">{c.name}</td>
                    <td className="px-5 py-3 text-white/60">{c.sport}</td>
                    <td className="px-5 py-3 text-white/60">{c.location}</td>
                    <td className="px-5 py-3 text-white/60">{c.experienceYears} yrs</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(c)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleDelete(c.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-red-500/10 hover:text-red-400">
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
              <h3 className="text-lg font-bold text-white">{editingId ? 'Edit Coach' : 'Add Coach'}</h3>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Select
                label="Sport"
                value={form.sport}
                onChange={(e) => setForm({ ...form, sport: e.target.value as Coach['sport'] })}
              >
                {sportsList.map((s) => <option key={s} value={s}>{s}</option>)}
              </Select>
              <Input label="Location" required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
              <Input
                label="Experience (years)"
                type="number"
                required
                value={form.experienceYears}
                onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
              />
              <Input
                label="Rating (0-5)"
                type="number"
                step="0.1"
                min={0}
                max={5}
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              />
              <Input label="Image URL (or upload below)" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." />
              <div className="sm:col-span-2">
                <label className="label flex items-center gap-1.5"><ImagePlus className="h-3.5 w-3.5" /> Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="input cursor-pointer text-xs file:mr-3 file:rounded-full file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface-950"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Achievements (comma separated)</label>
                <input
                  className="input"
                  value={achievementsText}
                  onChange={(e) => setAchievementsText(e.target.value)}
                  placeholder="State champion, BCCI Level 2 certified"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Bio</label>
                <textarea required rows={3} className="input resize-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
              </div>

              <div className="sm:col-span-2 mt-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? <Spinner size={18} /> : editingId ? 'Save Changes' : 'Add Coach'}
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

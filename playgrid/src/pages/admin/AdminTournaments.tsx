import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ImagePlus, Pencil, Plus, Trash2, X } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import { Trophy } from 'lucide-react'
import {
  createTournament,
  deleteTournament,
  getTournaments,
  updateTournament,
} from '@/services/tournaments'
import { buildStoragePath, uploadImage } from '@/services/storage'
import { sportsList } from '@/data/mockData'
import type { Tournament } from '@/types'
import { formatDate } from '@/utils/format'

const emptyForm: Omit<Tournament, 'id'> = {
  title: '',
  sport: 'Cricket',
  location: '',
  state: '',
  city: '',
  isTamilNadu: true,
  venue: '',
  startDate: '',
  endDate: '',
  registrationDeadline: '',
  prizeMoney: 0,
  entryFee: 0,
  tournamentType: 'Open',
  status: 'Open',
  imageUrl: '',
  description: '',
  organizer: '',
  maxParticipants: 32,
  registeredCount: 0,
}

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)

  const load = () => {
    setLoading(true)
    getTournaments()
      .then(setTournaments)
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setShowForm(true)
  }

  const openEdit = (t: Tournament) => {
    const { id, ...rest } = t
    setForm(rest)
    setEditingId(id)
    setImageFile(null)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tournament? This cannot be undone.')) return
    await deleteTournament(id)
    load()
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      let imageUrl = form.imageUrl
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, buildStoragePath('tournaments', imageFile.name))
      }
      const payload = { ...form, imageUrl: imageUrl || form.imageUrl }
      if (editingId) {
        await updateTournament(editingId, payload)
      } else {
        await createTournament(payload)
      }
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
            <h1 className="section-title">Manage Tournaments</h1>
            <button onClick={openCreate} className="btn-primary px-5 py-2.5 text-sm">
              <Plus className="h-4 w-4" /> Add Tournament
            </button>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={28} />
          </div>
        ) : tournaments.length === 0 ? (
          <EmptyState icon={Trophy} title="No tournaments yet" description="Add your first tournament to get started." />
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-white/40">
                  <th className="px-5 py-3 font-medium">Tournament</th>
                  <th className="px-5 py-3 font-medium">Sport</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Dates</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((t) => (
                  <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3 font-medium text-white">{t.title}</td>
                    <td className="px-5 py-3 text-white/60">{t.sport}</td>
                    <td className="px-5 py-3 text-white/60">{t.location}</td>
                    <td className="px-5 py-3 text-white/60">{formatDate(t.startDate)}</td>
                    <td className="px-5 py-3 text-white/60">{t.status}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(t)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-red-500/10 hover:text-red-400"
                        >
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
              <h3 className="text-lg font-bold text-white">
                {editingId ? 'Edit Tournament' : 'Add Tournament'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  label="Title"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <Select
                label="Sport"
                value={form.sport}
                onChange={(e) => setForm({ ...form, sport: e.target.value as Tournament['sport'] })}
              >
                {sportsList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
              <Select
                label="Tournament Type"
                value={form.tournamentType}
                onChange={(e) => setForm({ ...form, tournamentType: e.target.value as Tournament['tournamentType'] })}
              >
                {['Amateur', 'Professional', 'School', 'College', 'Corporate', 'Open'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
              <Input
                label="City"
                required
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <Input
                label="State"
                required
                value={form.state}
                onChange={(e) =>
                  setForm({
                    ...form,
                    state: e.target.value,
                    isTamilNadu: e.target.value.trim().toLowerCase() === 'tamil nadu',
                  })
                }
              />
              <div className="sm:col-span-2">
                <Input
                  label="Full Location (displayed)"
                  required
                  placeholder="e.g. Chennai, Tamil Nadu"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
              <Input
                label="Venue"
                required
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
              />
              <Input
                label="Organizer"
                required
                value={form.organizer}
                onChange={(e) => setForm({ ...form, organizer: e.target.value })}
              />
              <Input
                label="Start Date"
                type="date"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
              />
              <Input
                label="End Date"
                type="date"
                required
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
              <Input
                label="Registration Deadline"
                type="date"
                required
                value={form.registrationDeadline}
                onChange={(e) => setForm({ ...form, registrationDeadline: e.target.value })}
              />
              <Select
                label="Status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as Tournament['status'] })}
              >
                {['Open', 'Closing Soon', 'Closed', 'Upcoming'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
              <Input
                label="Prize Money (₹)"
                type="number"
                required
                value={form.prizeMoney}
                onChange={(e) => setForm({ ...form, prizeMoney: Number(e.target.value) })}
              />
              <Input
                label="Entry Fee (₹)"
                type="number"
                value={form.entryFee}
                onChange={(e) => setForm({ ...form, entryFee: Number(e.target.value) })}
              />
              <Input
                label="Max Participants"
                type="number"
                value={form.maxParticipants}
                onChange={(e) => setForm({ ...form, maxParticipants: Number(e.target.value) })}
              />
              <Input
                label="Image URL (or upload below)"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
              <div>
                <label className="label flex items-center gap-1.5">
                  <ImagePlus className="h-3.5 w-3.5" /> Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="input cursor-pointer text-xs file:mr-3 file:rounded-full file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-surface-950"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="label">Description</label>
                <textarea
                  required
                  rows={3}
                  className="input resize-none"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="sm:col-span-2 mt-2 flex gap-3">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? <Spinner size={18} /> : editingId ? 'Save Changes' : 'Create Tournament'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

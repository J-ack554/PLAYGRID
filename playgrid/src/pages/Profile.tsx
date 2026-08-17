import { useState, type FormEvent } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { Save, User } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import { useAuth } from '@/context/AuthContext'
import { db } from '@/lib/firebase'

export default function Profile() {
  const { user, profile } = useAuth()
  const [name, setName] = useState(profile?.name ?? '')
  const [phone, setPhone] = useState(profile?.phone ?? '')
  const [location, setLocation] = useState(profile?.location ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) return
    setSaving(true)
    setSaved(false)
    try {
      await updateDoc(doc(db, 'users', user.uid), { name, phone, location })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-12 sm:py-16">
        <div className="container-px mx-auto max-w-4xl">
          <p className="eyebrow">Account</p>
          <h1 className="section-title mt-2">My Profile</h1>
        </div>
      </section>

      <section className="container-px mx-auto max-w-4xl py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[240px_1fr]">
          <div className="card flex flex-col items-center gap-3 p-6 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500/20 text-2xl font-bold text-brand-300">
              {(profile?.name ?? 'P').charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-white">{profile?.name}</h3>
              <p className="text-xs text-white/40">{profile?.email}</p>
            </div>
            {profile?.role === 'admin' && (
              <span className="badge bg-accent-500/15 text-accent-400 border border-accent-500/30">
                Admin
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="card space-y-4 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <User className="h-4 w-4 text-brand-400" /> Edit Details
            </div>
            <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" value={profile?.email ?? ''} disabled />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
            />
            <button type="submit" disabled={saving} className="btn-primary px-6 py-2.5 text-sm">
              {saving ? <Spinner size={16} /> : <><Save className="h-4 w-4" /> Save Changes</>}
            </button>
            {saved && <p className="text-sm text-brand-400">Profile updated successfully.</p>}
          </form>
        </div>
      </section>
    </Layout>
  )
}

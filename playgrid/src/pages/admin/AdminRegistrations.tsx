import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Trash2, Users, X as XIcon } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import EmptyState from '@/components/ui/EmptyState'
import {
  deleteRegistration,
  getAllRegistrations,
  updateRegistrationStatus,
} from '@/services/registrations'
import type { Registration } from '@/types'
import { formatDate } from '@/utils/format'

const statusVariant: Record<Registration['status'], 'success' | 'accent' | 'danger'> = {
  Confirmed: 'success',
  Pending: 'accent',
  Rejected: 'danger',
}

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getAllRegistrations().then(setRegistrations).catch(() => undefined).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const setStatus = async (id: string, status: Registration['status']) => {
    await updateRegistrationStatus(id, status)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Remove this registration?')) return
    await deleteRegistration(id)
    load()
  }

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-10">
        <div className="container-px mx-auto max-w-7xl">
          <Link to="/admin" className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <h1 className="section-title mt-3">Manage Registrations</h1>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10">
        {loading ? (
          <div className="flex justify-center py-16"><Spinner size={28} /></div>
        ) : registrations.length === 0 ? (
          <EmptyState icon={Users} title="No registrations yet" />
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs text-white/40">
                  <th className="px-5 py-3 font-medium">Athlete</th>
                  <th className="px-5 py-3 font-medium">Tournament</th>
                  <th className="px-5 py-3 font-medium">Sport</th>
                  <th className="px-5 py-3 font-medium">Registered</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((r) => (
                  <tr key={r.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-3">
                      <div className="font-medium text-white">{r.userName}</div>
                      <div className="text-xs text-white/40">{r.userEmail}</div>
                    </td>
                    <td className="px-5 py-3 text-white/60">{r.tournamentTitle}</td>
                    <td className="px-5 py-3 text-white/60">{r.sport}</td>
                    <td className="px-5 py-3 text-white/60">{formatDate(r.createdAt)}</td>
                    <td className="px-5 py-3"><Badge variant={statusVariant[r.status]}>{r.status}</Badge></td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setStatus(r.id, 'Confirmed')}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-brand-500/10 hover:text-brand-400"
                          title="Confirm"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setStatus(r.id, 'Rejected')}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-red-500/10 hover:text-red-400"
                          title="Reject"
                        >
                          <XIcon className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => remove(r.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/10 hover:text-white"
                          title="Delete"
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
    </Layout>
  )
}

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import EmptyState from '@/components/ui/EmptyState'
import Spinner from '@/components/ui/Spinner'
import { useAuth } from '@/context/AuthContext'
import { getUserRegistrations } from '@/services/registrations'
import type { Registration } from '@/types'
import { formatDate } from '@/utils/format'

const statusVariant: Record<Registration['status'], 'success' | 'accent' | 'danger'> = {
  Confirmed: 'success',
  Pending: 'accent',
  Rejected: 'danger',
}

export default function MyRegistrations() {
  const { user } = useAuth()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserRegistrations(user.uid)
      .then(setRegistrations)
      .finally(() => setLoading(false))
  }, [user])

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-12 sm:py-16">
        <div className="container-px mx-auto max-w-5xl">
          <p className="eyebrow">Your journey</p>
          <h1 className="section-title mt-2">My Registrations</h1>
        </div>
      </section>

      <section className="container-px mx-auto max-w-5xl py-10 sm:py-14">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size={32} />
          </div>
        ) : registrations.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No registrations yet"
            description="Browse tournaments and register to see them here."
          />
        ) : (
          <div className="space-y-4">
            {registrations.map((r) => (
              <div key={r.id} className="card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link to={`/tournaments/${r.tournamentId}`} className="font-semibold text-white hover:text-brand-300">
                    {r.tournamentTitle}
                  </Link>
                  <div className="mt-1 flex items-center gap-3 text-xs text-white/40">
                    <span>{r.sport}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span>Registered {formatDate(r.createdAt)}</span>
                    {r.teamName && (
                      <>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                        <span>Team: {r.teamName}</span>
                      </>
                    )}
                  </div>
                </div>
                <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

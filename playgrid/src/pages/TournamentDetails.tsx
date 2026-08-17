import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Award,
  Calendar,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import Input from '@/components/ui/Input'
import Spinner from '@/components/ui/Spinner'
import { useAuth } from '@/context/AuthContext'
import { getTournamentById } from '@/services/tournaments'
import { createRegistration, getUserRegistrations } from '@/services/registrations'
import { mockTournaments } from '@/data/mockData'
import type { Tournament } from '@/types'
import { formatCurrency, formatDate, formatDateRange } from '@/utils/format'

export default function TournamentDetails() {
  const { id } = useParams<{ id: string }>()
  const { user, profile } = useAuth()
  const navigate = useNavigate()

  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ phone: '', teamName: '' })

  useEffect(() => {
    if (!id) return
    const fallback = mockTournaments.find((t) => t.id === id) ?? null
    getTournamentById(id)
      .then((data) => setTournament(data ?? fallback))
      .catch(() => setTournament(fallback))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => {
    if (!user || !id) return
    getUserRegistrations(user.uid)
      .then((regs) => setAlreadyRegistered(regs.some((r) => r.tournamentId === id)))
      .catch(() => undefined)
  }, [user, id])

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !tournament) return
    setSubmitting(true)
    setError('')
    try {
      await createRegistration({
        tournamentId: tournament.id,
        tournamentTitle: tournament.title,
        userId: user.uid,
        userName: profile?.name ?? user.displayName ?? 'Player',
        userEmail: user.email ?? '',
        phone: form.phone,
        teamName: form.teamName || undefined,
        sport: tournament.sport,
      })
      setSuccess(true)
      setAlreadyRegistered(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      // eslint-disable-next-line no-console
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner size={32} />
        </div>
      </Layout>
    )
  }

  if (!tournament) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <Trophy className="h-10 w-10 text-white/30" />
          <h1 className="text-xl font-bold text-white">Tournament not found</h1>
          <Link to="/tournaments" className="btn-primary px-6 py-2.5 text-sm">
            Back to Tournaments
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden sm:h-[50vh]">
        <img src={tournament.imageUrl} alt={tournament.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/60 to-surface-950/20" />
        <div className="container-px absolute bottom-0 left-0 right-0 mx-auto max-w-7xl pb-8">
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">{tournament.sport}</Badge>
            {tournament.isTamilNadu && <Badge variant="accent">Tamil Nadu</Badge>}
            <Badge variant="neutral">{tournament.tournamentType}</Badge>
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-extrabold text-white sm:text-5xl">
            {tournament.title}
          </h1>
          <div className="mt-3 flex items-center gap-1.5 text-sm text-white/70">
            <MapPin className="h-4 w-4" /> {tournament.venue}, {tournament.location}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="text-xl font-bold text-white">About this tournament</h2>
            <p className="mt-3 leading-relaxed text-white/60">{tournament.description}</p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Calendar, label: 'Dates', value: formatDateRange(tournament.startDate, tournament.endDate) },
                { icon: IndianRupee, label: 'Prize Money', value: formatCurrency(tournament.prizeMoney) },
                { icon: Users, label: 'Entry Fee', value: formatCurrency(tournament.entryFee) },
                { icon: Award, label: 'Organizer', value: tournament.organizer },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="card p-4">
                  <Icon className="h-4 w-4 text-brand-400" />
                  <div className="mt-2 text-xs text-white/40">{label}</div>
                  <div className="mt-0.5 text-sm font-semibold text-white line-clamp-1">{value}</div>
                </div>
              ))}
            </div>

            {tournament.maxParticipants && (
              <div className="mt-8 card p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-white">Registration Progress</span>
                  <span className="text-white/50">
                    {tournament.registeredCount ?? 0}/{tournament.maxParticipants}
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                    style={{
                      width: `${Math.min(
                        100,
                        ((tournament.registeredCount ?? 0) / tournament.maxParticipants) * 100,
                      )}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <div className="text-xs font-medium text-white/40">Registration Deadline</div>
              <div className="mt-1 text-lg font-bold text-white">
                {formatDate(tournament.registrationDeadline)}
              </div>
              <Badge
                variant={tournament.status === 'Closed' ? 'danger' : 'success'}
                className="mt-3"
              >
                {tournament.status}
              </Badge>

              {alreadyRegistered ? (
                <div className="mt-6 flex items-center gap-2 rounded-xl border border-brand-500/30 bg-brand-500/10 p-4 text-sm text-brand-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  You're registered for this tournament.
                </div>
              ) : tournament.status === 'Closed' ? (
                <button disabled className="btn-secondary mt-6 w-full opacity-50">
                  Registration Closed
                </button>
              ) : user ? (
                <button onClick={() => setShowForm(true)} className="btn-primary mt-6 w-full">
                  Register Now
                </button>
              ) : (
                <button onClick={() => navigate('/login')} className="btn-primary mt-6 w-full">
                  Log in to Register
                </button>
              )}

              <div className="mt-5 space-y-2 border-t border-white/5 pt-5 text-xs text-white/40">
                <div className="flex justify-between">
                  <span>Sport</span>
                  <span className="text-white/70">{tournament.sport}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="text-white/70">{tournament.tournamentType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Venue</span>
                  <span className="text-right text-white/70">{tournament.venue}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-surface-100 p-6 shadow-glow animate-fade-up">
            {success ? (
              <div className="flex flex-col items-center py-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-brand-400" />
                <h3 className="mt-4 text-lg font-bold text-white">Registration Submitted!</h3>
                <p className="mt-1 text-sm text-white/50">
                  You'll receive updates about {tournament.title} on your registered email.
                </p>
                <button
                  onClick={() => setShowForm(false)}
                  className="btn-primary mt-6 w-full"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Register for tournament</h3>
                  <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-1 text-sm text-white/50">{tournament.title}</p>

                <form onSubmit={handleRegister} className="mt-5 space-y-4">
                  <Input
                    label="Full Name"
                    value={profile?.name ?? ''}
                    disabled
                  />
                  <Input label="Email" value={user?.email ?? ''} disabled />
                  <Input
                    label="Phone Number"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <Input
                    label="Team Name (optional)"
                    placeholder="Leave blank for individual entry"
                    value={form.teamName}
                    onChange={(e) => setForm({ ...form, teamName: e.target.value })}
                  />
                  {error && <p className="text-sm text-red-400">{error}</p>}
                  <button type="submit" disabled={submitting} className="btn-primary w-full">
                    {submitting ? <Spinner size={18} /> : 'Confirm Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  )
}

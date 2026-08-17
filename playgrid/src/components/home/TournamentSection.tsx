import { Link } from 'react-router-dom'
import type { Tournament } from '@/types'
import TournamentCard from '@/components/tournaments/TournamentCard'

export default function TournamentSection({
  title,
  eyebrow,
  tournaments,
  viewAllHref = '/tournaments',
  tint = false,
}: {
  title: string
  eyebrow: string
  tournaments: Tournament[]
  viewAllHref?: string
  tint?: boolean
}) {
  if (tournaments.length === 0) return null

  return (
    <section className={`section-y ${tint ? 'bg-surface-900/60' : ''}`}>
      <div className="container-px mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="section-title mt-2">{title}</h2>
          </div>
          <Link
            to={viewAllHref}
            className="text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tournaments.slice(0, 4).map((t) => (
            <TournamentCard key={t.id} tournament={t} />
          ))}
        </div>
      </div>
    </section>
  )
}

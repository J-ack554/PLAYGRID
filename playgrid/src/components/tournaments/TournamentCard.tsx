import { Link } from 'react-router-dom'
import { Calendar, IndianRupee, MapPin, Users } from 'lucide-react'
import type { Tournament } from '@/types'
import Badge from '@/components/ui/Badge'
import { formatCurrency, formatDateRange } from '@/utils/format'

const statusVariant: Record<Tournament['status'], 'success' | 'accent' | 'danger' | 'neutral'> = {
  Open: 'success',
  'Closing Soon': 'accent',
  Closed: 'danger',
  Upcoming: 'neutral',
}

export default function TournamentCard({ tournament }: { tournament: Tournament }) {
  return (
    <Link to={`/tournaments/${tournament.id}`} className="card-hover group flex flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={tournament.imageUrl}
          alt={tournament.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/90 via-surface-950/10 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="brand">{tournament.sport}</Badge>
          {tournament.isTamilNadu && <Badge variant="accent">Tamil Nadu</Badge>}
        </div>
        <div className="absolute right-3 top-3">
          <Badge variant={statusVariant[tournament.status]}>{tournament.status}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-white transition-colors group-hover:text-brand-300 line-clamp-2">
          {tournament.title}
        </h3>

        <div className="mt-3 flex items-center gap-1.5 text-sm text-white/50">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{tournament.location}</span>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-white/50">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>{formatDateRange(tournament.startDate, tournament.endDate)}</span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-300">
            <IndianRupee className="h-3.5 w-3.5" />
            {formatCurrency(tournament.prizeMoney)} prize
          </div>
          {tournament.maxParticipants && (
            <div className="flex items-center gap-1.5 text-xs text-white/40">
              <Users className="h-3.5 w-3.5" />
              {tournament.registeredCount ?? 0}/{tournament.maxParticipants}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

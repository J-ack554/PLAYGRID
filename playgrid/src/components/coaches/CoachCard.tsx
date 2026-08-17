import { Award, MapPin, Star } from 'lucide-react'
import type { Coach } from '@/types'
import Badge from '@/components/ui/Badge'

export default function CoachCard({ coach }: { coach: Coach }) {
  return (
    <div className="card-hover group overflow-hidden">
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={coach.imageUrl}
          alt={coach.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/20 to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge variant="brand">{coach.sport}</Badge>
        </div>
        {coach.rating && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-surface-950/80 px-2.5 py-1 text-xs font-semibold text-accent-400 backdrop-blur">
            <Star className="h-3 w-3 fill-accent-400" />
            {coach.rating.toFixed(1)}
          </div>
        )}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-lg font-bold text-white">{coach.name}</h3>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-white/60">
            <MapPin className="h-3 w-3" />
            {coach.location}
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-relaxed text-white/50 line-clamp-2">{coach.bio}</p>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-white/60">
          <Award className="h-3.5 w-3.5 text-brand-400" />
          {coach.experienceYears}+ years experience
        </div>

        {coach.achievements.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {coach.achievements.slice(0, 2).map((a, i) => (
              <span
                key={i}
                className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50"
              >
                {a}
              </span>
            ))}
          </div>
        )}

        <button className="btn-outline mt-5 w-full text-sm">Connect with Coach</button>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import {
  Activity,
  Dumbbell,
  Medal,
  Trophy,
  Waves,
  CircleDot,
} from 'lucide-react'

const categories = [
  { name: 'Cricket', icon: Trophy, count: '68 tournaments' },
  { name: 'Football', icon: CircleDot, count: '42 tournaments' },
  { name: 'Badminton', icon: Activity, count: '35 tournaments' },
  { name: 'Athletics', icon: Medal, count: '29 tournaments' },
  { name: 'Basketball', icon: Dumbbell, count: '24 tournaments' },
  { name: 'Swimming', icon: Waves, count: '18 tournaments' },
]

export default function SportsCategories() {
  return (
    <section className="section-y container-px mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Browse by sport</p>
          <h2 className="section-title mt-2">Sports Categories</h2>
        </div>
        <Link
          to="/tournaments"
          className="text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300"
        >
          View all sports →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map(({ name, icon: Icon, count }) => (
          <Link
            key={name}
            to={`/tournaments?sport=${encodeURIComponent(name)}`}
            className="card-hover group flex flex-col items-center gap-3 px-4 py-7 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-surface-950">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{name}</div>
              <div className="mt-0.5 text-[11px] text-white/40">{count}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

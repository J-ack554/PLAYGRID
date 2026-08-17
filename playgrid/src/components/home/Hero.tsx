import { Link } from 'react-router-dom'
import { ArrowRight, PlayCircle, TrendingUp, Trophy, Users } from 'lucide-react'
import HeroSearchBar from './SearchBar'

const stats = [
  { icon: Trophy, value: '250+', label: 'Active Tournaments' },
  { icon: Users, value: '12K+', label: 'Registered Athletes' },
  { icon: TrendingUp, value: '38', label: 'Districts Covered' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-glow pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
        aria-hidden
      />

      <div className="container-px relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-400" />
            Now live across Tamil Nadu & 15+ Indian states
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Connecting Athletes<br className="hidden sm:block" /> to{' '}
            <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-accent-400 bg-clip-text text-transparent">
              Opportunity
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Discover tournaments, connect with certified coaches and stay on top of sports news —
            built for the athletes of Tamil Nadu and across India.
          </p>

          <div className="mt-8">
            <HeroSearchBar />
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/tournaments" className="btn-primary px-7 py-3.5 text-sm">
              Explore Tournaments <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/coaches" className="btn-secondary px-7 py-3.5 text-sm">
              <PlayCircle className="h-4 w-4" /> Find a Coach
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4 sm:mt-20">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="card flex flex-col items-center gap-2 py-6 text-center">
              <Icon className="h-5 w-5 text-brand-400" />
              <div className="font-display text-2xl font-extrabold text-white sm:text-3xl">{value}</div>
              <div className="text-[11px] font-medium text-white/40 sm:text-xs">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

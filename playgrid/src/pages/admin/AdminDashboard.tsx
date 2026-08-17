import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutDashboard, Newspaper, Trophy, Users, UserCog } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Spinner from '@/components/ui/Spinner'
import { getTournaments } from '@/services/tournaments'
import { getNews } from '@/services/news'
import { getCoaches } from '@/services/coaches'
import { getAllRegistrations } from '@/services/registrations'

const links = [
  { to: '/admin/tournaments', label: 'Tournaments', icon: Trophy, desc: 'Add, edit or remove tournaments' },
  { to: '/admin/news', label: 'News', icon: Newspaper, desc: 'Manage sports news articles' },
  { to: '/admin/coaches', label: 'Coaches', icon: UserCog, desc: 'Manage coach profiles' },
  { to: '/admin/registrations', label: 'Registrations', icon: Users, desc: 'Review tournament sign-ups' },
]

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ tournaments: 0, news: 0, coaches: 0, registrations: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getTournaments(), getNews(), getCoaches(), getAllRegistrations()])
      .then(([t, n, c, r]) =>
        setCounts({ tournaments: t.length, news: n.length, coaches: c.length, registrations: r.length }),
      )
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-12 sm:py-16">
        <div className="container-px mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-brand-400">
            <LayoutDashboard className="h-4 w-4" />
            <p className="eyebrow">Admin</p>
          </div>
          <h1 className="section-title mt-2">Dashboard</h1>
          <p className="mt-2 max-w-xl text-white/50">Manage all PLAYGRID content from one place.</p>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10 sm:py-14">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner size={28} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Tournaments', value: counts.tournaments },
              { label: 'News Articles', value: counts.news },
              { label: 'Coaches', value: counts.coaches },
              { label: 'Registrations', value: counts.registrations },
            ].map((s) => (
              <div key={s.label} className="card p-5">
                <div className="font-display text-3xl font-extrabold text-white">{s.value}</div>
                <div className="mt-1 text-xs text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {links.map(({ to, label, icon: Icon, desc }) => (
            <Link key={to} to={to} className="card-hover p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{label}</h3>
              <p className="mt-1 text-xs text-white/45">{desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  )
}

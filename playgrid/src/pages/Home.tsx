import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Hero from '@/components/home/Hero'
import SportsCategories from '@/components/home/SportsCategories'
import LatestNews from '@/components/home/LatestNews'
import TournamentSection from '@/components/home/TournamentSection'
import { getTournaments } from '@/services/tournaments'
import { getNews } from '@/services/news'
import { mockNews, mockTournaments } from '@/data/mockData'
import type { NewsArticle, Tournament } from '@/types'

export default function Home() {
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments)
  const [news, setNews] = useState<NewsArticle[]>(mockNews)

  useEffect(() => {
    getTournaments()
      .then((data) => data.length && setTournaments(data))
      .catch(() => undefined)
    getNews()
      .then((data) => data.length && setNews(data))
      .catch(() => undefined)
  }, [])

  const tnTournaments = tournaments.filter((t) => t.isTamilNadu)
  const indiaTournaments = tournaments.filter((t) => !t.isTamilNadu)
  const upcoming = [...tournaments].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  )

  return (
    <Layout>
      <Hero />
      <SportsCategories />

      <TournamentSection
        eyebrow="Don't miss out"
        title="Upcoming Tournaments"
        tournaments={upcoming}
      />

      <TournamentSection
        eyebrow="Home turf"
        title="Tamil Nadu Tournaments"
        tournaments={tnTournaments}
        tint
        viewAllHref="/tournaments?location=Tamil+Nadu"
      />

      <TournamentSection
        eyebrow="Beyond the state"
        title="Major Tournaments Across India"
        tournaments={indiaTournaments}
      />

      <LatestNews articles={news} />

      <section className="section-y bg-surface-900/60">
        <div className="container-px mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-brand-900/40 via-surface-100 to-surface-100 p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="eyebrow">Why PLAYGRID</p>
                <h2 className="section-title mt-2">Built for every athlete's journey</h2>
                <p className="mt-4 max-w-md text-white/55">
                  Whether you're chasing your first district title or scouting for a national
                  academy, PLAYGRID brings tournaments, coaching and sports news together in
                  one place.
                </p>
                <Link to="/register" className="btn-primary mt-7 px-7 py-3.5 text-sm">
                  Create your free account <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { icon: Trophy, title: 'Verified Tournaments', desc: 'Curated events with real prize pools' },
                  { icon: ShieldCheck, title: 'Trusted Coaches', desc: 'Certified profiles you can rely on' },
                  { icon: Sparkles, title: 'Fresh Sports News', desc: 'Stories from TN and across India' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="card p-5">
                    <Icon className="h-5 w-5 text-brand-400" />
                    <h3 className="mt-3 text-sm font-bold text-white">{title}</h3>
                    <p className="mt-1 text-xs text-white/45">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

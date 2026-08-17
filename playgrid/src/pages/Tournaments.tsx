import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Trophy } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import TournamentCard from '@/components/tournaments/TournamentCard'
import TournamentFilters, {
  type TournamentFilterState,
} from '@/components/tournaments/TournamentFilters'
import EmptyState from '@/components/ui/EmptyState'
import Spinner from '@/components/ui/Spinner'
import { getTournaments } from '@/services/tournaments'
import { mockTournaments } from '@/data/mockData'
import type { Tournament } from '@/types'

export default function Tournaments() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tournaments, setTournaments] = useState<Tournament[]>(mockTournaments)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('q') ?? '')
  const [filters, setFilters] = useState<TournamentFilterState>({
    sport: searchParams.get('sport') ?? '',
    location: searchParams.get('location') ?? '',
    type: '',
    sort: 'date',
  })

  useEffect(() => {
    getTournaments()
      .then((data) => data.length && setTournaments(data))
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const params: Record<string, string> = {}
    if (search) params.q = search
    if (filters.sport) params.sport = filters.sport
    if (filters.location) params.location = filters.location
    setSearchParams(params, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filters.sport, filters.location])

  const locations = useMemo(
    () => Array.from(new Set(tournaments.map((t) => t.state))).sort(),
    [tournaments],
  )

  const filtered = useMemo(() => {
    let result = tournaments.filter((t) => {
      const matchesSearch =
        !search ||
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase()) ||
        t.sport.toLowerCase().includes(search.toLowerCase())
      const matchesSport = !filters.sport || t.sport === filters.sport
      const matchesLocation =
        !filters.location ||
        t.state === filters.location ||
        t.state.toLowerCase().includes(filters.location.toLowerCase())
      const matchesType = !filters.type || t.tournamentType === filters.type
      return matchesSearch && matchesSport && matchesLocation && matchesType
    })

    result = [...result].sort((a, b) => {
      if (filters.sort === 'prize') return b.prizeMoney - a.prizeMoney
      if (filters.sort === 'deadline')
        return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime()
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    })

    return result
  }, [tournaments, search, filters])

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-12 sm:py-16">
        <div className="container-px mx-auto max-w-7xl">
          <p className="eyebrow">{filtered.length} tournaments found</p>
          <h1 className="section-title mt-2">Find your next tournament</h1>
          <div className="mt-6 flex max-w-xl items-center gap-2 rounded-full border border-white/10 bg-surface-100 p-1.5 pl-5 focus-within:border-brand-400">
            <Search className="h-4 w-4 shrink-0 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, sport or city..."
              className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/35 outline-none"
            />
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TournamentFilters filters={filters} onChange={setFilters} locations={locations} />
          </aside>

          <div>
            {loading ? (
              <div className="flex justify-center py-24">
                <Spinner size={32} />
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="No tournaments match your filters"
                description="Try adjusting your search or clearing filters to see more results."
              />
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((t) => (
                  <TournamentCard key={t.id} tournament={t} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

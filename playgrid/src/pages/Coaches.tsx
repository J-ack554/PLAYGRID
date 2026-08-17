import { useEffect, useMemo, useState } from 'react'
import { Search, Users } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import CoachCard from '@/components/coaches/CoachCard'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/ui/EmptyState'
import Spinner from '@/components/ui/Spinner'
import { getCoaches } from '@/services/coaches'
import { mockCoaches, sportsList } from '@/data/mockData'
import type { Coach } from '@/types'

export default function Coaches() {
  const [coaches, setCoaches] = useState<Coach[]>(mockCoaches)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sport, setSport] = useState('')

  useEffect(() => {
    getCoaches()
      .then((data) => data.length && setCoaches(data))
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(
    () =>
      coaches.filter((c) => {
        const matchesSearch =
          !search ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.location.toLowerCase().includes(search.toLowerCase())
        const matchesSport = !sport || c.sport === sport
        return matchesSearch && matchesSport
      }),
    [coaches, search, sport],
  )

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-12 sm:py-16">
        <div className="container-px mx-auto max-w-7xl">
          <p className="eyebrow">Level up</p>
          <h1 className="section-title mt-2">Find your coach</h1>
          <p className="mt-3 max-w-xl text-white/50">
            Connect with certified coaches across Tamil Nadu and India, from grassroots to elite.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-full border border-white/10 bg-surface-100 p-1.5 pl-5 focus-within:border-brand-400">
              <Search className="h-4 w-4 shrink-0 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search coaches by name or city..."
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/35 outline-none"
              />
            </div>
            <div className="sm:w-56">
              <Select value={sport} onChange={(e) => setSport(e.target.value)}>
                <option value="">All Sports</option>
                {sportsList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10 sm:py-14">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Users} title="No coaches match your search" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((c) => (
              <CoachCard key={c.id} coach={c} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

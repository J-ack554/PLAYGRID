import { SlidersHorizontal, X } from 'lucide-react'
import Select from '@/components/ui/Select'
import { sportsList } from '@/data/mockData'

export interface TournamentFilterState {
  sport: string
  location: string
  type: string
  sort: string
}

const tournamentTypes = ['Amateur', 'Professional', 'School', 'College', 'Corporate', 'Open']

export default function TournamentFilters({
  filters,
  onChange,
  locations,
}: {
  filters: TournamentFilterState
  onChange: (f: TournamentFilterState) => void
  locations: string[]
}) {
  const hasActive = filters.sport || filters.location || filters.type

  const reset = () =>
    onChange({ sport: '', location: '', type: '', sort: filters.sort })

  return (
    <div className="card p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <SlidersHorizontal className="h-4 w-4 text-brand-400" />
          Filters
        </div>
        {hasActive && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs font-medium text-white/50 hover:text-white"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <Select
          label="Sport"
          value={filters.sport}
          onChange={(e) => onChange({ ...filters, sport: e.target.value })}
        >
          <option value="">All Sports</option>
          {sportsList.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>

        <Select
          label="Location"
          value={filters.location}
          onChange={(e) => onChange({ ...filters, location: e.target.value })}
        >
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>

        <Select
          label="Tournament Type"
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value })}
        >
          <option value="">All Types</option>
          {tournamentTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>

        <Select
          label="Sort By"
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value })}
        >
          <option value="date">Date (Soonest)</option>
          <option value="prize">Prize Money (Highest)</option>
          <option value="deadline">Registration Deadline</option>
        </Select>
      </div>
    </div>
  )
}

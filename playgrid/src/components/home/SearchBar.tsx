import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [value, setValue] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/tournaments${value ? `?q=${encodeURIComponent(value)}` : ''}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl items-center gap-2 rounded-full border border-white/10 bg-surface-100/80 p-1.5 pl-5 shadow-card backdrop-blur transition-colors focus-within:border-brand-400"
    >
      <Search className="h-4 w-4 shrink-0 text-white/40" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search tournaments, sports, cities..."
        className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-white/35 outline-none"
      />
      <button type="submit" className="btn-primary shrink-0 px-5 py-2.5 text-sm">
        Search
      </button>
    </form>
  )
}

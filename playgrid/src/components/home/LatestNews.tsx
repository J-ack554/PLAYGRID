import { Link } from 'react-router-dom'
import type { NewsArticle } from '@/types'
import NewsCard from '@/components/news/NewsCard'

export default function LatestNews({ articles }: { articles: NewsArticle[] }) {
  if (articles.length === 0) return null
  const [featured, ...rest] = articles

  return (
    <section className="section-y container-px mx-auto max-w-7xl">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="section-title mt-2">Latest Sports News</h2>
        </div>
        <Link to="/news" className="text-sm font-semibold text-brand-400 transition-colors hover:text-brand-300">
          View all news →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NewsCard article={featured} large />
        </div>
        <div className="flex flex-col gap-6">
          {rest.slice(0, 2).map((a) => (
            <NewsCard key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  )
}

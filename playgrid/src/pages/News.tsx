import { useEffect, useMemo, useState } from 'react'
import { Newspaper } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import NewsCard from '@/components/news/NewsCard'
import EmptyState from '@/components/ui/EmptyState'
import Spinner from '@/components/ui/Spinner'
import { getNews } from '@/services/news'
import { mockNews } from '@/data/mockData'
import type { NewsArticle, NewsCategory } from '@/types'

const categories: (NewsCategory | 'All')[] = [
  'All',
  'Cricket',
  'Football',
  'Badminton',
  'Tennis',
  'Athletics',
  'Basketball',
  'Kabaddi',
  'General',
]

export default function News() {
  const [news, setNews] = useState<NewsArticle[]>(mockNews)
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<(typeof categories)[number]>('All')

  useEffect(() => {
    getNews()
      .then((data) => data.length && setNews(data))
      .catch(() => undefined)
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(
    () => (active === 'All' ? news : news.filter((n) => n.category === active)),
    [news, active],
  )

  return (
    <Layout>
      <section className="border-b border-white/5 bg-surface-900/60 py-12 sm:py-16">
        <div className="container-px mx-auto max-w-7xl">
          <p className="eyebrow">Sports desk</p>
          <h1 className="section-title mt-2">Latest Sports News</h1>
          <p className="mt-3 max-w-xl text-white/50">
            Stories, results and updates from Tamil Nadu and across Indian sports.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                  active === c
                    ? 'bg-brand-500 text-surface-950'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10 sm:py-14">
        {loading ? (
          <div className="flex justify-center py-24">
            <Spinner size={32} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState icon={Newspaper} title="No news in this category yet" />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((n) => (
              <NewsCard key={n.id} article={n} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}

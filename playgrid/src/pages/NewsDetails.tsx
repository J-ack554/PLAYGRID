import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Clock, Newspaper, User } from 'lucide-react'
import Layout from '@/components/layout/Layout'
import Badge from '@/components/ui/Badge'
import Spinner from '@/components/ui/Spinner'
import { getNewsById } from '@/services/news'
import { mockNews } from '@/data/mockData'
import type { NewsArticle } from '@/types'
import { formatDate } from '@/utils/format'

export default function NewsDetails() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fallback = mockNews.find((n) => n.id === id) ?? null
    getNewsById(id)
      .then((data) => setArticle(data ?? fallback))
      .catch(() => setArticle(fallback))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Spinner size={32} />
        </div>
      </Layout>
    )
  }

  if (!article) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <Newspaper className="h-10 w-10 text-white/30" />
          <h1 className="text-xl font-bold text-white">Article not found</h1>
          <Link to="/news" className="btn-primary px-6 py-2.5 text-sm">
            Back to News
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <section className="relative h-[35vh] min-h-[280px] w-full overflow-hidden sm:h-[45vh]">
        <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/60 to-surface-950/20" />
        <div className="container-px absolute bottom-0 left-0 right-0 mx-auto max-w-4xl pb-8">
          <Badge variant="brand">{article.category}</Badge>
          <h1 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      <section className="container-px mx-auto max-w-4xl py-10 sm:py-14">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" /> {article.author}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {formatDate(article.publishedAt)}
          </div>
        </div>

        <p className="mt-6 text-lg font-medium leading-relaxed text-white/80">{article.summary}</p>

        {article.content ? (
          <div className="mt-4 whitespace-pre-line leading-relaxed text-white/60">{article.content}</div>
        ) : (
          <div className="mt-4 leading-relaxed text-white/50">
            Full article content will be available here once connected to a live sports news feed.
            This structure is ready to plug into any external sports/news API.
          </div>
        )}

        <div className="mt-10">
          <Link to="/news" className="btn-outline px-6 py-2.5 text-sm">
            ← Back to all news
          </Link>
        </div>
      </section>
    </Layout>
  )
}

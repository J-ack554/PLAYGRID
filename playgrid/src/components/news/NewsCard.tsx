import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import type { NewsArticle } from '@/types'
import Badge from '@/components/ui/Badge'
import { timeAgo } from '@/utils/format'

export default function NewsCard({ article, large = false }: { article: NewsArticle; large?: boolean }) {
  return (
    <Link
      to={`/news/${article.id}`}
      className={`card-hover group flex overflow-hidden ${
        large ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      <div className={`relative overflow-hidden ${large ? 'h-56 md:h-auto md:w-1/2' : 'h-44 w-full'}`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="brand">{article.category}</Badge>
        </div>
      </div>
      <div className={`flex flex-1 flex-col p-5 ${large ? 'md:w-1/2 md:justify-center' : ''}`}>
        <h3
          className={`font-display font-bold text-white transition-colors group-hover:text-brand-300 ${
            large ? 'text-2xl line-clamp-3' : 'text-base line-clamp-2'
          }`}
        >
          {article.title}
        </h3>
        <p className={`mt-2 text-sm text-white/50 ${large ? 'line-clamp-3' : 'line-clamp-2'}`}>
          {article.summary}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-white/40">
          <span>{article.author}</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {timeAgo(article.publishedAt)}
          </div>
        </div>
      </div>
    </Link>
  )
}

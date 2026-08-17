import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import Layout from '@/components/layout/Layout'

export default function NotFound() {
  return (
    <Layout>
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <span className="font-display text-8xl font-extrabold text-white/10">404</span>
        <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
        <p className="mt-2 max-w-sm text-white/50">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary mt-6 px-6 py-2.5 text-sm">
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </Layout>
  )
}

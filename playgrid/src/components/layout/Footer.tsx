import { Link } from 'react-router-dom'
import { Facebook, Instagram, Trophy, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-900">
      <div className="container-px mx-auto max-w-7xl py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600">
                <Trophy className="h-5 w-5 text-surface-950" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-extrabold text-white">
                PLAY<span className="text-brand-400">GRID</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Connecting Athletes to Opportunity. Discover tournaments, coaches and sports
              stories across Tamil Nadu and India.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-brand-400 hover:text-brand-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link to="/tournaments" className="hover:text-brand-300">Tournaments</Link></li>
              <li><Link to="/news" className="hover:text-brand-300">News</Link></li>
              <li><Link to="/coaches" className="hover:text-brand-300">Coaches</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Sports</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li>Cricket</li>
              <li>Football</li>
              <li>Badminton</li>
              <li>Athletics</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><a href="#" className="hover:text-brand-300">About</a></li>
              <li><a href="#" className="hover:text-brand-300">Contact</a></li>
              <li><a href="#" className="hover:text-brand-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} PLAYGRID. All rights reserved.</p>
          <p>Made for the athletes of Tamil Nadu & India 🏆</p>
        </div>
      </div>
    </footer>
  )
}

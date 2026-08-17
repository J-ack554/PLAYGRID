import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Trophy,
  User as UserIcon,
  X,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/news', label: 'News' },
  { to: '/coaches', label: 'Coaches' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, profile, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = async () => {
    await logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface-950/85 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between sm:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 shadow-glow transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
            <Trophy className="h-5 w-5 text-surface-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            PLAY<span className="text-brand-400">GRID</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/tournaments"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-brand-400 hover:text-brand-300"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-white/10 py-1 pl-1 pr-3 transition-colors hover:border-brand-400"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/20 text-sm font-bold text-brand-300">
                  {(profile?.name ?? 'P').charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-white/80">
                  {profile?.name?.split(' ')[0] ?? 'Player'}
                </span>
              </button>
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-surface-100 shadow-card animate-fade-up"
                  onMouseLeave={() => setMenuOpen(false)}
                >
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/80 hover:bg-white/5"
                  >
                    <UserIcon className="h-4 w-4" /> My Profile
                  </Link>
                  <Link
                    to="/my-registrations"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/80 hover:bg-white/5"
                  >
                    <Trophy className="h-4 w-4" /> My Registrations
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-white/80 hover:bg-white/5"
                    >
                      <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 border-t border-white/5 px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-ghost px-4 py-2 text-sm">
                Log In
              </Link>
              <Link to="/register" className="btn-primary px-5 py-2 text-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-surface-950/95 backdrop-blur-xl lg:hidden animate-fade-up">
          <div className="container-px mx-auto flex flex-col gap-1 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/60'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                    My Profile
                  </Link>
                  <Link
                    to="/my-registrations"
                    onClick={() => setMobileOpen(false)}
                    className="btn-secondary w-full"
                  >
                    My Registrations
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                      Admin Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn-outline w-full text-red-400">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">
                    Log In
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

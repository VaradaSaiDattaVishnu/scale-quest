import { useState, useCallback } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Brain,
  Eye,
  Users,
  BookOpen,
  Heart,
  Layers,
  FileText,
  Circle,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import useTapasyaStore from '../context/tapasyaStore'
import { StopButton } from './widgets'

// ---------------------------------------------------------------------------
// Page transition wrapper -- every page fades in gently
// ---------------------------------------------------------------------------
const pageTransition = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
}

// ---------------------------------------------------------------------------
// Navigation definition
// ---------------------------------------------------------------------------
const PILLAR_NAV = [
  { pillarId: 'memory', label: 'Memory', icon: Brain },
  { pillarId: 'observation', label: 'Observation', icon: Eye },
  { pillarId: 'reading-people', label: 'Reading People', icon: Users },
  { pillarId: 'second-brain', label: 'Second Brain', icon: BookOpen },
  { pillarId: 'trauma', label: 'Trauma Stabilization', icon: Heart },
]

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const settings = useTapasyaStore((s) => s.settings)
  const getDueCards = useTapasyaStore((s) => s.getDueCards)
  const completedLessons = useTapasyaStore((s) => s.completedLessons)
  const sessions = useTapasyaStore((s) => s.sessions)

  const dueCards = getDueCards()
  const dueCount = dueCards.length

  // Determine if trauma pillar has been accessed (user has at least started it)
  const hasOpenedTrauma = sessions.some((s) => s.pillar === 'trauma') ||
    completedLessons.some((id) => id.startsWith('trauma.'))

  const closeSidebar = useCallback(() => setSidebarOpen(false), [])

  const handleStopPause = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleStopResume = useCallback(() => {
    // Just close the dialog; user stays where they are
  }, [])

  // Check if a path is the active route
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  // Shared nav link renderer
  const NavLink = ({ to, icon: Icon, label, badge, show = true }) => {
    if (!show) return null
    const active = isActive(to)
    return (
      <Link
        to={to}
        onClick={closeSidebar}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-calm text-sm font-medium
          transition-all duration-quick ease-calm
          ${active
            ? 'bg-grounded-8 text-grounded border-l-2 border-accent-grounded -ml-px'
            : 'text-ink-secondary hover:text-ink-primary hover:bg-surface'
          }
        `}
        aria-current={active ? 'page' : undefined}
      >
        <Icon size={18} strokeWidth={active ? 2 : 1.5} />
        <span className="flex-1">{label}</span>
        {badge != null && badge > 0 && (
          <span className="badge badge-stilled text-xs px-2 py-0.5 min-w-[1.5rem] text-center">
            {badge}
          </span>
        )}
      </Link>
    )
  }

  const sidebarContent = (
    <nav className="flex flex-col h-full" aria-label="Main navigation">
      {/* Dashboard link */}
      <div className="px-3 pt-4 pb-2">
        <NavLink to="/" icon={Home} label="Dashboard" />
      </div>

      {/* Pillars section */}
      <div className="px-3 py-2">
        <p className="text-xs font-medium text-ink-tertiary uppercase tracking-wider px-3 mb-2">
          Pillars
        </p>
        <div className="space-y-0.5">
          {PILLAR_NAV.map(({ pillarId, label, icon }) => {
            // Trauma pillar only shows if user has opened it
            if (pillarId === 'trauma' && !hasOpenedTrauma) return null
            return (
              <NavLink
                key={pillarId}
                to={`/pillar/${pillarId}`}
                icon={icon}
                label={label}
              />
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <hr className="divider mx-6" />

      {/* Tools section */}
      <div className="px-3 py-2 space-y-0.5">
        <NavLink to="/review" icon={Layers} label="Review" badge={dueCount} />
        <NavLink to="/vault" icon={FileText} label="Vault" />
        <NavLink
          to="/checkin"
          icon={Circle}
          label="Check-in"
          show={settings.dailyCheckinEnabled}
        />
        <NavLink to="/settings" icon={Settings} label="Settings" />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Footer: Resources link */}
      <div className="px-6 py-4 border-t border-line-soft">
        <a
          href="https://988lifeline.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-ink-tertiary hover:text-ink-secondary transition-colors duration-quick"
        >
          Crisis resources (988 Lifeline)
        </a>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      {/* ---- Top bar ---- */}
      <header className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-sm border-b border-line-soft">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          {/* Left: hamburger (mobile) + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden btn-ghost p-2 rounded-calm"
              aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link
              to="/"
              className="flex items-center gap-2 group no-underline"
            >
              <span className="font-reading text-xl font-semibold text-ink-primary tracking-tight">
                Tapasya
              </span>
            </Link>
          </div>

          {/* Right: StopButton */}
          <StopButton
            onPause={handleStopPause}
            onResume={handleStopResume}
            className="!fixed !top-3 !right-4 z-50"
          />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ---- Sidebar (desktop: always visible, mobile: overlay) ---- */}

        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-60 xl:w-64 border-r border-line-soft bg-canvas overflow-y-auto shrink-0">
          {sidebarContent}
        </aside>

        {/* Mobile sidebar overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-30 bg-canvas/60 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={closeSidebar}
                aria-hidden="true"
              />
              {/* Drawer */}
              <motion.aside
                className="fixed inset-y-0 left-0 z-30 w-72 bg-canvas border-r border-line-soft overflow-y-auto lg:hidden"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Close button inside drawer */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-line-soft">
                  <span className="font-reading text-lg font-semibold text-ink-primary">
                    Tapasya
                  </span>
                  <button
                    onClick={closeSidebar}
                    className="btn-ghost p-2 rounded-calm"
                    aria-label="Close navigation"
                  >
                    <X size={18} />
                  </button>
                </div>
                {sidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ---- Main content ---- */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={location.pathname}
            {...pageTransition}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Layout

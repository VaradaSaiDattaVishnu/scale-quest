import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, FileText, ExternalLink } from 'lucide-react'
import useTapasyaStore, { PILLARS } from '../context/tapasyaStore'
import { BreathingDot } from './widgets'

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
}

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
}

const item = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
}

// ---------------------------------------------------------------------------
// PaceMeter -- the calm indicator at the top of the dashboard
// ---------------------------------------------------------------------------
function PaceMeter({ pace, message }) {
  const config = {
    rested: {
      dotColor: 'var(--color-accent-grounded)',
      animate: false,
      opacity: 0.7,
    },
    engaged: {
      dotColor: 'var(--color-accent-grounded)',
      animate: true,
      opacity: 0.75,
    },
    pushing: {
      dotColor: 'var(--color-accent-noticed)',
      animate: true,
      opacity: 0.8,
    },
    overrun: {
      dotColor: 'var(--color-accent-stilled)',
      animate: false,
      opacity: 0.6,
    },
  }

  const c = config[pace] || config.engaged

  return (
    <div className="flex items-center gap-4 mb-6">
      <motion.div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: c.dotColor,
          opacity: c.opacity,
        }}
        animate={
          c.animate
            ? {
                scale: pace === 'pushing' ? [1, 1.2, 1] : [1, 1.15, 1],
                opacity: [c.opacity - 0.1, c.opacity + 0.1, c.opacity - 0.1],
              }
            : { scale: 1, opacity: c.opacity }
        }
        transition={
          c.animate
            ? {
                duration: pace === 'pushing' ? 5 : 4,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.6, 1],
              }
            : { duration: 0 }
        }
        role="img"
        aria-label={`Current pace: ${pace}`}
      />
      <p className="text-sm text-ink-secondary font-reading leading-relaxed">
        {message}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Onboarding -- shown for first-time users
// ---------------------------------------------------------------------------
function Onboarding({ onComplete }) {
  const [name, setName] = useState('')
  const setUserName = useTapasyaStore((s) => s.setUserName)

  const handleBegin = () => {
    if (name.trim()) {
      setUserName(name.trim())
    }
    onComplete()
  }

  return (
    <motion.div
      className="max-w-md mx-auto px-6 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <BreathingDot size={32} className="mb-8" />

      <h1 className="font-reading text-3xl font-semibold text-ink-primary mb-4">
        Welcome to Tapasya
      </h1>

      <div className="font-reading text-ink-secondary leading-relaxed space-y-4 mb-8">
        <p>
          This is a personal learning space. It moves at your pace.
        </p>
        <p>
          There are no streaks, no scores, no pressure. You can stop at any time
          and nothing is lost.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="onboarding-name"
            className="block text-sm text-ink-tertiary mb-1.5"
          >
            What should we call you? (optional)
          </label>
          <input
            id="onboarding-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBegin()}
            placeholder="Your name"
            className="input"
            autoFocus
          />
        </div>

        <button
          onClick={handleBegin}
          className="btn btn-primary w-full"
        >
          Begin
        </button>
      </div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Pillar progress row
// ---------------------------------------------------------------------------
function PillarRow({ pillar }) {
  const completedLessons = useTapasyaStore((s) => s.completedLessons)

  const totalLessons = pillar.modules.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0
  )
  const completedCount = pillar.modules.reduce(
    (sum, mod) =>
      sum + mod.lessons.filter((l) => completedLessons.includes(l.id)).length,
    0
  )

  // Find which module the user is on
  const currentModuleIndex = pillar.modules.findIndex((mod) =>
    mod.lessons.some((l) => !completedLessons.includes(l.id))
  )
  const currentModule =
    currentModuleIndex >= 0 ? pillar.modules[currentModuleIndex] : null

  const completedModules = pillar.modules.filter((mod) =>
    mod.lessons.every((l) => completedLessons.includes(l.id))
  ).length

  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0

  return (
    <motion.div variants={item}>
      <Link
        to={`/pillar/${pillar.id}`}
        className="block card-flat hover:border-accent-stilled transition-all duration-normal no-underline group"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-ink-primary group-hover:text-accent-grounded transition-colors">
            {pillar.title}
          </h3>
          {completedCount > 0 && (
            <span className="text-xs text-ink-tertiary">
              Module {completedModules + (currentModule ? 1 : 0)} of{' '}
              {pillar.modules.length}
            </span>
          )}
        </div>

        {completedCount > 0 ? (
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        ) : (
          <p className="text-xs text-ink-tertiary">&mdash;</p>
        )}
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Dashboard -- the main component
// ---------------------------------------------------------------------------
function Home() {
  const navigate = useNavigate()

  const userName = useTapasyaStore((s) => s.userName)
  const notes = useTapasyaStore((s) => s.notes)
  const settings = useTapasyaStore((s) => s.settings)
  const completedLessons = useTapasyaStore((s) => s.completedLessons)
  const sessions = useTapasyaStore((s) => s.sessions)
  const getPacingSummary = useTapasyaStore((s) => s.getPacingSummary)
  const getNextLesson = useTapasyaStore((s) => s.getNextLesson)
  const getDueCards = useTapasyaStore((s) => s.getDueCards)

  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(
    // If user has a name or any progress, they have been onboarded
    () => !!(userName || completedLessons.length > 0 || sessions.length > 0)
  )

  const pacingSummary = getPacingSummary()
  const nextLesson = getNextLesson()
  const dueCards = getDueCards()
  const isOverrun = pacingSummary.pace === 'overrun'

  // Find which pillar and module the next lesson belongs to
  const nextLessonContext = useMemo(() => {
    if (!nextLesson) return null
    for (const pillar of PILLARS) {
      for (const mod of pillar.modules) {
        const lesson = mod.lessons.find((l) => l.id === nextLesson.id)
        if (lesson) {
          const moduleSlug = mod.id.split('.').slice(1).join('.')
          const lessonSlug = lesson.id.split('.').pop()
          return {
            pillarId: pillar.id,
            pillarTitle: pillar.title,
            moduleTitle: mod.title,
            moduleSlug,
            lessonSlug,
            lessonTitle: lesson.title,
          }
        }
      }
    }
    return null
  }, [nextLesson])

  // Pace message override for dashboard display
  const paceMessages = {
    rested: 'Rest is part of the practice.',
    engaged: 'Steady.',
    pushing: "You've been working a lot. Consider a lighter day.",
    overrun:
      'Your nervous system has been signaling. Today is a rest day.',
  }

  // Recent notes for the dashboard
  const recentNotes = useMemo(() => {
    return [...notes]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, 5)
  }, [notes])

  // Review estimate: ~2 minutes per 5 cards
  const reviewMinutes = Math.max(1, Math.ceil((dueCards.length / 5) * 2))

  // Has the user accessed the trauma pillar?
  const hasOpenedTrauma =
    sessions.some((s) => s.pillar === 'trauma') ||
    completedLessons.some((id) => id.startsWith('trauma.'))

  // Which pillars to show (all except trauma if not opened)
  const visiblePillars = PILLARS.filter(
    (p) => p.id !== 'trauma' || hasOpenedTrauma
  )

  // Show onboarding for first-time users
  if (!hasSeenOnboarding) {
    return <Onboarding onComplete={() => setHasSeenOnboarding(true)} />
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 lg:py-14">
      <motion.div {...fadeIn}>
        {/* Pace indicator */}
        <PaceMeter
          pace={pacingSummary.pace}
          message={paceMessages[pacingSummary.pace]}
        />

        {/* ---- Action cards ---- */}
        <motion.div
          className="space-y-3 mb-10"
          variants={stagger}
          initial="initial"
          animate="animate"
        >
          {/* Continue lesson -- hidden during overrun */}
          {!isOverrun && nextLessonContext && (
            <motion.div variants={item}>
              <Link
                to={`/pillar/${nextLessonContext.pillarId}/${nextLessonContext.moduleSlug}/${nextLessonContext.lessonSlug}`}
                className="card flex items-center justify-between group no-underline hover:border-accent-grounded"
              >
                <div>
                  <p className="text-xs text-ink-tertiary mb-1">Continue</p>
                  <p className="text-sm font-medium text-ink-primary group-hover:text-accent-grounded transition-colors">
                    {nextLessonContext.pillarTitle}: {nextLessonContext.moduleTitle}
                  </p>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    {nextLessonContext.lessonTitle}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="text-ink-tertiary group-hover:text-accent-grounded transition-colors shrink-0 ml-4"
                />
              </Link>
            </motion.div>
          )}

          {/* Overrun: show resources link instead */}
          {isOverrun && (
            <motion.div variants={item}>
              <a
                href="https://988lifeline.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="card flex items-center justify-between group no-underline hover:border-accent-stilled"
              >
                <div>
                  <p className="text-sm font-medium text-ink-primary">
                    Open resources
                  </p>
                  <p className="text-xs text-ink-secondary mt-0.5">
                    Crisis lines and support options
                  </p>
                </div>
                <ExternalLink
                  size={16}
                  className="text-ink-tertiary shrink-0 ml-4"
                />
              </a>
            </motion.div>
          )}

          {/* Review card */}
          {dueCards.length > 0 && !isOverrun && (
            <motion.div variants={item}>
              <Link
                to="/review"
                className="card-flat flex items-center justify-between group no-underline hover:border-accent-stilled"
              >
                <div>
                  <p className="text-sm text-ink-primary">
                    Today's review:{' '}
                    <span className="font-medium">
                      {dueCards.length} card{dueCards.length !== 1 ? 's' : ''}
                    </span>{' '}
                    <span className="text-ink-tertiary">
                      (~{reviewMinutes} min)
                    </span>
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-ink-tertiary group-hover:text-accent-stilled transition-colors shrink-0 ml-4"
                />
              </Link>
            </motion.div>
          )}

          {/* Check-in (optional) */}
          {settings.dailyCheckinEnabled && !isOverrun && (
            <motion.div variants={item}>
              <Link
                to="/checkin"
                className="card-flat flex items-center justify-between group no-underline hover:border-accent-stilled"
              >
                <p className="text-sm text-ink-secondary">
                  Check-in{' '}
                  <span className="text-ink-tertiary">(optional)</span>
                </p>
                <ArrowRight
                  size={16}
                  className="text-ink-tertiary group-hover:text-ink-secondary transition-colors shrink-0 ml-4"
                />
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* ---- Pillars ---- */}
        <section className="mb-10">
          <h2 className="text-xs font-medium text-ink-tertiary uppercase tracking-wider mb-4">
            Pillars
          </h2>
          <motion.div
            className="space-y-3"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {visiblePillars.map((pillar) => (
              <PillarRow key={pillar.id} pillar={pillar} />
            ))}
          </motion.div>

          {/* Vault note count */}
          {notes.length > 0 && (
            <motion.div variants={item} className="mt-3">
              <Link
                to="/vault"
                className="card-flat flex items-center gap-3 no-underline hover:border-accent-stilled transition-all duration-normal group"
              >
                <FileText
                  size={16}
                  className="text-ink-tertiary group-hover:text-accent-stilled transition-colors"
                />
                <span className="text-sm text-ink-secondary">
                  Vault: {notes.length} note{notes.length !== 1 ? 's' : ''}
                </span>
              </Link>
            </motion.div>
          )}
        </section>

        {/* ---- Recent notes ---- */}
        {recentNotes.length > 0 && (
          <section>
            <h2 className="text-xs font-medium text-ink-tertiary uppercase tracking-wider mb-3">
              Recent notes
            </h2>
            <ul className="space-y-1.5">
              {recentNotes.map((note) => (
                <li key={note.id}>
                  <Link
                    to="/vault"
                    className="text-sm text-ink-secondary hover:text-ink-primary transition-colors no-underline"
                  >
                    {note.title || 'Untitled note'}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </motion.div>
    </div>
  )
}

export default Home

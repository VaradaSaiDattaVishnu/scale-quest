import { useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Clock, AlertTriangle } from 'lucide-react'
import useTapasyaStore, { PILLARS } from '../context/tapasyaStore'

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------
const stagger = {
  animate: { transition: { staggerChildren: 0.04 } },
}

const item = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
}

// ---------------------------------------------------------------------------
// Lesson card
// ---------------------------------------------------------------------------
function LessonCard({ pillarId, moduleSlug, lesson, index, completed }) {
  const lessonSlug = lesson.id.split('.').pop()

  // Detect sensitive content from lesson ID (trauma pillar)
  const isSensitive = lesson.id.startsWith('trauma.')

  return (
    <motion.div variants={item}>
      <Link
        to={`/pillar/${pillarId}/${moduleSlug}/${lessonSlug}`}
        className="lesson-card flex items-center justify-between group no-underline"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Completion indicator */}
          {completed ? (
            <CheckCircle2
              size={16}
              className="text-accent-grounded shrink-0"
              aria-label="Completed"
            />
          ) : (
            <span
              className="w-4 h-4 rounded-full border border-line-soft shrink-0"
              aria-label="Not yet completed"
            />
          )}

          <div className="min-w-0 flex-1">
            <p
              className={`text-sm font-medium truncate transition-colors ${
                completed
                  ? 'text-ink-secondary'
                  : 'text-ink-primary group-hover:text-accent-grounded'
              }`}
            >
              {lesson.title}
            </p>

            {/* Metadata row */}
            <div className="flex items-center gap-2 mt-0.5">
              {isSensitive && (
                <span className="flex items-center gap-1 text-xs text-accent-noticed">
                  <AlertTriangle size={11} />
                  <span>Sensitive content</span>
                </span>
              )}
            </div>
          </div>
        </div>

        <ChevronRight
          size={14}
          className="text-ink-tertiary group-hover:text-accent-grounded transition-colors shrink-0 ml-2"
        />
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// ModuleOverview
// ---------------------------------------------------------------------------
function ModuleOverview() {
  const { pillarId, moduleSlug } = useParams()
  const completedLessons = useTapasyaStore((s) => s.completedLessons)
  const setCurrentModule = useTapasyaStore((s) => s.setCurrentModule)
  const setCurrentPillar = useTapasyaStore((s) => s.setCurrentPillar)

  // Resolve pillar and module from params
  const pillar = useMemo(
    () => PILLARS.find((p) => p.id === pillarId),
    [pillarId]
  )

  const mod = useMemo(() => {
    if (!pillar) return null
    // Module ID = pillarId.moduleSlug  e.g. 'memory.foundations'
    const fullModuleId = `${pillarId}.${moduleSlug}`
    return pillar.modules.find((m) => m.id === fullModuleId) || null
  }, [pillar, pillarId, moduleSlug])

  // Update store navigation context when entering a module
  useEffect(() => {
    if (pillar && mod) {
      setCurrentPillar(pillar.id)
      setCurrentModule(mod.id)
    }
  }, [pillar, mod, setCurrentPillar, setCurrentModule])

  // Lesson completion data
  const lessonsWithStatus = useMemo(() => {
    if (!mod) return []
    return mod.lessons.map((l) => ({
      ...l,
      completed: completedLessons.includes(l.id),
    }))
  }, [mod, completedLessons])

  const completedCount = lessonsWithStatus.filter((l) => l.completed).length
  const totalCount = lessonsWithStatus.length
  const allDone = completedCount === totalCount && totalCount > 0

  // Learning goals from the module description
  // (The description serves as the learning goal in this curriculum)

  if (!pillar || !mod) {
    return (
      <div className="max-w-reading mx-auto px-6 py-16">
        <p className="text-ink-secondary font-reading">
          Module not found.{' '}
          <Link to={pillar ? `/pillar/${pillarId}` : '/'} className="text-accent-stilled">
            Go back
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 lg:py-14">
      {/* Breadcrumb */}
      <nav className="text-xs text-ink-tertiary mb-6" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-ink-secondary transition-colors">
          Dashboard
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link
          to={`/pillar/${pillarId}`}
          className="hover:text-ink-secondary transition-colors"
        >
          {pillar.title}
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-secondary">{mod.title}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-2xl font-semibold text-ink-primary mb-2">
          {mod.title}
        </h1>

        <p className="font-reading text-ink-secondary leading-relaxed mb-3 max-w-reading">
          {mod.description}
        </p>

        {/* Progress summary */}
        <div className="flex items-center gap-4 text-xs text-ink-tertiary mb-6">
          <span>
            {totalCount} lesson{totalCount !== 1 ? 's' : ''}
          </span>
          {completedCount > 0 && (
            <>
              <span aria-hidden="true">&#183;</span>
              <span>
                {completedCount} completed
              </span>
            </>
          )}
          {allDone && (
            <>
              <span aria-hidden="true">&#183;</span>
              <span className="text-accent-grounded flex items-center gap-1">
                <CheckCircle2 size={12} />
                All done
              </span>
            </>
          )}
        </div>

        {/* Progress bar */}
        {completedCount > 0 && (
          <div className="progress-track mb-8 max-w-xs">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalCount) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        )}
      </motion.div>

      {/* Lesson list */}
      <motion.div
        className="space-y-2"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {lessonsWithStatus.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            pillarId={pillarId}
            moduleSlug={moduleSlug}
            lesson={lesson}
            index={index}
            completed={lesson.completed}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default ModuleOverview

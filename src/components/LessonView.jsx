import { useMemo, useEffect, useCallback, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react'
import useTapasyaStore, { PILLARS } from '../context/tapasyaStore'
import contentRegistry from '../content/registry'

// ---------------------------------------------------------------------------
// LessonView
// ---------------------------------------------------------------------------
function LessonView() {
  const { pillarId, moduleSlug, lessonSlug } = useParams()
  const navigate = useNavigate()
  const topRef = useRef(null)

  const completedLessons = useTapasyaStore((s) => s.completedLessons)
  const completeLesson = useTapasyaStore((s) => s.completeLesson)
  const setCurrentLesson = useTapasyaStore((s) => s.setCurrentLesson)
  const setCurrentModule = useTapasyaStore((s) => s.setCurrentModule)
  const setCurrentPillar = useTapasyaStore((s) => s.setCurrentPillar)
  const startSession = useTapasyaStore((s) => s.startSession)
  const endSession = useTapasyaStore((s) => s.endSession)
  const savePromptAnswer = useTapasyaStore((s) => s.savePromptAnswer)

  // Resolve pillar, module, lesson from URL params
  const pillar = useMemo(
    () => PILLARS.find((p) => p.id === pillarId),
    [pillarId]
  )

  const mod = useMemo(() => {
    if (!pillar) return null
    const fullModuleId = `${pillarId}.${moduleSlug}`
    return pillar.modules.find((m) => m.id === fullModuleId) || null
  }, [pillar, pillarId, moduleSlug])

  const lesson = useMemo(() => {
    if (!mod) return null
    // Lesson ID is the full dotted path, e.g. 'memory.foundations.what-is-memory'
    // lessonSlug is just the last segment, e.g. 'what-is-memory'
    return mod.lessons.find((l) => l.id.endsWith(`.${lessonSlug}`)) || null
  }, [mod, lessonSlug])

  // Previous/next lesson navigation
  const { prevLesson, nextLesson, lessonIndex } = useMemo(() => {
    if (!mod || !lesson) return { prevLesson: null, nextLesson: null, lessonIndex: -1 }
    const idx = mod.lessons.findIndex((l) => l.id === lesson.id)
    return {
      prevLesson: idx > 0 ? mod.lessons[idx - 1] : null,
      nextLesson: idx < mod.lessons.length - 1 ? mod.lessons[idx + 1] : null,
      lessonIndex: idx,
    }
  }, [mod, lesson])

  // Look up actual content component from registry
  const ContentComponent = lesson ? contentRegistry[lesson.id] || null : null

  const isCompleted = lesson ? completedLessons.includes(lesson.id) : false
  const isSensitive = lesson ? lesson.id.startsWith('trauma.') : false

  // Track session for this lesson
  const sessionIdRef = useRef(null)

  useEffect(() => {
    if (pillar && mod && lesson) {
      setCurrentPillar(pillar.id)
      setCurrentModule(mod.id)
      setCurrentLesson(lesson.id)

      // Start a session
      const sid = startSession(pillar.id, mod.id)
      sessionIdRef.current = sid

      return () => {
        // End session when leaving
        if (sessionIdRef.current) {
          endSession(sessionIdRef.current)
          sessionIdRef.current = null
        }
      }
    }
  }, [pillar?.id, mod?.id, lesson?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Scroll to top when lesson changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [lessonSlug])

  // Mark lesson done
  const handleComplete = useCallback(() => {
    if (lesson) {
      completeLesson(lesson.id)
    }
  }, [lesson, completeLesson])

  // Navigate to a sibling lesson
  const goToLesson = useCallback(
    (l) => {
      if (!l) return
      const slug = l.id.split('.').pop()
      navigate(`/pillar/${pillarId}/${moduleSlug}/${slug}`)
    },
    [navigate, pillarId, moduleSlug]
  )

  // Handle prompt ratings from inline Prompt widgets
  const handlePromptRate = useCallback(
    ({ id, rating, userAnswer }) => {
      if (lesson) {
        savePromptAnswer({
          lessonId: lesson.id,
          promptKey: id,
          answer: userAnswer,
        })
      }
    },
    [lesson, savePromptAnswer]
  )

  // Not found states
  if (!pillar || !mod || !lesson) {
    return (
      <div className="max-w-reading mx-auto px-6 py-16">
        <p className="text-ink-secondary font-reading">
          Lesson not found.{' '}
          <Link
            to={mod ? `/pillar/${pillarId}/${moduleSlug}` : pillar ? `/pillar/${pillarId}` : '/'}
            className="text-accent-stilled"
          >
            Go back
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 lg:py-14" ref={topRef}>
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
        <Link
          to={`/pillar/${pillarId}/${moduleSlug}`}
          className="hover:text-ink-secondary transition-colors"
        >
          {mod.title}
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-secondary">{lesson.title}</span>
      </nav>

      {/* Back to module link */}
      <Link
        to={`/pillar/${pillarId}/${moduleSlug}`}
        className="inline-flex items-center gap-1.5 text-sm text-ink-tertiary hover:text-ink-secondary transition-colors mb-6 no-underline"
      >
        <ArrowLeft size={14} />
        {mod.title}
      </Link>

      <motion.article
        className="prose"
        data-reading
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Lesson position */}
        <p className="text-xs text-ink-tertiary mb-2 font-ui">
          Lesson {lessonIndex + 1} of {mod.lessons.length}
        </p>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-ink-primary mb-4 font-ui">
          {lesson.title}
        </h1>

        {/* Sensitive content warning */}
        {isSensitive && (
          <div className="bg-noticed-8 border border-noticed-20 rounded-calm p-4 mb-6 not-prose">
            <div className="flex items-start gap-2.5">
              <AlertTriangle
                size={16}
                className="text-accent-noticed shrink-0 mt-0.5"
              />
              <div>
                <p className="text-sm text-ink-primary font-medium font-ui">
                  Sensitive content
                </p>
                <p className="text-xs text-ink-secondary mt-1 font-reading">
                  This lesson touches on trauma-related material. Go at your own
                  pace. The stop button (or Esc) is always available.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Lesson content -- render actual content component if available */}
        {ContentComponent ? (
          <div className="not-prose">
            <ContentComponent
              onComplete={handleComplete}
              learnTerm={() => {}}
              addJournalEntry={(entry) => {
                savePromptAnswer({
                  lessonId: lesson.id,
                  promptKey: `journal-${Date.now()}`,
                  answer: typeof entry === 'string' ? entry : JSON.stringify(entry),
                })
              }}
              savePromptAnswer={(data) => {
                savePromptAnswer({
                  lessonId: lesson.id,
                  promptKey: data.id || data.promptKey || `prompt-${Date.now()}`,
                  answer: data.answer || data.userAnswer || '',
                })
              }}
            />
          </div>
        ) : (
          <div className="font-reading text-ink-secondary leading-relaxed space-y-4 mb-8">
            <p>
              This lesson is being written. Check back soon -- the content will
              appear here with interactive exercises at natural pause points.
            </p>
          </div>
        )}
      </motion.article>

      {/* ---- Completion and navigation ---- */}
      <div className="mt-12 pt-6 border-t border-line-soft">
        {/* Completion button */}
        {!isCompleted ? (
          <motion.button
            onClick={handleComplete}
            className="btn btn-secondary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.28 }}
          >
            I'm done with this for now
          </motion.button>
        ) : (
          <p className="text-sm text-accent-grounded mb-8 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-grounded inline-block" />
            Completed
          </p>
        )}

        {/* Previous / Next navigation */}
        <div className="flex items-center justify-between">
          {prevLesson ? (
            <button
              onClick={() => goToLesson(prevLesson)}
              className="btn btn-ghost text-sm flex items-center gap-1.5"
            >
              <ChevronLeft size={16} />
              {prevLesson.title}
            </button>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <button
              onClick={() => goToLesson(nextLesson)}
              className="btn btn-ghost text-sm flex items-center gap-1.5"
            >
              {nextLesson.title}
              <ChevronRight size={16} />
            </button>
          ) : (
            <Link
              to={`/pillar/${pillarId}/${moduleSlug}`}
              className="btn btn-ghost text-sm no-underline"
            >
              Back to {mod.title}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default LessonView

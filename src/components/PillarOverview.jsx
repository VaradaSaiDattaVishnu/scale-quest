import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, ChevronRight, CheckCircle2 } from 'lucide-react'
import useTapasyaStore, { PILLARS } from '../context/tapasyaStore'

// ---------------------------------------------------------------------------
// Animation
// ---------------------------------------------------------------------------
const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
}

const item = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
}

// ---------------------------------------------------------------------------
// Module card
// ---------------------------------------------------------------------------
function ModuleCard({ pillarId, mod, unlocked, lockReason, lessons }) {
  const completedCount = lessons.filter((l) => l.completed).length
  const totalCount = lessons.length
  const allDone = completedCount === totalCount && totalCount > 0
  const hasStarted = completedCount > 0

  // Module slug: everything after the first dot in the module ID
  // e.g., 'memory.foundations' -> 'foundations'
  const moduleSlug = mod.id.split('.').slice(1).join('.')

  if (!unlocked) {
    return (
      <motion.div
        variants={item}
        className="card-flat opacity-70 cursor-default"
      >
        <div className="flex items-start gap-3">
          <Lock size={16} className="text-ink-tertiary mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-ink-tertiary">
              {mod.title}
            </h3>
            {lockReason && (
              <p className="text-xs text-ink-tertiary mt-1 font-reading leading-relaxed">
                {lockReason}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div variants={item}>
      <Link
        to={`/pillar/${pillarId}/${moduleSlug}`}
        className="card flex items-start justify-between group no-underline hover:border-accent-grounded transition-all duration-normal"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {allDone && (
              <CheckCircle2
                size={15}
                className="text-accent-grounded shrink-0"
              />
            )}
            <h3 className="text-sm font-medium text-ink-primary group-hover:text-accent-grounded transition-colors truncate">
              {mod.title}
            </h3>
          </div>

          <p className="text-xs text-ink-secondary font-reading leading-relaxed line-clamp-2 mb-2">
            {mod.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-ink-tertiary">
            <span>
              {totalCount} lesson{totalCount !== 1 ? 's' : ''}
            </span>
            {hasStarted && (
              <>
                <span aria-hidden="true">&#183;</span>
                <span>
                  {completedCount} completed
                </span>
              </>
            )}
          </div>

          {/* Small progress bar if started but not finished */}
          {hasStarted && !allDone && (
            <div className="progress-track mt-2 max-w-[200px]">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{
                  width: `${(completedCount / totalCount) * 100}%`,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          )}
        </div>

        <ChevronRight
          size={16}
          className="text-ink-tertiary group-hover:text-accent-grounded transition-colors shrink-0 mt-0.5 ml-3"
        />
      </Link>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// PillarOverview
// ---------------------------------------------------------------------------
function PillarOverview() {
  const { pillarId } = useParams()
  const getLessonsByPillar = useTapasyaStore((s) => s.getLessonsByPillar)

  const pillar = useMemo(
    () => PILLARS.find((p) => p.id === pillarId),
    [pillarId]
  )

  const modulesData = getLessonsByPillar(pillarId)

  if (!pillar) {
    return (
      <div className="max-w-reading mx-auto px-6 py-16">
        <p className="text-ink-secondary font-reading">
          Pillar not found. <Link to="/" className="text-accent-stilled">Return to dashboard</Link>.
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
        <span className="text-ink-secondary">{pillar.title}</span>
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-2xl font-semibold text-ink-primary mb-2">
          {pillar.title}
        </h1>
        <p className="font-reading text-ink-secondary leading-relaxed mb-8 max-w-reading">
          {pillar.description}
        </p>

        {pillar.ethicsGated && (
          <div className="feedback-noticed mb-6">
            <p className="text-sm text-ink-secondary font-reading">
              Every module in this pillar is ethics-gated. This knowledge carries
              responsibility. The first module covers why.
            </p>
          </div>
        )}

        {pillar.traumaPaced && (
          <div className="bg-stilled-8 border border-stilled-20 rounded-calm p-4 mb-6">
            <p className="text-sm text-ink-secondary font-reading">
              This pillar is paced deliberately. Each module requires 14 days,
              completion of the previous module, and regular check-ins. There is
              no hurry. Integration takes as long as it takes.
            </p>
          </div>
        )}
      </motion.div>

      {/* Module list */}
      <motion.div
        className="space-y-3"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {modulesData.map((modData) => {
          const mod = pillar.modules.find((m) => m.id === modData.moduleId)
          if (!mod) return null

          return (
            <ModuleCard
              key={mod.id}
              pillarId={pillarId}
              mod={mod}
              unlocked={modData.unlocked}
              lockReason={modData.lockReason}
              lessons={modData.lessons}
            />
          )
        })}
      </motion.div>
    </div>
  )
}

export default PillarOverview

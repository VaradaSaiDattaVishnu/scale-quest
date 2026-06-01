import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SpacingEffectViz -- Side-by-side comparison: cramming vs spacing.
 * Both animate simultaneously so the user can SEE the difference.
 * Interactive: user can adjust spacing and watch the effect change.
 *
 * Props:
 *   autoPlay  -- boolean
 */

const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7']

// Cramming: all study on day 1, rapid decay
function crammingRetention(day) {
  if (day === 0) return 0.95
  return Math.max(0.95 * Math.exp(-day * 0.5), 0.05)
}

// Spaced: study on days 1, 3, 6 -- each review boosts and slows decay
function spacedRetention(day, sessions) {
  let retention = 0
  let stability = 0.8

  sessions.forEach((sessionDay) => {
    if (day >= sessionDay) {
      const elapsed = day - sessionDay
      const contribution = 0.85 * Math.exp(-elapsed * (0.35 / stability))
      retention = Math.min(retention + contribution * 0.6, 0.98)
      stability += 0.4
    }
  })

  return Math.max(retention, 0.05)
}

export default function SpacingEffectViz({ autoPlay = false }) {
  const [spacingDays, setSpacingDays] = useState([0, 2, 5])
  const [animDay, setAnimDay] = useState(-1) // -1 = not animating
  const [isPlaying, setIsPlaying] = useState(false)
  const animRef = useRef(null)

  const totalStudyTime = spacingDays.length

  // Animate through days
  const play = useCallback(() => {
    setIsPlaying(true)
    setAnimDay(0)
  }, [])

  useEffect(() => {
    if (!isPlaying || animDay < 0) return
    if (animDay >= DAYS.length) {
      setIsPlaying(false)
      return
    }

    const timeout = setTimeout(() => {
      setAnimDay((d) => d + 1)
    }, 800)

    return () => clearTimeout(timeout)
  }, [isPlaying, animDay])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setAnimDay(-1)
  }, [])

  const visibleDays = animDay >= 0 ? Math.min(animDay + 1, DAYS.length) : DAYS.length

  const barWidth = 36
  const barMaxHeight = 160

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6">
        {/* CRAMMING side */}
        <div className="rounded-gentle border border-line-soft bg-surface p-4">
          <div className="text-center mb-4">
            <p className="font-ui text-sm font-semibold text-ink-primary">Cramming</p>
            <p className="text-[10px] font-ui text-ink-tertiary">All study in one session</p>
          </div>

          {/* Study session indicator */}
          <div className="flex justify-center gap-1 mb-3">
            {DAYS.map((_, i) => (
              <div
                key={`cram-study-${i}`}
                className={`w-5 h-1.5 rounded-full ${i === 0 ? 'bg-accent-noticed' : 'bg-line-soft'}`}
              />
            ))}
          </div>

          {/* Retention bars */}
          <div className="flex items-end justify-center gap-1" style={{ height: `${barMaxHeight + 30}px` }}>
            {DAYS.map((label, i) => {
              if (i >= visibleDays) return <div key={`cram-${i}`} style={{ width: barWidth }} />
              const retention = crammingRetention(i)
              const height = retention * barMaxHeight

              return (
                <div key={`cram-${i}`} className="flex flex-col items-center" style={{ width: barWidth }}>
                  <motion.div
                    className="rounded-t-sm overflow-hidden relative"
                    style={{
                      width: barWidth - 4,
                      backgroundColor: retention > 0.5 ? '#B89466' : '#A66B5A',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      className="absolute top-1 left-0 right-0 text-center text-[8px] font-ui font-bold text-white"
                      animate={{ opacity: retention > 0.15 ? 1 : 0 }}
                    >
                      {Math.round(retention * 100)}
                    </motion.span>
                  </motion.div>
                  <span className="text-[8px] font-ui text-ink-tertiary mt-1 leading-none">
                    {label.replace('Day ', 'D')}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* SPACING side */}
        <div className="rounded-gentle border border-line-soft bg-surface p-4">
          <div className="text-center mb-4">
            <p className="font-ui text-sm font-semibold text-ink-primary">Spaced Practice</p>
            <p className="text-[10px] font-ui text-ink-tertiary">Same time, spread across days</p>
          </div>

          {/* Study session indicators */}
          <div className="flex justify-center gap-1 mb-3">
            {DAYS.map((_, i) => (
              <div
                key={`space-study-${i}`}
                className={`w-5 h-1.5 rounded-full ${spacingDays.includes(i) ? 'bg-accent-grounded' : 'bg-line-soft'}`}
              />
            ))}
          </div>

          {/* Retention bars */}
          <div className="flex items-end justify-center gap-1" style={{ height: `${barMaxHeight + 30}px` }}>
            {DAYS.map((label, i) => {
              if (i >= visibleDays) return <div key={`space-${i}`} style={{ width: barWidth }} />
              const retention = spacedRetention(i, spacingDays)
              const height = retention * barMaxHeight
              const isStudyDay = spacingDays.includes(i)

              return (
                <div key={`space-${i}`} className="flex flex-col items-center" style={{ width: barWidth }}>
                  <motion.div
                    className="rounded-t-sm overflow-hidden relative"
                    style={{
                      width: barWidth - 4,
                      backgroundColor: retention > 0.6 ? '#4F7A5A' : retention > 0.3 ? '#B89466' : '#A66B5A',
                    }}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      className="absolute top-1 left-0 right-0 text-center text-[8px] font-ui font-bold text-white"
                      animate={{ opacity: retention > 0.15 ? 1 : 0 }}
                    >
                      {Math.round(retention * 100)}
                    </motion.span>
                  </motion.div>
                  <span className="text-[8px] font-ui text-ink-tertiary mt-1 leading-none">
                    {label.replace('Day ', 'D')}
                  </span>
                  {isStudyDay && (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-accent-grounded mt-0.5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Final comparison */}
      <AnimatePresence>
        {(animDay >= DAYS.length || animDay < 0) && (
          <motion.div
            className="mt-4 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <p className="text-lg font-ui font-bold" style={{ color: '#A66B5A' }}>
                {Math.round(crammingRetention(6) * 100)}%
              </p>
              <p className="text-[10px] font-ui text-ink-tertiary">retained after 7 days</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-ui font-bold" style={{ color: '#4F7A5A' }}>
                {Math.round(spacedRetention(6, spacingDays) * 100)}%
              </p>
              <p className="text-[10px] font-ui text-ink-tertiary">retained after 7 days</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacing adjuster */}
      <div className="mt-4 bg-surface rounded-calm border border-line-soft p-3">
        <p className="text-xs font-ui text-ink-secondary mb-2 text-center">
          Adjust when study sessions happen (right side):
        </p>
        <div className="flex justify-center gap-2">
          {DAYS.map((label, i) => (
            <button
              key={`toggle-${i}`}
              onClick={() => {
                setSpacingDays((prev) =>
                  prev.includes(i)
                    ? prev.filter((d) => d !== i)
                    : [...prev, i].sort()
                )
                reset()
              }}
              className={`
                w-8 h-8 rounded-calm text-[10px] font-ui font-medium border transition-all
                ${spacingDays.includes(i)
                  ? 'bg-grounded-15 border-grounded-30 text-grounded'
                  : 'bg-elevated border-line-soft text-ink-tertiary hover:border-grounded-30'
                }
              `}
              aria-label={`${spacingDays.includes(i) ? 'Remove' : 'Add'} study on ${label}`}
            >
              D{i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Play controls */}
      <div className="flex items-center justify-center gap-3 mt-3">
        {!isPlaying ? (
          <button onClick={play} className="btn btn-primary text-sm">
            {animDay >= DAYS.length ? 'Replay' : 'Watch Both Decay'}
          </button>
        ) : (
          <button onClick={() => setIsPlaying(false)} className="btn btn-secondary text-sm">
            Pause
          </button>
        )}
        {animDay > 0 && (
          <button onClick={reset} className="btn btn-ghost text-sm">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

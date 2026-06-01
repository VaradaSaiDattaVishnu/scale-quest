import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * InteractiveTimeline -- Horizontal timeline showing memory strength over time.
 * Users can drag review tokens to time points to watch memory bars boost.
 * Shows the concept of spacing without text explanation.
 *
 * Props:
 *   compact  -- boolean, smaller variant
 */

const TIME_POINTS = [
  { id: '10min', label: '10 min', x: 10 },
  { id: '1hr', label: '1 hour', x: 25 },
  { id: '1day', label: '1 day', x: 45 },
  { id: '1week', label: '1 week', x: 65 },
  { id: '1month', label: '1 month', x: 85 },
]

// How much memory decays at each point (without review)
const BASE_DECAY = {
  '10min': 0.85,
  '1hr': 0.55,
  '1day': 0.33,
  '1week': 0.20,
  '1month': 0.10,
}

// How much a review at a given point boosts subsequent retention
const REVIEW_BOOST = 0.45

export default function InteractiveTimeline({ compact = false }) {
  const [reviews, setReviews] = useState({}) // timePointId -> true
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(null)

  const toggleReview = useCallback((timePointId) => {
    setReviews((prev) => {
      const next = { ...prev }
      if (next[timePointId]) {
        delete next[timePointId]
      } else {
        next[timePointId] = true
      }
      return next
    })
  }, [])

  const resetAll = useCallback(() => {
    setReviews({})
  }, [])

  // Calculate retention at each time point based on reviews
  const calculateRetention = useCallback(() => {
    const retentions = {}
    let currentRetention = 1.0
    let reviewCount = 0

    TIME_POINTS.forEach((tp) => {
      // Apply base decay
      currentRetention = BASE_DECAY[tp.id] + reviewCount * 0.08

      // If there's a review at this point, boost
      if (reviews[tp.id]) {
        currentRetention = Math.min(currentRetention + REVIEW_BOOST, 0.98)
        reviewCount++
      }

      retentions[tp.id] = Math.max(Math.min(currentRetention, 1), 0.05)
    })

    return retentions
  }, [reviews])

  const retentions = calculateRetention()
  const reviewCount = Object.keys(reviews).length

  const barHeight = compact ? 120 : 180
  const getBarColor = (retention) => {
    if (retention > 0.7) return '#4F7A5A' // sage
    if (retention > 0.4) return '#B89466' // amber
    return '#A66B5A' // terracotta
  }

  return (
    <div className="w-full">
      <div className="relative" style={{ minHeight: compact ? '220px' : '300px' }}>
        {/* Timeline bar */}
        <div className="absolute bottom-12 left-4 right-4 h-1 bg-line-soft rounded-full" />

        {/* Time points with memory bars */}
        <div className="relative flex justify-between px-4" style={{ paddingTop: '20px' }}>
          {TIME_POINTS.map((tp) => {
            const retention = retentions[tp.id]
            const hasReview = reviews[tp.id]
            const height = retention * barHeight

            return (
              <div
                key={tp.id}
                className="flex flex-col items-center relative"
                style={{ width: `${100 / TIME_POINTS.length}%` }}
              >
                {/* Memory strength bar */}
                <div
                  className="relative flex items-end justify-center"
                  style={{ height: `${barHeight}px`, width: '100%' }}
                >
                  <motion.div
                    className="relative rounded-t-calm overflow-hidden"
                    style={{
                      width: compact ? '32px' : '44px',
                      backgroundColor: getBarColor(retention),
                    }}
                    animate={{ height }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Retention percentage */}
                    <motion.span
                      className="absolute top-1 left-0 right-0 text-center text-[10px] font-ui font-bold text-white"
                      animate={{ opacity: retention > 0.2 ? 1 : 0 }}
                    >
                      {Math.round(retention * 100)}%
                    </motion.span>

                    {/* Shine effect */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                      }}
                    />
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="relative mt-2">
                  <div className="w-3 h-3 rounded-full bg-surface border-2 border-line-soft" />
                </div>

                {/* Time label */}
                <span className="text-[10px] font-ui text-ink-tertiary mt-1 text-center">
                  {tp.label}
                </span>

                {/* Review button */}
                <motion.button
                  onClick={() => toggleReview(tp.id)}
                  onMouseEnter={() => setHovered(tp.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`
                    mt-2 w-8 h-8 rounded-full flex items-center justify-center
                    border-2 transition-all text-sm
                    ${hasReview
                      ? 'bg-grounded-15 border-grounded-30 text-grounded'
                      : 'bg-surface border-dashed border-line-soft text-ink-tertiary hover:border-grounded-30 hover:text-grounded cursor-pointer'
                    }
                  `}
                  animate={
                    hasReview
                      ? { scale: [1, 1.1, 1] }
                      : hovered === tp.id
                      ? { scale: 1.1 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                  aria-label={`${hasReview ? 'Remove' : 'Add'} review at ${tp.label}`}
                >
                  {hasReview ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </motion.button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend / instruction */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
          <span className="text-[10px] font-ui text-ink-tertiary">Strong</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B89466' }} />
          <span className="text-[10px] font-ui text-ink-tertiary">Fading</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#A66B5A' }} />
          <span className="text-[10px] font-ui text-ink-tertiary">Nearly gone</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <p className="text-xs text-ink-tertiary font-ui">
          Tap the + buttons to add reviews at each time point
        </p>
        {reviewCount > 0 && (
          <button onClick={resetAll} className="text-xs font-ui text-accent-stilled hover:text-ink-primary transition-colors">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

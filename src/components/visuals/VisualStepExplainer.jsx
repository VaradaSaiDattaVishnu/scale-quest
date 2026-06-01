import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * VisualStepExplainer -- Brilliant.org-style step-by-step visual teaching.
 * Each step is a full-size visual with a short caption (1-2 sentences MAX).
 * The visual IS the explanation. The caption just names what you are seeing.
 *
 * Props:
 *   steps        -- array of { visual (React node), caption (string) }
 *   title        -- optional section title shown above
 *   className    -- optional wrapper class
 */

const SLIDE = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -60 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
}

export default function VisualStepExplainer({ steps = [], title, className = '' }) {
  const [current, setCurrent] = useState(0)
  const total = steps.length

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, total - 1))
  }, [total])

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0))
  }, [])

  const goTo = useCallback((idx) => {
    setCurrent(idx)
  }, [])

  if (!steps.length) return null

  const step = steps[current]

  return (
    <div
      className={`my-8 ${className}`}
      role="region"
      aria-label={title || 'Step-by-step visual explainer'}
      aria-roledescription="carousel"
    >
      {title && (
        <h3 className="font-ui text-ink-primary text-lg font-semibold mb-4">
          {title}
        </h3>
      )}

      {/* Visual area */}
      <div className="relative bg-surface rounded-gentle border border-line-soft overflow-hidden min-h-[340px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="w-full flex items-center justify-center p-6"
            {...SLIDE}
          >
            {step.visual}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows overlaid on visual */}
        {total > 1 && (
          <>
            <button
              onClick={goPrev}
              disabled={current === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-elevated/80 backdrop-blur border border-line-soft flex items-center justify-center text-ink-secondary hover:text-ink-primary transition-all disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Previous step"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={current === total - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-elevated/80 backdrop-blur border border-line-soft flex items-center justify-center text-ink-secondary hover:text-ink-primary transition-all disabled:opacity-0 disabled:pointer-events-none"
              aria-label="Next step"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={`caption-${current}`}
          className="font-ui text-sm text-ink-secondary text-center mt-4 max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {step.caption}
        </motion.p>
      </AnimatePresence>

      {/* Progress dots + counter */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${idx === current
                  ? 'bg-accent-grounded w-6'
                  : 'bg-line-soft hover:bg-ink-tertiary'
                }
              `}
              aria-label={`Go to step ${idx + 1}`}
              aria-current={idx === current ? 'step' : undefined}
            />
          ))}
          <span className="text-xs text-ink-tertiary font-ui ml-2">
            {current + 1} / {total}
          </span>
        </div>
      )}
    </div>
  )
}

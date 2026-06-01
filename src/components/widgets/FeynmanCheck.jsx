import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * FeynmanCheck -- "Explain it back" widget. The Feynman test.
 * User writes an explanation, then self-rates against rubric items.
 * No AI grading. Self-assessment is honored.
 *
 * Props:
 *   prompt      -- e.g. "Explain to a smart 12-year-old why..."
 *   rubric      -- array of strings (the key ideas to check against)
 *   id          -- unique identifier for storage
 *   onComplete  -- callback({ ratings, explanation })
 */

const FADE_UP = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
}

export default function FeynmanCheck({ prompt, rubric = [], id, onComplete }) {
  const [explanation, setExplanation] = useState('')
  const [phase, setPhase] = useState('write')  // write | rubric | done
  const [ratings, setRatings] = useState({})   // index -> 'got-it' | 'needs-work'

  const allRated = Object.keys(ratings).length === rubric.length
  const needsWorkCount = Object.values(ratings).filter((r) => r === 'needs-work').length

  const handleShowRubric = useCallback(() => {
    setPhase('rubric')
  }, [])

  const handleRateItem = useCallback((index, rating) => {
    setRatings((prev) => ({ ...prev, [index]: rating }))
  }, [])

  const handleFinish = useCallback(() => {
    setPhase('done')
    onComplete?.({ ratings, explanation })
    try {
      const key = `tapasya-feynman-${id}`
      localStorage.setItem(
        key,
        JSON.stringify({ explanation, ratings, timestamp: Date.now() })
      )
    } catch {
      // localStorage may be unavailable
    }
  }, [ratings, explanation, id, onComplete])

  // Auto-save on blur
  const handleBlur = useCallback(() => {
    if (explanation.trim()) {
      try {
        const key = `tapasya-feynman-draft-${id}`
        localStorage.setItem(
          key,
          JSON.stringify({ explanation, timestamp: Date.now() })
        )
      } catch {
        // localStorage may be unavailable
      }
    }
  }, [explanation, id])

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label="Feynman check: explain it back"
    >
      {/* Prompt */}
      <p className="font-reading text-body-lg text-ink-primary leading-relaxed mb-1">
        {prompt}
      </p>
      <p className="text-sm text-ink-tertiary mb-4 font-ui">
        Write as if explaining to someone who is smart but unfamiliar with this topic.
      </p>

      <AnimatePresence mode="wait">
        {/* Phase: WRITE */}
        {phase === 'write' && (
          <motion.div key="write" {...FADE_UP}>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              onBlur={handleBlur}
              placeholder="In simple terms, here's how I'd explain it..."
              rows={6}
              className="
                input w-full resize-y min-h-[140px]
                font-reading text-body leading-relaxed
                mb-4
              "
              aria-label="Your explanation"
            />

            <button
              onClick={handleShowRubric}
              disabled={!explanation.trim()}
              className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check against rubric
            </button>
          </motion.div>
        )}

        {/* Phase: RUBRIC */}
        {phase === 'rubric' && (
          <motion.div key="rubric" {...FADE_UP}>
            {/* User's explanation (collapsed) */}
            <div className="bg-surface rounded-calm p-4 mb-5 border border-line-soft">
              <p className="text-xs text-ink-tertiary font-ui uppercase tracking-wide mb-2">
                Your explanation
              </p>
              <p className="font-reading text-sm text-ink-secondary leading-relaxed whitespace-pre-wrap">
                {explanation}
              </p>
            </div>

            {/* Rubric checklist */}
            <p className="text-sm text-ink-secondary mb-3 font-ui">
              Check your explanation against each point. Be honest -- this is just for you.
            </p>

            <div className="space-y-3 mb-5" role="group" aria-label="Rubric self-assessment">
              {rubric.map((item, idx) => {
                const rating = ratings[idx]
                return (
                  <motion.div
                    key={idx}
                    className={`
                      rounded-calm px-4 py-3 border
                      transition-colors duration-quick ease-calm
                      ${rating === 'got-it'
                        ? 'bg-grounded-8 border-grounded-20'
                        : rating === 'needs-work'
                        ? 'bg-noticed-8 border-noticed-20'
                        : 'bg-elevated border-line-soft'
                      }
                    `}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="font-reading text-sm text-ink-primary leading-relaxed mb-2">
                      {item}
                    </p>
                    <div className="flex gap-2" role="radiogroup" aria-label={`Rate: ${item}`}>
                      <button
                        onClick={() => handleRateItem(idx, 'got-it')}
                        aria-pressed={rating === 'got-it'}
                        className={`
                          text-xs font-ui px-3 py-1.5 rounded-round
                          border transition-all duration-quick ease-calm
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                          ${rating === 'got-it'
                            ? 'bg-grounded-15 border-grounded-30 text-grounded'
                            : 'bg-surface border-line-soft text-ink-secondary hover:border-grounded-30'
                          }
                        `}
                      >
                        <span className="flex items-center gap-1">
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M2 6.5L4.5 9L10 3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Covered this
                        </span>
                      </button>

                      <button
                        onClick={() => handleRateItem(idx, 'needs-work')}
                        aria-pressed={rating === 'needs-work'}
                        className={`
                          text-xs font-ui px-3 py-1.5 rounded-round
                          border transition-all duration-quick ease-calm
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                          ${rating === 'needs-work'
                            ? 'bg-noticed-15 border-noticed-30 text-noticed'
                            : 'bg-surface border-line-soft text-ink-secondary hover:border-noticed-30'
                          }
                        `}
                      >
                        Needs work
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <button
              onClick={handleFinish}
              disabled={!allRated}
              className="btn btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Done
            </button>
          </motion.div>
        )}

        {/* Phase: DONE */}
        {phase === 'done' && (
          <motion.div key="done" {...FADE_UP}>
            <div
              className={`
                rounded-calm px-4 py-3
                ${needsWorkCount === 0 ? 'feedback-grounded' : 'feedback-noticed'}
              `}
            >
              {needsWorkCount === 0 ? (
                <p className="text-sm text-ink-secondary">
                  You covered all the key points. That's a solid understanding.
                  The best way to keep it is to explain it again in a few days.
                </p>
              ) : (
                <>
                  <p className="text-sm text-ink-secondary mb-2">
                    {needsWorkCount === 1
                      ? 'One area could use another look.'
                      : `${needsWorkCount} areas could use another look.`}
                    {' '}That's perfectly normal -- revisiting strengthens the connection.
                  </p>
                  <ul className="space-y-1">
                    {rubric.map((item, idx) =>
                      ratings[idx] === 'needs-work' ? (
                        <li
                          key={idx}
                          className="text-sm text-ink-secondary flex items-start gap-2"
                        >
                          <span className="text-accent-noticed mt-0.5" aria-hidden="true">
                            --
                          </span>
                          {item}
                        </li>
                      ) : null
                    )}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

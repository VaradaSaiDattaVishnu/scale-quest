import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * DragMatch -- Drag concepts to definitions.
 * Fully keyboard accessible: Space to select, arrows to navigate, Space to drop.
 * Click-to-select fallback for touch and assistive tech.
 *
 * Props:
 *   pairs         -- array of { left, right }
 *   shuffleRight  -- boolean, shuffle the right column (default true)
 *   onComplete    -- callback when all matched
 */

function shuffleArray(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const SETTLE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

export default function DragMatch({ pairs = [], shuffleRight = true, onComplete }) {
  // Build stable shuffled order once
  const rightOrder = useMemo(() => {
    const items = pairs.map((p, i) => ({ text: p.right, originalIndex: i }))
    return shuffleRight ? shuffleArray(items) : items
  }, [pairs, shuffleRight])

  const [matches, setMatches] = useState({})        // leftIndex -> rightOriginalIndex
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [feedback, setFeedback] = useState(null)     // { rightIndex, type: 'correct'|'incorrect' }
  const [complete, setComplete] = useState(false)
  const [focusedRight, setFocusedRight] = useState(0)
  const rightRefs = useRef([])

  const isLeftMatched = (leftIndex) => leftIndex in matches
  const isRightMatched = (rightOriginalIndex) =>
    Object.values(matches).includes(rightOriginalIndex)

  const checkComplete = useCallback(
    (newMatches) => {
      if (Object.keys(newMatches).length === pairs.length) {
        setComplete(true)
        onComplete?.()
      }
    },
    [pairs.length, onComplete]
  )

  const attemptMatch = useCallback(
    (leftIndex, rightOriginalIndex) => {
      if (leftIndex === rightOriginalIndex) {
        // Correct match
        const newMatches = { ...matches, [leftIndex]: rightOriginalIndex }
        setMatches(newMatches)
        setFeedback({ rightIndex: rightOriginalIndex, type: 'correct' })
        setSelectedLeft(null)
        setTimeout(() => setFeedback(null), 800)
        checkComplete(newMatches)
      } else {
        // Incorrect -- gentle amber, bounces back
        setFeedback({ rightIndex: rightOriginalIndex, type: 'incorrect' })
        setTimeout(() => {
          setFeedback(null)
          setSelectedLeft(null)
        }, 1000)
      }
    },
    [matches, checkComplete]
  )

  // Click-to-select on left
  const handleLeftClick = useCallback(
    (leftIndex) => {
      if (isLeftMatched(leftIndex)) return
      setSelectedLeft(leftIndex === selectedLeft ? null : leftIndex)
    },
    [selectedLeft, matches]
  )

  // Click on right to attempt match
  const handleRightClick = useCallback(
    (rightOriginalIndex) => {
      if (isRightMatched(rightOriginalIndex)) return
      if (selectedLeft === null) return
      attemptMatch(selectedLeft, rightOriginalIndex)
    },
    [selectedLeft, matches, attemptMatch]
  )

  // Keyboard navigation for right column
  const handleRightKeyDown = useCallback(
    (e, idx) => {
      const unmatched = rightOrder
        .map((r, i) => ({ ...r, visIndex: i }))
        .filter((r) => !isRightMatched(r.originalIndex))

      const currentUnmatchedIdx = unmatched.findIndex((r) => r.visIndex === idx)

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next = unmatched[(currentUnmatchedIdx + 1) % unmatched.length]
        setFocusedRight(next.visIndex)
        rightRefs.current[next.visIndex]?.focus()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev =
          unmatched[(currentUnmatchedIdx - 1 + unmatched.length) % unmatched.length]
        setFocusedRight(prev.visIndex)
        rightRefs.current[prev.visIndex]?.focus()
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleRightClick(rightOrder[idx].originalIndex)
      }
    },
    [rightOrder, matches, handleRightClick]
  )

  // Left column keyboard
  const handleLeftKeyDown = useCallback(
    (e, leftIndex) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleLeftClick(leftIndex)
      }
    },
    [handleLeftClick]
  )

  return (
    <div className="card-flat my-6" role="region" aria-label="Match terms to definitions">
      <p className="text-sm text-ink-secondary mb-4 font-ui">
        Select a term, then select its matching definition.
        {' '}
        <span className="text-ink-tertiary">
          (Keyboard: Space to select, arrows to navigate)
        </span>
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Left column: terms */}
        <div className="space-y-2" role="listbox" aria-label="Terms">
          {pairs.map((pair, i) => {
            const matched = isLeftMatched(i)
            const selected = selectedLeft === i
            return (
              <motion.button
                key={`left-${i}`}
                onClick={() => handleLeftClick(i)}
                onKeyDown={(e) => handleLeftKeyDown(e, i)}
                disabled={matched}
                role="option"
                aria-selected={selected}
                aria-disabled={matched}
                className={`
                  w-full text-left px-4 py-3 rounded-calm
                  text-sm font-ui font-medium
                  border transition-all duration-quick ease-calm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                  ${matched
                    ? 'bg-grounded-8 border-grounded-20 text-grounded'
                    : selected
                    ? 'bg-stilled-10 border-stilled-40 text-ink-primary shadow-rest'
                    : 'bg-elevated border-line-soft text-ink-primary hover:border-stilled-40'
                  }
                  ${matched ? 'cursor-default' : 'cursor-pointer'}
                `}
                layout
                transition={SETTLE}
              >
                <span className="flex items-center gap-2">
                  {matched && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-accent-grounded flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {pair.left}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Right column: definitions */}
        <div className="space-y-2" role="listbox" aria-label="Definitions">
          {rightOrder.map((item, visIdx) => {
            const matched = isRightMatched(item.originalIndex)
            const isFeedback = feedback?.rightIndex === item.originalIndex
            const feedbackType = isFeedback ? feedback.type : null

            return (
              <motion.button
                key={`right-${item.originalIndex}`}
                ref={(el) => (rightRefs.current[visIdx] = el)}
                onClick={() => handleRightClick(item.originalIndex)}
                onKeyDown={(e) => handleRightKeyDown(e, visIdx)}
                disabled={matched || selectedLeft === null}
                role="option"
                aria-selected={false}
                aria-disabled={matched || selectedLeft === null}
                tabIndex={focusedRight === visIdx ? 0 : -1}
                className={`
                  w-full text-left px-4 py-3 rounded-calm
                  text-sm font-reading leading-relaxed
                  border transition-all duration-quick ease-calm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                  ${matched
                    ? 'bg-grounded-8 border-grounded-20 text-grounded'
                    : feedbackType === 'correct'
                    ? 'bg-grounded-12 border-grounded-30 text-ink-primary'
                    : feedbackType === 'incorrect'
                    ? 'bg-noticed-12 border-noticed-30 text-ink-primary'
                    : selectedLeft !== null && !matched
                    ? 'bg-elevated border-line-soft text-ink-secondary hover:border-stilled-40 cursor-pointer'
                    : 'bg-elevated border-line-soft text-ink-secondary cursor-default opacity-70'
                  }
                `}
                animate={
                  feedbackType === 'incorrect'
                    ? { x: [0, -6, 6, -4, 4, 0] }
                    : { x: 0 }
                }
                transition={
                  feedbackType === 'incorrect'
                    ? { duration: 0.4, ease: 'easeOut' }
                    : SETTLE
                }
                layout
              >
                <span className="flex items-center gap-2">
                  {matched && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-accent-grounded flex-shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8.5L6.5 12L13 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {item.text}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Feedback area for incorrect match */}
      <AnimatePresence>
        {feedback?.type === 'incorrect' && (
          <motion.p
            className="text-sm text-accent-noticed mt-3 font-ui"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SETTLE}
          >
            Not quite -- let's look again.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Complete state */}
      <AnimatePresence>
        {complete && (
          <motion.div
            className="feedback-grounded mt-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={SETTLE}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="text-accent-grounded flex-shrink-0"
              aria-hidden="true"
            >
              <path
                d="M4 10.5L8 14.5L16 5.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm text-ink-secondary">All matched.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

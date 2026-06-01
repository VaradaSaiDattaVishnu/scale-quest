import { useState, useCallback, useMemo, useRef } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'

/**
 * SortSequence -- Put steps in correct order.
 * Drag to reorder, or keyboard: Space to grab, arrows to move, Space to drop.
 *
 * Props:
 *   id          -- unique identifier
 *   prompt      -- instruction text
 *   items       -- array of strings IN CORRECT ORDER (shuffled on mount)
 *   onComplete  -- callback when order is correct
 */

function shuffleArray(arr) {
  const copy = [...arr]
  // Ensure shuffle is actually different from correct order
  for (let attempts = 0; attempts < 10; attempts++) {
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    // Check it's actually shuffled
    if (copy.some((item, idx) => item !== arr[idx])) return copy
  }
  return copy
}

const SETTLE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

export default function SortSequence({ id, prompt, items = [], onComplete }) {
  const correctOrder = useMemo(() => items, [items])
  const [order, setOrder] = useState(() => shuffleArray(items))
  const [checked, setChecked] = useState(false)
  const [incorrectIndices, setIncorrectIndices] = useState(new Set())
  const [isCorrect, setIsCorrect] = useState(false)
  const [grabbedIndex, setGrabbedIndex] = useState(null)
  const itemRefs = useRef([])

  const handleCheck = useCallback(() => {
    const wrong = new Set()
    order.forEach((item, idx) => {
      if (item !== correctOrder[idx]) wrong.add(idx)
    })
    setIncorrectIndices(wrong)
    setChecked(true)

    if (wrong.size === 0) {
      setIsCorrect(true)
      onComplete?.()
    } else {
      setIsCorrect(false)
    }
  }, [order, correctOrder, onComplete])

  const handleTryAgain = useCallback(() => {
    setChecked(false)
    setIncorrectIndices(new Set())
    setIsCorrect(false)
  }, [])

  // Keyboard reorder
  const handleKeyDown = useCallback(
    (e, idx) => {
      if (checked && isCorrect) return

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        if (grabbedIndex === null) {
          // Grab
          setGrabbedIndex(idx)
        } else {
          // Drop at current position
          setGrabbedIndex(null)
          if (checked) {
            setChecked(false)
            setIncorrectIndices(new Set())
          }
        }
      } else if (grabbedIndex !== null) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault()
          if (grabbedIndex > 0) {
            const newOrder = [...order]
            ;[newOrder[grabbedIndex - 1], newOrder[grabbedIndex]] = [
              newOrder[grabbedIndex],
              newOrder[grabbedIndex - 1],
            ]
            setOrder(newOrder)
            setGrabbedIndex(grabbedIndex - 1)
            setTimeout(() => itemRefs.current[grabbedIndex - 1]?.focus(), 0)
          }
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault()
          if (grabbedIndex < order.length - 1) {
            const newOrder = [...order]
            ;[newOrder[grabbedIndex], newOrder[grabbedIndex + 1]] = [
              newOrder[grabbedIndex + 1],
              newOrder[grabbedIndex],
            ]
            setOrder(newOrder)
            setGrabbedIndex(grabbedIndex + 1)
            setTimeout(() => itemRefs.current[grabbedIndex + 1]?.focus(), 0)
          }
        } else if (e.key === 'Escape') {
          e.preventDefault()
          setGrabbedIndex(null)
        }
      } else {
        // Navigate between items
        if (e.key === 'ArrowUp' && idx > 0) {
          e.preventDefault()
          itemRefs.current[idx - 1]?.focus()
        } else if (e.key === 'ArrowDown' && idx < order.length - 1) {
          e.preventDefault()
          itemRefs.current[idx + 1]?.focus()
        }
      }
    },
    [grabbedIndex, order, checked, isCorrect]
  )

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label={prompt || 'Put these steps in the correct order'}
    >
      {prompt && (
        <p className="font-reading text-ink-primary text-body mb-4 leading-relaxed">
          {prompt}
        </p>
      )}

      <p className="text-sm text-ink-tertiary mb-3 font-ui">
        Drag to reorder, or use Space to grab and arrow keys to move.
      </p>

      {/* Sortable list */}
      <Reorder.Group
        axis="y"
        values={order}
        onReorder={(newOrder) => {
          setOrder(newOrder)
          if (checked) {
            setChecked(false)
            setIncorrectIndices(new Set())
          }
        }}
        className="space-y-2 mb-4"
        role="listbox"
        aria-label="Reorderable items"
      >
        {order.map((item, idx) => {
          const isIncorrect = checked && incorrectIndices.has(idx)
          const isItemCorrect = checked && !incorrectIndices.has(idx) && isCorrect === false
          const isGrabbed = grabbedIndex === idx

          return (
            <Reorder.Item
              key={item}
              value={item}
              className={`
                flex items-center gap-3
                px-4 py-3 rounded-calm
                text-sm font-reading leading-relaxed
                border cursor-grab active:cursor-grabbing
                transition-colors duration-quick ease-calm
                focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                ${isCorrect
                  ? 'bg-grounded-8 border-grounded-20 text-grounded'
                  : isIncorrect
                  ? 'bg-noticed-10 border-noticed-25 text-ink-primary'
                  : isItemCorrect
                  ? 'bg-grounded-8 border-grounded-20 text-ink-primary'
                  : isGrabbed
                  ? 'bg-stilled-10 border-stilled-40 text-ink-primary shadow-lifted'
                  : 'bg-elevated border-line-soft text-ink-primary hover:border-stilled-30'
                }
              `}
              ref={(el) => (itemRefs.current[idx] = el)}
              tabIndex={0}
              role="option"
              aria-grabbed={isGrabbed}
              aria-label={`${item}. Position ${idx + 1} of ${order.length}.${
                isGrabbed ? ' Grabbed. Use arrows to move, Space to drop.' : ''
              }`}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              whileDrag={{ scale: 1.02, boxShadow: '0 4px 12px -2px rgba(31,27,22,0.08)' }}
              layout
              transition={SETTLE}
            >
              {/* Drag handle / number */}
              <span
                className={`
                  flex-shrink-0 w-6 h-6 rounded-full
                  flex items-center justify-center
                  text-xs font-ui font-medium
                  ${isCorrect || isItemCorrect
                    ? 'bg-grounded-15 text-grounded'
                    : isIncorrect
                    ? 'bg-noticed-15 text-noticed'
                    : 'bg-surface text-ink-tertiary'
                  }
                `}
                aria-hidden="true"
              >
                {checked && (isCorrect || isItemCorrect) ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6.5L4.5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  idx + 1
                )}
              </span>

              <span className="flex-1">{item}</span>

              {/* Drag dots */}
              {!isCorrect && (
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-ink-tertiary flex-shrink-0 opacity-40"
                  aria-hidden="true"
                >
                  <circle cx="4" cy="2" r="1" fill="currentColor" />
                  <circle cx="8" cy="2" r="1" fill="currentColor" />
                  <circle cx="4" cy="6" r="1" fill="currentColor" />
                  <circle cx="8" cy="6" r="1" fill="currentColor" />
                  <circle cx="4" cy="10" r="1" fill="currentColor" />
                  <circle cx="8" cy="10" r="1" fill="currentColor" />
                </svg>
              )}
            </Reorder.Item>
          )
        })}
      </Reorder.Group>

      {/* Actions */}
      <AnimatePresence mode="wait">
        {!isCorrect && (
          <motion.div
            key="actions"
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SETTLE}
          >
            <button onClick={handleCheck} className="btn btn-primary text-sm">
              Check order
            </button>

            {checked && !isCorrect && (
              <button onClick={handleTryAgain} className="btn btn-ghost text-sm">
                Try again
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback */}
      <AnimatePresence>
        {checked && !isCorrect && incorrectIndices.size > 0 && (
          <motion.p
            className="text-sm text-accent-noticed mt-3 font-ui"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={SETTLE}
          >
            Some items are in a different position -- the highlighted ones. Take another look.
          </motion.p>
        )}

        {isCorrect && (
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
            <p className="text-sm text-ink-secondary">That's the sequence.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

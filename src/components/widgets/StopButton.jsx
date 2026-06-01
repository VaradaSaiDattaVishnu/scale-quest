import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * StopButton -- always visible, always reachable via Escape.
 * Pressing does NOT lose progress.
 * Shows two calm options:
 *   "Come back later"
 *   "I'm okay, just needed a beat"
 *
 * Props:
 *   onPause       -- called when user chooses "come back later"
 *   onResume      -- called when user chooses "just needed a beat"
 *   className     -- additional positioning classes
 */
export default function StopButton({ onPause, onResume, className = '' }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  // Listen for Escape key globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isOpen) {
          handleClose()
        } else {
          handleOpen()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleOpen, handleClose])

  // Trap focus inside the dialog when open
  useEffect(() => {
    if (!isOpen) return
    const previouslyFocused = document.activeElement
    return () => {
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus()
      }
    }
  }, [isOpen])

  const handleComeBackLater = () => {
    setIsOpen(false)
    onPause?.()
  }

  const handleJustABeat = () => {
    setIsOpen(false)
    onResume?.()
  }

  return (
    <>
      {/* The stop button -- fixed top-right */}
      <button
        onClick={handleOpen}
        className={`
          fixed top-4 right-4 z-50
          w-10 h-10 rounded-full
          bg-surface border border-line-soft
          flex items-center justify-center
          shadow-rest hover:shadow-lifted
          transition-all duration-quick ease-calm
          focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
          ${className}
        `}
        aria-label="Pause. Press Escape anytime."
        title="Pause (Esc)"
      >
        {/* Pause icon -- two gentle vertical bars */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="text-ink-secondary"
        >
          <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
          <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
        </svg>
      </button>

      {/* Overlay dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-canvas/80 backdrop-blur-sm"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Take a moment"
              className="
                relative z-10 w-full max-w-sm mx-4
                bg-elevated border border-line-soft
                rounded-gentle p-breath
                shadow-held
              "
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-lg font-medium text-ink-primary mb-2">
                Take a moment.
              </h2>
              <p className="text-sm text-ink-secondary mb-6">
                Your progress is saved. Nothing is lost by pausing.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleComeBackLater}
                  className="
                    w-full text-left px-4 py-3
                    bg-surface rounded-calm
                    border border-line-soft
                    text-ink-primary text-sm font-medium
                    hover:border-accent-stilled
                    transition-all duration-quick ease-calm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                  "
                  autoFocus
                >
                  Come back later
                  <span className="block text-xs text-ink-tertiary mt-0.5 font-normal">
                    Everything will be here when you return.
                  </span>
                </button>

                <button
                  onClick={handleJustABeat}
                  className="
                    w-full text-left px-4 py-3
                    bg-surface rounded-calm
                    border border-line-soft
                    text-ink-primary text-sm font-medium
                    hover:border-accent-stilled
                    transition-all duration-quick ease-calm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                  "
                >
                  I'm okay, just needed a beat
                  <span className="block text-xs text-ink-tertiary mt-0.5 font-normal">
                    Take a breath, then continue.
                  </span>
                </button>
              </div>

              <p className="text-xs text-ink-tertiary text-center mt-5">
                Press Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

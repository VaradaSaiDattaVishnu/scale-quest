import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * BranchScenario -- If/else decision trees. THE CORE Feynman-learning widget.
 * Every branch ends in reflection, NEVER "you won".
 * Outcomes are phenomenological, not graded.
 *
 * Props:
 *   tree -- recursive structure:
 *     {
 *       setup: "scenario text",
 *       options: [{
 *         label: "choice text",
 *         consequence: "what happens",
 *         reflect: "reflection question",
 *         next: { ... } | null
 *       }]
 *     }
 *   onJournalSave -- callback({ nodeIndex, text })
 */

const FADE_UP = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
}

function ScenarioNode({ node, depth = 0, onJournalSave, onContinue }) {
  const [chosenIndex, setChosenIndex] = useState(null)
  const [journalText, setJournalText] = useState('')
  const [showReflection, setShowReflection] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const consequenceRef = useRef(null)
  const reflectionRef = useRef(null)

  const chosen = chosenIndex !== null ? node.options[chosenIndex] : null

  // Scroll consequence into view
  useEffect(() => {
    if (chosen && consequenceRef.current) {
      consequenceRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [chosen])

  // Scroll reflection into view
  useEffect(() => {
    if (showReflection && reflectionRef.current) {
      reflectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [showReflection])

  const handleChoose = useCallback((idx) => {
    setChosenIndex(idx)
    setShowReflection(false)
    setShowNext(false)
    // Show reflection after a gentle delay
    setTimeout(() => setShowReflection(true), 600)
  }, [])

  const handleContinue = useCallback(() => {
    // Save journal if there's text
    if (journalText.trim()) {
      onJournalSave?.({ depth, text: journalText })
      try {
        const key = `tapasya-branch-${depth}-${chosenIndex}`
        localStorage.setItem(key, JSON.stringify({ text: journalText, timestamp: Date.now() }))
      } catch {
        // localStorage may be unavailable
      }
    }

    if (chosen?.next) {
      setShowNext(true)
    } else {
      onContinue?.()
    }
  }, [journalText, chosen, depth, chosenIndex, onJournalSave, onContinue])

  const handleJournalBlur = useCallback(() => {
    if (journalText.trim()) {
      try {
        const key = `tapasya-branch-${depth}-${chosenIndex}`
        localStorage.setItem(key, JSON.stringify({ text: journalText, timestamp: Date.now() }))
      } catch {
        // localStorage may be unavailable
      }
    }
  }, [journalText, depth, chosenIndex])

  return (
    <div className={depth > 0 ? 'mt-6' : ''}>
      {/* Setup text -- beautiful serif */}
      <motion.div
        className="mb-6"
        {...FADE_UP}
      >
        <p
          className="font-reading text-body-lg text-ink-primary leading-relaxed"
          data-reading
        >
          {node.setup}
        </p>
      </motion.div>

      {/* Options -- calm choice cards */}
      <AnimatePresence>
        {chosenIndex === null && (
          <motion.div
            className="space-y-3 mb-6"
            {...FADE_UP}
            role="group"
            aria-label="Choose how to proceed"
          >
            {node.options.map((option, idx) => (
              <motion.button
                key={idx}
                onClick={() => handleChoose(idx)}
                className="
                  w-full text-left
                  bg-elevated border border-line-soft rounded-gentle
                  px-5 py-4
                  hover:border-stilled-30 hover:shadow-rest
                  transition-all duration-quick ease-calm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                "
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -1 }}
              >
                <p className="text-sm font-ui font-medium text-ink-primary">
                  {option.label}
                </p>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consequence */}
      <AnimatePresence>
        {chosen && !showNext && (
          <motion.div ref={consequenceRef} {...FADE_UP} key="consequence">
            {/* The chosen option, greyed back */}
            <div className="bg-surface rounded-calm px-4 py-3 mb-4 border border-line-soft">
              <p className="text-xs text-ink-tertiary font-ui uppercase tracking-wide mb-1">
                You chose
              </p>
              <p className="text-sm text-ink-secondary font-ui">
                {chosen.label}
              </p>
            </div>

            {/* Consequence with body-awareness cue */}
            <div className="bg-elevated border border-line-soft rounded-gentle px-5 py-4 mb-4">
              <p className="font-reading text-body text-ink-primary leading-relaxed mb-3">
                {chosen.consequence}
              </p>
              <p className="text-sm text-ink-tertiary italic">
                Notice what comes up as you read this. Is there a tug of recognition? Surprise? Nothing at all? All valid.
              </p>
            </div>

            {/* Reflection */}
            <AnimatePresence>
              {showReflection && (
                <motion.div
                  ref={reflectionRef}
                  key="reflection"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {chosen.reflect && (
                    <div className="mb-4">
                      <p className="font-reading text-body text-ink-primary leading-relaxed mb-3">
                        {chosen.reflect}
                      </p>
                      <textarea
                        value={journalText}
                        onChange={(e) => setJournalText(e.target.value)}
                        onBlur={handleJournalBlur}
                        placeholder="Jot a thought here (optional, never graded)..."
                        rows={3}
                        className="input w-full resize-y min-h-[72px] font-reading text-sm"
                        aria-label="Reflection journal"
                      />
                      <p className="text-xs text-ink-tertiary mt-1">
                        This is yours. It stays on your device.
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleContinue}
                    className="btn btn-secondary text-sm"
                  >
                    {chosen.next ? 'Continue' : 'Finish this path'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next node (recursive) */}
      <AnimatePresence>
        {showNext && chosen?.next && (
          <motion.div
            key={`next-${depth}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gentle divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-line-soft" />
              <span className="text-xs text-ink-tertiary font-ui">and then</span>
              <div className="flex-1 h-px bg-line-soft" />
            </div>

            <ScenarioNode
              node={chosen.next}
              depth={depth + 1}
              onJournalSave={onJournalSave}
              onContinue={onContinue}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BranchScenario({ tree, onJournalSave }) {
  const [finished, setFinished] = useState(false)

  const handleFinish = useCallback(() => {
    setFinished(true)
  }, [])

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label="Decision scenario"
    >
      <ScenarioNode
        node={tree}
        depth={0}
        onJournalSave={onJournalSave}
        onContinue={handleFinish}
      />

      {/* Synthesis -- when all paths end */}
      <AnimatePresence>
        {finished && (
          <motion.div
            className="mt-6 bg-surface rounded-gentle px-5 py-4 border border-line-soft"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-reading text-body text-ink-primary leading-relaxed">
              You've walked through one path of this scenario. Every choice led to learning.
              There are no wrong turns here -- only different views of the same landscape.
            </p>
            <p className="text-sm text-ink-tertiary mt-3 italic">
              If you'd like, you can come back and explore a different branch later.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Prompt -- Quantum Country-style inline active recall.
 * Appears mid-lesson. The learner writes their answer, then self-rates.
 * No AI grading. Self-rating is honored.
 *
 * Props:
 *   id            -- unique identifier for storage
 *   question      -- the recall question
 *   answer        -- the canonical answer text
 *   cardOnSuccess -- boolean, if true flag for spaced-repetition on "Got it"
 *   onRate        -- callback({ id, rating, userAnswer })
 */

const FADE_UP = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
}

export default function Prompt({ id, question, answer, cardOnSuccess = false, onRate }) {
  const [phase, setPhase] = useState('ask')  // ask | reveal | rated
  const [userAnswer, setUserAnswer] = useState('')
  const [rating, setRating] = useState(null)
  const textareaRef = useRef(null)

  const handleShowAnswer = useCallback(() => {
    setPhase('reveal')
  }, [])

  const handleDontKnow = useCallback(() => {
    setUserAnswer('')
    setPhase('reveal')
  }, [])

  const handleRate = useCallback(
    (chosen) => {
      setRating(chosen)
      setPhase('rated')
      onRate?.({ id, rating: chosen, userAnswer })
    },
    [id, userAnswer, onRate]
  )

  // Auto-save on blur
  const handleBlur = useCallback(() => {
    if (userAnswer.trim()) {
      try {
        const key = `tapasya-prompt-${id}`
        localStorage.setItem(key, JSON.stringify({ userAnswer, timestamp: Date.now() }))
      } catch {
        // localStorage may be unavailable
      }
    }
  }, [id, userAnswer])

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label={`Recall prompt: ${question}`}
    >
      {/* Question -- always visible */}
      <p className="font-reading text-ink-primary text-body mb-4 leading-relaxed">
        {question}
      </p>

      <AnimatePresence mode="wait">
        {/* Phase: ASK */}
        {phase === 'ask' && (
          <motion.div key="ask" {...FADE_UP}>
            <textarea
              ref={textareaRef}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onBlur={handleBlur}
              placeholder="Write what you remember..."
              rows={3}
              className="
                input w-full resize-y min-h-[80px]
                font-reading text-body
                mb-3
              "
              aria-label="Your answer"
            />

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleShowAnswer}
                disabled={!userAnswer.trim()}
                className="btn btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Show answer
              </button>

              <button
                onClick={handleDontKnow}
                className="btn btn-ghost text-sm"
              >
                I don't know yet -- show me
              </button>
            </div>
          </motion.div>
        )}

        {/* Phase: REVEAL */}
        {phase === 'reveal' && (
          <motion.div key="reveal" {...FADE_UP}>
            {/* Side-by-side comparison */}
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {/* User's answer */}
              {userAnswer.trim() && (
                <div className="bg-surface rounded-calm p-4">
                  <p className="text-caption text-ink-tertiary mb-2 font-ui font-medium uppercase tracking-wide">
                    Your answer
                  </p>
                  <p className="font-reading text-sm text-ink-secondary leading-relaxed">
                    {userAnswer}
                  </p>
                </div>
              )}

              {/* Canonical answer */}
              <div
                className={`bg-surface rounded-calm p-4 border border-grounded-20 ${
                  !userAnswer.trim() ? 'sm:col-span-2' : ''
                }`}
              >
                <p className="text-caption text-ink-tertiary mb-2 font-ui font-medium uppercase tracking-wide">
                  Key ideas
                </p>
                <p className="font-reading text-sm text-ink-primary leading-relaxed">
                  {answer}
                </p>
              </div>
            </div>

            {/* Self-rating */}
            <p className="text-sm text-ink-secondary mb-3">
              How did that go?
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Self-assessment">
              {[
                { key: 'got-it', label: 'Got it', style: 'grounded' },
                { key: 'close', label: 'Close', style: 'stilled' },
                { key: 'revisit', label: 'Need to revisit', style: 'noticed' },
              ].map(({ key, label, style }) => (
                <button
                  key={key}
                  onClick={() => handleRate(key)}
                  className={`
                    btn text-sm
                    ${style === 'grounded'
                      ? 'bg-grounded-10 text-grounded border border-grounded-25 hover:bg-grounded-20'
                      : style === 'noticed'
                      ? 'bg-noticed-10 text-noticed border border-noticed-25 hover:bg-noticed-20'
                      : 'bg-stilled-10 text-stilled border border-stilled-25 hover:bg-stilled-20'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Phase: RATED */}
        {phase === 'rated' && (
          <motion.div key="rated" {...FADE_UP}>
            <div
              className={`
                rounded-calm px-4 py-3
                ${rating === 'got-it'
                  ? 'feedback-grounded'
                  : rating === 'revisit'
                  ? 'feedback-noticed'
                  : 'bg-stilled-8 border border-stilled-20 rounded-calm'
                }
              `}
            >
              <p className="text-sm text-ink-secondary">
                {rating === 'got-it' && 'Noted. This will come back for review later to help it stick.'}
                {rating === 'close' && 'Almost there. It will cycle back when the time is right.'}
                {rating === 'revisit' && 'No rush. This will appear again soon so you can build on it.'}
              </p>
              {cardOnSuccess && rating === 'got-it' && (
                <p className="text-xs text-ink-tertiary mt-1">
                  Added to your spaced-repetition deck.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ObservationScene -- A scene shown for N seconds, then questions.
 * Tests observation vs inference. Self-graded.
 *
 * Props:
 *   sceneDescription -- richly described scene (text for v1)
 *   duration         -- seconds to observe (default 30)
 *   questions        -- array of { question, type: 'factual'|'spatial'|'inferential', answer }
 *   onComplete       -- callback({ answers })
 */

const SETTLE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
const FADE_UP = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: SETTLE,
}

const TYPE_LABELS = {
  factual: 'Factual recall',
  spatial: 'Spatial awareness',
  inferential: 'Inference',
}

const TYPE_STYLES = {
  factual: 'bg-stilled-10 text-stilled border-stilled-20',
  spatial: 'bg-grounded-10 text-grounded border-grounded-20',
  inferential: 'bg-noticed-10 text-noticed border-noticed-20',
}

export default function ObservationScene({
  sceneDescription,
  duration = 30,
  questions = [],
  onComplete,
}) {
  const [phase, setPhase] = useState('observe')  // observe | questions | done
  const [timeLeft, setTimeLeft] = useState(duration)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})       // index -> string
  const [selfRatings, setSelfRatings] = useState({}) // index -> 'got-it' | 'partial' | 'missed'
  const [revealed, setRevealed] = useState({})     // index -> boolean
  const timerRef = useRef(null)

  // Timer for observation phase
  useEffect(() => {
    if (phase !== 'observe') return

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setPhase('questions')
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [phase])

  const handleSkipToQuestions = useCallback(() => {
    clearInterval(timerRef.current)
    setPhase('questions')
  }, [])

  const handleAnswer = useCallback((idx, text) => {
    setAnswers((prev) => ({ ...prev, [idx]: text }))
  }, [])

  const handleReveal = useCallback((idx) => {
    setRevealed((prev) => ({ ...prev, [idx]: true }))
  }, [])

  const handleSelfRate = useCallback((idx, rating) => {
    setSelfRatings((prev) => ({ ...prev, [idx]: rating }))
  }, [])

  const handleNextQuestion = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1)
    } else {
      setPhase('done')
      onComplete?.({ answers, selfRatings })
    }
  }, [currentQ, questions.length, answers, selfRatings, onComplete])

  // Auto-save answer on blur
  const handleBlur = useCallback(
    (idx) => {
      if (answers[idx]?.trim()) {
        try {
          localStorage.setItem(
            `tapasya-observation-${idx}`,
            JSON.stringify({ answer: answers[idx], timestamp: Date.now() })
          )
        } catch {
          // localStorage may be unavailable
        }
      }
    },
    [answers]
  )

  const currentQuestion = questions[currentQ]
  const isCurrentRevealed = revealed[currentQ]
  const isCurrentRated = currentQ in selfRatings

  // Format time as mm:ss
  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="card-flat my-6" role="region" aria-label="Observation exercise">
      <AnimatePresence mode="wait">
        {/* Phase: OBSERVE */}
        {phase === 'observe' && (
          <motion.div key="observe" {...FADE_UP}>
            {/* Timer -- non-pressuring */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-ink-tertiary font-ui">
                Read carefully. Questions will follow.
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-mono text-ink-secondary"
                  aria-label={`${timeLeft} seconds remaining`}
                  aria-live="polite"
                >
                  {formatTime(timeLeft)}
                </span>
                {/* Subtle progress ring */}
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="var(--color-line-soft)"
                    strokeWidth="2"
                  />
                  <motion.circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="var(--color-accent-stilled)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={62.83}
                    strokeDashoffset={62.83 * (timeLeft / duration)}
                    transform="rotate(-90 12 12)"
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </svg>
              </div>
            </div>

            {/* Scene description -- rich text */}
            <div
              className="
                bg-elevated border border-line-soft rounded-gentle
                p-6 mb-4
              "
            >
              <p
                className="font-reading text-body-lg text-ink-primary leading-relaxed whitespace-pre-wrap"
                data-reading
              >
                {sceneDescription}
              </p>
            </div>

            <button
              onClick={handleSkipToQuestions}
              className="btn btn-ghost text-sm"
            >
              I'm ready for questions
            </button>
          </motion.div>
        )}

        {/* Phase: QUESTIONS */}
        {phase === 'questions' && currentQuestion && (
          <motion.div key={`q-${currentQ}`} {...FADE_UP}>
            {/* Progress */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-ink-tertiary font-ui">
                Question {currentQ + 1} of {questions.length}
              </p>
              <span
                className={`
                  text-xs font-ui px-2.5 py-1 rounded-round border
                  ${TYPE_STYLES[currentQuestion.type] || TYPE_STYLES.factual}
                `}
              >
                {TYPE_LABELS[currentQuestion.type] || 'Question'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="progress-track mb-5">
              <div
                className="progress-fill"
                style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question */}
            <p className="font-reading text-body text-ink-primary leading-relaxed mb-3">
              {currentQuestion.question}
            </p>

            {currentQuestion.type === 'inferential' && (
              <p className="text-xs text-accent-noticed mb-3 font-ui">
                This asks for an inference, not a fact you directly observed.
              </p>
            )}

            {/* Answer area */}
            <textarea
              value={answers[currentQ] || ''}
              onChange={(e) => handleAnswer(currentQ, e.target.value)}
              onBlur={() => handleBlur(currentQ)}
              placeholder="What do you remember?"
              rows={2}
              className="input w-full resize-y min-h-[64px] font-reading text-sm mb-3"
              aria-label="Your answer"
              disabled={isCurrentRevealed}
            />

            {/* Reveal answer */}
            {!isCurrentRevealed ? (
              <button
                onClick={() => handleReveal(currentQ)}
                className="btn btn-secondary text-sm"
              >
                Show answer
              </button>
            ) : (
              <motion.div {...FADE_UP}>
                <div className="bg-surface rounded-calm p-4 mb-3 border border-line-soft">
                  <p className="text-xs text-ink-tertiary font-ui uppercase tracking-wide mb-1">
                    Answer
                  </p>
                  <p className="font-reading text-sm text-ink-primary leading-relaxed">
                    {currentQuestion.answer}
                  </p>
                </div>

                {/* Self-rate */}
                {!isCurrentRated ? (
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Self-assessment">
                    {[
                      { key: 'got-it', label: 'Got it', style: 'grounded' },
                      { key: 'partial', label: 'Partially', style: 'stilled' },
                      { key: 'missed', label: 'Missed this', style: 'noticed' },
                    ].map(({ key, label, style }) => (
                      <button
                        key={key}
                        onClick={() => handleSelfRate(currentQ, key)}
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
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="btn btn-primary text-sm"
                  >
                    {currentQ < questions.length - 1 ? 'Next question' : 'Finish'}
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Phase: DONE */}
        {phase === 'done' && (
          <motion.div key="done" {...FADE_UP}>
            <div className="bg-surface rounded-gentle p-5 border border-line-soft">
              <p className="font-reading text-body text-ink-primary leading-relaxed mb-3">
                Observation complete.
              </p>

              {/* Summary */}
              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span
                      className={`
                        flex-shrink-0 mt-0.5
                        ${selfRatings[idx] === 'got-it'
                          ? 'text-accent-grounded'
                          : selfRatings[idx] === 'partial'
                          ? 'text-accent-stilled'
                          : 'text-accent-noticed'
                        }
                      `}
                      aria-hidden="true"
                    >
                      {selfRatings[idx] === 'got-it' ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7.5L5.5 11L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : selfRatings[idx] === 'partial' ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <circle cx="7" cy="7" r="3" fill="currentColor" opacity="0.5" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <line x1="3" y1="7" x2="11" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <span className="text-ink-secondary">{q.question}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm text-ink-tertiary mt-4 italic">
                Notice which types of details you caught and which slipped by.
                That pattern itself is useful information.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

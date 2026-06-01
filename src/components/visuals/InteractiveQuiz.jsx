import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * InteractiveQuiz -- Visual quiz, NOT text-based.
 * User clicks/interacts with diagrams to answer. Immediate visual feedback.
 *
 * Props:
 *   questions   -- array of {
 *     visual: React node (the diagram/animation to show),
 *     prompt: string (short instruction),
 *     options: [{ id, label, visual?, correct }],
 *     type: 'click' | 'sequence'
 *   }
 *   onComplete  -- callback({ score, total })
 */

const FADE = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

export default function InteractiveQuiz({ questions = [], onComplete }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'incorrect'
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQ]

  const handleSelect = useCallback((optionId) => {
    if (feedback) return // already answered
    setSelectedId(optionId)

    const option = question.options.find((o) => o.id === optionId)
    const isCorrect = option?.correct

    if (isCorrect) {
      setFeedback('correct')
      setScore((s) => s + 1)
    } else {
      setFeedback('incorrect')
    }

    // Auto-advance after feedback
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((c) => c + 1)
        setSelectedId(null)
        setFeedback(null)
      } else {
        setFinished(true)
        onComplete?.({ score: isCorrect ? score + 1 : score, total: questions.length })
      }
    }, 1500)
  }, [feedback, question, currentQ, questions.length, score, onComplete])

  const restart = useCallback(() => {
    setCurrentQ(0)
    setSelectedId(null)
    setFeedback(null)
    setScore(0)
    setFinished(false)
  }, [])

  if (!questions.length) return null

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label="Visual quiz"
    >
      {/* Progress */}
      {!finished && (
        <div className="flex items-center gap-2 mb-4">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < currentQ
                  ? 'bg-accent-grounded'
                  : i === currentQ
                  ? 'bg-accent-stilled'
                  : 'bg-line-soft'
              }`}
            />
          ))}
          <span className="text-xs font-ui text-ink-tertiary ml-1">
            {currentQ + 1}/{questions.length}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div key={`q-${currentQ}`} {...FADE}>
            {/* Visual area */}
            {question.visual && (
              <div className="mb-4 flex items-center justify-center min-h-[200px] bg-surface rounded-calm">
                {question.visual}
              </div>
            )}

            {/* Prompt */}
            <p className="font-ui text-sm text-ink-primary mb-4 font-medium">
              {question.prompt}
            </p>

            {/* Options */}
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(question.options.length, 3)}, 1fr)` }}>
              {question.options.map((option) => {
                const isSelected = selectedId === option.id
                const isCorrectOption = option.correct
                const showCorrect = feedback && isCorrectOption
                const showIncorrect = feedback === 'incorrect' && isSelected && !isCorrectOption

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={!!feedback}
                    className={`
                      relative p-3 rounded-calm border text-sm font-ui text-center transition-all
                      ${showCorrect
                        ? 'bg-grounded-15 border-grounded-30 text-grounded'
                        : showIncorrect
                        ? 'bg-noticed-12 border-noticed-30 text-noticed'
                        : isSelected
                        ? 'bg-stilled-10 border-stilled-40 text-ink-primary'
                        : 'bg-elevated border-line-soft text-ink-secondary hover:border-stilled-40 cursor-pointer'
                      }
                      ${feedback ? 'cursor-default' : ''}
                    `}
                    animate={
                      showIncorrect
                        ? { x: [0, -4, 4, -3, 3, 0] }
                        : showCorrect
                        ? { scale: [1, 1.05, 1] }
                        : {}
                    }
                    transition={{ duration: showIncorrect ? 0.4 : 0.3 }}
                  >
                    {/* Visual option content */}
                    {option.visual ? (
                      <div className="mb-1">{option.visual}</div>
                    ) : null}
                    <span>{option.label}</span>

                    {/* Feedback icon */}
                    {showCorrect && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent-grounded flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6.5L4.5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        ) : (
          /* Finished state */
          <motion.div key="done" {...FADE} className="text-center py-6">
            <motion.div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{
                backgroundColor: score === questions.length
                  ? 'rgba(79, 122, 90, 0.15)'
                  : 'rgba(91, 111, 140, 0.15)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="text-2xl font-ui font-bold" style={{ color: score === questions.length ? '#4F7A5A' : '#5B6F8C' }}>
                {score}/{questions.length}
              </span>
            </motion.div>

            <p className="font-ui text-sm text-ink-secondary mb-4">
              {score === questions.length
                ? 'You identified everything correctly. The concepts are landing.'
                : score > questions.length / 2
                ? 'Good understanding. The parts you missed will come back for review.'
                : 'These concepts will become clearer with practice. No rush.'}
            </p>

            <button onClick={restart} className="btn btn-ghost text-sm">
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

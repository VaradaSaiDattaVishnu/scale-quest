import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import BreathingDot from './BreathingDot'

/**
 * NervousSystemCheckin -- The signature trauma-track widget. ~90 seconds. Opt-in.
 *
 * Flow:
 *   1. "Land in your body" -- 3 breaths with BreathingDot (15s, skippable)
 *   2. "What state?" -- Ventral / Sympathetic / Dorsal / Mixed
 *   3. "Intensity?" -- 1 to 5 dots
 *   4. "One glimmer?" -- optional text
 *   5. "Optional note" -- one sentence
 *   6. "Done" -- "Thanks for checking in."
 *
 * Props:
 *   onComplete -- callback({ state, intensity, glimmer, note, timestamp })
 */

const SETTLE = { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
const FADE_UP = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: SETTLE,
}

const STATES = [
  {
    key: 'ventral',
    label: 'Calm, curious, connected',
    description: 'Breath even. Body settled. Present.',
    selectedClass: 'bg-grounded-10 border-grounded-30',
  },
  {
    key: 'sympathetic',
    label: 'Activated',
    description: 'Faster breath, tension, urgency. Ready for action.',
    selectedClass: 'bg-noticed-10 border-noticed-30',
  },
  {
    key: 'dorsal',
    label: 'Withdrawn',
    description: 'Heavy, foggy, far away, numb. Energy is low.',
    selectedClass: 'bg-stilled-10 border-stilled-30',
  },
  {
    key: 'mixed',
    label: 'Mixed or unsure',
    description: 'Some of each, or hard to name right now.',
    selectedClass: 'bg-warm-10 border-warm-30',
  },
]

export default function NervousSystemCheckin({ onComplete }) {
  const [step, setStep] = useState(0)  // 0=breathe, 1=state, 2=intensity, 3=glimmer, 4=note, 5=done
  const [breathCount, setBreathCount] = useState(0)
  const [selectedState, setSelectedState] = useState(null)
  const [mixedNote, setMixedNote] = useState('')
  const [intensity, setIntensity] = useState(null)
  const [glimmer, setGlimmer] = useState('')
  const [note, setNote] = useState('')
  const breathTimerRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Breathing timer (15 seconds, 3 breaths at 4s each + buffer)
  useEffect(() => {
    if (step !== 0) return

    breathTimerRef.current = setInterval(() => {
      setBreathCount((c) => {
        if (c >= 2) {
          clearInterval(breathTimerRef.current)
          // Auto-advance after a gentle pause
          setTimeout(() => setStep(1), 1500)
          return c + 1
        }
        return c + 1
      })
    }, 5000) // 4s breath + 1s pause

    return () => clearInterval(breathTimerRef.current)
  }, [step])

  const handleSkipBreathing = useCallback(() => {
    clearInterval(breathTimerRef.current)
    setStep(1)
  }, [])

  const handleSelectState = useCallback((stateKey) => {
    setSelectedState(stateKey)
  }, [])

  const handleNext = useCallback(() => {
    setStep((s) => s + 1)
  }, [])

  const handleFinish = useCallback(() => {
    const result = {
      state: selectedState,
      mixedNote: selectedState === 'mixed' ? mixedNote : undefined,
      intensity,
      glimmer: glimmer.trim() || undefined,
      note: note.trim() || undefined,
      timestamp: Date.now(),
    }

    setStep(5)
    onComplete?.(result)

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('tapasya-checkins') || '[]')
      existing.push(result)
      localStorage.setItem('tapasya-checkins', JSON.stringify(existing))
    } catch {
      // localStorage may be unavailable
    }
  }, [selectedState, mixedNote, intensity, glimmer, note, onComplete])

  // Auto-save text fields on blur
  const handleBlur = useCallback((field, value) => {
    if (value.trim()) {
      try {
        localStorage.setItem(`tapasya-checkin-draft-${field}`, value)
      } catch {
        // localStorage may be unavailable
      }
    }
  }, [])

  return (
    <div
      className="card my-6 max-w-md mx-auto"
      role="region"
      aria-label="Nervous system check-in"
    >
      <AnimatePresence mode="wait">
        {/* Step 0: Breathe */}
        {step === 0 && (
          <motion.div
            key="breathe"
            className="text-center py-6"
            {...FADE_UP}
          >
            <p className="text-sm text-ink-secondary mb-6 font-ui">
              Land in your body. Three breaths.
            </p>

            <div className="flex justify-center mb-6">
              <BreathingDot size={72} />
            </div>

            <p className="text-sm text-ink-tertiary mb-1 font-ui">
              {breathCount < 3
                ? `Breath ${breathCount + 1} of 3`
                : 'Moving on...'}
            </p>

            <button
              onClick={handleSkipBreathing}
              className="btn btn-ghost text-xs mt-4"
            >
              Skip this time
            </button>
          </motion.div>
        )}

        {/* Step 1: What state? */}
        {step === 1 && (
          <motion.div key="state" {...FADE_UP}>
            <p className="text-sm text-ink-secondary mb-4 font-ui">
              What's your nervous system doing right now?
            </p>

            <div className="space-y-3 mb-4" role="radiogroup" aria-label="Current state">
              {STATES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => handleSelectState(s.key)}
                  role="radio"
                  aria-checked={selectedState === s.key}
                  className={`
                    w-full text-left px-4 py-3.5 rounded-gentle
                    border transition-all duration-quick ease-calm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                    ${selectedState === s.key
                      ? s.selectedClass
                      : 'bg-elevated border-line-soft hover:border-stilled-30'
                    }
                  `}
                >
                  <p className="text-sm font-ui font-medium text-ink-primary">
                    {s.label}
                  </p>
                  <p className="text-xs text-ink-tertiary mt-0.5">
                    {s.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Mixed text field */}
            <AnimatePresence>
              {selectedState === 'mixed' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={SETTLE}
                  className="mb-4"
                >
                  <textarea
                    value={mixedNote}
                    onChange={(e) => setMixedNote(e.target.value)}
                    onBlur={() => handleBlur('mixed', mixedNote)}
                    placeholder="What's the mix like? (optional)"
                    rows={2}
                    className="input w-full resize-none text-sm"
                    aria-label="Describe your mixed state"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleNext}
              disabled={!selectedState}
              className="btn btn-primary text-sm w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Step 2: Intensity */}
        {step === 2 && (
          <motion.div key="intensity" {...FADE_UP}>
            <p className="text-sm text-ink-secondary mb-5 font-ui">
              How intense is that feeling? Not good or bad -- just how much.
            </p>

            <div
              className="flex justify-center gap-4 mb-6"
              role="radiogroup"
              aria-label="Intensity from 1 to 5"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setIntensity(level)}
                  role="radio"
                  aria-checked={intensity === level}
                  aria-label={`Intensity ${level} of 5`}
                  className={`
                    w-10 h-10 rounded-full
                    border-2 transition-all duration-quick ease-calm
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-grounded
                    ${intensity === level
                      ? 'bg-accent-stilled border-accent-stilled scale-110'
                      : intensity !== null && level <= intensity
                      ? 'bg-stilled-20 border-stilled-40'
                      : 'bg-surface border-line-soft hover:border-stilled-30'
                    }
                  `}
                >
                  <span className={`text-xs font-ui font-medium ${
                    intensity === level ? 'text-white' : 'text-ink-tertiary'
                  }`}>
                    {level}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex justify-between text-xs text-ink-tertiary mb-6 px-2">
              <span>Barely there</span>
              <span>Very strong</span>
            </div>

            <button
              onClick={handleNext}
              disabled={intensity === null}
              className="btn btn-primary text-sm w-full disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Step 3: Glimmer */}
        {step === 3 && (
          <motion.div key="glimmer" {...FADE_UP}>
            <p className="text-sm text-ink-secondary mb-1 font-ui">
              One glimmer?
            </p>
            <p className="text-xs text-ink-tertiary mb-4">
              Anything small that felt okay today. A sip of water, sunlight, a moment of quiet.
            </p>

            <textarea
              value={glimmer}
              onChange={(e) => setGlimmer(e.target.value)}
              onBlur={() => handleBlur('glimmer', glimmer)}
              placeholder="Optional -- skip if nothing comes to mind"
              rows={2}
              className="input w-full resize-none text-sm font-reading mb-4"
              aria-label="One glimmer"
            />

            <button
              onClick={handleNext}
              className="btn btn-primary text-sm w-full"
            >
              {glimmer.trim() ? 'Next' : 'Skip'}
            </button>
          </motion.div>
        )}

        {/* Step 4: Note */}
        {step === 4 && (
          <motion.div key="note" {...FADE_UP}>
            <p className="text-sm text-ink-secondary mb-4 font-ui">
              Anything else in one sentence? Completely optional.
            </p>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => handleBlur('note', note)}
              placeholder="One sentence, or nothing at all"
              rows={2}
              className="input w-full resize-none text-sm font-reading mb-4"
              aria-label="Optional note"
            />

            <button
              onClick={handleFinish}
              className="btn btn-primary text-sm w-full"
            >
              Done
            </button>
          </motion.div>
        )}

        {/* Step 5: Thanks */}
        {step === 5 && (
          <motion.div
            key="done"
            className="text-center py-6"
            {...FADE_UP}
          >
            <div className="flex justify-center mb-4">
              <BreathingDot size={40} />
            </div>

            <p className="text-body text-ink-primary font-reading mb-2">
              Thanks for checking in.
            </p>
            <p className="text-sm text-ink-tertiary">
              That's all. No analysis, no score. Just noticing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step indicator */}
      {step < 5 && (
        <div className="flex justify-center gap-1.5 mt-5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`
                w-1.5 h-1.5 rounded-full transition-all duration-normal ease-calm
                ${s === step
                  ? 'bg-accent-stilled w-4'
                  : s < step
                  ? 'bg-grounded-20'
                  : 'bg-line-soft'
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  )
}

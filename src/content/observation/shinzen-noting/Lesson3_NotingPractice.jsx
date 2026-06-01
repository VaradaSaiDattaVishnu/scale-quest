import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Noting Practice
 * Guided timed practice with a noting timer and label selector.
 * Builds fluency in real-time sensory categorization.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

const CATEGORIES = [
  { label: 'See Out', color: SAGE },
  { label: 'Hear Out', color: AMBER },
  { label: 'Feel Out', color: SLATE },
  { label: 'See In', color: SAGE },
  { label: 'Hear In', color: AMBER },
  { label: 'Feel In', color: SLATE },
]

/* ── Noting Timer widget ── */
function NotingTimer() {
  const [active, setActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(120)
  const [notes, setNotes] = useState([])
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!active) return
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          setActive(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [active])

  const handleStart = useCallback(() => {
    setActive(true)
    setTimeLeft(120)
    setNotes([])
  }, [])

  const handleNote = useCallback((label) => {
    if (!active) return
    setNotes((prev) => [...prev, { label, time: 120 - timeLeft }])
  }, [active, timeLeft])

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const categoryCounts = CATEGORIES.reduce((acc, c) => {
    acc[c.label] = notes.filter((n) => n.label === c.label).length
    return acc
  }, {})

  return (
    <div className="bg-surface rounded-gentle p-6 border border-line-soft">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-ui text-ink-tertiary">
          {active ? 'Note each experience as it arises.' : timeLeft === 0 ? 'Practice complete.' : 'Tap Start, then tap a category each time you notice something.'}
        </p>
        <span className="text-lg font-mono" style={{ color: active ? SAGE : SLATE }}>
          {formatTime(timeLeft)}
        </span>
      </div>

      {/* category buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {CATEGORIES.map(({ label, color }) => (
          <button
            key={label}
            onClick={() => handleNote(label)}
            disabled={!active}
            className="rounded-calm px-3 py-3 border text-sm font-ui font-semibold transition-all"
            style={{
              borderColor: active ? color : `${color}30`,
              color: active ? color : `${color}60`,
              backgroundColor: active ? `${color}08` : 'transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* start button or results */}
      {!active && timeLeft > 0 && (
        <button onClick={handleStart} className="btn btn-primary w-full">
          Start 2-minute practice
        </button>
      )}

      {/* live note stream */}
      {(active || timeLeft === 0) && notes.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-ui text-ink-tertiary mb-2">Your noting stream:</p>
          <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
            <AnimatePresence>
              {notes.map((n, i) => {
                const cat = CATEGORIES.find((c) => c.label === n.label)
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[10px] font-ui px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${cat.color}12`, color: cat.color }}
                  >
                    {n.label}
                  </motion.span>
                )
              })}
            </AnimatePresence>
          </div>

          {/* summary */}
          {timeLeft === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-elevated rounded-calm p-4 border border-line-soft"
            >
              <p className="text-xs font-ui text-ink-tertiary mb-2">Distribution ({notes.length} total notes):</p>
              <div className="space-y-1">
                {CATEGORIES.map(({ label, color }) => {
                  const count = categoryCounts[label]
                  const pct = notes.length > 0 ? Math.round((count / notes.length) * 100) : 0
                  return (
                    <div key={label} className="flex items-center gap-2">
                      <span className="text-[10px] font-ui w-14" style={{ color }}>{label}</span>
                      <div className="flex-1 h-2 bg-line-soft rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                      </div>
                      <span className="text-[10px] font-ui w-6 text-right" style={{ color }}>{count}</span>
                    </div>
                  )
                })}
              </div>
              <p className="text-xs text-ink-tertiary mt-3 italic">
                Notice which channels dominate. This reveals your attention habits.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Lesson3_NotingPractice({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Noting Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Two minutes of real-time sensory observation.
        </p>
      </header>

      {/* ── Research: noting and attention ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The transition from understanding a noting system to actually using it is where most people stall. Intellectual comprehension of See/Hear/Feel and In/Out is straightforward. Real-time application -- labeling experiences as they arise, one every few seconds, without getting caught up in any of them -- requires practice. The good news is that the skill develops quickly. Most practitioners report noticeable improvement within the first few sessions, and functional fluency within a few weeks of daily practice.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on noting-style mindfulness practices (Brewer et al., 2011) found that experienced meditators showed reduced activity in the default mode network (DMN) -- the brain region associated with mind-wandering and self-referential thought. More importantly, when the DMN did activate, experienced practitioners showed stronger coupling with brain regions associated with cognitive control, suggesting they could detect and redirect mind-wandering more efficiently. Noting appears to be one of the mechanisms that develops this capacity.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER: how to note ── */}
      <VisualStepExplainer
        title="The mechanics of noting"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[9px] font-ui" style={{ color: SAGE }}>1</span>
                  </motion.div>
                  <p className="text-xs font-reading text-ink-secondary">Notice whatever is most prominent right now.</p>
                </div>
              </div>
            ),
            caption: 'Step 1: Let your attention land wherever it naturally goes. Do not search for anything specific.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: AMBER }}>
                    <span className="text-[9px] font-ui" style={{ color: AMBER }}>2</span>
                  </div>
                  <p className="text-xs font-reading text-ink-secondary">Silently apply the label: See/Hear/Feel + In/Out.</p>
                </div>
              </div>
            ),
            caption: 'Step 2: Label it. The label is brief and silent. "Hear Out." "Feel In." One or two words, no elaboration.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SLATE }}>
                    <span className="text-[9px] font-ui" style={{ color: SLATE }}>3</span>
                  </div>
                  <p className="text-xs font-reading text-ink-secondary">Let it go. Return to open awareness. Wait for the next experience.</p>
                </div>
              </div>
            ),
            caption: 'Step 3: Release. Do not hold onto the experience or analyze it. Let it pass and wait for the next one to arise naturally.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="flex gap-1"
                    animate={{ x: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {['See Out', 'Feel In', 'Hear Out', 'See In', 'Feel In'].map((note, i) => {
                      const c = note.includes('See') ? SAGE : note.includes('Hear') ? AMBER : SLATE
                      return (
                        <span key={i} className="text-[9px] font-ui px-1.5 py-0.5 rounded-full" style={{ backgroundColor: `${c}12`, color: c }}>
                          {note}
                        </span>
                      )
                    })}
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'The result is a continuous stream of labels, roughly one every 2-5 seconds. Speed comes with practice. Accuracy is not critical -- the act of labeling is what trains attention.',
          },
        ]}
      />

      {/* ── INTERACTIVE: Noting Timer ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          2-Minute Noting Practice
        </h2>
        <p className="text-xs font-ui text-ink-tertiary text-center mb-4">
          Sit comfortably. Tap Start, then tap the matching category each time you notice something.
        </p>
        <NotingTimer />
      </section>

      {/* ── Research: common challenges ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Three challenges commonly arise in early noting practice. First, "over-labeling" -- trying to note every single micro-experience and becoming frantic. The fix is to slow down. One note every 3-5 seconds is plenty. Second, "wrong-label anxiety" -- worrying that you categorized something incorrectly. The fix is to remember that the label does not need to be perfect. Any label brings more awareness than no label. Third, "going blank" -- feeling like nothing is happening. The fix is to gently narrow the search: "Is there anything I can see right now? Hear? Feel?" Something is always present.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Shinzen Young often says that noting practice is "like training a puppy." You bring attention to the present, it wanders off, you gently bring it back. The wandering is not failure -- it is the repetition that builds the skill. Each time you notice that you have stopped noting and start again, that moment of noticing is itself an act of metacognitive awareness. The practice is working precisely when it feels like it is not.
        </p>
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'How often should you aim to apply a noting label?',
            options: [
              { id: 'every', label: 'Every single micro-experience without pause', correct: false },
              { id: 'few', label: 'Roughly every 2-5 seconds, at a comfortable pace', correct: true },
              { id: 'min', label: 'Once per minute', correct: false },
            ],
          },
          {
            prompt: 'What did Brewer et al. (2011) find in experienced meditators?',
            options: [
              { id: 'dmn', label: 'Reduced default mode network activity and better control when it activated', correct: true },
              { id: 'mem', label: 'Improved long-term memory', correct: false },
              { id: 'speed', label: 'Faster reaction times in all tasks', correct: false },
            ],
          },
          {
            prompt: 'When you realize you stopped noting and got lost in thought, that moment of realization is:',
            options: [
              { id: 'fail', label: 'A sign the practice is not working', correct: false },
              { id: 'success', label: 'Itself an act of metacognitive awareness -- the practice working', correct: true },
              { id: 'restart', label: 'A signal to restart the timer', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.shinzen-noting.noting-practice-feynman"
        prompt="Guide a friend through their first 1-minute noting practice. Explain what to do, what challenges to expect, and how to handle them."
        rubric={[
          'You gave clear, step-by-step instructions for the noting process.',
          'You mentioned at least one common challenge and its fix.',
          'You were encouraging about imperfection.',
          'Your instructions could be followed by someone with zero meditation experience.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="After the 2-minute noting practice, what patterns did you notice? Which channels dominated? Did anything surprise you about the distribution of your attention? Write honestly -- there are no right answers."
          lessonId="observation.shinzen-noting.noting-practice"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Shinzen Noting
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Equanimity
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Continue
          </button>
        </div>
      </footer>
    </article>
  )
}

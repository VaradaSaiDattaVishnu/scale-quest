import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  NeuronAnimation,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Drilling the Major System
 * Speed drills for automaticity. Flash-card style animations.
 * Research: automaticity, power law of practice.
 */

const DRILL_ITEMS = [
  { num: '15', answer: 'tl', word: 'tail' },
  { num: '32', answer: 'mn', word: 'moon' },
  { num: '47', answer: 'rk', word: 'rock' },
  { num: '61', answer: 'jt', word: 'jet' },
  { num: '83', answer: 'fm', word: 'foam' },
  { num: '09', answer: 'sp', word: 'soap' },
  { num: '26', answer: 'nj', word: 'nacho' },
  { num: '70', answer: 'ks', word: 'kiss' },
]

function FlashDrill() {
  const [current, setCurrent] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [completed, setCompleted] = useState(0)

  useEffect(() => {
    if (startTime && !showAnswer) {
      const id = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 100) / 10)
      }, 100)
      return () => clearInterval(id)
    }
  }, [startTime, showAnswer])

  const handleReveal = useCallback(() => {
    setShowAnswer(true)
  }, [])

  const handleNext = useCallback(() => {
    setShowAnswer(false)
    setCompleted((c) => c + 1)
    setCurrent((c) => (c + 1) % DRILL_ITEMS.length)
    setStartTime(Date.now())
    setElapsed(0)
  }, [])

  const handleStart = useCallback(() => {
    setStartTime(Date.now())
    setElapsed(0)
    setCompleted(0)
    setCurrent(0)
    setShowAnswer(false)
  }, [])

  const item = DRILL_ITEMS[current]

  if (!startTime) {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <p className="font-ui text-sm text-ink-secondary text-center">
          You will see a number. Decode it as fast as you can, then reveal the answer.
        </p>
        <button
          onClick={handleStart}
          className="px-6 py-3 rounded-calm font-ui text-sm font-medium text-white"
          style={{ backgroundColor: '#4F7A5A' }}
        >
          Start Drill
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-4 text-xs font-ui text-ink-tertiary">
        <span>Card {completed + 1} of {DRILL_ITEMS.length}</span>
        <span>{elapsed}s</span>
      </div>
      <motion.div
        key={current}
        className="w-32 h-32 rounded-gentle bg-surface border-2 flex items-center justify-center"
        style={{ borderColor: '#5B6F8C' }}
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-mono text-4xl font-bold" style={{ color: '#5B6F8C' }}>
          {item.num}
        </span>
      </motion.div>

      {showAnswer ? (
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg" style={{ color: '#4F7A5A' }}>
              {item.answer.toUpperCase()}
            </span>
            <span className="text-ink-tertiary">&rarr;</span>
            <span className="font-ui text-lg font-bold" style={{ color: '#4F7A5A' }}>
              {item.word}
            </span>
          </div>
          <button
            onClick={completed + 1 >= DRILL_ITEMS.length ? () => setStartTime(null) : handleNext}
            className="px-5 py-2 rounded-calm font-ui text-sm font-medium text-white mt-2"
            style={{ backgroundColor: '#5B6F8C' }}
          >
            {completed + 1 >= DRILL_ITEMS.length ? 'Done' : 'Next'}
          </button>
        </motion.div>
      ) : (
        <button
          onClick={handleReveal}
          className="px-5 py-2 rounded-calm font-ui text-sm font-medium border border-line-soft text-ink-secondary"
        >
          Reveal Answer
        </button>
      )}
    </div>
  )
}

export default function Lesson3_Drilling({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Drilling for Speed
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          From conscious effort to automatic reflex.
        </p>
      </header>

      {/* ---- Research paragraph: Automaticity ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          When you first learned to read, sounding out each letter was slow, effortful, and exhausting. Now you read words as whole units without conscious effort. Psychologists call this transition automaticity -- the point at which a skill becomes so practiced that it executes without occupying working memory. The Major System needs the same transition. If you have to stop and think "7 is... K," the system is too slow to be useful. When 7 instantly evokes K without deliberate recall, the system becomes a genuine tool.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The path to automaticity follows a well-documented pattern called the power law of practice, first described by Snoddy in 1926 and formalized by Newell and Rosenbloom in 1981. Performance improves rapidly at first, then more slowly, but improvement never completely stops. The critical variable is not time spent but repetitions completed. Each correct, timed retrieval strengthens the association. Passive review -- staring at a chart -- does almost nothing. Active, timed recall does almost everything.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          DeKeyser's skill acquisition theory (2007) adds that automaticity requires consistent mapping: the same input must always produce the same output. The Major System satisfies this perfectly -- 7 always maps to K or G, never anything else. This consistency is what allows the neural pathways to streamline. With enough practice, the phonetic code becomes as automatic as reading itself.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Automaticity Curve ---- */}
      <VisualStepExplainer
        title="From slow to instant"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
                  <line x1="30" y1="120" x2="270" y2="120" stroke="var(--color-ink-tertiary)" strokeWidth="1" opacity="0.3" />
                  <line x1="30" y1="120" x2="30" y2="10" stroke="var(--color-ink-tertiary)" strokeWidth="1" opacity="0.3" />
                  <text x="10" y="70" fill="var(--color-ink-tertiary)" fontSize="8" transform="rotate(-90 10 70)" textAnchor="middle">Response Time</text>
                  <text x="150" y="136" fill="var(--color-ink-tertiary)" fontSize="8" textAnchor="middle">Practice Trials</text>
                  <motion.path
                    d="M30 20 C60 22, 80 50, 110 75 C140 95, 180 108, 270 112"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                  <motion.circle cx="30" cy="20" r="4" fill="#B89466"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
                  <motion.text x="38" y="18" fill="#B89466" fontSize="8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Slow at first</motion.text>
                  <motion.circle cx="270" cy="112" r="4" fill="#4F7A5A"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} />
                  <motion.text x="210" y="108" fill="#4F7A5A" fontSize="8"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }}>Automatic</motion.text>
                </svg>
              </div>
            ),
            caption: 'The power law of practice: steep improvement early, then a long tail of refinement. The curve never truly flattens -- you keep getting faster.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex gap-4">
                  {[
                    { label: 'Day 1', time: '4.2s', color: '#B89466', width: '100%' },
                    { label: 'Day 7', time: '1.8s', color: '#5B6F8C', width: '43%' },
                    { label: 'Day 30', time: '0.6s', color: '#4F7A5A', width: '14%' },
                  ].map((stage, i) => (
                    <div key={stage.label} className="flex flex-col items-center w-20">
                      <motion.div
                        className="w-full rounded-t-sm"
                        style={{ backgroundColor: stage.color }}
                        initial={{ height: 0 }}
                        animate={{ height: stage.width === '100%' ? 100 : stage.width === '43%' ? 43 : 14 }}
                        transition={{ duration: 0.6, delay: i * 0.3 }}
                      />
                      <p className="text-xs font-ui font-bold mt-2" style={{ color: stage.color }}>{stage.time}</p>
                      <p className="text-[9px] font-ui text-ink-tertiary">{stage.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Typical progression: 4+ seconds per digit pair on day one, under one second within a month. Daily short drills are more effective than long infrequent sessions.',
          },
          {
            visual: (
              <NeuronAnimation mode="strengthening" interactive={false} showLabels={true} />
            ),
            caption: 'Each timed retrieval strengthens the neural pathway between digit and sound. Thick, fast connections replace thin, slow ones.',
          },
        ]}
      />

      {/* ---- Research paragraph: Deliberate practice ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Anders Ericsson's research on deliberate practice (1993) established that improvement requires more than repetition -- it requires focused, feedback-rich repetition at the edge of your current ability. For Major System drilling, this means timing yourself, noting which digit pairs are slowest, and focusing extra practice on those weak spots rather than running through the easy ones you already know. A five-minute drill targeting your three slowest pairs is worth more than thirty minutes of comfortable review.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The key insight from Ericsson's work is that the quality of practice matters more than the quantity. Mindless repetition produces only modest gains. Deliberate, focused practice -- where you identify weaknesses, target them specifically, and monitor improvement -- produces expert performance. Applied to the Major System, this means your drill sessions should feel slightly challenging. If every card feels easy, you need harder items or a tighter time limit.
        </p>
      </section>

      {/* ---- FLASH DRILL ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Flash Drill
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          See a number, decode it in your head, then reveal the answer
        </p>
        <div className="bg-surface rounded-gentle border border-line-soft p-6">
          <FlashDrill />
        </div>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Common Mistakes ---- */}
      <VisualStepExplainer
        title="Common pitfalls in drilling"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-surface rounded-calm border border-line-soft p-3 text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-1">Spelling-based</p>
                    <p className="font-mono text-sm text-ink-secondary">"knife" = K?</p>
                    <motion.div className="mt-2 h-1 rounded-full" style={{ backgroundColor: '#B89466' }}
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5 }} />
                    <p className="text-[9px] font-ui mt-1" style={{ color: '#B89466' }}>No -- it is the sound that counts</p>
                  </div>
                  <div className="bg-surface rounded-calm border border-line-soft p-3 text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-1">Sound-based</p>
                    <p className="font-mono text-sm text-ink-secondary">"knife" = N</p>
                    <motion.div className="mt-2 h-1 rounded-full" style={{ backgroundColor: '#4F7A5A' }}
                      initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5 }} />
                    <p className="text-[9px] font-ui mt-1" style={{ color: '#4F7A5A' }}>Correct -- only the sound matters</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'The Major System is phonetic, not spelling-based. "Knife" starts with N sound (digit 2), not K sound. Always listen to the sound, not the letter.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm border border-line-soft p-4 max-w-xs text-center">
                  <p className="text-xs font-ui text-ink-tertiary mb-2">Double consonants</p>
                  <p className="font-mono text-lg text-ink-secondary">"butter"</p>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="font-mono text-sm" style={{ color: '#4F7A5A' }}>B=9</span>
                    <span className="font-mono text-sm" style={{ color: '#5B6F8C' }}>tt=1</span>
                    <span className="font-mono text-sm" style={{ color: '#4F7A5A' }}>R=4</span>
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                    "tt" is one sound = one digit, not two
                  </p>
                  <p className="font-mono text-sm font-bold mt-1" style={{ color: '#4F7A5A' }}>butter = 914</p>
                </div>
              </div>
            ),
            caption: 'Double letters that make a single sound count as one digit. "Butter" has one T sound, so tt = 1 (not 11). Always count sounds, not letters.',
          },
        ]}
      />

      {/* ---- DragMatch ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Decode These Words
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Match each word to the number it encodes
        </p>
        <DragMatch
          id="major-system-drill-drag"
          pairs={[
            { left: 'tail', right: '15' },
            { left: 'moon', right: '32' },
            { left: 'rock', right: '47' },
            { left: 'fish', right: '86' },
            { left: 'soap', right: '09' },
            { left: 'net', right: '21' },
          ]}
        />
      </section>

      {/* ---- Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The Major System encodes based on...',
            options: [
              { id: 'spell', label: 'Spelling of letters', correct: false },
              { id: 'sound', label: 'Consonant sounds', correct: true },
              { id: 'vowel', label: 'Vowel positions', correct: false },
            ],
          },
          {
            prompt: 'The "power law of practice" means...',
            options: [
              { id: 'linear', label: 'Improvement is steady and linear', correct: false },
              { id: 'fast', label: 'Improvement is fast at first, then gradually slows', correct: true },
              { id: 'plat', label: 'You hit a permanent plateau after a week', correct: false },
            ],
          },
          {
            prompt: 'What number does the word "knife" encode?',
            options: [
              { id: '28', label: '28 (N-F)', correct: true },
              { id: '78', label: '78 (K-F)', correct: false },
              { id: '728', label: '728 (K-N-F)', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l3-feynman"
        prompt="Explain to a friend why short daily drills are more effective than one long weekly session for learning the Major System code."
        rubric={[
          'You mentioned the power law of practice or automaticity.',
          'You connected spacing to stronger memory traces.',
          'You distinguished active recall from passive review.',
          'Your explanation was concrete, not just abstract principles.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Memorizing phone numbers
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

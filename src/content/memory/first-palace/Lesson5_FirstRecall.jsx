import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  MemoryPalace3D,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- First Recall
 * Module 2: Your First Palace
 *
 * User's first full palace recall attempt. Timer, self-assessment.
 * Research on the testing effect applied to spatial memory.
 */

/* --- Timer Component --- */
const RecallTimer = ({ onTimerEnd }) => {
  const [phase, setPhase] = useState('ready')   // ready | running | done
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)

  const startTimer = useCallback(() => {
    setPhase('running')
    setSeconds(0)
  }, [])

  const stopTimer = useCallback(() => {
    setPhase('done')
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (onTimerEnd) onTimerEnd(seconds)
  }, [seconds, onTimerEnd])

  useEffect(() => {
    if (phase === 'running') {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [phase])

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        className="w-32 h-32 rounded-full border-4 flex items-center justify-center"
        style={{
          borderColor: phase === 'running' ? '#4F7A5A' : phase === 'done' ? '#B89466' : '#5B6F8C',
          backgroundColor: phase === 'running' ? 'rgba(79,122,90,0.06)' : 'transparent',
        }}
        animate={phase === 'running' ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-center">
          <p className="font-ui text-2xl font-bold" style={{ color: phase === 'running' ? '#4F7A5A' : '#5B6F8C' }}>
            {mins}:{secs.toString().padStart(2, '0')}
          </p>
          <p className="text-[10px] font-ui text-ink-tertiary">
            {phase === 'ready' ? 'ready' : phase === 'running' ? 'recalling...' : 'complete'}
          </p>
        </div>
      </motion.div>

      {phase === 'ready' && (
        <button
          onClick={startTimer}
          className="rounded-gentle px-6 py-2 font-ui text-sm border-2"
          style={{ borderColor: '#4F7A5A', color: '#4F7A5A' }}
        >
          Start Recall
        </button>
      )}
      {phase === 'running' && (
        <button
          onClick={stopTimer}
          className="rounded-gentle px-6 py-2 font-ui text-sm border-2"
          style={{ borderColor: '#B89466', color: '#B89466' }}
        >
          I'm Done
        </button>
      )}
      {phase === 'done' && (
        <p className="font-ui text-sm text-ink-secondary">
          Recall completed in {mins > 0 ? `${mins}m ` : ''}{secs}s
        </p>
      )}
    </div>
  )
}

/* --- Self Assessment Component --- */
const SelfAssessment = () => {
  const [scores, setScores] = useState({})
  const criteria = [
    { id: 'completeness', label: 'I recalled all my loci in order', levels: ['Missed several', 'Missed 1-2', 'Got them all'] },
    { id: 'images', label: 'I could see the vivid images at each locus', levels: ['Mostly blank', 'Some vivid, some faint', 'All vivid'] },
    { id: 'backward', label: 'I could walk backward through the palace', levels: ['Could not do it', 'Halting but possible', 'Smooth both ways'] },
    { id: 'speed', label: 'The walk felt fluent, not halting', levels: ['Very slow', 'Moderate pace', 'Smooth and natural'] },
  ]

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {criteria.map((c) => (
        <div key={c.id} className="bg-surface rounded-calm border border-line-soft p-4">
          <p className="font-ui text-sm text-ink-primary font-medium mb-3">{c.label}</p>
          <div className="flex gap-2">
            {c.levels.map((level, i) => {
              const isSelected = scores[c.id] === i
              const colors = ['#B89466', '#5B6F8C', '#4F7A5A']
              return (
                <button
                  key={level}
                  onClick={() => setScores(prev => ({ ...prev, [c.id]: i }))}
                  className="flex-1 rounded-gentle px-2 py-2 font-ui text-[10px] border transition-all"
                  style={{
                    borderColor: isSelected ? colors[i] : 'var(--color-line-soft)',
                    backgroundColor: isSelected ? `${colors[i]}12` : 'transparent',
                    color: isSelected ? colors[i] : 'var(--color-ink-tertiary)',
                  }}
                >
                  {level}
                </button>
              )
            })}
          </div>
        </div>
      ))}
      {Object.keys(scores).length === criteria.length && (
        <motion.div
          className="bg-surface rounded-calm border border-line-soft p-4 text-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-ui text-sm text-ink-primary font-medium mb-1">
            Great self-assessment.
          </p>
          <p className="font-reading text-sm text-ink-secondary leading-relaxed">
            There is no failing score here. This is your baseline. Every weak spot you identified is a spot you can now strengthen deliberately.
          </p>
        </motion.div>
      )}
    </div>
  )
}

/* --- inline SVG: testing effect illustration --- */
const TestingEffectDiagram = () => (
  <svg width="280" height="130" viewBox="0 0 280 130" fill="none" className="mx-auto">
    {/* Study group */}
    <g>
      <rect x="10" y="10" width="120" height="90" rx="6" stroke="#B89466" strokeWidth="1.5" fill="rgba(184,148,102,0.04)" />
      <text x="70" y="30" textAnchor="middle" fill="#B89466" fontSize="10" className="font-ui font-semibold">Re-study</text>
      <text x="70" y="46" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="8" className="font-ui">Study -> Study -> Study</text>
      {/* Retention bar */}
      <rect x="25" y="58" width="90" height="10" rx="3" fill="rgba(184,148,102,0.1)" />
      <motion.rect
        x="25" y="58" width="35" height="10" rx="3"
        fill="#B89466"
        initial={{ width: 0 }}
        animate={{ width: 35 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <text x="70" y="84" textAnchor="middle" fill="#B89466" fontSize="11" className="font-ui font-bold">35%</text>
      <text x="70" y="94" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="8" className="font-ui">after one week</text>
    </g>

    {/* Test group */}
    <g>
      <rect x="150" y="10" width="120" height="90" rx="6" stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.04)" />
      <text x="210" y="30" textAnchor="middle" fill="#4F7A5A" fontSize="10" className="font-ui font-semibold">Retrieve</text>
      <text x="210" y="46" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="8" className="font-ui">Study -> Test -> Test</text>
      {/* Retention bar */}
      <rect x="165" y="58" width="90" height="10" rx="3" fill="rgba(79,122,90,0.1)" />
      <motion.rect
        x="165" y="58" width="72" height="10" rx="3"
        fill="#4F7A5A"
        initial={{ width: 0 }}
        animate={{ width: 72 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <text x="210" y="84" textAnchor="middle" fill="#4F7A5A" fontSize="11" className="font-ui font-bold">80%</text>
      <text x="210" y="94" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="8" className="font-ui">after one week</text>
    </g>

    <text x="140" y="122" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="8" className="font-ui">
      Roediger & Karpicke (2006) -- same total time
    </text>
  </svg>
)

export default function Lesson5_FirstRecall({
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
          Your First Recall
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The moment of truth: walk through, recall, and see where you stand.
        </p>
      </header>

      {/* ---- Research: the testing effect ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          One of the most robust findings in cognitive psychology is the testing effect: retrieving information from memory strengthens it far more than restudying the same information. Roediger and Karpicke (2006) showed that students who studied a passage once and then practiced retrieving it twice remembered 80% a week later. Students who studied the passage three times -- same total time -- remembered only 35%.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Applied to the memory palace, this means the recall attempt you are about to do is not just an assessment -- it is the single most powerful learning event in this module. Every locus you successfully recall becomes stronger. Every locus where you struggle generates a "desirable difficulty" that, once resolved, produces an especially durable trace. The act of trying to remember is itself what builds memory.
        </p>
      </section>

      {/* ---- Testing Effect Visual ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          The Testing Effect
        </h2>
        <div className="bg-surface rounded-calm border border-line-soft p-6">
          <TestingEffectDiagram />
        </div>
      </section>

      {/* ---- VISUAL EXPLAINER: The Recall Process ---- */}
      <VisualStepExplainer
        title="How to do your first recall"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  {['Breathe', 'Close eyes', 'Stand at door'].map((step, i) => (
                    <motion.div
                      key={step}
                      className="bg-surface rounded-calm px-3 py-2 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div
                        className="w-6 h-6 rounded-full mx-auto flex items-center justify-center mb-1"
                        style={{ backgroundColor: 'rgba(79,122,90,0.1)' }}
                      >
                        <span className="font-ui text-[10px] font-bold" style={{ color: '#4F7A5A' }}>{i + 1}</span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-secondary">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Step 1: Settle in. Take a breath. Close your eyes. Place yourself at the entrance of your palace.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="260" height="60" viewBox="0 0 260 60" fill="none" className="mx-auto">
                  {[1, 2, 3, 4, 5].map((n, i) => (
                    <g key={n}>
                      <motion.circle
                        cx={26 + i * 55} cy="30" r="18"
                        stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.06)"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                      />
                      <text x={26 + i * 55} y="34" textAnchor="middle" fill="#4F7A5A" fontSize="10" className="font-ui font-bold">{n}</text>
                      {i < 4 && (
                        <motion.line
                          x1={44 + i * 55} y1="30" x2={63 + i * 55} y2="30"
                          stroke="#4F7A5A" strokeWidth="1" strokeDasharray="3 2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: i * 0.5, duration: 0.5 }}
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            ),
            caption: 'Step 2: Walk forward, locus by locus. At each stop, see the image. Say it aloud or in your mind. Then move to the next.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-[10px] font-ui text-ink-tertiary">Blank spot?</p>
                    <p className="text-xs font-ui font-medium mt-1" style={{ color: '#B89466' }}>
                      Skip it. Keep walking.
                    </p>
                  </div>
                  <svg width="20" height="12" viewBox="0 0 20 12">
                    <path d="M2 6H16M16 6L12 2M16 6L12 10" stroke="var(--color-ink-tertiary)" strokeWidth="1.5" />
                  </svg>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-[10px] font-ui text-ink-tertiary">After finishing:</p>
                    <p className="text-xs font-ui font-medium mt-1" style={{ color: '#4F7A5A' }}>
                      Return to repair.
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Step 3: If a spot is blank, do not stop and struggle. Skip it, note it, and keep going. You will return to repair afterward.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="260" height="60" viewBox="0 0 260 60" fill="none" className="mx-auto">
                  {[5, 4, 3, 2, 1].map((n, i) => (
                    <g key={`bwd-${n}`}>
                      <motion.circle
                        cx={26 + i * 55} cy="30" r="18"
                        stroke="#B89466" strokeWidth="1.5" fill="rgba(184,148,102,0.06)"
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                      />
                      <text x={26 + i * 55} y="34" textAnchor="middle" fill="#B89466" fontSize="10" className="font-ui font-bold">{n}</text>
                      {i < 4 && (
                        <motion.line
                          x1={44 + i * 55} y1="30" x2={63 + i * 55} y2="30"
                          stroke="#B89466" strokeWidth="1" strokeDasharray="3 2"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ delay: i * 0.5, duration: 0.5 }}
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            ),
            caption: 'Step 4: Now walk backward. Start at the last locus and work your way to the entrance. Note every spot that felt harder in reverse.',
          },
        ]}
      />

      {/* ---- TIMED RECALL EXERCISE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Timed Recall
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Walk through your palace from start to finish. Time yourself.
        </p>
        <div className="bg-surface rounded-calm border border-line-soft p-8">
          <RecallTimer />
        </div>
      </section>

      {/* ---- SELF ASSESSMENT ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Self-Assessment
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Be honest -- this is your baseline, not a test
        </p>
        <SelfAssessment />
      </section>

      {/* ---- Research: testing effect + spatial memory ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The testing effect is amplified by spatial context. Godden and Baddeley (1975) famously showed that divers who learned words underwater remembered them better underwater than on land -- context-dependent memory. Your palace provides a stable internal context for every item stored within it. Each recall attempt reinstates that spatial context, triggering the same hippocampal place cells that encoded the information.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why palace recall is so effective: it combines the testing effect (retrieval strengthens memory) with context reinstatement (the spatial walk reactivates encoding conditions) and dual coding (verbal + visual). Three powerful principles operating simultaneously.
        </p>
      </section>

      {/* ---- Palace Walkthrough ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Review Your Palace
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Click each locus to revisit and strengthen the connection
        </p>
        <MemoryPalace3D showLoci={true} />
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why is the recall attempt itself the most powerful part of learning?',
            options: [
              { id: 'proof', label: 'It proves you already know the material', correct: false },
              { id: 'testing', label: 'Retrieving from memory strengthens the memory trace more than restudying', correct: true },
              { id: 'focus', label: 'It forces you to focus harder', correct: false },
            ],
          },
          {
            prompt: 'What should you do when you hit a blank spot during recall?',
            options: [
              { id: 'stop', label: 'Stop and struggle until you remember', correct: false },
              { id: 'skip', label: 'Skip it, note it, keep going, then return to repair', correct: true },
              { id: 'quit', label: 'Start over from the beginning', correct: false },
            ],
          },
          {
            prompt: 'Why does the spatial context of a palace amplify the testing effect?',
            options: [
              { id: 'visual', label: 'Spatial walks are more visual', correct: false },
              { id: 'context', label: 'Walking the palace reinstates the encoding context, reactivating place cells', correct: true },
              { id: 'time', label: 'Spatial recall takes longer, giving more study time', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="first-palace-lesson5-feynman"
        prompt="Explain to someone who says 'I studied by re-reading my notes five times' why doing one recall attempt from memory would have been more effective than all five re-reads."
        rubric={[
          'You explained the testing effect -- retrieval strengthens memory more than re-exposure.',
          'You cited or described the study-study-study vs study-test-test comparison.',
          'You were encouraging rather than dismissive of their effort.',
          'Your explanation would convince someone to change their study strategy.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="How did your first real recall attempt feel? What was easier than expected? What was harder? What would you change about your palace for next time?"
          lessonId="memory.first-palace.first-recall"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Module completion note ---- */}
      <section className="my-10 max-w-2xl mx-auto">
        <div
          className="rounded-calm p-6 border-2 text-center"
          style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}
        >
          <p className="font-ui text-lg font-semibold mb-2" style={{ color: '#4F7A5A' }}>
            Module Complete: Your First Palace
          </p>
          <p className="font-reading text-sm text-ink-secondary leading-relaxed">
            You have built a palace, chosen loci, encoded vivid images, practiced bidirectionally, and completed your first recall. This is not the end -- it is the beginning. Every recall session from here strengthens your palace. The more you walk it, the more durable it becomes.
          </p>
        </div>
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 5 &middot; Your First Palace
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next module: Expanding Your System
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Complete Module
          </button>
        </div>
      </footer>
    </article>
  )
}

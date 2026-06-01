import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 8 -- First Timed Attempt
 * The culminating lesson of the PAO module. Guides the learner through
 * their first timed full-deck attempt with self-assessment, reflection,
 * and forward planning.
 */

export default function Lesson8_FirstTimed({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [timerState, setTimerState] = useState('idle') // idle | running | done
  const [elapsed, setElapsed] = useState(0)
  const [intervalId, setIntervalId] = useState(null)

  const startTimer = () => {
    setTimerState('running')
    setElapsed(0)
    const id = setInterval(() => {
      setElapsed((prev) => prev + 1)
    }, 1000)
    setIntervalId(id)
  }

  const stopTimer = () => {
    setTimerState('done')
    if (intervalId) clearInterval(intervalId)
  }

  const resetTimer = () => {
    setTimerState('idle')
    setElapsed(0)
    if (intervalId) clearInterval(intervalId)
  }

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${String(s).padStart(2, '0')}`
  }

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Your First Timed Attempt
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Everything you have built leads here. One deck. One timer. Your baseline.
        </p>
      </header>

      {/* Research paragraph: Baseline measurement */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In sport psychology, the concept of a personal baseline is fundamental to deliberate improvement. Timothy Gallwey's "Inner Game" framework emphasizes that the first timed attempt should be treated as a measurement, not a test. There is no passing or failing -- only data. Your time and accuracy today become the reference point against which all future improvement is measured.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on performance anxiety by Sian Beilock (2010) shows that high-pressure situations disproportionately affect people who are monitoring their own performance. The antidote is to reframe the first timed attempt from "How well will I do?" to "What will I learn about my current process?" This shift from evaluation to observation reduces the anxiety that degrades working memory -- the very resource you need most during speed encoding.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Most beginners land between 5 and 15 minutes on their first timed deck. This is normal. Alex Mullen's first deck time was over 10 minutes. The important number is not where you start but the slope of improvement in the weeks that follow. Competitors who track every attempt and analyze error patterns typically halve their time within 4-6 weeks of daily practice.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Pre-Attempt Checklist ---- */}
      <VisualStepExplainer
        title="Before You Start the Timer"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { check: 'Shuffled deck ready, face-down', color: '#4F7A5A' },
                    { check: 'Memory palace clear -- walk it empty first', color: '#4F7A5A' },
                    { check: 'Recording sheet ready for recall phase', color: '#5B6F8C' },
                    { check: 'Phone on silent, distractions removed', color: '#5B6F8C' },
                    { check: 'Mindset: observation, not judgment', color: '#B89466' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.check}
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div
                        className="w-4 h-4 rounded-sm border-2 flex-shrink-0"
                        style={{ borderColor: item.color }}
                      />
                      <span className="text-xs font-ui text-ink-secondary">{item.check}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Walk through this checklist before starting. The "walk your palace empty" step matters -- it clears any residual images from previous practice sessions.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-surface rounded-calm border border-line-soft p-4 text-center">
                    <p className="text-xs font-ui font-semibold text-ink-primary mb-2">Phase 1: Memorize</p>
                    <div className="flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#4F7A5A" strokeWidth="1.5" />
                        <path d="M8 4V8L11 10" stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-xs font-ui" style={{ color: '#4F7A5A' }}>Timer running</span>
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Encode all 52 cards into your palace
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm border border-line-soft p-4 text-center">
                    <p className="text-xs font-ui font-semibold text-ink-primary mb-2">Phase 2: Recall</p>
                    <div className="flex items-center justify-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="2" y="2" width="12" height="12" rx="2" stroke="#B89466" strokeWidth="1.5" />
                        <path d="M5 8H11M8 5V11" stroke="#B89466" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-xs font-ui" style={{ color: '#B89466' }}>Timer stopped</span>
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Walk your palace and write down the sequence
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Standard competition format: time only the memorization phase. Recall is separate and untimed (though you can time it later for additional data).',
          },
        ]}
      />

      {/* ---- TIMER ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Memorization Timer
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Shuffle your deck. Start the timer when you flip the first cards. Stop when all 52 are encoded.
        </p>
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="w-36 h-36 rounded-full border-3 flex items-center justify-center bg-surface"
            style={{
              borderColor: timerState === 'running' ? '#4F7A5A' : timerState === 'done' ? '#B89466' : '#5B6F8C',
              borderWidth: '3px',
            }}
            animate={timerState === 'running' ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="font-mono text-3xl font-bold text-ink-primary">{formatTime(elapsed)}</span>
          </motion.div>
          <div className="flex gap-3">
            {timerState === 'idle' && (
              <button
                onClick={startTimer}
                className="px-6 py-2 rounded-gentle font-ui text-sm font-medium text-white"
                style={{ backgroundColor: '#4F7A5A' }}
              >
                Start
              </button>
            )}
            {timerState === 'running' && (
              <button
                onClick={stopTimer}
                className="px-6 py-2 rounded-gentle font-ui text-sm font-medium text-white"
                style={{ backgroundColor: '#B89466' }}
              >
                Stop
              </button>
            )}
            {timerState === 'done' && (
              <>
                <div className="text-center">
                  <p className="font-ui text-sm text-ink-primary mb-2">
                    Your time: <span className="font-bold font-mono">{formatTime(elapsed)}</span>
                  </p>
                  <button
                    onClick={resetTimer}
                    className="px-5 py-2 rounded-gentle font-ui text-sm font-medium text-white"
                    style={{ backgroundColor: '#5B6F8C' }}
                  >
                    Reset
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Post-Attempt Analysis ---- */}
      <VisualStepExplainer
        title="After the Attempt: Analysis"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-gentle border border-line-soft p-5 max-w-sm">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Error Analysis Template</p>
                  <div className="space-y-2">
                    {[
                      { q: 'Total cards recalled correctly', type: 'count' },
                      { q: 'Errors from wrong PAO image', type: 'encoding' },
                      { q: 'Errors from wrong palace location', type: 'placement' },
                      { q: 'Errors from "blank" locations', type: 'consolidation' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.q}
                        className="flex items-center justify-between"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-[10px] font-ui text-ink-secondary">{item.q}</span>
                        <span className="text-[10px] font-ui text-ink-tertiary px-2 py-0.5 bg-line-soft rounded-sm">{item.type}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Categorize every error. "Wrong image" means the card-to-PAO mapping needs work. "Wrong location" means the palace loci need reinforcement. "Blank" means the scene was not vivid enough.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6 items-end">
                  {[
                    { label: 'Attempt 1', accuracy: 65, color: '#B89466' },
                    { label: 'Attempt 5', accuracy: 78, color: '#B89466' },
                    { label: 'Attempt 10', accuracy: 88, color: '#4F7A5A' },
                    { label: 'Attempt 20', accuracy: 95, color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <motion.div
                        className="rounded-t-sm"
                        style={{ width: '44px', backgroundColor: item.color }}
                        initial={{ height: 0 }}
                        animate={{ height: `${item.accuracy}px` }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                      >
                        <span className="block text-center text-[9px] font-ui font-bold text-white pt-1">
                          {item.accuracy}%
                        </span>
                      </motion.div>
                      <span className="text-[9px] font-ui text-ink-tertiary mt-1">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Typical accuracy progression over 20 timed attempts</p>
              </div>
            ),
            caption: 'Accuracy improves rapidly when you analyze and address specific error types after each attempt. The first attempt is the baseline -- not the verdict.',
          },
        ]}
      />

      {/* Research paragraph: Growth mindset */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Carol Dweck's research on mindset (2006) is directly relevant here. A "fixed mindset" interprets a slow first attempt as evidence of low ability. A "growth mindset" interprets it as the starting point of a trajectory. Dweck's studies show that people who frame early difficulty as part of the learning process -- rather than as a reflection of talent -- persist longer, practice more effectively, and ultimately achieve higher performance.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The memory athletes who reach world-class levels are not the ones who had the fastest first attempts. They are the ones who kept a log, analyzed every error, adjusted their images and palace loci, and showed up the next day to do it again. The system works. The question is whether you will give it enough data -- enough attempts, enough error analysis, enough iteration -- to reveal that it works for you.
        </p>
      </section>

      {/* ---- BranchScenario ---- */}
      <section className="my-10">
        <BranchScenario
          scenario="Your first timed deck took 8 minutes and you recalled 38 of 52 cards correctly. Most errors were in the second half of the deck. How do you respond?"
          branches={[
            {
              id: 'discouraged',
              label: 'Feel discouraged -- 38/52 is not good enough',
              feedback: 'This is a fixed-mindset response. 38/52 on a first attempt is solid data. The question now is: why were the second-half errors clustered? That pattern tells you exactly what to practice.',
              isOptimal: false,
            },
            {
              id: 'analyze',
              label: 'Log the time and errors, analyze the second-half pattern, strengthen those specific loci',
              feedback: 'This is the deliberate practice response. You now know your baseline (8:00, 73% accuracy) and you know where the system breaks down (second half = likely fatigue or weaker loci). Targeted work follows.',
              isOptimal: true,
            },
            {
              id: 'retry',
              label: 'Immediately try again to get a better time',
              feedback: 'Retrying without analysis wastes the error data from the first attempt. The errors in the second half carry specific information. Analyze first, then retry.',
              isOptimal: false,
            },
          ]}
        />
      </section>

      {/* ---- Prompt for self-assessment ---- */}
      <section className="my-10">
        <Prompt
          id="first-timed-assessment"
          question="Record your first timed attempt results: How long did memorization take? How many cards did you recall correctly? Where were the errors concentrated?"
          onAnswer={savePromptAnswer}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why should the first timed attempt be treated as measurement, not a test?',
            options: [
              { id: 'anxiety', label: 'Because evaluation framing increases anxiety, which hurts working memory', correct: true },
              { id: 'easy', label: 'Because it makes the experience easier', correct: false },
              { id: 'rules', label: 'Because competition rules require a practice attempt', correct: false },
            ],
          },
          {
            prompt: 'What is the most useful thing to do after a first timed attempt?',
            options: [
              { id: 'forget', label: 'Forget about it and try again tomorrow', correct: false },
              { id: 'categorize', label: 'Categorize errors by type and identify the weakest link', correct: true },
              { id: 'celebrate', label: 'Celebrate regardless of the result', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson8-feynman"
        prompt="Explain to someone who is discouraged by their first timed memory attempt why their 8-minute time is not a reflection of their ability but a useful piece of data. Use the concepts of growth mindset and deliberate practice."
        rubric={[
          'You reframed the time as a baseline measurement, not a verdict.',
          'You mentioned that error analysis reveals exactly what to practice.',
          'You connected growth mindset (Dweck) to how first attempts should be interpreted.',
          'You gave a concrete next step based on the error pattern.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="How did it feel to do a timed attempt? What did you notice about your mental state during encoding? Where did you feel confident and where did you feel uncertain? Write honestly -- this is for you."
          lessonId="memory.pao.first-timed"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 8 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next module: FSRS &amp; Daily Habit
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

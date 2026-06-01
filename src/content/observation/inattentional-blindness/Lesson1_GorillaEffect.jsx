import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  ObservationScene,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- The Gorilla Effect
 * Simons & Chabris (1999) inattentional blindness experiment.
 * Visual: animated scene where objects appear/disappear while the
 * learner is focused on a counting task.
 */

/* ── colour tokens ── */
const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── reusable inline SVG pieces ── */
function PassersSVG({ highlight }) {
  return (
    <svg viewBox="0 0 280 160" width="100%" className="max-w-xs mx-auto">
      {/* court outline */}
      <rect x="10" y="10" width="260" height="140" rx="8" fill="none" stroke={SLATE} strokeWidth="1.5" opacity={0.3} />
      {/* players -- white team */}
      {[60, 120, 180].map((cx, i) => (
        <motion.circle
          key={`w-${i}`}
          cx={cx} cy={60} r="14"
          fill="white" stroke={SLATE} strokeWidth="1.5"
          animate={{ cx: [cx, cx + 20, cx - 10, cx] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {/* players -- black team */}
      {[80, 150, 220].map((cx, i) => (
        <motion.circle
          key={`b-${i}`}
          cx={cx} cy={110} r="14"
          fill={SLATE} stroke={SLATE} strokeWidth="1.5"
          animate={{ cx: [cx, cx - 15, cx + 10, cx] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {/* ball */}
      <motion.circle
        cx={120} cy={60} r="6" fill={AMBER}
        animate={{ cx: [60, 120, 180, 120, 60], cy: [60, 55, 60, 65, 60] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      {/* gorilla -- only visible when highlighted */}
      <AnimatePresence>
        {highlight && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.rect
              x="125" y="55" width="30" height="40" rx="6"
              fill={SAGE} fillOpacity={0.8} stroke={SAGE} strokeWidth="1.5"
              animate={{ x: [80, 140, 200, 140, 80] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <text x="140" y="80" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">G</text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

export default function Lesson1_GorillaEffect({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [gorillaRevealed, setGorillaRevealed] = useState(false)

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Gorilla Effect
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          What you miss when you think you are paying attention.
        </p>
      </header>

      {/* ── Research paragraph: the original experiment ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1999, cognitive psychologists Daniel Simons and Christopher Chabris ran an experiment that has since become one of the most famous demonstrations in perceptual science. They showed participants a short video of two teams -- one in white shirts, one in black -- passing a basketball back and forth. The task was simple: count the number of passes made by the white team. Midway through the video, a person in a gorilla suit walked into the centre of the frame, faced the camera, thumped its chest, and walked off. The gorilla was visible for nine full seconds.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Roughly half of the participants did not see the gorilla at all. When told about it afterwards, many refused to believe it had been there until they watched the video again. The finding was not about poor eyesight or carelessness. It was about a fundamental property of human attention: when we concentrate on one thing, we become systematically blind to other things -- even obvious, salient ones. Simons and Chabris called this inattentional blindness.
        </p>
      </section>

      {/* ── VISUAL: Animated pass-counting scene ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <p className="text-sm font-ui text-ink-tertiary mb-4 text-center">
            Watch the white circles pass the amber ball. Count the passes.
          </p>
          <PassersSVG highlight={gorillaRevealed} />
          <div className="mt-4 text-center">
            {!gorillaRevealed ? (
              <button
                onClick={() => setGorillaRevealed(true)}
                className="btn btn-secondary text-sm"
              >
                Reveal the gorilla
              </button>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-ui"
                style={{ color: SAGE }}
              >
                The green shape was crossing the scene the whole time.
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* ── Research paragraph: why this matters ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Inattentional blindness is not a failure of intelligence or effort. It is a structural feature of how human perception works. The brain cannot process everything the eyes take in -- roughly 10 million bits per second arrive through the retina, but conscious awareness handles only about 40 bits per second. Attention acts as a filter, selecting what reaches awareness and discarding the rest. When the filter is tuned to one target (white-shirted players), stimuli that do not match the filter (a dark gorilla) can be suppressed entirely.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This finding has direct implications for observation-based work in every domain -- medicine, law enforcement, design, parenting, therapy. If even a chest-thumping gorilla can go unnoticed during a simple counting task, what else might we be missing in more complex, high-stakes environments? The first step toward better observation is accepting that attention is a narrow spotlight, not a floodlight.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="How inattentional blindness works"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 200 120" width="200">
                  <motion.circle cx="100" cy="60" r="50" fill="none" stroke={SLATE} strokeWidth="2" strokeDasharray="6 4" />
                  <motion.circle
                    cx="100" cy="60" r="20"
                    fill={AMBER} fillOpacity={0.15}
                    stroke={AMBER} strokeWidth="2"
                    animate={{ r: [20, 24, 20] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <text x="100" y="65" textAnchor="middle" fontSize="10" fill={AMBER} fontWeight="600">Focus</text>
                  {/* items outside the spotlight */}
                  {[30, 170, 100].map((cx, i) => (
                    <circle key={i} cx={cx} cy={i === 2 ? 15 : 60} r="6" fill={SLATE} opacity={0.2} />
                  ))}
                </svg>
              </div>
            ),
            caption: 'Attention is a narrow spotlight. Objects outside the beam may not reach conscious awareness at all.',
          },
          {
            visual: (
              <div className="flex items-center justify-center gap-6">
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="font-ui text-xs font-bold" style={{ color: AMBER }}>10M</span>
                  </motion.div>
                  <p className="text-[10px] text-ink-tertiary mt-1 font-ui">bits/sec input</p>
                </div>
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                  <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke={SLATE} strokeWidth="2" />
                </svg>
                <div className="text-center">
                  <div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                  >
                    <span className="font-ui text-xs font-bold" style={{ color: SAGE }}>~40</span>
                  </div>
                  <p className="text-[10px] text-ink-tertiary mt-1 font-ui">bits/sec awareness</p>
                </div>
              </div>
            ),
            caption: 'The retina delivers ~10 million bits per second. Conscious awareness processes roughly 40. The gap is enormous.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 240 80" width="240">
                  <rect x="10" y="20" width="60" height="40" rx="4" fill={SAGE} fillOpacity={0.15} stroke={SAGE} strokeWidth="1.5" />
                  <text x="40" y="44" textAnchor="middle" fontSize="9" fill={SAGE}>Matches</text>
                  <rect x="90" y="20" width="60" height="40" rx="4" fill={AMBER} fillOpacity={0.15} stroke={AMBER} strokeWidth="1.5" />
                  <text x="120" y="44" textAnchor="middle" fontSize="9" fill={AMBER}>Filtered</text>
                  <rect x="170" y="20" width="60" height="40" rx="4" fill={SLATE} fillOpacity={0.1} stroke={SLATE} strokeWidth="1.5" strokeDasharray="4 3" />
                  <text x="200" y="44" textAnchor="middle" fontSize="9" fill={SLATE} opacity={0.5}>Invisible</text>
                </svg>
              </div>
            ),
            caption: 'The attention filter sorts stimuli into three tiers: what matches the current task, what is partially processed, and what never reaches awareness.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In the original Simons & Chabris experiment, roughly what fraction of participants missed the gorilla?',
            options: [
              { id: 'quarter', label: 'About a quarter', correct: false },
              { id: 'half', label: 'About half', correct: true },
              { id: 'most', label: 'Almost everyone', correct: false },
            ],
          },
          {
            prompt: 'Inattentional blindness occurs because:',
            options: [
              { id: 'lazy', label: 'People are not trying hard enough', correct: false },
              { id: 'filter', label: 'Attention is a selective filter with limited bandwidth', correct: true },
              { id: 'eyes', label: 'The eyes physically cannot see peripheral objects', correct: false },
            ],
          },
          {
            prompt: 'Why is the gorilla experiment relevant to real-world observation?',
            options: [
              { id: 'fun', label: 'It is an entertaining party trick', correct: false },
              { id: 'stakes', label: 'If we miss a gorilla in a simple task, we likely miss critical details in complex ones', correct: true },
              { id: 'rare', label: 'Inattentional blindness only occurs in labs', correct: false },
            ],
          },
        ]}
      />

      {/* ── ObservationScene ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Observation Exercise
        </h2>
        <ObservationScene
          sceneDescription="A busy city intersection at noon. Six pedestrians cross in different directions. A cyclist in a yellow vest waits at the light. Two pigeons sit on a traffic signal arm. A coffee cup sits abandoned on the bench near the crosswalk. One pedestrian carries a red umbrella despite the clear sky. A delivery truck is double-parked with its hazard lights on. A street musician plays guitar near the corner -- their case is open with a few coins inside."
          duration={30}
          questions={[
            { question: 'How many pedestrians were described?', type: 'factual', answer: 'Six pedestrians.' },
            { question: 'What colour was the cyclist\'s vest?', type: 'factual', answer: 'Yellow.' },
            { question: 'Where were the pigeons?', type: 'spatial', answer: 'On a traffic signal arm.' },
            { question: 'What suggests the delivery might be quick?', type: 'inferential', answer: 'The truck is double-parked with hazard lights on, implying a brief stop.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.inattentional-blindness.gorilla-effect-feynman"
        prompt="Explain inattentional blindness to a friend who has never heard of it. Use an everyday example, not the gorilla experiment."
        rubric={[
          'You described what inattentional blindness is without jargon.',
          'You gave a concrete everyday example.',
          'You explained why it happens (filter/bandwidth), not just that it happens.',
          'A listener could repeat the core idea back.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Think of a time you completely missed something obvious because you were focused on something else. What were you focused on? What did you miss? No judgment -- just notice."
          lessonId="observation.inattentional-blindness.gorilla-effect"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Inattentional Blindness
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Change Blindness
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

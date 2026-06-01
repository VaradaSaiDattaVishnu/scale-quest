import { useState } from 'react'
import { motion } from 'framer-motion'
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
 * Lesson 3 -- Attention Filters
 * Broadbent's filter model, cocktail party effect (Cherry 1953),
 * Treisman's attenuation model. Selective attention research.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Filter funnel diagram ── */
function FilterFunnel({ model }) {
  const isAttenuation = model === 'treisman'
  return (
    <svg viewBox="0 0 260 160" width="100%" className="max-w-xs mx-auto">
      {/* input streams */}
      {[0, 1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1={30 + i * 55} y1="15" x2="130" y2="70"
          stroke={i === 1 ? SAGE : SLATE}
          strokeWidth={i === 1 ? 2 : 1}
          opacity={i === 1 ? 1 : (isAttenuation ? 0.4 : 0.15)}
          strokeDasharray={i === 1 ? 'none' : '4 3'}
          animate={{ opacity: i === 1 ? 1 : (isAttenuation ? [0.2, 0.4, 0.2] : 0.15) }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      ))}
      {/* labels */}
      {['Voice A', 'Voice B', 'Voice C', 'Music'].map((label, i) => (
        <text key={label} x={30 + i * 55} y="10" textAnchor="middle" fontSize="8" fill={i === 1 ? SAGE : SLATE} opacity={i === 1 ? 1 : 0.5}>
          {label}
        </text>
      ))}
      {/* filter gate */}
      <rect x="105" y="60" width="50" height="24" rx="4" fill={AMBER} fillOpacity={0.15} stroke={AMBER} strokeWidth="1.5" />
      <text x="130" y="76" textAnchor="middle" fontSize="9" fill={AMBER} fontWeight="600">
        {isAttenuation ? 'Attenuator' : 'Filter'}
      </text>
      {/* output */}
      <line x1="130" y1="84" x2="130" y2="130" stroke={SAGE} strokeWidth="2" />
      <rect x="100" y="130" width="60" height="22" rx="4" fill={SAGE} fillOpacity={0.12} stroke={SAGE} strokeWidth="1" />
      <text x="130" y="145" textAnchor="middle" fontSize="8" fill={SAGE}>Awareness</text>
      {/* attenuated streams */}
      {isAttenuation && (
        <>
          <motion.line
            x1="130" y1="84" x2="180" y2="120"
            stroke={SLATE} strokeWidth="1" strokeDasharray="3 3"
            animate={{ opacity: [0.1, 0.35, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <text x="190" y="118" fontSize="7" fill={SLATE} opacity={0.5}>Reduced</text>
        </>
      )}
    </svg>
  )
}

export default function Lesson3_AttentionFilters({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [filterModel, setFilterModel] = useState('broadbent')

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Attention Filters
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          How your brain decides what you hear, see, and ignore.
        </p>
      </header>

      {/* ── Research: Broadbent and Cherry ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1953, Colin Cherry posed a deceptively simple question: how do we follow one conversation in a room full of people talking? He called this the "cocktail party problem." Using dichotic listening -- playing different audio streams into each ear through headphones -- Cherry found that participants could shadow (repeat back) one stream while almost completely ignoring the other. They could not report the content of the unattended ear, often failing to notice if the language switched from English to German or if the speech was played backwards.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But Cherry also found an exception. If the participant's own name was spoken in the unattended ear, they often noticed it. This suggested that the filter was not absolute -- some highly relevant stimuli could break through even when attention was directed elsewhere. This tension between full filtering and partial processing drove decades of subsequent research.
        </p>
      </section>

      {/* ── VISUAL: Interactive filter model ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setFilterModel('broadbent')}
              className={`btn text-sm ${filterModel === 'broadbent' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Broadbent (1958)
            </button>
            <button
              onClick={() => setFilterModel('treisman')}
              className={`btn text-sm ${filterModel === 'treisman' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Treisman (1964)
            </button>
          </div>
          <FilterFunnel model={filterModel} />
          <p className="text-xs font-ui text-ink-tertiary text-center mt-3">
            {filterModel === 'broadbent'
              ? 'Broadbent: unattended input is completely blocked before reaching meaning.'
              : 'Treisman: unattended input is attenuated (turned down), not blocked. High-priority signals can still break through.'}
          </p>
        </div>
      </section>

      {/* ── Research: Treisman's attenuation ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Donald Broadbent proposed in 1958 that attention works as an all-or-nothing filter: one channel is selected for processing and the rest are completely blocked. This "early selection" model was elegant but could not explain Cherry's own-name finding. In 1964, Anne Treisman offered a revision. She argued that unattended channels are not blocked but attenuated -- their signal is turned down, like lowering the volume on a radio. Most attenuated signals never reach awareness, but signals with very low thresholds (your own name, a fire alarm, a baby crying) can break through even at reduced volume.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Treisman's attenuation model remains one of the most influential frameworks in attention research. It explains both the power of selective attention (we can focus intensely) and its limits (certain signals penetrate regardless). For observation training, the practical takeaway is that our filters are active even when we do not realize it, and they are shaped by expectations, goals, and personal relevance -- not just raw sensory salience.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="The cocktail party effect in action"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 220 100" width="220">
                  {/* multiple voice waves */}
                  {[0, 1, 2].map((i) => (
                    <motion.path
                      key={i}
                      d={`M10,${30 + i * 25} Q55,${20 + i * 25} 110,${30 + i * 25} T210,${30 + i * 25}`}
                      fill="none"
                      stroke={i === 0 ? SAGE : SLATE}
                      strokeWidth={i === 0 ? 2 : 1}
                      opacity={i === 0 ? 0.8 : 0.2}
                      animate={{ d: `M10,${30 + i * 25} Q55,${25 + i * 25 + (i === 0 ? -5 : 3)} 110,${30 + i * 25} T210,${30 + i * 25}` }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
                    />
                  ))}
                </svg>
              </div>
            ),
            caption: 'In a noisy room, multiple audio streams reach your ears simultaneously. Your filter selects one and suppresses the rest.',
          },
          {
            visual: (
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  className="px-4 py-2 rounded-calm border-2 text-sm font-ui"
                  style={{ borderColor: AMBER, color: AMBER }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  "...your name..."
                </motion.div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12H18M18 12L13 7M18 12L13 17" stroke={SAGE} strokeWidth="2" />
                </svg>
                <div className="px-4 py-2 rounded-calm border-2 text-sm font-ui" style={{ borderColor: SAGE, color: SAGE }}>
                  Awareness
                </div>
              </div>
            ),
            caption: 'Certain signals have low thresholds -- your own name, danger cues, emotional triggers. They can pierce the filter even when you are not attending.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Goals', color: SAGE, desc: 'What you are trying to do' },
                    { label: 'Priors', color: AMBER, desc: 'What you expect to see' },
                    { label: 'Salience', color: SLATE, desc: 'What stands out physically' },
                  ].map(({ label, color, desc }) => (
                    <div key={label} className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-xs font-ui font-bold" style={{ color }}>{label}</p>
                      <p className="text-[10px] text-ink-tertiary mt-1">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Your attention filter is shaped by three forces: your current goals, your prior expectations, and the physical salience of stimuli. All three operate simultaneously.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What did Cherry\'s 1953 dichotic listening studies demonstrate?',
            options: [
              { id: 'both', label: 'People can process both audio channels equally', correct: false },
              { id: 'one', label: 'People can selectively attend to one channel and largely ignore the other', correct: true },
              { id: 'none', label: 'People cannot distinguish between two simultaneous audio streams', correct: false },
            ],
          },
          {
            prompt: 'How does Treisman\'s model differ from Broadbent\'s?',
            options: [
              { id: 'same', label: 'They are essentially the same model', correct: false },
              { id: 'atten', label: 'Treisman says unattended input is attenuated, not fully blocked', correct: true },
              { id: 'late', label: 'Treisman says filtering happens after full semantic processing', correct: false },
            ],
          },
          {
            prompt: 'The cocktail party effect (hearing your name across a noisy room) supports which model?',
            options: [
              { id: 'broad', label: 'Broadbent\'s all-or-nothing filter', correct: false },
              { id: 'treis', label: 'Treisman\'s attenuation model', correct: true },
              { id: 'neither', label: 'Neither model -- it is unexplained', correct: false },
            ],
          },
        ]}
      />

      {/* ── ObservationScene ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Selective Attention Drill
        </h2>
        <ObservationScene
          sceneDescription="You are sitting in a busy cafe. At the table to your left, two people discuss a work deadline. The barista calls out drink orders. Background music plays softly -- acoustic guitar. The espresso machine hisses periodically. At the table to your right, someone talks on the phone about a birthday party. A child at the back of the cafe laughs loudly. The door chime rings as a new customer enters. Someone at the counter asks for the wifi password. Outside the window, a bus pulls up and opens its doors."
          duration={30}
          questions={[
            { question: 'How many distinct sound sources were described?', type: 'factual', answer: 'At least 8: left-table conversation, barista, background music, espresso machine, phone call, child laughing, door chime, bus.' },
            { question: 'What kind of music was playing?', type: 'factual', answer: 'Acoustic guitar.' },
            { question: 'Which sounds would likely have the lowest threshold (break through attention most easily)?', type: 'inferential', answer: 'The child laughing (biological alarm), your name if spoken, the door chime (sudden onset). These have high salience or personal relevance.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.inattentional-blindness.attention-filters-feynman"
        prompt="A friend asks: 'If I'm not listening to a conversation across the room, how can I suddenly hear my name in it?' Explain this using what you have learned."
        rubric={[
          'You mentioned attenuation rather than full blocking.',
          'You explained the concept of low-threshold stimuli.',
          'You connected it to the cocktail party effect or Treisman.',
          'Your explanation avoided unnecessary jargon.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What kinds of stimuli tend to break through your attention filter? Your name? A particular voice? A certain kind of sound? What does this tell you about what your brain considers high-priority?"
          lessonId="observation.inattentional-blindness.attention-filters"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Inattentional Blindness
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Daily Attention Audit
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

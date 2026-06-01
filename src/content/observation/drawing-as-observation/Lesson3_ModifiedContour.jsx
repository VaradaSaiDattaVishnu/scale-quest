import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Modified Contour Drawing
 * The practical middle ground: mostly looking at the subject,
 * occasionally glancing at the paper. Building on pure contour
 * and negative space into a sustainable observation practice.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Animated leaf contour that draws in stages ── */
function LeafContourDemo() {
  const leafPath = 'M100,180 C80,160 40,130 30,90 C20,50 50,20 100,10 C150,20 180,50 170,90 C160,130 120,160 100,180'
  const veinPaths = [
    'M100,170 L100,30',
    'M100,130 C85,115 60,105 45,90',
    'M100,130 C115,115 140,105 155,90',
    'M100,80 C88,70 65,65 50,55',
    'M100,80 C112,70 135,65 150,55',
  ]

  return (
    <div className="bg-surface rounded-gentle p-6 border border-line-soft">
      <p className="text-xs font-ui text-ink-tertiary text-center mb-4">
        Modified contour: draw slowly, glancing at your paper briefly (10%) to check placement.
      </p>
      <svg viewBox="0 0 200 200" width="100%" className="max-w-[200px] mx-auto">
        {/* faint guide */}
        <path d={leafPath} fill={SAGE} fillOpacity={0.03} stroke={SLATE} strokeWidth="0.3" />
        {/* animated contour -- outer edge */}
        <motion.path
          d={leafPath}
          fill="none" stroke={SAGE} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, ease: 'easeInOut' }}
        />
        {/* animated veins -- drawn in sequence */}
        {veinPaths.map((vp, i) => (
          <motion.path
            key={i}
            d={vp}
            fill="none" stroke={SAGE} strokeWidth="1" strokeLinecap="round" opacity={0.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 5 + i * 1.2, ease: 'easeInOut' }}
          />
        ))}
        {/* glance indicators */}
        <motion.circle
          cx="100" cy="180" r="3" fill={AMBER}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, delay: 2, repeat: 3, repeatDelay: 2 }}
        />
        <motion.text
          x="115" y="185" fontSize="7" fill={AMBER}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, delay: 2, repeat: 3, repeatDelay: 2 }}
        >
          glance
        </motion.text>
      </svg>
    </div>
  )
}

/* ── Time-split diagram ── */
function TimeSplit() {
  return (
    <svg viewBox="0 0 260 60" width="100%" className="max-w-xs mx-auto">
      {/* bar background */}
      <rect x="10" y="15" width="240" height="30" rx="4" fill={SLATE} fillOpacity={0.05} stroke={SLATE} strokeWidth="0.5" />
      {/* 90% subject */}
      <motion.rect
        x="10" y="15" width="216" height="30" rx="4"
        fill={SAGE} fillOpacity={0.15}
        initial={{ width: 0 }}
        animate={{ width: 216 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      {/* 10% paper */}
      <motion.rect
        x="226" y="15" width="24" height="30" rx="4"
        fill={AMBER} fillOpacity={0.15}
        initial={{ width: 0 }}
        animate={{ width: 24 }}
        transition={{ duration: 0.5, delay: 1.5, ease: 'easeOut' }}
      />
      <text x="120" y="35" textAnchor="middle" fontSize="9" fill={SAGE} fontWeight="600">90% on subject</text>
      <text x="238" y="35" textAnchor="middle" fontSize="7" fill={AMBER}>10%</text>
    </svg>
  )
}

export default function Lesson3_ModifiedContour({
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
          Modified Contour Drawing
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The practical fusion: 90% observation, 10% checking.
        </p>
      </header>

      {/* ── Research: the method ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Pure contour drawing is powerful as a training exercise, but the resulting drawings are often too distorted to be useful. Modified contour drawing is Edwards' practical compromise: you spend approximately 90% of your time looking at the subject (as in pure contour) and allow yourself to glance at the paper briefly (about 10% of the time) to check proportion and placement. The key rule is that you draw only while looking at the subject. When you glance at the paper, you stop drawing, check, then return your eyes to the subject before the pen moves again.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This method preserves the perceptual benefits of pure contour -- slow, edge-following observation with L-mode largely disengaged -- while producing drawings that are recognizable and proportionally accurate. It is the technique that Edwards' students use for most of their actual drawing work, and it is the form of drawing-as-observation that translates most directly into other observation contexts.
        </p>
      </section>

      {/* ── VISUAL: Animated leaf contour ── */}
      <section className="my-10">
        <LeafContourDemo />
      </section>

      {/* ── Research: observation time ratio ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The 90/10 ratio is not arbitrary. Studies of expert draftspeople and artists by Tchalenko (2009) using eye-tracking found that skilled artists spend significantly more time looking at their subject than at their canvas, while novices do the opposite. Novices look at the subject briefly, then stare at the paper while trying to reproduce what they remember. This means they are drawing from a decaying memory trace rather than from ongoing perception -- the visual equivalent of studying by re-reading rather than by testing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The parallel to observation training is direct: in any observation task, the quality of your report depends on how much time you spend actually looking versus how much time you spend processing, interpreting, or planning what to say. Modified contour drawing is a structured way to practice maintaining sustained visual contact with a subject -- a skill that transfers to medical examination, crime scene assessment, interpersonal communication, and any context where seeing clearly matters.
        </p>
      </section>

      {/* ── VISUAL: Time split ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            Time allocation: subject vs paper
          </h3>
          <TimeSplit />
          <div className="flex justify-center gap-6 mt-4">
            <div className="text-center">
              <p className="text-xs font-ui font-semibold" style={{ color: AMBER }}>Novice</p>
              <p className="text-[10px] text-ink-tertiary">30% subject / 70% paper</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Expert</p>
              <p className="text-[10px] text-ink-tertiary">80-90% subject / 10-20% paper</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="The modified contour protocol"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-3">
                {[
                  { step: '1', label: 'Eyes on subject', color: SAGE },
                  { step: '2', label: 'Pen moves slowly', color: SAGE },
                  { step: '3', label: 'Glance at paper', color: AMBER },
                  { step: '4', label: 'Pen stops', color: AMBER },
                  { step: '5', label: 'Eyes back', color: SAGE },
                ].map(({ step, label, color }) => (
                  <div key={step} className="text-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-ui font-bold" style={{ backgroundColor: `${color}15`, color, border: `1.5px solid ${color}` }}>
                      {step}
                    </div>
                    <p className="text-[9px] font-ui mt-1 w-12" style={{ color }}>{label}</p>
                  </div>
                ))}
              </div>
            ),
            caption: 'The cycle: look at subject, draw slowly while looking, stop pen, glance at paper to check, return eyes to subject, resume drawing. The pen only moves when eyes are on the subject.',
          },
          {
            visual: (
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {[
                  { type: 'Pure contour', quality: 'Distorted', observation: 'Deepest', color: SAGE },
                  { type: 'Modified contour', quality: 'Accurate', observation: 'Deep', color: SAGE },
                  { type: 'Casual drawing', quality: 'Variable', observation: 'Shallow', color: AMBER },
                ].map(({ type, quality, observation, color }) => (
                  <div key={type} className="bg-elevated rounded-calm p-2 border border-line-soft text-center">
                    <p className="text-[9px] font-ui font-semibold" style={{ color }}>{type}</p>
                    <p className="text-[8px] text-ink-tertiary mt-1">Drawing: {quality}</p>
                    <p className="text-[8px] text-ink-tertiary">Observation: {observation}</p>
                  </div>
                ))}
              </div>
            ),
            caption: 'Modified contour is the sweet spot: observation nearly as deep as pure contour, with drawings accurate enough to be useful.',
          },
        ]}
      />

      {/* ── Practice ── */}
      <section className="my-10">
        <Prompt
          id="observation.drawing-as-observation.modified-contour-practice"
          question="Try a 5-minute modified contour drawing. Choose a natural object (leaf, flower, fruit, shell). Keep 90% of your gaze on the subject. Stop the pen when you glance at the paper. After, describe: how was this different from pure contour? Did you catch yourself staring at the paper too long?"
          placeholder="I drew: ...\nDifference from pure contour: ...\nI noticed myself: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the key rule of modified contour drawing?',
            options: [
              { id: 'look', label: 'Draw only while looking at the subject; stop the pen when glancing at the paper', correct: true },
              { id: 'fast', label: 'Draw as fast as possible while alternating glances', correct: false },
              { id: 'paper', label: 'Spend equal time looking at subject and paper', correct: false },
            ],
          },
          {
            prompt: 'Tchalenko\'s eye-tracking studies found that expert artists:',
            options: [
              { id: 'expert', label: 'Spend much more time looking at their subject than at their canvas', correct: true },
              { id: 'novice', label: 'Spend more time looking at their canvas to check accuracy', correct: false },
              { id: 'equal', label: 'Split time equally between subject and canvas', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.drawing-as-observation.modified-contour-feynman"
        prompt="Explain why the 90/10 looking ratio matters for observation quality, using drawing as your example but extending to another domain."
        rubric={[
          'You explained the 90/10 ratio and what happens when it is inverted.',
          'You connected drawing from observation vs drawing from memory.',
          'You extended the principle to at least one other observation domain.',
          'Your explanation was grounded in specific research or mechanisms.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="In your daily life, how much time do you spend actually looking at things versus processing, interpreting, or planning? Has this module changed your awareness of that ratio?"
          lessonId="observation.drawing-as-observation.modified-contour"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Drawing as Observation
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Gesture Drawing
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

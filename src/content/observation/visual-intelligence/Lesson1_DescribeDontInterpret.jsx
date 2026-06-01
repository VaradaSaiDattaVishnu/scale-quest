import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Describe, Don't Interpret
 * Amy Herman's Visual Intelligence method: separating observation
 * from interpretation. Art-based training used by FBI, CIA, medical schools.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Artwork-style SVG scene for description practice ── */
function ArtworkScene() {
  return (
    <svg viewBox="0 0 300 220" width="100%" className="max-w-sm mx-auto">
      {/* background -- warm toned room */}
      <rect width="300" height="220" rx="8" fill="#F0EBE4" />
      {/* wall */}
      <rect x="0" y="0" width="300" height="150" fill="#E8E2D8" rx="8" />
      {/* floor */}
      <rect x="0" y="150" width="300" height="70" fill="#D4CCC0" rx="0" />
      {/* window */}
      <rect x="30" y="25" width="70" height="90" rx="3" fill="#C5D4E0" stroke={SLATE} strokeWidth="1.5" />
      <line x1="65" y1="25" x2="65" y2="115" stroke={SLATE} strokeWidth="1" />
      <line x1="30" y1="70" x2="100" y2="70" stroke={SLATE} strokeWidth="1" />
      {/* curtain */}
      <motion.path
        d="M28,25 Q35,50 28,70 Q35,90 28,115"
        fill="none" stroke={AMBER} strokeWidth="2" opacity={0.5}
        animate={{ d: ['M28,25 Q35,50 28,70 Q35,90 28,115', 'M28,25 Q38,50 28,70 Q38,90 28,115'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
      />
      {/* table */}
      <rect x="130" y="100" width="140" height="8" rx="2" fill={AMBER} fillOpacity={0.4} stroke={AMBER} strokeWidth="1" />
      <rect x="140" y="108" width="6" height="45" rx="1" fill={AMBER} fillOpacity={0.3} />
      <rect x="254" y="108" width="6" height="45" rx="1" fill={AMBER} fillOpacity={0.3} />
      {/* vase on table */}
      <ellipse cx="180" cy="96" rx="12" ry="6" fill={SLATE} fillOpacity={0.2} />
      <path d="M172,96 Q168,75 180,65 Q192,75 188,96" fill={SLATE} fillOpacity={0.15} stroke={SLATE} strokeWidth="1" />
      {/* flowers */}
      {[170, 180, 190].map((fx, i) => (
        <motion.circle
          key={i} cx={fx} cy={58 - i * 5} r="5"
          fill={i === 1 ? AMBER : SAGE} fillOpacity={0.4}
          animate={{ cy: [58 - i * 5, 56 - i * 5, 58 - i * 5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {/* book on table */}
      <rect x="220" y="92" width="30" height="8" rx="1" fill={SAGE} fillOpacity={0.3} stroke={SAGE} strokeWidth="0.5" />
      {/* chair */}
      <rect x="50" y="145" width="40" height="5" rx="2" fill={SLATE} fillOpacity={0.25} stroke={SLATE} strokeWidth="0.5" />
      <rect x="52" y="150" width="4" height="25" rx="1" fill={SLATE} fillOpacity={0.2} />
      <rect x="84" y="150" width="4" height="25" rx="1" fill={SLATE} fillOpacity={0.2} />
      <rect x="48" y="120" width="4" height="30" rx="1" fill={SLATE} fillOpacity={0.2} />
      {/* shadow on floor */}
      <ellipse cx="200" cy="185" rx="60" ry="8" fill={SLATE} fillOpacity={0.06} />
    </svg>
  )
}

export default function Lesson1_DescribeDontInterpret({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [showInterpretation, setShowInterpretation] = useState(false)

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Describe, Don't Interpret
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The foundational skill of visual intelligence.
        </p>
      </header>

      {/* ── Research: Amy Herman's method ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Amy Herman spent years as an art historian before she noticed something: the skills required to carefully describe a painting -- noting what is actually present before leaping to interpretation -- were the same skills that doctors, detectives, and intelligence analysts needed but often lacked. In 2000, she began teaching a course called "The Art of Perception" at the Metropolitan Museum of Art in New York. Her students were not art students. They were medical residents, FBI agents, CIA analysts, and NYPD officers.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Herman's core finding was consistent and striking: trained professionals routinely confused what they saw with what they inferred. A doctor would say "the patient looks anxious" when the actual observation was "the patient's hands are clasped, their jaw is clenched, and they are not making eye contact." An officer would say "suspicious behaviour" when the observation was "a man standing near a parked car, looking left and right repeatedly." The leap from observation to interpretation happened so fast that the professionals did not realize they had made it.
        </p>
      </section>

      {/* ── VISUAL: Artwork scene ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <p className="text-sm font-ui text-ink-tertiary mb-4 text-center">
            Study this scene. Then describe only what you see -- no interpretations.
          </p>
          <ArtworkScene />
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-elevated rounded-calm p-4 border border-line-soft">
              <p className="text-xs font-ui font-semibold mb-2" style={{ color: SAGE }}>
                Description (what you see)
              </p>
              <p className="text-xs font-reading text-ink-secondary leading-relaxed">
                A room with a window on the left. A table with a vase of flowers and a book. A chair faces the table. The window has a cross-frame and a curtain.
              </p>
            </div>
            <div className="bg-elevated rounded-calm p-4 border border-line-soft">
              <p className="text-xs font-ui font-semibold mb-2" style={{ color: AMBER }}>
                Interpretation (what you infer)
              </p>
              {!showInterpretation ? (
                <button
                  onClick={() => setShowInterpretation(true)}
                  className="btn btn-ghost text-xs"
                >
                  Reveal interpretation
                </button>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-reading text-ink-secondary leading-relaxed"
                >
                  "Someone lives alone and enjoys quiet afternoons reading by the window." -- None of this is visible. It is a story we construct from sparse visual cues.
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Research: observation vs inference ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The distinction between observation and inference is not new -- it dates back to Francis Bacon in the 17th century -- but Herman's contribution was showing how reliably and quickly the boundary is crossed, even by trained professionals. In her workshops, she found that giving people a simple rule ("describe before you interpret") and practicing it with artworks produced measurable improvements in diagnostic accuracy for medical students and report quality for law enforcement officers.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The mechanism is straightforward: when you force yourself to describe what you actually see before saying what it means, you create a buffer between perception and judgment. That buffer gives you time to notice details you would otherwise skip -- the details that distinguish an accurate assessment from a premature one. Herman calls this "the art of perception," but it is equally an act of intellectual discipline.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Observation vs interpretation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center w-28">
                    <p className="text-[10px] font-ui text-ink-tertiary">OBSERVATION</p>
                    <p className="text-xs font-ui mt-1" style={{ color: SAGE }}>"She is frowning"</p>
                  </div>
                  <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                    <path d="M2 10H20M20 10L14 4M20 10L14 16" stroke={SLATE} strokeWidth="1.5" />
                  </svg>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center w-28">
                    <p className="text-[10px] font-ui text-ink-tertiary">INTERPRETATION</p>
                    <p className="text-xs font-ui mt-1" style={{ color: AMBER }}>"She is angry"</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'A frown is an observation. "Angry" is an interpretation -- it could also mean confused, concentrating, or in pain. The leap is instant and often invisible.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <svg viewBox="0 0 240 80" width="240">
                  <rect x="5" y="20" width="70" height="40" rx="4" fill={SAGE} fillOpacity={0.12} stroke={SAGE} strokeWidth="1.5" />
                  <text x="40" y="44" textAnchor="middle" fontSize="9" fill={SAGE} fontWeight="600">See</text>
                  <rect x="85" y="20" width="70" height="40" rx="4" fill={SLATE} fillOpacity={0.1} stroke={SLATE} strokeWidth="1.5" />
                  <text x="120" y="44" textAnchor="middle" fontSize="9" fill={SLATE}>Describe</text>
                  <rect x="165" y="20" width="70" height="40" rx="4" fill={AMBER} fillOpacity={0.1} stroke={AMBER} strokeWidth="1.5" />
                  <text x="200" y="44" textAnchor="middle" fontSize="9" fill={AMBER}>Interpret</text>
                  <path d="M75,40 L85,40" stroke={SLATE} strokeWidth="1" />
                  <path d="M155,40 L165,40" stroke={SLATE} strokeWidth="1" />
                </svg>
              </div>
            ),
            caption: 'The Herman protocol: See first. Describe what you see in plain language. Only then allow interpretation. The middle step is the one most people skip.',
          },
          {
            visual: (
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="bg-surface rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui text-ink-tertiary mb-1">BEFORE TRAINING</p>
                  <p className="text-xs font-reading text-ink-secondary">"Suspicious person near the car"</p>
                </div>
                <div className="bg-surface rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui text-ink-tertiary mb-1">AFTER TRAINING</p>
                  <p className="text-xs font-reading text-ink-secondary">"Male, approx. 30s, dark jacket, standing 2m from a silver sedan, looking left then right, hands in pockets"</p>
                </div>
              </div>
            ),
            caption: 'Training does not change what people see. It changes what they report. Description-first produces richer, more accurate, more actionable information.',
          },
        ]}
      />

      {/* ── Practice: describe the scene ── */}
      <section className="my-10">
        <Prompt
          id="observation.visual-intelligence.describe-dont-interpret-practice"
          question="Look at the artwork scene above one more time. Write a pure description -- only what is visible, with no stories, explanations, or emotional labels. Challenge yourself: can you write five sentences without a single interpretation?"
          placeholder="I see a room with..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which of the following is a pure observation (not an interpretation)?',
            options: [
              { id: 'angry', label: '"The man is angry"', correct: false },
              { id: 'clench', label: '"The man\'s fists are clenched and his eyebrows are drawn together"', correct: true },
              { id: 'threat', label: '"The man looks threatening"', correct: false },
            ],
          },
          {
            prompt: 'Amy Herman\'s training was originally designed for:',
            options: [
              { id: 'art', label: 'Art history students', correct: false },
              { id: 'prof', label: 'Medical residents, FBI agents, and law enforcement', correct: true },
              { id: 'child', label: 'Elementary school children', correct: false },
            ],
          },
          {
            prompt: 'Why does describing before interpreting improve accuracy?',
            options: [
              { id: 'slow', label: 'It forces you to slow down and notice details before jumping to conclusions', correct: true },
              { id: 'mem', label: 'It improves long-term memory storage', correct: false },
              { id: 'iq', label: 'It raises general intelligence', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.visual-intelligence.describe-dont-interpret-feynman"
        prompt="Explain the difference between observation and interpretation to a new medical student. Why should they care?"
        rubric={[
          'You clearly distinguished observation from interpretation with an example.',
          'You explained why the distinction matters in their field (diagnostic accuracy).',
          'You referenced the idea of a "buffer" between seeing and judging.',
          'Your explanation was practical, not just theoretical.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="When in your own life do you most often leap from observation to interpretation without noticing? Conversations? Social media? Work? Write about a specific recent example."
          lessonId="observation.visual-intelligence.describe-dont-interpret"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Visual Intelligence
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The Four A's
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

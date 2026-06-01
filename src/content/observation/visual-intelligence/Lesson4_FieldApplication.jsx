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
 * Lesson 4 -- Field Application
 * Taking Visual Intelligence skills out of the gallery and into
 * daily life, professional contexts, and interpersonal communication.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Domain transfer diagram ── */
function DomainTransfer() {
  const domains = [
    { label: 'Art Gallery', x: 50, y: 40, color: AMBER },
    { label: 'Medicine', x: 150, y: 20, color: SAGE },
    { label: 'Law Enforcement', x: 250, y: 40, color: SLATE },
    { label: 'Relationships', x: 100, y: 100, color: SAGE },
    { label: 'Design', x: 200, y: 100, color: AMBER },
  ]
  return (
    <svg viewBox="0 0 300 130" width="100%" className="max-w-sm mx-auto">
      {/* connecting lines */}
      {domains.map((d, i) =>
        domains.slice(i + 1).map((d2, j) => (
          <line key={`${i}-${j}`} x1={d.x} y1={d.y} x2={d2.x} y2={d2.y} stroke={SLATE} strokeWidth="0.5" opacity={0.1} strokeDasharray="3 3" />
        ))
      )}
      {domains.map(({ label, x, y, color }, i) => (
        <g key={label}>
          <motion.circle
            cx={x} cy={y} r="16"
            fill={color} fillOpacity={0.1}
            stroke={color} strokeWidth="1.5"
            animate={{ r: [16, 18, 16] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
          <text x={x} y={y + 28} textAnchor="middle" fontSize="7" fill={color} fontWeight="500">
            {label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function Lesson4_FieldApplication({
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
          Field Application
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          From the gallery to the world: observation as a daily skill.
        </p>
      </header>

      {/* ── Research: transfer of observation skills ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The question that matters most for any training programme is transfer: do the skills learned in one context carry over to another? For visual intelligence training, the evidence is encouraging. Herman's programme has been adopted by over 300 institutions, including the FBI Academy, West Point, and the Yale School of Medicine. Independent evaluations have found improvements in both observation accuracy and communication clarity that persist months after training.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The transfer works because the skills being trained are domain-general. Separating observation from interpretation, structuring attention with the Four A's, and practicing sustained looking are not art skills -- they are perceptual skills. They apply wherever accurate observation matters: reading a patient, assessing a crime scene, understanding a user interface, noticing a child's distress signal, or parsing the body language of a colleague in a meeting.
        </p>
      </section>

      {/* ── VISUAL: Domain transfer ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            Visual Intelligence transfers across domains
          </h3>
          <DomainTransfer />
          <p className="text-xs font-ui text-ink-tertiary text-center mt-4">
            The same observation protocol applies across fields. The skill is domain-general.
          </p>
        </div>
      </section>

      {/* ── Research: communication and blind spots ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Herman identified three common communication failures that observation training addresses. First, the "default to vague" problem: people use abstract terms ("suspicious," "concerning," "off") when they mean something specific ("the left pupil is 2mm larger than the right"). Second, the "assumption of shared context" problem: the observer assumes the listener sees what they see, and omits critical details. Third, the "premature closure" problem: the observer stops looking once they find an explanation that fits, missing contradictory evidence.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Each of these failures is addressable through practice. The describe-before-interpret rule combats vagueness. The articulate step of the Four A's combats assumed context. And sustained observation combats premature closure. None of this requires special talent. It requires a protocol and the willingness to follow it.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Three communication failures and their fixes"
        steps={[
          {
            visual: (
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="bg-elevated rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui font-semibold" style={{ color: AMBER }}>VAGUE</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"Something seems off about the patient."</p>
                </div>
                <div className="bg-elevated rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui font-semibold" style={{ color: SAGE }}>SPECIFIC</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"The patient's left pupil is 2mm larger than the right, and speech is slower than 30 minutes ago."</p>
                </div>
              </div>
            ),
            caption: 'Default to vague: abstract labels replace specific observations. Fix: describe before you interpret.',
          },
          {
            visual: (
              <div className="flex items-center justify-center gap-3">
                <div className="bg-elevated rounded-calm p-3 border border-line-soft w-28 text-center">
                  <p className="text-[10px] font-ui" style={{ color: AMBER }}>Observer sees 10 details</p>
                </div>
                <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
                  <path d="M2 10H20M20 10L14 4M20 10L14 16" stroke={SLATE} strokeWidth="1.5" />
                </svg>
                <div className="bg-elevated rounded-calm p-3 border border-line-soft w-28 text-center">
                  <p className="text-[10px] font-ui" style={{ color: AMBER }}>Communicates 3</p>
                </div>
              </div>
            ),
            caption: 'Assumed shared context: you omit details you think are obvious. The listener fills in the gaps with their own assumptions.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 200 60" width="200">
                  <rect x="5" y="15" width="40" height="30" rx="4" fill={SAGE} fillOpacity={0.15} stroke={SAGE} strokeWidth="1" />
                  <text x="25" y="34" textAnchor="middle" fontSize="7" fill={SAGE}>Fits!</text>
                  <motion.line x1="45" y1="30" x2="75" y2="30" stroke={AMBER} strokeWidth="1.5"
                    animate={{ x2: [75, 70, 75] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  <rect x="75" y="10" width="50" height="40" rx="4" fill={AMBER} fillOpacity={0.08} stroke={AMBER} strokeWidth="1" strokeDasharray="3 3" />
                  <text x="100" y="26" textAnchor="middle" fontSize="7" fill={AMBER}>Stop</text>
                  <text x="100" y="38" textAnchor="middle" fontSize="7" fill={AMBER}>looking</text>
                  <rect x="140" y="15" width="50" height="30" rx="4" fill={SLATE} fillOpacity={0.05} stroke={SLATE} strokeWidth="0.5" strokeDasharray="2 3" />
                  <text x="165" y="34" textAnchor="middle" fontSize="7" fill={SLATE} opacity={0.4}>Missed</text>
                </svg>
              </div>
            ),
            caption: 'Premature closure: once an explanation fits, observation stops. Contradictory or additional evidence goes unseen.',
          },
        ]}
      />

      {/* ── Practice: field observation ── */}
      <section className="my-10">
        <Prompt
          id="observation.visual-intelligence.field-application-practice"
          question="Choose a real environment you will be in today (office, kitchen, bus stop, classroom). Commit to applying the Four A's for 5 minutes. Write your plan: What environment? When? What will you Assess, Analyze, Articulate, and Adapt?"
          placeholder="Environment: ...\nWhen: ...\nASSESS: I will look for...\nANALYZE: ...\nARTICULATE: ...\nADAPT: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── ObservationScene ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Field-Style Observation
        </h2>
        <ObservationScene
          sceneDescription="A hospital waiting room. Eight chairs line two walls, four per wall. Five are occupied. Seat 1: elderly man reading a newspaper (broadsheet, not tabloid). Seat 3: young woman with headphones, eyes closed, one leg bouncing. Seat 5: mother with a toddler on her lap -- the child holds a stuffed rabbit. Seat 6: middle-aged man in a suit, checking his phone repeatedly. Seat 8: teenager with a backpack on the floor, drawing in a notebook. A TV mounted in the corner shows a news channel with the sound off -- subtitles are on. A reception desk has a sign reading 'Please check in upon arrival.' A hand sanitizer dispenser is on the wall near the entrance. The floor is grey linoleum. One fluorescent light flickers intermittently."
          duration={35}
          questions={[
            { question: 'How many people are in the waiting room?', type: 'factual', answer: 'Six: elderly man, young woman, mother, toddler, man in suit, teenager.' },
            { question: 'ASSESS: List every object you can recall.', type: 'factual', answer: 'Newspaper, headphones, stuffed rabbit, phone, backpack, notebook, TV, sign, hand sanitizer, chairs.' },
            { question: 'ANALYZE: Which person\'s behaviour suggests the most urgency or distress?', type: 'inferential', answer: 'The young woman (eyes closed, leg bouncing -- possible anxiety/pain) or the man in the suit (checking phone repeatedly -- possible stress). Both are reasonable inferences, but noting the specific observations that support each inference is key.' },
            { question: 'What detail might a safety inspector notice that others would miss?', type: 'inferential', answer: 'The flickering fluorescent light (potential electrical issue or photosensitive seizure trigger).' },
          ]}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which of Herman\'s three communication failures involves stopping observation once a plausible explanation is found?',
            options: [
              { id: 'vague', label: 'Default to vague', correct: false },
              { id: 'closure', label: 'Premature closure', correct: true },
              { id: 'shared', label: 'Assumed shared context', correct: false },
            ],
          },
          {
            prompt: 'Visual Intelligence skills transfer across domains because:',
            options: [
              { id: 'art', label: 'Art appreciation is universally useful', correct: false },
              { id: 'general', label: 'Observation, description, and structured attention are domain-general skills', correct: true },
              { id: 'iq', label: 'The training increases general intelligence', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.visual-intelligence.field-application-feynman"
        prompt="You are training a team of new employees. In 2 minutes, explain why observation skills matter in your field and give them one practical technique to start using today."
        rubric={[
          'You connected observation to a concrete outcome in the field.',
          'You gave a specific, actionable technique (not just "pay more attention").',
          'You explained the mechanism behind the technique.',
          'Your explanation was clear enough that someone could start using it immediately.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Looking back at this entire Visual Intelligence module, which idea or exercise has had the most impact on how you observe? What will you carry into your daily life? Be specific."
          lessonId="observation.visual-intelligence.field-application"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Visual Intelligence
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Drawing as Observation
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

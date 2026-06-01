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
 * Lesson 4 -- Gesture Drawing
 * Rapid whole-form capture: seeing the essential movement, weight,
 * and energy of a subject in seconds. Kimon Nicolaides' method.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Animated gesture figure that draws rapidly ── */
function GestureFigureDemo() {
  const gesturePath = 'M100,25 C100,25 95,45 98,55 C100,60 85,75 80,90 C78,95 70,120 75,140 M100,55 C110,60 125,65 135,70 M98,55 C88,58 72,60 60,62 M80,90 C90,110 95,130 90,155 M80,90 C70,110 65,135 70,160'

  return (
    <div className="bg-surface rounded-gentle p-6 border border-line-soft">
      <p className="text-xs font-ui text-ink-tertiary text-center mb-4">
        Gesture drawing captures the whole form in seconds -- energy and movement, not detail.
      </p>
      <svg viewBox="0 0 200 180" width="100%" className="max-w-[200px] mx-auto">
        {/* faint guide */}
        <path d={gesturePath} fill="none" stroke={SLATE} strokeWidth="0.3" opacity={0.1} />
        {/* rapid gesture line */}
        <motion.path
          d={gesturePath}
          fill="none" stroke={SAGE} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          opacity={0.7}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
        />
        {/* head */}
        <motion.circle
          cx="100" cy="25" r="10"
          fill="none" stroke={SAGE} strokeWidth="2.5" opacity={0.6}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* energy lines */}
        {[
          { x1: 140, y1: 65, x2: 155, y2: 60 },
          { x1: 55, y1: 58, x2: 42, y2: 55 },
          { x1: 92, y1: 155, x2: 95, y2: 170 },
        ].map((line, i) => (
          <motion.line
            key={i} {...line}
            stroke={AMBER} strokeWidth="1.5" strokeLinecap="round" opacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.2 + i * 0.2 }}
          />
        ))}
      </svg>
      <p className="text-xs font-ui text-ink-tertiary text-center mt-2">
        30 seconds. The whole body. Energy before accuracy.
      </p>
    </div>
  )
}

/* ── Time comparison diagram ── */
function TimeComparison() {
  const methods = [
    { label: 'Gesture', time: '30s', focus: 'Movement, weight, energy', color: SAGE },
    { label: 'Pure contour', time: '10min', focus: 'Edges, exact contours', color: SLATE },
    { label: 'Modified contour', time: '15min', focus: 'Edges + proportion', color: SLATE },
    { label: 'Finished drawing', time: '60min+', focus: 'All details, shading, texture', color: AMBER },
  ]
  return (
    <div className="space-y-2">
      {methods.map(({ label, time, focus, color }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-xs font-ui font-semibold w-16 text-right" style={{ color }}>{time}</span>
          <div className="flex-1 bg-elevated rounded-calm px-3 py-2 border border-line-soft">
            <p className="text-xs font-ui font-semibold" style={{ color }}>{label}</p>
            <p className="text-[10px] text-ink-tertiary">{focus}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Lesson4_GestureDrawing({
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
          Gesture Drawing
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Capture the essence in seconds. See the whole before the parts.
        </p>
      </header>

      {/* ── Research: Nicolaides and gesture ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1941, Kimon Nicolaides published The Natural Way to Draw, a book that has remained in continuous print for over eighty years. His central exercise was the gesture drawing: a rapid sketch -- typically 30 seconds to 2 minutes -- that captures the overall movement, weight, and energy of a subject. Nicolaides insisted that gesture drawing was not a simplified version of "real" drawing. It was a fundamentally different perceptual act: seeing the whole before the parts.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Where contour drawing trains slow, edge-following perception, gesture drawing trains rapid holistic perception -- the ability to grasp the essential structure of a scene in a single glance. Both are forms of observation training, but they exercise different perceptual capacities. Contour drawing is analogous to reading a sentence word by word. Gesture drawing is analogous to grasping the meaning of a paragraph at a glance. Both skills are necessary for complete observation.
        </p>
      </section>

      {/* ── VISUAL: Animated gesture figure ── */}
      <section className="my-10">
        <GestureFigureDemo />
      </section>

      {/* ── Research: holistic vs analytic perception ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The distinction between holistic and analytic perception has been studied extensively in cognitive science. Navon (1977) demonstrated that humans process the global structure of a visual pattern before the local details -- a phenomenon he called "global precedence." When shown a large letter H made up of small letter S's, people identify the H faster than the S. This suggests that holistic perception is not just useful but primary -- it happens first, and detail perception builds on top of it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Gesture drawing leverages this. By forcing the hand to move quickly and capture the whole form, it aligns the drawing process with the brain's natural perceptual hierarchy: global before local, forest before trees, movement before detail. The observation training value is that it develops the ability to quickly assess the overall structure of a scene -- a skill that contour drawing, with its slow edge-following, does not build. Together, gesture and contour create a complete observation toolkit: rapid assessment followed by detailed examination.
        </p>
      </section>

      {/* ── VISUAL: Time comparison ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            Drawing methods and what they train
          </h3>
          <TimeComparison />
        </div>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="The gesture drawing protocol"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: SAGE }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-xs font-ui font-bold" style={{ color: SAGE }}>30s</span>
                </motion.div>
                <div className="text-center">
                  <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Time limit is the tool</p>
                  <p className="text-[10px] text-ink-tertiary mt-1">Speed forces holistic perception</p>
                </div>
              </div>
            ),
            caption: 'The time limit is not a constraint -- it is the mechanism. With only 30 seconds, you cannot draw details. You must see the whole.',
          },
          {
            visual: (
              <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto text-center">
                {[
                  { label: 'Movement', desc: 'Where is the energy flowing?', color: SAGE },
                  { label: 'Weight', desc: 'Where does gravity pull?', color: AMBER },
                  { label: 'Proportion', desc: 'What is the biggest shape?', color: SLATE },
                ].map(({ label, desc, color }) => (
                  <div key={label} className="bg-elevated rounded-calm p-2 border border-line-soft">
                    <p className="text-[10px] font-ui font-semibold" style={{ color }}>{label}</p>
                    <p className="text-[9px] text-ink-tertiary mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            ),
            caption: 'Gesture drawing captures three things: the direction of movement, the pull of gravity, and the overall proportions. Everything else is left for later.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <svg viewBox="0 0 60 80" width="50">
                      <motion.path
                        d="M30,10 C30,10 28,25 30,35 C32,45 20,55 18,65 M30,35 L45,40 M30,35 L15,38 M18,65 L25,78 M18,65 L12,78"
                        fill="none" stroke={SAGE} strokeWidth="2.5" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5 }}
                      />
                    </svg>
                    <p className="text-[9px] font-ui" style={{ color: SAGE }}>Gesture: 30s</p>
                  </div>
                  <span className="text-xs text-ink-tertiary">then</span>
                  <div className="text-center">
                    <svg viewBox="0 0 60 80" width="50">
                      <path
                        d="M30,10 C30,10 28,25 30,35 C32,45 20,55 18,65 M30,35 L45,40 M30,35 L15,38"
                        fill="none" stroke={SLATE} strokeWidth="1.5" strokeLinecap="round"
                      />
                      <circle cx="30" cy="10" r="6" fill="none" stroke={SLATE} strokeWidth="1" />
                    </svg>
                    <p className="text-[9px] font-ui" style={{ color: SLATE }}>Contour: 10min</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'The complete observation sequence: gesture first (see the whole), then contour (examine the parts). Global before local. Forest before trees.',
          },
        ]}
      />

      {/* ── Practice ── */}
      <section className="my-10">
        <Prompt
          id="observation.drawing-as-observation.gesture-drawing-practice"
          question="Do three 30-second gesture drawings of anything you can see (a person, a pet, a tree outside, even a crumpled piece of paper). The goal is NOT accuracy. The goal is to capture the energy and overall shape in one flowing movement. After, describe: what did speed force you to see that slowness would not?"
          placeholder="I drew: ...\nWhat speed forced me to see: ...\nHow this differed from contour: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Gesture drawing primarily trains:',
            options: [
              { id: 'edge', label: 'Slow, edge-following perception', correct: false },
              { id: 'holistic', label: 'Rapid holistic perception -- seeing the whole form at a glance', correct: true },
              { id: 'motor', label: 'Fine motor control of the hand', correct: false },
            ],
          },
          {
            prompt: 'Navon\'s (1977) global precedence finding tells us that:',
            options: [
              { id: 'local', label: 'We process details before overall structure', correct: false },
              { id: 'global', label: 'We process overall structure before details', correct: true },
              { id: 'same', label: 'We process global and local information simultaneously', correct: false },
            ],
          },
          {
            prompt: 'How do gesture and contour drawing complement each other?',
            options: [
              { id: 'same', label: 'They train the same skill at different speeds', correct: false },
              { id: 'comp', label: 'Gesture trains holistic/global perception; contour trains detailed/local perception', correct: true },
              { id: 'one', label: 'You only need one -- gesture replaces contour', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.drawing-as-observation.gesture-drawing-feynman"
        prompt="Explain the Drawing as Observation module to someone who says 'I can't draw, so this is useless for me.' Cover all four techniques and why drawing quality is irrelevant."
        rubric={[
          'You distinguished drawing as art from drawing as observation training.',
          'You mentioned all four techniques (pure contour, negative space, modified contour, gesture).',
          'You explained that the goal is perceptual shift, not visual output.',
          'You connected at least one technique to a non-art observation domain.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Reflecting on the whole Drawing as Observation module: which exercise affected your perception most? Did any of the techniques feel uncomfortable? What observation skills do you want to keep practicing?"
          lessonId="observation.drawing-as-observation.gesture-drawing"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Drawing as Observation
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Shinzen Noting
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

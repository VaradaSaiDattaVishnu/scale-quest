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
 * Lesson 2 -- The Four A's
 * Assess, Analyze, Articulate, Adapt -- Amy Herman's observation framework.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

const FOUR_AS = [
  { letter: 'A', word: 'Assess', color: SLATE, desc: 'Take in the full scene without judgment. What is here?' },
  { letter: 'A', word: 'Analyze', color: SAGE, desc: 'Prioritize. What matters? What is unexpected?' },
  { letter: 'A', word: 'Articulate', color: AMBER, desc: 'Put it into words. Clear, specific, factual language.' },
  { letter: 'A', word: 'Adapt', color: SAGE, desc: 'Act on what you found. Adjust your understanding.' },
]

/* ── Four A's cycle diagram ── */
function FourAsCycle({ activeIndex }) {
  const r = 55
  return (
    <svg viewBox="0 0 200 200" width="200" className="mx-auto">
      <circle cx="100" cy="100" r={r + 12} fill="none" stroke={SLATE} strokeWidth="0.5" opacity={0.15} />
      {FOUR_AS.map(({ word, color }, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180)
        const x = 100 + r * Math.cos(angle)
        const y = 100 + r * Math.sin(angle)
        const isActive = i === activeIndex
        return (
          <g key={word}>
            <motion.circle
              cx={x} cy={y} r={isActive ? 22 : 18}
              fill={color} fillOpacity={isActive ? 0.18 : 0.08}
              stroke={color} strokeWidth={isActive ? 2 : 1}
              animate={isActive ? { r: [22, 24, 22] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <text x={x} y={y + 4} textAnchor="middle" fontSize={isActive ? 10 : 9} fill={color} fontWeight={isActive ? 700 : 500}>
              {word}
            </text>
            {/* arrow to next */}
            {i < 3 && (
              <motion.line
                x1={x + 12 * Math.cos(angle + 0.5)}
                y1={y + 12 * Math.sin(angle + 0.5)}
                x2={100 + r * Math.cos(((i + 1) * 90 - 90) * (Math.PI / 180)) - 12 * Math.cos(((i + 1) * 90 - 90) * (Math.PI / 180) - 0.5)}
                y2={100 + r * Math.sin(((i + 1) * 90 - 90) * (Math.PI / 180)) - 12 * Math.sin(((i + 1) * 90 - 90) * (Math.PI / 180) - 0.5)}
                stroke={SLATE} strokeWidth="1" opacity={0.2}
                strokeDasharray="3 3"
              />
            )}
          </g>
        )
      })}
    </svg>
  )
}

export default function Lesson2_FourAs({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [activeA, setActiveA] = useState(0)

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Four A's
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Assess. Analyze. Articulate. Adapt.
        </p>
      </header>

      {/* ── Research: the framework ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In her book Visual Intelligence, Amy Herman distills her observation method into four sequential steps she calls "the Four A's." The framework was developed through years of teaching perception to professionals who needed reliable, repeatable observation protocols -- not intuition, not talent, but a structured process that anyone could follow. The four steps are Assess, Analyze, Articulate, and Adapt.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The power of the framework is that it enforces sequence. Most people jump directly to the last step -- they see something and immediately adapt (react, decide, judge). The Four A's slow this down, inserting three deliberate cognitive steps before any action or conclusion. Each step serves a distinct function, and skipping any one of them degrades the quality of the observation.
        </p>
      </section>

      {/* ── VISUAL: Interactive Four A's cycle ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <FourAsCycle activeIndex={activeA} />
          <div className="flex justify-center gap-2 mt-4">
            {FOUR_AS.map(({ word, color }, i) => (
              <button
                key={word}
                onClick={() => setActiveA(i)}
                className="btn text-xs"
                style={{
                  borderColor: i === activeA ? color : 'transparent',
                  color: i === activeA ? color : undefined,
                  backgroundColor: i === activeA ? `${color}10` : undefined,
                }}
              >
                {word}
              </button>
            ))}
          </div>
          <motion.div
            key={activeA}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center"
          >
            <p className="text-sm font-ui font-semibold" style={{ color: FOUR_AS[activeA].color }}>
              {FOUR_AS[activeA].word}
            </p>
            <p className="text-xs font-reading text-ink-secondary mt-1">
              {FOUR_AS[activeA].desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Research: each A in depth ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Assess means taking in the full scene without filtering. This is harder than it sounds because, as the inattentional blindness research shows, our attention naturally narrows. Assessment requires a deliberate broadening -- looking at the whole before focusing on parts. Herman trains this by having participants describe everything they see in a painting before zeroing in on any single element.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Analyze means prioritizing what you noticed during assessment. Not everything is equally important. Analysis asks: what stands out? What is unexpected? What is missing that should be present? This step draws on your domain knowledge and experience, but it only works well if the assessment step was thorough. You cannot analyze what you did not observe.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Articulate means putting your observations and analysis into clear, specific language. This is where the "describe, don't interpret" principle from Lesson 1 becomes operational. Vague language hides vague thinking. Precise description reveals what you actually know versus what you are guessing. Herman found that forcing people to articulate their observations in writing improved their accuracy on subsequent observations.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Adapt means changing your behaviour, plan, or understanding based on what you have observed, analyzed, and articulated. This is the only step where action occurs -- and it is informed by three layers of disciplined thinking rather than a snap reaction. In high-stakes domains, the difference between snap reaction and informed adaptation can be the difference between a good outcome and a catastrophic one.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="The Four A's applied to a medical scenario"
        steps={[
          {
            visual: (
              <div className="bg-elevated rounded-calm p-4 border border-line-soft">
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: SLATE }}>ASSESS</p>
                <p className="text-xs font-reading text-ink-secondary">Patient in bed, eyes open, IV in left arm, monitor beeping steadily, skin colour appears pale, hands gripping the bed rail, water cup untouched on tray.</p>
              </div>
            ),
            caption: 'Step 1: take in the full scene. Every detail noted, no conclusions drawn yet.',
          },
          {
            visual: (
              <div className="bg-elevated rounded-calm p-4 border border-line-soft">
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: SAGE }}>ANALYZE</p>
                <p className="text-xs font-reading text-ink-secondary">Unexpected: hands gripping the rail (tension), water untouched (possible nausea or pain), skin pallor (possible blood loss or anaemia). Monitor is stable -- so not an acute emergency.</p>
              </div>
            ),
            caption: 'Step 2: prioritize. What is expected? What is unexpected? What is missing?',
          },
          {
            visual: (
              <div className="bg-elevated rounded-calm p-4 border border-line-soft">
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: AMBER }}>ARTICULATE</p>
                <p className="text-xs font-reading text-ink-secondary">"The patient shows signs of physical discomfort -- gripping the rail, pale skin, untouched water -- but vital signs are stable. The discomfort appears to be ongoing rather than acute."</p>
              </div>
            ),
            caption: 'Step 3: put it into clear, precise language. No vague labels. Every claim backed by a specific observation.',
          },
          {
            visual: (
              <div className="bg-elevated rounded-calm p-4 border border-line-soft">
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: SAGE }}>ADAPT</p>
                <p className="text-xs font-reading text-ink-secondary">Ask the patient directly about pain level. Check recent labs for haemoglobin. Adjust pain management if needed. Re-assess in 30 minutes.</p>
              </div>
            ),
            caption: 'Step 4: act based on three layers of disciplined observation. Not a snap judgment, but an informed response.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which step of the Four A\'s involves taking in the full scene without filtering?',
            options: [
              { id: 'assess', label: 'Assess', correct: true },
              { id: 'analyze', label: 'Analyze', correct: false },
              { id: 'adapt', label: 'Adapt', correct: false },
            ],
          },
          {
            prompt: 'Why is "Articulate" a separate step from "Analyze"?',
            options: [
              { id: 'clarity', label: 'Because putting analysis into precise language reveals gaps and vagueness in thinking', correct: true },
              { id: 'writing', label: 'Because writing is always better than thinking', correct: false },
              { id: 'record', label: 'Only for record-keeping purposes', correct: false },
            ],
          },
          {
            prompt: 'What is the most common mistake people make with the Four A\'s?',
            options: [
              { id: 'skip', label: 'Jumping straight to Adapt without the first three steps', correct: true },
              { id: 'slow', label: 'Going too slowly through each step', correct: false },
              { id: 'detail', label: 'Noticing too many details during Assess', correct: false },
            ],
          },
        ]}
      />

      {/* ── ObservationScene ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Four A's Drill
        </h2>
        <ObservationScene
          sceneDescription="A classroom after hours. Chairs are arranged in a rough circle, not rows. A whiteboard at the front has three columns of handwriting in blue, green, and red markers -- the blue column is the longest. A jacket is draped over one chair. Two coffee cups sit on the teacher's desk, one empty and one half-full. A laptop is open but the screen is dark. A stack of papers sits on the corner of the desk, with a red pen on top. The windows show that it is dusk -- the sky is indigo and orange. Three overhead lights are on; two are off."
          duration={30}
          questions={[
            { question: 'ASSESS: List everything you recall from the scene, without prioritizing.', type: 'factual', answer: 'Chairs in a circle, whiteboard with 3 colour columns, jacket on a chair, 2 coffee cups, open laptop (dark screen), stack of papers with red pen, dusk outside, 3 lights on / 2 off.' },
            { question: 'ANALYZE: What two details suggest this was a meeting or discussion, not a lecture?', type: 'inferential', answer: 'Chairs in a circle (not rows) and multiple marker colours on the whiteboard (suggests multiple contributors).' },
            { question: 'ARTICULATE: Describe the scene in one precise sentence to someone who cannot see it.', type: 'inferential', answer: 'Open-ended. Good answers include specific spatial layout, object counts, and colour details without interpretive language.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.visual-intelligence.four-as-feynman"
        prompt="Teach the Four A's to a colleague using a situation from your own field. Walk through all four steps with a concrete example."
        rubric={[
          'You named all four steps in order.',
          'Your example was concrete and specific to a real scenario.',
          'You showed how skipping a step would degrade the outcome.',
          'The explanation could be followed by someone unfamiliar with the method.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Which of the Four A's do you think you are strongest at? Which one do you most often skip? What would change if you started doing all four deliberately?"
          lessonId="observation.visual-intelligence.four-as"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Visual Intelligence
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Artwork Drill
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

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
 * Lesson 2 -- Inside / Outside
 * The directional dimension: In (internal mental experience)
 * vs Out (external sensory experience). Expands the 3-category
 * system into a 6-cell grid.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── 6-cell sensory grid ── */
function SensoryGrid({ activeCell }) {
  const cells = [
    { row: 'Out', col: 'See', label: 'See Out', desc: 'External visual', color: SAGE, example: 'Sunlight, faces, text' },
    { row: 'Out', col: 'Hear', label: 'Hear Out', desc: 'External auditory', color: AMBER, example: 'Bird song, traffic, music' },
    { row: 'Out', col: 'Feel', label: 'Feel Out', desc: 'External body', color: SLATE, example: 'Wind, touch, temperature' },
    { row: 'In', col: 'See', label: 'See In', desc: 'Mental images', color: SAGE, example: 'Memories, fantasies, dreams' },
    { row: 'In', col: 'Hear', label: 'Hear In', desc: 'Mental talk', color: AMBER, example: 'Inner monologue, songs stuck in head' },
    { row: 'In', col: 'Feel', label: 'Feel In', desc: 'Emotional body', color: SLATE, example: 'Anxiety in chest, excitement in stomach' },
  ]

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-4 gap-1 min-w-[280px] max-w-sm mx-auto">
        {/* header row */}
        <div />
        {['See', 'Hear', 'Feel'].map((col) => (
          <div key={col} className="text-center py-2">
            <p className="text-xs font-ui font-semibold" style={{ color: col === 'See' ? SAGE : col === 'Hear' ? AMBER : SLATE }}>{col}</p>
          </div>
        ))}
        {/* Out row */}
        <div className="flex items-center justify-center">
          <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Out</p>
        </div>
        {cells.slice(0, 3).map((cell) => {
          const isActive = activeCell === cell.label
          return (
            <motion.div
              key={cell.label}
              className="rounded-calm p-2 border text-center cursor-pointer"
              style={{
                borderColor: isActive ? cell.color : `${cell.color}30`,
                backgroundColor: isActive ? `${cell.color}12` : `${cell.color}04`,
              }}
              animate={isActive ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="text-[10px] font-ui font-semibold" style={{ color: cell.color }}>{cell.label}</p>
              <p className="text-[8px] text-ink-tertiary mt-0.5">{cell.example}</p>
            </motion.div>
          )
        })}
        {/* In row */}
        <div className="flex items-center justify-center">
          <p className="text-xs font-ui font-semibold" style={{ color: AMBER }}>In</p>
        </div>
        {cells.slice(3).map((cell) => {
          const isActive = activeCell === cell.label
          return (
            <motion.div
              key={cell.label}
              className="rounded-calm p-2 border text-center cursor-pointer"
              style={{
                borderColor: isActive ? cell.color : `${cell.color}30`,
                backgroundColor: isActive ? `${cell.color}12` : `${cell.color}04`,
              }}
              animate={isActive ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="text-[10px] font-ui font-semibold" style={{ color: cell.color }}>{cell.label}</p>
              <p className="text-[8px] text-ink-tertiary mt-0.5">{cell.example}</p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function Lesson2_InsideOutside({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [activeCell, setActiveCell] = useState('See Out')

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Inside / Outside
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The direction of attention: external world or internal experience.
        </p>
      </header>

      {/* ── Research: the In/Out dimension ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Shinzen Young adds a second dimension to the See/Hear/Feel framework: direction. Each sensory category can be experienced externally (Out) or internally (In). "See Out" is what your eyes detect in the physical world. "See In" is mental imagery -- memories, fantasies, visualizations. "Hear Out" is physical sound. "Hear In" is your inner monologue, mental chatter, or songs playing in your head. "Feel Out" is physical sensation from external stimuli (wind, touch). "Feel In" is emotional sensation felt inside the body (anxiety in the chest, excitement in the stomach).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This creates a 2x3 grid -- six categories total -- that maps the entire space of conscious experience. The grid is exhaustive: any experience you can have fits into exactly one cell. The practical value is precision. Instead of noting "I'm anxious," you can observe: "Hear In (worried thoughts), Feel In (chest tightness), See In (imagined worst-case scenario)." The anxiety, which felt like a single overwhelming thing, decomposes into specific sensory events that can be witnessed individually.
        </p>
      </section>

      {/* ── VISUAL: Interactive 6-cell grid ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            The complete sensory grid
          </h3>
          <SensoryGrid activeCell={activeCell} />
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['See Out', 'Hear Out', 'Feel Out', 'See In', 'Hear In', 'Feel In'].map((cell) => (
              <button
                key={cell}
                onClick={() => setActiveCell(cell)}
                className={`btn text-xs ${activeCell === cell ? 'btn-primary' : 'btn-ghost'}`}
              >
                {cell}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research: internal experience and metacognition ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The In/Out distinction is particularly important because most people are remarkably poor observers of their own internal experience. Lutz, Slagter, Dunne, and Davidson (2008) published a landmark review in Trends in Cognitive Sciences showing that systematic attention training -- including sensory labeling practices similar to Shinzen's system -- produces measurable changes in brain function, including increased activity in the anterior cingulate cortex (associated with conflict monitoring) and the insula (associated with interoceptive awareness, or awareness of internal body states).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The practical implication is that the In categories (See In, Hear In, Feel In) are not just useful for meditation. They are tools for emotional regulation, self-knowledge, and interpersonal skill. When you can observe that your "anger" is actually Hear In (a looping thought about unfairness) plus Feel In (heat in the face and tension in the jaw), you create a gap between the experience and your reaction to it. That gap is where choice lives.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Decomposing experience with the grid"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="bg-elevated rounded-calm px-4 py-2 border border-line-soft">
                  <p className="text-xs font-ui text-ink-tertiary">"I'm stressed about the meeting"</p>
                </div>
                <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
                  <path d="M10 2V20M10 20L4 14M10 20L16 14" stroke={SLATE} strokeWidth="1.5" />
                </svg>
                <div className="grid grid-cols-3 gap-2 max-w-xs">
                  <div className="rounded-calm p-2 border text-center" style={{ borderColor: AMBER, backgroundColor: `${AMBER}08` }}>
                    <p className="text-[9px] font-ui" style={{ color: AMBER }}>Hear In</p>
                    <p className="text-[8px] text-ink-tertiary">"What if I mess up?"</p>
                  </div>
                  <div className="rounded-calm p-2 border text-center" style={{ borderColor: SAGE, backgroundColor: `${SAGE}08` }}>
                    <p className="text-[9px] font-ui" style={{ color: SAGE }}>See In</p>
                    <p className="text-[8px] text-ink-tertiary">Image of blank faces</p>
                  </div>
                  <div className="rounded-calm p-2 border text-center" style={{ borderColor: SLATE, backgroundColor: `${SLATE}08` }}>
                    <p className="text-[9px] font-ui" style={{ color: SLATE }}>Feel In</p>
                    <p className="text-[8px] text-ink-tertiary">Tight stomach</p>
                  </div>
                </div>
              </div>
            ),
            caption: '"Stressed about the meeting" is vague. Decomposed: it is a worried thought (Hear In), a mental image of failure (See In), and stomach tension (Feel In). Each part is observable.',
          },
          {
            visual: (
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui" style={{ color: AMBER }}>Fused</span>
                  </motion.div>
                  <p className="text-[9px] text-ink-tertiary mt-1">Before noting</p>
                </div>
                <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                  <path d="M2 10H26M26 10L20 4M26 10L20 16" stroke={SLATE} strokeWidth="1.5" />
                </svg>
                <div className="text-center">
                  <div className="flex gap-1">
                    {[SAGE, AMBER, SLATE].map((c, i) => (
                      <motion.div
                        key={i}
                        className="w-5 h-5 rounded-full border"
                        style={{ borderColor: c, backgroundColor: `${c}15` }}
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] text-ink-tertiary mt-1">Separate parts</p>
                </div>
              </div>
            ),
            caption: 'Noting separates fused, overwhelming experience into distinct, manageable sensory events. The overwhelm dissolves not because anything changes, but because you see it clearly.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'A song stuck in your head would be categorized as:',
            options: [
              { id: 'ho', label: 'Hear Out', correct: false },
              { id: 'hi', label: 'Hear In', correct: true },
              { id: 'fi', label: 'Feel In', correct: false },
            ],
          },
          {
            prompt: 'The feeling of butterflies in your stomach before a speech would be:',
            options: [
              { id: 'fo', label: 'Feel Out', correct: false },
              { id: 'fi', label: 'Feel In', correct: true },
              { id: 'hi', label: 'Hear In', correct: false },
            ],
          },
          {
            prompt: 'Why is the In/Out distinction practically valuable?',
            options: [
              { id: 'cat', label: 'It creates a more impressive categorization system', correct: false },
              { id: 'decomp', label: 'It allows you to decompose vague states like "stress" into specific, observable sensory events', correct: true },
              { id: 'block', label: 'It helps you block internal experiences', correct: false },
            ],
          },
        ]}
      />

      {/* ── ObservationScene as noting drill ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Six-Category Noting Drill
        </h2>
        <ObservationScene
          sceneDescription="Close your eyes for a moment, then open them. You see the screen in front of you (See Out). You might hear ambient sounds -- air conditioning, distant traffic, a clock (Hear Out). Notice the feeling of your body in your seat (Feel Out). Now notice any mental images that arose while reading this (See In). Notice any internal commentary -- perhaps 'this is interesting' or 'I wonder if I'm doing it right' (Hear In). Notice any subtle emotional tone in your body -- engagement, boredom, curiosity, tension (Feel In). All six channels are active right now."
          duration={20}
          questions={[
            { question: 'What was your dominant Out channel just now?', type: 'inferential', answer: 'Open-ended. Most people in a reading context will say See Out (the screen) or Hear Out (ambient sounds).' },
            { question: 'What was your dominant In channel?', type: 'inferential', answer: 'Open-ended. Many people notice Hear In (commentary about the exercise) most readily.' },
            { question: 'Were you able to identify all six channels? Which was hardest to detect?', type: 'inferential', answer: 'Open-ended. See In (mental images) is often the hardest for people to notice because images are fleeting and often outside habitual awareness.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.shinzen-noting.inside-outside-feynman"
        prompt="A friend says 'I'm overwhelmed and I don't know why.' Walk them through using the 6-cell grid to decompose their experience into specific, observable parts."
        rubric={[
          'You explained the See/Hear/Feel categories clearly.',
          'You explained the In/Out dimension.',
          'You walked through a concrete example of decomposing overwhelm.',
          'Your tone was warm and supportive, not clinical.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Try the 6-category noting for 2 minutes. What did you notice about the balance of In vs Out in your experience? Was there one channel you kept returning to? Write what you observed."
          lessonId="observation.shinzen-noting.inside-outside"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Shinzen Noting
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Noting Practice
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

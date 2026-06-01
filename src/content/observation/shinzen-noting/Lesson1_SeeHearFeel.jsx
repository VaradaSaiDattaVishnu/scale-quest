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
 * Lesson 1 -- See / Hear / Feel
 * Shinzen Young's Unified Mindfulness system: the three sensory
 * categories as the foundation of systematic observation.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Sensory triad diagram ── */
function SensoryTriad({ activeCategory }) {
  const categories = [
    { label: 'See', color: SAGE, icon: 'M12,5 C12,5 5,10 5,14 C5,20 12,22 12,22 C12,22 19,20 19,14 C19,10 12,5 12,5 Z M12,10 A3,3 0 1,1 12,16 A3,3 0 1,1 12,10', y: 20 },
    { label: 'Hear', color: AMBER, icon: 'M10,7 L10,17 L14,20 L14,4 L10,7 Z M17,8 Q21,12 17,16 M19,5 Q25,12 19,19', y: 20 },
    { label: 'Feel', color: SLATE, icon: 'M12,4 L12,4 C8,4 5,7 5,11 L5,14 C5,17 7,19 10,20 L12,21 L14,20 C17,19 19,17 19,14 L19,11 C19,7 16,4 12,4 Z', y: 20 },
  ]

  return (
    <svg viewBox="0 0 300 140" width="100%" className="max-w-sm mx-auto">
      {/* connecting lines */}
      <line x1="75" y1="70" x2="150" y2="70" stroke={SLATE} strokeWidth="0.5" opacity={0.15} strokeDasharray="3 3" />
      <line x1="150" y1="70" x2="225" y2="70" stroke={SLATE} strokeWidth="0.5" opacity={0.15} strokeDasharray="3 3" />
      <line x1="75" y1="70" x2="225" y2="70" stroke={SLATE} strokeWidth="0.5" opacity={0.1} />

      {categories.map(({ label, color, icon }, i) => {
        const cx = 75 + i * 75
        const isActive = activeCategory === label.toLowerCase()
        return (
          <g key={label}>
            <motion.circle
              cx={cx} cy={60} r={isActive ? 32 : 28}
              fill={color} fillOpacity={isActive ? 0.12 : 0.06}
              stroke={color} strokeWidth={isActive ? 2 : 1}
              animate={isActive ? { r: [32, 34, 32] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            {/* icon */}
            <g transform={`translate(${cx - 12}, ${60 - 12})`}>
              <path d={icon} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <text x={cx} y={105} textAnchor="middle" fontSize="11" fill={color} fontWeight="600">
              {label}
            </text>
            <text x={cx} y={118} textAnchor="middle" fontSize="7" fill={color} opacity={0.6}>
              {label === 'See' ? 'Visual experience' : label === 'Hear' ? 'Auditory experience' : 'Body sensation'}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Lesson1_SeeHearFeel({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [activeCategory, setActiveCategory] = useState('see')

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          See / Hear / Feel
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Three categories for everything you can experience.
        </p>
      </header>

      {/* ── Research: Shinzen's system ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Shinzen Young spent decades studying contemplative traditions across Asia before synthesizing their common principles into what he calls the Unified Mindfulness system. His central insight was that the enormous variety of mindfulness techniques across traditions could be organized around a simple observation: all conscious experience falls into three sensory categories -- See (visual experience), Hear (auditory experience), and Feel (body sensation, including emotion as felt in the body). Everything you can be aware of at any given moment belongs to one of these three channels.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This framework is not a simplification for beginners. It is a precision tool for systematic observation. By training yourself to identify which channel an experience belongs to -- and to do so in real time -- you develop the ability to observe your own experience with a clarity and granularity that most people never achieve. The system has been the subject of multiple peer-reviewed studies and is used in clinical settings for pain management, anxiety reduction, and attention training.
        </p>
      </section>

      {/* ── VISUAL: Interactive sensory triad ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <SensoryTriad activeCategory={activeCategory} />
          <div className="flex justify-center gap-3 mt-4">
            {['see', 'hear', 'feel'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn text-sm ${activeCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-elevated rounded-calm p-4 border border-line-soft"
          >
            {activeCategory === 'see' && (
              <div>
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: SAGE }}>SEE</p>
                <p className="text-xs font-reading text-ink-secondary">Everything visual: colours, shapes, light, movement, faces, text. Both external (what your eyes detect) and internal (mental images, visualizations, dreams).</p>
              </div>
            )}
            {activeCategory === 'hear' && (
              <div>
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: AMBER }}>HEAR</p>
                <p className="text-xs font-reading text-ink-secondary">Everything auditory: sounds, music, speech, silence. Both external (ambient noise, voices) and internal (your inner monologue, mental chatter, imagined sounds).</p>
              </div>
            )}
            {activeCategory === 'feel' && (
              <div>
                <p className="text-xs font-ui font-semibold mb-1" style={{ color: SLATE }}>FEEL</p>
                <p className="text-xs font-reading text-ink-secondary">Everything somatic: warmth, pressure, tingling, pain, tension, relaxation. Emotions as experienced in the body (chest tightness for anxiety, warmth for affection). Both external (touch, temperature) and internal (gut feelings, heartbeat).</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Research: why categories matter ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The value of categorical observation was demonstrated in a series of studies by Amishi Jha and colleagues (2007) at the University of Pennsylvania. They found that mindfulness training that included systematic sensory labeling improved three measurable components of attention: alerting (readiness to detect stimuli), orienting (selecting where to focus), and conflict monitoring (managing competing demands). The improvements were not large but they were statistically significant and replicated across multiple samples.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          What makes Shinzen's system particularly useful is that the categories are exhaustive (everything fits into See, Hear, or Feel) and mutually exclusive (any given moment of experience belongs to exactly one category). This means that the noting practice has no ambiguity -- you always know which label to apply. The simplicity of the system is its strength. It reduces the cognitive load of observation to near zero, freeing attention for the observation itself.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="How noting works"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  {[
                    { label: 'Bird song', tag: 'Hear', color: AMBER },
                    { label: 'Sunlight on wall', tag: 'See', color: SAGE },
                    { label: 'Warmth on skin', tag: 'Feel', color: SLATE },
                  ].map(({ label, tag, color }) => (
                    <div key={label} className="text-center">
                      <div className="px-3 py-2 rounded-calm border" style={{ borderColor: color }}>
                        <p className="text-[10px] text-ink-tertiary">{label}</p>
                        <p className="text-xs font-ui font-bold mt-1" style={{ color }}>{tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each moment of experience gets a single label: See, Hear, or Feel. The label is quick, silent, and effortless.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <motion.div className="flex gap-2">
                  {['See', 'Hear', 'Feel', 'See', 'Feel', 'Hear', 'Feel', 'See'].map((note, i) => (
                    <motion.span
                      key={i}
                      className="text-[10px] font-ui px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${note === 'See' ? SAGE : note === 'Hear' ? AMBER : SLATE}12`,
                        color: note === 'See' ? SAGE : note === 'Hear' ? AMBER : SLATE,
                      }}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      {note}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            ),
            caption: 'In practice, you note continuously -- a flowing stream of labels, roughly one every 2-5 seconds. The stream reveals patterns in your sensory experience.',
          },
          {
            visual: (
              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="bg-elevated rounded-calm p-3 border border-line-soft text-center">
                  <p className="text-[10px] font-ui text-ink-tertiary">WITHOUT NOTING</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"I feel anxious and everything is overwhelming"</p>
                </div>
                <div className="bg-elevated rounded-calm p-3 border border-line-soft text-center">
                  <p className="text-[10px] font-ui text-ink-tertiary">WITH NOTING</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"Hear (inner talk), Feel (chest tightness), See (mental image), Feel (stomach knot)"</p>
                </div>
              </div>
            ),
            caption: 'Noting decomposes vague overwhelm into specific, observable components. "Anxiety" becomes a sequence of See + Hear + Feel events that can be witnessed one at a time.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In Shinzen Young\'s system, which category does your inner monologue fall under?',
            options: [
              { id: 'see', label: 'See', correct: false },
              { id: 'hear', label: 'Hear (internal auditory experience)', correct: true },
              { id: 'feel', label: 'Feel', correct: false },
            ],
          },
          {
            prompt: 'A mental image of your childhood home would be categorized as:',
            options: [
              { id: 'see', label: 'See (internal visual experience)', correct: true },
              { id: 'hear', label: 'Hear', correct: false },
              { id: 'feel', label: 'Feel', correct: false },
            ],
          },
          {
            prompt: 'According to Jha et al. (2007), mindfulness training with sensory labeling improved:',
            options: [
              { id: 'mem', label: 'Long-term memory storage', correct: false },
              { id: 'attn', label: 'Alerting, orienting, and conflict monitoring', correct: true },
              { id: 'iq', label: 'General intelligence scores', correct: false },
            ],
          },
        ]}
      />

      {/* ── ObservationScene used as a noting exercise ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Noting Practice: Categorize the Scene
        </h2>
        <ObservationScene
          sceneDescription="You are sitting on a park bench. A warm breeze touches your arms. You hear children playing in the distance. You see leaves moving in the wind. A dog barks once, then is quiet. You feel the hard wooden slats of the bench against your back. A cloud passes over the sun and the light dims briefly. You notice a slight hunger in your stomach. Someone walks past humming a tune. You see their shadow stretch across the grass."
          duration={25}
          questions={[
            { question: 'List every SEE experience described.', type: 'factual', answer: 'Leaves moving, light dimming when cloud passes, shadow stretching across grass.' },
            { question: 'List every HEAR experience described.', type: 'factual', answer: 'Children playing (distant), dog barking, someone humming.' },
            { question: 'List every FEEL experience described.', type: 'factual', answer: 'Warm breeze on arms, wooden slats against back, slight hunger in stomach.' },
            { question: 'Which sensory channel did you recall most easily? What might that tell you?', type: 'inferential', answer: 'Open-ended. Most people recall either See or Feel most easily. The dominant channel often reflects habitual attention patterns.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.shinzen-noting.see-hear-feel-feynman"
        prompt="Explain Shinzen Young's See/Hear/Feel framework to someone who has never meditated. Use a concrete example from everyday life."
        rubric={[
          'You defined all three categories clearly and simply.',
          'You gave a concrete everyday example with correct categorization.',
          'You explained why breaking experience into categories is useful.',
          'You did not make it sound religious or mystical.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Try noting for 60 seconds right now. Close your eyes if you like and just notice: See? Hear? Feel? Which channel dominates your experience? What surprised you?"
          lessonId="observation.shinzen-noting.see-hear-feel"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Shinzen Noting
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Inside / Outside
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

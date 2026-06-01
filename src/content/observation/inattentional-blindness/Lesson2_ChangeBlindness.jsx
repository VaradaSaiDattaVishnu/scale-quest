import { useState, useCallback } from 'react'
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
 * Lesson 2 -- Change Blindness
 * Rensink, O'Regan & Clark (1997) flicker paradigm.
 * Visual: a scene that changes during a brief blank, challenging
 * the learner to detect the difference.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Flicker-change demo SVG ── */
function FlickerScene({ variant }) {
  const treeCount = variant === 'a' ? 3 : 2
  const windowLit = variant === 'a'
  return (
    <svg viewBox="0 0 280 180" width="100%" className="max-w-xs mx-auto">
      {/* sky */}
      <rect width="280" height="180" rx="6" fill="#E8E4DF" />
      {/* ground */}
      <rect y="130" width="280" height="50" fill={SAGE} fillOpacity={0.15} />
      {/* building */}
      <rect x="100" y="40" width="80" height="90" rx="3" fill={SLATE} fillOpacity={0.2} stroke={SLATE} strokeWidth="1" />
      {/* windows */}
      {[115, 145].map((wx) =>
        [55, 80, 105].map((wy, j) => (
          <rect
            key={`${wx}-${wy}`}
            x={wx} y={wy} width="18" height="14" rx="1.5"
            fill={(wx === 145 && wy === 55 && windowLit) ? AMBER : SLATE}
            fillOpacity={(wx === 145 && wy === 55 && windowLit) ? 0.6 : 0.1}
            stroke={SLATE} strokeWidth="0.5"
          />
        ))
      )}
      {/* trees */}
      {Array.from({ length: treeCount }).map((_, i) => {
        const tx = 40 + i * 35
        return (
          <g key={`tree-${i}`}>
            <rect x={tx} y="110" width="6" height="20" rx="1" fill={SAGE} fillOpacity={0.5} />
            <circle cx={tx + 3} cy="105" r="14" fill={SAGE} fillOpacity={0.25} />
          </g>
        )
      })}
      {/* car */}
      <rect x="200" y="140" width="40" height="18" rx="4" fill={SLATE} fillOpacity={0.3} />
      <circle cx="210" cy="160" r="5" fill={SLATE} fillOpacity={0.2} />
      <circle cx="230" cy="160" r="5" fill={SLATE} fillOpacity={0.2} />
    </svg>
  )
}

function FlickerDemo() {
  const [showVariant, setShowVariant] = useState('a')
  const [flickering, setFlickering] = useState(false)
  const [found, setFound] = useState(false)

  const startFlicker = useCallback(() => {
    if (flickering || found) return
    setFlickering(true)
    let count = 0
    const interval = setInterval(() => {
      setShowVariant((v) => (v === 'a' ? 'b' : 'a'))
      count++
      if (count > 10) {
        clearInterval(interval)
        setFlickering(false)
      }
    }, 800)
  }, [flickering, found])

  return (
    <div className="bg-surface rounded-gentle p-6 border border-line-soft">
      <p className="text-sm font-ui text-ink-tertiary mb-4 text-center">
        Two details change between flickers. Can you spot them?
      </p>
      <AnimatePresence mode="wait">
        <motion.div
          key={showVariant}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
        >
          <FlickerScene variant={showVariant} />
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center gap-3 mt-4">
        {!found && (
          <button onClick={startFlicker} className="btn btn-secondary text-sm" disabled={flickering}>
            {flickering ? 'Flickering...' : 'Start flicker'}
          </button>
        )}
        <button
          onClick={() => setFound(true)}
          className="btn btn-secondary text-sm"
        >
          {found ? 'Changes revealed' : 'Reveal changes'}
        </button>
      </div>
      {found && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm font-ui text-center"
          style={{ color: SAGE }}
        >
          A tree disappears (3 vs 2) and the upper-right window changes from lit amber to dark.
        </motion.div>
      )}
    </div>
  )
}

export default function Lesson2_ChangeBlindness({
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
          Change Blindness
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When the world shifts and you do not notice.
        </p>
      </header>

      {/* ── Research: Rensink's flicker paradigm ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1997, Ronald Rensink, Kevin O'Regan, and James Clark published a study that extended the findings of inattentional blindness into a new domain. Their "flicker paradigm" showed participants two versions of a photograph alternating back and forth with a brief blank screen inserted between them. The two images differed in one significant detail -- a large object removed, a colour changed, a building shifted. Despite the change being dramatic, participants often took many cycles -- sometimes minutes -- to detect it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The critical ingredient was the blank screen. Without it, changes produce a transient motion signal that the visual system catches automatically. The brief interruption masks that signal, forcing the viewer to rely on memory of the previous image -- and that memory turns out to be far less detailed than we assume. Rensink's work demonstrated that our subjective experience of seeing a rich, stable visual world is partially an illusion. We see less than we think we do.
        </p>
      </section>

      {/* ── VISUAL: Flicker demo ── */}
      <section className="my-10">
        <FlickerDemo />
      </section>

      {/* ── Research: real-world change blindness ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Simons and Levin (1998) took change blindness out of the lab. In their field study, an experimenter approached pedestrians and asked for directions. Mid-conversation, two people carrying a large door walked between them, and a different experimenter replaced the original one. Despite being in direct face-to-face conversation, about half the pedestrians did not notice they were now talking to a different person. The change happened during a brief visual occlusion -- the door -- which functioned like Rensink's blank screen.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          These findings collectively suggest that our perceptual system does not maintain a complete, detailed internal model of the visual scene. Instead, it maintains a sparse representation, filling in detail on demand when attention is directed to a specific location. This "just-in-time" strategy is efficient but fragile. Anything not currently attended to exists in awareness only as a rough sketch, if at all.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Why the blank screen matters"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-4">
                {['Image A', 'Blank', 'Image B'].map((label, i) => (
                  <motion.div
                    key={label}
                    className="w-20 h-14 rounded-calm border flex items-center justify-center"
                    style={{
                      borderColor: i === 1 ? SLATE : AMBER,
                      backgroundColor: i === 1 ? `${SLATE}10` : `${AMBER}08`,
                    }}
                    animate={i === 1 ? { opacity: [0.3, 1, 0.3] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-xs font-ui" style={{ color: i === 1 ? SLATE : AMBER }}>{label}</span>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'The flicker paradigm: Image A, blank, Image B, blank -- repeating. The blank masks the motion signal that would otherwise flag the change.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                      <span className="text-xs font-ui font-bold" style={{ color: SAGE }}>Motion</span>
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">No blank = instant detection</p>
                  </div>
                  <span className="text-ink-tertiary font-ui">vs</span>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: AMBER }}>
                      <span className="text-xs font-ui font-bold" style={{ color: AMBER }}>Memory</span>
                    </div>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">Blank = must compare from memory</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Without the blank, your visual system detects change automatically via motion. With the blank, you must rely on memory -- which stores far less detail than you expect.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <svg viewBox="0 0 200 60" width="200">
                  <rect x="5" y="10" width="55" height="40" rx="4" fill={SAGE} fillOpacity={0.12} stroke={SAGE} strokeWidth="1" />
                  <text x="32" y="35" textAnchor="middle" fontSize="8" fill={SAGE}>Attended</text>
                  <rect x="72" y="10" width="55" height="40" rx="4" fill={AMBER} fillOpacity={0.08} stroke={AMBER} strokeWidth="1" strokeDasharray="3 2" />
                  <text x="100" y="35" textAnchor="middle" fontSize="8" fill={AMBER}>Sparse</text>
                  <rect x="140" y="10" width="55" height="40" rx="4" fill={SLATE} fillOpacity={0.05} stroke={SLATE} strokeWidth="1" strokeDasharray="2 3" />
                  <text x="168" y="35" textAnchor="middle" fontSize="8" fill={SLATE} opacity={0.5}>Absent</text>
                </svg>
              </div>
            ),
            caption: 'Your internal model of a scene has three levels of detail: richly attended, sparsely represented, and entirely absent. Most of the visual field is in the last two categories.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the role of the blank screen in Rensink\'s flicker paradigm?',
            options: [
              { id: 'rest', label: 'It gives the eyes time to rest', correct: false },
              { id: 'mask', label: 'It masks the transient motion signal that would flag the change', correct: true },
              { id: 'mem', label: 'It erases short-term memory', correct: false },
            ],
          },
          {
            prompt: 'In the Simons & Levin door study, what served as the equivalent of a blank screen?',
            options: [
              { id: 'door', label: 'The large door carried between the speakers', correct: true },
              { id: 'dark', label: 'The street going dark', correct: false },
              { id: 'dist', label: 'The pedestrian being distracted by noise', correct: false },
            ],
          },
          {
            prompt: 'Change blindness research suggests that our internal model of the visual world is:',
            options: [
              { id: 'rich', label: 'Complete and detailed at all times', correct: false },
              { id: 'sparse', label: 'Sparse, filled in on demand when attention is directed somewhere', correct: true },
              { id: 'none', label: 'Entirely absent until we move our eyes', correct: false },
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
          sceneDescription="A kitchen counter with nine items arranged from left to right: a blue ceramic mug, a wooden cutting board, a bunch of bananas, a pepper grinder, a folded dish towel (white with green stripes), a glass jar of honey, a small potted herb (basil), a stainless steel toaster, and a single lemon. The counter surface is grey marble. A window behind the counter shows afternoon light, and a bird feeder is visible outside."
          duration={25}
          questions={[
            { question: 'Name as many items on the counter as you can.', type: 'factual', answer: 'Blue ceramic mug, wooden cutting board, bananas, pepper grinder, dish towel (white/green stripes), honey jar, potted basil, toaster, lemon.' },
            { question: 'What pattern was on the dish towel?', type: 'factual', answer: 'White with green stripes.' },
            { question: 'What was visible through the window?', type: 'spatial', answer: 'A bird feeder, in afternoon light.' },
            { question: 'If one item were removed from this scene, how confident are you that you would notice? Why or why not?', type: 'inferential', answer: 'Open-ended. Most people overestimate confidence. Items near the edges or less visually distinctive (pepper grinder, towel) are most likely to go unnoticed.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.inattentional-blindness.change-blindness-feynman"
        prompt="Explain why change blindness increases during a natural conversation. Use the door study as your example."
        rubric={[
          'You identified that visual occlusion (the door) masks the change signal.',
          'You connected it to the sparse internal model concept.',
          'You did not confuse change blindness with inattentional blindness.',
          'Your explanation would make sense to someone who has not read this lesson.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="How does it feel to learn that your visual experience is less complete than it seems? Does this create any discomfort, or does it feel freeing? Write honestly."
          lessonId="observation.inattentional-blindness.change-blindness"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Inattentional Blindness
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Attention Filters
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

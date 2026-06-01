import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  MemoryPalace3D,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Forward / Backward Review
 * Module 2: Your First Palace
 *
 * Walk the palace forward, then backward. Bidirectional retrieval
 * strengthens asymmetric associations and reveals weak links.
 */

/* --- inline SVG: directional walk animation --- */
const DirectionalWalk = ({ direction = 'forward' }) => {
  const isForward = direction === 'forward'
  const loci = ['Door', 'Sofa', 'Lamp', 'Sink', 'Bed']
  const positions = [30, 80, 130, 180, 230]
  const order = isForward ? [0, 1, 2, 3, 4] : [4, 3, 2, 1, 0]

  return (
    <svg width="280" height="120" viewBox="0 0 280 120" fill="none" className="mx-auto">
      {/* Locus markers */}
      {loci.map((name, i) => (
        <g key={name}>
          <circle cx={positions[i]} cy="50" r="16" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.05)" />
          <text x={positions[i]} y="54" textAnchor="middle" fill="#5B6F8C" fontSize="8" className="font-ui">{i + 1}</text>
          <text x={positions[i]} y="84" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="8" className="font-ui">{name}</text>
        </g>
      ))}

      {/* Direction arrow */}
      <motion.g
        animate={{
          x: isForward ? [0, 200] : [200, 0],
        }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
      >
        <circle cx="30" cy="50" r="8" fill="#4F7A5A" />
        <motion.path
          d={isForward ? 'M38 50 L46 50 M43 46 L46 50 L43 54' : 'M22 50 L14 50 M17 46 L14 50 L17 54'}
          stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </motion.g>

      {/* Direction label */}
      <text x="140" y="108" textAnchor="middle" fill={isForward ? '#4F7A5A' : '#B89466'} fontSize="10" className="font-ui font-semibold">
        {isForward ? 'FORWARD: 1 -> 2 -> 3 -> 4 -> 5' : 'BACKWARD: 5 -> 4 -> 3 -> 2 -> 1'}
      </text>
    </svg>
  )
}

/* --- inline SVG: chain strength diagram --- */
const ChainStrength = ({ bidirectional = false }) => {
  const color = bidirectional ? '#4F7A5A' : '#B89466'
  return (
    <svg width="260" height="80" viewBox="0 0 260 80" fill="none" className="mx-auto">
      {/* Nodes */}
      {['A', 'B', 'C', 'D'].map((label, i) => (
        <g key={label}>
          <circle cx={40 + i * 65} cy="40" r="18" stroke={color} strokeWidth="2" fill={`rgba(${bidirectional ? '79,122,90' : '184,148,102'},0.08)`} />
          <text x={40 + i * 65} y="44" textAnchor="middle" fill={color} fontSize="12" className="font-ui font-bold">{label}</text>
        </g>
      ))}

      {/* Forward arrows */}
      {[0, 1, 2].map(i => (
        <motion.line
          key={`fwd-${i}`}
          x1={58 + i * 65} y1="35"
          x2={87 + i * 65} y2="35"
          stroke={color} strokeWidth="2"
          markerEnd="url(#arrowhead)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.2, duration: 0.4 }}
        />
      ))}

      {/* Backward arrows (only if bidirectional) */}
      {bidirectional && [0, 1, 2].map(i => (
        <motion.line
          key={`bwd-${i}`}
          x1={87 + i * 65} y1="47"
          x2={58 + i * 65} y2="47"
          stroke={color} strokeWidth="2" strokeDasharray="3 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
        />
      ))}

      {/* Arrowhead definition */}
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <path d="M0 0 L6 2 L0 4 Z" fill={color} />
        </marker>
      </defs>
    </svg>
  )
}

/* --- inline SVG: weak link detector --- */
const WeakLinkDetector = () => (
  <svg width="280" height="90" viewBox="0 0 280 90" fill="none" className="mx-auto">
    {['Door', 'Sofa', 'Lamp', 'Sink', 'Bed'].map((name, i) => {
      const isWeak = i === 2
      const cx = 30 + i * 55
      return (
        <g key={name}>
          <motion.circle
            cx={cx} cy="40" r="16"
            stroke={isWeak ? '#B89466' : '#4F7A5A'}
            strokeWidth={isWeak ? 2.5 : 1.5}
            fill={isWeak ? 'rgba(184,148,102,0.1)' : 'rgba(79,122,90,0.06)'}
            animate={isWeak ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x={cx} y="44" textAnchor="middle" fill={isWeak ? '#B89466' : '#4F7A5A'} fontSize="8" className="font-ui">{name}</text>
          {i < 4 && (
            <line
              x1={cx + 16} y1="40" x2={cx + 39} y2="40"
              stroke={isWeak || i === 1 ? '#B89466' : '#4F7A5A'}
              strokeWidth={isWeak || i === 1 ? 1 : 1.5}
              strokeDasharray={isWeak || i === 1 ? '3 3' : 'none'}
            />
          )}
        </g>
      )
    })}
    <text x="140" y="78" textAnchor="middle" fill="#B89466" fontSize="9" className="font-ui">
      Walking backward reveals the weak link at "Lamp"
    </text>
  </svg>
)

export default function Lesson4_ForwardBackward({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [direction, setDirection] = useState('forward')

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Forward and Backward
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          A palace you can only walk one way is half-built.
        </p>
      </header>

      {/* ---- Research: bidirectional retrieval ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Memory associations are typically asymmetric. If you learn "A leads to B," you can recall B when cued with A -- but being cued with B and trying to recall A is significantly harder. This asymmetry was documented by Ebbinghaus in the 1880s and confirmed across hundreds of studies since. It means that if you only practice your palace in one direction, the forward associations become strong but the backward ones remain weak.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Bidirectional practice -- walking both forward and backward -- creates two independent retrieval pathways for each pair of loci. Research on associative learning shows that practicing in both directions produces stronger, more flexible memories than practicing in one direction for twice as long. The backward walk also reveals weak links: spots where you hesitate or go blank, exposing exactly where your palace needs reinforcement.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Why both directions matter"
        steps={[
          {
            visual: <ChainStrength bidirectional={false} />,
            caption: 'Forward-only practice creates one-way chains: A triggers B, B triggers C. But if you start at C, you cannot easily reach A.',
          },
          {
            visual: <ChainStrength bidirectional={true} />,
            caption: 'Bidirectional practice creates two-way links. Now any node can reach any other, forward or backward. The palace becomes a web, not just a chain.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-2">FORWARD ONLY</p>
                    <p className="font-ui text-lg font-bold" style={{ color: '#B89466' }}>62%</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">recall at any point</p>
                    <div className="mt-2 h-1.5 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[62%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                    </div>
                  </div>
                  <div className="rounded-calm p-4 border-2 text-center" style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}>
                    <p className="text-xs font-ui mb-2" style={{ color: '#4F7A5A' }}>BOTH DIRECTIONS</p>
                    <p className="font-ui text-lg font-bold" style={{ color: '#4F7A5A' }}>89%</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">recall at any point</p>
                    <div className="mt-2 h-1.5 bg-line-soft rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                        initial={{ width: '62%' }}
                        animate={{ width: '89%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Bidirectional practice significantly improves random-access recall -- the ability to retrieve any item without starting from the beginning.',
          },
          {
            visual: <WeakLinkDetector />,
            caption: 'The backward walk is a diagnostic tool. Where you hesitate is where the palace needs work. Forward practice hides these weak spots; backward practice exposes them.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">The practice cycle</p>
                <div className="flex items-center gap-2">
                  {[
                    { step: 'Forward', color: '#4F7A5A' },
                    { step: 'Backward', color: '#B89466' },
                    { step: 'Repair weak links', color: '#5B6F8C' },
                    { step: 'Repeat', color: '#4F7A5A' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.step}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div
                        className="rounded-calm px-3 py-1.5 border"
                        style={{ borderColor: s.color, backgroundColor: `${s.color}10` }}
                      >
                        <p className="text-[9px] font-ui font-medium" style={{ color: s.color }}>{s.step}</p>
                      </div>
                      {i < 3 && (
                        <svg width="12" height="8" viewBox="0 0 12 8">
                          <path d="M1 4H9M9 4L6 1M9 4L6 7" stroke="var(--color-ink-tertiary)" strokeWidth="1" />
                        </svg>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Walk forward. Walk backward. Note where you hesitate. Strengthen those spots. Repeat. This is the complete palace review cycle.',
          },
        ]}
      />

      {/* ---- Interactive direction toggle ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Walk Both Ways
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Toggle between forward and backward to see the path change
        </p>
        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => setDirection('forward')}
            className="rounded-gentle px-4 py-2 font-ui text-sm border"
            style={{
              borderColor: direction === 'forward' ? '#4F7A5A' : 'var(--color-line-soft)',
              backgroundColor: direction === 'forward' ? 'rgba(79,122,90,0.08)' : 'transparent',
              color: direction === 'forward' ? '#4F7A5A' : 'var(--color-ink-tertiary)',
            }}
          >
            Forward
          </button>
          <button
            onClick={() => setDirection('backward')}
            className="rounded-gentle px-4 py-2 font-ui text-sm border"
            style={{
              borderColor: direction === 'backward' ? '#B89466' : 'var(--color-line-soft)',
              backgroundColor: direction === 'backward' ? 'rgba(184,148,102,0.08)' : 'transparent',
              color: direction === 'backward' ? '#B89466' : 'var(--color-ink-tertiary)',
            }}
          >
            Backward
          </button>
        </div>
        <div className="bg-surface rounded-calm border border-line-soft p-6">
          <AnimatePresence mode="wait">
            <motion.div key={direction} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DirectionalWalk direction={direction} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ---- Research: desirable difficulty ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The backward walk feels harder -- and that difficulty is a feature, not a bug. Robert Bjork coined the term "desirable difficulty" to describe conditions that make learning harder in the moment but produce stronger, more durable memories. The struggle of backward retrieval is precisely what builds the second set of associations. If it felt easy, it would not be working.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Competition memory athletes report that backward practice is the single most effective technique for ensuring they can recall any item in a sequence without starting from the beginning. In competitive recall events, judges may ask for any item by position number. Only bidirectional practice makes this possible reliably.
        </p>
      </section>

      {/* ---- Prompt exercise ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <div className="bg-surface rounded-calm border border-line-soft p-6">
          <h3 className="font-ui text-ink-primary text-base font-semibold mb-3">
            Try it now
          </h3>
          <p className="font-reading text-ink-secondary leading-relaxed mb-3">
            Close your eyes. Walk through your palace forward -- name each locus in order. Then, starting from the last locus, walk backward to the first. Where did you hesitate?
          </p>
          <Prompt
            question="Which locus was hardest to reach when walking backward? Why do you think it was?"
            answer="The backward-hard spots are where your associations are one-directional. These need extra vivid images or sensory anchors."
          />
        </div>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why are memory associations typically asymmetric?',
            options: [
              { id: 'lazy', label: 'People are lazy learners', correct: false },
              { id: 'direction', label: 'The brain encodes A->B and B->A as separate associations', correct: true },
              { id: 'random', label: 'It is random which direction gets encoded', correct: false },
            ],
          },
          {
            prompt: 'What is the main benefit of backward walking through a palace?',
            options: [
              { id: 'fun', label: 'It is more fun than forward walking', correct: false },
              { id: 'diagnostic', label: 'It reveals weak links and builds reverse associations', correct: true },
              { id: 'speed', label: 'It makes forward walking faster', correct: false },
            ],
          },
          {
            prompt: 'What is a "desirable difficulty"?',
            options: [
              { id: 'hard', label: 'Any task that is frustratingly hard', correct: false },
              { id: 'desirable', label: 'A challenge that feels harder now but produces stronger learning', correct: true },
              { id: 'easy', label: 'Making tasks as easy as possible', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="first-palace-lesson4-feynman"
        prompt="Explain to someone who only practices their palace forward why they should also walk it backward, even though it feels harder."
        rubric={[
          'You explained that forward-only practice creates one-way associations.',
          'You mentioned that backward practice reveals weak links in the chain.',
          'You connected difficulty to stronger learning (desirable difficulty).',
          'Your explanation would motivate someone to try backward practice tonight.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="After trying the backward walk, what did you notice? Were there spots that felt solid in both directions? Spots that surprised you by being blank?"
          lessonId="memory.first-palace.forward-backward"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 5 &middot; Your First Palace
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: First recall -- your complete palace test
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

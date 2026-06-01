import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
 * Lesson 3 -- Artwork Drill
 * Extended practice: multiple artwork-style SVG scenes with
 * structured observation exercises using the Four A's.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Artwork Scene A: Harbor ── */
function HarborScene() {
  return (
    <svg viewBox="0 0 300 200" width="100%" className="max-w-sm mx-auto">
      <rect width="300" height="200" rx="6" fill="#E4E0DA" />
      {/* sky */}
      <rect width="300" height="100" fill="#D4DDEA" rx="6" />
      {/* clouds */}
      <motion.ellipse cx="70" cy="35" rx="30" ry="12" fill="white" fillOpacity={0.5}
        animate={{ cx: [70, 80, 70] }} transition={{ duration: 8, repeat: Infinity }} />
      <motion.ellipse cx="200" cy="25" rx="25" ry="10" fill="white" fillOpacity={0.4}
        animate={{ cx: [200, 190, 200] }} transition={{ duration: 10, repeat: Infinity }} />
      {/* water */}
      <rect y="100" width="300" height="100" fill={SLATE} fillOpacity={0.1} />
      {[20, 60, 100, 140, 180, 220, 260].map((x, i) => (
        <motion.path key={i}
          d={`M${x},${130 + i * 5} Q${x + 15},${125 + i * 5} ${x + 30},${130 + i * 5}`}
          fill="none" stroke={SLATE} strokeWidth="0.5" opacity={0.2}
          animate={{ d: `M${x},${130 + i * 5} Q${x + 15},${122 + i * 5} ${x + 30},${130 + i * 5}` }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, repeatType: 'mirror' }}
        />
      ))}
      {/* dock */}
      <rect x="20" y="95" width="80" height="8" rx="1" fill={AMBER} fillOpacity={0.4} stroke={AMBER} strokeWidth="0.5" />
      {[25, 45, 65, 85].map((x) => (
        <rect key={x} x={x} y="103" width="4" height="20" rx="0.5" fill={AMBER} fillOpacity={0.3} />
      ))}
      {/* boat 1 */}
      <path d="M130,110 Q150,125 170,110" fill={SLATE} fillOpacity={0.2} stroke={SLATE} strokeWidth="1" />
      <line x1="150" y1="80" x2="150" y2="110" stroke={SLATE} strokeWidth="1" />
      <motion.polygon points="150,80 150,100 165,95" fill="white" fillOpacity={0.6}
        animate={{ points: ['150,80 150,100 165,95', '150,82 150,100 163,96'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
      />
      {/* boat 2 -- smaller, background */}
      <path d="M230,105 Q240,112 250,105" fill={SLATE} fillOpacity={0.1} stroke={SLATE} strokeWidth="0.5" />
      <line x1="240" y1="90" x2="240" y2="105" stroke={SLATE} strokeWidth="0.5" />
      {/* lighthouse */}
      <rect x="260" y="60" width="12" height="40" rx="2" fill={AMBER} fillOpacity={0.3} stroke={AMBER} strokeWidth="0.5" />
      <motion.circle cx="266" cy="58" r="4" fill={AMBER} fillOpacity={0.5}
        animate={{ fillOpacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* birds */}
      {[80, 130, 180].map((bx, i) => (
        <motion.path key={i}
          d={`M${bx},${40 + i * 8} Q${bx + 4},${36 + i * 8} ${bx + 8},${40 + i * 8} Q${bx + 12},${36 + i * 8} ${bx + 16},${40 + i * 8}`}
          fill="none" stroke={SLATE} strokeWidth="0.8" opacity={0.3}
          animate={{ y: [-1, 1, -1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {/* figure on dock */}
      <circle cx="55" cy="88" r="4" fill={SLATE} fillOpacity={0.4} />
      <line x1="55" y1="92" x2="55" y2="96" stroke={SLATE} strokeWidth="1.5" opacity={0.3} />
    </svg>
  )
}

/* ── Artwork Scene B: Market ── */
function MarketScene() {
  return (
    <svg viewBox="0 0 300 200" width="100%" className="max-w-sm mx-auto">
      <rect width="300" height="200" rx="6" fill="#EDE8E0" />
      {/* awnings */}
      {[20, 110, 200].map((ax, i) => (
        <g key={i}>
          <path d={`M${ax},50 L${ax + 70},50 L${ax + 65},35 L${ax + 5},35 Z`}
            fill={[AMBER, SAGE, SLATE][i]} fillOpacity={0.2} stroke={[AMBER, SAGE, SLATE][i]} strokeWidth="0.8" />
          {/* stall */}
          <rect x={ax + 5} y={50} width={60} height={40} rx="2" fill="white" fillOpacity={0.3} stroke={SLATE} strokeWidth="0.5" />
          {/* items on stall */}
          {[0, 1, 2, 3].map((j) => (
            <circle key={j} cx={ax + 15 + j * 14} cy={65} r={4} fill={[AMBER, SAGE, SLATE, AMBER][j]} fillOpacity={0.3} />
          ))}
        </g>
      ))}
      {/* ground */}
      <rect y="130" width="300" height="70" rx="0" fill={AMBER} fillOpacity={0.05} />
      {/* cobblestones suggestion */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <rect key={i} x={10 + i * 32} y={150} width={25} height={12} rx="3" fill={SLATE} fillOpacity={0.04} />
      ))}
      {/* people */}
      {[50, 120, 180, 250].map((px, i) => (
        <g key={i}>
          <motion.circle cx={px} cy={118} r="5" fill={SLATE} fillOpacity={0.35}
            animate={{ x: [0, (i % 2 === 0 ? 3 : -3), 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
          <motion.line x1={px} y1={123} x2={px} y2={133} stroke={SLATE} strokeWidth="1.5" opacity={0.25}
            animate={{ x1: [px, px + (i % 2 === 0 ? 3 : -3)], x2: [px, px + (i % 2 === 0 ? 3 : -3)] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          />
        </g>
      ))}
      {/* cart */}
      <rect x="85" y="135" width="30" height="15" rx="2" fill={AMBER} fillOpacity={0.2} stroke={AMBER} strokeWidth="0.5" />
      <circle cx="88" cy="152" r="4" fill={SLATE} fillOpacity={0.15} />
      <circle cx="112" cy="152" r="4" fill={SLATE} fillOpacity={0.15} />
      {/* lamp post */}
      <rect x="155" y="70" width="3" height="60" rx="0.5" fill={SLATE} fillOpacity={0.3} />
      <circle cx="156" cy="68" r="5" fill={AMBER} fillOpacity={0.25} />
    </svg>
  )
}

export default function Lesson3_ArtworkDrill({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [currentScene, setCurrentScene] = useState('harbor')

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ── TITLE ── */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Artwork Drill
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Practice seeing with precision, patience, and plain language.
        </p>
      </header>

      {/* ── Research: art-based perception training ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The use of art for observation training is not a metaphor. A 2017 study published in the Journal of General Internal Medicine (Naghshineh et al.) found that medical students who completed an art-observation course demonstrated a 38% improvement in clinical observation skills compared to a control group. The improvement persisted on follow-up testing. The mechanism is that artworks demand sustained looking -- there is no action to take, no diagnosis to rush toward, only the discipline of seeing clearly and describing accurately.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Herman's workshops at the Met typically last 90 minutes. Participants spend 30-40 minutes with a single painting. At first, this feels excessive. By the end, most participants report that they were still noticing new details in the final minutes. The lesson is that initial observation is shallow. Depth requires time and deliberate attention -- far more than we habitually give anything.
        </p>
      </section>

      {/* ── VISUAL: Scene selector ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <div className="flex justify-center gap-3 mb-4">
            <button
              onClick={() => setCurrentScene('harbor')}
              className={`btn text-sm ${currentScene === 'harbor' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Scene A: Harbor
            </button>
            <button
              onClick={() => setCurrentScene('market')}
              className={`btn text-sm ${currentScene === 'market' ? 'btn-primary' : 'btn-ghost'}`}
            >
              Scene B: Market
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {currentScene === 'harbor' ? <HarborScene /> : <MarketScene />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Practice prompts ── */}
      <section className="my-10">
        <Prompt
          id={`observation.visual-intelligence.artwork-drill-${currentScene}`}
          question={currentScene === 'harbor'
            ? "Using the Four A's, describe the harbor scene. Start with ASSESS (everything you see), then ANALYZE (what stands out), then ARTICULATE (one clear summary sentence)."
            : "Apply the Four A's to the market scene. ASSESS all visible elements, ANALYZE what is unexpected or interesting, then ARTICULATE your observation in precise language."
          }
          placeholder="ASSESS: I see...\nANALYZE: What stands out is...\nARTICULATE: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Levels of observation depth"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-3">
                {[
                  { time: '10s', depth: '20%', color: AMBER },
                  { time: '60s', depth: '50%', color: SLATE },
                  { time: '5min', depth: '85%', color: SAGE },
                ].map(({ time, depth, color }) => (
                  <div key={time} className="text-center">
                    <div className="w-14 h-20 rounded-calm border flex flex-col items-center justify-end overflow-hidden" style={{ borderColor: color }}>
                      <motion.div
                        className="w-full rounded-b-calm"
                        style={{ backgroundColor: color, height: depth }}
                        initial={{ height: 0 }}
                        animate={{ height: depth }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                    <p className="text-[10px] font-ui mt-1" style={{ color }}>{time}</p>
                  </div>
                ))}
              </div>
            ),
            caption: 'Observation depth is a function of time. Most people stop at the 10-second level. Sustained attention reveals dramatically more.',
          },
          {
            visual: (
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="bg-elevated rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui text-ink-tertiary">FIRST GLANCE</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"A harbor with boats"</p>
                </div>
                <div className="bg-elevated rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui text-ink-tertiary">SUSTAINED LOOK</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"Two boats, one larger with a sail. A figure on the dock. A lighthouse with a pulsing light. Three birds. Clouds drifting left."</p>
                </div>
              </div>
            ),
            caption: 'First-glance descriptions are vague and generic. Sustained observation produces specific, unique, useful detail.',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In the Naghshineh et al. (2017) study, medical students who took an art-observation course improved their clinical observation skills by:',
            options: [
              { id: '10', label: 'About 10%', correct: false },
              { id: '38', label: 'About 38%', correct: true },
              { id: '75', label: 'About 75%', correct: false },
            ],
          },
          {
            prompt: 'Why does art work as an observation training tool?',
            options: [
              { id: 'beauty', label: 'Because beautiful images are easier to remember', correct: false },
              { id: 'sustain', label: 'Because art demands sustained looking without the pressure to act or diagnose', correct: true },
              { id: 'talent', label: 'Because art appreciation is an innate talent that transfers to other domains', correct: false },
            ],
          },
        ]}
      />

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.visual-intelligence.artwork-drill-feynman"
        prompt="Explain to a sceptic why staring at paintings for 30 minutes can make someone a better doctor or detective. Be specific about the mechanism."
        rubric={[
          'You explained that art enforces sustained looking without action pressure.',
          'You referenced the observation-interpretation distinction.',
          'You cited the measurable improvement in clinical observation skills.',
          'You did not claim art appreciation is the mechanism -- observation discipline is.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Did you notice more in the second scene than the first? What changed between your first and second attempt at structured observation? Write about the experience of slowing down."
          lessonId="observation.visual-intelligence.artwork-drill"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Visual Intelligence
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Field Application
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

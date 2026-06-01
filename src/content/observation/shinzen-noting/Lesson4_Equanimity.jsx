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
 * Lesson 4 -- Equanimity
 * The quality of non-reactive observation. Shinzen's "sensory clarity
 * x concentration x equanimity" formula. Research on acceptance-based
 * approaches to difficult experience.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Equanimity equation visual ── */
function EquanimityEquation() {
  const terms = [
    { label: 'Sensory Clarity', desc: 'How clearly you observe', color: SAGE },
    { label: 'Concentration', desc: 'How steadily you focus', color: AMBER },
    { label: 'Equanimity', desc: 'How non-reactively you witness', color: SLATE },
  ]
  return (
    <svg viewBox="0 0 300 100" width="100%" className="max-w-sm mx-auto">
      {terms.map(({ label, desc, color }, i) => {
        const cx = 50 + i * 100
        return (
          <g key={label}>
            <motion.circle
              cx={cx} cy={40} r="28"
              fill={color} fillOpacity={0.08}
              stroke={color} strokeWidth="1.5"
              animate={{ r: [28, 30, 28] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
            <text x={cx} y={38} textAnchor="middle" fontSize="7" fill={color} fontWeight="600">
              {label.split(' ')[0]}
            </text>
            <text x={cx} y={48} textAnchor="middle" fontSize="7" fill={color} fontWeight="600">
              {label.split(' ')[1] || ''}
            </text>
            <text x={cx} y={82} textAnchor="middle" fontSize="6.5" fill={color} opacity={0.6}>
              {desc}
            </text>
            {i < 2 && (
              <text x={cx + 50} y={44} textAnchor="middle" fontSize="14" fill={SLATE} opacity={0.3}>
                x
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

/* ── Resistance vs equanimity diagram ── */
function ResistanceDiagram() {
  return (
    <svg viewBox="0 0 280 120" width="100%" className="max-w-xs mx-auto">
      {/* Suffering = Pain x Resistance */}
      <g>
        <rect x="10" y="20" width="80" height="36" rx="4" fill={AMBER} fillOpacity={0.1} stroke={AMBER} strokeWidth="1" />
        <text x="50" y="34" textAnchor="middle" fontSize="8" fill={AMBER} fontWeight="600">Pain</text>
        <text x="50" y="46" textAnchor="middle" fontSize="7" fill={AMBER} opacity={0.6}>(inevitable)</text>
      </g>
      <text x="105" y="42" textAnchor="middle" fontSize="14" fill={SLATE} opacity={0.3}>x</text>
      <g>
        <rect x="115" y="20" width="80" height="36" rx="4" fill={AMBER} fillOpacity={0.1} stroke={AMBER} strokeWidth="1" />
        <text x="155" y="34" textAnchor="middle" fontSize="8" fill={AMBER} fontWeight="600">Resistance</text>
        <text x="155" y="46" textAnchor="middle" fontSize="7" fill={AMBER} opacity={0.6}>(optional)</text>
      </g>
      <text x="210" y="42" textAnchor="middle" fontSize="12" fill={SLATE} opacity={0.3}>=</text>
      <g>
        <rect x="220" y="20" width="50" height="36" rx="4" fill={AMBER} fillOpacity={0.15} stroke={AMBER} strokeWidth="1.5" />
        <text x="245" y="42" textAnchor="middle" fontSize="8" fill={AMBER} fontWeight="700">Suffering</text>
      </g>

      {/* Equanimity version */}
      <g>
        <rect x="10" y="74" width="80" height="36" rx="4" fill={SAGE} fillOpacity={0.1} stroke={SAGE} strokeWidth="1" />
        <text x="50" y="88" textAnchor="middle" fontSize="8" fill={SAGE} fontWeight="600">Pain</text>
        <text x="50" y="100" textAnchor="middle" fontSize="7" fill={SAGE} opacity={0.6}>(same)</text>
      </g>
      <text x="105" y="96" textAnchor="middle" fontSize="14" fill={SLATE} opacity={0.3}>x</text>
      <g>
        <rect x="115" y="74" width="80" height="36" rx="4" fill={SAGE} fillOpacity={0.1} stroke={SAGE} strokeWidth="1" />
        <text x="155" y="88" textAnchor="middle" fontSize="8" fill={SAGE} fontWeight="600">Equanimity</text>
        <text x="155" y="100" textAnchor="middle" fontSize="7" fill={SAGE} opacity={0.6}>(cultivated)</text>
      </g>
      <text x="210" y="96" textAnchor="middle" fontSize="12" fill={SLATE} opacity={0.3}>=</text>
      <g>
        <rect x="220" y="74" width="50" height="36" rx="4" fill={SAGE} fillOpacity={0.08} stroke={SAGE} strokeWidth="1" />
        <text x="245" y="90" textAnchor="middle" fontSize="8" fill={SAGE} fontWeight="600">Less</text>
        <text x="245" y="102" textAnchor="middle" fontSize="8" fill={SAGE} fontWeight="600">suffering</text>
      </g>
    </svg>
  )
}

export default function Lesson4_Equanimity({
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
          Equanimity
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Observing without pushing away or holding on.
        </p>
      </header>

      {/* ── Research: equanimity defined ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Shinzen Young defines the quality of mindfulness as the product of three factors: sensory clarity (how clearly you observe), concentration (how steadily you can focus), and equanimity (how non-reactively you witness what arises). Of these three, equanimity is the most often misunderstood. It is not indifference, suppression, or numbness. It is the capacity to observe an experience -- pleasant, unpleasant, or neutral -- without compulsively pushing it away or grasping onto it. The experience is fully felt, but the automatic reaction to it is softened.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Shinzen often expresses this with a formula: suffering = pain x resistance. Pain is an inevitable part of being alive -- physical discomfort, loss, uncertainty, frustration. Resistance is the layer we add on top: the wish that things were different, the contraction against what is happening, the mental commentary that amplifies the raw signal. Equanimity reduces the resistance factor. The pain may remain, but the multiplication factor that turns pain into suffering is diminished.
        </p>
      </section>

      {/* ── VISUAL: Equanimity equation ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            Shinzen's mindfulness formula
          </h3>
          <EquanimityEquation />
        </div>
      </section>

      {/* ── Research: acceptance-based approaches ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The concept of equanimity maps closely onto what clinical psychology calls "acceptance" -- a core component of Acceptance and Commitment Therapy (ACT) developed by Steven Hayes, and Dialectical Behaviour Therapy (DBT) developed by Marsha Linehan. Both therapies teach that attempting to suppress or avoid difficult internal experiences often makes them worse (a phenomenon called "experiential avoidance"), while learning to observe them without resistance reduces their power. The research base for this is substantial: a meta-analysis by Khoury et al. (2013) found that mindfulness-based interventions had moderate to large effects on anxiety and depression, with equanimity-related components being key predictors of improvement.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For the Observation pillar specifically, equanimity serves a precise function: it makes sustained observation possible. Without equanimity, unpleasant observations trigger avoidance (you look away, change the subject, distract yourself). Without equanimity, pleasant observations trigger clinging (you stop observing broadly and fixate on what feels good). Equanimity allows attention to flow freely across the entire field of experience, pleasant and unpleasant alike, without getting stuck on either.
        </p>
      </section>

      {/* ── VISUAL: Resistance diagram ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            Pain x Resistance = Suffering
          </h3>
          <ResistanceDiagram />
          <p className="text-xs font-ui text-ink-tertiary text-center mt-4">
            Equanimity does not eliminate pain. It reduces the multiplier that turns pain into suffering.
          </p>
        </div>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="Equanimity in practice"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ scale: [1, 0.9, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui" style={{ color: AMBER }}>Push</span>
                  </motion.div>
                  <p className="text-[9px] text-ink-tertiary mt-1">Aversion</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                    <span className="text-[10px] font-ui" style={{ color: SAGE }}>Allow</span>
                  </div>
                  <p className="text-[9px] text-ink-tertiary mt-1">Equanimity</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui" style={{ color: AMBER }}>Cling</span>
                  </motion.div>
                  <p className="text-[9px] text-ink-tertiary mt-1">Craving</p>
                </div>
              </div>
            ),
            caption: 'Equanimity is the middle path: neither pushing unpleasant experience away (aversion) nor clinging to pleasant experience (craving). Both are forms of resistance that distort observation.',
          },
          {
            visual: (
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="bg-elevated rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui text-ink-tertiary">WITHOUT EQUANIMITY</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"Feel In (chest pain) -- I hate this -- make it stop -- why does this always happen to me"</p>
                </div>
                <div className="bg-elevated rounded-calm p-3 border border-line-soft">
                  <p className="text-[10px] font-ui text-ink-tertiary">WITH EQUANIMITY</p>
                  <p className="text-xs font-reading text-ink-secondary mt-1">"Feel In (chest tightness)... observing... it pulses... it is smaller now... Feel In (warmth in face)..."</p>
                </div>
              </div>
            ),
            caption: 'Without equanimity, unpleasant sensation triggers a cascade of reactive thought. With equanimity, you stay with the raw sensation and observe its natural behaviour.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Clarity', desc: 'See it clearly', color: SAGE },
                    { label: 'Concentration', desc: 'Stay with it', color: AMBER },
                    { label: 'Equanimity', desc: 'Don\'t react', color: SLATE },
                  ].map(({ label, desc, color }) => (
                    <div key={label} className="text-center">
                      <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: color }}>
                        <span className="text-[8px] font-ui font-bold" style={{ color }}>{label.slice(0, 4)}</span>
                      </div>
                      <p className="text-[8px] text-ink-tertiary mt-1">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The three pillars support each other. Clarity without equanimity is overwhelming. Concentration without clarity is dull. Equanimity without clarity is avoidance. Together, they produce genuine mindfulness.',
          },
        ]}
      />

      {/* ── Practice: equanimity with noting ── */}
      <section className="my-10">
        <Prompt
          id="observation.shinzen-noting.equanimity-practice"
          question="Find a mildly uncomfortable sensation right now (a stiff neck, an itch, a hunger pang, or boredom itself). Practice noting it with equanimity for 60 seconds: label it (Feel In, usually), observe its qualities (pulsing? steady? warm? sharp?), and resist the urge to fix it. After 60 seconds, describe what happened to the sensation."
          placeholder="Sensation: ...\nLabeling: ...\nWhat happened over 60 seconds: ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In Shinzen\'s formula, equanimity is best described as:',
            options: [
              { id: 'numb', label: 'Emotional numbness or indifference', correct: false },
              { id: 'non', label: 'Non-reactive observation -- fully feeling without compulsive pushing or grasping', correct: true },
              { id: 'pos', label: 'Always feeling positive regardless of circumstances', correct: false },
            ],
          },
          {
            prompt: 'The formula "suffering = pain x resistance" implies that:',
            options: [
              { id: 'elim', label: 'Pain can be eliminated through mindfulness', correct: false },
              { id: 'mult', label: 'Resistance is a multiplier that amplifies pain into suffering, and can be reduced', correct: true },
              { id: 'ignore', label: 'You should ignore pain and pretend it does not exist', correct: false },
            ],
          },
          {
            prompt: 'Why is equanimity necessary for good observation?',
            options: [
              { id: 'calm', label: 'Because only calm people can observe well', correct: false },
              { id: 'flow', label: 'Because without it, aversion and craving distort where attention goes', correct: true },
              { id: 'med', label: 'Because observation is a meditation practice', correct: false },
            ],
          },
        ]}
      />

      {/* ── ObservationScene ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Equanimity Observation
        </h2>
        <ObservationScene
          sceneDescription="A hospital corridor. Fluorescent lights hum overhead. A nurse walks quickly, rubber soles squeaking on linoleum. An elderly patient shuffles slowly with a walker, a younger person holding their elbow gently. From behind a curtain, you hear quiet crying. The smell of antiseptic is sharp. A child sits in a plastic chair, swinging their legs, holding a deflated balloon. On the wall, a poster reads 'Your feelings are welcome here.' At the end of the corridor, sunlight streams through a window, catching dust motes in the air."
          duration={30}
          questions={[
            { question: 'Which detail in this scene would be hardest to observe with equanimity? Why?', type: 'inferential', answer: 'Open-ended. The crying behind the curtain, the elderly patient struggling, or the child with the deflated balloon are common answers. The key insight is that emotional resonance creates resistance or clinging that interferes with clear observation.' },
            { question: 'Categorize three experiences from the scene using See/Hear/Feel + In/Out.', type: 'factual', answer: 'Examples: Fluorescent humming = Hear Out. Sharp antiseptic smell = Feel Out. Emotional response to crying = Feel In. Sunlight through window = See Out.' },
            { question: 'How might equanimity improve a healthcare worker\'s observation in this environment?', type: 'inferential', answer: 'Equanimity allows the worker to observe difficult scenes (crying, struggling patients) without avoidance or overwhelm, leading to more accurate assessment and more compassionate response.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.shinzen-noting.equanimity-feynman"
        prompt="Explain the entire Shinzen Noting module to someone new: See/Hear/Feel, In/Out, noting practice, and equanimity. Show how they build on each other into a complete observation system."
        rubric={[
          'You covered all four concepts in a logical progression.',
          'You explained how the 6-cell grid maps all conscious experience.',
          'You described equanimity accurately (not numbness or suppression).',
          'You connected the system to practical observation, not just meditation.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Looking back at the entire Observation pillar -- inattentional blindness, visual intelligence, drawing, and noting -- which idea or practice has changed how you see the most? What will you carry forward? Write to your future self."
          lessonId="observation.shinzen-noting.equanimity"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Shinzen Noting
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Observation Pillar complete
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

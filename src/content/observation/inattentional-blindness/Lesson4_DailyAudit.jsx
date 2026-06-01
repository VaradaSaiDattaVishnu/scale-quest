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
 * Lesson 4 -- Daily Attention Audit
 * Practical application: a structured self-observation protocol
 * combining insights from lessons 1-3 into a daily practice.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* ── Audit wheel SVG ── */
function AuditWheel() {
  const segments = [
    { label: 'Morning', angle: 0, color: AMBER },
    { label: 'Transit', angle: 72, color: SLATE },
    { label: 'Work', angle: 144, color: SAGE },
    { label: 'Evening', angle: 216, color: AMBER },
    { label: 'Reflect', angle: 288, color: SAGE },
  ]
  const r = 60
  return (
    <svg viewBox="0 0 200 200" width="200" className="mx-auto">
      <circle cx="100" cy="100" r={r + 10} fill="none" stroke={SLATE} strokeWidth="0.5" opacity={0.2} />
      {segments.map(({ label, angle, color }, i) => {
        const rad = (angle - 90) * (Math.PI / 180)
        const x = 100 + r * Math.cos(rad)
        const y = 100 + r * Math.sin(rad)
        const lx = 100 + (r + 25) * Math.cos(rad)
        const ly = 100 + (r + 25) * Math.sin(rad)
        return (
          <g key={label}>
            <motion.circle
              cx={x} cy={y} r="12"
              fill={color} fillOpacity={0.12}
              stroke={color} strokeWidth="1.5"
              animate={{ r: [12, 14, 12] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
            <text x={lx} y={ly + 3} textAnchor="middle" fontSize="8" fill={color} fontWeight="600">
              {label}
            </text>
            {i < segments.length - 1 && (
              <line
                x1={x} y1={y}
                x2={100 + r * Math.cos(((segments[i + 1].angle - 90) * Math.PI) / 180)}
                y2={100 + r * Math.sin(((segments[i + 1].angle - 90) * Math.PI) / 180)}
                stroke={SLATE} strokeWidth="0.5" opacity={0.2} strokeDasharray="3 3"
              />
            )}
          </g>
        )
      })}
      <text x="100" y="103" textAnchor="middle" fontSize="9" fill={SLATE} fontWeight="600">Daily</text>
      <text x="100" y="115" textAnchor="middle" fontSize="9" fill={SLATE} fontWeight="600">Audit</text>
    </svg>
  )
}

export default function Lesson4_DailyAudit({
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
          Daily Attention Audit
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Five minutes a day to see what you have been missing.
        </p>
      </header>

      {/* ── Research: deliberate attention training ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The previous three lessons established that human attention is narrow, filtered, and systematically biased. Inattentional blindness, change blindness, and selective attention filters all operate below conscious awareness -- we do not notice what we are missing because the missing information never reaches the part of the brain that could notice it. The practical question is: can this be improved?
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on mindfulness-based attention training (Jha, Krompinger & Baime, 2007) has shown that structured attention exercises can measurably improve three components of attention: alerting (readiness to receive input), orienting (selecting what to focus on), and executive control (managing competing demands). These improvements are modest but consistent, and they appear after relatively brief training periods -- as little as eight sessions. The key finding is that attention is not fixed. It responds to practice, much like a muscle responds to exercise.
        </p>
      </section>

      {/* ── VISUAL: Audit wheel ── */}
      <section className="my-10">
        <div className="bg-surface rounded-gentle p-6 border border-line-soft">
          <h3 className="font-ui text-ink-primary text-sm font-semibold text-center mb-4">
            The Five-Point Daily Audit
          </h3>
          <AuditWheel />
          <p className="text-xs font-ui text-ink-tertiary text-center mt-4">
            Five moments, one deliberate observation each. The goal is noticing, not effort.
          </p>
        </div>
      </section>

      {/* ── Research: micro-practices ── */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The daily attention audit is not a formal meditation practice. It is based on a simpler principle from ecological psychology: the more often you deliberately shift between focused and open awareness, the more flexible your attention becomes. James Gibson (1979) argued that perception is an active process -- we do not passively receive information, we actively "pick up" information by moving through and engaging with the environment. The audit turns this insight into a micro-practice.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Each audit moment takes roughly 60 seconds. You pause, deliberately broaden your attention beyond its current focus, and notice one thing you had been ignoring. You do not need to do anything with this observation. The practice is the noticing itself. Over time, this trains the attentional system to be less locked into tunnel vision and more willing to sample the periphery -- the region where inattentional blindness and change blindness do their damage.
        </p>
      </section>

      {/* ── VISUAL STEP EXPLAINER ── */}
      <VisualStepExplainer
        title="The five audit moments"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${AMBER}15`, border: `2px solid ${AMBER}` }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="font-ui text-lg font-bold" style={{ color: AMBER }}>1</span>
                </motion.div>
                <p className="text-xs font-ui font-semibold" style={{ color: AMBER }}>Morning</p>
              </div>
            ),
            caption: 'Before leaving your home, pause at the door. Look at the space you are leaving. Notice one thing you normally walk past without seeing.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${SLATE}15`, border: `2px solid ${SLATE}` }}>
                  <span className="font-ui text-lg font-bold" style={{ color: SLATE }}>2</span>
                </div>
                <p className="text-xs font-ui font-semibold" style={{ color: SLATE }}>Transit</p>
              </div>
            ),
            caption: 'During travel (walking, driving, transit), spend 60 seconds in open monitoring mode. Do not focus on any one thing. Let your eyes wander and see what pulls your attention.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${SAGE}15`, border: `2px solid ${SAGE}` }}>
                  <span className="font-ui text-lg font-bold" style={{ color: SAGE }}>3</span>
                </div>
                <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Work</p>
              </div>
            ),
            caption: 'At midday, look at your workspace as if seeing it for the first time. What has changed since yesterday? What have you stopped noticing because it is always there?',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${AMBER}15`, border: `2px solid ${AMBER}` }}
                >
                  <span className="font-ui text-lg font-bold" style={{ color: AMBER }}>4</span>
                </motion.div>
                <p className="text-xs font-ui font-semibold" style={{ color: AMBER }}>Evening</p>
              </div>
            ),
            caption: 'During a conversation, briefly shift attention from content (what is said) to context (tone of voice, body language, what is not said). Then return to content.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${SAGE}15`, border: `2px solid ${SAGE}` }}>
                  <span className="font-ui text-lg font-bold" style={{ color: SAGE }}>5</span>
                </div>
                <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Reflect</p>
              </div>
            ),
            caption: 'Before bed, recall your five observations. Which was easiest to notice? Which required effort? What does that pattern tell you about where your attention naturally rests?',
          },
        ]}
      />

      {/* ── QUIZ ── */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Jha et al. (2007), which three components of attention improve with structured training?',
            options: [
              { id: 'correct', label: 'Alerting, orienting, and executive control', correct: true },
              { id: 'wrong1', label: 'Speed, accuracy, and endurance', correct: false },
              { id: 'wrong2', label: 'Visual acuity, colour perception, and depth estimation', correct: false },
            ],
          },
          {
            prompt: 'What is the primary goal of a daily attention audit?',
            options: [
              { id: 'perf', label: 'To achieve perfect observation', correct: false },
              { id: 'flex', label: 'To build flexibility in shifting between focused and open awareness', correct: true },
              { id: 'mem', label: 'To memorize environmental details', correct: false },
            ],
          },
        ]}
      />

      {/* ── Prompt: Design your own audit ── */}
      <section className="my-10">
        <Prompt
          id="observation.inattentional-blindness.daily-audit-prompt"
          question="Design your own five-point daily audit. Choose five specific moments in your typical day where you will pause and deliberately broaden your attention. Be concrete -- name the place, the time, and what you will look for."
          placeholder="1. Morning: ...\n2. ...\n3. ...\n4. ...\n5. ..."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ── ObservationScene ── */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Audit Practice: Open Monitoring
        </h2>
        <ObservationScene
          sceneDescription="You are standing at the entrance to a park. Straight ahead, a gravel path leads to a fountain surrounded by four benches. To the left, a playground with a red slide and a green climbing frame -- three children are playing. To the right, a row of oak trees casts long shadows across the grass. An elderly woman sits on the nearest bench reading a hardcover book. A dog (golden retriever) trots along the path without a leash. Near the fountain, a man in a blue jacket talks into his phone. A maintenance cart is parked behind the second bench. Two squirrels chase each other up the largest oak."
          duration={35}
          questions={[
            { question: 'Name as many living beings (humans, animals) as you can recall.', type: 'factual', answer: 'Three children, elderly woman, man in blue jacket, golden retriever, two squirrels -- at least 7-8 beings.' },
            { question: 'What colour was the slide?', type: 'factual', answer: 'Red.' },
            { question: 'Where was the maintenance cart?', type: 'spatial', answer: 'Behind the second bench.' },
            { question: 'If this were a real scene, what would you likely notice first and what would you miss? Why?', type: 'inferential', answer: 'Open-ended. Moving elements (children, dog, squirrels) tend to capture attention first. Static elements (maintenance cart, book cover, shadows) are more likely to be missed.' },
          ]}
        />
      </section>

      {/* ── FeynmanCheck ── */}
      <FeynmanCheck
        id="observation.inattentional-blindness.daily-audit-feynman"
        prompt="A colleague says: 'I don't need attention training -- I'm very observant.' Using what you have learned in this module, explain why even observant people benefit from structured attention practice."
        rubric={[
          'You referenced inattentional or change blindness as evidence that observation fails systematically.',
          'You explained that attention filters operate below awareness.',
          'You mentioned that attention flexibility improves with practice (Jha et al. or similar).',
          'You were respectful, not dismissive of the colleague\'s self-assessment.',
        ]}
      />

      {/* ── ReflectionJournal ── */}
      <section className="my-10">
        <ReflectionJournal
          prompt="After completing this module on inattentional blindness, what has shifted in how you think about your own perception? Is there anything unsettling about these findings, or do they feel liberating? Write what is true for you."
          lessonId="observation.inattentional-blindness.daily-audit"
          onSave={addJournalEntry}
        />
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Inattentional Blindness
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Visual Intelligence
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

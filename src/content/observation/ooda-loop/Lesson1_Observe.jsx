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
 * Lesson 1 -- Observe (OODA)
 * Boyd's first phase: gathering unfiltered information
 * from the environment before orientation distorts it.
 */

export default function Lesson1_Observe({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Observe
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The first phase of the OODA loop: gathering information before
          interpretation.
        </p>
      </header>

      {/* Research paragraph: John Boyd's framework */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Colonel John Boyd (1927-1997) was a United States Air Force
          fighter pilot and military strategist who developed one of the
          most influential frameworks for decision-making under
          uncertainty. His OODA loop -- Observe, Orient, Decide, Act --
          was originally designed for aerial combat, where the pilot who
          cycles through the loop faster gains an insurmountable advantage.
          But Boyd's framework has since been adopted in business strategy,
          emergency medicine, sports coaching, and cognitive psychology
          because it describes something universal: how humans process
          information and take action in dynamic environments.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The first phase, Observe, is deceptively simple: gather
          information from the environment through all available channels.
          Boyd emphasized that observation must be as unfiltered as
          possible -- before your mental models, biases, or expectations
          shape the data. This is remarkably similar to the naturalist's
          "I notice" and the phenomenologist's bracketed observation. The
          difference is context: Boyd's observation happens under time
          pressure, in dynamic situations where the environment is
          changing while you observe it.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The OODA Overview ---- */}
      <VisualStepExplainer
        title="The OODA loop: four phases"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
                  {/* Circular arrows */}
                  <circle
                    cx="120"
                    cy="120"
                    r="85"
                    stroke="#5B6F8C"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  {/* Four nodes */}
                  {[
                    { cx: 120, cy: 35, label: 'OBSERVE', color: '#4F7A5A', active: true },
                    { cx: 205, cy: 120, label: 'ORIENT', color: '#5B6F8C', active: false },
                    { cx: 120, cy: 205, label: 'DECIDE', color: '#5B6F8C', active: false },
                    { cx: 35, cy: 120, label: 'ACT', color: '#5B6F8C', active: false },
                  ].map((node, i) => (
                    <g key={node.label}>
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.active ? 32 : 28}
                        fill={node.color}
                        opacity={node.active ? 0.2 : 0.1}
                        stroke={node.color}
                        strokeWidth={node.active ? 2.5 : 1.5}
                        animate={node.active ? { r: [30, 34, 30] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <text
                        x={node.cx}
                        y={node.cy + 4}
                        textAnchor="middle"
                        fill={node.color}
                        fontSize={node.active ? 10 : 9}
                        fontFamily="ui-sans-serif"
                        fontWeight={node.active ? 'bold' : 'normal'}
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                  {/* Arrows between nodes */}
                  {[
                    { x1: 148, y1: 52, x2: 188, y2: 92 },
                    { x1: 205, y1: 148, x2: 148, y2: 188 },
                    { x1: 92, y1: 188, x2: 52, y2: 148 },
                    { x1: 52, y1: 92, x2: 92, y2: 52 },
                  ].map((arrow, i) => (
                    <motion.line
                      key={i}
                      x1={arrow.x1}
                      y1={arrow.y1}
                      x2={arrow.x2}
                      y2={arrow.y2}
                      stroke="#5B6F8C"
                      strokeWidth="1.5"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.3, duration: 0.5 }}
                    />
                  ))}
                </svg>
              </div>
            ),
            caption:
              'The OODA loop: Observe, Orient, Decide, Act. Not a rigid sequence but a continuous cycle. The pilot who cycles faster gains the advantage.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#B89466' }}
                    >
                      Filtered observation
                    </p>
                    <p className="text-[10px] text-ink-tertiary font-ui">
                      Sees what it expects to see. Confirms existing mental
                      models. Misses novel information.
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: '#4F7A5A' }}>
                    <p
                      className="text-xs font-ui font-medium mb-1"
                      style={{ color: '#4F7A5A' }}
                    >
                      Open observation
                    </p>
                    <p className="text-[10px] text-ink-tertiary font-ui">
                      Registers what is actually happening. Allows
                      disconfirming data. Updates mental models.
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Boyd insisted that observation must be open, not filtered through what you expect. Confirmation bias is the enemy of accurate observation.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-4 gap-2 max-w-sm w-full">
                  {[
                    { channel: 'Visual', icon: 'eye' },
                    { channel: 'Auditory', icon: 'ear' },
                    { channel: 'Kinesthetic', icon: 'body' },
                    { channel: 'Contextual', icon: 'map' },
                  ].map((ch, i) => (
                    <motion.div
                      key={ch.channel}
                      className="bg-surface rounded-calm p-2 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p
                        className="text-[10px] font-ui font-medium"
                        style={{ color: '#4F7A5A' }}
                      >
                        {ch.channel}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary text-center max-w-xs">
                  Observation draws on all available information channels,
                  not just the dominant one
                </p>
              </div>
            ),
            caption:
              'Boyd\'s observation uses all channels: visual, auditory, kinesthetic, and contextual. In dynamic situations, the channel you neglect may carry the most critical information.',
          },
        ]}
      />

      {/* Research paragraph: Observation under pressure */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Gary Klein's research on naturalistic decision-making (1998)
          complements Boyd's framework. Klein studied firefighters,
          emergency room physicians, and military commanders making
          decisions under time pressure and uncertainty. He found that
          experts do not evaluate options analytically -- they recognize
          patterns. But pattern recognition depends on accurate
          observation. When experts make errors, it is almost always
          because they observed selectively, fitting incoming data to a
          pre-existing pattern rather than letting the data speak.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Klein calls this "fixation error" -- locking onto an initial
          interpretation and filtering all subsequent observation through
          it. Boyd's solution was the same as Husserl's: discipline
          yourself to observe before you orient. Gather data before you
          make sense of it. The pressure to act quickly is real, but
          premature orientation (interpreting too soon) produces faster
          decisions that are more often wrong.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: Rapid Open Observation
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Scan the scene. List everything you notice in 60 seconds --
          do not interpret, just register.
        </p>
        <ObservationScene
          scene="dynamic-street"
          mode="rapid-scan"
          promptText="I observe..."
          timerMinutes={1}
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="ooda-observe-prompt"
        question="Think of a recent situation where you had to make a quick decision. What did you actually observe before you acted? What might you have missed because you jumped to interpretation too quickly?"
        placeholder="I observed... I may have missed..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In Boyd\'s OODA loop, observation should be:',
            options: [
              {
                id: 'a',
                label: 'Filtered through your existing mental model',
                correct: false,
              },
              {
                id: 'b',
                label: 'As open and unfiltered as possible',
                correct: true,
              },
              {
                id: 'c',
                label: 'Limited to visual information only',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Klein\'s "fixation error" occurs when:',
            options: [
              {
                id: 'a',
                label: 'You observe too slowly',
                correct: false,
              },
              {
                id: 'b',
                label: 'You lock onto an initial interpretation and filter all data through it',
                correct: true,
              },
              {
                id: 'c',
                label: 'You gather too much information',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="ooda-l1-feynman"
        prompt="Explain to someone who has never heard of the OODA loop why gathering information before interpreting it leads to better decisions, even when time is short."
        rubric={[
          'You explained that premature interpretation leads to fixation errors.',
          'You gave a concrete example of how open observation differs from filtered observation.',
          'You connected this to a real-world situation the person could relate to.',
          'You made speed of decision-making seem compatible with careful observation.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Do you tend to observe before acting, or jump straight to interpretation? What situations trigger the fastest jumps? Is there a cost to that speed?"
          lessonId="observation.ooda-loop.observe"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; OODA Loop
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Orient
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

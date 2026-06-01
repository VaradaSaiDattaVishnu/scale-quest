import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 3 -- The Flight Response
 * Survival through escape, busyness, and avoidance.
 * Tone: warm, validating, never clinical.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson3_FlightResponse({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Flight Response
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When safety meant never standing still.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The flight response is the nervous system's strategy of escape. In its most literal form,
          it is the urge to run. But when escape was not physically possible -- as is often the case
          for children in unsafe homes -- the flight response can take subtler forms: constant busyness,
          workaholism, perfectionism, overthinking, or an inability to rest. If you could not leave the
          room, you could leave your body. If you could not run from the house, you could run toward
          achievement.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Pete Walker describes the flight type as someone who learned to outrun their pain. The
          restlessness is not laziness in reverse -- it is a nervous system that equates stillness
          with danger. Sitting quietly feels threatening because, at some point, sitting quietly meant
          being trapped. The busyness is not productivity. It is protection.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Flight in the body"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
                  <ellipse cx="60" cy="25" rx="18" ry="22" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="47" x2="60" y2="110" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="60" x2="30" y2="90" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="60" x2="90" y2="90" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="110" x2="40" y2="165" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="110" x2="80" y2="165" stroke={AMBER} strokeWidth="2" />
                  {/* Activation in legs, head, chest */}
                  <motion.circle cx="60" cy="22" r="14" fill={AMBER} fillOpacity="0.15"
                    animate={{ fillOpacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.circle cx="40" cy="140" r="12" fill={AMBER} fillOpacity="0.2"
                    animate={{ fillOpacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.circle cx="80" cy="140" r="12" fill={AMBER} fillOpacity="0.2"
                    animate={{ fillOpacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.circle cx="60" cy="70" r="14" fill={AMBER} fillOpacity="0.15"
                    animate={{ fillOpacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  />
                </svg>
              </div>
            ),
            caption:
              'The flight response concentrates energy in the legs, the racing mind, and the chest. Your body is preparing to move -- fast. The restlessness is your nervous system doing its job.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Restless legs, jittery energy',
                    'Racing thoughts, mental loops',
                    'Difficulty sitting still or resting',
                    'Chronic busyness or overwork',
                    'Perfectionism as a way to stay safe',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SAGE }} />
                      <p className="text-xs font-ui text-ink-secondary">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Flight does not always look like running. Sometimes it looks like a packed schedule, a clean inbox, or a mind that will not stop planning. The engine underneath is the same: stay moving, stay safe.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div className="flex items-center gap-2">
                  {['Task', 'Task', 'Task', 'Task', 'Task'].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-8 rounded-sm border border-line-soft bg-surface flex items-center justify-center"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    >
                      <div className="w-6 h-1 rounded-full" style={{ backgroundColor: AMBER }} />
                    </motion.div>
                  ))}
                </motion.div>
                <p className="text-xs font-ui text-ink-tertiary mt-2 text-center max-w-xs">
                  The to-do list that never ends is not about getting things done. It is about not having
                  to feel what stillness brings up.
                </p>
              </div>
            ),
            caption:
              'Workaholism, overcommitting, and chronic planning can all be forms of flight. The nervous system stays in motion because stopping feels like being caught.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on hyperarousal in trauma survivors confirms what Walker observed clinically:
          the flight response is driven by a sympathetic nervous system that does not know how to
          come down. Cortisol and adrenaline remain elevated. The prefrontal cortex -- the part of
          the brain that can say "you are safe now" -- is partially offline. The body stays mobilized
          even when there is nowhere to run, because the part of the brain that detects threat has
          not received the message that the threat has passed.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The invitation is not to stop being productive or active. It is to notice when the busyness
          is a choice and when it is a compulsion. There is a difference between choosing to work
          hard and being unable to stop. The flight response protected you. Now you can begin to
          notice when it is driving and gently take the wheel.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The flight response in CPTSD can show up as:',
            options: [
              { id: 'literal', label: 'Only literal running away', correct: false },
              { id: 'busy', label: 'Workaholism, overthinking, chronic busyness', correct: true },
              { id: 'shut', label: 'Going numb and shutting down', correct: false },
            ],
          },
          {
            prompt: 'Why does stillness feel uncomfortable for someone with a dominant flight response?',
            options: [
              { id: 'lazy', label: 'Because they are naturally high-energy', correct: false },
              { id: 'trapped', label: 'Because stillness once meant being trapped with danger', correct: true },
              { id: 'bored', label: 'Because they bore easily', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="cptsd-flight-feynman"
        prompt="Explain why someone who never stops working might actually be running from something. How does the flight response disguise itself as productivity?"
        rubric={[
          'You connected busyness to the nervous system, not laziness or ambition.',
          'You explained why stillness can feel threatening.',
          'You used specific examples (workaholism, perfectionism, etc.).',
          'Your tone was compassionate.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Have you ever noticed that being still feels harder than being busy? What does your body do when you try to rest? No judgment -- just noticing."
          lessonId="trauma.cptsd.flight-response"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 5 &middot; CPTSD
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The freeze response
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

import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 4 -- Managers
 * Proactive protectors that prevent exile pain from surfacing.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson4_Managers({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Managers</h1>
        <p className="font-ui text-ink-secondary text-lg">The protectors who plan ahead.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">You can stop anytime. The stop button is always available.</p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In IFS, managers are proactive protectors. Their job is to prevent exile pain from
          surfacing in the first place. They do this by controlling, planning, analyzing,
          criticizing, and organizing your life so that nothing unexpected can trigger the exiled
          feelings. Managers are the parts that keep you productive, responsible, and in control.
          They are often praised by the outside world -- "you are so organized," "you are so
          responsible" -- because their strategies are socially rewarded.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But managers operate from fear, not freedom. The inner critic is a manager -- criticizing
          you before anyone else can. The perfectionist is a manager -- making sure nothing is
          ever good enough to provoke rejection. The people-pleaser is a manager -- keeping
          everyone happy so no one becomes dangerous. These parts are not the enemy. They are
          exhausted protectors doing a job they took on a long time ago, when there was no one
          else to do it.
        </p>
      </section>

      <VisualStepExplainer
        title="Common managers"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  {[
                    { name: 'Inner Critic', strategy: 'Criticizes you to prevent outside criticism' },
                    { name: 'Perfectionist', strategy: 'Ensures nothing is ever vulnerable to attack' },
                    { name: 'Controller', strategy: 'Manages all variables to prevent surprise' },
                    { name: 'Caretaker', strategy: 'Focuses on others to avoid your own pain' },
                    { name: 'Analyzer', strategy: 'Thinks endlessly to avoid feeling' },
                    { name: 'Planner', strategy: 'Organizes the future to prevent helplessness' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.name}</p>
                      <p className="text-[10px] text-ink-tertiary mt-1">{item.strategy}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Each manager has a clear strategy and a clear fear. Understanding the fear underneath the strategy changes your relationship with the part.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The invitation with managers is not to override them, but to appreciate them. When you
          can say to the inner critic, "I understand you are trying to keep me safe. Thank you.
          I have this," something softens. The manager does not need to be fired. It needs to
          know that the Self is present and capable. When managers trust the Self, they can
          relax their grip -- not because they stop caring, but because they no longer need to
          carry the weight alone.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Managers in IFS are:',
            options: [
              { id: 'react', label: 'Reactive protectors that respond to crises', correct: false },
              { id: 'proactive', label: 'Proactive protectors that prevent exile pain from surfacing', correct: true },
              { id: 'weak', label: 'Weak parts that need strengthening', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="parts-managers-feynman"
        prompt="Choose one common manager (critic, perfectionist, controller, etc.) and explain what it is actually trying to protect you from."
        rubric={[
          'You named a specific manager role.',
          'You identified the underlying fear it is managing.',
          'You framed appreciation rather than elimination.',
          'Your explanation would help someone see their critic differently.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Which manager is most active in your life? What do you think it is afraid will happen if it stops?"
          lessonId="trauma.parts-mapping.managers"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 4 of 6 &middot; Parts Mapping</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Firefighters</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

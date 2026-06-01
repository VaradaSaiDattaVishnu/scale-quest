import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 5 -- Firefighters
 * Reactive protectors that extinguish exile pain after it surfaces.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson5_Firefighters({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Firefighters</h1>
        <p className="font-ui text-ink-secondary text-lg">The protectors who put out fires -- at any cost.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          This lesson discusses reactive coping behaviors. You can stop anytime. Be gentle with yourself.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          If managers are the proactive protectors, firefighters are the reactive ones. They
          activate when exile pain breaks through the managers' defenses and floods the system.
          Their job is to extinguish the pain immediately, by any means necessary. The strategies
          firefighters use are often the behaviors that cause the most shame: bingeing, numbing,
          dissociating, raging, self-harm, substance use, or any behavior that drowns out the
          intolerable feeling.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Firefighters are not villains. They are emergency responders. When the exile's pain is
          too much and the managers have failed, the firefighter does the only thing it knows:
          make the pain stop, now, regardless of the cost. The behavior is not the problem -- it
          is the firefighter's solution to a problem. Understanding this changes the shame around
          it. The behavior is a desperate attempt at protection, not a moral failing.
        </p>
      </section>

      <VisualStepExplainer
        title="Understanding firefighters"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: AMBER, borderStyle: 'dashed' }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-[8px] font-ui" style={{ color: AMBER }}>Exile</span>
                    </motion.div>
                    <p className="text-[9px] text-ink-tertiary mt-1">Pain surfaces</p>
                  </div>
                  <motion.svg width="30" height="12" viewBox="0 0 30 12" animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                    <path d="M0 6H25M25 6L20 2M25 6L20 10" stroke="#9CA3AF" strokeWidth="1.5" />
                  </motion.svg>
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: AMBER }}>
                      <span className="text-[8px] font-ui" style={{ color: AMBER }}>Firefighter</span>
                    </div>
                    <p className="text-[9px] text-ink-tertiary mt-1">Emergency response</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Firefighters activate when exile pain overwhelms the managers. They rush in to stop the flooding by any means available.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Numbing through substances, food, or screens',
                    'Rage or explosive outbursts',
                    'Dissociation or "checking out"',
                    'Compulsive behaviors (spending, scrolling)',
                    'Self-destructive impulses',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SAGE }} />
                      <p className="text-xs font-ui text-ink-secondary">{item}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] text-ink-tertiary text-center max-w-xs mt-2">
                  These behaviors carry enormous shame. Understanding them as emergency protection
                  does not excuse harm, but it changes the relationship with the part that does them.
                </p>
              </div>
            ),
            caption:
              'Each of these is a firefighter strategy. The shame attached to these behaviors often makes them harder to change. Compassion is what allows change to begin.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The IFS approach to firefighters is the same as with all parts: relationship, not
          elimination. When you can say to a firefighter, "I understand why you do this. I know
          you are trying to help," the part often softens -- not immediately, but over time.
          Firefighters, like managers, ultimately want to know that the Self is present and that
          the exile will be cared for. When the exile is eventually unburdened (in therapy), the
          firefighter no longer has an emergency to respond to. It can take on a new role.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Firefighters in IFS activate when:',
            options: [
              { id: 'prevent', label: 'They are preventing pain proactively', correct: false },
              { id: 'break', label: 'Exile pain has broken through the managers\' defenses', correct: true },
              { id: 'calm', label: 'Everything is calm and stable', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="parts-firefighters-feynman"
        prompt="Someone is ashamed of a behavior they cannot seem to stop (scrolling, numbing, etc.). Using the firefighter concept, help them see it differently."
        rubric={[
          'You named the behavior as an emergency response, not a moral failing.',
          'You identified the exile pain the firefighter is trying to extinguish.',
          'You offered compassion rather than strategies for stopping.',
          'Your tone was nonjudgmental.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Can you identify a firefighter in your system? What does it do? What pain might it be responding to? No judgment -- just noticing."
          lessonId="trauma.parts-mapping.firefighters"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 5 of 6 &middot; Parts Mapping</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Mapping practice</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

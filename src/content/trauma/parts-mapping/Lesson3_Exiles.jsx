import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 3 -- Exiles
 * The wounded parts that carry pain and get pushed out of awareness.
 * Extra-gentle tone.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson3_Exiles({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Exiles</h1>
        <p className="font-ui text-ink-secondary text-lg">The parts that carry the weight of what happened.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          This lesson touches on vulnerable material. You can stop anytime. Go gently.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In IFS, exiles are the parts that carry the most pain. They are often young parts --
          frozen at the age when the trauma occurred -- who hold the feelings, beliefs, and
          memories that the system could not process at the time. They carry burdens like shame
          ("I am worthless"), terror ("The world is not safe"), and grief ("No one will ever
          love me"). Because these feelings are so overwhelming, the system pushes them into
          exile -- out of conscious awareness.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Exiles are not dangerous. They are wounded. They are the parts that need the most
          compassion, and they are the parts that other parts work hardest to keep hidden.
          This is not because the exile is bad. It is because the protective system is afraid
          that if the exile's pain surfaces, it will be too much. The protectors are doing
          their job. The exile is waiting to be heard.
        </p>
      </section>

      <VisualStepExplainer
        title="Understanding exiles"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative">
                  <div className="flex gap-3">
                    {['Manager', 'Critic', 'Pleaser'].map((p, i) => (
                      <motion.div
                        key={i}
                        className="w-14 h-14 rounded-full border bg-white flex items-center justify-center border-line-soft"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <span className="text-[8px] font-ui text-ink-secondary">{p}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="mt-4 mx-auto w-12 h-12 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER, borderStyle: 'dashed' }}
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-[8px] font-ui" style={{ color: AMBER }}>Exile</span>
                  </motion.div>
                </div>
                <p className="text-[10px] text-ink-tertiary text-center max-w-xs">
                  Protectors form a barrier between the exile and everyday awareness. They are not
                  being cruel -- they are preventing overwhelm.
                </p>
              </div>
            ),
            caption:
              'Exiles are held behind layers of protection. The managers, critics, and pleasers are all working to keep the exile\'s pain from flooding the system.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Shame: "I am fundamentally broken"',
                    'Terror: "I am not safe anywhere"',
                    'Abandonment: "I will always be alone"',
                    'Worthlessness: "I do not matter"',
                    'Grief: "Something precious was taken"',
                  ].map((burden, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="text-xs font-ui text-ink-secondary">{burden}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] text-ink-tertiary text-center max-w-xs mt-2">
                  These are burdens, not truths. They were taken on in moments of overwhelm. They
                  can eventually be released -- but only when the exile feels safe enough.
                </p>
              </div>
            ),
            caption:
              'Exiles carry burdens -- beliefs and feelings absorbed during overwhelming experiences. In IFS, these burdens can be "unburdened" in the presence of compassionate Self energy. This is work best done with a trained therapist.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          An important note: working directly with exiles is deep, powerful work that is best done
          with a trained IFS therapist. This app introduces the concept so you can understand your
          internal landscape, but it is not a substitute for therapeutic support. If you feel an
          exile surfacing as you read this, that is a sign that a part of you is ready to be
          heard -- and that readiness deserves the safety of a therapeutic relationship.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          What you can do on your own is notice when an exile might be present. A sudden wave of
          shame that feels disproportionate to the situation. A surge of grief that seems to come
          from nowhere. A regression to feeling very young. These are not signs of failure. They
          are signals from an exile who is asking for attention. Noticing -- without rushing to
          fix -- is a form of Self energy.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Exiles in IFS are:',
            options: [
              { id: 'bad', label: 'Bad parts that need to be removed', correct: false },
              { id: 'wounded', label: 'Wounded parts that carry pain from overwhelming experiences', correct: true },
              { id: 'weak', label: 'Parts that make you weak', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="parts-exiles-feynman"
        prompt="Explain exiles to someone who feels flooded by shame and thinks it proves something about who they are. Help them see it differently."
        rubric={[
          'You described shame as a burden carried by an exile, not a truth.',
          'You explained why protectors keep exiles hidden.',
          'You recommended professional support for deeper work.',
          'Your tone was deeply gentle.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="If an exile were speaking right now, what might it want you to know? You do not have to answer. Just sit with the question."
          lessonId="trauma.parts-mapping.exiles"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 3 of 6 &middot; Parts Mapping</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Managers</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

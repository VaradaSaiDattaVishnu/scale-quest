import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot, Prompt } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 4 -- Mapping Your Ladder
 * Personal autonomic mapping. Deb Dana's applied polyvagal framework.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson4_MappingYourLadder({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Mapping Your Ladder</h1>
        <p className="font-ui text-ink-secondary text-lg">Your personal map of three states.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">You can stop anytime. The stop button is always available.</p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Clinician Deb Dana, building on Porges' work, developed a practical tool for mapping your
          own autonomic states. She uses the image of a ladder: ventral vagal at the top, sympathetic
          in the middle, dorsal vagal at the bottom. Mapping your ladder means identifying what each
          state feels like in your specific body, what triggers move you between states, and what
          helps you climb back up.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is deeply personal work. Two people can both be in a sympathetic state and experience
          it completely differently. One person's sympathetic might feel like restless energy; another's
          might feel like hot rage. Your ladder is yours alone. Mapping it turns abstract theory into
          a living, useful tool.
        </p>
      </section>

      <VisualStepExplainer
        title="Building your map"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-xs space-y-2">
                  {[
                    { state: 'Ventral Vagal', prompt: 'What does safe and connected feel like in YOUR body?', color: SAGE },
                    { state: 'Sympathetic', prompt: 'What does activated feel like in YOUR body?', color: AMBER },
                    { state: 'Dorsal Vagal', prompt: 'What does shutdown feel like in YOUR body?', color: '#9CA3AF' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="rounded-calm p-3 border"
                      style={{ borderColor: item.color, backgroundColor: `${item.color}08` }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="text-xs font-ui font-medium" style={{ color: item.color }}>{item.state}</p>
                      <p className="text-[10px] text-ink-tertiary mt-1 italic">{item.prompt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'For each state, you are looking for YOUR specific body sensations, thoughts, and behaviors. Not the textbook version -- the version that lives in your body.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="max-w-xs">
                  <p className="text-xs font-ui font-medium text-ink-primary text-center mb-3">
                    Between each state, ask:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-[10px] font-ui text-ink-tertiary">
                        What pushes me DOWN the ladder? (triggers)
                      </p>
                    </div>
                    <div className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-[10px] font-ui text-ink-tertiary">
                        What helps me climb UP? (resources, glimmers, anchors)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Your triggers (what moves you down) and your resources (what moves you up) are the most practical parts of the map. Knowing them gives you choice.',
          },
        ]}
      />

      <section className="my-10">
        <Prompt
          id="pvt-ladder-ventral"
          question="In your ventral vagal state -- when you feel safe and connected -- what does your body feel like? Name two or three specific sensations."
          onAnswer={savePromptAnswer}
        />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Dana emphasizes that the map is not static. It changes as you heal, as you practice, and
          as your circumstances shift. Mapping is not something you do once and file away. It is a
          living practice of self-awareness. Each time you map, you deepen your understanding of
          your own nervous system. Over time, the map becomes intuitive -- you will recognize
          state shifts in real time, and that recognition gives you the ability to respond rather
          than react.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Your autonomic ladder is:',
            options: [
              { id: 'same', label: 'The same for everyone', correct: false },
              { id: 'personal', label: 'Deeply personal -- your states feel unique to you', correct: true },
              { id: 'fixed', label: 'Fixed once you map it', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="pvt-ladder-feynman"
        prompt="Walk someone through the process of mapping their own autonomic ladder. What would you have them do first?"
        rubric={[
          'You described all three states.',
          'You emphasized personal body sensations over textbook definitions.',
          'You included both triggers (down) and resources (up).',
          'You made the process feel gentle and exploratory.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Begin your map. For each state, write one or two body sensations that feel true for you. This is a draft -- it can change."
          lessonId="trauma.polyvagal.mapping-your-ladder"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 4 of 5 &middot; Polyvagal</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Glimmers and anchors</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

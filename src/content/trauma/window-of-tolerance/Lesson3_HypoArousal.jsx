import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 3 -- Hypoarousal
 * What happens below the window: numbness, shutdown, disconnection.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson3_HypoArousal({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Hypoarousal
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When the nervous system goes quiet -- too quiet.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Hypoarousal is the state below the window of tolerance. Where hyperarousal is too much
          energy, hypoarousal is too little. The dorsal vagal branch of the nervous system takes
          over, slowing everything down: heart rate drops, energy drains, emotions flatten, and the
          world feels distant and gray. This is the territory of numbness, dissociation, depression,
          and the feeling of being "not really here."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Hypoarousal is often less recognized than hyperarousal because it is quieter. A person in
          hyperarousal looks activated -- anxious, agitated, visibly distressed. A person in
          hypoarousal may look fine from the outside but feels profoundly disconnected on the
          inside. They may describe themselves as "lazy," "empty," or "just not feeling anything."
          These are not character descriptions. They are descriptions of a nervous system state.
        </p>
      </section>

      <VisualStepExplainer
        title="Hypoarousal in the body"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="text-center py-2 opacity-40">
                    <p className="text-[10px] font-ui text-ink-tertiary">Hyperarousal</p>
                  </div>
                  <div className="text-center py-3 border-y" style={{ borderColor: SAGE }}>
                    <p className="text-[10px] font-ui text-ink-tertiary">Window of Tolerance</p>
                  </div>
                  <motion.div
                    className="text-center py-4 rounded-b-gentle"
                    style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)' }}
                    animate={{ backgroundColor: ['rgba(156, 163, 175, 0.06)', 'rgba(156, 163, 175, 0.18)', 'rgba(156, 163, 175, 0.06)'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <p className="text-sm font-ui font-medium text-ink-tertiary">
                      Below the window
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1">Too little activation</p>
                  </motion.div>
                </div>
              </div>
            ),
            caption:
              'In hypoarousal, you have dropped below your window. The dorsal vagal system is dominant. Everything feels muted, heavy, far away.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { sensation: 'Heaviness in the body', location: 'Limbs, chest' },
                    { sensation: 'Emotional numbness', location: 'Whole body' },
                    { sensation: 'Foggy thinking', location: 'Head' },
                    { sensation: 'Flat or absent emotions', location: 'Chest, face' },
                    { sensation: 'Feeling far away', location: 'Whole body' },
                    { sensation: 'Difficulty moving or deciding', location: 'Limbs, head' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="text-xs font-ui text-ink-secondary">{item.sensation}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">{item.location}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Hypoarousal has its own body signature -- quiet but unmistakable. Heaviness, fog, flatness. These are not laziness. They are the nervous system pulling the emergency brake.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: AMBER }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-[10px] font-ui" style={{ color: AMBER }}>Hyper</span>
                    </motion.div>
                    <p className="text-[10px] text-ink-tertiary mt-1">Too much</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#9CA3AF' }}
                      animate={{ scale: [1, 0.9, 1], opacity: [0.7, 0.4, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-[10px] font-ui text-ink-tertiary">Hypo</span>
                    </motion.div>
                    <p className="text-[10px] text-ink-tertiary mt-1">Too little</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Hyperarousal and hypoarousal are two sides of the same coin. Some people oscillate between the two, going from overwhelm to numbness and back. This is common and makes sense.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on the dorsal vagal response shows that hypoarousal is not "giving up" in a
          psychological sense. It is a physiological state with measurable biological markers:
          reduced heart rate, lowered blood pressure, decreased metabolic activity. It is the
          body's deepest conservation strategy -- the same response that makes an animal go limp
          when caught by a predator. In humans, it produces the felt sense of being disconnected,
          empty, or absent. Coming back from hypoarousal requires gentle, bottom-up approaches --
          movement, sensory input, and warmth -- rather than cognitive strategies that demand a
          level of activation the system does not currently have.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Hypoarousal is characterized by:',
            options: [
              { id: 'panic', label: 'Racing heart and panic', correct: false },
              { id: 'numb', label: 'Numbness, heaviness, and disconnection', correct: true },
              { id: 'focus', label: 'Deep concentration and focus', correct: false },
            ],
          },
          {
            prompt: 'Coming back from hypoarousal is best supported by:',
            options: [
              { id: 'think', label: 'Thinking harder about the problem', correct: false },
              { id: 'gentle', label: 'Gentle movement, sensory input, and warmth', correct: true },
              { id: 'push', label: 'Pushing yourself to "snap out of it"', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="wot-hypo-feynman"
        prompt="Someone says they feel 'empty' and 'can't feel anything.' Explain what might be happening in their nervous system using what you have learned about hypoarousal."
        rubric={[
          'You named hypoarousal or dorsal vagal, not just "depression."',
          'You described it as a physiological state, not a choice.',
          'You offered a gentle, body-based approach for returning.',
          'Your tone conveyed that this state is understandable and temporary.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Have you experienced hypoarousal -- numbness, fog, feeling far away? What was that like in your body? No analysis needed. Just description."
          lessonId="trauma.window-of-tolerance.hypo-arousal"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 3 of 5 &middot; Window of Tolerance</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Widening your window</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

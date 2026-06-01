import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 2 -- Self Energy
 * The 8 C's of Self. Curiosity, calm, courage, compassion, clarity, connectedness, confidence, creativity.
 */

const SAGE = '#4F7A5A'

export default function Lesson2_SelfEnergy({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Self Energy</h1>
        <p className="font-ui text-ink-secondary text-lg">The calm center that was there all along.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">You can stop anytime. The stop button is always available.</p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In IFS, the Self is not a part. It is the core of who you are -- the awareness that can
          observe all parts without being consumed by any of them. Schwartz describes Self energy
          through eight qualities, all beginning with C: curiosity, calm, courage, compassion,
          clarity, connectedness, confidence, and creativity. When you are in Self, you can witness
          your parts with openness rather than being hijacked by them.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Self is not something you have to build or earn. It is already present. It may be
          obscured by protective parts, but it cannot be damaged or destroyed. This is one of the
          most radical claims in IFS -- and one of the most healing. You are not broken at your
          core. Your core is intact. The parts that surround it are doing their best to protect it.
        </p>
      </section>

      <VisualStepExplainer
        title="The eight qualities of Self"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-4 gap-3 max-w-sm">
                  {[
                    'Curiosity', 'Calm', 'Courage', 'Compassion',
                    'Clarity', 'Connectedness', 'Confidence', 'Creativity',
                  ].map((quality, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-1"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(79, 122, 90, 0.12)' }}
                      >
                        <span className="font-ui font-bold text-sm" style={{ color: SAGE }}>
                          {quality[0]}
                        </span>
                      </div>
                      <span className="text-[9px] font-ui text-ink-tertiary">{quality}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The eight C\'s of Self energy. When you notice curiosity toward a part instead of frustration, or calm instead of reactivity, that is Self showing up.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium text-ink-primary">From a part:</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">"I am so angry I could scream."</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium" style={{ color: SAGE }}>From Self:</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">"I notice a part of me is very angry."</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The shift from "I am angry" to "a part of me is angry" creates space. That space is Self. It does not suppress the anger. It holds it with compassion.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Accessing Self is often simpler than people expect. You do not need to meditate for an
          hour or reach a special state. Sometimes it is as simple as noticing: "Am I feeling
          curious about this part, or am I feeling frustrated with it?" If you are curious, you
          are in Self. If you are frustrated, that is another part -- and you can be curious
          about that part too. Self energy is available in any moment. It is the natural state
          that appears when parts feel safe enough to step back.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Self in IFS is:',
            options: [
              { id: 'part', label: 'The strongest part', correct: false },
              { id: 'core', label: 'The core awareness that can observe all parts', correct: true },
              { id: 'built', label: 'Something you have to build through practice', correct: false },
            ],
          },
          {
            prompt: 'The shift that indicates Self is present:',
            options: [
              { id: 'suppress', label: '"I need to stop feeling this."', correct: false },
              { id: 'curious', label: '"I notice a part of me feels this. I am curious about it."', correct: true },
              { id: 'judge', label: '"This feeling is wrong."', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="parts-self-energy-feynman"
        prompt="Explain Self energy to someone who feels defined by their worst moments. Help them see that there is something underneath."
        rubric={[
          'You described Self as already present, not something to earn.',
          'You named at least two of the 8 C\'s.',
          'You demonstrated the "I am" vs "a part of me" shift.',
          'Your tone was deeply compassionate.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Right now, notice: are you reading from Self, or from a part? If a part is active -- the skeptic, the analyzer, the wounded one -- can you feel even a flicker of curiosity toward it?"
          lessonId="trauma.parts-mapping.self-energy"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 2 of 6 &middot; Parts Mapping</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Exiles</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

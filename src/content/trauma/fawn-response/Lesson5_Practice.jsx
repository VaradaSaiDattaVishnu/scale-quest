import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot, Prompt } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 5 -- Practice: Working with the Fawn Response
 * Integration, self-compassion, and small experiments.
 */

const SAGE = '#4F7A5A'

export default function Lesson5_Practice({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Practice: Working with Fawn
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Small experiments in finding your own voice.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Working with the fawn response is not about becoming selfish, cold, or uncaring. It
          is about developing the ability to be generous from a place of choice rather than
          compulsion. The kindness that comes from a secure foundation is different from the
          kindness that comes from fear. Both look similar on the outside, but they feel very
          different on the inside. The goal is to move from automatic merging to conscious
          relating.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The following practices are invitations, not assignments. They are small experiments
          you can try in daily life to begin building a different relationship with your own
          needs and boundaries. Go at your own pace. If something feels too big, it probably is
          -- for now. Start smaller.
        </p>
      </section>

      <VisualStepExplainer
        title="Small experiments"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { practice: 'The pause', desc: 'Before saying yes, take one breath. Just one.' },
                    { practice: 'The check-in', desc: '"What do I actually want?" Ask yourself before responding.' },
                    { practice: 'The small no', desc: 'Say no to something low-stakes. A favor, a suggestion.' },
                    { practice: 'The opinion', desc: 'Share one genuine preference today, even a small one.' },
                    { practice: 'The notice', desc: 'Just notice when fawning activates. No need to change it.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.practice}</p>
                      <p className="text-[10px] text-ink-tertiary mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Start with the smallest experiment that feels possible. If "the small no" feels too big, try "the notice" -- just seeing the pattern, without changing it. That alone is progress.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Self-compassion is essential in this process. When you notice yourself fawning, the
          temptation may be to criticize yourself: "There I go again." But the fawn response
          developed to keep you alive. Criticizing it is like criticizing a lifeboat for not
          being a yacht. It did its job. Now you are learning that you have other options --
          and that learning takes time, repetition, and extraordinary patience with yourself.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          If therapy is available to you, working with the fawn response is one of the areas
          where professional support can make a significant difference. A therapist trained in
          IFS, somatic experiencing, or relational trauma can help you explore these patterns
          at a pace and depth that feels safe. This app is education, not therapy. Both matter.
        </p>
      </section>

      <Prompt
        id="fawn-practice-prompt"
        question="Of the five experiments listed above, which one feels most possible for you this week? What makes it feel approachable?"
        onAnswer={savePromptAnswer}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The goal of working with fawn patterns is:',
            options: [
              { id: 'stop', label: 'To stop being kind to others', correct: false },
              { id: 'choice', label: 'To move from automatic merging to conscious choice', correct: true },
              { id: 'alone', label: 'To become completely self-reliant', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="fawn-practice-feynman"
        prompt="Explain why self-criticism is counterproductive when working with the fawn response, and what a more helpful stance looks like."
        rubric={[
          'You explained that the fawn response was protective, not pathological.',
          'You named self-compassion as the alternative to self-criticism.',
          'You gave a concrete suggestion for how to practice.',
          'Your tone modeled the gentleness you described.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What would it be like to be as kind to yourself as you are to others? What comes up when you imagine that?"
          lessonId="trauma.fawn-response.practice"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 5 of 5 &middot; Fawn Response</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Module complete. Next module: Polyvagal Theory</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Complete Module</button>
        </div>
      </footer>
    </article>
  )
}

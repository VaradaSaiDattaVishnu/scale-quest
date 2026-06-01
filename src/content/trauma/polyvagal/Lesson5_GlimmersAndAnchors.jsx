import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot, Prompt } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 5 -- Glimmers and Anchors
 * Deb Dana's concepts. Small moments of ventral vagal activation.
 */

const SAGE = '#4F7A5A'

export default function Lesson5_GlimmersAndAnchors({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Glimmers and Anchors</h1>
        <p className="font-ui text-ink-secondary text-lg">Small moments of safety that your nervous system can build on.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">You can stop anytime. The stop button is always available.</p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Deb Dana coined the term "glimmer" to describe micro-moments of ventral vagal activation --
          tiny experiences of safety, connection, or ease that happen throughout the day. A glimmer
          might be the warmth of a cup of tea, the sound of a bird, a moment of eye contact with a
          kind stranger, or the feeling of sunlight on your skin. These moments are small, often
          overlooked, and profoundly important.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Glimmers are the opposite of triggers. Where a trigger pushes you down the ladder, a
          glimmer invites you up. An anchor is a glimmer you can return to reliably -- something
          you know will help your nervous system settle. Building a collection of glimmers and
          anchors is one of the most practical things you can do for your nervous system.
        </p>
      </section>

      <VisualStepExplainer
        title="Glimmers in daily life"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                  {[
                    'Warm drink', 'Birdsong', 'Soft blanket', 'A pet\'s breath',
                    'Sunlight', 'Quiet room', 'Kind voice', 'Deep exhale',
                    'Cool water', 'Laughter', 'Safe corner', 'Favorite song',
                  ].map((glimmer, i) => (
                    <motion.div
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-surface border border-line-soft"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="text-[10px] font-ui text-ink-secondary">{glimmer}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Glimmers are everywhere once you start looking. They do not need to be big. A glimmer is any moment where your nervous system softens, even slightly.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium" style={{ color: SAGE }}>Glimmer</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">A spontaneous micro-moment of ease</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium" style={{ color: SAGE }}>Anchor</p>
                    <p className="text-[10px] text-ink-tertiary mt-1">A reliable resource you can return to</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Glimmers are noticed. Anchors are cultivated. Both feed your nervous system with cues of safety. Over time, they expand your window of tolerance from the inside.',
          },
        ]}
      />

      <section className="my-10">
        <Prompt
          id="pvt-glimmer-prompt"
          question="Name one glimmer from today -- even the smallest moment of ease or warmth. What happened in your body during that moment?"
          onAnswer={savePromptAnswer}
        />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The practice of noticing glimmers is a form of neural rewiring. The brain has a negativity
          bias -- it is wired to pay more attention to threats than to safety cues. After trauma,
          this bias is amplified. Deliberately noticing and savoring glimmers begins to rebalance
          the equation. You are not ignoring reality. You are expanding what your nervous system
          pays attention to. Each noticed glimmer is a small deposit of safety in a nervous system
          that has been running on a deficit.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'A "glimmer" is:',
            options: [
              { id: 'big', label: 'A major positive event', correct: false },
              { id: 'micro', label: 'A micro-moment of ventral vagal activation', correct: true },
              { id: 'thought', label: 'A positive thought or affirmation', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="pvt-glimmers-feynman"
        prompt="Explain the concept of glimmers to someone who says nothing good ever happens to them. Help them understand what to look for."
        rubric={[
          'You defined glimmers as micro-moments, not big events.',
          'You gave specific, sensory examples.',
          'You explained the neural rewiring aspect.',
          'Your tone was hopeful without being dismissive.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="List three glimmers from the past week. They can be as small as you like. A sensation, a moment, a breath."
          lessonId="trauma.polyvagal.glimmers-and-anchors"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 5 of 5 &middot; Polyvagal</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Module complete. Next module: Parts Mapping</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Complete Module</button>
        </div>
      </footer>
    </article>
  )
}

import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  NervousSystemCheckin,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 1 -- What Is Fawning?
 * Deep dive into people-pleasing as survival. NervousSystemCheckin (first lesson).
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson1_WhatIsFawning({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          What Is Fawning?
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The survival strategy that hides in plain sight.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8">
        <NervousSystemCheckin onComplete={(result) => savePromptAnswer?.('checkin', result)} />
      </section>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Fawning is the fourth survival response in Pete Walker's CPTSD framework, and it is
          the one most often mistaken for personality. Where fight takes control, flight escapes,
          and freeze shuts down, fawn merges. The fawning person dissolves their own boundaries,
          needs, and identity to become whatever the other person requires. It is not generosity.
          It is not empathy. It is a survival strategy in which the self disappears in order to
          keep the relationship -- and therefore safety -- intact.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Walker was the first to formally name this response, observing that many of his clients
          had developed an automatic, compulsive pattern of people-pleasing that went far beyond
          social niceness. They could not say no. They could not identify their own feelings in
          the presence of another person's distress. They had become so attuned to others' needs
          that they had lost contact with their own. This was not a choice. It was an adaptation
          forged in an environment where having your own needs was dangerous.
        </p>
      </section>

      <VisualStepExplainer
        title="Fawning up close"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative">
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-xs font-ui" style={{ color: AMBER }}>Other</span>
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white"
                    style={{ borderColor: SAGE }}
                    animate={{ scale: [1, 0.7, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-[8px] font-ui" style={{ color: SAGE }}>Self</span>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary mt-2">
                  The other person expands. The self contracts.
                </p>
              </div>
            ),
            caption:
              'In fawning, attention flows entirely toward the other person. Their needs, their moods, their comfort. Your own self shrinks to make room. This is the core pattern.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Saying yes before you have time to think',
                    'Apologizing when nothing is your fault',
                    'Monitoring others\' moods constantly',
                    'Feeling guilty for having needs',
                    'Not knowing what you actually want',
                    'Becoming whoever the other person needs',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SAGE }} />
                      <p className="text-xs font-ui text-ink-secondary">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'If you recognize these patterns, please know: they are not signs of weakness. They are signs of a brilliant child who found the only way to stay safe that was available.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm">
                  {[
                    { label: 'Fight', desc: 'Confronts' },
                    { label: 'Flight', desc: 'Escapes' },
                    { label: 'Freeze', desc: 'Shuts down' },
                  ].map((item, i) => (
                    <div key={i} className="bg-surface rounded-calm p-2 border border-line-soft text-center opacity-60">
                      <p className="text-[10px] font-ui font-medium text-ink-primary">{item.label}</p>
                      <p className="text-[9px] text-ink-tertiary">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-surface rounded-calm p-3 border-2 text-center max-w-[140px]" style={{ borderColor: SAGE }}>
                  <p className="text-xs font-ui font-medium text-ink-primary">Fawn</p>
                  <p className="text-[10px] text-ink-tertiary">Merges</p>
                </div>
                <p className="text-[10px] text-ink-tertiary">
                  When fighting, fleeing, and freezing are all too dangerous, merging with the
                  threat becomes the last available option.
                </p>
              </div>
            ),
            caption:
              'Fawning is what happens when all other survival responses are blocked. The child cannot fight back, cannot escape, and cannot afford to shut down. So they become exactly what is needed.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Attachment research illuminates why fawning is so difficult to recognize from the inside.
          When people-pleasing begins in infancy -- before language, before conscious memory --
          it becomes part of how the child experiences reality. It does not feel like a strategy.
          It feels like who you are. "I am someone who takes care of others." "I am someone who
          puts others first." These feel like identity statements, not survival patterns. Recognizing
          them as adaptations rather than fixed truths is often the first and most disorienting step
          in the healing process. It can feel like losing yourself, when in fact it is finding
          yourself for the first time.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Fawning is best understood as:',
            options: [
              { id: 'nice', label: 'Being a naturally nice person', correct: false },
              { id: 'survival', label: 'A survival strategy of merging with others\' needs', correct: true },
              { id: 'weak', label: 'A sign of weakness or codependency', correct: false },
            ],
          },
          {
            prompt: 'Why is fawning hard to recognize from the inside?',
            options: [
              { id: 'obvious', label: 'It is not -- most people notice it easily', correct: false },
              { id: 'identity', label: 'It began so early it feels like identity, not strategy', correct: true },
              { id: 'rare', label: 'It is extremely rare', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="fawn-what-is-feynman"
        prompt="Explain fawning to someone who has never heard the term. Help them understand why it is a survival response and not a personality trait."
        rubric={[
          'You described fawning as merging with others\' needs to stay safe.',
          'You named the loss of self as the central cost.',
          'You explained why it is hard to see from the inside.',
          'Your tone conveyed deep compassion.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Is there a relationship in your life where you notice yourself automatically adjusting to the other person? What does that look like? No judgment -- just curiosity."
          lessonId="trauma.fawn-response.what-is-fawning"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 1 of 5 &middot; Fawn Response</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Where fawning comes from</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 2 -- Origins of the Fawn Response
 * Attachment theory, childhood environment, and how fawning develops.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson2_Origins({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Where Fawning Comes From
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The environment that made merging necessary.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The fawn response does not develop in a vacuum. It develops in a specific kind of
          relational environment: one where the child's caregiver is both the source of love and
          the source of danger. When the person you depend on for survival is also the person
          who hurts you, the nervous system faces an impossible dilemma. You cannot fight someone
          you need. You cannot flee from your only home. You cannot afford to shut down when your
          survival depends on being responsive. The only option left is to merge -- to become so
          attuned to the dangerous person's needs that you can prevent the danger before it arrives.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Attachment researchers describe this as disorganized attachment -- a pattern in which the
          child simultaneously seeks proximity to and avoids the caregiver. The child cannot
          organize a coherent strategy because approach and avoidance are both activated at once.
          Fawning resolves this paradox by eliminating the self as a separate entity. If there is
          no "you" to have needs, there is no conflict. The merging is the solution.
        </p>
      </section>

      <VisualStepExplainer
        title="How fawning develops"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center" style={{ borderColor: AMBER }}>
                      <span className="text-[10px] font-ui" style={{ color: AMBER }}>Caregiver</span>
                    </div>
                    <p className="text-[9px] text-ink-tertiary mt-1">Source of love</p>
                    <p className="text-[9px] text-ink-tertiary">AND danger</p>
                  </div>
                  <motion.div
                    animate={{ x: [0, 4, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                      <path d="M5 10H35" stroke="#9CA3AF" strokeWidth="1.5" />
                      <path d="M35 10L28 4" stroke="#9CA3AF" strokeWidth="1.5" />
                      <path d="M5 10L12 4" stroke="#9CA3AF" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                      <span className="text-[9px] font-ui" style={{ color: SAGE }}>Child</span>
                    </div>
                    <p className="text-[9px] text-ink-tertiary mt-1">Approach AND</p>
                    <p className="text-[9px] text-ink-tertiary">avoid at once</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The impossible bind: the child needs the caregiver for survival but the caregiver is also the threat. This double bind is the cradle of the fawn response.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Unpredictable or volatile caregiver moods',
                    'Punishment for having needs or opinions',
                    'Being parentified -- caring for the caregiver',
                    'Approval only when serving others',
                    'Emotional neglect masked by material provision',
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
              </div>
            ),
            caption:
              'These environments teach a consistent lesson: your worth is measured by what you provide. Your feelings are dangerous. Your needs are a burden. The child listens -- and adapts.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on parentification -- when a child is pressed into the role of emotional
          caretaker for a parent -- shows lasting effects on the developing nervous system and
          sense of self. These children learn, implicitly, that their role is to serve. They
          become exquisitely skilled at reading emotional cues and responding to others' needs,
          often at the cost of never learning what their own needs are. This skill, forged in
          survival, can later be mistaken for emotional intelligence, empathy, or natural warmth.
          It can be all of those things. But when it is compulsive -- when you cannot turn it
          off -- it is also the fawn response at work.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The fawn response typically develops when:',
            options: [
              { id: 'stranger', label: 'A stranger is threatening', correct: false },
              { id: 'caregiver', label: 'The caregiver is both source of love and source of danger', correct: true },
              { id: 'school', label: 'A child has trouble at school', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="fawn-origins-feynman"
        prompt="Explain why a child with an unpredictable parent might develop people-pleasing as their primary way of being in the world."
        rubric={[
          'You described the impossible bind of needing and fearing the same person.',
          'You explained how merging resolves the bind.',
          'You framed the adaptation as intelligent, not pathological.',
          'Your tone was compassionate toward the child.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="If anything in this lesson resonated, you might sit with it for a moment. What did the child in your story need? What did they learn instead?"
          lessonId="trauma.fawn-response.origins"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 2 of 5 &middot; Fawn Response</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Recognizing fawn patterns</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

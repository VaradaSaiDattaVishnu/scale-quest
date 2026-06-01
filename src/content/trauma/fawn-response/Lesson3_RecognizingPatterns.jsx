import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot, BranchScenario } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 3 -- Recognizing Fawn Patterns
 * Real-life scenarios. BranchScenario for pattern recognition.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson3_RecognizingPatterns({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Recognizing Fawn Patterns
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Seeing the pattern is the first step toward choice.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          One of the most disorienting things about the fawn response is how invisible it is to
          the person doing it. Because fawning began before conscious memory, it does not feel
          like a behavior you are choosing. It feels like reality -- "this is just who I am."
          Recognizing fawn patterns is not about self-criticism. It is about developing the ability
          to see, with curiosity rather than judgment, the moments when your nervous system is
          making choices that your conscious mind has not agreed to.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The following scenarios are not tests. They are mirrors. As you read them, notice what
          happens in your body. Does anything tighten? Does anything feel familiar? That somatic
          response is information. It is your body telling you something it has known for a long
          time.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="fawn-pattern-recognition"
          scenario="A friend asks you to help them move this weekend. You already have plans you have been looking forward to. What happens inside you?"
          branches={[
            {
              id: 'yes-auto',
              label: 'I say yes immediately, before I even think about my plans',
              feedback: 'This automatic yes -- before consulting your own needs -- is one of the clearest signs of fawning. The agreement happens faster than thought. Your nervous system is managing the relationship before your conscious mind gets involved.',
            },
            {
              id: 'guilt',
              label: 'I want to say no, but feel a wave of guilt or anxiety at the thought',
              feedback: 'That guilt is the fawn response at work. It is your nervous system sending an alarm: "Saying no is dangerous." The guilt is not evidence that you are being selfish. It is evidence that your system learned saying no had consequences.',
            },
            {
              id: 'negotiate',
              label: 'I check with my own plans first and suggest an alternative',
              feedback: 'This is the response that becomes available as the fawn pattern softens. Checking in with yourself first -- before responding to the other person -- is a sign that your own needs are visible to you.',
            },
          ]}
          onAnswer={savePromptAnswer}
        />
      </section>

      <VisualStepExplainer
        title="Common fawn patterns"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  {[
                    { pattern: 'Over-explaining', desc: 'Giving excessive reasons when saying no' },
                    { pattern: 'Emotional scanning', desc: 'Reading the room before deciding how to be' },
                    { pattern: 'Self-abandonment', desc: 'Dropping your plans for someone else\'s' },
                    { pattern: 'Preemptive care', desc: 'Solving problems no one asked you to solve' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.pattern}</p>
                      <p className="text-[10px] text-ink-tertiary mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'These patterns are not character flaws. They are skills your nervous system developed to manage dangerous relationships. The goal is not to eliminate them, but to have choice about when to use them.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The body often recognizes fawning before the mind does. Common somatic signals include:
          a tightening in the chest when you are about to disagree, a collapse in the shoulders
          when someone expresses displeasure, or a rush of energy toward "fixing" before you have
          even processed what happened. These body signals are your earliest warning system. They
          are telling you: "The fawn response just activated." With practice, you can notice this
          activation and pause -- even for a breath -- before responding automatically.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The first step in working with fawn patterns is:',
            options: [
              { id: 'stop', label: 'Immediately stopping all people-pleasing', correct: false },
              { id: 'see', label: 'Learning to see the pattern with curiosity', correct: true },
              { id: 'blame', label: 'Blaming the people who caused it', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="fawn-patterns-feynman"
        prompt="Describe one fawn pattern in a way that someone experiencing it could recognize. Be specific and kind."
        rubric={[
          'You described a concrete, recognizable pattern.',
          'You named the body sensation that accompanies it.',
          'You framed it as a survival skill, not a flaw.',
          'Someone reading it would feel seen, not criticized.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Of the patterns discussed, which feels most familiar? What does your body do when that pattern activates? Take your time."
          lessonId="trauma.fawn-response.recognizing-patterns"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 3 of 5 &middot; Fawn Response</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Introduction to boundaries</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Micro-expression Practice
 * Responsible practice with animated SVG faces. Emphasis on
 * humility, context, and avoiding over-interpretation.
 */

export default function Lesson4_Practice({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Responsible Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          See accurately. Interpret humbly. Act ethically.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The goal of micro-expression training is not to become a lie detector. It is to
          become a more attentive observer of emotional signals -- while maintaining the
          humility to recognize how much you cannot know from a facial movement alone.
          Ekman's own training program emphasizes that the skill is recognizing the expression,
          not interpreting its meaning in context.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The three-part protocol for responsible micro-expression reading: (1) See -- notice
          the expression without immediately interpreting it. (2) Contextualize -- consider
          what else was happening at that moment. (3) Ask, do not assume -- if appropriate,
          check your observation with the person rather than treating it as confirmed
          intelligence.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Protocol ---- */}
      <VisualStepExplainer
        title="See, Contextualize, Ask"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4">
                  {[
                    { step: '1', label: 'See', desc: 'Notice the expression', color: '#4F7A5A' },
                    { step: '2', label: 'Contextualize', desc: 'Consider what else is happening', color: '#5B6F8C' },
                    { step: '3', label: 'Ask', desc: 'Check, do not assume', color: '#B89466' },
                  ].map((item, i) => (
                    <div key={item.step} className="flex items-center">
                      <motion.div
                        className="w-20 h-20 rounded-full flex flex-col items-center justify-center"
                        style={{ border: `2px solid ${item.color}`, backgroundColor: `${item.color}10` }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.5 }}
                      >
                        <span className="font-ui text-lg font-bold" style={{ color: item.color }}>{item.step}</span>
                        <span className="text-[8px] font-ui" style={{ color: item.color }}>{item.label}</span>
                      </motion.div>
                      {i < 2 && (
                        <svg width="24" height="10" viewBox="0 0 24 10" className="mx-1">
                          <path d="M0 5H20M20 5L16 1M20 5L16 9" stroke="#5B6F8C" strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The responsible reading protocol: See the expression. Contextualize what was happening. Ask rather than assume. This sequence protects against the Othello Error and confirmation bias.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-md w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">
                    Practice Observations (not interpretations)
                  </p>
                  <div className="space-y-3">
                    {[
                      { obs: '"I noticed a brief tension in your jaw when I mentioned the deadline."', quality: 'Good', color: '#4F7A5A' },
                      { obs: '"Your face showed you are angry about the deadline."', quality: 'Over-interpretation', color: '#B89466' },
                      { obs: '"I saw your brows pull together for a moment."', quality: 'Good', color: '#4F7A5A' },
                      { obs: '"You clearly do not agree with this plan."', quality: 'Over-interpretation', color: '#B89466' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-[10px] font-ui font-semibold w-28 flex-shrink-0" style={{ color: item.color }}>
                          {item.quality}
                        </span>
                        <p className="text-[11px] font-reading text-ink-secondary">{item.obs}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Good observations describe what you saw. Over-interpretations leap to meaning. "I noticed your brows pull together" is observation. "You clearly disagree" is interpretation disguised as perception.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="micro-practice-scenario"
          scenario="In a job interview, you notice the interviewer's lip corner briefly pulls to one side (a possible contempt micro-expression) when you mention your previous employer."
          branches={[
            {
              label: 'Conclude the interviewer has a negative opinion of your previous employer and avoid mentioning it again',
              outcome: 'This is over-interpretation. The expression could mean many things: they know someone there, they had their own experience, they were reacting to something internal. Changing your behavior based on a single micro-expression is building on sand.',
              ethicalScore: 'low',
            },
            {
              label: 'Note it mentally but continue naturally, watching for patterns',
              outcome: 'This is the responsible approach. You noticed something. You filed it. You watch for patterns rather than acting on a single data point. This is how skilled readers actually work.',
              ethicalScore: 'high',
            },
            {
              label: 'Ask directly: "I noticed a reaction when I mentioned [company] -- do you have a connection there?"',
              outcome: 'This is transparent but context-dependent. In a job interview, this level of directness might feel confrontational. In a closer relationship, it would be appropriate. Context determines whether asking is helpful or intrusive.',
              ethicalScore: 'medium',
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The goal of micro-expression training in this course is to:',
            options: [
              { id: 'lie', label: 'Detect lies reliably', correct: false },
              { id: 'observe', label: 'Become a more attentive observer while maintaining humility', correct: true },
              { id: 'power', label: 'Gain an advantage in negotiations', correct: false },
            ],
          },
          {
            prompt: 'Which is an observation rather than an interpretation?',
            options: [
              { id: 'angry', label: '"You are angry about this"', correct: false },
              { id: 'brows', label: '"Your brows pulled together for a moment"', correct: true },
              { id: 'disagree', label: '"You clearly disagree with me"', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="micro-practice-feynman"
        prompt="Teach someone the 'See, Contextualize, Ask' protocol. Walk them through an example where following this protocol would prevent a harmful misinterpretation."
        rubric={[
          'You explained all three steps clearly.',
          'You gave a concrete scenario where skipping a step leads to error.',
          'You emphasized humility as a core part of the practice.',
          'You connected the protocol to the Othello Error from the previous lesson.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="How has learning about the limits of micro-expression reading changed your view? Have you ever jumped to a conclusion based on someone's facial expression? What might have been different if you had followed the See-Contextualize-Ask protocol?"
          lessonId="reading-people.micro-expressions.practice"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Micro-expressions
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Constructed Emotion
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Continue
          </button>
        </div>
      </footer>
    </article>
  )
}

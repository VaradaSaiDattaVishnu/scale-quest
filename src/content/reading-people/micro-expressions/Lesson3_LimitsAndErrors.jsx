import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Limits and Errors
 * CRITICAL: base rate neglect, Othello error, confirmation bias.
 * The most important lesson in the micro-expressions module.
 */

export default function Lesson3_LimitsAndErrors({
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
          Limits and Errors
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          What micro-expression reading cannot do -- and why it matters more than what it can.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This is the most important lesson in this module. Micro-expression reading has been
          popularized by television (Lie to Me), airport security programs (TSA's SPOT), and
          pop psychology books. The evidence for its real-world accuracy is far more modest
          than these portrayals suggest. A meta-analysis by Bond and DePaulo (2006) found
          that people's ability to detect deception from nonverbal cues is only slightly
          better than chance -- approximately 54%, compared to 50% for random guessing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The Othello Error, named by Ekman himself, occurs when you correctly identify an
          emotion but misattribute its cause. In Shakespeare's play, Othello reads
          Desdemona's fear accurately -- she is afraid. But he assumes her fear proves guilt,
          when in fact she is afraid of being falsely accused. The expression was real. The
          interpretation was catastrophically wrong.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Base rate neglect compounds this error. If lying is rare in a given context (say, a
          friend telling you about their day), then even a highly accurate micro-expression
          test will produce more false positives than true positives. The math is unforgiving:
          a 90% accurate test applied where lying occurs 5% of the time will falsely accuse
          an innocent person two-thirds of the time it flags someone.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Three critical errors"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-center mb-4" style={{ color: '#B89466' }}>
                    The Othello Error
                  </p>
                  <div className="space-y-3">
                    <div className="p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(79,122,90,0.06)' }}>
                      <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>You see: Fear</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(184,148,102,0.06)' }}>
                        <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>You assume: Guilt</p>
                      </div>
                      <div className="p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(91,111,140,0.06)' }}>
                        <p className="text-[10px] font-ui" style={{ color: '#5B6F8C' }}>Reality: Fear of false accusation</p>
                      </div>
                    </div>
                    <p className="text-[9px] font-ui text-ink-tertiary text-center">
                      The expression is real. The interpretation is wrong.
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The Othello Error: correctly reading an emotion but wrong about why it is there. An innocent person accused of lying will show the same fear signals as a guilty one. The expression cannot tell you the cause.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-center mb-4" style={{ color: '#B89466' }}>
                    Base Rate Neglect
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-ui text-ink-tertiary w-24">Test accuracy:</span>
                      <div className="flex-1 h-3 bg-line-soft rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '90%', backgroundColor: '#4F7A5A' }} />
                      </div>
                      <span className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>90%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-ui text-ink-tertiary w-24">Lying base rate:</span>
                      <div className="flex-1 h-3 bg-line-soft rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: '5%', backgroundColor: '#B89466' }} />
                      </div>
                      <span className="text-[10px] font-ui" style={{ color: '#B89466' }}>5%</span>
                    </div>
                    <div className="mt-3 p-2 rounded-calm text-center" style={{ backgroundColor: 'rgba(184,148,102,0.08)', border: '1px solid rgba(184,148,102,0.2)' }}>
                      <p className="text-xs font-ui font-semibold" style={{ color: '#B89466' }}>
                        Result: 2/3 of flagged people are innocent
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Even a 90% accurate test fails when the base rate is low. If only 5% of people in a context are lying, most "hits" will be false positives. This is not intuitive, which is why it traps even experts.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-center mb-3" style={{ color: '#B89466' }}>
                    Confirmation Bias Loop
                  </p>
                  <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="mx-auto">
                    <motion.circle
                      cx="100" cy="70" r="50"
                      stroke="#B89466"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                      fill="none"
                      animate={{ strokeDashoffset: [0, -20] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <text x="100" y="35" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">Suspicion</text>
                    <text x="155" y="75" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">Selective</text>
                    <text x="155" y="85" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">attention</text>
                    <text x="100" y="115" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">"Confirmation"</text>
                    <text x="45" y="75" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">Deeper</text>
                    <text x="45" y="85" textAnchor="middle" className="text-[9px] font-ui" fill="#B89466">suspicion</text>
                  </svg>
                </div>
              </div>
            ),
            caption:
              'Once you suspect someone, you selectively notice signals that confirm your suspicion and ignore signals that contradict it. Each "confirmation" deepens the suspicion. This loop is self-reinforcing and self-deceiving.',
          },
        ]}
      />

      {/* ---- BRANCH SCENARIO ---- */}
      <section className="my-10">
        <BranchScenario
          id="limits-errors-scenario"
          scenario="During a conversation with your partner, you notice a flash of what looks like contempt when you mention a mutual friend. Your partner says everything is fine."
          branches={[
            {
              label: 'Assume they secretly hate the friend and press them about it',
              outcome: 'This is the Othello Error in action. You saw an expression, interpreted its cause, and treated your interpretation as fact. The expression could mean anything -- a passing memory, physical discomfort, an unrelated thought.',
              ethicalScore: 'low',
            },
            {
              label: 'Note it privately and watch for patterns over time before concluding anything',
              outcome: 'This respects the limits of micro-expression reading. A single expression is data, not proof. Patterns over time, combined with verbal context, are more reliable than isolated observations.',
              ethicalScore: 'high',
            },
            {
              label: 'Ask gently: "I noticed something shifted when I mentioned [friend]. Is there anything on your mind?"',
              outcome: 'This is transparent and respectful. You share what you observed without assuming you know what it means. You give them the choice to explain or not. This is ethical reading in practice.',
              ethicalScore: 'high',
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Bond and DePaulo (2006) found that deception detection from nonverbal cues is:',
            options: [
              { id: 'high', label: 'Highly accurate (85%+)', correct: false },
              { id: 'slight', label: 'Only slightly better than chance (~54%)', correct: true },
              { id: 'perfect', label: 'Nearly perfect for trained observers', correct: false },
            ],
          },
          {
            prompt: 'What is the Othello Error?',
            options: [
              { id: 'miss', label: 'Failing to see a micro-expression', correct: false },
              { id: 'cause', label: 'Correctly reading an emotion but wrong about its cause', correct: true },
              { id: 'fake', label: 'Being fooled by a fake expression', correct: false },
            ],
          },
          {
            prompt: 'Why does base rate neglect matter for reading people?',
            options: [
              { id: 'false', label: 'Even accurate detection produces mostly false positives when the target behavior is rare', correct: true },
              { id: 'math', label: 'It only matters in statistics, not real life', correct: false },
              { id: 'train', label: 'It can be overcome with training', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="limits-errors-feynman"
        prompt="Explain the Othello Error, base rate neglect, and confirmation bias to someone who has just watched Lie to Me and thinks they can detect lies by reading faces. Why should they be skeptical of their new skill?"
        rubric={[
          'You explained each error clearly and concretely.',
          'You used the base rate math to show why false positives dominate.',
          'You connected confirmation bias to the self-reinforcing nature of suspicion.',
          'You did not dismiss micro-expression reading entirely -- you contextualized its limits.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Micro-expressions
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Practice
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

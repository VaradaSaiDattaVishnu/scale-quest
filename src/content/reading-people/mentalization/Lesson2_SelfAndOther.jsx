import { motion } from 'framer-motion'
import { FeynmanCheck, Prompt, ReflectionJournal } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 2 -- Self and Other
 * Mentalization operates in two directions: understanding your
 * own mental states (self) and inferring others' (other).
 */

export default function Lesson2_SelfAndOther({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Self and Other</h1>
        <p className="font-ui text-ink-secondary text-lg">You cannot read others until you can read yourself.</p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Fonagy distinguishes between self-mentalization (understanding your own mental states)
          and other-mentalization (inferring the mental states of others). Both are necessary,
          and they develop together. If you cannot identify what you are feeling, you will
          project it onto others. If you cannot imagine what others might be feeling, you will
          default to assuming they feel what you would feel in their situation.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Theory of mind research (Premack & Woodruff, 1978) showed that the ability to
          attribute mental states to others is a developmental milestone -- children typically
          pass "false belief" tasks around age 4-5. But having a theory of mind is not the
          same as using it well. Adults regularly fail to mentalize accurately, especially
          under stress or when their own emotional state is intense.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The practical implication: before reading anyone else, check your own state. What
          are you feeling right now? What do you want from this interaction? What assumptions
          are you carrying in? Self-mentalization is the prerequisite for accurate
          other-mentalization.
        </p>
      </section>

      <VisualStepExplainer
        title="The two directions of mentalization"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="260" height="140" viewBox="0 0 260 140" fill="none" className="mx-auto">
                  <circle cx="70" cy="70" r="35" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.06)" />
                  <text x="70" y="67" textAnchor="middle" className="text-[10px] font-ui" fill="#4F7A5A">Self</text>
                  <text x="70" y="79" textAnchor="middle" className="text-[8px] font-ui" fill="#4F7A5A">"What am I feeling?"</text>
                  <circle cx="190" cy="70" r="35" stroke="#5B6F8C" strokeWidth="2" fill="rgba(91,111,140,0.06)" />
                  <text x="190" y="67" textAnchor="middle" className="text-[10px] font-ui" fill="#5B6F8C">Other</text>
                  <text x="190" y="79" textAnchor="middle" className="text-[8px] font-ui" fill="#5B6F8C">"What might they feel?"</text>
                  <motion.path d="M108 58H152" stroke="#B89466" strokeWidth="1.5" strokeDasharray="4 3" animate={{ strokeDashoffset: [0, -14] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                  <motion.path d="M152 82H108" stroke="#B89466" strokeWidth="1.5" strokeDasharray="4 3" animate={{ strokeDashoffset: [0, -14] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
                  <text x="130" y="52" textAnchor="middle" className="text-[8px] font-ui" fill="#B89466">informs</text>
                  <text x="130" y="98" textAnchor="middle" className="text-[8px] font-ui" fill="#B89466">enriches</text>
                </svg>
              </div>
            ),
            caption:
              'Self-mentalization and other-mentalization are interdependent. Understanding yourself informs your reading of others. Reading others enriches your self-understanding. Both develop together.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Pre-Reading Self-Check</p>
                  <div className="space-y-2">
                    {[
                      'What am I feeling right now?',
                      'What do I want from this interaction?',
                      'What assumptions am I carrying in?',
                      'Am I projecting my state onto them?',
                      'Is my mentalizing capacity impaired right now?',
                    ].map((q, i) => (
                      <motion.div
                        key={q}
                        className="flex items-center gap-2 p-2 rounded-calm"
                        style={{ backgroundColor: 'rgba(79,122,90,0.05)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.3 }}
                      >
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ border: '1.5px solid #4F7A5A' }}>
                          <span className="text-[8px] font-bold" style={{ color: '#4F7A5A' }}>{i + 1}</span>
                        </div>
                        <p className="text-[11px] font-reading text-ink-secondary">{q}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Before reading anyone, run this self-check. Five questions that protect against projection, bias, and impaired mentalization. Make this a habit, not an afterthought.',
          },
        ]}
      />

      <Prompt
        id="self-other-check"
        question="Right now, before continuing: What are you feeling? What do you want from studying this material? Are you carrying any assumptions about what you will learn? Be specific."
        onSave={savePromptAnswer}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why is self-mentalization a prerequisite for reading others?',
            options: [
              { id: 'project', label: 'Without it, you project your own feelings onto others', correct: true },
              { id: 'polite', label: 'It is a politeness convention', correct: false },
              { id: 'faster', label: 'It makes reading faster', correct: false },
            ],
          },
          {
            prompt: 'Theory of mind research shows that:',
            options: [
              { id: 'auto', label: 'Adults automatically mentalize accurately', correct: false },
              { id: 'fail', label: 'Adults regularly fail to mentalize, especially under stress', correct: true },
              { id: 'child', label: 'Only children need to develop theory of mind', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="self-other-feynman"
        prompt="Explain the pre-reading self-check to someone. Why is each of the five questions important, and what goes wrong if you skip it?"
        rubric={[
          'You walked through all five questions.',
          'You explained what each one protects against.',
          'You gave a concrete example of what happens when self-check is skipped.',
          'You connected self-mentalization to accuracy in reading others.',
        ]}
      />

      <ReflectionJournal
        prompt="Which of the five self-check questions is hardest for you to answer honestly? Why? What does this tell you about your mentalizing patterns?"
        lessonId="reading-people.mentalization.self-and-other"
        onSave={addJournalEntry}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 2 of 4 &middot; Mentalization</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Mentalization Failures</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

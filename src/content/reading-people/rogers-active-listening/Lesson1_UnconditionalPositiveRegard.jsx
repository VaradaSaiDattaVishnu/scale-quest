import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Unconditional Positive Regard
 * Carl Rogers' foundational concept: accepting someone fully
 * without conditions, as the basis for all genuine listening.
 */

export default function Lesson1_UnconditionalPositiveRegard({
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
          Unconditional Positive Regard
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The foundation of everything Carl Rogers discovered.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1951, Carl Rogers published "Client-Centered Therapy," a book that transformed
          psychotherapy and, more broadly, our understanding of what makes human connection
          work. His central finding was deceptively simple: people change and grow not when
          they are analyzed, advised, or corrected, but when they feel genuinely accepted.
          He called this unconditional positive regard -- a warm, non-judgmental stance toward
          another person that does not depend on their behavior, beliefs, or choices.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Rogers did not mean agreement. He did not mean approval. He meant something more
          radical: the willingness to receive another person as they are, without requiring
          them to be different in order to be worthy of your attention. Research since Rogers
          has consistently confirmed this finding. A meta-analysis by Elliott et al. (2011)
          across 224 studies found that the therapist's empathic stance was one of the
          strongest predictors of positive outcomes -- stronger than the specific technique
          used.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For reading people ethically, this is foundational. You cannot accurately perceive
          someone you are already judging. Judgment narrows perception -- you see what confirms
          your assessment and miss what contradicts it. Unconditional positive regard is not
          just kindness. It is a perceptual stance that makes accurate reading possible.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="How regard shapes perception"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <motion.div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(79,122,90,0.1)', border: '2px solid #4F7A5A' }}
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <span className="font-ui text-xs text-center leading-tight" style={{ color: '#4F7A5A' }}>
                        Open<br />regard
                      </span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Wide perceptual field</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(184,148,102,0.1)', border: '2px solid #B89466' }}
                    >
                      <span className="font-ui text-xs text-center leading-tight" style={{ color: '#B89466' }}>
                        Judging<br />stance
                      </span>
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Narrow perceptual field</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Unconditional positive regard opens your perceptual field. Judgment narrows it. When you are evaluating someone, you selectively attend to evidence that confirms your evaluation and filter out the rest.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">
                    Rogers' Three Conditions
                  </p>
                  <div className="space-y-3">
                    {[
                      { num: '1', label: 'Unconditional Positive Regard', desc: 'Accept without conditions' },
                      { num: '2', label: 'Empathic Understanding', desc: 'Feel with, not about' },
                      { num: '3', label: 'Congruence', desc: 'Be authentic yourself' },
                    ].map((item) => (
                      <motion.div
                        key={item.num}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Number(item.num) * 0.4 }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: 'rgba(79,122,90,0.12)', border: '1.5px solid #4F7A5A' }}
                        >
                          <span className="text-xs font-bold" style={{ color: '#4F7A5A' }}>{item.num}</span>
                        </div>
                        <div>
                          <p className="text-xs font-ui font-semibold text-ink-primary">{item.label}</p>
                          <p className="text-[10px] font-ui text-ink-tertiary">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Rogers identified three conditions for therapeutic change. All three are also conditions for accurate reading of people. Without them, you are projecting, not perceiving.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="260" height="140" viewBox="0 0 260 140" fill="none" className="mx-auto">
                  {/* Conversation diagram */}
                  <circle cx="60" cy="70" r="25" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.06)" />
                  <text x="60" y="67" textAnchor="middle" className="text-[9px] font-ui" fill="#4F7A5A">Listener</text>
                  <text x="60" y="78" textAnchor="middle" className="text-[9px] font-ui" fill="#4F7A5A">(open)</text>
                  <circle cx="200" cy="70" r="25" stroke="#5B6F8C" strokeWidth="2" fill="rgba(91,111,140,0.06)" />
                  <text x="200" y="67" textAnchor="middle" className="text-[9px] font-ui" fill="#5B6F8C">Speaker</text>
                  <text x="200" y="78" textAnchor="middle" className="text-[9px] font-ui" fill="#5B6F8C">(safe)</text>
                  {/* Bidirectional arrows */}
                  <motion.path
                    d="M88 60H172"
                    stroke="#4F7A5A"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    animate={{ strokeDashoffset: [0, -14] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.path
                    d="M172 80H88"
                    stroke="#5B6F8C"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    animate={{ strokeDashoffset: [0, -14] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <text x="130" y="55" textAnchor="middle" className="text-[8px] font-ui" fill="#4F7A5A">regard</text>
                  <text x="130" y="96" textAnchor="middle" className="text-[8px] font-ui" fill="#5B6F8C">openness</text>
                </svg>
              </div>
            ),
            caption:
              'When the listener holds unconditional positive regard, the speaker feels safe enough to reveal more of themselves. This is not manipulation -- it is the natural response to genuine acceptance.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="upr-self-check"
          question="Think of someone in your life you find difficult to accept fully. What condition are you placing on your regard for them? (e.g., 'I would accept them if they would just...')"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Unconditional positive regard means:',
            options: [
              { id: 'agree', label: 'Agreeing with everything someone says', correct: false },
              { id: 'accept', label: 'Accepting someone without requiring them to be different', correct: true },
              { id: 'ignore', label: 'Ignoring problematic behavior', correct: false },
            ],
          },
          {
            prompt: 'Why does judgment narrow perception?',
            options: [
              { id: 'confirm', label: 'You selectively attend to confirming evidence and filter out the rest', correct: true },
              { id: 'blind', label: 'Judgment makes you literally blind', correct: false },
              { id: 'tired', label: 'Judgment is tiring so you pay less attention', correct: false },
            ],
          },
          {
            prompt: 'Elliott et al. (2011) found that the strongest predictor of therapy outcomes was:',
            options: [
              { id: 'tech', label: 'The specific therapeutic technique', correct: false },
              { id: 'empathy', label: 'The therapist\'s empathic stance', correct: true },
              { id: 'duration', label: 'The length of the session', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="upr-feynman"
        prompt="Explain to someone why unconditional positive regard is not the same as approval, and why the distinction matters for reading people accurately."
        rubric={[
          'You clearly distinguished regard from approval/agreement.',
          'You explained how judgment distorts perception.',
          'You connected UPR to the accuracy of reading people.',
          'You used a concrete example to illustrate.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Where in your life do you find it hardest to hold unconditional positive regard? What conditions do you place on your acceptance of others? Be honest -- this is for you."
          lessonId="reading-people.rogers-active-listening.unconditional-positive-regard"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Rogers & Active Listening
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Reflective Listening
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

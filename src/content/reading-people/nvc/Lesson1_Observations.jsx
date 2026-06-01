import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Observations (NVC Step 1)
 * Marshall Rosenberg's Nonviolent Communication: separating
 * observation from evaluation -- the hardest step.
 */

export default function Lesson1_Observations({
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
          Observations Without Evaluation
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          NVC Step 1: Say what you see, not what you think it means.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Marshall Rosenberg developed Nonviolent Communication (NVC) in the 1960s as a
          framework for connecting with others without triggering defensiveness. The first
          step -- and the one Rosenberg considered hardest -- is learning to separate
          observation from evaluation. "When we combine observation with evaluation," he
          wrote, "others are apt to hear criticism."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          An observation is specific, factual, and time-bound: "You arrived at 9:15 when the
          meeting started at 9:00." An evaluation adds interpretation: "You are always late"
          or "You do not respect other people's time." The observation states what happened.
          The evaluation states what you think it means. Mixing them together guarantees the
          listener will hear the evaluation, become defensive, and stop listening.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on conflict resolution (Gottman, 1999) confirms this pattern: conversations
          that begin with criticism ("You always..." / "You never...") predict escalation with
          96% accuracy. Conversations that begin with specific observation predict productive
          dialogue. The words you choose in the first sentence determine the trajectory.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: O-F-N-R Flow ---- */}
      <VisualStepExplainer
        title="The NVC framework: step 1 of 4"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-2 w-full max-w-md justify-center">
                  {[
                    { letter: 'O', label: 'Observe', active: true },
                    { letter: 'F', label: 'Feel', active: false },
                    { letter: 'N', label: 'Need', active: false },
                    { letter: 'R', label: 'Request', active: false },
                  ].map((step, i) => (
                    <div key={step.letter} className="flex items-center">
                      <motion.div
                        className="w-14 h-14 rounded-full flex flex-col items-center justify-center"
                        style={{
                          border: `2px solid ${step.active ? '#4F7A5A' : '#5B6F8C40'}`,
                          backgroundColor: step.active ? 'rgba(79,122,90,0.1)' : 'transparent',
                        }}
                        animate={step.active ? { scale: [1, 1.08, 1] } : {}}
                        transition={step.active ? { duration: 2, repeat: Infinity } : {}}
                      >
                        <span className="font-ui text-lg font-bold" style={{ color: step.active ? '#4F7A5A' : '#5B6F8C40' }}>
                          {step.letter}
                        </span>
                        <span className="text-[8px] font-ui" style={{ color: step.active ? '#4F7A5A' : '#5B6F8C40' }}>
                          {step.label}
                        </span>
                      </motion.div>
                      {i < 3 && (
                        <svg width="20" height="10" viewBox="0 0 20 10" className="mx-1">
                          <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke={i === 0 ? '#4F7A5A' : '#5B6F8C30'} strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'NVC follows four steps: Observation, Feeling, Need, Request. We start with Observation -- the foundation that makes everything else work. Without clean observation, the other steps collapse.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#B89466' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>Evaluation</p>
                    <ul className="space-y-2">
                      <li className="text-[11px] font-reading text-ink-secondary">"You are lazy"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"She never listens"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"He is selfish"</li>
                    </ul>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-l-4" style={{ borderColor: '#4F7A5A' }}>
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>Observation</p>
                    <ul className="space-y-2">
                      <li className="text-[11px] font-reading text-ink-secondary">"The dishes from Tuesday are still in the sink"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"She looked at her phone three times while I spoke"</li>
                      <li className="text-[11px] font-reading text-ink-secondary">"He took the last portion without asking"</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Evaluations are generalizations about character. Observations are specific descriptions of behavior. The same situation described both ways produces radically different responses.',
          },
        ]}
      />

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <DragMatch
          id="observation-vs-evaluation"
          instruction="Classify each statement as Observation or Evaluation."
          pairs={[
            { term: '"You interrupted me three times in the last ten minutes"', match: 'Observation' },
            { term: '"You are so rude"', match: 'Evaluation' },
            { term: '"The report was submitted two days after the deadline"', match: 'Observation' },
            { term: '"You do not care about this project"', match: 'Evaluation' },
            { term: '"You raised your voice when I mentioned the budget"', match: 'Observation' },
            { term: '"You are always angry"', match: 'Evaluation' },
          ]}
        />
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="observation-practice"
          question='Convert this evaluation into a pure observation: "My roommate is inconsiderate and never cleans up after themselves." What specific, time-bound behavior did you actually see?'
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Rosenberg, why is separating observation from evaluation important?',
            options: [
              { id: 'def', label: 'Because evaluation triggers defensiveness, blocking communication', correct: true },
              { id: 'polite', label: 'Because evaluation is impolite', correct: false },
              { id: 'wrong', label: 'Because evaluations are always wrong', correct: false },
            ],
          },
          {
            prompt: 'Gottman found that conversations starting with criticism predict escalation with what accuracy?',
            options: [
              { id: '50', label: '50%', correct: false },
              { id: '96', label: '96%', correct: true },
              { id: '75', label: '75%', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="observations-feynman"
        prompt='Explain to someone why "You are lazy" and "The dishes from Tuesday are still in the sink" produce different responses, even though they are about the same situation.'
        rubric={[
          'You explained the difference between observation and evaluation.',
          'You described the defensive response triggered by evaluation.',
          'You connected this to Rosenberg\'s NVC framework.',
          'You gave a practical reason why the distinction matters.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; Nonviolent Communication
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Feelings
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

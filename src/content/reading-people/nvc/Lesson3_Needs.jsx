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
 * Lesson 3 -- Needs (NVC Step 3)
 * Every feeling connects to a universal human need.
 * Identifying needs creates connection instead of conflict.
 */

export default function Lesson3_Needs({
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
          Universal Human Needs
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          NVC Step 3: Behind every feeling is a need, met or unmet.
        </p>
      </header>

      {/* Research text */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Rosenberg's central insight was that all human behavior is an attempt to meet
          universal needs -- safety, belonging, autonomy, meaning, rest, connection, honesty,
          play, and others. When needs are met, we feel satisfied, calm, grateful. When they
          are unmet, we feel frustrated, anxious, sad. The feeling is a signal; the need is
          the message.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This reframing is powerful for reading people: when someone is angry, the question
          shifts from "What is wrong with them?" to "What need is unmet?" This is not
          excusing behavior. It is understanding its source. And understanding the source
          makes it possible to address the actual issue rather than reacting to the surface
          behavior.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Maslow's hierarchy of needs (1943) offered an early version of this idea, organizing
          needs from physiological to self-actualization. Rosenberg's contribution was more
          practical: he showed that in any given conversation, you could identify the specific
          need driving the feeling, and that naming it aloud transformed the dynamic from
          adversarial to collaborative.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="From feelings to needs"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-2 w-full max-w-md justify-center">
                  {[
                    { letter: 'O', label: 'Observe', active: false },
                    { letter: 'F', label: 'Feel', active: false },
                    { letter: 'N', label: 'Need', active: true },
                    { letter: 'R', label: 'Request', active: false },
                  ].map((step, i) => (
                    <div key={step.letter} className="flex items-center">
                      <motion.div
                        className="w-14 h-14 rounded-full flex flex-col items-center justify-center"
                        style={{
                          border: `2px solid ${step.active ? '#4F7A5A' : i < 2 ? '#4F7A5A80' : '#5B6F8C40'}`,
                          backgroundColor: step.active ? 'rgba(79,122,90,0.1)' : 'transparent',
                        }}
                        animate={step.active ? { scale: [1, 1.08, 1] } : {}}
                        transition={step.active ? { duration: 2, repeat: Infinity } : {}}
                      >
                        <span className="font-ui text-lg font-bold" style={{ color: step.active ? '#4F7A5A' : i < 2 ? '#4F7A5A80' : '#5B6F8C40' }}>
                          {step.letter}
                        </span>
                      </motion.div>
                      {i < 3 && (
                        <svg width="20" height="10" viewBox="0 0 20 10" className="mx-1">
                          <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke={i <= 2 ? '#4F7A5A' : '#5B6F8C30'} strokeWidth="1.5" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Step 3: after observing and naming your feeling, identify the universal need behind it.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">
                    Universal Human Needs
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Safety', 'Belonging', 'Autonomy',
                      'Connection', 'Meaning', 'Rest',
                      'Honesty', 'Play', 'Respect',
                      'Fairness', 'Understanding', 'Contribution',
                    ].map((need) => (
                      <motion.div
                        key={need}
                        className="text-center p-2 rounded-calm"
                        style={{ backgroundColor: 'rgba(79,122,90,0.06)', border: '1px solid rgba(79,122,90,0.15)' }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>{need}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'These needs are universal -- shared by all humans. When you identify which need is driving a feeling, you move from judgment to understanding. Conflict becomes collaboration.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    { feeling: 'Frustrated', need: 'Autonomy', example: '"I need to have some say in how I spend my time"' },
                    { feeling: 'Lonely', need: 'Connection', example: '"I need to feel that someone sees me"' },
                    { feeling: 'Anxious', need: 'Safety', example: '"I need to know things will be okay"' },
                  ].map((row) => (
                    <div key={row.feeling} className="flex items-center gap-2 bg-surface rounded-calm p-3 border border-line-soft">
                      <div className="w-16 text-center">
                        <span className="text-[10px] font-ui font-semibold" style={{ color: '#5B6F8C' }}>{row.feeling}</span>
                      </div>
                      <svg width="20" height="10" viewBox="0 0 20 10">
                        <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke="#B89466" strokeWidth="1.5" />
                      </svg>
                      <div className="w-16 text-center">
                        <span className="text-[10px] font-ui font-semibold" style={{ color: '#4F7A5A' }}>{row.need}</span>
                      </div>
                      <p className="text-[9px] font-reading text-ink-tertiary flex-1">{row.example}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Every feeling traces back to a need. Frustration often signals unmet autonomy. Loneliness signals unmet connection. Anxiety signals unmet safety. The feeling is the compass; the need is the destination.',
          },
        ]}
      />

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <DragMatch
          id="feeling-to-need"
          instruction="Match each feeling to the most likely underlying need."
          pairs={[
            { term: 'Resentful', match: 'Fairness' },
            { term: 'Exhausted', match: 'Rest' },
            { term: 'Disconnected', match: 'Belonging' },
            { term: 'Stifled', match: 'Autonomy' },
            { term: 'Confused', match: 'Understanding' },
            { term: 'Hopeless', match: 'Meaning' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In NVC, why is identifying needs important?',
            options: [
              { id: 'collab', label: 'It shifts the conversation from adversarial to collaborative', correct: true },
              { id: 'win', label: 'It helps you win the argument', correct: false },
              { id: 'diag', label: 'It lets you diagnose what is wrong with the other person', correct: false },
            ],
          },
          {
            prompt: 'According to Rosenberg, all human behavior is an attempt to:',
            options: [
              { id: 'needs', label: 'Meet universal human needs', correct: true },
              { id: 'power', label: 'Gain power over others', correct: false },
              { id: 'avoid', label: 'Avoid discomfort', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="needs-feynman"
        prompt='Explain to someone why asking "What need is unmet?" is more useful than asking "What is wrong with them?" when someone is behaving badly.'
        rubric={[
          'You explained the connection between feelings and unmet needs.',
          'You showed how the reframe changes the response from judgmental to collaborative.',
          'You gave a concrete example of tracing behavior to an unmet need.',
          'You clarified that understanding a need is not the same as excusing behavior.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 5 &middot; Nonviolent Communication
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Requests
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

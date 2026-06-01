import { motion } from 'framer-motion'
import { FeynmanCheck, Prompt } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 1 -- What Is Mentalization
 * Fonagy & Bateman's concept: the capacity to understand behavior
 * in terms of underlying mental states -- thoughts, feelings,
 * desires, intentions.
 */

export default function Lesson1_WhatIsMentalization({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">What Is Mentalization</h1>
        <p className="font-ui text-ink-secondary text-lg">Seeing behavior through the lens of mental states.</p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Mentalization is the capacity to understand your own and others' behavior in terms of
          underlying mental states -- thoughts, feelings, desires, beliefs, and intentions. The
          concept was developed by Peter Fonagy and Anthony Bateman in the context of treating
          borderline personality disorder, but its implications extend to all human interaction.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          When you mentalize, you hold in mind that other people have inner worlds as complex
          as your own -- worlds you can approximate but never fully know. This is distinct from
          simply reading body language or recognizing emotions. Mentalization asks: "What might
          this person be thinking and feeling that would make their behavior make sense from
          their perspective?"
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Fonagy's research showed that the capacity to mentalize is not fixed. It is a skill
          that develops in secure attachment relationships, can be damaged by trauma, and can be
          rebuilt through practice. It fluctuates -- stress, strong emotion, and feeling
          threatened all temporarily reduce mentalizing capacity. The moments when mentalization
          is hardest are exactly the moments when it is most needed.
        </p>
      </section>

      <VisualStepExplainer
        title="Mentalization vs observation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ border: '2px solid #5B6F8C', backgroundColor: 'rgba(91,111,140,0.08)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" stroke="#5B6F8C" strokeWidth="1.5" />
                        <circle cx="12" cy="12" r="3" fill="#5B6F8C" />
                      </svg>
                    </div>
                    <p className="text-xs font-ui font-semibold text-ink-primary">Observation</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">"They look tense"</p>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ border: '2px solid #4F7A5A', backgroundColor: 'rgba(79,122,90,0.08)' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="8" stroke="#4F7A5A" strokeWidth="1.5" />
                        <circle cx="12" cy="9" r="3" stroke="#4F7A5A" strokeWidth="1" fill="none" />
                        <path d="M7 18C7 15 9 13 12 13C15 13 17 15 17 18" stroke="#4F7A5A" strokeWidth="1" fill="none" />
                      </svg>
                    </div>
                    <p className="text-xs font-ui font-semibold text-ink-primary">Mentalization</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">"They might be worried about the review"</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Observation sees behavior. Mentalization imagines the inner world that might produce that behavior. Both are needed -- but mentalization explicitly acknowledges it is a model, not certainty.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">When Mentalization Fails</p>
                  <div className="space-y-2">
                    {[
                      { trigger: 'High stress', effect: 'Collapse into certainty ("I know what they think")' },
                      { trigger: 'Feeling threatened', effect: 'Attribute hostile intent without evidence' },
                      { trigger: 'Strong emotion', effect: 'Lose capacity to hold multiple perspectives' },
                      { trigger: 'Trauma activation', effect: 'Revert to rigid, black-and-white thinking' },
                    ].map((item) => (
                      <div key={item.trigger} className="flex items-start gap-2">
                        <span className="text-[10px] font-ui font-semibold w-24 flex-shrink-0" style={{ color: '#B89466' }}>{item.trigger}</span>
                        <p className="text-[10px] font-reading text-ink-secondary">{item.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Mentalization is not always available. Stress, threat, and strong emotion temporarily collapse it. Recognizing when your mentalizing is impaired is itself a mentalizing skill.',
          },
        ]}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Mentalization is the capacity to:',
            options: [
              { id: 'behavior', label: 'Understand behavior in terms of underlying mental states', correct: true },
              { id: 'read', label: 'Read body language accurately', correct: false },
              { id: 'predict', label: 'Predict what someone will do next', correct: false },
            ],
          },
          {
            prompt: 'When is mentalization hardest?',
            options: [
              { id: 'calm', label: 'When you are calm and rested', correct: false },
              { id: 'stress', label: 'Under stress, threat, or strong emotion', correct: true },
              { id: 'alone', label: 'When you are alone', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="mentalization-intro-feynman"
        prompt="Explain the difference between observing someone's behavior and mentalizing about it. Why is mentalization more powerful -- and more dangerous -- than observation alone?"
        rubric={[
          'You distinguished observation (what you see) from mentalization (what you imagine they think/feel).',
          'You explained that mentalization is always a model, not certainty.',
          'You described when mentalization fails.',
          'You connected the power/danger duality to ethics.',
        ]}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 1 of 4 &middot; Mentalization</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Self and Other</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

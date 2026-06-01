import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Concepts and Predictions
 * The brain as a prediction engine. Emotions as constructed
 * categories the brain uses to make sense of body sensations.
 */

export default function Lesson2_ConceptsAndPredictions({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Concepts and Predictions
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your brain does not react to the world. It predicts it.
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Barrett's predictive processing model proposes that the brain is constantly running
          simulations of what it expects to happen next -- based on past experience, current
          context, and the body's physiological state. When body sensations arise (elevated
          heart rate, tight stomach, flushed face), the brain does not simply detect what is
          happening. It predicts a category: "This is anger" or "This is excitement" or "This
          is a heart attack."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The category it selects depends on the concepts available. If you grew up in a
          culture with a rich vocabulary for sadness, you will experience and recognize more
          varieties of sadness. If your culture has no concept for a particular emotional
          state, you may experience the body sensations without categorizing them as that
          emotion. The Finnish concept of "sisu" (stoic determination), the Japanese "amae"
          (comfortable dependence on another), and the German "schadenfreude" (pleasure at
          another's misfortune) are not just words -- they are perceptual tools that shape
          what people in those cultures actually feel.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For reading people, this means that when you label someone's emotion ("She is
          angry"), you are not detecting a signal -- you are applying a concept from your
          own repertoire. Your concept of anger may not match theirs. Your prediction may
          reveal more about your past experiences than about their current state.
        </p>
      </section>

      <VisualStepExplainer
        title="The prediction loop"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="260" height="180" viewBox="0 0 260 180" fill="none" className="mx-auto">
                  {/* Brain center */}
                  <circle cx="130" cy="90" r="35" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.06)" />
                  <text x="130" y="87" textAnchor="middle" className="text-[10px] font-ui font-semibold" fill="#4F7A5A">Brain</text>
                  <text x="130" y="99" textAnchor="middle" className="text-[8px] font-ui" fill="#4F7A5A">predicts</text>
                  {/* Inputs */}
                  <rect x="10" y="20" width="70" height="24" rx="5" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.05)" />
                  <text x="45" y="36" textAnchor="middle" className="text-[8px] font-ui" fill="#5B6F8C">Past experience</text>
                  <motion.path d="M80 38L98 65" stroke="#5B6F8C" strokeWidth="1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }} />

                  <rect x="180" y="20" width="70" height="24" rx="5" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.05)" />
                  <text x="215" y="36" textAnchor="middle" className="text-[8px] font-ui" fill="#5B6F8C">Current context</text>
                  <motion.path d="M180 38L162 65" stroke="#5B6F8C" strokeWidth="1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />

                  <rect x="10" y="140" width="70" height="24" rx="5" stroke="#B89466" strokeWidth="1.5" fill="rgba(184,148,102,0.05)" />
                  <text x="45" y="156" textAnchor="middle" className="text-[8px] font-ui" fill="#B89466">Body sensations</text>
                  <motion.path d="M80 148L98 120" stroke="#B89466" strokeWidth="1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />

                  {/* Output */}
                  <rect x="180" y="140" width="70" height="24" rx="5" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.08)" />
                  <text x="215" y="156" textAnchor="middle" className="text-[9px] font-ui font-semibold" fill="#4F7A5A">Emotion</text>
                  <motion.path d="M162 120L180 148" stroke="#4F7A5A" strokeWidth="1.5" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 2.5 }} />
                </svg>
              </div>
            ),
            caption:
              'The brain combines past experience, current context, and body sensations into a prediction. That prediction IS the emotion. The same body sensations (racing heart, tight chest) can become "anxiety" in a dark alley or "excitement" on a roller coaster.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">
                    Same Sensation, Different Emotion
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 rounded-calm" style={{ backgroundColor: 'rgba(91,111,140,0.06)' }}>
                      <span className="text-xs font-ui text-ink-tertiary w-20">Racing heart</span>
                      <span className="text-[10px] font-ui" style={{ color: '#5B6F8C' }}>+</span>
                      <span className="text-xs font-ui text-ink-tertiary">Dark alley</span>
                      <span className="text-[10px] font-ui" style={{ color: '#5B6F8C' }}>=</span>
                      <span className="text-xs font-ui font-semibold" style={{ color: '#5B6F8C' }}>Fear</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-calm" style={{ backgroundColor: 'rgba(79,122,90,0.06)' }}>
                      <span className="text-xs font-ui text-ink-tertiary w-20">Racing heart</span>
                      <span className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>+</span>
                      <span className="text-xs font-ui text-ink-tertiary">First date</span>
                      <span className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>=</span>
                      <span className="text-xs font-ui font-semibold" style={{ color: '#4F7A5A' }}>Excitement</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-calm" style={{ backgroundColor: 'rgba(184,148,102,0.06)' }}>
                      <span className="text-xs font-ui text-ink-tertiary w-20">Racing heart</span>
                      <span className="text-[10px] font-ui" style={{ color: '#B89466' }}>+</span>
                      <span className="text-xs font-ui text-ink-tertiary">Exam room</span>
                      <span className="text-[10px] font-ui" style={{ color: '#B89466' }}>=</span>
                      <span className="text-xs font-ui font-semibold" style={{ color: '#B89466' }}>Anxiety</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The same body sensation becomes different emotions depending on context. This is evidence against the fingerprint model and for the construction model. Emotion is not in the body -- it is in the meaning the brain assigns.',
          },
        ]}
      />

      <Prompt
        id="concepts-own-experience"
        question="Can you think of a time the same body sensation felt like two different emotions depending on context? What changed between the situations?"
        onSave={savePromptAnswer}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Barrett, what determines which emotion you experience from the same body sensation?',
            options: [
              { id: 'context', label: 'The context and the concepts your brain has available', correct: true },
              { id: 'intensity', label: 'The intensity of the sensation', correct: false },
              { id: 'genetics', label: 'Your genetic programming', correct: false },
            ],
          },
          {
            prompt: 'Why are emotion words from other cultures (like "sisu" or "amae") significant?',
            options: [
              { id: 'tools', label: 'They are perceptual tools that shape what people actually feel', correct: true },
              { id: 'curious', label: 'They are linguistically interesting but functionally irrelevant', correct: false },
              { id: 'translate', label: 'They are just translations of universal emotions', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="concepts-predictions-feynman"
        prompt='Explain to someone how the same racing heart can become "fear," "excitement," or "anxiety." What does this tell us about the nature of emotion?'
        rubric={[
          'You explained the prediction model: brain + body sensations + context.',
          'You gave concrete examples of the same sensation becoming different emotions.',
          'You connected this to the limitation of reading people (you might apply your concept, not theirs).',
          'You explained what emotion concepts are and why they matter.',
        ]}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 2 of 4 &middot; Constructed Emotion</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Emotional Granularity</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

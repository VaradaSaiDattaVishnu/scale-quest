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
 * Lesson 1 -- Classical vs Constructed Views of Emotion
 * Lisa Feldman Barrett's theory challenges the classical view.
 * Emotions are not fingerprinted; they are constructed.
 */

export default function Lesson1_ClassicalVsConstructed({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Classical vs Constructed Emotion
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          What if emotions are not built in, but built up?
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The classical view of emotion -- inherited from Darwin and formalized by Ekman --
          holds that emotions are biologically hardwired: each has a distinct neural circuit,
          a distinct physiological fingerprint, and a distinct facial expression. Fear looks
          and feels and functions the same way in every human being.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Lisa Feldman Barrett, a neuroscientist at Northeastern University, spent decades
          testing this assumption and found it did not hold up. In her 2017 book "How Emotions
          Are Made," she presented evidence that no emotion has a consistent neural fingerprint.
          No brain region is dedicated to a single emotion. No facial configuration reliably
          maps to one emotional state. The variability is enormous -- both within individuals
          and across cultures.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Barrett's theory of constructed emotion proposes that emotions are not reactions to
          the world. They are predictions about the world -- the brain's best guess about what
          body sensations mean, constructed from past experience, current context, and cultural
          concepts. This has profound implications for reading people: if emotions are
          constructed rather than fingerprinted, then reading someone's "anger" from their face
          may be reading your own prediction, not their experience.
        </p>
      </section>

      <VisualStepExplainer
        title="Two models of emotion"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ border: '2px solid #5B6F8C', backgroundColor: 'rgba(91,111,140,0.08)' }}>
                      <span className="text-[10px] font-ui font-bold" style={{ color: '#5B6F8C' }}>C</span>
                    </div>
                    <p className="text-xs font-ui font-semibold text-ink-primary">Classical</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Emotions are hardwired</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Each has a fingerprint</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Universal expressions</p>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border border-line-soft text-center">
                    <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ border: '2px solid #4F7A5A', backgroundColor: 'rgba(79,122,90,0.08)' }}>
                      <span className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>C</span>
                    </div>
                    <p className="text-xs font-ui font-semibold text-ink-primary">Constructed</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Emotions are predictions</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Enormous variability</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Culturally shaped</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Two paradigms. The classical view says emotions are triggered and revealed. The constructed view says emotions are built from ingredients: sensations, concepts, and context. Both have evidence. A skilled reader holds both.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="mx-auto">
                  {/* Classical: Trigger -> Emotion -> Expression */}
                  <text x="40" y="20" className="text-[10px] font-ui" fill="#5B6F8C">Classical Model</text>
                  <rect x="10" y="30" width="70" height="30" rx="6" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.05)" />
                  <text x="45" y="49" textAnchor="middle" className="text-[9px] font-ui" fill="#5B6F8C">Trigger</text>
                  <path d="M82 45H100" stroke="#5B6F8C" strokeWidth="1.5" />
                  <rect x="102" y="30" width="70" height="30" rx="6" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.05)" />
                  <text x="137" y="49" textAnchor="middle" className="text-[9px] font-ui" fill="#5B6F8C">Emotion</text>
                  <path d="M174 45H192" stroke="#5B6F8C" strokeWidth="1.5" />
                  <rect x="194" y="30" width="76" height="30" rx="6" stroke="#5B6F8C" strokeWidth="1.5" fill="rgba(91,111,140,0.05)" />
                  <text x="232" y="49" textAnchor="middle" className="text-[9px] font-ui" fill="#5B6F8C">Expression</text>

                  {/* Constructed: Context + Concepts + Sensations -> Prediction */}
                  <text x="40" y="90" className="text-[10px] font-ui" fill="#4F7A5A">Constructed Model</text>
                  <rect x="10" y="100" width="55" height="25" rx="5" stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.05)" />
                  <text x="37" y="116" textAnchor="middle" className="text-[8px] font-ui" fill="#4F7A5A">Context</text>
                  <rect x="70" y="100" width="60" height="25" rx="5" stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.05)" />
                  <text x="100" y="116" textAnchor="middle" className="text-[8px] font-ui" fill="#4F7A5A">Concepts</text>
                  <rect x="135" y="100" width="65" height="25" rx="5" stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.05)" />
                  <text x="167" y="116" textAnchor="middle" className="text-[8px] font-ui" fill="#4F7A5A">Sensations</text>
                  <path d="M100 127L140 140 M130 127L140 140 M167 127L140 140" stroke="#4F7A5A" strokeWidth="1" />
                  <rect x="115" y="138" width="60" height="22" rx="5" stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.08)" />
                  <text x="145" y="153" textAnchor="middle" className="text-[9px] font-ui font-semibold" fill="#4F7A5A">Prediction</text>
                </svg>
              </div>
            ),
            caption:
              'In the classical model, a trigger causes an emotion that produces an expression. In the constructed model, the brain assembles a prediction from context, learned concepts, and body sensations. The emotion IS the prediction.',
          },
        ]}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Barrett\'s key finding is that:',
            options: [
              { id: 'finger', label: 'Each emotion has a distinct neural fingerprint', correct: false },
              { id: 'no-finger', label: 'No emotion has a consistent neural fingerprint', correct: true },
              { id: 'no-emotion', label: 'Emotions do not exist', correct: false },
            ],
          },
          {
            prompt: 'In the constructed view, emotions are:',
            options: [
              { id: 'react', label: 'Automatic reactions to events', correct: false },
              { id: 'predict', label: 'The brain\'s predictions about what sensations mean', correct: true },
              { id: 'choice', label: 'Conscious choices', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="classical-vs-constructed-feynman"
        prompt="Explain the difference between the classical and constructed views of emotion. Why does it matter for someone learning to read people?"
        rubric={[
          'You described both models accurately.',
          'You explained what "emotions are predictions" means concretely.',
          'You connected the constructed view to the risk of projection in reading people.',
          'You did not present one model as definitively right and the other wrong.',
        ]}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 1 of 4 &middot; Constructed Emotion</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Concepts and Predictions</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

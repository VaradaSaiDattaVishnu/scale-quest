import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Emotional Granularity
 * The more precisely you can name what you feel, the better
 * you can regulate it -- and the more accurately you can
 * perceive others.
 */

export default function Lesson3_EmotionalGranularity({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Emotional Granularity
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The more precisely you name it, the better you can navigate it.
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Barrett's research found that people vary enormously in how precisely they
          differentiate their emotional experiences -- a dimension she calls emotional
          granularity. Some people describe everything negative as "bad" or "stressed." Others
          distinguish between "irritated," "disappointed," "apprehensive," "melancholy," and
          "disheartened." The difference is not just vocabulary. It is perception itself.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          People with high emotional granularity show better emotion regulation (Tugade et al.,
          2004), less reactive aggression, lower rates of alcohol abuse during stressful
          periods, and more nuanced social perception. The mechanism: when you can categorize
          your experience more precisely, you can select more targeted responses. "I am upset"
          gives you nowhere to go. "I am disappointed because I expected more from myself"
          gives you a specific thing to address.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For reading people, granularity works in both directions. The more precisely you can
          name your own emotions, the more distinctions you can perceive in others. Your
          emotional vocabulary is your perceptual toolkit.
        </p>
      </section>

      <VisualStepExplainer
        title="Granularity as perception"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-surface rounded-calm p-4 border border-line-soft">
                    <p className="text-xs font-ui font-semibold mb-3" style={{ color: '#B89466' }}>Low granularity</p>
                    <div className="space-y-2">
                      {['Bad', 'Stressed', 'Fine', 'Upset', 'Good'].map((w) => (
                        <div key={w} className="h-5 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(184,148,102,0.1)' }}>
                          <span className="text-[10px] font-ui" style={{ color: '#B89466' }}>{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border border-line-soft">
                    <p className="text-xs font-ui font-semibold mb-3" style={{ color: '#4F7A5A' }}>High granularity</p>
                    <div className="space-y-1">
                      {[
                        'Disappointed', 'Apprehensive', 'Wistful',
                        'Irritated', 'Melancholy', 'Relieved',
                        'Hopeful', 'Disheartened', 'Grateful',
                        'Bewildered', 'Content',
                      ].map((w) => (
                        <div key={w} className="h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'rgba(79,122,90,0.08)' }}>
                          <span className="text-[9px] font-ui" style={{ color: '#4F7A5A' }}>{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Low granularity collapses many distinct experiences into a few broad categories. High granularity differentiates them precisely. The distinction is not cosmetic -- it changes what you can perceive and how you can respond.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-xs font-semibold text-ink-primary mb-3 text-center">
                    Benefits of High Granularity
                  </p>
                  <div className="space-y-2">
                    {[
                      { benefit: 'Better emotion regulation', evidence: 'Tugade et al., 2004' },
                      { benefit: 'Less reactive aggression', evidence: 'Pond et al., 2012' },
                      { benefit: 'Lower substance abuse under stress', evidence: 'Kashdan et al., 2010' },
                      { benefit: 'More nuanced social perception', evidence: 'Barrett et al., 2001' },
                    ].map((item) => (
                      <div key={item.benefit} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#4F7A5A' }} />
                        <span className="text-[11px] font-reading text-ink-secondary flex-1">{item.benefit}</span>
                        <span className="text-[9px] font-ui text-ink-tertiary">{item.evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption:
              'Research consistently shows that people with higher emotional granularity navigate social life more effectively. This is not about having a larger vocabulary. It is about perceiving more distinctions in experience.',
          },
        ]}
      />

      <DragMatch
        id="granularity-expansion"
        instruction='Expand each broad label into a more granular feeling. Match the vague term to its more specific version.'
        pairs={[
          { term: '"I feel bad"', match: 'I feel disappointed in myself' },
          { term: '"I feel stressed"', match: 'I feel overwhelmed by competing demands' },
          { term: '"I feel fine"', match: 'I feel quietly content but a little tired' },
          { term: '"I feel upset"', match: 'I feel hurt that my effort was not acknowledged' },
          { term: '"I feel good"', match: 'I feel grateful and surprisingly calm' },
        ]}
      />

      <InteractiveQuiz
        questions={[
          {
            prompt: 'People with high emotional granularity show:',
            options: [
              { id: 'more', label: 'More emotional suffering', correct: false },
              { id: 'better', label: 'Better emotion regulation and less reactive aggression', correct: true },
              { id: 'same', label: 'The same outcomes as everyone else', correct: false },
            ],
          },
          {
            prompt: 'Emotional granularity helps you read people because:',
            options: [
              { id: 'vocab', label: 'Your emotional vocabulary is your perceptual toolkit', correct: true },
              { id: 'impress', label: 'Using precise words impresses people', correct: false },
              { id: 'control', label: 'It gives you control over their emotions', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="granularity-feynman"
        prompt='Explain to someone why saying "I feel disappointed in myself" is more useful than "I feel bad" -- not just for communication, but for their own ability to regulate and respond.'
        rubric={[
          'You explained what emotional granularity is.',
          'You connected granularity to regulation (specific label = specific response).',
          'You mentioned at least one research finding.',
          'You showed how granularity improves reading others, not just yourself.',
        ]}
      />

      <ReflectionJournal
        prompt="Take a moment to check in. How do you feel right now? Try to use at least three specific emotion words rather than a single broad label. Notice whether naming precisely changes how you experience the feeling."
        lessonId="reading-people.constructed-emotion.emotional-granularity"
        onSave={addJournalEntry}
      />

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 3 of 4 &middot; Constructed Emotion</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Implications for Reading People</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

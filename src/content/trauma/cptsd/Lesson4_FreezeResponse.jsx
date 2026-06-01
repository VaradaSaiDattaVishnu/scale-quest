import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 4 -- The Freeze Response
 * Shutdown, dissociation, immobility. The body's last resort.
 * Tone: especially gentle. Freeze can be activating to read about.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson4_FreezeResponse({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Freeze Response
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When the safest thing was to disappear.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
          If this topic brings up strong feelings, that is completely normal.
        </p>
      </div>

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          When neither fighting nor fleeing is possible, the nervous system has one more option:
          freeze. This is not a failure of courage. It is the body's most ancient survival strategy --
          older than mammals, shared with reptiles, and controlled by the dorsal vagal branch of the
          autonomic nervous system. The freeze response is what happens when the organism determines
          that the threat is inescapable: the body shuts down, consciousness narrows, and the world
          goes distant and muted.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Pete Walker describes the freeze type as someone who learned to survive by becoming invisible.
          If fighting would provoke more danger and fleeing was impossible, then the safest option was
          to become very small, very quiet, and very still. In childhood, this might have looked like
          hiding in a closet, going blank during conflict, or learning to make yourself unnoticeable.
          In adulthood, it can show up as chronic dissociation, difficulty making decisions, feeling
          foggy or "not really here," procrastination, or a pervasive sense of being stuck.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Freeze in the body"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
                  <ellipse cx="60" cy="25" rx="18" ry="22" stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
                  <line x1="60" y1="47" x2="60" y2="110" stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
                  <line x1="60" y1="60" x2="30" y2="90" stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
                  <line x1="60" y1="60" x2="90" y2="90" stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
                  <line x1="60" y1="110" x2="40" y2="165" stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
                  <line x1="60" y1="110" x2="80" y2="165" stroke="#9CA3AF" strokeWidth="2" opacity="0.6" />
                  {/* Dimmed, muted overlay */}
                  <motion.rect x="10" y="0" width="100" height="180" rx="8" fill="#E5E7EB"
                    animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </svg>
                <p className="text-xs font-ui text-ink-tertiary">Energy withdraws inward. The body goes quiet.</p>
              </div>
            ),
            caption:
              'In freeze, the body dims. Energy drops. Sensation muffles. This is not laziness or weakness -- it is the nervous system conserving resources when escape is not possible.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Feeling foggy, heavy, or far away',
                    'Difficulty making decisions',
                    'Going blank during conversations',
                    'Feeling "stuck" or unable to act',
                    'Numbness -- emotional or physical',
                    'Losing track of time',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SAGE }} />
                      <p className="text-xs font-ui text-ink-secondary">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'These experiences are not signs of something broken. They are your nervous system using the oldest survival tool in its repertoire. It kept you alive.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="max-w-xs text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full mx-auto border-2 flex items-center justify-center mb-3"
                    style={{ borderColor: '#9CA3AF' }}
                    animate={{ scale: [1, 0.95, 1], opacity: [0.6, 0.4, 0.6] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    <span className="text-xs font-ui text-ink-tertiary">Here but not here</span>
                  </motion.div>
                  <p className="text-xs text-ink-tertiary">
                    Dissociation is the freeze response in action. The body is present but awareness
                    pulls away -- a mercy when the present moment is unbearable.
                  </p>
                </div>
              </div>
            ),
            caption:
              'Dissociation is not a disorder on its own. It is the freeze response doing what it was designed to do: protecting you from experiences too overwhelming to process in the moment.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Stephen Porges' Polyvagal Theory (which we will explore in a later module) explains the
          biology behind freeze. The dorsal vagal complex -- the most ancient branch of the
          autonomic nervous system -- slows the heart rate, drops blood pressure, and reduces
          metabolic activity. It is the same response that makes an opossum "play dead." In humans,
          it produces numbness, dissociation, and the feeling of watching yourself from outside your
          own body.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The most important thing to understand about freeze is this: you did not choose it, and
          you are not broken because it happens. Your nervous system made a calculation -- one that
          happened faster than thought -- and chose the response most likely to keep you alive. That
          calculation was often correct. The work now is not to judge the response, but to slowly,
          gently help your nervous system learn that it has more options available.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The freeze response is controlled by:',
            options: [
              { id: 'prefrontal', label: 'The prefrontal cortex (conscious thought)', correct: false },
              { id: 'dorsal', label: 'The dorsal vagal branch of the autonomic nervous system', correct: true },
              { id: 'muscles', label: 'Voluntary muscle control', correct: false },
            ],
          },
          {
            prompt: 'Dissociation in the context of trauma is best understood as:',
            options: [
              { id: 'crazy', label: 'A sign of being disconnected from reality', correct: false },
              { id: 'protect', label: 'A protective response when the present moment is overwhelming', correct: true },
              { id: 'lazy', label: 'A form of avoidance or laziness', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="cptsd-freeze-feynman"
        prompt="Someone tells you they feel 'stuck' all the time and thinks they are just lazy. Using what you have learned, offer a different explanation. Be gentle."
        rubric={[
          'You connected "stuckness" to the freeze response, not laziness.',
          'You named it as a survival strategy, not a character flaw.',
          'You mentioned the body or nervous system, not just the mind.',
          'Your tone was kind enough that someone in freeze would feel safe reading it.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Has freeze ever shown up for you? Fogginess, numbness, difficulty moving or deciding? You do not need to explain why. Just notice what is true."
          lessonId="trauma.cptsd.freeze-response"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 5 &middot; CPTSD
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Introduction to the fawn response
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

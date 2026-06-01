import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 2 -- The Fight Response
 * Pete Walker's fight type. Survival through control and confrontation.
 * Tone: validating, never pathologizing.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson2_FightResponse({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Fight Response
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When safety meant taking control.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The fight response is the nervous system's strategy of meeting danger head-on. In
          Pete Walker's framework, people who developed a dominant fight response learned early
          that the way to survive was to take charge -- to be louder, stronger, or more
          forceful than the threat. This was not aggression for its own sake. It was a child's
          best available strategy for creating safety in an environment where no one else would.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Neurobiologically, the fight response activates the sympathetic nervous system.
          Adrenaline surges. Muscles tense. The jaw tightens. The body prepares for confrontation.
          When this response developed in childhood as a primary survival strategy, it can show
          up in adult life as a need for control, difficulty tolerating vulnerability, quick anger,
          or a pattern of dominating conversations and relationships -- not because you want to
          hurt anyone, but because your nervous system still equates losing control with danger.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Fight in the Body ---- */}
      <VisualStepExplainer
        title="Fight in the body"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="120" height="180" viewBox="0 0 120 180" fill="none">
                  {/* Simple body outline */}
                  <ellipse cx="60" cy="25" rx="18" ry="22" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="47" x2="60" y2="110" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="60" x2="30" y2="90" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="60" x2="90" y2="90" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="110" x2="40" y2="165" stroke={AMBER} strokeWidth="2" />
                  <line x1="60" y1="110" x2="80" y2="165" stroke={AMBER} strokeWidth="2" />
                  {/* Heat zones */}
                  <motion.circle cx="60" cy="22" r="14" fill={AMBER} fillOpacity="0.15"
                    animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.circle cx="60" cy="70" r="16" fill={AMBER} fillOpacity="0.15"
                    animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.circle cx="30" cy="87" r="10" fill={AMBER} fillOpacity="0.15"
                    animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <motion.circle cx="90" cy="87" r="10" fill={AMBER} fillOpacity="0.15"
                    animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </svg>
              </div>
            ),
            caption:
              'The fight response concentrates energy in the jaw, chest, shoulders, and fists. Your body prepares to push back. This is adrenaline doing exactly what it evolved to do.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Jaw clenching or grinding teeth',
                    'Tight fists, tense shoulders',
                    'Heat rising in the chest or face',
                    'Urge to raise your voice',
                    'Wanting to take over or fix things',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SAGE }} />
                      <p className="text-xs font-ui text-ink-secondary">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'These signals are not signs of something wrong. They are your body remembering a time when fighting was the safest option available.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-1">Then</p>
                    <p className="text-[10px] text-ink-tertiary">
                      "If I am in charge, I cannot be hurt."
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-1">Now</p>
                    <p className="text-[10px] text-ink-tertiary">
                      "I can notice the urge to control without acting on it immediately."
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The fight response was brilliant strategy then. Now, you have more options. Noticing the pattern is the beginning of expanding choice.',
          },
        ]}
      />

      {/* Research paragraph: Walker on fight types */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Walker describes the fight type as someone who learned that the best defense is a good
          offense. In adulthood, this can look like perfectionism directed outward -- holding others
          to impossible standards, becoming critical or dismissive when feeling threatened, or
          gravitating toward positions of power and control. The underlying engine is not cruelty.
          It is a deeply wired conviction that vulnerability equals danger.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This does not mean the fight response is always a problem. The same energy that drives
          control can also drive advocacy, protection, and fierce love. The goal is not to eliminate
          the response, but to have more awareness of when it is running and more choice about
          whether the situation actually calls for it.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The fight response in CPTSD is best understood as:',
            options: [
              { id: 'anger', label: 'An anger management problem', correct: false },
              { id: 'survival', label: 'A survival strategy that equated control with safety', correct: true },
              { id: 'choice', label: 'A deliberate choice to dominate others', correct: false },
            ],
          },
          {
            prompt: 'Where does the fight response tend to show up in the body?',
            options: [
              { id: 'stomach', label: 'Primarily in the stomach', correct: false },
              { id: 'jaw', label: 'Jaw, chest, shoulders, and fists', correct: true },
              { id: 'legs', label: 'Primarily in the legs', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="cptsd-fight-feynman"
        prompt="Explain why someone with a strong fight response is not 'just angry.' What is the deeper logic their nervous system is following?"
        rubric={[
          'You connected the fight response to a survival need for control.',
          'You named the body sensations, not just behaviors.',
          'You framed it with compassion, not judgment.',
          'You distinguished between the original context and the present.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Does the fight response feel familiar -- in yourself or in someone close to you? Notice without judgment. There is no right answer here."
          lessonId="trauma.cptsd.fight-response"
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
              Lesson 2 of 5 &middot; CPTSD
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The flight response
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

import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 5 -- Introduction to the Fawn Response
 * People-pleasing as survival. Brief intro here, full deep-dive in Module 3.
 * Tone: especially compassionate. Fawn is often accompanied by deep shame.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson5_FawnResponseIntro({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Fawn Response: An Introduction
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When safety meant making everyone else okay first.
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
          Pete Walker identified a fourth survival response that had been largely overlooked in
          trauma literature: fawn. Where fight confronts, flight escapes, and freeze shuts down,
          fawn appeases. The fawn response is the strategy of making yourself useful, agreeable,
          and non-threatening -- not because you are naturally generous, but because your nervous
          system learned that the way to avoid harm was to make the dangerous person happy.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is an introduction. We will explore fawning in much greater depth in a dedicated
          module. For now, what matters is recognizing that people-pleasing, when it comes from
          trauma, is not kindness -- it is survival. The difference is that kindness has a choice
          behind it. Fawning does not. It is automatic, compulsive, and often invisible to the
          person doing it, because it was learned before the conscious mind was fully formed.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Understanding fawn"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-lg">?</span>
                  </motion.div>
                  <motion.div
                    className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                    animate={{ scale: [1, 0.9, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xs font-ui" style={{ color: SAGE }}>self</span>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary text-center">
                  The other person's needs become large. Your own become small.
                </p>
              </div>
            ),
            caption:
              'In fawning, your attention flows entirely toward the other person. What do they need? What will make them calm? Your own feelings and needs shrink to make room.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    'Automatic agreement, even when you disagree',
                    'Difficulty saying no or setting limits',
                    'Scanning others\' moods constantly',
                    'Losing track of your own preferences',
                    'Feeling responsible for others\' emotions',
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
              'These patterns are not signs of weakness. They are the marks of someone who learned, very early, that other people\'s comfort was the price of safety.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-1">Kindness</p>
                    <p className="text-[10px] text-ink-tertiary">
                      A choice. You can say no. You give freely.
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-xs font-ui font-medium text-ink-primary mb-1">Fawning</p>
                    <p className="text-[10px] text-ink-tertiary">
                      Automatic. You cannot say no. You give to survive.
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The difference between genuine kindness and fawning is choice. Kindness comes from a secure place. Fawning comes from a nervous system that believes "if I stop giving, I will not be safe."',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on codependency and attachment theory supports Walker's observations. Children
          who grow up with unpredictable or volatile caregivers often develop what attachment
          researchers call a preoccupied attachment style -- hypervigilance toward the other person's
          emotional state, at the expense of their own. The child learns: "My feelings do not matter.
          What matters is reading the room and keeping the peace."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          If this feels familiar, please know: there is nothing wrong with you. The fawn response is
          an intelligent, creative adaptation to an impossible situation. A child who could not fight,
          flee, or freeze found another way -- they made themselves indispensable. We will explore
          this much more deeply in the Fawn Response module. For now, it is enough to simply notice.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The key difference between genuine kindness and fawning is:',
            options: [
              { id: 'amount', label: 'How much you give', correct: false },
              { id: 'choice', label: 'Whether there is a choice behind it', correct: true },
              { id: 'result', label: 'Whether the other person appreciates it', correct: false },
            ],
          },
          {
            prompt: 'The fawn response developed as:',
            options: [
              { id: 'personality', label: 'A personality trait some people are born with', correct: false },
              { id: 'survival', label: 'A survival strategy for managing dangerous relationships', correct: true },
              { id: 'weakness', label: 'A sign of emotional weakness', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="cptsd-fawn-intro-feynman"
        prompt="Someone tells you they are 'just a people-pleaser' and shrugs it off. Using what you have learned, gently offer a deeper understanding of what might be happening."
        rubric={[
          'You connected people-pleasing to survival, not personality.',
          'You mentioned the automatic nature of the response.',
          'You were gentle and did not pathologize.',
          'You left room for curiosity, not certainty.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Do you recognize fawning in your own life? Even a small moment -- saying yes when you meant no, scanning someone's mood before deciding how to be. Just notice."
          lessonId="trauma.cptsd.fawn-response-intro"
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
              Lesson 5 of 5 &middot; CPTSD
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next module: Window of Tolerance
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Complete Module
          </button>
        </div>
      </footer>
    </article>
  )
}

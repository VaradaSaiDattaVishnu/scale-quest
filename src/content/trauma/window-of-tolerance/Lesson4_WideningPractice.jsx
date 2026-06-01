import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 4 -- Widening Your Window
 * Practical approaches to expanding the window of tolerance.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson4_WideningPractice({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Widening Your Window
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Small, gentle practices that expand your capacity over time.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Widening the window of tolerance is not about brute-forcing yourself through difficult
          experiences. It is about creating conditions where your nervous system can safely
          experience slightly more activation than it is used to -- and then returning to safety.
          This process of touching activation and returning to calm is what Peter Levine calls
          pendulation, and what Somatic Experiencing practitioners call titration. The key word
          is "slightly." Too much, too fast can retraumatize. Just enough, at the right pace,
          builds capacity.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The following practices are starting points, not prescriptions. Try what appeals to you.
          Leave what does not. Each one works by gently engaging the nervous system at the edge
          of the window and then supporting a return to baseline.
        </p>
      </section>

      <VisualStepExplainer
        title="Practices for widening"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <BreathingDot size={64} />
                <p className="text-xs font-ui text-ink-tertiary">Breathe with the dot. In... and out.</p>
              </div>
            ),
            caption:
              'Regulated breathing is one of the most direct ways to communicate safety to the nervous system. A longer exhale activates the parasympathetic system. Even 60 seconds can shift your state.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { practice: 'Grounding: 5-4-3-2-1', desc: 'Five things you see, four you hear, three you touch...' },
                    { practice: 'Bilateral movement', desc: 'Walking, tapping alternating knees, crossing arms' },
                    { practice: 'Temperature change', desc: 'Cold water on wrists, warm drink in hands' },
                    { practice: 'Gentle orienting', desc: 'Slowly looking around the room, naming what you see' },
                    { practice: 'Humming or singing', desc: 'Activates the vagus nerve through vibration' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.practice}</p>
                      <p className="text-[10px] text-ink-tertiary mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'These are not "coping skills." They are nervous system interventions -- ways of speaking directly to the body in a language it understands: sensation, rhythm, and movement.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-ui text-ink-tertiary">Narrow</span>
                    <span className="text-[10px] font-ui text-ink-tertiary">Wider</span>
                  </div>
                  <div className="h-8 rounded-full border border-line-soft overflow-hidden relative">
                    <motion.div
                      className="absolute inset-y-0 left-1/4 right-1/4 rounded-full"
                      style={{ backgroundColor: 'rgba(79, 122, 90, 0.2)' }}
                      animate={{ left: ['25%', '15%', '25%'], right: ['25%', '15%', '25%'] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </div>
                  <p className="text-[10px] text-ink-tertiary text-center mt-2">
                    Each practice session gently stretches the edges of the window.
                  </p>
                </div>
              </div>
            ),
            caption:
              'Widening happens gradually. Each time you touch the edge of your window and return safely, the edge moves a little. Over weeks and months, the window expands.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on neuroplasticity supports this approach. The brain changes in response to
          repeated experience. When you practice returning to safety after mild activation, you are
          literally strengthening the neural pathways between the prefrontal cortex and the
          amygdala. Each successful return teaches the nervous system: "I can handle this. I can
          come back." Over time, the threshold for leaving the window rises, and the time it takes
          to return shortens. This is not abstract hope. It is measurable, reproducible change.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The key to widening the window of tolerance is:',
            options: [
              { id: 'force', label: 'Forcing yourself through overwhelming experiences', correct: false },
              { id: 'gentle', label: 'Gently touching the edge and returning to safety', correct: true },
              { id: 'avoid', label: 'Avoiding all activation', correct: false },
            ],
          },
          {
            prompt: 'Why does a longer exhale help regulate the nervous system?',
            options: [
              { id: 'distract', label: 'It distracts from the problem', correct: false },
              { id: 'para', label: 'It activates the parasympathetic (calming) system', correct: true },
              { id: 'oxygen', label: 'It increases oxygen to the brain', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="wot-widening-feynman"
        prompt="Explain to a friend why 'just pushing through' difficult feelings can sometimes make things worse, and what a gentler approach looks like."
        rubric={[
          'You explained the concept of titration or gradual exposure.',
          'You named the risk of overwhelm from too much too fast.',
          'You offered at least one concrete, body-based practice.',
          'Your explanation was warm and practical.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Which of the practices mentioned feels most accessible to you right now? You do not need to commit to anything. Just notice what feels possible."
          lessonId="trauma.window-of-tolerance.widening-practice"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 4 of 5 &middot; Window of Tolerance</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Daily mapping</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

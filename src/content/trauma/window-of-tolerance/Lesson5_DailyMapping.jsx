import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
  Prompt,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 5 -- Daily Mapping
 * Tracking your nervous system state throughout the day.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson5_DailyMapping({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Daily Mapping
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Learning to notice where you are, moment by moment.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The window of tolerance becomes most useful when it shifts from a concept you have
          learned to a map you use in real time. Daily mapping is the practice of noticing --
          multiple times throughout the day -- where your nervous system is: inside the window,
          above it, or below it. This is not about fixing anything. It is about building the
          habit of awareness. You cannot widen a window you cannot see.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Many people who have experienced trauma have spent years disconnected from their body's
          signals. Dissociation, numbing, and hypervigilance all interfere with interoception --
          the ability to sense what is happening inside your own body. Daily mapping gently
          rebuilds this capacity. It is not about getting the "right" answer. It is about
          practicing the question: "Where am I right now?"
        </p>
      </section>

      <VisualStepExplainer
        title="How to map your day"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm">
                  {['Morning', 'Midday', 'Evening'].map((time, i) => (
                    <motion.div
                      key={time}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <p className="text-xs font-ui font-medium text-ink-primary">{time}</p>
                      <div className="mt-2 space-y-1">
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: i === 1 ? AMBER : SAGE, opacity: 0.4 }} />
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: SAGE, opacity: 0.6 }} />
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#9CA3AF', opacity: i === 2 ? 0.5 : 0.2 }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Three check-ins a day is enough to start. Morning, midday, evening. Just pause and notice: am I above, inside, or below my window right now?',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4 max-w-xs">
                <p className="text-xs font-ui font-medium text-ink-primary">A simple check-in:</p>
                <div className="space-y-2 w-full">
                  {[
                    '1. Pause. Take one breath.',
                    '2. Notice your body. What sensations are present?',
                    '3. Name the zone: hyper, window, or hypo.',
                    '4. No judgment. Just notice.',
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(79, 122, 90, 0.15)' }}
                      >
                        <span className="text-[10px] font-ui font-medium" style={{ color: SAGE }}>{i + 1}</span>
                      </div>
                      <p className="text-xs font-ui text-ink-secondary">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The entire practice takes 15 seconds. That is enough. The goal is not to change your state -- it is to know your state.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on interoceptive awareness shows that people who can accurately read their body's
          internal signals have better emotional regulation, more flexible responses to stress, and
          stronger resilience. Interoception is not a fixed trait -- it is a skill that improves with
          practice. Daily mapping is one of the simplest ways to train it. Over time, you may notice
          patterns: certain times of day, certain situations, or certain people consistently shift
          your state. These patterns are information, not problems.
        </p>
      </section>

      {/* ---- PRACTICE PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="wot-daily-map"
          question="Right now, in this moment: where are you? Above the window, inside it, or below? What body sensations tell you that?"
          onAnswer={savePromptAnswer}
        />
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'The purpose of daily mapping is:',
            options: [
              { id: 'fix', label: 'To fix your nervous system state', correct: false },
              { id: 'notice', label: 'To build the habit of noticing where you are', correct: true },
              { id: 'avoid', label: 'To avoid leaving the window', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="wot-mapping-feynman"
        prompt="Explain daily mapping to someone in a way that makes it feel simple, not like another task on the to-do list."
        rubric={[
          'You described it as noticing, not fixing.',
          'You emphasized that it takes only seconds.',
          'You mentioned body sensations as the guide.',
          'You made it sound gentle and optional.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Try a quick map right now. Where is your nervous system? What told you? Write what you noticed -- even one word is enough."
          lessonId="trauma.window-of-tolerance.daily-mapping"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 5 of 5 &middot; Window of Tolerance</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Module complete. Next module: The Fawn Response</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Complete Module</button>
        </div>
      </footer>
    </article>
  )
}

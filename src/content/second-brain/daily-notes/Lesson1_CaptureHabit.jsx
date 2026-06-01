import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Capture Habit
 * Building a daily capture practice.
 * Research on David Allen's GTD capture principle and cognitive offloading.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

function InboxFlowAnimation() {
  const items = [
    { label: 'Podcast idea', delay: 0 },
    { label: 'Meeting insight', delay: 0.3 },
    { label: 'Book quote', delay: 0.6 },
    { label: 'Random thought', delay: 0.9 },
    { label: 'Question to research', delay: 1.2 },
  ]

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="relative max-w-xs w-full">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-3 mb-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.delay, duration: 0.4 }}
          >
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke={SAGE} strokeWidth="1.5" />
              </svg>
            </motion.div>
            <div className="flex-1 bg-surface rounded-calm px-3 py-2 border border-line-soft">
              <span className="text-xs font-ui text-ink-secondary">{item.label}</span>
            </div>
            <motion.svg
              width="16" height="12" viewBox="0 0 16 12" fill="none"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: item.delay }}
            >
              <path d="M0 6H12M12 6L8 2M12 6L8 10" stroke={SAGE} strokeWidth="1.5" />
            </motion.svg>
            <div className="flex-shrink-0 text-xs font-ui" style={{ color: SAGE }}>Inbox</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Lesson1_CaptureHabit({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Capture Habit
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your mind is for having ideas, not holding them.
        </p>
      </header>

      {/* Research: GTD capture principle */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          David Allen, in "Getting Things Done" (2001), identified a foundational principle: your brain is a terrible storage device. When you try to hold ideas, tasks, and insights in your head, they consume cognitive resources -- what Allen calls "open loops." Each unwritten thought occupies a thread of attention, reducing your capacity for focused, creative work. The solution is ruthless capture: the moment an idea appears, write it down.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Cognitive psychologists call this "cognitive offloading" -- transferring mental contents to an external system to free up working memory (Risko & Gilbert, 2016). Research shows that people who externalize their thoughts experience reduced anxiety, improved focus, and better creative performance. The inbox in your note system is a cognitive offloading device. It exists so your brain can let go.
        </p>
      </section>

      {/* ---- VISUAL: Inbox flow ---- */}
      <VisualStepExplainer
        title="Everything goes in the inbox"
        steps={[
          {
            visual: <InboxFlowAnimation />,
            caption: 'Every thought, insight, question, and fragment goes into the inbox immediately. No filtering, no organizing, no judging. Just capture.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: AMBER }}>Without capture</p>
                    <div className="mt-3">
                      <motion.div
                        className="flex flex-wrap gap-1 justify-center"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {['idea', 'task', 'worry', 'plan', 'note'].map((item) => (
                          <span key={item} className="text-[10px] px-1.5 py-0.5 rounded bg-line-soft text-ink-tertiary">{item}</span>
                        ))}
                      </motion.div>
                      <p className="text-[10px] font-ui mt-2" style={{ color: AMBER }}>Mind full of open loops</p>
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>With capture</p>
                    <div className="mt-3">
                      <motion.div className="flex flex-col items-center gap-1">
                        <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                          <span className="font-ui text-lg" style={{ color: SAGE }}>0</span>
                        </div>
                      </motion.div>
                      <p className="text-[10px] font-ui mt-2" style={{ color: SAGE }}>Mind clear, inbox holds it all</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Without a capture habit, your mind juggles open loops. With capture, your mind is free -- the inbox holds everything safely.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">The capture rules</p>
                  <div className="space-y-2">
                    {[
                      'Capture within 30 seconds of having the thought',
                      'Use the fastest tool available (phone, notebook, voice memo)',
                      'Do not organize or edit during capture',
                      'One thought per capture (even if messy)',
                      'Process later -- capture now',
                    ].map((rule, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <span className="font-ui text-xs font-bold" style={{ color: SAGE }}>{i + 1}.</span>
                        <p className="text-xs font-ui text-ink-secondary">{rule}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Five rules for capture: fast, any tool, no organizing, one thought per entry, process later. The goal is zero friction between idea and inbox.',
          },
        ]}
      />

      {/* Research: Zeigarnik effect */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The Zeigarnik effect (1927) describes how incomplete tasks occupy more mental space than completed ones. Your brain keeps returning to unfinished business. By writing a thought down, you mark it as "captured" -- even though it is not resolved, your brain can release it because it trusts the external system. This is why trusted capture systems reduce anxiety: they satisfy the Zeigarnik effect without requiring you to act on every thought immediately.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The key word is "trusted." The capture habit only works if you trust your inbox. That means you must process it regularly -- otherwise your brain learns that writing things down does not actually mean they will be handled, and the anxiety returns. Capture without processing is just a different kind of clutter.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does David Allen say "your mind is for having ideas, not holding them"?',
            options: [
              { id: 'forget', label: 'Because your mind forgets everything', correct: false },
              { id: 'loops', label: 'Because unwritten thoughts consume cognitive resources as open loops', correct: true },
              { id: 'lazy', label: 'Because writing is more efficient', correct: false },
            ],
          },
          {
            prompt: 'What is the Zeigarnik effect?',
            options: [
              { id: 'forget', label: 'The tendency to forget completed tasks', correct: false },
              { id: 'incomplete', label: 'Incomplete tasks occupy more mental space than completed ones', correct: true },
              { id: 'habit', label: 'The tendency to form habits through repetition', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="daily-notes-L1-feynman"
        prompt="Explain to a skeptical friend why writing down every thought -- even messy ones -- will make them more focused, not less."
        rubric={[
          'You explained cognitive offloading and open loops.',
          'You mentioned that capture frees working memory.',
          'You addressed the concern about messiness (process later).',
          'You referenced the Zeigarnik effect or trust in the system.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What thoughts are you holding in your head right now that could be captured? How does it feel to imagine writing them all down and letting go?"
          lessonId="second-brain.daily-notes.capture-habit"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Daily Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Inbox Zero for Notes
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

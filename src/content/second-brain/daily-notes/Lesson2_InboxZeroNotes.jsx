import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Inbox Zero for Notes
 * Processing your inbox into atomic notes, cards, or trash.
 * Research on decision fatigue and batching.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson2_InboxZeroNotes({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Inbox Zero for Notes
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Capture is not enough. Processing turns fragments into knowledge.
        </p>
      </header>

      {/* Research: Processing and batching */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Merlin Mann introduced "Inbox Zero" for email in 2006, but the principle applies to any intake system: the inbox is a holding area, not a storage area. Items should move through it, not accumulate. When your note inbox grows without processing, it becomes a source of anxiety rather than relief -- the same open-loop problem you were trying to solve.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on decision fatigue (Baumeister et al., 2008) shows that making many small decisions drains cognitive resources. Processing your inbox is a batch of small decisions: Is this worth keeping? Should it become a note? A card? Should it be deleted? Batching these decisions into a dedicated processing session -- rather than doing them continuously -- reduces fatigue and improves quality.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The processing triage"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4">
                  {/* Inbox */}
                  <motion.div
                    className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-center">
                      <span className="font-ui text-lg font-bold" style={{ color: AMBER }}>12</span>
                      <p className="text-[10px] font-ui" style={{ color: AMBER }}>inbox items</p>
                    </div>
                  </motion.div>

                  <motion.svg width="24" height="12" viewBox="0 0 24 12" fill="none"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path d="M0 6H20M20 6L16 2M20 6L16 10" stroke={SLATE} strokeWidth="1.5" />
                  </motion.svg>

                  {/* Triage options */}
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Atomic note', color: SAGE, pct: '40%' },
                      { label: 'Card', color: SAGE, pct: '20%' },
                      { label: 'Task list', color: SLATE, pct: '15%' },
                      { label: 'Delete', color: AMBER, pct: '25%' },
                    ].map((dest) => (
                      <div key={dest.label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dest.color }} />
                        <span className="text-xs font-ui text-ink-secondary">{dest.label}</span>
                        <span className="text-[10px] font-ui text-ink-tertiary">~{dest.pct}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Each inbox item gets triaged: becomes an atomic note, becomes a card, goes to a task list, or gets deleted. Nothing stays in the inbox.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">The processing questions</p>
                  <div className="space-y-3">
                    {[
                      { q: 'Is this an idea or a task?', branch: 'Idea -> note. Task -> task list.' },
                      { q: 'Is this one idea or many?', branch: 'Many -> split into separate items.' },
                      { q: 'Is this worth keeping forever?', branch: 'No -> delete. Yes -> continue.' },
                      { q: 'Do I need to recall this on demand?', branch: 'Yes -> also make a card.' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="border-l-2 pl-3"
                        style={{ borderColor: SAGE }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>{item.q}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-0.5">{item.branch}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Four questions guide every triage decision. The answers are fast and binary. You develop speed with practice.',
          },
        ]}
      />

      {/* Research: Inbox zero trust */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The purpose of inbox zero is not obsessive cleanliness -- it is maintaining trust. If you know that everything in your inbox will be processed within a defined window (daily or every few days), your brain can trust the system. You capture freely because you know nothing will be lost. If the inbox grows unchecked, trust erodes: your brain starts holding things again, and the capture habit breaks down.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          It is better to process imperfectly than to not process at all. A quick triage that takes 10 minutes every morning is more valuable than a perfect processing session that happens once a month. Consistency beats thoroughness.
        </p>
      </section>

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the processing workflow
        </h2>
        <SortSequence
          items={[
            { id: 'open', label: 'Open your inbox' },
            { id: 'pick', label: 'Pick the first item' },
            { id: 'triage', label: 'Ask: idea, task, or delete?' },
            { id: 'process', label: 'If idea: write an atomic note in your own words' },
            { id: 'card', label: 'If card-worthy: extract a flashcard' },
            { id: 'clear', label: 'Remove the item from inbox' },
          ]}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the main purpose of processing your inbox regularly?',
            options: [
              { id: 'clean', label: 'To keep things tidy', correct: false },
              { id: 'trust', label: 'To maintain trust in the system so capture stays effective', correct: true },
              { id: 'count', label: 'To track how many notes you create', correct: false },
            ],
          },
          {
            prompt: 'What should happen to every item in your inbox?',
            options: [
              { id: 'keep', label: 'It should stay there for reference', correct: false },
              { id: 'move', label: 'It should be triaged: note, card, task, or delete', correct: true },
              { id: 'copy', label: 'It should be copied to the notes folder', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="daily-notes-L2-feynman"
        prompt="Explain to someone whose note inbox has 500 unprocessed items how to start fresh with an inbox-zero practice."
        rubric={[
          'You acknowledged the overwhelm without judgment.',
          'You suggested a practical starting point (archive old, start fresh).',
          'You explained the four triage questions.',
          'You emphasized consistency over perfection.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Do you have an inbox -- digital or physical -- that has grown out of control? What would it feel like to process it down to zero? What stops you?"
          lessonId="second-brain.daily-notes.inbox-zero-notes"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Daily Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Weekly Processing
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

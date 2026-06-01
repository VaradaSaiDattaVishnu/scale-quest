import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Practice: Daily Notes
 * Hands-on exercises for capture, processing, and weekly review.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson4_Practice({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Practice: Daily Notes
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Build the capture-process-review cycle into your routine.
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The daily notes practice has three layers: capture (throughout the day), processing (daily or every few days), and review (weekly). Each layer requires different skills. Capture requires speed and low friction. Processing requires judgment and clarity. Review requires reflection and pattern recognition. This lesson exercises all three.
        </p>
      </section>

      {/* ---- VISUAL ---- */}
      <VisualStepExplainer
        title="Three layers, one system"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex flex-col gap-3 max-w-xs w-full">
                  {[
                    { layer: 'Capture', freq: 'All day', skill: 'Speed', color: SAGE },
                    { layer: 'Process', freq: 'Daily', skill: 'Judgment', color: SLATE },
                    { layer: 'Review', freq: 'Weekly', skill: 'Reflection', color: AMBER },
                  ].map((l, i) => (
                    <motion.div
                      key={l.layer}
                      className="flex items-center justify-between rounded-calm border-2 p-3"
                      style={{ borderColor: l.color }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div>
                        <span className="font-ui text-sm font-semibold" style={{ color: l.color }}>{l.layer}</span>
                        <p className="text-[10px] font-ui text-ink-tertiary">Key skill: {l.skill}</p>
                      </div>
                      <span className="text-xs font-ui text-ink-tertiary">{l.freq}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each layer operates on a different cadence and requires a different skill. Practice each one separately, then combine.',
          },
        ]}
      />

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the full daily notes cycle
        </h2>
        <SortSequence
          items={[
            { id: 'thought', label: 'A thought or insight arises during the day' },
            { id: 'capture', label: 'Capture it immediately in the inbox' },
            { id: 'process', label: 'During processing time: triage the item' },
            { id: 'note', label: 'Write an atomic note if it is an idea worth keeping' },
            { id: 'link', label: 'Link the note to existing notes' },
            { id: 'review', label: 'Weekly review: check for gaps, update structures' },
          ]}
        />
      </section>

      {/* ---- PRACTICE PROMPT 1 ---- */}
      <section className="my-10">
        <Prompt
          id="daily-notes-practice-1"
          question="Spend two minutes right now doing a brain dump. Write down every thought, task, idea, and worry currently in your head. Don't edit. Don't organize. Just capture."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 2 ---- */}
      <section className="my-10">
        <Prompt
          id="daily-notes-practice-2"
          question="Now look at your brain dump. For each item, decide: atomic note, flashcard, task, or delete? Write your triage decision next to each item."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 3 ---- */}
      <section className="my-10">
        <Prompt
          id="daily-notes-practice-3"
          question="Design a 5-minute daily processing ritual. What time? What location? What is the trigger that starts it? What is the reward that ends it?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the most important quality of a capture moment?',
            options: [
              { id: 'perfect', label: 'Perfection -- capture only good ideas', correct: false },
              { id: 'speed', label: 'Speed -- write it down before it disappears', correct: true },
              { id: 'format', label: 'Proper formatting', correct: false },
            ],
          },
          {
            prompt: 'Why is daily processing better than weekly-only processing?',
            options: [
              { id: 'fresh', label: 'Because ideas are freshest when recently captured', correct: true },
              { id: 'more', label: 'Because you create more notes', correct: false },
              { id: 'habit', label: 'Because daily habits are always better than weekly ones', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="daily-notes-L4-feynman"
        prompt="Teach someone the complete daily notes workflow: capture, process, review. Include how each layer supports the others."
        rubric={[
          'You described all three layers with their cadences.',
          'You explained that capture requires speed, processing requires judgment.',
          'You mentioned the weekly review as the system health check.',
          'Your listener could start practicing tomorrow.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="After doing the brain dump exercise, how does your mind feel? Lighter? Clearer? What did you notice about what you were holding?"
          lessonId="second-brain.daily-notes.practice"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Daily Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Maps of Content (MOCs)
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

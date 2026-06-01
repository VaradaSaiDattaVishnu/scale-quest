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
 * Lesson 4 -- Practice: Building Atomic Notes
 * Hands-on exercises to create, refine, and connect atomic notes.
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
          Practice: Building Atomic Notes
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Turn what you have learned into concrete skill.
        </p>
      </header>

      {/* Context: Why practice matters here */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Understanding atomic notes intellectually is not the same as writing them fluently. Like any skill, the gap between knowing and doing closes only through deliberate practice. Ericsson's research on expertise (1993) showed that improvement comes not from repetition alone but from practice that targets specific weaknesses with immediate feedback.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In this lesson, you will practice the full cycle: identify an idea, give it a concept handle, write a dense body, and connect it. Each exercise builds on the previous one.
        </p>
      </section>

      {/* ---- VISUAL: The Cycle ---- */}
      <VisualStepExplainer
        title="The atomic note cycle"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  {[
                    { step: '1', label: 'Spot the idea', color: SAGE },
                    { step: '2', label: 'Name it', color: SAGE },
                    { step: '3', label: 'Write it dense', color: SAGE },
                    { step: '4', label: 'Link it', color: SAGE },
                  ].map((s, i) => (
                    <div key={s.step} className="flex items-center gap-2">
                      <motion.div
                        className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: s.color }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2, type: 'spring' }}
                      >
                        <span className="font-ui text-sm font-bold" style={{ color: s.color }}>{s.step}</span>
                      </motion.div>
                      {i < 3 && (
                        <motion.svg width="16" height="8" viewBox="0 0 16 8" fill="none"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        >
                          <path d="M0 4H12M12 4L9 1M12 4L9 7" stroke={SLATE} strokeWidth="1.5" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-2">
                  {['Spot the idea', 'Name it', 'Write it dense', 'Link it'].map((l) => (
                    <p key={l} className="text-[10px] font-ui text-ink-tertiary w-16 text-center">{l}</p>
                  ))}
                </div>
              </div>
            ),
            caption: 'Four steps, practiced until automatic: spot, name, write, link. Each step has a specific skill to develop.',
          },
        ]}
      />

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the note-writing steps
        </h2>
        <SortSequence
          items={[
            { id: 'spot', label: 'Identify a single idea worth keeping' },
            { id: 'handle', label: 'Give it a concept handle title' },
            { id: 'write', label: 'Write 1-3 dense sentences in your own words' },
            { id: 'evidence', label: 'Add one piece of evidence or example' },
            { id: 'link', label: 'Link it to related notes' },
          ]}
        />
      </section>

      {/* ---- PRACTICE PROMPT 1 ---- */}
      <section className="my-10">
        <Prompt
          id="atomic-practice-1"
          question="Think about the most interesting idea you encountered this week. Write an atomic note about it: concept handle title, 1-2 sentence core claim, and one supporting detail."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 2 ---- */}
      <section className="my-10">
        <Prompt
          id="atomic-practice-2"
          question="Now take a long, multi-topic note you have written in the past (or imagine one). Identify the separate ideas within it and write concept handles for three of them."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which of these is the best concept handle?',
            options: [
              { id: 'vague', label: 'Notes about focus', correct: false },
              { id: 'handle', label: 'Attention is a muscle that fatigues with use', correct: true },
              { id: 'long', label: 'Some thoughts I had about attention and focus and how they work', correct: false },
            ],
          },
          {
            prompt: 'What should you do if an atomic note has more than one main idea?',
            options: [
              { id: 'keep', label: 'Keep it as is -- more content is better', correct: false },
              { id: 'split', label: 'Split it into separate notes, one idea each', correct: true },
              { id: 'delete', label: 'Delete the weaker idea', correct: false },
            ],
          },
          {
            prompt: 'The generation effect means:',
            options: [
              { id: 'ai', label: 'AI-generated notes are better', correct: false },
              { id: 'own', label: 'Writing in your own words creates stronger memory traces', correct: true },
              { id: 'copy', label: 'Copying exact quotes preserves accuracy', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="atomic-notes-L4-feynman"
        prompt="Walk someone through how to turn a messy page of meeting notes into a set of atomic notes. What steps would you give them?"
        rubric={[
          'You described scanning for distinct ideas.',
          'You mentioned creating a concept handle for each.',
          'You emphasized writing in their own words.',
          'You mentioned linking related notes together.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="After practicing, what felt easy and what felt hard? Where did you get stuck? What would make the process smoother next time?"
          lessonId="second-brain.atomic-notes.practice"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Atomic Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Linking &amp; Slip-Box
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

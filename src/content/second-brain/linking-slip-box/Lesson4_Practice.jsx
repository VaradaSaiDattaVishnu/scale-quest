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
 * Lesson 4 -- Practice: Linking
 * Hands-on exercises to create links and structure notes.
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
          Practice: Linking Your Notes
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Build connections and watch your network come alive.
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Linking is a skill that develops with practice. At first, it feels unnatural to stop writing and ask, "What does this connect to?" Over time, the question becomes automatic -- a reflex that fires every time you finish a note. This lesson provides structured exercises to accelerate that development.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on deliberate practice (Ericsson, 1993) shows that skill acquisition accelerates when you practice specific sub-skills in isolation with feedback. The exercises below isolate three linking sub-skills: identifying connection opportunities, choosing the right link type, and writing meaningful link context.
        </p>
      </section>

      {/* ---- VISUAL: Linking workflow ---- */}
      <VisualStepExplainer
        title="The linking workflow"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  {[
                    { step: 'Write', desc: 'Create an atomic note' },
                    { step: 'Scan', desc: 'What existing notes relate?' },
                    { step: 'Type', desc: 'Sequence, branch, or reference?' },
                    { step: 'Context', desc: 'Why are these connected?' },
                  ].map((s, i) => (
                    <div key={s.step} className="flex items-center gap-2">
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                          <span className="font-ui text-[10px] font-bold" style={{ color: SAGE }}>{s.step}</span>
                        </div>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-1 max-w-[60px]">{s.desc}</p>
                      </motion.div>
                      {i < 3 && (
                        <motion.svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path d="M0 4H8M8 4L6 2M8 4L6 6" stroke={SLATE} strokeWidth="1" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Every time you finish a note: scan for connections, choose a link type, and write a brief context explaining why the connection matters.',
          },
        ]}
      />

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the linking steps
        </h2>
        <SortSequence
          items={[
            { id: 'finish', label: 'Finish writing an atomic note' },
            { id: 'scan', label: 'Scan existing notes for related ideas' },
            { id: 'type', label: 'Decide: sequence, branch, or reference link?' },
            { id: 'link', label: 'Create the link with a brief context note' },
            { id: 'hub', label: 'Update the structure note if one exists' },
          ]}
        />
      </section>

      {/* ---- PRACTICE PROMPT 1 ---- */}
      <section className="my-10">
        <Prompt
          id="linking-practice-1"
          question="Write two atomic notes about ideas from different domains (e.g., cooking and psychology). Then write a short paragraph explaining how they connect. What link type would you use?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 2 ---- */}
      <section className="my-10">
        <Prompt
          id="linking-practice-2"
          question="Imagine you have 10 notes about learning. Create a structure note: list the 10 note titles in an order that tells a story or builds an argument. What does the order reveal?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What should you do right after finishing an atomic note?',
            options: [
              { id: 'file', label: 'File it in the correct folder', correct: false },
              { id: 'scan', label: 'Scan for existing notes it connects to', correct: true },
              { id: 'forget', label: 'Move on to the next note immediately', correct: false },
            ],
          },
          {
            prompt: 'Why is link context important?',
            options: [
              { id: 'pretty', label: 'It makes the note look more complete', correct: false },
              { id: 'why', label: 'It explains WHY two notes are connected, which helps future navigation', correct: true },
              { id: 'count', label: 'It increases the link count', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="linking-L4-feynman"
        prompt="Walk someone through your process of linking a brand-new note to your existing system. What do you check? How do you decide?"
        rubric={[
          'You described scanning for existing related notes.',
          'You explained choosing between sequence, branch, and reference.',
          'You mentioned writing context for the link.',
          'You included updating structure notes when relevant.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What is the most unexpected connection you have noticed between two ideas? What does that connection teach you about how your mind works?"
          lessonId="second-brain.linking-slip-box.practice"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Linking &amp; Slip-Box
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Notes to Cards
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

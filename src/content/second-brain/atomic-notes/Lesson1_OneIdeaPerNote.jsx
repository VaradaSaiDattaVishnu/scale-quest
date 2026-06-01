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
 * Lesson 1 -- One Idea Per Note
 * Andy Matuschak's evergreen notes principle.
 * Research on chunking and cognitive load.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

function AtomicVsBloatedVisual() {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="grid grid-cols-2 gap-6 max-w-md w-full">
        {/* Bloated note */}
        <motion.div
          className="rounded-calm border-2 p-4"
          style={{ borderColor: AMBER, backgroundColor: 'rgba(184,148,102,0.04)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-ui text-xs font-semibold mb-2" style={{ color: AMBER }}>Bloated note</p>
          <div className="space-y-1">
            {['Creativity', 'Flow states', 'Motivation', 'Habit loops', 'Dopamine'].map((topic, i) => (
              <motion.div
                key={topic}
                className="bg-surface rounded px-2 py-1 border border-line-soft"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <span className="text-[10px] font-ui text-ink-tertiary">{topic}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] font-ui mt-2" style={{ color: AMBER }}>5 ideas tangled together</p>
        </motion.div>

        {/* Atomic notes */}
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="font-ui text-xs font-semibold" style={{ color: SAGE }}>Atomic notes</p>
          {['Creativity needs constraint', 'Flow requires challenge-skill balance', 'Habits form through cue-routine-reward'].map((idea) => (
            <motion.div
              key={idea}
              className="rounded-calm border-2 p-2"
              style={{ borderColor: SAGE, backgroundColor: 'rgba(79,122,90,0.04)' }}
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-[10px] font-ui" style={{ color: SAGE }}>{idea}</span>
            </motion.div>
          ))}
          <p className="text-[10px] font-ui" style={{ color: SAGE }}>Each stands alone, links to others</p>
        </motion.div>
      </div>
    </div>
  )
}

export default function Lesson1_OneIdeaPerNote({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          One Idea Per Note
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The most powerful constraint in note-taking.
        </p>
      </header>

      {/* Research: Andy Matuschak and evergreen notes */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Andy Matuschak, a researcher who worked on educational technology at Apple and Khan Academy, articulated a principle that transforms how people take notes: each note should contain exactly one idea, fully developed. He calls these "evergreen notes" -- notes written to be useful not just today but indefinitely, because they capture a single, clear, complete thought.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This principle runs counter to how most people take notes. The default is to create a note per source -- "Notes from Chapter 3" or "Meeting notes, March 5." These source-based notes mix multiple ideas together, making each individual idea hard to find, hard to link, and hard to reuse. An atomic note about one idea can be linked from anywhere, found by searching for the idea itself, and combined with other atomic notes in ways you did not anticipate when you wrote it.
        </p>
      </section>

      {/* ---- VISUAL: Atomic vs Bloated ---- */}
      <VisualStepExplainer
        title="Atomic vs. bloated"
        steps={[
          {
            visual: <AtomicVsBloatedVisual />,
            caption: 'A bloated note tangles five ideas together. Atomic notes separate them so each can be found, linked, and reused independently.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="max-w-sm w-full">
                  <motion.div
                    className="bg-surface rounded-calm p-4 border-2"
                    style={{ borderColor: SAGE }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>
                      Creativity needs constraint
                    </p>
                    <p className="font-reading text-xs text-ink-secondary mt-2 leading-relaxed">
                      Open-ended freedom paralyzes. When given constraints -- a limited palette, a fixed form, a deadline -- creative output increases. The constraint narrows the search space, making it possible to explore deeply rather than shallowly.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <span className="text-[10px] font-ui px-2 py-0.5 rounded-full border" style={{ borderColor: SLATE, color: SLATE }}>
                        links to: Flow states
                      </span>
                      <span className="text-[10px] font-ui px-2 py-0.5 rounded-full border" style={{ borderColor: SLATE, color: SLATE }}>
                        links to: Decision fatigue
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'A well-written atomic note: one clear idea, enough context to stand alone, and links to related notes. This note is useful anywhere creativity or constraint comes up.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-calm border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xl font-bold" style={{ color: SAGE }}>1</span>
                  </motion.div>
                  <div>
                    <p className="font-ui text-sm text-ink-primary font-semibold">One idea</p>
                    <p className="font-ui text-xs text-ink-tertiary">Complete, self-contained, linkable</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <motion.div
                    className="w-14 h-14 rounded-calm border-2 flex items-center justify-center opacity-40"
                    style={{ borderColor: AMBER }}
                  >
                    <span className="text-xl font-bold" style={{ color: AMBER }}>7</span>
                  </motion.div>
                  <div>
                    <p className="font-ui text-sm text-ink-primary font-semibold">Seven ideas mixed</p>
                    <p className="font-ui text-xs text-ink-tertiary">Can't find, can't link, can't reuse</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'The number of ideas per note is the key variable. One idea means maximum findability and reusability. Multiple ideas mean everything is harder.',
          },
        ]}
      />

      {/* Research: Chunking */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The cognitive science behind atomic notes connects to George Miller's research on chunking. Working memory handles roughly seven items at once, but the size of each "chunk" is flexible. An expert chess player remembers board positions not piece by piece but as meaningful patterns -- chunks. Similarly, a well-written atomic note becomes a chunk: a single, retrievable unit of meaning that your brain can hold, manipulate, and connect to other chunks.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          When a note contains multiple ideas, each idea competes for the same label. Search becomes unreliable. Links become ambiguous. Your future self, encountering the note months later, has to re-read the whole thing to find the one idea they need. Atomic notes eliminate this overhead by giving each idea its own address.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the core principle of an evergreen note?',
            options: [
              { id: 'long', label: 'It should be very long and detailed', correct: false },
              { id: 'one', label: 'It contains exactly one idea, fully developed', correct: true },
              { id: 'source', label: 'It should reference a single source', correct: false },
            ],
          },
          {
            prompt: 'Why are source-based notes ("Notes from Chapter 3") less useful over time?',
            options: [
              { id: 'old', label: 'Because chapters become outdated', correct: false },
              { id: 'mix', label: 'Because they mix multiple ideas, making each one hard to find and link', correct: true },
              { id: 'short', label: 'Because they are too short', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="atomic-notes-L1-feynman"
        prompt="Explain to someone who takes long, multi-topic notes why switching to one-idea-per-note would make their notes more useful."
        rubric={[
          'You explained the findability advantage.',
          'You explained the linkability advantage.',
          'You connected it to how memory works (chunking).',
          'You used a concrete example of a bloated vs. atomic note.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Look at one of your recent notes. How many distinct ideas does it contain? What would it look like to split it into atomic pieces?"
          lessonId="second-brain.atomic-notes.one-idea-per-note"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Atomic Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Concept Handles
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

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
 * Lesson 4 -- Practice: Notes to Cards
 * Hands-on exercises to bridge note-taking and spaced repetition.
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
          Practice: Notes to Cards
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Build the bridge between understanding and retrieval.
        </p>
      </header>

      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The note-to-card pipeline is a skill that improves with deliberate repetition. In this lesson, you will practice the complete cycle: evaluating whether a note deserves a card, extracting a focused retrieval question, and writing a concise answer. Each exercise provides immediate self-assessment.
        </p>
      </section>

      {/* ---- VISUAL: The pipeline ---- */}
      <VisualStepExplainer
        title="The complete pipeline"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Understand', icon: 'U', desc: 'Note written' },
                    { label: 'Evaluate', icon: 'E', desc: 'Card-worthy?' },
                    { label: 'Extract', icon: 'X', desc: 'Write the Q' },
                    { label: 'Answer', icon: 'A', desc: 'Concise back' },
                    { label: 'Link', icon: 'L', desc: 'Card to note' },
                  ].map((s, i) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                          <span className="font-ui text-xs font-bold" style={{ color: SAGE }}>{s.icon}</span>
                        </div>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-1">{s.desc}</p>
                      </motion.div>
                      {i < 4 && (
                        <motion.svg width="10" height="6" viewBox="0 0 10 6" fill="none"
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          <path d="M0 3H7M7 3L5 1M7 3L5 5" stroke={SLATE} strokeWidth="1" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Five steps: understand (note), evaluate (card-worthy?), extract (question), answer (concise back), link (card back to note). Practice each step.',
          },
        ]}
      />

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the note-to-card pipeline
        </h2>
        <SortSequence
          items={[
            { id: 'note', label: 'Write an atomic note with full understanding' },
            { id: 'evaluate', label: 'Evaluate: does this idea need fluent recall?' },
            { id: 'question', label: 'Write a specific retrieval question (card front)' },
            { id: 'answer', label: 'Write a concise answer in your own words (card back)' },
            { id: 'link', label: 'Link the card back to its source note' },
          ]}
        />
      </section>

      {/* ---- PRACTICE PROMPT 1 ---- */}
      <section className="my-10">
        <Prompt
          id="notes-cards-practice-1"
          question="Take the concept of 'desirable difficulties' from Lesson 1. Write an atomic note about it, then extract two different flashcards that test different facets of the same idea."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- PRACTICE PROMPT 2 ---- */}
      <section className="my-10">
        <Prompt
          id="notes-cards-practice-2"
          question="Think of an idea from your own expertise. Write a note about it. Then decide: should this become a card? Write your reasoning. If yes, write the card. If no, explain what makes it better as a note-only."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'A good flashcard front should:',
            options: [
              { id: 'broad', label: 'Ask a broad question like "What do you know about X?"', correct: false },
              { id: 'specific', label: 'Ask a specific question that forces retrieval of one idea', correct: true },
              { id: 'trick', label: 'Be tricky to keep you on your toes', correct: false },
            ],
          },
          {
            prompt: 'When a card review sparks a new insight, you should:',
            options: [
              { id: 'ignore', label: 'Ignore it and keep reviewing', correct: false },
              { id: 'note', label: 'Create a new atomic note capturing the insight', correct: true },
              { id: 'card', label: 'Add it to the existing card', correct: false },
            ],
          },
          {
            prompt: 'One atomic note should produce:',
            options: [
              { id: 'one', label: 'Exactly one card always', correct: false },
              { id: 'many', label: 'Zero or more cards, depending on whether recall is needed', correct: true },
              { id: 'none', label: 'No cards -- notes and cards are separate', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="notes-to-cards-L4-feynman"
        prompt="Teach someone the complete workflow from encountering a new idea to having it in their spaced-repetition system. Cover every step."
        rubric={[
          'You covered note-first, card-second.',
          'You included the card-worthiness evaluation.',
          'You described extraction (question + concise answer).',
          'You mentioned the bidirectional feedback loop.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="How does connecting notes and cards change how you think about learning? What part of the pipeline feels most natural to you, and what needs the most practice?"
          lessonId="second-brain.notes-to-cards.practice"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; Notes to Cards
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Daily Notes
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

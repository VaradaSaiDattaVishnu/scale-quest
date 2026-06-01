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
 * Lesson 1 -- When To Card
 * Deciding which notes should become spaced-repetition cards.
 * Research on desirable difficulties and the testing effect.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson1_WhenToCard({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          When To Card
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Not every note should become a flashcard. Knowing when is the skill.
        </p>
      </header>

      {/* Research: Desirable difficulties */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Robert Bjork introduced the concept of "desirable difficulties" -- learning conditions that feel harder in the moment but produce stronger long-term retention. Spacing, interleaving, and retrieval practice are all desirable difficulties. Creating a flashcard from a note is a decision to impose desirable difficulty: you are committing to repeatedly retrieving that idea from memory over time.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But not every idea benefits from flashcards. Some ideas need to be understood deeply and connected to others -- that is what notes are for. Some ideas need to be retrieved fluently on demand -- that is what cards are for. The bridge between notes and cards is a judgment call: does this idea need to be in my long-term retrieval system, or is it enough to have it in my notes where I can find it?
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Notes vs. cards: different tools for different jobs"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 max-w-sm w-full">
                  <motion.div
                    className="bg-surface rounded-calm p-4 border-2 text-center"
                    style={{ borderColor: SLATE }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-2">
                      <rect x="4" y="4" width="24" height="24" rx="2" stroke={SLATE} strokeWidth="2" />
                      <path d="M10 12h12M10 16h12M10 20h8" stroke={SLATE} strokeWidth="1.5" />
                    </svg>
                    <p className="font-ui text-sm font-semibold" style={{ color: SLATE }}>Note</p>
                    <p className="text-xs font-ui text-ink-tertiary mt-1">Understand and connect</p>
                    <p className="text-xs font-ui text-ink-tertiary">Findable when you need it</p>
                  </motion.div>
                  <motion.div
                    className="bg-surface rounded-calm p-4 border-2 text-center"
                    style={{ borderColor: SAGE }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="mx-auto mb-2">
                      <rect x="2" y="6" width="28" height="20" rx="3" stroke={SAGE} strokeWidth="2" />
                      <line x1="2" y1="16" x2="30" y2="16" stroke={SAGE} strokeWidth="1" strokeOpacity="0.3" />
                    </svg>
                    <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>Card</p>
                    <p className="text-xs font-ui text-ink-tertiary mt-1">Retrieve on demand</p>
                    <p className="text-xs font-ui text-ink-tertiary">Available without looking it up</p>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'Notes are for understanding and connection. Cards are for retrieval on demand. They serve different purposes in your knowledge system.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">Card-worthy signals</p>
                  <div className="space-y-2">
                    {[
                      { signal: 'You need it in conversation or writing without looking it up', color: SAGE },
                      { signal: 'It is a foundational fact that other ideas build on', color: SAGE },
                      { signal: 'Forgetting it would be costly (e.g., medical, legal, technical)', color: SAGE },
                      { signal: 'You have already understood it -- the note is written', color: SAGE },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: s.color }} />
                        <p className="text-xs font-ui text-ink-secondary">{s.signal}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Four signals that a note should become a card: you need fluent recall, it is foundational, forgetting is costly, and you have already understood it.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">Keep as note only</p>
                  <div className="space-y-2">
                    {[
                      { signal: 'You are still developing the idea', color: AMBER },
                      { signal: 'It is contextual -- useful to read, not to memorize', color: AMBER },
                      { signal: 'It is a nuanced argument that resists simple Q&A', color: AMBER },
                      { signal: 'You just need to be able to find it, not recall it instantly', color: AMBER },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 + i * 0.2 }}
                      >
                        <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: s.color }} />
                        <p className="text-xs font-ui text-ink-secondary">{s.signal}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Not everything should be carded. Developing ideas, contextual knowledge, and nuanced arguments are better as notes.',
          },
        ]}
      />

      {/* Research: The testing effect */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The testing effect -- the finding that retrieving information from memory strengthens that memory more than restudying does -- has been replicated hundreds of times (Roediger & Karpicke, 2006). Flashcards are a direct application of this effect: each review is a retrieval attempt. But the testing effect is strongest when the material has already been understood. Testing yourself on something you do not understand does not help -- it just produces frustration.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why the note must come before the card. Write the note first. Understand the idea. Connect it to what you know. Only then, if the idea passes the "card-worthy" test, distill it into a card. The card is not a replacement for the note -- it is an extraction. The note holds the understanding. The card holds the retrieval trigger.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'When should you create a flashcard from a note?',
            options: [
              { id: 'always', label: 'For every note you write', correct: false },
              { id: 'understood', label: 'When you have already understood the idea and need fluent recall', correct: true },
              { id: 'hard', label: 'When the idea is too hard to understand from the note', correct: false },
            ],
          },
          {
            prompt: 'What are "desirable difficulties"?',
            options: [
              { id: 'hard', label: 'Making learning unnecessarily hard', correct: false },
              { id: 'bjork', label: 'Conditions that feel harder but produce stronger long-term retention', correct: true },
              { id: 'easy', label: 'Finding the easiest way to learn', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="notes-to-cards-L1-feynman"
        prompt="Explain to someone why they should not make flashcards for every idea they encounter, and how to decide which ideas deserve cards."
        rubric={[
          'You distinguished notes (understanding) from cards (retrieval).',
          'You listed signals that make an idea card-worthy.',
          'You explained why understanding must come before carding.',
          'You mentioned at least one type of idea that should stay as a note.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Think about knowledge you use in your daily life. Which ideas do you need to retrieve instantly? Which ones do you just need to be able to find?"
          lessonId="second-brain.notes-to-cards.when-to-card"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Notes to Cards
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Card From Note
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

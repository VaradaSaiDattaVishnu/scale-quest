import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Bidirectional Flow
 * Cards inform notes, notes inform cards. The feedback loop.
 * Research on metacognition and calibration.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson3_BidirectionalFlow({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Bidirectional Flow
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Notes feed cards. Card reviews feed notes. A virtuous cycle.
        </p>
      </header>

      {/* Research: Metacognition */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Metacognition -- the ability to monitor and evaluate your own understanding -- is one of the strongest predictors of learning success (Flavell, 1979; Dunlosky & Metcalfe, 2009). Flashcard reviews provide a direct metacognitive signal: you either recall the answer or you don't. There is no ambiguity. This immediate feedback reveals precisely where your understanding is strong and where it has gaps.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The key insight is that this feedback should flow back to your notes. When you repeatedly fail a card, that is a signal that the underlying note needs work -- perhaps the explanation is unclear, the connections are missing, or you never truly understood the idea in the first place. When a card review sparks a new insight, that insight should become a new note. The flow is bidirectional: notes produce cards, and card reviews refine notes.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The bidirectional loop"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-6">
                <svg width="260" height="120" viewBox="0 0 260 120" fill="none" className="overflow-visible">
                  {/* Note box */}
                  <rect x="10" y="35" width="80" height="50" rx="6" stroke={SLATE} strokeWidth="2" fill="none" />
                  <text x="50" y="55" textAnchor="middle" fontSize="10" fill={SLATE} fontWeight="bold">Notes</text>
                  <text x="50" y="70" textAnchor="middle" fontSize="7" fill={SLATE}>Understanding</text>

                  {/* Card box */}
                  <rect x="170" y="35" width="80" height="50" rx="6" stroke={SAGE} strokeWidth="2" fill="none" />
                  <text x="210" y="55" textAnchor="middle" fontSize="10" fill={SAGE} fontWeight="bold">Cards</text>
                  <text x="210" y="70" textAnchor="middle" fontSize="7" fill={SAGE}>Retrieval</text>

                  {/* Forward arrow */}
                  <motion.path
                    d="M90 50 L170 50"
                    stroke={SAGE} strokeWidth="1.5"
                    markerEnd="url(#arrowSage)"
                    animate={{ strokeDashoffset: [20, 0] }}
                    strokeDasharray="5 3"
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <text x="130" y="44" textAnchor="middle" fontSize="7" fill={SAGE}>Extract</text>

                  {/* Return arrow */}
                  <motion.path
                    d="M170 75 L90 75"
                    stroke={AMBER} strokeWidth="1.5"
                    markerEnd="url(#arrowAmber)"
                    animate={{ strokeDashoffset: [20, 0] }}
                    strokeDasharray="5 3"
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <text x="130" y="90" textAnchor="middle" fontSize="7" fill={AMBER}>Refine</text>

                  <defs>
                    <marker id="arrowSage" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0 0L6 3L0 6Z" fill={SAGE} />
                    </marker>
                    <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0 0L6 3L0 6Z" fill={AMBER} />
                    </marker>
                  </defs>
                </svg>
              </div>
            ),
            caption: 'Notes produce cards (extract). Card reviews refine notes (feedback). The two systems strengthen each other over time.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">When card review signals "go back to notes"</p>
                  <div className="space-y-2">
                    {[
                      { signal: 'You fail the same card repeatedly', action: 'Rewrite the note for clarity' },
                      { signal: 'You recall the answer but don\'t understand why', action: 'Add reasoning to the note' },
                      { signal: 'A card sparks a new connection', action: 'Create a new atomic note' },
                      { signal: 'The card feels too easy', action: 'Merge with a harder card or retire' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="grid grid-cols-2 gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="text-xs font-ui" style={{ color: AMBER }}>{item.signal}</div>
                        <div className="text-xs font-ui" style={{ color: SAGE }}>{item.action}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Each review outcome is a signal. Repeated failure means the note needs work. New connections mean new notes. The system self-corrects.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((cycle) => (
                    <motion.div
                      key={cycle}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: SAGE,
                        backgroundColor: `rgba(79,122,90,${0.05 + cycle * 0.05})`,
                      }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: cycle * 0.2, type: 'spring' }}
                    >
                      <span className="font-ui text-xs font-bold" style={{ color: SAGE }}>{cycle}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Each cycle deepens understanding. Notes get sharper. Cards get easier. Knowledge compounds.</p>
              </div>
            ),
            caption: 'Over multiple cycles, understanding deepens. Notes become clearer. Cards become easier. The compound effect builds genuine expertise.',
          },
        ]}
      />

      {/* Research: Calibration */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Calibration -- the alignment between how well you think you know something and how well you actually know it -- is notoriously poor for most learners (Koriat, 1997). People consistently overestimate their understanding. Flashcard reviews are one of the most effective calibration tools available: the immediate, binary feedback (correct or incorrect) corrects overconfidence quickly and precisely.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          When you combine this with a note system, you get a complete learning loop: understand deeply (notes), test retrieval (cards), identify gaps (failed reviews), and repair understanding (updated notes). No other combination of tools provides this tight a feedback cycle between understanding and retention.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="bidirectional-flow-prompt"
          question="Think of a topic you thought you understood well but then struggled with when tested. What would the bidirectional flow look like? What would the failed card tell you to fix in your notes?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What should you do when you repeatedly fail the same flashcard?',
            options: [
              { id: 'delete', label: 'Delete the card', correct: false },
              { id: 'note', label: 'Go back to the note and rewrite it for clarity', correct: true },
              { id: 'repeat', label: 'Just keep reviewing until you get it', correct: false },
            ],
          },
          {
            prompt: 'What is calibration in learning?',
            options: [
              { id: 'speed', label: 'How fast you can recall information', correct: false },
              { id: 'align', label: 'How well your confidence matches your actual knowledge', correct: true },
              { id: 'count', label: 'How many cards you review per day', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="notes-to-cards-L3-feynman"
        prompt="Explain the bidirectional flow between notes and cards to someone who only uses flashcards without a note system."
        rubric={[
          'You explained that cards without notes lack depth.',
          'You described how failed reviews signal note weaknesses.',
          'You mentioned that new insights during review should become notes.',
          'You made the virtuous cycle clear.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Have you ever memorized something without understanding it? What happened when you tried to use that knowledge in a new context?"
          lessonId="second-brain.notes-to-cards.bidirectional-flow"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Notes to Cards
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Practice
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

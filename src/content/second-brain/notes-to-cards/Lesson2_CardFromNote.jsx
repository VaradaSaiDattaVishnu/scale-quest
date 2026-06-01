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
 * Lesson 2 -- Card From Note
 * How to distill an atomic note into one or more flashcards.
 * Research on the generation effect and card design principles.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson2_CardFromNote({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Card From Note
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Transforming understanding into retrievable knowledge.
        </p>
      </header>

      {/* Research: Extraction, not duplication */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A flashcard is not a copy of a note -- it is an extraction. The note contains the full context, reasoning, and connections. The card contains only the retrieval trigger: a question that forces your brain to reconstruct the key idea. Piotr Wozniak, the creator of SuperMemo and pioneer of spaced repetition, calls this the "minimum information principle" -- each card should test one, and only one, piece of knowledge.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The process of turning a note into a card is itself valuable. It forces you to ask: what is the core claim? What would I need to recall? How would I know if I still understand this? These questions deepen your processing of the idea -- another instance of the generation effect strengthening the memory trace.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Note to card: the transformation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4 max-w-md w-full">
                  {/* Note */}
                  <motion.div
                    className="flex-1 bg-surface rounded-calm p-3 border-2"
                    style={{ borderColor: SLATE }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <p className="text-[10px] font-ui" style={{ color: SLATE }}>ATOMIC NOTE</p>
                    <p className="font-ui text-xs font-semibold text-ink-primary mt-1">Spacing effect</p>
                    <p className="text-[10px] font-reading text-ink-tertiary mt-1">Distributing practice over time produces stronger retention than massing the same amount of practice into one session. Ebbinghaus 1885, replicated by Cepeda et al. 2006.</p>
                  </motion.div>

                  <motion.svg width="24" height="16" viewBox="0 0 24 16" fill="none"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path d="M0 8H20M20 8L15 3M20 8L15 13" stroke={SAGE} strokeWidth="2" />
                  </motion.svg>

                  {/* Card */}
                  <motion.div
                    className="flex-1 bg-surface rounded-calm border-2 overflow-hidden"
                    style={{ borderColor: SAGE }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-3 border-b" style={{ borderColor: 'rgba(79,122,90,0.2)' }}>
                      <p className="text-[10px] font-ui" style={{ color: SAGE }}>FRONT</p>
                      <p className="font-ui text-xs text-ink-primary mt-1">Why does spaced practice produce better retention than massed practice?</p>
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] font-ui" style={{ color: SAGE }}>BACK</p>
                      <p className="font-ui text-xs text-ink-secondary mt-1">Each retrieval after a gap forces the brain to reconstruct the trace, strengthening it. Massed practice feels easy but skips this reconstruction.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'The note holds full context. The card extracts a retrieval challenge: a question that forces you to reconstruct the core idea from memory.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">Card extraction checklist</p>
                  <div className="space-y-2">
                    {[
                      'One question per card (minimum information)',
                      'Front asks a specific question, not "tell me about X"',
                      'Back gives a concise answer, not a paragraph',
                      'Card links back to the source note',
                      'Card uses your own words, not the source\'s',
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: SAGE }} />
                        <p className="text-xs font-ui text-ink-secondary">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Five rules for extracting cards from notes. Each rule ensures the card is a genuine retrieval challenge, not a passive recognition test.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: AMBER }}>
                    <p className="text-[10px] font-ui" style={{ color: AMBER }}>BAD CARD</p>
                    <p className="font-ui text-xs text-ink-secondary mt-1">What is the spacing effect?</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Too vague. "What about it?"</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: SAGE }}>
                    <p className="text-[10px] font-ui" style={{ color: SAGE }}>GOOD CARD</p>
                    <p className="font-ui text-xs text-ink-secondary mt-1">Why does spacing work better than massing?</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Specific. Forces causal reasoning.</p>
                  </div>
                </div>
              </div>
            ),
            caption: '"What is X?" invites recognition. "Why does X work?" invites retrieval and reasoning. The second type builds stronger memory.',
          },
        ]}
      />

      {/* Research: Minimum information principle */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Wozniak's twenty rules of formulating knowledge, published over two decades of spaced-repetition research, center on a simple insight: complex cards fail. When a card tests multiple ideas at once, partial recall becomes ambiguous. Did you know it or not? With single-idea cards, the answer is clear, the feedback is precise, and the spacing algorithm can do its job accurately.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          One atomic note might produce multiple cards. A note about the spacing effect could yield: "Why does spacing work?" "Who first documented the spacing effect?" "What is the optimal spacing interval for a one-year retention target?" Each card tests a different facet of the same idea. Together, they build a robust, multi-angle understanding.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="card-from-note-prompt"
          question="Take one idea you have learned in this course so far. Write an atomic note about it (concept handle, core claim, evidence). Then extract one flashcard: a specific question on the front, a concise answer on the back."
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the minimum information principle?',
            options: [
              { id: 'short', label: 'Cards should have as few words as possible', correct: false },
              { id: 'one', label: 'Each card should test one, and only one, piece of knowledge', correct: true },
              { id: 'simple', label: 'Only simple facts deserve cards', correct: false },
            ],
          },
          {
            prompt: 'Why should you write the note before creating the card?',
            options: [
              { id: 'order', label: 'Because the system requires notes first', correct: false },
              { id: 'understand', label: 'Because the card should extract from understanding, not replace it', correct: true },
              { id: 'faster', label: 'Because notes are faster to write', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="notes-to-cards-L2-feynman"
        prompt="Explain to someone the difference between copying a note onto a flashcard and extracting a retrieval challenge from a note."
        rubric={[
          'You explained that a card is an extraction, not a copy.',
          'You described the minimum information principle.',
          'You contrasted vague cards ("What is X?") with specific cards ("Why does X cause Y?").',
          'You mentioned that one note can produce multiple cards.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="When you have made flashcards in the past, did you copy from the source or write in your own words? How might that have affected your learning?"
          lessonId="second-brain.notes-to-cards.card-from-note"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Notes to Cards
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Bidirectional Flow
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

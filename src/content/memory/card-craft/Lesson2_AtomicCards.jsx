import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Atomic Cards
 * One fact per card. Visual comparing bloated vs atomic cards.
 * Research on interference theory.
 */

export default function Lesson2_AtomicCards({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Atomic Cards
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          One fact, one card, one clean retrieval path.
        </p>
      </header>

      {/* Research paragraph: Interference theory */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Interference theory -- one of the oldest and most robust findings in memory research -- explains why cramming multiple facts onto a single flashcard almost always backfires. When two or more memories share the same retrieval cue, they compete during recall. This competition, called cue overload, means that each additional fact attached to the same question makes every fact harder to retrieve. John Anderson's ACT-R model of memory formalizes this: the activation of any single memory trace decreases as the number of associations to the same cue increases.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Proactive interference occurs when older memories block new ones. Retroactive interference occurs when new learning disrupts older traces. Both are amplified by overloaded cards. A card that asks "List the causes of World War I" forces you to retrieve multiple items from the same cue, triggering both types of interference simultaneously. The result is a card that never stabilizes in your review schedule -- what spaced repetition users call a "leech."
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Bloated vs Atomic ---- */}
      <VisualStepExplainer
        title="Bloated Card vs. Atomic Cards"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="w-full max-w-sm rounded-calm border-2 p-4"
                  style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#B89466' }}>BLOATED CARD</p>
                  <p className="text-xs font-ui text-ink-secondary font-medium mb-2">Q: What are the main causes of World War I?</p>
                  <div className="border-t border-line-soft pt-2">
                    <p className="text-[10px] font-ui text-ink-tertiary">A: Militarism, Alliances, Imperialism, Nationalism (MAIN), assassination of Archduke Franz Ferdinand, arms race between Britain and Germany, Schlieffen Plan, Balkan crises...</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 bg-line-soft rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#B89466' }}
                        animate={{ width: ['100%', '30%', '100%', '20%'] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-[9px] font-ui" style={{ color: '#B89466' }}>Unstable recall</span>
                  </div>
                </motion.div>
              </div>
            ),
            caption: 'A bloated card: eight facts behind one question. Each review, you recall different subsets. The card never stabilizes because the cue is overloaded.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-2 py-4">
                {[
                  { q: 'What does the M in MAIN stand for?', a: 'Militarism' },
                  { q: 'Which assassination triggered WWI?', a: 'Archduke Franz Ferdinand' },
                  { q: 'What was the arms race between?', a: 'Britain and Germany' },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    className="w-full max-w-sm rounded-calm border-2 p-3"
                    style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-ui text-ink-secondary font-medium">{card.q}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-1">{card.a}</p>
                      </div>
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 6l2 2 4-4" stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <p className="text-[10px] font-ui text-ink-tertiary mt-1">+ 5 more atomic cards...</p>
              </div>
            ),
            caption: 'The same material split into atomic cards. Each card has one question, one answer. Each can be learned and scheduled independently.',
          },
          {
            visual: (
              <div className="flex gap-6 items-center justify-center py-4">
                <div className="text-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="30" stroke="#B89466" strokeWidth="2" />
                    {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                      <motion.line
                        key={i}
                        x1="40" y1="40"
                        x2={40 + 25 * Math.cos((angle * Math.PI) / 180)}
                        y2={40 + 25 * Math.sin((angle * Math.PI) / 180)}
                        stroke="#B89466"
                        strokeWidth="1.5"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                    ))}
                    <circle cx="40" cy="40" r="4" fill="#B89466" />
                    <text x="40" y="75" textAnchor="middle" fill="#B89466" fontSize="8" fontFamily="sans-serif">Overloaded cue</text>
                  </svg>
                </div>
                <div className="text-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="30" r="8" stroke="#4F7A5A" strokeWidth="2" />
                    <line x1="40" y1="38" x2="40" y2="55" stroke="#4F7A5A" strokeWidth="2" />
                    <circle cx="40" cy="60" r="5" fill="rgba(79,122,90,0.2)" stroke="#4F7A5A" strokeWidth="1.5" />
                    <text x="40" y="78" textAnchor="middle" fill="#4F7A5A" fontSize="8" fontFamily="sans-serif">Clean path</text>
                  </svg>
                </div>
              </div>
            ),
            caption: 'Left: one cue linked to six targets creates interference. Right: one cue to one target -- a clean, unambiguous retrieval path.',
          },
        ]}
      />

      {/* Research paragraph: The splitting process */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The process of splitting bloated cards into atomic ones is itself a powerful learning activity. When you decompose a complex topic into its individual facts, you are forced to identify exactly what you know and what remains vague. Each split is an act of analysis -- you must decide what constitutes a single fact, what context is necessary for the question to be unambiguous, and what the ideal grain size is for your purposes.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Michael Nielsen, the physicist and deep learning researcher, wrote extensively about his practice of "atomizing" knowledge into Anki cards. He found that the act of writing atomic cards was often more valuable than reviewing them. The discipline of making each card test exactly one thing forced him to confront gaps in his understanding that he would have otherwise glossed over. A card you cannot write atomically is a signal that you do not yet understand the material well enough.
        </p>
      </section>

      {/* ---- SORT SEQUENCE: Splitting a Card ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the Splitting Process
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Arrange these steps in the correct order for atomizing a complex card.
        </p>
        <SortSequence
          items={[
            { id: 'understand', label: 'Read and understand the source material' },
            { id: 'identify', label: 'Identify each distinct fact in the bloated card' },
            { id: 'write', label: 'Write one question per fact with a single-line answer' },
            { id: 'context', label: 'Add minimal context so the question is unambiguous' },
            { id: 'test', label: 'Test each card -- if the answer feels like a list, split further' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is "cue overload" in memory science?',
            options: [
              { id: 'too-many', label: 'One retrieval cue linked to too many targets', correct: true },
              { id: 'too-hard', label: 'A question that is too difficult', correct: false },
              { id: 'too-fast', label: 'Reviewing cards too quickly', correct: false },
            ],
          },
          {
            prompt: 'A card you can never seem to remember is called a:',
            options: [
              { id: 'zombie', label: 'Zombie card', correct: false },
              { id: 'leech', label: 'Leech', correct: true },
              { id: 'ghost', label: 'Ghost card', correct: false },
            ],
          },
          {
            prompt: 'When should you split a card further?',
            options: [
              { id: 'list', label: 'When the answer feels like a list', correct: true },
              { id: 'long', label: 'When the question is more than five words', correct: false },
              { id: 'easy', label: 'When you get it right too often', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="card-craft-l2-feynman"
        prompt="Explain to a friend why a flashcard with five facts is worse than five flashcards with one fact each, using an analogy they would understand."
        rubric={[
          'You described interference or cue overload in plain language.',
          'You used a concrete analogy (e.g., filing cabinet, phone contacts).',
          'You explained why atomic cards can be scheduled independently.',
          'Your friend would know how to fix their own bloated cards.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 6 &middot; Card-Craft
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Cloze vs. Q&A
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

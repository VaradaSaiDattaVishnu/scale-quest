import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Wozniak's Rules
 * Piotr Wozniak's 20 rules of formulating knowledge for spaced repetition.
 * Visual comparisons of good vs bad cards, with DragMatch pairing rules to examples.
 */

export default function Lesson1_WozniakRules({
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
          Wozniak's Rules
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The principles behind every effective flashcard ever written.
        </p>
      </header>

      {/* Research paragraph: Wozniak's contribution */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1999, Piotr Wozniak -- the Polish researcher who invented the first computer-based spaced repetition system, SuperMemo -- published a document called "Effective learning: Twenty rules of formulating knowledge." It has since become one of the most influential guides in the spaced repetition community. Wozniak's central argument is deceptively simple: the way you phrase a flashcard matters as much as the algorithm scheduling it. A perfectly timed review of a badly written card still produces weak learning.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The rules distill decades of Wozniak's personal experimentation with tens of thousands of cards. They are not abstract theory -- they emerged from tracking which cards consistently failed and which consistently stuck. The patterns he found map cleanly onto what cognitive science tells us about interference, encoding specificity, and retrieval cue design. When a card violates these rules, it creates predictable problems: confusion at review time, leeches that never stabilize, and an illusion of progress without genuine understanding.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Good vs Bad Cards ---- */}
      <VisualStepExplainer
        title="Good Cards vs. Bad Cards"
        steps={[
          {
            visual: (
              <div className="flex gap-6 items-start py-4">
                {/* Bad card */}
                <motion.div
                  className="flex-1 rounded-calm border-2 p-4"
                  style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#B89466' }}>BAD CARD</p>
                  <p className="text-xs font-ui text-ink-secondary mb-1 font-medium">Q: Describe photosynthesis.</p>
                  <div className="border-t border-line-soft mt-2 pt-2">
                    <p className="text-[10px] font-ui text-ink-tertiary">A: Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. It generally involves the green pigment chlorophyll and generates oxygen as a byproduct...</p>
                  </div>
                </motion.div>
                {/* Good card */}
                <motion.div
                  className="flex-1 rounded-calm border-2 p-4"
                  style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#4F7A5A' }}>GOOD CARD</p>
                  <p className="text-xs font-ui text-ink-secondary mb-1 font-medium">Q: What gas do plants release during photosynthesis?</p>
                  <div className="border-t border-line-soft mt-2 pt-2">
                    <p className="text-[10px] font-ui text-ink-tertiary">A: Oxygen</p>
                  </div>
                </motion.div>
              </div>
            ),
            caption: 'A bad card asks you to recall an essay. A good card asks one clear question with one clear answer. This is Wozniak\'s Rule 1: Do not learn if you do not understand.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                  {[
                    { num: '1', rule: 'Understand first', icon: 'M8 3v10M3 8h10' },
                    { num: '2', rule: 'Learn before you memorize', icon: 'M4 8l4 4 4-8' },
                    { num: '3', rule: 'Build on basics', icon: 'M4 12h8M6 8h4M7 4h2' },
                    { num: '4', rule: 'Minimum info', icon: 'M8 4v8M5 8h6' },
                    { num: '5', rule: 'Use cloze deletion', icon: 'M3 8h3M10 8h3M7 8' },
                    { num: '6', rule: 'Use imagery', icon: 'M4 4h8v8H4zM6 6l2 2 2-2' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.num}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="mx-auto mb-1">
                        <path d={item.icon} stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <p className="text-[10px] font-ui text-ink-secondary font-medium">{item.rule}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The first six rules form the foundation: understand the material, learn it in context, then break it into the smallest possible pieces for memorization.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-24 h-24 rounded-calm border-2 flex flex-col items-center justify-center"
                    style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-2xl font-bold" style={{ color: '#B89466' }}>47</span>
                    <span className="text-[9px] font-ui text-ink-tertiary">facts in one card</span>
                  </motion.div>
                  <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                    <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="var(--color-ink-tertiary)" strokeWidth="2" />
                  </svg>
                  <div className="flex flex-col gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <motion.div
                        key={n}
                        className="w-16 h-4 rounded-sm border flex items-center justify-center"
                        style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: n * 0.15 }}
                      >
                        <span className="text-[8px] font-ui" style={{ color: '#4F7A5A' }}>1 fact</span>
                      </motion.div>
                    ))}
                    <span className="text-[8px] font-ui text-ink-tertiary text-center">...</span>
                  </div>
                </div>
              </div>
            ),
            caption: 'Rule 4 -- Minimum information principle: A card with 47 facts will always fail. Split it into 47 cards with one fact each. Each becomes independently learnable.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <span className="text-xs font-ui text-center px-1" style={{ color: '#B89466' }}>Abstract text</span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Weak trace</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="12" r="6" stroke="#4F7A5A" strokeWidth="1.5" />
                        <path d="M8 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#4F7A5A" strokeWidth="1.5" />
                      </svg>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Strong trace</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Rule 6 -- Use imagery. A vivid mental image activates multiple brain regions simultaneously, creating more retrieval pathways than text alone.',
          },
        ]}
      />

      {/* Research paragraph: Why these rules work */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The minimum information principle -- Wozniak's Rule 4 -- has strong support from interference theory in cognitive psychology. When a card contains multiple facts, retrieval of one fact can interfere with retrieval of the others. This is called cue overload: a single cue (the question) is associated with too many targets (the answers), and the brain struggles to select the right one. By splitting complex cards into atomic units, you eliminate this interference and give each fact its own clean retrieval path.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Wozniak also emphasized redundancy -- encoding the same fact through multiple card formats (Q&A, cloze, image). This aligns with Paivio's dual coding theory: information encoded both verbally and visually is retained better than information encoded through a single channel. The more independent retrieval routes you create for the same fact, the more likely it is that at least one route will survive.
        </p>
      </section>

      {/* ---- DRAG MATCH: Rules to Examples ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match the Rule to Its Example
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Drag each rule to the card example that demonstrates it.
        </p>
        <DragMatch
          pairs={[
            {
              left: 'Minimum information',
              right: 'One fact per card: "What gas do plants release? -- Oxygen"',
            },
            {
              left: 'Use cloze deletion',
              right: '"The mitochondria is the [...] of the cell" -- powerhouse',
            },
            {
              left: 'Understand before memorizing',
              right: 'Read the chapter on cell biology before making cards',
            },
            {
              left: 'Use imagery',
              right: 'Card includes a diagram of the cell membrane',
            },
            {
              left: 'Avoid sets and enumerations',
              right: 'Instead of listing all noble gases, make one card per gas',
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Wozniak, what should you do BEFORE creating flashcards?',
            options: [
              { id: 'understand', label: 'Understand the material first', correct: true },
              { id: 'memorize', label: 'Memorize key terms by rote', correct: false },
              { id: 'highlight', label: 'Highlight the textbook', correct: false },
            ],
          },
          {
            prompt: 'Why does putting many facts on one card cause problems?',
            options: [
              { id: 'boring', label: 'It makes review boring', correct: false },
              { id: 'interference', label: 'Retrieval cue overload -- too many answers compete', correct: true },
              { id: 'long', label: 'It takes too long to read', correct: false },
            ],
          },
          {
            prompt: 'What does "minimum information principle" mean in practice?',
            options: [
              { id: 'less', label: 'Learn less material overall', correct: false },
              { id: 'atomic', label: 'Each card tests exactly one atomic fact', correct: true },
              { id: 'short', label: 'Keep the answer under three words', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="card-craft-l1-feynman"
        prompt="Explain to someone who has never used flashcards why the way a card is written matters more than how often you review it."
        rubric={[
          'You mentioned that a bad card creates interference or confusion during recall.',
          'You used a concrete example of a bad card vs. a good card.',
          'You referenced the minimum information principle or one-fact-per-card.',
          'Your explanation would help someone actually improve their cards.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 6 &middot; Card-Craft
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Atomic Cards
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

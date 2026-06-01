import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Refactoring Bad Cards
 * Take a bad card, make it good. Visual before/after.
 * BranchScenario for card editing decisions.
 */

export default function Lesson4_RefactoringBadCards({
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
          Refactoring Bad Cards
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Diagnosis, surgery, recovery. How to rescue leeches.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Every spaced repetition user accumulates bad cards. They appear gradually -- cards you consistently fail despite repeated reviews, cards where you recall the answer but not the understanding, cards that feel memorized but that you could not explain to someone else. In the Anki community these are called leeches: cards that consume review time without producing durable knowledge. Research on desirable difficulty (Bjork, 1994) suggests that some difficulty is productive, but leeches represent unproductive difficulty -- the card design itself is the problem, not your memory.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Refactoring a bad card is not simply rewriting it. It requires diagnosing why the card fails. Common failure modes include: ambiguous questions that could have multiple correct answers, answers that are too long to hold in working memory, missing context that makes the question meaningless outside a specific chapter, and violations of the minimum information principle. Each failure mode has a specific fix. Learning to diagnose and repair cards is a meta-skill that compounds -- once you can spot the patterns, your new cards start better from the beginning.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Before/After Refactoring ---- */}
      <VisualStepExplainer
        title="Card Surgery: Before and After"
        steps={[
          {
            visual: (
              <div className="flex flex-col gap-3 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#B89466' }} />
                  <span className="text-[10px] font-ui font-bold" style={{ color: '#B89466' }}>DIAGNOSIS: Ambiguous question</span>
                </div>
                <motion.div
                  className="rounded-calm border-2 p-3"
                  style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                >
                  <p className="text-xs font-ui text-ink-secondary font-medium">Q: What is Python?</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: A programming language</p>
                </motion.div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto">
                  <path d="M12 4v16M12 20l-4-4M12 20l4-4" stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <motion.div
                  className="rounded-calm border-2 p-3"
                  style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs font-ui text-ink-secondary font-medium">Q: What type of language is Python (compiled or interpreted)?</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: Interpreted</p>
                </motion.div>
              </div>
            ),
            caption: '"What is Python?" could mean a snake, a language, or a Monty Python sketch. The fix: make the question specific enough that only one answer is correct.',
          },
          {
            visual: (
              <div className="flex flex-col gap-3 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#B89466' }} />
                  <span className="text-[10px] font-ui font-bold" style={{ color: '#B89466' }}>DIAGNOSIS: Answer too long</span>
                </div>
                <motion.div
                  className="rounded-calm border-2 p-3"
                  style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                >
                  <p className="text-xs font-ui text-ink-secondary font-medium">Q: How does TCP ensure reliable delivery?</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: Sequence numbers, acknowledgments, checksums, retransmission, flow control, and congestion control.</p>
                </motion.div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto">
                  <path d="M12 4v16M12 20l-4-4M12 20l4-4" stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col gap-1">
                  {[
                    { q: 'TCP uses [...] to detect corrupt packets.', a: 'checksums' },
                    { q: 'TCP uses [...] to track packet order.', a: 'sequence numbers' },
                    { q: 'TCP uses [...] to confirm receipt.', a: 'acknowledgments' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      className="rounded-calm border p-2"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                    >
                      <p className="text-[10px] font-ui text-ink-secondary">{card.q} <span style={{ color: '#4F7A5A' }}>{card.a}</span></p>
                    </motion.div>
                  ))}
                  <p className="text-[9px] font-ui text-ink-tertiary text-center">+ 3 more atomic cloze cards</p>
                </div>
              </div>
            ),
            caption: 'A list answer signals a bloated card. Split it: one cloze card per mechanism. Each can be learned and scheduled independently.',
          },
          {
            visual: (
              <div className="flex flex-col gap-3 py-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#B89466' }} />
                  <span className="text-[10px] font-ui font-bold" style={{ color: '#B89466' }}>DIAGNOSIS: Missing context</span>
                </div>
                <motion.div
                  className="rounded-calm border-2 p-3"
                  style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                >
                  <p className="text-xs font-ui text-ink-secondary font-medium">Q: What did he discover?</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: The forgetting curve</p>
                </motion.div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto">
                  <path d="M12 4v16M12 20l-4-4M12 20l4-4" stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <motion.div
                  className="rounded-calm border-2 p-3"
                  style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs font-ui text-ink-secondary font-medium">Q: What did Hermann Ebbinghaus discover in 1885?</p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: The forgetting curve (memory decays exponentially)</p>
                </motion.div>
              </div>
            ),
            caption: '"He" who? Cards reviewed months later lose their original context. Always include enough information for the card to stand alone.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The concept of "encoding specificity," proposed by Endel Tulving in 1973, explains why context-dependent cards fail. A memory is most easily retrieved when the retrieval cue matches the conditions under which it was encoded. A card written while reading Chapter 5 may contain implicit references to that chapter's context -- "he," "the theory," "this process" -- that make perfect sense at creation time but become opaque weeks later when you encounter the card outside that context. Every pronoun and vague reference in a card is a potential failure point.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO: Card Editing Decisions ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Card Triage
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          You find this card in your deck. It keeps failing. What do you do?
        </p>
        <BranchScenario
          scenario="You review a card: 'Q: Explain the immune system. A: The immune system has innate and adaptive components. Innate includes barriers, phagocytes, and complement. Adaptive includes T cells and B cells.' You have failed this card 6 times."
          branches={[
            {
              label: 'Delete the card entirely',
              feedback: 'Deletion is sometimes correct for truly useless cards, but this material is worth knowing. A better approach is to refactor it into atomic pieces.',
              isOptimal: false,
            },
            {
              label: 'Split into 4-5 atomic cards, one fact each',
              feedback: 'Correct. Create separate cards: "What are the two branches of the immune system?" (innate and adaptive), "Name two components of innate immunity" (barriers, phagocytes), and so on. Each becomes independently learnable.',
              isOptimal: true,
            },
            {
              label: 'Add more detail to the answer',
              feedback: 'This makes the problem worse. The card already has too much information. More detail means more interference, not better recall.',
              isOptimal: false,
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'A card you consistently fail despite many reviews is called a:',
            options: [
              { id: 'leech', label: 'Leech', correct: true },
              { id: 'zombie', label: 'Zombie', correct: false },
              { id: 'blocker', label: 'Blocker', correct: false },
            ],
          },
          {
            prompt: 'A card that says "Q: What did she prove?" fails because of:',
            options: [
              { id: 'context', label: 'Missing context -- "she" is ambiguous months later', correct: true },
              { id: 'difficulty', label: 'The question is too hard', correct: false },
              { id: 'format', label: 'It should be a cloze card instead', correct: false },
            ],
          },
          {
            prompt: 'What is the first step when you identify a leech card?',
            options: [
              { id: 'diagnose', label: 'Diagnose why it fails before changing anything', correct: true },
              { id: 'delete', label: 'Delete it immediately', correct: false },
              { id: 'review', label: 'Review it more frequently', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="card-craft-l4-feynman"
        prompt="Walk through diagnosing and fixing a bad flashcard. Pick a real example and show the before and after."
        rubric={[
          'You identified a specific failure mode (ambiguity, overload, missing context).',
          'You showed a concrete before-and-after transformation.',
          'Your fix follows the minimum information principle.',
          'The refactored card would stand alone months later without context.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 6 &middot; Card-Craft
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Connecting to Palaces
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

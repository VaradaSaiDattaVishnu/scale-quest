import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Cloze vs Q&A
 * When to use each card format. Visual examples of both types.
 */

export default function Lesson3_ClozeVsQA({
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
          Cloze vs. Q&A
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Two formats, different strengths. Know when to reach for each.
        </p>
      </header>

      {/* Research paragraph: Card format research */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The two dominant flashcard formats in spaced repetition are Q&A (question and answer) and cloze deletion (fill in the blank). Each format engages a slightly different retrieval process. Q&A cards require free recall -- you must produce an answer from scratch given only a question. Cloze deletions provide context around the missing piece, cueing recall through the surrounding sentence. Research by Dunlosky and colleagues (2013) in their review of learning techniques found that both produce robust learning, but their effectiveness depends on the type of knowledge being tested.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Q&A cards are generally stronger for conceptual understanding -- the kind of knowledge where you need to explain or define something without scaffolding. Cloze deletions excel at facts embedded in context: dates, names, specific values, and terminology within a sentence. The cloze format preserves the sentence structure, which serves as a built-in retrieval cue. This makes cloze cards slightly easier but also means they test recognition-in-context rather than pure recall.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Cloze vs Q&A ---- */}
      <VisualStepExplainer
        title="Two Formats, Two Retrieval Modes"
        steps={[
          {
            visual: (
              <div className="flex gap-6 items-start py-4">
                <motion.div
                  className="flex-1 rounded-calm border-2 p-4"
                  style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#5B6F8C' }}>Q&A FORMAT</p>
                  <p className="text-xs font-ui text-ink-secondary font-medium">Q: What is the powerhouse of the cell?</p>
                  <div className="border-t border-line-soft mt-2 pt-2">
                    <p className="text-[10px] font-ui text-ink-tertiary">A: The mitochondria</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#5B6F8C' }} />
                    <span className="text-[9px] font-ui text-ink-tertiary">Free recall -- produce from scratch</span>
                  </div>
                </motion.div>
                <motion.div
                  className="flex-1 rounded-calm border-2 p-4"
                  style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#4F7A5A' }}>CLOZE FORMAT</p>
                  <p className="text-xs font-ui text-ink-secondary font-medium">
                    The <motion.span
                      className="inline-block px-2 py-0.5 rounded-sm border"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.15)' }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >[...]</motion.span> is the powerhouse of the cell.
                  </p>
                  <div className="border-t border-line-soft mt-2 pt-2">
                    <p className="text-[10px] font-ui text-ink-tertiary">A: mitochondria</p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                    <span className="text-[9px] font-ui text-ink-tertiary">Cued recall -- context helps</span>
                  </div>
                </motion.div>
              </div>
            ),
            caption: 'Q&A demands free recall: generate the answer with no scaffolding. Cloze provides sentence context, making it slightly easier but excellent for factual precision.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-md">
                  <p className="text-[10px] font-ui font-bold mb-3 text-center" style={{ color: '#5B6F8C' }}>WHEN TO USE EACH</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#5B6F8C' }}>Q&A is better for:</p>
                      {['Definitions', 'Concepts', 'Explanations', 'Problem-solving'].map((item, i) => (
                        <div key={i} className="flex items-center gap-1 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#5B6F8C' }} />
                          <span className="text-[10px] font-ui text-ink-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-surface rounded-calm p-3 border border-line-soft">
                      <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#4F7A5A' }}>Cloze is better for:</p>
                      {['Dates & years', 'Names in context', 'Specific values', 'Foreign vocabulary'].map((item, i) => (
                        <div key={i} className="flex items-center gap-1 mb-1">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                          <span className="text-[10px] font-ui text-ink-secondary">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Q&A excels at testing understanding. Cloze excels at testing precise facts within context. Use both formats to create redundant retrieval paths for important material.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold mb-1" style={{ color: '#B89466' }}>COMMON MISTAKE</p>
                <motion.div
                  className="w-full max-w-sm rounded-calm border-2 p-3"
                  style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                >
                  <p className="text-xs font-ui text-ink-secondary">
                    The <span className="px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(184,148,102,0.2)' }}>[...]</span> was signed in <span className="px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(184,148,102,0.2)' }}>[...]</span> by <span className="px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(184,148,102,0.2)' }}>[...]</span>.
                  </p>
                </motion.div>
                <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>Too many blanks -- back to cue overload</p>
                <motion.div
                  className="w-full max-w-sm rounded-calm border-2 p-3 mt-2"
                  style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                >
                  <p className="text-xs font-ui text-ink-secondary">
                    The Treaty of Versailles was signed in <span className="px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(79,122,90,0.2)' }}>[...]</span> by the Allied Powers.
                  </p>
                </motion.div>
                <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>One blank, enough context, one clean answer: 1919</p>
              </div>
            ),
            caption: 'One blank per cloze card. Multiple blanks in the same sentence recreate the cue overload problem you just learned about.',
          },
        ]}
      />

      {/* Research paragraph: Combining formats */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Experienced spaced repetition users often create both a Q&A card and a cloze card for the same fact. This is not redundancy for its own sake -- it creates two independent retrieval paths. The Q&A card tests whether you can produce the fact from a direct question. The cloze card tests whether you can produce it from contextual cues. If one path weakens, the other can still support recall. Wozniak calls this "redundancy" and lists it as one of his twenty rules precisely because it makes the overall memory network more robust.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A practical heuristic: if a fact is important enough to memorize, make a Q&A card for it. If the fact has a natural sentence context -- a quote, a definition, a formula -- add a cloze card too. If the fact can be visualized, add an image-based card. Each additional format increases encoding depth without adding much review burden, because the shared underlying memory means each format supports the others.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which format is better for testing "What year did the Berlin Wall fall?"',
            options: [
              { id: 'qa', label: 'Q&A -- it\'s a direct factual question', correct: false },
              { id: 'cloze', label: 'Cloze -- "The Berlin Wall fell in [...]"', correct: true },
              { id: 'either', label: 'Both work equally well', correct: false },
            ],
          },
          {
            prompt: 'Why should a cloze card have only one blank?',
            options: [
              { id: 'easier', label: 'It makes the card easier', correct: false },
              { id: 'overload', label: 'Multiple blanks create cue overload', correct: true },
              { id: 'rule', label: 'It is an arbitrary convention', correct: false },
            ],
          },
          {
            prompt: 'What is the advantage of making both Q&A and cloze cards for the same fact?',
            options: [
              { id: 'paths', label: 'Two independent retrieval paths make memory more robust', correct: true },
              { id: 'reviews', label: 'You get twice as many reviews per day', correct: false },
              { id: 'variety', label: 'It keeps review less boring', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="card-craft-l3-feynman"
        prompt="A friend asks you: 'Should I use cloze or Q&A for my med school flashcards?' Give them a practical answer with examples."
        rubric={[
          'You distinguished between the two formats clearly.',
          'You gave a specific example of when cloze is better (e.g., drug names, dosages).',
          'You gave a specific example of when Q&A is better (e.g., explaining mechanisms).',
          'You mentioned the option of using both for important facts.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 6 &middot; Card-Craft
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Refactoring Bad Cards
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

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  MemoryPalace3D,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Connecting to Palaces
 * Bridge palace loci to card content. Visual showing the link.
 */

export default function Lesson5_ConnectingToPalaces({
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
          Connecting Cards to Palaces
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Two systems, one memory. Bridge spatial and textual encoding.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Memory palaces and flashcards are often treated as separate techniques, but they are most powerful when combined. A memory palace provides spatial and visual encoding -- you place vivid images at familiar locations. A flashcard provides retrieval practice -- you test yourself repeatedly with spaced intervals. Used together, the palace image serves as an additional retrieval cue for the card content, and the card review strengthens the palace image. This creates what memory researchers call "encoding redundancy": multiple independent pathways to the same information.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Lynne Kelly's research on indigenous memory systems documents how oral cultures around the world independently developed techniques that combine spatial locations, vivid imagery, and periodic rehearsal -- essentially memory palaces with built-in spaced repetition. Australian Aboriginal songlines, for example, encode vast amounts of ecological knowledge into journeys through the landscape, with each location triggering a specific set of facts. The combination of space, image, and repeated rehearsal is not a modern invention. It is a convergent discovery across cultures.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Bridge ---- */}
      <VisualStepExplainer
        title="Bridging Palace and Card"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-6 py-4">
                <motion.div
                  className="w-28 h-28 rounded-calm border-2 flex flex-col items-center justify-center p-2"
                  style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="5" y="15" width="30" height="20" rx="2" stroke="#5B6F8C" strokeWidth="1.5" />
                    <path d="M10 15V10L20 4L30 10V15" stroke="#5B6F8C" strokeWidth="1.5" />
                    <rect x="16" y="22" width="8" height="13" stroke="#5B6F8C" strokeWidth="1.5" />
                  </svg>
                  <p className="text-[9px] font-ui text-ink-tertiary mt-1">Memory Palace</p>
                  <p className="text-[9px] font-ui text-ink-tertiary">Spatial + Visual</p>
                </motion.div>
                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <path d="M0 10H55M55 10L48 4M55 10L48 16" stroke="#4F7A5A" strokeWidth="2" />
                  </svg>
                  <span className="text-[8px] font-ui" style={{ color: '#4F7A5A' }}>bridge</span>
                  <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                    <path d="M60 10H5M5 10L12 4M5 10L12 16" stroke="#4F7A5A" strokeWidth="2" />
                  </svg>
                </motion.div>
                <motion.div
                  className="w-28 h-28 rounded-calm border-2 flex flex-col items-center justify-center p-2"
                  style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="5" y="5" width="30" height="30" rx="3" stroke="#5B6F8C" strokeWidth="1.5" />
                    <line x1="10" y1="14" x2="30" y2="14" stroke="#5B6F8C" strokeWidth="1" opacity="0.5" />
                    <line x1="10" y1="20" x2="25" y2="20" stroke="#5B6F8C" strokeWidth="1" opacity="0.5" />
                    <line x1="10" y1="26" x2="28" y2="26" stroke="#5B6F8C" strokeWidth="1" opacity="0.5" />
                  </svg>
                  <p className="text-[9px] font-ui text-ink-tertiary mt-1">Flashcard</p>
                  <p className="text-[9px] font-ui text-ink-tertiary">Retrieval + Spacing</p>
                </motion.div>
              </div>
            ),
            caption: 'Palace and card are not competing methods -- they are complementary systems. The palace provides the image; the card provides the schedule.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { locus: 'Front door', image: 'Giant mitochondria blocking the door', card: 'Q: Powerhouse of the cell? A: Mitochondria' },
                    { locus: 'Kitchen table', image: 'Ebbinghaus eating forgetting curves for breakfast', card: 'Q: Who discovered the forgetting curve? A: Ebbinghaus' },
                    { locus: 'Couch', image: 'Hippocampus-shaped cushion', card: 'Q: Brain region for new memory encoding? A: Hippocampus' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 mb-3 p-3 bg-surface rounded-calm border border-line-soft"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>
                        <span className="text-xs font-ui font-bold" style={{ color: '#4F7A5A' }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui font-medium text-ink-primary">{item.locus}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary italic">{item.image}</p>
                        <p className="text-[10px] font-ui text-ink-secondary mt-1">{item.card}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each palace locus gets a vivid image. Each image connects to a flashcard. When you review the card, you also reinforce the palace. When you walk the palace, you reinforce the card.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}
                    >
                      <span className="text-lg font-bold" style={{ color: '#5B6F8C' }}>1</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">Card only</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">1 retrieval path</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-lg font-bold" style={{ color: '#4F7A5A' }}>3+</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">Card + Palace</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">3+ retrieval paths</p>
                  </div>
                </div>
                <p className="text-[10px] font-ui text-ink-secondary max-w-xs text-center mt-2">
                  Textual cue + spatial location + vivid image = multiple independent routes to the same memory
                </p>
              </div>
            ),
            caption: 'A card alone gives you one retrieval path. Add a palace location, and you get spatial, visual, and narrative paths as well. Redundancy is resilience.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The practical workflow is straightforward. When you create a new flashcard for an important fact, also create a palace image for it. On the card itself, you can include a brief note about which palace and locus the fact lives at -- something like "Palace: my apartment, Locus: front door." This reference serves as an additional retrieval cue during review. Over time, many users report that the palace image comes to mind automatically when they see the card, and the card content comes to mind automatically when they mentally visit the locus.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This integration works because it aligns with how the brain naturally encodes memories. The hippocampus already binds spatial, visual, and semantic information together during encoding. By deliberately creating all three types of association for the same fact, you are working with the brain's natural architecture rather than against it. The card provides the semantic structure and the retrieval schedule. The palace provides the spatial and imagistic scaffolding. Together, they create a memory that is both durable and accessible.
        </p>
      </section>

      {/* ---- 3D PALACE VISUAL ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Walk Through a Connected Palace
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Each locus holds both a vivid image and a linked flashcard.
        </p>
        <MemoryPalace3D />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why combine memory palaces with flashcards?',
            options: [
              { id: 'redundancy', label: 'Multiple retrieval paths make memory more resilient', correct: true },
              { id: 'faster', label: 'It makes review faster', correct: false },
              { id: 'fun', label: 'Palaces are more fun', correct: false },
            ],
          },
          {
            prompt: 'What should you include on a flashcard to link it to a palace?',
            options: [
              { id: 'note', label: 'A brief note about which palace and locus', correct: true },
              { id: 'drawing', label: 'A full drawing of the palace', correct: false },
              { id: 'nothing', label: 'Nothing -- keep cards and palaces separate', correct: false },
            ],
          },
          {
            prompt: 'What brain structure naturally binds spatial, visual, and semantic information?',
            options: [
              { id: 'hippo', label: 'The hippocampus', correct: true },
              { id: 'amygdala', label: 'The amygdala', correct: false },
              { id: 'cortex', label: 'The prefrontal cortex', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="card-craft-l5-feynman"
        prompt="Explain to someone who uses only flashcards why adding a memory palace for important facts would help them remember better."
        rubric={[
          'You explained that palaces add spatial and visual retrieval paths.',
          'You used a concrete example of a fact stored in both systems.',
          'You mentioned that the two systems reinforce each other during review.',
          'Your explanation would motivate someone to try the combination.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 6 &middot; Card-Craft
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The 1,000-Card Milestone
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

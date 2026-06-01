import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 7 -- Practice Deck
 * Full deck practice walkthrough with visual progress display.
 * Structured approach to the first untimed full-deck attempt.
 */

export default function Lesson7_PracticeDeck({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [deckProgress, setDeckProgress] = useState(0)

  const suits = [
    { name: 'Clubs', symbol: '\u2663', color: '#4F7A5A' },
    { name: 'Diamonds', symbol: '\u2666', color: '#B89466' },
    { name: 'Hearts', symbol: '\u2665', color: '#B89466' },
    { name: 'Spades', symbol: '\u2660', color: '#5B6F8C' },
  ]

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Practice Deck Walkthrough
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your first full deck, step by step. No clock. Just precision.
        </p>
      </header>

      {/* Research paragraph: Error-free learning phases */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Baddeley and Wilson (1994) demonstrated that errorless learning -- where the learner is prevented from making mistakes during early stages -- produces significantly better outcomes for procedural skills than trial-and-error approaches. When errors occur during early encoding, the incorrect associations compete with correct ones during later retrieval. This is why your first full-deck practice should be slow, accurate, and unpressured.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The standard competition training progression follows a clear arc: first, master all individual card-to-image mappings. Then, practice encoding groups of 3 (or 2) cards into composite scenes. Then, walk through a full deck slowly, placing each scene at a locus in your memory palace. Only after accuracy is near-perfect on slow attempts should you introduce timing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This lesson walks you through the full-deck encoding process with a 13-card suit at a time. The goal is not speed. The goal is placing every scene correctly and being able to walk back through your palace and recall the sequence. If you can do this once -- slowly, perfectly -- you have proven that the system works. Speed comes later through the drills you practiced in the previous lesson.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Full Deck Encoding Process ---- */}
      <VisualStepExplainer
        title="Full Deck Encoding: Step by Step"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2">
                  {Array.from({ length: 17 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="w-3 h-8 rounded-sm"
                      style={{
                        backgroundColor: i < 6 ? '#4F7A5A' : 'rgba(91,111,140,0.15)',
                      }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">17 PAO scenes for a full 52-card deck (3-card system)</p>
                <div className="bg-surface rounded-calm border border-line-soft p-3 max-w-xs">
                  <p className="text-[10px] font-ui text-ink-secondary text-center">
                    Each bar = 1 composite scene = 3 cards = 1 locus in your memory palace
                  </p>
                </div>
              </div>
            ),
            caption: 'A 52-card deck produces 17 composite scenes (with 1 leftover card, which gets its full PAO at the last locus). Each scene occupies one location in your memory palace.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { step: '1', text: 'Set up your shuffled deck face-down', color: '#5B6F8C' },
                    { step: '2', text: 'Turn over 3 cards. Form the PAO composite scene.', color: '#4F7A5A' },
                    { step: '3', text: 'Place that scene at the first locus in your palace.', color: '#4F7A5A' },
                    { step: '4', text: 'Pause. Can you see the scene clearly at the locus?', color: '#B89466' },
                    { step: '5', text: 'Turn over the next 3 cards. Repeat at the next locus.', color: '#4F7A5A' },
                    { step: '6', text: 'After all 52 cards: walk the palace and recall each scene.', color: '#5B6F8C' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.step}
                      </div>
                      <span className="text-xs font-ui text-ink-secondary">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The core loop: turn 3 cards, form scene, place at locus, verify clarity, move on. The "verify clarity" step is critical for first attempts -- skip it and errors compound.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="280" height="120" viewBox="0 0 280 120" fill="none">
                  {/* Palace path */}
                  <motion.path
                    d="M20 60 Q70 20 120 60 Q170 100 220 60 Q250 40 270 60"
                    stroke="#5B6F8C"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  {/* Loci dots */}
                  {[
                    { x: 20, y: 60 },
                    { x: 70, y: 32 },
                    { x: 120, y: 60 },
                    { x: 170, y: 88 },
                    { x: 220, y: 60 },
                    { x: 270, y: 60 },
                  ].map((pos, i) => (
                    <motion.circle
                      key={i}
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      fill={i < 3 ? '#4F7A5A' : 'rgba(91,111,140,0.2)'}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.2 }}
                    />
                  ))}
                  <text x="140" y="115" textAnchor="middle" className="font-ui" fill="#5B6F8C" fontSize="9">
                    Memory palace journey with scenes placed at each locus
                  </text>
                </svg>
              </div>
            ),
            caption: 'Your memory palace is the scaffold. Each locus holds one PAO scene. Walk the journey forward during encoding, then walk it again (same direction) during recall.',
          },
        ]}
      />

      {/* Research paragraph: Encoding strategies */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Memory athletes use a technique called "scene anchoring" during palace placement. Instead of just placing the scene at a locus, they imagine the Person interacting with the locus itself. If the locus is your kitchen table, you do not just place "Michael Jordan painting a violin" near the table -- you imagine Jordan standing on the table, paint dripping onto the surface, the violin leaning against a table leg. The more the scene physically interacts with the locus, the stronger the binding.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research by Legge et al. (2012) on the Method of Loci confirms that spatial binding strength predicts recall accuracy. Participants who reported stronger spatial interactions between images and locations recalled significantly more items. This is not just a subjective report -- fMRI studies show increased hippocampal activation when images are deeply integrated with spatial context, compared to when they are simply "placed near" a location.
        </p>
      </section>

      {/* ---- Interactive Progress Tracker ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice Tracker
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Track your progress through a full deck practice. Tap a suit after you have encoded it.
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-4 gap-3">
            {suits.map((suit, i) => {
              const completed = deckProgress > i
              return (
                <motion.button
                  key={suit.name}
                  onClick={() => setDeckProgress(Math.max(deckProgress, i + 1))}
                  className="bg-surface rounded-calm border-2 p-4 text-center transition-colors"
                  style={{
                    borderColor: completed ? suit.color : 'rgba(91,111,140,0.2)',
                    backgroundColor: completed ? `${suit.color}10` : undefined,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl" style={{ color: completed ? suit.color : 'rgba(91,111,140,0.3)' }}>
                    {suit.symbol}
                  </span>
                  <p className="text-[10px] font-ui mt-1" style={{ color: completed ? suit.color : 'rgba(91,111,140,0.5)' }}>
                    {suit.name}
                  </p>
                </motion.button>
              )
            })}
          </div>
          <div className="w-full max-w-xs">
            <div className="h-2 bg-line-soft rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#4F7A5A' }}
                animate={{ width: `${(deckProgress / 4) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <p className="text-xs font-ui text-ink-tertiary text-center mt-2">
              {deckProgress * 13} of 52 cards encoded
            </p>
          </div>
        </div>
      </section>

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the Full-Deck Process
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Arrange these into the correct sequence for a full-deck practice
        </p>
        <SortSequence
          items={[
            { id: 'shuffle', label: 'Shuffle the deck thoroughly' },
            { id: 'palace', label: 'Mentally enter your memory palace at the first locus' },
            { id: 'flip', label: 'Turn over 3 cards and form the PAO composite scene' },
            { id: 'place', label: 'Place the scene at the current locus with strong interaction' },
            { id: 'walk', label: 'Walk the entire palace and recall all scenes in order' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why should your first full-deck attempt be slow and untimed?',
            options: [
              { id: 'error', label: 'Errors during early learning create competing wrong associations', correct: true },
              { id: 'relax', label: 'To make the experience more relaxing', correct: false },
              { id: 'comp', label: 'Because competitions are not timed either', correct: false },
            ],
          },
          {
            prompt: 'What is "scene anchoring" in palace placement?',
            options: [
              { id: 'near', label: 'Placing the scene near a locus', correct: false },
              { id: 'interact', label: 'Making the scene physically interact with the locus', correct: true },
              { id: 'label', label: 'Labeling each locus with a number', correct: false },
            ],
          },
          {
            prompt: 'How many PAO scenes does a 52-card deck produce (3-card system)?',
            options: [
              { id: '13', label: '13 scenes', correct: false },
              { id: '17', label: '17 scenes (plus 1 leftover card)', correct: true },
              { id: '26', label: '26 scenes', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson7-feynman"
        prompt="Walk someone through the process of memorizing 6 cards from a deck. Describe exactly what you would see, imagine, and place in your palace."
        rubric={[
          'You described turning over 3 cards and forming a PAO composite scene.',
          'You explained placing the scene at a specific locus in a memory palace.',
          'You mentioned scene anchoring -- making the image interact with the location.',
          'You repeated the process for the second group of 3 cards at the next locus.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Describe your experience encoding your first full suit of 13 cards. Which loci were strongest? Where did scenes feel weak? What would you change next time?"
          lessonId="memory.pao.practice-deck"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 7 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Your first timed attempt
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

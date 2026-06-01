import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  ForgettingCurveViz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- What Is FSRS
 * Introduces the Free Spaced Repetition Scheduler by Jarrett Ye.
 * Traces the lineage: Ebbinghaus -> Leitner -> SM-2 -> FSRS.
 * Visual comparison of algorithm approaches.
 */

export default function Lesson1_WhatIsFSRS({
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
          What Is FSRS?
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The modern algorithm that learns how you forget -- and schedules reviews to stop it.
        </p>
      </header>

      {/* Research paragraph: History of spaced repetition */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The story of spaced repetition begins with Hermann Ebbinghaus in 1885, who first measured the forgetting curve and discovered that well-timed reviews flatten it. For decades, this remained a laboratory finding. In 1972, Sebastian Leitner translated it into a practical system: a box with dividers, where flashcards move forward on correct answers and backward on errors. The Leitner system was elegant but crude -- every card of the same "level" got the same interval, regardless of individual difficulty.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1987, Piotr Wozniak changed everything. Working on his PhD at the Poznan University of Technology, he created SuperMemo and its scheduling algorithm SM-2. For the first time, each individual card got its own optimal interval, calculated from its history of correct and incorrect responses. SM-2 used a simple formula: after each review, multiply the current interval by an "easiness factor" (EF) that adjusted based on how hard the recall felt. SM-2 was a breakthrough, and it powered SuperMemo, Anki, and most spaced repetition apps for over three decades.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But SM-2 has known limitations. Its easiness factor is a blunt instrument -- it adjusts slowly, treats all cards identically at the start, and cannot account for the complex ways that difficulty, time, and review history interact. Enter FSRS: the Free Spaced Repetition Scheduler, created by Jarrett Ye in 2022. FSRS uses a machine-learning model trained on millions of actual review records to predict the probability that you will remember a card at any given point in time. It does not use a fixed formula. It learns your personal forgetting patterns and adapts.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Lineage ---- */}
      <VisualStepExplainer
        title="The Evolution of Spaced Repetition"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="w-full max-w-md">
                  {[
                    { year: '1885', name: 'Ebbinghaus', desc: 'Discovers the forgetting curve', color: '#5B6F8C' },
                    { year: '1972', name: 'Leitner', desc: 'Card box with fixed level intervals', color: '#5B6F8C' },
                    { year: '1987', name: 'SM-2 (Wozniak)', desc: 'Per-card intervals with easiness factor', color: '#B89466' },
                    { year: '2022', name: 'FSRS (Jarrett Ye)', desc: 'ML-based prediction of recall probability', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.year}
                      className="flex items-center gap-4 mb-3"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="flex flex-col items-center w-12 flex-shrink-0">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: item.color }}
                        >
                          {item.year.slice(2)}
                        </div>
                        {i < 3 && (
                          <div className="w-0.5 h-4" style={{ backgroundColor: 'rgba(91,111,140,0.2)' }} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-ui font-semibold text-ink-primary">{item.name}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary">{item.desc}</p>
                      </div>
                      <span className="font-mono text-[10px] text-ink-tertiary ml-auto">{item.year}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: '137 years of progress: from measuring forgetting to predicting it. Each generation built on the last, moving from fixed rules to adaptive, personalized scheduling.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <motion.div
                    className="bg-surface rounded-calm border-2 p-4"
                    style={{ borderColor: '#B89466' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#B89466' }}>SM-2</p>
                    <div className="space-y-1">
                      <p className="text-[10px] font-ui text-ink-tertiary">Fixed formula</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">Same start for every card</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">Easiness factor adjusts slowly</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">No learning from other users</p>
                    </div>
                  </motion.div>
                  <motion.div
                    className="bg-surface rounded-calm border-2 p-4"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>FSRS</p>
                    <div className="space-y-1">
                      <p className="text-[10px] font-ui text-ink-tertiary">ML-trained model</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">Adapts to each learner</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">Predicts recall probability</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">Learns from review history</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'SM-2 uses a fixed formula applied the same way to every user. FSRS uses a trained model that adapts its parameters to your actual review behavior.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
                  {/* SM-2 curve (fixed intervals) */}
                  <motion.path
                    d="M30 20 L70 20 L70 60 L130 60 L130 85 L220 85 L220 100 L270 100"
                    stroke="#B89466"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  {/* FSRS curve (smooth adaptive) */}
                  <motion.path
                    d="M30 20 C50 25 60 40 80 50 C100 60 130 68 160 78 C190 88 230 95 270 100"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  {/* Legend */}
                  <line x1="30" y1="125" x2="50" y2="125" stroke="#B89466" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="55" y="128" className="font-ui" fill="#B89466" fontSize="9">SM-2 (step intervals)</text>
                  <line x1="155" y1="125" x2="175" y2="125" stroke="#4F7A5A" strokeWidth="2.5" />
                  <text x="180" y="128" className="font-ui" fill="#4F7A5A" fontSize="9">FSRS (smooth adaptive)</text>
                  {/* Axis labels */}
                  <text x="15" y="18" className="font-ui" fill="#5B6F8C" fontSize="8">Short</text>
                  <text x="15" y="103" className="font-ui" fill="#5B6F8C" fontSize="8">Long</text>
                  <text x="140" y="115" className="font-ui" fill="#5B6F8C" fontSize="9" textAnchor="middle">Review intervals over time</text>
                </svg>
              </div>
            ),
            caption: 'SM-2 increases intervals in fixed steps. FSRS calculates a smooth, optimal interval for each card at each review, adapting to how that specific card behaves in your memory.',
          },
        ]}
      />

      {/* Research paragraph: How FSRS works */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          At its core, FSRS models each card with three parameters: Stability (S), Difficulty (D), and Retrievability (R). Stability represents how long a memory will last before dropping to a 90% recall threshold. Difficulty captures the inherent challenge of the card. Retrievability is the predicted probability that you can recall the card right now, which decreases over time according to a power-law forgetting function.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          When you review a card and rate it (Again, Hard, Good, or Easy), FSRS updates all three parameters using formulas derived from fitting a neural-network model to over 15 million real review records from Anki users. The result is remarkably accurate: in benchmark tests, FSRS predicts recall probability with a mean absolute error of about 3-4%, compared to 10-15% for SM-2. This means it schedules reviews more efficiently -- fewer total reviews for the same retention, or higher retention for the same number of reviews.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: FSRS Core Concepts ---- */}
      <VisualStepExplainer
        title="FSRS: Three Key Parameters"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {[
                    {
                      param: 'Stability (S)',
                      desc: 'How long until recall drops to 90%',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect x="4" y="8" width="16" height="8" rx="2" stroke="#4F7A5A" strokeWidth="2" />
                          <line x1="12" y1="8" x2="12" y2="16" stroke="#4F7A5A" strokeWidth="1.5" />
                        </svg>
                      ),
                      color: '#4F7A5A',
                    },
                    {
                      param: 'Difficulty (D)',
                      desc: 'How hard this card is for you',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 4L20 20H4L12 4Z" stroke="#B89466" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                      ),
                      color: '#B89466',
                    },
                    {
                      param: 'Retrievability (R)',
                      desc: 'Probability you can recall it now',
                      icon: (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="8" stroke="#5B6F8C" strokeWidth="2" />
                          <path d="M12 8V12L15 14" stroke="#5B6F8C" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      ),
                      color: '#5B6F8C',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.param}
                      className="bg-surface rounded-calm border-2 p-3 text-center"
                      style={{ borderColor: item.color }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="flex justify-center mb-2">{item.icon}</div>
                      <p className="text-[10px] font-ui font-semibold" style={{ color: item.color }}>{item.param}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Every card in FSRS has three evolving parameters. Together they determine when you should see the card next. All three update after every review based on your actual performance.',
          },
        ]}
      />

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the Spaced Repetition Timeline
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Arrange these milestones in chronological order
        </p>
        <SortSequence
          items={[
            { id: 'ebb', label: 'Ebbinghaus measures the forgetting curve (1885)' },
            { id: 'leitner', label: 'Leitner creates the card-box system (1972)' },
            { id: 'sm2', label: 'Wozniak develops SM-2 for SuperMemo (1987)' },
            { id: 'anki', label: 'Anki adopts SM-2 as its scheduling engine (2006)' },
            { id: 'fsrs', label: 'Jarrett Ye publishes FSRS (2022)' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the main advantage of FSRS over SM-2?',
            options: [
              { id: 'simpler', label: 'It uses a simpler formula', correct: false },
              { id: 'adaptive', label: 'It adapts to your personal forgetting patterns using ML', correct: true },
              { id: 'faster', label: 'It shows cards faster', correct: false },
            ],
          },
          {
            prompt: 'What does "Stability" represent in FSRS?',
            options: [
              { id: 'hard', label: 'How difficult the card is', correct: false },
              { id: 'time', label: 'How long until recall probability drops to 90%', correct: true },
              { id: 'count', label: 'How many times you have reviewed the card', correct: false },
            ],
          },
          {
            prompt: 'How was FSRS trained?',
            options: [
              { id: 'theory', label: 'From theoretical memory models only', correct: false },
              { id: 'data', label: 'On millions of actual review records from Anki users', correct: true },
              { id: 'lab', label: 'In controlled laboratory experiments', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="fsrs-lesson1-feynman"
        prompt="Explain to a friend who uses Anki with the default SM-2 scheduler why FSRS might schedule their reviews differently -- and why that could mean fewer reviews for the same retention."
        rubric={[
          'You explained that SM-2 uses a fixed formula while FSRS learns from actual data.',
          'You mentioned that FSRS predicts recall probability more accurately.',
          'You connected better prediction to more efficient scheduling (fewer wasted reviews).',
          'Your explanation avoided jargon or explained any technical terms you used.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What is your current experience with spaced repetition? Have you used Anki, flashcards, or any review system before? What worked and what felt frustrating?"
          lessonId="memory.fsrs.what-is-fsrs"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; FSRS &amp; Daily Habit
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Setting up your daily review workflow
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

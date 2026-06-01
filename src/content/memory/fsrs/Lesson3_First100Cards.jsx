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
 * Lesson 3 -- First 100 Cards
 * Building the initial deck with proper new-card introduction rate.
 * Research grounding: new-card pacing, interference theory,
 * the 20-card-per-day benchmark.
 */

export default function Lesson3_First100Cards({
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
          Your First 100 Cards
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Build your deck at the right pace. Not too fast, not too slow.
        </p>
      </header>

      {/* Research paragraph: New card introduction rate */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          One of the most common mistakes in spaced repetition is adding too many new cards too quickly. Each new card generates future reviews: a card added today will come back tomorrow, then in 3 days, then in a week, and so on. At steady state, each new card generates roughly 0.5-1.0 reviews per day averaged over its lifetime. Add 50 new cards today, and within a week you will face 100+ daily reviews -- on top of any other new cards you add.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The sustainable introduction rate depends on your available daily time and tolerance for review load. The Anki community has converged on a well-tested rule of thumb: 10-20 new cards per day for most learners. At 20 new cards per day, your daily review load stabilizes at approximately 100-150 reviews per day after about 2-3 weeks. At 10 new cards per day, it stabilizes around 50-75 reviews. The first 100 cards, added at 10 per day, take 10 days to enter the system.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Proactive interference -- where previously learned items make it harder to encode new, similar items -- is another reason to pace new cards. Research by Underwood (1957) showed that interference increases with the number of similar items learned in close succession. Spacing new card introductions over days reduces interference by allowing consolidation between batches.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Card Introduction Pacing ---- */}
      <VisualStepExplainer
        title="How New Cards Generate Reviews"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="280" height="160" viewBox="0 0 280 160" fill="none">
                  {/* Axes */}
                  <line x1="40" y1="10" x2="40" y2="130" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  <line x1="40" y1="130" x2="270" y2="130" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  {/* 10/day curve */}
                  <motion.path
                    d="M40 120 C60 115 80 105 110 90 C140 80 170 75 200 73 L270 72"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  {/* 30/day curve */}
                  <motion.path
                    d="M40 120 C60 105 80 75 110 45 C140 28 170 22 200 20 L270 18"
                    stroke="#B89466"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  {/* Labels */}
                  <text x="270" y="68" className="font-ui" fill="#4F7A5A" fontSize="8" textAnchor="end">10/day (~70 reviews)</text>
                  <text x="270" y="15" className="font-ui" fill="#B89466" fontSize="8" textAnchor="end">30/day (~200+ reviews)</text>
                  <text x="155" y="145" className="font-ui" fill="#5B6F8C" fontSize="9" textAnchor="middle">Days since starting</text>
                  <text x="15" y="130" className="font-ui" fill="#5B6F8C" fontSize="8">0</text>
                  <text x="15" y="20" className="font-ui" fill="#5B6F8C" fontSize="8">High</text>
                  <text x="28" y="80" className="font-ui" fill="#5B6F8C" fontSize="7" textAnchor="end" transform="rotate(-90, 28, 80)">Daily reviews</text>
                </svg>
              </div>
            ),
            caption: 'At 10 new cards/day, your daily review load stabilizes around 70 reviews. At 30/day, it can exceed 200. The load curve rises fast and then plateaus -- choose a pace you can sustain.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-5 gap-2 max-w-xs">
                  {Array.from({ length: 10 }, (_, day) => (
                    <motion.div
                      key={day}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: day * 0.1 }}
                    >
                      <div className="text-[9px] font-ui text-ink-tertiary mb-1">Day {day + 1}</div>
                      <div className="flex flex-wrap gap-0.5 w-10 justify-center">
                        {Array.from({ length: 10 }, (_, card) => (
                          <div
                            key={card}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: '#4F7A5A' }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary text-center">
                  10 cards per day x 10 days = 100 cards in your deck
                </p>
              </div>
            ),
            caption: '10 new cards per day for 10 days. By day 10, you have 100 cards in the system and a manageable daily review load of 50-70 cards.',
          },
        ]}
      />

      {/* Research paragraph: Card quality */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The quality of your cards matters as much as the quantity. Michael Nielsen, a quantum computing researcher who has written extensively about spaced repetition, recommends the "minimum information principle": each card should test exactly one piece of knowledge. A card that asks "What are the three stages of memory?" is worse than three separate cards, each asking about one stage. The single-fact card is easier to grade (you either know it or you do not), and it allows FSRS to track each fact independently.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Piotr Wozniak, the creator of SuperMemo, compiled 20 rules for formulating knowledge into effective flashcards. The most impactful rules: understand before you memorize (do not make cards for things you do not comprehend), use cloze deletions (fill-in-the-blank) when possible, and add personal context. A card that says "Ebbinghaus discovered the forgetting curve in ___" with the answer "1885" is better than "When was the forgetting curve discovered?" because the cloze format provides contextual scaffolding that aids recall.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Card Quality ---- */}
      <VisualStepExplainer
        title="What Makes a Good Card"
        steps={[
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
                    <p className="text-[10px] font-ui font-semibold mb-2" style={{ color: '#B89466' }}>Weak card</p>
                    <div className="bg-white rounded-sm border border-line-soft p-2">
                      <p className="text-[10px] font-ui text-ink-secondary">Q: What are the three stages of memory?</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: Encoding, consolidation, retrieval</p>
                    </div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-2">Tests 3 facts at once. Hard to grade partially.</p>
                  </motion.div>
                  <motion.div
                    className="bg-surface rounded-calm border-2 p-4"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-[10px] font-ui font-semibold mb-2" style={{ color: '#4F7A5A' }}>Strong card</p>
                    <div className="bg-white rounded-sm border border-line-soft p-2">
                      <p className="text-[10px] font-ui text-ink-secondary">Q: The first stage of memory, where information enters through the hippocampus, is called ___.</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">A: Encoding</p>
                    </div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-2">One fact. Clear cloze format. Easy to grade.</p>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'The minimum information principle: one card, one fact. Cloze deletions (fill-in-the-blank) provide context that aids recall. FSRS can track each fact\'s difficulty independently.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-gentle border border-line-soft p-4 max-w-sm">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Card Quality Checklist</p>
                  {[
                    { check: 'Tests exactly one fact or concept', color: '#4F7A5A' },
                    { check: 'You understand the answer before making the card', color: '#4F7A5A' },
                    { check: 'Uses cloze deletion or short answer format', color: '#4F7A5A' },
                    { check: 'Includes personal context or a vivid image', color: '#B89466' },
                    { check: 'Answer is unambiguous -- only one correct response', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.check}
                      className="flex items-center gap-2 mb-2"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-ui text-ink-secondary">{item.check}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Run every card through this checklist before adding it to your deck. Bad cards create noise in the FSRS model. Good cards let the algorithm do its job accurately.',
          },
        ]}
      />

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the First-Week Plan
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Arrange these steps for your first week of building a deck
        </p>
        <SortSequence
          items={[
            { id: 'understand', label: 'Study the material until you understand it (do NOT make cards yet)' },
            { id: 'create', label: 'Create 10 cards following the minimum information principle' },
            { id: 'review-new', label: 'Do an initial learning pass on the 10 new cards' },
            { id: 'next-day', label: 'Next day: review all due cards before adding any new ones' },
            { id: 'repeat', label: 'Repeat for 10 days until you reach 100 cards' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why is adding 50 new cards in one day risky?',
            options: [
              { id: 'load', label: 'Each card generates future reviews, creating an unsustainable review load', correct: true },
              { id: 'hard', label: 'Because 50 cards is too hard to create', correct: false },
              { id: 'forget', label: 'Because you will forget them all immediately', correct: false },
            ],
          },
          {
            prompt: 'What does the "minimum information principle" mean for card design?',
            options: [
              { id: 'one', label: 'Each card should test exactly one fact', correct: true },
              { id: 'short', label: 'Each card should have as few words as possible', correct: false },
              { id: 'easy', label: 'Each card should be very easy to answer', correct: false },
            ],
          },
          {
            prompt: 'Why should you understand material before making cards about it?',
            options: [
              { id: 'meaning', label: 'Cards without understanding become rote patterns that do not transfer', correct: true },
              { id: 'speed', label: 'It makes card creation faster', correct: false },
              { id: 'rule', label: 'FSRS requires it', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="fsrs-lesson3-feynman"
        prompt="Explain to someone about to start using spaced repetition why adding 10 cards per day is wiser than adding 50 on the first day. Use the concept of review load and sustainability."
        rubric={[
          'You explained how each new card generates ongoing future reviews.',
          'You quantified the difference (10/day = ~70 reviews; 50/day = 200+ reviews).',
          'You connected unsustainable load to abandonment of the system.',
          'You recommended a specific, actionable pace.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What subject or material do you want to build your first 100 cards for? Why is this material important to you? What is your plan for creating 10 cards per day?"
          lessonId="memory.fsrs.first-100-cards"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 5 &middot; FSRS &amp; Daily Habit
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Understanding retention targets
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

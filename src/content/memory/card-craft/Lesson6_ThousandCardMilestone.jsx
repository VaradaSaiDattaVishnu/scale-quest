import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 6 -- The 1,000-Card Milestone
 * Planning and tracking your flashcard collection.
 * Visual progress chart. ReflectionJournal.
 */

export default function Lesson6_ThousandCardMilestone({
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
          The 1,000-Card Milestone
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Planning your collection, tracking your progress, sustaining the habit.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Reaching 1,000 well-crafted flashcards is a meaningful threshold. Michael Nielsen has written that his Anki deck -- which grew to tens of thousands of cards over several years -- fundamentally changed the way he reads and thinks. With a large, well-maintained deck, you stop losing the details of what you learn. Papers you read months ago remain accessible. Concepts from adjacent fields stay sharp enough to make unexpected connections. The deck becomes a form of extended cognition -- a reliable external memory that the spaced repetition algorithm keeps synchronized with your brain.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          But building to 1,000 cards requires sustainable habits, not heroic effort. Research on habit formation by Lally and colleagues (2010) found that it takes an average of 66 days for a new behavior to become automatic. The key variables are consistency and low friction, not intensity. Adding 10 well-crafted cards per day is far more sustainable than adding 50 in a burst and then abandoning the practice. At 10 cards per day, you reach 1,000 in just over three months -- and the daily review load remains manageable because of how spaced repetition distributes reviews over time.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Progress Planning ---- */}
      <VisualStepExplainer
        title="The Path to 1,000"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="flex items-end justify-between gap-1" style={{ height: '120px' }}>
                    {[
                      { label: 'Week 1', cards: 70, pct: 7 },
                      { label: 'Month 1', cards: 300, pct: 30 },
                      { label: 'Month 2', cards: 600, pct: 60 },
                      { label: 'Month 3', cards: 1000, pct: 100 },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center flex-1">
                        <motion.div
                          className="w-full rounded-t-sm mx-0.5"
                          style={{ backgroundColor: item.pct === 100 ? '#4F7A5A' : '#5B6F8C' }}
                          initial={{ height: 0 }}
                          animate={{ height: `${item.pct * 1.1}px` }}
                          transition={{ duration: 0.6, delay: i * 0.2 }}
                        >
                          <span className="block text-center text-[8px] font-ui font-bold text-white pt-1">
                            {item.cards}
                          </span>
                        </motion.div>
                        <span className="text-[8px] font-ui text-ink-tertiary mt-1">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-[10px] font-ui text-ink-secondary">10 cards/day = 1,000 in ~100 days</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'At 10 new cards per day, you reach 1,000 in about three months. The pace is gentle enough to maintain quality and avoid burnout.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm grid grid-cols-2 gap-3">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-lg font-bold" style={{ color: '#4F7A5A' }}>10</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">new cards/day</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-lg font-bold" style={{ color: '#5B6F8C' }}>~50</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">reviews/day at month 3</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-lg font-bold" style={{ color: '#5B6F8C' }}>15</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">minutes/day</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-lg font-bold" style={{ color: '#4F7A5A' }}>90%</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">target retention</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'The numbers stay manageable. At 1,000 cards with spaced repetition, you review about 50 cards daily -- roughly 15 minutes. The algorithm handles the scheduling.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <p className="text-[10px] font-ui font-bold text-center mb-3" style={{ color: '#4F7A5A' }}>PROGRESS TRACKER</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Cards created', value: 1000, max: 1000 },
                      { label: 'Cards mature (>21 day interval)', value: 650, max: 1000 },
                      { label: 'Leeches identified', value: 23, max: 1000 },
                      { label: 'Leeches fixed', value: 19, max: 23 },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between mb-0.5">
                          <span className="text-[9px] font-ui text-ink-secondary">{item.label}</span>
                          <span className="text-[9px] font-ui font-medium" style={{ color: '#4F7A5A' }}>{item.value}</span>
                        </div>
                        <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: '#4F7A5A' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.value / item.max) * 100}%` }}
                            transition={{ duration: 0.8, delay: i * 0.15 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Track not just how many cards you create, but how many mature, how many become leeches, and how many leeches you fix. Quality matters as much as quantity.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The most common reason people abandon spaced repetition is not that the system fails -- it is that they add cards faster than they can review them, creating an ever-growing backlog that feels overwhelming. Gwern Branwen, who has written extensively about his decade-long Anki practice, emphasizes the importance of treating your daily review as a non-negotiable minimum. If you miss a day, the algorithm compensates -- but if you miss a week, the backlog can feel insurmountable. The antidote is to set a sustainable pace from the beginning and to protect the review habit even on days when adding new cards is not possible.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A second insight from long-term users: periodic deck maintenance matters. Every few weeks, review your leeches and refactor them. Delete cards that no longer serve your goals. Update cards with new understanding. A living deck that evolves with your knowledge is far more valuable than a static archive of everything you once thought was important. The 1,000-card milestone is not an endpoint -- it is the beginning of a practice that, maintained well, compounds for years.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'At 10 new cards per day, how long does it take to reach 1,000 cards?',
            options: [
              { id: '100', label: 'About 100 days (just over 3 months)', correct: true },
              { id: '30', label: 'About 30 days', correct: false },
              { id: '365', label: 'About a year', correct: false },
            ],
          },
          {
            prompt: 'What is the most common reason people abandon spaced repetition?',
            options: [
              { id: 'backlog', label: 'They add cards faster than they can review, creating an overwhelming backlog', correct: true },
              { id: 'boring', label: 'The reviews are too boring', correct: false },
              { id: 'forget', label: 'They forget everything anyway', correct: false },
            ],
          },
          {
            prompt: 'What should you do with your deck every few weeks?',
            options: [
              { id: 'maintain', label: 'Review leeches, refactor bad cards, delete irrelevant ones', correct: true },
              { id: 'reset', label: 'Reset all card intervals to zero', correct: false },
              { id: 'nothing', label: 'Leave it alone -- the algorithm handles everything', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="card-craft-l6-feynman"
        prompt="Convince someone who quit Anki because they felt overwhelmed to try again, using what you know about sustainable pacing and deck maintenance."
        rubric={[
          'You identified the likely cause: adding too many cards without a sustainable pace.',
          'You gave a specific daily target (e.g., 10 cards/day).',
          'You mentioned the importance of regular deck maintenance.',
          'Your advice was practical and encouraging, not preachy.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What is your personal plan for building your flashcard collection? What subjects will you prioritize, and what daily pace feels sustainable for your life right now?"
          lessonId="memory.card-craft.thousand-card-milestone"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 6 of 6 &middot; Card-Craft
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next module: Faces and Names
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

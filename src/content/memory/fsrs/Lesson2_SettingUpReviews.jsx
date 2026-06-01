import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Setting Up Reviews
 * Daily review workflow design and habit formation.
 * Research grounding: Lally et al. (2010) on habit formation,
 * implementation intentions (Gollwitzer), and review session structure.
 */

export default function Lesson2_SettingUpReviews({
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
          Setting Up Your Daily Reviews
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The best algorithm is useless without the habit that feeds it.
        </p>
      </header>

      {/* Research paragraph: Habit formation */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 2010, Phillippa Lally and colleagues at University College London published the most rigorous study to date on how long habits actually take to form. They tracked 96 participants who chose a new daily behavior and measured how many days it took for the behavior to feel automatic. The average was 66 days -- not the "21 days" myth popularized by self-help books. The range was enormous: from 18 to 254 days, depending on the complexity of the behavior and the consistency of the cue.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Lally's most important finding was that missing a single day did not significantly derail habit formation. The critical factor was the overall consistency of the behavior over weeks, not perfection on any given day. This matters for daily reviews: the goal is not a perfect streak, but a strong average. Reviewing 6 days out of 7 is far more effective than reviewing 7 days in a row, then stopping for a week out of burnout.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Peter Gollwitzer's research on "implementation intentions" adds a practical tool. People who specify exactly when and where they will perform a behavior ("I will review my cards at 7:30 AM at my kitchen table, right after my coffee") are two to three times more likely to follow through than people who simply intend to do the behavior "sometime today." The specificity eliminates the decision cost -- you do not have to decide when to review, because you already decided.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Daily Review Workflow ---- */}
      <VisualStepExplainer
        title="The Daily Review Flow"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { time: '7:30 AM', action: 'Sit down with coffee. Open the app.', icon: '\u2615', color: '#5B6F8C' },
                    { time: '7:32', action: 'Review due cards first (these are most urgent).', icon: '\u21BB', color: '#4F7A5A' },
                    { time: '7:40', action: 'Add 5-10 new cards (if feeling fresh).', icon: '\u002B', color: '#B89466' },
                    { time: '7:45', action: 'Finish. Total: ~15 minutes.', icon: '\u2713', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.time}
                      className="flex items-center gap-3 mb-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-mono text-[10px] text-ink-tertiary">{item.time}</span>
                        <p className="text-xs font-ui text-ink-secondary">{item.action}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'A complete daily session takes 10-20 minutes. The key structure: review due cards first (non-negotiable), then optionally add new cards. Due reviews always come first.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-gentle border border-line-soft p-5 max-w-sm">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Implementation Intention Template</p>
                  <div className="space-y-2">
                    <div className="bg-line-soft rounded-calm p-3">
                      <p className="text-xs font-ui text-ink-secondary">
                        <span className="font-medium text-ink-primary">When:</span> Every morning at{' '}
                        <span className="font-mono px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(79,122,90,0.1)', color: '#4F7A5A' }}>______</span>
                      </p>
                    </div>
                    <div className="bg-line-soft rounded-calm p-3">
                      <p className="text-xs font-ui text-ink-secondary">
                        <span className="font-medium text-ink-primary">Where:</span> At my{' '}
                        <span className="font-mono px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(79,122,90,0.1)', color: '#4F7A5A' }}>______</span>
                      </p>
                    </div>
                    <div className="bg-line-soft rounded-calm p-3">
                      <p className="text-xs font-ui text-ink-secondary">
                        <span className="font-medium text-ink-primary">After:</span>{' '}
                        <span className="font-mono px-1 py-0.5 rounded-sm" style={{ backgroundColor: 'rgba(79,122,90,0.1)', color: '#4F7A5A' }}>______</span>
                        {' '}(existing habit)
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-3 text-center">
                    Anchoring to an existing habit (habit stacking) makes the new behavior 2-3x more likely to stick.
                  </p>
                </div>
              </div>
            ),
            caption: 'Gollwitzer\'s implementation intention format: specify when, where, and the trigger. "After I pour my coffee, I will open the app and review my due cards." The more specific, the more automatic.',
          },
        ]}
      />

      {/* Research paragraph: Session structure */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The structure of a review session matters as much as its frequency. FSRS presents cards in order of urgency: cards with the lowest retrievability (most likely to be forgotten) appear first. This means the first few minutes of your session are the most valuable. If you only have 5 minutes, those 5 minutes catch the cards most at risk of slipping below your retention target.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          A common mistake is spending too much time adding new cards and not enough time reviewing due cards. The review backlog is like debt: it accumulates interest. Each day you skip reviews, the overdue cards become harder to recall, which means more "Again" ratings, which means shorter intervals, which means more cards due tomorrow. The sustainable approach is to keep the due queue at zero every day (or as close to zero as possible) and add new cards only when the due queue is manageable.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: The Habit Loop ---- */}
      <VisualStepExplainer
        title="Building the Review Habit"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="240" height="200" viewBox="0 0 240 200" fill="none">
                  {/* Circular habit loop */}
                  <motion.path
                    d="M120 30 A80 80 0 0 1 200 110"
                    stroke="#5B6F8C"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <motion.path
                    d="M200 110 A80 80 0 0 1 120 190"
                    stroke="#B89466"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  />
                  <motion.path
                    d="M120 190 A80 80 0 0 1 40 110"
                    stroke="#4F7A5A"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                  <motion.path
                    d="M40 110 A80 80 0 0 1 120 30"
                    stroke="#5B6F8C"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  />
                  {/* Labels */}
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <circle cx="120" cy="30" r="20" fill="#5B6F8C" />
                    <text x="120" y="34" textAnchor="middle" fill="white" fontSize="8" className="font-ui">CUE</text>
                  </motion.g>
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <circle cx="200" cy="110" r="20" fill="#B89466" />
                    <text x="200" y="114" textAnchor="middle" fill="white" fontSize="7" className="font-ui">ROUTINE</text>
                  </motion.g>
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                    <circle cx="120" cy="190" r="20" fill="#4F7A5A" />
                    <text x="120" y="194" textAnchor="middle" fill="white" fontSize="7" className="font-ui">REWARD</text>
                  </motion.g>
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                    <circle cx="40" cy="110" r="20" fill="#5B6F8C" />
                    <text x="40" y="114" textAnchor="middle" fill="white" fontSize="7" className="font-ui">REPEAT</text>
                  </motion.g>
                </svg>
              </div>
            ),
            caption: 'The habit loop: Cue (coffee is ready) -> Routine (open app, review cards) -> Reward (completion satisfaction, growing streak) -> Repeat. After ~66 days, the cue triggers the routine automatically.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <p className="font-ui text-xs text-ink-primary font-semibold mb-3 text-center">Weekly Consistency Tracker</p>
                  <div className="flex gap-1.5 justify-center">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                      const completed = i !== 4 // Friday is missed
                      return (
                        <motion.div
                          key={day + i}
                          className="flex flex-col items-center gap-1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <div
                            className="w-8 h-8 rounded-calm flex items-center justify-center"
                            style={{
                              backgroundColor: completed ? 'rgba(79,122,90,0.15)' : 'rgba(91,111,140,0.08)',
                              borderWidth: '1.5px',
                              borderStyle: 'solid',
                              borderColor: completed ? '#4F7A5A' : 'rgba(91,111,140,0.15)',
                            }}
                          >
                            {completed && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[10px] font-ui text-ink-tertiary">{day}</span>
                        </motion.div>
                      )
                    })}
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary text-center mt-3">
                    6/7 days. The missed Friday does not reset progress. Consistency over perfection.
                  </p>
                </div>
              </div>
            ),
            caption: 'Lally\'s research showed that missing one day does not break habit formation. What matters is the overall pattern. 6 out of 7 days is excellent. Do not let one miss become two.',
          },
        ]}
      />

      {/* Research paragraph: Review backlog management */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          If you do accumulate a backlog (vacations, illness, life), the best strategy is not to power through all overdue cards in one marathon session. Research on the spacing effect shows that massed review (cramming all at once) is less effective than distributed review. Instead, set a daily cap -- say, 50 overdue cards per day on top of your normal new cards -- and chip away at the backlog over several days. FSRS will automatically reschedule overdue cards with shorter intervals to compensate for the missed review, so the algorithm handles the recovery for you.
        </p>
      </section>

      {/* ---- BranchScenario ---- */}
      <section className="my-10">
        <BranchScenario
          scenario="It is Wednesday morning. You have 45 due review cards and planned to add 10 new cards. But you only have 10 minutes before leaving for work. What do you do?"
          branches={[
            {
              id: 'new',
              label: 'Skip reviews and add 10 new cards instead',
              feedback: 'New cards add to tomorrow\'s due queue without clearing today\'s. This is how backlogs grow. Due reviews should always take priority over new cards.',
              isOptimal: false,
            },
            {
              id: 'due',
              label: 'Review as many due cards as possible in 10 minutes, skip new cards today',
              feedback: 'This is the right call. Due cards are at risk of dropping below your retention target. New cards can wait. Protecting existing knowledge comes before adding new knowledge.',
              isOptimal: true,
            },
            {
              id: 'half',
              label: 'Review 20 due cards and add 5 new cards',
              feedback: 'Better than skipping reviews entirely, but still leaves 25 overdue cards. When time is limited, clearing the due queue fully is more important than adding any new cards.',
              isOptimal: false,
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'According to Lally et al., how long does it take on average to form a new habit?',
            options: [
              { id: '21', label: '21 days', correct: false },
              { id: '66', label: '66 days', correct: true },
              { id: '365', label: '365 days', correct: false },
            ],
          },
          {
            prompt: 'What is an "implementation intention"?',
            options: [
              { id: 'goal', label: 'A general goal like "I will study more"', correct: false },
              { id: 'specific', label: 'A specific plan: when, where, and what trigger starts the behavior', correct: true },
              { id: 'app', label: 'A notification setting in a study app', correct: false },
            ],
          },
          {
            prompt: 'Why should due reviews always come before adding new cards?',
            options: [
              { id: 'risk', label: 'Due cards are at risk of falling below retention target', correct: true },
              { id: 'fun', label: 'Due cards are more fun to review', correct: false },
              { id: 'algorithm', label: 'The algorithm requires it', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="fsrs-lesson2-feynman"
        prompt="Explain to a friend who keeps adding new Anki cards but skipping due reviews why their approach is creating a growing problem. Use the concept of review debt."
        rubric={[
          'You explained that skipping due reviews causes cards to become harder, creating a growing backlog.',
          'You used the debt analogy or another concrete metaphor for accumulating overdue cards.',
          'You suggested the fix: due reviews first, new cards only when the queue is manageable.',
          'Your explanation would motivate change, not just inform.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Write your implementation intention for daily reviews. When will you review? Where? What existing habit will you anchor it to? Be as specific as possible."
          lessonId="memory.fsrs.setting-up-reviews"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 5 &middot; FSRS &amp; Daily Habit
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Building your first 100 cards
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

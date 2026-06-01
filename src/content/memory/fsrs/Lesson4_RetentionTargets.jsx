import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  ForgettingCurveViz,
} from '../../../components/visuals'

/**
 * Lesson 4 -- Retention Targets
 * What 0.90 desired retention means, how different targets affect
 * review load, and how to choose the right target for your goals.
 * Research grounding: desired retention, review load tradeoffs,
 * the FSRS benchmark data.
 */

export default function Lesson4_RetentionTargets({
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
          Retention Targets
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The number that controls everything: how much you remember vs. how much you review.
        </p>
      </header>

      {/* Research paragraph: What desired retention means */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In FSRS, "desired retention" is the probability that you will successfully recall a card when it comes up for review. A desired retention of 0.90 means the algorithm schedules reviews so that, on average, you have a 90% chance of remembering each card when it appears. The remaining 10% of the time, you will forget -- and that is by design. The algorithm uses those failures as data to update its model.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The relationship between desired retention and review load is non-linear and steep. Moving from 0.85 to 0.90 retention roughly doubles the number of daily reviews. Moving from 0.90 to 0.95 doubles it again. And pushing from 0.95 to 0.99 can increase the load by ten times. This is because higher retention requires shorter intervals between reviews, and shorter intervals compound into dramatically more total reviews.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Jarrett Ye's benchmark data from FSRS shows that 0.90 is the sweet spot for most learners: it provides strong retention (you remember 9 out of 10 cards) at a sustainable review cost. Medical students preparing for board exams might choose 0.92-0.95. Casual learners interested in general knowledge might be comfortable at 0.85. The right target depends on the consequences of forgetting -- how much does it matter if you miss a card?
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Retention vs Review Load ---- */}
      <VisualStepExplainer
        title="The Retention-Review Tradeoff"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="170" viewBox="0 0 280 170" fill="none">
                  {/* Axes */}
                  <line x1="50" y1="10" x2="50" y2="140" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  <line x1="50" y1="140" x2="270" y2="140" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  {/* Exponential curve */}
                  <motion.path
                    d="M55 130 C80 128 110 125 140 115 C170 100 200 70 230 30 L260 12"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  {/* Reference points */}
                  {[
                    { x: 80, y: 128, label: '0.80', reviews: '~40/day' },
                    { x: 140, y: 115, label: '0.85', reviews: '~60/day' },
                    { x: 190, y: 85, label: '0.90', reviews: '~100/day' },
                    { x: 225, y: 42, label: '0.95', reviews: '~200/day' },
                  ].map((pt, i) => (
                    <motion.g
                      key={pt.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 + i * 0.3 }}
                    >
                      <circle cx={pt.x} cy={pt.y} r="4" fill={pt.label === '0.90' ? '#4F7A5A' : '#5B6F8C'} />
                      <text x={pt.x} y={pt.y - 10} textAnchor="middle" className="font-ui" fill={pt.label === '0.90' ? '#4F7A5A' : '#5B6F8C'} fontSize="8" fontWeight="bold">{pt.label}</text>
                      <text x={pt.x} y={pt.y + 14} textAnchor="middle" className="font-ui" fill="#5B6F8C" fontSize="7">{pt.reviews}</text>
                    </motion.g>
                  ))}
                  {/* Axis labels */}
                  <text x="160" y="160" textAnchor="middle" className="font-ui" fill="#5B6F8C" fontSize="9">Desired retention</text>
                  <text x="25" y="80" className="font-ui" fill="#5B6F8C" fontSize="8" textAnchor="middle" transform="rotate(-90, 25, 80)">Daily reviews</text>
                </svg>
              </div>
            ),
            caption: 'The curve is exponential. Going from 0.85 to 0.90 costs ~40 extra reviews/day. Going from 0.90 to 0.95 costs ~100 extra. For most learners, 0.90 (highlighted) is the efficient sweet spot.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  {[
                    { target: '0.85', persona: 'Casual learner', desc: 'General knowledge, hobby learning', color: '#5B6F8C' },
                    { target: '0.90', persona: 'Standard', desc: 'Most learners. Best balance.', color: '#4F7A5A' },
                    { target: '0.95', persona: 'High-stakes', desc: 'Medical boards, bar exam prep', color: '#B89466' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.target}
                      className="bg-surface rounded-calm border-2 p-3 text-center"
                      style={{ borderColor: item.color }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p className="font-mono text-lg font-bold" style={{ color: item.color }}>{item.target}</p>
                      <p className="text-[10px] font-ui font-medium text-ink-primary mt-1">{item.persona}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Choose your target based on the stakes. Higher is not always better -- it comes with a steep cost in daily time. 0.90 works for the vast majority of learners.',
          },
        ]}
      />

      {/* Research paragraph: Why not 0.99 */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          It is natural to want the highest possible retention. But there is a profound asymmetry in the cost curve. The last few percentage points of retention are disproportionately expensive. A learner at 0.99 retention might need to review every card every 2-3 days. A learner at 0.90 might review the same card every 2-3 weeks. The 0.99 learner spends roughly 8-10 times more time reviewing, for only 9 percentage points of additional retention.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Robert Bjork, one of the most influential memory researchers of the modern era, coined the concept of "desirable difficulty." His research shows that a moderate rate of forgetting is not a failure of the system -- it is a feature. When you forget a card and re-learn it, the subsequent memory is stronger than if you had never forgotten it. This is called the "spacing effect with failure," and it is one of the reasons why 0.90 retention (with 10% forgetting) produces long-term memories that are more durable than 0.99 retention (with almost no forgetting).
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Forgetting as Feature ---- */}
      <VisualStepExplainer
        title="Forgetting as a Feature, Not a Bug"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6 items-center">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-gentle border-2 flex flex-col items-center justify-center"
                      style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.06)' }}
                    >
                      <span className="font-mono text-lg font-bold" style={{ color: '#B89466' }}>0.99</span>
                      <span className="text-[9px] font-ui text-ink-tertiary">retention</span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Almost never forgets</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Shallow re-strengthening</p>
                  </div>
                  <span className="text-ink-tertiary font-ui text-sm">vs</span>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-gentle border-2 flex flex-col items-center justify-center"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                    >
                      <span className="font-mono text-lg font-bold" style={{ color: '#4F7A5A' }}>0.90</span>
                      <span className="text-[9px] font-ui text-ink-tertiary">retention</span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Forgets ~10% of the time</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Deep re-strengthening</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Bjork\'s "desirable difficulty": when you forget and re-learn, the resulting memory is stronger. A system that never lets you forget is less efficient at building durable long-term memory.',
          },
        ]}
      />

      {/* Research paragraph: Adjusting targets */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          FSRS allows you to adjust your desired retention at any time. If you find that your daily review load is unsustainable, lowering the target by even 0.02 (e.g., from 0.90 to 0.88) can significantly reduce the load. Conversely, if you are breezing through reviews and want to push for higher accuracy, you can raise it. The algorithm immediately recalculates all card intervals when you change the target. This is one of FSRS's advantages over SM-2, which has no concept of desired retention as a tunable parameter.
        </p>
      </section>

      {/* ---- BranchScenario ---- */}
      <section className="my-10">
        <BranchScenario
          scenario="You are learning a foreign language casually for an upcoming vacation. You have set your desired retention to 0.95 and are finding the daily review load (180 cards) exhausting. What should you do?"
          branches={[
            {
              id: 'push',
              label: 'Push through -- higher retention is always better',
              feedback: 'Higher retention is not always better when the cost makes you want to quit. For casual vacation prep, 0.85-0.88 would give you strong enough recall with a much more sustainable review load.',
              isOptimal: false,
            },
            {
              id: 'lower',
              label: 'Lower retention to 0.87-0.88, matching your casual learning context',
              feedback: 'Exactly right. The stakes are low (vacation conversation, not a medical exam), so a lower retention target makes the daily practice sustainable while still providing solid recall. 0.87 might cut your reviews from 180 to under 80.',
              isOptimal: true,
            },
            {
              id: 'stop',
              label: 'Stop using the system -- it is too much work',
              feedback: 'The system is not too much work -- the target is too high for the context. Adjusting the target is much better than abandoning the habit entirely.',
              isOptimal: false,
            },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does a desired retention of 0.90 mean?',
            options: [
              { id: 'percent', label: '90% chance of recalling each card when it comes up for review', correct: true },
              { id: 'cards', label: 'You will remember 90 out of 100 cards forever', correct: false },
              { id: 'time', label: 'You spend 90% of your time reviewing', correct: false },
            ],
          },
          {
            prompt: 'Why is 0.90 considered the sweet spot for most learners?',
            options: [
              { id: 'balance', label: 'It balances strong retention with sustainable review load', correct: true },
              { id: 'max', label: 'It is the maximum the algorithm can achieve', correct: false },
              { id: 'default', label: 'It is the only option available', correct: false },
            ],
          },
          {
            prompt: 'What did Bjork mean by "desirable difficulty"?',
            options: [
              { id: 'forget', label: 'Some forgetting makes re-learning stronger, building more durable memory', correct: true },
              { id: 'hard', label: 'Flashcards should be as hard as possible', correct: false },
              { id: 'pain', label: 'Learning should feel painful to be effective', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="fsrs-lesson4-feynman"
        prompt="Explain to someone why chasing 0.99 retention is counterproductive for most learners. Use the concepts of the exponential cost curve and desirable difficulty."
        rubric={[
          'You explained the non-linear relationship between retention and review load.',
          'You quantified the cost difference (0.90 vs 0.95 vs 0.99).',
          'You mentioned Bjork\'s desirable difficulty -- that some forgetting strengthens long-term memory.',
          'You gave a practical recommendation for choosing a retention target.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What retention target makes sense for your current learning goals? Are you studying for high-stakes exams, casual learning, or something in between? What daily review load feels sustainable for you?"
          lessonId="memory.fsrs.retention-targets"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 5 &middot; FSRS &amp; Daily Habit
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Monthly re-optimization of FSRS parameters
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

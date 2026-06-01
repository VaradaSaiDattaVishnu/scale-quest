import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Monthly Re-optimization
 * When and how to re-optimize FSRS parameters as your review history grows.
 * Visual explanation of parameter drift and the re-optimization process.
 * Capstone lesson with FeynmanCheck and ReflectionJournal.
 */

export default function Lesson5_MonthlyReoptimization({
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
          Monthly Re-optimization
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your memory changes. The algorithm should change with it.
        </p>
      </header>

      {/* Research paragraph: Why parameters drift */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          FSRS calculates its scheduling based on a set of 19 parameters that model how your memory works -- your initial stability for different difficulty ratings, how stability grows with each review, and how difficulty affects forgetting. When you first start using FSRS, these parameters are set to population defaults derived from millions of Anki review records. They are a good starting point, but they are not calibrated to you.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          After you have accumulated a few hundred reviews, FSRS can optimize these parameters using your personal review history. The optimizer runs a gradient descent algorithm that adjusts each parameter to minimize the difference between what it predicted (your recall probability) and what actually happened (whether you remembered or forgot). The result is a personalized model that predicts your recall with significantly higher accuracy than the defaults.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But your memory is not static. Sleep patterns change, stress levels fluctuate, and the mix of material in your deck evolves. Research on memory consolidation by Born and Wilhelm (2012) shows that sleep quality alone can shift retention rates by 10-20%. As these factors change, the optimal parameters drift. Re-running the optimizer every 4-6 weeks -- or whenever you have accumulated 500+ new reviews -- keeps the model calibrated to your current memory performance.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Parameter Drift ---- */}
      <VisualStepExplainer
        title="Why Parameters Need Updating"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="160" viewBox="0 0 280 160" fill="none">
                  {/* Axes */}
                  <line x1="40" y1="10" x2="40" y2="130" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  <line x1="40" y1="130" x2="270" y2="130" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  {/* Actual memory behavior (wavy) */}
                  <motion.path
                    d="M40 70 C70 65 90 75 120 60 C150 50 170 65 200 55 C230 48 250 52 270 45"
                    stroke="#5B6F8C"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                  {/* Old parameters (straight, diverging) */}
                  <motion.path
                    d="M40 70 L270 70"
                    stroke="#B89466"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  {/* Optimized parameters (following the curve) */}
                  <motion.path
                    d="M40 70 C70 66 90 73 120 62 C150 53 170 63 200 56 C230 50 250 51 270 47"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                  {/* Gap annotations */}
                  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                    <line x1="200" y1="55" x2="200" y2="70" stroke="#B89466" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="208" y="65" className="font-ui" fill="#B89466" fontSize="7">gap = drift</text>
                  </motion.g>
                  {/* Legend */}
                  <text x="50" y="150" className="font-ui" fill="#5B6F8C" fontSize="8">-- Your actual memory behavior</text>
                  <line x1="50" y1="155" x2="70" y2="155" stroke="#B89466" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="75" y="158" className="font-ui" fill="#B89466" fontSize="8">Stale parameters</text>
                  <line x1="160" y1="155" x2="180" y2="155" stroke="#4F7A5A" strokeWidth="2.5" />
                  <text x="185" y="158" className="font-ui" fill="#4F7A5A" fontSize="8">Re-optimized</text>
                </svg>
              </div>
            ),
            caption: 'Your actual memory behavior (gray) shifts over time due to sleep, stress, and material changes. Stale parameters (amber dashed) drift away from reality. Re-optimization (green) snaps the model back to accuracy.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-4 items-center">
                  {[
                    { month: 'Month 1', status: 'Default params', accuracy: '~85%', color: '#5B6F8C' },
                    { month: 'Month 2', status: 'First optimization', accuracy: '~93%', color: '#4F7A5A' },
                    { month: 'Month 4', status: 'Re-optimized', accuracy: '~96%', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.month}
                      className="bg-surface rounded-calm border border-line-soft p-3 text-center flex-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <p className="text-[10px] font-ui text-ink-tertiary">{item.month}</p>
                      <p className="text-[10px] font-ui font-medium text-ink-primary mt-1">{item.status}</p>
                      <p className="font-mono text-sm font-bold mt-1" style={{ color: item.color }}>
                        {item.accuracy}
                      </p>
                      <p className="text-[9px] font-ui text-ink-tertiary">prediction accuracy</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Prediction accuracy improves with each optimization. Default parameters start at ~85% accuracy. After your first optimization (with 300+ reviews), accuracy jumps to 93%+. Regular re-optimization keeps it above 95%.',
          },
        ]}
      />

      {/* Research paragraph: The optimization process */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The re-optimization process itself is straightforward. In Anki with the FSRS plugin, you navigate to the deck options, click "Optimize," and wait a few seconds while the algorithm crunches your review history. The optimizer examines every review you have done -- the card's state before the review, the grade you gave, and the time elapsed since the last review -- and adjusts parameters to make its predictions match your actual outcomes as closely as possible.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Jarrett Ye recommends re-optimizing after every 500 new reviews, or roughly once per month for active users. The minimum data requirement for meaningful optimization is about 300 reviews. Before that threshold, the default parameters are likely better than what the optimizer can produce, because there is not enough data to fit the model reliably. This is a classic bias-variance tradeoff from machine learning: with too little data, the model overfits to noise rather than learning your true patterns.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Re-Optimization Workflow ---- */}
      <VisualStepExplainer
        title="The Monthly Re-Optimization Cycle"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { step: '1', text: 'Review normally for 4-6 weeks (accumulate 500+ reviews)', color: '#5B6F8C' },
                    { step: '2', text: 'Open deck options and run the FSRS optimizer', color: '#4F7A5A' },
                    { step: '3', text: 'Check the log: compare old vs new prediction accuracy', color: '#B89466' },
                    { step: '4', text: 'Apply the new parameters (intervals recalculate automatically)', color: '#4F7A5A' },
                    { step: '5', text: 'Continue reviewing. Repeat in 4-6 weeks.', color: '#5B6F8C' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center gap-3 mb-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
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
            caption: 'The cycle is simple: use the system, accumulate data, optimize, repeat. Each cycle tightens the model\'s fit to your memory patterns.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-gentle border border-line-soft p-5 max-w-sm">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">When to Re-Optimize</p>
                  <div className="space-y-2">
                    {[
                      { trigger: 'Every ~500 new reviews', icon: '\u2328', recommended: true },
                      { trigger: 'After a major life change (sleep, schedule shift)', icon: '\u21BB', recommended: true },
                      { trigger: 'When actual retention drifts from target by >5%', icon: '\u26A0', recommended: true },
                      { trigger: 'After adding a large batch of new material', icon: '\u002B', recommended: false },
                    ].map((item, i) => (
                      <motion.div
                        key={item.trigger}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-sm w-6 text-center">{item.icon}</span>
                        <span className="text-[10px] font-ui text-ink-secondary flex-1">{item.trigger}</span>
                        <span
                          className="text-[9px] font-ui px-1.5 py-0.5 rounded-sm"
                          style={{
                            backgroundColor: item.recommended ? 'rgba(79,122,90,0.1)' : 'rgba(91,111,140,0.1)',
                            color: item.recommended ? '#4F7A5A' : '#5B6F8C',
                          }}
                        >
                          {item.recommended ? 'recommended' : 'optional'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Multiple triggers suggest it is time to re-optimize. The 500-review threshold is the most reliable. Life changes and retention drift are also good signals.',
          },
        ]}
      />

      {/* Research paragraph: What the parameters mean */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          After optimization, you can inspect the 19 parameters. The first four (w0-w3) control initial stability -- how long a new card lasts in memory after the first review, depending on the grade. The next group (w4-w7) controls how stability grows with successful reviews. The remaining parameters handle difficulty estimation and the interaction between difficulty and stability growth.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          You do not need to understand every parameter to use FSRS effectively. The practical takeaway is this: the optimizer converts your messy, noisy review history into a clean mathematical model of your memory. The better the model, the more efficiently it schedules reviews -- which means less time reviewing for the same retention, or better retention for the same time investment. This is the core promise of FSRS: it turns your data into your advantage.
        </p>
      </section>

      {/* ---- DragMatch Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match the Optimization Concept
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Drag each concept to its description
        </p>
        <DragMatch
          pairs={[
            { left: 'Parameter drift', right: 'Model accuracy degrades as your memory patterns change' },
            { left: 'Gradient descent', right: 'Algorithm that adjusts parameters to minimize prediction error' },
            { left: 'Bias-variance tradeoff', right: 'Too little data causes overfitting; wait for 300+ reviews' },
            { left: 'Re-optimization', right: 'Re-running the optimizer to update parameters with new data' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'How often should you re-optimize FSRS parameters?',
            options: [
              { id: 'daily', label: 'Every day', correct: false },
              { id: 'monthly', label: 'Every 4-6 weeks or every 500 reviews', correct: true },
              { id: 'never', label: 'Once at the beginning, then never again', correct: false },
            ],
          },
          {
            prompt: 'What is the minimum number of reviews needed for meaningful optimization?',
            options: [
              { id: '50', label: '50 reviews', correct: false },
              { id: '300', label: 'About 300 reviews', correct: true },
              { id: '5000', label: '5,000 reviews', correct: false },
            ],
          },
          {
            prompt: 'Why do parameters drift over time?',
            options: [
              { id: 'bug', label: 'There is a bug in the algorithm', correct: false },
              { id: 'change', label: 'Your memory behavior changes due to sleep, stress, and material mix', correct: true },
              { id: 'decay', label: 'The parameters naturally decay like memories', correct: false },
            ],
          },
        ]}
      />

      {/* ---- Prompt ---- */}
      <section className="my-10">
        <Prompt
          id="fsrs-reoptimization-plan"
          question="Set a recurring reminder for yourself: what day of the month will you run the FSRS optimizer? Where will you note the before/after accuracy numbers?"
          onAnswer={savePromptAnswer}
        />
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="fsrs-lesson5-feynman"
        prompt="Explain to a friend who has been using Anki for 6 months but has never re-optimized FSRS why their scheduling might be less efficient than it could be, and walk them through the re-optimization process."
        rubric={[
          'You explained that default parameters are population averages, not personalized.',
          'You described parameter drift and why it happens.',
          'You walked through the practical steps of running the optimizer.',
          'You mentioned the improvement in prediction accuracy (from ~85% to ~95%).',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Reflect on your journey through this module. What is the most important thing you have learned about spaced repetition? How has your understanding of memory changed from when you started? What habits will you carry forward?"
          lessonId="memory.fsrs.monthly-reoptimization"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 5 &middot; FSRS &amp; Daily Habit
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Your memory practice foundation is in place.
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Complete Module
          </button>
        </div>
      </footer>
    </article>
  )
}

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  ForgettingCurveViz,
  SpacingEffectViz,
  InteractiveTimeline,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- The Forgetting Curve (and Why It's Good News)
 * VISUAL + RESEARCH REWRITE: visual illustrations interspersed with
 * research-backed text paragraphs for deeper understanding.
 */

export default function Lesson2_ForgettingCurve({
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
          The Forgetting Curve
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your brain forgets predictably. That predictability is your advantage.
        </p>
      </header>

      {/* Research paragraph: Ebbinghaus 1885 */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1885, a German psychologist named Hermann Ebbinghaus did something no scientist had attempted before: he turned memory into a measurable phenomenon. Working alone, he memorized lists of nonsense syllables -- meaningless combinations like DAX, BUP, and ZOL -- then tested himself at precise intervals over days, weeks, and months. He chose nonsense syllables deliberately, stripping away meaning so he could study raw retention without the confound of prior knowledge.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          What he discovered was both discouraging and liberating. Forgetting follows a mathematical curve: steep at first, then gradually leveling off. Within twenty minutes of learning something, roughly 40% is already gone. Within a day, two-thirds has faded. But the curve is not a death sentence -- it is a map. Because forgetting is predictable, it can be interrupted. That predictability is what makes every spaced repetition system possible, from Leitner boxes to the algorithm running in this app right now.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Ebbinghaus Discovery ---- */}
      <VisualStepExplainer
        title="What Ebbinghaus Found (1885)"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-3">
                  {['DAX', 'BUP', 'ZOL', 'MIB', 'KER'].map((syl, i) => (
                    <motion.div
                      key={syl}
                      className="w-14 h-14 rounded-calm bg-surface border border-line-soft flex items-center justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span className="font-mono text-sm text-ink-secondary">{syl}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                  style={{ borderColor: '#5B6F8C' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="text-xs font-ui" style={{ color: '#5B6F8C' }}>Months</span>
                </motion.div>
              </div>
            ),
            caption: 'Hermann Ebbinghaus memorized nonsense syllables and tested himself at intervals. For months. Alone. What he found changed everything.',
          },
          {
            visual: (
              <ForgettingCurveViz showReviews={false} compact={true} />
            ),
            caption: 'He discovered that forgetting follows a curve: steep drop in the first hours, then gradually leveling off. This happens to everyone, with every kind of material.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <div className="w-full flex items-end justify-around" style={{ height: '160px' }}>
                  {[
                    { label: '20 min', pct: 58, color: '#B89466' },
                    { label: '1 hour', pct: 44, color: '#B89466' },
                    { label: '1 day', pct: 33, color: '#A66B5A' },
                    { label: '1 week', pct: 25, color: '#A66B5A' },
                    { label: '1 month', pct: 21, color: '#A66B5A' },
                  ].map((item, i) => (
                    <div key={item.label} className="flex flex-col items-center">
                      <motion.div
                        className="rounded-t-sm"
                        style={{
                          width: '40px',
                          backgroundColor: item.color,
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${item.pct * 1.5}px` }}
                        transition={{ duration: 0.5, delay: i * 0.2 }}
                      >
                        <span className="block text-center text-[9px] font-ui font-bold text-white pt-1">
                          {item.pct}%
                        </span>
                      </motion.div>
                      <span className="text-[9px] font-ui text-ink-tertiary mt-1">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'After just 20 minutes, 42% is already gone. After one day, two-thirds. Most forgetting happens early.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <motion.p
                  className="font-ui text-lg font-semibold text-center"
                  style={{ color: '#4F7A5A' }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  But here is the good news:
                </motion.p>
                <motion.p
                  className="font-ui text-2xl font-bold text-center max-w-sm"
                  style={{ color: '#4F7A5A' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Each review makes the curve flatter.
                </motion.p>
              </div>
            ),
            caption: 'Forgetting is not a wall. It is a slope, and you can change the angle. Each well-timed review makes the next drop less steep.',
          },
        ]}
      />

      {/* Research paragraph: The mathematics of forgetting */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Ebbinghaus described forgetting with an exponential decay function -- memory strength drops rapidly at first, then tapers off. But what makes this useful is the second part of his discovery: each time you review material at the right moment, the curve resets with a shallower slope. The first forgetting curve might drop to 50% in a day. After a well-timed review, the next curve might take three days to drop the same amount. After another review, a week. Then a month. The intervals keep growing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Modern researchers have refined Ebbinghaus's curve considerably. We now know that the rate of forgetting depends on how deeply the material was encoded, how many times it has been retrieved, and how much competing information has been encountered since. But the core insight holds: forgetting is not random, it is lawful, and that lawfulness is what gives you leverage.
        </p>
      </section>

      {/* ---- INTERACTIVE FORGETTING CURVE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Change the Curve Yourself
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Click "Add Review" to see how each review changes the forgetting curve
        </p>
        <ForgettingCurveViz autoPlay={true} showReviews={true} />
      </section>

      {/* ---- Short bridge ---- */}
      <p className="font-reading text-ink-secondary text-center max-w-lg mx-auto my-6 leading-relaxed">
        Two effects combine to make this work: spacing your study sessions over time,
        and testing yourself instead of re-reading.
      </p>

      {/* Research paragraph: Spacing effect */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 2006, Cepeda and colleagues published a landmark meta-analysis of 184 studies on the spacing effect. Their conclusion was unambiguous: distributing study sessions over time produces substantially better long-term retention than massing the same amount of study into a single session. The effect size is large and consistent across ages, materials, and domains. Whether you are learning vocabulary, surgical procedures, or music, spacing wins.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The testing effect -- practicing retrieval rather than re-reading -- amplifies spacing further. Roediger and Karpicke showed in 2006 that a single retrieval attempt is more effective for long-term memory than an additional study session of equal duration. When you combine spacing and testing, the gains multiply. You are not just slowing the forgetting curve -- you are actively reshaping it with each well-timed retrieval.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Spacing vs Cramming ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Cramming vs. Spacing
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Same total study time. Watch what happens over a week.
        </p>
        <SpacingEffectViz />
      </section>

      {/* ---- INTERACTIVE TIMELINE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Place Your Reviews
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Add reviews at different time points. Watch memory strength change.
        </p>
        <InteractiveTimeline />
      </section>

      {/* Research paragraph: FSRS and adaptive algorithms */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Early spaced repetition systems used fixed schedules -- review after one day, then three days, then a week, and so on. But not all memories decay at the same rate. A word that you found easy to recall likely has a different forgetting curve than one you struggled with. Modern algorithms like FSRS (Free Spaced Repetition Scheduler) address this by modeling each item's forgetting curve individually, based on your history of successes and failures with that specific item.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The result is a system that learns your patterns as you learn. Items you find easy get pushed further into the future. Items you struggle with come back sooner. Over time, the algorithm converges on the minimum number of reviews needed to maintain each memory above a target retention threshold -- typically around 90%. This is not magic; it is applied Ebbinghaus, refined by a century of research and modern machine learning.
        </p>
      </section>

      {/* ---- Short bridge about adaptive ---- */}
      <div className="my-8 bg-surface rounded-gentle border border-line-soft p-5 max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(91, 111, 140, 0.15)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L14 14H2L8 2Z" stroke="#5B6F8C" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M8 6V9" stroke="#5B6F8C" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="8" cy="11.5" r="0.75" fill="#5B6F8C" />
            </svg>
          </div>
          <div>
            <p className="font-ui text-sm text-ink-primary font-medium mb-1">
              Why adaptive beats fixed
            </p>
            <p className="font-ui text-xs text-ink-secondary leading-relaxed">
              Not all memories decay at the same rate. Modern systems like FSRS
              calculate the optimal review time per item, based on how easily you
              recalled it. The system learns your patterns as you learn.
            </p>
          </div>
        </div>
      </div>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'When does most forgetting happen?',
            options: [
              { id: 'early', label: 'In the first hours after learning', correct: true },
              { id: 'week', label: 'After about a week', correct: false },
              { id: 'even', label: 'Evenly over time', correct: false },
            ],
          },
          {
            prompt: 'What does each well-timed review do to the forgetting curve?',
            options: [
              { id: 'steep', label: 'Makes the next drop steeper', correct: false },
              { id: 'flat', label: 'Makes the next drop flatter', correct: true },
              { id: 'nothing', label: 'Has no effect on the curve shape', correct: false },
            ],
          },
          {
            prompt: 'Why is spacing more effective than cramming?',
            options: [
              { id: 'more', label: 'You spend more total time studying', correct: false },
              { id: 'sleep', label: 'Sleep consolidation happens between sessions', correct: true },
              { id: 'easy', label: 'It feels easier and less stressful', correct: false },
            ],
          },
        ]}
      />

      {/* Research paragraph: Why this matters personally */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          The forgetting curve is often presented as bad news -- "you'll forget 70% by tomorrow!" -- but the real message is the opposite. Forgetting is not a flaw in your brain; it is a design feature. Your brain forgets most things because most things are not worth remembering. The curve exists to clear noise and preserve signal. The strategies in this course -- spacing, retrieval, and adaptive scheduling -- work with that design, not against it. You do not need to fight your brain. You need to give it the right signals about what matters.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="lesson2-feynman"
        prompt="Without using the word 'curve' or 'graph', explain to a friend why studying something once feels like enough but isn't."
        rubric={[
          'You described forgetting as a process that happens whether or not you tried hard.',
          'You named retrieval (testing) as the lever, not re-reading.',
          'You named spacing as making the lever stronger.',
          'Your friend would be able to act on what you said.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 6 &middot; Foundations
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Why memory palaces work
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

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Your Twenty Rules
 * Write your personal 20 rules for memory. ReflectionJournal.
 */

export default function Lesson3_TwentyRules({
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
          Your Twenty Rules
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Wozniak wrote his. Now write yours.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Piotr Wozniak's "Twenty Rules of Formulating Knowledge" codified decades of personal experimentation into a set of principles that millions of spaced repetition users have followed. But Wozniak himself has said that his rules are a starting point, not a final destination. Every serious learner eventually develops their own set of principles -- rules that reflect their personal learning style, their domain, their failures, and their hard-won insights. The act of writing your own rules is itself a powerful learning exercise: it forces you to synthesize everything you have learned into a coherent personal framework.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on metacognition -- thinking about your own thinking -- shows that learners who can articulate their learning strategies perform significantly better than those who cannot (Flavell, 1979; Schraw & Dennison, 1994). Writing your own rules is an act of metacognition. It requires you to reflect on what has worked for you, what has not, and why. The rules you write today will evolve as your practice deepens, but having an explicit set of principles to start from gives your practice structure and intentionality.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Building Your Rules ---- */}
      <VisualStepExplainer
        title="From Wozniak's Rules to Yours"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6 items-start">
                  <div className="text-center flex-1">
                    <div className="bg-surface rounded-calm border border-line-soft p-3">
                      <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#5B6F8C' }}>WOZNIAK'S RULES</p>
                      <div className="space-y-1 text-left">
                        {['Understand first', 'Minimum information', 'Use cloze deletion', 'Use imagery', 'Avoid sets'].map((rule, i) => (
                          <p key={i} className="text-[9px] font-ui text-ink-tertiary">{i + 1}. {rule}</p>
                        ))}
                        <p className="text-[9px] font-ui text-ink-tertiary">...</p>
                      </div>
                    </div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">General principles</p>
                  </div>
                  <motion.div
                    className="flex items-center self-center"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                      <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#4F7A5A" strokeWidth="2" />
                    </svg>
                  </motion.div>
                  <div className="text-center flex-1">
                    <div className="bg-surface rounded-calm border-2 p-3" style={{ borderColor: '#4F7A5A' }}>
                      <p className="text-[10px] font-ui font-bold mb-2" style={{ color: '#4F7A5A' }}>YOUR RULES</p>
                      <div className="space-y-1 text-left">
                        {['Based on your experience', 'Shaped by your domain', 'Tested by your failures', 'Refined by your practice', 'Uniquely yours'].map((item, i) => (
                          <p key={i} className="text-[9px] font-ui text-ink-secondary">{i + 1}. {item}</p>
                        ))}
                        <p className="text-[9px] font-ui text-ink-secondary">...</p>
                      </div>
                    </div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">Personal principles</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Wozniak\'s rules are a starting template. Your rules should reflect your personal experience: what techniques worked best for you, what mistakes you have made, what you have discovered on your own.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>CATEGORIES TO CONSIDER</p>
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {[
                    { cat: 'Understanding', prompt: 'What do I need to do before I start memorizing?' },
                    { cat: 'Encoding', prompt: 'How do I create strong memory traces?' },
                    { cat: 'Card Design', prompt: 'What makes a good flashcard for my domain?' },
                    { cat: 'Review Habits', prompt: 'What daily practice keeps me on track?' },
                    { cat: 'Palace Craft', prompt: 'How do I build and maintain my palaces?' },
                    { cat: 'Recovery', prompt: 'What do I do when I fall behind or feel stuck?' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-[10px] font-ui text-ink-primary font-medium">{item.cat}</p>
                      <p className="text-[8px] font-ui text-ink-tertiary italic mt-0.5">{item.prompt}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Six categories to organize your thinking. You do not need exactly 20 rules -- but aim for at least 10 and no more than 25. Each rule should be concrete enough to act on.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <p className="text-[10px] font-ui font-bold mb-3" style={{ color: '#5B6F8C' }}>EXAMPLE PERSONAL RULES</p>
                  <div className="space-y-2">
                    {[
                      '"Never make a flashcard for something I cannot explain in my own words."',
                      '"Walk my palace once before bed -- it takes 90 seconds and protects the day\'s work."',
                      '"When a card becomes a leech, diagnose before deleting."',
                      '"If I miss three days of reviews, restart with just 10 reviews/day until the habit returns."',
                      '"For names: feature first, image second, use the name aloud within 10 seconds."',
                    ].map((rule, i) => (
                      <motion.p
                        key={i}
                        className="text-[9px] font-ui text-ink-secondary italic pl-3 border-l-2"
                        style={{ borderColor: '#4F7A5A' }}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        {rule}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Each rule is specific, actionable, and born from real experience. These are not abstract principles -- they are instructions to your future self.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Your rules will change. The rules you write today will be revised as your practice deepens and your domain shifts. Wozniak himself has updated his rules multiple times over the decades. The value is not in getting the rules perfect on the first attempt -- it is in having a living document that captures your current understanding and serves as a foundation for deliberate improvement. Revisit your rules every few months, update them, add new ones, and retire rules that no longer serve you.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="integration-l3-feynman"
        prompt="Share your top five personal rules for memory and explain why each one matters. Each rule should come from something you have experienced or learned in this course."
        rubric={[
          'You listed at least five specific, actionable rules.',
          'Each rule is grounded in personal experience or course content.',
          'The rules cover at least two different categories (e.g., encoding, review, recovery).',
          'Someone else could follow your rules and benefit from them.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Write your personal twenty rules for memory. Include rules about understanding, encoding, card design, review habits, palace maintenance, and recovery from setbacks. Make each rule specific enough to act on."
          lessonId="memory.integration.twenty-rules"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Integration
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Final Reflection
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

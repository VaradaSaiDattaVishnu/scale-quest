import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  SleepConsolidationViz,
  AnimatedBrain,
  SpacingEffectViz,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 6 -- Consolidation and Sleep
 * VISUAL + RESEARCH REWRITE: visual illustrations interspersed with
 * research-backed text paragraphs for deeper understanding.
 */

export default function Lesson6_ConsolidationAndSleep({
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
          Consolidation & Sleep
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          What your brain does after you stop studying may matter more than the studying itself.
        </p>
      </header>

      {/* Research paragraph: Sleep and memory -- Walker 2017 */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In his 2017 book "Why We Sleep," neuroscientist Matthew Walker synthesized decades of research into a striking claim: sleep is not merely restorative for the body -- it is the single most important thing you can do for your memory. During waking hours, the hippocampus acts as a temporary holding area, capturing new experiences as fragile traces. But the hippocampus has limited capacity. Without sleep, it fills up, and new learning suffers. Studies show that after just one night of sleep deprivation, the ability to form new memories drops by roughly 40%.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          What makes sleep essential for memory is not just the rest it provides. During specific sleep stages, the brain actively processes, reorganizes, and stabilizes the memories encoded during the day. This is consolidation -- the second stage of memory that sits between encoding and retrieval. Without it, even perfectly encoded information remains fragile and easily disrupted. Consolidation is not optional; it is as essential to memory as encoding itself.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Quiet Work ---- */}
      <VisualStepExplainer
        title="The Third Stage of Memory"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4">
                  {['Encoding', 'Consolidation', 'Retrieval'].map((stage, i) => (
                    <motion.div
                      key={stage}
                      className={`flex flex-col items-center ${i === 1 ? '' : 'opacity-40'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: i === 1 ? 1 : 0.4, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div
                        className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-1"
                        style={{
                          borderColor: i === 0 ? '#B89466' : i === 1 ? '#5B6F8C' : '#4F7A5A',
                          backgroundColor: i === 1 ? 'rgba(91, 111, 140, 0.1)' : 'transparent',
                        }}
                      >
                        <span className="text-lg">{['📥', '🌙', '📤'][i]}</span>
                      </div>
                      <span className="text-[10px] font-ui text-ink-secondary">{stage}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Between encoding and retrieval, something essential happens that you cannot see or feel. Consolidation turns fragile traces into durable memories.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative w-full max-w-xs mx-auto">
                  {/* Night cycle visualization */}
                  <div className="flex items-end justify-around" style={{ height: '140px' }}>
                    {[
                      { label: 'SWS', h: 90, color: '#5B6F8C', desc: 'Deep' },
                      { label: 'REM', h: 40, color: '#7B5D8C', desc: 'Dream' },
                      { label: 'SWS', h: 65, color: '#5B6F8C', desc: 'Deep' },
                      { label: 'REM', h: 60, color: '#7B5D8C', desc: 'Dream' },
                      { label: 'SWS', h: 40, color: '#5B6F8C', desc: 'Deep' },
                      { label: 'REM', h: 100, color: '#9B6DA8', desc: 'Dream' },
                    ].map((phase, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <motion.div
                          className="rounded-t-sm"
                          style={{
                            width: '28px',
                            backgroundColor: phase.color,
                            opacity: 0.7,
                          }}
                          initial={{ height: 0 }}
                          animate={{ height: phase.h }}
                          transition={{ duration: 0.5, delay: i * 0.2 }}
                        />
                        <span className="text-[7px] font-ui text-ink-tertiary mt-1">{phase.label}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[9px] font-ui text-ink-tertiary">Early night</span>
                    <span className="text-[9px] font-ui text-ink-tertiary">Late night</span>
                  </div>
                </div>
              </div>
            ),
            caption: 'Sleep cycles through stages. Early night is rich in slow-wave sleep (deep). Late night is rich in REM (dreams). Both serve memory differently.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                  <motion.div
                    className="rounded-calm p-4 border-2 text-center"
                    style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#5B6F8C' }}>
                      Slow-Wave Sleep
                    </p>
                    <div className="space-y-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1 rounded-full"
                          style={{ backgroundColor: '#5B6F8C' }}
                          animate={{ scaleX: [0.3, 1, 0.3] }}
                          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Replays memories. Transfers traces from hippocampus to cortex.
                    </p>
                  </motion.div>
                  <motion.div
                    className="rounded-calm p-4 border-2 text-center"
                    style={{ borderColor: '#7B5D8C', backgroundColor: 'rgba(123,93,140,0.06)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xs font-ui font-semibold mb-2" style={{ color: '#7B5D8C' }}>
                      REM Sleep
                    </p>
                    <div className="space-y-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1 rounded-full"
                          style={{ backgroundColor: '#7B5D8C' }}
                          animate={{ scaleX: [0.5, 1, 0.5, 0.8, 0.5] }}
                          transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Integrates new memories with existing ones. Finds patterns.
                    </p>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'Slow-wave sleep FILES memories. REM sleep CONNECTS them. You need both for full consolidation.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 mx-auto mb-2 flex items-center justify-center"
                      style={{ borderColor: '#A66B5A' }}
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-2xl">🍞</span>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-secondary font-medium">Cramming</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">
                      Bread pulled out before baking is done. Looks right, collapses.
                    </p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-full border-2 mx-auto mb-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-2xl">🥖</span>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-secondary font-medium">Spaced Study</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">
                      Sleep between sessions. Each night's rest completes the baking.
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Cramming can get you through a test tomorrow. But the trace was used before it was finished. Within days, it crumbles.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-3 mb-3">
                    {[1, 2, 3].map((day) => (
                      <motion.div
                        key={day}
                        className="flex-1 rounded-calm border border-line-soft p-2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: day * 0.3 }}
                      >
                        <p className="text-[9px] font-ui text-ink-tertiary">Day {day}</p>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <div className="w-6 h-6 rounded-sm flex items-center justify-center text-xs" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>📖</div>
                          <span className="text-[8px] font-ui text-ink-tertiary">+</span>
                          <div className="w-6 h-6 rounded-sm flex items-center justify-center text-xs" style={{ backgroundColor: 'rgba(91,111,140,0.15)' }}>💤</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="h-2 bg-line-soft rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: '#4F7A5A' }}
                      initial={{ width: '0%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 1, delay: 1.5 }}
                    />
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary text-center mt-1">
                    Three sessions + three sleep cycles = dramatically more durable
                  </p>
                </div>
              </div>
            ),
            caption: 'Each night of sleep gives you a consolidation window. Three spaced sessions give you three windows. One cramming session gives you zero.',
          },
        ]}
      />

      {/* Research paragraph: Slow-wave replay and REM consolidation */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          During slow-wave sleep (SWS), which dominates the first half of the night, the brain replays memories at high speed. Researchers have recorded hippocampal neurons in rats that fire in the same sequence during sleep as they did during waking exploration -- but compressed to roughly one-fifth the original speed. This replay is not random; it selectively strengthens memories that the brain has tagged as important. As each memory is replayed, it is gradually transferred from the hippocampus to the neocortex, where it becomes part of your long-term knowledge.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          REM sleep, which dominates the second half of the night, serves a different but complementary function. During REM, the brain integrates newly consolidated memories with existing knowledge, discovering connections and patterns that were not apparent during waking hours. This is why you sometimes wake up with a solution to a problem you went to bed struggling with. REM sleep is not filing -- it is creative synthesis. Cutting your sleep short by even ninety minutes can eliminate most of your REM periods, stripping away this integration phase entirely.
        </p>
      </section>

      {/* ---- INTERACTIVE SLEEP VISUALIZATION ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Watch a Night of Sleep
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          See memories migrate from hippocampus to cortex. Drag the timeline or press play.
        </p>
        <SleepConsolidationViz />
      </section>

      {/* Research paragraph: Napping studies */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          You do not have to wait until nighttime to benefit from sleep-based consolidation. Research by Sara Mednick and others has shown that naps as short as twenty minutes can improve memory performance, and naps of sixty to ninety minutes that include a full SWS cycle produce consolidation benefits comparable to a full night of sleep for recently learned material. In one striking study, subjects who napped after learning new vocabulary retained 20% more words than those who stayed awake during the same period.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This has a practical implication for study scheduling: if you can, study before a nap or before bedtime rather than in the morning with a full day of activity ahead. The sooner sleep follows encoding, the less interference from other experiences and the more complete the consolidation. Some researchers call this the "study-sleep-test" sequence -- the simplest evidence-based study schedule there is.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Stress and Consolidation ---- */}
      <VisualStepExplainer
        title="What Disrupts Consolidation"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 w-full max-w-md">
                  {[
                    { icon: '😰', label: 'Chronic Stress', desc: 'Cortisol disrupts hippocampal function' },
                    { icon: '😴', label: 'Poor Sleep', desc: 'Reduces slow-wave and REM phases' },
                    { icon: '📱', label: 'No Buffer', desc: 'New input after study causes interference' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <p className="text-[10px] font-ui text-ink-primary font-medium mt-1">{item.label}</p>
                      <p className="text-[9px] font-ui text-ink-tertiary mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Three things that impair consolidation. If your memory has felt unreliable during stressful periods, this is the physiological explanation -- not a personal failing.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide mb-2">
                  Practical implications
                </p>
                <div className="space-y-3 w-full max-w-sm">
                  {[
                    { icon: '🌙', tip: 'Study in the evening', desc: 'Shortest path to sleep-based consolidation' },
                    { icon: '😴', tip: 'Protect your sleep', desc: '7-9 hours allows full SWS + REM cycles' },
                    { icon: '☕', tip: 'Buffer after studying', desc: '10 minutes of rest before switching tasks' },
                    { icon: '💚', tip: 'Be kind about stress', desc: 'Impaired memory during stress is physiology, not failure' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.tip}
                      className="flex items-start gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-xs font-ui text-ink-primary font-medium">{item.tip}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Four things you can do to support consolidation. Sleep is not optional -- it is a memory strategy.',
          },
        ]}
      />

      {/* Research paragraph: Circadian optimization */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Your brain's capacity for encoding new memories fluctuates across the day in a pattern governed by your circadian rhythm. Research suggests that the hippocampus is most receptive to new learning in the late morning and again in the late afternoon, with a natural dip after lunch. However, individual variation is significant -- "night owls" and "morning larks" show different optimal windows that track with their chronotype rather than clock time.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The most actionable finding from circadian research is not about when to study, but about when to sleep relative to studying. Regardless of your chronotype, the consolidation benefits of sleep are strongest when sleep follows learning closely. Evening study sessions followed by a full night of sleep consistently outperform morning sessions followed by a day of activity and then sleep, even when total sleep is identical. The principle is simple: minimize the gap between encoding and consolidation. Let sleep do its work while the traces are still fresh.
        </p>
      </section>

      {/* ---- Gentle trauma note ---- */}
      <div className="my-8 bg-surface rounded-gentle border border-line-soft p-5 max-w-md mx-auto">
        <p className="text-xs text-ink-tertiary font-ui uppercase tracking-wide mb-2">
          A gentle note
        </p>
        <p className="font-ui text-xs text-ink-secondary leading-relaxed">
          Trauma affects memory at every stage -- encoding, consolidation, and retrieval.
          If some of what feels like "bad memory" is actually your brain prioritizing survival
          over filing, that is common, well-studied, and does not mean your memory is broken.
          We will return to this gently in later lessons.
        </p>
      </div>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does slow-wave sleep do for memory?',
            options: [
              { id: 'nothing', label: 'Memory does not benefit from sleep', correct: false },
              { id: 'replay', label: 'Replays encoded patterns and transfers traces to cortex', correct: true },
              { id: 'erase', label: 'Erases unimportant memories', correct: false },
            ],
          },
          {
            prompt: 'Why does cramming fail long-term?',
            options: [
              { id: 'lazy', label: 'Students who cram are lazy', correct: false },
              { id: 'noconsolidation', label: 'No sleep between encoding and test -- consolidation never happens', correct: true },
              { id: 'noread', label: 'Students did not read carefully enough', correct: false },
            ],
          },
          {
            prompt: 'What disrupts consolidation?',
            options: [
              { id: 'exercise', label: 'Physical exercise', correct: false },
              { id: 'stress', label: 'Chronic stress and poor sleep', correct: true },
              { id: 'water', label: 'Drinking too much water', correct: false },
            ],
          },
        ]}
      />

      {/* Research paragraph: Bringing it together */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Sleep is not downtime for your brain -- it is the consolidation shift. During slow-wave sleep, the day's memories are replayed and transferred from the hippocampus to the cortex for long-term storage. During REM sleep, those memories are woven into existing knowledge, creating the connections and patterns that make information useful rather than merely stored. Protecting your sleep, timing your study to precede it, and spacing your learning across multiple sleep cycles are not wellness advice -- they are memory strategies grounded in some of the most robust findings in neuroscience.
        </p>
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="lesson6-feynman"
        prompt="Explain to a college student who regularly pulls all-nighters before exams why that strategy works short-term but fails long-term, using what you know about consolidation."
        rubric={[
          'You explained that consolidation requires sleep -- specifically slow-wave and REM phases.',
          'You described how cramming bypasses the consolidation window, so traces remain fragile.',
          'You offered a concrete alternative (spaced sessions with sleep between them).',
          'You were matter-of-fact, not preachy -- the student would feel informed, not lectured.',
        ]}
      />

      {/* ---- MODULE COMPLETION VISUAL ---- */}
      <section className="my-10 text-center">
        <motion.div
          className="inline-block rounded-gentle border-2 p-8"
          style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-ui text-lg font-semibold text-ink-primary mb-3">
            Foundations Complete
          </p>
          <div className="flex justify-center gap-3 mb-4">
            {[
              { icon: '📥', label: 'Encoding' },
              { icon: '🌙', label: 'Consolidation' },
              { icon: '📤', label: 'Retrieval' },
              { icon: '📉', label: 'Forgetting Curve' },
              { icon: '🏛️', label: 'Palaces' },
              { icon: '🔄', label: 'Spacing' },
            ].map((concept, i) => (
              <motion.div
                key={concept.label}
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(79,122,90,0.12)' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
              >
                <span className="text-sm">{concept.icon}</span>
              </motion.div>
            ))}
          </div>
          <p className="font-ui text-xs text-ink-secondary max-w-sm mx-auto leading-relaxed">
            Six concepts. One integrated system. The theory is done.
            The practice begins next.
          </p>
        </motion.div>
      </section>

      {/* ---- ReflectionJournal ---- */}
      <ReflectionJournal
        prompt="Looking back across all six lessons, what surprised you most? What feels most relevant to your own experience with memory?"
        lessonId="memory.foundations.consolidation-and-sleep"
        onSave={addJournalEntry}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 6 of 6 &middot; Foundations
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next: Building Your First Palace
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Complete module
          </button>
        </div>
      </footer>
    </article>
  )
}

import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  NervousSystemCheckin,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 1 -- What Is the Window of Tolerance?
 * Dan Siegel's model. NervousSystemCheckin appears here (first lesson).
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson1_WhatIsWindow({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          The Window of Tolerance
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The zone where you can feel without being overwhelmed.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      {/* ---- NERVOUS SYSTEM CHECK-IN ---- */}
      <section className="my-8">
        <NervousSystemCheckin onComplete={(result) => savePromptAnswer?.('checkin', result)} />
      </section>

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychiatrist Dan Siegel introduced the concept of the Window of Tolerance to describe
          the zone of arousal in which a person can function most effectively. Within this window,
          you can experience emotions -- even strong ones -- without being overwhelmed by them.
          You can think clearly, connect with others, and respond to challenges with flexibility.
          The window is not about being calm all the time. It is about being able to feel without
          drowning.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For people who have experienced complex trauma, this window is often narrower than
          average. The nervous system, shaped by years of threat, tips more easily into
          hyperarousal (too much activation) or hypoarousal (too little). Small triggers can
          push you out of the window entirely. This is not a weakness -- it is the predictable
          result of a nervous system that learned to be on high alert. The window can be widened
          over time. That is what this module is about.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Window ---- */}
      <VisualStepExplainer
        title="Understanding the window"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-2 py-4">
                <div className="w-full max-w-sm">
                  {/* Hyper zone */}
                  <div className="text-center py-3 rounded-t-gentle" style={{ backgroundColor: 'rgba(184, 148, 102, 0.1)' }}>
                    <p className="text-xs font-ui" style={{ color: AMBER }}>Hyperarousal</p>
                    <p className="text-[10px] text-ink-tertiary">Anxiety, panic, rage, overwhelm</p>
                  </div>
                  {/* Window zone */}
                  <motion.div
                    className="text-center py-6 border-y-2"
                    style={{ borderColor: SAGE, backgroundColor: 'rgba(79, 122, 90, 0.08)' }}
                    animate={{ borderColor: [SAGE, '#6B9B78', SAGE] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <p className="text-sm font-ui font-medium" style={{ color: SAGE }}>
                      Window of Tolerance
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1">
                      You can feel, think, and connect
                    </p>
                  </motion.div>
                  {/* Hypo zone */}
                  <div className="text-center py-3 rounded-b-gentle" style={{ backgroundColor: 'rgba(156, 163, 175, 0.1)' }}>
                    <p className="text-xs font-ui text-ink-tertiary">Hypoarousal</p>
                    <p className="text-[10px] text-ink-tertiary">Numbness, shutdown, disconnection</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The Window of Tolerance is the zone between too much activation and too little. Inside the window, you can process emotions and respond flexibly. Outside it, survival responses take over.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-8">
                  <div className="text-center">
                    <div className="w-16 h-20 border-2 rounded-calm flex items-center justify-center" style={{ borderColor: SAGE }}>
                      <div className="w-12 h-4 rounded-full" style={{ backgroundColor: 'rgba(79, 122, 90, 0.3)' }} />
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Narrow window</p>
                    <p className="text-[10px] text-ink-tertiary">After trauma</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-20 border-2 rounded-calm flex items-center justify-center" style={{ borderColor: SAGE }}>
                      <div className="w-12 h-12 rounded-full" style={{ backgroundColor: 'rgba(79, 122, 90, 0.3)' }} />
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">Wider window</p>
                    <p className="text-[10px] text-ink-tertiary">With practice</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Trauma narrows the window. Healing widens it. This is not about never leaving the window -- it is about being able to return more quickly and more often.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The neurobiological basis for the window involves the interplay between the prefrontal
          cortex (which helps regulate emotional responses) and the amygdala (which detects threat).
          When you are within your window, the prefrontal cortex can modulate the amygdala's alarm
          signals. When you are pushed outside the window, the amygdala effectively takes over, and
          the prefrontal cortex goes partially offline. This is why you cannot "think your way"
          out of a trauma response -- the thinking brain is not fully available.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The good news, supported by research on neuroplasticity, is that the window is not fixed.
          Through practices that gently expand your capacity to tolerate activation -- practices we
          will explore in this module -- the prefrontal cortex strengthens its ability to stay online
          even as arousal increases. The window widens not by avoiding difficult feelings, but by
          learning to be with them in small, manageable doses.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The Window of Tolerance is:',
            options: [
              { id: 'calm', label: 'A state of complete calm', correct: false },
              { id: 'zone', label: 'The zone where you can feel emotions without being overwhelmed', correct: true },
              { id: 'numb', label: 'A state of numbness', correct: false },
            ],
          },
          {
            prompt: 'Why can you not "think your way" out of a trauma response?',
            options: [
              { id: 'lazy', label: 'Because you are not trying hard enough', correct: false },
              { id: 'offline', label: 'Because the prefrontal cortex goes partially offline', correct: true },
              { id: 'permanent', label: 'Because the response is permanent', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="wot-what-is-feynman"
        prompt="Explain the Window of Tolerance to someone who has never heard of it. Use the image of a window and describe what happens above and below it."
        rubric={[
          'You described the window as a zone, not a fixed state.',
          'You named what happens above (hyperarousal) and below (hypoarousal).',
          'You mentioned that trauma narrows the window.',
          'You offered hope that the window can widen.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Where do you think you spend most of your time -- above the window, inside it, or below? There is no right answer. Just notice what feels true right now."
          lessonId="trauma.window-of-tolerance.what-is-window"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; Window of Tolerance
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Hyperarousal -- what happens above the window
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

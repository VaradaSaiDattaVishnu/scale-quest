import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  BreathingDot,
} from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 2 -- Hyperarousal
 * What happens above the window: anxiety, panic, rage, overwhelm.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson2_HyperArousal({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Hyperarousal
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When the nervous system is running too hot.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Hyperarousal is the state above the window of tolerance. The sympathetic nervous system
          is in overdrive. The body is flooded with adrenaline and cortisol. Heart rate climbs.
          Breathing quickens. Muscles tense. The mind races, scanning for threats that may or may
          not be present. This is the territory of anxiety, panic, irritability, and rage -- not as
          emotions chosen, but as states the nervous system enters when it detects danger, real or
          perceived.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For someone with a history of complex trauma, the threshold for entering hyperarousal is
          lower. The amygdala, shaped by years of actual threat, has learned to fire at smaller and
          smaller cues. A tone of voice, a certain look, a sudden noise -- any of these can trip the
          alarm system. This is not overreacting. This is a finely tuned survival system doing
          exactly what it was trained to do. The calibration just has not been updated for the
          present environment.
        </p>
      </section>

      <VisualStepExplainer
        title="Hyperarousal in the body"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <motion.div
                    className="text-center py-4 rounded-gentle"
                    style={{ backgroundColor: 'rgba(184, 148, 102, 0.12)' }}
                    animate={{ backgroundColor: ['rgba(184, 148, 102, 0.08)', 'rgba(184, 148, 102, 0.2)', 'rgba(184, 148, 102, 0.08)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-sm font-ui font-medium" style={{ color: AMBER }}>
                      Above the window
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1">Too much activation</p>
                  </motion.div>
                  <div className="text-center py-3 border-y" style={{ borderColor: SAGE }}>
                    <p className="text-[10px] font-ui text-ink-tertiary">Window of Tolerance</p>
                  </div>
                  <div className="text-center py-2 opacity-40">
                    <p className="text-[10px] font-ui text-ink-tertiary">Hypoarousal</p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'In hyperarousal, you have tipped above your window. The sympathetic nervous system is dominant. Everything feels too much, too fast, too loud.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { sensation: 'Racing heart', location: 'Chest' },
                    { sensation: 'Shallow, rapid breathing', location: 'Chest, throat' },
                    { sensation: 'Muscle tension', location: 'Shoulders, jaw, fists' },
                    { sensation: 'Racing thoughts', location: 'Head' },
                    { sensation: 'Startle response', location: 'Whole body' },
                    { sensation: 'Heat or flushing', location: 'Face, chest' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center justify-between bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-xs font-ui text-ink-secondary">{item.sensation}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">{item.location}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Hyperarousal has a distinct body signature. Noticing these sensations is not about stopping them -- it is about recognizing where you are so you can choose how to respond.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on arousal regulation shows that hyperarousal is not simply "being anxious."
          It is a whole-body state involving the cardiovascular system, the endocrine system, the
          muscular system, and the nervous system simultaneously. The amygdala is sending alarm
          signals. The hypothalamus is activating the stress response. Cortisol is being released.
          The body is doing exactly what evolution designed it to do when it detects a threat.
          The challenge in complex trauma is that the system detects threats where none exist --
          not because it is broken, but because it learned its lessons too well.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Hyperarousal involves:',
            options: [
              { id: 'numb', label: 'Numbness and shutdown', correct: false },
              { id: 'symp', label: 'Sympathetic nervous system overdrive', correct: true },
              { id: 'sleep', label: 'Excessive sleepiness', correct: false },
            ],
          },
          {
            prompt: 'Why do trauma survivors enter hyperarousal more easily?',
            options: [
              { id: 'weak', label: 'They have weaker nervous systems', correct: false },
              { id: 'tuned', label: 'The amygdala learned to fire at smaller cues', correct: true },
              { id: 'choose', label: 'They choose to be more reactive', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="wot-hyper-feynman"
        prompt="Explain hyperarousal to someone who thinks anxiety is 'all in your head.' Help them understand that it is a full-body experience."
        rubric={[
          'You named specific body sensations, not just the emotion.',
          'You connected it to the sympathetic nervous system.',
          'You explained why the system fires more easily after trauma.',
          'Your tone was patient, not defensive.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="When you are in hyperarousal, where do you feel it first? Your chest, your jaw, your stomach? Start building a body-map of your own signals."
          lessonId="trauma.window-of-tolerance.hyper-arousal"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 2 of 5 &middot; Window of Tolerance</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Hypoarousal</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

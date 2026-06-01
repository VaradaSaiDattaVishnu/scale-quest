import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 2 -- Neuroception
 * The unconscious detection of safety and danger.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson2_Neuroception({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Neuroception
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The body's way of deciding safe or not safe -- before you think about it.
        </p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">
          You can stop anytime. The stop button is always available.
        </p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Porges coined the term neuroception to describe a process that happens below conscious
          awareness: the nervous system's continuous scanning of the environment for cues of safety
          and danger. Before you consciously decide whether a situation is safe, your nervous system
          has already made that assessment and begun shifting your state accordingly. This is why
          you can walk into a room and immediately feel uneasy without knowing why -- your
          neuroception picked up a cue that your conscious mind has not yet processed.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Neuroception is not perception. Perception involves conscious awareness. Neuroception
          happens automatically, driven by subcortical brain circuits that process tone of voice,
          facial expressions, body posture, and environmental cues faster than the thinking brain
          can analyze them. In people who have experienced prolonged trauma, neuroception can
          become miscalibrated -- detecting danger where there is none, or failing to detect
          danger where it exists. Neither is a failure. Both are the predictable result of a
          nervous system that was shaped by its environment.
        </p>
      </section>

      <VisualStepExplainer
        title="How neuroception works"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: SAGE }}>
                      <span className="text-[9px] font-ui text-center" style={{ color: SAGE }}>Safe cues</span>
                    </div>
                    <p className="text-[9px] text-ink-tertiary mt-1">Warm voice, soft eyes</p>
                  </div>
                  <motion.div
                    className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#5B6F8C' }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui text-center" style={{ color: '#5B6F8C' }}>Neuroception</span>
                  </motion.div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: AMBER }}>
                      <span className="text-[9px] font-ui text-center" style={{ color: AMBER }}>Danger cues</span>
                    </div>
                    <p className="text-[9px] text-ink-tertiary mt-1">Sharp tone, tense body</p>
                  </div>
                </div>
                <p className="text-[10px] text-ink-tertiary text-center max-w-xs">
                  Your nervous system is processing these cues constantly, faster than thought.
                </p>
              </div>
            ),
            caption:
              'Neuroception is your nervous system\'s background scan. It processes safety and danger cues before your conscious mind gets involved. This is not optional -- it is always running.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium" style={{ color: SAGE }}>Cues of safety</p>
                    <div className="mt-2 space-y-1">
                      {['Gentle tone of voice', 'Relaxed facial muscles', 'Rhythmic movement', 'Familiar environment', 'Warm temperature'].map((c, i) => (
                        <p key={i} className="text-[9px] text-ink-tertiary">{c}</p>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui font-medium" style={{ color: AMBER }}>Cues of danger</p>
                    <div className="mt-2 space-y-1">
                      {['Raised voice', 'Flat or frozen face', 'Sudden movement', 'Unpredictable behavior', 'Certain smells or sounds'].map((c, i) => (
                        <p key={i} className="text-[9px] text-ink-tertiary">{c}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The nervous system has its own checklist. These cues are processed subcortically -- below conscious awareness. After trauma, the danger checklist can become overactive.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Understanding neuroception helps explain many experiences that otherwise feel confusing
          or shameful. Why you feel anxious in a room full of people who mean you no harm. Why a
          particular tone of voice sends you spiraling. Why you can know, rationally, that you
          are safe and still feel your body bracing for impact. You are not irrational. Your
          neuroception is working from a data set that was gathered in a different environment.
          The system is functioning as designed -- the calibration just needs updating, and that
          updating happens through new experiences of safety, not through logic alone.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Neuroception is different from perception because:',
            options: [
              { id: 'conscious', label: 'Perception is conscious; neuroception is automatic', correct: true },
              { id: 'same', label: 'They are the same thing', correct: false },
              { id: 'better', label: 'Neuroception is more accurate', correct: false },
            ],
          },
          {
            prompt: 'After trauma, neuroception may:',
            options: [
              { id: 'stop', label: 'Stop working entirely', correct: false },
              { id: 'miscalibrate', label: 'Detect danger where there is none', correct: true },
              { id: 'improve', label: 'Become perfectly accurate', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="pvt-neuroception-feynman"
        prompt="Someone says: 'I know I am safe but I still feel scared.' Use neuroception to explain why this makes perfect sense."
        rubric={[
          'You distinguished between knowing (cortex) and feeling (neuroception).',
          'You explained that neuroception is automatic and subcortical.',
          'You validated the experience as normal, not irrational.',
          'You mentioned that recalibration happens through new safety experiences.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Can you think of a time your body felt unsafe even though your mind knew you were okay? What cues might your neuroception have been responding to?"
          lessonId="trauma.polyvagal.neuroception"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8">
        <BreathingDot size={48} />
      </div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 2 of 5 &middot; Polyvagal</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Co-regulation</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

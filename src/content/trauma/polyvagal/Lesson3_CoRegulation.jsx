import { motion } from 'framer-motion'
import { FeynmanCheck, ReflectionJournal, BreathingDot } from '../../../components/widgets'
import { VisualStepExplainer, InteractiveQuiz } from '../../../components/visuals'

/**
 * Lesson 3 -- Co-Regulation
 * The nervous system's need for other nervous systems.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'

export default function Lesson3_CoRegulation({
  onComplete, learnTerm, addJournalEntry, savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">Co-Regulation</h1>
        <p className="font-ui text-ink-secondary text-lg">We were never meant to regulate alone.</p>
      </header>

      <div className="bg-surface rounded-gentle border border-line-soft p-4 mb-8 max-w-md mx-auto text-center">
        <p className="font-ui text-sm text-ink-secondary">You can stop anytime. The stop button is always available.</p>
      </div>

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          One of the most important insights from polyvagal theory is that regulation is not a solo
          activity. The human nervous system is designed to be regulated in relationship. From the
          first moments of life, an infant's nervous system is calibrated by the caregiver's -- through
          eye contact, voice tone, touch, and rhythmic movement. This is co-regulation: the way one
          calm nervous system can soothe another.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          When co-regulation is disrupted in early life -- when the caregiver's nervous system is
          itself dysregulated, or when the relationship is frightening -- the child does not learn
          how to use connection for soothing. The need for co-regulation does not disappear. It
          becomes confusing, charged with ambivalence, or even associated with danger. Healing often
          involves slowly relearning that another person's presence can be a source of safety rather
          than threat.
        </p>
      </section>

      <VisualStepExplainer
        title="How co-regulation works"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: SAGE }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-[9px] font-ui" style={{ color: SAGE }}>Calm NS</span>
                  </motion.div>
                  <motion.div
                    className="flex gap-1"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: SAGE }} />
                    ))}
                  </motion.div>
                  <motion.div
                    className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: AMBER }}
                    animate={{ borderColor: [AMBER, SAGE, AMBER] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    <span className="text-[9px] font-ui text-ink-secondary">Activated NS</span>
                  </motion.div>
                </div>
                <p className="text-[10px] text-ink-tertiary text-center max-w-xs">
                  A calm nervous system sends cues of safety to an activated one. Over time, the
                  activated system begins to settle.
                </p>
              </div>
            ),
            caption:
              'Co-regulation is nervous system to nervous system. It happens through presence, not through words. A calm body next to an activated body changes what is possible.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-xs">
                  {[
                    { channel: 'Voice', desc: 'Slow, warm, melodic tones signal safety' },
                    { channel: 'Eyes', desc: 'Soft gaze, not staring or avoidant' },
                    { channel: 'Proximity', desc: 'Being near without invading' },
                    { channel: 'Rhythm', desc: 'Rocking, breathing together, walking side by side' },
                    { channel: 'Touch', desc: 'When welcome: a hand, a shoulder, steady pressure' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 bg-surface rounded-calm px-3 py-2 border border-line-soft"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: SAGE }} />
                      <div>
                        <p className="text-xs font-ui font-medium text-ink-primary">{item.channel}</p>
                        <p className="text-[10px] text-ink-tertiary">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Co-regulation uses channels the nervous system trusts: voice, eyes, proximity, rhythm, and touch. These are the same channels a caregiver uses to soothe an infant.',
          },
        ]}
      />

      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          It is important to note that needing co-regulation is not a weakness or a sign of
          immaturity. It is a biological reality. Human beings are social mammals whose nervous
          systems are designed to function in connection. Self-regulation is important and valuable,
          but it was never meant to be the only tool. If connection with others feels difficult or
          frightening, that is understandable given a history of relational trauma. The possibility
          of safe co-regulation often reopens slowly, through experiences with safe others --
          a therapist, a friend, a pet, even a fictional character who feels reliably kind.
        </p>
      </section>

      <InteractiveQuiz
        questions={[
          {
            prompt: 'Co-regulation happens primarily through:',
            options: [
              { id: 'logic', label: 'Logical explanations of why you are safe', correct: false },
              { id: 'body', label: 'Body-based cues: voice, eyes, presence, rhythm', correct: true },
              { id: 'alone', label: 'Being alone in a quiet room', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="pvt-coreg-feynman"
        prompt="Explain co-regulation to someone who believes they 'should be able to handle things on their own.' Help them understand why needing others is not weakness."
        rubric={[
          'You described co-regulation as a biological process.',
          'You named the channels (voice, touch, presence).',
          'You normalized the need for connection.',
          'Your tone was warm and validating.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Is there a person, animal, or presence in your life whose company helps your nervous system settle? What is it about them?"
          lessonId="trauma.polyvagal.co-regulation"
          onSave={addJournalEntry}
        />
      </section>

      <div className="flex justify-center my-8"><BreathingDot size={48} /></div>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">Lesson 3 of 5 &middot; Polyvagal</p>
            <p className="text-sm text-ink-secondary font-ui mt-1">Next: Mapping your ladder</p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">Continue</button>
        </div>
      </footer>
    </article>
  )
}

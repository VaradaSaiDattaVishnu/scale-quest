import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
  BranchScenario,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Epoche Practice
 * Husserl's epoche: the suspension of judgment.
 * Practical exercises for holding off interpretation.
 */

export default function Lesson2_EpochPractice({
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
          Epoch&eacute; Practice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The art of suspending judgment to let experience speak.
        </p>
      </header>

      {/* Research paragraph: Epoche defined */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Husserl borrowed the term "epoch&eacute;" from the ancient Greek
          Skeptics, who used it to mean a suspension of judgment about the
          truth of things. For Husserl, the epoch&eacute; was the active
          core of the phenomenological method: a deliberate withholding of
          all assertions about whether what you experience is "real,"
          "correct," "good," or "bad." The epoch&eacute; does not deny
          reality. It puts the question of reality on hold so you can
          attend to how things appear.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is harder than it sounds. The human mind is an
          interpretation machine. Within milliseconds of perceiving
          something, the brain has already assigned it a category, an
          emotional valence, and a behavioral response. Research on
          affective priming (Fazio, 2001) shows that emotional reactions
          to stimuli occur faster than conscious awareness -- you feel
          before you know you feel. The epoch&eacute; is a practice of
          creating a micro-gap between that automatic reaction and your
          conscious response, not to suppress the reaction but to notice
          it as it happens.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Epoche Gap ---- */}
      <VisualStepExplainer
        title="Creating the epoche gap"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-2 w-full max-w-sm justify-center">
                  <motion.div
                    className="bg-surface rounded-calm p-2 border border-line-soft text-center w-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-[10px] font-ui text-ink-secondary">Stimulus</p>
                  </motion.div>
                  <motion.svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="#B89466" strokeWidth="1.5" />
                  </motion.svg>
                  <motion.div
                    className="bg-surface rounded-calm p-2 border border-line-soft text-center w-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>
                      Auto-reaction
                    </p>
                    <p className="text-[8px] font-ui text-ink-tertiary">~200ms</p>
                  </motion.div>
                  <motion.svg
                    width="20"
                    height="12"
                    viewBox="0 0 20 12"
                    fill="none"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="#B89466" strokeWidth="1.5" />
                  </motion.svg>
                  <motion.div
                    className="bg-surface rounded-calm p-2 border border-line-soft text-center w-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-[10px] font-ui text-ink-secondary">Response</p>
                  </motion.div>
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">
                  Normal: stimulus &rarr; automatic interpretation &rarr; response
                </p>
              </div>
            ),
            caption:
              'Normally, the brain jumps from stimulus to interpretation to response in milliseconds. The automatic reaction is invisible -- it feels like seeing, not interpreting.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-2 w-full max-w-md justify-center">
                  <motion.div
                    className="bg-surface rounded-calm p-2 border border-line-soft text-center w-20"
                  >
                    <p className="text-[10px] font-ui text-ink-secondary">Stimulus</p>
                  </motion.div>
                  <motion.svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="#5B6F8C" strokeWidth="1.5" />
                  </motion.svg>
                  <motion.div
                    className="rounded-calm p-2 border-2 text-center w-24"
                    style={{
                      borderColor: '#4F7A5A',
                      backgroundColor: 'rgba(79,122,90,0.08)',
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-[10px] font-ui font-medium" style={{ color: '#4F7A5A' }}>
                      EPOCH&Eacute;
                    </p>
                    <p className="text-[8px] font-ui text-ink-tertiary">
                      notice reaction
                    </p>
                    <p className="text-[8px] font-ui text-ink-tertiary">
                      hold it gently
                    </p>
                  </motion.div>
                  <motion.svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                    <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="#5B6F8C" strokeWidth="1.5" />
                  </motion.svg>
                  <motion.div
                    className="bg-surface rounded-calm p-2 border border-line-soft text-center w-24"
                  >
                    <p className="text-[10px] font-ui text-ink-secondary">
                      Deliberate response
                    </p>
                  </motion.div>
                </div>
                <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>
                  With epoch&eacute;: stimulus &rarr; notice reaction &rarr; hold &rarr; respond deliberately
                </p>
              </div>
            ),
            caption:
              'The epoche inserts a gap between stimulus and response. In that gap, you notice your automatic reaction without acting on it -- then choose how to respond.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { auto: '"That person looks angry"', epoch: '"I notice tension in my chest and a story forming"' },
                    { auto: '"This is boring"', epoch: '"I notice my attention pulling away"' },
                    { auto: '"This is wrong"', epoch: '"I notice a judgment arising"' },
                  ].map((pair, i) => (
                    <motion.div
                      key={i}
                      className="grid grid-cols-2 gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="bg-surface rounded-calm p-2 border border-line-soft">
                        <p className="text-[9px] font-ui" style={{ color: '#B89466' }}>
                          Automatic
                        </p>
                        <p className="text-[10px] font-ui text-ink-secondary">
                          {pair.auto}
                        </p>
                      </div>
                      <div className="bg-surface rounded-calm p-2 border-2" style={{ borderColor: '#4F7A5A' }}>
                        <p className="text-[9px] font-ui" style={{ color: '#4F7A5A' }}>
                          With epoch&eacute;
                        </p>
                        <p className="text-[10px] font-ui text-ink-secondary">
                          {pair.epoch}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The epoche shifts language from assertion ("That is X") to noticing ("I notice X arising in me"). The same stimulus, but a fundamentally different relationship to it.',
          },
        ]}
      />

      {/* Research paragraph: Practical applications */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The epoch&eacute; has been adopted as a practical tool in
          qualitative psychology, nursing, and psychotherapy. In
          Interpretive Phenomenological Analysis (IPA), developed by
          Jonathan Smith (1996), researchers use a structured form of
          epoch&eacute; to examine their own preconceptions before
          interpreting participant data. In clinical settings, therapists
          trained in phenomenological approaches use epoch&eacute; to
          resist premature diagnosis -- holding off on labeling a
          patient's experience until they have listened more fully.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For trauma survivors, the epoch&eacute; offers a specific kind
          of relief: the possibility of experiencing something without
          immediately having to decide what it means. Hypervigilance
          compresses the gap between stimulus and interpretation to
          near-zero -- everything is immediately classified as safe or
          dangerous. Practicing the epoch&eacute; gently expands that gap,
          creating space for a wider range of possible interpretations.
          This is not exposure therapy. It is perceptual training that
          happens to build the same muscle.
        </p>
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="epoche-practice"
        scenario="You hear a loud sound from outside. Your body tenses. What do you do?"
        branches={[
          {
            label: 'I notice my body tensed and a story forming -- "danger" -- and I hold it without acting',
            feedback:
              'This is the epoche in action. You noticed the automatic reaction (tension, danger story) without being consumed by it. The gap between stimulus and response expanded.',
          },
          {
            label: 'I immediately look for the source of the sound',
            feedback:
              'This is a natural response. The epoche practice is not about suppressing it, but about noticing the reaction before acting. Over time, the noticing comes faster.',
          },
          {
            label: 'I tell myself it is nothing and try to relax',
            feedback:
              'Dismissing the reaction is different from bracketing it. The epoche acknowledges the reaction fully -- "I notice tension" -- without either acting on it or pushing it away.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="epoche-practice-prompt"
        question="Over the next hour, notice one moment when your mind jumps to an interpretation. Write: (1) What happened (stimulus). (2) What your automatic reaction was. (3) What you noticed when you held the reaction instead of acting on it."
        placeholder="Stimulus: ... My reaction: ... When I held it: ..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'The epoche is:',
            options: [
              {
                id: 'a',
                label: 'Suppressing all emotional reactions',
                correct: false,
              },
              {
                id: 'b',
                label: 'A deliberate suspension of judgment to attend to experience as it appears',
                correct: true,
              },
              {
                id: 'c',
                label: 'A way to eliminate all bias permanently',
                correct: false,
              },
            ],
          },
          {
            prompt: 'How does the epoche help trauma survivors?',
            options: [
              {
                id: 'a',
                label: 'It eliminates hypervigilance',
                correct: false,
              },
              {
                id: 'b',
                label: 'It expands the gap between stimulus and interpretation',
                correct: true,
              },
              {
                id: 'c',
                label: 'It replaces the need for therapy',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="bracket-l2-feynman"
        prompt="Explain the epoche to someone using the example of hearing a loud noise. How is noticing your reaction different from suppressing it or being consumed by it?"
        rubric={[
          'You distinguished noticing from suppressing and from being consumed.',
          'You described the micro-gap between stimulus and response.',
          'You used a concrete, sensory example.',
          'The explanation did not sound clinical or abstract.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What is your relationship with automatic reactions? Do you tend to act on them, suppress them, or something else? What was it like to simply notice one?"
          lessonId="observation.phenomenological-bracketing.epoch-practice"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Phenomenological Bracketing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Describing Experience
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

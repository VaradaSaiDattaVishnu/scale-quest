import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
  ObservationScene,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- I Wonder
 * The second prompt in Laws' triad: generating questions from observation.
 * Curiosity as an attentional anchor.
 */

export default function Lesson2_IWonder({
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
          I Wonder
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Turning noticing into questions that deepen attention.
        </p>
      </header>

      {/* Research paragraph: The role of wonder */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          After "I notice" comes "I wonder" -- the generative question that
          transforms passive observation into active inquiry. John Muir Laws
          describes this prompt as the engine of sustained attention. When you
          notice something and then ask a question about it, you create an open
          loop in your mind. That loop acts as an attentional anchor, pulling
          your focus back to the subject long after the initial novelty has
          faded.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on curiosity and learning (Gruber, Gelman & Ranganath, 2014)
          shows that the brain's dopaminergic reward circuits activate when
          curiosity is triggered -- even before the answer is found. Crucially,
          this heightened state improves memory not only for the information you
          are curious about but for incidental information encountered during
          the curious state. Wondering, in other words, opens a wider window of
          encoding.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Wonder Loop ---- */}
      <VisualStepExplainer
        title="How wonder anchors attention"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative">
                  <motion.div
                    className="w-28 h-28 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#B89466' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  >
                    <span
                      className="font-ui text-lg font-bold"
                      style={{ color: '#B89466' }}
                    >
                      ?
                    </span>
                  </motion.div>
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xs" style={{ color: '#4F7A5A' }}>
                      DA
                    </span>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary text-center max-w-xs">
                  Dopamine (DA) surges when curiosity is triggered, priming the
                  brain for deeper encoding
                </p>
              </div>
            ),
            caption:
              'Curiosity activates the brain\'s reward circuits before the answer arrives. The question itself is the trigger, not the resolution.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex gap-3 items-center">
                  <motion.div
                    className="bg-surface rounded-calm p-3 border border-line-soft"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0 }}
                  >
                    <p className="text-xs font-ui text-ink-secondary">
                      "I notice the bark has deep ridges"
                    </p>
                  </motion.div>
                  <motion.svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="#5B6F8C"
                      strokeWidth="2"
                    />
                  </motion.svg>
                  <motion.div
                    className="bg-surface rounded-calm p-3 border-2"
                    style={{ borderColor: '#B89466' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-xs font-ui" style={{ color: '#B89466' }}>
                      "I wonder why some ridges are deeper?"
                    </p>
                  </motion.div>
                </div>
              </div>
            ),
            caption:
              'The "I wonder" prompt transforms a static observation into an open question. The question creates an attentional loop that sustains focus.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm w-full">
                  {[
                    { type: 'Causal', ex: 'Why is one side darker?' },
                    { type: 'Comparative', ex: 'Are all leaves this shape?' },
                    { type: 'Temporal', ex: 'Has this always been here?' },
                  ].map((q, i) => (
                    <motion.div
                      key={q.type}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <p
                        className="text-xs font-ui font-medium mb-1"
                        style={{ color: '#5B6F8C' }}
                      >
                        {q.type}
                      </p>
                      <p className="text-[10px] text-ink-tertiary font-ui">
                        {q.ex}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'Different types of wondering: causal (why), comparative (how does this differ), and temporal (how has this changed). Each opens a different line of inquiry.',
          },
        ]}
      />

      {/* Research paragraph: Curiosity and incidental learning */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Gruber and colleagues used fMRI to show that when participants were
          in a curious state -- anticipating the answer to a trivia question
          they wanted to know -- their memory for unrelated face images
          presented during that window improved by 30-40%. The dopaminergic
          system was not selectively boosting memory for the curiosity target
          alone. It was boosting the entire encoding context. This means that
          the act of wondering about one thing makes you better at remembering
          everything around it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For nature journaling, this has a practical implication: generating
          genuine questions about what you observe does not just deepen
          engagement with that particular subject. It opens a wider encoding
          window for the entire scene. The butterfly you wondered about becomes
          an anchor for remembering the flowers it landed on, the sound of
          wind, the angle of light. Wonder is not a luxury of the curious mind.
          It is a cognitive tool with measurable effects.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: What Do You Wonder?
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Look at the scene. First notice, then generate questions.
        </p>
        <ObservationScene
          scene="meadow-edge"
          mode="wonder"
          promptText="I wonder..."
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="wonder-practice"
        question="Pick one thing you noticed in Lesson 1 (or something near you now). Generate three 'I wonder' questions about it. Try one causal, one comparative, one temporal."
        placeholder="I wonder..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does the "I wonder" prompt do for attention?',
            options: [
              {
                id: 'a',
                label: 'It closes the observation loop quickly',
                correct: false,
              },
              {
                id: 'b',
                label: 'It creates an open loop that sustains focus',
                correct: true,
              },
              {
                id: 'c',
                label: 'It replaces the need to notice details',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Curiosity-state encoding improves memory for:',
            options: [
              {
                id: 'a',
                label: 'Only the thing you are curious about',
                correct: false,
              },
              {
                id: 'b',
                label: 'Everything encountered during the curious state',
                correct: true,
              },
              {
                id: 'c',
                label: 'Nothing -- curiosity distracts from encoding',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="naturalist-l2-feynman"
        prompt="Explain to a 10-year-old why asking questions about what you see helps you remember the whole scene better."
        rubric={[
          'You mentioned that wonder creates an open loop or anchor.',
          'You connected curiosity to broader memory, not just the question.',
          'You used a concrete example a child could visualize.',
          'You did not rely on neuroscience jargon.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What kind of wondering comes most naturally to you -- causal, comparative, or temporal? Did any question surprise you by how much it pulled your attention?"
          lessonId="observation.naturalist-journaling.i-wonder"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Naturalist Journaling
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: It Reminds Me Of
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

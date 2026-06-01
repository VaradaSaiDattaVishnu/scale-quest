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
 * Lesson 1 -- I Notice
 * John Muir Laws' first prompt: training the eye to register
 * what is actually present before interpretation begins.
 */

const leafPath =
  'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 2c1.5 3 2 6 1.5 9-.5 3-2 5-3.5 6.5'

export default function Lesson1_INotice({
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
          I Notice
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The first prompt of nature journaling: seeing what is actually there.
        </p>
      </header>

      {/* Research paragraph: John Muir Laws' method */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          John Muir Laws, a naturalist and educator, developed a deceptively
          simple framework for field observation. It begins with three prompts:
          "I notice," "I wonder," and "It reminds me of." The first prompt --
          "I notice" -- is the hardest. It asks you to report only what your
          senses register, without jumping to explanation, judgment, or story.
          Most people skip this step entirely. They see a bird and immediately
          name it, classify it, or evaluate whether it is interesting. The act
          of pure noticing -- shape, color, movement, position -- gets
          bypassed.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on observational learning in natural science (Eberbach &
          Crowley, 2009) confirms that untrained observers consistently
          conflate observation with inference. Children and adults alike
          describe what they think is happening rather than what they see. The
          "I notice" prompt works because it creates a deliberate pause between
          perception and interpretation -- a gap where actual seeing can occur.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Noticing Gap ---- */}
      <VisualStepExplainer
        title="The gap between seeing and interpreting"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#4F7A5A"
                    strokeWidth="1.5"
                    fill="rgba(79,122,90,0.08)"
                  />
                  <path d={leafPath} stroke="#4F7A5A" strokeWidth="1.5" />
                </motion.svg>
                <div className="flex gap-6 text-center">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui" style={{ color: '#5B6F8C' }}>
                      Untrained
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      "It's an oak leaf"
                    </p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-xs font-ui" style={{ color: '#4F7A5A' }}>
                      Trained
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      "Lobed edges, 3 inches, slight curl"
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Untrained observers jump to naming. Trained observers describe what they actually see: shape, size, texture, position.',
          },
          {
            visual: (
              <div className="flex items-center gap-4 py-4 justify-center">
                {['See', 'Pause', 'Describe'].map((step, i) => (
                  <motion.div
                    key={step}
                    className="w-20 h-20 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                  >
                    <span
                      className="font-ui text-sm font-medium"
                      style={{ color: '#4F7A5A' }}
                    >
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            ),
            caption:
              'The "I notice" prompt inserts a pause between perception and labeling. See first. Pause. Then describe only what you observed.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  {[
                    { label: 'Color', example: 'Mottled grey-green' },
                    { label: 'Shape', example: 'Asymmetric, wider left' },
                    { label: 'Texture', example: 'Rough topside, smooth underside' },
                    { label: 'Position', example: 'Angled 30 degrees from branch' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <p
                        className="text-xs font-ui font-medium mb-1"
                        style={{ color: '#4F7A5A' }}
                      >
                        {item.label}
                      </p>
                      <p className="text-[10px] text-ink-tertiary font-ui">
                        {item.example}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The noticing categories: color, shape, texture, position, movement, sound. Each one anchors attention to sensory data.',
          },
        ]}
      />

      {/* Research paragraph: Observation vs inference */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The distinction between observation and inference is foundational in
          scientific method, yet remarkably difficult to maintain in practice.
          Norris (1985) demonstrated that even trained science students
          regularly embed causal explanations inside what they report as
          observations. "The plant is reaching toward the light" sounds like an
          observation, but "reaching" implies intention -- it is already an
          inference. A pure observation would be: "The stem curves toward the
          window side."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For trauma-informed learning, this distinction carries extra weight.
          Survivors of chronic stress often develop hypervigilant interpretive
          patterns -- reading threat into ambiguous stimuli before conscious
          awareness catches up. Practicing "I notice" creates a gentle training
          ground for separating what is perceived from what is interpreted. It
          is not about suppressing interpretation; it is about learning to see
          the gap between the two.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: What Do You Notice?
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Look at the scene below. List only what you see -- no names, no
          explanations, no judgments.
        </p>
        <ObservationScene
          scene="forest-floor"
          mode="notice"
          promptText="I notice..."
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="notice-practice"
        question="Write three 'I notice' statements about something near you right now. Describe only what your senses register -- no labels, no reasons."
        placeholder="I notice..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which statement is a pure observation?',
            options: [
              {
                id: 'a',
                label: 'The bird is looking for food',
                correct: false,
              },
              {
                id: 'b',
                label: 'A small brown shape moves left to right along the branch',
                correct: true,
              },
              {
                id: 'c',
                label: 'The sparrow seems happy',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Why does the "I notice" prompt improve observation?',
            options: [
              {
                id: 'a',
                label: 'It forces you to name things faster',
                correct: false,
              },
              {
                id: 'b',
                label: 'It inserts a pause between perception and interpretation',
                correct: true,
              },
              {
                id: 'c',
                label: 'It eliminates all bias permanently',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="naturalist-l1-feynman"
        prompt="Explain to a friend why saying 'the flower is pretty' is not the same as observing the flower."
        rubric={[
          'You distinguished observation from judgment.',
          'You gave a concrete example of a pure observation.',
          'You explained why the gap matters for learning to see.',
          'A non-scientist could follow your explanation.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What did you notice about your own noticing? Did your mind want to jump to labels or stories? What was it like to stay with raw perception?"
          lessonId="observation.naturalist-journaling.i-notice"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Naturalist Journaling
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: I Wonder
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

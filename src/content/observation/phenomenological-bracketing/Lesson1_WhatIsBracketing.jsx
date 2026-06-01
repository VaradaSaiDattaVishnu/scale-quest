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
 * Lesson 1 -- What Is Bracketing?
 * Introduction to Husserl's phenomenological reduction.
 * Setting aside assumptions to see the thing itself.
 */

export default function Lesson1_WhatIsBracketing({
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
          What Is Bracketing?
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Setting aside what you think you know to see what is actually there.
        </p>
      </header>

      {/* Research paragraph: Husserl's project */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In the early twentieth century, the German philosopher Edmund
          Husserl proposed a radical method for studying experience. He
          argued that our everyday perception is layered with assumptions,
          theories, habits, and expectations that we never notice -- and
          that these layers prevent us from seeing the thing itself. His
          method, which he called phenomenological reduction, aimed to
          strip those layers away, not to reach some hidden reality, but
          to attend more faithfully to what actually appears in
          consciousness.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The key operation in this method is "bracketing" -- a term
          borrowed from mathematics, where brackets set aside part of an
          expression. In Husserl's use, bracketing means deliberately
          suspending your assumptions, beliefs, and habitual
          interpretations without abandoning them permanently. You do not
          deny that your assumptions exist. You set them to one side,
          temporarily, so you can attend to the experience as it presents
          itself. This is not about being assumption-free -- it is about
          being assumption-aware.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Layers of Assumption ---- */}
      <VisualStepExplainer
        title="Peeling away the layers"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                  {/* Outer layers */}
                  {[
                    { r: 90, label: 'Theories', color: '#B89466', opacity: 0.15 },
                    { r: 70, label: 'Expectations', color: '#B89466', opacity: 0.2 },
                    { r: 50, label: 'Habits', color: '#5B6F8C', opacity: 0.2 },
                    { r: 30, label: 'Experience', color: '#4F7A5A', opacity: 0.3 },
                  ].map((layer, i) => (
                    <g key={layer.label}>
                      <motion.circle
                        cx="100"
                        cy="100"
                        r={layer.r}
                        fill={layer.color}
                        opacity={layer.opacity}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (3 - i) * 0.2, duration: 0.4 }}
                      />
                      <text
                        x="100"
                        y={100 - layer.r + 15}
                        textAnchor="middle"
                        fill={layer.color}
                        fontSize="9"
                        fontFamily="ui-sans-serif"
                        opacity="0.8"
                      >
                        {layer.label}
                      </text>
                    </g>
                  ))}
                  {/* Center dot */}
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="8"
                    fill="#4F7A5A"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <text
                    x="100"
                    y="104"
                    textAnchor="middle"
                    fill="white"
                    fontSize="6"
                    fontFamily="ui-sans-serif"
                    fontWeight="bold"
                  >
                    thing
                  </text>
                </svg>
              </div>
            ),
            caption:
              'Every perception arrives wrapped in layers: theories, expectations, habitual interpretations. At the center is the experience itself -- what Husserl called "the thing as it gives itself."',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-3">
                  <motion.div
                    className="bg-surface rounded-calm p-3 border-2 w-36 text-center"
                    style={{ borderColor: '#B89466' }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <p className="text-xs font-ui" style={{ color: '#B89466' }}>
                      [ assumption ]
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      "Chairs are for sitting"
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-surface rounded-calm p-3 border-2 w-36 text-center"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <p className="text-xs font-ui" style={{ color: '#4F7A5A' }}>
                      experience
                    </p>
                    <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
                      "Four legs, curved back, hard surface, cool to touch"
                    </p>
                  </motion.div>
                </div>
              </div>
            ),
            caption:
              'Bracketing does not destroy assumptions. It dims them temporarily so the direct experience becomes visible. The assumption still exists -- it just stops dominating.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                    >
                      <span className="text-lg" style={{ color: '#B89466' }}>
                        (  )
                      </span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Math brackets
                    </p>
                    <p className="text-[10px] font-ui text-ink-tertiary">
                      Set aside terms
                    </p>
                  </div>
                  <motion.svg
                    width="30"
                    height="20"
                    viewBox="0 0 30 20"
                    fill="none"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#5B6F8C" strokeWidth="2" />
                  </motion.svg>
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <span className="text-lg" style={{ color: '#4F7A5A' }}>
                        [  ]
                      </span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Phenomenological brackets
                    </p>
                    <p className="text-[10px] font-ui text-ink-tertiary">
                      Set aside assumptions
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'The metaphor from mathematics: brackets temporarily set something aside without deleting it. You can always un-bracket later.',
          },
        ]}
      />

      {/* Research paragraph: Why this matters */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Why would anyone want to bracket their assumptions? Because
          assumptions are invisible. They shape perception so thoroughly that
          we experience our interpretations as if they were raw data. Daniel
          Kahneman (2011) describes this as "what you see is all there is"
          (WYSIATI) -- the mind's tendency to build a coherent story from
          whatever information is immediately available, without registering
          what is missing. Bracketing is a deliberate disruption of WYSIATI.
          It creates a moment of not-knowing that allows you to notice what
          your habitual frame is excluding.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In phenomenological psychology, bracketing has become a standard
          research method (Giorgi, 2009). Researchers studying lived
          experience use bracketing to separate their own assumptions from
          the participant's account. The same skill is valuable in everyday
          life: when you bracket your assumptions about a person, a
          situation, or a sensation, you create space for the experience to
          reveal aspects that your habitual frame would otherwise filter out.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: Bracket and Observe
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Look at the scene. Name your first assumption, then set it aside
          and describe only what you experience.
        </p>
        <ObservationScene
          scene="abstract-texture"
          mode="bracket"
          promptText="My assumption is... Setting that aside, I experience..."
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="bracketing-intro"
        question="Choose a familiar object near you. Write: (1) What I usually assume about it (its purpose, its name, its category). (2) Setting those aside, what I actually experience: its weight, temperature, texture, shape, the way light falls on it."
        placeholder="I usually assume... Setting that aside, I experience..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does "bracketing" mean in phenomenology?',
            options: [
              {
                id: 'a',
                label: 'Permanently eliminating all assumptions',
                correct: false,
              },
              {
                id: 'b',
                label: 'Temporarily setting aside assumptions to attend to experience directly',
                correct: true,
              },
              {
                id: 'c',
                label: 'Organizing experiences into categories',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Kahneman\'s WYSIATI principle explains:',
            options: [
              {
                id: 'a',
                label: 'Why we always see everything accurately',
                correct: false,
              },
              {
                id: 'b',
                label: 'Why the mind builds stories from available info without noticing what is missing',
                correct: true,
              },
              {
                id: 'c',
                label: 'Why assumptions do not affect perception',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="bracket-l1-feynman"
        prompt="Explain to a friend what 'bracketing' means using the example of looking at a tree. What assumptions would you bracket? What might you see differently?"
        rubric={[
          'You explained bracketing as temporary suspension, not elimination.',
          'You named specific assumptions (name, category, purpose).',
          'You described what direct experience without those assumptions might reveal.',
          'The explanation was concrete and accessible.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What assumptions did you discover you hold about familiar objects? What was it like to set them aside, even briefly? Did anything feel different or unexpected?"
          lessonId="observation.phenomenological-bracketing.what-is-bracketing"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Phenomenological Bracketing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Epoch&eacute; Practice
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

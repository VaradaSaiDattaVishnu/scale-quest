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
 * Lesson 3 -- Single Subject
 * Sustained attention on one subject over time.
 * The discipline of looking longer, not wider.
 */

export default function Lesson3_SingleSubject({
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
          Single Subject
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The discipline of looking longer at one thing instead of wider at
          many.
        </p>
      </header>

      {/* Research paragraph: Sustained attention */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Edward Weston, one of the most influential photographers of the
          twentieth century, spent years photographing a single green pepper.
          Not different peppers -- the same pepper, over and over, in
          different light, from different angles, until he had exhausted what
          the subject could reveal. His Pepper No. 30 (1930) is considered a
          masterpiece of photographic seeing. Weston described his method as
          "seeing more than meets the eye" -- discovering what sustained
          attention could reveal that a glance never would.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on sustained attention and perceptual learning (Ahissar &
          Hochstein, 2004) shows that extended observation of a single
          stimulus leads to progressively finer discrimination. The visual
          system literally recalibrates -- what initially appeared uniform
          reveals texture, variation, and structure. This is the reverse
          hierarchy theory: detailed perception starts with broad
          categorization and refines downward only with sustained attention.
          Quick looks trigger top-down categories. Long looks trigger
          bottom-up detail discovery.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Depth of Seeing ---- */}
      <VisualStepExplainer
        title="What sustained attention reveals"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-3 items-end">
                  {[
                    { time: '1 sec', depth: 20, color: '#B89466' },
                    { time: '10 sec', depth: 40, color: '#B89466' },
                    { time: '1 min', depth: 60, color: '#5B6F8C' },
                    { time: '5 min', depth: 80, color: '#4F7A5A' },
                    { time: '20 min', depth: 95, color: '#4F7A5A' },
                  ].map((level, i) => (
                    <div key={level.time} className="flex flex-col items-center">
                      <motion.div
                        className="w-10 rounded-t-sm"
                        style={{ backgroundColor: level.color }}
                        initial={{ height: 0 }}
                        animate={{ height: `${level.depth}px` }}
                        transition={{ delay: i * 0.2, duration: 0.5 }}
                      />
                      <span className="text-[8px] font-ui text-ink-tertiary mt-1">
                        {level.time}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">
                  Perceptual depth increases with sustained attention
                </p>
              </div>
            ),
            caption:
              'A glance activates categories. Sustained attention activates detail perception. Most people never get past the first few seconds.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-2 max-w-sm w-full">
                  {[
                    { time: '0-10s', sees: 'Category: "a cup"' },
                    { time: '10s-1m', sees: 'Features: chip on rim, slight asymmetry' },
                    { time: '1-5m', sees: 'Relationships: how light wraps the curve, shadow inside' },
                    { time: '5-20m', sees: 'Subtleties: glaze variation, micro-textures, reflections of surroundings' },
                  ].map((phase, i) => (
                    <motion.div
                      key={phase.time}
                      className="flex items-start gap-3 bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span
                        className="text-xs font-ui font-mono w-14 flex-shrink-0"
                        style={{ color: '#5B6F8C' }}
                      >
                        {phase.time}
                      </span>
                      <p className="text-[10px] font-ui text-ink-secondary">
                        {phase.sees}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption:
              'The progression of seeing: from categories to features to relationships to subtleties. Each level requires more time and yields more detail.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                    >
                      <div className="grid grid-cols-3 gap-1">
                        {Array(9).fill(0).map((_, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-sm bg-line-soft"
                          />
                        ))}
                      </div>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      Many subjects, shallow
                    </p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A' }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full"
                        style={{
                          background: `radial-gradient(circle, #4F7A5A, rgba(79,122,90,0.3), rgba(79,122,90,0.05))`,
                        }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                      One subject, deep
                    </p>
                  </div>
                </div>
              </div>
            ),
            caption:
              'Single-subject practice is not about limitation. It is about depth. One subject observed deeply teaches more about seeing than a dozen observed quickly.',
          },
        ]}
      />

      {/* Research paragraph: Weston and perceptual learning */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The concept of perceptual learning -- improving the ability to
          extract information from sensory input through experience -- was
          formalized by Eleanor Gibson (1969). She demonstrated that
          perceptual skills are learned, not fixed, and that they develop
          through active engagement with specific stimuli over time. The
          single-subject exercise is a direct application of Gibson's
          framework: by constraining the subject, you force the perceptual
          system to refine its resolution rather than expand its scope.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For trauma-informed practice, the single-subject exercise has an
          additional benefit: it is inherently bounded. There is no
          expectation to scan the environment comprehensively, no need to
          track multiple moving elements. The constraint itself is
          containing. You choose one subject, one frame, one focus -- and
          within that container, you discover that attention deepens
          naturally when it is not asked to cover too much ground.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: One Subject, Five Minutes
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Choose one element in the scene. Stay with it. Notice what reveals
          itself over time.
        </p>
        <ObservationScene
          scene="still-life"
          mode="single-subject"
          promptText="Staying with one subject, I notice..."
          timerMinutes={5}
        />
      </section>

      {/* ---- BRANCH SCENARIO ---- */}
      <BranchScenario
        id="single-subject-restless"
        scenario="You have been looking at the same cup for three minutes. Your attention wants to wander. What do you do?"
        branches={[
          {
            label: 'Zoom in -- look at one small section of the cup',
            feedback:
              'Excellent. When whole-object attention fades, microscopic attention can take over. Look at just the rim, or just the shadow inside.',
          },
          {
            label: 'Switch to a new subject',
            feedback:
              'Understandable, but try staying a little longer first. The restlessness often passes after 30 more seconds, and what comes next is usually more interesting.',
          },
          {
            label: 'Notice the restlessness itself as data',
            feedback:
              'Very perceptive. The urge to move on is itself an observation -- "I notice my attention wants to leave." This meta-awareness is a skill.',
          },
        ]}
      />

      {/* ---- PROMPT ---- */}
      <Prompt
        id="single-subject-prompt"
        question="Choose one object near you. Observe it for five minutes (set a timer). Write what you noticed at the 1-minute mark, the 3-minute mark, and the 5-minute mark. How did your seeing change?"
        placeholder="At 1 minute I noticed... At 3 minutes..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does the reverse hierarchy theory predict about sustained attention?',
            options: [
              {
                id: 'a',
                label: 'Quick looks yield the most detail',
                correct: false,
              },
              {
                id: 'b',
                label: 'Detailed perception emerges only with sustained observation',
                correct: true,
              },
              {
                id: 'c',
                label: 'All observers see the same details regardless of time spent',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Why is single-subject observation a good trauma-informed exercise?',
            options: [
              {
                id: 'a',
                label: 'It requires scanning the full environment',
                correct: false,
              },
              {
                id: 'b',
                label: 'It is inherently bounded and containing',
                correct: true,
              },
              {
                id: 'c',
                label: 'It eliminates all anxiety',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="photo-l3-feynman"
        prompt="Explain to someone who says 'I've already seen it' why looking at the same thing for five minutes will show them things a glance never could."
        rubric={[
          'You described the progression from categories to subtleties.',
          'You gave a concrete example of what sustained looking reveals.',
          'You addressed the feeling of restlessness or boredom directly.',
          'You made it sound inviting, not like a chore.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="What happened to your attention during sustained observation? Did it deepen, wander, or both? What surprised you about what you saw after the first minute?"
          lessonId="observation.photography-as-seeing.single-subject"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Photography as Seeing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Review Session
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

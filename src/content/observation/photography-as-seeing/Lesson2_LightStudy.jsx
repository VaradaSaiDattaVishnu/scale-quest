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
 * Lesson 2 -- Light Study
 * Learning to see light as a photographer does: direction, quality,
 * temperature, and shadow as information.
 */

export default function Lesson2_LightStudy({
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
          Light Study
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Seeing the light itself, not just the objects it reveals.
        </p>
      </header>

      {/* Research paragraph: Light as information */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Most people look through light to see objects. Photographers learn
          to look at light itself -- its direction, its quality (hard or
          diffuse), its color temperature, and the shapes it creates through
          shadow. This inversion of attention is not a technical trick; it is
          a perceptual skill that transforms how you see the world. James
          Gibson's ecological theory of perception (1979) argues that we
          perceive the environment through the information in light arrays --
          gradients, textures, and edges created by how light interacts with
          surfaces. When you attend to light directly, you are attending to
          the fundamental medium through which all visual perception occurs.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on attentional training in visual arts education (Kozbelt,
          2001) shows that art students develop measurably different eye
          movement patterns compared to untrained observers. They spend more
          time on boundaries, transitions, and regions of high contrast --
          precisely the areas where light behavior is most informative. This
          is not an innate talent. It is a trained skill that develops through
          deliberate practice.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Properties of Light ---- */}
      <VisualStepExplainer
        title="Four properties of light to observe"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
                  {/* Light source */}
                  <motion.circle
                    cx="30"
                    cy="30"
                    r="12"
                    fill="#B89466"
                    opacity="0.8"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Light rays */}
                  {[40, 50, 60].map((angle, i) => (
                    <motion.line
                      key={i}
                      x1="42"
                      y1="30"
                      x2={42 + Math.cos((angle * Math.PI) / 180) * 80}
                      y2={30 + Math.sin((angle * Math.PI) / 180) * 80}
                      stroke="#B89466"
                      strokeWidth="1"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.2, duration: 0.8 }}
                    />
                  ))}
                  {/* Object */}
                  <rect x="100" y="50" width="30" height="40" rx="2" fill="#5B6F8C" opacity="0.3" />
                  {/* Shadow */}
                  <motion.ellipse
                    cx="145"
                    cy="90"
                    rx="25"
                    ry="8"
                    fill="#5B6F8C"
                    opacity="0.15"
                    animate={{ rx: [22, 28, 22] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <text x="25" y="55" fill="#B89466" fontSize="9" fontFamily="ui-sans-serif">
                    Direction
                  </text>
                </svg>
              </div>
            ),
            caption:
              'Direction: Where is the light coming from? Side light creates drama and depth. Front light flattens. Back light creates silhouettes and rim edges.',
          },
          {
            visual: (
              <div className="flex items-center gap-6 py-4 justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(184,148,102,0.2)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: 'radial-gradient(circle at 30% 30%, rgba(184,148,102,0.8), transparent)',
                      }}
                    />
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Hard light</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">Sharp shadows</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(184,148,102,0.1)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(184,148,102,0.3), transparent)',
                      }}
                    />
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Soft light</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">Gradual transitions</p>
                </div>
              </div>
            ),
            caption:
              'Quality: Hard light (direct sun) creates sharp shadow edges. Soft light (overcast, shade) wraps around forms and creates gentle gradients.',
          },
          {
            visual: (
              <div className="flex items-center gap-6 py-4 justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 rounded-calm"
                    style={{ backgroundColor: 'rgba(184,148,102,0.3)' }}
                    animate={{ backgroundColor: ['rgba(184,148,102,0.3)', 'rgba(184,148,102,0.5)', 'rgba(184,148,102,0.3)'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Warm</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">Golden hour</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 rounded-calm"
                    style={{ backgroundColor: 'rgba(91,111,140,0.25)' }}
                  />
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Cool</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">Blue hour</p>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-14 h-14 rounded-calm"
                    style={{ backgroundColor: 'rgba(200,200,200,0.3)' }}
                  />
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Neutral</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">Midday</p>
                </div>
              </div>
            ),
            caption:
              'Temperature: Light has color. Early morning and late afternoon skew warm (amber). Shade and twilight skew cool (blue). Midday is more neutral.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="180" height="100" viewBox="0 0 180 100" fill="none">
                  {/* Object */}
                  <rect x="70" y="20" width="40" height="50" rx="3" fill="#5B6F8C" opacity="0.4" />
                  {/* Shadow */}
                  <motion.path
                    d="M110 70 L150 90 L70 90 Z"
                    fill="#5B6F8C"
                    opacity="0.12"
                    animate={{ d: ['M110 70 L150 90 L70 90 Z', 'M110 70 L160 90 L75 90 Z', 'M110 70 L150 90 L70 90 Z'] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <text x="110" y="85" fill="#5B6F8C" fontSize="9" fontFamily="ui-sans-serif">
                    Shadow = information
                  </text>
                </svg>
              </div>
            ),
            caption:
              'Shadow: Not the absence of light, but its own form of visual information. Shadow reveals shape, depth, time of day, and spatial relationships.',
          },
        ]}
      />

      {/* Research paragraph: Attention to light */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The photographer's attention to light is a form of what William
          James called "voluntary attention" -- the effortful, sustained
          focus on an aspect of experience that is not inherently
          attention-grabbing. Light itself is transparent; we normally see
          through it. Training yourself to see it directly requires
          overriding the brain's default tendency to treat light as a
          background condition rather than a foreground subject. This
          override is what makes photography a genuine perceptual practice,
          not just a recording activity.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          In a trauma-informed context, studying light offers a particularly
          safe attentional anchor. Light is non-threatening, non-narrative,
          and present-tense. It changes constantly, providing novelty without
          surprise. For someone whose nervous system is habituated to
          scanning for threat, redirecting that scanning ability toward the
          behavior of light can be both calming and deeply absorbing -- a
          productive use of hypervigilance.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: Study the Light
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Focus on light behavior, not objects. Direction, quality,
          temperature, shadow.
        </p>
        <ObservationScene
          scene="window-light"
          mode="light-study"
          promptText="I notice the light..."
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="light-study-prompt"
        question="Look at the light in your current space right now. Describe: (1) Direction -- where is it coming from? (2) Quality -- hard or soft? (3) Temperature -- warm, cool, neutral? (4) Shadow -- what shapes do the shadows make?"
        placeholder="The light is coming from..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What distinguishes a photographer\'s way of seeing from ordinary looking?',
            options: [
              {
                id: 'a',
                label: 'They look at light itself, not just objects illuminated by it',
                correct: true,
              },
              {
                id: 'b',
                label: 'They have naturally sharper vision',
                correct: false,
              },
              {
                id: 'c',
                label: 'They focus on identifying objects quickly',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Hard light creates:',
            options: [
              {
                id: 'a',
                label: 'Gentle, gradual shadow transitions',
                correct: false,
              },
              {
                id: 'b',
                label: 'Sharp, well-defined shadow edges',
                correct: true,
              },
              {
                id: 'c',
                label: 'No shadows at all',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="photo-l2-feynman"
        prompt="Explain to a child why shadows are not 'nothing' -- they are full of information."
        rubric={[
          'You described shadow as information about shape, depth, or time.',
          'You gave a concrete example the child could verify.',
          'You connected shadow-seeing to a broader skill of attention.',
          'The explanation was vivid, not abstract.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Were you aware of the light in your space before this lesson? What shifted when you started looking at light rather than through it?"
          lessonId="observation.photography-as-seeing.light-study"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Photography as Seeing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Single Subject
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

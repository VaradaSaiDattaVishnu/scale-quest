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
 * Lesson 1 -- Frame Before You Shoot
 * Photography as deliberate seeing, not compulsive capturing.
 * Composition as an attention discipline.
 */

export default function Lesson1_FrameBeforeShoot({
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
          Frame Before You Shoot
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Photography as attention practice, not content production.
        </p>
      </header>

      {/* Research paragraph: Photography and sustained attention */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The camera phone has made photography frictionless -- and that
          frictionlessness has cost us something. When you can take hundreds
          of photos in minutes, the act of photographing becomes a substitute
          for the act of seeing. You point, tap, and move on, trusting the
          device to store what your eyes barely registered. Research by Linda
          Henkel (2014) documented what she called the "photo-taking
          impairment effect": people who photographed objects in a museum
          remembered significantly less about them than people who simply
          observed them. The camera became a memory outsourcing device.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          But Henkel also found an important exception: when participants
          zoomed in on a specific detail before photographing, the impairment
          vanished. The act of framing -- deciding what to include and what
          to exclude -- restored attentional engagement. This suggests that
          it is not photography itself that impairs memory, but automatic,
          unconsidered photography. Deliberate framing transforms the camera
          from a bypass to a focusing tool.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: The Viewfinder Discipline ---- */}
      <VisualStepExplainer
        title="The viewfinder as attention tool"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="relative">
                  {/* Viewfinder frame */}
                  <motion.svg
                    width="200"
                    height="140"
                    viewBox="0 0 200 140"
                    fill="none"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <rect
                      x="10"
                      y="10"
                      width="180"
                      height="120"
                      rx="4"
                      stroke="#4F7A5A"
                      strokeWidth="2"
                      fill="rgba(79,122,90,0.04)"
                    />
                    {/* Rule of thirds grid */}
                    <line x1="70" y1="10" x2="70" y2="130" stroke="#4F7A5A" strokeWidth="0.5" opacity="0.4" />
                    <line x1="130" y1="10" x2="130" y2="130" stroke="#4F7A5A" strokeWidth="0.5" opacity="0.4" />
                    <line x1="10" y1="50" x2="190" y2="50" stroke="#4F7A5A" strokeWidth="0.5" opacity="0.4" />
                    <line x1="10" y1="90" x2="190" y2="90" stroke="#4F7A5A" strokeWidth="0.5" opacity="0.4" />
                    {/* Intersection dots */}
                    {[
                      [70, 50], [130, 50], [70, 90], [130, 90],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="3"
                        fill="#4F7A5A"
                        opacity="0.6"
                      />
                    ))}
                  </motion.svg>
                </div>
                <p className="text-xs font-ui text-ink-tertiary text-center max-w-xs">
                  The viewfinder is a rectangle of attention. Everything
                  inside it is selected; everything outside is excluded.
                </p>
              </div>
            ),
            caption:
              'A viewfinder forces a decision: what do I include? That decision is an act of attention. The rule-of-thirds grid provides structure for where to place focal points.',
          },
          {
            visual: (
              <div className="flex items-center gap-6 py-4 justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                    style={{ borderColor: '#B89466' }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="8" width="24" height="16" rx="2" stroke="#B89466" strokeWidth="1.5" />
                      <circle cx="16" cy="16" r="4" stroke="#B89466" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                    Snap first
                  </p>
                  <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>
                    Memory impaired
                  </p>
                </div>
                <span className="text-ink-tertiary font-ui">vs</span>
                <div className="text-center">
                  <motion.div
                    className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                    style={{ borderColor: '#4F7A5A' }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <rect x="4" y="8" width="24" height="16" rx="2" stroke="#4F7A5A" strokeWidth="1.5" />
                      <circle cx="16" cy="16" r="4" stroke="#4F7A5A" strokeWidth="1.5" />
                      <circle cx="16" cy="16" r="2" fill="#4F7A5A" />
                    </svg>
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                    Frame first
                  </p>
                  <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>
                    Memory preserved
                  </p>
                </div>
              </div>
            ),
            caption:
              'Henkel (2014): automatic photography impairs memory. Deliberate framing -- choosing what to zoom into, what to exclude -- restores it.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                {[
                  { step: '1. Look', desc: 'Observe the full scene for 30 seconds' },
                  { step: '2. Choose', desc: 'Select one subject or detail' },
                  { step: '3. Frame', desc: 'Compose the shot before touching the shutter' },
                  { step: '4. Shoot', desc: 'One deliberate exposure' },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    className="flex items-center gap-3 w-full max-w-sm bg-surface rounded-calm p-3 border border-line-soft"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span
                      className="text-sm font-ui font-bold w-8 text-center"
                      style={{ color: '#4F7A5A' }}
                    >
                      {item.step.split('.')[0]}.
                    </span>
                    <div>
                      <p className="text-xs font-ui text-ink-primary font-medium">
                        {item.step.split('. ')[1]}
                      </p>
                      <p className="text-[10px] font-ui text-ink-tertiary">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ),
            caption:
              'The "Frame Before You Shoot" protocol: Look, Choose, Frame, Shoot. Each step is a deliberate act of attention, not a reflex.',
          },
        ]}
      />

      {/* Research paragraph: Cartier-Bresson */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Henri Cartier-Bresson, widely considered the father of modern
          photojournalism, described photography as "the simultaneous
          recognition, in a fraction of a second, of the significance of an
          event as well as of a precise organization of forms which give that
          event its proper expression." He called this the "decisive moment"
          -- not a lucky snap, but the culmination of sustained, disciplined
          seeing. Cartier-Bresson would sometimes wait for hours in a single
          location, watching the geometry of light and movement until all
          elements aligned.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This approach is the opposite of spray-and-pray digital photography.
          It treats each frame as a commitment -- a statement that says, "I
          have seen this, and it matters." The discipline of shooting
          deliberately, even with a phone camera, trains the same perceptual
          muscles that Cartier-Bresson developed over decades: patience,
          spatial awareness, and the ability to hold visual attention on a
          scene until its structure reveals itself.
        </p>
      </section>

      {/* ---- OBSERVATION SCENE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: Frame a Scene
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Before you compose, spend 30 seconds just looking.
        </p>
        <ObservationScene
          scene="urban-light"
          mode="frame"
          promptText="What would you include in your frame? What would you leave out?"
        />
      </section>

      {/* ---- PROMPT ---- */}
      <Prompt
        id="frame-before-shoot"
        question="Look at something near you for 30 seconds without picking up your phone. Then describe the single frame you would compose: What is the subject? What is included? What is deliberately excluded? Why?"
        placeholder="My frame would include..."
        onSave={savePromptAnswer}
      />

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What did Henkel\'s study find about photographing museum objects?',
            options: [
              {
                id: 'a',
                label: 'Photography always improves memory',
                correct: false,
              },
              {
                id: 'b',
                label: 'Automatic photography impaired memory; deliberate framing restored it',
                correct: true,
              },
              {
                id: 'c',
                label: 'Photography had no effect on memory',
                correct: false,
              },
            ],
          },
          {
            prompt: 'Cartier-Bresson\'s "decisive moment" requires:',
            options: [
              {
                id: 'a',
                label: 'Taking many photos quickly and choosing the best later',
                correct: false,
              },
              {
                id: 'b',
                label: 'Sustained attention until elements align in the frame',
                correct: true,
              },
              {
                id: 'c',
                label: 'Expensive camera equipment',
                correct: false,
              },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="photo-l1-feynman"
        prompt="Explain to someone who takes 200 photos a day why taking fewer, more deliberate photos might actually help them see more."
        rubric={[
          'You explained the photo-taking impairment effect.',
          'You described framing as an act of attention, not restriction.',
          'You used an example that would resonate with a phone photographer.',
          'You did not sound judgmental about their current habit.',
        ]}
      />

      {/* ---- REFLECTION ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="How do you currently use photography? Is it more about capturing or seeing? What would shift if you paused before every shot?"
          lessonId="observation.photography-as-seeing.frame-before-shoot"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Photography as Seeing
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Light Study
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

import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 6 -- Two-Card System
 * Advanced encoding: combining two cards at a time for faster deck memorization.
 * Visual breakdown of the combination process and comparison with 3-card PAO.
 */

export default function Lesson6_TwoCardSystem({
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
          The Two-Card System
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Advanced encoding: fewer scenes, faster decks, higher information density.
        </p>
      </header>

      {/* Research paragraph: Why two-card systems exist */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The standard PAO approach to cards groups three cards per composite scene, producing about 17 scenes for a 52-card deck. This is effective and is how most beginners learn. But top competitors have found that reducing to two cards per scene -- while requiring a larger image set -- produces significant speed advantages. The two-card system creates 26 scenes per deck instead of 17, but each scene is simpler and can be generated faster.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The trade-off is between scene complexity and image-set size. In a two-card PAO system, you need a unique Person-Action or Person-Object pair for every possible two-card combination. With 52 cards, there are 52 x 51 = 2,652 possible ordered pairs. No one memorizes all 2,652; instead, competitors use a systematic encoding where the first card determines the Person and the second card determines the Action (or Object), drawing from their existing 52-card PAO list.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ben Pridmore and others have demonstrated that the two-card system, once automated, allows for sub-15-second deck memorization. The key insight from cognitive load theory (Sweller, 1988) is that simpler scenes -- a Person doing an Action, without a third Object component -- impose less load on working memory during encoding, even though there are more scenes to place along the mental journey.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Two-Card vs Three-Card ---- */}
      <VisualStepExplainer
        title="Two-Card vs Three-Card Encoding"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-6 py-4">
                <div className="grid grid-cols-2 gap-6 max-w-md">
                  {/* Three-card */}
                  <motion.div
                    className="bg-surface rounded-calm border border-line-soft p-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <p className="text-xs font-ui font-semibold text-ink-primary text-center mb-3">3-Card PAO</p>
                    <div className="flex gap-1 justify-center mb-2">
                      {['P', 'A', 'O'].map((l, i) => (
                        <div
                          key={l}
                          className="w-8 h-8 rounded-sm border flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: ['#4F7A5A', '#B89466', '#5B6F8C'][i] }}
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center">3 cards = 1 scene</p>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center">~17 scenes per deck</p>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center">More complex scenes</p>
                  </motion.div>
                  {/* Two-card */}
                  <motion.div
                    className="bg-surface rounded-calm border-2 p-4"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs font-ui font-semibold text-center mb-3" style={{ color: '#4F7A5A' }}>2-Card PA</p>
                    <div className="flex gap-1 justify-center mb-2">
                      {['P', 'A'].map((l, i) => (
                        <div
                          key={l}
                          className="w-8 h-8 rounded-sm border flex items-center justify-center text-xs font-bold text-white"
                          style={{ backgroundColor: ['#4F7A5A', '#B89466'][i] }}
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center">2 cards = 1 scene</p>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center">26 scenes per deck</p>
                    <p className="text-[10px] font-ui text-ink-tertiary text-center">Simpler, faster scenes</p>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'The two-card system creates more scenes (26 vs 17), but each scene is simpler -- just a Person doing an Action. Less mental assembly time per scene can mean faster overall encoding.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2 items-center">
                  <motion.div
                    className="w-12 h-16 rounded-sm bg-white border-2 flex items-center justify-center"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="font-mono text-sm font-bold" style={{ color: '#4F7A5A' }}>K{'\u2663'}</span>
                  </motion.div>
                  <motion.div
                    className="w-12 h-16 rounded-sm bg-white border-2 flex items-center justify-center"
                    style={{ borderColor: '#B89466' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                  >
                    <span className="font-mono text-sm font-bold" style={{ color: '#B89466' }}>7{'\u2665'}</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                      <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#5B6F8C" strokeWidth="2" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="rounded-gentle border-2 p-3 bg-surface max-w-[160px]"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs font-ui text-ink-primary text-center">
                      <span className="font-bold" style={{ color: '#4F7A5A' }}>King of Clubs' Person</span>{' '}
                      <span className="font-bold" style={{ color: '#B89466' }}>7 of Hearts' Action</span>
                    </p>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'Example: King of Clubs + 7 of Hearts. Take the Person from the first card\'s PAO and the Action from the second card\'s PAO. One compact scene for two cards.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm border border-line-soft p-4 max-w-sm">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3 text-center">Scene Complexity Comparison</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-ui text-ink-tertiary">3-Card PAO (P+A+O)</span>
                        <span className="text-[10px] font-ui text-ink-tertiary">3 components</span>
                      </div>
                      <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: '#B89466' }}
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-ui text-ink-tertiary">2-Card PA (P+A)</span>
                        <span className="text-[10px] font-ui text-ink-tertiary">2 components</span>
                      </div>
                      <div className="h-2 bg-line-soft rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: '#4F7A5A' }}
                          initial={{ width: 0 }}
                          animate={{ width: '67%' }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-3 text-center">
                    Lower complexity = faster assembly = less cognitive load per scene
                  </p>
                </div>
              </div>
            ),
            caption: 'Each two-card scene has 33% less complexity. Over 26 scenes, the cumulative time savings add up to seconds -- which matters when world records are measured in fractions.',
          },
        ]}
      />

      {/* Research paragraph: Cognitive load and the trade-off */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          John Sweller's cognitive load theory distinguishes between intrinsic load (the inherent difficulty of the material), extraneous load (load imposed by poor design), and germane load (load that contributes to learning). In the context of PAO, a three-component scene has higher intrinsic load than a two-component scene. The two-card system reduces intrinsic load per scene at the cost of more scenes -- but since the journey (memory palace) can accommodate additional loci easily, the net effect is positive for speed.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          However, the two-card system is not for beginners. It requires that your base PAO images (all 52 cards) are fully automatic before you start mixing Person from one card with Action from another. If the base images are not instantaneous, the combination step introduces confusion rather than speed. The standard progression is: master 3-card PAO first, build speed to under 2 minutes per deck, then transition to 2-card encoding.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: When to Switch ---- */}
      <VisualStepExplainer
        title="When to Transition to Two-Card"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { milestone: 'All 52 card images are automatic (<1s recall)', ready: true },
                    { milestone: '3-card PAO deck time under 2 minutes', ready: true },
                    { milestone: 'Error rate below 5% on full deck recall', ready: true },
                    { milestone: 'Memory palace has 26+ well-practiced loci', ready: true },
                  ].map((item, i) => (
                    <motion.div
                      key={item.milestone}
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: item.ready ? '#4F7A5A' : 'rgba(91,111,140,0.2)' }}
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                      <span className="text-xs font-ui text-ink-secondary">{item.milestone}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'All four milestones should be met before transitioning. Switching too early creates interference between the old and new systems.',
          },
        ]}
      />

      {/* ---- DragMatch Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match System Characteristics
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Drag each feature to the correct system
        </p>
        <DragMatch
          pairs={[
            { left: '17 scenes per deck', right: '3-Card PAO' },
            { left: '26 scenes per deck', right: '2-Card PA' },
            { left: 'Higher complexity per scene', right: '3-Card PAO' },
            { left: 'Lower cognitive load per scene', right: '2-Card PA' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the main advantage of the two-card system over three-card PAO?',
            options: [
              { id: 'fewer', label: 'Fewer scenes to remember', correct: false },
              { id: 'simpler', label: 'Simpler scenes that can be assembled faster', correct: true },
              { id: 'easier', label: 'Easier to learn for beginners', correct: false },
            ],
          },
          {
            prompt: 'When should you transition from 3-card to 2-card encoding?',
            options: [
              { id: 'start', label: 'From the very beginning', correct: false },
              { id: 'auto', label: 'After all base card images are automatic and deck time is under 2 minutes', correct: true },
              { id: 'never', label: 'Never -- 3-card is always better', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson6-feynman"
        prompt="Explain why a system with MORE scenes (26 vs 17) can be FASTER overall. Use the concept of cognitive load to make your case."
        rubric={[
          'You explained that each scene is simpler (2 components vs 3).',
          'You connected this to cognitive load -- less assembly work per scene.',
          'You mentioned that the cumulative time savings outweigh the extra scenes.',
          'You noted that this only works when base images are fully automatic.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 6 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Full practice deck walkthrough
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

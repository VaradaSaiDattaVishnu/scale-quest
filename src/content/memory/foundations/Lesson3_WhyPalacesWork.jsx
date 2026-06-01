import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  MemoryPalace3D,
  AnimatedBrain,
  EncodingDepthViz,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Why Memory Palaces Work
 * VISUAL + RESEARCH REWRITE: visual illustrations interspersed with
 * research-backed text paragraphs for deeper understanding.
 */

export default function Lesson3_WhyPalacesWork({
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
          Why Memory Palaces Work
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your brain already has the world's best filing system. It is spatial.
        </p>
      </header>

      {/* Research paragraph: Simonides and the method of loci */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The story begins around 500 BCE, at a banquet in ancient Greece. The poet Simonides of Ceos stepped outside just before the roof collapsed, killing everyone inside. When asked to help identify the crushed, unrecognizable bodies, Simonides discovered he could remember exactly where each guest had been sitting. He had not tried to memorize the seating -- his spatial memory had recorded it automatically. From this accidental discovery came the method of loci, one of the oldest and most powerful memory techniques ever devised.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For the next 2,500 years, orators, scholars, and competitors have used this technique to perform feats of memory that seem impossible. Cicero delivered hours-long speeches from memory by mentally walking through a palace. Matteo Ricci used the method to learn Classical Chinese in the sixteenth century. Today, competitive mnemonists use memory palaces to memorize the order of a shuffled deck of cards in under fifteen seconds. The method works not because these people have unusual brains, but because they are exploiting a capacity every human brain already has.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Spatial Memory ---- */}
      <VisualStepExplainer
        title="Your brain's strongest storage system"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="relative w-64 h-48 rounded-calm overflow-hidden border border-line-soft"
                  style={{ background: 'linear-gradient(180deg, #EDE8DD 0%, #D4CFC4 100%)' }}
                >
                  {/* Simplified house interior */}
                  <div className="absolute bottom-0 left-0 right-0 h-[40%]" style={{ backgroundColor: '#C9C2B4' }} />
                  <div className="absolute top-[15%] left-[10%] w-[30%] h-[45%] rounded-sm" style={{ backgroundColor: '#B5A485', border: '2px solid #A6956F' }} />
                  <div className="absolute top-[20%] right-[15%] w-[20%] h-[30%] rounded-sm border-2" style={{ borderColor: '#8FA1B8' }} />
                  {/* Pulsing markers */}
                  {[
                    { x: 25, y: 35, label: 'Door' },
                    { x: 55, y: 50, label: 'Table' },
                    { x: 80, y: 30, label: 'Window' },
                  ].map((pt, i) => (
                    <motion.div
                      key={pt.label}
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        left: `${pt.x}%`,
                        top: `${pt.y}%`,
                        backgroundColor: '#4F7A5A',
                        transform: 'translate(-50%, -50%)',
                      }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
                  ))}
                </motion.div>
              </div>
            ),
            caption: 'Picture your childhood home. Walk in through the front door. What is to your left? This spatial memory is ancient, powerful, and nearly universal.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4">
                <AnimatedBrain activeStage="encoding" interactive={false} size="md" />
                <div className="bg-surface rounded-calm p-3 border border-line-soft max-w-xs">
                  <p className="text-xs font-ui text-center text-ink-secondary">
                    The <span className="font-semibold" style={{ color: '#B89466' }}>hippocampus</span> handles both spatial navigation and memory formation.
                    Same brain structure. Same circuitry.
                  </p>
                </div>
              </div>
            ),
            caption: 'The hippocampus is fundamentally a spatial organ. It evolved for navigation, then got recruited for memory. That is why spatial memory is so reliable.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-calm bg-surface border border-line-soft flex items-center justify-center">
                      <span className="font-reading text-sm text-ink-tertiary">eggs</span>
                    </div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Abstract word</p>
                  </div>
                  <motion.svg width="40" height="20" viewBox="0 0 40 20">
                    <motion.path
                      d="M5 10 H30"
                      stroke="#4F7A5A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <path d="M30 10 L24 5 M30 10 L24 15" stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-2xl">🥚</span>
                    </motion.div>
                    <p className="text-[10px] font-ui" style={{ color: '#4F7A5A' }}>At the front door</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'The insight: anchor abstract information to a specific place you already know. The spatial scaffolding gives it a home your brain can find.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  {[
                    { era: '500 BCE', who: 'Simonides', what: 'Remembered banquet guests by where they sat' },
                    { era: '55 BCE', who: 'Cicero', what: 'Delivered hours-long speeches from memory' },
                    { era: '1500s', who: 'Matteo Ricci', what: 'Learned Classical Chinese using palace systems' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.era}
                      className="bg-surface rounded-calm p-3 border border-line-soft"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2, duration: 0.4 }}
                    >
                      <p className="text-xs font-ui font-semibold text-accent-stilled mb-1">{item.era}</p>
                      <p className="text-xs font-ui font-medium text-ink-primary mb-1">{item.who}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary leading-snug">{item.what}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: '2,500 years of use. The method of loci is not a modern invention -- it is one of humanity\'s oldest technologies for thought.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">Dual Coding Theory (Paivio, 1970s)</p>
                <div className="flex items-center gap-4">
                  <motion.div
                    className="w-24 h-24 rounded-calm border-2 flex flex-col items-center justify-center p-2"
                    style={{ borderColor: '#5B6F8C' }}
                  >
                    <span className="text-xs font-ui" style={{ color: '#5B6F8C' }}>VERBAL</span>
                    <span className="font-reading text-sm text-ink-secondary mt-1">"eggs"</span>
                  </motion.div>
                  <motion.div
                    className="text-2xl font-bold text-ink-tertiary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    +
                  </motion.div>
                  <motion.div
                    className="w-24 h-24 rounded-calm border-2 flex flex-col items-center justify-center p-2"
                    style={{ borderColor: '#4F7A5A' }}
                  >
                    <span className="text-xs font-ui" style={{ color: '#4F7A5A' }}>VISUAL</span>
                    <span className="text-2xl mt-1">🥚🚪</span>
                  </motion.div>
                </div>
                <motion.div
                  className="w-32 h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'var(--color-line-soft)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: '#4F7A5A' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </motion.div>
                <p className="text-[10px] font-ui text-ink-tertiary">Two traces are more durable than one</p>
              </div>
            ),
            caption: 'Dual coding: encoding in BOTH verbal and visual form creates two independent traces. If one degrades, the other can still retrieve the memory.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-2">Plain encoding</p>
                    <p className="font-reading text-sm text-ink-secondary">"Eggs at door"</p>
                    <div className="mt-2 h-1 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[25%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                    </div>
                  </div>
                  <div className="rounded-calm p-3 border-2 text-center" style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}>
                    <p className="text-xs font-ui mb-2" style={{ color: '#4F7A5A' }}>Vivid encoding</p>
                    <p className="font-reading text-sm text-ink-primary">"Giant egg oozing yolk over doorknob, warm, humming"</p>
                    <div className="mt-2 h-1 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[85%] rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'The more vivid, bizarre, and multi-sensory the image, the stronger the trace. Your brain encodes unusual things more deeply -- it evolved that way.',
          },
        ]}
      />

      {/* Research paragraph: Spatial memory and the hippocampus */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 2014, John O'Keefe, May-Britt Moser, and Edvard Moser won the Nobel Prize in Physiology or Medicine for discovering the brain's internal GPS. O'Keefe found "place cells" in the hippocampus -- neurons that fire only when an animal is in a specific location. The Mosers found "grid cells" in the entorhinal cortex that tile space into a hexagonal coordinate system. Together, these cells create a spatial map of the world that the brain uses for navigation.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The critical insight for memory is that the hippocampus handles both spatial navigation and memory formation using the same neural machinery. This is not a coincidence -- it is evolution. The hippocampus evolved first as a navigation organ in early mammals that needed to remember where food, water, and predators were located. Over millions of years, this spatial scaffolding was recruited for all kinds of memory. When you place a shopping list item "at the front door" of your mental palace, you are tapping into circuitry that your brain has been optimizing for survival for a very long time.
        </p>
      </section>

      {/* Research paragraph: Dual coding theory */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Allan Paivio proposed dual coding theory in 1971, and it explains another reason palaces work so well. His research showed that information encoded in both verbal and visual form creates two independent memory traces. If one trace degrades, the other can still support retrieval. A word like "eggs" stored only as text has one trace. The same word encoded as a vivid image of a cracked egg oozing yolk over your doorknob has two traces -- verbal and visual -- plus spatial, emotional, and sensory associations.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Studies of competitive mnemonists using brain imaging confirm this. When memory athletes encode information using palaces, they show heightened activity in visual and spatial brain regions that ordinary memorizers do not engage. Remarkably, research by Dresler and colleagues in 2017 found that after just six weeks of palace training, previously average memorizers showed the same neural activation patterns as world-class competitors. The palace technique does not require a special brain -- it reshapes the one you have.
        </p>
      </section>

      {/* ---- INTERACTIVE PALACE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Build Your First Palace
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Click each numbered spot to place a vivid image. Then walk through.
        </p>
        <MemoryPalace3D />
      </section>

      {/* ---- Short bridge ---- */}
      <p className="font-reading text-ink-secondary text-center max-w-lg mx-auto my-6 leading-relaxed">
        A palace by itself is an encoding technique. Combined with retrieval practice
        -- mentally walking through and recalling each image -- it becomes genuinely powerful.
      </p>

      {/* Research paragraph: Competition mnemonists and everyday use */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          You might wonder whether the method of loci is just a party trick -- impressive at competitions but impractical for everyday learning. The research suggests otherwise. Medical students trained in the method of loci retained significantly more anatomy information than control groups in a 2014 study by Qureshi and colleagues. Law students using palaces outperformed peers on case retention. The technique scales from memorizing a grocery list to mastering an entire body of professional knowledge.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The key to making palaces practical is combining them with retrieval practice. Building the palace is encoding. Mentally walking through it and recalling each image is retrieval. When you space those mental walkthroughs over time, you get the triple benefit of deep encoding, active retrieval, and distributed practice -- the three most powerful learning strategies cognitive science has identified, working together in a single technique.
        </p>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why is spatial memory so reliable?',
            options: [
              { id: 'modern', label: 'It was invented in modern neuroscience labs', correct: false },
              { id: 'ancient', label: 'It evolved over millions of years for survival navigation', correct: true },
              { id: 'simple', label: 'Spaces are simpler than words', correct: false },
            ],
          },
          {
            prompt: 'What does "dual coding" mean for memory?',
            options: [
              { id: 'twice', label: 'Reading something twice', correct: false },
              { id: 'verbal-visual', label: 'Encoding in both verbal and visual form', correct: true },
              { id: 'two-books', label: 'Using two textbooks', correct: false },
            ],
          },
          {
            prompt: 'Why do bizarre images work better in a palace?',
            options: [
              { id: 'funny', label: 'Because funny things are easier', correct: false },
              { id: 'novel', label: 'The brain encodes unusual, multi-sensory stimuli more deeply', correct: true },
              { id: 'effort', label: 'Because they take more effort to imagine', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="lesson3-feynman"
        prompt="Explain to a 12-year-old why walking through your bedroom in your mind helps you remember a shopping list."
        rubric={[
          'You mentioned that spatial memory is especially strong (even if you didn\'t use those exact words).',
          'You described placing items at specific locations, not just "thinking about your room."',
          'You gave a concrete example of at least one vivid image at one location.',
          'A 12-year-old hearing your explanation would want to try it.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Did the palace imagery feel natural, forced, or somewhere in between? Write honestly -- this is a starting point, not a test."
          lessonId="memory.foundations.why-palaces-work"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 6 &middot; Foundations
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Retrieval practice -- the evidence and the craft
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

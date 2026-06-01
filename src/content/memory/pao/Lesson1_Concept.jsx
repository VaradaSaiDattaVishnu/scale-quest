import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  AnimatedBrain,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Person-Action-Object Concept
 * Introduces the PAO mnemonic system: each 2-digit number maps to a Person
 * doing an Action with an Object. For 6-digit groups, combine three images.
 * Research grounding: Dominic O'Brien, chunking theory, competitive memory history.
 */

export default function Lesson1_Concept({
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
          Person-Action-Object
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The system that lets competitors memorize a shuffled deck in under 20 seconds.
        </p>
      </header>

      {/* Research paragraph: Origins of PAO */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In the early 1990s, Dominic O'Brien -- an eight-time World Memory Champion -- developed a technique that transformed competitive memory sports. Instead of trying to hold raw digits in working memory, he assigned every two-digit number (00 through 99) a vivid Person performing an Action on an Object. The number 34 might become "Albert Einstein (Person) juggling (Action) flaming torches (Object)." The number was gone; a living image remained.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This works because of a principle cognitive scientists call chunking. George Miller's classic 1956 paper, "The Magical Number Seven, Plus or Minus Two," showed that working memory holds roughly 7 items. But an "item" can be as small as a digit or as large as a meaningful unit. By encoding two digits into one vivid image, PAO triples the information each slot can carry. Six digits become a single composite scene.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The competitive memory world has refined this system over three decades. Today, athletes like Alex Mullen (first American World Memory Champion) use PAO to memorize a full deck of 52 cards in under 15 seconds. The system is not a trick -- it is an architecture for converting abstract symbols into the rich sensory images the brain was evolved to handle.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: How PAO Works ---- */}
      <VisualStepExplainer
        title="How PAO Encodes Numbers"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-3 items-center">
                  {['2', '7'].map((d, i) => (
                    <motion.div
                      key={d + i}
                      className="w-16 h-16 rounded-calm bg-surface border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <span className="font-mono text-2xl text-ink-primary font-bold">{d}</span>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                      <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#5B6F8C" strokeWidth="2" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="px-4 py-3 rounded-gentle border-2 bg-surface"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span className="font-ui text-sm font-medium" style={{ color: '#4F7A5A' }}>
                      27 = Person
                    </span>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Every 2-digit number maps to a Person, an Action, and an Object.</p>
              </div>
            ),
            caption: 'Step 1: Each two-digit number (00-99) gets assigned a Person doing an Action with an Object. The number 27 might be "Michael Jordan slam-dunking a basketball."',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-5 py-4">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { num: '27', role: 'Person', example: 'Michael Jordan', color: '#4F7A5A' },
                    { num: '53', role: 'Action', example: 'painting', color: '#B89466' },
                    { num: '81', role: 'Object', example: 'a violin', color: '#5B6F8C' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.num}
                      className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.25 }}
                    >
                      <p className="font-mono text-lg font-bold text-ink-primary">{item.num}</p>
                      <p className="text-xs font-ui font-medium mt-1" style={{ color: item.color }}>{item.role}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.example}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <p className="font-ui text-sm text-ink-secondary">
                    6-digit number <span className="font-mono font-bold">27-53-81</span>
                  </p>
                </motion.div>
              </div>
            ),
            caption: 'Step 2: To memorize a 6-digit number like 275381, split it into three pairs. Take the Person from the first, the Action from the second, and the Object from the third.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="rounded-gentle border-2 p-6 bg-surface max-w-sm"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-ui text-center text-ink-primary leading-relaxed">
                    <span className="font-bold" style={{ color: '#4F7A5A' }}>Michael Jordan</span>{' '}
                    <span className="font-bold" style={{ color: '#B89466' }}>painting</span>{' '}
                    <span className="font-bold" style={{ color: '#5B6F8C' }}>a violin</span>
                  </p>
                </motion.div>
                <motion.p
                  className="text-xs font-ui text-ink-tertiary text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  One vivid scene = 6 digits stored in a single memory slot
                </motion.p>
              </div>
            ),
            caption: 'Result: "Michael Jordan painting a violin." One bizarre, vivid scene that encodes 275381. The stranger the image, the more memorable it is.',
          },
        ]}
      />

      {/* Research paragraph: Chunking theory */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Why does combining three separate images into one composite scene work so well? The answer lies in how episodic memory functions. The brain does not store scenes as lists of features -- it binds them into unified episodes. When you imagine Michael Jordan painting a violin, the hippocampus encodes the spatial relationships, the motion, the absurdity, and the sensory details into a single trace. Retrieving any part of the scene tends to pull the rest along with it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Nelson Cowan's 2001 refinement of Miller's chunking research showed that the true capacity of working memory is closer to 4 items (not 7), but each item can be an arbitrarily complex chunk. A PAO composite scene -- Person from one number, Action from another, Object from a third -- counts as a single chunk. This is how world-class memorizers hold hundreds of digits in mind: not by having bigger memory, but by packing more information into each slot.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Competitive Memory ---- */}
      <VisualStepExplainer
        title="PAO in Competitive Memory"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-end gap-6">
                  {[
                    { year: '1991', record: '2:29', label: 'First WMC' },
                    { year: '2002', record: '1:08', label: 'PAO era' },
                    { year: '2018', record: '0:13.96', label: 'Current' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.year}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div
                        className="rounded-t-sm flex items-end justify-center"
                        style={{
                          width: '60px',
                          height: `${(3 - i) * 45 + 30}px`,
                          backgroundColor: i === 2 ? '#4F7A5A' : '#5B6F8C',
                        }}
                      >
                        <span className="text-white text-xs font-ui font-bold pb-2">{item.record}</span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.year}</p>
                      <p className="text-[10px] font-ui text-ink-secondary">{item.label}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Speed Cards world record (minutes:seconds)</p>
              </div>
            ),
            caption: 'The Speed Cards world record has dropped from over 2 minutes to under 14 seconds. PAO and its variants are the engine behind this progress.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
                  {/* Brain outline */}
                  <ellipse cx="140" cy="70" rx="120" ry="55" stroke="#5B6F8C" strokeWidth="1.5" opacity="0.3" />
                  {/* Working memory slots */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.rect
                      key={i}
                      x={50 + i * 55}
                      y={45}
                      width="40"
                      height="40"
                      rx="6"
                      stroke="#4F7A5A"
                      strokeWidth="2"
                      fill="rgba(79,122,90,0.08)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    />
                  ))}
                  {/* Labels */}
                  <text x="70" y="70" textAnchor="middle" className="font-ui" fill="#4F7A5A" fontSize="10" fontWeight="bold">PAO</text>
                  <text x="125" y="70" textAnchor="middle" className="font-ui" fill="#4F7A5A" fontSize="10" fontWeight="bold">PAO</text>
                  <text x="180" y="70" textAnchor="middle" className="font-ui" fill="#4F7A5A" fontSize="10" fontWeight="bold">PAO</text>
                  <text x="235" y="70" textAnchor="middle" className="font-ui" fill="#4F7A5A" fontSize="10" fontWeight="bold">PAO</text>
                  <text x="140" y="120" textAnchor="middle" className="font-ui" fill="#5B6F8C" fontSize="10">4 slots x 6 digits = 24 digits at once</text>
                </svg>
              </div>
            ),
            caption: 'With ~4 working memory slots, each holding a PAO composite scene of 6 digits, you can juggle 24 digits at a time. Without PAO, the same slots hold only 4 raw digits.',
          },
        ]}
      />

      {/* Research paragraph: Why vivid/bizarre images stick */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The choice of images matters enormously. Research on the bizarreness effect (McDaniel & Einstein, 1986) shows that unusual, unexpected images are remembered significantly better than mundane ones -- but only when mixed with ordinary items. A scene of "Einstein juggling flaming torches" stands out against a background of normal expectations. The brain's novelty-detection system in the hippocampus flags bizarre combinations for extra processing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          There is also a self-reference effect at work. When you choose your own people, actions, and objects -- drawn from your personal life, your interests, your culture -- the resulting images connect to a dense web of existing memories. A generic "famous person" image is weaker than your grandmother, your favorite athlete, or your childhood teacher. The richer the personal association, the more hooks the memory has to cling to.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In a PAO system, how many digits does one composite scene encode?',
            options: [
              { id: '2', label: '2 digits', correct: false },
              { id: '4', label: '4 digits', correct: false },
              { id: '6', label: '6 digits', correct: true },
            ],
          },
          {
            prompt: 'Why does PAO work, according to chunking theory?',
            options: [
              { id: 'bigger', label: 'It makes your working memory bigger', correct: false },
              { id: 'pack', label: 'It packs more information into each memory slot', correct: true },
              { id: 'skip', label: 'It skips encoding and goes straight to long-term memory', correct: false },
            ],
          },
          {
            prompt: 'Which kind of PAO images tend to be most memorable?',
            options: [
              { id: 'generic', label: 'Generic, common images', correct: false },
              { id: 'personal', label: 'Personally meaningful and vivid images', correct: true },
              { id: 'abstract', label: 'Abstract, concept-based images', correct: false },
            ],
          },
        ]}
      />

      {/* ---- DragMatch Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match the Component
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Drag each PAO component to its role in the composite scene
        </p>
        <DragMatch
          pairs={[
            { left: 'First 2-digit pair', right: 'Supplies the Person' },
            { left: 'Second 2-digit pair', right: 'Supplies the Action' },
            { left: 'Third 2-digit pair', right: 'Supplies the Object' },
            { left: 'Composite scene', right: 'Encodes all 6 digits' },
          ]}
        />
      </section>

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson1-feynman"
        prompt="Explain to someone who has never heard of memory sports why turning the number 275381 into 'Michael Jordan painting a violin' is easier to remember than the raw digits."
        rubric={[
          'You mentioned chunking or the idea that a scene counts as one item in working memory.',
          'You explained that vivid/bizarre images are more memorable than abstract symbols.',
          'You connected it to how the brain naturally handles sensory experience vs. raw data.',
          'A non-expert could follow your explanation without jargon.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Think of three people from your own life who would make vivid PAO images. What makes them memorable to you? Write freely."
          lessonId="memory.pao.concept"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Building your 00-99 PAO list
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

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Abstract Images
 * Abstract images event. Visual gallery.
 */

export default function Lesson5_Images({
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
          Abstract Images
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          When there are no words or numbers -- just shapes.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The abstract images event is unique among memory disciplines because the stimuli resist verbal encoding. Competitors are shown rows of abstract black-and-white images -- shapes, patterns, and doodles that do not correspond to recognizable objects. During recall, they must identify which images they saw and in what order. This event tests pure visual memory and the ability to rapidly impose meaning on meaningless stimuli. It is considered the most challenging event by many competitors because their primary tool -- converting material to vivid images -- is harder to apply when the material is already visual but lacks semantic content.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The dominant strategy is to find something recognizable in each abstract image -- a face, an animal, a letter, a tool -- even if the resemblance is loose. This is called "forced association" and it leverages the brain's natural tendency toward pareidolia: the perception of meaningful patterns in random or ambiguous visual stimuli. Research by Liu and colleagues (2014) showed that people who spontaneously perceive faces and objects in abstract patterns perform better on visual memory tasks. The ability is trainable: with practice, you learn to find familiar shapes in any abstract image within one to two seconds.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Abstract Images ---- */}
      <VisualStepExplainer
        title="Encoding the Unnameable"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
                  {[
                    { d: 'M10 5C15 3 25 8 20 15C15 22 5 18 10 5', label: 'leaf?' },
                    { d: 'M5 20L15 5L25 20L5 20M10 15L20 15', label: 'arrow?' },
                    { d: 'M15 5C25 5 25 15 15 15C5 15 5 25 15 25', label: 'S-curve?' },
                    { d: 'M5 15A10 10 0 1 1 25 15A10 10 0 1 1 5 15M15 5V25', label: 'clock?' },
                  ].map((shape, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm border border-line-soft p-2 text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <svg width="40" height="30" viewBox="0 0 30 30" fill="none" className="mx-auto">
                        <path d={shape.d} stroke="#5B6F8C" strokeWidth="1.5" fill="none" />
                      </svg>
                      <p className="text-[8px] font-ui text-ink-tertiary mt-1">{shape.label}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">Abstract shapes with no inherent meaning</p>
              </div>
            ),
            caption: 'Abstract images resist naming. But your brain wants to find meaning. The technique: force an association. That shape looks like a leaf. This one looks like an arrow. Any association works.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>THREE STRATEGIES</p>
                <div className="w-full max-w-sm space-y-3">
                  {[
                    { strategy: 'Find a familiar object', desc: 'What does this shape look like? A bird? A hat? A number?', color: '#4F7A5A' },
                    { strategy: 'Name a distinctive feature', desc: 'Sharp angles, soft curves, asymmetry, number of prongs', color: '#5B6F8C' },
                    { strategy: 'Create a story with neighbors', desc: 'The "bird" is flying toward the "hat" -- link adjacent images', color: '#B89466' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-surface rounded-calm border border-line-soft"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                        <span className="text-[9px] font-ui font-bold" style={{ color: item.color }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">{item.strategy}</p>
                        <p className="text-[9px] font-ui text-ink-tertiary">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Three strategies, layered for resilience. First, find a recognizable object. Second, note a distinctive visual feature. Third, link adjacent images into a mini-story.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <p className="text-[10px] font-ui font-bold mb-3" style={{ color: '#5B6F8C' }}>RECOGNITION VS. SEQUENCE</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-ui font-medium" style={{ color: '#4F7A5A' }}>Recognition</p>
                      <p className="text-[9px] font-ui text-ink-tertiary">"Have I seen this before?"</p>
                      <p className="text-[9px] font-ui text-ink-secondary mt-1">Easier -- distinctiveness helps</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-ui font-medium" style={{ color: '#B89466' }}>Sequence</p>
                      <p className="text-[9px] font-ui text-ink-tertiary">"Where did this appear?"</p>
                      <p className="text-[9px] font-ui text-ink-secondary mt-1">Harder -- needs palace or story linking</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Some formats test recognition (was this in the set?) while others test sequence (what position was it?). Sequence recall requires palace loci or story chaining; recognition relies on distinctiveness.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The abstract images event trains a skill that transfers broadly: the ability to quickly impose structure and meaning on unfamiliar visual information. This is valuable far beyond competition. Medical imaging (reading X-rays, MRIs), quality control (spotting defects on an assembly line), and security screening (identifying threats in luggage scans) all require the same fundamental ability. Training your visual memory to rapidly categorize and encode abstract patterns sharpens this perceptual skill.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The practical recommendation for training is to start with small sets -- five to ten images -- and focus on building reliable forced associations. Speed will come naturally as your repertoire of visual associations grows. Many competitors maintain a mental library of "go-to shapes" that they have seen before: swoops, spirals, jagged lines, symmetric forms. When a new abstract image arrives, they match it to the closest shape in their library, note the differences, and move on. This template-matching approach dramatically speeds up encoding.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is "forced association" in the context of abstract images?',
            options: [
              { id: 'meaning', label: 'Finding something recognizable in a meaningless shape', correct: true },
              { id: 'memorize', label: 'Memorizing the exact pixel pattern', correct: false },
              { id: 'label', label: 'Assigning a number to each image', correct: false },
            ],
          },
          {
            prompt: 'What is "pareidolia"?',
            options: [
              { id: 'patterns', label: 'Perceiving meaningful patterns in random visual stimuli', correct: true },
              { id: 'memory', label: 'A type of memory palace', correct: false },
              { id: 'forgetting', label: 'A form of memory decay', correct: false },
            ],
          },
          {
            prompt: 'Which recall type is harder for abstract images?',
            options: [
              { id: 'sequence', label: 'Sequence recall -- requires palace loci or story chaining', correct: true },
              { id: 'recognition', label: 'Recognition -- requires perfect visual memory', correct: false },
              { id: 'same', label: 'Both are equally difficult', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="memory-league-l5-feynman"
        prompt="Someone shows you five abstract squiggles and says you must remember them in order. Describe your complete strategy, from first glance to recall."
        rubric={[
          'You described finding a recognizable object in each shape.',
          'You mentioned noting distinctive features as backup.',
          'You explained how to maintain sequence (palace loci or story linking).',
          'Your approach was practical and could be applied immediately.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 5 &middot; Memory League
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next module: Integration
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

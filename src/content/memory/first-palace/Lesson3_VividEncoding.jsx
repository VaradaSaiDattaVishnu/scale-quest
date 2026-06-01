import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
 * Lesson 3 -- Vivid Encoding
 * Module 2: Your First Palace
 *
 * How to make palace images bizarre, emotional, moving, and exaggerated.
 * Research: von Restorff isolation effect and the bizarreness effect.
 */

/* --- inline SVG: bland image (egg on counter) --- */
const BlandImage = () => (
  <div className="flex flex-col items-center">
    <div
      className="w-28 h-28 rounded-calm border-2 flex items-center justify-center"
      style={{ borderColor: '#B89466', backgroundColor: 'rgba(184,148,102,0.05)' }}
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        {/* Counter */}
        <rect x="4" y="36" width="48" height="6" rx="2" fill="#B89466" opacity="0.2" />
        {/* Plain egg */}
        <ellipse cx="28" cy="28" rx="10" ry="13" stroke="#B89466" strokeWidth="1.5" fill="rgba(184,148,102,0.08)" />
      </svg>
    </div>
    <p className="text-[10px] font-ui mt-2" style={{ color: '#B89466' }}>Bland: "An egg on the counter"</p>
  </div>
)

/* --- inline SVG: vivid image (giant rubber duck in kitchen) --- */
const VividImage = () => (
  <div className="flex flex-col items-center">
    <div
      className="w-28 h-28 rounded-calm border-2 flex items-center justify-center relative overflow-hidden"
      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.05)' }}
    >
      <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
        {/* Kitchen counter */}
        <rect x="2" y="52" width="66" height="6" rx="2" fill="#4F7A5A" opacity="0.15" />
        {/* Giant rubber duck body */}
        <motion.ellipse
          cx="35" cy="38" rx="22" ry="18"
          fill="#B89466" opacity="0.3"
          animate={{ ry: [18, 20, 18], rx: [22, 24, 22] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Duck head */}
        <motion.circle
          cx="50" cy="18" r="10"
          fill="#B89466" opacity="0.35"
          animate={{ cy: [18, 16, 18] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Beak */}
        <motion.path
          d="M58 18 L66 16 L58 22 Z"
          fill="#B89466" opacity="0.5"
          animate={{ d: ['M58 18 L66 16 L58 22 Z', 'M58 17 L67 15 L58 21 Z', 'M58 18 L66 16 L58 22 Z'] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {/* Eye */}
        <circle cx="52" cy="15" r="2" fill="#4F7A5A" />
        {/* Splash lines */}
        {[
          { x1: 10, y1: 30, x2: 4, y2: 24 },
          { x1: 60, y1: 30, x2: 66, y2: 24 },
          { x1: 35, y1: 18, x2: 35, y2: 10 },
        ].map((l, i) => (
          <motion.line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="#4F7A5A" strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
    <p className="text-[10px] font-ui mt-2" style={{ color: '#4F7A5A' }}>
      Vivid: "Giant rubber duck wedged in the sink, quacking"
    </p>
  </div>
)

/* --- inline SVG: the BEAM acronym --- */
const BeamDiagram = () => (
  <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
    {[
      { letter: 'B', word: 'Bizarre', desc: 'Unusual, impossible, absurd', color: '#4F7A5A' },
      { letter: 'E', word: 'Emotional', desc: 'Funny, disgusting, thrilling', color: '#4F7A5A' },
      { letter: 'A', word: 'Active', desc: 'Moving, doing, changing', color: '#4F7A5A' },
      { letter: 'M', word: 'Magnified', desc: 'Oversized, exaggerated, loud', color: '#4F7A5A' },
    ].map((item, i) => (
      <motion.div
        key={item.letter}
        className="bg-surface rounded-calm p-3 border border-line-soft flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.15 }}
      >
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(79,122,90,0.1)' }}
        >
          <span className="font-ui text-lg font-bold" style={{ color: item.color }}>{item.letter}</span>
        </div>
        <div>
          <p className="text-xs font-ui font-semibold text-ink-primary">{item.word}</p>
          <p className="text-[10px] font-ui text-ink-tertiary">{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
)

export default function Lesson3_VividEncoding({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [showVivid, setShowVivid] = useState(false)

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Vivid Encoding
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Ordinary images fade. Strange ones persist.
        </p>
      </header>

      {/* ---- Research: von Restorff effect ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1933, psychiatrist Hedwig von Restorff demonstrated a principle that would become one of the most reliable findings in memory research: in any list of items, the one that stands out -- the "isolated" item -- is remembered far better than the rest. A red word in a list of black words. A face among houses. A bizarre sentence among ordinary ones. The brain preferentially encodes what is different.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is called the isolation effect, or the von Restorff effect. It tells us something crucial about palace construction: the images you place at your loci should not be ordinary. Ordinary images blend into the background of your imagination and vanish. They need to be strange, exaggerated, emotional, or absurd -- anything that makes them stand out against the backdrop of normalcy.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Bland vs Vivid ---- */}
      <VisualStepExplainer
        title="The difference vivid makes"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-8 py-4">
                <BlandImage />
                <motion.div
                  className="text-ink-tertiary font-ui text-sm"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  vs
                </motion.div>
                <VividImage />
              </div>
            ),
            caption: 'Same information: you need to remember "rubber duck." The bland version fades in minutes. The vivid one stays for weeks.',
          },
          {
            visual: <BeamDiagram />,
            caption: 'BEAM: make your images Bizarre, Emotional, Active, and Magnified. Any image that hits two or more of these will stick.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-surface rounded-calm p-3 border border-line-soft">
                    <p className="text-[10px] font-ui text-ink-tertiary uppercase tracking-wide mb-2">Before: Static</p>
                    <p className="font-reading text-sm text-ink-secondary">"Bread on the table"</p>
                    <div className="mt-2 h-1.5 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[15%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                    </div>
                  </div>
                  <div className="rounded-calm p-3 border-2" style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}>
                    <p className="text-[10px] font-ui uppercase tracking-wide mb-2" style={{ color: '#4F7A5A' }}>After: BEAM</p>
                    <p className="font-reading text-sm text-ink-primary">"A loaf of bread the size of a sofa, steaming, singing opera"</p>
                    <div className="mt-2 h-1.5 bg-line-soft rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: '#4F7A5A' }}
                        initial={{ width: '15%' }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'The same item encoded with BEAM principles gets dramatically stronger retention. Bizarre + Active + Magnified = deeply sticky.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">Multi-sensory layering</p>
                <div className="flex items-center gap-3">
                  {[
                    { sense: 'See', example: 'Neon green, oversized', icon: 'M12 4C6.5 4 2 8.5 2 14s4.5 10 10 10 10-4.5 10-10S17.5 4 12 4Z' },
                    { sense: 'Hear', example: 'Crackling, screaming', icon: 'M12 2C8 2 5 6 5 12s3 10 7 10 7-4 7-10S16 2 12 2Z' },
                    { sense: 'Touch', example: 'Slimy, hot, prickly', icon: 'M12 4L4 20h16L12 4Z' },
                    { sense: 'Smell', example: 'Burnt toast, roses', icon: 'M6 12a6 6 0 1012 0 6 6 0 10-12 0Z' },
                  ].map((s, i) => (
                    <motion.div
                      key={s.sense}
                      className="bg-surface rounded-calm p-2 border border-line-soft text-center w-16"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <p className="text-[9px] font-ui font-bold" style={{ color: '#4F7A5A' }}>{s.sense}</p>
                      <p className="text-[8px] font-ui text-ink-tertiary mt-1 leading-tight">{s.example}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The more senses you involve, the more neural pathways encode the image. See it, hear it, feel its texture, smell it. Each sense adds a retrieval route.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm">
                  {[
                    { item: 'Milk', bland: 'Milk on shelf', vivid: 'A cow doing a handstand on your bookshelf, milk spraying everywhere' },
                    { item: 'Keys', bland: 'Keys on hook', vivid: 'A giant golden key singing and unlocking your TV' },
                    { item: 'Phone', bland: 'Phone on desk', vivid: 'Phone growing legs, tap-dancing on the stove, ring tone blasting' },
                  ].map((ex, i) => (
                    <motion.div
                      key={ex.item}
                      className="rounded-calm p-3 border-2 text-center"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.04)' }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <p className="text-xs font-ui font-semibold text-ink-primary mb-1">{ex.item}</p>
                      <p className="text-[9px] font-ui text-ink-tertiary line-through mb-1">{ex.bland}</p>
                      <p className="text-[9px] font-ui leading-snug" style={{ color: '#4F7A5A' }}>{ex.vivid}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Practice: take any item and transform it. Make it huge, loud, absurd, moving. The weirder it is, the better your brain remembers it.',
          },
        ]}
      />

      {/* ---- Research: bizarreness effect ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The "bizarreness effect" in memory research shows that bizarre imagery is remembered better than common imagery -- but with an important caveat. The benefit is strongest when bizarre images are mixed with common ones (the isolation effect again). A list of all bizarre images actually reduces the advantage. This is why memory palaces work so well: each locus provides a familiar, stable background, and the bizarre image you place there stands out against it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Emotion amplifies encoding independently of bizarreness. The amygdala -- the brain's emotional processing center -- modulates hippocampal encoding. When something triggers an emotional response, even a mild one like amusement or surprise, the amygdala signals the hippocampus to encode the event more strongly. Funny, disgusting, surprising, or personally meaningful images all benefit from this pathway.
        </p>
      </section>

      {/* ---- Toggle: bland vs vivid ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          See the Transformation
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Toggle between bland and vivid to feel the difference
        </p>
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowVivid(!showVivid)}
            className="bg-surface rounded-gentle border border-line-soft px-6 py-2 font-ui text-sm"
            style={{ color: showVivid ? '#4F7A5A' : '#B89466' }}
          >
            {showVivid ? 'Showing: Vivid' : 'Showing: Bland'} -- tap to switch
          </button>
        </div>
        <div className="bg-surface rounded-calm border border-line-soft p-6 max-w-sm mx-auto text-center">
          <AnimatePresence mode="wait">
            {showVivid ? (
              <motion.div key="vivid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <VividImage />
                <p className="font-reading text-sm text-ink-secondary mt-4 leading-relaxed">
                  A rubber duck the size of a bathtub, wedged into your kitchen sink, water overflowing, quacking so loudly the windows rattle. The warm rubber smell fills the room.
                </p>
              </motion.div>
            ) : (
              <motion.div key="bland" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <BlandImage />
                <p className="font-reading text-sm text-ink-tertiary mt-4 leading-relaxed">
                  A rubber duck. On the counter. In the kitchen.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ---- DragMatch exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match the BEAM Principle
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Match each vivid image to the principle it uses most
        </p>
        <DragMatch
          pairs={[
            { left: 'A piano that plays itself', right: 'Active' },
            { left: 'A spider the size of a car', right: 'Magnified' },
            { left: 'A fish wearing a top hat', right: 'Bizarre' },
            { left: 'A puppy licking your face', right: 'Emotional' },
          ]}
        />
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the von Restorff isolation effect?',
            options: [
              { id: 'repeat', label: 'Repeated items are remembered best', correct: false },
              { id: 'standout', label: 'Items that stand out from their surroundings are remembered best', correct: true },
              { id: 'first', label: 'The first item in a list is always remembered best', correct: false },
            ],
          },
          {
            prompt: 'Why does a bizarre image work in a memory palace specifically?',
            options: [
              { id: 'all-bizarre', label: 'Because everything in a palace is bizarre', correct: false },
              { id: 'contrast', label: 'The familiar locus provides contrast, making the bizarre image stand out', correct: true },
              { id: 'easier', label: 'Bizarre images are easier to create', correct: false },
            ],
          },
          {
            prompt: 'What does BEAM stand for?',
            options: [
              { id: 'correct', label: 'Bizarre, Emotional, Active, Magnified', correct: true },
              { id: 'wrong1', label: 'Big, Easy, Automatic, Memorable', correct: false },
              { id: 'wrong2', label: 'Bright, Engaging, Abstract, Moving', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="first-palace-lesson3-feynman"
        prompt="Explain to someone why imagining 'a giant octopus juggling flaming pineapples on my desk' would be remembered better than 'pineapples on my desk.'"
        rubric={[
          'You mentioned the isolation effect or explained why standing out matters.',
          'You explained that emotion and bizarreness signal the brain to encode more strongly.',
          'You noted that the familiar desk provides contrast for the bizarre image.',
          'Your explanation would inspire someone to make their own images more vivid.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Try creating three BEAM images right now for three items of your choice. Write them down. Which principle (Bizarre, Emotional, Active, Magnified) came most naturally to you?"
          lessonId="memory.first-palace.vivid-encoding"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 5 &middot; Your First Palace
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Forward and backward -- walking both directions
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

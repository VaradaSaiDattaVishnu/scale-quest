import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  MemoryPalace3D,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Choosing Your Loci
 * Module 2: Your First Palace
 *
 * How to pick 10-20 stable, distinct, well-ordered locations in your palace.
 * Rules for good vs bad loci. Research on spatial memory encoding fidelity.
 */

/* --- inline SVG: Good vs bad locus comparison --- */
const LocusCompare = ({ type = 'good' }) => {
  const isGood = type === 'good'
  const color = isGood ? '#4F7A5A' : '#B89466'
  const bgOpacity = isGood ? '0.06' : '0.06'
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="w-24 h-24 rounded-calm border-2 flex items-center justify-center relative overflow-hidden"
        style={{ borderColor: color, backgroundColor: `rgba(${isGood ? '79,122,90' : '184,148,102'},${bgOpacity})` }}
        animate={isGood ? {} : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {isGood ? (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="16" width="32" height="24" rx="3" stroke={color} strokeWidth="2" />
            <rect x="14" y="22" width="8" height="6" rx="1" fill={color} opacity="0.3" />
            <circle cx="35" cy="18" r="4" stroke={color} strokeWidth="1.5" />
            <motion.circle cx="24" cy="28" r="3" fill={color} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </svg>
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="16" width="32" height="24" rx="3" stroke={color} strokeWidth="1.5" opacity="0.4" />
            <rect x="10" y="18" width="28" height="20" rx="2" stroke={color} strokeWidth="1" opacity="0.2" />
            <motion.path d="M16 28 Q24 20 32 28 Q24 36 16 28" stroke={color} strokeWidth="1" opacity="0.3" animate={{ opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 3, repeat: Infinity }} />
          </svg>
        )}
      </motion.div>
      <p className="text-xs font-ui mt-2 font-medium" style={{ color }}>
        {isGood ? 'Distinct & vivid' : 'Vague & blurred'}
      </p>
    </div>
  )
}

/* --- inline SVG: ordered path diagram --- */
const OrderedPath = () => (
  <svg width="300" height="80" viewBox="0 0 300 80" fill="none" className="mx-auto">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => (
      <g key={n}>
        <motion.circle
          cx={15 + i * 30} cy="40" r="12"
          stroke="#4F7A5A" strokeWidth="1.5" fill="rgba(79,122,90,0.08)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
        />
        <text x={15 + i * 30} y="44" textAnchor="middle" fill="#4F7A5A" fontSize="10" className="font-ui font-bold">{n}</text>
        {i < 9 && (
          <motion.line
            x1={27 + i * 30} y1="40" x2={3 + (i + 1) * 30} y2="40"
            stroke="#4F7A5A" strokeWidth="1" strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: i * 0.1 + 0.1, duration: 0.3 }}
          />
        )}
      </g>
    ))}
    <text x="150" y="72" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="9" className="font-ui">
      Always the same order. No branching. No shortcuts.
    </text>
  </svg>
)

export default function Lesson2_ChoosingLoci({
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
          Choosing Your Loci
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The right anchor points make the palace reliable. The wrong ones make it fog.
        </p>
      </header>

      {/* ---- Research: spatial encoding fidelity ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on spatial memory shows that the brain encodes locations with varying levels of precision. Landmarks that are visually distinctive and emotionally meaningful are represented with sharper neural patterns in the hippocampus. In contrast, generic or interchangeable locations produce overlapping, indistinct representations -- which means the memories attached to them blur together.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why locus selection matters. A well-chosen set of loci produces clean, separated memory bins. A poorly chosen set produces interference -- the brain cannot tell one location from another, and the images you place there become tangled.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Good vs Bad Loci ---- */}
      <VisualStepExplainer
        title="What makes a good locus?"
        steps={[
          {
            visual: (
              <div className="flex items-center justify-center gap-10 py-4">
                <LocusCompare type="good" />
                <div className="text-ink-tertiary font-ui text-sm">vs</div>
                <LocusCompare type="bad" />
              </div>
            ),
            caption: 'A good locus is sharp in your mind -- you can see it, maybe even feel the surface. A bad locus is hazy, generic, hard to distinguish from the next one.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                  {[
                    { rule: 'Distinct', desc: 'Visually unique', icon: '1', color: '#4F7A5A' },
                    { rule: 'Ordered', desc: 'Clear sequence', icon: '2', color: '#4F7A5A' },
                    { rule: 'Well-lit', desc: 'Vivid in mind', icon: '3', color: '#4F7A5A' },
                  ].map((item) => (
                    <motion.div
                      key={item.rule}
                      className="bg-surface rounded-calm p-3 border border-line-soft text-center"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div
                        className="w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2"
                        style={{ backgroundColor: `rgba(79,122,90,0.1)` }}
                      >
                        <span className="font-ui text-sm font-bold" style={{ color: item.color }}>{item.icon}</span>
                      </div>
                      <p className="text-xs font-ui font-semibold text-ink-primary">{item.rule}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Three rules for every locus: it must be distinct from its neighbors, part of a clear order, and well-lit in your mental imagery.',
          },
          {
            visual: <OrderedPath />,
            caption: 'Your loci form a single, unbranching path. When you walk the palace, you always visit them in the same sequence -- 1, 2, 3, never 1, 3, 2.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide">Good loci examples</p>
                <div className="grid grid-cols-2 gap-2 max-w-xs">
                  {[
                    { loc: 'Front door mat', why: 'Textured, specific' },
                    { loc: 'Kitchen sink', why: 'Unique fixture' },
                    { loc: 'Bedroom pillow', why: 'Personal, sensory' },
                    { loc: 'Bathroom mirror', why: 'Reflective, distinct' },
                  ].map((item) => (
                    <div key={item.loc} className="bg-surface rounded-calm px-3 py-2 border border-line-soft">
                      <p className="text-xs font-ui text-ink-primary font-medium">{item.loc}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">{item.why}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide mt-4">Avoid these</p>
                <div className="grid grid-cols-2 gap-2 max-w-xs">
                  {[
                    { loc: '"Somewhere in the hall"', why: 'Too vague' },
                    { loc: '"A wall"', why: 'Which wall? All look alike' },
                    { loc: '"Near the window"', why: 'Not a fixed point' },
                    { loc: '"The floor"', why: 'Too generic' },
                  ].map((item) => (
                    <div key={item.loc} className="rounded-calm px-3 py-2 border border-line-soft" style={{ backgroundColor: 'rgba(184,148,102,0.04)' }}>
                      <p className="text-xs font-ui text-ink-secondary">{item.loc}</p>
                      <p className="text-[10px] font-ui" style={{ color: '#B89466' }}>{item.why}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Good loci are specific objects or spots, not vague areas. "The kitchen sink" beats "the kitchen." "My desk lamp" beats "my desk."',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                    >
                      <span className="font-ui text-2xl font-bold" style={{ color: '#B89466' }}>5</span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Too few</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Crowded</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                    >
                      <span className="font-ui text-2xl font-bold" style={{ color: '#4F7A5A' }}>10-20</span>
                    </motion.div>
                    <p className="text-[10px] font-ui mt-1" style={{ color: '#4F7A5A' }}>Sweet spot</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Room to breathe</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: '#B89466' }}
                    >
                      <span className="font-ui text-2xl font-bold" style={{ color: '#B89466' }}>50+</span>
                    </motion.div>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Too many</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Blurs together</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Start with 10-20 loci. Fewer than 10 and you run out of spots. More than 20 per palace and locations start blending. You can always build more palaces later.',
          },
        ]}
      />

      {/* ---- Research: pattern separation ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Neuroscience calls this "pattern separation" -- the hippocampus's ability to store similar experiences as distinct memories. When two locations in your palace look too alike, the hippocampus struggles to separate them, and the images stored at those locations bleed into each other. This is called interference, and it is the main reason novice palaces fail.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The solution is deliberate contrast. Choose loci that differ in shape, texture, lighting, and emotional tone. A bright kitchen window and a dark coat closet are easy to separate. Two identical hallway sections are not. The more your loci contrast with each other, the cleaner the pattern separation and the more reliable the recall.
        </p>
      </section>

      {/* ---- Sort Sequence exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Build your own route
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Drag these rooms into the order you would walk through your home
        </p>
        <SortSequence
          items={[
            { id: 'kitchen', label: 'Kitchen' },
            { id: 'entry', label: 'Entryway' },
            { id: 'bedroom', label: 'Bedroom' },
            { id: 'living', label: 'Living room' },
            { id: 'bathroom', label: 'Bathroom' },
          ]}
          correctOrder={['entry', 'living', 'kitchen', 'bathroom', 'bedroom']}
        />
        <p className="text-[10px] font-ui text-ink-tertiary text-center mt-3">
          Any consistent order works -- this is just one example. Your route is personal.
        </p>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Which of these is the best locus?',
            options: [
              { id: 'wall', label: '"A wall in the hallway"', correct: false },
              { id: 'sink', label: '"The bathroom sink with the chipped faucet"', correct: true },
              { id: 'floor', label: '"The floor somewhere"', correct: false },
            ],
          },
          {
            prompt: 'Why do similar-looking loci cause problems?',
            options: [
              { id: 'boring', label: 'They are boring to imagine', correct: false },
              { id: 'interference', label: 'The hippocampus cannot separate them, causing interference', correct: true },
              { id: 'forget', label: 'You forget they exist', correct: false },
            ],
          },
          {
            prompt: 'How many loci should a beginner aim for in one palace?',
            options: [
              { id: 'three', label: '3-5', correct: false },
              { id: 'ten', label: '10-20', correct: true },
              { id: 'hundred', label: '100+', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="first-palace-lesson2-feynman"
        prompt="Explain to someone setting up their first memory palace why picking 'the kitchen table leg with the scratch on it' is better than picking 'the kitchen' as a locus."
        rubric={[
          'You explained that specificity prevents interference between loci.',
          'You mentioned that the brain needs distinct visual features to separate locations.',
          'You used a concrete example, not just the abstract principle.',
          'Your explanation would help someone choose better loci for their own palace.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Write down your first 10 loci in order. For each, note one sensory detail -- a texture, a color, a sound. This is the foundation of your palace."
          lessonId="memory.first-palace.choosing-loci"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 5 &middot; Your First Palace
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Vivid encoding -- making images that stick
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

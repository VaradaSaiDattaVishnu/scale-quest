import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  MemoryPalace3D,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Walking Through Your First Palace
 * Module 2: Your First Palace
 *
 * Teaches the method of loci: mentally walking through a familiar space.
 * Covers the historical origin (Simonides of Ceos) and the neuroscience
 * of spatial memory -- O'Keefe and Moser's place cells in the hippocampus.
 */

/* --- inline SVG: person walking through rooms --- */
const WalkingFigure = ({ room = 0 }) => (
  <svg width="280" height="160" viewBox="0 0 280 160" fill="none" className="mx-auto">
    {/* Room outlines */}
    <rect x="10" y="30" width="80" height="100" rx="4" stroke="#5B6F8C" strokeWidth="1.5" opacity="0.3" />
    <rect x="100" y="30" width="80" height="100" rx="4" stroke="#5B6F8C" strokeWidth="1.5" opacity="0.3" />
    <rect x="190" y="30" width="80" height="100" rx="4" stroke="#5B6F8C" strokeWidth="1.5" opacity="0.3" />
    {/* Room labels */}
    <text x="50" y="22" textAnchor="middle" className="font-ui" fill="var(--color-ink-tertiary)" fontSize="10">Entryway</text>
    <text x="140" y="22" textAnchor="middle" className="font-ui" fill="var(--color-ink-tertiary)" fontSize="10">Living Room</text>
    <text x="230" y="22" textAnchor="middle" className="font-ui" fill="var(--color-ink-tertiary)" fontSize="10">Kitchen</text>
    {/* Doorways */}
    <line x1="90" y1="65" x2="100" y2="65" stroke="#4F7A5A" strokeWidth="2" strokeDasharray="3 2" />
    <line x1="180" y1="65" x2="190" y2="65" stroke="#4F7A5A" strokeWidth="2" strokeDasharray="3 2" />
    {/* Walking figure */}
    <motion.g
      animate={{ x: room * 90 }}
      transition={{ type: 'spring', stiffness: 60, damping: 14 }}
    >
      {/* Head */}
      <motion.circle cx="50" cy="60" r="8" fill="#4F7A5A" />
      {/* Body */}
      <motion.line x1="50" y1="68" x2="50" y2="92" stroke="#4F7A5A" strokeWidth="2.5" strokeLinecap="round" />
      {/* Left leg */}
      <motion.line
        x1="50" y1="92" x2="42" y2="110"
        stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round"
        animate={{ x2: [42, 46, 42] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      {/* Right leg */}
      <motion.line
        x1="50" y1="92" x2="58" y2="110"
        stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round"
        animate={{ x2: [58, 54, 58] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
      {/* Arms */}
      <motion.line
        x1="50" y1="75" x2="40" y2="85"
        stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round"
        animate={{ x2: [40, 43, 40] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
      <motion.line
        x1="50" y1="75" x2="60" y2="85"
        stroke="#4F7A5A" strokeWidth="2" strokeLinecap="round"
        animate={{ x2: [60, 57, 60] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
      />
    </motion.g>
    {/* Footstep trail */}
    {[0, 1, 2].filter(i => i < room).map(i => (
      <motion.circle
        key={i}
        cx={50 + i * 90}
        cy="120"
        r="3"
        fill="#4F7A5A"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.2 }}
      />
    ))}
  </svg>
)

/* --- inline SVG: place cell firing pattern --- */
const PlaceCellDiagram = () => (
  <svg width="240" height="140" viewBox="0 0 240 140" fill="none" className="mx-auto">
    {/* Room grid */}
    <rect x="20" y="10" width="200" height="120" rx="6" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
    {/* Place cell firing zones */}
    {[
      { cx: 60, cy: 40, label: 'Cell A' },
      { cx: 140, cy: 70, label: 'Cell B' },
      { cx: 180, cy: 110, label: 'Cell C' },
    ].map((cell, i) => (
      <g key={cell.label}>
        <motion.circle
          cx={cell.cx} cy={cell.cy} r="20"
          fill="#4F7A5A" opacity={0.1}
          animate={{ r: [18, 24, 18], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity }}
        />
        <motion.circle
          cx={cell.cx} cy={cell.cy} r="4"
          fill="#4F7A5A"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity }}
        />
        <text x={cell.cx} y={cell.cy - 28} textAnchor="middle" fill="#4F7A5A" fontSize="9" className="font-ui">{cell.label}</text>
      </g>
    ))}
    {/* Path line connecting cells */}
    <motion.path
      d="M60 40 Q100 55 140 70 Q160 90 180 110"
      stroke="#B89466" strokeWidth="1.5" strokeDasharray="4 3" fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
    />
  </svg>
)

export default function Lesson1_WalkingThrough({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [activeRoom, setActiveRoom] = useState(0)

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Walking Through Your Palace
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The oldest memory technique begins with a place you already know.
        </p>
      </header>

      {/* ---- Research: Historical origin ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Around 500 BCE, the Greek poet Simonides of Ceos attended a banquet. He stepped outside briefly, and the roof collapsed, killing everyone inside. The bodies were unrecognizable -- but Simonides discovered he could identify each guest by remembering where they had been sitting. He had not tried to memorize the seating arrangement. His spatial memory had encoded it automatically.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          From that disaster came the method of loci -- the "method of places." For 2,500 years, orators, scholars, and memory champions have used it. The technique is simple: mentally walk through a familiar space and place vivid images at specific locations. When you need to recall, you walk through again.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Walk ---- */}
      <VisualStepExplainer
        title="Walking the palace"
        steps={[
          {
            visual: <WalkingFigure room={0} />,
            caption: 'Begin at the entrance of a place you know well -- your home, your school route, your childhood bedroom. Stand at the threshold and look around.',
          },
          {
            visual: <WalkingFigure room={1} />,
            caption: 'Move through the space in a consistent order. Always the same path, the same sequence. The route is your scaffold.',
          },
          {
            visual: <WalkingFigure room={2} />,
            caption: 'At each location, pause. Notice a distinct feature -- the kitchen counter, the lamp, the window. These fixed points become your loci.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3">
                <svg width="260" height="100" viewBox="0 0 260 100" fill="none" className="mx-auto">
                  {[
                    { x: 30, label: 'Door', icon: 'M20 80 L30 30 L40 80' },
                    { x: 90, label: 'Sofa', icon: 'M80 60 Q90 45 100 60 L100 75 L80 75 Z' },
                    { x: 150, label: 'Table', icon: 'M140 55 L160 55 L160 75 L140 75 Z' },
                    { x: 210, label: 'Stove', icon: 'M200 50 L220 50 L220 75 L200 75 Z M205 45 Q210 35 215 45' },
                  ].map((loc, i) => (
                    <g key={loc.label}>
                      <motion.path
                        d={loc.icon}
                        stroke="#4F7A5A" strokeWidth="2" fill="rgba(79,122,90,0.1)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.4 }}
                      />
                      <motion.circle
                        cx={loc.x} cy={85} r="3" fill="#B89466"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      />
                      <text x={loc.x} y="98" textAnchor="middle" fill="var(--color-ink-tertiary)" fontSize="9" className="font-ui">{loc.label}</text>
                    </g>
                  ))}
                  {/* Connecting path */}
                  <motion.path
                    d="M35 85 L95 85 L155 85 L215 85"
                    stroke="#B89466" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </svg>
              </div>
            ),
            caption: 'Each locus is a fixed anchor point along your route. Later, you will attach vivid images to these anchors -- one item per locus.',
          },
        ]}
      />

      {/* ---- Research: O'Keefe, Moser, place cells ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1971, John O'Keefe discovered that certain neurons in the hippocampus fire only when a rat is in a specific location -- he called them "place cells." Decades later, May-Britt and Edvard Moser identified "grid cells" that create a coordinate system for navigation. Together, they received the 2014 Nobel Prize for discovering the brain's inner GPS.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why spatial memory is so powerful: the hippocampus -- the same structure that encodes all new memories -- was originally a navigation organ. When you imagine walking through your home, you activate the same neurons that fire when you physically walk through it. Place cells, grid cells, and head-direction cells all engage, creating a dense web of activation that serves as a durable scaffold for any information you attach.
        </p>
      </section>

      {/* ---- Place Cell Visualization ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Place Cells in Action
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Each neuron fires only in its preferred location -- creating a map
        </p>
        <div className="bg-surface rounded-calm border border-line-soft p-6">
          <PlaceCellDiagram />
        </div>
      </section>

      {/* ---- INTERACTIVE PALACE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Walk Through Your Palace
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Click each numbered location and imagine yourself standing there
        </p>
        <MemoryPalace3D
          showLoci={true}
          onLocusClick={(index) => setActiveRoom(index)}
          activeIndex={activeRoom}
        />
      </section>

      {/* ---- Walking exercise ---- */}
      <section className="my-8 max-w-2xl mx-auto">
        <div className="bg-surface rounded-calm border border-line-soft p-6">
          <h3 className="font-ui text-ink-primary text-base font-semibold mb-3">
            Try it now: Your mental walk
          </h3>
          <p className="font-reading text-ink-secondary leading-relaxed mb-3">
            Close your eyes for thirty seconds. Picture the front door of your home. Step inside. Walk through three rooms in order. Notice the floor texture, the light, a piece of furniture. This is your palace.
          </p>
          <Prompt
            question="Which three rooms did you walk through, and what stood out in each?"
            answer="There is no wrong answer -- the goal is to notice that you already have a vivid spatial map in your memory."
          />
        </div>
      </section>

      {/* ---- VISUAL QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why did Simonides remember the positions of the banquet guests?',
            options: [
              { id: 'tried', label: 'He deliberately memorized the seating chart', correct: false },
              { id: 'spatial', label: 'His spatial memory encoded their positions automatically', correct: true },
              { id: 'written', label: 'He had written their names down earlier', correct: false },
            ],
          },
          {
            prompt: 'What are "place cells"?',
            options: [
              { id: 'all', label: 'Neurons that fire in all locations equally', correct: false },
              { id: 'specific', label: 'Hippocampal neurons that fire only in specific locations', correct: true },
              { id: 'visual', label: 'Cells in the visual cortex that process rooms', correct: false },
            ],
          },
          {
            prompt: 'Why is the method of loci so effective?',
            options: [
              { id: 'new', label: 'It uses a brand-new brain system designed for lists', correct: false },
              { id: 'spatial', label: 'It piggybacks on the brain\'s ancient spatial navigation system', correct: true },
              { id: 'simple', label: 'Walking is simpler than reading', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="first-palace-lesson1-feynman"
        prompt="Explain to a friend who has never heard of memory palaces why imagining a walk through your house could help you remember a grocery list."
        rubric={[
          'You mentioned that spatial memory is naturally strong or ancient.',
          'You described placing items at specific locations, not just "thinking about home."',
          'You connected the technique to the brain (hippocampus, place cells, or spatial system).',
          'Your explanation would make someone want to try it right now.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="When you closed your eyes and walked through your home, how vivid was the experience? What surprised you about what you noticed?"
          lessonId="memory.first-palace.walking-through"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; Your First Palace
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Choosing your loci -- picking the right anchor points
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

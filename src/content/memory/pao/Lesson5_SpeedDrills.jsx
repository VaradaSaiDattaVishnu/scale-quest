import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 5 -- Speed Drills
 * Timed exercises for building encoding automaticity.
 * Research grounding: automaticity (Shiffrin & Schneider),
 * chunking speed, power law of practice.
 */

export default function Lesson5_SpeedDrills({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const [drillActive, setDrillActive] = useState(false)
  const [currentNumber, setCurrentNumber] = useState(null)
  const [drillCount, setDrillCount] = useState(0)

  const startDrill = () => {
    setDrillActive(true)
    setDrillCount(0)
    showNextNumber()
  }

  const showNextNumber = () => {
    const num = String(Math.floor(Math.random() * 100)).padStart(2, '0')
    setCurrentNumber(num)
    setDrillCount((c) => c + 1)
  }

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Speed Drills
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          From deliberate recall to automatic fire. Building encoding speed.
        </p>
      </header>

      {/* Research paragraph: Automaticity */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1977, Walter Schneider and Richard Shiffrin published a landmark study distinguishing two modes of cognitive processing: controlled and automatic. Controlled processing is slow, sequential, and demands attention -- like when you first learn to drive and must consciously think about each pedal, mirror, and turn signal. Automatic processing is fast, parallel, and requires little or no attention -- like how an experienced driver navigates familiar roads while holding a conversation.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The transition from controlled to automatic processing follows what psychologists call the power law of practice: reaction time decreases as a power function of the number of practice trials. The first hundred repetitions produce the largest gains. The next hundred produce smaller but still meaningful improvement. Eventually, performance approaches an asymptote -- but that asymptote is far faster than most people imagine when they first start.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          For PAO encoding, automaticity means that seeing the number "47" should trigger its Person-Action-Object image as involuntarily as seeing the word "dog" triggers an image of a dog. This level of automaticity typically requires 200-500 correct retrievals per image. Speed drills are the vehicle for accumulating those retrievals efficiently.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Power Law of Practice ---- */}
      <VisualStepExplainer
        title="The Power Law of Practice"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="160" viewBox="0 0 280 160" fill="none">
                  {/* Axes */}
                  <line x1="40" y1="10" x2="40" y2="130" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  <line x1="40" y1="130" x2="270" y2="130" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  {/* Power law curve */}
                  <motion.path
                    d="M40 20 C60 25, 80 50, 110 75 C140 95, 180 110, 220 118 L270 122"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, ease: 'easeOut' }}
                  />
                  {/* Phase labels */}
                  <text x="75" y="152" className="font-ui" fill="#4F7A5A" fontSize="8" textAnchor="middle">Rapid gains</text>
                  <text x="165" y="152" className="font-ui" fill="#B89466" fontSize="8" textAnchor="middle">Steady progress</text>
                  <text x="245" y="152" className="font-ui" fill="#5B6F8C" fontSize="8" textAnchor="middle">Fine-tuning</text>
                  {/* Y-axis labels */}
                  <text x="35" y="20" className="font-ui" fill="#5B6F8C" fontSize="8" textAnchor="end">Slow</text>
                  <text x="35" y="125" className="font-ui" fill="#4F7A5A" fontSize="8" textAnchor="end">Fast</text>
                  {/* X-axis label */}
                  <text x="155" y="145" className="font-ui" fill="#5B6F8C" fontSize="9" textAnchor="middle">Practice repetitions</text>
                </svg>
              </div>
            ),
            caption: 'The power law of practice: the biggest speed gains come from the first few hundred repetitions. You do not need thousands of hours -- just consistent, focused drilling.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6 items-end">
                  {[
                    { label: 'Week 1', time: '5-8s', height: 100, color: '#B89466' },
                    { label: 'Week 3', time: '2-4s', height: 60, color: '#B89466' },
                    { label: 'Week 6', time: '<1s', height: 25, color: '#4F7A5A' },
                    { label: 'Week 10', time: '<0.5s', height: 12, color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <motion.div
                        className="rounded-t-sm"
                        style={{ width: '48px', backgroundColor: item.color }}
                        initial={{ height: 0 }}
                        animate={{ height: `${item.height}px` }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                      >
                        <span className="block text-center text-[9px] font-ui font-bold text-white pt-2">
                          {item.time}
                        </span>
                      </motion.div>
                      <span className="text-[10px] font-ui text-ink-tertiary mt-1">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Average time to produce PAO image from a 2-digit number</p>
              </div>
            ),
            caption: 'Typical progression: 5-8 seconds per image in week 1, under 1 second by week 6, and sub-500ms for competition-level athletes. The early gains are the most dramatic.',
          },
        ]}
      />

      {/* Research paragraph: Chunking speed */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Herbert Simon and William Chase, studying chess masters in the 1970s, discovered that expert chunking is not just about what gets chunked -- it is about how fast chunks are recognized. A chess grandmaster does not consciously analyze board positions; patterns are recognized in 100-200 milliseconds, triggering automatic strategic responses. The same principle applies to PAO: the goal is not conscious translation but instant pattern recognition.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Speed drills work by compressing the recognition-to-image pathway. Each drill format targets a different bottleneck: flash drills test raw recognition speed, sequence drills test the ability to maintain encoding pace over longer strings, and reverse drills (image-to-number) strengthen the bidirectional association. Competitors who train only in one direction often find that their recall is slower than their encoding, because the reverse pathway was never practiced.
        </p>
      </section>

      {/* ---- INTERACTIVE SPEED DRILL ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Flash Drill: Number to Image
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          See a number, recall its PAO image as fast as you can, then tap Next
        </p>
        <div className="flex flex-col items-center gap-4">
          {!drillActive ? (
            <button
              onClick={startDrill}
              className="px-6 py-3 rounded-gentle font-ui text-sm font-medium text-white"
              style={{ backgroundColor: '#4F7A5A' }}
            >
              Start Flash Drill
            </button>
          ) : (
            <>
              <motion.div
                key={currentNumber}
                className="w-28 h-28 rounded-gentle border-3 flex items-center justify-center bg-surface"
                style={{ borderColor: '#4F7A5A', borderWidth: '3px' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                <span className="font-mono text-4xl font-bold text-ink-primary">{currentNumber}</span>
              </motion.div>
              <p className="text-xs font-ui text-ink-tertiary">
                {drillCount} of 20
              </p>
              {drillCount < 20 ? (
                <button
                  onClick={showNextNumber}
                  className="px-5 py-2 rounded-gentle font-ui text-sm font-medium text-white"
                  style={{ backgroundColor: '#5B6F8C' }}
                >
                  Next
                </button>
              ) : (
                <div className="text-center">
                  <p className="font-ui text-sm" style={{ color: '#4F7A5A' }}>
                    Drill complete. How many could you recall within 2 seconds?
                  </p>
                  <button
                    onClick={() => setDrillActive(false)}
                    className="mt-3 px-5 py-2 rounded-gentle font-ui text-sm font-medium text-white"
                    style={{ backgroundColor: '#4F7A5A' }}
                  >
                    Done
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Drill Formats ---- */}
      <VisualStepExplainer
        title="Three Drill Formats"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="space-y-3 max-w-sm w-full">
                  {[
                    { name: 'Flash Drill', desc: 'Single number, recall image. 2-second target.', icon: '\u26A1', color: '#4F7A5A' },
                    { name: 'Sequence Drill', desc: 'String of 6+ digits, encode continuously without pausing.', icon: '\u2192', color: '#B89466' },
                    { name: 'Reverse Drill', desc: 'See PAO image description, produce the number.', icon: '\u21C4', color: '#5B6F8C' },
                  ].map((drill, i) => (
                    <motion.div
                      key={drill.name}
                      className="flex items-center gap-3 bg-surface rounded-calm border border-line-soft p-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white text-lg"
                        style={{ backgroundColor: drill.color }}
                      >
                        {drill.icon}
                      </div>
                      <div>
                        <p className="text-xs font-ui font-semibold text-ink-primary">{drill.name}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary">{drill.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Rotate through all three formats. Flash drills build raw speed. Sequence drills build sustained pace. Reverse drills strengthen bidirectional recall.',
          },
        ]}
      />

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order a Drill Session
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Arrange these steps into an effective 20-minute speed drill session
        </p>
        <SortSequence
          items={[
            { id: 'warm', label: 'Warm-up: review 10 weakest PAO images (2 min)' },
            { id: 'flash', label: 'Flash drills: 50 random numbers, 2-second target (5 min)' },
            { id: 'seq', label: 'Sequence drill: encode 30-digit strings (5 min)' },
            { id: 'reverse', label: 'Reverse drill: image-to-number for 20 images (4 min)' },
            { id: 'log', label: 'Log errors and identify images to replace or strengthen (4 min)' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does the power law of practice predict about speed gains?',
            options: [
              { id: 'linear', label: 'Gains are steady and linear throughout training', correct: false },
              { id: 'early', label: 'The biggest gains come from the first few hundred repetitions', correct: true },
              { id: 'late', label: 'Speed only improves after months of training', correct: false },
            ],
          },
          {
            prompt: 'Why should you practice reverse drills (image-to-number)?',
            options: [
              { id: 'bi', label: 'To strengthen the bidirectional association for faster recall', correct: true },
              { id: 'fun', label: 'Because they are more fun than forward drills', correct: false },
              { id: 'comp', label: 'Competitions require image-to-number translation', correct: false },
            ],
          },
          {
            prompt: 'What is the target encoding speed for competition-level PAO?',
            options: [
              { id: '5s', label: '5 seconds per image', correct: false },
              { id: '2s', label: '2 seconds per image', correct: false },
              { id: 'sub', label: 'Under 1 second per image', correct: true },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson5-feynman"
        prompt="Explain to someone learning guitar why the same principle that makes their fingers eventually move without thinking also applies to memorizing numbers with PAO."
        rubric={[
          'You described the controlled-to-automatic processing transition.',
          'You connected the guitar analogy to PAO encoding (both start slow, become reflexive).',
          'You mentioned the power law or the idea that early practice yields the biggest gains.',
          'Your explanation was accessible and analogy-driven.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="After doing the flash drill, which numbers came easily and which made you hesitate? What does this tell you about where to focus your practice?"
          lessonId="memory.pao.speed-drills"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: The two-card system for advanced encoding
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

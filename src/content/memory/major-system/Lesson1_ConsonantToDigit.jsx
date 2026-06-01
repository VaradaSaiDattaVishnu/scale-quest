import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  NeuronAnimation,
} from '../../../components/visuals'

/**
 * Lesson 1 -- Consonant-to-Digit Mapping
 * Introduces the Major System phonetic code.
 * Visual chart + memorable associations + DragMatch practice.
 */

const MAJOR_MAP = [
  { digit: 0, sounds: 's, z', mnemonic: 'Zero starts with Z', example: 'ice' },
  { digit: 1, sounds: 't, d', mnemonic: 't has 1 downstroke', example: 'tie' },
  { digit: 2, sounds: 'n', mnemonic: 'n has 2 downstrokes', example: 'Noah' },
  { digit: 3, sounds: 'm', mnemonic: 'm has 3 downstrokes', example: 'May' },
  { digit: 4, sounds: 'r', mnemonic: 'fouR ends in R', example: 'ray' },
  { digit: 5, sounds: 'l', mnemonic: 'L is Roman 50', example: 'law' },
  { digit: 6, sounds: 'j, sh, ch', mnemonic: 'J is mirror of 6', example: 'shoe' },
  { digit: 7, sounds: 'k, g', mnemonic: 'K has two 7s back-to-back', example: 'key' },
  { digit: 8, sounds: 'f, v', mnemonic: 'f in cursive has two loops like 8', example: 'fee' },
  { digit: 9, sounds: 'p, b', mnemonic: 'p is mirror of 9', example: 'pie' },
]

export default function Lesson1_ConsonantToDigit({
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
          The Major System: Consonant-to-Digit
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Turn any number into a word. Turn any word back into a number.
        </p>
      </header>

      {/* ---- Research paragraph: History ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The idea of encoding numbers as consonant sounds is older than you might expect. In 1648, a German Jesuit named Stanislaus Mink von Wennsshein published a phonetic number code -- one of the first recorded mnemonic systems for digits. Around the same time, Pierre Herigone, a French mathematician and astronomer, independently developed a similar letter-to-digit mapping for encoding numerical data. These early systems were clumsy, but the core insight was sound: human memory is far better at handling words and images than abstract sequences of digits.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The system was refined over the next two centuries. Gregor von Feinaigle, an itinerant German monk who lectured across Europe in the early 1800s, popularized a version that closely resembles the modern Major System. By the time memory performers like Harry Lorayne brought it to mass audiences in the twentieth century, the code had been polished into a remarkably elegant tool: ten consonant sounds mapped to ten digits, with vowels acting as free connectors that carry no numerical value.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Why does it work? Because it converts an encoding problem into a retrieval problem. Instead of trying to hold arbitrary digit strings in working memory -- which overloads after about seven items -- you convert numbers into vivid, concrete words. Words connect to images. Images connect to locations. And suddenly a fifty-digit number becomes a short, memorable story. The Major System is the foundation on which competitive memory athletes build their most impressive feats.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: The Core Code ---- */}
      <VisualStepExplainer
        title="The ten pairings"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 rounded-calm bg-surface border-2 flex items-center justify-center"
                    style={{ borderColor: '#5B6F8C' }}>
                    <span className="font-mono text-2xl font-bold" style={{ color: '#5B6F8C' }}>0</span>
                  </div>
                  <motion.svg width="40" height="20" viewBox="0 0 40 20"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    <path d="M0 10H35M35 10L28 4M35 10L28 16" stroke="#5B6F8C" strokeWidth="2" />
                  </motion.svg>
                  <div className="w-16 h-16 rounded-calm bg-surface border-2 flex items-center justify-center"
                    style={{ borderColor: '#4F7A5A' }}>
                    <span className="font-mono text-2xl font-bold" style={{ color: '#4F7A5A' }}>s, z</span>
                  </div>
                </motion.div>
                <p className="text-xs font-ui text-ink-tertiary">
                  Zero starts with <strong>Z</strong>. The hissing <strong>S</strong> sounds like <strong>Z</strong>.
                </p>
              </div>
            ),
            caption: '0 = S, Z. "Zero" starts with Z. S is its voiced partner. Think: ice, zoo, sauce.',
          },
          {
            visual: (
              <div className="grid grid-cols-3 gap-3 py-4 max-w-sm mx-auto">
                {MAJOR_MAP.slice(1, 4).map((entry, i) => (
                  <motion.div
                    key={entry.digit}
                    className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <span className="text-xl font-bold font-mono" style={{ color: '#5B6F8C' }}>{entry.digit}</span>
                    <p className="text-sm font-ui font-semibold mt-1" style={{ color: '#4F7A5A' }}>{entry.sounds}</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">{entry.mnemonic}</p>
                  </motion.div>
                ))}
              </div>
            ),
            caption: '1 = T, D (one downstroke). 2 = N (two downstrokes). 3 = M (three downstrokes). Count the vertical strokes in each letter.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6">
                  {MAJOR_MAP.slice(4, 7).map((entry, i) => (
                    <motion.div
                      key={entry.digit}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.25 }}
                    >
                      <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: '#5B6F8C' }}>
                        <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>{entry.digit}</span>
                      </div>
                      <span className="text-sm font-ui font-semibold mt-2" style={{ color: '#4F7A5A' }}>{entry.sounds}</span>
                      <span className="text-[9px] font-ui text-ink-tertiary mt-1 text-center max-w-[80px]">{entry.mnemonic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: '4 = R (fouR). 5 = L (Roman numeral L = 50). 6 = J, SH, CH (J is a mirror image of 6).',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-6">
                  {MAJOR_MAP.slice(7, 10).map((entry, i) => (
                    <motion.div
                      key={entry.digit}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.25 }}
                    >
                      <div className="w-14 h-14 rounded-calm border-2 flex items-center justify-center"
                        style={{ borderColor: '#5B6F8C' }}>
                        <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>{entry.digit}</span>
                      </div>
                      <span className="text-sm font-ui font-semibold mt-2" style={{ color: '#4F7A5A' }}>{entry.sounds}</span>
                      <span className="text-[9px] font-ui text-ink-tertiary mt-1 text-center max-w-[80px]">{entry.mnemonic}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: '7 = K, G (K contains two 7s). 8 = F, V (cursive f has two loops like 8). 9 = P, B (P is a mirror of 9).',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="bg-surface rounded-gentle border border-line-soft p-4 max-w-xs text-center"
                  animate={{ borderColor: ['rgba(91,111,140,0.3)', 'rgba(79,122,90,0.5)', 'rgba(91,111,140,0.3)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="font-ui text-sm text-ink-primary font-medium mb-2">
                    Vowels (a, e, i, o, u) and W, H, Y
                  </p>
                  <p className="font-ui text-xs text-ink-tertiary">
                    carry <strong>no value</strong> -- they are free connectors
                  </p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">
                    "TiE" = 1 (only the T counts)
                  </p>
                </motion.div>
              </div>
            ),
            caption: 'Vowels and the letters W, H, Y have no digit value. They are free fillers that let you build real words from consonant skeletons.',
          },
        ]}
      />

      {/* ---- Research paragraph: Why phonetics work ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The Major System exploits a key asymmetry in human cognition: we have poor memory for abstract symbols (digit strings) but excellent memory for concrete imagery (a knight on a horse, rain falling on a window). Allan Paivio's dual coding theory, first published in 1971, explains why: concrete words activate both verbal and visual memory systems simultaneously, creating two independent retrieval routes instead of one. A number like 42 is a single abstract trace. The word "rain" -- its Major System translation (R=4, N=2) -- activates sound, image, sensation, and personal associations all at once.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Modern neuroimaging confirms this. When subjects encode concrete, imageable words, fMRI scans show activation in both the left-hemisphere language areas and right-hemisphere visual-spatial regions. Abstract items light up only the left hemisphere. Two pathways are genuinely better than one -- and the Major System is a systematic way to force every number through both pathways every time.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: The Full Chart ---- */}
      <VisualStepExplainer
        title="The complete chart at a glance"
        steps={[
          {
            visual: (
              <div className="grid grid-cols-5 gap-2 py-4 max-w-md mx-auto">
                {MAJOR_MAP.map((entry, i) => (
                  <motion.div
                    key={entry.digit}
                    className="bg-surface rounded-calm border border-line-soft p-2 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-lg font-bold font-mono" style={{ color: '#5B6F8C' }}>{entry.digit}</span>
                    <p className="text-xs font-ui font-semibold" style={{ color: '#4F7A5A' }}>{entry.sounds}</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">{entry.example}</p>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'All ten pairings in one view. Digit on top, consonant sounds in green, example word below. Spend a moment scanning the grid.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-2">
                  {['T', 'i', 'G', 'e', 'R'].map((ch, i) => (
                    <motion.span
                      key={i}
                      className="text-xl font-mono font-bold"
                      style={{ color: 'aeiou'.includes(ch.toLowerCase()) ? '#B89466' : '#4F7A5A' }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      {ch}
                    </motion.span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono" style={{ color: '#4F7A5A' }}>T=1</span>
                  <span className="text-sm font-mono" style={{ color: '#B89466' }}>i=_</span>
                  <span className="text-sm font-mono" style={{ color: '#4F7A5A' }}>G=7</span>
                  <span className="text-sm font-mono" style={{ color: '#B89466' }}>e=_</span>
                  <span className="text-sm font-mono" style={{ color: '#4F7A5A' }}>R=4</span>
                </div>
                <motion.p
                  className="font-ui text-lg font-bold"
                  style={{ color: '#5B6F8C' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  TIGER = 174
                </motion.p>
              </div>
            ),
            caption: 'Decoding in action: TIGER. T=1, vowels are free, G=7, R=4. Tiger = 174. Consonant sounds are what count, not spelling.',
          },
        ]}
      />

      {/* ---- DragMatch Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Practice: Match Each Digit
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Drag each digit to its consonant sound
        </p>
        <DragMatch
          id="major-system-drag-1"
          pairs={[
            { left: '0', right: 's, z' },
            { left: '1', right: 't, d' },
            { left: '2', right: 'n' },
            { left: '3', right: 'm' },
            { left: '4', right: 'r' },
            { left: '5', right: 'l' },
            { left: '6', right: 'j, sh, ch' },
            { left: '7', right: 'k, g' },
            { left: '8', right: 'f, v' },
            { left: '9', right: 'p, b' },
          ]}
        />
      </section>

      {/* ---- Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What digit does the letter N represent?',
            options: [
              { id: '1', label: '1', correct: false },
              { id: '2', label: '2', correct: true },
              { id: '3', label: '3', correct: false },
            ],
          },
          {
            prompt: 'Which sounds represent the digit 6?',
            options: [
              { id: 'fv', label: 'F, V', correct: false },
              { id: 'jsh', label: 'J, SH, CH', correct: true },
              { id: 'kg', label: 'K, G', correct: false },
            ],
          },
          {
            prompt: 'Vowels in the Major System...',
            options: [
              { id: 'val', label: 'Each have a digit value', correct: false },
              { id: 'free', label: 'Are free connectors with no value', correct: true },
              { id: 'skip', label: 'Should be removed from words', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l1-feynman"
        prompt="Explain to someone who has never heard of the Major System how it turns the number 92 into a word. Walk through each step."
        rubric={[
          'You stated that 9 maps to P or B.',
          'You stated that 2 maps to N.',
          'You explained that vowels are free fillers.',
          'You gave a concrete example word (e.g., pin, pan, bone, bun).',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Building your 00-99 image list
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

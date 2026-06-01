import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  NeuronAnimation,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Building Your 00-99 Image List
 * Shows how to convert two-digit numbers into concrete peg words.
 * Research: chunking (Miller), dual coding (Paivio).
 */

const SAMPLE_PEGS = [
  { num: '00', consonants: 'S+S', word: 'sauce', why: 's-s' },
  { num: '14', consonants: 'T+R', word: 'tire', why: 't-r' },
  { num: '21', consonants: 'N+T', word: 'net', why: 'n-t' },
  { num: '42', consonants: 'R+N', word: 'rain', why: 'r-n' },
  { num: '55', consonants: 'L+L', word: 'lily', why: 'l-l' },
  { num: '73', consonants: 'K+M', word: 'comb', why: 'k-m' },
  { num: '86', consonants: 'F+SH', word: 'fish', why: 'f-sh' },
  { num: '97', consonants: 'P+K', word: 'pack', why: 'p-k' },
]

export default function Lesson2_Building00to99({
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
          Building Your 00-99 Image List
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          One hundred vivid images. One for every two-digit number.
        </p>
      </header>

      {/* ---- Research paragraph: Miller's Law and Chunking ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1956, George Miller published one of the most cited papers in the history of psychology: "The Magical Number Seven, Plus or Minus Two." His finding was that human working memory can hold roughly seven independent chunks of information at once -- not seven digits, not seven words, but seven chunks, whatever size those chunks happen to be. A phone number like 8675309 overloads raw digit capacity, but chunking it as 867-53-09 reduces the load to three manageable groups. The Major System takes chunking to its logical extreme: every pair of digits becomes a single image, compressing a hundred possibilities into one vivid mental picture.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Allan Paivio's dual coding theory, published in 1971, explains why images outperform abstract codes. When you see the digits 42, you have one retrieval path: the verbal string "four-two." When you convert 42 to "rain" through the Major System, you suddenly have two paths: the word "rain" and the sensory image of raindrops falling, the sound of water, the feeling of wetness. Paivio demonstrated that concrete, imageable words are recalled roughly twice as well as abstract words matched for frequency and length. Two encoding pathways are genuinely better than one.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why building a personal 00-99 peg list is not busywork -- it is the single most important investment in the Major System. Once each number pair triggers an instant, vivid image, you can chain those images into stories, place them in memory palaces, and encode arbitrarily long number strings with minimal cognitive effort. The upfront cost is learning one hundred associations. The payoff is a lifetime of effortless number memory.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Conversion Process ---- */}
      <VisualStepExplainer
        title="From digits to images, step by step"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-14 h-14 rounded-calm bg-surface border-2 flex items-center justify-center"
                    style={{ borderColor: '#5B6F8C' }}>
                    <span className="font-mono text-xl font-bold" style={{ color: '#5B6F8C' }}>4</span>
                  </div>
                  <div className="w-14 h-14 rounded-calm bg-surface border-2 flex items-center justify-center"
                    style={{ borderColor: '#5B6F8C' }}>
                    <span className="font-mono text-xl font-bold" style={{ color: '#5B6F8C' }}>2</span>
                  </div>
                </motion.div>
                <p className="text-xs font-ui text-ink-tertiary">Start with the two-digit number: 42</p>
              </div>
            ),
            caption: 'Step 1: Take any two-digit number. Here we start with 42.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}>
                      <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>4</span>
                    </div>
                    <motion.p
                      className="text-sm font-ui font-semibold mt-2"
                      style={{ color: '#4F7A5A' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >R</motion.p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}>
                      <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>2</span>
                    </div>
                    <motion.p
                      className="text-sm font-ui font-semibold mt-2"
                      style={{ color: '#4F7A5A' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >N</motion.p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Step 2: Look up each digit. 4 = R, 2 = N. Your consonant skeleton is R-N.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="bg-surface rounded-gentle border border-line-soft px-6 py-4 text-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-mono text-lg" style={{ color: '#4F7A5A' }}>
                    R _ _ N
                  </p>
                  <p className="text-xs font-ui text-ink-tertiary mt-2">
                    Fill in vowels to make a real word
                  </p>
                  <motion.p
                    className="font-ui text-2xl font-bold mt-3"
                    style={{ color: '#4F7A5A' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    RAIN
                  </motion.p>
                </motion.div>
              </div>
            ),
            caption: 'Step 3: Add vowels (free connectors) to form a concrete, imageable word. R-N becomes RAIN. See it pouring down.',
          },
        ]}
      />

      {/* ---- Research paragraph: Imagery advantage ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The advantage of images over abstract codes is not just a matter of preference -- it is a measurable neurological fact. In a landmark 2004 study, Brewer and colleagues used fMRI to show that items encoded with vivid visual imagery produced stronger activation in the parahippocampal cortex at the time of encoding, and this activation predicted whether the item would be remembered days later. The richer the image at encoding, the more durable the trace.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why your peg images should be as concrete, vivid, and personal as possible. A generic "rain" is good. Rain hammering the windshield of your specific car on a specific road you remember -- that is dramatically better. The Major System gives you the consonant skeleton. Your imagination gives it flesh.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Sample Pegs Grid ---- */}
      <VisualStepExplainer
        title="Sample pegs from the 00-99 list"
        steps={[
          {
            visual: (
              <div className="grid grid-cols-4 gap-2 py-4 max-w-md mx-auto">
                {SAMPLE_PEGS.map((peg, i) => (
                  <motion.div
                    key={peg.num}
                    className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>{peg.num}</span>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">{peg.consonants}</p>
                    <p className="text-sm font-ui font-semibold mt-1" style={{ color: '#4F7A5A' }}>{peg.word}</p>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'Eight examples from the list. Notice: each number maps to consonants, and vowels fill the gaps to make a real, imageable word.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="bg-surface rounded-gentle border-2 p-4 text-center"
                    style={{ borderColor: '#B89466' }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="font-mono text-2xl font-bold text-ink-secondary">8 6 7 3</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Abstract digits</p>
                  </motion.div>
                  <motion.svg width="30" height="20" viewBox="0 0 30 20"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}>
                    <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#5B6F8C" strokeWidth="2" />
                  </motion.svg>
                  <motion.div
                    className="bg-surface rounded-gentle border-2 p-4 text-center"
                    style={{ borderColor: '#4F7A5A' }}
                  >
                    <p className="font-ui text-lg font-bold" style={{ color: '#4F7A5A' }}>fish + comb</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Vivid images</p>
                  </motion.div>
                </div>
                <p className="text-xs font-ui text-ink-tertiary text-center max-w-xs">
                  A fish combing its hair. Absurd, vivid, unforgettable.
                </p>
              </div>
            ),
            caption: 'Chaining pegs: 86=fish, 73=comb. Picture a fish combing its hair. The sillier the image, the stronger the memory.',
          },
        ]}
      />

      {/* ---- Research paragraph: Building the list ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          Memory researchers distinguish between one-time creative effort and ongoing retrieval effort. Building your peg list is a one-time creative effort: you sit down, work through the consonant skeletons for 00 through 99, and pick a vivid word for each. After that, the system pays dividends indefinitely. Competitive memory athletes like Dominic O'Brien, eight-time World Memory Champion, report that their peg lists became automatic within a few weeks of daily use -- at which point numbers translated into images as effortlessly as reading translates letters into words.
        </p>
      </section>

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Order the Conversion Steps
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Put these steps in the correct order for converting a number to an image
        </p>
        <SortSequence
          id="major-system-sort-conversion"
          items={[
            { id: 'split', label: 'Split the number into digit pairs' },
            { id: 'lookup', label: 'Look up the consonant for each digit' },
            { id: 'vowels', label: 'Add vowels to form a real word' },
            { id: 'image', label: 'Visualize the word as a vivid image' },
            { id: 'chain', label: 'Link images together into a scene' },
          ]}
        />
      </section>

      {/* ---- Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What consonant skeleton does the number 73 produce?',
            options: [
              { id: 'gm', label: 'G-M', correct: false },
              { id: 'km', label: 'K-M', correct: true },
              { id: 'kn', label: 'K-N', correct: false },
            ],
          },
          {
            prompt: 'Why do images work better than digit strings for memory?',
            options: [
              { id: 'easy', label: 'They are easier to pronounce', correct: false },
              { id: 'dual', label: 'They activate both verbal and visual memory pathways', correct: true },
              { id: 'short', label: 'They take up less working memory space', correct: false },
            ],
          },
          {
            prompt: 'Miller\'s "magical number seven" refers to...',
            options: [
              { id: 'digits', label: 'The maximum digits you can remember', correct: false },
              { id: 'chunks', label: 'The number of chunks working memory holds', correct: true },
              { id: 'words', label: 'The ideal number of peg words per session', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l2-feynman"
        prompt="Walk a friend through converting the number 86 into a vivid image. Explain every step, including why you ignore the vowels."
        rubric={[
          'You decoded 8 as F and 6 as SH (or CH/J).',
          'You formed a concrete word (e.g., fish).',
          'You explained that vowels carry no digit value.',
          'You described making the image vivid and specific.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Drilling for speed
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

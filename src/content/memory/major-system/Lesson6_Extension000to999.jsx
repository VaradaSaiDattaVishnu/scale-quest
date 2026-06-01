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
 * Lesson 6 -- Extending the Major System to 000-999
 * Three-digit pegs for competitive-level performance.
 * Research: memory athletes, PAO system, knowledge structures.
 */

const THREE_DIGIT_EXAMPLES = [
  { num: '314', consonants: 'M-T-R', word: 'motor', note: 'Pi starts here' },
  { num: '271', consonants: 'N-K-T', word: 'night', note: 'e starts here' },
  { num: '007', consonants: 'S-S-K', word: 'seasick', note: 'James Bond' },
  { num: '456', consonants: 'R-L-SH', word: 'relish', note: 'Sequential triple' },
  { num: '842', consonants: 'F-R-N', word: 'fern', note: 'Nature image' },
  { num: '159', consonants: 'T-L-P', word: 'tulip', note: 'Pi digits 2-4' },
]

export default function Lesson6_Extension000to999({
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
          Extension: 000-999
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          One thousand images. Three consonants per number. Competition-grade memory.
        </p>
      </header>

      {/* ---- Research paragraph: Memory athletes ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          At the World Memory Championships, competitors routinely memorize a shuffled deck of 52 cards in under 30 seconds, or a 1,000-digit number in under five minutes. These are not people with unusual brains. Maguire and colleagues (2003) scanned the brains of ten world-class memory champions and found no structural differences from control subjects -- no larger hippocampi, no unusual cortical thickness. What they found instead was a different pattern of activation: during encoding, champions activated spatial and navigational brain regions (the same areas used for wayfinding) far more than controls. They were using the method of loci -- and the Major System was their number-to-image engine.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Most competitive memory athletes use a three-digit system (000-999) rather than a two-digit system (00-99). The reason is compression: a three-digit system encodes 50% more information per image. A thousand-digit number requires 500 two-digit images but only 334 three-digit images. Fewer images means fewer loci needed, faster encoding, and less chance of interference between adjacent images. The trade-off is a larger initial learning investment -- one thousand pegs instead of one hundred.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ben Pridmore, former world record holder for speed cards, and Alex Mullen, three-time World Memory Champion, both use three-digit systems. Mullen has described his system as taking several months to build but paying for itself within the first year. The principle is the same as the two-digit system -- consonant sounds mapped to digits, vowels as free fillers -- but with three consonants per peg word instead of two. The additional consonant makes it slightly harder to form words, but with practice, the process becomes as fluent as the two-digit version.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Two-digit vs three-digit ---- */}
      <VisualStepExplainer
        title="Why go from 100 to 1,000 images?"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="bg-surface rounded-calm border-2 p-4"
                      style={{ borderColor: '#5B6F8C' }}>
                      <p className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>00-99</p>
                      <p className="text-xs font-ui text-ink-tertiary mt-1">100 pegs</p>
                      <p className="text-xs font-ui text-ink-tertiary">2 digits each</p>
                    </div>
                    <motion.div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[100px]"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#B89466' }} />
                      ))}
                      <span className="text-[8px] text-ink-tertiary">... x500</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">1000 digits = 500 images</p>
                  </div>

                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="font-ui text-lg text-ink-tertiary">vs</span>
                  </motion.div>

                  <div className="text-center">
                    <div className="bg-surface rounded-calm border-2 p-4"
                      style={{ borderColor: '#4F7A5A' }}>
                      <p className="font-mono text-lg font-bold" style={{ color: '#4F7A5A' }}>000-999</p>
                      <p className="text-xs font-ui text-ink-tertiary mt-1">1,000 pegs</p>
                      <p className="text-xs font-ui text-ink-tertiary">3 digits each</p>
                    </div>
                    <motion.div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[100px]"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#4F7A5A' }} />
                      ))}
                      <span className="text-[8px] text-ink-tertiary">... x334</span>
                    </motion.div>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">1000 digits = 334 images</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'A three-digit system encodes the same 1,000 digits with 33% fewer images. Fewer images = fewer loci, faster recall, less interference.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-3">
                  {[
                    { digit: '3', letter: 'M' },
                    { digit: '1', letter: 'T' },
                    { digit: '4', letter: 'R' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className="w-11 h-11 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: '#5B6F8C' }}>
                        <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>{item.digit}</span>
                      </div>
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path d="M6 1V13M6 13L2 9M6 13L10 9" stroke="#5B6F8C" strokeWidth="1.5" />
                      </svg>
                      <span className="font-mono text-sm font-bold" style={{ color: '#4F7A5A' }}>{item.letter}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="bg-surface rounded-gentle border border-line-soft px-5 py-3 text-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <p className="font-mono text-sm text-ink-tertiary">M-T-R</p>
                  <p className="font-ui text-xl font-bold" style={{ color: '#4F7A5A' }}>MOTOR</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">314 = motor</p>
                </motion.div>
              </div>
            ),
            caption: 'Same process, one more consonant. 314: M(3)-T(1)-R(4) = MOTOR. Three consonants still yield natural English words.',
          },
          {
            visual: (
              <NeuronAnimation mode="strengthening" interactive={false} showLabels={true} />
            ),
            caption: 'The neural pathway for a three-digit peg is identical to a two-digit one -- it just encodes more information per activation. Quality of the association matters more than quantity of digits.',
          },
        ]}
      />

      {/* ---- Research paragraph: Building the extended list ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Building a 1,000-image list sounds daunting, but the process is systematic. For each three-digit number, you identify three consonants, then find a word that contains those consonants in order with vowels filling the gaps. Some numbers yield obvious words (314=motor, 842=fern, 159=tulip). Others require more creativity: compound words, proper nouns, or even short phrases. The key constraint is that each peg must be distinct, concrete, and instantly visualizable.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Many athletes build their list in stages: first the two-digit foundation (00-99), then extending one group at a time (e.g., all numbers starting with 1, then 2, etc.). This incremental approach avoids overwhelm and allows you to consolidate each group before adding the next. Spaced repetition software can automate the review scheduling, ensuring that newly learned pegs get frequent review while well-known ones fade to longer intervals. The entire list typically takes three to six months of regular practice to reach automaticity.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Example three-digit pegs ---- */}
      <VisualStepExplainer
        title="Sample three-digit pegs"
        steps={[
          {
            visual: (
              <div className="grid grid-cols-3 gap-2 py-4 max-w-md mx-auto">
                {THREE_DIGIT_EXAMPLES.map((peg, i) => (
                  <motion.div
                    key={peg.num}
                    className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.12 }}
                  >
                    <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>{peg.num}</span>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">{peg.consonants}</p>
                    <p className="text-sm font-ui font-semibold" style={{ color: '#4F7A5A' }}>{peg.word}</p>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">{peg.note}</p>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'Six examples of three-digit pegs. Each number maps cleanly to a single concrete word through its three consonants.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-gentle border border-line-soft p-4 max-w-sm">
                  <p className="text-xs font-ui text-ink-tertiary text-center mb-3">PAO System: Person-Action-Object</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <motion.div className="bg-surface rounded-calm border border-line-soft p-2"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                      <p className="text-[9px] font-ui text-ink-tertiary">PERSON</p>
                      <p className="text-xs font-ui font-semibold" style={{ color: '#4F7A5A' }}>314 = motor</p>
                      <p className="text-[9px] font-ui text-ink-tertiary">Race driver</p>
                    </motion.div>
                    <motion.div className="bg-surface rounded-calm border border-line-soft p-2"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                      <p className="text-[9px] font-ui text-ink-tertiary">ACTION</p>
                      <p className="text-xs font-ui font-semibold" style={{ color: '#5B6F8C' }}>159 = tulip</p>
                      <p className="text-[9px] font-ui text-ink-tertiary">Planting</p>
                    </motion.div>
                    <motion.div className="bg-surface rounded-calm border border-line-soft p-2"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                      <p className="text-[9px] font-ui text-ink-tertiary">OBJECT</p>
                      <p className="text-xs font-ui font-semibold" style={{ color: '#B89466' }}>265 = nasal</p>
                      <p className="text-[9px] font-ui text-ink-tertiary">Nose spray</p>
                    </motion.div>
                  </div>
                  <p className="text-[10px] font-ui text-ink-tertiary text-center mt-3">
                    "A race driver planting nose spray" = 314-159-265
                  </p>
                </div>
              </div>
            ),
            caption: 'Advanced: the PAO (Person-Action-Object) system. Each three-digit number maps to either a person, action, or object. Combining one of each encodes nine digits in a single image.',
          },
        ]}
      />

      {/* ---- Research paragraph: Interference and distinctiveness ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed">
          A legitimate concern with a 1,000-image list is interference: will similar pegs get confused? Research on the fan effect (Anderson, 1974) shows that the more associations a cue has, the slower and less accurate retrieval becomes. This is why each peg must be maximally distinct -- not just different words, but different categories of objects, different sensory qualities, different emotional tones. A systematic list that includes "motor," "moter," and "meter" is asking for confusion. A list with "motor," "tulip," and "fern" is not. Distinctiveness is not a luxury; it is a structural requirement.
        </p>
      </section>

      {/* ---- DragMatch ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Decode Three-Digit Numbers
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Match each three-digit number to the word it encodes
        </p>
        <DragMatch
          id="major-system-3digit-drag"
          pairs={[
            { left: '314', right: 'motor' },
            { left: '271', right: 'night' },
            { left: '456', right: 'relish' },
            { left: '842', right: 'fern' },
            { left: '159', right: 'tulip' },
          ]}
        />
      </section>

      {/* ---- Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why do competitive memory athletes prefer a 000-999 system over 00-99?',
            options: [
              { id: 'impressive', label: 'It sounds more impressive', correct: false },
              { id: 'compress', label: 'It encodes more digits per image, requiring fewer total images', correct: true },
              { id: 'easy', label: 'Three-digit words are easier to find', correct: false },
            ],
          },
          {
            prompt: 'What did Maguire (2003) find about memory champions\' brains?',
            options: [
              { id: 'bigger', label: 'Larger hippocampi than normal', correct: false },
              { id: 'spatial', label: 'Different activation patterns, especially in spatial regions', correct: true },
              { id: 'faster', label: 'Faster neural conduction speed', correct: false },
            ],
          },
          {
            prompt: 'The PAO system encodes how many digits per composite image?',
            options: [
              { id: '3', label: '3 digits', correct: false },
              { id: '6', label: '6 digits', correct: false },
              { id: '9', label: '9 digits (3 per component x 3 components)', correct: true },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l6-feynman"
        prompt="Explain to a friend the difference between a 00-99 and a 000-999 Major System, and why someone would invest the extra effort to build the larger list."
        rubric={[
          'You explained the compression advantage (more digits per image).',
          'You mentioned the trade-off (larger list to memorize).',
          'You connected it to competitive memory or practical applications.',
          'You described the PAO system or another advanced technique.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 6 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Comprehensive practice
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

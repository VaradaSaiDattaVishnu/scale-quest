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
 * Lesson 1 -- Numbers (Speed Numbers Event)
 * Speed numbers event introduction. Visual timer and digit display.
 * Research on competitive memory.
 */

export default function Lesson1_Numbers({
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
          Speed Numbers
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Memorize long sequences of digits. The competitive memory gateway.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The speed numbers event is considered the core discipline of competitive memory. Competitors are shown rows of random digits and given a fixed time -- typically five minutes in competition, or one minute in Memory League's rapid format -- to memorize as many as possible. The current world record for five-minute numbers is over 500 digits. This is not photographic memory; it is systematic technique applied at high speed. Every competitive memorizer uses a number-to-image system that converts abstract digits into vivid, memorable pictures.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The most common system is the Major System, which assigns consonant sounds to digits (0=s/z, 1=t/d, 2=n, 3=m, 4=r, 5=l, 6=j/sh, 7=k/g, 8=f/v, 9=p/b) and uses those consonants to form words. The number 32, for example, becomes "moon" (m=3, n=2). More advanced competitors use the Person-Action-Object (PAO) system, where each two-digit number from 00 to 99 is assigned a person, an action, and an object. Six digits can then be compressed into a single image: the person from the first pair, doing the action of the second pair, with the object of the third pair.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Speed Numbers ---- */}
      <VisualStepExplainer
        title="How Speed Numbers Works"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#B89466' }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-xs font-ui font-bold" style={{ color: '#B89466' }}>5:00</span>
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary">Timer counting down</p>
                </div>
                <div className="flex gap-1 flex-wrap justify-center max-w-xs">
                  {[3, 2, 7, 4, 9, 1, 8, 5, 0, 6, 2, 3, 7, 8, 4, 5, 1, 9, 0, 6].map((digit, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-10 rounded-sm border flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.04)' }}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <span className="font-mono text-sm text-ink-primary">{digit}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">Row after row of random digits...</p>
              </div>
            ),
            caption: 'The event: rows of random digits, a ticking clock. No patterns, no meaning -- just raw numbers. You must impose structure on chaos.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>THE MAJOR SYSTEM</p>
                <div className="grid grid-cols-5 gap-2 w-full max-w-sm">
                  {[
                    { digit: '0', sound: 's, z', word: 'zoo' },
                    { digit: '1', sound: 't, d', word: 'tie' },
                    { digit: '2', sound: 'n', word: 'knee' },
                    { digit: '3', sound: 'm', word: 'mow' },
                    { digit: '4', sound: 'r', word: 'ray' },
                    { digit: '5', sound: 'l', word: 'law' },
                    { digit: '6', sound: 'j, sh', word: 'jaw' },
                    { digit: '7', sound: 'k, g', word: 'key' },
                    { digit: '8', sound: 'f, v', word: 'foe' },
                    { digit: '9', sound: 'p, b', word: 'pie' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-2 border border-line-soft text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="text-lg font-bold" style={{ color: '#4F7A5A' }}>{item.digit}</span>
                      <p className="text-[8px] font-ui text-ink-tertiary">{item.sound}</p>
                      <p className="text-[9px] font-ui text-ink-secondary font-medium">{item.word}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The Major System: each digit maps to a consonant sound. These consonants form words. 32 = m-n = "moon." 74 = k-r = "car." Abstract digits become concrete images.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#5B6F8C' }}>PAO: PERSON-ACTION-OBJECT</p>
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">
                      {['3', '2'].map((d, i) => (
                        <div key={i} className="w-6 h-8 rounded-sm border flex items-center justify-center" style={{ borderColor: '#4F7A5A' }}>
                          <span className="font-mono text-sm" style={{ color: '#4F7A5A' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-ui text-ink-tertiary">=</span>
                    <span className="text-[10px] font-ui text-ink-secondary font-medium">Michael Jordan (Person)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">
                      {['7', '4'].map((d, i) => (
                        <div key={i} className="w-6 h-8 rounded-sm border flex items-center justify-center" style={{ borderColor: '#5B6F8C' }}>
                          <span className="font-mono text-sm" style={{ color: '#5B6F8C' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-ui text-ink-tertiary">=</span>
                    <span className="text-[10px] font-ui text-ink-secondary font-medium">Juggling (Action from 74's person)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {['9', '1'].map((d, i) => (
                        <div key={i} className="w-6 h-8 rounded-sm border flex items-center justify-center" style={{ borderColor: '#B89466' }}>
                          <span className="font-mono text-sm" style={{ color: '#B89466' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-ui text-ink-tertiary">=</span>
                    <span className="text-[10px] font-ui text-ink-secondary font-medium">A piano (Object from 91's person)</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-line-soft">
                    <p className="text-[10px] font-ui text-ink-primary font-medium">327491 = "Michael Jordan juggling a piano"</p>
                    <p className="text-[9px] font-ui text-ink-tertiary">6 digits compressed into 1 vivid image</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'PAO compresses six digits into one image by mixing person, action, and object from different number pairs. Place each image at a palace locus and you can memorize hundreds of digits.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex gap-4 items-end">
                  {[
                    { label: 'Beginner', digits: 20, color: '#5B6F8C' },
                    { label: '3 months', digits: 80, color: '#5B6F8C' },
                    { label: '1 year', digits: 200, color: '#4F7A5A' },
                    { label: 'Champion', digits: 500, color: '#4F7A5A' },
                  ].map((item, i) => (
                    <div key={i} className="text-center flex-1">
                      <motion.div
                        className="rounded-t-sm mx-auto"
                        style={{ width: '30px', backgroundColor: item.color }}
                        initial={{ height: 0 }}
                        animate={{ height: `${item.digits / 5}px` }}
                        transition={{ duration: 0.6, delay: i * 0.2 }}
                      >
                        <span className="block text-center text-[7px] font-ui font-bold text-white pt-0.5">{item.digits}</span>
                      </motion.div>
                      <span className="text-[7px] font-ui text-ink-tertiary">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-ui text-ink-secondary mt-2">Digits memorized in 5 minutes (typical progression)</p>
              </div>
            ),
            caption: 'Progression is real and measurable. 20 digits in your first attempt. 80 after three months of practice. 200+ after a year. The world record is over 500.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Dresler and colleagues (2017) studied the brains of the world's top 23 memory athletes. Before training, their brains looked structurally identical to control participants. But after six weeks of memory palace training, the control group showed significant improvements in digit memorization -- and their brain connectivity patterns began to resemble those of the memory athletes. The technique literally changes how your brain networks communicate. The memory palace and number-coding systems are not crutches; they are tools that reshape neural pathways to process abstract information more efficiently.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          For practical training, Memory League (memleague.com) provides an online platform where you can practice speed numbers in one-minute rounds. The rapid format is ideal for daily practice: quick enough to fit into a break, intense enough to push your processing speed. Most competitors recommend starting with the two-digit Major System and graduating to PAO once you have a reliable set of 100 images.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In the Major System, what consonant sound does the digit 3 map to?',
            options: [
              { id: 'm', label: 'm', correct: true },
              { id: 'n', label: 'n', correct: false },
              { id: 'r', label: 'r', correct: false },
            ],
          },
          {
            prompt: 'How many digits does a single PAO image encode?',
            options: [
              { id: 'six', label: 'Six (two for person, two for action, two for object)', correct: true },
              { id: 'two', label: 'Two', correct: false },
              { id: 'ten', label: 'Ten', correct: false },
            ],
          },
          {
            prompt: 'What did Dresler (2017) find about memory athletes\' brains?',
            options: [
              { id: 'normal', label: 'Structurally normal, but different connectivity patterns', correct: true },
              { id: 'larger', label: 'Significantly larger hippocampi', correct: false },
              { id: 'born', label: 'Born with unique neural architecture', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="memory-league-l1-feynman"
        prompt="Explain to someone who thinks memorizing numbers is impossible how the Major System or PAO works. Walk them through encoding the number 327491."
        rubric={[
          'You explained the digit-to-consonant mapping clearly.',
          'You showed how consonants form memorable words or images.',
          'You walked through a concrete example with real digits.',
          'Your listener would understand that this is systematic, not magical.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 5 &middot; Memory League
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Speed Cards
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

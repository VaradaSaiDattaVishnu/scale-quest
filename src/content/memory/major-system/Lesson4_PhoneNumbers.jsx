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
 * Lesson 4 -- Memorizing Phone Numbers
 * Real-world application: converting 10-digit numbers into stories.
 * Research: applied mnemonics, elaborative encoding.
 */

const PHONE_DIGITS = ['8', '6', '7', '5', '3', '0', '9', '1', '4', '2']
const PHONE_PAIRS = [
  { pair: '86', consonants: 'F-SH', word: 'fish' },
  { pair: '75', consonants: 'K-L', word: 'coal' },
  { pair: '30', consonants: 'M-S', word: 'moose' },
  { pair: '91', consonants: 'P-T', word: 'pot' },
  { pair: '42', consonants: 'R-N', word: 'rain' },
]

export default function Lesson4_PhoneNumbers({
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
          Memorizing Phone Numbers
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Ten digits, five images, one unforgettable story.
        </p>
      </header>

      {/* ---- Research paragraph: Real-world application ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The most common complaint about mnemonic systems is that they sound impressive in theory but are impractical in daily life. Phone numbers offer a direct counter-example. A ten-digit phone number like 8675309142 exceeds working memory capacity by at least three items -- most people cannot hold it for even thirty seconds without rehearsal. Yet with the Major System, the same number becomes five vivid images that can be chained into a story in under a minute and recalled days or weeks later.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research by Worthen and Hunt (2011) on the distinctiveness heuristic shows that bizarre, unusual mental images are remembered better than ordinary ones -- not because bizarreness is inherently memorable, but because distinctive items stand out against the background of normal experience. A fish sitting on a lump of coal, being stared at by a moose cooking in a pot while rain falls -- that sequence is bizarre enough to be highly distinctive, and distinctiveness is what retrieval depends on.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Gordon Bower's narrative chaining experiments (1969) demonstrated that items linked by a story are recalled roughly six to seven times better than items studied as isolated units. The story does not need to be logical or realistic -- it just needs to connect the images in a sequential chain so that recalling one image pulls the next one along. This is exactly what the Major System phone number technique exploits.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Step-by-step phone conversion ---- */}
      <VisualStepExplainer
        title="Converting a phone number: 867-530-9142"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-1">
                  {PHONE_DIGITS.map((d, i) => (
                    <motion.div
                      key={i}
                      className="w-9 h-12 rounded-calm bg-surface border border-line-soft flex items-center justify-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <span className="font-mono text-lg font-bold" style={{ color: '#5B6F8C' }}>{d}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Ten abstract digits. Too many for working memory.</p>
              </div>
            ),
            caption: 'Step 1: Start with the raw phone number. Ten digits is roughly three items past working memory capacity.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-3">
                  {PHONE_PAIRS.map((p, i) => (
                    <motion.div
                      key={p.pair}
                      className="bg-surface rounded-calm border-2 p-2 text-center"
                      style={{ borderColor: '#5B6F8C' }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span className="font-mono text-sm font-bold" style={{ color: '#5B6F8C' }}>{p.pair}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Split into pairs: 86 - 75 - 30 - 91 - 42</p>
              </div>
            ),
            caption: 'Step 2: Split the number into two-digit pairs. Ten digits become five pairs.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4 w-full">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {PHONE_PAIRS.map((p, i) => (
                    <motion.div
                      key={p.pair}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <span className="font-mono text-xs" style={{ color: '#5B6F8C' }}>{p.pair}</span>
                      <span className="text-[9px] font-ui text-ink-tertiary">{p.consonants}</span>
                      <motion.span
                        className="font-ui text-sm font-bold"
                        style={{ color: '#4F7A5A' }}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 + 0.3 }}
                      >
                        {p.word}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Step 3: Convert each pair to consonants, then to a word. 86=fish, 75=coal, 30=moose, 91=pot, 42=rain.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="bg-surface rounded-gentle border border-line-soft p-5 max-w-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-reading text-sm text-ink-secondary leading-relaxed text-center">
                    A <span className="font-bold" style={{ color: '#4F7A5A' }}>fish</span> is sitting
                    on a chunk of <span className="font-bold" style={{ color: '#4F7A5A' }}>coal</span>.
                    A <span className="font-bold" style={{ color: '#4F7A5A' }}>moose</span> leans over
                    to sniff, knocking a <span className="font-bold" style={{ color: '#4F7A5A' }}>pot</span> off
                    the shelf, and <span className="font-bold" style={{ color: '#4F7A5A' }}>rain</span> pours
                    in through the broken window.
                  </p>
                </motion.div>
              </div>
            ),
            caption: 'Step 4: Chain the images into a vivid, bizarre story. Each image triggers the next. The story is the retrieval structure.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-2">
                  {PHONE_PAIRS.map((p, i) => (
                    <motion.div
                      key={p.pair}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span className="font-ui text-xs font-bold" style={{ color: '#4F7A5A' }}>{p.word}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2V14M8 14L4 10M8 14L12 10" stroke="#5B6F8C" strokeWidth="1.5" />
                      </svg>
                      <span className="font-mono text-xs" style={{ color: '#5B6F8C' }}>{p.pair}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  className="font-mono text-lg font-bold mt-2"
                  style={{ color: '#5B6F8C' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  867-530-9142
                </motion.p>
              </div>
            ),
            caption: 'Step 5: To recall, replay the story, decode each image back to digits. fish=86, coal=75, moose=30, pot=91, rain=42.',
          },
        ]}
      />

      {/* ---- Research paragraph: Elaborative encoding ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The story-building step is not arbitrary ornamentation -- it is an instance of elaborative encoding, one of the most robust findings in memory research. Craik and Tulving (1975) showed that items processed with rich, meaningful elaboration are remembered dramatically better than items processed shallowly, even when the shallow processing takes longer. Creating a bizarre story forces you to generate relationships between images, engage visual and spatial processing, and recruit emotional responses (humor, surprise, absurdity) -- all of which deepen the memory trace.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The practical implication is that the minute you spend inventing a story is not overhead -- it is the most productive minute in the entire process. Skipping the story and trying to memorize the image list as a bare sequence cuts your retention roughly in half. The story is the structure that makes the images retrievable in order.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Tips for better stories ---- */}
      <VisualStepExplainer
        title="Making stories stick"
        steps={[
          {
            visual: (
              <div className="grid grid-cols-3 gap-3 py-4 max-w-sm mx-auto">
                {[
                  { label: 'Motion', desc: 'Things moving, falling, exploding', icon: 'M4 8L8 4L12 8L8 12Z' },
                  { label: 'Exaggeration', desc: 'Giant, tiny, too many', icon: 'M8 2C4 2 2 5 2 8C2 11 4 14 8 14C12 14 14 11 14 8C14 5 12 2 8 2Z' },
                  { label: 'Emotion', desc: 'Funny, gross, surprising', icon: 'M4 9C4 9 6 12 8 12C10 12 12 9 12 9M5 6V6.5M11 6V6.5' },
                ].map((tip, i) => (
                  <motion.div
                    key={tip.label}
                    className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="mx-auto mb-2">
                      <path d={tip.icon} stroke="#4F7A5A" strokeWidth="1.5" fill="none" />
                    </svg>
                    <p className="text-xs font-ui font-semibold" style={{ color: '#4F7A5A' }}>{tip.label}</p>
                    <p className="text-[9px] font-ui text-ink-tertiary mt-1">{tip.desc}</p>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'Three ingredients for sticky stories: motion (things happening), exaggeration (absurd scale), and emotion (humor, surprise, disgust). The weirder, the better.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm">
                  <div className="bg-surface rounded-calm border border-line-soft p-3 text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-1">Weak link</p>
                    <p className="font-reading text-sm text-ink-secondary">"A fish and then coal"</p>
                    <div className="mt-2 h-1 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[25%] rounded-full" style={{ backgroundColor: '#B89466' }} />
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm border border-line-soft p-3 text-center">
                    <p className="text-xs font-ui text-ink-tertiary mb-1">Strong link</p>
                    <p className="font-reading text-sm text-ink-secondary">"A fish sizzling on hot coal"</p>
                    <div className="mt-2 h-1 bg-line-soft rounded-full overflow-hidden">
                      <div className="h-full w-[90%] rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'The images must interact with each other, not just appear in sequence. "A fish and then coal" is weak. "A fish sizzling on hot coal" is strong.',
          },
        ]}
      />

      {/* ---- SortSequence Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Reconstruct the Phone Number
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Put the images in the correct order to recreate 867-530-9142
        </p>
        <SortSequence
          id="major-system-phone-sort"
          items={[
            { id: 'fish', label: 'Fish (86)' },
            { id: 'coal', label: 'Coal (75)' },
            { id: 'moose', label: 'Moose (30)' },
            { id: 'pot', label: 'Pot (91)' },
            { id: 'rain', label: 'Rain (42)' },
          ]}
        />
      </section>

      {/* ---- Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why does chaining images into a story improve recall?',
            options: [
              { id: 'fun', label: 'Stories are more fun to make', correct: false },
              { id: 'elab', label: 'Stories create elaborative encoding with rich associations', correct: true },
              { id: 'less', label: 'Stories require less working memory', correct: false },
            ],
          },
          {
            prompt: 'For maximum memorability, images in a story should...',
            options: [
              { id: 'real', label: 'Be as realistic and calm as possible', correct: false },
              { id: 'interact', label: 'Interact with each other in vivid, bizarre ways', correct: true },
              { id: 'abstract', label: 'Represent abstract concepts', correct: false },
            ],
          },
          {
            prompt: 'How many working memory slots does a 10-digit phone number require without chunking?',
            options: [
              { id: '5', label: '5 slots', correct: false },
              { id: '7', label: '7 slots', correct: false },
              { id: '10', label: '10 slots (exceeding capacity)', correct: true },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l4-feynman"
        prompt="Walk someone through memorizing the phone number 314-159-2653 using the Major System. Convert, build images, and chain a story."
        rubric={[
          'You split the number into five two-digit pairs.',
          'You converted each pair using the correct Major System code.',
          'You built a vivid word for each pair.',
          'You chained the images into an interactive story.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Memorizing dates
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

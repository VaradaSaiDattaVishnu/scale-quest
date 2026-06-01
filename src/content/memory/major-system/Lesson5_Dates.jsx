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
 * Lesson 5 -- Memorizing Dates
 * Apply the Major System to historical dates and birthdays.
 * Research: temporal memory, role of meaning.
 */

const EXAMPLE_DATES = [
  { event: 'Columbus sails', year: '1492', code: 'T-R-P-N', word: 'turban', story: 'Columbus wearing a turban on his ship' },
  { event: 'Moon landing', year: '1969', code: 'T-P-SH-P', word: 'top ship', story: 'A top-shaped ship landing on the moon' },
  { event: 'French Revolution', year: '1789', code: 'T-K-F-P', word: 'tough vibe', story: 'A crowd with a tough vibe storming gates' },
]

export default function Lesson5_Dates({
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
          Memorizing Dates
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Turn years into images. Anchor them to events. Never confuse dates again.
        </p>
      </header>

      {/* ---- Research paragraph: Temporal memory ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Dates are among the hardest facts to remember because they are purely arbitrary. There is no inherent connection between the number 1492 and Columbus sailing -- the link is a historical accident. Psychologists call this the problem of arbitrary associations, and it is well documented that arbitrary pairs (like a name and a number) are recalled far worse than meaningful pairs (like a name and a face). The Major System attacks this problem directly by converting the arbitrary number into a concrete image that can be linked to the event through a meaningful, vivid scene.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Friedman's research on temporal memory (1993) showed that people rarely remember when an event happened by directly encoding the date. Instead, they reconstruct the time by associating the event with contextual landmarks -- what else was happening, what season it was, what they were doing at the time. The Major System adds a deliberate landmark: a vivid image derived from the date itself, integrated into a scene with the event. This artificial context does the same work that natural temporal context does, but reliably and on demand.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          There is a deeper principle at work here. Endel Tulving's encoding specificity principle (1973) states that a memory is most easily retrieved when the retrieval cues match the encoding conditions. When you encode a date as a vivid scene (Columbus wearing a turban on his ship), the event itself becomes the retrieval cue for the date-image. Thinking "Columbus" triggers the scene, the scene contains the turban, and the turban decodes back to 1492. The Major System creates its own retrieval pathway.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Date conversion process ---- */}
      <VisualStepExplainer
        title="Converting a year: 1492"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-1">
                  {['1', '4', '9', '2'].map((d, i) => (
                    <motion.div
                      key={i}
                      className="w-12 h-14 rounded-calm bg-surface border-2 flex items-center justify-center"
                      style={{ borderColor: '#5B6F8C' }}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                    >
                      <span className="font-mono text-xl font-bold" style={{ color: '#5B6F8C' }}>{d}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">The year 1492</p>
              </div>
            ),
            caption: 'Start with the year. For most historical dates, you can drop the leading 1 (since most dates start with 1). Encode 492 or all four digits.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-4">
                  {[
                    { digit: '1', letter: 'T' },
                    { digit: '4', letter: 'R' },
                    { digit: '9', letter: 'P/B' },
                    { digit: '2', letter: 'N' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <span className="font-mono text-sm" style={{ color: '#5B6F8C' }}>{item.digit}</span>
                      <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                        <path d="M6 2V14M6 14L2 10M6 14L10 10" stroke="#5B6F8C" strokeWidth="1.5" />
                      </svg>
                      <span className="font-mono text-sm font-bold" style={{ color: '#4F7A5A' }}>{item.letter}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Consonant skeleton: T-R-P/B-N</p>
              </div>
            ),
            caption: 'Convert each digit to its consonant. 1=T, 4=R, 9=P or B, 2=N. Skeleton: T-R-B-N or T-R-P-N.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="bg-surface rounded-gentle border-2 p-5 text-center max-w-xs"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-mono text-sm text-ink-tertiary">T-R-B-N</p>
                  <motion.p
                    className="font-ui text-2xl font-bold mt-2"
                    style={{ color: '#4F7A5A' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    TURBAN
                  </motion.p>
                  <p className="text-[10px] font-ui text-ink-tertiary mt-2">Add vowels: TuRBaN</p>
                </motion.div>
              </div>
            ),
            caption: 'Add vowels to form a word: T-R-B-N becomes TURBAN. A vivid, concrete, easy-to-picture object.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="bg-surface rounded-gentle border border-line-soft p-5 max-w-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-reading text-sm text-ink-secondary leading-relaxed text-center">
                    <span className="font-bold text-ink-primary">Columbus</span> standing at the bow of his ship,
                    wearing a magnificent golden <span className="font-bold" style={{ color: '#4F7A5A' }}>turban</span> that
                    billows in the Atlantic wind.
                  </p>
                </motion.div>
                <p className="text-[10px] font-ui text-ink-tertiary">Columbus + turban = Columbus sailed in 1492</p>
              </div>
            ),
            caption: 'Link the image to the event: Columbus wearing a turban. When you think "Columbus," you see the turban, decode T-R-B-N, and recover 1492.',
          },
        ]}
      />

      {/* ---- Research paragraph: Role of meaning ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Craik and Lockhart's levels of processing framework (1972) predicts that the more meaningfully you process information, the better you will remember it. Simply repeating "1492, 1492, 1492" is shallow processing. Forming the image of Columbus in a turban is deep processing -- it requires you to decode the number, select a word, build a visual scene, and link it to existing knowledge about Columbus. Each of these steps adds encoding depth, and encoding depth is the single strongest predictor of later recall.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          There is an important nuance: the link between the event and the date-image should be interactive, not just co-located. "Columbus standing near a turban" is weaker than "Columbus wearing a turban." The interaction forces your brain to integrate the two concepts into a single scene, which creates a unitized representation -- a single memory trace that contains both pieces of information. Unitized associations are retrieved more reliably than separate associations, as shown by Yonelinas and colleagues (2010).
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Timeline of encoded dates ---- */}
      <VisualStepExplainer
        title="A timeline of encoded dates"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4 w-full">
                <div className="relative w-full max-w-md">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-line-soft" />
                  <div className="flex justify-between relative">
                    {EXAMPLE_DATES.map((item, i) => (
                      <motion.div
                        key={item.year}
                        className="flex flex-col items-center relative z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.3 }}
                      >
                        <div className="bg-surface rounded-calm border border-line-soft p-2 text-center mb-2"
                          style={{ minWidth: '90px' }}>
                          <p className="text-[9px] font-ui text-ink-tertiary">{item.event}</p>
                          <p className="font-mono text-sm font-bold" style={{ color: '#5B6F8C' }}>{item.year}</p>
                          <p className="text-xs font-ui font-semibold" style={{ color: '#4F7A5A' }}>{item.word}</p>
                        </div>
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4F7A5A' }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Three dates on a timeline, each converted to a Major System image. The image becomes the bridge between the event and its date.',
          },
          {
            visual: (
              <div className="flex flex-col gap-3 py-4 max-w-sm mx-auto">
                {EXAMPLE_DATES.map((item, i) => (
                  <motion.div
                    key={item.year}
                    className="bg-surface rounded-calm border border-line-soft p-3 flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(79,122,90,0.12)' }}>
                      <span className="font-mono text-xs font-bold" style={{ color: '#4F7A5A' }}>{item.year}</span>
                    </div>
                    <div>
                      <p className="text-xs font-ui font-medium text-ink-primary">{item.event}</p>
                      <p className="text-[10px] font-ui text-ink-tertiary">{item.story}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'Each scene links event to image. The image is derived from the date. To recall: event triggers scene, scene reveals image, image decodes to date.',
          },
        ]}
      />

      {/* ---- Research paragraph: Birthday encoding strategy ---- */}
      <section className="my-8 max-w-reading mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          For personal dates like birthdays, the strategy is similar but with an additional advantage: you already have a strong association with the person. A birthday like March 15 (03/15) encodes as S-M / T-L, which could become "smile" and "tile" -- or combined as a four-digit number 0315, which gives you S-M-T-L, perhaps "small tail." You then visualize the person with that image: your friend Sarah with a comically small tail. The personal connection adds emotional encoding, which further strengthens the trace.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Kensinger's research on emotional memory (2009) confirms that emotional arousal at the time of encoding enhances memory for the central details of an experience. Humor, absurdity, and personal relevance all generate mild emotional arousal. This is not a trick or a shortcut -- it is engaging the same neural mechanisms (amygdala modulation of hippocampal encoding) that make naturally emotional events more memorable. The Major System simply gives you a systematic way to trigger those mechanisms on demand.
        </p>
      </section>

      {/* ---- DragMatch ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match Dates to Their Images
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Drag each date to the Major System word that encodes it
        </p>
        <DragMatch
          id="major-system-dates-drag"
          pairs={[
            { left: '1492', right: 'turban' },
            { left: '1969', right: 'top ship' },
            { left: '1789', right: 'tough vibe' },
            { left: '1066', right: 'tissue Josh' },
            { left: '1776', right: 'take coach' },
          ]}
        />
      </section>

      {/* ---- Quiz ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why are dates especially hard to remember?',
            options: [
              { id: 'long', label: 'They have too many digits', correct: false },
              { id: 'arb', label: 'The link between date and event is arbitrary', correct: true },
              { id: 'old', label: 'They happened too long ago', correct: false },
            ],
          },
          {
            prompt: 'The encoding specificity principle says retrieval works best when...',
            options: [
              { id: 'match', label: 'Retrieval cues match encoding conditions', correct: true },
              { id: 'repeat', label: 'You repeat the information many times', correct: false },
              { id: 'sleep', label: 'You sleep immediately after learning', correct: false },
            ],
          },
          {
            prompt: 'For date images to work well, the event and the image should...',
            options: [
              { id: 'sep', label: 'Be kept separate in your mind', correct: false },
              { id: 'interact', label: 'Interact in a single vivid scene', correct: true },
              { id: 'abstract', label: 'Be as realistic as possible', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="major-system-l5-feynman"
        prompt="Pick a historical date you know and walk through the full process: encode the year, build an image, and create a scene linking it to the event."
        rubric={[
          'You converted the year digits to consonants correctly.',
          'You formed a concrete, imageable word from the consonants.',
          'You created an interactive scene linking the image to the event.',
          'You explained why the scene aids retrieval (encoding specificity or elaboration).',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 5 of 7 &middot; The Major System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Extending to 000-999
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

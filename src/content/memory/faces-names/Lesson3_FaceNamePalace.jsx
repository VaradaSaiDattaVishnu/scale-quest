import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
  MemoryPalace3D,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Face-Name Palace
 * Put faces at loci. Visual walkthrough.
 */

export default function Lesson3_FaceNamePalace({
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
          Face-Name Palace
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Place people at locations. Retrieve them on demand.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The method of loci -- the memory palace technique -- was originally used for speeches, lists, and abstract knowledge. But competitive memorizers discovered that it is also remarkably effective for names and faces. In the names-and-faces event at the World Memory Championships, athletes must memorize the first and last names of as many faces as possible in fifteen minutes. The top competitors routinely score above 150 names, and many use a dedicated face-name palace to achieve this.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The technique works by combining three memory systems: spatial memory (the palace route), visual memory (the vivid image), and the feature anchor (the facial cue). Each person you meet gets placed at a specific locus in your palace. The image at that locus connects the person's distinctive feature to their name. When you want to recall names from a networking event, you mentally walk through your palace, visiting each locus in order. The spatial sequence provides the structure; the images provide the content.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Face-Name Palace Walkthrough ---- */}
      <VisualStepExplainer
        title="Building a Face-Name Palace"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm">
                  <div className="flex items-center justify-between gap-2">
                    {[
                      { locus: 'Front door', num: 1 },
                      { locus: 'Hallway', num: 2 },
                      { locus: 'Living room', num: 3 },
                      { locus: 'Kitchen', num: 4 },
                    ].map((loc, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div
                          className="w-12 h-12 rounded-calm border-2 flex items-center justify-center mx-auto"
                          style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}
                        >
                          <span className="text-sm font-bold" style={{ color: '#5B6F8C' }}>{loc.num}</span>
                        </div>
                        <p className="text-[8px] font-ui text-ink-tertiary mt-1">{loc.locus}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center mt-2 mx-6">
                    <div className="flex-1 h-0.5" style={{ backgroundColor: '#5B6F8C', opacity: 0.3 }} />
                    <svg width="10" height="10" viewBox="0 0 10 10" className="mx-1">
                      <path d="M0 5H8M8 5L5 2M8 5L5 8" stroke="#5B6F8C" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            ),
            caption: 'Start with a familiar route -- your apartment, your office, your walk to school. Each room or landmark becomes a locus that will hold one person.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm space-y-3">
                  {[
                    { locus: 'Front door', name: 'Craig', feature: 'strong jawline', image: 'Jaw made of craggy rock, crumbling at the door' },
                    { locus: 'Hallway', name: 'Bridget', feature: 'wide smile', image: 'Her smile IS a bridge spanning the hallway walls' },
                    { locus: 'Living room', name: 'Grant', feature: 'thick eyebrows', image: 'Granite eyebrows so heavy they crack the couch' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 bg-surface rounded-calm border border-line-soft p-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.25 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="7" r="4" stroke="#4F7A5A" strokeWidth="1.2" />
                          <path d="M4 18c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#4F7A5A" strokeWidth="1.2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">{item.locus}: {item.name}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary">Feature: {item.feature}</p>
                        <p className="text-[10px] font-ui text-ink-secondary italic mt-0.5">{item.image}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each locus holds one person. The image links their name (converted to a vivid picture) to their distinctive feature AND to the location. Three hooks for one memory.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>RETRIEVAL WALKTHROUGH</p>
                <div className="w-full max-w-sm">
                  {[
                    { step: 'Walk to front door...', result: 'Craggy jaw crumbling -- Craig!' },
                    { step: 'Step into hallway...', result: 'Bridge-smile spanning walls -- Bridget!' },
                    { step: 'Enter living room...', result: 'Granite eyebrows on couch -- Grant!' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.4 }}
                    >
                      <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>
                        <span className="text-[9px] font-ui font-bold" style={{ color: '#4F7A5A' }}>{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui text-ink-tertiary">{item.step}</p>
                        <p className="text-[10px] font-ui text-ink-secondary font-medium">{item.result}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'To recall: mentally walk the route. Each locus triggers the image, which triggers the feature, which triggers the name. The spatial sequence keeps everything in order.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Maguire and colleagues (2003) used fMRI to study the brains of World Memory Championship competitors and found that their brains were structurally normal -- they did not have larger hippocampi or unusual neural architecture. What was different was their activation patterns: when memorizing, they showed significantly more activity in brain regions associated with spatial navigation and visual imagery. They were using the same hardware differently. The memory palace technique does not require special talent. It requires spatial thinking, which the human brain is already optimized for.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          For face-name palaces specifically, the recommendation from competitive memorizers is to have a dedicated palace that you use only for names. This avoids interference from other material stored at the same loci. A 30-locus palace -- five rooms with six loci each -- can hold 30 names from a single event. After the event, you can either commit the names to long-term memory through spaced repetition flashcards, or clear the palace for reuse by overwriting the images.
        </p>
      </section>

      {/* ---- 3D PALACE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Walk a Face-Name Palace
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Visit each locus and see the name-image in place.
        </p>
        <MemoryPalace3D />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why use a dedicated palace for names instead of mixing with other material?',
            options: [
              { id: 'interference', label: 'It avoids interference between name-images and other content', correct: true },
              { id: 'bigger', label: 'Name palaces need to be bigger', correct: false },
              { id: 'rule', label: 'It is a competition rule', correct: false },
            ],
          },
          {
            prompt: 'How many retrieval hooks does a face-name palace create per person?',
            options: [
              { id: 'three', label: 'Three: spatial location, vivid image, and facial feature', correct: true },
              { id: 'one', label: 'One: the location', correct: false },
              { id: 'two', label: 'Two: the image and the name', correct: false },
            ],
          },
          {
            prompt: 'What did fMRI studies of memory champions reveal?',
            options: [
              { id: 'activation', label: 'Different activation patterns, not different brain structures', correct: true },
              { id: 'bigger', label: 'Significantly larger hippocampi', correct: false },
              { id: 'special', label: 'A unique neural architecture', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="faces-names-l3-feynman"
        prompt="Describe how you would use a face-name palace to remember the names of 10 people at a dinner party. Walk through the setup and the retrieval."
        rubric={[
          'You described choosing a familiar route with at least 10 loci.',
          'You showed how to place one person per locus with a name-image.',
          'You explained the retrieval walk -- mentally visiting each locus in order.',
          'You mentioned linking the image to a distinctive facial feature.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 6 &middot; Faces and Names
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Social Encoding
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

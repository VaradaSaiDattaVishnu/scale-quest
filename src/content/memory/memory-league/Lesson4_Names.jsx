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
 * Lesson 4 -- Names and Faces Event
 * Competitive names and faces. Visual with SVG faces.
 */

export default function Lesson4_Names({
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
          Names and Faces
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          The competitive version of what you already learned.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In the Memory League names and faces event, competitors are shown photographs of faces paired with first and last names. They have a fixed time to memorize as many name-face pairs as possible. During recall, the same photographs are shown in a different order, and the competitor must type the correct first and last name for each. This event directly applies the techniques from the Faces and Names module: feature anchoring, name-to-image conversion, and palace placement. The competitive context adds time pressure and scoring, which sharpen technique and reveal weaknesses.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The top competitors in this event routinely memorize 80+ names in five minutes. Their approach is systematic: scan the face for a distinctive feature (1-2 seconds), convert the first name and last name into images (2-3 seconds), link the images to the feature (1-2 seconds), optionally place the composite at a palace locus (1 second). The entire process takes 5-8 seconds per face. At this pace, 80 faces in five minutes is achievable. Beginners typically start at 10-15 faces and improve steadily with daily practice.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Competitive Names ---- */}
      <VisualStepExplainer
        title="The Competition Format"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
                  {[
                    { name: 'Sarah Chen', feature: 'wide smile' },
                    { name: 'Marcus Obi', feature: 'prominent brow' },
                    { name: 'Priya Patel', feature: 'bright eyes' },
                  ].map((person, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mx-auto" style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <circle cx="14" cy="10" r="5" stroke="#5B6F8C" strokeWidth="1.2" />
                          <path d="M6 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#5B6F8C" strokeWidth="1.2" />
                        </svg>
                      </div>
                      <p className="text-[10px] font-ui text-ink-primary font-medium mt-1">{person.name}</p>
                      <p className="text-[8px] font-ui text-ink-tertiary">{person.feature}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <motion.div
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: '#B89466' }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-[8px] font-ui font-bold" style={{ color: '#B89466' }}>5:00</span>
                  </motion.div>
                  <p className="text-[10px] font-ui text-ink-tertiary">Time limit for memorization phase</p>
                </div>
              </div>
            ),
            caption: 'Memorization phase: faces appear with names. You have 5 minutes. In recall, the same faces appear WITHOUT names, in a different order. You must type each name correctly.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>THE 5-8 SECOND PROTOCOL (per face)</p>
                <div className="w-full max-w-sm">
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'rgba(79,122,90,0.3)' }} />
                    {[
                      { time: '0-2s', action: 'Scan face for distinctive feature', color: '#5B6F8C' },
                      { time: '2-4s', action: 'Convert first name to image', color: '#4F7A5A' },
                      { time: '4-5s', action: 'Convert last name to image', color: '#4F7A5A' },
                      { time: '5-7s', action: 'Link both images to facial feature', color: '#B89466' },
                      { time: '7-8s', action: 'Place composite at palace locus (optional)', color: '#5B6F8C' },
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 mb-3 ml-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <div className="w-10 h-5 rounded-sm flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${step.color}15` }}>
                          <span className="text-[7px] font-ui font-bold" style={{ color: step.color }}>{step.time}</span>
                        </div>
                        <p className="text-[10px] font-ui text-ink-secondary">{step.action}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Top competitors complete the full encoding chain in 5-8 seconds per face. With 5 minutes, that allows 40-60 faces. Daily practice gradually compresses this timing.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#5B6F8C' }}>FIRST AND LAST NAME STRATEGY</p>
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <p className="text-[10px] font-ui text-ink-primary font-medium mb-2">Sarah Chen</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] font-ui" style={{ color: '#4F7A5A' }}>First:</span>
                      <p className="text-[9px] font-ui text-ink-secondary">"Sarah" = Sahara desert, sand dunes</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] font-ui" style={{ color: '#5B6F8C' }}>Last:</span>
                      <p className="text-[9px] font-ui text-ink-secondary">"Chen" = chain, heavy steel chain</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[9px] font-ui" style={{ color: '#B89466' }}>Combined:</span>
                      <p className="text-[9px] font-ui text-ink-secondary italic">Her wide smile is a sand dune with chains draped across it</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'For both names: convert each to an image separately, then merge them into one composite scene anchored to the facial feature. The composite must be vivid enough to decode both names.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The names event is considered the most practically useful event in competitive memory. The skills transfer directly to everyday social situations. Many competitors report that after a few months of names training, they begin automatically encoding names in real life -- the process becomes unconscious. The feature scan happens in the first second of meeting someone, the name-to-image conversion fires during the handshake, and the palace placement happens while they are still introducing themselves. This automaticity is the goal of all memory training: techniques that start as deliberate practice become default behavior.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          For training, Memory League provides a names event with photographs and names from diverse backgrounds. Practicing with names from many cultures is important because it expands your repertoire of name-to-image conversions. A name you have never heard before takes longer to convert than a familiar name. Regular exposure to diverse names builds a library of quick conversions that speeds up encoding in real-world multicultural settings.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'How long does a top competitor spend encoding each face?',
            options: [
              { id: 'five', label: '5-8 seconds', correct: true },
              { id: 'thirty', label: '30 seconds', correct: false },
              { id: 'one', label: '1 second', correct: false },
            ],
          },
          {
            prompt: 'Why is the names event considered the most practically useful?',
            options: [
              { id: 'transfer', label: 'The skills transfer directly to everyday social situations', correct: true },
              { id: 'easy', label: 'It is the easiest event', correct: false },
              { id: 'scoring', label: 'It has the highest scoring potential', correct: false },
            ],
          },
          {
            prompt: 'How do you handle an unfamiliar name like "Xiaowei"?',
            options: [
              { id: 'sounds', label: 'Break it into sounds and find similar-sounding images', correct: true },
              { id: 'skip', label: 'Skip it and focus on easier names', correct: false },
              { id: 'spell', label: 'Memorize the spelling letter by letter', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="memory-league-l4-feynman"
        prompt="You meet 'Priya Patel' at a conference. Walk through the complete competitive encoding protocol: feature scan, first name image, last name image, composite, placement."
        rubric={[
          'You identified a specific facial feature to anchor to.',
          'You converted both first and last name to images.',
          'You combined the images into one scene linked to the feature.',
          'You optionally placed the composite at a palace locus.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 5 &middot; Memory League
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Abstract Images
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

import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 1 -- The Name Game
 * Baker-Baker paradox. Visual demonstration.
 * Research on name memory vs occupation memory.
 */

export default function Lesson1_NameGame({
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
          The Name Game
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Why you remember what people do but not what they are called.
        </p>
      </header>

      {/* Research paragraph: Baker-Baker paradox */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 1988, researchers McWeeny, Young, Hay, and Ellis demonstrated a striking asymmetry in memory: people are significantly better at remembering that someone is a baker (the occupation) than that someone is named Baker (the proper name). This became known as the Baker-Baker paradox. The word "baker" evokes a rich web of associations -- flour, bread, ovens, aprons, early mornings. The name "Baker" is an arbitrary label attached to a face, with no semantic connections to anything else in memory.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This finding reveals something fundamental about how names are stored in memory. Names are among the most difficult categories of information to remember because they are semantically "isolated" -- they do not connect to existing knowledge networks. A name is arbitrary: knowing someone is called "Sarah" tells you nothing about her. But knowing she is a surgeon activates associations with hospitals, scalpels, training, precision. Every name-memory technique that works does so by creating artificial semantic connections where none naturally exist.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Baker-Baker Paradox ---- */}
      <VisualStepExplainer
        title="The Baker-Baker Paradox"
        steps={[
          {
            visual: (
              <div className="flex gap-8 items-start justify-center py-4">
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center mx-auto"
                    style={{ borderColor: '#5B6F8C', backgroundColor: 'rgba(91,111,140,0.06)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="14" r="8" stroke="#5B6F8C" strokeWidth="1.5" />
                      <path d="M8 36c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#5B6F8C" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                  <p className="text-sm font-ui font-medium text-ink-primary mt-2">Mr. Baker</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">(the name)</p>
                  <motion.div
                    className="mt-2 px-3 py-1 rounded-full border"
                    style={{ borderColor: '#B89466' }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-[10px] font-ui" style={{ color: '#B89466' }}>No connections</span>
                  </motion.div>
                </div>
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 rounded-full border-2 flex items-center justify-center mx-auto"
                    style={{ borderColor: '#4F7A5A', backgroundColor: 'rgba(79,122,90,0.06)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="14" r="8" stroke="#4F7A5A" strokeWidth="1.5" />
                      <path d="M8 36c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="#4F7A5A" strokeWidth="1.5" />
                      <rect x="12" y="20" width="16" height="4" rx="1" stroke="#4F7A5A" strokeWidth="1" opacity="0.5" />
                    </svg>
                  </motion.div>
                  <p className="text-sm font-ui font-medium text-ink-primary mt-2">A baker</p>
                  <p className="text-[10px] font-ui text-ink-tertiary">(the occupation)</p>
                  <div className="mt-2 flex flex-wrap gap-1 justify-center max-w-[120px]">
                    {['flour', 'bread', 'oven', 'apron'].map((word, i) => (
                      <motion.span
                        key={word}
                        className="px-1.5 py-0.5 rounded-sm text-[8px] font-ui"
                        style={{ backgroundColor: 'rgba(79,122,90,0.15)', color: '#4F7A5A' }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Same word, different memory strength. "Baker" the name has zero semantic connections. "Baker" the occupation connects to flour, bread, ovens, early mornings -- a whole web of meaning.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="text-center">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
                      <circle cx="40" cy="40" r="10" fill="rgba(184,148,102,0.2)" stroke="#B89466" strokeWidth="1.5" />
                      <text x="40" y="44" textAnchor="middle" fill="#B89466" fontSize="8" fontFamily="sans-serif">Baker</text>
                    </svg>
                    <p className="text-[10px] font-ui text-ink-tertiary">Isolated node</p>
                  </div>
                  <div className="text-center">
                    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="mx-auto">
                      <circle cx="40" cy="40" r="10" fill="rgba(79,122,90,0.2)" stroke="#4F7A5A" strokeWidth="1.5" />
                      <text x="40" y="44" textAnchor="middle" fill="#4F7A5A" fontSize="7" fontFamily="sans-serif">baker</text>
                      {[
                        { x: 15, y: 20, label: 'flour' },
                        { x: 65, y: 20, label: 'bread' },
                        { x: 15, y: 65, label: 'oven' },
                        { x: 65, y: 65, label: 'apron' },
                      ].map((node, i) => (
                        <g key={i}>
                          <line x1="40" y1="40" x2={node.x} y2={node.y} stroke="#4F7A5A" strokeWidth="1" opacity="0.4" />
                          <circle cx={node.x} cy={node.y} r="6" fill="rgba(79,122,90,0.15)" />
                          <text x={node.x} y={node.y + 3} textAnchor="middle" fill="#4F7A5A" fontSize="5" fontFamily="sans-serif">{node.label}</text>
                        </g>
                      ))}
                    </svg>
                    <p className="text-[10px] font-ui text-ink-tertiary">Rich network</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'In your memory network, a name is a lonely island. An occupation is a connected hub. Every name technique works by building bridges from the island to the mainland.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.p
                  className="font-ui text-lg font-semibold text-center"
                  style={{ color: '#4F7A5A' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  The fix: make names meaningful.
                </motion.p>
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: 'rgba(79,122,90,0.15)' }}>
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="15" r="6" stroke="#4F7A5A" strokeWidth="1.5" />
                        <path d="M10 34c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#4F7A5A" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-ui text-ink-primary font-medium">Meet Sarah</p>
                      <p className="text-[10px] font-ui text-ink-tertiary italic">"Sarah sounds like 'Sahara' -- I picture her crossing a desert"</p>
                      <p className="text-[10px] font-ui text-ink-secondary mt-1">Now "Sarah" connects to a vivid image.</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Transform the name into something meaningful. "Sarah" becomes "Sahara desert." Now the name has an image, a story, a connection. The island has a bridge.',
          },
        ]}
      />

      {/* Research paragraph: Name encoding strategies */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Cohen and Faulkner (1986) found that the difficulty of remembering names increases with age but that the underlying mechanism remains the same across the lifespan: names lack intrinsic meaning. Their research showed that when participants were asked to generate meaningful associations for names at encoding time -- finding a word that sounds like the name, or connecting it to a known person with the same name -- recall improved dramatically. The effort of creating the association is itself a form of deep encoding.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Morris, Fritz, Jackson, Nichol, and Roberts (2005) tested a specific technique: when learning a new name, participants who created a visual image linking the name to a distinctive facial feature remembered 80% more names than those who simply repeated the name. The image does not need to be realistic -- in fact, the more absurd and vivid the image, the better it tends to work. This aligns with the Von Restorff effect: distinctive, unusual information is encoded more strongly than ordinary information.
        </p>
      </section>

      {/* ---- DRAG MATCH: Name Techniques ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match the Name to Its Mnemonic
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-6">
          Drag each name to the association that would make it memorable.
        </p>
        <DragMatch
          pairs={[
            { left: 'Craig', right: 'A craggy mountain cliff' },
            { left: 'Bridget', right: 'A bridge connecting two islands' },
            { left: 'Grant', right: 'A granite boulder' },
            { left: 'Lily', right: 'A lily pad floating on a pond' },
            { left: 'Sandy', right: 'Walking on a sandy beach' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why are names harder to remember than occupations?',
            options: [
              { id: 'semantic', label: 'Names are semantically isolated -- they connect to nothing', correct: true },
              { id: 'short', label: 'Names are shorter words', correct: false },
              { id: 'boring', label: 'Names are boring', correct: false },
            ],
          },
          {
            prompt: 'What is the Baker-Baker paradox?',
            options: [
              { id: 'occupation', label: '"Baker" the occupation is remembered better than "Baker" the name', correct: true },
              { id: 'two', label: 'Two people named Baker cannot remember each other', correct: false },
              { id: 'bread', label: 'Bakers have better memory than average', correct: false },
            ],
          },
          {
            prompt: 'What makes a name-image association effective?',
            options: [
              { id: 'vivid', label: 'It is vivid, absurd, and visually linked to a facial feature', correct: true },
              { id: 'realistic', label: 'It is realistic and subtle', correct: false },
              { id: 'repeated', label: 'It is repeated many times silently', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="faces-names-l1-feynman"
        prompt="Explain the Baker-Baker paradox to a friend who complains they are 'bad with names.' Help them understand why it happens and what to do about it."
        rubric={[
          'You explained that names lack semantic connections.',
          'You contrasted a name with an occupation or description.',
          'You described the fix: create meaningful associations for names.',
          'Your friend would leave the conversation with a technique to try.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 6 &middot; Faces and Names
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Feature Anchoring
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

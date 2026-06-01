import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 6 -- Review
 * Comprehensive review of the Faces & Names module.
 * ReflectionJournal.
 */

export default function Lesson6_Review({
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
          Faces and Names: Review
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Putting the complete system together.
        </p>
      </header>

      {/* Research paragraph: Review */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          This module has covered the fundamental science and practical techniques for remembering names and faces. The Baker-Baker paradox revealed why names are uniquely difficult -- they are semantically isolated, lacking the rich associative networks that make other information sticky. Feature anchoring gave you a method for creating an attachment point on each face. The face-name palace added spatial structure. Social encoding integrated name-learning into natural conversation. And the party protocol combined everything into a repeatable workflow.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          What makes this system work is not any single technique but the layering. Each technique adds an independent retrieval path. The name-to-image conversion creates a visual path. The feature anchor creates a facial-recognition path. The palace locus creates a spatial path. Social encoding creates an episodic-memory path. When four independent paths lead to the same name, the probability that at least one will fire when you see the face again is very high. This is the principle of encoding redundancy applied to the hardest category of everyday memory.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Full System Review ---- */}
      <VisualStepExplainer
        title="The Complete System"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="240" height="200" viewBox="0 0 240 200" fill="none" className="mx-auto">
                  {/* Center node: the name */}
                  <circle cx="120" cy="100" r="25" fill="rgba(79,122,90,0.15)" stroke="#4F7A5A" strokeWidth="2" />
                  <text x="120" y="104" textAnchor="middle" fill="#4F7A5A" fontSize="10" fontFamily="sans-serif" fontWeight="bold">NAME</text>

                  {/* Four retrieval paths */}
                  {[
                    { x: 40, y: 40, label: 'Visual Image', color: '#4F7A5A' },
                    { x: 200, y: 40, label: 'Face Feature', color: '#5B6F8C' },
                    { x: 40, y: 160, label: 'Palace Locus', color: '#5B6F8C' },
                    { x: 200, y: 160, label: 'Social Memory', color: '#4F7A5A' },
                  ].map((node, i) => (
                    <g key={i}>
                      <motion.line
                        x1="120" y1="100" x2={node.x} y2={node.y}
                        stroke={node.color}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                      />
                      <circle cx={node.x} cy={node.y} r="18" fill="rgba(91,111,140,0.08)" stroke={node.color} strokeWidth="1.5" />
                      <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.color} fontSize="7" fontFamily="sans-serif">{node.label}</text>
                    </g>
                  ))}
                </svg>
              </div>
            ),
            caption: 'Four independent retrieval paths to the same name. If any one fires when you see the face, you remember the name. Redundancy is resilience.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-full max-w-sm">
                  {[
                    { module: 'Baker-Baker Paradox', insight: 'Names fail because they lack semantic connections' },
                    { module: 'Feature Anchoring', insight: 'Attach the name to the most noticeable facial feature' },
                    { module: 'Face-Name Palace', insight: 'Spatial structure + vivid images = ordered recall' },
                    { module: 'Social Encoding', insight: 'Use the name in conversation for deeper processing' },
                    { module: 'Party Protocol', insight: 'Prepare, encode in 15 seconds, consolidate every 20 minutes' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-start gap-3 mb-2 p-2 border-l-2"
                      style={{ borderColor: '#4F7A5A' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div>
                        <p className="text-[10px] font-ui text-ink-primary font-medium">{item.module}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary">{item.insight}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Five lessons, one integrated system. Each builds on the last. The key insight: names are hard not because of your memory, but because of how names work. The fix is to make them work differently.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The research is clear that name-memory improves with deliberate practice. Morris and colleagues (2005) found that participants who practiced name-memory techniques over eight weeks showed sustained improvement that persisted at a six-month follow-up. The techniques did not just help in the short term -- they became part of participants' default approach to meeting new people. The initial awkwardness of running through a mental protocol during introductions faded as the process became automatic.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          A final note on motivation: remembering someone's name is one of the most powerful social gestures you can make. Dale Carnegie wrote in 1936 that "a person's name is to that person the sweetest and most important sound in any language." Research on social bonding confirms this: being remembered by name increases trust, liking, and willingness to cooperate. The memory techniques in this module are not just cognitive tools. They are social tools. Every name you remember strengthens a human connection.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why are names uniquely hard to remember?',
            options: [
              { id: 'isolated', label: 'They are semantically isolated -- no natural associations', correct: true },
              { id: 'short', label: 'They are too short to encode', correct: false },
              { id: 'similar', label: 'All names sound the same', correct: false },
            ],
          },
          {
            prompt: 'How many independent retrieval paths does the full system create?',
            options: [
              { id: 'four', label: 'Four: visual image, face feature, palace locus, social memory', correct: true },
              { id: 'two', label: 'Two: name and face', correct: false },
              { id: 'one', label: 'One strong path is enough', correct: false },
            ],
          },
          {
            prompt: 'What is the most critical timing window for name encoding?',
            options: [
              { id: 'fifteen', label: 'The first 15 seconds of the introduction', correct: true },
              { id: 'end', label: 'The end of the conversation', correct: false },
              { id: 'next', label: 'The next time you see the person', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="faces-names-l6-feynman"
        prompt="Teach the complete faces-and-names system to someone in two minutes. Cover why names are hard, and give them a practical protocol to try at their next social event."
        rubric={[
          'You explained the Baker-Baker paradox or why names lack associations.',
          'You described the core technique chain: feature anchor, name-image, palace locus.',
          'You mentioned social encoding as a natural complement.',
          'Your listener would leave with a protocol they could try immediately.',
        ]}
      />

      {/* ---- ReflectionJournal ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Think about a recent time you forgot someone's name. With what you know now, what would you have done differently? How will you approach name-learning going forward?"
          lessonId="memory.faces-names.review"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 6 of 6 &middot; Faces and Names
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Module complete. Next module: Memory League
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

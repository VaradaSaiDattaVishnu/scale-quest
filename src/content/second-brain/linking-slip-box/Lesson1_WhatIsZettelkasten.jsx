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
 * Lesson 1 -- What Is Zettelkasten
 * Niklas Luhmann's slip-box system: 70,000 notes, 70 books.
 * Research on associative memory and networked knowledge.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

function NetworkGraphVisual() {
  const nodes = [
    { x: 50, y: 30, label: 'A1' },
    { x: 30, y: 60, label: 'A2' },
    { x: 70, y: 55, label: 'A3' },
    { x: 15, y: 85, label: 'B1' },
    { x: 50, y: 80, label: 'B2' },
    { x: 85, y: 80, label: 'C1' },
  ]
  const edges = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4],
  ]

  return (
    <div className="flex justify-center py-4">
      <svg width="240" height="160" viewBox="0 0 100 100" className="overflow-visible">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y}
            x2={nodes[b].x} y2={nodes[b].y}
            stroke={SLATE}
            strokeWidth="0.8"
            strokeOpacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
          >
            <circle cx={n.x} cy={n.y} r="6" fill="none" stroke={SAGE} strokeWidth="1.5" />
            <text x={n.x} y={n.y + 1.5} textAnchor="middle" fontSize="4" fill={SAGE} fontFamily="ui-monospace">
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function Lesson1_WhatIsZettelkasten({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          What Is Zettelkasten
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          How one sociologist used a box of index cards to write 70 books.
        </p>
      </header>

      {/* Research: Luhmann's system */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Niklas Luhmann was a German sociologist who published over 70 books and 400 scholarly articles across an astonishing range of topics -- law, economics, politics, religion, art, ecology, love. His secret was not superhuman intellect or workaholic hours. It was a wooden cabinet containing roughly 90,000 index cards, each holding a single idea, each linked to others by a simple numbering system. He called it his Zettelkasten -- German for "slip box."
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Luhmann described the Zettelkasten not as a storage system but as a "communication partner." He would write a note, file it, and link it to existing notes. Over time, clusters of linked notes formed unexpected connections. When he sat down to write, he did not start from a blank page -- he started by following chains of linked notes until a line of argument emerged. The system did not merely store his thinking. It extended it.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="A network, not a filing cabinet"
        steps={[
          {
            visual: <NetworkGraphVisual />,
            caption: 'Each node is a single note. Each line is a link. Ideas connect to form clusters. New ideas emerge from the connections, not from any individual note.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: AMBER }}>Filing cabinet</p>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">Categories fixed in advance</p>
                    <p className="text-xs font-ui text-ink-tertiary">Notes sorted by topic</p>
                    <p className="text-xs font-ui text-ink-tertiary">No connections between drawers</p>
                    <p className="text-xs font-ui mt-2" style={{ color: AMBER }}>Static, rigid</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>Zettelkasten</p>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">Structure emerges from links</p>
                    <p className="text-xs font-ui text-ink-tertiary">Notes linked by idea</p>
                    <p className="text-xs font-ui text-ink-tertiary">Cross-domain connections</p>
                    <p className="text-xs font-ui mt-2" style={{ color: SAGE }}>Dynamic, growing</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'A filing cabinet forces you to choose one category for each idea. A Zettelkasten lets each idea connect to many others across domains.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="flex items-center gap-3 max-w-sm w-full">
                  {[
                    { num: '70K', label: 'Notes', color: SAGE },
                    { num: '70', label: 'Books', color: SAGE },
                    { num: '400+', label: 'Articles', color: SAGE },
                  ].map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="flex-1 rounded-calm border-2 p-3 text-center"
                      style={{ borderColor: stat.color }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xl font-bold font-ui" style={{ color: stat.color }}>{stat.num}</span>
                      <p className="text-xs font-ui text-ink-tertiary mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs font-ui text-ink-tertiary">Luhmann's lifetime output, powered by linked notes.</p>
              </div>
            ),
            caption: 'Luhmann\'s productivity was extraordinary not because he worked harder, but because his system generated ideas through connection and recombination.',
          },
        ]}
      />

      {/* Research: Associative memory */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The Zettelkasten mirrors how human memory actually works. Cognitive scientists describe memory as an associative network -- not a set of shelves where facts sit in isolation, but a web where each memory is connected to others by shared features, temporal proximity, or causal relationships. Retrieving one memory activates related memories through a process called spreading activation (Collins & Loftus, 1975).
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          When you link notes in a Zettelkasten, you are building an external version of this associative network. Following a chain of linked notes mimics the natural process of spreading activation. The result is that your note system thinks the way your brain thinks -- by association, not by category.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What made Luhmann\'s Zettelkasten different from a filing cabinet?',
            options: [
              { id: 'big', label: 'It was much bigger', correct: false },
              { id: 'link', label: 'Notes were linked to each other, forming a network of ideas', correct: true },
              { id: 'digital', label: 'It was digital', correct: false },
            ],
          },
          {
            prompt: 'How does a Zettelkasten mirror human memory?',
            options: [
              { id: 'visual', label: 'Both use visual images', correct: false },
              { id: 'assoc', label: 'Both work through association and spreading activation, not rigid categories', correct: true },
              { id: 'forget', label: 'Both forget over time', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="linking-L1-feynman"
        prompt="Explain to someone who organizes everything in folders why a linked network of notes might be more powerful for generating new ideas."
        rubric={[
          'You contrasted categories with connections.',
          'You mentioned that links enable unexpected combinations.',
          'You referenced how memory works by association.',
          'You gave a concrete example of cross-domain linking.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="When you think about your own notes, do they feel more like a filing cabinet or a network? What connections between ideas are you currently missing?"
          lessonId="second-brain.linking-slip-box.what-is-zettelkasten"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; Linking &amp; Slip-Box
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Link Types
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

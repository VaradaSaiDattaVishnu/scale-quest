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
 * Lesson 1 -- What Is a MOC
 * Nick Milo's Maps of Content concept.
 * Research on schema theory and emergent structure.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

function MOCClusterVisual() {
  return (
    <div className="flex flex-col items-center py-4">
      <svg width="280" height="200" viewBox="0 0 280 200" fill="none" className="overflow-visible">
        {/* Central MOC */}
        <motion.rect
          x="100" y="10" width="80" height="36" rx="8"
          stroke={SAGE} strokeWidth="2.5" fill="rgba(79,122,90,0.1)"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0 }}
        />
        <text x="140" y="33" textAnchor="middle" fontSize="11" fill={SAGE} fontWeight="bold" fontFamily="sans-serif">
          MOC
        </text>

        {/* Clustered notes */}
        {[
          { x: 20, y: 80, label: 'Note 1' },
          { x: 80, y: 100, label: 'Note 2' },
          { x: 140, y: 110, label: 'Note 3' },
          { x: 200, y: 100, label: 'Note 4' },
          { x: 260, y: 80, label: 'Note 5' },
          { x: 50, y: 150, label: 'Note 6' },
          { x: 120, y: 165, label: 'Note 7' },
          { x: 190, y: 155, label: 'Note 8' },
        ].map((n, i) => (
          <motion.g key={n.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <line x1="140" y1="46" x2={n.x + 20} y2={n.y} stroke={SLATE} strokeWidth="0.8" strokeOpacity="0.3" />
            <rect x={n.x} y={n.y} width="40" height="22" rx="4" stroke={SLATE} strokeWidth="1.2" fill="none" />
            <text x={n.x + 20} y={n.y + 14} textAnchor="middle" fontSize="7" fill={SLATE} fontFamily="sans-serif">
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* Inter-note links */}
        {[
          [20, 80, 80, 100], [80, 100, 140, 110], [200, 100, 140, 110],
          [50, 150, 120, 165], [190, 155, 120, 165],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={`inter-${i}`}
            x1={x1 + 20} y1={y1 + 11}
            x2={x2 + 20} y2={y2 + 11}
            stroke={SAGE} strokeWidth="0.6" strokeOpacity="0.25" strokeDasharray="3 2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function Lesson1_WhatIsAMOC({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          What Is a MOC
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Maps of Content: emergent structure for a growing knowledge base.
        </p>
      </header>

      {/* Research: Nick Milo and MOCs */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Nick Milo, creator of the Linking Your Thinking framework, introduced the concept of Maps of Content (MOCs) as a solution to a specific problem: what happens when your note collection grows past a few hundred notes? Folders become inadequate. Tags become unmanageable. You have notes everywhere but no way to see how they relate at a high level. A MOC is a note that maps a territory -- it lists related notes in a meaningful arrangement, providing an entry point and a navigational overview.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          A MOC is similar to a structure note (from the Zettelkasten tradition) but with a specific emphasis on emergence: you create a MOC only when a cluster of notes naturally forms, not in advance. It is a response to complexity, not a precaution against it. This distinction matters because premature structure creates empty frameworks that feel productive but add no value.
        </p>
      </section>

      {/* ---- VISUAL ---- */}
      <VisualStepExplainer
        title="A map of your thinking"
        steps={[
          {
            visual: <MOCClusterVisual />,
            caption: 'A MOC sits at the center of a cluster. It links to the notes in the cluster and arranges them in a meaningful order. The inter-note links show how ideas within the cluster relate to each other.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: AMBER }}>Folder</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Fixed category</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">One per note</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border text-center" style={{ borderColor: SLATE }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: SLATE }}>Tag</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Flat label</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">No order or structure</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: SAGE }}>MOC</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-1">Curated map</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Order is argument</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Folders are rigid categories. Tags are flat labels. MOCs are curated maps with intentional order. Each serves a different purpose; MOCs offer the most meaning.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border-2 max-w-xs w-full" style={{ borderColor: SAGE }}>
                  <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>MOC: Learning Science</p>
                  <div className="mt-3 space-y-1.5">
                    {[
                      { section: 'Foundations', notes: ['Memory is a three-stage process', 'The forgetting curve'] },
                      { section: 'Techniques', notes: ['Spacing exploits forgetting', 'Retrieval strengthens traces'] },
                      { section: 'Pitfalls', notes: ['Illusion of fluency', 'Cramming skips consolidation'] },
                    ].map((group, gi) => (
                      <motion.div key={gi}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + gi * 0.2 }}
                      >
                        <p className="text-[10px] font-ui font-semibold text-ink-primary mt-2">{group.section}</p>
                        {group.notes.map((note) => (
                          <p key={note} className="text-[10px] font-ui text-ink-secondary ml-2">
                            <span style={{ color: SAGE }}>[[</span>{note}<span style={{ color: SAGE }}>]]</span>
                          </p>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'A real MOC: grouped by sub-theme, ordered within groups, every entry is a link to an atomic note. The MOC is readable as a standalone overview of the domain.',
          },
        ]}
      />

      {/* Research: Schema theory */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Schema theory (Bartlett, 1932) describes how the brain organizes knowledge into structured frameworks. When you have a well-developed schema for a domain, you can assimilate new information more quickly, notice patterns, and retrieve relevant knowledge efficiently. A MOC is an externalized schema -- it represents your current understanding of how ideas in a domain relate to each other.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          As your understanding evolves, the MOC evolves with it. Notes are added, reordered, or grouped differently. The MOC is never "finished" -- it is a living document that tracks the shape of your thinking over time.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What distinguishes a MOC from a folder or a tag?',
            options: [
              { id: 'bigger', label: 'MOCs are bigger', correct: false },
              { id: 'curated', label: 'A MOC is a curated map with intentional order, not just a category or label', correct: true },
              { id: 'auto', label: 'MOCs are generated automatically', correct: false },
            ],
          },
          {
            prompt: 'When should you create a MOC?',
            options: [
              { id: 'first', label: 'Before you start taking notes on a topic', correct: false },
              { id: 'emerge', label: 'When a cluster of related notes naturally forms', correct: true },
              { id: 'ten', label: 'After exactly 10 notes on any topic', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="mocs-L1-feynman"
        prompt="Explain to someone who is drowning in 300 unorganized notes what a MOC is and how it could help them navigate their knowledge."
        rubric={[
          'You defined a MOC as a curated map of related notes.',
          'You explained that MOCs emerge from existing clusters.',
          'You contrasted MOCs with folders and tags.',
          'You made the navigation benefit concrete.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What area of your knowledge feels like a sprawl of disconnected ideas? What would a map of that territory look like?"
          lessonId="second-brain.mocs.what-is-a-moc"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; MOCs
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: When to Create a MOC
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

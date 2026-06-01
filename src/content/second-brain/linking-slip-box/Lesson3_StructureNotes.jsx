import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  Prompt,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Structure Notes
 * Hub notes that organize clusters of related atomic notes.
 * Research on schema theory and hierarchical organization.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson3_StructureNotes({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Structure Notes
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Hub notes that give shape to a growing network.
        </p>
      </header>

      {/* Research: Schema theory */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Luhmann used special "hub" notes that contained no original ideas of their own -- only links to other notes, arranged in a meaningful order. These structure notes served as entry points into clusters of related thinking. In modern terminology, they function like a table of contents for a region of your knowledge graph.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This aligns with schema theory in cognitive psychology (Bartlett, 1932; Piaget, 1926). A schema is a mental framework that organizes related information. When you encounter new information, you fit it into existing schemas or build new ones. Structure notes are externalized schemas -- they show your brain's map of how ideas in a domain relate to each other.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Structure notes as hubs"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-4">
                <svg width="240" height="180" viewBox="0 0 240 180" fill="none" className="overflow-visible">
                  {/* Hub node */}
                  <motion.rect
                    x="85" y="5" width="70" height="30" rx="6"
                    stroke={SAGE} strokeWidth="2" fill="rgba(79,122,90,0.08)"
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  />
                  <text x="120" y="24" textAnchor="middle" fontSize="10" fill={SAGE} fontWeight="bold" fontFamily="sans-serif">
                    Structure Note
                  </text>

                  {/* Spokes */}
                  {[
                    { x: 30, y: 80, label: 'Idea A' },
                    { x: 100, y: 90, label: 'Idea B' },
                    { x: 170, y: 80, label: 'Idea C' },
                    { x: 50, y: 140, label: 'Idea D' },
                    { x: 150, y: 140, label: 'Idea E' },
                  ].map((node, i) => (
                    <motion.g key={node.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                    >
                      <line x1="120" y1="35" x2={node.x + 25} y2={node.y} stroke={SLATE} strokeWidth="1" strokeOpacity="0.4" />
                      <rect x={node.x} y={node.y} width="50" height="24" rx="4" stroke={SLATE} strokeWidth="1.5" fill="none" />
                      <text x={node.x + 25} y={node.y + 16} textAnchor="middle" fontSize="8" fill={SLATE} fontFamily="sans-serif">
                        {node.label}
                      </text>
                    </motion.g>
                  ))}
                </svg>
              </div>
            ),
            caption: 'A structure note is a hub. It contains no ideas of its own -- only links to related notes, arranged in a meaningful order. It is a map of a region of your thinking.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border-2 max-w-xs w-full" style={{ borderColor: SAGE }}>
                  <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>Structure note: Memory</p>
                  <div className="mt-3 space-y-2">
                    {[
                      'Encoding depth determines trace strength',
                      'The forgetting curve follows exponential decay',
                      'Retrieval practice strengthens traces',
                      'Sleep consolidates procedural memory',
                      'Spacing exploits the forgetting curve',
                    ].map((link, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                      >
                        <span className="text-xs" style={{ color: SAGE }}>[[</span>
                        <span className="text-xs font-ui text-ink-secondary">{link}</span>
                        <span className="text-xs" style={{ color: SAGE }}>]]</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'A structure note for "Memory" lists five linked notes in a deliberate order. The order itself is an argument about how these ideas relate.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: AMBER }}>Without structure notes</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">200 notes</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">No map</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Where do I start?</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: SAGE }}>With structure notes</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">200 notes</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">10 hubs as entry points</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Navigate by theme</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Structure notes solve the "where do I start?" problem. Ten hub notes make 200 individual notes navigable.',
          },
        ]}
      />

      {/* Research: When to create them */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Structure notes should emerge naturally, not be planned in advance. When you notice that several of your notes keep referencing each other -- forming a cluster -- that is the signal to create a structure note. Trying to create structure notes before you have the atomic notes to fill them leads to empty frameworks that feel productive but contain nothing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The order in which you list links within a structure note is itself an act of thinking. Arranging five notes about memory in a specific sequence is an argument about how those ideas relate. It is lightweight outlining that can later become the backbone of an essay, a talk, or a chapter.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="structure-notes-prompt"
          question="Think of a topic you know well. List 5-7 key ideas about it in a meaningful order. This list is a structure note in miniature. What does the order reveal about how you think about this topic?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What does a structure note contain?',
            options: [
              { id: 'ideas', label: 'Original ideas and arguments', correct: false },
              { id: 'links', label: 'Links to related notes, arranged in a meaningful order', correct: true },
              { id: 'summary', label: 'A summary of a book or article', correct: false },
            ],
          },
          {
            prompt: 'When should you create a structure note?',
            options: [
              { id: 'first', label: 'Before you write any notes on the topic', correct: false },
              { id: 'cluster', label: 'When you notice several notes forming a cluster', correct: true },
              { id: 'ten', label: 'After exactly ten notes', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="linking-L3-feynman"
        prompt="Explain what a structure note is and why creating them too early is counterproductive."
        rubric={[
          'You defined a structure note as a hub of links, not original content.',
          'You explained that structure emerges from existing notes.',
          'You warned against empty frameworks.',
          'You gave an example of a good structure note.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Is there a topic in your life where you have many scattered thoughts but no clear map? What would a structure note for that topic look like?"
          lessonId="second-brain.linking-slip-box.structure-notes"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; Linking &amp; Slip-Box
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Practice
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

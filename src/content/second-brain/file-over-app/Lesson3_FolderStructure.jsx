import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  SortSequence,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Folder Structure
 * How to organize plain files into a navigable system.
 * Research on hierarchical vs. flat organization and cognitive load.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

function FolderTreeVisual() {
  const tree = [
    { depth: 0, label: 'vault/', icon: 'folder', color: SAGE },
    { depth: 1, label: 'inbox/', icon: 'folder', color: AMBER },
    { depth: 2, label: 'quick-thought-2024-03.md', icon: 'file', color: SLATE },
    { depth: 1, label: 'notes/', icon: 'folder', color: SAGE },
    { depth: 2, label: 'atomic-note-creativity.md', icon: 'file', color: SLATE },
    { depth: 2, label: 'atomic-note-retrieval.md', icon: 'file', color: SLATE },
    { depth: 1, label: 'projects/', icon: 'folder', color: SAGE },
    { depth: 2, label: 'book-draft/', icon: 'folder', color: SAGE },
    { depth: 1, label: 'templates/', icon: 'folder', color: AMBER },
    { depth: 1, label: 'archive/', icon: 'folder', color: SLATE },
  ]

  return (
    <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm mx-auto">
      {tree.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-center gap-2 py-1"
          style={{ paddingLeft: `${item.depth * 20}px` }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            {item.icon === 'folder' ? (
              <path d="M1 3.5C1 2.67 1.67 2 2.5 2H5.5L7 3.5H11.5C12.33 3.5 13 4.17 13 5V10.5C13 11.33 12.33 12 11.5 12H2.5C1.67 12 1 11.33 1 10.5V3.5Z" stroke={item.color} strokeWidth="1.5" fill="none" />
            ) : (
              <path d="M3 1.5H8.5L11 4V12.5H3V1.5Z" stroke={item.color} strokeWidth="1.5" fill="none" />
            )}
          </svg>
          <span className="font-mono text-sm" style={{ color: item.color }}>{item.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default function Lesson3_FolderStructure({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Folder Structure
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          A simple hierarchy that scales with your thinking.
        </p>
      </header>

      {/* Research: Cognitive load and organization */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          George Miller's 1956 research on working memory showed that humans can hold roughly seven items (plus or minus two) in active attention at once. This finding has a direct implication for folder structure: if your top-level directory has more than seven to nine folders, navigating it begins to tax working memory. You stop thinking about your ideas and start thinking about where things are.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The best folder structures are shallow and intuitive. Research on information architecture by Peter Morville and Louis Rosenfeld suggests that broad, shallow hierarchies -- where the top level has a moderate number of categories and nesting rarely exceeds three levels -- are easier to navigate than deep, narrow ones. The goal is to reach any file within two to three clicks, not to create a perfectly taxonomic filing system.
        </p>
      </section>

      {/* ---- VISUAL: Folder Tree ---- */}
      <VisualStepExplainer
        title="A structure that scales"
        steps={[
          {
            visual: <FolderTreeVisual />,
            caption: 'Five top-level folders: inbox (capture), notes (permanent), projects (active work), templates (reusable), archive (cold storage). Simple enough to remember, flexible enough to grow.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-4 border-2 text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: AMBER }}>Deep nesting</p>
                    <p className="font-mono text-xs text-ink-tertiary mt-2">notes/topics/science/physics/quantum/...</p>
                    <p className="text-xs font-ui mt-2" style={{ color: AMBER }}>Hard to navigate</p>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-2 text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>Flat + links</p>
                    <p className="font-mono text-xs text-ink-tertiary mt-2">notes/quantum-entanglement.md</p>
                    <p className="text-xs font-ui mt-2" style={{ color: SAGE }}>Find by search or link</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Deep nesting creates cognitive overhead. A flatter structure with links between notes is easier to navigate and more flexible.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="flex items-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  {[
                    { label: 'Inbox', desc: 'Capture fast', color: AMBER },
                    { label: 'Notes', desc: 'Process here', color: SAGE },
                    { label: 'Archive', desc: 'Rest quietly', color: SLATE },
                  ].map((stage, i) => (
                    <div key={stage.label} className="flex items-center gap-3">
                      <div className="text-center">
                        <motion.div
                          className="w-16 h-16 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: stage.color }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <span className="font-ui text-xs font-bold" style={{ color: stage.color }}>{stage.label}</span>
                        </motion.div>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-1">{stage.desc}</p>
                      </div>
                      {i < 2 && (
                        <motion.svg
                          width="24" height="12" viewBox="0 0 24 12" fill="none"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path d="M0 6H20M20 6L15 1M20 6L15 11" stroke={SLATE} strokeWidth="1.5" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            ),
            caption: 'Notes flow from inbox (quick capture) to notes (processed thinking) to archive (completed or dormant). This lifecycle keeps your system clean.',
          },
        ]}
      />

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the note lifecycle
        </h2>
        <SortSequence
          items={[
            { id: 'capture', label: 'Capture a thought in the inbox' },
            { id: 'process', label: 'Process it into a permanent note' },
            { id: 'link', label: 'Link it to related notes' },
            { id: 'archive', label: 'Archive when the project completes' },
          ]}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'Why should top-level folders stay under seven to nine items?',
            options: [
              { id: 'speed', label: 'Because computers process fewer folders faster', correct: false },
              { id: 'memory', label: 'Because working memory can only hold ~7 items at once', correct: true },
              { id: 'looks', label: 'Because it looks cleaner', correct: false },
            ],
          },
          {
            prompt: 'What is better than deep folder nesting for finding notes?',
            options: [
              { id: 'color', label: 'Color-coding folders', correct: false },
              { id: 'flat', label: 'Flat structure with search and links between notes', correct: true },
              { id: 'alpha', label: 'Alphabetical sorting', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="file-over-app-L3-feynman"
        prompt="Explain to someone setting up their first note system why they should keep their folder structure shallow and simple."
        rubric={[
          'You referenced working memory limits.',
          'You contrasted deep nesting with flat + links.',
          'You described the inbox-to-archive lifecycle.',
          'You kept it practical and concrete.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What does your current folder structure look like? Where does friction appear when you try to find or file something?"
          lessonId="second-brain.file-over-app.folder-structure"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; File-over-App
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Migration Mindset
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

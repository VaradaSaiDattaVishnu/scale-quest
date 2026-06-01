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
 * Lesson 3 -- Structure and Flow
 * How to build a MOC that is both navigable and generative.
 * Research on hierarchical vs. associative organization.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson3_StructureAndFlow({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Structure and Flow
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          A MOC is not a list. It is an argument made of links.
        </p>
      </header>

      {/* Research: Meaningful arrangement */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The power of a MOC comes not from listing notes but from arranging them. The order, grouping, and annotations within a MOC encode your understanding of how the ideas relate. A MOC on "Learning Science" that lists notes alphabetically is barely more useful than a tag. The same MOC that groups notes by "Foundations, Techniques, Pitfalls" and orders them within each group to build a narrative is a thinking tool.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on text organization (Meyer, 1975; Kintsch, 1998) shows that structured information is remembered better and retrieved more accurately than unstructured lists. The structure does not just help you find things -- it helps you think. When you arrange notes in a meaningful sequence, you are building an argument, identifying gaps, and creating potential starting points for writing or teaching.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="From list to argument"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-md w-full">
                  <div className="bg-surface rounded-calm p-3 border" style={{ borderColor: AMBER }}>
                    <p className="text-xs font-ui font-semibold" style={{ color: AMBER }}>Flat list</p>
                    <div className="mt-2 space-y-1">
                      {['Chunking', 'Encoding depth', 'Forgetting curve', 'Retrieval practice', 'Sleep consolidation', 'Spacing effect'].map((n) => (
                        <p key={n} className="text-[10px] font-ui text-ink-tertiary">- {n}</p>
                      ))}
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: SAGE }}>
                    <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>Structured MOC</p>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="text-[10px] font-ui font-semibold" style={{ color: SAGE }}>How memory works</p>
                        <p className="text-[10px] font-ui text-ink-tertiary ml-2">Encoding depth</p>
                        <p className="text-[10px] font-ui text-ink-tertiary ml-2">Sleep consolidation</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui font-semibold" style={{ color: SAGE }}>How to use it</p>
                        <p className="text-[10px] font-ui text-ink-tertiary ml-2">Spacing effect</p>
                        <p className="text-[10px] font-ui text-ink-tertiary ml-2">Retrieval practice</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-ui font-semibold" style={{ color: SAGE }}>Supporting concepts</p>
                        <p className="text-[10px] font-ui text-ink-tertiary ml-2">Chunking</p>
                        <p className="text-[10px] font-ui text-ink-tertiary ml-2">Forgetting curve</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Same six notes. The flat list is hard to think with. The structured MOC reveals relationships, builds narrative, and suggests where gaps exist.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">MOC building blocks</p>
                  <div className="space-y-3">
                    {[
                      { block: 'Group headings', desc: 'Cluster related notes under sub-themes', color: SAGE },
                      { block: 'Ordering within groups', desc: 'Sequence notes to build an argument', color: SAGE },
                      { block: 'Brief annotations', desc: 'One-line context for each link', color: SLATE },
                      { block: 'Open questions', desc: 'Gaps you have noticed but not yet filled', color: AMBER },
                    ].map((b, i) => (
                      <motion.div
                        key={i}
                        className="border-l-2 pl-3"
                        style={{ borderColor: b.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <p className="text-xs font-ui font-semibold" style={{ color: b.color }}>{b.block}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-0.5">{b.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Four building blocks: group headings, meaningful order, brief annotations, and open questions. Together they make a MOC a living thinking tool.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-center gap-4">
                  {[
                    { label: 'Navigate', desc: 'Find notes fast', color: SAGE },
                    { label: 'Think', desc: 'See structure', color: SAGE },
                    { label: 'Write', desc: 'Outline from MOC', color: SAGE },
                  ].map((use, i) => (
                    <motion.div
                      key={use.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.3 }}
                    >
                      <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: use.color }}>
                        <span className="font-ui text-xs font-bold" style={{ color: use.color }}>{use.label}</span>
                      </div>
                      <p className="text-[10px] font-ui text-ink-tertiary mt-2">{use.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'A well-structured MOC serves three purposes: navigation (find things), thinking (see relationships), and writing (outline ready to expand).',
          },
        ]}
      />

      {/* Research: MOCs as outlines */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          One of the most practical benefits of MOCs is that they function as ready-made outlines. When you decide to write an essay, give a talk, or teach a topic, the MOC already contains the structure: grouped ideas, a meaningful sequence, and links to the detailed notes that will become your content. The work of outlining has already been done incrementally, over weeks or months, as you added notes to the MOC.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is what Sonke Ahrens, in "How to Take Smart Notes," calls "writing as assembly, not creation from scratch." You are not staring at a blank page. You are selecting from and arranging material that already exists in your system.
        </p>
      </section>

      {/* ---- SORT SEQUENCE ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Order the MOC-building steps
        </h2>
        <SortSequence
          items={[
            { id: 'collect', label: 'Gather all notes related to the domain' },
            { id: 'group', label: 'Group them by sub-theme or aspect' },
            { id: 'order', label: 'Order notes within each group to build a narrative' },
            { id: 'annotate', label: 'Add brief annotations explaining each link' },
            { id: 'gaps', label: 'Note open questions and gaps' },
          ]}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes a structured MOC more useful than a flat list?',
            options: [
              { id: 'looks', label: 'It looks more organized', correct: false },
              { id: 'think', label: 'The grouping and ordering encode relationships, enabling thinking and writing', correct: true },
              { id: 'longer', label: 'It is longer', correct: false },
            ],
          },
          {
            prompt: 'How can a MOC help with writing?',
            options: [
              { id: 'auto', label: 'It writes the essay for you', correct: false },
              { id: 'outline', label: 'It functions as a ready-made outline with links to detailed content', correct: true },
              { id: 'grammar', label: 'It corrects grammar', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="mocs-L3-feynman"
        prompt="Explain why the order of notes in a MOC matters, and how that order can become the outline for an essay or presentation."
        rubric={[
          'You explained that order encodes relationships and argument.',
          'You contrasted a flat list with a structured arrangement.',
          'You showed how a MOC becomes a writing outline.',
          'You mentioned that this reduces blank-page anxiety.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="If you were to write something about a topic you know well, what would the MOC look like? What groups would emerge? What gaps would you notice?"
          lessonId="second-brain.mocs.structure-and-flow"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 4 &middot; MOCs
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

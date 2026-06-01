import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Concept Handles
 * Naming ideas so they are easy to retrieve and reference.
 * Research on verbal labels and retrieval cues.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson2_ConceptHandles({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Concept Handles
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Give each idea a name that makes it easy to think with.
        </p>
      </header>

      {/* Research: Verbal labels and retrieval */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Scott Alexander, the writer behind Slate Star Codex, coined the term "concept handle" to describe a short, memorable phrase that makes an idea easy to reference in conversation and thought. "Dunning-Kruger effect," "sunk-cost fallacy," "tragedy of the commons" -- each of these is a concept handle. They compress a complex idea into a portable label that fits in working memory and can be deployed instantly.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Research on verbal labeling in cognitive psychology supports why this works. Lupyan and Thompson-Schill (2012) showed that giving a category an explicit label improves both learning and retrieval. Labels act as retrieval cues -- anchor points that pull the full idea back into consciousness. When your note has a crisp, descriptive title, you can summon the entire thought just by recalling the title.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Handles make ideas graspable"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: AMBER }}>
                    <p className="text-xs font-ui" style={{ color: AMBER }}>Vague title</p>
                    <p className="font-ui text-sm text-ink-secondary mt-1">"Thoughts on learning"</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">What aspect? Which insight?</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2" style={{ borderColor: SAGE }}>
                    <p className="text-xs font-ui" style={{ color: SAGE }}>Concept handle</p>
                    <p className="font-ui text-sm text-ink-secondary mt-1">"Desirable difficulty accelerates learning"</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">One idea, instantly clear</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'A vague title requires you to open the note to know what is inside. A concept handle tells you the idea from the title alone.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                {[
                  { handle: 'Spacing effect', full: 'Distributing practice over time strengthens memory more than massing it' },
                  { handle: 'Illusion of fluency', full: 'Familiarity from re-reading masquerades as genuine understanding' },
                  { handle: 'Generation effect', full: 'Producing an answer from memory creates a stronger trace than reading it' },
                ].map((item, i) => (
                  <motion.div
                    key={item.handle}
                    className="flex items-center gap-3 max-w-sm w-full"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.4 }}
                  >
                    <div className="flex-shrink-0 w-36 rounded-calm border-2 p-2 text-center" style={{ borderColor: SAGE }}>
                      <span className="font-ui text-xs font-semibold" style={{ color: SAGE }}>{item.handle}</span>
                    </div>
                    <motion.svg width="20" height="10" viewBox="0 0 20 10" fill="none"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path d="M0 5H16M16 5L12 1M16 5L12 9" stroke={SLATE} strokeWidth="1.5" />
                    </motion.svg>
                    <p className="text-[10px] font-ui text-ink-tertiary flex-1">{item.full}</p>
                  </motion.div>
                ))}
              </div>
            ),
            caption: 'A concept handle compresses a full idea into a few words. The handle is the retrieval cue. The note is the expansion.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">Writing good handles</p>
                  <div className="space-y-2">
                    {[
                      { rule: 'Use a claim, not a topic', example: '"Constraints fuel creativity" not "Creativity"' },
                      { rule: 'Be specific enough to distinguish', example: '"Sleep consolidates procedural memory" not "Sleep and memory"' },
                      { rule: 'Make it speakable', example: 'If you can\'t say it in conversation, it is too long' },
                    ].map((r, i) => (
                      <motion.div
                        key={i}
                        className="border-l-2 pl-3"
                        style={{ borderColor: SAGE }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                      >
                        <p className="text-xs font-ui font-semibold" style={{ color: SAGE }}>{r.rule}</p>
                        <p className="text-[10px] font-ui text-ink-tertiary mt-0.5">{r.example}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Three rules for concept handles: claim over topic, specific over vague, speakable over formal.',
          },
        ]}
      />

      {/* Research: Retrieval cues */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Tulving and Thomson's encoding specificity principle (1973) showed that memory retrieval depends on how well the retrieval cue matches the original encoding. A good note title is a self-contained retrieval cue -- it encodes the idea's essence so that seeing or recalling the title pulls the full concept back. A title like "Interesting thoughts" encodes almost nothing. A title like "Desirable difficulty accelerates learning" encodes the core claim.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This matters for your second brain because note titles are the primary way you navigate, search, and link. Every link you create uses the title. Every search result shows the title. If the title is a concept handle, navigation becomes thinking. If the title is vague, navigation becomes guessing.
        </p>
      </section>

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Match the vague title to its concept handle
        </h2>
        <DragMatch
          pairs={[
            { left: 'Notes on memory', right: 'Retrieval strengthens traces more than review' },
            { left: 'Thinking about habits', right: 'Habits form through cue-routine-reward loops' },
            { left: 'Creativity stuff', right: 'Constraints channel creative output' },
            { left: 'Reading notes', right: 'Highlighting creates illusion of learning' },
          ]}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes a concept handle effective?',
            options: [
              { id: 'short', label: 'It is as short as possible', correct: false },
              { id: 'claim', label: 'It expresses a specific claim you can use in thinking and conversation', correct: true },
              { id: 'formal', label: 'It uses formal academic language', correct: false },
            ],
          },
          {
            prompt: 'Why does "Notes on memory" fail as a note title?',
            options: [
              { id: 'boring', label: 'It sounds boring', correct: false },
              { id: 'vague', label: 'It encodes no specific idea, so it fails as a retrieval cue', correct: true },
              { id: 'long', label: 'It is too long', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="atomic-notes-L2-feynman"
        prompt="Explain to someone why naming their notes with specific claims instead of vague topics will make their whole note system more useful."
        rubric={[
          'You explained how titles function as retrieval cues.',
          'You contrasted vague topic titles with concept handles.',
          'You mentioned that links and search both depend on good titles.',
          'You gave at least one concrete before/after example.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Pick three ideas that matter to you. Can you compress each into a concept handle -- a short phrase that captures the claim, not just the topic?"
          lessonId="second-brain.atomic-notes.concept-handles"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Atomic Notes
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Density and Clarity
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

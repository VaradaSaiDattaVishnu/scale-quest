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
 * Lesson 2 -- When to Create a MOC
 * The 30+ note threshold and emergence signals.
 * Research on pattern recognition and threshold effects.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson2_WhenToCreate({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          When to Create a MOC
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Not too early, not too late -- the signals that tell you it is time.
        </p>
      </header>

      {/* Research: Threshold and emergence */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Nick Milo suggests a practical threshold: consider creating a MOC when you have roughly 30 or more evergreen notes on a topic. Below that number, the notes are manageable through direct links and search. Above it, you start losing track of what you have -- notes begin to overlap, connections become invisible, and you repeatedly re-create ideas you have already captured. The MOC resolves this by providing a birds-eye view.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The 30-note threshold is a heuristic, not a rule. The real signal is cognitive: when you feel that a domain of your notes has become hard to navigate, when you can not remember what you have already written, when new notes seem disconnected from existing ones -- that is the moment a MOC will add value. Creating one earlier is premature optimization; creating one later is delayed relief.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="The emergence threshold"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex items-end gap-1 max-w-sm w-full justify-center">
                  {Array.from({ length: 12 }, (_, i) => {
                    const count = (i + 1) * 5
                    const needsMoc = count >= 30
                    return (
                      <motion.div
                        key={i}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                      >
                        <div
                          className="w-6 rounded-t"
                          style={{
                            height: `${count * 1.5}px`,
                            backgroundColor: needsMoc ? SAGE : SLATE,
                            opacity: needsMoc ? 1 : 0.4,
                          }}
                        />
                        <span className="text-[8px] font-ui text-ink-tertiary mt-1">{count}</span>
                      </motion.div>
                    )
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: SAGE }} />
                  <span className="text-xs font-ui text-ink-tertiary">MOC adds value here (30+ notes)</span>
                </div>
              </div>
            ),
            caption: 'Below 30 notes, direct links suffice. Above 30, a MOC transforms a sprawl into a navigable territory.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="bg-surface rounded-calm p-4 border border-line-soft max-w-sm w-full">
                  <p className="font-ui text-sm font-semibold text-ink-primary mb-3">Emergence signals</p>
                  <div className="space-y-2">
                    {[
                      { signal: 'You cannot remember what notes you have on this topic', color: AMBER },
                      { signal: 'New notes feel disconnected from the cluster', color: AMBER },
                      { signal: 'You write a note and later find you already wrote one like it', color: AMBER },
                      { signal: 'You want to write or teach about this topic', color: SAGE },
                      { signal: 'Search returns too many results to scan', color: SAGE },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                      >
                        <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: s.color }} />
                        <p className="text-xs font-ui text-ink-secondary">{s.signal}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            caption: 'Five signals that it is time to create a MOC. The common thread: you have lost the ability to see the shape of your knowledge in a domain.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-4 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: AMBER }}>Too early</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">8 notes on "creativity"</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Easy to navigate by links</p>
                    <p className="text-[10px] font-ui mt-2" style={{ color: AMBER }}>MOC = empty framework</p>
                  </div>
                  <div className="bg-surface rounded-calm p-3 border-2 text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-xs font-semibold" style={{ color: SAGE }}>Right time</p>
                    <p className="text-[10px] font-ui text-ink-tertiary mt-2">35 notes on "creativity"</p>
                    <p className="text-[10px] font-ui text-ink-tertiary">Losing track of what exists</p>
                    <p className="text-[10px] font-ui mt-2" style={{ color: SAGE }}>MOC = navigational relief</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Timing matters. Too early and the MOC is an empty shell. Right time and it resolves real navigational pain.',
          },
        ]}
      />

      {/* Research: Pattern recognition */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Research on expert pattern recognition (Chase & Simon, 1973; Gobet & Simon, 1996) shows that experts in any domain develop the ability to see meaningful patterns where novices see noise. The same applies to your notes: as you accumulate knowledge in a domain, you begin to see clusters, themes, and structures that were invisible when you had only a few notes. A MOC externalizes this pattern recognition, making your developing expertise visible and navigable.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Creating a MOC is itself an act of thinking. Deciding which notes belong, how to group them, and in what order to present them forces you to articulate your understanding of the domain. It is not mere housekeeping -- it is a form of knowledge construction.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="moc-when-prompt"
          question="Think about the domains of knowledge in your life. For each, roughly how many distinct ideas could you write notes about? Which domains have crossed the 30-note threshold in your mind, even if you haven't written the notes yet?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the practical threshold for creating a MOC?',
            options: [
              { id: 'five', label: 'After 5 notes', correct: false },
              { id: 'thirty', label: 'Around 30+ evergreen notes when navigation becomes difficult', correct: true },
              { id: 'hundred', label: 'Only after 100 notes', correct: false },
            ],
          },
          {
            prompt: 'Why is creating a MOC too early counterproductive?',
            options: [
              { id: 'waste', label: 'It wastes time', correct: false },
              { id: 'empty', label: 'It creates an empty framework with no real navigational value', correct: true },
              { id: 'confuse', label: 'It confuses the linking system', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="mocs-L2-feynman"
        prompt="Explain to someone who wants to start their note system by creating MOCs for every topic why they should wait, and what signals to watch for."
        rubric={[
          'You explained the premature-structure problem.',
          'You mentioned the 30-note heuristic.',
          'You listed concrete emergence signals.',
          'You framed MOC creation as a response to pain, not a precaution.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Which area of your life or work has the most accumulated knowledge? Does it feel navigable or chaotic? What would a map of that territory reveal?"
          lessonId="second-brain.mocs.when-to-create"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; MOCs
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Structure and Flow
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

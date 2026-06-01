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
 * Lesson 4 -- Migration Mindset
 * How to think about moving between tools without losing your knowledge.
 * Research on sunk-cost bias and tool-switching psychology.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson4_MigrationMindset({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Migration Mindset
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Your tools will change. Your thinking should survive every transition.
        </p>
      </header>

      {/* Research: Sunk-cost bias and tools */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Psychologists Daniel Kahneman and Amos Tversky documented a cognitive bias called the sunk-cost fallacy: the tendency to continue investing in something because of what you have already put in, rather than what you will get out. This bias shows up vividly in note-taking tools. People stay with apps they have outgrown because "I have three years of notes in there." The notes become hostages, not assets.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The migration mindset flips this: instead of choosing a tool and hoping it lasts, you choose a format that lasts and let tools come and go around it. If your notes are in Markdown files on your own machine, switching from Obsidian to Logseq to whatever comes next is trivial -- you point the new tool at the same folder. The friction of switching drops to near zero.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Tools orbit your files"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center py-6">
                <div className="relative w-48 h-48">
                  {/* Center: your files */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 flex items-center justify-center z-10"
                    style={{ borderColor: SAGE, backgroundColor: 'rgba(79,122,90,0.1)' }}
                  >
                    <span className="font-ui text-xs font-bold" style={{ color: SAGE }}>Your files</span>
                  </motion.div>
                  {/* Orbiting tools */}
                  {['Obsidian', 'Logseq', 'VS Code', 'iA Writer'].map((tool, i) => {
                    const angle = (i * 90) * (Math.PI / 180)
                    return (
                      <motion.div
                        key={tool}
                        className="absolute w-16 h-16 rounded-calm border flex items-center justify-center bg-surface"
                        style={{
                          borderColor: SLATE,
                          top: `calc(50% + ${Math.sin(angle) * 70}px - 32px)`,
                          left: `calc(50% + ${Math.cos(angle) * 70}px - 32px)`,
                        }}
                        animate={{
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <span className="font-ui text-[10px] text-ink-secondary text-center">{tool}</span>
                      </motion.div>
                    )
                  })}
                </div>
                <p className="text-xs font-ui text-ink-tertiary mt-4">Tools change. Your files stay at the center.</p>
              </div>
            ),
            caption: 'When files are the constant and tools are interchangeable, you never lose your work. Each new tool just becomes a different lens on the same knowledge.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 max-w-sm w-full">
                  <div className="bg-surface rounded-calm p-4 border-2 text-center" style={{ borderColor: AMBER }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: AMBER }}>Tool-first</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-ui text-ink-tertiary">Pick app</p>
                      <p className="text-xs font-ui text-ink-tertiary">Learn its format</p>
                      <p className="text-xs font-ui text-ink-tertiary">Build inside it</p>
                      <p className="text-xs font-ui" style={{ color: AMBER }}>Trapped when it dies</p>
                    </div>
                  </div>
                  <div className="bg-surface rounded-calm p-4 border-2 text-center" style={{ borderColor: SAGE }}>
                    <p className="font-ui text-sm font-semibold" style={{ color: SAGE }}>File-first</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-xs font-ui text-ink-tertiary">Pick format (Markdown)</p>
                      <p className="text-xs font-ui text-ink-tertiary">Build in plain files</p>
                      <p className="text-xs font-ui text-ink-tertiary">Use any tool as viewer</p>
                      <p className="text-xs font-ui" style={{ color: SAGE }}>Free to switch anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            ),
            caption: 'Tool-first thinking creates lock-in. File-first thinking creates freedom. The difference is which layer you treat as permanent.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div className="flex items-center gap-4">
                  {[
                    { year: '2020', tool: 'Notion', status: 'left' },
                    { year: '2022', tool: 'Obsidian', status: 'current' },
                    { year: '2025', tool: '???', status: 'future' },
                  ].map((item, i) => (
                    <motion.div
                      key={item.year}
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.4 }}
                    >
                      <div
                        className="w-16 h-16 rounded-calm border-2 flex items-center justify-center"
                        style={{
                          borderColor: item.status === 'current' ? SAGE : item.status === 'left' ? AMBER : SLATE,
                          opacity: item.status === 'left' ? 0.5 : 1,
                        }}
                      >
                        <span className="font-ui text-xs text-ink-secondary">{item.tool}</span>
                      </div>
                      <p className="text-xs font-ui text-ink-tertiary mt-1">{item.year}</p>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="rounded-calm p-3 border" style={{ borderColor: SAGE }}>
                  <p className="font-mono text-xs" style={{ color: SAGE }}>
                    ~/vault/*.md -- unchanged through all three
                  </p>
                </div>
              </div>
            ),
            caption: 'Three tool switches. Zero file migrations. The Markdown folder stays the same across every transition.',
          },
        ]}
      />

      {/* Research: Export as insurance */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Even if you use a cloud-based tool today, practicing regular exports builds a habit of data sovereignty. Tiago Forte, who coined "Building a Second Brain," recommends treating export as insurance: back up your notes to plain files on a regular cadence. If the service disappears tomorrow, you lose at most a week of work, not a decade.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The migration mindset is not anti-tool. It is pro-resilience. Use the best tool available. Enjoy its features. But never let your thinking become dependent on it. The file is the unit of knowledge. The tool is just the window you look through.
        </p>
      </section>

      {/* ---- PROMPT ---- */}
      <section className="my-10">
        <Prompt
          id="migration-mindset-prompt"
          question="Write down the three most important collections of notes or ideas you have right now. For each one, note: what app holds them, and could you export them to plain text today?"
          onSave={savePromptAnswer}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the sunk-cost fallacy in the context of note-taking tools?',
            options: [
              { id: 'money', label: 'Paying too much for a subscription', correct: false },
              { id: 'stay', label: 'Staying with a tool because of past investment, not future value', correct: true },
              { id: 'switch', label: 'Switching tools too often', correct: false },
            ],
          },
          {
            prompt: 'What does the migration mindset prioritize?',
            options: [
              { id: 'tool', label: 'Finding the perfect tool', correct: false },
              { id: 'format', label: 'Using a durable format so tools can come and go', correct: true },
              { id: 'cloud', label: 'Keeping everything in the cloud', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="file-over-app-L4-feynman"
        prompt="Explain to someone anxious about switching note apps why the migration mindset makes switching painless."
        rubric={[
          'You described the difference between tool-first and file-first thinking.',
          'You mentioned that Markdown files work in any tool.',
          'You addressed the emotional attachment to existing tools.',
          'Your explanation was reassuring, not preachy.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="What tool are you most attached to right now? What would happen to your notes if that tool disappeared tomorrow? How does that feel?"
          lessonId="second-brain.file-over-app.migration-mindset"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 4 of 4 &middot; File-over-App
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next module: Atomic Notes
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

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
 * Lesson 2 -- Formats That Last
 * Markdown, plain text, and formats designed for longevity.
 * Research on digital preservation and encoding standards.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

function FormatComparisonVisual() {
  const formats = [
    { name: '.txt', years: 50, durability: 100, color: SAGE },
    { name: '.md', years: 20, durability: 95, color: SAGE },
    { name: '.csv', years: 40, durability: 90, color: SAGE },
    { name: '.docx', years: 15, durability: 60, color: SLATE },
    { name: '.notion', years: 5, durability: 20, color: AMBER },
    { name: '.evernote', years: 8, durability: 15, color: AMBER },
  ]

  return (
    <div className="flex flex-col gap-3 py-4 w-full max-w-md mx-auto">
      {formats.map((f, i) => (
        <motion.div
          key={f.name}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
        >
          <span className="font-mono text-sm w-20 text-right" style={{ color: f.color }}>
            {f.name}
          </span>
          <div className="flex-1 h-6 bg-line-soft rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: f.color }}
              initial={{ width: 0 }}
              animate={{ width: `${f.durability}%` }}
              transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
            />
          </div>
          <span className="text-xs font-ui text-ink-tertiary w-14">{f.years}+ yrs</span>
        </motion.div>
      ))}
    </div>
  )
}

export default function Lesson2_FormatsThatLast({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Formats That Last
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Markdown, CSV, plain text -- and why they will outlive us all.
        </p>
      </header>

      {/* Research: Format longevity */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          John Gruber created Markdown in 2004 with a specific design goal: it should be readable as-is, without rendering. A Markdown file is just a text file with lightweight conventions -- asterisks for bold, hashes for headings, dashes for lists. You do not need Obsidian or Typora or any specific app to read it. Any text editor on any operating system will show you exactly what you wrote.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This matters because format longevity is not about technology -- it is about dependency. The fewer dependencies a format has, the longer it will survive. Plain text (.txt) depends on nothing except a character encoding standard. Markdown (.md) depends on nothing except plain text plus a small set of conventions. CSV depends on commas. These formats survive because they have almost nothing to break.
        </p>
      </section>

      {/* ---- VISUAL: Format Comparison ---- */}
      <VisualStepExplainer
        title="How long will your format last?"
        steps={[
          {
            visual: <FormatComparisonVisual />,
            caption: 'Open formats with minimal dependencies last decades. Proprietary formats depend on a single company\'s survival and priorities.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="bg-surface rounded-calm p-5 border border-line-soft max-w-sm w-full">
                  <p className="font-mono text-xs text-ink-tertiary mb-3"># Example Markdown</p>
                  <p className="font-mono text-sm text-ink-secondary">## My Idea</p>
                  <p className="font-mono text-sm text-ink-secondary mt-1">This is **bold** and this is *italic*.</p>
                  <p className="font-mono text-sm text-ink-secondary mt-1">- Point one</p>
                  <p className="font-mono text-sm text-ink-secondary">- Point two</p>
                  <p className="font-mono text-sm text-ink-secondary mt-1">{'>'} A blockquote for emphasis.</p>
                </div>
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1v14M1 8h14" stroke={SAGE} strokeWidth="2" />
                  </svg>
                  <span className="text-xs font-ui" style={{ color: SAGE }}>Readable without any app</span>
                </motion.div>
              </div>
            ),
            caption: 'Markdown is readable as plain text. The formatting is intuitive -- you can understand it without knowing any syntax rules.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-3 gap-3 max-w-sm w-full">
                  {[
                    { label: '.txt', desc: 'Pure text', icon: 'T', color: SAGE },
                    { label: '.md', desc: 'Formatted text', icon: '#', color: SAGE },
                    { label: '.csv', desc: 'Tabular data', icon: ',', color: SAGE },
                  ].map((fmt) => (
                    <motion.div
                      key={fmt.label}
                      className="bg-surface rounded-calm p-3 border-2 text-center"
                      style={{ borderColor: fmt.color }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-xl font-mono font-bold" style={{ color: fmt.color }}>{fmt.icon}</span>
                      <p className="text-sm font-ui text-ink-secondary mt-1">{fmt.label}</p>
                      <p className="text-xs font-ui text-ink-tertiary">{fmt.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The three durable formats for a personal knowledge system: plain text for prose, Markdown for structure, CSV for data.',
          },
        ]}
      />

      {/* Research: Encoding standards */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          UTF-8, the character encoding standard used by Markdown and plain text files, now covers over 98% of all web pages. It was designed in 1993 by Ken Thompson and Rob Pike to represent every character in every human language within a single encoding scheme. When you save a Markdown file in UTF-8, you are writing in the most universally supported text format in the history of computing.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The Library of Congress recommends plain text formats as the gold standard for long-term digital preservation. Their research shows that complex, proprietary formats degrade not from bit rot but from "format rot" -- the software needed to interpret them disappears. Plain text is immune to this because interpretation requires nothing beyond reading characters in sequence.
        </p>
      </section>

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Match the format to its dependency
        </h2>
        <DragMatch
          pairs={[
            { left: '.md (Markdown)', right: 'Any text editor' },
            { left: '.notion export', right: 'Notion account + API' },
            { left: '.enex (Evernote)', right: 'Evernote or converter tool' },
            { left: '.txt (plain text)', right: 'Literally any computer' },
          ]}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What makes Markdown especially durable as a format?',
            options: [
              { id: 'pop', label: 'It is the most popular format', correct: false },
              { id: 'read', label: 'It is readable as-is without any special software', correct: true },
              { id: 'fast', label: 'It loads faster than other formats', correct: false },
            ],
          },
          {
            prompt: 'What is "format rot"?',
            options: [
              { id: 'bits', label: 'When storage media physically decays', correct: false },
              { id: 'soft', label: 'When the software needed to read a format disappears', correct: true },
              { id: 'old', label: 'When files get too old to open', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="file-over-app-L2-feynman"
        prompt="Explain why a Markdown file saved today will still be readable in 50 years, while a Notion page might not be."
        rubric={[
          'You explained what makes Markdown simple and universal.',
          'You identified that proprietary formats depend on company survival.',
          'You mentioned format rot or dependency as the core risk.',
          'Your explanation is concrete, not just abstract claims.',
        ]}
      />

      {/* ---- JOURNAL ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Which of your important ideas are currently stored in formats you don't fully control? What would it mean to move them to something durable?"
          lessonId="second-brain.file-over-app.formats-that-last"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; File-over-App
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Folder Structure
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

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
 * Lesson 1 -- Why Plain Files
 * Steph Ango's File-over-App philosophy.
 * Why plain text outlasts every app that tries to contain it.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

/* Animated timeline: apps die, files persist */
function AppTimelineAnimation() {
  const apps = [
    { name: 'Google Reader', year: '2013', status: 'dead' },
    { name: 'Evernote (peak)', year: '2014', status: 'fading' },
    { name: 'Sunrise Cal', year: '2016', status: 'dead' },
    { name: 'Notion v1', year: '2018', status: 'alive' },
    { name: 'Roam Research', year: '2020', status: 'fading' },
  ]

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <div className="relative w-full max-w-md">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-line-soft" />
        {apps.map((app, i) => (
          <motion.div
            key={app.name}
            className="flex items-center gap-4 mb-4 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3, duration: 0.5 }}
          >
            <motion.div
              className="w-3 h-3 rounded-full z-10 flex-shrink-0"
              style={{
                backgroundColor: app.status === 'dead' ? AMBER : app.status === 'fading' ? SLATE : SAGE,
                marginLeft: '18px',
              }}
              animate={app.status === 'dead' ? { opacity: [1, 0.3] } : {}}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="flex-1 bg-surface rounded-calm p-3 border border-line-soft">
              <div className="flex justify-between items-center">
                <span className="font-ui text-sm text-ink-secondary">{app.name}</span>
                <span className="font-ui text-xs text-ink-tertiary">{app.year}</span>
              </div>
              {app.status === 'dead' && (
                <span className="text-xs font-ui" style={{ color: AMBER }}>Shut down</span>
              )}
              {app.status === 'fading' && (
                <span className="text-xs font-ui" style={{ color: SLATE }}>Declining</span>
              )}
            </div>
          </motion.div>
        ))}
        {/* Plain text persists */}
        <motion.div
          className="flex items-center gap-4 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full z-10 flex-shrink-0"
            style={{ backgroundColor: SAGE, marginLeft: '18px' }}
          />
          <div className="flex-1 rounded-calm p-3 border-2" style={{ borderColor: SAGE, backgroundColor: 'rgba(79,122,90,0.06)' }}>
            <div className="flex justify-between items-center">
              <span className="font-ui text-sm font-semibold" style={{ color: SAGE }}>plain-text.md</span>
              <span className="font-ui text-xs text-ink-tertiary">1970 -- forever</span>
            </div>
            <span className="text-xs font-ui" style={{ color: SAGE }}>Still works. Always will.</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function Lesson1_WhyPlainFiles({
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
          Why Plain Files
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Apps come and go. Your files should outlast all of them.
        </p>
      </header>

      {/* Research: Steph Ango's philosophy */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          In 2023, Steph Ango -- the CEO of Obsidian -- articulated a principle that had been quietly shaping how thoughtful knowledge workers store their thinking: "File over App." The idea is deceptively simple. If you write your notes in a format that belongs to an app, your notes die when the app dies. If you write them in plain text files that live on your own computer, they will outlive every app you ever use.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is not nostalgia for simplicity. It is a hard-won lesson from two decades of digital tool churn. Google Reader, Evernote, Sunrise Calendar, dozens of note-taking startups -- each promised to be the last tool you would ever need. Each eventually shut down, pivoted, or decayed. The people who stored their thinking inside those apps had to scramble to export -- if exporting was even possible. The people who stored their thinking in plain files on their own machines simply opened them in the next tool.
        </p>
      </section>

      {/* ---- VISUAL: App Timeline ---- */}
      <VisualStepExplainer
        title="Apps die. Files persist."
        steps={[
          {
            visual: <AppTimelineAnimation />,
            caption: 'Over the last decade, dozens of "essential" apps have shut down or declined. Plain text files from the 1970s still open perfectly today.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                  <div className="text-center">
                    <motion.div
                      className="h-24 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: AMBER, backgroundColor: 'rgba(184,148,102,0.06)' }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <rect x="4" y="4" width="24" height="24" rx="4" stroke={AMBER} strokeWidth="2" />
                          <path d="M10 12h12M10 16h12M10 20h8" stroke={AMBER} strokeWidth="1.5" opacity="0.5" />
                          <path d="M4 4L28 28" stroke={AMBER} strokeWidth="2" />
                        </svg>
                        <span className="text-xs font-ui" style={{ color: AMBER }}>Locked format</span>
                      </div>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">App-dependent</p>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="h-24 rounded-calm border-2 flex items-center justify-center"
                      style={{ borderColor: SAGE, backgroundColor: 'rgba(79,122,90,0.06)' }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                          <rect x="4" y="4" width="24" height="24" rx="2" stroke={SAGE} strokeWidth="2" />
                          <path d="M10 12h12M10 16h12M10 20h8" stroke={SAGE} strokeWidth="1.5" />
                        </svg>
                        <span className="text-xs font-ui" style={{ color: SAGE }}>Plain text</span>
                      </div>
                    </motion.div>
                    <p className="text-xs font-ui text-ink-tertiary mt-2">Yours forever</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Locked formats trap your thinking inside one company\'s decisions. Plain text belongs to you -- readable by any tool, on any platform, forever.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <motion.div
                  className="bg-surface rounded-calm p-4 border border-line-soft max-w-xs w-full"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <p className="font-ui text-xs text-ink-tertiary mb-2">my-notes/ideas/creativity.md</p>
                  <div className="font-mono text-sm text-ink-secondary leading-relaxed">
                    <p># Creativity and Constraint</p>
                    <p className="mt-1 text-ink-tertiary">Constraints don't limit creativity.</p>
                    <p className="text-ink-tertiary">They channel it...</p>
                  </div>
                </motion.div>
                <p className="text-xs font-ui text-ink-tertiary">
                  This file will open in 2024, 2034, or 2074.
                </p>
              </div>
            ),
            caption: 'A Markdown file is just text with light formatting. No database, no proprietary format, no login required. It will open in any text editor ever made.',
          },
        ]}
      />

      {/* Research: Digital preservation */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Digital preservation researchers at the Library of Congress have documented what they call "format obsolescence" -- the phenomenon where digital files become unreadable not because the storage medium fails, but because no software can interpret the format anymore. Proprietary database formats, custom binary encodings, and app-specific file types are the most vulnerable. Plain text formats -- ASCII, UTF-8, Markdown -- are the most resilient, because they require nothing more than a basic text editor to read.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          The implication for personal knowledge management is direct: every hour you invest in your notes is an investment in your future self. If those notes are locked inside a format that requires one specific app to read, you are betting your intellectual capital on that company's survival. If they are in plain text, you are betting on the survival of the most basic, universal standard in computing.
        </p>
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'What is the main risk of storing notes inside a proprietary app format?',
            options: [
              { id: 'slow', label: 'The app might be slow', correct: false },
              { id: 'lock', label: 'Your notes become inaccessible when the app dies or changes', correct: true },
              { id: 'ugly', label: 'The notes might look different on other devices', correct: false },
            ],
          },
          {
            prompt: 'Why does plain text survive format obsolescence?',
            options: [
              { id: 'pop', label: 'Because plain text is more popular', correct: false },
              { id: 'basic', label: 'Because it only requires a basic text editor to read', correct: true },
              { id: 'small', label: 'Because text files are smaller', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FEYNMAN CHECK ---- */}
      <FeynmanCheck
        id="file-over-app-L1-feynman"
        prompt="Explain to a friend why they should store their important notes in plain text files instead of inside a specific app."
        rubric={[
          'You mentioned that apps can shut down or change.',
          'You explained that plain text is universally readable.',
          'You gave a concrete example or analogy.',
          'Your friend could understand without technical knowledge.',
        ]}
      />

      {/* ---- JOURNAL ---- */}
      <section className="my-10">
        <ReflectionJournal
          prompt="Think about your current notes. How many are locked inside apps you might not use in five years? What would it feel like to know your thinking was safe regardless of which tool you used?"
          lessonId="second-brain.file-over-app.why-plain-files"
          onSave={addJournalEntry}
        />
      </section>

      {/* ---- FOOTER ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 1 of 4 &middot; File-over-App
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Formats That Last
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

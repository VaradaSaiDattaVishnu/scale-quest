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
 * Lesson 2 -- Link Types
 * Sequence links, branching links, and reference links.
 * Research on network effects in knowledge systems.
 */

const SAGE = '#4F7A5A'
const AMBER = '#B89466'
const SLATE = '#5B6F8C'

export default function Lesson2_LinkTypes({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Link Types
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Not all connections are the same. Learn the three link types that structure a Zettelkasten.
        </p>
      </header>

      {/* Research: Types of connections */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Luhmann used three distinct types of links in his slip box, each serving a different structural purpose. Sequence links chain notes into a line of argument. Branching links fork off from a note to explore a tangent. Reference links connect notes across distant parts of the system where the same concept appears in different contexts.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Understanding these link types matters because they shape how you navigate your knowledge. A sequence link says "this leads to that." A branching link says "here is a related tangent." A reference link says "this same idea shows up over there." Each type creates a different kind of path through your notes, and each serves a different purpose when you sit down to think or write.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER ---- */}
      <VisualStepExplainer
        title="Three ways to connect"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                {/* Sequence link */}
                <div className="flex items-center gap-3">
                  {['1a', '1b', '1c', '1d'].map((label, i) => (
                    <div key={label} className="flex items-center gap-2">
                      <motion.div
                        className="w-12 h-12 rounded-calm border-2 flex items-center justify-center"
                        style={{ borderColor: SAGE }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <span className="font-mono text-xs" style={{ color: SAGE }}>{label}</span>
                      </motion.div>
                      {i < 3 && (
                        <motion.svg width="16" height="8" viewBox="0 0 16 8" fill="none"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path d="M0 4H12M12 4L9 1M12 4L9 7" stroke={SAGE} strokeWidth="1.5" />
                        </motion.svg>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs font-ui" style={{ color: SAGE }}>Sequence: a line of argument</p>
              </div>
            ),
            caption: 'Sequence links chain notes in order. They form a thread: "1a leads to 1b leads to 1c." Use these when building an argument or narrative.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="220" height="120" viewBox="0 0 220 120" fill="none" className="overflow-visible">
                  {/* Main sequence */}
                  <motion.rect x="10" y="45" width="50" height="30" rx="4" stroke={SAGE} strokeWidth="1.5" fill="none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0 }} />
                  <text x="35" y="64" textAnchor="middle" fontSize="10" fill={SAGE} fontFamily="ui-monospace">2a</text>

                  <motion.line x1="60" y1="60" x2="80" y2="60" stroke={SAGE} strokeWidth="1.5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />

                  <motion.rect x="80" y="45" width="50" height="30" rx="4" stroke={SAGE} strokeWidth="1.5" fill="none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                  <text x="105" y="64" textAnchor="middle" fontSize="10" fill={SAGE} fontFamily="ui-monospace">2b</text>

                  <motion.line x1="130" y1="60" x2="150" y2="60" stroke={SAGE} strokeWidth="1.5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} />

                  <motion.rect x="150" y="45" width="50" height="30" rx="4" stroke={SAGE} strokeWidth="1.5" fill="none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                  <text x="175" y="64" textAnchor="middle" fontSize="10" fill={SAGE} fontFamily="ui-monospace">2c</text>

                  {/* Branch */}
                  <motion.line x1="105" y1="45" x2="105" y2="20" stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} />
                  <motion.rect x="80" y="0" width="50" height="24" rx="4" stroke={AMBER} strokeWidth="1.5" fill="none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} />
                  <text x="105" y="16" textAnchor="middle" fontSize="10" fill={AMBER} fontFamily="ui-monospace">2b1</text>

                  <motion.line x1="105" y1="75" x2="105" y2="96" stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 2"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} />
                  <motion.rect x="80" y="96" width="50" height="24" rx="4" stroke={AMBER} strokeWidth="1.5" fill="none"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} />
                  <text x="105" y="112" textAnchor="middle" fontSize="10" fill={AMBER} fontFamily="ui-monospace">2b2</text>
                </svg>
                <p className="text-xs font-ui" style={{ color: AMBER }}>Branching: tangents that fork off</p>
              </div>
            ),
            caption: 'Branching links fork from a note to explore tangents. Note 2b spawns 2b1 and 2b2 -- related ideas that don\'t belong in the main sequence.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <svg width="220" height="100" viewBox="0 0 220 100" fill="none" className="overflow-visible">
                  <motion.rect x="10" y="35" width="60" height="30" rx="4" stroke={SAGE} strokeWidth="1.5" fill="none" />
                  <text x="40" y="54" textAnchor="middle" fontSize="9" fill={SAGE} fontFamily="ui-monospace">Creativity</text>

                  <motion.rect x="150" y="35" width="60" height="30" rx="4" stroke={SAGE} strokeWidth="1.5" fill="none" />
                  <text x="180" y="54" textAnchor="middle" fontSize="9" fill={SAGE} fontFamily="ui-monospace">Constraint</text>

                  <motion.path
                    d="M70 50 C110 10, 110 10, 150 50"
                    stroke={SLATE}
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    fill="none"
                    animate={{ strokeDashoffset: [0, -14] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <text x="110" y="22" textAnchor="middle" fontSize="8" fill={SLATE} fontFamily="ui-monospace">ref</text>
                </svg>
                <p className="text-xs font-ui" style={{ color: SLATE }}>Reference: cross-system connections</p>
              </div>
            ),
            caption: 'Reference links connect distant notes that share a concept. A note on creativity might reference a note on constraint in a completely different cluster.',
          },
        ]}
      />

      {/* Research: Network effects */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Network theory shows that the value of a network grows faster than the number of nodes. Metcalfe's law, originally about telecommunications, applies to knowledge systems: every new note you add creates potential connections with every existing note. A system with 100 notes has roughly 4,950 possible pairwise connections. A system with 1,000 notes has roughly 499,500. The richness of your knowledge base grows quadratically.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          This is why linked notes become dramatically more valuable over time. Each new note is not just one more piece of information -- it is a new node that can connect to everything that already exists. The more notes you have, the more likely any new note will connect to something unexpected, generating an insight you could not have planned.
        </p>
      </section>

      {/* ---- DRAG MATCH ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-4">
          Match the link type to its purpose
        </h2>
        <DragMatch
          pairs={[
            { left: 'Sequence link', right: 'Build a line of argument in order' },
            { left: 'Branching link', right: 'Explore a tangent from an existing note' },
            { left: 'Reference link', right: 'Connect distant notes sharing a concept' },
          ]}
        />
      </section>

      {/* ---- QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'When should you use a branching link?',
            options: [
              { id: 'next', label: 'When continuing a sequence', correct: false },
              { id: 'tangent', label: 'When a note sparks a tangent worth exploring separately', correct: true },
              { id: 'cite', label: 'When citing a source', correct: false },
            ],
          },
          {
            prompt: 'Why does a linked knowledge system become more valuable over time?',
            options: [
              { id: 'notes', label: 'Because you have more notes', correct: false },
              { id: 'network', label: 'Because each new note can connect to all existing notes, growing connections quadratically', correct: true },
              { id: 'habit', label: 'Because the habit gets stronger', correct: false },
            ],
          },
        ]}
      />

      <FeynmanCheck
        id="linking-L2-feynman"
        prompt="Explain the three link types to someone who has never used a Zettelkasten, using a concrete example for each."
        rubric={[
          'You clearly distinguished sequence, branching, and reference links.',
          'You gave a concrete example for each type.',
          'You explained when to use each one.',
          'Your listener could apply this immediately.',
        ]}
      />

      <section className="my-10">
        <ReflectionJournal
          prompt="Think about two ideas from different areas of your life. What kind of link would connect them? What insight might emerge from making that connection explicit?"
          lessonId="second-brain.linking-slip-box.link-types"
          onSave={addJournalEntry}
        />
      </section>

      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 4 &middot; Linking &amp; Slip-Box
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Structure Notes
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

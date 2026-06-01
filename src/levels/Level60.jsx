import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  FileText, Users, Edit3, GitMerge, Wifi, Crown
} from 'lucide-react'

/* ── Helper Components ── */

function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="term cursor-pointer"
        onMouseEnter={() => { setShowTooltip(true); onLearn?.(word) }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {word}
      </span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 z-50"
          >
            <p className="font-semibold text-quest-primary mb-1">{word}</p>
            <p className="text-sm text-quest-text">{definition}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

function DeepDive({ id, title, children, onRead }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-quest-surface/50 rounded-lg border border-quest-secondary/30 overflow-hidden my-6">
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) onRead?.(id) }}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-quest-secondary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-quest-secondary" />
          <span className="font-semibold">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className="pt-2 border-t border-white/5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Glossary ── */
const terms = {
  'Operational Transformation': 'A technique for resolving conflicts in collaborative editing by transforming operations against each other so they can be applied in any order and converge to the same state.',
  'CRDT': 'Conflict-free Replicated Data Type. A data structure that can be replicated across multiple nodes and merged automatically without coordination, guaranteeing eventual consistency.',
  'Conflict Resolution': 'The process of determining the correct outcome when two or more users make concurrent changes to the same part of a document.',
  'Real-time Sync': 'The continuous synchronization of document state across all connected clients with minimal latency, typically via WebSockets.',
  'Cursor Presence': 'Showing each collaborator\'s cursor position and selection in real-time, allowing users to see where others are editing.',
  'Eventual Consistency': 'A consistency model where all replicas of a document will converge to the same state given enough time, even if they temporarily diverge.',
  'WebSocket': 'A persistent, full-duplex communication channel over a single TCP connection, ideal for real-time collaborative applications.',
  'Vector Clock': 'A mechanism for tracking causality between events in a distributed system, used to detect concurrent operations.',
  'Intention Preservation': 'Ensuring that the effect of an operation matches the user\'s original intent, even after transformation against concurrent operations.',
  'Session': 'A single user\'s connection to a collaborative document, including their cursor position, selection, and identity.',
}

/* ── OT Simulation Data ── */
const otScenarios = [
  {
    id: 'insert-delete',
    title: 'Insert + Delete Conflict',
    initial: 'ABCDE',
    userA: { label: 'Alice', color: 'blue', op: 'Insert "X" at position 3', type: 'insert', pos: 3, char: 'X' },
    userB: { label: 'Bob', color: 'green', op: 'Delete char at position 1', type: 'delete', pos: 1 },
    steps: [
      { desc: 'Initial document state', doc: 'ABCDE' },
      { desc: 'Alice inserts "X" at pos 3 (locally)', docA: 'ABCXDE', docB: 'ABCDE' },
      { desc: 'Bob deletes pos 1 (locally)', docA: 'ABCXDE', docB: 'ACDE' },
      { desc: 'OT transforms Alice\'s op: insert pos 3 becomes insert pos 2 (shifted by Bob\'s delete)', docA: 'ACXDE', docB: 'ACXDE' },
    ],
    result: 'ACXDE',
  },
  {
    id: 'insert-insert',
    title: 'Concurrent Inserts',
    initial: 'HELLO',
    userA: { label: 'Alice', color: 'blue', op: 'Insert "!" at position 5', type: 'insert', pos: 5, char: '!' },
    userB: { label: 'Bob', color: 'green', op: 'Insert "?" at position 5', type: 'insert', pos: 5, char: '?' },
    steps: [
      { desc: 'Initial document state', doc: 'HELLO' },
      { desc: 'Alice inserts "!" at pos 5 (locally)', docA: 'HELLO!', docB: 'HELLO' },
      { desc: 'Bob inserts "?" at pos 5 (locally)', docA: 'HELLO!', docB: 'HELLO?' },
      { desc: 'OT uses priority (Alice first): Bob\'s pos 5 becomes pos 6', docA: 'HELLO!?', docB: 'HELLO!?' },
    ],
    result: 'HELLO!?',
  },
]

/* ── CRDT Comparison Data ── */
const crdtComparison = [
  { feature: 'Central Server', ot: 'Required', crdt: 'Not required', winner: 'crdt' },
  { feature: 'Conflict Resolution', ot: 'Transform operations', crdt: 'Automatic merge', winner: 'crdt' },
  { feature: 'Memory Usage', ot: 'Lower', crdt: 'Higher (tombstones)', winner: 'ot' },
  { feature: 'Latency', ot: 'Depends on server', crdt: 'Local-first', winner: 'crdt' },
  { feature: 'Complexity', ot: 'Complex transforms', crdt: 'Complex data structures', winner: 'tie' },
  { feature: 'Undo Support', ot: 'Easier', crdt: 'Harder', winner: 'ot' },
  { feature: 'Offline Support', ot: 'Limited', crdt: 'Excellent', winner: 'crdt' },
  { feature: 'Used By', ot: 'Google Docs', crdt: 'Figma, Yjs', winner: 'tie' },
]

/* ── Architecture Layers ── */
const architectureLayers = [
  {
    id: 'client',
    label: 'Client Layer',
    icon: 'Edit3',
    color: 'blue',
    items: ['Rich Text Editor', 'Local Operation Buffer', 'Cursor Renderer', 'Undo/Redo Stack'],
    desc: 'Users type here. Operations are generated locally and sent to the server.',
  },
  {
    id: 'websocket',
    label: 'WebSocket Gateway',
    icon: 'Wifi',
    color: 'purple',
    items: ['Connection Manager', 'Message Router', 'Heartbeat/Ping', 'Authentication'],
    desc: 'Persistent connections for real-time bidirectional communication.',
  },
  {
    id: 'ot-server',
    label: 'OT Server',
    icon: 'GitMerge',
    color: 'yellow',
    items: ['Operation Queue', 'Transform Engine', 'Version Control', 'Conflict Resolver'],
    desc: 'The brain. Transforms concurrent operations and maintains document consistency.',
  },
  {
    id: 'doc-store',
    label: 'Document Store',
    icon: 'FileText',
    color: 'green',
    items: ['Document Snapshots', 'Operation Log', 'Revision History', 'Auto-save'],
    desc: 'Persistent storage for document state and full operation history.',
  },
  {
    id: 'presence',
    label: 'Presence Service',
    icon: 'Users',
    color: 'pink',
    items: ['Cursor Positions', 'User Colors', 'Active Users List', 'Typing Indicators'],
    desc: 'Tracks who is editing where, broadcasting cursor positions to all clients.',
  },
]

/* ── Quiz Questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the primary purpose of Operational Transformation (OT)?',
    options: [
      'Encrypting document contents',
      'Transforming concurrent operations so they converge to the same state',
      'Compressing document data for storage',
      'Managing user authentication',
    ],
    correct: 1,
    explanation: 'OT transforms concurrent operations against each other so that regardless of the order they are applied, all clients converge to the same document state.',
  },
  {
    id: 'q2',
    question: 'How do CRDTs differ from OT in their approach to conflict resolution?',
    options: [
      'CRDTs require a central server while OT does not',
      'CRDTs use mathematical properties of the data structure to guarantee convergence without a central coordinator',
      'CRDTs only work with plain text, not rich text',
      'CRDTs are faster but less accurate than OT',
    ],
    correct: 1,
    explanation: 'CRDTs are designed so that concurrent operations can be merged automatically using the mathematical properties of the data structure, without needing a central server to coordinate.',
  },
  {
    id: 'q3',
    question: 'In Google Docs, what happens when two users type at the exact same position simultaneously?',
    options: [
      'One user\'s changes are discarded',
      'The document locks until one user finishes',
      'OT transforms the operations so both edits are preserved in a deterministic order',
      'The server picks a random winner',
    ],
    correct: 2,
    explanation: 'OT uses priority rules (like user ID ordering) to deterministically transform concurrent operations at the same position, preserving both edits.',
  },
  {
    id: 'q4',
    question: 'What protocol is typically used for real-time collaboration instead of HTTP?',
    options: [
      'FTP',
      'SMTP',
      'WebSocket',
      'GraphQL subscriptions only',
    ],
    correct: 2,
    explanation: 'WebSockets provide persistent, full-duplex connections ideal for real-time collaboration, unlike HTTP\'s request-response model.',
  },
  {
    id: 'q5',
    question: 'What is "cursor presence" in collaborative editing?',
    options: [
      'The blinking animation of your own cursor',
      'Showing each collaborator\'s cursor position and selection in real-time',
      'A security feature that tracks cursor movements',
      'The ability to move the cursor with arrow keys',
    ],
    correct: 1,
    explanation: 'Cursor presence lets you see where other collaborators are editing in real-time, each with a unique color and name label.',
  },
  {
    id: 'q6',
    question: 'What is a major disadvantage of CRDTs compared to OT?',
    options: [
      'CRDTs cannot handle concurrent edits',
      'CRDTs require more memory due to tombstones and metadata',
      'CRDTs are slower to apply operations locally',
      'CRDTs do not support text editing',
    ],
    correct: 1,
    explanation: 'CRDTs maintain tombstones for deleted elements and additional metadata, which increases memory usage compared to OT approaches.',
  },
  {
    id: 'q7',
    question: 'What does "eventual consistency" mean in the context of collaborative editing?',
    options: [
      'All users see changes at exactly the same millisecond',
      'The document is saved eventually to the database',
      'All replicas will converge to the same state given enough time, even if temporarily different',
      'The server eventually becomes consistent after a restart',
    ],
    correct: 2,
    explanation: 'Eventual consistency means that while different clients might temporarily see different states, they will all converge to the same document state once all operations are propagated and applied.',
  },
]

/* ── Collaborative Editing Demo Data ── */
const collabDemoText = 'The quick brown fox jumps over the lazy dog'

const collaborators = [
  { id: 'alice', name: 'Alice', color: '#3b82f6', cursorPos: 10 },
  { id: 'bob', name: 'Bob', color: '#22c55e', cursorPos: 25 },
  { id: 'carol', name: 'Carol', color: '#f59e0b', cursorPos: 38 },
]

/* ── Main Component ── */
export default function Level60({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [activeTab, setActiveTab] = useState('collab')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  // OT simulation state
  const [activeScenario, setActiveScenario] = useState(0)
  const [otStep, setOtStep] = useState(0)
  const [otPlaying, setOtPlaying] = useState(false)

  // Collab demo state
  const [demoText, setDemoText] = useState(collabDemoText)
  const [cursors, setCursors] = useState(collaborators)
  const [demoRunning, setDemoRunning] = useState(false)
  const [demoEvents, setDemoEvents] = useState([])

  // Architecture highlight
  const [highlightedLayer, setHighlightedLayer] = useState(null)

  // CRDT highlight
  const [crdtHighlight, setCrdtHighlight] = useState(null)

  // Celebration state
  const [showCelebration, setShowCelebration] = useState(false)

  const tabs = [
    { id: 'collab', label: 'Live Collab', icon: Users },
    { id: 'ot', label: 'OT Visualizer', icon: GitMerge },
    { id: 'crdt', label: 'OT vs CRDT', icon: FileText },
    { id: 'arch', label: 'Architecture', icon: Wifi },
    { id: 'quiz', label: 'Final Quiz', icon: Crown },
  ]

  const T = useCallback((word) => {
    const def = terms[word]
    return def ? <Term word={word} definition={def} onLearn={learnTerm} /> : word
  }, [learnTerm])

  /* ── Collab Demo Logic ── */
  const runCollabDemo = useCallback(() => {
    if (demoRunning) return
    setDemoRunning(true)
    setDemoEvents([])
    setDemoText(collabDemoText)
    setCursors(collaborators)

    const events = [
      { time: 500, user: 'alice', action: 'insert', pos: 10, char: 'very ', desc: 'Alice inserts "very " at position 10' },
      { time: 1200, user: 'bob', action: 'delete', pos: 25, count: 4, desc: 'Bob deletes "lazy" at position 25' },
      { time: 1800, user: 'carol', action: 'insert', pos: 38, char: '!', desc: 'Carol inserts "!" at the end' },
      { time: 2500, user: 'alice', action: 'insert', pos: 4, char: ' incredibly', desc: 'Alice inserts " incredibly" at position 4' },
      { time: 3200, user: 'bob', action: 'insert', pos: 30, char: 'sleepy ', desc: 'Bob inserts "sleepy " where "lazy" was' },
    ]

    let currentText = collabDemoText
    let currentCursors = [...collaborators]

    events.forEach((evt, idx) => {
      setTimeout(() => {
        if (evt.action === 'insert') {
          const safePosInsert = Math.min(evt.pos, currentText.length)
          currentText = currentText.slice(0, safePosInsert) + evt.char + currentText.slice(safePosInsert)
          currentCursors = currentCursors.map(c =>
            c.id === evt.user
              ? { ...c, cursorPos: safePosInsert + evt.char.length }
              : { ...c, cursorPos: c.cursorPos >= safePosInsert ? c.cursorPos + evt.char.length : c.cursorPos }
          )
        } else if (evt.action === 'delete') {
          const safePosDelete = Math.min(evt.pos, currentText.length)
          const safeCount = Math.min(evt.count, currentText.length - safePosDelete)
          currentText = currentText.slice(0, safePosDelete) + currentText.slice(safePosDelete + safeCount)
          currentCursors = currentCursors.map(c =>
            c.id === evt.user
              ? { ...c, cursorPos: safePosDelete }
              : { ...c, cursorPos: c.cursorPos > safePosDelete ? Math.max(safePosDelete, c.cursorPos - safeCount) : c.cursorPos }
          )
        }

        setDemoText(currentText)
        setCursors([...currentCursors])
        setDemoEvents(prev => [...prev, { ...evt, timestamp: Date.now() }])

        if (idx === events.length - 1) {
          setTimeout(() => setDemoRunning(false), 500)
        }
      }, evt.time)
    })
  }, [demoRunning])

  /* ── OT Playback ── */
  useEffect(() => {
    if (!otPlaying) return
    const scenario = otScenarios[activeScenario]
    if (otStep >= scenario.steps.length - 1) {
      setOtPlaying(false)
      return
    }
    const timer = setTimeout(() => {
      setOtStep(prev => prev + 1)
    }, 1500)
    return () => clearTimeout(timer)
  }, [otPlaying, otStep, activeScenario])

  /* ── Quiz Logic ── */
  const handleAnswer = useCallback((qId, optIdx) => {
    if (showResults) return
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }, [showResults])

  const allAnswered = Object.keys(quizAnswers).length === quizQuestions.length

  const handleSubmitQuiz = useCallback(() => {
    let s = 0
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) s++
    })
    setScore(s)
    setShowResults(true)
    if (s >= 5) {
      setShowCelebration(true)
      onComplete?.()
    }
  }, [quizAnswers, onComplete])

  const getIconComponent = (iconName) => {
    const icons = { Edit3, Wifi, GitMerge, FileText, Users }
    return icons[iconName] || FileText
  }

  const colorMap = {
    blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
    purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
    yellow: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400', glow: 'shadow-yellow-500/20' },
    green: { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-400', glow: 'shadow-green-500/20' },
    pink: { bg: 'bg-pink-500/20', border: 'border-pink-500/40', text: 'text-pink-400', glow: 'shadow-pink-500/20' },
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="quest-card p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <Crown size={28} className="text-yellow-400" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Level 60: Design Google Docs</h1>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30">
                FINAL LEVEL
              </span>
            </div>
            <p className="text-quest-text/60 text-sm">Real-time Collaboration - HLD Case Study</p>
          </div>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto"
            >
              <CheckCircle className="text-green-400" size={28} />
            </motion.div>
          )}
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-blue-500/10 border border-yellow-500/20">
          <p className="text-lg font-medium italic text-center">
            "50 people editing one document simultaneously. No conflicts. How?"
          </p>
        </div>

        <div className="mt-4 text-sm text-quest-text/70 space-y-2">
          <p>
            Google Docs supports hundreds of concurrent editors on a single document.
            The secret lies in {T('Operational Transformation')} -- a family of algorithms
            that transform concurrent operations so every user converges to the same state.
            An alternative approach uses {T('CRDT')}s, which guarantee
            {' '}{T('Eventual Consistency')} without a central coordinator.
          </p>
          <p>
            In this final level, you will explore how {T('Real-time Sync')} works,
            how {T('Conflict Resolution')} ensures no edits are lost, and how
            {' '}{T('Cursor Presence')} keeps everyone aware of where collaborators
            are working.
          </p>
        </div>
      </motion.div>

      {/* ── Tab Navigation ── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? tab.id === 'quiz'
                    ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : 'bg-quest-primary/20 text-quest-primary border border-quest-primary/30'
                  : 'bg-quest-surface/30 text-quest-text/50 border border-white/5 hover:border-white/10'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Live Collaboration Tab ── */}
      {activeTab === 'collab' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Users size={20} className="text-quest-primary" />
              Collaborative Editing Demo
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Watch three users edit a document simultaneously. Notice how cursors move, positions shift,
              and all operations are correctly transformed.
            </p>

            {/* Collaborator avatars */}
            <div className="flex gap-4 mb-4">
              {cursors.map(c => (
                <div key={c.id} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: c.color }}>
                    {c.name}
                  </span>
                  <span className="text-xs text-quest-text/40">pos {c.cursorPos}</span>
                </div>
              ))}
            </div>

            {/* Document view with cursors */}
            <div className="relative p-6 rounded-xl bg-black/30 border border-white/10 font-mono text-sm mb-4 overflow-x-auto">
              <div className="relative inline-block">
                {demoText.split('').map((char, idx) => {
                  const cursorHere = cursors.filter(c => c.cursorPos === idx)
                  return (
                    <span key={idx} className="relative">
                      {cursorHere.map(c => (
                        <motion.span
                          key={c.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="absolute -top-5 left-0 text-xs font-sans font-bold whitespace-nowrap"
                          style={{ color: c.color }}
                        >
                          {c.name}
                          <span
                            className="absolute left-0 top-4 w-0.5 h-5"
                            style={{ backgroundColor: c.color }}
                          />
                        </motion.span>
                      ))}
                      <span className={cursorHere.length > 0 ? 'bg-white/10' : ''}>
                        {char}
                      </span>
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Event log */}
            <div className="mb-4 max-h-40 overflow-y-auto rounded-lg bg-quest-surface/20 border border-white/5">
              {demoEvents.length === 0 ? (
                <p className="p-3 text-sm text-quest-text/30 text-center">
                  Click "Run Demo" to see collaborative editing in action
                </p>
              ) : (
                demoEvents.map((evt, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-2 border-b border-white/5 text-sm flex items-center gap-2"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: collaborators.find(c => c.id === evt.user)?.color }}
                    />
                    <span className="text-quest-text/70">{evt.desc}</span>
                  </motion.div>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={runCollabDemo}
                disabled={demoRunning}
                className="px-6 py-2 rounded-lg bg-quest-primary/20 text-quest-primary border border-quest-primary/30 text-sm font-medium hover:bg-quest-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {demoRunning ? 'Running...' : 'Run Demo'}
              </button>
              <button
                onClick={() => {
                  setDemoText(collabDemoText)
                  setCursors(collaborators)
                  setDemoEvents([])
                }}
                disabled={demoRunning}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors disabled:opacity-30"
              >
                Reset
              </button>
            </div>
          </div>

          <DeepDive id="presence-deep" title="How Cursor Presence Works Under the Hood" onRead={markDeepDiveRead}>
            <div className="text-sm text-quest-text/80 space-y-3">
              <p>
                Each client periodically broadcasts its cursor position to a dedicated <strong className="text-pink-400">Presence Service</strong>.
                This is separate from the document sync channel to keep overhead low.
              </p>
              <div className="p-3 rounded-lg bg-black/20 font-mono text-xs space-y-1">
                <p className="text-pink-400">// Presence message (sent every 50-100ms during active editing)</p>
                <p>{'{'}</p>
                <p>{'  "userId": "alice_42",'}</p>
                <p>{'  "docId": "doc_abc123",'}</p>
                <p>{'  "cursor": { "line": 14, "ch": 23 },'}</p>
                <p>{'  "selection": { "start": { "line": 14, "ch": 20 }, "end": { "line": 14, "ch": 23 } },'}</p>
                <p>{'  "color": "#3b82f6",'}</p>
                <p>{'  "name": "Alice"'}</p>
                <p>{'}'}</p>
              </div>
              <p>
                Presence data is ephemeral -- it is not stored long-term. If a user disconnects,
                their cursor fades out after a timeout (typically 5-10 seconds).
              </p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ── OT Visualizer Tab ── */}
      {activeTab === 'ot' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <GitMerge size={20} className="text-quest-primary" />
              Operational Transformation Visualizer
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              See how OT resolves conflicts step by step. Two users make concurrent edits,
              and the transformation function ensures they converge.
            </p>

            {/* Scenario selector */}
            <div className="flex gap-2 mb-6">
              {otScenarios.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => { setActiveScenario(idx); setOtStep(0); setOtPlaying(false) }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeScenario === idx
                      ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/30'
                      : 'bg-quest-surface/30 text-quest-text/50 border border-white/5 hover:border-white/10'
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {(() => {
              const scenario = otScenarios[activeScenario]
              const step = scenario.steps[otStep]
              return (
                <div className="space-y-4">
                  {/* User operations */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <span className="text-sm font-bold text-blue-400">{scenario.userA.label}</span>
                      </div>
                      <p className="text-xs text-blue-400/70 font-mono">{scenario.userA.op}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm font-bold text-green-400">{scenario.userB.label}</span>
                      </div>
                      <p className="text-xs text-green-400/70 font-mono">{scenario.userB.op}</p>
                    </div>
                  </div>

                  {/* Step visualization */}
                  <div className="p-5 rounded-xl border border-white/10 bg-quest-surface/20">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-quest-text/40 font-medium">
                        Step {otStep + 1} of {scenario.steps.length}
                      </span>
                      <span className="text-xs text-quest-primary font-medium">{step.desc}</span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-1 rounded-full bg-quest-surface/50 mb-4">
                      <motion.div
                        animate={{ width: `${((otStep + 1) / scenario.steps.length) * 100}%` }}
                        className="h-full rounded-full bg-quest-primary"
                      />
                    </div>

                    {/* Document state(s) */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={otStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {step.doc && (
                          <div className="text-center">
                            <span className="text-xs text-quest-text/40 block mb-1">Document</span>
                            <div className="inline-block px-4 py-2 rounded-lg bg-black/30 font-mono text-lg tracking-widest">
                              {step.doc.split('').map((ch, i) => (
                                <span key={i} className="text-white">{ch}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {step.docA && step.docB && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <span className="text-xs text-blue-400/60 block mb-1">{scenario.userA.label}'s View</span>
                              <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 font-mono text-lg tracking-widest">
                                {step.docA.split('').map((ch, i) => {
                                  const inOriginal = scenario.initial.includes(ch) || i < scenario.initial.length
                                  return (
                                    <span key={i} className={inOriginal ? 'text-white' : 'text-blue-400 font-bold'}>
                                      {ch}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                            <div className="text-center">
                              <span className="text-xs text-green-400/60 block mb-1">{scenario.userB.label}'s View</span>
                              <div className="inline-block px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 font-mono text-lg tracking-widest">
                                {step.docB.split('').map((ch, i) => (
                                  <span key={i} className={step.docA === step.docB ? 'text-yellow-400 font-bold' : 'text-white'}>
                                    {ch}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Convergence indicator */}
                    {otStep === scenario.steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center"
                      >
                        <CheckCircle size={16} className="text-green-400 inline mr-2" />
                        <span className="text-sm text-green-400 font-medium">
                          Converged! Both users see: "{scenario.result}"
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setOtStep(prev => Math.max(0, prev - 1))}
                      disabled={otStep === 0}
                      className="px-4 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => { setOtStep(0); setOtPlaying(true) }}
                      className="px-6 py-2 rounded-lg bg-quest-primary/20 text-quest-primary border border-quest-primary/30 text-sm font-medium hover:bg-quest-primary/30 transition-colors"
                    >
                      {otPlaying ? 'Playing...' : 'Play All'}
                    </button>
                    <button
                      onClick={() => setOtStep(prev => Math.min(scenario.steps.length - 1, prev + 1))}
                      disabled={otStep === scenario.steps.length - 1}
                      className="px-4 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )
            })()}
          </div>

          <DeepDive id="ot-math" title="The Math Behind OT: Transform Functions" onRead={markDeepDiveRead}>
            <div className="text-sm text-quest-text/80 space-y-3">
              <p>
                At its core, OT defines a <strong>transform function</strong> T(op1, op2) that takes two concurrent
                operations and returns transformed versions op1' and op2' such that:
              </p>
              <div className="p-3 rounded-lg bg-black/20 font-mono text-xs text-center">
                <p className="text-yellow-400">apply(apply(doc, op1), T(op2, op1)) = apply(apply(doc, op2), T(op1, op2))</p>
              </div>
              <p>
                This is the <strong className="text-yellow-400">Transformation Property 1 (TP1)</strong>.
                It guarantees convergence for any pair of concurrent operations.
              </p>
              <p>
                For example, if Alice inserts at position 5 and Bob inserts at position 3,
                Alice's operation must be shifted right by 1 when applied after Bob's (since Bob's insert pushed everything after position 3 to the right).
              </p>
              <p>
                Google Docs uses a variant called <strong>Jupiter protocol</strong> which simplifies OT
                by maintaining a client-server architecture where the server acts as a single point of
                serialization.
              </p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ── OT vs CRDT Tab ── */}
      {activeTab === 'crdt' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FileText size={20} className="text-quest-primary" />
              OT vs CRDT Comparison
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Two competing approaches to real-time collaboration. Hover over rows to compare.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 pr-4 text-quest-text/50 font-medium">Feature</th>
                    <th className="text-left py-3 pr-4 text-blue-400 font-medium">
                      {T('Operational Transformation')}
                    </th>
                    <th className="text-left py-3 pr-4 text-green-400 font-medium">
                      {T('CRDT')}
                    </th>
                    <th className="text-center py-3 text-quest-text/50 font-medium w-16">Edge</th>
                  </tr>
                </thead>
                <tbody>
                  {crdtComparison.map((row, idx) => (
                    <motion.tr
                      key={row.feature}
                      onMouseEnter={() => setCrdtHighlight(idx)}
                      onMouseLeave={() => setCrdtHighlight(null)}
                      className={`border-b border-white/5 transition-colors ${
                        crdtHighlight === idx ? 'bg-white/5' : ''
                      }`}
                    >
                      <td className="py-3 pr-4 font-medium text-quest-text/80">{row.feature}</td>
                      <td className={`py-3 pr-4 ${row.winner === 'ot' ? 'text-blue-400 font-medium' : 'text-quest-text/60'}`}>
                        {row.ot}
                      </td>
                      <td className={`py-3 pr-4 ${row.winner === 'crdt' ? 'text-green-400 font-medium' : 'text-quest-text/60'}`}>
                        {row.crdt}
                      </td>
                      <td className="py-3 text-center">
                        {row.winner === 'ot' && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">OT</span>}
                        {row.winner === 'crdt' && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">CRDT</span>}
                        {row.winner === 'tie' && <span className="text-xs px-2 py-0.5 rounded-full bg-quest-surface/50 text-quest-text/40">Tie</span>}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Visual comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                <h3 className="text-sm font-bold text-blue-400 mb-3">OT Architecture</h3>
                <div className="space-y-2 text-xs font-mono text-blue-400/70">
                  <div className="p-2 rounded bg-blue-500/10 text-center">Client A</div>
                  <div className="text-center text-blue-400/30">|  (operations)  |</div>
                  <div className="p-2 rounded bg-blue-500/20 text-center font-bold border border-blue-500/30">
                    Central OT Server
                  </div>
                  <div className="text-center text-blue-400/30">|  (transformed)  |</div>
                  <div className="p-2 rounded bg-blue-500/10 text-center">Client B</div>
                </div>
                <p className="text-xs text-quest-text/50 mt-3">
                  Server serializes all operations and broadcasts transformed versions.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                <h3 className="text-sm font-bold text-green-400 mb-3">CRDT Architecture</h3>
                <div className="space-y-2 text-xs font-mono text-green-400/70">
                  <div className="flex justify-between gap-2">
                    <div className="flex-1 p-2 rounded bg-green-500/10 text-center">Peer A</div>
                    <div className="flex-1 p-2 rounded bg-green-500/10 text-center">Peer B</div>
                  </div>
                  <div className="text-center text-green-400/30">{'<-- merge operations -->'}</div>
                  <div className="flex justify-between gap-2">
                    <div className="flex-1 p-2 rounded bg-green-500/10 text-center">Peer C</div>
                    <div className="flex-1 p-2 rounded bg-green-500/10 text-center">Peer D</div>
                  </div>
                </div>
                <p className="text-xs text-quest-text/50 mt-3">
                  No central server needed. Peers merge directly using CRDT math.
                </p>
              </div>
            </div>
          </div>

          <DeepDive id="crdt-types" title="Types of CRDTs for Text Editing" onRead={markDeepDiveRead}>
            <div className="text-sm text-quest-text/80 space-y-3">
              <p>
                The most common CRDTs for collaborative text editing are:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong className="text-green-400">RGA (Replicated Growable Array)</strong> -- Assigns unique IDs to each character.
                  Inserts are placed relative to their predecessor's ID, not position. Used by many CRDT libraries.
                </li>
                <li>
                  <strong className="text-green-400">YATA (Yet Another Transformation Approach)</strong> -- Used by Yjs.
                  Optimized for performance with a linked-list structure and efficient garbage collection.
                </li>
                <li>
                  <strong className="text-green-400">Logoot / LSEQ</strong> -- Uses fractional positions between characters
                  (e.g., position 0.5 is between 0 and 1). No tombstones needed but positions can grow unbounded.
                </li>
              </ul>
              <p>
                The key insight: CRDTs trade memory for simplicity. They never need a central coordinator,
                making them ideal for offline-first and peer-to-peer applications.
              </p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ── Architecture Tab ── */}
      {activeTab === 'arch' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Wifi size={20} className="text-quest-primary" />
              Google Docs Architecture
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Click on each layer to explore its components and role in the real-time collaboration pipeline.
            </p>

            {/* Architecture pipeline */}
            <div className="space-y-3">
              {architectureLayers.map((layer, idx) => {
                const IconComp = getIconComponent(layer.icon)
                const colors = colorMap[layer.color]
                const isHighlighted = highlightedLayer === layer.id

                return (
                  <motion.div key={layer.id} layout>
                    {/* Connector arrow */}
                    {idx > 0 && (
                      <div className="flex justify-center -my-1">
                        <motion.div
                          animate={{
                            opacity: highlightedLayer ? (isHighlighted || highlightedLayer === architectureLayers[idx - 1].id ? 1 : 0.2) : 0.4,
                          }}
                          className="w-0.5 h-6 bg-gradient-to-b from-white/20 to-white/10 relative"
                        >
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20" />
                        </motion.div>
                      </div>
                    )}

                    <motion.button
                      onClick={() => setHighlightedLayer(isHighlighted ? null : layer.id)}
                      animate={{
                        opacity: highlightedLayer ? (isHighlighted ? 1 : 0.4) : 1,
                        scale: isHighlighted ? 1.02 : 1,
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isHighlighted
                          ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}`
                          : 'bg-quest-surface/20 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${colors.bg}`}>
                          <IconComp size={18} className={colors.text} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-sm ${isHighlighted ? colors.text : 'text-quest-text'}`}>
                              {layer.label}
                            </span>
                            {isHighlighted && (
                              <ChevronUp size={14} className={colors.text} />
                            )}
                            {!isHighlighted && (
                              <ChevronDown size={14} className="text-quest-text/30" />
                            )}
                          </div>
                          <p className="text-xs text-quest-text/50 mt-0.5">{layer.desc}</p>
                        </div>
                      </div>

                      {/* Expanded details */}
                      <AnimatePresence>
                        {isHighlighted && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-3 pt-3 border-t border-white/10"
                          >
                            <div className="grid grid-cols-2 gap-2">
                              {layer.items.map((item, i) => (
                                <motion.div
                                  key={item}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className={`px-3 py-2 rounded-lg ${colors.bg} text-xs font-medium ${colors.text}`}
                                >
                                  {item}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                )
              })}
            </div>

            {/* Data flow summary */}
            <div className="mt-6 p-4 rounded-lg bg-quest-surface/30 border border-white/10">
              <h3 className="text-sm font-semibold mb-2 text-quest-text/70">Request Flow: User Types a Character</h3>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {[
                  { label: 'Keystroke', color: 'text-blue-400' },
                  { label: 'Local Apply', color: 'text-blue-400' },
                  { label: 'WebSocket Send', color: 'text-purple-400' },
                  { label: 'OT Transform', color: 'text-yellow-400' },
                  { label: 'Broadcast', color: 'text-purple-400' },
                  { label: 'Remote Apply', color: 'text-blue-400' },
                  { label: 'Persist', color: 'text-green-400' },
                  { label: 'Update Cursors', color: 'text-pink-400' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="text-quest-text/20">-{'>'}</span>}
                    <span className={`px-2 py-1 rounded ${step.color} bg-quest-surface/50 font-medium`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DeepDive id="scaling-docs" title="Scaling Google Docs to Millions of Users" onRead={markDeepDiveRead}>
            <div className="text-sm text-quest-text/80 space-y-3">
              <p>Key scaling strategies:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong className="text-yellow-400">Document Partitioning</strong> -- Each document is handled by
                  a specific OT server instance. Consistent hashing maps document IDs to server nodes.
                </li>
                <li>
                  <strong className="text-purple-400">Connection Pooling</strong> -- WebSocket connections are managed by
                  a gateway layer that routes to the correct OT server.
                </li>
                <li>
                  <strong className="text-green-400">Operation Compression</strong> -- Multiple rapid keystrokes are batched
                  into a single operation before sending to reduce network overhead.
                </li>
                <li>
                  <strong className="text-blue-400">Snapshot Caching</strong> -- Periodic document snapshots avoid replaying
                  the entire operation log for new clients joining a session.
                </li>
                <li>
                  <strong className="text-pink-400">Presence Fan-out</strong> -- Cursor updates use a pub/sub system
                  (like Redis Pub/Sub) to efficiently broadcast to all participants.
                </li>
              </ul>
            </div>
          </DeepDive>

          <DeepDive id="conflict-edge" title="Edge Cases in Conflict Resolution" onRead={markDeepDiveRead}>
            <div className="text-sm text-quest-text/80 space-y-3">
              <p>Real-world conflict scenarios that Google Docs must handle:</p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                  <p className="font-medium text-red-400 text-xs mb-1">Simultaneous same-word edit</p>
                  <p className="text-xs">
                    Alice changes "cat" to "dog" while Bob changes "cat" to "bird". OT must pick a winner
                    (typically by user priority or timestamp) while preserving both users' intentions.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                  <p className="font-medium text-yellow-400 text-xs mb-1">Delete vs Edit conflict</p>
                  <p className="text-xs">
                    Alice deletes a paragraph while Bob is editing a sentence within it. The server
                    must decide: keep Bob's edit in a new context, or honor Alice's delete.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p className="font-medium text-blue-400 text-xs mb-1">Network partition recovery</p>
                  <p className="text-xs">
                    A user goes offline for 10 minutes and makes 50 edits. When reconnecting, the server
                    must transform all 50 operations against everything that happened while they were away.
                  </p>
                </div>
              </div>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ── Final Quiz Tab ── */}
      {activeTab === 'quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Crown size={20} className="text-yellow-400" />
              Final Knowledge Check
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Answer at least 5 out of 7 correctly to complete the final level and become a Scale Quest Master.
            </p>

            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => {
                const selected = quizAnswers[q.id]
                const isCorrect = selected === q.correct
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIdx * 0.05 }}
                    className="p-4 rounded-xl border border-white/10 bg-quest-surface/20"
                  >
                    <p className="font-medium mb-3 text-sm">
                      <span className="text-yellow-400 mr-2">{qIdx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        let style = 'bg-quest-surface/30 border-white/10 text-quest-text/70 hover:border-white/20'
                        if (selected === oIdx && !showResults) {
                          style = 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                        }
                        if (showResults) {
                          if (oIdx === q.correct) {
                            style = 'bg-green-500/20 border-green-500/40 text-green-400'
                          } else if (selected === oIdx && !isCorrect) {
                            style = 'bg-red-500/20 border-red-500/40 text-red-400'
                          } else {
                            style = 'bg-quest-surface/20 border-white/5 text-quest-text/30'
                          }
                        }
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleAnswer(q.id, oIdx)}
                            disabled={showResults}
                            className={`px-4 py-2.5 rounded-lg border text-sm text-left transition-all ${style} disabled:cursor-not-allowed`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    <AnimatePresence>
                      {showResults && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3"
                        >
                          <p className={`text-xs p-2 rounded-lg ${
                            isCorrect
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}>
                            {isCorrect ? 'Correct! ' : 'Not quite. '}
                            {q.explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Submit / Results */}
            <div className="mt-6 text-center">
              {!showResults ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className="px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/20"
                >
                  Submit Final Answers
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-block p-4 rounded-xl border ${
                    score >= 5
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <p className={`text-lg font-bold ${score >= 5 ? 'text-green-400' : 'text-red-400'}`}>
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="text-sm text-quest-text/60 mt-1">
                    {score >= 5
                      ? 'You did it! The final level is complete!'
                      : 'You need at least 5 correct. Review the material and try again.'}
                  </p>
                  {score < 5 && (
                    <button
                      onClick={() => { setQuizAnswers({}); setShowResults(false) }}
                      className="mt-3 px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
                    >
                      Retry Quiz
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>

          {/* ── CELEBRATION SECTION ── */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                className="relative overflow-hidden"
              >
                {/* Confetti particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: -20,
                        rotate: 0,
                        opacity: 1,
                      }}
                      animate={{
                        y: '120%',
                        rotate: Math.random() * 720 - 360,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 1.5,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 3,
                      }}
                      className="absolute w-2 h-2 rounded-sm"
                      style={{
                        backgroundColor: ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899'][i % 6],
                        left: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}
                </div>

                <div className="quest-card p-8 text-center border-2 border-yellow-500/30 bg-gradient-to-b from-yellow-500/5 to-purple-500/5 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Crown size={56} className="text-yellow-400 mx-auto mb-4" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-3"
                  >
                    Congratulations, Scale Quest Master!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-quest-text/70 max-w-lg mx-auto mb-6"
                  >
                    You have completed all 60 levels of Scale Quest. From basic data structures
                    to designing Google Docs, you now possess a comprehensive understanding of
                    system design principles.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
                  >
                    {[
                      { label: 'Levels Completed', value: '60', color: 'text-yellow-400' },
                      { label: 'Concepts Mastered', value: '200+', color: 'text-blue-400' },
                      { label: 'Systems Designed', value: '15+', color: 'text-green-400' },
                      { label: 'Achievement', value: 'Master', color: 'text-purple-400' },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.15 }}
                        className="p-3 rounded-xl bg-quest-surface/30 border border-white/10"
                      >
                        <p className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-quest-text/50 mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="p-4 rounded-xl bg-quest-surface/20 border border-white/10 text-sm text-quest-text/60 max-w-md mx-auto"
                  >
                    <p className="font-semibold text-quest-text/80 mb-2">Your Journey</p>
                    <div className="space-y-1 text-xs text-left">
                      <p>Levels 1-10: Foundations -- OOP, data structures, design patterns</p>
                      <p>Levels 11-20: Databases -- SQL, NoSQL, indexing, replication</p>
                      <p>Levels 21-30: Architecture -- microservices, APIs, caching</p>
                      <p>Levels 31-40: Distributed Systems -- consensus, sharding, queues</p>
                      <p>Levels 41-50: Advanced -- load balancing, CDNs, search engines</p>
                      <p>Levels 51-60: HLD Case Studies -- from URL shorteners to Google Docs</p>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="mt-6 text-sm text-quest-text/40 italic"
                  >
                    "The expert in anything was once a beginner." -- Keep building, keep scaling.
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

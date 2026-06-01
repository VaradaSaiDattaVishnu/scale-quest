import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Terminal, RotateCcw, ArrowRight, Link, Undo2 } from 'lucide-react'

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

/* ── Support ticket handlers for Chain of Responsibility ── */
const supportHandlers = [
  { id: 'l1', label: 'L1 Support', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30', canHandle: ['password-reset', 'account-info'] },
  { id: 'l2', label: 'L2 Support', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', canHandle: ['billing-dispute', 'technical-bug'] },
  { id: 'l3', label: 'L3 Engineering', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/30', canHandle: ['data-corruption', 'performance-issue'] },
  { id: 'mgr', label: 'Manager', color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/30', canHandle: ['legal-complaint', 'vip-escalation'] },
]

const ticketTypes = [
  { id: 'password-reset', label: 'Password Reset', difficulty: 'easy' },
  { id: 'billing-dispute', label: 'Billing Dispute', difficulty: 'medium' },
  { id: 'data-corruption', label: 'Data Corruption', difficulty: 'hard' },
  { id: 'vip-escalation', label: 'VIP Escalation', difficulty: 'critical' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the primary advantage of the Command pattern over direct method calls?',
    options: [
      { id: 'a', text: 'Commands execute faster than direct calls', correct: false },
      { id: 'b', text: 'Commands can be stored, queued, undone, and replayed', correct: true },
      { id: 'c', text: 'Commands use less memory than direct calls', correct: false },
      { id: 'd', text: 'Commands avoid the need for a receiver object', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'How does the Command pattern typically implement undo functionality?',
    options: [
      { id: 'a', text: 'By reverting to a full system snapshot', correct: false },
      { id: 'b', text: 'By re-executing all commands from the beginning', correct: false },
      { id: 'c', text: 'Each command object stores the state needed to reverse its execute() method', correct: true },
      { id: 'd', text: 'By logging every database transaction', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'How does Chain of Responsibility differ from a long if-else / switch block?',
    options: [
      { id: 'a', text: 'Chain of Responsibility is slower but more readable', correct: false },
      { id: 'b', text: 'Each handler is decoupled, can be reordered/added/removed without changing others', correct: true },
      { id: 'c', text: 'Chain of Responsibility requires fewer classes', correct: false },
      { id: 'd', text: 'There is no real difference; they produce the same result', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What is the role of the Invoker in the Command pattern?',
    options: [
      { id: 'a', text: 'It performs the actual work (business logic)', correct: false },
      { id: 'b', text: 'It creates the command objects', correct: false },
      { id: 'c', text: 'It stores and triggers command execution without knowing the details', correct: true },
      { id: 'd', text: 'It validates whether a command is allowed', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'Which is NOT a benefit of using a command queue?',
    options: [
      { id: 'a', text: 'Batch processing of operations', correct: false },
      { id: 'b', text: 'Transaction-like rollback on failure', correct: false },
      { id: 'c', text: 'Guaranteed zero-latency execution', correct: true },
      { id: 'd', text: 'Deferred and scheduled execution of operations', correct: false },
    ],
  },
]

/* ── Main Component ── */

export default function Level40({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* ── Text editor state (Command pattern sim) ── */
  const [editorText, setEditorText] = useState('')
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])
  const [commandLog, setCommandLog] = useState([])

  /* ── Chain of Responsibility state ── */
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [chainStep, setChainStep] = useState(-1)
  const [chainResolved, setChainResolved] = useState(false)
  const [chainRunning, setChainRunning] = useState(false)

  /* ── Command queue state ── */
  const [commandQueue, setCommandQueue] = useState([])
  const [queueExecuting, setQueueExecuting] = useState(false)
  const [queueResults, setQueueResults] = useState([])

  /* ── Macro recording state ── */
  const [macroRecording, setMacroRecording] = useState(false)
  const [macroCommands, setMacroCommands] = useState([])
  const [macroReplaying, setMacroReplaying] = useState(false)
  const [macroReplayIndex, setMacroReplayIndex] = useState(-1)

  /* ── Quiz state ── */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ═══════════════════ Text Editor Commands ═══════════════════ */

  const executeCommand = (type, payload) => {
    const command = { type, payload, timestamp: Date.now() }

    if (type === 'insert') {
      const prev = editorText
      command.prev = prev
      setEditorText(prev + payload)
      command.description = `Insert "${payload}"`
    } else if (type === 'delete') {
      const prev = editorText
      command.prev = prev
      const deleted = prev.slice(-1)
      command.deleted = deleted
      setEditorText(prev.slice(0, -1))
      command.description = `Delete "${deleted}"`
    } else if (type === 'clear') {
      command.prev = editorText
      setEditorText('')
      command.description = 'Clear all'
    } else if (type === 'uppercase') {
      command.prev = editorText
      setEditorText(editorText.toUpperCase())
      command.description = 'Uppercase all'
    } else if (type === 'lowercase') {
      command.prev = editorText
      setEditorText(editorText.toLowerCase())
      command.description = 'Lowercase all'
    }

    setUndoStack(prev => [...prev, command])
    setRedoStack([])
    setCommandLog(prev => [...prev, { ...command, action: 'execute' }])

    if (macroRecording) {
      setMacroCommands(prev => [...prev, { type, payload }])
    }
  }

  const undoCommand = () => {
    if (undoStack.length === 0) return
    const command = undoStack[undoStack.length - 1]
    setUndoStack(prev => prev.slice(0, -1))
    setRedoStack(prev => [...prev, command])
    setEditorText(command.prev)
    setCommandLog(prev => [...prev, { ...command, action: 'undo', timestamp: Date.now() }])
  }

  const redoCommand = () => {
    if (redoStack.length === 0) return
    const command = redoStack[redoStack.length - 1]
    setRedoStack(prev => prev.slice(0, -1))

    if (command.type === 'insert') {
      setEditorText(command.prev + command.payload)
    } else if (command.type === 'delete') {
      setEditorText(command.prev.slice(0, -1))
    } else if (command.type === 'clear') {
      setEditorText('')
    } else if (command.type === 'uppercase') {
      setEditorText(command.prev.toUpperCase())
    } else if (command.type === 'lowercase') {
      setEditorText(command.prev.toLowerCase())
    }

    setUndoStack(prev => [...prev, command])
    setCommandLog(prev => [...prev, { ...command, action: 'redo', timestamp: Date.now() }])
  }

  /* ═══════════════════ Chain of Responsibility ═══════════════════ */

  const runChain = (ticket) => {
    setSelectedTicket(ticket)
    setChainStep(-1)
    setChainResolved(false)
    setChainRunning(true)

    let step = 0
    const interval = setInterval(() => {
      setChainStep(step)
      const handler = supportHandlers[step]
      if (handler.canHandle.includes(ticket.id)) {
        setChainResolved(true)
        setChainRunning(false)
        clearInterval(interval)
      } else if (step >= supportHandlers.length - 1) {
        setChainResolved(true)
        setChainRunning(false)
        clearInterval(interval)
      } else {
        step++
      }
    }, 1000)
  }

  /* ═══════════════════ Command Queue ═══════════════════ */

  const presetQueueCommands = [
    { type: 'create-user', label: 'Create User', icon: '👤' },
    { type: 'send-email', label: 'Send Welcome Email', icon: '📧' },
    { type: 'setup-billing', label: 'Setup Billing', icon: '💳' },
    { type: 'assign-role', label: 'Assign Role', icon: '🔑' },
    { type: 'log-audit', label: 'Log Audit Event', icon: '📋' },
  ]

  const addToQueue = (cmd) => {
    setCommandQueue(prev => [...prev, { ...cmd, id: Date.now(), status: 'pending' }])
  }

  const executeQueue = () => {
    if (commandQueue.length === 0 || queueExecuting) return
    setQueueExecuting(true)
    setQueueResults([])

    let idx = 0
    const interval = setInterval(() => {
      if (idx >= commandQueue.length) {
        setQueueExecuting(false)
        clearInterval(interval)
        return
      }
      setCommandQueue(prev => prev.map((c, i) =>
        i === idx ? { ...c, status: 'done' } : c
      ))
      setQueueResults(prev => [...prev, { ...commandQueue[idx], status: 'done' }])
      idx++
    }, 700)
  }

  const undoQueue = () => {
    if (queueResults.length === 0) return
    const reversed = [...queueResults].reverse()
    setQueueResults([])
    setCommandQueue([])
    setQueueExecuting(false)

    let idx = 0
    const interval = setInterval(() => {
      if (idx >= reversed.length) {
        clearInterval(interval)
        return
      }
      setQueueResults(prev => [...prev, { ...reversed[idx], status: 'undone' }])
      idx++
    }, 500)
  }

  const clearQueue = () => {
    setCommandQueue([])
    setQueueResults([])
    setQueueExecuting(false)
  }

  /* ═══════════════════ Macro Recording ═══════════════════ */

  const startMacroRecord = () => {
    setMacroRecording(true)
    setMacroCommands([])
  }

  const stopMacroRecord = () => {
    setMacroRecording(false)
  }

  const replayMacro = () => {
    if (macroCommands.length === 0 || macroReplaying) return
    setMacroReplaying(true)
    setMacroReplayIndex(-1)

    let idx = 0
    const interval = setInterval(() => {
      if (idx >= macroCommands.length) {
        setMacroReplaying(false)
        setMacroReplayIndex(-1)
        clearInterval(interval)
        return
      }
      setMacroReplayIndex(idx)
      const cmd = macroCommands[idx]
      executeCommand(cmd.type, cmd.payload)
      idx++
    }, 600)
  }

  /* ═══════════════════ Quiz ═══════════════════ */

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ═══════════════════ Section labels ═══════════════════ */
  const sections = ['Story', 'Text Editor', 'Chain of Responsibility', 'Command Queue', 'Quiz']

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-bold px-2 py-1 rounded bg-quest-primary/20 text-quest-primary">
            LEVEL 40
          </span>
          {isCompleted && (
            <span className="text-xs font-bold px-2 py-1 rounded bg-quest-success/20 text-quest-success flex items-center gap-1">
              <CheckCircle size={12} /> COMPLETED
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-1">Command & Conquer</h1>
        <p className="text-quest-muted">Command Pattern & Chain of Responsibility</p>
      </div>

      {/* Section navigation */}
      <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
        {sections.map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${currentSection === i
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: STORY ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-quest-primary/20">
              <p className="text-lg text-quest-muted leading-relaxed italic">
                "Users want to undo their actions. You need to record what they did.
                How do you model actions as objects that can be stored, replayed, and reversed?"
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Terminal className="text-quest-primary" />
              The Command Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              The{' '}
              <Term
                word="Command Pattern"
                definition="A behavioral design pattern that turns a request into a stand-alone object containing all information about the request. This lets you parameterize methods, delay or queue execution, and support undoable operations."
                onLearn={learnTerm}
              />{' '}
              encapsulates a request as an object. Instead of calling{' '}
              <code className="text-xs font-mono bg-quest-surface px-1 rounded">editor.bold()</code> directly,
              you create a <code className="text-xs font-mono bg-quest-surface px-1 rounded">BoldCommand</code> object
              and hand it to an{' '}
              <Term
                word="Invoker"
                definition="The object that knows how to execute a command but does not know the details of what the command does. It stores commands, triggers execution, and manages undo/redo stacks. Think of it as the button or menu item in a GUI."
                onLearn={learnTerm}
              />
              . The invoker does not know or care what the command does — it just calls <code className="text-xs font-mono bg-quest-surface px-1 rounded">execute()</code>.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
                <h4 className="text-sm font-semibold mb-3 text-red-400">Without Command Pattern</h4>
                <div className="space-y-2 font-mono text-xs text-quest-muted">
                  <p>button.onClick = () =&gt; editor.bold()</p>
                  <p>// No undo possible</p>
                  <p>// No history</p>
                  <p>// No macro recording</p>
                  <p>// Tight coupling</p>
                </div>
              </div>
              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <h4 className="text-sm font-semibold mb-3 text-green-400">With Command Pattern</h4>
                <div className="space-y-2 font-mono text-xs text-quest-muted">
                  <p>const cmd = new BoldCommand(editor)</p>
                  <p>invoker.execute(cmd)</p>
                  <p>// cmd stored in history</p>
                  <p>// invoker.undo() reverses it</p>
                  <p>// macro.record(cmd) captures it</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Link className="text-quest-secondary" />
              Chain of Responsibility
            </h2>

            <p className="text-quest-muted mb-4">
              The{' '}
              <Term
                word="Chain of Responsibility"
                definition="A behavioral design pattern that lets you pass requests along a chain of handlers. Each handler decides either to process the request or to pass it to the next handler in the chain. Decouples sender from receiver."
                onLearn={learnTerm}
              />{' '}
              pattern passes a request along a chain of handlers. Each handler either processes it or passes
              it to the next one. Think of a{' '}
              <Term
                word="Request Pipeline"
                definition="A sequence of processing stages that a request passes through. Each stage can inspect, modify, handle, or forward the request. Common in middleware stacks (Express.js), servlet filters, and support ticket escalation systems."
                onLearn={learnTerm}
              />
              : middleware in Express.js, support ticket escalation, or approval workflows.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-4">Chain vs If-Else</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-2">Giant If-Else</p>
                  <div className="font-mono text-[11px] text-quest-muted space-y-1">
                    <p>if (ticket.type === 'password')</p>
                    <p className="pl-3">handleL1(ticket)</p>
                    <p>else if (ticket.type === 'billing')</p>
                    <p className="pl-3">handleL2(ticket)</p>
                    <p>else if (ticket.type === 'data')</p>
                    <p className="pl-3">handleL3(ticket)</p>
                    <p className="text-red-400/60">// Adding a new handler means editing this block</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-400 mb-2">Chain of Responsibility</p>
                  <div className="font-mono text-[11px] text-quest-muted space-y-1">
                    <p>l1.setNext(l2)</p>
                    <p>l2.setNext(l3)</p>
                    <p>l3.setNext(manager)</p>
                    <p>l1.handle(ticket)</p>
                    <p className="text-green-400/60">// Each handler is independent and pluggable</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="command-history" title="Command Pattern in the Real World" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Text Editors:</strong> Every keystroke in VS Code, Google Docs,
                  or Photoshop is a command object. This enables undo/redo stacks that can go back hundreds of steps.
                  Each command stores the minimal state needed to reverse itself.
                </p>
                <p>
                  <strong className="text-quest-text">Database Transactions:</strong> SQL operations are essentially
                  commands with undo (ROLLBACK). Write-ahead logs record commands before execution so they can be
                  replayed after a crash.
                </p>
                <p>
                  <strong className="text-quest-text">Game Development:</strong> Player actions are commands. This
                  enables replay systems, network synchronization in multiplayer games, and AI that "thinks" by
                  evaluating possible command sequences.
                </p>
                <p>
                  <strong className="text-quest-text">
                    <Term
                      word="Undo/Redo"
                      definition="A mechanism where each action stores enough state to reverse itself. Undo pops the last command from the history stack and calls its reverse method. Redo re-applies it. The redo stack is cleared whenever a new command is executed."
                      onLearn={learnTerm}
                    />
                    :</strong> The undo stack holds executed commands. Undo pops the top command and reverses it,
                  pushing it onto the redo stack. A new command clears the redo stack (you cannot redo after doing
                  something new).
                </p>
              </div>
            </DeepDive>

            <DeepDive id="chain-middleware" title="Chain of Responsibility as Middleware" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Express.js Middleware:</strong> Each middleware function is a
                  handler in the chain. It can process the request, modify it, respond, or call{' '}
                  <code className="text-xs font-mono">next()</code> to pass to the next handler. Auth middleware,
                  logging middleware, rate-limiting middleware — all handlers in a chain.
                </p>
                <p>
                  <strong className="text-quest-text">Java Servlet Filters:</strong> The original enterprise example.
                  Filters form a chain that every HTTP request passes through before reaching the servlet.
                </p>
                <p>
                  <strong className="text-quest-text">DOM Event Bubbling:</strong> When you click a button, the event
                  travels from the button up through parent elements. Each element can handle or ignore the event — a
                  chain of responsibility built into the browser.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Try the Text Editor
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: TEXT EDITOR ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Terminal className="text-quest-primary" />
              Command-Based Text Editor
            </h2>
            <p className="text-quest-muted mb-6">
              Every action is a{' '}
              <Term
                word="Command Object"
                definition="An object that encapsulates all the information needed to perform an action: the method to call, the method's arguments, and the state needed to undo the action. It decouples the object that invokes the operation from the one that knows how to perform it."
                onLearn={learnTerm}
              />
              . Type, transform, undo, redo — watch the stacks update in real time.
            </p>

            {/* Editor area */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-xs text-quest-muted ml-2 font-mono">command-editor.txt</span>
              </div>

              {/* Text display */}
              <div className="bg-quest-surface rounded-lg p-4 min-h-[80px] mb-4 font-mono text-sm border border-white/5">
                {editorText ? (
                  <span>{editorText}</span>
                ) : (
                  <span className="text-quest-muted/50 italic">Type something using the buttons below...</span>
                )}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-4 bg-quest-primary ml-0.5 align-middle"
                />
              </div>

              {/* Input buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <p className="w-full text-xs text-quest-muted mb-1">Insert text:</p>
                {['Hello', ' ', 'World', '!', 'Foo', 'Bar'].map((text) => (
                  <button
                    key={text}
                    onClick={() => executeCommand('insert', text)}
                    className="px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 text-xs font-mono hover:border-quest-primary/40 transition-colors"
                  >
                    {text === ' ' ? '(space)' : `"${text}"`}
                  </button>
                ))}
              </div>

              {/* Transform buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <p className="w-full text-xs text-quest-muted mb-1">Transform:</p>
                <button
                  onClick={() => executeCommand('uppercase')}
                  disabled={!editorText}
                  className="px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 text-xs hover:border-yellow-500/40 transition-colors disabled:opacity-30"
                >
                  UPPERCASE
                </button>
                <button
                  onClick={() => executeCommand('lowercase')}
                  disabled={!editorText}
                  className="px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 text-xs hover:border-blue-500/40 transition-colors disabled:opacity-30"
                >
                  lowercase
                </button>
                <button
                  onClick={() => executeCommand('delete')}
                  disabled={!editorText}
                  className="px-3 py-1.5 rounded-lg bg-quest-surface border border-red-500/20 text-xs text-red-400 hover:border-red-500/40 transition-colors disabled:opacity-30"
                >
                  Delete Last
                </button>
                <button
                  onClick={() => executeCommand('clear')}
                  disabled={!editorText}
                  className="px-3 py-1.5 rounded-lg bg-quest-surface border border-red-500/20 text-xs text-red-400 hover:border-red-500/40 transition-colors disabled:opacity-30"
                >
                  Clear All
                </button>
              </div>

              {/* Undo / Redo */}
              <div className="flex gap-2">
                <button
                  onClick={undoCommand}
                  disabled={undoStack.length === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm hover:border-orange-500/40 transition-colors disabled:opacity-30"
                >
                  <Undo2 size={14} />
                  Undo ({undoStack.length})
                </button>
                <button
                  onClick={redoCommand}
                  disabled={redoStack.length === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm hover:border-green-500/40 transition-colors disabled:opacity-30"
                >
                  <RotateCcw size={14} className="scale-x-[-1]" />
                  Redo ({redoStack.length})
                </button>
              </div>
            </div>

            {/* Stacks visualization */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Undo stack */}
              <div className="bg-quest-bg rounded-xl p-5 border border-orange-500/20">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Undo2 size={14} className="text-orange-400" />
                  <span className="text-orange-400">Undo Stack</span>
                  <span className="text-xs text-quest-muted ml-auto">{undoStack.length} commands</span>
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {undoStack.length === 0 ? (
                    <p className="text-xs text-quest-muted/50 italic">Empty — perform an action</p>
                  ) : (
                    [...undoStack].reverse().map((cmd, i) => (
                      <motion.div
                        key={cmd.timestamp + '-' + i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs px-3 py-1.5 rounded bg-quest-surface border border-white/5 font-mono
                          ${i === 0 ? 'border-orange-500/30 text-orange-300' : 'text-quest-muted'}`}
                      >
                        {i === 0 && <span className="text-orange-400 mr-1">TOP</span>}
                        {cmd.description}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>

              {/* Redo stack */}
              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <RotateCcw size={14} className="text-green-400 scale-x-[-1]" />
                  <span className="text-green-400">Redo Stack</span>
                  <span className="text-xs text-quest-muted ml-auto">{redoStack.length} commands</span>
                </h4>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {redoStack.length === 0 ? (
                    <p className="text-xs text-quest-muted/50 italic">Empty — undo something first</p>
                  ) : (
                    [...redoStack].reverse().map((cmd, i) => (
                      <motion.div
                        key={cmd.timestamp + '-' + i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs px-3 py-1.5 rounded bg-quest-surface border border-white/5 font-mono
                          ${i === 0 ? 'border-green-500/30 text-green-300' : 'text-quest-muted'}`}
                      >
                        {i === 0 && <span className="text-green-400 mr-1">TOP</span>}
                        {cmd.description}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Command log */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Terminal size={14} className="text-quest-muted" />
                Command Log
              </h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {commandLog.length === 0 ? (
                  <p className="text-xs text-quest-muted/50 italic">No commands executed yet</p>
                ) : (
                  commandLog.map((entry, i) => (
                    <div key={i} className="text-[11px] font-mono flex items-center gap-2">
                      <span className={
                        entry.action === 'execute' ? 'text-sky-400' :
                        entry.action === 'undo' ? 'text-orange-400' :
                        'text-green-400'
                      }>
                        [{entry.action.toUpperCase()}]
                      </span>
                      <span className="text-quest-muted">{entry.description}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Macro recording */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-purple-500/20">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <span className="text-purple-400">Macro Recorder</span>
                {macroRecording && (
                  <motion.span
                    animate={{ opacity: [1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30"
                  >
                    RECORDING
                  </motion.span>
                )}
              </h4>
              <p className="text-xs text-quest-muted mb-3">
                Record a sequence of commands, then replay them all at once. This is the power of commands as objects.
              </p>

              <div className="flex gap-2 mb-4">
                {!macroRecording ? (
                  <button
                    onClick={startMacroRecord}
                    className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopMacroRecord}
                    className="px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 text-xs hover:border-white/30 transition-colors"
                  >
                    Stop Recording ({macroCommands.length} commands)
                  </button>
                )}
                <button
                  onClick={replayMacro}
                  disabled={macroCommands.length === 0 || macroRecording || macroReplaying}
                  className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-xs text-purple-400 hover:bg-purple-500/20 transition-colors disabled:opacity-30"
                >
                  {macroReplaying ? 'Replaying...' : `Replay Macro (${macroCommands.length})`}
                </button>
              </div>

              {/* Recorded commands list */}
              {macroCommands.length > 0 && (
                <div className="space-y-1">
                  {macroCommands.map((cmd, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-[11px] font-mono px-3 py-1 rounded bg-quest-surface border border-white/5
                        ${macroReplaying && macroReplayIndex === i ? 'border-purple-500/50 text-purple-300' : 'text-quest-muted'}`}
                    >
                      {i + 1}. {cmd.type}{cmd.payload ? ` "${cmd.payload}"` : ''}
                      {macroReplaying && macroReplayIndex === i && (
                        <motion.span
                          animate={{ opacity: [1, 0.3] }}
                          transition={{ duration: 0.4, repeat: Infinity }}
                          className="ml-2 text-purple-400"
                        >
                          executing...
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <DeepDive id="command-vs-strategy" title="Command vs Strategy Pattern" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Command:</strong> Encapsulates a request (what to do + how to undo).
                  Commands are stored, queued, logged, and replayed. The focus is on actions and their lifecycle.
                </p>
                <p>
                  <strong className="text-quest-text">Strategy:</strong> Encapsulates an algorithm (how to do something).
                  Strategies are interchangeable implementations of the same interface. The focus is on selecting behavior.
                </p>
                <p>
                  A command says "bold this text and here is how to un-bold it."
                  A strategy says "sort this list using quicksort instead of mergesort."
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Chain of Responsibility
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: CHAIN OF RESPONSIBILITY ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Link className="text-quest-secondary" />
              Support Ticket Escalation
            </h2>
            <p className="text-quest-muted mb-6">
              Select a support ticket and watch it escalate through the handler chain.
              Each handler checks if it can resolve the issue. If not, it passes to the next.
            </p>

            {/* Ticket selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {ticketTypes.map((ticket) => {
                const diffColors = {
                  easy: 'border-green-500/30 hover:border-green-500/50',
                  medium: 'border-yellow-500/30 hover:border-yellow-500/50',
                  hard: 'border-orange-500/30 hover:border-orange-500/50',
                  critical: 'border-red-500/30 hover:border-red-500/50',
                }
                const diffBadge = {
                  easy: 'bg-green-500/20 text-green-400',
                  medium: 'bg-yellow-500/20 text-yellow-400',
                  hard: 'bg-orange-500/20 text-orange-400',
                  critical: 'bg-red-500/20 text-red-400',
                }
                return (
                  <button
                    key={ticket.id}
                    onClick={() => !chainRunning && runChain(ticket)}
                    disabled={chainRunning}
                    className={`p-4 rounded-xl bg-quest-bg border text-left transition-all disabled:opacity-50
                      ${selectedTicket?.id === ticket.id ? 'ring-1 ring-quest-primary/40 border-quest-primary/40' : diffColors[ticket.difficulty]}`}
                  >
                    <p className="text-sm font-medium mb-2">{ticket.label}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${diffBadge[ticket.difficulty]}`}>
                      {ticket.difficulty}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Chain visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-4">Handler Chain</h4>

              <div className="space-y-3">
                {supportHandlers.map((handler, i) => {
                  const isActive = chainStep === i
                  const isPast = chainStep > i
                  const isResolver = chainResolved && chainStep === i

                  return (
                    <div key={handler.id} className="flex items-center gap-3">
                      {/* Connector line */}
                      {i > 0 && (
                        <div className="absolute -mt-6 ml-5 w-0.5 h-3 bg-white/10" />
                      )}
                      <motion.div
                        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.6, repeat: isActive && !isResolver ? Infinity : 0 }}
                        className={`flex-1 p-4 rounded-xl border transition-all ${
                          isResolver
                            ? `${handler.bg} ${handler.border} ring-1 ring-green-500/30`
                            : isActive
                              ? `${handler.bg} ${handler.border}`
                              : isPast
                                ? 'bg-quest-surface/30 border-white/5 opacity-50'
                                : 'bg-quest-surface border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${handler.bg} flex items-center justify-center text-xs font-bold ${handler.color}`}>
                              {handler.id.toUpperCase()}
                            </div>
                            <div>
                              <p className={`text-sm font-medium ${isActive ? handler.color : 'text-quest-text'}`}>
                                {handler.label}
                              </p>
                              <p className="text-[10px] text-quest-muted">
                                Handles: {handler.canHandle.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs">
                            {isResolver && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-1 text-green-400"
                              >
                                <CheckCircle size={14} />
                                Resolved!
                              </motion.span>
                            )}
                            {isActive && !isResolver && (
                              <motion.span
                                animate={{ opacity: [1, 0.3] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className={handler.color}
                              >
                                Processing...
                              </motion.span>
                            )}
                            {isPast && !isResolver && (
                              <span className="text-quest-muted flex items-center gap-1">
                                <ArrowRight size={12} />
                                Passed
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )
                })}
              </div>

              {/* Result */}
              <AnimatePresence>
                {chainResolved && selectedTicket && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl"
                  >
                    <p className="text-sm text-green-400">
                      <CheckCircle size={14} className="inline mr-2" />
                      <strong>{selectedTicket.label}</strong> resolved by{' '}
                      <strong>{supportHandlers[chainStep].label}</strong> after passing through{' '}
                      {chainStep + 1} handler{chainStep > 0 ? 's' : ''}.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DeepDive id="chain-patterns" title="When to Use Chain of Responsibility" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Use it when:</strong> You have multiple objects that might handle
                  a request, and the handler is not known in advance. The order or set of handlers should be configurable.
                </p>
                <p>
                  <strong className="text-quest-text">Middleware:</strong> Express.js middleware, React error boundaries,
                  and HTTP interceptors all use this pattern. Each layer gets a chance to handle or pass.
                </p>
                <p>
                  <strong className="text-quest-text">Avoid it when:</strong> There is only one handler, or the handler
                  is always known. The overhead of building a chain is not worth it for simple dispatch.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Command Queue
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: COMMAND QUEUE ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Terminal className="text-sky-400" />
              Command Queue Visualization
            </h2>
            <p className="text-quest-muted mb-6">
              Commands can be queued for batch execution. Add commands to the queue, execute them in
              order, or undo the entire batch. This is how transaction systems and batch processors work.
            </p>

            {/* Add commands to queue */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-3">Add Commands to Queue</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                {presetQueueCommands.map((cmd) => (
                  <button
                    key={cmd.type}
                    onClick={() => addToQueue(cmd)}
                    disabled={queueExecuting}
                    className="px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-xs hover:border-sky-500/40 transition-colors disabled:opacity-30"
                  >
                    <span className="mr-1">{cmd.icon}</span>
                    {cmd.label}
                  </button>
                ))}
              </div>

              {/* Queue display */}
              <div className="bg-quest-surface rounded-lg p-4 min-h-[60px] border border-white/5 mb-4">
                <p className="text-xs text-quest-muted mb-2">Queue ({commandQueue.length} commands):</p>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {commandQueue.map((cmd, i) => (
                      <motion.div
                        key={cmd.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-1
                          ${cmd.status === 'done'
                            ? 'bg-green-500/10 border-green-500/30 text-green-400'
                            : 'bg-quest-bg border-white/10 text-quest-muted'}`}
                      >
                        {cmd.status === 'done' && <CheckCircle size={10} />}
                        <span>{cmd.icon}</span>
                        {cmd.label}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {commandQueue.length === 0 && (
                    <span className="text-xs text-quest-muted/50 italic">No commands in queue</span>
                  )}
                </div>
              </div>

              {/* Execute / Undo / Clear */}
              <div className="flex gap-2">
                <button
                  onClick={executeQueue}
                  disabled={commandQueue.length === 0 || queueExecuting}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-sm text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-30"
                >
                  <ArrowRight size={14} />
                  Execute All
                </button>
                <button
                  onClick={undoQueue}
                  disabled={queueResults.length === 0 || queueExecuting}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30 text-sm text-orange-400 hover:bg-orange-500/20 transition-colors disabled:opacity-30"
                >
                  <Undo2 size={14} />
                  Undo All
                </button>
                <button
                  onClick={clearQueue}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm text-quest-muted hover:border-white/30 transition-colors"
                >
                  <RotateCcw size={14} />
                  Clear
                </button>
              </div>
            </div>

            {/* Results log */}
            {queueResults.length > 0 && (
              <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
                <h4 className="text-sm font-semibold mb-3">Execution Log</h4>
                <div className="space-y-1">
                  {queueResults.map((result, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-[11px] font-mono flex items-center gap-2"
                    >
                      {result.status === 'done' ? (
                        <span className="text-green-400">[EXECUTED]</span>
                      ) : (
                        <span className="text-orange-400">[UNDONE]</span>
                      )}
                      <span>{result.icon}</span>
                      <span className="text-quest-muted">{result.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture diagram */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-4">Command Pattern Architecture</h4>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: 'Client', desc: 'Creates commands', color: 'text-sky-400', bg: 'bg-sky-500/20' },
                  { label: 'Invoker', desc: 'Stores & triggers', color: 'text-purple-400', bg: 'bg-purple-500/20' },
                  { label: 'Command', desc: 'execute() + undo()', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
                  { label: 'Receiver', desc: 'Does the real work', color: 'text-green-400', bg: 'bg-green-500/20' },
                ].map((item, i, arr) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className={`w-full aspect-square rounded-xl ${item.bg} flex items-center justify-center mb-2 relative`}>
                      <div>
                        <p className={`text-xs font-bold ${item.color}`}>{item.label}</p>
                        <p className="text-[9px] text-quest-muted mt-0.5">{item.desc}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight size={14} className="absolute -right-3 text-quest-muted z-10" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-quest-surface rounded-lg border border-white/5">
                <p className="text-[11px] text-quest-muted leading-relaxed">
                  The <strong className="text-sky-400">Client</strong> creates a command and configures it with a receiver.
                  The <strong className="text-purple-400">Invoker</strong> stores the command and calls <code className="font-mono">execute()</code> when triggered.
                  The <strong className="text-yellow-400">Command</strong> encapsulates the action and delegates to the{' '}
                  <strong className="text-green-400">
                    <Term
                      word="Receiver"
                      definition="The object that performs the actual work when a command is executed. The command delegates to the receiver's methods. For example, in a text editor, the Receiver is the Document object that actually modifies text."
                      onLearn={learnTerm}
                    />
                  </strong>
                  , which performs the actual work.
                </p>
              </div>
            </div>

            <DeepDive id="command-queue-real" title="Command Queues in Production" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Message Queues:</strong> RabbitMQ, SQS, and Kafka are essentially
                  distributed command queues. Producers enqueue commands, consumers dequeue and execute them. Failed
                  commands go to a dead-letter queue for retry or manual inspection.
                </p>
                <p>
                  <strong className="text-quest-text">CQRS:</strong> Command Query Responsibility Segregation separates
                  read and write operations. Write operations are commands that modify state. Read operations are queries
                  that return data without side effects. This lets you scale reads and writes independently.
                </p>
                <p>
                  <strong className="text-quest-text">Event Sourcing:</strong> Instead of storing current state, store
                  every command (event) that led to the current state. To get current state, replay all events. This
                  gives you a perfect audit log and the ability to reconstruct state at any point in time.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: QUIZ ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-sky-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Command and Chain of Responsibility are patterns you will see everywhere once you know to look.
              Let's verify your understanding.
            </p>

            <div className="space-y-8">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="bg-quest-bg rounded-lg p-6">
                  <p className="font-medium mb-4">{qIndex + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map(option => {
                      const isSelected = quizAnswers[q.id] === option.id
                      const showResult = quizSubmitted
                      const isCorrect = option.correct

                      return (
                        <button
                          key={option.id}
                          onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: option.id }))}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded-lg border transition-all text-sm
                            ${isSelected
                              ? showResult
                                ? isCorrect ? 'border-quest-success bg-quest-success/10' : 'border-quest-danger bg-quest-danger/10'
                                : 'border-sky-500 bg-sky-500/10'
                              : showResult && isCorrect
                                ? 'border-quest-success bg-quest-success/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                        >
                          {option.text}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="btn-primary w-full mt-6 disabled:opacity-50"
              >
                Submit Answers
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-quest-success/10 border border-quest-success/30 rounded-lg p-6 text-center"
              >
                <CheckCircle size={48} className="mx-auto text-quest-success mb-4" />
                <h3 className="text-xl font-bold mb-2">Level 40 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Command pattern for undoable, queueable, replayable actions
                  and Chain of Responsibility for decoupled request handling. These patterns turn
                  tangled procedural code into composable, extensible architectures.
                </p>
                <p className="text-sm text-sky-400">
                  Every action is an object. Every handler is a link in the chain. Command & Conquer achieved.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

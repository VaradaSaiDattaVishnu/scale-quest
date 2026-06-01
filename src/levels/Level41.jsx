import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, FileText, List, ArrowRight, SkipForward, Repeat } from 'lucide-react'

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

/* ── Report type definitions for the Template Method simulation ── */
const reportTypes = [
  {
    id: 'sales',
    name: 'Sales Report',
    color: 'text-quest-primary',
    bg: 'bg-quest-primary/20',
    borderColor: 'border-quest-primary/40',
    header: { title: 'Q4 Sales Report', subtitle: 'Revenue & Performance Metrics', logo: 'SalesCorp Inc.' },
    body: [
      { label: 'Total Revenue', value: '$2.4M', trend: '+18%' },
      { label: 'New Customers', value: '1,247', trend: '+12%' },
      { label: 'Avg Deal Size', value: '$14.2K', trend: '+5%' },
      { label: 'Win Rate', value: '34%', trend: '+2%' },
    ],
    footer: { author: 'Sales Analytics Team', note: 'Data sourced from CRM pipeline.' },
  },
  {
    id: 'engineering',
    name: 'Engineering Report',
    color: 'text-quest-secondary',
    bg: 'bg-quest-secondary/20',
    borderColor: 'border-quest-secondary/40',
    header: { title: 'Sprint 47 Engineering Report', subtitle: 'Velocity & Quality Metrics', logo: 'Platform Team' },
    body: [
      { label: 'Story Points', value: '84', trend: '+6%' },
      { label: 'PRs Merged', value: '47', trend: '+11%' },
      { label: 'Bug Fix Rate', value: '92%', trend: '+3%' },
      { label: 'P99 Latency', value: '42ms', trend: '-8%' },
    ],
    footer: { author: 'Engineering Manager', note: 'Metrics from Jira & Datadog.' },
  },
  {
    id: 'marketing',
    name: 'Marketing Report',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/20',
    borderColor: 'border-emerald-400/40',
    header: { title: 'Campaign Performance Report', subtitle: 'Reach & Conversion Analysis', logo: 'Growth Marketing' },
    body: [
      { label: 'Impressions', value: '4.2M', trend: '+22%' },
      { label: 'Click Rate', value: '3.8%', trend: '+0.5%' },
      { label: 'Conversions', value: '8,412', trend: '+15%' },
      { label: 'CAC', value: '$28', trend: '-12%' },
    ],
    footer: { author: 'Marketing Ops', note: 'Data from Google Analytics & HubSpot.' },
  },
]

/* ── Template Method steps ── */
const templateSteps = [
  { id: 'init', label: 'initialize()', description: 'Set up report context, validate inputs', isHook: false },
  { id: 'header', label: 'generateHeader()', description: 'Build the report header section', isHook: false },
  { id: 'beforeBody', label: 'beforeBody()', description: 'Optional hook -- called before body generation', isHook: true },
  { id: 'body', label: 'generateBody()', description: 'Build the main report content (abstract)', isHook: false },
  { id: 'afterBody', label: 'afterBody()', description: 'Optional hook -- called after body generation', isHook: true },
  { id: 'footer', label: 'generateFooter()', description: 'Build the report footer section', isHook: false },
  { id: 'finalize', label: 'finalize()', description: 'Cleanup and return the finished report', isHook: false },
]

/* ── Collection types for Iterator simulation ── */
const collectionTypes = [
  {
    id: 'array',
    name: 'Array',
    icon: List,
    color: 'text-quest-primary',
    bg: 'bg-quest-primary/10',
    borderColor: 'border-quest-primary/30',
    elements: ['A', 'B', 'C', 'D', 'E', 'F'],
    layout: 'linear',
    description: 'Sequential traversal, left to right',
  },
  {
    id: 'tree',
    name: 'Binary Tree',
    icon: SkipForward,
    color: 'text-quest-secondary',
    bg: 'bg-quest-secondary/10',
    borderColor: 'border-quest-secondary/30',
    elements: ['50', '30', '70', '20', '40', '60', '80'],
    layout: 'tree',
    description: 'In-order traversal: left, root, right',
    traversalOrder: [3, 1, 4, 0, 5, 2, 6], // in-order indices
  },
  {
    id: 'graph',
    name: 'Graph (BFS)',
    icon: Repeat,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/30',
    elements: ['A', 'B', 'C', 'D', 'E', 'F'],
    layout: 'graph',
    description: 'Breadth-first: level by level',
    edges: [[0,1],[0,2],[1,3],[1,4],[2,5]],
    traversalOrder: [0, 1, 2, 3, 4, 5],
  },
]

/* ── Custom Iterator pipeline operations ── */
const pipelineOps = [
  { id: 'filter-even', label: 'filter(x => x % 2 === 0)', type: 'filter', fn: x => x % 2 === 0 },
  { id: 'map-double', label: 'map(x => x * 2)', type: 'map', fn: x => x * 2 },
  { id: 'filter-gt10', label: 'filter(x => x > 10)', type: 'filter', fn: x => x > 10 },
  { id: 'map-str', label: 'map(x => `[${x}]`)', type: 'map', fn: x => `[${x}]` },
]

/* ── Hollywood Principle actors ── */
const hollywoodSteps = [
  { actor: 'Framework', action: 'Receives HTTP request', direction: 'down' },
  { actor: 'Framework', action: 'Calls route handler (your code)', direction: 'down' },
  { actor: 'Your Code', action: 'Processes business logic', direction: 'up' },
  { actor: 'Framework', action: 'Calls beforeRender() hook', direction: 'down' },
  { actor: 'Your Code', action: 'Modifies response context', direction: 'up' },
  { actor: 'Framework', action: 'Renders template with context', direction: 'down' },
  { actor: 'Framework', action: 'Calls afterRender() hook', direction: 'down' },
  { actor: 'Your Code', action: 'Logs analytics event', direction: 'up' },
  { actor: 'Framework', action: 'Sends response to client', direction: 'down' },
]

/* ── Quiz Questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the main difference between Template Method and Strategy pattern?',
    options: [
      { id: 'a', text: 'Template Method uses inheritance to vary parts of an algorithm; Strategy uses composition/delegation to swap entire algorithms', correct: true },
      { id: 'b', text: 'Template Method is for generating reports; Strategy is for sorting algorithms', correct: false },
      { id: 'c', text: 'Template Method is faster because it avoids polymorphism', correct: false },
      { id: 'd', text: 'They are identical patterns with different names', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What is the primary benefit of the Iterator pattern?',
    options: [
      { id: 'a', text: 'It makes data structures immutable', correct: false },
      { id: 'b', text: 'It provides a uniform interface to traverse different collection types without exposing their internal structure', correct: true },
      { id: 'c', text: 'It sorts data structures automatically before traversal', correct: false },
      { id: 'd', text: 'It prevents concurrent modification of collections', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What does the Hollywood Principle ("Don\'t call us, we\'ll call you") mean?',
    options: [
      { id: 'a', text: 'Clients should never call the server directly', correct: false },
      { id: 'b', text: 'High-level components (frameworks) call low-level components (your code), not the other way around', correct: true },
      { id: 'c', text: 'Functions should only be called once per request', correct: false },
      { id: 'd', text: 'APIs should use webhooks instead of polling', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What is a hook method in the Template Method pattern?',
    options: [
      { id: 'a', text: 'A method that catches and handles exceptions during template execution', correct: false },
      { id: 'b', text: 'A method with a default (often empty) implementation that subclasses may optionally override to extend behavior', correct: true },
      { id: 'c', text: 'A required abstract method that all subclasses must implement', correct: false },
      { id: 'd', text: 'A React lifecycle method used in class components', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is the key difference between an internal iterator and an external iterator?',
    options: [
      { id: 'a', text: 'Internal iterators are faster; external iterators use less memory', correct: false },
      { id: 'b', text: 'Internal iterators are for arrays; external iterators are for trees', correct: false },
      { id: 'c', text: 'An internal iterator controls the traversal itself (e.g., forEach), while an external iterator gives the client control over advancing (e.g., next())', correct: true },
      { id: 'd', text: 'Internal iterators run on the server; external iterators run on the client', correct: false },
    ],
  },
]

export default function Level41({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Template Method state
  const [selectedReport, setSelectedReport] = useState(0)
  const [templateStep, setTemplateStep] = useState(-1) // -1 = idle, 0..6 = executing step
  const [templateRunning, setTemplateRunning] = useState(false)
  const [templateDone, setTemplateDone] = useState(false)
  const [hookOverrides, setHookOverrides] = useState({ beforeBody: false, afterBody: false })
  const templateTimerRef = useRef(null)

  // Iterator state
  const [selectedCollection, setSelectedCollection] = useState(0)
  const [iteratorIndex, setIteratorIndex] = useState(-1) // -1 = idle
  const [iteratorRunning, setIteratorRunning] = useState(false)
  const [iteratorVisited, setIteratorVisited] = useState([])
  const iteratorTimerRef = useRef(null)

  // Hollywood Principle state
  const [hollywoodStep, setHollywoodStep] = useState(-1)
  const [hollywoodRunning, setHollywoodRunning] = useState(false)
  const hollywoodTimerRef = useRef(null)

  // Custom Iterator Pipeline state
  const [pipelineInput] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  const [activePipelineOps, setActivePipelineOps] = useState([0, 1]) // indices into pipelineOps
  const [pipelineStep, setPipelineStep] = useState(-1)
  const [pipelineRunning, setPipelineRunning] = useState(false)
  const [pipelineIntermediates, setPipelineIntermediates] = useState([])
  const pipelineTimerRef = useRef(null)

  const sections = ['template', 'iterator', 'hollywood', 'pipeline', 'quiz']
  const sectionLabels = ['Template Method', 'Iterator', 'Hollywood Principle', 'Custom Iterator', 'Quiz']

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      clearInterval(templateTimerRef.current)
      clearInterval(iteratorTimerRef.current)
      clearInterval(hollywoodTimerRef.current)
      clearInterval(pipelineTimerRef.current)
    }
  }, [])

  /* ── Template Method Simulation ── */
  const runTemplate = useCallback(() => {
    setTemplateRunning(true)
    setTemplateDone(false)
    setTemplateStep(0)
    let step = 0
    clearInterval(templateTimerRef.current)
    templateTimerRef.current = setInterval(() => {
      step++
      // Skip hook steps if not overridden
      if (step === 2 && !hookOverrides.beforeBody) step++
      if (step === 4 && !hookOverrides.afterBody) step++
      if (step >= templateSteps.length) {
        clearInterval(templateTimerRef.current)
        setTemplateDone(true)
        setTemplateRunning(false)
        setTemplateStep(templateSteps.length - 1)
        return
      }
      setTemplateStep(step)
    }, 900)
  }, [hookOverrides])

  const resetTemplate = useCallback(() => {
    clearInterval(templateTimerRef.current)
    setTemplateStep(-1)
    setTemplateRunning(false)
    setTemplateDone(false)
  }, [])

  /* ── Iterator Simulation ── */
  const runIterator = useCallback(() => {
    const collection = collectionTypes[selectedCollection]
    const order = collection.traversalOrder || collection.elements.map((_, i) => i)
    setIteratorRunning(true)
    setIteratorIndex(0)
    setIteratorVisited([order[0]])
    let idx = 0
    clearInterval(iteratorTimerRef.current)
    iteratorTimerRef.current = setInterval(() => {
      idx++
      if (idx >= order.length) {
        clearInterval(iteratorTimerRef.current)
        setIteratorRunning(false)
        return
      }
      setIteratorIndex(idx)
      setIteratorVisited(prev => [...prev, order[idx]])
    }, 700)
  }, [selectedCollection])

  const resetIterator = useCallback(() => {
    clearInterval(iteratorTimerRef.current)
    setIteratorIndex(-1)
    setIteratorRunning(false)
    setIteratorVisited([])
  }, [])

  /* ── Hollywood Principle Simulation ── */
  const runHollywood = useCallback(() => {
    setHollywoodRunning(true)
    setHollywoodStep(0)
    let step = 0
    clearInterval(hollywoodTimerRef.current)
    hollywoodTimerRef.current = setInterval(() => {
      step++
      if (step >= hollywoodSteps.length) {
        clearInterval(hollywoodTimerRef.current)
        setHollywoodRunning(false)
        return
      }
      setHollywoodStep(step)
    }, 800)
  }, [])

  const resetHollywood = useCallback(() => {
    clearInterval(hollywoodTimerRef.current)
    setHollywoodStep(-1)
    setHollywoodRunning(false)
  }, [])

  /* ── Custom Iterator Pipeline ── */
  const computePipeline = useCallback(() => {
    const results = [pipelineInput]
    let current = [...pipelineInput]
    for (const opIdx of activePipelineOps) {
      const op = pipelineOps[opIdx]
      if (op.type === 'filter') {
        current = current.filter(op.fn)
      } else {
        current = current.map(op.fn)
      }
      results.push([...current])
    }
    return results
  }, [pipelineInput, activePipelineOps])

  const runPipeline = useCallback(() => {
    const results = computePipeline()
    setPipelineIntermediates(results)
    setPipelineRunning(true)
    setPipelineStep(0)
    let step = 0
    clearInterval(pipelineTimerRef.current)
    pipelineTimerRef.current = setInterval(() => {
      step++
      if (step >= results.length) {
        clearInterval(pipelineTimerRef.current)
        setPipelineRunning(false)
        return
      }
      setPipelineStep(step)
    }, 1000)
  }, [computePipeline])

  const resetPipeline = useCallback(() => {
    clearInterval(pipelineTimerRef.current)
    setPipelineStep(-1)
    setPipelineRunning(false)
    setPipelineIntermediates([])
  }, [])

  const togglePipelineOp = (opIdx) => {
    if (pipelineRunning) return
    setActivePipelineOps(prev => {
      if (prev.includes(opIdx)) {
        return prev.filter(i => i !== opIdx)
      }
      return [...prev, opIdx]
    })
    resetPipeline()
  }

  /* ── Quiz ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ── Helper: render tree layout ── */
  const renderTreeNode = (elements, visited, currentOrder, iterIdx) => {
    //        [0]
    //      /     \
    //    [1]     [2]
    //   / \     / \
    //  [3] [4] [5] [6]
    const rows = [[0], [1, 2], [3, 4, 5, 6]]
    return (
      <div className="flex flex-col items-center gap-3">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex items-center justify-center gap-4" style={{ gap: `${(3 - rowIdx) * 24}px` }}>
            {row.map(idx => {
              if (idx >= elements.length) return null
              const isVisited = visited.includes(idx)
              const order = currentOrder || []
              const isCurrent = iterIdx >= 0 && order[iterIdx] === idx
              return (
                <motion.div
                  key={idx}
                  animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300
                    ${isCurrent ? 'border-quest-warning bg-quest-warning/20 text-quest-warning' :
                      isVisited ? 'border-quest-success bg-quest-success/20 text-quest-success' :
                      'border-white/20 bg-quest-surface text-quest-muted'}`}
                >
                  {elements[idx]}
                </motion.div>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  /* ── Helper: render graph layout ── */
  const renderGraph = (collection, visited, iterIdx) => {
    const positions = [
      { x: 50, y: 10 },  // A
      { x: 25, y: 45 },  // B
      { x: 75, y: 45 },  // C
      { x: 10, y: 80 },  // D
      { x: 40, y: 80 },  // E
      { x: 75, y: 80 },  // F
    ]
    const order = collection.traversalOrder || []
    return (
      <div className="relative w-full" style={{ height: '180px' }}>
        {/* Edges */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {(collection.edges || []).map(([from, to], eIdx) => (
            <line
              key={eIdx}
              x1={positions[from].x} y1={positions[from].y + 5}
              x2={positions[to].x} y2={positions[to].y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
            />
          ))}
        </svg>
        {/* Nodes */}
        {collection.elements.map((el, idx) => {
          if (idx >= positions.length) return null
          const isVisited = visited.includes(idx)
          const isCurrent = iterIdx >= 0 && order[iterIdx] === idx
          return (
            <motion.div
              key={idx}
              animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`absolute w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300
                ${isCurrent ? 'border-quest-warning bg-quest-warning/20 text-quest-warning' :
                  isVisited ? 'border-quest-success bg-quest-success/20 text-quest-success' :
                  'border-white/20 bg-quest-surface text-quest-muted'}`}
              style={{
                left: `${positions[idx].x}%`,
                top: `${positions[idx].y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {el}
            </motion.div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Navigation */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === index
                ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {sectionLabels[index]}
          </button>
        ))}
      </div>

      {/* ============ SECTION: TEMPLATE METHOD ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-violet-400" />
              The{' '}
              <Term word="Template Method" definition="A behavioral design pattern that defines the skeleton of an algorithm in a base class method, deferring some steps to subclasses. Subclasses override specific steps without changing the overall structure." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-4">
              All your reports follow the same structure, but the details differ. How do you avoid code duplication?
              The Template Method pattern defines the skeleton of an algorithm -- <code className="text-quest-primary">initialize → header → body → footer → finalize</code> --
              while letting subclasses fill in the specifics. The base class controls the flow; subclasses provide the content.
            </p>

            <p className="text-quest-muted mb-6">
              This is the{' '}
              <Term word="Hollywood Principle" definition="'Don't call us, we'll call you.' High-level modules (frameworks, base classes) call into low-level modules (your code, subclasses), not the other way around. This inverts the usual control flow." onLearn={learnTerm} />
              {' '}in action: the base class calls your overridden methods, not the other way around.
            </p>

            {/* Report Type Selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Choose a report subclass:</p>
              <div className="flex gap-3 flex-wrap">
                {reportTypes.map((rt, idx) => (
                  <button
                    key={rt.id}
                    onClick={() => { setSelectedReport(idx); resetTemplate() }}
                    disabled={templateRunning}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all
                      ${selectedReport === idx
                        ? `${rt.bg} ${rt.borderColor} ${rt.color}`
                        : 'border-white/10 text-quest-muted hover:border-white/30'
                      } disabled:opacity-50`}
                  >
                    {rt.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Hook Override Toggles */}
            <div className="bg-quest-bg rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Term word="Hook Methods" definition="Methods with default (often empty) implementations in the base class. Subclasses may optionally override them to inject behavior at specific points in the template. They 'hook into' the algorithm without changing its structure." onLearn={learnTerm} />
                {' '}- Toggle optional hooks:
              </p>
              <div className="flex gap-4 flex-wrap">
                {['beforeBody', 'afterBody'].map(hook => (
                  <label key={hook} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hookOverrides[hook]}
                      onChange={() => {
                        if (!templateRunning) {
                          setHookOverrides(prev => ({ ...prev, [hook]: !prev[hook] }))
                          resetTemplate()
                        }
                      }}
                      disabled={templateRunning}
                      className="accent-quest-secondary w-4 h-4"
                    />
                    <span className="text-sm text-quest-muted">
                      {hook === 'beforeBody' ? 'Override beforeBody()' : 'Override afterBody()'}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-quest-muted mt-2">
                Hooks have empty default implementations. Toggle them to see how subclasses can extend the algorithm.
              </p>
            </div>

            {/* Template Steps Visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">Template Method Execution Pipeline</p>

              <div className="flex flex-col gap-2 mb-6">
                {templateSteps.map((step, idx) => {
                  const isSkipped = step.isHook && !hookOverrides[step.id === 'beforeBody' ? 'beforeBody' : step.id === 'afterBody' ? 'afterBody' : null]
                  const isActive = templateStep === idx
                  const isDone = templateStep > idx || (templateDone && templateStep >= idx)
                  const skippedAndNotRunning = isSkipped && !templateRunning && templateStep === -1

                  return (
                    <motion.div
                      key={step.id}
                      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300
                        ${isSkipped && !isActive
                          ? 'border-white/5 bg-white/2 opacity-40'
                          : isActive
                            ? 'border-quest-warning/50 bg-quest-warning/10'
                            : isDone
                              ? 'border-quest-success/30 bg-quest-success/5'
                              : 'border-white/10 bg-quest-surface'
                        }`}
                    >
                      {/* Step indicator */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border
                        ${isActive ? 'border-quest-warning bg-quest-warning/20 text-quest-warning' :
                          isDone ? 'border-quest-success bg-quest-success/20 text-quest-success' :
                          'border-white/20 text-quest-muted'}`}
                      >
                        {isDone ? <CheckCircle size={14} /> : idx + 1}
                      </div>

                      {/* Step info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <code className={`text-sm font-mono ${isActive ? 'text-quest-warning' : isDone ? 'text-quest-success' : 'text-quest-text'}`}>
                            {step.label}
                          </code>
                          {step.isHook && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-quest-secondary/20 text-quest-secondary border border-quest-secondary/30">
                              hook
                            </span>
                          )}
                          {skippedAndNotRunning && (
                            <span className="text-[10px] text-quest-muted">(not overridden -- skipped)</span>
                          )}
                        </div>
                        <p className="text-xs text-quest-muted mt-0.5">{step.description}</p>
                      </div>

                      {/* Arrow */}
                      {idx < templateSteps.length - 1 && (
                        <ArrowRight size={14} className="text-quest-muted flex-shrink-0 hidden sm:block" />
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Generated Report Preview */}
              <AnimatePresence>
                {(templateStep >= 1 || templateDone) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <p className="text-xs font-semibold mb-2 text-quest-muted">Generated Output:</p>
                    <div className={`rounded-lg border ${reportTypes[selectedReport].borderColor} overflow-hidden`}>
                      {/* Header */}
                      {templateStep >= 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`${reportTypes[selectedReport].bg} p-4 border-b ${reportTypes[selectedReport].borderColor}`}
                        >
                          <p className="text-[10px] text-quest-muted">{reportTypes[selectedReport].header.logo}</p>
                          <p className={`font-bold ${reportTypes[selectedReport].color}`}>{reportTypes[selectedReport].header.title}</p>
                          <p className="text-xs text-quest-muted">{reportTypes[selectedReport].header.subtitle}</p>
                        </motion.div>
                      )}

                      {/* Hook: beforeBody */}
                      {hookOverrides.beforeBody && templateStep >= 2 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="px-4 py-2 bg-quest-secondary/5 border-b border-quest-secondary/20"
                        >
                          <p className="text-[10px] text-quest-secondary font-mono">-- beforeBody() hook executed --</p>
                        </motion.div>
                      )}

                      {/* Body */}
                      {templateStep >= 3 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="p-4"
                        >
                          <div className="grid grid-cols-2 gap-3">
                            {reportTypes[selectedReport].body.map((item, i) => (
                              <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-quest-surface rounded-lg p-3"
                              >
                                <p className="text-[10px] text-quest-muted">{item.label}</p>
                                <p className="text-lg font-bold">{item.value}</p>
                                <p className={`text-xs ${item.trend.startsWith('+') || item.trend.startsWith('-') && item.label === 'CAC' ? 'text-quest-success' : item.trend.startsWith('-') ? 'text-quest-danger' : 'text-quest-success'}`}>
                                  {item.trend}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Hook: afterBody */}
                      {hookOverrides.afterBody && templateStep >= 4 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="px-4 py-2 bg-quest-secondary/5 border-t border-quest-secondary/20"
                        >
                          <p className="text-[10px] text-quest-secondary font-mono">-- afterBody() hook executed --</p>
                        </motion.div>
                      )}

                      {/* Footer */}
                      {templateStep >= 5 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`${reportTypes[selectedReport].bg} p-3 border-t ${reportTypes[selectedReport].borderColor}`}
                        >
                          <p className="text-[10px] text-quest-muted">
                            Prepared by: {reportTypes[selectedReport].footer.author} | {reportTypes[selectedReport].footer.note}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={runTemplate}
                  disabled={templateRunning}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <FileText size={16} /> Generate Report
                </button>
                {(templateDone || templateStep > -1) && (
                  <button
                    onClick={resetTemplate}
                    disabled={templateRunning}
                    className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                  >
                    <Repeat size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-danger/5 border border-quest-danger/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-quest-danger mb-3">Without Template Method (Duplication)</p>
                <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1">
                  <p className="text-quest-muted">// Each report repeats the structure</p>
                  <p><span className="text-quest-danger">class</span> SalesReport {'{'}</p>
                  <p>  generate() {'{'}</p>
                  <p>    <span className="text-quest-muted">this</span>.init()     <span className="text-quest-danger">// duplicated</span></p>
                  <p>    <span className="text-quest-muted">this</span>.header()   <span className="text-quest-danger">// duplicated</span></p>
                  <p>    <span className="text-quest-muted">this</span>.salesBody()</p>
                  <p>    <span className="text-quest-muted">this</span>.footer()   <span className="text-quest-danger">// duplicated</span></p>
                  <p>    <span className="text-quest-muted">this</span>.finalize() <span className="text-quest-danger">// duplicated</span></p>
                  <p>  {'}'}</p>
                  <p>{'}'}</p>
                </div>
              </div>
              <div className="bg-quest-success/5 border border-quest-success/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-quest-success mb-3">With Template Method (DRY)</p>
                <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1">
                  <p><span className="text-quest-success">class</span> ReportBase {'{'}</p>
                  <p>  <span className="text-quest-primary">generate</span>() {'{'} <span className="text-quest-muted">// template method</span></p>
                  <p>    <span className="text-quest-muted">this</span>.init()</p>
                  <p>    <span className="text-quest-muted">this</span>.header()</p>
                  <p>    <span className="text-quest-muted">this</span>.beforeBody() <span className="text-quest-secondary">// hook</span></p>
                  <p>    <span className="text-quest-muted">this</span>.<span className="text-quest-warning">body</span>() <span className="text-quest-muted">// abstract</span></p>
                  <p>    <span className="text-quest-muted">this</span>.afterBody()  <span className="text-quest-secondary">// hook</span></p>
                  <p>    <span className="text-quest-muted">this</span>.footer()</p>
                  <p>    <span className="text-quest-muted">this</span>.finalize()</p>
                  <p>  {'}'}</p>
                  <p>{'}'}</p>
                </div>
              </div>
            </div>

            <DeepDive id="template-vs-strategy" title="Template Method vs Strategy Pattern" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Template Method</strong> uses <em>inheritance</em>: the base class defines the algorithm skeleton
                and subclasses override specific steps. The control flow lives in the base class.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Strategy</strong> uses <em>composition</em>: the algorithm is encapsulated in a separate strategy
                object that can be swapped at runtime. The client delegates to the strategy.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>When to choose:</strong> Use Template Method when the overall algorithm is fixed and only
                certain steps vary. Use Strategy when you need to swap entire algorithms at runtime, or when
                inheritance hierarchies are getting too deep.
              </p>
              <p className="text-sm text-quest-muted">
                In modern code, many developers prefer Strategy (composition over inheritance), but Template Method
                remains common in frameworks (React class component lifecycle, JUnit test runners, Django views).
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Iterator Pattern <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: ITERATOR PATTERN ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <List className="text-violet-400" />
              The{' '}
              <Term word="Iterator Pattern" definition="A behavioral design pattern that provides a way to access elements of a collection sequentially without exposing its underlying representation. Different collections (array, tree, graph) can share the same traversal interface." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-6">
              You have arrays, trees, and graphs -- all different data structures. But the consuming code just wants
              to iterate through elements one by one. The Iterator pattern provides a uniform <code className="text-quest-primary">next()</code> interface
              regardless of the underlying collection structure.
            </p>

            {/* Collection Type Selector */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Choose a collection type:</p>
              <div className="flex gap-3 flex-wrap">
                {collectionTypes.map((ct, idx) => (
                  <button
                    key={ct.id}
                    onClick={() => { setSelectedCollection(idx); resetIterator() }}
                    disabled={iteratorRunning}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2
                      ${selectedCollection === idx
                        ? `${ct.bg} ${ct.borderColor} ${ct.color}`
                        : 'border-white/10 text-quest-muted hover:border-white/30'
                      } disabled:opacity-50`}
                  >
                    <ct.icon size={16} />
                    {ct.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Iterator Visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-2 text-center">
                {collectionTypes[selectedCollection].name} -- {collectionTypes[selectedCollection].description}
              </p>

              {/* Same interface badge */}
              <div className="flex justify-center mb-4">
                <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-full px-4 py-1">
                  <code className="text-xs text-quest-primary">interface: hasNext() / next()</code>
                </div>
              </div>

              {/* Collection display */}
              <div className="min-h-[200px] flex items-center justify-center mb-6">
                {collectionTypes[selectedCollection].layout === 'linear' && (
                  <div className="flex items-center gap-2">
                    {collectionTypes[selectedCollection].elements.map((el, idx) => {
                      const isVisited = iteratorVisited.includes(idx)
                      const isCurrent = iteratorIndex >= 0 && idx === iteratorIndex
                      return (
                        <div key={idx} className="flex items-center gap-2">
                          <motion.div
                            animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.4 }}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold border-2 transition-colors duration-300
                              ${isCurrent ? 'border-quest-warning bg-quest-warning/20 text-quest-warning' :
                                isVisited ? 'border-quest-success bg-quest-success/20 text-quest-success' :
                                'border-white/20 bg-quest-surface text-quest-muted'}`}
                          >
                            {el}
                          </motion.div>
                          {idx < collectionTypes[selectedCollection].elements.length - 1 && (
                            <ArrowRight size={14} className="text-quest-muted" />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}

                {collectionTypes[selectedCollection].layout === 'tree' && (
                  renderTreeNode(
                    collectionTypes[selectedCollection].elements,
                    iteratorVisited,
                    collectionTypes[selectedCollection].traversalOrder,
                    iteratorIndex
                  )
                )}

                {collectionTypes[selectedCollection].layout === 'graph' && (
                  renderGraph(collectionTypes[selectedCollection], iteratorVisited, iteratorIndex)
                )}
              </div>

              {/* Visited output */}
              <div className="bg-quest-surface rounded-lg p-3 mb-4">
                <p className="text-xs text-quest-muted mb-1">Iterator output (visited order):</p>
                <div className="flex items-center gap-1 flex-wrap min-h-[28px]">
                  {iteratorVisited.length === 0 && (
                    <span className="text-xs text-quest-muted">Waiting for iteration...</span>
                  )}
                  {iteratorVisited.map((elIdx, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-2 py-0.5 bg-quest-success/20 text-quest-success text-xs font-mono rounded"
                    >
                      {collectionTypes[selectedCollection].elements[elIdx]}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={runIterator}
                  disabled={iteratorRunning}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <List size={16} /> Iterate
                </button>
                {(iteratorVisited.length > 0) && (
                  <button
                    onClick={resetIterator}
                    disabled={iteratorRunning}
                    className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                  >
                    <Repeat size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Internal vs External Iterator */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-primary/5 border border-quest-primary/20 rounded-xl p-5">
                <h4 className="font-semibold text-quest-primary mb-3 flex items-center gap-2">
                  <Term word="Internal Iterator" definition="The collection itself controls the iteration. You pass a callback, and the collection calls it for each element. Examples: Array.forEach(), Ruby's each { |x| }. Simpler to use but less flexible." onLearn={learnTerm} />
                </h4>
                <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1 mb-3">
                  <p className="text-quest-muted">// Collection controls traversal</p>
                  <p>collection.<span className="text-quest-primary">forEach</span>(<span className="text-quest-warning">item</span> =&gt; {'{'}</p>
                  <p>  process(item)</p>
                  <p>{'}'})</p>
                </div>
                <p className="text-xs text-quest-muted">The collection decides when to move to the next element. You just provide the callback.</p>
              </div>
              <div className="bg-quest-secondary/5 border border-quest-secondary/20 rounded-xl p-5">
                <h4 className="font-semibold text-quest-secondary mb-3 flex items-center gap-2">
                  <Term word="External Iterator" definition="The client controls the iteration by explicitly calling next() and checking hasNext(). Examples: Java Iterator, Python's __next__(), JavaScript generators. More flexible -- you can pause, interleave, or stop early." onLearn={learnTerm} />
                </h4>
                <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1 mb-3">
                  <p className="text-quest-muted">// Client controls traversal</p>
                  <p><span className="text-quest-secondary">const</span> it = collection.iterator()</p>
                  <p><span className="text-quest-secondary">while</span> (it.<span className="text-quest-secondary">hasNext</span>()) {'{'}</p>
                  <p>  <span className="text-quest-secondary">const</span> item = it.<span className="text-quest-secondary">next</span>()</p>
                  <p>  process(item)</p>
                  <p>{'}'}</p>
                </div>
                <p className="text-xs text-quest-muted">You decide when to advance. Can pause, skip, or interleave multiple iterators.</p>
              </div>
            </div>

            <DeepDive id="iterator-real-world" title="Iterators in Real Systems" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Database Cursors:</strong> When querying millions of rows, you do not load them all into memory.
                A cursor is an iterator over result sets -- it fetches rows in batches as you call <code>next()</code>.
                This is the Iterator pattern applied to I/O-bound data.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Pagination APIs:</strong> REST APIs with <code>?page=2&limit=50</code> or cursor-based pagination
                (<code>?after=abc123</code>) are external iterators over remote datasets. The client controls
                when to fetch the next page.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Event Streams:</strong> Kafka consumers iterate over a topic's partitions. Each consumer
                maintains an offset (iterator position) and calls <code>poll()</code> to get the next batch of events.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Generators / Async Iterators:</strong> JavaScript's <code>function*</code> and Python's
                <code>yield</code> create lazy iterators that compute values on demand. Async iterators (<code>for await...of</code>)
                extend this to async data sources like WebSocket streams.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Hollywood Principle <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: HOLLYWOOD PRINCIPLE ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <SkipForward className="text-violet-400" />
              "Don't Call Us, We'll Call You" -- The{' '}
              <Term word="Hollywood Principle" definition="A design principle where high-level components call low-level components, not the other way around. Frameworks invoke your hook methods at the right time. This is Inversion of Control (IoC) in action." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-6">
              In traditional programming, your code calls library functions. With the Hollywood Principle,
              the framework calls your code. You provide hook methods and handlers; the framework decides
              when to invoke them. This is the foundation of every framework -- from React to Express to Django.
            </p>

            {/* Hollywood Step-by-Step Visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">Framework Request Lifecycle</p>

              {/* Two columns: Framework and Your Code */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg px-3 py-2 mb-3">
                    <p className="text-sm font-bold text-quest-primary">Framework</p>
                    <p className="text-[10px] text-quest-muted">Controls the flow</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-lg px-3 py-2 mb-3">
                    <p className="text-sm font-bold text-quest-warning">Your Code</p>
                    <p className="text-[10px] text-quest-muted">Called by framework</p>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-2 mb-6">
                {hollywoodSteps.map((step, idx) => {
                  const isActive = hollywoodStep === idx
                  const isDone = hollywoodStep > idx
                  const isFramework = step.actor === 'Framework'

                  return (
                    <motion.div
                      key={idx}
                      animate={isActive ? { scale: [1, 1.02, 1] } : {}}
                      transition={{ duration: 0.5, repeat: isActive ? Infinity : 0 }}
                      className={`flex items-center gap-3 transition-all duration-300 ${isActive ? 'opacity-100' : isDone ? 'opacity-60' : hollywoodStep === -1 ? 'opacity-50' : 'opacity-30'}`}
                    >
                      {/* Left side (framework) */}
                      <div className={`flex-1 text-right ${isFramework ? '' : 'opacity-0'}`}>
                        <div className={`inline-block rounded-lg px-3 py-2 text-xs transition-colors duration-300
                          ${isActive && isFramework ? 'bg-quest-primary/20 border border-quest-primary/40 text-quest-primary' :
                            isDone && isFramework ? 'bg-quest-success/10 border border-quest-success/20 text-quest-success' :
                            'bg-quest-surface border border-white/10 text-quest-muted'}`}
                        >
                          {step.action}
                        </div>
                      </div>

                      {/* Center arrow */}
                      <div className="flex-shrink-0 w-8 flex items-center justify-center">
                        {isFramework ? (
                          <motion.div animate={isActive ? { x: [0, 4, 0] } : {}} transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}>
                            <ArrowRight size={16} className={isActive ? 'text-quest-primary' : isDone ? 'text-quest-success' : 'text-quest-muted'} />
                          </motion.div>
                        ) : (
                          <motion.div animate={isActive ? { x: [0, -4, 0] } : {}} transition={{ duration: 0.6, repeat: isActive ? Infinity : 0 }}>
                            <ArrowRight size={16} className={`rotate-180 ${isActive ? 'text-quest-warning' : isDone ? 'text-quest-success' : 'text-quest-muted'}`} />
                          </motion.div>
                        )}
                      </div>

                      {/* Right side (your code) */}
                      <div className={`flex-1 text-left ${!isFramework ? '' : 'opacity-0'}`}>
                        <div className={`inline-block rounded-lg px-3 py-2 text-xs transition-colors duration-300
                          ${isActive && !isFramework ? 'bg-quest-warning/20 border border-quest-warning/40 text-quest-warning' :
                            isDone && !isFramework ? 'bg-quest-success/10 border border-quest-success/20 text-quest-success' :
                            'bg-quest-surface border border-white/10 text-quest-muted'}`}
                        >
                          {step.action}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={runHollywood}
                  disabled={hollywoodRunning}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <SkipForward size={16} /> Run Lifecycle
                </button>
                {hollywoodStep > -1 && !hollywoodRunning && (
                  <button
                    onClick={resetHollywood}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Repeat size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Real-world examples */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <p className="text-sm font-semibold mb-4">Hollywood Principle in Popular Frameworks</p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    framework: 'React',
                    hooks: ['useEffect', 'componentDidMount', 'render'],
                    explanation: 'React decides when to call your component function and effects. You declare what should happen; React controls when.',
                  },
                  {
                    framework: 'Express.js',
                    hooks: ['middleware()', 'route handler', 'error handler'],
                    explanation: 'Express receives requests and calls your middleware/handlers in order. You register handlers; Express invokes them.',
                  },
                  {
                    framework: 'JUnit',
                    hooks: ['@BeforeEach', '@Test', '@AfterEach'],
                    explanation: 'JUnit discovers and runs your test methods. You annotate methods; JUnit calls them in the right order.',
                  },
                ].map(fw => (
                  <div key={fw.framework} className="bg-quest-bg rounded-lg p-4">
                    <p className="text-sm font-bold text-quest-primary mb-2">{fw.framework}</p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {fw.hooks.map(h => (
                        <span key={h} className="text-[10px] px-1.5 py-0.5 rounded bg-quest-primary/10 text-quest-primary border border-quest-primary/20 font-mono">
                          {h}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-quest-muted">{fw.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="ioc-di" title="Inversion of Control & Dependency Injection" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                The Hollywood Principle is a specific form of <strong>Inversion of Control (IoC)</strong>.
                In traditional code, your application controls the flow (you call libraries). With IoC,
                the framework controls the flow (it calls your code). This "inversion" is what makes frameworks
                different from libraries.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Dependency Injection (DI)</strong> is another form of IoC. Instead of your class creating
                its own dependencies, they are "injected" from outside (via constructor, setter, or container).
                Spring, Angular, and NestJS all use DI containers to wire dependencies automatically.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>The key insight:</strong> both Template Method and Hollywood Principle achieve the same goal --
                the framework/base class defines the control flow, and your code fills in the blanks. Template Method
                does it via inheritance; hooks and callbacks do it via composition.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Custom Iterator <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: CUSTOM ITERATOR PIPELINE ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <List className="text-violet-400" />
              Custom Iterator Pipeline
            </h2>

            <p className="text-quest-muted mb-6">
              Real-world iterators do more than just traverse. They <strong>filter</strong>, <strong>transform</strong>,
              and <strong>compose</strong> operations lazily. Think of Java Streams, Rust iterators, or Python generators --
              you chain operations that execute one element at a time through the pipeline.
            </p>

            {/* Pipeline Operations Selector */}
            <div className="bg-quest-bg rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold mb-3">Build your pipeline (toggle operations):</p>
              <div className="space-y-2">
                {pipelineOps.map((op, idx) => (
                  <button
                    key={op.id}
                    onClick={() => togglePipelineOp(idx)}
                    disabled={pipelineRunning}
                    className={`w-full text-left p-3 rounded-lg border transition-all flex items-center gap-3
                      ${activePipelineOps.includes(idx)
                        ? op.type === 'filter'
                          ? 'border-quest-danger/40 bg-quest-danger/10 text-quest-danger'
                          : 'border-quest-primary/40 bg-quest-primary/10 text-quest-primary'
                        : 'border-white/10 text-quest-muted hover:border-white/30'
                      } disabled:opacity-50`}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold
                      ${activePipelineOps.includes(idx) ? 'bg-white/10' : 'bg-white/5'}`}
                    >
                      {activePipelineOps.includes(idx) ? activePipelineOps.indexOf(idx) + 1 : '-'}
                    </div>
                    <code className="text-sm font-mono">{op.label}</code>
                    <span className={`text-[10px] ml-auto px-1.5 py-0.5 rounded ${op.type === 'filter' ? 'bg-quest-danger/20 text-quest-danger' : 'bg-quest-primary/20 text-quest-primary'}`}>
                      {op.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">Pipeline Execution</p>

              {/* Input */}
              <div className="mb-4">
                <p className="text-xs text-quest-muted mb-2">Input:</p>
                <div className="flex gap-1 flex-wrap">
                  {pipelineInput.map((n, i) => (
                    <span key={i} className="px-2 py-1 bg-quest-surface rounded text-xs font-mono border border-white/10">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pipeline stages */}
              {pipelineIntermediates.length > 0 && (
                <div className="space-y-3 mb-4">
                  {pipelineIntermediates.map((stage, stageIdx) => {
                    if (stageIdx === 0) return null // skip input (already shown)
                    const isActive = pipelineStep === stageIdx
                    const isDone = pipelineStep > stageIdx || (!pipelineRunning && pipelineStep >= stageIdx)
                    const opIdx = activePipelineOps[stageIdx - 1]
                    const op = pipelineOps[opIdx]

                    return (
                      <motion.div
                        key={stageIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isActive || isDone ? 1 : 0.3, y: 0 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          <ArrowRight size={12} className="text-quest-muted" />
                          <code className={`text-xs font-mono ${isActive ? 'text-quest-warning' : isDone ? 'text-quest-success' : 'text-quest-muted'}`}>
                            {op?.label}
                          </code>
                          {isActive && (
                            <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-[10px] text-quest-warning"
                            >
                              processing...
                            </motion.span>
                          )}
                        </div>
                        {(isActive || isDone) && (
                          <div className="flex gap-1 flex-wrap ml-5">
                            {stage.length === 0 ? (
                              <span className="text-xs text-quest-muted italic">empty (all filtered out)</span>
                            ) : (
                              stage.map((n, i) => (
                                <motion.span
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.05 }}
                                  className={`px-2 py-1 rounded text-xs font-mono border
                                    ${isActive ? 'bg-quest-warning/10 border-quest-warning/30 text-quest-warning' :
                                      'bg-quest-success/10 border-quest-success/30 text-quest-success'}`}
                                >
                                  {String(n)}
                                </motion.span>
                              ))
                            )}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              )}

              {/* Final result */}
              {!pipelineRunning && pipelineIntermediates.length > 0 && pipelineStep >= pipelineIntermediates.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-quest-success/5 border border-quest-success/20 rounded-lg p-3 mb-4"
                >
                  <p className="text-xs font-semibold text-quest-success mb-1">Final output:</p>
                  <div className="flex gap-1 flex-wrap">
                    {pipelineIntermediates[pipelineIntermediates.length - 1].map((n, i) => (
                      <span key={i} className="px-2 py-1 bg-quest-success/20 rounded text-sm font-bold font-mono text-quest-success">
                        {String(n)}
                      </span>
                    ))}
                    {pipelineIntermediates[pipelineIntermediates.length - 1].length === 0 && (
                      <span className="text-xs text-quest-muted italic">empty result</span>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={runPipeline}
                  disabled={pipelineRunning || activePipelineOps.length === 0}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <List size={16} /> Run Pipeline
                </button>
                {pipelineIntermediates.length > 0 && !pipelineRunning && (
                  <button
                    onClick={resetPipeline}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Repeat size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Lazy vs Eager */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-success/5 border border-quest-success/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-quest-success mb-3">Lazy Iterator (Efficient)</p>
                <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1">
                  <p className="text-quest-muted">// Processes one element at a time</p>
                  <p><span className="text-quest-success">stream</span>.filter(even)</p>
                  <p>  .map(double)</p>
                  <p>  .filter(gtTen)</p>
                  <p>  .<span className="text-quest-success">take</span>(3) <span className="text-quest-muted">// stops early!</span></p>
                </div>
                <p className="text-[10px] text-quest-success mt-2">Each element flows through the full chain. Can short-circuit with take().</p>
              </div>
              <div className="bg-quest-danger/5 border border-quest-danger/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-quest-danger mb-3">Eager (Wasteful)</p>
                <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1">
                  <p className="text-quest-muted">// Creates intermediate arrays</p>
                  <p><span className="text-quest-danger">const</span> a = arr.filter(even)  <span className="text-quest-danger">// N items</span></p>
                  <p><span className="text-quest-danger">const</span> b = a.map(double)     <span className="text-quest-danger">// N/2 items</span></p>
                  <p><span className="text-quest-danger">const</span> c = b.filter(gtTen)   <span className="text-quest-danger">// N/4 items</span></p>
                  <p><span className="text-quest-danger">const</span> d = c.slice(0, 3)</p>
                </div>
                <p className="text-[10px] text-quest-danger mt-2">Creates 3 intermediate arrays even if you only need 3 results.</p>
              </div>
            </div>

            <DeepDive id="generators-async-iterators" title="Generators & Async Iterators" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>JavaScript Generators</strong> (<code>function*</code>) are lazy iterators. Each <code>yield</code>
                pauses execution and returns a value. The caller resumes with <code>next()</code>. This makes them
                perfect for lazy pipelines, infinite sequences, and coroutines.
              </p>
              <div className="font-mono text-[11px] bg-quest-bg rounded p-3 mb-3 space-y-1">
                <p><span className="text-quest-primary">function*</span> fibonacci() {'{'}</p>
                <p>  <span className="text-quest-secondary">let</span> [a, b] = [0, 1]</p>
                <p>  <span className="text-quest-secondary">while</span> (true) {'{'}</p>
                <p>    <span className="text-quest-warning">yield</span> a</p>
                <p>    [a, b] = [b, a + b]</p>
                <p>  {'}'}</p>
                <p>{'}'}</p>
                <p className="text-quest-muted mt-1">// Infinite sequence, computed lazily!</p>
              </div>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Async Iterators</strong> (<code>for await...of</code>) extend this to async data sources.
                Each <code>next()</code> returns a Promise. This is how you iterate over WebSocket messages,
                paginated API results, or database cursors without loading everything into memory.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Rust Iterators</strong> are the gold standard of lazy iterator design. Every <code>.filter()</code>,
                <code>.map()</code>, and <code>.take()</code> returns a new iterator adaptor -- nothing is computed
                until you call a consuming method like <code>.collect()</code> or <code>.for_each()</code>.
                The compiler often optimizes the entire chain into a single loop.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: QUIZ ============ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-violet-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Template methods, iterators, hooks, and the Hollywood Principle -- let's verify you've got them down!
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
                          className={`w-full text-left p-3 rounded-lg border transition-all
                            ${isSelected
                              ? showResult
                                ? isCorrect ? 'border-quest-success bg-quest-success/10' : 'border-quest-danger bg-quest-danger/10'
                                : 'border-quest-primary bg-quest-primary/10'
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
                <h3 className="text-xl font-bold mb-2">Level 41 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Template Method pattern, the Iterator pattern, hook methods, the Hollywood
                  Principle, and the difference between internal and external iterators. You can structure algorithms
                  with reusable skeletons and traverse any collection with a uniform interface!
                </p>
                <p className="text-sm text-violet-400">
                  No more code duplication in your algorithms, and no more exposing internal data structures to consumers.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

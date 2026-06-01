import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Factory, Database, Settings, Copy, Lock } from 'lucide-react'

/* ── Reusable helpers ── */

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

/* ── Quiz data ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'Which is a valid use case for the Singleton pattern?',
    options: [
      { id: 'a', text: 'Representing individual user accounts', correct: false },
      { id: 'b', text: 'Managing a shared database connection pool', correct: true },
      { id: 'c', text: 'Creating multiple independent loggers', correct: false },
      { id: 'd', text: 'Storing temporary request data', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'How does a Singleton differ from a global variable?',
    options: [
      { id: 'a', text: 'There is no difference; they are the same thing', correct: false },
      { id: 'b', text: 'A Singleton controls instantiation and can lazy-initialize; a global variable does not', correct: true },
      { id: 'c', text: 'A global variable guarantees only one instance; a Singleton does not', correct: false },
      { id: 'd', text: 'Singletons are always thread-safe; global variables are never thread-safe', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What is the primary benefit of the Factory pattern?',
    options: [
      { id: 'a', text: 'It makes objects immutable', correct: false },
      { id: 'b', text: 'It ensures only one instance exists', correct: false },
      { id: 'c', text: 'It decouples object creation from the code that uses the objects', correct: true },
      { id: 'd', text: 'It eliminates the need for constructors', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'How does Factory Method differ from Abstract Factory?',
    options: [
      { id: 'a', text: 'Factory Method creates one product; Abstract Factory creates families of related products', correct: true },
      { id: 'b', text: 'They are identical patterns with different names', correct: false },
      { id: 'c', text: 'Abstract Factory is simpler than Factory Method', correct: false },
      { id: 'd', text: 'Factory Method requires inheritance; Abstract Factory does not', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'Which technique makes a Singleton thread-safe in Java?',
    options: [
      { id: 'a', text: 'Using a public constructor', correct: false },
      { id: 'b', text: 'Double-checked locking with a volatile field', correct: true },
      { id: 'c', text: 'Making all methods static', correct: false },
      { id: 'd', text: 'Using multiple instances behind a load balancer', correct: false },
    ],
  },
]

/* ── Shape factory data ── */
const shapeTypes = [
  { type: 'circle', label: 'Circle', color: 'sky', render: (size) => <div className={`rounded-full bg-sky-400`} style={{ width: size, height: size }} /> },
  { type: 'square', label: 'Square', color: 'green', render: (size) => <div className={`rounded-sm bg-green-400`} style={{ width: size, height: size }} /> },
  { type: 'triangle', label: 'Triangle', color: 'amber', render: (size) => <div className="w-0 h-0" style={{ borderLeft: `${size / 2}px solid transparent`, borderRight: `${size / 2}px solid transparent`, borderBottom: `${size}px solid #fbbf24` }} /> },
  { type: 'diamond', label: 'Diamond', color: 'purple', render: (size) => <div className="bg-purple-400" style={{ width: size * 0.7, height: size * 0.7, transform: 'rotate(45deg)' }} /> },
]

/* ── Factory method subclass data ── */
const factorySubclasses = [
  {
    name: 'EmailNotificationFactory',
    type: 'Email',
    color: 'sky',
    icon: '@ ',
    description: 'Creates EmailNotification with SMTP transport',
  },
  {
    name: 'SMSNotificationFactory',
    type: 'SMS',
    color: 'green',
    icon: '# ',
    description: 'Creates SMSNotification with Twilio transport',
  },
  {
    name: 'PushNotificationFactory',
    type: 'Push',
    color: 'amber',
    icon: '! ',
    description: 'Creates PushNotification with Firebase transport',
  },
]

/* ════════════════════════════════════════════════════════════════════════
   Level 31 — One and Only: Singleton & Factory Patterns
   ════════════════════════════════════════════════════════════════════ */

export default function Level31({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Singleton demo state ── */
  const [singletonRequests, setSingletonRequests] = useState([])
  const [singletonInstance, setSingletonInstance] = useState(null)
  const [singletonRunning, setSingletonRunning] = useState(false)

  /* ── Connection pool demo state ── */
  const [poolMode, setPoolMode] = useState('unlimited') // 'unlimited' | 'singleton'
  const [connections, setConnections] = useState([])
  const [dbHealth, setDbHealth] = useState(100)
  const [poolRunning, setPoolRunning] = useState(false)

  /* ── Factory demo state ── */
  const [factoryProducts, setFactoryProducts] = useState([])
  const [selectedShapeType, setSelectedShapeType] = useState('circle')

  /* ── Factory method demo state ── */
  const [activeSubclass, setActiveSubclass] = useState(null)
  const [methodProducts, setMethodProducts] = useState([])

  /* ── Quiz submit ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ── Singleton instance demo ── */
  const runSingletonDemo = () => {
    if (singletonRunning) return
    setSingletonRunning(true)
    setSingletonRequests([])
    setSingletonInstance(null)

    const callers = [
      { id: 1, name: 'ServiceA', delay: 0 },
      { id: 2, name: 'ServiceB', delay: 400 },
      { id: 3, name: 'ServiceC', delay: 800 },
      { id: 4, name: 'HandlerX', delay: 1200 },
      { id: 5, name: 'WorkerY', delay: 1600 },
    ]

    callers.forEach((caller) => {
      setTimeout(() => {
        setSingletonRequests(prev => [...prev, { ...caller, status: 'requesting' }])

        setTimeout(() => {
          setSingletonRequests(prev =>
            prev.map(r =>
              r.id === caller.id
                ? { ...r, status: caller.id === 1 ? 'created' : 'reused' }
                : r
            )
          )
          if (caller.id === 1) {
            setSingletonInstance({ id: 'INST-0x7F3A', createdBy: caller.name })
          }
        }, 300)
      }, caller.delay)
    })

    setTimeout(() => setSingletonRunning(false), 2400)
  }

  /* ── Connection pool demo ── */
  const runPoolDemo = () => {
    if (poolRunning) return
    setPoolRunning(true)
    setConnections([])
    setDbHealth(100)

    const maxConnections = poolMode === 'unlimited' ? 30 : 5
    const spawnRate = poolMode === 'unlimited' ? 120 : 300
    let count = 0

    const interval = setInterval(() => {
      count++
      if (count > (poolMode === 'unlimited' ? 30 : 12)) {
        clearInterval(interval)
        setPoolRunning(false)
        return
      }

      setConnections(prev => {
        const active = prev.filter(c => c.status === 'active').length

        if (poolMode === 'singleton' && active >= maxConnections) {
          return [...prev, { id: count, status: 'queued', ts: Date.now() }]
        }

        return [...prev, { id: count, status: 'active', ts: Date.now() }]
      })

      if (poolMode === 'unlimited') {
        setDbHealth(prev => Math.max(0, prev - 4))
      }
    }, spawnRate)

    // Cleanup queued connections for singleton mode
    if (poolMode === 'singleton') {
      const cleanup = setInterval(() => {
        setConnections(prev => {
          const active = prev.filter(c => c.status === 'active')
          const queued = prev.filter(c => c.status === 'queued')
          const released = prev.filter(c => c.status === 'released')

          if (active.length > 0 && queued.length > 0) {
            const toRelease = active[0]
            const toActivate = queued[0]
            return [
              ...active.slice(1).map(c => c),
              { ...toRelease, status: 'released' },
              { ...toActivate, status: 'active' },
              ...queued.slice(1),
              ...released,
            ]
          }
          return prev
        })
      }, 600)

      setTimeout(() => clearInterval(cleanup), 5000)
    }

    return () => clearInterval(interval)
  }

  /* ── Factory create shape ── */
  const createShape = () => {
    const shape = shapeTypes.find(s => s.type === selectedShapeType)
    if (!shape) return
    setFactoryProducts(prev => [
      ...prev.slice(-11),
      { id: Date.now(), type: shape.type, label: shape.label, color: shape.color },
    ])
  }

  /* ── Factory method demo ── */
  const runFactoryMethod = (subclass) => {
    setActiveSubclass(subclass.name)
    setTimeout(() => {
      setMethodProducts(prev => [
        ...prev.slice(-7),
        { id: Date.now(), type: subclass.type, factory: subclass.name, color: subclass.color },
      ])
      setActiveSubclass(null)
    }, 600)
  }

  /* ── Effect: mark complete if already done ── */
  useEffect(() => {
    if (isCompleted) {
      setQuizSubmitted(true)
    }
  }, [isCompleted])

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ═══════════════════ HEADER ═══════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quest-surface text-quest-muted text-sm mb-4">
          <Lock size={14} />
          Level 31
        </div>
        <h1 className="text-4xl font-bold mb-3">One and Only</h1>
        <p className="text-lg text-quest-muted max-w-2xl mx-auto">
          Singleton and Factory Patterns — controlling creation so your systems stay sane.
        </p>
      </motion.div>

      {/* ═══════════════════ NAV ═══════════════════ */}
      <div className="flex gap-2 justify-center flex-wrap mb-6">
        {['The Problem', 'Singleton', 'Connection Pool', 'Factory', 'Factory Method', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${currentSection === i
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                : 'bg-quest-surface text-quest-muted border border-white/10 hover:border-white/30'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: THE PROBLEM ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="text-red-400" />
              The Disaster
            </h2>

            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 mb-6">
              <p className="text-quest-muted italic mb-4">
                "Your database connection pool creates unlimited connections. Your DB crashes under load.
                Three services each spin up their own pool. Memory explodes. Never again."
              </p>
              <div className="grid grid-cols-3 gap-3">
                {['ServiceA', 'ServiceB', 'ServiceC'].map((svc, i) => (
                  <div key={svc} className="bg-quest-bg rounded-lg p-3 text-center">
                    <p className="text-xs font-mono text-red-400 mb-1">{svc}</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {Array.from({ length: 8 + i * 3 }, (_, j) => (
                        <motion.div
                          key={j}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: j * 0.05 }}
                          className="w-2 h-2 rounded-full bg-red-500/60"
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-quest-muted mt-1">{8 + i * 3} connections</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-red-400 font-medium">Total: 30 connections. DB max: 20. Crash.</p>
              </div>
            </div>

            <p className="text-quest-muted mb-4">
              Creational design patterns solve this exact class of problems. They control <em>how</em> and{' '}
              <em>when</em> objects get created, preventing resource waste, enforcing constraints, and
              decoupling your code from specific implementations.
            </p>

            <p className="text-quest-muted mb-4">
              In this level you will master two foundational creational patterns:{' '}
              <Term
                word="Singleton Pattern"
                definition="A design pattern that ensures a class has only one instance and provides a global point of access to it. Used for shared resources like connection pools, caches, and configuration managers."
                onLearn={learnTerm}
              />{' '}
              and the{' '}
              <Term
                word="Factory Pattern"
                definition="A creational design pattern that provides an interface for creating objects without specifying their concrete classes. The factory method decides which class to instantiate based on input parameters or configuration."
                onLearn={learnTerm}
              />.
            </p>

            <DeepDive id="creational-patterns-overview" title="The Gang of Four Creational Patterns" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  The seminal <em>Design Patterns</em> book (1994) cataloged five creational patterns:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong className="text-quest-text">Singleton</strong> — exactly one instance, globally accessible.</li>
                  <li><strong className="text-quest-text">Factory Method</strong> — delegate instantiation to subclasses.</li>
                  <li><strong className="text-quest-text">Abstract Factory</strong> — create families of related objects.</li>
                  <li><strong className="text-quest-text">Builder</strong> — construct complex objects step by step.</li>
                  <li><strong className="text-quest-text">Prototype</strong> — clone existing objects instead of creating new ones.</li>
                </ul>
                <p>
                  Singleton and Factory are the most commonly encountered in system design interviews because they
                  directly address resource management and loose coupling, two pillars of scalable architecture.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                The Singleton
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: SINGLETON ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="text-sky-400" />
              The Singleton Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term
                word="Singleton"
                definition="A class that restricts instantiation to a single object. It typically provides a static method (getInstance) that returns the same instance every time it is called."
                onLearn={learnTerm}
              />{' '}
              guarantees that no matter how many services call <code className="text-xs font-mono bg-quest-surface px-1 py-0.5 rounded">getInstance()</code>,
              they all receive the exact same object. The first call creates it;
              every subsequent call returns the existing one.
            </p>

            {/* Singleton code illustration */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 font-mono text-xs leading-relaxed">
              <p className="text-quest-muted">// Lazy Singleton (simplified)</p>
              <p><span className="text-purple-400">class</span> <span className="text-sky-400">ConnectionPool</span> {'{'}</p>
              <p className="pl-4"><span className="text-purple-400">static</span> #instance = <span className="text-amber-400">null</span></p>
              <p className="pl-4 mt-2"><span className="text-purple-400">static</span> <span className="text-green-400">getInstance</span>() {'{'}</p>
              <p className="pl-8"><span className="text-purple-400">if</span> (!<span className="text-sky-400">ConnectionPool</span>.#instance) {'{'}</p>
              <p className="pl-12"><span className="text-sky-400">ConnectionPool</span>.#instance = <span className="text-purple-400">new</span> <span className="text-sky-400">ConnectionPool</span>()</p>
              <p className="pl-8">{'}'}</p>
              <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-sky-400">ConnectionPool</span>.#instance</p>
              <p className="pl-4">{'}'}</p>
              <p>{'}'}</p>
            </div>

            {/* Interactive singleton demo */}
            <h3 className="font-semibold mb-3">Interactive: Watch 5 Services Request the Singleton</h3>
            <p className="text-sm text-quest-muted mb-4">
              Click "Run" to see multiple services attempt to create a ConnectionPool. Only the first succeeds;
              the rest receive the same instance.
            </p>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <button
                onClick={runSingletonDemo}
                disabled={singletonRunning}
                className="btn-primary mb-4 disabled:opacity-50"
              >
                {singletonRunning ? 'Running...' : 'Run Singleton Demo'}
              </button>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Callers column */}
                <div>
                  <p className="text-xs font-semibold text-quest-muted mb-2 uppercase tracking-wide">Callers</p>
                  <div className="space-y-2">
                    {singletonRequests.map((req) => (
                      <motion.div
                        key={req.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-3 p-3 rounded-lg border transition-all
                          ${req.status === 'requesting'
                            ? 'border-amber-500/40 bg-amber-500/5'
                            : req.status === 'created'
                              ? 'border-green-500/40 bg-green-500/5'
                              : 'border-sky-500/40 bg-sky-500/5'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                          ${req.status === 'requesting'
                            ? 'bg-amber-500/20 text-amber-400'
                            : req.status === 'created'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-sky-500/20 text-sky-400'
                          }`}>
                          {req.id}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-mono">{req.name}</p>
                          <p className="text-[10px] text-quest-muted">
                            {req.status === 'requesting' && 'Calling getInstance()...'}
                            {req.status === 'created' && 'Created new instance'}
                            {req.status === 'reused' && 'Received existing instance'}
                          </p>
                        </div>
                        <div className="text-xs">
                          {req.status === 'requesting' && <span className="text-amber-400">...</span>}
                          {req.status === 'created' && <span className="text-green-400">NEW</span>}
                          {req.status === 'reused' && <Copy size={14} className="text-sky-400" />}
                        </div>
                      </motion.div>
                    ))}
                    {singletonRequests.length === 0 && (
                      <p className="text-xs text-quest-muted italic p-3">Click "Run" to start</p>
                    )}
                  </div>
                </div>

                {/* Instance column */}
                <div>
                  <p className="text-xs font-semibold text-quest-muted mb-2 uppercase tracking-wide">Singleton Instance</p>
                  <AnimatePresence>
                    {singletonInstance ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-quest-surface rounded-xl p-6 border border-green-500/30 text-center"
                      >
                        <Database size={32} className="mx-auto text-green-400 mb-3" />
                        <p className="font-mono text-sm text-green-400 mb-1">{singletonInstance.id}</p>
                        <p className="text-[10px] text-quest-muted">Created by: {singletonInstance.createdBy}</p>
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <p className="text-[10px] text-quest-muted">
                            All {singletonRequests.filter(r => r.status !== 'requesting').length} callers share this one instance
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="bg-quest-surface rounded-xl p-6 border border-white/10 text-center">
                        <Database size={32} className="mx-auto text-quest-muted/30 mb-3" />
                        <p className="text-xs text-quest-muted">No instance yet</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <DeepDive id="thread-safe-singleton" title="Thread Safety and Double-Checked Locking" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  In multi-threaded languages (Java, C++), the naive Singleton has a race condition: two threads
                  could both see <code className="font-mono text-xs">instance == null</code> simultaneously and create
                  two instances.
                </p>
                <p>
                  <strong className="text-quest-text">Eager Initialization:</strong> Create the instance at class load time.
                  Simple but wastes resources if the instance is never used.
                </p>
                <p>
                  <strong className="text-quest-text">Synchronized Method:</strong> Add a lock to{' '}
                  <code className="font-mono text-xs">getInstance()</code>. Safe but slow because every call acquires the lock.
                </p>
                <p>
                  <strong className="text-quest-text">
                    <Term
                      word="Double-Checked Locking"
                      definition="A thread-safety optimization for Singleton: check if the instance is null, acquire a lock, then check again before creating. The volatile keyword ensures visibility across threads. Avoids locking on every call."
                      onLearn={learnTerm}
                    />
                  :</strong>{' '}
                  Check, lock, check again. The field must be <code className="font-mono text-xs">volatile</code> in Java
                  to prevent instruction reordering. This is the gold standard for lazy, thread-safe Singletons.
                </p>
                <p>
                  <strong className="text-quest-text">Bill Pugh Singleton (Java):</strong> Uses a static inner holder class.
                  The JVM loads the inner class lazily and thread-safely. Arguably the cleanest approach.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="lazy-initialization" title="Lazy vs Eager Initialization" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">
                    <Term
                      word="Lazy Initialization"
                      definition="A strategy where an object or resource is not created until it is first needed. Saves memory and startup time, but adds complexity (thread safety, null checks)."
                      onLearn={learnTerm}
                    />
                  </strong>{' '}
                  defers creation until the first call to <code className="font-mono text-xs">getInstance()</code>.
                  This is ideal when the Singleton is expensive to create and might not be needed during a given run.
                </p>
                <p>
                  <strong className="text-quest-text">Eager Initialization</strong> creates the instance at class load time
                  (e.g., <code className="font-mono text-xs">static final INSTANCE = new Singleton()</code> in Java).
                  Simpler and inherently thread-safe, but wastes resources if the object is never used.
                </p>
                <p>
                  In JavaScript/TypeScript (single-threaded), lazy initialization with a module-level variable is
                  typically sufficient. The module system itself acts as a natural Singleton boundary.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Connection Pool
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: CONNECTION POOL ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="text-amber-400" />
              Connection Pool — Singleton in Action
            </h2>

            <p className="text-quest-muted mb-6">
              Compare what happens when every service creates its own connections versus using a{' '}
              <Term
                word="Singleton Pool"
                definition="A single connection pool instance shared by all services. It enforces a maximum number of connections, queues excess requests, and recycles connections — preventing the database from being overwhelmed."
                onLearn={learnTerm}
              />.
              Toggle between modes and watch the chaos unfold — or not.
            </p>

            {/* Mode toggle */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => { setPoolMode('unlimited'); setConnections([]); setDbHealth(100) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border
                  ${poolMode === 'unlimited'
                    ? 'bg-red-500/20 text-red-400 border-red-500/40'
                    : 'bg-quest-surface text-quest-muted border-white/10 hover:border-white/30'
                  }`}
              >
                Unlimited Connections
              </button>
              <button
                onClick={() => { setPoolMode('singleton'); setConnections([]); setDbHealth(100) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border
                  ${poolMode === 'singleton'
                    ? 'bg-green-500/20 text-green-400 border-green-500/40'
                    : 'bg-quest-surface text-quest-muted border-white/10 hover:border-white/30'
                  }`}
              >
                Singleton Pool (max 5)
              </button>
            </div>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <button
                onClick={runPoolDemo}
                disabled={poolRunning}
                className="btn-primary mb-4 disabled:opacity-50"
              >
                {poolRunning ? 'Simulating...' : 'Start Simulation'}
              </button>

              {/* DB Health */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-quest-muted uppercase tracking-wide">Database Health</p>
                  <p className={`text-xs font-bold ${dbHealth > 60 ? 'text-green-400' : dbHealth > 30 ? 'text-amber-400' : 'text-red-400'}`}>
                    {dbHealth}%
                  </p>
                </div>
                <div className="w-full h-3 bg-quest-surface rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-colors duration-300
                      ${dbHealth > 60 ? 'bg-green-500' : dbHealth > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                    animate={{ width: `${dbHealth}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                {dbHealth === 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-red-400 font-bold mt-2 text-center"
                  >
                    DATABASE CRASHED - Connection limit exceeded!
                  </motion.p>
                )}
              </div>

              {/* Connections grid */}
              <div className="mb-3">
                <p className="text-xs font-semibold text-quest-muted mb-2 uppercase tracking-wide">
                  Connections ({connections.filter(c => c.status === 'active').length} active
                  {poolMode === 'singleton' && ` / ${connections.filter(c => c.status === 'queued').length} queued`})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <AnimatePresence>
                    {connections.map((conn) => (
                      <motion.div
                        key={conn.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-bold
                          ${conn.status === 'active'
                            ? poolMode === 'unlimited' ? 'bg-red-500/40 text-red-300' : 'bg-green-500/40 text-green-300'
                            : conn.status === 'queued'
                              ? 'bg-amber-500/30 text-amber-300'
                              : 'bg-quest-surface text-quest-muted'
                          }`}
                      >
                        {conn.id}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {connections.length === 0 && (
                    <p className="text-xs text-quest-muted italic">No connections yet</p>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px] text-quest-muted">
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-sm ${poolMode === 'unlimited' ? 'bg-red-500/40' : 'bg-green-500/40'}`} />
                  Active
                </div>
                {poolMode === 'singleton' && (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-sm bg-amber-500/30" />
                    Queued (waiting)
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-sm bg-quest-surface" />
                  Released
                </div>
              </div>
            </div>

            {/* Comparison summary */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-red-400 mb-2">Without Singleton Pool</h4>
                <ul className="text-xs text-quest-muted space-y-1.5">
                  <li>- Each service creates its own connections</li>
                  <li>- No upper bound on total connections</li>
                  <li>- DB runs out of file descriptors</li>
                  <li>- Memory usage grows unbounded</li>
                  <li>- Result: cascading failure, database crash</li>
                </ul>
              </div>
              <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
                <h4 className="text-sm font-semibold text-green-400 mb-2">With Singleton Pool</h4>
                <ul className="text-xs text-quest-muted space-y-1.5">
                  <li>- One shared pool across all services</li>
                  <li>- Fixed maximum (e.g., 5 connections)</li>
                  <li>- Excess requests queue and wait</li>
                  <li>- Connections are recycled efficiently</li>
                  <li>- Result: stable, predictable resource usage</li>
                </ul>
              </div>
            </div>

            <DeepDive id="singleton-antipattern" title="When Singleton Becomes an Anti-Pattern" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  Singleton is the most controversial GoF pattern. Overuse introduces tight coupling, hidden dependencies,
                  and makes unit testing painful because the global state leaks between tests.
                </p>
                <p>
                  <strong className="text-quest-text">Testing Difficulty:</strong> You cannot easily swap a Singleton for a
                  mock. Dependency injection frameworks solve this by managing the lifecycle externally (a "singleton scope"
                  without the class itself enforcing it).
                </p>
                <p>
                  <strong className="text-quest-text">Rule of Thumb:</strong> Use Singleton only for truly shared,
                  stateful resources: connection pools, thread pools, configuration registries, hardware interfaces. If in
                  doubt, prefer dependency injection.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Factory Pattern
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: FACTORY PATTERN ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Factory className="text-green-400" />
              The Factory Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term
                word="Factory"
                definition="An object or function responsible for creating other objects. The client tells the factory what it wants (via a type string, enum, or config), and the factory returns the correct concrete instance — without the client knowing the implementation details."
                onLearn={learnTerm}
              />{' '}
              centralizes object creation. Instead of scattering <code className="text-xs font-mono bg-quest-surface px-1 py-0.5 rounded">new ConcreteClass()</code> calls
              throughout your codebase, you ask the factory: "Give me a shape" and it decides which class to instantiate.
            </p>

            {/* Factory code illustration */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 font-mono text-xs leading-relaxed">
              <p className="text-quest-muted">// Simple Factory</p>
              <p><span className="text-purple-400">function</span> <span className="text-green-400">createShape</span>(type) {'{'}</p>
              <p className="pl-4"><span className="text-purple-400">switch</span> (type) {'{'}</p>
              <p className="pl-8"><span className="text-purple-400">case</span> <span className="text-amber-400">'circle'</span>:  <span className="text-purple-400">return new</span> <span className="text-sky-400">Circle</span>()</p>
              <p className="pl-8"><span className="text-purple-400">case</span> <span className="text-amber-400">'square'</span>:  <span className="text-purple-400">return new</span> <span className="text-sky-400">Square</span>()</p>
              <p className="pl-8"><span className="text-purple-400">case</span> <span className="text-amber-400">'triangle'</span>: <span className="text-purple-400">return new</span> <span className="text-sky-400">Triangle</span>()</p>
              <p className="pl-4">{'}'}</p>
              <p>{'}'}</p>
              <p className="mt-2 text-quest-muted">// Client code never sees Circle, Square, Triangle</p>
              <p><span className="text-purple-400">const</span> shape = <span className="text-green-400">createShape</span>(<span className="text-amber-400">'circle'</span>)</p>
            </div>

            {/* Interactive factory */}
            <h3 className="font-semibold mb-3">Interactive: Shape Factory</h3>
            <p className="text-sm text-quest-muted mb-4">
              Select a shape type, then click "Create" to watch the factory produce it. The client code
              never changes — only the input to the factory does.
            </p>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-xs text-quest-muted">Type:</p>
                <div className="flex gap-2">
                  {shapeTypes.map(s => (
                    <button
                      key={s.type}
                      onClick={() => setSelectedShapeType(s.type)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                        ${selectedShapeType === s.type
                          ? `bg-${s.color}-500/20 text-${s.color}-400 border-${s.color}-500/40`
                          : 'bg-quest-surface text-quest-muted border-white/10 hover:border-white/30'
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <button onClick={createShape} className="btn-primary text-sm ml-auto">
                  Create
                </button>
              </div>

              {/* Factory assembly line */}
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Factory size={16} className="text-green-400" />
                  <div className="flex-1 h-px bg-white/10" />
                  <p className="text-[10px] text-quest-muted">Production Line</p>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="flex flex-wrap gap-3 min-h-[60px] p-4 bg-quest-surface/50 rounded-lg border border-white/5">
                  <AnimatePresence>
                    {factoryProducts.map((product) => {
                      const shapeDef = shapeTypes.find(s => s.type === product.type)
                      return (
                        <motion.div
                          key={product.id}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex flex-col items-center gap-1"
                        >
                          <div className="w-10 h-10 flex items-center justify-center">
                            {shapeDef?.render(28)}
                          </div>
                          <p className="text-[8px] text-quest-muted">{product.label}</p>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                  {factoryProducts.length === 0 && (
                    <p className="text-xs text-quest-muted italic m-auto">Products will appear here</p>
                  )}
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              <div className="bg-quest-surface rounded-lg p-4">
                <p className="text-xs font-medium text-green-400 mb-1">Open/Closed Principle</p>
                <p className="text-[11px] text-quest-muted">
                  Add new shapes without modifying client code. Just add a case to the factory.
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4">
                <p className="text-xs font-medium text-sky-400 mb-1">Loose Coupling</p>
                <p className="text-[11px] text-quest-muted">
                  Client depends on the interface (Shape), not concrete classes (Circle, Square).
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4">
                <p className="text-xs font-medium text-purple-400 mb-1">Centralized Logic</p>
                <p className="text-[11px] text-quest-muted">
                  Creation logic lives in one place. Easy to add validation, logging, or caching.
                </p>
              </div>
            </div>

            <DeepDive id="factory-vs-constructor" title="Factory vs Constructor: When to Choose What" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  Use a <strong className="text-quest-text">constructor</strong> when you know the exact type at compile time
                  and the creation logic is trivial. Use a <strong className="text-quest-text">factory</strong> when:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>The concrete type depends on runtime configuration or input</li>
                  <li>Construction is complex (multi-step setup, validation)</li>
                  <li>You want to return cached or pooled instances</li>
                  <li>You need to hide implementation details behind an interface</li>
                </ul>
                <p>
                  In system design interviews, factories appear in notification systems (EmailNotifier vs SMSNotifier),
                  payment processing (StripeProcessor vs PayPalProcessor), and database access layers (MySQLAdapter vs
                  PostgresAdapter).
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Factory Method
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: FACTORY METHOD ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Settings className="text-purple-400" />
              The Factory Method Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              The{' '}
              <Term
                word="Factory Method"
                definition="A design pattern where a base class defines an interface for creating objects, but lets subclasses decide which class to instantiate. Each subclass overrides the factory method to produce its own product type."
                onLearn={learnTerm}
              />{' '}
              goes one step further than a simple factory. Instead of a single function with a switch statement,
              you define an abstract <code className="text-xs font-mono bg-quest-surface px-1 py-0.5 rounded">create()</code> method
              that each subclass overrides. This lets you add entirely new product families without touching existing code.
            </p>

            {/* Code illustration */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 font-mono text-xs leading-relaxed">
              <p className="text-quest-muted">// Factory Method pattern</p>
              <p><span className="text-purple-400">abstract class</span> <span className="text-sky-400">NotificationFactory</span> {'{'}</p>
              <p className="pl-4"><span className="text-purple-400">abstract</span> <span className="text-green-400">createNotification</span>(): <span className="text-sky-400">Notification</span></p>
              <p className="pl-4 mt-1"><span className="text-green-400">send</span>(msg) {'{'}</p>
              <p className="pl-8"><span className="text-purple-400">const</span> notif = <span className="text-purple-400">this</span>.<span className="text-green-400">createNotification</span>()</p>
              <p className="pl-8">notif.<span className="text-green-400">deliver</span>(msg)</p>
              <p className="pl-4">{'}'}</p>
              <p>{'}'}</p>
              <p className="mt-2"><span className="text-purple-400">class</span> <span className="text-sky-400">EmailNotificationFactory</span> <span className="text-purple-400">extends</span> <span className="text-sky-400">NotificationFactory</span> {'{'}</p>
              <p className="pl-4"><span className="text-green-400">createNotification</span>() {'{'} <span className="text-purple-400">return new</span> <span className="text-sky-400">EmailNotification</span>() {'}'}</p>
              <p>{'}'}</p>
            </div>

            {/* Interactive factory method */}
            <h3 className="font-semibold mb-3">Interactive: Subclass Overrides Creation</h3>
            <p className="text-sm text-quest-muted mb-4">
              Click each factory subclass to watch it override the <code className="text-xs font-mono bg-quest-surface px-1 py-0.5 rounded">createNotification()</code> method
              and produce its own product type.
            </p>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              {/* Subclass buttons */}
              <div className="grid md:grid-cols-3 gap-3 mb-6">
                {factorySubclasses.map((sub) => (
                  <motion.button
                    key={sub.name}
                    onClick={() => runFactoryMethod(sub)}
                    disabled={activeSubclass !== null}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl border transition-all text-left disabled:opacity-50
                      ${activeSubclass === sub.name
                        ? `border-${sub.color}-500/50 bg-${sub.color}-500/10`
                        : 'border-white/10 bg-quest-surface hover:border-white/30'
                      }`}
                  >
                    <p className="text-xs font-mono font-bold mb-1">{sub.icon}{sub.name}</p>
                    <p className="text-[10px] text-quest-muted">{sub.description}</p>
                    {activeSubclass === sub.name && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.5 }}
                        className={`h-0.5 mt-2 rounded-full bg-${sub.color}-400`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Production output */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Settings size={16} className="text-purple-400" />
                  <div className="flex-1 h-px bg-white/10" />
                  <p className="text-[10px] text-quest-muted">Created Products</p>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="space-y-2 min-h-[80px]">
                  <AnimatePresence>
                    {methodProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: 'auto' }}
                        exit={{ opacity: 0, x: 20 }}
                        className={`flex items-center gap-3 p-3 rounded-lg border bg-${product.color}-500/5 border-${product.color}-500/20`}
                      >
                        <div className={`w-8 h-8 rounded-full bg-${product.color}-500/20 flex items-center justify-center`}>
                          <span className="text-xs font-bold">{product.type[0]}</span>
                        </div>
                        <div>
                          <p className="text-xs font-mono font-medium">{product.type}Notification</p>
                          <p className="text-[10px] text-quest-muted">Created by {product.factory}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {methodProducts.length === 0 && (
                    <p className="text-xs text-quest-muted italic p-3 text-center">Click a factory subclass above</p>
                  )}
                </div>
              </div>
            </div>

            {/* Factory Method vs Abstract Factory comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-surface rounded-xl p-5 border border-purple-500/20">
                <h4 className="text-sm font-semibold text-purple-400 mb-3">Factory Method</h4>
                <ul className="text-xs text-quest-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">-</span>
                    <span>Creates <strong className="text-quest-text">one product</strong> per factory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">-</span>
                    <span>Uses <strong className="text-quest-text">inheritance</strong> — subclass overrides the method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">-</span>
                    <span>New product = new subclass</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-0.5">-</span>
                    <span>Example: each NotificationFactory creates its own notification type</span>
                  </li>
                </ul>
              </div>
              <div className="bg-quest-surface rounded-xl p-5 border border-amber-500/20">
                <h4 className="text-sm font-semibold text-amber-400 mb-3">Abstract Factory</h4>
                <ul className="text-xs text-quest-muted space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">-</span>
                    <span>Creates <strong className="text-quest-text">families of related products</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">-</span>
                    <span>Uses <strong className="text-quest-text">composition</strong> — factory object is injected</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">-</span>
                    <span>New family = new factory implementation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">-</span>
                    <span>Example: UIFactory creates Button + Checkbox + Modal for a given OS</span>
                  </li>
                </ul>
              </div>
            </div>

            <DeepDive id="factory-in-frameworks" title="Factories in Real Frameworks" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  Factories are everywhere in production systems:
                </p>
                <ul className="list-disc list-inside space-y-1.5">
                  <li>
                    <strong className="text-quest-text">React.createElement()</strong> — React itself is a factory. You call
                    createElement('div') and it returns a virtual DOM node. JSX is syntactic sugar over this factory.
                  </li>
                  <li>
                    <strong className="text-quest-text">Spring Framework (Java)</strong> — The ApplicationContext is a massive
                    factory that creates and manages beans based on configuration.
                  </li>
                  <li>
                    <strong className="text-quest-text">Python's logging module</strong> — logging.getLogger('name') is a factory
                    method that returns a configured Logger instance (also a Singleton per name).
                  </li>
                  <li>
                    <strong className="text-quest-text">Database Drivers</strong> — DriverManager.getConnection(url) in JDBC is a factory
                    that returns the correct database driver based on the URL prefix.
                  </li>
                </ul>
              </div>
            </DeepDive>

            <DeepDive id="singleton-plus-factory" title="Combining Singleton + Factory" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  A common real-world pattern combines both: a <strong className="text-quest-text">Singleton factory</strong>.
                  The factory itself is a Singleton (only one factory instance), but it produces multiple different products.
                </p>
                <p>
                  Example: a <code className="font-mono text-xs">CacheManager.getInstance().getCache("users")</code> call uses
                  a Singleton manager that internally factories different cache implementations (Redis, Memcached, in-memory)
                  based on configuration.
                </p>
                <p>
                  Another example: connection pool libraries like HikariCP use a Singleton pool that internally factories
                  connection objects, wrapping raw JDBC connections with monitoring and lifecycle management.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 5: QUIZ ═══════════════════ */}
      {currentSection === 5 && (
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
              Singleton and Factory patterns are interview staples. Prove you know when and why to use them.
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
                <h3 className="text-xl font-bold mb-2">Level 31 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand Singleton and Factory patterns — how to control object creation,
                  protect shared resources, and decouple your code from concrete implementations.
                </p>
                <p className="text-sm text-sky-400">
                  One instance to rule them all. One factory to create them.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

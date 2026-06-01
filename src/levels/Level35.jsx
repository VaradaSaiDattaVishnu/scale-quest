import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Gift, Shield, Layers, Eye, Lock } from 'lucide-react'

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

/* ── Coffee Decorator Data ── */

const coffeeDecorators = [
  { id: 'milk', label: 'Milk', cost: 0.50, desc: 'Steamed milk' },
  { id: 'sugar', label: 'Sugar', cost: 0.25, desc: 'Sweet sugar' },
  { id: 'whip', label: 'Whipped Cream', cost: 0.75, desc: 'Fluffy whipped cream' },
  { id: 'caramel', label: 'Caramel Drizzle', cost: 0.60, desc: 'Rich caramel' },
  { id: 'vanilla', label: 'Vanilla Shot', cost: 0.40, desc: 'Vanilla extract' },
]

const baseCoffee = { label: 'Black Coffee', cost: 2.00, desc: 'Simple brewed coffee' }

/* ── Proxy Type Data ── */

const proxyTypes = [
  {
    id: 'virtual',
    title: 'Virtual Proxy',
    icon: Eye,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    description: 'Delays creation of an expensive object until it is actually needed. Commonly used for lazy-loading images or heavy resources.',
    example: 'Image gallery: thumbnails load instantly, full-resolution images load only when scrolled into view.',
    flow: ['Client requests image', 'Proxy checks if loaded', 'Not loaded: fetch from server', 'Cache and return image'],
  },
  {
    id: 'protection',
    title: 'Protection Proxy',
    icon: Lock,
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/40',
    description: 'Controls access to the real object based on permissions. Acts as a gatekeeper that checks authorization before forwarding requests.',
    example: 'Admin panel: proxy checks user role before allowing access to sensitive operations.',
    flow: ['Client sends request', 'Proxy checks credentials', 'Authorized: forward to real object', 'Unauthorized: deny access'],
  },
  {
    id: 'logging',
    title: 'Logging Proxy',
    icon: Layers,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    description: 'Intercepts calls to the real object and logs them without the client or the real object being aware. Useful for debugging and monitoring.',
    example: 'API gateway: logs every request/response pair with timestamps and duration before forwarding to the backend service.',
    flow: ['Client sends request', 'Proxy logs request details', 'Forward to real object', 'Log response, return to client'],
  },
]

/* ── Data Stream Decorator Definitions ── */

const streamDecorators = [
  {
    id: 'encryption',
    label: 'Encryption',
    color: 'from-red-500 to-orange-500',
    border: 'border-red-500/50',
    effect: 'AES-256 encrypt',
    icon: Lock,
    desc: 'Wraps the stream to encrypt all data passing through. Only authorized recipients with the key can decrypt.',
  },
  {
    id: 'compression',
    label: 'Compression',
    color: 'from-blue-500 to-cyan-500',
    border: 'border-blue-500/50',
    effect: 'gzip compress',
    icon: Layers,
    desc: 'Wraps the stream to compress data, reducing bandwidth usage. Decompresses transparently on the reading side.',
  },
  {
    id: 'logging',
    label: 'Logging',
    color: 'from-green-500 to-emerald-500',
    border: 'border-green-500/50',
    effect: 'log to stdout',
    icon: Eye,
    desc: 'Wraps the stream to log all data passing through for debugging and auditing purposes.',
  },
  {
    id: 'buffering',
    label: 'Buffering',
    color: 'from-purple-500 to-violet-500',
    border: 'border-purple-500/50',
    effect: 'buffer 4KB chunks',
    icon: Gift,
    desc: 'Wraps the stream to buffer data into fixed-size chunks, reducing the number of system calls.',
  },
  {
    id: 'auth',
    label: 'Auth Check',
    color: 'from-yellow-500 to-amber-500',
    border: 'border-yellow-500/50',
    effect: 'verify JWT token',
    icon: Shield,
    desc: 'Wraps the stream to verify authentication tokens before allowing any data through.',
  },
]

/* ── Quiz Questions ── */

const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the main advantage of the Decorator Pattern over inheritance?',
    options: [
      { id: 'a', text: 'Decorators are faster at runtime than subclasses', correct: false },
      { id: 'b', text: 'You can add or remove behavior dynamically at runtime without modifying the original class or creating a subclass explosion', correct: true },
      { id: 'c', text: 'Decorators use less memory because they share a single instance', correct: false },
      { id: 'd', text: 'Inheritance cannot add new methods to a class', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'Which proxy type delays creation of an expensive object until it is actually needed?',
    options: [
      { id: 'a', text: 'Protection Proxy', correct: false },
      { id: 'b', text: 'Logging Proxy', correct: false },
      { id: 'c', text: 'Virtual Proxy', correct: true },
      { id: 'd', text: 'Caching Proxy', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'When should you prefer the Decorator Pattern?',
    options: [
      { id: 'a', text: 'When you need to convert one interface to another', correct: false },
      { id: 'b', text: 'When you want to add responsibilities to objects dynamically and transparently, without affecting other objects', correct: true },
      { id: 'c', text: 'When you need a simplified interface to a complex subsystem', correct: false },
      { id: 'd', text: 'When you want to ensure only one instance of a class exists', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What is the key difference between the Decorator and Adapter patterns?',
    options: [
      { id: 'a', text: 'Adapter adds new behavior; Decorator converts interfaces', correct: false },
      { id: 'b', text: 'Decorator adds behavior while keeping the same interface; Adapter converts one interface to another', correct: true },
      { id: 'c', text: 'Adapter supports multiple wrapping layers; Decorator does not', correct: false },
      { id: 'd', text: 'There is no meaningful difference; they are interchangeable', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'How does a Proxy differ from a Decorator?',
    options: [
      { id: 'a', text: 'A Proxy controls access to an object, while a Decorator adds new behavior to it. Proxy often manages the lifecycle of the real object.', correct: true },
      { id: 'b', text: 'A Proxy can only wrap one object; a Decorator can wrap many', correct: false },
      { id: 'c', text: 'A Decorator must be applied at compile time; a Proxy is applied at runtime', correct: false },
      { id: 'd', text: 'A Proxy changes the interface; a Decorator does not', correct: false },
    ],
  },
]

/* ── Main Component ── */

export default function Level35({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  // Coffee decorator state
  const [coffeeStack, setCoffeeStack] = useState([])
  const [coffeeAnimating, setCoffeeAnimating] = useState(false)

  // Proxy simulation state
  const [activeProxy, setActiveProxy] = useState(null)
  const [proxyStep, setProxyStep] = useState(0)
  const [proxyRunning, setProxyRunning] = useState(false)

  // Virtual proxy demo
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageRequested, setImageRequested] = useState(false)

  // Protection proxy demo
  const [userRole, setUserRole] = useState('guest')
  const [accessResult, setAccessResult] = useState(null)

  // Stream decorator state
  const [streamStack, setStreamStack] = useState([])
  const [streamData, setStreamData] = useState('Hello, World!')
  const [streamProcessing, setStreamProcessing] = useState(false)
  const [streamSteps, setStreamSteps] = useState([])

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['decorator', 'proxy', 'stacking', 'quiz']

  /* ── Coffee helpers ── */

  const addDecorator = useCallback((decorator) => {
    if (coffeeStack.length >= 5) return
    setCoffeeAnimating(true)
    setCoffeeStack(prev => [...prev, decorator])
    setTimeout(() => setCoffeeAnimating(false), 400)
  }, [coffeeStack.length])

  const removeLastDecorator = useCallback(() => {
    setCoffeeAnimating(true)
    setCoffeeStack(prev => prev.slice(0, -1))
    setTimeout(() => setCoffeeAnimating(false), 400)
  }, [])

  const resetCoffee = useCallback(() => {
    setCoffeeAnimating(true)
    setCoffeeStack([])
    setTimeout(() => setCoffeeAnimating(false), 300)
  }, [])

  const totalCost = baseCoffee.cost + coffeeStack.reduce((sum, d) => sum + d.cost, 0)

  const coffeeDescription = coffeeStack.length === 0
    ? baseCoffee.desc
    : coffeeStack.map(d => d.desc).join(' + ') + ' + ' + baseCoffee.desc

  /* ── Proxy helpers ── */

  const runProxyDemo = useCallback((proxyId) => {
    setActiveProxy(proxyId)
    setProxyStep(0)
    setProxyRunning(true)
    let step = 0
    const interval = setInterval(() => {
      step++
      setProxyStep(step)
      if (step >= 4) {
        clearInterval(interval)
        setProxyRunning(false)
      }
    }, 800)
  }, [])

  const requestImage = useCallback(() => {
    setImageRequested(true)
    setImageLoaded(false)
    setTimeout(() => setImageLoaded(true), 2000)
  }, [])

  const checkAccess = useCallback(() => {
    if (userRole === 'admin') {
      setAccessResult('granted')
    } else {
      setAccessResult('denied')
    }
  }, [userRole])

  /* ── Stream decorator helpers ── */

  const addStreamDecorator = useCallback((decorator) => {
    if (streamStack.some(d => d.id === decorator.id)) return
    if (streamStack.length >= 5) return
    setStreamStack(prev => [...prev, decorator])
    setStreamSteps([])
  }, [streamStack])

  const removeStreamDecorator = useCallback((decoratorId) => {
    setStreamStack(prev => prev.filter(d => d.id !== decoratorId))
    setStreamSteps([])
  }, [])

  const resetStreamStack = useCallback(() => {
    setStreamStack([])
    setStreamSteps([])
    setStreamProcessing(false)
  }, [])

  const processStream = useCallback(() => {
    if (streamStack.length === 0) return
    setStreamProcessing(true)
    setStreamSteps([])
    const steps = []
    let step = 0

    // Build steps from outermost decorator inward, then back out
    const writeSteps = streamStack.map((d, i) => ({
      phase: 'write',
      decorator: d.label,
      effect: d.effect,
      depth: i,
    }))
    const coreStep = { phase: 'core', decorator: 'Raw Stream', effect: `write "${streamData}"`, depth: streamStack.length }
    const readSteps = [...streamStack].reverse().map((d, i) => ({
      phase: 'read',
      decorator: d.label,
      effect: `reverse ${d.effect}`,
      depth: streamStack.length - 1 - i,
    }))
    const allSteps = [...writeSteps, coreStep, ...readSteps]

    const interval = setInterval(() => {
      if (step < allSteps.length) {
        steps.push(allSteps[step])
        setStreamSteps([...steps])
        step++
      } else {
        clearInterval(interval)
        setStreamProcessing(false)
      }
    }, 600)
  }, [streamStack, streamData])

  /* ── Quiz helpers ── */

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const score = quizQuestions.reduce((acc, q) => {
    const selected = quizAnswers[q.id]
    const correct = q.options.find(o => o.correct)?.id
    return acc + (selected === correct ? 1 : 0)
  }, 0)

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
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* ============ SECTION 1: DECORATOR PATTERN ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Gift className="text-purple-400" />
              The Decorator Pattern
            </h2>
            <p className="text-quest-muted mb-4">
              You need logging, caching, and authentication -- but not always. How do you add them flexibly?
            </p>
            <p className="mb-4">
              The{' '}
              <Term word="Decorator Pattern" definition="A structural design pattern that lets you attach new behaviors to objects by wrapping them in special wrapper objects called decorators. Each decorator has the same interface as the wrapped object." onLearn={learnTerm} />
              {' '}lets you wrap an object with additional behavior without changing its interface. Each decorator
              wraps the previous one, forming a chain. The client interacts with the outermost decorator exactly
              as it would with the original object.
            </p>
            <p className="mb-4">
              Unlike inheritance, which creates a static hierarchy at compile time,{' '}
              <Term word="Dynamic Behavior" definition="Behavior that can be added, removed, or changed at runtime rather than being fixed at compile time. Decorators enable dynamic behavior by letting you compose wrappers on the fly." onLearn={learnTerm} />
              {' '}through decorators lets you compose behavior at runtime. Need logging? Wrap it. Need caching too?
              Wrap it again. No need? Just use the original object directly.
            </p>

            <DeepDive id="decorator-vs-inheritance" title="Decorator vs Inheritance: The Explosion Problem" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Imagine you have a <code className="text-purple-300">DataStream</code> class and need to support encryption,
                compression, and buffering. With inheritance:
              </p>
              <div className="bg-quest-bg rounded-lg p-4 text-sm font-mono mb-3 space-y-1">
                <p className="text-quest-muted">// 7 subclasses for just 3 options!</p>
                <p>EncryptedStream</p>
                <p>CompressedStream</p>
                <p>BufferedStream</p>
                <p>EncryptedCompressedStream</p>
                <p>EncryptedBufferedStream</p>
                <p>CompressedBufferedStream</p>
                <p>EncryptedCompressedBufferedStream</p>
              </div>
              <p className="text-sm text-quest-muted mb-3">
                That is <strong>2^n - 1</strong> subclasses for n options. With 5 options, you need 31 subclasses.
                With decorators, you need just 5 decorator classes and compose them freely.
              </p>
              <div className="bg-quest-bg rounded-lg p-4 text-sm font-mono space-y-1">
                <p className="text-quest-muted">// Compose at runtime:</p>
                <p><span className="text-purple-300">new</span> EncryptionDecorator(</p>
                <p className="pl-4"><span className="text-purple-300">new</span> CompressionDecorator(</p>
                <p className="pl-8"><span className="text-purple-300">new</span> BufferDecorator(stream)</p>
                <p className="pl-4">)</p>
                <p>)</p>
              </div>
            </DeepDive>
          </div>

          {/* Coffee Decorator Interactive */}
          <div className="concept-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Gift className="text-amber-400" />
              Coffee Shop: Build Your Drink
            </h3>
            <p className="text-quest-muted mb-6">
              Each topping is a decorator that wraps the previous coffee. Click to add decorators and watch
              how the cost and description update as each layer wraps the last.
            </p>

            {/* Available decorators */}
            <div className="flex flex-wrap gap-2 mb-6">
              {coffeeDecorators.map(d => (
                <button
                  key={d.id}
                  onClick={() => addDecorator(d)}
                  disabled={coffeeStack.length >= 5}
                  className="px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300
                    hover:bg-amber-500/20 transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + {d.label} (${d.cost.toFixed(2)})
                </button>
              ))}
            </div>

            {/* Visual wrapping stack */}
            <div className="relative mb-6">
              <div className="flex flex-col items-center gap-0">
                {/* Outermost decorator on top */}
                {[...coffeeStack].reverse().map((d, visualIdx) => {
                  const depth = coffeeStack.length - 1 - visualIdx
                  return (
                    <motion.div
                      key={`${d.id}-${depth}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full rounded-xl border-2 border-dashed p-3 mb-0"
                      style={{
                        borderColor: `hsl(${30 + depth * 40}, 70%, 55%)`,
                        backgroundColor: `hsla(${30 + depth * 40}, 70%, 55%, 0.08)`,
                        marginLeft: `${depth * 12}px`,
                        marginRight: `${depth * 12}px`,
                      }}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: `hsl(${30 + depth * 40}, 70%, 65%)` }}>
                          {d.label} Decorator
                        </span>
                        <span className="text-quest-muted text-xs">+${d.cost.toFixed(2)}</span>
                      </div>
                    </motion.div>
                  )
                })}

                {/* Base coffee at center */}
                <motion.div
                  layout
                  className={`rounded-xl border-2 border-amber-600/60 bg-amber-900/30 p-4 text-center
                    ${coffeeStack.length > 0 ? 'mt-0' : ''}`}
                  style={{
                    marginLeft: `${coffeeStack.length * 12}px`,
                    marginRight: `${coffeeStack.length * 12}px`,
                    width: `calc(100% - ${coffeeStack.length * 24}px)`,
                  }}
                >
                  <p className="font-bold text-amber-300">{baseCoffee.label}</p>
                  <p className="text-xs text-quest-muted">${baseCoffee.cost.toFixed(2)}</p>
                </motion.div>
              </div>
            </div>

            {/* Result summary */}
            <motion.div
              layout
              className="bg-quest-bg rounded-lg p-4 mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-quest-muted">Total Cost:</span>
                <motion.span
                  key={totalCost}
                  initial={{ scale: 1.3, color: '#f59e0b' }}
                  animate={{ scale: 1, color: '#e5e7eb' }}
                  className="text-lg font-bold"
                >
                  ${totalCost.toFixed(2)}
                </motion.span>
              </div>
              <div>
                <span className="text-sm font-medium text-quest-muted">Description: </span>
                <span className="text-sm">{coffeeDescription}</span>
              </div>
              {coffeeStack.length > 0 && (
                <div className="mt-2">
                  <span className="text-sm font-medium text-quest-muted">Wrapping order: </span>
                  <span className="text-sm text-purple-300">
                    {coffeeStack.map(d => d.label).join(' ( ')}( {baseCoffee.label} {coffeeStack.map(() => ')').join(' ')}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Controls */}
            <div className="flex gap-3">
              <button
                onClick={removeLastDecorator}
                disabled={coffeeStack.length === 0 || coffeeAnimating}
                className="px-4 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm
                  hover:bg-quest-surface/80 transition-all disabled:opacity-40"
              >
                Remove Last
              </button>
              <button
                onClick={resetCoffee}
                disabled={coffeeStack.length === 0 || coffeeAnimating}
                className="px-4 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm
                  hover:bg-quest-surface/80 transition-all disabled:opacity-40"
              >
                Reset
              </button>
            </div>
          </div>

          <DeepDive id="open-closed" title="Open/Closed Principle and Decorators" onRead={markDeepDiveRead}>
            <p className="text-sm text-quest-muted mb-3">
              The Decorator Pattern is a textbook example of the <strong>Open/Closed Principle</strong>: classes
              should be open for extension but closed for modification. You extend behavior by wrapping, not by
              editing the original class.
            </p>
            <p className="text-sm text-quest-muted mb-3">
              Real-world uses:
            </p>
            <ul className="text-sm text-quest-muted space-y-1 ml-4 list-disc">
              <li>Java I/O streams: <code className="text-purple-300">BufferedReader(InputStreamReader(FileInputStream))</code></li>
              <li>Express.js middleware: each middleware wraps the next handler</li>
              <li>Python decorators: <code className="text-purple-300">@login_required</code> wraps a view function</li>
              <li>React Higher-Order Components: <code className="text-purple-300">withAuth(withTheme(Component))</code></li>
            </ul>
          </DeepDive>
        </motion.div>
      )}

      {/* ============ SECTION 2: PROXY PATTERN ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-blue-400" />
              The Proxy Pattern
            </h2>
            <p className="mb-4">
              The{' '}
              <Term word="Proxy Pattern" definition="A structural pattern that provides a surrogate or placeholder for another object to control access to it. The proxy has the same interface as the real object, so clients cannot tell the difference." onLearn={learnTerm} />
              {' '}provides a stand-in for another object. The proxy controls access to the real object -- it might
              delay its creation, check permissions, log calls, or cache results. The client never knows it is
              talking to a proxy.
            </p>
            <p className="mb-4">
              Unlike decorators which focus on <em>adding behavior</em>, proxies focus on <em>controlling access</em>.
              A{' '}
              <Term word="Virtual Proxy" definition="A proxy that delays the creation or loading of an expensive object until it is actually needed. Also known as a lazy-loading proxy." onLearn={learnTerm} />
              {' '}delays expensive object creation. A{' '}
              <Term word="Protection Proxy" definition="A proxy that controls access to the real object based on access rights, roles, or permissions. It acts as a security gatekeeper." onLearn={learnTerm} />
              {' '}enforces access control.
            </p>
          </div>

          {/* Proxy Types Visualization */}
          <div className="concept-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-blue-400" />
              Proxy Types
            </h3>
            <p className="text-quest-muted mb-6">
              Click on a proxy type to see its flow in action.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {proxyTypes.map(proxy => {
                const Icon = proxy.icon
                return (
                  <button
                    key={proxy.id}
                    onClick={() => runProxyDemo(proxy.id)}
                    disabled={proxyRunning}
                    className={`text-left p-4 rounded-xl border-2 transition-all
                      ${activeProxy === proxy.id
                        ? `${proxy.bg} ${proxy.border}`
                        : 'border-white/10 bg-quest-surface hover:border-white/20'
                      }
                      disabled:cursor-not-allowed`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={20} className={proxy.color} />
                      <span className="font-bold">{proxy.title}</span>
                    </div>
                    <p className="text-xs text-quest-muted">{proxy.description}</p>
                  </button>
                )
              })}
            </div>

            {/* Proxy flow animation */}
            {activeProxy && (
              <motion.div
                key={activeProxy}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-quest-bg rounded-lg p-6"
              >
                {(() => {
                  const proxy = proxyTypes.find(p => p.id === activeProxy)
                  if (!proxy) return null
                  const Icon = proxy.icon
                  return (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        <Icon size={20} className={proxy.color} />
                        <h4 className="font-bold">{proxy.title} Flow</h4>
                      </div>
                      <p className="text-sm text-quest-muted mb-4 italic">{proxy.example}</p>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        {proxy.flow.map((step, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <motion.div
                              initial={{ opacity: 0.3 }}
                              animate={{
                                opacity: proxyStep > idx ? 1 : 0.3,
                                scale: proxyStep === idx + 1 ? 1.05 : 1,
                              }}
                              transition={{ duration: 0.4 }}
                              className={`px-4 py-3 rounded-lg border text-sm font-medium
                                ${proxyStep > idx
                                  ? `${proxy.bg} ${proxy.border}`
                                  : 'border-white/10 bg-quest-surface'
                                }`}
                            >
                              <span className="text-xs text-quest-muted mr-1">{idx + 1}.</span>
                              {step}
                            </motion.div>
                            {idx < proxy.flow.length - 1 && (
                              <motion.span
                                animate={{ opacity: proxyStep > idx ? 1 : 0.2 }}
                                className={`text-lg ${proxy.color}`}
                              >
                                &rarr;
                              </motion.span>
                            )}
                          </div>
                        ))}
                      </div>
                      {proxyStep >= 4 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm text-quest-success"
                        >
                          Flow complete. The client never interacted with the real object directly.
                        </motion.p>
                      )}
                    </>
                  )
                })()}
              </motion.div>
            )}
          </div>

          {/* Virtual Proxy Demo */}
          <div className="concept-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Eye className="text-blue-400" />
              Virtual Proxy: Lazy-Loading Images
            </h3>
            <p className="text-quest-muted mb-4">
              The image proxy shows a lightweight placeholder until the real image is requested.
              Click to trigger the lazy load.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Placeholder / Image */}
              <div className="rounded-xl border-2 border-white/10 overflow-hidden h-48 flex items-center justify-center bg-quest-surface relative">
                {!imageRequested && (
                  <div className="text-center">
                    <Eye size={48} className="mx-auto text-quest-muted mb-2 opacity-40" />
                    <p className="text-sm text-quest-muted">Proxy placeholder</p>
                    <p className="text-xs text-quest-muted/60">Real image not loaded yet</p>
                  </div>
                )}
                {imageRequested && !imageLoaded && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="text-center"
                  >
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
                    <p className="text-sm text-blue-400">Proxy: fetching real image...</p>
                  </motion.div>
                )}
                {imageLoaded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center w-full h-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 flex items-center justify-center"
                  >
                    <div>
                      <Gift size={48} className="mx-auto text-purple-300 mb-2" />
                      <p className="text-sm text-purple-300 font-medium">High-res image loaded</p>
                      <p className="text-xs text-quest-muted">2400 x 1600, 3.2 MB</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Status panel */}
              <div className="bg-quest-bg rounded-lg p-4 text-sm space-y-3">
                <h4 className="font-bold text-blue-300">Proxy Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${!imageRequested ? 'bg-quest-muted' : 'bg-blue-500'}`} />
                    <span className={!imageRequested ? 'text-quest-muted' : 'text-quest-text'}>
                      Image requested
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${!imageRequested ? 'bg-quest-muted' : imageLoaded ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className={!imageRequested ? 'text-quest-muted' : 'text-quest-text'}>
                      {!imageRequested ? 'Waiting...' : imageLoaded ? 'Real object created' : 'Loading real object...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${imageLoaded ? 'bg-green-500' : 'bg-quest-muted'}`} />
                    <span className={imageLoaded ? 'text-quest-text' : 'text-quest-muted'}>
                      Proxy forwarding to real object
                    </span>
                  </div>
                </div>
                <p className="text-xs text-quest-muted pt-2 border-t border-white/5">
                  Memory saved: {imageRequested && imageLoaded ? '0 KB (image in memory)' : '3,200 KB (image not loaded)'}
                </p>
              </div>
            </div>

            <button
              onClick={requestImage}
              disabled={imageRequested && !imageLoaded}
              className="px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300
                hover:bg-blue-500/30 transition-all text-sm disabled:opacity-40"
            >
              {!imageRequested ? 'Request Image (trigger lazy load)' : imageLoaded ? 'Request Again' : 'Loading...'}
            </button>
          </div>

          {/* Protection Proxy Demo */}
          <div className="concept-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lock className="text-red-400" />
              Protection Proxy: Access Control
            </h3>
            <p className="text-quest-muted mb-4">
              The protection proxy checks your role before forwarding the request. Try accessing the admin
              panel with different roles.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm text-quest-muted">Your role:</span>
              <div className="flex gap-2">
                {['guest', 'user', 'admin'].map(role => (
                  <button
                    key={role}
                    onClick={() => { setUserRole(role); setAccessResult(null) }}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                      ${userRole === role
                        ? 'bg-red-500/20 border border-red-500/40 text-red-300'
                        : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-quest-text'
                      }`}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={checkAccess}
              className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300
                hover:bg-red-500/30 transition-all text-sm mb-4"
            >
              Access Admin Panel
            </button>

            <AnimatePresence mode="wait">
              {accessResult && (
                <motion.div
                  key={accessResult}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`rounded-lg p-4 border ${
                    accessResult === 'granted'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {accessResult === 'granted' ? (
                      <>
                        <CheckCircle size={24} className="text-green-400" />
                        <div>
                          <p className="font-bold text-green-300">Access Granted</p>
                          <p className="text-sm text-quest-muted">
                            Protection proxy verified admin role. Request forwarded to real AdminPanel object.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Lock size={24} className="text-red-400" />
                        <div>
                          <p className="font-bold text-red-300">Access Denied</p>
                          <p className="text-sm text-quest-muted">
                            Protection proxy rejected request. Role &quot;{userRole}&quot; lacks admin privileges.
                            The real object was never contacted.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DeepDive id="proxy-real-world" title="Proxies in Real Systems" onRead={markDeepDiveRead}>
            <p className="text-sm text-quest-muted mb-3">
              Proxies are everywhere in distributed systems:
            </p>
            <ul className="text-sm text-quest-muted space-y-2 ml-4 list-disc">
              <li><strong>Reverse proxies (Nginx, HAProxy)</strong> -- sit in front of servers, handling TLS termination, load balancing, and caching without the backend knowing.</li>
              <li><strong>ORM lazy loading</strong> -- Hibernate/SQLAlchemy return proxy objects for related entities. The actual database query fires only when you access a field.</li>
              <li><strong>JavaScript Proxy object</strong> -- ES6 <code className="text-purple-300">new Proxy(target, handler)</code> lets you intercept property access, function calls, and more.</li>
              <li><strong>Service mesh sidecars (Envoy)</strong> -- act as transparent proxies for microservice traffic, adding observability, retries, and mTLS.</li>
              <li><strong>Smart references</strong> -- reference-counting proxies track how many clients use an object and release it when count hits zero.</li>
            </ul>
          </DeepDive>
        </motion.div>
      )}

      {/* ============ SECTION 3: DECORATOR STACKING ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-green-400" />
              Decorator Stacking: Data Stream Pipeline
            </h2>
            <p className="text-quest-muted mb-4">
              Build a pipeline by stacking decorators on a raw data stream. Each decorator wraps the previous
              one. When data flows through, it passes through every layer on the way in (write) and every layer
              in reverse on the way out (read).
            </p>
            <p className="mb-4">
              This demonstrates how decorators compose: the <em>outermost</em> decorator is the first to touch
              incoming data and the last to touch outgoing data. Order matters -- encrypting then compressing
              is different from compressing then encrypting.
            </p>
          </div>

          {/* Available decorators */}
          <div className="concept-card">
            <h3 className="text-lg font-bold mb-3">Available Decorators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {streamDecorators.map(d => {
                const Icon = d.icon
                const isAdded = streamStack.some(s => s.id === d.id)
                return (
                  <button
                    key={d.id}
                    onClick={() => isAdded ? removeStreamDecorator(d.id) : addStreamDecorator(d)}
                    disabled={streamProcessing}
                    className={`text-left p-3 rounded-xl border transition-all
                      ${isAdded
                        ? `bg-gradient-to-r ${d.color} bg-opacity-10 ${d.border}`
                        : 'border-white/10 bg-quest-surface hover:border-white/20'
                      }
                      disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className={isAdded ? 'text-white' : 'text-quest-muted'} />
                      <span className="font-medium text-sm">{d.label}</span>
                      {isAdded && <span className="ml-auto text-xs text-white/70">Added</span>}
                    </div>
                    <p className="text-xs text-quest-muted">{d.desc}</p>
                  </button>
                )
              })}
            </div>

            {/* Input data */}
            <div className="mb-4">
              <label className="text-sm text-quest-muted mb-1 block">Input Data:</label>
              <input
                type="text"
                value={streamData}
                onChange={e => setStreamData(e.target.value)}
                disabled={streamProcessing}
                className="w-full bg-quest-bg border border-white/10 rounded-lg px-4 py-2 text-sm
                  focus:outline-none focus:border-purple-500/50"
                placeholder="Enter data to send through the pipeline..."
              />
            </div>

            {/* Visual stack */}
            {streamStack.length > 0 && (
              <div className="bg-quest-bg rounded-lg p-4 mb-4">
                <h4 className="text-sm font-bold text-quest-muted mb-3">Wrapping Order (outermost first):</h4>
                <div className="space-y-0">
                  {streamStack.map((d, i) => {
                    const Icon = d.icon
                    return (
                      <motion.div
                        key={d.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center gap-2 rounded-lg border-l-4 p-2 ml-${Math.min(i * 4, 16)}`}
                        style={{
                          borderLeftColor: `hsl(${i * 60 + 0}, 60%, 55%)`,
                          marginLeft: `${i * 16}px`,
                        }}
                      >
                        <Icon size={14} />
                        <span className="text-sm font-medium">{d.label}</span>
                        <span className="text-xs text-quest-muted ml-auto">{d.effect}</span>
                      </motion.div>
                    )
                  })}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: streamStack.length * 0.1 }}
                    className="flex items-center gap-2 rounded-lg border-l-4 border-white/30 p-2 bg-white/5"
                    style={{ marginLeft: `${streamStack.length * 16}px` }}
                  >
                    <span className="text-sm font-medium text-quest-muted">Raw Stream (core)</span>
                  </motion.div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-quest-muted font-mono">
                    <span className="text-purple-300">new</span>{' '}
                    {streamStack.map(d => `${d.label.replace(/\s/g, '')}Decorator(`).join('')}
                    <span className="text-amber-300">RawStream</span>
                    {streamStack.map(() => ')').join('')}
                  </p>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={processStream}
                disabled={streamStack.length === 0 || streamProcessing}
                className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300
                  hover:bg-green-500/30 transition-all text-sm disabled:opacity-40"
              >
                {streamProcessing ? 'Processing...' : 'Send Data Through Pipeline'}
              </button>
              <button
                onClick={resetStreamStack}
                disabled={streamProcessing}
                className="px-4 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm
                  hover:bg-quest-surface/80 transition-all disabled:opacity-40"
              >
                Reset Pipeline
              </button>
            </div>

            {/* Processing steps */}
            {streamSteps.length > 0 && (
              <div className="bg-quest-bg rounded-lg p-4">
                <h4 className="text-sm font-bold text-quest-muted mb-3">Data Flow:</h4>
                <div className="space-y-2">
                  {streamSteps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-3 text-sm p-2 rounded-lg
                        ${step.phase === 'write'
                          ? 'bg-blue-500/10 border border-blue-500/20'
                          : step.phase === 'core'
                            ? 'bg-amber-500/10 border border-amber-500/20'
                            : 'bg-green-500/10 border border-green-500/20'
                        }`}
                      style={{ marginLeft: `${step.depth * 20}px` }}
                    >
                      <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                        step.phase === 'write' ? 'bg-blue-500/20 text-blue-300'
                          : step.phase === 'core' ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-green-500/20 text-green-300'
                      }`}>
                        {step.phase === 'write' ? 'WRITE' : step.phase === 'core' ? 'CORE' : 'READ'}
                      </span>
                      <span className="font-medium">{step.decorator}</span>
                      <span className="text-quest-muted ml-auto">{step.effect}</span>
                    </motion.div>
                  ))}
                </div>
                {!streamProcessing && streamSteps.length > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-quest-success mt-3 pt-3 border-t border-white/5"
                  >
                    Pipeline complete. Data passed through {streamStack.length} decorator(s) on write,
                    hit the core stream, then unwound through {streamStack.length} decorator(s) on read.
                  </motion.p>
                )}
              </div>
            )}
          </div>

          <DeepDive id="decorator-order" title="Why Decorator Order Matters" onRead={markDeepDiveRead}>
            <p className="text-sm text-quest-muted mb-3">
              Consider encrypting vs compressing a stream:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-quest-bg rounded-lg p-3">
                <p className="text-sm font-bold text-green-300 mb-2">Compress then Encrypt (good)</p>
                <ol className="text-xs text-quest-muted space-y-1 ml-4 list-decimal">
                  <li>Compression finds patterns in plaintext, achieves high ratio</li>
                  <li>Encryption scrambles the compressed data</li>
                  <li>Result: small and secure</li>
                </ol>
              </div>
              <div className="bg-quest-bg rounded-lg p-3">
                <p className="text-sm font-bold text-red-300 mb-2">Encrypt then Compress (bad)</p>
                <ol className="text-xs text-quest-muted space-y-1 ml-4 list-decimal">
                  <li>Encryption scrambles plaintext into random-looking data</li>
                  <li>Compression finds no patterns in ciphertext</li>
                  <li>Result: still large, with wasted CPU on useless compression</li>
                </ol>
              </div>
            </div>
            <p className="text-sm text-quest-muted mt-3">
              This is why understanding the wrapping order is critical. The innermost decorator operates on
              the raw data; the outermost operates on the fully transformed data.
            </p>
          </DeepDive>

          <DeepDive id="decorator-vs-proxy" title="Decorator vs Proxy: When to Use Which?" onRead={markDeepDiveRead}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-white/10">
                    <th className="pb-2 pr-4 text-quest-muted">Aspect</th>
                    <th className="pb-2 pr-4 text-purple-300">Decorator</th>
                    <th className="pb-2 text-blue-300">Proxy</th>
                  </tr>
                </thead>
                <tbody className="text-quest-muted">
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Purpose</td>
                    <td className="py-2 pr-4">Add behavior</td>
                    <td className="py-2">Control access</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Who creates the wrapped object?</td>
                    <td className="py-2 pr-4">Client passes it in</td>
                    <td className="py-2">Proxy creates or manages it</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Stacking</td>
                    <td className="py-2 pr-4">Multiple layers common</td>
                    <td className="py-2">Usually one layer</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">Client awareness</td>
                    <td className="py-2 pr-4">Client builds the chain</td>
                    <td className="py-2">Client unaware of proxy</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">Examples</td>
                    <td className="py-2 pr-4">Java I/O, middleware</td>
                    <td className="py-2">Lazy loading, auth, caching</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ============ SECTION 4: QUIZ ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Shield className="text-purple-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Decorators and proxies are subtle but powerful. Let's make sure you know when and how to use each!
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
                <h3 className="text-xl font-bold mb-2">Level 35 Complete!</h3>
                <p className="text-quest-muted mb-2">
                  You scored {score}/{quizQuestions.length}.
                </p>
                <p className="text-quest-muted mb-4">
                  You now understand the Decorator and Proxy patterns -- how decorators compose behavior
                  dynamically without subclass explosion, and how proxies control access to objects transparently.
                  You know when to reach for each pattern and how they differ from adapters and inheritance.
                </p>
                <p className="text-sm text-purple-400">
                  Wrap it up: add behavior with decorators, control access with proxies, and keep your code flexible.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

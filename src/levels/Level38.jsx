import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle, Eye, Bell,
  Radio, Users, MessageSquare, TrendingUp, TrendingDown
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

/* ── Constants ── */

const STOCKS = [
  { symbol: 'SCLE', name: 'ScaleQuest Inc.', basePrice: 142.50, volatility: 0.025 },
  { symbol: 'DSYN', name: 'DesignSync Corp.', basePrice: 87.30, volatility: 0.035 },
  { symbol: 'CACH', name: 'CacheFlow Ltd.', basePrice: 215.80, volatility: 0.02 },
]

const CHAT_USERS = [
  { id: 'alice', name: 'Alice', color: '#4ade80' },
  { id: 'bob', name: 'Bob', color: '#60a5fa' },
  { id: 'carol', name: 'Carol', color: '#fbbf24' },
  { id: 'dave', name: 'Dave', color: '#f472b6' },
]

const PRESET_MESSAGES = [
  { from: 'alice', text: 'Has anyone looked at the new microservices design?' },
  { from: 'bob', text: 'Yes! The event-driven approach looks promising.' },
  { from: 'carol', text: 'I agree, but we need to consider the mediator for service coordination.' },
  { from: 'dave', text: 'Good point. A central mediator would simplify inter-service communication.' },
  { from: 'alice', text: 'Exactly - no service needs to know about the others directly.' },
  { from: 'bob', text: 'That reduces coupling significantly.' },
]

const quizQuestions = [
  {
    id: 'q1',
    question: 'In the Observer pattern, what role does the Subject play?',
    options: [
      { id: 'a', text: 'It observes changes in other objects', correct: false },
      { id: 'b', text: 'It maintains a list of dependents and notifies them of state changes', correct: true },
      { id: 'c', text: 'It mediates communication between observers', correct: false },
      { id: 'd', text: 'It transforms data before passing it to subscribers', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What problem does the Mediator pattern primarily solve?',
    options: [
      { id: 'a', text: 'Reducing memory usage through shared state', correct: false },
      { id: 'b', text: 'Enabling lazy initialization of objects', correct: false },
      { id: 'c', text: 'Reducing chaotic dependencies between many interacting objects', correct: true },
      { id: 'd', text: 'Allowing objects to change behavior based on internal state', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'How does an Observer unsubscribe from notifications?',
    options: [
      { id: 'a', text: 'By deleting the Subject', correct: false },
      { id: 'b', text: 'By calling the Subject\'s detach/unsubscribe method', correct: true },
      { id: 'c', text: 'Observers cannot unsubscribe once registered', correct: false },
      { id: 'd', text: 'By sending a special "stop" message to the Mediator', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Which real-world system is a classic example of the Observer pattern?',
    options: [
      { id: 'a', text: 'A database connection pool', correct: false },
      { id: 'b', text: 'A file compression utility', correct: false },
      { id: 'c', text: 'An event-driven UI framework or pub/sub messaging system', correct: true },
      { id: 'd', text: 'A binary search tree', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is the key difference between Observer and Mediator?',
    options: [
      { id: 'a', text: 'Observer is for UI only; Mediator is for backend only', correct: false },
      { id: 'b', text: 'Observer has one-to-many broadcast; Mediator centralizes many-to-many coordination', correct: true },
      { id: 'c', text: 'Mediator is a structural pattern; Observer is a creational pattern', correct: false },
      { id: 'd', text: 'They are identical patterns with different names', correct: false },
    ],
  },
]

/* ── Stock Price Generator ── */

function generateNextPrice(currentPrice, volatility) {
  const change = (Math.random() - 0.48) * volatility * currentPrice
  const newPrice = Math.max(1, currentPrice + change)
  return Math.round(newPrice * 100) / 100
}

/* ── Main Component ── */

export default function Level38({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  // Sections: 'intro' | 'observer-sim' | 'mediator-sim' | 'quiz' | 'complete'
  const [section, setSection] = useState('intro')

  /* ── Observer Simulation State ── */
  const [stockPrices, setStockPrices] = useState(
    STOCKS.map(s => ({ ...s, price: s.basePrice, history: [s.basePrice] }))
  )
  const [isTickerRunning, setIsTickerRunning] = useState(false)
  const [tickCount, setTickCount] = useState(0)
  const [observers, setObservers] = useState({
    chart: true,
    alerts: true,
    logger: true,
  })
  const [alerts, setAlerts] = useState([])
  const [logEntries, setLogEntries] = useState([])
  const [selectedStock, setSelectedStock] = useState(0)
  const [alertThreshold, setAlertThreshold] = useState(3)
  const [observerInteracted, setObserverInteracted] = useState(false)

  /* ── Mediator Simulation State ── */
  const [chatMessages, setChatMessages] = useState([])
  const [activeUsers, setActiveUsers] = useState(
    CHAT_USERS.map(u => ({ ...u, active: true }))
  )
  const [presetIndex, setPresetIndex] = useState(0)
  const [mediatorLog, setMediatorLog] = useState([])
  const [mediatorInteracted, setMediatorInteracted] = useState(false)

  /* ── Quiz State ── */
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  /* ── Observer: Tick engine ── */
  useEffect(() => {
    if (!isTickerRunning) return

    const interval = setInterval(() => {
      setStockPrices(prev => prev.map(stock => {
        const newPrice = generateNextPrice(stock.price, stock.volatility)
        const newHistory = [...stock.history.slice(-29), newPrice]
        return { ...stock, price: newPrice, history: newHistory }
      }))
      setTickCount(c => c + 1)
    }, 800)

    return () => clearInterval(interval)
  }, [isTickerRunning])

  /* ── Observer: Notify observers on price change ── */
  useEffect(() => {
    if (tickCount === 0) return

    stockPrices.forEach(stock => {
      const history = stock.history
      if (history.length < 2) return
      const prevPrice = history[history.length - 2]
      const currentPrice = history[history.length - 1]
      const changePercent = ((currentPrice - prevPrice) / prevPrice) * 100

      // Alert observer
      if (observers.alerts && Math.abs(changePercent) >= alertThreshold) {
        const direction = changePercent > 0 ? 'up' : 'down'
        setAlerts(prev => [
          {
            id: Date.now() + stock.symbol,
            symbol: stock.symbol,
            change: changePercent.toFixed(2),
            direction,
            price: currentPrice,
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 12))
      }

      // Logger observer
      if (observers.logger) {
        setLogEntries(prev => [
          {
            id: Date.now() + stock.symbol + '-log',
            symbol: stock.symbol,
            price: currentPrice,
            change: changePercent.toFixed(2),
            time: new Date().toLocaleTimeString(),
          },
          ...prev,
        ].slice(0, 20))
      }
    })
  }, [tickCount]) // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Mediator: Send message through mediator ── */
  const sendThroughMediator = useCallback((fromId, text) => {
    const sender = CHAT_USERS.find(u => u.id === fromId)
    if (!sender) return

    const recipients = activeUsers
      .filter(u => u.active && u.id !== fromId)
      .map(u => u.name)

    // Log mediator routing
    setMediatorLog(prev => [
      {
        id: Date.now(),
        action: `Routed message from ${sender.name} to [${recipients.join(', ')}]`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ].slice(0, 15))

    // Deliver message to active users only
    setChatMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        from: sender,
        text,
        deliveredTo: recipients,
        time: new Date().toLocaleTimeString(),
      },
    ].slice(-20))

    setMediatorInteracted(true)
  }, [activeUsers])

  const sendNextPreset = useCallback(() => {
    if (presetIndex >= PRESET_MESSAGES.length) return
    const msg = PRESET_MESSAGES[presetIndex]
    sendThroughMediator(msg.from, msg.text)
    setPresetIndex(prev => prev + 1)
  }, [presetIndex, sendThroughMediator])

  const toggleUser = useCallback((userId) => {
    setActiveUsers(prev => prev.map(u =>
      u.id === userId ? { ...u, active: !u.active } : u
    ))
    setMediatorInteracted(true)

    const user = CHAT_USERS.find(u => u.id === userId)
    const wasActive = activeUsers.find(u => u.id === userId)?.active
    setMediatorLog(prev => [
      {
        id: Date.now(),
        action: `${user.name} ${wasActive ? 'left' : 'joined'} the chat room`,
        time: new Date().toLocaleTimeString(),
      },
      ...prev,
    ].slice(0, 15))
  }, [activeUsers])

  /* ── Quiz ── */
  const handleAnswer = (questionId, optionId) => {
    if (showResults) return
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const allAnswered = Object.keys(answers).length === quizQuestions.length
  const correctCount = quizQuestions.filter(
    q => q.options.find(o => o.id === answers[q.id])?.correct
  ).length

  const handleQuizSubmit = () => {
    setShowResults(true)
    if (correctCount >= 3) {
      setTimeout(() => setSection('complete'), 1200)
    }
  }

  /* ── Completion ── */
  useEffect(() => {
    if (section === 'complete' && !isCompleted) {
      onComplete?.()
    }
  }, [section, isCompleted, onComplete])

  /* ── Progress ── */
  const sectionOrder = ['intro', 'observer-sim', 'mediator-sim', 'quiz', 'complete']
  const progressPercent = Math.round((sectionOrder.indexOf(section) / (sectionOrder.length - 1)) * 100)

  /* ── Mini Sparkline ── */
  const Sparkline = ({ data, width = 120, height = 32, color = '#4ade80' }) => {
    if (data.length < 2) return null
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / range) * height
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={width} height={height} className="inline-block">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  /* ── RENDER ── */
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-quest-muted mb-2">
          <span>Level 38: Watch and React</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-bar h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-quest-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* ═══════════════════ INTRO ═══════════════════ */}
      {section === 'intro' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="concept-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={28} className="text-quest-primary" />
              <h2 className="text-2xl font-bold">Observer & Mediator Patterns</h2>
            </div>

            <p className="text-quest-text mb-4">
              In distributed systems, components must react to changes and coordinate with each
              other without becoming tightly coupled. The{' '}
              <Term word="Observer Pattern" definition="A behavioral design pattern where an object (Subject) maintains a list of dependents (Observers) and automatically notifies them of state changes, enabling one-to-many communication." onLearn={learnTerm} />{' '}
              and{' '}
              <Term word="Mediator Pattern" definition="A behavioral pattern that reduces chaotic dependencies between objects by introducing a mediator object that centralizes communication, so objects don't refer to each other directly." onLearn={learnTerm} />{' '}
              solve this in complementary ways.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20">
                <h3 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                  <Eye size={16} /> Observer (Pub/Sub)
                </h3>
                <ul className="text-sm text-quest-muted space-y-1">
                  <li>One-to-many dependency</li>
                  <li>Subject broadcasts state changes</li>
                  <li>Observers subscribe/unsubscribe freely</li>
                  <li>Loose coupling between subject and observers</li>
                </ul>
              </div>
              <div className="bg-quest-bg rounded-lg p-4 border border-blue-500/20">
                <h3 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                  <Radio size={16} /> Mediator
                </h3>
                <ul className="text-sm text-quest-muted space-y-1">
                  <li>Many-to-many coordination</li>
                  <li>Central hub routes all communication</li>
                  <li>Components only know the mediator</li>
                  <li>Reduces N*(N-1) connections to N</li>
                </ul>
              </div>
            </div>

            <p className="text-quest-text mb-4">
              Think of a{' '}
              <Term word="Subject" definition="The object being observed. It holds state and notifies registered observers when that state changes. Also called Publisher or Event Emitter." onLearn={learnTerm} />{' '}
              as a newspaper publisher: subscribers receive the paper automatically when a new
              edition is printed. They don't need to check every day -- the publisher pushes
              updates. Meanwhile, a{' '}
              <Term word="Mediator" definition="A central coordinator object that encapsulates how a set of objects interact. Instead of objects communicating directly, they send messages through the mediator." onLearn={learnTerm} />{' '}
              is like an air traffic control tower: planes don't communicate with each other
              directly but through the tower, which coordinates safe movement for all.
            </p>

            <DeepDive id="observer-internals" title="How the Observer Pattern Works Internally" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  The Observer pattern consists of a <strong className="text-quest-text">Subject</strong> (the
                  thing being watched) and one or more <strong className="text-quest-text">Observers</strong> (the
                  watchers). The Subject maintains an internal list of observers and provides methods
                  to attach, detach, and notify them.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <div className="text-emerald-400">class StockTicker {'{'}</div>
                  <div className="ml-4 text-quest-muted">observers = []</div>
                  <div className="ml-4 text-quest-muted">price = 0</div>
                  <div className="ml-4 text-blue-400">subscribe(observer) {'{'} this.observers.push(observer) {'}'}</div>
                  <div className="ml-4 text-blue-400">unsubscribe(observer) {'{'} this.observers = this.observers.filter(o =&gt; o !== observer) {'}'}</div>
                  <div className="ml-4 text-yellow-400">setPrice(newPrice) {'{'}</div>
                  <div className="ml-8 text-quest-muted">this.price = newPrice</div>
                  <div className="ml-8 text-quest-muted">this.observers.forEach(o =&gt; o.update(this.price))</div>
                  <div className="ml-4 text-yellow-400">{'}'}</div>
                  <div className="text-emerald-400">{'}'}</div>
                </div>
                <p>
                  When the subject's state changes, it iterates over its observer list and calls
                  each observer's update method. Observers can be added or removed at any time,
                  making the system highly flexible.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="mediator-internals" title="How the Mediator Pattern Works Internally" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  Without a mediator, N components each talking to every other component creates
                  N*(N-1)/2 direct connections. The mediator reduces this to N connections -- one
                  from each component to the mediator.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <div className="text-blue-400">class ChatRoom {'{'}</div>
                  <div className="ml-4 text-quest-muted">users = new Map()</div>
                  <div className="ml-4 text-emerald-400">register(user) {'{'} this.users.set(user.id, user) {'}'}</div>
                  <div className="ml-4 text-emerald-400">unregister(userId) {'{'} this.users.delete(userId) {'}'}</div>
                  <div className="ml-4 text-yellow-400">send(message, fromId) {'{'}</div>
                  <div className="ml-8 text-quest-muted">this.users.forEach((user, id) =&gt; {'{'}</div>
                  <div className="ml-12 text-quest-muted">if (id !== fromId) user.receive(message)</div>
                  <div className="ml-8 text-quest-muted">{'}'})</div>
                  <div className="ml-4 text-yellow-400">{'}'}</div>
                  <div className="text-blue-400">{'}'}</div>
                </div>
                <p>
                  The mediator encapsulates the interaction logic. Components (colleagues) only
                  reference the mediator, never each other. This makes it easy to change how
                  components interact by modifying the mediator alone.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="real-world-uses" title="Real-World Applications" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p><strong className="text-emerald-400">Observer Pattern:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>React's useState/useEffect hooks (component re-renders on state change)</li>
                  <li>Event listeners in DOM (addEventListener/removeEventListener)</li>
                  <li>Message queues like Kafka (producers publish, consumers subscribe)</li>
                  <li>WebSocket connections broadcasting real-time data</li>
                  <li>Redux store notifying connected components</li>
                </ul>
                <p className="mt-3"><strong className="text-blue-400">Mediator Pattern:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Chat room servers routing messages between users</li>
                  <li>Air traffic control coordinating aircraft</li>
                  <li>API gateways mediating between microservices</li>
                  <li>MVC frameworks where the controller mediates between model and view</li>
                  <li>Middleware in Express.js coordinating request handling</li>
                </ul>
              </div>
            </DeepDive>

            <button
              onClick={() => setSection('observer-sim')}
              className="btn-primary px-6 py-3 rounded-lg font-semibold mt-4"
            >
              Try the Observer Simulation
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ OBSERVER SIMULATION ═══════════════════ */}
      {section === 'observer-sim' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="concept-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={24} className="text-emerald-400" />
              <h2 className="text-xl font-bold">Stock Ticker - Observer Pattern</h2>
            </div>

            <p className="text-sm text-quest-muted mb-4">
              A <Term word="Stock Ticker" definition="A Subject that broadcasts real-time price changes. Multiple Observers (chart, alerts, logger) subscribe to receive updates independently." onLearn={learnTerm} />{' '}
              is a perfect example of the Observer pattern. The ticker (Subject) generates price
              changes, and multiple observers react independently. Toggle observers on/off to see
              decoupled notification in action.
            </p>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={() => { setIsTickerRunning(!isTickerRunning); setObserverInteracted(true) }}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                  isTickerRunning
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                    : 'btn-primary'
                }`}
              >
                {isTickerRunning ? 'Stop Ticker' : 'Start Ticker'}
              </button>

              <div className="flex items-center gap-2 text-xs text-quest-muted">
                <span>Ticks: {tickCount}</span>
              </div>

              <div className="flex items-center gap-2 ml-auto text-xs">
                <label className="text-quest-muted">Alert threshold:</label>
                <select
                  value={alertThreshold}
                  onChange={e => setAlertThreshold(Number(e.target.value))}
                  className="bg-quest-bg border border-white/10 rounded px-2 py-1 text-quest-text text-xs"
                >
                  <option value={1}>1%</option>
                  <option value={2}>2%</option>
                  <option value={3}>3%</option>
                  <option value={5}>5%</option>
                </select>
              </div>
            </div>

            {/* Observer Toggles */}
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'chart', label: 'Chart Observer', icon: TrendingUp, color: 'emerald' },
                { key: 'alerts', label: 'Alert Observer', icon: Bell, color: 'amber' },
                { key: 'logger', label: 'Log Observer', icon: MessageSquare, color: 'blue' },
              ].map(({ key, label, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => {
                    setObservers(prev => ({ ...prev, [key]: !prev[key] }))
                    setObserverInteracted(true)
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all ${
                    observers[key]
                      ? `bg-${color}-500/20 border-${color}-500/40 text-${color}-400`
                      : 'bg-quest-bg border-white/10 text-quest-muted opacity-50'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                  <span className="text-xs ml-1">
                    {observers[key] ? '(subscribed)' : '(unsubscribed)'}
                  </span>
                </button>
              ))}
            </div>

            {/* Stock Tabs */}
            <div className="flex gap-1 mb-4">
              {stockPrices.map((stock, idx) => (
                <button
                  key={stock.symbol}
                  onClick={() => setSelectedStock(idx)}
                  className={`px-3 py-2 rounded-t-lg text-sm font-mono transition-colors ${
                    selectedStock === idx
                      ? 'bg-quest-surface text-quest-primary border border-b-0 border-quest-primary/30'
                      : 'bg-quest-bg text-quest-muted hover:text-quest-text'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{stock.symbol}</span>
                    <span className={`text-xs ${
                      stock.history.length >= 2 && stock.history[stock.history.length - 1] >= stock.history[stock.history.length - 2]
                        ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      ${stock.price.toFixed(2)}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Chart Observer Panel */}
            <AnimatePresence>
              {observers.chart && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20 mb-4">
                    <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <TrendingUp size={14} />
                      Chart Observer - {stockPrices[selectedStock].name}
                    </h4>

                    <div className="flex items-end gap-4">
                      {/* Price chart */}
                      <div className="flex-1 bg-quest-surface/50 rounded p-3 h-28 flex items-center justify-center">
                        {stockPrices[selectedStock].history.length < 2 ? (
                          <span className="text-xs text-quest-muted">Start the ticker to see price data...</span>
                        ) : (
                          <div className="w-full h-full flex items-end">
                            {stockPrices[selectedStock].history.map((price, i) => {
                              const history = stockPrices[selectedStock].history
                              const min = Math.min(...history)
                              const max = Math.max(...history)
                              const range = max - min || 1
                              const heightPct = ((price - min) / range) * 100
                              const isUp = i > 0 && price >= history[i - 1]
                              return (
                                <motion.div
                                  key={i}
                                  className="flex-1 mx-px rounded-t-sm"
                                  style={{
                                    height: `${Math.max(5, heightPct)}%`,
                                    backgroundColor: isUp ? '#4ade80' : '#f87171',
                                    opacity: 0.3 + (i / history.length) * 0.7,
                                  }}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${Math.max(5, heightPct)}%` }}
                                  transition={{ duration: 0.3 }}
                                />
                              )
                            })}
                          </div>
                        )}
                      </div>

                      {/* Current price display */}
                      <div className="text-right min-w-[100px]">
                        <div className="text-2xl font-bold font-mono">
                          ${stockPrices[selectedStock].price.toFixed(2)}
                        </div>
                        {stockPrices[selectedStock].history.length >= 2 && (
                          <div className={`text-sm flex items-center justify-end gap-1 ${
                            stockPrices[selectedStock].price >= stockPrices[selectedStock].basePrice
                              ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {stockPrices[selectedStock].price >= stockPrices[selectedStock].basePrice
                              ? <TrendingUp size={12} />
                              : <TrendingDown size={12} />
                            }
                            {(((stockPrices[selectedStock].price - stockPrices[selectedStock].basePrice) / stockPrices[selectedStock].basePrice) * 100).toFixed(2)}%
                          </div>
                        )}
                      </div>
                    </div>

                    {/* All stocks sparklines */}
                    <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-white/5">
                      {stockPrices.map((stock, idx) => (
                        <div key={stock.symbol} className="flex items-center gap-2">
                          <span className="text-xs font-mono text-quest-muted w-10">{stock.symbol}</span>
                          <Sparkline
                            data={stock.history}
                            width={80}
                            height={20}
                            color={stock.price >= stock.basePrice ? '#4ade80' : '#f87171'}
                          />
                          <span className="text-xs font-mono text-quest-text">
                            ${stock.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Alert Observer Panel */}
            <AnimatePresence>
              {observers.alerts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-quest-bg rounded-lg p-4 border border-amber-500/20 mb-4">
                    <h4 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                      <Bell size={14} />
                      Alert Observer (triggers at {alertThreshold}%+ change)
                    </h4>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {alerts.length === 0 ? (
                        <span className="text-xs text-quest-muted">No alerts yet. Start the ticker and wait for significant price movements...</span>
                      ) : (
                        alerts.map(alert => (
                          <motion.div
                            key={alert.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-xs font-mono px-2 py-1 rounded flex items-center gap-2 ${
                              alert.direction === 'up'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : 'bg-red-500/10 text-red-400'
                            }`}
                          >
                            {alert.direction === 'up' ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            <span className="font-semibold">{alert.symbol}</span>
                            <span>{alert.direction === 'up' ? '+' : ''}{alert.change}%</span>
                            <span className="text-quest-muted ml-auto">${alert.price.toFixed(2)} at {alert.time}</span>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logger Observer Panel */}
            <AnimatePresence>
              {observers.logger && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-quest-bg rounded-lg p-4 border border-blue-500/20 mb-4">
                    <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <MessageSquare size={14} />
                      Logger Observer (all price updates)
                    </h4>
                    <div className="max-h-32 overflow-y-auto font-mono text-xs space-y-px">
                      {logEntries.length === 0 ? (
                        <span className="text-quest-muted">Awaiting price updates...</span>
                      ) : (
                        logEntries.map(entry => (
                          <motion.div
                            key={entry.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-quest-muted flex gap-2"
                          >
                            <span className="text-quest-text/50">[{entry.time}]</span>
                            <span className="text-blue-400 w-10">{entry.symbol}</span>
                            <span>${entry.price.toFixed(2)}</span>
                            <span className={Number(entry.change) >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                              ({Number(entry.change) >= 0 ? '+' : ''}{entry.change}%)
                            </span>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Observer pattern explanation box */}
            <div className="bg-quest-surface/50 rounded-lg p-4 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold text-quest-primary mb-2">What's happening here?</h4>
              <ul className="text-sm text-quest-muted space-y-1">
                <li>
                  The <strong className="text-quest-text">Stock Ticker</strong> is the{' '}
                  <Term word="Subject" definition="The object being observed. It holds state and notifies registered observers when that state changes." onLearn={learnTerm} />{' '}
                  -- it generates price changes.
                </li>
                <li>
                  The Chart, Alert, and Logger panels are{' '}
                  <Term word="Observers" definition="Objects that register with a Subject to receive notifications when the Subject's state changes. Each observer can react differently to the same event." onLearn={learnTerm} />{' '}
                  -- each reacts differently to the same price data.
                </li>
                <li>
                  Toggle observers on/off to see{' '}
                  <Term word="Subscribe/Unsubscribe" definition="The mechanism by which observers register or deregister from a subject's notification list. This enables dynamic, runtime configuration of who receives updates." onLearn={learnTerm} />{' '}
                  in action -- the ticker doesn't care who's listening.
                </li>
              </ul>
            </div>

            <button
              onClick={() => { setIsTickerRunning(false); setSection('mediator-sim') }}
              className="btn-primary px-6 py-3 rounded-lg font-semibold"
              disabled={!observerInteracted}
            >
              {observerInteracted ? 'Continue to Mediator Pattern' : 'Interact with the ticker first'}
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ MEDIATOR SIMULATION ═══════════════════ */}
      {section === 'mediator-sim' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="concept-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Radio size={24} className="text-blue-400" />
              <h2 className="text-xl font-bold">Chat Room - Mediator Pattern</h2>
            </div>

            <p className="text-sm text-quest-muted mb-4">
              A{' '}
              <Term word="Chat Room" definition="A classic Mediator example. Users (colleagues) send messages to the chat room (mediator), which routes them to all other active users. No user needs a reference to any other user." onLearn={learnTerm} />{' '}
              is the classic Mediator example. Users don't send messages to each other directly --
              they send to the chat room, which routes messages to all other active participants.
              Toggle users on/off to see how the mediator adapts routing.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* User panel */}
              <div className="bg-quest-bg rounded-lg p-4 border border-blue-500/20">
                <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  <Users size={14} />
                  Participants (Colleagues)
                </h4>
                <div className="space-y-2">
                  {activeUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => toggleUser(user.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-all ${
                        user.active
                          ? 'bg-quest-surface border border-white/10'
                          : 'bg-quest-bg border border-white/5 opacity-40'
                      }`}
                    >
                      <div
                        className="w-3 h-3 rounded-full transition-opacity"
                        style={{ backgroundColor: user.color, opacity: user.active ? 1 : 0.3 }}
                      />
                      <span className={user.active ? 'text-quest-text' : 'text-quest-muted line-through'}>
                        {user.name}
                      </span>
                      <span className="text-xs text-quest-muted ml-auto">
                        {user.active ? 'online' : 'offline'}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <p className="text-xs text-quest-muted mb-2">
                    Without mediator: {activeUsers.filter(u => u.active).length * (activeUsers.filter(u => u.active).length - 1)} direct connections
                  </p>
                  <p className="text-xs text-emerald-400">
                    With mediator: {activeUsers.filter(u => u.active).length} connections
                  </p>
                </div>
              </div>

              {/* Chat messages */}
              <div className="md:col-span-2 bg-quest-bg rounded-lg p-4 border border-white/10">
                <h4 className="text-sm font-semibold text-quest-text mb-3 flex items-center gap-2">
                  <MessageSquare size={14} />
                  Chat Room (Mediator)
                </h4>

                <div className="h-56 overflow-y-auto space-y-2 mb-3 p-2 bg-quest-surface/30 rounded">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-quest-muted">Send a message to see the mediator route it...</span>
                    </div>
                  ) : (
                    chatMessages.map(msg => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm"
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: msg.from.color }}
                          />
                          <div className="flex-1">
                            <span className="font-semibold text-quest-text" style={{ color: msg.from.color }}>
                              {msg.from.name}
                            </span>
                            <span className="text-quest-muted ml-2">{msg.text}</span>
                            <div className="text-[10px] text-quest-muted/50 mt-0.5">
                              Delivered to: {msg.deliveredTo.length > 0 ? msg.deliveredTo.join(', ') : '(no active recipients)'}
                            </div>
                          </div>
                          <span className="text-[10px] text-quest-muted/50 shrink-0">{msg.time}</span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Send preset message */}
                <div className="flex gap-2">
                  <button
                    onClick={sendNextPreset}
                    disabled={presetIndex >= PRESET_MESSAGES.length}
                    className="btn-primary px-4 py-2 rounded text-sm flex-1 disabled:opacity-30"
                  >
                    {presetIndex >= PRESET_MESSAGES.length
                      ? 'All messages sent'
                      : `Send Message (${PRESET_MESSAGES[presetIndex].from}): "${PRESET_MESSAGES[presetIndex].text.slice(0, 30)}..."`
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* Mediator routing log */}
            <div className="bg-quest-bg rounded-lg p-4 border border-purple-500/20 mb-6">
              <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <Radio size={14} />
                Mediator Routing Log
              </h4>
              <div className="max-h-28 overflow-y-auto space-y-1 font-mono text-xs">
                {mediatorLog.length === 0 ? (
                  <span className="text-quest-muted">No routing events yet...</span>
                ) : (
                  mediatorLog.map(entry => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-quest-muted"
                    >
                      <span className="text-quest-text/50">[{entry.time}]</span>{' '}
                      <span className="text-purple-400">{entry.action}</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Connection diagram */}
            <div className="bg-quest-surface/50 rounded-lg p-4 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold text-quest-primary mb-3">Connection Topology</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Without mediator */}
                <div>
                  <p className="text-xs text-red-400 mb-2 font-semibold">Without Mediator (mesh)</p>
                  <div className="bg-quest-bg rounded p-4 h-36 relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
                      {/* Draw connections between all active users */}
                      {activeUsers.filter(u => u.active).map((u1, i) =>
                        activeUsers.filter(u => u.active).slice(i + 1).map((u2, j) => {
                          const activeList = activeUsers.filter(u => u.active)
                          const positions = activeList.map((_, idx) => ({
                            x: 40 + (idx % 2) * 120,
                            y: 25 + Math.floor(idx / 2) * 70,
                          }))
                          const idx1 = activeList.indexOf(u1)
                          const idx2 = activeList.indexOf(u2)
                          return (
                            <line
                              key={`${u1.id}-${u2.id}`}
                              x1={positions[idx1]?.x} y1={positions[idx1]?.y}
                              x2={positions[idx2]?.x} y2={positions[idx2]?.y}
                              stroke="#f87171"
                              strokeWidth="1"
                              opacity="0.5"
                            />
                          )
                        })
                      )}
                      {activeUsers.filter(u => u.active).map((user, idx) => {
                        const x = 40 + (idx % 2) * 120
                        const y = 25 + Math.floor(idx / 2) * 70
                        return (
                          <g key={user.id}>
                            <circle cx={x} cy={y} r="12" fill={user.color} opacity="0.8" />
                            <text x={x} y={y + 4} textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">
                              {user.name[0]}
                            </text>
                          </g>
                        )
                      })}
                    </svg>
                  </div>
                </div>

                {/* With mediator */}
                <div>
                  <p className="text-xs text-emerald-400 mb-2 font-semibold">With Mediator (star)</p>
                  <div className="bg-quest-bg rounded p-4 h-36 relative">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
                      {/* Mediator center */}
                      {activeUsers.filter(u => u.active).map((user, idx) => {
                        const activeCount = activeUsers.filter(u => u.active).length
                        const angle = (idx / activeCount) * Math.PI * 2 - Math.PI / 2
                        const x = 100 + Math.cos(angle) * 45
                        const y = 60 + Math.sin(angle) * 40
                        return (
                          <g key={user.id}>
                            <line x1={100} y1={60} x2={x} y2={y} stroke="#4ade80" strokeWidth="1" opacity="0.5" />
                            <circle cx={x} cy={y} r="12" fill={user.color} opacity="0.8" />
                            <text x={x} y={y + 4} textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">
                              {user.name[0]}
                            </text>
                          </g>
                        )
                      })}
                      <circle cx={100} cy={60} r="16" fill="#8b5cf6" opacity="0.9" />
                      <text x={100} y={64} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold">
                        MED
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Mediator explanation */}
            <div className="bg-quest-surface/50 rounded-lg p-4 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold text-quest-primary mb-2">Key Observations</h4>
              <ul className="text-sm text-quest-muted space-y-1">
                <li>
                  Users (
                  <Term word="Colleagues" definition="In the Mediator pattern, colleagues are the components that interact through the mediator. They hold a reference to the mediator but not to each other." onLearn={learnTerm} />
                  ) send messages to the Chat Room (
                  <Term word="Concrete Mediator" definition="The specific implementation of the mediator interface that coordinates communication between colleague objects and contains the routing logic." onLearn={learnTerm} />
                  ), never to each other directly.
                </li>
                <li>
                  Toggle users offline -- the mediator automatically adjusts routing without
                  any user needing to know about the change.
                </li>
                <li>
                  The routing log shows the mediator's internal decision-making -- a single
                  point of control for all communication.
                </li>
              </ul>
            </div>

            <DeepDive id="observer-vs-mediator" title="Observer vs Mediator: When to Use Which?" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-emerald-400 mb-2">Use Observer when:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>One object's state change should trigger updates in many others</li>
                      <li>You don't know how many objects need to be notified at compile time</li>
                      <li>Objects should be notified without the subject knowing their concrete types</li>
                      <li>The communication is primarily one-directional (subject to observers)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-400 mb-2">Use Mediator when:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Multiple objects need to communicate in complex ways</li>
                      <li>Direct references between objects create spaghetti dependencies</li>
                      <li>You want to centralize control logic for reuse or modification</li>
                      <li>The communication is bidirectional and involves routing decisions</li>
                    </ul>
                  </div>
                </div>
                <p className="mt-2">
                  In practice, a Mediator often <em>uses</em> the Observer pattern internally.
                  For example, a chat room mediator might use event subscriptions to notify
                  participants. The patterns complement each other beautifully.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="scaling-patterns" title="Scaling These Patterns in Distributed Systems" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  At scale, the Observer pattern evolves into <strong className="text-quest-text">message
                  brokers</strong> like Apache Kafka, RabbitMQ, or AWS SNS/SQS. Producers publish
                  events to topics; consumers subscribe to topics they care about. The broker
                  handles delivery guarantees, ordering, and fan-out.
                </p>
                <p>
                  The Mediator pattern scales into <strong className="text-quest-text">API gateways</strong>,{' '}
                  <strong className="text-quest-text">service meshes</strong> (like Istio), and{' '}
                  <strong className="text-quest-text">orchestration engines</strong> (like Temporal or
                  Step Functions). These act as centralized coordination points that manage
                  complex interactions between microservices.
                </p>
                <p>
                  A key trade-off: the mediator can become a <strong className="text-quest-text">God
                  Object</strong> or single point of failure if it accumulates too much logic.
                  Distributed systems mitigate this by using multiple specialized mediators or
                  combining mediator with saga patterns for fault tolerance.
                </p>
              </div>
            </DeepDive>

            <button
              onClick={() => setSection('quiz')}
              className="btn-primary px-6 py-3 rounded-lg font-semibold"
              disabled={!mediatorInteracted}
            >
              {mediatorInteracted ? 'Take the Quiz' : 'Interact with the chat room first'}
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ QUIZ ═══════════════════ */}
      {section === 'quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="concept-card p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle size={24} className="text-quest-secondary" />
              Knowledge Check
            </h2>

            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="bg-quest-bg rounded-lg p-4 border border-white/5">
                  <p className="font-semibold mb-3 text-quest-text">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const isSelected = answers[q.id] === opt.id
                      const isCorrect = opt.correct
                      let btnClass = 'bg-quest-surface border border-white/10 hover:border-quest-primary/40'

                      if (showResults) {
                        if (isCorrect) {
                          btnClass = 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                        } else if (isSelected && !isCorrect) {
                          btnClass = 'bg-red-500/20 border border-red-500/40 text-red-400'
                        } else {
                          btnClass = 'bg-quest-surface border border-white/5 opacity-50'
                        }
                      } else if (isSelected) {
                        btnClass = 'bg-quest-primary/20 border border-quest-primary/40 text-quest-primary'
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAnswer(q.id, opt.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${btnClass}`}
                          disabled={showResults}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs opacity-50">{opt.id.toUpperCase()}</span>
                            <span>{opt.text}</span>
                            {showResults && isCorrect && <CheckCircle size={14} className="ml-auto text-emerald-400" />}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Quiz Submit / Results */}
            {!showResults ? (
              <button
                onClick={handleQuizSubmit}
                disabled={!allAnswered}
                className="btn-primary px-6 py-3 rounded-lg font-semibold mt-6 disabled:opacity-30"
              >
                {allAnswered ? 'Submit Answers' : `Answer all questions (${Object.keys(answers).length}/${quizQuestions.length})`}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className={`rounded-lg p-4 border ${
                  correctCount >= 3
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}>
                  <p className="font-semibold text-lg">
                    {correctCount >= 3
                      ? `Excellent! ${correctCount}/${quizQuestions.length} correct!`
                      : `${correctCount}/${quizQuestions.length} correct. Review the material and try again.`
                    }
                  </p>
                  <p className="text-sm text-quest-muted mt-1">
                    {correctCount >= 3
                      ? 'You understand the Observer and Mediator patterns well.'
                      : 'You need at least 3 correct answers to proceed.'}
                  </p>
                </div>

                {correctCount < 3 && (
                  <button
                    onClick={() => { setAnswers({}); setShowResults(false) }}
                    className="btn-secondary px-6 py-3 rounded-lg font-semibold mt-4"
                  >
                    Try Again
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ COMPLETE ═══════════════════ */}
      {section === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="concept-card p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle size={64} className="text-emerald-400 mx-auto mb-4" />
            </motion.div>

            <h2 className="text-2xl font-bold mb-3">Level 38 Complete!</h2>
            <p className="text-quest-muted mb-6 max-w-lg mx-auto">
              You've mastered the Observer and Mediator patterns -- two essential behavioral
              patterns for building loosely coupled, event-driven systems. The Observer enables
              one-to-many broadcasts, while the Mediator centralizes many-to-many coordination.
            </p>

            <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20">
                <Eye size={20} className="text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-emerald-400">Observer</p>
                <p className="text-xs text-quest-muted mt-1">Subject notifies many</p>
              </div>
              <div className="bg-quest-bg rounded-lg p-4 border border-blue-500/20">
                <Radio size={20} className="text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-blue-400">Mediator</p>
                <p className="text-xs text-quest-muted mt-1">Central coordinator</p>
              </div>
            </div>

            <div className="bg-quest-surface/50 rounded-lg p-4 text-left max-w-lg mx-auto">
              <h4 className="text-sm font-semibold mb-2">Key Takeaways:</h4>
              <ul className="text-sm text-quest-muted space-y-1">
                <li>Observer: one-to-many, subject broadcasts, observers subscribe/unsubscribe</li>
                <li>Mediator: many-to-many, central hub, reduces N*(N-1) to N connections</li>
                <li>Both reduce coupling; Observer is simpler, Mediator handles complex routing</li>
                <li>At scale: Observer becomes pub/sub; Mediator becomes API gateways and service meshes</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

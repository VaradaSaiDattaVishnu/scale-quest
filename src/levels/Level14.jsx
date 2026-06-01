import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Wifi, WifiOff, MessageSquare, Send, Zap, Clock, RefreshCw,
  ArrowUpDown, Radio, Server, Activity
} from 'lucide-react'

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

const chatMessages = [
  { user: 'Alice', text: 'Hey, anyone online?' },
  { user: 'Alice', text: 'Just deployed the new feature!' },
  { user: 'Alice', text: 'Can someone review my PR?' },
  { user: 'Alice', text: 'The tests are passing now' },
  { user: 'Alice', text: 'Going to grab coffee, brb' },
  { user: 'Alice', text: 'Back! Any updates?' },
  { user: 'Alice', text: 'Looks good, merging now' },
  { user: 'Alice', text: 'Done! Deployed to staging' },
]

export default function Level14({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [introTab, setIntroTab] = useState('polling')
  const [introMessages, setIntroMessages] = useState({ polling: [], longpoll: [], websocket: [] })
  const [pollTimer, setPollTimer] = useState(5)
  const [pendingQueue, setPendingQueue] = useState([])
  const [msgIndex, setMsgIndex] = useState(0)
  const [bandwidth, setBandwidth] = useState({ polling: 0, longpoll: 0, websocket: 0 })
  const introRunning = useRef(false)
  const intervalsRef = useRef([])

  // Polling section state
  const [pollingInterval, setPollingInterval] = useState(2000)
  const [pollingStats, setPollingStats] = useState({ requests: 0, useful: 0, wasted: 0, totalLatency: 0 })
  const [pollingArrows, setPollingArrows] = useState([])
  const [longPollArrows, setLongPollArrows] = useState([])
  const [pollingRunning, setPollingRunning] = useState(false)
  const pollingRef = useRef(null)
  const longPollRef = useRef(null)

  // WebSocket section state
  const [wsStep, setWsStep] = useState(0)
  const [wsConnected, setWsConnected] = useState(false)
  const [wsMessages, setWsMessages] = useState([])
  const [wsInput, setWsInput] = useState('')
  const [wsHeartbeat, setWsHeartbeat] = useState(false)
  const [wsDisconnected, setWsDisconnected] = useState(false)
  const [wsReconnecting, setWsReconnecting] = useState(false)
  const [wsLifecycle, setWsLifecycle] = useState('idle')

  // SSE state
  const [sseStream, setSseStream] = useState([])
  const [scenarioRevealed, setScenarioRevealed] = useState({})

  const sections = ['intro', 'polling', 'websockets', 'sse', 'quiz']

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the main disadvantage of short polling?',
      options: [
        { id: 'a', text: 'It requires WebSocket protocol support', correct: false },
        { id: 'b', text: 'It wastes bandwidth and server resources by making many requests that return no new data', correct: true },
        { id: 'c', text: 'It only works with HTTP/2 connections', correct: false },
        { id: 'd', text: 'It cannot handle JSON data formats', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'How does a WebSocket connection begin?',
      options: [
        { id: 'a', text: 'By opening a raw TCP socket directly from the browser', correct: false },
        { id: 'b', text: 'With an HTTP upgrade handshake that switches the protocol from HTTP to WebSocket', correct: true },
        { id: 'c', text: 'By using a special WebSocket DNS record', correct: false },
        { id: 'd', text: 'Through a dedicated WebSocket port (port 8080)', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'When would Server-Sent Events be preferred over WebSockets?',
      options: [
        { id: 'a', text: 'When you need the lowest possible latency for gaming', correct: false },
        { id: 'b', text: 'When you need to send binary data like images', correct: false },
        { id: 'c', text: 'When you only need server-to-client communication, like live feeds or notifications', correct: true },
        { id: 'd', text: 'When you need bidirectional communication for chat', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What is a heartbeat in WebSocket connections?',
      options: [
        { id: 'a', text: 'A security mechanism that encrypts WebSocket frames', correct: false },
        { id: 'b', text: 'Periodic ping/pong messages that keep the connection alive and detect disconnections', correct: true },
        { id: 'c', text: 'The initial handshake sequence between client and server', correct: false },
        { id: 'd', text: 'A load balancing technique for distributing WebSocket connections', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  // --- INTRO: Simulated chat with three modes ---
  useEffect(() => {
    if (currentSection !== 0) return
    introRunning.current = true
    let idx = 0
    const pending = { polling: [], longpoll: [], websocket: [] }

    const msgInterval = setInterval(() => {
      if (!introRunning.current) return
      const msg = chatMessages[idx % chatMessages.length]
      idx++
      // WebSocket: instant
      setIntroMessages(prev => ({ ...prev, websocket: [...prev.websocket, { ...msg, time: Date.now() }].slice(-6) }))
      setBandwidth(prev => ({ ...prev, websocket: prev.websocket + 1 }))
      // Queue for polling & long poll
      pending.polling.push({ ...msg, time: Date.now() })
      pending.longpoll.push({ ...msg, time: Date.now() })
    }, 3000)

    // Traditional polling every 5 seconds
    let pollCountdown = 5
    const pollTick = setInterval(() => {
      if (!introRunning.current) return
      pollCountdown--
      setPollTimer(pollCountdown)
      if (pollCountdown <= 0) {
        pollCountdown = 5
        setBandwidth(prev => ({ ...prev, polling: prev.polling + 1 }))
        if (pending.polling.length > 0) {
          setIntroMessages(prev => ({
            ...prev,
            polling: [...prev.polling, ...pending.polling].slice(-6)
          }))
          pending.polling = []
        }
      }
    }, 1000)

    // Long polling: check every 500ms if there's pending data
    const longPollCheck = setInterval(() => {
      if (!introRunning.current) return
      if (pending.longpoll.length > 0) {
        setBandwidth(prev => ({ ...prev, longpoll: prev.longpoll + 1 }))
        setIntroMessages(prev => ({
          ...prev,
          longpoll: [...prev.longpoll, ...pending.longpoll].slice(-6)
        }))
        pending.longpoll = []
      }
    }, 500)

    return () => {
      introRunning.current = false
      clearInterval(msgInterval)
      clearInterval(pollTick)
      clearInterval(longPollCheck)
    }
  }, [currentSection])

  // --- POLLING: Short vs Long polling visualization ---
  const startPollingDemo = useCallback(() => {
    setPollingRunning(true)
    setPollingStats({ requests: 0, useful: 0, wasted: 0, totalLatency: 0 })
    setPollingArrows([])
    setLongPollArrows([])

    let shortId = 0
    let longId = 0
    let dataChance = 0.2

    // Short polling
    pollingRef.current = setInterval(() => {
      const hasData = Math.random() < dataChance
      const id = ++shortId
      setPollingArrows(prev => [...prev, { id, hasData, direction: 'out', time: Date.now() }].slice(-8))
      setPollingStats(prev => ({
        requests: prev.requests + 1,
        useful: prev.useful + (hasData ? 1 : 0),
        wasted: prev.wasted + (hasData ? 0 : 1),
        totalLatency: prev.totalLatency + (hasData ? 100 : 0)
      }))
      setTimeout(() => {
        setPollingArrows(prev => prev.map(a => a.id === id ? { ...a, direction: 'back' } : a))
      }, 400)
    }, pollingInterval)

    // Long polling simulation
    const doLongPoll = () => {
      const id = ++longId
      setLongPollArrows(prev => [...prev, { id, direction: 'waiting', time: Date.now() }].slice(-8))
      const waitTime = 1000 + Math.random() * 4000
      longPollRef.current = setTimeout(() => {
        setLongPollArrows(prev => prev.map(a => a.id === id ? { ...a, direction: 'back', hasData: true } : a))
        setTimeout(doLongPoll, 100)
      }, waitTime)
    }
    doLongPoll()
  }, [pollingInterval])

  const stopPollingDemo = useCallback(() => {
    setPollingRunning(false)
    if (pollingRef.current) clearInterval(pollingRef.current)
    if (longPollRef.current) clearTimeout(longPollRef.current)
  }, [])

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
      if (longPollRef.current) clearTimeout(longPollRef.current)
    }
  }, [])

  // --- WEBSOCKET: Handshake simulation ---
  const startWsHandshake = useCallback(() => {
    setWsStep(1)
    setWsLifecycle('connecting')
    setTimeout(() => { setWsStep(2); }, 1000)
    setTimeout(() => { setWsStep(3); setWsConnected(true); setWsLifecycle('open'); }, 2000)
  }, [])

  const sendWsMessage = useCallback(() => {
    if (!wsInput.trim() || !wsConnected) return
    const msg = wsInput.trim()
    setWsInput('')
    setWsMessages(prev => [...prev, { user: 'You', text: msg, direction: 'out' }])
    setTimeout(() => {
      const responses = [
        'Got it! Processing your request...',
        'Interesting point! Let me think about that.',
        'Message received loud and clear!',
        'Thanks for sharing! Here\'s an update...',
        'Roger that! Sending data back now.',
      ]
      setWsMessages(prev => [...prev, {
        user: 'Server',
        text: responses[Math.floor(Math.random() * responses.length)],
        direction: 'in'
      }])
    }, 500 + Math.random() * 1000)
  }, [wsInput, wsConnected])

  const simulateHeartbeat = useCallback(() => {
    setWsHeartbeat(true)
    setTimeout(() => setWsHeartbeat(false), 2000)
  }, [])

  const simulateDisconnect = useCallback(() => {
    setWsDisconnected(true)
    setWsLifecycle('closed')
    setWsConnected(false)
    setTimeout(() => {
      setWsReconnecting(true)
      setWsLifecycle('reconnecting')
    }, 1500)
    setTimeout(() => {
      setWsDisconnected(false)
      setWsReconnecting(false)
      setWsConnected(true)
      setWsLifecycle('open')
    }, 3500)
  }, [])

  // --- SSE: Animated stream ---
  useEffect(() => {
    if (currentSection !== 3) return
    const sseMessages = [
      { event: 'message', data: '{"user": "Alice", "text": "Hello!"}' },
      { event: 'message', data: '{"user": "Bob", "text": "Hi there!"}' },
      { event: 'notification', data: '{"type": "join", "user": "Carol"}' },
      { event: 'message', data: '{"user": "Carol", "text": "Hey everyone!"}' },
      { event: 'heartbeat', data: '{"timestamp": 1709312400}' },
    ]
    let idx = 0
    setSseStream([])
    const interval = setInterval(() => {
      if (idx < sseMessages.length) {
        setSseStream(prev => [...prev, sseMessages[idx]])
        idx++
      } else {
        clearInterval(interval)
      }
    }, 1500)
    return () => clearInterval(interval)
  }, [currentSection])

  const scenarios = [
    { label: 'Live stock prices', answer: 'SSE', reason: 'One-way server-to-client with frequent updates' },
    { label: 'Chat application', answer: 'WebSocket', reason: 'Bidirectional real-time messaging' },
    { label: 'Email inbox check', answer: 'Long Polling', reason: 'Infrequent updates, simple infrastructure' },
    { label: 'Multiplayer game', answer: 'WebSocket', reason: 'Low latency bidirectional communication' },
    { label: 'News feed updates', answer: 'SSE', reason: 'Server pushes new articles to clients' },
  ]

  const comparisonFeatures = [
    { feature: 'Direction', ws: 'Bidirectional', sse: 'Server to Client', lp: 'Simulated bidirectional' },
    { feature: 'Protocol', ws: 'ws://', sse: 'HTTP', lp: 'HTTP' },
    { feature: 'Reconnection', ws: 'Manual', sse: 'Automatic', lp: 'Manual' },
    { feature: 'Binary Data', ws: 'Yes', sse: 'No (text only)', lp: 'Yes' },
    { feature: 'Browser Support', ws: 'Good', sse: 'Good', lp: 'Universal' },
  ]

  const lifecycleStages = [
    { label: 'Connecting', color: 'text-yellow-400', active: wsLifecycle === 'connecting' },
    { label: 'Open', color: 'text-green-400', active: wsLifecycle === 'open' },
    { label: 'Ping/Pong', color: 'text-blue-400', active: wsHeartbeat },
    { label: 'Closed', color: 'text-red-400', active: wsLifecycle === 'closed' },
    { label: 'Reconnect', color: 'text-orange-400', active: wsLifecycle === 'reconnecting' },
  ]

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
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* ========== SECTION: INTRO ========== */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-quest-primary" />
              Real-Time Rush
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Users want to see chat messages instantly, not after refreshing. Time to go real-time."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              The web was built on request-response: the client asks, the server answers. But what happens when the
              server has new data and the client doesn't know to ask? That's the real-time problem. Let's compare
              three approaches: <Term word="Long Polling" definition="A technique where the client sends a request and the server holds it open until new data is available, then responds immediately." onLearn={learnTerm} />{' '}
              and <Term word="WebSockets" definition="A protocol providing full-duplex communication channels over a single TCP connection, allowing both client and server to send data at any time." onLearn={learnTerm} />.
            </p>

            {/* Tab switcher */}
            <div className="flex gap-2 mb-4">
              {[
                { id: 'polling', label: 'Traditional Polling', icon: RefreshCw },
                { id: 'longpoll', label: 'Long Polling', icon: Clock },
                { id: 'websocket', label: 'WebSocket', icon: Wifi },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setIntroTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${introTab === tab.id
                      ? 'bg-quest-primary text-quest-bg'
                      : 'bg-quest-surface text-quest-muted hover:text-quest-text'
                    }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Chat display */}
            <div className="bg-quest-bg rounded-xl p-4 border border-white/10 mb-4">
              <div className="flex items-center gap-2 mb-3 text-sm text-quest-muted">
                <MessageSquare size={16} />
                <span>Chat Room — {introTab === 'polling' ? 'Traditional Polling' : introTab === 'longpoll' ? 'Long Polling' : 'WebSocket'}</span>
                {introTab === 'polling' && (
                  <span className="ml-auto bg-quest-surface px-2 py-1 rounded text-xs">
                    Next poll in: <span className="text-quest-primary font-mono">{pollTimer}s</span>
                  </span>
                )}
                {introTab === 'websocket' && (
                  <span className="ml-auto flex items-center gap-1 text-green-400 text-xs">
                    <Wifi size={12} /> Connected
                  </span>
                )}
              </div>
              <div className="space-y-2 min-h-[160px]">
                <AnimatePresence>
                  {introMessages[introTab]?.map((msg, i) => (
                    <motion.div
                      key={`${introTab}-${i}-${msg.time}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-1 rounded font-semibold min-w-[50px] text-center">
                        {msg.user}
                      </span>
                      <span className="text-sm text-quest-text">{msg.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {introMessages[introTab]?.length === 0 && (
                  <p className="text-quest-muted text-sm text-center py-8">Waiting for messages...</p>
                )}
              </div>
            </div>

            {/* Bandwidth indicator */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'polling', label: 'Polling Requests', color: 'text-red-400' },
                { id: 'longpoll', label: 'Long Poll Requests', color: 'text-yellow-400' },
                { id: 'websocket', label: 'WS Frames', color: 'text-green-400' },
              ].map(b => (
                <div key={b.id} className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">{b.label}</p>
                  <p className={`text-2xl font-bold font-mono ${b.color}`}>{bandwidth[b.id]}</p>
                </div>
              ))}
            </div>
          </div>

          <DeepDive id="cost-of-polling" title="The Cost of Polling" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>Every HTTP request carries overhead: TCP connection setup, TLS handshake, HTTP headers (often 500+ bytes), and cookie data. When polling every few seconds, this overhead adds up fast.</p>
              <p><strong>Connection setup:</strong> Each poll may require a new TCP connection (unless Keep-Alive is used), adding ~100ms of latency for the handshake alone.</p>
              <p><strong>Battery drain:</strong> On mobile devices, each network request wakes up the radio, which consumes significant battery. Frequent polling can drain a phone battery 3-5x faster than a persistent WebSocket connection.</p>
              <p><strong>Server load:</strong> With 10,000 connected users polling every 5 seconds, that's 2,000 requests/second — most returning empty responses. A WebSocket server handles the same users with zero idle overhead.</p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ========== SECTION: POLLING ========== */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="text-quest-primary" />
              Watch the Waste
            </h2>

            <p className="text-quest-muted mb-4">
              See how <Term word="Connection Pooling" definition="A technique of maintaining a pool of reusable connections to reduce the overhead of establishing new connections for each request." onLearn={learnTerm} /> and polling strategies affect bandwidth and latency.
            </p>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={pollingRunning ? stopPollingDemo : startPollingDemo}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  pollingRunning ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-quest-primary/20 text-quest-primary hover:bg-quest-primary/30'
                }`}
              >
                {pollingRunning ? 'Stop' : 'Start'} Simulation
              </button>
              <div className="flex-1">
                <label className="text-xs text-quest-muted block mb-1">
                  Polling Interval: {pollingInterval}ms
                </label>
                <input
                  type="range"
                  min={100}
                  max={5000}
                  step={100}
                  value={pollingInterval}
                  onChange={e => setPollingInterval(Number(e.target.value))}
                  className="w-full accent-quest-primary"
                />
                <div className="flex justify-between text-xs text-quest-muted">
                  <span>100ms (aggressive)</span>
                  <span>5000ms (relaxed)</span>
                </div>
              </div>
            </div>

            {/* Split view */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Short Polling */}
              <div className="bg-quest-surface rounded-xl p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw size={18} className="text-red-400" />
                  <h4 className="font-semibold text-red-400">Short Polling</h4>
                </div>
                <div className="flex items-center justify-between mb-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg bg-quest-primary/20 flex items-center justify-center">
                      <MessageSquare size={20} className="text-quest-primary" />
                    </div>
                    <span className="text-xs text-quest-muted mt-1">Client</span>
                  </div>
                  <div className="flex-1 relative h-16 overflow-hidden">
                    <AnimatePresence>
                      {pollingArrows.map(arrow => (
                        <motion.div
                          key={arrow.id}
                          className="absolute top-1/2 -translate-y-1/2"
                          initial={{ left: arrow.direction === 'out' ? '0%' : '100%' }}
                          animate={{ left: arrow.direction === 'out' ? '100%' : '0%' }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className={`w-3 h-3 rounded-full ${arrow.hasData ? 'bg-green-400' : 'bg-gray-500'}`} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div className="absolute top-1/2 w-full border-t border-dashed border-white/10" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg bg-quest-secondary/20 flex items-center justify-center">
                      <Server size={20} className="text-quest-secondary" />
                    </div>
                    <span className="text-xs text-quest-muted mt-1">Server</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-quest-bg rounded p-2 text-center">
                    <p className="text-quest-muted">Requests</p>
                    <p className="text-lg font-mono font-bold text-quest-text">{pollingStats.requests}</p>
                  </div>
                  <div className="bg-quest-bg rounded p-2 text-center">
                    <p className="text-quest-muted">Wasted</p>
                    <p className="text-lg font-mono font-bold text-red-400">{pollingStats.wasted}</p>
                  </div>
                </div>
              </div>

              {/* Long Polling */}
              <div className="bg-quest-surface rounded-xl p-4 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-yellow-400" />
                  <h4 className="font-semibold text-yellow-400">Long Polling</h4>
                </div>
                <div className="flex items-center justify-between mb-3 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg bg-quest-primary/20 flex items-center justify-center">
                      <MessageSquare size={20} className="text-quest-primary" />
                    </div>
                    <span className="text-xs text-quest-muted mt-1">Client</span>
                  </div>
                  <div className="flex-1 relative h-16 overflow-hidden">
                    <AnimatePresence>
                      {longPollArrows.map(arrow => (
                        <motion.div
                          key={arrow.id}
                          className="absolute top-1/2 -translate-y-1/2"
                          initial={{ left: '0%' }}
                          animate={{
                            left: arrow.direction === 'waiting' ? '50%' : arrow.direction === 'back' ? '0%' : '100%'
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: arrow.direction === 'waiting' ? 1.0 : 0.4 }}
                        >
                          <div className={`w-3 h-3 rounded-full ${arrow.direction === 'waiting' ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div className="absolute top-1/2 w-full border-t border-dashed border-white/10" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-lg bg-quest-secondary/20 flex items-center justify-center">
                      <Server size={20} className="text-quest-secondary" />
                    </div>
                    <span className="text-xs text-quest-muted mt-1">Server</span>
                  </div>
                </div>
                <div className="bg-quest-bg rounded p-2 text-xs text-center">
                  <p className="text-quest-muted">Connection held open until data arrives</p>
                  <p className="text-yellow-400 mt-1">Zero wasted responses</p>
                </div>
              </div>
            </div>

            {/* Stats summary */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              <div className="bg-quest-surface rounded-lg p-3 text-center">
                <p className="text-xs text-quest-muted">Total Requests</p>
                <p className="text-xl font-mono font-bold">{pollingStats.requests}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-3 text-center">
                <p className="text-xs text-quest-muted">Useful</p>
                <p className="text-xl font-mono font-bold text-green-400">{pollingStats.useful}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-3 text-center">
                <p className="text-xs text-quest-muted">Wasted</p>
                <p className="text-xl font-mono font-bold text-red-400">{pollingStats.wasted}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-3 text-center">
                <p className="text-xs text-quest-muted">Waste Rate</p>
                <p className="text-xl font-mono font-bold text-yellow-400">
                  {pollingStats.requests > 0 ? Math.round((pollingStats.wasted / pollingStats.requests) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>

          <DeepDive id="when-polling-is-fine" title="When Polling is Actually Fine" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p><strong>Low-frequency updates:</strong> If data changes every few minutes (weather, exchange rates), polling every 30-60 seconds is perfectly fine and much simpler to implement.</p>
              <p><strong>Simple infrastructure:</strong> Polling works with any HTTP server, CDN, or load balancer. No special WebSocket support needed. It works behind corporate proxies that often block WebSockets.</p>
              <p><strong>Serverless compatible:</strong> AWS Lambda, Cloudflare Workers, and other serverless platforms handle short-lived request-response well. Long-lived WebSocket connections require dedicated infrastructure.</p>
              <p><strong>Caching friendly:</strong> Polling responses can be cached at the CDN or HTTP cache layer, reducing server load. WebSocket messages bypass all HTTP caching.</p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ========== SECTION: WEBSOCKETS ========== */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wifi className="text-quest-primary" />
              Persistent Connection
            </h2>

            {/* Handshake Animation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/10">
              <h4 className="font-semibold mb-4 text-quest-text">WebSocket Handshake</h4>
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-quest-primary/20 flex items-center justify-center">
                    <MessageSquare size={24} className="text-quest-primary" />
                  </div>
                  <span className="text-xs text-quest-muted mt-2">Client</span>
                </div>

                <div className="flex-1 space-y-3 pt-2">
                  {/* Step 1 */}
                  <AnimatePresence>
                    {wsStep >= 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-quest-surface rounded-lg p-3 border border-blue-500/30"
                      >
                        <div className="flex items-center gap-2 text-xs">
                          <ArrowRight size={14} className="text-blue-400" />
                          <span className="text-blue-400 font-mono">GET /chat HTTP/1.1</span>
                        </div>
                        <p className="text-xs text-quest-muted font-mono mt-1">
                          Upgrade: websocket<br />
                          Connection: Upgrade<br />
                          Sec-WebSocket-Key: dGhlIHNhbXBsZQ==
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 2 */}
                  <AnimatePresence>
                    {wsStep >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-quest-surface rounded-lg p-3 border border-green-500/30"
                      >
                        <div className="flex items-center gap-2 text-xs justify-end">
                          <span className="text-green-400 font-mono">HTTP/1.1 101 Switching Protocols</span>
                          <ArrowRight size={14} className="text-green-400 rotate-180" />
                        </div>
                        <p className="text-xs text-quest-muted font-mono mt-1 text-right">
                          Upgrade: websocket<br />
                          Connection: Upgrade
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Step 3 */}
                  <AnimatePresence>
                    {wsStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        className="relative"
                      >
                        <div className="h-2 rounded-full bg-gradient-to-r from-quest-primary via-green-400 to-quest-primary animate-pulse" />
                        <p className="text-center text-xs text-green-400 mt-1 font-semibold">
                          Persistent bidirectional connection established
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-lg bg-quest-secondary/20 flex items-center justify-center">
                    <Server size={24} className="text-quest-secondary" />
                  </div>
                  <span className="text-xs text-quest-muted mt-2">Server</span>
                </div>
              </div>

              {wsStep === 0 && (
                <button
                  onClick={startWsHandshake}
                  className="mt-4 px-4 py-2 rounded-lg bg-quest-primary/20 text-quest-primary hover:bg-quest-primary/30 transition-all text-sm font-medium w-full"
                >
                  Start Handshake
                </button>
              )}
            </div>

            {/* Mini Chat */}
            {wsConnected && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-quest-bg rounded-xl p-4 border border-green-500/20 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Wifi size={14} className="text-green-400" />
                      <span className="text-green-400 font-medium">Connected</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={simulateHeartbeat}
                        className="px-3 py-1 rounded text-xs bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all"
                      >
                        <Activity size={12} className="inline mr-1" />
                        Heartbeat
                      </button>
                      <button
                        onClick={simulateDisconnect}
                        disabled={wsDisconnected}
                        className="px-3 py-1 rounded text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50"
                      >
                        <WifiOff size={12} className="inline mr-1" />
                        Disconnect
                      </button>
                    </div>
                  </div>

                  {/* Heartbeat indicator */}
                  <AnimatePresence>
                    {wsHeartbeat && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-blue-500/10 rounded-lg p-2 mb-3 text-xs text-blue-400 text-center font-mono"
                      >
                        PING... <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>PONG!</motion.span>
                        <span className="text-quest-muted ml-2">Connection alive</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Disconnect / Reconnect indicator */}
                  <AnimatePresence>
                    {wsDisconnected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`rounded-lg p-2 mb-3 text-xs text-center font-mono ${
                          wsReconnecting ? 'bg-orange-500/10 text-orange-400' : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {wsReconnecting ? (
                          <span><RefreshCw size={12} className="inline animate-spin mr-1" /> Reconnecting...</span>
                        ) : (
                          <span><WifiOff size={12} className="inline mr-1" /> Connection lost!</span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Messages */}
                  <div className="space-y-2 min-h-[120px] max-h-[200px] overflow-y-auto mb-3">
                    {wsMessages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: msg.direction === 'out' ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${msg.direction === 'out' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`rounded-lg px-3 py-2 text-sm max-w-[70%] ${
                          msg.direction === 'out'
                            ? 'bg-quest-primary/20 text-quest-primary'
                            : 'bg-quest-secondary/20 text-quest-secondary'
                        }`}>
                          <span className="text-xs font-semibold block">{msg.user}</span>
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {wsMessages.length === 0 && (
                      <p className="text-quest-muted text-sm text-center py-8">Type a message below to start chatting!</p>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={wsInput}
                      onChange={e => setWsInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && sendWsMessage()}
                      placeholder="Type a message..."
                      disabled={wsDisconnected}
                      className="flex-1 bg-quest-surface border border-white/10 rounded-lg px-3 py-2 text-sm text-quest-text placeholder-quest-muted focus:outline-none focus:border-quest-primary/50 disabled:opacity-50"
                    />
                    <button
                      onClick={sendWsMessage}
                      disabled={wsDisconnected || !wsInput.trim()}
                      className="px-4 py-2 rounded-lg bg-quest-primary text-quest-bg text-sm font-medium hover:bg-quest-primary/80 transition-all disabled:opacity-50"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>

                {/* Connection Lifecycle */}
                <div className="bg-quest-surface rounded-xl p-4 border border-white/10">
                  <h4 className="font-semibold mb-3 text-sm text-quest-text">Connection Lifecycle</h4>
                  <div className="flex items-center justify-between gap-1">
                    {lifecycleStages.map((stage, i) => (
                      <div key={stage.label} className="flex items-center">
                        <motion.div
                          className={`px-3 py-2 rounded-lg text-xs font-medium text-center transition-all ${
                            stage.active
                              ? `bg-white/10 ${stage.color} ring-1 ring-current`
                              : 'bg-quest-bg text-quest-muted'
                          }`}
                          animate={stage.active ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ repeat: stage.active ? Infinity : 0, duration: 1.5 }}
                        >
                          {stage.label}
                        </motion.div>
                        {i < lifecycleStages.length - 1 && (
                          <ArrowRight size={14} className="text-quest-muted mx-1 flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-4 space-y-2 text-sm text-quest-muted">
              <p>
                <Term word="Heartbeat" definition="Periodic ping/pong messages exchanged between client and server to verify the connection is still alive and detect silent disconnections." onLearn={learnTerm} /> messages keep the connection alive even when no data is being sent.
              </p>
              <p>
                <Term word="Reconnection" definition="The process of automatically re-establishing a dropped WebSocket connection, often with exponential backoff to avoid overwhelming the server." onLearn={learnTerm} /> logic is critical for handling network interruptions gracefully.
              </p>
              <p>
                Libraries like <Term word="Socket.io" definition="A popular JavaScript library that provides WebSocket communication with automatic fallbacks to long polling, reconnection handling, and room-based messaging." onLearn={learnTerm} /> handle fallbacks, reconnection, and rooms out of the box.
              </p>
            </div>
          </div>

          <DeepDive id="websocket-at-scale" title="WebSocket at Scale" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p><strong>Connection limits:</strong> Each WebSocket connection consumes a file descriptor and memory on the server. A single server can typically handle 10K-100K concurrent connections, depending on resources. At 1M users, you need 10-100 servers just for connections.</p>
              <p><strong>Sticky sessions:</strong> Once a WebSocket connection is established, all messages must go to the same server. This requires sticky session routing at the load balancer level, typically using IP hash or connection ID.</p>
              <p><strong>Load balancing:</strong> Traditional HTTP load balancers distribute requests round-robin. WebSockets need connection-aware balancing. Some load balancers (like HAProxy, Nginx) have specific WebSocket support, but configuration is more complex.</p>
              <p><strong>Pub/Sub backbone:</strong> When user A on Server 1 messages user B on Server 2, you need a message bus (Redis Pub/Sub, Kafka, NATS) connecting all WebSocket servers. This adds infrastructure complexity but enables horizontal scaling.</p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ========== SECTION: SSE ========== */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Radio className="text-quest-primary" />
              One-Way Stream
            </h2>

            <p className="text-quest-muted mb-6">
              <Term word="Server-Sent Events" definition="A standard HTTP-based protocol that allows servers to push data to clients over a single long-lived connection. Built on the EventSource API with automatic reconnection." onLearn={learnTerm} /> (SSE) provide a simple, HTTP-native way for servers to push updates to clients without the complexity of WebSockets.
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 text-quest-muted font-medium">Feature</th>
                    <th className="text-center py-2 px-3 text-quest-primary font-medium">WebSocket</th>
                    <th className="text-center py-2 px-3 text-green-400 font-medium">SSE</th>
                    <th className="text-center py-2 px-3 text-yellow-400 font-medium">Long Polling</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-quest-surface/30' : ''}`}>
                      <td className="py-2 px-3 text-quest-text font-medium">{row.feature}</td>
                      <td className="py-2 px-3 text-center text-quest-muted">{row.ws}</td>
                      <td className="py-2 px-3 text-center text-quest-muted">{row.sse}</td>
                      <td className="py-2 px-3 text-center text-quest-muted">{row.lp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Choose the Right Tool */}
            <h4 className="font-semibold mb-3 text-quest-text">Choose the Right Tool</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {scenarios.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setScenarioRevealed(prev => ({ ...prev, [i]: true }))}
                  className="bg-quest-surface rounded-xl p-4 text-left border border-white/10 hover:border-quest-primary/30 transition-all"
                >
                  <p className="font-medium text-quest-text mb-2">{s.label}</p>
                  <AnimatePresence>
                    {scenarioRevealed[i] ? (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-1 ${
                          s.answer === 'WebSocket' ? 'bg-quest-primary/20 text-quest-primary'
                          : s.answer === 'SSE' ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {s.answer}
                        </span>
                        <p className="text-xs text-quest-muted">{s.reason}</p>
                      </motion.div>
                    ) : (
                      <p className="text-xs text-quest-muted">Click to reveal best choice</p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            {/* SSE Stream Terminal */}
            <h4 className="font-semibold mb-3 text-quest-text">SSE Event Stream</h4>
            <div className="bg-gray-950 rounded-xl p-4 font-mono text-sm border border-white/10">
              <div className="flex items-center gap-2 mb-3 text-xs text-quest-muted">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span>EventSource: /api/stream</span>
              </div>
              <div className="space-y-3 min-h-[150px]">
                <AnimatePresence>
                  {sseStream.map((evt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-purple-400">event:</span>
                      <span className="text-quest-text"> {evt.event}</span>
                      <br />
                      <span className="text-purple-400">data:</span>
                      <span className="text-green-400"> {evt.data}</span>
                      {i < sseStream.length - 1 && <div className="mt-2 border-t border-white/5" />}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {sseStream.length === 0 && (
                  <p className="text-quest-muted animate-pulse">Connecting to stream...</p>
                )}
              </div>
            </div>
          </div>

          <DeepDive id="sse-vs-websocket" title="SSE vs WebSocket Performance" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p><strong>HTTP/2 multiplexing:</strong> With HTTP/2, multiple SSE streams can share a single TCP connection. This makes SSE almost as efficient as WebSockets for server-to-client updates, with none of the protocol complexity.</p>
              <p><strong>EventSource API simplicity:</strong> The browser's built-in EventSource API handles reconnection automatically with configurable retry intervals. WebSockets require manual reconnection logic or a library like Socket.io.</p>
              <p><strong>Proxy and CDN friendly:</strong> SSE works over standard HTTP, so it passes through corporate proxies, CDNs (like Cloudflare), and API gateways without special configuration. WebSockets often require explicit proxy support.</p>
              <p><strong>Text only:</strong> SSE only supports text data (UTF-8). For binary data like images or protocol buffers, you'd need to Base64 encode (increasing size by ~33%) or use WebSockets instead.</p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ========== SECTION: QUIZ ========== */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle className="text-quest-primary" />
              Knowledge Check
            </h2>

            <div className="space-y-8">
              {quizQuestions.map((q, qIdx) => (
                <div key={q.id} className="bg-quest-surface rounded-xl p-5">
                  <p className="font-semibold mb-4 text-quest-text">
                    {qIdx + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const selected = quizAnswers[q.id] === opt.id
                      const showResult = quizSubmitted
                      let optionClass = 'bg-quest-bg border border-white/10 hover:border-quest-primary/30'
                      if (showResult && opt.correct) {
                        optionClass = 'bg-green-500/10 border border-green-500/40'
                      } else if (showResult && selected && !opt.correct) {
                        optionClass = 'bg-red-500/10 border border-red-500/40'
                      } else if (selected) {
                        optionClass = 'bg-quest-primary/10 border border-quest-primary/40'
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                          className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${optionClass}`}
                          disabled={quizSubmitted}
                        >
                          <span className="font-mono text-quest-muted mr-2">{opt.id.toUpperCase()}.</span>
                          {opt.text}
                          {showResult && opt.correct && (
                            <CheckCircle size={16} className="inline ml-2 text-green-400" />
                          )}
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
                className="w-full mt-6 px-6 py-3 rounded-lg bg-quest-primary text-quest-bg font-semibold hover:bg-quest-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answers
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-green-500/10 rounded-xl p-6 border border-green-500/30 text-center"
              >
                <CheckCircle size={32} className="text-green-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Level 14 Complete!</h3>
                <p className="text-quest-muted text-sm">
                  You've mastered real-time communication patterns — from the simplicity of polling
                  to the power of WebSockets and the elegance of Server-Sent Events.
                </p>
                <p className="text-quest-muted text-sm mt-2">
                  Score: {quizQuestions.filter(q => {
                    const ans = quizAnswers[q.id]
                    return q.options.find(o => o.id === ans)?.correct
                  }).length} / {quizQuestions.length}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

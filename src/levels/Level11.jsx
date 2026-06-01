import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Mail, Send, Server, AlertTriangle, XCircle, Zap, Clock,
  BarChart3, RefreshCw, Play, Pause, ArrowDown, Package,
  ShieldAlert, Activity, Inbox, Archive
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

export default function Level11({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [saleRunning, setSaleRunning] = useState(false)
  const [saleMode, setSaleMode] = useState(null) // 'no-queue' | 'with-queue'
  const [ordersReceived, setOrdersReceived] = useState(0)
  const [ordersProcessed, setOrdersProcessed] = useState(0)
  const [ordersInQueue, setOrdersInQueue] = useState(0)
  const [ordersLost, setOrdersLost] = useState(0)
  const [serverCrashed, setServerCrashed] = useState(false)
  const saleInterval = useRef(null)
  const processInterval = useRef(null)

  // Anatomy state
  const [queueMessages, setQueueMessages] = useState([])
  const [processedMessages, setProcessedMessages] = useState([])
  const [nextMsgId, setNextMsgId] = useState(1)
  const [lifecycleStep, setLifecycleStep] = useState(0)

  // Patterns state
  const [deliveryMode, setDeliveryMode] = useState('at-least-once')
  const [patternMessages, setPatternMessages] = useState([])
  const [patternRunning, setPatternRunning] = useState(false)
  const [backpressureLevel, setBackpressureLevel] = useState(0)
  const [producerSpeed, setProducerSpeed] = useState('fast')

  // Failures state
  const [dlqMessages, setDlqMessages] = useState([])
  const [mainQueue, setMainQueue] = useState([])
  const [failedProcessing, setFailedProcessing] = useState([])
  const [dlqRunning, setDlqRunning] = useState(false)
  const [monitorStats, setMonitorStats] = useState({ depth: 0, rate: 0, errors: 0 })

  const sections = ['intro', 'anatomy', 'patterns', 'failures', 'quiz']

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Why use a message queue instead of direct API calls?',
      options: [
        { id: 'a', text: 'It makes API responses faster by skipping validation', correct: false },
        { id: 'b', text: 'To decouple producers from consumers and handle traffic spikes by buffering requests', correct: true },
        { id: 'c', text: 'Message queues eliminate the need for error handling', correct: false },
        { id: 'd', text: 'Queues automatically scale your database connections', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'What happens in "at-least-once" delivery when a consumer crashes before acknowledging?',
      options: [
        { id: 'a', text: 'The message is permanently lost and the producer must resend it', correct: false },
        { id: 'b', text: 'The queue automatically rolls back the entire transaction', correct: false },
        { id: 'c', text: 'The message is redelivered to another consumer, potentially causing duplicate processing', correct: true },
        { id: 'd', text: 'The queue pauses all consumers until the crashed one recovers', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What is a Dead Letter Queue?',
      options: [
        { id: 'a', text: 'A queue that stores messages older than 24 hours', correct: false },
        { id: 'b', text: 'A separate queue that stores messages that failed processing after multiple retry attempts', correct: true },
        { id: 'c', text: 'A backup queue used for disaster recovery', correct: false },
        { id: 'd', text: 'A queue that only handles delete operations', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What is backpressure?',
      options: [
        { id: 'a', text: 'The latency added by serializing messages into the queue format', correct: false },
        { id: 'b', text: 'When consumers push messages back to the producer for re-validation', correct: false },
        { id: 'c', text: 'A mechanism where the queue signals producers to slow down when it is becoming full', correct: true },
        { id: 'd', text: 'The CPU pressure caused by too many concurrent consumers', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  // --- INTRO: Flash Sale Simulation ---
  const resetSale = useCallback(() => {
    clearInterval(saleInterval.current)
    clearInterval(processInterval.current)
    setSaleRunning(false)
    setSaleMode(null)
    setOrdersReceived(0)
    setOrdersProcessed(0)
    setOrdersInQueue(0)
    setOrdersLost(0)
    setServerCrashed(false)
  }, [])

  const startSale = useCallback((mode) => {
    resetSale()
    setSaleMode(mode)
    setSaleRunning(true)
    let received = 0
    let processed = 0
    let inQueue = 0
    let lost = 0
    let crashed = false

    saleInterval.current = setInterval(() => {
      if (crashed) return
      const burst = Math.floor(Math.random() * 800) + 200
      received += burst
      if (received > 100000) received = 100000

      if (mode === 'no-queue') {
        if (received > 5000 && !crashed) {
          crashed = true
          setServerCrashed(true)
          lost = received - processed
          setOrdersLost(lost)
          clearInterval(saleInterval.current)
          clearInterval(processInterval.current)
        }
      } else {
        inQueue = received - processed
        setOrdersInQueue(inQueue)
      }
      setOrdersReceived(received)
    }, 100)

    processInterval.current = setInterval(() => {
      if (crashed) return
      const batch = mode === 'no-queue' ? 10 : 100
      processed += batch
      if (mode === 'with-queue' && processed > received) processed = received
      setOrdersProcessed(processed)
      if (mode === 'with-queue') {
        inQueue = Math.max(0, received - processed)
        setOrdersInQueue(inQueue)
      }
    }, 100)

    // Auto-stop after 8 seconds
    setTimeout(() => {
      clearInterval(saleInterval.current)
      if (mode === 'with-queue') {
        // Keep processing until queue drains
        const drainCheck = setInterval(() => {
          processed += 100
          setOrdersProcessed(prev => {
            const next = Math.min(prev + 100, received)
            if (next >= received) {
              clearInterval(drainCheck)
              clearInterval(processInterval.current)
              setSaleRunning(false)
              setOrdersInQueue(0)
            }
            return next
          })
        }, 100)
      }
    }, 4000)
  }, [resetSale])

  useEffect(() => {
    return () => {
      clearInterval(saleInterval.current)
      clearInterval(processInterval.current)
    }
  }, [])

  // --- PATTERNS: Delivery Guarantee Simulation ---
  const runDeliveryDemo = useCallback(() => {
    setPatternMessages([])
    setPatternRunning(true)
    const msgs = [
      { id: 1, label: 'Order #1' },
      { id: 2, label: 'Order #2' },
      { id: 3, label: 'Order #3' },
      { id: 4, label: 'Order #4' },
      { id: 5, label: 'Order #5' },
    ]

    msgs.forEach((msg, i) => {
      setTimeout(() => {
        if (deliveryMode === 'at-most-once') {
          const lost = i === 1 || i === 3
          setPatternMessages(prev => [...prev, { ...msg, status: lost ? 'lost' : 'delivered' }])
        } else if (deliveryMode === 'at-least-once') {
          const duped = i === 2 || i === 4
          setPatternMessages(prev => {
            const next = [...prev, { ...msg, status: 'delivered' }]
            if (duped) next.push({ ...msg, id: msg.id + 0.5, label: msg.label + ' (dup)', status: 'duplicate' })
            return next
          })
        } else {
          setPatternMessages(prev => [...prev, { ...msg, status: 'delivered', ack: true }])
        }
      }, i * 600)
    })

    setTimeout(() => setPatternRunning(false), 3500)
  }, [deliveryMode])

  // --- BACKPRESSURE ---
  useEffect(() => {
    if (backpressureLevel >= 80 && producerSpeed === 'fast') {
      setProducerSpeed('slow')
    }
    if (backpressureLevel < 40 && producerSpeed === 'slow') {
      setProducerSpeed('fast')
    }
  }, [backpressureLevel, producerSpeed])

  const runBackpressureDemo = useCallback(() => {
    setBackpressureLevel(0)
    setProducerSpeed('fast')
    let level = 0
    let direction = 1
    const interval = setInterval(() => {
      if (direction === 1) {
        level += level < 80 ? 8 : 2
      } else {
        level -= 5
      }
      if (level >= 90) direction = -1
      if (level <= 20) {
        clearInterval(interval)
      }
      level = Math.max(0, Math.min(100, level))
      setBackpressureLevel(level)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // --- FAILURES: DLQ Simulation ---
  const startDlqDemo = useCallback(() => {
    setDlqRunning(true)
    setMainQueue([])
    setDlqMessages([])
    setFailedProcessing([])
    setMonitorStats({ depth: 0, rate: 0, errors: 0 })

    const messages = [
      { id: 1, label: 'Order #201', poisoned: false },
      { id: 2, label: 'Order #202', poisoned: true, reason: 'Invalid JSON payload' },
      { id: 3, label: 'Order #203', poisoned: false },
      { id: 4, label: 'Order #204', poisoned: false },
      { id: 5, label: 'Order #205', poisoned: true, reason: 'Downstream service timeout' },
      { id: 6, label: 'Order #206', poisoned: false },
      { id: 7, label: 'Order #207', poisoned: true, reason: 'Serialization error' },
      { id: 8, label: 'Order #208', poisoned: false },
    ]

    // Add messages to queue one by one
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setMainQueue(prev => [...prev, { ...msg, retries: 0, status: 'queued' }])
        setMonitorStats(prev => ({ ...prev, depth: prev.depth + 1 }))
      }, i * 500)
    })

    // Process messages
    messages.forEach((msg, i) => {
      setTimeout(() => {
        if (msg.poisoned) {
          // Retry 3 times then send to DLQ
          [1, 2, 3].forEach((retry, r) => {
            setTimeout(() => {
              setMainQueue(prev => prev.map(m =>
                m.id === msg.id ? { ...m, retries: retry, status: retry < 3 ? 'retrying' : 'failed' } : m
              ))
              setMonitorStats(prev => ({ ...prev, errors: prev.errors + 1 }))
              if (retry === 3) {
                setTimeout(() => {
                  setMainQueue(prev => prev.filter(m => m.id !== msg.id))
                  setDlqMessages(prev => [...prev, { ...msg, retries: 3, status: 'in-dlq' }])
                  setMonitorStats(prev => ({ ...prev, depth: Math.max(0, prev.depth - 1) }))
                }, 300)
              }
            }, r * 400)
          })
        } else {
          setTimeout(() => {
            setMainQueue(prev => prev.filter(m => m.id !== msg.id))
            setFailedProcessing(prev => [...prev, { ...msg, status: 'processed' }])
            setMonitorStats(prev => ({
              ...prev,
              depth: Math.max(0, prev.depth - 1),
              rate: prev.rate + 1
            }))
          }, 200)
        }
      }, i * 500 + 2000)
    })

    setTimeout(() => setDlqRunning(false), 8000)
  }, [])

  const retryFromDlq = useCallback((msgId) => {
    setDlqMessages(prev => prev.map(m =>
      m.id === msgId ? { ...m, status: 'retrying' } : m
    ))
    setTimeout(() => {
      setDlqMessages(prev => prev.filter(m => m.id !== msgId))
      setFailedProcessing(prev => [...prev, { id: msgId, label: `Order #${200 + msgId}`, status: 'processed' }])
      setMonitorStats(prev => ({ ...prev, rate: prev.rate + 1, errors: Math.max(0, prev.errors - 1) }))
    }, 1000)
  }, [])

  // Anatomy: produce/consume
  const produceMessage = useCallback(() => {
    const items = ['Laptop', 'Phone', 'Headphones', 'Keyboard', 'Monitor', 'Mouse', 'Tablet', 'Camera']
    const msg = {
      id: nextMsgId,
      item: items[Math.floor(Math.random() * items.length)],
      qty: Math.floor(Math.random() * 3) + 1,
      color: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 6)]
    }
    setQueueMessages(prev => [...prev, msg])
    setNextMsgId(prev => prev + 1)
  }, [nextMsgId])

  const consumeMessage = useCallback(() => {
    if (queueMessages.length === 0) return
    const msg = queueMessages[0]
    setQueueMessages(prev => prev.slice(1))
    setProcessedMessages(prev => [...prev, msg])
  }, [queueMessages])

  const lifecycleSteps = ['Created', 'Queued', 'Delivered', 'Acknowledged', 'Deleted']

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

      {/* ============ INTRO: Flash Sale Simulator ============ */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-quest-primary" />
              Message in a Bottle
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "A flash sale! 100,000 orders in 10 seconds. Your order service can only handle 100/second.
                Without a buffer, your system drowns. You need a{' '}
                <Term word="Message Queue" definition="A middleware component that stores messages from producers and delivers them to consumers asynchronously, decoupling the two and enabling buffering during traffic spikes." onLearn={learnTerm} />
                {' '}to survive."
              </p>
            </div>

            <p className="text-quest-muted mb-6">
              A message queue sits between{' '}
              <Term word="Producer/Consumer" definition="Producers create and send messages to a queue. Consumers read and process messages from the queue. This pattern decouples the sender from the receiver." onLearn={learnTerm} />
              {' '}systems, absorbing traffic bursts and letting consumers process at their own pace. Click below to see the difference.
            </p>

            {/* Flash Sale Simulator */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10">
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => startSale('no-queue')}
                  disabled={saleRunning}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Play size={16} /> Without Queue
                </button>
                <button
                  onClick={() => startSale('with-queue')}
                  disabled={saleRunning}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  <Play size={16} /> With Queue
                </button>
                {saleMode && (
                  <button onClick={resetSale} className="px-4 py-2 rounded-lg bg-quest-surface text-quest-muted hover:text-quest-text transition-colors">
                    Reset
                  </button>
                )}
              </div>

              {saleMode && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {/* Counters */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-xs text-quest-muted mb-1">Orders Received</p>
                      <p className="text-2xl font-bold text-quest-primary">{ordersReceived.toLocaleString()}</p>
                    </div>
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-xs text-quest-muted mb-1">Orders Processed</p>
                      <p className="text-2xl font-bold text-green-400">{ordersProcessed.toLocaleString()}</p>
                    </div>
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-xs text-quest-muted mb-1">In Queue</p>
                      <p className="text-2xl font-bold text-yellow-400">{saleMode === 'with-queue' ? ordersInQueue.toLocaleString() : '---'}</p>
                    </div>
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-xs text-quest-muted mb-1">Orders Lost</p>
                      <p className="text-2xl font-bold text-red-400">{ordersLost.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Visual Flow */}
                  <div className="flex items-center justify-center gap-2 py-4">
                    {/* Producers */}
                    <div className="flex flex-col gap-1">
                      {[1, 2, 3].map(i => (
                        <motion.div
                          key={i}
                          animate={saleRunning ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 0.3, delay: i * 0.1 }}
                          className="w-14 h-10 rounded bg-quest-primary/20 border border-quest-primary/40 flex items-center justify-center"
                        >
                          <Send size={14} className="text-quest-primary" />
                        </motion.div>
                      ))}
                      <p className="text-xs text-quest-muted text-center mt-1">Users</p>
                    </div>

                    <ArrowRight className="text-quest-muted" />

                    {saleMode === 'with-queue' && (
                      <>
                        {/* Queue visual */}
                        <div className="relative">
                          <div className="w-32 h-16 rounded-lg border-2 border-yellow-500/50 bg-yellow-500/10 flex items-center justify-center overflow-hidden">
                            <div className="flex gap-0.5">
                              {Array.from({ length: Math.min(12, Math.ceil(ordersInQueue / 1000)) }).map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  className="w-2 h-8 rounded-sm bg-yellow-400/70"
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-yellow-400 text-center mt-1">Queue</p>
                        </div>
                        <ArrowRight className="text-quest-muted" />
                      </>
                    )}

                    {/* Server */}
                    <motion.div
                      animate={serverCrashed ? { rotate: [0, -5, 5, -5, 0] } : saleRunning ? { scale: [1, 1.05, 1] } : {}}
                      transition={serverCrashed ? { duration: 0.5 } : { repeat: Infinity, duration: 1 }}
                      className={`w-20 h-16 rounded-lg border-2 flex flex-col items-center justify-center gap-1
                        ${serverCrashed ? 'border-red-500 bg-red-500/20' : 'border-green-500/50 bg-green-500/10'}`}
                    >
                      <Server size={18} className={serverCrashed ? 'text-red-400' : 'text-green-400'} />
                      {serverCrashed && <XCircle size={14} className="text-red-400" />}
                    </motion.div>
                    <p className="text-xs text-quest-muted ml-1">
                      {serverCrashed ? 'CRASHED!' : 'Server'}
                    </p>
                  </div>

                  {/* Result message */}
                  {!saleRunning && saleMode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center p-3 rounded-lg ${saleMode === 'no-queue' ? 'bg-red-500/10 border border-red-500/30' : 'bg-green-500/10 border border-green-500/30'}`}
                    >
                      {saleMode === 'no-queue' ? (
                        <p className="text-red-400">Server crashed! <strong>{ordersLost.toLocaleString()}</strong> orders lost. Customers are furious.</p>
                      ) : (
                        <p className="text-green-400">All orders buffered in the queue and processed safely. Zero orders lost!</p>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ ANATOMY: Build Your Own Queue ============ */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Inbox className="text-quest-primary" />
              Build Your Own Queue
            </h2>

            <p className="text-quest-muted mb-6">
              Click the buttons to produce and consume messages. Watch how the queue buffers them in{' '}
              <strong>FIFO</strong> (First-In, First-Out) order.
            </p>

            {/* Interactive Queue Diagram */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10">
              <div className="flex justify-center gap-3 mb-6">
                <button onClick={produceMessage} className="btn-primary flex items-center gap-2">
                  <Send size={16} /> Produce Message
                </button>
                <button
                  onClick={consumeMessage}
                  disabled={queueMessages.length === 0}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-40"
                >
                  <Package size={16} /> Consume Message
                </button>
              </div>

              <div className="flex items-center justify-center gap-4">
                {/* Producers */}
                <div className="space-y-2">
                  {['Orders API', 'Payments', 'Inventory'].map((name, i) => (
                    <div key={i} className="w-24 h-12 rounded-lg bg-quest-primary/15 border border-quest-primary/30 flex items-center justify-center text-xs text-quest-primary font-medium">
                      {name}
                    </div>
                  ))}
                  <p className="text-xs text-quest-muted text-center">Producers</p>
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="text-quest-muted mb-1" />
                  <ArrowRight className="text-quest-muted" />
                  <ArrowRight className="text-quest-muted mt-1" />
                </div>

                {/* Queue */}
                <div className="w-48 min-h-[140px] rounded-lg border-2 border-yellow-500/40 bg-yellow-500/5 p-2 flex flex-col gap-1 relative">
                  <p className="text-xs text-yellow-400 font-semibold mb-1 text-center">Queue ({queueMessages.length})</p>
                  <AnimatePresence>
                    {queueMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ x: -40, opacity: 0, scale: 0.8 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        exit={{ x: 40, opacity: 0, scale: 0.8 }}
                        className="px-2 py-1.5 rounded text-xs font-mono flex items-center gap-1"
                        style={{ backgroundColor: msg.color + '20', borderLeft: `3px solid ${msg.color}` }}
                      >
                        #{msg.id} {msg.item} x{msg.qty}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {queueMessages.length === 0 && (
                    <p className="text-xs text-quest-muted text-center py-4 italic">Empty</p>
                  )}
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="text-quest-muted mb-1" />
                  <ArrowRight className="text-quest-muted" />
                </div>

                {/* Consumers */}
                <div className="space-y-2">
                  {['Worker 1', 'Worker 2'].map((name, i) => (
                    <div key={i} className="w-24 h-12 rounded-lg bg-green-500/15 border border-green-500/30 flex items-center justify-center text-xs text-green-400 font-medium">
                      <Server size={12} className="mr-1" /> {name}
                    </div>
                  ))}
                  <p className="text-xs text-quest-muted text-center">Consumers</p>
                  {processedMessages.length > 0 && (
                    <div className="text-xs text-green-400 text-center">{processedMessages.length} processed</div>
                  )}
                </div>
              </div>
            </div>

            {/* Message Lifecycle */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10 mt-6">
              <h3 className="font-semibold mb-4">Message Lifecycle</h3>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {lifecycleSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <motion.button
                      onClick={() => setLifecycleStep(i)}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
                        ${i <= lifecycleStep
                          ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                          : 'bg-quest-surface text-quest-muted border border-white/5'
                        }`}
                    >
                      {step}
                    </motion.button>
                    {i < lifecycleSteps.length - 1 && <ArrowRight size={14} className="text-quest-muted" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-quest-muted text-center">
                {lifecycleStep === 0 && 'Producer creates a message with payload and metadata.'}
                {lifecycleStep === 1 && 'Message is written to the queue and stored durably on disk.'}
                {lifecycleStep === 2 && 'Queue delivers the message to an available consumer.'}
                {lifecycleStep === 3 && 'Consumer sends an ACK confirming successful processing.'}
                {lifecycleStep === 4 && 'Queue removes the acknowledged message permanently.'}
              </div>
            </div>

            {/* Queue Comparison */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {[
                {
                  name: 'Kafka',
                  word: 'Kafka',
                  def: 'A distributed event streaming platform designed for high-throughput, fault-tolerant, publish-subscribe messaging with message retention and replay.',
                  traits: ['High throughput (millions/sec)', 'Log-based retention', 'Consumer groups', 'Message replay'],
                  color: 'quest-primary'
                },
                {
                  name: 'RabbitMQ',
                  word: 'RabbitMQ',
                  def: 'A traditional message broker implementing AMQP protocol with flexible routing, exchanges, and bindings for complex message routing patterns.',
                  traits: ['Flexible routing', 'AMQP protocol', 'Priority queues', 'Message acknowledgment'],
                  color: 'quest-secondary'
                },
                {
                  name: 'SQS',
                  word: 'SQS',
                  def: 'Amazon Simple Queue Service - a fully managed message queue service that eliminates the need to manage message broker infrastructure.',
                  traits: ['Fully managed (AWS)', 'Auto-scaling', 'Pay per message', 'No ops overhead'],
                  color: 'green-400'
                }
              ].map(q => (
                <div key={q.name} className="concept-card">
                  <h4 className="font-semibold mb-2">
                    <Term word={q.word} definition={q.def} onLearn={learnTerm} />
                  </h4>
                  <ul className="space-y-1">
                    {q.traits.map(t => (
                      <li key={t} className="text-sm text-quest-muted flex items-start gap-1.5">
                        <CheckCircle size={12} className={`text-${q.color} mt-0.5 shrink-0`} />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <DeepDive id="kafka-vs-rabbit-vs-sqs" title="Kafka vs RabbitMQ vs SQS: When to Use What" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p><strong className="text-quest-text">Use Kafka when:</strong> You need high-throughput event streaming, want to replay messages, or have multiple consumers reading the same stream. Great for event sourcing, real-time analytics, and log aggregation.</p>
                <p><strong className="text-quest-text">Use RabbitMQ when:</strong> You need complex routing logic, priority queues, or request-reply patterns. Better for task queues, RPC-style communication, and when you need flexible message routing with exchanges and bindings.</p>
                <p><strong className="text-quest-text">Use SQS when:</strong> You want zero operational overhead, are already on AWS, and need a simple, reliable queue. Perfect for decoupling microservices, handling async tasks, and when you do not want to manage infrastructure.</p>
                <p><strong className="text-quest-text">Key Difference:</strong> Kafka is a distributed log (consumers pull, messages persist), RabbitMQ is a traditional broker (pushes to consumers, messages deleted after ACK), and SQS is a managed cloud queue (simplest to operate, limited features).</p>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ============ PATTERNS: Delivery Guarantees ============ */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Mail className="text-quest-primary" />
              Delivery Guarantees Playground
            </h2>

            <p className="text-quest-muted mb-6">
              How do you ensure a message actually gets processed? There are three delivery guarantees, each with trade-offs. Toggle between them to see how messages behave.
            </p>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-2 mb-6">
              {[
                { id: 'at-most-once', label: 'At-Most-Once', desc: 'Fire and forget' },
                { id: 'at-least-once', label: 'At-Least-Once', desc: 'Retry on failure' },
                { id: 'exactly-once', label: 'Exactly-Once', desc: 'Full handshake' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => { setDeliveryMode(mode.id); setPatternMessages([]) }}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all flex flex-col items-center
                    ${deliveryMode === mode.id
                      ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                      : 'bg-quest-surface text-quest-muted hover:text-quest-text border border-white/5'
                    }`}
                >
                  <span>{mode.label}</span>
                  <span className="text-xs opacity-60">{mode.desc}</span>
                </button>
              ))}
            </div>

            {/* Run button */}
            <div className="flex justify-center mb-4">
              <button
                onClick={runDeliveryDemo}
                disabled={patternRunning}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Play size={16} /> Send 5 Messages
              </button>
            </div>

            {/* Delivery Visualization */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10 min-h-[200px]">
              <div className="flex items-start justify-between">
                <div className="w-16 text-center">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-quest-primary/20 border border-quest-primary/30 flex items-center justify-center">
                    <Send size={16} className="text-quest-primary" />
                  </div>
                  <p className="text-xs text-quest-muted mt-1">Producer</p>
                </div>

                <div className="flex-1 px-4">
                  <div className="border-b border-dashed border-white/10 mb-3 pb-1 text-xs text-quest-muted text-center">
                    {deliveryMode === 'at-most-once' && 'Messages sent without confirmation. Some may be lost.'}
                    {deliveryMode === 'at-least-once' && 'Messages retried on failure. Duplicates are possible.'}
                    {deliveryMode === 'exactly-once' && 'Full acknowledgment handshake. Guaranteed once delivery.'}
                  </div>
                  <AnimatePresence>
                    {patternMessages.map((msg, i) => (
                      <motion.div
                        key={msg.id + '-' + i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center gap-2 mb-2 px-3 py-2 rounded-lg text-sm
                          ${msg.status === 'delivered' ? 'bg-green-500/10 border border-green-500/20' : ''}
                          ${msg.status === 'lost' ? 'bg-red-500/10 border border-red-500/20 line-through' : ''}
                          ${msg.status === 'duplicate' ? 'bg-yellow-500/10 border border-yellow-500/20' : ''}
                        `}
                      >
                        {msg.status === 'delivered' && <CheckCircle size={14} className="text-green-400 shrink-0" />}
                        {msg.status === 'lost' && <XCircle size={14} className="text-red-400 shrink-0" />}
                        {msg.status === 'duplicate' && <RefreshCw size={14} className="text-yellow-400 shrink-0" />}
                        <span className={
                          msg.status === 'lost' ? 'text-red-400' :
                          msg.status === 'duplicate' ? 'text-yellow-400' : 'text-quest-text'
                        }>
                          {msg.label}
                        </span>
                        {msg.ack && <span className="text-xs text-green-400 ml-auto">ACK</span>}
                        {msg.status === 'lost' && <span className="text-xs text-red-400 ml-auto">LOST</span>}
                        {msg.status === 'duplicate' && <span className="text-xs text-yellow-400 ml-auto">DUPLICATE</span>}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="w-16 text-center">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <Server size={16} className="text-green-400" />
                  </div>
                  <p className="text-xs text-quest-muted mt-1">Consumer</p>
                </div>
              </div>
            </div>

            <p className="text-quest-muted mt-4 text-sm">
              Most production systems use{' '}
              <Term word="At-Least-Once" definition="A delivery guarantee where the system ensures every message is delivered at least once, but may deliver duplicates. Consumers must handle duplicates through idempotency." onLearn={learnTerm} />
              {' '}delivery combined with idempotent consumers. Exactly-once is extremely hard to achieve and often involves distributed transactions.
            </p>

            {/* Backpressure Section */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10 mt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Activity size={18} className="text-quest-primary" />
                <Term word="Backpressure" definition="A flow control mechanism where a system signals upstream producers to slow down when it cannot keep up with the incoming message rate, preventing queue overflow." onLearn={learnTerm} />
                {' '}Visualization
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                Watch the queue fill up. When it gets too full, the producer is told to slow down.
              </p>

              <button onClick={runBackpressureDemo} className="btn-secondary flex items-center gap-2 mb-4">
                <Play size={16} /> Run Backpressure Demo
              </button>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-quest-muted w-24">Queue fill:</span>
                  <div className="flex-1 h-6 bg-quest-surface rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full transition-colors ${
                        backpressureLevel > 80 ? 'bg-red-500' :
                        backpressureLevel > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      animate={{ width: `${backpressureLevel}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-mono w-12 text-right">{backpressureLevel}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-quest-muted w-24">Producer:</span>
                  <motion.div
                    animate={producerSpeed === 'fast' ? { scale: [1, 1.15, 1] } : { scale: [1, 1.03, 1] }}
                    transition={{ repeat: Infinity, duration: producerSpeed === 'fast' ? 0.3 : 1.2 }}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      producerSpeed === 'fast' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {producerSpeed === 'fast' ? 'Full Speed' : 'Throttled (Backpressure Active)'}
                  </motion.div>
                </div>
              </div>
            </div>

            <DeepDive id="idempotency" title="Idempotency: Making At-Least-Once Safe" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>Since at-least-once delivery can produce duplicates, consumers must be <strong className="text-quest-text">idempotent</strong> -- processing the same message twice should have the same effect as processing it once.</p>
                <p><strong className="text-quest-text">Strategies for idempotency:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Idempotency keys:</strong> Store a unique ID for each processed message. Before processing, check if the ID already exists.</li>
                  <li><strong>Database constraints:</strong> Use UNIQUE constraints or upserts so duplicate inserts are harmless.</li>
                  <li><strong>Natural idempotency:</strong> Design operations that are naturally idempotent (e.g., "set balance to $100" vs "add $100 to balance").</li>
                </ul>
                <p>Most production systems (Stripe, AWS, etc.) use at-least-once delivery with idempotency keys because it offers the best balance of reliability and simplicity.</p>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ============ FAILURES: Dead Letter Queue Detective ============ */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <ShieldAlert className="text-quest-primary" />
              Dead Letter Queue Detective
            </h2>

            <p className="text-quest-muted mb-6">
              What happens when a message cannot be processed? After multiple retries, poisoned messages are sent to a{' '}
              <Term word="Dead Letter Queue" definition="A separate queue that stores messages which have failed processing after a configured number of retry attempts. Engineers can inspect and reprocess these messages later." onLearn={learnTerm} />
              . Watch the simulation below.
            </p>

            <button
              onClick={startDlqDemo}
              disabled={dlqRunning}
              className="btn-primary flex items-center gap-2 mb-6 disabled:opacity-50"
            >
              <Play size={16} /> Start Queue Processing
            </button>

            <div className="bg-quest-bg rounded-xl p-6 border border-white/10">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Main Queue */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <Inbox size={14} className="text-yellow-400" /> Main Queue
                  </h4>
                  <div className="min-h-[180px] bg-quest-surface/30 rounded-lg p-2 space-y-1">
                    <AnimatePresence>
                      {mainQueue.map(msg => (
                        <motion.div
                          key={msg.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 20, opacity: 0 }}
                          className={`px-2 py-1.5 rounded text-xs font-mono flex items-center justify-between
                            ${msg.poisoned ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'}`}
                        >
                          <span className={msg.poisoned ? 'text-red-400' : 'text-green-400'}>{msg.label}</span>
                          {msg.status === 'retrying' && (
                            <span className="text-yellow-400 flex items-center gap-1">
                              <RefreshCw size={10} className="animate-spin" /> {msg.retries}/3
                            </span>
                          )}
                          {msg.status === 'failed' && <span className="text-red-400">Failed</span>}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {mainQueue.length === 0 && !dlqRunning && (
                      <p className="text-xs text-quest-muted text-center py-8 italic">Click start to begin</p>
                    )}
                  </div>
                </div>

                {/* Processed */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <CheckCircle size={14} className="text-green-400" /> Processed
                  </h4>
                  <div className="min-h-[180px] bg-quest-surface/30 rounded-lg p-2 space-y-1">
                    <AnimatePresence>
                      {failedProcessing.map(msg => (
                        <motion.div
                          key={msg.id}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="px-2 py-1.5 rounded text-xs font-mono bg-green-500/10 border border-green-500/20 text-green-400"
                        >
                          {msg.label} <CheckCircle size={10} className="inline" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Dead Letter Queue */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <AlertTriangle size={14} className="text-red-400" /> Dead Letter Queue
                  </h4>
                  <div className="min-h-[180px] bg-red-500/5 rounded-lg p-2 space-y-1 border border-red-500/10">
                    <AnimatePresence>
                      {dlqMessages.map(msg => (
                        <motion.div
                          key={msg.id}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          className="px-2 py-1.5 rounded text-xs font-mono bg-red-500/10 border border-red-500/20"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-red-400">{msg.label}</span>
                            <button
                              onClick={() => retryFromDlq(msg.id)}
                              disabled={msg.status === 'retrying'}
                              className="text-yellow-400 hover:text-yellow-300 disabled:opacity-50"
                            >
                              <RefreshCw size={12} className={msg.status === 'retrying' ? 'animate-spin' : ''} />
                            </button>
                          </div>
                          <p className="text-[10px] text-red-300/60 mt-0.5">{msg.reason}</p>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    {dlqMessages.length === 0 && (
                      <p className="text-xs text-quest-muted text-center py-8 italic">No failed messages</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Monitoring Dashboard */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-1">
                  <BarChart3 size={14} className="text-quest-primary" /> Monitoring Dashboard
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Queue Depth', value: monitorStats.depth, color: 'yellow', max: 8 },
                    { label: 'Processed', value: monitorStats.rate, color: 'green', max: 8 },
                    { label: 'Errors', value: monitorStats.errors, color: 'red', max: 10 },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-xs text-quest-muted mb-1">{stat.label}</p>
                      <div className="h-20 bg-quest-surface/30 rounded flex items-end justify-center p-1">
                        <motion.div
                          className={`w-8 bg-${stat.color}-500/60 rounded-t`}
                          animate={{ height: `${Math.min(100, (stat.value / stat.max) * 100)}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className={`text-lg font-bold text-${stat.color}-400 mt-1`}>{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Failure Scenario Cards */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: <XCircle size={18} className="text-red-400" />, title: 'Serialization Error', desc: 'Message payload cannot be deserialized. Often caused by schema changes or corrupt data.' },
                { icon: <Clock size={18} className="text-yellow-400" />, title: 'Downstream Timeout', desc: 'A dependency (database, API) is unavailable. May succeed on retry when the service recovers.' },
                { icon: <AlertTriangle size={18} className="text-orange-400" />, title: 'Invalid Data', desc: 'Business logic validation fails. These usually need human intervention to fix the data.' },
              ].map(card => (
                <div key={card.title} className="concept-card">
                  <div className="flex items-center gap-2 mb-2">
                    {card.icon}
                    <h4 className="font-semibold text-sm">{card.title}</h4>
                  </div>
                  <p className="text-xs text-quest-muted">{card.desc}</p>
                </div>
              ))}
            </div>

            <DeepDive id="queue-monitoring" title="Queue Monitoring & Alerting: What to Watch" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p><strong className="text-quest-text">Key metrics to monitor:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong>Queue depth:</strong> Number of messages waiting. A growing queue means consumers cannot keep up.</li>
                  <li><strong>Consumer lag:</strong> How far behind consumers are from the latest message. Critical for real-time systems.</li>
                  <li><strong>Processing rate:</strong> Messages processed per second. Track trends to detect degradation.</li>
                  <li><strong>Error rate:</strong> Percentage of messages failing. Spikes indicate bugs or downstream issues.</li>
                  <li><strong>DLQ size:</strong> Growing DLQ means persistent failures that need investigation.</li>
                  <li><strong>Age of oldest message:</strong> If messages sit too long, your SLA is at risk.</li>
                </ul>
                <p><strong className="text-quest-text">When to page:</strong> Alert immediately on DLQ growth, sustained consumer lag increase, or error rate above 5%. Set warning thresholds on queue depth trending upward for more than 15 minutes.</p>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ============ QUIZ ============ */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="text-quest-primary" />
              Knowledge Check
            </h2>

            {quizQuestions.map((q, qi) => (
              <div key={q.id} className="mb-6 last:mb-0">
                <p className="font-semibold mb-3">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map(opt => {
                    const selected = quizAnswers[q.id] === opt.id
                    const showResult = quizSubmitted
                    let optClass = 'bg-quest-surface hover:bg-quest-surface/80 border border-white/5'
                    if (selected && !showResult) optClass = 'bg-quest-primary/20 border border-quest-primary/40'
                    if (showResult && opt.correct) optClass = 'bg-green-500/15 border border-green-500/40'
                    if (showResult && selected && !opt.correct) optClass = 'bg-red-500/15 border border-red-500/40'

                    return (
                      <button
                        key={opt.id}
                        onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${optClass}`}
                      >
                        <span className="flex items-center gap-2">
                          {showResult && opt.correct && <CheckCircle size={16} className="text-green-400 shrink-0" />}
                          {showResult && selected && !opt.correct && <XCircle size={16} className="text-red-400 shrink-0" />}
                          {opt.text}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="flex justify-center pt-4">
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length || quizSubmitted}
                className="btn-primary px-8 py-3 disabled:opacity-50"
              >
                {quizSubmitted ? 'Submitted!' : 'Submit Answers'}
              </button>
            </div>

            {quizSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <p className="text-lg font-semibold">
                  Score: {quizQuestions.filter(q => {
                    const selected = quizAnswers[q.id]
                    return q.options.find(o => o.id === selected)?.correct
                  }).length}/{quizQuestions.length}
                </p>
                <p className="text-quest-muted mt-1">
                  {quizQuestions.filter(q => {
                    const selected = quizAnswers[q.id]
                    return q.options.find(o => o.id === selected)?.correct
                  }).length === quizQuestions.length
                    ? 'Perfect! You have mastered message queues and async processing.'
                    : 'Review the sections above for any questions you missed.'}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

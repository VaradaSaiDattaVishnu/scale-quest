import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Shield, Zap, AlertTriangle, Clock, Server, XCircle,
  Activity, RefreshCw, Timer, ShieldOff, ShieldCheck,
  Layers, Box, Cpu, RotateCcw, Play, Pause, Settings
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

const serviceChain = [
  { id: 'frontend', label: 'Frontend', icon: 'monitor' },
  { id: 'checkout', label: 'Checkout', icon: 'cart' },
  { id: 'payment', label: 'Payment', icon: 'credit' },
  { id: 'recommendation', label: 'Recommendations', icon: 'star' },
]

const quizQuestions = [
  {
    id: 'q1',
    question: 'What are the three states of a Circuit Breaker?',
    options: [
      { id: 'a', text: 'Closed (normal operation), Open (failing fast), and Half-Open (testing if the service has recovered)', correct: true },
      { id: 'b', text: 'Active, Inactive, and Standby', correct: false },
      { id: 'c', text: 'Green, Yellow, and Red based on response latency thresholds', correct: false },
      { id: 'd', text: 'Connected, Disconnected, and Reconnecting', correct: false },
    ]
  },
  {
    id: 'q2',
    question: 'Why is exponential backoff with jitter preferred over fixed-interval retries?',
    options: [
      { id: 'a', text: 'It makes the code simpler to implement and debug', correct: false },
      { id: 'b', text: 'It prevents retry storms where all clients retry at the same time, spreading load more evenly', correct: true },
      { id: 'c', text: 'It guarantees the request will eventually succeed', correct: false },
      { id: 'd', text: 'It reduces the total number of retry attempts needed', correct: false },
    ]
  },
  {
    id: 'q3',
    question: 'What is the Bulkhead pattern?',
    options: [
      { id: 'a', text: 'A way to encrypt traffic between microservices', correct: false },
      { id: 'b', text: 'A load balancing algorithm that distributes requests evenly', correct: false },
      { id: 'c', text: 'Isolating resources per dependency so that one failing dependency cannot consume all resources and affect others', correct: true },
      { id: 'd', text: 'A database sharding strategy that separates read and write operations', correct: false },
    ]
  },
  {
    id: 'q4',
    question: 'What should a service do when its circuit breaker is OPEN?',
    options: [
      { id: 'a', text: 'Queue the request and wait until the service recovers', correct: false },
      { id: 'b', text: 'Retry the request with exponential backoff', correct: false },
      { id: 'c', text: 'Return a fallback response immediately without attempting to call the failing service', correct: true },
      { id: 'd', text: 'Route the request to a different instance of the same service', correct: false },
    ]
  }
]

export default function Level19({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [cascadePhase, setCascadePhase] = useState('idle') // idle, failing, cascading, protected
  const [dominoIndex, setDominoIndex] = useState(-1)
  const cascadeTimerRef = useRef(null)

  // Circuit breaker state
  const [cbState, setCbState] = useState('closed') // closed, open, half-open
  const [backendHealthy, setBackendHealthy] = useState(true)
  const [failureCount, setFailureCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [failureThreshold, setFailureThreshold] = useState(5)
  const [openTimeout, setOpenTimeout] = useState(5)
  const [halfOpenTests, setHalfOpenTests] = useState(3)
  const [openTimer, setOpenTimer] = useState(0)
  const [halfOpenSuccesses, setHalfOpenSuccesses] = useState(0)
  const [requestLog, setRequestLog] = useState([])
  const [cbRunning, setCbRunning] = useState(false)
  const cbIntervalRef = useRef(null)
  const openTimerRef = useRef(null)
  const requestIdRef = useRef(0)

  // Retry pattern state
  const [retryAttempts, setRetryAttempts] = useState([])
  const [retryRunning, setRetryRunning] = useState(false)
  const [retryConfig, setRetryConfig] = useState({ maxRetries: 4, baseDelay: 1000, jitter: true })
  const retryTimerRef = useRef(null)

  // Timeout state
  const [timeoutValue, setTimeoutValue] = useState(3000)
  const [timeoutDemo, setTimeoutDemo] = useState({ running: false, elapsed: 0, result: null })
  const timeoutIntervalRef = useRef(null)

  // Bulkhead state
  const [bulkheadEnabled, setBulkheadEnabled] = useState(false)
  const [pools, setPools] = useState({
    A: { total: 10, used: 0, label: 'Service A', healthy: true },
    B: { total: 10, used: 0, label: 'Service B', healthy: true },
    C: { total: 10, used: 0, label: 'Service C', healthy: true },
  })
  const [sharedPool, setSharedPool] = useState({ total: 30, used: 0 })
  const [bulkheadSlowService, setBulkheadSlowService] = useState(null)
  const bulkheadRef = useRef(null)

  const sections = ['intro', 'circuitbreaker', 'patterns', 'bulkhead', 'quiz']

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(cascadeTimerRef.current)
      clearInterval(cbIntervalRef.current)
      clearInterval(openTimerRef.current)
      clearTimeout(retryTimerRef.current)
      clearInterval(timeoutIntervalRef.current)
      clearInterval(bulkheadRef.current)
    }
  }, [])

  // ---- Intro cascade animation ----
  const startCascade = useCallback((withBreaker) => {
    setCascadePhase('idle')
    setDominoIndex(-1)
    clearInterval(cascadeTimerRef.current)

    if (withBreaker) {
      setCascadePhase('protected')
      setDominoIndex(3) // recommendation fails
      setTimeout(() => setDominoIndex(3.5), 800) // breaker trips
    } else {
      setCascadePhase('failing')
      let idx = 3
      setDominoIndex(3)
      cascadeTimerRef.current = setInterval(() => {
        idx--
        if (idx < 0) {
          clearInterval(cascadeTimerRef.current)
          setCascadePhase('cascading')
          return
        }
        setDominoIndex(idx)
      }, 900)
    }
  }, [])

  // ---- Circuit Breaker simulation ----
  const startCbSimulation = useCallback(() => {
    setCbRunning(true)
    setRequestLog([])
    setFailureCount(0)
    setSuccessCount(0)
    setCbState('closed')
    setOpenTimer(0)
    setHalfOpenSuccesses(0)
    requestIdRef.current = 0
  }, [])

  useEffect(() => {
    if (!cbRunning) {
      clearInterval(cbIntervalRef.current)
      return
    }

    cbIntervalRef.current = setInterval(() => {
      requestIdRef.current++
      const id = requestIdRef.current

      setCbState(prev => {
        if (prev === 'open') {
          setRequestLog(l => [...l.slice(-19), { id, state: 'open', result: 'blocked', time: Date.now() }])
          return 'open'
        }

        const success = backendHealthy ? Math.random() > 0.1 : Math.random() > 0.85

        if (prev === 'half-open') {
          if (success) {
            setHalfOpenSuccesses(s => {
              const next = s + 1
              if (next >= halfOpenTests) {
                setFailureCount(0)
                setRequestLog(l => [...l.slice(-19), { id, state: 'half-open', result: 'success', time: Date.now() }])
                return 0
              }
              setRequestLog(l => [...l.slice(-19), { id, state: 'half-open', result: 'success', time: Date.now() }])
              return next
            })
            return success && halfOpenSuccesses + 1 >= halfOpenTests ? 'closed' : 'half-open'
          } else {
            setHalfOpenSuccesses(0)
            setOpenTimer(openTimeout)
            setRequestLog(l => [...l.slice(-19), { id, state: 'half-open', result: 'failure', time: Date.now() }])
            return 'open'
          }
        }

        // closed state
        if (success) {
          setSuccessCount(c => c + 1)
          setRequestLog(l => [...l.slice(-19), { id, state: 'closed', result: 'success', time: Date.now() }])
          return 'closed'
        } else {
          setFailureCount(f => {
            const next = f + 1
            if (next >= failureThreshold) {
              setOpenTimer(openTimeout)
              return next
            }
            return next
          })
          setRequestLog(l => [...l.slice(-19), { id, state: 'closed', result: 'failure', time: Date.now() }])
          return failureCount + 1 >= failureThreshold ? 'open' : 'closed'
        }
      })
    }, 600)

    return () => clearInterval(cbIntervalRef.current)
  }, [cbRunning, backendHealthy, failureThreshold, openTimeout, halfOpenTests, failureCount, halfOpenSuccesses])

  // Open timer countdown
  useEffect(() => {
    if (cbState !== 'open' || openTimer <= 0) {
      clearInterval(openTimerRef.current)
      return
    }

    openTimerRef.current = setInterval(() => {
      setOpenTimer(t => {
        if (t <= 1) {
          setCbState('half-open')
          setHalfOpenSuccesses(0)
          return 0
        }
        return t - 1
      })
    }, 1000)

    return () => clearInterval(openTimerRef.current)
  }, [cbState, openTimer])

  // ---- Retry simulation ----
  const startRetry = useCallback(() => {
    setRetryRunning(true)
    setRetryAttempts([])
    let attempt = 0
    const maxAttempts = retryConfig.maxRetries + 1

    const doAttempt = () => {
      const isLast = attempt === maxAttempts - 1
      const success = isLast || (attempt > 0 && Math.random() > 0.6)
      const delay = attempt === 0 ? 0 : retryConfig.baseDelay * Math.pow(2, attempt - 1)
      const jitter = retryConfig.jitter ? Math.floor(Math.random() * delay * 0.5) - delay * 0.25 : 0
      const actualDelay = Math.max(0, delay + jitter)

      setRetryAttempts(prev => [...prev, {
        attempt: attempt + 1,
        delay: actualDelay,
        success,
        timestamp: Date.now()
      }])

      if (success) {
        setRetryRunning(false)
        return
      }

      attempt++
      if (attempt >= maxAttempts) {
        setRetryRunning(false)
        return
      }

      retryTimerRef.current = setTimeout(doAttempt, Math.min(actualDelay, 2000) + 500)
    }

    doAttempt()
  }, [retryConfig])

  // ---- Timeout demo ----
  const startTimeoutDemo = useCallback(() => {
    const responseTime = 1000 + Math.random() * 8000
    setTimeoutDemo({ running: true, elapsed: 0, result: null })
    const start = Date.now()

    timeoutIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start
      if (elapsed >= timeoutValue) {
        clearInterval(timeoutIntervalRef.current)
        setTimeoutDemo({ running: false, elapsed: timeoutValue, result: 'timeout' })
        return
      }
      if (elapsed >= responseTime) {
        clearInterval(timeoutIntervalRef.current)
        setTimeoutDemo({ running: false, elapsed: Math.round(responseTime), result: 'success' })
        return
      }
      setTimeoutDemo(prev => ({ ...prev, elapsed }))
    }, 50)
  }, [timeoutValue])

  // ---- Bulkhead simulation ----
  const slowDownService = useCallback((serviceKey) => {
    setBulkheadSlowService(serviceKey)
    clearInterval(bulkheadRef.current)

    const tick = () => {
      if (bulkheadEnabled) {
        setPools(prev => {
          const updated = { ...prev }
          Object.keys(updated).forEach(k => {
            if (k === serviceKey) {
              updated[k] = { ...updated[k], used: Math.min(updated[k].total, updated[k].used + 2), healthy: false }
            } else {
              updated[k] = { ...updated[k], used: Math.max(0, Math.min(3, updated[k].used + (Math.random() > 0.5 ? 1 : -1))), healthy: true }
            }
          })
          return updated
        })
        setSharedPool(prev => ({ ...prev, used: 0 }))
      } else {
        const slowUsage = Math.min(30, sharedPool.used + 3)
        setSharedPool({ total: 30, used: slowUsage })
        setPools(prev => {
          const updated = { ...prev }
          Object.keys(updated).forEach(k => {
            updated[k] = { ...updated[k], used: 0, healthy: k !== serviceKey ? slowUsage < 30 : false }
          })
          return updated
        })
      }
    }

    bulkheadRef.current = setInterval(tick, 400)
  }, [bulkheadEnabled])

  const resetBulkhead = useCallback(() => {
    clearInterval(bulkheadRef.current)
    setBulkheadSlowService(null)
    setPools({
      A: { total: 10, used: 0, label: 'Service A', healthy: true },
      B: { total: 10, used: 0, label: 'Service B', healthy: true },
      C: { total: 10, used: 0, label: 'Service C', healthy: true },
    })
    setSharedPool({ total: 30, used: 0 })
  }, [])

  useEffect(() => {
    resetBulkhead()
  }, [bulkheadEnabled, resetBulkhead])

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const cbStateColor = cbState === 'closed' ? 'text-green-400' : cbState === 'open' ? 'text-red-400' : 'text-yellow-400'
  const cbStateBg = cbState === 'closed' ? 'bg-green-500/20 border-green-500/40' : cbState === 'open' ? 'bg-red-500/20 border-red-500/40' : 'bg-yellow-500/20 border-yellow-500/40'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setCurrentSection(i)}
            className={`flex-1 h-2 rounded-full transition-all ${
              i <= currentSection ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 'bg-quest-surface'
            }`}
          />
        ))}
      </div>

      {/* ============ SECTION: INTRO ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                <ShieldOff size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">The Cascade of Doom</h2>
                <p className="text-quest-muted text-sm italic">
                  "The recommendation service is down. Now the entire checkout is failing. This shouldn't happen."
                </p>
              </div>
            </div>

            <p className="text-quest-muted mb-6">
              In a microservices architecture, one failing service can take down the entire system.
              This is called a <strong className="text-quest-text">cascading failure</strong>. Let's watch it happen.
            </p>

            {/* Service chain visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Service Chain</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => startCascade(false)}
                    className="btn-primary text-xs px-3 py-1"
                  >
                    Without Circuit Breaker
                  </button>
                  <button
                    onClick={() => startCascade(true)}
                    className="btn-secondary text-xs px-3 py-1"
                  >
                    With Circuit Breaker
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 md:gap-4">
                {serviceChain.map((svc, i) => {
                  const isFailed = cascadePhase === 'failing' || cascadePhase === 'cascading'
                    ? dominoIndex <= i
                    : cascadePhase === 'protected'
                      ? i === 3
                      : false

                  const isProtected = cascadePhase === 'protected' && i < 3

                  return (
                    <div key={svc.id} className="flex items-center gap-2 md:gap-4">
                      <motion.div
                        animate={{
                          scale: isFailed ? [1, 0.9, 1] : 1,
                          rotate: isFailed && cascadePhase !== 'protected' ? [0, -5, 5, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`relative p-3 md:p-4 rounded-xl border-2 transition-all duration-500 ${
                          isFailed
                            ? 'border-red-500/60 bg-red-500/10'
                            : isProtected
                              ? 'border-green-500/60 bg-green-500/10'
                              : 'border-white/10 bg-quest-surface'
                        }`}
                      >
                        <Server size={20} className={`mx-auto mb-1 ${isFailed ? 'text-red-400' : isProtected ? 'text-green-400' : 'text-quest-muted'}`} />
                        <p className="text-xs font-medium text-center">{svc.label}</p>
                        {isFailed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2"
                          >
                            <XCircle size={18} className="text-red-400" />
                          </motion.div>
                        )}
                        {isProtected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2"
                          >
                            <ShieldCheck size={18} className="text-green-400" />
                          </motion.div>
                        )}

                        {/* Spinning loader for hanging service */}
                        {cascadePhase === 'failing' && dominoIndex === i + 1 && i < 3 && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
                          >
                            <RefreshCw size={12} className="text-yellow-400" />
                          </motion.div>
                        )}
                      </motion.div>
                      {i < serviceChain.length - 1 && (
                        <ArrowRight size={16} className={`flex-shrink-0 ${
                          cascadePhase === 'protected' && i === 2
                            ? 'text-red-400'
                            : 'text-quest-muted'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Status messages */}
              <AnimatePresence mode="wait">
                {cascadePhase === 'cascading' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-quest-muted">
                        <p className="font-semibold text-red-400 mb-1">Total System Failure!</p>
                        <p>Recommendations went down. Checkout hung waiting for it, exhausting its thread pool.
                        Payment couldn't reach Checkout. Frontend shows errors to ALL users.
                        One service took down everything.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {cascadePhase === 'protected' && dominoIndex === 3.5 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                  >
                    <div className="flex items-start gap-2">
                      <ShieldCheck size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-quest-muted">
                        <p className="font-semibold text-green-400 mb-1">Circuit Breaker Saved the Day!</p>
                        <p>Recommendations went down, but Checkout's circuit breaker detected the failure and
                        immediately returned cached recommendations instead. Payment and Frontend continue
                        working normally. Users barely notice.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term word="Circuit Breaker" definition="A design pattern that detects failures and prevents cascading errors by short-circuiting requests to a failing service, returning a fallback response instead of waiting and potentially failing." onLearn={learnTerm} />{' '}
              wraps calls to external services and monitors for failures. When failures reach a threshold,
              it 'trips' and immediately returns a{' '}
              <Term word="Fallback" definition="An alternative response returned when the primary service is unavailable. This could be cached data, a default value, a simplified response, or a graceful error message." onLearn={learnTerm} />{' '}
              response without even trying the failing service.
            </p>

            <DeepDive id="netflix-2012-outage" title="The 2012 Netflix Outage" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                In 2012, a cascading failure took down major portions of Netflix. A single service experienced
                elevated latency, which caused callers to hold connections open longer, exhausting their thread pools.
                Those callers then became slow, affecting their callers, and so on.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                This event directly led to the creation of <strong>Hystrix</strong>, Netflix's circuit breaker library.
                Hystrix wrapped every inter-service call with circuit breakers, bulkheads, and timeouts,
                ensuring that no single dependency could take down the entire system.
              </p>
              <p className="text-sm text-quest-muted">
                Though Hystrix is now in maintenance mode (replaced by Resilience4j in the Java ecosystem),
                its patterns remain the gold standard for building resilient distributed systems.
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Circuit Breaker Deep Dive <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: CIRCUIT BREAKER ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-emerald-400" />
              Three States of a Circuit Breaker
            </h2>

            <p className="text-quest-muted mb-6">
              A circuit breaker operates like an electrical switch. It monitors requests and automatically
              opens when failures accumulate, protecting your system from cascading doom.
            </p>

            {/* State machine diagram */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { state: 'closed', label: 'CLOSED', color: 'green', icon: ShieldCheck, desc: 'All requests pass through. Failure counter tracks errors.' },
                  { state: 'open', label: 'OPEN', color: 'red', icon: ShieldOff, desc: 'All requests immediately fail fast or return fallback.' },
                  { state: 'half-open', label: 'HALF-OPEN', color: 'yellow', icon: Activity, desc: 'Limited test requests pass. Success closes, failure re-opens.' },
                ].map(s => (
                  <motion.div
                    key={s.state}
                    animate={{
                      scale: cbState === s.state ? 1.05 : 1,
                      borderColor: cbState === s.state ? `var(--tw-${s.color}-500)` : undefined,
                    }}
                    className={`rounded-xl p-4 border-2 transition-all duration-300 ${
                      cbState === s.state
                        ? `bg-${s.color}-500/15 border-${s.color}-500/60`
                        : 'bg-quest-surface/50 border-white/10'
                    }`}
                  >
                    <s.icon size={24} className={`mb-2 ${cbState === s.state ? `text-${s.color}-400` : 'text-quest-muted'}`} />
                    <p className={`font-bold text-sm mb-1 ${cbState === s.state ? `text-${s.color}-400` : 'text-quest-muted'}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-quest-muted">{s.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Transition arrows */}
              <div className="flex justify-center gap-4 text-xs text-quest-muted mb-6">
                <span className="bg-quest-surface px-3 py-1 rounded-full">
                  CLOSED --<span className="text-red-400">failures hit threshold</span>--&gt; OPEN
                </span>
                <span className="bg-quest-surface px-3 py-1 rounded-full">
                  OPEN --<span className="text-yellow-400">timeout expires</span>--&gt; HALF-OPEN
                </span>
                <span className="bg-quest-surface px-3 py-1 rounded-full">
                  HALF-OPEN --<span className="text-green-400">tests pass</span>--&gt; CLOSED
                </span>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                  onClick={() => {
                    if (cbRunning) {
                      setCbRunning(false)
                    } else {
                      startCbSimulation()
                    }
                  }}
                  className={`${cbRunning ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2 text-sm`}
                >
                  {cbRunning ? <><Pause size={16} /> Stop</> : <><Play size={16} /> Start Simulation</>}
                </button>

                <button
                  onClick={() => setBackendHealthy(!backendHealthy)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    backendHealthy
                      ? 'border-green-500/40 bg-green-500/10 text-green-400'
                      : 'border-red-500/40 bg-red-500/10 text-red-400'
                  }`}
                >
                  Backend: {backendHealthy ? 'Healthy' : 'Down'}
                </button>

                <div className="flex items-center gap-2 text-xs text-quest-muted">
                  <span>State:</span>
                  <span className={`font-bold uppercase ${cbStateColor}`}>{cbState}</span>
                  {cbState === 'open' && <span className="text-yellow-400">({openTimer}s)</span>}
                </div>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Failures</p>
                  <p className="text-xl font-bold text-red-400">{failureCount}<span className="text-sm text-quest-muted">/{failureThreshold}</span></p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Successes</p>
                  <p className="text-xl font-bold text-green-400">{successCount}</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Half-Open Tests</p>
                  <p className="text-xl font-bold text-yellow-400">{halfOpenSuccesses}<span className="text-sm text-quest-muted">/{halfOpenTests}</span></p>
                </div>
              </div>

              {/* Request log */}
              <div className="h-28 overflow-hidden bg-quest-surface/50 rounded-lg p-2">
                <div className="flex flex-wrap gap-1">
                  <AnimatePresence>
                    {requestLog.map((req) => (
                      <motion.div
                        key={req.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${
                          req.result === 'success'
                            ? 'bg-green-500/30 text-green-400'
                            : req.result === 'blocked'
                              ? 'bg-orange-500/30 text-orange-400'
                              : 'bg-red-500/30 text-red-400'
                        }`}
                        title={`#${req.id} ${req.state} - ${req.result}`}
                      >
                        {req.result === 'success' ? 'O' : req.result === 'blocked' ? 'B' : 'X'}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <p className="text-[10px] text-quest-muted mt-2">
                  O = success | X = failure | B = blocked by open circuit
                </p>
              </div>

              {/* Configuration sliders */}
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="text-xs text-quest-muted block mb-1">Failure Threshold: {failureThreshold}</label>
                  <input type="range" min="2" max="10" value={failureThreshold}
                    onChange={e => setFailureThreshold(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-quest-muted block mb-1">Open Timeout: {openTimeout}s</label>
                  <input type="range" min="2" max="15" value={openTimeout}
                    onChange={e => setOpenTimeout(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-quest-muted block mb-1">Half-Open Tests: {halfOpenTests}</label>
                  <input type="range" min="1" max="5" value={halfOpenTests}
                    onChange={e => setHalfOpenTests(Number(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>

            <p className="text-quest-muted mb-4">
              <Term word="Hystrix" definition="Netflix's open-source circuit breaker library for Java. It provided circuit breakers, bulkheads, and fallbacks for distributed systems. Now in maintenance mode, but its patterns live on." onLearn={learnTerm} />{' '}
              pioneered the circuit breaker pattern in microservices.{' '}
              <Term word="Resilience4j" definition="A lightweight, modular fault tolerance library for Java, inspired by Hystrix. It provides circuit breaker, rate limiter, retry, bulkhead, and time limiter patterns with a functional programming style." onLearn={learnTerm} />{' '}
              is its modern successor, offering a lighter and more modular approach.
            </p>

            <DeepDive id="cb-configuration" title="Circuit Breaker Configuration" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Failure Rate vs Count:</strong> You can trip the breaker on a fixed failure count (e.g., 5 failures)
                or a failure rate within a sliding window (e.g., 50% failure rate over the last 100 requests).
                Rate-based is generally preferred since it adapts to traffic volume.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Sliding Window Types:</strong> Count-based windows track the last N requests.
                Time-based windows track requests in the last N seconds. Time-based is better for services
                with variable traffic patterns.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Minimum Request Volume:</strong> Don't trip the breaker if there have been very few requests.
                If only 2 requests came in and 1 failed, that's 50% but not statistically significant.
                Set a minimum (e.g., 20 requests) before evaluating the failure rate.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Slow Call Handling:</strong> Resilience4j can also count slow responses (exceeding a
                configured duration) as failures, catching degraded services before they fully fail.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Resilience Patterns <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: PATTERNS ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-emerald-400" />
              Resilience Toolkit
            </h2>

            <p className="text-quest-muted mb-6">
              Circuit breakers are just one tool. A truly resilient system combines multiple patterns,
              each addressing a different failure mode.
            </p>

            {/* ---- Retry Pattern ---- */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <RotateCcw size={18} className="text-emerald-400" />
                <Term word="Retry Pattern" definition="Automatically retrying a failed request with increasing delays between attempts. Uses exponential backoff (doubling wait times) with random jitter to avoid thundering herd problems." onLearn={learnTerm} />
              </h3>

              <p className="text-sm text-quest-muted mb-4">
                Transient failures are common in distributed systems: network blips, brief overloads,
                garbage collection pauses. A simple retry often succeeds. The key is <strong>how</strong> you retry.
              </p>

              {/* Retry config */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs text-quest-muted block mb-1">Max Retries: {retryConfig.maxRetries}</label>
                  <input type="range" min="1" max="6" value={retryConfig.maxRetries}
                    onChange={e => setRetryConfig(p => ({ ...p, maxRetries: Number(e.target.value) }))} className="w-full" />
                </div>
                <div>
                  <label className="text-xs text-quest-muted block mb-1">Base Delay: {retryConfig.baseDelay}ms</label>
                  <input type="range" min="200" max="3000" step="200" value={retryConfig.baseDelay}
                    onChange={e => setRetryConfig(p => ({ ...p, baseDelay: Number(e.target.value) }))} className="w-full" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-quest-muted">Jitter:</label>
                  <button
                    onClick={() => setRetryConfig(p => ({ ...p, jitter: !p.jitter }))}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      retryConfig.jitter ? 'bg-emerald-500/20 text-emerald-400' : 'bg-quest-surface text-quest-muted'
                    }`}
                  >
                    {retryConfig.jitter ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>

              <button
                onClick={startRetry}
                disabled={retryRunning}
                className="btn-primary text-sm mb-4 disabled:opacity-50"
              >
                {retryRunning ? 'Retrying...' : 'Send Request'}
              </button>

              {/* Retry visualization */}
              {retryAttempts.length > 0 && (
                <div className="space-y-2">
                  {retryAttempts.map((attempt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        attempt.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {attempt.attempt}
                      </div>
                      <div className="flex-1 h-2 bg-quest-surface rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                          className={`h-full rounded-full ${attempt.success ? 'bg-green-500' : 'bg-red-500'}`}
                        />
                      </div>
                      {i > 0 && (
                        <span className="text-xs text-quest-muted w-20 text-right">
                          wait {Math.round(attempt.delay)}ms
                        </span>
                      )}
                      <span className={`text-xs font-medium w-14 text-right ${
                        attempt.success ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {attempt.success ? 'Success' : 'Failed'}
                      </span>
                    </motion.div>
                  ))}

                  {/* Backoff explanation */}
                  <div className="mt-3 bg-quest-surface/50 rounded-lg p-3">
                    <p className="text-xs text-quest-muted">
                      <strong className="text-emerald-400">Exponential Backoff:</strong>{' '}
                      {retryAttempts.filter(a => !a.success).length > 1
                        ? `Delays: ${retryAttempts.slice(1).map(a => `${Math.round(a.delay)}ms`).join(' -> ')}. `
                        : ''
                      }
                      Each retry waits ~2x longer.
                      {retryConfig.jitter && ' Random jitter prevents all clients from retrying at the exact same time.'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ---- Timeout Pattern ---- */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Timer size={18} className="text-yellow-400" />
                <Term word="Timeout" definition="A maximum duration to wait for a response before giving up. Prevents threads and connections from being held indefinitely by slow or unresponsive services." onLearn={learnTerm} />
              </h3>

              <p className="text-sm text-quest-muted mb-4">
                Without timeouts, a request to a slow service can hang forever, holding threads and connections hostage.
                Set timeouts too short and you get false failures; too long and you waste resources.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex-1 min-w-[200px]">
                  <label className="text-xs text-quest-muted block mb-1">Timeout: {(timeoutValue / 1000).toFixed(1)}s</label>
                  <input type="range" min="500" max="10000" step="500" value={timeoutValue}
                    onChange={e => setTimeoutValue(Number(e.target.value))} className="w-full" />
                </div>
                <button
                  onClick={startTimeoutDemo}
                  disabled={timeoutDemo.running}
                  className="btn-primary text-sm disabled:opacity-50"
                >
                  {timeoutDemo.running ? 'Waiting...' : 'Send Request'}
                </button>
              </div>

              {/* Timeout visualization */}
              <div className="relative h-12 bg-quest-surface rounded-lg overflow-hidden mb-3">
                {/* Timeout boundary marker */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-yellow-400/60 z-10"
                  style={{ left: `${(timeoutValue / 10000) * 100}%` }}
                />
                <span
                  className="absolute -top-0 text-[9px] text-yellow-400 z-10 transform -translate-x-1/2"
                  style={{ left: `${(timeoutValue / 10000) * 100}%` }}
                >
                  timeout
                </span>

                {/* Progress bar */}
                {(timeoutDemo.running || timeoutDemo.result) && (
                  <motion.div
                    className={`absolute top-2 bottom-2 left-1 rounded ${
                      timeoutDemo.result === 'success' ? 'bg-green-500/40' :
                      timeoutDemo.result === 'timeout' ? 'bg-red-500/40' : 'bg-blue-500/40'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(timeoutDemo.elapsed / 10000) * 100}%` }}
                    transition={{ duration: 0.05, ease: 'linear' }}
                  />
                )}

                {/* Time label */}
                <span className="absolute bottom-1 right-2 text-xs text-quest-muted">
                  {(timeoutDemo.elapsed / 1000).toFixed(1)}s / 10.0s
                </span>
              </div>

              {timeoutDemo.result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-3 rounded-lg border text-xs ${
                    timeoutDemo.result === 'success'
                      ? 'bg-green-500/10 border-green-500/30 text-green-400'
                      : 'bg-red-500/10 border-red-500/30 text-red-400'
                  }`}
                >
                  {timeoutDemo.result === 'success'
                    ? `Response received in ${(timeoutDemo.elapsed / 1000).toFixed(1)}s (under the ${(timeoutValue / 1000).toFixed(1)}s timeout)`
                    : `Timeout! No response after ${(timeoutValue / 1000).toFixed(1)}s. Failing fast to free resources.`
                  }
                </motion.div>
              )}

              {/* Cascading timeouts note */}
              <div className="mt-4 bg-quest-surface/50 rounded-lg p-3">
                <p className="text-xs text-quest-muted">
                  <strong className="text-yellow-400">Cascading Timeouts:</strong> If Service A (timeout 5s)
                  calls B (timeout 3s) calls C (timeout 2s), each layer needs a shorter timeout than its caller.
                  Otherwise A might timeout before B has a chance to respond, even if C was fast.
                </p>
              </div>
            </div>

            {/* ---- Fallback Strategies ---- */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers size={18} className="text-blue-400" />
                Fallback Strategies
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Cache Fallback',
                    desc: 'Serve stale data from cache. Users get slightly outdated info, but the system stays up.',
                    icon: '💾',
                    color: 'border-blue-500/30',
                    example: 'Return cached product recommendations from 5 min ago'
                  },
                  {
                    title: 'Default Value',
                    desc: 'Return reasonable defaults when the real data is unavailable.',
                    icon: '📋',
                    color: 'border-green-500/30',
                    example: 'Show "Popular Items" instead of personalized recommendations'
                  },
                  {
                    title: 'Graceful Degradation',
                    desc: 'Show a simplified UI without the failed feature. Core flow still works.',
                    icon: '🔽',
                    color: 'border-yellow-500/30',
                    example: 'Hide the recommendation widget, checkout still works'
                  },
                  {
                    title: 'Queue for Later',
                    desc: 'Accept the request and process it asynchronously when the service recovers.',
                    icon: '📬',
                    color: 'border-purple-500/30',
                    example: 'Queue the analytics event, send when analytics service is back'
                  },
                ].map(strategy => (
                  <motion.div
                    key={strategy.title}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-quest-surface rounded-lg p-4 border ${strategy.color}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{strategy.icon}</span>
                      <p className="font-semibold text-sm">{strategy.title}</p>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">{strategy.desc}</p>
                    <p className="text-xs text-quest-muted italic bg-quest-bg/50 rounded p-2">
                      Example: {strategy.example}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <DeepDive id="retry-storms" title="Retry Storms" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The Thundering Herd:</strong> Imagine 1,000 clients all calling a service that goes down
                for 2 seconds. Without jitter, all 1,000 retry at exactly 1s, then 2s, then 4s. Each retry
                wave slams the recovering service with 1,000 simultaneous requests, potentially knocking it down again.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Jitter to the Rescue:</strong> By adding randomness to retry delays, clients spread their
                retries over time. Instead of 1,000 requests at t=1s, you get a gradual trickle from t=0.5s to t=1.5s.
                The recovering service can handle the load gracefully.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Retry Budgets:</strong> An advanced technique where each service has a budget for retries
                (e.g., retries should be at most 10% of total requests). When the budget is exceeded,
                requests fail without retrying, preventing retry amplification during outages.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Bulkhead Pattern <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: BULKHEAD ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Box className="text-emerald-400" />
              <Term word="Bulkhead" definition="A resilience pattern that isolates resources (threads, connections, memory) per dependency, so that one failing dependency cannot exhaust all resources and bring down the entire service. Named after watertight compartments in ships." onLearn={learnTerm} /> Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              Think of a ship with watertight compartments. If one compartment floods, the ship stays afloat
              because the other compartments are isolated. The Bulkhead pattern applies the same principle to software.
            </p>

            {/* Ship analogy */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4 justify-center">
                <div className="text-center">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-12 h-8 rounded border ${
                        i === 2 ? 'bg-red-500/30 border-red-500/40' : 'bg-blue-500/10 border-blue-500/30'
                      } flex items-center justify-center text-xs`}>
                        {i === 2 ? '~' : ''}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-quest-muted">Compartment 2 floods, ship stays afloat</p>
                </div>
              </div>

              {/* Toggle bulkhead mode */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => setBulkheadEnabled(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    !bulkheadEnabled ? 'border-red-500/40 bg-red-500/10 text-red-400' : 'border-white/10 text-quest-muted'
                  }`}
                >
                  Shared Pool (No Bulkhead)
                </button>
                <button
                  onClick={() => setBulkheadEnabled(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    bulkheadEnabled ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-white/10 text-quest-muted'
                  }`}
                >
                  Isolated Pools (Bulkhead)
                </button>
              </div>

              {/* Pool visualization */}
              {!bulkheadEnabled ? (
                /* Shared pool view */
                <div className="mb-4">
                  <div className="bg-quest-surface rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-quest-muted mb-2 text-center font-semibold">
                      Shared Thread Pool ({sharedPool.used}/{sharedPool.total} threads used)
                    </p>
                    <div className="grid grid-cols-10 gap-1 mb-3">
                      {Array.from({ length: sharedPool.total }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ backgroundColor: i < sharedPool.used ? '#ef4444' : '#22c55e' }}
                          className="h-6 rounded"
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(pools).map(([key, pool]) => (
                        <div key={key} className={`text-center p-2 rounded-lg border ${
                          pool.healthy ? 'border-green-500/30' : 'border-red-500/30'
                        }`}>
                          <Server size={16} className={`mx-auto mb-1 ${pool.healthy ? 'text-green-400' : 'text-red-400'}`} />
                          <p className="text-xs font-medium">{pool.label}</p>
                          <p className={`text-xs ${pool.healthy ? 'text-green-400' : 'text-red-400'}`}>
                            {pool.healthy ? 'OK' : 'Blocked!'}
                          </p>
                        </div>
                      ))}
                    </div>
                    {sharedPool.used >= 28 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-red-400 text-center mt-2 font-semibold"
                      >
                        All threads consumed! Every service is affected!
                      </motion.p>
                    )}
                  </div>
                </div>
              ) : (
                /* Bulkhead isolated pools */
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {Object.entries(pools).map(([key, pool]) => (
                    <div key={key} className={`bg-quest-surface rounded-xl p-4 border-2 transition-all ${
                      bulkheadSlowService === key
                        ? 'border-red-500/40'
                        : pool.healthy
                          ? 'border-green-500/30'
                          : 'border-white/10'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-semibold">{pool.label}</p>
                        <Server size={14} className={bulkheadSlowService === key ? 'text-red-400' : 'text-green-400'} />
                      </div>
                      <p className="text-[10px] text-quest-muted mb-2">{pool.used}/{pool.total} threads</p>
                      <div className="grid grid-cols-5 gap-0.5">
                        {Array.from({ length: pool.total }).map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              backgroundColor: i < pool.used
                                ? bulkheadSlowService === key ? '#ef4444' : '#3b82f6'
                                : '#1f2937'
                            }}
                            className="h-4 rounded"
                          />
                        ))}
                      </div>
                      {bulkheadSlowService === key && pool.used >= pool.total && (
                        <p className="text-[10px] text-red-400 mt-1 font-semibold">Pool exhausted</p>
                      )}
                      {bulkheadSlowService && bulkheadSlowService !== key && (
                        <p className="text-[10px] text-green-400 mt-1 font-semibold">Unaffected!</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {['A', 'B', 'C'].map(key => (
                  <button
                    key={key}
                    onClick={() => slowDownService(key)}
                    disabled={bulkheadSlowService === key}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      bulkheadSlowService === key
                        ? 'border-red-500/40 bg-red-500/10 text-red-400'
                        : 'border-white/10 hover:border-white/30 text-quest-muted'
                    } disabled:opacity-50`}
                  >
                    Slow Down Service {key}
                  </button>
                ))}
                <button
                  onClick={resetBulkhead}
                  className="px-3 py-2 rounded-lg text-xs font-medium border border-white/10 hover:border-white/30 text-quest-muted"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Combined patterns */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Settings size={18} className="text-quest-primary" />
                Combined Resilience Stack
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                In production, these patterns work together in layers. Here's how a request flows through a fully
                resilient service:
              </p>

              <div className="space-y-2">
                {[
                  { label: 'Bulkhead', desc: 'Allocate a thread from the dependency-specific pool', color: 'bg-purple-500/20 border-purple-500/40', icon: Box },
                  { label: 'Circuit Breaker', desc: 'Check if the circuit is closed. If open, return fallback immediately', color: 'bg-emerald-500/20 border-emerald-500/40', icon: Zap },
                  { label: 'Timeout', desc: 'Set a maximum wait time for the response', color: 'bg-yellow-500/20 border-yellow-500/40', icon: Timer },
                  { label: 'Retry', desc: 'On transient failure, retry with exponential backoff + jitter', color: 'bg-blue-500/20 border-blue-500/40', icon: RotateCcw },
                  { label: 'Fallback', desc: 'If all retries fail, return cached/default response', color: 'bg-red-500/20 border-red-500/40', icon: Shield },
                ].map((layer, i) => (
                  <motion.div
                    key={layer.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${layer.color}`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-quest-bg flex items-center justify-center">
                      <layer.icon size={16} className="text-quest-text" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{i + 1}. {layer.label}</p>
                      <p className="text-xs text-quest-muted">{layer.desc}</p>
                    </div>
                    {i < 4 && <ArrowRight size={14} className="text-quest-muted" />}
                  </motion.div>
                ))}
              </div>
            </div>

            <DeepDive id="bulkhead-practice" title="Bulkhead in Practice" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Hystrix Thread Pools:</strong> Hystrix assigned each dependency its own thread pool.
                If the recommendation service slowed down, only its 10 threads were consumed.
                Payment service had its own 10 threads, completely unaffected. The downside: thread pools
                add overhead (context switching, memory).
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Resilience4j Semaphores:</strong> Instead of separate thread pools, Resilience4j uses
                semaphores to limit concurrent calls per dependency. Lighter weight than thread pools,
                but doesn't provide timeout isolation (you need a separate timeout mechanism).
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Kubernetes Resource Limits:</strong> At the infrastructure level, Kubernetes provides
                bulkheads through CPU/memory limits per pod. If one service goes haywire consuming CPU,
                its pod gets throttled, but other pods on the same node keep running. Combined with
                Pod Disruption Budgets and resource quotas, Kubernetes provides infrastructure-level resilience.
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
              <Shield className="text-emerald-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Building resilient systems is critical for production reliability. Let's verify your understanding!
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
                <h3 className="text-xl font-bold mb-2">Level 19 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You've mastered resilience patterns: circuit breakers, retries with backoff,
                  timeouts, bulkheads, and fallback strategies. Your services can now fail gracefully
                  without taking down the entire system.
                </p>
                <p className="text-sm text-emerald-400">
                  No single dependency failure will cascade through your architecture again.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

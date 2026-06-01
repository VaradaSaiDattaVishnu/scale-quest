import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Shield, Clock, Gauge, AlertTriangle, Filter, Zap } from 'lucide-react'

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

/* ── Token Bucket Visualization ── */
function TokenBucketSim() {
  const MAX_TOKENS = 10
  const REFILL_RATE = 1
  const REFILL_INTERVAL = 800
  const [tokens, setTokens] = useState(MAX_TOKENS)
  const [log, setLog] = useState([])
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setTokens(prev => Math.min(prev + REFILL_RATE, MAX_TOKENS))
    }, REFILL_INTERVAL)
    return () => clearInterval(timer)
  }, [running])

  const sendRequest = () => {
    if (tokens > 0) {
      setTokens(prev => prev - 1)
      setLog(prev => [{ id: Date.now(), status: 'allowed', time: new Date().toLocaleTimeString() }, ...prev].slice(0, 12))
    } else {
      setLog(prev => [{ id: Date.now(), status: 'rejected', time: new Date().toLocaleTimeString() }, ...prev].slice(0, 12))
    }
  }

  const burstRequests = () => {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => sendRequest(), i * 80)
    }
  }

  return (
    <div className="bg-quest-bg rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold flex items-center gap-2">
          <Filter size={16} className="text-quest-primary" />
          Token Bucket
        </h4>
        <button
          onClick={() => setRunning(!running)}
          className="text-xs px-2 py-1 rounded bg-quest-surface border border-white/10"
        >
          {running ? 'Pause Refill' : 'Resume Refill'}
        </button>
      </div>

      {/* Bucket visualization */}
      <div className="flex items-end gap-1 justify-center mb-4 h-32 bg-quest-surface/50 rounded-lg p-3">
        <div className="relative w-40 h-full border-2 border-quest-primary/50 border-t-0 rounded-b-lg flex items-end overflow-hidden">
          <motion.div
            className="w-full bg-quest-primary/30"
            animate={{ height: `${(tokens / MAX_TOKENS) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
          {/* Token circles inside bucket */}
          <div className="absolute inset-0 flex flex-wrap content-end justify-center gap-1 p-2">
            {Array.from({ length: tokens }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-5 h-5 rounded-full bg-quest-primary flex items-center justify-center"
              >
                <Zap size={10} className="text-white" />
              </motion.div>
            ))}
          </div>
          {/* Overflow line */}
          <div className="absolute top-0 left-0 right-0 border-t-2 border-dashed border-quest-warning/60" />
          <span className="absolute top-1 right-1 text-[10px] text-quest-muted">max: {MAX_TOKENS}</span>
        </div>
        <div className="text-center ml-4">
          <p className="text-3xl font-bold text-quest-primary">{tokens}</p>
          <p className="text-xs text-quest-muted">tokens</p>
          <p className="text-[10px] text-quest-muted mt-1">+{REFILL_RATE} every {REFILL_INTERVAL}ms</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button onClick={sendRequest} className="btn-primary text-sm flex-1 flex items-center justify-center gap-1">
          <Zap size={14} /> Send Request
        </button>
        <button onClick={burstRequests} className="btn-secondary text-sm flex-1 flex items-center justify-center gap-1">
          <AlertTriangle size={14} /> Burst (6x)
        </button>
      </div>

      {/* Request log */}
      <div className="space-y-1 max-h-40 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {log.map(entry => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex items-center justify-between text-xs p-2 rounded ${
                entry.status === 'allowed'
                  ? 'bg-quest-success/10 text-quest-success'
                  : 'bg-quest-danger/10 text-quest-danger'
              }`}
            >
              <span>{entry.status === 'allowed' ? 'ALLOWED' : 'REJECTED (429)'}</span>
              <span className="text-quest-muted">{entry.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Sliding Window vs Fixed Window ── */
function WindowComparisonSim() {
  const WINDOW_SIZE = 5000
  const LIMIT = 5
  const [fixedRequests, setFixedRequests] = useState([])
  const [slidingRequests, setSlidingRequests] = useState([])
  const [now, setNow] = useState(Date.now())
  const [fixedLog, setFixedLog] = useState([])
  const [slidingLog, setSlidingLog] = useState([])

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 200)
    return () => clearInterval(timer)
  }, [])

  const getFixedWindowStart = (t) => Math.floor(t / WINDOW_SIZE) * WINDOW_SIZE

  const sendFixedRequest = useCallback(() => {
    const t = Date.now()
    const windowStart = getFixedWindowStart(t)
    const windowReqs = fixedRequests.filter(r => r >= windowStart && r < windowStart + WINDOW_SIZE)
    if (windowReqs.length < LIMIT) {
      setFixedRequests(prev => [...prev, t])
      setFixedLog(prev => [{ id: t, status: 'allowed' }, ...prev].slice(0, 8))
    } else {
      setFixedLog(prev => [{ id: t, status: 'rejected' }, ...prev].slice(0, 8))
    }
  }, [fixedRequests])

  const sendSlidingRequest = useCallback(() => {
    const t = Date.now()
    const windowReqs = slidingRequests.filter(r => r > t - WINDOW_SIZE)
    if (windowReqs.length < LIMIT) {
      setSlidingRequests(prev => [...prev.filter(r => r > t - WINDOW_SIZE), t])
      setSlidingLog(prev => [{ id: t, status: 'allowed' }, ...prev].slice(0, 8))
    } else {
      setSlidingLog(prev => [{ id: t, status: 'rejected' }, ...prev].slice(0, 8))
    }
  }, [slidingRequests])

  const fixedWindowStart = getFixedWindowStart(now)
  const fixedWindowEnd = fixedWindowStart + WINDOW_SIZE
  const fixedWindowProgress = ((now - fixedWindowStart) / WINDOW_SIZE) * 100
  const fixedCount = fixedRequests.filter(r => r >= fixedWindowStart && r < fixedWindowEnd).length
  const slidingCount = slidingRequests.filter(r => r > now - WINDOW_SIZE).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Fixed Window */}
      <div className="bg-quest-bg rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Clock size={14} className="text-quest-warning" />
          Fixed Window Counter
        </h4>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-quest-muted mb-1">
            <span>Window progress</span>
            <span>{fixedCount}/{LIMIT} requests</span>
          </div>
          <div className="h-3 bg-quest-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-quest-warning/60 rounded-full"
              animate={{ width: `${fixedWindowProgress}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <p className="text-[10px] text-quest-muted mt-1">Counter resets at window boundary</p>
        </div>

        {/* Request slots */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-6 rounded ${
                i < fixedCount ? 'bg-quest-warning/60' : 'bg-quest-surface border border-white/10'
              }`}
            />
          ))}
        </div>

        <button onClick={sendFixedRequest} className="btn-primary text-sm w-full mb-3">
          Send Request (Fixed)
        </button>

        <div className="space-y-1">
          {fixedLog.map(entry => (
            <div
              key={entry.id}
              className={`text-[11px] px-2 py-1 rounded ${
                entry.status === 'allowed' ? 'bg-quest-success/10 text-quest-success' : 'bg-quest-danger/10 text-quest-danger'
              }`}
            >
              {entry.status === 'allowed' ? 'ALLOWED' : 'REJECTED'}
            </div>
          ))}
        </div>
      </div>

      {/* Sliding Window */}
      <div className="bg-quest-bg rounded-lg p-4">
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
          <Gauge size={14} className="text-quest-secondary" />
          Sliding Window Log
        </h4>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-quest-muted mb-1">
            <span>Rolling {WINDOW_SIZE / 1000}s window</span>
            <span>{slidingCount}/{LIMIT} requests</span>
          </div>
          <div className="h-3 bg-quest-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-quest-secondary/60 rounded-full transition-all"
              style={{ width: `${(slidingCount / LIMIT) * 100}%` }}
            />
          </div>
          <p className="text-[10px] text-quest-muted mt-1">No boundary burst problem</p>
        </div>

        {/* Request slots */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-6 rounded ${
                i < slidingCount ? 'bg-quest-secondary/60' : 'bg-quest-surface border border-white/10'
              }`}
            />
          ))}
        </div>

        <button onClick={sendSlidingRequest} className="btn-primary text-sm w-full mb-3">
          Send Request (Sliding)
        </button>

        <div className="space-y-1">
          {slidingLog.map(entry => (
            <div
              key={entry.id}
              className={`text-[11px] px-2 py-1 rounded ${
                entry.status === 'allowed' ? 'bg-quest-success/10 text-quest-success' : 'bg-quest-danger/10 text-quest-danger'
              }`}
            >
              {entry.status === 'allowed' ? 'ALLOWED' : 'REJECTED'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Fixed Window Boundary Problem Demo ── */
function BoundaryProblemDemo() {
  const [step, setStep] = useState(0)
  const LIMIT = 5

  const steps = [
    {
      title: 'Normal traffic within Window 1',
      window1: 3,
      window2: 0,
      desc: '3 requests in first half of window 1 -- well within the limit of 5.',
      burst: false,
    },
    {
      title: 'Burst at end of Window 1',
      window1: 5,
      window2: 0,
      desc: '5 requests arrive near the END of window 1. All allowed (limit is 5).',
      burst: 'end',
    },
    {
      title: 'Burst at start of Window 2',
      window1: 5,
      window2: 5,
      desc: 'Counter resets! 5 more requests at the START of window 2. All allowed too!',
      burst: 'start',
    },
    {
      title: 'The problem: 10 requests in a short span',
      window1: 5,
      window2: 5,
      desc: '10 requests passed through within a few seconds spanning the boundary -- 2x the intended limit!',
      burst: 'both',
    },
  ]

  const current = steps[step]

  return (
    <div className="bg-quest-bg rounded-lg p-4">
      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <AlertTriangle size={14} className="text-quest-danger" />
        Fixed Window Boundary Problem
      </h4>

      <div className="flex gap-2 mb-4">
        {/* Window 1 */}
        <div className="flex-1">
          <p className="text-[10px] text-quest-muted text-center mb-1">Window 1</p>
          <div className="border border-quest-warning/40 rounded-lg p-2 min-h-[60px] flex flex-wrap gap-1 justify-center items-center relative">
            {current.burst === 'end' || current.burst === 'both' ? (
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-quest-danger/10 rounded-r-lg" />
            ) : null}
            {Array.from({ length: current.window1 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-5 h-5 rounded-full bg-quest-warning/70 relative z-10"
              />
            ))}
          </div>
          <p className="text-[10px] text-quest-muted text-center mt-1">{current.window1}/{LIMIT}</p>
        </div>

        {/* Boundary line */}
        <div className="flex flex-col items-center justify-center">
          <div className="h-full w-px bg-quest-danger/60 border-dashed" />
          <span className="text-[9px] text-quest-danger my-1">reset</span>
          <div className="h-full w-px bg-quest-danger/60 border-dashed" />
        </div>

        {/* Window 2 */}
        <div className="flex-1">
          <p className="text-[10px] text-quest-muted text-center mb-1">Window 2</p>
          <div className="border border-quest-warning/40 rounded-lg p-2 min-h-[60px] flex flex-wrap gap-1 justify-center items-center relative">
            {current.burst === 'start' || current.burst === 'both' ? (
              <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-quest-danger/10 rounded-l-lg" />
            ) : null}
            {Array.from({ length: current.window2 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-5 h-5 rounded-full bg-quest-warning/70 relative z-10"
              />
            ))}
          </div>
          <p className="text-[10px] text-quest-muted text-center mt-1">{current.window2}/{LIMIT}</p>
        </div>
      </div>

      <div className="bg-quest-surface/50 rounded p-3 mb-3">
        <p className="text-sm font-medium mb-1">{current.title}</p>
        <p className="text-xs text-quest-muted">{current.desc}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="btn-secondary text-sm flex-1 disabled:opacity-40"
        >
          Back
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="btn-primary text-sm flex-1 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

/* ── Distributed Rate Limiting Visualization ── */
function DistributedRateLimitSim() {
  const [counters, setCounters] = useState({ server1: 0, server2: 0, server3: 0 })
  const [redisCounter, setRedisCounter] = useState(0)
  const [mode, setMode] = useState('local')
  const [log, setLog] = useState([])
  const LIMIT = 10

  const sendToServer = (server) => {
    if (mode === 'local') {
      const current = counters[server]
      if (current < LIMIT) {
        setCounters(prev => ({ ...prev, [server]: prev[server] + 1 }))
        setLog(prev => [{ id: Date.now(), server, status: 'allowed', note: `local: ${current + 1}/${LIMIT}` }, ...prev].slice(0, 10))
      } else {
        setLog(prev => [{ id: Date.now(), server, status: 'rejected', note: `local: ${current}/${LIMIT}` }, ...prev].slice(0, 10))
      }
    } else {
      if (redisCounter < LIMIT) {
        setRedisCounter(prev => prev + 1)
        setLog(prev => [{ id: Date.now(), server, status: 'allowed', note: `redis: ${redisCounter + 1}/${LIMIT}` }, ...prev].slice(0, 10))
      } else {
        setLog(prev => [{ id: Date.now(), server, status: 'rejected', note: `redis: ${redisCounter}/${LIMIT}` }, ...prev].slice(0, 10))
      }
    }
  }

  const resetAll = () => {
    setCounters({ server1: 0, server2: 0, server3: 0 })
    setRedisCounter(0)
    setLog([])
  }

  const totalLocal = counters.server1 + counters.server2 + counters.server3

  return (
    <div className="bg-quest-bg rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <Shield size={14} className="text-quest-primary" />
          Distributed Rate Limiting
        </h4>
        <div className="flex gap-1">
          <button
            onClick={() => { setMode('local'); resetAll() }}
            className={`text-xs px-2 py-1 rounded ${mode === 'local' ? 'bg-quest-primary text-white' : 'bg-quest-surface border border-white/10'}`}
          >
            Local Counters
          </button>
          <button
            onClick={() => { setMode('redis'); resetAll() }}
            className={`text-xs px-2 py-1 rounded ${mode === 'redis' ? 'bg-quest-primary text-white' : 'bg-quest-surface border border-white/10'}`}
          >
            Redis (Centralized)
          </button>
        </div>
      </div>

      {/* Architecture diagram */}
      <div className="flex flex-col items-center gap-3 mb-4">
        {/* API Servers */}
        <div className="flex gap-4 w-full justify-center">
          {['server1', 'server2', 'server3'].map((srv, i) => (
            <div key={srv} className="flex flex-col items-center">
              <button
                onClick={() => sendToServer(srv)}
                className="bg-quest-surface border border-white/10 rounded-lg p-3 hover:border-quest-primary/50 transition-all text-center"
              >
                <p className="text-[10px] text-quest-muted mb-1">API Server {i + 1}</p>
                {mode === 'local' && (
                  <p className="text-lg font-bold text-quest-warning">{counters[srv]}/{LIMIT}</p>
                )}
                {mode === 'redis' && (
                  <p className="text-xs text-quest-muted">Click to send</p>
                )}
              </button>
              {mode === 'redis' && (
                <div className="w-px h-4 bg-quest-primary/40" />
              )}
            </div>
          ))}
        </div>

        {/* Redis store */}
        {mode === 'redis' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-900/30 border border-red-500/40 rounded-lg p-3 text-center"
          >
            <p className="text-[10px] text-red-400 mb-1">Redis (Shared Counter)</p>
            <p className="text-2xl font-bold text-red-400">{redisCounter}/{LIMIT}</p>
          </motion.div>
        )}

        {/* Local mode warning */}
        {mode === 'local' && (
          <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-3 text-center w-full">
            <p className="text-xs text-quest-danger font-medium">
              Total requests across all servers: {totalLocal}
              {totalLocal > LIMIT && ` -- EXCEEDED global limit of ${LIMIT}!`}
            </p>
            <p className="text-[10px] text-quest-muted mt-1">
              Each server tracks its own counter. A user can hit each server and get 3x the intended limit.
            </p>
          </div>
        )}
      </div>

      <button onClick={resetAll} className="btn-secondary text-xs w-full mb-3">
        Reset All Counters
      </button>

      {/* Log */}
      <div className="space-y-1 max-h-32 overflow-y-auto">
        {log.map(entry => (
          <div
            key={entry.id}
            className={`text-[11px] px-2 py-1 rounded flex justify-between ${
              entry.status === 'allowed' ? 'bg-quest-success/10 text-quest-success' : 'bg-quest-danger/10 text-quest-danger'
            }`}
          >
            <span>{entry.server} {entry.status === 'allowed' ? 'ALLOWED' : 'REJECTED'}</span>
            <span className="text-quest-muted">{entry.note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Multi-Algorithm Request Simulator ── */
function AlgorithmCompareSim() {
  const LIMIT = 5
  const WINDOW_MS = 4000
  const [algo, setAlgo] = useState('token')
  const [tokens, setTokens] = useState(LIMIT)
  const [fixedReqs, setFixedReqs] = useState([])
  const [slidingReqs, setSlidingReqs] = useState([])
  const [leakyQueue, setLeakyQueue] = useState([])
  const [results, setResults] = useState([])

  // Token refill
  useEffect(() => {
    const timer = setInterval(() => {
      if (algo === 'token') setTokens(prev => Math.min(prev + 1, LIMIT))
    }, 1000)
    return () => clearInterval(timer)
  }, [algo])

  // Leaky bucket drain
  useEffect(() => {
    const timer = setInterval(() => {
      if (algo === 'leaky') {
        setLeakyQueue(prev => {
          if (prev.length > 0) {
            setResults(r => [{ id: Date.now(), status: 'processed', algo: 'leaky' }, ...r].slice(0, 10))
            return prev.slice(1)
          }
          return prev
        })
      }
    }, 800)
    return () => clearInterval(timer)
  }, [algo])

  const sendRequest = () => {
    const t = Date.now()
    switch (algo) {
      case 'token':
        if (tokens > 0) {
          setTokens(prev => prev - 1)
          setResults(prev => [{ id: t, status: 'allowed', algo: 'token' }, ...prev].slice(0, 10))
        } else {
          setResults(prev => [{ id: t, status: 'rejected', algo: 'token' }, ...prev].slice(0, 10))
        }
        break
      case 'fixed': {
        const windowStart = Math.floor(t / WINDOW_MS) * WINDOW_MS
        const inWindow = fixedReqs.filter(r => r >= windowStart)
        if (inWindow.length < LIMIT) {
          setFixedReqs(prev => [...prev, t])
          setResults(prev => [{ id: t, status: 'allowed', algo: 'fixed' }, ...prev].slice(0, 10))
        } else {
          setResults(prev => [{ id: t, status: 'rejected', algo: 'fixed' }, ...prev].slice(0, 10))
        }
        break
      }
      case 'sliding': {
        const inWindow = slidingReqs.filter(r => r > t - WINDOW_MS)
        if (inWindow.length < LIMIT) {
          setSlidingReqs(prev => [...prev.filter(r => r > t - WINDOW_MS), t])
          setResults(prev => [{ id: t, status: 'allowed', algo: 'sliding' }, ...prev].slice(0, 10))
        } else {
          setResults(prev => [{ id: t, status: 'rejected', algo: 'sliding' }, ...prev].slice(0, 10))
        }
        break
      }
      case 'leaky':
        if (leakyQueue.length < LIMIT) {
          setLeakyQueue(prev => [...prev, t])
          setResults(prev => [{ id: t, status: 'queued', algo: 'leaky' }, ...prev].slice(0, 10))
        } else {
          setResults(prev => [{ id: t, status: 'rejected', algo: 'leaky' }, ...prev].slice(0, 10))
        }
        break
      default:
        break
    }
  }

  const reset = () => {
    setTokens(LIMIT)
    setFixedReqs([])
    setSlidingReqs([])
    setLeakyQueue([])
    setResults([])
  }

  return (
    <div className="bg-quest-bg rounded-lg p-4">
      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <Gauge size={14} className="text-quest-primary" />
        Algorithm Comparison Simulator
      </h4>

      <div className="flex flex-wrap gap-1 mb-4">
        {[
          { id: 'token', label: 'Token Bucket' },
          { id: 'leaky', label: 'Leaky Bucket' },
          { id: 'fixed', label: 'Fixed Window' },
          { id: 'sliding', label: 'Sliding Window' },
        ].map(a => (
          <button
            key={a.id}
            onClick={() => { setAlgo(a.id); reset() }}
            className={`text-xs px-3 py-1.5 rounded ${algo === a.id ? 'bg-quest-primary text-white' : 'bg-quest-surface border border-white/10'}`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Status indicator */}
      <div className="bg-quest-surface/50 rounded p-3 mb-3">
        {algo === 'token' && (
          <div className="flex items-center gap-3">
            <span className="text-sm">Tokens:</span>
            <div className="flex gap-1">
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded-full ${i < tokens ? 'bg-quest-primary' : 'bg-quest-surface border border-white/10'}`} />
              ))}
            </div>
            <span className="text-xs text-quest-muted">+1/sec</span>
          </div>
        )}
        {algo === 'leaky' && (
          <div className="flex items-center gap-3">
            <span className="text-sm">Queue:</span>
            <div className="flex gap-1">
              {Array.from({ length: LIMIT }).map((_, i) => (
                <div key={i} className={`w-4 h-4 rounded ${i < leakyQueue.length ? 'bg-quest-warning' : 'bg-quest-surface border border-white/10'}`} />
              ))}
            </div>
            <span className="text-xs text-quest-muted">drain 1/0.8s</span>
          </div>
        )}
        {algo === 'fixed' && (
          <p className="text-xs text-quest-muted">Fixed {WINDOW_MS / 1000}s window, max {LIMIT} requests per window</p>
        )}
        {algo === 'sliding' && (
          <p className="text-xs text-quest-muted">Sliding {WINDOW_MS / 1000}s window, max {LIMIT} requests at any moment</p>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <button onClick={sendRequest} className="btn-primary text-sm flex-1">
          Send Request
        </button>
        <button onClick={reset} className="btn-secondary text-sm">
          Reset
        </button>
      </div>

      <div className="space-y-1 max-h-32 overflow-y-auto">
        {results.map(r => (
          <div
            key={r.id}
            className={`text-[11px] px-2 py-1 rounded ${
              r.status === 'allowed' || r.status === 'processed'
                ? 'bg-quest-success/10 text-quest-success'
                : r.status === 'queued'
                ? 'bg-quest-warning/10 text-quest-warning'
                : 'bg-quest-danger/10 text-quest-danger'
            }`}
          >
            [{r.algo}] {r.status.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Quiz Data ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the key difference between token bucket and leaky bucket algorithms?',
    options: [
      { id: 'a', text: 'Token bucket has no limit while leaky bucket has a limit', correct: false },
      { id: 'b', text: 'Token bucket allows bursts while leaky bucket enforces a constant output rate', correct: true },
      { id: 'c', text: 'Token bucket is faster than leaky bucket', correct: false },
      { id: 'd', text: 'Leaky bucket uses more memory than token bucket', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What problem does the sliding window algorithm solve compared to the fixed window counter?',
    options: [
      { id: 'a', text: 'It uses less memory', correct: false },
      { id: 'b', text: 'It prevents the boundary burst problem where 2x the limit can pass through', correct: true },
      { id: 'c', text: 'It is easier to implement', correct: false },
      { id: 'd', text: 'It supports more concurrent users', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Why is a centralized store like Redis needed for distributed rate limiting?',
    options: [
      { id: 'a', text: 'Redis is faster than other databases', correct: false },
      { id: 'b', text: 'Local counters on each server let users bypass limits by hitting different servers', correct: true },
      { id: 'c', text: 'Redis provides better security', correct: false },
      { id: 'd', text: 'It reduces network latency', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What HTTP status code should be returned when a client exceeds the rate limit?',
    options: [
      { id: 'a', text: '403 Forbidden', correct: false },
      { id: 'b', text: '503 Service Unavailable', correct: false },
      { id: 'c', text: '429 Too Many Requests', correct: true },
      { id: 'd', text: '400 Bad Request', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'Which rate limit response header tells the client when they can retry?',
    options: [
      { id: 'a', text: 'X-RateLimit-Limit', correct: false },
      { id: 'b', text: 'Retry-After', correct: true },
      { id: 'c', text: 'X-RateLimit-Remaining', correct: false },
      { id: 'd', text: 'Cache-Control', correct: false },
    ],
  },
  {
    id: 'q6',
    question: 'In the token bucket algorithm, what happens when a request arrives and the bucket is empty?',
    options: [
      { id: 'a', text: 'The request is queued until a token becomes available', correct: false },
      { id: 'b', text: 'The request is immediately rejected or throttled', correct: true },
      { id: 'c', text: 'A new token is generated on demand', correct: false },
      { id: 'd', text: 'The bucket size is increased temporarily', correct: false },
    ],
  },
]

/* ── Main Level Component ── */
export default function Level58({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      const correct = q.options.find(o => o.correct)
      return selected === correct?.id
    })
    if (allCorrect) {
      onComplete?.()
    }
  }

  const sections = [
    { id: 0, label: 'The Problem' },
    { id: 1, label: 'Algorithms' },
    { id: 2, label: 'Simulations' },
    { id: 3, label: 'Distributed' },
    { id: 4, label: 'Quiz' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <div className="p-3 rounded-full bg-quest-primary/20">
            <Shield size={32} className="text-quest-primary" />
          </div>
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Design a Rate Limiter</h1>
        <p className="text-quest-muted text-lg">API Protection System -- HLD Case Study</p>
      </div>

      {/* Section navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setCurrentSection(s.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              currentSection === s.id
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface border border-white/10 hover:border-white/30'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── SECTION 0: The Problem ── */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg p-4 mb-6">
              <p className="text-lg italic text-quest-primary">
                "Your API is getting hammered. Design a system to say 'slow down' gracefully."
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Why Rate Limiting?</h2>

            <p className="text-quest-muted mb-4">
              Without{' '}
              <Term word="Rate Limiting" definition="Controlling the number of requests a client can make to an API within a specific time window." onLearn={learnTerm} />
              , a single misbehaving client can bring your entire service down. Rate limiting protects
              your infrastructure, ensures fair usage, prevents abuse, and controls costs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h3 className="font-semibold text-quest-danger mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Without Rate Limiting
                </h3>
                <ul className="text-sm text-quest-muted space-y-2">
                  <li>* DDoS attacks overwhelm your servers</li>
                  <li>* One abusive client starves others</li>
                  <li>* Cascading failures across services</li>
                  <li>* Unpredictable infrastructure costs</li>
                  <li>* No protection against brute force</li>
                </ul>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h3 className="font-semibold text-quest-success mb-2 flex items-center gap-2">
                  <Shield size={16} />
                  With Rate Limiting
                </h3>
                <ul className="text-sm text-quest-muted space-y-2">
                  <li>* API stays responsive under load</li>
                  <li>* Fair resource allocation per user</li>
                  <li>* Graceful degradation with clear errors</li>
                  <li>* Predictable capacity planning</li>
                  <li>* Protection against automated attacks</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Where to Apply Rate Limits</h3>
            <div className="bg-quest-bg rounded-lg p-4 mb-4">
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { layer: 'Client-side', desc: 'Voluntary throttling in SDKs (not enforceable)', icon: '1' },
                  { layer: 'Load Balancer / CDN', desc: 'Cloudflare, AWS WAF -- first line of defense', icon: '2' },
                  { layer: 'API Gateway', desc: 'Kong, Nginx -- per-route or per-user policies', icon: '3' },
                  { layer: 'Application Layer', desc: 'Middleware in your service -- fine-grained control', icon: '4' },
                ].map(item => (
                  <div key={item.layer} className="flex items-center gap-3 bg-quest-surface/30 rounded p-2">
                    <div className="w-6 h-6 rounded-full bg-quest-primary/20 flex items-center justify-center text-xs font-bold text-quest-primary">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-medium">{item.layer}:</span>
                      <span className="text-quest-muted ml-1">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="rate-limit-headers" title="HTTP Rate Limit Headers" onRead={markDeepDiveRead}>
              <div className="space-y-3">
                <p className="text-sm text-quest-muted">
                  Standard and draft headers that APIs return to communicate rate limit status:
                </p>
                <div className="bg-quest-bg rounded-lg p-3 font-mono text-xs space-y-1">
                  <p className="text-quest-primary">HTTP/1.1 429 Too Many Requests</p>
                  <p className="text-quest-muted">X-RateLimit-Limit: 100</p>
                  <p className="text-quest-muted">X-RateLimit-Remaining: 0</p>
                  <p className="text-quest-muted">X-RateLimit-Reset: 1672531200</p>
                  <p className="text-quest-warning">Retry-After: 30</p>
                </div>
                <p className="text-sm text-quest-muted">
                  The IETF draft RFC (RateLimit header fields) proposes standardized names like
                  <code className="text-quest-primary mx-1">RateLimit-Policy</code>,
                  <code className="text-quest-primary mx-1">RateLimit-Limit</code>, and
                  <code className="text-quest-primary mx-1">RateLimit-Remaining</code>.
                  GitHub, Twitter, and Stripe all use variants of these headers today.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore Algorithms
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SECTION 1: Algorithms ── */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Rate Limiting Algorithms</h2>

            {/* Token Bucket */}
            <div className="bg-quest-surface/50 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Zap size={18} className="text-quest-primary" />
                <Term word="Token Bucket" definition="A bucket holds tokens added at a fixed rate. Each request consumes a token. When empty, requests are rejected. Allows bursts up to bucket size." onLearn={learnTerm} />
              </h3>
              <p className="text-sm text-quest-muted mb-3">
                Imagine a bucket that gets one token per second, holding up to 10. Each API request takes
                one token. If the bucket is full, new tokens overflow (are discarded). If the bucket is empty,
                requests are rejected. This naturally allows short bursts while enforcing an average rate.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-quest-success mb-1">Strengths</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* Allows controlled bursts</li>
                    <li>* Memory efficient (just counter + timestamp)</li>
                    <li>* Easy to tune (rate + bucket size)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-quest-warning mb-1">Considerations</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* Two parameters to tune</li>
                    <li>* Burst size might surprise you</li>
                    <li>* Used by: AWS, Stripe, many others</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Leaky Bucket */}
            <div className="bg-quest-surface/50 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Filter size={18} className="text-quest-secondary" />
                Leaky Bucket
              </h3>
              <p className="text-sm text-quest-muted mb-3">
                Requests enter a queue (the bucket) and are processed at a constant rate -- like water
                leaking from a bucket. If the queue is full, new requests are discarded. Unlike token bucket,
                the output rate is strictly constant: no bursts pass through.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-quest-success mb-1">Strengths</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* Perfectly smooth output rate</li>
                    <li>* Good for downstream protection</li>
                    <li>* Prevents any burst traffic</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-quest-warning mb-1">Considerations</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* No burst tolerance at all</li>
                    <li>* Old requests may starve new ones</li>
                    <li>* Used by: Shopify (variant)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fixed Window */}
            <div className="bg-quest-surface/50 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Clock size={18} className="text-quest-warning" />
                <Term word="Fixed Window Counter" definition="Divides time into fixed windows (e.g., 1 minute). A counter tracks requests in the current window and resets at each boundary." onLearn={learnTerm} />
              </h3>
              <p className="text-sm text-quest-muted mb-3">
                Divide time into windows (say, 1-minute chunks). Count requests per window.
                Simple but has the boundary burst problem: a client can send the limit at
                the end of one window and the limit at the start of the next, getting 2x
                throughput in a short span.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-quest-success mb-1">Strengths</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* Very simple to implement</li>
                    <li>* Minimal memory (one counter per key)</li>
                    <li>* Natural window expiry</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-quest-danger mb-1">Weakness</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* Boundary burst problem (2x traffic)</li>
                    <li>* Uneven distribution within window</li>
                    <li>* May need combination with other algos</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Sliding Window */}
            <div className="bg-quest-surface/50 rounded-lg p-5 mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Gauge size={18} className="text-quest-primary" />
                <Term word="Sliding Window Log" definition="Tracks exact timestamps of each request in a sorted set. Counts requests within a rolling time window. No boundary burst issue but uses more memory." onLearn={learnTerm} />
              </h3>
              <p className="text-sm text-quest-muted mb-3">
                Instead of fixed boundaries, keep a log of timestamps for each request. To check the limit,
                count how many timestamps fall within the last N seconds. No boundary burst problem, but storing
                all timestamps can use significant memory. The sliding window counter variant reduces memory
                by combining the previous and current window counts with a weighted average.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-quest-success mb-1">Strengths</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* No boundary burst problem</li>
                    <li>* Very accurate rate enforcement</li>
                    <li>* Smooth rate limiting experience</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-quest-warning mb-1">Considerations</p>
                  <ul className="text-quest-muted space-y-1">
                    <li>* Higher memory usage (log variant)</li>
                    <li>* Counter variant trades accuracy for memory</li>
                    <li>* Used by: Cloudflare (counter variant)</li>
                  </ul>
                </div>
              </div>
            </div>

            <DeepDive id="algo-comparison-table" title="Algorithm Comparison Summary" onRead={markDeepDiveRead}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-quest-muted">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-2">Algorithm</th>
                      <th className="text-left py-2 pr-2">Memory</th>
                      <th className="text-left py-2 pr-2">Burst</th>
                      <th className="text-left py-2 pr-2">Accuracy</th>
                      <th className="text-left py-2">Complexity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-2 font-medium text-quest-text">Token Bucket</td>
                      <td className="py-2 pr-2">Low</td>
                      <td className="py-2 pr-2">Allowed</td>
                      <td className="py-2 pr-2">Good</td>
                      <td className="py-2">Low</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-2 font-medium text-quest-text">Leaky Bucket</td>
                      <td className="py-2 pr-2">Low</td>
                      <td className="py-2 pr-2">None</td>
                      <td className="py-2 pr-2">Excellent</td>
                      <td className="py-2">Low</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-2 font-medium text-quest-text">Fixed Window</td>
                      <td className="py-2 pr-2">Very Low</td>
                      <td className="py-2 pr-2">2x at boundary</td>
                      <td className="py-2 pr-2">Poor</td>
                      <td className="py-2">Very Low</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-2 font-medium text-quest-text">Sliding Log</td>
                      <td className="py-2 pr-2">High</td>
                      <td className="py-2 pr-2">None</td>
                      <td className="py-2 pr-2">Excellent</td>
                      <td className="py-2">Medium</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-2 font-medium text-quest-text">Sliding Counter</td>
                      <td className="py-2 pr-2">Low</td>
                      <td className="py-2 pr-2">Minimal</td>
                      <td className="py-2 pr-2">Good</td>
                      <td className="py-2">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Try Simulations
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SECTION 2: Simulations ── */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Interactive Simulations</h2>
            <p className="text-quest-muted mb-6">
              See each algorithm in action. Send requests, trigger bursts, and watch how each
              algorithm handles the traffic differently.
            </p>

            {/* Token Bucket Sim */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Token Bucket in Action</h3>
              <p className="text-sm text-quest-muted mb-3">
                Watch tokens refill over time. Click "Send Request" to consume tokens.
                Try "Burst" to send 6 rapid requests and see how the bucket handles it.
              </p>
              <TokenBucketSim />
            </div>

            {/* Fixed vs Sliding Window */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Fixed Window vs Sliding Window</h3>
              <p className="text-sm text-quest-muted mb-3">
                Compare both approaches side by side. Try hitting the limit on the fixed window
                and notice how the counter resets abruptly. The sliding window has no such
                boundary issue.
              </p>
              <WindowComparisonSim />
            </div>

            {/* Boundary Problem */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">The Boundary Burst Problem</h3>
              <p className="text-sm text-quest-muted mb-3">
                Step through this scenario to understand why fixed windows can allow 2x the
                intended limit at window boundaries.
              </p>
              <BoundaryProblemDemo />
            </div>

            {/* Algorithm Compare */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Compare All Algorithms</h3>
              <p className="text-sm text-quest-muted mb-3">
                Switch between algorithms and send requests to see how each one behaves.
                Pay attention to how token bucket allows bursts, leaky bucket queues requests,
                and the window algorithms count differently.
              </p>
              <AlgorithmCompareSim />
            </div>

            <DeepDive id="real-world-rate-limits" title="Real-World Rate Limit Configurations" onRead={markDeepDiveRead}>
              <div className="space-y-3">
                <p className="text-sm text-quest-muted">
                  <strong>GitHub API:</strong> 5,000 requests/hour for authenticated users, 60/hour for
                  unauthenticated. Uses token bucket. Returns X-RateLimit headers on every response.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Twitter/X API v2:</strong> Rate limits vary by endpoint. Tweet creation is 200
                  tweets per 15 minutes per user. Uses sliding window. Free tier gets 1,500 tweets/month.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Stripe API:</strong> 100 read requests/second in live mode, 25 write/second.
                  Uses token bucket. Returns Retry-After header with 429 responses.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>AWS API Gateway:</strong> Default 10,000 requests/second with 5,000 burst.
                  Uses token bucket. Configurable per-stage and per-method throttling.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Distributed Rate Limiting
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SECTION 3: Distributed Rate Limiting ── */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">
              <Term word="Distributed Rate Limiting" definition="Enforcing rate limits across multiple API servers using a shared data store (like Redis) so that the global limit is respected regardless of which server handles the request." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-4">
              In production, you have multiple API servers behind a load balancer. If each server
              maintains its own counter, a user can simply hit different servers to bypass the limit.
              The solution: a shared, centralized counter -- typically Redis.
            </p>

            <div className="mb-6">
              <p className="text-sm text-quest-muted mb-3">
                Toggle between "Local Counters" and "Redis" to see the difference. In local mode,
                click each server separately to bypass the global limit. In Redis mode, all servers
                check the same counter.
              </p>
              <DistributedRateLimitSim />
            </div>

            <h3 className="text-lg font-semibold mb-3">Redis-Based Implementation</h3>
            <div className="bg-quest-bg rounded-lg p-4 mb-6">
              <p className="text-xs text-quest-muted mb-2 font-medium">Sliding window counter with Redis (pseudocode):</p>
              <pre className="text-xs font-mono text-quest-text overflow-x-auto whitespace-pre">
{`-- KEYS[1] = rate_limit:{user_id}
-- ARGV[1] = window_size (seconds)
-- ARGV[2] = max_requests
-- ARGV[3] = current_timestamp

local key = KEYS[1]
local window = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local now = tonumber(ARGV[3])

-- Remove timestamps outside the window
redis.call('ZREMRANGEBYSCORE', key, 0, now - window)

-- Count requests in current window
local count = redis.call('ZCARD', key)

if count < limit then
  -- Add current request timestamp
  redis.call('ZADD', key, now, now .. math.random())
  redis.call('EXPIRE', key, window)
  return 1  -- ALLOWED
else
  return 0  -- REJECTED
end`}
              </pre>
            </div>

            <h3 className="text-lg font-semibold mb-3">Architecture Considerations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Race Conditions</h4>
                <p className="text-xs text-quest-muted">
                  Multiple servers reading and updating Redis simultaneously can cause race conditions.
                  Use Lua scripts (atomic execution) or Redis MULTI/EXEC transactions to ensure
                  read-increment-check is atomic.
                </p>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Redis Failure</h4>
                <p className="text-xs text-quest-muted">
                  If Redis goes down, do you fail open (allow all) or fail closed (reject all)?
                  Most systems fail open with local fallback counters to avoid total service
                  disruption from a rate limiter outage.
                </p>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Latency Overhead</h4>
                <p className="text-xs text-quest-muted">
                  Every request now requires a Redis round-trip (~1ms). For very high throughput,
                  consider local token bucket with periodic Redis sync, or use Redis Cluster
                  with hash-tag routing for the rate limit key.
                </p>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Multi-Region</h4>
                <p className="text-xs text-quest-muted">
                  For global APIs, you may accept slightly imprecise limits with region-local Redis
                  and eventual synchronization, or route all rate limit checks to a single region
                  at the cost of added latency.
                </p>
              </div>
            </div>

            <DeepDive id="rate-limit-design-interview" title="System Design Interview Checklist" onRead={markDeepDiveRead}>
              <div className="space-y-2 text-sm text-quest-muted">
                <p className="font-medium text-quest-text">When designing a rate limiter in an interview, cover:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li><strong>Requirements:</strong> Per-user? Per-IP? Per-API-key? Global or per-endpoint?</li>
                  <li><strong>Algorithm choice:</strong> Token bucket (most common), explain trade-offs.</li>
                  <li><strong>Where to place it:</strong> API Gateway vs middleware vs sidecar proxy.</li>
                  <li><strong>Data store:</strong> Redis with Lua scripts for atomicity.</li>
                  <li><strong>Distributed coordination:</strong> Centralized counter with race condition handling.</li>
                  <li><strong>Failure mode:</strong> Fail open vs closed, local fallback.</li>
                  <li><strong>Response:</strong> HTTP 429, Retry-After header, rate limit headers.</li>
                  <li><strong>Monitoring:</strong> Track rejection rates, top throttled users, alert on spikes.</li>
                  <li><strong>Rules engine:</strong> Configurable rules (e.g., free tier: 100/hr, paid: 10,000/hr).</li>
                </ol>
              </div>
            </DeepDive>

            <DeepDive id="rate-limit-beyond-basics" title="Beyond Basic Rate Limiting" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong>Adaptive rate limiting:</strong> Netflix uses adaptive rate limiting that adjusts
                  limits based on server health. When CPU usage is high, limits automatically tighten.
                  This provides a feedback loop between rate limiting and actual capacity.
                </p>
                <p>
                  <strong>Priority-based limiting:</strong> Not all requests are equal. Paid users may get
                  higher limits. Health check endpoints should be exempt. Write operations may have
                  stricter limits than reads. A rules engine lets you configure these policies.
                </p>
                <p>
                  <strong>Client fingerprinting:</strong> Sophisticated clients rotate API keys or IPs.
                  Advanced rate limiters combine multiple signals (IP, user agent, behavioral patterns)
                  to identify and throttle abusive clients even when they try to evade.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SECTION 4: Quiz ── */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Rate limiting is a critical component of any production API. Let's verify your
              understanding of the algorithms and design decisions.
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
                <h3 className="text-xl font-bold mb-2">Level 58 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how rate limiters protect APIs from abuse. From token buckets to
                  sliding windows to distributed Redis counters, you have the tools to design robust
                  API protection for any system design interview or real-world application.
                </p>
                <p className="text-sm text-quest-primary">
                  Remember: a good rate limiter is invisible to well-behaved clients and firm but fair to everyone else.
                </p>
              </motion.div>
            )}

            <div className="flex justify-start mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

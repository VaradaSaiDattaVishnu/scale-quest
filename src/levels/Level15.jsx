import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Shield, Zap, AlertTriangle, Clock, Server, Ban,
  Droplets, Timer, Activity, Settings, XCircle
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

export default function Level15({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [attackPhase, setAttackPhase] = useState('idle') // idle, attacking, overloaded, protected
  const [introRequests, setIntroRequests] = useState([])
  const [introCounters, setIntroCounters] = useState({ total: 0, accepted: 0, rejected: 0, health: 100 })
  const introTimerRef = useRef(null)
  const introIdRef = useRef(0)

  // Token Bucket state
  const [tokens, setTokens] = useState(5)
  const [tokenMax] = useState(5)
  const [tokenEvents, setTokenEvents] = useState([])
  const tokenRefillRef = useRef(null)

  // Leaky Bucket state
  const [leakyQueue, setLeakyQueue] = useState(0)
  const [leakyMax] = useState(8)
  const [leakyPourRate, setLeakyPourRate] = useState(0)
  const [leakyEvents, setLeakyEvents] = useState([])
  const leakyDrainRef = useRef(null)
  const leakyPourRef = useRef(null)

  // Windows state
  const [windowMode, setWindowMode] = useState('fixed') // fixed | sliding
  const [windowRequests, setWindowRequests] = useState([])
  const [windowTime, setWindowTime] = useState(0)
  const windowTimerRef = useRef(null)
  const windowRunningRef = useRef(false)

  // Practice state
  const [practiceApi, setPracticeApi] = useState('public')
  const [practiceAlgo, setPracticeAlgo] = useState('token')
  const [practiceLimit, setPracticeLimit] = useState(60)
  const [practiceBurst, setPracticeBurst] = useState(10)
  const [practiceRunning, setPracticeRunning] = useState(false)
  const [practiceStats, setPracticeStats] = useState({ accepted: 0, rejected: 0 })
  const practiceRef = useRef(null)

  const sections = ['intro', 'algorithms', 'windows', 'practice', 'quiz']

  // Cleanup all intervals on unmount
  useEffect(() => {
    return () => {
      clearInterval(introTimerRef.current)
      clearInterval(tokenRefillRef.current)
      clearInterval(leakyDrainRef.current)
      clearInterval(leakyPourRef.current)
      clearInterval(windowTimerRef.current)
      clearInterval(practiceRef.current)
    }
  }, [])

  // ---- INTRO SIMULATION ----
  const startAttack = useCallback(() => {
    setAttackPhase('attacking')
    setIntroRequests([])
    setIntroCounters({ total: 0, accepted: 0, rejected: 0, health: 100 })
    introIdRef.current = 0
    let health = 100

    clearInterval(introTimerRef.current)
    introTimerRef.current = setInterval(() => {
      // Normal users: 1 req every 400ms, attacker: 5 per tick
      const batch = []
      introIdRef.current++
      batch.push({ id: introIdRef.current, type: 'normal', status: health > 20 ? 'ok' : 'error' })
      for (let i = 0; i < 5; i++) {
        introIdRef.current++
        batch.push({ id: introIdRef.current, type: 'attacker', status: health > 20 ? 'ok' : 'error' })
      }
      health = Math.max(0, health - 4)

      setIntroRequests(prev => [...prev.slice(-30), ...batch])
      setIntroCounters(prev => ({
        total: prev.total + batch.length,
        accepted: health > 20 ? prev.accepted + batch.length : prev.accepted,
        rejected: health <= 20 ? prev.rejected + batch.length : prev.rejected,
        health,
      }))

      if (health <= 0) {
        clearInterval(introTimerRef.current)
        setAttackPhase('overloaded')
      }
    }, 300)
  }, [])

  const enableRateLimiter = useCallback(() => {
    setAttackPhase('protected')
    setIntroRequests([])
    setIntroCounters({ total: 0, accepted: 0, rejected: 0, health: 100 })
    introIdRef.current = 0

    clearInterval(introTimerRef.current)
    introTimerRef.current = setInterval(() => {
      const batch = []
      introIdRef.current++
      batch.push({ id: introIdRef.current, type: 'normal', status: 'ok' })
      for (let i = 0; i < 5; i++) {
        introIdRef.current++
        batch.push({ id: introIdRef.current, type: 'attacker', status: 'blocked' })
      }

      setIntroRequests(prev => [...prev.slice(-30), ...batch])
      setIntroCounters(prev => ({
        total: prev.total + batch.length,
        accepted: prev.accepted + 1,
        rejected: prev.rejected + 5,
        health: 100,
      }))
    }, 300)
  }, [])

  // ---- TOKEN BUCKET ----
  useEffect(() => {
    clearInterval(tokenRefillRef.current)
    tokenRefillRef.current = setInterval(() => {
      setTokens(prev => Math.min(prev + 1, tokenMax))
    }, 1000)
    return () => clearInterval(tokenRefillRef.current)
  }, [tokenMax])

  const sendTokenRequest = useCallback(() => {
    setTokens(prev => {
      if (prev > 0) {
        setTokenEvents(e => [...e.slice(-8), { id: Date.now(), type: 'allowed' }])
        return prev - 1
      } else {
        setTokenEvents(e => [...e.slice(-8), { id: Date.now(), type: 'rejected' }])
        return prev
      }
    })
  }, [])

  // ---- LEAKY BUCKET ----
  useEffect(() => {
    clearInterval(leakyDrainRef.current)
    leakyDrainRef.current = setInterval(() => {
      setLeakyQueue(prev => {
        if (prev > 0) {
          setLeakyEvents(e => [...e.slice(-8), { id: Date.now(), type: 'drained' }])
          return prev - 1
        }
        return prev
      })
    }, 800)
    return () => clearInterval(leakyDrainRef.current)
  }, [])

  useEffect(() => {
    clearInterval(leakyPourRef.current)
    if (leakyPourRate > 0) {
      const interval = Math.max(200, 1200 - leakyPourRate * 200)
      leakyPourRef.current = setInterval(() => {
        setLeakyQueue(prev => {
          if (prev < leakyMax) {
            setLeakyEvents(e => [...e.slice(-8), { id: Date.now(), type: 'added' }])
            return prev + 1
          } else {
            setLeakyEvents(e => [...e.slice(-8), { id: Date.now(), type: 'overflow' }])
            return prev
          }
        })
      }, interval)
    }
    return () => clearInterval(leakyPourRef.current)
  }, [leakyPourRate, leakyMax])

  // ---- WINDOW SIMULATION ----
  const startWindowSim = useCallback(() => {
    setWindowRequests([])
    setWindowTime(0)
    windowRunningRef.current = true
    const limit = 5
    let t = 0

    // Pre-generate request pattern that shows the boundary problem
    const pattern = [
      // light traffic early
      0.5, 1.2, 2.0,
      // burst at boundary (end of window 1, start of window 2)
      4.5, 4.6, 4.7, 4.8, 4.9, 5.1, 5.2, 5.3, 5.4, 5.5,
      // some later
      7.0, 8.5,
    ]
    let pIdx = 0

    clearInterval(windowTimerRef.current)
    windowTimerRef.current = setInterval(() => {
      if (!windowRunningRef.current) { clearInterval(windowTimerRef.current); return }
      t += 0.1
      setWindowTime(parseFloat(t.toFixed(1)))

      while (pIdx < pattern.length && pattern[pIdx] <= t) {
        const reqTime = pattern[pIdx]
        setWindowRequests(prev => [...prev, { time: reqTime, id: pIdx }])
        pIdx++
      }

      if (t >= 10) {
        windowRunningRef.current = false
        clearInterval(windowTimerRef.current)
      }
    }, 100)
  }, [])

  // ---- PRACTICE ----
  const apiPresets = {
    public: { limit: 60, burst: 10, label: 'Public API' },
    internal: { limit: 500, burst: 50, label: 'Internal Service' },
    free: { limit: 20, burst: 3, label: 'Free Tier' },
    premium: { limit: 200, burst: 30, label: 'Premium Tier' },
  }

  const startPractice = useCallback(() => {
    setPracticeRunning(true)
    setPracticeStats({ accepted: 0, rejected: 0 })
    let bucket = practiceBurst
    let accepted = 0
    let rejected = 0
    const refillRate = practiceLimit / 60 // tokens per second

    clearInterval(practiceRef.current)
    practiceRef.current = setInterval(() => {
      // Simulate variable traffic: 1-4 requests per tick
      const incoming = Math.floor(Math.random() * 4) + 1
      bucket = Math.min(bucket + refillRate * 0.2, practiceBurst)

      for (let i = 0; i < incoming; i++) {
        if (bucket >= 1) {
          bucket -= 1
          accepted++
        } else {
          rejected++
        }
      }

      setPracticeStats({ accepted, rejected })
    }, 200)

    setTimeout(() => {
      clearInterval(practiceRef.current)
      setPracticeRunning(false)
    }, 6000)
  }, [practiceBurst, practiceLimit])

  // Window helper: count requests in a range
  const countInRange = (reqs, from, to) => reqs.filter(r => r.time >= from && r.time < to).length

  // Quiz
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the key difference between Token Bucket and Leaky Bucket?',
      options: [
        { id: 'a', text: 'Token Bucket is newer and always better', correct: false },
        { id: 'b', text: 'Token Bucket allows bursts of traffic up to the bucket capacity, while Leaky Bucket processes requests at a constant rate', correct: true },
        { id: 'c', text: 'Leaky Bucket allows more total requests', correct: false },
        { id: 'd', text: 'They are identical in behavior', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'What is the boundary problem with Fixed Window rate limiting?',
      options: [
        { id: 'a', text: 'It uses too much memory', correct: false },
        { id: 'b', text: 'A burst of requests at the end of one window and start of the next can exceed the intended rate limit', correct: true },
        { id: 'c', text: 'It cannot count requests accurately', correct: false },
        { id: 'd', text: 'It only works with token bucket algorithm', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What HTTP status code indicates rate limiting?',
      options: [
        { id: 'a', text: '403 Forbidden', correct: false },
        { id: 'b', text: '503 Service Unavailable', correct: false },
        { id: 'c', text: '429 Too Many Requests', correct: true },
        { id: 'd', text: '408 Request Timeout', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'Why is distributed rate limiting challenging?',
      options: [
        { id: 'a', text: 'Rate limiting algorithms are too complex', correct: false },
        { id: 'b', text: 'HTTP does not support rate limiting headers', correct: false },
        { id: 'c', text: 'Each server needs to share rate limit state, requiring a centralized store like Redis to maintain accurate counts', correct: true },
        { id: 'd', text: 'Distributed systems cannot track time accurately', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
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
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-quest-primary" />
              Speed Limits: Rate Limiting & Throttling
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Someone is hammering your API with 10,000 requests per second. Time to say 'slow down'."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              <Term word="Rate Limiting" definition="Controlling the number of requests a client can make to an API within a given time period. Protects servers from overload and abuse." onLearn={learnTerm} />{' '}
              is the practice of controlling how many requests a client can send within a time window.{' '}
              <Term word="Throttling" definition="Slowing down or queuing excess requests instead of outright rejecting them. A gentler form of rate limiting." onLearn={learnTerm} />{' '}
              is a related technique that slows excess traffic rather than blocking it outright.
            </p>

            {/* Live Server Simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity size={18} className="text-quest-primary" />
                API Under Attack -- Live Simulation
              </h3>

              {/* Server visual */}
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-2 transition-colors duration-300 ${
                    attackPhase === 'overloaded' ? 'bg-quest-danger/30 border-2 border-quest-danger' :
                    attackPhase === 'protected' ? 'bg-quest-success/20 border-2 border-quest-success' :
                    attackPhase === 'attacking' ? 'bg-quest-warning/20 border-2 border-quest-warning' :
                    'bg-quest-surface border-2 border-white/10'
                  }`}
                  animate={attackPhase === 'overloaded' ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <Server size={40} className={
                    attackPhase === 'overloaded' ? 'text-quest-danger' :
                    attackPhase === 'protected' ? 'text-quest-success' :
                    'text-quest-text'
                  } />
                </motion.div>
                {attackPhase === 'protected' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 text-quest-success text-sm font-medium"
                  >
                    <Shield size={16} /> Rate Limiter Active
                  </motion.div>
                )}
                {attackPhase === 'overloaded' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-quest-danger text-sm font-medium mt-1">
                    SERVER DOWN -- 500 Internal Server Error
                  </motion.p>
                )}
              </div>

              {/* Request stream */}
              <div className="h-20 overflow-hidden relative bg-quest-surface/50 rounded-lg mb-4">
                <div className="flex flex-wrap gap-1 p-2">
                  <AnimatePresence mode="popLayout">
                    {introRequests.slice(-40).map(req => (
                      <motion.div
                        key={req.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`w-3 h-3 rounded-full ${
                          req.status === 'blocked' ? 'bg-quest-danger ring-1 ring-quest-danger/50' :
                          req.status === 'error' ? 'bg-quest-danger/50' :
                          req.type === 'attacker' ? 'bg-quest-warning' :
                          'bg-quest-success'
                        }`}
                        title={req.status === 'blocked' ? '429 Too Many Requests' : req.type}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                <div className="absolute bottom-1 right-2 flex gap-3 text-xs text-quest-muted">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-quest-success inline-block" /> Normal</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-quest-warning inline-block" /> Attacker</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-quest-danger inline-block" /> Blocked</span>
                </div>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Total</p>
                  <p className="text-xl font-bold">{introCounters.total}</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-success">Accepted</p>
                  <p className="text-xl font-bold text-quest-success">{introCounters.accepted}</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-danger">Rejected</p>
                  <p className="text-xl font-bold text-quest-danger">{introCounters.rejected}</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Health</p>
                  <div className="w-full bg-quest-bg rounded-full h-3 mt-2">
                    <motion.div
                      className={`h-full rounded-full ${introCounters.health > 50 ? 'bg-quest-success' : introCounters.health > 20 ? 'bg-quest-warning' : 'bg-quest-danger'}`}
                      animate={{ width: `${introCounters.health}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3 justify-center">
                {attackPhase === 'idle' && (
                  <button onClick={startAttack} className="btn-primary flex items-center gap-2">
                    <Zap size={16} /> Start Attack
                  </button>
                )}
                {(attackPhase === 'attacking' || attackPhase === 'overloaded') && (
                  <button onClick={enableRateLimiter} className="btn-primary flex items-center gap-2 bg-quest-success hover:bg-quest-success/80">
                    <Shield size={16} /> Enable Rate Limiter
                  </button>
                )}
                {attackPhase !== 'idle' && (
                  <button onClick={() => { clearInterval(introTimerRef.current); setAttackPhase('idle'); setIntroRequests([]); setIntroCounters({ total: 0, accepted: 0, rejected: 0, health: 100 }) }} className="btn-secondary">
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* HTTP 429 callout */}
            <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <Ban size={20} className="text-quest-danger mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-quest-danger mb-1">HTTP 429 Too Many Requests</p>
                  <div className="font-mono text-xs bg-quest-bg rounded p-3 mt-2 text-quest-muted">
                    <p>HTTP/1.1 429 Too Many Requests</p>
                    <p>Retry-After: 30</p>
                    <p>X-RateLimit-Limit: 100</p>
                    <p>X-RateLimit-Remaining: 0</p>
                    <p className="mt-2">{'{"error": "Rate limit exceeded. Try again in 30 seconds."}'}</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="ddos-vs-ratelimit" title="DDoS vs Rate Limiting" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Rate limiting is <strong>not</strong> DDoS protection on its own. A massive distributed denial-of-service
                attack can overwhelm your network before rate limiting even kicks in.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                However, rate limiting is the <strong>first line of defense</strong> against abuse. It protects against:
                scrapers, credential stuffing, API abuse, and accidental client-side loops.
              </p>
              <p className="text-sm text-quest-muted">
                For true DDoS protection, you need network-level tools like Cloudflare, AWS Shield, or similar
                services that can absorb volumetric attacks at the edge.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Rate Limiting Algorithms <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: ALGORITHMS ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Droplets className="text-quest-secondary" />
              Token Bucket & Leaky Bucket
            </h2>

            <p className="text-quest-muted mb-6">
              Two classic algorithms for rate limiting. Both use the "bucket" metaphor, but they
              behave very differently under burst traffic.
            </p>

            {/* SIDE BY SIDE */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Token Bucket */}
              <div className="bg-quest-bg rounded-xl p-5 border border-quest-primary/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-quest-primary" />
                  <Term word="Token Bucket" definition="A rate limiting algorithm where tokens are added to a bucket at a fixed rate. Each request consumes a token. Allows bursts when the bucket is full." onLearn={learnTerm} />
                </h3>

                {/* Bucket visual */}
                <div className="bg-quest-surface rounded-lg p-4 mb-4 flex flex-col items-center">
                  <p className="text-xs text-quest-muted mb-2">Capacity: {tokenMax} tokens | Refill: 1/sec</p>
                  <div className="w-32 h-40 border-2 border-quest-primary/50 rounded-b-xl relative overflow-hidden mb-3">
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-quest-primary/30"
                      animate={{ height: `${(tokens / tokenMax) * 100}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                    {/* Token circles */}
                    <div className="absolute inset-0 flex flex-wrap content-end justify-center gap-1 p-2">
                      {Array.from({ length: tokens }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="w-5 h-5 rounded-full bg-quest-primary"
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={sendTokenRequest}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    Send Request
                  </button>
                </div>

                {/* Events feed */}
                <div className="space-y-1 h-28 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {tokenEvents.slice(-4).map(ev => (
                      <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={`text-xs p-2 rounded flex items-center gap-2 ${
                          ev.type === 'allowed' ? 'bg-quest-success/10 text-quest-success' : 'bg-quest-danger/10 text-quest-danger'
                        }`}
                      >
                        {ev.type === 'allowed' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {ev.type === 'allowed' ? 'Request allowed (token consumed)' : 'Request REJECTED (no tokens!)'}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-quest-muted mt-3">
                  Allows <strong>bursts</strong>: if bucket is full, many requests pass quickly until depleted.
                </p>
              </div>

              {/* Leaky Bucket */}
              <div className="bg-quest-bg rounded-xl p-5 border border-quest-secondary/20">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Droplets size={18} className="text-quest-secondary" />
                  <Term word="Leaky Bucket" definition="A rate limiting algorithm where requests enter a queue (bucket) and are processed at a fixed rate. Excess requests overflow and are rejected. Produces a constant output rate." onLearn={learnTerm} />
                </h3>

                {/* Bucket visual */}
                <div className="bg-quest-surface rounded-lg p-4 mb-4 flex flex-col items-center">
                  <p className="text-xs text-quest-muted mb-2">Queue: {leakyQueue}/{leakyMax} | Drain: 1 every 0.8s</p>
                  <div className="w-32 h-40 border-2 border-quest-secondary/50 rounded-b-xl relative overflow-hidden mb-1">
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-quest-secondary/30"
                      animate={{ height: `${(leakyQueue / leakyMax) * 100}%` }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    />
                    <div className="absolute inset-0 flex flex-wrap content-end justify-center gap-1 p-2">
                      {Array.from({ length: leakyQueue }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-4 h-4 rounded bg-quest-secondary"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        />
                      ))}
                    </div>
                    {/* Leak hole */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-quest-bg rounded-t" />
                  </div>
                  {/* Drip animation */}
                  {leakyQueue > 0 && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-quest-secondary"
                      animate={{ y: [0, 16], opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    />
                  )}
                  <div className="mt-3 w-full">
                    <label className="text-xs text-quest-muted">Pour Rate: {leakyPourRate === 0 ? 'Off' : `Level ${leakyPourRate}`}</label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={leakyPourRate}
                      onChange={e => setLeakyPourRate(Number(e.target.value))}
                      className="w-full mt-1"
                    />
                  </div>
                </div>

                {/* Events feed */}
                <div className="space-y-1 h-28 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {leakyEvents.slice(-4).map(ev => (
                      <motion.div
                        key={ev.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={`text-xs p-2 rounded flex items-center gap-2 ${
                          ev.type === 'drained' ? 'bg-quest-success/10 text-quest-success' :
                          ev.type === 'added' ? 'bg-quest-primary/10 text-quest-primary' :
                          'bg-quest-danger/10 text-quest-danger'
                        }`}
                      >
                        {ev.type === 'drained' ? <><Droplets size={12} /> Request processed (leaked out)</> :
                         ev.type === 'added' ? <><ArrowRight size={12} /> Request queued</> :
                         <><AlertTriangle size={12} /> OVERFLOW -- Request rejected!</>}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-quest-muted mt-3">
                  <strong>Constant output rate</strong>: no bursts. Traffic is smoothed to a steady flow.
                </p>
              </div>
            </div>

            {/* Comparison table */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Side-by-Side Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">Property</th>
                      <th className="text-center py-2 px-3 text-quest-primary">Token Bucket</th>
                      <th className="text-center py-2 px-3 text-quest-secondary">Leaky Bucket</th>
                    </tr>
                  </thead>
                  <tbody className="text-quest-muted">
                    {[
                      ['Burst traffic', 'Allows bursts', 'No bursts (smoothed)'],
                      ['Output rate', 'Variable', 'Constant'],
                      ['Memory', 'Counter + timestamp', 'Queue of requests'],
                      ['Behavior when full', 'Rejects new requests', 'Overflows (rejects)'],
                      ['Best for', 'APIs with occasional spikes', 'Steady throughput systems'],
                    ].map(([prop, token, leaky]) => (
                      <tr key={prop} className="border-b border-white/5">
                        <td className="py-2 px-3 font-medium text-quest-text">{prop}</td>
                        <td className="text-center py-2 px-3">{token}</td>
                        <td className="text-center py-2 px-3">{leaky}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <DeepDive id="algo-companies" title="Which Algorithm Do Companies Use?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Stripe</strong> uses a token bucket algorithm for their API rate limiting, allowing
                merchants short bursts of traffic while maintaining overall limits.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Nginx</strong> uses a leaky bucket approach with its <code className="text-quest-primary">limit_req</code> module,
                smoothing traffic to backend servers at a constant rate.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>API Gateways</strong> (Kong, AWS API Gateway) typically offer both algorithms as
                configuration options, letting you choose based on your use case.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Window Strategies <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: WINDOWS ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-quest-warning" />
              Fixed vs Sliding Window
            </h2>

            <p className="text-quest-muted mb-6">
              How do you count requests over time? The window strategy you choose has a big impact
              on fairness and accuracy.
            </p>

            {/* Toggle */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                onClick={() => setWindowMode('fixed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  windowMode === 'fixed' ? 'bg-quest-warning text-quest-bg' : 'bg-quest-surface text-quest-muted'
                }`}
              >
                <Term word="Fixed Window" definition="Divides time into fixed intervals (e.g., 1-minute windows). Each window has an independent counter. Simple but vulnerable to boundary attacks." onLearn={learnTerm} />
              </button>
              <button
                onClick={() => setWindowMode('sliding')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  windowMode === 'sliding' ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface text-quest-muted'
                }`}
              >
                <Term word="Sliding Window" definition="A continuously moving time window that always looks at the last N seconds. More accurate than fixed windows but slightly more complex to implement." onLearn={learnTerm} />
              </button>
            </div>

            {/* Timeline visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">
                  {windowMode === 'fixed' ? 'Fixed Window Timeline' : 'Sliding Window Timeline'} (Limit: 5 per window)
                </h3>
                <button onClick={startWindowSim} className="btn-primary text-xs px-3 py-1">
                  {windowRunningRef.current ? 'Running...' : 'Run Simulation'}
                </button>
              </div>

              {/* Timeline bar */}
              <div className="relative h-32 bg-quest-surface/50 rounded-lg overflow-hidden mb-4">
                {/* Time windows */}
                {windowMode === 'fixed' ? (
                  <>
                    {[0, 5].map(start => {
                      const count = countInRange(windowRequests, start, start + 5)
                      const exceeded = count > 5
                      return (
                        <div
                          key={start}
                          className={`absolute top-0 bottom-0 border-r border-white/20 ${exceeded ? 'bg-quest-danger/10' : 'bg-quest-surface/30'}`}
                          style={{ left: `${(start / 10) * 100}%`, width: '50%' }}
                        >
                          <div className="absolute top-1 left-2 text-xs text-quest-muted">
                            Window {start / 5 + 1}: {count}/5
                            {exceeded && <span className="text-quest-danger ml-1">EXCEEDED</span>}
                          </div>
                        </div>
                      )
                    })}
                    {/* Boundary warning */}
                    {windowRequests.length > 0 && (
                      <motion.div
                        className="absolute top-0 bottom-0 w-8 bg-quest-danger/20 border-x border-quest-danger/50"
                        style={{ left: 'calc(50% - 16px)' }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                          <AlertTriangle size={12} className="text-quest-danger" />
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  /* Sliding window */
                  <motion.div
                    className="absolute top-0 bottom-0 bg-quest-primary/15 border-x-2 border-quest-primary/50"
                    style={{ width: '50%' }}
                    animate={{ left: `${Math.max(0, Math.min(50, (windowTime - 5) / 10 * 100))}%` }}
                    transition={{ duration: 0.1 }}
                  >
                    <div className="absolute top-1 left-2 text-xs text-quest-primary">
                      Sliding: {countInRange(windowRequests, Math.max(0, windowTime - 5), windowTime)}/5
                    </div>
                  </motion.div>
                )}

                {/* Request dots on timeline */}
                {windowRequests.map(req => {
                  const x = (req.time / 10) * 100
                  const inWindow = windowMode === 'sliding'
                    ? req.time >= Math.max(0, windowTime - 5) && req.time <= windowTime
                    : true
                  const windowStart = Math.floor(req.time / 5) * 5
                  const windowCount = countInRange(windowRequests.filter(r => r.time <= req.time), windowStart, windowStart + 5)
                  const rejected = windowMode === 'fixed' ? windowCount > 5 : !inWindow

                  return (
                    <motion.div
                      key={req.id}
                      initial={{ scale: 0, y: 0 }}
                      animate={{ scale: 1, y: 0 }}
                      className={`absolute w-3 h-3 rounded-full ${rejected ? 'bg-quest-danger' : 'bg-quest-success'}`}
                      style={{ left: `${x}%`, top: `${40 + (req.id % 4) * 15}px` }}
                    />
                  )
                })}

                {/* Time cursor */}
                {windowTime > 0 && (
                  <motion.div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                    style={{ left: `${(windowTime / 10) * 100}%` }}
                  />
                )}
              </div>

              <p className="text-xs text-quest-muted text-center">
                Time: {windowTime.toFixed(1)}s / 10.0s
              </p>

              {windowMode === 'fixed' && windowRequests.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-3"
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle size={16} className="text-quest-danger mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-quest-muted">
                      <strong className="text-quest-danger">Boundary Problem:</strong> Notice the burst at t=4.5-5.5s.
                      With fixed windows, requests at the end of Window 1 and start of Window 2 can
                      effectively double your rate limit in a short period!
                    </p>
                  </div>
                </motion.div>
              )}

              {windowMode === 'sliding' && windowRequests.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 bg-quest-success/10 border border-quest-success/30 rounded-lg p-3"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-quest-muted">
                      <strong className="text-quest-success">No boundary exploit:</strong> The sliding window always counts
                      requests in the last 5 seconds, regardless of fixed boundaries. The burst at the
                      boundary is correctly counted as a single window.
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            <p className="text-quest-muted mb-4">
              <Term word="API Quotas" definition="Long-term rate limits, typically measured in requests per day or month. Used to manage resource allocation across different service tiers (free, pro, enterprise)." onLearn={learnTerm} />{' '}
              are similar to rate limits but operate on longer time scales -- requests per day or per month,
              often tied to pricing tiers.
            </p>

            <DeepDive id="sliding-window-variants" title="Sliding Window Log vs Sliding Window Counter" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Sliding Window Log:</strong> Store the timestamp of every request. To check the limit,
                count timestamps in the last N seconds. Perfectly accurate but uses more memory (O(n) where n is
                the number of requests).
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Sliding Window Counter:</strong> A hybrid approach. Keep counters for fixed windows, but
                weight the previous window's count based on overlap. For example, if you're 30% into the current
                window, count = (current_count) + (previous_count * 0.7). Uses O(1) memory but is an approximation.
              </p>
              <p className="text-sm text-quest-muted">
                Most production systems use the counter approach. The slight inaccuracy is worth the massive
                memory savings at scale.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Practice <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: PRACTICE ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Settings className="text-quest-primary" />
              Design Your Rate Limiter
            </h2>

            {/* API Preset Picker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {Object.entries(apiPresets).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={() => { setPracticeApi(key); setPracticeLimit(preset.limit); setPracticeBurst(preset.burst) }}
                  className={`p-3 rounded-lg text-sm border transition-all ${
                    practiceApi === key ? 'border-quest-primary bg-quest-primary/10' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <p className="font-medium">{preset.label}</p>
                  <p className="text-xs text-quest-muted">{preset.limit} req/min</p>
                </button>
              ))}
            </div>

            {/* Configuration */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-quest-muted block mb-2">Requests per Minute: {practiceLimit}</label>
                  <input type="range" min="10" max="500" value={practiceLimit} onChange={e => setPracticeLimit(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-quest-muted block mb-2">Burst Size: {practiceBurst}</label>
                  <input type="range" min="1" max="50" value={practiceBurst} onChange={e => setPracticeBurst(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="text-sm text-quest-muted block mb-2">Algorithm</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPracticeAlgo('token')}
                      className={`flex-1 py-2 rounded text-xs font-medium ${practiceAlgo === 'token' ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface'}`}
                    >
                      Token Bucket
                    </button>
                    <button
                      onClick={() => setPracticeAlgo('leaky')}
                      className={`flex-1 py-2 rounded text-xs font-medium ${practiceAlgo === 'leaky' ? 'bg-quest-secondary text-quest-bg' : 'bg-quest-surface'}`}
                    >
                      Leaky Bucket
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={startPractice}
                  disabled={practiceRunning}
                  className="btn-primary px-8 disabled:opacity-50"
                >
                  {practiceRunning ? 'Simulating...' : 'Run Traffic Simulation'}
                </button>
              </div>

              {/* Results */}
              {(practiceStats.accepted > 0 || practiceStats.rejected > 0) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 grid grid-cols-3 gap-4"
                >
                  <div className="bg-quest-success/10 rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-success">Accepted</p>
                    <p className="text-2xl font-bold text-quest-success">{practiceStats.accepted}</p>
                    <p className="text-xs text-quest-muted">
                      {((practiceStats.accepted / (practiceStats.accepted + practiceStats.rejected)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-quest-danger/10 rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-danger">Rejected</p>
                    <p className="text-2xl font-bold text-quest-danger">{practiceStats.rejected}</p>
                    <p className="text-xs text-quest-muted">
                      {((practiceStats.rejected / (practiceStats.accepted + practiceStats.rejected)) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-quest-surface rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-muted">Total</p>
                    <p className="text-2xl font-bold">{practiceStats.accepted + practiceStats.rejected}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Rate Limit Headers */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Timer size={18} className="text-quest-warning" />
                Rate Limiting Headers
              </h3>
              <p className="text-sm text-quest-muted mb-3">
                Well-designed APIs include these headers so clients know their limits:
              </p>
              <div className="font-mono text-xs bg-quest-bg rounded-lg p-4 space-y-1">
                <p><span className="text-quest-primary">X-RateLimit-Limit:</span> 100        <span className="text-quest-muted">// Max requests per window</span></p>
                <p><span className="text-quest-primary">X-RateLimit-Remaining:</span> 47     <span className="text-quest-muted">// Requests left</span></p>
                <p><span className="text-quest-primary">X-RateLimit-Reset:</span> 1623456789 <span className="text-quest-muted">// When the window resets (Unix)</span></p>
                <p><span className="text-quest-primary">Retry-After:</span> 30               <span className="text-quest-muted">// Seconds to wait (on 429)</span></p>
              </div>
            </div>

            {/* Distributed Rate Limiting */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Server size={18} className="text-quest-danger" />
                The Distributed Problem
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                What happens when you have 5 servers? Each server has its own counter...
              </p>

              {/* Visual: 5 servers each with their own count */}
              <div className="flex items-center justify-center gap-3 mb-4">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    className="bg-quest-surface rounded-lg p-3 text-center border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Server size={16} className="mx-auto mb-1 text-quest-muted" />
                    <p className="text-xs">Server {i}</p>
                    <p className="text-xs text-quest-warning">20/100</p>
                  </motion.div>
                ))}
              </div>
              <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-3 mb-4">
                <p className="text-xs text-quest-muted">
                  <AlertTriangle size={14} className="inline text-quest-danger mr-1" />
                  Each server thinks only 20 requests were made, but the total is <strong className="text-quest-danger">100</strong>!
                  A user could send 100 requests by spreading them across servers.
                </p>
              </div>

              {/* Solution: Redis */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-quest-surface rounded p-2">
                      <Server size={14} className="text-quest-muted" />
                    </div>
                  ))}
                </div>
                <ArrowRight size={16} className="text-quest-primary" />
                <motion.div
                  className="bg-quest-primary/20 border-2 border-quest-primary rounded-lg px-4 py-2 text-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <p className="text-xs font-bold text-quest-primary">Redis</p>
                  <p className="text-xs text-quest-muted">100/100</p>
                </motion.div>
              </div>
              <p className="text-xs text-quest-success text-center">
                <CheckCircle size={12} className="inline mr-1" />
                Solution: Centralized counter in Redis. All servers check one source of truth.
              </p>
            </div>

            {/* Real World Examples */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Real-World Rate Limits</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'GitHub API', limit: '5,000/hour', color: 'text-quest-text' },
                  { name: 'Twitter API', limit: '300/15min', color: 'text-quest-primary' },
                  { name: 'Stripe API', limit: '100/sec', color: 'text-quest-secondary' },
                ].map(api => (
                  <div key={api.name} className="bg-quest-bg rounded-lg p-4 text-center">
                    <p className={`font-semibold ${api.color}`}>{api.name}</p>
                    <p className="text-lg font-bold mt-1">{api.limit}</p>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="microservice-ratelimit" title="Rate Limiting in Microservices" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>API Gateway Level:</strong> The first line of defense. Tools like Kong, AWS API Gateway,
                or Nginx handle rate limiting before requests reach your services. This protects against external abuse.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Service Level:</strong> Individual services can also rate limit calls from other internal services.
                This prevents cascading failures -- if Service A goes haywire, it won't overwhelm Service B.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Distributed Counters:</strong> Redis is the most popular choice. Use <code className="text-quest-primary">INCR</code> with{' '}
                <code className="text-quest-primary">EXPIRE</code> for simple fixed-window counting, or Lua scripts for
                atomic token bucket operations. Redis Cluster provides high availability for your rate limiting infrastructure.
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
              <Shield className="text-quest-primary" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Rate limiting is critical infrastructure. Let's make sure you understand the algorithms and tradeoffs!
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
                <h3 className="text-xl font-bold mb-2">Level 15 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand rate limiting algorithms, window strategies, and distributed
                  rate limiting challenges. Your APIs are protected!
                </p>
                <p className="text-sm text-quest-primary">
                  Your servers can now handle traffic spikes gracefully while keeping bad actors at bay.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

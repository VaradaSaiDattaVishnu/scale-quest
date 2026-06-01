import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, RotateCcw, ArrowRight, Database, Zap,
  CheckCircle, XCircle, Clock, TrendingDown, Brain,
  HelpCircle, ChevronDown, ChevronUp, Timer, Gauge
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

// Cache visualization component
function CacheEntry({ keyName, value, ttl, isHit }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        boxShadow: isHit ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none'
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`
        bg-quest-surface rounded-lg p-3 border
        ${isHit ? 'border-quest-success' : 'border-white/10'}
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-mono text-sm text-quest-primary">{keyName}</span>
        <span className="text-xs text-quest-muted flex items-center gap-1">
          <Timer size={10} />
          {ttl}s
        </span>
      </div>
      <p className="text-xs text-quest-muted truncate">{value}</p>
    </motion.div>
  )
}

export default function Level4({ onComplete, learnTerm, markDeepDiveRead, unlockAchievement }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Cache simulation state
  const [cache, setCache] = useState(new Map())
  const [cacheCapacity] = useState(6)
  const [stats, setStats] = useState({ hits: 0, misses: 0, requests: 0 })
  const [lastHitKey, setLastHitKey] = useState(null)
  const [dbLatency] = useState(100) // ms
  const [cacheLatency] = useState(5)  // ms
  const [avgResponseTime, setAvgResponseTime] = useState(0)
  const [responseTimes, setResponseTimes] = useState([])

  // Available "data" to request
  const dataItems = [
    { key: 'user:123', value: '{"name":"Alice","email":"alice@example.com"}' },
    { key: 'user:456', value: '{"name":"Bob","email":"bob@example.com"}' },
    { key: 'product:1', value: '{"name":"Widget","price":29.99}' },
    { key: 'product:2', value: '{"name":"Gadget","price":49.99}' },
    { key: 'config:app', value: '{"theme":"dark","lang":"en"}' },
    { key: 'session:abc', value: '{"userId":123,"expiry":"2024-12-31"}' },
    { key: 'cart:123', value: '{"items":[1,2,3],"total":129.97}' },
    { key: 'stats:daily', value: '{"visitors":10000,"sales":500}' },
  ]

  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['intro', 'simulation', 'strategies', 'patterns', 'quiz']

  // Make a request (simulated)
  const makeRequest = useCallback((key = null) => {
    // Pick random key if not specified
    const requestKey = key || dataItems[Math.floor(Math.random() * dataItems.length)].key
    const item = dataItems.find(d => d.key === requestKey)

    setStats(prev => ({ ...prev, requests: prev.requests + 1 }))

    // Check cache
    if (cache.has(requestKey)) {
      // Cache HIT
      setStats(prev => ({ ...prev, hits: prev.hits + 1 }))
      setLastHitKey(requestKey)
      setTimeout(() => setLastHitKey(null), 500)

      // Fast response
      setResponseTimes(prev => [...prev.slice(-19), cacheLatency])
      return { hit: true, latency: cacheLatency }
    } else {
      // Cache MISS
      setStats(prev => ({ ...prev, misses: prev.misses + 1 }))

      // "Fetch" from database (slow)
      const newCache = new Map(cache)

      // If cache is full, evict oldest (FIFO for simplicity)
      if (newCache.size >= cacheCapacity) {
        const firstKey = newCache.keys().next().value
        newCache.delete(firstKey)
      }

      // Add to cache with TTL
      newCache.set(requestKey, { value: item?.value, ttl: 30, addedAt: Date.now() })
      setCache(newCache)

      // Slow response
      setResponseTimes(prev => [...prev.slice(-19), dbLatency])
      return { hit: false, latency: dbLatency }
    }
  }, [cache, cacheCapacity, cacheLatency, dbLatency, dataItems])

  // Auto-send requests
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => makeRequest(), 500)
    return () => clearInterval(interval)
  }, [isRunning, makeRequest])

  // Update TTLs and calculate average response time
  useEffect(() => {
    const interval = setInterval(() => {
      setCache(prev => {
        const newCache = new Map()
        prev.forEach((v, k) => {
          const newTtl = v.ttl - 1
          if (newTtl > 0) {
            newCache.set(k, { ...v, ttl: newTtl })
          }
        })
        return newCache
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Calculate average response time
  useEffect(() => {
    if (responseTimes.length > 0) {
      const avg = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      setAvgResponseTime(Math.round(avg))
    }
  }, [responseTimes])

  const hitRate = stats.requests > 0 ? ((stats.hits / stats.requests) * 100).toFixed(1) : 0

  // Reset
  const resetSimulation = () => {
    setIsRunning(false)
    setCache(new Map())
    setStats({ hits: 0, misses: 0, requests: 0 })
    setResponseTimes([])
  }

  // Check for cache hit achievement
  useEffect(() => {
    if (parseFloat(hitRate) >= 90 && stats.requests >= 20) {
      unlockAchievement?.('cache_hit')
    }
  }, [hitRate, stats.requests, unlockAchievement])

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary benefit of caching?',
      options: [
        { id: 'a', text: 'Storing more data', correct: false },
        { id: 'b', text: 'Reducing latency by avoiding repeated expensive operations', correct: true },
        { id: 'c', text: 'Making databases more secure', correct: false },
        { id: 'd', text: 'Reducing code complexity', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'Why is cache invalidation considered "one of the hardest problems in computer science"?',
      options: [
        { id: 'a', text: 'It uses complex algorithms', correct: false },
        { id: 'b', text: 'Ensuring cached data stays in sync with source data is tricky', correct: true },
        { id: 'c', text: 'Caches are expensive', correct: false },
        { id: 'd', text: 'It requires special hardware', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What does TTL stand for and what does it do?',
      options: [
        { id: 'a', text: 'Time To Load - measures how fast data loads', correct: false },
        { id: 'b', text: 'Time To Live - sets when cached data expires', correct: true },
        { id: 'c', text: 'Total Transfer Length - size of data', correct: false },
        { id: 'd', text: 'Transfer To Local - moves data locally', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'In a write-through cache, when is data written to the database?',
      options: [
        { id: 'a', text: 'Never, data only lives in cache', correct: false },
        { id: 'b', text: 'Later, asynchronously', correct: false },
        { id: 'c', text: 'Immediately, synchronously with the cache write', correct: true },
        { id: 'd', text: 'Only when the cache is full', correct: false },
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

      {/* SECTION: INTRO */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🧠 Memory Lane: The Art of Caching</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Your load balancer is distributing traffic perfectly. But every request still hits
                your database. 10,000 users viewing the same product page = 10,000 identical database
                queries. There has to be a smarter way..."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              <Term
                word="Caching"
                definition="Storing copies of frequently accessed data in a faster storage layer. Instead of computing or fetching something repeatedly, store the result and reuse it."
                onLearn={learnTerm}
              />{' '}
              is the secret weapon of fast systems. It's the difference between waiting 100ms for
              a database query and 5ms for a memory lookup.
            </p>

            <div className="bg-quest-surface rounded-xl p-6 my-6">
              <h3 className="font-semibold mb-4">The Caching Principle</h3>
              <div className="flex items-center justify-around text-center">
                <div>
                  <p className="text-4xl mb-2">❓</p>
                  <p className="text-sm">Request</p>
                </div>
                <ArrowRight className="text-quest-muted" />
                <div className="bg-quest-primary/20 p-4 rounded-lg">
                  <Brain size={32} className="mx-auto text-quest-primary mb-2" />
                  <p className="text-sm font-medium">Cache</p>
                  <p className="text-xs text-quest-success">~5ms</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-quest-success text-sm">Hit? ✓</span>
                  <span className="text-quest-danger text-sm">Miss? ↓</span>
                </div>
                <div className="bg-quest-secondary/20 p-4 rounded-lg">
                  <Database size={32} className="mx-auto text-quest-secondary mb-2" />
                  <p className="text-sm font-medium">Database</p>
                  <p className="text-xs text-quest-warning">~100ms</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-2 flex items-center gap-2">
                  <Zap size={18} />
                  Cache Hit
                </h4>
                <p className="text-sm text-quest-muted">
                  Data is in the cache! Return it immediately. Fast, no database needed.
                </p>
              </div>
              <div className="bg-quest-warning/10 rounded-lg p-4 border border-quest-warning/30">
                <h4 className="font-semibold text-quest-warning mb-2 flex items-center gap-2">
                  <Clock size={18} />
                  Cache Miss
                </h4>
                <p className="text-sm text-quest-muted">
                  Data isn't cached. Fetch from database, then store in cache for next time.
                </p>
              </div>
            </div>

            <DeepDive id="cache-everywhere" title="Caching Is Everywhere" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Caching isn't just a database thing. It's a fundamental pattern at every level:
              </p>
              <ul className="text-sm text-quest-muted space-y-2">
                <li>• <strong>CPU Cache</strong> - L1/L2/L3 caches between CPU and RAM</li>
                <li>• <strong>Browser Cache</strong> - Stores images, CSS, JS locally</li>
                <li>• <strong>CDN Cache</strong> - Geographic caching of static content</li>
                <li>• <strong>Application Cache</strong> - Redis, Memcached for app data</li>
                <li>• <strong>Database Cache</strong> - Query result caching</li>
              </ul>
              <p className="text-sm text-quest-muted mt-3">
                The principle is always the same: keep frequently accessed data closer to where it's needed.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                See It In Action
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SIMULATION */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🎮 Cache Simulation</h2>

            <p className="text-quest-muted mb-6">
              Watch requests flow through a cache. Green boxes are cached items.
              Watch the hit rate climb as more data gets cached!
            </p>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button onClick={() => setIsRunning(!isRunning)} className="btn-primary flex items-center gap-2">
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                {isRunning ? 'Pause' : 'Start'}
              </button>

              <button onClick={() => makeRequest()} className="btn-secondary flex items-center gap-2">
                <Zap size={18} />
                Send Request
              </button>

              <button onClick={resetSimulation} className="btn-secondary flex items-center gap-2">
                <RotateCcw size={18} />
                Clear Cache
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Requests</p>
                <p className="text-2xl font-mono font-bold">{stats.requests}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Hits</p>
                <p className="text-2xl font-mono font-bold text-quest-success">{stats.hits}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Misses</p>
                <p className="text-2xl font-mono font-bold text-quest-warning">{stats.misses}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Hit Rate</p>
                <p className={`text-2xl font-mono font-bold ${parseFloat(hitRate) >= 80 ? 'text-quest-success' : 'text-quest-warning'}`}>
                  {hitRate}%
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Avg Response</p>
                <p className="text-2xl font-mono font-bold">{avgResponseTime}ms</p>
              </div>
            </div>

            {/* Cache visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Brain className="text-quest-primary" />
                  Cache ({cache.size}/{cacheCapacity})
                </h3>
                <span className="text-xs text-quest-muted">TTL = Time until expiry</span>
              </div>

              <div className="grid grid-cols-3 gap-3 min-h-[200px]">
                <AnimatePresence>
                  {Array.from(cache.entries()).map(([key, data]) => (
                    <CacheEntry
                      key={key}
                      keyName={key}
                      value={data.value}
                      ttl={data.ttl}
                      isHit={key === lastHitKey}
                    />
                  ))}
                </AnimatePresence>
                {cache.size === 0 && (
                  <div className="col-span-3 flex items-center justify-center text-quest-muted">
                    Cache is empty. Start sending requests!
                  </div>
                )}
              </div>
            </div>

            {/* Hit rate visualization */}
            <div className="bg-quest-surface rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Hit Rate Target: 90%</span>
                <span className={parseFloat(hitRate) >= 90 ? 'text-quest-success' : 'text-quest-muted'}>
                  {parseFloat(hitRate) >= 90 ? '🎉 Target reached!' : `${(90 - parseFloat(hitRate)).toFixed(1)}% to go`}
                </span>
              </div>
              <div className="h-4 bg-quest-bg rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${parseFloat(hitRate) >= 90 ? 'bg-quest-success' : 'bg-quest-primary'}`}
                  animate={{ width: `${Math.min(parseFloat(hitRate) / 90 * 100, 100)}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-quest-muted text-center mt-4">
              💡 Keep running to see the hit rate improve as more data gets cached!
            </p>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Caching Strategies
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: STRATEGIES */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">📋 Caching Strategies</h2>

            <p className="text-quest-muted mb-6">
              There are several patterns for how and when to cache data. Each has different
              consistency vs. performance tradeoffs.
            </p>

            <div className="space-y-6">
              {/* Cache-Aside */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">📖</span>
                  <Term
                    word="Cache-Aside (Lazy Loading)"
                    definition="Application checks cache first. On miss, it fetches from DB and populates cache. Most common pattern."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-4">
                  The application code is responsible for managing the cache. Most flexible and widely used.
                </p>
                <div className="bg-quest-bg rounded p-4 font-mono text-xs mb-4">
                  <p className="text-quest-muted">// Pseudocode</p>
                  <p>data = cache.get(key)</p>
                  <p className="text-quest-warning">if (!data) {'{'}</p>
                  <p className="pl-4">data = database.get(key)</p>
                  <p className="pl-4 text-quest-success">cache.set(key, data, ttl=60)</p>
                  <p className="text-quest-warning">{'}'}</p>
                  <p>return data</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Only cache what's needed</span>
                  <span className="text-quest-danger">✗ First request always slow</span>
                </div>
              </div>

              {/* Write-Through */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  <Term
                    word="Write-Through"
                    definition="Writes go to both cache and database synchronously. Ensures cache is always up-to-date."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-4">
                  When data is written, update both cache and database in the same operation.
                </p>
                <div className="bg-quest-bg rounded p-4 font-mono text-xs mb-4">
                  <p className="text-quest-muted">// On write</p>
                  <p className="text-quest-primary">cache.set(key, data)</p>
                  <p className="text-quest-secondary">database.set(key, data)</p>
                  <p className="text-quest-muted">// Both happen synchronously</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Cache always consistent</span>
                  <span className="text-quest-danger">✗ Writes are slower (2 operations)</span>
                </div>
              </div>

              {/* Write-Behind */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">⏰</span>
                  <Term
                    word="Write-Behind (Write-Back)"
                    definition="Writes go to cache first, then asynchronously to database later. Fast writes, eventual consistency."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-4">
                  Write to cache immediately, batch and write to database asynchronously.
                </p>
                <div className="bg-quest-bg rounded p-4 font-mono text-xs mb-4">
                  <p className="text-quest-muted">// On write</p>
                  <p className="text-quest-primary">cache.set(key, data)  // immediate</p>
                  <p className="text-quest-secondary">queue.add(writeToDb(key, data)) // async later</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Very fast writes</span>
                  <span className="text-quest-danger">✗ Risk of data loss if cache fails</span>
                </div>
              </div>
            </div>

            <DeepDive id="cache-invalidation" title="The Hardest Problem: Cache Invalidation" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Phil Karlton famously said: "There are only two hard things in Computer Science:
                cache invalidation and naming things."
              </p>
              <p className="text-sm text-quest-muted mb-3">
                When should you remove/update cached data? Options:
              </p>
              <ul className="text-sm text-quest-muted space-y-2">
                <li>• <strong>TTL (Time-To-Live)</strong> - Data expires after X seconds. Simple but may serve stale data.</li>
                <li>• <strong>Event-based</strong> - Invalidate when underlying data changes. Accurate but complex.</li>
                <li>• <strong>Version-based</strong> - Include version in cache key. New version = new cache entry.</li>
              </ul>
              <p className="text-sm text-quest-muted mt-3">
                There's no perfect solution. Choose based on how stale your data can be.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Caching Patterns
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: PATTERNS */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🔧 Real-World Caching Patterns</h2>

            <div className="space-y-6">
              {/* Redis */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔴</span>
                  <Term
                    word="Redis"
                    definition="An in-memory data structure store, used as a database, cache, and message broker. Extremely fast."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-4">
                  The most popular caching solution. In-memory, supports complex data structures,
                  persistence options, and clustering for scale.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Common uses:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Session storage</li>
                      <li>• Page/query caching</li>
                      <li>• Rate limiting</li>
                      <li>• Leaderboards</li>
                    </ul>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Performance:</p>
                    <ul className="text-xs space-y-1">
                      <li>• ~100k ops/second single node</li>
                      <li>• Sub-millisecond latency</li>
                      <li>• Cluster mode for scale</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CDN */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌐</span>
                  <Term
                    word="CDN (Content Delivery Network)"
                    definition="A network of geographically distributed servers that cache content close to users. Essential for static assets."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-4">
                  CDNs cache static content (images, CSS, JS) at edge locations worldwide.
                  Users get content from the nearest server instead of your origin.
                </p>
                <div className="bg-quest-bg rounded p-4">
                  <p className="text-xs text-quest-muted mb-2">Without CDN:</p>
                  <p className="text-sm">User in Tokyo → Your server in Virginia → <span className="text-quest-danger">300ms latency</span></p>
                  <p className="text-xs text-quest-muted mt-3 mb-2">With CDN:</p>
                  <p className="text-sm">User in Tokyo → CDN edge in Tokyo → <span className="text-quest-success">20ms latency</span></p>
                </div>
              </div>

              {/* Browser Cache */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">🌍</span>
                  Browser Cache
                </h3>
                <p className="text-quest-muted text-sm mb-4">
                  The user's browser can cache responses based on HTTP headers you set.
                  Zero latency—data is already on their machine!
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <p className="text-quest-muted">// HTTP Response Headers</p>
                  <p><span className="text-quest-primary">Cache-Control:</span> max-age=3600, public</p>
                  <p><span className="text-quest-primary">ETag:</span> "abc123"</p>
                  <p className="text-quest-muted mt-2">// Browser will cache for 1 hour</p>
                </div>
              </div>
            </div>

            <DeepDive id="cache-layers" title="The Caching Pyramid" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Real applications often use multiple cache layers:
              </p>
              <div className="text-sm text-quest-muted space-y-2">
                <p>1. <strong>Browser Cache</strong> - Fastest, on user's device (0ms)</p>
                <p>2. <strong>CDN Edge Cache</strong> - Geographic proximity (10-50ms)</p>
                <p>3. <strong>Application Cache</strong> - Redis/Memcached (1-5ms)</p>
                <p>4. <strong>Database Cache</strong> - Query cache in DB (5-20ms)</p>
                <p>5. <strong>Database</strong> - The source of truth (50-200ms)</p>
              </div>
              <p className="text-sm text-quest-muted mt-3">
                Each layer catches requests that miss the layer above, reducing load on slower layers.
              </p>
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

      {/* SECTION: QUIZ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">🎯 Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Caching is fundamental to building fast systems. Let's test your understanding!
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
                <h3 className="text-xl font-bold mb-2">Level 4 Complete! 🎉</h3>
                <p className="text-quest-muted mb-4">
                  You've mastered caching! But where does all this data ultimately live?
                </p>
                <p className="text-sm text-quest-primary">
                  Next up: Databases—SQL vs NoSQL and the great data debate!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Link, Hash, BarChart, Globe, Database, Zap } from 'lucide-react'

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

const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

const terms = {
  'Base62 Encoding': 'Encoding that uses 62 characters (0-9, A-Z, a-z) to represent numbers compactly. A 7-character Base62 string can represent 62^7 = 3.5 trillion unique values.',
  'Hash Collision': 'When two different inputs produce the same hash output. In URL shortening, two different long URLs could map to the same short code. Must be detected and resolved.',
  'Analytics': 'Tracking metadata about each URL click: timestamp, geographic location, referrer, device type. Enables the short URL service to provide click statistics.',
  'Caching': 'Storing frequently accessed URL mappings in memory (e.g., Redis) to avoid database lookups on every redirect. Most short URLs follow a power-law distribution.',
  'Redirection': 'HTTP mechanism to send a client from one URL to another. 301 (permanent) tells browsers to cache it; 302 (temporary) forces the client to always ask the server.',
  '301 Redirect': 'Permanent redirect. The browser caches this and never asks the server again. Good for performance, bad for analytics since subsequent clicks bypass the server.',
  '302 Redirect': 'Temporary redirect. The browser always asks the server first. Slightly slower but allows accurate click tracking for every visit.',
  'ID Generator': 'A service that produces globally unique, monotonically increasing IDs. Can use auto-increment DBs, Snowflake IDs, or pre-generated ID ranges.',
  'Read-Heavy': 'A workload where reads vastly outnumber writes. URL shorteners are extremely read-heavy: for every URL created, it may be clicked thousands of times.',
  'Power-Law Distribution': 'A statistical pattern where a small number of URLs receive the vast majority of clicks, while most URLs are rarely accessed. Ideal for caching.',
}

const collisionStrategies = [
  {
    name: 'Append & Rehash',
    description: 'If collision detected, append a counter or salt to the URL and hash again. Repeat until no collision.',
    pros: 'Simple to implement',
    cons: 'Multiple DB checks in worst case',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  {
    name: 'Pre-generated Keys',
    description: 'Generate all possible short keys ahead of time and store in a key database. Pop one off when needed.',
    pros: 'No collision possible, O(1) lookup',
    cons: 'Requires key generation service, concurrency control',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
  },
  {
    name: 'Counter-Based (Base62)',
    description: 'Use an auto-incrementing counter. Convert each new ID to Base62. Each ID is unique by definition.',
    pros: 'Zero collisions, simple math',
    cons: 'Sequential IDs are predictable, single point of failure if one counter',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
  },
]

const redirectionSteps = [
  { label: 'Client requests', detail: 'GET /abc123', time: '0ms', icon: Globe, color: 'text-sky-400' },
  { label: 'Cache check (Redis)', detail: 'HGET url:abc123', time: '~1ms', icon: Zap, color: 'text-yellow-400' },
  { label: 'DB lookup (if miss)', detail: 'SELECT * FROM urls WHERE short_code = "abc123"', time: '~5ms', icon: Database, color: 'text-purple-400' },
  { label: 'Log analytics event', detail: 'Async write to analytics queue', time: '~0ms (async)', icon: BarChart, color: 'text-green-400' },
  { label: '301/302 Redirect', detail: 'Location: https://original-url.com/...', time: 'Total ~2-8ms', icon: Link, color: 'text-quest-primary' },
]

const analyticsData = {
  totalClicks: 1_247_832,
  uniqueVisitors: 892_104,
  countries: [
    { name: 'United States', clicks: 412_500, pct: 33 },
    { name: 'India', clicks: 187_174, pct: 15 },
    { name: 'Germany', clicks: 124_783, pct: 10 },
    { name: 'Brazil', clicks: 99_827, pct: 8 },
    { name: 'Japan', clicks: 74_870, pct: 6 },
    { name: 'Others', clicks: 348_678, pct: 28 },
  ],
  referrers: [
    { name: 'Twitter/X', pct: 38, color: 'bg-sky-400' },
    { name: 'Direct', pct: 25, color: 'bg-green-400' },
    { name: 'Reddit', pct: 18, color: 'bg-orange-400' },
    { name: 'Email', pct: 12, color: 'bg-purple-400' },
    { name: 'Other', pct: 7, color: 'bg-gray-400' },
  ],
  dailyClicks: [42, 58, 71, 95, 130, 185, 220, 310, 480, 620, 550, 410, 380, 290],
}

const quizQuestions = [
  {
    id: 'q1',
    question: 'Why is Base62 preferred over Base10 for short URL codes?',
    options: [
      { id: 'a', text: 'Base62 is more secure and cannot be reversed', correct: false },
      { id: 'b', text: 'Base62 encodes the same number in fewer characters (higher information density)', correct: true },
      { id: 'c', text: 'Base62 avoids all hash collisions automatically', correct: false },
      { id: 'd', text: 'Base62 is required by the HTTP specification', correct: false },
    ],
    explanation: 'Base62 uses 62 characters vs Base10\'s 10, so a 7-char Base62 string holds 62^7 = 3.5 trillion values, while Base10 would need 13 characters for the same range.',
  },
  {
    id: 'q2',
    question: 'When should you use a 302 redirect instead of 301 for a URL shortener?',
    options: [
      { id: 'a', text: 'When you want to reduce server load', correct: false },
      { id: 'b', text: 'When you need accurate click analytics for every visit', correct: true },
      { id: 'c', text: 'When the destination URL is HTTPS', correct: false },
      { id: 'd', text: '302 should always be used because it is faster', correct: false },
    ],
    explanation: '301 (permanent) lets browsers cache the redirect, so subsequent clicks bypass your server entirely. 302 (temporary) forces every click through your server, enabling accurate analytics.',
  },
  {
    id: 'q3',
    question: 'What is the best strategy to handle hash collisions at scale?',
    options: [
      { id: 'a', text: 'Use a longer hash to eliminate all collisions', correct: false },
      { id: 'b', text: 'Use a counter-based ID generator and convert to Base62', correct: true },
      { id: 'c', text: 'Delete the old URL and reuse the short code', correct: false },
      { id: 'd', text: 'Hash collisions cannot happen with MD5', correct: false },
    ],
    explanation: 'Counter-based IDs guarantee uniqueness by definition: each new URL gets the next integer, converted to Base62. No collision detection needed. Pre-generated key pools also work well.',
  },
  {
    id: 'q4',
    question: 'Why is caching especially effective for a URL shortener?',
    options: [
      { id: 'a', text: 'Because all URLs are accessed equally often', correct: false },
      { id: 'b', text: 'Because URL mappings never change once created', correct: false },
      { id: 'c', text: 'Because access follows a power-law: a few URLs get most of the traffic', correct: true },
      { id: 'd', text: 'Because the cache can store unlimited entries', correct: false },
    ],
    explanation: 'URL access follows a power-law distribution: ~20% of URLs account for ~80% of traffic. Caching just the hot URLs in Redis dramatically reduces database load.',
  },
  {
    id: 'q5',
    question: 'For a URL shortener handling 100M new URLs/day, how much storage is needed for 5 years?',
    options: [
      { id: 'a', text: '~18 TB (each record ~100 bytes)', correct: true },
      { id: 'b', text: '~1 TB (URLs are just text)', correct: false },
      { id: 'c', text: '~500 TB (each record needs 1 KB)', correct: false },
      { id: 'd', text: 'Impossible to estimate without knowing URL lengths', correct: false },
    ],
    explanation: '100M/day x 365 x 5 = ~182 billion URLs. Each record (short code + long URL + metadata) is ~100 bytes. 182B x 100 bytes = ~18.2 TB. Very manageable for modern databases.',
  },
]

/* ── Helper functions ── */

function numberToBase62(num) {
  if (num === 0) return '0'
  let result = ''
  let n = Math.abs(num)
  while (n > 0) {
    result = BASE62_CHARS[n % 62] + result
    n = Math.floor(n / 62)
  }
  return result
}

function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

/* ── Main Component ── */

export default function Level57({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(1)
  const [urlInput, setUrlInput] = useState('')
  const [shortenResult, setShortenResult] = useState(null)
  const [shortenSteps, setShortenSteps] = useState([])
  const [isShortening, setIsShortening] = useState(false)
  const [collisionDemo, setCollisionDemo] = useState({ active: false, step: 0, resolved: false })
  const [redirectDemo, setRedirectDemo] = useState({ active: false, step: -1, cacheHit: true })
  const [selectedStrategy, setSelectedStrategy] = useState(null)
  const [scaleCalc, setScaleCalc] = useState({ urlsPerDay: 100, years: 5 })
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── URL Shortening Demo ── */
  const handleShorten = useCallback(() => {
    if (!urlInput.trim()) return
    setIsShortening(true)
    setShortenResult(null)
    setShortenSteps([])

    const url = urlInput.trim()
    const hashVal = simpleHash(url)
    const base62Code = numberToBase62(hashVal).slice(0, 7).padEnd(7, '0')

    const steps = [
      { label: 'Input URL', value: url, delay: 0 },
      { label: 'Hash (simulated)', value: `hash("${url.slice(0, 30)}...") = ${hashVal}`, delay: 400 },
      { label: 'Numeric ID', value: String(hashVal), delay: 800 },
      { label: 'Base62 encoding', value: `${hashVal} -> "${base62Code}"`, delay: 1200 },
      { label: 'Short URL', value: `https://tiny.url/${base62Code}`, delay: 1600 },
    ]

    steps.forEach((step, i) => {
      setTimeout(() => {
        setShortenSteps(prev => [...prev, step])
        if (i === steps.length - 1) {
          setShortenResult({ shortUrl: `https://tiny.url/${base62Code}`, code: base62Code, id: hashVal })
          setIsShortening(false)
        }
      }, step.delay)
    })
  }, [urlInput])

  /* ── Collision Demo ── */
  const runCollisionDemo = useCallback(() => {
    setCollisionDemo({ active: true, step: 0, resolved: false })
    const timings = [0, 800, 1600, 2400, 3200]
    timings.forEach((t, i) => {
      setTimeout(() => {
        setCollisionDemo(prev => ({ ...prev, step: i + 1, resolved: i === timings.length - 1 }))
      }, t)
    })
  }, [])

  /* ── Redirect Demo ── */
  const runRedirectDemo = useCallback((cacheHit) => {
    setRedirectDemo({ active: true, step: -1, cacheHit })
    const stepsToRun = cacheHit ? [0, 1, 3, 4] : [0, 1, 2, 3, 4]
    stepsToRun.forEach((stepIdx, i) => {
      setTimeout(() => {
        setRedirectDemo(prev => ({ ...prev, step: stepIdx }))
      }, (i + 1) * 600)
    })
  }, [])

  /* ── Quiz ── */
  const handleQuizSubmit = useCallback(() => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const correct = q.options.find(o => o.correct)
      return quizAnswers[q.id] === correct?.id
    })
    if (allCorrect && onComplete) onComplete()
  }, [quizAnswers, onComplete])

  /* ── Scale calculations ── */
  const totalUrls = scaleCalc.urlsPerDay * 1_000_000 * 365 * scaleCalc.years
  const storageBytes = totalUrls * 100
  const storageTB = (storageBytes / (1024 ** 4)).toFixed(1)
  const base62Digits = Math.ceil(Math.log(totalUrls) / Math.log(62))
  const base62Capacity = Math.pow(62, 7)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Link size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Design URL Shortener</h1>
            <p className="text-sm text-quest-muted">Level 57 - TinyURL Architecture</p>
          </div>
        </div>
        <p className="text-quest-muted max-w-xl mx-auto">
          Turn long URLs into short ones. Easy? Let's see how it scales to billions.
        </p>
      </motion.div>

      {/* ── Section Navigation ── */}
      <div className="flex gap-2 justify-center flex-wrap">
        {['Shortening', 'Collisions', 'Redirection', 'Analytics & Scale', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i + 1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentSection === i + 1
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════ SECTION 1: URL SHORTENING ═══════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Hash className="text-blue-400" />
              URL Shortening with Base62
            </h2>

            <p className="text-sm text-quest-muted mb-4">
              A URL shortener maps a long URL to a short, unique code. The core question:
              how do you generate a short, unique identifier for every URL? The answer is{' '}
              <Term word="Base62 Encoding" definition={terms['Base62 Encoding']} onLearn={learnTerm} />.
              Take a numeric ID and encode it using 62 characters (digits, uppercase, lowercase letters).
            </p>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-blue-500/20">
              <h4 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <Hash size={16} />
                Base62 Encoding Visualizer
              </h4>
              <p className="text-xs text-quest-muted mb-4">
                Characters: <span className="font-mono text-quest-text">0-9</span> (10) +{' '}
                <span className="font-mono text-quest-text">A-Z</span> (26) +{' '}
                <span className="font-mono text-quest-text">a-z</span> (26) ={' '}
                <span className="font-mono text-quest-primary font-bold">62 characters</span>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-surface rounded-lg p-3">
                  <p className="text-[10px] text-quest-muted mb-1">7 chars in Base10</p>
                  <p className="font-mono text-lg font-bold text-quest-text">10^7 = <span className="text-red-400">10M</span></p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3">
                  <p className="text-[10px] text-quest-muted mb-1">7 chars in Base62</p>
                  <p className="font-mono text-lg font-bold text-quest-text">62^7 = <span className="text-green-400">3.5T</span></p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {BASE62_CHARS.split('').map((char, i) => (
                  <span
                    key={i}
                    className={`w-6 h-6 flex items-center justify-center rounded text-[10px] font-mono font-bold ${
                      i < 10 ? 'bg-yellow-500/20 text-yellow-400' :
                      i < 36 ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {char}
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { id: 1, base62: '1' },
                  { id: 100, base62: numberToBase62(100) },
                  { id: 10000, base62: numberToBase62(10000) },
                  { id: 1000000, base62: numberToBase62(1000000) },
                  { id: 1000000000, base62: numberToBase62(1000000000) },
                ].map(ex => (
                  <div key={ex.id} className="flex items-center gap-3 bg-quest-surface rounded-lg p-2">
                    <span className="font-mono text-quest-muted w-28 text-right">{ex.id.toLocaleString()}</span>
                    <span className="text-quest-muted">-></span>
                    <span className="font-mono font-bold text-quest-primary">{ex.base62}</span>
                    <span className="text-quest-muted ml-auto">{ex.base62.length} char{ex.base62.length > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive shortening */}
            <div className="bg-quest-bg rounded-xl p-6 border border-purple-500/20">
              <h4 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <Link size={16} />
                Try It: Shorten a URL
              </h4>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/very/long/path/to/some/resource"
                  className="flex-1 bg-quest-surface border border-white/10 rounded-lg px-4 py-2 text-sm font-mono focus:border-quest-primary focus:outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleShorten()}
                />
                <button
                  onClick={handleShorten}
                  disabled={isShortening || !urlInput.trim()}
                  className="btn-primary px-6 py-2 text-sm disabled:opacity-50"
                >
                  {isShortening ? 'Processing...' : 'Shorten'}
                </button>
              </div>

              <AnimatePresence>
                {shortenSteps.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    {shortenSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-start gap-3 p-3 rounded-lg ${
                          i === shortenSteps.length - 1 && shortenResult
                            ? 'bg-green-500/10 border border-green-500/30'
                            : 'bg-quest-surface'
                        }`}
                      >
                        <span className="text-[10px] text-quest-muted font-mono w-8 text-right pt-0.5">
                          {i + 1}.
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-quest-muted">{step.label}</p>
                          <p className="text-sm font-mono text-quest-text truncate">{step.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {shortenResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-quest-primary/10 border border-quest-primary/30 rounded-lg text-center"
                >
                  <p className="text-xs text-quest-muted mb-1">Your short URL</p>
                  <p className="text-lg font-mono font-bold text-quest-primary">{shortenResult.shortUrl}</p>
                  <p className="text-[10px] text-quest-muted mt-2">
                    ID: {shortenResult.id.toLocaleString()} | Code: {shortenResult.code} | {shortenResult.code.length} characters
                  </p>
                </motion.div>
              )}
            </div>

            <DeepDive id="base62-math" title="The Math Behind Base62 Capacity" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Why 7 characters?</strong> With 7 Base62 characters, you get
                  62^7 = 3,521,614,606,208 (3.5 trillion) unique codes. If you generate 100 million short URLs per day,
                  7 characters last you <strong className="text-quest-text">96 years</strong>.
                </p>
                <p>
                  <strong className="text-quest-text">Why not Base64?</strong> Base64 includes '+' and '/' characters,
                  which cause issues in URLs (need percent-encoding). Base62 uses only URL-safe characters.
                </p>
                <p>
                  <strong className="text-quest-text">Encoding process:</strong> Take the numeric ID (e.g., 125,432).
                  Repeatedly divide by 62, using the remainder as an index into the character set.
                  125432 / 62 = 2023 remainder 6 ('6'), 2023 / 62 = 32 remainder 39 ('d'), 32 / 62 = 0 remainder 32 ('W').
                  Result: "Wd6".
                </p>
              </div>
            </DeepDive>

            <DeepDive id="id-generation" title="ID Generation Strategies at Scale" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Auto-increment DB:</strong> Simple but creates a single point of failure.
                  If you use multiple DB servers, assign each a range (Server 1: 1-1M, Server 2: 1M-2M).
                </p>
                <p>
                  <strong className="text-quest-text">Snowflake IDs (Twitter):</strong> 64-bit IDs composed of timestamp + worker ID + sequence number.
                  Globally unique without coordination. But IDs are large numbers when Base62-encoded.
                </p>
                <p>
                  <strong className="text-quest-text">Pre-generated key pool:</strong> A separate service generates millions of
                  random 7-char Base62 keys and stores them. When a URL is shortened, pop one from the pool. No collision
                  check needed. Must handle concurrency (two servers popping the same key).
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Hash Collisions
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ SECTION 2: HASH COLLISIONS ═══════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Hash className="text-red-400" />
              <Term word="Hash Collision" definition={terms['Hash Collision']} onLearn={learnTerm} /> Handling
            </h2>

            <p className="text-sm text-quest-muted mb-6">
              If you hash URLs to generate short codes, two different URLs might produce the same hash.
              This is a{' '}
              <Term word="Hash Collision" definition={terms['Hash Collision']} onLearn={learnTerm} />.
              At billions of URLs, collisions are not just possible, they are guaranteed (Birthday Problem).
            </p>

            {/* Collision Demo */}
            <div className="bg-quest-bg rounded-xl p-6 border border-red-500/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                  <Zap size={16} />
                  Collision Demo
                </h4>
                <button
                  onClick={runCollisionDemo}
                  disabled={collisionDemo.active && !collisionDemo.resolved}
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
                >
                  {collisionDemo.resolved ? 'Replay' : collisionDemo.active ? 'Running...' : 'Simulate Collision'}
                </button>
              </div>

              <div className="space-y-3">
                {/* Step 1: URL A */}
                <motion.div
                  animate={{ opacity: collisionDemo.step >= 1 ? 1 : 0.3 }}
                  className="bg-quest-surface rounded-lg p-3"
                >
                  <p className="text-xs text-quest-muted">URL A</p>
                  <p className="text-sm font-mono text-quest-text truncate">https://example.com/blog/my-awesome-article-2024</p>
                  {collisionDemo.step >= 1 && (
                    <p className="text-xs font-mono text-blue-400 mt-1">hash() → "aB3xK9m"</p>
                  )}
                </motion.div>

                {/* Step 2: URL B */}
                <motion.div
                  animate={{ opacity: collisionDemo.step >= 2 ? 1 : 0.3 }}
                  className="bg-quest-surface rounded-lg p-3"
                >
                  <p className="text-xs text-quest-muted">URL B (different URL)</p>
                  <p className="text-sm font-mono text-quest-text truncate">https://shop.example.com/products/item-7742?ref=home</p>
                  {collisionDemo.step >= 2 && (
                    <p className="text-xs font-mono text-red-400 mt-1">hash() → "aB3xK9m" (COLLISION!)</p>
                  )}
                </motion.div>

                {/* Step 3: Collision detected */}
                {collisionDemo.step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                  >
                    <p className="text-xs font-bold text-red-400">Collision detected!</p>
                    <p className="text-[11px] text-quest-muted mt-1">
                      DB lookup: "aB3xK9m" already maps to URL A. Must resolve...
                    </p>
                  </motion.div>
                )}

                {/* Step 4: Resolution */}
                {collisionDemo.step >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3"
                  >
                    <p className="text-xs font-bold text-yellow-400">Resolving: append salt and rehash</p>
                    <p className="text-[11px] font-mono text-quest-muted mt-1">
                      hash("https://shop.example.com/...?ref=home" + "_1") → "kW7pN2v"
                    </p>
                  </motion.div>
                )}

                {/* Step 5: Resolved */}
                {collisionDemo.step >= 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                  >
                    <p className="text-xs font-bold text-green-400">Resolved!</p>
                    <p className="text-[11px] text-quest-muted mt-1">
                      URL A → "aB3xK9m" | URL B → "kW7pN2v" (unique codes)
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Resolution Strategies */}
            <h3 className="font-semibold mb-3">Resolution Strategies</h3>
            <div className="space-y-3 mb-6">
              {collisionStrategies.map((strategy) => (
                <motion.button
                  key={strategy.name}
                  onClick={() => setSelectedStrategy(selectedStrategy === strategy.name ? null : strategy.name)}
                  whileHover={{ scale: 1.005 }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedStrategy === strategy.name
                      ? `${strategy.bg} border-current ring-1 ring-current`
                      : 'bg-quest-bg border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-semibold text-sm ${strategy.color}`}>{strategy.name}</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">{strategy.description}</p>
                  <AnimatePresence>
                    {selectedStrategy === strategy.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-white/10">
                          <div>
                            <p className="text-[10px] text-green-400 font-semibold mb-1">Pros</p>
                            <p className="text-xs text-quest-muted">{strategy.pros}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-red-400 font-semibold mb-1">Cons</p>
                            <p className="text-xs text-quest-muted">{strategy.cons}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>

            <DeepDive id="birthday-problem" title="The Birthday Problem & Collision Probability" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Birthday Problem:</strong> With just 23 people in a room, there is a
                  50% chance two share a birthday. Similarly, with a hash space of N, you only need ~sqrt(N) entries
                  before a collision becomes likely.
                </p>
                <p>
                  <strong className="text-quest-text">MD5 (128-bit) example:</strong> With 2^128 possible hashes, a collision
                  becomes probable after ~2^64 entries. If you truncate to 43 bits (7 Base62 chars), collisions start at ~2^21.5
                  (about 3 million entries). At scale, you WILL hit collisions.
                </p>
                <p>
                  <strong className="text-quest-text">Why counters win:</strong> Counter-based ID generation sidesteps the
                  entire collision problem. Each URL gets the next integer ID. No hashing, no collisions, no checking.
                  The only challenge is distributing counter ranges across multiple servers.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Redirection Flow
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ SECTION 3: REDIRECTION FLOW ═══════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="text-sky-400" />
              <Term word="Redirection" definition={terms['Redirection']} onLearn={learnTerm} /> Flow
            </h2>

            <p className="text-sm text-quest-muted mb-4">
              When someone clicks a short URL, your service must resolve it to the original URL
              and send the user there. This is the{' '}
              <Term word="Read-Heavy" definition={terms['Read-Heavy']} onLearn={learnTerm} />{' '}
              path, and it must be fast.{' '}
              <Term word="Caching" definition={terms['Caching']} onLearn={learnTerm} />{' '}
              is critical because URL access follows a{' '}
              <Term word="Power-Law Distribution" definition={terms['Power-Law Distribution']} onLearn={learnTerm} />.
            </p>

            {/* 301 vs 302 */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <h4 className="font-semibold text-green-400 text-sm mb-2 flex items-center gap-2">
                  <CheckCircle size={14} />
                  <Term word="301 Redirect" definition={terms['301 Redirect']} onLearn={learnTerm} />
                </h4>
                <p className="text-xs text-quest-muted mb-3">
                  "Moved Permanently" - Browser caches the redirect. Subsequent clicks skip your server entirely.
                </p>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-quest-muted">Performance</span>
                    <span className="text-green-400 font-semibold">Excellent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-quest-muted">Analytics accuracy</span>
                    <span className="text-red-400 font-semibold">Poor (cached clicks invisible)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-quest-muted">Server load</span>
                    <span className="text-green-400 font-semibold">Minimal after first click</span>
                  </div>
                </div>
              </div>

              <div className="bg-quest-bg rounded-xl p-5 border border-sky-500/20">
                <h4 className="font-semibold text-sky-400 text-sm mb-2 flex items-center gap-2">
                  <BarChart size={14} />
                  <Term word="302 Redirect" definition={terms['302 Redirect']} onLearn={learnTerm} />
                </h4>
                <p className="text-xs text-quest-muted mb-3">
                  "Found" (Temporary) - Browser always asks the server. Every click is tracked.
                </p>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-quest-muted">Performance</span>
                    <span className="text-yellow-400 font-semibold">Good (with server-side cache)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-quest-muted">Analytics accuracy</span>
                    <span className="text-green-400 font-semibold">Perfect (every click seen)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-quest-muted">Server load</span>
                    <span className="text-yellow-400 font-semibold">Every click hits server</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Redirect Flow */}
            <div className="bg-quest-bg rounded-xl p-6 border border-sky-500/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-sky-400 flex items-center gap-2">
                  <Zap size={16} />
                  Redirect Flow Simulator
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => runRedirectDemo(true)}
                    disabled={redirectDemo.active && redirectDemo.step < 4}
                    className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50"
                  >
                    Cache Hit
                  </button>
                  <button
                    onClick={() => runRedirectDemo(false)}
                    disabled={redirectDemo.active && redirectDemo.step < 4}
                    className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-50"
                  >
                    Cache Miss
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {redirectionSteps.map((step, i) => {
                  const isSkipped = redirectDemo.cacheHit && i === 2
                  const isActive = redirectDemo.step >= i && !isSkipped
                  const isCurrent = redirectDemo.step === i && !isSkipped
                  const Icon = step.icon

                  return (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: redirectDemo.active ? (isSkipped ? 0.2 : isActive ? 1 : 0.3) : 0.5,
                        scale: isCurrent ? 1.02 : 1,
                      }}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        isCurrent ? 'bg-quest-primary/10 border border-quest-primary/30' :
                        isSkipped ? 'bg-quest-surface/30 line-through' :
                        'bg-quest-surface'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive ? 'bg-quest-primary/20' : 'bg-white/5'
                      }`}>
                        <Icon size={16} className={isActive ? step.color : 'text-quest-muted'} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium">
                          {step.label}
                          {isSkipped && ' (SKIPPED - cache hit)'}
                        </p>
                        <p className="text-[10px] font-mono text-quest-muted truncate">{step.detail}</p>
                      </div>
                      <span className={`text-[10px] font-mono ${isActive ? step.color : 'text-quest-muted'}`}>
                        {isSkipped ? '--' : step.time}
                      </span>
                    </motion.div>
                  )
                })}
              </div>

              {redirectDemo.step >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
                >
                  <p className="text-xs text-green-400 font-semibold">
                    Redirect complete!{' '}
                    {redirectDemo.cacheHit
                      ? 'Total latency: ~2ms (cache hit - DB lookup skipped)'
                      : 'Total latency: ~8ms (cache miss - full DB lookup)'}
                  </p>
                </motion.div>
              )}
            </div>

            <DeepDive id="caching-strategy" title="Caching Strategy: LRU + Hot URLs" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Redis as cache:</strong> Store the mapping (short_code → long_url)
                  in Redis with a TTL. Cache hit rate of 80-90% is achievable because of the power-law distribution.
                </p>
                <p>
                  <strong className="text-quest-text">LRU eviction:</strong> Use Least Recently Used eviction policy.
                  Popular URLs stay in cache; rarely accessed URLs are evicted naturally. A cache of just 20% of URLs
                  can serve 80% of requests.
                </p>
                <p>
                  <strong className="text-quest-text">Write-through on create:</strong> When a new short URL is created,
                  immediately write it to both the database and cache. The first click will always be a cache hit.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="read-write-ratio" title="Read/Write Ratio & System Design Implications" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Extreme read-heavy:</strong> A typical URL shortener has a 100:1
                  read-to-write ratio. If you create 100M URLs/day, expect 10B+ redirects/day. This is ~115K reads/second.
                </p>
                <p>
                  <strong className="text-quest-text">Database choice:</strong> Since reads dominate, use read replicas.
                  One primary for writes, multiple replicas for reads. NoSQL (DynamoDB, Cassandra) works well for this
                  simple key-value pattern.
                </p>
                <p>
                  <strong className="text-quest-text">Sharding:</strong> Shard by the first character of the short code.
                  With Base62, you get 62 natural shards. Or use consistent hashing for more granular distribution.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Analytics & Scale
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ SECTION 4: ANALYTICS & SCALE ═══════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart className="text-green-400" />
              <Term word="Analytics" definition={terms['Analytics']} onLearn={learnTerm} /> & Scale
            </h2>

            <p className="text-sm text-quest-muted mb-6">
              URL shorteners are not just about redirects. Click analytics transform a simple utility into a
              powerful marketing tool. But tracking every click at scale requires careful design.
            </p>

            {/* Analytics Dashboard */}
            <div className="bg-quest-bg rounded-xl p-6 border border-green-500/20 mb-6">
              <h4 className="text-sm font-semibold text-green-400 mb-4 flex items-center gap-2">
                <BarChart size={16} />
                Sample Analytics Dashboard: tiny.url/aB3xK9m
              </h4>

              {/* Top stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-quest-surface rounded-lg p-4 text-center">
                  <p className="text-[10px] text-quest-muted">Total Clicks</p>
                  <p className="text-2xl font-bold font-mono text-quest-primary">
                    {analyticsData.totalClicks.toLocaleString()}
                  </p>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 text-center">
                  <p className="text-[10px] text-quest-muted">Unique Visitors</p>
                  <p className="text-2xl font-bold font-mono text-sky-400">
                    {analyticsData.uniqueVisitors.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Click trend chart */}
              <div className="bg-quest-surface rounded-lg p-4 mb-4">
                <h5 className="text-xs font-semibold mb-3">Daily Clicks (last 14 days)</h5>
                <div className="flex items-end gap-1 h-24">
                  {analyticsData.dailyClicks.map((clicks, i) => {
                    const maxClicks = Math.max(...analyticsData.dailyClicks)
                    const height = (clicks / maxClicks) * 100
                    return (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="flex-1 bg-gradient-to-t from-quest-primary/60 to-quest-primary rounded-t relative group"
                      >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-mono text-quest-text whitespace-nowrap">
                          {clicks}K
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                <div className="flex justify-between text-[8px] text-quest-muted mt-1">
                  <span>14d ago</span>
                  <span>Today</span>
                </div>
              </div>

              {/* Geographic distribution */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-surface rounded-lg p-4">
                  <h5 className="text-xs font-semibold mb-3 flex items-center gap-1">
                    <Globe size={12} />
                    Top Countries
                  </h5>
                  <div className="space-y-2">
                    {analyticsData.countries.map((country) => (
                      <div key={country.name}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-quest-muted">{country.name}</span>
                          <span className="font-mono text-quest-text">{country.pct}%</span>
                        </div>
                        <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-quest-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${country.pct}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-quest-surface rounded-lg p-4">
                  <h5 className="text-xs font-semibold mb-3 flex items-center gap-1">
                    <Link size={12} />
                    Referrer Sources
                  </h5>
                  <div className="space-y-2">
                    {analyticsData.referrers.map((ref) => (
                      <div key={ref.name}>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span className="text-quest-muted">{ref.name}</span>
                          <span className="font-mono text-quest-text">{ref.pct}%</span>
                        </div>
                        <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${ref.color} rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${ref.pct}%` }}
                            transition={{ duration: 0.6 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-quest-muted">
                Analytics writes are asynchronous: push click events to Kafka, process with stream consumers,
                and aggregate into a time-series store. Never block the redirect for analytics.
              </p>
            </div>

            {/* Scale Math Calculator */}
            <div className="bg-quest-bg rounded-xl p-6 border border-yellow-500/20 mb-6">
              <h4 className="text-sm font-semibold text-yellow-400 mb-4 flex items-center gap-2">
                <Database size={16} />
                Scale Calculator
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[10px] text-quest-muted block mb-1">New URLs per day (millions)</label>
                  <input
                    type="range"
                    min={1}
                    max={500}
                    value={scaleCalc.urlsPerDay}
                    onChange={(e) => setScaleCalc(prev => ({ ...prev, urlsPerDay: Number(e.target.value) }))}
                    className="w-full accent-yellow-400"
                  />
                  <p className="text-sm font-mono font-bold text-yellow-400">{scaleCalc.urlsPerDay}M/day</p>
                </div>
                <div>
                  <label className="text-[10px] text-quest-muted block mb-1">Time horizon (years)</label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={scaleCalc.years}
                    onChange={(e) => setScaleCalc(prev => ({ ...prev, years: Number(e.target.value) }))}
                    className="w-full accent-yellow-400"
                  />
                  <p className="text-sm font-mono font-bold text-yellow-400">{scaleCalc.years} years</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-quest-surface rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[10px] text-quest-muted">Total URLs</p>
                      <p className="text-sm font-mono font-bold text-quest-text">
                        {(totalUrls / 1e9).toFixed(1)}B
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-quest-muted">Storage needed</p>
                      <p className="text-sm font-mono font-bold text-quest-text">{storageTB} TB</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-quest-muted">Base62 chars needed</p>
                      <p className="text-sm font-mono font-bold text-quest-text">{base62Digits}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-quest-muted">7-char capacity</p>
                      <p className="text-sm font-mono font-bold text-quest-text">
                        {(base62Capacity / 1e12).toFixed(1)}T
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-quest-surface rounded-lg p-4">
                  <h5 className="text-xs font-semibold mb-2">Breakdown</h5>
                  <div className="font-mono text-[11px] space-y-1 text-quest-muted">
                    <p>
                      {scaleCalc.urlsPerDay}M/day x 365 days x {scaleCalc.years} years ={' '}
                      <span className="text-quest-text font-bold">{(totalUrls / 1e9).toFixed(1)}B URLs</span>
                    </p>
                    <p>
                      Each record: ~100 bytes (short code + long URL + metadata)
                    </p>
                    <p>
                      {(totalUrls / 1e9).toFixed(1)}B x 100 bytes ={' '}
                      <span className="text-quest-text font-bold">{storageTB} TB storage</span>
                    </p>
                    <p>
                      Reads: ~{scaleCalc.urlsPerDay * 100}M/day ({(scaleCalc.urlsPerDay * 100 * 1e6 / 86400 / 1000).toFixed(0)}K QPS at 100:1 read ratio)
                    </p>
                    <p>
                      7-char Base62 capacity: {(base62Capacity / 1e12).toFixed(1)}T ={' '}
                      <span className={totalUrls < base62Capacity ? 'text-green-400' : 'text-red-400'}>
                        {totalUrls < base62Capacity ? 'SUFFICIENT' : 'NEED MORE CHARS'}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Capacity bar */}
                <div className="bg-quest-surface rounded-lg p-4">
                  <div className="flex justify-between text-[10px] mb-2">
                    <span className="text-quest-muted">ID Space Usage (7-char Base62)</span>
                    <span className="font-mono text-quest-text">
                      {((totalUrls / base62Capacity) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="h-4 bg-quest-bg rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        totalUrls / base62Capacity < 0.5 ? 'bg-green-400' :
                        totalUrls / base62Capacity < 0.8 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}
                      animate={{ width: `${Math.min((totalUrls / base62Capacity) * 100, 100)}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System architecture summary */}
            <div className="bg-quest-bg rounded-xl p-6 border border-purple-500/20 mb-6">
              <h4 className="text-sm font-semibold text-purple-400 mb-4 flex items-center gap-2">
                <Database size={16} />
                Architecture Summary
              </h4>
              <div className="space-y-2">
                {[
                  { component: 'Load Balancer', detail: 'Distribute requests across API servers', color: 'text-sky-400' },
                  { component: 'API Servers', detail: 'Stateless, horizontally scalable. Handle shorten + redirect', color: 'text-green-400' },
                  { component: 'ID Generator', detail: 'Counter-based or pre-generated key pool. Must be globally unique', color: 'text-yellow-400' },
                  { component: 'Cache (Redis)', detail: 'Hot URL lookups. LRU eviction. 80-90% hit rate', color: 'text-orange-400' },
                  { component: 'Database', detail: 'Primary for writes, replicas for reads. NoSQL works well (key-value)', color: 'text-purple-400' },
                  { component: 'Analytics Pipeline', detail: 'Kafka → Stream processors → Time-series DB. Async, never blocking', color: 'text-pink-400' },
                  { component: 'CDN (optional)', detail: 'For 301 redirects, CDN can cache at edge. Reduces latency globally', color: 'text-indigo-400' },
                ].map((item) => (
                  <div key={item.component} className="flex items-start gap-3 bg-quest-surface rounded-lg p-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${item.color.replace('text-', 'bg-')}`} />
                    <div>
                      <p className={`text-xs font-semibold ${item.color}`}>{item.component}</p>
                      <p className="text-[10px] text-quest-muted">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="analytics-at-scale" title="Analytics Pipeline Design" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Never block redirects for analytics.</strong> Push click events
                  to a message queue (Kafka) asynchronously. The redirect completes immediately while analytics
                  are processed in the background.
                </p>
                <p>
                  <strong className="text-quest-text">Event schema:</strong> Each click event contains: short_code,
                  timestamp, IP (for geo-lookup), User-Agent (for device detection), Referer header, and country
                  (from IP geo-lookup).
                </p>
                <p>
                  <strong className="text-quest-text">Aggregation:</strong> Stream processors (Flink, Spark Streaming)
                  aggregate events into per-minute, per-hour, and per-day buckets. Pre-aggregated data is fast to
                  query for dashboards. Raw events go to cold storage for ad-hoc analysis.
                </p>
                <p>
                  <strong className="text-quest-text">Storage:</strong> Time-series database (ClickHouse, TimescaleDB)
                  for aggregated metrics. S3/Glacier for raw event logs. Typical retention: 90 days hot, 2 years cold.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="rate-limiting" title="Abuse Prevention & Rate Limiting" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">URL creation rate limiting:</strong> Limit URL creation per user
                  (e.g., 100/hour for free tier, 10K/hour for paid). Use token bucket or sliding window at the API gateway.
                </p>
                <p>
                  <strong className="text-quest-text">Malicious URL detection:</strong> Check new URLs against blacklists
                  (Google Safe Browsing API). Scan for phishing, malware, and spam domains before shortening.
                </p>
                <p>
                  <strong className="text-quest-text">Click fraud prevention:</strong> Detect bot clicks via User-Agent
                  analysis, click velocity (100 clicks from same IP in 1 second), and known bot IP ranges.
                  Filter these from analytics counts.
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

      {/* ═══════════════ SECTION 5: QUIZ ═══════════════ */}
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
              URL shorteners appear simple but involve encoding, caching, collision handling, and analytics at scale.
              Let's verify your understanding.
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

                  {quizSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className={`p-3 rounded-lg text-xs ${
                        quizAnswers[q.id] === q.options.find(o => o.correct)?.id
                          ? 'bg-green-500/10 text-green-300'
                          : 'bg-red-500/10 text-red-300'
                      }`}>
                        {q.explanation}
                      </div>
                    </motion.div>
                  )}
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
                <h3 className="text-xl font-bold mb-2">Level 57 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how URL shorteners work at scale: Base62 encoding for compact codes,
                  collision-free ID generation, cache-optimized redirect flows, and async analytics pipelines.
                  What seems like a simple service hides real distributed systems challenges.
                </p>
                <p className="text-sm text-sky-400">
                  Billions of redirects, millisecond latency. That's engineering.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Globe, Zap, Shield, Server, Cloud, RefreshCw, Clock, MapPin,
  ToggleLeft, ToggleRight, Trash2, Eye, Bot, Image, Users
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

/* ── City data for the world map ── */
const cities = [
  { name: 'Sydney', x: 88, y: 72, latencyNocdn: 280, latencyCdn: 18 },
  { name: 'Tokyo', x: 82, y: 38, latencyNocdn: 200, latencyCdn: 12 },
  { name: 'Mumbai', x: 66, y: 48, latencyNocdn: 220, latencyCdn: 15 },
  { name: 'London', x: 47, y: 28, latencyNocdn: 90, latencyCdn: 8 },
  { name: 'Frankfurt', x: 50, y: 30, latencyNocdn: 100, latencyCdn: 10 },
  { name: 'Sao Paulo', x: 32, y: 68, latencyNocdn: 180, latencyCdn: 22 },
  { name: 'Singapore', x: 76, y: 55, latencyNocdn: 240, latencyCdn: 14 },
  { name: 'Cape Town', x: 52, y: 76, latencyNocdn: 260, latencyCdn: 25 },
  { name: 'Toronto', x: 25, y: 32, latencyNocdn: 30, latencyCdn: 5 },
  { name: 'Los Angeles', x: 14, y: 38, latencyNocdn: 80, latencyCdn: 10 },
  { name: 'Dubai', x: 60, y: 42, latencyNocdn: 210, latencyCdn: 16 },
  { name: 'Seoul', x: 80, y: 36, latencyNocdn: 210, latencyCdn: 11 },
]

const originServer = { name: 'Virginia (Origin)', x: 22, y: 36 }

/* ── CDN provider data ── */
const cdnProviders = [
  { name: 'Cloudflare', pops: '310+', free: true, edgeFn: 'Workers', highlight: 'Largest free tier, Anycast network' },
  { name: 'CloudFront', pops: '450+', free: false, edgeFn: 'Lambda@Edge', highlight: 'Deep AWS integration' },
  { name: 'Fastly', pops: '90+', free: false, edgeFn: 'Compute@Edge', highlight: 'Real-time purging, VCL config' },
  { name: 'Akamai', pops: '4000+', free: false, edgeFn: 'EdgeWorkers', highlight: 'Largest network, enterprise focus' },
]

/* ── Cache-Control directives ── */
const cacheDirectives = [
  { key: 'public', desc: 'Any cache (CDN, browser) can store this response.' },
  { key: 'private', desc: 'Only the user\'s browser can cache this. CDN must not store it.' },
  { key: 'no-cache', desc: 'Cache can store it but must revalidate with origin before serving.' },
  { key: 'no-store', desc: 'Never cache this response anywhere. Not CDN, not browser.' },
  { key: 'max-age=3600', desc: 'Cache is fresh for 3600 seconds (1 hour) in the browser.' },
  { key: 's-maxage=86400', desc: 'Shared caches (CDN) keep it for 86400 seconds (1 day).' },
  { key: 'must-revalidate', desc: 'Once stale, cache must revalidate before reuse. No serving stale content.' },
]

/* ── Edge function use cases ── */
const edgeUseCases = [
  {
    id: 'ab',
    title: 'A/B Testing',
    icon: Users,
    color: 'text-quest-primary',
    bg: 'bg-quest-primary/20',
    desc: 'Edge decides which variant to serve based on cookies or random assignment. Origin never involved.',
    flow: ['User request', 'Edge reads cookie', 'Serves variant A or B', 'Response (no origin hit)'],
  },
  {
    id: 'geo',
    title: 'Geo-Routing',
    icon: MapPin,
    color: 'text-quest-secondary',
    bg: 'bg-quest-secondary/20',
    desc: 'Edge detects user location and redirects to the nearest regional service or localized content.',
    flow: ['User request', 'Edge detects country', 'Redirects to regional URL', 'Localized response'],
  },
  {
    id: 'auth',
    title: 'Auth Validation',
    icon: Shield,
    color: 'text-quest-warning',
    bg: 'bg-quest-warning/20',
    desc: 'JWT tokens verified at the edge. Invalid requests rejected before they ever reach your servers.',
    flow: ['User request + JWT', 'Edge validates token', 'Invalid? 401 immediately', 'Valid? Forward to origin'],
  },
  {
    id: 'image',
    title: 'Image Optimization',
    icon: Image,
    color: 'text-quest-success',
    bg: 'bg-quest-success/20',
    desc: 'Edge resizes, compresses, and converts images on the fly based on device and connection speed.',
    flow: ['Request for image', 'Edge checks device hints', 'Resizes + converts to WebP', 'Optimized response'],
  },
  {
    id: 'bot',
    title: 'Bot Detection',
    icon: Bot,
    color: 'text-quest-danger',
    bg: 'bg-quest-danger/20',
    desc: 'Suspicious traffic analyzed and blocked at the edge. Bots never consume origin resources.',
    flow: ['Incoming request', 'Edge analyzes fingerprint', 'Bot? Block + CAPTCHA', 'Human? Pass through'],
  },
]

/* ── Edge computing comparison ── */
const edgePlatforms = [
  { name: 'Cloudflare Workers', runtime: 'V8 Isolates', coldStart: '0 ms', regions: '310+', limit: '128 MB' },
  { name: 'Lambda@Edge', runtime: 'Node.js / Python', coldStart: '~50-200 ms', regions: '450+', limit: '10 s exec' },
  { name: 'Vercel Edge Functions', runtime: 'V8 (Edge Runtime)', coldStart: '0 ms', regions: '30+', limit: '25 ms CPU' },
  { name: 'Deno Deploy', runtime: 'Deno / V8', coldStart: '0 ms', regions: '35+', limit: '50 ms CPU' },
]

export default function Level21({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* Intro state */
  const [selectedCity, setSelectedCity] = useState(null)
  const [cdnEnabled, setCdnEnabled] = useState(false)
  const [animatingRequest, setAnimatingRequest] = useState(false)
  const [requestProgress, setRequestProgress] = useState(0)
  const [latencyReductions, setLatencyReductions] = useState([])

  /* How section state */
  const [cacheMode, setCacheMode] = useState('miss') // 'miss' | 'hit'
  const [flowStep, setFlowStep] = useState(0)
  const [flowPlaying, setFlowPlaying] = useState(false)

  /* Caching section state */
  const [activeDirectives, setActiveDirectives] = useState([])
  const [purgeMode, setPurgeMode] = useState(null) // null | 'url' | 'tag' | 'all'
  const [purgedNodes, setPurgedNodes] = useState(new Set())
  const [purging, setPurging] = useState(false)

  /* Edge section state */
  const [activeUseCase, setActiveUseCase] = useState(null)

  const sections = ['intro', 'how', 'caching', 'edge', 'quiz']

  /* ── Intro animation ── */
  const animateRequest = useCallback((city) => {
    if (animatingRequest) return
    setSelectedCity(city)
    setAnimatingRequest(true)
    setRequestProgress(0)
    const duration = cdnEnabled ? 600 : 2000
    const startTime = Date.now()
    const step = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setRequestProgress(progress)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setAnimatingRequest(false)
        if (!latencyReductions.find(l => l.name === city.name)) {
          setLatencyReductions(prev => [...prev, {
            name: city.name,
            without: city.latencyNocdn,
            with: city.latencyCdn,
            saved: city.latencyNocdn - city.latencyCdn
          }])
        }
      }
    }
    requestAnimationFrame(step)
  }, [animatingRequest, cdnEnabled, latencyReductions])

  /* ── Flow animation ── */
  const missSteps = [
    { label: 'User requests image.jpg', icon: Globe, color: 'text-sky-400' },
    { label: 'DNS resolves to nearest CDN edge', icon: MapPin, color: 'text-blue-400' },
    { label: 'Edge checks cache... MISS!', icon: RefreshCw, color: 'text-yellow-400' },
    { label: 'Edge fetches from origin server', icon: Server, color: 'text-orange-400' },
    { label: 'Origin responds, edge caches it', icon: Cloud, color: 'text-green-400' },
    { label: 'Edge serves response to user', icon: Zap, color: 'text-emerald-400' },
  ]
  const hitSteps = [
    { label: 'User requests image.jpg', icon: Globe, color: 'text-sky-400' },
    { label: 'DNS resolves to nearest CDN edge', icon: MapPin, color: 'text-blue-400' },
    { label: 'Edge checks cache... HIT!', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Serves cached content instantly', icon: Zap, color: 'text-emerald-400' },
  ]
  const currentFlowSteps = cacheMode === 'miss' ? missSteps : hitSteps

  useEffect(() => {
    if (!flowPlaying) return
    if (flowStep >= currentFlowSteps.length - 1) {
      setFlowPlaying(false)
      return
    }
    const timer = setTimeout(() => setFlowStep(s => s + 1), 900)
    return () => clearTimeout(timer)
  }, [flowPlaying, flowStep, currentFlowSteps.length])

  const startFlow = () => {
    setFlowStep(0)
    setFlowPlaying(true)
  }

  /* ── Purge animation ── */
  const startPurge = (mode) => {
    setPurgeMode(mode)
    setPurgedNodes(new Set())
    setPurging(true)

    const totalNodes = 50
    const nodesToPurge = mode === 'url' ? 5 : mode === 'tag' ? 15 : totalNodes
    const indices = []
    if (mode === 'all') {
      for (let i = 0; i < totalNodes; i++) indices.push(i)
    } else {
      const pool = Array.from({ length: totalNodes }, (_, i) => i)
      for (let n = 0; n < nodesToPurge; n++) {
        const pick = Math.floor(Math.random() * pool.length)
        indices.push(pool.splice(pick, 1)[0])
      }
      indices.sort((a, b) => a - b)
    }

    let i = 0
    const wave = () => {
      if (i >= indices.length) { setPurging(false); return }
      const batch = indices.slice(i, i + 3)
      setPurgedNodes(prev => {
        const next = new Set(prev)
        batch.forEach(b => next.add(b))
        return next
      })
      i += 3
      setTimeout(wave, 80)
    }
    wave()
  }

  /* ── Cache header builder ── */
  const toggleDirective = (key) => {
    setActiveDirectives(prev =>
      prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key]
    )
  }

  const headerString = activeDirectives.length > 0
    ? `Cache-Control: ${activeDirectives.join(', ')}`
    : 'Cache-Control: (none selected)'

  const headerExplanation = () => {
    if (activeDirectives.length === 0) return 'Select directives above to build a Cache-Control header.'
    const parts = activeDirectives.map(d => {
      const found = cacheDirectives.find(c => c.key === d)
      return found ? found.desc : ''
    })
    return parts.join(' ')
  }

  /* ── Quiz ── */
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is a Point of Presence (PoP) in a CDN?',
      options: [
        { id: 'a', text: 'A data center location where CDN servers are deployed, bringing cached content closer to end users', correct: true },
        { id: 'b', text: 'The main origin server where all content is stored permanently', correct: false },
        { id: 'c', text: 'A protocol used to transfer files between CDN nodes', correct: false },
        { id: 'd', text: 'A type of DNS record used for load balancing', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'What happens on a CDN cache miss?',
      options: [
        { id: 'a', text: 'The request is dropped and the user sees an error page', correct: false },
        { id: 'b', text: 'The edge server fetches the content from the origin server, caches it, and serves it to the user', correct: true },
        { id: 'c', text: 'The CDN redirects the user directly to the origin server', correct: false },
        { id: 'd', text: 'The content is served from the user\'s browser cache instead', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'What does Cache-Control: no-store mean?',
      options: [
        { id: 'a', text: 'The cache stores it but revalidates every time', correct: false },
        { id: 'b', text: 'Only the browser can cache the response, not the CDN', correct: false },
        { id: 'c', text: 'The response must never be cached anywhere \u2014 not at the CDN edge, not in the browser', correct: true },
        { id: 'd', text: 'The response is cached for a default TTL of 60 seconds', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'What is the main advantage of Edge Functions?',
      options: [
        { id: 'a', text: 'They make the origin server faster by upgrading its hardware', correct: false },
        { id: 'b', text: 'Code runs at the CDN edge closest to the user, reducing latency by avoiding round trips to the origin server', correct: true },
        { id: 'c', text: 'They eliminate the need for a CDN entirely', correct: false },
        { id: 'd', text: 'They automatically compress all images to reduce file size', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const totalSaved = latencyReductions.reduce((sum, l) => sum + l.saved, 0)

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
                ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION: INTRO ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="text-sky-400" />
              The Global Latency Problem
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Users in Australia complain about 3-second load times. Your server is in Virginia.
                Every request crosses the entire Pacific Ocean and back. There has to be a better way."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term
                word="CDN"
                definition="Content Delivery Network. A distributed network of servers that caches and delivers content from locations geographically close to users, reducing latency dramatically."
                onLearn={learnTerm}
              />{' '}
              solves this by placing copies of your content at{' '}
              <Term
                word="PoP"
                definition="Point of Presence. A physical data center location within a CDN network where edge servers are deployed. Major CDNs have hundreds of PoPs worldwide."
                onLearn={learnTerm}
              />{' '}
              locations all over the world. Instead of every request traveling to Virginia,
              users hit the nearest edge server.
            </p>

            {/* ── World Map ── */}
            <div className="bg-quest-bg rounded-xl p-4 mb-4 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-quest-muted">Interactive World Map</span>
                <button
                  onClick={() => setCdnEnabled(!cdnEnabled)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all
                    ${cdnEnabled ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'bg-quest-surface text-quest-muted border border-white/10'}`}
                >
                  {cdnEnabled ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                  CDN {cdnEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Simplified world map area */}
              <div className="relative w-full" style={{ paddingBottom: '50%' }}>
                {/* Map background with continents (CSS shapes) */}
                <div className="absolute inset-0 rounded-lg overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #0c1222 0%, #1a2744 100%)' }}>

                  {/* Continent outlines as abstract blobs */}
                  <div className="absolute rounded-full bg-white/5"
                    style={{ left: '8%', top: '20%', width: '22%', height: '50%', borderRadius: '30% 60% 40% 50%' }} />
                  <div className="absolute rounded-full bg-white/5"
                    style={{ left: '38%', top: '12%', width: '25%', height: '45%', borderRadius: '50% 30% 60% 40%' }} />
                  <div className="absolute rounded-full bg-white/5"
                    style={{ left: '42%', top: '50%', width: '15%', height: '35%', borderRadius: '40% 50% 30% 60%' }} />
                  <div className="absolute rounded-full bg-white/5"
                    style={{ left: '58%', top: '15%', width: '28%', height: '50%', borderRadius: '50% 40% 30% 50%' }} />
                  <div className="absolute rounded-full bg-white/5"
                    style={{ left: '80%', top: '55%', width: '15%', height: '25%', borderRadius: '40% 50% 30% 60%' }} />

                  {/* Origin server in Virginia */}
                  <motion.div
                    className="absolute z-20 flex flex-col items-center"
                    style={{ left: `${originServer.x}%`, top: `${originServer.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-5 h-5 rounded-full bg-red-500 border-2 border-red-300 shadow-lg shadow-red-500/50"
                    />
                    <span className="text-[9px] text-red-300 mt-1 font-medium whitespace-nowrap">Origin</span>
                  </motion.div>

                  {/* CDN PoPs (only visible when CDN enabled) */}
                  <AnimatePresence>
                    {cdnEnabled && cities.map((city, i) => (
                      <motion.div
                        key={`pop-${city.name}`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="absolute z-10"
                        style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80 shadow-md shadow-green-400/40" />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* City dots (clickable) */}
                  {cities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => animateRequest(city)}
                      disabled={animatingRequest}
                      className="absolute z-30 group"
                      style={{ left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      <div className={`w-3 h-3 rounded-full border-2 transition-all
                        ${selectedCity?.name === city.name
                          ? 'bg-sky-400 border-sky-300 scale-150'
                          : 'bg-blue-400/70 border-blue-300/50 hover:bg-sky-400 hover:border-sky-300 hover:scale-125'}`}
                      />
                      <span className="absolute left-1/2 -translate-x-1/2 -top-5 text-[9px] text-sky-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium">
                        {city.name}
                      </span>
                    </button>
                  ))}

                  {/* Animated request line */}
                  {selectedCity && animatingRequest && (
                    <svg className="absolute inset-0 w-full h-full z-15 pointer-events-none">
                      <line
                        x1={`${selectedCity.x}%`} y1={`${selectedCity.y}%`}
                        x2={cdnEnabled ? `${selectedCity.x + (selectedCity.x > 50 ? -3 : 3)}%` : `${originServer.x}%`}
                        y2={cdnEnabled ? `${selectedCity.y + (selectedCity.y > 50 ? -3 : 3)}%` : `${originServer.y}%`}
                        stroke={cdnEnabled ? '#22c55e' : '#f59e0b'}
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        opacity={0.7}
                      />
                      <motion.circle
                        cx={`${selectedCity.x}%`} cy={`${selectedCity.y}%`}
                        r="4"
                        fill={cdnEnabled ? '#22c55e' : '#f59e0b'}
                        animate={{
                          cx: cdnEnabled
                            ? [`${selectedCity.x}%`, `${selectedCity.x + (selectedCity.x > 50 ? -3 : 3)}%`]
                            : [`${selectedCity.x}%`, `${originServer.x}%`],
                          cy: cdnEnabled
                            ? [`${selectedCity.y}%`, `${selectedCity.y + (selectedCity.y > 50 ? -3 : 3)}%`]
                            : [`${selectedCity.y}%`, `${originServer.y}%`],
                        }}
                        transition={{ duration: cdnEnabled ? 0.3 : 1.2, ease: 'linear' }}
                      />
                    </svg>
                  )}
                </div>
              </div>

              {/* Latency result */}
              <AnimatePresence>
                {selectedCity && !animatingRequest && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 p-3 rounded-lg bg-quest-surface border border-white/10 text-center"
                  >
                    <span className="text-sm text-quest-muted">{selectedCity.name} latency: </span>
                    <span className={`font-bold text-lg ${cdnEnabled ? 'text-green-400' : 'text-yellow-400'}`}>
                      {cdnEnabled ? selectedCity.latencyCdn : selectedCity.latencyNocdn} ms
                    </span>
                    {cdnEnabled && (
                      <span className="text-xs text-green-400 ml-2">
                        ({Math.round((1 - selectedCity.latencyCdn / selectedCity.latencyNocdn) * 100)}% faster!)
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-xs text-quest-muted mt-2 text-center">
                Click any city dot to simulate a request. Toggle CDN to compare.
              </p>
            </div>

            {/* Latency reduction bar chart */}
            {latencyReductions.length > 0 && (
              <div className="bg-quest-surface rounded-xl p-5 mb-4">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Zap size={16} className="text-sky-400" />
                  Latency Reduction Summary
                  <span className="ml-auto text-xs text-green-400">Total saved: {totalSaved} ms</span>
                </h4>
                <div className="space-y-2">
                  {latencyReductions.map((l) => (
                    <div key={l.name} className="flex items-center gap-3 text-xs">
                      <span className="w-20 text-quest-muted text-right">{l.name}</span>
                      <div className="flex-1 flex items-center gap-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(l.without / 300) * 100}%` }}
                          className="h-4 bg-yellow-500/40 rounded-sm flex items-center justify-end pr-1"
                        >
                          <span className="text-[10px] text-yellow-300">{l.without}ms</span>
                        </motion.div>
                      </div>
                      <div className="flex-1 flex items-center gap-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(l.with / 300) * 100}%` }}
                          transition={{ delay: 0.3 }}
                          className="h-4 bg-green-500/40 rounded-sm flex items-center justify-end pr-1"
                        >
                          <span className="text-[10px] text-green-300">{l.with}ms</span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 text-[10px] text-quest-muted mt-1">
                    <span className="w-20" />
                    <div className="flex-1 flex items-center gap-1">
                      <div className="w-3 h-2 bg-yellow-500/40 rounded-sm" /> Without CDN
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                      <div className="w-3 h-2 bg-green-500/40 rounded-sm" /> With CDN
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DeepDive id="how-cdns-work" title="How CDNs Actually Work (Anycast, DNS-Based, BGP)" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Anycast Routing:</strong> Multiple servers share the same IP address.
                  Network routers automatically send traffic to the closest server. Cloudflare uses this.
                  It is why their DNS is 1.1.1.1 everywhere in the world but you always hit the closest node.
                </p>
                <p>
                  <strong className="text-quest-text">DNS-Based Routing:</strong> CDN's authoritative DNS server returns
                  different IP addresses based on the requester's location. CloudFront and Akamai rely heavily on this.
                </p>
                <p>
                  <strong className="text-quest-text">BGP (Border Gateway Protocol):</strong> The internet's routing protocol.
                  Anycast CDNs advertise the same IP prefix from many locations. BGP ensures traffic takes the shortest
                  network path, which usually means the geographically closest PoP.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                How CDNs Work
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION: HOW ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="text-blue-400" />
              CDN Request Flow
            </h2>

            <p className="text-quest-muted mb-6">
              Understanding the difference between a cache <strong className="text-green-400">HIT</strong> and
              a cache <strong className="text-yellow-400">MISS</strong> is fundamental to how CDNs work.
              A well-configured CDN achieves <strong>90-99%</strong> cache hit ratios.
            </p>

            {/* Toggle cache mode */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => { setCacheMode('miss'); setFlowStep(0); setFlowPlaying(false) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border
                  ${cacheMode === 'miss' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' : 'border-white/10 text-quest-muted hover:border-white/20'}`}
              >
                First Request (Cache Miss)
              </button>
              <button
                onClick={() => { setCacheMode('hit'); setFlowStep(0); setFlowPlaying(false) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border
                  ${cacheMode === 'hit' ? 'bg-green-500/20 border-green-500/50 text-green-300' : 'border-white/10 text-quest-muted hover:border-white/20'}`}
              >
                Subsequent Request (Cache Hit)
              </button>
            </div>

            {/* Flow steps */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-quest-muted">
                  {cacheMode === 'miss' ? 'Cache MISS flow (slower, fetches from origin)' : 'Cache HIT flow (fast, served from edge)'}
                </span>
                <button
                  onClick={startFlow}
                  disabled={flowPlaying}
                  className="px-3 py-1 rounded text-xs bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 transition-colors disabled:opacity-50"
                >
                  {flowPlaying ? 'Playing...' : 'Play Animation'}
                </button>
              </div>

              <div className="space-y-3">
                {currentFlowSteps.map((step, i) => {
                  const StepIcon = step.icon
                  const isActive = i <= flowStep
                  return (
                    <motion.div
                      key={`${cacheMode}-${i}`}
                      initial={{ opacity: 0.3, x: -10 }}
                      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors
                        ${isActive ? 'bg-quest-surface border border-white/10' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${isActive ? 'bg-quest-surface' : 'bg-quest-bg'}`}>
                        <StepIcon size={16} className={isActive ? step.color : 'text-quest-muted'} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isActive ? step.color : 'text-quest-muted'}`}>
                          {i + 1}.
                        </span>
                        <span className={`text-sm ${isActive ? 'text-quest-text' : 'text-quest-muted'}`}>
                          {step.label}
                        </span>
                      </div>
                      {isActive && i === flowStep && (
                        <motion.div
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="ml-auto w-2 h-2 rounded-full bg-sky-400"
                        />
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Cache hit ratio */}
              <div className="mt-5 p-3 bg-quest-surface rounded-lg border border-white/5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-quest-muted">Typical Cache Hit Ratio</span>
                  <span className="text-green-400 font-bold">95%</span>
                </div>
                <div className="w-full h-3 bg-quest-bg rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-quest-muted mt-1">
                  95 out of 100 requests served from edge without touching origin
                </p>
              </div>
            </div>

            {/* CDN Providers comparison */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Cloud size={18} className="text-sky-400" />
              <Term
                word="Cloudflare"
                definition="A major CDN and web security company. Known for its generous free tier, Anycast network, and Workers edge computing platform. 310+ PoPs globally."
                onLearn={learnTerm}
              />{' '}
              vs{' '}
              <Term
                word="CloudFront"
                definition="Amazon Web Services' CDN service. Deeply integrated with S3, EC2, and other AWS services. 450+ PoPs. Used by many AWS-hosted applications."
                onLearn={learnTerm}
              />{' '}
              and Others
            </h3>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {cdnProviders.map((provider) => (
                <div key={provider.name} className="bg-quest-surface rounded-lg p-4 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm">{provider.name}</h4>
                    {provider.free && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                        Free tier
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-quest-muted mb-2">
                    <div><span className="text-quest-text">PoPs:</span> {provider.pops}</div>
                    <div><span className="text-quest-text">Edge:</span> {provider.edgeFn}</div>
                  </div>
                  <p className="text-[11px] text-sky-300/70">{provider.highlight}</p>
                </div>
              ))}
            </div>

            <DeepDive id="pull-vs-push" title="Pull vs Push CDN" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Pull CDN (Origin-Pull):</strong> Edge servers fetch content
                  from your origin on the first request (cache miss), then cache it. This is the most common model.
                  Cloudflare, CloudFront (for dynamic origins), and most CDNs use this.
                  Advantage: no pre-work needed. Disadvantage: first visitor to each PoP gets a slow response.
                </p>
                <p>
                  <strong className="text-quest-text">Push CDN:</strong> You explicitly upload content to the CDN
                  before users request it. Think S3 + CloudFront for static assets.
                  Advantage: no cache-miss penalty. Disadvantage: you manage what is pushed and when.
                </p>
                <p>
                  Most real-world setups use a hybrid: push for critical static assets (CSS, JS bundles),
                  pull for everything else (images, API responses).
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Cache Control
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION: CACHING ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-blue-400" />
              Cache Control Headers
            </h2>

            <p className="text-quest-muted mb-6">
              <Term
                word="Cache Headers"
                definition="HTTP headers (primarily Cache-Control) that tell CDNs and browsers how long to cache content, whether to cache at all, and when to revalidate. They are the primary mechanism for controlling CDN behavior."
                onLearn={learnTerm}
              />{' '}
              are how you tell CDNs and browsers exactly what to cache and for how long.
              Getting these right is the difference between a fast site and a broken one.
            </p>

            {/* Interactive header builder */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4">Interactive Header Builder</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {cacheDirectives.map((d) => (
                  <button
                    key={d.key}
                    onClick={() => toggleDirective(d.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border
                      ${activeDirectives.includes(d.key)
                        ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                        : 'bg-quest-surface border-white/10 text-quest-muted hover:border-white/20'}`}
                  >
                    {d.key}
                  </button>
                ))}
              </div>

              {/* Resulting header */}
              <div className="bg-quest-surface rounded-lg p-4 font-mono text-sm mb-3 border border-white/5">
                <span className="text-quest-muted select-all">{headerString}</span>
              </div>

              {/* Plain English explanation */}
              <div className="bg-quest-surface/50 rounded-lg p-3 border border-sky-500/20">
                <p className="text-xs text-quest-muted leading-relaxed">
                  <span className="text-sky-400 font-medium">Plain English: </span>
                  {headerExplanation()}
                </p>
              </div>

              {/* Timeline visualization */}
              {activeDirectives.some(d => d.includes('max-age') || d.includes('s-maxage')) && (
                <div className="mt-4 p-3 bg-quest-surface rounded-lg border border-white/5">
                  <p className="text-xs text-quest-muted mb-2">Cache Timeline</p>
                  <div className="relative h-8 bg-quest-bg rounded-full overflow-hidden">
                    {activeDirectives.includes('max-age=3600') && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '50%' }}
                        className="absolute left-0 top-0 h-full bg-blue-500/30 border-r-2 border-blue-400 flex items-center justify-center"
                      >
                        <span className="text-[10px] text-blue-300">Browser: 1 hr</span>
                      </motion.div>
                    )}
                    {activeDirectives.includes('s-maxage=86400') && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.3 }}
                        className="absolute left-0 top-0 h-full bg-green-500/20 border-r-2 border-green-400 flex items-center justify-end pr-2"
                      >
                        <span className="text-[10px] text-green-300">CDN: 24 hrs</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Purging Visualization ── */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Trash2 size={18} className="text-red-400" />
              <Term
                word="Purging"
                definition="The process of removing cached content from CDN edge servers before its TTL expires. Necessary when content changes and users must see the update immediately. Can be done by URL, cache tag, or purging everything."
                onLearn={learnTerm}
              />{' '}
              — Cache Invalidation
            </h3>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm text-quest-muted mb-4">
                Your content is cached across 50 edge nodes worldwide. When you update something,
                how do you clear the old version?
              </p>

              {/* Edge node grid */}
              <div className="grid grid-cols-10 gap-1.5 mb-4">
                {Array.from({ length: 50 }, (_, i) => (
                  <motion.div
                    key={i}
                    animate={purgedNodes.has(i) ? { scale: [1, 1.3, 0.9], backgroundColor: '#ef444480' } : {}}
                    className={`w-full aspect-square rounded-sm transition-colors duration-300
                      ${purgedNodes.has(i) ? 'bg-red-500/50' : 'bg-green-500/40'}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 text-[10px] text-quest-muted mb-4">
                <div className="flex items-center gap-1"><div className="w-3 h-2 bg-green-500/40 rounded-sm" /> Cached</div>
                <div className="flex items-center gap-1"><div className="w-3 h-2 bg-red-500/50 rounded-sm" /> Purged</div>
              </div>

              {/* Purge strategies */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => startPurge('url')}
                  disabled={purging}
                  className="p-3 rounded-lg bg-quest-surface border border-white/10 hover:border-red-500/30 transition-all text-center disabled:opacity-50"
                >
                  <p className="text-xs font-medium mb-1">Purge by URL</p>
                  <p className="text-[10px] text-quest-muted">Targeted: 1 file</p>
                </button>
                <button
                  onClick={() => startPurge('tag')}
                  disabled={purging}
                  className="p-3 rounded-lg bg-quest-surface border border-white/10 hover:border-orange-500/30 transition-all text-center disabled:opacity-50"
                >
                  <p className="text-xs font-medium mb-1">Purge by Tag</p>
                  <p className="text-[10px] text-quest-muted">Group: related files</p>
                </button>
                <button
                  onClick={() => startPurge('all')}
                  disabled={purging}
                  className="p-3 rounded-lg bg-quest-surface border border-white/10 hover:border-red-500/50 transition-all text-center disabled:opacity-50"
                >
                  <p className="text-xs font-medium mb-1">Purge Everything</p>
                  <p className="text-[10px] text-quest-muted">Nuclear: all cache</p>
                </button>
              </div>
            </div>

            {/* Invalidation strategies */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Cache Invalidation Strategies</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-quest-bg rounded-lg p-3">
                  <p className="text-xs font-medium text-sky-400 mb-1">TTL-Based</p>
                  <p className="text-[11px] text-quest-muted">
                    Set max-age / s-maxage. Content expires automatically. Simple but not instant.
                  </p>
                  <code className="text-[10px] text-quest-muted mt-1 block font-mono">max-age=3600</code>
                </div>
                <div className="bg-quest-bg rounded-lg p-3">
                  <p className="text-xs font-medium text-green-400 mb-1">Event-Based</p>
                  <p className="text-[11px] text-quest-muted">
                    Purge via API when content changes. Immediate but requires integration.
                  </p>
                  <code className="text-[10px] text-quest-muted mt-1 block font-mono">POST /purge {"{ url }"}</code>
                </div>
                <div className="bg-quest-bg rounded-lg p-3">
                  <p className="text-xs font-medium text-purple-400 mb-1">Versioned URLs</p>
                  <p className="text-[11px] text-quest-muted">
                    Change the filename on deploy. Old URL stays cached, new URL fetched fresh.
                  </p>
                  <code className="text-[10px] text-quest-muted mt-1 block font-mono">style.v2.css</code>
                </div>
              </div>
            </div>

            <DeepDive id="cache-invalidation-hard" title="Cache Invalidation is Hard" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p className="italic border-l-2 border-sky-500/50 pl-3">
                  "There are only two hard things in Computer Science: cache invalidation and naming things."
                  <br />
                  <span className="text-xs">— Phil Karlton</span>
                </p>
                <p>
                  <strong className="text-quest-text">Stale-While-Revalidate:</strong> A modern approach where the
                  CDN serves stale content immediately while fetching a fresh copy in the background. Users get
                  instant responses, and the cache refreshes transparently. Header:
                  <code className="text-xs ml-1 font-mono">stale-while-revalidate=60</code>.
                </p>
                <p>
                  <strong className="text-quest-text">Cache Stampede (Thundering Herd):</strong> When a popular
                  cached item expires, hundreds of concurrent requests all miss cache and hit origin simultaneously.
                  Solutions: request coalescing (only one request to origin, others wait), lock-based revalidation,
                  or probabilistic early expiration.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Edge Computing
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION: EDGE ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-blue-400" />
              Edge Functions — Code at the Edge
            </h2>

            <p className="text-quest-muted mb-6">
              CDNs started as dumb caches. With{' '}
              <Term
                word="Edge Computing"
                definition="A computing paradigm where data processing happens at or near the source of data (the CDN edge), rather than in a centralized data center. Reduces latency by running logic closer to users."
                onLearn={learnTerm}
              />{' '}
              and{' '}
              <Term
                word="Edge Functions"
                definition="Small pieces of code (JavaScript/TypeScript) that run on CDN edge servers instead of a centralized origin. They intercept requests and can modify responses, handle auth, do A/B testing, and more — all with near-zero latency."
                onLearn={learnTerm}
              />
              , they became programmable. You can run real code right at the edge, milliseconds from your users.
            </p>

            {/* Traditional vs Edge flow */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
                <h4 className="text-sm font-semibold mb-3 text-yellow-400">Traditional Flow</h4>
                <div className="space-y-2">
                  {['User request', 'Travels to origin', 'Server processes logic', 'Response travels back'].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-[10px] text-yellow-400 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-xs text-quest-muted">{step}</span>
                      {i < 3 && <ArrowRight size={12} className="text-yellow-500/30 ml-auto" />}
                    </div>
                  ))}
                  <div className="text-center mt-2 pt-2 border-t border-white/5">
                    <span className="text-xs text-yellow-400">~200-400ms round trip</span>
                  </div>
                </div>
              </div>

              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <h4 className="text-sm font-semibold mb-3 text-green-400">Edge Function Flow</h4>
                <div className="space-y-2">
                  {['User request', 'Hits nearest edge', 'Edge function runs', 'Response (origin never touched)'].map((step, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-[10px] text-green-400 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-xs text-quest-muted">{step}</span>
                      {i < 3 && <ArrowRight size={12} className="text-green-500/30 ml-auto" />}
                    </div>
                  ))}
                  <div className="text-center mt-2 pt-2 border-t border-white/5">
                    <span className="text-xs text-green-400">~5-20ms round trip</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Use case scenario cards */}
            <h3 className="font-semibold mb-3">Edge Function Use Cases</h3>
            <p className="text-sm text-quest-muted mb-4">
              Click each card to see the animated request flow for that scenario.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {edgeUseCases.map((uc) => {
                const Icon = uc.icon
                const isActive = activeUseCase === uc.id
                return (
                  <motion.button
                    key={uc.id}
                    onClick={() => setActiveUseCase(isActive ? null : uc.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`text-left p-4 rounded-xl border transition-all
                      ${isActive
                        ? 'bg-quest-surface border-sky-500/40 ring-1 ring-sky-500/20'
                        : 'bg-quest-bg border-white/5 hover:border-white/15'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${uc.bg} flex items-center justify-center`}>
                        <Icon size={16} className={uc.color} />
                      </div>
                      <h4 className="text-sm font-semibold">{uc.title}</h4>
                    </div>
                    <p className="text-[11px] text-quest-muted leading-relaxed">{uc.desc}</p>
                  </motion.button>
                )
              })}
            </div>

            {/* Active use case flow */}
            <AnimatePresence mode="wait">
              {activeUseCase && (
                <motion.div
                  key={activeUseCase}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-sky-500/20">
                    <h4 className="text-sm font-semibold mb-3 text-sky-400">
                      {edgeUseCases.find(u => u.id === activeUseCase)?.title} — Request Flow
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      {edgeUseCases.find(u => u.id === activeUseCase)?.flow.map((step, i, arr) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-center gap-2"
                        >
                          <div className="px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-xs text-quest-text">
                            {step}
                          </div>
                          {i < arr.length - 1 && (
                            <ArrowRight size={14} className="text-sky-400/50 flex-shrink-0" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Edge platform comparison */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Edge Platform Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Platform</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Runtime</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Cold Start</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Regions</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Limits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {edgePlatforms.map((p) => (
                      <tr key={p.name} className="border-b border-white/5">
                        <td className="py-2 px-3 font-medium text-quest-text">{p.name}</td>
                        <td className="py-2 px-3 text-quest-muted">{p.runtime}</td>
                        <td className="py-2 px-3">
                          <span className={p.coldStart === '0 ms' ? 'text-green-400' : 'text-yellow-400'}>
                            {p.coldStart}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-quest-muted">{p.regions}</td>
                        <td className="py-2 px-3 text-quest-muted">{p.limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <DeepDive id="edge-revolution" title="The Edge Computing Revolution" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Trend:</strong> Computing is moving from centralized data
                  centers to the edge. Cloudflare Workers launched in 2017 and changed the game: run JavaScript
                  on 310+ locations globally with zero cold starts using V8 isolates instead of containers.
                </p>
                <p>
                  <strong className="text-quest-text">Limitations:</strong> Edge functions have constraints.
                  Limited CPU time (usually 10-50ms), no persistent local storage, restricted runtime APIs.
                  You cannot run a database at the edge (though projects like Cloudflare D1 and Turso are trying).
                  Heavy computation still belongs on the origin.
                </p>
                <p>
                  <strong className="text-quest-text">Cold Starts:</strong> V8 isolate-based platforms (Cloudflare, Vercel, Deno)
                  have near-zero cold starts because isolates spin up in microseconds. Container-based platforms
                  (Lambda@Edge) can have 50-200ms cold starts. This matters for latency-sensitive workloads.
                </p>
                <p>
                  <strong className="text-quest-text">The Future:</strong> Edge databases (D1, Turso, PlanetScale),
                  edge-native frameworks (Remix, Next.js middleware), and AI inference at the edge are pushing
                  what is possible. We are moving toward a world where most compute happens within 50ms of the user.
                </p>
              </div>
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

      {/* ═══════════════════ SECTION: QUIZ ═══════════════════ */}
      {currentSection === 4 && (
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
              CDNs and edge computing are foundational to modern web performance. Let's verify your understanding.
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
                <h3 className="text-xl font-bold mb-2">Level 21 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand CDNs, edge caching, cache control headers, and edge computing.
                  Your users in Australia will thank you for those sub-50ms load times!
                </p>
                <p className="text-sm text-sky-400">
                  You have reached the Edge of the World. Content flies at the speed of light.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

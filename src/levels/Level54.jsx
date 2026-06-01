import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Car, MapPin, Navigation, Clock, DollarSign, Users,
  ArrowRight, Zap, Server, Globe, Shield
} from 'lucide-react'

/* ── Shared helper components ── */

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

const GRID_SIZE = 16
const RIDER_COUNT = 8
const DRIVER_COUNT = 12

const SURGE_ZONES = [
  { name: 'Downtown', cx: 4, cy: 4, radius: 3, demand: 0.9, supply: 0.3, multiplier: 2.8 },
  { name: 'Airport', cx: 13, cy: 2, radius: 2, demand: 0.7, supply: 0.4, multiplier: 2.1 },
  { name: 'Stadium', cx: 10, cy: 12, radius: 2, demand: 0.8, supply: 0.2, multiplier: 3.2 },
  { name: 'Suburbs', cx: 2, cy: 12, radius: 3, demand: 0.2, supply: 0.7, multiplier: 1.0 },
  { name: 'Tech Park', cx: 12, cy: 7, radius: 2, demand: 0.5, supply: 0.5, multiplier: 1.3 },
]

const ARCH_SERVICES = [
  { id: 'ride', name: 'Ride Service', icon: Car, color: 'text-blue-400', bg: 'bg-blue-500/20',
    desc: 'Orchestrates ride lifecycle: request, matching, in-progress, complete.' },
  { id: 'match', name: 'Matching Engine', icon: Navigation, color: 'text-green-400', bg: 'bg-green-500/20',
    desc: 'Finds optimal driver for each rider using proximity + ETA + rating.' },
  { id: 'location', name: 'Location Service', icon: MapPin, color: 'text-yellow-400', bg: 'bg-yellow-500/20',
    desc: 'Ingests millions of GPS pings/sec. Geospatial index for nearest-driver queries.' },
  { id: 'pricing', name: 'Pricing / Surge', icon: DollarSign, color: 'text-red-400', bg: 'bg-red-500/20',
    desc: 'Dynamic pricing based on supply-demand ratio per geofenced zone.' },
  { id: 'payment', name: 'Payment Service', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/20',
    desc: 'Pre-auth on request, final charge on completion. Handles splits, promos, refunds.' },
  { id: 'notify', name: 'Notification', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/20',
    desc: 'Push notifications + SMS for ride updates, ETA, receipts.' },
]

const ARCH_FLOW = [
  { from: 'ride', to: 'match', label: 'Find driver' },
  { from: 'match', to: 'location', label: 'Nearest drivers' },
  { from: 'location', to: 'match', label: 'Driver list' },
  { from: 'match', to: 'ride', label: 'Assigned driver' },
  { from: 'ride', to: 'pricing', label: 'Calculate fare' },
  { from: 'ride', to: 'payment', label: 'Charge rider' },
  { from: 'ride', to: 'notify', label: 'Push updates' },
]

const GEOHASH_LEVELS = [
  { precision: 1, cellKm: '5000 km', cells: 32, color: 'bg-red-500/30' },
  { precision: 2, cellKm: '1250 km', cells: 1024, color: 'bg-orange-500/30' },
  { precision: 3, cellKm: '156 km', cells: 32768, color: 'bg-yellow-500/30' },
  { precision: 4, cellKm: '39 km', cells: '1M', color: 'bg-green-500/30' },
  { precision: 5, cellKm: '5 km', cells: '33M', color: 'bg-blue-500/30' },
  { precision: 6, cellKm: '1.2 km', cells: '1B', color: 'bg-purple-500/30' },
]

const quizQuestions = [
  {
    id: 'q1',
    question: 'Which data structure is most efficient for finding all drivers within a 2km radius of a rider?',
    options: [
      { id: 'a', text: 'Binary search tree sorted by latitude', correct: false },
      { id: 'b', text: 'Geospatial index (Quadtree / Geohash + R-tree)', correct: true },
      { id: 'c', text: 'Hash map of driver IDs to coordinates', correct: false },
      { id: 'd', text: 'Linked list sorted by distance', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'How does the matching algorithm typically select the best driver for a ride request?',
    options: [
      { id: 'a', text: 'Always picks the closest driver by straight-line distance', correct: false },
      { id: 'b', text: 'Randomly selects from available drivers in the area', correct: false },
      { id: 'c', text: 'Scores candidates by ETA, distance, rating, acceptance rate, and supply zone', correct: true },
      { id: 'd', text: 'Assigns to whichever driver has been idle the longest', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What triggers surge pricing in a ride-sharing system?',
    options: [
      { id: 'a', text: 'When drivers collectively request higher fares', correct: false },
      { id: 'b', text: 'When the supply/demand ratio in a geofenced zone drops below a threshold', correct: true },
      { id: 'c', text: 'At fixed times like rush hour regardless of actual demand', correct: false },
      { id: 'd', text: 'When payment processing is slow', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Why does Uber use ETA (estimated time of arrival) rather than straight-line distance for matching?',
    options: [
      { id: 'a', text: 'Straight-line distance is too expensive to compute', correct: false },
      { id: 'b', text: 'ETA accounts for road network, traffic, and one-way streets that straight-line ignores', correct: true },
      { id: 'c', text: 'Riders prefer seeing time estimates over distance estimates', correct: false },
      { id: 'd', text: 'Distance calculations require GPS which is unreliable', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'How does a ride-sharing platform handle location updates from millions of drivers simultaneously?',
    options: [
      { id: 'a', text: 'Drivers poll a REST API every second for their assignment', correct: false },
      { id: 'b', text: 'All updates go through a single database with strong consistency', correct: false },
      { id: 'c', text: 'Location pings stream through a message queue (Kafka), partitioned by geo-region, into a spatial index', correct: true },
      { id: 'd', text: 'The app only sends location when the driver starts a trip', correct: false },
    ],
  },
]

/* ── Helpers ── */

function seedEntities(count, role) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${role}-${i}`,
    x: Math.random() * (GRID_SIZE - 1),
    y: Math.random() * (GRID_SIZE - 1),
    role,
    matched: false,
    matchedTo: null,
  }))
}

function dist(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

function getSurgeAt(x, y) {
  for (const zone of SURGE_ZONES) {
    const d = Math.sqrt((x - zone.cx) ** 2 + (y - zone.cy) ** 2)
    if (d <= zone.radius) return zone.multiplier
  }
  return 1.0
}

function getSurgeColor(mult) {
  if (mult >= 2.5) return 'bg-red-500/40 border-red-500/60'
  if (mult >= 1.5) return 'bg-orange-500/30 border-orange-500/50'
  if (mult > 1.0) return 'bg-yellow-500/20 border-yellow-500/40'
  return 'bg-green-500/15 border-green-500/30'
}

function getSurgeTextColor(mult) {
  if (mult >= 2.5) return 'text-red-400'
  if (mult >= 1.5) return 'text-orange-400'
  if (mult > 1.0) return 'text-yellow-400'
  return 'text-green-400'
}

/* ── Main Component ── */

export default function Level54({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Map simulation state
  const [riders, setRiders] = useState(() => seedEntities(RIDER_COUNT, 'rider'))
  const [drivers, setDrivers] = useState(() => seedEntities(DRIVER_COUNT, 'driver'))
  const [matchStep, setMatchStep] = useState(0)
  const [matchLog, setMatchLog] = useState([])
  const [isMatching, setIsMatching] = useState(false)

  // Geospatial viz
  const [geoDepth, setGeoDepth] = useState(2)
  const [highlightedCell, setHighlightedCell] = useState(null)

  // Surge pricing viz
  const [surgeEnabled, setSurgeEnabled] = useState(true)

  // Architecture explorer
  const [activeService, setActiveService] = useState(null)
  const [flowStep, setFlowStep] = useState(-1)
  const [isFlowPlaying, setIsFlowPlaying] = useState(false)

  // Quadtree viz
  const [quadSplitDepth, setQuadSplitDepth] = useState(0)

  // Run matching algorithm
  const runMatching = () => {
    setIsMatching(true)
    setMatchStep(0)
    setMatchLog([])

    const unmatchedRiders = riders.filter(r => !r.matched)
    const availableDrivers = [...drivers.filter(d => !d.matched)]
    const log = []
    const newRiders = [...riders]
    const newDrivers = [...drivers]

    let step = 0
    const interval = setInterval(() => {
      if (step >= unmatchedRiders.length || availableDrivers.length === 0) {
        clearInterval(interval)
        setIsMatching(false)
        return
      }

      const rider = unmatchedRiders[step]
      let bestDriver = null
      let bestDist = Infinity

      availableDrivers.forEach(d => {
        const distance = dist(rider, d)
        if (distance < bestDist) {
          bestDist = distance
          bestDriver = d
        }
      })

      if (bestDriver) {
        const rIdx = newRiders.findIndex(r => r.id === rider.id)
        const dIdx = newDrivers.findIndex(d => d.id === bestDriver.id)
        newRiders[rIdx] = { ...newRiders[rIdx], matched: true, matchedTo: bestDriver.id }
        newDrivers[dIdx] = { ...newDrivers[dIdx], matched: true, matchedTo: rider.id }

        const surgeMultiplier = getSurgeAt(rider.x, rider.y)
        const etaMin = Math.round(bestDist * 1.8 + Math.random() * 2)

        log.push({
          rider: rider.id,
          driver: bestDriver.id,
          dist: bestDist.toFixed(1),
          eta: etaMin,
          surge: surgeMultiplier,
        })

        const removeIdx = availableDrivers.findIndex(d => d.id === bestDriver.id)
        availableDrivers.splice(removeIdx, 1)
      }

      setRiders([...newRiders])
      setDrivers([...newDrivers])
      setMatchLog([...log])
      setMatchStep(step + 1)
      step++
    }, 600)
  }

  const resetSimulation = () => {
    setRiders(seedEntities(RIDER_COUNT, 'rider'))
    setDrivers(seedEntities(DRIVER_COUNT, 'driver'))
    setMatchStep(0)
    setMatchLog([])
    setIsMatching(false)
  }

  // Architecture flow animation
  useEffect(() => {
    if (!isFlowPlaying) return
    if (flowStep >= ARCH_FLOW.length) {
      setIsFlowPlaying(false)
      setFlowStep(-1)
      return
    }
    const timer = setTimeout(() => setFlowStep(s => s + 1), 900)
    return () => clearTimeout(timer)
  }, [flowStep, isFlowPlaying])

  const startArchFlow = () => {
    setFlowStep(0)
    setIsFlowPlaying(true)
  }

  // Quiz submission
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      return q.options.find(o => o.id === selected)?.correct
    })
    if (allCorrect && onComplete) onComplete()
  }

  // Already completed handling
  useEffect(() => {
    if (isCompleted) setQuizSubmitted(true)
  }, [isCompleted])

  // Quadtree grid rendering
  const renderQuadtreeGrid = (depth) => {
    const divisions = Math.pow(2, depth)
    const cellSize = GRID_SIZE / divisions
    const cells = []
    for (let r = 0; r < divisions; r++) {
      for (let c = 0; c < divisions; c++) {
        const x0 = c * cellSize
        const y0 = r * cellSize
        const driversIn = drivers.filter(d => d.x >= x0 && d.x < x0 + cellSize && d.y >= y0 && d.y < y0 + cellSize)
        const ridersIn = riders.filter(rd => rd.x >= x0 && rd.x < x0 + cellSize && rd.y >= y0 && rd.y < y0 + cellSize)
        cells.push({
          key: `${r}-${c}`,
          x: (x0 / GRID_SIZE) * 100,
          y: (y0 / GRID_SIZE) * 100,
          w: (cellSize / GRID_SIZE) * 100,
          h: (cellSize / GRID_SIZE) * 100,
          driverCount: driversIn.length,
          riderCount: ridersIn.length,
          isHighlighted: highlightedCell === `${r}-${c}`,
        })
      }
    }
    return cells
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="concept-card text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Car size={36} className="text-blue-400" />
          <h1 className="text-3xl font-bold">Design Uber</h1>
        </div>
        <p className="text-quest-muted max-w-2xl mx-auto">
          Match riders with drivers in real-time, across 10,000 cities. Go.
        </p>

        {/* Section navigation */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['Map & Matching', 'Geospatial Index', 'Surge Pricing', 'Architecture', 'Quiz'].map((label, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all
                ${currentSection === i
                  ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400'
                  : 'bg-quest-surface border border-white/10 text-quest-muted hover:border-white/30'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════ SECTION 0: MAP & MATCHING ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Navigation className="text-blue-400" />
              Real-Time Rider-Driver Matching
            </h2>

            <p className="text-quest-muted mb-6">
              At the heart of Uber is a{' '}
              <Term
                word="Matching Engine"
                definition="A real-time system that pairs riders with available drivers based on proximity, ETA, driver rating, and acceptance probability. Runs thousands of matches per second across all active cities."
                onLearn={learnTerm}
              />{' '}
              that finds the best driver for every ride request within seconds. The system must handle{' '}
              <Term
                word="Geospatial Queries"
                definition="Database queries that operate on geographic coordinates. 'Find all drivers within 3km of this point' is a geospatial range query. Requires specialized indexes (R-tree, geohash) for efficiency."
                onLearn={learnTerm}
              />{' '}
              at massive scale: millions of driver location updates per second, hundreds of thousands of concurrent ride requests.
            </p>

            {/* Interactive map grid */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">City Grid Simulation</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={runMatching}
                    disabled={isMatching}
                    className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50"
                  >
                    {isMatching ? 'Matching...' : 'Run Matching'}
                  </button>
                  <button
                    onClick={resetSimulation}
                    disabled={isMatching}
                    className="btn-secondary text-xs px-3 py-1.5 disabled:opacity-50"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Grid visualization */}
              <div className="relative w-full aspect-square bg-quest-surface rounded-lg border border-white/10 overflow-hidden mb-4">
                {/* Grid lines */}
                {Array.from({ length: GRID_SIZE + 1 }, (_, i) => (
                  <div key={`h-${i}`}>
                    <div
                      className="absolute left-0 right-0 border-t border-white/5"
                      style={{ top: `${(i / GRID_SIZE) * 100}%` }}
                    />
                    <div
                      className="absolute top-0 bottom-0 border-l border-white/5"
                      style={{ left: `${(i / GRID_SIZE) * 100}%` }}
                    />
                  </div>
                ))}

                {/* Surge zones (background heat) */}
                {surgeEnabled && SURGE_ZONES.map(zone => (
                  <div
                    key={zone.name}
                    className={`absolute rounded-full opacity-30 ${zone.multiplier >= 2 ? 'bg-red-500' : zone.multiplier >= 1.5 ? 'bg-orange-500' : 'bg-green-500'}`}
                    style={{
                      left: `${(zone.cx / GRID_SIZE) * 100}%`,
                      top: `${(zone.cy / GRID_SIZE) * 100}%`,
                      width: `${(zone.radius * 2 / GRID_SIZE) * 100}%`,
                      height: `${(zone.radius * 2 / GRID_SIZE) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}

                {/* Match lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}>
                  {riders.filter(r => r.matched).map(r => {
                    const d = drivers.find(dr => dr.id === r.matchedTo)
                    if (!d) return null
                    return (
                      <motion.line
                        key={`${r.id}-${d.id}`}
                        x1={r.x}
                        y1={r.y}
                        x2={d.x}
                        y2={d.y}
                        stroke="#3b82f6"
                        strokeWidth={0.08}
                        strokeDasharray="0.2 0.1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 0.5 }}
                      />
                    )
                  })}
                </svg>

                {/* Drivers */}
                {drivers.map(d => (
                  <motion.div
                    key={d.id}
                    className={`absolute w-3 h-3 rounded-sm flex items-center justify-center
                      ${d.matched ? 'bg-blue-500' : 'bg-green-500'}`}
                    style={{
                      left: `${(d.x / GRID_SIZE) * 100}%`,
                      top: `${(d.y / GRID_SIZE) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: Math.random() * 0.3 }}
                    title={`Driver ${d.id}`}
                  >
                    <Car size={8} className="text-white" />
                  </motion.div>
                ))}

                {/* Riders */}
                {riders.map(r => (
                  <motion.div
                    key={r.id}
                    className={`absolute w-3 h-3 rounded-full flex items-center justify-center
                      ${r.matched ? 'bg-blue-400' : 'bg-yellow-400'}`}
                    style={{
                      left: `${(r.x / GRID_SIZE) * 100}%`,
                      top: `${(r.y / GRID_SIZE) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: Math.random() * 0.3 }}
                    title={`Rider ${r.id}`}
                  >
                    <Users size={7} className="text-white" />
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px] text-quest-muted mb-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-sm" /> Available Driver
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full" /> Waiting Rider
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm" /> Matched
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-8 h-0.5 bg-blue-500 border-dashed" /> Route
                </div>
              </div>

              {/* Match log */}
              {matchLog.length > 0 && (
                <div className="bg-quest-surface rounded-lg p-4">
                  <h4 className="text-xs font-semibold mb-2">Match Log (Step {matchStep}/{RIDER_COUNT})</h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {matchLog.map((entry, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-[11px] bg-quest-bg rounded px-3 py-1.5"
                      >
                        <span className="text-yellow-400">{entry.rider}</span>
                        <ArrowRight size={10} className="text-blue-400" />
                        <span className="text-green-400">{entry.driver}</span>
                        <span className="text-quest-muted ml-auto">dist: {entry.dist}</span>
                        <span className="text-quest-muted">ETA: {entry.eta}m</span>
                        <span className={getSurgeTextColor(entry.surge)}>
                          {entry.surge > 1 ? `${entry.surge}x` : '1.0x'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DeepDive id="matching-at-scale" title="How Uber Matches at Scale" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Dispatch Optimization:</strong> Uber does not just find the
                  closest driver. It uses a batched matching algorithm that considers multiple ride requests
                  simultaneously to optimize for the global minimum total wait time, not individual minimums.
                </p>
                <p>
                  <strong className="text-quest-text">Supply Positioning:</strong> Before requests arrive, Uber
                  predicts demand using ML models and proactively suggests drivers move to high-demand areas.
                  This reduces average ETA by positioning supply where demand will appear.
                </p>
                <p>
                  <strong className="text-quest-text">Ringpop:</strong> Uber built a distributed system called
                  Ringpop using consistent hashing to partition geographic regions across matching servers.
                  Each server handles a slice of the map, avoiding a single bottleneck.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Geospatial Indexing
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: GEOSPATIAL INDEX ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="text-yellow-400" />
              Geospatial Indexing
            </h2>

            <p className="text-quest-muted mb-6">
              Finding nearby drivers requires{' '}
              <Term
                word="Geospatial Indexing"
                definition="A technique for organizing spatial data (coordinates) so that proximity queries ('find all points within X km') run in O(log n) instead of O(n). Common structures: Quadtree, R-tree, Geohash, S2 cells."
                onLearn={learnTerm}
              />
              . Scanning every driver in the database is O(n) and too slow when n is millions. Instead, we partition
              space into cells and only search nearby cells. Two main approaches:{' '}
              <Term
                word="Quadtree"
                definition="A tree data structure where each node represents a rectangular region and has exactly four children (NW, NE, SW, SE). Recursively subdivides space until each leaf contains few enough points. Excellent for dynamic spatial data."
                onLearn={learnTerm}
              />{' '}
              and{' '}
              <Term
                word="Geohash"
                definition="A geocoding system that encodes a latitude/longitude into a short alphanumeric string (e.g., 'dp3w'). Nearby locations share common prefixes. Used as keys in databases to enable fast spatial lookups via prefix queries."
                onLearn={learnTerm}
              />.
            </p>

            {/* Quadtree visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Quadtree Space Partitioning</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-quest-muted">Depth:</span>
                  {[0, 1, 2, 3, 4].map(d => (
                    <button
                      key={d}
                      onClick={() => setQuadSplitDepth(d)}
                      className={`w-7 h-7 rounded text-xs font-medium transition-all
                        ${quadSplitDepth === d
                          ? 'bg-yellow-500/30 border border-yellow-500/50 text-yellow-400'
                          : 'bg-quest-surface border border-white/10 text-quest-muted hover:border-white/30'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full aspect-square bg-quest-surface rounded-lg border border-white/10 overflow-hidden">
                {/* Quadtree cells */}
                {renderQuadtreeGrid(quadSplitDepth).map(cell => (
                  <motion.div
                    key={cell.key}
                    className={`absolute border border-yellow-500/20 transition-colors cursor-pointer
                      ${cell.isHighlighted ? 'bg-yellow-500/20' : 'hover:bg-yellow-500/10'}`}
                    style={{
                      left: `${cell.x}%`,
                      top: `${cell.y}%`,
                      width: `${cell.w}%`,
                      height: `${cell.h}%`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onMouseEnter={() => setHighlightedCell(cell.key)}
                    onMouseLeave={() => setHighlightedCell(null)}
                  >
                    {cell.driverCount > 0 && cell.w > 8 && (
                      <span className="absolute top-0.5 left-1 text-[8px] text-green-400">{cell.driverCount}D</span>
                    )}
                    {cell.riderCount > 0 && cell.w > 8 && (
                      <span className="absolute bottom-0.5 right-1 text-[8px] text-yellow-400">{cell.riderCount}R</span>
                    )}
                  </motion.div>
                ))}

                {/* Entities */}
                {drivers.map(d => (
                  <div
                    key={d.id}
                    className="absolute w-2 h-2 bg-green-500 rounded-sm"
                    style={{
                      left: `${(d.x / GRID_SIZE) * 100}%`,
                      top: `${(d.y / GRID_SIZE) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                {riders.map(r => (
                  <div
                    key={r.id}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${(r.x / GRID_SIZE) * 100}%`,
                      top: `${(r.y / GRID_SIZE) * 100}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-quest-muted mt-3 text-center">
                Depth {quadSplitDepth}: {Math.pow(4, quadSplitDepth)} cells. Increase depth to narrow search area.
                At depth 4, each cell covers ~1/256th of the map.
              </p>
            </div>

            {/* Geohash precision table */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3">Geohash Precision Levels</h3>
              <p className="text-xs text-quest-muted mb-4">
                Each extra character in a geohash narrows the area by 32x. For ride matching, precision 6
                (~1.2 km cells) is typical.
              </p>
              <div className="space-y-2">
                {GEOHASH_LEVELS.map(level => (
                  <div key={level.precision} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${level.color} flex items-center justify-center text-xs font-bold`}>
                      {level.precision}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium">Precision {level.precision}</span>
                        <span className="text-xs text-quest-muted">{level.cellKm} per cell</span>
                      </div>
                      <div className="w-full bg-quest-bg rounded-full h-1.5 mt-1">
                        <motion.div
                          className={`h-full rounded-full ${level.color.replace('/30', '/60')}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(5, 100 - level.precision * 15)}%` }}
                          transition={{ delay: level.precision * 0.1 }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-quest-muted w-16 text-right">{level.cells} cells</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-yellow-500/20">
                <h4 className="text-sm font-semibold mb-3 text-yellow-400">Quadtree</h4>
                <ul className="space-y-2 text-xs text-quest-muted">
                  <li className="flex items-start gap-2"><CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" /> Adapts to density: splits more in crowded areas</li>
                  <li className="flex items-start gap-2"><CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" /> Good for in-memory spatial indexes</li>
                  <li className="flex items-start gap-2"><CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" /> Range queries are naturally efficient</li>
                  <li className="flex items-start gap-2"><Clock size={12} className="text-yellow-400 mt-0.5 flex-shrink-0" /> Harder to distribute across servers</li>
                </ul>
              </div>
              <div className="bg-quest-bg rounded-xl p-5 border border-blue-500/20">
                <h4 className="text-sm font-semibold mb-3 text-blue-400">Geohash</h4>
                <ul className="space-y-2 text-xs text-quest-muted">
                  <li className="flex items-start gap-2"><CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" /> Simple string comparison for proximity</li>
                  <li className="flex items-start gap-2"><CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" /> Works with any key-value store (Redis, DynamoDB)</li>
                  <li className="flex items-start gap-2"><CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" /> Easy to partition across database shards</li>
                  <li className="flex items-start gap-2"><Clock size={12} className="text-yellow-400 mt-0.5 flex-shrink-0" /> Edge cases at cell boundaries (must query neighbors)</li>
                </ul>
              </div>
            </div>

            <DeepDive id="uber-h3" title="Uber's H3 Hexagonal Grid System" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">H3:</strong> Uber built an open-source hierarchical spatial
                  index called H3 that divides the world into hexagonal cells. Unlike square geohash cells,
                  hexagons have the property that all neighbors are equidistant from the center, eliminating
                  the distortion that plagues rectangular grids.
                </p>
                <p>
                  <strong className="text-quest-text">Why Hexagons?</strong> Square grids have diagonal neighbors
                  that are sqrt(2) farther than edge neighbors. Hexagons have uniform neighbor distances, which
                  makes radius queries more accurate and consistent. This matters when you are computing surge
                  zones and ETAs across millions of cells.
                </p>
                <p>
                  <strong className="text-quest-text">Google S2:</strong> Another option is Google's S2 geometry
                  library, which projects the Earth onto a cube and recursively subdivides each face using a
                  Hilbert curve. S2 cells have good locality properties and are used by Google Maps internally.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Surge Pricing
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: SURGE PRICING ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="text-red-400" />
              Surge Pricing & ETA
            </h2>

            <p className="text-quest-muted mb-6">
              <Term
                word="Surge Pricing"
                definition="Dynamic pricing that increases ride fares when demand exceeds supply in a geographic zone. The multiplier (e.g., 2.5x) is calculated in real-time based on the ratio of open ride requests to available drivers in that zone."
                onLearn={learnTerm}
              />{' '}
              is Uber's mechanism to balance supply and demand in real-time. When too many riders request
              rides and too few drivers are available in a zone, prices increase to incentivize more
              drivers to enter the area while dampening rider demand. The{' '}
              <Term
                word="ETA Algorithm"
                definition="Estimates time of arrival using a weighted graph of the road network. Considers real-time traffic, road closures, historical patterns, and road segment speeds. Uber uses a modified Dijkstra/A* on pre-processed road graphs."
                onLearn={learnTerm}
              />{' '}
              must account for real traffic conditions, not just straight-line distance.
            </p>

            {/* Surge zone visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Supply-Demand Zones</h3>
                <button
                  onClick={() => setSurgeEnabled(!surgeEnabled)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all
                    ${surgeEnabled
                      ? 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'bg-quest-surface border-white/10 text-quest-muted'}`}
                >
                  {surgeEnabled ? 'Surge Active' : 'Surge Off'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Zone cards */}
                <div className="space-y-3">
                  {SURGE_ZONES.map(zone => (
                    <motion.div
                      key={zone.name}
                      className={`p-4 rounded-lg border transition-all ${surgeEnabled ? getSurgeColor(zone.multiplier) : 'bg-quest-surface border-white/10'}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold">{zone.name}</h4>
                        {surgeEnabled && (
                          <span className={`text-sm font-bold ${getSurgeTextColor(zone.multiplier)}`}>
                            {zone.multiplier}x
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-[10px] text-quest-muted mb-1">Demand</p>
                          <div className="w-full bg-quest-bg rounded-full h-2">
                            <div
                              className="h-full rounded-full bg-red-500/60"
                              style={{ width: `${zone.demand * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-[10px] text-quest-muted mb-1">Supply</p>
                          <div className="w-full bg-quest-bg rounded-full h-2">
                            <div
                              className="h-full rounded-full bg-green-500/60"
                              style={{ width: `${zone.supply * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-[10px] text-quest-muted mt-2">
                        Ratio: {(zone.demand / zone.supply).toFixed(1)} demand/supply
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Surge formula and ETA */}
                <div className="space-y-4">
                  <div className="bg-quest-surface rounded-lg p-4">
                    <h4 className="text-xs font-semibold mb-3 text-red-400">Surge Multiplier Formula</h4>
                    <div className="bg-quest-bg rounded-lg p-4 font-mono text-xs space-y-2">
                      <p className="text-quest-muted">// Simplified surge logic</p>
                      <p><span className="text-blue-400">ratio</span> = demand / supply</p>
                      <p><span className="text-blue-400">if</span> ratio {'>'} 2.0:</p>
                      <p className="pl-4"><span className="text-red-400">surge</span> = 1.0 + (ratio - 1.0) * 0.8</p>
                      <p><span className="text-blue-400">else if</span> ratio {'>'} 1.2:</p>
                      <p className="pl-4"><span className="text-orange-400">surge</span> = 1.0 + (ratio - 1.0) * 0.5</p>
                      <p><span className="text-blue-400">else</span>:</p>
                      <p className="pl-4"><span className="text-green-400">surge</span> = 1.0</p>
                      <p className="text-quest-muted mt-2">// Clamped to max 5.0x</p>
                      <p><span className="text-blue-400">return</span> min(surge, 5.0)</p>
                    </div>
                  </div>

                  <div className="bg-quest-surface rounded-lg p-4">
                    <h4 className="text-xs font-semibold mb-3 text-blue-400">ETA Calculation</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Road Graph', desc: 'Pre-processed road network with segment speeds', icon: Navigation, color: 'text-blue-400' },
                        { label: 'Real-time Traffic', desc: 'Live speed data from driver GPS pings', icon: Car, color: 'text-green-400' },
                        { label: 'Historical Patterns', desc: 'ML model trained on past trip durations', icon: Clock, color: 'text-purple-400' },
                        { label: 'A* / Dijkstra', desc: 'Shortest-time path on weighted road graph', icon: MapPin, color: 'text-yellow-400' },
                      ].map(item => {
                        const Icon = item.icon
                        return (
                          <div key={item.label} className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-quest-bg flex items-center justify-center flex-shrink-0`}>
                              <Icon size={14} className={item.color} />
                            </div>
                            <div>
                              <p className="text-xs font-medium">{item.label}</p>
                              <p className="text-[10px] text-quest-muted">{item.desc}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="bg-quest-surface rounded-lg p-4">
                    <h4 className="text-xs font-semibold mb-2">Straight Line vs ETA</h4>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-quest-bg rounded-lg p-3">
                        <p className="text-lg font-bold text-yellow-400">2.1 km</p>
                        <p className="text-[10px] text-quest-muted">Straight line</p>
                      </div>
                      <div className="bg-quest-bg rounded-lg p-3">
                        <p className="text-lg font-bold text-blue-400">8 min</p>
                        <p className="text-[10px] text-quest-muted">Actual ETA (3.4 km road)</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-quest-muted mt-2 text-center">
                      One-way streets, highways, and traffic make road distance 1.5-2x longer than straight line
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="surge-economics" title="The Economics of Surge Pricing" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Market Equilibrium:</strong> Surge pricing is a real-time
                  market mechanism. Higher prices attract drivers to underserved areas (increasing supply) while
                  discouraging price-sensitive riders (reducing demand). In theory, the surge multiplier finds
                  the equilibrium price where supply meets demand.
                </p>
                <p>
                  <strong className="text-quest-text">Geofenced Zones:</strong> Surge zones are computed per
                  H3 hexagonal cell. Each cell independently tracks request rate vs. available drivers. The
                  system updates multipliers every 1-2 minutes to react to changing conditions.
                </p>
                <p>
                  <strong className="text-quest-text">Anti-Gaming:</strong> Uber uses smoothing to prevent
                  multiplier oscillation. If drivers see surge, drive to the area, and surge drops, those
                  drivers leave, and surge spikes again. Hysteresis (slow increase, slower decrease) prevents
                  this feedback loop.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Architecture
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: ARCHITECTURE ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Server className="text-purple-400" />
              System Architecture
            </h2>

            <p className="text-quest-muted mb-6">
              Uber's architecture is a collection of microservices communicating via RPC and event streams.
              The{' '}
              <Term
                word="Ride Service"
                definition="The orchestrator that manages the full lifecycle of a ride: request creation, driver matching, trip tracking, fare calculation, and completion. Acts as a state machine transitioning through states like REQUESTED, MATCHED, EN_ROUTE, IN_TRIP, COMPLETED."
                onLearn={learnTerm}
              />{' '}
              orchestrates the ride lifecycle, coordinating with the{' '}
              <Term
                word="Location Service"
                definition="Handles ingestion of real-time GPS coordinates from millions of drivers. Maintains an in-memory geospatial index (using H3/geohash) that supports queries like 'find all available drivers within 3km of this point'. Processes ~1M location updates per second."
                onLearn={learnTerm}
              />{' '}
              and a{' '}
              <Term
                word="Payment Service"
                definition="Manages pre-authorization when a ride is requested, hold during the trip, and final charge on completion. Handles multiple payment methods, promotions, split fares, and refunds. Must be idempotent to handle retries safely."
                onLearn={learnTerm}
              />.
            </p>

            {/* Service cards */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {ARCH_SERVICES.map(svc => {
                const Icon = svc.icon
                const isActive = activeService === svc.id
                const isInFlow = flowStep >= 0 && ARCH_FLOW[flowStep] &&
                  (ARCH_FLOW[flowStep].from === svc.id || ARCH_FLOW[flowStep].to === svc.id)

                return (
                  <motion.button
                    key={svc.id}
                    onClick={() => setActiveService(isActive ? null : svc.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`text-left p-4 rounded-xl border transition-all
                      ${isActive
                        ? 'bg-quest-surface border-purple-500/40 ring-1 ring-purple-500/20'
                        : isInFlow
                          ? 'bg-quest-surface border-blue-500/40 ring-1 ring-blue-500/20'
                          : 'bg-quest-bg border-white/5 hover:border-white/15'}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg ${svc.bg} flex items-center justify-center`}>
                        <Icon size={16} className={svc.color} />
                      </div>
                      <h4 className="text-sm font-semibold">{svc.name}</h4>
                    </div>
                    <p className="text-[11px] text-quest-muted leading-relaxed">{svc.desc}</p>
                  </motion.button>
                )
              })}
            </div>

            {/* Architecture flow animation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Ride Request Flow</h3>
                <button
                  onClick={startArchFlow}
                  disabled={isFlowPlaying}
                  className="btn-primary text-xs px-3 py-1.5 disabled:opacity-50"
                >
                  {isFlowPlaying ? 'Playing...' : 'Animate Flow'}
                </button>
              </div>

              <div className="space-y-2">
                {ARCH_FLOW.map((step, i) => {
                  const isActive = flowStep === i
                  const isPast = flowStep > i

                  return (
                    <motion.div
                      key={i}
                      animate={isActive ? { scale: [1, 1.02, 1], backgroundColor: 'rgba(59,130,246,0.15)' } : {}}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all
                        ${isActive
                          ? 'border-blue-500/40 bg-blue-500/10'
                          : isPast
                            ? 'border-green-500/20 bg-green-500/5'
                            : 'border-white/5 bg-quest-surface'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${isActive ? 'bg-blue-500/30 text-blue-400' : isPast ? 'bg-green-500/30 text-green-400' : 'bg-quest-bg text-quest-muted'}`}>
                        {isPast ? <CheckCircle size={12} /> : i + 1}
                      </div>
                      <span className={`text-xs font-medium w-24 ${isActive ? 'text-blue-400' : 'text-quest-text'}`}>
                        {ARCH_SERVICES.find(s => s.id === step.from)?.name}
                      </span>
                      <ArrowRight size={14} className={isActive ? 'text-blue-400' : 'text-quest-muted'} />
                      <span className={`text-xs font-medium w-24 ${isActive ? 'text-blue-400' : 'text-quest-text'}`}>
                        {ARCH_SERVICES.find(s => s.id === step.to)?.name}
                      </span>
                      <span className="text-[10px] text-quest-muted ml-auto italic">{step.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Data flow diagram */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Data Pipeline</h4>
              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { label: 'Driver GPS', desc: '~1M pings/sec via WebSocket', color: 'text-green-400', bg: 'bg-green-500/20' },
                  { label: 'Kafka Stream', desc: 'Partitioned by geohash prefix', color: 'text-blue-400', bg: 'bg-blue-500/20' },
                  { label: 'Spatial Index', desc: 'In-memory H3 grid per region', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
                  { label: 'Query Engine', desc: 'Nearest-driver in <50ms P99', color: 'text-purple-400', bg: 'bg-purple-500/20' },
                ].map((stage, i, arr) => (
                  <div key={stage.label} className="relative">
                    <div className={`${stage.bg} rounded-lg p-3 text-center`}>
                      <p className={`text-xs font-semibold ${stage.color}`}>{stage.label}</p>
                      <p className="text-[10px] text-quest-muted mt-1">{stage.desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                        <ArrowRight size={12} className="text-quest-muted" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scale numbers */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Scale at a Glance</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: '10,000+', label: 'Cities', icon: Globe },
                  { value: '5M+', label: 'Drivers Online', icon: Car },
                  { value: '~1M/sec', label: 'Location Updates', icon: MapPin },
                  { value: '<3 sec', label: 'Match Latency P50', icon: Clock },
                ].map(stat => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center p-3 bg-quest-surface rounded-lg">
                      <Icon size={18} className="mx-auto text-quest-muted mb-2" />
                      <p className="text-lg font-bold text-quest-text">{stat.value}</p>
                      <p className="text-[10px] text-quest-muted">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <DeepDive id="uber-db-choices" title="Database & Infra Choices" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Location Store:</strong> Uber originally used Redis with
                  geospatial commands (GEOADD, GEOSEARCH). As scale grew, they moved to a custom in-memory store
                  partitioned by H3 cell. Each region server owns a slice of the spatial index and handles
                  nearest-driver queries locally.
                </p>
                <p>
                  <strong className="text-quest-text">Ride State:</strong> Ride objects (state machine) are stored
                  in a Cassandra-like database with strong per-partition consistency. Each ride is a single
                  partition key, so all state transitions for one ride are linearizable without cross-partition
                  coordination.
                </p>
                <p>
                  <strong className="text-quest-text">Event Sourcing:</strong> Every state change (request, match,
                  pickup, dropoff) is published to Kafka. Downstream services (analytics, pricing, ETL) consume
                  these events asynchronously. This decouples the critical ride path from secondary concerns.
                </p>
                <p>
                  <strong className="text-quest-text">City Isolation:</strong> Each city is largely independent.
                  Traffic in New York does not affect Tokyo. This natural partition enables horizontal scaling:
                  add servers per city as demand grows.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="handling-failures" title="Handling Failures in a Ride" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Driver No-Show:</strong> If a matched driver does not arrive
                  within the ETA + buffer, the system automatically re-dispatches to another driver. The rider
                  gets a notification and updated ETA. The no-show driver is penalized in future matching scores.
                </p>
                <p>
                  <strong className="text-quest-text">Payment Failure:</strong> Pre-authorization happens at ride
                  request time. If the card is declined, the ride cannot be requested. If the final charge fails
                  after trip completion, the system retries with exponential backoff and falls back to alternative
                  payment methods on file.
                </p>
                <p>
                  <strong className="text-quest-text">GPS Dropout:</strong> When driver GPS drops out (tunnels,
                  parking garages), the system uses dead reckoning based on last known speed and heading. The
                  ETA switches to a road-network estimate. Once GPS returns, the actual route is reconciled for
                  accurate fare calculation.
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

      {/* ═══════════════════ SECTION 4: QUIZ ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-blue-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Uber operates at immense scale. Let's see if you can navigate the architecture.
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
                                : 'border-blue-500 bg-blue-500/10'
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
                <h3 className="text-xl font-bold mb-2">Level 54 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You have designed the architecture for a global ride-sharing platform. From geospatial
                  indexing to surge pricing, matching algorithms to payment flows, you understand how Uber
                  serves billions of rides across 10,000+ cities.
                </p>
                <p className="text-sm text-blue-400">
                  The ride is matched. The surge is calculated. The city never sleeps.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

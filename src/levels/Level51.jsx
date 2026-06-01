import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle, MessageSquare,
  Users, TrendingUp, Search, Heart, Repeat, Database, Server,
  ArrowRight, Zap, Clock, Hash, Globe, BarChart3
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

/* ── Architecture components data ── */
const archComponents = [
  { id: 'tweet-svc', label: 'Tweet Service', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Handles tweet creation, storage, and retrieval. Writes to tweet DB and publishes to fan-out.' },
  { id: 'timeline-svc', label: 'Timeline Service', icon: Clock, color: 'text-green-400', bg: 'bg-green-500/20', desc: 'Assembles the home timeline for each user from cache or by querying the social graph + tweet DB.' },
  { id: 'fanout-svc', label: 'Fan-out Service', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/20', desc: 'When a tweet is posted, pushes it into followers\' timeline caches. The heart of Twitter\'s write path.' },
  { id: 'search-svc', label: 'Search Service', icon: Search, color: 'text-yellow-400', bg: 'bg-yellow-500/20', desc: 'Indexes tweets in near-real-time using inverted indices. Powers search, hashtag lookup, and trending.' },
  { id: 'notification-svc', label: 'Notification Service', icon: Heart, color: 'text-red-400', bg: 'bg-red-500/20', desc: 'Sends push notifications, email digests, and in-app alerts for mentions, likes, and retweets.' },
  { id: 'cache', label: 'Cache Layer (Redis)', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/20', desc: 'Stores pre-computed timelines and hot tweets in Redis. Each user\'s timeline is a sorted set of tweet IDs.' },
]

/* ── Fan-out comparison data ── */
const fanoutStrategies = {
  write: {
    title: 'Fan-out on Write',
    subtitle: 'Push model',
    color: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    steps: [
      { label: 'User posts tweet', icon: MessageSquare },
      { label: 'Look up all followers', icon: Users },
      { label: 'Write tweet ID to each follower\'s timeline cache', icon: Database },
      { label: 'Followers read timeline instantly from cache', icon: Zap },
    ],
    pros: ['Fast reads (O(1) from cache)', 'Timeline always pre-built', 'Great for users with few followers'],
    cons: ['Slow writes for celebrities (millions of fan-outs)', 'Wasted writes if followers are inactive', 'High write amplification'],
  },
  read: {
    title: 'Fan-out on Read',
    subtitle: 'Pull model',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    steps: [
      { label: 'User posts tweet', icon: MessageSquare },
      { label: 'Tweet stored in poster\'s outbox only', icon: Database },
      { label: 'Follower opens timeline', icon: Users },
      { label: 'System queries all followed users\' outboxes, merges, sorts', icon: Search },
    ],
    pros: ['Fast writes (O(1))', 'No wasted work for inactive followers', 'Ideal for celebrities'],
    cons: ['Slow reads (must query N followed users)', 'Higher read latency', 'More complex merge logic'],
  },
}

/* ── Trending algorithm: sliding window data ── */
const trendingHashtags = [
  { tag: '#WorldCup', counts: [120, 340, 890, 2100, 5400, 12000, 8900], velocity: 'rising' },
  { tag: '#OpenAI', counts: [200, 180, 210, 190, 220, 200, 210], velocity: 'stable' },
  { tag: '#Election2024', counts: [8000, 6500, 4200, 3100, 2400, 1800, 1200], velocity: 'falling' },
  { tag: '#TaylorSwift', counts: [50, 80, 300, 1500, 9000, 15000, 22000], velocity: 'rising' },
  { tag: '#JavaScript', counts: [500, 520, 490, 510, 480, 500, 490], velocity: 'stable' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'Why does Twitter use fan-out-on-read for celebrity accounts instead of fan-out-on-write?',
    options: [
      { id: 'a', text: 'Celebrities post less frequently, so reads are cheaper', correct: false },
      { id: 'b', text: 'Fan-out-on-write for a user with 50M followers would require 50M cache writes per tweet, which is too slow and expensive', correct: true },
      { id: 'c', text: 'Celebrity tweets are less important and can tolerate slower delivery', correct: false },
      { id: 'd', text: 'Fan-out-on-read uses less memory overall', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'How is a user\'s home timeline typically assembled in Twitter\'s architecture?',
    options: [
      { id: 'a', text: 'A single SQL query joining the tweets, users, and follows tables', correct: false },
      { id: 'b', text: 'Pre-computed timeline from Redis cache (fan-out-on-write) merged with celebrity tweets fetched on-read', correct: true },
      { id: 'c', text: 'A MapReduce job that runs every 5 minutes to generate all timelines', correct: false },
      { id: 'd', text: 'Direct fan-out-on-read for all users at request time', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What makes a hashtag "trending" in a sliding window algorithm?',
    options: [
      { id: 'a', text: 'The hashtag with the highest total count over all time', correct: false },
      { id: 'b', text: 'The hashtag used most in the last 24 hours', correct: false },
      { id: 'c', text: 'A hashtag with an abnormally high velocity (rate of increase) compared to its baseline within a recent time window', correct: true },
      { id: 'd', text: 'Any hashtag mentioned more than 1000 times', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Which sharding strategy makes the most sense for storing tweets at Twitter scale?',
    options: [
      { id: 'a', text: 'Shard by tweet creation date so all tweets from the same day are together', correct: false },
      { id: 'b', text: 'Shard by tweet ID (using Snowflake IDs that embed timestamp) for even distribution and time-range queries', correct: true },
      { id: 'c', text: 'Shard by user ID so all of a user\'s tweets are on the same shard', correct: false },
      { id: 'd', text: 'No sharding needed; a single database with read replicas is sufficient', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is the main role of the cache layer (Redis) in Twitter\'s timeline architecture?',
    options: [
      { id: 'a', text: 'Store the full tweet content including media for fast delivery', correct: false },
      { id: 'b', text: 'Store sorted sets of tweet IDs per user as pre-computed timelines, avoiding expensive DB fan-out queries on every read', correct: true },
      { id: 'c', text: 'Cache the social graph (who follows whom) exclusively', correct: false },
      { id: 'd', text: 'Buffer tweets before writing them to the database', correct: false },
    ],
  },
]

/* ── Scale numbers ── */
const scaleNumbers = [
  { label: 'Daily Active Users', value: '250M', icon: Users, color: 'text-blue-400' },
  { label: 'Tweets per Day', value: '500M', icon: MessageSquare, color: 'text-green-400' },
  { label: 'Tweets per Second (avg)', value: '~6,000', icon: Zap, color: 'text-yellow-400' },
  { label: 'Tweets per Second (peak)', value: '~150,000', icon: TrendingUp, color: 'text-red-400' },
  { label: 'Avg Followers per User', value: '~200', icon: Users, color: 'text-purple-400' },
  { label: 'Timeline Reads per Sec', value: '~300,000', icon: Search, color: 'text-orange-400' },
]

/* ══════════════════════════════════════════════════════════ */

export default function Level51({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [fanoutMode, setFanoutMode] = useState('write')
  const [fanoutStep, setFanoutStep] = useState(0)
  const [fanoutAnimating, setFanoutAnimating] = useState(false)
  const [timelinePhase, setTimelinePhase] = useState(0)
  const [trendingWindow, setTrendingWindow] = useState(6)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [celebrityFollowers, setCelebrityFollowers] = useState(50000000)
  const [fanoutCalcRunning, setFanoutCalcRunning] = useState(false)
  const [fanoutCalcResult, setFanoutCalcResult] = useState(null)

  const sectionTitles = [
    'The Scale of Twitter',
    'Architecture Overview',
    'Fan-out Strategies',
    'Timeline & Trending',
    'Knowledge Check',
  ]

  /* ── Fan-out animation ── */
  const runFanoutAnimation = useCallback(() => {
    setFanoutAnimating(true)
    setFanoutStep(0)
    const strategy = fanoutStrategies[fanoutMode]
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= strategy.steps.length) {
        clearInterval(interval)
        setFanoutAnimating(false)
      } else {
        setFanoutStep(step)
      }
    }, 1200)
    return () => clearInterval(interval)
  }, [fanoutMode])

  /* ── Fan-out calculator ── */
  const runFanoutCalc = useCallback(() => {
    setFanoutCalcRunning(true)
    setFanoutCalcResult(null)
    setTimeout(() => {
      const writesPerTweet = celebrityFollowers
      const timeToFanout = (celebrityFollowers / 100000).toFixed(1)
      const cacheMemory = ((celebrityFollowers * 8) / (1024 * 1024)).toFixed(1)
      setFanoutCalcResult({
        writesPerTweet: writesPerTweet.toLocaleString(),
        timeToFanout: `${timeToFanout}s`,
        cacheMemory: `${cacheMemory} MB`,
        verdict: celebrityFollowers > 1000000
          ? 'Fan-out-on-read recommended (too many followers for write fan-out)'
          : celebrityFollowers > 100000
            ? 'Hybrid approach: fan-out-on-write with rate limiting'
            : 'Fan-out-on-write works fine at this scale',
      })
      setFanoutCalcRunning(false)
    }, 800)
  }, [celebrityFollowers])

  /* ── Timeline assembly animation ── */
  const runTimelineAssembly = useCallback(() => {
    setTimelinePhase(0)
    let phase = 0
    const interval = setInterval(() => {
      phase++
      if (phase > 4) {
        clearInterval(interval)
      } else {
        setTimelinePhase(phase)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  /* ── Quiz submit ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (onComplete) onComplete()
  }

  /* ── Trending sort by velocity in window ── */
  const sortedTrending = [...trendingHashtags].sort((a, b) => {
    const aVel = a.counts[trendingWindow] - a.counts[Math.max(0, trendingWindow - 2)]
    const bVel = b.counts[trendingWindow] - b.counts[Math.max(0, trendingWindow - 2)]
    return bVel - aVel
  })

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Progress bar ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="text-blue-400" />
            Design Twitter
          </h1>
          {isCompleted && (
            <span className="flex items-center gap-1 text-quest-success text-sm">
              <CheckCircle size={16} /> Completed
            </span>
          )}
        </div>
        <p className="text-quest-muted mb-4">
          500 million users, 500 million tweets per day. How does Twitter actually work?
        </p>
        <div className="flex gap-1">
          {sectionTitles.map((title, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`flex-1 h-2 rounded-full transition-all ${
                i <= currentSection ? 'bg-blue-500' : 'bg-quest-surface'
              }`}
              title={title}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1">
          {sectionTitles.map((title, i) => (
            <span key={i} className={`text-[10px] ${i === currentSection ? 'text-blue-400' : 'text-quest-muted'}`}>
              {title}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════ SECTION 0: SCALE NUMBERS ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Globe size={22} className="text-blue-400" />
              Twitter by the Numbers
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              Before designing a system, understand the scale. These numbers define every architectural decision.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {scaleNumbers.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-quest-bg rounded-xl p-4 border border-white/5 text-center"
                  >
                    <Icon size={24} className={`${stat.color} mx-auto mb-2`} />
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-[11px] text-quest-muted">{stat.label}</div>
                  </motion.div>
                )
              })}
            </div>

            {/* Scale math breakdown */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BarChart3 size={16} className="text-yellow-400" />
                The Fan-out Math
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between p-3 bg-quest-surface rounded-lg">
                  <span className="text-quest-muted">Average user posts a tweet</span>
                  <span className="font-mono text-blue-400">1 write</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-quest-surface rounded-lg">
                  <span className="text-quest-muted">Average followers per user</span>
                  <span className="font-mono text-blue-400">~200</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-quest-surface rounded-lg">
                  <span className="text-quest-muted">Fan-out writes per tweet (avg user)</span>
                  <span className="font-mono text-green-400">~200 cache writes</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-quest-surface rounded-lg border border-red-500/20">
                  <span className="text-quest-muted">Fan-out writes for celebrity (50M followers)</span>
                  <span className="font-mono text-red-400">50,000,000 writes!</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-quest-surface rounded-lg">
                  <span className="text-quest-muted">Total fan-out writes per day</span>
                  <span className="font-mono text-yellow-400">500M tweets x 200 = 100B</span>
                </div>
              </div>
              <p className="text-xs text-quest-muted mt-3">
                This is why fan-out strategy is the central design decision. Writing 100 billion cache entries
                per day requires careful optimization.
              </p>
            </div>

            <DeepDive id="twitter-history" title="Twitter's Infrastructure Evolution" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">2006-2008 (Ruby on Rails):</strong> Twitter started as a
                  monolithic Rails app with MySQL. The famous "Fail Whale" appeared frequently as the system
                  could not handle growth. Peak load during events would crash the entire site.
                </p>
                <p>
                  <strong className="text-quest-text">2009-2012 (The Great Migration):</strong> Twitter rewrote
                  critical services in Scala and Java. They built their own distributed systems: Manhattan (key-value
                  store), Snowflake (ID generation), and a custom timeline service. They moved from a pull model
                  to a push model (fan-out-on-write) for timelines.
                </p>
                <p>
                  <strong className="text-quest-text">2012-Present:</strong> Hybrid approach. Fan-out-on-write
                  for normal users, fan-out-on-read for celebrities. GraphQL API (Strato), machine learning
                  for timeline ranking, and real-time event processing with Heron (successor to Storm).
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore Architecture
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: ARCHITECTURE ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Server size={22} className="text-green-400" />
              High-Level Architecture
            </h2>
            <p className="text-sm text-quest-muted mb-4">
              Click each component to understand its role. Think of this as Twitter's{' '}
              <Term
                word="Microservice Architecture"
                definition="A design pattern where an application is composed of small, independent services that communicate via APIs. Each service owns its data and can be deployed independently."
                onLearn={learnTerm}
              />.
            </p>

            {/* Architecture diagram */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/5 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {archComponents.map((comp) => {
                  const Icon = comp.icon
                  const isSelected = selectedComponent === comp.id
                  return (
                    <motion.button
                      key={comp.id}
                      onClick={() => setSelectedComponent(isSelected ? null : comp.id)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`p-4 rounded-xl border text-left transition-all
                        ${isSelected
                          ? `${comp.bg} border-white/20 ring-1 ring-white/10`
                          : 'bg-quest-surface border-white/5 hover:border-white/15'
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-lg ${comp.bg} flex items-center justify-center mb-2`}>
                        <Icon size={20} className={comp.color} />
                      </div>
                      <div className="text-sm font-semibold">{comp.label}</div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Selected component detail */}
              <AnimatePresence mode="wait">
                {selectedComponent && (
                  <motion.div
                    key={selectedComponent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-quest-surface rounded-xl border border-white/10"
                  >
                    {(() => {
                      const comp = archComponents.find(c => c.id === selectedComponent)
                      const Icon = comp.icon
                      return (
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${comp.bg} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={20} className={comp.color} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm mb-1">{comp.label}</h4>
                            <p className="text-sm text-quest-muted">{comp.desc}</p>
                          </div>
                        </div>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Data flow diagram */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="text-sm font-semibold mb-4">Tweet Write Path</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: 'Client', color: 'bg-blue-500/20 text-blue-400' },
                  { label: 'API Gateway', color: 'bg-gray-500/20 text-gray-400' },
                  { label: 'Tweet Service', color: 'bg-blue-500/20 text-blue-400' },
                  { label: 'Tweet DB', color: 'bg-green-500/20 text-green-400' },
                  { label: 'Fan-out Service', color: 'bg-purple-500/20 text-purple-400' },
                  { label: 'Timeline Caches', color: 'bg-orange-500/20 text-orange-400' },
                ].map((node, i, arr) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`px-3 py-2 rounded-lg border border-white/10 text-xs font-medium ${node.color}`}>
                      {node.label}
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight size={14} className="text-white/20 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>

              <h3 className="text-sm font-semibold mt-6 mb-4">Tweet Read Path (Timeline)</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: 'Client', color: 'bg-blue-500/20 text-blue-400' },
                  { label: 'API Gateway', color: 'bg-gray-500/20 text-gray-400' },
                  { label: 'Timeline Service', color: 'bg-green-500/20 text-green-400' },
                  { label: 'Redis Cache', color: 'bg-orange-500/20 text-orange-400' },
                  { label: '+ Celebrity Tweets (on-read)', color: 'bg-purple-500/20 text-purple-400' },
                  { label: 'Merged Timeline', color: 'bg-blue-500/20 text-blue-400' },
                ].map((node, i, arr) => (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <div className={`px-3 py-2 rounded-lg border border-white/10 text-xs font-medium ${node.color}`}>
                      {node.label}
                    </div>
                    {i < arr.length - 1 && (
                      <ArrowRight size={14} className="text-white/20 flex-shrink-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <DeepDive id="snowflake-ids" title="Snowflake: Twitter's ID Generation" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Problem:</strong> At 6,000+ tweets per second, you
                  cannot use auto-incrementing database IDs. They become a bottleneck and single point of failure.
                  UUIDs are random and do not sort by time.
                </p>
                <p>
                  <strong className="text-quest-text">Snowflake Solution:</strong> A 64-bit ID composed of:
                  timestamp (41 bits, ~69 years), datacenter ID (5 bits), worker ID (5 bits), and sequence number
                  (12 bits, 4096 per ms per worker). IDs are roughly sorted by creation time, enabling efficient
                  range queries and time-based sharding.
                </p>
                <p>
                  <strong className="text-quest-text">Why It Matters:</strong> Snowflake IDs let you shard tweets
                  by ID range (which maps to time ranges), making queries like "latest 20 tweets" efficient.
                  Each worker generates IDs independently with no coordination needed.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Fan-out Strategies
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: FAN-OUT ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Repeat size={22} className="text-purple-400" />
              <Term
                word="Fan-out"
                definition="The process of distributing a message (tweet) to all interested recipients (followers). Fan-out-on-write pushes at write time; fan-out-on-read pulls at read time."
                onLearn={learnTerm}
              /> Strategies
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              The single most important design decision in Twitter's architecture. Toggle between strategies
              and watch the data flow.
            </p>

            {/* Strategy toggle */}
            <div className="flex gap-2 mb-6">
              {Object.entries(fanoutStrategies).map(([key, strategy]) => (
                <button
                  key={key}
                  onClick={() => { setFanoutMode(key); setFanoutStep(0); setFanoutAnimating(false) }}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold transition-all
                    ${fanoutMode === key
                      ? `${strategy.bg} ${strategy.border} ${strategy.color}`
                      : 'bg-quest-surface border-white/5 text-quest-muted hover:border-white/15'
                    }`}
                >
                  {strategy.title}
                  <div className="text-[10px] font-normal mt-0.5 opacity-70">{strategy.subtitle}</div>
                </button>
              ))}
            </div>

            {/* Animated steps */}
            {(() => {
              const strategy = fanoutStrategies[fanoutMode]
              return (
                <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-semibold ${strategy.color}`}>{strategy.title} Flow</h3>
                    <button
                      onClick={runFanoutAnimation}
                      disabled={fanoutAnimating}
                      className="text-xs px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 hover:border-white/20 disabled:opacity-50"
                    >
                      {fanoutAnimating ? 'Animating...' : 'Replay Animation'}
                    </button>
                  </div>

                  <div className="space-y-3">
                    {strategy.steps.map((step, i) => {
                      const Icon = step.icon
                      const isActive = i <= fanoutStep
                      const isCurrent = i === fanoutStep && fanoutAnimating
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.4 }}
                          animate={{
                            opacity: isActive ? 1 : 0.4,
                            x: isActive ? 0 : 10,
                          }}
                          transition={{ duration: 0.4 }}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all
                            ${isCurrent
                              ? `${strategy.bg} ${strategy.border}`
                              : isActive
                                ? 'bg-quest-surface border-white/10'
                                : 'bg-quest-bg border-white/5'
                            }`}
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                            ${isActive ? strategy.bg : 'bg-quest-surface'}`}>
                            <Icon size={16} className={isActive ? strategy.color : 'text-quest-muted'} />
                          </div>
                          <span className={`text-sm ${isActive ? 'text-quest-text' : 'text-quest-muted'}`}>
                            {step.label}
                          </span>
                          {isCurrent && (
                            <motion.div
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="ml-auto w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Pros / Cons */}
                  <div className="grid md:grid-cols-2 gap-4 mt-5">
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="text-xs font-semibold text-green-400 mb-2">Pros</h4>
                      {strategy.pros.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-quest-muted mb-1">
                          <CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                          {p}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
                      <h4 className="text-xs font-semibold text-red-400 mb-2">Cons</h4>
                      {strategy.cons.map((c, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-quest-muted mb-1">
                          <span className="text-red-400 mt-0.5 flex-shrink-0">x</span>
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Celebrity Problem Calculator */}
            <div className="bg-quest-bg rounded-xl p-5 border border-red-500/20 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Users size={16} className="text-red-400" />
                The Celebrity Problem Calculator
              </h3>
              <p className="text-xs text-quest-muted mb-4">
                What happens when{' '}
                <Term
                  word="a celebrity"
                  definition="In Twitter's context, an account with millions of followers. Fan-out-on-write for such accounts would flood the system with millions of cache writes per tweet, creating the 'celebrity problem'."
                  onLearn={learnTerm}
                />{' '}
                with millions of followers tweets? Adjust the follower count to see.
              </p>

              <div className="mb-4">
                <label className="text-xs text-quest-muted mb-2 block">
                  Followers: {celebrityFollowers.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={1000}
                  max={100000000}
                  step={100000}
                  value={celebrityFollowers}
                  onChange={(e) => setCelebrityFollowers(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
                <div className="flex justify-between text-[10px] text-quest-muted mt-1">
                  <span>1K</span>
                  <span>25M</span>
                  <span>50M</span>
                  <span>100M</span>
                </div>
              </div>

              <button
                onClick={runFanoutCalc}
                disabled={fanoutCalcRunning}
                className="btn-primary w-full text-sm mb-4 disabled:opacity-50"
              >
                {fanoutCalcRunning ? 'Calculating...' : 'Calculate Fan-out Cost'}
              </button>

              <AnimatePresence>
                {fanoutCalcResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between p-3 bg-quest-surface rounded-lg text-sm">
                      <span className="text-quest-muted">Cache writes per tweet</span>
                      <span className="font-mono text-red-400">{fanoutCalcResult.writesPerTweet}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-quest-surface rounded-lg text-sm">
                      <span className="text-quest-muted">Time to fan-out (at 100K writes/s)</span>
                      <span className="font-mono text-yellow-400">{fanoutCalcResult.timeToFanout}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-quest-surface rounded-lg text-sm">
                      <span className="text-quest-muted">Cache memory for tweet IDs</span>
                      <span className="font-mono text-blue-400">{fanoutCalcResult.cacheMemory}</span>
                    </div>
                    <div className={`p-3 rounded-lg text-sm font-semibold text-center
                      ${celebrityFollowers > 1000000 ? 'bg-red-500/10 text-red-400' : celebrityFollowers > 100000 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-green-500/10 text-green-400'}`}>
                      {fanoutCalcResult.verdict}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DeepDive id="hybrid-fanout" title="Twitter's Hybrid Fan-out Approach" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Hybrid Solution:</strong> Twitter uses a clever
                  combination. For normal users (fewer than ~5,000 followers), tweets are fanned-out-on-write
                  into followers' timeline caches. For celebrities, the tweet is only stored in the poster's
                  outbox.
                </p>
                <p>
                  <strong className="text-quest-text">At Read Time:</strong> When a user opens their timeline,
                  the Timeline Service fetches the pre-built timeline from Redis, then separately queries for
                  new tweets from any celebrities the user follows, merges and ranks them, and returns the
                  combined result.
                </p>
                <p>
                  <strong className="text-quest-text">Threshold:</strong> The follower count threshold for
                  switching strategies is tuned based on system load. It has historically been around 5,000-10,000
                  followers, though the exact number changes over time.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Timeline & Trending
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: TIMELINE & TRENDING ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Clock size={22} className="text-orange-400" />
              Timeline Generation
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              Watch how a user's home timeline is assembled step by step. The{' '}
              <Term
                word="Timeline Service"
                definition="The service responsible for assembling a user's home feed by merging pre-computed cache entries with on-demand celebrity tweet lookups, applying ranking algorithms, and returning the final sorted list."
                onLearn={learnTerm}
              />{' '}
              orchestrates cache reads, database lookups, and merge operations.
            </p>

            {/* Timeline assembly animation */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-orange-400">Timeline Assembly Phases</h3>
                <button
                  onClick={runTimelineAssembly}
                  className="text-xs px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 hover:border-white/20"
                >
                  Replay
                </button>
              </div>

              <div className="space-y-3">
                {[
                  { phase: 0, label: 'User requests home timeline', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/20', detail: 'GET /api/timeline?user_id=12345&count=20' },
                  { phase: 1, label: 'Read pre-built timeline from Redis cache', icon: Zap, color: 'text-orange-400', bg: 'bg-orange-500/20', detail: 'ZREVRANGE timeline:12345 0 19 -- returns tweet IDs sorted by time' },
                  { phase: 2, label: 'Fetch celebrity tweets (fan-out-on-read)', icon: Search, color: 'text-purple-400', bg: 'bg-purple-500/20', detail: 'Query outboxes of followed celebrities, get latest tweets' },
                  { phase: 3, label: 'Merge, rank, and deduplicate', icon: Database, color: 'text-green-400', bg: 'bg-green-500/20', detail: 'Combine cached timeline + celebrity tweets, apply ML ranking model' },
                  { phase: 4, label: 'Hydrate tweet objects and return', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-500/20', detail: 'Multi-get tweet content, user info, engagement counts from cache/DB' },
                ].map((item) => {
                  const Icon = item.icon
                  const isActive = timelinePhase >= item.phase
                  const isCurrent = timelinePhase === item.phase
                  return (
                    <motion.div
                      key={item.phase}
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        scale: isCurrent ? 1.02 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 rounded-lg border transition-all
                        ${isCurrent
                          ? `${item.bg} border-white/20`
                          : isActive
                            ? 'bg-quest-surface border-white/10'
                            : 'bg-quest-bg border-white/5'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg}`}>
                          <Icon size={16} className={item.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-[11px] text-quest-muted font-mono truncate">{item.detail}</div>
                        </div>
                        {isCurrent && (
                          <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                            className="w-2 h-2 rounded-full bg-orange-400"
                          />
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Cache stats */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-green-400">~5ms</div>
                  <div className="text-[10px] text-quest-muted">Redis lookup</div>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-yellow-400">~50ms</div>
                  <div className="text-quest-muted text-[10px]">Celebrity merge</div>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-blue-400">~200ms</div>
                  <div className="text-quest-muted text-[10px]">Total E2E</div>
                </div>
              </div>
            </div>

            <DeepDive id="timeline-ranking" title="Algorithmic Timeline Ranking" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Beyond Chronological:</strong> Twitter switched from
                  purely chronological timelines to ranked timelines in 2016. The ranking model considers
                  engagement probability, recency, user relationships, content type, and more.
                </p>
                <p>
                  <strong className="text-quest-text">Features Used:</strong> How often you interact with the
                  poster, whether you have liked similar content, how many people have engaged with the tweet,
                  tweet age, media type (images/video rank higher), and whether the poster is in your close
                  network graph.
                </p>
                <p>
                  <strong className="text-quest-text">Real-time ML:</strong> The ranking model runs at read
                  time on the merged candidate tweets. This is computationally expensive but critical for
                  engagement. Twitter uses a combination of lightweight models at the edge and heavier models
                  server-side.
                </p>
              </div>
            </DeepDive>

            {/* ── Trending Algorithm ── */}
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2 mt-8">
              <TrendingUp size={22} className="text-yellow-400" />
              Trending Algorithm
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              Trending is not about total volume -- it is about{' '}
              <Term
                word="velocity"
                definition="The rate of change in mention frequency. A hashtag with 100 mentions jumping to 10,000 in an hour has much higher velocity than one with a steady 50,000 per hour. Trending algorithms detect abnormal velocity spikes."
                onLearn={learnTerm}
              />.
              A hashtag that suddenly spikes is more interesting than one that is always popular.
              Use the{' '}
              <Term
                word="sliding window"
                definition="A time-based window (e.g., 5-minute buckets over the last hour) that moves forward continuously. Old data falls off the trailing edge while new data enters at the leading edge. Used to detect recent trends without being influenced by old data."
                onLearn={learnTerm}
              />{' '}
              slider to see how rankings change over time.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                  <Hash size={16} />
                  Sliding Window: Hashtag Velocity
                </h3>
                <div className="text-xs text-quest-muted">
                  Window position: {trendingWindow + 1}/7
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="range"
                  min={0}
                  max={6}
                  value={trendingWindow}
                  onChange={(e) => setTrendingWindow(Number(e.target.value))}
                  className="w-full accent-yellow-500"
                />
                <div className="flex justify-between text-[10px] text-quest-muted mt-1">
                  <span>6h ago</span>
                  <span>5h</span>
                  <span>4h</span>
                  <span>3h</span>
                  <span>2h</span>
                  <span>1h</span>
                  <span>Now</span>
                </div>
              </div>

              {/* Trending list */}
              <div className="space-y-2">
                {sortedTrending.map((tag, rank) => {
                  const currentCount = tag.counts[trendingWindow]
                  const prevCount = tag.counts[Math.max(0, trendingWindow - 1)]
                  const delta = currentCount - prevCount
                  const deltaPercent = prevCount > 0 ? ((delta / prevCount) * 100).toFixed(0) : 0
                  const maxCount = Math.max(...trendingHashtags.flatMap(t => t.counts))
                  const barWidth = (currentCount / maxCount) * 100

                  return (
                    <motion.div
                      key={tag.tag}
                      layout
                      transition={{ duration: 0.4 }}
                      className="bg-quest-surface rounded-lg p-3 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-quest-muted w-5">#{rank + 1}</span>
                          <span className="text-sm font-semibold">{tag.tag}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-quest-muted">
                            {currentCount.toLocaleString()}
                          </span>
                          <span className={`text-[10px] font-mono ${
                            delta > 0 ? 'text-green-400' : delta < 0 ? 'text-red-400' : 'text-quest-muted'
                          }`}>
                            {delta > 0 ? '+' : ''}{deltaPercent}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-quest-bg rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.6 }}
                          className={`h-full rounded-full ${
                            tag.velocity === 'rising'
                              ? 'bg-gradient-to-r from-green-500 to-emerald-400'
                              : tag.velocity === 'falling'
                                ? 'bg-gradient-to-r from-red-500 to-orange-400'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                          }`}
                        />
                      </div>

                      {/* Mini sparkline */}
                      <div className="flex items-end gap-0.5 mt-2 h-6">
                        {tag.counts.map((count, i) => {
                          const height = (count / Math.max(...tag.counts)) * 100
                          return (
                            <div
                              key={i}
                              className={`flex-1 rounded-sm transition-all ${
                                i <= trendingWindow ? 'bg-yellow-400/60' : 'bg-white/10'
                              }`}
                              style={{ height: `${Math.max(height, 5)}%` }}
                            />
                          )
                        })}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <p className="text-[11px] text-quest-muted mt-3">
                Notice how #WorldCup and #TaylorSwift climb the rankings as their velocity increases,
                while #Election2024 drops despite having higher absolute counts earlier.
              </p>
            </div>

            {/* Sharding strategy */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Database size={16} className="text-cyan-400" />
                <Term
                  word="Sharding"
                  definition="Partitioning data across multiple database instances. Each shard holds a subset of the data. Twitter shards tweets by ID (which embeds timestamp), so time-range queries hit minimal shards."
                  onLearn={learnTerm}
                />{' '}
                Strategy for Tweets
              </h3>

              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    strategy: 'By User ID',
                    desc: 'All tweets from one user on same shard',
                    pro: 'Fast user profile queries',
                    con: 'Hot spots (celebrity shards overloaded)',
                    verdict: 'Not ideal',
                    color: 'border-yellow-500/30',
                  },
                  {
                    strategy: 'By Tweet ID (Snowflake)',
                    desc: 'Tweets distributed by ID, which encodes time',
                    pro: 'Even distribution, time-range queries efficient',
                    con: 'User tweets scattered across shards',
                    verdict: 'Twitter\'s choice',
                    color: 'border-green-500/30',
                  },
                  {
                    strategy: 'By Hash',
                    desc: 'Random distribution via hash function',
                    pro: 'Perfectly even distribution',
                    con: 'Range queries require scatter-gather',
                    verdict: 'Viable but less optimal',
                    color: 'border-blue-500/30',
                  },
                ].map((s) => (
                  <div key={s.strategy} className={`p-4 rounded-lg border ${s.color} bg-quest-surface`}>
                    <h4 className="text-sm font-semibold mb-1">{s.strategy}</h4>
                    <p className="text-[11px] text-quest-muted mb-3">{s.desc}</p>
                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-start gap-1">
                        <CheckCircle size={10} className="text-green-400 mt-0.5" />
                        <span className="text-quest-muted">{s.pro}</span>
                      </div>
                      <div className="flex items-start gap-1">
                        <span className="text-red-400 mt-0.5 text-[10px]">x</span>
                        <span className="text-quest-muted">{s.con}</span>
                      </div>
                    </div>
                    <div className={`mt-2 text-[10px] font-semibold ${
                      s.verdict === "Twitter's choice" ? 'text-green-400' : 'text-quest-muted'
                    }`}>
                      {s.verdict}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="search-indexing" title="Real-Time Search Indexing at Twitter" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Earlybird:</strong> Twitter's real-time search engine
                  uses an inverted index called Earlybird. When a tweet is created, it is tokenized and indexed
                  within seconds. The index is segmented by time (recent tweets in memory, older tweets on disk).
                </p>
                <p>
                  <strong className="text-quest-text">Index Partitioning:</strong> The search index is
                  hash-partitioned across many machines. Each partition handles a subset of tweets. At query
                  time, the request fans out to all partitions, results are merged by relevance and recency.
                </p>
                <p>
                  <strong className="text-quest-text">Blender:</strong> Twitter's search aggregation layer
                  that merges results from Earlybird, user search, and other sources. It applies personalization,
                  spam filtering, and relevance scoring before returning the final result set.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="cache-architecture" title="Redis Cache Architecture at Twitter Scale" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Timeline Cache Structure:</strong> Each user's timeline
                  is stored as a Redis sorted set where the score is the tweet timestamp and the member is the
                  tweet ID. ZREVRANGE efficiently returns the latest N tweet IDs. Storing only IDs (8 bytes each)
                  keeps memory usage manageable.
                </p>
                <p>
                  <strong className="text-quest-text">Cache Sizing:</strong> With 250M DAU and ~800 tweet IDs
                  per timeline (8 bytes each), the raw timeline cache needs approximately 250M x 800 x 8 = 1.6 TB.
                  With overhead and replication, Twitter's Redis fleet is in the tens of terabytes range.
                </p>
                <p>
                  <strong className="text-quest-text">Eviction:</strong> Inactive users' timelines are evicted
                  from cache. When they return, the timeline is rebuilt on-demand (fan-out-on-read fallback).
                  This is why Twitter's system must support both push and pull models.
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
              Twitter's architecture is a masterclass in tradeoffs. Let's see if you internalized the key decisions.
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
                <h3 className="text-xl font-bold mb-2">Level 51 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how Twitter handles 500 million tweets per day: fan-out strategies,
                  timeline assembly, trending algorithms, and the celebrity problem. These patterns apply
                  to any social media system at scale.
                </p>
                <p className="text-sm text-blue-400">
                  From a single tweet to 100 billion fan-out writes per day. That is the power of distributed systems.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Image, Upload, Heart, MessageSquare, Globe,
  Database, Cloud
} from 'lucide-react'

/* ──────────────────── helpers ──────────────────── */

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

/* ──────────────────── constants ──────────────────── */

const PIPELINE_STEPS = [
  { label: 'User uploads photo', icon: Upload, color: 'text-blue-400', detail: 'Client sends raw image via HTTPS to API Gateway' },
  { label: 'API Gateway', icon: Globe, color: 'text-purple-400', detail: 'Auth check, rate limiting, request routing' },
  { label: 'Upload Service', icon: Cloud, color: 'text-cyan-400', detail: 'Validates format, generates unique ID, stores original to S3' },
  { label: 'Image Processor', icon: Image, color: 'text-yellow-400', detail: 'Creates 4 resolutions: thumbnail (150px), small (320px), medium (640px), large (1080px)' },
  { label: 'Object Storage (S3)', icon: Database, color: 'text-green-400', detail: 'Stores all resolutions. ~4 copies per photo. Highly durable (11 nines).' },
  { label: 'CDN (CloudFront)', icon: Globe, color: 'text-orange-400', detail: 'Caches images at 200+ edge locations worldwide. < 50ms delivery.' },
]

const FEED_FACTORS = [
  { name: 'Recency', weight: 0.25, description: 'Newer posts get a boost. Decays over hours.' },
  { name: 'Engagement', weight: 0.30, description: 'Likes, comments, shares, saves signal quality.' },
  { name: 'Relationship', weight: 0.25, description: 'How often you interact with this person.' },
  { name: 'Content Type', weight: 0.10, description: 'Photo vs video vs carousel preference.' },
  { name: 'Freshness Bonus', weight: 0.10, description: 'Unseen content from close friends gets priority.' },
]

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'Why does Instagram create multiple resolutions of each uploaded photo?',
    options: [
      { id: 'a', text: 'To increase storage revenue for AWS', correct: false },
      { id: 'b', text: 'To serve the optimal size for each device and context (thumbnail, feed, full-screen)', correct: true },
      { id: 'c', text: 'Because S3 requires it', correct: false },
      { id: 'd', text: 'To make the CDN work', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What is the main purpose of a CDN in Instagram\'s architecture?',
    options: [
      { id: 'a', text: 'To store the original photos permanently', correct: false },
      { id: 'b', text: 'To process and resize images', correct: false },
      { id: 'c', text: 'To cache and serve images from edge locations close to users', correct: true },
      { id: 'd', text: 'To run the feed ranking algorithm', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Which feed ranking signal typically has the highest weight?',
    options: [
      { id: 'a', text: 'Content type (photo vs video)', correct: false },
      { id: 'b', text: 'Engagement (likes, comments, shares)', correct: true },
      { id: 'c', text: 'Post age in seconds', correct: false },
      { id: 'd', text: 'Caption length', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Why does Instagram use object storage (S3) instead of a relational database for photos?',
    options: [
      { id: 'a', text: 'Object storage is cheaper and designed for large binary blobs at petabyte scale', correct: true },
      { id: 'b', text: 'Relational databases cannot store files', correct: false },
      { id: 'c', text: 'S3 supports SQL queries on images', correct: false },
      { id: 'd', text: 'Object storage has built-in image editing', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'With 2 billion users each averaging 50 photos at 4 resolutions (~500 KB avg per copy), approximately how much storage is needed?',
    options: [
      { id: 'a', text: '100 terabytes', correct: false },
      { id: 'b', text: '2 petabytes', correct: false },
      { id: 'c', text: '~200 petabytes', correct: true },
      { id: 'd', text: '1 exabyte', correct: false },
    ],
  },
]

/* ──────────────────── sub-components ──────────────────── */

function UploadPipelineSim() {
  const [activeStep, setActiveStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)

  const runPipeline = () => {
    if (isRunning) return
    setIsRunning(true)
    setActiveStep(0)
    let step = 0
    const interval = setInterval(() => {
      step += 1
      if (step >= PIPELINE_STEPS.length) {
        clearInterval(interval)
        setIsRunning(false)
      }
      setActiveStep(step)
    }, 900)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Image Upload Pipeline</h3>
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isRunning
              ? 'bg-quest-surface text-quest-muted cursor-not-allowed'
              : 'bg-quest-primary text-quest-bg hover:opacity-90'
          }`}
        >
          {isRunning ? 'Processing...' : activeStep >= PIPELINE_STEPS.length ? 'Run Again' : 'Start Upload'}
        </button>
      </div>

      {/* Pipeline visual */}
      <div className="relative space-y-3">
        {PIPELINE_STEPS.map((step, i) => {
          const Icon = step.icon
          const isActive = i === activeStep
          const isDone = i < activeStep

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0.4 }}
              animate={{
                opacity: isDone || isActive ? 1 : 0.4,
                scale: isActive ? 1.02 : 1,
              }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                isActive
                  ? 'border-quest-primary bg-quest-primary/10'
                  : isDone
                    ? 'border-green-500/40 bg-green-500/5'
                    : 'border-white/5 bg-quest-surface/50'
              }`}
            >
              {/* Step number / check */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                isDone ? 'bg-green-500/20 text-green-400' : isActive ? 'bg-quest-primary/20 text-quest-primary' : 'bg-quest-surface text-quest-muted'
              }`}>
                {isDone ? <CheckCircle size={16} /> : i + 1}
              </div>

              {/* Icon */}
              <div className={`flex-shrink-0 p-2 rounded-lg bg-quest-bg ${step.color}`}>
                <Icon size={20} />
              </div>

              {/* Label + detail */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{step.label}</p>
                <AnimatePresence>
                  {(isActive || isDone) && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-xs text-quest-muted mt-1"
                    >
                      {step.detail}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Connector line */}
              {i < PIPELINE_STEPS.length - 1 && (
                <div className={`absolute left-[2.35rem] mt-12 w-0.5 h-3 ${
                  isDone ? 'bg-green-500/40' : 'bg-white/10'
                }`} />
              )}
            </motion.div>
          )
        })}
      </div>

      {activeStep >= PIPELINE_STEPS.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm"
        >
          Photo successfully uploaded, processed into 4 resolutions, stored in S3, and cached on the CDN. A user in Tokyo can now load it in under 50ms.
        </motion.div>
      )}
    </div>
  )
}

function FeedRankingSim() {
  const [posts, setPosts] = useState(() => generatePosts())
  const [sortMode, setSortMode] = useState('chronological')

  function generatePosts() {
    const names = ['alice', 'bob', 'carol', 'dave', 'eve', 'frank']
    return names.map((name, i) => ({
      id: i,
      user: name,
      hoursAgo: Math.floor(Math.random() * 48) + 1,
      likes: Math.floor(Math.random() * 5000),
      comments: Math.floor(Math.random() * 300),
      relationship: Math.random().toFixed(2),
      seen: Math.random() > 0.5,
    }))
  }

  const rankedPosts = [...posts].sort((a, b) => {
    if (sortMode === 'chronological') return a.hoursAgo - b.hoursAgo

    const scoreA = computeScore(a)
    const scoreB = computeScore(b)
    return scoreB - scoreA
  })

  function computeScore(post) {
    const recency = Math.max(0, 1 - post.hoursAgo / 48) * FEED_FACTORS[0].weight
    const engagement = ((post.likes + post.comments * 3) / 5000) * FEED_FACTORS[1].weight
    const relationship = post.relationship * FEED_FACTORS[2].weight
    const freshness = (!post.seen ? 0.1 : 0) * FEED_FACTORS[4].weight
    return recency + engagement + relationship + freshness
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Feed Ranking Algorithm</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setSortMode('chronological')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortMode === 'chronological' ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface text-quest-muted hover:text-quest-text'
            }`}
          >
            Chronological
          </button>
          <button
            onClick={() => setSortMode('ranked')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              sortMode === 'ranked' ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface text-quest-muted hover:text-quest-text'
            }`}
          >
            Ranked
          </button>
          <button
            onClick={() => setPosts(generatePosts())}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-quest-surface text-quest-muted hover:text-quest-text transition-all"
          >
            Shuffle
          </button>
        </div>
      </div>

      {/* Weight breakdown */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {FEED_FACTORS.map((f) => (
          <div key={f.name} className="bg-quest-surface/60 rounded-lg p-2 text-center">
            <p className="text-xs font-semibold text-quest-primary">{(f.weight * 100).toFixed(0)}%</p>
            <p className="text-[10px] text-quest-muted">{f.name}</p>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {rankedPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-quest-surface/50 border border-white/5"
            >
              <span className="text-xs font-bold text-quest-muted w-5 text-right">#{idx + 1}</span>
              <div className="w-8 h-8 rounded-full bg-quest-primary/20 flex items-center justify-center text-xs font-bold text-quest-primary uppercase">
                {post.user[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">@{post.user}</p>
                <p className="text-[10px] text-quest-muted">{post.hoursAgo}h ago</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-quest-muted">
                <span className="flex items-center gap-1"><Heart size={12} className="text-red-400" /> {post.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare size={12} className="text-blue-400" /> {post.comments}</span>
              </div>
              {sortMode === 'ranked' && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs font-mono text-quest-primary bg-quest-primary/10 px-2 py-1 rounded"
                >
                  {computeScore(post).toFixed(3)}
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

function StorageArchitectureDiagram() {
  const layers = [
    { label: 'Mobile / Web Client', icon: Upload, color: 'bg-blue-500/20 text-blue-400', desc: 'Takes photo, compresses, sends via HTTPS' },
    { label: 'API Gateway + LB', icon: Globe, color: 'bg-purple-500/20 text-purple-400', desc: 'Auth, rate-limit, routes to upload service' },
    { label: 'Upload Service', icon: Cloud, color: 'bg-cyan-500/20 text-cyan-400', desc: 'Validates, generates ID, writes to queue' },
    { label: 'Image Processor (async)', icon: Image, color: 'bg-yellow-500/20 text-yellow-400', desc: 'Resizes to 4 variants, strips EXIF, generates blurhash' },
    { label: 'Object Storage (S3)', icon: Database, color: 'bg-green-500/20 text-green-400', desc: 'Stores all resolutions. 11 nines durability.' },
    { label: 'Metadata DB (Postgres)', icon: Database, color: 'bg-indigo-500/20 text-indigo-400', desc: 'Photo ID, user, caption, tags, timestamps, S3 keys' },
    { label: 'CDN (CloudFront)', icon: Globe, color: 'bg-orange-500/20 text-orange-400', desc: 'Caches at 200+ edge POPs. Serves to users globally.' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Storage Architecture</h3>
      <div className="space-y-1">
        {layers.map((layer, i) => {
          const Icon = layer.icon
          return (
            <div key={layer.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-quest-surface/50 border border-white/5"
              >
                <div className={`p-2 rounded-lg ${layer.color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{layer.label}</p>
                  <p className="text-xs text-quest-muted">{layer.desc}</p>
                </div>
              </motion.div>
              {i < layers.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-0.5 h-4 bg-quest-primary/30 rounded" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ScaleCalculator() {
  const [users, setUsers] = useState(2000)       // in millions
  const [photosPerUser, setPhotosPerUser] = useState(50)
  const [resolutions, setResolutions] = useState(4)
  const [avgSizeKB, setAvgSizeKB] = useState(500)

  const totalPhotos = users * 1e6 * photosPerUser
  const totalCopies = totalPhotos * resolutions
  const totalStorageBytes = totalCopies * avgSizeKB * 1024
  const totalPB = totalStorageBytes / 1e15

  const dailyUploads = users * 1e6 * 0.01  // 1% upload daily
  const dailyStorageGB = (dailyUploads * resolutions * avgSizeKB * 1024) / 1e9

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Scale Calculator</h3>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-quest-muted block mb-1">Users (millions): {users}M</label>
            <input
              type="range" min={100} max={5000} step={100} value={users}
              onChange={(e) => setUsers(Number(e.target.value))}
              className="w-full accent-quest-primary"
            />
          </div>
          <div>
            <label className="text-xs text-quest-muted block mb-1">Avg photos per user: {photosPerUser}</label>
            <input
              type="range" min={10} max={200} step={10} value={photosPerUser}
              onChange={(e) => setPhotosPerUser(Number(e.target.value))}
              className="w-full accent-quest-primary"
            />
          </div>
          <div>
            <label className="text-xs text-quest-muted block mb-1">Resolutions per photo: {resolutions}</label>
            <input
              type="range" min={1} max={6} step={1} value={resolutions}
              onChange={(e) => setResolutions(Number(e.target.value))}
              className="w-full accent-quest-primary"
            />
          </div>
          <div>
            <label className="text-xs text-quest-muted block mb-1">Avg size per copy (KB): {avgSizeKB}</label>
            <input
              type="range" min={100} max={2000} step={50} value={avgSizeKB}
              onChange={(e) => setAvgSizeKB(Number(e.target.value))}
              className="w-full accent-quest-primary"
            />
          </div>
        </div>

        {/* Output */}
        <div className="space-y-3">
          <div className="bg-quest-surface/60 rounded-lg p-4 border border-white/5">
            <p className="text-xs text-quest-muted mb-1">Total photos</p>
            <p className="text-xl font-bold text-quest-primary">{(totalPhotos / 1e9).toFixed(1)}B</p>
          </div>
          <div className="bg-quest-surface/60 rounded-lg p-4 border border-white/5">
            <p className="text-xs text-quest-muted mb-1">Total stored copies</p>
            <p className="text-xl font-bold text-quest-secondary">{(totalCopies / 1e9).toFixed(1)}B</p>
          </div>
          <div className="bg-quest-surface/60 rounded-lg p-4 border border-white/5">
            <p className="text-xs text-quest-muted mb-1">Total storage</p>
            <p className="text-xl font-bold text-green-400">{totalPB.toFixed(1)} PB</p>
          </div>
          <div className="bg-quest-surface/60 rounded-lg p-4 border border-white/5">
            <p className="text-xs text-quest-muted mb-1">Daily new storage (1% upload rate)</p>
            <p className="text-xl font-bold text-orange-400">{(dailyStorageGB / 1000).toFixed(1)} TB/day</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-quest-muted italic mt-2">
        This excludes replication (typically 3x), video content, Stories, and Reels which multiply storage significantly.
      </p>
    </div>
  )
}

function ArchitectureDiagram() {
  const nodes = [
    { id: 'user', label: 'User', x: 50, y: 30, color: '#60a5fa' },
    { id: 'apigw', label: 'API Gateway', x: 200, y: 30, color: '#a78bfa' },
    { id: 'upload', label: 'Upload Svc', x: 350, y: 30, color: '#22d3ee' },
    { id: 'queue', label: 'Message Queue', x: 350, y: 110, color: '#f472b6' },
    { id: 'processor', label: 'Img Processor', x: 200, y: 110, color: '#fbbf24' },
    { id: 's3', label: 'S3', x: 50, y: 110, color: '#4ade80' },
    { id: 'metadb', label: 'Metadata DB', x: 50, y: 190, color: '#818cf8' },
    { id: 'cdn', label: 'CDN', x: 200, y: 190, color: '#fb923c' },
    { id: 'feed', label: 'Feed Service', x: 350, y: 190, color: '#f87171' },
  ]

  const edges = [
    ['user', 'apigw'], ['apigw', 'upload'], ['upload', 'queue'],
    ['queue', 'processor'], ['processor', 's3'], ['s3', 'cdn'],
    ['s3', 'metadb'], ['cdn', 'user'], ['feed', 'metadb'], ['feed', 'cdn'],
  ]

  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">System Architecture Overview</h3>
      <div className="bg-quest-bg rounded-xl p-4 overflow-x-auto">
        <svg viewBox="0 0 450 240" className="w-full max-w-2xl mx-auto" style={{ minHeight: 240 }}>
          {/* Edges */}
          {edges.map(([from, to], i) => {
            const a = nodeMap[from]
            const b = nodeMap[to]
            return (
              <motion.line
                key={i}
                x1={a.x + 45} y1={a.y + 20}
                x2={b.x + 45} y2={b.y + 20}
                stroke="#6366f1" strokeWidth={1.5} strokeOpacity={0.4}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
              />
            )
          })}
          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <rect
                x={node.x} y={node.y}
                width={90} height={40} rx={8}
                fill={node.color + '22'}
                stroke={node.color}
                strokeWidth={1.5}
              />
              <text
                x={node.x + 45} y={node.y + 24}
                textAnchor="middle" fill={node.color}
                fontSize={11} fontWeight="600"
              >
                {node.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </div>
      <p className="text-xs text-quest-muted text-center">
        Arrows show data flow: upload path (top row), processing (middle), and serving (bottom).
      </p>
    </div>
  )
}

/* ──────────────────── main component ──────────────────── */

export default function Level52({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['intro', 'pipeline', 'feed', 'storage', 'scale', 'architecture', 'quiz']
  const sectionLabels = ['Intro', 'Upload Pipeline', 'Feed Ranking', 'Storage', 'Scale Math', 'Architecture', 'Quiz']

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    const selected = quizAnswers[q.id]
    const correct = q.options.find(o => o.correct)?.id
    return acc + (selected === correct ? 1 : 0)
  }, 0)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Navigation */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentSection === index
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
            }`}
          >
            {index + 1}. {sectionLabels[index]}
          </button>
        ))}
      </div>

      {/* ──── SECTION 0: INTRO ──── */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Design Instagram: Photo Sharing at Scale</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "2 billion users sharing photos. How do you store, process, and serve them all?"
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              Instagram handles one of the internet's hardest problems: storing and serving
              billions of images to users worldwide with low latency. This involves{' '}
              <Term word="Object Storage" definition="A storage architecture that manages data as objects (blobs) rather than files or blocks. S3 is the canonical example. Ideal for images, videos, and large unstructured data." onLearn={learnTerm} />,{' '}
              <Term word="CDN" definition="Content Delivery Network. A globally distributed network of proxy servers that cache content at edge locations to reduce latency. Serves static assets (images, CSS, JS) close to users." onLearn={learnTerm} />,{' '}
              <Term word="Image Processing" definition="Server-side manipulation of images: resizing, compression, format conversion, thumbnail generation. Often done asynchronously via a worker queue." onLearn={learnTerm} />, and a sophisticated{' '}
              <Term word="Feed Algorithm" definition="A ranking system that decides what content to show each user and in what order. Uses signals like engagement, recency, and relationship strength." onLearn={learnTerm} />.
            </p>

            <div className="grid md:grid-cols-3 gap-4 my-6">
              <div className="bg-quest-surface/60 rounded-lg p-4 text-center border border-white/5">
                <p className="text-3xl font-bold text-quest-primary mb-1">2B+</p>
                <p className="text-xs text-quest-muted">Monthly active users</p>
              </div>
              <div className="bg-quest-surface/60 rounded-lg p-4 text-center border border-white/5">
                <p className="text-3xl font-bold text-quest-secondary mb-1">100M+</p>
                <p className="text-xs text-quest-muted">Photos uploaded daily</p>
              </div>
              <div className="bg-quest-surface/60 rounded-lg p-4 text-center border border-white/5">
                <p className="text-3xl font-bold text-green-400 mb-1">200+ PB</p>
                <p className="text-xs text-quest-muted">Estimated storage</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-3">Key Design Challenges</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Upload Pipeline', desc: 'Accept, validate, process, and store photos reliably at 100M+/day.' },
                { title: 'Image Processing', desc: 'Generate multiple resolutions, strip metadata, create thumbnails -- all asynchronously.' },
                { title: 'Storage Strategy', desc: 'Petabytes of images in object storage with metadata in a relational DB.' },
                { title: 'Global Delivery', desc: 'Serve any image anywhere in < 100ms via a worldwide CDN.' },
                { title: 'Feed Ranking', desc: 'Show each user the most relevant posts from hundreds of follows.' },
                { title: 'Recommendation', desc: 'Surface content from accounts users don\'t follow via ML-powered Explore.' },
              ].map((item) => (
                <div key={item.title} className="bg-quest-surface/50 rounded-lg p-3 border border-white/5">
                  <p className="text-sm font-semibold text-quest-primary">{item.title}</p>
                  <p className="text-xs text-quest-muted mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            <DeepDive id="instagram-history" title="How Instagram started" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted">
                Instagram launched in October 2010 with just 2 engineers. Within 24 hours it had 25,000 users.
                The original stack was a single Django server on AWS. They initially stored photos directly on
                EC2 instances before migrating to S3. By the time Facebook acquired Instagram in 2012 for $1B,
                they had 30 million users and only 13 employees. The architecture evolved from a single server
                to a distributed system spanning thousands of machines, but the core insight remained: keep the
                upload flow simple, process asynchronously, and cache aggressively at the edge.
              </p>
            </DeepDive>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setCurrentSection(1)}
              className="px-6 py-2 bg-quest-primary text-quest-bg rounded-lg font-medium hover:opacity-90 transition-all"
            >
              Next: Upload Pipeline
            </button>
          </div>
        </motion.div>
      )}

      {/* ──── SECTION 1: UPLOAD PIPELINE ──── */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Image Upload Pipeline</h2>

            <p className="text-quest-muted mb-6">
              When a user taps "Share", a carefully orchestrated pipeline kicks off. The photo travels
              through multiple services before it's ready to appear in anyone's feed. This pipeline must
              handle failures gracefully -- if the{' '}
              <Term word="Image Processor" definition="A service (often a pool of workers) that takes raw uploaded images and produces optimized versions at multiple resolutions. Typically consumes from a message queue for async processing." onLearn={learnTerm} />{' '}
              crashes mid-resize, the original is safe in{' '}
              <Term word="S3" definition="Amazon Simple Storage Service. Object storage with 99.999999999% (11 nines) durability. The de facto standard for storing images, videos, and files at scale." onLearn={learnTerm} />.
            </p>

            <UploadPipelineSim />

            <DeepDive id="async-processing" title="Why asynchronous processing matters" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                If Instagram processed images synchronously (resize before returning a response to the user),
                upload latency would spike to 5-10 seconds. Instead, the upload service immediately stores the
                original in S3, writes metadata to the database, and puts a message on a queue. The user gets
                an instant "uploaded!" response.
              </p>
              <p className="text-sm text-quest-muted mb-2">
                Background workers pull from the queue, generate resolutions, and update the database with
                new S3 keys. If a worker crashes, the message stays on the queue and another worker picks it up.
                This pattern is called <strong className="text-quest-text">at-least-once processing</strong>.
              </p>
              <p className="text-sm text-quest-muted">
                The resolutions typically generated are: thumbnail (150x150 for grid), small (320px for previews),
                medium (640px for feed), and large (1080px for full-screen). Each resolution is stored as a
                separate object in S3 with a predictable key pattern like:
                <code className="text-quest-primary ml-1">photos/{'{user_id}'}/{'{photo_id}'}/640.webp</code>
              </p>
            </DeepDive>

            <DeepDive id="upload-reliability" title="Handling upload failures" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                Mobile uploads are notoriously unreliable -- users lose signal, switch from WiFi to cellular,
                or close the app mid-upload. Instagram uses <strong className="text-quest-text">resumable uploads</strong>:
                the client breaks the image into chunks and can resume from the last successful chunk.
              </p>
              <p className="text-sm text-quest-muted">
                On the server side, idempotency keys ensure that retried uploads don't create duplicate photos.
                Each upload request includes a client-generated UUID; the server deduplicates on this key.
              </p>
            </DeepDive>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(0)} className="px-6 py-2 bg-quest-surface text-quest-muted rounded-lg font-medium hover:text-quest-text transition-all">
              Back
            </button>
            <button onClick={() => setCurrentSection(2)} className="px-6 py-2 bg-quest-primary text-quest-bg rounded-lg font-medium hover:opacity-90 transition-all">
              Next: Feed Ranking
            </button>
          </div>
        </motion.div>
      )}

      {/* ──── SECTION 2: FEED RANKING ──── */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Feed Generation & Ranking</h2>

            <p className="text-quest-muted mb-4">
              Instagram abandoned reverse-chronological feeds in 2016. The{' '}
              <Term word="Feed Algorithm" definition="A ranking system that decides what content to show each user and in what order. Uses signals like engagement, recency, and relationship strength." onLearn={learnTerm} />{' '}
              now considers hundreds of signals to rank posts. Toggle between chronological and
              ranked views below to see the difference.
            </p>

            <p className="text-quest-muted mb-6 text-sm">
              The{' '}
              <Term word="Recommendation" definition="ML-based system that suggests content from accounts a user doesn't follow. Powers the Explore page and 'Suggested Posts' in the feed. Uses collaborative filtering and content-based signals." onLearn={learnTerm} />{' '}
              engine extends this further for the Explore page, surfacing content from accounts you
              don't follow based on collaborative filtering and content embeddings.
            </p>

            <FeedRankingSim />

            <DeepDive id="feed-generation" title="How feed generation works at scale" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                When a user opens Instagram, the feed service must assemble a personalized feed in
                under 200ms. The process:
              </p>
              <ol className="text-sm text-quest-muted space-y-1 list-decimal list-inside mb-2">
                <li>Fetch candidate posts from all followed accounts (last 48-72 hours)</li>
                <li>Run the ranking model on each candidate (a lightweight ML model)</li>
                <li>Apply diversity rules (don't show 5 posts from one person in a row)</li>
                <li>Inject ads at calculated positions</li>
                <li>Return the top ~50 posts, paginate the rest</li>
              </ol>
              <p className="text-sm text-quest-muted">
                For users who follow 500+ accounts, the candidate set can be 10,000+ posts.
                Pre-computing candidate sets and caching intermediate results is essential.
                Instagram uses a <strong className="text-quest-text">fan-out-on-read</strong> approach:
                the feed is assembled when requested, not pre-built on every post.
              </p>
            </DeepDive>

            <DeepDive id="explore-page" title="The Explore page recommendation engine" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                The Explore page uses a multi-stage recommendation pipeline:
              </p>
              <ol className="text-sm text-quest-muted space-y-1 list-decimal list-inside">
                <li><strong className="text-quest-text">Candidate generation:</strong> Retrieve ~10,000 candidates from accounts similar to ones you engage with</li>
                <li><strong className="text-quest-text">First-pass ranking:</strong> A fast model scores candidates on predicted engagement</li>
                <li><strong className="text-quest-text">Second-pass ranking:</strong> A heavier model re-ranks the top ~500 with more features</li>
                <li><strong className="text-quest-text">Filtering:</strong> Remove policy-violating content, near-duplicates, and content from blocked accounts</li>
                <li><strong className="text-quest-text">Blending:</strong> Mix content types (photos, Reels, topics) for diversity</li>
              </ol>
            </DeepDive>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(1)} className="px-6 py-2 bg-quest-surface text-quest-muted rounded-lg font-medium hover:text-quest-text transition-all">
              Back
            </button>
            <button onClick={() => setCurrentSection(3)} className="px-6 py-2 bg-quest-primary text-quest-bg rounded-lg font-medium hover:opacity-90 transition-all">
              Next: Storage
            </button>
          </div>
        </motion.div>
      )}

      {/* ──── SECTION 3: STORAGE ──── */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Storage Architecture</h2>

            <p className="text-quest-muted mb-6">
              Instagram's storage is split into two layers:{' '}
              <Term word="Object Storage" definition="A storage architecture that manages data as objects (blobs) rather than files or blocks. S3 is the canonical example. Ideal for images, videos, and large unstructured data." onLearn={learnTerm} />{' '}
              for the actual image bytes, and a relational database for metadata (who posted it,
              captions, tags, timestamps). This separation is key -- you never want to store
              binary blobs in a relational database.
            </p>

            <StorageArchitectureDiagram />

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-quest-surface/50 rounded-lg p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-green-400 mb-2">Object Storage (S3)</h4>
                <ul className="text-xs text-quest-muted space-y-1">
                  <li>Stores actual image bytes</li>
                  <li>Multiple resolutions per photo</li>
                  <li>99.999999999% durability (11 nines)</li>
                  <li>Automatic replication across AZs</li>
                  <li>Lifecycle policies for cost optimization</li>
                </ul>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-indigo-400 mb-2">Metadata DB (PostgreSQL)</h4>
                <ul className="text-xs text-quest-muted space-y-1">
                  <li>Photo ID, user ID, caption, tags</li>
                  <li>Timestamps, location, S3 keys</li>
                  <li>Likes count, comments count</li>
                  <li>Sharded by user ID for scale</li>
                  <li>Read replicas for feed queries</li>
                </ul>
              </div>
            </div>

            <DeepDive id="storage-strategy" title="Storage tiers and cost optimization" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                Not all photos are accessed equally. A photo posted today will get 90% of its views
                in the first 48 hours. Instagram likely uses S3 storage classes:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside">
                <li><strong className="text-quest-text">S3 Standard:</strong> Recent photos (last 30 days). Highest cost but lowest latency.</li>
                <li><strong className="text-quest-text">S3 Infrequent Access:</strong> Photos 30-180 days old. 40% cheaper storage, slight retrieval fee.</li>
                <li><strong className="text-quest-text">S3 Glacier:</strong> Archived photos rarely accessed. 80% cheaper. Minutes to retrieve.</li>
              </ul>
              <p className="text-sm text-quest-muted mt-2">
                The CDN acts as the "hot" cache layer -- frequently accessed images are served entirely
                from edge locations and never hit S3 at all.
              </p>
            </DeepDive>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(2)} className="px-6 py-2 bg-quest-surface text-quest-muted rounded-lg font-medium hover:text-quest-text transition-all">
              Back
            </button>
            <button onClick={() => setCurrentSection(4)} className="px-6 py-2 bg-quest-primary text-quest-bg rounded-lg font-medium hover:opacity-90 transition-all">
              Next: Scale Math
            </button>
          </div>
        </motion.div>
      )}

      {/* ──── SECTION 4: SCALE ──── */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Scale Math: Back-of-the-Envelope</h2>

            <p className="text-quest-muted mb-6">
              System design interviews love "napkin math." Drag the sliders to see how Instagram's
              storage requirements change with different assumptions. The numbers are staggering --
              this is why{' '}
              <Term word="Object Storage" definition="A storage architecture that manages data as objects (blobs) rather than files or blocks. S3 is the canonical example. Ideal for images, videos, and large unstructured data." onLearn={learnTerm} />{' '}
              and{' '}
              <Term word="CDN" definition="Content Delivery Network. A globally distributed network of proxy servers that cache content at edge locations to reduce latency." onLearn={learnTerm} />{' '}
              are non-negotiable at this scale.
            </p>

            <ScaleCalculator />

            <DeepDive id="bandwidth-math" title="Bandwidth estimation" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                Storage is only half the equation. Let's estimate read bandwidth:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside mb-2">
                <li>2B MAU, ~500M DAU</li>
                <li>Each user views ~30 photos per session, 2 sessions/day = 60 photos/day</li>
                <li>500M x 60 = 30B image views per day</li>
                <li>Average served size: ~200KB (medium resolution, WebP)</li>
                <li>30B x 200KB = 6 exabytes/day = ~555 Tbps peak</li>
              </ul>
              <p className="text-sm text-quest-muted">
                This is why the CDN is critical. Without edge caching, this traffic would
                crush any origin server cluster. The CDN absorbs 95%+ of read traffic.
              </p>
            </DeepDive>

            <DeepDive id="cost-estimate" title="Cost estimation at scale" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                Rough AWS cost estimates for 200 PB of storage:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside">
                <li>S3 Standard (50 PB active): ~$1.15M/month</li>
                <li>S3 IA (100 PB): ~$1.25M/month</li>
                <li>S3 Glacier (50 PB): ~$0.2M/month</li>
                <li>CDN bandwidth (555 Tbps): Negotiated enterprise pricing, likely $5-10M/month</li>
                <li>Total storage + delivery: ~$8-13M/month</li>
              </ul>
              <p className="text-sm text-quest-muted mt-2">
                In reality, Meta runs its own data centers and CDN (Facebook Edge Network), so actual
                costs are much lower than AWS list prices. This is why hyperscalers build their own
                infrastructure at this scale.
              </p>
            </DeepDive>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(3)} className="px-6 py-2 bg-quest-surface text-quest-muted rounded-lg font-medium hover:text-quest-text transition-all">
              Back
            </button>
            <button onClick={() => setCurrentSection(5)} className="px-6 py-2 bg-quest-primary text-quest-bg rounded-lg font-medium hover:opacity-90 transition-all">
              Next: Architecture
            </button>
          </div>
        </motion.div>
      )}

      {/* ──── SECTION 5: ARCHITECTURE DIAGRAM ──── */}
      {currentSection === 5 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Full Architecture Diagram</h2>

            <p className="text-quest-muted mb-6">
              Here is the complete high-level design bringing all the pieces together: the upload
              path, asynchronous processing, storage layer, and content delivery.
            </p>

            <ArchitectureDiagram />

            <div className="mt-6 grid md:grid-cols-3 gap-3">
              <div className="bg-quest-surface/50 rounded-lg p-3 border border-white/5">
                <h4 className="text-sm font-semibold text-blue-400 mb-1">Write Path (Upload)</h4>
                <p className="text-xs text-quest-muted">
                  User &rarr; API Gateway &rarr; Upload Service &rarr; S3 (original) &rarr; Queue &rarr; Image Processor &rarr; S3 (resized) &rarr; Update Metadata DB
                </p>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-3 border border-white/5">
                <h4 className="text-sm font-semibold text-green-400 mb-1">Read Path (Feed)</h4>
                <p className="text-xs text-quest-muted">
                  User &rarr; API Gateway &rarr; Feed Service &rarr; Metadata DB &rarr; CDN URLs &rarr; CDN serves images from edge
                </p>
              </div>
              <div className="bg-quest-surface/50 rounded-lg p-3 border border-white/5">
                <h4 className="text-sm font-semibold text-orange-400 mb-1">CDN Cache Miss</h4>
                <p className="text-xs text-quest-muted">
                  CDN edge &rarr; CDN origin shield &rarr; S3 &rarr; Response cached at edge for future requests
                </p>
              </div>
            </div>

            <DeepDive id="scaling-services" title="How each service scales independently" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                Each box in the architecture is a separate, independently scalable service:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside">
                <li><strong className="text-quest-text">API Gateway:</strong> Horizontally scaled behind a load balancer. Stateless.</li>
                <li><strong className="text-quest-text">Upload Service:</strong> Auto-scales based on upload queue depth.</li>
                <li><strong className="text-quest-text">Image Processor:</strong> Worker pool that scales with queue length. Can burst during peak hours.</li>
                <li><strong className="text-quest-text">Feed Service:</strong> CPU-intensive (ranking). Scaled by request rate. Caches hot feeds.</li>
                <li><strong className="text-quest-text">Metadata DB:</strong> Sharded by user_id. Read replicas for feed queries.</li>
                <li><strong className="text-quest-text">S3:</strong> Effectively infinite scale. No capacity planning needed.</li>
                <li><strong className="text-quest-text">CDN:</strong> Auto-scales. 200+ POPs globally.</li>
              </ul>
            </DeepDive>

            <DeepDive id="failure-handling" title="Failure modes and resilience" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-2">
                What happens when things break?
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside">
                <li><strong className="text-quest-text">Upload Service down:</strong> API Gateway returns 503. Client retries with exponential backoff.</li>
                <li><strong className="text-quest-text">Image Processor down:</strong> Messages queue up. When workers recover, they drain the backlog. Photos appear with a delay.</li>
                <li><strong className="text-quest-text">Metadata DB down:</strong> Feed service falls back to cached feeds. New uploads are queued.</li>
                <li><strong className="text-quest-text">S3 outage:</strong> Extremely rare (11 nines). CDN continues serving cached images. New uploads buffer.</li>
                <li><strong className="text-quest-text">CDN down:</strong> Fallback to origin (S3 directly). Latency spikes but service continues.</li>
              </ul>
            </DeepDive>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(4)} className="px-6 py-2 bg-quest-surface text-quest-muted rounded-lg font-medium hover:text-quest-text transition-all">
              Back
            </button>
            <button onClick={() => setCurrentSection(6)} className="px-6 py-2 bg-quest-primary text-quest-bg rounded-lg font-medium hover:opacity-90 transition-all">
              Next: Quiz
            </button>
          </div>
        </motion.div>
      )}

      {/* ──── SECTION 6: QUIZ ──── */}
      {currentSection === 6 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Test your understanding of Instagram's architecture. Select the best answer for each question.
            </p>

            <div className="space-y-8">
              {QUIZ_QUESTIONS.map((q, qi) => {
                const selectedId = quizAnswers[q.id]
                const correctId = q.options.find(o => o.correct)?.id

                return (
                  <div key={q.id} className="bg-quest-surface/50 rounded-lg p-5 border border-white/5">
                    <p className="font-semibold mb-3 text-sm">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        let optionStyle = 'border-white/10 hover:border-quest-primary/50'
                        if (quizSubmitted) {
                          if (opt.id === correctId) optionStyle = 'border-green-500 bg-green-500/10'
                          else if (opt.id === selectedId && opt.id !== correctId) optionStyle = 'border-red-500 bg-red-500/10'
                        } else if (selectedId === opt.id) {
                          optionStyle = 'border-quest-primary bg-quest-primary/10'
                        }

                        return (
                          <button
                            key={opt.id}
                            onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                            disabled={quizSubmitted}
                            className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all ${optionStyle}`}
                          >
                            <span className="font-medium mr-2 text-quest-muted">{opt.id.toUpperCase()}.</span>
                            {opt.text}
                            {quizSubmitted && opt.id === correctId && (
                              <CheckCircle size={16} className="inline ml-2 text-green-400" />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {!quizSubmitted ? (
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length
                      ? 'bg-quest-surface text-quest-muted cursor-not-allowed'
                      : 'bg-quest-primary text-quest-bg hover:opacity-90'
                  }`}
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 p-5 rounded-lg border ${
                  correctCount >= 4
                    ? 'bg-green-500/10 border-green-500/30'
                    : correctCount >= 3
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle size={24} className={correctCount >= 4 ? 'text-green-400' : correctCount >= 3 ? 'text-yellow-400' : 'text-red-400'} />
                  <p className="text-lg font-bold">
                    {correctCount} / {QUIZ_QUESTIONS.length} correct
                  </p>
                </div>
                <p className="text-sm text-quest-muted">
                  {correctCount === QUIZ_QUESTIONS.length
                    ? 'Perfect score! You have a solid grasp of Instagram\'s architecture.'
                    : correctCount >= 4
                      ? 'Great job! You understand the key concepts well.'
                      : correctCount >= 3
                        ? 'Good effort. Review the sections you missed and try to understand why.'
                        : 'Consider reviewing the earlier sections before moving on.'}
                </p>
                {isCompleted && (
                  <p className="text-sm text-green-400 mt-2 font-medium">Level 52 complete!</p>
                )}
              </motion.div>
            )}
          </div>

          <div className="flex justify-start">
            <button onClick={() => setCurrentSection(5)} className="px-6 py-2 bg-quest-surface text-quest-muted rounded-lg font-medium hover:text-quest-text transition-all">
              Back
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

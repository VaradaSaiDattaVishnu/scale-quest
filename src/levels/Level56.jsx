import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Play, Upload, ThumbsUp, MessageSquare, BarChart, Tv
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

/* ── Glossary ── */
const terms = {
  'Video Processing Pipeline': 'A sequence of steps that transforms a raw uploaded video into multiple playable formats, including transcoding, thumbnail generation, and quality checks.',
  'Transcoding': 'Converting a video from one encoding format to another, typically to produce multiple resolutions (360p, 720p, 1080p, 4K) and codecs (H.264, VP9, AV1).',
  'DAG': 'Directed Acyclic Graph -- a graph of tasks with dependencies but no cycles, used to orchestrate parallel video processing steps.',
  'CDN': 'Content Delivery Network -- a geographically distributed network of servers that cache and deliver video content close to viewers for low latency.',
  'Adaptive Bitrate Streaming': 'A technique where the video player dynamically switches between quality levels based on the viewer\'s available bandwidth.',
  'HLS': 'HTTP Live Streaming -- Apple\'s adaptive streaming protocol that breaks video into small segments served over standard HTTP.',
  'DASH': 'Dynamic Adaptive Streaming over HTTP -- an international standard for adaptive bitrate streaming, similar to HLS.',
  'RTMP': 'Real-Time Messaging Protocol -- a low-latency protocol originally designed by Adobe for live video ingest from encoders to servers.',
  'Collaborative Filtering': 'A recommendation technique that finds users with similar watch patterns and recommends what those similar users enjoyed.',
  'Content-Based Filtering': 'A recommendation technique that analyzes video metadata (tags, title, category) to suggest similar content to what a user has watched.',
  'Thumbnail Generation': 'The automated process of extracting representative frames from a video and optionally running A/B tests to find the most clickable thumbnail.',
  'Video Chunking': 'Splitting a large video file into smaller segments (typically 2-10 seconds each) to enable adaptive streaming and parallel processing.',
  'Object Storage': 'A storage architecture (like S3 or GCS) that manages data as objects/blobs, ideal for storing large video files at massive scale.',
  'Message Queue': 'A system (like Kafka or RabbitMQ) that decouples video upload from processing by queuing tasks for asynchronous consumption by worker pools.',
  'Fan-Out': 'A pattern where a single event (video upload) triggers multiple parallel downstream tasks (transcoding to different resolutions).',
}

/* ── Upload Pipeline Stages ── */
const uploadStages = [
  { id: 'upload', label: 'Raw Upload', icon: 'Upload', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40', detail: 'User uploads raw video file (could be 1GB+). Stored in a temporary staging bucket.' },
  { id: 'chunk', label: 'Chunking', icon: 'split', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40', detail: 'Video split into small segments (2-10s each) for parallel processing and adaptive streaming.' },
  { id: 'transcode', label: 'Transcode', icon: 'transcode', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', detail: 'Each chunk encoded into multiple resolutions (360p, 720p, 1080p, 4K) and codecs (H.264, VP9, AV1).' },
  { id: 'thumbnail', label: 'Thumbnails', icon: 'image', color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/40', detail: 'Extract keyframes, generate candidate thumbnails, optionally run ML-based selection for best thumbnail.' },
  { id: 'metadata', label: 'Metadata', icon: 'tag', color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/40', detail: 'Extract duration, resolution, audio tracks. Run content moderation, copyright detection (Content ID).' },
  { id: 'cdn', label: 'CDN Push', icon: 'globe', color: 'text-cyan-400', bg: 'bg-cyan-500/20', border: 'border-cyan-500/40', detail: 'Processed segments pushed to CDN edge servers worldwide. Video becomes playable.' },
]

/* ── DAG Processing Tasks ── */
const dagTasks = [
  { id: 'ingest', label: 'Ingest', x: 50, y: 20, deps: [], duration: 2, color: 'bg-blue-500' },
  { id: 'audio', label: 'Audio Extract', x: 20, y: 45, deps: ['ingest'], duration: 3, color: 'bg-purple-500' },
  { id: 'video-split', label: 'Video Split', x: 50, y: 45, deps: ['ingest'], duration: 2, color: 'bg-yellow-500' },
  { id: 'metadata-extract', label: 'Metadata', x: 80, y: 45, deps: ['ingest'], duration: 1, color: 'bg-orange-500' },
  { id: 'transcode-360', label: '360p Encode', x: 15, y: 70, deps: ['video-split'], duration: 4, color: 'bg-green-500' },
  { id: 'transcode-720', label: '720p Encode', x: 40, y: 70, deps: ['video-split'], duration: 6, color: 'bg-green-500' },
  { id: 'transcode-1080', label: '1080p Encode', x: 65, y: 70, deps: ['video-split'], duration: 8, color: 'bg-green-500' },
  { id: 'thumbnail-gen', label: 'Thumbnails', x: 90, y: 70, deps: ['video-split', 'metadata-extract'], duration: 3, color: 'bg-pink-500' },
  { id: 'manifest', label: 'HLS Manifest', x: 50, y: 95, deps: ['transcode-360', 'transcode-720', 'transcode-1080', 'audio', 'thumbnail-gen'], duration: 1, color: 'bg-cyan-500' },
]

/* ── DAG edges for rendering ── */
const dagEdges = []
dagTasks.forEach(task => {
  task.deps.forEach(dep => {
    const parent = dagTasks.find(t => t.id === dep)
    if (parent) dagEdges.push({ from: parent, to: task })
  })
})

/* ── Recommendation engine data ── */
const watchHistory = [
  { id: 'v1', title: 'React Hooks Tutorial', category: 'Programming', views: '1.2M' },
  { id: 'v2', title: 'System Design Interview', category: 'Programming', views: '890K' },
  { id: 'v3', title: 'Docker in 100 Seconds', category: 'DevOps', views: '3.1M' },
  { id: 'v4', title: 'Kubernetes Explained', category: 'DevOps', views: '2.4M' },
]

const collaborativeResults = [
  { id: 'c1', title: 'Microservices Architecture', score: 0.94, reason: 'Users who watched your videos also watched this' },
  { id: 'c2', title: 'AWS Lambda Deep Dive', score: 0.89, reason: '87% overlap with similar user profiles' },
  { id: 'c3', title: 'GraphQL vs REST', score: 0.85, reason: 'Trending among your cohort' },
]

const contentBasedResults = [
  { id: 'cb1', title: 'Advanced React Patterns', score: 0.92, reason: 'Matches tags: react, javascript, frontend' },
  { id: 'cb2', title: 'Redis Crash Course', score: 0.78, reason: 'Matches category: Programming + DevOps' },
  { id: 'cb3', title: 'CI/CD Pipeline Tutorial', score: 0.75, reason: 'Matches tags: docker, devops, deployment' },
]

const rankedResults = [
  { id: 'r1', title: 'Microservices Architecture', finalScore: 0.96, source: 'Collaborative + Content', boost: 'Watch time boost' },
  { id: 'r2', title: 'Advanced React Patterns', finalScore: 0.93, source: 'Content-based', boost: 'Recency boost' },
  { id: 'r3', title: 'AWS Lambda Deep Dive', finalScore: 0.90, source: 'Collaborative', boost: 'Popularity boost' },
  { id: 'r4', title: 'CI/CD Pipeline Tutorial', finalScore: 0.82, source: 'Content-based', boost: 'Diversity factor' },
  { id: 'r5', title: 'GraphQL vs REST', finalScore: 0.79, source: 'Collaborative', boost: 'Freshness decay' },
]

/* ── Live streaming pipeline ── */
const liveStreamStages = [
  { id: 'capture', label: 'Camera / OBS', detail: 'Streamer captures video at source resolution (1080p/4K) using encoding software.', color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 'rtmp-ingest', label: 'RTMP Ingest', detail: 'Video stream sent via RTMP to nearest ingest server. Low latency (<1s to server).', color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { id: 'live-transcode', label: 'Live Transcode', detail: 'Real-time transcoding to multiple quality levels. Must keep up with live feed -- no retries.', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { id: 'segment', label: 'HLS/DASH Segment', detail: 'Transcoded output split into 2-6 second segments. Manifest file updated continuously.', color: 'text-green-400', bg: 'bg-green-500/20' },
  { id: 'cdn-edge', label: 'CDN Edge', detail: 'Segments cached at edge servers globally. Viewers pull latest segments via HTTP.', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { id: 'viewer', label: 'Viewers (10K+)', detail: 'Players use adaptive bitrate to pick quality. Typical end-to-end latency: 5-30 seconds.', color: 'text-blue-400', bg: 'bg-blue-500/20' },
]

/* ── Scale numbers ── */
const scaleNumbers = [
  { label: 'Videos uploaded / minute', value: '500+ hours', color: 'text-red-400' },
  { label: 'Daily active users', value: '2+ billion', color: 'text-blue-400' },
  { label: 'Storage (estimated)', value: '~1 exabyte', color: 'text-purple-400' },
  { label: 'Bandwidth per day', value: '~100 petabytes', color: 'text-green-400' },
  { label: 'Video formats per upload', value: '~20 variants', color: 'text-yellow-400' },
  { label: 'CDN edge locations', value: '2,500+', color: 'text-cyan-400' },
  { label: 'Recommendations served / day', value: '~1 billion hours watched', color: 'text-orange-400' },
  { label: 'Comments per day', value: '~500 million', color: 'text-pink-400' },
]

/* ── Quiz Questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'Why does YouTube transcode each video into multiple resolutions and codecs?',
    options: [
      'To reduce storage costs',
      'To enable adaptive bitrate streaming for varying network conditions',
      'To make videos load faster on the server',
      'To comply with copyright regulations',
    ],
    correct: 1,
    explanation: 'Adaptive bitrate streaming allows the player to dynamically switch quality based on the viewer\'s bandwidth, ensuring smooth playback across all network conditions.',
  },
  {
    id: 'q2',
    question: 'What is the primary advantage of using a DAG for video processing?',
    options: [
      'It reduces the total number of processing steps',
      'It ensures tasks run in a strict sequential order',
      'It allows independent tasks to run in parallel while respecting dependencies',
      'It eliminates the need for a message queue',
    ],
    correct: 2,
    explanation: 'A DAG models task dependencies so that independent tasks (like transcoding to different resolutions) run in parallel, while dependent tasks (like manifest generation) wait for their prerequisites.',
  },
  {
    id: 'q3',
    question: 'In YouTube\'s recommendation system, what does collaborative filtering primarily rely on?',
    options: [
      'Video metadata like tags and descriptions',
      'The upload date of videos',
      'Behavior patterns of users with similar watch histories',
      'The number of likes on a video',
    ],
    correct: 2,
    explanation: 'Collaborative filtering finds users with similar viewing patterns and recommends content that similar users enjoyed, leveraging the "wisdom of the crowd."',
  },
  {
    id: 'q4',
    question: 'What protocol do most live streamers use to send their feed to YouTube\'s ingest servers?',
    options: [
      'HTTP/2',
      'WebSocket',
      'RTMP (Real-Time Messaging Protocol)',
      'gRPC',
    ],
    correct: 2,
    explanation: 'RTMP is the standard protocol for live video ingest. It provides low-latency, reliable delivery from the encoder to the ingest server, though viewers receive the stream via HLS/DASH over HTTP.',
  },
  {
    id: 'q5',
    question: 'How does live streaming differ from VOD (Video on Demand) in terms of transcoding?',
    options: [
      'Live streaming does not require transcoding',
      'Live transcoding must happen in real-time with no retries, while VOD can process offline',
      'VOD uses higher quality transcoding than live',
      'Live streaming uses a different codec entirely',
    ],
    correct: 1,
    explanation: 'Live transcoding must keep pace with the real-time feed -- if a frame is missed, it cannot be retried. VOD transcoding can take its time and retry on failures since the content is already stored.',
  },
  {
    id: 'q6',
    question: 'At YouTube\'s scale, what is the best approach for the comments system?',
    options: [
      'Store all comments in a single SQL table with video_id as a foreign key',
      'Use a denormalized NoSQL store sharded by video_id with eventual consistency',
      'Store comments in the same database as video metadata',
      'Cache all comments in Redis and never persist to disk',
    ],
    correct: 1,
    explanation: 'At 500M+ comments per day, a sharded NoSQL store partitioned by video_id provides the write throughput and horizontal scalability needed. Eventual consistency is acceptable for comments.',
  },
  {
    id: 'q7',
    question: 'Why does YouTube use a CDN with thousands of edge locations?',
    options: [
      'To store the original uploaded video files',
      'To run transcoding closer to users',
      'To serve video segments from servers geographically close to viewers, reducing latency',
      'To reduce the cost of cloud computing',
    ],
    correct: 2,
    explanation: 'CDN edge servers cache popular video segments close to viewers, reducing round-trip time and backbone bandwidth. A viewer in Tokyo gets content from a nearby edge rather than a US data center.',
  },
  {
    id: 'q8',
    question: 'What is the purpose of generating an HLS manifest file?',
    options: [
      'It stores the video thumbnail URL',
      'It lists all available quality levels and segment URLs so the player can switch adaptively',
      'It contains the video\'s copyright information',
      'It is a log file for debugging playback issues',
    ],
    correct: 1,
    explanation: 'The HLS manifest (m3u8 file) lists all available quality variants and their segment URLs. The player reads this manifest to know which segments to fetch and can switch qualities mid-stream.',
  },
]

/* ── Tab configuration ── */
const tabs = [
  { id: 'story', label: 'Overview', icon: Tv },
  { id: 'upload', label: 'Upload Pipeline', icon: Upload },
  { id: 'dag', label: 'Processing DAG', icon: BarChart },
  { id: 'recommend', label: 'Recommendations', icon: ThumbsUp },
  { id: 'live', label: 'Live Streaming', icon: Play },
  { id: 'quiz', label: 'Quiz', icon: CheckCircle },
]

/* ── Main Component ── */
export default function Level56({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [activeTab, setActiveTab] = useState('story')

  /* Upload pipeline state */
  const [pipelineStep, setPipelineStep] = useState(-1)
  const [pipelineRunning, setPipelineRunning] = useState(false)

  /* DAG state */
  const [dagRunning, setDagRunning] = useState(false)
  const [dagTime, setDagTime] = useState(0)
  const [completedTasks, setCompletedTasks] = useState([])
  const [activeTasks, setActiveTasks] = useState([])

  /* Recommendation state */
  const [recStep, setRecStep] = useState(0)

  /* Live streaming state */
  const [liveActive, setLiveActive] = useState(false)
  const [liveStep, setLiveStep] = useState(-1)
  const [viewerCount, setViewerCount] = useState(0)

  /* Quiz state */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const T = useCallback((word) => {
    const def = terms[word]
    return def ? <Term word={word} definition={def} onLearn={learnTerm} /> : word
  }, [learnTerm])

  /* ── Upload pipeline simulation ── */
  const runPipeline = useCallback(() => {
    setPipelineRunning(true)
    setPipelineStep(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= uploadStages.length) {
        clearInterval(interval)
        setPipelineRunning(false)
      }
      setPipelineStep(step)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  /* ── DAG simulation ── */
  const runDag = useCallback(() => {
    setDagRunning(true)
    setDagTime(0)
    setCompletedTasks([])
    setActiveTasks([])

    let time = 0
    const taskStart = {}
    const taskDone = {}
    const completed = []

    const interval = setInterval(() => {
      time++
      setDagTime(time)

      const nowActive = []
      const nowCompleted = [...completed]

      dagTasks.forEach(task => {
        const allDepsDone = task.deps.every(d => taskDone[d])

        if (!taskStart[task.id] && allDepsDone) {
          taskStart[task.id] = time
        }

        if (taskStart[task.id] && !taskDone[task.id]) {
          const elapsed = time - taskStart[task.id]
          if (elapsed >= task.duration) {
            taskDone[task.id] = true
            nowCompleted.push(task.id)
            completed.push(task.id)
          } else {
            nowActive.push(task.id)
          }
        }
      })

      setActiveTasks(nowActive)
      setCompletedTasks(nowCompleted)

      if (dagTasks.every(t => taskDone[t.id])) {
        clearInterval(interval)
        setDagRunning(false)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  /* ── Live stream simulation ── */
  useEffect(() => {
    if (!liveActive) return
    setLiveStep(0)
    setViewerCount(0)
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= liveStreamStages.length) {
        clearInterval(interval)
      }
      setLiveStep(step)
      setViewerCount(prev => prev + Math.floor(Math.random() * 2000) + 500)
    }, 1000)
    return () => clearInterval(interval)
  }, [liveActive])

  /* ── Quiz logic ── */
  const handleAnswer = (qId, idx) => {
    if (showResults) return
    setQuizAnswers(prev => ({ ...prev, [qId]: idx }))
  }

  const allAnswered = quizQuestions.every(q => quizAnswers[q.id] !== undefined)

  const handleSubmitQuiz = () => {
    let correct = 0
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) correct++
    })
    setScore(correct)
    setShowResults(true)
    if (correct >= 6 && onComplete) onComplete()
  }

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="quest-card p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
            <Tv size={22} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Design YouTube</h1>
            <p className="text-quest-text/60 text-sm">Level 56 -- Video Platform Architecture (HLD Case Study)</p>
          </div>
          {isCompleted && (
            <CheckCircle size={24} className="text-green-400 ml-auto" />
          )}
        </div>
        <p className="text-quest-text/80 leading-relaxed">
          500 hours of video uploaded every minute. 2 billion daily active users pressing play.
          How does YouTube handle the largest video platform on Earth? In this level, you will
          explore the {T('Video Processing Pipeline')}, {T('Adaptive Bitrate Streaming')},
          recommendation algorithms, and the live streaming infrastructure that powers it all.
        </p>
      </motion.div>

      {/* ── Tab Navigation ── */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                  : 'bg-quest-surface/30 text-quest-text/60 border border-white/10 hover:border-white/20'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ══════════════════════════════════════════ */}
      {/* ── Overview Tab ── */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'story' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Scale Numbers */}
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChart size={20} className="text-quest-primary" />
              YouTube by the Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {scaleNumbers.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl bg-quest-surface/30 border border-white/10 text-center"
                >
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-quest-text/50 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* High-level architecture overview */}
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-4">High-Level Architecture</h2>
            <p className="text-quest-text/80 text-sm mb-4">
              YouTube's architecture can be broken down into four major subsystems. Each tab in this
              level explores one in depth.
            </p>
            <div className="space-y-3">
              {[
                { label: 'Upload & Processing Pipeline', desc: 'Raw video intake, chunking, transcoding to ~20 format variants, thumbnail generation, content moderation, and CDN distribution.', color: 'border-blue-500/40 bg-blue-500/10', icon: Upload },
                { label: 'Video Processing DAG', desc: 'A directed acyclic graph orchestrates parallel tasks -- audio extraction, multi-resolution transcoding, metadata extraction, and manifest generation.', color: 'border-yellow-500/40 bg-yellow-500/10', icon: BarChart },
                { label: 'Recommendation Engine', desc: 'Collaborative filtering + content-based filtering + ranking signals (watch time, recency, diversity) produce personalized home feeds.', color: 'border-green-500/40 bg-green-500/10', icon: ThumbsUp },
                { label: 'Live Streaming', desc: 'RTMP ingest, real-time transcoding, HLS/DASH segmentation, CDN edge caching, and adaptive bitrate delivery to millions of concurrent viewers.', color: 'border-red-500/40 bg-red-500/10', icon: Play },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className={`p-4 rounded-xl border ${item.color} flex gap-4 items-start`}
                  >
                    <Icon size={20} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-xs text-quest-text/60 mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <DeepDive id="dd-storage" title="Storage & Bandwidth Math" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>Let us estimate YouTube's storage needs:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Upload rate:</strong> 500 hours/minute = 30,000 hours/hour = 720,000 hours/day</li>
                <li><strong>Average video size (raw):</strong> ~1 GB/hour (compressed upload)</li>
                <li><strong>Daily raw uploads:</strong> ~720 TB/day just in raw uploads</li>
                <li><strong>After transcoding (~20 variants):</strong> Roughly 3-5x the raw size = 2-4 PB/day of new content</li>
                <li><strong>Accumulated storage:</strong> Over 15+ years, estimated at ~1 exabyte (1,000 PB)</li>
              </ul>
              <p className="mt-2">
                Bandwidth is equally staggering: with 1 billion hours watched daily and an average bitrate of ~2.5 Mbps,
                that is roughly 100 PB of egress per day. This is why {T('CDN')} edge caching and {T('Adaptive Bitrate Streaming')} are essential.
              </p>
            </div>
          </DeepDive>

          <DeepDive id="dd-comments" title="Comments System at Scale" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>YouTube processes ~500 million comments per day. The comment system requires:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Storage:</strong> NoSQL store (e.g., Bigtable) sharded by video_id for write throughput.</li>
                <li><strong>Read pattern:</strong> Paginated fetches sorted by time or "top comments" (like count). Pre-sorted materialized views.</li>
                <li><strong>Write pattern:</strong> Append-only with eventual consistency. A new comment may take seconds to appear to all users.</li>
                <li><strong>Spam/moderation:</strong> ML-based classifier runs inline on write path. Flagged comments held for review.</li>
                <li><strong>Threading:</strong> Parent-child relationships stored as adjacency lists. Reply counts denormalized on parent comment.</li>
                <li><strong>Like counts:</strong> Stored in a distributed counter (like Redis) with periodic flush to persistent store.</li>
              </ul>
              <p className="mt-2">
                The key insight is that comments are partitioned by video_id, which naturally distributes load since
                users viewing different videos hit different shards.
              </p>
            </div>
          </DeepDive>

          <DeepDive id="dd-cdn" title="CDN Strategy Deep Dive" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>YouTube operates its own CDN (Google Global Cache) with 2,500+ edge locations:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Hot vs Cold content:</strong> Popular videos cached at edge. Long-tail content fetched from origin on demand.</li>
                <li><strong>Cache hierarchy:</strong> Edge server, regional cache, origin data center. 90%+ of requests served from edge.</li>
                <li><strong>ISP partnerships:</strong> Google places cache servers directly inside ISP networks (Google Global Cache).</li>
                <li><strong>Geo-routing:</strong> DNS and anycast routing direct viewers to the nearest edge with the content.</li>
                <li><strong>Cache warming:</strong> Newly uploaded videos from popular channels are proactively pushed to edges before users request them.</li>
              </ul>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* ── Upload Pipeline Tab ── */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'upload' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Upload size={20} className="text-quest-primary" />
              Video Upload Pipeline
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Watch a video travel from raw upload to globally playable content. Each stage is powered
              by {T('Message Queue')}s and worker pools for fault tolerance and scalability.
            </p>

            {/* Pipeline visualization */}
            <div className="space-y-3 mb-6">
              {uploadStages.map((stage, i) => {
                const isActive = i === pipelineStep
                const isDone = i < pipelineStep
                const isPending = i > pipelineStep
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? `${stage.bg} ${stage.border} ring-2 ring-offset-2 ring-offset-black/50 ring-quest-primary/30`
                        : isDone
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-quest-surface/20 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isDone ? 'bg-green-500/30 text-green-400' : isActive ? `${stage.bg} ${stage.color}` : 'bg-quest-surface/30 text-quest-text/30'
                      }`}>
                        {isDone ? <CheckCircle size={18} /> : i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${isDone ? 'text-green-400' : isActive ? stage.color : 'text-quest-text/40'}`}>
                            {stage.label}
                          </span>
                          {isActive && (
                            <motion.span
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded-full"
                            >
                              Processing...
                            </motion.span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${isActive || isDone ? 'text-quest-text/60' : 'text-quest-text/30'}`}>
                          {stage.detail}
                        </p>
                      </div>
                      {isActive && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          className={`w-6 h-6 border-2 border-t-transparent rounded-full ${stage.border}`}
                        />
                      )}
                    </div>

                    {/* Arrow connector */}
                    {i < uploadStages.length - 1 && (
                      <div className="flex justify-center mt-2">
                        <div className={`w-0.5 h-4 ${isDone ? 'bg-green-500/40' : 'bg-white/10'}`} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={runPipeline}
                disabled={pipelineRunning}
                className="px-6 py-3 rounded-lg bg-quest-primary/20 text-quest-primary border border-quest-primary/40 font-medium hover:bg-quest-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Upload size={16} />
                {pipelineStep === -1 ? 'Upload Video' : pipelineRunning ? 'Processing...' : 'Upload Again'}
              </button>
              <button
                onClick={() => { setPipelineStep(-1); setPipelineRunning(false) }}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
              >
                Reset
              </button>
            </div>

            {pipelineStep >= uploadStages.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-center"
              >
                <CheckCircle size={20} className="text-green-400 mx-auto mb-2" />
                <p className="text-green-400 font-semibold text-sm">Video is now live and playable worldwide!</p>
                <p className="text-xs text-quest-text/50 mt-1">
                  Segments cached across 2,500+ CDN edge locations. Adaptive bitrate manifest generated.
                </p>
              </motion.div>
            )}
          </div>

          <DeepDive id="dd-upload-arch" title="Upload Architecture Details" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>Key architectural decisions in the upload pipeline:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Resumable uploads:</strong> Large files use chunked upload with checkpoints so users can resume after network interruptions.</li>
                <li><strong>Staging bucket:</strong> Raw uploads go to a temporary {T('Object Storage')} bucket, separate from processed content.</li>
                <li><strong>Fan-out pattern:</strong> A single upload event triggers a {T('Fan-Out')} to 15-20 parallel transcoding jobs via a {T('Message Queue')}.</li>
                <li><strong>Content ID:</strong> Fingerprinting runs in parallel to detect copyrighted content before the video goes live.</li>
                <li><strong>Thumbnail A/B testing:</strong> Multiple candidate thumbnails are generated and tested with small audience samples.</li>
              </ul>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* ── DAG Processing Tab ── */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'dag' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <BarChart size={20} className="text-quest-primary" />
              Video Processing {T('DAG')}
            </h2>
            <p className="text-quest-text/70 text-sm mb-2">
              Each video upload spawns a directed acyclic graph of processing tasks. Independent tasks
              run in parallel, while dependent tasks wait for their prerequisites. Watch the DAG execute.
            </p>
            {dagRunning && (
              <p className="text-xs text-quest-primary mb-4">
                Simulation time: <span className="font-mono font-bold">{dagTime * 0.5}s</span> | Active tasks: {activeTasks.length} | Completed: {completedTasks.length}/{dagTasks.length}
              </p>
            )}

            {/* DAG visualization as a list-based graph */}
            <div className="relative bg-quest-surface/20 rounded-xl border border-white/10 p-6 mb-6 min-h-[400px]">
              {/* Render edges as lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {dagEdges.map((edge, i) => (
                  <line
                    key={i}
                    x1={`${edge.from.x}%`}
                    y1={`${edge.from.y + 4}%`}
                    x2={`${edge.to.x}%`}
                    y2={`${edge.to.y - 2}%`}
                    stroke={completedTasks.includes(edge.from.id) && completedTasks.includes(edge.to.id) ? '#22c55e' : activeTasks.includes(edge.to.id) ? '#eab308' : '#ffffff15'}
                    strokeWidth="1.5"
                    strokeDasharray={completedTasks.includes(edge.to.id) ? '0' : '4'}
                  />
                ))}
              </svg>

              {/* Render task nodes */}
              {dagTasks.map(task => {
                const isComplete = completedTasks.includes(task.id)
                const isActive = activeTasks.includes(task.id)
                return (
                  <motion.div
                    key={task.id}
                    className="absolute"
                    style={{
                      left: `${task.x}%`,
                      top: `${task.y}%`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 1,
                    }}
                    animate={{
                      scale: isActive ? [1, 1.05, 1] : 1,
                    }}
                    transition={isActive ? { repeat: Infinity, duration: 0.8 } : {}}
                  >
                    <div className={`px-3 py-2 rounded-lg text-xs font-medium border whitespace-nowrap transition-all duration-300 ${
                      isComplete
                        ? 'bg-green-500/20 border-green-500/40 text-green-400'
                        : isActive
                          ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400 shadow-lg shadow-yellow-500/10'
                          : 'bg-quest-surface/40 border-white/10 text-quest-text/40'
                    }`}>
                      <div className="flex items-center gap-1.5">
                        {isComplete && <CheckCircle size={12} />}
                        {isActive && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-3 h-3 border border-t-transparent border-yellow-400 rounded-full"
                          />
                        )}
                        {task.label}
                      </div>
                      <div className="text-[10px] opacity-60 mt-0.5">{task.duration * 0.5}s</div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={runDag}
                disabled={dagRunning}
                className="px-6 py-3 rounded-lg bg-quest-primary/20 text-quest-primary border border-quest-primary/40 font-medium hover:bg-quest-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Play size={16} />
                {completedTasks.length === 0 ? 'Run DAG' : dagRunning ? 'Running...' : 'Run Again'}
              </button>
              <button
                onClick={() => { setCompletedTasks([]); setActiveTasks([]); setDagTime(0); setDagRunning(false) }}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
              >
                Reset
              </button>
            </div>

            {completedTasks.length === dagTasks.length && !dagRunning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20"
              >
                <p className="text-green-400 font-semibold text-sm text-center">
                  All tasks complete in {dagTime * 0.5}s (wall clock). Sequential would take {dagTasks.reduce((a, t) => a + t.duration, 0) * 0.5}s.
                </p>
                <p className="text-xs text-quest-text/50 text-center mt-1">
                  Parallelism saved {((dagTasks.reduce((a, t) => a + t.duration, 0) - dagTime) * 0.5).toFixed(1)}s -- a {((1 - dagTime / dagTasks.reduce((a, t) => a + t.duration, 0)) * 100).toFixed(0)}% speedup!
                </p>
              </motion.div>
            )}
          </div>

          <DeepDive id="dd-dag-detail" title="DAG Orchestration in Practice" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>YouTube likely uses an internal DAG orchestrator similar to Apache Airflow or Google's Borg:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Task scheduling:</strong> A scheduler monitors task dependencies and dispatches ready tasks to a worker pool.</li>
                <li><strong>Retry logic:</strong> Failed transcoding tasks are retried up to N times before marking the video as failed.</li>
                <li><strong>Priority queues:</strong> Videos from verified/popular channels may get higher priority in the processing queue.</li>
                <li><strong>Resource allocation:</strong> CPU-intensive tasks (4K transcoding) get more compute resources than metadata extraction.</li>
                <li><strong>Checkpointing:</strong> Long-running tasks save progress so they can resume from the last checkpoint on failure.</li>
              </ul>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* ── Recommendations Tab ── */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'recommend' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ThumbsUp size={20} className="text-quest-primary" />
              Recommendation Engine
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              YouTube's recommendation system drives 70%+ of watch time. Step through the pipeline
              from watch history to personalized results using {T('Collaborative Filtering')} and {T('Content-Based Filtering')}.
            </p>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
              {['Watch History', 'Collaborative', 'Content-Based', 'Ranked Results'].map((step, i) => (
                <button
                  key={i}
                  onClick={() => setRecStep(i)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    recStep === i
                      ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                      : recStep > i
                        ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                        : 'bg-quest-surface/30 text-quest-text/40 border border-white/10'
                  }`}
                >
                  {recStep > i && <CheckCircle size={12} className="inline mr-1" />}
                  {step}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 0: Watch History */}
              {recStep === 0 && (
                <motion.div
                  key="rec-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-sm text-blue-400">Your Watch History</h3>
                  <p className="text-xs text-quest-text/60 mb-3">
                    The recommendation engine starts with your viewing behavior: what you watched, how long, likes, and skips.
                  </p>
                  {watchHistory.map((v, i) => (
                    <motion.div
                      key={v.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Play size={14} className="text-blue-400" />
                        <div>
                          <p className="text-sm font-medium">{v.title}</p>
                          <p className="text-xs text-quest-text/50">{v.category}</p>
                        </div>
                      </div>
                      <span className="text-xs text-quest-text/40">{v.views} views</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Step 1: Collaborative Filtering */}
              {recStep === 1 && (
                <motion.div
                  key="rec-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-sm text-purple-400">{T('Collaborative Filtering')}</h3>
                  <p className="text-xs text-quest-text/60 mb-3">
                    "Users like you also watched..." -- Finds users with overlapping watch histories and recommends their favorites.
                  </p>
                  <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 mb-4">
                    <p className="text-xs text-purple-400/80 font-mono">
                      similarity(user_A, user_B) = dot(watch_vector_A, watch_vector_B) / (|A| * |B|)
                    </p>
                  </div>
                  {collaborativeResults.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-quest-text/50">{r.reason}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-purple-400">{(r.score * 100).toFixed(0)}%</span>
                        <p className="text-[10px] text-quest-text/40">match</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Step 2: Content-Based Filtering */}
              {recStep === 2 && (
                <motion.div
                  key="rec-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-sm text-orange-400">{T('Content-Based Filtering')}</h3>
                  <p className="text-xs text-quest-text/60 mb-3">
                    "Because you watched React Hooks Tutorial..." -- Analyzes video metadata (tags, category, description) to find similar content.
                  </p>
                  <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/20 mb-4">
                    <p className="text-xs text-orange-400/80 font-mono">
                      score = cosine_similarity(video_embedding, candidate_embedding)
                    </p>
                  </div>
                  {contentBasedResults.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">{r.title}</p>
                        <p className="text-xs text-quest-text/50">{r.reason}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-orange-400">{(r.score * 100).toFixed(0)}%</span>
                        <p className="text-[10px] text-quest-text/40">relevance</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Step 3: Ranked Results */}
              {recStep === 3 && (
                <motion.div
                  key="rec-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <h3 className="font-semibold text-sm text-green-400">Final Ranked Results</h3>
                  <p className="text-xs text-quest-text/60 mb-3">
                    Both signal sources are combined, re-ranked with engagement signals (watch time prediction, recency, diversity), and the top results form your feed.
                  </p>
                  {rankedResults.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 rounded-lg bg-quest-surface/30 border border-white/10 flex items-center gap-4"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        i === 0 ? 'bg-yellow-500/20 text-yellow-400' : i === 1 ? 'bg-gray-400/20 text-gray-300' : 'bg-quest-surface/50 text-quest-text/40'
                      }`}>
                        #{i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{r.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] bg-quest-primary/10 text-quest-primary px-1.5 py-0.5 rounded">{r.source}</span>
                          <span className="text-[10px] text-quest-text/40">{r.boost}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-2 rounded-full bg-quest-surface/50 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${r.finalScore * 100}%` }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="h-full rounded-full bg-gradient-to-r from-quest-primary to-green-400"
                          />
                        </div>
                        <span className="text-xs font-bold text-green-400">{(r.finalScore * 100).toFixed(0)}%</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setRecStep(Math.max(0, recStep - 1))}
                disabled={recStep === 0}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setRecStep(Math.min(3, recStep + 1))}
                disabled={recStep === 3}
                className="px-5 py-2 rounded-lg bg-quest-primary/20 text-quest-primary border border-quest-primary/40 text-sm font-medium hover:bg-quest-primary/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next Stage
              </button>
            </div>
          </div>

          <DeepDive id="dd-rec-arch" title="Recommendation System Architecture" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>YouTube's real recommendation system is a multi-stage pipeline:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Candidate generation (stage 1):</strong> Reduces billions of videos to ~1000 candidates using fast, approximate methods (embeddings, ANN search).</li>
                <li><strong>Scoring/ranking (stage 2):</strong> A deep neural network scores each candidate based on hundreds of features (user history, context, video features).</li>
                <li><strong>Re-ranking (stage 3):</strong> Business rules applied -- diversity, freshness, de-duplication, content policy filtering.</li>
                <li><strong>Serving:</strong> Pre-computed candidate sets cached in memory. Real-time scoring for the final ranking.</li>
                <li><strong>Feedback loop:</strong> User engagement (watch time, likes, shares) feeds back into model training daily.</li>
              </ul>
              <p className="mt-2">
                The primary optimization metric is <strong>expected watch time</strong>, not click-through rate,
                because YouTube learned that optimizing for clicks led to clickbait.
              </p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* ── Live Streaming Tab ── */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'live' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Play size={20} className="text-red-400" />
              Live Streaming Pipeline
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Live streaming has fundamentally different constraints than VOD. The video is generated in real-time,
              so transcoding must keep pace with the live feed. Watch the {T('RTMP')} ingest flow through to
              {' '}{T('HLS')}/{T('DASH')} delivery.
            </p>

            {/* Live stream visualization */}
            <div className="space-y-3 mb-6">
              {liveStreamStages.map((stage, i) => {
                const isActive = i === liveStep
                const isDone = i < liveStep
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? `${stage.bg} border-${stage.color.replace('text-', '')}/40 ring-1 ring-red-500/20`
                        : isDone
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-quest-surface/20 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        isDone ? 'bg-green-500/30 text-green-400' : isActive ? `${stage.bg} ${stage.color}` : 'bg-quest-surface/30 text-quest-text/30'
                      }`}>
                        {isDone ? <CheckCircle size={18} /> : i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${isDone ? 'text-green-400' : isActive ? stage.color : 'text-quest-text/40'}`}>
                            {stage.label}
                          </span>
                          {isActive && (
                            <motion.div
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ repeat: Infinity, duration: 0.6 }}
                              className="w-2 h-2 rounded-full bg-red-500"
                            />
                          )}
                          {isActive && i === liveStreamStages.length - 1 && (
                            <span className="text-xs text-green-400 font-mono ml-2">
                              {viewerCount.toLocaleString()} viewers
                            </span>
                          )}
                        </div>
                        <p className={`text-xs mt-1 ${isActive || isDone ? 'text-quest-text/60' : 'text-quest-text/30'}`}>
                          {stage.detail}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Latency breakdown */}
            {liveStep >= liveStreamStages.length - 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-quest-surface/30 border border-white/10 mb-6"
              >
                <h3 className="text-sm font-semibold mb-3">End-to-End Latency Breakdown</h3>
                <div className="space-y-2">
                  {[
                    { stage: 'Encoding (OBS)', latency: '~50ms', pct: 5 },
                    { stage: 'RTMP to ingest server', latency: '~200ms', pct: 15 },
                    { stage: 'Live transcoding', latency: '~1-2s', pct: 25 },
                    { stage: 'HLS segment duration', latency: '~2-6s', pct: 40 },
                    { stage: 'CDN propagation', latency: '~500ms', pct: 10 },
                    { stage: 'Player buffer', latency: '~1-3s', pct: 5 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-quest-text/60 w-40 shrink-0">{item.stage}</span>
                      <div className="flex-1 h-2 rounded-full bg-quest-surface/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.pct}%` }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                          className="h-full rounded-full bg-red-400/60"
                        />
                      </div>
                      <span className="text-xs text-quest-text/50 font-mono w-16 text-right">{item.latency}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-quest-text/50 mt-3 text-center">
                  Total: ~5-30 seconds glass-to-glass latency (Ultra Low Latency mode: ~3-5s)
                </p>
              </motion.div>
            )}

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setLiveActive(true)}
                disabled={liveActive}
                className="px-6 py-3 rounded-lg bg-red-500/20 text-red-400 border border-red-500/40 font-medium hover:bg-red-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Play size={16} />
                {liveStep === -1 ? 'Go Live' : liveActive ? 'Streaming...' : 'Go Live Again'}
              </button>
              <button
                onClick={() => { setLiveActive(false); setLiveStep(-1); setViewerCount(0) }}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
              >
                End Stream
              </button>
            </div>
          </div>

          {/* VOD vs Live comparison */}
          <div className="quest-card p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-quest-primary" />
              VOD vs Live: Key Differences
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Aspect</th>
                    <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Video on Demand</th>
                    <th className="text-left py-2 text-quest-text/50 font-medium">Live Streaming</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Transcoding', 'Offline, can retry', 'Real-time, no retries'],
                    ['Latency tolerance', 'Minutes to hours', '< 30 seconds'],
                    ['Quality variants', '15-20 pre-rendered', '3-5 real-time'],
                    ['Error handling', 'Retry and re-process', 'Drop frame, move on'],
                    ['Storage', 'Persistent, all variants', 'Short-lived segments, then archived'],
                    ['Scaling challenge', 'Storage + CDN egress', 'Concurrent transcoding + ingest'],
                    ['Chat/interaction', 'Comments (async)', 'Live chat (real-time, high throughput)'],
                  ].map(([aspect, vod, live], i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-2 pr-4 font-medium text-quest-text/70">{aspect}</td>
                      <td className="py-2 pr-4 text-blue-400/80">{vod}</td>
                      <td className="py-2 text-red-400/80">{live}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <DeepDive id="dd-live-chat" title="Live Chat at Scale" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>Popular live streams can have millions of concurrent chat messages:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Message throughput:</strong> Top streams see 10,000+ messages/second. Most viewers see a sampled subset.</li>
                <li><strong>Architecture:</strong> WebSocket connections fan out through a pub/sub system. Messages grouped into batches for efficient delivery.</li>
                <li><strong>Moderation:</strong> Real-time spam filtering and keyword blocking. Slow mode to throttle message rate.</li>
                <li><strong>Super Chat:</strong> Paid messages get priority display and persistence (stored in a transactional system).</li>
                <li><strong>Pinned messages:</strong> Broadcaster pins are pushed to all connected clients with higher priority.</li>
              </ul>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════ */}
      {/* ── Quiz Tab ── */}
      {/* ══════════════════════════════════════════ */}
      {activeTab === 'quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Answer at least 6 out of 8 correctly to complete this level.
            </p>

            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => {
                const selected = quizAnswers[q.id]
                const isCorrect = selected === q.correct
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIdx * 0.05 }}
                    className="p-4 rounded-xl border border-white/10 bg-quest-surface/20"
                  >
                    <p className="font-medium mb-3 text-sm">
                      <span className="text-quest-primary mr-2">{qIdx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        let style = 'bg-quest-surface/30 border-white/10 text-quest-text/70 hover:border-white/20'
                        if (selected === oIdx && !showResults) {
                          style = 'bg-quest-primary/20 border-quest-primary/40 text-quest-primary'
                        }
                        if (showResults) {
                          if (oIdx === q.correct) {
                            style = 'bg-green-500/20 border-green-500/40 text-green-400'
                          } else if (selected === oIdx && !isCorrect) {
                            style = 'bg-red-500/20 border-red-500/40 text-red-400'
                          } else {
                            style = 'bg-quest-surface/20 border-white/5 text-quest-text/30'
                          }
                        }
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleAnswer(q.id, oIdx)}
                            disabled={showResults}
                            className={`px-4 py-2.5 rounded-lg border text-sm text-left transition-all ${style} disabled:cursor-not-allowed`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                    <AnimatePresence>
                      {showResults && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3"
                        >
                          <p className={`text-xs p-2 rounded-lg ${
                            isCorrect
                              ? 'bg-green-500/10 text-green-400'
                              : 'bg-red-500/10 text-red-400'
                          }`}>
                            {isCorrect ? 'Correct! ' : 'Not quite. '}
                            {q.explanation}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Submit / Results */}
            <div className="mt-6 text-center">
              {!showResults ? (
                <button
                  onClick={handleSubmitQuiz}
                  disabled={!allAnswered}
                  className="px-8 py-3 rounded-lg bg-quest-primary text-white font-medium hover:bg-quest-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Submit Answers
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-block p-4 rounded-xl border ${
                    score >= 6
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <p className={`text-lg font-bold ${score >= 6 ? 'text-green-400' : 'text-red-400'}`}>
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="text-sm text-quest-text/60 mt-1">
                    {score >= 6
                      ? 'Excellent! You understand YouTube\'s video platform architecture.'
                      : 'You need at least 6 correct. Review the material and try again.'}
                  </p>
                  {score < 6 && (
                    <button
                      onClick={() => { setQuizAnswers({}); setShowResults(false) }}
                      className="mt-3 px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
                    >
                      Retry Quiz
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

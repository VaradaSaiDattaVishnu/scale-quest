import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle, Play, Film,
  Globe, Wifi, BarChart, Server, Tv, ArrowRight, Zap, Database,
  Users, Layers, Monitor, Settings, Shuffle
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

/* ── Transcoding pipeline data ── */
const transcodingProfiles = [
  { label: '4K UHD', resolution: '3840x2160', bitrate: '16 Mbps', codec: 'H.265/HEVC', color: 'text-purple-400', bg: 'bg-purple-500' },
  { label: '1080p HD', resolution: '1920x1080', bitrate: '5 Mbps', codec: 'H.264/AVC', color: 'text-blue-400', bg: 'bg-blue-500' },
  { label: '720p HD', resolution: '1280x720', bitrate: '3 Mbps', codec: 'H.264/AVC', color: 'text-sky-400', bg: 'bg-sky-500' },
  { label: '480p SD', resolution: '854x480', bitrate: '1.5 Mbps', codec: 'H.264/AVC', color: 'text-teal-400', bg: 'bg-teal-500' },
  { label: '360p Mobile', resolution: '640x360', bitrate: '0.8 Mbps', codec: 'VP9', color: 'text-green-400', bg: 'bg-green-500' },
  { label: '240p Low', resolution: '426x240', bitrate: '0.3 Mbps', codec: 'AV1', color: 'text-yellow-400', bg: 'bg-yellow-500' },
]

/* ── CDN PoP locations for the world map ── */
const cdnPops = [
  { name: 'Los Angeles', x: 14, y: 40, region: 'NA', capacity: 'Large' },
  { name: 'New York', x: 24, y: 34, region: 'NA', capacity: 'Large' },
  { name: 'Sao Paulo', x: 32, y: 68, region: 'SA', capacity: 'Medium' },
  { name: 'London', x: 47, y: 28, region: 'EU', capacity: 'Large' },
  { name: 'Amsterdam', x: 49, y: 27, region: 'EU', capacity: 'Large' },
  { name: 'Mumbai', x: 66, y: 48, region: 'AP', capacity: 'Medium' },
  { name: 'Singapore', x: 76, y: 55, region: 'AP', capacity: 'Large' },
  { name: 'Tokyo', x: 82, y: 36, region: 'AP', capacity: 'Large' },
  { name: 'Sydney', x: 88, y: 72, region: 'OC', capacity: 'Medium' },
  { name: 'Johannesburg', x: 54, y: 72, region: 'AF', capacity: 'Small' },
  { name: 'Dubai', x: 60, y: 42, region: 'ME', capacity: 'Medium' },
  { name: 'Seoul', x: 80, y: 35, region: 'AP', capacity: 'Large' },
]

/* ── Recommendation engine sample data ── */
const sampleHistory = [
  { title: 'Stranger Things', genre: 'Sci-Fi/Horror', rating: 5 },
  { title: 'Dark', genre: 'Sci-Fi/Thriller', rating: 4 },
  { title: 'The OA', genre: 'Sci-Fi/Drama', rating: 4 },
  { title: 'Black Mirror', genre: 'Sci-Fi/Thriller', rating: 5 },
  { title: 'Altered Carbon', genre: 'Sci-Fi/Action', rating: 3 },
]

const recommendations = [
  { title: 'Love, Death & Robots', match: 96, reason: 'Sci-Fi fans who liked Black Mirror' },
  { title: 'The 100', match: 91, reason: 'Similar to Stranger Things viewers' },
  { title: 'Westworld', match: 89, reason: 'Collaborative filter: Sci-Fi + Thriller' },
  { title: 'Ex Machina', match: 87, reason: 'Content-based: AI + Sci-Fi themes' },
  { title: 'Annihilation', match: 84, reason: 'Users who watched The OA also watched' },
]

/* ── Architecture pipeline stages ── */
const pipelineStages = [
  { id: 'upload', label: 'Upload', icon: Film, desc: 'Studio uploads master file (mezzanine) via secure transfer', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 'transcode', label: 'Transcode', icon: Settings, desc: 'Parallel encoding into 100+ codec/bitrate/resolution combos', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'store', label: 'Store', icon: Database, desc: 'Chunked files stored in S3-compatible object storage', color: 'text-sky-400', bg: 'bg-sky-500/20' },
  { id: 'cdn', label: 'CDN Push', icon: Globe, desc: 'Open Connect appliances pre-cache popular content at ISPs', color: 'text-green-400', bg: 'bg-green-500/20' },
  { id: 'stream', label: 'Stream', icon: Tv, desc: 'Client requests manifest, picks bitrate, streams chunks', color: 'text-orange-400', bg: 'bg-orange-500/20' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'Why does Netflix transcode a single video into many different versions?',
    options: [
      { id: 'a', text: 'To reduce storage costs by compressing the original file', correct: false },
      { id: 'b', text: 'To serve different quality levels based on device and network conditions', correct: true },
      { id: 'c', text: 'To comply with regional content regulations in different countries', correct: false },
      { id: 'd', text: 'To prevent piracy through multiple encryption layers', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What does Adaptive Bitrate Streaming (ABR) do when network bandwidth drops?',
    options: [
      { id: 'a', text: 'Pauses the video and buffers until bandwidth recovers', correct: false },
      { id: 'b', text: 'Reduces the video resolution/bitrate seamlessly to prevent buffering', correct: true },
      { id: 'c', text: 'Switches to audio-only mode automatically', correct: false },
      { id: 'd', text: 'Compresses the current stream in real-time on the server', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What is Netflix\'s Open Connect, and why is it unique?',
    options: [
      { id: 'a', text: 'A third-party CDN service Netflix rents from Akamai', correct: false },
      { id: 'b', text: 'A custom CDN where Netflix places hardware appliances directly inside ISP networks', correct: true },
      { id: 'c', text: 'An open-source streaming protocol Netflix developed', correct: false },
      { id: 'd', text: 'A peer-to-peer network where users share cached content', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Netflix\'s recommendation engine primarily uses which approach?',
    options: [
      { id: 'a', text: 'Only content-based filtering (matching genres and tags)', correct: false },
      { id: 'b', text: 'Only collaborative filtering (users who watched X also watched Y)', correct: false },
      { id: 'c', text: 'A hybrid of collaborative filtering, content-based, and deep learning models', correct: true },
      { id: 'd', text: 'Manual curation by Netflix editors for each region', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'How does Netflix handle serving 220M+ subscribers globally during peak hours?',
    options: [
      { id: 'a', text: 'All traffic is routed through centralized data centers in the US', correct: false },
      { id: 'b', text: 'Content is pre-positioned on edge servers close to users, so most traffic never hits origin', correct: true },
      { id: 'c', text: 'Netflix limits the number of concurrent streams per region', correct: false },
      { id: 'd', text: 'Netflix uses client-side rendering to generate video on the user\'s device', correct: false },
    ],
  },
]

/* ── Main Component ── */
export default function Level53({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  // Transcoding sim state
  const [transcodingRunning, setTranscodingRunning] = useState(false)
  const [transcodingProgress, setTranscodingProgress] = useState(transcodingProfiles.map(() => 0))

  // ABR sim state
  const [abrRunning, setAbrRunning] = useState(false)
  const [bandwidth, setBandwidth] = useState(10)
  const [currentQuality, setCurrentQuality] = useState('1080p HD')
  const [bufferHealth, setBufferHealth] = useState(100)
  const [abrHistory, setAbrHistory] = useState([])

  // CDN state
  const [activePop, setActivePop] = useState(null)
  const [contentPushed, setContentPushed] = useState(new Set())
  const [pushingContent, setPushingContent] = useState(false)

  // Recommendation state
  const [recoStep, setRecoStep] = useState(0)
  const [showRecos, setShowRecos] = useState(false)

  // Architecture state
  const [activeStage, setActiveStage] = useState(null)
  const [pipelineAnimating, setPipelineAnimating] = useState(false)
  const [pipelineStep, setPipelineStep] = useState(-1)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Transcoding simulation ── */
  const startTranscoding = useCallback(() => {
    setTranscodingRunning(true)
    setTranscodingProgress(transcodingProfiles.map(() => 0))

    const speeds = transcodingProfiles.map(() => Math.random() * 2 + 1)
    const interval = setInterval(() => {
      setTranscodingProgress(prev => {
        const next = prev.map((p, i) => Math.min(100, p + speeds[i]))
        if (next.every(p => p >= 100)) {
          clearInterval(interval)
          setTranscodingRunning(false)
        }
        return next
      })
    }, 80)
  }, [])

  /* ── Adaptive Bitrate simulation ── */
  useEffect(() => {
    if (!abrRunning) return

    const interval = setInterval(() => {
      setBandwidth(prev => {
        const delta = (Math.random() - 0.5) * 6
        const next = Math.max(0.5, Math.min(20, prev + delta))

        let quality = '240p Low'
        if (next >= 16) quality = '4K UHD'
        else if (next >= 5) quality = '1080p HD'
        else if (next >= 3) quality = '720p HD'
        else if (next >= 1.5) quality = '480p SD'
        else if (next >= 0.8) quality = '360p Mobile'

        setCurrentQuality(quality)
        setBufferHealth(prev2 => {
          const newHealth = next > 1 ? Math.min(100, prev2 + 3) : Math.max(0, prev2 - 8)
          return newHealth
        })
        setAbrHistory(prev2 => [...prev2.slice(-29), { bw: next, q: quality }])

        return next
      })
    }, 500)

    return () => clearInterval(interval)
  }, [abrRunning])

  /* ── CDN content push simulation ── */
  const pushContent = useCallback(() => {
    setPushingContent(true)
    setContentPushed(new Set())

    const popNames = cdnPops.map(p => p.name)
    let idx = 0
    const interval = setInterval(() => {
      if (idx >= popNames.length) {
        clearInterval(interval)
        setPushingContent(false)
        return
      }
      setContentPushed(prev => new Set([...prev, popNames[idx]]))
      idx++
    }, 300)
  }, [])

  /* ── Recommendation pipeline simulation ── */
  const runRecommendation = useCallback(() => {
    setRecoStep(0)
    setShowRecos(false)
    const steps = [1, 2, 3, 4]
    let i = 0
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval)
        setShowRecos(true)
        return
      }
      setRecoStep(steps[i])
      i++
    }, 800)
  }, [])

  /* ── Architecture pipeline animation ── */
  const runPipeline = useCallback(() => {
    setPipelineAnimating(true)
    setPipelineStep(-1)
    let step = 0
    const interval = setInterval(() => {
      if (step >= pipelineStages.length) {
        clearInterval(interval)
        setPipelineAnimating(false)
        return
      }
      setPipelineStep(step)
      setActiveStage(pipelineStages[step].id)
      step++
    }, 1000)
  }, [])

  /* ── Quiz submission ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      return q.options.find(o => o.id === selected)?.correct
    })
    if (allCorrect || true) {
      onComplete?.()
    }
  }

  const qualityColor = (q) => {
    if (q.includes('4K')) return 'text-purple-400'
    if (q.includes('1080')) return 'text-blue-400'
    if (q.includes('720')) return 'text-sky-400'
    if (q.includes('480')) return 'text-teal-400'
    if (q.includes('360')) return 'text-green-400'
    return 'text-yellow-400'
  }

  const sections = [
    { label: 'Story', icon: Film },
    { label: 'Transcoding', icon: Layers },
    { label: 'ABR Streaming', icon: Wifi },
    { label: 'CDN / Open Connect', icon: Globe },
    { label: 'Recommendations', icon: Users },
    { label: 'Architecture', icon: Server },
    { label: 'Quiz', icon: CheckCircle },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section navigation */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s, i) => {
          const Icon = s.icon
          return (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border
                ${currentSection === i
                  ? 'bg-red-500/20 border-red-500/50 text-red-300'
                  : 'bg-quest-surface border-white/10 text-quest-muted hover:border-white/20'}`}
            >
              <Icon size={14} />
              {s.label}
            </button>
          )
        })}
      </div>

      {/* ═══════════════════ SECTION 0: STORY ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <Play size={24} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Design Netflix</h2>
                <p className="text-quest-muted text-sm">Streaming at Scale - HLD Case Study</p>
              </div>
            </div>

            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-red-500/20">
              <p className="text-lg text-quest-text leading-relaxed italic">
                "220 million subscribers streaming simultaneously. How does Netflix never buffer?"
              </p>
            </div>

            <p className="text-quest-muted leading-relaxed mb-4">
              Netflix serves over <strong className="text-quest-text">17% of all downstream internet traffic</strong> globally.
              Every second, thousands of hours of content are being streamed across every device imaginable --
              from 4K smart TVs to phones on 3G connections in rural areas.
            </p>

            <p className="text-quest-muted leading-relaxed mb-4">
              The engineering behind this involves{' '}
              <Term
                word="Video Transcoding"
                definition="The process of converting a video file from one encoding format or quality to another. Netflix transcodes each title into hundreds of different versions to support various devices, resolutions, and bandwidth conditions."
                onLearn={learnTerm}
              />,{' '}
              <Term
                word="Adaptive Bitrate Streaming"
                definition="A technique where the video player dynamically adjusts the quality of a video stream in real-time based on the viewer's network conditions, preventing buffering by switching to a lower quality when bandwidth drops."
                onLearn={learnTerm}
              />,{' '}
              a massive custom{' '}
              <Term
                word="CDN (Open Connect)"
                definition="Netflix's proprietary Content Delivery Network. Unlike traditional CDNs, Netflix deploys custom hardware appliances (Open Connect Appliances - OCAs) directly inside ISP networks, serving ~95% of traffic from the edge."
                onLearn={learnTerm}
              />,{' '}
              a sophisticated{' '}
              <Term
                word="Recommendation Engine"
                definition="Netflix's ML-powered system that personalizes content for each user. It uses collaborative filtering, content-based filtering, and deep learning to drive ~80% of content watched on the platform."
                onLearn={learnTerm}
              />, and extensive{' '}
              <Term
                word="A/B Testing"
                definition="Netflix runs hundreds of A/B tests simultaneously to optimize everything from thumbnail images to recommendation algorithms. Every UI change is tested against user engagement metrics before full rollout."
                onLearn={learnTerm}
              />.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {[
                { label: 'Subscribers', value: '220M+', icon: Users },
                { label: 'Countries', value: '190+', icon: Globe },
                { label: 'Hours/day streamed', value: '100M+', icon: Tv },
                { label: 'Internet traffic', value: '~17%', icon: BarChart },
              ].map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-quest-surface rounded-lg p-4 text-center border border-white/5">
                    <Icon size={20} className="mx-auto text-red-400 mb-2" />
                    <p className="text-lg font-bold text-quest-text">{stat.value}</p>
                    <p className="text-[11px] text-quest-muted">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            <DeepDive id="netflix-history" title="Netflix's Engineering Evolution" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">2007-2008:</strong> Netflix launched streaming using a monolithic
                  Java application running in a single data center. A major database corruption incident in 2008
                  caused three days of downtime and triggered the migration to AWS.
                </p>
                <p>
                  <strong className="text-quest-text">2009-2012:</strong> The great migration to AWS and microservices.
                  Netflix decomposed its monolith into hundreds of microservices, open-sourcing tools like Eureka
                  (service discovery), Hystrix (circuit breaker), and Zuul (API gateway) along the way.
                </p>
                <p>
                  <strong className="text-quest-text">2012-Present:</strong> Netflix built Open Connect, its own CDN,
                  to handle video delivery. The control plane (API, recommendations, billing) runs on AWS, while
                  the data plane (actual video bytes) runs on Open Connect appliances inside ISP networks.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Video Transcoding
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: TRANSCODING ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-purple-400" />
              Video Transcoding Pipeline
            </h2>

            <p className="text-quest-muted mb-6">
              When a studio uploads a master file (often a 50+ GB{' '}
              <Term
                word="Mezzanine File"
                definition="The highest quality source file provided by a studio or content creator, typically in ProRes or DNxHD format. This is the source from which all streaming versions are derived through transcoding."
                onLearn={learnTerm}
              />
              ), Netflix must transcode it into hundreds of different versions. Each version targets a
              specific combination of resolution, bitrate, codec, and audio format.
            </p>

            {/* Transcoding simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-purple-400">Parallel Transcoding Pipeline</h3>
                <button
                  onClick={startTranscoding}
                  disabled={transcodingRunning}
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50 flex items-center gap-2"
                >
                  <Play size={14} />
                  {transcodingRunning ? 'Encoding...' : 'Start Transcode'}
                </button>
              </div>

              {/* Source file */}
              <div className="bg-quest-surface rounded-lg p-3 mb-4 border border-white/10 flex items-center gap-3">
                <Film size={20} className="text-quest-muted" />
                <div>
                  <p className="text-sm font-medium">Source: master_file.mxf</p>
                  <p className="text-[11px] text-quest-muted">4K ProRes 422 HQ | 53.7 GB | 2h 14m</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <ArrowRight size={16} className="text-purple-400" />
                <span className="text-xs text-quest-muted">Parallel encoding to multiple profiles</span>
              </div>

              {/* Encoding profiles with progress */}
              <div className="space-y-3">
                {transcodingProfiles.map((profile, i) => (
                  <div key={profile.label} className="bg-quest-surface rounded-lg p-3 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Monitor size={14} className={profile.color} />
                        <span className="text-sm font-medium">{profile.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-quest-muted">
                        <span>{profile.resolution}</span>
                        <span>{profile.bitrate}</span>
                        <span className={profile.color}>{profile.codec}</span>
                      </div>
                    </div>
                    <div className="w-full h-2.5 bg-quest-bg rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${profile.bg} rounded-full`}
                        style={{ width: `${transcodingProgress[i]}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-quest-muted">
                        {transcodingProgress[i] >= 100 ? 'Complete' : transcodingRunning ? 'Encoding...' : 'Pending'}
                      </span>
                      <span className="text-[10px] text-quest-muted">{Math.round(transcodingProgress[i])}%</span>
                    </div>
                  </div>
                ))}
              </div>

              {transcodingProgress.every(p => p >= 100) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
                >
                  <CheckCircle size={20} className="mx-auto text-green-400 mb-1" />
                  <p className="text-sm text-green-300">All profiles encoded successfully</p>
                  <p className="text-[11px] text-quest-muted">6 variants ready for adaptive streaming</p>
                </motion.div>
              )}
            </div>

            <DeepDive id="per-shot-encoding" title="Per-Shot Encoding (Netflix's Innovation)" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Problem:</strong> A static bitrate wastes bandwidth.
                  An action scene needs more bits than a dialogue scene, but traditional encoding uses
                  the same bitrate throughout.
                </p>
                <p>
                  <strong className="text-quest-text">Netflix's Solution:</strong> Per-shot encoding analyzes each
                  scene individually. A dark, static dialogue scene might only need 200 kbps to look perfect
                  at 1080p, while an explosion needs 8 Mbps. By varying the bitrate per scene, Netflix saves
                  ~20% bandwidth while improving visual quality.
                </p>
                <p>
                  <strong className="text-quest-text">Per-Title Encoding:</strong> Beyond per-shot, Netflix also
                  creates custom encoding ladders per title. An animated show has different encoding characteristics
                  than live-action. Each title gets its own optimized set of bitrate/resolution pairs.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                ABR Streaming
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: ABR STREAMING ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wifi className="text-sky-400" />
              Adaptive Bitrate Streaming
            </h2>

            <p className="text-quest-muted mb-6">
              <Term
                word="ABR (Adaptive Bitrate)"
                definition="Adaptive Bitrate Streaming dynamically adjusts video quality based on real-time network conditions. The client monitors download speed and buffer levels, then requests the highest quality chunks it can sustain without rebuffering."
                onLearn={learnTerm}
              />{' '}
              is how Netflix prevents buffering. Instead of streaming a single fixed quality, the player
              continuously monitors bandwidth and switches quality levels mid-stream. The video is split into
              small chunks (typically 2-4 seconds), and each chunk can be at a different quality level.
            </p>

            {/* ABR Simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-sky-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-sky-400">Live ABR Simulation</h3>
                <button
                  onClick={() => {
                    if (abrRunning) {
                      setAbrRunning(false)
                    } else {
                      setAbrHistory([])
                      setAbrRunning(true)
                    }
                  }}
                  className={`text-xs px-4 py-2 rounded-lg font-medium transition-all ${
                    abrRunning
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'btn-primary'
                  } flex items-center gap-2`}
                >
                  {abrRunning ? (
                    <>
                      <div className="w-2 h-2 rounded-sm bg-red-400" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      Simulate
                    </>
                  )}
                </button>
              </div>

              {/* Simulated "screen" */}
              <div className="relative bg-black rounded-lg aspect-video mb-4 flex items-center justify-center overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
                <div className="relative z-10 text-center">
                  {abrRunning ? (
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Tv size={48} className={qualityColor(currentQuality)} />
                      <p className={`text-lg font-bold mt-2 ${qualityColor(currentQuality)}`}>{currentQuality}</p>
                      <p className="text-xs text-quest-muted mt-1">{bandwidth.toFixed(1)} Mbps</p>
                    </motion.div>
                  ) : (
                    <div className="text-quest-muted">
                      <Play size={48} className="mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Click Simulate to start</p>
                    </div>
                  )}
                </div>

                {/* Buffer indicator */}
                {abrRunning && (
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-white/60">Buffer Health</span>
                      <span className={bufferHealth > 50 ? 'text-green-400' : bufferHealth > 20 ? 'text-yellow-400' : 'text-red-400'}>
                        {Math.round(bufferHealth)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          bufferHealth > 50 ? 'bg-green-500' : bufferHealth > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${bufferHealth}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Bandwidth chart (simplified) */}
              {abrHistory.length > 0 && (
                <div className="bg-quest-surface rounded-lg p-4 border border-white/5">
                  <p className="text-xs text-quest-muted mb-3">Bandwidth over time (last 30 samples)</p>
                  <div className="flex items-end gap-0.5 h-20">
                    {abrHistory.map((point, i) => {
                      const height = (point.bw / 20) * 100
                      return (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          className={`flex-1 rounded-t ${
                            point.bw >= 16 ? 'bg-purple-500' :
                            point.bw >= 5 ? 'bg-blue-500' :
                            point.bw >= 3 ? 'bg-sky-500' :
                            point.bw >= 1.5 ? 'bg-teal-500' :
                            point.bw >= 0.8 ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          title={`${point.bw.toFixed(1)} Mbps - ${point.q}`}
                        />
                      )
                    })}
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-quest-muted">Older</span>
                    <span className="text-[10px] text-quest-muted">Now</span>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[
                      { label: '4K', color: 'bg-purple-500' },
                      { label: '1080p', color: 'bg-blue-500' },
                      { label: '720p', color: 'bg-sky-500' },
                      { label: '480p', color: 'bg-teal-500' },
                      { label: '360p', color: 'bg-green-500' },
                      { label: '240p', color: 'bg-yellow-500' },
                    ].map(l => (
                      <div key={l.label} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-sm ${l.color}`} />
                        <span className="text-[10px] text-quest-muted">{l.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DeepDive id="abr-algorithms" title="ABR Algorithms: Buffer-Based vs Rate-Based" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Rate-Based:</strong> Measures download throughput and picks the
                  highest quality that fits. Simple but reactive -- it can overshoot when bandwidth fluctuates.
                </p>
                <p>
                  <strong className="text-quest-text">Buffer-Based (BBA):</strong> Makes decisions based on the current
                  buffer level. If buffer is healthy (e.g., 30+ seconds), pick higher quality. If draining, downshift.
                  This is more robust to bandwidth estimation errors.
                </p>
                <p>
                  <strong className="text-quest-text">Netflix's Approach:</strong> Netflix uses a hybrid approach with
                  their custom algorithm that considers both throughput estimates and buffer occupancy, along with
                  per-chunk quality metrics (VMAF scores) to make optimal decisions.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                CDN / Open Connect
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: CDN / OPEN CONNECT ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="text-green-400" />
              Open Connect CDN
            </h2>

            <p className="text-quest-muted mb-6">
              Netflix built its own CDN called{' '}
              <Term
                word="Open Connect"
                definition="Netflix's custom-built CDN. Instead of renting CDN capacity, Netflix deploys its own server appliances (OCAs) directly inside ISP data centers. These appliances are provided to ISPs for free and can serve up to 100 Gbps of throughput each."
                onLearn={learnTerm}
              />. Unlike traditional CDNs, Netflix places dedicated hardware appliances directly
              inside ISP networks. During off-peak hours, popular content is proactively pushed to edge
              locations so that during prime time, ~95% of traffic is served locally.
            </p>

            {/* World map with CDN PoPs */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-green-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-green-400">Open Connect PoP Map</h3>
                <button
                  onClick={pushContent}
                  disabled={pushingContent}
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50 flex items-center gap-2"
                >
                  <Zap size={14} />
                  {pushingContent ? 'Pushing...' : 'Push Content to Edge'}
                </button>
              </div>

              {/* Simplified world map */}
              <div className="relative w-full aspect-[2/1] bg-quest-surface rounded-lg border border-white/5 overflow-hidden">
                {/* Continent outlines (simplified) */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 100 80" className="w-full h-full">
                    <ellipse cx="22" cy="38" rx="12" ry="14" fill="currentColor" className="text-white" />
                    <ellipse cx="30" cy="62" rx="7" ry="12" fill="currentColor" className="text-white" />
                    <ellipse cx="50" cy="32" rx="10" ry="10" fill="currentColor" className="text-white" />
                    <ellipse cx="55" cy="58" rx="8" ry="14" fill="currentColor" className="text-white" />
                    <ellipse cx="72" cy="42" rx="14" ry="14" fill="currentColor" className="text-white" />
                    <ellipse cx="87" cy="68" rx="5" ry="6" fill="currentColor" className="text-white" />
                  </svg>
                </div>

                {/* Origin server */}
                <div
                  className="absolute z-10 flex flex-col items-center"
                  style={{ left: '22%', top: '36%', transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-300 shadow-lg shadow-red-500/50"
                  />
                  <span className="text-[9px] text-red-300 mt-1 whitespace-nowrap font-medium">AWS Origin</span>
                </div>

                {/* PoP nodes */}
                {cdnPops.map((pop) => {
                  const isActive = contentPushed.has(pop.name)
                  const isHovered = activePop === pop.name
                  return (
                    <div
                      key={pop.name}
                      className="absolute z-10 flex flex-col items-center cursor-pointer"
                      style={{ left: `${pop.x}%`, top: `${pop.y}%`, transform: 'translate(-50%, -50%)' }}
                      onMouseEnter={() => setActivePop(pop.name)}
                      onMouseLeave={() => setActivePop(null)}
                    >
                      <motion.div
                        animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`w-3 h-3 rounded-full border-2 transition-all ${
                          isActive
                            ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50'
                            : 'bg-quest-muted/50 border-quest-muted/30'
                        }`}
                      />
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full mt-1 bg-quest-surface border border-white/20 rounded-lg px-2 py-1 z-20 whitespace-nowrap"
                        >
                          <p className="text-[10px] font-medium text-quest-text">{pop.name}</p>
                          <p className="text-[9px] text-quest-muted">Capacity: {pop.capacity}</p>
                          <p className="text-[9px]">
                            {isActive ? (
                              <span className="text-green-400">Content cached</span>
                            ) : (
                              <span className="text-quest-muted">Waiting for push</span>
                            )}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )
                })}

                {/* Connection lines when pushing */}
                {pushingContent && (
                  <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 80">
                    {cdnPops.filter(p => contentPushed.has(p.name)).map(pop => (
                      <motion.line
                        key={pop.name}
                        x1="22" y1="36"
                        x2={pop.x} y2={pop.y}
                        stroke="rgba(74, 222, 128, 0.3)"
                        strokeWidth="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ))}
                  </svg>
                )}
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-quest-surface rounded-lg p-3 text-center border border-white/5">
                  <p className="text-lg font-bold text-green-400">{contentPushed.size}/{cdnPops.length}</p>
                  <p className="text-[10px] text-quest-muted">PoPs populated</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center border border-white/5">
                  <p className="text-lg font-bold text-sky-400">~95%</p>
                  <p className="text-[10px] text-quest-muted">Traffic served from edge</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center border border-white/5">
                  <p className="text-lg font-bold text-purple-400">1000+</p>
                  <p className="text-[10px] text-quest-muted">ISP partnerships</p>
                </div>
              </div>
            </div>

            <DeepDive id="oca-hardware" title="Open Connect Appliance Hardware" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Hardware:</strong> Each OCA is a custom-built server using
                  commodity hardware. A single appliance can store ~280 TB of content on flash storage and serve
                  up to 100 Gbps of throughput. Netflix provides these for free to ISPs because it is cheaper
                  than paying for transit bandwidth.
                </p>
                <p>
                  <strong className="text-quest-text">Fill Pattern:</strong> During off-peak hours (typically 2-6 AM local time),
                  the OCAs proactively download popular content from Netflix's AWS-hosted origin servers. By the time
                  prime time hits, the most-watched content is already cached locally. The fill algorithm predicts
                  what will be popular based on historical data and upcoming releases.
                </p>
                <p>
                  <strong className="text-quest-text">The Economics:</strong> For an ISP, having an OCA means Netflix
                  traffic (which can be 30-40% of their total) stays on their local network instead of traversing
                  expensive peering links. It is a win-win: Netflix pays less for bandwidth, ISPs reduce their
                  upstream costs, and users get better quality.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Recommendations
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: RECOMMENDATION ENGINE ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-orange-400" />
              Recommendation Engine
            </h2>

            <p className="text-quest-muted mb-6">
              Netflix's recommendation system drives ~80% of content watched on the platform. It uses a
              combination of{' '}
              <Term
                word="Collaborative Filtering"
                definition="A technique that predicts a user's interests by collecting preferences from many users (collaborating). The assumption: if User A and User B have similar viewing history, User A will likely enjoy what User B watched next."
                onLearn={learnTerm}
              />,{' '}
              <Term
                word="Content-Based Filtering"
                definition="A technique that recommends items based on their attributes (genre, actors, director, mood, pacing) matched against a user's established preferences. Unlike collaborative filtering, it does not need data from other users."
                onLearn={learnTerm}
              />, and deep learning models to personalize not just what you see, but even the thumbnail
              artwork shown for each title.
            </p>

            {/* Recommendation pipeline simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-orange-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-orange-400">Recommendation Pipeline</h3>
                <button
                  onClick={runRecommendation}
                  className="btn-primary text-xs px-4 py-2 flex items-center gap-2"
                >
                  <Shuffle size={14} />
                  Run Pipeline
                </button>
              </div>

              {/* Step 1: User history */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    recoStep >= 1 ? 'bg-orange-500/30 text-orange-400' : 'bg-quest-surface text-quest-muted'
                  }`}>1</div>
                  <span className="text-sm font-medium">Collect Viewing History</span>
                </div>
                <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleHistory.map((item, i) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: recoStep >= 1 ? 1 : 0.3 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-quest-surface rounded-lg p-2 border border-white/5 flex items-center gap-2"
                    >
                      <Film size={14} className="text-orange-400 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{item.title}</p>
                        <p className="text-[10px] text-quest-muted">{item.genre}</p>
                      </div>
                      <div className="ml-auto flex gap-0.5 flex-shrink-0">
                        {Array.from({ length: item.rating }).map((_, j) => (
                          <div key={j} className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Step 2: Collaborative filtering */}
              <motion.div
                className="mb-4"
                animate={{ opacity: recoStep >= 2 ? 1 : 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    recoStep >= 2 ? 'bg-blue-500/30 text-blue-400' : 'bg-quest-surface text-quest-muted'
                  }`}>2</div>
                  <span className="text-sm font-medium">Collaborative Filtering</span>
                </div>
                {recoStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-8 bg-quest-surface rounded-lg p-3 border border-blue-500/20"
                  >
                    <p className="text-xs text-quest-muted mb-2">Finding users with similar taste profiles...</p>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full bg-blue-500/20 border-2 border-quest-bg flex items-center justify-center">
                            <Users size={10} className="text-blue-400" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[11px] text-blue-300">12,847 similar users found</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Step 3: Content-based filtering */}
              <motion.div
                className="mb-4"
                animate={{ opacity: recoStep >= 3 ? 1 : 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    recoStep >= 3 ? 'bg-purple-500/30 text-purple-400' : 'bg-quest-surface text-quest-muted'
                  }`}>3</div>
                  <span className="text-sm font-medium">Content-Based + Deep Learning</span>
                </div>
                {recoStep >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="ml-8 bg-quest-surface rounded-lg p-3 border border-purple-500/20"
                  >
                    <p className="text-xs text-quest-muted mb-2">Analyzing content attributes and engagement patterns...</p>
                    <div className="flex flex-wrap gap-2">
                      {['Sci-Fi', 'Thriller', 'Dark Themes', 'Complex Plot', 'Mystery', 'Ensemble Cast'].map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] border border-purple-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Step 4: Ranking and output */}
              <motion.div
                className="mb-2"
                animate={{ opacity: recoStep >= 4 ? 1 : 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    recoStep >= 4 ? 'bg-green-500/30 text-green-400' : 'bg-quest-surface text-quest-muted'
                  }`}>4</div>
                  <span className="text-sm font-medium">Rank and Personalize</span>
                </div>
              </motion.div>

              {/* Recommendations output */}
              <AnimatePresence>
                {showRecos && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ml-8 space-y-2"
                  >
                    {recommendations.map((reco, i) => (
                      <motion.div
                        key={reco.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-quest-surface rounded-lg p-3 border border-green-500/10 flex items-center gap-3"
                      >
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-green-400">{reco.match}%</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{reco.title}</p>
                          <p className="text-[10px] text-quest-muted">{reco.reason}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DeepDive id="netflix-ab-testing" title="Artwork Personalization & A/B Testing" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Personalized Thumbnails:</strong> Netflix does not just recommend
                  titles -- it personalizes the artwork you see. If you watch a lot of comedies, you might see a
                  funny scene from a drama. If you watch romance, you see the love interest. The same title shows
                  different images to different users.
                </p>
                <p>
                  <strong className="text-quest-text">A/B Testing at Scale:</strong> Netflix runs hundreds of A/B tests
                  simultaneously. Every change -- from the recommendation algorithm to button placement to the
                  artwork selection model -- is tested against engagement metrics (hours watched, retention,
                  click-through rates) before full deployment.
                </p>
                <p>
                  <strong className="text-quest-text">The Impact:</strong> Netflix estimates their recommendation
                  system saves them $1 billion per year in reduced churn. If users cannot find something to watch,
                  they cancel. Good recommendations keep them subscribed.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Architecture Overview
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 5: ARCHITECTURE OVERVIEW ═══════════════════ */}
      {currentSection === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Server className="text-sky-400" />
              End-to-End Architecture
            </h2>

            <p className="text-quest-muted mb-6">
              Netflix's architecture splits into two planes: the <strong className="text-quest-text">Control Plane</strong> (user
              accounts, recommendations, API, billing) runs on AWS microservices, while the{' '}
              <strong className="text-quest-text">Data Plane</strong> (actual video bytes) runs on Open Connect.
              This separation means the control plane can scale independently of video delivery.
            </p>

            {/* Pipeline animation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-sky-500/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-sky-400">Content Delivery Pipeline</h3>
                <button
                  onClick={runPipeline}
                  disabled={pipelineAnimating}
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50 flex items-center gap-2"
                >
                  <Play size={14} />
                  {pipelineAnimating ? 'Running...' : 'Animate Pipeline'}
                </button>
              </div>

              {/* Pipeline stages */}
              <div className="space-y-3">
                {pipelineStages.map((stage, i) => {
                  const Icon = stage.icon
                  const isActive = pipelineStep >= i
                  const isCurrent = pipelineStep === i
                  return (
                    <div key={stage.id}>
                      <motion.div
                        animate={isCurrent ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0 }}
                        className={`rounded-xl p-4 border transition-all ${
                          isActive
                            ? `${stage.bg} border-current ${stage.color}`
                            : 'bg-quest-surface border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${stage.bg} flex items-center justify-center`}>
                            <Icon size={20} className={isActive ? stage.color : 'text-quest-muted'} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className={`font-semibold ${isActive ? 'text-quest-text' : 'text-quest-muted'}`}>
                                {stage.label}
                              </h4>
                              {isActive && pipelineStep > i && (
                                <CheckCircle size={14} className="text-green-400" />
                              )}
                              {isCurrent && (
                                <motion.div
                                  animate={{ opacity: [1, 0.3, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="w-2 h-2 rounded-full bg-sky-400"
                                />
                              )}
                            </div>
                            <p className={`text-xs ${isActive ? 'text-quest-muted' : 'text-quest-muted/50'}`}>
                              {stage.desc}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Arrow between stages */}
                      {i < pipelineStages.length - 1 && (
                        <div className="flex justify-center py-1">
                          <ArrowRight
                            size={16}
                            className={`rotate-90 ${isActive ? 'text-sky-400/60' : 'text-quest-muted/20'}`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {pipelineStep >= pipelineStages.length - 1 && !pipelineAnimating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
                >
                  <p className="text-sm text-green-300">Pipeline complete -- content is now streaming to users!</p>
                </motion.div>
              )}
            </div>

            {/* Two-plane architecture diagram */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-blue-500/20">
                <h4 className="text-sm font-semibold mb-3 text-blue-400 flex items-center gap-2">
                  <Server size={16} />
                  Control Plane (AWS)
                </h4>
                <div className="space-y-2">
                  {[
                    'API Gateway (Zuul)',
                    'User Auth & Profiles',
                    'Recommendation Engine',
                    'Search & Discovery',
                    'A/B Testing Platform',
                    'Billing & Payments',
                    'Content Metadata',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span className="text-quest-muted">{item}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-[10px] text-blue-300/70">
                      ~1000 microservices on AWS, handling all non-video logic
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <h4 className="text-sm font-semibold mb-3 text-green-400 flex items-center gap-2">
                  <Globe size={16} />
                  Data Plane (Open Connect)
                </h4>
                <div className="space-y-2">
                  {[
                    'Open Connect Appliances (OCAs)',
                    'Video Chunk Storage (Flash)',
                    'Peering Relationships',
                    'Content Fill (off-peak push)',
                    'Health Monitoring',
                    'BGP Routing Optimization',
                    'Adaptive Streaming Manifests',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <span className="text-quest-muted">{item}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-[10px] text-green-300/70">
                      ~95% of video traffic served from ISP-embedded appliances
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="chaos-engineering" title="Chaos Engineering: Netflix's Secret Weapon" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Chaos Monkey:</strong> Netflix intentionally kills production
                  servers at random to ensure their services are resilient. If a microservice cannot handle
                  a random instance dying, it is not production-ready.
                </p>
                <p>
                  <strong className="text-quest-text">Chaos Kong:</strong> Takes it further by simulating the failure
                  of an entire AWS region. Netflix must be able to failover all traffic to another region
                  seamlessly. This is tested regularly.
                </p>
                <p>
                  <strong className="text-quest-text">The Philosophy:</strong> "The best way to avoid failure is to
                  fail constantly." By regularly injecting failures in production, Netflix discovers weaknesses
                  before they cause real outages. This practice, now called Chaos Engineering, has been adopted
                  across the industry.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="netflix-scale-numbers" title="Netflix by the Numbers" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Encoding:</strong> A single movie can produce 1,200+ encoded
                  files (different resolutions, bitrates, codecs, audio tracks, subtitles). Netflix encodes
                  approximately 100,000 hours of new content per year.
                </p>
                <p>
                  <strong className="text-quest-text">Storage:</strong> Netflix's total library requires petabytes
                  of storage. Each OCA holds ~280 TB, and there are thousands of OCAs deployed globally.
                </p>
                <p>
                  <strong className="text-quest-text">Microservices:</strong> Over 1,000 microservices handle the
                  control plane. During a typical API call (e.g., loading the homepage), dozens of microservices
                  are called in parallel and the results are composed together.
                </p>
                <p>
                  <strong className="text-quest-text">Peak Traffic:</strong> During peak hours in a given timezone,
                  Netflix can consume 30-40% of that region's total internet bandwidth. Open Connect was built
                  specifically to handle this without crippling ISP networks.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(4)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(6)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 6: QUIZ ═══════════════════ */}
      {currentSection === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-red-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Designing Netflix touches video encoding, adaptive streaming, CDN architecture, and
              recommendation systems. Let's verify your understanding.
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
                                : 'border-red-500 bg-red-500/10'
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
                <h3 className="text-xl font-bold mb-2">Level 53 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how Netflix serves 220 million subscribers with video transcoding,
                  adaptive bitrate streaming, a custom CDN, and ML-powered recommendations.
                </p>
                <p className="text-sm text-red-400">
                  The next time you binge-watch, you will appreciate every seamless quality switch.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

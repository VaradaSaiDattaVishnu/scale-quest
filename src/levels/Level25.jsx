import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Upload, Download, File, Image, Film, HardDrive, Cloud, Link,
  ArrowRight, Layers, Clock, DollarSign, Shield, Trash2, RefreshCw
} from 'lucide-react'

function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const handleClick = () => { setShowTooltip(!showTooltip); if (onLearn) onLearn(word) }
  return (
    <span className="relative inline-block">
      <span className="term cursor-pointer" onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>{word}</span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 z-50">
            <p className="font-semibold text-quest-primary mb-1">{word}</p>
            <p className="text-sm text-quest-text">{definition}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

function DeepDive({ title, children, id, onRead }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => { setIsOpen(!isOpen); if (!isOpen && onRead) onRead(id) }
  return (
    <div className="my-4 border border-quest-primary/20 rounded-lg overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between p-4 bg-quest-primary/5 hover:bg-quest-primary/10 transition-colors">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-quest-primary" />
          <span className="font-semibold text-quest-primary">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-4 text-sm text-quest-muted leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Storage class data ── */
const storageClasses = [
  {
    name: 'Standard',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    costPerGB: '$0.023',
    retrievalCost: 'Free',
    retrievalTime: '< 10ms',
    durability: '99.999999999%',
    availability: '99.99%',
    useCase: 'Frequently accessed data — profile images, active uploads, API responses',
    icon: Layers,
  },
  {
    name: 'Infrequent Access (IA)',
    color: 'text-sky-400',
    bg: 'bg-sky-500/20',
    border: 'border-sky-500/30',
    costPerGB: '$0.0125',
    retrievalCost: '$0.01/GB',
    retrievalTime: '< 10ms',
    durability: '99.999999999%',
    availability: '99.9%',
    useCase: 'Data accessed once a month — old reports, backups accessed occasionally',
    icon: Clock,
  },
  {
    name: 'Glacier',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    costPerGB: '$0.004',
    retrievalCost: '$0.03/GB',
    retrievalTime: '1–5 hours',
    durability: '99.999999999%',
    availability: '99.99%',
    useCase: 'Archive data — compliance records, old logs, legal hold documents',
    icon: HardDrive,
  },
  {
    name: 'Glacier Deep Archive',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/20',
    border: 'border-indigo-500/30',
    costPerGB: '$0.00099',
    retrievalCost: '$0.02/GB',
    retrievalTime: '12–48 hours',
    durability: '99.999999999%',
    availability: '99.99%',
    useCase: 'Long-term retention — 7-year regulatory archives, disaster recovery backups',
    icon: Shield,
  },
]

/* ── Lifecycle stages ── */
const lifecycleStages = [
  { id: 'upload', label: 'Upload', day: 0, className: 'Standard' },
  { id: 'active', label: 'Active Use', day: 30, className: 'Standard' },
  { id: 'cooling', label: 'Cooling Down', day: 90, className: 'Infrequent Access' },
  { id: 'archive', label: 'Archived', day: 365, className: 'Glacier' },
  { id: 'deep', label: 'Deep Archive', day: 730, className: 'Deep Archive' },
  { id: 'delete', label: 'Deleted', day: 1095, className: 'Deleted' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the fundamental difference between object storage and block storage?',
    options: [
      { id: 'a', text: 'Object storage is faster than block storage for all workloads', correct: false },
      { id: 'b', text: 'Object storage stores data as flat objects with metadata, while block storage divides data into fixed-size blocks with no metadata', correct: true },
      { id: 'c', text: 'Block storage can only be used with databases', correct: false },
      { id: 'd', text: 'Object storage requires a file system while block storage does not', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What is the primary purpose of presigned URLs?',
    options: [
      { id: 'a', text: 'To compress files before uploading', correct: false },
      { id: 'b', text: 'To encrypt files at rest in the bucket', correct: false },
      { id: 'c', text: 'To allow clients to upload/download directly to/from storage without the file passing through your server', correct: true },
      { id: 'd', text: 'To speed up DNS resolution for storage endpoints', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Why is multipart upload essential for large files?',
    options: [
      { id: 'a', text: 'It reduces the file size through compression', correct: false },
      { id: 'b', text: 'It allows parallel chunk uploads, resumable transfers, and avoids single-request size limits', correct: true },
      { id: 'c', text: 'It automatically converts files to a more efficient format', correct: false },
      { id: 'd', text: 'It eliminates the need for presigned URLs', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What do lifecycle policies automate?',
    options: [
      { id: 'a', text: 'Automatic file compression and deduplication', correct: false },
      { id: 'b', text: 'Moving objects between storage classes and deleting expired objects based on rules', correct: true },
      { id: 'c', text: 'Replicating data across multiple regions in real time', correct: false },
      { id: 'd', text: 'Generating presigned URLs on a schedule', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'When is S3 versioning most valuable?',
    options: [
      { id: 'a', text: 'When you need to reduce storage costs', correct: false },
      { id: 'b', text: 'When you need to speed up file downloads', correct: false },
      { id: 'c', text: 'When you need to recover from accidental deletes or overwrites, or maintain an audit trail', correct: true },
      { id: 'd', text: 'When you need to serve files from multiple regions', correct: false },
    ],
  },
]

/* ── Multipart chunk data ── */
const TOTAL_CHUNKS = 8
const FILE_SIZE_MB = 800

/* ═══════════════════════════════════════════════════════════════
   LEVEL 25 — Blob Storage & Object Stores
   ═══════════════════════════════════════════════════════════════ */
export default function Level25({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* ── Upload flow sim ── */
  const [uploadPath, setUploadPath] = useState(null) // 'direct' | 'presigned'
  const [uploadStep, setUploadStep] = useState(0)
  const [uploadRunning, setUploadRunning] = useState(false)

  /* ── Multipart sim ── */
  const [chunkStates, setChunkStates] = useState(Array(TOTAL_CHUNKS).fill('pending'))
  const [multipartRunning, setMultipartRunning] = useState(false)
  const [multipartComplete, setMultipartComplete] = useState(false)

  /* ── Storage class comparison ── */
  const [selectedClass, setSelectedClass] = useState(null)

  /* ── Lifecycle sim ── */
  const [lifecycleDay, setLifecycleDay] = useState(0)
  const [lifecycleRunning, setLifecycleRunning] = useState(false)
  const [lifecycleFileState, setLifecycleFileState] = useState('Standard')

  /* ── Quiz ── */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Upload flow animation ── */
  const directSteps = [
    { label: 'Client', sub: 'User selects 200MB video' },
    { label: 'Your Server', sub: 'Receives entire file (CPU + RAM spike)' },
    { label: 'S3 Bucket', sub: 'Server re-uploads to S3' },
    { label: 'Done', sub: '200MB traveled twice — slow & expensive' },
  ]

  const presignedSteps = [
    { label: 'Client', sub: 'User selects 200MB video' },
    { label: 'Your Server', sub: 'Generates presigned URL (tiny request)' },
    { label: 'Client → S3', sub: 'Client uploads directly to S3' },
    { label: 'Done', sub: '200MB traveled once — fast & cheap' },
  ]

  const runUploadSim = useCallback((path) => {
    setUploadPath(path)
    setUploadStep(0)
    setUploadRunning(true)
    let step = 0
    const steps = path === 'direct' ? directSteps : presignedSteps
    const interval = setInterval(() => {
      step += 1
      if (step >= steps.length) {
        clearInterval(interval)
        setUploadRunning(false)
      }
      setUploadStep(step)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  /* ── Multipart upload animation ── */
  const runMultipart = useCallback(() => {
    setChunkStates(Array(TOTAL_CHUNKS).fill('pending'))
    setMultipartRunning(true)
    setMultipartComplete(false)

    const delays = Array.from({ length: TOTAL_CHUNKS }, () => 400 + Math.random() * 1200)

    delays.forEach((delay, i) => {
      // Start uploading
      setTimeout(() => {
        setChunkStates(prev => {
          const next = [...prev]
          next[i] = 'uploading'
          return next
        })
      }, i * 150)

      // Complete
      setTimeout(() => {
        setChunkStates(prev => {
          const next = [...prev]
          next[i] = 'done'
          return next
        })
      }, i * 150 + delay)
    })

    const maxTime = TOTAL_CHUNKS * 150 + Math.max(...delays) + 200
    setTimeout(() => {
      setMultipartRunning(false)
      setMultipartComplete(true)
    }, maxTime)
  }, [])

  /* ── Lifecycle animation ── */
  const runLifecycle = useCallback(() => {
    setLifecycleDay(0)
    setLifecycleRunning(true)
    setLifecycleFileState('Standard')

    let day = 0
    const interval = setInterval(() => {
      day += 15
      if (day > 1100) {
        clearInterval(interval)
        setLifecycleRunning(false)
        setLifecycleDay(1095)
        setLifecycleFileState('Deleted')
        return
      }
      setLifecycleDay(day)

      if (day >= 730) setLifecycleFileState('Deep Archive')
      else if (day >= 365) setLifecycleFileState('Glacier')
      else if (day >= 90) setLifecycleFileState('Infrequent Access')
      else setLifecycleFileState('Standard')
    }, 80)

    return () => clearInterval(interval)
  }, [])

  /* ── Quiz submit ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (onComplete) onComplete()
  }

  const sectionTitles = [
    'The Problem',
    'Upload Flows & Presigned URLs',
    'Multipart Upload',
    'Storage Classes & Lifecycle',
    'Knowledge Check',
  ]

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Progress bar ── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {sectionTitles.map((title, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`text-xs font-medium transition-colors
                ${i === currentSection ? 'text-quest-primary' : i < currentSection ? 'text-quest-success' : 'text-quest-muted'}`}
            >
              {title}
            </button>
          ))}
        </div>
        <div className="h-1.5 bg-quest-bg rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-quest-primary to-sky-400 rounded-full"
            animate={{ width: `${((currentSection) / (sectionTitles.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* ═══════════════════ SECTION 0: THE PROBLEM ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Film className="text-red-400" />
              Level 25 — Blob Storage & Object Stores
            </h2>
            <p className="text-lg text-quest-muted italic mb-6">
              "Storing the Big Stuff"
            </p>

            {/* Story intro */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-red-500/20">
              <h3 className="font-semibold text-red-400 mb-3">The Crisis</h3>
              <p className="text-sm text-quest-muted leading-relaxed mb-4">
                Your video platform is growing fast. Users upload 4K videos averaging 2-4GB each.
                Last Tuesday at 3am, your on-call engineer got paged:{' '}
                <span className="text-red-400 font-mono text-xs">CRITICAL: /dev/sda1 — disk usage 98%</span>.
                The server's local disk is full. You cannot store user uploads on your application server.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <Film size={24} className="mx-auto text-red-400 mb-1" />
                  <p className="text-xs text-quest-muted">4K videos</p>
                  <p className="text-sm font-bold text-red-400">2-4 GB each</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <Upload size={24} className="mx-auto text-yellow-400 mb-1" />
                  <p className="text-xs text-quest-muted">Daily uploads</p>
                  <p className="text-sm font-bold text-yellow-400">500+ files</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <HardDrive size={24} className="mx-auto text-red-500 mb-1" />
                  <p className="text-xs text-quest-muted">Server disk</p>
                  <p className="text-sm font-bold text-red-500">98% full</p>
                </div>
              </div>
            </div>

            {/* The solution */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-green-500/20">
              <h3 className="font-semibold text-green-400 mb-3">The Solution: Object Storage</h3>
              <p className="text-sm text-quest-muted leading-relaxed mb-4">
                <Term
                  word="Object Storage"
                  definition="A storage architecture that manages data as objects (blobs) rather than files in a hierarchy or blocks on a disk. Each object includes the data itself, metadata, and a unique identifier. Designed for massive scale — services like AWS S3 can store virtually unlimited data."
                  onLearn={learnTerm}
                />{' '}
                (also called{' '}
                <Term
                  word="Blob Storage"
                  definition="Binary Large Object storage. A type of object storage optimized for storing massive amounts of unstructured data — images, videos, documents, backups. Azure calls it Blob Storage, AWS calls it S3, GCP calls it Cloud Storage."
                  onLearn={learnTerm}
                />
                ) is purpose-built for this. Services like{' '}
                <Term
                  word="S3"
                  definition="Amazon Simple Storage Service — the most widely used object store. Offers 99.999999999% (11 nines) durability, virtually unlimited storage, and a simple PUT/GET API. Objects are stored in 'buckets' and identified by keys (paths)."
                  onLearn={learnTerm}
                />{' '}
                give you virtually unlimited, highly durable storage accessible over HTTP.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-surface rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-xs font-semibold text-red-400 mb-2">Local Disk / Block Storage</h4>
                  <ul className="space-y-1 text-[11px] text-quest-muted">
                    <li>- Fixed capacity (need to provision)</li>
                    <li>- Tied to one server</li>
                    <li>- File system hierarchy</li>
                    <li>- Great for databases, OS, apps</li>
                    <li>- Low latency, high throughput</li>
                  </ul>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-green-500/20">
                  <h4 className="text-xs font-semibold text-green-400 mb-2">Object Storage (S3)</h4>
                  <ul className="space-y-1 text-[11px] text-quest-muted">
                    <li>- Virtually unlimited capacity</li>
                    <li>- Accessible from anywhere via HTTP</li>
                    <li>- Flat namespace (key-value)</li>
                    <li>- Great for files, media, backups</li>
                    <li>- 11 nines durability</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Object anatomy */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Anatomy of an S3 Object</h4>
              <div className="bg-quest-bg rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 w-20 flex-shrink-0">Bucket:</span>
                  <span className="text-quest-text">my-app-uploads</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 w-20 flex-shrink-0">Key:</span>
                  <span className="text-quest-text">videos/user-42/intro-4k.mp4</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 w-20 flex-shrink-0">Data:</span>
                  <span className="text-quest-muted">[2.3 GB binary blob]</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 w-20 flex-shrink-0">Metadata:</span>
                  <span className="text-quest-muted">{'{ content-type: "video/mp4", uploaded-by: "user-42", resolution: "3840x2160" }'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 w-20 flex-shrink-0">Version:</span>
                  <span className="text-quest-muted">v3 (if versioning enabled)</span>
                </div>
              </div>
            </div>

            <DeepDive id="object-vs-block-vs-file" title="Object vs Block vs File Storage — When to Use What" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Block Storage (EBS, Persistent Disk):</strong> Low-level
                  storage divided into fixed-size blocks. No metadata, no HTTP access. Your OS sees it as a raw disk.
                  Use for databases (Postgres, MySQL), operating systems, and any workload that needs
                  low-latency random reads/writes. Think of it as a virtual hard drive.
                </p>
                <p>
                  <strong className="text-quest-text">File Storage (EFS, NFS):</strong> A shared file system that
                  multiple servers can mount simultaneously. Has directories, file names, permissions. Use when
                  multiple servers need to read/write the same files concurrently — shared config, CMS uploads,
                  container shared volumes.
                </p>
                <p>
                  <strong className="text-quest-text">Object Storage (S3, GCS, Azure Blob):</strong> Flat key-value
                  store accessed via HTTP APIs. Each object has data + metadata + unique key. No hierarchy (the "/" in
                  keys is just a naming convention). Use for user uploads, backups, static assets, data lake storage,
                  log archives. Cheapest per GB, most durable, most scalable.
                </p>
                <p>
                  <strong className="text-quest-text">Rule of thumb:</strong> If your application writes it → block
                  storage. If users upload it → object storage. If multiple servers share it → file storage.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Upload Flows
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: UPLOAD FLOWS ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Upload className="text-sky-400" />
              Upload Flows & Presigned URLs
            </h2>

            <p className="text-sm text-quest-muted mb-6">
              When a user uploads a 200MB video, should it pass through your server? Let's compare both approaches.
              Click a path to see the flow animated.
            </p>

            {/* Path selection */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => runUploadSim('direct')}
                disabled={uploadRunning}
                className={`p-5 rounded-xl border transition-all text-left
                  ${uploadPath === 'direct'
                    ? 'border-red-500/40 bg-red-500/5 ring-1 ring-red-500/20'
                    : 'border-white/10 hover:border-red-500/20 bg-quest-bg'
                  } disabled:opacity-50`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <HardDrive size={16} className="text-red-400" />
                  </div>
                  <h4 className="text-sm font-semibold">Through Server (Naive)</h4>
                </div>
                <p className="text-[11px] text-quest-muted">Client → Server → S3. File passes through your server twice.</p>
              </button>

              <button
                onClick={() => runUploadSim('presigned')}
                disabled={uploadRunning}
                className={`p-5 rounded-xl border transition-all text-left
                  ${uploadPath === 'presigned'
                    ? 'border-green-500/40 bg-green-500/5 ring-1 ring-green-500/20'
                    : 'border-white/10 hover:border-green-500/20 bg-quest-bg'
                  } disabled:opacity-50`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Link size={16} className="text-green-400" />
                  </div>
                  <h4 className="text-sm font-semibold">Presigned URL (Smart)</h4>
                </div>
                <p className="text-[11px] text-quest-muted">Server gives a signed URL. Client uploads directly to S3.</p>
              </button>
            </div>

            {/* Animated flow */}
            <AnimatePresence mode="wait">
              {uploadPath && (
                <motion.div
                  key={uploadPath}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className={`bg-quest-bg rounded-xl p-6 mb-6 border ${uploadPath === 'direct' ? 'border-red-500/20' : 'border-green-500/20'}`}>
                    <h4 className={`text-sm font-semibold mb-4 ${uploadPath === 'direct' ? 'text-red-400' : 'text-green-400'}`}>
                      {uploadPath === 'direct' ? 'Server-Proxied Upload Flow' : 'Presigned URL Upload Flow'}
                    </h4>

                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      {(uploadPath === 'direct' ? directSteps : presignedSteps).map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0.3 }}
                          animate={{
                            opacity: i <= uploadStep ? 1 : 0.3,
                            scale: i === uploadStep ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`px-4 py-3 rounded-lg border transition-all ${
                            i <= uploadStep
                              ? uploadPath === 'direct'
                                ? 'bg-red-500/10 border-red-500/30'
                                : 'bg-green-500/10 border-green-500/30'
                              : 'bg-quest-surface border-white/10'
                          }`}>
                            <p className="text-xs font-medium">{step.label}</p>
                            <p className="text-[10px] text-quest-muted mt-0.5">{step.sub}</p>
                          </div>
                          {i < (uploadPath === 'direct' ? directSteps : presignedSteps).length - 1 && (
                            <ArrowRight size={14} className={`flex-shrink-0 ${
                              i < uploadStep
                                ? uploadPath === 'direct' ? 'text-red-400' : 'text-green-400'
                                : 'text-white/20'
                            }`} />
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Bandwidth comparison */}
                    {!uploadRunning && uploadStep >= 3 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 grid grid-cols-2 gap-3"
                      >
                        <div className="bg-quest-surface rounded-lg p-3">
                          <p className="text-[10px] text-quest-muted mb-1">Server Bandwidth</p>
                          <p className={`text-sm font-bold ${uploadPath === 'direct' ? 'text-red-400' : 'text-green-400'}`}>
                            {uploadPath === 'direct' ? '400 MB (in + out)' : '~1 KB (URL only)'}
                          </p>
                        </div>
                        <div className="bg-quest-surface rounded-lg p-3">
                          <p className="text-[10px] text-quest-muted mb-1">Server CPU / RAM</p>
                          <p className={`text-sm font-bold ${uploadPath === 'direct' ? 'text-red-400' : 'text-green-400'}`}>
                            {uploadPath === 'direct' ? 'High (buffering)' : 'Near zero'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Presigned URL explanation */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">How{' '}
                <Term
                  word="Presigned URLs"
                  definition="A URL with embedded authentication credentials and an expiration time. It grants temporary permission to perform a specific operation (PUT or GET) on a specific S3 object — without needing AWS credentials on the client."
                  onLearn={learnTerm}
                />{' '}
                Work
              </h4>
              <div className="bg-quest-bg rounded-lg p-4 font-mono text-[11px] space-y-2">
                <p className="text-quest-muted">// 1. Client asks your server for an upload URL</p>
                <p className="text-sky-400">POST /api/upload-url {'{ filename: "intro.mp4", type: "video/mp4" }'}</p>
                <p className="text-quest-muted mt-3">// 2. Server generates a presigned PUT URL (expires in 15 min)</p>
                <p className="text-green-400">{'{'} url: "https://bucket.s3.amazonaws.com/videos/abc123?</p>
                <p className="text-green-400 pl-4">X-Amz-Algorithm=AWS4-HMAC-SHA256&</p>
                <p className="text-green-400 pl-4">X-Amz-Credential=...&</p>
                <p className="text-green-400 pl-4">X-Amz-Expires=900&</p>
                <p className="text-green-400 pl-4">X-Amz-Signature=..." {'}'}</p>
                <p className="text-quest-muted mt-3">// 3. Client uploads directly to S3 using that URL</p>
                <p className="text-yellow-400">PUT {'<presigned-url>'} --data-binary @intro.mp4</p>
              </div>
            </div>

            <DeepDive id="presigned-security" title="Presigned URL Security Best Practices" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Short expiration:</strong> Always set presigned URLs to expire
                  quickly (5-15 minutes). If a URL leaks, the window of abuse is minimal.
                </p>
                <p>
                  <strong className="text-quest-text">Content type restriction:</strong> Lock the presigned URL to a
                  specific content type. A URL generated for <code className="text-xs font-mono">video/mp4</code> should
                  reject an attempt to upload an executable.
                </p>
                <p>
                  <strong className="text-quest-text">Size limits:</strong> Use S3 bucket policies to enforce maximum
                  object sizes. A presigned URL alone does not limit upload size.
                </p>
                <p>
                  <strong className="text-quest-text">Scan after upload:</strong> Trigger a Lambda on S3 PUT events to
                  scan uploaded files for malware, validate file types, and generate thumbnails. Never trust client-side
                  validation alone.
                </p>
                <p>
                  <strong className="text-quest-text">Presigned downloads:</strong> Presigned GET URLs work the same
                  way — generate a temporary download link for private content. Great for paywalled content, medical
                  records, or any file that should not be publicly accessible.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Multipart Upload
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: MULTIPART UPLOAD ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-purple-400" />
              Multipart Upload
            </h2>

            <p className="text-sm text-quest-muted mb-6">
              A single HTTP request has limits. S3's single PUT maxes out at 5GB, and if the
              connection drops at 99%, you start over.{' '}
              <Term
                word="Multipart Upload"
                definition="A mechanism to upload a single large object as a set of parts. Each part is uploaded independently and can be retried individually. Parts upload in parallel for speed. After all parts are uploaded, S3 assembles them into the final object. Required for objects over 5GB, recommended for anything over 100MB."
                onLearn={learnTerm}
              />{' '}
              solves this by splitting files into chunks uploaded in parallel.
            </p>

            {/* Simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-purple-400">
                    Uploading: 4K_drone_footage.mp4 ({FILE_SIZE_MB} MB)
                  </h4>
                  <p className="text-[11px] text-quest-muted">
                    Split into {TOTAL_CHUNKS} chunks of {Math.round(FILE_SIZE_MB / TOTAL_CHUNKS)} MB each
                  </p>
                </div>
                <button
                  onClick={runMultipart}
                  disabled={multipartRunning}
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
                >
                  {multipartComplete ? 'Replay' : multipartRunning ? 'Uploading...' : 'Start Upload'}
                </button>
              </div>

              {/* Chunk grid */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {chunkStates.map((state, i) => (
                  <motion.div
                    key={i}
                    animate={
                      state === 'uploading'
                        ? { borderColor: ['rgba(168,85,247,0.3)', 'rgba(168,85,247,0.7)', 'rgba(168,85,247,0.3)'] }
                        : {}
                    }
                    transition={state === 'uploading' ? { repeat: Infinity, duration: 0.8 } : {}}
                    className={`rounded-lg p-3 border transition-all duration-300 ${
                      state === 'done'
                        ? 'bg-green-500/10 border-green-500/30'
                        : state === 'uploading'
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : 'bg-quest-surface border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-quest-muted">Part {i + 1}</span>
                      {state === 'done' && <CheckCircle size={12} className="text-green-400" />}
                      {state === 'uploading' && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        >
                          <RefreshCw size={12} className="text-purple-400" />
                        </motion.div>
                      )}
                    </div>
                    <p className="text-[10px] text-quest-muted">{Math.round(FILE_SIZE_MB / TOTAL_CHUNKS)} MB</p>
                    {state === 'uploading' && (
                      <div className="h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          className="h-full bg-purple-400 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.2, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Overall progress */}
              <div className="mb-3">
                <div className="flex justify-between text-[10px] text-quest-muted mb-1">
                  <span>Overall progress</span>
                  <span>{Math.round((chunkStates.filter(s => s === 'done').length / TOTAL_CHUNKS) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-green-400 rounded-full"
                    animate={{ width: `${(chunkStates.filter(s => s === 'done').length / TOTAL_CHUNKS) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {multipartComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-center"
                >
                  <p className="text-xs text-green-400 font-medium">
                    Upload complete! S3 assembled all {TOTAL_CHUNKS} parts into the final object.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Multipart benefits */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              <div className="bg-quest-surface rounded-lg p-4">
                <Upload size={20} className="text-purple-400 mb-2" />
                <h4 className="text-xs font-semibold mb-1">Parallel Upload</h4>
                <p className="text-[11px] text-quest-muted">
                  Multiple chunks upload simultaneously. An 800MB file with 8 parallel streams finishes 4-6x faster than a single stream.
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4">
                <RefreshCw size={20} className="text-sky-400 mb-2" />
                <h4 className="text-xs font-semibold mb-1">Resumable</h4>
                <p className="text-[11px] text-quest-muted">
                  If chunk 5 fails, retry only chunk 5. No need to re-upload the entire file. Critical for mobile users on flaky connections.
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4">
                <Layers size={20} className="text-green-400 mb-2" />
                <h4 className="text-xs font-semibold mb-1">No Size Limit</h4>
                <p className="text-[11px] text-quest-muted">
                  Single PUT maxes at 5GB. Multipart supports objects up to 5TB. Each part can be 5MB to 5GB.
                </p>
              </div>
            </div>

            {/* Multipart flow */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Multipart Upload API Flow</h4>
              <div className="space-y-3">
                {[
                  { step: 1, api: 'CreateMultipartUpload', desc: 'Initiate upload, get an UploadId', color: 'text-sky-400' },
                  { step: 2, api: 'UploadPart (x N)', desc: 'Upload each chunk with UploadId + PartNumber. Returns ETag per part.', color: 'text-purple-400' },
                  { step: 3, api: 'CompleteMultipartUpload', desc: 'Send list of {PartNumber, ETag}. S3 assembles the final object.', color: 'text-green-400' },
                  { step: '!', api: 'AbortMultipartUpload', desc: 'If something goes wrong, abort to clean up orphaned parts (they cost money!).', color: 'text-red-400' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full ${item.step === '!' ? 'bg-red-500/20' : 'bg-quest-bg'} flex items-center justify-center text-[10px] font-bold ${item.color} flex-shrink-0 mt-0.5`}>
                      {item.step}
                    </div>
                    <div>
                      <code className={`text-xs font-mono ${item.color}`}>{item.api}</code>
                      <p className="text-[11px] text-quest-muted mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="multipart-tips" title="Multipart Upload in Practice" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Chunk size tradeoff:</strong> Smaller chunks (5-10MB) give better
                  resumability but more HTTP overhead. Larger chunks (50-100MB) are more efficient but costly to retry.
                  AWS recommends 8-16MB for most workloads.
                </p>
                <p>
                  <strong className="text-quest-text">Presigned parts:</strong> You can combine multipart upload with
                  presigned URLs. Generate a presigned URL per part so the client uploads each chunk directly to S3.
                  Libraries like <code className="text-xs font-mono">@aws-sdk/lib-storage</code> and{' '}
                  <code className="text-xs font-mono">uppy.io</code> handle this automatically.
                </p>
                <p>
                  <strong className="text-quest-text">Abort incomplete uploads:</strong> Orphaned multipart uploads
                  (started but never completed) silently accumulate storage costs. Set a lifecycle rule to
                  auto-abort incomplete uploads after 7 days.
                </p>
                <p>
                  <strong className="text-quest-text">Content-MD5:</strong> Send an MD5 checksum with each part so S3
                  can verify data integrity. If a part is corrupted in transit, S3 rejects it immediately rather than
                  silently storing bad data.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Storage Classes & Lifecycle
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: STORAGE CLASSES & LIFECYCLE ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="text-yellow-400" />
              Storage Classes & Lifecycle Policies
            </h2>

            <p className="text-sm text-quest-muted mb-6">
              Not all data is accessed equally. A video uploaded today gets streamed thousands of times this week,
              but a year from now? Maybe never. Storage classes let you pay based on actual access patterns.
            </p>

            {/* Storage class cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {storageClasses.map((sc) => {
                const Icon = sc.icon
                const isSelected = selectedClass === sc.name
                return (
                  <motion.button
                    key={sc.name}
                    onClick={() => setSelectedClass(isSelected ? null : sc.name)}
                    whileHover={{ scale: 1.01 }}
                    className={`text-left p-5 rounded-xl border transition-all
                      ${isSelected
                        ? `${sc.border} ${sc.bg} ring-1 ring-current`
                        : 'border-white/10 bg-quest-bg hover:border-white/20'
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${sc.bg} flex items-center justify-center`}>
                        <Icon size={16} className={sc.color} />
                      </div>
                      <h4 className={`text-sm font-semibold ${sc.color}`}>{sc.name}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] mb-3">
                      <div>
                        <span className="text-quest-muted">Storage</span>
                        <p className="font-mono font-medium text-quest-text">{sc.costPerGB}/GB/mo</p>
                      </div>
                      <div>
                        <span className="text-quest-muted">Retrieval</span>
                        <p className="font-mono font-medium text-quest-text">{sc.retrievalCost}</p>
                      </div>
                      <div>
                        <span className="text-quest-muted">Retrieval Time</span>
                        <p className="font-mono font-medium text-quest-text">{sc.retrievalTime}</p>
                      </div>
                      <div>
                        <span className="text-quest-muted">Durability</span>
                        <p className="font-mono font-medium text-quest-text">{sc.durability}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-quest-muted">{sc.useCase}</p>
                  </motion.button>
                )
              })}
            </div>

            {/* Cost comparison bar chart */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Monthly Cost: Storing 10 TB</h4>
              <div className="space-y-3">
                {[
                  { name: 'Standard', cost: 230, color: 'bg-green-400' },
                  { name: 'Infrequent Access', cost: 125, color: 'bg-sky-400' },
                  { name: 'Glacier', cost: 40, color: 'bg-purple-400' },
                  { name: 'Deep Archive', cost: 9.9, color: 'bg-indigo-400' },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-quest-muted">{item.name}</span>
                      <span className="font-mono text-quest-text">${item.cost}/mo</span>
                    </div>
                    <div className="h-3 bg-quest-bg rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.cost / 230) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-quest-muted mt-3">
                Deep Archive is 23x cheaper than Standard. The tradeoff: 12-48 hour retrieval time.
              </p>
            </div>

            {/* Lifecycle policy simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-yellow-500/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                    <Clock size={16} />
                    <Term
                      word="Lifecycle Policies"
                      definition="Rules that automatically transition objects between storage classes or delete them based on age. For example: move to IA after 90 days, Glacier after 365 days, delete after 3 years. Saves money without manual intervention."
                      onLearn={learnTerm}
                    />
                    {' '}Simulation
                  </h4>
                  <p className="text-[11px] text-quest-muted mt-1">Watch a file move through storage classes over time</p>
                </div>
                <button
                  onClick={runLifecycle}
                  disabled={lifecycleRunning}
                  className="btn-primary text-xs px-4 py-2 disabled:opacity-50"
                >
                  {lifecycleDay > 0 && !lifecycleRunning ? 'Replay' : lifecycleRunning ? 'Running...' : 'Run Policy'}
                </button>
              </div>

              {/* Timeline */}
              <div className="relative mb-6">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 via-sky-400 via-purple-400 to-indigo-400 rounded-full"
                    animate={{ width: `${Math.min((lifecycleDay / 1095) * 100, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Stage markers */}
                <div className="flex justify-between mt-2">
                  {lifecycleStages.map((stage) => (
                    <div key={stage.id} className="text-center" style={{ width: `${100 / lifecycleStages.length}%` }}>
                      <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                        lifecycleDay >= stage.day ? 'bg-quest-primary' : 'bg-white/20'
                      }`} />
                      <p className={`text-[9px] ${lifecycleDay >= stage.day ? 'text-quest-text' : 'text-quest-muted'}`}>
                        {stage.label}
                      </p>
                      <p className="text-[8px] text-quest-muted">Day {stage.day}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current state */}
              <div className="bg-quest-surface rounded-lg p-4 flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Film size={32} className={
                    lifecycleFileState === 'Standard' ? 'text-green-400'
                    : lifecycleFileState === 'Infrequent Access' ? 'text-sky-400'
                    : lifecycleFileState === 'Glacier' ? 'text-purple-400'
                    : lifecycleFileState === 'Deep Archive' ? 'text-indigo-400'
                    : 'text-red-400'
                  } />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">drone_footage_4k.mp4</p>
                  <p className="text-[11px] text-quest-muted">
                    Day {lifecycleDay} — Class: <span className="font-semibold text-quest-text">{lifecycleFileState}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-quest-muted">Monthly cost</p>
                  <p className="text-sm font-mono font-bold text-quest-text">
                    {lifecycleFileState === 'Standard' ? '$0.023' :
                     lifecycleFileState === 'Infrequent Access' ? '$0.0125' :
                     lifecycleFileState === 'Glacier' ? '$0.004' :
                     lifecycleFileState === 'Deep Archive' ? '$0.00099' :
                     '$0.00'}/GB
                  </p>
                </div>
              </div>
            </div>

            {/* Lifecycle rule config */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Example Lifecycle Configuration</h4>
              <div className="bg-quest-bg rounded-lg p-4 font-mono text-[11px] space-y-1">
                <p className="text-quest-muted">{'{'}</p>
                <p className="text-quest-muted pl-4">"Rules": [</p>
                <p className="text-quest-muted pl-8">{'{'}</p>
                <p className="pl-12"><span className="text-sky-400">"ID"</span>: <span className="text-green-400">"archive-old-videos"</span>,</p>
                <p className="pl-12"><span className="text-sky-400">"Filter"</span>: {'{'} <span className="text-sky-400">"Prefix"</span>: <span className="text-green-400">"videos/"</span> {'}'},</p>
                <p className="pl-12"><span className="text-sky-400">"Transitions"</span>: [</p>
                <p className="pl-16">{'{'} <span className="text-sky-400">"Days"</span>: <span className="text-yellow-400">90</span>, <span className="text-sky-400">"StorageClass"</span>: <span className="text-green-400">"STANDARD_IA"</span> {'}'},</p>
                <p className="pl-16">{'{'} <span className="text-sky-400">"Days"</span>: <span className="text-yellow-400">365</span>, <span className="text-sky-400">"StorageClass"</span>: <span className="text-green-400">"GLACIER"</span> {'}'},</p>
                <p className="pl-16">{'{'} <span className="text-sky-400">"Days"</span>: <span className="text-yellow-400">730</span>, <span className="text-sky-400">"StorageClass"</span>: <span className="text-green-400">"DEEP_ARCHIVE"</span> {'}'}</p>
                <p className="pl-12">],</p>
                <p className="pl-12"><span className="text-sky-400">"Expiration"</span>: {'{'} <span className="text-sky-400">"Days"</span>: <span className="text-red-400">1095</span> {'}'},</p>
                <p className="pl-12"><span className="text-sky-400">"AbortIncompleteMultipartUpload"</span>: {'{'} <span className="text-sky-400">"DaysAfterInitiation"</span>: <span className="text-yellow-400">7</span> {'}'}</p>
                <p className="text-quest-muted pl-8">{'}'}</p>
                <p className="text-quest-muted pl-4">]</p>
                <p className="text-quest-muted">{'}'}</p>
              </div>
            </div>

            {/* Versioning */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-sky-500/20">
              <h3 className="font-semibold text-sky-400 mb-3 flex items-center gap-2">
                <RefreshCw size={18} />
                <Term
                  word="Versioning"
                  definition="An S3 feature that keeps every version of every object. When you overwrite or delete an object, S3 keeps the old version. You can restore any previous version. Essential for audit trails, compliance, and 'oops I deleted everything' recovery."
                  onLearn={learnTerm}
                />
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                Without versioning, a PUT to the same key silently overwrites the object. With versioning enabled,
                every write creates a new version. Deletes add a "delete marker" but the old versions remain.
              </p>

              {/* Versioning visual */}
              <div className="bg-quest-surface rounded-lg p-4">
                <h4 className="text-xs font-semibold mb-3">Object: profile/avatar.png</h4>
                <div className="space-y-2">
                  {[
                    { version: 'v3', date: '2025-03-15', size: '340 KB', status: 'current', action: 'Updated (latest)' },
                    { version: 'v2', date: '2025-02-10', size: '290 KB', status: 'previous', action: 'Previous version' },
                    { version: 'v1', date: '2025-01-05', size: '1.2 MB', status: 'previous', action: 'Original upload' },
                  ].map((v) => (
                    <div key={v.version} className={`flex items-center gap-3 p-3 rounded-lg border ${
                      v.status === 'current'
                        ? 'bg-green-500/5 border-green-500/20'
                        : 'bg-quest-bg border-white/5'
                    }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                        v.status === 'current' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-quest-muted'
                      }`}>
                        {v.version}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{v.action}</p>
                        <p className="text-[10px] text-quest-muted">{v.date} — {v.size}</p>
                      </div>
                      {v.status === 'previous' && (
                        <span className="text-[10px] text-sky-400 font-medium">Restorable</span>
                      )}
                      {v.status === 'current' && (
                        <CheckCircle size={14} className="text-green-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DeepDive id="versioning-costs" title="Versioning Costs & MFA Delete" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Cost impact:</strong> Versioning stores every version of every
                  object. If a 1GB file is updated daily for 30 days, you are storing 30GB (not 1GB). Combine
                  versioning with lifecycle policies to expire old versions: "delete non-current versions after 90 days."
                </p>
                <p>
                  <strong className="text-quest-text">MFA Delete:</strong> Requires multi-factor authentication to
                  permanently delete object versions or disable versioning. Protects against compromised credentials.
                  Only the root account can enable MFA Delete.
                </p>
                <p>
                  <strong className="text-quest-text">Delete markers:</strong> When you DELETE a versioned object, S3
                  does not actually remove it. It inserts a "delete marker" as the latest version. GET requests return
                  404, but all previous versions still exist and can be restored by removing the delete marker.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="s3-internals" title="How S3 Achieves 11 Nines of Durability" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">99.999999999% durability</strong> means if you store 10 million
                  objects, you might lose a single object once every 10,000 years.
                </p>
                <p>
                  <strong className="text-quest-text">Reed-Solomon erasure coding:</strong> S3 splits each object into
                  chunks and creates redundant parity fragments. These fragments are distributed across multiple
                  devices in multiple facilities within a region. Even if several storage devices fail simultaneously,
                  the object can be reconstructed from the remaining fragments.
                </p>
                <p>
                  <strong className="text-quest-text">Continuous integrity checking:</strong> S3 continuously verifies
                  checksums of stored data. If corruption is detected, it automatically restores the affected fragment
                  from redundant copies. This background self-healing is why durability is so high.
                </p>
                <p>
                  <strong className="text-quest-text">Cross-region replication:</strong> For even more durability (or
                  compliance), you can replicate objects to a bucket in another AWS region. This protects against
                  region-level disasters.
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
              <CheckCircle className="text-sky-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Object storage is the backbone of modern file handling at scale. Let's verify your understanding.
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

                  {/* Explanation after submit */}
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
                        {q.id === 'q1' && 'Object storage uses a flat namespace with metadata per object. Block storage operates at a lower level — raw blocks with no inherent metadata or file semantics.'}
                        {q.id === 'q2' && 'Presigned URLs offload the file transfer from your server to S3. Your server only generates a signed URL (a tiny response), and the client uploads/downloads directly to/from S3.'}
                        {q.id === 'q3' && 'Multipart upload splits a file into chunks that upload in parallel, can be individually retried, and bypass the 5GB single-request limit.'}
                        {q.id === 'q4' && 'Lifecycle policies automate cost optimization by moving objects to cheaper storage classes as they age, and deleting them when they expire.'}
                        {q.id === 'q5' && 'Versioning maintains a complete history of object changes. You can recover from accidental deletes (via delete markers) and overwrites (by reverting to a previous version).'}
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
                <h3 className="text-xl font-bold mb-2">Level 25 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand object storage, presigned URLs, multipart uploads, storage classes,
                  lifecycle policies, and versioning. Your 4K videos have a proper home — and your server's
                  disk can breathe again.
                </p>
                <p className="text-sm text-sky-400">
                  The big stuff is stored. On to the next challenge.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

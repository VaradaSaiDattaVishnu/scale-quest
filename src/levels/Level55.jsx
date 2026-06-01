import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, MessageCircle, Lock, Users, Wifi, Image, Phone } from 'lucide-react'

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
  'E2E Encryption': 'End-to-end encryption ensures only the sender and recipient can read messages. The server cannot decrypt the content, even if compromised.',
  'Signal Protocol': 'A cryptographic protocol providing E2E encryption with forward secrecy and future secrecy. Used by WhatsApp, Signal, and others.',
  'Message Queue': 'A buffer that stores messages asynchronously between producer and consumer. Ensures reliable delivery even when the recipient is offline.',
  'Presence System': 'A subsystem that tracks user online/offline status and last-seen timestamps, typically using persistent WebSocket connections.',
  'Fan-out': 'The process of distributing a single message to multiple recipients, such as all members of a group chat.',
  'Delivery Receipt': 'Acknowledgment signals indicating message status: sent (single check), delivered (double check), and read (blue checks).',
  'Forward Secrecy': 'A property where compromising one session key does not compromise past session keys, protecting historical messages.',
  'WebSocket': 'A persistent, full-duplex communication protocol over a single TCP connection, ideal for real-time messaging.',
  'Push Notification': 'A server-initiated alert sent to a mobile device when the app is not in the foreground, using APNs (iOS) or FCM (Android).',
  'Media CDN': 'A content delivery network optimized for storing and serving media files (images, videos, voice notes) with low latency.',
}

/* ── Message Flow Stages ── */
const messageFlowStages = [
  { id: 'compose', label: 'Sender types message', icon: 'MessageCircle', color: 'text-blue-400', bg: 'bg-blue-500/20', detail: 'Alice composes "Hey, are you free tonight?" in the chat UI.' },
  { id: 'encrypt', label: 'Encrypt with Signal Protocol', icon: 'Lock', color: 'text-purple-400', bg: 'bg-purple-500/20', detail: 'Message is encrypted using Bob\'s public key via the Signal Protocol. Only Bob\'s private key can decrypt it.' },
  { id: 'send', label: 'Send to Chat Server', icon: 'Wifi', color: 'text-cyan-400', bg: 'bg-cyan-500/20', detail: 'Encrypted payload is sent over a persistent WebSocket connection to the WhatsApp Chat Server.' },
  { id: 'queue', label: 'Queue in Message Store', icon: 'MessageCircle', color: 'text-yellow-400', bg: 'bg-yellow-500/20', detail: 'Server stores the encrypted message in a per-user message queue (e.g., HBase/Cassandra). It cannot read the content.' },
  { id: 'notify', label: 'Push Notification', icon: 'Phone', color: 'text-orange-400', bg: 'bg-orange-500/20', detail: 'If Bob is offline, a push notification is sent via APNs/FCM. The notification body is generic ("New message from Alice").' },
  { id: 'online', label: 'Recipient comes online', icon: 'Wifi', color: 'text-green-400', bg: 'bg-green-500/20', detail: 'Bob opens WhatsApp. His client establishes a WebSocket connection and requests pending messages.' },
  { id: 'deliver', label: 'Deliver encrypted message', icon: 'MessageCircle', color: 'text-teal-400', bg: 'bg-teal-500/20', detail: 'Server pushes the encrypted message to Bob\'s device through the WebSocket. Message is deleted from the server queue.' },
  { id: 'decrypt', label: 'Decrypt and display', icon: 'Lock', color: 'text-emerald-400', bg: 'bg-emerald-500/20', detail: 'Bob\'s device decrypts the message using his private key. "Hey, are you free tonight?" appears in the chat.' },
]

/* ── Architecture Components ── */
const architectureComponents = [
  { id: 'gateway', label: 'API Gateway', desc: 'Load balances WebSocket connections, handles TLS termination', color: 'bg-blue-500/20', border: 'border-blue-500/40' },
  { id: 'chat', label: 'Chat Server', desc: 'Manages WebSocket sessions, routes messages to correct recipients', color: 'bg-purple-500/20', border: 'border-purple-500/40' },
  { id: 'queue', label: 'Message Queue (Kafka)', desc: 'Decouples message ingestion from delivery, ensures ordering', color: 'bg-yellow-500/20', border: 'border-yellow-500/40' },
  { id: 'store', label: 'Message Store (Cassandra)', desc: 'Stores encrypted messages until delivered, then purges', color: 'bg-orange-500/20', border: 'border-orange-500/40' },
  { id: 'presence', label: 'Presence Service (Redis)', desc: 'Tracks online/offline status, last-seen via heartbeats', color: 'bg-green-500/20', border: 'border-green-500/40' },
  { id: 'push', label: 'Push Notification Service', desc: 'Sends APNs/FCM notifications when recipient is offline', color: 'bg-red-500/20', border: 'border-red-500/40' },
  { id: 'media', label: 'Media Service + CDN', desc: 'Handles image/video/audio upload, compression, and delivery', color: 'bg-pink-500/20', border: 'border-pink-500/40' },
  { id: 'group', label: 'Group Service', desc: 'Manages group membership, metadata, and message fan-out', color: 'bg-indigo-500/20', border: 'border-indigo-500/40' },
]

/* ── Group Members for Simulation ── */
const groupMembers = [
  { id: 'alice', name: 'Alice', color: 'text-blue-400' },
  { id: 'bob', name: 'Bob', color: 'text-green-400' },
  { id: 'charlie', name: 'Charlie', color: 'text-yellow-400' },
  { id: 'diana', name: 'Diana', color: 'text-purple-400' },
  { id: 'eve', name: 'Eve', color: 'text-pink-400' },
]

/* ── Quiz Questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'In WhatsApp\'s E2E encryption, who can read the message content?',
    options: [
      'The server and both participants',
      'Only the sender and recipient',
      'Only the recipient',
      'Anyone with the server key',
    ],
    correct: 1,
    explanation: 'E2E encryption means only the sender and recipient hold the keys to decrypt messages. The server stores only encrypted blobs it cannot read.',
  },
  {
    id: 'q2',
    question: 'What protocol does WhatsApp use for E2E encryption?',
    options: [
      'TLS/SSL',
      'PGP',
      'Signal Protocol',
      'AES-256 alone',
    ],
    correct: 2,
    explanation: 'WhatsApp uses the Signal Protocol (developed by Open Whisper Systems) which provides forward secrecy and future secrecy.',
  },
  {
    id: 'q3',
    question: 'How does WhatsApp handle message delivery when the recipient is offline?',
    options: [
      'Drops the message and retries later',
      'Stores encrypted message on server until recipient comes online',
      'Sends via SMS fallback',
      'Keeps retrying the WebSocket connection indefinitely',
    ],
    correct: 1,
    explanation: 'Messages are stored encrypted on the server (store-and-forward). When the recipient reconnects, pending messages are delivered and then purged from the server.',
  },
  {
    id: 'q4',
    question: 'What is the primary challenge of group messaging at scale?',
    options: [
      'Encrypting messages for each member individually',
      'Storing group metadata',
      'Rendering the UI for multiple messages',
      'Choosing the group admin',
    ],
    correct: 0,
    explanation: 'In E2E encrypted group chats, the sender must encrypt the message separately for each group member\'s key (fan-out encryption), which scales with group size.',
  },
  {
    id: 'q5',
    question: 'How does the WhatsApp presence system track online/offline status?',
    options: [
      'Polling the server every 5 seconds',
      'DNS-based heartbeats',
      'WebSocket connection heartbeats and disconnect detection',
      'GPS-based location tracking',
    ],
    correct: 2,
    explanation: 'The presence system uses WebSocket heartbeats. When a client disconnects or stops sending heartbeats, the server marks the user as offline and records last-seen.',
  },
  {
    id: 'q6',
    question: 'What do the double blue checkmarks indicate in WhatsApp?',
    options: [
      'Message was sent to the server',
      'Message was delivered to the recipient\'s device',
      'Message was read by the recipient',
      'Message was forwarded',
    ],
    correct: 2,
    explanation: 'Single gray check = sent to server. Double gray checks = delivered to device. Double blue checks = message opened/read by recipient.',
  },
  {
    id: 'q7',
    question: 'How does WhatsApp handle media (images/videos) differently from text messages?',
    options: [
      'Media is not encrypted',
      'Media is embedded directly in the message payload',
      'Media is encrypted, uploaded to CDN, and only the CDN link + decryption key is sent in the message',
      'Media is sent via a separate SMS channel',
    ],
    correct: 2,
    explanation: 'Media is encrypted client-side, uploaded to a CDN, and the message contains only the CDN URL plus the decryption key. This separates the heavy media transfer from the lightweight messaging path.',
  },
  {
    id: 'q8',
    question: 'What database type is best suited for WhatsApp\'s message storage?',
    options: [
      'Relational database (PostgreSQL)',
      'Document store (MongoDB)',
      'Wide-column store (Cassandra/HBase)',
      'Graph database (Neo4j)',
    ],
    correct: 2,
    explanation: 'Wide-column stores like Cassandra or HBase handle WhatsApp\'s write-heavy workload with excellent horizontal scalability and are optimized for time-series data like message logs.',
  },
]

/* ── Encryption Visual Steps ── */
const encryptionSteps = [
  { id: 'keygen', label: 'Key Generation', detail: 'Each user generates a public/private key pair during registration. Public keys are uploaded to WhatsApp\'s key server.', visual: 'Alice: PubA / PrivA\nBob:   PubB / PrivB' },
  { id: 'exchange', label: 'Key Exchange', detail: 'When Alice messages Bob for the first time, she fetches Bob\'s public key from the server and performs a Diffie-Hellman key exchange.', visual: 'Alice fetches PubB from server\nDH(PrivA, PubB) => SharedSecret' },
  { id: 'session', label: 'Session Key Derivation', detail: 'A unique session key (ratcheting) is derived from the shared secret. Each message uses a new derived key for forward secrecy.', visual: 'SharedSecret => RootKey\nRootKey => ChainKey => MessageKey1\n                    => MessageKey2 ...' },
  { id: 'encrypt', label: 'Message Encryption', detail: 'The plaintext message is encrypted with the current message key using AES-256-CBC.', visual: '"Hey!" + MessageKey42 => 0xA3F2...9B1C' },
  { id: 'decrypt', label: 'Message Decryption', detail: 'Bob derives the same message key from his chain and decrypts the ciphertext.', visual: '0xA3F2...9B1C + MessageKey42 => "Hey!"' },
]

/* ── Main Component ── */
export default function Level55({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [activeTab, setActiveTab] = useState('story')
  const [flowStep, setFlowStep] = useState(-1)
  const [flowRunning, setFlowRunning] = useState(false)
  const [encryptionStep, setEncryptionStep] = useState(0)
  const [presenceUsers, setPresenceUsers] = useState({
    alice: { online: true, lastSeen: null },
    bob: { online: false, lastSeen: '2 min ago' },
    charlie: { online: true, lastSeen: null },
    diana: { online: false, lastSeen: '1 hr ago' },
    eve: { online: false, lastSeen: '5 min ago' },
  })
  const [groupMessage, setGroupMessage] = useState(null)
  const [deliveryStatus, setDeliveryStatus] = useState({})
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const allAnswered = Object.keys(quizAnswers).length === quizQuestions.length

  const tabs = [
    { id: 'story', label: 'Story', icon: MessageCircle },
    { id: 'flow', label: 'Message Flow', icon: Wifi },
    { id: 'encryption', label: 'E2E Encryption', icon: Lock },
    { id: 'presence', label: 'Presence', icon: Users },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'architecture', label: 'Architecture', icon: Phone },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle },
  ]

  /* ── Message Flow Animation ── */
  const runMessageFlow = () => {
    setFlowRunning(true)
    setFlowStep(0)
  }

  useEffect(() => {
    if (!flowRunning || flowStep < 0) return
    if (flowStep >= messageFlowStages.length) {
      setFlowRunning(false)
      return
    }
    const timer = setTimeout(() => {
      setFlowStep(prev => prev + 1)
    }, 1800)
    return () => clearTimeout(timer)
  }, [flowStep, flowRunning])

  /* ── Presence Toggle ── */
  const togglePresence = (userId) => {
    setPresenceUsers(prev => {
      const user = prev[userId]
      if (user.online) {
        return { ...prev, [userId]: { online: false, lastSeen: 'Just now' } }
      }
      return { ...prev, [userId]: { online: true, lastSeen: null } }
    })
  }

  /* ── Group Message Simulation ── */
  const sendGroupMessage = () => {
    setGroupMessage({ sender: 'alice', text: 'Team meeting at 3pm!', time: Date.now() })
    setDeliveryStatus({})

    const onlineMembers = groupMembers.filter(m => m.id !== 'alice' && presenceUsers[m.id]?.online)
    const offlineMembers = groupMembers.filter(m => m.id !== 'alice' && !presenceUsers[m.id]?.online)

    // Sent status for all
    setTimeout(() => {
      const status = {}
      groupMembers.forEach(m => {
        if (m.id !== 'alice') status[m.id] = 'sent'
      })
      setDeliveryStatus({ ...status })
    }, 500)

    // Delivered for online members
    onlineMembers.forEach((m, i) => {
      setTimeout(() => {
        setDeliveryStatus(prev => ({ ...prev, [m.id]: 'delivered' }))
      }, 1200 + i * 400)
    })

    // Read for online members after a delay
    onlineMembers.forEach((m, i) => {
      setTimeout(() => {
        setDeliveryStatus(prev => ({ ...prev, [m.id]: 'read' }))
      }, 2800 + i * 600)
    })

    // Offline members stay at 'sent'
    offlineMembers.forEach(m => {
      setTimeout(() => {
        setDeliveryStatus(prev => ({ ...prev, [m.id]: 'sent' }))
      }, 600)
    })
  }

  /* ── Quiz Handlers ── */
  const handleAnswer = (qId, optIdx) => {
    if (showResults) return
    setQuizAnswers(prev => ({ ...prev, [qId]: optIdx }))
  }

  const handleSubmitQuiz = () => {
    let s = 0
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) s++
    })
    setScore(s)
    setShowResults(true)
    if (s >= 6 && onComplete) onComplete()
  }

  const T = (word) => (
    <Term word={word} definition={terms[word] || ''} onLearn={learnTerm} />
  )

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="quest-card p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
            <MessageCircle size={22} className="text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Design WhatsApp</h1>
            <p className="text-quest-text/60 text-sm">Level 55 -- Messaging at Scale (HLD Case Study)</p>
          </div>
          {isCompleted && (
            <div className="ml-auto flex items-center gap-1 text-green-400">
              <CheckCircle size={20} />
              <span className="text-sm font-medium">Completed</span>
            </div>
          )}
        </div>
        <p className="text-quest-text/80 leading-relaxed">
          100 billion messages per day, {T('E2E Encryption')}, delivered reliably across
          the globe. Design WhatsApp -- one of the most critical real-time communication
          systems ever built. You will explore the {T('Signal Protocol')}, {T('Message Queue')} architecture,
          the {T('Presence System')}, group {T('Fan-out')}, and media handling via {T('Media CDN')}.
        </p>
      </motion.div>

      {/* ── Tab Navigation ── */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/25'
                  : 'bg-quest-surface/50 text-quest-text/60 hover:text-quest-text hover:bg-quest-surface'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Story Tab ── */}
      {activeTab === 'story' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageCircle size={20} className="text-green-400" />
              The WhatsApp Challenge
            </h2>
            <div className="space-y-4 text-quest-text/80 text-sm leading-relaxed">
              <p>
                WhatsApp handles <strong className="text-green-400">100 billion messages daily</strong> for
                over 2 billion users across 180+ countries. Every single message is {T('E2E Encryption')} --
                meaning not even WhatsApp can read your messages.
              </p>
              <p>
                The core challenge: deliver messages reliably and instantly between any two users on Earth,
                support group chats up to 1024 members, handle media (photos, videos, voice notes, documents),
                maintain {T('Presence System')} for online/offline/last-seen, and provide {T('Delivery Receipt')} --
                all while ensuring {T('Forward Secrecy')}.
              </p>
              <p>
                Key design constraints: messages must be stored on the server <em>only until delivered</em>
                (store-and-forward), the server must never see plaintext content, and the system must work
                gracefully with spotty mobile connections worldwide.
              </p>
            </div>

            <DeepDive id="dd-scale" title="WhatsApp's Scale Numbers" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Daily Messages', value: '100B+' },
                    { label: 'Monthly Users', value: '2B+' },
                    { label: 'Countries', value: '180+' },
                    { label: 'Max Group Size', value: '1,024' },
                  ].map(stat => (
                    <div key={stat.label} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                      <p className="text-lg font-bold text-green-400">{stat.value}</p>
                      <p className="text-xs text-quest-text/50">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <p>
                  WhatsApp famously ran on only ~50 engineers for years, serving billions of users.
                  Their Erlang-based backend (later migrated) handled ~2 million connections per server.
                  The architecture prioritizes simplicity: store-and-forward messaging with E2E encryption
                  means the server is essentially a relay that never needs to understand message content.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="dd-tradeoffs" title="Key Design Trade-offs" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>E2E Encryption vs. Server-Side Features:</strong> WhatsApp cannot offer server-side search, spam filtering on content, or message analytics because it cannot read messages.</li>
                  <li><strong>Store-and-Forward vs. Persistent History:</strong> Messages are deleted from the server after delivery. Chat history lives only on the device (or encrypted cloud backup).</li>
                  <li><strong>Fan-out Write vs. Fan-out Read:</strong> WhatsApp uses fan-out-on-write for group messages -- the sender's server writes a copy to each member's queue, trading storage for read latency.</li>
                  <li><strong>Presence Privacy:</strong> Last-seen and online status must balance real-time UX with user privacy controls.</li>
                </ul>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Message Flow Tab ── */}
      {activeTab === 'flow' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Wifi size={20} className="text-cyan-400" />
              Message Flow Simulation
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Watch a message travel from Alice to Bob. Each step shows the real process behind sending a WhatsApp message.
            </p>

            {/* Flow controls */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={runMessageFlow}
                disabled={flowRunning}
                className="px-5 py-2 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-medium hover:bg-green-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {flowStep >= messageFlowStages.length ? 'Replay Flow' : flowRunning ? 'Sending...' : 'Send Message'}
              </button>
              <button
                onClick={() => { setFlowStep(-1); setFlowRunning(false) }}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Flow visualization */}
            <div className="space-y-3">
              {messageFlowStages.map((stage, idx) => {
                const isActive = idx === flowStep
                const isPast = idx < flowStep
                const isFuture = idx > flowStep

                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: isFuture && flowStep >= 0 ? 0.2 : isPast ? 0.7 : isActive ? 1 : 0.4,
                      scale: isActive ? 1.02 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                      isActive
                        ? `${stage.bg} border-current ${stage.color}`
                        : isPast
                          ? 'bg-quest-surface/20 border-green-500/20'
                          : 'bg-quest-surface/10 border-white/5'
                    }`}
                  >
                    {/* Step number */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive ? stage.bg + ' ' + stage.color : isPast ? 'bg-green-500/20 text-green-400' : 'bg-quest-surface/30 text-quest-text/30'
                    }`}>
                      {isPast ? <CheckCircle size={16} /> : idx + 1}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${isActive ? stage.color : isPast ? 'text-green-400/80' : 'text-quest-text/40'}`}>
                        {stage.label}
                      </p>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-xs text-quest-text/70 mt-1"
                          >
                            {stage.detail}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Connector line */}
                    {idx < messageFlowStages.length - 1 && (
                      <div className={`absolute left-[2.25rem] h-3 w-px ${isPast ? 'bg-green-500/30' : 'bg-white/5'}`} />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Completion message */}
            <AnimatePresence>
              {flowStep >= messageFlowStages.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-sm"
                >
                  <p className="font-semibold text-green-400 mb-1">Message Delivered!</p>
                  <p className="text-quest-text/70">
                    The entire flow happens in milliseconds for online users. The server never sees plaintext --
                    it is merely a relay for encrypted blobs. If Bob were offline, the message would wait at step 4
                    until he reconnects.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── E2E Encryption Tab ── */}
      {activeTab === 'encryption' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Lock size={20} className="text-purple-400" />
              Signal Protocol Key Exchange
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Step through the {T('Signal Protocol')} to see how {T('E2E Encryption')} works
              with {T('Forward Secrecy')}.
            </p>

            {/* Step selector */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {encryptionSteps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setEncryptionStep(idx)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    encryptionStep === idx
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                      : 'bg-quest-surface/30 text-quest-text/50 border border-white/5 hover:text-quest-text/70'
                  }`}
                >
                  {idx + 1}. {step.label}
                </button>
              ))}
            </div>

            {/* Current step detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={encryptionStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="p-5 rounded-xl border border-purple-500/20 bg-purple-500/5">
                  <h3 className="font-bold text-purple-400 mb-2">
                    Step {encryptionStep + 1}: {encryptionSteps[encryptionStep].label}
                  </h3>
                  <p className="text-sm text-quest-text/80 mb-4">
                    {encryptionSteps[encryptionStep].detail}
                  </p>
                  <pre className="text-xs font-mono bg-black/30 p-4 rounded-lg text-purple-300/80 whitespace-pre-wrap">
                    {encryptionSteps[encryptionStep].visual}
                  </pre>
                </div>

                {/* Progress indicator */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEncryptionStep(prev => Math.max(0, prev - 1))}
                    disabled={encryptionStep === 0}
                    className="px-3 py-1 rounded-lg bg-quest-surface/30 text-quest-text/50 text-xs disabled:opacity-20"
                  >
                    Previous
                  </button>
                  <div className="flex-1 flex gap-1">
                    {encryptionSteps.map((_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-1.5 rounded-full transition-colors ${
                          idx <= encryptionStep ? 'bg-purple-500' : 'bg-quest-surface/30'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setEncryptionStep(prev => Math.min(encryptionSteps.length - 1, prev + 1))}
                    disabled={encryptionStep === encryptionSteps.length - 1}
                    className="px-3 py-1 rounded-lg bg-quest-surface/30 text-quest-text/50 text-xs disabled:opacity-20"
                  >
                    Next
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <DeepDive id="dd-double-ratchet" title="Double Ratchet Algorithm Deep Dive" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <p>
                  The Signal Protocol uses a <strong>Double Ratchet</strong> combining a Diffie-Hellman ratchet
                  with a symmetric-key ratchet:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>DH Ratchet:</strong> Each message exchange includes new ephemeral DH keys, providing future secrecy (compromising current keys does not compromise future messages).</li>
                  <li><strong>Symmetric Ratchet:</strong> A hash chain derives unique per-message keys, providing forward secrecy (compromising current keys does not reveal past messages).</li>
                  <li><strong>Out-of-order handling:</strong> Message keys can be stored for out-of-order decryption without breaking the ratchet.</li>
                </ul>
                <p>
                  This combination means that even if an attacker compromises a single session key, they can only
                  decrypt that one message -- not past or future messages.
                </p>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Presence System Tab ── */}
      {activeTab === 'presence' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Users size={20} className="text-green-400" />
              Presence System Simulation
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Toggle users online/offline to see how the {T('Presence System')} updates via {T('WebSocket')} connections.
              The server tracks connection heartbeats and records last-seen timestamps on disconnect.
            </p>

            {/* User cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {groupMembers.map(member => {
                const status = presenceUsers[member.id]
                return (
                  <motion.div
                    key={member.id}
                    layout
                    className={`p-4 rounded-xl border transition-colors ${
                      status?.online
                        ? 'bg-green-500/5 border-green-500/30'
                        : 'bg-quest-surface/20 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${status?.online ? 'bg-green-500' : 'bg-gray-500'}`}>
                          {status?.online && (
                            <motion.div
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="w-full h-full rounded-full bg-green-500"
                            />
                          )}
                        </div>
                        <span className={`font-medium ${member.color}`}>{member.name}</span>
                      </div>
                      <button
                        onClick={() => togglePresence(member.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          status?.online
                            ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        }`}
                      >
                        {status?.online ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                    <div className="text-xs text-quest-text/50">
                      {status?.online ? (
                        <span className="flex items-center gap-1">
                          <Wifi size={12} className="text-green-400" />
                          Online -- WebSocket active, heartbeat every 30s
                        </span>
                      ) : (
                        <span>Last seen: {status?.lastSeen || 'Never'}</span>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Presence architecture info */}
            <div className="p-4 rounded-lg bg-quest-surface/30 border border-white/10 text-sm">
              <p className="font-medium mb-2">How Presence Works at Scale</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-quest-text/70">
                <div className="p-3 rounded-lg bg-quest-surface/30">
                  <p className="font-medium text-green-400 mb-1">Connect</p>
                  <p>Client opens WebSocket. Server adds user to Redis presence set. Subscribers are notified.</p>
                </div>
                <div className="p-3 rounded-lg bg-quest-surface/30">
                  <p className="font-medium text-yellow-400 mb-1">Heartbeat</p>
                  <p>Client sends ping every 30s. Server renews TTL in Redis. Missed heartbeat = stale connection.</p>
                </div>
                <div className="p-3 rounded-lg bg-quest-surface/30">
                  <p className="font-medium text-red-400 mb-1">Disconnect</p>
                  <p>WebSocket closes or heartbeat times out. Server records last-seen timestamp and notifies subscribers.</p>
                </div>
              </div>
            </div>

            <DeepDive id="dd-presence-scale" title="Presence at 2 Billion Users" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <p>
                  Tracking presence for 2B users requires careful optimization:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Lazy Presence:</strong> Only subscribe to presence updates for contacts in the visible chat list, not all contacts.</li>
                  <li><strong>Pub/Sub Channels:</strong> Each user has a presence channel. Only actively chatting contacts subscribe.</li>
                  <li><strong>Batched Updates:</strong> Presence changes are batched and sent every few seconds, not on every heartbeat.</li>
                  <li><strong>Regional Sharding:</strong> Presence data is sharded by user ID across regional Redis clusters.</li>
                </ul>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Group Messaging Tab ── */}
      {activeTab === 'groups' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Users size={20} className="text-indigo-400" />
              Group Messaging & Delivery Receipts
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Send a group message and watch {T('Fan-out')} in action. {T('Delivery Receipt')} track
              each member's status independently. Online members get instant delivery; offline members wait.
            </p>

            {/* Member status overview */}
            <div className="flex flex-wrap gap-2 mb-4">
              {groupMembers.map(m => (
                <span
                  key={m.id}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    presenceUsers[m.id]?.online
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {m.name} {presenceUsers[m.id]?.online ? '(online)' : '(offline)'}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={sendGroupMessage}
                className="px-5 py-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-sm font-medium hover:bg-indigo-500/30 transition-colors"
              >
                Send Group Message as Alice
              </button>
              <button
                onClick={() => { setGroupMessage(null); setDeliveryStatus({}) }}
                className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Group message display */}
            <AnimatePresence>
              {groupMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Sent message */}
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-400 font-medium text-sm">Alice</span>
                      <span className="text-xs text-quest-text/30">to Group</span>
                    </div>
                    <p className="text-sm text-quest-text/80">"{groupMessage.text}"</p>
                  </div>

                  {/* Fan-out status per member */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-quest-text/50 uppercase tracking-wider">Fan-out Delivery Status</p>
                    {groupMembers.filter(m => m.id !== 'alice').map(member => {
                      const status = deliveryStatus[member.id]
                      return (
                        <motion.div
                          key={member.id}
                          layout
                          className="flex items-center justify-between p-3 rounded-lg bg-quest-surface/20 border border-white/5"
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              presenceUsers[member.id]?.online ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <span className={`text-sm font-medium ${member.color}`}>{member.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {status === 'sent' && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-gray-400 flex items-center gap-1"
                              >
                                <span className="text-gray-400">&#10003;</span> Sent
                              </motion.span>
                            )}
                            {status === 'delivered' && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-gray-300 flex items-center gap-1"
                              >
                                <span className="text-gray-300">&#10003;&#10003;</span> Delivered
                              </motion.span>
                            )}
                            {status === 'read' && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xs text-blue-400 flex items-center gap-1"
                              >
                                <span className="text-blue-400">&#10003;&#10003;</span> Read
                              </motion.span>
                            )}
                            {!status && (
                              <span className="text-xs text-quest-text/20">Pending...</span>
                            )}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Explanation */}
                  <div className="p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-xs text-quest-text/60">
                    <p>
                      <strong className="text-indigo-400">Fan-out-on-write:</strong> Alice's client encrypts the message
                      separately for each member's key. The server writes a copy to each member's queue.
                      Online members receive it instantly via WebSocket; offline members get a {T('Push Notification')} and
                      receive the message when they reconnect. Delivery receipts flow back the same path.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <DeepDive id="dd-group-challenges" title="Group Messaging Challenges at Scale" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Sender Key Optimization:</strong> Instead of encrypting N times for N members, WhatsApp uses a "sender key" -- the sender creates one encrypted session for the group, and each member gets the sender key via pairwise E2E channel. Subsequent messages need only one encryption.</li>
                  <li><strong>Membership Changes:</strong> When a member leaves, the sender key must be rotated so they can no longer decrypt future messages.</li>
                  <li><strong>Delivery Receipt Aggregation:</strong> For a 1024-member group, showing individual read receipts would be overwhelming. WhatsApp aggregates them (e.g., "Read by 47").</li>
                  <li><strong>Media Deduplication:</strong> A photo sent to a group is uploaded once to the CDN, not copied per member. Only the encrypted link is fanned out.</li>
                </ul>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Architecture Tab ── */}
      {activeTab === 'architecture' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Phone size={20} className="text-blue-400" />
              WhatsApp Architecture Overview
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              The high-level architecture of WhatsApp's messaging system. Click each component to see details.
            </p>

            {/* Architecture diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {architectureComponents.map((comp, idx) => (
                <motion.div
                  key={comp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-4 rounded-xl border ${comp.color} ${comp.border} cursor-default`}
                >
                  <p className="font-medium text-sm mb-1">{comp.label}</p>
                  <p className="text-xs text-quest-text/60">{comp.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Flow diagram */}
            <div className="p-4 rounded-xl bg-quest-surface/20 border border-white/10">
              <p className="text-xs font-medium text-quest-text/50 uppercase tracking-wider mb-3">Data Flow</p>
              <pre className="text-xs font-mono text-quest-text/70 overflow-x-auto whitespace-pre leading-relaxed">
{`Client (Alice)
  |
  | WebSocket (TLS)
  v
API Gateway  ──>  Chat Server
                    |
        ┌───────────┼───────────┐
        v           v           v
  Presence       Message      Group
  Service        Queue        Service
  (Redis)       (Kafka)        |
                    |           |
                    v           v
              Message Store   Fan-out
              (Cassandra)    to member
                    |         queues
                    v
              Push Notification
              Service (APNs/FCM)
                    |
                    v
              Client (Bob)

Media Path:
  Client ──encrypt──> Media Service ──> CDN
                         |
                    Store encrypted
                    blob, return URL
                         |
                    Send URL + key
                    via Chat Server`}
              </pre>
            </div>

            <DeepDive id="dd-storage" title="Storage Design: Cassandra for Messages" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <p>WhatsApp uses a wide-column store (historically HBase, conceptually similar to Cassandra) for message storage:</p>
                <pre className="text-xs font-mono bg-black/30 p-3 rounded-lg whitespace-pre-wrap text-quest-text/60">
{`Partition Key: recipient_user_id
Clustering Key: timestamp (DESC)

Row: {
  user_id: "bob_123",
  messages: [
    { ts: 1709234567, from: "alice_456", encrypted_blob: "0xA3F2...", media_url: null },
    { ts: 1709234510, from: "charlie_789", encrypted_blob: "0xB1C4...", media_url: "cdn://img/..." },
  ]
}`}
                </pre>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Partitioned by recipient for fast message retrieval on connect.</li>
                  <li>Time-ordered clustering for chronological delivery.</li>
                  <li>TTL-based expiration: messages auto-delete after delivery confirmation.</li>
                  <li>Write-optimized: append-only workload matches LSM-tree architecture perfectly.</li>
                </ul>
              </div>
            </DeepDive>

            <DeepDive id="dd-media" title="Media Handling Architecture" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-text/80">
                <p>Media is handled on a separate path to keep the messaging pipeline lightweight:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Sender encrypts the media file locally with a random AES key.</li>
                  <li>Encrypted blob is uploaded to the Media Service via HTTP (not WebSocket).</li>
                  <li>Media Service stores the blob on a CDN and returns a URL.</li>
                  <li>Sender sends a lightweight message containing: CDN URL + AES key + thumbnail.</li>
                  <li>Recipient downloads encrypted blob from CDN and decrypts locally.</li>
                </ol>
                <p>
                  This separation means media uploads (potentially MBs) do not block the real-time messaging
                  WebSocket. The CDN also handles caching and geographic distribution.
                </p>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Quiz Tab ── */}
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
                      ? 'Great work! Level complete. You can design WhatsApp at a high level.'
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

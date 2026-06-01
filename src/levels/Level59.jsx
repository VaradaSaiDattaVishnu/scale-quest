import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Bell, Mail, Smartphone, Send, Settings, Filter } from 'lucide-react'

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
  'Message Prioritization': 'Assigning priority levels (critical, high, medium, low) to notifications so urgent ones are processed first and non-critical ones can be batched or delayed.',
  'Channel Selection': 'The logic that determines which delivery channel (push, email, SMS) to use based on notification type, user preferences, and urgency.',
  'User Preferences': 'Per-user configuration that controls which notifications they receive, on which channels, and during what time windows.',
  'Delivery Tracking': 'End-to-end observability of notification lifecycle: sent, delivered, opened, clicked, bounced, or failed.',
  'Priority Queue': 'A queue data structure where messages are dequeued based on priority rather than insertion order, ensuring critical notifications are processed first.',
  'Rate Limiting': 'Controlling the number of notifications sent to a user within a time window to prevent notification fatigue and spam.',
  'Fan-out': 'The process of distributing a single event to multiple recipients, potentially across multiple channels simultaneously.',
  'Dead Letter Queue': 'A queue that stores messages that could not be delivered after multiple retry attempts, for later inspection and manual processing.',
  'Quiet Hours': 'User-defined time windows during which non-critical notifications are held and batched for later delivery.',
  'Idempotency': 'Ensuring that sending the same notification multiple times (due to retries) results in only one delivery to the user.',
}

/* ── Pipeline Stages ── */
const pipelineStages = [
  { id: 'event', label: 'Event Ingestion', icon: 'send', color: 'blue', description: 'Application events arrive via API or message queue' },
  { id: 'priority', label: 'Priority Queue', icon: 'filter', color: 'purple', description: 'Events sorted by urgency: critical > high > medium > low' },
  { id: 'preferences', label: 'User Preferences', icon: 'settings', color: 'amber', description: 'Filter against user opt-ins, quiet hours, and frequency caps' },
  { id: 'channel', label: 'Channel Selection', icon: 'bell', color: 'cyan', description: 'Route to push, email, SMS, or multiple channels based on rules' },
  { id: 'delivery', label: 'Delivery', icon: 'smartphone', color: 'green', description: 'Send via channel-specific providers with retry logic' },
  { id: 'tracking', label: 'Tracking', icon: 'check', color: 'emerald', description: 'Record sent, delivered, opened, clicked events' },
]

/* ── Sample Notifications ── */
const sampleNotifications = [
  {
    id: 'n1',
    event: 'Order Shipped',
    priority: 'high',
    push: { title: 'Your order shipped!', body: 'Track your package now.' },
    email: { subject: 'Your Order #4821 Has Shipped', body: 'Dear Customer, your order has been shipped via Express Delivery. Estimated arrival: 2 days. Track your package here.' },
    sms: { body: 'Your order #4821 shipped! Track: https://trk.co/4821' },
  },
  {
    id: 'n2',
    event: 'Security Alert',
    priority: 'critical',
    push: { title: 'New login detected', body: 'Login from unknown device in Tokyo, JP.' },
    email: { subject: 'Security Alert: New Login to Your Account', body: 'We detected a new login to your account from Tokyo, Japan. If this was not you, please secure your account immediately.' },
    sms: { body: 'SECURITY: New login from Tokyo, JP. Not you? Visit https://sec.co/reset' },
  },
  {
    id: 'n3',
    event: 'Weekly Digest',
    priority: 'low',
    push: { title: 'Your weekly summary', body: 'You had 12 activities this week.' },
    email: { subject: 'Your Weekly Activity Summary', body: 'Here is your weekly recap: 12 activities completed, 3 goals reached, and 5 new connections made. View your full report.' },
    sms: { body: 'Weekly summary: 12 activities, 3 goals reached. Details at app.' },
  },
  {
    id: 'n4',
    event: 'Payment Failed',
    priority: 'high',
    push: { title: 'Payment failed', body: 'Your subscription payment could not be processed.' },
    email: { subject: 'Action Required: Payment Failed', body: 'We were unable to process your payment of $9.99. Please update your payment method to avoid service interruption.' },
    sms: { body: 'Payment of $9.99 failed. Update billing: https://pay.co/update' },
  },
]

/* ── Priority Processing Data ── */
const priorityLevels = [
  { level: 'critical', color: 'red', sla: '< 30 seconds', examples: 'Security alerts, 2FA codes, fraud detection', processRate: 98 },
  { level: 'high', color: 'orange', sla: '< 2 minutes', examples: 'Order updates, payment issues, account changes', processRate: 85 },
  { level: 'medium', color: 'yellow', sla: '< 15 minutes', examples: 'Social interactions, new messages, reminders', processRate: 60 },
  { level: 'low', color: 'green', sla: '< 1 hour (batchable)', examples: 'Weekly digests, marketing, recommendations', processRate: 30 },
]

/* ── Default User Preferences ── */
const defaultPreferences = {
  channels: { push: true, email: true, sms: false },
  quietHours: { enabled: false, start: '22:00', end: '08:00' },
  types: {
    security: { enabled: true, channels: ['push', 'email', 'sms'] },
    orders: { enabled: true, channels: ['push', 'email'] },
    social: { enabled: true, channels: ['push'] },
    marketing: { enabled: false, channels: [] },
    billing: { enabled: true, channels: ['push', 'email'] },
  },
}

/* ── Delivery Funnel Data ── */
const deliveryFunnel = {
  push: { sent: 10000, delivered: 9200, opened: 4600, clicked: 1840 },
  email: { sent: 10000, delivered: 9500, opened: 2850, clicked: 570 },
  sms: { sent: 10000, delivered: 9800, opened: 9600, clicked: 1920 },
}

/* ── Quiz Questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the primary benefit of using a priority queue in a notification system?',
    options: [
      'Reduces storage costs',
      'Ensures critical notifications are processed before low-priority ones',
      'Makes the system easier to deploy',
      'Eliminates the need for retry logic',
    ],
    correct: 1,
    explanation: 'Priority queues ensure that urgent notifications (security alerts, 2FA codes) are processed immediately, while lower-priority items wait in line.',
  },
  {
    id: 'q2',
    question: 'A user has quiet hours set from 10 PM to 8 AM. A "Weekly Digest" notification arrives at 11 PM. What should the system do?',
    options: [
      'Send it immediately since the user subscribed',
      'Drop the notification permanently',
      'Hold it and deliver after quiet hours end',
      'Convert it from push to email only',
    ],
    correct: 2,
    explanation: 'Non-critical notifications should be held during quiet hours and batched for delivery after the window ends, respecting user preferences.',
  },
  {
    id: 'q3',
    question: 'Which channel typically has the highest open rate but the lowest content capacity?',
    options: [
      'Email',
      'Push notification',
      'SMS',
      'In-app notification',
    ],
    correct: 2,
    explanation: 'SMS has very high open rates (~98%) but is limited to 160 characters, making it ideal for urgent, concise messages.',
  },
  {
    id: 'q4',
    question: 'What is the purpose of a Dead Letter Queue in a notification system?',
    options: [
      'To store notifications that users have read',
      'To hold notifications that failed delivery after max retries',
      'To prioritize critical notifications',
      'To cache frequently sent templates',
    ],
    correct: 1,
    explanation: 'Dead Letter Queues capture messages that failed delivery after exhausting retry attempts, allowing engineers to investigate and manually reprocess them.',
  },
  {
    id: 'q5',
    question: 'Why is idempotency important when sending notifications?',
    options: [
      'It makes notifications load faster',
      'It prevents duplicate notifications when retries occur',
      'It reduces the cost of sending SMS',
      'It allows notifications to be sent in any order',
    ],
    correct: 1,
    explanation: 'Network failures can cause retries. Idempotency keys ensure a notification is delivered only once even if the send request is duplicated.',
  },
  {
    id: 'q6',
    question: 'A system needs to send a security alert to 1 million users. Which approach scales best?',
    options: [
      'Loop through users and send synchronously',
      'Use fan-out with partitioned queues and parallel workers',
      'Send a single broadcast to all users at once',
      'Store alerts in a database and let users poll',
    ],
    correct: 1,
    explanation: 'Fan-out with partitioned queues distributes load across workers, allowing parallel processing while maintaining delivery guarantees and back-pressure handling.',
  },
  {
    id: 'q7',
    question: 'What is the main purpose of rate limiting notifications?',
    options: [
      'To save money on API calls',
      'To prevent notification fatigue and protect user experience',
      'To make the system run faster',
      'To comply with GDPR regulations',
    ],
    correct: 1,
    explanation: 'Rate limiting prevents users from being overwhelmed by too many notifications in a short time, which leads to app uninstalls and notification opt-outs.',
  },
]

/* ── Tabs ── */
const tabs = [
  { id: 'pipeline', label: 'Pipeline', icon: Send },
  { id: 'channels', label: 'Channels', icon: Bell },
  { id: 'priority', label: 'Priority', icon: Filter },
  { id: 'preferences', label: 'Preferences', icon: Settings },
  { id: 'tracking', label: 'Tracking', icon: CheckCircle },
  { id: 'quiz', label: 'Quiz', icon: HelpCircle },
]

/* ══════════════════════════════════════════════════════
   Level 59 Component
   ══════════════════════════════════════════════════════ */

export default function Level59({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [activeTab, setActiveTab] = useState('pipeline')
  const [pipelineStep, setPipelineStep] = useState(-1)
  const [pipelineRunning, setPipelineRunning] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(sampleNotifications[0])
  const [selectedChannel, setSelectedChannel] = useState('push')
  const [priorityQueue, setPriorityQueue] = useState([])
  const [processedItems, setProcessedItems] = useState([])
  const [preferences, setPreferences] = useState(defaultPreferences)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const T = (word) => (
    <Term word={word} definition={terms[word] || ''} onLearn={learnTerm} />
  )

  /* ── Pipeline Simulation ── */
  const runPipeline = () => {
    if (pipelineRunning) return
    setPipelineRunning(true)
    setPipelineStep(0)
    let step = 0
    const interval = setInterval(() => {
      step += 1
      if (step >= pipelineStages.length) {
        clearInterval(interval)
        setPipelineRunning(false)
      }
      setPipelineStep(step)
    }, 1200)
  }

  const resetPipeline = () => {
    setPipelineStep(-1)
    setPipelineRunning(false)
  }

  /* ── Priority Queue Simulation ── */
  const addToPriorityQueue = (priority) => {
    const names = {
      critical: ['2FA Code', 'Fraud Alert', 'Account Locked'],
      high: ['Order Shipped', 'Payment Failed', 'Password Changed'],
      medium: ['New Message', 'Friend Request', 'Comment Reply'],
      low: ['Weekly Digest', 'Promo Offer', 'Feature Update'],
    }
    const items = names[priority]
    const name = items[Math.floor(Math.random() * items.length)]
    const newItem = {
      id: Date.now() + Math.random(),
      name,
      priority,
      timestamp: new Date().toLocaleTimeString(),
    }
    setPriorityQueue(prev => {
      const order = { critical: 0, high: 1, medium: 2, low: 3 }
      const next = [...prev, newItem]
      next.sort((a, b) => order[a.priority] - order[b.priority])
      return next
    })
  }

  const processNextItem = () => {
    if (priorityQueue.length === 0) return
    const item = priorityQueue[0]
    setPriorityQueue(prev => prev.slice(1))
    setProcessedItems(prev => [item, ...prev].slice(0, 8))
  }

  /* ── Preference Toggles ── */
  const toggleChannel = (channel) => {
    setPreferences(prev => ({
      ...prev,
      channels: { ...prev.channels, [channel]: !prev.channels[channel] },
    }))
  }

  const toggleQuietHours = () => {
    setPreferences(prev => ({
      ...prev,
      quietHours: { ...prev.quietHours, enabled: !prev.quietHours.enabled },
    }))
  }

  const toggleNotificationType = (type) => {
    setPreferences(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [type]: { ...prev.types[type], enabled: !prev.types[type].enabled },
      },
    }))
  }

  /* ── Quiz Logic ── */
  const handleAnswer = (questionId, optionIdx) => {
    if (showResults) return
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }))
  }

  const allAnswered = Object.keys(quizAnswers).length === quizQuestions.length

  const handleSubmitQuiz = () => {
    if (!allAnswered) return
    let s = 0
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) s++
    })
    setScore(s)
    setShowResults(true)
    if (s >= 5 && onComplete) onComplete()
  }

  /* ── Icon helper ── */
  const stageIcon = (iconName, size = 20) => {
    switch (iconName) {
      case 'send': return <Send size={size} />
      case 'filter': return <Filter size={size} />
      case 'settings': return <Settings size={size} />
      case 'bell': return <Bell size={size} />
      case 'smartphone': return <Smartphone size={size} />
      case 'check': return <CheckCircle size={size} />
      default: return <Bell size={size} />
    }
  }

  const priorityColor = (p) => {
    switch (p) {
      case 'critical': return 'red'
      case 'high': return 'orange'
      case 'medium': return 'yellow'
      case 'low': return 'green'
      default: return 'gray'
    }
  }

  const channelIcon = (ch) => {
    switch (ch) {
      case 'push': return <Bell size={16} />
      case 'email': return <Mail size={16} />
      case 'sms': return <Smartphone size={16} />
      default: return <Bell size={16} />
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="quest-card p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-quest-primary/20 text-quest-primary">
                LEVEL 59
              </span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                HLD Case Study
              </span>
              {isCompleted && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
                  <CheckCircle size={12} /> Completed
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold">Design a Notification System</h1>
            <p className="text-quest-text/60 mt-1">Push, Email, SMS at Scale</p>
          </div>
          <Bell size={32} className="text-quest-primary/50" />
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10">
          <p className="text-quest-text/90 italic text-sm leading-relaxed">
            "Send the right notification, to the right user, on the right channel, at the right time."
          </p>
        </div>

        <div className="mt-4 text-sm text-quest-text/70 leading-relaxed">
          <p>
            A notification system at scale handles billions of messages daily across multiple channels.
            The core challenges are {T('Message Prioritization')}, {T('Channel Selection')},
            respecting {T('User Preferences')}, and maintaining {T('Delivery Tracking')} for every
            single message. You also need {T('Rate Limiting')} to prevent notification fatigue,
            {T('Idempotency')} for safe retries, and {T('Dead Letter Queue')}s for failed deliveries.
          </p>
        </div>

        <DeepDive id="dd-architecture" title="High-Level Architecture Overview" onRead={markDeepDiveRead}>
          <div className="text-sm text-quest-text/80 space-y-3">
            <p>
              A notification system consists of several key services working together:
            </p>
            <ul className="list-disc list-inside space-y-1 text-quest-text/70">
              <li><strong>Notification Service:</strong> API gateway that validates, deduplicates, and enqueues events</li>
              <li><strong>Priority Queue:</strong> Orders messages by urgency, with separate lanes for critical vs. batch</li>
              <li><strong>Preference Service:</strong> Checks user opt-in/out status, quiet hours, and channel preferences</li>
              <li><strong>Channel Router:</strong> Routes to the appropriate provider (APNs, FCM, SendGrid, Twilio, etc.)</li>
              <li><strong>Delivery Workers:</strong> Parallelized consumers that call provider APIs with retry and circuit-breaking</li>
              <li><strong>Tracking Service:</strong> Records delivery events and computes analytics (open rates, click-through)</li>
            </ul>
            <p className="text-quest-text/60 mt-2">
              At scale (billions of notifications/day), each service is independently scalable.
              Critical notifications bypass batching and rate limits entirely.
            </p>
          </div>
        </DeepDive>

        <DeepDive id="dd-fanout" title="Fan-out and Scalability Patterns" onRead={markDeepDiveRead}>
          <div className="text-sm text-quest-text/80 space-y-3">
            <p>
              When a single event (e.g., "server outage") needs to reach millions of users,
              the system uses {T('Fan-out')} strategies:
            </p>
            <ul className="list-disc list-inside space-y-1 text-quest-text/70">
              <li><strong>Partitioned Queues:</strong> Users are sharded by ID, each partition processed by dedicated workers</li>
              <li><strong>Batch Writes:</strong> Low-priority notifications are batched into fewer, larger requests</li>
              <li><strong>Back-pressure:</strong> When providers rate-limit, the system slows ingestion rather than dropping messages</li>
              <li><strong>Multi-region:</strong> Deploy notification workers close to users to reduce latency</li>
            </ul>
          </div>
        </DeepDive>
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
                  ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/20'
                  : 'bg-quest-surface/50 text-quest-text/60 hover:text-quest-text hover:bg-quest-surface'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Pipeline Tab ── */}
      {activeTab === 'pipeline' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Send size={20} className="text-quest-primary" />
              Notification Pipeline
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Watch a notification flow through the entire processing pipeline, from event ingestion
              to delivery tracking.
            </p>

            {/* Pipeline visualization */}
            <div className="space-y-3">
              {pipelineStages.map((stage, idx) => {
                const isActive = pipelineStep === idx
                const isDone = pipelineStep > idx
                const isPending = pipelineStep < idx

                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${
                      isActive
                        ? `bg-${stage.color}-500/15 border-${stage.color}-500/40 shadow-lg shadow-${stage.color}-500/10`
                        : isDone
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-quest-surface/20 border-white/10'
                    }`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-quest-primary/30 text-quest-primary scale-110'
                          : isDone
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-quest-surface/30 text-quest-text/30'
                      }`}>
                        {isDone ? <CheckCircle size={20} /> : stageIcon(stage.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold text-sm ${
                            isActive ? 'text-quest-primary' : isDone ? 'text-green-400' : 'text-quest-text/50'
                          }`}>
                            {stage.label}
                          </span>
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-xs px-2 py-0.5 rounded-full bg-quest-primary/20 text-quest-primary"
                            >
                              Processing...
                            </motion.span>
                          )}
                          {isDone && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400"
                            >
                              Done
                            </motion.span>
                          )}
                        </div>
                        <p className={`text-xs mt-0.5 ${
                          isPending ? 'text-quest-text/30' : 'text-quest-text/60'
                        }`}>
                          {stage.description}
                        </p>
                      </div>
                      <span className={`text-xs font-mono ${
                        isPending ? 'text-quest-text/20' : 'text-quest-text/40'
                      }`}>
                        {idx + 1}/{pipelineStages.length}
                      </span>
                    </div>
                    {idx < pipelineStages.length - 1 && (
                      <div className="flex justify-start ml-9">
                        <div className={`w-0.5 h-3 transition-colors duration-500 ${
                          isDone ? 'bg-green-500/40' : 'bg-white/10'
                        }`} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={runPipeline}
                disabled={pipelineRunning}
                className="px-5 py-2.5 rounded-lg bg-quest-primary text-white font-medium hover:bg-quest-primary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={16} />
                {pipelineStep === -1 ? 'Run Pipeline' : pipelineRunning ? 'Running...' : 'Run Again'}
              </button>
              <button
                onClick={resetPipeline}
                className="px-5 py-2.5 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 font-medium hover:bg-quest-surface transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Completion message */}
            <AnimatePresence>
              {pipelineStep >= pipelineStages.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                >
                  <p className="text-sm text-green-400 font-medium flex items-center gap-2">
                    <CheckCircle size={16} />
                    Notification delivered and tracked successfully!
                  </p>
                  <p className="text-xs text-quest-text/60 mt-1">
                    The entire pipeline processed in ~7.2 seconds. At scale, critical notifications
                    complete this flow in under 30 seconds.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Channels Tab ── */}
      {activeTab === 'channels' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Bell size={20} className="text-quest-primary" />
              Multi-Channel Delivery
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              See how the same notification is formatted differently for each delivery channel.
              Select a notification event and compare push, email, and SMS renderings.
            </p>

            {/* Notification selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {sampleNotifications.map(n => (
                <button
                  key={n.id}
                  onClick={() => setSelectedNotification(n)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                    selectedNotification.id === n.id
                      ? 'bg-quest-primary/20 border-quest-primary/40 text-quest-primary border'
                      : 'bg-quest-surface/30 border-white/10 text-quest-text/70 border hover:border-white/20'
                  }`}
                >
                  <div className="text-xs mb-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1 bg-${priorityColor(n.priority)}-400`} />
                    {n.priority}
                  </div>
                  {n.event}
                </button>
              ))}
            </div>

            {/* Channel toggle */}
            <div className="flex gap-2 mb-6">
              {['push', 'email', 'sms'].map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChannel(ch)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedChannel === ch
                      ? 'bg-quest-primary text-white'
                      : 'bg-quest-surface/30 text-quest-text/60 hover:bg-quest-surface/50'
                  }`}
                >
                  {channelIcon(ch)}
                  {ch.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Channel preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedNotification.id}-${selectedChannel}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {selectedChannel === 'push' && (
                  <div className="max-w-sm mx-auto">
                    <div className="bg-quest-surface/60 rounded-2xl p-4 border border-white/10 shadow-xl">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-quest-primary/20 flex items-center justify-center flex-shrink-0">
                          <Bell size={18} className="text-quest-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-quest-text/50 font-medium">MyApp</span>
                            <span className="text-xs text-quest-text/30">now</span>
                          </div>
                          <p className="font-semibold text-sm mt-0.5">{selectedNotification.push.title}</p>
                          <p className="text-xs text-quest-text/60 mt-0.5">{selectedNotification.push.body}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-quest-text/40 text-center mt-3">
                      Push: ~50 chars title, ~100 chars body. Instant delivery. ~60% open rate.
                    </p>
                  </div>
                )}

                {selectedChannel === 'email' && (
                  <div className="max-w-lg mx-auto">
                    <div className="bg-quest-surface/60 rounded-xl border border-white/10 overflow-hidden">
                      <div className="px-4 py-3 border-b border-white/10 bg-quest-surface/30">
                        <p className="text-xs text-quest-text/40 mb-1">From: notifications@myapp.com</p>
                        <p className="text-xs text-quest-text/40 mb-1">To: user@example.com</p>
                        <p className="text-sm font-semibold">{selectedNotification.email.subject}</p>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-quest-text/80 leading-relaxed">
                          {selectedNotification.email.body}
                        </p>
                        <button className="mt-4 px-4 py-2 rounded-lg bg-quest-primary/20 text-quest-primary text-xs font-medium">
                          View in App
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-quest-text/40 text-center mt-3">
                      Email: Rich content, images, links. ~30% open rate. Best for detailed information.
                    </p>
                  </div>
                )}

                {selectedChannel === 'sms' && (
                  <div className="max-w-xs mx-auto">
                    <div className="bg-quest-surface/60 rounded-2xl p-4 border border-white/10">
                      <div className="text-center mb-2">
                        <span className="text-xs text-quest-text/40">+1 (555) 000-0000</span>
                      </div>
                      <div className="bg-blue-500/20 rounded-xl rounded-bl-sm p-3 ml-8">
                        <p className="text-sm">{selectedNotification.sms.body}</p>
                      </div>
                      <p className="text-xs text-quest-text/30 text-right mt-1">Delivered</p>
                    </div>
                    <p className="text-xs text-quest-text/40 text-center mt-3">
                      SMS: 160 char limit. ~98% open rate. Highest urgency. Highest cost per message.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Channel comparison table */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-3 text-quest-text/60">Channel Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Channel</th>
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Open Rate</th>
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Latency</th>
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Cost</th>
                      <th className="text-left py-2 text-quest-text/50 font-medium">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 flex items-center gap-2"><Bell size={14} className="text-blue-400" /> Push</td>
                      <td className="py-2 pr-4 text-quest-text/60">~60%</td>
                      <td className="py-2 pr-4 text-quest-text/60">1-5s</td>
                      <td className="py-2 pr-4 text-green-400">Free</td>
                      <td className="py-2 text-quest-text/60">Real-time alerts, engagement</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 flex items-center gap-2"><Mail size={14} className="text-purple-400" /> Email</td>
                      <td className="py-2 pr-4 text-quest-text/60">~30%</td>
                      <td className="py-2 pr-4 text-quest-text/60">10-60s</td>
                      <td className="py-2 pr-4 text-yellow-400">Low</td>
                      <td className="py-2 text-quest-text/60">Detailed info, marketing</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 flex items-center gap-2"><Smartphone size={14} className="text-green-400" /> SMS</td>
                      <td className="py-2 pr-4 text-quest-text/60">~98%</td>
                      <td className="py-2 pr-4 text-quest-text/60">3-10s</td>
                      <td className="py-2 pr-4 text-red-400">High</td>
                      <td className="py-2 text-quest-text/60">Critical alerts, 2FA</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Priority Tab ── */}
      {activeTab === 'priority' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Filter size={20} className="text-quest-primary" />
              Priority Queue System
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Add notifications with different priorities and watch them get sorted automatically.
              Process items from the front of the queue to see how critical items jump ahead.
            </p>

            {/* SLA reference */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {priorityLevels.map(p => (
                <div
                  key={p.level}
                  className={`p-3 rounded-lg border bg-${p.color}-500/5 border-${p.color}-500/20`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`w-2.5 h-2.5 rounded-full bg-${p.color}-400`} />
                    <span className={`text-xs font-bold uppercase text-${p.color}-400`}>{p.level}</span>
                  </div>
                  <p className="text-xs text-quest-text/60">SLA: {p.sla}</p>
                  <p className="text-xs text-quest-text/40 mt-1">{p.examples}</p>
                </div>
              ))}
            </div>

            {/* Add buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-sm text-quest-text/50 self-center mr-2">Add:</span>
              {['critical', 'high', 'medium', 'low'].map(p => (
                <button
                  key={p}
                  onClick={() => addToPriorityQueue(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-${priorityColor(p)}-500/20 text-${priorityColor(p)}-400 border border-${priorityColor(p)}-500/30 hover:bg-${priorityColor(p)}-500/30`}
                >
                  + {p}
                </button>
              ))}
              <button
                onClick={processNextItem}
                disabled={priorityQueue.length === 0}
                className="ml-auto px-4 py-1.5 rounded-lg text-xs font-medium bg-quest-primary/20 text-quest-primary border border-quest-primary/30 hover:bg-quest-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Process Next
              </button>
            </div>

            {/* Queue display */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Pending queue */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-quest-text/60">
                  Priority Queue ({priorityQueue.length} items)
                </h3>
                <div className="space-y-1.5 min-h-[200px] p-3 rounded-lg bg-quest-surface/20 border border-white/5">
                  <AnimatePresence>
                    {priorityQueue.length === 0 && (
                      <p className="text-xs text-quest-text/30 text-center py-8">
                        Queue empty. Add notifications above.
                      </p>
                    )}
                    {priorityQueue.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        layout
                        className={`flex items-center gap-2 p-2 rounded-lg border bg-${priorityColor(item.priority)}-500/5 border-${priorityColor(item.priority)}-500/20`}
                      >
                        <span className={`w-2 h-2 rounded-full bg-${priorityColor(item.priority)}-400`} />
                        <span className="text-xs font-medium flex-1">{item.name}</span>
                        <span className="text-xs text-quest-text/30">{item.timestamp}</span>
                        {idx === 0 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-quest-primary/20 text-quest-primary">
                            next
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Processed items */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-quest-text/60">
                  Processed ({processedItems.length} items)
                </h3>
                <div className="space-y-1.5 min-h-[200px] p-3 rounded-lg bg-quest-surface/20 border border-white/5">
                  <AnimatePresence>
                    {processedItems.length === 0 && (
                      <p className="text-xs text-quest-text/30 text-center py-8">
                        No items processed yet.
                      </p>
                    )}
                    {processedItems.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        layout
                        className="flex items-center gap-2 p-2 rounded-lg bg-green-500/5 border border-green-500/20"
                      >
                        <CheckCircle size={14} className="text-green-400" />
                        <span className="text-xs font-medium flex-1">{item.name}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded bg-${priorityColor(item.priority)}-500/20 text-${priorityColor(item.priority)}-400`}>
                          {item.priority}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <DeepDive id="dd-priority-impl" title="Implementing Priority Queues at Scale" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-text/80 space-y-2">
                <p>In production, priority queues are often implemented as separate physical queues per priority level:</p>
                <ul className="list-disc list-inside space-y-1 text-quest-text/70">
                  <li>Critical queue: consumed first, dedicated workers, no rate limiting</li>
                  <li>High queue: consumed with slight delay, shared workers with critical</li>
                  <li>Medium queue: consumed with rate limiting per user</li>
                  <li>Low queue: batch-processed on schedule (e.g., every 15 minutes)</li>
                </ul>
                <p className="text-quest-text/60">
                  Technologies: Kafka with topic partitions, SQS with multiple queues, or Redis sorted sets
                  with priority scores.
                </p>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Preferences Tab ── */}
      {activeTab === 'preferences' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Settings size={20} className="text-quest-primary" />
              User Preference Engine
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Configure notification preferences just like a real user would. Toggle channels,
              set quiet hours, and control which notification types you receive.
            </p>

            {/* Global channel toggles */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-3 text-quest-text/60">Global Channels</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(preferences.channels).map(([ch, enabled]) => (
                  <button
                    key={ch}
                    onClick={() => toggleChannel(ch)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      enabled
                        ? 'bg-quest-primary/15 border-quest-primary/40 text-quest-primary'
                        : 'bg-quest-surface/20 border-white/10 text-quest-text/40'
                    }`}
                  >
                    {channelIcon(ch)}
                    <span className="text-sm font-medium">{ch.toUpperCase()}</span>
                    <span className={`w-8 h-5 rounded-full relative transition-colors ${
                      enabled ? 'bg-quest-primary' : 'bg-quest-surface/50'
                    }`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                        enabled ? 'left-3.5' : 'left-0.5'
                      }`} />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiet hours */}
            <div className="mb-6 p-4 rounded-xl border border-white/10 bg-quest-surface/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Quiet Hours</h3>
                  <p className="text-xs text-quest-text/50 mt-0.5">
                    Hold non-critical notifications during sleep hours
                  </p>
                </div>
                <button
                  onClick={toggleQuietHours}
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    preferences.quietHours.enabled ? 'bg-quest-primary' : 'bg-quest-surface/50'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                    preferences.quietHours.enabled ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>
              <AnimatePresence>
                {preferences.quietHours.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-white/10"
                  >
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-quest-text/50">From:</span>
                        <span className="px-3 py-1 rounded-lg bg-quest-surface/40 font-mono text-quest-primary">
                          {preferences.quietHours.start}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-quest-text/50">To:</span>
                        <span className="px-3 py-1 rounded-lg bg-quest-surface/40 font-mono text-quest-primary">
                          {preferences.quietHours.end}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-quest-text/40 mt-2">
                      Critical notifications (security alerts, 2FA) will still be delivered immediately.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notification types */}
            <div>
              <h3 className="text-sm font-semibold mb-3 text-quest-text/60">Notification Types</h3>
              <div className="space-y-2">
                {Object.entries(preferences.types).map(([type, config]) => (
                  <div
                    key={type}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                      config.enabled
                        ? 'bg-quest-surface/30 border-white/10'
                        : 'bg-quest-surface/10 border-white/5 opacity-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleNotificationType(type)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          config.enabled
                            ? 'bg-quest-primary border-quest-primary'
                            : 'border-white/20'
                        }`}
                      >
                        {config.enabled && <CheckCircle size={12} className="text-white" />}
                      </button>
                      <span className="text-sm font-medium capitalize">{type}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {config.enabled && config.channels.map(ch => (
                        <span
                          key={ch}
                          className="text-xs px-2 py-0.5 rounded-full bg-quest-primary/10 text-quest-primary/70"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live preview */}
            <div className="mt-6 p-4 rounded-xl bg-quest-surface/20 border border-white/10">
              <h3 className="text-sm font-semibold mb-2 text-quest-text/60">Preference Summary</h3>
              <div className="text-xs text-quest-text/60 space-y-1">
                <p>
                  Active channels: {Object.entries(preferences.channels)
                    .filter(([, v]) => v).map(([k]) => k.toUpperCase()).join(', ') || 'None'}
                </p>
                <p>
                  Quiet hours: {preferences.quietHours.enabled
                    ? `${preferences.quietHours.start} - ${preferences.quietHours.end}`
                    : 'Disabled'}
                </p>
                <p>
                  Enabled types: {Object.entries(preferences.types)
                    .filter(([, v]) => v.enabled).map(([k]) => k).join(', ') || 'None'}
                </p>
                <p>
                  Blocked types: {Object.entries(preferences.types)
                    .filter(([, v]) => !v.enabled).map(([k]) => k).join(', ') || 'None'}
                </p>
              </div>
            </div>

            <DeepDive id="dd-preferences" title="Scaling User Preferences" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-text/80 space-y-2">
                <p>At scale, the preference service must handle millions of lookups per second:</p>
                <ul className="list-disc list-inside space-y-1 text-quest-text/70">
                  <li>Store preferences in a fast key-value store (Redis, DynamoDB) keyed by user ID</li>
                  <li>Cache aggressively since preferences change infrequently</li>
                  <li>Use a default preference template that users override selectively</li>
                  <li>Implement preference inheritance: global defaults, category defaults, per-notification overrides</li>
                  <li>Sync preferences across devices via eventual consistency</li>
                </ul>
              </div>
            </DeepDive>
          </div>
        </motion.div>
      )}

      {/* ── Tracking Tab ── */}
      {activeTab === 'tracking' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle size={20} className="text-quest-primary" />
              Delivery Tracking Funnel
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Track the notification lifecycle from sent to clicked. Compare conversion rates
              across channels to understand which performs best for different metrics.
            </p>

            {/* Funnel per channel */}
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(deliveryFunnel).map(([channel, data]) => {
                const stages = [
                  { label: 'Sent', value: data.sent, color: 'blue' },
                  { label: 'Delivered', value: data.delivered, color: 'purple' },
                  { label: 'Opened', value: data.opened, color: 'amber' },
                  { label: 'Clicked', value: data.clicked, color: 'green' },
                ]
                return (
                  <div key={channel} className="p-4 rounded-xl border border-white/10 bg-quest-surface/20">
                    <div className="flex items-center gap-2 mb-4">
                      {channelIcon(channel)}
                      <span className="font-semibold text-sm">{channel.toUpperCase()}</span>
                    </div>
                    <div className="space-y-3">
                      {stages.map((stage, idx) => {
                        const pct = ((stage.value / data.sent) * 100).toFixed(1)
                        const widthPct = (stage.value / data.sent) * 100
                        return (
                          <div key={stage.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-quest-text/60">{stage.label}</span>
                              <span className="text-quest-text/80 font-medium">
                                {stage.value.toLocaleString()} ({pct}%)
                              </span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-quest-surface/30 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${widthPct}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                className={`h-full rounded-full bg-gradient-to-r from-${stage.color}-500 to-${stage.color}-400`}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Drop-off rates */}
                    <div className="mt-4 pt-3 border-t border-white/5 text-xs text-quest-text/50 space-y-1">
                      <p>Delivery rate: {((data.delivered / data.sent) * 100).toFixed(1)}%</p>
                      <p>Open rate: {((data.opened / data.delivered) * 100).toFixed(1)}%</p>
                      <p>Click-through: {((data.clicked / data.opened) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Key insights */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5 border border-white/10">
              <h3 className="text-sm font-semibold mb-2">Key Insights</h3>
              <ul className="text-xs text-quest-text/70 space-y-1.5">
                <li className="flex items-start gap-2">
                  <Smartphone size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>SMS has the highest delivery + open rate but the lowest click-through (short URLs, no rich content)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={12} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  <span>Email has strong delivery but low open rates; subject line optimization is critical</span>
                </li>
                <li className="flex items-start gap-2">
                  <Bell size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Push balances reach and engagement; most cost-effective for re-engagement</span>
                </li>
              </ul>
            </div>

            <DeepDive id="dd-tracking" title="Building a Tracking Pipeline" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-text/80 space-y-2">
                <p>Delivery tracking is implemented through multiple signals:</p>
                <ul className="list-disc list-inside space-y-1 text-quest-text/70">
                  <li><strong>Sent:</strong> Recorded when the provider API returns 200 OK</li>
                  <li><strong>Delivered:</strong> Webhook callback from provider (APNs receipt, email bounce status)</li>
                  <li><strong>Opened:</strong> Tracking pixel for email, app callback for push, carrier receipt for SMS</li>
                  <li><strong>Clicked:</strong> Redirect through URL shortener with tracking parameters</li>
                </ul>
                <p className="text-quest-text/60 mt-2">
                  Events are streamed to Kafka, processed by Flink/Spark, and stored in a time-series
                  database (ClickHouse, TimescaleDB) for real-time dashboards and analytics.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="dd-reliability" title="Delivery Guarantees and Retry Strategies" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-text/80 space-y-2">
                <p>Ensuring reliable delivery requires multiple strategies:</p>
                <ul className="list-disc list-inside space-y-1 text-quest-text/70">
                  <li><strong>At-least-once delivery:</strong> Retry with exponential backoff (1s, 2s, 4s, 8s, ...)</li>
                  <li><strong>Idempotency keys:</strong> Prevent duplicate sends when retrying after ambiguous failures</li>
                  <li><strong>Circuit breakers:</strong> Stop sending to a provider that is returning errors, fall back to alternatives</li>
                  <li><strong>Dead letter queues:</strong> Capture messages that fail after max retries for manual review</li>
                  <li><strong>Multi-provider failover:</strong> If SendGrid is down, route email through Mailgun automatically</li>
                </ul>
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
              Answer at least 5 out of 7 correctly to complete this level.
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
                    score >= 5
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <p className={`text-lg font-bold ${score >= 5 ? 'text-green-400' : 'text-red-400'}`}>
                    {score} / {quizQuestions.length}
                  </p>
                  <p className="text-sm text-quest-text/60 mt-1">
                    {score >= 5
                      ? 'Great work! Level complete. You understand notification system design.'
                      : 'You need at least 5 correct. Review the material and try again.'}
                  </p>
                  {score < 5 && (
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

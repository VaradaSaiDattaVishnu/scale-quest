import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  AlertTriangle, Activity, Eye, Search, BarChart3, Bell,
  Server, Database, Zap, Clock, Shield, Terminal, Layers,
  ArrowDown, ArrowUp, Play, Pause, RotateCcw, XCircle,
  TrendingUp, TrendingDown, Cpu, Wifi, AlertCircle, FileText
} from 'lucide-react'

/* ── Term tooltip component ── */
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

/* ── DeepDive expandable component ── */
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

/* ── Animated metric bar ── */
function MetricBar({ label, value, max, color, unit, icon: Icon, delay = 0 }) {
  const pct = Math.min((value / max) * 100, 100)
  const isWarning = pct > 70
  const isDanger = pct > 90

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-3"
    >
      <div className="flex items-center justify-between text-sm mb-1">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={14} className={isDanger ? 'text-red-400' : isWarning ? 'text-yellow-400' : color} />}
          <span className="text-quest-muted">{label}</span>
        </div>
        <span className={`font-mono font-bold text-xs ${isDanger ? 'text-red-400' : isWarning ? 'text-yellow-400' : 'text-quest-text'}`}>
          {value}{unit}
        </span>
      </div>
      <div className="w-full h-2.5 bg-quest-bg rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${isDanger ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : color.replace('text-', 'bg-')}`}
        />
      </div>
    </motion.div>
  )
}

/* ── Service node for distributed tracing ── */
function TraceServiceNode({ name, duration, status, depth = 0, isActive, delay = 0 }) {
  const statusColors = {
    ok: 'border-green-500/50 bg-green-500/10',
    slow: 'border-yellow-500/50 bg-yellow-500/10',
    error: 'border-red-500/50 bg-red-500/10',
    pending: 'border-blue-500/50 bg-blue-500/10',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      style={{ marginLeft: depth * 24 }}
      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 mb-2
        ${isActive ? statusColors[status] || statusColors.ok : 'border-white/10 bg-quest-surface/50'}`}
    >
      <div className={`w-2 h-2 rounded-full ${
        status === 'ok' ? 'bg-green-400' : status === 'slow' ? 'bg-yellow-400' : status === 'error' ? 'bg-red-400' : 'bg-blue-400'
      }`} />
      <span className="text-sm font-medium flex-1">{name}</span>
      <span className={`text-xs font-mono ${
        status === 'error' ? 'text-red-400' : status === 'slow' ? 'text-yellow-400' : 'text-quest-muted'
      }`}>
        {duration}ms
      </span>
      {status === 'error' && <XCircle size={14} className="text-red-400" />}
      {status === 'slow' && <AlertTriangle size={14} className="text-yellow-400" />}
      {status === 'ok' && <CheckCircle size={14} className="text-green-400" />}
    </motion.div>
  )
}

/* ── Simulated metric data generator ── */
function generateMetrics(scenario) {
  const base = {
    healthy: { latencyP50: 45, latencyP99: 120, errorRate: 0.2, throughput: 1250, cpu: 35, memory: 52 },
    degraded: { latencyP50: 180, latencyP99: 890, errorRate: 2.8, throughput: 980, cpu: 72, memory: 68 },
    incident: { latencyP50: 1200, latencyP99: 8500, errorRate: 18.5, throughput: 340, cpu: 95, memory: 91 },
  }
  return base[scenario] || base.healthy
}

/* ── Trace data for distributed tracing visualization ── */
const traceSpans = [
  { name: 'API Gateway', duration: 3, status: 'ok', depth: 0 },
  { name: 'Auth Service', duration: 12, status: 'ok', depth: 1 },
  { name: 'User Service', duration: 25, status: 'ok', depth: 1 },
  { name: 'PostgreSQL Query', duration: 180, status: 'slow', depth: 2 },
  { name: 'Redis Cache Lookup', duration: 2, status: 'ok', depth: 2 },
  { name: 'Order Service', duration: 45, status: 'ok', depth: 1 },
  { name: 'Payment Service', duration: 350, status: 'error', depth: 2 },
  { name: 'Notification Service', duration: 15, status: 'ok', depth: 2 },
]

/* ── Alert definitions ── */
const alertDefinitions = [
  { id: 'latency-p99', name: 'P99 Latency > 500ms', severity: 'warning', metric: 'latencyP99', threshold: 500, icon: Clock },
  { id: 'error-rate', name: 'Error Rate > 5%', severity: 'critical', metric: 'errorRate', threshold: 5, icon: AlertTriangle },
  { id: 'cpu-high', name: 'CPU Usage > 80%', severity: 'warning', metric: 'cpu', threshold: 80, icon: Cpu },
  { id: 'throughput-drop', name: 'Throughput < 500 rps', severity: 'critical', metric: 'throughput', thresholdBelow: 500, icon: TrendingDown },
]

/* ── Incident investigation clues ── */
const investigationClues = [
  {
    id: 'metrics',
    title: 'Check Metrics Dashboard',
    icon: BarChart3,
    content: 'P99 latency spiked from 120ms to 8500ms at 14:32 UTC. Error rate jumped to 18.5%. CPU is at 95%.',
    finding: 'Latency spike correlates with CPU saturation.',
  },
  {
    id: 'logs',
    title: 'Search Application Logs',
    icon: FileText,
    content: '[ERROR] 14:32:15 PaymentService: Connection pool exhausted. Max connections (50) reached. [ERROR] 14:32:16 PaymentService: Timeout waiting for DB connection after 30s.',
    finding: 'Payment service ran out of database connections.',
  },
  {
    id: 'traces',
    title: 'Examine Distributed Traces',
    icon: Layers,
    content: 'Trace shows: API Gateway (3ms) -> Auth (12ms) -> Order Service (45ms) -> Payment Service (TIMEOUT 30000ms). All slow requests funnel through Payment Service.',
    finding: 'Payment service is the bottleneck - all slow traces pass through it.',
  },
  {
    id: 'infra',
    title: 'Check Infrastructure',
    icon: Server,
    content: 'Payment DB primary node: CPU 98%, Disk I/O wait 45%, Active connections: 50/50. A scheduled batch job started at 14:30 running heavy aggregation queries.',
    finding: 'A batch job on the payment database is consuming all connections and CPU.',
  },
]

const rootCauseOptions = [
  { id: 'a', text: 'The API Gateway is misconfigured and dropping requests', correct: false },
  { id: 'b', text: 'A batch job on the payment database saturated connections and CPU, causing the payment service to timeout', correct: true },
  { id: 'c', text: 'The Redis cache expired and all requests hit the database simultaneously', correct: false },
  { id: 'd', text: 'A DDoS attack is overwhelming the auth service', correct: false },
]

/* ── ELK Stack layers ── */
const elkLayers = [
  { name: 'Elasticsearch', icon: Search, color: 'text-yellow-400', bg: 'bg-yellow-500/10', desc: 'Distributed search and analytics engine. Stores and indexes log data for fast full-text search across terabytes of logs.' },
  { name: 'Logstash', icon: Layers, color: 'text-green-400', bg: 'bg-green-500/10', desc: 'Data processing pipeline. Ingests logs from multiple sources, transforms them (parse, filter, enrich), and sends them to Elasticsearch.' },
  { name: 'Kibana', icon: BarChart3, color: 'text-blue-400', bg: 'bg-blue-500/10', desc: 'Visualization layer. Create dashboards, explore logs, build alerts, and analyze patterns in your data through a web UI.' },
]

/* ── Three Pillars of Observability ── */
const pillars = [
  {
    name: 'Metrics',
    icon: BarChart3,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    desc: 'Numeric measurements collected over time. Counters, gauges, and histograms.',
    examples: ['Request rate (requests/sec)', 'Error rate (% of 5xx responses)', 'P50/P95/P99 latency', 'CPU/Memory utilization'],
    tools: ['Prometheus', 'Datadog', 'Grafana', 'CloudWatch'],
    bestFor: 'Alerting and dashboards. "What is happening right now?"',
  },
  {
    name: 'Logs',
    icon: FileText,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    desc: 'Discrete events with timestamps and context. Structured or unstructured text.',
    examples: ['Application errors with stack traces', 'HTTP request/response details', 'Business events (user signed up)', 'Security audit trails'],
    tools: ['ELK Stack', 'Loki', 'Splunk', 'CloudWatch Logs'],
    bestFor: 'Debugging specific issues. "Why did this particular request fail?"',
  },
  {
    name: 'Traces',
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    desc: 'End-to-end path of a request through distributed services. Each "span" represents one hop.',
    examples: ['Request path through microservices', 'Timing breakdown per service', 'Error propagation chain', 'Dependency mapping'],
    tools: ['Jaeger', 'Zipkin', 'Tempo', 'AWS X-Ray'],
    bestFor: 'Understanding distributed systems. "Where did the time go?"',
  },
]

/* ── SLO/SLA/SLI definitions ── */
const sloSliSla = [
  {
    abbr: 'SLI',
    full: 'Service Level Indicator',
    color: 'text-blue-400',
    border: 'border-blue-500/30',
    desc: 'A quantitative measure of some aspect of the service. It is the actual measured value.',
    example: 'The proportion of requests that complete in under 200ms. Measured: 99.2% of requests are under 200ms.',
  },
  {
    abbr: 'SLO',
    full: 'Service Level Objective',
    color: 'text-green-400',
    border: 'border-green-500/30',
    desc: 'An internal target for how well the service should perform. A range of acceptable SLI values.',
    example: '99.5% of requests should complete in under 200ms. This is the goal the engineering team aims for.',
  },
  {
    abbr: 'SLA',
    full: 'Service Level Agreement',
    color: 'text-yellow-400',
    border: 'border-yellow-500/30',
    desc: 'A formal contract with customers that defines consequences (credits, refunds) if SLOs are missed.',
    example: '99.9% uptime guaranteed. If uptime drops below 99.9%, affected customers receive a 10% credit.',
  },
]

/* ── Quiz questions ── */
const quizData = [
  {
    id: 'q1',
    question: 'What is the key difference between metrics, logs, and traces?',
    options: [
      { id: 'a', text: 'Metrics are numbers over time, logs are discrete events, and traces follow a request across services', correct: true },
      { id: 'b', text: 'They are different names for the same thing — all collect error information', correct: false },
      { id: 'c', text: 'Metrics are for developers, logs are for operations, traces are for managers', correct: false },
      { id: 'd', text: 'Logs are always structured JSON, while metrics and traces are plain text', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What does SLO stand for, and how does it relate to SLI and SLA?',
    options: [
      { id: 'a', text: 'Service Load Optimizer — it balances traffic between SLI nodes using SLA contracts', correct: false },
      { id: 'b', text: 'Service Level Objective — an internal target for SLI values, while SLA is the external contract with consequences', correct: true },
      { id: 'c', text: 'System Logging Output — the data that feeds into SLI dashboards', correct: false },
      { id: 'd', text: 'Service Latency Observation — it measures how fast SLA requirements are met', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'In the ELK Stack, what is the role of Logstash?',
    options: [
      { id: 'a', text: 'It is the search engine that indexes and stores log data', correct: false },
      { id: 'b', text: 'It provides the web-based dashboards and visualizations', correct: false },
      { id: 'c', text: 'It is the data pipeline that ingests, transforms, and routes logs from multiple sources', correct: true },
      { id: 'd', text: 'It is the alerting system that sends notifications when thresholds are breached', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Why is alerting on symptoms (like high latency) generally better than alerting on causes (like high CPU)?',
    options: [
      { id: 'a', text: 'Because CPU metrics are always inaccurate in cloud environments', correct: false },
      { id: 'b', text: 'Because symptoms directly reflect user impact, while a cause like high CPU might not affect users if handled by autoscaling', correct: true },
      { id: 'c', text: 'Because causes are harder to measure than symptoms', correct: false },
      { id: 'd', text: 'Because symptoms generate fewer alerts, reducing infrastructure costs', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is a distributed trace "span"?',
    options: [
      { id: 'a', text: 'The total time a request takes from start to finish across all services', correct: false },
      { id: 'b', text: 'A unit of work in a single service, containing timing data, service name, and metadata — multiple spans form a trace', correct: true },
      { id: 'c', text: 'The network bandwidth consumed by a single request between two services', correct: false },
      { id: 'd', text: 'A log entry that is automatically generated by the tracing library', correct: false },
    ],
  },
]

export default function Level23({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* Dashboard simulation state */
  const [scenario, setScenario] = useState('healthy')
  const [metrics, setMetrics] = useState(generateMetrics('healthy'))
  const [dashboardTime, setDashboardTime] = useState(0)
  const [metricsHistory, setMetricsHistory] = useState([])
  const [dashboardRunning, setDashboardRunning] = useState(false)
  const intervalRef = useRef(null)

  /* Alert state */
  const [enabledAlerts, setEnabledAlerts] = useState(new Set())
  const [firedAlerts, setFiredAlerts] = useState([])

  /* Trace state */
  const [traceStep, setTraceStep] = useState(-1)
  const [tracePlaying, setTracePlaying] = useState(false)

  /* Investigation state */
  const [revealedClues, setRevealedClues] = useState(new Set())
  const [rootCauseAnswer, setRootCauseAnswer] = useState(null)
  const [rootCauseSubmitted, setRootCauseSubmitted] = useState(false)

  /* Active pillar for interactive exploration */
  const [activePillar, setActivePillar] = useState(null)

  const sections = ['story', 'pillars', 'dashboard', 'tracing', 'investigation', 'quiz']

  /* ── Dashboard simulation loop ── */
  const startDashboard = useCallback(() => {
    if (dashboardRunning) return
    setDashboardRunning(true)
    setDashboardTime(0)
    setMetricsHistory([])
    setFiredAlerts([])

    let tick = 0
    intervalRef.current = setInterval(() => {
      tick++
      let currentScenario = 'healthy'
      if (tick > 8 && tick <= 15) currentScenario = 'degraded'
      if (tick > 15) currentScenario = 'incident'

      const m = generateMetrics(currentScenario)
      // Add some jitter
      const jitteredMetrics = {
        latencyP50: m.latencyP50 + Math.floor(Math.random() * 20 - 10),
        latencyP99: m.latencyP99 + Math.floor(Math.random() * 50 - 25),
        errorRate: Math.max(0, +(m.errorRate + (Math.random() * 0.5 - 0.25)).toFixed(1)),
        throughput: m.throughput + Math.floor(Math.random() * 100 - 50),
        cpu: Math.min(100, Math.max(0, m.cpu + Math.floor(Math.random() * 8 - 4))),
        memory: Math.min(100, Math.max(0, m.memory + Math.floor(Math.random() * 6 - 3))),
      }

      setMetrics(jitteredMetrics)
      setScenario(currentScenario)
      setDashboardTime(tick)
      setMetricsHistory(prev => [...prev.slice(-24), { tick, ...jitteredMetrics }])

      // Check alerts
      setEnabledAlerts(current => {
        const newFired = []
        current.forEach(alertId => {
          const alertDef = alertDefinitions.find(a => a.id === alertId)
          if (!alertDef) return
          if (alertDef.thresholdBelow !== undefined) {
            if (jitteredMetrics[alertDef.metric] < alertDef.thresholdBelow) {
              newFired.push({ ...alertDef, value: jitteredMetrics[alertDef.metric], time: tick })
            }
          } else if (jitteredMetrics[alertDef.metric] > alertDef.threshold) {
            newFired.push({ ...alertDef, value: jitteredMetrics[alertDef.metric], time: tick })
          }
        })
        if (newFired.length > 0) {
          setFiredAlerts(prev => [...prev, ...newFired].slice(-12))
        }
        return current
      })

      if (tick >= 25) {
        clearInterval(intervalRef.current)
        setDashboardRunning(false)
      }
    }, 800)
  }, [dashboardRunning])

  const resetDashboard = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDashboardRunning(false)
    setScenario('healthy')
    setMetrics(generateMetrics('healthy'))
    setDashboardTime(0)
    setMetricsHistory([])
    setFiredAlerts([])
  }, [])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  /* ── Trace playback ── */
  useEffect(() => {
    if (!tracePlaying) return
    if (traceStep >= traceSpans.length - 1) {
      setTracePlaying(false)
      return
    }
    const timer = setTimeout(() => setTraceStep(prev => prev + 1), 600)
    return () => clearTimeout(timer)
  }, [tracePlaying, traceStep])

  const startTrace = () => {
    setTraceStep(0)
    setTracePlaying(true)
  }

  const resetTrace = () => {
    setTraceStep(-1)
    setTracePlaying(false)
  }

  /* ── Toggle alert ── */
  const toggleAlert = (alertId) => {
    setEnabledAlerts(prev => {
      const next = new Set(prev)
      if (next.has(alertId)) next.delete(alertId)
      else next.add(alertId)
      return next
    })
  }

  /* ── Quiz submission ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ── Mini sparkline chart ── */
  const Sparkline = ({ data, dataKey, color, height = 40 }) => {
    if (data.length < 2) return null
    const values = data.map(d => d[dataKey])
    const min = Math.min(...values)
    const max = Math.max(...values)
    const range = max - min || 1
    const w = 200
    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * w
      const y = height - ((v - min) / range) * (height - 4)
      return `${x},${y}`
    }).join(' ')

    return (
      <svg width={w} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  /* ── Total trace duration ── */
  const totalTraceDuration = traceSpans.reduce((sum, s) => sum + s.duration, 0)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Navigation */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${currentSection === index
                ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/25'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: STORY ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="text-red-400" />
              Watching the Watchers
            </h2>

            {/* Story intro */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-red-500/20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <p className="text-lg text-quest-text italic mb-4 leading-relaxed">
                  "It's 3 AM. Your phone buzzes. An angry Slack message from the VP of Engineering:
                  <span className="text-red-400 font-semibold"> 'Checkout is completely broken. Customers are furious. How long has this been going on?'</span>"
                </p>
                <p className="text-quest-muted mb-4">
                  You pull up your laptop. The application looks... fine? No error pages. The servers are running.
                  But then you check the numbers: <span className="text-red-400 font-bold">latency spiked 10x</span> an hour ago.
                  Error rate is at <span className="text-red-400 font-bold">18%</span>. Hundreds of failed payments.
                  And nobody noticed because <span className="text-yellow-400 font-semibold">there were no alerts, no dashboards, no visibility</span>.
                </p>
                <p className="text-quest-muted">
                  You are flying blind. This is what happens when you build systems without{' '}
                  <Term
                    word="Observability"
                    definition="The ability to understand the internal state of a system by examining its external outputs: metrics, logs, and traces. Unlike simple monitoring (which checks known failure modes), observability lets you ask arbitrary questions about your system."
                    onLearn={learnTerm}
                  />
                  . Today, you learn to watch the watchers.
                </p>
              </motion.div>
            </div>

            {/* The problem visual */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-red-500/20">
                <h4 className="text-sm font-semibold mb-3 text-red-400 flex items-center gap-2">
                  <XCircle size={16} />
                  Without Observability
                </h4>
                <div className="space-y-2">
                  {[
                    'Users report issues before you know',
                    'No idea where the problem is',
                    'Hours of guesswork to find root cause',
                    '"It works on my machine"',
                    'Post-mortems with no data',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-quest-muted"
                    >
                      <XCircle size={12} className="text-red-400 flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <h4 className="text-sm font-semibold mb-3 text-green-400 flex items-center gap-2">
                  <CheckCircle size={16} />
                  With Observability
                </h4>
                <div className="space-y-2">
                  {[
                    'Alerts fire before users notice',
                    'Dashboards pinpoint the failing service',
                    'Traces show exactly where time is spent',
                    'Logs reveal the specific error',
                    'Data-driven post-mortems',
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      className="flex items-center gap-2 text-sm text-quest-muted"
                    >
                      <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-quest-muted">
              Modern systems are complex. A single user request might touch 10+ services across multiple data centers.
              When something breaks, you need{' '}
              <Term
                word="Monitoring"
                definition="The practice of collecting, processing, and displaying real-time data about your systems. Monitoring tells you WHEN something is wrong. It checks known failure modes: Is the server up? Is disk full? Is latency above threshold?"
                onLearn={learnTerm}
              />{' '}
              to know WHEN something is wrong,{' '}
              <Term
                word="Logging"
                definition="Recording discrete events (errors, requests, state changes) with timestamps and context. Logs answer WHY something went wrong by providing detailed context about specific events. Structured logging (JSON) makes logs searchable and parseable."
                onLearn={learnTerm}
              />{' '}
              to know WHY, and{' '}
              <Term
                word="Distributed Tracing"
                definition="A method for tracking requests as they flow through distributed systems. Each service adds a 'span' with timing data to a shared trace ID. Tools like Jaeger and Zipkin visualize the full path, showing exactly where time was spent and where errors occurred."
                onLearn={learnTerm}
              />{' '}
              to know WHERE.
            </p>

            <DeepDive id="monitoring-vs-observability" title="Monitoring vs. Observability — What's the Difference?" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Monitoring</strong> is about checking known failure modes: "Is the server up?"
                  "Is CPU above 90%?" You define the questions in advance. It works great for predictable failures.
                </p>
                <p>
                  <strong className="text-quest-text">Observability</strong> goes further. It is the ability to ask <em>arbitrary</em> questions
                  about your system without deploying new code. "Why are requests from Germany slower than from the US?"
                  "Which specific user ID triggered the cascade failure?" You could not have predicted these questions, but
                  with rich telemetry data (metrics + logs + traces), you can answer them on the fly.
                </p>
                <p>
                  Think of it this way: monitoring is like a car's warning lights (check engine, low fuel). Observability
                  is like having a full diagnostic computer that lets a mechanic investigate any problem, even ones the
                  manufacturer never anticipated.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                The Three Pillars
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: THREE PILLARS ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Activity className="text-blue-400" />
              The Three Pillars of Observability
            </h2>

            <p className="text-quest-muted mb-6">
              Observability rests on three complementary signal types. Each answers different questions.
              Click each pillar to explore its details.
            </p>

            {/* Pillar cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                const isActive = activePillar === pillar.name
                return (
                  <motion.button
                    key={pillar.name}
                    onClick={() => setActivePillar(isActive ? null : pillar.name)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    className={`text-left p-5 rounded-xl border-2 transition-all
                      ${isActive
                        ? `${pillar.bg} ${pillar.border} ring-1 ring-white/10`
                        : 'bg-quest-bg border-white/10 hover:border-white/20'}`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-3`}>
                      <Icon size={24} className={pillar.color} />
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${pillar.color}`}>{pillar.name}</h3>
                    <p className="text-xs text-quest-muted leading-relaxed">{pillar.desc}</p>
                  </motion.button>
                )
              })}
            </div>

            {/* Expanded pillar detail */}
            <AnimatePresence mode="wait">
              {activePillar && (
                <motion.div
                  key={activePillar}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {pillars.filter(p => p.name === activePillar).map(pillar => (
                    <div key={pillar.name} className={`bg-quest-bg rounded-xl p-6 border ${pillar.border} mb-6`}>
                      <h4 className={`text-sm font-semibold mb-4 ${pillar.color}`}>{pillar.name} in Detail</h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-quest-muted mb-2 font-semibold">Examples:</p>
                          <ul className="space-y-1">
                            {pillar.examples.map((ex, i) => (
                              <li key={i} className="text-xs text-quest-muted flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${pillar.color.replace('text-', 'bg-')}`} />
                                {ex}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs text-quest-muted mb-2 font-semibold">Tools:</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {pillar.tools.map(tool => (
                              <span key={tool} className={`px-2 py-1 rounded-md text-xs ${pillar.bg} ${pillar.color} border ${pillar.border}`}>
                                {tool}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-quest-muted">
                            <strong className="text-quest-text">Best for:</strong> {pillar.bestFor}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prometheus & Grafana */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 size={18} className="text-orange-400" />
              <Term
                word="Prometheus"
                definition="An open-source monitoring and alerting toolkit originally built at SoundCloud. It uses a pull-based model to scrape metrics from targets, stores them in a time-series database, and provides PromQL for powerful queries. The de facto standard for cloud-native monitoring."
                onLearn={learnTerm}
              />{' '}
              +{' '}
              <Term
                word="Grafana"
                definition="An open-source analytics and visualization platform. Connects to data sources like Prometheus, Elasticsearch, and Loki to create beautiful, interactive dashboards. The go-to tool for building monitoring dashboards in the industry."
                onLearn={learnTerm}
              />
            </h3>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-orange-500/20">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">Prometheus (Metrics Collection)</h4>
                  <div className="space-y-2 text-xs text-quest-muted">
                    <p><strong className="text-quest-text">Pull Model:</strong> Prometheus scrapes /metrics endpoints from your services every 15-30s.</p>
                    <p><strong className="text-quest-text">PromQL:</strong> A powerful query language. Example: <code className="font-mono text-orange-300">rate(http_requests_total[5m])</code></p>
                    <p><strong className="text-quest-text">Time Series:</strong> Every metric is a time series: a name + labels + timestamps + values.</p>
                    <p><strong className="text-quest-text">Alertmanager:</strong> Evaluates alerting rules and routes notifications to Slack, PagerDuty, email.</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Grafana (Visualization)</h4>
                  <div className="space-y-2 text-xs text-quest-muted">
                    <p><strong className="text-quest-text">Dashboards:</strong> Drag-and-drop panels: graphs, gauges, heatmaps, tables, alerts.</p>
                    <p><strong className="text-quest-text">Data Sources:</strong> Connects to 100+ backends: Prometheus, Elasticsearch, Loki, CloudWatch, etc.</p>
                    <p><strong className="text-quest-text">Alerting:</strong> Visual alert rules with notification channels. No PromQL needed.</p>
                    <p><strong className="text-quest-text">Explore:</strong> Ad-hoc querying mode for investigation — correlate metrics, logs, and traces.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ELK Stack */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Layers size={18} className="text-yellow-400" />
              <Term
                word="ELK Stack"
                definition="A popular open-source log management stack: Elasticsearch (search/storage), Logstash (ingestion/transformation), and Kibana (visualization). Used by thousands of companies to collect, search, and visualize log data at scale. Often extended with Beats (lightweight shippers)."
                onLearn={learnTerm}
              />
            </h3>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-yellow-500/20">
              <div className="space-y-3">
                {elkLayers.map((layer, i) => {
                  const Icon = layer.icon
                  return (
                    <motion.div
                      key={layer.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-4 p-3 bg-quest-surface rounded-lg"
                    >
                      <div className={`w-10 h-10 rounded-lg ${layer.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon size={20} className={layer.color} />
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold ${layer.color}`}>{layer.name}</h4>
                        <p className="text-xs text-quest-muted">{layer.desc}</p>
                      </div>
                      {i < elkLayers.length - 1 && (
                        <ArrowDown size={16} className="text-quest-muted mx-auto mt-2 flex-shrink-0" />
                      )}
                    </motion.div>
                  )
                })}
              </div>
              <p className="text-xs text-quest-muted mt-3 italic">
                Modern alternative: the "PLG" stack — Prometheus + Loki + Grafana — offers tighter integration and lower resource usage.
              </p>
            </div>

            {/* Jaeger / Distributed Tracing */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Layers size={18} className="text-purple-400" />
              <Term
                word="Jaeger"
                definition="An open-source distributed tracing platform created by Uber. Implements the OpenTelemetry standard. Visualizes request paths through microservices as trace waterfalls, showing timing, errors, and dependencies. Named after the German word for 'hunter'."
                onLearn={learnTerm}
              />{' '}
              and Distributed Tracing
            </h3>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-purple-500/20">
              <div className="space-y-3 text-xs text-quest-muted">
                <p>
                  When a user clicks "Place Order," the request might flow through: API Gateway, Auth Service,
                  Order Service, Payment Service, Inventory Service, and Notification Service. If it takes 3 seconds,
                  <strong className="text-quest-text"> where did the time go?</strong>
                </p>
                <p>
                  A{' '}
                  <Term
                    word="Trace"
                    definition="A trace represents the entire journey of a request through a distributed system. It consists of multiple spans, each representing a unit of work in a specific service. Traces are identified by a unique trace ID that propagates through all services via HTTP headers."
                    onLearn={learnTerm}
                  />{' '}
                  answers this by recording a{' '}
                  <Term
                    word="Span"
                    definition="A single unit of work within a trace. Contains: operation name, service name, start time, duration, status code, and optional tags/logs. Spans have parent-child relationships forming a tree that mirrors the call graph."
                    onLearn={learnTerm}
                  />{' '}
                  for every service hop. Each span records timing, status, and metadata. You can see that the Payment
                  Service took 2.8s of the total 3s — that is your bottleneck.
                </p>
              </div>
            </div>

            {/* SLO/SLA/SLI */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield size={18} className="text-green-400" />
              <Term
                word="SLO/SLA/SLI"
                definition="Three related concepts for defining service reliability. SLI (Service Level Indicator) = the actual measured metric. SLO (Service Level Objective) = the internal target for that metric. SLA (Service Level Agreement) = the external contract with customers, including consequences for missing targets."
                onLearn={learnTerm}
              />
            </h3>

            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {sloSliSla.map((item, i) => (
                <motion.div
                  key={item.abbr}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className={`bg-quest-bg rounded-xl p-4 border ${item.border}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-2xl font-black ${item.color}`}>{item.abbr}</span>
                  </div>
                  <p className={`text-xs font-semibold ${item.color} mb-1`}>{item.full}</p>
                  <p className="text-xs text-quest-muted mb-2">{item.desc}</p>
                  <div className="bg-quest-surface rounded-lg p-2 border border-white/5">
                    <p className="text-[10px] text-quest-muted italic">{item.example}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">How They Relate</h4>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {['SLI (Measure)', 'feeds into', 'SLO (Target)', 'backs', 'SLA (Contract)'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    {i % 2 === 0 ? (
                      <span className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                        i === 0 ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                        i === 2 ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {item}
                      </span>
                    ) : (
                      <ArrowRight size={14} className="text-quest-muted" />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-quest-muted mt-3 text-center">
                Example: SLI = 99.2% requests under 200ms. SLO = 99.5% target. SLA = 99.9% guaranteed or credits issued.
              </p>
            </div>

            <DeepDive id="error-budgets" title="Error Budgets — How Google Manages Reliability" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  An <strong className="text-quest-text">error budget</strong> is the acceptable amount of unreliability.
                  If your SLO is 99.9% uptime, your error budget is 0.1% — about 43 minutes of downtime per month.
                </p>
                <p>
                  Google popularized this concept in their SRE book. The idea: if your error budget is not being consumed,
                  you are being <em>too reliable</em> and should ship features faster (accept more risk). If the budget is
                  exhausted, freeze deployments and focus on reliability.
                </p>
                <p>
                  This creates a healthy tension between feature velocity and reliability. Product teams want to ship fast;
                  the error budget tells them exactly how much risk they can afford.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="opentelemetry" title="OpenTelemetry — The Future of Observability" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">OpenTelemetry (OTel)</strong> is an open-source observability
                  framework that provides a single set of APIs, libraries, and agents to collect metrics, logs, and
                  traces. It is vendor-neutral — instrument once, send data to any backend.
                </p>
                <p>
                  Before OTel, you had to choose between Prometheus client libraries for metrics, Jaeger SDKs for traces,
                  and different logging libraries. Each had different APIs and concepts. OTel unifies all three under one standard.
                </p>
                <p>
                  OTel is now the second-most active CNCF project after Kubernetes. It is becoming the industry standard
                  for instrumentation. Major vendors (Datadog, New Relic, Grafana) all support OTel natively.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Live Dashboard
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: DASHBOARD SIMULATION ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="text-blue-400" />
              Live Metrics Dashboard
            </h2>

            <p className="text-quest-muted mb-4">
              This simulates a real monitoring dashboard. Press <strong className="text-quest-text">Start Simulation</strong>{' '}
              to watch a healthy system degrade into an incident over 25 seconds. Set up{' '}
              <Term
                word="Alerts"
                definition="Automated notifications triggered when metrics cross predefined thresholds. Good alerts are actionable (someone can fix it), symptoms-based (alert on user impact, not just causes), and have clear runbooks. Bad alerts cause alert fatigue — too many false positives desensitize on-call engineers."
                onLearn={learnTerm}
              />{' '}
              to catch the problem before it escalates.
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={startDashboard}
                disabled={dashboardRunning}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Play size={16} />
                Start Simulation
              </button>
              <button
                onClick={resetDashboard}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <Clock size={14} className="text-quest-muted" />
                <span className="text-sm font-mono text-quest-muted">t={dashboardTime}s</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  scenario === 'healthy' ? 'bg-green-500/20 text-green-400' :
                  scenario === 'degraded' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {scenario.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Metrics grid */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/10">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Activity size={16} className="text-blue-400" />
                System{' '}
                <Term
                  word="Metrics"
                  definition="Numeric measurements collected at regular intervals. Four key types: Counters (only go up — total requests), Gauges (can go up or down — CPU usage), Histograms (distribution of values — latency percentiles), and Summaries (pre-calculated quantiles)."
                  onLearn={learnTerm}
                />
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <MetricBar label="P50 Latency" value={metrics.latencyP50} max={2000} color="text-blue-400" unit="ms" icon={Clock} delay={0} />
                  <MetricBar label="P99 Latency" value={metrics.latencyP99} max={10000} color="text-purple-400" unit="ms" icon={Clock} delay={0.1} />
                  <MetricBar label="Error Rate" value={metrics.errorRate} max={25} color="text-red-400" unit="%" icon={AlertTriangle} delay={0.2} />
                </div>
                <div>
                  <MetricBar label="Throughput" value={metrics.throughput} max={1500} color="text-green-400" unit=" rps" icon={TrendingUp} delay={0.3} />
                  <MetricBar label="CPU Usage" value={metrics.cpu} max={100} color="text-orange-400" unit="%" icon={Cpu} delay={0.4} />
                  <MetricBar label="Memory" value={metrics.memory} max={100} color="text-cyan-400" unit="%" icon={Database} delay={0.5} />
                </div>
              </div>

              {/* Sparkline charts */}
              {metricsHistory.length > 2 && (
                <div className="grid md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xs text-quest-muted mb-1">Latency P99 Trend</p>
                    <Sparkline data={metricsHistory} dataKey="latencyP99" color="#a78bfa" />
                  </div>
                  <div>
                    <p className="text-xs text-quest-muted mb-1">Error Rate Trend</p>
                    <Sparkline data={metricsHistory} dataKey="errorRate" color="#f87171" />
                  </div>
                  <div>
                    <p className="text-xs text-quest-muted mb-1">Throughput Trend</p>
                    <Sparkline data={metricsHistory} dataKey="throughput" color="#4ade80" />
                  </div>
                </div>
              )}
            </div>

            {/* Alert configuration */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-yellow-500/20">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Bell size={16} className="text-yellow-400" />
                Alert Configuration
              </h3>
              <p className="text-xs text-quest-muted mb-4">
                Toggle alerts ON before starting the simulation. Watch them fire as conditions deteriorate.
              </p>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                {alertDefinitions.map(alert => {
                  const Icon = alert.icon
                  const isEnabled = enabledAlerts.has(alert.id)
                  return (
                    <button
                      key={alert.id}
                      onClick={() => toggleAlert(alert.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left
                        ${isEnabled
                          ? 'border-yellow-500/50 bg-yellow-500/10'
                          : 'border-white/10 bg-quest-surface hover:border-white/20'}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isEnabled ? 'bg-yellow-500/20' : 'bg-quest-bg'
                      }`}>
                        <Icon size={16} className={isEnabled ? 'text-yellow-400' : 'text-quest-muted'} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{alert.name}</p>
                        <p className="text-[10px] text-quest-muted">
                          Severity: <span className={alert.severity === 'critical' ? 'text-red-400' : 'text-yellow-400'}>{alert.severity}</span>
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isEnabled ? 'border-yellow-400 bg-yellow-400' : 'border-white/20'
                      }`}>
                        {isEnabled && <CheckCircle size={12} className="text-quest-bg" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Fired alerts log */}
              {firedAlerts.length > 0 && (
                <div className="bg-quest-surface rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertCircle size={14} />
                    Alert Log ({firedAlerts.length} alerts fired)
                  </h4>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {firedAlerts.map((alert, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex items-center gap-2 text-xs py-1 px-2 rounded ${
                          alert.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}
                      >
                        <Bell size={10} />
                        <span className="font-mono">t={alert.time}s</span>
                        <span>{alert.name}</span>
                        <span className="ml-auto font-mono">
                          {typeof alert.value === 'number' ? alert.value.toFixed?.(1) ?? alert.value : alert.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DeepDive id="alert-best-practices" title="Alerting Best Practices — Avoiding Alert Fatigue" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Alert on symptoms, not causes.</strong> Alert on "error rate &gt; 5%"
                  (symptom users feel) rather than "CPU &gt; 80%" (cause that may or may not impact users). High CPU with
                  zero errors? Not worth waking someone up.
                </p>
                <p>
                  <strong className="text-quest-text">Every alert needs a runbook.</strong> When the pager goes off at 3 AM,
                  the on-call engineer should not have to figure out what to do from scratch. Each alert should link to a
                  documented set of steps: what to check, how to mitigate, who to escalate to.
                </p>
                <p>
                  <strong className="text-quest-text">Use severity levels wisely.</strong> Critical = page someone immediately.
                  Warning = investigate during business hours. Info = no action needed, just visibility. If everything is
                  critical, nothing is.
                </p>
                <p>
                  <strong className="text-quest-text">Avoid alert fatigue.</strong> Too many false positives and people
                  start ignoring alerts. Google's SRE team recommends: if an alert fires and requires no human action,
                  remove or downgrade it. Target a maximum of 2 pages per on-call shift.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Distributed Tracing
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: DISTRIBUTED TRACING ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-purple-400" />
              Distributed Tracing — Follow the Request
            </h2>

            <p className="text-quest-muted mb-6">
              A user clicks "Place Order." The request traverses 8 services. One of them is broken.
              Click <strong className="text-quest-text">Play Trace</strong> to watch the request flow through
              each service and see exactly where things go wrong.
            </p>

            {/* Trace controls */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={startTrace}
                disabled={tracePlaying}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Play size={16} />
                Play Trace
              </button>
              <button
                onClick={resetTrace}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              {traceStep >= 0 && (
                <span className="text-sm text-quest-muted ml-auto">
                  Span {Math.min(traceStep + 1, traceSpans.length)} / {traceSpans.length}
                </span>
              )}
            </div>

            {/* Trace waterfall visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-purple-500/20">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Activity size={16} className="text-purple-400" />
                Trace Waterfall — Order #38291
              </h3>

              {/* Timeline header */}
              <div className="flex items-center gap-2 mb-4 text-xs text-quest-muted">
                <span>0ms</span>
                <div className="flex-1 h-px bg-white/10" />
                <span>{Math.round(totalTraceDuration / 2)}ms</span>
                <div className="flex-1 h-px bg-white/10" />
                <span>{totalTraceDuration}ms</span>
              </div>

              {/* Spans */}
              <div className="space-y-1">
                {traceSpans.map((span, i) => {
                  const isVisible = i <= traceStep
                  const startOffset = traceSpans.slice(0, i).reduce((sum, s) => {
                    if (s.depth < span.depth) return sum
                    return sum
                  }, 0)
                  const widthPct = Math.max((span.duration / totalTraceDuration) * 100, 3)

                  return (
                    <div key={i} style={{ paddingLeft: span.depth * 20 }}>
                      <AnimatePresence>
                        {isVisible && (
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                            style={{ transformOrigin: 'left' }}
                            className="flex items-center gap-3"
                          >
                            <span className="text-xs text-quest-muted w-32 truncate flex-shrink-0">{span.name}</span>
                            <div className="flex-1 h-7 bg-quest-surface rounded relative overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${widthPct}%` }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`h-full rounded flex items-center px-2 ${
                                  span.status === 'ok' ? 'bg-green-500/30 border border-green-500/40' :
                                  span.status === 'slow' ? 'bg-yellow-500/30 border border-yellow-500/40' :
                                  'bg-red-500/30 border border-red-500/40'
                                }`}
                              >
                                <span className={`text-[10px] font-mono whitespace-nowrap ${
                                  span.status === 'ok' ? 'text-green-300' :
                                  span.status === 'slow' ? 'text-yellow-300' :
                                  'text-red-300'
                                }`}>
                                  {span.duration}ms
                                  {span.status === 'error' && ' ERROR'}
                                  {span.status === 'slow' && ' SLOW'}
                                </span>
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* Trace summary */}
              {traceStep >= traceSpans.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-quest-surface rounded-lg border border-purple-500/20"
                >
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Trace Analysis</h4>
                  <div className="grid grid-cols-3 gap-4 text-xs mb-3">
                    <div>
                      <span className="text-quest-muted">Total Duration</span>
                      <p className="font-mono font-bold text-red-400">{totalTraceDuration}ms</p>
                    </div>
                    <div>
                      <span className="text-quest-muted">Total Spans</span>
                      <p className="font-mono font-bold">{traceSpans.length}</p>
                    </div>
                    <div>
                      <span className="text-quest-muted">Errors</span>
                      <p className="font-mono font-bold text-red-400">{traceSpans.filter(s => s.status === 'error').length}</p>
                    </div>
                  </div>
                  <p className="text-xs text-quest-muted">
                    <strong className="text-red-400">Finding:</strong> The Payment Service span took 350ms and returned an error.
                    The PostgreSQL Query span took 180ms (slow). Together, these two spans account for 84% of the total trace time.
                    The Payment Service is the root cause.
                  </p>
                </motion.div>
              )}
            </div>

            {/* How tracing works */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">How Distributed Tracing Works</h4>
              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { step: '1', title: 'Generate Trace ID', desc: 'First service creates a unique trace ID and its own span ID.', icon: Zap },
                  { step: '2', title: 'Propagate Context', desc: 'Trace ID is passed via HTTP headers (traceparent) to downstream services.', icon: ArrowRight },
                  { step: '3', title: 'Record Spans', desc: 'Each service records its span: start time, duration, status, tags.', icon: FileText },
                  { step: '4', title: 'Collect & Visualize', desc: 'Jaeger/Zipkin collects all spans and reconstructs the trace waterfall.', icon: BarChart3 },
                ].map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-quest-bg rounded-lg p-3 text-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                        <span className="text-xs font-bold text-purple-400">{item.step}</span>
                      </div>
                      <p className="text-xs font-semibold mb-1">{item.title}</p>
                      <p className="text-[10px] text-quest-muted">{item.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <DeepDive id="sampling-strategies" title="Trace Sampling — You Can't Trace Everything" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  At high traffic volumes, tracing every single request is too expensive. A service handling 100K requests/sec
                  would generate terabytes of trace data per day. So we sample.
                </p>
                <p>
                  <strong className="text-quest-text">Head-based sampling:</strong> Decide at the start of a request whether to trace it.
                  Simple: trace 1% of requests. Problem: you might miss rare errors.
                </p>
                <p>
                  <strong className="text-quest-text">Tail-based sampling:</strong> Collect all spans temporarily, then decide
                  after the request completes whether to keep the trace. Keep all traces with errors, slow traces, and a
                  random sample of healthy ones. More expensive but catches important traces.
                </p>
                <p>
                  <strong className="text-quest-text">Adaptive sampling:</strong> Dynamically adjust sample rate based on
                  traffic volume and error rates. Sample more when things are broken, less when healthy.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Investigate an Incident
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: INCIDENT INVESTIGATION ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Search className="text-red-400" />
              Incident Investigation
            </h2>

            <p className="text-quest-muted mb-2">
              It is 3 AM. Checkout is broken. Users are angry. You have metrics, logs, traces, and infrastructure data.
              <strong className="text-quest-text"> Can you find the root cause?</strong>
            </p>
            <p className="text-xs text-quest-muted mb-6 italic">
              Click each investigation step below to reveal clues. Once you have enough information, identify the root cause.
            </p>

            {/* Investigation clues */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {investigationClues.map((clue, i) => {
                const Icon = clue.icon
                const isRevealed = revealedClues.has(clue.id)
                return (
                  <motion.div
                    key={clue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => setRevealedClues(prev => new Set([...prev, clue.id]))}
                      className={`w-full text-left p-4 rounded-xl border transition-all ${
                        isRevealed
                          ? 'bg-quest-surface border-quest-primary/30'
                          : 'bg-quest-bg border-white/10 hover:border-quest-primary/30 hover:bg-quest-surface/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isRevealed ? 'bg-quest-primary/20' : 'bg-quest-bg'
                        }`}>
                          <Icon size={20} className={isRevealed ? 'text-quest-primary' : 'text-quest-muted'} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold">{clue.title}</h4>
                          {!isRevealed && <p className="text-[10px] text-quest-muted">Click to investigate</p>}
                        </div>
                        {isRevealed && <CheckCircle size={16} className="text-green-400 ml-auto" />}
                      </div>

                      {isRevealed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3"
                        >
                          <div className="bg-quest-bg rounded-lg p-3 font-mono text-xs text-quest-muted mb-2 leading-relaxed border border-white/5">
                            {clue.content}
                          </div>
                          <p className="text-xs text-quest-primary font-semibold">
                            Finding: {clue.finding}
                          </p>
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {/* Root cause identification */}
            <div className={`bg-quest-bg rounded-xl p-6 border transition-all ${
              revealedClues.size >= 3 ? 'border-yellow-500/30' : 'border-white/5 opacity-50'
            }`}>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-yellow-400" />
                Identify the Root Cause
                {revealedClues.size < 3 && (
                  <span className="text-xs text-quest-muted font-normal">(Investigate at least 3 clues first)</span>
                )}
              </h3>

              {revealedClues.size >= 3 && (
                <div className="space-y-2">
                  {rootCauseOptions.map(option => {
                    const isSelected = rootCauseAnswer === option.id
                    const showResult = rootCauseSubmitted
                    const isCorrect = option.correct

                    return (
                      <button
                        key={option.id}
                        onClick={() => !rootCauseSubmitted && setRootCauseAnswer(option.id)}
                        disabled={rootCauseSubmitted}
                        className={`w-full text-left p-3 rounded-lg border transition-all text-sm
                          ${isSelected
                            ? showResult
                              ? isCorrect ? 'border-quest-success bg-quest-success/10' : 'border-quest-danger bg-quest-danger/10'
                              : 'border-quest-primary bg-quest-primary/10'
                            : showResult && isCorrect
                              ? 'border-quest-success bg-quest-success/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                      >
                        {option.text}
                      </button>
                    )
                  })}

                  {!rootCauseSubmitted ? (
                    <button
                      onClick={() => setRootCauseSubmitted(true)}
                      disabled={!rootCauseAnswer}
                      className="btn-primary w-full mt-3 disabled:opacity-50"
                    >
                      Submit Root Cause
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-4 rounded-lg border ${
                        rootCauseOptions.find(o => o.id === rootCauseAnswer)?.correct
                          ? 'bg-green-500/10 border-green-500/30'
                          : 'bg-red-500/10 border-red-500/30'
                      }`}
                    >
                      {rootCauseOptions.find(o => o.id === rootCauseAnswer)?.correct ? (
                        <div>
                          <p className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                            <CheckCircle size={16} /> Correct!
                          </p>
                          <p className="text-xs text-quest-muted">
                            A scheduled batch job started at 14:30, consuming all 50 database connections on the payment DB.
                            This caused the Payment Service to timeout waiting for connections, resulting in the latency spike
                            and error rate increase. The fix: move batch jobs to a read replica, or run them during off-peak hours
                            with connection limits.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                            <XCircle size={16} /> Not quite.
                          </p>
                          <p className="text-xs text-quest-muted">
                            The evidence points to the payment database. The logs show connection pool exhaustion, the traces show
                            Payment Service timeouts, and the infrastructure check reveals a batch job consuming all resources.
                            The root cause is the batch job on the payment database.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <DeepDive id="incident-management" title="Incident Management — The Human Side" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Incident Response Framework:</strong> When an incident occurs,
                  follow a structured process: (1) Detect and alert, (2) Triage and assess severity, (3) Communicate
                  (status page, stakeholders), (4) Mitigate (stop the bleeding), (5) Resolve (fix root cause),
                  (6) Post-mortem (learn and prevent).
                </p>
                <p>
                  <strong className="text-quest-text">Blameless Post-Mortems:</strong> Focus on the system, not the person.
                  "The deployment pipeline lacked a canary step" not "John deployed bad code." People make mistakes;
                  systems should catch them.
                </p>
                <p>
                  <strong className="text-quest-text">MTTR over MTBF:</strong> Mean Time To Recovery matters more than
                  Mean Time Between Failures. You cannot prevent all failures, but you can detect and recover faster.
                  Organizations that invest in observability have 60% lower MTTR.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 5: QUIZ ═══════════════════ */}
      {currentSection === 5 && (
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
              Monitoring, logging, and observability are essential for running reliable systems at scale.
              Let's verify your understanding.
            </p>

            <div className="space-y-8">
              {quizData.map((q, qIndex) => (
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
                disabled={Object.keys(quizAnswers).length < quizData.length}
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
                <h3 className="text-xl font-bold mb-2">Level 23 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the three pillars of observability, how to build dashboards and alerts,
                  how distributed tracing works, and how to investigate incidents using real telemetry data.
                </p>
                <p className="text-sm text-purple-400">
                  The watchers are watching. Your systems will never fly blind again.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

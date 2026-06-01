import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Server, Database, Network, Search, Heart, Activity,
  AlertTriangle, XCircle, Globe, Wifi, WifiOff, RefreshCw,
  Zap, Shield, ArrowDown, ArrowUp, Radio, Eye
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

const quizQuestions = [
  {
    id: 'q1',
    question: 'Why can\'t you use hardcoded IP addresses in a microservice architecture?',
    options: [
      { id: 'a', text: 'IP addresses are too long to remember and type correctly', correct: false },
      { id: 'b', text: 'Services scale dynamically and instances get different IP addresses each time they start', correct: true },
      { id: 'c', text: 'Firewalls block all hardcoded IP connections', correct: false },
      { id: 'd', text: 'IP addresses only work within a single data center', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What is the difference between client-side and server-side service discovery?',
    options: [
      { id: 'a', text: 'Client-side is faster because it skips DNS resolution entirely', correct: false },
      { id: 'b', text: 'Server-side requires every service to have a static IP address', correct: false },
      { id: 'c', text: 'In client-side, the client queries the registry and chooses an instance; in server-side, a load balancer handles the lookup', correct: true },
      { id: 'd', text: 'Client-side only works in the browser, server-side only works on the backend', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What happens when a service instance fails to send heartbeats?',
    options: [
      { id: 'a', text: 'The registry immediately deletes the service from all records', correct: false },
      { id: 'b', text: 'The registry marks it as unhealthy and stops routing traffic to it after a timeout period', correct: true },
      { id: 'c', text: 'All other instances of the same service are also marked as unhealthy', correct: false },
      { id: 'd', text: 'The load balancer restarts the failed instance automatically', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Why is DNS-based service discovery popular in Kubernetes?',
    options: [
      { id: 'a', text: 'DNS is the only networking protocol Kubernetes supports', correct: false },
      { id: 'b', text: 'It\'s built-in, requires no additional infrastructure, and service names automatically resolve to healthy pod IPs', correct: true },
      { id: 'c', text: 'DNS provides encryption for all service-to-service communication', correct: false },
      { id: 'd', text: 'DNS-based discovery is the fastest option with zero latency', correct: false },
    ],
  },
]

const registryTools = [
  { name: 'Consul', by: 'HashiCorp', desc: 'Full-featured service mesh with discovery, health checking, and KV store. Supports multi-datacenter.', color: 'text-pink-400' },
  { name: 'Eureka', by: 'Netflix', desc: 'REST-based service discovery for Java microservices. Built for AWS, AP-focused (availability over consistency).', color: 'text-red-400' },
  { name: 'etcd', by: 'CoreOS/CNCF', desc: 'Distributed key-value store used by Kubernetes for service discovery. Strong consistency via Raft.', color: 'text-blue-400' },
  { name: 'ZooKeeper', by: 'Apache', desc: 'Coordination service with strong consistency. Used by Kafka and Hadoop. Complex but battle-tested.', color: 'text-green-400' },
]

const defaultInstances = [
  { id: 1, name: 'user-svc', ip: '10.0.2.11', port: 8080, status: 'healthy', lastHeartbeat: 0 },
  { id: 2, name: 'user-svc', ip: '10.0.2.12', port: 8080, status: 'healthy', lastHeartbeat: 0 },
  { id: 3, name: 'order-svc', ip: '10.0.3.21', port: 8081, status: 'healthy', lastHeartbeat: 0 },
  { id: 4, name: 'payment-svc', ip: '10.0.4.31', port: 8082, status: 'healthy', lastHeartbeat: 0 },
]

export default function Level18({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [introPhase, setIntroPhase] = useState('static') // static, autoscaled, discoveryEnabled
  const [requestStatus, setRequestStatus] = useState('idle') // idle, failed, discovering, success
  const [newInstances, setNewInstances] = useState([])

  // Registry state
  const [registryInstances, setRegistryInstances] = useState(defaultInstances)
  const [registryHeartbeats, setRegistryHeartbeats] = useState({})
  const [nextId, setNextId] = useState(5)
  const heartbeatRef = useRef(null)

  // Patterns state
  const [discoveryMode, setDiscoveryMode] = useState('client') // client | server
  const [patternAnimStep, setPatternAnimStep] = useState(0)
  const patternTimerRef = useRef(null)

  // Health state
  const [healthInstances, setHealthInstances] = useState([
    { id: 1, name: 'Instance 1', status: 'healthy', heartbeatActive: true, requestCount: 0 },
    { id: 2, name: 'Instance 2', status: 'healthy', heartbeatActive: true, requestCount: 0 },
    { id: 3, name: 'Instance 3', status: 'healthy', heartbeatActive: true, requestCount: 0 },
    { id: 4, name: 'Instance 4', status: 'healthy', heartbeatActive: true, requestCount: 0 },
  ])
  const [healthLog, setHealthLog] = useState([])
  const [totalRequests, setTotalRequests] = useState(0)
  const [detectionTime, setDetectionTime] = useState(null)
  const healthTimerRef = useRef(null)
  const trafficRef = useRef(null)

  const sections = ['intro', 'registry', 'patterns', 'health', 'quiz']

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(heartbeatRef.current)
      clearInterval(patternTimerRef.current)
      clearInterval(healthTimerRef.current)
      clearInterval(trafficRef.current)
    }
  }, [])

  // Registry heartbeat simulation
  useEffect(() => {
    if (currentSection !== 1) return
    clearInterval(heartbeatRef.current)
    heartbeatRef.current = setInterval(() => {
      setRegistryHeartbeats(prev => {
        const next = { ...prev }
        registryInstances.forEach(inst => {
          if (inst.status === 'healthy') {
            next[inst.id] = Date.now()
          }
        })
        return next
      })
      setRegistryInstances(prev => prev.map(inst => ({
        ...inst,
        lastHeartbeat: inst.status === 'healthy' ? Date.now() : inst.lastHeartbeat,
      })))
    }, 2000)
    return () => clearInterval(heartbeatRef.current)
  }, [currentSection, registryInstances.length])

  // Health traffic simulation
  useEffect(() => {
    if (currentSection !== 3) return
    clearInterval(trafficRef.current)
    trafficRef.current = setInterval(() => {
      setHealthInstances(prev => {
        const healthy = prev.filter(i => i.status === 'healthy')
        if (healthy.length === 0) return prev
        const target = healthy[Math.floor(Math.random() * healthy.length)]
        return prev.map(i => i.id === target.id ? { ...i, requestCount: i.requestCount + 1 } : i)
      })
      setTotalRequests(prev => prev + 1)
    }, 500)
    return () => clearInterval(trafficRef.current)
  }, [currentSection])

  // ---- INTRO ACTIONS ----
  const handleAutoscale = useCallback(() => {
    setIntroPhase('autoscaled')
    setNewInstances([
      { ip: '10.0.2.45', port: 8080 },
      { ip: '10.0.2.67', port: 8080 },
    ])
    setRequestStatus('idle')
  }, [])

  const sendRequest = useCallback(() => {
    if (introPhase === 'static') {
      setRequestStatus('failed')
    } else if (introPhase === 'autoscaled') {
      setRequestStatus('failed')
    } else if (introPhase === 'discoveryEnabled') {
      setRequestStatus('discovering')
      setTimeout(() => setRequestStatus('success'), 1200)
    }
  }, [introPhase])

  const enableDiscovery = useCallback(() => {
    setIntroPhase('discoveryEnabled')
    setRequestStatus('idle')
  }, [])

  // ---- REGISTRY ACTIONS ----
  const killInstance = useCallback((id) => {
    setRegistryInstances(prev => prev.filter(inst => inst.id !== id))
  }, [])

  const spinUpInstance = useCallback(() => {
    const serviceNames = ['user-svc', 'order-svc', 'payment-svc', 'auth-svc']
    const svc = serviceNames[Math.floor(Math.random() * serviceNames.length)]
    const newInst = {
      id: nextId,
      name: svc,
      ip: `10.0.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 200) + 10}`,
      port: 8080 + Math.floor(Math.random() * 10),
      status: 'healthy',
      lastHeartbeat: Date.now(),
    }
    setRegistryInstances(prev => [...prev, newInst])
    setNextId(prev => prev + 1)
  }, [nextId])

  // ---- PATTERNS ANIMATION ----
  const runPatternAnim = useCallback(() => {
    setPatternAnimStep(0)
    clearInterval(patternTimerRef.current)
    let step = 0
    patternTimerRef.current = setInterval(() => {
      step++
      setPatternAnimStep(step)
      if (step >= 5) clearInterval(patternTimerRef.current)
    }, 800)
  }, [])

  // ---- HEALTH ACTIONS ----
  const degradeInstance = useCallback((id) => {
    setHealthInstances(prev => prev.map(i => i.id === id ? { ...i, status: 'degrading', heartbeatActive: true } : i))
    setHealthLog(prev => [...prev.slice(-6), { time: Date.now(), msg: `Instance ${id} starting to degrade...`, type: 'warning' }])
    const start = Date.now()

    setTimeout(() => {
      setHealthInstances(prev => prev.map(i => i.id === id ? { ...i, status: 'unhealthy', heartbeatActive: false } : i))
      setHealthLog(prev => [...prev.slice(-6), { time: Date.now(), msg: `Instance ${id} health check failed. Marked unhealthy.`, type: 'danger' }])
      setDetectionTime(((Date.now() - start) / 1000).toFixed(1))
    }, 3000)
  }, [])

  const recoverInstance = useCallback((id) => {
    setHealthInstances(prev => prev.map(i => i.id === id ? { ...i, status: 'recovering' } : i))
    setHealthLog(prev => [...prev.slice(-6), { time: Date.now(), msg: `Instance ${id} recovering...`, type: 'info' }])

    setTimeout(() => {
      setHealthInstances(prev => prev.map(i => i.id === id ? { ...i, status: 'healthy', heartbeatActive: true } : i))
      setHealthLog(prev => [...prev.slice(-6), { time: Date.now(), msg: `Instance ${id} healthy. Traffic resumed.`, type: 'success' }])
    }, 2000)
  }, [])

  // ---- QUIZ ----
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const statusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-quest-success'
      case 'degrading': return 'text-quest-warning'
      case 'unhealthy': return 'text-quest-danger'
      case 'recovering': return 'text-cyan-400'
      default: return 'text-quest-muted'
    }
  }

  const statusIcon = (status) => {
    switch (status) {
      case 'healthy': return <Heart size={16} className="text-quest-success fill-quest-success" />
      case 'degrading': return <Activity size={16} className="text-quest-warning" />
      case 'unhealthy': return <XCircle size={16} className="text-quest-danger" />
      case 'recovering': return <RefreshCw size={16} className="text-cyan-400 animate-spin" />
      default: return <Heart size={16} className="text-quest-muted" />
    }
  }

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
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* ============ SECTION: INTRO ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Search className="text-cyan-400" />
              The Lost Services Problem
            </h2>
            <p className="text-quest-muted mb-6">
              You spun up 5 new instances of the user service. How does the order service know about them?
              With{' '}
              <Term word="Service Discovery" definition="A mechanism that allows services to find and communicate with each other dynamically, without hardcoding network locations. Essential in cloud environments where instances are ephemeral." onLearn={learnTerm} />,
              services can find each other even as instances come and go. Without it, you're stuck with hardcoded IPs
              that break every time infrastructure changes.
            </p>

            {/* Interactive Visual: The Problem */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center">The Hardcoded IP Problem</h3>

              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Order Service */}
                <div className="flex-1">
                  <motion.div
                    className="bg-quest-surface rounded-lg p-4 border-2 border-cyan-500/50 text-center"
                    animate={requestStatus === 'failed' ? { x: [0, -5, 5, -5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Server size={28} className="mx-auto mb-2 text-cyan-400" />
                    <p className="font-semibold text-sm">Order Service</p>
                    <p className="text-xs text-quest-muted font-mono mt-1">
                      target: 10.0.1.5:8080
                    </p>
                  </motion.div>
                </div>

                {/* Arrow / Request */}
                <div className="flex-1 relative h-16 flex items-center justify-center">
                  {requestStatus === 'failed' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <XCircle size={28} className="text-quest-danger" />
                      <p className="text-xs text-quest-danger mt-1">Connection Refused!</p>
                    </motion.div>
                  )}
                  {requestStatus === 'discovering' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center"
                    >
                      <Search size={24} className="text-cyan-400 animate-pulse" />
                      <p className="text-xs text-cyan-400 mt-1">Querying Registry...</p>
                    </motion.div>
                  )}
                  {requestStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center"
                    >
                      <CheckCircle size={28} className="text-quest-success" />
                      <p className="text-xs text-quest-success mt-1">Found healthy instance!</p>
                    </motion.div>
                  )}
                  {requestStatus === 'idle' && (
                    <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                      <ArrowRight size={24} className="text-quest-muted" />
                    </motion.div>
                  )}
                </div>

                {/* Target Services */}
                <div className="flex-1 space-y-2">
                  {/* Dead instance */}
                  <motion.div
                    className={`rounded-lg p-2 border text-center text-xs ${
                      introPhase === 'static'
                        ? 'bg-quest-danger/10 border-quest-danger/50 line-through'
                        : 'bg-quest-danger/10 border-quest-danger/30 opacity-40'
                    }`}
                    animate={introPhase === 'static' ? { opacity: [0.5, 1, 0.5] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <p className="text-quest-danger">10.0.1.5 (DEAD)</p>
                  </motion.div>

                  {/* Healthy instances */}
                  {['10.0.2.11', '10.0.2.12', '10.0.2.13'].map((ip, i) => (
                    <motion.div
                      key={ip}
                      className="bg-quest-success/10 border border-quest-success/40 rounded-lg p-2 text-center text-xs"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                    >
                      <p className="text-quest-success">{ip} <Wifi size={10} className="inline" /></p>
                    </motion.div>
                  ))}

                  {/* Autoscaled instances */}
                  <AnimatePresence>
                    {newInstances.map((inst, i) => (
                      <motion.div
                        key={inst.ip}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="bg-cyan-500/10 border border-cyan-500/40 rounded-lg p-2 text-center text-xs"
                      >
                        <p className="text-cyan-400">{inst.ip} (NEW) <Zap size={10} className="inline" /></p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                {introPhase === 'static' && (
                  <>
                    <button onClick={sendRequest} className="btn-secondary text-sm px-4 py-2">
                      Send Request to 10.0.1.5
                    </button>
                    <button onClick={handleAutoscale} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                      <Zap size={14} /> Autoscale User Service
                    </button>
                  </>
                )}
                {introPhase === 'autoscaled' && (
                  <>
                    <button onClick={sendRequest} className="btn-secondary text-sm px-4 py-2">
                      Send Request (still to 10.0.1.5)
                    </button>
                    <button onClick={enableDiscovery} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                      <Search size={14} /> Enable Service Discovery
                    </button>
                  </>
                )}
                {introPhase === 'discoveryEnabled' && (
                  <button onClick={sendRequest} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                    <Search size={14} /> Send Request via Discovery
                  </button>
                )}
              </div>

              {/* Discovery Registry Appearance */}
              <AnimatePresence>
                {introPhase === 'discoveryEnabled' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Database size={18} className="text-cyan-400" />
                      <span className="font-semibold text-cyan-400">Service Registry</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {['10.0.2.11', '10.0.2.12', '10.0.2.13', ...newInstances.map(i => i.ip)].map(ip => (
                        <div key={ip} className="bg-quest-bg rounded p-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-quest-success animate-pulse" />
                          <span className="font-mono">{ip}:8080</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-quest-muted mt-2">
                      All healthy instances registered. Order Service queries registry to find them.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term word="Service Registry" definition="A database of available service instances and their network locations. Services register when they start and deregister when they stop. Other services query the registry to find available instances." onLearn={learnTerm} />{' '}
              keeps track of all running service instances and their locations. When a service needs to call another
              service, it asks the registry instead of relying on static configuration.
            </p>

            <DeepDive id="static-vs-dynamic" title="Static Config vs Dynamic Discovery" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Static Configuration</strong> worked in the monolith era: you had a handful of known servers,
                and their IPs rarely changed. You could put them in a config file and move on.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Cloud and Kubernetes changed everything.</strong> Instances are ephemeral -- they auto-scale,
                get rescheduled, move across nodes, and get new IPs every time. A Kubernetes Pod might live for 30 seconds
                or 30 days. You might have 3 instances at midnight and 300 during peak traffic.
              </p>
              <p className="text-sm text-quest-muted">
                Dynamic discovery is not optional in modern architectures. Whether it is Kubernetes DNS, Consul, or
                cloud-native solutions like AWS Cloud Map, you need a system that tracks what is running and where.
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Service Registry <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: REGISTRY ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Database className="text-cyan-400" />
              The Service Registry
            </h2>
            <p className="text-quest-muted mb-6">
              The{' '}
              <Term word="Service Registry" definition="A database of available service instances and their network locations. Services register when they start and deregister when they stop. Other services query the registry to find available instances." onLearn={learnTerm} />{' '}
              is the central brain of service discovery. Every instance registers itself on startup and sends
              periodic heartbeats. When an instance stops, it deregisters (or times out).
            </p>

            {/* Interactive Registry Table */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database size={18} className="text-cyan-400" />
                  Live Registry
                </h3>
                <div className="flex gap-2">
                  <button onClick={spinUpInstance} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
                    <ArrowUp size={12} /> Spin Up
                  </button>
                </div>
              </div>

              {/* Registry Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-quest-muted border-b border-white/10">
                      <th className="text-left py-2 px-3">Service</th>
                      <th className="text-left py-2 px-3">Instance</th>
                      <th className="text-left py-2 px-3">IP:Port</th>
                      <th className="text-left py-2 px-3">Status</th>
                      <th className="text-left py-2 px-3">Heartbeat</th>
                      <th className="text-right py-2 px-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {registryInstances.map(inst => (
                        <motion.tr
                          key={inst.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          className="border-b border-white/5"
                        >
                          <td className="py-2 px-3 font-mono text-xs">{inst.name}</td>
                          <td className="py-2 px-3 text-quest-muted text-xs">#{inst.id}</td>
                          <td className="py-2 px-3 font-mono text-xs">{inst.ip}:{inst.port}</td>
                          <td className="py-2 px-3">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-quest-success animate-pulse" />
                              <span className="text-xs text-quest-success">Healthy</span>
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <motion.span
                              key={registryHeartbeats[inst.id]}
                              initial={{ scale: 1.3, color: '#22d3ee' }}
                              animate={{ scale: 1, color: '#94a3b8' }}
                              className="text-xs"
                            >
                              <Radio size={12} className="inline mr-1" />
                              {registryHeartbeats[inst.id]
                                ? `${Math.round((Date.now() - registryHeartbeats[inst.id]) / 1000)}s ago`
                                : 'Just now'}
                            </motion.span>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <button
                              onClick={() => killInstance(inst.id)}
                              className="text-xs text-quest-danger hover:text-quest-danger/80 transition-colors px-2 py-1 rounded border border-quest-danger/30 hover:bg-quest-danger/10"
                            >
                              Kill
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {registryInstances.length === 0 && (
                <div className="text-center py-8 text-quest-muted">
                  <WifiOff size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No services registered. Spin up an instance!</p>
                </div>
              )}

              <p className="text-xs text-quest-muted mt-4 text-center">
                {registryInstances.length} instance{registryInstances.length !== 1 ? 's' : ''} registered.
                Click Kill to deregister, Spin Up to add.
              </p>
            </div>

            {/* Registration Flow Animation */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">How Registration Works</h3>
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  className="bg-quest-bg rounded-lg p-3 text-center border border-teal-500/30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Server size={24} className="mx-auto mb-1 text-teal-400" />
                  <p className="text-xs font-medium">New Service</p>
                  <p className="text-xs text-quest-muted">Starting up...</p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight size={20} className="text-cyan-400" />
                  <p className="text-[10px] text-cyan-400">POST /register</p>
                </motion.div>

                <div className="bg-cyan-500/10 border-2 border-cyan-500/50 rounded-lg p-3 text-center">
                  <Database size={24} className="mx-auto mb-1 text-cyan-400" />
                  <p className="text-xs font-bold text-cyan-400">Registry</p>
                </div>

                <motion.div
                  className="flex flex-col items-center gap-1"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                >
                  <ArrowRight size={20} className="text-quest-success rotate-180" />
                  <p className="text-[10px] text-quest-success">ACK + TTL</p>
                </motion.div>

                <motion.div
                  className="bg-quest-bg rounded-lg p-3 text-center border border-quest-success/30"
                  animate={{ borderColor: ['rgba(34,197,94,0.3)', 'rgba(34,197,94,0.7)', 'rgba(34,197,94,0.3)'] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Server size={24} className="mx-auto mb-1 text-quest-success" />
                  <p className="text-xs font-medium">Registered!</p>
                  <p className="text-[10px] text-quest-muted">Sending heartbeats</p>
                </motion.div>
              </div>
            </div>

            {/* Comparison Cards */}
            <h3 className="font-semibold mb-3">
              <Term word="Consul" definition="A service mesh and service discovery tool by HashiCorp. Provides health checking, KV store, and multi-datacenter support. Used widely in cloud-native architectures." onLearn={learnTerm} />{' '}
              vs{' '}
              <Term word="Eureka" definition="Netflix's REST-based service discovery server. Designed for AWS, favors availability over consistency (AP system). Popular in Spring Cloud microservices." onLearn={learnTerm} />{' '}
              vs etcd vs ZooKeeper
            </h3>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {registryTools.map(tool => (
                <div key={tool.name} className="bg-quest-bg rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-bold ${tool.color}`}>{tool.name}</span>
                    <span className="text-xs text-quest-muted">{tool.by}</span>
                  </div>
                  <p className="text-xs text-quest-muted">{tool.desc}</p>
                </div>
              ))}
            </div>

            <DeepDive id="registry-consistency" title="Consistency in Service Registry" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The Stale Registry Problem:</strong> What if the registry says Instance A is healthy, but it
                crashed 2 seconds ago? Your request fails. Health check intervals create a window of staleness.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>TTL (Time To Live):</strong> Each registration has an expiry. If a service fails to renew
                before the TTL, it is automatically removed. Typical TTLs: 10-30 seconds.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Eureka's approach (AP):</strong> Favors availability. If the registry loses contact with
                instances, it enters "self-preservation mode" and keeps stale entries rather than removing potentially
                healthy ones. Better to route to a possibly-dead instance than to have no instances at all.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>ZooKeeper/etcd (CP):</strong> Favor consistency. Uses consensus (Raft/ZAB) to ensure all
                nodes agree on the state. Slower writes, but you can trust the data. The tradeoff: during network
                partitions, the registry may become temporarily unavailable.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Discovery Patterns <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: PATTERNS ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Network className="text-cyan-400" />
              <Term word="Client-Side vs Server-Side" definition="Two main patterns for service discovery. Client-side: the client queries the registry and picks an instance. Server-side: a load balancer handles registry lookup and routing transparently." onLearn={learnTerm} />{' '}
              Discovery
            </h2>
            <p className="text-quest-muted mb-6">
              There are two fundamental ways a service can find another service. Each has tradeoffs
              around complexity, performance, and flexibility.
            </p>

            {/* Mode Toggle */}
            <div className="flex justify-center mb-6">
              <div className="bg-quest-bg rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => { setDiscoveryMode('client'); setPatternAnimStep(0) }}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    discoveryMode === 'client' ? 'bg-cyan-500 text-quest-bg' : 'text-quest-muted hover:text-quest-text'
                  }`}
                >
                  Client-Side
                </button>
                <button
                  onClick={() => { setDiscoveryMode('server'); setPatternAnimStep(0) }}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    discoveryMode === 'server' ? 'bg-teal-500 text-quest-bg' : 'text-quest-muted hover:text-quest-text'
                  }`}
                >
                  Server-Side
                </button>
              </div>
            </div>

            {/* Client-Side Discovery Visual */}
            {discoveryMode === 'client' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-quest-bg rounded-xl p-6 mb-6"
              >
                <h3 className="font-semibold mb-4 text-center text-cyan-400">Client-Side Discovery</h3>
                <div className="flex items-start justify-between gap-3">
                  {/* Client */}
                  <div className="flex-1 text-center">
                    <motion.div
                      className={`bg-quest-surface rounded-lg p-3 border-2 ${patternAnimStep >= 1 ? 'border-cyan-500' : 'border-white/10'}`}
                      animate={patternAnimStep === 0 ? { scale: [1, 1.03, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Globe size={28} className="mx-auto mb-1 text-cyan-400" />
                      <p className="text-xs font-bold">Client Service</p>
                      <p className="text-[10px] text-quest-muted">Has discovery logic</p>
                    </motion.div>
                    {patternAnimStep >= 3 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-quest-success mt-2"
                      >
                        Picks Instance #2
                      </motion.p>
                    )}
                  </div>

                  {/* Step 1: Query Registry */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 pt-4">
                    <motion.div
                      className={`text-xs px-2 py-1 rounded ${patternAnimStep >= 1 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-quest-muted'}`}
                      animate={patternAnimStep === 1 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      1. Get instances
                    </motion.div>
                    <ArrowRight size={16} className={patternAnimStep >= 1 ? 'text-cyan-400' : 'text-quest-muted'} />
                    <motion.div
                      className={`text-xs px-2 py-1 rounded ${patternAnimStep >= 2 ? 'bg-quest-success/20 text-quest-success' : 'bg-white/5 text-quest-muted'}`}
                    >
                      2. Returns list
                    </motion.div>
                    <ArrowRight size={16} className={`rotate-180 ${patternAnimStep >= 2 ? 'text-quest-success' : 'text-quest-muted'}`} />
                  </div>

                  {/* Registry */}
                  <div className="flex-1 text-center">
                    <motion.div
                      className={`bg-cyan-500/10 border-2 rounded-lg p-3 ${patternAnimStep >= 1 ? 'border-cyan-500' : 'border-cyan-500/30'}`}
                      animate={patternAnimStep === 1 || patternAnimStep === 2 ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      <Database size={28} className="mx-auto mb-1 text-cyan-400" />
                      <p className="text-xs font-bold text-cyan-400">Registry</p>
                    </motion.div>
                  </div>

                  {/* Step 3: Direct Call */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 pt-4">
                    <motion.div
                      className={`text-xs px-2 py-1 rounded ${patternAnimStep >= 4 ? 'bg-quest-success/20 text-quest-success' : 'bg-white/5 text-quest-muted'}`}
                    >
                      3. Direct call
                    </motion.div>
                    <ArrowRight size={16} className={patternAnimStep >= 4 ? 'text-quest-success' : 'text-quest-muted'} />
                  </div>

                  {/* Instances */}
                  <div className="flex-1 space-y-2">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        className={`rounded-lg p-2 text-center text-xs border ${
                          patternAnimStep >= 4 && i === 2
                            ? 'bg-quest-success/20 border-quest-success'
                            : 'bg-quest-surface border-white/10'
                        }`}
                        animate={patternAnimStep >= 4 && i === 2 ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Server size={14} className="mx-auto mb-0.5" />
                        Instance #{i}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button onClick={runPatternAnim} className="btn-primary text-sm px-6 py-2">
                    Animate Request Flow
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-quest-success mb-1">Pros</p>
                    <ul className="text-xs text-quest-muted space-y-1">
                      <li>Client can use smart routing (latency-based, round-robin)</li>
                      <li>No extra network hop</li>
                      <li>Client caches instances for resilience</li>
                    </ul>
                  </div>
                  <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-quest-danger mb-1">Cons</p>
                    <ul className="text-xs text-quest-muted space-y-1">
                      <li>Every client needs discovery logic</li>
                      <li>Coupling between client and registry</li>
                      <li>Language-specific client libraries needed</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Server-Side Discovery Visual */}
            {discoveryMode === 'server' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-quest-bg rounded-xl p-6 mb-6"
              >
                <h3 className="font-semibold mb-4 text-center text-teal-400">Server-Side Discovery</h3>
                <div className="flex items-start justify-between gap-3">
                  {/* Client */}
                  <div className="flex-1 text-center">
                    <motion.div
                      className={`bg-quest-surface rounded-lg p-3 border-2 ${patternAnimStep >= 1 ? 'border-teal-500' : 'border-white/10'}`}
                    >
                      <Globe size={28} className="mx-auto mb-1 text-teal-400" />
                      <p className="text-xs font-bold">Client Service</p>
                      <p className="text-[10px] text-quest-muted">Simple, no discovery logic</p>
                    </motion.div>
                  </div>

                  {/* Step 1: Call LB */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 pt-4">
                    <motion.div
                      className={`text-xs px-2 py-1 rounded ${patternAnimStep >= 1 ? 'bg-teal-500/20 text-teal-400' : 'bg-white/5 text-quest-muted'}`}
                    >
                      1. Call LB
                    </motion.div>
                    <ArrowRight size={16} className={patternAnimStep >= 1 ? 'text-teal-400' : 'text-quest-muted'} />
                  </div>

                  {/* Load Balancer */}
                  <div className="flex-1 text-center">
                    <motion.div
                      className={`bg-teal-500/10 border-2 rounded-lg p-3 ${patternAnimStep >= 1 ? 'border-teal-500' : 'border-teal-500/30'}`}
                      animate={patternAnimStep >= 1 && patternAnimStep <= 3 ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                    >
                      <Shield size={28} className="mx-auto mb-1 text-teal-400" />
                      <p className="text-xs font-bold text-teal-400">Load Balancer</p>
                      <p className="text-[10px] text-quest-muted">
                        {patternAnimStep >= 2 ? 'Querying registry...' : 'Router / Proxy'}
                      </p>
                    </motion.div>
                    {patternAnimStep >= 2 && patternAnimStep < 4 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="mt-1 text-[10px] text-cyan-400"
                      >
                        <ArrowDown size={12} className="mx-auto" />
                        Registry lookup
                      </motion.div>
                    )}
                  </div>

                  {/* Step 3: Forward */}
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 pt-4">
                    <motion.div
                      className={`text-xs px-2 py-1 rounded ${patternAnimStep >= 4 ? 'bg-quest-success/20 text-quest-success' : 'bg-white/5 text-quest-muted'}`}
                    >
                      3. Forward
                    </motion.div>
                    <ArrowRight size={16} className={patternAnimStep >= 4 ? 'text-quest-success' : 'text-quest-muted'} />
                  </div>

                  {/* Instances */}
                  <div className="flex-1 space-y-2">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        className={`rounded-lg p-2 text-center text-xs border ${
                          patternAnimStep >= 4 && i === 1
                            ? 'bg-quest-success/20 border-quest-success'
                            : 'bg-quest-surface border-white/10'
                        }`}
                        animate={patternAnimStep >= 4 && i === 1 ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Server size={14} className="mx-auto mb-0.5" />
                        Instance #{i}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button onClick={runPatternAnim} className="btn-primary text-sm px-6 py-2">
                    Animate Request Flow
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-quest-success mb-1">Pros</p>
                    <ul className="text-xs text-quest-muted space-y-1">
                      <li>Clients are simple -- no discovery logic</li>
                      <li>Language-agnostic (any client works)</li>
                      <li>Centralized routing policies</li>
                    </ul>
                  </div>
                  <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-quest-danger mb-1">Cons</p>
                    <ul className="text-xs text-quest-muted space-y-1">
                      <li>Extra network hop (higher latency)</li>
                      <li>Load balancer is a potential bottleneck</li>
                      <li>Must manage LB availability</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* DNS-Based Discovery */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Globe size={18} className="text-teal-400" />
                <Term word="DNS-Based Discovery" definition="Service discovery using DNS resolution. Service names resolve to IP addresses through a DNS server (like CoreDNS in Kubernetes). Simple and requires no client library, but has TTL-based caching limitations." onLearn={learnTerm} />
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                The simplest form of discovery: service names resolve to IPs via DNS. In Kubernetes, every
                Service gets a DNS entry automatically.
              </p>

              {/* Kubernetes DNS Flow */}
              <div className="bg-quest-bg rounded-lg p-4">
                <h4 className="text-xs font-semibold text-quest-muted mb-3 uppercase tracking-wider">Kubernetes Service Discovery Flow</h4>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  {[
                    { icon: <Server size={20} />, label: 'Pod A', sub: 'curl user-svc', color: 'text-cyan-400' },
                    { icon: <ArrowRight size={16} />, label: '', sub: 'DNS Query', color: 'text-quest-muted' },
                    { icon: <Globe size={20} />, label: 'kube-dns', sub: 'CoreDNS', color: 'text-teal-400' },
                    { icon: <ArrowRight size={16} />, label: '', sub: 'Resolves', color: 'text-quest-muted' },
                    { icon: <Database size={20} />, label: 'Service', sub: 'user-svc ClusterIP', color: 'text-yellow-400' },
                    { icon: <ArrowRight size={16} />, label: '', sub: 'Routes to', color: 'text-quest-muted' },
                    { icon: <Server size={20} />, label: 'Pod B', sub: '10.0.2.45:8080', color: 'text-quest-success' },
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      className="text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <div className={step.color}>{step.icon}</div>
                      {step.label && <p className="text-xs font-semibold mt-1">{step.label}</p>}
                      <p className="text-[10px] text-quest-muted">{step.sub}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 font-mono text-xs bg-quest-surface rounded p-3">
                  <p className="text-quest-muted"># In Kubernetes, service names just work as hostnames:</p>
                  <p className="text-cyan-400">curl http://<span className="text-quest-success">user-svc</span>:8080/api/users</p>
                  <p className="text-quest-muted mt-1"># Full DNS name:</p>
                  <p className="text-cyan-400">user-svc.<span className="text-teal-400">default</span>.<span className="text-yellow-400">svc</span>.<span className="text-pink-400">cluster.local</span></p>
                </div>
              </div>
            </div>

            <DeepDive id="service-mesh-discovery" title="Service Mesh and Discovery" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Service Mesh</strong> (Istio, Linkerd) takes discovery further by injecting a sidecar proxy
                (like Envoy) alongside every service instance. The sidecar handles all networking: discovery, load
                balancing, retries, circuit breaking, and mTLS.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Envoy Sidecar Pattern:</strong> Your service talks to localhost. Envoy intercepts the call,
                resolves the target via the control plane (Istio Pilot), picks a healthy instance, and forwards the
                request. Your application code has zero awareness of service discovery.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>The tradeoff:</strong> Service meshes add operational complexity and resource overhead (every
                pod gets a sidecar), but they make service discovery, observability, and security almost transparent
                to application developers.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Health Checks <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: HEALTH ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Heart className="text-cyan-400" />
              Health Checks & Failover
            </h2>
            <p className="text-quest-muted mb-6">
              Discovery only works if the registry knows which instances are actually healthy.
              Health checks are the heartbeat of the system -- when they stop, the registry
              removes the instance from rotation.
            </p>

            {/* Instance Cards with Health Simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity size={18} className="text-cyan-400" />
                Live Instance Health
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {healthInstances.map(inst => (
                  <motion.div
                    key={inst.id}
                    className={`rounded-lg p-4 border-2 text-center transition-all ${
                      inst.status === 'healthy' ? 'border-quest-success/50 bg-quest-success/5' :
                      inst.status === 'degrading' ? 'border-quest-warning/50 bg-quest-warning/5' :
                      inst.status === 'unhealthy' ? 'border-quest-danger/50 bg-quest-danger/5' :
                      'border-cyan-500/50 bg-cyan-500/5'
                    }`}
                    animate={inst.status === 'degrading' ? { scale: [1, 0.97, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    {/* Health Icon */}
                    <div className="flex justify-center mb-2">
                      {statusIcon(inst.status)}
                    </div>
                    <p className="text-sm font-semibold">{inst.name}</p>
                    <p className={`text-xs capitalize ${statusColor(inst.status)}`}>{inst.status}</p>

                    {/* Heartbeat Pulse */}
                    {inst.heartbeatActive && (
                      <motion.div
                        className="mt-2 flex justify-center"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <Radio size={12} className="text-quest-success" />
                      </motion.div>
                    )}
                    {!inst.heartbeatActive && inst.status === 'unhealthy' && (
                      <div className="mt-2 flex justify-center">
                        <WifiOff size={12} className="text-quest-danger" />
                      </div>
                    )}

                    {/* Request Count */}
                    <p className="text-[10px] text-quest-muted mt-1">
                      {inst.status === 'unhealthy' ? 'No traffic' : `${inst.requestCount} requests`}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-3">
                      {inst.status === 'healthy' && (
                        <button
                          onClick={() => degradeInstance(inst.id)}
                          className="text-[10px] px-2 py-1 rounded border border-quest-warning/40 text-quest-warning hover:bg-quest-warning/10 transition-colors"
                        >
                          Degrade
                        </button>
                      )}
                      {(inst.status === 'unhealthy') && (
                        <button
                          onClick={() => recoverInstance(inst.id)}
                          className="text-[10px] px-2 py-1 rounded border border-quest-success/40 text-quest-success hover:bg-quest-success/10 transition-colors"
                        >
                          Recover
                        </button>
                      )}
                      {inst.status === 'degrading' && (
                        <span className="text-[10px] text-quest-warning animate-pulse">Failing...</span>
                      )}
                      {inst.status === 'recovering' && (
                        <span className="text-[10px] text-cyan-400 animate-pulse">Recovering...</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Monitoring Panel */}
              <div className="grid md:grid-cols-3 gap-3 mb-4">
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Total Requests</p>
                  <p className="text-xl font-bold">{totalRequests}</p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Healthy Instances</p>
                  <p className="text-xl font-bold text-quest-success">
                    {healthInstances.filter(i => i.status === 'healthy').length}
                    <span className="text-sm text-quest-muted"> / {healthInstances.length}</span>
                  </p>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 text-center">
                  <p className="text-xs text-quest-muted">Detection Time</p>
                  <p className="text-xl font-bold text-quest-warning">
                    {detectionTime ? `${detectionTime}s` : '--'}
                  </p>
                </div>
              </div>

              {/* Request Distribution Bar */}
              <div className="bg-quest-surface rounded-lg p-3 mb-4">
                <p className="text-xs text-quest-muted mb-2">Request Distribution</p>
                <div className="flex gap-1 h-6">
                  {healthInstances.map(inst => {
                    const total = healthInstances.reduce((s, i) => s + i.requestCount, 0) || 1
                    const pct = (inst.requestCount / total) * 100
                    return (
                      <motion.div
                        key={inst.id}
                        className={`rounded ${
                          inst.status === 'healthy' ? 'bg-quest-success/60' :
                          inst.status === 'degrading' ? 'bg-quest-warning/60' :
                          inst.status === 'unhealthy' ? 'bg-quest-danger/30' : 'bg-cyan-500/60'
                        }`}
                        animate={{ width: `${Math.max(pct, 2)}%` }}
                        transition={{ duration: 0.3 }}
                        title={`${inst.name}: ${inst.requestCount} requests (${pct.toFixed(1)}%)`}
                      />
                    )
                  })}
                </div>
                <div className="flex justify-between mt-1">
                  {healthInstances.map(inst => (
                    <span key={inst.id} className="text-[9px] text-quest-muted">
                      #{inst.id}: {inst.requestCount}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Log */}
              <div className="bg-quest-bg rounded-lg p-3 max-h-40 overflow-y-auto">
                <p className="text-xs text-quest-muted mb-2 flex items-center gap-1">
                  <Eye size={12} /> Event Log
                </p>
                {healthLog.length === 0 ? (
                  <p className="text-xs text-quest-muted italic">Click "Degrade" on an instance to see health check events.</p>
                ) : (
                  <div className="space-y-1">
                    {healthLog.map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-xs flex items-start gap-2 ${
                          log.type === 'danger' ? 'text-quest-danger' :
                          log.type === 'warning' ? 'text-quest-warning' :
                          log.type === 'success' ? 'text-quest-success' : 'text-cyan-400'
                        }`}
                      >
                        <span className="text-quest-muted flex-shrink-0">
                          {new Date(log.time).toLocaleTimeString()}
                        </span>
                        <span>{log.msg}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Health Check Types */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Health Check Types</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { type: 'HTTP Endpoint', desc: 'GET /health returns 200 OK. Most common. Can include dependency status.', example: '{ "status": "UP", "db": "OK", "redis": "OK" }', icon: <Globe size={16} className="text-cyan-400" /> },
                  { type: 'TCP Check', desc: 'Attempts TCP connection. If port is open, instance is healthy. Simple but shallow.', example: 'tcp-connect 10.0.2.11:8080 → SUCCESS', icon: <Wifi size={16} className="text-teal-400" /> },
                  { type: 'gRPC Health', desc: 'Uses the standard gRPC Health Checking Protocol. Checks specific service readiness.', example: 'grpc_health_probe -addr=:8080 → SERVING', icon: <Zap size={16} className="text-yellow-400" /> },
                  { type: 'Script-Based', desc: 'Runs a custom script. Flexible but slower. Exit code 0 = healthy.', example: './check_dependencies.sh → exit 0', icon: <Activity size={16} className="text-pink-400" /> },
                ].map(check => (
                  <div key={check.type} className="bg-quest-bg rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {check.icon}
                      <span className="font-semibold text-sm">{check.type}</span>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">{check.desc}</p>
                    <div className="font-mono text-[10px] bg-quest-surface rounded p-2 text-quest-muted">
                      {check.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graceful vs Ungraceful Shutdown */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Graceful vs Ungraceful Shutdown</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-success/5 border border-quest-success/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-quest-success mb-2">Graceful Shutdown</h4>
                  <div className="space-y-2">
                    {['Receive SIGTERM', 'Stop accepting new requests', 'Finish in-flight requests', 'Send DEREGISTER to registry', 'Exit cleanly'].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-xs text-quest-muted"
                      >
                        <CheckCircle size={12} className="text-quest-success flex-shrink-0" />
                        {step}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-quest-success mt-2">Instant removal from registry. Zero failed requests.</p>
                </div>
                <div className="bg-quest-danger/5 border border-quest-danger/30 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-quest-danger mb-2">Ungraceful Crash</h4>
                  <div className="space-y-2">
                    {['Instance crashes/OOM killed', 'No deregister sent', 'Registry still shows "healthy"', 'Requests fail until timeout', `After TTL (${'\u007E'}30s): marked unhealthy`].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-2 text-xs text-quest-muted"
                      >
                        <XCircle size={12} className="text-quest-danger flex-shrink-0" />
                        {step}
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-[10px] text-quest-danger mt-2">Requests fail during the detection window.</p>
                </div>
              </div>
            </div>

            <DeepDive id="cascading-health-checks" title="Cascading Failures from Bad Health Checks" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Too aggressive (1s interval, 1 failure = unhealthy):</strong> Network blips or GC pauses
                cause "flapping" -- instances rapidly toggling between healthy and unhealthy. The registry is constantly
                changing, causing clients to get inconsistent views. Traffic oscillates wildly.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Too lenient (60s interval, 5 failures = unhealthy):</strong> A crashed instance continues
                receiving traffic for up to 5 minutes. Users see errors. Retries amplify the problem.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The sweet spot:</strong> Most systems use 10-30 second intervals with 2-3 consecutive failures
                before marking unhealthy. Combined with client-side retry logic and circuit breakers, this gives
                reasonable detection time without flapping.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Dependency health checks:</strong> If your /health endpoint checks the database and the DB
                is down, ALL your instances report unhealthy simultaneously. The registry removes them all. Now you
                have zero instances. Consider separating liveness (is the process running?) from readiness (can it
                serve requests?).
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: QUIZ ============ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Shield className="text-cyan-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Service discovery is the nervous system of microservices. Let's verify you understand
              how services find each other and stay healthy!
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
                          className={`w-full text-left p-3 rounded-lg border transition-all
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
                <h3 className="text-xl font-bold mb-2">Level 18 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how services find each other in dynamic environments -- from registries
                  and discovery patterns to health checks and failover strategies.
                </p>
                <p className="text-sm text-quest-primary">
                  Your microservices will never be lost again. They always know where their friends are.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

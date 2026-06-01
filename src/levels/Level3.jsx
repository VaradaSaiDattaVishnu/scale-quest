import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, RotateCcw, ArrowRight, Server, Shuffle,
  CheckCircle, XCircle, Activity, Heart,
  HelpCircle, ChevronDown, ChevronUp, Zap, Users, Circle
} from 'lucide-react'

// Reusable components
function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })
  const termRef = useRef(null)

  const handleMouseEnter = () => {
    if (termRef.current) {
      const rect = termRef.current.getBoundingClientRect()
      setTooltipPos({
        top: rect.top - 8, // Position above the term
        left: rect.left + rect.width / 2
      })
    }
    setShowTooltip(true)
    onLearn?.(word)
  }

  return (
    <span className="relative inline-block">
      <span
        ref={termRef}
        className="term cursor-pointer"
        onMouseEnter={handleMouseEnter}
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
            style={{ top: tooltipPos.top, left: tooltipPos.left }}
            className="tooltip fixed -translate-x-1/2 -translate-y-full w-64 p-3 z-[100]"
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
    <div className="bg-quest-surface/50 rounded-lg border border-quest-secondary/30 my-6">
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
            className="px-4 pb-4 overflow-hidden"
          >
            <div className="pt-2 border-t border-white/5 overflow-visible">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Level3({ onComplete, learnTerm, markDeepDiveRead, unlockAchievement }) {
  // Changed section order: intro → algorithms → simulation → health → quiz
  const sections = ['intro', 'algorithms', 'simulation', 'health', 'side quest', 'quiz']
  const [currentSection, setCurrentSection] = useState(0)

  // Simulation state
  const [isRunning, setIsRunning] = useState(false)
  const [algorithm, setAlgorithm] = useState('round-robin')
  const [requestRate, setRequestRate] = useState(2)
  const [roundRobinIndex, setRoundRobinIndex] = useState(0)
  const [requestLog, setRequestLog] = useState([]) // Shows which server got each request

  const [servers, setServers] = useState([
    { id: 1, connections: 0, maxConnections: 10, healthy: true, totalRequests: 0 },
    { id: 2, connections: 0, maxConnections: 10, healthy: true, totalRequests: 0 },
    { id: 3, connections: 0, maxConnections: 10, healthy: true, totalRequests: 0 },
    { id: 4, connections: 0, maxConnections: 10, healthy: true, totalRequests: 0 },
  ])

  const [stats, setStats] = useState({
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
  })

  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Algorithm descriptions for the simulation
  const algorithmInfo = {
    'round-robin': {
      name: 'Round Robin',
      desc: 'Each server takes a turn, in order: 1 → 2 → 3 → 4 → 1 → ...'
    },
    'least-connections': {
      name: 'Least Connections',
      desc: 'Always picks the server with fewest active connections'
    },
    'random': {
      name: 'Random',
      desc: 'Randomly picks any healthy server'
    }
  }

  // Select server based on algorithm
  const selectServer = useCallback(() => {
    const healthyServers = servers.filter(s => s.healthy)
    if (healthyServers.length === 0) return null

    switch (algorithm) {
      case 'round-robin': {
        const server = healthyServers[roundRobinIndex % healthyServers.length]
        setRoundRobinIndex(prev => prev + 1)
        return server
      }
      case 'least-connections': {
        return healthyServers.reduce((min, s) =>
          s.connections < min.connections ? s : min
        )
      }
      case 'random': {
        return healthyServers[Math.floor(Math.random() * healthyServers.length)]
      }
      default:
        return healthyServers[0]
    }
  }, [servers, algorithm, roundRobinIndex])

  // Send a request
  const sendRequest = useCallback(() => {
    const targetServer = selectServer()

    if (!targetServer) {
      setStats(prev => ({
        ...prev,
        totalRequests: prev.totalRequests + 1,
        failedRequests: prev.failedRequests + 1
      }))
      setRequestLog(prev => [...prev.slice(-9), { serverId: null, failed: true, time: Date.now() }])
      return
    }

    // Add connection to server
    setServers(prev =>
      prev.map(s =>
        s.id === targetServer.id
          ? { ...s, connections: s.connections + 1, totalRequests: s.totalRequests + 1 }
          : s
      )
    )

    setStats(prev => ({
      ...prev,
      totalRequests: prev.totalRequests + 1,
      successfulRequests: prev.successfulRequests + 1
    }))

    setRequestLog(prev => [...prev.slice(-9), { serverId: targetServer.id, failed: false, time: Date.now() }])

    // Connection completes after random time (500-1500ms)
    const completionTime = 500 + Math.random() * 1000
    setTimeout(() => {
      setServers(prev =>
        prev.map(s =>
          s.id === targetServer.id
            ? { ...s, connections: Math.max(0, s.connections - 1) }
            : s
        )
      )
    }, completionTime)
  }, [selectServer])

  // Auto-send requests when running
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(sendRequest, 1000 / requestRate)
    return () => clearInterval(interval)
  }, [isRunning, requestRate, sendRequest])

  // Toggle server health
  const toggleServerHealth = (serverId) => {
    setServers(prev =>
      prev.map(s =>
        s.id === serverId ? { ...s, healthy: !s.healthy, connections: 0 } : s
      )
    )
  }

  // Reset simulation
  const resetSimulation = () => {
    setIsRunning(false)
    setServers(prev => prev.map(s => ({ ...s, connections: 0, healthy: true, totalRequests: 0 })))
    setStats({ totalRequests: 0, successfulRequests: 0, failedRequests: 0 })
    setRoundRobinIndex(0)
    setRequestLog([])
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the main purpose of a load balancer?',
      options: [
        { id: 'a', text: 'To make servers faster', correct: false },
        { id: 'b', text: 'To distribute traffic across multiple servers', correct: true },
        { id: 'c', text: 'To store data', correct: false },
        { id: 'd', text: 'To encrypt traffic', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'Which algorithm is best when servers have different processing speeds?',
      options: [
        { id: 'a', text: 'Round Robin', correct: false },
        { id: 'b', text: 'Random', correct: false },
        { id: 'c', text: 'Least Connections', correct: true },
        { id: 'd', text: 'IP Hash', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'Why would you use IP Hash load balancing?',
      options: [
        { id: 'a', text: 'For best performance', correct: false },
        { id: 'b', text: 'To ensure a user always hits the same server (session persistence)', correct: true },
        { id: 'c', text: 'For security', correct: false },
        { id: 'd', text: 'To reduce costs', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What happens when a health check detects a failed server?',
      options: [
        { id: 'a', text: 'It restarts the server', correct: false },
        { id: 'b', text: 'It sends more traffic to that server', correct: false },
        { id: 'c', text: 'It stops sending traffic to that server', correct: true },
        { id: 'd', text: 'It shuts down all servers', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    unlockAchievement?.('load_balance')
    onComplete?.()
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

      {/* SECTION 1: INTRO */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🚦 The Traffic Cop</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "You now have 4 servers running. Great! But there's a problem—users' browsers
                only know one IP address. When someone types your URL, which server do they talk to?
                All 4 can't share the same address..."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              This is where the{' '}
              <Term
                word="Load Balancer"
                definition="A device or software that distributes incoming network traffic across multiple servers. It's the single entry point that routes requests to healthy backend servers."
                onLearn={learnTerm}
              />{' '}
              comes in. Think of it as a traffic cop standing at an intersection, directing cars
              (requests) to different lanes (servers) to prevent traffic jams.
            </p>

            {/* Visual diagram */}
            <div className="bg-quest-surface rounded-xl p-6 my-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="text-quest-warning" />
                How It Works
              </h3>

              <div className="flex items-center justify-between gap-4">
                <div className="text-center">
                  <Users size={40} className="mx-auto text-quest-primary mb-2" />
                  <p className="text-sm font-medium">Users</p>
                  <p className="text-xs text-quest-muted">Many requests</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-quest-primary to-quest-secondary"></div>
                  <ArrowRight className="text-quest-secondary mx-2" />
                </div>

                <div className="text-center bg-quest-secondary/20 px-6 py-4 rounded-xl border-2 border-quest-secondary">
                  <Shuffle size={36} className="mx-auto text-quest-secondary mb-2" />
                  <p className="text-sm font-medium">Load Balancer</p>
                  <p className="text-xs text-quest-muted">Single entry point</p>
                </div>

                <div className="flex-1 flex items-center justify-center">
                  <ArrowRight className="text-quest-success mx-2" />
                  <div className="h-0.5 flex-1 bg-gradient-to-r from-quest-secondary to-quest-success"></div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="flex items-center gap-1 bg-quest-bg px-2 py-1 rounded">
                      <Server size={16} className="text-quest-success" />
                      <span className="text-xs">S{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-2">What Load Balancers Do</h4>
                <ul className="text-sm space-y-1 text-quest-muted">
                  <li>✓ Distribute traffic across servers</li>
                  <li>✓ Detect unhealthy servers</li>
                  <li>✓ Provide a single entry point</li>
                  <li>✓ Enable zero-downtime deployments</li>
                </ul>
              </div>
              <div className="bg-quest-primary/10 rounded-lg p-4 border border-quest-primary/30">
                <h4 className="font-semibold text-quest-primary mb-2">Popular Load Balancers</h4>
                <ul className="text-sm space-y-1 text-quest-muted">
                  <li>• NGINX (software)</li>
                  <li>• HAProxy (software)</li>
                  <li>• AWS ALB/ELB (cloud)</li>
                  <li>• Cloudflare (edge)</li>
                </ul>
              </div>
            </div>

            <DeepDive id="lb-layers" title="Layer 4 vs Layer 7 Load Balancing" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Load balancers operate at different "layers" of the network stack:
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Layer 4 (Transport)</strong>: Routes based on IP and port. Super fast because
                it doesn't inspect the content. Good for raw TCP/UDP traffic.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Layer 7 (Application)</strong>: Can look inside HTTP requests. Route based on
                URL path, headers, cookies, etc. More flexible but slightly slower. Most web
                applications use Layer 7.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Learn the Algorithms
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 2: ALGORITHMS - Now comes BEFORE simulation */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🧮 Load Balancing Algorithms</h2>

            <p className="text-quest-muted mb-6">
              How does the load balancer decide which server gets the next request?
              There are several strategies, each with tradeoffs. <strong>Learn these first,
              then try them in the simulation!</strong>
            </p>

            <div className="space-y-6">
              {/* Round Robin */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  <Term
                    word="Round Robin"
                    definition="Requests are distributed sequentially across servers. Server 1, then Server 2, then Server 3, then back to Server 1."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted mb-4">
                  The simplest algorithm. Like dealing cards—each server gets a turn, then repeat.
                </p>

                {/* Visual example */}
                <div className="bg-quest-bg rounded-lg p-4 mb-4">
                  <p className="text-xs text-quest-muted mb-3">Request distribution order:</p>
                  <div className="flex gap-2 flex-wrap">
                    {['S1', 'S2', 'S3', 'S4', 'S1', 'S2', 'S3', 'S4', '...'].map((s, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono
                          ${s === '...' ? 'bg-transparent text-quest-muted' : 'bg-quest-primary/20 text-quest-primary'}`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Simple & predictable</span>
                  <span className="text-quest-danger">✗ Ignores server load</span>
                </div>
              </div>

              {/* Least Connections */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <Term
                    word="Least Connections"
                    definition="New requests go to the server with the fewest active connections. Adapts to server load in real-time."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted mb-4">
                  Smart! If Server 1 is handling a slow request, new requests go to less busy servers.
                </p>

                {/* Visual example */}
                <div className="bg-quest-bg rounded-lg p-4 mb-4">
                  <p className="text-xs text-quest-muted mb-3">Next request goes to server with fewest connections:</p>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 1, conn: 5 },
                      { id: 2, conn: 2 },
                      { id: 3, conn: 8 },
                      { id: 4, conn: 3 }
                    ].map(s => (
                      <div
                        key={s.id}
                        className={`p-3 rounded-lg text-center ${s.conn === 2 ? 'bg-quest-success/20 ring-2 ring-quest-success' : 'bg-quest-surface'}`}
                      >
                        <p className="text-xs text-quest-muted">Server {s.id}</p>
                        <p className="text-xl font-mono font-bold">{s.conn}</p>
                        <p className="text-xs text-quest-muted">connections</p>
                        {s.conn === 2 && <p className="text-xs text-quest-success mt-1">← Next!</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Adapts to load</span>
                  <span className="text-quest-success">✓ Great for varying request times</span>
                </div>
              </div>

              {/* IP Hash */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">#️⃣</span>
                  <Term
                    word="IP Hash"
                    definition="The client's IP address is hashed to determine which server to use. Same IP always goes to the same server."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted mb-4">
                  Uses the user's IP address to consistently route them to the same server.
                  Essential for{' '}
                  <Term
                    word="sticky sessions"
                    definition="Ensuring a user's requests always go to the same server. Needed when session data is stored on the server."
                    onLearn={learnTerm}
                  />.
                </p>

                <div className="bg-quest-bg rounded-lg p-4 mb-4 font-mono text-sm">
                  <p className="text-quest-muted">// Same user always hits same server</p>
                  <p>User A (192.168.1.100) → hash → <span className="text-quest-primary font-bold">Server 2</span> (always)</p>
                  <p>User B (192.168.1.101) → hash → <span className="text-quest-secondary font-bold">Server 4</span> (always)</p>
                  <p>User A again → hash → <span className="text-quest-primary font-bold">Server 2</span> (still!)</p>
                </div>

                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Session persistence</span>
                  <span className="text-quest-danger">✗ Can be uneven</span>
                </div>
              </div>

              {/* Weighted */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <span className="text-2xl">⚖️</span>
                  <Term
                    word="Weighted Round Robin"
                    definition="Like Round Robin, but servers with higher weights receive proportionally more requests."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted mb-4">
                  Not all servers are equal. A powerful server gets more traffic than a weaker one.
                </p>

                <div className="bg-quest-bg rounded-lg p-4 mb-4">
                  <p className="text-xs text-quest-muted mb-3">Server 3 has weight 4, so gets 40% of traffic:</p>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: 1, weight: 1, pct: 10 },
                      { id: 2, weight: 3, pct: 30 },
                      { id: 3, weight: 4, pct: 40 },
                      { id: 4, weight: 2, pct: 20 }
                    ].map(s => (
                      <div key={s.id} className="text-center">
                        <p className="text-xs text-quest-muted">Server {s.id}</p>
                        <p className="font-mono text-sm">weight: {s.weight}</p>
                        <div className="mt-2 h-2 bg-quest-surface rounded-full overflow-hidden">
                          <div
                            className="h-full bg-quest-primary"
                            style={{ width: `${s.pct}%` }}
                          />
                        </div>
                        <p className="text-xs text-quest-primary mt-1">{s.pct}%</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 text-sm">
                  <span className="text-quest-success">✓ Respects server capacity</span>
                  <span className="text-quest-danger">✗ Needs manual config</span>
                </div>
              </div>
            </div>

            <DeepDive id="which-algo" title="Which Algorithm Should I Use?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Start with Least Connections</strong> - It's smart and adapts well to real-world traffic.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Use IP Hash</strong> when your app stores session data on the server (though stateless + external session storage is better).
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Use Weighted</strong> when you have servers of different sizes or for gradual rollouts.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Try the Simulation
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 3: SIMULATION - Now comes AFTER algorithms */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🎮 Load Balancer Simulation</h2>

            <p className="text-quest-muted mb-4">
              Now that you understand the algorithms, watch them in action!
              See how requests are distributed and what happens when servers fail.
            </p>

            {/* Algorithm selector with explanation */}
            <div className="bg-quest-surface rounded-lg p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-sm text-quest-muted block mb-1">Select Algorithm:</label>
                  <select
                    value={algorithm}
                    onChange={(e) => { setAlgorithm(e.target.value); setRoundRobinIndex(0); }}
                    className="bg-quest-bg border border-white/10 rounded-lg px-4 py-2 font-medium"
                  >
                    <option value="round-robin">🔄 Round Robin</option>
                    <option value="least-connections">📊 Least Connections</option>
                    <option value="random">🎲 Random</option>
                  </select>
                </div>
                <div className="flex-1 bg-quest-bg rounded-lg p-3">
                  <p className="text-sm font-medium text-quest-primary">{algorithmInfo[algorithm].name}</p>
                  <p className="text-xs text-quest-muted">{algorithmInfo[algorithm].desc}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`${isRunning ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}
              >
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                {isRunning ? 'Pause' : 'Start Auto'}
              </button>

              <button onClick={sendRequest} className="btn-secondary flex items-center gap-2">
                <Zap size={18} />
                Send 1 Request
              </button>

              <button onClick={resetSimulation} className="btn-secondary flex items-center gap-2">
                <RotateCcw size={18} />
                Reset
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-quest-muted">Speed:</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={requestRate}
                  onChange={(e) => setRequestRate(Number(e.target.value))}
                  className="w-20"
                />
                <span className="font-mono text-sm w-12">{requestRate}/sec</span>
              </div>
            </div>

            {/* Main Visualization - Cleaner layout */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              {/* The 4 Servers - Grid layout that always shows all 4 */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {servers.map(server => (
                  <motion.div
                    key={server.id}
                    onClick={() => toggleServerHealth(server.id)}
                    className={`
                      cursor-pointer rounded-xl p-4 border-2 transition-all
                      ${!server.healthy
                        ? 'bg-quest-danger/10 border-quest-danger/50 opacity-60'
                        : server.connections > 0
                          ? 'bg-quest-success/10 border-quest-success/50'
                          : 'bg-quest-surface border-white/10 hover:border-quest-primary/50'
                      }
                    `}
                    animate={server.connections > 5 ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 0.3, repeat: server.connections > 5 ? Infinity : 0 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Server
                          size={24}
                          className={!server.healthy ? 'text-quest-danger' : 'text-quest-primary'}
                        />
                        <span className="font-medium">Server {server.id}</span>
                      </div>
                      {!server.healthy && <XCircle size={16} className="text-quest-danger" />}
                    </div>

                    {/* Connection count - prominently displayed */}
                    <div className="text-center mb-3">
                      <p className="text-3xl font-mono font-bold">
                        {server.connections}
                      </p>
                      <p className="text-xs text-quest-muted">active connections</p>
                    </div>

                    {/* Connection bar */}
                    <div className="h-2 bg-quest-bg rounded-full overflow-hidden mb-2">
                      <motion.div
                        className={`h-full transition-all ${server.connections > 7 ? 'bg-quest-warning' : 'bg-quest-success'}`}
                        animate={{ width: `${(server.connections / server.maxConnections) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-xs text-quest-muted">
                      <span>Total: {server.totalRequests}</span>
                      <span>{server.healthy ? '✓ Healthy' : '✗ Down'}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Request Log - Shows recent routing decisions */}
              <div className="bg-quest-surface rounded-lg p-4">
                <p className="text-xs text-quest-muted mb-2">Recent requests (newest first):</p>
                <div className="flex gap-2 flex-wrap min-h-[32px]">
                  {requestLog.length === 0 ? (
                    <span className="text-quest-muted text-sm">Click "Send 1 Request" or "Start Auto" to begin</span>
                  ) : (
                    [...requestLog].reverse().map((log, i) => (
                      <motion.div
                        key={log.time}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`
                          px-3 py-1 rounded-full text-sm font-mono
                          ${log.failed
                            ? 'bg-quest-danger/20 text-quest-danger'
                            : 'bg-quest-primary/20 text-quest-primary'
                          }
                        `}
                      >
                        {log.failed ? '✗ Failed' : `→ S${log.serverId}`}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Total Requests</p>
                <p className="text-2xl font-mono font-bold">{stats.totalRequests}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Successful</p>
                <p className="text-2xl font-mono font-bold text-quest-success">{stats.successfulRequests}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Failed</p>
                <p className="text-2xl font-mono font-bold text-quest-danger">{stats.failedRequests}</p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <p className="text-xs text-quest-muted mb-1">Healthy Servers</p>
                <p className="text-2xl font-mono font-bold text-quest-primary">
                  {servers.filter(s => s.healthy).length}/4
                </p>
              </div>
            </div>

            <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-lg p-4">
              <p className="text-sm text-quest-warning font-medium">💡 Try this:</p>
              <ul className="text-sm text-quest-muted mt-2 space-y-1">
                <li>• <strong>Click on a server</strong> to mark it as down/up and see how traffic reroutes</li>
                <li>• <strong>Switch algorithms</strong> while running to see the difference</li>
                <li>• With <strong>Round Robin</strong>, watch requests go 1→2→3→4→1→2→...</li>
                <li>• With <strong>Least Connections</strong>, watch requests favor less busy servers</li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Review Algorithms
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Health Checks
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 4: HEALTH CHECKS */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">❤️ Health Checks</h2>

            <p className="text-quest-muted mb-6">
              A load balancer is only useful if it knows which servers are working.{' '}
              <Term
                word="Health checks"
                definition="Periodic requests sent to servers to verify they're operational. Failed health checks remove servers from the pool."
                onLearn={learnTerm}
              />{' '}
              are how it detects and avoids sending traffic to dead servers.
            </p>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">How Health Checks Work</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-quest-primary/20 flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <p className="font-medium">Load balancer sends a probe</p>
                    <p className="text-sm text-quest-muted">Usually HTTP GET to /health every few seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-quest-primary/20 flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <p className="font-medium">Server responds (or doesn't)</p>
                    <p className="text-sm text-quest-muted">200 OK = healthy. Timeout or 5xx = unhealthy</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-quest-primary/20 flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <p className="font-medium">Track consecutive failures</p>
                    <p className="text-sm text-quest-muted">3 failures in a row? Remove from pool. Recovers? Add back.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-surface rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="text-quest-danger" size={18} />
                  Active Health Checks
                </h4>
                <p className="text-sm text-quest-muted mb-3">
                  Load balancer actively pings each server at regular intervals.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs space-y-1">
                  <p className="text-quest-success">GET /health → 200 OK ✓</p>
                  <p className="text-quest-success">GET /health → 200 OK ✓</p>
                  <p className="text-quest-danger">GET /health → timeout ✗</p>
                  <p className="text-quest-warning">⚠️ Server marked unhealthy</p>
                </div>
              </div>

              <div className="bg-quest-surface rounded-lg p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Activity className="text-quest-primary" size={18} />
                  Passive Health Checks
                </h4>
                <p className="text-sm text-quest-muted mb-3">
                  Monitor real traffic. Too many failures? Mark unhealthy.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs space-y-1">
                  <p className="text-quest-success">User request → 200 OK ✓</p>
                  <p className="text-quest-danger">User request → 502 Error ✗</p>
                  <p className="text-quest-danger">User request → 502 Error ✗</p>
                  <p className="text-quest-warning">⚠️ Too many errors, removed</p>
                </div>
              </div>
            </div>

            <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-quest-warning mb-2">💡 Best Practice</h4>
              <p className="text-sm text-quest-muted">
                Don't just return 200 from /health. Actually check if your app works:
                Can it connect to the database? Can it reach required services?
                A server that responds but can't serve requests is worse than one that's clearly down.
              </p>
            </div>

            <DeepDive id="graceful-shutdown" title="Connection Draining" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                When taking a server down for maintenance, you don't want to kill active connections.{' '}
                <Term
                  word="Connection draining"
                  definition="Stopping new connections to a server while allowing existing ones to complete gracefully."
                  onLearn={learnTerm}
                />{' '}
                solves this:
              </p>
              <ol className="text-sm text-quest-muted list-decimal list-inside space-y-1">
                <li>Mark server as "draining" (no new connections)</li>
                <li>Wait for existing connections to finish</li>
                <li>Safely shut down the server</li>
              </ol>
              <p className="text-sm text-quest-muted mt-2">This enables zero-downtime deployments!</p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Simulation
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Side Quest: Choosing a LB
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 5: SIDE QUEST - Choosing Your Load Balancer */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-medium">
                Optional Side Quest
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Choosing Your Load Balancer</h2>
            <p className="text-quest-muted mb-1">
              You know <em>what</em> a load balancer does. Now let's talk about <strong>which one to actually use</strong> when
              you're building something real.
            </p>
            <p className="text-sm text-quest-muted italic mb-6">
              Skip to quiz anytime — but if you ever need to set up a real system, this will save you hours of research.
            </p>

            {/* ===== NGINX ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-2xl font-bold text-green-400">N</div>
                <div>
                  <h3 className="text-lg font-semibold">NGINX</h3>
                  <p className="text-xs text-quest-muted">The Swiss Army Knife — Load Balancer + Web Server + Reverse Proxy</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4 text-sm">
                NGINX (pronounced "engine-x") started as a web server but became the most popular load balancer
                in the world. It powers about <strong>34% of all websites</strong>. If you're building anything
                web-related, you'll likely encounter NGINX.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-success/10 rounded-lg p-3 border border-quest-success/20">
                  <h4 className="text-xs font-semibold text-quest-success mb-2">STRENGTHS</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>+ Does <strong>everything</strong>: load balancing, SSL termination, static files, reverse proxy, caching</li>
                    <li>+ Incredibly fast — handles 10,000+ concurrent connections with minimal RAM</li>
                    <li>+ Massive community, docs, and StackOverflow answers for every problem</li>
                    <li>+ Free open-source version is powerful enough for most use cases</li>
                    <li>+ Configuration is readable and straightforward</li>
                  </ul>
                </div>
                <div className="bg-quest-danger/10 rounded-lg p-3 border border-quest-danger/20">
                  <h4 className="text-xs font-semibold text-quest-danger mb-2">WEAKNESSES</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>- Active health checks only in paid NGINX Plus ($2,500/year)</li>
                    <li>- Config reload needed for upstream changes (no dynamic API in free version)</li>
                    <li>- Not as advanced for pure TCP/UDP load balancing as HAProxy</li>
                    <li>- Can become a config management challenge at scale</li>
                  </ul>
                </div>
              </div>

              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <p className="text-xs font-mono text-quest-primary mb-2"># Example: NGINX as load balancer (nginx.conf)</p>
                <pre className="text-xs text-quest-muted font-mono whitespace-pre-wrap leading-relaxed">{`upstream backend {
    least_conn;              # Algorithm
    server 10.0.0.1:3000;    # App server 1
    server 10.0.0.2:3000;    # App server 2
    server 10.0.0.3:3000;    # App server 3
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}`}</pre>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs"><strong className="text-quest-primary">Best for:</strong>{' '}
                  <span className="text-quest-muted">
                    Most web applications. If you're building a startup, side project, or any web app and need a load balancer,
                    NGINX is the safe default choice. It's what you'll see in 80% of real-world setups.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== HAProxy ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl font-bold text-blue-400">H</div>
                <div>
                  <h3 className="text-lg font-semibold">HAProxy</h3>
                  <p className="text-xs text-quest-muted">The Specialist — Purpose-Built for Load Balancing</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4 text-sm">
                HAProxy (High Availability Proxy) does one thing and does it exceptionally well: load balancing.
                Companies like GitHub, Stack Overflow, Reddit, and Airbnb use it for their most critical traffic.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-success/10 rounded-lg p-3 border border-quest-success/20">
                  <h4 className="text-xs font-semibold text-quest-success mb-2">STRENGTHS</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>+ <strong>Best performance</strong> of any software LB — handles millions of connections</li>
                    <li>+ Advanced health checks built into free version</li>
                    <li>+ Real-time stats dashboard out of the box</li>
                    <li>+ Excellent for both L4 (TCP) and L7 (HTTP) balancing</li>
                    <li>+ Dynamic server management via runtime API</li>
                    <li>+ Battle-tested at massive scale (GitHub routes ALL traffic through it)</li>
                  </ul>
                </div>
                <div className="bg-quest-danger/10 rounded-lg p-3 border border-quest-danger/20">
                  <h4 className="text-xs font-semibold text-quest-danger mb-2">WEAKNESSES</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>- <strong>Only</strong> a load balancer — can't serve static files or act as web server</li>
                    <li>- Steeper learning curve than NGINX</li>
                    <li>- Config format is less intuitive</li>
                    <li>- Smaller community than NGINX (fewer tutorials)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <p className="text-xs font-mono text-quest-primary mb-2"># Example: HAProxy config (haproxy.cfg)</p>
                <pre className="text-xs text-quest-muted font-mono whitespace-pre-wrap leading-relaxed">{`frontend http_front
    bind *:80
    default_backend servers

backend servers
    balance leastconn
    option httpchk GET /health
    server s1 10.0.0.1:3000 check
    server s2 10.0.0.2:3000 check
    server s3 10.0.0.3:3000 check`}</pre>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs"><strong className="text-quest-primary">Best for:</strong>{' '}
                  <span className="text-quest-muted">
                    High-traffic applications where load balancing performance is critical. If you're at the scale
                    where NGINX's LB features feel limiting, or you need advanced health checks and real-time
                    stats without paying for NGINX Plus, HAProxy is the answer.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== AWS ALB/NLB/ELB ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center text-2xl">☁️</div>
                <div>
                  <h3 className="text-lg font-semibold">AWS ALB / NLB / CLB</h3>
                  <p className="text-xs text-quest-muted">The Managed Solution — Let AWS Handle Everything</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4 text-sm">
                AWS offers three types of load balancers. The key difference from NGINX/HAProxy:
                <strong> you don't manage any servers</strong>. AWS handles availability, scaling, and patching.
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Application Load Balancer (ALB)</h4>
                    <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded">Layer 7</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Routes based on URL path, hostname, HTTP headers. Can route <code className="text-quest-primary">/api/*</code> to one
                    set of servers and <code className="text-quest-primary">/static/*</code> to another.
                  </p>
                  <p className="text-xs text-quest-success">Most common choice for web applications on AWS.</p>
                </div>

                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Network Load Balancer (NLB)</h4>
                    <span className="text-xs bg-quest-secondary/20 text-quest-secondary px-2 py-0.5 rounded">Layer 4</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Ultra-fast, routes raw TCP/UDP. Handles millions of requests/sec with ultra-low latency.
                    Doesn't look inside HTTP — just forwards packets.
                  </p>
                  <p className="text-xs text-quest-success">Best for gaming servers, IoT, or any non-HTTP traffic.</p>
                </div>

                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Classic Load Balancer (CLB)</h4>
                    <span className="text-xs bg-quest-muted/20 text-quest-muted px-2 py-0.5 rounded">Legacy</span>
                  </div>
                  <p className="text-xs text-quest-muted">
                    The original AWS LB. Still works but AWS recommends ALB or NLB for new projects.
                    You'll see it in older tutorials.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-success/10 rounded-lg p-3 border border-quest-success/20">
                  <h4 className="text-xs font-semibold text-quest-success mb-2">STRENGTHS</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>+ <strong>Zero maintenance</strong> — no servers to patch, no config to manage</li>
                    <li>+ Auto-scales automatically with traffic</li>
                    <li>+ Built-in SSL/TLS termination with free AWS certificates</li>
                    <li>+ Native integration with EC2, ECS, Lambda, etc.</li>
                    <li>+ Built-in access logs, CloudWatch metrics</li>
                  </ul>
                </div>
                <div className="bg-quest-danger/10 rounded-lg p-3 border border-quest-danger/20">
                  <h4 className="text-xs font-semibold text-quest-danger mb-2">WEAKNESSES</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>- <strong>AWS lock-in</strong> — can't move to another cloud easily</li>
                    <li>- Costs add up: ~$16/month base + $0.008 per GB processed</li>
                    <li>- Less flexible than NGINX/HAProxy config</li>
                    <li>- Cold start delay when traffic spikes suddenly</li>
                    <li>- Can't customize as deeply (you don't control the software)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs"><strong className="text-quest-primary">Best for:</strong>{' '}
                  <span className="text-quest-muted">
                    Teams already on AWS who want zero ops overhead. If your app runs on EC2/ECS/EKS,
                    ALB is the easiest path. You trade customization for convenience.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== Cloudflare ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-2xl">🛡️</div>
                <div>
                  <h3 className="text-lg font-semibold">Cloudflare</h3>
                  <p className="text-xs text-quest-muted">The Edge Shield — CDN + DDoS Protection + Load Balancing</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4 text-sm">
                Cloudflare sits <strong>in front of everything</strong> — even in front of your NGINX or AWS ALB.
                It's not a traditional load balancer; it's a global network that protects and accelerates your traffic
                before it even reaches your servers.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-success/10 rounded-lg p-3 border border-quest-success/20">
                  <h4 className="text-xs font-semibold text-quest-success mb-2">STRENGTHS</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>+ <strong>DDoS protection</strong> — absorbs attacks before they reach you</li>
                    <li>+ Global CDN — caches content at 300+ locations worldwide</li>
                    <li>+ Free tier is incredibly generous (free SSL, free CDN, basic LB)</li>
                    <li>+ Geographic load balancing — route users to nearest data center</li>
                    <li>+ WAF (Web Application Firewall) included</li>
                  </ul>
                </div>
                <div className="bg-quest-danger/10 rounded-lg p-3 border border-quest-danger/20">
                  <h4 className="text-xs font-semibold text-quest-danger mb-2">WEAKNESSES</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>- Load balancing feature costs $5-200+/month</li>
                    <li>- You're trusting a third party with ALL your traffic</li>
                    <li>- Can't do internal/private network load balancing</li>
                    <li>- Less control over fine-grained routing rules</li>
                    <li>- When Cloudflare has outages, half the internet goes down</li>
                  </ul>
                </div>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs"><strong className="text-quest-primary">Best for:</strong>{' '}
                  <span className="text-quest-muted">
                    <strong>Every public-facing website</strong> should be behind Cloudflare (or similar) for the free
                    DDoS protection and CDN alone. Use it <em>alongside</em> NGINX/ALB, not as a replacement.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== Comparison Table ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Head-to-Head Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">Factor</th>
                      <th className="text-center py-2 px-3 text-green-400">NGINX</th>
                      <th className="text-center py-2 px-3 text-blue-400">HAProxy</th>
                      <th className="text-center py-2 px-3 text-orange-400">AWS ALB</th>
                      <th className="text-center py-2 px-3 text-amber-400">Cloudflare</th>
                    </tr>
                  </thead>
                  <tbody className="text-quest-muted">
                    {[
                      ['Cost', 'Free', 'Free', '~$16+/mo', '$5+/mo'],
                      ['Setup', '~30 min', '~45 min', '~10 min', '~5 min'],
                      ['Ops Burden', 'You manage', 'You manage', 'AWS manages', 'They manage'],
                      ['Performance', 'Excellent', 'Best', 'Great', 'Great'],
                      ['Health Checks', 'Paid only', 'Free, advanced', 'Built-in', 'Built-in'],
                      ['Static Files', 'Yes', 'No', 'No', 'Yes (CDN)'],
                      ['DDoS Protection', 'Basic', 'No', 'AWS Shield', 'Best'],
                      ['L4 + L7', 'Both', 'Both (best L4)', 'ALB=L7, NLB=L4', 'L7 only'],
                      ['Best Suited For', 'Most apps', 'High traffic', 'AWS apps', 'Edge/CDN'],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        {row.map((cell, j) => (
                          <td key={j} className={`py-2 px-3 ${j === 0 ? 'font-medium text-quest-text' : 'text-center'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== Decision Guide ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Which Should I Use? (Decision Guide)</h3>

              <div className="space-y-3">
                {[
                  {
                    scenario: 'Side project / startup MVP',
                    answer: 'NGINX',
                    why: 'Free, versatile, acts as both web server and LB. One tool does everything. Huge community means easy debugging.',
                  },
                  {
                    scenario: 'Already on AWS with EC2/ECS',
                    answer: 'AWS ALB',
                    why: 'Native integration, zero ops. You click buttons in the console instead of writing config files. Worth the cost for the time saved.',
                  },
                  {
                    scenario: 'High-traffic app (>100K req/sec)',
                    answer: 'HAProxy',
                    why: 'Built for extreme performance. GitHub, Reddit, StackOverflow all chose HAProxy for this reason. Free advanced health checks and stats.',
                  },
                  {
                    scenario: 'Public website needing DDoS protection',
                    answer: 'Cloudflare + any of the above',
                    why: 'Cloudflare sits in front as a shield. Behind it, use NGINX/ALB for your internal routing. This is the most common real-world setup.',
                  },
                  {
                    scenario: 'Kubernetes / containers',
                    answer: 'Ingress Controller (NGINX-based or Traefik)',
                    why: 'K8s has its own load balancing. NGINX Ingress Controller is the default. Traefik auto-discovers services. You rarely use a standalone LB with K8s.',
                  },
                  {
                    scenario: 'Multi-cloud or multi-region',
                    answer: 'Cloudflare + regional LBs',
                    why: 'Cloudflare routes users to the nearest region (geo LB). Each region has its own ALB/NGINX for internal routing.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-quest-surface/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{item.scenario}</p>
                      <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded font-medium">
                        {item.answer}
                      </span>
                    </div>
                    <p className="text-xs text-quest-muted">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Real World Stacks ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">What Real Companies Actually Use</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { company: 'Netflix', stack: 'AWS ALB + custom Zuul gateway', reason: 'Deep AWS integration' },
                  { company: 'GitHub', stack: 'HAProxy → GLB (custom)', reason: 'Extreme performance needs' },
                  { company: 'Shopify', stack: 'NGINX + Cloudflare', reason: 'Best of both worlds' },
                  { company: 'Discord', stack: 'NGINX → moved to custom Rust', reason: 'Outgrew off-the-shelf' },
                  { company: 'Stripe', stack: 'HAProxy', reason: 'Reliability for payment traffic' },
                  { company: 'Airbnb', stack: 'AWS ALB + HAProxy (internal)', reason: 'Managed edge + internal perf' },
                ].map((item, i) => (
                  <div key={i} className="bg-quest-surface/50 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-20 shrink-0">
                      <p className="text-sm font-semibold">{item.company}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-mono text-quest-primary">{item.stack}</p>
                      <p className="text-xs text-quest-muted">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Layering Insight ===== */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">The Real-World Pattern: Layered Load Balancing</h3>
              <p className="text-sm text-quest-muted mb-4">
                Most production systems don't use just one load balancer. They <strong>layer</strong> them:
              </p>
              <div className="space-y-2 text-sm">
                {[
                  { layer: 'User', arrow: '→', target: 'Cloudflare (edge CDN + DDoS shield)', color: 'text-amber-400' },
                  { layer: '', arrow: '→', target: 'AWS ALB (managed cloud LB, SSL termination)', color: 'text-orange-400' },
                  { layer: '', arrow: '→', target: 'NGINX Ingress (K8s pod routing) or NGINX reverse proxy', color: 'text-green-400' },
                  { layer: '', arrow: '→', target: 'Your application servers', color: 'text-quest-text' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-quest-muted w-4">{i === 0 ? '👤' : ''}</span>
                    <span className="text-quest-muted">{item.arrow}</span>
                    <span className={item.color}>{item.target}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-quest-muted mt-3">
                Each layer handles a different concern. You don't have to use all of them — start simple and add layers as you grow.
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Health Checks
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION 6: QUIZ */}
      {currentSection === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">🎯 Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Load balancers are fundamental to scalable systems. Let's verify your understanding!
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
                <h3 className="text-xl font-bold mb-2">Level 3 Complete! 🎉</h3>
                <p className="text-quest-muted mb-4">
                  You now understand load balancers, their algorithms, and health checks!
                </p>
                <p className="text-sm text-quest-primary">
                  Next up: Caching—making your system lightning fast!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

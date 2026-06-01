import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, RotateCcw, ArrowUp, ArrowRight, Plus, Minus,
  Server, Cpu, HardDrive, CheckCircle, AlertTriangle, XCircle,
  TrendingUp, DollarSign, Zap, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react'

// Reusable components
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

// Server component for visualization
function ScalableServer({ specs, load, status, id }) {
  const getStatusColor = () => {
    if (status === 'crashed') return 'border-quest-danger'
    if (load > 80) return 'border-quest-warning'
    return 'border-quest-success'
  }

  return (
    <motion.div
      layout
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className={`server-box ${getStatusColor()} ${status === 'crashed' ? 'opacity-60' : ''}`}
      style={{ width: 120 + specs.cpu * 20 }}
    >
      <div className="text-center">
        <Server size={32} className={status === 'crashed' ? 'text-quest-danger' : 'text-quest-primary'} />
        <p className="text-xs mt-1 text-quest-muted">Server {id}</p>
      </div>

      {/* Specs display */}
      <div className="mt-2 space-y-1 text-xs">
        <div className="flex items-center gap-1">
          <Cpu size={12} />
          <span>{specs.cpu} vCPU</span>
        </div>
        <div className="flex items-center gap-1">
          <HardDrive size={12} />
          <span>{specs.ram} GB RAM</span>
        </div>
      </div>

      {/* Load bar */}
      <div className="mt-2">
        <div className="h-1.5 bg-quest-bg rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${load > 80 ? 'bg-quest-warning' : 'bg-quest-success'}`}
            animate={{ width: `${Math.min(load, 100)}%` }}
          />
        </div>
        <p className="text-xs text-quest-muted text-center mt-1">{Math.round(load)}% load</p>
      </div>
    </motion.div>
  )
}

export default function Level2({ onComplete, learnTerm, markDeepDiveRead, unlockAchievement }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [scalingMode, setScalingMode] = useState('none') // none, vertical, horizontal

  // Vertical scaling state
  const [verticalSpecs, setVerticalSpecs] = useState({ cpu: 2, ram: 4 })
  const [verticalLoad, setVerticalLoad] = useState(30)
  const [verticalCost, setVerticalCost] = useState(100)

  // Horizontal scaling state
  const [horizontalServers, setHorizontalServers] = useState([
    { id: 1, specs: { cpu: 2, ram: 4 }, load: 30 }
  ])
  const [horizontalTraffic, setHorizontalTraffic] = useState(30)

  // Simulation state
  const [isRunning, setIsRunning] = useState(false)
  const [trafficLevel, setTrafficLevel] = useState(50)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['story', 'vertical', 'horizontal', 'compare', 'side quest', 'toolkit', 'quiz']

  // Calculate capacity
  const getVerticalCapacity = () => verticalSpecs.cpu * 25 + verticalSpecs.ram * 5
  const getHorizontalCapacity = () => horizontalServers.length * 100

  // Vertical scaling functions
  const scaleUp = () => {
    if (verticalSpecs.cpu < 64) {
      setVerticalSpecs(prev => ({
        cpu: prev.cpu * 2,
        ram: prev.ram * 2
      }))
      setVerticalCost(prev => prev * 2.5) // Non-linear cost increase
      unlockAchievement?.('scale_up')
    }
  }

  const scaleDown = () => {
    if (verticalSpecs.cpu > 1) {
      setVerticalSpecs(prev => ({
        cpu: prev.cpu / 2,
        ram: prev.ram / 2
      }))
      setVerticalCost(prev => prev / 2.5)
    }
  }

  // Horizontal scaling functions
  const addServer = () => {
    if (horizontalServers.length < 8) {
      setHorizontalServers(prev => [
        ...prev,
        { id: Date.now(), specs: { cpu: 2, ram: 4 }, load: 0 }
      ])
      unlockAchievement?.('scale_out')
    }
  }

  const removeServer = () => {
    if (horizontalServers.length > 1) {
      setHorizontalServers(prev => prev.slice(0, -1))
    }
  }

  // Simulate load distribution
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      // Fluctuate traffic
      setTrafficLevel(prev => {
        const change = (Math.random() - 0.5) * 20
        return Math.max(10, Math.min(150, prev + change))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  // Update loads based on traffic
  useEffect(() => {
    // Vertical
    const vertCapacity = getVerticalCapacity()
    setVerticalLoad((trafficLevel / vertCapacity) * 100)

    // Horizontal - distribute load across servers
    const loadPerServer = trafficLevel / horizontalServers.length
    setHorizontalServers(prev =>
      prev.map(s => ({
        ...s,
        load: Math.min((loadPerServer / 100) * 100 + Math.random() * 10, 100)
      }))
    )
  }, [trafficLevel, verticalSpecs, horizontalServers.length])

  const quizQuestions = [
    {
      id: 'q1',
      question: 'When should you prefer vertical scaling over horizontal scaling?',
      options: [
        { id: 'a', text: 'When you need unlimited scale', correct: false },
        { id: 'b', text: 'For simpler applications that don\'t need distributed architecture', correct: true },
        { id: 'c', text: 'When cost is the primary concern', correct: false },
        { id: 'd', text: 'Always prefer vertical scaling', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'What is a major limitation of vertical scaling?',
      options: [
        { id: 'a', text: 'It requires code changes', correct: false },
        { id: 'b', text: 'It has hardware limits - you can\'t grow forever', correct: true },
        { id: 'c', text: 'It\'s always more expensive', correct: false },
        { id: 'd', text: 'It increases latency', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What additional component is needed for horizontal scaling?',
      options: [
        { id: 'a', text: 'A bigger database', correct: false },
        { id: 'b', text: 'A load balancer to distribute traffic', correct: true },
        { id: 'c', text: 'Faster network cables', correct: false },
        { id: 'd', text: 'Nothing, just add servers', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'Why does horizontal scaling provide better fault tolerance?',
      options: [
        { id: 'a', text: 'Servers are more reliable', correct: false },
        { id: 'b', text: 'If one server fails, others can handle the load', correct: true },
        { id: 'c', text: 'It uses better hardware', correct: false },
        { id: 'd', text: 'It doesn\'t, both are equal', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(
      q => quizAnswers[q.id] === q.options.find(o => o.correct)?.id
    )
    if (allCorrect) {
      unlockAchievement?.('perfectionist')
    }
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

      {/* SECTION: STORY */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">📈 When One Isn't Enough</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Your startup just got featured on TechCrunch. Traffic is 10x what it was yesterday.
                Your single server is at 95% CPU and climbing. Users are complaining about slow load times.
                Some can't even access the site. You have two choices..."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              Congratulations—you've hit the scale problem. This is actually a good problem to have!
              It means people want to use your product. But now you need to make a decision.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <motion.div
                className="bg-quest-surface rounded-xl p-6 border-2 border-transparent hover:border-quest-primary cursor-pointer transition-all"
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentSection(1)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-quest-primary/20 rounded-lg">
                    <ArrowUp size={32} className="text-quest-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      <Term
                        word="Vertical Scaling"
                        definition="Adding more power (CPU, RAM, storage) to an existing machine. Also called 'scaling up'."
                        onLearn={learnTerm}
                      />
                    </h3>
                    <p className="text-sm text-quest-muted">Scale Up</p>
                  </div>
                </div>
                <p className="text-quest-muted text-sm">
                  Make your existing server more powerful. More CPU, more RAM, bigger machine.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-quest-success">
                    <CheckCircle size={14} /> Simple - no code changes
                  </li>
                  <li className="flex items-center gap-2 text-quest-danger">
                    <XCircle size={14} /> Limited by hardware
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-quest-surface rounded-xl p-6 border-2 border-transparent hover:border-quest-secondary cursor-pointer transition-all"
                whileHover={{ scale: 1.02 }}
                onClick={() => setCurrentSection(2)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-quest-secondary/20 rounded-lg">
                    <ArrowRight size={32} className="text-quest-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      <Term
                        word="Horizontal Scaling"
                        definition="Adding more machines to distribute the load. Also called 'scaling out'."
                        onLearn={learnTerm}
                      />
                    </h3>
                    <p className="text-sm text-quest-muted">Scale Out</p>
                  </div>
                </div>
                <p className="text-quest-muted text-sm">
                  Add more servers. Distribute the load across multiple machines.
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2 text-quest-success">
                    <CheckCircle size={14} /> Theoretically unlimited
                  </li>
                  <li className="flex items-center gap-2 text-quest-danger">
                    <XCircle size={14} /> More complex
                  </li>
                </ul>
              </motion.div>
            </div>

            <DeepDive id="scaling-history" title="A Brief History of Scaling" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                In the early days of the web, vertical scaling was king. Companies like eBay ran on
                massive Sun Microsystems servers that cost millions of dollars. When they needed more
                power, they bought bigger, more expensive machines.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                Then came Google. They had a different idea: instead of one expensive machine, use
                thousands of cheap commodity servers. If one fails, who cares? There are thousands more.
                This horizontal scaling approach became the foundation of modern cloud computing.
              </p>
              <p className="text-sm text-quest-muted">
                Today, companies use both. Start simple with vertical scaling, then go horizontal
                when you outgrow what a single machine can do.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentSection(1)}
                className="btn-primary flex items-center gap-2"
              >
                Try Vertical Scaling
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: VERTICAL SCALING */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">⬆️ Vertical Scaling: Making It Bigger</h2>

            <p className="text-quest-muted mb-6">
              Think of vertical scaling like upgrading your personal computer. Need more power?
              Get a faster CPU. Running out of memory? Add more RAM. It's the most straightforward
              way to handle more load.
            </p>

            {/* Simulation Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button onClick={() => setIsRunning(!isRunning)} className="btn-primary flex items-center gap-2">
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                {isRunning ? 'Pause' : 'Start'} Traffic
              </button>

              <button
                onClick={scaleUp}
                disabled={verticalSpecs.cpu >= 64}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowUp size={18} />
                Scale Up (2x)
              </button>

              <button
                onClick={scaleDown}
                disabled={verticalSpecs.cpu <= 1}
                className="btn-secondary flex items-center gap-2"
              >
                <Minus size={18} />
                Scale Down
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-quest-muted">Traffic:</span>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={trafficLevel}
                  onChange={(e) => setTrafficLevel(Number(e.target.value))}
                  className="w-32"
                />
                <span className="font-mono text-sm">{Math.round(trafficLevel)} req/s</span>
              </div>
            </div>

            {/* Visualization */}
            <div className="bg-quest-bg rounded-xl p-8 mb-6">
              <div className="flex justify-center">
                <motion.div
                  className="relative"
                  animate={{
                    scale: 1 + (verticalSpecs.cpu / 64) * 0.5
                  }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <ScalableServer
                    id={1}
                    specs={verticalSpecs}
                    load={verticalLoad}
                    status={verticalLoad > 100 ? 'crashed' : 'healthy'}
                  />
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-1">Capacity</p>
                  <p className="text-2xl font-mono font-bold text-quest-primary">
                    {getVerticalCapacity()} req/s
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-1">Monthly Cost</p>
                  <p className="text-2xl font-mono font-bold text-quest-warning">
                    ${Math.round(verticalCost)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-1">Server Load</p>
                  <p className={`text-2xl font-mono font-bold ${verticalLoad > 80 ? 'text-quest-danger' : 'text-quest-success'}`}>
                    {Math.round(Math.min(verticalLoad, 100))}%
                  </p>
                </div>
              </div>
            </div>

            {/* Warnings */}
            <AnimatePresence>
              {verticalLoad > 100 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-quest-danger/20 border border-quest-danger/50 rounded-lg p-4 mb-6"
                >
                  <AlertTriangle className="inline mr-2 text-quest-danger" size={18} />
                  <span className="font-semibold text-quest-danger">Server Overloaded!</span>
                  <p className="text-sm text-quest-muted mt-1">
                    Your traffic ({Math.round(trafficLevel)} req/s) exceeds capacity ({getVerticalCapacity()} req/s).
                    Scale up to handle it!
                  </p>
                </motion.div>
              )}

              {verticalSpecs.cpu >= 64 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-quest-warning/20 border border-quest-warning/50 rounded-lg p-4 mb-6"
                >
                  <AlertTriangle className="inline mr-2 text-quest-warning" size={18} />
                  <span className="font-semibold text-quest-warning">Hardware Limit Reached!</span>
                  <p className="text-sm text-quest-muted mt-1">
                    This is the biggest server you can get. There's no machine bigger than 64 vCPUs in this simulation
                    (and in reality, the limits aren't much higher). This is the fundamental ceiling of vertical scaling.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">✅ Pros</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Simple</strong> - No architecture changes needed</li>
                  <li>• <strong>No code changes</strong> - Your app works the same</li>
                  <li>• <strong>No distributed complexity</strong> - Single point of truth</li>
                  <li>• <strong>Quick</strong> - Cloud providers make this a click</li>
                </ul>
              </div>

              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">❌ Cons</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Hardware limits</strong> - Can't scale forever</li>
                  <li>• <strong>Cost increases exponentially</strong> - 2x power ≠ 2x cost</li>
                  <li>• <strong>Still a SPOF</strong> - One server, one failure point</li>
                  <li>• <strong>Downtime during upgrades</strong> - Usually requires restart</li>
                </ul>
              </div>
            </div>

            <DeepDive id="vertical-cost" title="The Economics of Vertical Scaling" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Notice how the cost doesn't double when you double the specs—it more than doubles.
                This is because high-end hardware is exponentially more expensive.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                A 16-core server might cost $500/month. A 32-core might cost $1,500/month—not $1,000.
                This is because manufacturing powerful chips is harder, and fewer customers buy them
                (lower economies of scale).
              </p>
              <p className="text-sm text-quest-muted">
                At some point, it becomes cheaper to run multiple smaller servers than one massive one.
                That's when horizontal scaling starts making economic sense.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Story
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Try Horizontal Scaling
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: HORIZONTAL SCALING */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">➡️ Horizontal Scaling: Adding More</h2>

            <p className="text-quest-muted mb-6">
              Instead of making one server bigger, what if we just... add more servers?
              This is horizontal scaling. The load gets distributed across multiple machines,
              and you can keep adding more as needed.
            </p>

            {/* Simulation Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button onClick={() => setIsRunning(!isRunning)} className="btn-primary flex items-center gap-2">
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                {isRunning ? 'Pause' : 'Start'} Traffic
              </button>

              <button
                onClick={addServer}
                disabled={horizontalServers.length >= 8}
                className="btn-secondary flex items-center gap-2"
              >
                <Plus size={18} />
                Add Server
              </button>

              <button
                onClick={removeServer}
                disabled={horizontalServers.length <= 1}
                className="btn-secondary flex items-center gap-2"
              >
                <Minus size={18} />
                Remove Server
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-quest-muted">Traffic:</span>
                <input
                  type="range"
                  min="10"
                  max="400"
                  value={trafficLevel}
                  onChange={(e) => setTrafficLevel(Number(e.target.value))}
                  className="w-32"
                />
                <span className="font-mono text-sm">{Math.round(trafficLevel)} req/s</span>
              </div>
            </div>

            {/* Visualization */}
            <div className="bg-quest-bg rounded-xl p-8 mb-6">
              {/* Load Balancer hint */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-quest-surface px-4 py-2 rounded-full">
                  <Zap size={16} className="text-quest-warning" />
                  <span className="text-sm">Load Balancer (coming in Level 3!)</span>
                </div>
              </div>

              {/* Servers */}
              <div className="flex flex-wrap justify-center gap-4">
                <AnimatePresence>
                  {horizontalServers.map((server, index) => (
                    <ScalableServer
                      key={server.id}
                      id={index + 1}
                      specs={server.specs}
                      load={server.load}
                      status={server.load > 100 ? 'crashed' : 'healthy'}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-1">Total Capacity</p>
                  <p className="text-2xl font-mono font-bold text-quest-primary">
                    {horizontalServers.length * 100} req/s
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-1">Monthly Cost</p>
                  <p className="text-2xl font-mono font-bold text-quest-warning">
                    ${horizontalServers.length * 100}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-1">Servers</p>
                  <p className="text-2xl font-mono font-bold text-quest-secondary">
                    {horizontalServers.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Key insight */}
            <div className="bg-quest-secondary/10 border border-quest-secondary/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-quest-secondary mb-2">💡 Key Insight</h4>
              <p className="text-sm text-quest-muted">
                Notice how each server costs the same ($100/month), and capacity grows linearly.
                Need more capacity? Just add more servers. This is the power of horizontal scaling—
                <Term
                  word="linear cost scaling"
                  definition="When cost grows proportionally with capacity. 2x capacity = 2x cost. Much better than exponential!"
                  onLearn={learnTerm}
                />.
              </p>
            </div>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">✅ Pros</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Theoretically unlimited</strong> - Keep adding servers</li>
                  <li>• <strong>Fault tolerant</strong> - One server fails? Others handle it</li>
                  <li>• <strong>Linear cost</strong> - Pay for what you need</li>
                  <li>• <strong>No downtime scaling</strong> - Add/remove on the fly</li>
                </ul>
              </div>

              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">❌ Cons</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Complexity</strong> - Need load balancer, service discovery</li>
                  <li>• <strong>Stateless requirement</strong> - Sessions can't live on one server</li>
                  <li>• <strong>Data consistency</strong> - Multiple servers, one database?</li>
                  <li>• <strong>Network overhead</strong> - Servers need to communicate</li>
                </ul>
              </div>
            </div>

            <DeepDive id="stateless" title="Why 'Stateless' Matters" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                When you have multiple servers, any request could hit any server. If Server 1
                stores a user's shopping cart in memory, but their next request goes to Server 2,
                their cart is gone!
              </p>
              <p className="text-sm text-quest-muted mb-3">
                This is why horizontally scaled applications need to be{' '}
                <Term
                  word="stateless"
                  definition="A design where each request contains all the information needed to process it. The server doesn't 'remember' previous requests."
                  onLearn={learnTerm}
                />. State (like user sessions, shopping carts) must be stored externally—in a
                database, cache (Redis), or passed with each request (like JWT tokens).
              </p>
              <p className="text-sm text-quest-muted">
                This constraint forces better architecture, which is why many consider it a blessing in disguise.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Vertical
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Compare Both
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: COMPARE */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">⚖️ The Great Comparison</h2>

            <p className="text-quest-muted mb-6">
              So which one wins? The answer, as with most things in engineering, is: <strong>it depends</strong>.
              Let's break it down.
            </p>

            {/* Comparison Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Factor</th>
                    <th className="text-center py-3 px-4 text-quest-primary">Vertical ⬆️</th>
                    <th className="text-center py-3 px-4 text-quest-secondary">Horizontal ➡️</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { factor: 'Complexity', vertical: '✅ Simple', horizontal: '⚠️ Complex' },
                    { factor: 'Max Scale', vertical: '❌ Limited', horizontal: '✅ Unlimited' },
                    { factor: 'Cost Curve', vertical: '⚠️ Exponential', horizontal: '✅ Linear' },
                    { factor: 'Fault Tolerance', vertical: '❌ Single point', horizontal: '✅ Redundant' },
                    { factor: 'Downtime to Scale', vertical: '⚠️ Often needed', horizontal: '✅ Zero' },
                    { factor: 'Code Changes', vertical: '✅ None', horizontal: '⚠️ Maybe' },
                    { factor: 'Best For', vertical: 'Early stage, simple apps', horizontal: 'Scale, reliability' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4 font-medium">{row.factor}</td>
                      <td className="text-center py-3 px-4">{row.vertical}</td>
                      <td className="text-center py-3 px-4">{row.horizontal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* When to use what */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-quest-primary/10 rounded-lg p-6 border border-quest-primary/30">
                <h4 className="font-semibold text-quest-primary mb-4">🎯 Use Vertical When...</h4>
                <ul className="space-y-3 text-sm text-quest-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>You're early stage and need to move fast</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>Your application is stateful and hard to distribute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>You have a database that can't easily be sharded</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>Your traffic is predictable and within single-machine limits</span>
                  </li>
                </ul>
              </div>

              <div className="bg-quest-secondary/10 rounded-lg p-6 border border-quest-secondary/30">
                <h4 className="font-semibold text-quest-secondary mb-4">🎯 Use Horizontal When...</h4>
                <ul className="space-y-3 text-sm text-quest-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>You need high availability (99.9%+ uptime)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>Traffic is unpredictable or spiky</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>You've hit the limits of vertical scaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={16} className="text-quest-success mt-0.5 shrink-0" />
                    <span>Cost efficiency matters at scale</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Real world */}
            <div className="bg-quest-bg rounded-lg p-6">
              <h4 className="font-semibold mb-4">🌍 Real World: Most Use Both</h4>
              <p className="text-sm text-quest-muted mb-4">
                In practice, companies use a combination. Start with a reasonably sized server (vertical),
                then add more servers (horizontal) as traffic grows. Even in a horizontal setup,
                each individual server is often vertically optimized.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Example:</strong> Netflix runs thousands of servers (horizontal), but each server
                is a powerful AWS instance (vertical). They scale both ways depending on what makes sense.
              </p>
            </div>

            <DeepDive id="auto-scaling" title="Auto-Scaling: The Best of Both Worlds" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Cloud providers like AWS, Google Cloud, and Azure offer{' '}
                <Term
                  word="auto-scaling"
                  definition="Automatic addition or removal of servers based on current demand. Scale up during traffic spikes, scale down when quiet."
                  onLearn={learnTerm}
                />. You define rules ("if CPU &gt; 70%, add a server") and the system handles it.
              </p>
              <p className="text-sm text-quest-muted">
                This is incredibly powerful: you get horizontal scaling benefits without manual intervention.
                It's why cloud-native architectures have become dominant. Pay for what you use, scale when you need it.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Horizontal
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Side Quest: Netflix Story
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SIDE QUEST - Netflix Scaling Journey */}
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
            <h2 className="text-2xl font-bold mb-2">Netflix: From 1 Server to 200+ Million Users</h2>
            <p className="text-quest-muted mb-1">
              The real story of how Netflix made scaling decisions at every stage of their growth —
              and why they used <strong>both</strong> vertical and horizontal scaling at different times.
            </p>
            <p className="text-sm text-quest-muted italic mb-6">
              This is completely optional — skip to the quiz anytime.
            </p>

            {/* ===== ERA 1: DVDs ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📀</span>
                <div>
                  <h3 className="text-lg font-semibold">Era 1: DVD By Mail (1997-2006)</h3>
                  <p className="text-xs text-quest-muted">~5 million subscribers</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4">
                Netflix started as a DVD-by-mail company. Their "tech" was a website where you picked movies,
                and a warehouse that shipped discs. The engineering challenge was simple by today's standards.
              </p>

              {/* Architecture diagram */}
              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-quest-primary font-mono mb-3">ARCHITECTURE circa 2004:</p>
                <div className="flex items-center justify-around text-center text-sm">
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-quest-primary/20 flex items-center justify-center mx-auto mb-1">
                      <span className="text-xl">🌐</span>
                    </div>
                    <p className="text-xs text-quest-muted">Website</p>
                  </div>
                  <ArrowRight size={16} className="text-quest-muted" />
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-orange-500/20 flex items-center justify-center mx-auto mb-1">
                      <Server size={24} className="text-orange-400" />
                    </div>
                    <p className="text-xs text-quest-muted">One Big Server</p>
                  </div>
                  <ArrowRight size={16} className="text-quest-muted" />
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-red-500/20 flex items-center justify-center mx-auto mb-1">
                      <span className="text-xl">🗄️</span>
                    </div>
                    <p className="text-xs text-quest-muted">Oracle DB</p>
                  </div>
                  <ArrowRight size={16} className="text-quest-muted" />
                  <div>
                    <div className="w-14 h-14 rounded-lg bg-yellow-500/20 flex items-center justify-center mx-auto mb-1">
                      <span className="text-xl">📦</span>
                    </div>
                    <p className="text-xs text-quest-muted">Warehouse</p>
                  </div>
                </div>
              </div>

              <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg p-3">
                <p className="text-sm">
                  <strong className="text-quest-primary">Scaling decision:</strong>{' '}
                  <span className="text-quest-muted">
                    Pure vertical scaling. One massive Oracle database server, upgraded whenever needed.
                    This worked because the load was manageable — people browse a catalog and pick DVDs,
                    not stream 4K video.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== ERA 2: Streaming Launch ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">▶️</span>
                <div>
                  <h3 className="text-lg font-semibold">Era 2: Streaming Launches (2007-2008)</h3>
                  <p className="text-xs text-quest-muted">~10 million subscribers, new streaming feature</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4">
                In January 2007, Netflix launched "Watch Now" — stream movies directly in your browser.
                Overnight, the engineering challenge went from "serve a webpage and track DVD shipments" to
                "deliver continuous video data to thousands of users simultaneously."
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold mb-2">DVD Era Load</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>• User visits website: <strong>~50 KB</strong> per page</li>
                    <li>• Browsing session: <strong>5-10 requests</strong></li>
                    <li>• Time on site: <strong>~5 minutes</strong></li>
                    <li>• Server handles it easily</li>
                  </ul>
                </div>
                <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/20">
                  <h4 className="text-sm font-semibold mb-2 text-quest-danger">Streaming Era Load</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>• One movie stream: <strong>~3-7 GB</strong> of data</li>
                    <li>• Continuous connection for <strong>1-2 hours</strong></li>
                    <li>• Must never buffer or lag</li>
                    <li>• <strong>1000x more data</strong> per user</li>
                  </ul>
                </div>
              </div>

              <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-lg p-3 mb-4">
                <p className="text-sm">
                  <strong className="text-quest-warning">The math problem:</strong>{' '}
                  <span className="text-quest-muted">
                    If 10,000 users stream simultaneously at 5 Mbps each, that's <strong>50 Gbps</strong> of
                    bandwidth. No single server in 2007 could handle that. This was Netflix's first moment
                    where vertical scaling simply <em>could not work</em>.
                  </span>
                </p>
              </div>

              <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg p-3">
                <p className="text-sm">
                  <strong className="text-quest-primary">Scaling decision:</strong>{' '}
                  <span className="text-quest-muted">
                    They started building their own data center with many servers (horizontal) for video delivery,
                    but kept the Oracle database (vertical) for user data. A hybrid approach — and it worked,
                    until it didn't.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== THE CRISIS ===== */}
            <div className="bg-gradient-to-br from-red-500/10 to-quest-bg rounded-xl p-6 mb-6 border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💥</span>
                <div>
                  <h3 className="text-lg font-semibold">The Crisis: August 2008</h3>
                  <p className="text-xs text-quest-danger">The event that changed everything</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4">
                Netflix's single, massive Oracle database — the one they'd been vertically scaling for
                a decade — suffered a <strong>major corruption</strong>. The database that stored every
                customer's account, preferences, and queue went down.
              </p>

              <div className="bg-quest-bg rounded-lg p-4 mb-4">
                <p className="text-sm text-quest-muted mb-2">
                  For <strong>three days</strong>, Netflix couldn't ship DVDs. Millions of customers
                  were affected. The company's reputation took a hit.
                </p>
                <p className="text-sm text-quest-muted">
                  But the real wake-up call wasn't the three days of downtime. It was this realization:
                </p>
                <blockquote className="mt-3 pl-4 border-l-2 border-quest-danger italic text-quest-muted">
                  "We had built our entire business on a single point of failure. We'd been vertically
                  scaling one database for 10 years, and now it was the one thing that could kill us."
                </blockquote>
              </div>

              <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg p-3">
                <p className="text-sm">
                  <strong className="text-quest-primary">The decision:</strong>{' '}
                  <span className="text-quest-muted">
                    Netflix leadership made a bold call: migrate <strong>everything</strong> off their
                    own data center and onto Amazon Web Services (AWS). Go fully horizontal. Go cloud-native.
                    No more single points of failure, ever.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== ERA 3: The Great Migration ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">☁️</span>
                <div>
                  <h3 className="text-lg font-semibold">Era 3: The Great Cloud Migration (2009-2016)</h3>
                  <p className="text-xs text-quest-muted">10M → 80M subscribers during migration</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4">
                This migration took <strong>seven years</strong>. Not because the technology was hard (it was),
                but because Netflix was growing the entire time. They were rebuilding the plane while flying it.
              </p>

              {/* Migration timeline */}
              <div className="relative pl-8 border-l-2 border-quest-secondary/30 space-y-4 mb-6">
                {[
                  {
                    year: '2009',
                    title: 'Non-critical systems first',
                    desc: 'Moved encoding pipeline, analytics, and internal tools to AWS. Low-risk, high-learning.',
                    type: 'horizontal'
                  },
                  {
                    year: '2010',
                    title: 'Monolith → Microservices begins',
                    desc: 'Started splitting the giant Java app into independent services. Each service could scale on its own.',
                    type: 'horizontal'
                  },
                  {
                    year: '2011',
                    title: 'Streaming goes to AWS',
                    desc: 'The streaming API — the core business — moved to cloud. Auto-scaling handled traffic spikes automatically.',
                    type: 'horizontal'
                  },
                  {
                    year: '2012',
                    title: 'Chaos Monkey is born',
                    desc: 'Netflix built a tool that randomly kills servers in production to test resilience. If your system can\'t handle a server dying, fix it now.',
                    type: 'horizontal'
                  },
                  {
                    year: '2013',
                    title: 'Database migration',
                    desc: 'Moved from one Oracle DB to distributed databases (Cassandra, DynamoDB). Data spread across hundreds of machines.',
                    type: 'horizontal'
                  },
                  {
                    year: '2016',
                    title: 'Migration complete',
                    desc: 'Last data center server shut down. Netflix was 100% cloud. Over 700 microservices running on AWS.',
                    type: 'horizontal'
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-secondary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-quest-secondary" />
                    </div>
                    <div className="bg-quest-surface/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-quest-secondary">{item.year}</span>
                        <span className="text-xs bg-quest-secondary/20 text-quest-secondary px-2 py-0.5 rounded">
                          {item.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-quest-muted mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* The numbers */}
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-3">By the numbers (2016):</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: '700+', label: 'Microservices', color: 'text-quest-primary' },
                    { value: '100K+', label: 'EC2 Instances', color: 'text-quest-secondary' },
                    { value: '1000+', label: 'Daily Deployments', color: 'text-quest-success' },
                    { value: '~0', label: 'Downtime Hours/Year', color: 'text-quest-warning' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-quest-muted">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== ERA 4: Today's Hybrid ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌍</span>
                <div>
                  <h3 className="text-lg font-semibold">Era 4: The Hybrid Master (2016-Today)</h3>
                  <p className="text-xs text-quest-muted">200+ million subscribers, 190 countries</p>
                </div>
              </div>

              <p className="text-quest-muted mb-4">
                Here's the twist: after going all-in on horizontal scaling with AWS, Netflix built
                their own hardware network <em>on top of it</em>. They realized that for video delivery
                specifically, they could do better than generic cloud servers.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-secondary/10 rounded-lg p-4 border border-quest-secondary/20">
                  <h4 className="text-sm font-semibold mb-2 text-quest-secondary">Open Connect (Their Own CDN)</h4>
                  <p className="text-xs text-quest-muted mb-2">
                    Netflix places custom-built servers inside ISPs worldwide. These are
                    <strong> vertically optimized beasts</strong> — each one packed with up to
                    <strong> 262 TB of storage</strong> and optimized to serve video as fast as possible.
                  </p>
                  <div className="bg-quest-bg rounded p-2">
                    <p className="text-xs font-mono text-quest-secondary">
                      Scaling type: VERTICAL (each box is maxed out)
                    </p>
                  </div>
                </div>

                <div className="bg-quest-primary/10 rounded-lg p-4 border border-quest-primary/20">
                  <h4 className="text-sm font-semibold mb-2 text-quest-primary">AWS Backend (Cloud)</h4>
                  <p className="text-xs text-quest-muted mb-2">
                    Everything else — user accounts, recommendation engine, billing, search, A/B testing
                    — runs on AWS across <strong>hundreds of thousands of instances</strong> that auto-scale.
                  </p>
                  <div className="bg-quest-bg rounded p-2">
                    <p className="text-xs font-mono text-quest-primary">
                      Scaling type: HORIZONTAL (add/remove instances)
                    </p>
                  </div>
                </div>
              </div>

              {/* The flow */}
              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-quest-primary font-mono mb-3">HOW YOUR NETFLIX SESSION WORKS:</p>
                <div className="space-y-3">
                  {[
                    { step: '1', text: 'You open Netflix → Request hits AWS (horizontal, auto-scaled)', icon: '📱' },
                    { step: '2', text: 'AWS authenticates you, loads your profile, runs recommendation AI', icon: '🧠' },
                    { step: '3', text: 'You pick a movie → AWS tells you which Open Connect server has it', icon: '🎬' },
                    { step: '4', text: 'Video streams from the Open Connect box inside your ISP (vertical, optimized)', icon: '📡' },
                    { step: '5', text: 'Playback stats stream back to AWS for analytics and recommendations', icon: '📊' },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs text-quest-muted">
                          <span className="font-mono text-quest-primary">Step {item.step}:</span> {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-lg p-3">
                <p className="text-sm">
                  <strong className="text-quest-warning">The key insight:</strong>{' '}
                  <span className="text-quest-muted">
                    Netflix uses <strong>vertical</strong> scaling where raw throughput per machine matters
                    (video delivery) and <strong>horizontal</strong> scaling where flexibility and resilience
                    matter (everything else). It's not one or the other — it's knowing <em>when</em> to use each.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== The Cost Story ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">The Money Behind the Decisions</h3>

              <p className="text-quest-muted mb-4">
                Every scaling decision Netflix made was ultimately an economic one. Here's how the costs
                played out:
              </p>

              <div className="space-y-3">
                {[
                  {
                    era: 'DVD Era',
                    approach: 'Vertical',
                    cost: '~$1-5M/year',
                    reasoning: 'One big Oracle server + license was cheaper than redesigning everything',
                  },
                  {
                    era: 'Early Streaming',
                    approach: 'Own Data Center',
                    cost: '~$50-100M/year',
                    reasoning: 'Building data centers costs a fortune, but they needed control over video delivery',
                  },
                  {
                    era: 'AWS Migration',
                    approach: 'Horizontal (Cloud)',
                    cost: '~$200M+/year to AWS',
                    reasoning: 'Expensive, but no capital costs. Scale up for Stranger Things premiere, scale down after',
                  },
                  {
                    era: 'Open Connect',
                    approach: 'Vertical (Custom HW)',
                    cost: 'Saved ~$1B/year',
                    reasoning: 'Serving video from ISP-local boxes is 95% cheaper than from cloud. Custom vertical hardware pays for itself.',
                  },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-quest-surface/50 rounded-lg p-4 flex flex-col md:flex-row md:items-center gap-3"
                  >
                    <div className="md:w-28 shrink-0">
                      <p className="text-xs text-quest-muted">{row.era}</p>
                      <p className="font-semibold text-sm">{row.approach}</p>
                    </div>
                    <div className="md:w-32 shrink-0">
                      <p className="font-mono text-quest-warning text-sm">{row.cost}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-quest-muted">{row.reasoning}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ===== Takeaway ===== */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">What Netflix Teaches Us</h3>
              <ul className="space-y-3 text-sm text-quest-muted">
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">1.</span>
                  <span><strong>Start vertical, go horizontal when you must.</strong> Netflix used one Oracle DB for 10 years. Don't over-engineer early.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">2.</span>
                  <span><strong>Crises drive architecture.</strong> The 2008 database corruption directly caused the cloud migration. Pain is the best teacher.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">3.</span>
                  <span><strong>Hybrid is the real answer.</strong> Netflix uses vertical where throughput matters and horizontal where flexibility matters. It's never one-size-fits-all.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">4.</span>
                  <span><strong>Scaling decisions are business decisions.</strong> Every choice was driven by cost, reliability, and user experience — not just "cool technology."</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Compare
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Toolkit: Real Software
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: TOOLKIT - Real Software Choices for Scaling */}
      {currentSection === 5 && (
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
            <h2 className="text-2xl font-bold mb-2">The Builder's Toolkit</h2>
            <p className="text-quest-muted mb-1">
              You know <em>vertical vs horizontal</em> in theory. Now let's talk about the actual
              software and services you'd use to do it.
            </p>
            <p className="text-sm text-quest-muted italic mb-6">
              Skip to quiz anytime — but this is what turns theory into "I can actually build this."
            </p>

            {/* ===== VERTICAL SCALING TOOLS ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Vertical Scaling: Choosing Your Server Size</h3>
              <p className="text-sm text-quest-muted mb-4">
                "Scale vertically" means picking a bigger machine. In practice, this means choosing
                the right <strong>instance type</strong> from a cloud provider.
              </p>

              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-semibold mb-3 text-quest-primary">AWS EC2 Instance Types (Most Popular Cloud)</h4>
                <div className="space-y-2">
                  {[
                    {
                      type: 't3.micro', cpu: '2 vCPU', ram: '1 GB', cost: '~$8/mo',
                      use: 'Dev/testing, tiny projects', color: 'text-quest-success'
                    },
                    {
                      type: 't3.medium', cpu: '2 vCPU', ram: '4 GB', cost: '~$30/mo',
                      use: 'Small web apps, side projects', color: 'text-quest-success'
                    },
                    {
                      type: 'm5.large', cpu: '2 vCPU', ram: '8 GB', cost: '~$70/mo',
                      use: 'Production web apps, APIs', color: 'text-quest-primary'
                    },
                    {
                      type: 'm5.xlarge', cpu: '4 vCPU', ram: '16 GB', cost: '~$140/mo',
                      use: 'Busy production apps', color: 'text-quest-primary'
                    },
                    {
                      type: 'c5.4xlarge', cpu: '16 vCPU', ram: '32 GB', cost: '~$500/mo',
                      use: 'CPU-heavy: video encoding, ML inference', color: 'text-quest-warning'
                    },
                    {
                      type: 'r5.8xlarge', cpu: '32 vCPU', ram: '256 GB', cost: '~$1,600/mo',
                      use: 'Memory-heavy: large databases, caching', color: 'text-quest-warning'
                    },
                    {
                      type: 'x2idn.metal', cpu: '128 vCPU', ram: '2 TB', cost: '~$13,000/mo',
                      use: 'The biggest you can get. SAP, in-memory DBs.', color: 'text-quest-danger'
                    },
                  ].map((inst, i) => (
                    <div key={i} className="flex items-center gap-3 bg-quest-bg rounded-lg p-2">
                      <span className="font-mono text-xs w-24 shrink-0 text-quest-primary">{inst.type}</span>
                      <span className="text-xs w-16 shrink-0">{inst.cpu}</span>
                      <span className="text-xs w-16 shrink-0">{inst.ram}</span>
                      <span className={`text-xs w-20 shrink-0 font-mono ${inst.color}`}>{inst.cost}</span>
                      <span className="text-xs text-quest-muted flex-1">{inst.use}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-quest-muted mt-3">
                  Notice: going from t3.micro ($8) to x2idn.metal ($13K) is <strong>1,625x the cost</strong> for
                  about 64x the CPU. That's the exponential cost curve of vertical scaling in action.
                </p>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs">
                  <strong className="text-quest-primary">How to choose:</strong>{' '}
                  <span className="text-quest-muted">
                    Start with <strong>t3.medium</strong> ($30/mo). Monitor CPU and RAM usage.
                    If CPU consistently &gt;70%, go up one size. If RAM is the bottleneck, switch to r-series (memory-optimized).
                    If CPU is the bottleneck, switch to c-series (compute-optimized). Don't guess — measure first.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== Alternatives to AWS ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Not Just AWS: Other Cloud Providers</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    name: 'DigitalOcean',
                    tagline: 'Simpler & Cheaper',
                    price: 'From $4/mo',
                    best: 'Side projects, small startups, developers who want simplicity',
                    note: 'Fewer features than AWS but way less complex. Great UI.'
                  },
                  {
                    name: 'Railway / Render',
                    tagline: 'Deploy from Git',
                    price: 'From $0 (free tier)',
                    best: 'MVPs, prototypes, apps that "just need to work"',
                    note: 'Push code → deployed. No server config. Scaling is a slider.'
                  },
                  {
                    name: 'Hetzner',
                    tagline: 'Cheapest Raw Power',
                    price: 'From $3.50/mo',
                    best: 'Budget-conscious teams, European startups',
                    note: 'Half the price of AWS for same specs. Less ecosystem.'
                  },
                ].map((provider, i) => (
                  <div key={i} className="bg-quest-surface/50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold">{provider.name}</h4>
                    <p className="text-xs text-quest-primary">{provider.tagline}</p>
                    <p className="text-xs font-mono text-quest-warning mt-1">{provider.price}</p>
                    <p className="text-xs text-quest-muted mt-2"><strong>Best for:</strong> {provider.best}</p>
                    <p className="text-xs text-quest-muted mt-1 italic">{provider.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== HORIZONTAL SCALING TOOLS ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Horizontal Scaling: The Tools</h3>
              <p className="text-sm text-quest-muted mb-4">
                "Add more servers" sounds simple. Here's what that actually looks like in practice,
                from simplest to most powerful.
              </p>

              <div className="space-y-4">
                {/* PM2 */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Level 1: PM2 Cluster Mode</h4>
                    <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-0.5 rounded">Easiest</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Run multiple copies of your Node.js app on <strong>one server</strong>, using all CPU cores.
                    Not true horizontal scaling, but it's the first step.
                  </p>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs text-quest-muted">
                    pm2 start app.js -i max  <span className="text-quest-primary"># Uses all CPU cores</span>
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    <strong>When:</strong> You have one server and want to maximize it before adding more.
                  </p>
                </div>

                {/* Docker + Docker Compose */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Level 2: Docker + Docker Compose</h4>
                    <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded">Standard</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Package your app into a container. Run the same container on multiple servers.
                    Docker Compose can run multiple containers on one machine.
                  </p>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs text-quest-muted">
                    docker compose up --scale web=4  <span className="text-quest-primary"># 4 copies of your app</span>
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    <strong>When:</strong> You need reproducible deployments. "Works on my machine" → works everywhere.
                  </p>
                </div>

                {/* AWS Auto Scaling */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Level 3: Cloud Auto-Scaling Groups</h4>
                    <span className="text-xs bg-quest-warning/20 text-quest-warning px-2 py-0.5 rounded">Production</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Define rules: "If average CPU &gt; 70% for 5 minutes, add a server. If below 30%, remove one."
                    The cloud provider handles everything — launching instances, configuring them, adding to load balancer.
                  </p>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs text-quest-muted whitespace-pre-wrap">{`# AWS Auto Scaling rule (simplified)
Min: 2 servers, Max: 10 servers
Scale up: CPU > 70% for 5 min
Scale down: CPU < 30% for 10 min`}</div>
                  <p className="text-xs text-quest-muted mt-2">
                    <strong>When:</strong> Traffic is unpredictable. Black Friday spikes, viral moments, daily patterns.
                  </p>
                </div>

                {/* Kubernetes */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Level 4: Kubernetes (K8s)</h4>
                    <span className="text-xs bg-quest-danger/20 text-quest-danger px-2 py-0.5 rounded">Advanced</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    The "operating system for containers." Manages hundreds/thousands of containers across
                    many servers. Auto-scales, self-heals, handles deployments.
                  </p>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs text-quest-muted">
                    kubectl scale deployment web --replicas=10  <span className="text-quest-primary"># 10 copies, distributed</span>
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    <strong>When:</strong> You have many services, need complex orchestration.{' '}
                    <strong className="text-quest-danger">Don't use K8s for a simple app</strong> — it's massive overkill
                    under ~10 services.
                  </p>
                </div>

                {/* Serverless */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold">Level 5: Serverless (Lambda / Vercel / Cloudflare Workers)</h4>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Auto-magic</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    No servers at all. Write a function, deploy it, it auto-scales to millions of requests.
                    You pay per invocation, not per server.
                  </p>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs text-quest-muted whitespace-pre-wrap">{`// That's it. This auto-scales to ∞
export function handler(req) {
  return { body: "Hello!" }
}`}</div>
                  <p className="text-xs text-quest-muted mt-2">
                    <strong>When:</strong> APIs, webhooks, cron jobs, anything that doesn't need persistent connections.
                    Not great for WebSockets or long-running processes.
                  </p>
                </div>
              </div>
            </div>

            {/* ===== Decision flowchart ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Decision Flowchart: What Should I Use?</h3>
              <div className="space-y-3">
                {[
                  {
                    q: 'Are you building a prototype / side project?',
                    a: 'Railway, Render, or Vercel. Deploy from Git, don\'t think about servers.',
                  },
                  {
                    q: 'Small production app, <1000 users?',
                    a: 'One DigitalOcean droplet ($12/mo) + PM2 cluster mode + NGINX. Done.',
                  },
                  {
                    q: 'Growing app, need auto-scaling?',
                    a: 'AWS EC2 + Auto Scaling Group + ALB. Or Docker on ECS/Fargate.',
                  },
                  {
                    q: 'Many microservices (>5)?',
                    a: 'Docker + Kubernetes (EKS, GKE, or k3s). Worth the complexity now.',
                  },
                  {
                    q: 'API with unpredictable traffic spikes?',
                    a: 'Serverless (Lambda + API Gateway, or Cloudflare Workers). Pay per request.',
                  },
                  {
                    q: 'Real-time / WebSockets / persistent connections?',
                    a: 'EC2 or containers (not serverless). WebSockets need persistent servers.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-quest-surface/50 rounded-lg p-3 flex items-start gap-3">
                    <span className="text-quest-primary mt-0.5 font-bold shrink-0">Q:</span>
                    <div>
                      <p className="text-sm font-medium">{item.q}</p>
                      <p className="text-xs text-quest-primary mt-1">→ {item.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== Key Takeaway ===== */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">The Golden Rule</h3>
              <p className="text-sm text-quest-muted">
                <strong>Start with the simplest thing that works.</strong> A $12/month DigitalOcean droplet
                running PM2 can handle more traffic than most people think. Move to Docker when you need
                reproducible deploys. Move to Kubernetes when you have 10+ services. Move to serverless
                when you want zero ops. Every tool exists to solve a specific pain — don't adopt complexity
                before you feel the pain.
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(4)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Netflix Story
              </button>
              <button onClick={() => setCurrentSection(6)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: QUIZ */}
      {currentSection === 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">🎯 Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Let's make sure you understand the tradeoffs. In system design interviews,
              explaining <em>why</em> you'd choose one approach matters more than the choice itself.
            </p>

            <div className="space-y-8">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="bg-quest-bg rounded-lg p-6">
                  <p className="font-medium mb-4">
                    {qIndex + 1}. {q.question}
                  </p>
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
                          <span className="flex items-center gap-3">
                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs
                              ${isSelected
                                ? showResult
                                  ? isCorrect ? 'border-quest-success bg-quest-success text-white' : 'border-quest-danger bg-quest-danger text-white'
                                  : 'border-quest-primary bg-quest-primary text-quest-bg'
                                : 'border-white/30'
                              }`}>
                              {option.id.toUpperCase()}
                            </span>
                            {option.text}
                          </span>
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
                <h3 className="text-xl font-bold mb-2">Level 2 Complete! 🎉</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the two fundamental approaches to scaling.
                  But wait—if you add multiple servers, how do users know which one to talk to?
                </p>
                <p className="text-sm text-quest-primary">
                  Next up: Load Balancers—the traffic cops of the internet!
                </p>
              </motion.div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(5)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Toolkit
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

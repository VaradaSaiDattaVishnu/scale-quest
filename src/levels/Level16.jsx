import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Server, Box, Database, GitBranch, AlertTriangle, Zap,
  Users, Shield, CreditCard, Bell, Package, Lock,
  ArrowLeftRight, Cloud, Layers, XCircle, Play, SkipForward
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

const SECTIONS = ['intro', 'monolith', 'microservices', 'migration', 'quiz']

const MONOLITH_TEAMS = [
  { name: 'Auth', icon: Lock, color: 'text-green-400', bg: 'bg-green-500/20' },
  { name: 'Payments', icon: CreditCard, color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
  { name: 'Orders', icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { name: 'Users', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { name: 'Notifications', icon: Bell, color: 'text-pink-400', bg: 'bg-pink-500/20' },
]

const MICROSERVICES = [
  { name: 'Auth Service', icon: Lock, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/40', team: 'Team Alpha', deps: ['User Service'] },
  { name: 'User Service', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/40', team: 'Team Beta', deps: ['Auth Service'] },
  { name: 'Order Service', icon: Package, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/40', team: 'Team Gamma', deps: ['User Service', 'Payment Service', 'Inventory Service'] },
  { name: 'Payment Service', icon: CreditCard, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', team: 'Team Delta', deps: ['Auth Service', 'Order Service'] },
  { name: 'Notification Service', icon: Bell, color: 'text-pink-400', bg: 'bg-pink-500/20', border: 'border-pink-500/40', team: 'Team Epsilon', deps: [] },
  { name: 'Inventory Service', icon: Package, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/40', team: 'Team Zeta', deps: ['Notification Service'] },
]

const MIGRATION_STEPS = [
  {
    title: 'Full Monolith',
    description: 'All traffic flows through the monolith. Every team shares the same codebase and deployment pipeline.',
    monolithPercent: 100,
    services: [],
    monolithModules: ['Auth', 'Users', 'Orders', 'Payments', 'Notifications', 'Inventory'],
  },
  {
    title: 'Extract Auth Service',
    description: 'Auth is extracted first. A proxy routes auth requests to the new service while everything else stays in the monolith.',
    monolithPercent: 82,
    services: ['Auth'],
    monolithModules: ['Users', 'Orders', 'Payments', 'Notifications', 'Inventory'],
  },
  {
    title: 'Extract User & Payment',
    description: 'User and Payment services are extracted next. The monolith is shrinking. Teams are deploying independently.',
    monolithPercent: 48,
    services: ['Auth', 'Users', 'Payments'],
    monolithModules: ['Orders', 'Notifications', 'Inventory'],
  },
  {
    title: 'Most Services Extracted',
    description: 'Only legacy orders and inventory remain in the monolith. Most traffic goes to microservices now.',
    monolithPercent: 18,
    services: ['Auth', 'Users', 'Payments', 'Notifications'],
    monolithModules: ['Orders', 'Inventory'],
  },
  {
    title: 'Monolith Decommissioned',
    description: 'The monolith is gone. All services are independent, each with their own database, deployment pipeline, and team.',
    monolithPercent: 0,
    services: ['Auth', 'Users', 'Orders', 'Payments', 'Notifications', 'Inventory'],
    monolithModules: [],
  },
]

const QUIZ_QUESTIONS = [
  {
    question: 'What is the main organizational benefit of microservices?',
    options: [
      'They use less memory than monoliths',
      'Teams can develop, deploy, and scale their services independently without blocking each other',
      'They eliminate the need for databases',
      'They make code easier to write',
    ],
    correct: 1,
  },
  {
    question: 'What is the Strangler Fig Pattern?',
    options: [
      'A way to optimize database queries in monoliths',
      'A caching strategy for distributed systems',
      'Gradually replacing parts of a monolith by routing traffic to new microservices while the old system still runs',
      'A pattern for handling errors across microservices',
    ],
    correct: 2,
  },
  {
    question: 'What is a Bounded Context in DDD?',
    options: [
      'A firewall rule that limits API access',
      'A clear boundary within which a particular domain model is defined and applicable, often mapping to a microservice',
      'A database schema that limits table size',
      'A rate limit applied to service communication',
    ],
    correct: 1,
  },
  {
    question: 'When should you NOT move to microservices?',
    options: [
      'When you have hundreds of developers',
      'When different services need different scaling profiles',
      'When you have a small team, simple domain, or haven\'t yet proven product-market fit',
      'When you need independent deployments',
    ],
    correct: 2,
  },
]

export default function Level16({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [deployAttempted, setDeployAttempted] = useState(false)
  const [cascadeStep, setCascadeStep] = useState(0)
  const [showFrequencyChart, setShowFrequencyChart] = useState(false)
  const cascadeTimerRef = useRef(null)

  // Monolith state
  const [selectedModule, setSelectedModule] = useState(null)
  const [scalingDemo, setScalingDemo] = useState(false)
  const [monolithCopies, setMonolithCopies] = useState(1)

  // Microservices state
  const [selectedService, setSelectedService] = useState(null)
  const [commPattern, setCommPattern] = useState('sync')
  const [deployingService, setDeployingService] = useState(null)

  // Migration state
  const [migrationStep, setMigrationStep] = useState(0)

  const section = SECTIONS[currentSection]

  const nextSection = useCallback(() => {
    if (currentSection < SECTIONS.length - 1) {
      setCurrentSection(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentSection])

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (cascadeTimerRef.current) clearInterval(cascadeTimerRef.current)
    }
  }, [])

  const handleDeployAttempt = useCallback(() => {
    setDeployAttempted(true)
    setCascadeStep(0)
    let step = 0
    cascadeTimerRef.current = setInterval(() => {
      step++
      setCascadeStep(step)
      if (step >= 5) {
        clearInterval(cascadeTimerRef.current)
        setTimeout(() => setShowFrequencyChart(true), 600)
      }
    }, 800)
  }, [])

  const handleScalingDemo = useCallback(() => {
    setScalingDemo(true)
    setMonolithCopies(1)
    let count = 1
    const interval = setInterval(() => {
      count++
      setMonolithCopies(count)
      if (count >= 3) clearInterval(interval)
    }, 700)
  }, [])

  const handleServiceDeploy = useCallback((serviceName) => {
    setDeployingService(serviceName)
    setTimeout(() => setDeployingService(null), 2000)
  }, [])

  const handleQuizAnswer = useCallback((qIndex, aIndex) => {
    if (quizSubmitted) return
    setQuizAnswers(prev => ({ ...prev, [qIndex]: aIndex }))
  }, [quizSubmitted])

  const handleQuizSubmit = useCallback(() => {
    if (Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length) return
    setQuizSubmitted(true)
    const score = QUIZ_QUESTIONS.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0)
    if (score >= 3) {
      setTimeout(() => onComplete?.(), 1500)
    }
  }, [quizAnswers, onComplete])

  const quizScore = quizSubmitted
    ? QUIZ_QUESTIONS.reduce((acc, q, i) => acc + (quizAnswers[i] === q.correct ? 1 : 0), 0)
    : null

  const CASCADE_EVENTS = [
    { text: 'Deploying Auth module...', type: 'info' },
    { text: 'Running tests... Payment tests FAILED (shared utility changed)', type: 'error' },
    { text: 'Merge conflict in shared/models/user.js (Orders team edited too)', type: 'error' },
    { text: 'Notification service broken: depends on Auth internal API', type: 'error' },
    { text: 'DEPLOY ABORTED. All teams blocked.', type: 'fatal' },
  ]

  const MONOLITH_DESCRIPTIONS = {
    Auth: 'Handles login, registration, JWT tokens, OAuth. Tightly coupled with Users module.',
    Payments: 'Processes credit cards, invoices, refunds. Shares database tables with Orders.',
    Orders: 'Manages shopping cart, checkout, order history. Depends on Payments and Users.',
    Users: 'User profiles, preferences, addresses. Shared by every other module.',
    Notifications: 'Email, SMS, push notifications. Calls internal APIs of Auth and Orders.',
  }

  // --- RENDER SECTIONS ---

  const renderIntro = () => (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            The Deployment Blockade
          </span>
        </h2>
        <p className="text-quest-text/70 text-lg max-w-2xl mx-auto">
          The auth team wants to deploy. But they're blocked by payments. Something's wrong.
        </p>
      </motion.div>

      {/* Monolith visualization */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
        className="bg-quest-card rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Box size={20} className="text-indigo-400" />
          The{' '}
          <Term word="Monolith" definition="A software application where all components are interconnected and interdependent, deployed as a single unit. All teams share one codebase, one deployment pipeline, one release cycle." onLearn={learnTerm} />
        </h3>

        <div className="relative bg-quest-surface/60 rounded-xl border-2 border-indigo-500/40 p-6 mb-6">
          <div className="absolute -top-3 left-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            MONOLITH v47.3.12
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-2">
            {MONOLITH_TEAMS.map((team, i) => {
              const Icon = team.icon
              const isAuth = team.name === 'Auth'
              const isBlocked = deployAttempted && cascadeStep >= 1 && !isAuth
              const isFailed = deployAttempted && cascadeStep >= 4
              return (
                <motion.div
                  key={team.name}
                  animate={isAuth && !deployAttempted ? { boxShadow: ['0 0 0px rgba(74,222,128,0)', '0 0 16px rgba(74,222,128,0.5)', '0 0 0px rgba(74,222,128,0)'] } : {}}
                  transition={isAuth && !deployAttempted ? { repeat: Infinity, duration: 1.5 } : {}}
                  className={`${team.bg} rounded-lg p-3 text-center border ${
                    isFailed ? 'border-red-500/60' : isAuth && !deployAttempted ? 'border-green-500/60' : isBlocked ? 'border-yellow-500/40' : 'border-white/10'
                  } transition-colors duration-300`}
                >
                  <Icon size={24} className={`mx-auto mb-1 ${isFailed ? 'text-red-400' : team.color}`} />
                  <p className="text-sm font-medium">{team.name}</p>
                  {isAuth && !deployAttempted && (
                    <p className="text-xs text-green-400 mt-1">Ready to deploy</p>
                  )}
                  {isBlocked && !isFailed && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-yellow-400 mt-1">Blocked</motion.p>
                  )}
                  {isFailed && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 mt-1">Failed</motion.p>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Dependency tangling lines */}
          {deployAttempted && cascadeStep >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <p className="text-sm text-red-300 flex items-center gap-2">
                <AlertTriangle size={16} />
                Tangled dependencies detected: Auth &rarr; Users &rarr; Orders &rarr; Payments &rarr; Auth (circular!)
              </p>
            </motion.div>
          )}
        </div>

        {/* Deploy button */}
        {!deployAttempted && (
          <motion.button
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={handleDeployAttempt}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-semibold text-white flex items-center justify-center gap-2"
          >
            <Play size={18} />
            Try to Deploy Auth
          </motion.button>
        )}

        {/* Cascade events log */}
        {deployAttempted && (
          <div className="bg-gray-900/80 rounded-lg p-4 font-mono text-sm space-y-2 mt-4">
            {CASCADE_EVENTS.slice(0, cascadeStep + 1).map((evt, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className={`flex items-start gap-2 ${
                  evt.type === 'error' ? 'text-red-400' : evt.type === 'fatal' ? 'text-red-500 font-bold' : 'text-green-400'
                }`}>
                <span className="select-none">{evt.type === 'info' ? '>' : evt.type === 'fatal' ? '!!' : 'X'}</span>
                <span>{evt.text}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Deployment frequency chart */}
      <AnimatePresence>
        {showFrequencyChart && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="bg-quest-card rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold mb-4">Deployment Frequency Comparison</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-quest-text/70">Monolith</span>
                  <span className="text-yellow-400">~1x per week</span>
                </div>
                <div className="h-6 bg-quest-surface rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '14%' }} transition={{ duration: 1 }}
                    className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-quest-text/70">
                    <Term word="Microservices" definition="An architectural style where an application is composed of small, independent services that communicate over APIs. Each service is owned by a small team, has its own database, and can be deployed independently." onLearn={learnTerm} />
                  </span>
                  <span className="text-green-400">~10+ per day per team</span>
                </div>
                <div className="h-6 bg-quest-surface rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '95%' }} transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
            <p className="text-sm text-quest-text/60 mt-4">
              When every team shares one codebase, a single change can block everyone. Microservices let teams move at their own pace.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <DeepDive id="conways-law" title="Conway's Law" onRead={markDeepDiveRead}>
        <div className="space-y-3 text-sm text-quest-text/80">
          <p>
            <strong className="text-quest-primary">Conway's Law states:</strong> "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."
          </p>
          <p>
            If you have four teams working on a compiler, you'll get a four-pass compiler. If your Auth team and Payments team are separate organizations, the system will eventually need to reflect that boundary.
          </p>
          <p>
            This is why microservices align well with how companies actually work. Each team owns a service, and the service boundary mirrors the team boundary. This is sometimes called the <strong className="text-quest-secondary">"Inverse Conway Maneuver"</strong> -- deliberately structuring your teams to produce the architecture you want.
          </p>
        </div>
      </DeepDive>

      {showFrequencyChart && (
        <button onClick={nextSection}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-semibold text-white flex items-center justify-center gap-2">
          Continue: The Monolith <ArrowRight size={18} />
        </button>
      )}
    </div>
  )

  const renderMonolith = () => (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            The Monolith: Good & Bad
          </span>
        </h2>
        <p className="text-quest-text/70">Click on modules to explore what lives inside.</p>
      </motion.div>

      {/* Interactive monolith diagram */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-quest-card rounded-xl p-6 border border-white/10">

        <div className="relative">
          {/* Monolith box */}
          <div className="bg-quest-surface/60 rounded-xl border-2 border-indigo-500/50 p-5">
            <div className="text-center text-xs font-bold text-indigo-400 uppercase tracking-wider mb-4">Monolithic Application</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {MONOLITH_TEAMS.map((team) => {
                const Icon = team.icon
                const isSelected = selectedModule === team.name
                return (
                  <motion.button
                    key={team.name}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedModule(isSelected ? null : team.name)}
                    className={`${team.bg} rounded-lg p-4 text-left border transition-all ${
                      isSelected ? `${team.color} border-current ring-1 ring-current` : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Icon size={20} className={team.color} />
                    <p className="font-medium mt-2 text-sm">{team.name}</p>
                  </motion.button>
                )
              })}
            </div>

            {/* Selected module description */}
            <AnimatePresence mode="wait">
              {selectedModule && (
                <motion.div
                  key={selectedModule}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-indigo-500/10 rounded-lg border border-indigo-500/30"
                >
                  <p className="text-sm text-quest-text/80">{MONOLITH_DESCRIPTIONS[selectedModule]}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Single database */}
          <div className="flex justify-center mt-4">
            <div className="flex items-center gap-2 bg-quest-surface/60 rounded-lg px-4 py-2 border border-yellow-500/30">
              <Database size={18} className="text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">Single Shared Database</span>
            </div>
          </div>
        </div>

        {/* Scaling demo */}
        <div className="mt-8">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Layers size={18} className="text-blue-400" />
            Scaling a Monolith
          </h4>
          <p className="text-sm text-quest-text/70 mb-4">
            Need more Auth capacity? You have to duplicate the <em>entire</em> application -- even if Payments, Orders, and Notifications don't need scaling.
          </p>

          {!scalingDemo ? (
            <button onClick={handleScalingDemo}
              className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/40 rounded-lg text-sm font-medium hover:bg-indigo-500/30 transition-colors">
              Scale the Monolith
            </button>
          ) : (
            <div className="flex gap-3 flex-wrap">
              {Array.from({ length: monolithCopies }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-quest-surface/60 rounded-lg border border-indigo-500/40 p-3 text-center min-w-[120px]"
                >
                  <Box size={24} className="mx-auto text-indigo-400 mb-1" />
                  <p className="text-xs font-medium">Full Copy #{i + 1}</p>
                  <p className="text-xs text-quest-text/50">All 5 modules</p>
                </motion.div>
              ))}
              {monolithCopies >= 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                  className="flex items-center text-sm text-yellow-400">
                  <AlertTriangle size={16} className="mr-1" />
                  3x the resources, but only Auth needed scaling!
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="bg-quest-card rounded-xl p-5 border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
            <CheckCircle size={18} /> When Monoliths Shine
          </h4>
          <ul className="space-y-2 text-sm text-quest-text/80">
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">+</span> Simple to develop, test, and deploy initially</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">+</span> No network overhead between modules</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">+</span> Easy debugging and tracing within one process</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">+</span> Great for small teams and early-stage startups</li>
            <li className="flex items-start gap-2"><span className="text-green-400 mt-0.5">+</span> ACID transactions are straightforward</li>
          </ul>
          <div className="mt-4 p-3 bg-green-500/10 rounded-lg text-xs text-quest-text/60">
            <strong className="text-green-400">Famous monoliths:</strong> StackOverflow serves millions of users from a monolith. Shopify started as one and scaled it successfully for years.
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
          className="bg-quest-card rounded-xl p-5 border border-red-500/20">
          <h4 className="font-semibold text-red-400 mb-3 flex items-center gap-2">
            <XCircle size={18} /> When They Break Down
          </h4>
          <ul className="space-y-2 text-sm text-quest-text/80">
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Deployment coupling: one change blocks everyone</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Can't scale modules independently</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Growing codebase becomes hard to understand</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Long build and test times as code grows</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">-</span> Technology choices are locked in globally</li>
          </ul>
          <div className="mt-4 p-3 bg-red-500/10 rounded-lg text-xs text-quest-text/60">
            <strong className="text-red-400">Warning sign:</strong> When your deploy queue has a 2-week backlog and teams step on each other daily, it might be time to break apart.
          </div>
        </motion.div>
      </div>

      <DeepDive id="distributed-monolith" title="The Distributed Monolith Anti-Pattern" onRead={markDeepDiveRead}>
        <div className="space-y-3 text-sm text-quest-text/80">
          <p>
            <strong className="text-red-400">The worst of both worlds:</strong> You split your code into "microservices" but they all share one database, deploy together, and can't function independently.
          </p>
          <p>
            Signs you have a distributed monolith:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Services share a database and read/write each other's tables</li>
            <li>Deploying one service requires deploying others at the same time</li>
            <li>A failure in one service cascades to all others</li>
            <li>Services communicate via synchronous calls in long chains</li>
          </ul>
          <p>
            You've added network complexity and operational overhead while keeping all the coupling problems of a monolith. This is worse than staying monolithic -- at least a monolith is simple to operate.
          </p>
        </div>
      </DeepDive>

      <button onClick={nextSection}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-semibold text-white flex items-center justify-center gap-2">
        Continue: Microservices Architecture <ArrowRight size={18} />
      </button>
    </div>
  )

  const renderMicroservices = () => (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Service Architecture Map
          </span>
        </h2>
        <p className="text-quest-text/70">Click any service to see its dependencies and communication paths.</p>
      </motion.div>

      {/* Service architecture diagram */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-quest-card rounded-xl p-6 border border-white/10">

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {MICROSERVICES.map((svc) => {
            const Icon = svc.icon
            const isSelected = selectedService === svc.name
            const isDepOfSelected = selectedService && MICROSERVICES.find(s => s.name === selectedService)?.deps.includes(svc.name)
            const dependsOnSelected = selectedService && svc.deps.includes(selectedService)
            const isHighlighted = isSelected || isDepOfSelected || dependsOnSelected
            const isDeploying = deployingService === svc.name

            return (
              <motion.button
                key={svc.name}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedService(isSelected ? null : svc.name)}
                className={`relative ${svc.bg} rounded-xl p-4 text-left border-2 transition-all ${
                  isSelected ? `${svc.border} ring-2 ring-current ${svc.color}` :
                  isHighlighted ? `${svc.border}` :
                  selectedService ? 'border-white/5 opacity-40' : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Team label */}
                <div className="absolute -top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-quest-surface/80 border border-white/10">
                  {svc.team}
                </div>
                <Icon size={22} className={svc.color} />
                <p className="font-semibold text-sm mt-2">{svc.name}</p>

                {/* Own database */}
                <div className="flex items-center gap-1 mt-2 text-xs text-quest-text/50">
                  <Database size={12} />
                  <span>Own DB</span>
                </div>

                {/* Dependency arrows */}
                {isSelected && svc.deps.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-2 text-xs text-quest-text/60">
                    Depends on: {svc.deps.join(', ')}
                  </motion.div>
                )}
                {isDepOfSelected && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-2">
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">dependency</span>
                  </motion.div>
                )}
                {dependsOnSelected && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="mt-2">
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">depends on this</span>
                  </motion.div>
                )}

                {/* Deploy animation */}
                {isDeploying && (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, times: [0, 0.3, 1] }}
                    className="absolute inset-0 rounded-xl border-2 border-green-400 bg-green-400/10 flex items-center justify-center"
                  >
                    <span className="text-green-400 font-bold text-sm">Deployed!</span>
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Independent deployment demo */}
        <div className="bg-quest-surface/40 rounded-lg p-4 border border-white/5">
          <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
            <Zap size={16} className="text-green-400" />
            Independent Deployment
          </h4>
          <p className="text-xs text-quest-text/60 mb-3">Click a service to deploy it without affecting others:</p>
          <div className="flex flex-wrap gap-2">
            {MICROSERVICES.map((svc) => (
              <button key={svc.name}
                onClick={() => handleServiceDeploy(svc.name)}
                disabled={!!deployingService}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  deployingService === svc.name
                    ? 'bg-green-500/20 border-green-500/40 text-green-400'
                    : 'bg-quest-surface/60 border-white/10 hover:border-white/20'
                } disabled:opacity-50`}
              >
                Deploy {svc.name.replace(' Service', '')}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Terms */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="bg-quest-card rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4">Key Concepts</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-quest-surface/40 rounded-lg p-4 border border-blue-500/20">
            <h4 className="font-semibold text-blue-400 text-sm mb-2">
              <Term word="Service Boundary" definition="The clear dividing line that defines what a microservice is responsible for and what it is not. A well-defined boundary minimizes coupling between services." onLearn={learnTerm} />
            </h4>
            <p className="text-xs text-quest-text/70">
              Each service owns a specific business capability. Auth handles identity. Orders handles the purchase flow. Clear boundaries prevent tangled dependencies.
            </p>
          </div>
          <div className="bg-quest-surface/40 rounded-lg p-4 border border-purple-500/20">
            <h4 className="font-semibold text-purple-400 text-sm mb-2">
              <Term word="Domain-Driven Design" definition="A software design approach that focuses on modeling software to match a business domain. It uses ubiquitous language and bounded contexts to manage complexity in large systems." onLearn={learnTerm} />
            </h4>
            <p className="text-xs text-quest-text/70">
              DDD helps you discover natural service boundaries by analyzing how the business actually works, not how the code happens to be structured.
            </p>
          </div>
          <div className="bg-quest-surface/40 rounded-lg p-4 border border-green-500/20">
            <h4 className="font-semibold text-green-400 text-sm mb-2">
              <Term word="Bounded Context" definition="A central pattern in DDD. A boundary within which a particular domain model applies. For example, 'User' means different things in Auth (credentials) vs Orders (shipping address)." onLearn={learnTerm} />
            </h4>
            <p className="text-xs text-quest-text/70">
              A "User" in Auth means credentials and tokens. A "User" in Shipping means an address. Same word, different models. Each bounded context owns its definition.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Communication patterns */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-quest-card rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowLeftRight size={18} className="text-blue-400" />
          Communication Patterns
        </h3>
        <div className="flex gap-3 mb-4">
          <button onClick={() => setCommPattern('sync')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              commPattern === 'sync' ? 'bg-blue-500/20 border border-blue-500/40 text-blue-400' : 'bg-quest-surface/40 border border-white/10'
            }`}>
            Synchronous (REST/gRPC)
          </button>
          <button onClick={() => setCommPattern('async')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              commPattern === 'async' ? 'bg-purple-500/20 border border-purple-500/40 text-purple-400' : 'bg-quest-surface/40 border border-white/10'
            }`}>
            Asynchronous (Events)
          </button>
        </div>

        {commPattern === 'sync' ? (
          <div className="bg-quest-surface/40 rounded-lg p-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-blue-500/20 rounded-lg p-3 text-center border border-blue-500/30">
                <Package size={20} className="mx-auto text-blue-400" />
                <p className="text-xs mt-1">Order</p>
              </div>
              <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                className="flex items-center gap-1 text-blue-400">
                <span className="text-xs">HTTP/gRPC</span>
                <ArrowRight size={16} />
              </motion.div>
              <div className="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-500/30">
                <CreditCard size={20} className="mx-auto text-yellow-400" />
                <p className="text-xs mt-1">Payment</p>
              </div>
            </div>
            <p className="text-xs text-quest-text/70">
              <strong className="text-blue-400">Synchronous:</strong> Service A calls Service B and waits for a response. Simple and familiar, but creates tight coupling. If Payment is down, Order is blocked.
            </p>
          </div>
        ) : (
          <div className="bg-quest-surface/40 rounded-lg p-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="bg-blue-500/20 rounded-lg p-3 text-center border border-blue-500/30">
                <Package size={20} className="mx-auto text-blue-400" />
                <p className="text-xs mt-1">Order</p>
              </div>
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                className="flex flex-col items-center gap-1">
                <ArrowRight size={14} className="text-purple-400" />
                <div className="bg-purple-500/20 rounded-lg px-3 py-2 border border-purple-500/30">
                  <Cloud size={16} className="mx-auto text-purple-400" />
                  <p className="text-xs mt-0.5">Event Bus</p>
                </div>
                <ArrowRight size={14} className="text-purple-400" />
              </motion.div>
              <div className="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-500/30">
                <CreditCard size={20} className="mx-auto text-yellow-400" />
                <p className="text-xs mt-1">Payment</p>
              </div>
            </div>
            <p className="text-xs text-quest-text/70">
              <strong className="text-purple-400">Asynchronous:</strong> Service A publishes an event. Service B consumes it when ready. Decoupled and resilient -- if Payment is down, the event waits in the queue.
            </p>
          </div>
        )}
      </motion.div>

      <DeepDive id="service-boundaries" title="How to Define Service Boundaries" onRead={markDeepDiveRead}>
        <div className="space-y-3 text-sm text-quest-text/80">
          <p><strong className="text-quest-primary">Three approaches to finding boundaries:</strong></p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>
              <strong className="text-blue-400">Business capabilities:</strong> Map your services to what the business does. "Process payments," "Manage inventory," "Handle authentication" are natural service boundaries.
            </li>
            <li>
              <strong className="text-purple-400">Bounded Contexts (DDD):</strong> Find where the same word means different things. "Product" in Catalog means images and descriptions; in Inventory it means stock counts and warehouse locations. These are different contexts, hence different services.
            </li>
            <li>
              <strong className="text-green-400">Team structure:</strong> A service should be owned by one team (2-pizza rule). If two teams need to coordinate to change a service, the boundary is wrong.
            </li>
          </ol>
          <p className="text-quest-text/60">
            Good boundaries have high cohesion (everything inside is related) and low coupling (minimal dependencies on other services).
          </p>
        </div>
      </DeepDive>

      <button onClick={nextSection}
        className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-semibold text-white flex items-center justify-center gap-2">
        Continue: Migration Strategy <ArrowRight size={18} />
      </button>
    </div>
  )

  const renderMigration = () => {
    const step = MIGRATION_STEPS[migrationStep]
    const serviceColors = {
      Auth: 'bg-green-500/30 border-green-500/50 text-green-300',
      Users: 'bg-purple-500/30 border-purple-500/50 text-purple-300',
      Orders: 'bg-blue-500/30 border-blue-500/50 text-blue-300',
      Payments: 'bg-yellow-500/30 border-yellow-500/50 text-yellow-300',
      Notifications: 'bg-pink-500/30 border-pink-500/50 text-pink-300',
      Inventory: 'bg-orange-500/30 border-orange-500/50 text-orange-300',
    }

    return (
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-3">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              <Term word="Strangler Fig Pattern" definition="A migration strategy named after strangler fig trees that grow around existing trees. New microservices are built alongside the monolith, gradually taking over traffic until the monolith can be removed." onLearn={learnTerm} />
            </span>
          </h2>
          <p className="text-quest-text/70">Gradually replace the monolith, one service at a time.</p>
        </motion.div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {MIGRATION_STEPS.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${
              i === migrationStep ? 'bg-blue-400 ring-2 ring-blue-400/30' : i < migrationStep ? 'bg-blue-500/50' : 'bg-quest-surface'
            }`} />
          ))}
        </div>

        {/* Migration visualization */}
        <motion.div key={migrationStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-quest-card rounded-xl p-6 border border-white/10">

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Step {migrationStep + 1}: {step.title}</h3>
            <span className="text-sm text-quest-text/50">
              {migrationStep + 1} / {MIGRATION_STEPS.length}
            </span>
          </div>

          <p className="text-sm text-quest-text/70 mb-6">{step.description}</p>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Monolith (shrinking) */}
            {step.monolithPercent > 0 && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="flex-shrink-0"
                style={{ width: `${Math.max(step.monolithPercent * 1.5, 80)}px` }}
              >
                <div className="bg-quest-surface/60 rounded-xl border-2 border-indigo-500/40 p-3 text-center">
                  <Box size={20} className="mx-auto text-indigo-400 mb-1" />
                  <p className="text-xs font-bold text-indigo-400">Monolith</p>
                  {step.monolithModules.map(m => (
                    <p key={m} className="text-xs text-quest-text/50 mt-0.5">{m}</p>
                  ))}
                </div>
                <div className="text-center mt-1">
                  <Database size={14} className="mx-auto text-yellow-400" />
                </div>
              </motion.div>
            )}

            {/* Proxy / Router */}
            {step.monolithPercent > 0 && step.monolithPercent < 100 && (
              <div className="flex flex-col items-center justify-center self-center">
                <div className="bg-blue-500/20 rounded-lg px-3 py-2 border border-blue-500/30 text-center">
                  <GitBranch size={16} className="mx-auto text-blue-400" />
                  <p className="text-xs mt-1 text-blue-300">API Proxy</p>
                </div>
                <div className="flex gap-4 mt-2 text-xs text-quest-text/50">
                  <span className="text-indigo-400">{step.monolithPercent}%</span>
                  <span className="text-green-400">{100 - step.monolithPercent}%</span>
                </div>
              </div>
            )}

            {/* Extracted microservices */}
            {step.services.length > 0 && (
              <div className="flex flex-wrap gap-2 flex-1">
                {step.services.map(svc => (
                  <motion.div key={svc}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-lg px-3 py-2 border text-center ${serviceColors[svc]}`}
                  >
                    <Server size={16} className="mx-auto mb-0.5" />
                    <p className="text-xs font-medium">{svc}</p>
                    <div className="flex items-center gap-0.5 justify-center mt-1">
                      <Database size={10} className="opacity-60" />
                      <span className="text-xs opacity-60">own DB</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Traffic split bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-quest-text/50 mb-1">
              <span>Monolith: {step.monolithPercent}%</span>
              <span>Microservices: {100 - step.monolithPercent}%</span>
            </div>
            <div className="h-4 bg-quest-surface rounded-full overflow-hidden flex">
              <motion.div
                animate={{ width: `${step.monolithPercent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
              />
              <motion.div
                animate={{ width: `${100 - step.monolithPercent}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>

          {/* Step navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setMigrationStep(prev => Math.max(0, prev - 1))}
              disabled={migrationStep === 0}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-quest-surface/60 border border-white/10 hover:border-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Previous Step
            </button>
            <button
              onClick={() => setMigrationStep(prev => Math.min(MIGRATION_STEPS.length - 1, prev + 1))}
              disabled={migrationStep === MIGRATION_STEPS.length - 1}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500/20 border border-blue-500/40 text-blue-400 hover:bg-blue-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next Step <SkipForward size={14} />
            </button>
          </div>
        </motion.div>

        {/* Migration anti-patterns */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-quest-card rounded-xl p-6 border border-red-500/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-400">
            <AlertTriangle size={18} />
            Migration Anti-Patterns
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-300 text-sm mb-2">Big Bang Rewrite</h4>
              <p className="text-xs text-quest-text/70">
                Rewriting everything at once. Takes years, often fails. The Strangler Fig approach is safer because you migrate incrementally.
              </p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-300 text-sm mb-2">Shared Database</h4>
              <p className="text-xs text-quest-text/70">
                Extracting services but keeping them on one database. This creates hidden coupling -- changing a table schema breaks multiple services.
              </p>
            </div>
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <h4 className="font-semibold text-red-300 text-sm mb-2">Circular Dependencies</h4>
              <p className="text-xs text-quest-text/70">
                Service A depends on B, B depends on C, C depends on A. This means you can't deploy any of them independently -- you're back to a monolith.
              </p>
            </div>
          </div>
        </motion.div>

        <DeepDive id="real-migrations" title="Real Migration Stories" onRead={markDeepDiveRead}>
          <div className="space-y-4 text-sm text-quest-text/80">
            <div>
              <strong className="text-yellow-400">Amazon (2001-2006):</strong>
              <p className="mt-1">
                Jeff Bezos mandated that all teams expose their functionality through service interfaces. No direct database access between teams. This "API mandate" transformed Amazon from a monolith into hundreds of services and ultimately enabled AWS.
              </p>
            </div>
            <div>
              <strong className="text-red-400">Netflix (2008-2016):</strong>
              <p className="mt-1">
                After a major database corruption took down the site for 3 days, Netflix began migrating to AWS and microservices. They pioneered chaos engineering (Chaos Monkey) and built tools like Eureka and Zuul that became industry standards.
              </p>
            </div>
            <div>
              <strong className="text-blue-400">Uber (2014-2018):</strong>
              <p className="mt-1">
                Uber's monolith couldn't scale with their explosive growth. They moved to a domain-oriented microservice architecture (DOMA), grouping related services into "domains" with clear interfaces. They went from one monolith to over 4,000 microservices.
              </p>
            </div>
          </div>
        </DeepDive>

        <button onClick={nextSection}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-semibold text-white flex items-center justify-center gap-2">
          Continue: Final Quiz <ArrowRight size={18} />
        </button>
      </div>
    )
  }

  const renderQuiz = () => (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Knowledge Check
          </span>
        </h2>
        <p className="text-quest-text/70">Test your understanding of monoliths and microservices.</p>
      </motion.div>

      {QUIZ_QUESTIONS.map((q, qi) => (
        <motion.div key={qi}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.1 }}
          className="bg-quest-card rounded-xl p-6 border border-white/10"
        >
          <h3 className="font-semibold mb-4">
            <span className="text-blue-400 mr-2">Q{qi + 1}.</span>
            {q.question}
          </h3>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const isSelected = quizAnswers[qi] === oi
              const isCorrect = q.correct === oi
              const showResult = quizSubmitted

              return (
                <button key={oi}
                  onClick={() => handleQuizAnswer(qi, oi)}
                  disabled={quizSubmitted}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-sm ${
                    showResult && isCorrect
                      ? 'bg-green-500/20 border-green-500/50 text-green-300'
                      : showResult && isSelected && !isCorrect
                      ? 'bg-red-500/20 border-red-500/50 text-red-300'
                      : isSelected
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-quest-surface/40 border-white/10 hover:border-white/20'
                  } disabled:cursor-default`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 text-xs ${
                      showResult && isCorrect ? 'border-green-500 bg-green-500/30' :
                      showResult && isSelected && !isCorrect ? 'border-red-500 bg-red-500/30' :
                      isSelected ? 'border-blue-500 bg-blue-500/30' : 'border-white/20'
                    }`}>
                      {showResult && isCorrect ? <CheckCircle size={14} /> :
                       showResult && isSelected && !isCorrect ? <XCircle size={14} /> :
                       String.fromCharCode(65 + oi)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Submit / Results */}
      {!quizSubmitted ? (
        <button
          onClick={handleQuizSubmit}
          disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Submit Answers
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl p-6 border text-center ${
            quizScore >= 3
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-yellow-500/10 border-yellow-500/30'
          }`}
        >
          <div className="text-4xl font-bold mb-2">
            {quizScore}/{QUIZ_QUESTIONS.length}
          </div>
          {quizScore >= 3 ? (
            <>
              <p className="text-green-400 font-semibold text-lg">Level Complete!</p>
              <p className="text-sm text-quest-text/60 mt-2">
                You understand when and how to break apart a monolith. The deployment blockade is over.
              </p>
              <CheckCircle size={32} className="mx-auto mt-4 text-green-400" />
            </>
          ) : (
            <>
              <p className="text-yellow-400 font-semibold text-lg">Almost there!</p>
              <p className="text-sm text-quest-text/60 mt-2">You need at least 3 correct answers. Review the sections and try again.</p>
              <button
                onClick={() => { setQuizSubmitted(false); setQuizAnswers({}) }}
                className="mt-4 px-6 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-lg text-yellow-400 font-medium text-sm"
              >
                Retry Quiz
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  )

  const renderSection = () => {
    switch (section) {
      case 'intro': return renderIntro()
      case 'monolith': return renderMonolith()
      case 'microservices': return renderMicroservices()
      case 'migration': return renderMigration()
      case 'quiz': return renderQuiz()
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section navigation */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {SECTIONS.map((s, i) => (
          <button key={s}
            onClick={() => i <= currentSection && setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              i === currentSection
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                : i < currentSection
                ? 'bg-blue-500/20 text-blue-400 cursor-pointer hover:bg-blue-500/30'
                : 'bg-quest-surface/40 text-quest-text/30 cursor-not-allowed'
            }`}
            disabled={i > currentSection}
          >
            {i < currentSection && <CheckCircle size={12} className="inline mr-1" />}
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {renderSection()}
    </div>
  )
}

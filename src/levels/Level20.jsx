import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  AlertTriangle, XCircle, Server, Zap, RotateCcw, Play,
  ArrowDown, ArrowUp, Shield, Music, Database, Mail,
  ShoppingCart, CreditCard, Package, Bell, Users
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

/* ---- Service node component ---- */
function ServiceNode({ icon: Icon, label, status, delay = 0 }) {
  const colors = {
    idle: 'border-white/20 bg-quest-surface',
    pending: 'border-quest-warning/50 bg-quest-warning/10',
    success: 'border-quest-success/50 bg-quest-success/10',
    fail: 'border-quest-danger/50 bg-quest-danger/10',
    compensating: 'border-quest-secondary/50 bg-quest-secondary/10',
    compensated: 'border-quest-muted/50 bg-quest-muted/10',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`rounded-xl border-2 p-4 text-center min-w-[110px] transition-colors duration-500 ${colors[status] || colors.idle}`}
    >
      <Icon size={24} className="mx-auto mb-1" />
      <p className="text-xs font-medium">{label}</p>
      {status === 'success' && <CheckCircle size={14} className="mx-auto mt-1 text-quest-success" />}
      {status === 'fail' && <XCircle size={14} className="mx-auto mt-1 text-quest-danger" />}
      {status === 'compensating' && <RotateCcw size={14} className="mx-auto mt-1 text-quest-secondary animate-spin" />}
      {status === 'compensated' && <RotateCcw size={14} className="mx-auto mt-1 text-quest-muted" />}
    </motion.div>
  )
}

/* ---- Animated arrow between nodes ---- */
function AnimatedArrow({ direction = 'forward', status = 'idle', label }) {
  const isReverse = direction === 'reverse'
  const color = isReverse ? 'text-quest-secondary' : status === 'fail' ? 'text-quest-danger' : 'text-quest-success'

  return (
    <div className="flex flex-col items-center mx-1">
      {label && <p className={`text-[10px] mb-0.5 ${color}`}>{label}</p>}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={color}
      >
        {isReverse ? <ArrowUp size={20} className="rotate-90" /> : <ArrowRight size={20} />}
      </motion.div>
    </div>
  )
}

export default function Level20({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [introPhase, setIntroPhase] = useState('idle') // idle, running, failed, fixing, fixed
  const [introStep, setIntroStep] = useState(0)
  const introTimerRef = useRef(null)

  // 2PC state
  const [tpcVotes, setTpcVotes] = useState([true, true, true])
  const [tpcPhase, setTpcPhase] = useState('idle') // idle, voting, voted, deciding, done
  const [tpcStep, setTpcStep] = useState(0)
  const tpcTimerRef = useRef(null)

  // Choreography state
  const [choreoPhase, setChoreoPhase] = useState('idle')
  const [choreoStep, setChoreoStep] = useState(0)
  const [choreoFailAt, setChoreoFailAt] = useState(-1) // -1 = no fail, 2 = fail at inventory
  const choreoTimerRef = useRef(null)

  // Orchestration state
  const [orchPhase, setOrchPhase] = useState('idle')
  const [orchStep, setOrchStep] = useState(0)
  const [orchFailures, setOrchFailures] = useState({}) // service index -> true means fail
  const orchTimerRef = useRef(null)

  const sections = ['intro', 'twophase', 'choreography', 'orchestration', 'quiz']

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(introTimerRef.current)
      clearInterval(tpcTimerRef.current)
      clearInterval(choreoTimerRef.current)
      clearInterval(orchTimerRef.current)
    }
  }, [])

  // ---- INTRO: Broken Order Simulation ----
  const introServices = [
    { icon: ShoppingCart, label: 'Order Service' },
    { icon: CreditCard, label: 'Payment Service' },
    { icon: Package, label: 'Inventory Service' },
    { icon: Bell, label: 'Notification Service' },
  ]

  const getIntroStatus = (idx) => {
    if (introPhase === 'idle') return 'idle'
    if (introPhase === 'running' || introPhase === 'failed') {
      if (idx < introStep) return 'success'
      if (idx === introStep) return 'pending'
      if (idx === 2 && introPhase === 'failed') return 'fail'
      return 'idle'
    }
    if (introPhase === 'fixing') {
      if (idx === 2) return 'fail'
      if (idx === 1 && introStep >= 1) return 'compensating'
      if (idx === 0 && introStep >= 2) return 'compensating'
      if (idx < 2) return 'success'
      return 'idle'
    }
    if (introPhase === 'fixed') {
      if (idx <= 1) return 'compensated'
      if (idx === 2) return 'fail'
      return 'idle'
    }
    return 'idle'
  }

  const runIntro = useCallback(() => {
    setIntroPhase('running')
    setIntroStep(0)
    let step = 0
    clearInterval(introTimerRef.current)
    introTimerRef.current = setInterval(() => {
      step++
      if (step <= 2) {
        setIntroStep(step)
      } else if (step === 3) {
        // Inventory fails
        clearInterval(introTimerRef.current)
        setIntroPhase('failed')
        setIntroStep(2)
      }
    }, 1000)
  }, [])

  const runIntroFix = useCallback(() => {
    setIntroPhase('fixing')
    setIntroStep(0)
    let step = 0
    clearInterval(introTimerRef.current)
    introTimerRef.current = setInterval(() => {
      step++
      setIntroStep(step)
      if (step >= 3) {
        clearInterval(introTimerRef.current)
        setIntroPhase('fixed')
      }
    }, 900)
  }, [])

  // ---- 2PC: Voting Protocol ----
  const run2PC = useCallback(() => {
    setTpcPhase('voting')
    setTpcStep(0)
    let step = 0
    clearInterval(tpcTimerRef.current)
    tpcTimerRef.current = setInterval(() => {
      step++
      setTpcStep(step)
      if (step === 1) {
        setTpcPhase('voted')
      } else if (step === 2) {
        setTpcPhase('deciding')
      } else if (step === 3) {
        setTpcPhase('done')
        clearInterval(tpcTimerRef.current)
      }
    }, 1200)
  }, [])

  const allVotedYes = tpcVotes.every(v => v)

  // ---- CHOREOGRAPHY: Event-Driven Saga ----
  const choreoServices = [
    { icon: ShoppingCart, label: 'Order Service', event: 'OrderCreated' },
    { icon: CreditCard, label: 'Payment Service', event: 'PaymentCompleted' },
    { icon: Package, label: 'Inventory Service', event: 'InventoryReserved' },
    { icon: Bell, label: 'Notification Service', event: 'NotificationSent' },
  ]

  const getChoreoStatus = (idx) => {
    if (choreoPhase === 'idle') return 'idle'
    if (choreoPhase === 'running') {
      if (idx < choreoStep) return 'success'
      if (idx === choreoStep) return 'pending'
      return 'idle'
    }
    if (choreoPhase === 'failed') {
      if (idx < choreoFailAt) return 'success'
      if (idx === choreoFailAt) return 'fail'
      return 'idle'
    }
    if (choreoPhase === 'compensating') {
      if (idx === choreoFailAt) return 'fail'
      if (idx < choreoFailAt && idx >= choreoStep) return 'compensating'
      if (idx < choreoStep) return 'compensated'
      return 'idle'
    }
    if (choreoPhase === 'compensated') {
      if (idx === choreoFailAt) return 'fail'
      if (idx < choreoFailAt) return 'compensated'
      return 'idle'
    }
    // success
    if (idx <= choreoStep) return 'success'
    return 'idle'
  }

  const runChoreo = useCallback((failIdx) => {
    setChoreoFailAt(failIdx)
    setChoreoPhase('running')
    setChoreoStep(0)
    let step = 0
    clearInterval(choreoTimerRef.current)
    choreoTimerRef.current = setInterval(() => {
      step++
      setChoreoStep(step)
      if (failIdx >= 0 && step === failIdx) {
        setChoreoPhase('failed')
        clearInterval(choreoTimerRef.current)
        // Start compensating after a pause
        setTimeout(() => {
          setChoreoPhase('compensating')
          let compStep = failIdx - 1
          setChoreoStep(compStep)
          choreoTimerRef.current = setInterval(() => {
            compStep--
            setChoreoStep(compStep)
            if (compStep < 0) {
              clearInterval(choreoTimerRef.current)
              setChoreoPhase('compensated')
            }
          }, 800)
        }, 1200)
      } else if (step >= 4) {
        setChoreoPhase('success')
        clearInterval(choreoTimerRef.current)
      }
    }, 900)
  }, [])

  // ---- ORCHESTRATION: Central Coordinator ----
  const orchServices = [
    { icon: ShoppingCart, label: 'Order Service', cmd: 'Create Order' },
    { icon: CreditCard, label: 'Payment Service', cmd: 'Charge Payment' },
    { icon: Package, label: 'Inventory Service', cmd: 'Reserve Inventory' },
    { icon: Bell, label: 'Notification Service', cmd: 'Send Notification' },
  ]

  const orchSteps = useRef([])

  const runOrch = useCallback(() => {
    setOrchPhase('running')
    setOrchStep(0)
    orchSteps.current = []

    let step = 0
    const failIndex = Object.keys(orchFailures).find(k => orchFailures[k])
    const failAt = failIndex !== undefined ? Number(failIndex) : -1

    clearInterval(orchTimerRef.current)
    orchTimerRef.current = setInterval(() => {
      step++
      setOrchStep(step)

      if (failAt >= 0 && step === failAt + 1) {
        // This service fails
        orchSteps.current.push({ idx: failAt, result: 'fail' })
        clearInterval(orchTimerRef.current)
        setOrchPhase('compensating')

        // Compensate previously successful steps in reverse
        let compIdx = failAt - 1
        setTimeout(() => {
          orchTimerRef.current = setInterval(() => {
            orchSteps.current.push({ idx: compIdx, result: 'compensated' })
            compIdx--
            setOrchStep(prev => prev + 1)
            if (compIdx < 0) {
              clearInterval(orchTimerRef.current)
              // Notify failure
              orchSteps.current.push({ idx: 3, result: 'notified' })
              setOrchStep(prev => prev + 1)
              setOrchPhase('done-fail')
            }
          }, 800)
        }, 800)
      } else if (step <= 4 && failAt < 0) {
        orchSteps.current.push({ idx: step - 1, result: 'success' })
        if (step >= 4) {
          clearInterval(orchTimerRef.current)
          setOrchPhase('done-success')
        }
      } else if (step <= 4) {
        orchSteps.current.push({ idx: step - 1, result: 'success' })
      }
    }, 1000)
  }, [orchFailures])

  // ---- QUIZ ----
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is a compensating transaction?',
      options: [
        { id: 'a', text: 'A transaction that runs twice to ensure data consistency', correct: false },
        { id: 'b', text: 'An operation that undoes the effect of a previous step when a later step in the saga fails', correct: true },
        { id: 'c', text: 'A payment refund issued by the payment gateway automatically', correct: false },
        { id: 'd', text: 'A database rollback command sent to all microservices', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'Why is Two-Phase Commit rarely used in microservices?',
      options: [
        { id: 'a', text: 'It requires all services to use the same programming language', correct: false },
        { id: 'b', text: 'It only works with SQL databases', correct: false },
        { id: 'c', text: "It's blocking, slow, and not partition-tolerant -- if the coordinator fails, all participants are stuck", correct: true },
        { id: 'd', text: 'It was deprecated in favor of REST APIs', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What is the key difference between Choreography and Orchestration sagas?',
      options: [
        { id: 'a', text: 'Choreography is faster while Orchestration is more reliable', correct: false },
        { id: 'b', text: 'Choreography has services react to events independently, while Orchestration has a central coordinator directing each step', correct: true },
        { id: 'c', text: 'Orchestration only works with synchronous communication', correct: false },
        { id: 'd', text: 'Choreography requires a message broker while Orchestration does not', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What problem does the Outbox Pattern solve?',
      options: [
        { id: 'a', text: 'It prevents duplicate messages from being processed', correct: false },
        { id: 'b', text: 'It speeds up database writes by batching them', correct: false },
        { id: 'c', text: 'Ensuring that database updates and event publishing happen atomically, preventing inconsistencies', correct: true },
        { id: 'd', text: 'It provides a backup queue when the main message broker fails', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
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
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white'
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-rose-400" />
              The Broken Order
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "User paid, but inventory update failed. Now they paid for nothing. How do you handle this?"
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              In a monolith, this was a single database transaction with rollback. In microservices, each service
              has its own database. There is no global <code className="text-rose-400">BEGIN TRANSACTION ... ROLLBACK</code>.
              The{' '}
              <Term word="Saga Pattern" definition="A sequence of local transactions where each step has a compensating transaction that undoes its effects if a later step fails. Used to maintain data consistency across microservices without distributed locks." onLearn={learnTerm} />{' '}
              solves this by defining{' '}
              <Term word="Compensating Transaction" definition="An operation that semantically reverses the effect of a previous transaction. Unlike a database rollback, it's a new forward operation (e.g., issuing a refund instead of rolling back a charge)." onLearn={learnTerm} />{' '}
              for each step.
            </p>

            {/* Interactive Order Flow */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">E-Commerce Order Flow</p>

              <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
                {introServices.map((svc, idx) => (
                  <div key={svc.label} className="flex items-center gap-2">
                    <ServiceNode
                      icon={svc.icon}
                      label={svc.label}
                      status={getIntroStatus(idx)}
                      delay={idx * 0.1}
                    />
                    {idx < introServices.length - 1 && (
                      <div className="flex flex-col items-center">
                        {introPhase === 'fixing' && idx < 2 ? (
                          <AnimatedArrow direction="reverse" label="Undo" />
                        ) : (
                          <ArrowRight size={18} className={
                            getIntroStatus(idx) === 'success' ? 'text-quest-success' :
                            getIntroStatus(idx) === 'fail' ? 'text-quest-danger' :
                            'text-quest-muted'
                          } />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Status messages */}
              <div className="min-h-[60px] mb-4">
                {introPhase === 'idle' && (
                  <p className="text-center text-quest-muted text-sm">Click "Place Order" to see what happens...</p>
                )}
                {introPhase === 'running' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <p className="text-quest-success text-sm">Processing order through services...</p>
                  </motion.div>
                )}
                {introPhase === 'failed' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-quest-danger/10 border border-quest-danger/40 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={18} className="text-quest-danger mt-0.5 flex-shrink-0 animate-pulse" />
                      <div>
                        <p className="text-sm font-semibold text-quest-danger">Inconsistent State!</p>
                        <p className="text-xs text-quest-muted mt-1">
                          Payment was charged ($49.99) but inventory reservation failed.
                          The user paid for nothing! Without a saga, this money is lost.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                {introPhase === 'fixing' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <p className="text-quest-secondary text-sm">Saga detected failure -- running compensating transactions...</p>
                  </motion.div>
                )}
                {introPhase === 'fixed' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-quest-success/10 border border-quest-success/40 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle size={18} className="text-quest-success mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-quest-success">Consistency Restored!</p>
                        <p className="text-xs text-quest-muted mt-1">
                          Saga compensated: Payment refunded, Order cancelled. No money lost.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3">
                {introPhase === 'idle' && (
                  <button onClick={runIntro} className="btn-primary flex items-center gap-2">
                    <Play size={16} /> Place Order
                  </button>
                )}
                {introPhase === 'failed' && (
                  <button onClick={runIntroFix} className="btn-primary flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                    <RotateCcw size={16} /> Run Saga Compensation
                  </button>
                )}
                {(introPhase === 'fixed' || introPhase === 'fixing') && (
                  <button onClick={() => { setIntroPhase('idle'); setIntroStep(0) }} className="btn-secondary flex items-center gap-2">
                    <RotateCcw size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            <DeepDive id="why-distributed-txns-hard" title="Why Distributed Transactions are Hard" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Network Unreliability:</strong> Messages between services can be lost, delayed, or duplicated.
                You cannot rely on synchronous communication to coordinate a multi-service transaction.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Independent Databases:</strong> Each microservice owns its own data store. There is no shared
                transaction log or global lock manager that can atomically commit across all of them.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>CAP Theorem:</strong> In a distributed system with network partitions, you must choose between
                consistency and availability. Sagas embrace eventual consistency -- the system may be temporarily
                inconsistent, but compensating transactions will bring it back to a consistent state.
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Two-Phase Commit <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: TWO-PHASE COMMIT ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-rose-400" />
              The Voting Protocol:{' '}
              <Term word="Two-Phase Commit" definition="A distributed algorithm where a coordinator asks all participants to prepare (vote), then either commits or aborts based on unanimous agreement. Ensures atomicity but is blocking and fragile." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-6">
              Before sagas, distributed systems used Two-Phase Commit (2PC). It works like a vote:
              everyone must agree before anything is finalized. Set each participant's vote below and watch
              the protocol play out.
            </p>

            {/* Vote controls */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">Set Participant Votes</p>
              <div className="flex justify-center gap-4 mb-6">
                {['DB-A', 'DB-B', 'DB-C'].map((name, idx) => (
                  <div key={name} className="text-center">
                    <motion.div
                      className={`rounded-xl border-2 p-4 mb-2 cursor-pointer transition-colors ${
                        tpcVotes[idx]
                          ? 'border-quest-success/50 bg-quest-success/10'
                          : 'border-quest-danger/50 bg-quest-danger/10'
                      }`}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (tpcPhase === 'idle' || tpcPhase === 'done') {
                          const next = [...tpcVotes]
                          next[idx] = !next[idx]
                          setTpcVotes(next)
                        }
                      }}
                    >
                      <Database size={24} className="mx-auto mb-1" />
                      <p className="text-xs font-medium">{name}</p>
                      <p className={`text-xs font-bold mt-1 ${tpcVotes[idx] ? 'text-quest-success' : 'text-quest-danger'}`}>
                        {tpcVotes[idx] ? 'YES' : 'NO'}
                      </p>
                    </motion.div>
                    <p className="text-[10px] text-quest-muted">Click to toggle</p>
                  </div>
                ))}
              </div>

              {/* Coordinator */}
              <div className="flex flex-col items-center mb-6">
                <motion.div
                  className="rounded-xl border-2 border-quest-primary/50 bg-quest-primary/10 p-4 text-center mb-4"
                  animate={tpcPhase === 'voting' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: tpcPhase === 'voting' ? Infinity : 0, duration: 1 }}
                >
                  <Server size={24} className="mx-auto mb-1 text-quest-primary" />
                  <p className="text-xs font-bold">Coordinator</p>
                  <p className="text-[10px] text-quest-muted mt-1">
                    {tpcPhase === 'idle' && 'Ready'}
                    {tpcPhase === 'voting' && 'Phase 1: Sending PREPARE...'}
                    {tpcPhase === 'voted' && 'Phase 1: Collecting votes...'}
                    {tpcPhase === 'deciding' && `Phase 2: Sending ${allVotedYes ? 'COMMIT' : 'ABORT'}...`}
                    {tpcPhase === 'done' && (allVotedYes ? 'COMMITTED' : 'ABORTED')}
                  </p>
                </motion.div>

                {/* Phase indicators */}
                {tpcPhase !== 'idle' && (
                  <div className="flex gap-4 mb-4">
                    <div className={`text-center px-3 py-1 rounded text-xs ${tpcStep >= 1 ? 'bg-quest-warning/20 text-quest-warning' : 'bg-quest-surface text-quest-muted'}`}>
                      Phase 1: Prepare/Vote
                    </div>
                    <div className={`text-center px-3 py-1 rounded text-xs ${tpcStep >= 2 ? (allVotedYes ? 'bg-quest-success/20 text-quest-success' : 'bg-quest-danger/20 text-quest-danger') : 'bg-quest-surface text-quest-muted'}`}>
                      Phase 2: {allVotedYes ? 'Commit' : 'Abort'}
                    </div>
                  </div>
                )}

                {/* Animated arrows */}
                {tpcPhase === 'voting' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-8 mb-2"
                  >
                    {['DB-A', 'DB-B', 'DB-C'].map((_, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                      >
                        <ArrowDown size={18} className="text-quest-warning" />
                        <p className="text-[9px] text-quest-warning">PREPARE</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                {tpcPhase === 'voted' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-8 mb-2"
                  >
                    {tpcVotes.map((vote, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="text-center"
                      >
                        <ArrowUp size={18} className={vote ? 'text-quest-success' : 'text-quest-danger'} />
                        <p className={`text-[9px] ${vote ? 'text-quest-success' : 'text-quest-danger'}`}>
                          {vote ? 'YES' : 'NO'}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
                {tpcPhase === 'deciding' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-8 mb-2"
                  >
                    {[0, 1, 2].map(idx => (
                      <motion.div
                        key={idx}
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: idx * 0.2 }}
                        className="text-center"
                      >
                        <ArrowDown size={18} className={allVotedYes ? 'text-quest-success' : 'text-quest-danger'} />
                        <p className={`text-[9px] ${allVotedYes ? 'text-quest-success' : 'text-quest-danger'}`}>
                          {allVotedYes ? 'COMMIT' : 'ABORT'}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Result */}
              {tpcPhase === 'done' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-lg p-4 text-center mb-4 ${
                    allVotedYes ? 'bg-quest-success/10 border border-quest-success/30' : 'bg-quest-danger/10 border border-quest-danger/30'
                  }`}
                >
                  {allVotedYes ? (
                    <p className="text-sm text-quest-success font-semibold">All participants voted YES -- Transaction COMMITTED</p>
                  ) : (
                    <p className="text-sm text-quest-danger font-semibold">One or more participants voted NO -- Transaction ABORTED</p>
                  )}
                </motion.div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => { setTpcPhase('idle'); setTpcStep(0); setTimeout(run2PC, 100) }}
                  className="btn-primary flex items-center gap-2"
                >
                  <Play size={16} /> Run 2PC Protocol
                </button>
              </div>
            </div>

            {/* Problems with 2PC */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-quest-warning" />
                Why Microservices Avoid 2PC
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Blocking', desc: 'If the coordinator crashes after Phase 1, all participants are stuck holding locks -- they cannot commit or abort until the coordinator recovers.', icon: XCircle, color: 'text-quest-danger' },
                  { title: 'Performance', desc: 'All participants must hold locks during both phases. With many services and high latency, this is extremely slow.', icon: Zap, color: 'text-quest-warning' },
                  { title: 'Not Partition-Tolerant', desc: 'Network partitions between coordinator and participants can leave the system in an indeterminate state permanently.', icon: AlertTriangle, color: 'text-quest-danger' },
                ].map(item => (
                  <div key={item.title} className="bg-quest-bg rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon size={16} className={item.color} />
                      <p className="font-semibold text-sm">{item.title}</p>
                    </div>
                    <p className="text-xs text-quest-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="3pc-paxos" title="Three-Phase Commit & Paxos" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Three-Phase Commit (3PC):</strong> Adds a "pre-commit" phase between voting and committing.
                This reduces the blocking window -- if the coordinator dies, participants can infer the outcome
                based on whether they received the pre-commit message. However, 3PC is still not partition-tolerant.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Paxos / Raft:</strong> Consensus algorithms that handle failures more gracefully.
                They allow a majority of nodes to agree on a value even if some nodes fail. Used in databases
                like Google Spanner and CockroachDB, but add significant complexity and latency.
              </p>
              <p className="text-sm text-quest-muted">
                In practice, most microservice architectures skip all of these in favor of sagas with eventual
                consistency. The business logic for compensation is simpler to reason about than distributed
                consensus protocols.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Choreography <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: CHOREOGRAPHY ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Music className="text-rose-400" />
              The Dance:{' '}
              <Term word="Choreography" definition="A saga coordination pattern where each service listens for events and decides independently what to do next. No central controller -- services 'dance' by reacting to each other's events." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-6">
              In choreography, there is no central coordinator. Each service listens for events, does its work,
              and emits a new event. Other services react to those events. It is like a dance where
              everyone knows their part.
            </p>

            {/* Choreography Visual */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">Event-Driven Saga Flow</p>

              {/* Services in a flow */}
              <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
                {choreoServices.map((svc, idx) => (
                  <div key={svc.label} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <ServiceNode
                        icon={svc.icon}
                        label={svc.label}
                        status={getChoreoStatus(idx)}
                        delay={idx * 0.05}
                      />
                      {getChoreoStatus(idx) === 'success' && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[9px] text-quest-success mt-1 bg-quest-success/10 px-2 py-0.5 rounded"
                        >
                          {svc.event}
                        </motion.p>
                      )}
                      {getChoreoStatus(idx) === 'fail' && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[9px] text-quest-danger mt-1 bg-quest-danger/10 px-2 py-0.5 rounded"
                        >
                          {svc.label.split(' ')[0]}Failed
                        </motion.p>
                      )}
                      {getChoreoStatus(idx) === 'compensated' && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[9px] text-quest-muted mt-1 bg-quest-muted/10 px-2 py-0.5 rounded"
                        >
                          Undone
                        </motion.p>
                      )}
                    </div>
                    {idx < choreoServices.length - 1 && (
                      <ArrowRight size={16} className={
                        getChoreoStatus(idx) === 'success' ? 'text-quest-success' :
                        getChoreoStatus(idx) === 'compensating' || getChoreoStatus(idx) === 'compensated' ? 'text-quest-secondary' :
                        'text-quest-muted'
                      } />
                    )}
                  </div>
                ))}
              </div>

              {/* Saga Progress Timeline */}
              {choreoPhase !== 'idle' && (
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-1">
                    {choreoServices.map((svc, idx) => {
                      const s = getChoreoStatus(idx)
                      return (
                        <div
                          key={idx}
                          className={`flex-1 h-2 rounded-full transition-colors duration-500 ${
                            s === 'success' ? 'bg-quest-success' :
                            s === 'fail' ? 'bg-quest-danger' :
                            s === 'pending' ? 'bg-quest-warning animate-pulse' :
                            s === 'compensating' ? 'bg-quest-secondary animate-pulse' :
                            s === 'compensated' ? 'bg-quest-muted' :
                            'bg-white/10'
                          }`}
                        />
                      )
                    })}
                  </div>
                  <p className="text-[10px] text-quest-muted text-center">Saga Progress</p>
                </div>
              )}

              {/* Status */}
              <div className="min-h-[40px] mb-4 text-center">
                {choreoPhase === 'idle' && <p className="text-sm text-quest-muted">Choose a scenario to run...</p>}
                {choreoPhase === 'running' && <p className="text-sm text-quest-success">Services processing events...</p>}
                {choreoPhase === 'success' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-success font-semibold">
                    Order completed successfully! All events propagated.
                  </motion.p>
                )}
                {choreoPhase === 'failed' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-danger font-semibold">
                    {choreoServices[choreoFailAt]?.label} failed! Starting compensating events...
                  </motion.p>
                )}
                {choreoPhase === 'compensating' && (
                  <p className="text-sm text-quest-secondary">Compensating transactions in progress (reverse event chain)...</p>
                )}
                {choreoPhase === 'compensated' && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-secondary font-semibold">
                    Saga compensated! All previous steps have been undone.
                  </motion.p>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={() => runChoreo(-1)}
                  disabled={choreoPhase === 'running' || choreoPhase === 'compensating'}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Play size={16} /> Happy Path
                </button>
                <button
                  onClick={() => runChoreo(2)}
                  disabled={choreoPhase === 'running' || choreoPhase === 'compensating'}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quest-danger/20 border border-quest-danger/40 text-quest-danger hover:bg-quest-danger/30 transition-colors disabled:opacity-50"
                >
                  <XCircle size={16} /> Fail at Inventory
                </button>
                <button
                  onClick={() => runChoreo(1)}
                  disabled={choreoPhase === 'running' || choreoPhase === 'compensating'}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quest-danger/20 border border-quest-danger/40 text-quest-danger hover:bg-quest-danger/30 transition-colors disabled:opacity-50"
                >
                  <XCircle size={16} /> Fail at Payment
                </button>
                {(choreoPhase === 'success' || choreoPhase === 'compensated') && (
                  <button
                    onClick={() => { setChoreoPhase('idle'); setChoreoStep(0); setChoreoFailAt(-1) }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Pros and Cons */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-success/5 border border-quest-success/20 rounded-xl p-5">
                <h4 className="font-semibold text-quest-success mb-3 flex items-center gap-2">
                  <CheckCircle size={16} /> Pros
                </h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>Simple -- services are loosely coupled</li>
                  <li>Event-driven and naturally async</li>
                  <li>No single point of failure</li>
                  <li>Easy to add new services (just subscribe to events)</li>
                </ul>
              </div>
              <div className="bg-quest-danger/5 border border-quest-danger/20 rounded-xl p-5">
                <h4 className="font-semibold text-quest-danger mb-3 flex items-center gap-2">
                  <XCircle size={16} /> Cons
                </h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>Hard to track overall saga state</li>
                  <li>Complex failure/compensation chains</li>
                  <li>Difficult to debug (events scattered across services)</li>
                  <li>Cyclic dependencies can emerge</li>
                </ul>
              </div>
            </div>

            <DeepDive id="choreo-at-scale" title="Choreography at Scale" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Complexity Explosion:</strong> With 3-4 services, choreography is manageable. With 10+
                services each emitting and consuming multiple events, the event flow becomes very hard to
                reason about. A single business process may involve dozens of events bouncing between services.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Debugging:</strong> When something goes wrong, you need to trace events across multiple
                services and message brokers. Distributed tracing tools (Jaeger, Zipkin) and correlation IDs
                are essential. Without them, finding the root cause of a failed saga is like finding a needle
                in a haystack.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Saga State Tracking:</strong> Some teams add a "saga state" service that listens to all
                events and maintains the current state of each saga instance. This gives visibility without
                adding a central coordinator -- a hybrid approach between pure choreography and orchestration.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Orchestration <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: ORCHESTRATION ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-rose-400" />
              The Conductor:{' '}
              <Term word="Orchestration" definition="A saga coordination pattern where a central orchestrator directs each step of the saga, telling services what to do and handling failures with compensating transactions. Provides clear visibility and control." onLearn={learnTerm} />
            </h2>

            <p className="text-quest-muted mb-6">
              In orchestration, a central Saga Orchestrator controls the entire flow. It sends commands to
              each service, waits for responses, and decides what to do next -- including running compensations
              on failure. Think of it as a conductor directing an orchestra.
            </p>

            {/* Orchestration Visual */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <p className="text-sm font-semibold mb-4 text-center">Saga Orchestrator Flow</p>

              {/* Orchestrator in center, services around it */}
              <div className="flex flex-col items-center gap-4 mb-6">
                {/* Orchestrator */}
                <motion.div
                  className={`rounded-xl border-2 p-4 text-center min-w-[160px] transition-colors duration-500 ${
                    orchPhase === 'running' ? 'border-quest-primary/60 bg-quest-primary/10' :
                    orchPhase === 'compensating' ? 'border-quest-secondary/60 bg-quest-secondary/10' :
                    orchPhase === 'done-success' ? 'border-quest-success/60 bg-quest-success/10' :
                    orchPhase === 'done-fail' ? 'border-quest-danger/60 bg-quest-danger/10' :
                    'border-quest-primary/30 bg-quest-surface'
                  }`}
                  animate={orchPhase === 'running' || orchPhase === 'compensating' ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ repeat: orchPhase === 'running' || orchPhase === 'compensating' ? Infinity : 0, duration: 1.5 }}
                >
                  <Server size={28} className="mx-auto mb-1 text-quest-primary" />
                  <p className="text-sm font-bold">Saga Orchestrator</p>
                  <p className="text-[10px] text-quest-muted mt-1">
                    {orchPhase === 'idle' && 'Waiting to start...'}
                    {orchPhase === 'running' && `Step ${orchStep}/4: Executing...`}
                    {orchPhase === 'compensating' && 'Failure detected! Compensating...'}
                    {orchPhase === 'done-success' && 'Saga completed successfully!'}
                    {orchPhase === 'done-fail' && 'Saga failed -- compensated all steps'}
                  </p>
                </motion.div>

                {/* Numbered connections to services */}
                <div className="flex items-start justify-center gap-4 flex-wrap">
                  {orchServices.map((svc, idx) => {
                    const completed = orchSteps.current.find(s => s.idx === idx)
                    const isCurrent = orchPhase === 'running' && orchStep === idx + 1
                    let status = 'idle'
                    if (completed) {
                      status = completed.result === 'fail' ? 'fail' :
                               completed.result === 'compensated' ? 'compensated' :
                               completed.result === 'notified' ? 'success' : 'success'
                    }
                    if (isCurrent) status = 'pending'

                    return (
                      <div key={svc.label} className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-quest-primary font-bold bg-quest-primary/20 rounded-full w-5 h-5 flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <ArrowDown size={14} className={
                            status === 'success' ? 'text-quest-success' :
                            status === 'fail' ? 'text-quest-danger' :
                            status === 'pending' ? 'text-quest-warning animate-bounce' :
                            status === 'compensated' ? 'text-quest-secondary' :
                            'text-quest-muted'
                          } />
                        </div>
                        <ServiceNode icon={svc.icon} label={svc.label} status={status} />
                        <p className="text-[9px] text-quest-muted">{svc.cmd}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Failure toggles */}
              <div className="mb-4">
                <p className="text-xs text-quest-muted text-center mb-2">Toggle failures (click a service to make it fail):</p>
                <div className="flex justify-center gap-3">
                  {orchServices.slice(0, 3).map((svc, idx) => (
                    <button
                      key={svc.label}
                      onClick={() => {
                        if (orchPhase === 'idle' || orchPhase === 'done-success' || orchPhase === 'done-fail') {
                          setOrchFailures(prev => {
                            const next = { ...prev }
                            if (next[idx]) delete next[idx]
                            else {
                              // Only one failure at a time
                              Object.keys(next).forEach(k => delete next[k])
                              next[idx] = true
                            }
                            return next
                          })
                        }
                      }}
                      className={`px-3 py-1.5 rounded text-xs border transition-colors ${
                        orchFailures[idx]
                          ? 'border-quest-danger/50 bg-quest-danger/20 text-quest-danger'
                          : 'border-white/10 text-quest-muted hover:border-white/30'
                      }`}
                    >
                      {orchFailures[idx] ? 'Fail' : 'OK'}: {svc.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              {orchPhase === 'done-success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-3 mb-4 text-center"
                >
                  <p className="text-sm text-quest-success font-semibold">All steps completed! Order fulfilled.</p>
                </motion.div>
              )}
              {orchPhase === 'done-fail' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-3 mb-4 text-center"
                >
                  <p className="text-sm text-quest-danger font-semibold">
                    Saga failed at step {Object.keys(orchFailures)[0] ? Number(Object.keys(orchFailures)[0]) + 1 : '?'}.
                    All previous steps compensated. Failure notification sent.
                  </p>
                </motion.div>
              )}

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => { setOrchPhase('idle'); setOrchStep(0); orchSteps.current = []; setTimeout(runOrch, 100) }}
                  disabled={orchPhase === 'running' || orchPhase === 'compensating'}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Play size={16} /> Run Orchestration
                </button>
                {(orchPhase === 'done-success' || orchPhase === 'done-fail') && (
                  <button
                    onClick={() => { setOrchPhase('idle'); setOrchStep(0); orchSteps.current = []; setOrchFailures({}) }}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Choreography vs Orchestration Comparison */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center">Choreography vs Orchestration</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-quest-muted">Aspect</th>
                      <th className="text-left py-2 px-3 text-quest-secondary">Choreography</th>
                      <th className="text-left py-2 px-3 text-quest-primary">Orchestration</th>
                    </tr>
                  </thead>
                  <tbody className="text-quest-muted">
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3 font-medium">Coupling</td>
                      <td className="py-2 px-3">Loose -- services only know events</td>
                      <td className="py-2 px-3">Central coordinator knows all services</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3 font-medium">Complexity</td>
                      <td className="py-2 px-3">Distributed in event handlers</td>
                      <td className="py-2 px-3">Centralized in orchestrator</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3 font-medium">Visibility</td>
                      <td className="py-2 px-3">Hard to trace end-to-end</td>
                      <td className="py-2 px-3">Easy to monitor and debug</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-3 font-medium">Single Point of Failure</td>
                      <td className="py-2 px-3">No</td>
                      <td className="py-2 px-3">Orchestrator (mitigated by HA)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3 font-medium">Best For</td>
                      <td className="py-2 px-3">Simple flows, few services</td>
                      <td className="py-2 px-3">Complex flows, many steps</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Outbox Pattern */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Database size={18} className="text-quest-primary" />
                <Term word="Outbox Pattern" definition="A pattern where events are written to an 'outbox' table in the same database transaction as the business data. A separate process reads the outbox and publishes events to the message broker, ensuring atomicity between data updates and event publishing." onLearn={learnTerm} />
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                Whether using choreography or orchestration, there is a fundamental problem: how do you update
                your database AND publish an event atomically? If you update the DB but the event publish fails,
                or vice versa, you get inconsistencies.
              </p>

              {/* Outbox Visual */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {/* Wrong way */}
                <div className="bg-quest-danger/5 border border-quest-danger/20 rounded-lg p-4">
                  <p className="text-xs font-semibold text-quest-danger mb-3">Without Outbox (Risky)</p>
                  <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1">
                    <p className="text-quest-muted">// Two separate operations</p>
                    <p><span className="text-quest-success">db</span>.save(order)     <span className="text-quest-success">// Step 1</span></p>
                    <p><span className="text-quest-danger">broker</span>.publish(event) <span className="text-quest-danger">// Step 2 - may fail!</span></p>
                  </div>
                  <p className="text-[10px] text-quest-danger mt-2">If Step 2 fails, DB is updated but no event is sent.</p>
                </div>

                {/* Right way */}
                <div className="bg-quest-success/5 border border-quest-success/20 rounded-lg p-4">
                  <p className="text-xs font-semibold text-quest-success mb-3">With Outbox (Safe)</p>
                  <div className="font-mono text-[11px] bg-quest-bg rounded p-3 space-y-1">
                    <p className="text-quest-muted">// Same DB transaction</p>
                    <p><span className="text-quest-success">BEGIN</span> TRANSACTION</p>
                    <p>  db.save(order)</p>
                    <p>  db.save(outbox_event)</p>
                    <p><span className="text-quest-success">COMMIT</span></p>
                    <p className="text-quest-muted mt-1">// Separate process polls outbox</p>
                    <p><span className="text-quest-secondary">relay</span>.publishPending()</p>
                  </div>
                  <p className="text-[10px] text-quest-success mt-2">Both writes succeed or fail together. Relay publishes reliably.</p>
                </div>
              </div>

              <div className="bg-quest-surface rounded-lg p-4">
                <div className="flex items-center gap-3 justify-center text-xs">
                  <div className="bg-quest-primary/10 border border-quest-primary/30 rounded px-3 py-2 text-center">
                    <Database size={16} className="mx-auto mb-1 text-quest-primary" />
                    <p className="font-medium">Service DB</p>
                    <p className="text-quest-muted">Orders + Outbox</p>
                  </div>
                  <ArrowRight size={16} className="text-quest-secondary" />
                  <div className="bg-quest-secondary/10 border border-quest-secondary/30 rounded px-3 py-2 text-center">
                    <Zap size={16} className="mx-auto mb-1 text-quest-secondary" />
                    <p className="font-medium">Relay / CDC</p>
                    <p className="text-quest-muted">Polls outbox</p>
                  </div>
                  <ArrowRight size={16} className="text-quest-primary" />
                  <div className="bg-quest-warning/10 border border-quest-warning/30 rounded px-3 py-2 text-center">
                    <Mail size={16} className="mx-auto mb-1 text-quest-warning" />
                    <p className="font-medium">Message Broker</p>
                    <p className="text-quest-muted">Kafka / RabbitMQ</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="orch-frameworks" title="Saga Orchestration Frameworks" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Temporal:</strong> An open-source durable execution platform. You write saga logic as
                regular code (with retries, timeouts, compensations), and Temporal ensures it runs to completion
                even if services crash. Used at Uber, Netflix, Snap, and Stripe.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>AWS Step Functions:</strong> A serverless orchestration service. Define your saga as a
                state machine with visual workflows. Built-in error handling, retries, and compensation steps.
                Great for AWS-native architectures.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Netflix Conductor:</strong> An open-source orchestration engine built by Netflix.
                Define workflows as JSON, with built-in task management, retries, and failure handling.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Cadence:</strong> Temporal's predecessor, also from Uber. Similar concepts but Temporal
                has evolved with better APIs, multi-language SDKs, and a managed cloud offering.
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
              <Shield className="text-rose-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Distributed transactions are tricky. Let's verify you understand sagas, compensation, and the tradeoffs!
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
                <h3 className="text-xl font-bold mb-2">Level 20 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand distributed transactions, the Saga Pattern, choreography vs orchestration,
                  compensating transactions, and the Outbox Pattern. Your microservices can handle failures gracefully!
                </p>
                <p className="text-sm text-rose-400">
                  No more lost payments, inconsistent state, or silent failures in your distributed systems.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

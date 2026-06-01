import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  ArrowUp, ArrowDown, Building, Users, Clock, ArrowRight
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

/* ── Constants ── */
const NUM_FLOORS = 20
const NUM_ELEVATORS = 4
const TICK_MS = 400

const ELEVATOR_STATES = {
  IDLE: 'idle',
  MOVING_UP: 'moving_up',
  MOVING_DOWN: 'moving_down',
  DOOR_OPEN: 'door_open',
}

const STATE_COLORS = {
  idle: 'bg-gray-500',
  moving_up: 'bg-green-500',
  moving_down: 'bg-blue-500',
  door_open: 'bg-yellow-500',
}

const STATE_LABELS = {
  idle: 'Idle',
  moving_up: 'Moving Up',
  moving_down: 'Moving Down',
  door_open: 'Door Open',
}

const ALGORITHMS = [
  { id: 'fcfs', name: 'FCFS', desc: 'First Come First Served - dispatches the first available elevator regardless of position' },
  { id: 'sstf', name: 'SSTF', desc: 'Shortest Seek Time First - dispatches the closest available elevator to the request' },
  { id: 'scan', name: 'SCAN', desc: 'Elevator Algorithm - elevator sweeps in one direction, servicing requests along the way' },
]

/* ── State machine transitions ── */
const stateTransitions = [
  { from: 'idle', to: 'moving_up', trigger: 'Request above current floor' },
  { from: 'idle', to: 'moving_down', trigger: 'Request below current floor' },
  { from: 'idle', to: 'door_open', trigger: 'Request at current floor' },
  { from: 'moving_up', to: 'door_open', trigger: 'Arrived at target floor' },
  { from: 'moving_up', to: 'moving_up', trigger: 'More requests above' },
  { from: 'moving_down', to: 'door_open', trigger: 'Arrived at target floor' },
  { from: 'moving_down', to: 'moving_down', trigger: 'More requests below' },
  { from: 'door_open', to: 'idle', trigger: 'No pending requests' },
  { from: 'door_open', to: 'moving_up', trigger: 'Next request above' },
  { from: 'door_open', to: 'moving_down', trigger: 'Next request below' },
]

/* ── Class design ── */
const classDesign = [
  {
    name: 'ElevatorSystem',
    type: 'Controller',
    color: 'text-quest-primary',
    fields: ['elevators: List<Elevator>', 'pendingRequests: Queue<Request>', 'strategy: SchedulingStrategy'],
    methods: ['requestElevator(floor, direction)', 'dispatch(request)', 'step()', 'getMetrics()'],
  },
  {
    name: 'Elevator',
    type: 'Entity',
    color: 'text-quest-secondary',
    fields: ['id: int', 'currentFloor: int', 'state: ElevatorState', 'direction: Direction', 'stops: SortedSet<int>'],
    methods: ['move()', 'addStop(floor)', 'openDoors()', 'closeDoors()', 'isIdle()'],
  },
  {
    name: 'Request',
    type: 'Value Object',
    color: 'text-quest-warning',
    fields: ['id: int', 'sourceFloor: int', 'direction: Direction', 'timestamp: long'],
    methods: ['getWaitTime(currentTime)'],
  },
  {
    name: 'SchedulingStrategy',
    type: 'Interface (Strategy Pattern)',
    color: 'text-quest-success',
    fields: [],
    methods: ['selectElevator(request, elevators): Elevator'],
  },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'Which scheduling algorithm minimizes average wait time by always picking the nearest elevator?',
    options: [
      { id: 'a', text: 'FCFS - First Come First Served', correct: false },
      { id: 'b', text: 'SSTF - Shortest Seek Time First', correct: true },
      { id: 'c', text: 'Round Robin', correct: false },
      { id: 'd', text: 'Priority Queue', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What design pattern allows swapping scheduling algorithms at runtime without changing the controller?',
    options: [
      { id: 'a', text: 'Observer Pattern', correct: false },
      { id: 'b', text: 'Singleton Pattern', correct: false },
      { id: 'c', text: 'Strategy Pattern', correct: true },
      { id: 'd', text: 'Factory Pattern', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'In the SCAN algorithm, what happens when an elevator reaches the top floor while moving up?',
    options: [
      { id: 'a', text: 'It stops and becomes idle immediately', correct: false },
      { id: 'b', text: 'It reverses direction and services requests going down', correct: true },
      { id: 'c', text: 'It teleports to the bottom floor', correct: false },
      { id: 'd', text: 'It waits for a new request before moving', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'How should concurrent elevator requests be handled to avoid race conditions?',
    options: [
      { id: 'a', text: 'Ignore concurrent requests and only process one at a time', correct: false },
      { id: 'b', text: 'Use a thread-safe queue and synchronize dispatch decisions', correct: true },
      { id: 'c', text: 'Give each elevator its own request queue with no coordination', correct: false },
      { id: 'd', text: 'Lock the entire system until each request completes', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is a key advantage of modeling elevator behavior as a state machine?',
    options: [
      { id: 'a', text: 'It makes the code run faster', correct: false },
      { id: 'b', text: 'It eliminates the need for a scheduling algorithm', correct: false },
      { id: 'c', text: 'It makes transitions explicit, preventing invalid states and simplifying debugging', correct: true },
      { id: 'd', text: 'It allows elevators to skip floors', correct: false },
    ],
  },
]

/* ── Helper: create initial elevators ── */
function createElevators() {
  return Array.from({ length: NUM_ELEVATORS }, (_, i) => ({
    id: i,
    currentFloor: Math.floor(Math.random() * 5) + 1,
    state: ELEVATOR_STATES.IDLE,
    targetFloor: null,
    stops: [],
    doorTimer: 0,
    totalDistance: 0,
  }))
}

/* ── Scheduling functions ── */
function dispatchFCFS(request, elevators) {
  const idle = elevators.filter(e => e.state === ELEVATOR_STATES.IDLE)
  if (idle.length > 0) return idle[0].id
  return elevators.reduce((best, e) =>
    e.stops.length < elevators[best].stops.length ? e.id : best
  , 0)
}

function dispatchSSTF(request, elevators) {
  let bestId = 0
  let bestDist = Infinity
  for (const e of elevators) {
    const dist = Math.abs(e.currentFloor - request.floor)
    const penalty = e.state === ELEVATOR_STATES.IDLE ? 0 : e.stops.length * 2
    if (dist + penalty < bestDist) {
      bestDist = dist + penalty
      bestId = e.id
    }
  }
  return bestId
}

function dispatchSCAN(request, elevators) {
  let bestId = 0
  let bestScore = Infinity
  for (const e of elevators) {
    const dist = Math.abs(e.currentFloor - request.floor)
    let score = dist
    if (e.state === ELEVATOR_STATES.IDLE) {
      score = dist
    } else if (e.state === ELEVATOR_STATES.MOVING_UP) {
      if (request.floor >= e.currentFloor) {
        score = request.floor - e.currentFloor
      } else {
        score = (NUM_FLOORS - e.currentFloor) + (NUM_FLOORS - request.floor)
      }
    } else if (e.state === ELEVATOR_STATES.MOVING_DOWN) {
      if (request.floor <= e.currentFloor) {
        score = e.currentFloor - request.floor
      } else {
        score = e.currentFloor + request.floor
      }
    }
    score += e.stops.length * 1.5
    if (score < bestScore) {
      bestScore = score
      bestId = e.id
    }
  }
  return bestId
}

const dispatchers = { fcfs: dispatchFCFS, sstf: dispatchSSTF, scan: dispatchSCAN }

/* ── Main component ── */
export default function Level46({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* Simulation state */
  const [elevators, setElevators] = useState(createElevators)
  const [algorithm, setAlgorithm] = useState('sstf')
  const [running, setRunning] = useState(false)
  const [requests, setRequests] = useState([])
  const [completedRequests, setCompletedRequests] = useState([])
  const [tickCount, setTickCount] = useState(0)
  const [highlightedElevator, setHighlightedElevator] = useState(null)

  /* Metrics */
  const [metrics, setMetrics] = useState({ avgWait: 0, totalDistance: 0, served: 0 })

  /* State machine highlight */
  const [activeTransition, setActiveTransition] = useState(null)

  /* Simulation tick */
  const tick = useCallback(() => {
    setElevators(prev => {
      const updated = prev.map(e => ({ ...e }))

      for (const elev of updated) {
        if (elev.state === ELEVATOR_STATES.DOOR_OPEN) {
          elev.doorTimer -= 1
          if (elev.doorTimer <= 0) {
            elev.stops = elev.stops.filter(s => s !== elev.currentFloor)
            if (elev.stops.length === 0) {
              elev.state = ELEVATOR_STATES.IDLE
              setActiveTransition({ from: 'door_open', to: 'idle' })
            } else {
              const nextStop = elev.stops[0]
              if (nextStop > elev.currentFloor) {
                elev.state = ELEVATOR_STATES.MOVING_UP
                setActiveTransition({ from: 'door_open', to: 'moving_up' })
              } else {
                elev.state = ELEVATOR_STATES.MOVING_DOWN
                setActiveTransition({ from: 'door_open', to: 'moving_down' })
              }
            }
          }
          continue
        }

        if (elev.state === ELEVATOR_STATES.MOVING_UP) {
          elev.currentFloor = Math.min(elev.currentFloor + 1, NUM_FLOORS)
          elev.totalDistance += 1
        } else if (elev.state === ELEVATOR_STATES.MOVING_DOWN) {
          elev.currentFloor = Math.max(elev.currentFloor - 1, 1)
          elev.totalDistance += 1
        }

        if (elev.stops.includes(elev.currentFloor)) {
          elev.state = ELEVATOR_STATES.DOOR_OPEN
          elev.doorTimer = 2
          setActiveTransition({ from: elev.state === ELEVATOR_STATES.MOVING_UP ? 'moving_up' : 'moving_down', to: 'door_open' })
        } else if (elev.state !== ELEVATOR_STATES.IDLE && elev.stops.length === 0) {
          elev.state = ELEVATOR_STATES.IDLE
        }

        if (elev.currentFloor >= NUM_FLOORS && elev.state === ELEVATOR_STATES.MOVING_UP) {
          if (elev.stops.some(s => s < elev.currentFloor)) {
            elev.state = ELEVATOR_STATES.MOVING_DOWN
            setActiveTransition({ from: 'moving_up', to: 'moving_down' })
          }
        }
        if (elev.currentFloor <= 1 && elev.state === ELEVATOR_STATES.MOVING_DOWN) {
          if (elev.stops.some(s => s > elev.currentFloor)) {
            elev.state = ELEVATOR_STATES.MOVING_UP
            setActiveTransition({ from: 'moving_down', to: 'moving_up' })
          }
        }
      }

      return updated
    })

    setRequests(prev => {
      const stillPending = []
      const nowComplete = []
      for (const r of prev) {
        const elev = elevators.find(e => e.id === r.assignedTo)
        if (elev && elev.currentFloor === r.floor && elev.state === ELEVATOR_STATES.DOOR_OPEN) {
          nowComplete.push({ ...r, servedAt: tickCount })
        } else {
          stillPending.push(r)
        }
      }
      if (nowComplete.length > 0) {
        setCompletedRequests(p => [...p, ...nowComplete])
      }
      return stillPending
    })

    setTickCount(t => t + 1)
  }, [elevators, tickCount])

  useEffect(() => {
    if (!running) return
    const interval = setInterval(tick, TICK_MS)
    return () => clearInterval(interval)
  }, [running, tick])

  /* Update metrics */
  useEffect(() => {
    if (completedRequests.length === 0) return
    const totalWait = completedRequests.reduce((sum, r) => sum + (r.servedAt - r.createdAt), 0)
    const totalDist = elevators.reduce((sum, e) => sum + e.totalDistance, 0)
    setMetrics({
      avgWait: (totalWait / completedRequests.length * (TICK_MS / 1000)).toFixed(1),
      totalDistance: totalDist,
      served: completedRequests.length,
    })
  }, [completedRequests, elevators])

  const addRequest = useCallback((floor) => {
    const request = { id: Date.now() + Math.random(), floor, createdAt: tickCount, assignedTo: null }
    const dispatcher = dispatchers[algorithm]
    const elevId = dispatcher(request, elevators)
    request.assignedTo = elevId

    setHighlightedElevator(elevId)
    setTimeout(() => setHighlightedElevator(null), 800)

    setElevators(prev => prev.map(e => {
      if (e.id !== elevId) return e
      const newStops = [...e.stops, floor].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b)
      let newState = e.state
      if (e.state === ELEVATOR_STATES.IDLE) {
        if (e.currentFloor === floor) {
          newState = ELEVATOR_STATES.DOOR_OPEN
          setActiveTransition({ from: 'idle', to: 'door_open' })
          return { ...e, stops: newStops, state: newState, doorTimer: 2 }
        }
        newState = floor > e.currentFloor ? ELEVATOR_STATES.MOVING_UP : ELEVATOR_STATES.MOVING_DOWN
        setActiveTransition({ from: 'idle', to: newState })
      }
      return { ...e, stops: newStops, state: newState }
    }))

    setRequests(prev => [...prev, request])
    if (!running) setRunning(true)
  }, [algorithm, elevators, tickCount, running])

  const addRandomRequests = useCallback((count) => {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const floor = Math.floor(Math.random() * NUM_FLOORS) + 1
        addRequest(floor)
      }, i * 300)
    }
  }, [addRequest])

  const resetSimulation = useCallback(() => {
    setRunning(false)
    setElevators(createElevators())
    setRequests([])
    setCompletedRequests([])
    setTickCount(0)
    setMetrics({ avgWait: 0, totalDistance: 0, served: 0 })
    setActiveTransition(null)
    setHighlightedElevator(null)
  }, [])

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      return q.options.find(o => o.id === selected)?.correct
    })
    if (allCorrect) onComplete?.()
  }

  /* Floor buttons for the building */
  const floorNumbers = Array.from({ length: NUM_FLOORS }, (_, i) => NUM_FLOORS - i)

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-quest-primary/20 text-quest-primary text-sm font-medium mb-4"
        >
          <Building size={16} />
          Level 46
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold mb-2"
        >
          Going Up: Design an Elevator System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-quest-muted max-w-2xl mx-auto"
        >
          A 50-floor building with 6 elevators. How do you minimize wait times?
          This classic LLD problem tests your understanding of state machines, scheduling, and
          the <Term word="Strategy Pattern" definition="A behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime." onLearn={learnTerm} />.
        </motion.p>
      </div>

      {/* ═══════════════════ NAV ═══════════════════ */}
      <div className="flex gap-2 flex-wrap justify-center mb-6">
        {['Story', 'Simulation', 'Design', 'State Machine', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentSection === i
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: STORY ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Building className="text-quest-primary" />
              The Problem
            </h2>
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <p className="text-quest-text leading-relaxed mb-4">
                You are the lead engineer at a prop-tech startup. Your client just signed a contract for
                a brand-new 50-floor skyscraper with 6 elevators. During peak hours, hundreds of people
                are waiting in lobbies, tapping their feet. The average wait time is over 3 minutes.
                Your job: design the software that controls every elevator in the building.
              </p>
              <p className="text-quest-muted text-sm leading-relaxed">
                This is a classic{' '}
                <Term word="Low-Level Design" definition="LLD focuses on class-level design: defining classes, interfaces, methods, and their interactions. It turns high-level architecture into concrete, implementable code structures." onLearn={learnTerm} />{' '}
                interview problem. Interviewers want to see how you model real-world entities, handle
                concurrency, and apply design patterns to produce clean, extensible code.
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-3">Key Concepts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: Clock, color: 'text-quest-primary', bg: 'bg-quest-primary/20',
                  title: 'State Machine',
                  desc: 'Each elevator transitions between well-defined states: idle, moving up, moving down, and door open.',
                },
                {
                  icon: Users, color: 'text-quest-secondary', bg: 'bg-quest-secondary/20',
                  title: 'Strategy Pattern',
                  desc: 'Encapsulate each scheduling algorithm behind a common interface so they can be swapped at runtime.',
                },
                {
                  icon: ArrowUp, color: 'text-quest-warning', bg: 'bg-quest-warning/20',
                  title: 'Scheduling Algorithms',
                  desc: 'FCFS, SSTF, and SCAN each trade off fairness, throughput, and starvation risk differently.',
                },
                {
                  icon: Building, color: 'text-quest-success', bg: 'bg-quest-success/20',
                  title: 'Concurrency',
                  desc: 'Multiple requests arrive simultaneously. The dispatcher must make thread-safe decisions.',
                },
              ].map(({ icon: Icon, color, bg, title, desc }) => (
                <div key={title} className="bg-quest-surface rounded-lg p-4 flex gap-3">
                  <div className={`${bg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={color} />
                  </div>
                  <div>
                    <p className="font-semibold text-quest-text text-sm">{title}</p>
                    <p className="text-quest-muted text-xs mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <DeepDive id="elevator-real-world" title="How Real Elevators Work" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Destination Dispatch:</strong> Modern buildings like One World Trade Center
                  use destination-dispatch systems. Instead of pressing up/down, you enter your desired floor at a kiosk.
                  The system groups passengers going to nearby floors into the same elevator, reducing stops and cutting
                  travel time by up to 30%.
                </p>
                <p>
                  <strong className="text-quest-text">Zone-Based Assignment:</strong> Tall buildings often divide floors into
                  zones (1-15, 16-30, 31-50) with dedicated elevators per zone. Express elevators skip lower floors entirely.
                  This is analogous to database sharding: partition the problem space to reduce contention.
                </p>
                <p>
                  <strong className="text-quest-text">Machine Learning:</strong> Companies like ThyssenKrupp use ML to predict
                  traffic patterns. The system learns that at 8:30 AM, most requests go from lobby to floors 20-35. It
                  pre-positions elevators at the lobby before the rush even starts.
                </p>
                <p>
                  <strong className="text-quest-text">The SCAN Algorithm:</strong> Also known as the "elevator algorithm" because
                  it mirrors how physical elevators operate: sweep up, service all requests in that direction, then sweep
                  down. It is the same algorithm used in disk scheduling (the disk head sweeps across platters).
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Try the Simulation
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: SIMULATION ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Building className="text-quest-primary" />
              Elevator Simulation
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              Click a floor button to request an elevator. The{' '}
              <Term word="Scheduling Algorithm" definition="An algorithm that decides which elevator should respond to a given floor request. Different algorithms optimize for different metrics like wait time, fairness, or throughput." onLearn={learnTerm} />{' '}
              will dispatch the best elevator based on the chosen strategy. Watch how different algorithms behave.
            </p>

            {/* Algorithm selector */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {ALGORITHMS.map(a => (
                <button
                  key={a.id}
                  onClick={() => { setAlgorithm(a.id); resetSimulation() }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    algorithm === a.id
                      ? 'bg-quest-primary text-white'
                      : 'bg-quest-surface text-quest-muted hover:text-quest-text border border-white/10'
                  }`}
                  title={a.desc}
                >
                  {a.name}
                </button>
              ))}
              <div className="flex-1" />
              <button
                onClick={() => addRandomRequests(5)}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-quest-secondary/20 text-quest-secondary hover:bg-quest-secondary/30 transition-all"
              >
                + 5 Random
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-quest-danger/20 text-quest-danger hover:bg-quest-danger/30 transition-all"
              >
                Reset
              </button>
            </div>

            {/* Algorithm description */}
            <div className="bg-quest-bg rounded-lg p-3 mb-4 border border-white/5">
              <p className="text-xs text-quest-muted">
                <span className="font-semibold text-quest-text">{ALGORITHMS.find(a => a.id === algorithm)?.name}:</span>{' '}
                {ALGORITHMS.find(a => a.id === algorithm)?.desc}
              </p>
            </div>

            {/* Building visualization */}
            <div className="flex gap-4">
              {/* Floor buttons */}
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <div className="text-xs text-quest-muted mb-1 text-center">Floor</div>
                {floorNumbers.map(floor => (
                  <button
                    key={floor}
                    onClick={() => addRequest(floor)}
                    className={`w-10 h-6 text-xs rounded flex items-center justify-center transition-all
                      ${requests.some(r => r.floor === floor)
                        ? 'bg-quest-warning/30 text-quest-warning border border-quest-warning/50'
                        : 'bg-quest-surface text-quest-muted hover:bg-quest-primary/20 hover:text-quest-primary border border-white/5'
                      }`}
                  >
                    {floor}
                  </button>
                ))}
              </div>

              {/* Elevator shafts */}
              <div className="flex gap-2 flex-1">
                {elevators.map(elev => (
                  <div key={elev.id} className="flex-1 flex flex-col">
                    <div className={`text-xs text-center mb-1 font-medium ${
                      highlightedElevator === elev.id ? 'text-quest-primary' : 'text-quest-muted'
                    }`}>
                      E{elev.id + 1}
                    </div>
                    <div className="relative bg-quest-bg rounded-lg border border-white/5 overflow-hidden" style={{ height: NUM_FLOORS * 24.5 + 'px' }}>
                      {/* Floor lines */}
                      {floorNumbers.map(floor => (
                        <div
                          key={floor}
                          className="absolute w-full border-b border-white/5"
                          style={{ top: `${((NUM_FLOORS - floor) / NUM_FLOORS) * 100}%` }}
                        />
                      ))}

                      {/* Stop indicators */}
                      {elev.stops.map(stop => (
                        <motion.div
                          key={`stop-${stop}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute w-full flex items-center justify-center"
                          style={{
                            top: `${((NUM_FLOORS - stop) / NUM_FLOORS) * 100}%`,
                            height: `${100 / NUM_FLOORS}%`,
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-quest-warning/50" />
                        </motion.div>
                      ))}

                      {/* Elevator car */}
                      <motion.div
                        animate={{
                          top: `${((NUM_FLOORS - elev.currentFloor) / NUM_FLOORS) * 100}%`,
                        }}
                        transition={{ duration: TICK_MS / 1000, ease: 'linear' }}
                        className={`absolute w-full flex items-center justify-center ${
                          highlightedElevator === elev.id ? 'z-10' : ''
                        }`}
                        style={{ height: `${100 / NUM_FLOORS}%` }}
                      >
                        <div className={`w-3/4 h-4 rounded-sm ${STATE_COLORS[elev.state]} ${
                          highlightedElevator === elev.id ? 'ring-2 ring-quest-primary ring-offset-1 ring-offset-quest-bg' : ''
                        } flex items-center justify-center transition-colors`}>
                          {elev.state === ELEVATOR_STATES.MOVING_UP && <ArrowUp size={10} className="text-white" />}
                          {elev.state === ELEVATOR_STATES.MOVING_DOWN && <ArrowDown size={10} className="text-white" />}
                          {elev.state === ELEVATOR_STATES.DOOR_OPEN && <span className="text-white text-[8px]">||</span>}
                        </div>
                      </motion.div>
                    </div>

                    {/* Elevator info */}
                    <div className="mt-1 text-center">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${STATE_COLORS[elev.state]} text-white`}>
                        F{elev.currentFloor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metrics panel */}
              <div className="flex-shrink-0 w-40 space-y-3">
                <div className="text-xs text-quest-muted mb-1 font-medium">Metrics</div>
                <div className="bg-quest-surface rounded-lg p-3 space-y-3">
                  <div>
                    <p className="text-[10px] text-quest-muted uppercase tracking-wide">Avg Wait</p>
                    <p className="text-lg font-bold text-quest-primary">{metrics.avgWait}s</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-quest-muted uppercase tracking-wide">Total Distance</p>
                    <p className="text-lg font-bold text-quest-secondary">{metrics.totalDistance} floors</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-quest-muted uppercase tracking-wide">Served</p>
                    <p className="text-lg font-bold text-quest-success">{metrics.served}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-quest-muted uppercase tracking-wide">Pending</p>
                    <p className="text-lg font-bold text-quest-warning">{requests.length}</p>
                  </div>
                </div>

                {/* State legend */}
                <div className="bg-quest-surface rounded-lg p-3">
                  <p className="text-[10px] text-quest-muted uppercase tracking-wide mb-2">States</p>
                  {Object.entries(STATE_LABELS).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-2 mb-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${STATE_COLORS[key]}`} />
                      <span className="text-[10px] text-quest-muted">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Pending requests */}
                {requests.length > 0 && (
                  <div className="bg-quest-surface rounded-lg p-3">
                    <p className="text-[10px] text-quest-muted uppercase tracking-wide mb-2">Queue</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {requests.map(r => (
                        <div key={r.id} className="flex items-center justify-between text-[10px]">
                          <span className="text-quest-muted">F{r.floor}</span>
                          <span className="text-quest-primary">E{r.assignedTo + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DeepDive id="algorithm-comparison" title="Algorithm Trade-offs: FCFS vs SSTF vs SCAN" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">FCFS (First Come First Served):</strong> The simplest approach.
                  Requests are served in order of arrival. Fair but inefficient: an elevator might travel 20 floors to
                  serve a request when another elevator is just 2 floors away. Good for low traffic, poor for peak hours.
                </p>
                <p>
                  <strong className="text-quest-text">SSTF (Shortest Seek Time First):</strong> Always dispatches the
                  nearest elevator. Minimizes average wait time but can cause{' '}
                  <Term word="Starvation" definition="A condition where a request waits indefinitely because newer, closer requests keep getting prioritized. The starved request never gets served." onLearn={learnTerm} />.
                  A request on floor 50 might wait forever if requests keep coming on floors 1-10.
                </p>
                <p>
                  <strong className="text-quest-text">SCAN (Elevator Algorithm):</strong> The elevator sweeps up, servicing
                  all requests in its path, then sweeps down. Prevents starvation because every floor is guaranteed to be
                  visited within one full sweep. The same algorithm is used in disk I/O scheduling.
                </p>
                <p>
                  <strong className="text-quest-text">In Practice:</strong> Most real systems use a hybrid approach.
                  SCAN as a baseline, with SSTF-like optimizations for idle elevators. Peak-hour heuristics pre-position
                  elevators at high-demand floors (lobby in the morning, office floors at 5 PM).
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                View the Design
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: CLASS DESIGN ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-quest-secondary" />
              Class Design
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              A well-structured elevator system uses the{' '}
              <Term word="Strategy Pattern" definition="A behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. The client code works with strategies through a common interface." onLearn={learnTerm} />{' '}
              to decouple scheduling logic from the controller. Here is the class diagram for our system.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {classDesign.map(cls => (
                <motion.div
                  key={cls.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-quest-bg rounded-xl p-5 border border-white/5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${cls.color === 'text-quest-primary' ? 'bg-quest-primary' : cls.color === 'text-quest-secondary' ? 'bg-quest-secondary' : cls.color === 'text-quest-warning' ? 'bg-quest-warning' : 'bg-quest-success'}`} />
                    <h3 className={`font-bold ${cls.color}`}>{cls.name}</h3>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-quest-muted">{cls.type}</span>
                  </div>
                  {cls.fields.length > 0 && (
                    <div className="mb-3">
                      <p className="text-[10px] uppercase tracking-wide text-quest-muted mb-1">Fields</p>
                      <div className="space-y-1">
                        {cls.fields.map(f => (
                          <div key={f} className="text-xs font-mono bg-quest-surface rounded px-2 py-1 text-quest-text">
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-quest-muted mb-1">Methods</p>
                    <div className="space-y-1">
                      {cls.methods.map(m => (
                        <div key={m} className="text-xs font-mono bg-quest-surface rounded px-2 py-1 text-quest-primary">
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Strategy pattern diagram */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-lg font-semibold mb-4 text-center">Strategy Pattern Flow</h3>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="bg-quest-primary/20 border border-quest-primary/30 rounded-lg px-4 py-3 text-center">
                  <p className="text-xs text-quest-muted">Controller</p>
                  <p className="font-semibold text-sm text-quest-primary">ElevatorSystem</p>
                </div>
                <ArrowRight size={16} className="text-quest-muted" />
                <div className="bg-quest-success/20 border border-quest-success/30 rounded-lg px-4 py-3 text-center">
                  <p className="text-xs text-quest-muted">Interface</p>
                  <p className="font-semibold text-sm text-quest-success">SchedulingStrategy</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-quest-muted" />
                    <div className="bg-quest-surface rounded px-3 py-1 text-xs font-mono text-quest-warning">FCFSStrategy</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-quest-muted" />
                    <div className="bg-quest-surface rounded px-3 py-1 text-xs font-mono text-quest-warning">SSTFStrategy</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 border-t border-dashed border-quest-muted" />
                    <div className="bg-quest-surface rounded px-3 py-1 text-xs font-mono text-quest-warning">SCANStrategy</div>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="concurrency-handling" title="Handling Concurrency in Elevator Systems" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Problem:</strong> Multiple people press buttons simultaneously.
                  Two threads might both decide that Elevator 3 is the best choice, overloading it while others sit idle.
                  This is a classic{' '}
                  <Term word="Race Condition" definition="A bug that occurs when the behavior of a system depends on the relative timing of events (like thread scheduling), leading to unpredictable results." onLearn={learnTerm} />.
                </p>
                <p>
                  <strong className="text-quest-text">Solution 1 - Synchronized Dispatch:</strong> Use a single-threaded
                  dispatcher with a thread-safe request queue. All requests go into a ConcurrentLinkedQueue. One dispatcher
                  thread processes them sequentially. Simple but can become a bottleneck.
                </p>
                <p>
                  <strong className="text-quest-text">Solution 2 - Lock-Free with CAS:</strong> Use Compare-And-Swap operations
                  to atomically assign elevators. If two threads try to assign the same elevator, one succeeds and the other
                  retries with updated state. Higher throughput but more complex code.
                </p>
                <p>
                  <strong className="text-quest-text">Solution 3 - Event Sourcing:</strong> Every button press is an immutable
                  event. A single event processor applies events in order and updates elevator assignments. This gives you
                  a perfect audit log and makes the system deterministic and easy to test.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="optimization-strategies" title="Optimization Strategies for Peak Hours" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Pre-positioning:</strong> During morning rush, park most elevators
                  at the lobby. During evening rush, distribute them across high-occupancy floors. Use historical data
                  to predict demand patterns.
                </p>
                <p>
                  <strong className="text-quest-text">Batching:</strong> If 10 people are going from lobby to floors 20-25,
                  assign them all to one elevator instead of five separate ones. This is the destination-dispatch approach.
                </p>
                <p>
                  <strong className="text-quest-text">Express Mode:</strong> During peak times, designate some elevators as
                  express (only stopping at lobby and high floors). Others handle local floors. This is similar to
                  database read replicas: specialize different resources for different workloads.
                </p>
                <p>
                  <strong className="text-quest-text">Load Balancing:</strong> Track the number of passengers in each elevator
                  (using weight sensors) and avoid dispatching to full elevators. This prevents the "everyone crowds into
                  one elevator" problem. Analogous to health-check-aware load balancers.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                State Machine
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: STATE MACHINE ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-quest-warning" />
              Elevator State Machine
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              Each elevator is modeled as a{' '}
              <Term word="Finite State Machine" definition="A computational model with a finite number of states, transitions between those states, and actions. At any given time, the machine is in exactly one state." onLearn={learnTerm} />.
              This makes behavior explicit, prevents invalid transitions, and simplifies debugging.
              {activeTransition && (
                <span className="ml-2 text-quest-primary">
                  Latest transition: {STATE_LABELS[activeTransition.from]} → {STATE_LABELS[activeTransition.to]}
                </span>
              )}
            </p>

            {/* State machine visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-sm font-semibold mb-4 text-quest-muted uppercase tracking-wide">States</h3>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {Object.entries(STATE_LABELS).map(([key, label]) => (
                  <motion.div
                    key={key}
                    animate={{
                      scale: activeTransition && (activeTransition.from === key || activeTransition.to === key) ? 1.1 : 1,
                      boxShadow: activeTransition?.to === key ? '0 0 20px rgba(99, 179, 237, 0.3)' : '0 0 0 transparent',
                    }}
                    className={`${STATE_COLORS[key]} rounded-xl px-6 py-4 text-center min-w-[120px]`}
                  >
                    <p className="text-white font-bold text-sm">{label}</p>
                    <p className="text-white/60 text-[10px] mt-1 font-mono">{key}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-sm font-semibold mb-4 text-quest-muted uppercase tracking-wide">Transitions</h3>
              <div className="space-y-2">
                {stateTransitions.map((t, i) => {
                  const isActive = activeTransition && activeTransition.from === t.from && activeTransition.to === t.to
                  return (
                    <motion.div
                      key={i}
                      animate={{ backgroundColor: isActive ? 'rgba(99, 179, 237, 0.1)' : 'transparent' }}
                      className={`flex items-center gap-3 p-2 rounded-lg text-sm ${isActive ? 'border border-quest-primary/30' : ''}`}
                    >
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${STATE_COLORS[t.from]} text-white`}>
                        {t.from}
                      </span>
                      <ArrowRight size={14} className={isActive ? 'text-quest-primary' : 'text-quest-muted'} />
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${STATE_COLORS[t.to]} text-white`}>
                        {t.to}
                      </span>
                      <span className="text-quest-muted text-xs flex-1">{t.trigger}</span>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Live elevator states */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3">Live Elevator States</h3>
              <p className="text-quest-muted text-xs mb-4">
                Go back to the Simulation tab, press some floor buttons, then return here to watch state transitions in real-time.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {elevators.map(elev => (
                  <div key={elev.id} className="bg-quest-bg rounded-lg p-3 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm">E{elev.id + 1}</span>
                      <span className="text-xs text-quest-muted">Floor {elev.currentFloor}</span>
                    </div>
                    <div className={`${STATE_COLORS[elev.state]} rounded px-2 py-1 text-center`}>
                      <span className="text-white text-xs font-medium">{STATE_LABELS[elev.state]}</span>
                    </div>
                    {elev.stops.length > 0 && (
                      <div className="mt-2 text-[10px] text-quest-muted">
                        Stops: {elev.stops.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="state-machine-benefits" title="Why State Machines Matter in LLD" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Explicit Behavior:</strong> Without a state machine, elevator logic
                  devolves into nested if-else chains: "if moving and arrived and has more stops and direction is up..."
                  A state machine replaces this with a clear transition table. Each state knows exactly which transitions
                  are valid.
                </p>
                <p>
                  <strong className="text-quest-text">Invalid State Prevention:</strong> An elevator cannot be "moving up"
                  and "door open" simultaneously. The state machine enforces this at the design level. You cannot transition
                  from moving_up to door_open without first arriving at a floor.
                </p>
                <p>
                  <strong className="text-quest-text">Testability:</strong> Each transition is independently testable.
                  "Given elevator in IDLE state, when request arrives at floor above, then state transitions to MOVING_UP."
                  This maps directly to unit tests.
                </p>
                <p>
                  <strong className="text-quest-text">Extensibility:</strong> Adding a new state (e.g., MAINTENANCE or
                  EMERGENCY) requires adding entries to the transition table. Existing states are unaffected. Compare this
                  to modifying a 500-line switch statement.
                </p>
                <p>
                  <strong className="text-quest-text">Visualization:</strong> State machines can be drawn as diagrams,
                  making them excellent communication tools in design discussions and interviews. The interviewer can
                  literally see your design.
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-sky-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Elevator system design covers state machines, scheduling algorithms, concurrency, and OOP patterns.
              Let us verify your understanding.
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
                <h3 className="text-xl font-bold mb-2">Level 46 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand elevator system design: state machines for elevator behavior,
                  the Strategy Pattern for swappable scheduling algorithms, and how to handle
                  concurrent requests safely. Going up?
                </p>
                <p className="text-sm text-sky-400">
                  The doors open. You step into a perfectly optimized ride to the top floor.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

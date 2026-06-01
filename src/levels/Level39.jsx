import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Gamepad2, Shuffle, ArrowRight, Zap, Shield } from 'lucide-react'

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

/* ── Sorting data ── */

function generateArray(size = 20) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 5)
}

function bubbleSortSteps(arr) {
  const steps = [{ array: [...arr], comparing: [], swapped: [], label: 'Start' }]
  const a = [...arr]
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapped: [], label: `Compare [${j}] and [${j + 1}]` })
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        steps.push({ array: [...a], comparing: [], swapped: [j, j + 1], label: `Swap [${j}] and [${j + 1}]` })
      }
    }
  }
  steps.push({ array: [...a], comparing: [], swapped: [], label: 'Done!' })
  return steps
}

function quickSortSteps(arr) {
  const steps = [{ array: [...arr], comparing: [], swapped: [], label: 'Start' }]
  const a = [...arr]

  function partition(lo, hi) {
    const pivot = a[hi]
    steps.push({ array: [...a], comparing: [hi], swapped: [], label: `Pivot = ${pivot} at [${hi}]` })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...a], comparing: [j, hi], swapped: [], label: `Compare [${j}]=${a[j]} with pivot ${pivot}` })
      if (a[j] <= pivot) {
        i++
        ;[a[i], a[j]] = [a[j], a[i]]
        if (i !== j) {
          steps.push({ array: [...a], comparing: [], swapped: [i, j], label: `Swap [${i}] and [${j}]` })
        }
      }
    }
    ;[a[i + 1], a[hi]] = [a[hi], a[i + 1]]
    steps.push({ array: [...a], comparing: [], swapped: [i + 1, hi], label: `Place pivot at [${i + 1}]` })
    return i + 1
  }

  function qs(lo, hi) {
    if (lo < hi) {
      const p = partition(lo, hi)
      qs(lo, p - 1)
      qs(p + 1, hi)
    }
  }

  qs(0, a.length - 1)
  steps.push({ array: [...a], comparing: [], swapped: [], label: 'Done!' })
  return steps
}

function mergeSortSteps(arr) {
  const steps = [{ array: [...arr], comparing: [], swapped: [], label: 'Start' }]
  const a = [...arr]

  function merge(lo, mid, hi) {
    const left = a.slice(lo, mid + 1)
    const right = a.slice(mid + 1, hi + 1)
    let i = 0, j = 0, k = lo

    steps.push({ array: [...a], comparing: Array.from({ length: hi - lo + 1 }, (_, idx) => lo + idx), swapped: [], label: `Merge [${lo}..${mid}] and [${mid + 1}..${hi}]` })

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        a[k] = left[i]
        i++
      } else {
        a[k] = right[j]
        j++
      }
      steps.push({ array: [...a], comparing: [], swapped: [k], label: `Place ${a[k]} at [${k}]` })
      k++
    }
    while (i < left.length) { a[k] = left[i]; i++; k++ }
    while (j < right.length) { a[k] = right[j]; j++; k++ }
    steps.push({ array: [...a], comparing: [], swapped: [], label: `Merged [${lo}..${hi}]` })
  }

  function ms(lo, hi) {
    if (lo < hi) {
      const mid = Math.floor((lo + hi) / 2)
      ms(lo, mid)
      ms(mid + 1, hi)
      merge(lo, mid, hi)
    }
  }

  ms(0, a.length - 1)
  steps.push({ array: [...a], comparing: [], swapped: [], label: 'Done!' })
  return steps
}

const sortingStrategies = {
  bubble: { name: 'Bubble Sort', fn: bubbleSortSteps, complexity: 'O(n^2)', color: 'text-red-400', bg: 'bg-red-500/20', desc: 'Simple but slow. Repeatedly swaps adjacent elements.' },
  quick: { name: 'Quick Sort', fn: quickSortSteps, complexity: 'O(n log n)', color: 'text-green-400', bg: 'bg-green-500/20', desc: 'Pick a pivot, partition around it. Fast on average.' },
  merge: { name: 'Merge Sort', fn: mergeSortSteps, complexity: 'O(n log n)', color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Divide in half, sort each half, merge. Stable and predictable.' },
}

/* ── Character state machine ── */

const characterStates = {
  idle: {
    label: 'Idle',
    emoji: '🧍',
    color: 'text-gray-400',
    bg: 'bg-gray-500/20',
    border: 'border-gray-500/40',
    behavior: 'Standing still. Stamina regenerating (+2/s). No movement cost.',
    transitions: ['walking'],
  },
  walking: {
    label: 'Walking',
    emoji: '🚶',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    behavior: 'Moving at 3 units/s. Stamina cost: 1/s. Can interact with objects.',
    transitions: ['idle', 'running'],
  },
  running: {
    label: 'Running',
    emoji: '🏃',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    behavior: 'Moving at 8 units/s. Stamina cost: 4/s. Cannot interact while running.',
    transitions: ['walking', 'jumping'],
  },
  jumping: {
    label: 'Jumping',
    emoji: '🦘',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/40',
    behavior: 'Airborne! Gravity applies. Stamina cost: 10 per jump. Damage on landing from height.',
    transitions: ['idle', 'walking'],
  },
}

/* ── Payment strategies ── */

const paymentMethods = [
  {
    id: 'credit',
    name: 'Credit Card',
    icon: '💳',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    steps: ['Validate card number', 'Check expiry & CVV', 'Contact payment gateway', 'Authorize charge', 'Return confirmation'],
    fee: '2.9% + $0.30',
    speed: '~2s',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    color: 'text-sky-400',
    bg: 'bg-sky-500/20',
    steps: ['Redirect to PayPal', 'User authenticates', 'PayPal authorizes', 'Callback to merchant', 'Confirm payment'],
    fee: '3.49% + $0.49',
    speed: '~4s',
  },
  {
    id: 'crypto',
    name: 'Crypto',
    icon: '₿',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    steps: ['Generate wallet address', 'User sends transaction', 'Wait for confirmations', 'Verify on blockchain', 'Credit account'],
    fee: 'Network gas fee',
    speed: '~10-60min',
  },
]

/* ── Quiz ── */

const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the key difference between the Strategy Pattern and the State Pattern?',
    options: [
      { id: 'a', text: 'Strategy is for classes, State is for functions', correct: false },
      { id: 'b', text: 'Strategy selects an algorithm at runtime; State changes behavior based on internal state transitions', correct: true },
      { id: 'c', text: 'They are exactly the same pattern with different names', correct: false },
      { id: 'd', text: 'State is faster than Strategy because it uses less memory', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'Why is the Strategy Pattern better than a chain of if-else statements?',
    options: [
      { id: 'a', text: 'It runs faster at runtime due to compiler optimizations', correct: false },
      { id: 'b', text: 'It uses less memory by avoiding branch prediction misses', correct: false },
      { id: 'c', text: 'It follows Open/Closed Principle: add new strategies without modifying existing code', correct: true },
      { id: 'd', text: 'If-else chains are always better for readability', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'In a state machine, what defines the valid state transitions?',
    options: [
      { id: 'a', text: 'The compiler determines valid transitions automatically', correct: false },
      { id: 'b', text: 'Each state object defines which states it can transition to and under what conditions', correct: true },
      { id: 'c', text: 'All states can transition to all other states by default', correct: false },
      { id: 'd', text: 'The user decides transitions at runtime with no restrictions', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What is the role of the Context in the Strategy Pattern?',
    options: [
      { id: 'a', text: 'It implements all the algorithms itself', correct: false },
      { id: 'b', text: 'It holds a reference to a strategy and delegates algorithm execution to it', correct: true },
      { id: 'c', text: 'It serves as a factory to create strategy objects', correct: false },
      { id: 'd', text: 'It validates input before passing it to the if-else chain', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'When should you use the State Pattern over simple boolean flags?',
    options: [
      { id: 'a', text: 'When you only have two possible states (on/off)', correct: false },
      { id: 'b', text: 'When performance is the only concern', correct: false },
      { id: 'c', text: 'When an object has many states with complex transition rules and state-specific behavior', correct: true },
      { id: 'd', text: 'Always, because boolean flags are an anti-pattern', correct: false },
    ],
  },
]

/* ══════════════════════════════════════════════════════ */

export default function Level39({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* Sorting strategy simulation */
  const [sortStrategy, setSortStrategy] = useState('bubble')
  const [sortArray, setSortArray] = useState(() => generateArray(16))
  const [sortSteps, setSortSteps] = useState([])
  const [sortStepIdx, setSortStepIdx] = useState(0)
  const [isSorting, setIsSorting] = useState(false)

  /* Character state machine */
  const [charState, setCharState] = useState('idle')
  const [stamina, setStamina] = useState(100)
  const [stateLog, setStateLog] = useState([{ from: null, to: 'idle', time: Date.now() }])

  /* Payment strategy */
  const [activePayment, setActivePayment] = useState(null)
  const [paymentStep, setPaymentStep] = useState(-1)
  const [paymentComplete, setPaymentComplete] = useState(false)

  /* Quiz */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Sorting simulation ── */

  const startSort = useCallback(() => {
    const arr = [...sortArray]
    const steps = sortingStrategies[sortStrategy].fn(arr)
    setSortSteps(steps)
    setSortStepIdx(0)
    setIsSorting(true)
  }, [sortArray, sortStrategy])

  useEffect(() => {
    if (!isSorting || sortStepIdx >= sortSteps.length) {
      if (sortStepIdx >= sortSteps.length && sortSteps.length > 0) {
        setIsSorting(false)
      }
      return
    }
    const speed = sortStrategy === 'bubble' ? 60 : sortStrategy === 'quick' ? 120 : 100
    const timer = setTimeout(() => {
      setSortStepIdx(prev => prev + 1)
    }, speed)
    return () => clearTimeout(timer)
  }, [isSorting, sortStepIdx, sortSteps.length, sortStrategy])

  const resetSort = () => {
    setIsSorting(false)
    setSortSteps([])
    setSortStepIdx(0)
    setSortArray(generateArray(16))
  }

  const currentSortStep = sortSteps[sortStepIdx] || { array: sortArray, comparing: [], swapped: [], label: 'Ready' }

  /* ── Stamina tick for character state ── */

  useEffect(() => {
    const interval = setInterval(() => {
      setStamina(prev => {
        if (charState === 'idle') return Math.min(100, prev + 2)
        if (charState === 'walking') return Math.max(0, prev - 1)
        if (charState === 'running') return Math.max(0, prev - 4)
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [charState])

  useEffect(() => {
    if (stamina <= 0 && (charState === 'running' || charState === 'walking')) {
      transitionCharState('idle')
    }
  }, [stamina, charState])

  const transitionCharState = (newState) => {
    if (newState === 'jumping' && stamina < 10) return
    if (newState === 'jumping') setStamina(prev => prev - 10)
    setStateLog(prev => [...prev.slice(-6), { from: charState, to: newState, time: Date.now() }])
    setCharState(newState)
  }

  /* ── Payment simulation ── */

  const startPayment = (methodId) => {
    setActivePayment(methodId)
    setPaymentStep(0)
    setPaymentComplete(false)
  }

  useEffect(() => {
    if (activePayment === null || paymentStep < 0) return
    const method = paymentMethods.find(m => m.id === activePayment)
    if (paymentStep >= method.steps.length) {
      setPaymentComplete(true)
      return
    }
    const timer = setTimeout(() => {
      setPaymentStep(prev => prev + 1)
    }, 800)
    return () => clearTimeout(timer)
  }, [activePayment, paymentStep])

  /* ── Quiz ── */

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (onComplete) onComplete()
  }

  const sectionTitles = ['The Problem', 'Strategy Pattern', 'State Pattern', 'Payment Strategies', 'Quiz']

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Level header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="concept-card text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Gamepad2 size={32} className="text-purple-400" />
          <h1 className="text-3xl font-bold">Choose Your Fighter</h1>
          <Shield size={32} className="text-purple-400" />
        </div>
        <p className="text-quest-muted max-w-2xl mx-auto">
          Your game character behaves differently when walking, running, or flying.
          The if-else chains are getting out of control. Time to learn the{' '}
          <Term word="Strategy Pattern" definition="A behavioral design pattern that defines a family of algorithms, encapsulates each one, and makes them interchangeable. The algorithm varies independently from the clients that use it." onLearn={learnTerm} />{' '}
          and{' '}
          <Term word="State Pattern" definition="A behavioral design pattern that allows an object to alter its behavior when its internal state changes. The object appears to change its class." onLearn={learnTerm} />.
        </p>
      </motion.div>

      {/* ── Section navigation ── */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sectionTitles.map((title, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
              ${currentSection === i
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
                : 'bg-quest-surface text-quest-muted border border-white/5 hover:border-white/20'}`}
          >
            {title}
          </button>
        ))}
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
              <Zap size={24} className="text-yellow-400" />
              The If-Else Nightmare
            </h2>
            <p className="text-quest-muted mb-4">
              Imagine you are building a game engine. Your character can be idle, walking, running, or jumping.
              Each state has completely different behavior: movement speed, stamina cost, available actions, and animation.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 border border-red-500/20 mb-6">
              <h3 className="text-sm font-semibold mb-3 text-red-400">The Naive Approach</h3>
              <pre className="text-xs text-quest-muted overflow-x-auto leading-relaxed">
{`function handleInput(character, input) {
  if (character.state === 'idle') {
    if (input === 'move') {
      character.state = 'walking'
      character.speed = 3
    } else if (input === 'run') {
      character.state = 'running'
      character.speed = 8
    }
  } else if (character.state === 'walking') {
    if (input === 'stop') {
      character.state = 'idle'
      character.speed = 0
    } else if (input === 'run') {
      character.state = 'running'
      // ... 200 more lines of this
    }
  }
  // ... every new state/action = more nesting
}`}
              </pre>
            </div>

            <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
              <h3 className="text-sm font-semibold mb-3 text-green-400">The Pattern-Based Approach</h3>
              <pre className="text-xs text-quest-muted overflow-x-auto leading-relaxed">
{`// Strategy Pattern: swap algorithms at runtime
class SortContext {
  constructor(strategy) { this.strategy = strategy }
  setStrategy(s) { this.strategy = s }
  sort(data) { return this.strategy.execute(data) }
}

// State Pattern: behavior changes with state
class Character {
  constructor() { this.state = new IdleState(this) }
  setState(s) { this.state = s }
  handleInput(input) { this.state.handleInput(input) }
}`}
              </pre>
            </div>

            <p className="text-sm text-quest-muted mt-4">
              Both patterns encapsulate varying behavior behind a common interface. The key difference is{' '}
              <strong className="text-quest-text">intent</strong>: Strategy lets the client pick an algorithm;
              State manages automatic transitions based on internal conditions.
            </p>

            <DeepDive id="open-closed" title="Open/Closed Principle & Why If-Else Fails" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Open/Closed Principle:</strong> Software entities should
                  be open for extension but closed for modification. Every time you add a new sorting algorithm
                  or character state to an if-else chain, you modify the existing function. This risks introducing
                  bugs in working code paths.
                </p>
                <p>
                  <strong className="text-quest-text">With Strategy/State:</strong> Adding a new algorithm or
                  state means creating a new class that implements the interface. Existing code is never touched.
                  The context object does not care which concrete strategy or state it holds.
                </p>
                <p>
                  <strong className="text-quest-text">Real-world scale:</strong> A game like Hollow Knight has
                  dozens of enemy states. An e-commerce platform may support 10+ payment methods. If-else chains
                  at that scale become unmaintainable spaghetti.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore Strategy Pattern
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: STRATEGY PATTERN (Sorting) ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Shuffle size={24} className="text-green-400" />
              Strategy Pattern: Sorting Algorithms
            </h2>
            <p className="text-quest-muted mb-6">
              The{' '}
              <Term word="Context" definition="The object that holds a reference to one of the concrete strategies. It delegates execution to the strategy object rather than implementing the algorithm itself. The client configures the context with a strategy." onLearn={learnTerm} />{' '}
              holds a sorting strategy. Swap the strategy at{' '}
              <Term word="Runtime Algorithm Selection" definition="The ability to choose which algorithm to execute while the program is running, rather than hardcoding it at compile time. Strategy Pattern enables this cleanly." onLearn={learnTerm} />{' '}
              and watch the behavior change without modifying any sorting code.
            </p>

            {/* Strategy selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {Object.entries(sortingStrategies).map(([key, strat]) => (
                <button
                  key={key}
                  onClick={() => { if (!isSorting) { setSortStrategy(key); resetSort() } }}
                  className={`p-4 rounded-xl border transition-all text-left
                    ${sortStrategy === key
                      ? `${strat.bg} border-current ring-1 ring-current/20 ${strat.color}`
                      : 'bg-quest-bg border-white/5 hover:border-white/20'}`}
                >
                  <h4 className={`text-sm font-bold ${sortStrategy === key ? strat.color : 'text-quest-text'}`}>
                    {strat.name}
                  </h4>
                  <p className="text-[10px] text-quest-muted mt-1">{strat.desc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs font-mono ${strat.color}`}>{strat.complexity}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Sorting visualization */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">
                    <span className={sortingStrategies[sortStrategy].color}>
                      {sortingStrategies[sortStrategy].name}
                    </span>{' '}
                    in Action
                  </h3>
                  <p className="text-xs text-quest-muted mt-1">
                    Step {sortStepIdx}/{sortSteps.length || '?'} &mdash; {currentSortStep.label}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={resetSort}
                    className="btn-secondary text-xs px-3 py-1"
                    disabled={isSorting}
                  >
                    Randomize
                  </button>
                  <button
                    onClick={startSort}
                    disabled={isSorting}
                    className="btn-primary text-xs px-3 py-1"
                  >
                    {isSorting ? 'Sorting...' : 'Sort!'}
                  </button>
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-[2px] h-40">
                {currentSortStep.array.map((val, i) => {
                  const isComparing = currentSortStep.comparing.includes(i)
                  const isSwapped = currentSortStep.swapped.includes(i)
                  let barColor = 'bg-quest-muted/40'
                  if (isComparing) barColor = 'bg-yellow-400'
                  else if (isSwapped) barColor = 'bg-green-400'
                  else if (isSorting) barColor = 'bg-purple-400/60'

                  return (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-t ${barColor} transition-colors duration-100`}
                      style={{ height: `${val}%` }}
                      layout
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )
                })}
              </div>

              {/* Step counter bar */}
              {sortSteps.length > 0 && (
                <div className="mt-3">
                  <div className="w-full h-2 bg-quest-surface rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${sortStrategy === 'bubble' ? 'bg-red-400' : sortStrategy === 'quick' ? 'bg-green-400' : 'bg-blue-400'}`}
                      animate={{ width: `${(sortStepIdx / sortSteps.length) * 100}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-quest-muted mt-1">
                    <span>Total steps: {sortSteps.length}</span>
                    <span>Strategy: {sortingStrategies[sortStrategy].complexity}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Context code example */}
            <div className="bg-quest-surface rounded-xl p-5 mt-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Zap size={16} className="text-purple-400" />
                How the Context Works
              </h4>
              <pre className="text-xs text-quest-muted overflow-x-auto leading-relaxed">
{`// The Context does NOT know which algorithm runs.
// It just calls strategy.sort() — polymorphism handles the rest.

const context = new SortContext(new ${sortStrategy === 'bubble' ? 'BubbleSort' : sortStrategy === 'quick' ? 'QuickSort' : 'MergeSort'}())
context.sort(data)  // uses ${sortingStrategies[sortStrategy].name}

// Swap at runtime — ZERO changes to Context code:
context.setStrategy(new ${sortStrategy === 'bubble' ? 'MergeSort' : 'BubbleSort'}())
context.sort(data)  // now uses ${sortStrategy === 'bubble' ? 'Merge Sort' : 'Bubble Sort'}`}
              </pre>
            </div>

            <DeepDive id="strategy-fp" title="Strategy Pattern in Functional Programming" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  In functional languages (or functional-style JS/TS), you do not need classes for strategies.
                  A strategy is just a function. The context accepts a function parameter:
                </p>
                <pre className="text-xs bg-quest-bg p-3 rounded-lg overflow-x-auto">
{`// Functional Strategy Pattern
const sort = (data, strategyFn) => strategyFn(data)

const bubbleSort = (data) => { /* ... */ }
const quickSort  = (data) => { /* ... */ }

sort(myData, bubbleSort)  // swap function = swap strategy
sort(myData, quickSort)`}
                </pre>
                <p>
                  This is why first-class functions make many OOP patterns simpler. In JavaScript,
                  you often use the Strategy Pattern without realizing it — anytime you pass a callback
                  that determines behavior, you are using a strategy.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                State Pattern
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: STATE PATTERN (Character) ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Gamepad2 size={24} className="text-purple-400" />
              State Pattern: Game Character
            </h2>
            <p className="text-quest-muted mb-6">
              A{' '}
              <Term word="State Machine" definition="A mathematical model of computation. An abstract machine that can be in exactly one of a finite number of states at any given time. It transitions between states in response to inputs/events." onLearn={learnTerm} />{' '}
              governs your character. Each state defines its own behavior and which transitions
              are valid. The character does not use if-else to decide what to do — it delegates to the current state object.
            </p>

            {/* Interactive state diagram */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/5 mb-6">
              <h3 className="text-sm font-semibold mb-4">State Transition Diagram</h3>
              <div className="relative">
                {/* State nodes */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(characterStates).map(([key, state]) => {
                    const isActive = charState === key
                    return (
                      <motion.div
                        key={key}
                        animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                        transition={isActive ? { duration: 1.5, repeat: Infinity } : {}}
                        className={`relative p-4 rounded-xl border-2 text-center transition-all
                          ${isActive
                            ? `${state.bg} ${state.border} ring-2 ring-current/20`
                            : 'bg-quest-surface border-white/10 opacity-60'}`}
                      >
                        <div className="text-3xl mb-2">{state.emoji}</div>
                        <h4 className={`text-sm font-bold ${isActive ? state.color : 'text-quest-text'}`}>
                          {state.label}
                        </h4>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-quest-bg"
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {/* Transition arrows (simplified) */}
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {characterStates[charState].transitions.map(targetKey => {
                    const target = characterStates[targetKey]
                    const canTransition = charState !== targetKey && (targetKey !== 'jumping' || stamina >= 10)
                    return (
                      <motion.button
                        key={targetKey}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => canTransition && transitionCharState(targetKey)}
                        disabled={!canTransition}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all
                          ${canTransition
                            ? `${target.bg} ${target.border} ${target.color} hover:brightness-110`
                            : 'bg-quest-surface/30 border-white/5 text-quest-muted/50 cursor-not-allowed'}`}
                      >
                        <ArrowRight size={14} />
                        Transition to {target.label} {target.emoji}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Current state behavior */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  {characterStates[charState].emoji}
                  <span className={characterStates[charState].color}>
                    Current State: {characterStates[charState].label}
                  </span>
                </h4>
                <p className="text-xs text-quest-muted mb-4">{characterStates[charState].behavior}</p>

                {/* Stamina bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-quest-muted">Stamina</span>
                    <span className={`font-bold ${stamina > 30 ? 'text-green-400' : stamina > 10 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {stamina}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-quest-surface rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${stamina > 30 ? 'bg-green-400' : stamina > 10 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      animate={{ width: `${stamina}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Valid transitions */}
                <div className="text-xs text-quest-muted">
                  <span className="font-medium text-quest-text">Can transition to: </span>
                  {characterStates[charState].transitions.map((t, i) => (
                    <span key={t}>
                      <span className={characterStates[t].color}>{characterStates[t].label}</span>
                      {i < characterStates[charState].transitions.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>

              {/* State log */}
              <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
                <h4 className="text-sm font-semibold mb-3">Transition Log</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {stateLog.map((entry, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="text-quest-muted w-16 flex-shrink-0 font-mono">
                        {new Date(entry.time).toLocaleTimeString().slice(0, 8)}
                      </span>
                      {entry.from ? (
                        <>
                          <span className={characterStates[entry.from].color}>
                            {characterStates[entry.from].label}
                          </span>
                          <ArrowRight size={10} className="text-quest-muted" />
                          <span className={characterStates[entry.to].color}>
                            {characterStates[entry.to].label}
                          </span>
                        </>
                      ) : (
                        <span className={characterStates[entry.to].color}>
                          Initial: {characterStates[entry.to].label}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* State pattern code */}
            <div className="bg-quest-surface rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-3">State Pattern Structure</h4>
              <pre className="text-xs text-quest-muted overflow-x-auto leading-relaxed">
{`class IdleState {
  constructor(character) { this.character = character }
  handleInput(input) {
    if (input === 'move') {
      this.character.setState(new WalkingState(this.character))
    }
    // Each state only knows its OWN transitions
  }
  update() {
    this.character.stamina += 2  // state-specific behavior
  }
}

class RunningState {
  handleInput(input) {
    if (input === 'jump' && this.character.stamina >= 10) {
      this.character.setState(new JumpingState(this.character))
    }
    if (input === 'stop') {
      this.character.setState(new WalkingState(this.character))
    }
  }
  update() {
    this.character.stamina -= 4
    this.character.x += 8  // faster movement
  }
}`}
              </pre>
            </div>

            <DeepDive id="state-machines-production" title="State Machines in Production: XState" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">XState</strong> is a popular JavaScript library for
                  finite state machines and statecharts. It is used by companies like Netflix, Microsoft,
                  and Shopify for managing complex UI state, form workflows, and business logic.
                </p>
                <p>
                  Key benefits over ad-hoc state management: (1) impossible states are literally impossible
                  to reach, (2) transitions are declarative and visualizable, (3) side effects are explicit,
                  (4) the state diagram IS the code.
                </p>
                <pre className="text-xs bg-quest-bg p-3 rounded-lg overflow-x-auto">
{`import { createMachine } from 'xstate'

const characterMachine = createMachine({
  initial: 'idle',
  states: {
    idle: { on: { MOVE: 'walking' } },
    walking: { on: { STOP: 'idle', RUN: 'running' } },
    running: { on: { SLOW: 'walking', JUMP: 'jumping' } },
    jumping: { on: { LAND: 'idle' } },
  },
})`}
                </pre>
                <p>
                  XState can generate visual state diagrams from this code, making complex behavior
                  self-documenting.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Payment Strategies
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: PAYMENT STRATEGIES ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Shield size={24} className="text-blue-400" />
              Strategy Pattern: Payment Methods
            </h2>
            <p className="text-quest-muted mb-6">
              Another classic Strategy example: plugging different payment methods at runtime.
              The checkout system (Context) does not care HOW payment is processed — it delegates to
              whichever{' '}
              <Term word="Strategy" definition="A concrete implementation of an algorithm that conforms to the strategy interface. Multiple strategies can be swapped in and out of the context without changing the context's code." onLearn={learnTerm} />{' '}
              is currently selected.
            </p>

            {/* Payment method cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {paymentMethods.map(method => {
                const isActive = activePayment === method.id
                return (
                  <motion.button
                    key={method.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => startPayment(method.id)}
                    className={`text-left p-5 rounded-xl border transition-all
                      ${isActive
                        ? `${method.bg} border-current ring-1 ring-current/20 ${method.color}`
                        : 'bg-quest-bg border-white/5 hover:border-white/20'}`}
                  >
                    <div className="text-3xl mb-3">{method.icon}</div>
                    <h4 className={`text-sm font-bold ${isActive ? method.color : 'text-quest-text'}`}>
                      {method.name}
                    </h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-[10px] text-quest-muted">Fee: {method.fee}</p>
                      <p className="text-[10px] text-quest-muted">Speed: {method.speed}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Payment processing animation */}
            <AnimatePresence mode="wait">
              {activePayment && (
                <motion.div
                  key={activePayment}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-quest-bg rounded-xl p-6 border border-white/10 mb-6">
                    <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                      <span>{paymentMethods.find(m => m.id === activePayment)?.icon}</span>
                      Processing via {paymentMethods.find(m => m.id === activePayment)?.name}...
                    </h4>
                    <div className="space-y-3">
                      {paymentMethods.find(m => m.id === activePayment)?.steps.map((step, i) => {
                        const isComplete = paymentStep > i
                        const isCurrent = paymentStep === i
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                              ${isComplete
                                ? 'bg-green-500/20 text-green-400'
                                : isCurrent
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-quest-surface text-quest-muted'}`}
                            >
                              {isComplete ? (
                                <CheckCircle size={16} />
                              ) : isCurrent ? (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full"
                                />
                              ) : (
                                <span className="text-xs">{i + 1}</span>
                              )}
                            </div>
                            <span className={`text-sm ${isComplete ? 'text-green-400' : isCurrent ? 'text-yellow-400' : 'text-quest-muted'}`}>
                              {step}
                            </span>
                          </motion.div>
                        )
                      })}
                    </div>

                    {paymentComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center"
                      >
                        <CheckCircle size={24} className="mx-auto text-green-400 mb-2" />
                        <p className="text-sm text-green-400 font-semibold">Payment Complete!</p>
                        <p className="text-xs text-quest-muted mt-1">
                          Strategy: {paymentMethods.find(m => m.id === activePayment)?.name} executed successfully
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Strategy vs State comparison */}
            <div className="bg-quest-surface rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Strategy vs State Pattern Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Aspect</th>
                      <th className="text-left py-2 px-3 text-green-400 font-medium">Strategy</th>
                      <th className="text-left py-2 px-3 text-purple-400 font-medium">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Intent', 'Choose an algorithm at runtime', 'Change behavior when state changes'],
                      ['Who decides?', 'Client picks the strategy', 'State transitions happen internally'],
                      ['Awareness', 'Strategies are unaware of each other', 'States know their valid transitions'],
                      ['Example', 'Sorting algorithms, payment methods', 'Game character, TCP connection, UI flows'],
                      ['Transition', 'Client swaps strategy explicitly', 'Context changes state automatically on events'],
                      ['Number of instances', 'One strategy at a time', 'One state at a time, but states chain'],
                    ].map(([aspect, strat, state], i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 px-3 font-medium text-quest-text">{aspect}</td>
                        <td className="py-2 px-3 text-quest-muted">{strat}</td>
                        <td className="py-2 px-3 text-quest-muted">{state}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* UML-like diagram */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Strategy Pattern Structure</h4>
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Context */}
                <div className="bg-quest-surface rounded-lg p-4 border border-purple-500/30 min-w-[180px]">
                  <h5 className="text-xs font-bold text-purple-400 text-center mb-2">Context</h5>
                  <div className="text-[10px] text-quest-muted space-y-1 border-t border-white/10 pt-2">
                    <p>- strategy: Strategy</p>
                    <div className="border-t border-white/10 pt-1 mt-1">
                      <p>+ setStrategy(s)</p>
                      <p>+ executeStrategy()</p>
                    </div>
                  </div>
                </div>

                <ArrowRight size={20} className="text-quest-muted rotate-0 md:rotate-0 flex-shrink-0" />

                {/* Strategy interface */}
                <div className="bg-quest-surface rounded-lg p-4 border border-green-500/30 min-w-[180px]">
                  <h5 className="text-xs font-bold text-green-400 text-center mb-2">{'<<interface>>'}</h5>
                  <h5 className="text-xs font-bold text-green-400 text-center mb-2">Strategy</h5>
                  <div className="text-[10px] text-quest-muted border-t border-white/10 pt-2">
                    <p>+ execute(data)</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {['ConcreteA', 'ConcreteB', 'ConcreteC'].map(name => (
                    <div key={name} className="bg-quest-surface rounded-lg px-3 py-2 border border-white/10 text-[10px]">
                      <span className="text-sky-400">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DeepDive id="real-world-strategy" title="Real-World Strategy & State Examples" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Strategy in the wild:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>React Router choosing between BrowserRouter, HashRouter, and MemoryRouter</li>
                  <li>Webpack loaders: different strategies for transforming file types</li>
                  <li>Auth middleware: JWT strategy, OAuth strategy, API key strategy (Passport.js)</li>
                  <li>Compression: gzip vs brotli vs zstd — same interface, different algorithms</li>
                </ul>
                <p className="mt-3">
                  <strong className="text-quest-text">State in the wild:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>TCP connection: CLOSED, LISTEN, SYN_SENT, ESTABLISHED, FIN_WAIT, etc.</li>
                  <li>Order lifecycle: PLACED, PAID, SHIPPED, DELIVERED, RETURNED</li>
                  <li>Media player: STOPPED, PLAYING, PAUSED, BUFFERING</li>
                  <li>CI/CD pipeline: QUEUED, BUILDING, TESTING, DEPLOYING, SUCCESS/FAILURE</li>
                </ul>
              </div>
            </DeepDive>

            <DeepDive id="when-to-use" title="When to Use Each Pattern" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Use Strategy when:</strong> You have a family of
                  interchangeable algorithms and the client should pick one. The algorithms do not depend
                  on each other and the context does not change strategy on its own.
                </p>
                <p>
                  <strong className="text-quest-text">Use State when:</strong> An object's behavior
                  depends heavily on its internal state, there are many states with complex transition
                  rules, and state transitions should happen automatically based on events — not via
                  external client decisions.
                </p>
                <p>
                  <strong className="text-quest-text">Red flags you need these patterns:</strong> (1) Large
                  switch/if-else on a type or state field, (2) conditional behavior scattered across many methods,
                  (3) adding a new variant requires touching many files, (4) you cannot unit-test behaviors
                  independently.
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
              <CheckCircle className="text-purple-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Strategy and State patterns are foundational to clean, extensible architecture.
              Let's verify your understanding.
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
                                : 'border-purple-500 bg-purple-500/10'
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
                <h3 className="text-xl font-bold mb-2">Level 39 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Strategy and State patterns. No more if-else nightmares —
                  your game character can walk, run, jump, and idle with clean, extensible code.
                  Your payment system accepts any method without rewrites.
                </p>
                <p className="text-sm text-purple-400">
                  Choose your fighter wisely. The pattern you pick shapes the architecture forever.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

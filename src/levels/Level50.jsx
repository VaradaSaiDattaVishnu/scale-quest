import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Coffee, Coins, Package, RotateCcw, ShoppingCart } from 'lucide-react'

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

/* ── Product catalog ── */
const PRODUCTS = [
  { id: 'cola', name: 'Cola', price: 1.50, icon: '🥤', stock: 3 },
  { id: 'chips', name: 'Chips', price: 1.25, icon: '🍟', stock: 2 },
  { id: 'coffee', name: 'Coffee', price: 2.00, icon: '☕', stock: 4 },
  { id: 'candy', name: 'Candy Bar', price: 0.75, icon: '🍫', stock: 1 },
  { id: 'water', name: 'Water', price: 1.00, icon: '💧', stock: 5 },
  { id: 'juice', name: 'Juice', price: 1.75, icon: '🧃', stock: 0 },
]

const COINS = [
  { label: '$0.25', value: 0.25 },
  { label: '$0.50', value: 0.50 },
  { label: '$1.00', value: 1.00 },
  { label: '$2.00', value: 2.00 },
]

/* ── State machine definition ── */
const STATES = {
  IDLE: 'Idle',
  HAS_MONEY: 'HasMoney',
  PRODUCT_SELECTED: 'ProductSelected',
  DISPENSING: 'Dispensing',
  RETURNING_CHANGE: 'ReturningChange',
}

const STATE_DESCRIPTIONS = {
  [STATES.IDLE]: 'Waiting for user interaction. Insert coins to begin.',
  [STATES.HAS_MONEY]: 'Coins inserted. Select a product or insert more coins.',
  [STATES.PRODUCT_SELECTED]: 'Product selected. Verifying funds and stock...',
  [STATES.DISPENSING]: 'Dispensing your product. Please wait...',
  [STATES.RETURNING_CHANGE]: 'Returning your change. Transaction complete.',
}

const TRANSITIONS = [
  { from: STATES.IDLE, to: STATES.HAS_MONEY, trigger: 'insertCoin' },
  { from: STATES.HAS_MONEY, to: STATES.HAS_MONEY, trigger: 'insertCoin' },
  { from: STATES.HAS_MONEY, to: STATES.PRODUCT_SELECTED, trigger: 'selectProduct' },
  { from: STATES.HAS_MONEY, to: STATES.RETURNING_CHANGE, trigger: 'cancel' },
  { from: STATES.PRODUCT_SELECTED, to: STATES.DISPENSING, trigger: 'dispense' },
  { from: STATES.PRODUCT_SELECTED, to: STATES.RETURNING_CHANGE, trigger: 'insufficientFunds' },
  { from: STATES.DISPENSING, to: STATES.RETURNING_CHANGE, trigger: 'dispensed' },
  { from: STATES.DISPENSING, to: STATES.IDLE, trigger: 'dispensedNoChange' },
  { from: STATES.RETURNING_CHANGE, to: STATES.IDLE, trigger: 'changeReturned' },
]

/* ── State colors for the diagram ── */
const STATE_COLORS = {
  [STATES.IDLE]: { bg: 'bg-slate-500/20', border: 'border-slate-400', text: 'text-slate-300' },
  [STATES.HAS_MONEY]: { bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-300' },
  [STATES.PRODUCT_SELECTED]: { bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-300' },
  [STATES.DISPENSING]: { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-300' },
  [STATES.RETURNING_CHANGE]: { bg: 'bg-purple-500/20', border: 'border-purple-400', text: 'text-purple-300' },
}

/* ── Class design data ── */
const CLASS_DESIGN = [
  {
    name: 'VendingMachine',
    type: 'Context',
    color: 'from-quest-primary to-blue-500',
    fields: ['currentState: State', 'inventory: Map<String, Product>', 'balance: double'],
    methods: ['insertCoin(coin)', 'selectProduct(code)', 'dispense()', 'returnChange()', 'setState(state)'],
  },
  {
    name: 'State (Interface)',
    type: 'State Interface',
    color: 'from-yellow-500 to-orange-500',
    fields: [],
    methods: ['insertCoin(machine, coin)', 'selectProduct(machine, code)', 'dispense(machine)', 'cancel(machine)'],
  },
  {
    name: 'IdleState',
    type: 'Concrete State',
    color: 'from-slate-500 to-gray-500',
    fields: [],
    methods: ['insertCoin() -> HasMoneyState', 'selectProduct() -> error', 'dispense() -> error', 'cancel() -> noop'],
  },
  {
    name: 'HasMoneyState',
    type: 'Concrete State',
    color: 'from-yellow-600 to-amber-500',
    fields: [],
    methods: ['insertCoin() -> add to balance', 'selectProduct() -> ProductSelectedState', 'dispense() -> error', 'cancel() -> ReturnChangeState'],
  },
  {
    name: 'Product',
    type: 'Entity',
    color: 'from-green-500 to-emerald-500',
    fields: ['code: String', 'name: String', 'price: double', 'quantity: int'],
    methods: ['isAvailable()', 'decrementStock()'],
  },
  {
    name: 'Inventory',
    type: 'Manager',
    color: 'from-purple-500 to-violet-500',
    fields: ['products: Map<String, Product>'],
    methods: ['getProduct(code)', 'restock(code, qty)', 'isInStock(code)'],
  },
]

/* ── Quiz questions ── */
const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: 'What design pattern is most central to modeling a vending machine\'s behavior?',
    options: [
      { id: 'a', text: 'Observer Pattern -- products notify the machine when stock changes', correct: false },
      { id: 'b', text: 'State Pattern -- the machine delegates behavior to its current state object', correct: true },
      { id: 'c', text: 'Strategy Pattern -- different dispensing algorithms are swapped at runtime', correct: false },
      { id: 'd', text: 'Factory Pattern -- each product type creates its own dispenser', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What should happen when a user selects a product but has insufficient funds?',
    options: [
      { id: 'a', text: 'Dispense the product anyway and track the debt', correct: false },
      { id: 'b', text: 'Silently cancel the transaction and return to Idle', correct: false },
      { id: 'c', text: 'Display an error message and remain in HasMoney state so the user can insert more coins', correct: true },
      { id: 'd', text: 'Automatically return all inserted money and reset to Idle', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Why is the State Pattern preferred over a large if-else/switch block for state transitions?',
    options: [
      { id: 'a', text: 'It is faster at runtime because it avoids conditional branching', correct: false },
      { id: 'b', text: 'Each state encapsulates its own behavior, making the code open for extension and closed for modification (OCP)', correct: true },
      { id: 'c', text: 'Switch statements cannot handle more than 5 states', correct: false },
      { id: 'd', text: 'The State Pattern uses less memory than conditionals', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'How should the vending machine handle the case where a selected product is out of stock?',
    options: [
      { id: 'a', text: 'Throw an exception and crash the machine', correct: false },
      { id: 'b', text: 'Show an out-of-stock message, keep the balance, and let the user pick another product', correct: true },
      { id: 'c', text: 'Automatically select the next cheapest available product', correct: false },
      { id: 'd', text: 'Return all money and power off the machine', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'In the vending machine state machine, which state transition is triggered after dispensing when there is remaining change?',
    options: [
      { id: 'a', text: 'Dispensing -> Idle (skip change)', correct: false },
      { id: 'b', text: 'Dispensing -> HasMoney (keep leftover balance)', correct: false },
      { id: 'c', text: 'Dispensing -> ReturningChange -> Idle', correct: true },
      { id: 'd', text: 'Dispensing -> ProductSelected (re-select)', correct: false },
    ],
  },
  {
    id: 'q6',
    question: 'Which class is responsible for tracking available quantities of each product?',
    options: [
      { id: 'a', text: 'VendingMachine -- it handles everything including stock counts', correct: false },
      { id: 'b', text: 'State -- each state tracks its own inventory view', correct: false },
      { id: 'c', text: 'Inventory / Product -- dedicated classes with stock management methods', correct: true },
      { id: 'd', text: 'CoinSlot -- it validates stock before accepting coins', correct: false },
    ],
  },
]

/* ── Main Component ── */

export default function Level50({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* -- Vending machine simulation state -- */
  const [machineState, setMachineState] = useState(STATES.IDLE)
  const [balance, setBalance] = useState(0)
  const [inventory, setInventory] = useState(() =>
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: { ...p } }), {})
  )
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [log, setLog] = useState([])
  const [dispensedItem, setDispensedItem] = useState(null)
  const [changeAmount, setChangeAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const dispenseTimerRef = useRef(null)
  const changeTimerRef = useRef(null)

  const sections = ['story', 'simulation', 'states', 'design', 'quiz']
  const sectionLabels = ['Story', 'Simulation', 'State Machine', 'Class Design', 'Quiz']

  useEffect(() => {
    return () => {
      clearTimeout(dispenseTimerRef.current)
      clearTimeout(changeTimerRef.current)
    }
  }, [])

  const addLog = useCallback((msg) => {
    setLog(prev => [...prev.slice(-14), msg])
  }, [])

  /* -- Machine actions -- */
  const insertCoin = useCallback((coinValue) => {
    setErrorMessage('')
    if (machineState === STATES.IDLE || machineState === STATES.HAS_MONEY) {
      setBalance(prev => {
        const newBalance = Math.round((prev + coinValue) * 100) / 100
        addLog(`Inserted $${coinValue.toFixed(2)} -- Balance: $${newBalance.toFixed(2)}`)
        return newBalance
      })
      setMachineState(STATES.HAS_MONEY)
    }
  }, [machineState, addLog])

  const selectProduct = useCallback((productId) => {
    setErrorMessage('')
    if (machineState !== STATES.HAS_MONEY) {
      setErrorMessage('Insert coins first!')
      addLog('Error: No coins inserted.')
      return
    }

    const product = inventory[productId]
    if (!product) return

    if (product.stock <= 0) {
      setErrorMessage(`${product.name} is out of stock!`)
      addLog(`Error: ${product.name} is out of stock.`)
      return
    }

    if (balance < product.price) {
      setErrorMessage(`Insufficient funds! Need $${product.price.toFixed(2)}, have $${balance.toFixed(2)}.`)
      addLog(`Error: Insufficient funds for ${product.name}. Need $${(product.price - balance).toFixed(2)} more.`)
      return
    }

    setSelectedProduct(product)
    setMachineState(STATES.PRODUCT_SELECTED)
    addLog(`Selected: ${product.name} ($${product.price.toFixed(2)})`)

    /* Auto-transition to dispensing */
    dispenseTimerRef.current = setTimeout(() => {
      setMachineState(STATES.DISPENSING)
      addLog(`Dispensing ${product.name}...`)

      setInventory(prev => ({
        ...prev,
        [productId]: { ...prev[productId], stock: prev[productId].stock - 1 },
      }))

      dispenseTimerRef.current = setTimeout(() => {
        setDispensedItem(product)
        const change = Math.round((balance - product.price) * 100) / 100

        if (change > 0) {
          setChangeAmount(change)
          setMachineState(STATES.RETURNING_CHANGE)
          addLog(`Dispensed ${product.name}! Returning change: $${change.toFixed(2)}`)

          changeTimerRef.current = setTimeout(() => {
            setMachineState(STATES.IDLE)
            setBalance(0)
            setSelectedProduct(null)
            setDispensedItem(null)
            setChangeAmount(0)
            addLog('Transaction complete. Ready for next customer.')
          }, 2000)
        } else {
          addLog(`Dispensed ${product.name}! No change due.`)
          setMachineState(STATES.IDLE)
          setBalance(0)
          setSelectedProduct(null)
          setDispensedItem(null)
        }
      }, 1500)
    }, 800)
  }, [machineState, balance, inventory, addLog])

  const cancelTransaction = useCallback(() => {
    if (machineState === STATES.HAS_MONEY) {
      setChangeAmount(balance)
      setMachineState(STATES.RETURNING_CHANGE)
      addLog(`Cancelled. Returning $${balance.toFixed(2)}.`)

      changeTimerRef.current = setTimeout(() => {
        setMachineState(STATES.IDLE)
        setBalance(0)
        setChangeAmount(0)
        setSelectedProduct(null)
        setErrorMessage('')
        addLog('Refund complete. Machine reset.')
      }, 1500)
    }
  }, [machineState, balance, addLog])

  const resetMachine = useCallback(() => {
    clearTimeout(dispenseTimerRef.current)
    clearTimeout(changeTimerRef.current)
    setMachineState(STATES.IDLE)
    setBalance(0)
    setSelectedProduct(null)
    setDispensedItem(null)
    setChangeAmount(0)
    setErrorMessage('')
    setLog([])
    setInventory(PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: { ...p } }), {}))
    addLog('Machine reset to factory defaults.')
  }, [addLog])

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const isInteractive = machineState === STATES.IDLE || machineState === STATES.HAS_MONEY

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
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {sectionLabels[index]}
          </button>
        ))}
      </div>

      {/* ============ SECTION 0: STORY ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/20">
                <Coffee size={32} className="text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Vending Machine</h2>
                <p className="text-quest-muted text-sm">Low-Level Design Interview Classic</p>
              </div>
            </div>

            <div className="bg-quest-bg rounded-lg p-6 mb-6 border-l-4 border-amber-400">
              <p className="text-lg italic text-quest-text">
                "Insert coin, select product, get snack. Simple? The state machine says otherwise."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              The vending machine is one of the most popular{' '}
              <Term word="Low-Level Design" definition="LLD focuses on the detailed class-level design of a system: classes, interfaces, relationships, and method signatures." onLearn={learnTerm} />
              {' '}interview problems. It tests your understanding of the{' '}
              <Term word="State Pattern" definition="A behavioral design pattern where an object alters its behavior when its internal state changes. The object appears to change its class." onLearn={learnTerm} />
              , object-oriented design, and how to model real-world systems with clean abstractions.
            </p>

            <p className="text-quest-muted mb-4">
              At its core, a vending machine is a{' '}
              <Term word="Finite State Machine" definition="A computational model with a finite number of states, transitions between those states, and actions. At any time the machine is in exactly one state." onLearn={learnTerm} />
              . Each user action (inserting a coin, selecting a product, pressing cancel) triggers a{' '}
              <Term word="State Transition" definition="The movement from one state to another in response to an input or event. Transitions are governed by the current state and the trigger." onLearn={learnTerm} />
              {' '}that changes the machine's behavior entirely.
            </p>

            <h3 className="text-lg font-bold mt-6 mb-3">Key Concepts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Package, label: 'State Pattern', desc: 'Each state (Idle, HasMoney, Dispensing) is its own class with specific behavior.' },
                { icon: ShoppingCart, label: 'Inventory Management', desc: 'Track product stock levels, handle out-of-stock gracefully.' },
                { icon: Coins, label: 'Payment Processing', desc: 'Accept coins, track balance, calculate change, handle insufficient funds.' },
                { icon: RotateCcw, label: 'State Machine', desc: 'Well-defined states and transitions ensure predictable behavior.' },
              ].map(item => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-quest-bg rounded-lg p-4 border border-white/5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon size={18} className="text-amber-400" />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </div>
                  <p className="text-xs text-quest-muted">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <DeepDive id="why-state-pattern" title="Why use the State Pattern instead of if-else?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                A naive approach would use a giant switch statement or nested if-else blocks based on the current state.
                This works for a simple machine but becomes unmaintainable as you add states, products, or payment methods.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                The State Pattern encapsulates each state's behavior in its own class. When you need to add a new state
                (e.g., "Maintenance Mode"), you simply create a new class implementing the State interface -- no existing
                code is modified. This follows the Open/Closed Principle.
              </p>
              <p className="text-sm text-quest-muted">
                Each state class only contains the logic relevant to that state, making it easier to test, debug, and reason about.
                The VendingMachine (context) delegates all behavior to its current state object.
              </p>
            </DeepDive>

            <DeepDive id="real-world-applications" title="Real-world applications of the State Pattern" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>TCP Connections:</strong> A TCP socket transitions through states like LISTEN, SYN_SENT,
                ESTABLISHED, FIN_WAIT, CLOSED. Each state handles incoming packets differently.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Order Processing:</strong> E-commerce orders move through Created, Paid, Shipped, Delivered,
                Returned. Each state determines which actions are valid.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Game Characters:</strong> A player character can be Idle, Walking, Running, Jumping, Attacking.
                Input handling changes based on the current animation state.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Document Workflows:</strong> Draft, Review, Approved, Published. Each state controls who can
                edit, approve, or publish the document.
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Try the Simulation <Coffee size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 1: SIMULATION ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Coffee className="text-amber-400" />
              Interactive Vending Machine
            </h2>
            <p className="text-quest-muted mb-6">
              Insert coins, select products, and watch the state machine in action. Try edge cases like insufficient funds or out-of-stock items.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: The Machine */}
              <div className="space-y-4">
                {/* Current State Banner */}
                <motion.div
                  key={machineState}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-xl border-2 p-4 text-center ${STATE_COLORS[machineState].bg} ${STATE_COLORS[machineState].border}`}
                >
                  <p className={`text-sm font-bold ${STATE_COLORS[machineState].text}`}>
                    State: {machineState}
                  </p>
                  <p className="text-xs text-quest-muted mt-1">{STATE_DESCRIPTIONS[machineState]}</p>
                </motion.div>

                {/* Balance Display */}
                <div className="bg-quest-bg rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Coins size={16} className="text-yellow-400" /> Balance
                    </span>
                    <span className="text-2xl font-bold text-yellow-400 font-mono">
                      ${balance.toFixed(2)}
                    </span>
                  </div>

                  {/* Coin Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {COINS.map(coin => (
                      <button
                        key={coin.value}
                        onClick={() => insertCoin(coin.value)}
                        disabled={!isInteractive}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${isInteractive
                            ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/30 hover:scale-105 active:scale-95'
                            : 'bg-quest-surface/50 border border-white/5 text-quest-muted cursor-not-allowed opacity-50'
                          }`}
                      >
                        {coin.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Grid */}
                <div className="bg-quest-bg rounded-xl p-4 border border-white/10">
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <ShoppingCart size={16} className="text-amber-400" /> Products
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.values(inventory).map(product => {
                      const isOutOfStock = product.stock <= 0
                      const canAfford = balance >= product.price
                      const canSelect = isInteractive && !isOutOfStock && machineState === STATES.HAS_MONEY

                      return (
                        <motion.button
                          key={product.id}
                          onClick={() => selectProduct(product.id)}
                          disabled={!canSelect}
                          whileHover={canSelect ? { scale: 1.05 } : {}}
                          whileTap={canSelect ? { scale: 0.95 } : {}}
                          className={`relative rounded-lg p-3 text-center transition-all border
                            ${isOutOfStock
                              ? 'bg-red-500/5 border-red-500/20 opacity-60'
                              : canSelect && canAfford
                                ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20 cursor-pointer'
                                : canSelect
                                  ? 'bg-quest-surface border-white/10 hover:border-white/20 cursor-pointer'
                                  : 'bg-quest-surface/50 border-white/5 cursor-not-allowed'
                            }`}
                        >
                          <span className="text-2xl block mb-1">{product.icon}</span>
                          <p className="text-xs font-medium truncate">{product.name}</p>
                          <p className="text-xs text-quest-muted">${product.price.toFixed(2)}</p>
                          <div className={`text-[10px] mt-1 px-1.5 py-0.5 rounded-full inline-block
                            ${isOutOfStock
                              ? 'bg-red-500/20 text-red-400'
                              : product.stock <= 2
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                            {isOutOfStock ? 'OUT' : `${product.stock} left`}
                          </div>
                          {selectedProduct?.id === product.id && machineState === STATES.DISPENSING && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-green-500/20 rounded-lg flex items-center justify-center"
                            >
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              >
                                <RotateCcw size={24} className="text-green-400" />
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={cancelTransaction}
                    disabled={machineState !== STATES.HAS_MONEY}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                      ${machineState === STATES.HAS_MONEY
                        ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
                        : 'bg-quest-surface/50 border border-white/5 text-quest-muted cursor-not-allowed opacity-50'
                      }`}
                  >
                    Cancel / Refund
                  </button>
                  <button
                    onClick={resetMachine}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-quest-surface border border-white/10 text-quest-muted hover:text-quest-text hover:border-white/20 transition-all flex items-center gap-1"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>

              {/* Right: Log & Dispensed Output */}
              <div className="space-y-4">
                {/* Error Message */}
                <AnimatePresence>
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-sm text-red-300"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dispensed Item */}
                <AnimatePresence>
                  {dispensedItem && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 20 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center"
                    >
                      <span className="text-4xl block mb-2">{dispensedItem.icon}</span>
                      <p className="font-bold text-green-300">Dispensed: {dispensedItem.name}</p>
                      {changeAmount > 0 && (
                        <p className="text-sm text-yellow-400 mt-1">
                          Change: ${changeAmount.toFixed(2)}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Transition Log */}
                <div className="bg-quest-bg rounded-xl p-4 border border-white/10">
                  <p className="text-sm font-medium mb-3">Transaction Log</p>
                  <div className="space-y-1 max-h-64 overflow-y-auto font-mono text-xs">
                    {log.length === 0 ? (
                      <p className="text-quest-muted italic">No activity yet. Insert a coin to begin.</p>
                    ) : (
                      log.map((entry, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`py-1 px-2 rounded ${entry.startsWith('Error') ? 'text-red-400 bg-red-500/5' : 'text-quest-muted'}`}
                        >
                          <span className="text-quest-muted/50 mr-2">{String(i + 1).padStart(2, '0')}</span>
                          {entry}
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Inventory Status */}
                <div className="bg-quest-bg rounded-xl p-4 border border-white/10">
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Package size={16} className="text-purple-400" /> Inventory Status
                  </p>
                  <div className="space-y-2">
                    {Object.values(inventory).map(product => (
                      <div key={product.id} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                          <span>{product.icon}</span>
                          <span>{product.name}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-quest-surface rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full ${product.stock === 0 ? 'bg-red-500' : product.stock <= 2 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${(product.stock / 5) * 100}%` }}
                            />
                          </div>
                          <span className={`w-6 text-right ${product.stock === 0 ? 'text-red-400' : 'text-quest-muted'}`}>
                            {product.stock}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" /> Story
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                State Machine Diagram <ChevronDown size={18} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 2: STATE MACHINE ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <RotateCcw className="text-purple-400" />
              State Transition Diagram
            </h2>
            <p className="text-quest-muted mb-6">
              The vending machine is a{' '}
              <Term word="Finite State Machine" definition="A model of computation with a finite number of states. At any given time the machine is in exactly one state. Events trigger transitions between states." onLearn={learnTerm} />
              . Each circle is a state. Arrows show valid transitions. The current simulator state is highlighted.
            </p>

            {/* State Diagram */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10 mb-6">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {Object.values(STATES).map(state => {
                  const colors = STATE_COLORS[state]
                  const isCurrent = machineState === state

                  return (
                    <motion.div
                      key={state}
                      animate={isCurrent ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                      transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                      className={`rounded-xl border-2 p-4 text-center min-w-[130px] transition-all
                        ${isCurrent ? `${colors.bg} ${colors.border} ring-2 ring-offset-2 ring-offset-quest-bg ring-${colors.border.replace('border-', '')}` : `${colors.bg} ${colors.border} opacity-60`}`}
                    >
                      <p className={`text-sm font-bold ${colors.text}`}>{state}</p>
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] mt-1 text-quest-primary"
                        >
                          (current)
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Transition Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">From</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Trigger</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSITIONS.map((t, i) => {
                      const isActiveFrom = machineState === t.from
                      return (
                        <tr
                          key={i}
                          className={`border-b border-white/5 transition-colors ${isActiveFrom ? 'bg-quest-primary/5' : ''}`}
                        >
                          <td className="py-2 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs ${STATE_COLORS[t.from].bg} ${STATE_COLORS[t.from].text}`}>
                              {t.from}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono text-xs text-quest-muted">{t.trigger}()</td>
                          <td className="py-2 px-3">
                            <span className={`inline-block px-2 py-0.5 rounded text-xs ${STATE_COLORS[t.to].bg} ${STATE_COLORS[t.to].text}`}>
                              {t.to}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <DeepDive id="state-vs-strategy" title="State Pattern vs Strategy Pattern" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Both patterns use composition and polymorphism, but they differ in intent:
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>State Pattern:</strong> The object's behavior changes as its internal state changes. The state
                transitions are usually defined within the state classes themselves. The context (VendingMachine) delegates
                to the current state and the state decides what the next state should be.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Strategy Pattern:</strong> The client (external code) chooses which algorithm/strategy to use.
                The strategy doesn't typically change itself -- the client swaps strategies explicitly.
              </p>
              <p className="text-sm text-quest-muted">
                In our vending machine, states transition themselves (e.g., HasMoneyState transitions to DispensingState
                when a valid product is selected). This self-transition is the hallmark of the State Pattern.
              </p>
            </DeepDive>

            <DeepDive id="edge-cases" title="Edge cases to discuss in an interview" onRead={markDeepDiveRead}>
              <ul className="text-sm text-quest-muted space-y-2 list-disc list-inside">
                <li><strong>Concurrent access:</strong> Two users pressing buttons simultaneously. Use thread-safe state transitions or a lock.</li>
                <li><strong>Power failure mid-dispense:</strong> The machine should persist state to handle recovery. Consider a transaction log.</li>
                <li><strong>Coin jam:</strong> Mechanical failure during coin return. The machine should enter a maintenance/error state.</li>
                <li><strong>Overpayment with no change available:</strong> If the machine runs out of coins for change, it should refuse the transaction or warn the user.</li>
                <li><strong>Product stuck:</strong> Dispensing mechanism fails. Detect via sensor timeout, offer refund, enter error state.</li>
                <li><strong>Negative balance:</strong> Should never happen. Validate all arithmetic and use integer cents to avoid floating-point errors.</li>
              </ul>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" /> Simulation
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Class Design <ChevronDown size={18} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 3: CLASS DESIGN ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Package className="text-green-400" />
              Class Design
            </h2>
            <p className="text-quest-muted mb-6">
              Here is how you would structure the vending machine classes using the{' '}
              <Term word="State Pattern" definition="A behavioral design pattern where an object delegates its behavior to a state object. Changing the state object changes the behavior." onLearn={learnTerm} />
              . The VendingMachine is the context, and each state implements a common interface.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {CLASS_DESIGN.map((cls, i) => (
                <motion.div
                  key={cls.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-quest-bg rounded-xl border border-white/10 overflow-hidden"
                >
                  <div className={`bg-gradient-to-r ${cls.color} p-3`}>
                    <p className="font-bold text-sm text-white">{cls.name}</p>
                    <p className="text-xs text-white/70">{cls.type}</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {cls.fields.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-quest-muted mb-1">Fields</p>
                        {cls.fields.map(f => (
                          <p key={f} className="text-xs font-mono text-quest-text pl-2 border-l-2 border-white/10 mb-1">
                            {f}
                          </p>
                        ))}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-medium text-quest-muted mb-1">Methods</p>
                      {cls.methods.map(m => (
                        <p key={m} className="text-xs font-mono text-quest-text pl-2 border-l-2 border-quest-primary/30 mb-1">
                          {m}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Relationship Diagram */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10 mb-6">
              <h3 className="text-lg font-bold mb-4">Class Relationships</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-quest-primary to-blue-500 text-white text-xs font-bold">VendingMachine</span>
                  <span className="text-quest-muted">--has-a--&gt;</span>
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">State (Interface)</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-slate-500 to-gray-500 text-white text-xs font-bold">IdleState</span>
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-yellow-600 to-amber-500 text-white text-xs font-bold">HasMoneyState</span>
                  <span className="text-quest-muted">--implements--&gt;</span>
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold">State</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-quest-primary to-blue-500 text-white text-xs font-bold">VendingMachine</span>
                  <span className="text-quest-muted">--has-a--&gt;</span>
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-purple-500 to-violet-500 text-white text-xs font-bold">Inventory</span>
                  <span className="text-quest-muted">--has-many--&gt;</span>
                  <span className="px-3 py-1 rounded bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold">Product</span>
                </div>
              </div>
            </div>

            <DeepDive id="design-principles" title="SOLID principles in the Vending Machine" onRead={markDeepDiveRead}>
              <ul className="text-sm text-quest-muted space-y-3">
                <li>
                  <strong>Single Responsibility (SRP):</strong> Each state class handles only the behavior for that specific state.
                  The Inventory class only manages stock. The VendingMachine class coordinates but does not contain business logic.
                </li>
                <li>
                  <strong>Open/Closed (OCP):</strong> Adding a new state (e.g., MaintenanceState) means creating a new class.
                  Existing states are not modified.
                </li>
                <li>
                  <strong>Liskov Substitution (LSP):</strong> Any concrete state can replace the abstract State interface.
                  The VendingMachine works with any State without knowing the concrete type.
                </li>
                <li>
                  <strong>Interface Segregation (ISP):</strong> The State interface defines only the actions relevant to user interaction.
                  Internal methods like restocking are on separate classes.
                </li>
                <li>
                  <strong>Dependency Inversion (DIP):</strong> VendingMachine depends on the State abstraction, not on
                  concrete state classes directly. States are injected or self-transitioned.
                </li>
              </ul>
            </DeepDive>

            <DeepDive id="interview-tips" title="How to present this in an interview" onRead={markDeepDiveRead}>
              <ol className="text-sm text-quest-muted space-y-2 list-decimal list-inside">
                <li>Start by clarifying requirements: What products? What coin denominations? Multiple machines?</li>
                <li>Identify the core entities: VendingMachine, Product, Inventory, Coin/Payment.</li>
                <li>Recognize the State Pattern opportunity -- the machine behaves differently based on its current state.</li>
                <li>Draw the state transition diagram first, then map states to classes.</li>
                <li>Discuss edge cases: out of stock, insufficient funds, coin jam, concurrent access.</li>
                <li>Mention extensibility: How would you add a new payment method (NFC)? A new state (Maintenance)?</li>
                <li>If time allows, discuss thread safety and how you would persist machine state for crash recovery.</li>
              </ol>
            </DeepDive>

            {/* Pseudocode Example */}
            <div className="bg-quest-bg rounded-xl p-6 border border-white/10 mb-6">
              <h3 className="text-lg font-bold mb-3">Pseudocode: State Transition</h3>
              <pre className="text-xs font-mono text-quest-muted overflow-x-auto whitespace-pre leading-relaxed">
{`class HasMoneyState implements State {

    insertCoin(machine, coin) {
        machine.addBalance(coin.value)
        // Stay in HasMoneyState
    }

    selectProduct(machine, code) {
        product = machine.inventory.getProduct(code)

        if (!product.isAvailable()) {
            display("Out of stock")
            return  // Stay in HasMoneyState
        }

        if (machine.balance < product.price) {
            display("Insufficient funds")
            return  // Stay in HasMoneyState
        }

        machine.setSelectedProduct(product)
        machine.setState(new DispensingState())
    }

    cancel(machine) {
        machine.setState(new ReturningChangeState())
    }
}`}
              </pre>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" /> State Machine
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 4: QUIZ ============ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-amber-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Test your understanding of the Vending Machine design: state patterns, transitions, edge cases, and class design.
            </p>

            <div className="space-y-8">
              {QUIZ_QUESTIONS.map((q, qIndex) => (
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
                disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
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
                <h3 className="text-xl font-bold mb-2">Level 50 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how to design a Vending Machine using the State Pattern, manage inventory,
                  handle payment processing, and navigate state transitions cleanly. This LLD classic is in your toolkit!
                </p>
                <p className="text-sm text-amber-400">
                  From finite state machines to SOLID principles -- you can model any real-world system with clean OO design.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

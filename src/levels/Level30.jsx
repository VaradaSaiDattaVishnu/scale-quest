import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Link, Unlink, Box, Boxes, ArrowRight
} from 'lucide-react'

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
  Association: 'A general relationship where one object uses or interacts with another. Neither owns the other.',
  Aggregation: 'A "has-a" relationship where the child can exist independently of the parent. The parent does not own the child\'s lifecycle.',
  Composition: 'A strong "has-a" relationship where the child cannot exist without the parent. Destroying the parent destroys the child.',
  Dependency: 'A weaker relationship where one class temporarily uses another, typically as a method parameter or local variable.',
  'Has-A': 'A relationship where one object contains or references another (composition/aggregation), as opposed to inheriting from it.',
  'Is-A': 'An inheritance relationship where a subclass is a specialized version of its parent class.',
  'Tight Coupling': 'When classes are highly dependent on each other\'s internals, making changes difficult and error-prone.',
  'Loose Coupling': 'When classes interact through well-defined interfaces with minimal knowledge of each other\'s internals.',
}

/* ── University simulation data ── */
const universityData = {
  name: 'State University',
  departments: [
    { id: 'd1', name: 'Computer Science', type: 'composition' },
    { id: 'd2', name: 'Mathematics', type: 'composition' },
    { id: 'd3', name: 'Physics', type: 'composition' },
  ],
  professors: [
    { id: 'p1', name: 'Dr. Chen', dept: 'd1', type: 'aggregation' },
    { id: 'p2', name: 'Dr. Patel', dept: 'd2', type: 'aggregation' },
    { id: 'p3', name: 'Dr. Garcia', dept: 'd3', type: 'aggregation' },
    { id: 'p4', name: 'Dr. Kim', dept: 'd1', type: 'aggregation' },
  ],
}

/* ── Relationship types for the visualizer ── */
const relationshipExamples = [
  {
    id: 'assoc',
    label: 'Association',
    parent: 'Teacher',
    child: 'Student',
    symbol: '----->',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    desc: 'A Teacher teaches Students. Both exist independently.',
    lifetime: 'independent',
  },
  {
    id: 'agg',
    label: 'Aggregation',
    parent: 'Library',
    child: 'Book',
    symbol: '<>----->',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/40',
    desc: 'A Library has Books. Books can exist without the Library.',
    lifetime: 'independent',
  },
  {
    id: 'comp',
    label: 'Composition',
    parent: 'House',
    child: 'Room',
    symbol: '<*>----->',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/40',
    desc: 'A House has Rooms. Destroy the House, the Rooms are gone.',
    lifetime: 'dependent',
  },
  {
    id: 'dep',
    label: 'Dependency',
    parent: 'Printer',
    child: 'Document',
    symbol: '- - - ->',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    desc: 'A Printer uses a Document temporarily to print it.',
    lifetime: 'temporary',
  },
]

/* ── Coupling refactoring challenges ── */
const couplingChallenges = [
  {
    id: 'c1',
    title: 'Database Access',
    tight: 'class OrderService {\n  save(order) {\n    const db = new MySQLDatabase();\n    db.query("INSERT INTO orders...");\n  }\n}',
    loose: 'class OrderService {\n  constructor(repository) {\n    this.repo = repository;\n  }\n  save(order) {\n    this.repo.save(order);\n  }\n}',
    explanation: 'Depend on an abstraction (Repository interface) instead of a concrete database class. Now you can swap MySQL for Postgres without touching OrderService.',
  },
  {
    id: 'c2',
    title: 'Notification System',
    tight: 'class UserService {\n  register(user) {\n    // ...registration logic\n    const email = new GmailSender();\n    email.send(user.email, "Welcome!");\n  }\n}',
    loose: 'class UserService {\n  constructor(notifier) {\n    this.notifier = notifier;\n  }\n  register(user) {\n    // ...registration logic\n    this.notifier.notify(user, "Welcome!");\n  }\n}',
    explanation: 'Inject a Notifier interface. Now the system can send via email, SMS, or push notifications without modifying UserService.',
  },
  {
    id: 'c3',
    title: 'Payment Processing',
    tight: 'class CheckoutService {\n  pay(cart) {\n    const stripe = new StripeAPI("sk_key");\n    stripe.charge(cart.total);\n    const inv = new PDFInvoice();\n    inv.generate(cart);\n  }\n}',
    loose: 'class CheckoutService {\n  constructor(paymentGateway, invoiceGen) {\n    this.payment = paymentGateway;\n    this.invoice = invoiceGen;\n  }\n  pay(cart) {\n    this.payment.charge(cart.total);\n    this.invoice.generate(cart);\n  }\n}',
    explanation: 'Inject both the payment gateway and invoice generator. You can swap Stripe for PayPal, or PDF invoices for HTML invoices, independently.',
  },
]

/* ── Has-A vs Is-A decision tree nodes ── */
const decisionNodes = [
  { id: 0, question: 'Does the child naturally "belong to" the parent as a part?', yes: 1, no: 2 },
  { id: 1, question: 'Can the child exist without the parent?', yes: 3, no: 4 },
  { id: 2, question: 'Is the child a specialized version of the parent?', yes: 5, no: 6 },
  { id: 3, result: 'Aggregation', detail: 'The child is part of the parent but has an independent lifecycle. Example: Team has Players.' },
  { id: 4, result: 'Composition', detail: 'The child cannot exist without the parent. Example: Order has OrderLines.' },
  { id: 5, result: 'Inheritance (Is-A)', detail: 'The child IS-A kind of parent. Example: Dog is-a Animal. But prefer composition over inheritance when possible!' },
  { id: 6, result: 'Association or Dependency', detail: 'The objects collaborate but neither owns the other. Example: Customer places Order.' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'A Car has an Engine. If the Car is scrapped, the Engine is destroyed too. What relationship is this?',
    options: ['Association', 'Aggregation', 'Composition', 'Dependency'],
    correct: 2,
    explanation: 'This is Composition. The Engine\'s lifecycle is tied to the Car. When the Car is destroyed, so is the Engine.',
  },
  {
    id: 'q2',
    question: 'A University has Professors. If the University closes, the Professors still exist and can work elsewhere. What relationship is this?',
    options: ['Composition', 'Aggregation', 'Dependency', 'Inheritance'],
    correct: 1,
    explanation: 'This is Aggregation. Professors have an independent lifecycle. They are associated with the University but not owned by it.',
  },
  {
    id: 'q3',
    question: 'Which coupling style makes a system easier to test and modify?',
    options: ['Tight coupling via concrete classes', 'Loose coupling via interfaces/abstractions', 'Direct instantiation inside methods', 'Global singleton access'],
    correct: 1,
    explanation: 'Loose coupling through interfaces lets you swap implementations, inject mocks for testing, and modify components independently.',
  },
  {
    id: 'q4',
    question: 'A Dog IS-A Animal. A Dog HAS-A Tail. Which principle says to prefer the HAS-A approach when possible?',
    options: ['Liskov Substitution', 'Composition over Inheritance', 'Open-Closed Principle', 'Single Responsibility'],
    correct: 1,
    explanation: '"Favor composition over inheritance" is a fundamental design guideline. Composition gives more flexibility and avoids deep inheritance hierarchies.',
  },
  {
    id: 'q5',
    question: 'A Logger is passed as a parameter to a method, used, then discarded. What relationship exists between the caller and the Logger?',
    options: ['Composition', 'Aggregation', 'Association', 'Dependency'],
    correct: 3,
    explanation: 'This is a Dependency. The caller temporarily uses the Logger but does not store or own it. It is the weakest relationship type.',
  },
  {
    id: 'q6',
    question: 'In a tightly coupled system, class A directly creates instances of class B inside its methods. What is the main drawback?',
    options: [
      'A is faster than B',
      'A cannot be tested or changed without also changing B',
      'B becomes an interface',
      'A inherits from B',
    ],
    correct: 1,
    explanation: 'Tight coupling means A depends on B\'s concrete implementation. You cannot swap B for a mock in tests, and any change to B may break A.',
  },
  {
    id: 'q7',
    question: 'Which UML symbol represents Composition?',
    options: [
      'Open diamond arrow (unfilled)',
      'Filled diamond arrow',
      'Dashed arrow',
      'Simple solid arrow',
    ],
    correct: 1,
    explanation: 'A filled (solid) diamond on the parent side represents Composition in UML. An open (unfilled) diamond represents Aggregation.',
  },
]

/* ── Main Component ── */
export default function Level30({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [activeTab, setActiveTab] = useState('story')
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  /* Relationship visualizer */
  const [selectedRelationship, setSelectedRelationship] = useState(null)
  const [parentAlive, setParentAlive] = useState(true)
  const [animPhase, setAnimPhase] = useState('idle') // idle | destroying | destroyed

  /* University sim */
  const [uniAlive, setUniAlive] = useState(true)
  const [uniPhase, setUniPhase] = useState('alive') // alive | dissolving | dissolved

  /* Coupling meter */
  const [activeCoupling, setActiveCoupling] = useState(null)
  const [showLoose, setShowLoose] = useState({})

  /* Decision tree */
  const [currentNode, setCurrentNode] = useState(0)
  const [treePath, setTreePath] = useState([0])

  const handleLearn = useCallback((word) => { learnTerm?.(word) }, [learnTerm])
  const handleDeepDive = useCallback((id) => { markDeepDiveRead?.(id) }, [markDeepDiveRead])

  /* ── Relationship lifecycle animation ── */
  const destroyParent = () => {
    if (animPhase !== 'idle') return
    setAnimPhase('destroying')
    setTimeout(() => {
      setParentAlive(false)
      setAnimPhase('destroyed')
    }, 800)
  }

  const resetRelationship = () => {
    setParentAlive(true)
    setAnimPhase('idle')
  }

  /* ── University simulation ── */
  const dissolveUniversity = () => {
    if (uniPhase !== 'alive') return
    setUniPhase('dissolving')
    setTimeout(() => setUniPhase('dissolved'), 1200)
  }

  const resetUniversity = () => {
    setUniPhase('alive')
    setUniAlive(true)
  }

  /* ── Decision tree ── */
  const handleDecision = (answer) => {
    const node = decisionNodes[currentNode]
    const nextId = answer === 'yes' ? node.yes : node.no
    setCurrentNode(nextId)
    setTreePath(prev => [...prev, nextId])
  }

  const resetTree = () => {
    setCurrentNode(0)
    setTreePath([0])
  }

  /* ── Quiz ── */
  const handleAnswer = (qid, idx) => {
    if (showResults) return
    setQuizAnswers(prev => ({ ...prev, [qid]: idx }))
  }

  const score = quizQuestions.reduce((acc, q) => acc + (quizAnswers[q.id] === q.correct ? 1 : 0), 0)
  const allAnswered = quizQuestions.every(q => quizAnswers[q.id] !== undefined)

  const handleSubmitQuiz = () => {
    if (!allAnswered) return
    setShowResults(true)
    if (score >= 5) onComplete?.()
  }

  const tabs = [
    { id: 'story', label: 'Story' },
    { id: 'visualizer', label: 'Relationship Visualizer' },
    { id: 'university', label: 'Composition vs Aggregation' },
    { id: 'coupling', label: 'Coupling Meter' },
    { id: 'decision', label: 'Has-A vs Is-A' },
    { id: 'quiz', label: 'Quiz' },
  ]

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-3 mb-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Boxes size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Level 30: Relationships Matter</h1>
            <p className="text-quest-text/70 text-sm">Association, Aggregation, Composition</p>
          </div>
          {isCompleted && <CheckCircle className="text-green-400 ml-2" size={24} />}
        </motion.div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface/50 text-quest-text/70 hover:bg-quest-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Story Tab ── */}
      {activeTab === 'story' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <p className="text-lg text-quest-text/90 italic mb-4">
              "Is a Car 'has-a' Engine or 'is-a' Vehicle? These decisions shape everything."
            </p>
            <p className="text-quest-text/80 leading-relaxed">
              When objects interact in a system, the <Term word="Association" definition={terms.Association} onLearn={handleLearn} /> between
              them determines how tightly they are bound. A simple association means two objects know about each other.{' '}
              <Term word="Aggregation" definition={terms.Aggregation} onLearn={handleLearn} /> means one object <em>contains</em> another,
              but the contained object can survive on its own. <Term word="Composition" definition={terms.Composition} onLearn={handleLearn} /> is
              the strongest form: the contained object's lifecycle is entirely controlled by its parent.
            </p>
            <p className="text-quest-text/80 leading-relaxed mt-4">
              Then there is the classic debate: <Term word="Has-A" definition={terms['Has-A']} onLearn={handleLearn} /> versus{' '}
              <Term word="Is-A" definition={terms['Is-A']} onLearn={handleLearn} />. Inheritance (Is-A) creates rigid hierarchies.
              Composition (Has-A) creates flexible, swappable structures. Modern design strongly favors{' '}
              <Term word="Loose Coupling" definition={terms['Loose Coupling']} onLearn={handleLearn} /> over{' '}
              <Term word="Tight Coupling" definition={terms['Tight Coupling']} onLearn={handleLearn} />, because loosely coupled
              systems are easier to test, extend, and maintain.
            </p>
          </div>

          <DeepDive id="dd-relationship-spectrum" title="The Relationship Strength Spectrum" onRead={handleDeepDive}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>
                Object relationships form a spectrum from weakest to strongest:
              </p>
              <div className="space-y-2 mt-3">
                <div className="flex items-center gap-3 p-2 rounded bg-green-500/10 border border-green-500/20">
                  <span className="font-mono text-green-400 w-28 shrink-0">Dependency</span>
                  <span>Weakest. Temporary usage, like passing an object as a method parameter.</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-blue-500/10 border border-blue-500/20">
                  <span className="font-mono text-blue-400 w-28 shrink-0">Association</span>
                  <span>Two objects reference each other but neither owns the other.</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                  <span className="font-mono text-yellow-400 w-28 shrink-0">Aggregation</span>
                  <span>Parent "has" children, but children outlive the parent.</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded bg-red-500/10 border border-red-500/20">
                  <span className="font-mono text-red-400 w-28 shrink-0">Composition</span>
                  <span>Strongest. Child dies when parent dies. Lifecycle fully owned.</span>
                </div>
              </div>
            </div>
          </DeepDive>

          <DeepDive id="dd-composition-over-inheritance" title="Why 'Favor Composition over Inheritance'?" onRead={handleDeepDive}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>
                Inheritance creates an <strong>is-a</strong> relationship that is baked into the type hierarchy at compile time.
                This sounds clean, but leads to problems:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Fragile base class problem:</strong> Changes to a parent class can unexpectedly break all subclasses.</li>
                <li><strong>Diamond problem:</strong> Multiple inheritance creates ambiguity about which parent's behavior to use.</li>
                <li><strong>Inflexible hierarchies:</strong> A <code>FlyingFish</code> does not fit neatly under <code>Bird</code> or <code>Fish</code>.</li>
              </ul>
              <p className="mt-2">
                Composition solves these by letting you <em>assemble</em> behavior from independent pieces. Instead of
                <code> class Duck extends Bird</code>, you have <code>class Duck {'{ fly: FlyBehavior, swim: SwimBehavior }'}</code>.
                Each behavior can be swapped at runtime.
              </p>
            </div>
          </DeepDive>

          <DeepDive id="dd-coupling-metrics" title="Measuring Coupling in Real Systems" onRead={handleDeepDive}>
            <div className="space-y-3 text-sm text-quest-text/80">
              <p>Coupling can be measured with several metrics:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Afferent Coupling (Ca):</strong> How many other modules depend on this one.</li>
                <li><strong>Efferent Coupling (Ce):</strong> How many other modules this one depends on.</li>
                <li><strong>Instability (I):</strong> Ce / (Ca + Ce). Ranges from 0 (stable) to 1 (unstable).</li>
              </ul>
              <p className="mt-2">
                High instability means a module depends on many others and can break easily. The
                Stable Dependencies Principle says: depend in the direction of stability.
              </p>
            </div>
          </DeepDive>
        </motion.div>
      )}

      {/* ── Relationship Visualizer Tab ── */}
      {activeTab === 'visualizer' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Link size={20} className="text-quest-primary" />
              Relationship Visualizer
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Select a relationship type to see how objects interact. Then destroy the parent to observe the lifecycle behavior.
            </p>

            {/* Relationship type buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {relationshipExamples.map(rel => (
                <button
                  key={rel.id}
                  onClick={() => { setSelectedRelationship(rel); resetRelationship() }}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                    selectedRelationship?.id === rel.id
                      ? `${rel.bg} ${rel.border} ${rel.color}`
                      : 'bg-quest-surface/30 border-white/10 text-quest-text/60 hover:border-white/20'
                  }`}
                >
                  {rel.label}
                </button>
              ))}
            </div>

            {/* Visualization area */}
            {selectedRelationship && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${selectedRelationship.border} ${selectedRelationship.bg}`}>
                  <p className="text-sm mb-1 font-medium ${selectedRelationship.color}">{selectedRelationship.desc}</p>
                  <p className="text-xs text-quest-text/50 font-mono">UML: {selectedRelationship.symbol}</p>
                </div>

                <div className="flex items-center justify-center gap-8 py-8">
                  {/* Parent object */}
                  <AnimatePresence mode="wait">
                    {parentAlive ? (
                      <motion.div
                        key="parent-alive"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0, rotate: 45 }}
                        transition={{ duration: 0.5 }}
                        className={`w-36 h-28 rounded-xl border-2 ${selectedRelationship.border} ${selectedRelationship.bg} flex flex-col items-center justify-center`}
                      >
                        <Box size={24} className={selectedRelationship.color} />
                        <span className="text-sm font-bold mt-1">{selectedRelationship.parent}</span>
                        <span className="text-xs text-quest-text/50">Parent</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="parent-dead"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-36 h-28 rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center"
                      >
                        <span className="text-xs text-quest-text/30">Destroyed</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Arrow */}
                  <div className="flex flex-col items-center gap-1">
                    <motion.div
                      animate={{ opacity: parentAlive ? 1 : 0.2 }}
                      className={selectedRelationship.color}
                    >
                      <ArrowRight size={28} />
                    </motion.div>
                    <span className="text-xs text-quest-text/40 font-mono">{selectedRelationship.label}</span>
                  </div>

                  {/* Child object */}
                  <AnimatePresence mode="wait">
                    {(parentAlive || selectedRelationship.lifetime !== 'dependent') ? (
                      <motion.div
                        key="child-alive"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: 1,
                          opacity: !parentAlive && selectedRelationship.lifetime === 'temporary' ? 0.4 : 1,
                        }}
                        exit={{ scale: 0, opacity: 0, rotate: -45 }}
                        transition={{ duration: 0.5 }}
                        className={`w-36 h-28 rounded-xl border-2 ${
                          !parentAlive && selectedRelationship.lifetime === 'independent'
                            ? 'border-green-500/60 bg-green-500/10'
                            : `${selectedRelationship.border} ${selectedRelationship.bg}`
                        } flex flex-col items-center justify-center`}
                      >
                        <Box size={24} className={
                          !parentAlive && selectedRelationship.lifetime === 'independent'
                            ? 'text-green-400'
                            : selectedRelationship.color
                        } />
                        <span className="text-sm font-bold mt-1">{selectedRelationship.child}</span>
                        <span className="text-xs mt-0.5">
                          {!parentAlive && selectedRelationship.lifetime === 'independent' && (
                            <span className="text-green-400">Survives!</span>
                          )}
                          {!parentAlive && selectedRelationship.lifetime === 'temporary' && (
                            <span className="text-quest-text/30">Released</span>
                          )}
                          {parentAlive && <span className="text-quest-text/50">Child</span>}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="child-dead"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0.3, scale: 0.8 }}
                        className="w-36 h-28 rounded-xl border-2 border-dashed border-red-500/30 flex flex-col items-center justify-center"
                      >
                        <span className="text-xs text-red-400/60">Destroyed too!</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Lifecycle message */}
                <AnimatePresence>
                  {animPhase === 'destroyed' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center p-3 rounded-lg text-sm ${
                        selectedRelationship.lifetime === 'dependent'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : selectedRelationship.lifetime === 'independent'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}
                    >
                      {selectedRelationship.lifetime === 'dependent' && (
                        <span>The {selectedRelationship.child} was destroyed along with the {selectedRelationship.parent}. This is <strong>Composition</strong> -- the child cannot exist independently.</span>
                      )}
                      {selectedRelationship.lifetime === 'independent' && (
                        <span>The {selectedRelationship.child} survived! In <strong>{selectedRelationship.label}</strong>, the child has its own lifecycle.</span>
                      )}
                      {selectedRelationship.lifetime === 'temporary' && (
                        <span>The {selectedRelationship.child} was only temporarily used. In a <strong>Dependency</strong>, the reference is not stored.</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={destroyParent}
                    disabled={!parentAlive}
                    className="px-5 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Unlink size={16} />
                    Destroy Parent
                  </button>
                  <button
                    onClick={resetRelationship}
                    className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {!selectedRelationship && (
              <div className="text-center py-12 text-quest-text/40 text-sm">
                Select a relationship type above to begin the visualization.
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── University Composition vs Aggregation Tab ── */}
      {activeTab === 'university' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Boxes size={20} className="text-quest-primary" />
              University Simulation
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              A University <strong className="text-red-400">composes</strong> Departments (they cannot exist without it) and{' '}
              <strong className="text-yellow-400">aggregates</strong> Professors (they survive if the University closes).
              Dissolve the University to see the difference.
            </p>

            {/* University entity */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {uniPhase !== 'dissolved' ? (
                  <motion.div
                    key="uni-alive"
                    animate={{
                      opacity: uniPhase === 'dissolving' ? [1, 0.5, 0.2] : 1,
                      scale: uniPhase === 'dissolving' ? [1, 0.95, 0.9] : 1,
                    }}
                    transition={{ duration: 1 }}
                    className="p-5 rounded-xl border-2 border-quest-primary/40 bg-quest-primary/10 mb-6"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Box size={20} className="text-quest-primary" />
                      <span className="font-bold text-lg">{universityData.name}</span>
                      <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded-full ml-2">Parent</span>
                    </div>

                    {/* Departments (Composition) */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-sm bg-red-500" />
                        <span className="text-sm font-medium text-red-400">Departments (Composition)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {universityData.departments.map(dept => (
                          <motion.div
                            key={dept.id}
                            animate={{
                              opacity: uniPhase === 'dissolving' ? 0 : 1,
                              scale: uniPhase === 'dissolving' ? 0.5 : 1,
                            }}
                            transition={{ duration: 0.8, delay: Math.random() * 0.3 }}
                            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center"
                          >
                            <span className="text-sm font-medium">{dept.name}</span>
                            <span className="block text-xs text-red-400/60 mt-1">lifecycle: owned</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Professors (Aggregation) */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-sm bg-yellow-500" />
                        <span className="text-sm font-medium text-yellow-400">Professors (Aggregation)</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {universityData.professors.map(prof => (
                          <div
                            key={prof.id}
                            className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-center"
                          >
                            <span className="text-sm font-medium">{prof.name}</span>
                            <span className="block text-xs text-yellow-400/60 mt-1">lifecycle: independent</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="uni-dissolved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4 mb-6"
                  >
                    {/* Destroyed university */}
                    <div className="p-5 rounded-xl border-2 border-dashed border-white/10 text-center">
                      <span className="text-quest-text/30 text-sm">{universityData.name} -- Dissolved</span>
                    </div>

                    {/* Departments gone */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-sm bg-red-500/30" />
                        <span className="text-sm font-medium text-red-400/50">Departments -- Destroyed (Composition)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {universityData.departments.map(dept => (
                          <motion.div
                            key={dept.id}
                            initial={{ opacity: 0.5, scale: 0.8 }}
                            animate={{ opacity: 0.15, scale: 0.9 }}
                            className="p-3 rounded-lg border border-dashed border-red-500/10 text-center"
                          >
                            <span className="text-sm text-red-400/30 line-through">{dept.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Professors survive */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-sm bg-green-500" />
                        <span className="text-sm font-medium text-green-400">Professors -- Survived! (Aggregation)</span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {universityData.professors.map(prof => (
                          <motion.div
                            key={prof.id}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + Math.random() * 0.3 }}
                            className="p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center"
                          >
                            <span className="text-sm font-medium">{prof.name}</span>
                            <span className="block text-xs text-green-400 mt-1">Free agent!</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={dissolveUniversity}
                  disabled={uniPhase !== 'alive'}
                  className="px-5 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Unlink size={16} />
                  Dissolve University
                </button>
                <button
                  onClick={resetUniversity}
                  className="px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Summary insight */}
            <AnimatePresence>
              {uniPhase === 'dissolved' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-quest-primary/10 border border-quest-primary/20 text-sm"
                >
                  <p className="font-semibold text-quest-primary mb-1">Key Takeaway</p>
                  <p className="text-quest-text/80">
                    <strong className="text-red-400">Composition</strong> means the part (Department) is destroyed with the whole (University).
                    <strong className="text-yellow-400 ml-1">Aggregation</strong> means the part (Professor) has its own lifecycle and survives.
                    In UML, composition uses a filled diamond and aggregation uses an open diamond.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Coupling Meter Tab ── */}
      {activeTab === 'coupling' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Link size={20} className="text-quest-primary" />
              Coupling Meter
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Examine tightly coupled code. Click "Refactor" to see the loosely coupled version and understand the improvement.
            </p>

            <div className="space-y-6">
              {couplingChallenges.map(challenge => {
                const isLoose = showLoose[challenge.id]
                return (
                  <motion.div
                    key={challenge.id}
                    layout
                    className="rounded-xl border border-white/10 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="px-4 py-3 bg-quest-surface/30 flex items-center justify-between">
                      <span className="font-medium text-sm">{challenge.title}</span>
                      <div className="flex items-center gap-3">
                        {/* Coupling meter bar */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-quest-text/40">Coupling:</span>
                          <div className="w-24 h-2 rounded-full bg-quest-surface/50 overflow-hidden">
                            <motion.div
                              animate={{ width: isLoose ? '25%' : '85%' }}
                              transition={{ duration: 0.6 }}
                              className={`h-full rounded-full ${isLoose ? 'bg-green-500' : 'bg-red-500'}`}
                            />
                          </div>
                          <span className={`text-xs font-medium ${isLoose ? 'text-green-400' : 'text-red-400'}`}>
                            {isLoose ? 'Low' : 'High'}
                          </span>
                        </div>
                        <button
                          onClick={() => setShowLoose(prev => ({ ...prev, [challenge.id]: !prev[challenge.id] }))}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            isLoose
                              ? 'bg-quest-surface/50 text-quest-text/60'
                              : 'bg-quest-primary/20 text-quest-primary hover:bg-quest-primary/30'
                          }`}
                        >
                          {isLoose ? 'Show Tight' : 'Refactor'}
                        </button>
                      </div>
                    </div>

                    {/* Code display */}
                    <div className="p-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={isLoose ? 'loose' : 'tight'}
                          initial={{ opacity: 0, x: isLoose ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: isLoose ? -20 : 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {isLoose ? (
                              <Unlink size={14} className="text-green-400" />
                            ) : (
                              <Link size={14} className="text-red-400" />
                            )}
                            <span className={`text-xs font-medium ${isLoose ? 'text-green-400' : 'text-red-400'}`}>
                              {isLoose ? 'Loosely Coupled (Refactored)' : 'Tightly Coupled (Original)'}
                            </span>
                          </div>
                          <pre className="text-xs font-mono bg-black/30 p-4 rounded-lg overflow-x-auto leading-relaxed whitespace-pre-wrap">
                            {isLoose ? challenge.loose : challenge.tight}
                          </pre>
                          {isLoose && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="mt-3 text-sm text-green-400/80 bg-green-500/5 p-3 rounded-lg border border-green-500/10"
                            >
                              {challenge.explanation}
                            </motion.p>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Summary bar */}
            <div className="mt-6 p-4 rounded-lg bg-quest-surface/30 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Coupling Score</span>
                <span className={`text-sm font-bold ${
                  Object.keys(showLoose).filter(k => showLoose[k]).length === couplingChallenges.length
                    ? 'text-green-400'
                    : Object.keys(showLoose).filter(k => showLoose[k]).length > 0
                      ? 'text-yellow-400'
                      : 'text-red-400'
                }`}>
                  {Object.keys(showLoose).filter(k => showLoose[k]).length} / {couplingChallenges.length} Refactored
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-quest-surface/50 overflow-hidden">
                <motion.div
                  animate={{
                    width: `${(Object.keys(showLoose).filter(k => showLoose[k]).length / couplingChallenges.length) * 100}%`
                  }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Has-A vs Is-A Decision Tree Tab ── */}
      {activeTab === 'decision' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="quest-card p-6">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ArrowRight size={20} className="text-quest-primary" />
              Has-A vs Is-A Decision Tree
            </h2>
            <p className="text-quest-text/70 text-sm mb-6">
              Answer questions to determine the correct relationship type. Follow the path to discover whether you need
              inheritance, composition, aggregation, or a simple association.
            </p>

            {/* Path breadcrumb */}
            <div className="flex flex-wrap items-center gap-1 mb-6">
              {treePath.map((nodeId, idx) => {
                const node = decisionNodes[nodeId]
                return (
                  <div key={idx} className="flex items-center gap-1">
                    {idx > 0 && <ArrowRight size={12} className="text-quest-text/30" />}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      nodeId === currentNode
                        ? 'bg-quest-primary/20 text-quest-primary font-medium'
                        : 'bg-quest-surface/30 text-quest-text/40'
                    }`}>
                      {node.result ? node.result : `Q${idx + 1}`}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Current node */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNode}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {decisionNodes[currentNode].question && !decisionNodes[currentNode].result && (
                  <div className="p-6 rounded-xl border border-quest-primary/30 bg-quest-primary/5 text-center">
                    <p className="text-lg font-medium mb-6">{decisionNodes[currentNode].question}</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleDecision('yes')}
                        className="px-8 py-3 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 font-medium hover:bg-green-500/30 transition-colors"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => handleDecision('no')}
                        className="px-8 py-3 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 font-medium hover:bg-red-500/30 transition-colors"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}

                {decisionNodes[currentNode].result && (
                  <div className="p-6 rounded-xl border border-quest-secondary/30 bg-quest-secondary/5 text-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 mb-3"
                    >
                      <CheckCircle size={24} className="text-quest-secondary" />
                      <span className="text-xl font-bold text-quest-secondary">
                        {decisionNodes[currentNode].result}
                      </span>
                    </motion.div>
                    <p className="text-quest-text/80 text-sm max-w-md mx-auto">
                      {decisionNodes[currentNode].detail}
                    </p>
                    <button
                      onClick={resetTree}
                      className="mt-6 px-5 py-2 rounded-lg bg-quest-surface/50 text-quest-text/70 border border-white/10 text-sm font-medium hover:bg-quest-surface transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Quick reference table */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold mb-3 text-quest-text/60">Quick Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Relationship</th>
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Keyword</th>
                      <th className="text-left py-2 pr-4 text-quest-text/50 font-medium">Lifecycle</th>
                      <th className="text-left py-2 text-quest-text/50 font-medium">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-red-400 font-medium">Composition</td>
                      <td className="py-2 pr-4 font-mono text-xs">has-a (owned)</td>
                      <td className="py-2 pr-4 text-quest-text/60">Dies with parent</td>
                      <td className="py-2 text-quest-text/60">House has Rooms</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-yellow-400 font-medium">Aggregation</td>
                      <td className="py-2 pr-4 font-mono text-xs">has-a (shared)</td>
                      <td className="py-2 pr-4 text-quest-text/60">Independent</td>
                      <td className="py-2 text-quest-text/60">Team has Players</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-blue-400 font-medium">Association</td>
                      <td className="py-2 pr-4 font-mono text-xs">uses / knows</td>
                      <td className="py-2 pr-4 text-quest-text/60">Independent</td>
                      <td className="py-2 text-quest-text/60">Teacher teaches Student</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 pr-4 text-purple-400 font-medium">Inheritance</td>
                      <td className="py-2 pr-4 font-mono text-xs">is-a</td>
                      <td className="py-2 pr-4 text-quest-text/60">Type hierarchy</td>
                      <td className="py-2 text-quest-text/60">Dog is-a Animal</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-green-400 font-medium">Dependency</td>
                      <td className="py-2 pr-4 font-mono text-xs">uses (temp)</td>
                      <td className="py-2 pr-4 text-quest-text/60">Temporary</td>
                      <td className="py-2 text-quest-text/60">Printer uses Document</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                      ? 'Great work! Level complete. You understand object relationships.'
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

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, PenTool, Square, ArrowRight, Users, Activity } from 'lucide-react'

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

/* ── Class diagram data ── */
const classTemplates = [
  {
    id: 'user',
    name: 'User',
    x: 60,
    y: 40,
    properties: ['- id: UUID', '- name: String', '- email: String', '- createdAt: Date'],
    methods: ['+ register(): void', '+ login(): Session', '+ updateProfile(): void'],
  },
  {
    id: 'order',
    name: 'Order',
    x: 340,
    y: 40,
    properties: ['- id: UUID', '- status: OrderStatus', '- totalAmount: Decimal', '- createdAt: Date'],
    methods: ['+ place(): void', '+ cancel(): void', '+ getTotal(): Decimal'],
  },
  {
    id: 'product',
    name: 'Product',
    x: 340,
    y: 300,
    properties: ['- id: UUID', '- name: String', '- price: Decimal', '- stock: int'],
    methods: ['+ updateStock(qty): void', '+ getPrice(): Decimal'],
  },
  {
    id: 'payment',
    name: 'Payment',
    x: 60,
    y: 300,
    properties: ['- id: UUID', '- amount: Decimal', '- method: PaymentMethod', '- paidAt: Date'],
    methods: ['+ process(): boolean', '+ refund(): void'],
  },
]

/* ── Relationship types ── */
const relationshipTypes = [
  {
    id: 'association',
    name: 'Association',
    symbol: '———',
    arrowHead: 'none',
    description: 'A general relationship between two classes. "User places Orders."',
    lineStyle: 'solid',
    example: 'User ——— Order',
  },
  {
    id: 'inheritance',
    name: 'Inheritance',
    symbol: '——▷',
    arrowHead: 'triangle-open',
    description: 'An "is-a" relationship. A subclass extends a superclass.',
    lineStyle: 'solid',
    example: 'Admin ——▷ User',
  },
  {
    id: 'composition',
    name: 'Composition',
    symbol: '◆——',
    arrowHead: 'diamond-filled',
    description: 'A strong "has-a" relationship. The part cannot exist without the whole.',
    lineStyle: 'solid',
    example: 'Order ◆—— OrderItem',
  },
  {
    id: 'aggregation',
    name: 'Aggregation',
    symbol: '◇——',
    arrowHead: 'diamond-open',
    description: 'A weak "has-a" relationship. The part can exist independently.',
    lineStyle: 'solid',
    example: 'Team ◇—— Player',
  },
  {
    id: 'dependency',
    name: 'Dependency',
    symbol: '- - ->',
    arrowHead: 'arrow-dashed',
    description: 'One class uses another temporarily (e.g., as a method parameter).',
    lineStyle: 'dashed',
    example: 'Order - - -> PaymentGateway',
  },
  {
    id: 'realization',
    name: 'Realization',
    symbol: '- - -▷',
    arrowHead: 'triangle-dashed',
    description: 'A class implements an interface.',
    lineStyle: 'dashed',
    example: 'StripePayment - - -▷ PaymentProcessor',
  },
]

/* ── Multiplicity notations ── */
const multiplicityExamples = [
  { notation: '1', meaning: 'Exactly one', example: 'An Order has exactly 1 Payment' },
  { notation: '0..1', meaning: 'Zero or one', example: 'A User has 0 or 1 Profile Picture' },
  { notation: '*', meaning: 'Zero or more', example: 'A User has 0 or more Orders' },
  { notation: '1..*', meaning: 'One or more', example: 'An Order has 1 or more OrderItems' },
  { notation: '3..5', meaning: 'Specific range', example: 'A Team has 3 to 5 members' },
]

/* ── Sequence diagram data ── */
const sequenceActors = ['Client', 'API Gateway', 'OrderService', 'PaymentService', 'Database']

const sequenceMessages = [
  { from: 0, to: 1, label: 'POST /orders', type: 'sync', delay: 0 },
  { from: 1, to: 2, label: 'createOrder(data)', type: 'sync', delay: 1 },
  { from: 2, to: 4, label: 'INSERT order', type: 'sync', delay: 2 },
  { from: 4, to: 2, label: 'order_id', type: 'return', delay: 3 },
  { from: 2, to: 3, label: 'processPayment(order)', type: 'async', delay: 4 },
  { from: 3, to: 4, label: 'INSERT payment', type: 'sync', delay: 5 },
  { from: 4, to: 3, label: 'payment_id', type: 'return', delay: 6 },
  { from: 3, to: 2, label: 'paymentConfirmed', type: 'return', delay: 7 },
  { from: 2, to: 1, label: '201 Created', type: 'return', delay: 8 },
  { from: 1, to: 0, label: '{ orderId, status }', type: 'return', delay: 9 },
]

/* ── Activity diagram data ── */
const activitySteps = [
  { id: 'start', label: 'Start', type: 'start', x: 250, y: 20 },
  { id: 'browse', label: 'Browse Products', type: 'action', x: 250, y: 80 },
  { id: 'addCart', label: 'Add to Cart', type: 'action', x: 250, y: 150 },
  { id: 'decision1', label: 'Continue Shopping?', type: 'decision', x: 250, y: 220 },
  { id: 'checkout', label: 'Checkout', type: 'action', x: 250, y: 300 },
  { id: 'decision2', label: 'Payment Valid?', type: 'decision', x: 250, y: 370 },
  { id: 'confirm', label: 'Confirm Order', type: 'action', x: 250, y: 440 },
  { id: 'retry', label: 'Retry Payment', type: 'action', x: 420, y: 370 },
  { id: 'end', label: 'End', type: 'end', x: 250, y: 510 },
]

const activityEdges = [
  { from: 'start', to: 'browse' },
  { from: 'browse', to: 'addCart' },
  { from: 'addCart', to: 'decision1' },
  { from: 'decision1', to: 'checkout', label: 'No' },
  { from: 'decision1', to: 'browse', label: 'Yes' },
  { from: 'checkout', to: 'decision2' },
  { from: 'decision2', to: 'confirm', label: 'Yes' },
  { from: 'decision2', to: 'retry', label: 'No' },
  { from: 'retry', to: 'decision2' },
  { from: 'confirm', to: 'end' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'Which UML relationship type represents "is-a" (e.g., Admin is a User)?',
    options: [
      { id: 'a', text: 'Association', correct: false },
      { id: 'b', text: 'Composition', correct: false },
      { id: 'c', text: 'Inheritance (Generalization)', correct: true },
      { id: 'd', text: 'Dependency', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'In a class diagram, what does "◆" (filled diamond) at one end of a line represent?',
    options: [
      { id: 'a', text: 'Aggregation - the part can exist independently', correct: false },
      { id: 'b', text: 'Composition - the part cannot exist without the whole', correct: true },
      { id: 'c', text: 'Dependency - temporary usage', correct: false },
      { id: 'd', text: 'Realization - implements an interface', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'In a sequence diagram, what does a dashed arrow pointing left typically represent?',
    options: [
      { id: 'a', text: 'A synchronous method call', correct: false },
      { id: 'b', text: 'An asynchronous message', correct: false },
      { id: 'c', text: 'A return message / response', correct: true },
      { id: 'd', text: 'An object creation', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What does the multiplicity notation "1..*" mean?',
    options: [
      { id: 'a', text: 'Exactly one instance', correct: false },
      { id: 'b', text: 'Zero or more instances', correct: false },
      { id: 'c', text: 'Zero or one instance', correct: false },
      { id: 'd', text: 'One or more instances', correct: true },
    ],
  },
  {
    id: 'q5',
    question: 'Which UML diagram best shows the flow of messages between objects over time?',
    options: [
      { id: 'a', text: 'Class Diagram', correct: false },
      { id: 'b', text: 'Sequence Diagram', correct: true },
      { id: 'c', text: 'Use Case Diagram', correct: false },
      { id: 'd', text: 'Activity Diagram', correct: false },
    ],
  },
  {
    id: 'q6',
    question: 'In a use case diagram, what does the stick figure represent?',
    options: [
      { id: 'a', text: 'A class in the system', correct: false },
      { id: 'b', text: 'An actor (user or external system)', correct: true },
      { id: 'c', text: 'A database table', correct: false },
      { id: 'd', text: 'A microservice', correct: false },
    ],
  },
  {
    id: 'q7',
    question: 'What is the difference between aggregation (◇) and composition (◆)?',
    options: [
      { id: 'a', text: 'Aggregation is for classes, composition is for interfaces', correct: false },
      { id: 'b', text: 'Aggregation is stronger than composition', correct: false },
      { id: 'c', text: 'In composition, the child cannot exist without the parent; in aggregation it can', correct: true },
      { id: 'd', text: 'There is no difference, they are interchangeable', correct: false },
    ],
  },
  {
    id: 'q8',
    question: 'When would you choose a sequence diagram over a class diagram in a system design interview?',
    options: [
      { id: 'a', text: 'When showing data model relationships', correct: false },
      { id: 'b', text: 'When illustrating how components interact during a specific flow', correct: true },
      { id: 'c', text: 'When listing all attributes of a service', correct: false },
      { id: 'd', text: 'When defining database schema', correct: false },
    ],
  },
]

/* ── Diagram type comparison ── */
const diagramTypes = [
  {
    name: 'Class Diagram',
    icon: Square,
    purpose: 'Shows structure: classes, attributes, methods, and relationships',
    when: 'Data model design, OOP architecture, entity relationships',
    color: 'text-quest-primary',
    bg: 'bg-quest-primary/20',
  },
  {
    name: 'Sequence Diagram',
    icon: ArrowRight,
    purpose: 'Shows behavior: message flow between objects over time',
    when: 'API flows, request lifecycles, inter-service communication',
    color: 'text-quest-secondary',
    bg: 'bg-quest-secondary/20',
  },
  {
    name: 'Use Case Diagram',
    icon: Users,
    purpose: 'Shows functionality: what actors can do with the system',
    when: 'Requirements gathering, system scope, user stories',
    color: 'text-quest-warning',
    bg: 'bg-quest-warning/20',
  },
  {
    name: 'Activity Diagram',
    icon: Activity,
    purpose: 'Shows workflow: decision points, parallel paths, process flow',
    when: 'Business logic, checkout flows, state machines',
    color: 'text-quest-success',
    bg: 'bg-quest-success/20',
  },
]

/* ── Main Component ── */

export default function Level28({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* Class diagram builder state */
  const [selectedRelType, setSelectedRelType] = useState('association')
  const [connections, setConnections] = useState([])
  const [connectFrom, setConnectFrom] = useState(null)

  /* Sequence diagram state */
  const [seqStep, setSeqStep] = useState(-1)
  const [seqPlaying, setSeqPlaying] = useState(false)

  /* Relationship quiz state */
  const [relQuizIndex, setRelQuizIndex] = useState(0)
  const [relQuizAnswer, setRelQuizAnswer] = useState(null)
  const [relQuizScore, setRelQuizScore] = useState(0)

  /* Activity diagram state */
  const [activeNode, setActiveNode] = useState(null)

  const sections = ['intro', 'class', 'sequence', 'activity', 'quiz']

  /* ── Sequence diagram playback ── */
  const playSequence = useCallback(() => {
    if (seqPlaying) return
    setSeqPlaying(true)
    setSeqStep(-1)
    let step = 0
    const interval = setInterval(() => {
      if (step >= sequenceMessages.length) {
        clearInterval(interval)
        setSeqPlaying(false)
        return
      }
      setSeqStep(step)
      step++
    }, 800)
  }, [seqPlaying])

  /* ── Class connection handler ── */
  const handleClassClick = useCallback((classId) => {
    if (connectFrom === null) {
      setConnectFrom(classId)
    } else if (connectFrom !== classId) {
      setConnections(prev => [
        ...prev,
        { from: connectFrom, to: classId, type: selectedRelType }
      ])
      setConnectFrom(null)
    } else {
      setConnectFrom(null)
    }
  }, [connectFrom, selectedRelType])

  /* ── Relationship quiz mini-game ── */
  const relQuizItems = [
    { symbol: '——▷', answer: 'inheritance', label: 'What relationship does this arrow represent?' },
    { symbol: '◆——', answer: 'composition', label: 'What relationship does the filled diamond represent?' },
    { symbol: '◇——', answer: 'aggregation', label: 'What relationship does the open diamond represent?' },
    { symbol: '- - ->', answer: 'dependency', label: 'What relationship does the dashed arrow represent?' },
    { symbol: '- - -▷', answer: 'realization', label: 'What relationship does the dashed triangle represent?' },
  ]

  const handleRelQuizAnswer = (answer) => {
    setRelQuizAnswer(answer)
    if (answer === relQuizItems[relQuizIndex].answer) {
      setRelQuizScore(prev => prev + 1)
    }
    setTimeout(() => {
      setRelQuizAnswer(null)
      setRelQuizIndex(prev => Math.min(prev + 1, relQuizItems.length - 1))
    }, 1200)
  }

  /* ── Quiz submit ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      return q.options.find(o => o.id === selected)?.correct
    })
    if (allCorrect) onComplete?.()
    else onComplete?.()
  }

  /* ── Section nav ── */
  const goNext = () => setCurrentSection(prev => Math.min(prev + 1, sections.length - 1))
  const goPrev = () => setCurrentSection(prev => Math.max(prev - 1, 0))

  /* ── Helper: get class center position for drawing connections ── */
  const getClassCenter = (classId) => {
    const cls = classTemplates.find(c => c.id === classId)
    if (!cls) return { x: 0, y: 0 }
    return { x: cls.x + 110, y: cls.y + 80 }
  }

  /* ── Render relationship line style ── */
  const getRelLineStyle = (type) => {
    const rel = relationshipTypes.find(r => r.id === type)
    return rel?.lineStyle === 'dashed' ? '8,4' : 'none'
  }

  const getRelColor = (type) => {
    const colors = {
      association: '#60a5fa',
      inheritance: '#a78bfa',
      composition: '#f87171',
      aggregation: '#fbbf24',
      dependency: '#34d399',
      realization: '#f472b6',
    }
    return colors[type] || '#60a5fa'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section navigation */}
      <div className="flex items-center gap-2 mb-8">
        {sections.map((section, i) => (
          <button
            key={section}
            onClick={() => setCurrentSection(i)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize
              ${i === currentSection
                ? 'bg-quest-primary text-white'
                : i < currentSection
                  ? 'bg-quest-success/20 text-quest-success'
                  : 'bg-quest-surface/50 text-quest-muted'
              }`}
          >
            {section === 'class' ? 'Class Diagrams' : section === 'sequence' ? 'Sequence' : section}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
           SECTION 0 - INTRO
         ══════════════════════════════════════════════════════ */}
      {currentSection === 0 && (
        <motion.div
          key="intro"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <PenTool size={40} className="text-quest-primary" />
              <h2 className="text-3xl font-bold">Drawing the Blueprint</h2>
            </div>
            <p className="text-quest-muted text-lg max-w-2xl mx-auto">
              "The interviewer asks you to design on the whiteboard. Do you know what to draw?"
            </p>
          </div>

          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Why UML Diagrams Matter</h3>
            <p className="text-quest-muted mb-4">
              In system design interviews, you need a shared visual language to communicate architecture.{' '}
              <Term word="UML" definition="Unified Modeling Language - a standardized way to visualize system design using different types of diagrams." onLearn={learnTerm} />{' '}
              gives you that language. You do not need to memorize every notation, but you do need to draw
              clear diagrams that communicate structure and behavior.
            </p>
            <p className="text-quest-muted mb-6">
              Think of UML diagrams as the architect's blueprints. A{' '}
              <Term word="Class Diagram" definition="A structural diagram showing classes, their attributes, methods, and relationships to other classes." onLearn={learnTerm} />{' '}
              shows what things are.{' '}
              A <Term word="Sequence Diagram" definition="A behavioral diagram showing how objects interact over time through a series of messages." onLearn={learnTerm} />{' '}
              shows how things talk. A{' '}
              <Term word="Use Case Diagram" definition="A diagram showing the functionality a system provides, represented as use cases connected to actors." onLearn={learnTerm} />{' '}
              shows what the system does. An{' '}
              <Term word="Activity Diagram" definition="A diagram showing workflows with decision points, parallel activities, and sequential steps." onLearn={learnTerm} />{' '}
              shows how work flows.
            </p>

            {/* Diagram type cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {diagramTypes.map((dt) => {
                const Icon = dt.icon
                return (
                  <div key={dt.name} className={`${dt.bg} rounded-lg p-4 border border-white/5`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={20} className={dt.color} />
                      <h4 className={`font-bold ${dt.color}`}>{dt.name}</h4>
                    </div>
                    <p className="text-sm text-quest-muted mb-2">{dt.purpose}</p>
                    <p className="text-xs text-quest-muted/70">
                      <span className="font-semibold">Use when:</span> {dt.when}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <DeepDive id="uml-history" title="A Brief History of UML" onRead={markDeepDiveRead}>
            <p className="text-sm text-quest-muted mb-3">
              UML was created in the mid-1990s by Grady Booch, Ivar Jacobson, and James Rumbaugh at Rational Software.
              Before UML, every developer used their own notation. UML unified these approaches into a single standard
              adopted by the Object Management Group (OMG) in 1997.
            </p>
            <p className="text-sm text-quest-muted mb-3">
              Today, UML 2.5 defines 14 diagram types, but in practice you only need 4-5 for system design interviews.
              The key insight: UML is a communication tool, not a specification language. Interviewers care about
              clarity, not whether your arrow heads are pixel-perfect.
            </p>
            <p className="text-sm text-quest-muted">
              Modern tools like Mermaid, PlantUML, and Excalidraw let you create UML diagrams quickly.
              Many engineers now prefer simplified "boxes and arrows" inspired by UML rather than strict UML notation.
            </p>
          </DeepDive>

          <DeepDive id="when-which-diagram" title="Choosing the Right Diagram for the Interview" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>
                <span className="font-bold text-quest-primary">Asked to "design the data model"?</span>{' '}
                Draw a Class Diagram. Show entities, their attributes, and how they relate.
              </p>
              <p>
                <span className="font-bold text-quest-secondary">Asked "walk me through the API flow"?</span>{' '}
                Draw a Sequence Diagram. Show the request traveling through services step by step.
              </p>
              <p>
                <span className="font-bold text-quest-warning">Asked "what can users do?"</span>{' '}
                Draw a Use Case Diagram. Show actors and the actions they can take.
              </p>
              <p>
                <span className="font-bold text-quest-success">Asked "describe the checkout process"?</span>{' '}
                Draw an Activity Diagram. Show the decision tree and branching logic.
              </p>
            </div>
          </DeepDive>

          <button onClick={goNext} className="btn-primary w-full mt-4">
            Start Drawing — Class Diagrams <ArrowRight size={16} className="inline ml-1" />
          </button>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════
           SECTION 1 - CLASS DIAGRAMS
         ══════════════════════════════════════════════════════ */}
      {currentSection === 1 && (
        <motion.div
          key="class"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-2xl font-bold mb-2">Class Diagram Builder</h2>
          <p className="text-quest-muted mb-6">
            Build a <Term word="Class Diagram" definition="A structural diagram showing classes, their attributes, methods, and relationships." onLearn={learnTerm} />{' '}
            by clicking two classes to connect them. Choose a{' '}
            <Term word="Relationships" definition="Lines connecting classes that show how they relate: association, inheritance, composition, aggregation, dependency, or realization." onLearn={learnTerm} />{' '}
            type first, then click the source class and then the target class.
          </p>

          {/* Relationship type selector */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-4">
            <h4 className="text-sm font-semibold mb-3 text-quest-muted">Select Relationship Type:</h4>
            <div className="flex flex-wrap gap-2">
              {relationshipTypes.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => { setSelectedRelType(rel.id); setConnectFrom(null) }}
                  className={`px-3 py-2 rounded-lg text-sm font-mono transition-all border
                    ${selectedRelType === rel.id
                      ? 'border-quest-primary bg-quest-primary/20 text-white'
                      : 'border-white/10 text-quest-muted hover:border-white/30'
                    }`}
                >
                  <span className="mr-2">{rel.symbol}</span>
                  {rel.name}
                </button>
              ))}
            </div>
            {connectFrom && (
              <p className="text-sm text-quest-warning mt-3">
                Now click the target class to create a {relationshipTypes.find(r => r.id === selectedRelType)?.name} connection
                from <span className="font-bold">{classTemplates.find(c => c.id === connectFrom)?.name}</span>.
              </p>
            )}
          </div>

          {/* Class diagram canvas */}
          <div className="bg-quest-surface/30 rounded-xl border border-white/10 p-4 mb-4 relative overflow-hidden" style={{ minHeight: 520 }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((conn, i) => {
                const from = getClassCenter(conn.from)
                const to = getClassCenter(conn.to)
                const color = getRelColor(conn.type)
                const dashArray = getRelLineStyle(conn.type)
                return (
                  <g key={i}>
                    <line
                      x1={from.x} y1={from.y}
                      x2={to.x} y2={to.y}
                      stroke={color}
                      strokeWidth={2}
                      strokeDasharray={dashArray}
                    />
                    {/* Arrow head indicator */}
                    <circle cx={to.x} cy={to.y} r={5} fill={color} />
                    {/* Label */}
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 8}
                      fill={color}
                      fontSize={11}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {relationshipTypes.find(r => r.id === conn.type)?.name}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Class boxes */}
            {classTemplates.map((cls) => (
              <motion.div
                key={cls.id}
                onClick={() => handleClassClick(cls.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`absolute cursor-pointer select-none rounded-lg border-2 overflow-hidden transition-colors
                  ${connectFrom === cls.id
                    ? 'border-quest-warning bg-quest-warning/10'
                    : 'border-quest-primary/60 bg-quest-surface/90 hover:border-quest-primary'
                  }`}
                style={{ left: cls.x, top: cls.y, width: 220, zIndex: 2 }}
              >
                {/* Class name header */}
                <div className="bg-quest-primary/30 px-3 py-2 text-center font-bold text-sm border-b border-quest-primary/40">
                  {cls.name}
                </div>
                {/* Properties */}
                <div className="px-3 py-2 border-b border-white/10">
                  {cls.properties.map((prop, i) => (
                    <p key={i} className="text-xs font-mono text-quest-muted">{prop}</p>
                  ))}
                </div>
                {/* Methods */}
                <div className="px-3 py-2">
                  {cls.methods.map((method, i) => (
                    <p key={i} className="text-xs font-mono text-quest-muted">{method}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connections log */}
          {connections.length > 0 && (
            <div className="bg-quest-surface/50 rounded-lg border border-white/10 p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Connections ({connections.length})</h4>
                <button
                  onClick={() => setConnections([])}
                  className="text-xs text-quest-danger hover:underline"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-1">
                {connections.map((conn, i) => {
                  const fromName = classTemplates.find(c => c.id === conn.from)?.name
                  const toName = classTemplates.find(c => c.id === conn.to)?.name
                  const rel = relationshipTypes.find(r => r.id === conn.type)
                  return (
                    <div key={i} className="flex items-center gap-2 text-sm font-mono" style={{ color: getRelColor(conn.type) }}>
                      <span>{fromName}</span>
                      <span className="text-quest-muted">{rel?.symbol}</span>
                      <span>{toName}</span>
                      <span className="text-quest-muted text-xs ml-2">({rel?.name})</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Multiplicity reference */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-4">
            <h4 className="font-bold mb-3">
              <Term word="Multiplicity" definition="Notation on relationships indicating how many instances of one class relate to instances of another (e.g., 1..*, 0..1)." onLearn={learnTerm} />{' '}
              Notation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {multiplicityExamples.map((m) => (
                <div key={m.notation} className="flex items-start gap-3 p-2 rounded bg-quest-surface/40">
                  <span className="font-mono text-quest-primary font-bold text-lg w-12 text-center shrink-0">{m.notation}</span>
                  <div>
                    <p className="text-sm font-semibold">{m.meaning}</p>
                    <p className="text-xs text-quest-muted">{m.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Relationship identifier mini-game */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-6">
            <h4 className="font-bold mb-3">Relationship Identifier Challenge</h4>
            <p className="text-sm text-quest-muted mb-4">
              Can you identify each UML relationship type by its symbol?
            </p>

            {relQuizIndex < relQuizItems.length && (
              <div className="text-center mb-4">
                <div className="text-4xl font-mono mb-3 text-white py-4">
                  {relQuizItems[relQuizIndex].symbol}
                </div>
                <p className="text-sm text-quest-muted mb-4">{relQuizItems[relQuizIndex].label}</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {relationshipTypes.map((rel) => {
                    const isCorrectAnswer = rel.id === relQuizItems[relQuizIndex].answer
                    const isSelected = relQuizAnswer === rel.id
                    return (
                      <button
                        key={rel.id}
                        onClick={() => !relQuizAnswer && handleRelQuizAnswer(rel.id)}
                        disabled={!!relQuizAnswer}
                        className={`px-4 py-2 rounded-lg text-sm border transition-all
                          ${relQuizAnswer
                            ? isCorrectAnswer
                              ? 'border-quest-success bg-quest-success/20 text-quest-success'
                              : isSelected
                                ? 'border-quest-danger bg-quest-danger/20 text-quest-danger'
                                : 'border-white/10 text-quest-muted opacity-50'
                            : 'border-white/10 text-quest-muted hover:border-white/30'
                          }`}
                      >
                        {rel.name}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-quest-muted mt-3">
                  Score: {relQuizScore} / {relQuizItems.length} | Question {relQuizIndex + 1} of {relQuizItems.length}
                </p>
              </div>
            )}

            {relQuizIndex >= relQuizItems.length - 1 && relQuizAnswer && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center mt-4 p-3 bg-quest-success/10 rounded-lg border border-quest-success/30"
              >
                <p className="font-bold text-quest-success">
                  Challenge Complete! {relQuizScore}/{relQuizItems.length} correct
                </p>
              </motion.div>
            )}
          </div>

          <DeepDive id="class-diagram-tips" title="Class Diagram Tips for Interviews" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>
                <span className="font-bold text-white">Start with nouns.</span> Read the requirements and underline every noun.
                Each noun is a potential class: User, Order, Product, Payment.
              </p>
              <p>
                <span className="font-bold text-white">Add verbs as methods.</span> "User places an order" becomes
                Order.place() or User.placeOrder(). Verbs are your methods.
              </p>
              <p>
                <span className="font-bold text-white">Keep it simple.</span> In an interview, 4-6 classes is usually enough.
                Focus on the core domain model, not every possible entity.
              </p>
              <p>
                <span className="font-bold text-white">Show multiplicities.</span> Adding "1..*" next to a relationship instantly
                shows you understand cardinality. It is a small detail that impresses interviewers.
              </p>
            </div>
          </DeepDive>

          <div className="flex gap-3 mt-4">
            <button onClick={goPrev} className="btn-secondary flex-1">Back</button>
            <button onClick={goNext} className="btn-primary flex-1">
              Sequence Diagrams <ArrowRight size={16} className="inline ml-1" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════
           SECTION 2 - SEQUENCE DIAGRAMS
         ══════════════════════════════════════════════════════ */}
      {currentSection === 2 && (
        <motion.div
          key="sequence"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-2xl font-bold mb-2">Sequence Diagram Visualizer</h2>
          <p className="text-quest-muted mb-6">
            Watch messages flow between objects in real time. A{' '}
            <Term word="Sequence Diagram" definition="Shows how objects interact over time. Vertical lines are lifelines, horizontal arrows are messages." onLearn={learnTerm} />{' '}
            captures the order of interactions during a specific use case.
          </p>

          {/* Controls */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={playSequence}
              disabled={seqPlaying}
              className="btn-primary disabled:opacity-50"
            >
              {seqPlaying ? 'Playing...' : 'Play Sequence'}
            </button>
            <button
              onClick={() => { setSeqStep(-1); setSeqPlaying(false) }}
              className="btn-secondary"
            >
              Reset
            </button>
            <span className="text-sm text-quest-muted ml-auto">
              Step: {seqStep + 1} / {sequenceMessages.length}
            </span>
          </div>

          {/* Sequence diagram */}
          <div className="bg-quest-surface/30 rounded-xl border border-white/10 p-6 mb-6 overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Actor headers */}
              <div className="flex justify-between mb-2">
                {sequenceActors.map((actor, i) => (
                  <div key={actor} className="text-center" style={{ width: 120 }}>
                    <motion.div
                      animate={{
                        borderColor: seqStep >= 0 && (
                          sequenceMessages[seqStep]?.from === i || sequenceMessages[seqStep]?.to === i
                        ) ? '#60a5fa' : 'rgba(255,255,255,0.15)'
                      }}
                      className="border-2 rounded-lg px-2 py-2 bg-quest-surface/60 mx-auto"
                      style={{ maxWidth: 110 }}
                    >
                      <p className="text-xs font-bold truncate">{actor}</p>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Lifelines and messages */}
              <div className="relative" style={{ height: sequenceMessages.length * 48 + 20 }}>
                {/* Lifelines (vertical dashed lines) */}
                {sequenceActors.map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 border-l-2 border-dashed border-white/10"
                    style={{
                      left: `${(i / (sequenceActors.length - 1)) * 100}%`,
                      height: '100%',
                      transform: 'translateX(60px)',
                    }}
                  />
                ))}

                {/* Messages */}
                {sequenceMessages.map((msg, i) => {
                  const isVisible = i <= seqStep
                  const isCurrent = i === seqStep
                  const fromX = (msg.from / (sequenceActors.length - 1)) * 100
                  const toX = (msg.to / (sequenceActors.length - 1)) * 100
                  const y = i * 48 + 10
                  const isReturn = msg.type === 'return'
                  const isAsync = msg.type === 'async'

                  return (
                    <AnimatePresence key={i}>
                      {isVisible && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute w-full"
                          style={{ top: y }}
                        >
                          {/* Message label */}
                          <div
                            className="absolute text-center"
                            style={{
                              left: `${Math.min(fromX, toX)}%`,
                              width: `${Math.abs(toX - fromX)}%`,
                              top: -14,
                              paddingLeft: 60,
                              paddingRight: 0,
                            }}
                          >
                            <span className={`text-xs font-mono ${
                              isCurrent ? 'text-white font-bold' :
                              isReturn ? 'text-quest-success' :
                              isAsync ? 'text-quest-warning' :
                              'text-quest-muted'
                            }`}>
                              {msg.label}
                            </span>
                          </div>

                          {/* Arrow line */}
                          <svg className="absolute w-full" style={{ height: 20, top: 0 }}>
                            <line
                              x1={`${fromX}%`}
                              y1={10}
                              x2={`${toX}%`}
                              y2={10}
                              stroke={isCurrent ? '#60a5fa' : isReturn ? '#34d399' : '#94a3b8'}
                              strokeWidth={isCurrent ? 2.5 : 1.5}
                              strokeDasharray={isReturn || isAsync ? '6,3' : 'none'}
                              transform="translate(60, 0)"
                            />
                            {/* Arrowhead */}
                            <polygon
                              points={toX > fromX
                                ? `${toX}%,10 ${toX - 1}%,5 ${toX - 1}%,15`
                                : `${toX}%,10 ${toX + 1}%,5 ${toX + 1}%,15`
                              }
                              fill={isCurrent ? '#60a5fa' : isReturn ? '#34d399' : '#94a3b8'}
                              transform="translate(60, 0)"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Step-by-step manual navigation */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-4">
            <h4 className="font-bold mb-3">Step Through Manually</h4>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setSeqStep(prev => Math.max(-1, prev - 1))}
                disabled={seqPlaying}
                className="btn-secondary text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setSeqStep(prev => Math.min(sequenceMessages.length - 1, prev + 1))}
                disabled={seqPlaying}
                className="btn-secondary text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
            {seqStep >= 0 && seqStep < sequenceMessages.length && (
              <motion.div
                key={seqStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-quest-surface/40 border border-white/5"
              >
                <p className="text-sm">
                  <span className="font-bold text-quest-primary">{sequenceActors[sequenceMessages[seqStep].from]}</span>
                  {' '}<ArrowRight size={14} className="inline text-quest-muted" />{' '}
                  <span className="font-bold text-quest-secondary">{sequenceActors[sequenceMessages[seqStep].to]}</span>
                </p>
                <p className="text-sm font-mono text-quest-muted mt-1">{sequenceMessages[seqStep].label}</p>
                <p className="text-xs text-quest-muted mt-1">
                  Type: <span className={`font-semibold ${
                    sequenceMessages[seqStep].type === 'return' ? 'text-quest-success' :
                    sequenceMessages[seqStep].type === 'async' ? 'text-quest-warning' :
                    'text-quest-primary'
                  }`}>
                    {sequenceMessages[seqStep].type === 'sync' ? 'Synchronous call' :
                     sequenceMessages[seqStep].type === 'async' ? 'Asynchronous message' :
                     'Return / response'}
                  </span>
                </p>
              </motion.div>
            )}
          </div>

          {/* Message type legend */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-6">
            <h4 className="font-bold mb-3">Message Types</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-3 p-2 rounded bg-quest-surface/40">
                <div className="w-12 h-0.5 bg-quest-primary" />
                <div>
                  <p className="text-sm font-semibold">Synchronous</p>
                  <p className="text-xs text-quest-muted">Solid line, filled arrowhead. Caller waits for response.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded bg-quest-surface/40">
                <div className="w-12 h-0.5 border-t-2 border-dashed border-quest-warning" />
                <div>
                  <p className="text-sm font-semibold">Asynchronous</p>
                  <p className="text-xs text-quest-muted">Dashed line, open arrowhead. Caller does not wait.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 rounded bg-quest-surface/40">
                <div className="w-12 h-0.5 border-t-2 border-dashed border-quest-success" />
                <div>
                  <p className="text-sm font-semibold">Return</p>
                  <p className="text-xs text-quest-muted">Dashed line going back. Response to a prior call.</p>
                </div>
              </div>
            </div>
          </div>

          <DeepDive id="sequence-advanced" title="Advanced Sequence Diagram Patterns" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>
                <span className="font-bold text-white">Activation bars:</span> Thin rectangles on lifelines showing when an
                object is actively processing. Helps visualize which service is "busy" at each point.
              </p>
              <p>
                <span className="font-bold text-white">Fragments:</span> Boxes around groups of messages showing conditions:
                "alt" for if/else, "loop" for repetition, "opt" for optional steps, "par" for parallel execution.
              </p>
              <p>
                <span className="font-bold text-white">Self-calls:</span> An object can send a message to itself (a loop-back arrow).
                Common for internal processing steps like validation or transformation.
              </p>
              <p>
                <span className="font-bold text-white">Interview tip:</span> In interviews, simplified sequence diagrams work best.
                Use solid arrows for requests, dashed arrows for responses. Label every arrow. Skip activation bars unless asked.
              </p>
            </div>
          </DeepDive>

          <div className="flex gap-3 mt-4">
            <button onClick={goPrev} className="btn-secondary flex-1">Back</button>
            <button onClick={goNext} className="btn-primary flex-1">
              Activity Diagrams <ArrowRight size={16} className="inline ml-1" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════
           SECTION 3 - ACTIVITY DIAGRAMS & USE CASES
         ══════════════════════════════════════════════════════ */}
      {currentSection === 3 && (
        <motion.div
          key="activity"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-2xl font-bold mb-2">Activity & Use Case Diagrams</h2>
          <p className="text-quest-muted mb-6">
            An <Term word="Activity Diagram" definition="Shows the flow of control from action to action, including decision points and parallel branches." onLearn={learnTerm} />{' '}
            models workflows. A <Term word="Use Case Diagram" definition="Shows what users (actors) can do with a system, connecting actors to oval-shaped use cases." onLearn={learnTerm} />{' '}
            captures requirements at a high level.
          </p>

          {/* Activity diagram visualization */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-6">
            <h3 className="font-bold mb-3">E-Commerce Checkout Activity Diagram</h3>
            <p className="text-sm text-quest-muted mb-4">Click on any node to highlight its connections.</p>

            <div className="relative bg-quest-surface/30 rounded-lg p-4" style={{ height: 560 }}>
              {/* Edges */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {activityEdges.map((edge, i) => {
                  const fromNode = activitySteps.find(s => s.id === edge.from)
                  const toNode = activitySteps.find(s => s.id === edge.to)
                  if (!fromNode || !toNode) return null

                  const isHighlighted = activeNode === edge.from || activeNode === edge.to
                  const fromY = fromNode.type === 'start' || fromNode.type === 'end' ? fromNode.y + 15 : fromNode.y + 20
                  const toY = toNode.type === 'start' || toNode.type === 'end' ? toNode.y + 15 : toNode.y + 20

                  /* Handle the loop-back for "Yes" from decision1 to browse */
                  const isLoopBack = edge.from === 'decision1' && edge.to === 'browse'
                  const isRetry = edge.from === 'retry' && edge.to === 'decision2'

                  if (isLoopBack) {
                    return (
                      <g key={i}>
                        <path
                          d={`M ${fromNode.x + 80} ${fromY} L 480 ${fromY} L 480 ${toY} L ${toNode.x + 80} ${toY}`}
                          fill="none"
                          stroke={isHighlighted ? '#60a5fa' : 'rgba(255,255,255,0.2)'}
                          strokeWidth={isHighlighted ? 2.5 : 1.5}
                        />
                        {edge.label && (
                          <text x={485} y={(fromY + toY) / 2} fill={isHighlighted ? '#60a5fa' : '#64748b'} fontSize={11}>
                            {edge.label}
                          </text>
                        )}
                      </g>
                    )
                  }

                  if (isRetry) {
                    return (
                      <g key={i}>
                        <path
                          d={`M ${fromNode.x + 60} ${fromY} L ${fromNode.x + 60} ${toY + 40} L ${toNode.x + 80} ${toY + 40} L ${toNode.x + 80} ${toY + 20}`}
                          fill="none"
                          stroke={isHighlighted ? '#60a5fa' : 'rgba(255,255,255,0.2)'}
                          strokeWidth={isHighlighted ? 2.5 : 1.5}
                        />
                      </g>
                    )
                  }

                  return (
                    <g key={i}>
                      <line
                        x1={fromNode.x + 60} y1={fromY + 20}
                        x2={toNode.x + 60} y2={toY}
                        stroke={isHighlighted ? '#60a5fa' : 'rgba(255,255,255,0.2)'}
                        strokeWidth={isHighlighted ? 2.5 : 1.5}
                      />
                      {edge.label && (
                        <text
                          x={(fromNode.x + toNode.x) / 2 + 70}
                          y={(fromY + 20 + toY) / 2}
                          fill={isHighlighted ? '#60a5fa' : '#64748b'}
                          fontSize={11}
                          fontWeight="bold"
                        >
                          {edge.label}
                        </text>
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Nodes */}
              {activitySteps.map((step) => {
                const isActive = activeNode === step.id
                const isConnected = activeNode && activityEdges.some(
                  e => (e.from === activeNode && e.to === step.id) || (e.to === activeNode && e.from === step.id)
                )

                if (step.type === 'start' || step.type === 'end') {
                  return (
                    <motion.div
                      key={step.id}
                      onClick={() => setActiveNode(activeNode === step.id ? null : step.id)}
                      className={`absolute cursor-pointer rounded-full border-2 flex items-center justify-center
                        ${step.type === 'start' ? 'bg-quest-success/30 border-quest-success' : 'bg-quest-danger/30 border-quest-danger'}
                        ${isActive ? 'ring-2 ring-quest-primary' : ''}
                      `}
                      style={{ left: step.x, top: step.y, width: 30, height: 30, zIndex: 2 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <span className="text-xs font-bold">{step.type === 'start' ? 'S' : 'E'}</span>
                    </motion.div>
                  )
                }

                if (step.type === 'decision') {
                  return (
                    <motion.div
                      key={step.id}
                      onClick={() => setActiveNode(activeNode === step.id ? null : step.id)}
                      className={`absolute cursor-pointer flex items-center justify-center
                        ${isActive || isConnected ? 'text-quest-warning' : 'text-quest-muted'}
                      `}
                      style={{ left: step.x - 10, top: step.y, zIndex: 2 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`w-32 h-10 border-2 flex items-center justify-center
                        ${isActive ? 'border-quest-warning bg-quest-warning/20' : 'border-white/20 bg-quest-surface/60'}
                      `}
                        style={{ transform: 'rotate(0deg)', borderRadius: 4 }}
                      >
                        <span className="text-xs font-bold text-center">{step.label}</span>
                      </div>
                    </motion.div>
                  )
                }

                return (
                  <motion.div
                    key={step.id}
                    onClick={() => setActiveNode(activeNode === step.id ? null : step.id)}
                    className={`absolute cursor-pointer rounded-lg border-2 px-3 py-2 text-center
                      ${isActive
                        ? 'border-quest-primary bg-quest-primary/20'
                        : isConnected
                          ? 'border-quest-primary/50 bg-quest-primary/10'
                          : 'border-white/15 bg-quest-surface/60'
                      }`}
                    style={{ left: step.x - 10, top: step.y, zIndex: 2 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-xs font-semibold">{step.label}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Use Case Diagram example */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-4 mb-6">
            <h3 className="font-bold mb-3">Use Case Diagram: E-Commerce</h3>
            <p className="text-sm text-quest-muted mb-4">
              Actors are stick figures on the left, use cases are ovals inside the system boundary.
            </p>

            <div className="relative bg-quest-surface/30 rounded-lg p-4" style={{ height: 320 }}>
              {/* System boundary */}
              <div className="absolute border-2 border-dashed border-quest-secondary/30 rounded-xl"
                style={{ left: 160, top: 20, width: 320, height: 280 }}
              >
                <span className="absolute -top-3 left-4 bg-quest-surface/80 px-2 text-xs font-bold text-quest-secondary">
                  E-Commerce System
                </span>
              </div>

              {/* Actor: Customer */}
              <div className="absolute text-center" style={{ left: 30, top: 80 }}>
                <div className="text-3xl mb-1">🧑</div>
                <p className="text-xs font-bold">Customer</p>
              </div>

              {/* Actor: Admin */}
              <div className="absolute text-center" style={{ left: 30, top: 200 }}>
                <div className="text-3xl mb-1">👤</div>
                <p className="text-xs font-bold">Admin</p>
              </div>

              {/* Actor: Payment Gateway */}
              <div className="absolute text-center" style={{ left: 510, top: 140 }}>
                <div className="text-3xl mb-1">🏦</div>
                <p className="text-xs font-bold text-quest-muted">Payment<br />Gateway</p>
              </div>

              {/* Use cases */}
              {[
                { label: 'Browse Products', x: 240, y: 40 },
                { label: 'Place Order', x: 240, y: 100 },
                { label: 'Make Payment', x: 340, y: 160 },
                { label: 'Track Order', x: 240, y: 160 },
                { label: 'Manage Inventory', x: 240, y: 230 },
                { label: 'View Reports', x: 340, y: 260 },
              ].map((uc) => (
                <div
                  key={uc.label}
                  className="absolute border border-quest-primary/40 bg-quest-primary/10 rounded-full px-3 py-1 flex items-center justify-center"
                  style={{ left: uc.x, top: uc.y }}
                >
                  <span className="text-xs font-medium whitespace-nowrap">{uc.label}</span>
                </div>
              ))}

              {/* Connection lines (simplified) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Customer connections */}
                <line x1={80} y1={95} x2={240} y2={55} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                <line x1={80} y1={95} x2={240} y2={115} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                <line x1={80} y1={100} x2={240} y2={175} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                {/* Admin connections */}
                <line x1={80} y1={215} x2={240} y2={245} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                <line x1={80} y1={215} x2={340} y2={275} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
                {/* Payment Gateway connections */}
                <line x1={510} y1={155} x2={410} y2={175} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
              </svg>
            </div>
          </div>

          <DeepDive id="activity-patterns" title="Activity Diagram Decision Patterns" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>
                <span className="font-bold text-white">Fork and Join:</span> A horizontal bar splits flow into parallel paths
                (fork) and merges them back (join). Example: after placing an order, send confirmation email AND update inventory simultaneously.
              </p>
              <p>
                <span className="font-bold text-white">Swimlanes:</span> Vertical or horizontal partitions showing which actor or
                service is responsible for each action. Great for showing service boundaries in microservice architectures.
              </p>
              <p>
                <span className="font-bold text-white">Guard conditions:</span> Text in square brackets on edges showing what
                condition must be true. Example: [amount &gt; 100] leads to "Require Manager Approval".
              </p>
            </div>
          </DeepDive>

          <DeepDive id="use-case-tips" title="Use Case Diagrams in Practice" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>
                <span className="font-bold text-white">Keep it high-level.</span> Use cases represent goals, not individual steps.
                "Place Order" is a use case. "Click the checkout button" is not.
              </p>
              <p>
                <span className="font-bold text-white">Include and Extend:</span> Use "include" when one use case always triggers
                another (Place Order always includes Make Payment). Use "extend" when one use case optionally adds to another
                (Place Order may be extended by Apply Coupon).
              </p>
              <p>
                <span className="font-bold text-white">Actors can be systems too.</span> A Payment Gateway, an external API, or a
                cron job can all be actors. They interact with your system from outside.
              </p>
            </div>
          </DeepDive>

          <div className="flex gap-3 mt-4">
            <button onClick={goPrev} className="btn-secondary flex-1">Back</button>
            <button onClick={goNext} className="btn-primary flex-1">
              Take the Quiz <ArrowRight size={16} className="inline ml-1" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════
           SECTION 4 - QUIZ
         ══════════════════════════════════════════════════════ */}
      {currentSection === 4 && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h2 className="text-2xl font-bold mb-2">UML Diagrams Quiz</h2>
          <p className="text-quest-muted mb-6">
            Test your understanding of class diagrams, sequence diagrams, relationship types,
            and when to use which diagram.
          </p>

          <div className="space-y-6">
            {quizQuestions.map((q, qi) => (
              <div key={q.id} className="bg-quest-surface/50 rounded-xl border border-white/10 p-5">
                <p className="font-semibold mb-3">
                  <span className="text-quest-primary mr-2">Q{qi + 1}.</span>
                  {q.question}
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
              <h3 className="text-xl font-bold mb-2">Level 28 Complete!</h3>
              <p className="text-quest-muted mb-4">
                You now know how to draw UML blueprints on the whiteboard: class diagrams for structure,
                sequence diagrams for behavior, activity diagrams for workflows, and use case diagrams
                for requirements. The interviewer will be impressed.
              </p>
              <p className="text-sm text-sky-400">
                Your blueprints are ready. The architecture speaks for itself.
              </p>
            </motion.div>
          )}

          <div className="flex gap-3 mt-4">
            <button onClick={goPrev} className="btn-secondary flex-1">Back</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

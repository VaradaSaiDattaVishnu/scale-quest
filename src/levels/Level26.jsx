import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Box, Layers, GitBranch, Eye, Code, Boxes,
  Lock, Unlock, Plus, Trash2, ArrowRight, ArrowDown,
  Shuffle, Shield, Settings, Zap
} from 'lucide-react'

/* ══════════════════════════════════════════════════════
   Reusable Sub-Components
   ══════════════════════════════════════════════════════ */

function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const handleClick = () => { setShowTooltip(!showTooltip); if (onLearn) onLearn(word) }
  return (
    <span className="relative inline-block">
      <span className="term cursor-pointer" onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>{word}</span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 z-50">
            <p className="font-semibold text-quest-primary mb-1">{word}</p>
            <p className="text-sm text-quest-text">{definition}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

function DeepDive({ title, children, id, onRead }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => { setIsOpen(!isOpen); if (!isOpen && onRead) onRead(id) }
  return (
    <div className="my-4 border border-quest-primary/20 rounded-lg overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between p-4 bg-quest-primary/5 hover:bg-quest-primary/10 transition-colors">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-quest-primary" />
          <span className="font-semibold text-quest-primary">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-4 text-sm text-quest-muted leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   Data: Inheritance Tree
   ══════════════════════════════════════════════════════ */

const inheritanceTree = {
  name: 'Animal',
  properties: ['name: string', 'age: number'],
  methods: ['speak(): string', 'move(): void'],
  color: 'purple',
  children: [
    {
      name: 'Dog',
      properties: ['breed: string'],
      methods: ['fetch(): void'],
      overrides: ['speak() → "Woof!"', 'move() → runs on four legs'],
      color: 'amber',
      children: [
        { name: 'GoldenRetriever', properties: ['coatColor: string'], methods: ['swim(): void'], overrides: ['fetch() → loves fetching!'], color: 'yellow', children: [] },
        { name: 'Bulldog', properties: ['isBrachycephalic: boolean'], methods: [], overrides: ['move() → waddles slowly'], color: 'orange', children: [] }
      ]
    },
    {
      name: 'Cat',
      properties: ['isIndoor: boolean'],
      methods: ['purr(): void', 'scratch(): void'],
      overrides: ['speak() → "Meow!"', 'move() → sneaks silently'],
      color: 'sky',
      children: [
        { name: 'Siamese', properties: ['pointColor: string'], methods: ['vocalize(): void'], overrides: ['speak() → loud Meow!'], color: 'blue', children: [] }
      ]
    },
    {
      name: 'Bird',
      properties: ['wingspan: number'],
      methods: ['fly(): void'],
      overrides: ['speak() → "Tweet!"', 'move() → flies through air'],
      color: 'green',
      children: []
    }
  ]
}

/* ══════════════════════════════════════════════════════
   Data: Polymorphism Animals
   ══════════════════════════════════════════════════════ */

const polyAnimals = [
  { name: 'Dog', icon: '🐕', speakResult: 'Woof! Woof!', moveResult: 'Runs excitedly on four legs', color: 'amber' },
  { name: 'Cat', icon: '🐈', speakResult: 'Meow... *ignores you*', moveResult: 'Sneaks silently across the room', color: 'sky' },
  { name: 'Bird', icon: '🐦', speakResult: 'Tweet! Tweet! Chirp!', moveResult: 'Spreads wings and soars upward', color: 'green' },
  { name: 'Snake', icon: '🐍', speakResult: 'Hissssss...', moveResult: 'Slithers across the ground', color: 'red' },
  { name: 'Fish', icon: '🐟', speakResult: '*blub blub* (silence)', moveResult: 'Swims gracefully through water', color: 'cyan' }
]

/* ══════════════════════════════════════════════════════
   Data: Abstraction Layers
   ══════════════════════════════════════════════════════ */

const abstractionLayers = [
  {
    name: 'Interface: PaymentProcessor',
    level: 'abstract',
    code: 'interface PaymentProcessor {\n  charge(amount: number): Promise<Receipt>\n  refund(transactionId: string): Promise<void>\n  getBalance(): Promise<number>\n}',
    description: 'Only defines WHAT operations exist. No implementation details. Any payment system must support these three operations.',
    color: 'purple'
  },
  {
    name: 'Stripe Implementation',
    level: 'concrete',
    code: 'class StripeProcessor implements PaymentProcessor {\n  private apiKey: string\n  private stripeClient: Stripe\n\n  charge(amount) {\n    return this.stripeClient.charges.create({\n      amount, currency: "usd"\n    })\n  }\n  // ... refund, getBalance\n}',
    description: 'Uses Stripe SDK, API keys, specific HTTP calls. Completely hidden from the caller.',
    color: 'violet'
  },
  {
    name: 'PayPal Implementation',
    level: 'concrete',
    code: 'class PayPalProcessor implements PaymentProcessor {\n  private clientId: string\n  private oauthToken: string\n\n  charge(amount) {\n    return this.paypalApi.createOrder({\n      intent: "CAPTURE", amount\n    })\n  }\n  // ... refund, getBalance\n}',
    description: 'Completely different internals: OAuth tokens, REST API, different data structures. Same interface.',
    color: 'blue'
  }
]

/* ══════════════════════════════════════════════════════
   Data: Quiz Questions
   ══════════════════════════════════════════════════════ */

const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the primary benefit of encapsulation?',
    options: [
      { id: 'a', text: 'It makes code run faster by optimizing memory access patterns', correct: false },
      { id: 'b', text: 'It protects internal state from unauthorized access and reduces coupling between components', correct: true },
      { id: 'c', text: 'It allows objects to inherit properties from multiple parent classes', correct: false },
      { id: 'd', text: 'It enables the compiler to generate more efficient bytecode', correct: false }
    ]
  },
  {
    id: 'q2',
    question: 'When should you prefer composition over inheritance?',
    options: [
      { id: 'a', text: 'Never - inheritance is always superior because it enables code reuse', correct: false },
      { id: 'b', text: 'Only when working with functional programming languages', correct: false },
      { id: 'c', text: 'When you need "has-a" relationships and want to avoid deep class hierarchies', correct: true },
      { id: 'd', text: 'Only when the parent class has more than 10 methods', correct: false }
    ]
  },
  {
    id: 'q3',
    question: 'Which type of polymorphism is demonstrated when a Dog and Cat both have a speak() method inherited from Animal?',
    options: [
      { id: 'a', text: 'Ad-hoc polymorphism (method overloading)', correct: false },
      { id: 'b', text: 'Parametric polymorphism (generics)', correct: false },
      { id: 'c', text: 'Subtype polymorphism (method overriding)', correct: true },
      { id: 'd', text: 'Coercion polymorphism (type casting)', correct: false }
    ]
  },
  {
    id: 'q4',
    question: 'What is the primary purpose of abstraction in OOP?',
    options: [
      { id: 'a', text: 'To make all class members private by default', correct: false },
      { id: 'b', text: 'To hide complex implementation details and expose only essential features', correct: true },
      { id: 'c', text: 'To enable multiple inheritance in languages that do not support it', correct: false },
      { id: 'd', text: 'To convert runtime errors into compile-time errors', correct: false }
    ]
  },
  {
    id: 'q5',
    question: 'What is the key difference between an interface and an abstract class?',
    options: [
      { id: 'a', text: 'Interfaces are faster at runtime than abstract classes', correct: false },
      { id: 'b', text: 'Abstract classes can have state and default implementations; interfaces define only the contract', correct: true },
      { id: 'c', text: 'Interfaces can be instantiated directly; abstract classes cannot', correct: false },
      { id: 'd', text: 'There is no meaningful difference; they are interchangeable', correct: false }
    ]
  }
]

/* ══════════════════════════════════════════════════════
   Main Level Component
   ══════════════════════════════════════════════════════ */

function Level26({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* ── Encapsulation Builder State ── */
  const [classProperties, setClassProperties] = useState([
    { name: 'balance', type: 'number', access: 'private' },
    { name: 'owner', type: 'string', access: 'public' }
  ])
  const [classMethods, setClassMethods] = useState([
    { name: 'deposit', access: 'public', description: 'Add money to balance' },
    { name: 'withdraw', access: 'public', description: 'Remove money from balance' },
    { name: 'calculateInterest', access: 'private', description: 'Internal interest calc' }
  ])
  const [newPropName, setNewPropName] = useState('')
  const [newPropType, setNewPropType] = useState('string')
  const [newMethodName, setNewMethodName] = useState('')
  const [showEncapsulationDemo, setShowEncapsulationDemo] = useState(false)
  const [externalAccessAttempt, setExternalAccessAttempt] = useState(null)

  /* ── Inheritance State ── */
  const [selectedNode, setSelectedNode] = useState(null)
  const [expandedNodes, setExpandedNodes] = useState(new Set(['Animal']))

  /* ── Polymorphism State ── */
  const [activeMethod, setActiveMethod] = useState(null)
  const [calledAnimals, setCalledAnimals] = useState(new Set())

  /* ── Abstraction State ── */
  const [activeLayer, setActiveLayer] = useState(0)
  const [showImplementation, setShowImplementation] = useState(false)
  const [selectedProcessor, setSelectedProcessor] = useState(null)

  /* ── Quiz State ── */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Handlers ── */
  const addProperty = useCallback(() => {
    if (!newPropName.trim()) return
    setClassProperties(prev => [...prev, { name: newPropName.trim(), type: newPropType, access: 'private' }])
    setNewPropName('')
  }, [newPropName, newPropType])

  const addMethod = useCallback(() => {
    if (!newMethodName.trim()) return
    setClassMethods(prev => [...prev, { name: newMethodName.trim(), access: 'public', description: 'Custom method' }])
    setNewMethodName('')
  }, [newMethodName])

  const toggleAccess = useCallback((type, index) => {
    if (type === 'prop') {
      setClassProperties(prev => prev.map((p, i) =>
        i === index ? { ...p, access: p.access === 'public' ? 'private' : 'public' } : p
      ))
    } else {
      setClassMethods(prev => prev.map((m, i) =>
        i === index ? { ...m, access: m.access === 'public' ? 'private' : 'public' } : m
      ))
    }
  }, [])

  const removeProp = useCallback((index) => {
    setClassProperties(prev => prev.filter((_, i) => i !== index))
  }, [])

  const removeMethod = useCallback((index) => {
    setClassMethods(prev => prev.filter((_, i) => i !== index))
  }, [])

  const toggleNode = useCallback((nodeName) => {
    setExpandedNodes(prev => {
      const next = new Set(prev)
      if (next.has(nodeName)) next.delete(nodeName)
      else next.add(nodeName)
      return next
    })
  }, [])

  const attemptExternalAccess = useCallback((prop) => {
    setExternalAccessAttempt(prop)
    setTimeout(() => setExternalAccessAttempt(null), 3000)
  }, [])

  const callMethodOnAll = useCallback((method) => {
    setActiveMethod(method)
    setCalledAnimals(new Set())
    polyAnimals.forEach((_, i) => {
      setTimeout(() => {
        setCalledAnimals(prev => new Set([...prev, i]))
      }, i * 400)
    })
  }, [])

  const handleQuizSubmit = useCallback(() => {
    setQuizSubmitted(true)
    if (onComplete) {
      setTimeout(() => onComplete(), 500)
    }
  }, [onComplete])

  /* ── Section names for nav ── */
  const sections = [
    { label: 'The Four Pillars', icon: Boxes },
    { label: 'Encapsulation', icon: Lock },
    { label: 'Inheritance', icon: GitBranch },
    { label: 'Polymorphism', icon: Shuffle },
    { label: 'Abstraction', icon: Layers },
    { label: 'Knowledge Check', icon: CheckCircle }
  ]

  /* ── Render a tree node recursively ── */
  const renderTreeNode = (node, depth = 0) => {
    const isExpanded = expandedNodes.has(node.name)
    const isSelected = selectedNode === node.name
    const hasChildren = node.children && node.children.length > 0
    const colorMap = {
      purple: 'border-purple-500/40 bg-purple-500/10',
      amber: 'border-amber-500/40 bg-amber-500/10',
      yellow: 'border-yellow-500/40 bg-yellow-500/10',
      orange: 'border-orange-500/40 bg-orange-500/10',
      sky: 'border-sky-500/40 bg-sky-500/10',
      blue: 'border-blue-500/40 bg-blue-500/10',
      green: 'border-green-500/40 bg-green-500/10'
    }
    const textColorMap = {
      purple: 'text-purple-400',
      amber: 'text-amber-400',
      yellow: 'text-yellow-400',
      orange: 'text-orange-400',
      sky: 'text-sky-400',
      blue: 'text-blue-400',
      green: 'text-green-400'
    }

    return (
      <div key={node.name} className="relative" style={{ marginLeft: depth > 0 ? 24 : 0 }}>
        {depth > 0 && (
          <div className="absolute left-[-16px] top-0 bottom-0 w-px bg-white/10" />
        )}
        {depth > 0 && (
          <div className="absolute left-[-16px] top-5 w-4 h-px bg-white/10" />
        )}
        <motion.div
          layout
          className={`mb-2 rounded-lg border p-3 cursor-pointer transition-all
            ${isSelected ? 'ring-1 ring-quest-primary' : ''}
            ${colorMap[node.color] || 'border-white/10 bg-quest-surface'}`}
          onClick={() => { setSelectedNode(isSelected ? null : node.name); if (hasChildren) toggleNode(node.name) }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Box size={14} className={textColorMap[node.color] || 'text-quest-primary'} />
              <span className={`font-semibold text-sm ${textColorMap[node.color] || ''}`}>{node.name}</span>
              {hasChildren && (
                <span className="text-[10px] text-quest-muted">({node.children.length} subclasses)</span>
              )}
            </div>
            {hasChildren && (
              isExpanded ? <ChevronUp size={14} className="text-quest-muted" /> : <ChevronDown size={14} className="text-quest-muted" />
            )}
          </div>

          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                  {node.properties && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-quest-muted">Properties</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.properties.map(p => (
                          <span key={p} className="text-[11px] px-2 py-0.5 rounded bg-quest-bg border border-white/5 text-quest-text font-mono">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {node.methods && node.methods.length > 0 && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-quest-muted">Methods</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.methods.map(m => (
                          <span key={m} className="text-[11px] px-2 py-0.5 rounded bg-quest-bg border border-white/5 text-green-400 font-mono">{m}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {node.overrides && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-yellow-400">Overrides</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.overrides.map(o => (
                          <span key={o} className="text-[11px] px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 font-mono">{o}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {node.children.map(child => renderTreeNode(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ── Section Navigation ── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sections.map((s, i) => {
          const Icon = s.icon
          return (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${currentSection === i
                  ? 'bg-quest-primary text-white'
                  : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-quest-text hover:border-white/20'}`}
            >
              <Icon size={14} />
              {s.label}
            </button>
          )
        })}
      </div>

      {/* ═══════════════════ SECTION 0: INTRO ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Boxes size={28} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">The Four Pillars</h2>
                <p className="text-quest-muted text-sm">OOP Fundamentals</p>
              </div>
            </div>

            <p className="text-quest-muted leading-relaxed mb-4">
              Before you design systems, you must design classes. Object-Oriented Programming (OOP) is the
              foundation upon which most large-scale software systems are built. Let us master the fundamentals
              that will make every subsequent architectural decision clearer.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Boxes size={18} className="text-purple-400" />
                The Four Pillars of OOP
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Lock, name: 'Encapsulation', desc: 'Bundle data and methods together, hide internal state', color: 'emerald' },
                  { icon: GitBranch, name: 'Inheritance', desc: 'Create new classes by extending existing ones', color: 'amber' },
                  { icon: Shuffle, name: 'Polymorphism', desc: 'Same interface, different behaviors', color: 'sky' },
                  { icon: Layers, name: 'Abstraction', desc: 'Hide complexity, expose only what matters', color: 'purple' }
                ].map(pillar => {
                  const PIcon = pillar.icon
                  const bgClass = `bg-${pillar.color}-500/10`
                  const borderClass = `border-${pillar.color}-500/20`
                  const textClass = `text-${pillar.color}-400`
                  return (
                    <div key={pillar.name} className={`rounded-lg p-4 border ${borderClass} ${bgClass}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <PIcon size={18} className={textClass} />
                        <span className={`font-semibold text-sm ${textClass}`}>{pillar.name}</span>
                      </div>
                      <p className="text-xs text-quest-muted">{pillar.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-quest-muted text-sm leading-relaxed mb-4">
              Every{' '}
              <Term word="Class" definition="A blueprint for creating objects. Defines the properties (data) and methods (behavior) that objects of this type will have." onLearn={learnTerm} />
              {' '}you write and every{' '}
              <Term word="Object" definition="An instance of a class. Created from the class blueprint, each object has its own copy of the data but shares the method definitions." onLearn={learnTerm} />
              {' '}you instantiate is governed by these four principles. They determine how your code is organized,
              how components communicate, and how easy your system is to maintain and extend.
            </p>

            <DeepDive id="oop-history" title="A Brief History of OOP" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Simula (1967):</strong> Created by Ole-Johan Dahl and Kristen Nygaard
                  in Norway, Simula introduced objects, classes, inheritance, and virtual methods. It was designed for
                  simulation but gave birth to OOP.
                </p>
                <p>
                  <strong className="text-quest-text">Smalltalk (1972):</strong> Alan Kay coined the term "object-oriented" and
                  created Smalltalk at Xerox PARC. Everything in Smalltalk is an object, including numbers and booleans.
                  It popularized message-passing between objects.
                </p>
                <p>
                  <strong className="text-quest-text">C++ (1985):</strong> Bjarne Stroustrup added OOP features to C, creating
                  "C with Classes." It brought OOP into systems programming and introduced multiple inheritance.
                </p>
                <p>
                  <strong className="text-quest-text">Java (1995):</strong> James Gosling designed Java with OOP as a first-class
                  citizen. Single inheritance with interfaces became the dominant model, influencing C#, Kotlin, and more.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore Encapsulation
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: ENCAPSULATION ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Lock className="text-emerald-400" />
              <Term word="Encapsulation" definition="The bundling of data (properties) and methods that operate on that data into a single unit (class), while restricting direct access to some components." onLearn={learnTerm} />
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              Encapsulation is about controlling access. You decide what the outside world can see and touch.
              Private members are your class's internal organs -- vital, but not for external hands.
            </p>

            {/* Interactive Class Builder */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Code size={18} className="text-emerald-400" />
                Class Builder: BankAccount
              </h3>

              <div className="font-mono text-sm bg-quest-surface rounded-lg p-4 mb-4 border border-white/5">
                <span className="text-purple-400">class</span>{' '}
                <span className="text-yellow-300">BankAccount</span>{' '}
                <span className="text-quest-muted">{'{'}</span>
                <div className="ml-4 mt-2 space-y-1">
                  <span className="text-quest-muted text-xs">// Properties</span>
                  {classProperties.map((prop, i) => (
                    <motion.div key={`${prop.name}-${i}`} layout className="flex items-center gap-2">
                      <span className={prop.access === 'private' ? 'text-red-400' : 'text-green-400'}>
                        {prop.access}
                      </span>
                      <span className="text-quest-text">{prop.name}</span>
                      <span className="text-quest-muted">:</span>
                      <span className="text-sky-400">{prop.type}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          onClick={() => toggleAccess('prop', i)}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                          title={`Toggle to ${prop.access === 'public' ? 'private' : 'public'}`}
                        >
                          {prop.access === 'private'
                            ? <Lock size={12} className="text-red-400" />
                            : <Unlock size={12} className="text-green-400" />}
                        </button>
                        <button onClick={() => removeProp(i)} className="p-1 rounded hover:bg-white/10 transition-colors">
                          <Trash2 size={12} className="text-quest-muted" />
                        </button>
                      </div>
                    </motion.div>
                  ))}

                  <div className="mt-3 mb-2">
                    <span className="text-quest-muted text-xs">// Methods</span>
                  </div>
                  {classMethods.map((method, i) => (
                    <motion.div key={`${method.name}-${i}`} layout className="flex items-center gap-2">
                      <span className={method.access === 'private' ? 'text-red-400' : 'text-green-400'}>
                        {method.access}
                      </span>
                      <span className="text-quest-text">{method.name}</span>
                      <span className="text-quest-muted">()</span>
                      <span className="text-quest-muted text-xs ml-2">// {method.description}</span>
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          onClick={() => toggleAccess('method', i)}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          {method.access === 'private'
                            ? <Lock size={12} className="text-red-400" />
                            : <Unlock size={12} className="text-green-400" />}
                        </button>
                        <button onClick={() => removeMethod(i)} className="p-1 rounded hover:bg-white/10 transition-colors">
                          <Trash2 size={12} className="text-quest-muted" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <span className="text-quest-muted">{'}'}</span>
              </div>

              {/* Add Property / Method */}
              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newPropName}
                    onChange={e => setNewPropName(e.target.value)}
                    placeholder="Property name"
                    className="flex-1 px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm text-quest-text placeholder:text-quest-muted/50 focus:outline-none focus:border-quest-primary/50"
                    onKeyDown={e => e.key === 'Enter' && addProperty()}
                  />
                  <select
                    value={newPropType}
                    onChange={e => setNewPropType(e.target.value)}
                    className="px-2 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm text-quest-text focus:outline-none"
                  >
                    <option value="string">string</option>
                    <option value="number">number</option>
                    <option value="boolean">boolean</option>
                  </select>
                  <button onClick={addProperty} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMethodName}
                    onChange={e => setNewMethodName(e.target.value)}
                    placeholder="Method name"
                    className="flex-1 px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm text-quest-text placeholder:text-quest-muted/50 focus:outline-none focus:border-quest-primary/50"
                    onKeyDown={e => e.key === 'Enter' && addMethod()}
                  />
                  <button onClick={addMethod} className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Access Attempt Demo */}
              <div className="mt-4 border-t border-white/5 pt-4">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Eye size={16} className="text-yellow-400" />
                  External Access Simulation
                </h4>
                <p className="text-xs text-quest-muted mb-3">
                  Click a property to see what happens when external code tries to access it:
                </p>
                <div className="flex flex-wrap gap-2">
                  {classProperties.map((prop, i) => (
                    <button
                      key={i}
                      onClick={() => attemptExternalAccess(prop)}
                      className="px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 text-xs font-mono hover:border-white/20 transition-all"
                    >
                      account.{prop.name}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {externalAccessAttempt && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-3 p-3 rounded-lg border text-sm font-mono
                        ${externalAccessAttempt.access === 'private'
                          ? 'bg-red-500/10 border-red-500/30 text-red-400'
                          : 'bg-green-500/10 border-green-500/30 text-green-400'}`}
                    >
                      {externalAccessAttempt.access === 'private' ? (
                        <div className="flex items-center gap-2">
                          <Shield size={16} />
                          <span>Error: Property '{externalAccessAttempt.name}' is private and only accessible within class 'BankAccount'</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle size={16} />
                          <span>Access granted: account.{externalAccessAttempt.name} = ...</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <DeepDive id="getters-setters" title="Getters and Setters: Controlled Access" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Pattern:</strong> Instead of making properties public, create
                  getter and setter methods. This lets you add validation, logging, and transformation logic without
                  changing the external API.
                </p>
                <div className="bg-quest-bg rounded-lg p-3 font-mono text-xs">
                  <div><span className="text-purple-400">class</span> <span className="text-yellow-300">BankAccount</span> {'{'}</div>
                  <div className="ml-4"><span className="text-red-400">private</span> _balance = 0</div>
                  <div className="ml-4 mt-2"><span className="text-purple-400">get</span> <span className="text-green-400">balance</span>() {'{'} <span className="text-purple-400">return</span> this._balance {'}'}</div>
                  <div className="ml-4"><span className="text-purple-400">set</span> <span className="text-green-400">balance</span>(value) {'{'}</div>
                  <div className="ml-8"><span className="text-purple-400">if</span> (value {'<'} 0) <span className="text-purple-400">throw</span> <span className="text-purple-400">new</span> <span className="text-yellow-300">Error</span>(<span className="text-green-300">'Cannot set negative balance'</span>)</div>
                  <div className="ml-8">this._balance = value</div>
                  <div className="ml-4">{'}'}</div>
                  <div>{'}'}</div>
                </div>
                <p>
                  <strong className="text-quest-text">Why it matters:</strong> If balance were public, any code could set
                  <code className="text-xs bg-quest-bg px-1 rounded"> account.balance = -1000 </code>
                  and corrupt your data. With a setter, you enforce invariants at the boundary.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Explore Inheritance
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: INHERITANCE ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <GitBranch className="text-amber-400" />
              <Term word="Inheritance" definition="A mechanism where a new class (child/subclass) derives properties and methods from an existing class (parent/superclass). Enables code reuse and establishes an 'is-a' relationship." onLearn={learnTerm} />
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              Inheritance creates a family tree of classes. A Dog <em>is an</em> Animal. A GoldenRetriever <em>is a</em> Dog.
              Each child inherits everything from its parent and can add or override behavior.
            </p>

            {/* Interactive Inheritance Tree */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <GitBranch size={18} className="text-amber-400" />
                Class Hierarchy Explorer
              </h3>
              <p className="text-xs text-quest-muted mb-4">
                Click nodes to expand/collapse and inspect properties, methods, and overrides.
              </p>

              {renderTreeNode(inheritanceTree)}

              {/* Inheritance chain info */}
              <div className="mt-4 p-3 bg-quest-surface rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400">Inheritance Chain</span>
                </div>
                <p className="text-xs text-quest-muted">
                  When you call <code className="bg-quest-bg px-1 rounded">goldenRetriever.speak()</code>, the runtime
                  looks up the chain: GoldenRetriever → Dog → Animal. It uses the first matching method it finds.
                  Dog overrides <code className="bg-quest-bg px-1 rounded">speak()</code> to return "Woof!", so that is what you get.
                </p>
              </div>
            </div>

            <DeepDive id="composition-vs-inheritance" title="Composition vs Inheritance" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">"Favor composition over inheritance"</strong> is one of the most
                  important design principles. Here is why:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-quest-bg rounded-lg p-3 border border-amber-500/20">
                    <h4 className="text-xs font-semibold text-amber-400 mb-2">Inheritance (is-a)</h4>
                    <ul className="text-xs space-y-1">
                      <li>+ Natural for true hierarchies</li>
                      <li>+ Automatic code reuse</li>
                      <li>- Tight coupling to parent</li>
                      <li>- Fragile base class problem</li>
                      <li>- Diamond problem (multiple inheritance)</li>
                    </ul>
                  </div>
                  <div className="bg-quest-bg rounded-lg p-3 border border-green-500/20">
                    <h4 className="text-xs font-semibold text-green-400 mb-2">Composition (has-a)</h4>
                    <ul className="text-xs space-y-1">
                      <li>+ Loose coupling</li>
                      <li>+ Easy to change at runtime</li>
                      <li>+ No diamond problem</li>
                      <li>+ More flexible</li>
                      <li>- Slightly more boilerplate</li>
                    </ul>
                  </div>
                </div>
                <p>
                  <strong className="text-quest-text">Rule of thumb:</strong> Use inheritance when there is a genuine
                  "is-a" relationship (Dog is an Animal). Use composition when one object "has" or "uses" another
                  (Car has an Engine, not Car is an Engine).
                </p>
              </div>
            </DeepDive>

            <DeepDive id="diamond-problem" title="The Diamond Problem" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Problem:</strong> If class D inherits from both B and C,
                  and both B and C inherit from A, which version of A's methods does D get?
                </p>
                <div className="text-center py-3 font-mono text-xs">
                  <div className="inline-block text-left">
                    <div className="text-center text-purple-400 mb-1">{'     '}A</div>
                    <div className="text-center text-quest-muted mb-1">{'    '}/ \</div>
                    <div className="text-center text-sky-400 mb-1">{'   '}B{'   '}C</div>
                    <div className="text-center text-quest-muted mb-1">{'    '}\ /</div>
                    <div className="text-center text-amber-400">{'     '}D</div>
                  </div>
                </div>
                <p>
                  Languages handle this differently: Java avoids it by forbidding multiple inheritance of classes
                  (but allows multiple interfaces). Python uses Method Resolution Order (MRO). C++ allows it but
                  requires explicit disambiguation. This problem is a key reason interfaces exist.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Explore Polymorphism
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: POLYMORPHISM ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Shuffle className="text-sky-400" />
              <Term word="Polymorphism" definition="The ability of different classes to respond to the same method call in their own way. From Greek: 'many forms.' Enables writing code that works with objects of different types through a common interface." onLearn={learnTerm} />
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              Poly (many) + morph (form). One method name, many different behaviors.
              Call <code className="bg-quest-bg px-1 rounded text-xs">animal.speak()</code> on any animal and
              each responds differently. The caller does not need to know the specific type.
            </p>

            {/* Polymorphism Demo */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shuffle size={18} className="text-sky-400" />
                Polymorphism in Action
              </h3>

              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => callMethodOnAll('speak')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeMethod === 'speak'
                      ? 'bg-sky-500 text-white'
                      : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-quest-text hover:border-white/20'}`}
                >
                  Call speak() on all
                </button>
                <button
                  onClick={() => callMethodOnAll('move')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${activeMethod === 'move'
                      ? 'bg-sky-500 text-white'
                      : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-quest-text hover:border-white/20'}`}
                >
                  Call move() on all
                </button>
              </div>

              <div className="space-y-3">
                {polyAnimals.map((animal, i) => {
                  const isCalled = calledAnimals.has(i)
                  const result = activeMethod === 'speak' ? animal.speakResult : animal.moveResult
                  const colorMap = {
                    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
                    sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/30', text: 'text-sky-400' },
                    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
                    red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
                    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' }
                  }
                  const colors = colorMap[animal.color] || colorMap.sky

                  return (
                    <motion.div
                      key={animal.name}
                      layout
                      className={`rounded-lg border p-4 transition-all ${isCalled ? `${colors.bg} ${colors.border}` : 'bg-quest-surface border-white/5'}`}
                    >
                      <div className="flex items-center gap-3">
                        <motion.span
                          className="text-2xl"
                          animate={isCalled ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {animal.icon}
                        </motion.span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold text-sm ${isCalled ? colors.text : 'text-quest-text'}`}>
                              {animal.name}
                            </span>
                            {activeMethod && (
                              <span className="text-xs font-mono text-quest-muted">
                                .{activeMethod}()
                              </span>
                            )}
                          </div>
                          <AnimatePresence>
                            {isCalled && activeMethod && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className={`text-sm mt-1 ${colors.text}`}
                              >
                                → {result}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {isCalled && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"
                          >
                            <CheckCircle size={14} className="text-green-400" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {activeMethod && calledAnimals.size === polyAnimals.length && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-sky-500/10 border border-sky-500/30 rounded-lg"
                >
                  <p className="text-sm text-sky-400">
                    Same method call — <code className="font-mono">{activeMethod}()</code> — five completely
                    different behaviors. The calling code does not need to know the type. That is polymorphism.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Types of Polymorphism */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4">Types of Polymorphism</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-surface rounded-lg p-4 border border-purple-500/20">
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Subtype (Runtime)</h4>
                  <p className="text-xs text-quest-muted mb-2">
                    Method overriding. A subclass provides its own implementation of a parent method.
                    Resolved at runtime based on the actual object type.
                  </p>
                  <div className="font-mono text-[11px] bg-quest-bg rounded p-2">
                    <div><span className="text-quest-muted">// Animal[] animals = [dog, cat]</span></div>
                    <div><span className="text-purple-400">for</span> (animal <span className="text-purple-400">of</span> animals)</div>
                    <div className="ml-2">animal.<span className="text-green-400">speak</span>() <span className="text-quest-muted">// different each time</span></div>
                  </div>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-sky-500/20">
                  <h4 className="text-sm font-semibold text-sky-400 mb-2">Ad-hoc (Compile-time)</h4>
                  <p className="text-xs text-quest-muted mb-2">
                    Method overloading. Same method name, different parameter types or counts.
                    Resolved at compile time.
                  </p>
                  <div className="font-mono text-[11px] bg-quest-bg rounded p-2">
                    <div><span className="text-green-400">add</span>(<span className="text-sky-400">int</span> a, <span className="text-sky-400">int</span> b) → int</div>
                    <div><span className="text-green-400">add</span>(<span className="text-sky-400">string</span> a, <span className="text-sky-400">string</span> b) → string</div>
                    <div><span className="text-green-400">add</span>(<span className="text-sky-400">float</span> a, <span className="text-sky-400">float</span> b) → float</div>
                  </div>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-green-500/20">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Parametric (Generics)</h4>
                  <p className="text-xs text-quest-muted mb-2">
                    Code written to work with any type. The type is a parameter itself.
                  </p>
                  <div className="font-mono text-[11px] bg-quest-bg rounded p-2">
                    <div><span className="text-purple-400">function</span> <span className="text-green-400">first</span>&lt;<span className="text-yellow-300">T</span>&gt;(arr: <span className="text-yellow-300">T</span>[]) : <span className="text-yellow-300">T</span></div>
                    <div className="ml-2"><span className="text-purple-400">return</span> arr[0]</div>
                    <div className="text-quest-muted">// Works for number[], string[], Animal[]</div>
                  </div>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-amber-500/20">
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">Coercion</h4>
                  <p className="text-xs text-quest-muted mb-2">
                    Implicit type conversion allows one type to be used where another is expected.
                  </p>
                  <div className="font-mono text-[11px] bg-quest-bg rounded p-2">
                    <div><span className="text-sky-400">int</span> x = 5</div>
                    <div><span className="text-sky-400">double</span> y = x <span className="text-quest-muted">// int → double</span></div>
                    <div><span className="text-green-400">print</span>(<span className="text-orange-300">"val: "</span> + x) <span className="text-quest-muted">// int → string</span></div>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="liskov-substitution" title="Liskov Substitution Principle (LSP)" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Principle:</strong> Objects of a superclass should be replaceable
                  with objects of its subclasses without breaking the program. If <code className="bg-quest-bg px-1 rounded">S</code> is
                  a subtype of <code className="bg-quest-bg px-1 rounded">T</code>, then objects of type T may be replaced
                  with objects of type S without altering correctness.
                </p>
                <p>
                  <strong className="text-quest-text">Classic Violation:</strong> Square extends Rectangle. Rectangle has
                  setWidth() and setHeight() independently. But in a Square, setting width must also set height.
                  Code expecting a Rectangle (where width and height are independent) breaks with a Square.
                </p>
                <p>
                  <strong className="text-quest-text">Why it matters:</strong> LSP is the "L" in SOLID. Violating it means
                  your polymorphism is broken — you cannot safely substitute subclasses, defeating the purpose of inheritance.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Explore Abstraction
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: ABSTRACTION ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Layers className="text-purple-400" />
              <Term word="Abstraction" definition="The process of hiding complex implementation details and showing only the necessary features of an object. Think of it as defining 'what' something does without specifying 'how' it does it." onLearn={learnTerm} />
            </h2>
            <p className="text-quest-muted mb-6 text-sm">
              You do not need to know how a car engine works to drive. Abstraction hides the "how" and
              exposes only the "what." An{' '}
              <Term word="Interface" definition="A contract that defines what methods a class must implement, without providing the implementation. It specifies the 'what' but not the 'how.' A class can implement multiple interfaces." onLearn={learnTerm} />
              {' '}is the purest form of abstraction.
            </p>

            {/* Abstraction Layer Visualization */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers size={18} className="text-purple-400" />
                Abstraction Layers: Payment Processing
              </h3>
              <p className="text-xs text-quest-muted mb-4">
                Click each layer to see how abstraction separates interface from implementation.
              </p>

              <div className="space-y-3">
                {abstractionLayers.map((layer, i) => {
                  const isActive = activeLayer === i
                  const colorMap = {
                    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', ring: 'ring-purple-500/20' },
                    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400', ring: 'ring-violet-500/20' },
                    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', ring: 'ring-blue-500/20' }
                  }
                  const colors = colorMap[layer.color] || colorMap.purple

                  return (
                    <motion.div
                      key={layer.name}
                      layout
                      onClick={() => setActiveLayer(i)}
                      className={`rounded-lg border p-4 cursor-pointer transition-all
                        ${isActive ? `${colors.bg} ${colors.border} ring-1 ${colors.ring}` : 'bg-quest-surface border-white/5 hover:border-white/15'}`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {layer.level === 'abstract' ? (
                            <Eye size={16} className={isActive ? colors.text : 'text-quest-muted'} />
                          ) : (
                            <Settings size={16} className={isActive ? colors.text : 'text-quest-muted'} />
                          )}
                          <span className={`font-semibold text-sm ${isActive ? colors.text : ''}`}>{layer.name}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full
                            ${layer.level === 'abstract'
                              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                            {layer.level}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-quest-muted mb-3">{layer.description}</p>
                            <div className="font-mono text-[11px] bg-quest-bg rounded-lg p-3 border border-white/5 whitespace-pre text-quest-text overflow-x-auto">
                              {layer.code}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>

              {/* Swap implementation demo */}
              <div className="mt-5 p-4 bg-quest-surface rounded-lg border border-white/5">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Shuffle size={16} className="text-purple-400" />
                  The Power of Abstraction: Swap Implementations
                </h4>
                <p className="text-xs text-quest-muted mb-3">
                  Because both Stripe and PayPal implement the same interface, your application code
                  never changes when you switch providers:
                </p>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setSelectedProcessor('stripe')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all
                      ${selectedProcessor === 'stripe'
                        ? 'bg-violet-500 text-white'
                        : 'bg-quest-bg border border-white/10 text-quest-muted hover:border-white/20'}`}
                  >
                    Use Stripe
                  </button>
                  <button
                    onClick={() => setSelectedProcessor('paypal')}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all
                      ${selectedProcessor === 'paypal'
                        ? 'bg-blue-500 text-white'
                        : 'bg-quest-bg border border-white/10 text-quest-muted hover:border-white/20'}`}
                  >
                    Use PayPal
                  </button>
                </div>
                <AnimatePresence mode="wait">
                  {selectedProcessor && (
                    <motion.div
                      key={selectedProcessor}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="font-mono text-[11px] bg-quest-bg rounded-lg p-3 border border-white/5"
                    >
                      <div className="text-quest-muted">// Application code — UNCHANGED</div>
                      <div>
                        <span className="text-purple-400">const</span> processor: <span className="text-yellow-300">PaymentProcessor</span> ={' '}
                        <span className="text-purple-400">new</span>{' '}
                        <span className={selectedProcessor === 'stripe' ? 'text-violet-400' : 'text-blue-400'}>
                          {selectedProcessor === 'stripe' ? 'StripeProcessor' : 'PayPalProcessor'}
                        </span>()
                      </div>
                      <div className="mt-1">
                        <span className="text-purple-400">const</span> receipt = <span className="text-purple-400">await</span> processor.<span className="text-green-400">charge</span>(99.99)
                      </div>
                      <div className="text-quest-muted mt-1">
                        // Caller does not know or care if it is Stripe or PayPal
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/5">
                        <span className={selectedProcessor === 'stripe' ? 'text-violet-400' : 'text-blue-400'}>
                          {selectedProcessor === 'stripe'
                            ? '→ Stripe API call to /v1/charges with Bearer token...'
                            : '→ PayPal REST API call to /v2/checkout/orders with OAuth...'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Interface vs Abstract Class */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h3 className="font-semibold mb-4">
                <Term word="Interfaces" definition="A pure contract defining method signatures without implementations. A class can implement multiple interfaces. Think of it as a checklist of capabilities a class must support." onLearn={learnTerm} />
                {' '}vs Abstract Classes
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-surface rounded-lg p-4 border border-purple-500/20">
                  <h4 className="text-sm font-semibold text-purple-400 mb-3">Interface</h4>
                  <ul className="text-xs text-quest-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">-</span>
                      <span>No implementation (pure contract)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">-</span>
                      <span>No state (no instance variables)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>A class can implement many interfaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>Defines capabilities: "can do"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>Loose coupling, easy to mock/test</span>
                    </li>
                  </ul>
                  <div className="font-mono text-[10px] bg-quest-bg rounded p-2 mt-3 text-quest-muted">
                    interface Flyable {'{ fly(): void }'}
                    <br />interface Swimmable {'{ swim(): void }'}
                    <br />class Duck implements Flyable, Swimmable
                  </div>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-amber-500/20">
                  <h4 className="text-sm font-semibold text-amber-400 mb-3">Abstract Class</h4>
                  <ul className="text-xs text-quest-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>Can have default implementations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>Can hold state (instance variables)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">-</span>
                      <span>Single inheritance only (most languages)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>Defines identity: "is a"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-0.5">+</span>
                      <span>Share code between related classes</span>
                    </li>
                  </ul>
                  <div className="font-mono text-[10px] bg-quest-bg rounded p-2 mt-3 text-quest-muted">
                    abstract class Vehicle {'{'}<br />
                    {'  '}speed = 0<br />
                    {'  '}accelerate() {'{ this.speed += 10 }'}<br />
                    {'  '}abstract steer(): void<br />
                    {'}'}
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="real-world-abstraction" title="Abstraction in Real Systems" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Database abstraction (ORM):</strong> Sequelize, Prisma, and
                  Hibernate abstract away SQL. You call <code className="bg-quest-bg px-1 rounded">user.save()</code> without
                  knowing if it generates PostgreSQL, MySQL, or SQLite queries underneath.
                </p>
                <p>
                  <strong className="text-quest-text">File system abstraction:</strong> Cloud storage services
                  implement a common interface. Your app calls <code className="bg-quest-bg px-1 rounded">storage.upload(file)</code> and
                  the implementation handles S3, GCS, or Azure Blob Storage.
                </p>
                <p>
                  <strong className="text-quest-text">HTTP clients:</strong> Axios, fetch, and got all provide different
                  implementations of "make an HTTP request." Your service layer should depend on an abstraction,
                  not a specific library. This makes testing trivial (swap in a mock client).
                </p>
                <p>
                  <strong className="text-quest-text">Key insight:</strong> Every well-designed system is a stack of
                  abstractions. The higher layers do not know (or care) about the lower layers. This separation
                  is what makes software maintainable at scale.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 5: QUIZ ═══════════════════ */}
      {currentSection === 5 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-purple-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              The four pillars of OOP are the foundation of every well-designed system. Let us verify your understanding.
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
                <h3 className="text-xl font-bold mb-2">Level 26 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You have mastered the four pillars of Object-Oriented Programming: Encapsulation, Inheritance,
                  Polymorphism, and Abstraction. These fundamentals will inform every class you design and every
                  system you architect.
                </p>
                <p className="text-sm text-purple-400">
                  The pillars stand strong. Now build upon them.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default Level26

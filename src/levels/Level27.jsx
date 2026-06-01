import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle, Target,
  Shield, ArrowUpDown, Scissors, ArrowDownUp, AlertTriangle,
  XCircle, Box, Layers, Code, Zap, ArrowRight, RefreshCw
} from 'lucide-react'

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

/* ── Principle icons mapping ── */
const principleIcons = {
  srp: Target,
  ocp: Shield,
  lsp: ArrowUpDown,
  isp: Scissors,
  dip: ArrowDownUp,
}

/* ── SRP: God class methods to sort ── */
const srpMethods = [
  { id: 'validate', label: 'validateEmail()', target: 'validator', color: 'text-sky-400' },
  { id: 'save', label: 'saveToDatabase()', target: 'repository', color: 'text-emerald-400' },
  { id: 'sendEmail', label: 'sendWelcomeEmail()', target: 'mailer', color: 'text-amber-400' },
  { id: 'log', label: 'logActivity()', target: 'logger', color: 'text-purple-400' },
  { id: 'hash', label: 'hashPassword()', target: 'security', color: 'text-rose-400' },
  { id: 'format', label: 'formatResponse()', target: 'formatter', color: 'text-teal-400' },
]

const srpTargetClasses = [
  { id: 'validator', label: 'UserValidator', color: 'border-sky-400/50 bg-sky-400/10' },
  { id: 'repository', label: 'UserRepository', color: 'border-emerald-400/50 bg-emerald-400/10' },
  { id: 'mailer', label: 'EmailService', color: 'border-amber-400/50 bg-amber-400/10' },
  { id: 'logger', label: 'ActivityLogger', color: 'border-purple-400/50 bg-purple-400/10' },
  { id: 'security', label: 'PasswordService', color: 'border-rose-400/50 bg-rose-400/10' },
  { id: 'formatter', label: 'ResponseFormatter', color: 'border-teal-400/50 bg-teal-400/10' },
]

/* ── OCP: Shape system ── */
const ocpShapes = [
  { id: 'circle', label: 'Circle', formula: 'pi * r^2', added: false },
  { id: 'rectangle', label: 'Rectangle', formula: 'w * h', added: false },
  { id: 'triangle', label: 'Triangle', formula: '0.5 * b * h', added: true },
  { id: 'hexagon', label: 'Hexagon', formula: '(3*sqrt(3)/2) * s^2', added: true },
]

/* ── LSP: Rectangle/Square demo ── */
const lspScenarios = [
  {
    id: 'valid',
    title: 'Valid Substitution',
    parent: 'Bird',
    child: 'Sparrow',
    method: 'fly()',
    works: true,
    explanation: 'Sparrow can fly just like any Bird. The contract is preserved.',
  },
  {
    id: 'invalid',
    title: 'LSP Violation',
    parent: 'Rectangle',
    child: 'Square',
    method: 'setWidth(5); setHeight(10)',
    works: false,
    explanation: 'Square overrides setWidth to also set height. Code expecting a Rectangle with independent width/height breaks.',
  },
  {
    id: 'invalid2',
    title: 'Another Violation',
    parent: 'List',
    child: 'ReadOnlyList',
    method: 'add(item)',
    works: false,
    explanation: 'ReadOnlyList throws an exception on add(). Code that depends on being able to add items to a List breaks.',
  },
  {
    id: 'valid2',
    title: 'Valid Substitution',
    parent: 'Shape',
    child: 'Circle',
    method: 'area()',
    works: true,
    explanation: 'Circle correctly implements area() as Shape promises. No surprises.',
  },
]

/* ── ISP: Fat interface ── */
const fatInterfaceMethods = [
  { id: 'print', label: 'print()', group: 'printer' },
  { id: 'scan', label: 'scan()', group: 'scanner' },
  { id: 'fax', label: 'fax()', group: 'fax' },
  { id: 'copy', label: 'copy()', group: 'printer' },
  { id: 'staple', label: 'staple()', group: 'finisher' },
  { id: 'email', label: 'emailScan()', group: 'scanner' },
]

const ispInterfaces = [
  { id: 'printer', label: 'Printable', color: 'border-sky-400/50 bg-sky-400/10', icon: '🖨' },
  { id: 'scanner', label: 'Scannable', color: 'border-emerald-400/50 bg-emerald-400/10', icon: '📄' },
  { id: 'fax', label: 'Faxable', color: 'border-amber-400/50 bg-amber-400/10', icon: '📠' },
  { id: 'finisher', label: 'Finishable', color: 'border-purple-400/50 bg-purple-400/10', icon: '📎' },
]

/* ── DIP: Layers ── */
const dipLayers = {
  bad: {
    high: { label: 'OrderService', detail: 'Directly creates new MySQLDatabase()' },
    low: { label: 'MySQLDatabase', detail: 'Concrete class, tightly coupled' },
    arrow: 'down',
    problem: 'Cannot swap to PostgreSQL without rewriting OrderService',
  },
  good: {
    high: { label: 'OrderService', detail: 'Depends on DatabaseInterface' },
    abstraction: { label: 'DatabaseInterface', detail: 'Abstract contract' },
    low: { label: 'MySQLDatabase', detail: 'Implements DatabaseInterface' },
    arrow: 'toAbstraction',
    benefit: 'Swap to PostgreSQL by creating a new implementation. OrderService unchanged.',
  },
}

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'A class handles user authentication, sends emails, AND writes logs. Which SOLID principle is violated?',
    options: [
      { id: 'a', text: 'Open/Closed Principle', correct: false },
      { id: 'b', text: 'Single Responsibility Principle', correct: true },
      { id: 'c', text: 'Dependency Inversion Principle', correct: false },
      { id: 'd', text: 'Liskov Substitution Principle', correct: false },
    ],
    explanation: 'This class has multiple reasons to change: auth logic, email format, or logging mechanism. SRP says a class should have only one reason to change.',
  },
  {
    id: 'q2',
    question: 'You need to add a new payment method. The current approach requires editing the PaymentProcessor class. Which principle guides you to a better design?',
    options: [
      { id: 'a', text: 'Interface Segregation Principle', correct: false },
      { id: 'b', text: 'Liskov Substitution Principle', correct: false },
      { id: 'c', text: 'Open/Closed Principle', correct: true },
      { id: 'd', text: 'Single Responsibility Principle', correct: false },
    ],
    explanation: 'OCP says software entities should be open for extension but closed for modification. Add new payment types by extending, not by editing existing code.',
  },
  {
    id: 'q3',
    question: 'A Penguin class extends Bird, but throws an error when fly() is called. Which principle is violated?',
    options: [
      { id: 'a', text: 'Single Responsibility Principle', correct: false },
      { id: 'b', text: 'Dependency Inversion Principle', correct: false },
      { id: 'c', text: 'Interface Segregation Principle', correct: false },
      { id: 'd', text: 'Liskov Substitution Principle', correct: true },
    ],
    explanation: 'LSP says subtypes must be substitutable for their base types. If code expects a Bird that can fly(), a Penguin breaks that contract.',
  },
  {
    id: 'q4',
    question: 'A simple printer is forced to implement fax() and scan() methods that it does not support. Which principle is violated?',
    options: [
      { id: 'a', text: 'Interface Segregation Principle', correct: true },
      { id: 'b', text: 'Open/Closed Principle', correct: false },
      { id: 'c', text: 'Single Responsibility Principle', correct: false },
      { id: 'd', text: 'Dependency Inversion Principle', correct: false },
    ],
    explanation: 'ISP says clients should not be forced to depend on interfaces they do not use. Split the fat interface into smaller ones.',
  },
  {
    id: 'q5',
    question: 'A NotificationService directly instantiates SMTPClient inside its constructor. What should you change according to DIP?',
    options: [
      { id: 'a', text: 'Make SMTPClient a singleton', correct: false },
      { id: 'b', text: 'Depend on a MessageSender interface instead', correct: true },
      { id: 'c', text: 'Move email logic into NotificationService', correct: false },
      { id: 'd', text: 'Use inheritance instead of composition', correct: false },
    ],
    explanation: 'DIP says high-level modules should depend on abstractions, not concrete classes. Inject a MessageSender interface that SMTPClient implements.',
  },
  {
    id: 'q6',
    question: 'Which principle is most directly about managing change without breaking existing code?',
    options: [
      { id: 'a', text: 'Liskov Substitution Principle', correct: false },
      { id: 'b', text: 'Open/Closed Principle', correct: true },
      { id: 'c', text: 'Interface Segregation Principle', correct: false },
      { id: 'd', text: 'Single Responsibility Principle', correct: false },
    ],
    explanation: 'OCP is fundamentally about extending behavior without modifying existing, tested code. This directly manages change safely.',
  },
  {
    id: 'q7',
    question: 'In a microservice architecture, Service A imports the concrete database client of Service B. Which principle does this violate?',
    options: [
      { id: 'a', text: 'Single Responsibility Principle', correct: false },
      { id: 'b', text: 'Interface Segregation Principle', correct: false },
      { id: 'c', text: 'Dependency Inversion Principle', correct: true },
      { id: 'd', text: 'Liskov Substitution Principle', correct: false },
    ],
    explanation: 'DIP: Service A (high-level) should depend on an abstraction (API contract), not the concrete database client of Service B (low-level detail).',
  },
]

/* ── Principle code snippets ── */
const codeSnippets = {
  srp: {
    bad: `class UserService {
  validateEmail(email) { /* ... */ }
  hashPassword(pass) { /* ... */ }
  saveToDatabase(user) { /* ... */ }
  sendWelcomeEmail(user) { /* ... */ }
  logActivity(action) { /* ... */ }
  formatResponse(data) { /* ... */ }
}`,
    good: `class UserValidator { validate(user) { /* ... */ } }
class UserRepository { save(user) { /* ... */ } }
class EmailService  { sendWelcome(user) { /* ... */ } }
class ActivityLogger { log(action) { /* ... */ } }
class PasswordService { hash(pass) { /* ... */ } }
class ResponseFormatter { format(data) { /* ... */ } }`,
  },
  ocp: {
    bad: `class AreaCalculator {
  calculate(shape) {
    if (shape.type === 'circle')
      return Math.PI * shape.r ** 2
    if (shape.type === 'rectangle')
      return shape.w * shape.h
    // Adding triangle? Edit this method...
  }
}`,
    good: `class Shape { area() { throw 'implement me' } }
class Circle extends Shape {
  area() { return Math.PI * this.r ** 2 }
}
class Rectangle extends Shape {
  area() { return this.w * this.h }
}
// New shape? Just add a new class!
class Triangle extends Shape {
  area() { return 0.5 * this.b * this.h }
}`,
  },
  lsp: {
    bad: `class Rectangle {
  setWidth(w) { this.width = w }
  setHeight(h) { this.height = h }
}
class Square extends Rectangle {
  setWidth(w) {
    this.width = w
    this.height = w  // Surprise!
  }
  setHeight(h) {
    this.width = h   // Surprise!
    this.height = h
  }
}`,
    good: `class Shape { area() { /* abstract */ } }
class Rectangle extends Shape {
  constructor(w, h) { this.w = w; this.h = h }
  area() { return this.w * this.h }
}
class Square extends Shape {
  constructor(side) { this.side = side }
  area() { return this.side ** 2 }
}`,
  },
  isp: {
    bad: `interface Machine {
  print(doc)
  scan(doc)
  fax(doc)
  staple(doc)
}
// SimplePrinter must implement fax()?!
class SimplePrinter implements Machine {
  print(doc) { /* ok */ }
  scan(doc) { throw 'Not supported' }
  fax(doc) { throw 'Not supported' }
  staple(doc) { throw 'Not supported' }
}`,
    good: `interface Printable { print(doc) }
interface Scannable { scan(doc) }
interface Faxable  { fax(doc) }

class SimplePrinter implements Printable {
  print(doc) { /* just printing */ }
}
class AllInOne implements Printable,
    Scannable, Faxable {
  print(doc) { /* ... */ }
  scan(doc)  { /* ... */ }
  fax(doc)   { /* ... */ }
}`,
  },
  dip: {
    bad: `class OrderService {
  constructor() {
    this.db = new MySQLDatabase()
    // Tightly coupled to MySQL!
  }
  save(order) {
    this.db.insert('orders', order)
  }
}`,
    good: `interface Database {
  insert(table, data)
  find(table, query)
}
class OrderService {
  constructor(db: Database) {
    this.db = db  // Depends on abstraction
  }
  save(order) {
    this.db.insert('orders', order)
  }
}
// Inject any implementation
new OrderService(new MySQLDatabase())
new OrderService(new PostgresDatabase())`,
  },
}

/* ── Code block component ── */
function CodeBlock({ code, variant }) {
  const bgColor = variant === 'bad'
    ? 'bg-red-950/30 border-quest-danger/30'
    : 'bg-emerald-950/30 border-quest-success/30'
  const label = variant === 'bad' ? 'Before (Violation)' : 'After (SOLID)'
  const labelColor = variant === 'bad' ? 'text-quest-danger' : 'text-quest-success'
  const IconComp = variant === 'bad' ? XCircle : CheckCircle

  return (
    <div className={`rounded-lg border ${bgColor} overflow-hidden`}>
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${bgColor}`}>
        <IconComp size={14} className={labelColor} />
        <span className={`text-xs font-semibold ${labelColor}`}>{label}</span>
      </div>
      <pre className="p-3 text-xs leading-relaxed overflow-x-auto font-mono text-quest-text/90">
        {code}
      </pre>
    </div>
  )
}

/* ── Section nav pill ── */
function SectionNav({ sections, current, onNavigate, completedSections }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {sections.map((s, i) => {
        const isComplete = completedSections.has(s.id)
        const isCurrent = i === current
        return (
          <button
            key={s.id}
            onClick={() => onNavigate(i)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
              ${isCurrent
                ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/25'
                : isComplete
                  ? 'bg-quest-success/20 text-quest-success border border-quest-success/30'
                  : 'bg-white/5 text-quest-muted border border-white/10 hover:border-white/30'
              }`}
          >
            {isComplete && <CheckCircle size={14} />}
            {s.icon && <s.icon size={14} />}
            {s.label}
          </button>
        )
      })}
    </div>
  )
}

/* ══════════════════════════════════════════════════════ */
/*  LEVEL 27 — SOLID GROUND                             */
/* ══════════════════════════════════════════════════════ */

export default function Level27({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState(new Set())

  /* SRP state */
  const [srpAssignments, setSrpAssignments] = useState({})
  const [srpDragItem, setSrpDragItem] = useState(null)
  const [srpComplete, setSrpComplete] = useState(false)

  /* OCP state */
  const [ocpAddedShapes, setOcpAddedShapes] = useState(new Set(['circle', 'rectangle']))
  const [ocpShowExtension, setOcpShowExtension] = useState(false)

  /* LSP state */
  const [lspActiveScenario, setLspActiveScenario] = useState(0)
  const [lspAnimating, setLspAnimating] = useState(false)
  const [lspResult, setLspResult] = useState(null)

  /* ISP state */
  const [ispAssignments, setIspAssignments] = useState({})
  const [ispDragItem, setIspDragItem] = useState(null)
  const [ispComplete, setIspComplete] = useState(false)

  /* DIP state */
  const [dipMode, setDipMode] = useState('bad')
  const [dipSwapping, setDipSwapping] = useState(false)
  const [dipSwapTarget, setDipSwapTarget] = useState('mysql')

  /* Quiz state */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = [
    { id: 'srp', label: 'SRP', icon: Target },
    { id: 'ocp', label: 'OCP', icon: Shield },
    { id: 'lsp', label: 'LSP', icon: ArrowUpDown },
    { id: 'isp', label: 'ISP', icon: Scissors },
    { id: 'dip', label: 'DIP', icon: ArrowDownUp },
    { id: 'quiz', label: 'Quiz', icon: CheckCircle },
  ]

  /* ── SRP drag-and-drop helpers ── */
  const handleSrpDragStart = (methodId) => {
    setSrpDragItem(methodId)
  }

  const handleSrpDrop = (targetId) => {
    if (srpDragItem) {
      setSrpAssignments(prev => ({ ...prev, [srpDragItem]: targetId }))
      setSrpDragItem(null)
    }
  }

  const handleSrpCheck = useCallback(() => {
    const allCorrect = srpMethods.every(m => srpAssignments[m.id] === m.target)
    if (allCorrect) {
      setSrpComplete(true)
      setCompletedSections(prev => new Set([...prev, 'srp']))
    }
  }, [srpAssignments])

  useEffect(() => {
    if (Object.keys(srpAssignments).length === srpMethods.length) {
      handleSrpCheck()
    }
  }, [srpAssignments, handleSrpCheck])

  /* ── OCP add new shape ── */
  const handleOcpAddShape = (shapeId) => {
    setOcpShowExtension(true)
    setTimeout(() => {
      setOcpAddedShapes(prev => new Set([...prev, shapeId]))
      setOcpShowExtension(false)
      if (ocpAddedShapes.size + 1 >= ocpShapes.length) {
        setCompletedSections(prev => new Set([...prev, 'ocp']))
      }
    }, 1200)
  }

  /* ── LSP animate scenario ── */
  const handleLspTest = useCallback(() => {
    setLspAnimating(true)
    setLspResult(null)
    setTimeout(() => {
      setLspResult(lspScenarios[lspActiveScenario].works ? 'pass' : 'fail')
      setLspAnimating(false)
    }, 1500)
  }, [lspActiveScenario])

  useEffect(() => {
    const allTested = lspScenarios.every((_, i) => i <= lspActiveScenario)
    if (lspActiveScenario === lspScenarios.length - 1 && lspResult !== null) {
      setCompletedSections(prev => new Set([...prev, 'lsp']))
    }
  }, [lspActiveScenario, lspResult])

  /* ── ISP drag-and-drop helpers ── */
  const handleIspDragStart = (methodId) => {
    setIspDragItem(methodId)
  }

  const handleIspDrop = (targetId) => {
    if (ispDragItem) {
      setIspAssignments(prev => ({ ...prev, [ispDragItem]: targetId }))
      setIspDragItem(null)
    }
  }

  const handleIspCheck = useCallback(() => {
    const allCorrect = fatInterfaceMethods.every(m => ispAssignments[m.id] === m.group)
    if (allCorrect) {
      setIspComplete(true)
      setCompletedSections(prev => new Set([...prev, 'isp']))
    }
  }, [ispAssignments])

  useEffect(() => {
    if (Object.keys(ispAssignments).length === fatInterfaceMethods.length) {
      handleIspCheck()
    }
  }, [ispAssignments, handleIspCheck])

  /* ── DIP swap ── */
  const handleDipSwap = () => {
    if (dipMode === 'bad') return
    setDipSwapping(true)
    setDipSwapTarget(prev => prev === 'mysql' ? 'postgres' : 'mysql')
    setTimeout(() => setDipSwapping(false), 800)
    setCompletedSections(prev => new Set([...prev, 'dip']))
  }

  /* ── Quiz submit ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    setCompletedSections(prev => new Set([...prev, 'quiz']))
    if (onComplete) onComplete()
  }

  const quizScore = quizQuestions.filter(q => {
    const answer = quizAnswers[q.id]
    return q.options.find(o => o.id === answer)?.correct
  }).length

  /* ══════════════════════════════════ */
  /*              RENDER               */
  /* ══════════════════════════════════ */

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Layers size={36} className="text-quest-primary" />
          <h1 className="text-3xl font-bold">SOLID Ground</h1>
        </div>
        <p className="text-quest-muted max-w-2xl mx-auto">
          Your code works, but it's unmaintainable. Every change breaks something else.
          Time to learn the five principles that make object-oriented design resilient,
          flexible, and ready for change.
        </p>
      </motion.div>

      {/* Section navigation */}
      <SectionNav
        sections={sections}
        current={currentSection}
        onNavigate={setCurrentSection}
        completedSections={completedSections}
      />

      {/* ═══════════════ SRP SECTION ═══════════════ */}
      {currentSection === 0 && (
        <motion.div
          key="srp"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Target size={24} className="text-sky-400" />
            <h2 className="text-2xl font-bold">S — Single Responsibility Principle</h2>
          </div>

          <p className="text-quest-muted leading-relaxed">
            A class should have <Term word="one reason to change" definition="Each class encapsulates a single concern. If you need to change logging, only the Logger class changes — not your UserService." onLearn={learnTerm} />.
            This means every class focuses on a single job. When you find a class doing too many things,
            it is a <Term word="God class" definition="An anti-pattern where a single class accumulates too many responsibilities, becoming a tangled mess that is impossible to test or maintain." onLearn={learnTerm} /> and needs to be broken apart.
          </p>

          <DeepDive id="srp-why" title="Why does SRP matter at scale?" onRead={markDeepDiveRead}>
            <p className="mb-2">
              In a large codebase, a God class becomes a merge-conflict magnet. Every team touches it,
              every deploy risks breaking unrelated features. SRP ensures changes are isolated:
              modifying email templates does not risk breaking password hashing.
            </p>
            <p>
              In microservice architecture, SRP scales to the service level: each microservice owns one
              bounded context. This is SRP applied at the architectural level.
            </p>
          </DeepDive>

          {/* Code comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <CodeBlock code={codeSnippets.srp.bad} variant="bad" />
            <CodeBlock code={codeSnippets.srp.good} variant="good" />
          </div>

          {/* Interactive: Drag methods to classes */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-quest-warning" />
              Break the God Class: Drag each method to its correct class
            </h3>

            {/* Methods pool */}
            <div className="mb-6">
              <p className="text-sm text-quest-muted mb-3">Methods in the God class UserService:</p>
              <div className="flex flex-wrap gap-2">
                {srpMethods.map(method => {
                  const isAssigned = srpAssignments[method.id]
                  return (
                    <motion.button
                      key={method.id}
                      draggable={!srpComplete}
                      onDragStart={() => handleSrpDragStart(method.id)}
                      onClick={() => !srpComplete && setSrpDragItem(srpDragItem === method.id ? null : method.id)}
                      whileHover={!srpComplete ? { scale: 1.05 } : {}}
                      whileTap={!srpComplete ? { scale: 0.95 } : {}}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all cursor-grab active:cursor-grabbing
                        ${isAssigned
                          ? srpAssignments[method.id] === method.target
                            ? 'bg-quest-success/20 border border-quest-success/40 text-quest-success'
                            : 'bg-quest-danger/20 border border-quest-danger/40 text-quest-danger'
                          : srpDragItem === method.id
                            ? 'bg-quest-primary/30 border border-quest-primary shadow-lg shadow-quest-primary/20'
                            : 'bg-white/5 border border-white/20 hover:border-white/40'
                        }
                        ${method.color}`}
                    >
                      {method.label}
                      {isAssigned && srpAssignments[method.id] === method.target && <CheckCircle size={12} className="inline ml-1" />}
                      {isAssigned && srpAssignments[method.id] !== method.target && <XCircle size={12} className="inline ml-1" />}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Target classes */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {srpTargetClasses.map(cls => {
                const assignedMethods = Object.entries(srpAssignments)
                  .filter(([_, target]) => target === cls.id)
                  .map(([methodId]) => srpMethods.find(m => m.id === methodId))
                return (
                  <motion.div
                    key={cls.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleSrpDrop(cls.id)}
                    onClick={() => { if (srpDragItem) handleSrpDrop(cls.id) }}
                    className={`rounded-lg border-2 border-dashed p-3 min-h-[80px] transition-all
                      ${srpDragItem ? 'border-quest-primary/60 bg-quest-primary/5' : cls.color}`}
                  >
                    <p className="text-xs font-bold mb-2">{cls.label}</p>
                    <div className="space-y-1">
                      {assignedMethods.map(m => m && (
                        <span key={m.id} className={`block text-xs font-mono ${m.color}`}>{m.label}</span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {srpComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-quest-success/10 border border-quest-success/30 rounded-lg text-center"
              >
                <CheckCircle size={20} className="inline mr-2 text-quest-success" />
                <span className="text-quest-success font-semibold">
                  The God class is vanquished! Each class now has a single responsibility.
                </span>
              </motion.div>
            )}

            {!srpComplete && Object.keys(srpAssignments).length === srpMethods.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-quest-danger/10 border border-quest-danger/30 rounded-lg text-center"
              >
                <AlertTriangle size={16} className="inline mr-2 text-quest-danger" />
                <span className="text-quest-danger text-sm">
                  Some methods are in the wrong class. Try again!
                </span>
                <button
                  onClick={() => setSrpAssignments({})}
                  className="ml-3 text-xs underline text-quest-muted hover:text-white"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setCurrentSection(1)}
              className="btn-primary flex items-center gap-2"
            >
              Next: Open/Closed <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ OCP SECTION ═══════════════ */}
      {currentSection === 1 && (
        <motion.div
          key="ocp"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Shield size={24} className="text-emerald-400" />
            <h2 className="text-2xl font-bold">O — Open/Closed Principle</h2>
          </div>

          <p className="text-quest-muted leading-relaxed">
            Software entities should be <Term word="open for extension" definition="You can add new behavior by writing new code — new classes, new modules, new functions." onLearn={learnTerm} /> but{' '}
            <Term word="closed for modification" definition="Existing, tested, deployed code should not need to change when you add new features." onLearn={learnTerm} />.
            Instead of editing a giant if/else chain, use polymorphism and <Term word="strategy pattern" definition="A design pattern where you define a family of algorithms, encapsulate each one, and make them interchangeable. The algorithm varies independently from clients that use it." onLearn={learnTerm} /> to extend behavior.
          </p>

          <DeepDive id="ocp-realworld" title="OCP in the real world" onRead={markDeepDiveRead}>
            <p className="mb-2">
              Plugin architectures are OCP in action: VS Code extensions, Webpack plugins, Express middleware.
              The core framework is closed for modification but open for extension through well-defined interfaces.
            </p>
            <p>
              In system design interviews, mentioning OCP shows you think about long-term maintainability,
              not just getting the code to work today.
            </p>
          </DeepDive>

          {/* Code comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <CodeBlock code={codeSnippets.ocp.bad} variant="bad" />
            <CodeBlock code={codeSnippets.ocp.good} variant="good" />
          </div>

          {/* Interactive: Add shapes without modifying existing code */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-quest-warning" />
              Extend the Shape system — add new shapes WITHOUT editing existing code
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {ocpShapes.map(shape => {
                const isActive = ocpAddedShapes.has(shape.id)
                return (
                  <motion.div
                    key={shape.id}
                    layout
                    className={`rounded-lg border-2 p-4 text-center transition-all
                      ${isActive
                        ? 'border-quest-success/50 bg-quest-success/10'
                        : 'border-dashed border-white/20 bg-white/5'
                      }`}
                  >
                    <div className="text-2xl mb-2">
                      {shape.id === 'circle' && '⬤'}
                      {shape.id === 'rectangle' && '▬'}
                      {shape.id === 'triangle' && '▲'}
                      {shape.id === 'hexagon' && '⬡'}
                    </div>
                    <p className="font-semibold text-sm mb-1">{shape.label}</p>
                    <p className="text-xs text-quest-muted font-mono">{shape.formula}</p>
                    {isActive ? (
                      <span className="inline-flex items-center gap-1 text-xs text-quest-success mt-2">
                        <CheckCircle size={12} /> Active
                      </span>
                    ) : (
                      <button
                        onClick={() => handleOcpAddShape(shape.id)}
                        disabled={ocpShowExtension}
                        className="mt-2 text-xs px-3 py-1 rounded-full bg-quest-primary/20 text-quest-primary hover:bg-quest-primary/30 transition-colors disabled:opacity-50"
                      >
                        + Extend
                      </button>
                    )}
                  </motion.div>
                )
              })}
            </div>

            <AnimatePresence>
              {ocpShowExtension && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-emerald-950/30 border border-quest-success/30 rounded-lg p-4 text-center">
                    <RefreshCw size={20} className="inline mr-2 text-quest-success animate-spin" />
                    <span className="text-quest-success text-sm">
                      Creating new Shape subclass... No existing code modified!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {ocpAddedShapes.size >= ocpShapes.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-quest-success/10 border border-quest-success/30 rounded-lg text-center"
              >
                <CheckCircle size={20} className="inline mr-2 text-quest-success" />
                <span className="text-quest-success font-semibold">
                  Four shapes, zero modifications to existing code. That is the power of OCP.
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
              Back
            </button>
            <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
              Next: Liskov Substitution <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ LSP SECTION ═══════════════ */}
      {currentSection === 2 && (
        <motion.div
          key="lsp"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <ArrowUpDown size={24} className="text-amber-400" />
            <h2 className="text-2xl font-bold">L — Liskov Substitution Principle</h2>
          </div>

          <p className="text-quest-muted leading-relaxed">
            If <Term word="S is a subtype of T" definition="In object-oriented programming, class S extends or implements class T, inheriting its interface and behavioral contract." onLearn={learnTerm} />,
            then objects of type T may be replaced with objects of type S without breaking the program.
            Subtypes must honor the <Term word="behavioral contract" definition="The set of promises a base class makes: preconditions, postconditions, and invariants. Subtypes must not strengthen preconditions or weaken postconditions." onLearn={learnTerm} /> of their parent.
          </p>

          <DeepDive id="lsp-contracts" title="Contracts, preconditions, and postconditions" onRead={markDeepDiveRead}>
            <p className="mb-2">
              A method contract has three parts: <strong>preconditions</strong> (what must be true before calling),
              <strong>postconditions</strong> (what must be true after calling), and <strong>invariants</strong> (what
              must always be true). LSP says a subtype can weaken preconditions (accept more) and strengthen
              postconditions (promise more), but never the reverse.
            </p>
            <p>
              The classic Rectangle/Square problem: Rectangle promises that width and height are independent.
              Square violates this postcondition by coupling them. This is not just academic — it causes real bugs
              when code assumes independent dimensions.
            </p>
          </DeepDive>

          {/* Code comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <CodeBlock code={codeSnippets.lsp.bad} variant="bad" />
            <CodeBlock code={codeSnippets.lsp.good} variant="good" />
          </div>

          {/* Interactive: Test substitution scenarios */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-quest-warning" />
              Substitution Tester: Can the child replace the parent?
            </h3>

            {/* Scenario selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {lspScenarios.map((scenario, i) => (
                <button
                  key={scenario.id}
                  onClick={() => { setLspActiveScenario(i); setLspResult(null) }}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all
                    ${i === lspActiveScenario
                      ? 'bg-quest-primary text-white'
                      : 'bg-white/5 border border-white/10 hover:border-white/30'
                    }`}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            {/* Active scenario visualization */}
            {(() => {
              const scenario = lspScenarios[lspActiveScenario]
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-6">
                    {/* Parent */}
                    <motion.div
                      className="rounded-xl border-2 border-sky-400/50 bg-sky-400/10 p-4 text-center min-w-[140px]"
                      animate={lspAnimating ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <Box size={24} className="mx-auto mb-2 text-sky-400" />
                      <p className="font-bold text-sm">{scenario.parent}</p>
                      <p className="text-xs text-quest-muted mt-1 font-mono">{scenario.method}</p>
                    </motion.div>

                    <div className="flex flex-col items-center">
                      <ArrowRight size={24} className="text-quest-muted" />
                      <span className="text-xs text-quest-muted mt-1">replaces</span>
                    </div>

                    {/* Child */}
                    <motion.div
                      className={`rounded-xl border-2 p-4 text-center min-w-[140px] transition-colors
                        ${lspResult === 'pass' ? 'border-quest-success/50 bg-quest-success/10'
                          : lspResult === 'fail' ? 'border-quest-danger/50 bg-quest-danger/10'
                          : 'border-amber-400/50 bg-amber-400/10'
                        }`}
                      animate={lspAnimating ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <Code size={24} className="mx-auto mb-2 text-amber-400" />
                      <p className="font-bold text-sm">{scenario.child}</p>
                      <p className="text-xs text-quest-muted mt-1 font-mono">{scenario.method}</p>
                    </motion.div>
                  </div>

                  {/* Test button */}
                  <div className="text-center">
                    <button
                      onClick={handleLspTest}
                      disabled={lspAnimating}
                      className="btn-primary px-6 disabled:opacity-50"
                    >
                      {lspAnimating ? 'Testing substitution...' : 'Run Substitution Test'}
                    </button>
                  </div>

                  {/* Result */}
                  <AnimatePresence>
                    {lspResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 rounded-lg border ${
                          lspResult === 'pass'
                            ? 'bg-quest-success/10 border-quest-success/30'
                            : 'bg-quest-danger/10 border-quest-danger/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {lspResult === 'pass'
                            ? <CheckCircle size={20} className="text-quest-success mt-0.5" />
                            : <XCircle size={20} className="text-quest-danger mt-0.5" />
                          }
                          <div>
                            <p className={`font-semibold ${lspResult === 'pass' ? 'text-quest-success' : 'text-quest-danger'}`}>
                              {lspResult === 'pass' ? 'LSP Satisfied!' : 'LSP Violation Detected!'}
                            </p>
                            <p className="text-sm text-quest-muted mt-1">{scenario.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })()}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
              Back
            </button>
            <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
              Next: Interface Segregation <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ ISP SECTION ═══════════════ */}
      {currentSection === 3 && (
        <motion.div
          key="isp"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Scissors size={24} className="text-purple-400" />
            <h2 className="text-2xl font-bold">I — Interface Segregation Principle</h2>
          </div>

          <p className="text-quest-muted leading-relaxed">
            No client should be forced to depend on methods it does not use. Instead of one{' '}
            <Term word="fat interface" definition="An interface that bundles many unrelated methods together, forcing implementors to provide stubs or throw exceptions for methods they do not support." onLearn={learnTerm} />,
            split it into smaller, focused <Term word="role interfaces" definition="Small interfaces that define a single capability. A class implements only the interfaces it actually needs, keeping its dependency surface minimal." onLearn={learnTerm} />.
          </p>

          <DeepDive id="isp-microservices" title="ISP in API and microservice design" onRead={markDeepDiveRead}>
            <p className="mb-2">
              ISP applies beyond classes. In REST API design, it means not bundling unrelated endpoints
              into a single service. In GraphQL, it is the reason for type composition. In microservices,
              it means defining narrow service contracts.
            </p>
            <p>
              When a consumer only needs 2 out of 20 methods in your SDK, you have a fat interface.
              Splitting it reduces coupling and makes the consumer resilient to changes in methods it never calls.
            </p>
          </DeepDive>

          {/* Code comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <CodeBlock code={codeSnippets.isp.bad} variant="bad" />
            <CodeBlock code={codeSnippets.isp.good} variant="good" />
          </div>

          {/* Interactive: Split the fat interface */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-quest-warning" />
              Split the Fat Interface: Drag each method to its correct role interface
            </h3>

            {/* Methods pool */}
            <div className="mb-6">
              <p className="text-sm text-quest-muted mb-3">Methods in the bloated Machine interface:</p>
              <div className="flex flex-wrap gap-2">
                {fatInterfaceMethods.map(method => {
                  const isAssigned = ispAssignments[method.id]
                  return (
                    <motion.button
                      key={method.id}
                      draggable={!ispComplete}
                      onDragStart={() => handleIspDragStart(method.id)}
                      onClick={() => !ispComplete && setIspDragItem(ispDragItem === method.id ? null : method.id)}
                      whileHover={!ispComplete ? { scale: 1.05 } : {}}
                      whileTap={!ispComplete ? { scale: 0.95 } : {}}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all cursor-grab active:cursor-grabbing
                        ${isAssigned
                          ? ispAssignments[method.id] === method.group
                            ? 'bg-quest-success/20 border border-quest-success/40 text-quest-success'
                            : 'bg-quest-danger/20 border border-quest-danger/40 text-quest-danger'
                          : ispDragItem === method.id
                            ? 'bg-quest-primary/30 border border-quest-primary shadow-lg shadow-quest-primary/20'
                            : 'bg-white/5 border border-white/20 hover:border-white/40'
                        }`}
                    >
                      {method.label}
                      {isAssigned && ispAssignments[method.id] === method.group && <CheckCircle size={12} className="inline ml-1" />}
                      {isAssigned && ispAssignments[method.id] !== method.group && <XCircle size={12} className="inline ml-1" />}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Target interfaces */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ispInterfaces.map(iface => {
                const assignedMethods = Object.entries(ispAssignments)
                  .filter(([_, target]) => target === iface.id)
                  .map(([methodId]) => fatInterfaceMethods.find(m => m.id === methodId))
                return (
                  <motion.div
                    key={iface.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleIspDrop(iface.id)}
                    onClick={() => { if (ispDragItem) handleIspDrop(iface.id) }}
                    className={`rounded-lg border-2 border-dashed p-3 min-h-[80px] transition-all
                      ${ispDragItem ? 'border-quest-primary/60 bg-quest-primary/5' : iface.color}`}
                  >
                    <p className="text-xs font-bold mb-1">
                      <span className="mr-1">{iface.icon}</span>
                      {iface.label}
                    </p>
                    <div className="space-y-1">
                      {assignedMethods.map(m => m && (
                        <span key={m.id} className="block text-xs font-mono text-quest-text/80">{m.label}</span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {ispComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-quest-success/10 border border-quest-success/30 rounded-lg text-center"
              >
                <CheckCircle size={20} className="inline mr-2 text-quest-success" />
                <span className="text-quest-success font-semibold">
                  The fat interface is no more! SimplePrinter only implements Printable now.
                </span>
              </motion.div>
            )}

            {!ispComplete && Object.keys(ispAssignments).length === fatInterfaceMethods.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-quest-danger/10 border border-quest-danger/30 rounded-lg text-center"
              >
                <AlertTriangle size={16} className="inline mr-2 text-quest-danger" />
                <span className="text-quest-danger text-sm">
                  Some methods are in the wrong interface. Try again!
                </span>
                <button
                  onClick={() => setIspAssignments({})}
                  className="ml-3 text-xs underline text-quest-muted hover:text-white"
                >
                  Reset
                </button>
              </motion.div>
            )}
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
              Back
            </button>
            <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
              Next: Dependency Inversion <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ DIP SECTION ═══════════════ */}
      {currentSection === 4 && (
        <motion.div
          key="dip"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <ArrowDownUp size={24} className="text-rose-400" />
            <h2 className="text-2xl font-bold">D — Dependency Inversion Principle</h2>
          </div>

          <p className="text-quest-muted leading-relaxed">
            High-level modules should not depend on low-level modules. Both should depend on{' '}
            <Term word="abstractions" definition="Interfaces or abstract classes that define contracts without specifying implementation details. They are the stable layer that decouples high-level policy from low-level mechanism." onLearn={learnTerm} />.
            Abstractions should not depend on details.{' '}
            <Term word="Details" definition="Concrete implementations like MySQLDatabase, SMTPMailer, or FileLogger. These are the volatile parts of your system that change often." onLearn={learnTerm} /> should depend on abstractions.
            This is the foundation of <Term word="dependency injection" definition="A technique where dependencies are provided (injected) from the outside rather than created internally. The constructor receives an interface, and the caller decides which implementation to pass in." onLearn={learnTerm} />.
          </p>

          <DeepDive id="dip-testing" title="DIP enables testing and flexibility" onRead={markDeepDiveRead}>
            <p className="mb-2">
              Without DIP, you cannot unit test in isolation: your OrderService creates a real database connection.
              With DIP, you inject a MockDatabase during tests and a real one in production. Same code, different behavior.
            </p>
            <p>
              DIP also enables feature flags, A/B testing, and gradual migration. Swapping from MySQL to PostgreSQL
              becomes a configuration change, not a rewrite. This is why dependency injection frameworks (Spring, Nest.js,
              Angular) are so popular.
            </p>
          </DeepDive>

          {/* Code comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <CodeBlock code={codeSnippets.dip.bad} variant="bad" />
            <CodeBlock code={codeSnippets.dip.good} variant="good" />
          </div>

          {/* Interactive: Dependency visualization */}
          <div className="bg-quest-surface/50 rounded-xl border border-white/10 p-6 mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Zap size={18} className="text-quest-warning" />
              Dependency Visualizer: See how DIP decouples your architecture
            </h3>

            {/* Mode toggle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setDipMode('bad')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                  ${dipMode === 'bad'
                    ? 'bg-quest-danger/20 border border-quest-danger/40 text-quest-danger'
                    : 'bg-white/5 border border-white/10 text-quest-muted hover:border-white/30'
                  }`}
              >
                Without DIP
              </button>
              <button
                onClick={() => { setDipMode('good'); setCompletedSections(prev => new Set([...prev, 'dip'])) }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                  ${dipMode === 'good'
                    ? 'bg-quest-success/20 border border-quest-success/40 text-quest-success'
                    : 'bg-white/5 border border-white/10 text-quest-muted hover:border-white/30'
                  }`}
              >
                With DIP
              </button>
            </div>

            {/* Bad mode */}
            <AnimatePresence mode="wait">
              {dipMode === 'bad' && (
                <motion.div
                  key="bad"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* High-level module */}
                    <motion.div
                      className="rounded-xl border-2 border-sky-400/50 bg-sky-400/10 p-4 text-center w-64"
                    >
                      <Layers size={24} className="mx-auto mb-2 text-sky-400" />
                      <p className="font-bold text-sm">{dipLayers.bad.high.label}</p>
                      <p className="text-xs text-quest-muted mt-1">{dipLayers.bad.high.detail}</p>
                    </motion.div>

                    {/* Arrow pointing down */}
                    <div className="flex flex-col items-center text-quest-danger">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowDownUp size={24} />
                      </motion.div>
                      <span className="text-xs font-semibold">Tightly Coupled</span>
                    </div>

                    {/* Low-level module */}
                    <motion.div
                      className="rounded-xl border-2 border-quest-danger/50 bg-quest-danger/10 p-4 text-center w-64"
                    >
                      <Box size={24} className="mx-auto mb-2 text-quest-danger" />
                      <p className="font-bold text-sm">{dipLayers.bad.low.label}</p>
                      <p className="text-xs text-quest-muted mt-1">{dipLayers.bad.low.detail}</p>
                    </motion.div>
                  </div>

                  <div className="text-center p-3 bg-quest-danger/10 border border-quest-danger/30 rounded-lg">
                    <XCircle size={16} className="inline mr-2 text-quest-danger" />
                    <span className="text-quest-danger text-sm">{dipLayers.bad.problem}</span>
                  </div>
                </motion.div>
              )}

              {dipMode === 'good' && (
                <motion.div
                  key="good"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* High-level module */}
                    <motion.div
                      className="rounded-xl border-2 border-sky-400/50 bg-sky-400/10 p-4 text-center w-64"
                    >
                      <Layers size={24} className="mx-auto mb-2 text-sky-400" />
                      <p className="font-bold text-sm">{dipLayers.good.high.label}</p>
                      <p className="text-xs text-quest-muted mt-1">{dipLayers.good.high.detail}</p>
                    </motion.div>

                    {/* Arrow to abstraction */}
                    <div className="flex flex-col items-center text-quest-success">
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <ArrowDownUp size={20} />
                      </motion.div>
                      <span className="text-xs">depends on</span>
                    </div>

                    {/* Abstraction layer */}
                    <motion.div
                      className="rounded-xl border-2 border-quest-warning/50 bg-quest-warning/10 p-4 text-center w-72"
                      layout
                    >
                      <Shield size={24} className="mx-auto mb-2 text-quest-warning" />
                      <p className="font-bold text-sm">{dipLayers.good.abstraction.label}</p>
                      <p className="text-xs text-quest-muted mt-1">{dipLayers.good.abstraction.detail}</p>
                    </motion.div>

                    {/* Arrow from low-level to abstraction */}
                    <div className="flex flex-col items-center text-quest-success">
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
                      >
                        <ArrowDownUp size={20} />
                      </motion.div>
                      <span className="text-xs">implements</span>
                    </div>

                    {/* Low-level module (swappable) */}
                    <motion.div
                      key={dipSwapTarget}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      className="rounded-xl border-2 border-quest-success/50 bg-quest-success/10 p-4 text-center w-64"
                    >
                      <Box size={24} className="mx-auto mb-2 text-quest-success" />
                      <p className="font-bold text-sm">
                        {dipSwapTarget === 'mysql' ? 'MySQLDatabase' : 'PostgresDatabase'}
                      </p>
                      <p className="text-xs text-quest-muted mt-1">Implements DatabaseInterface</p>
                    </motion.div>
                  </div>

                  {/* Swap button */}
                  <div className="text-center">
                    <button
                      onClick={handleDipSwap}
                      disabled={dipSwapping}
                      className="btn-primary px-6 disabled:opacity-50"
                    >
                      <RefreshCw size={16} className={`inline mr-2 ${dipSwapping ? 'animate-spin' : ''}`} />
                      Swap Implementation (no code changes!)
                    </button>
                  </div>

                  <div className="text-center p-3 bg-quest-success/10 border border-quest-success/30 rounded-lg">
                    <CheckCircle size={16} className="inline mr-2 text-quest-success" />
                    <span className="text-quest-success text-sm">{dipLayers.good.benefit}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
              Back
            </button>
            <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
              Take the Quiz <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ QUIZ SECTION ═══════════════ */}
      {currentSection === 5 && (
        <motion.div
          key="quiz"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={24} className="text-quest-primary" />
            <h2 className="text-2xl font-bold">SOLID Principles Quiz</h2>
          </div>

          <p className="text-quest-muted">
            Test your understanding of all five SOLID principles. Identify which principle is being
            violated or applied in each scenario.
          </p>

          <div className="space-y-8">
            {quizQuestions.map((q, qi) => (
              <div key={q.id} className="bg-quest-surface/50 rounded-xl border border-white/10 p-5">
                <p className="font-semibold mb-4">
                  <span className="text-quest-primary mr-2">{qi + 1}.</span>
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
                        <span className="font-mono text-xs mr-2 text-quest-muted">{option.id.toUpperCase()}.</span>
                        {option.text}
                        {showResult && isSelected && isCorrect && <CheckCircle size={14} className="inline ml-2 text-quest-success" />}
                        {showResult && isSelected && !isCorrect && <XCircle size={14} className="inline ml-2 text-quest-danger" />}
                        {showResult && !isSelected && isCorrect && <CheckCircle size={14} className="inline ml-2 text-quest-success opacity-60" />}
                      </button>
                    )
                  })}
                </div>

                {quizSubmitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm text-quest-muted bg-white/5 rounded-lg p-3"
                  >
                    {q.explanation}
                  </motion.p>
                )}
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
              <h3 className="text-xl font-bold mb-2">Level 27 Complete!</h3>
              <p className="text-lg font-semibold text-quest-primary mb-2">
                Score: {quizScore} / {quizQuestions.length}
              </p>
              <p className="text-quest-muted mb-4">
                You now understand the five SOLID principles: Single Responsibility, Open/Closed,
                Liskov Substitution, Interface Segregation, and Dependency Inversion. Your code stands
                on solid ground, ready for change without fear.
              </p>
              <p className="text-sm text-sky-400">
                Remember: SOLID is not about perfection on day one. It is about making your codebase
                easier to change on day one hundred.
              </p>
            </motion.div>
          )}

          <div className="flex justify-start">
            <button onClick={() => setCurrentSection(4)} className="btn-secondary flex items-center gap-2">
              Back
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Ban, Filter, AlertTriangle, CheckSquare, XSquare } from 'lucide-react'

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

/* ── Null Check Explosion data ── */

const nullCheckCode = [
  'function getDiscountMessage(user) {',
  '  if (user !== null && user !== undefined) {',
  '    if (user.membership !== null && user.membership !== undefined) {',
  '      if (user.membership.tier !== null && user.membership.tier !== undefined) {',
  '        if (user.membership.discountPolicy !== null) {',
  '          if (user.membership.discountPolicy.getMessage !== null) {',
  '            return user.membership.discountPolicy.getMessage(user.membership.tier);',
  '          } else { return "No discount available"; }',
  '        } else { return "No discount available"; }',
  '      } else { return "No discount available"; }',
  '    } else { return "No discount available"; }',
  '  } else { return "No discount available"; }',
  '}',
]

const nullObjectCode = [
  'function getDiscountMessage(user) {',
  '  return user',
  '    .getMembership()',
  '    .getDiscountPolicy()',
  '    .getMessage(user.getMembership().getTier());',
  '}',
  '',
  '// NullUser, NullMembership, NullDiscountPolicy',
  '// all return safe defaults — no checks needed.',
]

/* ── Logger demo data ── */

const loggerCalls = [
  { method: 'log', args: '"User logged in"' },
  { method: 'warn', args: '"Disk usage at 90%"' },
  { method: 'error', args: '"Connection timeout"' },
  { method: 'log', args: '"Cache refreshed"' },
]

/* ── Specification builder rules ── */

const availableSpecs = [
  { id: 'age18', label: 'age >= 18', color: 'sky', evaluate: (u) => u.age >= 18 },
  { id: 'hasLicense', label: 'hasLicense', color: 'green', evaluate: (u) => u.hasLicense },
  { id: 'notBanned', label: '!isBanned', color: 'red', evaluate: (u) => !u.isBanned },
  { id: 'creditOk', label: 'creditScore > 600', color: 'purple', evaluate: (u) => u.creditScore > 600 },
  { id: 'verified', label: 'isVerified', color: 'yellow', evaluate: (u) => u.isVerified },
  { id: 'premium', label: 'isPremium', color: 'orange', evaluate: (u) => u.isPremium },
]

const testUsers = [
  { name: 'Alice', age: 25, hasLicense: true, isBanned: false, creditScore: 720, isVerified: true, isPremium: true },
  { name: 'Bob', age: 17, hasLicense: false, isBanned: false, creditScore: 580, isVerified: true, isPremium: false },
  { name: 'Carol', age: 30, hasLicense: true, isBanned: true, creditScore: 750, isVerified: false, isPremium: true },
  { name: 'Dave', age: 22, hasLicense: true, isBanned: false, creditScore: 650, isVerified: true, isPremium: false },
  { name: 'Eve', age: 16, hasLicense: false, isBanned: false, creditScore: 400, isVerified: false, isPremium: false },
]

/* ── Quiz ── */

const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the core benefit of the Null Object pattern?',
    options: [
      { id: 'a', text: 'It makes null checks faster at runtime', correct: false },
      { id: 'b', text: 'It eliminates conditional null checks by providing a do-nothing implementation of an interface', correct: true },
      { id: 'c', text: 'It prevents objects from ever being garbage collected', correct: false },
      { id: 'd', text: 'It converts all nulls to empty strings automatically', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'How do Specifications compose together?',
    options: [
      { id: 'a', text: 'Through inheritance chains only', correct: false },
      { id: 'b', text: 'Using AND, OR, and NOT combinators to build complex rules from simple ones', correct: true },
      { id: 'c', text: 'By writing nested if-else statements', correct: false },
      { id: 'd', text: 'Through database JOIN operations', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'When should you NOT use the Null Object pattern?',
    options: [
      { id: 'a', text: 'When the interface has many methods', correct: false },
      { id: 'b', text: 'When the absence of an object is a meaningful business case that should be handled explicitly', correct: true },
      { id: 'c', text: 'When working with collections', correct: false },
      { id: 'd', text: 'When using TypeScript', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What advantage does the Specification pattern have over chained if-else blocks?',
    options: [
      { id: 'a', text: 'It runs faster because specifications are compiled', correct: false },
      { id: 'b', text: 'Each rule is a reusable, testable, composable object — easy to add/remove/combine rules without editing existing code', correct: true },
      { id: 'c', text: 'It uses less memory than if-else', correct: false },
      { id: 'd', text: 'It automatically parallelizes the rule checks', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'In a composite specification like "AndSpecification(specA, specB)", when does it return true?',
    options: [
      { id: 'a', text: 'When either specA or specB returns true', correct: false },
      { id: 'b', text: 'When specA returns true and specB returns false', correct: false },
      { id: 'c', text: 'Only when both specA AND specB return true', correct: true },
      { id: 'd', text: 'When neither specA nor specB returns true', correct: false },
    ],
  },
]

/* ═══════════════════════════════════════════════════════════════════ */

export default function Level43({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* ── Null check explosion state ── */
  const [showNullObject, setShowNullObject] = useState(false)

  /* ── Logger demo state ── */
  const [activeLogger, setActiveLogger] = useState('real') // 'real' | 'null'
  const [logOutput, setLogOutput] = useState([])
  const [logIndex, setLogIndex] = useState(0)

  /* ── Specification builder state ── */
  const [specNodes, setSpecNodes] = useState([]) // [{specId, combinator: 'AND'|'OR'|null, negate: false}]
  const [specResults, setSpecResults] = useState(null)

  /* ── Composite spec visualization state ── */
  const [compositeHighlight, setCompositeHighlight] = useState(null)

  /* ── Quiz state ── */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Null check explosion handlers ── */
  const linesSaved = nullCheckCode.length - nullObjectCode.length

  /* ── Logger demo handlers ── */
  const runNextLog = () => {
    if (logIndex >= loggerCalls.length) {
      setLogIndex(0)
      setLogOutput([])
      return
    }
    const call = loggerCalls[logIndex]
    if (activeLogger === 'real') {
      setLogOutput(prev => [...prev, { type: call.method, text: `[${call.method.toUpperCase()}] ${call.args}` }])
    } else {
      setLogOutput(prev => [...prev, { type: 'null', text: `logger.${call.method}(${call.args}) → (no-op)` }])
    }
    setLogIndex(prev => prev + 1)
  }

  const resetLogger = () => {
    setLogOutput([])
    setLogIndex(0)
  }

  /* ── Specification builder handlers ── */
  const addSpec = (specId) => {
    if (specNodes.length >= 5) return
    const combinator = specNodes.length > 0 ? 'AND' : null
    setSpecNodes(prev => [...prev, { specId, combinator, negate: false }])
    setSpecResults(null)
  }

  const removeSpec = (index) => {
    setSpecNodes(prev => {
      const next = prev.filter((_, i) => i !== index)
      if (next.length > 0 && next[0].combinator !== null) {
        next[0] = { ...next[0], combinator: null }
      }
      return next
    })
    setSpecResults(null)
  }

  const toggleCombinator = (index) => {
    if (index === 0) return
    setSpecNodes(prev => prev.map((n, i) =>
      i === index ? { ...n, combinator: n.combinator === 'AND' ? 'OR' : 'AND' } : n
    ))
    setSpecResults(null)
  }

  const toggleNegate = (index) => {
    setSpecNodes(prev => prev.map((n, i) =>
      i === index ? { ...n, negate: !n.negate } : n
    ))
    setSpecResults(null)
  }

  const evaluateSpecs = () => {
    if (specNodes.length === 0) return
    const results = testUsers.map(user => {
      let result = null
      for (let i = 0; i < specNodes.length; i++) {
        const node = specNodes[i]
        const spec = availableSpecs.find(s => s.id === node.specId)
        let val = spec.evaluate(user)
        if (node.negate) val = !val

        if (i === 0) {
          result = val
        } else if (node.combinator === 'AND') {
          result = result && val
        } else {
          result = result || val
        }
      }
      return { name: user.name, pass: result }
    })
    setSpecResults(results)
  }

  /* ── Quiz handlers ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (!isCompleted) onComplete?.()
  }

  /* ── Composite specification tree data ── */
  const compositeTree = {
    type: 'AND',
    label: 'CanRentCar',
    children: [
      {
        type: 'AND',
        label: 'IsEligibleDriver',
        children: [
          { type: 'LEAF', label: 'age >= 21', eval: true },
          { type: 'LEAF', label: 'hasLicense', eval: true },
        ],
      },
      {
        type: 'NOT',
        label: 'IsNotBlacklisted',
        children: [
          { type: 'LEAF', label: 'isBlacklisted', eval: false },
        ],
      },
      {
        type: 'OR',
        label: 'HasPayment',
        children: [
          { type: 'LEAF', label: 'hasCreditCard', eval: true },
          { type: 'LEAF', label: 'hasDeposit', eval: false },
        ],
      },
    ],
  }

  /* ── Section nav ── */
  const sections = [
    'The Null Plague',
    'Null Object Pattern',
    'Specification Pattern',
    'Composite Specifications',
    'Quiz',
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quest-surface border border-white/10 text-xs text-quest-muted mb-4">
          <Ban size={14} className="text-red-400" />
          Level 43
        </div>
        <h1 className="text-4xl font-bold mb-3">Null is Not Nothing</h1>
        <p className="text-quest-muted max-w-xl mx-auto">
          Your code has null checks everywhere. One missed check = NullPointerException in production.
          Let's fix that with patterns that make null safe by design.
        </p>
      </motion.div>

      {/* Section Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {sections.map((name, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${currentSection === i
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50'
                : 'bg-quest-surface text-quest-muted border border-white/10 hover:border-white/30'
              }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: THE NULL PLAGUE ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-400" />
              The Null Plague
            </h2>

            <p className="text-quest-muted mb-6">
              Tony Hoare, who invented the null reference in 1965, called it his{' '}
              <Term
                word="Billion Dollar Mistake"
                definition="Tony Hoare's famous apology for inventing null references, estimating they've caused billions of dollars in bugs, crashes, and security vulnerabilities across all software ever written."
                onLearn={learnTerm}
              />
              . Every time you write <code className="text-xs font-mono text-red-400">if (x !== null)</code>,
              you're paying a tax on his invention. Miss one check and your production server explodes with a{' '}
              <Term
                word="NullPointerException"
                definition="A runtime error thrown when code attempts to use a reference that points to null (no object). One of the most common bugs in software — accounts for a huge percentage of production crashes."
                onLearn={learnTerm}
              />
              .
            </p>

            {/* Null check explosion demo */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">
                  {showNullObject ? 'After: Null Object Pattern' : 'Before: Null Check Explosion'}
                </h3>
                <button
                  onClick={() => setShowNullObject(!showNullObject)}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-all"
                >
                  {showNullObject ? 'Show Before' : 'Show After'}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {!showNullObject ? (
                  <motion.div
                    key="before"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs leading-relaxed"
                  >
                    {nullCheckCode.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`${line.includes('!== null') || line.includes('!== undefined') ? 'text-red-400 bg-red-500/5' : 'text-quest-muted'} px-2 py-0.5 rounded`}
                      >
                        {line}
                      </motion.div>
                    ))}
                    <div className="mt-3 flex items-center gap-2 text-red-400 text-xs">
                      <AlertTriangle size={14} />
                      <span>{nullCheckCode.length} lines — 5 null checks — deeply nested</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="after"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-xs leading-relaxed"
                  >
                    {nullObjectCode.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`${line.startsWith('//') ? 'text-green-400/60' : 'text-green-400'} px-2 py-0.5 rounded`}
                      >
                        {line || '\u00A0'}
                      </motion.div>
                    ))}
                    <div className="mt-3 flex items-center gap-2 text-green-400 text-xs">
                      <CheckCircle size={14} />
                      <span>{nullObjectCode.length} lines — 0 null checks — {linesSaved} lines saved</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Why null is dangerous */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              <div className="bg-quest-surface rounded-lg p-4 border border-red-500/20">
                <p className="text-xs font-medium text-red-400 mb-2">Silent Propagation</p>
                <p className="text-[11px] text-quest-muted">
                  Null travels through your code invisibly. The crash happens far from where null was introduced,
                  making debugging a nightmare.
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 border border-red-500/20">
                <p className="text-xs font-medium text-red-400 mb-2">Defensive Bloat</p>
                <p className="text-[11px] text-quest-muted">
                  Developers add null checks everywhere "just in case." Code becomes 50% null-guarding logic,
                  obscuring the actual business intent.
                </p>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 border border-red-500/20">
                <p className="text-xs font-medium text-red-400 mb-2">Ambiguous Meaning</p>
                <p className="text-[11px] text-quest-muted">
                  Does null mean "not found"? "Not initialized"? "Error occurred"? "User chose nothing"?
                  Null is overloaded with too many meanings.
                </p>
              </div>
            </div>

            <DeepDive id="null-history" title="A Brief History of Null" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p className="italic border-l-2 border-red-500/50 pl-3">
                  "I call it my billion-dollar mistake. It was the invention of the null reference in 1965."
                  <br />
                  <span className="text-xs">— Tony Hoare, 2009 QCon London</span>
                </p>
                <p>
                  <strong className="text-quest-text">The Origin:</strong> ALGOL W introduced null references because
                  it was the "easiest thing to implement." Every language since (C, Java, C#, JavaScript) copied
                  the idea. The result: trillions of null pointer exceptions across decades of software.
                </p>
                <p>
                  <strong className="text-quest-text">Modern Solutions:</strong> Languages are fighting back.
                  Kotlin has nullable types (<code className="font-mono text-xs">String?</code>), Rust has
                  <code className="font-mono text-xs"> Option&lt;T&gt;</code>, Swift has optionals. These force
                  you to handle the null case at compile time rather than discovering it at 3 AM in production.
                </p>
                <p>
                  <strong className="text-quest-text">The Null Object Pattern</strong> is a design-level solution
                  that works in any language: instead of returning null, return an object that implements the
                  expected interface but does nothing. The caller never needs to check.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Null Object Pattern
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: NULL OBJECT PATTERN ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Ban className="text-sky-400" />
              Null Object Pattern
            </h2>

            <p className="text-quest-muted mb-6">
              The{' '}
              <Term
                word="Null Object Pattern"
                definition="A design pattern where instead of using null to represent the absence of an object, you use a special object that implements the same interface but performs no action (or returns safe defaults). Eliminates null checks throughout the codebase."
                onLearn={learnTerm}
              />{' '}
              replaces null with an object that does nothing but conforms to the expected interface.
              The caller code never checks for null — it just calls methods, and the null object quietly
              handles the "nothing" case.
            </p>

            {/* Logger demo */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-sm mb-4">Interactive: Real Logger vs. Null Logger</h3>
              <p className="text-xs text-quest-muted mb-4">
                Both loggers implement the same interface. The caller code is identical — no null checks needed.
              </p>

              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => { setActiveLogger('real'); resetLogger() }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all
                    ${activeLogger === 'real'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                      : 'bg-quest-surface text-quest-muted border border-white/10'}`}
                >
                  ConsoleLogger (real)
                </button>
                <button
                  onClick={() => { setActiveLogger('null'); resetLogger() }}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all
                    ${activeLogger === 'null'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50'
                      : 'bg-quest-surface text-quest-muted border border-white/10'}`}
                >
                  NullLogger (no-op)
                </button>
              </div>

              {/* Caller code — identical for both */}
              <div className="bg-quest-surface rounded-lg p-3 mb-4 font-mono text-xs">
                <p className="text-quest-muted/60 mb-1">// Same caller code for BOTH loggers:</p>
                {loggerCalls.map((call, i) => (
                  <p key={i} className={`${i < logIndex ? 'text-sky-400' : 'text-quest-muted'} transition-colors`}>
                    logger.{call.method}({call.args});
                  </p>
                ))}
              </div>

              {/* Controls */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={runNextLog}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-sky-500/20 text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-all"
                >
                  {logIndex >= loggerCalls.length ? 'Reset' : `Run Line ${logIndex + 1}`}
                </button>
              </div>

              {/* Output */}
              <div className="bg-black/40 rounded-lg p-3 min-h-[80px] font-mono text-xs">
                <p className="text-quest-muted/40 mb-1">// Output:</p>
                <AnimatePresence>
                  {logOutput.map((entry, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={
                        entry.type === 'error' ? 'text-red-400' :
                        entry.type === 'warn' ? 'text-yellow-400' :
                        entry.type === 'null' ? 'text-orange-400/50 italic' :
                        'text-green-400'
                      }
                    >
                      {entry.text}
                    </motion.p>
                  ))}
                </AnimatePresence>
                {logOutput.length === 0 && (
                  <p className="text-quest-muted/30 italic">Click "Run Line" to execute each logger call...</p>
                )}
              </div>
            </div>

            {/* Pattern structure */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Pattern Structure</h4>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-quest-bg rounded-lg p-3 border border-sky-500/20">
                  <p className="text-xs font-medium text-sky-400 mb-2">Interface</p>
                  <div className="font-mono text-[10px] text-quest-muted space-y-0.5">
                    <p>interface Logger {'{'}</p>
                    <p className="pl-3">log(msg: string)</p>
                    <p className="pl-3">warn(msg: string)</p>
                    <p className="pl-3">error(msg: string)</p>
                    <p>{'}'}</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3 border border-green-500/20">
                  <p className="text-xs font-medium text-green-400 mb-2">Real Implementation</p>
                  <div className="font-mono text-[10px] text-quest-muted space-y-0.5">
                    <p>class ConsoleLogger {'{'}</p>
                    <p className="pl-3">log(msg) {'{'}</p>
                    <p className="pl-5">console.log(msg)</p>
                    <p className="pl-3">{'}'}</p>
                    <p>{'}'}</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3 border border-orange-500/20">
                  <p className="text-xs font-medium text-orange-400 mb-2">Null Object</p>
                  <div className="font-mono text-[10px] text-quest-muted space-y-0.5">
                    <p>class NullLogger {'{'}</p>
                    <p className="pl-3">log(msg) {'{ }'}</p>
                    <p className="pl-3">warn(msg) {'{ }'}</p>
                    <p className="pl-3">error(msg) {'{ }'}</p>
                    <p>{'}'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* When to use / when not to */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-lg p-4 border border-green-500/20">
                <h4 className="text-xs font-semibold text-green-400 mb-3 flex items-center gap-1">
                  <CheckSquare size={14} /> When to Use
                </h4>
                <ul className="space-y-2 text-[11px] text-quest-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    Optional dependencies (logger, cache, metrics)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    Default/fallback behavior is "do nothing"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    Simplifying strategy pattern with a "no-op" strategy
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">+</span>
                    Collections that should return empty instead of null
                  </li>
                </ul>
              </div>
              <div className="bg-quest-bg rounded-lg p-4 border border-red-500/20">
                <h4 className="text-xs font-semibold text-red-400 mb-3 flex items-center gap-1">
                  <XSquare size={14} /> When NOT to Use
                </h4>
                <ul className="space-y-2 text-[11px] text-quest-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    Null means an error that must be handled (use exceptions)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    Absence is meaningful business logic ("user has no address")
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    The "do nothing" behavior could mask real bugs
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">-</span>
                    You need to distinguish between "present" and "absent"
                  </li>
                </ul>
              </div>
            </div>

            <DeepDive id="null-object-variations" title="Null Object Variations & Real-World Examples" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">In JavaScript/TypeScript:</strong> Common examples include
                  returning <code className="font-mono text-xs">[]</code> instead of null for collections,
                  <code className="font-mono text-xs"> {'{}'}</code> instead of null for config objects, and
                  <code className="font-mono text-xs"> () =&gt; {'{}'}</code> instead of null for callbacks.
                  React's <code className="font-mono text-xs">{'<></>'}</code> (empty fragment) is a null object for components.
                </p>
                <p>
                  <strong className="text-quest-text">Special Return Object:</strong> Some null objects return useful
                  defaults. A NullUser might return <code className="font-mono text-xs">"Guest"</code> for getName(),
                  <code className="font-mono text-xs"> "default"</code> for getTheme(), and
                  <code className="font-mono text-xs"> false</code> for isAdmin(). This lets the system gracefully
                  degrade instead of crashing.
                </p>
                <p>
                  <strong className="text-quest-text">Java's Optional:</strong>{' '}
                  <code className="font-mono text-xs">Optional.empty()</code> is a language-level null object.
                  It forces callers to handle the empty case but avoids NullPointerException.
                  Similarly, Scala's <code className="font-mono text-xs">None</code> and Haskell's
                  <code className="font-mono text-xs"> Nothing</code>.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Specification Pattern
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: SPECIFICATION PATTERN ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Filter className="text-purple-400" />
              Specification Pattern
            </h2>

            <p className="text-quest-muted mb-6">
              The{' '}
              <Term
                word="Specification Pattern"
                definition="A design pattern that encapsulates a business rule into a reusable, composable object. Each specification answers one yes/no question about a candidate. Specifications can be combined with AND, OR, and NOT to build complex rules from simple ones."
                onLearn={learnTerm}
              />{' '}
              turns business rules into reusable, composable objects. Instead of writing tangled
              if-else chains, each rule becomes a small, testable building block. Combine them
              with{' '}
              <Term
                word="Composite Specification"
                definition="A specification built by combining simpler specifications using logical operators (AND, OR, NOT). For example: 'IsEligible AND HasPayment AND NOT IsBlacklisted'. Each part is independently testable and reusable."
                onLearn={learnTerm}
              />{' '}
              operators to express complex business logic cleanly.
            </p>

            {/* Before/after comparison */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-lg p-4 border border-red-500/20">
                <h4 className="text-xs font-semibold text-red-400 mb-3">Before: Tangled If-Else</h4>
                <div className="font-mono text-[10px] text-quest-muted space-y-0.5">
                  <p>function canRentCar(user) {'{'}</p>
                  <p className="pl-3 text-red-400">if (user.age {'<'} 21) return false;</p>
                  <p className="pl-3 text-red-400">if (!user.hasLicense) return false;</p>
                  <p className="pl-3 text-red-400">if (user.isBlacklisted) return false;</p>
                  <p className="pl-3 text-red-400">if (!user.hasCreditCard {'&&'}</p>
                  <p className="pl-6 text-red-400">!user.hasDeposit) return false;</p>
                  <p className="pl-3">return true;</p>
                  <p>{'}'}</p>
                  <p className="text-red-400/60 mt-2">// Hard to reuse, test, or extend</p>
                </div>
              </div>
              <div className="bg-quest-bg rounded-lg p-4 border border-green-500/20">
                <h4 className="text-xs font-semibold text-green-400 mb-3">After: Specification Pattern</h4>
                <div className="font-mono text-[10px] text-quest-muted space-y-0.5">
                  <p>const canRentCar =</p>
                  <p className="pl-3 text-sky-400">isEligibleDriver</p>
                  <p className="pl-5 text-green-400">.and(isNotBlacklisted)</p>
                  <p className="pl-5 text-green-400">.and(</p>
                  <p className="pl-7 text-purple-400">hasCreditCard.or(hasDeposit)</p>
                  <p className="pl-5 text-green-400">);</p>
                  <p className="mt-1">canRentCar.isSatisfiedBy(user);</p>
                  <p className="text-green-400/60 mt-2">// Reusable, testable, composable</p>
                </div>
              </div>
            </div>

            {/* Interactive specification builder */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-sm mb-2">Interactive: Build a Specification</h3>
              <p className="text-xs text-quest-muted mb-4">
                Drag rules together to create a composite specification, then test it against users.
              </p>

              {/* Available specs */}
              <div className="mb-4">
                <p className="text-[10px] text-quest-muted uppercase tracking-wider mb-2">Available Rules</p>
                <div className="flex flex-wrap gap-2">
                  {availableSpecs.map(spec => {
                    const alreadyUsed = specNodes.some(n => n.specId === spec.id)
                    return (
                      <button
                        key={spec.id}
                        onClick={() => addSpec(spec.id)}
                        disabled={alreadyUsed || specNodes.length >= 5}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border
                          ${alreadyUsed
                            ? 'opacity-30 cursor-not-allowed border-white/5 text-quest-muted'
                            : `border-${spec.color}-500/30 text-${spec.color}-400 hover:bg-${spec.color}-500/10`
                          }`}
                      >
                        {spec.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Built specification */}
              <div className="mb-4">
                <p className="text-[10px] text-quest-muted uppercase tracking-wider mb-2">Your Specification</p>
                <div className="bg-quest-surface rounded-lg p-3 min-h-[48px]">
                  {specNodes.length === 0 ? (
                    <p className="text-xs text-quest-muted/40 italic">Click rules above to build your specification...</p>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      {specNodes.map((node, i) => {
                        const spec = availableSpecs.find(s => s.id === node.specId)
                        return (
                          <div key={i} className="flex items-center gap-1">
                            {node.combinator && (
                              <button
                                onClick={() => toggleCombinator(i)}
                                className="px-2 py-0.5 rounded text-[10px] font-bold bg-quest-bg border border-white/10 hover:border-white/30 transition-all"
                              >
                                {node.combinator}
                              </button>
                            )}
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono border
                                ${node.negate ? 'border-red-500/30 bg-red-500/10' : `border-${spec.color}-500/30 bg-${spec.color}-500/10`}`}
                            >
                              {node.negate && <span className="text-red-400 font-bold">NOT</span>}
                              <span className={node.negate ? 'text-red-300 line-through' : `text-${spec.color}-400`}>
                                {spec.label}
                              </span>
                              <button
                                onClick={() => toggleNegate(i)}
                                className="ml-1 text-quest-muted hover:text-yellow-400 transition-colors"
                                title="Toggle NOT"
                              >
                                <Ban size={10} />
                              </button>
                              <button
                                onClick={() => removeSpec(i)}
                                className="text-quest-muted hover:text-red-400 transition-colors"
                                title="Remove"
                              >
                                <XSquare size={10} />
                              </button>
                            </motion.div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Evaluate button */}
              <button
                onClick={evaluateSpecs}
                disabled={specNodes.length === 0}
                className="px-4 py-2 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-all disabled:opacity-30 mb-4"
              >
                Evaluate Against Users
              </button>

              {/* Results */}
              <AnimatePresence>
                {specResults && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="grid grid-cols-5 gap-2">
                      {specResults.map((r, i) => (
                        <motion.div
                          key={r.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`rounded-lg p-3 text-center border
                            ${r.pass
                              ? 'bg-green-500/10 border-green-500/30'
                              : 'bg-red-500/10 border-red-500/30'
                            }`}
                        >
                          <p className="text-xs font-medium mb-1">{r.name}</p>
                          {r.pass
                            ? <CheckSquare size={16} className="mx-auto text-green-400" />
                            : <XSquare size={16} className="mx-auto text-red-400" />
                          }
                          <p className="text-[10px] mt-1 text-quest-muted">{r.pass ? 'PASS' : 'FAIL'}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* User details reference */}
                    <div className="mt-3 bg-quest-surface rounded-lg p-3">
                      <p className="text-[10px] text-quest-muted uppercase tracking-wider mb-2">User Details</p>
                      <div className="grid grid-cols-5 gap-2 text-[10px] text-quest-muted">
                        {testUsers.map(u => (
                          <div key={u.name} className="space-y-0.5">
                            <p className="font-medium text-quest-text">{u.name}</p>
                            <p>age: {u.age}</p>
                            <p>license: {u.hasLicense ? 'Y' : 'N'}</p>
                            <p>banned: {u.isBanned ? 'Y' : 'N'}</p>
                            <p>credit: {u.creditScore}</p>
                            <p>verified: {u.isVerified ? 'Y' : 'N'}</p>
                            <p>premium: {u.isPremium ? 'Y' : 'N'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DeepDive id="spec-pattern-ddd" title="Specification Pattern in Domain-Driven Design" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Origin:</strong> The Specification pattern was formalized by
                  Eric Evans and Martin Fowler in the context of{' '}
                  <strong className="text-quest-text">Domain-Driven Design (DDD)</strong>. It's one of the key
                  building blocks for expressing complex domain rules.
                </p>
                <p>
                  <strong className="text-quest-text">Three Uses:</strong> Specifications serve three purposes:
                  (1) <em>Validation</em> — does this object satisfy the rule?
                  (2) <em>Selection</em> — filter a collection to matching objects.
                  (3) <em>Construction</em> — guide building an object that satisfies the rule.
                </p>
                <p>
                  <strong className="text-quest-text">Database Integration:</strong> In real systems, specifications
                  often translate to SQL WHERE clauses or ORM query builders. A
                  <code className="font-mono text-xs"> PremiumUserSpec</code> might generate
                  <code className="font-mono text-xs"> WHERE tier = 'premium' AND active = true</code>.
                  This keeps your domain logic in one place while still being database-efficient.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Composite Specifications
                <ChevronDown size={18} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: COMPOSITE SPECIFICATIONS ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CheckSquare className="text-green-400" />
              Composite Specifications
            </h2>

            <p className="text-quest-muted mb-6">
              Specifications become truly powerful when you compose them like building blocks.
              Each{' '}
              <Term
                word="Composite Specification"
                definition="A specification built by combining simpler specifications using logical operators (AND, OR, NOT). For example: 'IsEligible AND HasPayment AND NOT IsBlacklisted'. Each part is independently testable and reusable."
                onLearn={learnTerm}
              />{' '}
              is a tree of AND / OR / NOT nodes wrapping leaf specifications.
              You can reuse the same leaf specs across completely different business rules.
            </p>

            {/* Composite tree visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-sm mb-4">Specification Tree: CanRentCar</h3>
              <p className="text-xs text-quest-muted mb-4">
                Hover over each node to see how it evaluates. The tree composes simple checks into a complex business rule.
              </p>

              {/* Root AND */}
              <div className="flex flex-col items-center">
                <motion.div
                  onMouseEnter={() => setCompositeHighlight('root')}
                  onMouseLeave={() => setCompositeHighlight(null)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold mb-2 cursor-pointer transition-all
                    ${compositeHighlight === 'root'
                      ? 'bg-green-500/20 border-green-500/50 text-green-400'
                      : 'bg-quest-surface border-white/10 text-quest-text'
                    }`}
                >
                  AND: CanRentCar
                </motion.div>
                {compositeHighlight === 'root' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-green-400 mb-2"
                  >
                    All three children must be true = true AND true AND true = TRUE
                  </motion.p>
                )}

                {/* Connector lines */}
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-start gap-8 relative">
                  {/* Horizontal connector */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-80px)] h-px bg-white/20" />

                  {/* Child: IsEligibleDriver (AND) */}
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-white/20" />
                    <motion.div
                      onMouseEnter={() => setCompositeHighlight('eligible')}
                      onMouseLeave={() => setCompositeHighlight(null)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium mb-2 cursor-pointer transition-all
                        ${compositeHighlight === 'eligible'
                          ? 'bg-sky-500/20 border-sky-500/50 text-sky-400'
                          : 'bg-quest-surface border-white/10 text-quest-text'
                        }`}
                    >
                      AND: IsEligibleDriver
                    </motion.div>
                    {compositeHighlight === 'eligible' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-sky-400 mb-1"
                      >
                        age &gt;= 21 AND hasLicense = true AND true = TRUE
                      </motion.p>
                    )}
                    <div className="flex gap-3 mt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-px h-3 bg-white/10" />
                        <div className="px-2 py-1 rounded bg-green-500/15 border border-green-500/30 text-[10px] text-green-400 font-mono">
                          age &gt;= 21 <span className="text-green-300">T</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-px h-3 bg-white/10" />
                        <div className="px-2 py-1 rounded bg-green-500/15 border border-green-500/30 text-[10px] text-green-400 font-mono">
                          hasLicense <span className="text-green-300">T</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Child: NOT IsBlacklisted */}
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-white/20" />
                    <motion.div
                      onMouseEnter={() => setCompositeHighlight('notblack')}
                      onMouseLeave={() => setCompositeHighlight(null)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium mb-2 cursor-pointer transition-all
                        ${compositeHighlight === 'notblack'
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-quest-surface border-white/10 text-quest-text'
                        }`}
                    >
                      NOT: IsBlacklisted
                    </motion.div>
                    {compositeHighlight === 'notblack' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-red-400 mb-1"
                      >
                        NOT(false) = TRUE
                      </motion.p>
                    )}
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-px h-3 bg-white/10" />
                      <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-[10px] text-red-400 font-mono">
                        isBlacklisted <span className="text-green-300">F</span>
                      </div>
                    </div>
                  </div>

                  {/* Child: OR HasPayment */}
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 bg-white/20" />
                    <motion.div
                      onMouseEnter={() => setCompositeHighlight('payment')}
                      onMouseLeave={() => setCompositeHighlight(null)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium mb-2 cursor-pointer transition-all
                        ${compositeHighlight === 'payment'
                          ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                          : 'bg-quest-surface border-white/10 text-quest-text'
                        }`}
                    >
                      OR: HasPayment
                    </motion.div>
                    {compositeHighlight === 'payment' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-purple-400 mb-1"
                      >
                        hasCreditCard OR hasDeposit = true OR false = TRUE
                      </motion.p>
                    )}
                    <div className="flex gap-3 mt-1">
                      <div className="flex flex-col items-center">
                        <div className="w-px h-3 bg-white/10" />
                        <div className="px-2 py-1 rounded bg-green-500/15 border border-green-500/30 text-[10px] text-green-400 font-mono">
                          hasCreditCard <span className="text-green-300">T</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-px h-3 bg-white/10" />
                        <div className="px-2 py-1 rounded bg-red-500/10 border border-red-500/30 text-[10px] text-red-400 font-mono">
                          hasDeposit <span className="text-red-300">F</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Building blocks analogy */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Specifications as Building Blocks</h4>
              <p className="text-xs text-quest-muted mb-4">
                The same leaf specifications can be reused in completely different composite rules:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-quest-bg rounded-lg p-3 border border-sky-500/20">
                  <p className="text-xs font-medium text-sky-400 mb-2">CanRentCar</p>
                  <div className="font-mono text-[10px] text-quest-muted">
                    <span className="text-green-400">age &gt;= 21</span>
                    <span className="text-white/40"> AND </span>
                    <span className="text-green-400">hasLicense</span>
                    <span className="text-white/40"> AND NOT </span>
                    <span className="text-red-400">isBlacklisted</span>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3 border border-purple-500/20">
                  <p className="text-xs font-medium text-purple-400 mb-2">CanGetLoan</p>
                  <div className="font-mono text-[10px] text-quest-muted">
                    <span className="text-green-400">age &gt;= 18</span>
                    <span className="text-white/40"> AND </span>
                    <span className="text-green-400">creditScore &gt; 600</span>
                    <span className="text-white/40"> AND NOT </span>
                    <span className="text-red-400">isBlacklisted</span>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3 border border-green-500/20">
                  <p className="text-xs font-medium text-green-400 mb-2">CanAccessPremium</p>
                  <div className="font-mono text-[10px] text-quest-muted">
                    <span className="text-green-400">isPremium</span>
                    <span className="text-white/40"> AND </span>
                    <span className="text-green-400">isVerified</span>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3 border border-orange-500/20">
                  <p className="text-xs font-medium text-orange-400 mb-2">NeedsReview</p>
                  <div className="font-mono text-[10px] text-quest-muted">
                    <span className="text-red-400">NOT isVerified</span>
                    <span className="text-white/40"> OR </span>
                    <span className="text-orange-400">(age &lt; 18 AND isPremium)</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-quest-muted mt-3 italic">
                Notice how "isBlacklisted", "age &gt;= 18", "isVerified", and "isPremium" appear in multiple rules.
                Each is written once, tested once, reused everywhere.
              </p>
            </div>

            {/* Implementation code */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Implementation Skeleton</h4>
              <div className="font-mono text-[10px] text-quest-muted leading-relaxed space-y-0.5">
                <p className="text-sky-400">class Specification {'{'}</p>
                <p className="pl-3">isSatisfiedBy(candidate) {'{ throw "abstract" }'}</p>
                <p className="pl-3 text-green-400">and(other) {'{ return new AndSpec(this, other) }'}</p>
                <p className="pl-3 text-purple-400">or(other)  {'{ return new OrSpec(this, other) }'}</p>
                <p className="pl-3 text-red-400">not()      {'{ return new NotSpec(this) }'}</p>
                <p className="text-sky-400">{'}'}</p>
                <p className="mt-2 text-green-400">class AndSpec extends Specification {'{'}</p>
                <p className="pl-3">constructor(a, b) {'{ this.a = a; this.b = b }'}</p>
                <p className="pl-3">isSatisfiedBy(c) {'{ return this.a.isSatisfiedBy(c) && this.b.isSatisfiedBy(c) }'}</p>
                <p className="text-green-400">{'}'}</p>
                <p className="mt-2 text-purple-400">class OrSpec extends Specification {'{'}</p>
                <p className="pl-3">constructor(a, b) {'{ this.a = a; this.b = b }'}</p>
                <p className="pl-3">isSatisfiedBy(c) {'{ return this.a.isSatisfiedBy(c) || this.b.isSatisfiedBy(c) }'}</p>
                <p className="text-purple-400">{'}'}</p>
                <p className="mt-2 text-red-400">class NotSpec extends Specification {'{'}</p>
                <p className="pl-3">constructor(s) {'{ this.spec = s }'}</p>
                <p className="pl-3">isSatisfiedBy(c) {'{ return !this.spec.isSatisfiedBy(c) }'}</p>
                <p className="text-red-400">{'}'}</p>
              </div>
            </div>

            <DeepDive id="spec-real-world" title="Real-World Specification Patterns" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">E-Commerce:</strong> Product filtering on sites like Amazon
                  is specification pattern in action. "Category = Electronics AND Price &lt; $500 AND Rating &gt;= 4 stars
                  AND Prime eligible" — each filter is a specification, combined with AND.
                </p>
                <p>
                  <strong className="text-quest-text">Authorization Systems:</strong> Access control rules like
                  "User has role ADMIN OR (has role EDITOR AND owns the resource)" are naturally expressed as
                  composite specifications. Each policy check is a leaf spec.
                </p>
                <p>
                  <strong className="text-quest-text">Validation Frameworks:</strong> Libraries like FluentValidation (.NET)
                  and Joi (JavaScript) use specification-like patterns. Each validation rule is a reusable spec:
                  <code className="font-mono text-xs"> string().min(3).max(100).email()</code> chains specs together.
                </p>
                <p>
                  <strong className="text-quest-text">Performance Note:</strong> For database queries, specifications
                  can generate WHERE clauses instead of fetching all data and filtering in memory.
                  This is called the "deferred execution" approach, used heavily in LINQ (C#) and QueryDSL (Java).
                </p>
              </div>
            </DeepDive>

            <DeepDive id="null-and-spec-together" title="Combining Null Object with Specification" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  These two patterns work beautifully together. Consider a discount system:
                </p>
                <p>
                  <strong className="text-quest-text">Specification:</strong> Determines IF a user qualifies for a discount.
                  <code className="font-mono text-xs"> isPremium.and(hasActiveSubscription).and(orderAbove50)</code>
                </p>
                <p>
                  <strong className="text-quest-text">Null Object:</strong> If no discount applies, return a
                  <code className="font-mono text-xs"> NullDiscount</code> that has
                  <code className="font-mono text-xs"> getAmount() = 0</code> and
                  <code className="font-mono text-xs"> getLabel() = ""</code>.
                  The calling code never checks for null — it just applies the discount (which happens to be zero).
                </p>
                <p>
                  Together they eliminate both null checks AND tangled if-else logic,
                  producing clean, declarative business rules.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronDown size={18} className="rotate-90" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ChevronDown size={18} className="-rotate-90" />
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
              Null Object and Specification are patterns that tame complexity. Let's verify your understanding.
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
                <h3 className="text-xl font-bold mb-2">Level 43 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Null Object and Specification patterns. No more null check
                  explosions, no more tangled if-else chains. Your business rules are composable
                  building blocks and your code handles absence gracefully.
                </p>
                <p className="text-sm text-sky-400">
                  Null is not nothing — it's a design choice. And now you have better choices.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

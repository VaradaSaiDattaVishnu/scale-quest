import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle, Sparkles,
  Scissors, Repeat, AlertTriangle, Code
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

/* ── Code Smell Snippets ── */

const codeSmells = [
  {
    id: 'smell-1',
    title: 'User Validation',
    code: `function validateEmail(email) {
  const re = /^[^@]+@[^@]+\\.[^@]+$/
  if (!re.test(email)) return false
  return true
}

function validateRegistration(email) {
  const re = /^[^@]+@[^@]+\\.[^@]+$/
  if (!re.test(email)) return false
  return true
}

function validateContactForm(email) {
  const re = /^[^@]+@[^@]+\\.[^@]+$/
  if (!re.test(email)) return false
  return true
}`,
    violation: 'DRY',
    explanation: 'The same email validation regex and logic is duplicated in three places. If the regex needs to change, you must update all three. Extract it into a single reusable function.',
  },
  {
    id: 'smell-2',
    title: 'Config Manager',
    code: `class ConfigurationManagerFactoryProvider {
  constructor() {
    this.strategyResolver =
      new StrategyResolverFactory()
    this.configAdapter =
      new ConfigAdapterBridgeProxy()
    this.validator =
      new ConfigValidationChainBuilder()
  }

  getConfig(key) {
    return this.strategyResolver
      .resolve(this.configAdapter
        .adapt(this.validator
          .validate(key)))
  }
}

// All it does:
// return process.env[key] || defaults[key]`,
    violation: 'KISS',
    explanation: 'A chain of Factory, Bridge, Proxy, and Builder patterns just to read a config value. A simple function or object lookup would do the job. This is complexity for its own sake.',
  },
  {
    id: 'smell-3',
    title: 'Future-Proof API',
    code: `// "We might need these someday"
app.get('/api/v1/users', handler)
app.get('/api/v2/users', handler)
app.get('/api/v3/users', handler)

// Plugin system (no plugins exist)
class PluginRegistry { /* 200 lines */ }
class PluginLoader { /* 150 lines */ }
class PluginSandbox { /* 300 lines */ }

// Multi-tenancy (single customer)
class TenantRouter { /* 180 lines */ }
class TenantIsolation { /* 250 lines */ }`,
    violation: 'YAGNI',
    explanation: 'Three API versions when none have shipped. A 650-line plugin system with zero plugins. Multi-tenant architecture for a single customer. All of this code costs maintenance time for features nobody asked for.',
  },
  {
    id: 'smell-4',
    title: 'Report Generator',
    code: `// Getting the manager's manager's budget limit
function canApprove(employee, amount) {
  return employee
    .getDepartment()
    .getManager()
    .getBudgetAccount()
    .getApprovalLimit() >= amount
}`,
    violation: 'Law of Demeter',
    explanation: 'This function reaches through four levels of objects. It knows the internal structure of Department, Manager, and BudgetAccount. If any intermediate object changes, this code breaks. The function should only talk to its immediate collaborators.',
  },
  {
    id: 'smell-5',
    title: 'Rendering Engine',
    code: `class Component {
  render() { /* base render */ }
  handleClick() { /* base click */ }
  fetchData() { /* base fetch */ }
  validate() { /* base validate */ }
  serialize() { /* base serialize */ }
  log() { /* base log */ }
}

class Button extends Component {
  // Inherits fetchData, validate,
  // serialize, log... but only needs
  // render and handleClick
}

class DataTable extends Component {
  // Needs fetchData and render but
  // inherits handleClick, validate,
  // serialize, log...
}`,
    violation: 'Composition over Inheritance',
    explanation: 'A Button inherits data-fetching, validation, and serialization methods it will never use. Instead, create small focused behaviors (Renderable, Clickable, Fetchable) and compose only what each component needs.',
  },
]

/* ── Refactoring Exercise Data ── */

const refactoringExercise = {
  before: `function calculateShippingUS(weight, distance) {
  let cost = weight * 0.5
  if (distance > 1000) cost += 15
  if (distance > 3000) cost += 25
  if (weight > 50) cost *= 1.5
  cost += 4.99 // handling fee
  return Math.round(cost * 100) / 100
}

function calculateShippingEU(weight, distance) {
  let cost = weight * 0.5
  if (distance > 1000) cost += 15
  if (distance > 3000) cost += 25
  if (weight > 50) cost *= 1.5
  cost += 6.99 // handling fee
  cost *= 1.2  // customs surcharge
  return Math.round(cost * 100) / 100
}

function calculateShippingASIA(weight, distance) {
  let cost = weight * 0.5
  if (distance > 1000) cost += 15
  if (distance > 3000) cost += 25
  if (weight > 50) cost *= 1.5
  cost += 8.99 // handling fee
  cost *= 1.35 // customs surcharge
  return Math.round(cost * 100) / 100
}`,
  after: `function calculateBaseShipping(weight, distance) {
  let cost = weight * 0.5
  if (distance > 1000) cost += 15
  if (distance > 3000) cost += 25
  if (weight > 50) cost *= 1.5
  return cost
}

const REGION_CONFIG = {
  US:   { handlingFee: 4.99, customsRate: 1.0  },
  EU:   { handlingFee: 6.99, customsRate: 1.2  },
  ASIA: { handlingFee: 8.99, customsRate: 1.35 },
}

function calculateShipping(weight, distance, region) {
  const base = calculateBaseShipping(weight, distance)
  const { handlingFee, customsRate } = REGION_CONFIG[region]
  const total = (base + handlingFee) * customsRate
  return Math.round(total * 100) / 100
}`,
  improvements: [
    'Extracted shared calculation logic into one function',
    'Region-specific values moved to a config object',
    'Single entry point: calculateShipping(weight, distance, region)',
    'Adding a new region = one config entry, not an entire new function',
    'Bug fixes only need to happen in one place',
  ],
}

/* ── Over-engineering Meter Data ── */

const overEngineeringScenarios = [
  {
    id: 'oe-1',
    task: 'Toggle a dark mode preference for a personal blog',
    solutions: [
      {
        label: 'Simple',
        rating: 1,
        code: `const [dark, setDark] = useState(false)

<button onClick={() => setDark(!dark)}>
  Toggle Theme
</button>`,
        verdict: 'Just right',
        color: 'text-quest-success',
      },
      {
        label: 'Over-engineered',
        rating: 5,
        code: `class ThemeManagerSingleton {
  static instance = null
  constructor() {
    this.store = new ThemeReduxStore()
    this.observer = new ThemeObserver()
    this.mediator = new ThemeMediator()
    this.persistence =
      new ThemePersistenceAdapter(
        new LocalStorageStrategy(),
        new CookieStrategy(),
        new ServerSyncStrategy()
      )
  }
  static getInstance() { /* ... */ }
}`,
        verdict: 'Way too much',
        color: 'text-quest-danger',
      },
    ],
  },
  {
    id: 'oe-2',
    task: 'Parse a CSV file with 3 columns for a one-time data migration',
    solutions: [
      {
        label: 'Simple',
        rating: 1,
        code: `const rows = csv.split('\\n').map(
  line => line.split(',')
)`,
        verdict: 'Perfect for the task',
        color: 'text-quest-success',
      },
      {
        label: 'Over-engineered',
        rating: 5,
        code: `class CSVParserFactory {
  create(dialect) {
    return new CSVParser(
      new Lexer(dialect),
      new TokenStream(),
      new ASTBuilder(),
      new SemanticValidator(),
      new SchemaInferenceEngine(),
      new StreamingBufferManager()
    )
  }
}`,
        verdict: 'Absurdly complex',
        color: 'text-quest-danger',
      },
    ],
  },
  {
    id: 'oe-3',
    task: 'Validate that a required form field is not empty',
    solutions: [
      {
        label: 'Simple',
        rating: 1,
        code: `if (!value.trim()) {
  setError('This field is required')
}`,
        verdict: 'Clean and obvious',
        color: 'text-quest-success',
      },
      {
        label: 'Over-engineered',
        rating: 4,
        code: `const schema = z.object({
  field: z.string()
    .min(1, 'Required')
    .transform(v => v.trim())
    .pipe(z.string().min(1))
    .refine(v => v !== '', {
      message: 'Required',
      path: ['field'],
    })
})
const result = schema.safeParse({ field: value })
// ... 20 more lines of error mapping`,
        verdict: 'Over-abstracted for one field',
        color: 'text-quest-warning',
      },
    ],
  },
]

/* ── Composition vs Inheritance Data ── */

const compositionVsInheritance = [
  {
    id: 'cvi-1',
    scenario: 'You need a FlyingFish that can both swim and fly',
    inheritance: {
      problem: 'Fish extends Animal (has swim). Bird extends Animal (has fly). FlyingFish cannot extend both Fish and Bird -- no multiple inheritance in most languages.',
      code: `class Animal { move() {} }
class Fish extends Animal { swim() {} }
class Bird extends Animal { fly() {} }
// FlyingFish extends... Fish AND Bird?
// Not possible in most languages!`,
    },
    composition: {
      solution: 'Compose behaviors. FlyingFish HAS swimming ability and HAS flying ability.',
      code: `const swim = (state) => ({
  swim: () => console.log(state.name + ' swims')
})

const fly = (state) => ({
  fly: () => console.log(state.name + ' flies')
})

function createFlyingFish(name) {
  const state = { name }
  return { ...swim(state), ...fly(state) }
}`,
    },
    useComposition: true,
  },
  {
    id: 'cvi-2',
    scenario: 'Modeling a strict "is-a" hierarchy: Cat IS an Animal',
    inheritance: {
      problem: 'This is actually a good fit for inheritance. A Cat truly IS an Animal. The relationship is stable and unlikely to change.',
      code: `class Animal {
  breathe() { /* all animals breathe */ }
  eat() { /* all animals eat */ }
}

class Cat extends Animal {
  purr() { /* cats purr */ }
  meow() { /* cats meow */ }
}`,
    },
    composition: {
      solution: 'Composition works too, but adds indirection for a genuinely hierarchical relationship.',
      code: `function createCat(name) {
  const animal = createAnimal(name)
  return {
    ...animal,
    purr: () => { /* ... */ },
    meow: () => { /* ... */ },
  }
}`,
    },
    useComposition: false,
  },
  {
    id: 'cvi-3',
    scenario: 'A notification system: email, SMS, push, and Slack -- each with retry, rate-limit, and logging options',
    inheritance: {
      problem: 'You get an explosion of subclasses: EmailWithRetry, EmailWithRetryAndRateLimit, SMSWithLogging, SMSWithRetryAndLogging...',
      code: `class Notification { send() {} }
class EmailNotification extends Notification {}
class EmailWithRetry extends EmailNotification {}
class EmailWithRetryAndRateLimit
  extends EmailWithRetry {}
// Explosion: 4 channels x 3 options
// = up to 32 combinations!`,
    },
    composition: {
      solution: 'Compose channel with behaviors using decorators or mixins.',
      code: `function createNotifier(channel, options) {
  let send = channel.send

  if (options.retry)
    send = withRetry(send, options.retryCount)
  if (options.rateLimit)
    send = withRateLimit(send, options.rate)
  if (options.logging)
    send = withLogging(send)

  return { send }
}

// Any combination, no subclass needed
createNotifier(email, { retry: true, logging: true })
createNotifier(sms, { rateLimit: true })`,
    },
    useComposition: true,
  },
]

/* ── Quiz Questions ── */

const quizQuestions = [
  {
    id: 'q1',
    question: 'What does the DRY principle stand for, and what is its primary goal?',
    options: [
      { id: 'a', text: '"Don\'t Repeat Yourself" -- eliminate duplicated knowledge so changes only need to happen in one place', correct: true },
      { id: 'b', text: '"Don\'t Rewrite Yourself" -- never rewrite code once it is written' },
      { id: 'c', text: '"Don\'t Repeat Yourself" -- never have two functions that do similar things, even if the domain concepts differ' },
      { id: 'd', text: '"Data Redundancy Yields" -- always normalize your database schemas' },
    ],
  },
  {
    id: 'q2',
    question: 'A junior developer wraps a simple string concatenation in a Strategy pattern with a Factory and an Abstract Base Class. Which principle does this most clearly violate?',
    options: [
      { id: 'a', text: 'DRY -- the logic is repeated' },
      { id: 'b', text: 'KISS -- the simplest solution that works is the best', correct: true },
      { id: 'c', text: 'Law of Demeter -- it reaches through too many objects' },
      { id: 'd', text: 'Separation of Concerns -- concatenation and formatting are mixed' },
    ],
  },
  {
    id: 'q3',
    question: 'Your startup has one customer, but the team builds a multi-tenant architecture with per-tenant database sharding "because we might need it later." Which principle is violated?',
    options: [
      { id: 'a', text: 'DRY -- the sharding logic is duplicated' },
      { id: 'b', text: 'KISS -- the solution is too complex' },
      { id: 'c', text: 'YAGNI -- you are building for requirements that do not exist yet', correct: true },
      { id: 'd', text: 'Law of Demeter -- tenant objects are too tightly coupled' },
    ],
  },
  {
    id: 'q4',
    question: 'When should you prefer composition over inheritance?',
    options: [
      { id: 'a', text: 'Always, because inheritance is an anti-pattern' },
      { id: 'b', text: 'When you need to combine behaviors from multiple sources, or the relationship is "has-a" rather than "is-a"', correct: true },
      { id: 'c', text: 'Only in functional programming languages' },
      { id: 'd', text: 'When the class hierarchy is exactly two levels deep' },
    ],
  },
  {
    id: 'q5',
    question: 'Which code snippet violates the Law of Demeter?',
    options: [
      { id: 'a', text: 'user.getName()' },
      { id: 'b', text: 'user.getAddress().getCity().getZipCode()', correct: true },
      { id: 'c', text: 'this.logger.log(message)' },
      { id: 'd', text: 'calculateTotal(items)' },
    ],
  },
  {
    id: 'q6',
    question: 'A function handles HTTP parsing, business logic, database queries, and email sending. Which principle does this violate?',
    options: [
      { id: 'a', text: 'YAGNI' },
      { id: 'b', text: 'DRY' },
      { id: 'c', text: 'Separation of Concerns -- each responsibility should be in its own module', correct: true },
      { id: 'd', text: 'Composition over Inheritance' },
    ],
  },
]

/* ── Main Component ── */

export default function Level29({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Code smell detector state
  const [currentSmell, setCurrentSmell] = useState(0)
  const [smellGuesses, setSmellGuesses] = useState({})
  const [smellRevealed, setSmellRevealed] = useState({})

  // Refactoring exercise state
  const [showRefactored, setShowRefactored] = useState(false)

  // Over-engineering meter state
  const [oeRevealed, setOeRevealed] = useState({})

  // Composition vs Inheritance state
  const [cviExpanded, setCviExpanded] = useState({})

  const sections = ['intro', 'smells', 'refactor', 'overeng', 'composition', 'quiz']

  const handleSmellGuess = (smellId, guess) => {
    setSmellGuesses(prev => ({ ...prev, [smellId]: guess }))
    setSmellRevealed(prev => ({ ...prev, [smellId]: true }))
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const violationLabels = ['DRY', 'KISS', 'YAGNI', 'Law of Demeter', 'Composition over Inheritance', 'Separation of Concerns']

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              currentSection === i
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface text-quest-muted hover:text-white'
            }`}
          >
            {s === 'intro' && 'Principles'}
            {s === 'smells' && 'Code Smells'}
            {s === 'refactor' && 'Refactoring'}
            {s === 'overeng' && 'Over-engineering'}
            {s === 'composition' && 'Composition vs Inheritance'}
            {s === 'quiz' && 'Quiz'}
          </button>
        ))}
      </div>

      {/* ============ SECTION: INTRO / PRINCIPLES ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-quest-primary/20">
                <Sparkles size={28} className="text-quest-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Keep It Simple</h2>
                <p className="text-quest-muted">DRY, KISS, YAGNI & More</p>
              </div>
            </div>

            <div className="bg-quest-bg rounded-lg p-4 mb-6 border-l-4 border-quest-warning">
              <p className="text-quest-muted italic">
                "You built a framework when you needed a function. Let's learn when NOT to over-engineer."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              The most dangerous code is not the code that is wrong -- it is the code that is{' '}
              <Term word="unnecessarily complex" definition="Code that adds layers of abstraction, patterns, or features beyond what the current requirements demand." onLearn={learnTerm} />.
              Every extra abstraction is a tax on the next developer who reads it. Great engineers know when to
              add complexity and, more importantly, when to resist it.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-quest-bg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Repeat size={18} className="text-blue-400" />
                  <h3 className="font-bold text-blue-400">DRY</h3>
                </div>
                <p className="text-sm text-quest-muted">
                  <Term word="Don't Repeat Yourself" definition="Every piece of knowledge must have a single, unambiguous, authoritative representation within a system. Coined by Andy Hunt and Dave Thomas in The Pragmatic Programmer." onLearn={learnTerm} />{' '}
                  -- not just about code duplication, but about duplicated <em>knowledge</em>. If you change one place, you should not need to change another.
                </p>
              </div>

              <div className="bg-quest-bg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Scissors size={18} className="text-green-400" />
                  <h3 className="font-bold text-green-400">KISS</h3>
                </div>
                <p className="text-sm text-quest-muted">
                  <Term word="Keep It Simple, Stupid" definition="Most systems work best if they are kept simple rather than made complicated. Simplicity should be a key goal in design and unnecessary complexity should be avoided." onLearn={learnTerm} />{' '}
                  -- the simplest solution that solves the problem is the best solution. Complexity is the enemy of reliability.
                </p>
              </div>

              <div className="bg-quest-bg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-yellow-400" />
                  <h3 className="font-bold text-yellow-400">YAGNI</h3>
                </div>
                <p className="text-sm text-quest-muted">
                  <Term word="You Aren't Gonna Need It" definition="A principle from Extreme Programming that says you should not add functionality until it is actually needed. Predicted requirements are wrong more often than they are right." onLearn={learnTerm} />{' '}
                  -- do not build for imagined future requirements. They are almost always wrong, and the unused code still costs you in maintenance.
                </p>
              </div>

              <div className="bg-quest-bg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Code size={18} className="text-purple-400" />
                  <h3 className="font-bold text-purple-400">Composition over Inheritance</h3>
                </div>
                <p className="text-sm text-quest-muted">
                  <Term word="Composition over Inheritance" definition="A design principle that favors combining simple objects/functions to build complex behavior, rather than building class hierarchies. Gives greater flexibility and avoids fragile base class problems." onLearn={learnTerm} />{' '}
                  -- prefer assembling behaviors from small, focused pieces rather than building deep class hierarchies that are rigid and fragile.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-quest-bg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-rose-400" />
                  <h3 className="font-bold text-rose-400">Law of Demeter</h3>
                </div>
                <p className="text-sm text-quest-muted">
                  <Term word="Law of Demeter" definition="Also called the Principle of Least Knowledge. A method should only call methods on: itself, its parameters, objects it creates, and its direct components. No 'train wrecks' like a.getB().getC().doThing()." onLearn={learnTerm} />{' '}
                  -- also known as "don't talk to strangers." A function should only interact with its immediate collaborators, not reach through chains of objects.
                </p>
              </div>

              <div className="bg-quest-bg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Scissors size={18} className="text-cyan-400" />
                  <h3 className="font-bold text-cyan-400">Separation of Concerns</h3>
                </div>
                <p className="text-sm text-quest-muted">
                  <Term word="Separation of Concerns" definition="Each module or function should address a single concern. Mixing HTTP handling, business logic, database access, and notification sending into one function makes it impossible to test, reuse, or change independently." onLearn={learnTerm} />{' '}
                  -- each module should have one reason to change. Mixing unrelated responsibilities creates tangled, untestable code.
                </p>
              </div>
            </div>

            <DeepDive id="dry-traps" title="The DRY Trap: When DRY Goes Wrong" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                DRY is often misunderstood as "never have two lines of code that look similar." This leads to premature
                abstraction -- merging two things that happen to look the same but represent different domain concepts.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Wrong DRY:</strong> Your billing address validation and shipping address validation have
                similar-looking code, so you merge them into one function. Later, billing needs to allow PO boxes
                but shipping does not. Now you have a function full of <code>if (type === 'billing')</code> branches.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Right DRY:</strong> Your email validation regex appears in 5 places. That IS the same knowledge.
                Extract it.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Rule of thumb:</strong> If two pieces of code change for the <em>same reason</em>, they should be
                unified. If they change for <em>different reasons</em>, duplication is acceptable -- even preferable.
              </p>
            </DeepDive>

            <DeepDive id="kiss-culture" title="Building a KISS Culture" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Simplicity is not the absence of features. It is the absence of unnecessary complexity. Here is how
                teams foster it:
              </p>
              <ul className="text-sm text-quest-muted space-y-2 list-disc list-inside">
                <li><strong>Code reviews that ask "is there a simpler way?"</strong> -- not just "does it work?"</li>
                <li><strong>Delete code days</strong> -- regularly remove unused features, dead code, and vestigial abstractions.</li>
                <li><strong>Junior-developer readability test</strong> -- if a new hire cannot understand the code in 10 minutes, it might be too complex.</li>
                <li><strong>Reward deletion</strong> -- celebrate PRs that remove more lines than they add.</li>
                <li><strong>Complexity budgets</strong> -- each team has a cyclomatic complexity limit for new code.</li>
              </ul>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Detect Code Smells <Sparkles size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: CODE SMELL DETECTOR ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="text-yellow-400" />
              Code Smell Detector
            </h2>
            <p className="text-quest-muted mb-6">
              Read each code snippet and identify which principle it violates. Click a principle to lock in your guess,
              then see the explanation.
            </p>

            {/* Smell Navigation */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {codeSmells.map((smell, idx) => (
                <button
                  key={smell.id}
                  onClick={() => setCurrentSmell(idx)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    currentSmell === idx
                      ? 'bg-quest-secondary text-white'
                      : smellRevealed[smell.id]
                        ? smellGuesses[smell.id] === smell.violation
                          ? 'bg-quest-success/20 text-quest-success'
                          : 'bg-quest-danger/20 text-quest-danger'
                        : 'bg-quest-surface text-quest-muted hover:text-white'
                  }`}
                >
                  {idx + 1}. {smell.title}
                </button>
              ))}
            </div>

            {/* Current Smell */}
            {(() => {
              const smell = codeSmells[currentSmell]
              const guessed = smellGuesses[smell.id]
              const revealed = smellRevealed[smell.id]
              const correct = guessed === smell.violation

              return (
                <div key={smell.id}>
                  <div className="bg-quest-bg rounded-lg p-4 mb-4 border border-white/10">
                    <h3 className="font-bold mb-3 text-quest-primary">{smell.title}</h3>
                    <pre className="text-sm text-quest-muted overflow-x-auto whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-4">
                      {smell.code}
                    </pre>
                  </div>

                  {!revealed ? (
                    <div>
                      <p className="text-sm font-medium mb-3">Which principle does this code violate?</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {violationLabels.map(label => (
                          <button
                            key={label}
                            onClick={() => handleSmellGuess(smell.id, label)}
                            className="px-3 py-2 rounded-lg border border-white/20 text-sm hover:border-quest-primary hover:bg-quest-primary/10 transition-all"
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg border ${
                        correct
                          ? 'bg-quest-success/10 border-quest-success/30'
                          : 'bg-quest-danger/10 border-quest-danger/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {correct ? (
                          <CheckCircle size={18} className="text-quest-success" />
                        ) : (
                          <AlertTriangle size={18} className="text-quest-danger" />
                        )}
                        <span className="font-bold">
                          {correct ? 'Correct!' : `Not quite. The answer is: ${smell.violation}`}
                        </span>
                      </div>
                      <p className="text-sm text-quest-muted">{smell.explanation}</p>
                    </motion.div>
                  )}

                  {/* Navigate between smells */}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentSmell(Math.max(0, currentSmell - 1))}
                      disabled={currentSmell === 0}
                      className="btn-secondary flex items-center gap-2 disabled:opacity-30"
                    >
                      <Sparkles size={18} className="rotate-180" /> Previous
                    </button>
                    {currentSmell < codeSmells.length - 1 ? (
                      <button
                        onClick={() => setCurrentSmell(currentSmell + 1)}
                        className="btn-primary flex items-center gap-2"
                      >
                        Next Smell <Sparkles size={18} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentSection(2)}
                        className="btn-primary flex items-center gap-2"
                      >
                        Refactoring Exercise <Scissors size={18} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: REFACTORING EXERCISE ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Scissors className="text-green-400" />
              Refactoring Exercise: Applying DRY
            </h2>
            <p className="text-quest-muted mb-6">
              Here is a real-world example of duplicated shipping calculation code. Study the "before" version,
              then reveal the DRY refactored version.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Before */}
              <div>
                <h3 className="font-bold text-quest-danger mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} /> Before (WET Code)
                </h3>
                <pre className="text-xs text-quest-muted overflow-x-auto whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-4 border border-quest-danger/30 max-h-96 overflow-y-auto">
                  {refactoringExercise.before}
                </pre>
                <div className="mt-2 bg-quest-danger/10 rounded-lg p-3 border border-quest-danger/20">
                  <p className="text-xs text-quest-muted">
                    <strong className="text-quest-danger">Problems:</strong> The base calculation
                    (weight, distance, heavy surcharge) is copied 3 times. A bug fix in one function
                    might be missed in the others. Adding a new region means copying the entire function again.
                  </p>
                </div>
              </div>

              {/* After */}
              <div>
                <h3 className="font-bold text-quest-success mb-2 flex items-center gap-2">
                  <CheckCircle size={16} /> After (DRY Code)
                </h3>
                {!showRefactored ? (
                  <div className="bg-black/30 rounded-lg p-4 border border-white/10 flex flex-col items-center justify-center min-h-[300px]">
                    <Sparkles size={40} className="text-quest-muted mb-4 opacity-30" />
                    <p className="text-quest-muted text-sm mb-4">Think about how you would refactor this code.</p>
                    <button
                      onClick={() => setShowRefactored(true)}
                      className="btn-primary"
                    >
                      Reveal Refactored Version
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <pre className="text-xs text-quest-muted overflow-x-auto whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-4 border border-quest-success/30 max-h-96 overflow-y-auto">
                      {refactoringExercise.after}
                    </pre>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Improvements List */}
            <AnimatePresence>
              {showRefactored && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-6 bg-quest-success/10 rounded-lg p-4 border border-quest-success/30"
                >
                  <h4 className="font-bold text-quest-success mb-3">What improved:</h4>
                  <ul className="space-y-2">
                    {refactoringExercise.improvements.map((imp, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.15 }}
                        className="flex items-start gap-2 text-sm text-quest-muted"
                      >
                        <CheckCircle size={16} className="text-quest-success mt-0.5 flex-shrink-0" />
                        {imp}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <DeepDive id="refactoring-patterns" title="Common Refactoring Patterns" onRead={markDeepDiveRead}>
              <div className="space-y-3">
                <p className="text-sm text-quest-muted">
                  <strong>Extract Function:</strong> Pull duplicated logic into a named function. The most common and
                  most powerful refactoring.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Parameterize Function:</strong> Two functions that differ only in a value? Merge them with a parameter
                  (like our region example above).
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Replace Conditional with Polymorphism:</strong> When you have switch/if chains that select behavior,
                  consider using polymorphism or a strategy map instead.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Introduce Parameter Object:</strong> When several functions pass the same cluster of arguments,
                  group them into an object. Reduces coupling and makes the API cleaner.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Rule of Three:</strong> Do not abstract on the first duplication. Wait until you see the same
                  pattern three times. By then, you understand the real abstraction.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <Sparkles size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Over-engineering Meter <AlertTriangle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: OVER-ENGINEERING METER ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <AlertTriangle className="text-orange-400" />
              Over-engineering Meter
            </h2>
            <p className="text-quest-muted mb-6">
              For each task, compare the simple solution against the over-engineered one. Click "Reveal Verdict"
              to see the rating. Ask yourself: does the complexity match the problem?
            </p>

            <div className="space-y-8">
              {overEngineeringScenarios.map((scenario) => (
                <div key={scenario.id} className="bg-quest-bg rounded-lg p-5 border border-white/10">
                  <h3 className="font-bold mb-1 text-quest-primary">{scenario.task}</h3>
                  <p className="text-xs text-quest-muted mb-4">Compare the two approaches below.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {scenario.solutions.map((sol) => (
                      <div key={sol.label} className="bg-black/20 rounded-lg p-4 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold">{sol.label}</span>
                          {oeRevealed[scenario.id] && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`text-xs font-bold ${sol.color}`}
                            >
                              {sol.verdict}
                            </motion.span>
                          )}
                        </div>
                        <pre className="text-xs text-quest-muted overflow-x-auto whitespace-pre-wrap font-mono">
                          {sol.code}
                        </pre>
                      </div>
                    ))}
                  </div>

                  {/* Complexity meter */}
                  {oeRevealed[scenario.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-quest-muted whitespace-nowrap">Complexity:</span>
                        <div className="flex-1 bg-white/5 rounded-full h-3 overflow-hidden">
                          {scenario.solutions.map((sol, idx) => (
                            <motion.div
                              key={sol.label}
                              initial={{ width: 0 }}
                              animate={{ width: `${(sol.rating / 5) * 100}%` }}
                              transition={{ delay: idx * 0.3, duration: 0.6 }}
                              className={`h-3 rounded-full ${idx === 0 ? 'bg-quest-success' : 'bg-quest-danger'}`}
                              style={{ marginTop: idx === 0 ? 0 : 4 }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-quest-muted mt-1 px-1">
                        <span>Minimal</span>
                        <span>Astronaut Architecture</span>
                      </div>
                    </motion.div>
                  )}

                  {!oeRevealed[scenario.id] && (
                    <button
                      onClick={() => setOeRevealed(prev => ({ ...prev, [scenario.id]: true }))}
                      className="mt-4 btn-secondary text-sm"
                    >
                      Reveal Verdict
                    </button>
                  )}
                </div>
              ))}
            </div>

            <DeepDive id="yagni-cost" title="The True Cost of YAGNI Violations" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                A study at Microsoft found that features built "just in case" had these outcomes:
              </p>
              <ul className="text-sm text-quest-muted space-y-2 list-disc list-inside mb-3">
                <li>64% of features in software products are rarely or never used</li>
                <li>Speculative features take 3-5x longer to build than originally estimated</li>
                <li>Each unused feature still requires testing, documentation, and maintenance</li>
                <li>Unused abstractions confuse new team members and slow onboarding</li>
              </ul>
              <p className="text-sm text-quest-muted">
                <strong>The mantra:</strong> Build the simplest thing that could possibly work. When (not if) requirements
                change, refactor. Modern tools make refactoring cheap. Unused code is never cheap.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <Scissors size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Composition vs Inheritance <Code size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: COMPOSITION VS INHERITANCE ============ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Code className="text-purple-400" />
              Composition vs Inheritance
            </h2>
            <p className="text-quest-muted mb-6">
              Inheritance creates "is-a" relationships. Composition creates "has-a" relationships. Both have their
              place, but modern software overwhelmingly favors composition. Here is why.
            </p>

            <div className="space-y-6">
              {compositionVsInheritance.map((item) => {
                const expanded = cviExpanded[item.id]

                return (
                  <div key={item.id} className="bg-quest-bg rounded-lg border border-white/10 overflow-hidden">
                    <button
                      onClick={() => setCviExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="w-full p-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold">{item.scenario}</h3>
                          <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
                            item.useComposition
                              ? 'bg-purple-500/20 text-purple-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            Prefer: {item.useComposition ? 'Composition' : 'Inheritance'}
                          </span>
                        </div>
                        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {expanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                            {/* Inheritance side */}
                            <div>
                              <h4 className="text-sm font-bold text-blue-400 mb-2">Inheritance Approach</h4>
                              <p className="text-xs text-quest-muted mb-2">{item.inheritance.problem}</p>
                              <pre className="text-xs text-quest-muted overflow-x-auto whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-3">
                                {item.inheritance.code}
                              </pre>
                            </div>

                            {/* Composition side */}
                            <div>
                              <h4 className="text-sm font-bold text-purple-400 mb-2">Composition Approach</h4>
                              <p className="text-xs text-quest-muted mb-2">{item.composition.solution}</p>
                              <pre className="text-xs text-quest-muted overflow-x-auto whitespace-pre-wrap font-mono bg-black/30 rounded-lg p-3">
                                {item.composition.code}
                              </pre>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            <DeepDive id="composition-patterns" title="Composition Patterns in Practice" onRead={markDeepDiveRead}>
              <div className="space-y-3">
                <p className="text-sm text-quest-muted">
                  <strong>React Hooks:</strong> The ultimate composition example. Instead of extending a base component class,
                  you compose behavior with useState, useEffect, useCallback, and custom hooks. Each hook is a focused,
                  reusable piece of logic.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Middleware Pipelines:</strong> Express.js, Koa, and Redux all use function composition.
                  Each middleware is a small function that handles one concern (auth, logging, CORS) and passes control
                  to the next.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Go Interfaces:</strong> Go has no inheritance at all. Instead, you compose structs with
                  embedded types and satisfy interfaces implicitly. This encourages small, focused interfaces
                  (often just one method).
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>Rust Traits:</strong> Similar to Go interfaces, Rust uses traits for shared behavior
                  and generic composition. No class hierarchies needed.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="demeter-practical" title="Law of Demeter in Real Codebases" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                The Law of Demeter says a method M on object O should only call methods on:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside mb-3">
                <li>O itself</li>
                <li>M's parameters</li>
                <li>Objects M creates</li>
                <li>O's direct component objects</li>
              </ul>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Violation:</strong> <code>order.getCustomer().getAddress().getCity()</code> -- you are navigating
                through three objects. If Customer's structure changes, Order's code breaks.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Fix:</strong> Add <code>order.getShippingCity()</code> that encapsulates the traversal. Now only
                Order needs to know about Customer's structure.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <AlertTriangle size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION: QUIZ ============ */}
      {currentSection === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-emerald-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Simplicity is a discipline. Let's verify you know when to apply DRY, KISS, YAGNI, and when to
              prefer composition over inheritance.
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
                <h3 className="text-xl font-bold mb-2">Level 29 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand DRY, KISS, YAGNI, Composition over Inheritance, the Law of Demeter, and
                  Separation of Concerns. You can detect code smells, refactor duplication, and resist the urge
                  to over-engineer.
                </p>
                <p className="text-sm text-emerald-400">
                  Remember: the best code is the code you did not have to write.
                </p>
              </motion.div>
            )}

            <div className="flex justify-start mt-6">
              <button onClick={() => setCurrentSection(4)} className="btn-secondary flex items-center gap-2">
                <Code size={18} className="rotate-180" /> Back
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

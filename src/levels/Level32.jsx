import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Wrench, Plus, Settings, Layers, Package } from 'lucide-react'

/* ── Reusable helpers ── */
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

/* ── Telescoping constructor data ── */
const telescopingStages = [
  {
    label: '3 params',
    code: `new Pizza("large", "thin", "mozzarella")`,
    params: 3,
  },
  {
    label: '6 params',
    code: `new Pizza("large", "thin", "mozzarella",\n  "tomato", true, false)`,
    params: 6,
  },
  {
    label: '10 params',
    code: `new Pizza("large", "thin", "mozzarella",\n  "tomato", true, false, "oregano",\n  null, "extra cheese", 2)`,
    params: 10,
  },
  {
    label: '15 params',
    code: `new Pizza("large", "thin", "mozzarella",\n  "tomato", true, false, "oregano",\n  null, "extra cheese", 2, true,\n  null, "garlic bread", false, 350)`,
    params: 15,
  },
]

const builderRefactored = `const pizza = new PizzaBuilder()
  .size("large")
  .crust("thin")
  .cheese("mozzarella")
  .sauce("tomato")
  .addTopping("oregano")
  .addTopping("extra cheese")
  .bakeTemp(350)
  .build()`

/* ── Pizza builder ingredients ── */
const sizes = ['Small', 'Medium', 'Large', 'Family']
const crusts = ['Thin', 'Thick', 'Stuffed', 'Gluten-Free']
const sauces = ['Tomato', 'BBQ', 'Pesto', 'White Garlic', 'None']
const cheeses = ['Mozzarella', 'Cheddar', 'Parmesan', 'Vegan', 'None']
const toppings = [
  'Pepperoni', 'Mushrooms', 'Olives', 'Onions', 'Bell Peppers',
  'Jalape\u00f1os', 'Pineapple', 'Bacon', 'Spinach', 'Artichoke',
]

/* ── Abstract Factory: UI theme components ── */
const themeFactories = {
  dark: {
    name: 'Dark Theme Factory',
    bg: 'bg-gray-900',
    card: 'bg-gray-800 border-gray-700',
    text: 'text-gray-100',
    muted: 'text-gray-400',
    button: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    input: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400',
    badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
  },
  light: {
    name: 'Light Theme Factory',
    bg: 'bg-white',
    card: 'bg-gray-50 border-gray-200',
    text: 'text-gray-900',
    muted: 'text-gray-500',
    button: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    input: 'bg-white border-gray-300 text-gray-900 placeholder-gray-400',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  },
  neon: {
    name: 'Neon Theme Factory',
    bg: 'bg-black',
    card: 'bg-gray-950 border-green-500/30',
    text: 'text-green-300',
    muted: 'text-green-500/60',
    button: 'bg-green-500 hover:bg-green-400 text-black font-bold',
    input: 'bg-black border-green-500/50 text-green-300 placeholder-green-700',
    badge: 'bg-green-500/10 text-green-400 border-green-500/30',
  },
}

/* ── Director presets ── */
const directorPresets = [
  {
    name: 'Margherita Classic',
    icon: '🍕',
    config: { size: 'Medium', crust: 'Thin', sauce: 'Tomato', cheese: 'Mozzarella', toppings: [] },
    description: 'The timeless classic. Simple, elegant, perfect.',
  },
  {
    name: 'Meat Lovers',
    icon: '🥩',
    config: { size: 'Large', crust: 'Thick', sauce: 'BBQ', cheese: 'Cheddar', toppings: ['Pepperoni', 'Bacon'] },
    description: 'Protein-packed with BBQ sauce and thick crust.',
  },
  {
    name: 'Veggie Supreme',
    icon: '🥬',
    config: { size: 'Large', crust: 'Thin', sauce: 'Pesto', cheese: 'Vegan', toppings: ['Mushrooms', 'Olives', 'Bell Peppers', 'Spinach', 'Onions'] },
    description: 'Garden-fresh veggies on a pesto base.',
  },
  {
    name: 'Spicy Hawaiian',
    icon: '🌶',
    config: { size: 'Family', crust: 'Stuffed', sauce: 'Tomato', cheese: 'Mozzarella', toppings: ['Pineapple', 'Jalape\u00f1os', 'Bacon'] },
    description: 'Sweet and spicy, the controversial crowd-pleaser.',
  },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What problem does the Builder Pattern primarily solve?',
    options: [
      { id: 'a', text: 'Making objects immutable after creation', correct: false },
      { id: 'b', text: 'Constructing complex objects step by step, avoiding telescoping constructors', correct: true },
      { id: 'c', text: 'Ensuring only one instance of a class exists', correct: false },
      { id: 'd', text: 'Decoupling interface from implementation', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What is a fluent interface?',
    options: [
      { id: 'a', text: 'An interface that uses fluid animations', correct: false },
      { id: 'b', text: 'A pattern where methods return "this" to allow method chaining', correct: true },
      { id: 'c', text: 'An API that automatically validates inputs', correct: false },
      { id: 'd', text: 'A GraphQL-style query language', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What distinguishes an Abstract Factory from a regular Factory Method?',
    options: [
      { id: 'a', text: 'Abstract Factory creates a single product; Factory Method creates families', correct: false },
      { id: 'b', text: 'Abstract Factory is always asynchronous', correct: false },
      { id: 'c', text: 'Abstract Factory creates families of related objects without specifying concrete classes', correct: true },
      { id: 'd', text: 'They are exactly the same pattern', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What is the role of a Director in the Builder Pattern?',
    options: [
      { id: 'a', text: 'It validates the built object', correct: false },
      { id: 'b', text: 'It defines the building steps and their order for common configurations', correct: true },
      { id: 'c', text: 'It manages memory allocation for builders', correct: false },
      { id: 'd', text: 'It converts builders to factory methods', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'When should you prefer a Builder Pattern over a constructor?',
    options: [
      { id: 'a', text: 'Always, constructors are an anti-pattern', correct: false },
      { id: 'b', text: 'Only when working with immutable objects', correct: false },
      { id: 'c', text: 'When the object has many optional parameters or complex construction logic', correct: true },
      { id: 'd', text: 'Only in statically-typed languages', correct: false },
    ],
  },
]

/* ── Helper: generate fluent code string from builder state ── */
function generateBuilderCode(pizza) {
  const lines = ['new PizzaBuilder()']
  if (pizza.size) lines.push(`  .size("${pizza.size}")`)
  if (pizza.crust) lines.push(`  .crust("${pizza.crust}")`)
  if (pizza.sauce) lines.push(`  .sauce("${pizza.sauce}")`)
  if (pizza.cheese) lines.push(`  .cheese("${pizza.cheese}")`)
  pizza.toppings.forEach(t => lines.push(`  .addTopping("${t}")`))
  lines.push('  .build()')
  return lines.join('\n')
}

/* ══════════════════════════════════════════════════════════════
   Level 32 — Build It Right: Builder & Abstract Factory
   ══════════════════════════════════════════════════════════════ */
export default function Level32({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Telescoping demo state
  const [teleStage, setTeleStage] = useState(0)
  const [showRefactored, setShowRefactored] = useState(false)

  // Pizza builder state
  const [pizza, setPizza] = useState({
    size: '',
    crust: '',
    sauce: '',
    cheese: '',
    toppings: [],
  })
  const [buildSteps, setBuildSteps] = useState([])
  const [pizzaBuilt, setPizzaBuilt] = useState(false)

  // Abstract factory state
  const [activeTheme, setActiveTheme] = useState('dark')

  // Director state
  const [directorApplied, setDirectorApplied] = useState(null)

  const sections = ['intro', 'builder', 'factory', 'director', 'quiz']

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ── Pizza builder helpers ── */
  const setPizzaProp = (prop, value) => {
    setPizza(prev => ({ ...prev, [prop]: value }))
    setBuildSteps(prev => [...prev, `.${prop}("${value}")`])
    setPizzaBuilt(false)
  }

  const toggleTopping = (topping) => {
    setPizza(prev => {
      const has = prev.toppings.includes(topping)
      const next = has ? prev.toppings.filter(t => t !== topping) : [...prev.toppings, topping]
      return { ...prev, toppings: next }
    })
    setBuildSteps(prev => {
      const has = pizza.toppings.includes(topping)
      if (has) {
        return prev.filter(s => s !== `.addTopping("${topping}")`)
      }
      return [...prev, `.addTopping("${topping}")`]
    })
    setPizzaBuilt(false)
  }

  const buildPizza = () => {
    if (pizza.size && pizza.crust && pizza.sauce && pizza.cheese) {
      setPizzaBuilt(true)
      setBuildSteps(prev => [...prev, '.build()'])
    }
  }

  const resetPizza = () => {
    setPizza({ size: '', crust: '', sauce: '', cheese: '', toppings: [] })
    setBuildSteps([])
    setPizzaBuilt(false)
    setDirectorApplied(null)
  }

  const applyDirectorPreset = (preset) => {
    setPizza(preset.config)
    setDirectorApplied(preset.name)
    setPizzaBuilt(false)
    const steps = []
    steps.push(`.size("${preset.config.size}")`)
    steps.push(`.crust("${preset.config.crust}")`)
    steps.push(`.sauce("${preset.config.sauce}")`)
    steps.push(`.cheese("${preset.config.cheese}")`)
    preset.config.toppings.forEach(t => steps.push(`.addTopping("${t}")`))
    setBuildSteps(steps)
  }

  /* ══════════════════════════════════════════════════════════════ */

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* ── Section navigation ── */}
      <div className="flex gap-2 flex-wrap">
        {['The Problem', 'Builder Pattern', 'Abstract Factory', 'Director', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentSection === i
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface text-quest-muted hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ============ SECTION 0: THE PROBLEM (Telescoping Constructor) ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Wrench className="text-quest-primary" />
              The Problem: Telescoping Constructors
            </h2>
            <p className="text-quest-muted mb-4 italic">
              "Your constructor has 15 parameters. Half are optional. There must be a better way."
            </p>

            <p className="text-quest-muted mb-4">
              Imagine you're building a <Term word="Pizza" definition="Our example domain object that has many optional configuration parameters." onLearn={learnTerm} /> class.
              It starts simple: size, crust, cheese. But then product asks for sauce options, toppings, bake temperature,
              dietary flags, special instructions... Before you know it, you have a{' '}
              <Term word="Telescoping Constructor" definition="An anti-pattern where a class has multiple constructors with increasing parameter lists, each adding one more optional parameter." onLearn={learnTerm} /> problem.
            </p>

            {/* Interactive telescoping demo */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-quest-secondary">
                Watch It Grow
              </h3>

              <div className="flex gap-2 mb-6 flex-wrap">
                {telescopingStages.map((stage, i) => (
                  <button
                    key={i}
                    onClick={() => { setTeleStage(i); setShowRefactored(false) }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      teleStage === i && !showRefactored
                        ? 'bg-quest-danger/20 text-quest-danger border border-quest-danger/40'
                        : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                    }`}
                  >
                    {stage.label}
                  </button>
                ))}
                <button
                  onClick={() => setShowRefactored(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    showRefactored
                      ? 'bg-quest-success/20 text-quest-success border border-quest-success/40'
                      : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                  }`}
                >
                  Builder Fix
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={showRefactored ? 'builder' : `tele-${teleStage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {!showRefactored ? (
                    <div>
                      <pre className="bg-black/40 rounded-lg p-4 text-sm overflow-x-auto font-mono text-quest-danger/80">
                        {telescopingStages[teleStage].code}
                      </pre>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-2 rounded-full bg-quest-danger/30 flex-1">
                          <motion.div
                            className="h-full rounded-full bg-quest-danger"
                            initial={{ width: 0 }}
                            animate={{ width: `${(telescopingStages[teleStage].params / 15) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-quest-danger font-medium">
                          {telescopingStages[teleStage].params}/15 params
                        </span>
                      </div>
                      <p className="text-xs text-quest-muted mt-2">
                        {teleStage === 0 && 'Looks fine so far... but features keep coming.'}
                        {teleStage === 1 && 'Getting harder to read. Which boolean is which?'}
                        {teleStage === 2 && 'Nulls for unused params. What does the 8th argument mean?'}
                        {teleStage === 3 && 'Unreadable. Impossible to maintain. This is the anti-pattern.'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <pre className="bg-black/40 rounded-lg p-4 text-sm overflow-x-auto font-mono text-quest-success/80">
                        {builderRefactored}
                      </pre>
                      <p className="text-xs text-quest-success mt-3 font-medium">
                        Every parameter is named. Optional ones simply aren't called. Reads like a sentence.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <DeepDive id="telescoping-history" title="The Telescoping Constructor in the Wild" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Java's <code className="text-quest-primary">java.util.Calendar</code> is a classic example of this anti-pattern.
                It required developers to pass numerous integer parameters, leading to bugs where month and day were swapped.
                The Builder pattern was popularized by Joshua Bloch in <em>Effective Java</em> (Item 2) as the solution.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                In JavaScript/TypeScript, the "options object" pattern (passing a single config object) is a lightweight
                alternative. But the Builder pattern adds validation, step ordering, and immutability guarantees that a
                plain object cannot provide.
              </p>
              <p className="text-sm text-quest-muted">
                Real-world builders: <code className="text-quest-primary">StringBuilder</code> in Java/C#,
                <code className="text-quest-primary"> QueryBuilder</code> in ORMs like TypeORM,
                <code className="text-quest-primary"> RequestBuilder</code> in HTTP clients, and every
                ORM query chain you've ever used.
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Build a Pizza <Wrench size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 1: INTERACTIVE BUILDER ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Plus className="text-quest-primary" />
              Builder Pattern: Build a Pizza
            </h2>
            <p className="text-quest-muted mb-2">
              The <Term word="Builder Pattern" definition="A creational design pattern that lets you construct complex objects step by step, separating construction from representation." onLearn={learnTerm} /> separates
              object construction from its representation. Each method configures one aspect and returns the builder,
              creating a <Term word="Fluent Interface" definition="An API design where methods return 'this' (the object itself), enabling method chaining like .size('L').crust('thin').build()." onLearn={learnTerm} />.
            </p>
            <p className="text-quest-muted mb-6">
              Use the controls below to build your pizza step by step. Watch the fluent code update in real time.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Controls */}
              <div className="space-y-5">
                {/* Size */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-quest-secondary mb-2 block">
                    .size()
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setPizzaProp('size', s)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          pizza.size === s
                            ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                            : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Crust */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-quest-secondary mb-2 block">
                    .crust()
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {crusts.map(c => (
                      <button
                        key={c}
                        onClick={() => setPizzaProp('crust', c)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          pizza.crust === c
                            ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                            : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sauce */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-quest-secondary mb-2 block">
                    .sauce()
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {sauces.map(s => (
                      <button
                        key={s}
                        onClick={() => setPizzaProp('sauce', s)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          pizza.sauce === s
                            ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                            : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cheese */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-quest-secondary mb-2 block">
                    .cheese()
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cheeses.map(c => (
                      <button
                        key={c}
                        onClick={() => setPizzaProp('cheese', c)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          pizza.cheese === c
                            ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                            : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toppings */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-quest-secondary mb-2 block">
                    .addTopping()
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {toppings.map(t => (
                      <button
                        key={t}
                        onClick={() => toggleTopping(t)}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                          pizza.toppings.includes(t)
                            ? 'bg-quest-secondary/20 text-quest-secondary border border-quest-secondary/40'
                            : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                        }`}
                      >
                        {pizza.toppings.includes(t) ? '- ' : '+ '}{t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Build / Reset buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={buildPizza}
                    disabled={!pizza.size || !pizza.crust || !pizza.sauce || !pizza.cheese}
                    className="btn-primary flex items-center gap-2 disabled:opacity-40"
                  >
                    <Package size={16} /> .build()
                  </button>
                  <button
                    onClick={resetPizza}
                    className="btn-secondary text-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Right: Live code output */}
              <div className="space-y-4">
                <div className="bg-black/40 rounded-xl p-4 min-h-[200px]">
                  <p className="text-xs text-quest-muted mb-3 uppercase tracking-wide">Fluent Builder Code</p>
                  <pre className="text-sm font-mono text-quest-primary/80 whitespace-pre-wrap">
                    {generateBuilderCode(pizza)}
                  </pre>
                </div>

                {/* Visual pizza preview */}
                <AnimatePresence>
                  {pizzaBuilt && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-quest-success/10 border border-quest-success/30 rounded-xl p-5 text-center"
                    >
                      <CheckCircle size={32} className="mx-auto text-quest-success mb-2" />
                      <h3 className="font-bold text-lg mb-2">Pizza Built!</h3>
                      <div className="text-sm text-quest-muted space-y-1">
                        <p><strong>Size:</strong> {pizza.size} | <strong>Crust:</strong> {pizza.crust}</p>
                        <p><strong>Sauce:</strong> {pizza.sauce} | <strong>Cheese:</strong> {pizza.cheese}</p>
                        {pizza.toppings.length > 0 && (
                          <p><strong>Toppings:</strong> {pizza.toppings.join(', ')}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Build steps log */}
                {buildSteps.length > 0 && (
                  <div className="bg-quest-surface/50 rounded-xl p-4">
                    <p className="text-xs text-quest-muted mb-2 uppercase tracking-wide">Build Chain Log</p>
                    <div className="space-y-1 max-h-40 overflow-y-auto">
                      {buildSteps.map((step, i) => (
                        <motion.div
                          key={`${step}-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs font-mono text-quest-secondary/70"
                        >
                          {i + 1}. {step}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DeepDive id="builder-immutability" title="Builder Pattern & Immutability" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                A key benefit of the Builder Pattern is producing <strong>immutable objects</strong>. The builder
                accumulates state through its fluent methods, and the <code className="text-quest-primary">.build()</code> method
                creates the final object with all fields set. After construction, the object cannot be modified.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                This matters in concurrent systems: immutable objects are inherently thread-safe. In JavaScript,
                you can freeze the result with <code className="text-quest-primary">Object.freeze()</code> or use
                TypeScript's <code className="text-quest-primary">Readonly&lt;T&gt;</code> type.
              </p>
              <p className="text-sm text-quest-muted">
                The builder can also <strong>validate</strong> during <code className="text-quest-primary">.build()</code> --
                ensuring required fields are present, values are in range, and combinations are valid (e.g., you can't
                have stuffed crust with gluten-free dough). This validation is impossible with a plain constructor
                that accepts everything at once.
              </p>
            </DeepDive>

            <DeepDive id="builder-vs-options" title="Builder vs Options Object Pattern" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                In JavaScript, a common alternative is the <strong>options object</strong> pattern:
                <code className="text-quest-primary ml-1">new Pizza({'{'} size: "L", crust: "thin" {'}'})</code>.
                This is simpler but lacks the builder's strengths:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 list-disc list-inside mb-3">
                <li>No step-by-step construction or intermediate validation</li>
                <li>No enforced build order (some fields may depend on others)</li>
                <li>No reusable "half-built" configurations</li>
                <li>No separation of construction logic from the class itself</li>
              </ul>
              <p className="text-sm text-quest-muted">
                Use options objects for simple configs. Use builders when construction is complex, has
                dependencies between steps, or needs validation at each stage.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <Wrench size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Abstract Factory <Layers size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 2: ABSTRACT FACTORY ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Layers className="text-quest-secondary" />
              Abstract Factory: Theme System
            </h2>
            <p className="text-quest-muted mb-2">
              The <Term word="Abstract Factory" definition="A creational design pattern that provides an interface for creating families of related objects without specifying their concrete classes." onLearn={learnTerm} /> pattern
              creates <strong>families of related objects</strong> without specifying their concrete classes. Each factory
              produces a consistent set of components that work together.
            </p>
            <p className="text-quest-muted mb-6">
              Below, each theme factory creates a complete, consistent set of UI components: buttons, inputs, cards, and badges.
              Switch between factories to see how the same abstract interface produces completely different concrete outputs.
            </p>

            {/* Theme selector */}
            <div className="flex gap-3 mb-6">
              {Object.entries(themeFactories).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTheme === key
                      ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/40'
                      : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-white'
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>

            {/* Themed component preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTheme}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`rounded-xl p-6 border ${themeFactories[activeTheme].bg} transition-colors`}
              >
                <h3 className={`text-lg font-bold mb-4 ${themeFactories[activeTheme].text}`}>
                  {themeFactories[activeTheme].name} Output
                </h3>

                {/* Card component */}
                <div className={`rounded-lg border p-4 mb-4 ${themeFactories[activeTheme].card}`}>
                  <h4 className={`font-semibold mb-1 ${themeFactories[activeTheme].text}`}>
                    createCard()
                  </h4>
                  <p className={`text-sm ${themeFactories[activeTheme].muted}`}>
                    This card is produced by the {activeTheme} theme factory. All components
                    within this factory share a consistent visual language.
                  </p>
                </div>

                {/* Button component */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${themeFactories[activeTheme].button}`}>
                    createButton("primary")
                  </button>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs border ${themeFactories[activeTheme].badge}`}>
                    createBadge("status")
                  </span>
                </div>

                {/* Input component */}
                <input
                  type="text"
                  placeholder='createInput("email")'
                  readOnly
                  className={`w-full px-3 py-2 rounded-lg border text-sm ${themeFactories[activeTheme].input}`}
                />

                {/* Factory code */}
                <div className="mt-4 bg-black/20 rounded-lg p-3">
                  <pre className={`text-xs font-mono ${themeFactories[activeTheme].muted}`}>
{`// Abstract Factory usage
const factory = getThemeFactory("${activeTheme}")
const card   = factory.createCard(props)
const button = factory.createButton(props)
const input  = factory.createInput(props)
const badge  = factory.createBadge(props)
// All components are guaranteed consistent!`}
                  </pre>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Factory comparison table */}
            <div className="bg-quest-bg rounded-xl p-5 mt-6">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-quest-secondary">
                Factory Method vs Abstract Factory
              </h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="font-medium text-quest-muted">Aspect</div>
                <div className="font-medium text-quest-primary">Factory Method</div>
                <div className="font-medium text-quest-secondary">Abstract Factory</div>

                <div className="text-quest-muted">Creates</div>
                <div className="text-quest-muted">A single product</div>
                <div className="text-quest-muted">Families of products</div>

                <div className="text-quest-muted">Abstraction</div>
                <div className="text-quest-muted">One method per product</div>
                <div className="text-quest-muted">Interface for entire family</div>

                <div className="text-quest-muted">Consistency</div>
                <div className="text-quest-muted">Not guaranteed across products</div>
                <div className="text-quest-muted">All products are consistent</div>

                <div className="text-quest-muted">Example</div>
                <div className="text-quest-muted">createButton()</div>
                <div className="text-quest-muted">createDarkUI() returns buttons, inputs, cards</div>

                <div className="text-quest-muted">Use when</div>
                <div className="text-quest-muted">You need one type of object</div>
                <div className="text-quest-muted">You need a set of objects that work together</div>
              </div>
            </div>

            <DeepDive id="abstract-factory-real" title="Abstract Factory in Real Systems" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Cross-platform UI:</strong> React Native, Flutter, and Swing all use abstract factories
                internally. A single component like <code className="text-quest-primary">&lt;Button&gt;</code> is created by
                a platform-specific factory that produces iOS-native or Android-native widgets.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Database drivers:</strong> JDBC uses an abstract factory pattern. The <code className="text-quest-primary">DriverManager</code> selects
                a concrete factory (MySQL, PostgreSQL, etc.) that creates connections, statements, and result sets --
                all consistent with that database engine.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Cloud SDKs:</strong> AWS SDK, Google Cloud client libraries, and Azure SDKs abstract their
                clients behind factory interfaces. You can swap cloud providers without changing application logic --
                the factory produces compatible service clients.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <Wrench size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Director Pattern <Settings size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 3: DIRECTOR ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Settings className="text-quest-warning" />
              The Director: Preset Configurations
            </h2>
            <p className="text-quest-muted mb-2">
              A <Term word="Director" definition="A class that defines the order of building steps and provides preset configurations. It uses a builder to construct objects but knows which steps to call and in what order." onLearn={learnTerm} /> knows
              <em> how</em> to build common configurations using a builder. It encapsulates frequently used
              build sequences so clients don't have to repeat the same steps over and over.
            </p>
            <p className="text-quest-muted mb-6">
              Think of it like ordering a "Number 3 Combo" instead of specifying every item individually.
              The Director is the menu; the Builder is the kitchen.
            </p>

            {/* Director preset cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {directorPresets.map((preset) => (
                <motion.button
                  key={preset.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => applyDirectorPreset(preset)}
                  className={`text-left rounded-xl border p-4 transition-all ${
                    directorApplied === preset.name
                      ? 'border-quest-warning/50 bg-quest-warning/10'
                      : 'border-white/10 bg-quest-surface hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{preset.icon}</span>
                    <h4 className="font-bold">{preset.name}</h4>
                    {directorApplied === preset.name && (
                      <CheckCircle size={16} className="text-quest-warning ml-auto" />
                    )}
                  </div>
                  <p className="text-sm text-quest-muted mb-3">{preset.description}</p>
                  <div className="text-xs text-quest-muted space-y-0.5">
                    <p><strong>Size:</strong> {preset.config.size} | <strong>Crust:</strong> {preset.config.crust}</p>
                    <p><strong>Sauce:</strong> {preset.config.sauce} | <strong>Cheese:</strong> {preset.config.cheese}</p>
                    {preset.config.toppings.length > 0 && (
                      <p><strong>Toppings:</strong> {preset.config.toppings.join(', ')}</p>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Director-applied code preview */}
            <AnimatePresence>
              {directorApplied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-black/40 rounded-xl p-5 mb-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-quest-warning uppercase tracking-wide font-semibold">
                      Director: {directorApplied}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={buildPizza}
                        disabled={!pizza.size || !pizza.crust || !pizza.sauce || !pizza.cheese}
                        className="px-3 py-1 text-xs rounded-lg bg-quest-success/20 text-quest-success border border-quest-success/40 hover:bg-quest-success/30 disabled:opacity-40"
                      >
                        .build()
                      </button>
                      <button
                        onClick={resetPizza}
                        className="px-3 py-1 text-xs rounded-lg bg-quest-surface border border-white/10 text-quest-muted hover:text-white"
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <pre className="text-sm font-mono text-quest-warning/80 whitespace-pre-wrap">
{`// Director sets up the builder
const director = new PizzaDirector(builder)
director.make${directorApplied.replace(/\s+/g, '')}()

// Equivalent to:
${generateBuilderCode(pizza)}`}
                  </pre>

                  {pizzaBuilt && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-3 border-t border-white/10"
                    >
                      <div className="flex items-center gap-2 text-quest-success text-sm">
                        <CheckCircle size={16} />
                        <span>Pizza built successfully via Director preset!</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Director pattern explanation */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-quest-secondary">
                Director Pattern Structure
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-quest-primary mb-2">Client</h4>
                  <p className="text-quest-muted">
                    Wants an object but doesn't know or care about the build steps. Asks the Director
                    for a preset or uses the Builder directly for custom builds.
                  </p>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-quest-warning mb-2">Director</h4>
                  <p className="text-quest-muted">
                    Knows the recipes. Defines methods like <code className="text-quest-warning">makeMargherita()</code> that
                    call the builder's steps in the right order with the right values.
                  </p>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-quest-secondary mb-2">Builder</h4>
                  <p className="text-quest-muted">
                    Knows <em>how</em> to set each property and construct the final object. Provides
                    the fluent API. Doesn't know about preset combinations.
                  </p>
                </div>
              </div>
            </div>

            <DeepDive id="director-real-world" title="Director Pattern in Practice" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>ORM Query Directors:</strong> Libraries like Prisma and TypeORM often provide "query directors" --
                methods like <code className="text-quest-primary">findByEmail()</code> that internally use a query builder with
                preset joins, selects, and conditions.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Test Fixtures:</strong> In testing, a "Mother" or "Factory" class acts as a Director, producing
                pre-configured test objects. <code className="text-quest-primary">UserMother.adminUser()</code> internally
                calls the UserBuilder with admin-specific settings.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Configuration Presets:</strong> Webpack, ESLint, and Babel all use a Director-like approach
                where presets (<code className="text-quest-primary">@babel/preset-react</code>) configure a complex
                builder with sensible defaults. You can extend or override individual settings while getting a
                solid starting point.
              </p>
            </DeepDive>

            <DeepDive id="builder-vs-factory" title="Builder vs Factory: When to Use Which?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Both are creational patterns, but they solve different problems:
              </p>
              <ul className="text-sm text-quest-muted space-y-2 list-disc list-inside mb-3">
                <li>
                  <strong>Factory:</strong> Creates objects in one step. The caller says "give me a thing" and
                  the factory decides which concrete class to instantiate. Best when the creation logic is simple
                  but the <em>type</em> varies.
                </li>
                <li>
                  <strong>Builder:</strong> Creates objects in multiple steps. The caller configures the object
                  piece by piece. Best when the object is complex but the <em>type</em> is fixed.
                </li>
                <li>
                  <strong>Abstract Factory + Builder:</strong> You can combine them! An Abstract Factory selects
                  the right Builder. For example, a "VehicleFactory" might return a CarBuilder or TruckBuilder,
                  each with its own fluent steps.
                </li>
              </ul>
              <p className="text-sm text-quest-muted">
                Rule of thumb: if your object needs more than ~4 parameters, especially optional ones, reach
                for the Builder. If you need families of related objects, reach for Abstract Factory.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <Layers size={18} className="rotate-180" /> Back
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
              <CheckCircle className="text-quest-success" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Builder, Abstract Factory, fluent interfaces, directors -- let's see if the patterns have clicked!
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
                <h3 className="text-xl font-bold mb-2">Level 32 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Builder Pattern, Fluent Interfaces, Abstract Factory, and the Director
                  Pattern. No more 15-parameter constructors or inconsistent object families in your codebase!
                </p>
                <p className="text-sm text-quest-primary">
                  Build step by step. Create families consistently. Let the Director handle the presets.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

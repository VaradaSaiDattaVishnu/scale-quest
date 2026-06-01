import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Save, History, UserCheck, Compass, RotateCcw } from 'lucide-react'

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

/* ── Initial game character state ── */
const initialCharacter = {
  name: 'Hero',
  health: 100,
  posX: 2,
  posY: 3,
  inventory: ['Sword', 'Shield', 'Potion'],
}

/* ── Shape data for visitor pattern ── */
const shapes = [
  { type: 'Circle', radius: 5, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
  { type: 'Rectangle', width: 8, height: 4, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
  { type: 'Triangle', base: 6, height: 5, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
]

const visitors = [
  {
    name: 'AreaCalculator',
    icon: Compass,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    visit: (shape) => {
      if (shape.type === 'Circle') return { label: 'Area', value: `pi * ${shape.radius}^2 = ${(Math.PI * shape.radius * shape.radius).toFixed(1)}` }
      if (shape.type === 'Rectangle') return { label: 'Area', value: `${shape.width} * ${shape.height} = ${shape.width * shape.height}` }
      if (shape.type === 'Triangle') return { label: 'Area', value: `0.5 * ${shape.base} * ${shape.height} = ${0.5 * shape.base * shape.height}` }
      return { label: 'Area', value: '?' }
    },
  },
  {
    name: 'PerimeterCalculator',
    icon: UserCheck,
    color: 'text-sky-400',
    bg: 'bg-sky-500/20',
    visit: (shape) => {
      if (shape.type === 'Circle') return { label: 'Perimeter', value: `2 * pi * ${shape.radius} = ${(2 * Math.PI * shape.radius).toFixed(1)}` }
      if (shape.type === 'Rectangle') return { label: 'Perimeter', value: `2*(${shape.width}+${shape.height}) = ${2 * (shape.width + shape.height)}` }
      if (shape.type === 'Triangle') {
        const hyp = Math.sqrt(shape.base * shape.base + shape.height * shape.height)
        return { label: 'Perimeter', value: `${shape.base}+${shape.height}+${hyp.toFixed(1)} = ${(shape.base + shape.height + hyp).toFixed(1)}` }
      }
      return { label: 'Perimeter', value: '?' }
    },
  },
  {
    name: 'Renderer',
    icon: Save,
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    visit: (shape) => {
      if (shape.type === 'Circle') return { label: 'Render', value: `Draw circle r=${shape.radius} at origin` }
      if (shape.type === 'Rectangle') return { label: 'Render', value: `Draw rect ${shape.width}x${shape.height}` }
      if (shape.type === 'Triangle') return { label: 'Render', value: `Draw triangle base=${shape.base} h=${shape.height}` }
      return { label: 'Render', value: '?' }
    },
  },
]

/* ── Double dispatch steps ── */
const doubleDispatchSteps = [
  { label: 'Client calls shape.accept(visitor)', desc: 'The first dispatch: client does not know the concrete shape type. Polymorphism picks the right accept() method based on the shape.' },
  { label: 'Shape calls visitor.visitCircle(this)', desc: 'The second dispatch: inside accept(), the shape knows its own type and calls the correct visit method, passing itself.' },
  { label: 'Visitor executes type-specific logic', desc: 'The visitor now has both the correct method (via its own type) and the correct data (via the shape argument). No instanceof needed.' },
]

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the key difference between the Memento Pattern and simple serialization (e.g., JSON.stringify)?',
    options: [
      { id: 'a', text: 'Memento is faster than serialization', correct: false },
      { id: 'b', text: 'Memento preserves encapsulation -- the originator controls what is saved and restored, without exposing internal state', correct: true },
      { id: 'c', text: 'Serialization cannot handle nested objects', correct: false },
      { id: 'd', text: 'They are the same thing with different names', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'In the Memento Pattern, what is the role of the Caretaker?',
    options: [
      { id: 'a', text: 'It creates the snapshots by reading internal state', correct: false },
      { id: 'b', text: 'It modifies the memento before restoring', correct: false },
      { id: 'c', text: 'It stores and manages mementos without examining or modifying their contents', correct: true },
      { id: 'd', text: 'It defines the interface for all originator classes', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Why is the Visitor Pattern preferred over a switch statement on object types?',
    options: [
      { id: 'a', text: 'Switch statements are slower at runtime', correct: false },
      { id: 'b', text: 'Visitor separates algorithms from object structure, so new operations can be added without modifying existing classes', correct: true },
      { id: 'c', text: 'Switch statements cannot handle more than 5 cases', correct: false },
      { id: 'd', text: 'Visitor uses less memory than switch statements', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What problem does double dispatch solve in the Visitor Pattern?',
    options: [
      { id: 'a', text: 'It makes the code run twice as fast', correct: false },
      { id: 'b', text: 'It allows selecting behavior based on BOTH the visitor type and the element type at runtime, without instanceof checks', correct: true },
      { id: 'c', text: 'It prevents stack overflow in recursive visitors', correct: false },
      { id: 'd', text: 'It doubles the number of available dispatch methods', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'When should you NOT use the Memento Pattern?',
    options: [
      { id: 'a', text: 'When you need undo/redo functionality', correct: false },
      { id: 'b', text: 'When the game state is complex', correct: false },
      { id: 'c', text: 'When snapshots are very large and frequent, causing excessive memory consumption', correct: true },
      { id: 'd', text: 'When you want to preserve encapsulation', correct: false },
    ],
  },
]

export default function Level42({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Memento simulation state ── */
  const [character, setCharacter] = useState({ ...initialCharacter })
  const [snapshots, setSnapshots] = useState([])
  const [activeSnapshotIdx, setActiveSnapshotIdx] = useState(null)
  const [mementoLog, setMementoLog] = useState([])

  /* ── Visitor simulation state ── */
  const [activeVisitor, setActiveVisitor] = useState(null)
  const [visitingShapeIdx, setVisitingShapeIdx] = useState(null)
  const [visitorResults, setVisitorResults] = useState({})

  /* ── Double dispatch state ── */
  const [ddStep, setDdStep] = useState(-1)
  const [ddShape, setDdShape] = useState('Circle')
  const [ddVisitor, setDdVisitor] = useState('AreaCalculator')

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ── Memento helpers ── */
  const takeSnapshot = () => {
    const snapshot = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      state: JSON.parse(JSON.stringify(character)),
    }
    setSnapshots(prev => [...prev, snapshot])
    setMementoLog(prev => [...prev, `Snapshot #${prev.length + 1} saved at ${snapshot.timestamp}`])
  }

  const restoreSnapshot = (idx) => {
    const snapshot = snapshots[idx]
    if (!snapshot) return
    setCharacter(JSON.parse(JSON.stringify(snapshot.state)))
    setActiveSnapshotIdx(idx)
    setMementoLog(prev => [...prev, `Restored to Snapshot #${idx + 1} (${snapshot.timestamp})`])
    setTimeout(() => setActiveSnapshotIdx(null), 1500)
  }

  const modifyCharacter = (action) => {
    setCharacter(prev => {
      const next = { ...prev, inventory: [...prev.inventory] }
      switch (action) {
        case 'damage':
          next.health = Math.max(0, next.health - 25)
          setMementoLog(p => [...p, 'Hero took 25 damage!'])
          break
        case 'heal':
          next.health = Math.min(100, next.health + 20)
          setMementoLog(p => [...p, 'Hero healed 20 HP!'])
          break
        case 'moveRight':
          next.posX = Math.min(9, next.posX + 1)
          setMementoLog(p => [...p, `Hero moved to (${next.posX}, ${next.posY})`])
          break
        case 'moveUp':
          next.posY = Math.max(0, next.posY - 1)
          setMementoLog(p => [...p, `Hero moved to (${next.posX}, ${next.posY})`])
          break
        case 'addItem':
          {
            const items = ['Bow', 'Ring', 'Amulet', 'Scroll', 'Gem', 'Helmet', 'Boots']
            const available = items.filter(i => !next.inventory.includes(i))
            if (available.length > 0) {
              const item = available[Math.floor(Math.random() * available.length)]
              next.inventory.push(item)
              setMementoLog(p => [...p, `Hero picked up ${item}!`])
            }
          }
          break
        case 'removeItem':
          if (next.inventory.length > 0) {
            const removed = next.inventory.pop()
            setMementoLog(p => [...p, `Hero dropped ${removed}!`])
          }
          break
        default:
          break
      }
      return next
    })
  }

  const resetMemento = () => {
    setCharacter({ ...initialCharacter, inventory: [...initialCharacter.inventory] })
    setSnapshots([])
    setActiveSnapshotIdx(null)
    setMementoLog([])
  }

  /* ── Visitor helpers ── */
  const runVisitor = (visitorIdx) => {
    setActiveVisitor(visitorIdx)
    setVisitingShapeIdx(null)
    setVisitorResults({})

    const visitor = visitors[visitorIdx]
    let shapeIdx = 0

    const visitNext = () => {
      if (shapeIdx >= shapes.length) {
        setTimeout(() => setVisitingShapeIdx(null), 800)
        return
      }
      setVisitingShapeIdx(shapeIdx)
      const result = visitor.visit(shapes[shapeIdx])
      const currentIdx = shapeIdx
      setTimeout(() => {
        setVisitorResults(prev => ({ ...prev, [currentIdx]: result }))
        shapeIdx++
        setTimeout(visitNext, 600)
      }, 500)
    }

    setTimeout(visitNext, 300)
  }

  const resetVisitor = () => {
    setActiveVisitor(null)
    setVisitingShapeIdx(null)
    setVisitorResults({})
  }

  /* ── Double dispatch helpers ── */
  const runDoubleDispatch = () => {
    setDdStep(0)
    let step = 0
    const advance = () => {
      step++
      if (step < doubleDispatchSteps.length) {
        setDdStep(step)
        setTimeout(advance, 1800)
      }
    }
    setTimeout(advance, 1800)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-quest-primary font-medium">Level 42</span>
          {isCompleted && <CheckCircle size={18} className="text-quest-success" />}
        </div>
        <h1 className="text-3xl font-bold mb-2">Remember Me</h1>
        <p className="text-quest-muted">Memento and Visitor Patterns -- snapshotting state and operating on structures without modifying them.</p>
      </div>

      {/* Section Navigation */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {['The Story', 'Memento Pattern', 'State History', 'Visitor Pattern', 'Double Dispatch', 'Quiz'].map((label, idx) => (
          <button
            key={label}
            onClick={() => setCurrentSection(idx)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === idx
                ? 'bg-quest-primary text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text border border-white/10'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ============ SECTION 0: THE STORY ============ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Save className="text-amber-400" />
              The Challenge
            </h2>

            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-amber-500/20">
              <p className="text-lg text-quest-text mb-4 italic">
                "Users want to save their game and load it later. The game state is complex -- health, position,
                inventory, quest progress. How do you snapshot it cleanly without breaking encapsulation?"
              </p>
              <p className="text-sm text-quest-muted">
                You could just serialize everything to JSON. But that exposes every internal detail. What if
                you change the internal structure later? What if some state should NOT be saved? You need a
                pattern that lets the object itself decide what to snapshot.
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              This level covers two powerful behavioral patterns:{' '}
              <Term
                word="Memento Pattern"
                definition="A behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation. The object itself creates and restores from snapshots."
                onLearn={learnTerm}
              />{' '}
              for capturing and restoring state, and the{' '}
              <Term
                word="Visitor Pattern"
                definition="A behavioral design pattern that lets you define new operations on a set of objects without changing the classes of the elements on which it operates. It separates algorithms from the objects they act on."
                onLearn={learnTerm}
              />{' '}
              for performing operations on object structures without modifying them.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-surface rounded-xl p-5 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Save size={20} className="text-amber-400" />
                  <h3 className="font-semibold">Memento Pattern</h3>
                </div>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>Save/restore object state (undo, checkpoints)</li>
                  <li>Object controls what gets snapshotted</li>
                  <li>Preserves encapsulation</li>
                  <li>Three roles: Originator, Memento, Caretaker</li>
                </ul>
              </div>
              <div className="bg-quest-surface rounded-xl p-5 border border-sky-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Compass size={20} className="text-sky-400" />
                  <h3 className="font-semibold">Visitor Pattern</h3>
                </div>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>Add operations to objects without modifying them</li>
                  <li>Separate algorithm from object structure</li>
                  <li>Uses double dispatch for type-safe operations</li>
                  <li>Open/Closed Principle in action</li>
                </ul>
              </div>
            </div>

            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="font-semibold mb-3">Concepts You Will Learn</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Memento Pattern', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
                  { label: 'Visitor Pattern', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
                  { label: 'Snapshot', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
                  { label: 'State History', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
                  { label: 'Double Dispatch', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
                ].map(c => (
                  <span key={c.label} className={`px-3 py-1 rounded-full text-xs font-medium border ${c.color}`}>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            <DeepDive id="memento-history" title="Historical Context: Memento in the Gang of Four" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                The Memento Pattern was introduced in the original "Design Patterns" book by the Gang of Four (1994).
                The name comes from the Latin word for "remember." The classic example was a text editor with undo
                functionality -- each state change creates a memento that can be restored later.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Real-world examples:</strong> Git commits are essentially mementos of your codebase.
                Database savepoints, browser history, and Ctrl+Z in any application all use memento-like concepts.
                Even React's state management with immutable updates is philosophically similar.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Modern usage:</strong> Redux DevTools' time-travel debugging is a perfect example of the
                Memento Pattern at scale -- every dispatched action creates a snapshot of the entire application
                state that you can jump back to.
              </p>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Memento Pattern <Compass size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 1: MEMENTO PATTERN ============ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Save className="text-amber-400" />
              <Term
                word="Memento Pattern"
                definition="A behavioral design pattern that lets you save and restore the previous state of an object without revealing the details of its implementation. The originator creates mementos; the caretaker stores them."
                onLearn={learnTerm}
              />
              {' '}-- Game Save System
            </h2>

            <p className="text-quest-muted mb-6">
              Modify the hero's state, take{' '}
              <Term
                word="Snapshot"
                definition="A captured copy of an object's internal state at a specific point in time. In the Memento Pattern, the originator creates snapshots (mementos) that can be stored and later used to restore the object to that state."
                onLearn={learnTerm}
              />
              s, and restore to any previous save point. Notice how the character (Originator) controls what
              gets saved, and you (the{' '}
              <Term
                word="Caretaker"
                definition="The object responsible for storing mementos and deciding when to restore them. The caretaker never examines or modifies the contents of a memento -- it only holds references and passes them back to the originator for restoration."
                onLearn={learnTerm}
              />
              ) just manage the snapshots without peeking inside.
            </p>

            {/* Game character display */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Character card */}
                <div className="bg-quest-surface rounded-xl p-5 border border-white/10">
                  <h3 className="font-semibold mb-4 text-amber-400 flex items-center gap-2">
                    <UserCheck size={18} /> {character.name}
                  </h3>

                  {/* Health bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-quest-muted">Health</span>
                      <span className={`font-bold ${character.health > 50 ? 'text-green-400' : character.health > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {character.health}/100
                      </span>
                    </div>
                    <div className="w-full h-3 bg-quest-bg rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${character.health}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full ${character.health > 50 ? 'bg-green-500' : character.health > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      />
                    </div>
                  </div>

                  {/* Position grid */}
                  <div className="mb-4">
                    <p className="text-sm text-quest-muted mb-2">Position: ({character.posX}, {character.posY})</p>
                    <div className="grid grid-cols-10 gap-0.5">
                      {Array.from({ length: 60 }, (_, i) => {
                        const x = i % 10
                        const y = Math.floor(i / 10)
                        const isHero = x === character.posX && y === character.posY
                        return (
                          <motion.div
                            key={i}
                            animate={isHero ? { scale: [1, 1.3, 1] } : {}}
                            transition={isHero ? { duration: 1, repeat: Infinity } : {}}
                            className={`w-full aspect-square rounded-sm ${isHero ? 'bg-amber-500' : 'bg-quest-bg border border-white/5'}`}
                          />
                        )
                      })}
                    </div>
                  </div>

                  {/* Inventory */}
                  <div>
                    <p className="text-sm text-quest-muted mb-2">Inventory ({character.inventory.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {character.inventory.map((item, idx) => (
                        <motion.span
                          key={`${item}-${idx}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="px-2 py-1 rounded text-[11px] bg-quest-primary/20 text-quest-primary border border-quest-primary/30"
                        >
                          {item}
                        </motion.span>
                      ))}
                      {character.inventory.length === 0 && (
                        <span className="text-xs text-quest-muted italic">Empty</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold mb-2 text-quest-text">Modify State (Originator)</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => modifyCharacter('damage')} className="px-3 py-2 rounded-lg text-xs bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors">
                        Take Damage (-25 HP)
                      </button>
                      <button onClick={() => modifyCharacter('heal')} className="px-3 py-2 rounded-lg text-xs bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-colors">
                        Heal (+20 HP)
                      </button>
                      <button onClick={() => modifyCharacter('moveRight')} className="px-3 py-2 rounded-lg text-xs bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-colors">
                        Move Right
                      </button>
                      <button onClick={() => modifyCharacter('moveUp')} className="px-3 py-2 rounded-lg text-xs bg-blue-500/20 border border-blue-500/30 text-blue-400 hover:bg-blue-500/30 transition-colors">
                        Move Up
                      </button>
                      <button onClick={() => modifyCharacter('addItem')} className="px-3 py-2 rounded-lg text-xs bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors">
                        Pick Up Item
                      </button>
                      <button onClick={() => modifyCharacter('removeItem')} className="px-3 py-2 rounded-lg text-xs bg-orange-500/20 border border-orange-500/30 text-orange-400 hover:bg-orange-500/30 transition-colors">
                        Drop Item
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={takeSnapshot}
                      className="flex-1 btn-primary flex items-center justify-center gap-2"
                    >
                      <Save size={16} /> Save Snapshot
                    </button>
                    <button
                      onClick={resetMemento}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <RotateCcw size={16} /> Reset
                    </button>
                  </div>

                  {/* Activity log */}
                  <div className="bg-quest-bg rounded-lg p-3 max-h-40 overflow-y-auto">
                    <p className="text-xs font-semibold text-quest-muted mb-2">Activity Log</p>
                    {mementoLog.length === 0 ? (
                      <p className="text-xs text-quest-muted italic">No actions yet. Modify state or save snapshots...</p>
                    ) : (
                      <div className="space-y-1">
                        {mementoLog.slice(-8).map((entry, idx) => (
                          <motion.p
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[11px] text-quest-muted"
                          >
                            &gt; {entry}
                          </motion.p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pattern structure */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Memento Pattern Structure</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-quest-bg rounded-lg p-4 border border-amber-500/20">
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">Originator</h4>
                  <p className="text-xs text-quest-muted mb-2">The object whose state we want to save (the game character).</p>
                  <div className="font-mono text-[10px] bg-quest-surface rounded p-2 text-quest-muted">
                    <p>createMemento() {'{'}</p>
                    <p>  return new Memento(</p>
                    <p>    this.health,</p>
                    <p>    this.position,</p>
                    <p>    this.inventory</p>
                    <p>  )</p>
                    <p>{'}'}</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-green-500/20">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">Memento</h4>
                  <p className="text-xs text-quest-muted mb-2">The snapshot itself. Immutable, opaque to outsiders.</p>
                  <div className="font-mono text-[10px] bg-quest-surface rounded p-2 text-quest-muted">
                    <p>class Memento {'{'}</p>
                    <p>  #state // private!</p>
                    <p>  constructor(state) {'{'}</p>
                    <p>    this.#state = freeze(state)</p>
                    <p>  {'}'}</p>
                    <p>  // No public getters</p>
                    <p>{'}'}</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-sky-500/20">
                  <h4 className="text-sm font-semibold text-sky-400 mb-2">Caretaker</h4>
                  <p className="text-xs text-quest-muted mb-2">Stores mementos. Never reads their contents.</p>
                  <div className="font-mono text-[10px] bg-quest-surface rounded p-2 text-quest-muted">
                    <p>class History {'{'}</p>
                    <p>  #snapshots = []</p>
                    <p>  push(memento) {'{'}</p>
                    <p>    this.#snapshots.push(memento)</p>
                    <p>  {'}'}</p>
                    <p>  pop() {'{ return ... }'}</p>
                    <p>{'}'}</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="memento-encapsulation" title="Why Encapsulation Matters" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The naive approach:</strong> Just expose all fields with getters and serialize them.
                This works, but now every class that saves/restores state depends on the internal structure.
                Change a field name? Every serializer breaks.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The Memento approach:</strong> The originator creates an opaque snapshot. The caretaker
                stores it but cannot read or modify it. Only the originator knows how to create and restore from
                the memento. This means internal changes only affect one class.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>In JavaScript:</strong> True encapsulation is harder (no private classes in the GoF sense),
                but you can use closures, WeakMaps, or the # private field syntax to prevent external access to
                memento contents. Libraries like Immer make immutable snapshots easy with structural sharing.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <Compass size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                State History <History size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 2: STATE HISTORY TIMELINE ============ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <History className="text-purple-400" />
              <Term
                word="State History"
                definition="A timeline of captured snapshots (mementos) that allows navigation to any previous point in an object's lifecycle. Used in undo/redo systems, time-travel debugging, and version control."
                onLearn={learnTerm}
              />
              {' '}Timeline
            </h2>

            <p className="text-quest-muted mb-6">
              The real power of Memento emerges when you build a history. Save snapshots at key moments,
              then jump to any point in time. This is how undo/redo, time-travel debugging, and game saves work.
            </p>

            {/* Timeline visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              {snapshots.length === 0 ? (
                <div className="text-center py-12">
                  <History size={48} className="mx-auto text-quest-muted/30 mb-4" />
                  <p className="text-quest-muted mb-2">No snapshots yet.</p>
                  <p className="text-sm text-quest-muted">
                    Go back to the Memento Pattern section, modify the hero, and save some snapshots first.
                  </p>
                  <button
                    onClick={() => setCurrentSection(1)}
                    className="btn-primary mt-4"
                  >
                    Go to Memento Pattern
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-sm font-semibold mb-4 text-center">Snapshot Timeline ({snapshots.length} saves)</h3>

                  {/* Horizontal timeline */}
                  <div className="relative mb-8">
                    {/* Line */}
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10" />

                    <div className="flex justify-between items-start overflow-x-auto pb-4 gap-4">
                      {snapshots.map((snap, idx) => (
                        <motion.div
                          key={snap.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex flex-col items-center min-w-[120px]"
                        >
                          {/* Dot */}
                          <button
                            onClick={() => restoreSnapshot(idx)}
                            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all hover:scale-110
                              ${activeSnapshotIdx === idx
                                ? 'border-amber-500 bg-amber-500/30 ring-2 ring-amber-500/50'
                                : 'border-white/20 bg-quest-surface hover:border-purple-500/50'}`}
                          >
                            <Save size={16} className={activeSnapshotIdx === idx ? 'text-amber-400' : 'text-quest-muted'} />
                          </button>

                          {/* Info */}
                          <div className="mt-3 text-center">
                            <p className="text-xs font-medium text-quest-text">#{idx + 1}</p>
                            <p className="text-[10px] text-quest-muted">{snap.timestamp}</p>
                            <div className="mt-1 space-y-0.5">
                              <p className="text-[9px] text-quest-muted">HP: {snap.state.health}</p>
                              <p className="text-[9px] text-quest-muted">Pos: ({snap.state.posX},{snap.state.posY})</p>
                              <p className="text-[9px] text-quest-muted">{snap.state.inventory.length} items</p>
                            </div>
                          </div>

                          {/* Restore button */}
                          <button
                            onClick={() => restoreSnapshot(idx)}
                            className="mt-2 px-2 py-1 rounded text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-400 hover:bg-purple-500/30 transition-colors"
                          >
                            Restore
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Current state comparison */}
                  <div className="bg-quest-surface rounded-lg p-4">
                    <h4 className="text-sm font-semibold mb-3">Current State</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-quest-muted text-xs">Health</p>
                        <p className={`font-bold ${character.health > 50 ? 'text-green-400' : character.health > 25 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {character.health}/100
                        </p>
                      </div>
                      <div>
                        <p className="text-quest-muted text-xs">Position</p>
                        <p className="font-bold text-blue-400">({character.posX}, {character.posY})</p>
                      </div>
                      <div>
                        <p className="text-quest-muted text-xs">Inventory</p>
                        <p className="font-bold text-purple-400">{character.inventory.length} items</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Undo/Redo concept */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Undo/Redo with Memento</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-green-400 mb-2">How Undo Works</h4>
                  <ol className="space-y-2 text-xs text-quest-muted">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">1</span>
                      Before each state change, push a memento onto the undo stack
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">2</span>
                      On undo, pop from undo stack, push current state to redo stack
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-500/20 text-green-400 rounded-full w-5 h-5 flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">3</span>
                      Restore the originator from the popped memento
                    </li>
                  </ol>
                </div>
                <div className="bg-quest-bg rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">Memory Considerations</h4>
                  <ul className="space-y-2 text-xs text-quest-muted">
                    <li>Each snapshot copies the entire state -- O(n) memory per save</li>
                    <li>For large states, use structural sharing (like Immer or persistent data structures)</li>
                    <li>Limit history depth to avoid unbounded memory growth</li>
                    <li>Consider delta compression: store only changes between snapshots</li>
                  </ul>
                </div>
              </div>
            </div>

            <DeepDive id="memento-real-world" title="Memento in Real Systems" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Redux DevTools:</strong> Every dispatched action creates a state snapshot. The time-travel
                slider lets you jump to any point. This is the Memento Pattern with the store as originator,
                the recorded states as mementos, and DevTools as the caretaker.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Database Transactions:</strong> Savepoints in SQL databases are mementos.
                <code className="mx-1 text-xs font-mono">SAVEPOINT sp1</code> captures state;
                <code className="mx-1 text-xs font-mono">ROLLBACK TO sp1</code> restores it.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Git:</strong> Each commit is a snapshot of your entire project. You can checkout any
                commit to restore to that state. Git optimizes this with content-addressable storage and
                packfiles rather than naive full copies.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Game Engines:</strong> Unity and Unreal use serialization-based save systems, but the
                concept is identical to Memento. The game object decides what state to serialize, and the
                save manager stores it without understanding the internals.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <Compass size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Visitor Pattern <UserCheck size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 3: VISITOR PATTERN ============ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Compass className="text-sky-400" />
              <Term
                word="Visitor Pattern"
                definition="A behavioral design pattern that lets you define new operations on a set of objects without changing the classes of the elements on which it operates. Visitors 'visit' each element and perform an operation."
                onLearn={learnTerm}
              />
              {' '}-- Operating Without Modifying
            </h2>

            <p className="text-quest-muted mb-6">
              You have shape objects (Circle, Rectangle, Triangle). You want to calculate area, perimeter,
              and render them -- but without adding methods to the shape classes. Select a visitor and watch
              it traverse the shapes, performing its operation on each one.
            </p>

            {/* Visitor simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4 text-center">Shape Visitor Simulation</h3>

              {/* Shapes row */}
              <div className="flex justify-center gap-6 mb-8">
                {shapes.map((shape, idx) => (
                  <motion.div
                    key={shape.type}
                    animate={visitingShapeIdx === idx ? {
                      scale: [1, 1.1, 1],
                      boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.5)', '0 0 0px rgba(59,130,246,0)'],
                    } : {}}
                    transition={visitingShapeIdx === idx ? { duration: 0.8 } : {}}
                    className={`rounded-xl border-2 p-5 text-center min-w-[130px] transition-all ${shape.border} ${shape.bg}`}
                  >
                    {/* Shape icon */}
                    <div className="mb-2">
                      {shape.type === 'Circle' && (
                        <div className="w-12 h-12 rounded-full border-2 border-blue-400 mx-auto" />
                      )}
                      {shape.type === 'Rectangle' && (
                        <div className="w-16 h-10 border-2 border-green-400 mx-auto rounded-sm" />
                      )}
                      {shape.type === 'Triangle' && (
                        <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[40px] border-l-transparent border-r-transparent border-b-purple-400 mx-auto" />
                      )}
                    </div>
                    <p className={`text-sm font-semibold ${shape.color}`}>{shape.type}</p>
                    <p className="text-[10px] text-quest-muted mt-1">
                      {shape.type === 'Circle' && `r=${shape.radius}`}
                      {shape.type === 'Rectangle' && `${shape.width}x${shape.height}`}
                      {shape.type === 'Triangle' && `b=${shape.base}, h=${shape.height}`}
                    </p>

                    {/* Visitor result */}
                    <AnimatePresence>
                      {visitorResults[idx] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="mt-3 bg-quest-surface rounded-lg p-2"
                        >
                          <p className="text-[10px] text-quest-muted">{visitorResults[idx].label}</p>
                          <p className="text-xs font-mono text-quest-text">{visitorResults[idx].value}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Visitor arrow animation */}
              {activeVisitor !== null && visitingShapeIdx !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mb-4"
                >
                  <p className="text-sm text-quest-primary">
                    {visitors[activeVisitor].name} visiting {shapes[visitingShapeIdx]?.type}...
                  </p>
                </motion.div>
              )}

              {/* Visitor selection */}
              <div className="flex justify-center gap-3 flex-wrap">
                {visitors.map((visitor, idx) => {
                  const Icon = visitor.icon
                  return (
                    <button
                      key={visitor.name}
                      onClick={() => runVisitor(idx)}
                      disabled={activeVisitor !== null && visitingShapeIdx !== null}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all disabled:opacity-50
                        ${activeVisitor === idx
                          ? `${visitor.bg} border-white/30`
                          : 'bg-quest-surface border-white/10 hover:border-white/30'}`}
                    >
                      <Icon size={16} className={visitor.color} />
                      <span className="text-sm">{visitor.name}</span>
                    </button>
                  )
                })}
                {activeVisitor !== null && (
                  <button
                    onClick={resetVisitor}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Why not just add methods? */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Why Not Just Add Methods to Shapes?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-danger/5 border border-quest-danger/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-quest-danger mb-3 flex items-center gap-2">
                    <CheckCircle size={14} /> Without Visitor (Violates OCP)
                  </h4>
                  <div className="font-mono text-[10px] bg-quest-bg rounded p-3 space-y-1 text-quest-muted">
                    <p className="text-quest-danger">// Every new operation modifies shapes</p>
                    <p>class Circle {'{'}</p>
                    <p>  area() {'{ ... }'}</p>
                    <p>  perimeter() {'{ ... }'}</p>
                    <p>  render() {'{ ... }'}</p>
                    <p className="text-quest-danger">  // New op? Edit Circle, Rect, Triangle...</p>
                    <p>{'}'}</p>
                  </div>
                  <p className="text-[10px] text-quest-danger mt-2">Adding a new operation means editing EVERY shape class.</p>
                </div>
                <div className="bg-quest-success/5 border border-quest-success/20 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-quest-success mb-3 flex items-center gap-2">
                    <CheckCircle size={14} /> With Visitor (Open/Closed)
                  </h4>
                  <div className="font-mono text-[10px] bg-quest-bg rounded p-3 space-y-1 text-quest-muted">
                    <p className="text-quest-success">// Shapes unchanged, new visitor = new op</p>
                    <p>class AreaVisitor {'{'}</p>
                    <p>  visitCircle(c) {'{ ... }'}</p>
                    <p>  visitRect(r) {'{ ... }'}</p>
                    <p>{'}'}</p>
                    <p className="text-quest-success">// New op? Just add a new visitor class!</p>
                    <p>class JsonExportVisitor {'{ ... }'}</p>
                  </div>
                  <p className="text-[10px] text-quest-success mt-2">Adding a new operation never touches shape classes.</p>
                </div>
              </div>
            </div>

            {/* Visitor pattern structure */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4">Visitor Pattern Structure</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-surface rounded-lg p-4 border border-sky-500/20">
                  <h4 className="text-xs font-semibold text-sky-400 mb-2">Element (Shape)</h4>
                  <div className="font-mono text-[10px] text-quest-muted space-y-1">
                    <p>interface Shape {'{'}</p>
                    <p>  accept(visitor: ShapeVisitor)</p>
                    <p>{'}'}</p>
                    <p className="mt-2">class Circle implements Shape {'{'}</p>
                    <p>  accept(visitor) {'{'}</p>
                    <p>    <span className="text-sky-400">visitor.visitCircle(this)</span></p>
                    <p>  {'}'}</p>
                    <p>{'}'}</p>
                  </div>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-amber-500/20">
                  <h4 className="text-xs font-semibold text-amber-400 mb-2">Visitor</h4>
                  <div className="font-mono text-[10px] text-quest-muted space-y-1">
                    <p>interface ShapeVisitor {'{'}</p>
                    <p>  visitCircle(c: Circle)</p>
                    <p>  visitRect(r: Rectangle)</p>
                    <p>  visitTriangle(t: Triangle)</p>
                    <p>{'}'}</p>
                    <p className="mt-2">class AreaCalc implements ShapeVisitor {'{'}</p>
                    <p>  visitCircle(c) {'{'}</p>
                    <p>    <span className="text-amber-400">return PI * c.r * c.r</span></p>
                    <p>  {'}'}</p>
                    <p>{'}'}</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="visitor-tradeoffs" title="Visitor Pattern Tradeoffs" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The tradeoff:</strong> Visitor makes it easy to add new operations but hard to add new
                element types. If you add a new shape (Pentagon), EVERY visitor must be updated with a
                visitPentagon method. This is the opposite tradeoff from polymorphism.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Use Visitor when:</strong> Your element hierarchy is stable (shapes rarely change) but
                you frequently add new operations (export to SVG, calculate center of mass, optimize rendering).
                Compilers are the classic example -- AST node types are stable, but analyses (type checking,
                optimization, code generation) are added frequently.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Avoid Visitor when:</strong> You frequently add new element types. In that case, the
                classic polymorphic approach (adding methods to the interface) is simpler. Also avoid it for
                simple hierarchies where a switch statement suffices -- Visitor adds structural complexity.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <Compass size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Double Dispatch <UserCheck size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 4: DOUBLE DISPATCH ============ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <UserCheck className="text-rose-400" />
              <Term
                word="Double Dispatch"
                definition="A technique where a method call is resolved based on the runtime types of TWO objects (the receiver and the argument) rather than just one. The Visitor Pattern uses double dispatch to select the correct visit method without instanceof checks."
                onLearn={learnTerm}
              />
              {' '}-- The Magic Behind Visitor
            </h2>

            <p className="text-quest-muted mb-6">
              In most languages, a method call dispatches based on the receiver's type (single dispatch).
              Visitor achieves double dispatch: the final method called depends on BOTH the shape type AND
              the visitor type. No instanceof, no type switches.
            </p>

            {/* Interactive double dispatch visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4 text-center">Double Dispatch Step-by-Step</h3>

              {/* Selectors */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-quest-muted mb-2">Choose a shape:</p>
                  <div className="flex gap-2">
                    {['Circle', 'Rectangle', 'Triangle'].map(s => (
                      <button
                        key={s}
                        onClick={() => { setDdShape(s); setDdStep(-1) }}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-colors
                          ${ddShape === s
                            ? 'bg-quest-primary/20 border-quest-primary/50 text-quest-primary'
                            : 'border-white/10 text-quest-muted hover:border-white/30'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-quest-muted mb-2">Choose a visitor:</p>
                  <div className="flex gap-2">
                    {['AreaCalculator', 'PerimeterCalculator', 'Renderer'].map(v => (
                      <button
                        key={v}
                        onClick={() => { setDdVisitor(v); setDdStep(-1) }}
                        className={`px-3 py-1.5 rounded-lg text-xs border transition-colors
                          ${ddVisitor === v
                            ? 'bg-quest-secondary/20 border-quest-secondary/50 text-quest-secondary'
                            : 'border-white/10 text-quest-muted hover:border-white/30'}`}
                      >
                        {v.replace('Calculator', 'Calc')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step visualization */}
              <div className="space-y-3 mb-6">
                {doubleDispatchSteps.map((step, idx) => {
                  const isActive = ddStep >= idx
                  const isCurrent = ddStep === idx

                  // Customize labels based on selections
                  let customLabel = step.label
                  if (idx === 0) customLabel = `Client calls ${ddShape.toLowerCase()}.accept(${ddVisitor.toLowerCase()})`
                  if (idx === 1) customLabel = `${ddShape} calls visitor.visit${ddShape}(this)`
                  if (idx === 2) customLabel = `${ddVisitor} executes ${ddShape}-specific logic`

                  return (
                    <motion.div
                      key={idx}
                      animate={isCurrent ? { scale: [1, 1.02, 1] } : {}}
                      transition={isCurrent ? { duration: 1, repeat: Infinity } : {}}
                      className={`rounded-xl border-2 p-4 transition-all duration-500
                        ${isCurrent
                          ? 'border-quest-primary/60 bg-quest-primary/10'
                          : isActive
                            ? 'border-quest-success/40 bg-quest-success/5'
                            : 'border-white/10 bg-quest-surface'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                          ${isCurrent
                            ? 'bg-quest-primary/30 text-quest-primary'
                            : isActive
                              ? 'bg-quest-success/20 text-quest-success'
                              : 'bg-white/5 text-quest-muted'}`}
                        >
                          {isActive && !isCurrent ? (
                            <CheckCircle size={16} />
                          ) : (
                            <span className="text-xs font-bold">{idx + 1}</span>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isActive ? 'text-quest-text' : 'text-quest-muted'}`}>
                            {customLabel}
                          </p>
                          <p className={`text-xs mt-1 ${isActive ? 'text-quest-muted' : 'text-quest-muted/50'}`}>
                            {step.desc}
                          </p>
                          {idx === 0 && isCurrent && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] text-quest-primary mt-2 font-mono bg-quest-primary/10 rounded px-2 py-1 inline-block"
                            >
                              1st dispatch: polymorphism selects {ddShape}.accept()
                            </motion.p>
                          )}
                          {idx === 1 && isCurrent && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] text-quest-secondary mt-2 font-mono bg-quest-secondary/10 rounded px-2 py-1 inline-block"
                            >
                              2nd dispatch: {ddShape} knows its type, calls visit{ddShape}()
                            </motion.p>
                          )}
                          {idx === 2 && isCurrent && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] text-quest-success mt-2 font-mono bg-quest-success/10 rounded px-2 py-1 inline-block"
                            >
                              Both types resolved. No instanceof needed.
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={runDoubleDispatch}
                  disabled={ddStep >= 0 && ddStep < doubleDispatchSteps.length - 1}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <UserCheck size={16} /> Run Double Dispatch
                </button>
              </div>
            </div>

            {/* Why not instanceof? */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Why Not Just Use instanceof?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-danger/5 border border-quest-danger/20 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-quest-danger mb-2">instanceof / switch (Fragile)</h4>
                  <div className="font-mono text-[10px] bg-quest-bg rounded p-3 space-y-1 text-quest-muted">
                    <p>function calcArea(shape) {'{'}</p>
                    <p>  <span className="text-quest-danger">if (shape instanceof Circle)</span></p>
                    <p>    return PI * shape.r * shape.r</p>
                    <p>  <span className="text-quest-danger">if (shape instanceof Rect)</span></p>
                    <p>    return shape.w * shape.h</p>
                    <p>  <span className="text-quest-danger">// Add new shape? Find ALL switches</span></p>
                    <p>{'}'}</p>
                  </div>
                  <p className="text-[10px] text-quest-danger mt-2">Type checks scattered across the codebase. Easy to miss one.</p>
                </div>
                <div className="bg-quest-success/5 border border-quest-success/20 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-quest-success mb-2">Double Dispatch (Robust)</h4>
                  <div className="font-mono text-[10px] bg-quest-bg rounded p-3 space-y-1 text-quest-muted">
                    <p>shapes.forEach(shape =&gt; {'{'}</p>
                    <p>  <span className="text-quest-success">shape.accept(areaVisitor)</span></p>
                    <p>  <span className="text-quest-muted">// No type checks here!</span></p>
                    <p>  <span className="text-quest-muted">// Compiler ensures completeness</span></p>
                    <p>{'}'}</p>
                    <p className="mt-1 text-quest-success">// Add new shape? Compiler tells you</p>
                    <p className="text-quest-success">// which visitors need updating</p>
                  </div>
                  <p className="text-[10px] text-quest-success mt-2">Type safety enforced at compile time. Cannot forget a case.</p>
                </div>
              </div>
            </div>

            {/* Real-world double dispatch */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4">Double Dispatch in the Wild</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    title: 'Compilers',
                    desc: 'AST visitors for type checking, optimization, and code generation. Babel, TypeScript, and ESLint all use visitor-based traversal.',
                    color: 'text-blue-400',
                    border: 'border-blue-500/20',
                  },
                  {
                    title: 'Document Processing',
                    desc: 'Export a document to PDF, HTML, or plain text. Each format is a visitor that traverses the document tree.',
                    color: 'text-green-400',
                    border: 'border-green-500/20',
                  },
                  {
                    title: 'Game Collision',
                    desc: 'Ship-vs-asteroid, bullet-vs-ship, laser-vs-shield -- double dispatch selects the right collision handler for any pair.',
                    color: 'text-rose-400',
                    border: 'border-rose-500/20',
                  },
                ].map(item => (
                  <div key={item.title} className={`bg-quest-surface rounded-lg p-4 border ${item.border}`}>
                    <h4 className={`text-xs font-semibold ${item.color} mb-2`}>{item.title}</h4>
                    <p className="text-[11px] text-quest-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="dd-languages" title="Double Dispatch Across Languages" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Languages with native multiple dispatch:</strong> Julia, Common Lisp (CLOS), and Dylan
                support multiple dispatch natively -- the runtime selects a method based on all argument types.
                In these languages, you do not need the Visitor Pattern because double dispatch is built in.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Pattern matching (modern alternative):</strong> Languages like Rust, Scala, and Kotlin
                offer pattern matching on types, which can achieve similar results more concisely than the full
                Visitor Pattern. TypeScript's discriminated unions with switch statements also provide exhaustive
                type-safe matching.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>JavaScript:</strong> Without static types, the Visitor Pattern is less common in JS.
                Instead, developers often use maps of type-name to handler function, or the Strategy Pattern.
                However, in TypeScript codebases (especially compiler-like tools), the Visitor Pattern remains
                very popular because the type system can enforce exhaustive visitation.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <Compass size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============ SECTION 5: QUIZ ============ */}
      {currentSection === 5 && (
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
              Memento and Visitor are subtle but powerful patterns. Let's see if you can distinguish their roles
              and understand when to use each one.
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
                <h3 className="text-xl font-bold mb-2">Level 42 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Memento Pattern for snapshotting and restoring state, the Visitor Pattern
                  for operating on object structures without modification, and Double Dispatch for achieving
                  type-safe polymorphic behavior. Your game saves are encapsulated, and your operations are extensible!
                </p>
                <p className="text-sm text-amber-400">
                  Remember me -- the patterns that let you travel through time and visit without trespassing.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

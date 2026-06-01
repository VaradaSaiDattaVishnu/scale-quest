import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Copy, Users, Dna, Clock, Zap } from 'lucide-react'

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

/* ── Prototype registry data ── */
const prototypeRegistry = [
  {
    id: 'warrior',
    name: 'Warrior',
    color: 'red',
    emoji: '\u2694\uFE0F',
    stats: { hp: 120, attack: 25, defense: 30, speed: 10 },
    equipment: { weapon: 'Iron Sword', armor: 'Chain Mail', accessory: 'Shield' },
    skills: ['Slash', 'Block', 'War Cry'],
  },
  {
    id: 'mage',
    name: 'Mage',
    color: 'purple',
    emoji: '\uD83E\uDDD9',
    stats: { hp: 60, attack: 40, defense: 10, speed: 20 },
    equipment: { weapon: 'Oak Staff', armor: 'Cloth Robe', accessory: 'Mana Ring' },
    skills: ['Fireball', 'Ice Shard', 'Teleport'],
  },
  {
    id: 'rogue',
    name: 'Rogue',
    color: 'green',
    emoji: '\uD83D\uDDE1\uFE0F',
    stats: { hp: 80, attack: 30, defense: 15, speed: 35 },
    equipment: { weapon: 'Twin Daggers', armor: 'Leather Vest', accessory: 'Smoke Bomb' },
    skills: ['Backstab', 'Stealth', 'Poison'],
  },
  {
    id: 'healer',
    name: 'Healer',
    color: 'sky',
    emoji: '\u2728',
    stats: { hp: 70, attack: 15, defense: 20, speed: 15 },
    equipment: { weapon: 'Holy Staff', armor: 'White Robe', accessory: 'Prayer Beads' },
    skills: ['Heal', 'Purify', 'Revive'],
  },
]

/* ── Quiz data ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the main purpose of the Prototype pattern?',
    options: [
      { id: 'a', text: 'To enforce a single instance of a class', correct: false },
      { id: 'b', text: 'To create new objects by cloning an existing prototype instead of constructing from scratch', correct: true },
      { id: 'c', text: 'To provide a simplified interface to a complex subsystem', correct: false },
      { id: 'd', text: 'To separate object construction from its representation', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What is the difference between a shallow copy and a deep copy?',
    options: [
      { id: 'a', text: 'Shallow copy duplicates all nested objects; deep copy only copies top-level fields', correct: false },
      { id: 'b', text: 'There is no difference; the terms are interchangeable', correct: false },
      { id: 'c', text: 'Shallow copy copies references to nested objects; deep copy recursively clones all nested objects', correct: true },
      { id: 'd', text: 'Deep copy only works with primitive types', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'When is the Prototype pattern MOST beneficial?',
    options: [
      { id: 'a', text: 'When objects are cheap to create from scratch', correct: false },
      { id: 'b', text: 'When object creation is expensive and many similar objects are needed', correct: true },
      { id: 'c', text: 'When you only need one instance of an object', correct: false },
      { id: 'd', text: 'When objects never need to be modified after creation', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'What is an Object Pool and how does it relate to the Prototype pattern?',
    options: [
      { id: 'a', text: 'An Object Pool stores database connections; it is unrelated to Prototype', correct: false },
      { id: 'b', text: 'An Object Pool is just another name for the Prototype pattern', correct: false },
      { id: 'c', text: 'An Object Pool pre-creates and reuses objects; prototypes can seed the pool with cloned instances', correct: true },
      { id: 'd', text: 'An Object Pool deletes unused objects automatically', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What role does a Prototype Registry serve?',
    options: [
      { id: 'a', text: 'It stores all objects ever created in the application', correct: false },
      { id: 'b', text: 'It provides a centralized catalog of pre-built prototypes that can be looked up and cloned on demand', correct: true },
      { id: 'c', text: 'It prevents objects from being cloned more than once', correct: false },
      { id: 'd', text: 'It logs every clone operation for debugging', correct: false },
    ],
  },
]

/* ── Main Level Component ── */

export default function Level33({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* Clone vs Create comparison state */
  const [createMode, setCreateMode] = useState(null) // 'scratch' | 'clone'
  const [creatingObjects, setCreatingObjects] = useState([])
  const [createTimings, setCreateTimings] = useState({ scratch: null, clone: null })
  const [isCreating, setIsCreating] = useState(false)

  /* Shallow vs Deep copy state */
  const [copyType, setCopyType] = useState(null) // 'shallow' | 'deep'
  const [original, setOriginal] = useState({
    name: 'Dragon',
    hp: 200,
    inventory: ['Flame Breath', 'Gold Hoard'],
    position: { x: 10, y: 20 },
  })
  const [clone, setClone] = useState(null)
  const [mutationApplied, setMutationApplied] = useState(false)

  /* Prototype registry state */
  const [selectedPrototype, setSelectedPrototype] = useState(null)
  const [clonedCharacters, setClonedCharacters] = useState([])
  const [customName, setCustomName] = useState('')

  /* Game character cloning visual state */
  const [spawnQueue, setSpawnQueue] = useState([])
  const [spawnedUnits, setSpawnedUnits] = useState([])
  const [isSpawning, setIsSpawning] = useState(false)

  /* Quiz state */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Clone vs Create simulation ── */
  const runCreateSimulation = (mode) => {
    if (isCreating) return
    setCreateMode(mode)
    setCreatingObjects([])
    setIsCreating(true)

    const count = 10
    const delay = mode === 'scratch' ? 400 : 60
    let created = []

    const interval = setInterval(() => {
      created = [...created, { id: created.length, time: Date.now() }]
      setCreatingObjects([...created])

      if (created.length >= count) {
        clearInterval(interval)
        setCreateTimings(prev => ({ ...prev, [mode]: created.length * delay }))
        setIsCreating(false)
      }
    }, delay)
  }

  /* ── Shallow vs Deep copy simulation ── */
  const performCopy = (type) => {
    setCopyType(type)
    setMutationApplied(false)

    if (type === 'shallow') {
      setClone({
        ...original,
        inventory: original.inventory,
        position: original.position,
      })
    } else {
      setClone({
        ...original,
        inventory: [...original.inventory],
        position: { ...original.position },
      })
    }
  }

  const applyMutation = () => {
    if (!clone) return
    setMutationApplied(true)

    if (copyType === 'shallow') {
      // Mutating clone's nested reference affects original
      const newClone = { ...clone, name: 'Wyvern' }
      newClone.inventory.push('Poison Fang')
      newClone.position.x = 99
      setClone(newClone)
      // The original's nested objects were shared, so they changed too
      setOriginal(prev => ({
        ...prev,
        inventory: newClone.inventory,
        position: newClone.position,
      }))
    } else {
      // Deep copy: mutating clone does not affect original
      setClone(prev => ({
        ...prev,
        name: 'Wyvern',
        inventory: [...prev.inventory, 'Poison Fang'],
        position: { ...prev.position, x: 99 },
      }))
    }
  }

  const resetCopy = () => {
    setCopyType(null)
    setClone(null)
    setMutationApplied(false)
    setOriginal({
      name: 'Dragon',
      hp: 200,
      inventory: ['Flame Breath', 'Gold Hoard'],
      position: { x: 10, y: 20 },
    })
  }

  /* ── Prototype registry clone ── */
  const cloneFromRegistry = () => {
    if (!selectedPrototype) return
    const proto = prototypeRegistry.find(p => p.id === selectedPrototype)
    if (!proto) return

    const cloned = {
      ...proto,
      id: `${proto.id}-${Date.now()}`,
      name: customName || `${proto.name} Clone #${clonedCharacters.length + 1}`,
      stats: { ...proto.stats },
      equipment: { ...proto.equipment },
      skills: [...proto.skills],
    }
    setClonedCharacters(prev => [...prev, cloned])
    setCustomName('')
  }

  /* ── Game character mass spawning ── */
  const startMassSpawn = () => {
    if (isSpawning) return
    setIsSpawning(true)
    setSpawnedUnits([])

    const types = ['warrior', 'mage', 'rogue', 'healer']
    const total = 20
    let spawned = []

    const interval = setInterval(() => {
      const typeIdx = spawned.length % types.length
      const proto = prototypeRegistry[typeIdx]
      spawned = [
        ...spawned,
        {
          id: spawned.length,
          type: proto.id,
          emoji: proto.emoji,
          name: `${proto.name} #${Math.floor(spawned.length / 4) + 1}`,
          color: proto.color,
        },
      ]
      setSpawnedUnits([...spawned])

      if (spawned.length >= total) {
        clearInterval(interval)
        setIsSpawning(false)
      }
    }, 120)
  }

  /* ── Quiz submit ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (onComplete) onComplete()
  }

  const colorMap = {
    red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', ring: 'ring-red-500/20' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', ring: 'ring-purple-500/20' },
    green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', ring: 'ring-green-500/20' },
    sky: { bg: 'bg-sky-500/20', text: 'text-sky-400', border: 'border-sky-500/30', ring: 'ring-sky-500/20' },
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* ── Progress Nav ── */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {['Story', 'Clone vs Create', 'Shallow vs Deep', 'Registry & Spawning', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${currentSection === i
                ? 'bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/30'
                : currentSection > i
                  ? 'bg-quest-success/20 text-quest-success'
                  : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {currentSection > i && <CheckCircle size={12} className="inline mr-1" />}
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: STORY ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <Dna size={28} className="text-sky-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Clone Wars</h2>
                <p className="text-quest-muted text-sm">Level 33 &mdash; The Prototype Pattern</p>
              </div>
            </div>

            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-orange-500/20">
              <h3 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <Clock size={18} />
                The Problem
              </h3>
              <p className="text-quest-muted text-sm leading-relaxed">
                Your team is building a massive multiplayer RPG. Creating each game character takes{' '}
                <strong className="text-orange-400">2 seconds of loading</strong> &mdash; reading textures from
                disk, parsing animation data, computing physics meshes, and initializing AI state. Players are
                spawning hundreds of enemies per level. Loading times are unbearable and players are leaving in droves.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <p className="text-xs text-orange-300 font-mono">
                  [PERF WARNING] Level load: 200 enemies x 2s = 400s total construction time
                </p>
                <p className="text-xs text-orange-300 font-mono mt-1">
                  [PLAYER REPORT] "I alt-tabbed during loading and forgot I was playing"
                </p>
              </div>
            </div>

            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-green-500/20">
              <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Copy size={18} />
                The Solution: Prototype Pattern
              </h3>
              <p className="text-quest-muted text-sm leading-relaxed mb-3">
                Instead of constructing every object from scratch, build one{' '}
                <Term word="Prototype" definition="A fully-initialized instance that serves as a template. New objects are created by copying (cloning) the prototype rather than constructing from scratch." onLearn={learnTerm} />{' '}
                of each character type once, then{' '}
                <Term word="Clone" definition="Creating a new object by copying an existing prototype's state. Much faster than full construction when initialization is expensive." onLearn={learnTerm} />{' '}
                it whenever you need a new instance. Cloning copies memory directly &mdash; no disk reads,
                no parsing, no recomputation. A 2-second construction becomes a 5-millisecond clone.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                  <p className="text-xs text-red-400 font-semibold mb-1">Without Prototype</p>
                  <p className="text-2xl font-bold text-red-400">400s</p>
                  <p className="text-[10px] text-quest-muted">200 enemies x 2s each</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-center">
                  <p className="text-xs text-green-400 font-semibold mb-1">With Prototype</p>
                  <p className="text-2xl font-bold text-green-400">9s</p>
                  <p className="text-[10px] text-quest-muted">4 prototypes x 2s + 200 clones x 5ms</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-quest-muted leading-relaxed">
              The{' '}
              <Term word="Prototype Pattern" definition="A creational design pattern that creates new objects by cloning existing instances (prototypes) rather than calling constructors. Part of the Gang of Four patterns." onLearn={learnTerm} />{' '}
              is a creational design pattern from the Gang of Four. It decouples object creation from the concrete
              classes involved. Key concepts include{' '}
              <Term word="Shallow Copy" definition="A copy where top-level fields are duplicated but nested objects/references are shared between original and clone. Changes to nested objects affect both." onLearn={learnTerm} />,{' '}
              <Term word="Deep Copy" definition="A copy where all fields, including nested objects, are recursively duplicated. The clone is completely independent of the original." onLearn={learnTerm} />,{' '}
              the{' '}
              <Term word="Cloneable" definition="An interface (like Java's Cloneable) that marks a class as supporting the clone() operation. The class implements how it should be copied." onLearn={learnTerm} />{' '}
              interface, the{' '}
              <Term word="Object Pool" definition="A set of pre-initialized, reusable objects. Instead of creating and destroying objects, you check them out from and return them to the pool. Often seeded using the Prototype pattern." onLearn={learnTerm} />,{' '}
              and the{' '}
              <Term word="Registry" definition="A centralized store of named prototypes. Clients request clones by name/key without knowing the concrete class. Also called a Prototype Manager." onLearn={learnTerm} />.
            </p>

            <DeepDive id="prototype-history" title="Prototype Pattern in the Real World" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">JavaScript is prototype-based:</strong> Unlike classical OOP
                  languages, JavaScript uses prototypal inheritance natively. Every object has an internal [[Prototype]]
                  link. When you call Object.create(proto), you are literally using the Prototype pattern &mdash;
                  creating a new object with proto as its prototype.
                </p>
                <p>
                  <strong className="text-quest-text">Game engines:</strong> Unity uses Prefabs (essentially prototypes)
                  that you Instantiate(). Unreal Engine has Class Default Objects (CDOs). Both avoid re-parsing assets
                  by cloning pre-built templates.
                </p>
                <p>
                  <strong className="text-quest-text">Databases:</strong> Template rows or document prototypes in MongoDB
                  can serve as pre-configured starting points. AWS CloudFormation templates are prototypes for
                  infrastructure.
                </p>
                <p>
                  <strong className="text-quest-text">Spreadsheets:</strong> Every time you duplicate a sheet in Excel
                  or Google Sheets, you are using the Prototype pattern &mdash; cloning all formulas, formatting,
                  and data in one operation.
                </p>
              </div>
            </DeepDive>

            <button onClick={() => setCurrentSection(1)} className="btn-primary w-full flex items-center justify-center gap-2">
              See It In Action
              <Zap size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: CLONE vs CREATE ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Clock className="text-sky-400" />
              Clone vs Create &mdash; Speed Comparison
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              Watch the difference between constructing 10 objects from scratch versus cloning them
              from a prototype. Each bar represents one object being created.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Create from scratch */}
              <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-red-400">From Scratch</h3>
                  {createTimings.scratch && (
                    <span className="text-xs text-red-400 font-mono">{createTimings.scratch}ms</span>
                  )}
                </div>
                <p className="text-[11px] text-quest-muted mb-3">
                  Each object: load textures, parse data, compute meshes, init AI...
                </p>
                <button
                  onClick={() => runCreateSimulation('scratch')}
                  disabled={isCreating}
                  className="btn-secondary w-full mb-3 text-xs disabled:opacity-50"
                >
                  {isCreating && createMode === 'scratch' ? 'Constructing...' : 'Build 10 From Scratch'}
                </button>
                <div className="space-y-1.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="h-5 rounded bg-quest-surface overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: createMode === 'scratch' && creatingObjects.length > i ? '100%' : '0%',
                        }}
                        transition={{ duration: 0.35 }}
                        className="h-full bg-gradient-to-r from-red-500/60 to-red-400/40 rounded flex items-center justify-end pr-1"
                      >
                        {createMode === 'scratch' && creatingObjects.length > i && (
                          <span className="text-[9px] text-white/80 font-mono">400ms</span>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clone from prototype */}
              <div className="bg-quest-bg rounded-xl p-5 border border-green-500/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-green-400">Clone Prototype</h3>
                  {createTimings.clone && (
                    <span className="text-xs text-green-400 font-mono">{createTimings.clone}ms</span>
                  )}
                </div>
                <p className="text-[11px] text-quest-muted mb-3">
                  Each clone: copy memory block, assign new ID, done.
                </p>
                <button
                  onClick={() => runCreateSimulation('clone')}
                  disabled={isCreating}
                  className="btn-secondary w-full mb-3 text-xs disabled:opacity-50"
                >
                  {isCreating && createMode === 'clone' ? 'Cloning...' : 'Clone 10 From Prototype'}
                </button>
                <div className="space-y-1.5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div key={i} className="h-5 rounded bg-quest-surface overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: createMode === 'clone' && creatingObjects.length > i ? '100%' : '0%',
                        }}
                        transition={{ duration: 0.05 }}
                        className="h-full bg-gradient-to-r from-green-500/60 to-green-400/40 rounded flex items-center justify-end pr-1"
                      >
                        {createMode === 'clone' && creatingObjects.length > i && (
                          <span className="text-[9px] text-white/80 font-mono">60ms</span>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {createTimings.scratch && createTimings.clone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center"
              >
                <p className="text-sm font-semibold text-green-400 mb-1">
                  Cloning was ~{Math.round(createTimings.scratch / createTimings.clone)}x faster!
                </p>
                <p className="text-xs text-quest-muted">
                  In real systems, the speedup can be 100x or more when construction involves I/O, parsing, or heavy computation.
                </p>
              </motion.div>
            )}

            <DeepDive id="clone-internals" title="How Cloning Works Under the Hood" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Memory Copy:</strong> At the lowest level, cloning an object
                  means copying a contiguous block of memory. The OS can do this extremely fast using memcpy
                  or similar operations &mdash; far faster than re-executing constructor logic.
                </p>
                <p>
                  <strong className="text-quest-text">Java's clone():</strong> Java provides Object.clone() which
                  performs a shallow copy at the JVM level. Classes implement Cloneable and override clone() to
                  add deep copy logic for mutable fields. The method bypasses constructors entirely.
                </p>
                <p>
                  <strong className="text-quest-text">Copy-on-Write (COW):</strong> An optimization where the clone
                  shares the original's data until one of them modifies it. Linux uses COW for fork().
                  This makes cloning nearly free if the clone is only read, not written.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Shallow vs Deep
                <ChevronDown size={18} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: SHALLOW vs DEEP COPY ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Copy className="text-sky-400" />
              Shallow vs Deep Copy Visualizer
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              See what happens when you clone an object with nested references. Choose a copy type,
              then mutate the clone to see whether the original is affected.
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => { resetCopy(); performCopy('shallow') }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copyType === 'shallow'
                    ? 'bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/30'
                    : 'bg-quest-surface text-quest-muted hover:text-quest-text'
                }`}
              >
                Shallow Copy
              </button>
              <button
                onClick={() => { resetCopy(); performCopy('deep') }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  copyType === 'deep'
                    ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/30'
                    : 'bg-quest-surface text-quest-muted hover:text-quest-text'
                }`}
              >
                Deep Copy
              </button>
              {clone && !mutationApplied && (
                <button
                  onClick={applyMutation}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 ring-1 ring-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  Mutate Clone
                </button>
              )}
              {(clone || copyType) && (
                <button
                  onClick={resetCopy}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-quest-surface text-quest-muted hover:text-quest-text transition-all"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Object visualization */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Original */}
              <div className={`bg-quest-bg rounded-xl p-5 border transition-all ${
                mutationApplied && copyType === 'shallow'
                  ? 'border-red-500/40 ring-1 ring-red-500/10'
                  : 'border-white/10'
              }`}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500" />
                  Original Object
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between p-2 rounded bg-quest-surface">
                    <span className="text-quest-muted">name:</span>
                    <span className="text-sky-400">"{original.name}"</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-quest-surface">
                    <span className="text-quest-muted">hp:</span>
                    <span className="text-sky-400">{original.hp}</span>
                  </div>
                  <div className={`p-2 rounded transition-colors ${
                    mutationApplied && copyType === 'shallow' ? 'bg-red-500/20 border border-red-500/30' : 'bg-quest-surface'
                  }`}>
                    <div className="flex justify-between mb-1">
                      <span className="text-quest-muted">inventory:</span>
                      <span className="text-yellow-400 text-[10px]">
                        {copyType === 'shallow' ? 'SHARED REF' : copyType === 'deep' ? 'OWN COPY' : 'Array'}
                      </span>
                    </div>
                    <div className="pl-2 text-[11px] text-quest-muted">
                      [{original.inventory.map((item, i) => (
                        <span key={i}>
                          "{item}"{i < original.inventory.length - 1 ? ', ' : ''}
                        </span>
                      ))}]
                    </div>
                  </div>
                  <div className={`p-2 rounded transition-colors ${
                    mutationApplied && copyType === 'shallow' ? 'bg-red-500/20 border border-red-500/30' : 'bg-quest-surface'
                  }`}>
                    <div className="flex justify-between mb-1">
                      <span className="text-quest-muted">position:</span>
                      <span className="text-yellow-400 text-[10px]">
                        {copyType === 'shallow' ? 'SHARED REF' : copyType === 'deep' ? 'OWN COPY' : 'Object'}
                      </span>
                    </div>
                    <div className="pl-2 text-[11px] text-quest-muted">
                      {'{ '}x: {original.position.x}, y: {original.position.y}{' }'}
                    </div>
                  </div>
                </div>
                {mutationApplied && copyType === 'shallow' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-red-400 mt-3 font-semibold"
                  >
                    Original was affected! Nested references are shared.
                  </motion.p>
                )}
              </div>

              {/* Clone */}
              <div className={`bg-quest-bg rounded-xl p-5 border transition-all ${
                clone
                  ? copyType === 'deep'
                    ? 'border-green-500/30'
                    : 'border-orange-500/30'
                  : 'border-white/5'
              }`}>
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${clone ? copyType === 'deep' ? 'bg-green-500' : 'bg-orange-500' : 'bg-quest-muted/30'}`} />
                  {clone ? `Clone (${copyType === 'shallow' ? 'Shallow' : 'Deep'})` : 'No Clone Yet'}
                </h3>
                {clone ? (
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between p-2 rounded bg-quest-surface">
                      <span className="text-quest-muted">name:</span>
                      <span className={mutationApplied ? 'text-yellow-400' : 'text-sky-400'}>"{clone.name}"</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-quest-surface">
                      <span className="text-quest-muted">hp:</span>
                      <span className="text-sky-400">{clone.hp}</span>
                    </div>
                    <div className={`p-2 rounded ${
                      mutationApplied ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-quest-surface'
                    }`}>
                      <div className="flex justify-between mb-1">
                        <span className="text-quest-muted">inventory:</span>
                        <span className={`text-[10px] ${
                          copyType === 'shallow' ? 'text-orange-400' : 'text-green-400'
                        }`}>
                          {copyType === 'shallow' ? 'SAME REF as original' : 'INDEPENDENT COPY'}
                        </span>
                      </div>
                      <div className="pl-2 text-[11px] text-quest-muted">
                        [{clone.inventory.map((item, i) => (
                          <span key={i}>
                            "{item}"{i < clone.inventory.length - 1 ? ', ' : ''}
                          </span>
                        ))}]
                      </div>
                    </div>
                    <div className={`p-2 rounded ${
                      mutationApplied ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-quest-surface'
                    }`}>
                      <div className="flex justify-between mb-1">
                        <span className="text-quest-muted">position:</span>
                        <span className={`text-[10px] ${
                          copyType === 'shallow' ? 'text-orange-400' : 'text-green-400'
                        }`}>
                          {copyType === 'shallow' ? 'SAME REF as original' : 'INDEPENDENT COPY'}
                        </span>
                      </div>
                      <div className="pl-2 text-[11px] text-quest-muted">
                        {'{ '}x: {clone.position.x}, y: {clone.position.y}{' }'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 text-quest-muted text-sm">
                    Choose a copy type above
                  </div>
                )}
                {mutationApplied && copyType === 'deep' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[11px] text-green-400 mt-3 font-semibold"
                  >
                    Original unaffected! Deep copy created independent references.
                  </motion.p>
                )}
              </div>
            </div>

            {/* Reference diagram */}
            {copyType && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6"
              >
                <h4 className="text-sm font-semibold mb-3">Memory Reference Diagram</h4>
                <div className="flex items-start justify-center gap-12">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center mb-2">
                      <span className="text-xs font-mono text-sky-400">Original</span>
                    </div>
                    <div className="w-px h-8 bg-sky-500/30 mx-auto" />
                    <div className="w-24 h-10 rounded bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-sky-300">nested data</span>
                    </div>
                  </div>
                  <div className="pt-6 text-quest-muted text-xs flex flex-col items-center gap-1">
                    {copyType === 'shallow' ? (
                      <>
                        <span className="text-orange-400 font-semibold">Shallow</span>
                        <span>references point</span>
                        <span>to SAME object</span>
                      </>
                    ) : (
                      <>
                        <span className="text-green-400 font-semibold">Deep</span>
                        <span>each has its</span>
                        <span>OWN copy</span>
                      </>
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`w-20 h-20 rounded-lg flex items-center justify-center mb-2 ${
                      copyType === 'shallow'
                        ? 'bg-orange-500/20 border border-orange-500/30'
                        : 'bg-green-500/20 border border-green-500/30'
                    }`}>
                      <span className={`text-xs font-mono ${
                        copyType === 'shallow' ? 'text-orange-400' : 'text-green-400'
                      }`}>Clone</span>
                    </div>
                    <div className={`w-px h-8 mx-auto ${
                      copyType === 'shallow' ? 'bg-orange-500/30' : 'bg-green-500/30'
                    }`} />
                    {copyType === 'shallow' ? (
                      <div className="text-[10px] text-orange-400 font-mono">
                        points to same nested data
                      </div>
                    ) : (
                      <div className="w-24 h-10 rounded bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <span className="text-[10px] font-mono text-green-300">own nested data</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <DeepDive id="copy-strategies" title="Copying Strategies in Different Languages" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">JavaScript:</strong> Object.assign() and the spread operator
                  perform shallow copies. For deep copies, use structuredClone() (modern) or JSON.parse(JSON.stringify())
                  (limited: loses functions, dates become strings, no circular refs).
                </p>
                <p>
                  <strong className="text-quest-text">Python:</strong> copy.copy() is shallow; copy.deepcopy() is
                  deep. Python's deepcopy handles circular references by tracking already-copied objects in a memo dict.
                </p>
                <p>
                  <strong className="text-quest-text">Java:</strong> Object.clone() is shallow by default. You must
                  override clone() and manually deep-copy mutable fields. Alternatively, use serialization:
                  serialize to bytes, then deserialize to get a deep copy. Libraries like Apache Commons' SerializationUtils
                  make this easier.
                </p>
                <p>
                  <strong className="text-quest-text">Rust:</strong> Clone trait for deep copies, Copy trait for
                  bitwise (stack) copies. The type system ensures you always know which kind of copy you are getting.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Registry & Spawning
                <ChevronDown size={18} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: REGISTRY & SPAWNING ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Users className="text-sky-400" />
              Prototype Registry
            </h2>
            <p className="text-sm text-quest-muted mb-6">
              A registry stores pre-built prototypes by name. Select a prototype, give it a custom name,
              and clone it. Each clone gets its own deep-copied stats and equipment.
            </p>

            {/* Registry grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {prototypeRegistry.map(proto => {
                const c = colorMap[proto.color]
                const isSelected = selectedPrototype === proto.id
                return (
                  <motion.button
                    key={proto.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedPrototype(proto.id)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      isSelected
                        ? `${c.bg} ${c.border} ring-1 ${c.ring}`
                        : 'bg-quest-bg border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl mb-2">{proto.emoji}</div>
                    <p className={`text-sm font-semibold ${isSelected ? c.text : 'text-quest-text'}`}>
                      {proto.name}
                    </p>
                    <div className="mt-2 text-[10px] text-quest-muted space-y-0.5">
                      <p>HP: {proto.stats.hp} | ATK: {proto.stats.attack}</p>
                      <p>DEF: {proto.stats.defense} | SPD: {proto.stats.speed}</p>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Clone controls */}
            {selectedPrototype && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-quest-bg rounded-xl p-5 border border-white/10 mb-6"
              >
                <h4 className="text-sm font-semibold mb-3">Clone & Customize</h4>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    placeholder={`${prototypeRegistry.find(p => p.id === selectedPrototype)?.name} Clone #${clonedCharacters.length + 1}`}
                    className="flex-1 px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm text-quest-text placeholder:text-quest-muted/50 focus:outline-none focus:border-sky-500/50"
                  />
                  <button
                    onClick={cloneFromRegistry}
                    className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap"
                  >
                    <Copy size={16} />
                    Clone
                  </button>
                </div>
              </motion.div>
            )}

            {/* Cloned characters display */}
            {clonedCharacters.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-quest-muted">
                  Cloned Characters ({clonedCharacters.length})
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <AnimatePresence>
                    {clonedCharacters.map(char => {
                      const c = colorMap[char.color]
                      return (
                        <motion.div
                          key={char.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className={`p-3 rounded-lg ${c.bg} border ${c.border}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{char.emoji}</span>
                            <span className={`text-xs font-semibold ${c.text}`}>{char.name}</span>
                          </div>
                          <div className="text-[10px] text-quest-muted">
                            <p>{char.equipment.weapon} | {char.equipment.armor}</p>
                            <p className="mt-0.5">{char.skills.join(', ')}</p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* ── Mass Spawning Section ── */}
            <div className="border-t border-white/5 pt-6 mt-6">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Zap className="text-yellow-400" />
                Mass Character Spawning
              </h2>
              <p className="text-sm text-quest-muted mb-4">
                Watch 20 game units spawn in rapid succession by cloning from the prototype registry.
                Each unit is a deep copy that can be independently customized.
              </p>

              <button
                onClick={startMassSpawn}
                disabled={isSpawning}
                className="btn-primary mb-4 flex items-center gap-2 disabled:opacity-50"
              >
                <Users size={16} />
                {isSpawning ? 'Spawning...' : 'Spawn 20 Units'}
              </button>

              {/* Spawn grid */}
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
                {Array.from({ length: 20 }, (_, i) => {
                  const unit = spawnedUnits[i]
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={unit ? { opacity: 1, scale: 1 } : { opacity: 0.15, scale: 0.9 }}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-colors ${
                        unit
                          ? `${colorMap[unit.color]?.bg} border ${colorMap[unit.color]?.border}`
                          : 'bg-quest-surface border border-white/5'
                      }`}
                    >
                      {unit ? (
                        <>
                          <span className="text-lg">{unit.emoji}</span>
                          <span className="text-[8px] text-quest-muted mt-0.5 truncate w-full text-center px-1">
                            {unit.name}
                          </span>
                        </>
                      ) : (
                        <span className="text-quest-muted/30 text-lg">?</span>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {spawnedUnits.length === 20 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center mb-6"
                >
                  <p className="text-sm font-semibold text-green-400">
                    20 units spawned in ~{(20 * 120 / 1000).toFixed(1)}s via cloning
                  </p>
                  <p className="text-xs text-quest-muted mt-1">
                    From scratch at 2s each that would be 40 seconds. Prototype pattern made it instant.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Object Pool deep dive */}
            <DeepDive id="object-pool" title="Object Pool: Recycling Clones" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Pool Pattern:</strong> Rather than cloning a new object
                  every time and garbage-collecting dead ones, maintain a pool of pre-cloned objects. When you
                  need one, check it out from the pool. When done, return it. No allocation, no GC pressure.
                </p>
                <p>
                  <strong className="text-quest-text">Prototype + Pool:</strong> Use the Prototype pattern to seed
                  the pool. At startup, clone 50 enemies from the prototype and put them in the pool. During
                  gameplay, check out enemies as needed, reset their state, and return them when defeated.
                </p>
                <p>
                  <strong className="text-quest-text">Real examples:</strong> Database connection pools (HikariCP),
                  thread pools (Java ExecutorService), HTTP client connection pools, Unity's ObjectPool API,
                  bullet pools in shooters (thousands of bullets recycled per second).
                </p>
                <p>
                  <strong className="text-quest-text">Trade-offs:</strong> Pools add complexity: you must manage
                  lifecycle, reset state properly, handle pool exhaustion, and size the pool correctly.
                  Only use pools when allocation/GC is a measured bottleneck.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="registry-pattern" title="Registry Pattern in Depth" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">What it is:</strong> A Prototype Registry (also called
                  Prototype Manager) is a centralized map of name-to-prototype pairs. Clients request clones
                  by key, e.g., registry.getClone("warrior"), without knowing the concrete class.
                </p>
                <p>
                  <strong className="text-quest-text">Dynamic registration:</strong> Prototypes can be added at
                  runtime. A level editor might let designers create new enemy types that get registered
                  as prototypes, instantly available for cloning without code changes.
                </p>
                <p>
                  <strong className="text-quest-text">Configuration-driven:</strong> Load prototype definitions
                  from JSON/YAML config files. The registry parses the config, constructs prototypes once,
                  and then serves clones. This is how many game engines handle asset instantiation.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <CheckCircle size={18} />
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
              <CheckCircle className="text-sky-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Prototypes, clones, and registries &mdash; let's see how well you absorbed the pattern.
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
                <h3 className="text-xl font-bold mb-2">Level 33 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Prototype pattern, shallow vs deep copying, prototype registries,
                  and object pools. Your game characters will clone in milliseconds, not seconds.
                </p>
                <p className="text-sm text-sky-400">
                  The Clone Wars are won. Your players can finally stop alt-tabbing during load screens.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

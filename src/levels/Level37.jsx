import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle, Feather,
  Database, MemoryStick, TreePine, Type, ArrowRight, Copy,
  Layers, Hash, Minus, Plus
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

/* ── Constants ── */

const CHAR_OBJECT_SIZE = 64 // bytes per naive char object
const FLYWEIGHT_CHAR_SIZE = 2 // bytes per shared char reference + extrinsic
const FLYWEIGHT_POOL_OVERHEAD = 256 // bytes for the pool itself (unique chars)

const sampleText = 'The Flyweight pattern shares objects to reduce memory when many similar objects exist in a system.'

const treeTypes = [
  { id: 'oak', name: 'Oak', color: '#4ade80', meshSize: '2.4 MB', textureSize: '1.8 MB', totalIntrinsic: 4.2 },
  { id: 'pine', name: 'Pine', color: '#22d3ee', meshSize: '1.9 MB', textureSize: '1.2 MB', totalIntrinsic: 3.1 },
  { id: 'birch', name: 'Birch', color: '#fbbf24', meshSize: '2.1 MB', textureSize: '1.5 MB', totalIntrinsic: 3.6 },
  { id: 'maple', name: 'Maple', color: '#f87171', meshSize: '2.6 MB', textureSize: '2.0 MB', totalIntrinsic: 4.6 },
]

const forestTrees = [
  { typeId: 'oak', x: 12, y: 25, scale: 0.9 },
  { typeId: 'pine', x: 28, y: 18, scale: 1.1 },
  { typeId: 'oak', x: 45, y: 30, scale: 0.8 },
  { typeId: 'birch', x: 62, y: 22, scale: 1.0 },
  { typeId: 'pine', x: 78, y: 28, scale: 0.7 },
  { typeId: 'maple', x: 18, y: 55, scale: 1.2 },
  { typeId: 'oak', x: 35, y: 60, scale: 0.85 },
  { typeId: 'birch', x: 52, y: 50, scale: 1.05 },
  { typeId: 'pine', x: 70, y: 58, scale: 0.95 },
  { typeId: 'maple', x: 85, y: 45, scale: 1.15 },
  { typeId: 'oak', x: 22, y: 75, scale: 0.75 },
  { typeId: 'pine', x: 40, y: 70, scale: 1.0 },
  { typeId: 'birch', x: 58, y: 78, scale: 0.9 },
  { typeId: 'maple', x: 75, y: 72, scale: 1.1 },
  { typeId: 'oak', x: 90, y: 65, scale: 0.8 },
  { typeId: 'pine', x: 8, y: 42, scale: 1.0 },
]

const EXTRINSIC_PER_TREE = 0.024 // 24 KB for position, scale, rotation

const quizQuestions = [
  {
    id: 'q1',
    question: 'Which state is shared across all flyweight instances?',
    options: [
      { id: 'a', text: 'Extrinsic state (position, context)', correct: false },
      { id: 'b', text: 'Intrinsic state (shared, immutable data)', correct: true },
      { id: 'c', text: 'Mutable state (changes per instance)', correct: false },
      { id: 'd', text: 'Session state (user-specific data)', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'How does the Flyweight pattern differ from the Singleton pattern?',
    options: [
      { id: 'a', text: 'They are the same pattern with different names', correct: false },
      { id: 'b', text: 'Singleton has one instance total; Flyweight shares many instances keyed by intrinsic state', correct: true },
      { id: 'c', text: 'Flyweight has one instance total; Singleton has many', correct: false },
      { id: 'd', text: 'Singleton is for memory savings; Flyweight is for thread safety', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'When is the Flyweight pattern most beneficial?',
    options: [
      { id: 'a', text: 'When you have a few large, unique objects', correct: false },
      { id: 'b', text: 'When all object state is unique and cannot be shared', correct: false },
      { id: 'c', text: 'When many objects share common data and memory is a constraint', correct: true },
      { id: 'd', text: 'When objects need to be created and destroyed frequently', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'In a text editor using flyweight, what is extrinsic state for each character?',
    options: [
      { id: 'a', text: 'The font glyph bitmap and Unicode codepoint', correct: false },
      { id: 'b', text: 'The position in the document, font size, and color at that location', correct: true },
      { id: 'c', text: 'The character code shared across all instances', correct: false },
      { id: 'd', text: 'The flyweight pool that stores characters', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'Which real-world system commonly uses the Flyweight pattern?',
    options: [
      { id: 'a', text: 'A simple key-value store with unique entries', correct: false },
      { id: 'b', text: 'A game engine rendering thousands of trees/particles with shared meshes and textures', correct: true },
      { id: 'c', text: 'A single-user desktop calculator app', correct: false },
      { id: 'd', text: 'A CRUD API with no caching', correct: false },
    ],
  },
]

/* ── Main Component ── */

export default function Level37({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  // Section 1: Text editor simulation
  const [editorMode, setEditorMode] = useState('naive') // 'naive' | 'flyweight'
  const [charCount, setCharCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typedText, setTypedText] = useState('')

  // Section 2: Forest / intrinsic vs extrinsic
  const [selectedTree, setSelectedTree] = useState(null)
  const [showSharedState, setShowSharedState] = useState(false)

  // Section 3: Flyweight pool
  const [poolHighlight, setPoolHighlight] = useState(null)

  // Section 4: Memory calculator
  const [calcObjects, setCalcObjects] = useState(10000)
  const [calcUniqueTypes, setCalcUniqueTypes] = useState(50)
  const [calcObjectSize, setCalcObjectSize] = useState(1024) // bytes
  const [calcExtrinsicSize, setCalcExtrinsicSize] = useState(32) // bytes

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return
    if (charCount >= sampleText.length) {
      setIsTyping(false)
      return
    }
    const timer = setTimeout(() => {
      setCharCount(prev => prev + 1)
      setTypedText(sampleText.slice(0, charCount + 1))
    }, 35)
    return () => clearTimeout(timer)
  }, [isTyping, charCount])

  const startTyping = useCallback(() => {
    setCharCount(0)
    setTypedText('')
    setIsTyping(true)
  }, [])

  const resetTyping = useCallback(() => {
    setCharCount(0)
    setTypedText('')
    setIsTyping(false)
  }, [])

  // Memory calculations for text editor
  const naiveMemory = charCount * CHAR_OBJECT_SIZE
  const uniqueChars = new Set(typedText.toLowerCase()).size
  const flyweightMemory = FLYWEIGHT_POOL_OVERHEAD + (charCount * FLYWEIGHT_CHAR_SIZE)
  const memorySavingsPercent = naiveMemory > 0
    ? Math.round(((naiveMemory - flyweightMemory) / naiveMemory) * 100)
    : 0

  // Memory calculations for forest
  const computeForestMemory = useCallback((useFlyweight) => {
    if (useFlyweight) {
      const uniqueTypes = [...new Set(forestTrees.map(t => t.typeId))]
      const intrinsicTotal = uniqueTypes.reduce((sum, tid) => {
        const tt = treeTypes.find(t => t.id === tid)
        return sum + (tt ? tt.totalIntrinsic : 0)
      }, 0)
      const extrinsicTotal = forestTrees.length * EXTRINSIC_PER_TREE
      return { intrinsic: intrinsicTotal, extrinsic: extrinsicTotal, total: intrinsicTotal + extrinsicTotal }
    }
    const total = forestTrees.reduce((sum, ft) => {
      const tt = treeTypes.find(t => t.id === ft.typeId)
      return sum + (tt ? tt.totalIntrinsic : 0) + EXTRINSIC_PER_TREE
    }, 0)
    return { total }
  }, [])

  const forestNaive = computeForestMemory(false)
  const forestFlyweight = computeForestMemory(true)

  // Build flyweight pool from typed text
  const flyweightPool = {}
  for (const ch of typedText) {
    const key = ch.toLowerCase()
    if (!flyweightPool[key]) flyweightPool[key] = { char: ch, refCount: 0 }
    flyweightPool[key].refCount++
  }

  // Memory calculator
  const calcNaiveTotal = calcObjects * calcObjectSize
  const calcFlyweightTotal = (calcUniqueTypes * calcObjectSize) + (calcObjects * calcExtrinsicSize)
  const calcSavings = calcNaiveTotal - calcFlyweightTotal
  const calcSavingsPercent = calcNaiveTotal > 0 ? Math.round((calcSavings / calcNaiveTotal) * 100) : 0

  const formatBytes = (bytes) => {
    if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB'
    if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB'
    if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return bytes + ' B'
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (!isCompleted) onComplete?.()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-quest-surface rounded-full border border-white/10 mb-4">
          <Feather size={16} className="text-emerald-400" />
          <span className="text-sm font-medium">Level 37</span>
        </div>
        <h1 className="text-4xl font-bold mb-2">Sharing is Caring</h1>
        <p className="text-lg text-quest-muted">The Flyweight Pattern</p>
      </motion.div>

      {/* ── Section Navigation ── */}
      <div className="flex justify-center gap-2 flex-wrap">
        {['The Problem', 'Intrinsic vs Extrinsic', 'Flyweight Pool', 'Memory Calculator', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${currentSection === i
                ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                : 'bg-quest-surface border border-white/10 text-quest-muted hover:border-white/30'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: THE PROBLEM ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Type className="text-emerald-400" />
              The Text Editor Memory Crisis
            </h2>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-red-500/20">
              <p className="text-sm text-quest-muted italic mb-4">
                "Your text editor creates a new object for each character. With a million characters,
                you are out of memory."
              </p>
              <div className="flex items-center gap-3 text-xs text-quest-muted">
                <Database size={14} className="text-red-400" />
                <span>Each character object: font, size, color, Unicode point, position, styling...</span>
              </div>
            </div>

            <p className="text-quest-muted mb-6">
              The{' '}
              <Term
                word="Flyweight Pattern"
                definition="A structural design pattern that minimizes memory usage by sharing as much data as possible between similar objects. Instead of each object storing all its data, common (intrinsic) data is stored once and shared."
                onLearn={learnTerm}
              />{' '}
              solves this by splitting object state into two categories:{' '}
              <Term
                word="Intrinsic State"
                definition="The shared, immutable part of a flyweight object. This state is context-independent and can be shared across all instances. Example: the glyph bitmap for the letter 'A'."
                onLearn={learnTerm}
              />{' '}
              (shared data like glyph bitmaps) and{' '}
              <Term
                word="Extrinsic State"
                definition="The unique, context-dependent part of a flyweight's state. This data varies per instance and is passed in by the client rather than stored in the flyweight. Example: the position and font size of a specific character."
                onLearn={learnTerm}
              />{' '}
              (unique data like position). Shared data lives in a pool; unique data is supplied by the caller.
            </p>

            {/* Interactive text editor simulation */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <MemoryStick size={18} className="text-sky-400" />
              Live Memory Comparison
            </h3>
            <p className="text-sm text-quest-muted mb-4">
              Watch memory usage grow as characters are typed. Toggle between naive and flyweight approaches.
            </p>

            {/* Mode toggle */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setEditorMode('naive')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${editorMode === 'naive'
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                    : 'bg-quest-surface border border-white/10 text-quest-muted hover:border-white/30'}`}
              >
                Naive (1 object per char)
              </button>
              <button
                onClick={() => setEditorMode('flyweight')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${editorMode === 'flyweight'
                    ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                    : 'bg-quest-surface border border-white/10 text-quest-muted hover:border-white/30'}`}
              >
                Flyweight (shared pool)
              </button>
            </div>

            {/* Text display area */}
            <div className="bg-quest-bg rounded-xl p-5 mb-4 min-h-[80px] font-mono text-sm border border-white/5">
              {typedText.split('').map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={editorMode === 'naive' ? 'text-red-300' : 'text-emerald-300'}
                >
                  {ch}
                </motion.span>
              ))}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="text-white"
                >
                  |
                </motion.span>
              )}
              {!typedText && !isTyping && (
                <span className="text-quest-muted/50 italic">Click "Start Typing" to begin the demo...</span>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={startTyping}
                disabled={isTyping}
                className="btn-primary text-sm disabled:opacity-50"
              >
                Start Typing
              </button>
              <button
                onClick={resetTyping}
                className="btn-secondary text-sm"
              >
                Reset
              </button>
            </div>

            {/* Memory bars */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-red-400 font-medium">Naive: {charCount} objects</span>
                  <span className="text-red-400">{formatBytes(naiveMemory)}</span>
                </div>
                <div className="h-6 bg-quest-bg rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-500/60 to-red-400/80 rounded-full"
                    animate={{ width: `${Math.min((naiveMemory / (sampleText.length * CHAR_OBJECT_SIZE)) * 100, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-emerald-400 font-medium">Flyweight: {uniqueChars} shared + {charCount} refs</span>
                  <span className="text-emerald-400">{formatBytes(flyweightMemory)}</span>
                </div>
                <div className="h-6 bg-quest-bg rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500/60 to-emerald-400/80 rounded-full"
                    animate={{ width: `${Math.min((flyweightMemory / (sampleText.length * CHAR_OBJECT_SIZE)) * 100, 100)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {charCount > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                >
                  <p className="text-lg font-bold text-emerald-400">{memorySavingsPercent}% memory saved</p>
                  <p className="text-xs text-quest-muted">
                    {formatBytes(naiveMemory - flyweightMemory)} less memory with flyweight
                  </p>
                </motion.div>
              )}
            </div>

            {/* Object breakdown */}
            {charCount > 0 && (
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-sm font-semibold text-red-400 mb-2">Naive Approach</h4>
                  <div className="space-y-1 text-xs text-quest-muted">
                    <p>Objects created: <span className="text-red-300 font-mono">{charCount}</span></p>
                    <p>Each object stores: glyph, font, size, color, position</p>
                    <p>Size per object: <span className="font-mono">{CHAR_OBJECT_SIZE} bytes</span></p>
                    <p className="pt-1 border-t border-white/5 font-medium text-red-400">
                      Total: {formatBytes(naiveMemory)}
                    </p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">Flyweight Approach</h4>
                  <div className="space-y-1 text-xs text-quest-muted">
                    <p>Shared pool: <span className="text-emerald-300 font-mono">{uniqueChars} unique chars</span></p>
                    <p>References: <span className="font-mono">{charCount}</span> (position + pool pointer)</p>
                    <p>Pool overhead: <span className="font-mono">{FLYWEIGHT_POOL_OVERHEAD} bytes</span></p>
                    <p className="pt-1 border-t border-white/5 font-medium text-emerald-400">
                      Total: {formatBytes(flyweightMemory)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <DeepDive id="flyweight-origin" title="Origins of the Flyweight Pattern" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  The Flyweight pattern was first described by the Gang of Four (GoF) in their seminal 1994 book
                  "Design Patterns." The name comes from boxing -- a flyweight is the lightest weight class, suggesting
                  objects that are as light (memory-efficient) as possible.
                </p>
                <p>
                  <strong className="text-quest-text">The key insight:</strong> When you have thousands or millions
                  of similar objects, most of their data is duplicated. By extracting the common (intrinsic) data
                  into shared objects and passing in the varying (extrinsic) data from outside, you can dramatically
                  reduce memory consumption.
                </p>
                <p>
                  <strong className="text-quest-text">Classic example:</strong> The ET++ text editor (1990s) used flyweight
                  for character rendering. Instead of creating an object per character with full font data, each unique
                  character glyph was stored once. Document positions were extrinsic state supplied at render time.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Intrinsic vs Extrinsic
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: INTRINSIC VS EXTRINSIC ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TreePine className="text-emerald-400" />
              The Forest of Shared Trees
            </h2>

            <p className="text-quest-muted mb-6">
              Imagine a game engine rendering a forest. Each tree has a type with heavy data
              (3D mesh, textures) and light per-instance data (position, scale). With{' '}
              <Term
                word="Object Sharing"
                definition="The core mechanism of the Flyweight pattern where multiple instances reference the same shared object for their common state, rather than each holding their own copy. A flyweight factory manages the pool of shared objects."
                onLearn={learnTerm}
              />
              , the mesh and texture data is stored once per type, not once per tree.
            </p>

            {/* Forest visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5 relative">
              <h3 className="text-sm font-semibold mb-4">Click a tree to inspect its state</h3>
              <div className="relative w-full" style={{ height: 280 }}>
                {forestTrees.map((ft, i) => {
                  const tt = treeTypes.find(t => t.id === ft.typeId)
                  const isSelected = selectedTree === i
                  return (
                    <motion.button
                      key={i}
                      onClick={() => setSelectedTree(isSelected ? null : i)}
                      className="absolute"
                      style={{ left: `${ft.x}%`, top: `${ft.y}%` }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        animate={isSelected ? { y: [0, -6, 0] } : {}}
                        transition={{ repeat: isSelected ? Infinity : 0, duration: 1.2 }}
                      >
                        <TreePine
                          size={Math.round(28 * ft.scale)}
                          style={{ color: tt?.color }}
                          className={`drop-shadow-lg transition-all
                            ${isSelected ? 'filter brightness-150' : 'opacity-80 hover:opacity-100'}`}
                        />
                      </motion.div>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full flex items-center justify-center"
                        >
                          <span className="text-[8px] text-quest-bg font-bold">{i + 1}</span>
                        </motion.div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 text-xs text-quest-muted border-t border-white/5 pt-3">
                {treeTypes.map(tt => (
                  <div key={tt.id} className="flex items-center gap-1">
                    <TreePine size={14} style={{ color: tt.color }} />
                    <span>{tt.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected tree details */}
            <AnimatePresence>
              {selectedTree !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-6"
                >
                  {(() => {
                    const ft = forestTrees[selectedTree]
                    const tt = treeTypes.find(t => t.id === ft.typeId)
                    return (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20">
                          <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                            <Layers size={14} />
                            Intrinsic State (SHARED)
                          </h4>
                          <p className="text-[10px] text-quest-muted mb-2">
                            Stored once in the flyweight pool. All {tt.name} trees share this.
                          </p>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-quest-muted">Type:</span>
                              <span className="font-mono" style={{ color: tt.color }}>{tt.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-quest-muted">3D Mesh:</span>
                              <span className="font-mono">{tt.meshSize}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-quest-muted">Textures:</span>
                              <span className="font-mono">{tt.textureSize}</span>
                            </div>
                            <div className="flex justify-between pt-1.5 border-t border-white/5 font-medium text-emerald-400">
                              <span>Total Shared:</span>
                              <span className="font-mono">{tt.totalIntrinsic} MB</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-quest-bg rounded-lg p-4 border border-sky-500/20">
                          <h4 className="text-sm font-semibold text-sky-400 mb-2 flex items-center gap-2">
                            <Hash size={14} />
                            Extrinsic State (UNIQUE)
                          </h4>
                          <p className="text-[10px] text-quest-muted mb-2">
                            Unique to this specific tree instance. Passed in at render time.
                          </p>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between">
                              <span className="text-quest-muted">Position X:</span>
                              <span className="font-mono text-sky-300">{ft.x}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-quest-muted">Position Y:</span>
                              <span className="font-mono text-sky-300">{ft.y}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-quest-muted">Scale:</span>
                              <span className="font-mono text-sky-300">{ft.scale}x</span>
                            </div>
                            <div className="flex justify-between pt-1.5 border-t border-white/5 font-medium text-sky-400">
                              <span>Per-Instance:</span>
                              <span className="font-mono">{(EXTRINSIC_PER_TREE * 1024).toFixed(0)} KB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forest memory comparison */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <MemoryStick size={16} className="text-sky-400" />
                Forest Memory: {forestTrees.length} Trees
              </h3>

              <button
                onClick={() => setShowSharedState(!showSharedState)}
                className="mb-4 px-3 py-1.5 rounded-lg text-xs bg-quest-bg border border-white/10 hover:border-emerald-500/30 transition-all"
              >
                {showSharedState ? 'Hide' : 'Show'} Shared State Breakdown
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded-lg p-4 border border-red-500/20">
                  <h4 className="text-sm font-semibold text-red-400 mb-2">Without Flyweight</h4>
                  <p className="text-xs text-quest-muted mb-2">Each tree stores its own mesh + texture copy</p>
                  <p className="text-2xl font-bold text-red-400">{forestNaive.total.toFixed(1)} MB</p>
                  <p className="text-[10px] text-quest-muted mt-1">{forestTrees.length} trees x full data each</p>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">With Flyweight</h4>
                  <p className="text-xs text-quest-muted mb-2">Tree types share mesh + texture data</p>
                  <p className="text-2xl font-bold text-emerald-400">{forestFlyweight.total.toFixed(1)} MB</p>
                  <p className="text-[10px] text-quest-muted mt-1">
                    {treeTypes.length} shared types + {forestTrees.length} lightweight refs
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {showSharedState && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-2">
                      <h4 className="text-xs font-semibold text-quest-muted">Flyweight Pool Contents:</h4>
                      {treeTypes.map(tt => {
                        const count = forestTrees.filter(ft => ft.typeId === tt.id).length
                        return (
                          <div key={tt.id} className="flex items-center gap-3 bg-quest-bg rounded-lg p-3">
                            <TreePine size={18} style={{ color: tt.color }} />
                            <div className="flex-1">
                              <p className="text-xs font-medium">{tt.name}</p>
                              <p className="text-[10px] text-quest-muted">{tt.totalIntrinsic} MB shared data</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-mono text-emerald-400">{count} refs</p>
                              <p className="text-[10px] text-quest-muted">
                                Naive: {(count * tt.totalIntrinsic).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                        )
                      })}
                      <div className="text-center pt-3 mt-2 border-t border-white/5">
                        <p className="text-sm font-bold text-emerald-400">
                          {Math.round(((forestNaive.total - forestFlyweight.total) / forestNaive.total) * 100)}% memory saved
                        </p>
                        <p className="text-[10px] text-quest-muted">
                          {(forestNaive.total - forestFlyweight.total).toFixed(1)} MB freed
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DeepDive id="intrinsic-extrinsic-rules" title="Deciding What is Intrinsic vs Extrinsic" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Intrinsic state</strong> must be:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Immutable (never changes after creation)</li>
                  <li>Context-independent (the same regardless of where/how the object is used)</li>
                  <li>Shareable (safe for multiple clients to reference simultaneously)</li>
                </ul>
                <p>
                  <strong className="text-quest-text">Extrinsic state</strong> is:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Context-dependent (varies based on usage)</li>
                  <li>Computed or supplied by the client at runtime</li>
                  <li>Lightweight (otherwise the pattern loses its benefit)</li>
                </ul>
                <p>
                  <strong className="text-quest-text">Rule of thumb:</strong> If two instances of the "same type"
                  always share a piece of data, it is intrinsic. If that data could differ between two instances
                  of the same type, it is extrinsic.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Flyweight Pool
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: FLYWEIGHT POOL ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="text-emerald-400" />
              The Flyweight Pool
            </h2>

            <p className="text-quest-muted mb-6">
              The{' '}
              <Term
                word="Flyweight Factory"
                definition="A factory that manages the pool of flyweight objects. When a client requests a flyweight, the factory either returns an existing shared instance or creates a new one if it doesn't exist yet. This ensures each unique intrinsic state is stored only once."
                onLearn={learnTerm}
              />{' '}
              maintains a pool of shared objects keyed by their intrinsic state.
              When code requests an object, the factory returns an existing one from the pool or creates
              a new one if the intrinsic state is unseen. Each pool entry tracks how many clients reference it.
            </p>

            {/* Interactive pool builder */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h3 className="text-sm font-semibold mb-2">Type text to build a flyweight pool</h3>
              <p className="text-[10px] text-quest-muted mb-4">
                As you type, watch the pool grow. Each unique character is stored once; the reference count increases
                on reuse.
              </p>

              <input
                type="text"
                value={typedText}
                onChange={(e) => {
                  setTypedText(e.target.value)
                  setCharCount(e.target.value.length)
                }}
                placeholder="Type something here..."
                className="w-full bg-quest-surface rounded-lg px-4 py-3 text-sm font-mono border border-white/10 focus:border-emerald-500/50 focus:outline-none transition-colors mb-4"
              />

              {/* Pool visualization */}
              {Object.keys(flyweightPool).length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={14} className="text-emerald-400" />
                    <span className="text-xs font-semibold">
                      Flyweight Pool ({Object.keys(flyweightPool).length} entries)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(flyweightPool)
                      .sort(([, a], [, b]) => b.refCount - a.refCount)
                      .map(([key, value]) => {
                        const isHighlighted = poolHighlight === key
                        const intensity = Math.min(value.refCount / 10, 1)
                        return (
                          <motion.button
                            key={key}
                            onMouseEnter={() => setPoolHighlight(key)}
                            onMouseLeave={() => setPoolHighlight(null)}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.15 }}
                            className={`relative flex flex-col items-center justify-center w-14 h-16 rounded-lg border transition-all
                              ${isHighlighted
                                ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/20'
                                : 'border-white/10 bg-quest-surface'}`}
                          >
                            <span className="text-lg font-mono font-bold" style={{ opacity: 0.5 + intensity * 0.5 }}>
                              {value.char === ' ' ? '␣' : value.char}
                            </span>
                            <span className={`text-[9px] font-mono mt-0.5
                              ${isHighlighted ? 'text-emerald-400' : 'text-quest-muted'}`}>
                              x{value.refCount}
                            </span>
                            {isHighlighted && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-8 bg-quest-surface border border-white/10 rounded px-2 py-0.5 text-[9px] whitespace-nowrap z-10"
                              >
                                {value.refCount} reference{value.refCount !== 1 ? 's' : ''}
                              </motion.div>
                            )}
                          </motion.button>
                        )
                      })}
                  </div>

                  {/* Pool stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-emerald-400">{Object.keys(flyweightPool).length}</p>
                      <p className="text-[10px] text-quest-muted">Unique Flyweights</p>
                    </div>
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-sky-400">{charCount}</p>
                      <p className="text-[10px] text-quest-muted">Total References</p>
                    </div>
                    <div className="bg-quest-surface rounded-lg p-3 text-center">
                      <p className="text-lg font-bold text-amber-400">
                        {charCount > 0 ? (charCount / Object.keys(flyweightPool).length).toFixed(1) : '0'}x
                      </p>
                      <p className="text-[10px] text-quest-muted">Avg Reuse Rate</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Flyweight pattern structure */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-4">Pattern Structure</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Copy size={16} className="text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-400">Flyweight Interface</p>
                    <p className="text-xs text-quest-muted">
                      Declares methods that accept extrinsic state. The flyweight itself only stores intrinsic state.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Feather size={16} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-400">Concrete Flyweight</p>
                    <p className="text-xs text-quest-muted">
                      Stores intrinsic state. Must be immutable and shareable. Multiple clients reference the same instance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Database size={16} className="text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sky-400">Flyweight Factory</p>
                    <p className="text-xs text-quest-muted">
                      Manages the pool. On request, returns existing flyweight or creates a new one. Ensures sharing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Hash size={16} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-400">Client</p>
                    <p className="text-xs text-quest-muted">
                      Stores or computes extrinsic state. Passes it to flyweight methods at call time. Never modifies the flyweight.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Code example */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h3 className="text-sm font-semibold mb-3">Flyweight in Practice</h3>
              <pre className="text-xs font-mono text-quest-muted overflow-x-auto leading-relaxed">
{`// Flyweight factory for tree rendering
class TreeTypeFactory {
  private pool: Map<string, TreeType> = new Map()

  getTreeType(name: string, mesh: Mesh, texture: Texture): TreeType {
    const key = name
    if (!this.pool.has(key)) {
      this.pool.set(key, new TreeType(name, mesh, texture))
    }
    return this.pool.get(key)! // shared instance
  }
}

// Flyweight: stores only intrinsic state
class TreeType {
  constructor(
    readonly name: string,    // intrinsic
    readonly mesh: Mesh,      // intrinsic (heavy: ~2MB)
    readonly texture: Texture // intrinsic (heavy: ~1.5MB)
  ) {}

  draw(canvas: Canvas, x: number, y: number, scale: number) {
    // x, y, scale = extrinsic state, passed in
    canvas.drawMesh(this.mesh, x, y, scale)
    canvas.applyTexture(this.texture, x, y, scale)
  }
}

// Client: stores extrinsic state + reference to flyweight
class Tree {
  constructor(
    private type: TreeType, // shared flyweight reference
    private x: number,      // extrinsic
    private y: number,      // extrinsic
    private scale: number   // extrinsic
  ) {}

  draw(canvas: Canvas) {
    this.type.draw(canvas, this.x, this.y, this.scale)
  }
}`}
              </pre>
            </div>

            <DeepDive id="flyweight-real-world" title="Real-World Flyweight Examples" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Java String Pool:</strong> Java interns string literals so that
                  identical strings share the same memory. <code className="text-xs font-mono">"hello" == "hello"</code>
                  is true because both reference the same pooled String object.
                </p>
                <p>
                  <strong className="text-quest-text">Browser DOM:</strong> CSS styles are shared across elements via
                  class selectors rather than duplicated inline on each element. The class name is a flyweight key.
                </p>
                <p>
                  <strong className="text-quest-text">Game Engines (Unity, Unreal):</strong> GPU instancing renders
                  thousands of identical meshes in one draw call. The mesh data is the intrinsic flyweight; the
                  per-instance transform matrix is extrinsic state sent to the GPU.
                </p>
                <p>
                  <strong className="text-quest-text">Database Connection Pools:</strong> Connection objects are shared
                  and reused rather than created per query. The connection config is intrinsic; the specific query
                  is extrinsic.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Memory Calculator
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: MEMORY CALCULATOR ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <MemoryStick className="text-emerald-400" />
              Memory Savings Calculator
            </h2>

            <p className="text-quest-muted mb-6">
              Explore how{' '}
              <Term
                word="Memory Optimization"
                definition="The process of reducing an application's memory footprint. The Flyweight pattern is one technique, effective when many objects share common data. Others include object pooling, lazy loading, and data compression."
                onLearn={learnTerm}
              />{' '}
              with the flyweight pattern scales. Adjust the parameters to see how memory savings change
              with different object counts and sizes.
            </p>

            {/* Calculator inputs */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Total objects */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Total Objects</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCalcObjects(prev => Math.max(100, prev - 1000))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="range"
                      min={100}
                      max={1000000}
                      step={100}
                      value={calcObjects}
                      onChange={(e) => setCalcObjects(Number(e.target.value))}
                      className="flex-1 accent-emerald-500"
                    />
                    <button
                      onClick={() => setCalcObjects(prev => Math.min(1000000, prev + 1000))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-center text-sm font-mono text-emerald-400 mt-1">
                    {calcObjects.toLocaleString()}
                  </p>
                </div>

                {/* Unique types */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Unique Types (Flyweights)</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCalcUniqueTypes(prev => Math.max(1, prev - 5))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="range"
                      min={1}
                      max={500}
                      step={1}
                      value={calcUniqueTypes}
                      onChange={(e) => setCalcUniqueTypes(Number(e.target.value))}
                      className="flex-1 accent-sky-500"
                    />
                    <button
                      onClick={() => setCalcUniqueTypes(prev => Math.min(500, prev + 5))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-center text-sm font-mono text-sky-400 mt-1">
                    {calcUniqueTypes}
                  </p>
                </div>

                {/* Object size */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Intrinsic Data per Type</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCalcObjectSize(prev => Math.max(64, prev - 256))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="range"
                      min={64}
                      max={1048576}
                      step={64}
                      value={calcObjectSize}
                      onChange={(e) => setCalcObjectSize(Number(e.target.value))}
                      className="flex-1 accent-purple-500"
                    />
                    <button
                      onClick={() => setCalcObjectSize(prev => Math.min(1048576, prev + 256))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-center text-sm font-mono text-purple-400 mt-1">
                    {formatBytes(calcObjectSize)}
                  </p>
                </div>

                {/* Extrinsic size */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Extrinsic Data per Instance</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setCalcExtrinsicSize(prev => Math.max(4, prev - 8))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Minus size={14} />
                    </button>
                    <input
                      type="range"
                      min={4}
                      max={1024}
                      step={4}
                      value={calcExtrinsicSize}
                      onChange={(e) => setCalcExtrinsicSize(Number(e.target.value))}
                      className="flex-1 accent-amber-500"
                    />
                    <button
                      onClick={() => setCalcExtrinsicSize(prev => Math.min(1024, prev + 8))}
                      className="w-8 h-8 rounded-lg bg-quest-surface border border-white/10 flex items-center justify-center hover:border-white/30"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="text-center text-sm font-mono text-amber-400 mt-1">
                    {formatBytes(calcExtrinsicSize)}
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-5 border border-red-500/20">
                <h4 className="text-sm font-semibold text-red-400 mb-1">Without Flyweight</h4>
                <p className="text-xs text-quest-muted mb-3">
                  {calcObjects.toLocaleString()} objects x {formatBytes(calcObjectSize)} each
                </p>
                <p className="text-3xl font-bold text-red-400">{formatBytes(calcNaiveTotal)}</p>
              </div>
              <div className="bg-quest-bg rounded-xl p-5 border border-emerald-500/20">
                <h4 className="text-sm font-semibold text-emerald-400 mb-1">With Flyweight</h4>
                <p className="text-xs text-quest-muted mb-3">
                  {calcUniqueTypes} types x {formatBytes(calcObjectSize)} + {calcObjects.toLocaleString()} x {formatBytes(calcExtrinsicSize)}
                </p>
                <p className="text-3xl font-bold text-emerald-400">{formatBytes(calcFlyweightTotal)}</p>
              </div>
            </div>

            {/* Savings visualization */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Memory Savings</h3>
                <span className={`text-2xl font-bold ${calcSavingsPercent > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {calcSavingsPercent > 0 ? `${calcSavingsPercent}%` : 'No savings'}
                </span>
              </div>

              {/* Visual bar comparison */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-red-400">Naive</span>
                    <span className="text-red-400">{formatBytes(calcNaiveTotal)}</span>
                  </div>
                  <div className="h-8 bg-quest-bg rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-600/70 to-red-400/80 rounded-full"
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-emerald-400">Flyweight</span>
                    <span className="text-emerald-400">{formatBytes(calcFlyweightTotal)}</span>
                  </div>
                  <div className="h-8 bg-quest-bg rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-emerald-600/70 to-emerald-400/80 rounded-full"
                      animate={{
                        width: `${calcNaiveTotal > 0 ? Math.max(2, (calcFlyweightTotal / calcNaiveTotal) * 100) : 100}%`
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {calcSavingsPercent > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-quest-muted mt-4"
                >
                  You save <span className="text-emerald-400 font-bold">{formatBytes(calcSavings)}</span> with flyweight
                  ({(calcObjects / calcUniqueTypes).toFixed(0)}x average reuse per type)
                </motion.p>
              )}

              {calcSavingsPercent <= 0 && (
                <p className="text-center text-sm text-amber-400 mt-4">
                  With these parameters, flyweight uses more memory due to pool overhead. It works best
                  when unique types are much fewer than total objects and intrinsic data is large.
                </p>
              )}
            </div>

            {/* Preset scenarios */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h3 className="text-sm font-semibold mb-3">Try These Scenarios</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <button
                  onClick={() => { setCalcObjects(1000000); setCalcUniqueTypes(26); setCalcObjectSize(512); setCalcExtrinsicSize(16) }}
                  className="p-3 rounded-lg bg-quest-surface border border-white/10 hover:border-emerald-500/30 transition-all text-left"
                >
                  <p className="text-xs font-medium mb-1">Text Editor</p>
                  <p className="text-[10px] text-quest-muted">1M chars, 26 letter types, 512B glyph data</p>
                </button>
                <button
                  onClick={() => { setCalcObjects(50000); setCalcUniqueTypes(12); setCalcObjectSize(1048576); setCalcExtrinsicSize(64) }}
                  className="p-3 rounded-lg bg-quest-surface border border-white/10 hover:border-emerald-500/30 transition-all text-left"
                >
                  <p className="text-xs font-medium mb-1">Game Forest</p>
                  <p className="text-[10px] text-quest-muted">50K trees, 12 species, 1MB mesh+texture</p>
                </button>
                <button
                  onClick={() => { setCalcObjects(100000); setCalcUniqueTypes(200); setCalcObjectSize(2048); setCalcExtrinsicSize(128) }}
                  className="p-3 rounded-lg bg-quest-surface border border-white/10 hover:border-emerald-500/30 transition-all text-left"
                >
                  <p className="text-xs font-medium mb-1">Particle System</p>
                  <p className="text-[10px] text-quest-muted">100K particles, 200 types, 2KB sprite data</p>
                </button>
              </div>
            </div>

            {/* When to use / not use */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-lg p-4 border border-emerald-500/20">
                <h4 className="text-sm font-semibold text-emerald-400 mb-3">When to Use Flyweight</h4>
                <ul className="space-y-2 text-xs text-quest-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Application creates a large number of similar objects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Objects consume significant memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Most object state can be made extrinsic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span>Many groups of objects can be replaced by fewer shared objects</span>
                  </li>
                </ul>
              </div>
              <div className="bg-quest-bg rounded-lg p-4 border border-red-500/20">
                <h4 className="text-sm font-semibold text-red-400 mb-3">When NOT to Use Flyweight</h4>
                <ul className="space-y-2 text-xs text-quest-muted">
                  <li className="flex items-start gap-2">
                    <Minus size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Objects have little or no shared state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Minus size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span>The number of objects is small (overhead outweighs savings)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Minus size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Extrinsic state is large relative to intrinsic state</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Minus size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span>Object identity matters (flyweights are shared, not unique)</span>
                  </li>
                </ul>
              </div>
            </div>

            <DeepDive id="flyweight-vs-cache" title="Flyweight vs Caching vs Object Pool" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Flyweight:</strong> Shares immutable intrinsic state across
                  many concurrent users. Objects are never "returned" -- they live in the pool forever and are
                  referenced by many clients simultaneously.
                </p>
                <p>
                  <strong className="text-quest-text">Object Pool:</strong> Reuses mutable objects sequentially.
                  An object is checked out, used, reset, and returned. Only one client uses it at a time.
                  Think: database connection pools, thread pools.
                </p>
                <p>
                  <strong className="text-quest-text">Cache:</strong> Stores computed results for reuse. Entries
                  can be evicted (LRU, TTL). A cache is about avoiding recomputation; flyweight is about avoiding
                  duplicate storage.
                </p>
                <p>
                  <strong className="text-quest-text">Singleton:</strong> Ensures exactly one instance of a class.
                  Flyweight can have many instances (one per unique intrinsic key). Singleton is about uniqueness;
                  flyweight is about sharing.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
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
              <CheckCircle className="text-emerald-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              The Flyweight pattern is a key tool for memory optimization at scale.
              Let's verify your understanding of intrinsic vs extrinsic state, when to use flyweight,
              and how it compares to other patterns.
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
                                : 'border-emerald-500 bg-emerald-500/10'
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
                <h3 className="text-xl font-bold mb-2">Level 37 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the Flyweight pattern -- how to split state into intrinsic and extrinsic,
                  build shared object pools, and calculate memory savings. When your system has thousands
                  of similar objects devouring memory, sharing is indeed caring.
                </p>
                <p className="text-sm text-emerald-400">
                  Lightweight objects, heavyweight savings. The Flyweight way.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

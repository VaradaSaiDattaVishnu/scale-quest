import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, FolderTree, File, Folder, GitBranch, Layers } from 'lucide-react'

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

/* ── Initial file system tree data ── */
const initialTree = {
  id: 'root',
  name: 'project',
  type: 'folder',
  children: [
    {
      id: 'src', name: 'src', type: 'folder', children: [
        { id: 'index', name: 'index.js', type: 'file', size: 120 },
        { id: 'app', name: 'App.jsx', type: 'file', size: 340 },
        {
          id: 'components', name: 'components', type: 'folder', children: [
            { id: 'header', name: 'Header.jsx', type: 'file', size: 180 },
            { id: 'footer', name: 'Footer.jsx', type: 'file', size: 90 },
          ]
        },
      ]
    },
    { id: 'readme', name: 'README.md', type: 'file', size: 45 },
    { id: 'pkg', name: 'package.json', type: 'file', size: 28 },
  ]
}

/* ── Bridge pattern data ── */
const shapesWithout = [
  'RedCircle', 'RedSquare', 'RedTriangle',
  'BlueCircle', 'BlueSquare', 'BlueTriangle',
  'GreenCircle', 'GreenSquare', 'GreenTriangle',
]

const shapesWithBridge = {
  shapes: ['Circle', 'Square', 'Triangle'],
  colors: ['Red', 'Blue', 'Green'],
}

/* ── Quiz questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the main idea behind the Composite pattern?',
    options: [
      { id: 'a', text: 'A collection class that stores objects in an array', correct: false },
      { id: 'b', text: 'A tree structure where individual objects and compositions are treated uniformly', correct: true },
      { id: 'c', text: 'A way to bridge two incompatible interfaces', correct: false },
      { id: 'd', text: 'A pattern for lazy loading nested objects', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What problem does the Bridge pattern solve?',
    options: [
      { id: 'a', text: 'It bridges the gap between client and server code', correct: false },
      { id: 'b', text: 'It converts one interface to another for compatibility', correct: false },
      { id: 'c', text: 'It decouples an abstraction from its implementation so both can vary independently', correct: true },
      { id: 'd', text: 'It creates a bridge between synchronous and asynchronous code', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'In a composite tree, when you call getSize() on a folder, what happens?',
    options: [
      { id: 'a', text: 'It returns the size of the folder metadata only', correct: false },
      { id: 'b', text: 'It recursively sums the sizes of all children (files and sub-folders)', correct: true },
      { id: 'c', text: 'It throws an error because folders do not have a size', correct: false },
      { id: 'd', text: 'It returns the count of direct children', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'When is the Composite pattern most appropriate?',
    options: [
      { id: 'a', text: 'When objects form a part-whole hierarchy and you want uniform treatment', correct: true },
      { id: 'b', text: 'When you need to cache results of expensive operations', correct: false },
      { id: 'c', text: 'When you have exactly two levels of nesting', correct: false },
      { id: 'd', text: 'When all objects are the same type with no nesting', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'How does Bridge differ from Adapter?',
    options: [
      { id: 'a', text: 'Bridge and Adapter are the same pattern with different names', correct: false },
      { id: 'b', text: 'Adapter makes existing incompatible interfaces work together; Bridge is designed up-front to decouple abstraction from implementation', correct: true },
      { id: 'c', text: 'Bridge only works with abstract classes, Adapter works with any class', correct: false },
      { id: 'd', text: 'Adapter is structural, Bridge is behavioral', correct: false },
    ],
  },
]

/* ── Helper: compute size recursively ── */
function computeSize(node) {
  if (node.type === 'file') return node.size
  return (node.children || []).reduce((sum, child) => sum + computeSize(child), 0)
}

/* ── Helper: count nodes ── */
function countNodes(node) {
  if (node.type === 'file') return 1
  return 1 + (node.children || []).reduce((sum, child) => sum + countNodes(child), 0)
}

/* ── Helper: generate unique id ── */
let nextId = 100
function genId() {
  return `node-${nextId++}`
}

/* ── Helper: deep clone tree ── */
function cloneTree(node) {
  if (node.type === 'file') return { ...node }
  return { ...node, children: (node.children || []).map(cloneTree) }
}

/* ── Helper: insert child into tree ── */
function insertChild(tree, parentId, newChild) {
  if (tree.id === parentId && tree.type === 'folder') {
    return { ...tree, children: [...(tree.children || []), newChild] }
  }
  if (tree.type === 'folder' && tree.children) {
    return {
      ...tree,
      children: tree.children.map(c => insertChild(c, parentId, newChild)),
    }
  }
  return tree
}

/* ── Helper: remove node from tree ── */
function removeNode(tree, nodeId) {
  if (tree.id === nodeId) return null
  if (tree.type === 'folder' && tree.children) {
    return {
      ...tree,
      children: tree.children.map(c => removeNode(c, nodeId)).filter(Boolean),
    }
  }
  return tree
}

/* ═══════════════════════════════════════════════════════════════
   FileTreeNode — Recursive tree node component
   ═══════════════════════════════════════════════════════════════ */
function FileTreeNode({ node, depth = 0, selectedId, onSelect, highlightedIds, traversalOrder }) {
  const [expanded, setExpanded] = useState(true)
  const isFolder = node.type === 'folder'
  const isSelected = selectedId === node.id
  const isHighlighted = highlightedIds?.has(node.id)
  const traversalIndex = traversalOrder?.indexOf(node.id)
  const hasTraversalIndex = traversalIndex != null && traversalIndex >= 0

  return (
    <div>
      <motion.div
        layout
        onClick={() => onSelect?.(node.id)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all text-sm
          ${isSelected ? 'bg-sky-500/20 border border-sky-500/40' : 'hover:bg-white/5 border border-transparent'}
          ${isHighlighted ? 'ring-2 ring-amber-400/60' : ''}`}
        style={{ paddingLeft: `${depth * 20 + 12}px` }}
        animate={isHighlighted ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {isFolder ? (
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded) }}
            className="text-quest-muted hover:text-quest-text"
          >
            {expanded ? <ChevronDown size={14} /> : <ChevronUp size={14} className="rotate-180" />}
          </button>
        ) : (
          <span className="w-[14px]" />
        )}

        {isFolder
          ? <Folder size={16} className={`${isHighlighted ? 'text-amber-400' : 'text-yellow-500'}`} />
          : <File size={16} className={`${isHighlighted ? 'text-amber-400' : 'text-sky-400'}`} />
        }

        <span className={`flex-1 ${isHighlighted ? 'text-amber-300 font-semibold' : 'text-quest-text'}`}>
          {node.name}
        </span>

        {node.type === 'file' && (
          <span className="text-[10px] text-quest-muted">{node.size} B</span>
        )}

        {isFolder && (
          <span className="text-[10px] text-quest-muted">{computeSize(node)} B</span>
        )}

        {hasTraversalIndex && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 text-[10px] flex items-center justify-center font-bold"
          >
            {traversalIndex + 1}
          </motion.span>
        )}
      </motion.div>

      <AnimatePresence>
        {isFolder && expanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {node.children.map(child => (
              <FileTreeNode
                key={child.id}
                node={child}
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                highlightedIds={highlightedIds}
                traversalOrder={traversalOrder}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Level36 — Composite & Bridge Patterns
   ═══════════════════════════════════════════════════════════════ */
export default function Level36({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* ── File system sim state ── */
  const [fileTree, setFileTree] = useState(() => cloneTree(initialTree))
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [newItemName, setNewItemName] = useState('')
  const [newItemType, setNewItemType] = useState('file')

  /* ── Traversal animation state ── */
  const [traversing, setTraversing] = useState(false)
  const [highlightedIds, setHighlightedIds] = useState(new Set())
  const [traversalOrder, setTraversalOrder] = useState([])
  const [traversalTotal, setTraversalTotal] = useState(null)

  /* ── Bridge pattern state ── */
  const [bridgeMode, setBridgeMode] = useState('without') // 'without' | 'with'
  const [selectedShape, setSelectedShape] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  /* ── Quiz state ── */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Add item to tree ── */
  const handleAddItem = useCallback(() => {
    if (!selectedNodeId || !newItemName.trim()) return
    const newChild = newItemType === 'file'
      ? { id: genId(), name: newItemName.trim(), type: 'file', size: Math.floor(Math.random() * 200) + 10 }
      : { id: genId(), name: newItemName.trim(), type: 'folder', children: [] }
    setFileTree(prev => insertChild(prev, selectedNodeId, newChild))
    setNewItemName('')
  }, [selectedNodeId, newItemName, newItemType])

  /* ── Remove selected node ── */
  const handleRemoveNode = useCallback(() => {
    if (!selectedNodeId || selectedNodeId === 'root') return
    setFileTree(prev => removeNode(prev, selectedNodeId) || prev)
    setSelectedNodeId(null)
  }, [selectedNodeId])

  /* ── Collect all node ids in DFS order ── */
  const collectDFS = useCallback((node) => {
    const result = [node.id]
    if (node.type === 'folder' && node.children) {
      node.children.forEach(child => {
        result.push(...collectDFS(child))
      })
    }
    return result
  }, [])

  /* ── Animate getSize traversal ── */
  const handleTraverseGetSize = useCallback(() => {
    if (traversing) return
    setTraversing(true)
    setHighlightedIds(new Set())
    setTraversalOrder([])
    setTraversalTotal(null)

    const allIds = collectDFS(fileTree)
    let step = 0

    const interval = setInterval(() => {
      if (step < allIds.length) {
        setHighlightedIds(prev => new Set([...prev, allIds[step]]))
        setTraversalOrder(prev => [...prev, allIds[step]])
        step++
      } else {
        clearInterval(interval)
        setTraversalTotal(computeSize(fileTree))
        setTraversing(false)
      }
    }, 400)

    return () => clearInterval(interval)
  }, [fileTree, traversing, collectDFS])

  /* ── Clear traversal highlights ── */
  const handleClearTraversal = useCallback(() => {
    setHighlightedIds(new Set())
    setTraversalOrder([])
    setTraversalTotal(null)
  }, [])

  /* ── Quiz submit ── */
  const handleQuizSubmit = useCallback(() => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      return q.options.find(o => o.id === selected)?.correct
    })
    if (allCorrect || true) {
      onComplete?.()
    }
  }, [quizAnswers, onComplete])

  /* ── Shape colors for the bridge demo ── */
  const colorValues = { Red: '#ef4444', Blue: '#3b82f6', Green: '#22c55e' }
  const shapeIcons = {
    Circle: (color, size = 40) => (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="rounded-full" style={{ width: size * 0.8, height: size * 0.8, backgroundColor: color }} />
      </div>
    ),
    Square: (color, size = 40) => (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <div className="rounded-sm" style={{ width: size * 0.75, height: size * 0.75, backgroundColor: color }} />
      </div>
    ),
    Triangle: (color, size = 40) => (
      <div className="flex items-center justify-center" style={{ width: size, height: size }}>
        <div style={{
          width: 0, height: 0,
          borderLeft: `${size * 0.4}px solid transparent`,
          borderRight: `${size * 0.4}px solid transparent`,
          borderBottom: `${size * 0.7}px solid ${color}`,
        }} />
      </div>
    ),
  }

  /* ── Selected folder for adding items ── */
  const findNode = (tree, id) => {
    if (tree.id === id) return tree
    if (tree.type === 'folder' && tree.children) {
      for (const child of tree.children) {
        const found = findNode(child, id)
        if (found) return found
      }
    }
    return null
  }
  const selectedNode = selectedNodeId ? findNode(fileTree, selectedNodeId) : null
  const canAddChild = selectedNode?.type === 'folder'

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Title card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="concept-card text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FolderTree className="text-amber-400" size={32} />
          <h1 className="text-3xl font-bold">Tree of Objects</h1>
        </div>
        <p className="text-quest-muted text-lg max-w-2xl mx-auto">
          Your file system has files and folders. Folders contain files and... other folders.
          How do you model this?
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm text-quest-muted">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Composite Pattern</span>
          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">Bridge Pattern</span>
        </div>
      </motion.div>

      {/* ── Section navigation ── */}
      <div className="flex gap-2 justify-center flex-wrap">
        {['The Composite Pattern', 'File System Sim', 'The Bridge Pattern', 'Recursive Operations', 'Quiz'].map((label, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === i
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                : 'bg-quest-surface text-quest-muted border border-white/10 hover:border-white/20'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: Composite Pattern Concept ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FolderTree className="text-amber-400" />
              The Composite Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              The{' '}
              <Term
                word="Composite Pattern"
                definition="A structural design pattern that lets you compose objects into tree structures to represent part-whole hierarchies. Clients treat individual objects (leaves) and compositions (composites) uniformly through a shared interface."
                onLearn={learnTerm}
              />{' '}
              lets you build a{' '}
              <Term
                word="Tree Structure"
                definition="A hierarchical data structure where each node can have zero or more children. A node with no children is called a leaf; a node with children is called a composite or branch. File systems, DOM trees, and org charts are all tree structures."
                onLearn={learnTerm}
              />{' '}
              where both individual objects (files) and containers (folders) share the same interface.
            </p>

            <p className="text-quest-muted mb-6">
              This creates a{' '}
              <Term
                word="Part-Whole Hierarchy"
                definition="A relationship where individual parts (like files) can be grouped into wholes (like folders), and those wholes can themselves be parts of larger wholes. The Composite pattern models this naturally."
                onLearn={learnTerm}
              />{' '}
              -- you can ask any node for its size, and a folder simply sums up its children's sizes,
              recursively, all the way down.
            </p>

            {/* Visual: The key insight */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center text-amber-400">The Key Insight: Uniform Interface</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-sky-500/20 flex items-center justify-center">
                    <File size={24} className="text-sky-400" />
                  </div>
                  <p className="text-sm font-medium mb-1">Component</p>
                  <p className="text-[11px] text-quest-muted">Shared interface: getSize(), getName()</p>
                  <code className="text-[10px] text-sky-400 mt-2 block font-mono">interface FileSystemNode</code>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <File size={24} className="text-green-400" />
                  </div>
                  <p className="text-sm font-medium mb-1">Leaf (File)</p>
                  <p className="text-[11px] text-quest-muted">Returns its own size directly</p>
                  <code className="text-[10px] text-green-400 mt-2 block font-mono">getSize() = this.size</code>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-yellow-500/20 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <Folder size={24} className="text-yellow-400" />
                  </div>
                  <p className="text-sm font-medium mb-1">Composite (Folder)</p>
                  <p className="text-[11px] text-quest-muted">Delegates to children, aggregates results</p>
                  <code className="text-[10px] text-yellow-400 mt-2 block font-mono">{'getSize() = sum(children)'}</code>
                </div>
              </div>
            </div>

            {/* Code example */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 font-mono text-xs leading-relaxed overflow-x-auto">
              <p className="text-quest-muted mb-2">// The composite pattern in action:</p>
              <p className="text-sky-400">{'class FileNode {'}</p>
              <p className="text-quest-muted pl-4">{'constructor(name, size) { this.name = name; this.size = size; }'}</p>
              <p className="text-green-400 pl-4">{'getSize() { return this.size; }'}</p>
              <p className="text-sky-400">{'}'}</p>
              <br />
              <p className="text-yellow-400">{'class FolderNode {'}</p>
              <p className="text-quest-muted pl-4">{'constructor(name) { this.name = name; this.children = []; }'}</p>
              <p className="text-quest-muted pl-4">{'add(child) { this.children.push(child); }'}</p>
              <p className="text-green-400 pl-4">{'getSize() { return this.children.reduce((s, c) => s + c.getSize(), 0); }'}</p>
              <p className="text-yellow-400">{'}'}</p>
              <br />
              <p className="text-quest-muted">{'// Both respond to getSize() -- that is the composite magic.'}</p>
              <p className="text-quest-muted">{'// folder.getSize() recursively calls child.getSize()'}</p>
            </div>

            {/* Real-world examples */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Real-World Composites</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { title: 'File Systems', desc: 'Files and directories form a tree. Operations like "get size" or "delete" work uniformly.', color: 'text-amber-400' },
                  { title: 'UI Component Trees', desc: 'React components nest inside each other. A panel contains buttons; a page contains panels.', color: 'text-sky-400' },
                  { title: 'Organization Charts', desc: 'An employee or a department (which contains employees and sub-departments).', color: 'text-green-400' },
                  { title: 'Menu Systems', desc: 'A menu item can be a simple action or a sub-menu containing more items.', color: 'text-purple-400' },
                ].map((ex) => (
                  <div key={ex.title} className="bg-quest-bg rounded-lg p-3">
                    <p className={`text-xs font-medium ${ex.color} mb-1`}>{ex.title}</p>
                    <p className="text-[11px] text-quest-muted">{ex.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="composite-gof" title="GoF Composite: History and Variants" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Origin:</strong> The Composite pattern was documented by the Gang of Four
                  in their 1994 "Design Patterns" book. It was inspired by real-world UI frameworks (like ET++ and InterViews)
                  where graphical elements needed to be grouped and treated uniformly.
                </p>
                <p>
                  <strong className="text-quest-text">Safety vs Transparency:</strong> There is a classic tension in Composite.
                  The "transparent" approach puts add/remove on the base Component so clients never care about the type.
                  The "safe" approach only puts add/remove on Composite, forcing type checks but preventing nonsensical operations
                  like adding a child to a file.
                </p>
                <p>
                  <strong className="text-quest-text">Modern Take:</strong> In languages with algebraic data types (Rust, Haskell,
                  TypeScript discriminated unions), the Composite pattern is often expressed as a recursive tagged union. The
                  pattern matching approach replaces the uniform interface with exhaustive case analysis, which many consider safer.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Build a File System
                <FolderTree size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: Interactive File System ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Folder className="text-yellow-400" />
              Interactive File System
            </h2>
            <p className="text-quest-muted mb-6">
              Build a file tree by adding files and folders. Select a folder, then add items inside it.
              Every node responds to the same getSize() call -- that is the Composite in action.
            </p>

            <div className="grid md:grid-cols-5 gap-6">
              {/* Tree view */}
              <div className="md:col-span-3 bg-quest-bg rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-quest-muted">File Tree</h3>
                  <span className="text-[10px] text-quest-muted">
                    {countNodes(fileTree)} nodes | {computeSize(fileTree)} B total
                  </span>
                </div>
                <FileTreeNode
                  node={fileTree}
                  selectedId={selectedNodeId}
                  onSelect={setSelectedNodeId}
                  highlightedIds={highlightedIds}
                  traversalOrder={traversalOrder}
                />
              </div>

              {/* Controls */}
              <div className="md:col-span-2 space-y-4">
                {/* Add item */}
                <div className="bg-quest-bg rounded-xl p-4 border border-white/10">
                  <h4 className="text-sm font-semibold mb-3">Add Item</h4>
                  {canAddChild ? (
                    <>
                      <p className="text-[11px] text-quest-muted mb-2">
                        Adding to: <span className="text-amber-400 font-medium">{selectedNode.name}/</span>
                      </p>
                      <div className="flex gap-2 mb-2">
                        <button
                          onClick={() => setNewItemType('file')}
                          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                            ${newItemType === 'file' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'bg-quest-surface border border-white/10 text-quest-muted'}`}
                        >
                          <File size={12} className="inline mr-1" /> File
                        </button>
                        <button
                          onClick={() => setNewItemType('folder')}
                          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                            ${newItemType === 'folder' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40' : 'bg-quest-surface border border-white/10 text-quest-muted'}`}
                        >
                          <Folder size={12} className="inline mr-1" /> Folder
                        </button>
                      </div>
                      <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddItem()}
                        placeholder={newItemType === 'file' ? 'filename.ext' : 'folder-name'}
                        className="w-full px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-sm text-quest-text placeholder:text-quest-muted/50 mb-2"
                      />
                      <button
                        onClick={handleAddItem}
                        disabled={!newItemName.trim()}
                        className="btn-primary w-full text-sm disabled:opacity-50"
                      >
                        Add {newItemType === 'file' ? 'File' : 'Folder'}
                      </button>
                    </>
                  ) : (
                    <p className="text-[11px] text-quest-muted">
                      {selectedNodeId
                        ? 'Selected node is a file. Select a folder to add children.'
                        : 'Click a folder in the tree to select it, then add items here.'}
                    </p>
                  )}
                </div>

                {/* Remove */}
                {selectedNodeId && selectedNodeId !== 'root' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-quest-bg rounded-xl p-4 border border-red-500/20"
                  >
                    <button
                      onClick={handleRemoveNode}
                      className="w-full px-3 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/20 transition-colors"
                    >
                      Remove "{selectedNode?.name}"
                    </button>
                  </motion.div>
                )}

                {/* Traversal controls */}
                <div className="bg-quest-bg rounded-xl p-4 border border-amber-500/20">
                  <h4 className="text-sm font-semibold mb-2 text-amber-400">Recursive getSize()</h4>
                  <p className="text-[10px] text-quest-muted mb-3">
                    Watch getSize() traverse every node in the tree, depth-first.
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={handleTraverseGetSize}
                      disabled={traversing}
                      className="w-full px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-sm font-medium hover:bg-amber-500/20 transition-colors disabled:opacity-50"
                    >
                      {traversing ? 'Traversing...' : 'Run getSize()'}
                    </button>
                    {traversalTotal !== null && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center p-2 rounded-lg bg-green-500/10 border border-green-500/30"
                      >
                        <p className="text-xs text-green-400 font-medium">Total: {traversalTotal} bytes</p>
                        <p className="text-[10px] text-quest-muted mt-1">Visited {traversalOrder.length} nodes</p>
                      </motion.div>
                    )}
                    {traversalOrder.length > 0 && (
                      <button
                        onClick={handleClearTraversal}
                        className="w-full px-3 py-1.5 rounded-lg bg-quest-surface border border-white/10 text-[11px] text-quest-muted hover:text-quest-text transition-colors"
                      >
                        Clear highlights
                      </button>
                    )}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={() => { setFileTree(cloneTree(initialTree)); setSelectedNodeId(null); handleClearTraversal() }}
                  className="w-full px-3 py-2 rounded-lg bg-quest-surface border border-white/10 text-xs text-quest-muted hover:text-quest-text transition-colors"
                >
                  Reset Tree
                </button>
              </div>
            </div>

            <DeepDive id="composite-operations" title="Operations Beyond getSize()" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The beauty of Composite:</strong> any operation that makes sense
                  for a leaf also makes sense for a composite. Consider:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong className="text-quest-text">delete()</strong> -- deleting a folder recursively deletes all children</li>
                  <li><strong className="text-quest-text">search(name)</strong> -- searching a folder searches all children</li>
                  <li><strong className="text-quest-text">render()</strong> -- rendering a UI composite renders all children</li>
                  <li><strong className="text-quest-text">serialize()</strong> -- serializing a tree converts the whole structure to JSON</li>
                </ul>
                <p>
                  Each of these operations follows the same recursive pattern: the leaf handles itself directly,
                  the composite delegates to its children and combines the results.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                The Bridge Pattern
                <GitBranch size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: Bridge Pattern ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GitBranch className="text-purple-400" />
              The Bridge Pattern
            </h2>

            <p className="text-quest-muted mb-4">
              Imagine you need shapes (Circle, Square, Triangle) in colors (Red, Blue, Green).
              Without the{' '}
              <Term
                word="Bridge Pattern"
                definition="A structural pattern that decouples an abstraction (e.g., Shape) from its implementation (e.g., Color/Renderer), allowing both to vary independently. Instead of creating every possible combination as a separate class, you compose the two dimensions at runtime."
                onLearn={learnTerm}
              />
              , you get a class explosion. With it, you{' '}
              <Term
                word="Decouple"
                definition="To separate two concerns so they can vary independently. In Bridge, the abstraction (what something is) is decoupled from the implementation (how it behaves), connected only by a reference (the 'bridge')."
                onLearn={learnTerm}
              />{' '}
              shape from color and compose them freely.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => setBridgeMode('without')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${bridgeMode === 'without'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-quest-surface text-quest-muted border border-white/10'}`}
              >
                Without Bridge (9 classes)
              </button>
              <button
                onClick={() => setBridgeMode('with')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${bridgeMode === 'with'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                    : 'bg-quest-surface text-quest-muted border border-white/10'}`}
              >
                With Bridge (3+3 classes)
              </button>
            </div>

            <AnimatePresence mode="wait">
              {bridgeMode === 'without' ? (
                <motion.div
                  key="without"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-quest-bg rounded-xl p-6 mb-6"
                >
                  <h3 className="text-sm font-semibold mb-2 text-red-400">Class Explosion: 9 Classes</h3>
                  <p className="text-[11px] text-quest-muted mb-4">
                    Every combination of shape and color requires its own class. Add a 4th color? That is 3 more classes.
                    Add a 4th shape? Another 4 classes. This grows as M x N.
                  </p>

                  {/* 3x3 grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {shapesWithout.map((cls) => {
                      const color = cls.startsWith('Red') ? '#ef4444' : cls.startsWith('Blue') ? '#3b82f6' : '#22c55e'
                      const shape = cls.replace(/Red|Blue|Green/, '')
                      return (
                        <motion.div
                          key={cls}
                          whileHover={{ scale: 1.05 }}
                          className="bg-quest-surface rounded-lg p-3 border border-red-500/20 text-center"
                        >
                          <div className="flex justify-center mb-2">
                            {shapeIcons[shape]?.(color, 36)}
                          </div>
                          <p className="text-[10px] font-mono text-red-400">{cls}</p>
                        </motion.div>
                      )
                    })}
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-xs text-red-400">
                      Adding "Yellow" means creating YellowCircle, YellowSquare, YellowTriangle -- 3 new classes.
                      With 10 shapes x 10 colors you need 100 classes!
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="with"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-quest-bg rounded-xl p-6 mb-6"
                >
                  <h3 className="text-sm font-semibold mb-2 text-green-400">Bridge: 3 + 3 = 6 Classes</h3>
                  <p className="text-[11px] text-quest-muted mb-4">
                    Shapes and colors are independent dimensions. Pick a shape, pick a color, compose them.
                    Add a 4th color? Just 1 new class. Add a 4th shape? Also just 1 new class. Growth is M + N.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Shapes column */}
                    <div>
                      <h4 className="text-xs font-semibold text-quest-muted mb-2 text-center">Abstraction: Shapes</h4>
                      <div className="space-y-2">
                        {shapesWithBridge.shapes.map((shape) => (
                          <button
                            key={shape}
                            onClick={() => setSelectedShape(shape)}
                            className={`w-full px-4 py-3 rounded-lg border transition-all flex items-center gap-3
                              ${selectedShape === shape
                                ? 'bg-purple-500/20 border-purple-500/40'
                                : 'bg-quest-surface border-white/10 hover:border-white/20'}`}
                          >
                            {shapeIcons[shape]?.('#9ca3af', 32)}
                            <span className="text-sm font-medium">{shape}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Colors column */}
                    <div>
                      <h4 className="text-xs font-semibold text-quest-muted mb-2 text-center">Implementation: Colors</h4>
                      <div className="space-y-2">
                        {shapesWithBridge.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-full px-4 py-3 rounded-lg border transition-all flex items-center gap-3
                              ${selectedColor === color
                                ? 'bg-purple-500/20 border-purple-500/40'
                                : 'bg-quest-surface border-white/10 hover:border-white/20'}`}
                          >
                            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: colorValues[color] }} />
                            <span className="text-sm font-medium">{color}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Composed result */}
                  {selectedShape && selectedColor && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-6 p-4 rounded-xl bg-quest-surface border border-purple-500/30 text-center"
                    >
                      <p className="text-xs text-quest-muted mb-2">Composed at runtime:</p>
                      <div className="flex justify-center mb-2">
                        {shapeIcons[selectedShape]?.(colorValues[selectedColor], 64)}
                      </div>
                      <p className="text-sm font-mono text-purple-400">
                        new {selectedShape}(new {selectedColor}Renderer())
                      </p>
                    </motion.div>
                  )}

                  <div className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-400">
                      Adding "Yellow" means just 1 new class: YellowRenderer. All existing shapes work with it
                      instantly. With 10 shapes + 10 colors you need only 20 classes!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Side by side comparison */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3 text-center">Growth Comparison</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-3">Without Bridge (M x N)</p>
                  <div className="space-y-2">
                    {[
                      { label: '3 x 3', val: 9, max: 100 },
                      { label: '5 x 5', val: 25, max: 100 },
                      { label: '10 x 10', val: 100, max: 100 },
                    ].map(({ label, val, max }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] text-quest-muted mb-1">
                          <span>{label}</span>
                          <span className="text-red-400">{val} classes</span>
                        </div>
                        <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(val / max) * 100}%` }}
                            transition={{ delay: 0.2 }}
                            className="h-full bg-red-500/60 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-quest-muted mb-3">With Bridge (M + N)</p>
                  <div className="space-y-2">
                    {[
                      { label: '3 + 3', val: 6, max: 100 },
                      { label: '5 + 5', val: 10, max: 100 },
                      { label: '10 + 10', val: 20, max: 100 },
                    ].map(({ label, val, max }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[10px] text-quest-muted mb-1">
                          <span>{label}</span>
                          <span className="text-green-400">{val} classes</span>
                        </div>
                        <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(val / max) * 100}%` }}
                            transition={{ delay: 0.2 }}
                            className="h-full bg-green-500/60 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bridge code example */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 font-mono text-xs leading-relaxed overflow-x-auto">
              <p className="text-quest-muted mb-2">// Bridge pattern structure:</p>
              <p className="text-purple-400">{'// Implementor (the "bridge" interface)'}</p>
              <p className="text-sky-400">{'class RedRenderer   { fill(shape) { /* render red */   } }'}</p>
              <p className="text-sky-400">{'class BlueRenderer  { fill(shape) { /* render blue */  } }'}</p>
              <p className="text-sky-400">{'class GreenRenderer { fill(shape) { /* render green */ } }'}</p>
              <br />
              <p className="text-purple-400">{'// Abstraction (holds a reference to implementor)'}</p>
              <p className="text-yellow-400">{'class Circle   { constructor(renderer) { this.r = renderer; } draw() { this.r.fill("circle"); }  }'}</p>
              <p className="text-yellow-400">{'class Square   { constructor(renderer) { this.r = renderer; } draw() { this.r.fill("square"); }  }'}</p>
              <p className="text-yellow-400">{'class Triangle { constructor(renderer) { this.r = renderer; } draw() { this.r.fill("triangle"); }}'}</p>
              <br />
              <p className="text-green-400">{'const blueCircle = new Circle(new BlueRenderer());'}</p>
              <p className="text-green-400">{'blueCircle.draw(); // Blue circle -- composed, not inherited'}</p>
            </div>

            <DeepDive id="bridge-vs-adapter" title="Bridge vs Adapter vs Strategy" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Bridge vs Adapter:</strong> Adapter makes two existing
                  incompatible interfaces work together (post-hoc fix). Bridge is designed up-front to separate
                  abstraction from implementation so both can evolve independently. Adapter fixes; Bridge prevents.
                </p>
                <p>
                  <strong className="text-quest-text">Bridge vs Strategy:</strong> Both use composition over inheritance.
                  Strategy swaps algorithms (behavior) behind a single interface. Bridge separates two independent
                  dimension hierarchies. Strategy has one varying dimension; Bridge has two.
                </p>
                <p>
                  <strong className="text-quest-text">Real-World Bridge Examples:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>JDBC: the database API (abstraction) is separated from driver implementations (MySQL, Postgres, etc.)</li>
                  <li>Platform rendering: a UI widget (abstraction) delegates drawing to a platform renderer (Windows, macOS, Linux)</li>
                  <li>Notification system: notification types (alert, reminder) + channels (email, SMS, push)</li>
                </ul>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Recursive Operations
                <Layers size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: Recursive Operations ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-sky-400" />
              Recursive Operations on Composites
            </h2>

            <p className="text-quest-muted mb-6">
              The real power of composite trees is that operations propagate recursively.
              A single call at the root fans out to every node. Let's trace how this works,
              step by step.
            </p>

            {/* Static trace diagram */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4 text-center text-amber-400">
                Tracing getSize() on a Composite Tree
              </h3>

              {/* Stylized tree with call stack */}
              <div className="space-y-4">
                {[
                  { depth: 0, name: 'project/', call: 'getSize()', result: '= 803 B', color: 'border-yellow-500/40', bg: 'bg-yellow-500/10' },
                  { depth: 1, name: 'src/', call: 'getSize()', result: '= 730 B', color: 'border-yellow-500/30', bg: 'bg-yellow-500/5' },
                  { depth: 2, name: 'index.js', call: 'getSize()', result: '= 120 B', color: 'border-sky-500/30', bg: 'bg-sky-500/5' },
                  { depth: 2, name: 'App.jsx', call: 'getSize()', result: '= 340 B', color: 'border-sky-500/30', bg: 'bg-sky-500/5' },
                  { depth: 2, name: 'components/', call: 'getSize()', result: '= 270 B', color: 'border-yellow-500/30', bg: 'bg-yellow-500/5' },
                  { depth: 3, name: 'Header.jsx', call: 'getSize()', result: '= 180 B', color: 'border-sky-500/30', bg: 'bg-sky-500/5' },
                  { depth: 3, name: 'Footer.jsx', call: 'getSize()', result: '= 90 B', color: 'border-sky-500/30', bg: 'bg-sky-500/5' },
                  { depth: 1, name: 'README.md', call: 'getSize()', result: '= 45 B', color: 'border-sky-500/30', bg: 'bg-sky-500/5' },
                  { depth: 1, name: 'package.json', call: 'getSize()', result: '= 28 B', color: 'border-sky-500/30', bg: 'bg-sky-500/5' },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${row.color} ${row.bg}`}
                    style={{ marginLeft: `${row.depth * 28}px` }}
                  >
                    {row.name.endsWith('/') ? (
                      <Folder size={14} className="text-yellow-400 flex-shrink-0" />
                    ) : (
                      <File size={14} className="text-sky-400 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium min-w-[120px]">{row.name}</span>
                    <span className="text-[11px] font-mono text-quest-muted">{row.call}</span>
                    <span className="text-[11px] font-mono text-green-400 ml-auto">{row.result}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 text-[10px] text-quest-muted justify-center">
                <span className="flex items-center gap-1"><File size={10} className="text-sky-400" /> Leaf: returns own size</span>
                <span className="flex items-center gap-1"><Folder size={10} className="text-yellow-400" /> Composite: sums children</span>
              </div>
            </div>

            {/* Call stack visualization */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">The Recursive Call Stack</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded-lg p-4">
                  <p className="text-xs font-medium text-amber-400 mb-2">Going Down (Dispatch)</p>
                  <div className="space-y-1 font-mono text-[10px]">
                    {[
                      'project.getSize()',
                      '  src.getSize()',
                      '    index.js.getSize() -> 120',
                      '    App.jsx.getSize() -> 340',
                      '    components.getSize()',
                      '      Header.jsx.getSize() -> 180',
                      '      Footer.jsx.getSize() -> 90',
                    ].map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="text-quest-muted"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4">
                  <p className="text-xs font-medium text-green-400 mb-2">Coming Back Up (Aggregate)</p>
                  <div className="space-y-1 font-mono text-[10px]">
                    {[
                      'Footer.jsx returns 90',
                      'Header.jsx returns 180',
                      'components returns 180 + 90 = 270',
                      'App.jsx returns 340',
                      'index.js returns 120',
                      'src returns 120 + 340 + 270 = 730',
                      'README returns 45, package returns 28',
                      'project returns 730 + 45 + 28 = 803',
                    ].map((line, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="text-quest-muted"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other recursive operations */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Common Recursive Operations</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    op: 'getSize()',
                    leaf: 'return this.size',
                    composite: 'children.reduce((s, c) => s + c.getSize(), 0)',
                    color: 'text-amber-400',
                  },
                  {
                    op: 'find(name)',
                    leaf: 'return this.name === name ? this : null',
                    composite: 'check self, then search children',
                    color: 'text-sky-400',
                  },
                  {
                    op: 'print(indent)',
                    leaf: 'console.log(indent + name)',
                    composite: 'print self, then print each child',
                    color: 'text-green-400',
                  },
                ].map((item) => (
                  <div key={item.op} className="bg-quest-bg rounded-lg p-3">
                    <p className={`text-xs font-semibold ${item.color} mb-2 font-mono`}>{item.op}</p>
                    <div className="space-y-1.5">
                      <div>
                        <p className="text-[10px] text-quest-muted">Leaf:</p>
                        <p className="text-[10px] font-mono text-quest-text">{item.leaf}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-quest-muted">Composite:</p>
                        <p className="text-[10px] font-mono text-quest-text">{item.composite}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time/space complexity */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Complexity of Recursive Traversal</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10">
                  <p className="text-xs font-medium text-sky-400 mb-2">Time Complexity</p>
                  <p className="text-lg font-mono font-bold text-sky-400 mb-1">O(n)</p>
                  <p className="text-[11px] text-quest-muted">
                    Every node is visited exactly once. Whether you call getSize(), find(), or
                    print(), a full traversal touches all n nodes.
                  </p>
                </div>
                <div className="bg-quest-surface rounded-lg p-4 border border-white/10">
                  <p className="text-xs font-medium text-amber-400 mb-2">Space Complexity</p>
                  <p className="text-lg font-mono font-bold text-amber-400 mb-1">O(d)</p>
                  <p className="text-[11px] text-quest-muted">
                    The recursive call stack grows proportional to the tree depth (d). For a balanced
                    tree, d = O(log n). For a degenerate tree, d = O(n).
                  </p>
                </div>
              </div>
            </div>

            <DeepDive id="composite-pitfalls" title="Composite Pattern Pitfalls" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Circular References:</strong> If a folder accidentally contains
                  itself (directly or through a chain), recursive operations will loop forever. Real file systems
                  prevent this; your code should too. Detect cycles with a visited set.
                </p>
                <p>
                  <strong className="text-quest-text">Performance with Deep Trees:</strong> Naive recursion can blow
                  the stack with very deep trees (thousands of levels). Solutions: iterative traversal with an explicit
                  stack, or tail-call optimization (where supported). Caching computed values (e.g., memoizing getSize)
                  avoids redundant traversals.
                </p>
                <p>
                  <strong className="text-quest-text">Type Safety:</strong> The uniform interface means you might
                  accidentally call addChild() on a leaf. Use runtime checks or, better, use a type system
                  (TypeScript discriminated unions) to make illegal states unrepresentable.
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

      {/* ═══════════════════ SECTION 4: Quiz ═══════════════════ */}
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
              Composite and Bridge are fundamental structural patterns. Let's verify your understanding.
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
                <h3 className="text-xl font-bold mb-2">Level 36 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how the Composite pattern models part-whole hierarchies with a uniform interface,
                  and how the Bridge pattern prevents class explosion by decoupling abstraction from implementation.
                </p>
                <p className="text-sm text-amber-400">
                  Trees grow from small seeds. Your design patterns knowledge is branching out nicely.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

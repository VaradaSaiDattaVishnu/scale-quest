import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Database, Search, Zap, Clock, BarChart3, TreePine, Hash,
  Layers, GitBranch
} from 'lucide-react'

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

export default function Level10({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [scanAnimating, setScanAnimating] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['intro', 'btree', 'types', 'optimization', 'quiz']

  const quizQuestions = [
    {
      id: 'q1',
      question: 'Why is a full table scan slow on large tables?',
      options: [
        { id: 'a', text: 'The database runs out of memory and crashes', correct: false },
        { id: 'b', text: 'It must examine every single row in the table regardless of how many match the query', correct: true },
        { id: 'c', text: 'SQL syntax is inherently slow on large datasets', correct: false },
        { id: 'd', text: 'The table gets locked and no other queries can run', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'What is the time complexity of a B-Tree index lookup?',
      options: [
        { id: 'a', text: 'O(1) - constant time like a hash table', correct: false },
        { id: 'b', text: 'O(n) - linear time, same as a full scan', correct: false },
        { id: 'c', text: 'O(log n) - logarithmic time, much faster than O(n) full scan', correct: true },
        { id: 'd', text: 'O(n log n) - linearithmic time due to sorting', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'When would a hash index be preferred over a B-Tree?',
      options: [
        { id: 'a', text: 'When you need to sort results by the indexed column', correct: false },
        { id: 'b', text: 'When you only need exact equality lookups and don\'t need range queries', correct: true },
        { id: 'c', text: 'When the table has fewer than 1000 rows', correct: false },
        { id: 'd', text: 'When you need to index multiple columns at once', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What is a covering index?',
      options: [
        { id: 'a', text: 'An index that spans all tables in a database', correct: false },
        { id: 'b', text: 'An index that automatically updates when data changes', correct: false },
        { id: 'c', text: 'An index that contains all columns needed by a query, eliminating the need to access the actual table', correct: true },
        { id: 'd', text: 'An index that covers both equality and range queries', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const sampleRows = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Karl', 'Lara'][i],
    email: ['alice', 'bob', 'carol', 'dave', 'eve', 'frank', 'grace', 'heidi', 'ivan', 'judy', 'karl', 'lara'][i] + '@example.com',
  }))

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Navigation */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === index
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* SECTION: INTRO */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="text-quest-primary" />
              Index Everything
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "A simple SELECT query takes 30 seconds on a table with 10 million rows.
                Users are furious. The database CPU is at 100%. A simple query brings your
                database to its knees. Time to learn why."
              </p>
            </div>

            <p className="text-quest-muted mb-6">
              Without an index, the database must perform a{' '}
              <strong>full table scan</strong>—checking every single row to find matches.
              Think of it like reading an entire book cover-to-cover to find one topic, instead
              of using the index at the back.
            </p>

            {/* Visual: Full Table Scan vs Index Lookup */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Full Table Scan */}
              <div className="bg-quest-surface rounded-xl p-5 border border-quest-danger/30">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={20} className="text-quest-danger" />
                  <h4 className="font-semibold text-quest-danger">Full Table Scan (No Index)</h4>
                </div>
                <p className="text-xs text-quest-muted mb-3">
                  SELECT * FROM users WHERE name = 'Karl'
                </p>
                <div className="space-y-1 mb-3">
                  {sampleRows.map((row, i) => (
                    <motion.div
                      key={row.id}
                      className="bg-quest-bg rounded px-3 py-1 text-xs font-mono flex justify-between"
                      initial={{ opacity: 0.3 }}
                      animate={scanAnimating ? {
                        opacity: [0.3, 1, 0.3],
                        backgroundColor: row.name === 'Karl'
                          ? ['rgba(0,0,0,0)', 'rgba(34,197,94,0.2)', 'rgba(34,197,94,0.2)']
                          : ['rgba(0,0,0,0)', 'rgba(239,68,68,0.1)', 'rgba(0,0,0,0)']
                      } : {}}
                      transition={{ delay: i * 0.15, duration: 0.3 }}
                    >
                      <span>{row.id}. {row.name}</span>
                      <span className="text-quest-muted">{row.name === 'Karl' ? 'MATCH' : 'skip'}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-quest-danger font-medium">
                  Checks ALL 12 rows. On 10M rows = 30 seconds
                </p>
              </div>

              {/* Indexed Lookup */}
              <div className="bg-quest-surface rounded-xl p-5 border border-quest-success/30">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={20} className="text-quest-success" />
                  <h4 className="font-semibold text-quest-success">Index Lookup (With Index)</h4>
                </div>
                <p className="text-xs text-quest-muted mb-3">
                  SELECT * FROM users WHERE name = 'Karl'
                </p>
                <div className="space-y-1 mb-3">
                  <motion.div
                    className="bg-quest-bg rounded px-3 py-2 text-xs font-mono border border-quest-primary/30"
                    animate={scanAnimating ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    Index: "Karl" --&gt; row #11
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-2 text-quest-muted text-xs py-1"
                    animate={scanAnimating ? { opacity: [0, 1] } : {}}
                    transition={{ delay: 0.5 }}
                  >
                    <ArrowRight size={14} />
                    Jump directly to row 11
                  </motion.div>
                  <motion.div
                    className="bg-quest-success/10 rounded px-3 py-1 text-xs font-mono border border-quest-success/30"
                    animate={scanAnimating ? { opacity: [0, 1] } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    11. Karl - karl@example.com - FOUND
                  </motion.div>
                </div>
                <p className="text-xs text-quest-success font-medium">
                  Checks ~3 index nodes. On 10M rows = 0.001 seconds
                </p>
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={() => setScanAnimating(!scanAnimating)}
                className="btn-secondary text-sm"
              >
                {scanAnimating ? 'Reset Animation' : 'Play Comparison'}
              </button>
            </div>

            {/* Performance Comparison */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="text-quest-warning" />
                Performance Comparison
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded p-4">
                  <p className="text-sm font-medium text-quest-danger mb-2">Full Table Scan</p>
                  <p className="text-2xl font-bold text-quest-danger">O(n)</p>
                  <p className="text-xs text-quest-muted mt-1">
                    10M rows = 10M comparisons
                  </p>
                  <div className="mt-2 w-full bg-quest-danger/20 rounded-full h-3">
                    <div className="bg-quest-danger h-3 rounded-full w-full"></div>
                  </div>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <p className="text-sm font-medium text-quest-success mb-2">Indexed Lookup</p>
                  <p className="text-2xl font-bold text-quest-success">O(log n)</p>
                  <p className="text-xs text-quest-muted mt-1">
                    10M rows = ~23 comparisons
                  </p>
                  <div className="mt-2 w-full bg-quest-success/20 rounded-full h-3">
                    <div className="bg-quest-success h-3 rounded-full" style={{ width: '2%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term
                word="B-Tree Index"
                definition="A balanced tree data structure that maintains sorted data and allows searches, insertions, and deletions in O(log n) time. The most common index type in databases."
                onLearn={learnTerm}
              />{' '}
              is the most common database index structure. It turns O(n) full scans into
              O(log n) lookups by organizing data in a sorted, balanced tree.
            </p>

            <DeepDive id="why-not-index-everything" title="Why Not Index Everything?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Write overhead:</strong> Every INSERT, UPDATE, or DELETE must also update
                every index on that table. More indexes = slower writes.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Storage cost:</strong> Indexes consume disk space. A table with 5 indexes
                might use 2-3x the storage of the data itself.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Index maintenance:</strong> Indexes can become fragmented over time,
                requiring periodic rebuilding. The query planner also takes longer to evaluate
                execution plans when there are many indexes to choose from.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Learn B-Trees
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: B-TREE */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TreePine className="text-quest-primary" />
              B-Tree Index: How It Works
            </h2>

            <p className="text-quest-muted mb-6">
              A{' '}
              <Term
                word="B-Tree Index"
                definition="A balanced tree data structure that maintains sorted data and allows searches, insertions, and deletions in O(log n) time. Used by most relational databases as the default index type."
                onLearn={learnTerm}
              />{' '}
              organizes data in a sorted, balanced tree. Each node can have multiple keys and
              children, keeping the tree shallow even with millions of entries.
            </p>

            {/* B-Tree Visual */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center">B-Tree Structure (3 Levels)</h3>
              <p className="text-xs text-quest-muted text-center mb-6">
                Searching for value <span className="text-quest-warning font-bold">42</span> --
                highlighted path shows the lookup route
              </p>

              {/* Level 0 - Root */}
              <div className="flex justify-center mb-4">
                <motion.div
                  className="bg-quest-warning/20 border-2 border-quest-warning rounded-lg px-6 py-3 text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="text-xs text-quest-muted mb-1">Root Node</p>
                  <div className="flex gap-4 font-mono font-bold">
                    <span className="text-quest-muted">20</span>
                    <span className="text-quest-warning">|</span>
                    <span className="text-quest-warning">50</span>
                  </div>
                  <p className="text-xs text-quest-warning mt-1">20 &lt; 42 &lt; 50 -- go middle</p>
                </motion.div>
              </div>

              {/* Branches from root */}
              <div className="flex justify-center mb-1">
                <div className="flex gap-16 text-quest-muted text-xs">
                  <span>/</span>
                  <span className="text-quest-warning">|</span>
                  <span>\</span>
                </div>
              </div>

              {/* Level 1 - Internal Nodes */}
              <div className="flex justify-center gap-4 mb-4">
                <motion.div
                  className="bg-quest-surface border border-white/10 rounded-lg px-4 py-2 text-center opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex gap-3 font-mono text-sm">
                    <span>5</span>
                    <span>|</span>
                    <span>15</span>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-quest-warning/20 border-2 border-quest-warning rounded-lg px-4 py-2 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex gap-3 font-mono text-sm font-bold">
                    <span className="text-quest-muted">30</span>
                    <span className="text-quest-warning">|</span>
                    <span className="text-quest-warning">45</span>
                  </div>
                  <p className="text-xs text-quest-warning mt-1">30 &lt; 42 &lt; 45 -- go middle</p>
                </motion.div>

                <motion.div
                  className="bg-quest-surface border border-white/10 rounded-lg px-4 py-2 text-center opacity-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex gap-3 font-mono text-sm">
                    <span>60</span>
                    <span>|</span>
                    <span>80</span>
                  </div>
                </motion.div>
              </div>

              {/* Branches to leaves */}
              <div className="flex justify-center mb-1">
                <div className="flex gap-12 text-quest-muted text-xs">
                  <span className="opacity-40">/|\</span>
                  <span className="text-quest-warning">/|\ </span>
                  <span className="opacity-40">/|\</span>
                </div>
              </div>

              {/* Level 2 - Leaf Nodes */}
              <div className="flex justify-center gap-2 flex-wrap">
                {[
                  { keys: '1,3,5', highlight: false },
                  { keys: '10,12,15', highlight: false },
                  { keys: '21,25,28', highlight: false },
                  { keys: '31,35,38', highlight: false },
                  { keys: '40,42,44', highlight: true },
                  { keys: '46,48,50', highlight: false },
                  { keys: '55,58,60', highlight: false },
                  { keys: '70,75,80', highlight: false },
                  { keys: '85,90,99', highlight: false },
                ].map((leaf, i) => (
                  <motion.div
                    key={i}
                    className={`rounded px-2 py-1 text-xs font-mono
                      ${leaf.highlight
                        ? 'bg-quest-warning/20 border border-quest-warning text-quest-warning font-bold'
                        : 'bg-quest-surface border border-white/10 opacity-40'
                      }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: leaf.highlight ? 1 : 0.4 }}
                    transition={{ delay: 0.6 }}
                  >
                    {leaf.keys}
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-center text-sm text-quest-success font-medium mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Found 42 in just 3 steps (out of 27 values)
              </motion.p>
            </div>

            {/* How lookups work */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">How B-Tree Lookups Work</h3>
              <div className="space-y-3">
                {[
                  { step: 1, text: 'Start at root node. Compare target with keys to pick a branch.' },
                  { step: 2, text: 'Move to internal node. Again compare and pick the right child.' },
                  { step: 3, text: 'Reach leaf node. Scan the small set of sorted keys to find the match.' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-quest-primary/20 flex items-center justify-center text-quest-primary font-bold text-sm shrink-0">
                      {item.step}
                    </span>
                    <p className="text-sm text-quest-muted">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-quest-muted mt-4">
                Key insight: The tree is <strong>balanced</strong>, meaning all leaf nodes are at the
                same depth. This guarantees O(log n) performance regardless of which value you search for.
              </p>
            </div>

            {/* Impact of writes */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <GitBranch className="text-quest-secondary" />
                How Writes Affect the Index
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-quest-bg rounded p-4">
                  <p className="font-medium text-quest-primary mb-2">INSERT</p>
                  <p className="text-xs text-quest-muted">
                    New key added to the correct leaf node. If the leaf is full, it splits into
                    two and the parent gains a new child. This may cascade up the tree.
                  </p>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <p className="font-medium text-quest-warning mb-2">UPDATE</p>
                  <p className="text-xs text-quest-muted">
                    If the indexed column changes, the old entry is removed and a new one inserted.
                    Effectively a DELETE + INSERT on the index.
                  </p>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <p className="font-medium text-quest-danger mb-2">DELETE</p>
                  <p className="text-xs text-quest-muted">
                    Key removed from leaf. If the leaf becomes too empty, it may merge with
                    a neighbor. This rebalancing keeps the tree efficient.
                  </p>
                </div>
              </div>
            </div>

            <DeepDive id="btree-vs-bplus" title="B-Tree vs B+ Tree" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>B-Tree:</strong> Stores data in both internal nodes and leaf nodes. Any node
                can contain the actual row pointer.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>B+ Tree:</strong> Stores data <em>only in leaf nodes</em>. Internal nodes
                contain only keys for navigation. Leaf nodes are linked together in a doubly-linked
                list for efficient range scans.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                Most real databases (PostgreSQL, MySQL/InnoDB, Oracle) use B+ Trees because:
              </p>
              <ul className="text-sm text-quest-muted space-y-1 ml-4">
                <li>- Internal nodes fit more keys (no data pointers), so the tree is shallower</li>
                <li>- Range queries are fast: just follow the leaf-level linked list</li>
                <li>- All lookups take the same number of steps (always reach a leaf)</li>
              </ul>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Index Types
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: TYPES */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-quest-secondary" />
              Index Types
            </h2>

            <p className="text-quest-muted mb-6">
              Different data patterns call for different index types. Choosing the right one
              can mean the difference between milliseconds and minutes.
            </p>

            {/* Index Type Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Hash Index */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Hash size={20} className="text-quest-warning" />
                  <h4 className="font-semibold">
                    <Term
                      word="Hash Index"
                      definition="Uses a hash function to map keys to locations for O(1) equality lookups. Cannot perform range queries or sorting. Best for exact-match searches."
                      onLearn={learnTerm}
                    />
                  </h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  A hash function maps a key directly to a location. Lightning fast for
                  exact matches, but useless for ranges.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs mb-3">
                  <p className="text-quest-muted">-- Perfect for:</p>
                  <p>SELECT * FROM users WHERE id = 42;</p>
                  <p className="text-quest-muted mt-2">-- Cannot do:</p>
                  <p className="text-quest-danger">SELECT * FROM users WHERE id &gt; 10;</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-1 rounded">O(1) equality</span>
                  <span className="text-xs bg-quest-danger/20 text-quest-danger px-2 py-1 rounded">No range queries</span>
                  <span className="text-xs bg-quest-danger/20 text-quest-danger px-2 py-1 rounded">No sorting</span>
                </div>
              </div>

              {/* Composite Index */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Layers size={20} className="text-quest-primary" />
                  <h4 className="font-semibold">
                    <Term
                      word="Composite Index"
                      definition="An index on multiple columns. Column order matters: (a, b, c) can serve queries on (a), (a, b), or (a, b, c) but NOT (b) alone or (c) alone."
                      onLearn={learnTerm}
                    />
                  </h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  Index on multiple columns. The order of columns matters -- it follows the
                  "leftmost prefix" rule.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs mb-3">
                  <p className="text-quest-primary">CREATE INDEX idx_name_date</p>
                  <p className="text-quest-primary">ON orders (user_id, created_at);</p>
                  <p className="text-quest-muted mt-2">-- Uses index (left prefix):</p>
                  <p>WHERE user_id = 1</p>
                  <p>WHERE user_id = 1 AND created_at &gt; ...</p>
                  <p className="text-quest-muted mt-1">-- Cannot use index:</p>
                  <p className="text-quest-danger">WHERE created_at &gt; ...</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-1 rounded">Multi-column</span>
                  <span className="text-xs bg-quest-warning/20 text-quest-warning px-2 py-1 rounded">Order matters</span>
                </div>
              </div>

              {/* Covering Index */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Search size={20} className="text-quest-success" />
                  <h4 className="font-semibold">
                    <Term
                      word="Covering Index"
                      definition="An index that contains all columns needed by a query, so the database can answer the query entirely from the index without ever accessing the actual table rows."
                      onLearn={learnTerm}
                    />
                  </h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  When an index includes all columns a query needs, the database never has
                  to touch the actual table -- an "index-only scan."
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs mb-3">
                  <p className="text-quest-primary">CREATE INDEX idx_covering</p>
                  <p className="text-quest-primary">ON orders (user_id, status, total);</p>
                  <p className="text-quest-muted mt-2">-- Index-only scan (all cols in index):</p>
                  <p>SELECT status, total FROM orders</p>
                  <p>WHERE user_id = 1;</p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-1 rounded">No table access</span>
                  <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-1 rounded">Fastest reads</span>
                  <span className="text-xs bg-quest-warning/20 text-quest-warning px-2 py-1 rounded">Larger index</span>
                </div>
              </div>

              {/* Index Cardinality */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 size={20} className="text-quest-secondary" />
                  <h4 className="font-semibold">
                    <Term
                      word="Index Cardinality"
                      definition="The number of unique values in an indexed column. High cardinality (e.g., email) makes indexes very selective and efficient. Low cardinality (e.g., boolean) makes indexes less useful."
                      onLearn={learnTerm}
                    />
                  </h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  Cardinality measures how many unique values exist. Higher cardinality means
                  the index is more selective and useful.
                </p>
                <div className="space-y-2 mb-3">
                  <div className="bg-quest-bg rounded p-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono">email (unique)</span>
                      <span className="text-quest-success font-medium">HIGH cardinality</span>
                    </div>
                    <div className="mt-1 w-full bg-quest-success/20 rounded-full h-2">
                      <div className="bg-quest-success h-2 rounded-full w-full"></div>
                    </div>
                  </div>
                  <div className="bg-quest-bg rounded p-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono">country</span>
                      <span className="text-quest-warning font-medium">MEDIUM cardinality</span>
                    </div>
                    <div className="mt-1 w-full bg-quest-warning/20 rounded-full h-2">
                      <div className="bg-quest-warning h-2 rounded-full w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-quest-bg rounded p-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono">is_active (boolean)</span>
                      <span className="text-quest-danger font-medium">LOW cardinality</span>
                    </div>
                    <div className="mt-1 w-full bg-quest-danger/20 rounded-full h-2">
                      <div className="bg-quest-danger h-2 rounded-full w-[8%]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-1 rounded">High = good index</span>
                  <span className="text-xs bg-quest-danger/20 text-quest-danger px-2 py-1 rounded">Low = poor index</span>
                </div>
              </div>
            </div>

            {/* CREATE INDEX examples */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">CREATE INDEX Examples</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="bg-quest-surface rounded p-3">
                  <p className="text-quest-muted text-xs mb-1">-- B-Tree (default)</p>
                  <p className="text-quest-primary">CREATE INDEX idx_users_email ON users (email);</p>
                </div>
                <div className="bg-quest-surface rounded p-3">
                  <p className="text-quest-muted text-xs mb-1">-- Hash index (PostgreSQL)</p>
                  <p className="text-quest-warning">CREATE INDEX idx_sessions_token ON sessions USING hash (token);</p>
                </div>
                <div className="bg-quest-surface rounded p-3">
                  <p className="text-quest-muted text-xs mb-1">-- Composite index</p>
                  <p className="text-quest-primary">CREATE INDEX idx_orders_user_date ON orders (user_id, created_at DESC);</p>
                </div>
                <div className="bg-quest-surface rounded p-3">
                  <p className="text-quest-muted text-xs mb-1">-- Unique index</p>
                  <p className="text-quest-success">CREATE UNIQUE INDEX idx_users_email_unique ON users (email);</p>
                </div>
              </div>
            </div>

            <DeepDive id="partial-expression-indexes" title="Partial Indexes & Expression Indexes" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Partial indexes</strong> only index a subset of rows, saving space and
                write overhead:
              </p>
              <div className="bg-quest-bg rounded p-3 font-mono text-xs mb-3">
                <p>CREATE INDEX idx_active_users ON users (email)</p>
                <p>WHERE is_active = true;</p>
                <p className="text-quest-muted mt-1">-- Only indexes active users, not all 10M rows</p>
              </div>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Expression indexes</strong> index computed values, not just raw columns:
              </p>
              <div className="bg-quest-bg rounded p-3 font-mono text-xs mb-3">
                <p>CREATE INDEX idx_lower_email ON users (LOWER(email));</p>
                <p className="text-quest-muted mt-1">-- Supports: WHERE LOWER(email) = 'alice@...'</p>
              </div>
              <p className="text-sm text-quest-muted">
                These advanced index types let you precisely target your workload, reducing
                storage and write costs while still getting fast reads for the queries that matter.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Query Optimization
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: OPTIMIZATION */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-quest-warning" />
              Query Optimization
            </h2>

            <p className="text-quest-muted mb-6">
              Creating indexes is only half the battle. You need to understand how the{' '}
              <Term
                word="Query Planner"
                definition="The database's internal algorithm that analyzes a query and determines the most efficient execution plan. It considers available indexes, table statistics, and cost estimates to choose between sequential scans, index scans, and other strategies."
                onLearn={learnTerm}
              />{' '}
              chooses execution plans, and how to use{' '}
              <Term
                word="EXPLAIN"
                definition="A SQL command that shows the execution plan the database will use for a query. EXPLAIN ANALYZE also runs the query and shows actual timing. Essential for diagnosing slow queries."
                onLearn={learnTerm}
              />{' '}
              to diagnose slow queries.
            </p>

            {/* EXPLAIN Interactive */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Search className="text-quest-primary" />
                Reading EXPLAIN Output
              </h3>

              <div className="mb-4">
                <p className="text-xs text-quest-muted mb-2">Query:</p>
                <div className="bg-quest-surface rounded p-3 font-mono text-sm">
                  SELECT * FROM users WHERE email = 'alice@example.com';
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Without index */}
                <div className="border border-quest-danger/30 rounded-lg p-4">
                  <p className="text-sm font-medium text-quest-danger mb-2 flex items-center gap-2">
                    <Clock size={16} />
                    Without Index
                  </p>
                  <div className="bg-quest-surface rounded p-3 font-mono text-xs space-y-1">
                    <p className="text-quest-danger">Seq Scan on users</p>
                    <p className="text-quest-muted">  Filter: (email = 'alice@...')</p>
                    <p className="text-quest-muted">  Rows Removed by Filter: 9999999</p>
                    <p className="text-quest-muted">  Planning Time: 0.1 ms</p>
                    <p className="text-quest-danger">  Execution Time: 28,432 ms</p>
                  </div>
                  <p className="text-xs text-quest-danger mt-2">
                    Sequential Scan -- reads every row in the table
                  </p>
                </div>

                {/* With index */}
                <div className="border border-quest-success/30 rounded-lg p-4">
                  <p className="text-sm font-medium text-quest-success mb-2 flex items-center gap-2">
                    <Zap size={16} />
                    With Index
                  </p>
                  <div className="bg-quest-surface rounded p-3 font-mono text-xs space-y-1">
                    <p className="text-quest-success">Index Scan using idx_users_email</p>
                    <p className="text-quest-muted">  Index Cond: (email = 'alice@...')</p>
                    <p className="text-quest-muted">  Rows: 1</p>
                    <p className="text-quest-muted">  Planning Time: 0.2 ms</p>
                    <p className="text-quest-success">  Execution Time: 0.05 ms</p>
                  </div>
                  <p className="text-xs text-quest-success mt-2">
                    Index Scan -- jumps straight to the matching row
                  </p>
                </div>
              </div>

              <p className="text-xs text-quest-muted mt-4 text-center">
                28,432 ms vs 0.05 ms -- that is a <strong>568,640x</strong> improvement
              </p>
            </div>

            {/* Antipatterns */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-quest-danger flex items-center gap-2">
                <Clock className="text-quest-danger" />
                Common Index-Killing Antipatterns
              </h3>
              <div className="space-y-4">
                <div className="bg-quest-bg rounded p-4">
                  <p className="text-sm font-medium mb-2">Functions on Indexed Columns</p>
                  <div className="font-mono text-xs space-y-1 mb-2">
                    <p className="text-quest-danger">-- Index on email is NOT used:</p>
                    <p className="text-quest-danger">WHERE UPPER(email) = 'ALICE@EXAMPLE.COM'</p>
                    <p className="text-quest-success mt-1">-- Fix: use expression index or match format:</p>
                    <p className="text-quest-success">WHERE email = 'alice@example.com'</p>
                  </div>
                  <p className="text-xs text-quest-muted">
                    Wrapping an indexed column in a function prevents the database from using the index.
                  </p>
                </div>

                <div className="bg-quest-bg rounded p-4">
                  <p className="text-sm font-medium mb-2">OR Conditions</p>
                  <div className="font-mono text-xs space-y-1 mb-2">
                    <p className="text-quest-danger">-- May not use index efficiently:</p>
                    <p className="text-quest-danger">WHERE email = 'alice@...' OR name = 'Alice'</p>
                    <p className="text-quest-success mt-1">-- Fix: use UNION instead:</p>
                    <p className="text-quest-success">SELECT * FROM users WHERE email = 'alice@...'</p>
                    <p className="text-quest-success">UNION</p>
                    <p className="text-quest-success">SELECT * FROM users WHERE name = 'Alice'</p>
                  </div>
                  <p className="text-xs text-quest-muted">
                    OR across different columns often forces a sequential scan. UNION lets each branch use its own index.
                  </p>
                </div>

                <div className="bg-quest-bg rounded p-4">
                  <p className="text-sm font-medium mb-2">LIKE with Leading Wildcard</p>
                  <div className="font-mono text-xs space-y-1 mb-2">
                    <p className="text-quest-danger">-- Index CANNOT be used:</p>
                    <p className="text-quest-danger">WHERE name LIKE '%alice%'</p>
                    <p className="text-quest-success mt-1">-- Index CAN be used (prefix match):</p>
                    <p className="text-quest-success">WHERE name LIKE 'alice%'</p>
                  </div>
                  <p className="text-xs text-quest-muted">
                    A leading wildcard means the database cannot narrow down using the sorted index -- it must scan everything.
                  </p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Database className="text-quest-primary" />
                Optimization Tips
              </h3>
              <div className="space-y-3">
                {[
                  'Monitor slow queries with pg_stat_statements or slow query log',
                  'Use EXPLAIN ANALYZE to see actual execution times, not just estimates',
                  'Check index usage stats -- unused indexes waste write performance',
                  'Index columns used in WHERE, JOIN, and ORDER BY clauses',
                  'Put high-cardinality columns first in composite indexes',
                  'Consider covering indexes for your most critical queries',
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-quest-success shrink-0 mt-0.5" />
                    <p className="text-sm text-quest-muted">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros/Cons */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">Pros of Indexing</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>+ Dramatically faster reads (orders of magnitude)</li>
                  <li>+ Enforce uniqueness constraints</li>
                  <li>+ Speed up JOINs and ORDER BY</li>
                  <li>+ Covering indexes avoid table access entirely</li>
                  <li>+ Essential for any production database</li>
                </ul>
              </div>
              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">Cons of Indexing</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>- Slower writes (every index must be updated)</li>
                  <li>- Additional storage space required</li>
                  <li>- Index fragmentation over time</li>
                  <li>- Too many indexes hurt overall performance</li>
                  <li>- Wrong indexes give false sense of security</li>
                </ul>
              </div>
            </div>

            <DeepDive id="real-query-optimization" title="Real Query Optimization" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>PostgreSQL Query Planner:</strong> PostgreSQL maintains statistics about
                table data (pg_stats) including value distribution, null fraction, and correlation.
                The planner uses these stats to estimate how many rows each step will produce and
                picks the cheapest plan.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Cost estimation:</strong> Each operation has a cost (sequential read,
                random read, CPU processing). The planner sums these up. Sometimes a sequential
                scan is actually cheaper than an index scan -- e.g., when selecting 80% of rows.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Index hints:</strong> Unlike MySQL or Oracle, PostgreSQL does not support
                index hints. Instead, it trusts its cost model. If the planner ignores your index,
                the fix is usually to update statistics (ANALYZE), adjust cost parameters, or
                restructure the query.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Pro tip:</strong> Run <code className="text-quest-primary">EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)</code> to
                see actual timing, row counts, and buffer usage. Compare "estimated rows" vs "actual rows" --
                large differences indicate stale statistics.
              </p>
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

      {/* SECTION: QUIZ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Database indexing is one of the most impactful performance optimizations you can make.
              Let's see if you've mastered the fundamentals!
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
                <h3 className="text-xl font-bold mb-2">Level 10 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand database indexing and query optimization.
                  No more full table scans bringing your database to its knees!
                </p>
                <p className="text-sm text-quest-primary">
                  Remember: always check EXPLAIN before and after adding indexes.
                  The right index on the right column can make your queries thousands of times faster.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

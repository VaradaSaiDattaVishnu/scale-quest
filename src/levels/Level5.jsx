import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Database, Table, FileJson, CheckCircle,
  HelpCircle, ChevronDown, ChevronUp, Scale, Zap,
  Link, Layers, Grid3X3
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

export default function Level5({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [selectedDb, setSelectedDb] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['intro', 'sql', 'nosql', 'decide', 'side quest', 'quiz']

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does ACID stand for in database transactions?',
      options: [
        { id: 'a', text: 'Automated, Consistent, Isolated, Durable', correct: false },
        { id: 'b', text: 'Atomicity, Consistency, Isolation, Durability', correct: true },
        { id: 'c', text: 'Available, Consistent, Independent, Distributed', correct: false },
        { id: 'd', text: 'Atomic, Cached, Indexed, Distributed', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'When would you choose a document database like MongoDB?',
      options: [
        { id: 'a', text: 'When you need complex joins between tables', correct: false },
        { id: 'b', text: 'When your data has a flexible, nested structure', correct: true },
        { id: 'c', text: 'When you need strict transactions across tables', correct: false },
        { id: 'd', text: 'Always, it\'s better than SQL', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What is a primary advantage of SQL databases?',
      options: [
        { id: 'a', text: 'They\'re always faster than NoSQL', correct: false },
        { id: 'b', text: 'They\'re free to use', correct: false },
        { id: 'c', text: 'Strong consistency and relationships between data', correct: true },
        { id: 'd', text: 'They scale horizontally easily', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What does BASE stand for in NoSQL context?',
      options: [
        { id: 'a', text: 'Basic Available Storage Engine', correct: false },
        { id: 'b', text: 'Basically Available, Soft state, Eventual consistency', correct: true },
        { id: 'c', text: 'Backend As Service Engine', correct: false },
        { id: 'd', text: 'Binary Automatic Storage Extension', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

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
            <h2 className="text-2xl font-bold mb-4">🗄️ Data Decisions</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Your cache is working great. But at some point, everything needs to come from
                somewhere—the database. As your data grows, you face a fundamental question:
                what kind of database do you need?"
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              Databases are the backbone of every application. The choice between{' '}
              <Term
                word="SQL"
                definition="Structured Query Language databases. Relational, table-based, with strict schemas. Examples: PostgreSQL, MySQL, SQLite."
                onLearn={learnTerm}
              />{' '}
              and{' '}
              <Term
                word="NoSQL"
                definition="'Not Only SQL' databases. Various types (document, key-value, graph) with flexible schemas. Examples: MongoDB, Redis, Cassandra."
                onLearn={learnTerm}
              />{' '}
              isn't about which is "better"—it's about which fits your data and access patterns.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <motion.div
                className={`bg-quest-surface rounded-xl p-6 border-2 cursor-pointer transition-all
                  ${selectedDb === 'sql' ? 'border-quest-primary' : 'border-transparent hover:border-quest-primary/50'}`}
                onClick={() => { setSelectedDb('sql'); setCurrentSection(1) }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-quest-primary/20 rounded-lg">
                    <Table size={32} className="text-quest-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">SQL Databases</h3>
                    <p className="text-sm text-quest-muted">Relational</p>
                  </div>
                </div>
                <p className="text-quest-muted text-sm mb-4">
                  Tables, rows, columns. Strict schemas. Complex queries with JOINs.
                  Strong consistency guarantees.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-quest-bg px-2 py-1 rounded">PostgreSQL</span>
                  <span className="text-xs bg-quest-bg px-2 py-1 rounded">MySQL</span>
                  <span className="text-xs bg-quest-bg px-2 py-1 rounded">SQLite</span>
                </div>
              </motion.div>

              <motion.div
                className={`bg-quest-surface rounded-xl p-6 border-2 cursor-pointer transition-all
                  ${selectedDb === 'nosql' ? 'border-quest-secondary' : 'border-transparent hover:border-quest-secondary/50'}`}
                onClick={() => { setSelectedDb('nosql'); setCurrentSection(2) }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-quest-secondary/20 rounded-lg">
                    <FileJson size={32} className="text-quest-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">NoSQL Databases</h3>
                    <p className="text-sm text-quest-muted">Non-Relational</p>
                  </div>
                </div>
                <p className="text-quest-muted text-sm mb-4">
                  Flexible schemas. Various types: document, key-value, graph, column.
                  Built for scale and specific access patterns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-quest-bg px-2 py-1 rounded">MongoDB</span>
                  <span className="text-xs bg-quest-bg px-2 py-1 rounded">Redis</span>
                  <span className="text-xs bg-quest-bg px-2 py-1 rounded">Cassandra</span>
                </div>
              </motion.div>
            </div>

            <DeepDive id="db-history" title="A Brief History of Databases" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>1970s:</strong> Edgar Codd invents the relational model. SQL is born.
                Databases like Oracle and IBM DB2 dominate enterprise.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>2000s:</strong> Internet scale breaks SQL's assumptions. Google publishes
                Bigtable, Amazon publishes Dynamo. The NoSQL movement begins.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Today:</strong> Both coexist. Many companies use "polyglot persistence"—
                different databases for different needs within the same application.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore SQL
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SQL */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Table className="text-quest-primary" />
              SQL: The Relational World
            </h2>

            <p className="text-quest-muted mb-6">
              SQL databases organize data into <strong>tables</strong> with predefined <strong>schemas</strong>.
              Every row has the same columns. Relationships between tables are defined explicitly.
            </p>

            {/* Visual example */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Example: E-Commerce Data</h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-quest-muted mb-2">users table</p>
                  <div className="bg-quest-surface rounded overflow-hidden text-xs">
                    <div className="grid grid-cols-3 gap-px bg-white/10">
                      <div className="bg-quest-primary/20 p-2 font-medium">id</div>
                      <div className="bg-quest-primary/20 p-2 font-medium">name</div>
                      <div className="bg-quest-primary/20 p-2 font-medium">email</div>
                      <div className="bg-quest-surface p-2">1</div>
                      <div className="bg-quest-surface p-2">Alice</div>
                      <div className="bg-quest-surface p-2">alice@...</div>
                      <div className="bg-quest-surface p-2">2</div>
                      <div className="bg-quest-surface p-2">Bob</div>
                      <div className="bg-quest-surface p-2">bob@...</div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-quest-muted mb-2">orders table</p>
                  <div className="bg-quest-surface rounded overflow-hidden text-xs">
                    <div className="grid grid-cols-3 gap-px bg-white/10">
                      <div className="bg-quest-secondary/20 p-2 font-medium">id</div>
                      <div className="bg-quest-secondary/20 p-2 font-medium">user_id</div>
                      <div className="bg-quest-secondary/20 p-2 font-medium">total</div>
                      <div className="bg-quest-surface p-2">101</div>
                      <div className="bg-quest-surface p-2 text-quest-primary">1 ←</div>
                      <div className="bg-quest-surface p-2">$99</div>
                      <div className="bg-quest-surface p-2">102</div>
                      <div className="bg-quest-surface p-2 text-quest-primary">1 ←</div>
                      <div className="bg-quest-surface p-2">$45</div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-quest-muted mt-4 text-center">
                The <span className="text-quest-primary">user_id</span> in orders references the{' '}
                <span className="text-quest-primary">id</span> in users. This is a <strong>foreign key</strong>.
              </p>
            </div>

            {/* ACID */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Scale className="text-quest-warning" />
                <Term
                  word="ACID"
                  definition="Properties that guarantee database transactions are processed reliably: Atomicity, Consistency, Isolation, Durability."
                  onLearn={learnTerm}
                />
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    letter: 'A',
                    name: 'Atomicity',
                    desc: 'All or nothing. If any part of a transaction fails, the whole thing is rolled back.'
                  },
                  {
                    letter: 'C',
                    name: 'Consistency',
                    desc: 'Data follows all rules (constraints, triggers). No invalid states.'
                  },
                  {
                    letter: 'I',
                    name: 'Isolation',
                    desc: 'Concurrent transactions don\'t interfere with each other.'
                  },
                  {
                    letter: 'D',
                    name: 'Durability',
                    desc: 'Once committed, data survives crashes. Written to disk.'
                  }
                ].map(item => (
                  <div key={item.letter} className="bg-quest-bg rounded p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-8 h-8 rounded-full bg-quest-warning/20 flex items-center justify-center font-bold text-quest-warning">
                        {item.letter}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <p className="text-xs text-quest-muted">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros/Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">✅ SQL Strengths</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>• Strong data consistency (ACID)</li>
                  <li>• Complex queries with JOINs</li>
                  <li>• Well-understood, 50+ years mature</li>
                  <li>• Great for structured, relational data</li>
                  <li>• Data integrity via constraints</li>
                </ul>
              </div>
              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">❌ SQL Challenges</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>• Rigid schema—changes require migrations</li>
                  <li>• Vertical scaling mostly (horizontal is hard)</li>
                  <li>• Can be slower for simple key-value lookups</li>
                  <li>• Joins become expensive at scale</li>
                </ul>
              </div>
            </div>

            <DeepDive id="sql-scaling" title="Why SQL Doesn't Scale Horizontally (Easily)" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                JOINs are the problem. When data lives on multiple machines, joining tables requires
                network calls between them—slow and complex.
              </p>
              <p className="text-sm text-quest-muted">
                Solutions exist (sharding, read replicas), but they add complexity. This is why
                companies at extreme scale (Google, Facebook) either heavily modify SQL databases
                or use purpose-built distributed systems.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Explore NoSQL
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: NOSQL */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileJson className="text-quest-secondary" />
              NoSQL: Beyond Tables
            </h2>

            <p className="text-quest-muted mb-6">
              NoSQL databases abandon the rigid table structure for flexibility and scale.
              There are several types, each optimized for different access patterns.
            </p>

            {/* Types of NoSQL */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Document */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <FileJson size={20} className="text-quest-secondary" />
                  <h4 className="font-semibold">Document Store</h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  Stores JSON-like documents. Flexible schema, nested data.
                </p>
                <div className="bg-quest-bg rounded p-2 font-mono text-xs mb-2">
                  {`{
  "_id": "123",
  "name": "Alice",
  "orders": [
    {"product": "Widget", "qty": 2}
  ]
}`}
                </div>
                <p className="text-xs text-quest-primary">MongoDB, CouchDB</p>
              </div>

              {/* Key-Value */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={20} className="text-quest-warning" />
                  <h4 className="font-semibold">Key-Value Store</h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  Simple: key → value. Extremely fast for lookups.
                </p>
                <div className="bg-quest-bg rounded p-2 font-mono text-xs mb-2">
                  {`session:abc123 → {"userId": 1, ...}
cart:user1 → {"items": [...]}
config:theme → "dark"`}
                </div>
                <p className="text-xs text-quest-warning">Redis, DynamoDB</p>
              </div>

              {/* Column */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Grid3X3 size={20} className="text-quest-success" />
                  <h4 className="font-semibold">Wide-Column Store</h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  Like tables but rows can have different columns. Great for time-series.
                </p>
                <div className="bg-quest-bg rounded p-2 font-mono text-xs mb-2">
                  {`user:1 → {name, email, phone}
user:2 → {name, email, address, dob}`}
                </div>
                <p className="text-xs text-quest-success">Cassandra, HBase</p>
              </div>

              {/* Graph */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <Link size={20} className="text-quest-primary" />
                  <h4 className="font-semibold">Graph Database</h4>
                </div>
                <p className="text-sm text-quest-muted mb-3">
                  Nodes and edges. Perfect for relationships and networks.
                </p>
                <div className="bg-quest-bg rounded p-2 font-mono text-xs mb-2">
                  {`(Alice)-[:FRIENDS]->(Bob)
(Bob)-[:LIKES]->(Product1)`}
                </div>
                <p className="text-xs text-quest-primary">Neo4j, Amazon Neptune</p>
              </div>
            </div>

            {/* BASE */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Layers className="text-quest-secondary" />
                <Term
                  word="BASE"
                  definition="NoSQL philosophy: Basically Available, Soft state, Eventual consistency. Contrast to ACID—prioritizes availability over immediate consistency."
                  onLearn={learnTerm}
                />
                {' '}(vs ACID)
              </h3>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-quest-bg rounded p-4">
                  <p className="font-medium text-quest-secondary">Basically Available</p>
                  <p className="text-xs text-quest-muted mt-1">
                    System is available even during failures (may return stale data)
                  </p>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <p className="font-medium text-quest-secondary">Soft State</p>
                  <p className="text-xs text-quest-muted mt-1">
                    State may change over time, even without input
                  </p>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <p className="font-medium text-quest-secondary">Eventually Consistent</p>
                  <p className="text-xs text-quest-muted mt-1">
                    Data will be consistent... eventually (not immediately)
                  </p>
                </div>
              </div>
            </div>

            {/* Pros/Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">✅ NoSQL Strengths</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>• Flexible schema—evolve without migrations</li>
                  <li>• Horizontal scaling built-in</li>
                  <li>• Optimized for specific access patterns</li>
                  <li>• Great for unstructured/semi-structured data</li>
                  <li>• Often better write performance</li>
                </ul>
              </div>
              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">❌ NoSQL Challenges</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>• No JOINs—data denormalization needed</li>
                  <li>• Eventual consistency can cause issues</li>
                  <li>• Less mature tooling (though catching up)</li>
                  <li>• Can lead to data duplication</li>
                </ul>
              </div>
            </div>

            <DeepDive id="eventual-consistency" title="Understanding Eventual Consistency" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                In a distributed NoSQL database, when you write data, it might not be immediately
                visible to all readers. If you update a user's profile on Server A, Server B might
                still serve the old version for a few milliseconds (or seconds).
              </p>
              <p className="text-sm text-quest-muted">
                This is a deliberate tradeoff for availability and performance. For many use cases
                (social media feeds, product catalogs), this is acceptable. For banking transactions?
                Not so much.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to SQL
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                When to Use What
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: DECISION */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🤔 SQL vs NoSQL: When to Use What</h2>

            <p className="text-quest-muted mb-6">
              The answer isn't "one is better." It's "which fits your use case?"
              Here's a decision framework.
            </p>

            {/* Decision matrix */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Use Case</th>
                    <th className="text-center py-3 px-4 text-quest-primary">SQL ✓</th>
                    <th className="text-center py-3 px-4 text-quest-secondary">NoSQL ✓</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { useCase: 'Complex relationships (users → orders → products)', sql: '✓', nosql: '' },
                    { useCase: 'Financial transactions', sql: '✓', nosql: '' },
                    { useCase: 'Flexible, evolving schema', sql: '', nosql: '✓' },
                    { useCase: 'Massive horizontal scale', sql: '', nosql: '✓' },
                    { useCase: 'Real-time analytics on structured data', sql: '✓', nosql: '' },
                    { useCase: 'Session/cache storage', sql: '', nosql: '✓' },
                    { useCase: 'Content management (CMS)', sql: '', nosql: '✓' },
                    { useCase: 'Social network connections', sql: '', nosql: '✓ (graph)' },
                    { useCase: 'Inventory management', sql: '✓', nosql: '' },
                    { useCase: 'IoT time-series data', sql: '', nosql: '✓ (column)' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 px-4">{row.useCase}</td>
                      <td className="text-center py-3 px-4 text-quest-primary">{row.sql}</td>
                      <td className="text-center py-3 px-4 text-quest-secondary">{row.nosql}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick decision */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Quick Decision Guide</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-quest-primary font-bold">→</span>
                  <div>
                    <p className="font-medium">Use SQL when...</p>
                    <p className="text-sm text-quest-muted">
                      You need ACID transactions, complex queries, data integrity, and your data
                      has clear relationships. Most traditional business applications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-quest-secondary font-bold">→</span>
                  <div>
                    <p className="font-medium">Use NoSQL when...</p>
                    <p className="text-sm text-quest-muted">
                      You need massive scale, flexible schemas, high write throughput, or your
                      data doesn't fit well in tables. Modern web-scale applications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-quest-warning font-bold">→</span>
                  <div>
                    <p className="font-medium">Use both when...</p>
                    <p className="text-sm text-quest-muted">
                      You have different data types. SQL for core business data, Redis for caching,
                      MongoDB for user-generated content. This is called "polyglot persistence."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="real-world-combo" title="Real-World Examples: Polyglot Persistence" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Netflix:</strong> Uses Cassandra for user activity, MySQL for billing,
                ElasticSearch for search.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Uber:</strong> PostgreSQL for trips, Redis for geolocation caching,
                Cassandra for driver locations.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Airbnb:</strong> MySQL for core data, Redis for sessions,
                ElasticSearch for search.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Side Quest: Real Stories
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SIDE QUEST - Who Uses What and Why */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-medium">
                Optional Side Quest
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Who Uses What and Why</h2>
            <p className="text-quest-muted mb-6">
              Theory is great. But how did real companies — facing real deadlines and real users —
              actually choose their databases? These stories are more interesting than any textbook.
            </p>

            {/* ===== INSTAGRAM ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📸</span>
                <div>
                  <h3 className="text-lg font-semibold">Instagram: "Just Use Postgres"</h3>
                  <p className="text-xs text-quest-muted">2 billion users — still on PostgreSQL</p>
                </div>
              </div>

              <p className="text-sm text-quest-muted mb-4">
                Instagram launched in 2010 with <strong>PostgreSQL</strong>. Twelve employees. One database.
                By 2012, they had 100 million users. By 2024, over 2 billion. They still use PostgreSQL
                as their primary database.
              </p>

              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <h4 className="text-xs font-semibold text-quest-primary mb-2">WHY POSTGRES WORKED AT SCALE</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">Sharding (splitting data)</p>
                    <p className="text-xs text-quest-muted">
                      They split users across multiple Postgres databases by user ID. User #1-1M on shard 1,
                      user #1M-2M on shard 2. Each shard is a full Postgres instance.
                    </p>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">Read replicas</p>
                    <p className="text-xs text-quest-muted">
                      Most traffic is reads (browsing feed). They run dozens of read-only copies
                      of each shard. Writes go to the primary, reads go to replicas.
                    </p>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">Pgbouncer (connection pooling)</p>
                    <p className="text-xs text-quest-muted">
                      Postgres struggles with thousands of connections. Pgbouncer sits in front and
                      reuses connections, handling 10x more clients per server.
                    </p>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">Cassandra for specific needs</p>
                    <p className="text-xs text-quest-muted">
                      They <em>do</em> use Cassandra — but only for the feed inbox (write-heavy).
                      Core data (users, photos, comments) stays in Postgres.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs">
                  <strong className="text-quest-primary">Lesson:</strong>{' '}
                  <span className="text-quest-muted">
                    Don't assume you need NoSQL because you're "big." PostgreSQL can scale
                    further than most people think. Instagram proves it. The boring choice is often the right one.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== DISCORD ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💬</span>
                <div>
                  <h3 className="text-lg font-semibold">Discord: Three Databases in Six Years</h3>
                  <p className="text-xs text-quest-muted">MongoDB → Cassandra → ScyllaDB</p>
                </div>
              </div>

              <p className="text-sm text-quest-muted mb-4">
                Discord's message storage journey is the best real-world example of how database needs
                change as you scale. Each migration was driven by a specific pain point.
              </p>

              <div className="relative pl-8 border-l-2 border-quest-secondary/30 space-y-4 mb-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
                  <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-secondary flex items-center justify-center text-xs">1</div>
                  <div className="bg-quest-surface/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-quest-secondary">2015</span>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">MongoDB</span>
                    </div>
                    <h4 className="font-semibold text-sm">Started with MongoDB</h4>
                    <p className="text-xs text-quest-muted mt-1">
                      Made sense early on: messages are JSON-like documents, schema was changing fast,
                      and MongoDB was easy to get started with. Worked perfectly for a small startup.
                    </p>
                    <div className="bg-quest-bg rounded p-2 mt-2 font-mono text-xs text-quest-muted">
                      {`{ channelId: "123", author: "user1",
  content: "Hello!", timestamp: ... }`}
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative">
                  <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-warning flex items-center justify-center text-xs">2</div>
                  <div className="bg-quest-surface/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-quest-warning">2017</span>
                      <span className="text-xs bg-quest-danger/20 text-quest-danger px-2 py-0.5 rounded">Pain Point</span>
                    </div>
                    <h4 className="font-semibold text-sm">MongoDB couldn't keep up</h4>
                    <p className="text-xs text-quest-muted mt-1">
                      With 100M+ messages, MongoDB's single-primary architecture became a bottleneck.
                      Random disk reads for chat history caused latency spikes. The data didn't fit in RAM anymore.
                    </p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative">
                  <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-secondary flex items-center justify-center text-xs">3</div>
                  <div className="bg-quest-surface/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-quest-secondary">2017</span>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Cassandra</span>
                    </div>
                    <h4 className="font-semibold text-sm">Migrated to Cassandra</h4>
                    <p className="text-xs text-quest-muted mt-1">
                      Cassandra was built for this exact pattern: write-heavy, time-series data, horizontal scaling.
                      Messages sorted by time within each channel. Writes distributed across nodes. Worked well for 5 years.
                    </p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative">
                  <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-warning flex items-center justify-center text-xs">4</div>
                  <div className="bg-quest-surface/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-quest-warning">2022</span>
                      <span className="text-xs bg-quest-danger/20 text-quest-danger px-2 py-0.5 rounded">Pain Point</span>
                    </div>
                    <h4 className="font-semibold text-sm">Cassandra's garbage collection pauses</h4>
                    <p className="text-xs text-quest-muted mt-1">
                      Cassandra runs on the JVM (Java). At Discord's scale (trillions of messages), Java's garbage
                      collector caused unpredictable latency spikes — sometimes pausing for seconds.
                      This caused timeouts and degraded the chat experience.
                    </p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="relative">
                  <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-success flex items-center justify-center text-xs">5</div>
                  <div className="bg-quest-surface/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-quest-success">2023</span>
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">ScyllaDB</span>
                    </div>
                    <h4 className="font-semibold text-sm">Migrated to ScyllaDB</h4>
                    <p className="text-xs text-quest-muted mt-1">
                      ScyllaDB is a Cassandra-compatible database rewritten in C++ (no garbage collector).
                      Same data model, same queries, but <strong>p99 latency dropped from 40-125ms to 15ms</strong>.
                      They migrated trillions of messages with zero downtime.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs">
                  <strong className="text-quest-primary">Lesson:</strong>{' '}
                  <span className="text-quest-muted">
                    Your database choice isn't permanent. Start with what's fast to build with, then migrate
                    when you hit real pain. Discord didn't "waste time" with MongoDB — it got them to market.
                    Each migration was the right call at the right time.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== SAME DATA, DIFFERENT MODELS ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Same App, Different Models</h3>
              <p className="text-sm text-quest-muted mb-4">
                Here's how the same social media data looks in different database types.
                Notice how each makes different tradeoffs.
              </p>

              <div className="space-y-4">
                {/* PostgreSQL */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded font-medium">PostgreSQL (SQL)</span>
                    <span className="text-xs text-quest-muted">— Normalized, relational</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-2 text-xs font-mono">
                    <div>
                      <p className="text-quest-muted mb-1 font-sans">users</p>
                      <div className="bg-quest-bg rounded p-2 space-y-0.5">
                        <p><span className="text-quest-primary">id</span> | name | email</p>
                        <p>1 | Alice | alice@..</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-quest-muted mb-1 font-sans">posts</p>
                      <div className="bg-quest-bg rounded p-2 space-y-0.5">
                        <p><span className="text-quest-primary">id</span> | <span className="text-quest-secondary">user_id</span> | text</p>
                        <p>10 | <span className="text-quest-secondary">1</span> | "Hello!"</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-quest-muted mb-1 font-sans">likes</p>
                      <div className="bg-quest-bg rounded p-2 space-y-0.5">
                        <p><span className="text-quest-secondary">user_id</span> | <span className="text-quest-secondary">post_id</span></p>
                        <p><span className="text-quest-secondary">2</span> | <span className="text-quest-secondary">10</span></p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    3 tables, no data duplication. Need 2 JOINs to get "Alice's posts with like counts."
                    Very consistent, but JOINs get slow at scale.
                  </p>
                </div>

                {/* MongoDB */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-quest-secondary/20 text-quest-secondary px-2 py-0.5 rounded font-medium">MongoDB (Document)</span>
                    <span className="text-xs text-quest-muted">— Denormalized, embedded</span>
                  </div>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs">
                    <pre className="whitespace-pre-wrap text-quest-muted">{`{
  "_id": "user_1",
  "name": "Alice",
  "email": "alice@...",
  "posts": [{
    "id": "post_10",
    "text": "Hello!",
    "likes": ["user_2", "user_3"],
    "likeCount": 2
  }]
}`}</pre>
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    One document has everything. One read gets all data — no JOINs! But "likes" list is
                    duplicated inside each post. Updating requires finding the right nested document.
                  </p>
                </div>

                {/* Redis */}
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-quest-warning/20 text-quest-warning px-2 py-0.5 rounded font-medium">Redis (Key-Value)</span>
                    <span className="text-xs text-quest-muted">— Structured keys, blazing fast</span>
                  </div>
                  <div className="bg-quest-bg rounded p-2 font-mono text-xs space-y-1">
                    <p><span className="text-quest-warning">user:1</span> → {`{name: "Alice", email: "..."}`}</p>
                    <p><span className="text-quest-warning">user:1:posts</span> → [10, 11, 12]  <span className="text-quest-muted"># sorted set</span></p>
                    <p><span className="text-quest-warning">post:10</span> → {`{text: "Hello!", author: 1}`}</p>
                    <p><span className="text-quest-warning">post:10:likes</span> → {`{2, 3}`}  <span className="text-quest-muted"># set of user IDs</span></p>
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    Every query is a simple key lookup — microsecond fast. But data is split across many keys,
                    and there's no query language. You design your keys around your access patterns.
                  </p>
                </div>
              </div>
            </div>

            {/* ===== UBER'S STORY ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🚗</span>
                <div>
                  <h3 className="text-lg font-semibold">Uber: Why They Left PostgreSQL</h3>
                  <p className="text-xs text-quest-muted">The most controversial database migration in tech</p>
                </div>
              </div>

              <p className="text-sm text-quest-muted mb-4">
                In 2016, Uber published a blog post titled "Why Uber Engineering Switched from Postgres to MySQL."
                It caused a firestorm. Here's the actual story:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/20">
                  <h4 className="text-xs font-semibold text-quest-danger mb-2">THE POSTGRES PROBLEM</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>• Postgres replication sent the entire row for every small update</li>
                    <li>• With tables that had 30+ columns, updating one field replicated all 30</li>
                    <li>• At Uber's write volume (millions of trips/day), this saturated the network</li>
                    <li>• Postgres indexes pointed to disk locations, causing cascading updates</li>
                  </ul>
                </div>
                <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/20">
                  <h4 className="text-xs font-semibold text-quest-success mb-2">THE MYSQL SOLUTION</h4>
                  <ul className="text-xs text-quest-muted space-y-1">
                    <li>• MySQL's InnoDB uses append-only writes (no rewrite of whole row)</li>
                    <li>• Replication only sends the changed fields</li>
                    <li>• Uber built "Schemaless" — a document store on top of MySQL</li>
                    <li>• Got NoSQL flexibility with MySQL's battle-tested replication</li>
                  </ul>
                </div>
              </div>

              <div className="bg-quest-warning/10 rounded-lg p-3 border border-quest-warning/20 mb-4">
                <p className="text-xs">
                  <strong className="text-quest-warning">Important context:</strong>{' '}
                  <span className="text-quest-muted">
                    The Postgres community (rightfully) pointed out that many of Uber's issues were
                    fixable with better configuration. This wasn't "Postgres is bad" — it was "Postgres
                    didn't fit Uber's specific extreme write pattern." Instagram handles more users on Postgres.
                    The lesson isn't which DB is better — it's that your access pattern determines the right choice.
                  </span>
                </p>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs">
                  <strong className="text-quest-primary">Lesson:</strong>{' '}
                  <span className="text-quest-muted">
                    Instagram (read-heavy, millions of photos) thrives on Postgres. Uber (write-heavy, millions
                    of trips updating in real-time) struggled with it. <strong>Same database, different access patterns,
                    different outcomes.</strong> The database doesn't matter as much as how your data flows.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== THE JOINs PROBLEM ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🔗</span>
                <div>
                  <h3 className="text-lg font-semibold">The JOINs Problem: Why SQL Breaks at Extreme Scale</h3>
                  <p className="text-xs text-quest-muted">The fundamental reason companies like Google and Facebook had to build their own databases</p>
                </div>
              </div>

              <p className="text-sm text-quest-muted mb-4">
                SQL databases are built around <strong>JOINs</strong> — the ability to combine data from
                multiple tables in a single query. On a single machine, JOINs are fast. But the moment
                you split your database across multiple machines, JOINs become your biggest enemy.
              </p>

              {/* Visual: JOINs on single machine vs distributed */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-quest-success/5 rounded-lg p-4 border border-quest-success/20">
                  <h4 className="text-xs font-semibold text-quest-success mb-3">JOINs ON ONE MACHINE</h4>
                  <div className="bg-quest-bg rounded p-3 mb-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="bg-quest-primary/20 rounded px-3 py-2 text-xs font-mono">
                        <p className="text-quest-primary font-bold mb-1">users</p>
                        <p className="text-quest-muted">id=1, Alice</p>
                      </div>
                      <span className="text-quest-success text-lg">⚡</span>
                      <div className="bg-quest-secondary/20 rounded px-3 py-2 text-xs font-mono">
                        <p className="text-quest-secondary font-bold mb-1">orders</p>
                        <p className="text-quest-muted">user_id=1, $50</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-quest-success">Same disk, same RAM</span>
                      <p className="text-xs font-mono mt-1 text-quest-muted">~1ms lookup</p>
                    </div>
                  </div>
                  <p className="text-xs text-quest-muted">
                    Both tables are on the same machine. The database engine reads both from local disk/memory
                    and matches rows instantly. This is what SQL was designed for.
                  </p>
                </div>

                <div className="bg-quest-danger/5 rounded-lg p-4 border border-quest-danger/20">
                  <h4 className="text-xs font-semibold text-quest-danger mb-3">JOINs ACROSS MACHINES (SHARDED)</h4>
                  <div className="bg-quest-bg rounded p-3 mb-3">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="bg-quest-primary/20 rounded px-3 py-2 text-xs font-mono">
                        <p className="text-quest-primary font-bold mb-1">Server A</p>
                        <p className="text-quest-muted">users: Alice</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-quest-danger text-sm">←→</span>
                        <span className="text-xs text-quest-danger">Network</span>
                      </div>
                      <div className="bg-quest-secondary/20 rounded px-3 py-2 text-xs font-mono">
                        <p className="text-quest-secondary font-bold mb-1">Server B</p>
                        <p className="text-quest-muted">orders: $50</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-quest-danger">Network hop required</span>
                      <p className="text-xs font-mono mt-1 text-quest-muted">~50-200ms per call</p>
                    </div>
                  </div>
                  <p className="text-xs text-quest-muted">
                    Alice's user record is on Server A, but her orders are on Server B. The database
                    must make a <strong>network call</strong> to Server B, wait for the response, then combine the data.
                    50-200x slower than a local read.
                  </p>
                </div>
              </div>

              {/* Why it gets worse */}
              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <h4 className="text-xs font-semibold text-quest-warning mb-3">WHY IT GETS EXPONENTIALLY WORSE</h4>
                <p className="text-xs text-quest-muted mb-3">
                  One JOIN across machines is slow. But real queries often involve multiple JOINs:
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs mb-3">
                  <p className="text-quest-muted">-- "Show Alice's orders with product names and reviews"</p>
                  <p><span className="text-quest-primary">SELECT</span> u.name, o.total, p.title, r.stars</p>
                  <p><span className="text-quest-primary">FROM</span> users u</p>
                  <p><span className="text-quest-secondary">JOIN</span> orders o <span className="text-quest-primary">ON</span> u.id = o.user_id     <span className="text-quest-danger">-- Server A → B</span></p>
                  <p><span className="text-quest-secondary">JOIN</span> products p <span className="text-quest-primary">ON</span> o.product_id = p.id  <span className="text-quest-danger">-- Server B → C</span></p>
                  <p><span className="text-quest-secondary">JOIN</span> reviews r <span className="text-quest-primary">ON</span> p.id = r.product_id  <span className="text-quest-danger">-- Server C → D</span></p>
                </div>
                <div className="grid grid-cols-4 gap-1 mb-3">
                  {['Server A (users)', 'Server B (orders)', 'Server C (products)', 'Server D (reviews)'].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="bg-quest-danger/10 rounded p-2 text-xs border border-quest-danger/20">
                        <p className="font-mono text-quest-danger text-[10px]">{s}</p>
                      </div>
                      {i < 3 && (
                        <p className="text-quest-danger text-xs mt-1">→ network →</p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-quest-muted">
                  3 JOINs = 3 network round trips. At Facebook scale (billions of rows per table), each
                  round trip might scan millions of rows on a remote machine. A query that takes 2ms on one
                  machine could take <strong>2+ seconds</strong> across a distributed system.
                </p>
              </div>

              {/* Solutions companies use */}
              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <h4 className="text-xs font-semibold text-quest-primary mb-3">HOW COMPANIES ACTUALLY SOLVE THIS</h4>
                <div className="space-y-3">
                  <div className="bg-quest-bg rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-medium">Google Spanner</span>
                      <span className="text-xs text-quest-muted">— The "impossible" database</span>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">
                      Google built <strong>Spanner</strong> — the world's first globally distributed SQL database that supports
                      JOINs across data centers. It uses synchronized atomic clocks (TrueTime) in every Google data center
                      to keep transactions consistent across continents.
                    </p>
                    <div className="bg-quest-surface/50 rounded p-2">
                      <p className="text-xs text-quest-muted">
                        <strong>How:</strong> Data is automatically sharded, but Spanner tracks which shards have related
                        data and co-locates them. If users and their orders are queried together, Spanner puts them
                        on the same machine. JOINs stay local most of the time.
                      </p>
                    </div>
                    <p className="text-xs text-quest-muted mt-2 italic">
                      Available as Google Cloud Spanner (~$0.90/node-hour). Used for Google Ads, Google Play, and Gmail.
                    </p>
                  </div>

                  <div className="bg-quest-bg rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-medium">Facebook TAO</span>
                      <span className="text-xs text-quest-muted">— Avoiding JOINs entirely</span>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">
                      Facebook took the opposite approach: instead of making distributed JOINs work, they
                      <strong> eliminated the need for JOINs</strong>. TAO (The Associations and Objects) is a graph-based
                      caching layer on top of MySQL.
                    </p>
                    <div className="bg-quest-surface/50 rounded p-2 mb-2">
                      <p className="text-xs font-mono text-quest-muted">
                        <span className="text-quest-muted">-- Instead of:</span><br/>
                        <span className="text-quest-primary">SELECT</span> * <span className="text-quest-primary">FROM</span> friends <span className="text-quest-secondary">JOIN</span> users ...
                      </p>
                      <p className="text-xs font-mono text-quest-muted mt-1">
                        <span className="text-quest-muted">-- TAO does:</span><br/>
                        <span className="text-quest-success">assoc_get</span>(user_id=1, type=FRIEND) → [2, 5, 8]<br/>
                        <span className="text-quest-success">obj_get</span>([2, 5, 8]) → [{'{'}name: "Bob"{'}'}, ...]
                      </p>
                    </div>
                    <p className="text-xs text-quest-muted">
                      Two simple key lookups replace a complex JOIN. TAO handles <strong>billions of reads per second</strong>.
                      Underneath, MySQL still stores the data — but the application never does JOINs directly.
                    </p>
                  </div>

                  <div className="bg-quest-bg rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-medium">CockroachDB / TiDB</span>
                      <span className="text-xs text-quest-muted">— Open-source distributed SQL</span>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">
                      For companies that aren't Google, <strong>CockroachDB</strong> and <strong>TiDB</strong> offer
                      Spanner-like distributed SQL without needing atomic clocks. They use consensus algorithms
                      (Raft) to keep data consistent across nodes while supporting standard SQL JOINs.
                    </p>
                    <p className="text-xs text-quest-muted">
                      <strong>Tradeoff:</strong> Cross-node JOINs are still slower than local ones (~10-50ms vs ~1ms),
                      but they work correctly. Good enough for most companies that aren't at Google/Facebook scale.
                    </p>
                  </div>

                  <div className="bg-quest-bg rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-0.5 rounded font-medium">Denormalization</span>
                      <span className="text-xs text-quest-muted">— The pragmatic solution</span>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">
                      Most companies don't build custom databases. Instead, they <strong>denormalize</strong> — store
                      redundant copies of data to avoid JOINs altogether.
                    </p>
                    <div className="grid md:grid-cols-2 gap-2">
                      <div className="bg-quest-surface/50 rounded p-2">
                        <p className="text-xs font-semibold mb-1 text-quest-danger">Before (normalized)</p>
                        <p className="text-xs font-mono text-quest-muted">orders: user_id=1, product_id=5</p>
                        <p className="text-xs text-quest-muted mt-1">Need JOINs to get user name + product name</p>
                      </div>
                      <div className="bg-quest-surface/50 rounded p-2">
                        <p className="text-xs font-semibold mb-1 text-quest-success">After (denormalized)</p>
                        <p className="text-xs font-mono text-quest-muted">orders: user_name="Alice", product_name="Widget", ...</p>
                        <p className="text-xs text-quest-muted mt-1">Everything in one row. No JOINs needed.</p>
                      </div>
                    </div>
                    <p className="text-xs text-quest-muted mt-2">
                      <strong>Tradeoff:</strong> If Alice changes her name, you must update it in every order record.
                      More storage, more update complexity — but reads become blazing fast with zero JOINs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs">
                  <strong className="text-quest-primary">The Big Picture:</strong>{' '}
                  <span className="text-quest-muted">
                    JOINs are SQL's superpower on a single machine and its Achilles' heel across multiple machines.
                    At extreme scale, every company faces this same fork in the road: build a distributed SQL engine
                    (Google), eliminate JOINs with a caching layer (Facebook), use open-source distributed SQL
                    (CockroachDB), or denormalize your data. There's no free lunch — each approach trades one
                    kind of complexity for another.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== WHAT REAL COMPANIES USE ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">The Database Stack at Scale</h3>
              <p className="text-sm text-quest-muted mb-4">
                Big companies almost never use just one database. Here's what polyglot persistence
                actually looks like:
              </p>

              <div className="space-y-3">
                {[
                  {
                    company: 'Netflix',
                    dbs: [
                      { name: 'Cassandra', use: 'Viewing history, user activity (write-heavy, distributed)', color: 'text-blue-400' },
                      { name: 'MySQL', use: 'Billing, accounts (needs ACID transactions)', color: 'text-quest-primary' },
                      { name: 'Elasticsearch', use: 'Search across catalog of titles', color: 'text-yellow-400' },
                      { name: 'EVCache (Memcached)', use: 'Caching everything, session data', color: 'text-quest-warning' },
                    ]
                  },
                  {
                    company: 'Twitter/X',
                    dbs: [
                      { name: 'MySQL (sharded)', use: 'Tweets, user profiles — core relational data', color: 'text-quest-primary' },
                      { name: 'Redis', use: 'Timeline cache — your feed is pre-computed in Redis', color: 'text-quest-danger' },
                      { name: 'Manhattan (custom KV)', use: 'DMs, notifications — custom-built for Twitter\'s scale', color: 'text-purple-400' },
                      { name: 'FlockDB (graph)', use: 'Follower/following relationships', color: 'text-quest-secondary' },
                    ]
                  },
                  {
                    company: 'Shopify',
                    dbs: [
                      { name: 'MySQL (sharded)', use: 'Products, orders, shops — core commerce data', color: 'text-quest-primary' },
                      { name: 'Redis', use: 'Rate limiting, session storage, job queues', color: 'text-quest-danger' },
                      { name: 'Elasticsearch', use: 'Product search across millions of stores', color: 'text-yellow-400' },
                      { name: 'ClickHouse', use: 'Analytics dashboards — columnar DB for fast aggregations', color: 'text-quest-success' },
                    ]
                  },
                ].map((company, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-quest-surface/50 rounded-lg p-4"
                  >
                    <h4 className="font-semibold mb-3">{company.company}</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {company.dbs.map((db, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span className={`text-xs font-mono font-bold shrink-0 w-28 ${db.color}`}>{db.name}</span>
                          <span className="text-xs text-quest-muted">{db.use}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ===== STARTER GUIDE ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">The Practical Starter Guide</h3>
              <p className="text-sm text-quest-muted mb-4">
                If you're building something <strong>today</strong>, here's what to pick:
              </p>

              <div className="space-y-3">
                {[
                  {
                    scenario: 'Any new project (default choice)',
                    db: 'PostgreSQL',
                    why: 'Free, mature, handles JSON + relational, scales to millions of users. Instagram, Stripe, and Discord all started here.',
                  },
                  {
                    scenario: 'Need caching or sessions',
                    db: 'Redis',
                    why: 'In-memory, microsecond reads. Use alongside your primary DB, never as a replacement. Every production app uses Redis.',
                  },
                  {
                    scenario: 'Rapid prototyping, schema unknown',
                    db: 'MongoDB',
                    why: 'Schema-less means zero friction. Great for MVPs. But think carefully before using it for financial/relational data.',
                  },
                  {
                    scenario: 'Chat, IoT, time-series data',
                    db: 'ScyllaDB or TimescaleDB',
                    why: 'ScyllaDB for massive write throughput. TimescaleDB (Postgres extension) if you want SQL + time-series.',
                  },
                  {
                    scenario: 'Full-text search',
                    db: 'Elasticsearch or Meilisearch',
                    why: 'Don\'t make Postgres do search. Elasticsearch for big scale, Meilisearch for simpler, faster setup.',
                  },
                  {
                    scenario: 'Analytics / dashboards',
                    db: 'ClickHouse',
                    why: 'Columnar database — can aggregate billions of rows in seconds. Free, open-source, wildly fast.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-quest-surface/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{item.scenario}</p>
                      <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded font-mono">
                        {item.db}
                      </span>
                    </div>
                    <p className="text-xs text-quest-muted">{item.why}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== TAKEAWAY ===== */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">The Pattern Behind Every Story</h3>
              <ul className="space-y-2 text-sm text-quest-muted">
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">1.</span>
                  <span><strong>Start with Postgres.</strong> It's the right choice for 90% of projects. Instagram proved it scales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">2.</span>
                  <span><strong>Add Redis immediately.</strong> Caching isn't optional in production. It's day-one infrastructure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">3.</span>
                  <span><strong>Add specialized databases when you feel pain.</strong> Search getting slow? Add Elasticsearch. Write volume crushing you? Consider Cassandra/ScyllaDB. Analytics slow? Add ClickHouse.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">4.</span>
                  <span><strong>Your access pattern decides, not the hype.</strong> Uber left Postgres because of extreme writes. Instagram stayed because of reads. Same DB, opposite decisions, both correct.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Decide
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: QUIZ */}
      {currentSection === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">🎯 Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Database decisions impact everything. Let's make sure you understand the tradeoffs!
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
                <h3 className="text-xl font-bold mb-2">Level 5 Complete! 🎉</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the fundamental database tradeoffs.
                  This knowledge is crucial for system design decisions!
                </p>
                <p className="text-sm text-quest-primary">
                  Continue your journey to learn about database scaling, CAP theorem, and more!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

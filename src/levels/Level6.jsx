import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Database, CheckCircle, HelpCircle,
  ChevronDown, ChevronUp, Hash, Layers,
  AlertTriangle, Server, Shuffle
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

export default function Level6({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [hashInput, setHashInput] = useState('')
  const [hashResults, setHashResults] = useState([])
  const [shardAnimation, setShardAnimation] = useState([])
  const [animating, setAnimating] = useState(false)

  const sections = ['intro', 'hash', 'range', 'challenges', 'side quest', 'quiz']

  const NUM_SHARDS = 4

  const sampleRecords = [
    { id: 1001, name: 'Alice', letter: 'A' },
    { id: 2045, name: 'Bob', letter: 'B' },
    { id: 3302, name: 'Charlie', letter: 'C' },
    { id: 4199, name: 'Diana', letter: 'D' },
    { id: 5678, name: 'Eve', letter: 'E' },
    { id: 6543, name: 'Frank', letter: 'F' },
    { id: 7821, name: 'Grace', letter: 'G' },
    { id: 8010, name: 'Hank', letter: 'H' },
    { id: 9156, name: 'Ivy', letter: 'I' },
    { id: 1234, name: 'Jack', letter: 'J' },
    { id: 2567, name: 'Karen', letter: 'K' },
    { id: 3890, name: 'Leo', letter: 'L' },
  ]

  const handleHashLookup = () => {
    const userId = parseInt(hashInput)
    if (isNaN(userId) || userId < 0) return
    const shard = userId % NUM_SHARDS
    setHashResults(prev => [...prev, { userId, shard }].slice(-8))
    setHashInput('')
  }

  const runShardAnimation = () => {
    if (animating) return
    setAnimating(true)
    setShardAnimation([])
    let i = 0
    const interval = setInterval(() => {
      if (i < sampleRecords.length) {
        const record = sampleRecords[i]
        const shard = record.id % NUM_SHARDS
        setShardAnimation(prev => [...prev, { ...record, shard }])
        i++
      } else {
        clearInterval(interval)
        setAnimating(false)
      }
    }, 400)
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is a partition key?',
      options: [
        { id: 'a', text: 'A special encryption key used to secure each shard', correct: false },
        { id: 'b', text: 'The field used to determine which shard stores each piece of data', correct: true },
        { id: 'c', text: 'A database index that speeds up queries', correct: false },
        { id: 'd', text: 'The primary key of the main database table', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'What is a hotspot in sharding?',
      options: [
        { id: 'a', text: 'A shard that has been recently updated', correct: false },
        { id: 'b', text: 'A server that is physically overheating', correct: false },
        { id: 'c', text: 'When one shard receives disproportionately more traffic than others', correct: true },
        { id: 'd', text: 'A region where latency is lowest', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'When is range sharding better than hash sharding?',
      options: [
        { id: 'a', text: 'When you want perfectly even data distribution', correct: false },
        { id: 'b', text: 'When you frequently query ranges of data, like dates or alphabetical ranges', correct: true },
        { id: 'c', text: 'When you have very few records', correct: false },
        { id: 'd', text: 'When all your data is the same size', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What is the biggest challenge of sharding?',
      options: [
        { id: 'a', text: 'Choosing a programming language', correct: false },
        { id: 'b', text: 'Setting up the initial database', correct: false },
        { id: 'c', text: 'Writing SQL queries', correct: false },
        { id: 'd', text: 'Cross-shard queries and data rebalancing when adding new shards', correct: true },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const shardColors = [
    'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
    'bg-violet-500/20 border-violet-500/40 text-violet-300',
    'bg-purple-500/20 border-purple-500/40 text-purple-300',
    'bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300',
  ]

  const shardLabels = ['Shard 0', 'Shard 1', 'Shard 2', 'Shard 3']

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
              The Great Divide
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "10 million users. One database. The math doesn't work. You've tried vertical
                scaling. You've added read replicas. But writes are still bottlenecked on a single
                machine. Time to divide and conquer."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              <Term
                word="Sharding"
                definition="Splitting a database into smaller, independent pieces called 'shards,' each holding a subset of the data. Each shard runs on its own server."
                onLearn={learnTerm}
              />{' '}
              is the practice of splitting your data across multiple database servers. Instead of
              one machine holding all 10 million user records, you distribute them across several
              machines, each responsible for a portion of the data.
            </p>

            <p className="text-quest-muted mb-6">
              The key decision is: how do you decide which data goes where? That's determined by
              the{' '}
              <Term
                word="Partition Key"
                definition="The field (column) used to determine which shard a piece of data belongs to. Common choices: user_id, region, or tenant_id."
                onLearn={learnTerm}
              />
              —the field used to route each record to its shard.
            </p>

            {/* Visual: Single DB overwhelmed vs Sharded */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Before vs After Sharding</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="bg-quest-bg rounded-lg p-4">
                  <p className="text-xs text-quest-danger font-medium mb-3 flex items-center gap-1">
                    <AlertTriangle size={14} /> Before: Single Database
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-6 bg-quest-danger/30 rounded text-[10px] flex items-center justify-center"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        >
                          {i + 1}
                        </motion.div>
                      ))}
                    </div>
                    <ArrowRight size={16} className="rotate-90 text-quest-muted" />
                    <div className="w-full bg-quest-danger/20 border border-quest-danger/40 rounded-lg p-3 text-center">
                      <Server size={24} className="mx-auto mb-1 text-quest-danger" />
                      <p className="text-xs text-quest-danger font-medium">Overloaded!</p>
                      <p className="text-[10px] text-quest-muted">10M records, 1 server</p>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-quest-bg rounded-lg p-4">
                  <p className="text-xs text-quest-success font-medium mb-3 flex items-center gap-1">
                    <CheckCircle size={14} /> After: Sharded
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-6 h-6 rounded text-[10px] flex items-center justify-center ${shardColors[i % NUM_SHARDS].split(' ')[0]}`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <Shuffle size={16} className="text-quest-muted" />
                    <div className="grid grid-cols-4 gap-2 w-full">
                      {shardLabels.map((label, i) => (
                        <div
                          key={i}
                          className={`border rounded-lg p-2 text-center ${shardColors[i]}`}
                        >
                          <Server size={16} className="mx-auto mb-1" />
                          <p className="text-[10px] font-medium">{label}</p>
                          <p className="text-[9px] opacity-70">~2.5M</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive: Animate data distribution */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2">Interactive: Watch Data Get Distributed</h3>
              <p className="text-sm text-quest-muted mb-4">
                Click the button to see how records get assigned to shards using their ID.
              </p>

              <button
                onClick={runShardAnimation}
                disabled={animating}
                className="btn-primary mb-4 disabled:opacity-50"
              >
                {animating ? 'Distributing...' : 'Distribute Records'}
              </button>

              <div className="grid grid-cols-4 gap-3">
                {shardLabels.map((label, shardIdx) => (
                  <div key={shardIdx} className={`border rounded-lg p-3 min-h-[120px] ${shardColors[shardIdx]}`}>
                    <p className="text-xs font-semibold mb-2 flex items-center gap-1">
                      <Database size={12} /> {label}
                    </p>
                    <div className="space-y-1">
                      <AnimatePresence>
                        {shardAnimation
                          .filter(r => r.shard === shardIdx)
                          .map(r => (
                            <motion.div
                              key={r.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-[11px] bg-black/20 rounded px-2 py-1"
                            >
                              {r.name} (#{r.id})
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>
                  </div>
                ))}
              </div>

              {shardAnimation.length > 0 && !animating && (
                <p className="text-xs text-quest-muted mt-3 text-center">
                  Each record's shard is determined by: <code className="text-quest-primary">userId % {NUM_SHARDS}</code>
                </p>
              )}
            </div>

            <DeepDive id="when-sharding" title="When Do You Actually Need Sharding?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Most applications don't need sharding.</strong> It adds significant complexity,
                so exhaust simpler options first:
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>1. Vertical scaling:</strong> Get a bigger machine. Modern servers can handle
                terabytes of data and thousands of connections. This is often enough.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>2. Read replicas:</strong> If reads are the bottleneck, add read-only copies
                of your database. Writes go to the primary, reads spread across replicas.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>3. Caching:</strong> Put a cache (Redis, Memcached) in front of your database
                to reduce the number of queries hitting it.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>4. Query optimization:</strong> Indexes, query tuning, and denormalization
                can dramatically improve performance without architectural changes. Only after
                all these options are exhausted should you consider sharding.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Hash Sharding
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: HASH SHARDING */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Hash className="text-quest-primary" />
              Hash Sharding
            </h2>

            <p className="text-quest-muted mb-6">
              <Term
                word="Hash Sharding"
                definition="A sharding strategy where a hash function is applied to the partition key to determine the shard. Provides even distribution but loses the ability to do efficient range queries."
                onLearn={learnTerm}
              />{' '}
              uses a hash function to map each record to a shard. The simplest form:
              take the partition key, apply a hash function, and use modulo to pick a shard number.
            </p>

            {/* How it works visual */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">How Hash Sharding Works</h3>

              <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
                <div className="bg-quest-bg rounded-lg px-4 py-3 text-center">
                  <p className="text-xs text-quest-muted mb-1">Input</p>
                  <p className="font-mono text-sm">userId = 7821</p>
                </div>
                <ArrowRight size={18} className="text-quest-muted" />
                <div className="bg-quest-primary/20 rounded-lg px-4 py-3 text-center border border-quest-primary/30">
                  <p className="text-xs text-quest-muted mb-1">Hash Function</p>
                  <p className="font-mono text-sm">7821 % 4</p>
                </div>
                <ArrowRight size={18} className="text-quest-muted" />
                <div className="bg-quest-success/20 rounded-lg px-4 py-3 text-center border border-quest-success/30">
                  <p className="text-xs text-quest-muted mb-1">Result</p>
                  <p className="font-mono text-sm font-bold">= 1</p>
                </div>
                <ArrowRight size={18} className="text-quest-muted" />
                <div className={`rounded-lg px-4 py-3 text-center border ${shardColors[1]}`}>
                  <p className="text-xs mb-1">Destination</p>
                  <p className="font-mono text-sm font-bold">Shard 1</p>
                </div>
              </div>

              <div className="bg-quest-bg rounded-lg p-4">
                <p className="text-xs text-quest-muted mb-3 font-medium">More examples with 4 shards:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 1001, result: 1001 % 4 },
                    { id: 2045, result: 2045 % 4 },
                    { id: 3302, result: 3302 % 4 },
                    { id: 4199, result: 4199 % 4 },
                    { id: 5678, result: 5678 % 4 },
                    { id: 6543, result: 6543 % 4 },
                    { id: 7821, result: 7821 % 4 },
                    { id: 8010, result: 8010 % 4 },
                  ].map(item => (
                    <div key={item.id} className={`rounded p-2 text-center text-xs border ${shardColors[item.result]}`}>
                      <span className="font-mono">{item.id} % 4 = {item.result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive hash lookup */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shuffle size={18} className="text-quest-secondary" />
                Try It: Hash Shard Lookup
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                Enter any user ID and see which shard it maps to.
              </p>

              <div className="flex gap-2 mb-4">
                <input
                  type="number"
                  value={hashInput}
                  onChange={e => setHashInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleHashLookup()}
                  placeholder="Enter a user ID (e.g. 42)"
                  className="flex-1 bg-quest-bg border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-quest-primary"
                />
                <button onClick={handleHashLookup} className="btn-primary text-sm">
                  Lookup
                </button>
              </div>

              {hashResults.length > 0 && (
                <div className="space-y-2">
                  {hashResults.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm border ${shardColors[r.shard]}`}
                    >
                      <span className="font-mono">userId {r.userId}</span>
                      <ArrowRight size={14} />
                      <span className="font-mono">{r.userId} % {NUM_SHARDS} = {r.shard}</span>
                      <ArrowRight size={14} />
                      <span className="font-bold">{shardLabels[r.shard]}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Even distribution benefit */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3">Why Hash Sharding Distributes Evenly</h3>
              <p className="text-sm text-quest-muted mb-4">
                A good hash function spreads values uniformly across shards, regardless of the
                input pattern. Even if user IDs are sequential (1, 2, 3, 4...), the modulo
                operation ensures each shard gets roughly the same number of records.
              </p>
              <div className="grid grid-cols-4 gap-3">
                {shardLabels.map((label, i) => {
                  const count = sampleRecords.filter(r => r.id % NUM_SHARDS === i).length
                  return (
                    <div key={i} className={`border rounded-lg p-3 text-center ${shardColors[i]}`}>
                      <p className="text-xs font-medium">{label}</p>
                      <p className="text-2xl font-bold">{count}</p>
                      <p className="text-[10px] opacity-70">records</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <DeepDive id="hash-functions" title="Hash Functions in Practice" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Simple modulo</strong> (key % N) works but has a fatal flaw: when you change N
                (add or remove shards), almost all data needs to move. If you go from 4 to 5 shards,
                about 80% of records change their shard assignment.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Consistent hashing</strong> solves this. It maps both data and servers onto a
                virtual ring. When a server is added, only the data between it and its neighbor
                needs to move—roughly 1/N of the total data. Systems like Amazon DynamoDB and
                Apache Cassandra use this approach.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>In production,</strong> you'd use a well-distributed hash function like
                MurmurHash, CityHash, or xxHash rather than plain modulo. These functions
                minimize collisions and provide better distribution across shards.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Range Sharding
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: RANGE SHARDING */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Layers className="text-quest-secondary" />
              Range Sharding
            </h2>

            <p className="text-quest-muted mb-6">
              <Term
                word="Range Sharding"
                definition="A sharding strategy where data is split into contiguous ranges based on the partition key. Efficient for range queries but can lead to uneven distribution (hotspots)."
                onLearn={learnTerm}
              />{' '}
              divides data into contiguous ranges. Instead of hashing, you define boundaries:
              all users with names A-H go to Shard 1, I-P to Shard 2, Q-Z to Shard 3.
            </p>

            {/* Range sharding visual */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Range Sharding by Username</h3>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server size={16} className="text-indigo-400" />
                    <p className="font-semibold text-indigo-300">Shard 1: A-H</p>
                  </div>
                  <div className="space-y-1">
                    {sampleRecords.filter(r => r.letter >= 'A' && r.letter <= 'H').map(r => (
                      <div key={r.id} className="text-xs bg-black/20 rounded px-2 py-1 font-mono">
                        {r.name} (#{r.id})
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    {sampleRecords.filter(r => r.letter >= 'A' && r.letter <= 'H').length} records
                  </p>
                </div>

                <div className="bg-violet-500/10 border border-violet-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server size={16} className="text-violet-400" />
                    <p className="font-semibold text-violet-300">Shard 2: I-P</p>
                  </div>
                  <div className="space-y-1">
                    {sampleRecords.filter(r => r.letter >= 'I' && r.letter <= 'P').map(r => (
                      <div key={r.id} className="text-xs bg-black/20 rounded px-2 py-1 font-mono">
                        {r.name} (#{r.id})
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    {sampleRecords.filter(r => r.letter >= 'I' && r.letter <= 'P').length} records
                  </p>
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server size={16} className="text-purple-400" />
                    <p className="font-semibold text-purple-300">Shard 3: Q-Z</p>
                  </div>
                  <div className="space-y-1">
                    {sampleRecords.filter(r => r.letter >= 'Q' && r.letter <= 'Z').map(r => (
                      <div key={r.id} className="text-xs bg-black/20 rounded px-2 py-1 font-mono">
                        {r.name} (#{r.id})
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-quest-muted mt-2">
                    {sampleRecords.filter(r => r.letter >= 'Q' && r.letter <= 'Z').length} records
                  </p>
                </div>
              </div>

              <p className="text-xs text-quest-muted text-center">
                Notice the uneven distribution? Names aren't equally distributed across the alphabet.
              </p>
            </div>

            {/* Range advantage */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3">When Range Sharding Shines</h3>
              <p className="text-sm text-quest-muted mb-4">
                Range sharding is ideal when you frequently query contiguous ranges. For example,
                if your partition key is a timestamp, all data from "January 2024" lives on one
                shard. A query like "get all orders from last month" only hits one shard instead
                of all of them.
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { range: 'Jan-Apr 2024', icon: '📅', records: '2.1M orders' },
                  { range: 'May-Aug 2024', icon: '📅', records: '2.8M orders' },
                  { range: 'Sep-Dec 2024', icon: '📅', records: '3.5M orders' },
                ].map((item, i) => (
                  <div key={i} className={`border rounded-lg p-3 text-center ${shardColors[i]}`}>
                    <p className="text-lg mb-1">{item.icon}</p>
                    <p className="text-xs font-medium">{item.range}</p>
                    <p className="text-[10px] opacity-70 mt-1">{item.records}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotspots */}
            <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="text-quest-danger" />
                The Hotspot Problem
              </h3>

              <p className="text-sm text-quest-muted mb-4">
                <Term
                  word="Hotspots"
                  definition="When one shard receives disproportionately more traffic than others, causing it to become a bottleneck. Common with range sharding when data or access patterns are uneven."
                  onLearn={learnTerm}
                />{' '}
                occur when data or traffic is unevenly distributed. With range sharding, this
                is a constant risk.
              </p>

              <div className="bg-quest-bg rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold mb-3">Celebrity User Problem:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="border border-white/10 rounded p-3 text-center">
                    <p className="text-xs font-medium mb-1">Shard 1 (A-H)</p>
                    <div className="h-16 bg-quest-surface rounded flex items-end justify-center pb-1">
                      <div className="w-8 bg-quest-muted/30 rounded-t" style={{ height: '30%' }}></div>
                    </div>
                    <p className="text-[10px] text-quest-muted mt-1">Normal traffic</p>
                  </div>
                  <div className="border border-quest-danger/50 rounded p-3 text-center bg-quest-danger/5">
                    <p className="text-xs font-medium mb-1 text-quest-danger">Shard 2 (I-P)</p>
                    <div className="h-16 bg-quest-surface rounded flex items-end justify-center pb-1">
                      <motion.div
                        className="w-8 bg-quest-danger/60 rounded-t"
                        animate={{ height: ['60%', '95%', '60%'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <p className="text-[10px] text-quest-danger mt-1">@KimKardashian just posted!</p>
                  </div>
                  <div className="border border-white/10 rounded p-3 text-center">
                    <p className="text-xs font-medium mb-1">Shard 3 (Q-Z)</p>
                    <div className="h-16 bg-quest-surface rounded flex items-end justify-center pb-1">
                      <div className="w-8 bg-quest-muted/30 rounded-t" style={{ height: '25%' }}></div>
                    </div>
                    <p className="text-[10px] text-quest-muted mt-1">Normal traffic</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-quest-muted">
                When a celebrity user (whose name falls in the I-P range) goes viral, that single
                shard gets hammered while others sit idle. Hash sharding avoids this by
                distributing users unpredictably, but loses the ability to do efficient range queries.
              </p>
            </div>

            <DeepDive id="geo-sharding" title="Geographic Sharding" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Geographic sharding</strong> splits data by region—US users on US servers,
                EU users on EU servers, Asia users on Asia servers. This offers two major benefits:
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>1. Lower latency:</strong> Users read and write to a nearby database.
                A user in Tokyo doesn't need to make a round trip to a server in Virginia.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>2. Data compliance:</strong> GDPR requires EU user data to stay in the EU.
                Geographic sharding makes this straightforward—EU data simply lives on EU servers.
              </p>
              <p className="text-sm text-quest-muted">
                The tradeoff? Cross-region queries become expensive. If a US user wants to see
                their European friend's profile, that requires a cross-shard (and cross-ocean) query.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Challenges
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: CHALLENGES */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-quest-warning" />
              Sharding Challenges
            </h2>

            <p className="text-quest-muted mb-6">
              Sharding gives you horizontal scale, but it comes at a cost. Here are the biggest
              challenges you'll face once your data lives on multiple machines.
            </p>

            {/* Shard Rebalancing */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shuffle className="text-quest-warning" />
                <Term
                  word="Shard Rebalancing"
                  definition="The process of redistributing data across shards when shards are added, removed, or become unevenly loaded. One of the most complex operations in a sharded system."
                  onLearn={learnTerm}
                />
              </h3>

              <p className="text-sm text-quest-muted mb-4">
                What happens when you need a 4th shard? With simple modulo hashing (userId % 3
                becomes userId % 4), most records change their shard assignment. Data must physically
                move between servers—while the system stays online.
              </p>

              {/* Visual: Adding a shard */}
              <div className="bg-quest-bg rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold mb-3">Adding a 4th Shard (Rebalancing):</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-quest-muted mb-2">Before: 3 Shards (userId % 3)</p>
                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map(s => (
                        <div key={s} className={`border rounded p-2 ${shardColors[s]}`}>
                          <p className="text-[10px] font-semibold mb-1">Shard {s}</p>
                          {sampleRecords.filter(r => r.id % 3 === s).map(r => (
                            <p key={r.id} className="text-[10px] font-mono">{r.name}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-quest-muted mb-2">After: 4 Shards (userId % 4)</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[0, 1, 2, 3].map(s => (
                        <div key={s} className={`border rounded p-2 ${shardColors[s]}`}>
                          <p className="text-[10px] font-semibold mb-1">Shard {s}</p>
                          {sampleRecords.filter(r => r.id % 4 === s).map(r => (
                            <p key={r.id} className="text-[10px] font-mono">{r.name}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-quest-danger mt-3 text-center">
                  Notice how most records moved to different shards. In production, this means
                  terabytes of data migrating across the network.
                </p>
              </div>
            </div>

            {/* Cross-shard queries */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3">Cross-Shard Queries</h3>
              <p className="text-sm text-quest-muted mb-4">
                In a non-sharded database, a JOIN is simple. But when User #1001 is on Shard 1 and
                their orders are on Shard 3 (sharded by order_id), a single query becomes a
                distributed operation across multiple servers.
              </p>

              <div className="bg-quest-bg rounded-lg p-4 mb-4">
                <div className="flex items-center gap-4 justify-center flex-wrap">
                  <div className="border border-indigo-500/30 rounded-lg p-3 text-center bg-indigo-500/10">
                    <Database size={16} className="mx-auto mb-1 text-indigo-400" />
                    <p className="text-[10px] font-medium text-indigo-300">Shard 1</p>
                    <p className="text-[10px] text-quest-muted">User #1001</p>
                  </div>
                  <div className="text-quest-muted text-xs flex flex-col items-center">
                    <span>JOIN?</span>
                    <motion.div
                      className="w-16 h-0.5 bg-quest-danger/50 mt-1"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-quest-danger text-[10px] mt-1">Network hop!</span>
                  </div>
                  <div className="border border-purple-500/30 rounded-lg p-3 text-center bg-purple-500/10">
                    <Database size={16} className="mx-auto mb-1 text-purple-400" />
                    <p className="text-[10px] font-medium text-purple-300">Shard 3</p>
                    <p className="text-[10px] text-quest-muted">Orders for #1001</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded p-3">
                  <p className="text-xs font-semibold text-quest-danger mb-2">Slow: Cross-Shard JOIN</p>
                  <code className="text-[11px] text-quest-muted font-mono block">
                    SELECT u.name, o.total<br />
                    FROM users u JOIN orders o<br />
                    ON u.id = o.user_id<br />
                    -- Requires querying 2 shards!
                  </code>
                </div>
                <div className="bg-quest-bg rounded p-3">
                  <p className="text-xs font-semibold text-quest-success mb-2">Fast: Single-Shard Query</p>
                  <code className="text-[11px] text-quest-muted font-mono block">
                    SELECT * FROM orders<br />
                    WHERE user_id = 1001<br />
                    -- All on Shard 1 if sharded<br />
                    -- by user_id
                  </code>
                </div>
              </div>
            </div>

            {/* Pros/Cons Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">Sharding Strengths</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>* Horizontal scalability—add more machines</li>
                  <li>* Each shard handles less data and traffic</li>
                  <li>* Fault isolation—one shard failing doesn't take down everything</li>
                  <li>* Can place shards closer to users (geo-sharding)</li>
                  <li>* Enables handling billions of records</li>
                </ul>
              </div>
              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">Sharding Challenges</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>* Cross-shard queries are slow and complex</li>
                  <li>* Rebalancing data when adding shards is painful</li>
                  <li>* Application logic must be shard-aware</li>
                  <li>* No easy cross-shard transactions</li>
                  <li>* Operational complexity increases dramatically</li>
                </ul>
              </div>
            </div>

            <DeepDive id="real-sharding" title="Real-World Sharding Stories" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Discord</strong> shards by guild_id. Each Discord server's messages, members,
                and channels live on the same shard. This means all operations within a server are
                fast single-shard queries. Cross-server operations (like a user's global profile)
                require querying multiple shards.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Instagram</strong> shards by user_id. A user's photos, followers, and likes
                are co-located on the same shard. When you view someone's profile, it's a single
                shard hit. The global feed, however, requires aggregating across many shards.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>YouTube (Vitess)</strong> built Vitess, an open-source sharding middleware
                for MySQL. It handles shard routing, query splitting, and rebalancing transparently.
                Your application talks to Vitess as if it's a single database, and Vitess routes
                queries to the correct shard. Many companies (Slack, Square, GitHub) now use Vitess.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Side Quest
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SIDE QUEST — Geographic Sharding in the Real World */}
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
            <h2 className="text-2xl font-bold mb-2">Geographic Sharding: Where Your Data Lives Matters</h2>
            <p className="text-quest-muted mb-6">
              Most sharding discussions focus on <em>how</em> to split data. But at global scale,
              <em> where</em> you put each shard becomes just as important — for speed, for laws, and for survival.
            </p>

            {/* ===== THE CORE CONCEPT ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">The Idea: Data Follows Users</h3>
              <p className="text-sm text-quest-muted mb-4">
                Instead of randomly distributing data across machines, geographic sharding puts data
                on servers <strong>physically close to the users who access it most</strong>. A user in
                Berlin reads from a Frankfurt data center. A user in Tokyo reads from an Osaka data center.
              </p>

              {/* World map visual */}
              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold mb-3 text-center">GEOGRAPHIC SHARD LAYOUT</p>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-quest-bg rounded-lg p-4 border border-blue-500/30 text-center"
                  >
                    <p className="text-2xl mb-2">🇺🇸</p>
                    <p className="text-xs font-semibold text-blue-400 mb-1">US-EAST (Virginia)</p>
                    <p className="text-[10px] text-quest-muted mb-2">North & South America</p>
                    <div className="bg-blue-500/10 rounded p-2">
                      <p className="text-[10px] font-mono text-blue-300">~150M users</p>
                      <p className="text-[10px] text-quest-muted">Latency: 5-20ms</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-quest-bg rounded-lg p-4 border border-green-500/30 text-center"
                  >
                    <p className="text-2xl mb-2">🇪🇺</p>
                    <p className="text-xs font-semibold text-green-400 mb-1">EU-WEST (Frankfurt)</p>
                    <p className="text-[10px] text-quest-muted mb-2">Europe, Middle East, Africa</p>
                    <div className="bg-green-500/10 rounded p-2">
                      <p className="text-[10px] font-mono text-green-300">~200M users</p>
                      <p className="text-[10px] text-quest-muted">Latency: 5-20ms</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-quest-bg rounded-lg p-4 border border-purple-500/30 text-center"
                  >
                    <p className="text-2xl mb-2">🇯🇵</p>
                    <p className="text-xs font-semibold text-purple-400 mb-1">AP-EAST (Tokyo)</p>
                    <p className="text-[10px] text-quest-muted mb-2">Asia-Pacific, Oceania</p>
                    <div className="bg-purple-500/10 rounded p-2">
                      <p className="text-[10px] font-mono text-purple-300">~250M users</p>
                      <p className="text-[10px] text-quest-muted">Latency: 5-20ms</p>
                    </div>
                  </motion.div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-quest-muted">
                    Without geo-sharding: a Tokyo user hits Virginia → <span className="text-quest-danger font-mono">~150ms round trip</span>
                  </p>
                  <p className="text-xs text-quest-muted">
                    With geo-sharding: a Tokyo user hits Tokyo → <span className="text-quest-success font-mono">~10ms round trip</span>
                  </p>
                </div>
              </div>

              {/* Latency comparison */}
              <div className="bg-quest-surface/50 rounded-lg p-4">
                <p className="text-xs font-semibold mb-3">REAL LATENCY NUMBERS (Speed of Light Limits)</p>
                <div className="space-y-2">
                  {[
                    { route: 'Tokyo → Osaka (local)', ms: '~5ms', pct: 5, color: 'bg-quest-success' },
                    { route: 'London → Frankfurt (same region)', ms: '~10ms', pct: 10, color: 'bg-quest-success' },
                    { route: 'New York → Virginia (nearby)', ms: '~15ms', pct: 15, color: 'bg-quest-success' },
                    { route: 'New York → London (cross-Atlantic)', ms: '~75ms', pct: 50, color: 'bg-quest-warning' },
                    { route: 'London → Tokyo (cross-continent)', ms: '~120ms', pct: 70, color: 'bg-quest-danger' },
                    { route: 'New York → Sydney (worst case)', ms: '~200ms', pct: 100, color: 'bg-quest-danger' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[10px] text-quest-muted w-48 shrink-0">{r.route}</span>
                      <div className="flex-1 bg-quest-bg rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${r.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${r.pct}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        />
                      </div>
                      <span className="text-[10px] font-mono w-12 text-right">{r.ms}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-quest-muted mt-3">
                  These are <strong>one-way</strong> times. A database query requires a round trip (double it),
                  plus processing time. A 200ms round trip means 400ms minimum per query — users notice anything over 100ms.
                </p>
              </div>
            </div>

            {/* ===== GDPR & DATA SOVEREIGNTY ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">⚖️</span>
                <div>
                  <h3 className="text-lg font-semibold">Data Sovereignty: It's Not Just About Speed</h3>
                  <p className="text-xs text-quest-muted">When the law tells you where to put your servers</p>
                </div>
              </div>

              <p className="text-sm text-quest-muted mb-4">
                Geographic sharding isn't optional for many companies — it's <strong>legally required</strong>.
                Different countries have different rules about where citizen data can be stored and processed.
              </p>

              <div className="space-y-3 mb-4">
                {[
                  {
                    law: 'GDPR (EU)',
                    flag: '🇪🇺',
                    rule: 'EU citizen data must be processed with adequate protections. Transferring to the US requires specific legal frameworks (previously Privacy Shield, now EU-US Data Privacy Framework).',
                    penalty: 'Up to 4% of global revenue or $20M+',
                    example: 'Meta fined $1.3B in 2023 for transferring EU data to US servers',
                    color: 'border-blue-500/30'
                  },
                  {
                    law: 'Russia (Data Localization)',
                    flag: '🇷🇺',
                    rule: 'Russian citizen data must be stored on servers physically located in Russia. No exceptions.',
                    penalty: 'Service blocked in Russia',
                    example: 'LinkedIn was blocked in Russia in 2016 for non-compliance',
                    color: 'border-red-500/30'
                  },
                  {
                    law: 'China (PIPL + CSL)',
                    flag: '🇨🇳',
                    rule: 'Personal data and "important data" must be stored in China. Cross-border transfers require security assessments.',
                    penalty: 'Business license revocation',
                    example: 'Apple built a China-specific data center operated by a Chinese company (GCBD)',
                    color: 'border-yellow-500/30'
                  },
                  {
                    law: 'India (DPDP Act)',
                    flag: '🇮🇳',
                    rule: 'Certain categories of personal data cannot leave India. Government can designate specific countries as restricted.',
                    penalty: 'Up to $30M per violation',
                    example: 'RBI mandates all payment data stored exclusively in India',
                    color: 'border-orange-500/30'
                  },
                ].map((law, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-quest-surface/50 rounded-lg p-4 border ${law.color}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{law.flag}</span>
                      <span className="text-sm font-semibold">{law.law}</span>
                    </div>
                    <p className="text-xs text-quest-muted mb-2">{law.rule}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="text-[10px] bg-quest-danger/10 text-quest-danger px-2 py-0.5 rounded">
                        Penalty: {law.penalty}
                      </span>
                      <span className="text-[10px] bg-quest-bg px-2 py-0.5 rounded text-quest-muted">
                        {law.example}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-quest-warning/10 rounded-lg p-3 border border-quest-warning/20">
                <p className="text-xs">
                  <strong className="text-quest-warning">Why this matters for architects:</strong>{' '}
                  <span className="text-quest-muted">
                    If you're building for a global audience, geographic sharding isn't a performance
                    optimization — it's a compliance requirement. Your database architecture must account
                    for where data physically lives, or you risk billion-dollar fines.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== THE CROSS-REGION PROBLEM ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🌊</span>
                <div>
                  <h3 className="text-lg font-semibold">The Cross-Ocean Query Problem</h3>
                  <p className="text-xs text-quest-muted">What happens when a US user looks at their EU friend's profile?</p>
                </div>
              </div>

              <p className="text-sm text-quest-muted mb-4">
                Geographic sharding works beautifully when users only access their own data. But social
                apps, messaging, and collaboration tools constantly cross region boundaries.
              </p>

              {/* Visual: Cross-region query */}
              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold mb-3 text-center">CROSS-REGION FRIEND LOOKUP</p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="bg-blue-500/10 rounded-lg p-3 text-center border border-blue-500/30">
                    <p className="text-lg">👤</p>
                    <p className="text-xs font-semibold text-blue-400">Alice (US)</p>
                    <p className="text-[10px] text-quest-muted">US-East shard</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] text-quest-muted mb-1">"Show me Bob's profile"</p>
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="w-20 h-0.5 bg-quest-warning"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-xs">🌊</span>
                      <motion.div
                        className="w-20 h-0.5 bg-quest-warning"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-[10px] text-quest-danger mt-1 font-mono">~150ms round trip</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 text-center border border-green-500/30">
                    <p className="text-lg">👤</p>
                    <p className="text-xs font-semibold text-green-400">Bob (EU)</p>
                    <p className="text-[10px] text-quest-muted">EU-West shard</p>
                  </div>
                </div>
              </div>

              <div className="bg-quest-surface/50 rounded-lg p-4 mb-4">
                <h4 className="text-xs font-semibold text-quest-primary mb-3">HOW COMPANIES SOLVE CROSS-REGION READS</h4>
                <div className="space-y-3">
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">1. Read Replicas in Every Region</p>
                    <p className="text-xs text-quest-muted">
                      Keep a read-only copy of all data in every region. Bob's profile is mastered in EU
                      but a read replica exists in US. Alice reads the local copy. Writes still go to EU.
                    </p>
                    <p className="text-[10px] text-quest-warning mt-1">
                      Tradeoff: Slight delay (100-500ms) before changes appear in other regions (eventual consistency).
                    </p>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">2. CDN-style Profile Caching</p>
                    <p className="text-xs text-quest-muted">
                      Cache frequently accessed cross-region profiles at the edge. Bob's profile is cached in
                      US edge servers. Cache invalidation happens on updates. Used by Instagram and TikTok.
                    </p>
                    <p className="text-[10px] text-quest-warning mt-1">
                      Tradeoff: Stale data possible. You might see Bob's old profile pic for a few minutes after he changes it.
                    </p>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs font-semibold mb-1">3. Async Replication + Conflict Resolution</p>
                    <p className="text-xs text-quest-muted">
                      Let users write to their local region and sync asynchronously. If two users edit the same
                      document from different regions, use last-write-wins, CRDTs, or manual merge.
                    </p>
                    <p className="text-[10px] text-quest-warning mt-1">
                      Tradeoff: Complex conflict handling. Google Docs uses Operational Transformation for this.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-quest-primary/10 rounded-lg p-3 border border-quest-primary/20">
                <p className="text-xs">
                  <strong className="text-quest-primary">Key insight:</strong>{' '}
                  <span className="text-quest-muted">
                    Cross-region reads are solvable with caching and replicas. Cross-region <strong>writes</strong> are
                    the hard problem — they require consensus across data centers separated by oceans, which
                    physics limits to ~150ms minimum per round trip.
                  </span>
                </p>
              </div>
            </div>

            {/* ===== WHO DOES THIS ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Real-World Geographic Sharding</h3>

              <div className="space-y-4">
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🎮</span>
                    <span className="text-sm font-semibold">Riot Games (League of Legends)</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Completely separate game servers and databases per region: NA, EUW, EUNE, KR, JP, BR, OCE, etc.
                    Your account, match history, and rank exist only in your region. Transferring regions
                    is a paid service that physically moves your data.
                  </p>
                  <p className="text-xs text-quest-muted">
                    <strong>Why it works:</strong> Gaming is latency-critical (every millisecond matters in competitive play).
                    Players in a match are always in the same region. Cross-region interaction is rare and acceptable to limit.
                  </p>
                </div>

                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📱</span>
                    <span className="text-sm font-semibold">WhatsApp</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    Messages are routed through the nearest data center but delivered globally. A message
                    from India to the US goes: phone → nearest edge → Indian data center → US data center → recipient.
                    The sender's device connects to a local server, keeping the initial hop fast.
                  </p>
                  <p className="text-xs text-quest-muted">
                    <strong>Why it works:</strong> Messaging is naturally async — a 200ms delivery delay is invisible to users.
                    End-to-end encryption means servers don't need to read/process the data, just route it.
                  </p>
                </div>

                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🛒</span>
                    <span className="text-sm font-semibold">Shopify</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    In 2023, Shopify moved to a multi-region architecture. Each merchant's shop data is
                    mastered in the region closest to the merchant. Customer-facing reads use a global CDN.
                    Critical checkout data stays in the merchant's region for consistency.
                  </p>
                  <p className="text-xs text-quest-muted">
                    <strong>Why it works:</strong> Merchants mostly manage their own shop (local reads/writes).
                    Customers worldwide read product pages (cached via CDN). Checkout writes go to the merchant's region
                    — one cross-region hop is acceptable for a purchase.
                  </p>
                </div>

                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">☁️</span>
                    <span className="text-sm font-semibold">Google Spanner</span>
                  </div>
                  <p className="text-xs text-quest-muted mb-2">
                    The ultimate solution: a globally distributed database that supports reads AND writes from any
                    region with strong consistency. Uses GPS-synchronized atomic clocks (TrueTime) in every data center
                    to order transactions globally without requiring cross-region round trips for every write.
                  </p>
                  <p className="text-xs text-quest-muted">
                    <strong>The catch:</strong> Only Google (and Google Cloud customers) have this. It requires
                    GPS receivers and atomic clocks in every data center. Monthly cost starts at ~$2,000+ for a
                    minimal setup. It's the "money solves physics" approach.
                  </p>
                </div>
              </div>
            </div>

            {/* ===== DECISION FRAMEWORK ===== */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">When Do You Need Geographic Sharding?</h3>

              <div className="space-y-3 mb-4">
                {[
                  {
                    scenario: 'Users are in one country/region',
                    answer: 'No',
                    detail: 'Use a single-region setup with a CDN for static assets. Most startups fit here.',
                    color: 'border-quest-success/30'
                  },
                  {
                    scenario: 'Global users, read-heavy, eventual consistency OK',
                    answer: 'Maybe — use read replicas',
                    detail: 'One primary region for writes + read replicas in other regions. Netflix, Medium, and most content platforms.',
                    color: 'border-quest-warning/30'
                  },
                  {
                    scenario: 'Global users with data residency laws (GDPR, etc.)',
                    answer: 'Yes — legally required',
                    detail: 'EU data must stay in EU. You must geo-shard or face fines. This alone justifies the complexity.',
                    color: 'border-quest-danger/30'
                  },
                  {
                    scenario: 'Latency-critical global app (gaming, trading, video calls)',
                    answer: 'Yes — for performance',
                    detail: 'Physics limits cross-ocean latency to 100ms+. If your UX requires <30ms, data must be nearby.',
                    color: 'border-quest-danger/30'
                  },
                  {
                    scenario: 'Global users needing strong consistency everywhere',
                    answer: 'Yes — use Spanner or CockroachDB',
                    detail: 'The hardest case. Requires distributed SQL with global consensus. Expensive but sometimes necessary.',
                    color: 'border-quest-danger/30'
                  },
                ].map((item, i) => (
                  <div key={i} className={`bg-quest-surface/50 rounded-lg p-3 border ${item.color}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium">{item.scenario}</p>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        item.answer.startsWith('No') ? 'bg-quest-success/20 text-quest-success' :
                        item.answer.startsWith('Maybe') ? 'bg-quest-warning/20 text-quest-warning' :
                        'bg-quest-danger/20 text-quest-danger'
                      }`}>
                        {item.answer}
                      </span>
                    </div>
                    <p className="text-xs text-quest-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== TAKEAWAY ===== */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">The Geographic Sharding Cheat Sheet</h3>
              <ul className="space-y-2 text-sm text-quest-muted">
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">1.</span>
                  <span><strong>Speed of light is your real bottleneck.</strong> No amount of engineering makes New York to Tokyo faster than ~150ms round trip. If latency matters, data must be local.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">2.</span>
                  <span><strong>Laws, not performance, often force the decision.</strong> GDPR, Russia's data localization, China's PIPL — compliance drives architecture more than engineering preferences.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">3.</span>
                  <span><strong>Reads are easy, writes are hard.</strong> Read replicas + CDN solve most cross-region read problems. Cross-region writes with consistency require tools like Spanner or careful conflict resolution.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5 font-bold">4.</span>
                  <span><strong>Most apps don't need this.</strong> If your users are in one country and you don't handle EU data, a single-region setup with a CDN is simpler, cheaper, and fast enough.</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back to Challenges
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
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Sharding is one of the most complex topics in system design. Let's make sure you've
              got the fundamentals down!
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
                <h3 className="text-xl font-bold mb-2">Level 6 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand database sharding—one of the most powerful (and complex)
                  scaling techniques. You know when to use it, how hash and range sharding work,
                  and the tradeoffs involved.
                </p>
                <p className="text-sm text-quest-primary">
                  Next up: even more advanced distributed systems concepts await!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

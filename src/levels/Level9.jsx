import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Circle, Server, Database, Hash, Plus, Minus, RefreshCw, Shuffle
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

/* Hash Ring visual helper: positions nodes around a CSS circle */
function HashRing({ servers, dataKeys, size = 240, showLabels = true }) {
  const radius = size / 2 - 20
  const center = size / 2

  const getPosition = (angle) => ({
    x: center + radius * Math.cos((angle * Math.PI) / 180 - Math.PI / 2),
    y: center + radius * Math.sin((angle * Math.PI) / 180 - Math.PI / 2),
  })

  return (
    <div className="relative mx-auto" style={{ width: size, height: size }}>
      {/* Ring circle */}
      <div
        className="absolute rounded-full border-2 border-quest-primary/40"
        style={{
          width: radius * 2,
          height: radius * 2,
          top: center - radius,
          left: center - radius,
        }}
      />
      {/* Server nodes */}
      {servers.map((srv, i) => {
        const pos = getPosition(srv.angle)
        return (
          <motion.div
            key={srv.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="absolute flex flex-col items-center"
            style={{ left: pos.x - 16, top: pos.y - 16 }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${srv.color || 'bg-quest-primary/80 text-white'}`}>
              <Server size={14} />
            </div>
            {showLabels && (
              <span className="text-[10px] text-quest-muted mt-1 whitespace-nowrap">{srv.label}</span>
            )}
          </motion.div>
        )
      })}
      {/* Data keys */}
      {dataKeys?.map((key, i) => {
        const pos = getPosition(key.angle)
        return (
          <motion.div
            key={key.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="absolute"
            style={{ left: pos.x - 6, top: pos.y - 6 }}
          >
            <div className={`w-3 h-3 rounded-full ${key.color || 'bg-quest-warning'}`} title={key.label} />
            {showLabels && key.label && (
              <span className="text-[8px] text-quest-muted absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">{key.label}</span>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Level9({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [showFourthServer, setShowFourthServer] = useState(false)
  const [useVirtualNodes, setUseVirtualNodes] = useState(false)
  const [ringOperation, setRingOperation] = useState('stable') // 'stable', 'add', 'remove'
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['intro', 'hashring', 'vnodes', 'operations', 'quiz']

  /* --- Modular hashing demo data --- */
  const modThreeData = [
    { key: 'user:1', hash: 7, server: 7 % 3 },
    { key: 'user:2', hash: 12, server: 12 % 3 },
    { key: 'user:3', hash: 5, server: 5 % 3 },
    { key: 'user:4', hash: 19, server: 19 % 3 },
    { key: 'user:5', hash: 22, server: 22 % 3 },
    { key: 'user:6', hash: 31, server: 31 % 3 },
  ]

  /* --- Hash ring demo data --- */
  const baseServers = [
    { id: 'A', label: 'Server A', angle: 0, color: 'bg-blue-500 text-white' },
    { id: 'B', label: 'Server B', angle: 120, color: 'bg-green-500 text-white' },
    { id: 'C', label: 'Server C', angle: 240, color: 'bg-purple-500 text-white' },
  ]

  const ringDataKeys = [
    { id: 'k1', label: 'k1', angle: 30, color: 'bg-blue-400' },
    { id: 'k2', label: 'k2', angle: 80, color: 'bg-blue-400' },
    { id: 'k3', label: 'k3', angle: 150, color: 'bg-green-400' },
    { id: 'k4', label: 'k4', angle: 200, color: 'bg-green-400' },
    { id: 'k5', label: 'k5', angle: 270, color: 'bg-purple-400' },
    { id: 'k6', label: 'k6', angle: 330, color: 'bg-purple-400' },
  ]

  /* --- Virtual nodes demo data --- */
  const noVnodeServers = [
    { id: 'A', label: 'A', angle: 10, color: 'bg-blue-500 text-white' },
    { id: 'B', label: 'B', angle: 170, color: 'bg-green-500 text-white' },
    { id: 'C', label: 'C', angle: 190, color: 'bg-purple-500 text-white' },
  ]

  const vnodeServers = [
    { id: 'A1', label: 'A1', angle: 10, color: 'bg-blue-500 text-white' },
    { id: 'A2', label: 'A2', angle: 130, color: 'bg-blue-500 text-white' },
    { id: 'A3', label: 'A3', angle: 250, color: 'bg-blue-500 text-white' },
    { id: 'B1', label: 'B1', angle: 50, color: 'bg-green-500 text-white' },
    { id: 'B2', label: 'B2', angle: 170, color: 'bg-green-500 text-white' },
    { id: 'B3', label: 'B3', angle: 290, color: 'bg-green-500 text-white' },
    { id: 'C1', label: 'C1', angle: 90, color: 'bg-purple-500 text-white' },
    { id: 'C2', label: 'C2', angle: 210, color: 'bg-purple-500 text-white' },
    { id: 'C3', label: 'C3', angle: 330, color: 'bg-purple-500 text-white' },
  ]

  /* --- Operations demo data --- */
  const operationServers = () => {
    const base = [
      { id: 'A', label: 'Server A', angle: 0, color: 'bg-blue-500 text-white' },
      { id: 'B', label: 'Server B', angle: 120, color: 'bg-green-500 text-white' },
      { id: 'C', label: 'Server C', angle: 240, color: 'bg-purple-500 text-white' },
    ]
    if (ringOperation === 'add') {
      base.push({ id: 'D', label: 'Server D (new)', angle: 60, color: 'bg-orange-500 text-white' })
    }
    if (ringOperation === 'remove') {
      return base.filter(s => s.id !== 'B')
    }
    return base
  }

  const operationKeys = () => {
    if (ringOperation === 'add') {
      return [
        { id: 'k1', label: 'k1', angle: 30, color: 'bg-blue-400' },
        { id: 'k2', label: 'k2 (moves!)', angle: 50, color: 'bg-orange-400' },
        { id: 'k3', label: 'k3', angle: 150, color: 'bg-green-400' },
        { id: 'k4', label: 'k4', angle: 200, color: 'bg-green-400' },
        { id: 'k5', label: 'k5', angle: 270, color: 'bg-purple-400' },
        { id: 'k6', label: 'k6', angle: 330, color: 'bg-purple-400' },
      ]
    }
    if (ringOperation === 'remove') {
      return [
        { id: 'k1', label: 'k1', angle: 30, color: 'bg-blue-400' },
        { id: 'k2', label: 'k2', angle: 80, color: 'bg-blue-400' },
        { id: 'k3', label: 'k3 (moved)', angle: 150, color: 'bg-purple-400' },
        { id: 'k4', label: 'k4 (moved)', angle: 200, color: 'bg-purple-400' },
        { id: 'k5', label: 'k5', angle: 270, color: 'bg-purple-400' },
        { id: 'k6', label: 'k6', angle: 330, color: 'bg-blue-400' },
      ]
    }
    return ringDataKeys
  }

  /* --- Quiz --- */
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What problem does consistent hashing solve?',
      options: [
        { id: 'a', text: 'Making hash functions faster to compute', correct: false },
        { id: 'b', text: 'Minimizing data redistribution when nodes are added or removed from a distributed system', correct: true },
        { id: 'c', text: 'Encrypting data across distributed servers', correct: false },
        { id: 'd', text: 'Ensuring data is stored alphabetically across servers', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'In consistent hashing, when a new server is added...',
      options: [
        { id: 'a', text: 'All keys must be rehashed and redistributed', correct: false },
        { id: 'b', text: 'No keys need to move at all', correct: false },
        { id: 'c', text: 'Only the keys between the new server and its predecessor need to be moved', correct: true },
        { id: 'd', text: 'Exactly half of all keys need to move', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What is the purpose of virtual nodes?',
      options: [
        { id: 'a', text: 'To create backups of each server', correct: false },
        { id: 'b', text: 'To ensure more even distribution of data across physical servers', correct: true },
        { id: 'c', text: 'To speed up hash computation', correct: false },
        { id: 'd', text: 'To reduce the total number of servers needed', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'In traditional hash(key) % N, adding one server requires moving approximately...',
      options: [
        { id: 'a', text: '1/N of all keys', correct: false },
        { id: 'b', text: 'Only keys on the new server', correct: false },
        { id: 'c', text: 'No keys at all', correct: false },
        { id: 'd', text: '(N-1)/N of all keys, which is nearly everything', correct: true },
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
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Hash className="text-quest-primary" />
              The Ring of Power
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "You added a new database server. Now ALL your cached data is invalid.
                There must be a better way."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              Imagine you have 3 cache servers. You distribute data using a simple formula:{' '}
              <code className="bg-quest-surface px-2 py-1 rounded text-quest-primary text-sm">
                hash(key) % 3
              </code>. It works great -- until you add a 4th server. Suddenly{' '}
              <code className="bg-quest-surface px-2 py-1 rounded text-quest-primary text-sm">
                hash(key) % 4
              </code>{' '}
              gives completely different results, and <strong>nearly all your cache is invalidated</strong>.
            </p>

            {/* Modular hashing visual */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">The Modular Hashing Problem</h3>
                <button
                  onClick={() => setShowFourthServer(!showFourthServer)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                    ${showFourthServer ? 'bg-quest-danger/20 text-quest-danger' : 'bg-quest-primary/20 text-quest-primary'}`}
                >
                  {showFourthServer ? <Minus size={14} /> : <Plus size={14} />}
                  {showFourthServer ? 'Remove Server 4' : 'Add Server 4'}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">Key</th>
                      <th className="text-center py-2 px-3">Hash</th>
                      <th className="text-center py-2 px-3">% 3</th>
                      {showFourthServer && <th className="text-center py-2 px-3">% 4</th>}
                      {showFourthServer && <th className="text-center py-2 px-3">Moved?</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {modThreeData.map((row) => {
                      const newServer = row.hash % 4
                      const moved = row.server !== newServer
                      return (
                        <tr key={row.key} className="border-b border-white/5">
                          <td className="py-2 px-3 font-mono text-xs">{row.key}</td>
                          <td className="text-center py-2 px-3 text-quest-muted">{row.hash}</td>
                          <td className="text-center py-2 px-3">
                            <span className="bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded text-xs">
                              Server {row.server}
                            </span>
                          </td>
                          {showFourthServer && (
                            <td className="text-center py-2 px-3">
                              <span className={`px-2 py-0.5 rounded text-xs ${moved ? 'bg-quest-danger/20 text-quest-danger' : 'bg-quest-success/20 text-quest-success'}`}>
                                Server {newServer}
                              </span>
                            </td>
                          )}
                          {showFourthServer && (
                            <td className="text-center py-2 px-3">
                              {moved ? (
                                <span className="text-quest-danger font-bold">YES</span>
                              ) : (
                                <span className="text-quest-success">No</span>
                              )}
                            </td>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {showFourthServer && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4 text-center"
                >
                  <p className="text-quest-danger font-semibold">
                    {modThreeData.filter(r => r.server !== r.hash % 4).length} out of {modThreeData.length} keys moved!
                  </p>
                  <p className="text-sm text-quest-muted mt-1">
                    With real data, adding 1 server to 3 invalidates ~75% of your cache.
                  </p>
                </motion.div>
              )}
            </div>

            <p className="text-quest-muted mb-4">
              This is where{' '}
              <Term
                word="Consistent Hashing"
                definition="A technique that minimizes data movement when nodes are added or removed. Instead of mod N, keys and servers share a circular hash space."
                onLearn={learnTerm}
              />{' '}
              comes in. What if only <strong>1/N</strong> of data needed to move instead of nearly everything?
            </p>

            <DeepDive id="mod-hashing-math" title="The Problem with Modular Hashing" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Mathematically:</strong> When you go from N servers to N+1, a key stays on the
                same server only if <code>hash(key) % N === hash(key) % (N+1)</code>. The probability
                of this is approximately <code>1/N</code>.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                That means <strong>(N-1)/N</strong> keys will move. Going from 3 to 4 servers: 75% of
                keys move. Going from 99 to 100 servers: 99% of keys move. The more servers you have,
                the worse it gets!
              </p>
              <p className="text-sm text-quest-muted">
                In a production cache cluster, this means a <strong>cache stampede</strong> -- thousands
                of requests simultaneously miss cache and hit your database, potentially bringing it down.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Discover the Hash Ring
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: HASH RING */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Circle className="text-quest-primary" />
              The{' '}
              <Term
                word="Hash Ring"
                definition="A circular hash space where both servers and data keys are placed. Each key is assigned to the next server found clockwise on the ring."
                onLearn={learnTerm}
              />
            </h2>

            <p className="text-quest-muted mb-6">
              Instead of <code className="text-quest-primary bg-quest-surface px-1 rounded">hash % N</code>,
              imagine arranging the entire hash space in a <strong>circle</strong>. Both servers and keys
              get hashed onto positions on this ring. Each key belongs to the <strong>next server clockwise</strong>.
            </p>

            {/* Interactive hash ring */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center">3 Servers on a Hash Ring</h3>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <HashRing servers={baseServers} dataKeys={ringDataKeys} size={260} />

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                    <span className="text-quest-muted"><strong>Server A</strong> owns keys k1, k2 (0 to 120 range)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-quest-muted"><strong>Server B</strong> owns keys k3, k4 (120 to 240 range)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded-full bg-purple-500" />
                    <span className="text-quest-muted"><strong>Server C</strong> owns keys k5, k6 (240 to 360 range)</span>
                  </div>

                  <div className="mt-4 p-3 bg-quest-bg rounded-lg">
                    <p className="text-xs text-quest-muted">
                      Each server "owns" the range from the previous server to itself (clockwise).
                      When a key is hashed, it walks clockwise until it finds a server.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why it helps */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-2 flex items-center gap-2">
                  <Plus size={16} /> Adding a Server
                </h4>
                <p className="text-sm text-quest-muted">
                  When a new server joins the ring, it only takes ownership of keys in its immediate range.
                  Keys assigned to other servers stay put. Only <strong>~1/N</strong> keys move.
                </p>
              </div>
              <div className="bg-quest-warning/10 rounded-lg p-4 border border-quest-warning/30">
                <h4 className="font-semibold text-quest-warning mb-2 flex items-center gap-2">
                  <Minus size={16} /> Removing a Server
                </h4>
                <p className="text-sm text-quest-muted">
                  When a server leaves, only its keys need to redistribute to the next clockwise server.
                  All other keys remain unaffected.
                </p>
              </div>
            </div>

            <DeepDive id="hash-ring-math" title="Hash Ring Math" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Hash space:</strong> Typically 0 to 2<sup>32</sup> - 1 (about 4.3 billion positions).
                The ring wraps around so that position 2<sup>32</sup> connects back to position 0.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Positioning:</strong> Both servers and keys are placed using the same hash function
                (e.g., MD5, SHA-1, or xxHash). <code>hash("ServerA") = 2,481,032,...</code> maps to a
                point on the ring.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Key lookup:</strong> To find which server owns a key, compute
                <code> hash(key)</code> and walk clockwise. The first server you encounter is the owner.
                In practice, this is done with a sorted list and binary search: O(log N) lookup.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Virtual Nodes
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: VIRTUAL NODES */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shuffle className="text-quest-secondary" />
              <Term
                word="Virtual Nodes"
                definition="Each physical server gets multiple positions on the hash ring, creating a more even distribution of data. Also called 'vnodes'."
                onLearn={learnTerm}
              />
            </h2>

            <p className="text-quest-muted mb-4">
              There is a problem with the basic hash ring: with only a few physical servers,
              the distribution can be <strong>very uneven</strong>. Servers might end up clustered
              together, leaving one server responsible for a huge portion of the ring.
            </p>

            {/* Interactive toggle */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Distribution Comparison</h3>
                <button
                  onClick={() => setUseVirtualNodes(!useVirtualNodes)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                    ${useVirtualNodes ? 'bg-quest-success/20 text-quest-success' : 'bg-quest-warning/20 text-quest-warning'}`}
                >
                  <RefreshCw size={14} />
                  {useVirtualNodes ? 'With Virtual Nodes' : 'Without Virtual Nodes'}
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <HashRing
                  servers={useVirtualNodes ? vnodeServers : noVnodeServers}
                  dataKeys={[]}
                  size={280}
                />

                <div className="flex-1 space-y-4">
                  {!useVirtualNodes ? (
                    <>
                      <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4">
                        <p className="text-sm font-semibold text-quest-danger mb-1">Uneven Distribution</p>
                        <p className="text-xs text-quest-muted">
                          Server A owns ~45% of the ring, while B and C split the remaining ~55%.
                          B and C happen to be close together on the ring.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-blue-400">Server A</span><span>~45%</span>
                          </div>
                          <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '45%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-green-400">Server B</span><span>~5%</span>
                          </div>
                          <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '5%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-purple-400">Server C</span><span>~50%</span>
                          </div>
                          <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '50%' }} />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-4">
                        <p className="text-sm font-semibold text-quest-success mb-1">Even Distribution</p>
                        <p className="text-xs text-quest-muted">
                          Each server appears 3 times on the ring (A1, A2, A3, etc.), spreading
                          ownership evenly. More vnodes = better balance.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-blue-400">Server A (3 vnodes)</span><span>~33%</span>
                          </div>
                          <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: '33%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-green-400">Server B (3 vnodes)</span><span>~33%</span>
                          </div>
                          <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '33%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-purple-400">Server C (3 vnodes)</span><span>~34%</span>
                          </div>
                          <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: '34%' }} />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-quest-bg rounded-lg p-4 mb-6">
              <p className="text-sm text-quest-muted">
                <strong>How it works:</strong> Instead of hashing <code>"ServerA"</code> once, we hash
                <code> "ServerA-1"</code>, <code>"ServerA-2"</code>, <code>"ServerA-3"</code>, etc.
                Each virtual node maps back to the same physical server but occupies a different
                position on the ring.
              </p>
            </div>

            <DeepDive id="how-many-vnodes" title="How Many Virtual Nodes?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                The more virtual nodes per physical server, the more even the distribution. But there
                is a tradeoff: more vnodes means more memory for the ring lookup table and slightly
                slower node addition/removal.
              </p>
              <div className="bg-quest-bg rounded p-3 mb-3">
                <p className="text-xs font-mono text-quest-muted">
                  Amazon DynamoDB: ~256 virtual nodes per physical node<br />
                  Apache Cassandra: configurable (default 256, tunable per node)<br />
                  Memcached (ketama): ~100-200 virtual nodes
                </p>
              </div>
              <p className="text-sm text-quest-muted">
                In practice, 100-256 vnodes per server provides excellent balance. Some systems
                allow heterogeneous weighting -- a more powerful server can have more vnodes to
                receive a proportionally larger share of data.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Operations
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: OPERATIONS */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="text-quest-warning" />
              Node Operations &{' '}
              <Term
                word="Rebalancing"
                definition="The process of redistributing data across nodes when the cluster topology changes. Consistent hashing minimizes the amount of data that needs to move."
                onLearn={learnTerm}
              />
            </h2>

            <p className="text-quest-muted mb-6">
              The real power of consistent hashing shows during{' '}
              <Term
                word="Data Distribution"
                definition="How data is spread across multiple servers in a distributed system. Good distribution means each server handles a roughly equal share."
                onLearn={learnTerm}
              />{' '}
              changes. Let's see what happens when servers join or leave the ring.
            </p>

            {/* Interactive operations */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
                <button
                  onClick={() => setRingOperation('stable')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                    ${ringOperation === 'stable' ? 'bg-quest-primary/20 text-quest-primary ring-2 ring-quest-primary/50' : 'bg-quest-bg text-quest-muted hover:text-quest-text'}`}
                >
                  <Server size={14} /> Stable (3 nodes)
                </button>
                <button
                  onClick={() => setRingOperation('add')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                    ${ringOperation === 'add' ? 'bg-quest-success/20 text-quest-success ring-2 ring-quest-success/50' : 'bg-quest-bg text-quest-muted hover:text-quest-text'}`}
                >
                  <Plus size={14} /> Add Server D
                </button>
                <button
                  onClick={() => setRingOperation('remove')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                    ${ringOperation === 'remove' ? 'bg-quest-danger/20 text-quest-danger ring-2 ring-quest-danger/50' : 'bg-quest-bg text-quest-muted hover:text-quest-text'}`}
                >
                  <Minus size={14} /> Remove Server B
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                <HashRing
                  servers={operationServers()}
                  dataKeys={operationKeys()}
                  size={260}
                />

                <div className="flex-1">
                  {ringOperation === 'stable' && (
                    <div className="bg-quest-bg rounded-lg p-4">
                      <p className="text-sm text-quest-muted">
                        Three servers evenly split 6 keys. Each server owns 2 keys.
                        The system is balanced and stable.
                      </p>
                    </div>
                  )}
                  {ringOperation === 'add' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <div className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-4">
                        <p className="text-sm font-semibold text-quest-success mb-1">Server D joins at position 60</p>
                        <p className="text-xs text-quest-muted">
                          Only <strong>k2</strong> (at position 50) needs to move from Server A to Server D.
                          It now falls in D's range (0-60). All other keys stay exactly where they are.
                        </p>
                      </div>
                      <div className="bg-quest-bg rounded-lg p-3">
                        <p className="text-xs text-quest-muted">
                          <strong>Result:</strong> 1 out of 6 keys moved (17%). With mod hashing,
                          4-5 out of 6 would have moved (~75%).
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {ringOperation === 'remove' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                      <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4">
                        <p className="text-sm font-semibold text-quest-danger mb-1">Server B removed</p>
                        <p className="text-xs text-quest-muted">
                          Server B's keys (<strong>k3, k4</strong>) flow clockwise to the next server
                          (Server C). All keys belonging to A and C stay untouched.
                        </p>
                      </div>
                      <div className="bg-quest-bg rounded-lg p-3">
                        <p className="text-xs text-quest-muted">
                          <strong>Result:</strong> 2 out of 6 keys moved (33%, exactly 1/N).
                          Only the failed server's data redistributes.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Comparison table */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Traditional vs Consistent Hashing</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">Aspect</th>
                      <th className="text-center py-2 px-3 text-quest-danger">hash(key) % N</th>
                      <th className="text-center py-2 px-3 text-quest-success">Consistent Hashing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { aspect: 'Add 1 server (N=3 to 4)', traditional: '~75% keys move', consistent: '~25% keys move' },
                      { aspect: 'Remove 1 server', traditional: '~67-75% keys move', consistent: '~33% keys move' },
                      { aspect: 'General formula', traditional: '(N-1)/N keys move', consistent: '1/N keys move' },
                      { aspect: 'Lookup complexity', traditional: 'O(1)', consistent: 'O(log N)' },
                      { aspect: 'Implementation', traditional: 'Trivial', consistent: 'Moderate' },
                      { aspect: 'Distribution evenness', traditional: 'Even (with good hash)', consistent: 'Needs vnodes for evenness' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 px-3 text-quest-muted">{row.aspect}</td>
                        <td className="text-center py-2 px-3 text-quest-danger">{row.traditional}</td>
                        <td className="text-center py-2 px-3 text-quest-success">{row.consistent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Real-world usage */}
            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Database className="text-quest-primary" />
                Real-World Usage
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: 'Apache Cassandra', desc: 'Distributes data across cluster nodes' },
                  { name: 'Amazon DynamoDB', desc: 'Partitions data across storage nodes' },
                  { name: 'Memcached', desc: 'Distributes cache keys across servers (ketama algorithm)' },
                  { name: 'CDNs (Akamai, CloudFlare)', desc: 'Routes requests to nearest/best edge server' },
                  { name: 'Discord', desc: 'Routes messages and guilds across server clusters' },
                  { name: 'Apache Kafka', desc: 'Consumer group partition assignment' },
                ].map((item) => (
                  <div key={item.name} className="flex items-start gap-2 p-2 rounded bg-quest-surface/50">
                    <Server size={14} className="text-quest-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-quest-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros/Cons */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">Pros</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>* Minimal data movement on topology changes</li>
                  <li>* Scales smoothly -- add/remove nodes gracefully</li>
                  <li>* Virtual nodes ensure even distribution</li>
                  <li>* No central directory needed</li>
                  <li>* Battle-tested at massive scale</li>
                </ul>
              </div>
              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">Cons</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>* More complex than simple mod hashing</li>
                  <li>* Requires vnodes for good balance</li>
                  <li>* Lookup is O(log N) vs O(1)</li>
                  <li>* Ring metadata must be shared across nodes</li>
                  <li>* Hot spots still possible without tuning</li>
                </ul>
              </div>
            </div>

            <DeepDive id="consistent-hashing-at-scale" title="Consistent Hashing at Scale" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Discord:</strong> Uses consistent hashing to route guilds (servers) to backend
                processes. When they scale up by adding processes, only a fraction of guilds need to
                migrate, avoiding mass disconnections.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Amazon DynamoDB:</strong> Uses consistent hashing with virtual nodes for
                partition placement. Their 2007 Dynamo paper popularized the technique, using 256
                vnodes per physical node for even distribution across heterogeneous hardware.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Evolution:</strong> Google's "jump consistent hash" (2014) and "multi-probe
                consistent hashing" offer alternatives with better memory efficiency, but the ring
                approach remains the most widely deployed.
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
              Consistent hashing is a fundamental building block of distributed systems.
              Let's see if you've mastered the ring!
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
                <h3 className="text-xl font-bold mb-2">Level 9 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand consistent hashing -- the technique that keeps distributed
                  systems running smoothly when nodes come and go. From cache clusters to databases
                  to CDNs, the hash ring is everywhere.
                </p>
                <p className="text-sm text-quest-primary">
                  Next time someone adds a server and the cache doesn't explode, you'll know why.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

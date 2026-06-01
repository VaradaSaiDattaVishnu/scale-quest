import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Database, CheckCircle, HelpCircle,
  ChevronDown, ChevronUp, Copy, Server, RefreshCw,
  AlertTriangle, Clock, Shield, Zap
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

export default function Level7({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [failoverStep, setFailoverStep] = useState(0)
  const [replicationMode, setReplicationMode] = useState('async')
  const [writeInFlight, setWriteInFlight] = useState(false)
  const [writePhase, setWritePhase] = useState(0)

  const sections = ['intro', 'master-slave', 'master-master', 'sync-vs-async', 'quiz']

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary purpose of database replication?',
      options: [
        { id: 'a', text: 'To make the database schema more flexible', correct: false },
        { id: 'b', text: 'To provide fault tolerance and improve read performance by maintaining multiple copies of data', correct: true },
        { id: 'c', text: 'To compress data and save storage space', correct: false },
        { id: 'd', text: 'To encrypt data for security compliance', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'In master-slave replication, what happens when the master fails?',
      options: [
        { id: 'a', text: 'All data is permanently lost', correct: false },
        { id: 'b', text: 'The system switches to read-only mode forever', correct: false },
        { id: 'c', text: 'A slave is promoted to become the new master through a failover process', correct: true },
        { id: 'd', text: 'All slaves automatically become masters', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What is replication lag?',
      options: [
        { id: 'a', text: 'The time it takes for a query to execute on the master', correct: false },
        { id: 'b', text: 'The delay between when data is written to the master and when it appears on replicas', correct: true },
        { id: 'c', text: 'The overhead of maintaining multiple database connections', correct: false },
        { id: 'd', text: 'The slowdown caused by too many read replicas', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'When would you choose synchronous over asynchronous replication?',
      options: [
        { id: 'a', text: 'When you need the fastest possible write speeds', correct: false },
        { id: 'b', text: 'When you have replicas spread across many continents', correct: false },
        { id: 'c', text: 'When data consistency is critical and you can tolerate higher write latency', correct: true },
        { id: 'd', text: 'When you want to minimize network traffic', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const runFailoverDemo = () => {
    setFailoverStep(1)
    setTimeout(() => setFailoverStep(2), 1200)
    setTimeout(() => setFailoverStep(3), 2400)
    setTimeout(() => setFailoverStep(4), 3600)
  }

  const runWriteDemo = () => {
    if (writeInFlight) return
    setWriteInFlight(true)
    setWritePhase(1)
    if (replicationMode === 'sync') {
      setTimeout(() => setWritePhase(2), 800)
      setTimeout(() => setWritePhase(3), 1800)
      setTimeout(() => setWritePhase(4), 2600)
      setTimeout(() => { setWriteInFlight(false); setWritePhase(0) }, 4000)
    } else {
      setTimeout(() => setWritePhase(2), 800)
      setTimeout(() => setWritePhase(4), 1200)
      setTimeout(() => setWritePhase(3), 2200)
      setTimeout(() => { setWriteInFlight(false); setWritePhase(0) }, 3600)
    }
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
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
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
              <Copy className="text-teal-400" />
              Copy That: Database Replication
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Your master database just died. Users lost all their data. Never again."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              One copy of your data is a liability. If that single database server crashes, gets
              corrupted, or the disk fails, everything is gone. <strong>Replication</strong> is the
              practice of keeping copies of your data on multiple machines so that your system
              can survive failures and serve more users.
            </p>

            {/* Visual: Single DB failure vs replicated */}
            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-quest-surface rounded-xl p-6 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-4 flex items-center gap-2">
                  <AlertTriangle size={18} />
                  Single Database
                </h4>
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative"
                  >
                    <Database size={48} className="text-quest-danger" />
                    <span className="absolute -top-1 -right-1 text-quest-danger font-bold text-lg">X</span>
                  </motion.div>
                  <p className="text-sm text-quest-muted text-center">
                    Server fails. Data gone. Users angry. Company in trouble.
                  </p>
                </div>
              </div>

              <div className="bg-quest-surface rounded-xl p-6 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-4 flex items-center gap-2">
                  <Shield size={18} />
                  Replicated Databases
                </h4>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-4">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                      >
                        <Database size={36} className="text-quest-success" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm text-quest-muted text-center">
                    One fails? Others keep serving. No data loss. Users happy.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-quest-muted mb-4">
              <Term
                word="Read Replicas"
                definition="Copies of the primary database that handle read queries (SELECT). They reduce load on the master and can be placed closer to users geographically."
                onLearn={learnTerm}
              />{' '}
              are one of the most common replication patterns. By directing read traffic to
              copies, you free up the primary database to handle writes.
            </p>

            {/* Benefits overview */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Why Replicate?</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-quest-bg rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={20} className="text-quest-success" />
                    <p className="font-medium">Fault Tolerance</p>
                  </div>
                  <p className="text-xs text-quest-muted">
                    If one server dies, others have the data. Your system stays online.
                  </p>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={20} className="text-quest-warning" />
                    <p className="font-medium">Read Scaling</p>
                  </div>
                  <p className="text-xs text-quest-muted">
                    Spread read queries across replicas. Handle 10x more reads without upgrading hardware.
                  </p>
                </div>
                <div className="bg-quest-bg rounded p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Server size={20} className="text-quest-primary" />
                    <p className="font-medium">Geographic Distribution</p>
                  </div>
                  <p className="text-xs text-quest-muted">
                    Place replicas near users. A user in Tokyo reads from a Tokyo replica, not a US server.
                  </p>
                </div>
              </div>
            </div>

            <DeepDive id="cost-of-data-loss" title="The Cost of Data Loss" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>GitLab (2017):</strong> An engineer accidentally deleted a production database.
                Their backup systems had multiple failures. They lost 6 hours of data and had a
                public livestream of the recovery. They survived because they had at least partial replicas.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Ma.gnolia (2009):</strong> A social bookmarking site lost ALL user data
                permanently. No replicas, corrupted backups. The service shut down forever.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Amazon (estimated):</strong> Every minute of downtime costs Amazon roughly
                $220,000 in lost sales. Replication is not optional at scale - it is survival.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Master-Slave Replication
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: MASTER-SLAVE */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="text-teal-400" />
              <Term
                word="Master-Slave"
                definition="Also called Primary-Replica replication. One database (master/primary) handles all writes. It replicates changes to one or more read-only copies (slaves/replicas)."
                onLearn={learnTerm}
              />{' '}
              Replication
            </h2>

            <p className="text-quest-muted mb-6">
              The most common replication pattern. One node is the <strong>master</strong> (or primary) -
              it accepts all writes. The master then sends those changes to one or more{' '}
              <strong>slaves</strong> (or replicas) which serve read queries.
            </p>

            {/* Animated master-slave visual */}
            <div className="bg-quest-bg rounded-xl p-8 mb-6">
              <h3 className="font-semibold mb-6 text-center">Write Flow: Master to Slaves</h3>

              <div className="flex flex-col items-center gap-6">
                {/* Write arrives */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-quest-primary/20 border border-quest-primary/40 rounded-lg px-4 py-2 text-sm"
                >
                  INSERT INTO users (name) VALUES ('Alice')
                </motion.div>

                <ArrowRight size={20} className="text-quest-primary rotate-90" />

                {/* Master */}
                <div className="bg-quest-surface rounded-xl p-4 border-2 border-quest-primary flex items-center gap-3">
                  <Database size={32} className="text-quest-primary" />
                  <div>
                    <p className="font-semibold">Master</p>
                    <p className="text-xs text-quest-muted">Handles all writes</p>
                  </div>
                </div>

                {/* Replication arrows */}
                <div className="flex items-center gap-2 text-quest-muted">
                  <RefreshCw size={16} className="animate-spin" style={{ animationDuration: '3s' }} />
                  <span className="text-xs">Replicating changes...</span>
                </div>

                {/* Slaves */}
                <div className="flex gap-6">
                  {['Slave 1', 'Slave 2', 'Slave 3'].map((name, i) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="bg-quest-surface rounded-xl p-4 border border-quest-secondary/40 flex flex-col items-center gap-2"
                    >
                      <Database size={24} className="text-quest-secondary" />
                      <p className="text-sm font-medium">{name}</p>
                      <p className="text-xs text-quest-muted">Reads only</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* How it works */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">How It Works</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Application sends a WRITE (INSERT, UPDATE, DELETE) to the master.' },
                  { step: '2', text: 'Master writes the change to its local storage and its write-ahead log.' },
                  { step: '3', text: 'Master sends the log entries to all connected slaves.' },
                  { step: '4', text: 'Slaves apply the changes to their own copies of the data.' },
                  { step: '5', text: 'READ queries are distributed across slaves, reducing master load.' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-quest-primary/20 flex items-center justify-center text-xs font-bold text-quest-primary shrink-0">
                      {item.step}
                    </span>
                    <p className="text-sm text-quest-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Failover simulation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2">Failover Simulation</h3>
              <p className="text-sm text-quest-muted mb-4">
                What happens when the master dies? Click below to see the failover process.
              </p>

              <div className="flex flex-col items-center gap-4 mb-4">
                <div className="flex gap-8 items-end">
                  {/* Master */}
                  <motion.div
                    className={`rounded-xl p-4 border-2 flex flex-col items-center gap-2 transition-all duration-500
                      ${failoverStep >= 1
                        ? 'bg-quest-danger/10 border-quest-danger opacity-50'
                        : 'bg-quest-surface border-quest-primary'
                      }`}
                  >
                    <Database size={28} className={failoverStep >= 1 ? 'text-quest-danger' : 'text-quest-primary'} />
                    <p className="text-sm font-medium">Master</p>
                    {failoverStep >= 1 && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-quest-danger font-bold"
                      >
                        FAILED
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Slaves */}
                  {['Slave 1', 'Slave 2'].map((name, i) => (
                    <motion.div
                      key={name}
                      className={`rounded-xl p-4 border-2 flex flex-col items-center gap-2 transition-all duration-500
                        ${failoverStep >= 3 && i === 0
                          ? 'bg-quest-success/10 border-quest-success'
                          : failoverStep >= 2
                            ? 'bg-quest-warning/10 border-quest-warning'
                            : 'bg-quest-surface border-quest-secondary/40'
                        }`}
                    >
                      <Database
                        size={28}
                        className={
                          failoverStep >= 3 && i === 0
                            ? 'text-quest-success'
                            : failoverStep >= 2
                              ? 'text-quest-warning'
                              : 'text-quest-secondary'
                        }
                      />
                      <p className="text-sm font-medium">
                        {failoverStep >= 4 && i === 0 ? 'New Master' : name}
                      </p>
                      {failoverStep >= 2 && failoverStep < 4 && i === 0 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-quest-warning"
                        >
                          Electing...
                        </motion.span>
                      )}
                      {failoverStep >= 4 && i === 0 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-quest-success font-bold"
                        >
                          PROMOTED
                        </motion.span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Status messages */}
                <div className="h-8 flex items-center">
                  {failoverStep === 0 && <p className="text-sm text-quest-muted">System healthy. Click to simulate failure.</p>}
                  {failoverStep === 1 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-danger">Master has failed! Detecting failure...</motion.p>}
                  {failoverStep === 2 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-warning">Failure detected. Starting leader election...</motion.p>}
                  {failoverStep === 3 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-warning">Slave 1 elected as new master. Promoting...</motion.p>}
                  {failoverStep === 4 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-quest-success">Failover complete! Slave 1 is now the master. System recovered.</motion.p>}
                </div>
              </div>

              <button
                onClick={() => { setFailoverStep(0); setTimeout(runFailoverDemo, 100) }}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <AlertTriangle size={16} />
                {failoverStep === 0 ? 'Simulate Master Failure' : 'Restart Simulation'}
              </button>
            </div>

            <DeepDive id="leader-election" title="Leader Election: Choosing a New Master" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                When a master fails, the remaining nodes need to agree on a new master. This is one
                of the hardest problems in distributed systems - consensus.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Raft:</strong> A popular consensus algorithm. Nodes vote for a new leader.
                A candidate needs a majority to win. Used by etcd, CockroachDB, and many modern systems.
                It is designed to be understandable (unlike its predecessor).
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Paxos:</strong> The original consensus algorithm by Leslie Lamport. Provably
                correct but notoriously difficult to understand and implement. Google uses it internally
                in Chubby and Spanner.
              </p>
              <p className="text-sm text-quest-muted">
                In practice, many systems (MySQL, PostgreSQL) rely on external tools like ZooKeeper
                or etcd for leader election rather than implementing consensus themselves.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Master-Master
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: MASTER-MASTER */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <RefreshCw className="text-teal-400" />
              <Term
                word="Master-Master"
                definition="Also called Multi-Primary replication. Multiple nodes can accept writes simultaneously and sync changes between each other. Offers high write availability but introduces conflict resolution challenges."
                onLearn={learnTerm}
              />{' '}
              Replication
            </h2>

            <p className="text-quest-muted mb-6">
              What if you need to write to multiple locations at once? In master-master (multi-primary)
              replication, <strong>every node can accept writes</strong>. They sync changes with each
              other bidirectionally.
            </p>

            {/* Visual: Multi-master */}
            <div className="bg-quest-bg rounded-xl p-8 mb-6">
              <h3 className="font-semibold mb-6 text-center">Multi-Primary: Both Accept Writes</h3>

              <div className="flex justify-center items-center gap-8">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-quest-surface rounded-xl p-5 border-2 border-quest-primary flex flex-col items-center gap-2"
                >
                  <Database size={32} className="text-quest-primary" />
                  <p className="font-semibold">Master A</p>
                  <p className="text-xs text-quest-muted">Region: US-East</p>
                  <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-1 rounded">Reads + Writes</span>
                </motion.div>

                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} className="text-quest-secondary" />
                  </motion.div>
                  <span className="text-xs text-quest-muted">Sync</span>
                  <motion.div
                    animate={{ x: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <ArrowRight size={20} className="text-quest-secondary rotate-180" />
                  </motion.div>
                </div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="bg-quest-surface rounded-xl p-5 border-2 border-quest-primary flex flex-col items-center gap-2"
                >
                  <Database size={32} className="text-quest-primary" />
                  <p className="font-semibold">Master B</p>
                  <p className="text-xs text-quest-muted">Region: EU-West</p>
                  <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-1 rounded">Reads + Writes</span>
                </motion.div>
              </div>
            </div>

            {/* Conflict problem */}
            <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2 text-quest-warning">
                <AlertTriangle size={20} />
                The Conflict Problem
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                What if two users update the same row on different masters at the same time?
              </p>
              <div className="bg-quest-bg rounded-lg p-4 font-mono text-xs space-y-2">
                <p className="text-quest-primary">-- Master A (US user, 12:00:00.001 UTC)</p>
                <p>UPDATE products SET price = 29.99 WHERE id = 42;</p>
                <p className="text-quest-secondary mt-2">-- Master B (EU user, 12:00:00.003 UTC)</p>
                <p>UPDATE products SET price = 24.99 WHERE id = 42;</p>
                <p className="text-quest-warning mt-2">-- Which price wins? 29.99 or 24.99?</p>
              </div>
            </div>

            {/* Comparison card */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-surface rounded-xl p-6 border border-quest-secondary/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Database size={18} className="text-quest-secondary" />
                  Master-Slave
                </h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-quest-success mt-0.5 shrink-0" />
                    Simple - no write conflicts possible
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-quest-success mt-0.5 shrink-0" />
                    Easy to reason about data flow
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-quest-warning mt-0.5 shrink-0" />
                    Single point of failure for writes
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-quest-warning mt-0.5 shrink-0" />
                    Failover requires election process
                  </li>
                </ul>
              </div>

              <div className="bg-quest-surface rounded-xl p-6 border border-quest-primary/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <RefreshCw size={18} className="text-quest-primary" />
                  Master-Master
                </h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-quest-success mt-0.5 shrink-0" />
                    No single point of failure for writes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle size={14} className="text-quest-success mt-0.5 shrink-0" />
                    Lower write latency for distributed users
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-quest-danger mt-0.5 shrink-0" />
                    Write conflicts require resolution strategy
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-quest-danger mt-0.5 shrink-0" />
                    More complex to operate and debug
                  </li>
                </ul>
              </div>
            </div>

            {/* When to use */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">When to Use Master-Master</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-quest-primary font-bold">1.</span>
                  <div>
                    <p className="font-medium">Multi-Region Deployments</p>
                    <p className="text-sm text-quest-muted">
                      Users in the US write to a US master, users in Europe write to an EU master.
                      Both stay in sync. Latency stays low for everyone.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-quest-primary font-bold">2.</span>
                  <div>
                    <p className="font-medium">High Write Availability</p>
                    <p className="text-sm text-quest-muted">
                      If one master goes down, the other immediately takes over writes with zero
                      downtime. No election process needed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-quest-primary font-bold">3.</span>
                  <div>
                    <p className="font-medium">Collaborative Applications</p>
                    <p className="text-sm text-quest-muted">
                      Applications like Google Docs where multiple users edit simultaneously
                      benefit from multi-primary approaches with CRDT-based conflict resolution.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="conflict-resolution" title="Conflict Resolution Strategies" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Last-Write-Wins (LWW):</strong> The most recent write (by timestamp) wins.
                Simple but can lose data. Used by Cassandra. Requires synchronized clocks, which
                is surprisingly hard in distributed systems.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Merge Functions:</strong> Application-defined logic to merge conflicting
                writes. For example, if both updates add items to a shopping cart, merge them
                together. More complex but preserves intent.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>CRDTs (Conflict-free Replicated Data Types):</strong> Special data structures
                mathematically guaranteed to converge. Counters, sets, and registers that can be
                updated independently and always merge correctly. Used by Redis, Riak, and
                collaborative editors.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Operational Transform (OT):</strong> Used by Google Docs. Transforms
                concurrent operations so they can be applied in any order and produce the same result.
                Complex to implement correctly.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Sync vs Async
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SYNC VS ASYNC */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-teal-400" />
              Synchronous vs Asynchronous Replication
            </h2>

            <p className="text-quest-muted mb-6">
              When the master sends data to replicas, should it <em>wait</em> for them to confirm
              before telling the client "write successful"? This is the fundamental question that
              separates{' '}
              <Term
                word="Synchronous Replication"
                definition="The master waits for ALL replicas to acknowledge the write before confirming success to the client. Guarantees consistency but increases write latency."
                onLearn={learnTerm}
              />{' '}
              from{' '}
              <Term
                word="Async Replication"
                definition="The master confirms the write to the client immediately after writing locally. Replicas are updated in the background. Faster writes but replicas may serve stale data."
                onLearn={learnTerm}
              />.
            </p>

            {/* Interactive toggle */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex justify-center mb-6">
                <div className="bg-quest-surface rounded-lg p-1 flex">
                  <button
                    onClick={() => { setReplicationMode('sync'); setWritePhase(0); setWriteInFlight(false) }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${replicationMode === 'sync'
                        ? 'bg-quest-primary text-quest-bg'
                        : 'text-quest-muted hover:text-quest-text'
                      }`}
                  >
                    <Shield size={14} className="inline mr-1" />
                    Synchronous
                  </button>
                  <button
                    onClick={() => { setReplicationMode('async'); setWritePhase(0); setWriteInFlight(false) }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                      ${replicationMode === 'async'
                        ? 'bg-quest-secondary text-quest-bg'
                        : 'text-quest-muted hover:text-quest-text'
                      }`}
                  >
                    <Zap size={14} className="inline mr-1" />
                    Asynchronous
                  </button>
                </div>
              </div>

              {/* Write flow visualization */}
              <div className="space-y-4">
                {/* Step 1: Client sends write */}
                <div className="flex items-center gap-4">
                  <div className={`w-28 text-right text-xs font-medium shrink-0
                    ${writePhase >= 1 ? 'text-quest-primary' : 'text-quest-muted'}`}>
                    1. Client Write
                  </div>
                  <div className={`flex-1 h-8 rounded-lg flex items-center px-3 text-xs transition-all duration-500
                    ${writePhase >= 1 ? 'bg-quest-primary/20 border border-quest-primary/40' : 'bg-quest-surface border border-white/10'}`}>
                    {writePhase >= 1 && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        INSERT INTO orders (...) VALUES (...)
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Step 2: Master writes locally */}
                <div className="flex items-center gap-4">
                  <div className={`w-28 text-right text-xs font-medium shrink-0
                    ${writePhase >= 2 ? 'text-quest-primary' : 'text-quest-muted'}`}>
                    2. Master Writes
                  </div>
                  <div className={`flex-1 h-8 rounded-lg flex items-center px-3 text-xs transition-all duration-500
                    ${writePhase >= 2 ? 'bg-quest-success/20 border border-quest-success/40' : 'bg-quest-surface border border-white/10'}`}>
                    {writePhase >= 2 && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-quest-success" /> Written to master disk
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Step 3: Replicas acknowledge */}
                <div className="flex items-center gap-4">
                  <div className={`w-28 text-right text-xs font-medium shrink-0
                    ${writePhase >= 3 ? 'text-quest-secondary' : 'text-quest-muted'}`}>
                    3. Replicas Sync
                  </div>
                  <div className={`flex-1 h-8 rounded-lg flex items-center px-3 text-xs transition-all duration-500
                    ${writePhase >= 3 ? 'bg-quest-secondary/20 border border-quest-secondary/40' : 'bg-quest-surface border border-white/10'}`}>
                    {writePhase >= 3 && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-quest-secondary" />
                        {replicationMode === 'sync'
                          ? 'All replicas confirmed write'
                          : 'Replicas updating in background...'}
                      </motion.span>
                    )}
                  </div>
                </div>

                {/* Step 4: Client gets response */}
                <div className="flex items-center gap-4">
                  <div className={`w-28 text-right text-xs font-medium shrink-0
                    ${writePhase >= 4 ? 'text-quest-success' : 'text-quest-muted'}`}>
                    4. Client ACK
                  </div>
                  <div className={`flex-1 h-8 rounded-lg flex items-center px-3 text-xs transition-all duration-500
                    ${writePhase >= 4 ? 'bg-quest-success/20 border border-quest-success/40' : 'bg-quest-surface border border-white/10'}`}>
                    {writePhase >= 4 && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                        <CheckCircle size={12} className="text-quest-success" /> "Write successful!"
                        {replicationMode === 'async' && (
                          <span className="text-quest-warning ml-2">(replicas may still be syncing)</span>
                        )}
                      </motion.span>
                    )}
                  </div>
                </div>
              </div>

              {/* Timing indicator */}
              <div className="mt-4 text-center">
                <p className="text-xs text-quest-muted mb-3">
                  {replicationMode === 'sync'
                    ? 'Order: Write -> Master saves -> Replicas confirm -> Client notified'
                    : 'Order: Write -> Master saves -> Client notified -> Replicas sync later'}
                </p>
                <button
                  onClick={runWriteDemo}
                  disabled={writeInFlight}
                  className="btn-primary px-6 disabled:opacity-50"
                >
                  {writeInFlight ? 'Processing...' : 'Simulate Write'}
                </button>
              </div>
            </div>

            {/* Replication Lag */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock size={20} className="text-quest-warning" />
                <Term
                  word="Replication Lag"
                  definition="The delay between when data is written to the master and when it appears on replicas. Can range from milliseconds to seconds (or more during high load). Only relevant in async replication."
                  onLearn={learnTerm}
                />
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                In async replication, there is always a delay between the master write and replica update.
                This means a user who just wrote data might read stale data from a replica. This is called
                a "read-after-write" consistency problem.
              </p>
              <div className="bg-quest-bg rounded-lg p-4 font-mono text-xs space-y-1">
                <p className="text-quest-primary">-- User writes to master (12:00:00.000)</p>
                <p>INSERT INTO posts (title) VALUES ('Hello World');</p>
                <p className="text-quest-secondary mt-2">-- User reads from replica (12:00:00.050)</p>
                <p>SELECT * FROM posts WHERE title = 'Hello World';</p>
                <p className="text-quest-warning">-- Result: 0 rows (replica hasn't caught up yet!)</p>
                <p className="text-quest-muted mt-2">-- Replica catches up (12:00:00.200)</p>
                <p className="text-quest-success">-- Now the read would return the post</p>
              </div>
            </div>

            {/* Pros/Cons grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-surface rounded-xl p-6 border border-quest-primary/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield size={18} className="text-quest-primary" />
                  Synchronous
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-quest-success mb-2">Advantages</p>
                    <ul className="space-y-1 text-sm text-quest-muted">
                      <li>+ Strong consistency - no stale reads</li>
                      <li>+ Zero data loss on master failure</li>
                      <li>+ Simpler application logic</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-quest-danger mb-2">Disadvantages</p>
                    <ul className="space-y-1 text-sm text-quest-muted">
                      <li>- Higher write latency (wait for all replicas)</li>
                      <li>- One slow replica slows ALL writes</li>
                      <li>- Not practical across distant regions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-quest-surface rounded-xl p-6 border border-quest-secondary/30">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-quest-secondary" />
                  Asynchronous
                </h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-quest-success mb-2">Advantages</p>
                    <ul className="space-y-1 text-sm text-quest-muted">
                      <li>+ Fast writes (no waiting for replicas)</li>
                      <li>+ Works across geographic regions</li>
                      <li>+ One slow replica doesn't affect writes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-quest-danger mb-2">Disadvantages</p>
                    <ul className="space-y-1 text-sm text-quest-muted">
                      <li>- Stale reads possible (replication lag)</li>
                      <li>- Data loss risk if master fails before replication</li>
                      <li>- Application must handle inconsistency</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="semi-sync" title="Semi-Synchronous Replication: The Best of Both?" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Semi-synchronous replication</strong> is a hybrid approach. The master waits
                for at least <em>one</em> replica to confirm the write, but not all of them. This
                gives you a balance: you know at least two copies exist (master + one replica),
                but you don't pay the latency cost of waiting for every replica.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>MySQL Semi-Sync:</strong> MySQL's implementation waits for one slave to
                acknowledge before confirming the write. If the acknowledging slave is slow, it
                can fall back to async mode temporarily. Configurable via
                rpl_semi_sync_master_wait_for_slave_count.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>PostgreSQL:</strong> Uses synchronous_standby_names to configure which
                standbys must confirm writes. You can require ANY 1, ANY 2, or specific named
                standbys. The synchronous_commit setting offers even finer control with options
                like remote_apply vs remote_write.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>In practice:</strong> Most production systems use semi-synchronous or async
                replication. Fully synchronous is rare outside of same-datacenter deployments where
                latency between nodes is under 1ms.
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
              Replication keeps your data alive when things go wrong. Let's make sure you
              understand the tradeoffs!
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
                <h3 className="text-xl font-bold mb-2">Level 7 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand database replication - the strategies, tradeoffs, and
                  failure modes. Your data will never have a single point of failure again!
                </p>
                <p className="text-sm text-quest-primary">
                  Continue your journey to learn about partitioning, sharding, and distributed consensus!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

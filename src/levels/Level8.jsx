import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Triangle, Shield, Wifi, WifiOff, Database, Server,
  AlertTriangle, Scale, Zap
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

export default function Level8({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [capSelection, setCapSelection] = useState([])
  const [scenarioAnswers, setScenarioAnswers] = useState({})
  const [partitionAnimStep, setPartitionAnimStep] = useState(0)

  const sections = ['intro', 'cap', 'tradeoffs', 'pacelc', 'quiz']

  const capSystems = {
    'CP': {
      label: 'CP Systems',
      desc: 'Choose Consistency over Availability during partitions',
      systems: ['MongoDB', 'HBase', 'Redis'],
      color: 'quest-primary',
      icon: <Shield size={20} />
    },
    'AP': {
      label: 'AP Systems',
      desc: 'Choose Availability over Consistency during partitions',
      systems: ['Cassandra', 'DynamoDB', 'CouchDB'],
      color: 'quest-secondary',
      icon: <Wifi size={20} />
    },
    'CA': {
      label: 'CA Systems',
      desc: 'Only possible without network partitions (single node)',
      systems: ['Traditional RDBMS (single node)'],
      color: 'quest-warning',
      icon: <Database size={20} />
    }
  }

  const toggleCapSelection = (property) => {
    setCapSelection(prev => {
      if (prev.includes(property)) {
        return prev.filter(p => p !== property)
      }
      if (prev.length >= 2) {
        return [prev[1], property]
      }
      return [...prev, property]
    })
  }

  const getCapCombo = () => {
    if (capSelection.length !== 2) return null
    const sorted = [...capSelection].sort().join('')
    if (sorted === 'AP') return 'AP'
    if (sorted === 'CP') return 'CP'
    if (sorted === 'AC') return 'CA'
    return null
  }

  const paceclTable = [
    { system: 'MongoDB', partition: 'PC (Consistency)', normal: 'EC (Consistency)', type: 'PC/EC' },
    { system: 'Cassandra', partition: 'PA (Availability)', normal: 'EL (Latency)', type: 'PA/EL' },
    { system: 'DynamoDB', partition: 'PA (Availability)', normal: 'EL (Latency)', type: 'PA/EL' },
    { system: 'HBase', partition: 'PC (Consistency)', normal: 'EC (Consistency)', type: 'PC/EC' },
    { system: 'CouchDB', partition: 'PA (Availability)', normal: 'EL (Latency)', type: 'PA/EL' },
    { system: 'MySQL (cluster)', partition: 'PC (Consistency)', normal: 'EC (Consistency)', type: 'PC/EC' },
    { system: 'Cosmos DB', partition: 'PA (Availability)', normal: 'EL (Latency)', type: 'PA/EL' },
  ]

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does the CAP theorem state?',
      options: [
        { id: 'a', text: 'Distributed systems can guarantee all three: Consistency, Availability, and Partition Tolerance', correct: false },
        { id: 'b', text: 'In a distributed system, you can only guarantee two of three properties: Consistency, Availability, and Partition Tolerance', correct: true },
        { id: 'c', text: 'Consistency always trumps availability in distributed systems', correct: false },
        { id: 'd', text: 'Partition tolerance is optional if you have good network hardware', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'Why is partition tolerance usually non-negotiable?',
      options: [
        { id: 'a', text: 'Because it makes systems faster', correct: false },
        { id: 'b', text: 'Because regulators require it', correct: false },
        { id: 'c', text: 'Network partitions are inevitable in distributed systems, so you must always account for them', correct: true },
        { id: 'd', text: 'Because users prefer partition-tolerant systems', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'An AP system during a network partition will...',
      options: [
        { id: 'a', text: 'Shut down entirely to prevent data corruption', correct: false },
        { id: 'b', text: 'Continue serving requests but may return stale or inconsistent data', correct: true },
        { id: 'c', text: 'Automatically resolve the partition and maintain consistency', correct: false },
        { id: 'd', text: 'Queue all requests until the partition heals', correct: false },
      ]
    },
    {
      id: 'q4',
      question: 'What does PACELC add to CAP theorem?',
      options: [
        { id: 'a', text: 'It adds security considerations to the tradeoff', correct: false },
        { id: 'b', text: 'It addresses the latency vs consistency tradeoff that exists even when there is no partition', correct: true },
        { id: 'c', text: 'It proves that CAP theorem is wrong', correct: false },
        { id: 'd', text: 'It introduces a fourth property: Efficiency', correct: false },
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
              <AlertTriangle className="text-quest-warning" />
              Promises & Compromises
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "A network partition just happened. Your system must choose:
                consistency or availability? You can't have both. This is the fundamental
                tradeoff every distributed system must face."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              When you run a system on multiple servers, those servers need to communicate.
              But networks are unreliable -- cables get cut, switches fail, data centers lose
              connectivity. When communication breaks down between parts of your system,
              that's a{' '}
              <Term
                word="Network Partition"
                definition="A break in communication between two or more nodes in a distributed system. Messages sent between the partitioned groups are lost or delayed indefinitely."
                onLearn={learnTerm}
              />.
            </p>

            <p className="text-quest-muted mb-6">
              This isn't a theoretical concern -- it happens in production, at scale, regularly.
              The question isn't <em>if</em> a partition will occur, but <em>when</em>.
            </p>

            {/* Visual: 3 servers with partition */}
            <div className="bg-quest-bg rounded-xl p-8 mb-6">
              <h3 className="font-semibold mb-6 text-center">What Happens During a Network Partition?</h3>

              <div className="flex flex-col items-center gap-6">
                {/* Step indicator */}
                <div className="flex gap-2">
                  {[0, 1, 2].map(step => (
                    <button
                      key={step}
                      onClick={() => setPartitionAnimStep(step)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        partitionAnimStep === step ? 'bg-quest-primary scale-125' : 'bg-quest-muted/30'
                      }`}
                    />
                  ))}
                </div>

                {/* Servers visualization */}
                <div className="relative w-full max-w-md mx-auto">
                  <div className="flex justify-between items-center">
                    {/* Server A */}
                    <motion.div
                      animate={{
                        borderColor: partitionAnimStep >= 1 ? 'rgb(var(--color-quest-success))' : 'rgba(255,255,255,0.1)'
                      }}
                      className="flex flex-col items-center gap-2 p-4 bg-quest-surface rounded-lg border-2"
                    >
                      <Server size={32} className="text-quest-primary" />
                      <span className="text-xs font-medium">Server A</span>
                      {partitionAnimStep >= 2 && (
                        <span className="text-xs text-quest-success">Writes OK</span>
                      )}
                    </motion.div>

                    {/* Connection line */}
                    <div className="flex-1 mx-4 relative">
                      <motion.div
                        animate={{
                          backgroundColor: partitionAnimStep >= 1
                            ? 'rgb(var(--color-quest-danger))'
                            : 'rgb(var(--color-quest-success))',
                          scaleX: partitionAnimStep >= 1 ? 0.3 : 1,
                        }}
                        className="h-1 rounded origin-center"
                      />
                      {partitionAnimStep >= 1 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <WifiOff size={24} className="text-quest-danger" />
                        </motion.div>
                      )}
                    </div>

                    {/* Server B */}
                    <motion.div
                      animate={{
                        borderColor: partitionAnimStep >= 1 ? 'rgb(var(--color-quest-warning))' : 'rgba(255,255,255,0.1)'
                      }}
                      className="flex flex-col items-center gap-2 p-4 bg-quest-surface rounded-lg border-2"
                    >
                      <Server size={32} className="text-quest-secondary" />
                      <span className="text-xs font-medium">Server B</span>
                      {partitionAnimStep >= 2 && (
                        <span className="text-xs text-quest-warning">Stale data?</span>
                      )}
                    </motion.div>
                  </div>

                  {/* Server C below */}
                  <div className="flex justify-center mt-6">
                    <motion.div
                      animate={{
                        borderColor: partitionAnimStep >= 1 ? 'rgb(var(--color-quest-warning))' : 'rgba(255,255,255,0.1)'
                      }}
                      className="flex flex-col items-center gap-2 p-4 bg-quest-surface rounded-lg border-2"
                    >
                      <Server size={32} className="text-quest-warning" />
                      <span className="text-xs font-medium">Server C</span>
                      {partitionAnimStep >= 2 && (
                        <span className="text-xs text-quest-warning">Stale data?</span>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Step description */}
                <div className="text-center max-w-sm">
                  {partitionAnimStep === 0 && (
                    <p className="text-sm text-quest-muted">
                      <strong className="text-quest-success">Normal operation:</strong> All three servers
                      communicate freely. Data stays in sync. Everything works as expected.
                    </p>
                  )}
                  {partitionAnimStep === 1 && (
                    <p className="text-sm text-quest-muted">
                      <strong className="text-quest-danger">Partition occurs!</strong> The network link between
                      Server A and Servers B/C breaks. They can no longer communicate.
                    </p>
                  )}
                  {partitionAnimStep === 2 && (
                    <p className="text-sm text-quest-muted">
                      <strong className="text-quest-warning">The dilemma:</strong> A client writes to Server A.
                      Should B and C serve the old data (availability) or reject reads until they sync (consistency)?
                    </p>
                  )}
                </div>

                <p className="text-xs text-quest-muted">Click the dots above to step through the scenario</p>
              </div>
            </div>

            <DeepDive id="partition-examples" title="Famous Network Partition Incidents" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>2011 - Amazon DynamoDB:</strong> A network partition in US-East-1 caused
                widespread outages for services depending on consistent reads, including Reddit and Foursquare.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>2015 - Google Cloud:</strong> A configuration change caused network partitions
                between data centers, leading to 18 minutes of errors across multiple services.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>2017 - GitHub:</strong> A brief network partition caused their MySQL clusters
                to elect new primaries, resulting in a few minutes of degraded service. They chose
                consistency -- rejecting writes rather than risking data corruption.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore CAP Theorem
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: CAP */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Triangle className="text-quest-primary" />
              The CAP Theorem
            </h2>

            <p className="text-quest-muted mb-4">
              In 2000, Eric Brewer proposed the{' '}
              <Term
                word="CAP Theorem"
                definition="In a distributed system, you can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance. Proven by Seth Gilbert and Nancy Lynch in 2002."
                onLearn={learnTerm}
              />.
              It states that any distributed data store can provide at most two out of three guarantees simultaneously.
            </p>

            {/* CAP properties */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <motion.div
                onClick={() => toggleCapSelection('C')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`bg-quest-surface rounded-xl p-5 cursor-pointer border-2 transition-all
                  ${capSelection.includes('C')
                    ? 'border-quest-primary bg-quest-primary/10'
                    : 'border-transparent hover:border-quest-primary/30'
                  }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-quest-primary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-quest-primary">C</span>
                  </div>
                  <Term
                    word="Consistency"
                    definition="Every read receives the most recent write. All nodes see the same data at the same time."
                    onLearn={learnTerm}
                  />
                </div>
                <p className="text-sm text-quest-muted">
                  Every read receives the most recent write. All nodes see the same data at the same time.
                  If you write a value, any subsequent read will return that value.
                </p>
              </motion.div>

              <motion.div
                onClick={() => toggleCapSelection('A')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`bg-quest-surface rounded-xl p-5 cursor-pointer border-2 transition-all
                  ${capSelection.includes('A')
                    ? 'border-quest-secondary bg-quest-secondary/10'
                    : 'border-transparent hover:border-quest-secondary/30'
                  }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-quest-secondary/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-quest-secondary">A</span>
                  </div>
                  <Term
                    word="Availability"
                    definition="Every request receives a response (even if not the latest data). No request is ignored or times out."
                    onLearn={learnTerm}
                  />
                </div>
                <p className="text-sm text-quest-muted">
                  Every request receives a response, even if it's not the latest data.
                  The system never refuses a request or leaves users hanging.
                </p>
              </motion.div>

              <motion.div
                onClick={() => toggleCapSelection('P')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`bg-quest-surface rounded-xl p-5 cursor-pointer border-2 transition-all
                  ${capSelection.includes('P')
                    ? 'border-quest-warning bg-quest-warning/10'
                    : 'border-transparent hover:border-quest-warning/30'
                  }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-quest-warning/20 flex items-center justify-center">
                    <span className="text-xl font-bold text-quest-warning">P</span>
                  </div>
                  <Term
                    word="Partition Tolerance"
                    definition="System continues operating despite network partitions. Messages between nodes can be lost or delayed."
                    onLearn={learnTerm}
                  />
                </div>
                <p className="text-sm text-quest-muted">
                  The system continues to operate despite network partitions between nodes.
                  Since partitions are inevitable, this is effectively mandatory.
                </p>
              </motion.div>
            </div>

            <p className="text-center text-sm text-quest-muted mb-4">
              Click any two properties above to see which systems fall in that category
            </p>

            {/* Interactive result */}
            <AnimatePresence mode="wait">
              {getCapCombo() && capSystems[getCapCombo()] && (
                <motion.div
                  key={getCapCombo()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`bg-quest-surface rounded-xl p-6 mb-6 border border-${capSystems[getCapCombo()].color}/30`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-${capSystems[getCapCombo()].color}/20`}>
                      {capSystems[getCapCombo()].icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{capSystems[getCapCombo()].label}</h3>
                      <p className="text-sm text-quest-muted">{capSystems[getCapCombo()].desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {capSystems[getCapCombo()].systems.map(sys => (
                      <span key={sys} className="text-sm bg-quest-bg px-3 py-1 rounded-full">
                        {sys}
                      </span>
                    ))}
                  </div>
                  {getCapCombo() === 'CA' && (
                    <p className="text-xs text-quest-warning mt-3">
                      Note: True CA systems don't exist in distributed environments. If you have
                      multiple nodes, network partitions can always happen.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CP vs AP overview */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-primary/5 rounded-lg p-5 border border-quest-primary/20">
                <h4 className="font-semibold text-quest-primary mb-3 flex items-center gap-2">
                  <Shield size={18} />
                  CP Systems
                </h4>
                <p className="text-sm text-quest-muted mb-3">
                  During a partition, these systems <strong>sacrifice availability</strong>.
                  They'll refuse requests rather than serve potentially inconsistent data.
                </p>
                <div className="space-y-2">
                  {['MongoDB', 'HBase', 'Redis (Cluster)'].map(sys => (
                    <div key={sys} className="flex items-center gap-2 text-sm">
                      <Database size={14} className="text-quest-primary" />
                      <span>{sys}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-quest-secondary/5 rounded-lg p-5 border border-quest-secondary/20">
                <h4 className="font-semibold text-quest-secondary mb-3 flex items-center gap-2">
                  <Wifi size={18} />
                  AP Systems
                </h4>
                <p className="text-sm text-quest-muted mb-3">
                  During a partition, these systems <strong>sacrifice consistency</strong>.
                  They'll serve potentially stale data rather than refuse requests.
                </p>
                <div className="space-y-2">
                  {['Cassandra', 'DynamoDB', 'CouchDB'].map(sys => (
                    <div key={sys} className="flex items-center gap-2 text-sm">
                      <Database size={14} className="text-quest-secondary" />
                      <span>{sys}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DeepDive id="cap-proof" title="Why You Can't Have All Three" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                The proof is surprisingly intuitive. Imagine two nodes, A and B, with a network
                partition between them. A client writes a new value to node A.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                Now another client reads from node B. Node B can't communicate with A
                (that's the partition). It has two choices:
              </p>
              <ul className="text-sm text-quest-muted mb-3 space-y-2 ml-4">
                <li>1. <strong>Return the old value</strong> -- the system is <em>available</em> but
                  <em> not consistent</em> (B doesn't have the latest write)</li>
                <li>2. <strong>Refuse the read</strong> -- the system is <em>consistent</em> but
                  <em> not available</em> (B rejects the request)</li>
              </ul>
              <p className="text-sm text-quest-muted mb-3">
                There's no third option. As long as the partition exists, you must choose.
                This was formally proven by Seth Gilbert and Nancy Lynch at MIT in 2002.
              </p>
              <p className="text-sm text-quest-muted">
                Network partitions are inevitable in distributed systems -- hardware fails,
                cables get cut, switches malfunction. So in practice, the real choice is
                between <strong>CP</strong> and <strong>AP</strong>.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Explore Tradeoffs
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: TRADEOFFS */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="text-quest-warning" />
              Real-World Tradeoffs
            </h2>

            <p className="text-quest-muted mb-6">
              CAP isn't just theory -- every distributed application makes these tradeoffs,
              often without realizing it. The right choice depends entirely on your use case.
            </p>

            {/* Scenario 1: Banking */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield size={20} className="text-quest-primary" />
                Scenario 1: Banking Application
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                You're building a banking app. A network partition occurs between your
                data centers. A customer tries to transfer $10,000. What do you do?
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScenarioAnswers(prev => ({ ...prev, banking: 'A' }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all
                    ${scenarioAnswers.banking === 'A'
                      ? 'border-quest-primary bg-quest-primary/10'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <p className="font-medium mb-1">A: Reject the transfer</p>
                  <p className="text-xs text-quest-muted">
                    Maintain consistency. The customer sees an error but no money is
                    lost or duplicated.
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScenarioAnswers(prev => ({ ...prev, banking: 'B' }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all
                    ${scenarioAnswers.banking === 'B'
                      ? 'border-quest-secondary bg-quest-secondary/10'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <p className="font-medium mb-1">B: Accept and reconcile later</p>
                  <p className="text-xs text-quest-muted">
                    Maintain availability. The transfer goes through, but you risk
                    double-spending if both sides process it.
                  </p>
                </motion.button>
              </div>

              <AnimatePresence>
                {scenarioAnswers.banking && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 rounded-lg ${
                      scenarioAnswers.banking === 'A'
                        ? 'bg-quest-success/10 border border-quest-success/30'
                        : 'bg-quest-warning/10 border border-quest-warning/30'
                    }`}>
                      {scenarioAnswers.banking === 'A' ? (
                        <p className="text-sm text-quest-muted">
                          <strong className="text-quest-success">Correct approach for banking!</strong>{' '}
                          Financial systems almost always choose CP. A brief period of unavailability
                          is far better than incorrect account balances. Banks would rather show
                          "Service temporarily unavailable" than risk double-spending.
                        </p>
                      ) : (
                        <p className="text-sm text-quest-muted">
                          <strong className="text-quest-warning">Risky for banking!</strong>{' '}
                          Accepting writes during a partition could lead to double-spending --
                          both sides might process the same transfer, effectively creating money.
                          Banking systems almost always choose CP (consistency).
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scenario 2: Social Media */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Wifi size={20} className="text-quest-secondary" />
                Scenario 2: Social Media Feed
              </h3>
              <p className="text-sm text-quest-muted mb-4">
                You're building a social media feed. A network partition occurs. A user
                tries to view their timeline. What do you do?
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScenarioAnswers(prev => ({ ...prev, social: 'A' }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all
                    ${scenarioAnswers.social === 'A'
                      ? 'border-quest-primary bg-quest-primary/10'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <p className="font-medium mb-1">A: Show an error page</p>
                  <p className="text-xs text-quest-muted">
                    Maintain consistency. User sees nothing until we're sure the
                    feed is up-to-date.
                  </p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScenarioAnswers(prev => ({ ...prev, social: 'B' }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all
                    ${scenarioAnswers.social === 'B'
                      ? 'border-quest-secondary bg-quest-secondary/10'
                      : 'border-white/10 hover:border-white/30'
                    }`}
                >
                  <p className="font-medium mb-1">B: Show a slightly stale feed</p>
                  <p className="text-xs text-quest-muted">
                    Maintain availability. User sees posts, maybe missing the last
                    few seconds of updates.
                  </p>
                </motion.button>
              </div>

              <AnimatePresence>
                {scenarioAnswers.social && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`p-4 rounded-lg ${
                      scenarioAnswers.social === 'B'
                        ? 'bg-quest-success/10 border border-quest-success/30'
                        : 'bg-quest-warning/10 border border-quest-warning/30'
                    }`}>
                      {scenarioAnswers.social === 'B' ? (
                        <p className="text-sm text-quest-muted">
                          <strong className="text-quest-success">Correct approach for social media!</strong>{' '}
                          Social feeds are a classic AP use case. A slightly stale timeline is
                          barely noticeable, but a blank error page drives users away. Facebook,
                          Twitter, and Instagram all prioritize availability.
                        </p>
                      ) : (
                        <p className="text-sm text-quest-muted">
                          <strong className="text-quest-warning">Overly strict for social media!</strong>{' '}
                          Showing an error page because a post from 2 seconds ago might be missing
                          is a poor user experience. Social media almost always chooses AP --
                          it's better to show a slightly stale feed than nothing at all.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Eventual Consistency */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="text-quest-secondary" />
                <Term
                  word="Eventual Consistency"
                  definition="A consistency model where, given enough time without new updates, all replicas will converge to the same value. Used by AP systems."
                  onLearn={learnTerm}
                />
              </h3>

              <p className="text-sm text-quest-muted mb-4">
                AP systems don't mean "no consistency ever." They use eventual consistency:
                given enough time and no new updates, all replicas will converge to the same value.
              </p>

              <div className="bg-quest-bg rounded-lg p-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-1 rounded font-mono">t=0</span>
                    <span className="text-sm text-quest-muted">Write "Alice" to Node A</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-quest-warning/20 text-quest-warning px-2 py-1 rounded font-mono">t=1ms</span>
                    <span className="text-sm text-quest-muted">Node B still shows old value ("Bob")</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-quest-warning/20 text-quest-warning px-2 py-1 rounded font-mono">t=50ms</span>
                    <span className="text-sm text-quest-muted">Replication in progress...</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-1 rounded font-mono">t=100ms</span>
                    <span className="text-sm text-quest-muted">All nodes now return "Alice" -- consistent!</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-quest-muted">
                The "eventual" part is usually milliseconds to seconds. For most applications,
                this window of inconsistency is imperceptible to users.
              </p>
            </div>

            <DeepDive id="real-world-cap" title="Real-World CAP Decisions" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Amazon (DynamoDB):</strong> Chose AP for their shopping cart. It's better
                to add an item twice (and dedupe later) than to tell a customer "try again."
                Losing a sale is worse than a minor cart inconsistency.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Google (Spanner):</strong> Built a globally consistent (CP) database using
                synchronized atomic clocks (TrueTime). They invested billions in hardware to
                minimize the availability cost of choosing consistency.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Facebook (TAO):</strong> Uses an eventually consistent graph store for
                the social graph. A slight delay in seeing a new friend connection is acceptable.
                For messages, they use a more consistent system -- the tradeoff depends on the feature.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Beyond CAP: PACELC
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: PACELC */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-quest-warning" />
              PACELC: The Full Picture
            </h2>

            <p className="text-quest-muted mb-4">
              CAP only describes what happens during a partition. But what about the rest of
              the time? Even without partitions, there's a tradeoff between latency and consistency.
              That's where{' '}
              <Term
                word="PACELC"
                definition="Extension of CAP: if Partition, choose Availability or Consistency; Else (no partition), choose Latency or Consistency. Proposed by Daniel Abadi in 2012."
                onLearn={learnTerm}
              />{' '}
              comes in.
            </p>

            {/* PACELC breakdown */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-center">Understanding PACELC</h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-quest-muted mb-1">If</p>
                  <p className="font-bold text-quest-danger text-lg">P</p>
                  <p className="text-xs text-quest-muted">Partition</p>
                </div>
                <ArrowRight size={18} className="text-quest-muted rotate-0 md:rotate-0" />
                <div className="flex gap-3">
                  <div className="bg-quest-secondary/10 border border-quest-secondary/30 rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-muted mb-1">Choose</p>
                    <p className="font-bold text-quest-secondary text-lg">A</p>
                    <p className="text-xs text-quest-muted">Availability</p>
                  </div>
                  <span className="self-center text-quest-muted font-bold">or</span>
                  <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-muted mb-1">Choose</p>
                    <p className="font-bold text-quest-primary text-lg">C</p>
                    <p className="text-xs text-quest-muted">Consistency</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-4 text-center">
                  <p className="text-xs text-quest-muted mb-1">Else</p>
                  <p className="font-bold text-quest-success text-lg">E</p>
                  <p className="text-xs text-quest-muted">No Partition</p>
                </div>
                <ArrowRight size={18} className="text-quest-muted" />
                <div className="flex gap-3">
                  <div className="bg-quest-warning/10 border border-quest-warning/30 rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-muted mb-1">Choose</p>
                    <p className="font-bold text-quest-warning text-lg">L</p>
                    <p className="text-xs text-quest-muted">Latency</p>
                  </div>
                  <span className="self-center text-quest-muted font-bold">or</span>
                  <div className="bg-quest-primary/10 border border-quest-primary/30 rounded-lg p-4 text-center">
                    <p className="text-xs text-quest-muted mb-1">Choose</p>
                    <p className="font-bold text-quest-primary text-lg">C</p>
                    <p className="text-xs text-quest-muted">Consistency</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-quest-muted mb-4">
              The key insight: even when the network is healthy, replicating data across nodes
              takes time. Do you wait for all replicas to confirm a write (consistency, higher latency)?
              Or return immediately after one write (low latency, risk of stale reads)?
            </p>

            {/* PACELC classification table */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">System Classifications</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">System</th>
                      <th className="text-center py-3 px-4">During Partition</th>
                      <th className="text-center py-3 px-4">Normal Operation</th>
                      <th className="text-center py-3 px-4">PACELC Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paceclTable.map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 px-4 font-medium">{row.system}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            row.partition.startsWith('PA')
                              ? 'bg-quest-secondary/20 text-quest-secondary'
                              : 'bg-quest-primary/20 text-quest-primary'
                          }`}>
                            {row.partition}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            row.normal.startsWith('EL')
                              ? 'bg-quest-warning/20 text-quest-warning'
                              : 'bg-quest-primary/20 text-quest-primary'
                          }`}>
                            {row.normal}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4 font-mono text-xs">{row.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-3">Reading the Table</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-quest-secondary font-bold text-sm mt-0.5">PA/EL</span>
                  <p className="text-sm text-quest-muted">
                    During partitions, choose <strong>Availability</strong>. In normal operation,
                    choose <strong>Latency</strong>. These systems optimize for speed and uptime.
                    Example: Cassandra returns quickly and stays available, even if data is briefly stale.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-quest-primary font-bold text-sm mt-0.5">PC/EC</span>
                  <p className="text-sm text-quest-muted">
                    During partitions, choose <strong>Consistency</strong>. In normal operation,
                    also choose <strong>Consistency</strong>. These systems always ensure data correctness,
                    even at the cost of speed. Example: MongoDB ensures reads are always up-to-date.
                  </p>
                </div>
              </div>
            </div>

            <DeepDive id="beyond-cap" title="Beyond CAP: It's More of a Spectrum" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                Many engineers criticize CAP for being too simplistic. Real systems don't
                fit neatly into "CP" or "AP" boxes. Here's why:
              </p>
              <ul className="text-sm text-quest-muted mb-3 space-y-2 ml-4">
                <li>
                  <strong>Consistency is tunable:</strong> Many systems (like Cassandra) let you
                  choose consistency levels per-query. Read from one replica (fast, possibly stale)
                  or read from a majority (slower, consistent).
                </li>
                <li>
                  <strong>Partitions are partial:</strong> CAP assumes a binary "partitioned or not."
                  In reality, partitions can be partial, transient, or asymmetric.
                </li>
                <li>
                  <strong>Availability is a spectrum:</strong> A system that responds in 100ms
                  vs 10 seconds is technically "available" in both cases, but the user experience
                  is vastly different.
                </li>
              </ul>
              <p className="text-sm text-quest-muted">
                Modern thinking treats these as tunable knobs rather than binary switches.
                The best systems let you make different tradeoffs for different operations
                within the same database.
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
              CAP theorem is one of the most important concepts in distributed systems.
              Let's make sure you understand the tradeoffs!
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
                <h3 className="text-xl font-bold mb-2">Level 8 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand CAP theorem, the fundamental tradeoffs in distributed systems,
                  and how PACELC extends the model to cover normal operation scenarios.
                </p>
                <p className="text-sm text-quest-primary">
                  Every distributed system you build or use makes these tradeoffs --
                  now you know how to reason about them!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

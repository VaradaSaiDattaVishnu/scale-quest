import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Radio, Zap, Database, Server, Mail, BarChart3, Bell,
  AlertTriangle, Play, Clock, Layers, GitBranch, Send
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

/* ── Intro: Coupling Problem ─────────────────────────────── */

const directServices = [
  { name: 'Email', icon: Mail, color: 'text-blue-400' },
  { name: 'Analytics', icon: BarChart3, color: 'text-green-400' },
  { name: 'Notification', icon: Bell, color: 'text-yellow-400' },
  { name: 'Billing', icon: Database, color: 'text-purple-400' },
  { name: 'Recommendation', icon: Zap, color: 'text-pink-400' },
]

function CouplingDemo({ learnTerm, markDeepDiveRead }) {
  const [directRunning, setDirectRunning] = useState(false)
  const [directStep, setDirectStep] = useState(-1)
  const [directFailed, setDirectFailed] = useState(false)
  const [eventRunning, setEventRunning] = useState(false)
  const [eventPublished, setEventPublished] = useState(false)
  const [eventDelivered, setEventDelivered] = useState([])
  const [eventFailed, setEventFailed] = useState(-1)
  const timerRef = useRef(null)

  const FAIL_INDEX = 2 // Notification service fails

  const runDirect = () => {
    setDirectRunning(true)
    setDirectStep(-1)
    setDirectFailed(false)
    let step = 0
    const tick = () => {
      if (step === FAIL_INDEX) {
        setDirectStep(step)
        setTimeout(() => { setDirectFailed(true); setDirectRunning(false) }, 600)
        return
      }
      setDirectStep(step)
      step++
      if (step < directServices.length) timerRef.current = setTimeout(tick, 700)
      else setTimeout(() => setDirectRunning(false), 500)
    }
    tick()
  }

  const runEvent = () => {
    setEventRunning(true)
    setEventPublished(false)
    setEventDelivered([])
    setEventFailed(FAIL_INDEX)
    setTimeout(() => setEventPublished(true), 500)
    setTimeout(() => {
      const indices = [0, 1, 2, 3, 4]
      setEventDelivered(indices)
      setEventRunning(false)
    }, 1200)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Direct calls */}
        <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
          <h3 className="font-semibold mb-4 text-quest-danger flex items-center gap-2">
            <AlertTriangle size={18} /> Direct Calls (Coupled)
          </h3>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-quest-primary/20 rounded-lg px-4 py-2 font-medium text-sm">User Service</div>
            {directServices.map((svc, i) => {
              const reached = directStep >= i
              const failed = directFailed && i === FAIL_INDEX
              const blocked = directFailed && i > FAIL_INDEX
              return (
                <motion.div key={svc.name} className="flex items-center gap-3 w-full"
                  animate={failed ? { x: [0, -4, 4, -4, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex-1 h-px bg-white/10 relative">
                    {reached && !failed && !blocked && (
                      <motion.div className="absolute inset-y-0 left-0 bg-quest-success" style={{ width: '100%' }}
                        initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.3 }} />
                    )}
                    {failed && <div className="absolute inset-y-0 left-0 bg-quest-danger w-full" />}
                  </div>
                  <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg
                    ${failed ? 'bg-quest-danger/20 text-quest-danger' : blocked ? 'bg-white/5 text-quest-muted opacity-40' : reached ? 'bg-quest-success/20 text-quest-success' : 'bg-quest-surface text-quest-muted'}`}>
                    <svc.icon size={14} />
                    {svc.name}
                    {failed && ' FAIL'}
                    {blocked && ' BLOCKED'}
                  </div>
                </motion.div>
              )
            })}
            <button onClick={runDirect} disabled={directRunning}
              className="btn-secondary text-xs mt-3 disabled:opacity-50 flex items-center gap-1">
              <Play size={14} /> New User Signs Up
            </button>
            {directFailed && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-quest-danger mt-1 text-center">
                Notification service failed -- downstream services never called!
              </motion.p>
            )}
          </div>
        </div>

        {/* Event-driven */}
        <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
          <h3 className="font-semibold mb-4 text-quest-success flex items-center gap-2">
            <Radio size={18} /> Event-Driven (Decoupled)
          </h3>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-quest-primary/20 rounded-lg px-4 py-2 font-medium text-sm">User Service</div>
            <motion.div className={`rounded-lg px-4 py-2 text-sm font-medium border-2 border-dashed
              ${eventPublished ? 'border-quest-warning bg-quest-warning/10 text-quest-warning' : 'border-white/20 text-quest-muted'}`}
              animate={eventPublished ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.3 }}>
              Event Bus
            </motion.div>
            {directServices.map((svc, i) => {
              const delivered = eventDelivered.includes(i)
              const failed = delivered && i === eventFailed
              return (
                <motion.div key={svc.name} className="flex items-center gap-3 w-full">
                  <div className="flex-1 h-px bg-white/10 relative">
                    {delivered && (
                      <motion.div className={`absolute inset-y-0 left-0 ${failed ? 'bg-quest-danger' : 'bg-quest-success'}`}
                        initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.3, delay: i * 0.05 }} />
                    )}
                  </div>
                  <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg
                    ${failed ? 'bg-quest-danger/20 text-quest-danger' : delivered ? 'bg-quest-success/20 text-quest-success' : 'bg-quest-surface text-quest-muted'}`}>
                    <svc.icon size={14} />
                    {svc.name}
                    {failed && ' FAIL'}
                  </div>
                </motion.div>
              )
            })}
            <button onClick={runEvent} disabled={eventRunning}
              className="btn-secondary text-xs mt-3 disabled:opacity-50 flex items-center gap-1">
              <Play size={14} /> New User Signs Up
            </button>
            {eventDelivered.length > 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-quest-success mt-1 text-center">
                Notification failed, but 4 other services succeeded independently!
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {/* Counter comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-quest-danger">5 API calls</p>
          <p className="text-xs text-quest-muted mt-1">1 failure = cascade failure</p>
        </div>
        <div className="bg-quest-success/10 border border-quest-success/30 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold text-quest-success">1 publish</p>
          <p className="text-xs text-quest-muted mt-1">Independent consumption, isolated failures</p>
        </div>
      </div>

      <p className="text-quest-muted mb-4">
        With{' '}
        <Term word="Decoupling" definition="Designing services so they don't directly depend on each other. Changes in one service don't require changes in others." onLearn={learnTerm} />
        , the publisher doesn't know or care who subscribes. The{' '}
        <Term word="Event Bus" definition="A communication channel that receives events from publishers and delivers them to interested subscribers. Examples: Kafka, RabbitMQ, AWS SNS/SQS." onLearn={learnTerm} />
        {' '}handles routing. If a subscriber fails, others are unaffected.
      </p>

      <DeepDive id="temporal-coupling" title="Temporal Coupling vs Spatial Coupling" onRead={markDeepDiveRead}>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Spatial coupling:</strong> Service A calls Service B directly. If B moves or changes its API, A breaks.
          Event-driven architecture removes this -- A publishes events, never knowing who consumes them.
        </p>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Temporal coupling:</strong> Service A must wait for Service B to respond before continuing.
          Async events remove this -- A publishes and moves on immediately.
        </p>
        <p className="text-sm text-quest-muted">
          This matters for team autonomy too. Teams can deploy, scale, and evolve their services
          independently. The event contract is the only shared agreement.
        </p>
      </DeepDive>
    </>
  )
}

/* ── Pub/Sub: Live Event Network ─────────────────────────── */

const publishers = [
  { id: 'order', name: 'Order Service', color: 'bg-blue-500', textColor: 'text-blue-400' },
  { id: 'user', name: 'User Service', color: 'bg-green-500', textColor: 'text-green-400' },
  { id: 'payment', name: 'Payment Service', color: 'bg-purple-500', textColor: 'text-purple-400' },
]

const topics = [
  { id: 'order.created', label: 'order.created', color: 'border-blue-500/50' },
  { id: 'user.signup', label: 'user.signup', color: 'border-green-500/50' },
  { id: 'payment.completed', label: 'payment.completed', color: 'border-purple-500/50' },
]

const subscribers = [
  { id: 'email', name: 'Email', icon: Mail },
  { id: 'sms', name: 'SMS', icon: Send },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'inventory', name: 'Inventory', icon: Database },
  { id: 'fraud', name: 'Fraud Detection', icon: AlertTriangle },
]

const subscriptionMap = {
  'order.created': ['email', 'analytics', 'inventory', 'fraud'],
  'user.signup': ['email', 'sms', 'analytics'],
  'payment.completed': ['email', 'analytics', 'fraud'],
}

const publisherToTopic = {
  order: 'order.created',
  user: 'user.signup',
  payment: 'payment.completed',
}

function PubSubNetwork({ learnTerm, markDeepDiveRead }) {
  const [activePublisher, setActivePublisher] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const [activeSubscribers, setActiveSubscribers] = useState([])
  const [animating, setAnimating] = useState(false)

  const emitEvent = (pubId) => {
    if (animating) return
    setAnimating(true)
    setActivePublisher(pubId)
    setActiveTopic(null)
    setActiveSubscribers([])
    const topicId = publisherToTopic[pubId]
    setTimeout(() => {
      setActiveTopic(topicId)
      setTimeout(() => {
        setActiveSubscribers(subscriptionMap[topicId])
        setTimeout(() => setAnimating(false), 800)
      }, 500)
    }, 500)
  }

  return (
    <>
      {/* Network diagram */}
      <div className="bg-quest-bg rounded-xl p-6 mb-6">
        <div className="grid grid-cols-3 gap-4 items-start">
          {/* Publishers */}
          <div className="space-y-3">
            <p className="text-xs text-quest-muted font-medium uppercase tracking-wider mb-2">Publishers</p>
            {publishers.map(pub => (
              <motion.button key={pub.id}
                onClick={() => emitEvent(pub.id)}
                disabled={animating}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm font-medium
                  ${activePublisher === pub.id ? `${pub.color.replace('bg-', 'border-')} ${pub.color}/20` : 'border-white/10 hover:border-white/30 bg-quest-surface'}`}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${pub.color}`} />
                  {pub.name}
                </div>
                <p className="text-xs text-quest-muted mt-1">Click to emit</p>
              </motion.button>
            ))}
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <p className="text-xs text-quest-muted font-medium uppercase tracking-wider mb-2">Topics</p>
            {topics.map(topic => (
              <motion.div key={topic.id}
                className={`p-3 rounded-lg border-2 border-dashed text-sm font-mono transition-all
                  ${activeTopic === topic.id ? `${topic.color} bg-quest-warning/10` : 'border-white/10 bg-quest-surface/50'}`}
                animate={activeTopic === topic.id ? { scale: [1, 1.04, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Radio size={14} className={activeTopic === topic.id ? 'text-quest-warning' : 'text-quest-muted'} />
                <span className="ml-2">{topic.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Subscribers */}
          <div className="space-y-3">
            <p className="text-xs text-quest-muted font-medium uppercase tracking-wider mb-2">Subscribers</p>
            {subscribers.map(sub => {
              const isActive = activeSubscribers.includes(sub.id)
              return (
                <motion.div key={sub.id}
                  className={`p-3 rounded-lg border text-sm transition-all flex items-center gap-2
                    ${isActive ? 'border-quest-success bg-quest-success/10 text-quest-success' : 'border-white/10 bg-quest-surface text-quest-muted'}`}
                  animate={isActive ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <sub.icon size={14} />
                  {sub.name}
                  {isActive && <CheckCircle size={12} className="ml-auto" />}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Subscription matrix */}
      <div className="bg-quest-surface rounded-xl p-5 mb-6">
        <h4 className="font-semibold mb-3">Subscription Matrix</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-2 px-3">Subscriber</th>
                {topics.map(t => <th key={t.id} className="text-center py-2 px-3 font-mono">{t.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {subscribers.map(sub => (
                <tr key={sub.id} className="border-b border-white/5">
                  <td className="py-2 px-3 flex items-center gap-1"><sub.icon size={12} /> {sub.name}</td>
                  {topics.map(t => {
                    const subscribed = subscriptionMap[t.id].includes(sub.id)
                    return (
                      <td key={t.id} className="text-center py-2 px-3">
                        {subscribed
                          ? <span className="text-quest-success font-bold">Yes</span>
                          : <span className="text-quest-muted">--</span>}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-quest-muted mb-4">
        <Term word="Pub/Sub" definition="Publish-Subscribe: a messaging pattern where senders (publishers) emit events to topics, and receivers (subscribers) listen to topics they care about, without knowing each other." onLearn={learnTerm} />
        {' '}enables{' '}
        <Term word="Fan-out" definition="A single message being delivered to multiple subscribers simultaneously. One publish, many receives." onLearn={learnTerm} />
        : one event reaches all interested services. Subscribers only get events from topics they subscribe to.
      </p>

      <DeepDive id="topic-design" title="Topic Design Patterns" onRead={markDeepDiveRead}>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Fine-grained topics</strong> (e.g., <code>order.created</code>, <code>order.shipped</code>): Subscribers only receive what they need. More topics to manage.
        </p>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Coarse-grained topics</strong> (e.g., <code>order.events</code>): Fewer topics, but subscribers must filter irrelevant events.
        </p>
        <p className="text-sm text-quest-muted">
          <strong>Naming conventions:</strong> Use dot-notation (<code>domain.event</code>) or slash-notation (<code>domain/event</code>). Be consistent. Include the entity and the action in past tense: <code>order.created</code>, <code>payment.completed</code>.
        </p>
      </DeepDive>
    </>
  )
}

/* ── Event Sourcing: Time Travel ─────────────────────────── */

const eventLog = [
  { time: '10:01', type: 'UserCreated', data: { name: 'Alice', email: 'alice@example.com' }, color: 'text-green-400' },
  { time: '10:02', type: 'AddressUpdated', data: { city: 'New York', zip: '10001' }, color: 'text-blue-400' },
  { time: '10:05', type: 'NameChanged', data: { name: 'Alice Smith' }, color: 'text-yellow-400' },
  { time: '10:07', type: 'OrderPlaced', data: { items: ['Widget x2', 'Gadget x1'], total: '$147' }, color: 'text-purple-400' },
  { time: '10:12', type: 'AddressUpdated', data: { city: 'San Francisco', zip: '94102' }, color: 'text-blue-400' },
  { time: '10:15', type: 'OrderPlaced', data: { items: ['Gizmo x3'], total: '$63' }, color: 'text-purple-400' },
]

function buildState(upToIndex) {
  const state = { name: '', email: '', city: '', zip: '', orders: [] }
  for (let i = 0; i <= upToIndex; i++) {
    const e = eventLog[i]
    if (e.type === 'UserCreated') { state.name = e.data.name; state.email = e.data.email }
    if (e.type === 'AddressUpdated') { state.city = e.data.city; state.zip = e.data.zip }
    if (e.type === 'NameChanged') { state.name = e.data.name }
    if (e.type === 'OrderPlaced') { state.orders.push({ items: e.data.items, total: e.data.total }) }
  }
  return state
}

function EventSourcingDemo({ learnTerm, markDeepDiveRead }) {
  const [sliderValue, setSliderValue] = useState(eventLog.length - 1)
  const state = buildState(sliderValue)

  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Event log */}
        <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
          <h4 className="font-semibold mb-3 flex items-center gap-2"><Layers size={16} /> Event Log</h4>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {eventLog.map((evt, i) => (
              <motion.div key={i}
                className={`font-mono text-xs p-2 rounded transition-all
                  ${i <= sliderValue ? 'bg-quest-surface' : 'bg-quest-surface/30 opacity-30'}`}
                animate={i === sliderValue ? { boxShadow: '0 0 0 2px rgba(99,102,241,0.5)' } : { boxShadow: '0 0 0 0px transparent' }}
              >
                <span className="text-quest-muted">[{evt.time}]</span>{' '}
                <span className={evt.color}>{evt.type}</span>{' '}
                <span className="text-quest-muted">{JSON.stringify(evt.data)}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current state */}
        <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
          <h4 className="font-semibold mb-3 flex items-center gap-2"><Database size={16} /> Rebuilt State</h4>
          <AnimatePresence mode="wait">
            <motion.div key={sliderValue} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-quest-surface rounded-lg p-4 font-mono text-xs space-y-2">
              <div><span className="text-quest-muted">name:</span> <span className="text-quest-primary">{state.name || '---'}</span></div>
              <div><span className="text-quest-muted">email:</span> <span className="text-quest-primary">{state.email || '---'}</span></div>
              <div><span className="text-quest-muted">city:</span> <span className="text-quest-primary">{state.city || '---'}</span></div>
              <div><span className="text-quest-muted">zip:</span> <span className="text-quest-primary">{state.zip || '---'}</span></div>
              <div>
                <span className="text-quest-muted">orders:</span>
                {state.orders.length === 0
                  ? <span className="text-quest-muted ml-2">[]</span>
                  : (
                    <div className="ml-4 mt-1 space-y-1">
                      {state.orders.map((o, i) => (
                        <div key={i} className="text-quest-secondary">{o.items.join(', ')} -- {o.total}</div>
                      ))}
                    </div>
                  )}
              </div>
            </motion.div>
          </AnimatePresence>
          <p className="text-xs text-quest-muted mt-3 text-center">State rebuilt by replaying events 1..{sliderValue + 1}</p>
        </div>
      </div>

      {/* Time travel slider */}
      <div className="bg-quest-surface rounded-xl p-5 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Clock size={16} className="text-quest-warning" />
          <h4 className="font-semibold">Time Travel</h4>
          <span className="text-xs text-quest-muted ml-auto">Event {sliderValue + 1} of {eventLog.length}</span>
        </div>
        <input
          type="range" min={0} max={eventLog.length - 1} value={sliderValue}
          onChange={e => setSliderValue(Number(e.target.value))}
          className="w-full accent-quest-primary"
        />
        <div className="flex justify-between text-xs text-quest-muted mt-1">
          <span>{eventLog[0].time}</span>
          <span>{eventLog[eventLog.length - 1].time}</span>
        </div>
      </div>

      <p className="text-quest-muted mb-4">
        With{' '}
        <Term word="Event Sourcing" definition="A pattern where state changes are stored as an immutable sequence of events. Current state is derived by replaying the event log. Provides a complete audit trail and enables time-travel debugging." onLearn={learnTerm} />
        , you never overwrite data. Every change is an immutable event. You can replay events to rebuild
        state at any point in time -- audit trail for free, and you can derive entirely new views by replaying old events.
      </p>

      <DeepDive id="es-pitfalls" title="Event Sourcing Pitfalls" onRead={markDeepDiveRead}>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Event schema evolution:</strong> Events are immutable, but your schema will evolve. You need versioning
          strategies (upcasters, weak schemas) to handle old events with new code.
        </p>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Performance of replay:</strong> Replaying millions of events to build state is slow. Solution:
          <strong> snapshots</strong> -- periodically save the current state so you only replay events after the snapshot.
        </p>
        <p className="text-sm text-quest-muted">
          <strong>Eventual consistency:</strong> Projections derived from events may lag behind the event store.
          Users might not see their own writes immediately without careful design.
        </p>
      </DeepDive>
    </>
  )
}

/* ── CQRS: Dual Path ─────────────────────────────────────── */

function CQRSDemo({ learnTerm, markDeepDiveRead }) {
  const [mode, setMode] = useState('cqrs') // 'combined' | 'cqrs'
  const [commandRunning, setCommandRunning] = useState(false)
  const [commandStep, setCommandStep] = useState(-1) // 0=command,1=eventstore,2=published,3=projector,4=readmodel
  const timerRef = useRef(null)

  const runCommand = () => {
    if (commandRunning) return
    setCommandRunning(true)
    setCommandStep(0)
    let step = 1
    const tick = () => {
      setCommandStep(step)
      step++
      if (step <= 4) timerRef.current = setTimeout(tick, 600)
      else setTimeout(() => setCommandRunning(false), 400)
    }
    timerRef.current = setTimeout(tick, 600)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const cqrsSteps = [
    { label: 'Command Handler', icon: Send, desc: 'Validates & processes' },
    { label: 'Event Store', icon: Database, desc: 'Persists event' },
    { label: 'Event Published', icon: Radio, desc: 'Broadcast to projectors' },
    { label: 'Projector', icon: GitBranch, desc: 'Updates read model' },
    { label: 'Read Model', icon: Layers, desc: 'Optimized for queries' },
  ]

  return (
    <>
      {/* Toggle */}
      <div className="flex justify-center gap-2 mb-6">
        <button onClick={() => setMode('combined')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${mode === 'combined' ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}>
          Traditional (Combined)
        </button>
        <button onClick={() => setMode('cqrs')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
            ${mode === 'cqrs' ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}>
          CQRS (Separated)
        </button>
      </div>

      {mode === 'combined' ? (
        <div className="bg-quest-bg rounded-xl p-6 mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-quest-primary/20 rounded-lg px-4 py-2 text-sm font-medium">User / Client</div>
            <ArrowRight size={16} className="rotate-90 text-quest-muted" />
            <div className="bg-quest-surface rounded-lg px-4 py-2 text-sm font-medium">Single API</div>
            <ArrowRight size={16} className="rotate-90 text-quest-muted" />
            <div className="bg-quest-warning/20 border border-quest-warning/30 rounded-lg px-6 py-4 text-center">
              <p className="font-semibold text-quest-warning">Single Database Model</p>
              <p className="text-xs text-quest-muted mt-1">Reads AND writes use the same schema</p>
              <p className="text-xs text-quest-muted">Optimized for neither perfectly</p>
            </div>
            <ArrowRight size={16} className="rotate-90 text-quest-muted" />
            <div className="bg-quest-primary/20 rounded-lg px-4 py-2 text-sm font-medium">User / Client</div>
          </div>
          <p className="text-center text-xs text-quest-muted mt-4">
            One model serving both reads and writes -- compromise in both directions
          </p>
        </div>
      ) : (
        <div className="bg-quest-bg rounded-xl p-6 mb-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Write path */}
            <div className="border border-quest-danger/30 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-quest-danger mb-3 flex items-center gap-2">
                <Send size={14} /> WRITE PATH (Commands)
              </h4>
              <div className="space-y-2">
                {cqrsSteps.slice(0, 3).map((s, i) => (
                  <motion.div key={i}
                    className={`flex items-center gap-2 p-2 rounded text-xs transition-all
                      ${commandStep >= i ? 'bg-quest-danger/10 text-quest-text' : 'bg-quest-surface/50 text-quest-muted'}`}
                    animate={commandStep === i ? { scale: [1, 1.03, 1] } : {}}
                  >
                    <s.icon size={14} className={commandStep >= i ? 'text-quest-danger' : ''} />
                    <span className="font-medium">{s.label}</span>
                    <span className="text-quest-muted ml-auto">{s.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Read path */}
            <div className="border border-quest-success/30 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-quest-success mb-3 flex items-center gap-2">
                <Layers size={14} /> READ PATH (Queries)
              </h4>
              <div className="space-y-2">
                {cqrsSteps.slice(3).map((s, i) => (
                  <motion.div key={i}
                    className={`flex items-center gap-2 p-2 rounded text-xs transition-all
                      ${commandStep >= i + 3 ? 'bg-quest-success/10 text-quest-text' : 'bg-quest-surface/50 text-quest-muted'}`}
                    animate={commandStep === i + 3 ? { scale: [1, 1.03, 1] } : {}}
                  >
                    <s.icon size={14} className={commandStep >= i + 3 ? 'text-quest-success' : ''} />
                    <span className="font-medium">{s.label}</span>
                    <span className="text-quest-muted ml-auto">{s.desc}</span>
                  </motion.div>
                ))}
                <div className={`flex items-center gap-2 p-2 rounded text-xs transition-all bg-quest-surface/50 text-quest-muted`}>
                  <Server size={14} />
                  <span className="font-medium">Query API</span>
                  <span className="text-quest-muted ml-auto">Serves fast reads</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button onClick={runCommand} disabled={commandRunning}
              className="btn-primary text-sm disabled:opacity-50 flex items-center gap-2">
              <Play size={14} /> Place Order (Command)
            </button>
          </div>
        </div>
      )}

      {/* Pros/Cons */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
          <h4 className="font-semibold text-quest-success mb-2 text-sm">Pros</h4>
          <ul className="space-y-1 text-xs text-quest-muted">
            <li>+ Read and write models optimized independently</li>
            <li>+ Scale reads and writes separately</li>
            <li>+ Simpler queries (denormalized read models)</li>
            <li>+ Better performance under high load</li>
          </ul>
        </div>
        <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
          <h4 className="font-semibold text-quest-danger mb-2 text-sm">Cons</h4>
          <ul className="space-y-1 text-xs text-quest-muted">
            <li>- Added complexity (two models to maintain)</li>
            <li>- Eventual consistency between models</li>
            <li>- More infrastructure to manage</li>
            <li>- Overkill for simple CRUD applications</li>
          </ul>
        </div>
      </div>

      <p className="text-quest-muted mb-4">
        <Term word="CQRS" definition="Command Query Responsibility Segregation: a pattern that separates read and write operations into different models. The write model (command side) is optimized for data integrity; the read model (query side) is optimized for fast queries." onLearn={learnTerm} />
        {' '}separates the write path from the read path. The write model is optimized for consistency
        and validation, while the read model is a denormalized, query-optimized projection.
      </p>

      <DeepDive id="cqrs-when-not" title="When NOT to Use CQRS" onRead={markDeepDiveRead}>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Simple CRUD apps:</strong> If your reads and writes use the same shape, CQRS adds complexity for no gain.
          A basic blog or admin panel does not need separated models.
        </p>
        <p className="text-sm text-quest-muted mb-3">
          <strong>Small teams:</strong> CQRS requires maintaining two models, event handlers, and projectors.
          If your team is small, this overhead can slow you down.
        </p>
        <p className="text-sm text-quest-muted">
          <strong>Rule of thumb:</strong> Start with a simple combined model. Introduce CQRS only when you
          see clear divergence between your read and write patterns, or when scaling demands it.
        </p>
      </DeepDive>
    </>
  )
}

/* ── Main Level Component ────────────────────────────────── */

export default function Level12({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['intro', 'pubsub', 'eventsourcing', 'cqrs', 'quiz']

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the main benefit of Pub/Sub over direct service calls?',
      options: [
        { id: 'a', text: 'It is always faster than direct HTTP calls', correct: false },
        { id: 'b', text: 'Services are decoupled -- publishers don\'t need to know about subscribers, and failures don\'t cascade', correct: true },
        { id: 'c', text: 'It uses less memory than REST APIs', correct: false },
        { id: 'd', text: 'It guarantees exactly-once delivery', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'What does "fan-out" mean in Pub/Sub?',
      options: [
        { id: 'a', text: 'Spreading database writes across shards', correct: false },
        { id: 'b', text: 'A single published message being delivered to multiple subscribers simultaneously', correct: true },
        { id: 'c', text: 'Load balancing requests across service instances', correct: false },
        { id: 'd', text: 'Distributing topics across brokers for scalability', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'How does Event Sourcing differ from traditional database storage?',
      options: [
        { id: 'a', text: 'It uses NoSQL instead of SQL databases', correct: false },
        { id: 'b', text: 'It stores data in memory rather than on disk', correct: false },
        { id: 'c', text: 'It stores all state changes as an immutable sequence of events, rather than just the current state', correct: true },
        { id: 'd', text: 'It replicates data across multiple regions automatically', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'What problem does CQRS solve?',
      options: [
        { id: 'a', text: 'It prevents network partitions between services', correct: false },
        { id: 'b', text: 'It allows read and write models to be optimized independently for their different access patterns', correct: true },
        { id: 'c', text: 'It replaces the need for a database entirely', correct: false },
        { id: 'd', text: 'It guarantees zero-downtime deployments', correct: false },
      ],
    },
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
            {index + 1}. {section === 'eventsourcing' ? 'Event Sourcing' : section === 'cqrs' ? 'CQRS' : section === 'pubsub' ? 'Pub/Sub' : section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* SECTION: INTRO */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Radio className="text-quest-primary" /> The Broadcast
            </h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "When a user signs up, 5 services need to know. Are you really going to call each one?
                What happens when one of them is down? Do you retry? Do the others wait?
                There's a better way."
              </p>
            </div>

            <CouplingDemo learnTerm={learnTerm} markDeepDiveRead={markDeepDiveRead} />

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore Pub/Sub <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: PUB/SUB */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Radio className="text-quest-secondary" /> Pub/Sub: Live Event Network
            </h2>

            <p className="text-quest-muted mb-6">
              Click any publisher to emit an event. Watch it flow through the topic to all
              subscribed services. Notice how not every subscriber receives every event -- only those
              that subscribed to the relevant topic.
            </p>

            <PubSubNetwork learnTerm={learnTerm} markDeepDiveRead={markDeepDiveRead} />

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Event Sourcing <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: EVENT SOURCING */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-quest-warning" /> Event Sourcing: Time Travel Database
            </h2>

            <p className="text-quest-muted mb-6">
              Instead of storing only the current state, store every change as an immutable event.
              Drag the slider to travel back in time and see the state at any point.
            </p>

            <EventSourcingDemo learnTerm={learnTerm} markDeepDiveRead={markDeepDiveRead} />

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                CQRS <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: CQRS */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <GitBranch className="text-quest-primary" /> CQRS: Dual Path Architecture
            </h2>

            <p className="text-quest-muted mb-6">
              Toggle between the traditional combined model and CQRS to see the difference.
              In CQRS mode, click "Place Order" to watch the command flow through the write
              path and then update the read model asynchronously.
            </p>

            <CQRSDemo learnTerm={learnTerm} markDeepDiveRead={markDeepDiveRead} />

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: QUIZ */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Pub/Sub, Event Sourcing, and CQRS are powerful patterns -- but knowing when to use them matters most.
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
                <h3 className="text-xl font-bold mb-2">Level 12 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand event-driven architecture, Pub/Sub messaging, Event Sourcing,
                  and CQRS. These patterns are essential for building loosely coupled, scalable systems.
                </p>
                <p className="text-sm text-quest-primary">
                  You've mastered the art of decoupled communication at scale!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Plug, Layers, ArrowRight, RefreshCw, Box } from 'lucide-react'

// ---------------------------------------------------------------------------
// Reusable helpers
// ---------------------------------------------------------------------------

function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const termRef = useRef(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 })

  const handleMouseEnter = () => {
    if (termRef.current) {
      const rect = termRef.current.getBoundingClientRect()
      setTooltipPos({ top: rect.top - 8, left: rect.left + rect.width / 2 })
    }
    setShowTooltip(true)
    onLearn?.(word)
  }

  return (
    <span className="relative inline-block">
      <span ref={termRef} className="term cursor-pointer"
        onMouseEnter={handleMouseEnter} onMouseLeave={() => setShowTooltip(false)}>
        {word}
      </span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            style={{ top: tooltipPos.top, left: tooltipPos.left }}
            className="tooltip fixed -translate-x-1/2 -translate-y-full w-64 p-3 z-[100]">
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
    <div className="bg-quest-surface/50 rounded-lg border border-quest-secondary/30 my-6">
      <button onClick={() => { setIsOpen(!isOpen); if (!isOpen) onRead?.(id) }}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-quest-secondary/10 transition-colors">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-quest-secondary" />
          <span className="font-semibold">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 overflow-hidden">
            <div className="pt-2 border-t border-white/5 overflow-visible">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Data / constants
// ---------------------------------------------------------------------------

const OLD_API_FIELDS = [
  { key: 'card_num', label: 'card_num', type: 'string' },
  { key: 'card_exp', label: 'card_exp', type: 'string' },
  { key: 'amt_cents', label: 'amt_cents', type: 'int' },
  { key: 'curr', label: 'curr', type: 'string' },
  { key: 'merch_id', label: 'merch_id', type: 'string' },
]

const NEW_API_FIELDS = [
  { key: 'paymentMethodToken', label: 'paymentMethodToken', type: 'string' },
  { key: 'amount', label: 'amount', type: 'Money' },
  { key: 'merchantAccount', label: 'merchantAccount', type: 'Account' },
  { key: 'metadata', label: 'metadata', type: 'Map' },
]

const ADAPTER_MAPPINGS = [
  { from: 'card_num + card_exp', to: 'paymentMethodToken', note: 'Tokenise raw card data' },
  { from: 'amt_cents + curr', to: 'amount (Money)', note: 'Convert cents to Money object' },
  { from: 'merch_id', to: 'merchantAccount', note: 'Lookup Account from legacy ID' },
  { from: '(generated)', to: 'metadata', note: 'Add tracing / audit fields' },
]

const FACADE_SUBSYSTEMS = [
  { id: 'codec', label: 'Codec Engine', icon: '🎞️', detail: 'H.264, H.265, VP9, AV1 selection & encoding' },
  { id: 'audio', label: 'Audio Processor', icon: '🔊', detail: 'AAC, Opus mixing, normalisation, sync' },
  { id: 'compress', label: 'Compressor', icon: '📦', detail: 'Bitrate control, two-pass, CRF tuning' },
  { id: 'format', label: 'Format Muxer', icon: '📄', detail: 'MP4, WebM, MKV container muxing' },
]

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'What is the primary purpose of the Adapter pattern?',
    options: [
      'Make an existing interface compatible with another expected interface',
      'Add new behaviour to an object at runtime',
      'Provide a simplified interface to a complex subsystem',
      'Ensure a class has only one instance',
    ],
    correct: 0,
    explanation: 'The Adapter pattern converts the interface of one class into the interface that clients expect, allowing classes with incompatible interfaces to work together.',
  },
  {
    id: 2,
    question: 'What is the primary purpose of the Facade pattern?',
    options: [
      'Convert one interface into another',
      'Provide a simplified, unified interface to a set of interfaces in a subsystem',
      'Decouple an abstraction from its implementation',
      'Compose objects into tree structures',
    ],
    correct: 1,
    explanation: 'A Facade provides a higher-level interface that makes a subsystem easier to use by hiding its complexity behind a single entry point.',
  },
  {
    id: 3,
    question: 'What is the difference between a Class Adapter and an Object Adapter?',
    options: [
      'A class adapter uses multiple inheritance; an object adapter uses composition',
      'A class adapter is faster; an object adapter is slower',
      'There is no difference; they are synonyms',
      'A class adapter wraps methods; an object adapter wraps fields',
    ],
    correct: 0,
    explanation: 'A class adapter inherits from both the target and the adaptee (multiple inheritance), while an object adapter holds a reference to the adaptee and delegates to it (composition). In languages like Java/JS, object adapters are far more common.',
  },
  {
    id: 4,
    question: 'Which real-world analogy best illustrates the Adapter pattern?',
    options: [
      'A hotel concierge who handles all guest requests',
      'A power plug converter that lets a US plug fit into an EU socket',
      'A restaurant menu that simplifies the kitchen offerings',
      'A remote control that turns on multiple devices at once',
    ],
    correct: 1,
    explanation: 'A travel adapter converts one plug shape (interface) to another, just like the Adapter pattern converts one software interface into another.',
  },
  {
    id: 5,
    question: 'When should you prefer a Facade over an Adapter?',
    options: [
      'When you need to convert between two specific interfaces',
      'When you want to simplify and unify access to a complex subsystem',
      'When you need to support multiple inheritance',
      'When the subsystem has only one class',
    ],
    correct: 1,
    explanation: 'Use a Facade when the goal is simplification rather than interface conversion. Facades reduce the number of objects a client needs to interact with.',
  },
  {
    id: 6,
    question: 'In the wrapper pattern family, which statement is true?',
    options: [
      'Adapter, Facade, and Decorator are all structural wrapper patterns',
      'Only Adapter is a wrapper pattern',
      'Wrapper patterns are a subset of creational patterns',
      'Facade never delegates to other objects',
    ],
    correct: 0,
    explanation: 'Adapter, Facade, and Decorator are all structural patterns that "wrap" other objects. They differ in intent: Adapter converts interfaces, Facade simplifies them, and Decorator adds responsibilities.',
  },
]

// ---------------------------------------------------------------------------
// Sub-components for interactive simulations
// ---------------------------------------------------------------------------

function DataFlowArrow({ active, label, delay = 0 }) {
  return (
    <div className="flex flex-col items-center gap-1 mx-2">
      <motion.div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-quest-primary text-white' : 'bg-quest-surface border border-quest-primary/30 text-quest-muted'}`}
        animate={active ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.6, delay, repeat: active ? Infinity : 0, repeatDelay: 1.2 }}
      >
        <ArrowRight size={16} />
      </motion.div>
      {label && <span className="text-[10px] text-quest-muted whitespace-nowrap">{label}</span>}
    </div>
  )
}

function ApiBox({ title, fields, color, animatingField }) {
  return (
    <div className={`rounded-lg border p-3 min-w-[180px] ${color}`}>
      <p className="text-xs font-bold mb-2 uppercase tracking-wider">{title}</p>
      <ul className="space-y-1">
        {fields.map((f) => (
          <motion.li key={f.key}
            className={`text-xs px-2 py-1 rounded font-mono ${animatingField === f.key ? 'bg-quest-primary/20 text-quest-primary' : 'bg-quest-surface/50 text-quest-muted'}`}
            animate={animatingField === f.key ? { x: [0, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {f.label} <span className="opacity-50">: {f.type}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function AdapterSimulation() {
  const [step, setStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const timerRef = useRef(null)

  const play = useCallback(() => {
    setIsPlaying(true)
    setStep(0)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    if (step >= ADAPTER_MAPPINGS.length) {
      setIsPlaying(false)
      return
    }
    timerRef.current = setTimeout(() => setStep((s) => s + 1), 1800)
    return () => clearTimeout(timerRef.current)
  }, [step, isPlaying])

  const reset = () => { setStep(-1); setIsPlaying(false) }

  const currentMapping = step >= 0 && step < ADAPTER_MAPPINGS.length ? ADAPTER_MAPPINGS[step] : null

  return (
    <div className="space-y-4">
      <p className="text-sm text-quest-muted">
        Watch how the adapter transforms each field from the legacy payment API into the new API format.
      </p>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <ApiBox title="Old Payment API" fields={OLD_API_FIELDS} color="border-red-400/40 bg-red-500/5"
          animatingField={currentMapping ? currentMapping.from.split(' ')[0] : null} />

        <div className="flex flex-col items-center gap-2">
          <DataFlowArrow active={isPlaying} label="request" />
          <motion.div
            className="rounded-lg border-2 border-dashed border-quest-primary/50 bg-quest-primary/5 px-4 py-3 text-center"
            animate={isPlaying ? { borderColor: ['rgba(99,102,241,0.3)', 'rgba(99,102,241,0.8)', 'rgba(99,102,241,0.3)'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Plug size={20} className="mx-auto text-quest-primary mb-1" />
            <p className="text-xs font-bold text-quest-primary">ADAPTER</p>
            <p className="text-[10px] text-quest-muted">PaymentAdapter</p>
          </motion.div>
          <DataFlowArrow active={isPlaying} label="converted" delay={0.3} />
        </div>

        <ApiBox title="New Payment API" fields={NEW_API_FIELDS} color="border-green-400/40 bg-green-500/5"
          animatingField={currentMapping ? currentMapping.to.split(' ')[0] : null} />
      </div>

      {currentMapping && (
        <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-quest-surface rounded-lg p-3 border border-quest-primary/20 text-center">
          <p className="text-sm font-semibold text-quest-primary">
            Step {step + 1}: {currentMapping.from} <ArrowRight size={14} className="inline mx-1" /> {currentMapping.to}
          </p>
          <p className="text-xs text-quest-muted mt-1">{currentMapping.note}</p>
        </motion.div>
      )}

      {step >= ADAPTER_MAPPINGS.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <CheckCircle size={18} className="inline mr-2 text-green-400" />
          <span className="text-sm text-green-300">All fields successfully adapted. The legacy caller never knew the API changed.</span>
        </motion.div>
      )}

      <div className="flex gap-3 justify-center">
        <button onClick={play} disabled={isPlaying}
          className="px-4 py-2 rounded-lg bg-quest-primary text-white text-sm font-medium disabled:opacity-40 hover:bg-quest-primary/80 transition-colors">
          {step >= ADAPTER_MAPPINGS.length ? 'Replay' : 'Play Adapter'}
        </button>
        <button onClick={reset}
          className="px-4 py-2 rounded-lg border border-quest-primary/30 text-quest-muted text-sm hover:bg-quest-primary/10 transition-colors flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>
    </div>
  )
}

function FacadeSimulation() {
  const [activeSubsystems, setActiveSubsystems] = useState([])
  const [facadeActive, setFacadeActive] = useState(false)
  const [withoutFacade, setWithoutFacade] = useState(false)
  const [result, setResult] = useState(null)
  const timerRef = useRef(null)

  const runWithFacade = useCallback(() => {
    setResult(null)
    setWithoutFacade(false)
    setFacadeActive(true)
    setActiveSubsystems([])

    let idx = 0
    const activate = () => {
      if (idx < FACADE_SUBSYSTEMS.length) {
        setActiveSubsystems((prev) => [...prev, FACADE_SUBSYSTEMS[idx].id])
        idx++
        timerRef.current = setTimeout(activate, 600)
      } else {
        setTimeout(() => {
          setFacadeActive(false)
          setResult('facade')
        }, 500)
      }
    }
    timerRef.current = setTimeout(activate, 400)
  }, [])

  const runWithoutFacade = useCallback(() => {
    setResult(null)
    setFacadeActive(false)
    setWithoutFacade(true)
    setActiveSubsystems([])

    let idx = 0
    const activate = () => {
      if (idx < FACADE_SUBSYSTEMS.length) {
        setActiveSubsystems((prev) => [...prev, FACADE_SUBSYSTEMS[idx].id])
        idx++
        timerRef.current = setTimeout(activate, 600)
      } else {
        setTimeout(() => {
          setWithoutFacade(false)
          setResult('no-facade')
        }, 500)
      }
    }
    timerRef.current = setTimeout(activate, 400)
  }, [])

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const reset = () => {
    clearTimeout(timerRef.current)
    setActiveSubsystems([])
    setFacadeActive(false)
    setWithoutFacade(false)
    setResult(null)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-quest-muted">
        Compare calling a complex video-conversion subsystem directly versus through a Facade.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Without Facade */}
        <div className="border border-red-400/30 rounded-lg p-4 bg-red-500/5">
          <p className="text-xs font-bold text-red-400 mb-3 uppercase tracking-wider">Without Facade</p>
          <div className="space-y-2 mb-3">
            {FACADE_SUBSYSTEMS.map((s) => {
              const isActive = withoutFacade && activeSubsystems.includes(s.id)
              return (
                <motion.div key={s.id}
                  className={`flex items-center gap-2 text-xs p-2 rounded border ${isActive ? 'border-red-400/50 bg-red-500/10 text-red-300' : 'border-white/5 bg-quest-surface/30 text-quest-muted'}`}
                  animate={isActive ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <span>{s.icon}</span>
                  <div>
                    <p className="font-semibold">{s.label}</p>
                    <p className="text-[10px] opacity-60">{s.detail}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
          <p className="text-[10px] text-red-400/70 mb-2">Client must call each subsystem manually, handle ordering, error propagation, and cleanup.</p>
          <button onClick={runWithoutFacade} disabled={withoutFacade || facadeActive}
            className="w-full py-1.5 rounded text-xs font-medium border border-red-400/40 text-red-300 hover:bg-red-500/10 disabled:opacity-40 transition-colors">
            Run Without Facade
          </button>
        </div>

        {/* With Facade */}
        <div className="border border-green-400/30 rounded-lg p-4 bg-green-500/5">
          <p className="text-xs font-bold text-green-400 mb-3 uppercase tracking-wider">With Facade</p>

          <motion.div
            className={`rounded-lg border-2 border-dashed p-3 mb-3 text-center ${facadeActive ? 'border-green-400/60 bg-green-500/10' : 'border-green-400/20 bg-quest-surface/20'}`}
            animate={facadeActive ? { borderColor: ['rgba(74,222,128,0.3)', 'rgba(74,222,128,0.8)', 'rgba(74,222,128,0.3)'] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Layers size={20} className="mx-auto text-green-400 mb-1" />
            <p className="text-xs font-bold text-green-400">VideoConverter Facade</p>
            <p className="text-[10px] text-quest-muted">convertVideo(input, outputFormat)</p>
          </motion.div>

          <div className="space-y-1.5 mb-3">
            {FACADE_SUBSYSTEMS.map((s) => {
              const isActive = facadeActive && activeSubsystems.includes(s.id)
              return (
                <motion.div key={s.id}
                  className={`flex items-center gap-2 text-xs p-1.5 rounded ${isActive ? 'bg-green-500/10 text-green-300' : 'bg-quest-surface/20 text-quest-muted'}`}
                  animate={isActive ? { x: [0, 3, 0] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm">{s.icon}</span>
                  <span className="font-medium">{s.label}</span>
                  {isActive && <CheckCircle size={12} className="ml-auto text-green-400" />}
                </motion.div>
              )
            })}
          </div>
          <p className="text-[10px] text-green-400/70 mb-2">One call does everything. The facade orchestrates all subsystems internally.</p>
          <button onClick={runWithFacade} disabled={facadeActive || withoutFacade}
            className="w-full py-1.5 rounded text-xs font-medium border border-green-400/40 text-green-300 hover:bg-green-500/10 disabled:opacity-40 transition-colors">
            Run With Facade
          </button>
        </div>
      </div>

      {result === 'facade' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center text-sm text-green-300">
          <CheckCircle size={16} className="inline mr-1" /> Facade handled everything in one clean call. The client code stays simple.
        </motion.div>
      )}
      {result === 'no-facade' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center text-sm text-red-300">
          Done, but the client had to manage 4 subsystem calls, their ordering, and error handling. Tight coupling everywhere.
        </motion.div>
      )}

      <div className="flex justify-center">
        <button onClick={reset}
          className="px-4 py-2 rounded-lg border border-quest-primary/30 text-quest-muted text-sm hover:bg-quest-primary/10 transition-colors flex items-center gap-1">
          <RefreshCw size={14} /> Reset
        </button>
      </div>
    </div>
  )
}

function UsbAdapterVisual() {
  const [connected, setConnected] = useState(false)
  const [animating, setAnimating] = useState(false)

  const connect = () => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setConnected(true)
      setAnimating(false)
    }, 1000)
  }

  const disconnect = () => {
    setConnected(false)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-quest-muted">
        A USB-C to HDMI adapter lets a USB-C laptop output to an HDMI monitor. Neither device changes; only the adapter bridges them.
      </p>

      <div className="flex items-center justify-center gap-1 flex-wrap">
        {/* Laptop */}
        <motion.div className="rounded-lg border border-blue-400/40 bg-blue-500/5 p-4 text-center min-w-[120px]"
          animate={connected ? { borderColor: 'rgba(96,165,250,0.7)' } : {}}>
          <div className="text-3xl mb-1">💻</div>
          <p className="text-xs font-bold text-blue-400">Laptop</p>
          <p className="text-[10px] text-quest-muted">USB-C port</p>
        </motion.div>

        {/* Cable segment */}
        <motion.div className="h-0.5 bg-blue-400/40"
          animate={{ width: animating ? 40 : connected ? 40 : 20 }}
          transition={{ duration: 0.5 }} />

        {/* Adapter */}
        <motion.div
          className={`rounded-lg border-2 border-dashed px-3 py-2 text-center ${connected ? 'border-quest-primary bg-quest-primary/10' : 'border-quest-primary/30 bg-quest-surface/30'}`}
          animate={animating ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.8 }}
        >
          <Plug size={18} className="mx-auto text-quest-primary mb-1" />
          <p className="text-[10px] font-bold text-quest-primary">USB-C → HDMI</p>
          <p className="text-[10px] text-quest-muted">Adapter</p>
        </motion.div>

        {/* Cable segment */}
        <motion.div className="h-0.5 bg-green-400/40"
          animate={{ width: connected ? 40 : 20 }}
          transition={{ duration: 0.5 }} />

        {/* Monitor */}
        <motion.div className="rounded-lg border border-green-400/40 bg-green-500/5 p-4 text-center min-w-[120px]"
          animate={connected ? { borderColor: 'rgba(74,222,128,0.7)' } : {}}>
          <div className="text-3xl mb-1">🖥️</div>
          <p className="text-xs font-bold text-green-400">Monitor</p>
          <p className="text-[10px] text-quest-muted">HDMI port</p>
        </motion.div>
      </div>

      {connected && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 text-center text-xs text-green-300">
          <CheckCircle size={14} className="inline mr-1" />
          Connected! Signal flows: USB-C → Adapter (converts protocol) → HDMI. Neither device was modified.
        </motion.div>
      )}

      <div className="flex gap-3 justify-center">
        <button onClick={connected ? disconnect : connect} disabled={animating}
          className="px-4 py-2 rounded-lg bg-quest-primary text-white text-sm font-medium disabled:opacity-40 hover:bg-quest-primary/80 transition-colors">
          {connected ? 'Disconnect' : 'Plug In Adapter'}
        </button>
      </div>
    </div>
  )
}

function PlugSimulation({ onSuccess }) {
  const [slots, setSlots] = useState([
    { id: 'slot-1', source: 'XMLParser', target: 'JSONProcessor', adapterNeeded: true, adapterPlaced: false },
    { id: 'slot-2', source: 'SOAPService', target: 'RESTClient', adapterNeeded: true, adapterPlaced: false },
    { id: 'slot-3', source: 'SQLDatabase', target: 'GraphQLResolver', adapterNeeded: true, adapterPlaced: false },
  ])
  const [adaptersAvailable, setAdaptersAvailable] = useState(3)
  const [errorMsg, setErrorMsg] = useState(null)
  const allPlaced = slots.every((s) => s.adapterPlaced)

  useEffect(() => {
    if (allPlaced) onSuccess?.()
  }, [allPlaced, onSuccess])

  const placeAdapter = (slotId) => {
    if (adaptersAvailable <= 0) {
      setErrorMsg('No adapters left!')
      setTimeout(() => setErrorMsg(null), 2000)
      return
    }
    setSlots((prev) => prev.map((s) => s.id === slotId ? { ...s, adapterPlaced: true } : s))
    setAdaptersAvailable((a) => a - 1)
  }

  const resetAll = () => {
    setSlots((prev) => prev.map((s) => ({ ...s, adapterPlaced: false })))
    setAdaptersAvailable(3)
    setErrorMsg(null)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-quest-muted">
        These components have incompatible interfaces. Place an adapter between each pair to make them work together.
      </p>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Box size={16} className="text-quest-primary" />
          <span className="text-sm font-medium text-quest-text">Adapters available: {adaptersAvailable}</span>
        </div>
        <button onClick={resetAll} className="text-xs text-quest-muted hover:text-quest-primary transition-colors flex items-center gap-1">
          <RefreshCw size={12} /> Reset
        </button>
      </div>

      <div className="space-y-3">
        {slots.map((slot) => (
          <div key={slot.id} className="flex items-center gap-2 flex-wrap">
            {/* Source */}
            <div className="rounded border border-red-400/40 bg-red-500/5 px-3 py-2 text-xs font-mono text-red-300 min-w-[120px] text-center">
              {slot.source}
            </div>

            {/* Adapter slot */}
            {slot.adapterPlaced ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="rounded border-2 border-quest-primary bg-quest-primary/10 px-3 py-2 text-xs font-bold text-quest-primary flex items-center gap-1">
                <Plug size={14} /> Adapter
              </motion.div>
            ) : (
              <button onClick={() => placeAdapter(slot.id)}
                className="rounded border-2 border-dashed border-quest-primary/30 px-3 py-2 text-xs text-quest-muted hover:border-quest-primary/60 hover:bg-quest-primary/5 transition-colors cursor-pointer">
                + Place Adapter
              </button>
            )}

            <ArrowRight size={14} className="text-quest-muted" />

            {/* Target */}
            <div className={`rounded border px-3 py-2 text-xs font-mono min-w-[120px] text-center ${slot.adapterPlaced ? 'border-green-400/40 bg-green-500/5 text-green-300' : 'border-white/10 bg-quest-surface/30 text-quest-muted'}`}>
              {slot.target}
            </div>

            {slot.adapterPlaced && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <CheckCircle size={16} className="text-green-400" />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {errorMsg && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 text-center">{errorMsg}</motion.p>
      )}

      {allPlaced && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <CheckCircle size={18} className="inline mr-2 text-green-400" />
          <span className="text-sm text-green-300">All components connected! Adapters bridge every incompatible interface.</span>
        </motion.div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Level component
// ---------------------------------------------------------------------------

export default function Level34({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const sections = ['intro', 'adapter', 'facade', 'analogy', 'plug', 'quiz']
  const [currentSection, setCurrentSection] = useState(0)
  const [plugComplete, setPlugComplete] = useState(false)

  // Quiz state
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(idx)
    setShowExplanation(true)
    if (idx === QUIZ_QUESTIONS[currentQ].correct) {
      setCorrectCount((c) => c + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQ(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCorrectCount(0)
    setQuizFinished(false)
  }

  const canComplete = quizFinished && correctCount >= 4

  const goNext = () => {
    if (currentSection < sections.length - 1) setCurrentSection((s) => s + 1)
  }
  const goPrev = () => {
    if (currentSection > 0) setCurrentSection((s) => s - 1)
  }

  // ----- Render sections -----

  const renderIntro = () => (
    <motion.div key="intro" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Plug size={24} className="text-quest-primary" />
        Adapt or Die
      </h2>

      <div className="bg-quest-surface/50 rounded-lg p-4 border border-quest-secondary/20 mb-6 italic text-quest-muted">
        "The new payment provider's API is completely different from the old one. We can't rewrite every service that talks to it.
        We need to ship this migration by Friday." The tech lead stares at the dependency graph on the whiteboard.
        Forty-two microservices call the old payment API. Rewriting them all would take months.
        "What if we don't rewrite anything?" you suggest. "What if we just... adapt?"
      </div>

      <div className="prose prose-invert max-w-none space-y-4 text-quest-text leading-relaxed">
        <p>
          In large-scale systems, interfaces change all the time. New vendors, new protocols, new internal services
          replace old ones. But the consumers of those interfaces can't always change in lockstep.
          The <Term word="Adapter Pattern" definition="A structural design pattern that allows objects with incompatible interfaces to collaborate by wrapping one interface to match another." onLearn={learnTerm} /> solves
          exactly this problem: it wraps an existing interface so it looks like the one the client expects.
        </p>
        <p>
          A related pattern, the <Term word="Facade Pattern" definition="A structural pattern that provides a simplified, unified interface to a complex subsystem, reducing the number of objects the client interacts with." onLearn={learnTerm} />,
          takes a different angle. Instead of converting between two specific interfaces, it hides an entire complex subsystem behind one simple entry point.
        </p>
        <p>
          Both are <Term word="Wrapper" definition="A general term for a class that encapsulates ('wraps') another class or component, modifying or simplifying its interface." onLearn={learnTerm} /> patterns,
          but their intents differ. Understanding when to reach for each one is a critical skill in system design.
        </p>
      </div>

      <DeepDive id="adapter-facade-history" title="A brief history of structural patterns" onRead={markDeepDiveRead}>
        <p className="mb-2">
          The Gang of Four (GoF) book introduced both Adapter and Facade in 1994. Adapter was inspired by
          the real-world problem of making existing libraries work with new frameworks. Facade grew from the
          observation that subsystems in early object-oriented systems (like Smalltalk's MVC) were hard
          to use because clients had to know about too many classes.
        </p>
        <p className="mb-2">
          In modern distributed systems, these patterns appear at every level: API gateways act as facades,
          protocol adapters bridge gRPC and REST, anti-corruption layers adapt between bounded contexts in
          domain-driven design.
        </p>
        <p>
          The wrapper pattern family (Adapter, Facade, Decorator, Proxy) is arguably the most frequently
          used set of patterns in production systems. They all share the idea of indirection through wrapping,
          but each has a distinct purpose.
        </p>
      </DeepDive>
    </motion.div>
  )

  const renderAdapter = () => (
    <motion.div key="adapter" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Plug size={24} className="text-quest-primary" />
        The Adapter Pattern
      </h2>

      <div className="prose prose-invert max-w-none space-y-4 text-quest-text leading-relaxed mb-6">
        <p>
          The Adapter pattern lets you make one class's interface look like another's. You create a
          wrapper class (the <Term word="Adapter" definition="The wrapper class that implements the target interface and delegates calls to the adaptee, translating between the two." onLearn={learnTerm} />)
          that implements the <Term word="Target Interface" definition="The interface that the client expects and programs against. The adapter must conform to this interface." onLearn={learnTerm} /> and
          internally delegates to the <Term word="Adaptee" definition="The existing class with an incompatible interface that needs to be adapted." onLearn={learnTerm} />,
          translating calls along the way.
        </p>
        <p>
          There are two flavours. A <Term word="Class Adapter" definition="An adapter that uses multiple inheritance to inherit from both the target and the adaptee. Less common in languages without multiple inheritance." onLearn={learnTerm} /> uses
          multiple inheritance (rare in Java/JS). An <Term word="Object Adapter" definition="An adapter that holds a reference to the adaptee and delegates calls to it. The most common adapter implementation approach." onLearn={learnTerm} /> uses
          composition: it holds a reference to the adaptee and delegates calls. In practice, object adapters dominate.
        </p>
      </div>

      <div className="bg-quest-surface/50 rounded-lg p-5 border border-quest-primary/20">
        <h3 className="text-lg font-semibold mb-3 text-quest-primary">Interactive: Payment API Adapter</h3>
        <AdapterSimulation />
      </div>

      <DeepDive id="adapter-class-vs-object" title="Class Adapter vs Object Adapter in depth" onRead={markDeepDiveRead}>
        <p className="mb-2">
          <strong>Class Adapter:</strong> Inherits from both the Target and the Adaptee. The adapter IS-A target and IS-A adaptee.
          This only works in languages with multiple inheritance (C++, Python). The adapter can override adaptee behaviour
          directly, which is powerful but creates tight coupling.
        </p>
        <p className="mb-2">
          <strong>Object Adapter:</strong> Implements the Target interface and HAS-A reference to the Adaptee. This is more
          flexible because you can adapt any subclass of the adaptee at runtime. It follows the composition-over-inheritance
          principle and is the standard approach in Java, TypeScript, Go, and most modern languages.
        </p>
        <p>
          In distributed systems, adapters often appear as thin translation layers: a gRPC-to-REST adapter, an XML-to-JSON
          adapter, or a legacy-database-to-new-ORM adapter. The principle is always the same: wrap and translate.
        </p>
      </DeepDive>

      <DeepDive id="adapter-anti-corruption" title="Anti-corruption layer: Adapters at scale" onRead={markDeepDiveRead}>
        <p className="mb-2">
          In Domain-Driven Design (DDD), the Anti-Corruption Layer (ACL) is essentially a system-level adapter.
          When your bounded context needs to communicate with a legacy system or an external service whose model
          doesn't match yours, you build an ACL that translates between the two models.
        </p>
        <p>
          The ACL prevents the foreign model's concepts from "leaking" into your domain. It's an adapter pattern
          applied at the architectural level, and it's one of the most important patterns for maintaining clean
          boundaries in large-scale distributed systems.
        </p>
      </DeepDive>
    </motion.div>
  )

  const renderFacade = () => (
    <motion.div key="facade" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Layers size={24} className="text-quest-primary" />
        The Facade Pattern
      </h2>

      <div className="prose prose-invert max-w-none space-y-4 text-quest-text leading-relaxed mb-6">
        <p>
          While the Adapter converts between two specific interfaces, the <Term word="Facade Pattern" definition="A structural pattern that provides a simplified, unified interface to a complex subsystem, reducing the number of objects the client interacts with." onLearn={learnTerm} /> is
          about <Term word="Simplification" definition="The Facade's primary goal: reducing the complexity that clients must deal with by hiding subsystem details behind one clean interface." onLearn={learnTerm} />.
          It doesn't convert anything; it wraps an entire subsystem and exposes only the operations clients actually need.
        </p>
        <p>
          Think of it as a receptionist at a large company. Instead of navigating the org chart yourself to find the right
          person in accounting, legal, and HR, you tell the receptionist what you need and they route everything for you.
          The subsystem classes still exist and still do the real work, but clients only talk to the facade.
        </p>
        <p>
          In system design, facades appear as API gateways, SDK wrapper libraries, and service aggregators. A single
          <code className="text-quest-primary">/api/checkout</code> endpoint might internally coordinate inventory,
          payment, shipping, and notification services. That endpoint is a facade.
        </p>
      </div>

      <div className="bg-quest-surface/50 rounded-lg p-5 border border-quest-primary/20">
        <h3 className="text-lg font-semibold mb-3 text-quest-primary">Interactive: Video Conversion Facade</h3>
        <FacadeSimulation />
      </div>

      <DeepDive id="facade-vs-mediator" title="Facade vs Mediator: Similar but different" onRead={markDeepDiveRead}>
        <p className="mb-2">
          Both Facade and Mediator centralise communication. The difference is directionality.
          A Facade provides a one-way simplified interface: clients call the facade, the facade calls subsystems.
          Subsystems don't know about the facade and don't call back to it.
        </p>
        <p className="mb-2">
          A Mediator, on the other hand, manages bidirectional communication between colleagues. The colleagues
          know about the mediator and send messages through it. The mediator coordinates two-way interactions.
        </p>
        <p>
          In practice: an API gateway is a facade (clients call in, the gateway fans out). A message broker
          is a mediator (services both publish to and consume from the broker).
        </p>
      </DeepDive>

      <DeepDive id="facade-layering" title="Facades and layered architecture" onRead={markDeepDiveRead}>
        <p className="mb-2">
          Layered architectures naturally produce facades. Each layer's public API is a facade over the complexity
          within that layer. The service layer is a facade over repositories and domain logic. The controller layer
          is a facade over the service layer.
        </p>
        <p>
          The key principle: each facade should provide a cohesive set of operations. If your facade has 50 methods
          that span unrelated concerns, it's not simplifying anything. It's just a big class. Consider splitting it into
          multiple focused facades.
        </p>
      </DeepDive>
    </motion.div>
  )

  const renderAnalogy = () => (
    <motion.div key="analogy" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Plug size={24} className="text-quest-primary" />
        Real-World: USB-C to HDMI
      </h2>

      <div className="prose prose-invert max-w-none space-y-4 text-quest-text leading-relaxed mb-6">
        <p>
          The clearest real-world adapter is something you probably own: a USB-C to HDMI dongle.
          Your laptop speaks USB-C. Your monitor speaks HDMI. Neither can change its port. The adapter sits between them,
          converting the signal protocol without modifying either device.
        </p>
        <p>
          This is the essence of the Adapter pattern in software. You have a client that expects one interface
          (the monitor's HDMI input) and a service that provides a different one (the laptop's USB-C output).
          The adapter implements the expected interface and internally translates to the actual one.
        </p>
        <p>
          Notice what the adapter does NOT do: it doesn't add new features. It doesn't simplify a complex system.
          It purely converts. That's what distinguishes it from a Facade (which simplifies) or a Decorator (which adds behaviour).
        </p>
      </div>

      <div className="bg-quest-surface/50 rounded-lg p-5 border border-quest-primary/20">
        <h3 className="text-lg font-semibold mb-3 text-quest-primary">Interactive: Plug It In</h3>
        <UsbAdapterVisual />
      </div>

      <DeepDive id="adapter-real-examples" title="Adapters in the wild" onRead={markDeepDiveRead}>
        <p className="mb-2">
          <strong>java.io.InputStreamReader:</strong> Adapts an InputStream (bytes) to a Reader (characters).
          It implements the Reader interface and wraps an InputStream, converting between byte-oriented and
          character-oriented I/O.
        </p>
        <p className="mb-2">
          <strong>Arrays.asList():</strong> Wraps a Java array to make it look like a List. The underlying
          data structure doesn't change; only the interface does.
        </p>
        <p className="mb-2">
          <strong>API Gateways (as adapters):</strong> When a gateway translates between external REST and internal
          gRPC, it's acting as an adapter. When it aggregates multiple services into one response, it's acting as a facade.
          Many real systems blur the lines between patterns.
        </p>
        <p>
          <strong>ORMs:</strong> Object-Relational Mappers adapt between the relational model (tables, rows, SQL)
          and the object model (classes, instances, methods). They're essentially massive, sophisticated adapters.
        </p>
      </DeepDive>
    </motion.div>
  )

  const renderPlug = () => (
    <motion.div key="plug" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Box size={24} className="text-quest-primary" />
        Challenge: Bridge the Interfaces
      </h2>

      <div className="prose prose-invert max-w-none space-y-4 text-quest-text leading-relaxed mb-6">
        <p>
          Time to put it into practice. Below are three pairs of components with incompatible interfaces.
          Place an adapter between each pair to make them work together. In real code, each adapter would implement
          the target's expected interface and delegate to the source, translating formats along the way.
        </p>
      </div>

      <div className="bg-quest-surface/50 rounded-lg p-5 border border-quest-primary/20">
        <PlugSimulation onSuccess={() => setPlugComplete(true)} />
      </div>

      <DeepDive id="when-adapter-when-facade" title="Decision guide: Adapter vs Facade vs Decorator" onRead={markDeepDiveRead}>
        <div className="space-y-2">
          <p><strong>Use an Adapter when:</strong> you need to make an existing class work with an interface it doesn't implement. The goal is compatibility, not simplification.</p>
          <p><strong>Use a Facade when:</strong> you want to simplify interaction with a complex subsystem. The goal is to reduce the learning curve and coupling for clients.</p>
          <p><strong>Use a Decorator when:</strong> you want to add responsibilities to an object dynamically without changing its interface. The interface stays the same; the behaviour changes.</p>
          <p className="mt-2 text-quest-primary/80 font-medium">Ask yourself: Am I converting (Adapter), simplifying (Facade), or enhancing (Decorator)?</p>
        </div>
      </DeepDive>
    </motion.div>
  )

  const renderQuiz = () => {
    const q = QUIZ_QUESTIONS[currentQ]
    return (
      <motion.div key="quiz" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle size={24} className="text-quest-primary" />
          Knowledge Check
        </h2>

        {!quizFinished ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm text-quest-muted">
              <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{correctCount} correct so far</span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-quest-surface rounded-full overflow-hidden">
              <motion.div className="h-full bg-quest-primary rounded-full"
                animate={{ width: `${((currentQ) / QUIZ_QUESTIONS.length) * 100}%` }}
                transition={{ duration: 0.3 }} />
            </div>

            <div className="bg-quest-surface/50 rounded-lg p-5 border border-quest-primary/20">
              <p className="text-lg font-semibold text-quest-text mb-4">{q.question}</p>

              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  let style = 'border-white/10 hover:border-quest-primary/40 hover:bg-quest-primary/5'
                  if (selectedAnswer !== null) {
                    if (idx === q.correct) style = 'border-green-500/60 bg-green-500/10 text-green-300'
                    else if (idx === selectedAnswer) style = 'border-red-500/60 bg-red-500/10 text-red-300'
                    else style = 'border-white/5 opacity-50'
                  }
                  return (
                    <button key={idx} onClick={() => handleAnswer(idx)} disabled={selectedAnswer !== null}
                      className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${style}`}>
                      <span className="font-mono text-xs mr-2 opacity-50">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  )
                })}
              </div>

              <AnimatePresence>
                {showExplanation && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mt-4 p-3 rounded-lg bg-quest-primary/5 border border-quest-primary/20">
                    <p className="text-sm text-quest-muted">{q.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {selectedAnswer !== null && (
                <div className="mt-4 flex justify-end">
                  <button onClick={nextQuestion}
                    className="px-4 py-2 rounded-lg bg-quest-primary text-white text-sm font-medium hover:bg-quest-primary/80 transition-colors flex items-center gap-1">
                    {currentQ < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Results'}
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className={`rounded-lg p-6 text-center border ${correctCount >= 4 ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
              <p className="text-4xl font-bold mb-2">{correctCount} / {QUIZ_QUESTIONS.length}</p>
              <p className="text-lg font-semibold mb-1">
                {correctCount === QUIZ_QUESTIONS.length ? 'Perfect! Master of Structural Patterns!' :
                 correctCount >= 4 ? 'Great job! You understand Adapter and Facade well.' :
                 'Keep studying! Review the sections above and try again.'}
              </p>
              <p className="text-sm text-quest-muted">
                {correctCount >= 4 ? 'You\'re ready to move on.' : 'You need at least 4 correct answers to pass.'}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              {correctCount < 4 && (
                <button onClick={resetQuiz}
                  className="px-4 py-2 rounded-lg border border-quest-primary/30 text-quest-muted text-sm hover:bg-quest-primary/10 transition-colors flex items-center gap-1">
                  <RefreshCw size={14} /> Retry Quiz
                </button>
              )}
              {canComplete && !isCompleted && (
                <button onClick={onComplete}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-colors flex items-center gap-2">
                  <CheckCircle size={16} /> Complete Level 34
                </button>
              )}
              {isCompleted && (
                <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                  <CheckCircle size={16} /> Level Completed
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    )
  }

  const sectionRenderers = [renderIntro, renderAdapter, renderFacade, renderAnalogy, renderPlug, renderQuiz]
  const sectionLabels = ['Introduction', 'Adapter Pattern', 'Facade Pattern', 'Real-World Analogy', 'Challenge', 'Quiz']

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section navigation pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sectionLabels.map((label, idx) => (
          <button key={idx} onClick={() => setCurrentSection(idx)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${idx === currentSection ? 'bg-quest-primary text-white' : 'bg-quest-surface/50 text-quest-muted hover:bg-quest-primary/10'}`}>
            {idx < currentSection && <CheckCircle size={12} className="inline mr-1" />}
            {label}
          </button>
        ))}
      </div>

      {/* Section content */}
      <AnimatePresence mode="wait">
        {sectionRenderers[currentSection]()}
      </AnimatePresence>

      {/* Prev / Next navigation */}
      <div className="flex justify-between mt-8 pt-4 border-t border-white/5">
        <button onClick={goPrev} disabled={currentSection === 0}
          className="px-4 py-2 rounded-lg border border-quest-primary/20 text-sm text-quest-muted hover:bg-quest-primary/10 disabled:opacity-30 transition-colors">
          Previous
        </button>
        <button onClick={goNext} disabled={currentSection === sections.length - 1}
          className="px-4 py-2 rounded-lg bg-quest-primary text-white text-sm font-medium hover:bg-quest-primary/80 disabled:opacity-30 transition-colors flex items-center gap-1">
          Next <ArrowRight size={14} />
        </button>
      </div>
    </div>
  )
}

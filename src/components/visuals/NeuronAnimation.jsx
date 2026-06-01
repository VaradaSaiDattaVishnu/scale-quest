import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * NeuronAnimation -- Animated neurons firing and forming connections.
 * Shows how encoding creates connections and retrieval strengthens them.
 *
 * Props:
 *   mode           -- 'idle' | 'encoding' | 'retrieval' | 'strengthening'
 *   interactive    -- boolean, allow clicking to trigger modes
 *   showLabels     -- boolean
 */

const NEURONS = [
  { id: 0, cx: 100, cy: 80, label: 'Sensory' },
  { id: 1, cx: 200, cy: 50, label: 'Association' },
  { id: 2, cx: 300, cy: 90, label: 'Meaning' },
  { id: 3, cx: 150, cy: 170, label: 'Context' },
  { id: 4, cx: 250, cy: 180, label: 'Emotion' },
  { id: 5, cx: 350, cy: 160, label: 'Storage' },
]

// Which connections exist in each mode
const CONNECTIONS = {
  idle: [],
  encoding: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 3 },
  ],
  retrieval: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 3 },
    { from: 3, to: 4 },
    { from: 2, to: 5 },
  ],
  strengthening: [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 3 },
    { from: 3, to: 4 },
    { from: 2, to: 5 },
    { from: 1, to: 4 },
    { from: 3, to: 2 },
  ],
}

const CONNECTION_STRENGTHS = {
  idle: 0,
  encoding: 1,
  retrieval: 2,
  strengthening: 3,
}

function NeuronSvg({ neuron, isActive, strength, showLabel, onClick }) {
  const baseRadius = 18
  const activeRadius = baseRadius + strength * 2

  return (
    <g>
      {/* Glow ring */}
      {isActive && (
        <motion.circle
          cx={neuron.cx}
          cy={neuron.cy}
          r={activeRadius + 8}
          fill="none"
          stroke={strength >= 2 ? '#4F7A5A' : '#B89466'}
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.95, 1.1, 0.95],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Dendrites */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180
        const len = isActive ? 22 : 16
        const x2 = neuron.cx + Math.cos(rad) * (activeRadius + len)
        const y2 = neuron.cy + Math.sin(rad) * (activeRadius + len)
        const mx = neuron.cx + Math.cos(rad) * (activeRadius + len * 0.6)
        const my = neuron.cy + Math.sin(rad) * (activeRadius + len * 0.6) + (angle % 120 === 0 ? 4 : -4)
        return (
          <motion.path
            key={angle}
            d={`M ${neuron.cx + Math.cos(rad) * activeRadius} ${neuron.cy + Math.sin(rad) * activeRadius} Q ${mx} ${my} ${x2} ${y2}`}
            fill="none"
            stroke={isActive ? (strength >= 2 ? '#4F7A5A' : '#B89466') : 'var(--color-ink-tertiary)'}
            strokeWidth={isActive ? 1.5 : 0.8}
            opacity={isActive ? 0.7 : 0.3}
            animate={{ opacity: isActive ? 0.7 : 0.3 }}
            transition={{ duration: 0.5 }}
          />
        )
      })}

      {/* Cell body */}
      <motion.circle
        cx={neuron.cx}
        cy={neuron.cy}
        r={baseRadius}
        fill={isActive ? (strength >= 2 ? '#4F7A5A' : '#B89466') : 'var(--color-surface)'}
        stroke={isActive ? (strength >= 2 ? '#4F7A5A' : '#B89466') : 'var(--color-line-soft)'}
        strokeWidth={isActive ? 2 : 1.5}
        className={onClick ? 'cursor-pointer' : ''}
        animate={{
          fill: isActive ? (strength >= 2 ? '#4F7A5A' : '#B89466') : 'var(--color-surface)',
          scale: isActive ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: isActive ? 1.5 : 0.4,
          repeat: isActive ? Infinity : 0,
          ease: 'easeInOut',
        }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={neuron.label}
      />

      {/* Nucleus */}
      <motion.circle
        cx={neuron.cx}
        cy={neuron.cy}
        r={6}
        fill={isActive ? '#ffffff' : 'var(--color-line-soft)'}
        opacity={isActive ? 0.6 : 0.4}
        animate={{ opacity: isActive ? 0.6 : 0.4 }}
      />

      {/* Label */}
      {showLabel && (
        <text
          x={neuron.cx}
          y={neuron.cy + activeRadius + 16}
          textAnchor="middle"
          fontSize="9"
          fontFamily="Inter, system-ui"
          fill="var(--color-ink-tertiary)"
        >
          {neuron.label}
        </text>
      )}
    </g>
  )
}

function SignalPulse({ from, to, color, delay = 0 }) {
  const n1 = NEURONS[from]
  const n2 = NEURONS[to]

  return (
    <motion.circle
      r="4"
      fill={color}
      initial={{ cx: n1.cx, cy: n1.cy, opacity: 0, scale: 0 }}
      animate={{
        cx: [n1.cx, (n1.cx + n2.cx) / 2, n2.cx],
        cy: [n1.cy, (n1.cy + n2.cy) / 2, n2.cy],
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 1.2,
        delay,
        repeat: Infinity,
        repeatDelay: 1,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function NeuronAnimation({
  mode = 'idle',
  interactive = true,
  showLabels = true,
}) {
  const [currentMode, setCurrentMode] = useState(mode)
  const strength = CONNECTION_STRENGTHS[currentMode]
  const connections = CONNECTIONS[currentMode]

  // Sync external mode prop
  useEffect(() => {
    setCurrentMode(mode)
  }, [mode])

  const activeNeuronIds = new Set()
  connections.forEach((c) => {
    activeNeuronIds.add(c.from)
    activeNeuronIds.add(c.to)
  })

  const modeColor = strength >= 2 ? '#4F7A5A' : '#B89466'

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 450 240"
        className="w-full"
        style={{ maxHeight: '340px' }}
        role="img"
        aria-label={`Neural network animation showing ${currentMode} process`}
      >
        <defs>
          <filter id="neuron-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* Connection lines */}
        {connections.map((conn, idx) => {
          const n1 = NEURONS[conn.from]
          const n2 = NEURONS[conn.to]
          const lineWidth = Math.min(1 + strength * 0.8, 4)
          return (
            <g key={`conn-${conn.from}-${conn.to}`}>
              {/* Connection line */}
              <motion.line
                x1={n1.cx}
                y1={n1.cy}
                x2={n2.cx}
                y2={n2.cy}
                stroke={modeColor}
                strokeWidth={lineWidth}
                strokeLinecap="round"
                opacity={0.4 + strength * 0.15}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 0.4 + strength * 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {/* Signal pulse */}
              <SignalPulse
                from={conn.from}
                to={conn.to}
                color={modeColor}
                delay={idx * 0.3}
              />
            </g>
          )
        })}

        {/* Neurons */}
        {NEURONS.map((neuron) => (
          <NeuronSvg
            key={neuron.id}
            neuron={neuron}
            isActive={activeNeuronIds.has(neuron.id)}
            strength={strength}
            showLabel={showLabels}
          />
        ))}
      </svg>

      {/* Mode controls */}
      {interactive && (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {[
            { key: 'idle', label: 'Resting' },
            { key: 'encoding', label: 'Encoding' },
            { key: 'retrieval', label: 'Retrieval' },
            { key: 'strengthening', label: 'Repeated Retrieval' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentMode(key)}
              className={`
                text-xs font-ui px-3 py-1.5 rounded-round border transition-all
                ${currentMode === key
                  ? 'bg-grounded-15 border-grounded-30 text-grounded font-medium'
                  : 'bg-surface border-line-soft text-ink-secondary hover:border-grounded-30'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SleepConsolidationViz -- Animated visualization of sleep stages and memory.
 * Shows a brain cross-section with memories transferring during sleep phases.
 *
 * Props:
 *   autoPlay  -- boolean, auto-animate on mount
 */

const SLEEP_PHASES = [
  { id: 'awake', label: 'Awake', time: 0, color: '#B89466', description: 'Memories freshly encoded, fragile, stored in hippocampus' },
  { id: 'light', label: 'Light Sleep', time: 15, color: '#8FA1B8', description: 'Brain activity slowing, beginning transition' },
  { id: 'deep1', label: 'Deep Sleep', time: 30, color: '#5B6F8C', description: 'Slow waves -- hippocampus replays memories to cortex' },
  { id: 'rem1', label: 'REM Sleep', time: 50, color: '#7B5D8C', description: 'Dreams -- brain integrates new memories with existing ones' },
  { id: 'deep2', label: 'Deep Sleep', time: 65, color: '#5B6F8C', description: 'More replay cycles -- traces growing stronger' },
  { id: 'rem2', label: 'REM (Late)', time: 80, color: '#9B6DA8', description: 'Longer REM periods -- deeper integration and pattern finding' },
  { id: 'morning', label: 'Morning', time: 100, color: '#4F7A5A', description: 'Memories now stabilized in cortex, more retrievable' },
]

export default function SleepConsolidationViz({ autoPlay = false }) {
  const [progress, setProgress] = useState(0) // 0-100
  const [isPlaying, setIsPlaying] = useState(false)
  const animRef = useRef(null)

  const currentPhase = SLEEP_PHASES.reduce((prev, phase) =>
    progress >= phase.time ? phase : prev
  , SLEEP_PHASES[0])

  const isDeepSleep = currentPhase.id.startsWith('deep')
  const isREM = currentPhase.id.startsWith('rem')
  const isAwake = currentPhase.id === 'awake' || currentPhase.id === 'morning'

  // Memory orbs: start in center (hippocampus), move outward (cortex)
  const orbProgress = Math.min(progress / 100, 1)
  const orbsInCortex = orbProgress > 0.3

  const play = useCallback(() => {
    setIsPlaying(true)
    setProgress(0)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setProgress(0)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return
    const start = Date.now()
    const startProgress = progress
    const duration = 12000 // 12 seconds for full night

    const tick = () => {
      const elapsed = Date.now() - start
      const newProgress = startProgress + (elapsed / duration) * 100
      if (newProgress >= 100) {
        setProgress(100)
        setIsPlaying(false)
        return
      }
      setProgress(newProgress)
      animRef.current = requestAnimationFrame(tick)
    }

    animRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animRef.current)
  }, [isPlaying])

  return (
    <div className="w-full">
      {/* Brain visualization */}
      <div className="relative rounded-gentle overflow-hidden border border-line-soft" style={{ minHeight: '340px', background: `linear-gradient(180deg, ${isAwake ? '#F4F0E8' : '#1a1a2e'} 0%, ${isAwake ? '#EDE8DD' : '#16162a'} 100%)` }}>
        <motion.div
          className="absolute inset-0 transition-colors duration-1000"
          animate={{
            backgroundColor: isAwake ? 'rgba(251, 249, 244, 0)' : 'rgba(22, 20, 46, 0)',
          }}
        />

        <svg viewBox="0 0 400 280" className="w-full relative z-10">
          <defs>
            <radialGradient id="hippo-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={currentPhase.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={currentPhase.color} stopOpacity="0" />
            </radialGradient>
            <filter id="sleep-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          {/* Brain outline (cross-section) */}
          <motion.path
            d="M200 30 C120 30 60 80 55 140 C50 200 80 240 120 250 C160 260 240 260 280 250 C320 240 350 200 345 140 C340 80 280 30 200 30Z"
            fill="none"
            stroke={isAwake ? 'var(--color-line-soft)' : 'rgba(143, 161, 184, 0.3)'}
            strokeWidth="2"
          />

          {/* Brain interior fill */}
          <motion.path
            d="M200 35 C125 35 65 82 60 140 C55 198 82 236 120 246 C158 256 242 256 280 246 C318 236 345 198 340 140 C335 82 275 35 200 35Z"
            fill={isAwake ? '#F4F0E8' : '#1E1E3A'}
            opacity="0.5"
          />

          {/* Cortex (outer ring) */}
          <motion.path
            d="M200 45 C130 45 75 88 70 140 C65 192 88 228 120 238 C152 248 248 248 280 238 C312 228 335 192 330 140 C325 88 270 45 200 45Z"
            fill="none"
            stroke={orbsInCortex ? '#4F7A5A' : 'var(--color-ink-tertiary)'}
            strokeWidth="1"
            opacity={orbsInCortex ? 0.5 : 0.15}
            strokeDasharray="4 3"
          />

          {/* Hippocampus (center) */}
          <motion.ellipse
            cx="200"
            cy="150"
            rx="35"
            ry="25"
            fill={`url(#hippo-glow)`}
            stroke={currentPhase.color}
            strokeWidth="1.5"
            opacity="0.6"
            animate={{
              scale: isDeepSleep ? [1, 1.08, 1] : 1,
              opacity: progress > 50 ? 0.3 : 0.6,
            }}
            transition={{
              duration: isDeepSleep ? 2 : 0.5,
              repeat: isDeepSleep ? Infinity : 0,
              ease: 'easeInOut',
            }}
          />

          <text
            x="200"
            y="155"
            textAnchor="middle"
            fontSize="8"
            fontFamily="Inter, system-ui"
            fill={isAwake ? 'var(--color-ink-tertiary)' : 'rgba(143, 161, 184, 0.6)'}
          >
            Hippocampus
          </text>

          {/* Memory orbs */}
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
            const startR = 15 + i * 3
            const endR = 75 + i * 10
            const currentR = startR + (endR - startR) * Math.min(orbProgress * 1.5, 1)
            const cx = 200 + Math.cos(angle + orbProgress * 0.3) * currentR
            const cy = 150 + Math.sin(angle + orbProgress * 0.3) * currentR * 0.7

            const orbOpacity = orbProgress < 0.1 ? 0.8 : orbProgress > 0.8 ? 0.9 : 0.6

            return (
              <motion.g key={`orb-${i}`}>
                {/* Trail line from hippocampus */}
                {orbProgress > 0.2 && (
                  <motion.line
                    x1="200"
                    y1="150"
                    x2={cx}
                    y2={cy}
                    stroke={currentPhase.color}
                    strokeWidth="0.5"
                    opacity="0.2"
                    strokeDasharray="2 3"
                  />
                )}

                {/* The memory orb */}
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={5 + orbProgress * 3}
                  fill={progress > 60 ? '#4F7A5A' : '#B89466'}
                  opacity={orbOpacity}
                  animate={
                    isDeepSleep || isREM
                      ? { scale: [1, 1.3, 1], opacity: [orbOpacity, 1, orbOpacity] }
                      : {}
                  }
                  transition={{
                    duration: isREM ? 1 : 2,
                    delay: i * 0.2,
                    repeat: isDeepSleep || isREM ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                />

                {/* Connection lines between orbs (REM phase) */}
                {isREM && i > 0 && (
                  <motion.line
                    x1={cx}
                    y1={cy}
                    x2={200 + Math.cos(((i - 1) / 5) * Math.PI * 2 - Math.PI / 2 + orbProgress * 0.3) * (startR + (endR - startR) * Math.min(orbProgress * 1.5, 1) - (endR - startR) * 0.15)}
                    y2={150 + Math.sin(((i - 1) / 5) * Math.PI * 2 - Math.PI / 2 + orbProgress * 0.3) * (startR + (endR - startR) * Math.min(orbProgress * 1.5, 1) - (endR - startR) * 0.15) * 0.7}
                    stroke="#9B6DA8"
                    strokeWidth="1"
                    opacity="0.4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                )}
              </motion.g>
            )
          })}

          {/* Slow-wave pulses during deep sleep */}
          {isDeepSleep && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`wave-${i}`}
                  cx="200"
                  cy="150"
                  fill="none"
                  stroke="#5B6F8C"
                  strokeWidth="1"
                  initial={{ r: 20, opacity: 0.5 }}
                  animate={{ r: 120, opacity: 0 }}
                  transition={{
                    duration: 3,
                    delay: i * 1,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}

          {/* REM rapid eye movement indicator */}
          {isREM && (
            <motion.g>
              {[0, 1].map((eye) => (
                <motion.ellipse
                  key={`eye-${eye}`}
                  cx={175 + eye * 50}
                  cy="60"
                  rx="8"
                  ry="4"
                  fill="none"
                  stroke="#9B6DA8"
                  strokeWidth="1.5"
                  animate={{
                    cx: [175 + eye * 50 - 3, 175 + eye * 50 + 3, 175 + eye * 50 - 3],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              ))}
            </motion.g>
          )}

          {/* Phase label */}
          <text
            x="200"
            y="268"
            textAnchor="middle"
            fontSize="12"
            fontFamily="Inter, system-ui"
            fontWeight="600"
            fill={isAwake ? 'var(--color-ink-primary)' : 'rgba(143, 161, 184, 0.8)'}
          >
            {currentPhase.label}
          </text>
        </svg>
      </div>

      {/* Phase description */}
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPhase.id}
          className="text-xs text-ink-secondary text-center mt-3 font-ui max-w-md mx-auto"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {currentPhase.description}
        </motion.p>
      </AnimatePresence>

      {/* Timeline scrubber */}
      <div className="mt-4 px-4">
        <div className="relative">
          {/* Phase markers */}
          <div className="absolute -top-4 left-0 right-0 flex justify-between pointer-events-none">
            {SLEEP_PHASES.map((phase) => (
              <div
                key={phase.id}
                className="flex flex-col items-center"
                style={{ position: 'absolute', left: `${phase.time}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: phase.color,
                    opacity: progress >= phase.time ? 1 : 0.3,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(progress)}
            onChange={(e) => {
              setIsPlaying(false)
              setProgress(Number(e.target.value))
            }}
            className="w-full h-1 bg-line-soft rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${currentPhase.color} 0%, ${currentPhase.color} ${progress}%, var(--color-line-soft) ${progress}%, var(--color-line-soft) 100%)`,
            }}
            aria-label="Night timeline scrubber"
          />

          {/* Time labels */}
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-ui text-ink-tertiary">Evening</span>
            <span className="text-[10px] font-ui text-ink-tertiary">Night</span>
            <span className="text-[10px] font-ui text-ink-tertiary">Morning</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-3">
        {!isPlaying ? (
          <button onClick={play} className="btn btn-primary text-sm">
            {progress > 0 && progress < 100 ? 'Resume' : 'Watch a Night of Sleep'}
          </button>
        ) : (
          <button onClick={pause} className="btn btn-secondary text-sm">
            Pause
          </button>
        )}
        {progress > 0 && (
          <button onClick={reset} className="btn btn-ghost text-sm">
            Reset
          </button>
        )}
      </div>
    </div>
  )
}

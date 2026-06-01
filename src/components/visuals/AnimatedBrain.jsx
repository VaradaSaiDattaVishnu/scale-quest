import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * AnimatedBrain -- Interactive SVG brain that lights up regions.
 * Shows encoding (hippocampus, amber), consolidation (cortex waves),
 * retrieval (pathways light up sage).
 *
 * Props:
 *   activeStage  -- 'encoding' | 'consolidation' | 'retrieval' | null
 *   interactive  -- boolean, allow click/hover on regions
 *   size         -- 'sm' | 'md' | 'lg' (default 'md')
 *   onRegionClick -- callback(regionId)
 */

const REGIONS = {
  hippocampus: {
    label: 'Hippocampus',
    description: 'Converts experiences into memory traces. The gateway for new memories.',
    stage: 'encoding',
    color: '#B89466',
  },
  prefrontal: {
    label: 'Prefrontal Cortex',
    description: 'Orchestrates retrieval -- searches for and reconstructs stored memories.',
    stage: 'retrieval',
    color: '#4F7A5A',
  },
  cortex: {
    label: 'Cortex',
    description: 'Long-term storage. Memories migrate here during sleep consolidation.',
    stage: 'consolidation',
    color: '#5B6F8C',
  },
  amygdala: {
    label: 'Amygdala',
    description: 'Tags memories with emotional significance. Emotional memories encode more deeply.',
    stage: 'encoding',
    color: '#A66B5A',
  },
}

const SIZES = {
  sm: 'w-64 h-64',
  md: 'w-80 h-80',
  lg: 'w-96 h-96',
}

export default function AnimatedBrain({
  activeStage = null,
  interactive = true,
  size = 'md',
  onRegionClick,
}) {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const handleRegionClick = useCallback((regionId) => {
    setSelectedRegion((prev) => (prev === regionId ? null : regionId))
    onRegionClick?.(regionId)
  }, [onRegionClick])

  const isRegionActive = (regionId) => {
    if (selectedRegion === regionId) return true
    if (hoveredRegion === regionId) return true
    if (activeStage && REGIONS[regionId].stage === activeStage) return true
    return false
  }

  const getRegionOpacity = (regionId) => {
    if (isRegionActive(regionId)) return 1
    if (activeStage) return 0.2
    return 0.4
  }

  const activeInfo = selectedRegion ? REGIONS[selectedRegion] : hoveredRegion ? REGIONS[hoveredRegion] : null

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${SIZES[size]}`}>
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          role="img"
          aria-label="Interactive brain diagram showing memory regions"
        >
          <defs>
            {/* Glow filters for each accent color */}
            <filter id="glow-amber" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-sage" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="brain-gradient" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#F4F0E8" />
              <stop offset="100%" stopColor="#E5DFD3" />
            </radialGradient>
          </defs>

          {/* Brain outline -- stylized medical illustration */}
          <motion.path
            d="M150 40 C90 40 50 80 45 120 C40 155 50 180 55 195 C60 210 55 230 70 245 C85 260 110 265 130 260 C140 258 145 260 150 260 C155 260 160 258 170 260 C190 265 215 260 230 245 C245 230 240 210 245 195 C250 180 260 155 255 120 C250 80 210 40 150 40Z"
            fill="url(#brain-gradient)"
            stroke="var(--color-line-soft)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Brain folds (sulci) */}
          <motion.g
            stroke="var(--color-ink-tertiary)"
            strokeWidth="1"
            fill="none"
            opacity={0.3}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <path d="M100 80 C120 90 140 75 160 85 C180 95 200 80 220 90" />
            <path d="M80 120 C100 110 130 125 150 115 C170 105 200 120 230 110" />
            <path d="M70 160 C90 150 120 165 150 155 C180 145 210 160 240 150" />
            <path d="M80 195 C110 185 140 200 170 190 C200 180 220 195 235 190" />
            <path d="M130 70 C135 95 125 120 130 145" />
            <path d="M170 70 C175 95 165 120 170 145" />
            <path d="M110 130 C115 155 105 180 110 205" />
            <path d="M190 130 C195 155 185 180 190 205" />
          </motion.g>

          {/* Cortex region -- outer brain */}
          <motion.path
            d="M150 50 C95 50 60 85 55 120 C50 150 58 175 63 188 C68 200 100 210 150 210 C200 210 232 200 237 188 C242 175 250 150 245 120 C240 85 205 50 150 50Z"
            fill={REGIONS.cortex.color}
            opacity={getRegionOpacity('cortex')}
            animate={{
              opacity: getRegionOpacity('cortex'),
              scale: isRegionActive('cortex') ? 1.01 : 1,
            }}
            transition={{ duration: 0.5 }}
            filter={isRegionActive('cortex') ? 'url(#glow-blue)' : undefined}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => interactive && handleRegionClick('cortex')}
            onMouseEnter={() => interactive && setHoveredRegion('cortex')}
            onMouseLeave={() => setHoveredRegion(null)}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label="Cortex region"
          />

          {/* Hippocampus -- seahorse-shaped, center */}
          <motion.path
            d="M130 155 C125 145 130 135 140 132 C150 129 158 135 160 142 C162 149 165 155 170 158 C175 161 172 170 165 172 C158 174 150 170 145 165 C140 160 135 162 130 155Z"
            fill={REGIONS.hippocampus.color}
            opacity={getRegionOpacity('hippocampus')}
            animate={{
              opacity: getRegionOpacity('hippocampus'),
              scale: isRegionActive('hippocampus') ? [1, 1.08, 1] : 1,
            }}
            transition={{
              duration: isRegionActive('hippocampus') ? 2 : 0.5,
              repeat: isRegionActive('hippocampus') ? Infinity : 0,
              ease: 'easeInOut',
            }}
            filter={isRegionActive('hippocampus') ? 'url(#glow-amber)' : undefined}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => interactive && handleRegionClick('hippocampus')}
            onMouseEnter={() => interactive && setHoveredRegion('hippocampus')}
            onMouseLeave={() => setHoveredRegion(null)}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label="Hippocampus region"
          />

          {/* Amygdala -- small almond near hippocampus */}
          <motion.ellipse
            cx="120"
            cy="168"
            rx="12"
            ry="10"
            fill={REGIONS.amygdala.color}
            opacity={getRegionOpacity('amygdala')}
            animate={{
              opacity: getRegionOpacity('amygdala'),
              scale: isRegionActive('amygdala') ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: isRegionActive('amygdala') ? 1.5 : 0.5,
              repeat: isRegionActive('amygdala') ? Infinity : 0,
              ease: 'easeInOut',
            }}
            filter={isRegionActive('amygdala') ? 'url(#glow-amber)' : undefined}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => interactive && handleRegionClick('amygdala')}
            onMouseEnter={() => interactive && setHoveredRegion('amygdala')}
            onMouseLeave={() => setHoveredRegion(null)}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label="Amygdala region"
          />

          {/* Prefrontal cortex -- front area */}
          <motion.path
            d="M70 100 C65 85 75 70 90 65 C105 60 115 68 118 80 C120 88 115 100 105 108 C95 115 78 112 70 100Z"
            fill={REGIONS.prefrontal.color}
            opacity={getRegionOpacity('prefrontal')}
            animate={{
              opacity: getRegionOpacity('prefrontal'),
              scale: isRegionActive('prefrontal') ? 1.03 : 1,
            }}
            transition={{ duration: 0.5 }}
            filter={isRegionActive('prefrontal') ? 'url(#glow-sage)' : undefined}
            className={interactive ? 'cursor-pointer' : ''}
            onClick={() => interactive && handleRegionClick('prefrontal')}
            onMouseEnter={() => interactive && setHoveredRegion('prefrontal')}
            onMouseLeave={() => setHoveredRegion(null)}
            role={interactive ? 'button' : undefined}
            tabIndex={interactive ? 0 : undefined}
            aria-label="Prefrontal cortex region"
          />

          {/* Consolidation wave animation */}
          {activeStage === 'consolidation' && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={`wave-${i}`}
                  cx="150"
                  cy="150"
                  r="30"
                  fill="none"
                  stroke="#5B6F8C"
                  strokeWidth="1.5"
                  initial={{ r: 30, opacity: 0.6 }}
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

          {/* Retrieval pathway animation */}
          {activeStage === 'retrieval' && (
            <motion.g>
              {/* Animated signal along retrieval path */}
              <motion.path
                d="M90 85 C110 100 120 130 140 140 C150 145 160 150 170 155"
                fill="none"
                stroke="#4F7A5A"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Traveling dot along the path */}
              <motion.circle
                r="4"
                fill="#4F7A5A"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  offsetPath: "path('M90 85 C110 100 120 130 140 140 C150 145 160 150 170 155')",
                }}
              />
            </motion.g>
          )}

          {/* Encoding sparkle animation */}
          {activeStage === 'encoding' && (
            <>
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.circle
                  key={`spark-${i}`}
                  cx={130 + Math.cos(i * 1.26) * 20}
                  cy={150 + Math.sin(i * 1.26) * 15}
                  r="2"
                  fill="#B89466"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.3,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Info tooltip */}
      <AnimatePresence>
        {activeInfo && (
          <motion.div
            className="mt-4 bg-elevated rounded-calm border border-line-soft px-5 py-3 max-w-xs text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.25 }}
          >
            <p className="font-ui text-sm font-semibold text-ink-primary mb-1">
              {activeInfo.label}
            </p>
            <p className="font-ui text-xs text-ink-secondary leading-relaxed">
              {activeInfo.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage legend (when not controlled externally) */}
      {interactive && !activeStage && (
        <p className="text-xs text-ink-tertiary font-ui mt-3">
          Click or hover on a region to learn what it does
        </p>
      )}
    </div>
  )
}

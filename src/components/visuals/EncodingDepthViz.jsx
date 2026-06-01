import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * EncodingDepthViz -- Visual comparison of shallow vs deep encoding.
 * Left: word shown flat, gray, boring. Right: vivid, colorful, connected.
 * Interactive: user types a word, sees it shallow then deep encoded.
 *
 * Props:
 *   initialWord  -- optional starting word
 */

const DEEP_LAYERS = [
  { label: 'Color', icon: '🎨', description: 'Add vivid color association' },
  { label: 'Image', icon: '🖼️', description: 'Connect to a mental picture' },
  { label: 'Personal', icon: '💭', description: 'Link to your own experience' },
  { label: 'Spatial', icon: '📍', description: 'Place it somewhere in space' },
]

export default function EncodingDepthViz({ initialWord = 'Mitochondria' }) {
  const [word, setWord] = useState(initialWord)
  const [inputWord, setInputWord] = useState('')
  const [isDeep, setIsDeep] = useState(false)
  const [activeLayers, setActiveLayers] = useState([])
  const [phase, setPhase] = useState('compare') // 'compare' | 'interactive'

  const handleEncode = useCallback(() => {
    if (inputWord.trim()) {
      setWord(inputWord.trim())
      setIsDeep(false)
      setActiveLayers([])
    }
  }, [inputWord])

  const toggleLayer = useCallback((label) => {
    setActiveLayers((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    )
    setIsDeep(true)
  }, [])

  const toggleDeep = useCallback(() => {
    if (isDeep) {
      setIsDeep(false)
      setActiveLayers([])
    } else {
      setIsDeep(true)
      setActiveLayers(DEEP_LAYERS.map((l) => l.label))
    }
  }, [isDeep])

  const depthLevel = activeLayers.length

  return (
    <div className="w-full">
      {/* Side by side comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* SHALLOW encoding */}
        <motion.div
          className="relative rounded-gentle border overflow-hidden flex flex-col items-center justify-center p-6"
          style={{ minHeight: '280px' }}
          animate={{
            borderColor: !isDeep ? 'rgba(184, 148, 102, 0.4)' : 'var(--color-line-soft)',
            backgroundColor: !isDeep ? 'var(--color-surface)' : 'var(--color-surface)',
          }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide mb-6">
            Shallow Encoding
          </p>

          {/* The word, shown boringly */}
          <motion.div
            className="relative"
            animate={{
              scale: !isDeep ? 1 : 0.9,
              opacity: !isDeep ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="font-reading text-2xl text-ink-tertiary"
              style={{
                fontWeight: 400,
                letterSpacing: '0.02em',
              }}
            >
              {word}
            </motion.p>
          </motion.div>

          {/* Faint memory trace */}
          <div className="mt-6 w-full max-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-ui text-ink-tertiary">Memory trace</span>
            </div>
            <div className="h-2 bg-line-soft rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#B89466' }}
                animate={{ width: isDeep ? '15%' : '25%' }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="text-[10px] text-ink-tertiary mt-1 font-ui">Thin, fragile, single pathway</p>
          </div>

          {/* Visual metaphor: single thin line */}
          <svg className="absolute bottom-4 left-4 right-4" height="30" viewBox="0 0 200 30">
            <motion.line
              x1="10" y1="15" x2="190" y2="15"
              stroke="var(--color-ink-tertiary)"
              strokeWidth="1"
              opacity="0.2"
              strokeDasharray="4 4"
            />
          </svg>
        </motion.div>

        {/* DEEP encoding */}
        <motion.div
          className="relative rounded-gentle border overflow-hidden flex flex-col items-center justify-center p-6"
          style={{ minHeight: '280px' }}
          animate={{
            borderColor: isDeep ? 'rgba(79, 122, 90, 0.4)' : 'var(--color-line-soft)',
            backgroundColor: isDeep ? 'rgba(79, 122, 90, 0.04)' : 'var(--color-surface)',
          }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-ui text-ink-tertiary uppercase tracking-wide mb-6">
            Deep Encoding
          </p>

          {/* The word, shown vividly */}
          <motion.div
            className="relative"
            animate={{
              scale: isDeep ? 1.1 : 0.9,
              opacity: isDeep ? 1 : 0.5,
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="font-reading text-2xl font-bold"
              animate={{
                color: isDeep ? '#4F7A5A' : 'var(--color-ink-tertiary)',
                textShadow: isDeep
                  ? '0 0 20px rgba(79, 122, 90, 0.3)'
                  : '0 0 0px transparent',
              }}
              style={{
                letterSpacing: '-0.01em',
              }}
              transition={{ duration: 0.6 }}
            >
              {word}
            </motion.p>

            {/* Radiating connections (when deep) */}
            <AnimatePresence>
              {isDeep && (
                <>
                  {DEEP_LAYERS.map((layer, i) => {
                    if (!activeLayers.includes(layer.label)) return null
                    const angle = -45 + i * 30
                    const rad = (angle * Math.PI) / 180
                    const dist = 55
                    const x = Math.cos(rad) * dist
                    const y = Math.sin(rad) * dist

                    return (
                      <motion.div
                        key={layer.label}
                        className="absolute flex items-center justify-center"
                        style={{
                          left: '50%',
                          top: '50%',
                        }}
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                        animate={{ opacity: 1, x, y, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="text-lg">{layer.icon}</span>
                      </motion.div>
                    )
                  })}

                  {/* Connection lines */}
                  <svg
                    className="absolute -inset-16 pointer-events-none"
                    viewBox="-80 -80 160 160"
                  >
                    {activeLayers.map((layerLabel, i) => {
                      const angle = -45 + DEEP_LAYERS.findIndex(l => l.label === layerLabel) * 30
                      const rad = (angle * Math.PI) / 180
                      const dist = 45
                      return (
                        <motion.line
                          key={layerLabel}
                          x1="0"
                          y1="0"
                          x2={Math.cos(rad) * dist}
                          y2={Math.sin(rad) * dist}
                          stroke="#4F7A5A"
                          strokeWidth="1.5"
                          opacity="0.4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                        />
                      )
                    })}
                  </svg>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Strong memory trace */}
          <div className="mt-6 w-full max-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-ui text-ink-tertiary">Memory trace</span>
            </div>
            <div className="h-2 bg-line-soft rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: '#4F7A5A' }}
                animate={{ width: `${Math.max(15, 15 + depthLevel * 20)}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
            <p className="text-[10px] text-ink-tertiary mt-1 font-ui">
              {depthLevel === 0
                ? 'Thin, fragile, single pathway'
                : depthLevel === 1
                ? 'Stronger -- one extra pathway'
                : depthLevel <= 3
                ? 'Multiple pathways, harder to forget'
                : 'Rich web of connections, deeply anchored'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Deep encoding layer controls */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {DEEP_LAYERS.map((layer) => (
          <button
            key={layer.label}
            onClick={() => toggleLayer(layer.label)}
            className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-round text-xs font-ui border transition-all
              ${activeLayers.includes(layer.label)
                ? 'bg-grounded-15 border-grounded-30 text-grounded font-medium'
                : 'bg-surface border-line-soft text-ink-secondary hover:border-grounded-30'
              }
            `}
          >
            <span>{layer.icon}</span>
            <span>{layer.label}</span>
          </button>
        ))}
      </div>

      {/* Quick toggle */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={toggleDeep}
          className="btn btn-secondary text-sm"
        >
          {isDeep ? 'Show Shallow' : 'Show Deep Encoding'}
        </button>
      </div>

      {/* Custom word input */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <input
          type="text"
          value={inputWord}
          onChange={(e) => setInputWord(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEncode()}
          placeholder="Try your own word..."
          className="input text-sm max-w-[200px]"
          aria-label="Enter a word to encode"
        />
        <button
          onClick={handleEncode}
          disabled={!inputWord.trim()}
          className="btn btn-ghost text-sm disabled:opacity-40"
        >
          Encode it
        </button>
      </div>
    </div>
  )
}

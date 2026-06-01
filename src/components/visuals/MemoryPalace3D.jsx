import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * MemoryPalace3D -- CSS 3D perspective room walkthrough.
 * Shows an isometric-style room with locus points that glow and pulse.
 * User clicks each locus to place a vivid image.
 *
 * Props:
 *   loci       -- array of { id, label, position, item? }
 *   onPlace    -- callback(locusId, item)
 */

const DEFAULT_LOCI = [
  { id: 1, label: 'Front Door', x: 15, y: 65, item: null, emoji: null, description: 'The entrance -- first thing you see' },
  { id: 2, label: 'Coat Hook', x: 30, y: 35, item: null, emoji: null, description: 'Right by the door, at eye level' },
  { id: 3, label: 'Coffee Table', x: 50, y: 70, item: null, emoji: null, description: 'Center of the room, impossible to miss' },
  { id: 4, label: 'Bookshelf', x: 75, y: 30, item: null, emoji: null, description: 'Tall wooden shelf against the back wall' },
  { id: 5, label: 'Window Sill', x: 85, y: 55, item: null, emoji: null, description: 'Bright light streaming in' },
]

const VIVID_ITEMS = [
  { text: 'Giant glowing egg', emoji: '🥚', color: '#B89466' },
  { text: 'Dancing flame', emoji: '🔥', color: '#A66B5A' },
  { text: 'Singing crystal', emoji: '💎', color: '#5B6F8C' },
  { text: 'Living vine', emoji: '🌿', color: '#4F7A5A' },
  { text: 'Golden clock', emoji: '⏰', color: '#B89466' },
]

export default function MemoryPalace3D({ loci: externalLoci, onPlace }) {
  const [loci, setLoci] = useState(externalLoci || DEFAULT_LOCI)
  const [selectedLocus, setSelectedLocus] = useState(null)
  const [placedCount, setPlacedCount] = useState(0)
  const [viewAngle, setViewAngle] = useState(0)
  const [isWalking, setIsWalking] = useState(false)

  const handleLocusClick = useCallback((locusId) => {
    const locus = loci.find((l) => l.id === locusId)
    if (locus?.emoji) return // already placed
    setSelectedLocus(locusId)
  }, [loci])

  const placeItem = useCallback((locusId, item) => {
    setLoci((prev) =>
      prev.map((l) =>
        l.id === locusId
          ? { ...l, item: item.text, emoji: item.emoji }
          : l
      )
    )
    setSelectedLocus(null)
    setPlacedCount((c) => c + 1)
    onPlace?.(locusId, item)
  }, [onPlace])

  const walkThrough = useCallback(() => {
    setIsWalking(true)
    let step = 0
    const interval = setInterval(() => {
      step++
      setViewAngle(step * 15)
      if (step >= 8) {
        clearInterval(interval)
        setTimeout(() => {
          setIsWalking(false)
          setViewAngle(0)
        }, 500)
      }
    }, 600)
  }, [])

  const reset = useCallback(() => {
    setLoci(externalLoci || DEFAULT_LOCI)
    setSelectedLocus(null)
    setPlacedCount(0)
    setViewAngle(0)
  }, [externalLoci])

  const allPlaced = loci.every((l) => l.emoji)

  return (
    <div className="w-full">
      {/* 3D Room Container */}
      <motion.div
        className="relative rounded-gentle overflow-hidden border border-line-soft"
        style={{
          perspective: '800px',
          minHeight: '380px',
          background: 'linear-gradient(180deg, #EDE8DD 0%, #F4F0E8 40%, #D4CFC4 100%)',
        }}
        animate={{ rotateY: viewAngle }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Room interior using CSS 3D */}
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${viewAngle * 0.1}deg) rotateX(5deg)`,
          }}
        >
          {/* Floor */}
          <div
            className="absolute"
            style={{
              bottom: 0,
              left: '5%',
              right: '5%',
              height: '45%',
              background: 'linear-gradient(180deg, #D4CFC4 0%, #C9C2B4 100%)',
              transform: 'perspective(600px) rotateX(45deg)',
              transformOrigin: 'bottom center',
              borderRadius: '4px 4px 0 0',
            }}
          >
            {/* Floor planks */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={`plank-${i}`}
                className="absolute w-full border-t border-line-soft"
                style={{
                  top: `${i * 20}%`,
                  opacity: 0.3,
                }}
              />
            ))}
          </div>

          {/* Back wall */}
          <div
            className="absolute left-[10%] right-[10%] top-[8%]"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, #F4F0E8 0%, #EDE8DD 100%)',
              borderRadius: '8px 8px 0 0',
              boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.03)',
            }}
          >
            {/* Wainscoting */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '30%',
                background: '#E5DFD3',
                borderTop: '2px solid #D4CFC4',
              }}
            />
            {/* Picture frame */}
            <div
              className="absolute"
              style={{
                top: '15%',
                left: '35%',
                width: '30%',
                height: '40%',
                border: '3px solid #C9C2B4',
                borderRadius: '3px',
                background: 'linear-gradient(135deg, #A8B5A0 0%, #7A9A82 100%)',
              }}
            />
          </div>

          {/* Left wall shadow */}
          <div
            className="absolute top-[8%] bottom-[45%] left-[5%]"
            style={{
              width: '5%',
              background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 0%, transparent 100%)',
            }}
          />

          {/* Furniture silhouettes */}
          {/* Bookshelf */}
          <div
            className="absolute"
            style={{
              right: '12%',
              top: '12%',
              width: '18%',
              height: '46%',
              background: '#C9B89A',
              borderRadius: '3px',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={`shelf-${i}`}
                className="absolute left-[5%] right-[5%] border-b-2"
                style={{
                  top: `${25 + i * 20}%`,
                  borderColor: '#B5A485',
                }}
              />
            ))}
          </div>

          {/* Coffee table */}
          <div
            className="absolute"
            style={{
              left: '35%',
              bottom: '35%',
              width: '25%',
              height: '8%',
              background: '#B5A485',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* Locus Points overlaid on room */}
        {loci.map((locus) => (
          <motion.div
            key={locus.id}
            className="absolute"
            style={{
              left: `${locus.x}%`,
              top: `${locus.y}%`,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            <motion.button
              onClick={() => handleLocusClick(locus.id)}
              className={`
                relative flex items-center justify-center
                rounded-full transition-all
                ${locus.emoji
                  ? 'w-14 h-14 bg-grounded-15 border-2 border-grounded-30'
                  : 'w-10 h-10 bg-noticed-15 border-2 border-noticed-30 cursor-pointer hover:scale-110'
                }
              `}
              animate={
                !locus.emoji
                  ? {
                      scale: [1, 1.15, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(184, 148, 102, 0.4)',
                        '0 0 0 12px rgba(184, 148, 102, 0)',
                        '0 0 0 0 rgba(184, 148, 102, 0)',
                      ],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: !locus.emoji ? Infinity : 0,
                ease: 'easeInOut',
              }}
              aria-label={`Locus: ${locus.label}${locus.item ? ` - ${locus.item}` : ''}`}
            >
              {locus.emoji ? (
                <motion.span
                  className="text-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  {locus.emoji}
                </motion.span>
              ) : (
                <span className="text-sm font-ui font-bold text-noticed">{locus.id}</span>
              )}
            </motion.button>

            {/* Locus label */}
            <motion.span
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-ui text-ink-tertiary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {locus.label}
            </motion.span>
          </motion.div>
        ))}

        {/* Walking indicator */}
        {isWalking && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-elevated/90 backdrop-blur px-4 py-2 rounded-round border border-line-soft z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-ui text-ink-secondary">Walking through your palace...</p>
          </motion.div>
        )}
      </motion.div>

      {/* Item selection overlay */}
      <AnimatePresence>
        {selectedLocus !== null && (
          <motion.div
            className="mt-4 bg-elevated rounded-gentle border border-line-soft p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="font-ui text-sm text-ink-primary mb-1 font-medium">
              Place a vivid image at: {loci.find((l) => l.id === selectedLocus)?.label}
            </p>
            <p className="text-xs text-ink-tertiary mb-3 font-ui">
              Choose something bizarre and memorable
            </p>
            <div className="flex flex-wrap gap-2">
              {VIVID_ITEMS.filter((_, idx) => idx === selectedLocus - 1 || !loci.some((l) => l.item === VIVID_ITEMS[idx]?.text)).slice(0, 3).map((item) => (
                <button
                  key={item.text}
                  onClick={() => placeItem(selectedLocus, item)}
                  className="flex items-center gap-2 px-3 py-2 rounded-calm border border-line-soft bg-surface hover:bg-elevated hover:border-grounded-30 transition-all text-sm font-ui"
                >
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-ink-secondary">{item.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {allPlaced && (
          <button
            onClick={walkThrough}
            disabled={isWalking}
            className="btn btn-primary text-sm disabled:opacity-40"
          >
            Walk Through Palace
          </button>
        )}
        {placedCount > 0 && (
          <button onClick={reset} className="btn btn-ghost text-sm">
            Start Over
          </button>
        )}
      </div>

      {/* Progress */}
      {!allPlaced && placedCount > 0 && (
        <p className="text-xs text-ink-tertiary text-center mt-2 font-ui">
          {placedCount} of {loci.length} loci filled
        </p>
      )}
    </div>
  )
}

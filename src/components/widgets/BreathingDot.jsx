import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * BreathingDot -- the only persistent animation in Tapasya.
 * A soft sage circle that expands and contracts on a 4-second cycle.
 * Respects `prefers-reduced-motion` (stays still).
 * Subtle box-shadow follows the breathing rhythm.
 *
 * Props:
 *   size      -- diameter in px (default 48)
 *   className -- additional classes
 *   paused    -- freeze the animation externally
 */
export default function BreathingDot({ size = 48, className = '', paused = false }) {
  const prefersReducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(true)

  // Pause when tab is hidden to save resources
  useEffect(() => {
    const handleVisibility = () => setIsVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const shouldAnimate = !prefersReducedMotion && !paused && isVisible

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      role="img"
      aria-label="Breathing circle. Inhale as it grows, exhale as it shrinks."
    >
      <motion.div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-grounded)',
          opacity: 0.75,
        }}
        animate={
          shouldAnimate
            ? {
                scale: [1, 1.35, 1],
                opacity: [0.6, 0.9, 0.6],
                boxShadow: [
                  '0 0 0px 0px rgba(79,122,90,0.0)',
                  '0 0 24px 8px rgba(79,122,90,0.25)',
                  '0 0 0px 0px rgba(79,122,90,0.0)',
                ],
              }
            : { scale: 1, opacity: 0.7 }
        }
        transition={
          shouldAnimate
            ? {
                duration: 4,
                repeat: Infinity,
                ease: [0.4, 0.0, 0.6, 1], // inhale curve
              }
            : { duration: 0 }
        }
      />
    </div>
  )
}

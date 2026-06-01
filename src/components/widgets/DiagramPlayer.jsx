import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * DiagramPlayer -- Animated SVG that plays through a process step-by-step.
 * User controls the pace: play/pause, prev/next, scrub bar.
 *
 * Props:
 *   id             -- unique identifier
 *   steps          -- array of { at: timeMs, caption, highlightElement? }
 *   children       -- SVG content (render prop or ReactNode)
 *   svgType        -- 'forgetting-curve' | 'custom' (built-in diagram types)
 *   autoPlay       -- start playing automatically (default false)
 *   totalDuration  -- total duration in ms (default: last step + 2000)
 */

const SETTLE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

// Built-in: Forgetting Curve SVG
function ForgettingCurveSVG({ activeStep, steps }) {
  const width = 400
  const height = 200
  const padding = 40

  // Generate the exponential decay curve
  const curvePoints = []
  for (let x = 0; x <= 100; x += 1) {
    const retention = 100 * Math.exp(-x / 20) // Ebbinghaus-like
    curvePoints.push({
      x: padding + (x / 100) * (width - padding * 2),
      y: padding + ((100 - retention) / 100) * (height - padding * 2),
    })
  }

  const curvePath = curvePoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ')

  // Review bumps (simplified)
  const reviewPoints = [25, 50, 75]
  const reviewCurves = reviewPoints.map((reviewAt) => {
    const points = []
    for (let x = reviewAt; x <= 100; x += 1) {
      const delta = x - reviewAt
      const retention = 100 * Math.exp(-reviewAt / 20) + 30 * Math.exp(-delta / 25)
      points.push({
        x: padding + (x / 100) * (width - padding * 2),
        y: padding + ((100 - Math.min(retention, 100)) / 100) * (height - padding * 2),
      })
    }
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  })

  // Determine which elements to highlight based on step
  const showCurve = activeStep >= 0
  const showReview1 = activeStep >= 2
  const showReview2 = activeStep >= 3
  const showReview3 = activeStep >= 4

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Forgetting curve diagram showing memory retention over time"
    >
      {/* Grid lines */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={height - padding}
        stroke="var(--color-line-soft)"
        strokeWidth="1"
      />
      <line
        x1={padding}
        y1={height - padding}
        x2={width - padding}
        y2={height - padding}
        stroke="var(--color-line-soft)"
        strokeWidth="1"
      />

      {/* Axis labels */}
      <text
        x={padding - 4}
        y={padding - 8}
        textAnchor="end"
        className="fill-ink-tertiary"
        fontSize="10"
        fontFamily="Inter, system-ui"
      >
        100%
      </text>
      <text
        x={padding - 4}
        y={height - padding + 4}
        textAnchor="end"
        className="fill-ink-tertiary"
        fontSize="10"
        fontFamily="Inter, system-ui"
      >
        0%
      </text>
      <text
        x={width / 2}
        y={height - 8}
        textAnchor="middle"
        className="fill-ink-secondary"
        fontSize="11"
        fontFamily="Inter, system-ui"
      >
        Time
      </text>
      <text
        x={12}
        y={height / 2}
        textAnchor="middle"
        className="fill-ink-secondary"
        fontSize="11"
        fontFamily="Inter, system-ui"
        transform={`rotate(-90, 12, ${height / 2})`}
      >
        Retention
      </text>

      {/* Main forgetting curve */}
      {showCurve && (
        <motion.path
          d={curvePath}
          fill="none"
          stroke="var(--color-accent-noticed)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      )}

      {/* Review curves (spaced repetition) */}
      {showReview1 && (
        <motion.path
          d={reviewCurves[0]}
          fill="none"
          stroke="var(--color-accent-grounded)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      )}
      {showReview2 && (
        <motion.path
          d={reviewCurves[1]}
          fill="none"
          stroke="var(--color-accent-grounded)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      )}
      {showReview3 && (
        <motion.path
          d={reviewCurves[2]}
          fill="none"
          stroke="var(--color-accent-grounded)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      )}

      {/* Review markers */}
      {reviewPoints.map((rx, i) => {
        const show = (i === 0 && showReview1) || (i === 1 && showReview2) || (i === 2 && showReview3)
        if (!show) return null
        const cx = padding + (rx / 100) * (width - padding * 2)
        const cy = padding + ((100 - 100 * Math.exp(-rx / 20)) / 100) * (height - padding * 2)
        return (
          <motion.circle
            key={`review-${i}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="var(--color-accent-grounded)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
        )
      })}
    </svg>
  )
}

export default function DiagramPlayer({
  id,
  steps = [],
  children,
  svgType = 'custom',
  autoPlay = false,
  totalDuration,
}) {
  const [activeStep, setActiveStep] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const timerRef = useRef(null)
  const total = totalDuration || (steps.length > 0 ? steps[steps.length - 1].at + 2000 : 5000)

  // Step-based playback
  useEffect(() => {
    if (!isPlaying) {
      clearTimeout(timerRef.current)
      return
    }

    if (activeStep >= steps.length - 1) {
      setIsPlaying(false)
      return
    }

    const nextStep = activeStep + 1
    const currentTime = activeStep >= 0 ? steps[activeStep].at : 0
    const nextTime = steps[nextStep].at
    const delay = nextTime - currentTime

    timerRef.current = setTimeout(() => {
      setActiveStep(nextStep)
    }, delay)

    return () => clearTimeout(timerRef.current)
  }, [isPlaying, activeStep, steps])

  const handlePlayPause = useCallback(() => {
    if (activeStep >= steps.length - 1 && !isPlaying) {
      // Restart from beginning
      setActiveStep(-1)
      setIsPlaying(true)
    } else {
      setIsPlaying((p) => !p)
    }
  }, [activeStep, steps.length, isPlaying])

  const handlePrev = useCallback(() => {
    setIsPlaying(false)
    setActiveStep((s) => Math.max(-1, s - 1))
  }, [])

  const handleNext = useCallback(() => {
    setIsPlaying(false)
    setActiveStep((s) => Math.min(steps.length - 1, s + 1))
  }, [steps.length])

  const handleScrub = useCallback(
    (e) => {
      const val = parseInt(e.target.value, 10)
      setIsPlaying(false)
      setActiveStep(val)
    },
    []
  )

  const currentCaption = activeStep >= 0 ? steps[activeStep]?.caption : 'Press play to begin.'

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label="Animated diagram player"
    >
      {/* Diagram area */}
      <div className="bg-surface rounded-calm p-4 mb-4">
        {svgType === 'forgetting-curve' ? (
          <ForgettingCurveSVG activeStep={activeStep} steps={steps} />
        ) : (
          children
        )}
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          className="min-h-[48px] mb-4"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={SETTLE}
        >
          <p className="font-reading text-sm text-ink-primary leading-relaxed">
            {currentCaption}
          </p>
          {activeStep >= 0 && (
            <p className="text-xs text-ink-tertiary mt-1 font-ui">
              Step {activeStep + 1} of {steps.length}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Prev */}
        <button
          onClick={handlePrev}
          disabled={activeStep <= -1}
          className="
            btn btn-ghost p-2
            disabled:opacity-30 disabled:cursor-not-allowed
          "
          aria-label="Previous step"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={handlePlayPause}
          className="btn btn-secondary p-2"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 2L13 8L4 14V2Z" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          onClick={handleNext}
          disabled={activeStep >= steps.length - 1}
          className="
            btn btn-ghost p-2
            disabled:opacity-30 disabled:cursor-not-allowed
          "
          aria-label="Next step"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M6 3L11 8L6 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Scrub bar */}
        <div className="flex-1 mx-2">
          <input
            type="range"
            min={-1}
            max={steps.length - 1}
            value={activeStep}
            onChange={handleScrub}
            className="
              w-full h-1 appearance-none
              bg-line-soft rounded-round
              cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-accent-stilled
              [&::-webkit-slider-thumb]:border-0
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-accent-stilled
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer
            "
            aria-label="Diagram step scrubber"
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-valuenow={activeStep + 1}
            aria-valuetext={`Step ${activeStep + 1} of ${steps.length}`}
          />
        </div>
      </div>

      <p className="text-xs text-ink-tertiary mt-2 font-ui text-center">
        Go at your own pace. Use the arrows or drag the slider.
      </p>
    </div>
  )
}

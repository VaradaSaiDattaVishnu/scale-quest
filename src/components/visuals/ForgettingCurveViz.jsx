import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ForgettingCurveViz -- Interactive, animated forgetting curve chart.
 * The curve draws itself. Users click "Add review" to bump retention back up
 * and watch each subsequent curve drop more slowly.
 *
 * Props:
 *   autoPlay    -- boolean, auto-animate on mount
 *   showReviews -- boolean, show review buttons (default true)
 *   compact     -- boolean, smaller version for inline use
 */

const TIME_LABELS = ['0', '20min', '1hr', '9hr', '1d', '2d', '6d', '31d']
const CHART_W = 600
const CHART_H = 300
const PADDING = { top: 20, right: 20, bottom: 40, left: 50 }
const INNER_W = CHART_W - PADDING.left - PADDING.right
const INNER_H = CHART_H - PADDING.top - PADDING.bottom

// Ebbinghaus-style exponential decay: R = e^(-t/S)
// S = stability factor, increases with each review
function forgettingCurve(startRetention, stability, numPoints = 50) {
  const points = []
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1)
    const retention = startRetention * Math.exp((-t * 5) / stability)
    points.push({ t, r: Math.max(retention, 0) })
  }
  return points
}

function toSvgPath(points, offsetX = 0) {
  return points
    .map((p, i) => {
      const x = PADDING.left + offsetX + p.t * (INNER_W - offsetX)
      const y = PADDING.top + INNER_H - p.r * INNER_H
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

export default function ForgettingCurveViz({
  autoPlay = true,
  showReviews = true,
  compact = false,
}) {
  const [reviews, setReviews] = useState([])
  const maxReviews = 4

  const addReview = useCallback(() => {
    if (reviews.length >= maxReviews) return
    setReviews((prev) => [...prev, { time: Date.now() }])
  }, [reviews.length])

  const reset = useCallback(() => {
    setReviews([])
  }, [])

  // Build curve segments: initial + one per review
  const segments = useMemo(() => {
    const segs = []
    const baseStability = 0.8

    // Initial curve (no reviews)
    const initialCurve = forgettingCurve(1, baseStability, 50)
    segs.push({
      points: initialCurve,
      offsetX: 0,
      stability: baseStability,
      color: '#B89466', // amber for forgetting
    })

    // Each review bumps retention and increases stability
    reviews.forEach((_, idx) => {
      const newStability = baseStability + (idx + 1) * 0.7
      const prevSeg = segs[segs.length - 1]
      // Review happens at roughly this fraction of the timeline
      const reviewFraction = (idx + 1) / (maxReviews + 1)
      const offsetX = reviewFraction * INNER_W

      // Retention at review time from previous curve
      const prevRetention = prevSeg.points[Math.floor(reviewFraction / prevSeg.points[prevSeg.points.length - 1].t * (prevSeg.points.length - 1))]?.r || 0.3
      const bumpedRetention = Math.min(prevRetention + 0.5, 1)

      const curve = forgettingCurve(bumpedRetention, newStability, 50)
      // Interpolate color from amber to sage as stability increases
      const progress = Math.min((idx + 1) / maxReviews, 1)
      const r = Math.round(184 + (79 - 184) * progress)
      const g = Math.round(148 + (122 - 148) * progress)
      const b = Math.round(102 + (90 - 102) * progress)

      segs.push({
        points: curve,
        offsetX,
        stability: newStability,
        color: `rgb(${r}, ${g}, ${b})`,
      })
    })

    return segs
  }, [reviews])

  const chartHeight = compact ? 220 : 300
  const viewBox = `0 0 ${CHART_W} ${chartHeight}`

  return (
    <div className="w-full">
      <div className="relative">
        <svg
          viewBox={viewBox}
          className="w-full"
          role="img"
          aria-label="Interactive forgetting curve showing how reviews improve retention over time"
          style={{ maxHeight: compact ? '220px' : '340px' }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
            const y = PADDING.top + INNER_H - frac * INNER_H
            return (
              <g key={`grid-${frac}`}>
                <line
                  x1={PADDING.left}
                  y1={y}
                  x2={PADDING.left + INNER_W}
                  y2={y}
                  stroke="var(--color-line-soft)"
                  strokeWidth="0.5"
                  strokeDasharray={frac === 0 ? 'none' : '4 4'}
                />
                <text
                  x={PADDING.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fontFamily="Inter, system-ui"
                  fill="var(--color-ink-tertiary)"
                >
                  {Math.round(frac * 100)}%
                </text>
              </g>
            )
          })}

          {/* X axis labels */}
          {TIME_LABELS.map((label, i) => {
            const x = PADDING.left + (i / (TIME_LABELS.length - 1)) * INNER_W
            return (
              <text
                key={label}
                x={x}
                y={PADDING.top + INNER_H + 25}
                textAnchor="middle"
                fontSize="10"
                fontFamily="Inter, system-ui"
                fill="var(--color-ink-tertiary)"
              >
                {label}
              </text>
            )
          })}

          {/* Y axis label */}
          <text
            x={12}
            y={PADDING.top + INNER_H / 2}
            textAnchor="middle"
            fontSize="10"
            fontFamily="Inter, system-ui"
            fill="var(--color-ink-tertiary)"
            transform={`rotate(-90, 12, ${PADDING.top + INNER_H / 2})`}
          >
            Retention
          </text>

          {/* Axes */}
          <line
            x1={PADDING.left}
            y1={PADDING.top}
            x2={PADDING.left}
            y2={PADDING.top + INNER_H}
            stroke="var(--color-ink-tertiary)"
            strokeWidth="1"
            opacity="0.5"
          />
          <line
            x1={PADDING.left}
            y1={PADDING.top + INNER_H}
            x2={PADDING.left + INNER_W}
            y2={PADDING.top + INNER_H}
            stroke="var(--color-ink-tertiary)"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Curve segments */}
          {segments.map((seg, idx) => (
            <motion.path
              key={`curve-${idx}`}
              d={toSvgPath(seg.points, seg.offsetX)}
              fill="none"
              stroke={seg.color}
              strokeWidth={idx === segments.length - 1 ? 3 : 2}
              strokeLinecap="round"
              opacity={idx === segments.length - 1 ? 1 : 0.4}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: idx === 0 && autoPlay ? 2 : 0.8,
                delay: idx === 0 && autoPlay ? 0.3 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}

          {/* Review markers */}
          {reviews.map((_, idx) => {
            const reviewFraction = (idx + 1) / (maxReviews + 1)
            const x = PADDING.left + reviewFraction * INNER_W

            // Calculate where the bump goes
            const prevSeg = segments[idx]
            const prevPoints = prevSeg.points
            const tFrac = reviewFraction
            const nearestIdx = Math.min(
              Math.floor(tFrac * (prevPoints.length - 1)),
              prevPoints.length - 1
            )
            const bottomR = prevPoints[nearestIdx]?.r || 0.3
            const topR = Math.min(bottomR + 0.5, 1)
            const bottomY = PADDING.top + INNER_H - bottomR * INNER_H
            const topY = PADDING.top + INNER_H - topR * INNER_H

            return (
              <motion.g
                key={`review-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {/* Vertical boost line */}
                <motion.line
                  x1={x}
                  y1={bottomY}
                  x2={x}
                  y2={topY}
                  stroke="#4F7A5A"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Arrow head */}
                <motion.polygon
                  points={`${x - 4},${topY + 8} ${x},${topY} ${x + 4},${topY + 8}`}
                  fill="#4F7A5A"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                />
                {/* Label */}
                <text
                  x={x}
                  y={topY - 8}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="Inter, system-ui"
                  fill="var(--color-accent-grounded)"
                  fontWeight="600"
                >
                  Review {idx + 1}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* Controls */}
      {showReviews && (
        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={addReview}
            disabled={reviews.length >= maxReviews}
            className="btn btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {reviews.length >= maxReviews
              ? 'Maximum reviews added'
              : `Add Review ${reviews.length + 1}`}
          </button>
          {reviews.length > 0 && (
            <button
              onClick={reset}
              className="btn btn-ghost text-sm"
            >
              Reset
            </button>
          )}
        </div>
      )}

      {/* Insight text based on reviews */}
      <AnimatePresence mode="wait">
        {reviews.length > 0 && (
          <motion.p
            key={`insight-${reviews.length}`}
            className="text-xs text-ink-secondary text-center mt-3 font-ui max-w-md mx-auto"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {reviews.length === 1 && 'One review bumps retention back up -- but notice how quickly it still drops.'}
            {reviews.length === 2 && 'After two reviews, the curve drops more slowly. The memory is stabilizing.'}
            {reviews.length === 3 && 'Three reviews: the slope is noticeably gentler. Each review trains the memory to persist longer.'}
            {reviews.length === 4 && 'Four well-timed reviews. The memory now persists for weeks. This is the power of spaced repetition.'}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

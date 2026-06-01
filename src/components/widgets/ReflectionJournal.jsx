import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * ReflectionJournal -- Open journal entry tied to a lesson. Never graded.
 * Saves to localStorage. Explicitly private.
 *
 * Props:
 *   prompt    -- the reflection prompt
 *   lessonId  -- for storage key
 *   onSave    -- optional callback({ text, timestamp })
 */

const SETTLE = { duration: 0.28, ease: [0.22, 1, 0.36, 1] }

export default function ReflectionJournal({ prompt, lessonId, onSave }) {
  const storageKey = `tapasya-journal-${lessonId}`
  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  // Load existing entry on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        setText(parsed.text || '')
        setLastSaved(parsed.timestamp)
      }
    } catch {
      // localStorage may be unavailable
    }
  }, [storageKey])

  const saveEntry = useCallback(() => {
    const now = Date.now()
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ text, timestamp: now })
      )
      setLastSaved(now)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
      onSave?.({ text, timestamp: now })
    } catch {
      // localStorage may be unavailable
    }
  }, [text, storageKey, onSave])

  // Auto-save on blur
  const handleBlur = useCallback(() => {
    if (text.trim()) {
      saveEntry()
    }
  }, [text, saveEntry])

  // Format last saved time
  const formatTime = (timestamp) => {
    if (!timestamp) return null
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div
      className="card-flat my-6"
      role="region"
      aria-label="Reflection journal"
    >
      {/* Prompt */}
      {prompt && (
        <p className="font-reading text-body text-ink-primary leading-relaxed mb-4">
          {prompt}
        </p>
      )}

      {/* Privacy notice */}
      <p className="text-xs text-ink-tertiary mb-3 font-ui flex items-center gap-1.5">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="6"
            width="8"
            height="6"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path
            d="M5 6V4.5C5 3.12 5.9 2 7 2C8.1 2 9 3.12 9 4.5V6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        This is yours. It won't be graded or analyzed. It stays on your device.
      </p>

      {/* Text area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write freely..."
        rows={5}
        className="
          input w-full resize-y min-h-[120px]
          font-reading text-body leading-relaxed
          mb-3
        "
        aria-label="Journal entry"
      />

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={saveEntry}
          disabled={!text.trim()}
          className="btn btn-secondary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save
        </button>

        {/* Save status */}
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.p
              key="saved"
              className="text-xs text-accent-grounded font-ui flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SETTLE}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6.5L4.5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Saved
            </motion.p>
          ) : lastSaved ? (
            <motion.p
              key="last-saved"
              className="text-xs text-ink-tertiary font-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={SETTLE}
            >
              Last saved {formatTime(lastSaved)}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

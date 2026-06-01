import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle, ChevronDown, ChevronUp, HelpCircle,
  Film, Armchair, Clock, CreditCard, Users, Lock,
  ArrowRight, AlertTriangle, RefreshCw, Zap
} from 'lucide-react'

/* ── Helper: Term tooltip ── */
function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="term cursor-pointer"
        onMouseEnter={() => { setShowTooltip(true); onLearn?.(word) }}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => { setShowTooltip(!showTooltip); onLearn?.(word) }}
      >
        {word}
      </span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 z-50"
          >
            <p className="font-semibold text-quest-primary mb-1">{word}</p>
            <p className="text-sm text-quest-text">{definition}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

/* ── Helper: DeepDive expandable ── */
function DeepDive({ id, title, children, onRead }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-quest-surface/50 rounded-lg border border-quest-secondary/30 overflow-hidden my-6">
      <button
        onClick={() => { setIsOpen(!isOpen); if (!isOpen) onRead?.(id) }}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-quest-secondary/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-quest-secondary" />
          <span className="font-semibold">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4"
          >
            <div className="pt-2 border-t border-white/5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Constants ── */

const ROWS = 8
const COLS = 12
const LOCK_DURATION = 30 // seconds

const SEAT_STATES = {
  AVAILABLE: 'available',
  SELECTED: 'selected',
  LOCKED: 'locked',
  BOOKED: 'booked',
  LOCKED_OTHER: 'locked_other',
}

const seatColors = {
  [SEAT_STATES.AVAILABLE]: 'bg-emerald-500/30 border-emerald-500/40 hover:bg-emerald-500/50',
  [SEAT_STATES.SELECTED]: 'bg-sky-500/50 border-sky-400 ring-1 ring-sky-400/30',
  [SEAT_STATES.LOCKED]: 'bg-amber-500/40 border-amber-500/50',
  [SEAT_STATES.BOOKED]: 'bg-red-500/30 border-red-500/40 cursor-not-allowed',
  [SEAT_STATES.LOCKED_OTHER]: 'bg-orange-500/30 border-orange-400/40 cursor-not-allowed',
}

const seatLabels = {
  [SEAT_STATES.AVAILABLE]: 'Available',
  [SEAT_STATES.SELECTED]: 'Your Selection',
  [SEAT_STATES.LOCKED]: 'Locked (You)',
  [SEAT_STATES.BOOKED]: 'Booked',
  [SEAT_STATES.LOCKED_OTHER]: 'Locked (Other)',
}

const rowLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

const classData = [
  {
    name: 'Show',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    fields: ['showId: string', 'movie: Movie', 'screen: Screen', 'showTime: DateTime', 'availableSeats: int'],
    methods: ['getAvailableSeats()', 'lockSeat(seatId, userId)', 'confirmBooking(bookingId)'],
  },
  {
    name: 'Theater',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    fields: ['theaterId: string', 'name: string', 'location: Address', 'screens: Screen[]'],
    methods: ['getShows(date)', 'getScreen(screenId)'],
  },
  {
    name: 'Screen',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    fields: ['screenId: string', 'name: string', 'seats: Seat[]', 'totalCapacity: int'],
    methods: ['getSeatMap()', 'getSeatById(seatId)'],
  },
  {
    name: 'Seat',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    fields: ['seatId: string', 'row: char', 'number: int', 'type: SeatType', 'price: Money'],
    methods: ['isAvailable(showId)', 'lock(userId, ttl)', 'release()'],
  },
  {
    name: 'Booking',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    fields: ['bookingId: string', 'show: Show', 'seats: Seat[]', 'user: User', 'status: BookingStatus', 'payment: Payment'],
    methods: ['initiate()', 'confirm(paymentId)', 'cancel()', 'expire()'],
  },
  {
    name: 'Payment',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    fields: ['paymentId: string', 'amount: Money', 'status: PaymentStatus', 'gateway: string'],
    methods: ['process()', 'refund()', 'verifyCallback()'],
  },
]

const bookingFlowSteps = [
  { label: 'Browse', icon: Film, desc: 'User selects movie, theater, and showtime', color: 'text-purple-400' },
  { label: 'Select Seats', icon: Armchair, desc: 'User picks seats from the seat map', color: 'text-sky-400' },
  { label: 'Lock', icon: Lock, desc: 'Server locks selected seats with a TTL (e.g. 5 min)', color: 'text-amber-400' },
  { label: 'Payment', icon: CreditCard, desc: 'User completes payment within timeout window', color: 'text-green-400' },
  { label: 'Confirm', icon: CheckCircle, desc: 'On payment success, booking is confirmed and seats are permanently reserved', color: 'text-emerald-400' },
]

const quizQuestions = [
  {
    id: 'q1',
    question: 'Why do we lock seats temporarily instead of immediately marking them as booked?',
    options: [
      { id: 'a', text: 'To allow the user time to complete payment before permanently reserving', correct: true },
      { id: 'b', text: 'Because the database cannot handle permanent writes', correct: false },
      { id: 'c', text: 'To let multiple users book the same seat simultaneously', correct: false },
      { id: 'd', text: 'Locking is just a UI effect with no backend impact', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'What happens when a seat lock expires?',
    options: [
      { id: 'a', text: 'The booking is automatically confirmed', correct: false },
      { id: 'b', text: 'The seat becomes available for other users to select', correct: true },
      { id: 'c', text: 'The user is charged anyway', correct: false },
      { id: 'd', text: 'The seat is permanently removed from the map', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Two users click the same seat at the exact same time. How is this conflict resolved?',
    options: [
      { id: 'a', text: 'Both users get the seat and the system handles it later', correct: false },
      { id: 'b', text: 'The frontend prevents this from ever happening', correct: false },
      { id: 'c', text: 'An atomic compare-and-swap (or SELECT FOR UPDATE) ensures only one lock succeeds', correct: true },
      { id: 'd', text: 'A random user is picked by the load balancer', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Which class is responsible for managing the TTL-based lock on a seat?',
    options: [
      { id: 'a', text: 'Theater', correct: false },
      { id: 'b', text: 'Booking', correct: false },
      { id: 'c', text: 'Seat (via lock/release methods)', correct: true },
      { id: 'd', text: 'Payment', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is the correct order of the booking flow?',
    options: [
      { id: 'a', text: 'Select -> Pay -> Lock -> Confirm', correct: false },
      { id: 'b', text: 'Select -> Lock -> Pay -> Confirm', correct: true },
      { id: 'c', text: 'Lock -> Select -> Confirm -> Pay', correct: false },
      { id: 'd', text: 'Pay -> Select -> Lock -> Confirm', correct: false },
    ],
  },
]

/* ── Initial seat map with some pre-booked seats ── */
function createInitialSeats() {
  const seats = {}
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const id = `${rowLabels[r]}${c + 1}`
      seats[id] = SEAT_STATES.AVAILABLE
    }
  }
  // Pre-book some seats for realism
  const preBooked = ['A3', 'A4', 'B6', 'B7', 'B8', 'C2', 'D5', 'D6', 'E10', 'E11', 'F1', 'G8', 'G9', 'H4']
  preBooked.forEach(id => { seats[id] = SEAT_STATES.BOOKED })
  return seats
}

/* ══════════════════════════════════════════════════════════════════ */

export default function Level47({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [seats, setSeats] = useState(createInitialSeats)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [lockTimer, setLockTimer] = useState(null)
  const [lockCountdown, setLockCountdown] = useState(0)
  const [bookingPhase, setBookingPhase] = useState('select') // select | locked | paying | confirmed | expired
  const [concurrentDemo, setConcurrentDemo] = useState({ running: false, step: 0, winner: null })
  const [activeFlowStep, setActiveFlowStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Lock countdown timer ── */
  useEffect(() => {
    if (bookingPhase !== 'locked' && bookingPhase !== 'paying') return
    if (lockCountdown <= 0) {
      // Lock expired
      handleLockExpired()
      return
    }
    const interval = setInterval(() => {
      setLockCountdown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [lockCountdown, bookingPhase])

  /* ── Booking flow step animation ── */
  useEffect(() => {
    if (currentSection !== 2) return
    const interval = setInterval(() => {
      setActiveFlowStep(prev => (prev + 1) % bookingFlowSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [currentSection])

  const handleSeatClick = useCallback((seatId) => {
    if (bookingPhase !== 'select') return
    const state = seats[seatId]
    if (state === SEAT_STATES.BOOKED || state === SEAT_STATES.LOCKED_OTHER) return

    if (state === SEAT_STATES.SELECTED) {
      setSelectedSeats(prev => prev.filter(s => s !== seatId))
      setSeats(prev => ({ ...prev, [seatId]: SEAT_STATES.AVAILABLE }))
    } else if (state === SEAT_STATES.AVAILABLE) {
      if (selectedSeats.length >= 6) return // max 6 seats
      setSelectedSeats(prev => [...prev, seatId])
      setSeats(prev => ({ ...prev, [seatId]: SEAT_STATES.SELECTED }))
    }
  }, [bookingPhase, seats, selectedSeats])

  const handleLockSeats = useCallback(() => {
    if (selectedSeats.length === 0) return
    setSeats(prev => {
      const next = { ...prev }
      selectedSeats.forEach(id => { next[id] = SEAT_STATES.LOCKED })
      return next
    })
    setBookingPhase('locked')
    setLockCountdown(LOCK_DURATION)
  }, [selectedSeats])

  const handlePay = useCallback(() => {
    setBookingPhase('paying')
    // Simulate payment processing
    setTimeout(() => {
      setSeats(prev => {
        const next = { ...prev }
        selectedSeats.forEach(id => { next[id] = SEAT_STATES.BOOKED })
        return next
      })
      setBookingPhase('confirmed')
      setLockCountdown(0)
    }, 2500)
  }, [selectedSeats])

  const handleLockExpired = useCallback(() => {
    setSeats(prev => {
      const next = { ...prev }
      selectedSeats.forEach(id => {
        if (next[id] === SEAT_STATES.LOCKED) {
          next[id] = SEAT_STATES.AVAILABLE
        }
      })
      return next
    })
    setBookingPhase('expired')
    setLockCountdown(0)
  }, [selectedSeats])

  const handleReset = useCallback(() => {
    setSeats(createInitialSeats())
    setSelectedSeats([])
    setBookingPhase('select')
    setLockCountdown(0)
    setConcurrentDemo({ running: false, step: 0, winner: null })
  }, [])

  /* ── Concurrent booking demo ── */
  const runConcurrentDemo = useCallback(() => {
    setConcurrentDemo({ running: true, step: 0, winner: null })
    const targetSeat = 'C7'

    // Step 0: Both users see C7 as available
    setSeats(prev => ({ ...prev, [targetSeat]: SEAT_STATES.AVAILABLE }))

    setTimeout(() => {
      setConcurrentDemo(prev => ({ ...prev, step: 1 }))
      // Step 1: Both try to select
    }, 1200)

    setTimeout(() => {
      setConcurrentDemo(prev => ({ ...prev, step: 2 }))
      // Step 2: Server receives both requests
    }, 2400)

    setTimeout(() => {
      // Step 3: Atomic lock - User A wins
      setSeats(prev => ({ ...prev, [targetSeat]: SEAT_STATES.LOCKED }))
      setConcurrentDemo(prev => ({ ...prev, step: 3, winner: 'A' }))
    }, 3600)

    setTimeout(() => {
      // Step 4: User B gets rejection
      setConcurrentDemo(prev => ({ ...prev, step: 4 }))
    }, 4800)

    setTimeout(() => {
      setConcurrentDemo(prev => ({ ...prev, step: 5, running: false }))
    }, 6000)
  }, [])

  /* ── Quiz ── */
  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(q => {
      const selected = quizAnswers[q.id]
      return q.options.find(o => o.id === selected)?.correct
    })
    if (allCorrect && !isCompleted) {
      onComplete?.()
    }
  }

  const formatTime = (s) => {
    const mins = Math.floor(s / 60)
    const secs = s % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const seatPrice = (seatId) => {
    const row = seatId[0]
    if (['A', 'B'].includes(row)) return 350
    if (['C', 'D', 'E'].includes(row)) return 250
    return 150
  }

  const totalPrice = selectedSeats.reduce((sum, id) => sum + seatPrice(id), 0)

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm mb-4">
          <Film size={16} />
          Level 47 — LLD Interview Problem
        </div>
        <h1 className="text-4xl font-bold mb-3">Book Your Show</h1>
        <p className="text-quest-muted text-lg max-w-2xl mx-auto">
          Design BookMyShow: Two users select the same seat at the same time. Only one should get it. How?
        </p>
      </motion.div>

      {/* ── Section Navigation ── */}
      <div className="flex gap-2 justify-center flex-wrap">
        {['Seat Map', 'Concurrency', 'Booking Flow', 'Class Design', 'Quiz'].map((label, i) => (
          <button
            key={label}
            onClick={() => setCurrentSection(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === i
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-quest-surface border border-white/10 text-quest-muted hover:text-quest-text hover:border-white/20'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: SEAT MAP ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Armchair className="text-sky-400" />
              Interactive Seat Map
            </h2>
            <p className="text-quest-muted mb-2">
              A movie booking system must display a real-time{' '}
              <Term
                word="Seat Map"
                definition="A visual grid representing all seats in a theater screen. Each seat has a state: available, selected, locked, or booked. The map must reflect changes in near-real-time across all connected users."
                onLearn={learnTerm}
              />{' '}
              that supports{' '}
              <Term
                word="Seat Locking"
                definition="A temporary reservation mechanism where a seat is held for a specific user for a limited time (TTL). If the user does not complete payment within the lock window, the seat is automatically released."
                onLearn={learnTerm}
              />{' '}
              to prevent double-booking while users complete payment.
            </p>
            <p className="text-sm text-quest-muted mb-6">
              Select up to 6 seats, lock them, and complete the booking. Watch the timer -- if it expires, your seats are released!
            </p>

            {/* Screen indicator */}
            <div className="mb-8">
              <div className="w-3/4 mx-auto h-2 bg-gradient-to-r from-transparent via-sky-500/60 to-transparent rounded-full mb-1" />
              <p className="text-center text-xs text-quest-muted uppercase tracking-widest">Screen</p>
            </div>

            {/* Seat Grid */}
            <div className="flex flex-col items-center gap-1.5 mb-6">
              {Array.from({ length: ROWS }, (_, r) => (
                <div key={r} className="flex items-center gap-1.5">
                  <span className="w-6 text-xs text-quest-muted text-right font-mono">{rowLabels[r]}</span>
                  {Array.from({ length: COLS }, (_, c) => {
                    const seatId = `${rowLabels[r]}${c + 1}`
                    const state = seats[seatId]
                    const isClickable = bookingPhase === 'select' &&
                      (state === SEAT_STATES.AVAILABLE || state === SEAT_STATES.SELECTED)

                    return (
                      <motion.button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        disabled={!isClickable}
                        whileHover={isClickable ? { scale: 1.15 } : {}}
                        whileTap={isClickable ? { scale: 0.95 } : {}}
                        className={`w-8 h-8 rounded-md border text-[10px] font-mono transition-all
                          ${seatColors[state]}
                          ${isClickable ? 'cursor-pointer' : ''}
                          ${state === SEAT_STATES.LOCKED ? 'animate-pulse' : ''}`}
                        title={`${seatId} - ${seatLabels[state]} - Rs ${seatPrice(seatId)}`}
                      >
                        {c + 1}
                      </motion.button>
                    )
                  })}
                  <span className="w-6 text-xs text-quest-muted font-mono">{rowLabels[r]}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-6">
              {Object.entries(seatLabels).map(([state, label]) => (
                <div key={state} className="flex items-center gap-1.5">
                  <div className={`w-4 h-4 rounded-sm border ${seatColors[state].split(' hover')[0]}`} />
                  <span className="text-xs text-quest-muted">{label}</span>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="flex items-center justify-center gap-6 mb-6 text-xs text-quest-muted">
              <span className="text-purple-400">Rows A-B: Rs 350</span>
              <span className="text-sky-400">Rows C-E: Rs 250</span>
              <span className="text-green-400">Rows F-H: Rs 150</span>
            </div>

            {/* Booking Status Panel */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-sm">Booking Status</h4>
                  <p className="text-xs text-quest-muted mt-1">
                    {bookingPhase === 'select' && `${selectedSeats.length} seat(s) selected`}
                    {bookingPhase === 'locked' && 'Seats locked -- proceed to payment'}
                    {bookingPhase === 'paying' && 'Processing payment...'}
                    {bookingPhase === 'confirmed' && 'Booking confirmed!'}
                    {bookingPhase === 'expired' && 'Lock expired. Seats released.'}
                  </p>
                </div>
                {(bookingPhase === 'locked' || bookingPhase === 'paying') && (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg
                    ${lockCountdown <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/15 text-amber-400'}`}>
                    <Clock size={14} />
                    <span className="font-mono text-sm font-bold">{formatTime(lockCountdown)}</span>
                  </div>
                )}
              </div>

              {/* Selected seats display */}
              {selectedSeats.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {selectedSeats.map(id => (
                    <span key={id} className="px-2 py-1 rounded bg-sky-500/20 text-sky-400 text-xs font-mono">
                      {id} (Rs {seatPrice(id)})
                    </span>
                  ))}
                  <span className="text-sm font-semibold ml-auto">Total: Rs {totalPrice}</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3">
                {bookingPhase === 'select' && (
                  <button
                    onClick={handleLockSeats}
                    disabled={selectedSeats.length === 0}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50"
                  >
                    <Lock size={16} />
                    Lock Seats ({selectedSeats.length})
                  </button>
                )}
                {bookingPhase === 'locked' && (
                  <button onClick={handlePay} className="btn-primary flex items-center gap-2">
                    <CreditCard size={16} />
                    Pay Rs {totalPrice}
                  </button>
                )}
                {bookingPhase === 'paying' && (
                  <div className="flex items-center gap-2 text-amber-400">
                    <RefreshCw size={16} className="animate-spin" />
                    <span className="text-sm">Processing payment...</span>
                  </div>
                )}
                {bookingPhase === 'confirmed' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 text-emerald-400"
                  >
                    <CheckCircle size={18} />
                    <span className="text-sm font-semibold">Booking Confirmed! Seats permanently reserved.</span>
                  </motion.div>
                )}
                {bookingPhase === 'expired' && (
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle size={16} />
                    <span className="text-sm">Lock expired. Your seats have been released to other users.</span>
                  </div>
                )}
                <button onClick={handleReset} className="btn-secondary flex items-center gap-2 ml-auto">
                  <RefreshCw size={14} />
                  Reset
                </button>
              </div>
            </div>

            {/* Lock timer progress bar */}
            {(bookingPhase === 'locked' || bookingPhase === 'paying') && (
              <div className="mt-4">
                <div className="w-full h-2 bg-quest-surface rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${lockCountdown <= 10 ? 'bg-red-500' : 'bg-amber-500'}`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${(lockCountdown / LOCK_DURATION) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-[10px] text-quest-muted mt-1 text-center">
                  Seat lock expires in {formatTime(lockCountdown)}
                </p>
              </div>
            )}
          </div>

          <DeepDive id="seat-map-realtime" title="Real-Time Seat Map Updates" onRead={markDeepDiveRead}>
            <div className="space-y-3 text-sm text-quest-muted">
              <p>
                <strong className="text-quest-text">WebSocket Push:</strong> In production, the seat map is backed by
                WebSocket connections. When any user locks or books a seat, the server broadcasts the state change to
                all connected clients viewing that show. This prevents users from selecting already-locked seats.
              </p>
              <p>
                <strong className="text-quest-text">Polling Fallback:</strong> If WebSockets are unavailable, the
                client can poll the server every few seconds. This introduces a small window where two users might
                see the same seat as available, but the server-side atomic lock ensures correctness.
              </p>
              <p>
                <strong className="text-quest-text">Optimistic UI:</strong> The frontend immediately shows the seat
                as "selected" before the server confirms. If the server rejects the lock (seat already taken), the
                UI reverts and notifies the user. This feels snappy while remaining correct.
              </p>
            </div>
          </DeepDive>

          <div className="flex justify-end">
            <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
              Concurrency Demo
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: CONCURRENCY ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-orange-400" />
              Concurrent Booking Demo
            </h2>
            <p className="text-quest-muted mb-6">
              The core challenge:{' '}
              <Term
                word="Concurrent Access"
                definition="When multiple users or threads attempt to read and modify the same resource simultaneously. Without proper synchronization, this leads to race conditions, double-booking, or data corruption."
                onLearn={learnTerm}
              />{' '}
              means two users can try to book the same seat at the exact same moment. The system
              must use an atomic operation to ensure only one succeeds.
            </p>

            {/* Two-user scenario visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 items-start mb-6">
                {/* User A */}
                <div className={`rounded-xl p-4 border transition-all duration-500
                  ${concurrentDemo.step >= 1 ? 'bg-sky-500/10 border-sky-500/40' : 'bg-quest-surface border-white/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                      <Users size={14} className="text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">User A</p>
                      <p className="text-[10px] text-quest-muted">Mumbai</p>
                    </div>
                  </div>
                  {concurrentDemo.step >= 1 && (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-xs text-sky-400"
                    >
                      Clicks seat C7...
                    </motion.p>
                  )}
                  {concurrentDemo.step >= 3 && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className={`mt-2 px-2 py-1 rounded text-xs font-medium
                        ${concurrentDemo.winner === 'A' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}
                    >
                      {concurrentDemo.winner === 'A' ? 'Lock acquired!' : 'Lock failed!'}
                    </motion.div>
                  )}
                </div>

                {/* Server / Seat C7 */}
                <div className="flex flex-col items-center">
                  <div className={`w-full rounded-xl p-4 border text-center transition-all duration-500
                    ${concurrentDemo.step >= 2 ? 'bg-amber-500/10 border-amber-500/40' : 'bg-quest-surface border-white/10'}`}>
                    <Lock size={20} className="mx-auto text-amber-400 mb-2" />
                    <p className="text-sm font-semibold">Seat C7</p>
                    <p className="text-[10px] text-quest-muted mt-1">
                      {concurrentDemo.step < 2 && 'Available'}
                      {concurrentDemo.step === 2 && 'Two lock requests arrive...'}
                      {concurrentDemo.step >= 3 && 'Locked by User A'}
                    </p>
                  </div>
                  {concurrentDemo.step >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-[10px] text-quest-muted text-center bg-quest-surface rounded-lg p-2 border border-white/10"
                    >
                      <code className="text-amber-400 text-[10px]">
                        SELECT ... FOR UPDATE<br />WHERE seat_id = 'C7'
                      </code>
                    </motion.div>
                  )}
                </div>

                {/* User B */}
                <div className={`rounded-xl p-4 border transition-all duration-500
                  ${concurrentDemo.step >= 1 ? 'bg-purple-500/10 border-purple-500/40' : 'bg-quest-surface border-white/10'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Users size={14} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">User B</p>
                      <p className="text-[10px] text-quest-muted">Delhi</p>
                    </div>
                  </div>
                  {concurrentDemo.step >= 1 && (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-xs text-purple-400"
                    >
                      Clicks seat C7...
                    </motion.p>
                  )}
                  {concurrentDemo.step >= 4 && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mt-2 px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400"
                    >
                      Seat unavailable! Pick another.
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-2 mb-4">
                {[
                  { step: 0, label: 'Both users see seat C7 as available', color: 'text-quest-muted' },
                  { step: 1, label: 'Both click "Select" at the same moment', color: 'text-sky-400' },
                  { step: 2, label: 'Both requests hit the server simultaneously', color: 'text-amber-400' },
                  { step: 3, label: 'Atomic lock: User A acquires the row lock first', color: 'text-emerald-400' },
                  { step: 4, label: 'User B receives "seat already locked" error', color: 'text-red-400' },
                  { step: 5, label: 'User B sees C7 as locked, picks another seat', color: 'text-purple-400' },
                ].map(item => (
                  <motion.div
                    key={item.step}
                    animate={{ opacity: concurrentDemo.step >= item.step ? 1 : 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                      ${concurrentDemo.step >= item.step ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-quest-muted'}`}>
                      {item.step + 1}
                    </div>
                    <span className={`text-sm ${concurrentDemo.step >= item.step ? item.color : 'text-quest-muted/40'}`}>
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <button
                onClick={runConcurrentDemo}
                disabled={concurrentDemo.running}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Zap size={16} />
                {concurrentDemo.step === 0 ? 'Run Concurrent Demo' : 'Replay Demo'}
              </button>
            </div>

            {/* Locking strategies */}
            <h3 className="text-lg font-semibold mb-3">Concurrency Control Strategies</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-amber-400 mb-2">Pessimistic Locking</h4>
                <p className="text-xs text-quest-muted mb-2">
                  Lock the row before reading. Other transactions wait until the lock is released.
                </p>
                <code className="text-[10px] text-amber-400/80 font-mono block bg-quest-surface rounded p-2">
                  SELECT * FROM seats<br />
                  WHERE id = 'C7'<br />
                  FOR UPDATE;
                </code>
                <p className="text-[10px] text-emerald-400 mt-2">Best for: High contention (popular shows)</p>
              </div>
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-sky-400 mb-2">Optimistic Locking</h4>
                <p className="text-xs text-quest-muted mb-2">
                  Read freely, but check a version number on write. Retry if version changed.
                </p>
                <code className="text-[10px] text-sky-400/80 font-mono block bg-quest-surface rounded p-2">
                  UPDATE seats SET locked=1<br />
                  WHERE id='C7'<br />
                  AND version=5;
                </code>
                <p className="text-[10px] text-emerald-400 mt-2">Best for: Low contention scenarios</p>
              </div>
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Redis Distributed Lock</h4>
                <p className="text-xs text-quest-muted mb-2">
                  Use Redis SET NX with TTL for a fast, distributed lock across services.
                </p>
                <code className="text-[10px] text-purple-400/80 font-mono block bg-quest-surface rounded p-2">
                  SET seat:C7:lock userA<br />
                  NX EX 300
                </code>
                <p className="text-[10px] text-emerald-400 mt-2">Best for: Microservices architecture</p>
              </div>
            </div>

            <DeepDive id="race-conditions" title="Race Conditions in Booking Systems" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">The Double-Booking Problem:</strong> Without atomic locking,
                  two transactions can both read a seat as "available," both proceed to lock it, and both succeed --
                  resulting in two users believing they own the same seat. This is a classic TOCTOU
                  (Time-of-Check-to-Time-of-Use) race condition.
                </p>
                <p>
                  <strong className="text-quest-text">Database-Level Solution:</strong> Use <code>SELECT FOR UPDATE</code>
                  within a transaction. This acquires a row-level lock, forcing the second transaction to wait.
                  When the first commits, the second sees the updated state and fails gracefully.
                </p>
                <p>
                  <strong className="text-quest-text">Application-Level Idempotency:</strong> The lock request
                  should be idempotent. If a user retries due to network issues, the server should recognize the
                  duplicate and return the existing lock rather than creating a conflict.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Booking Flow
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: BOOKING FLOW ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="text-green-400" />
              Booking Flow: Select, Lock, Pay, Confirm
            </h2>
            <p className="text-quest-muted mb-6">
              The booking flow is a carefully orchestrated{' '}
              <Term
                word="State Machine"
                definition="A computational model where the system exists in one of a finite number of states at any time. Transitions between states are triggered by events (e.g., user actions, timeouts, payment callbacks). Each state defines valid next actions."
                onLearn={learnTerm}
              />{' '}
              with{' '}
              <Term
                word="Payment Integration"
                definition="The process of connecting to a payment gateway (Razorpay, Stripe, etc.) to process transactions. Involves creating a payment intent, redirecting the user, and handling success/failure callbacks asynchronously."
                onLearn={learnTerm}
              />{' '}
              and timeout-based seat release.
            </p>

            {/* Animated flow steps */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-start gap-2 md:gap-4 overflow-x-auto pb-2">
                {bookingFlowSteps.map((step, i) => {
                  const Icon = step.icon
                  const isActive = activeFlowStep === i
                  return (
                    <div key={step.label} className="flex items-center gap-2 flex-shrink-0">
                      <motion.div
                        animate={isActive ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
                        className={`flex flex-col items-center w-28 p-3 rounded-xl border transition-all
                          ${isActive
                            ? 'bg-quest-surface border-amber-500/40 shadow-lg shadow-amber-500/10'
                            : 'bg-quest-surface/50 border-white/5'}`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2
                          ${isActive ? 'bg-amber-500/20' : 'bg-white/5'}`}>
                          <Icon size={18} className={isActive ? step.color : 'text-quest-muted'} />
                        </div>
                        <p className={`text-xs font-semibold mb-1 ${isActive ? step.color : 'text-quest-muted'}`}>
                          {step.label}
                        </p>
                        <p className="text-[10px] text-quest-muted text-center leading-relaxed">{step.desc}</p>
                      </motion.div>
                      {i < bookingFlowSteps.length - 1 && (
                        <ArrowRight size={16} className="text-quest-muted/30 flex-shrink-0" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* State machine diagram */}
            <h3 className="text-lg font-semibold mb-3">Booking State Machine</h3>
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-quest-text mb-2">Seat States</h4>
                  {[
                    { from: 'AVAILABLE', to: 'LOCKED', trigger: 'User selects + server locks', color: 'text-emerald-400' },
                    { from: 'LOCKED', to: 'BOOKED', trigger: 'Payment succeeds', color: 'text-amber-400' },
                    { from: 'LOCKED', to: 'AVAILABLE', trigger: 'Lock TTL expires / user cancels', color: 'text-amber-400' },
                    { from: 'BOOKED', to: 'AVAILABLE', trigger: 'Admin cancels / refund processed', color: 'text-red-400' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={`font-mono px-2 py-0.5 rounded bg-quest-surface ${t.color}`}>{t.from}</span>
                      <ArrowRight size={12} className="text-quest-muted" />
                      <span className={`font-mono px-2 py-0.5 rounded bg-quest-surface ${t.color}`}>{t.to}</span>
                      <span className="text-quest-muted ml-1">({t.trigger})</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-quest-text mb-2">Booking States</h4>
                  {[
                    { from: 'INITIATED', to: 'PENDING_PAYMENT', trigger: 'Seats locked', color: 'text-sky-400' },
                    { from: 'PENDING_PAYMENT', to: 'CONFIRMED', trigger: 'Payment callback: success', color: 'text-sky-400' },
                    { from: 'PENDING_PAYMENT', to: 'FAILED', trigger: 'Payment callback: failure', color: 'text-sky-400' },
                    { from: 'PENDING_PAYMENT', to: 'EXPIRED', trigger: 'TTL timeout', color: 'text-sky-400' },
                    { from: 'CONFIRMED', to: 'CANCELLED', trigger: 'User/admin cancellation', color: 'text-purple-400' },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <span className={`font-mono px-2 py-0.5 rounded bg-quest-surface ${t.color}`}>{t.from}</span>
                      <ArrowRight size={12} className="text-quest-muted" />
                      <span className={`font-mono px-2 py-0.5 rounded bg-quest-surface ${t.color}`}>{t.to}</span>
                      <span className="text-quest-muted ml-1">({t.trigger})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment integration flow */}
            <h3 className="text-lg font-semibold mb-3">Payment Integration</h3>
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <div className="space-y-3">
                {[
                  { step: 1, label: 'Create Order', desc: 'Backend creates a payment order with gateway (Razorpay/Stripe) containing amount, booking ID, and metadata', icon: '1' },
                  { step: 2, label: 'Client Checkout', desc: 'Frontend opens payment gateway SDK/redirect. User enters payment details and authorizes.', icon: '2' },
                  { step: 3, label: 'Webhook Callback', desc: 'Payment gateway sends an async webhook to your server with payment status. This is the source of truth, not the client redirect.', icon: '3' },
                  { step: 4, label: 'Verify + Confirm', desc: 'Server verifies webhook signature, checks amount, and confirms booking. Seats transition from LOCKED to BOOKED.', icon: '4' },
                  { step: 5, label: 'Notification', desc: 'User receives confirmation via email/SMS/push with ticket details and QR code.', icon: '5' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-xs text-green-400 font-bold flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-quest-text">{item.label}</p>
                      <p className="text-xs text-quest-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="payment-edge-cases" title="Payment Edge Cases" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Payment Succeeds but Lock Expired:</strong> The user completed
                  payment but the seat lock had already expired and was reassigned. Solution: always check lock ownership
                  before confirming. If expired, auto-refund and show an error. This is rare but must be handled.
                </p>
                <p>
                  <strong className="text-quest-text">Double Payment (Idempotency):</strong> Network retries can cause
                  the payment webhook to fire twice. Use a unique idempotency key (booking ID) so the server processes
                  each payment exactly once.
                </p>
                <p>
                  <strong className="text-quest-text">Partial Failures:</strong> If payment succeeds but the database
                  update fails, use a reconciliation job that periodically checks for paid-but-unconfirmed bookings
                  and either confirms or refunds them.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Class Design
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: CLASS DESIGN ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Film className="text-purple-400" />
              Class Diagram
            </h2>
            <p className="text-quest-muted mb-6">
              A well-designed BookMyShow system requires clear separation of concerns.
              Each class encapsulates a specific domain entity and its behavior.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {classData.map(cls => (
                <motion.div
                  key={cls.name}
                  whileHover={{ y: -2 }}
                  className={`rounded-xl p-4 border ${cls.border} ${cls.bg}`}
                >
                  <h4 className={`text-sm font-bold mb-3 ${cls.color}`}>{cls.name}</h4>
                  <div className="mb-3">
                    <p className="text-[10px] text-quest-muted uppercase tracking-wider mb-1">Fields</p>
                    {cls.fields.map(f => (
                      <p key={f} className="text-xs text-quest-text font-mono ml-2">- {f}</p>
                    ))}
                  </div>
                  <div>
                    <p className="text-[10px] text-quest-muted uppercase tracking-wider mb-1">Methods</p>
                    {cls.methods.map(m => (
                      <p key={m} className="text-xs text-quest-text font-mono ml-2">+ {m}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Relationships */}
            <h3 className="text-lg font-semibold mb-3">Relationships</h3>
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <div className="space-y-2">
                {[
                  { from: 'Theater', to: 'Screen', rel: '1 : N', desc: 'A theater has multiple screens' },
                  { from: 'Screen', to: 'Seat', rel: '1 : N', desc: 'Each screen has a fixed set of seats' },
                  { from: 'Show', to: 'Screen', rel: 'N : 1', desc: 'Multiple shows can be scheduled on a screen' },
                  { from: 'Show', to: 'Movie', rel: 'N : 1', desc: 'A movie can have many shows across theaters' },
                  { from: 'Booking', to: 'Show', rel: 'N : 1', desc: 'Many bookings per show' },
                  { from: 'Booking', to: 'Seat', rel: 'N : N', desc: 'A booking has multiple seats; a seat can appear in bookings over time' },
                  { from: 'Booking', to: 'Payment', rel: '1 : 1', desc: 'Each booking has exactly one payment' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs">
                    <span className="font-mono text-sky-400 w-16 text-right">{r.from}</span>
                    <span className="px-2 py-0.5 rounded bg-quest-surface text-quest-muted font-mono">{r.rel}</span>
                    <span className="font-mono text-purple-400 w-16">{r.to}</span>
                    <span className="text-quest-muted">-- {r.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key design patterns */}
            <h3 className="text-lg font-semibold mb-3">Key Design Patterns</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-amber-400 mb-2">Strategy Pattern (Pricing)</h4>
                <p className="text-xs text-quest-muted">
                  Different pricing strategies based on seat type (regular, premium, VIP), day (weekday vs weekend),
                  and time slot. Encapsulate each strategy as a class implementing a common <code>PricingStrategy</code> interface.
                </p>
              </div>
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-sky-400 mb-2">Observer Pattern (Notifications)</h4>
                <p className="text-xs text-quest-muted">
                  When a booking is confirmed or cancelled, notify multiple observers: email service, SMS service,
                  analytics tracker, seat map WebSocket broadcaster. Decouples booking logic from notification delivery.
                </p>
              </div>
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-green-400 mb-2">State Pattern (Booking Lifecycle)</h4>
                <p className="text-xs text-quest-muted">
                  The Booking object transitions through states (Initiated, Pending, Confirmed, Cancelled, Expired).
                  Each state defines valid transitions and actions, preventing invalid operations like paying for an expired booking.
                </p>
              </div>
              <div className="bg-quest-bg rounded-xl p-4 border border-white/5">
                <h4 className="text-sm font-semibold text-purple-400 mb-2">Repository Pattern (Data Access)</h4>
                <p className="text-xs text-quest-muted">
                  Abstract database operations behind repository interfaces (ShowRepository, BookingRepository).
                  This allows swapping between SQL, NoSQL, or cache-backed implementations without changing business logic.
                </p>
              </div>
            </div>

            <DeepDive id="schema-design" title="Database Schema Design" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">ShowSeat Table:</strong> The critical table is <code>show_seats</code>,
                  a junction between shows and seats. Each row represents the availability of a specific seat for a specific
                  show. Columns: <code>show_id, seat_id, status, locked_by, locked_at, booking_id</code>.
                </p>
                <p>
                  <strong className="text-quest-text">Indexing:</strong> A composite index on <code>(show_id, status)</code>
                  speeds up the "get available seats" query. A unique constraint on <code>(show_id, seat_id)</code> prevents
                  duplicate entries. The <code>locked_at</code> timestamp enables TTL-based expiry checks.
                </p>
                <p>
                  <strong className="text-quest-text">Scaling:</strong> For a platform like BookMyShow with millions of
                  concurrent users, shard the <code>show_seats</code> table by <code>show_id</code>. Use Redis for the
                  hot path (seat locking) and write-behind to the database for durability.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: QUIZ ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-amber-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Test your understanding of seat locking, concurrency control, booking flow, and class design.
            </p>

            <div className="space-y-8">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="bg-quest-bg rounded-lg p-6">
                  <p className="font-medium mb-4">{qIndex + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map(option => {
                      const isSelected = quizAnswers[q.id] === option.id
                      const showResult = quizSubmitted
                      const isCorrect = option.correct

                      return (
                        <button
                          key={option.id}
                          onClick={() => !quizSubmitted && setQuizAnswers(prev => ({ ...prev, [q.id]: option.id }))}
                          disabled={quizSubmitted}
                          className={`w-full text-left p-3 rounded-lg border transition-all text-sm
                            ${isSelected
                              ? showResult
                                ? isCorrect ? 'border-quest-success bg-quest-success/10' : 'border-quest-danger bg-quest-danger/10'
                                : 'border-amber-500 bg-amber-500/10'
                              : showResult && isCorrect
                                ? 'border-quest-success bg-quest-success/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                        >
                          {option.text}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

            {!quizSubmitted ? (
              <button
                onClick={handleQuizSubmit}
                disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                className="btn-primary w-full mt-6 disabled:opacity-50"
              >
                Submit Answers
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 bg-quest-success/10 border border-quest-success/30 rounded-lg p-6 text-center"
              >
                <CheckCircle size={48} className="mx-auto text-quest-success mb-4" />
                <h3 className="text-xl font-bold mb-2">Level 47 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how to design a movie booking system with seat locking,
                  concurrent access control, payment integration, and proper class design.
                  No more double-booked seats!
                </p>
                <p className="text-sm text-amber-400">
                  The show is sold out -- and every seat belongs to exactly one happy viewer.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

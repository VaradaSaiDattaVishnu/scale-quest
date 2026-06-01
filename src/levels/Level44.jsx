import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Car, Truck, Bike, CreditCard, Clock, MapPin } from 'lucide-react'

// ============================================
// TERMINOLOGY COMPONENT
// ============================================
function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="term cursor-pointer"
        onClick={() => { setShowTooltip(!showTooltip); onLearn?.(word) }}
        onMouseEnter={() => { setShowTooltip(true); onLearn?.(word) }}
        onMouseLeave={() => setShowTooltip(false)}
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

// ============================================
// DEEP DIVE COMPONENT
// ============================================
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
          <span className="text-xs bg-quest-secondary/20 text-quest-secondary px-2 py-0.5 rounded">
            Deep Dive
          </span>
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

// ============================================
// VEHICLE ICON COMPONENT
// ============================================
function VehicleIcon({ type, size = 18, className = '' }) {
  switch (type) {
    case 'motorcycle': return <Bike size={size} className={className} />
    case 'car': return <Car size={size} className={className} />
    case 'truck': return <Truck size={size} className={className} />
    default: return <Car size={size} className={className} />
  }
}

// ============================================
// SPOT TYPES & VEHICLE TYPES
// ============================================
const SPOT_TYPES = {
  compact: { label: 'Compact', color: 'text-blue-400', bg: 'bg-blue-400/20', border: 'border-blue-400/40', width: 'w-10' },
  regular: { label: 'Regular', color: 'text-green-400', bg: 'bg-green-400/20', border: 'border-green-400/40', width: 'w-12' },
  large:   { label: 'Large',   color: 'text-orange-400', bg: 'bg-orange-400/20', border: 'border-orange-400/40', width: 'w-16' },
}

const VEHICLE_TYPES = {
  motorcycle: { label: 'Motorcycle', spotsNeeded: ['compact', 'regular', 'large'], icon: 'motorcycle', rate: 1.0 },
  car:        { label: 'Car',        spotsNeeded: ['regular', 'large'],            icon: 'car',        rate: 2.0 },
  truck:      { label: 'Truck',      spotsNeeded: ['large'],                       icon: 'truck',      rate: 4.0 },
}

// ============================================
// INITIAL LOT CONFIGURATION
// ============================================
function createInitialLot() {
  return [
    {
      id: 0,
      name: 'Floor 1 (Ground)',
      spots: [
        ...Array.from({ length: 4 }, (_, i) => ({ id: `0-c-${i}`, type: 'compact', floor: 0, vehicle: null })),
        ...Array.from({ length: 6 }, (_, i) => ({ id: `0-r-${i}`, type: 'regular', floor: 0, vehicle: null })),
        ...Array.from({ length: 3 }, (_, i) => ({ id: `0-l-${i}`, type: 'large',   floor: 0, vehicle: null })),
      ],
    },
    {
      id: 1,
      name: 'Floor 2',
      spots: [
        ...Array.from({ length: 5 }, (_, i) => ({ id: `1-c-${i}`, type: 'compact', floor: 1, vehicle: null })),
        ...Array.from({ length: 5 }, (_, i) => ({ id: `1-r-${i}`, type: 'regular', floor: 1, vehicle: null })),
        ...Array.from({ length: 2 }, (_, i) => ({ id: `1-l-${i}`, type: 'large',   floor: 1, vehicle: null })),
      ],
    },
    {
      id: 2,
      name: 'Floor 3 (Roof)',
      spots: [
        ...Array.from({ length: 3 }, (_, i) => ({ id: `2-c-${i}`, type: 'compact', floor: 2, vehicle: null })),
        ...Array.from({ length: 4 }, (_, i) => ({ id: `2-r-${i}`, type: 'regular', floor: 2, vehicle: null })),
        ...Array.from({ length: 2 }, (_, i) => ({ id: `2-l-${i}`, type: 'large',   floor: 2, vehicle: null })),
      ],
    },
  ]
}

let nextTicketId = 1

// ============================================
// MAIN LEVEL COMPONENT
// ============================================
export default function Level44({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const sections = ['intro', 'simulation', 'class-diagram', 'payment', 'quiz']

  // Parking lot state
  const [floors, setFloors] = useState(createInitialLot)
  const [tickets, setTickets] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState('car')
  const [licensePlate, setLicensePlate] = useState('')
  const [allocationLog, setAllocationLog] = useState([])
  const [activeFloorView, setActiveFloorView] = useState(0)

  // Payment state
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('credit')
  const [paymentLog, setPaymentLog] = useState([])

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Generate random plate
  const generatePlate = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const nums = '0123456789'
    const plate = `${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}${letters[Math.floor(Math.random() * 26)]}-${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}${nums[Math.floor(Math.random() * 10)]}`
    setLicensePlate(plate)
  }

  useEffect(() => { generatePlate() }, [])

  // Compute occupancy stats
  const getOccupancy = () => {
    const stats = { compact: { total: 0, occupied: 0 }, regular: { total: 0, occupied: 0 }, large: { total: 0, occupied: 0 } }
    const perFloor = floors.map(floor => {
      const fs = { compact: { total: 0, occupied: 0 }, regular: { total: 0, occupied: 0 }, large: { total: 0, occupied: 0 } }
      floor.spots.forEach(spot => {
        fs[spot.type].total++
        stats[spot.type].total++
        if (spot.vehicle) {
          fs[spot.type].occupied++
          stats[spot.type].occupied++
        }
      })
      return fs
    })
    return { stats, perFloor }
  }

  const { stats: occupancy, perFloor: floorOccupancy } = getOccupancy()
  const totalSpots = occupancy.compact.total + occupancy.regular.total + occupancy.large.total
  const totalOccupied = occupancy.compact.occupied + occupancy.regular.occupied + occupancy.large.occupied

  // Allocation: find best spot for vehicle (lowest floor, smallest fitting spot)
  const allocateSpot = (vehicleType) => {
    const allowed = VEHICLE_TYPES[vehicleType].spotsNeeded
    for (const floor of floors) {
      for (const spotType of allowed) {
        const spot = floor.spots.find(s => s.type === spotType && !s.vehicle)
        if (spot) return spot
      }
    }
    return null
  }

  // Park a vehicle
  const parkVehicle = () => {
    if (!licensePlate.trim()) return

    const spot = allocateSpot(selectedVehicle)
    if (!spot) {
      setAllocationLog(prev => [{
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        message: `No spot available for ${VEHICLE_TYPES[selectedVehicle].label} (${licensePlate})`,
        type: 'error',
      }, ...prev.slice(0, 9)])
      return
    }

    const ticketId = nextTicketId++
    const entryTime = Date.now()
    const vehicle = { type: selectedVehicle, plate: licensePlate, ticketId, entryTime }

    // Update spot
    setFloors(prev => prev.map(floor => ({
      ...floor,
      spots: floor.spots.map(s => s.id === spot.id ? { ...s, vehicle } : s),
    })))

    // Create ticket
    const ticket = {
      id: ticketId,
      vehicleType: selectedVehicle,
      plate: licensePlate,
      spotId: spot.id,
      spotType: spot.type,
      floorId: spot.floor,
      entryTime,
      exitTime: null,
      paid: false,
    }
    setTickets(prev => [ticket, ...prev])

    setAllocationLog(prev => [{
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      message: `${VEHICLE_TYPES[selectedVehicle].label} (${licensePlate}) parked at Floor ${spot.floor + 1}, ${SPOT_TYPES[spot.type].label} spot ${spot.id}`,
      type: 'success',
    }, ...prev.slice(0, 9)])

    generatePlate()
  }

  // Remove vehicle (exit)
  const exitVehicle = (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId)
    if (!ticket || ticket.exitTime) return

    const exitTime = Date.now()
    // For demo, add 15-90 min random duration
    const simulatedEntry = exitTime - (Math.floor(Math.random() * 75 + 15) * 60 * 1000)

    setFloors(prev => prev.map(floor => ({
      ...floor,
      spots: floor.spots.map(s => s.id === ticket.spotId ? { ...s, vehicle: null } : s),
    })))

    setTickets(prev => prev.map(t =>
      t.id === ticketId ? { ...t, entryTime: simulatedEntry, exitTime } : t
    ))

    setAllocationLog(prev => [{
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      message: `${ticket.plate} exited from spot ${ticket.spotId}`,
      type: 'info',
    }, ...prev.slice(0, 9)])
  }

  // Calculate fee
  const calculateFee = (ticket) => {
    if (!ticket.exitTime) return null
    const minutes = Math.ceil((ticket.exitTime - ticket.entryTime) / 60000)
    const hours = Math.ceil(minutes / 60)
    const rate = VEHICLE_TYPES[ticket.vehicleType].rate
    return { minutes, hours, rate, total: (hours * rate).toFixed(2) }
  }

  // Process payment
  const processPayment = (ticketId) => {
    const ticket = tickets.find(t => t.id === ticketId)
    if (!ticket || !ticket.exitTime || ticket.paid) return

    const fee = calculateFee(ticket)
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, paid: true } : t))

    setPaymentLog(prev => [{
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      ticketId,
      plate: ticket.plate,
      amount: fee.total,
      method: paymentMethod,
      duration: `${fee.hours}h`,
    }, ...prev.slice(0, 9)])
  }

  // Active (parked) tickets
  const activeTickets = tickets.filter(t => !t.exitTime)
  const exitedUnpaid = tickets.filter(t => t.exitTime && !t.paid)
  const paidTickets = tickets.filter(t => t.paid)

  // Quiz
  const quizQuestions = [
    {
      id: 'q1',
      question: 'Which design pattern best describes selecting different spot allocation strategies (e.g., nearest-to-entrance vs. spread-across-floors)?',
      options: [
        { id: 'a', text: 'Observer Pattern', correct: false },
        { id: 'b', text: 'Strategy Pattern', correct: true },
        { id: 'c', text: 'Singleton Pattern', correct: false },
        { id: 'd', text: 'Factory Pattern', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'In the class hierarchy, Motorcycle, Car, and Truck all extend Vehicle. What OOP concept does this represent?',
      options: [
        { id: 'a', text: 'Encapsulation', correct: false },
        { id: 'b', text: 'Polymorphism only', correct: false },
        { id: 'c', text: 'Inheritance', correct: true },
        { id: 'd', text: 'Composition', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'Why should SpotType (COMPACT, REGULAR, LARGE) be modeled as an Enum rather than raw strings?',
      options: [
        { id: 'a', text: 'Enums are faster to process at runtime', correct: false },
        { id: 'b', text: 'Enums provide type safety and prevent invalid values', correct: true },
        { id: 'c', text: 'Enums use less memory', correct: false },
        { id: 'd', text: 'Enums are required for database storage', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'A truck needs a Large spot but all Large spots are full. Some Regular spots are empty. What should the system do?',
      options: [
        { id: 'a', text: 'Assign the truck to a Regular spot since it is available', correct: false },
        { id: 'b', text: 'Return "no spot available" since the truck cannot fit in a Regular spot', correct: true },
        { id: 'c', text: 'Assign two Regular spots to the truck', correct: false },
        { id: 'd', text: 'Queue the truck until a Large spot opens', correct: false },
      ],
    },
    {
      id: 'q5',
      question: 'How should the ParkingLot class handle concurrent entry at multiple gates?',
      options: [
        { id: 'a', text: 'No special handling is needed since each gate is independent', correct: false },
        { id: 'b', text: 'Use synchronization/locks when allocating spots to prevent double-booking', correct: true },
        { id: 'c', text: 'Each gate should have its own set of reserved spots', correct: false },
        { id: 'd', text: 'Use a single global queue so only one car enters at a time', correct: false },
      ],
    },
    {
      id: 'q6',
      question: 'What is the benefit of separating Ticket and Payment into distinct classes?',
      options: [
        { id: 'a', text: 'It reduces the total number of lines of code', correct: false },
        { id: 'b', text: 'It follows the Single Responsibility Principle - each class handles one concern', correct: true },
        { id: 'c', text: 'It makes the database schema simpler', correct: false },
        { id: 'd', text: 'It is required by the Strategy Pattern', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const correct = quizQuestions.filter(q => {
      const answer = quizAnswers[q.id]
      return q.options.find(o => o.id === answer)?.correct
    }).length
    if (correct >= 4) onComplete?.()
  }

  const quizScore = quizQuestions.filter(q => {
    const answer = quizAnswers[q.id]
    return q.options.find(o => o.id === answer)?.correct
  }).length

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Navigation */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === index
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* ==================== SECTION: INTRO ==================== */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Park It Right: Design a Parking Lot</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Design a parking lot system - every interviewer's favorite question. Let's nail it.
                We'll model the classes, handle spot allocation, process payments, and think about
                scalability - all the things a real LLD interview expects."
              </p>
            </div>

            <p className="text-quest-muted mb-4">
              The Parking Lot problem is a classic{' '}
              <Term
                word="Low-Level Design"
                definition="LLD focuses on class-level design: defining classes, their attributes, methods, relationships, and interactions. It's about translating requirements into clean, extensible object-oriented code."
                onLearn={learnTerm}
              />{' '}
              interview question. It tests your ability to model real-world entities as classes,
              apply OOP principles, and think about edge cases.
            </p>

            <div className="bg-quest-surface rounded-xl p-6 my-6">
              <h3 className="font-semibold mb-4">Key Concepts We'll Cover</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded-lg p-4">
                  <h4 className="font-medium text-quest-primary mb-2">Class Design</h4>
                  <p className="text-sm text-quest-muted">
                    ParkingLot, Floor, Spot, Vehicle, Ticket, Payment - how they relate to each other
                    via{' '}
                    <Term
                      word="Composition"
                      definition="A 'has-a' relationship where one object contains another. ParkingLot HAS Floors, Floor HAS Spots. The contained objects don't exist independently."
                      onLearn={learnTerm}
                    />{' '}
                    and{' '}
                    <Term
                      word="Inheritance"
                      definition="A 'is-a' relationship where child classes extend a parent. Motorcycle IS-A Vehicle, Car IS-A Vehicle. Children inherit parent behavior and can override it."
                      onLearn={learnTerm}
                    />.
                  </p>
                </div>
                <div className="bg-quest-bg rounded-lg p-4">
                  <h4 className="font-medium text-quest-primary mb-2">Enums for Type Safety</h4>
                  <p className="text-sm text-quest-muted">
                    <Term
                      word="Enum"
                      definition="A special type that defines a set of named constants. SpotType.COMPACT, SpotType.REGULAR, SpotType.LARGE. Prevents invalid values and makes code self-documenting."
                      onLearn={learnTerm}
                    />{' '}
                    values like SpotType and VehicleType ensure only valid values flow through the system.
                  </p>
                </div>
                <div className="bg-quest-bg rounded-lg p-4">
                  <h4 className="font-medium text-quest-primary mb-2">Strategy Pattern</h4>
                  <p className="text-sm text-quest-muted">
                    The{' '}
                    <Term
                      word="Strategy Pattern"
                      definition="A behavioral design pattern that lets you define a family of algorithms, encapsulate each one, and make them interchangeable. The parking lot can swap allocation strategies without changing its core code."
                      onLearn={learnTerm}
                    />{' '}
                    lets us swap spot allocation algorithms (nearest first, spread evenly, etc.) without changing the lot's core logic.
                  </p>
                </div>
                <div className="bg-quest-bg rounded-lg p-4">
                  <h4 className="font-medium text-quest-primary mb-2">State Management</h4>
                  <p className="text-sm text-quest-muted">
                    Tracking which spots are occupied, managing concurrent gate access, and handling
                    the full lifecycle: entry, parking, exit, payment.
                  </p>
                </div>
              </div>
            </div>

            <DeepDive id="lld-approach" title="How to Approach LLD Interview Questions" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p><strong>Step 1: Clarify Requirements</strong> - Ask about scale, features, and constraints. How many floors? Vehicle types? Payment methods? Multiple entry/exit gates?</p>
                <p><strong>Step 2: Identify Core Entities</strong> - List the nouns: ParkingLot, Floor, Spot, Vehicle, Ticket, Payment. These become your classes.</p>
                <p><strong>Step 3: Define Relationships</strong> - ParkingLot has Floors (composition). Vehicle is-a type hierarchy (inheritance). Ticket references a Vehicle and a Spot.</p>
                <p><strong>Step 4: Define Interfaces & Methods</strong> - parkVehicle(), exitVehicle(), calculateFee(). Think about what each class is responsible for.</p>
                <p><strong>Step 5: Handle Edge Cases</strong> - Full lot, concurrent access, vehicle too large, payment failures.</p>
              </div>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Try the Simulation
                <MapPin size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== SECTION: SIMULATION ==================== */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Parking Lot Simulation</h2>
            <p className="text-quest-muted mb-6">
              Park vehicles into the lot and watch the allocation algorithm find the best spot.
              The system picks the lowest floor and smallest fitting spot type first.
            </p>

            {/* Vehicle Selector & Park Button */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Car size={20} className="text-quest-primary" />
                Park a Vehicle
              </h3>
              <div className="flex flex-wrap items-end gap-4">
                <div>
                  <label className="text-xs text-quest-muted block mb-1">Vehicle Type</label>
                  <div className="flex gap-2">
                    {Object.entries(VEHICLE_TYPES).map(([key, v]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedVehicle(key)}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all border
                          ${selectedVehicle === key
                            ? 'bg-quest-primary/20 border-quest-primary text-quest-primary'
                            : 'bg-quest-bg border-white/10 text-quest-muted hover:border-white/30'
                          }`}
                      >
                        <VehicleIcon type={key} size={16} />
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-quest-muted block mb-1">License Plate</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={licensePlate}
                      onChange={e => setLicensePlate(e.target.value.toUpperCase())}
                      className="bg-quest-bg border border-white/10 rounded-lg px-3 py-2 text-sm font-mono w-32 focus:outline-none focus:border-quest-primary"
                      maxLength={8}
                    />
                    <button onClick={generatePlate} className="text-xs text-quest-muted hover:text-quest-text px-2">
                      Random
                    </button>
                  </div>
                </div>
                <button
                  onClick={parkVehicle}
                  className="btn-primary flex items-center gap-2"
                >
                  <MapPin size={16} />
                  Park
                </button>
              </div>
              <p className="text-xs text-quest-muted mt-3">
                Allocation: lowest floor first, smallest fitting spot type. Motorcycles fit compact+, cars fit regular+, trucks need large.
              </p>
            </div>

            {/* Occupancy Dashboard */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock size={18} className="text-quest-secondary" />
                Occupancy Dashboard
              </h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-quest-bg rounded-lg p-4 text-center">
                  <p className="text-xs text-quest-muted mb-1">Total</p>
                  <p className="text-2xl font-mono font-bold">{totalOccupied}/{totalSpots}</p>
                  <div className="h-2 bg-quest-surface rounded-full mt-2 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${totalOccupied / totalSpots > 0.8 ? 'bg-red-400' : totalOccupied / totalSpots > 0.5 ? 'bg-yellow-400' : 'bg-green-400'}`}
                      animate={{ width: `${totalSpots > 0 ? (totalOccupied / totalSpots) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                {Object.entries(SPOT_TYPES).map(([key, st]) => (
                  <div key={key} className="bg-quest-bg rounded-lg p-4 text-center">
                    <p className={`text-xs mb-1 ${st.color}`}>{st.label}</p>
                    <p className="text-2xl font-mono font-bold">
                      {occupancy[key].occupied}/{occupancy[key].total}
                    </p>
                    <div className="h-2 bg-quest-surface rounded-full mt-2 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${st.bg.replace('/20', '')}`}
                        style={{ backgroundColor: key === 'compact' ? '#60a5fa' : key === 'regular' ? '#4ade80' : '#fb923c' }}
                        animate={{ width: `${occupancy[key].total > 0 ? (occupancy[key].occupied / occupancy[key].total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Per-floor breakdown */}
              <div className="space-y-2">
                {floors.map((floor, fi) => (
                  <div key={floor.id} className="bg-quest-bg rounded-lg p-3 flex items-center gap-4 text-sm">
                    <span className="font-medium w-32">{floor.name}</span>
                    <div className="flex gap-4 flex-1">
                      {Object.entries(SPOT_TYPES).map(([key, st]) => (
                        <span key={key} className={`${st.color} text-xs`}>
                          {st.label}: {floorOccupancy[fi][key].occupied}/{floorOccupancy[fi][key].total}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Parking Lot */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Visual Layout</h3>
                <div className="flex gap-2">
                  {floors.map((floor, fi) => (
                    <button
                      key={fi}
                      onClick={() => setActiveFloorView(fi)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-all
                        ${activeFloorView === fi
                          ? 'bg-quest-primary text-quest-bg'
                          : 'bg-quest-bg text-quest-muted hover:text-quest-text'
                        }`}
                    >
                      F{fi + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-quest-bg rounded-lg p-4">
                <p className="text-xs text-quest-muted mb-3">{floors[activeFloorView].name}</p>
                <div className="flex flex-wrap gap-2">
                  {floors[activeFloorView].spots.map(spot => {
                    const st = SPOT_TYPES[spot.type]
                    return (
                      <motion.div
                        key={spot.id}
                        layout
                        className={`
                          ${st.width} h-12 rounded border-2 flex items-center justify-center text-xs
                          ${spot.vehicle
                            ? 'bg-quest-danger/20 border-quest-danger/50'
                            : `${st.bg} ${st.border}`
                          }
                        `}
                        title={spot.vehicle
                          ? `${spot.vehicle.plate} (${VEHICLE_TYPES[spot.vehicle.type].label})`
                          : `${st.label} - Available`
                        }
                        whileHover={{ scale: 1.1 }}
                      >
                        {spot.vehicle ? (
                          <VehicleIcon type={spot.vehicle.type} size={14} className="text-quest-danger" />
                        ) : (
                          <span className={`${st.color} opacity-50`}>{spot.type[0].toUpperCase()}</span>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
                <div className="flex gap-4 mt-3 text-xs text-quest-muted">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400/20 border border-blue-400/40 inline-block" /> Compact</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-400/20 border border-green-400/40 inline-block" /> Regular</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-400/20 border border-orange-400/40 inline-block" /> Large</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-quest-danger/20 border border-quest-danger/50 inline-block" /> Occupied</span>
                </div>
              </div>
            </div>

            {/* Active Tickets */}
            {activeTickets.length > 0 && (
              <div className="bg-quest-surface rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Active Vehicles ({activeTickets.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {activeTickets.map(ticket => (
                    <div key={ticket.id} className="bg-quest-bg rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <VehicleIcon type={ticket.vehicleType} size={16} className="text-quest-text" />
                        <span className="font-mono text-sm">{ticket.plate}</span>
                        <span className="text-xs text-quest-muted">Ticket #{ticket.id}</span>
                        <span className={`text-xs ${SPOT_TYPES[ticket.spotType].color}`}>
                          F{ticket.floorId + 1} / {SPOT_TYPES[ticket.spotType].label}
                        </span>
                      </div>
                      <button
                        onClick={() => exitVehicle(ticket.id)}
                        className="text-xs bg-quest-warning/20 text-quest-warning px-3 py-1 rounded hover:bg-quest-warning/30 transition-colors"
                      >
                        Exit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Allocation Log */}
            {allocationLog.length > 0 && (
              <div className="bg-quest-bg rounded-lg p-4 mb-6">
                <h4 className="text-xs font-semibold text-quest-muted mb-2">Allocation Log</h4>
                <div className="space-y-1 max-h-36 overflow-y-auto">
                  {allocationLog.map(entry => (
                    <div key={entry.id} className="text-xs flex gap-2">
                      <span className="text-quest-muted font-mono">{entry.time}</span>
                      <span className={
                        entry.type === 'success' ? 'text-quest-success' :
                        entry.type === 'error' ? 'text-quest-danger' :
                        'text-quest-muted'
                      }>
                        {entry.message}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary">Back</button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Class Diagram
                <ChevronDown size={16} className="-rotate-90" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== SECTION: CLASS DIAGRAM ==================== */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Class Diagram</h2>
            <p className="text-quest-muted mb-6">
              Here's how the core classes relate to each other. This is the kind of diagram
              interviewers expect you to sketch on a whiteboard.
            </p>

            {/* Enums */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 text-quest-secondary">Enumerations</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-quest-bg rounded-lg p-4 border border-quest-secondary/20">
                  <p className="font-mono text-sm text-quest-secondary mb-2">&laquo;enum&raquo; VehicleType</p>
                  <div className="text-xs text-quest-muted space-y-1 font-mono">
                    <p>MOTORCYCLE</p>
                    <p>CAR</p>
                    <p>TRUCK</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-quest-secondary/20">
                  <p className="font-mono text-sm text-quest-secondary mb-2">&laquo;enum&raquo; SpotType</p>
                  <div className="text-xs text-quest-muted space-y-1 font-mono">
                    <p>COMPACT</p>
                    <p>REGULAR</p>
                    <p>LARGE</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-quest-secondary/20">
                  <p className="font-mono text-sm text-quest-secondary mb-2">&laquo;enum&raquo; PaymentMethod</p>
                  <div className="text-xs text-quest-muted space-y-1 font-mono">
                    <p>CREDIT_CARD</p>
                    <p>DEBIT_CARD</p>
                    <p>CASH</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Classes */}
            <div className="space-y-4 mb-6">
              {/* ParkingLot */}
              <div className="bg-quest-surface rounded-xl p-6 border border-quest-primary/30">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-mono text-lg text-quest-primary font-bold">ParkingLot</p>
                    <p className="text-xs text-quest-muted">Singleton - only one instance</p>
                  </div>
                  <span className="text-xs bg-quest-primary/20 text-quest-primary px-2 py-0.5 rounded">Root Entity</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Attributes</p>
                    <div className="font-mono text-xs space-y-1">
                      <p>- name: String</p>
                      <p>- address: String</p>
                      <p>- floors: List&lt;Floor&gt;</p>
                      <p>- entryGates: List&lt;Gate&gt;</p>
                      <p>- exitGates: List&lt;Gate&gt;</p>
                      <p>- allocationStrategy: SpotAllocationStrategy</p>
                    </div>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Methods</p>
                    <div className="font-mono text-xs space-y-1">
                      <p>+ parkVehicle(vehicle): Ticket</p>
                      <p>+ exitVehicle(ticket): Payment</p>
                      <p>+ getAvailableSpots(type): int</p>
                      <p>+ isFull(): boolean</p>
                      <p>+ getOccupancy(): Map</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/10">
                <p className="font-mono text-lg text-green-400 font-bold mb-3">Floor</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Attributes</p>
                    <div className="font-mono text-xs space-y-1">
                      <p>- floorNumber: int</p>
                      <p>- spots: List&lt;ParkingSpot&gt;</p>
                    </div>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Methods</p>
                    <div className="font-mono text-xs space-y-1">
                      <p>+ getAvailableSpots(type): List&lt;ParkingSpot&gt;</p>
                      <p>+ isFull(): boolean</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ParkingSpot */}
              <div className="bg-quest-surface rounded-xl p-6 border border-white/10">
                <p className="font-mono text-lg text-blue-400 font-bold mb-3">ParkingSpot</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Attributes</p>
                    <div className="font-mono text-xs space-y-1">
                      <p>- spotId: String</p>
                      <p>- spotType: SpotType</p>
                      <p>- vehicle: Vehicle (nullable)</p>
                      <p>- isAvailable: boolean</p>
                    </div>
                  </div>
                  <div className="bg-quest-bg rounded p-3">
                    <p className="text-xs text-quest-muted mb-2">Methods</p>
                    <div className="font-mono text-xs space-y-1">
                      <p>+ assignVehicle(vehicle): void</p>
                      <p>+ removeVehicle(): Vehicle</p>
                      <p>+ canFit(vehicleType): boolean</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Hierarchy */}
              <div className="bg-quest-surface rounded-xl p-6 border border-orange-400/30">
                <div className="flex items-center gap-2 mb-3">
                  <p className="font-mono text-lg text-orange-400 font-bold">Vehicle</p>
                  <span className="text-xs bg-orange-400/20 text-orange-400 px-2 py-0.5 rounded">Abstract</span>
                </div>
                <div className="bg-quest-bg rounded p-3 mb-4">
                  <p className="text-xs text-quest-muted mb-2">Attributes</p>
                  <div className="font-mono text-xs space-y-1">
                    <p>- licensePlate: String</p>
                    <p>- vehicleType: VehicleType</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 bg-quest-bg rounded p-3 border border-orange-400/20">
                    <p className="font-mono text-sm text-orange-300 mb-1">Motorcycle</p>
                    <p className="text-xs text-quest-muted">extends Vehicle</p>
                    <p className="text-xs font-mono mt-1">fits: COMPACT+</p>
                  </div>
                  <div className="flex-1 bg-quest-bg rounded p-3 border border-orange-400/20">
                    <p className="font-mono text-sm text-orange-300 mb-1">Car</p>
                    <p className="text-xs text-quest-muted">extends Vehicle</p>
                    <p className="text-xs font-mono mt-1">fits: REGULAR+</p>
                  </div>
                  <div className="flex-1 bg-quest-bg rounded p-3 border border-orange-400/20">
                    <p className="font-mono text-sm text-orange-300 mb-1">Truck</p>
                    <p className="text-xs text-quest-muted">extends Vehicle</p>
                    <p className="text-xs font-mono mt-1">fits: LARGE only</p>
                  </div>
                </div>
              </div>

              {/* Ticket & Payment */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-surface rounded-xl p-6 border border-yellow-400/30">
                  <p className="font-mono text-lg text-yellow-400 font-bold mb-3">Ticket</p>
                  <div className="bg-quest-bg rounded p-3">
                    <div className="font-mono text-xs space-y-1">
                      <p>- ticketId: int</p>
                      <p>- vehicle: Vehicle</p>
                      <p>- spot: ParkingSpot</p>
                      <p>- entryTime: DateTime</p>
                      <p>- exitTime: DateTime</p>
                      <p>- status: TicketStatus</p>
                    </div>
                  </div>
                </div>
                <div className="bg-quest-surface rounded-xl p-6 border border-purple-400/30">
                  <p className="font-mono text-lg text-purple-400 font-bold mb-3">Payment</p>
                  <div className="bg-quest-bg rounded p-3">
                    <div className="font-mono text-xs space-y-1">
                      <p>- paymentId: int</p>
                      <p>- ticket: Ticket</p>
                      <p>- amount: double</p>
                      <p>- method: PaymentMethod</p>
                      <p>- timestamp: DateTime</p>
                      <p>+ calculate(ticket): double</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Relationships */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Relationships</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-quest-primary w-32">ParkingLot</span>
                  <span className="text-quest-muted">---1:N---&gt;</span>
                  <span className="font-mono text-green-400">Floor</span>
                  <span className="text-xs text-quest-muted ml-2">(composition)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-green-400 w-32">Floor</span>
                  <span className="text-quest-muted">---1:N---&gt;</span>
                  <span className="font-mono text-blue-400">ParkingSpot</span>
                  <span className="text-xs text-quest-muted ml-2">(composition)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-blue-400 w-32">ParkingSpot</span>
                  <span className="text-quest-muted">---0..1---&gt;</span>
                  <span className="font-mono text-orange-400">Vehicle</span>
                  <span className="text-xs text-quest-muted ml-2">(association)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-yellow-400 w-32">Ticket</span>
                  <span className="text-quest-muted">---1:1---&gt;</span>
                  <span className="font-mono text-orange-400">Vehicle, Spot</span>
                  <span className="text-xs text-quest-muted ml-2">(references)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-purple-400 w-32">Payment</span>
                  <span className="text-quest-muted">---1:1---&gt;</span>
                  <span className="font-mono text-yellow-400">Ticket</span>
                  <span className="text-xs text-quest-muted ml-2">(association)</span>
                </div>
              </div>
            </div>

            {/* Strategy Pattern */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6 border border-quest-secondary/30">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <span className="text-quest-secondary">Strategy Pattern:</span> Spot Allocation
              </h3>
              <div className="bg-quest-bg rounded-lg p-4 mb-4 font-mono text-xs space-y-1">
                <p className="text-quest-secondary">interface SpotAllocationStrategy {'{'}</p>
                <p className="pl-4">allocate(lot, vehicleType): ParkingSpot</p>
                <p className="text-quest-secondary">{'}'}</p>
                <p className="mt-2 text-quest-muted">// Implementations:</p>
                <p className="text-green-400">class NearestToEntrance implements SpotAllocationStrategy</p>
                <p className="text-blue-400">class SpreadAcrossFloors implements SpotAllocationStrategy</p>
                <p className="text-orange-400">class FillOneFloorFirst implements SpotAllocationStrategy</p>
              </div>
              <p className="text-sm text-quest-muted">
                The ParkingLot holds a reference to a SpotAllocationStrategy. You can swap strategies
                at runtime without changing the ParkingLot class. This is the{' '}
                <Term
                  word="Open/Closed Principle"
                  definition="Software entities should be open for extension but closed for modification. Adding a new allocation strategy doesn't require changing ParkingLot's code."
                  onLearn={learnTerm}
                />{' '}
                in action.
              </p>
            </div>

            <DeepDive id="singleton-parking" title="Why ParkingLot as a Singleton?" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p>
                  In most designs, there is exactly one ParkingLot instance. The{' '}
                  <Term
                    word="Singleton Pattern"
                    definition="A creational pattern ensuring a class has only one instance and provides a global point of access. Common for shared resources like ParkingLot, DatabaseConnection, Logger."
                    onLearn={learnTerm}
                  />{' '}
                  guarantees this.
                </p>
                <p>However, some interviewers prefer avoiding Singleton in favor of dependency injection - it makes testing easier. Know both approaches and their tradeoffs.</p>
              </div>
            </DeepDive>

            <DeepDive id="concurrency-gates" title="Handling Concurrent Gate Access" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p>If two cars arrive at different gates simultaneously and only one spot of the right type is left, you need thread safety.</p>
                <p><strong>Option 1: Synchronized method</strong> - Lock the parkVehicle() method. Simple but blocks all gates.</p>
                <p><strong>Option 2: Lock per spot type</strong> - Fine-grained locking. Cars and motorcycles don't block each other.</p>
                <p><strong>Option 3: Optimistic locking</strong> - Try to assign, retry if another thread got there first. Best for high throughput.</p>
              </div>
            </DeepDive>

            <div className="flex justify-between">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary">Back</button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Payment System
                <CreditCard size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== SECTION: PAYMENT ==================== */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Payment System</h2>
            <p className="text-quest-muted mb-6">
              Time-based billing: the fee depends on how long the vehicle was parked and its type.
              Exit a vehicle from the simulation tab first, then process payment here.
            </p>

            {/* Rate Card */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-quest-primary" />
                Rate Card (per hour)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(VEHICLE_TYPES).map(([key, v]) => (
                  <div key={key} className="bg-quest-bg rounded-lg p-4 text-center">
                    <VehicleIcon type={key} size={28} className="mx-auto text-quest-text mb-2" />
                    <p className="font-medium">{v.label}</p>
                    <p className="text-2xl font-mono font-bold text-quest-primary mt-1">${v.rate.toFixed(2)}</p>
                    <p className="text-xs text-quest-muted">per hour</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-quest-muted mt-3">
                Billing is per hour, rounded up. A 90-minute stay = 2 hours billed.
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="flex gap-3">
                {['credit', 'debit', 'cash'].map(method => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-2
                      ${paymentMethod === method
                        ? 'bg-quest-primary/20 border-quest-primary text-quest-primary'
                        : 'bg-quest-bg border-white/10 text-quest-muted hover:border-white/30'
                      }`}
                  >
                    <CreditCard size={14} />
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                    {method === 'credit' ? ' Card' : method === 'debit' ? ' Card' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Unpaid Tickets */}
            <div className="bg-quest-surface rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Unpaid Tickets ({exitedUnpaid.length})</h3>
              {exitedUnpaid.length === 0 ? (
                <div className="text-center py-8 text-quest-muted">
                  <Clock size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No unpaid tickets. Park and exit vehicles in the Simulation tab first.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {exitedUnpaid.map(ticket => {
                    const fee = calculateFee(ticket)
                    return (
                      <motion.div
                        key={ticket.id}
                        layout
                        className="bg-quest-bg rounded-lg p-4 border border-yellow-400/20"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <VehicleIcon type={ticket.vehicleType} size={20} className="text-quest-text" />
                            <div>
                              <p className="font-mono font-medium">{ticket.plate}</p>
                              <p className="text-xs text-quest-muted">
                                Ticket #{ticket.id} | {fee.minutes} min ({fee.hours}h billed)
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-lg font-mono font-bold text-quest-primary">${fee.total}</p>
                              <p className="text-xs text-quest-muted">${fee.rate}/hr x {fee.hours}h</p>
                            </div>
                            <button
                              onClick={() => processPayment(ticket.id)}
                              className="btn-primary text-sm px-4 py-2"
                            >
                              Pay
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Payment Log */}
            {paymentLog.length > 0 && (
              <div className="bg-quest-surface rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-quest-success" />
                  Payment History
                </h3>
                <div className="space-y-2">
                  {paymentLog.map(entry => (
                    <div key={entry.id} className="bg-quest-bg rounded-lg p-3 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <CheckCircle size={14} className="text-quest-success" />
                        <span className="font-mono">{entry.plate}</span>
                        <span className="text-xs text-quest-muted">Ticket #{entry.ticketId}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-quest-muted">{entry.duration} | {entry.method}</span>
                        <span className="font-mono text-quest-success font-medium">${entry.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex justify-between text-sm">
                  <span className="text-quest-muted">Total Revenue</span>
                  <span className="font-mono font-bold text-quest-success">
                    ${paymentLog.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {/* Fee Calculation Logic */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="font-semibold mb-4">Fee Calculation Logic</h3>
              <div className="font-mono text-xs space-y-1 text-quest-muted">
                <p className="text-quest-secondary">class HourlyFeeCalculator implements FeeStrategy {'{'}</p>
                <p className="pl-4">calculate(ticket): double {'{'}</p>
                <p className="pl-8">duration = ticket.exitTime - ticket.entryTime</p>
                <p className="pl-8">hours = ceil(duration / ONE_HOUR)</p>
                <p className="pl-8">rate = getRateForVehicle(ticket.vehicleType)</p>
                <p className="pl-8 text-quest-primary">return hours * rate</p>
                <p className="pl-4">{'}'}</p>
                <p className="text-quest-secondary">{'}'}</p>
              </div>
              <p className="text-sm text-quest-muted mt-4">
                The fee calculation is also a{' '}
                <Term
                  word="Strategy Pattern"
                  definition="A behavioral design pattern that lets you define a family of algorithms, encapsulate each one, and make them interchangeable. The parking lot can swap allocation strategies without changing its core code."
                  onLearn={learnTerm}
                />
                . You could swap HourlyFeeCalculator for FlatRateFeeCalculator or
                TimeTieredFeeCalculator without touching the Payment class.
              </p>
            </div>

            <DeepDive id="payment-extensibility" title="Extending the Payment System" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p><strong>Multiple fee strategies:</strong> Flat rate for short stays, hourly for longer, daily max cap. Use Strategy pattern to swap.</p>
                <p><strong>Discounts:</strong> Early bird, monthly pass, loyalty. Decorator pattern can wrap the base fee calculator.</p>
                <p><strong>Payment methods:</strong> Each method (credit, debit, cash, mobile) implements a PaymentProcessor interface. New methods don't change existing code.</p>
                <p><strong>Receipts:</strong> Observer pattern - when payment completes, notify receipt generator, analytics, and loyalty system.</p>
              </div>
            </DeepDive>

            <DeepDive id="scalability" title="Scalability Considerations" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p><strong>Multiple gates:</strong> Concurrent spot allocation needs synchronization (locks or CAS operations).</p>
                <p><strong>Real-time displays:</strong> Occupancy boards at each floor need to be updated. Use Observer pattern - spots notify displays on state change.</p>
                <p><strong>Database persistence:</strong> Ticket and Payment data should be persisted. Use Repository pattern to abstract storage.</p>
                <p><strong>Distributed system:</strong> For a chain of parking lots, you might need a central service with per-lot instances. Consider eventual consistency for cross-lot reporting.</p>
              </div>
            </DeepDive>

            <div className="flex justify-between">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary">Back</button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <CheckCircle size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ==================== SECTION: QUIZ ==================== */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Test your understanding of the Parking Lot LLD. Score at least 4/6 to complete this level.
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
                          className={`w-full text-left p-3 rounded-lg border transition-all
                            ${isSelected
                              ? showResult
                                ? isCorrect ? 'border-quest-success bg-quest-success/10' : 'border-quest-danger bg-quest-danger/10'
                                : 'border-quest-primary bg-quest-primary/10'
                              : showResult && isCorrect
                                ? 'border-quest-success bg-quest-success/10'
                                : 'border-white/10 hover:border-white/30'
                            }`}
                        >
                          <span className="text-sm">{option.text}</span>
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
                className={`mt-6 rounded-lg p-6 text-center border ${
                  quizScore >= 4
                    ? 'bg-quest-success/10 border-quest-success/30'
                    : 'bg-quest-warning/10 border-quest-warning/30'
                }`}
              >
                <CheckCircle size={48} className={`mx-auto mb-4 ${quizScore >= 4 ? 'text-quest-success' : 'text-quest-warning'}`} />
                <h3 className="text-xl font-bold mb-2">
                  {quizScore >= 4 ? 'Level 44 Complete!' : `${quizScore}/6 Correct`}
                </h3>
                <p className="text-quest-muted mb-4">
                  {quizScore >= 4
                    ? 'You\'ve nailed the Parking Lot design! You understand class hierarchies, design patterns, and how to model real-world systems in OOP.'
                    : 'Review the class diagram and payment sections, then try again. You need at least 4 correct answers.'
                  }
                </p>
                {quizScore >= 4 && (
                  <p className="text-sm text-quest-primary">
                    Key takeaways: Enums for type safety, Strategy for swappable algorithms, Composition for has-a relationships, Inheritance for is-a hierarchies.
                  </p>
                )}
                {quizScore < 4 && (
                  <button
                    onClick={() => { setQuizSubmitted(false); setQuizAnswers({}) }}
                    className="btn-primary mt-4"
                  >
                    Try Again
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, RotateCcw, Zap, Server, Monitor,
  ArrowRight, CheckCircle, AlertTriangle, XCircle,
  Clock, Activity, HelpCircle, ChevronDown, ChevronUp,
  Heart, ShoppingCart, Search, ToggleLeft, ToggleRight,
  Image, Send, ThumbsUp, Star, Loader2
} from 'lucide-react'

// ============================================
// TERMINOLOGY COMPONENT
// ============================================
function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)

  const handleClick = () => {
    setShowTooltip(!showTooltip)
    if (onLearn) onLearn(word)
  }

  return (
    <span className="relative inline-block">
      <span
        className="term cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
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

  const toggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen && onRead) onRead(id)
  }

  return (
    <div className="bg-quest-surface/50 rounded-lg border border-quest-secondary/30 overflow-hidden my-6">
      <button
        onClick={toggle}
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
            <div className="pt-2 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================
// FEEL THE LATENCY - Interactive Experience
// ============================================
function FeelTheLatency() {
  const [selectedLatency, setSelectedLatency] = useState(50)
  const [likeLoading, setLikeLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const [cartLoading, setCartLoading] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [toggleLoading, setToggleLoading] = useState(false)
  const [toggleOn, setToggleOn] = useState(false)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [rating, setRating] = useState(0)
  const [ratingLoading, setRatingLoading] = useState(false)

  const searchTimeoutRef = useRef(null)

  const latencyOptions = [
    { value: 50, label: '50ms', description: 'Instant - Local/Cached', color: 'text-quest-success' },
    { value: 100, label: '100ms', description: 'Fast - Same region', color: 'text-quest-success' },
    { value: 200, label: '200ms', description: 'OK - Cross-country', color: 'text-quest-primary' },
    { value: 500, label: '500ms', description: 'Slow - Noticeable lag', color: 'text-quest-warning' },
    { value: 1000, label: '1000ms', description: 'Painful - Users leave', color: 'text-quest-danger' },
    { value: 2000, label: '2000ms', description: 'Unbearable - Broken', color: 'text-quest-danger' },
  ]

  const fakeSearchResults = [
    'System Design Interview',
    'System Design Primer',
    'System Design Basics',
    'System Architecture Patterns',
    'Scalable Web Applications'
  ]

  // Like action
  const handleLike = async () => {
    setLikeLoading(true)
    await new Promise(resolve => setTimeout(resolve, selectedLatency))
    setLiked(!liked)
    setLikeLoading(false)
  }

  // Add to cart action
  const handleAddToCart = async () => {
    setCartLoading(true)
    await new Promise(resolve => setTimeout(resolve, selectedLatency))
    setCartCount(prev => prev + 1)
    setCartLoading(false)
  }

  // Search with debounce
  const handleSearch = (value) => {
    setSearchQuery(value)
    setSearchResults([])

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (value.length > 0) {
      setSearchLoading(true)
      searchTimeoutRef.current = setTimeout(() => {
        const filtered = fakeSearchResults.filter(r =>
          r.toLowerCase().includes(value.toLowerCase())
        )
        setSearchResults(filtered.length > 0 ? filtered : ['No results found'])
        setSearchLoading(false)
      }, selectedLatency)
    } else {
      setSearchLoading(false)
    }
  }

  // Toggle action
  const handleToggle = async () => {
    setToggleLoading(true)
    await new Promise(resolve => setTimeout(resolve, selectedLatency))
    setToggleOn(!toggleOn)
    setToggleLoading(false)
  }

  // Load image action
  const handleLoadImage = async () => {
    setImageLoading(true)
    setImageLoaded(false)
    await new Promise(resolve => setTimeout(resolve, selectedLatency * 3)) // Images take longer
    setImageLoaded(true)
    setImageLoading(false)
  }

  // Rating action
  const handleRating = async (stars) => {
    setRatingLoading(true)
    await new Promise(resolve => setTimeout(resolve, selectedLatency))
    setRating(stars)
    setRatingLoading(false)
  }

  // Reset all
  const resetAll = () => {
    setLiked(false)
    setCartCount(0)
    setSearchQuery('')
    setSearchResults([])
    setToggleOn(false)
    setImageLoaded(false)
    setRating(0)
  }

  return (
    <div className="bg-gradient-to-br from-quest-surface to-quest-bg rounded-xl p-6 border border-quest-primary/30 my-8">
      <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Zap className="text-quest-warning" size={20} />
        🎮 Feel The Latency
      </h4>
      <p className="text-sm text-quest-muted mb-6">
        Words don't do justice. <strong>Experience</strong> how different response times feel.
        Select a latency and try each action below.
      </p>

      {/* Latency Selector */}
      <div className="mb-6">
        <p className="text-xs text-quest-muted mb-3">Select simulated server response time:</p>
        <div className="flex flex-wrap gap-2">
          {latencyOptions.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedLatency(option.value)}
              className={`
                px-3 py-2 rounded-lg text-sm transition-all border
                ${selectedLatency === option.value
                  ? 'bg-quest-primary text-quest-bg border-quest-primary'
                  : 'bg-quest-bg border-white/10 hover:border-quest-primary/50'
                }
              `}
            >
              <span className="font-mono font-bold">{option.label}</span>
              <span className={`block text-xs ${selectedLatency === option.value ? 'text-quest-bg/70' : option.color}`}>
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Latency Display */}
      <div className="bg-quest-bg rounded-lg p-3 mb-6 flex items-center justify-between">
        <span className="text-sm text-quest-muted">Current simulated latency:</span>
        <span className={`font-mono font-bold text-lg ${
          selectedLatency <= 100 ? 'text-quest-success' :
          selectedLatency <= 200 ? 'text-quest-primary' :
          selectedLatency <= 500 ? 'text-quest-warning' : 'text-quest-danger'
        }`}>
          {selectedLatency}ms
        </span>
      </div>

      {/* Interactive Actions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">

        {/* 1. Like Button */}
        <div className="bg-quest-bg rounded-lg p-4">
          <p className="text-xs text-quest-muted mb-3">Action: Like a post</p>
          <button
            onClick={handleLike}
            disabled={likeLoading}
            className={`
              w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all
              ${liked
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/50'
                : 'bg-quest-surface border border-white/10 hover:border-pink-500/50'
              }
              ${likeLoading ? 'opacity-70' : ''}
            `}
          >
            {likeLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Heart size={20} className={liked ? 'fill-current' : ''} />
            )}
            <span>{liked ? 'Liked!' : 'Like'}</span>
          </button>
          <p className="text-xs text-quest-muted mt-2 text-center">
            {likeLoading ? 'Waiting for server...' : liked ? 'Try clicking again' : 'Click to like'}
          </p>
        </div>

        {/* 2. Add to Cart */}
        <div className="bg-quest-bg rounded-lg p-4">
          <p className="text-xs text-quest-muted mb-3">Action: Add to cart</p>
          <button
            onClick={handleAddToCart}
            disabled={cartLoading}
            className={`
              w-full flex items-center justify-center gap-2 py-3 rounded-lg transition-all
              bg-quest-surface border border-white/10 hover:border-quest-success/50
              ${cartLoading ? 'opacity-70' : ''}
            `}
          >
            {cartLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <ShoppingCart size={20} />
            )}
            <span>Add to Cart</span>
            {cartCount > 0 && (
              <span className="bg-quest-success text-quest-bg text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <p className="text-xs text-quest-muted mt-2 text-center">
            {cartLoading ? 'Adding...' : `${cartCount} items in cart`}
          </p>
        </div>

        {/* 3. Toggle Switch */}
        <div className="bg-quest-bg rounded-lg p-4">
          <p className="text-xs text-quest-muted mb-3">Action: Toggle setting</p>
          <button
            onClick={handleToggle}
            disabled={toggleLoading}
            className={`
              w-full flex items-center justify-center gap-3 py-3 rounded-lg transition-all
              bg-quest-surface border border-white/10
              ${toggleLoading ? 'opacity-70' : ''}
            `}
          >
            {toggleLoading ? (
              <Loader2 size={24} className="animate-spin" />
            ) : toggleOn ? (
              <ToggleRight size={32} className="text-quest-success" />
            ) : (
              <ToggleLeft size={32} className="text-quest-muted" />
            )}
            <span>{toggleOn ? 'Enabled' : 'Disabled'}</span>
          </button>
          <p className="text-xs text-quest-muted mt-2 text-center">
            {toggleLoading ? 'Saving preference...' : 'Click to toggle'}
          </p>
        </div>

        {/* 4. Search Input */}
        <div className="bg-quest-bg rounded-lg p-4">
          <p className="text-xs text-quest-muted mb-3">Action: Search (type anything)</p>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-quest-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Type to search..."
              className="w-full bg-quest-surface border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:border-quest-primary focus:outline-none"
            />
            {searchLoading && (
              <Loader2 size={16} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-quest-primary" />
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="mt-2 bg-quest-surface rounded-lg overflow-hidden border border-white/10">
              {searchResults.map((result, i) => (
                <div key={i} className="px-3 py-2 text-xs hover:bg-white/5 cursor-pointer">
                  {result}
                </div>
              ))}
            </div>
          )}
          <p className="text-xs text-quest-muted mt-2 text-center">
            {searchLoading ? 'Fetching results...' : 'Notice the delay before results appear'}
          </p>
        </div>

        {/* 5. Star Rating */}
        <div className="bg-quest-bg rounded-lg p-4">
          <p className="text-xs text-quest-muted mb-3">Action: Rate (1-5 stars)</p>
          <div className="flex justify-center gap-1 py-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                disabled={ratingLoading}
                className={`p-1 transition-all ${ratingLoading ? 'opacity-50' : 'hover:scale-110'}`}
              >
                <Star
                  size={28}
                  className={star <= rating ? 'text-yellow-400 fill-current' : 'text-quest-muted'}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-quest-muted mt-2 text-center">
            {ratingLoading ? 'Submitting rating...' : rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
          </p>
        </div>

        {/* 6. Load Image */}
        <div className="bg-quest-bg rounded-lg p-4">
          <p className="text-xs text-quest-muted mb-3">Action: Load image</p>
          <div className="h-20 bg-quest-surface rounded-lg flex items-center justify-center border border-white/10 mb-2 overflow-hidden">
            {imageLoading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={24} className="animate-spin text-quest-primary" />
                <span className="text-xs text-quest-muted">Loading...</span>
              </div>
            ) : imageLoaded ? (
              <div className="w-full h-full bg-gradient-to-br from-quest-primary/30 to-quest-secondary/30 flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
            ) : (
              <Image size={24} className="text-quest-muted" />
            )}
          </div>
          <button
            onClick={handleLoadImage}
            disabled={imageLoading}
            className="w-full py-2 text-sm bg-quest-surface rounded-lg border border-white/10 hover:border-quest-primary/50 disabled:opacity-50"
          >
            {imageLoading ? 'Loading...' : imageLoaded ? 'Reload Image' : 'Load Image'}
          </button>
          <p className="text-xs text-quest-muted mt-2 text-center">
            Images feel 3x the latency
          </p>
        </div>
      </div>

      {/* Reset & Insight */}
      <div className="flex items-center justify-between">
        <button
          onClick={resetAll}
          className="text-sm text-quest-muted hover:text-quest-primary transition-colors"
        >
          Reset all actions
        </button>

        <div className="text-right">
          <p className="text-xs text-quest-muted">
            {selectedLatency <= 100 && '✨ This feels snappy! Users love it.'}
            {selectedLatency > 100 && selectedLatency <= 200 && '👍 Still acceptable for most actions.'}
            {selectedLatency > 200 && selectedLatency <= 500 && '😐 Users notice the delay now.'}
            {selectedLatency > 500 && selectedLatency <= 1000 && '😤 Frustrating. Users may give up.'}
            {selectedLatency > 1000 && '💀 Unusable. Every click is painful.'}
          </p>
        </div>
      </div>

      {/* Key Insight Box */}
      <div className="mt-4 bg-quest-warning/10 border border-quest-warning/30 rounded-lg p-4">
        <p className="text-sm text-quest-warning font-semibold mb-1">💡 Key Insight</p>
        <p className="text-sm text-quest-muted">
          At <strong>50-100ms</strong>, actions feel instant. At <strong>200-300ms</strong>, there's a noticeable pause.
          At <strong>500ms+</strong>, users feel like the app is broken. At <strong>1 second+</strong>, they leave.
          <br /><br />
          <em>This is why companies spend millions optimizing latency. Every millisecond matters.</em>
        </p>
      </div>
    </div>
  )
}

// ============================================
// REQUEST PARTICLE ANIMATION
// ============================================
function RequestParticle({ id, status, onComplete }) {
  const colors = {
    pending: '#00d4ff',
    success: '#10b981',
    failed: '#ef4444',
    processing: '#f59e0b'
  }

  return (
    <motion.div
      className="absolute w-4 h-4 rounded-full"
      style={{
        background: `radial-gradient(circle, ${colors[status]} 0%, transparent 70%)`,
        boxShadow: `0 0 10px ${colors[status]}, 0 0 20px ${colors[status]}`,
      }}
      initial={{ left: '10%', top: '50%', scale: 0 }}
      animate={
        status === 'pending'
          ? { left: '45%', scale: 1 }
          : status === 'processing'
            ? { left: '45%', scale: [1, 1.2, 1] }
            : status === 'success'
              ? { left: '10%', scale: 1 }
              : { left: '45%', scale: 0, opacity: 0 }
      }
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (status === 'success' || status === 'failed') {
          onComplete?.(id)
        }
      }}
    />
  )
}

// ============================================
// SERVER VISUALIZATION
// ============================================
function ServerViz({ load, status, requestsProcessed }) {
  const getStatusColor = () => {
    if (status === 'crashed') return 'border-quest-danger'
    if (load > 80) return 'border-quest-warning'
    return 'border-quest-success'
  }

  const getStatusIcon = () => {
    if (status === 'crashed') return <XCircle className="text-quest-danger" />
    if (load > 80) return <AlertTriangle className="text-quest-warning" />
    return <CheckCircle className="text-quest-success" />
  }

  return (
    <motion.div
      className={`server-box w-48 ${getStatusColor()}`}
      animate={
        status === 'crashed'
          ? { x: [0, -5, 5, -5, 5, 0] }
          : load > 80
            ? { scale: [1, 1.02, 1] }
            : {}
      }
      transition={{ duration: 0.3, repeat: status === 'crashed' ? 0 : Infinity }}
    >
      {/* Server Icon */}
      <div className="flex justify-center mb-4">
        <Server size={48} className={status === 'crashed' ? 'text-quest-danger' : 'text-quest-primary'} />
      </div>

      {/* Status */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {getStatusIcon()}
        <span className="text-sm font-medium">
          {status === 'crashed' ? 'CRASHED!' : load > 80 ? 'OVERLOADED' : 'HEALTHY'}
        </span>
      </div>

      {/* Load Bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs text-quest-muted mb-1">
          <span>CPU Load</span>
          <span>{Math.round(load)}%</span>
        </div>
        <div className="h-2 bg-quest-bg rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${load > 80 ? 'bg-quest-warning' : load > 50 ? 'bg-quest-primary' : 'bg-quest-success'
              }`}
            animate={{ width: `${Math.min(load, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="text-xs text-quest-muted text-center mt-4">
        {requestsProcessed} requests processed
      </div>
    </motion.div>
  )
}

// ============================================
// FACEBOOK OUTAGE COST TICKER
// ============================================
function FacebookOutageCostTicker() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0) // seconds
  const intervalRef = useRef(null)

  const COST_PER_SECOND = 13_300_000 / 3600 // $13.3M per hour in ad revenue
  const TOTAL_OUTAGE_SECONDS = 6 * 3600 + 13 * 60 // 6h 13m

  useEffect(() => {
    if (isRunning && elapsed < TOTAL_OUTAGE_SECONDS) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          const next = prev + 60 // advance 1 minute per tick
          if (next >= TOTAL_OUTAGE_SECONDS) {
            setIsRunning(false)
            return TOTAL_OUTAGE_SECONDS
          }
          return next
        })
      }, 50) // fast animation
    }
    return () => clearInterval(intervalRef.current)
  }, [isRunning, elapsed])

  const cost = elapsed * COST_PER_SECOND
  const hours = Math.floor(elapsed / 3600)
  const minutes = Math.floor((elapsed % 3600) / 60)
  const progress = (elapsed / TOTAL_OUTAGE_SECONDS) * 100

  const formatMoney = (amount) => {
    if (amount >= 1_000_000) return `$${(amount / 1_000_000).toFixed(1)}M`
    if (amount >= 1_000) return `$${(amount / 1_000).toFixed(0)}K`
    return `$${amount.toFixed(0)}`
  }

  return (
    <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-quest-danger/20">
      <h3 className="text-lg font-semibold mb-2">Watch the Money Burn</h3>
      <p className="text-xs text-quest-muted mb-4">
        Press play to watch Facebook's ad revenue loss tick up in real-time (accelerated).
        Each tick = 1 minute of outage.
      </p>

      {/* Timer Display */}
      <div className="flex items-center justify-center gap-8 mb-4">
        <div className="text-center">
          <p className="text-xs text-quest-muted mb-1">Time Down</p>
          <p className="text-2xl font-mono font-bold">
            {hours}h {minutes.toString().padStart(2, '0')}m
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-quest-muted mb-1">Ad Revenue Lost</p>
          <p className={`text-3xl font-mono font-bold ${cost > 50_000_000 ? 'text-quest-danger' : cost > 20_000_000 ? 'text-quest-warning' : 'text-quest-primary'}`}>
            {formatMoney(cost)}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-quest-surface rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-quest-warning to-quest-danger"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Milestones */}
      <div className="flex justify-between text-xs text-quest-muted mb-4">
        <span>0h</span>
        <span className={elapsed > 3600 ? 'text-quest-warning' : ''}>1h: ~$13M</span>
        <span className={elapsed > 10800 ? 'text-quest-warning' : ''}>3h: ~$40M</span>
        <span className={elapsed > TOTAL_OUTAGE_SECONDS - 60 ? 'text-quest-danger font-bold' : ''}>6h13m: ~$80M</span>
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${isRunning ? 'bg-quest-warning/20 text-quest-warning' : 'bg-quest-primary/20 text-quest-primary'}`}
        >
          {isRunning ? <Pause size={16} /> : <Play size={16} />}
          {isRunning ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}
        </button>
        <button
          onClick={() => { setIsRunning(false); setElapsed(0) }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-quest-surface text-quest-muted"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
    </div>
  )
}

// ============================================
// MAIN LEVEL 1 COMPONENT
// ============================================
export default function Level1({ levelId, onComplete, learnTerm, markDeepDiveRead, unlockAchievement }) {
  // Simulation state
  const [isRunning, setIsRunning] = useState(false)
  const [requestRate, setRequestRate] = useState(1) // requests per second
  const [requests, setRequests] = useState([])
  const [serverLoad, setServerLoad] = useState(0)
  const [serverStatus, setServerStatus] = useState('healthy') // healthy, overloaded, crashed
  const [requestsProcessed, setRequestsProcessed] = useState(0)
  const [requestsFailed, setRequestsFailed] = useState(0)
  const [latency, setLatency] = useState(50) // ms
  const [currentSection, setCurrentSection] = useState(0)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = [
    'intro',
    'simulation',
    'concepts',
    'side quest',
    'quiz'
  ]

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setIsRunning(false)
    setRequests([])
    setServerLoad(0)
    setServerStatus('healthy')
    setRequestsProcessed(0)
    setRequestsFailed(0)
    setLatency(50)
  }, [])

  // Send a single request
  const sendRequest = useCallback(() => {
    if (serverStatus === 'crashed') return

    const newRequest = {
      id: Date.now() + Math.random(),
      status: 'pending',
      timestamp: Date.now()
    }

    setRequests(prev => [...prev, newRequest])

    // Simulate processing
    setTimeout(() => {
      setRequests(prev =>
        prev.map(r =>
          r.id === newRequest.id ? { ...r, status: 'processing' } : r
        )
      )

      // Complete or fail based on server status
      setTimeout(() => {
        const willFail = serverLoad > 90 || serverStatus === 'crashed'
        setRequests(prev =>
          prev.map(r =>
            r.id === newRequest.id
              ? { ...r, status: willFail ? 'failed' : 'success' }
              : r
          )
        )

        if (willFail) {
          setRequestsFailed(prev => prev + 1)
        } else {
          setRequestsProcessed(prev => prev + 1)
          if (requestsProcessed === 0) {
            unlockAchievement?.('first_request')
          }
        }

        // Clean up old requests
        setTimeout(() => {
          setRequests(prev => prev.filter(r => r.id !== newRequest.id))
        }, 500)
      }, 100 + Math.random() * 100)
    }, latency)
  }, [serverStatus, serverLoad, latency, requestsProcessed, unlockAchievement])

  // Auto-send requests when running
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      sendRequest()
    }, 1000 / requestRate)

    return () => clearInterval(interval)
  }, [isRunning, requestRate, sendRequest])

  // Update server load based on active requests
  useEffect(() => {
    const activeRequests = requests.filter(
      r => r.status === 'pending' || r.status === 'processing'
    ).length

    // Each request adds load
    const newLoad = Math.min(activeRequests * (10 + requestRate * 5), 100)
    setServerLoad(newLoad)

    // Update latency based on load
    setLatency(50 + (newLoad * 2))

    // Check for crash
    if (newLoad >= 100 && serverStatus !== 'crashed') {
      setServerStatus('crashed')
      unlockAchievement?.('server_crash')
    } else if (newLoad > 80 && serverStatus === 'healthy') {
      setServerStatus('overloaded')
    } else if (newLoad < 50 && serverStatus === 'overloaded') {
      setServerStatus('healthy')
    }
  }, [requests, requestRate, serverStatus, unlockAchievement])

  // Quiz questions
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What happens when a single server receives more requests than it can handle?',
      options: [
        { id: 'a', text: 'It automatically creates more servers', correct: false },
        { id: 'b', text: 'It slows down (increased latency) and may crash', correct: true },
        { id: 'c', text: 'Nothing, servers have unlimited capacity', correct: false },
        { id: 'd', text: 'The internet slows down for everyone', correct: false },
      ]
    },
    {
      id: 'q2',
      question: 'In the client-server model, who initiates the communication?',
      options: [
        { id: 'a', text: 'The server sends data first', correct: false },
        { id: 'b', text: 'Both simultaneously', correct: false },
        { id: 'c', text: 'The client sends a request first', correct: true },
        { id: 'd', text: 'The internet provider', correct: false },
      ]
    },
    {
      id: 'q3',
      question: 'What is latency in the context of web requests?',
      options: [
        { id: 'a', text: 'The number of requests a server can handle', correct: false },
        { id: 'b', text: 'The time it takes for a request to travel and get a response', correct: true },
        { id: 'c', text: 'The server\'s CPU speed', correct: false },
        { id: 'd', text: 'The size of the response data', correct: false },
      ]
    }
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    const allCorrect = quizQuestions.every(
      q => quizAnswers[q.id] === q.options.find(o => o.correct)?.id
    )
    if (allCorrect) {
      unlockAchievement?.('perfectionist')
    }
    onComplete?.()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Section Navigation */}
      <div className="flex justify-center gap-2 mb-8">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all
              ${currentSection === index
                ? 'bg-quest-primary text-quest-bg'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }
            `}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* SECTION: INTRO */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🖥️ Welcome to the Beginning</h2>

            <p className="text-quest-muted mb-4">
              Every web application you've ever used—Google, Netflix, your banking app—started
              somewhere simple: a single computer, called a{' '}
              <Term
                word="server"
                definition="A computer that 'serves' data to other computers (clients). It waits for requests and responds to them."
                onLearn={learnTerm}
              />, waiting to answer questions from users.
            </p>

            <p className="text-quest-muted mb-4">
              Right now, we're going to explore what happens inside this fundamental
              relationship—the{' '}
              <Term
                word="client-server model"
                definition="A distributed application structure where tasks are split between 'servers' (providers of a resource) and 'clients' (service requesters)."
                onLearn={learnTerm}
              />.
            </p>

            <div className="bg-quest-bg rounded-lg p-6 my-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Zap size={18} className="text-quest-warning" />
                The Big Picture
              </h3>

              <div className="flex items-center justify-around">
                <div className="text-center">
                  <Monitor size={48} className="mx-auto text-quest-primary mb-2" />
                  <p className="font-medium">Client</p>
                  <p className="text-xs text-quest-muted">Your browser</p>
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="text-quest-success" />
                  <span className="text-xs text-quest-muted mt-1">Request</span>
                  <span className="text-xs text-quest-success">→ "Give me the homepage"</span>
                </div>

                <div className="text-center">
                  <Server size={48} className="mx-auto text-quest-secondary mb-2" />
                  <p className="font-medium">Server</p>
                  <p className="text-xs text-quest-muted">The computer serving you</p>
                </div>

                <div className="flex flex-col items-center">
                  <ArrowRight className="text-quest-primary rotate-180" />
                  <span className="text-xs text-quest-muted mt-1">Response</span>
                  <span className="text-xs text-quest-primary">← Here's the HTML</span>
                </div>

                <div className="text-center">
                  <Monitor size={48} className="mx-auto text-quest-primary mb-2" />
                  <p className="font-medium">Client</p>
                  <p className="text-xs text-quest-muted">Renders the page</p>
                </div>
              </div>
            </div>

            <DeepDive
              id="what-is-server"
              title="Why 'Server'? A Quick History"
              onRead={markDeepDiveRead}
            >
              <p className="text-sm text-quest-muted mb-3">
                The term "server" comes from the restaurant world—it's the one who serves you.
                In computing, this metaphor stuck: a server "serves" information to whoever asks.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                Back in the 1960s and 70s, computers were massive, expensive machines. It made
                sense to have one powerful computer (the server) that many users could share.
                People would connect using "dumb terminals" (just a screen and keyboard—no
                processing power).
              </p>
              <p className="text-sm text-quest-muted">
                Today, your phone has more computing power than those old servers, but the
                model persists because it's incredibly useful: centralized data, centralized
                logic, distributed access.
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentSection(1)}
                className="btn-primary flex items-center gap-2"
              >
                Let's See It In Action
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SIMULATION */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">🎮 Interactive Simulation</h2>

            <p className="text-quest-muted mb-6">
              You're now the architect. Below is a single server. Send requests to it
              and watch what happens. Try to crash it (yes, really—breaking things teaches).
            </p>

            {/* Simulation Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`btn-${isRunning ? 'secondary' : 'primary'} flex items-center gap-2`}
              >
                {isRunning ? <Pause size={18} /> : <Play size={18} />}
                {isRunning ? 'Pause' : 'Start'} Traffic
              </button>

              <button
                onClick={sendRequest}
                disabled={serverStatus === 'crashed'}
                className="btn-secondary flex items-center gap-2"
              >
                <Zap size={18} />
                Send Request
              </button>

              <button
                onClick={resetSimulation}
                className="btn-secondary flex items-center gap-2"
              >
                <RotateCcw size={18} />
                Reset
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-quest-muted">Request Rate:</span>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={requestRate}
                  onChange={(e) => setRequestRate(Number(e.target.value))}
                  className="w-32"
                />
                <span className="text-sm font-mono w-16">{requestRate}/sec</span>
              </div>
            </div>

            {/* Visualization */}
            <div className="relative bg-quest-bg rounded-xl p-8 min-h-[300px] overflow-hidden">
              {/* Client */}
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-center">
                <Monitor size={48} className="mx-auto text-quest-primary mb-2" />
                <p className="text-sm font-medium">Clients</p>
                <p className="text-xs text-quest-muted">(Users)</p>
              </div>

              {/* Request Particles */}
              {requests.map(request => (
                <RequestParticle
                  key={request.id}
                  id={request.id}
                  status={request.status}
                  onComplete={(id) => setRequests(prev => prev.filter(r => r.id !== id))}
                />
              ))}

              {/* Server */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <ServerViz
                  load={serverLoad}
                  status={serverStatus}
                  requestsProcessed={requestsProcessed}
                />
              </div>

              {/* Connection Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="15%"
                  y1="50%"
                  x2="60%"
                  y2="50%"
                  className="connection-line"
                  strokeDasharray="10,5"
                />
              </svg>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Activity size={16} className="text-quest-primary" />
                  <span className="text-xs text-quest-muted">Latency</span>
                </div>
                <p className="text-2xl font-mono font-bold">
                  {Math.round(latency)}
                  <span className="text-sm text-quest-muted ml-1">ms</span>
                </p>
              </div>

              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-quest-success" />
                  <span className="text-xs text-quest-muted">Processed</span>
                </div>
                <p className="text-2xl font-mono font-bold text-quest-success">
                  {requestsProcessed}
                </p>
              </div>

              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <XCircle size={16} className="text-quest-danger" />
                  <span className="text-xs text-quest-muted">Failed</span>
                </div>
                <p className="text-2xl font-mono font-bold text-quest-danger">
                  {requestsFailed}
                </p>
              </div>

              <div className="bg-quest-surface rounded-lg p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock size={16} className="text-quest-warning" />
                  <span className="text-xs text-quest-muted">Server Load</span>
                </div>
                <p className={`text-2xl font-mono font-bold ${serverLoad > 80 ? 'text-quest-warning' : 'text-quest-text'
                  }`}>
                  {Math.round(serverLoad)}%
                </p>
              </div>
            </div>

            {/* Crash Message */}
            <AnimatePresence>
              {serverStatus === 'crashed' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-6 bg-quest-danger/20 border border-quest-danger/50 rounded-lg p-4"
                >
                  <h3 className="font-bold text-quest-danger flex items-center gap-2">
                    <XCircle size={20} />
                    Server Crashed!
                  </h3>
                  <p className="text-sm text-quest-muted mt-2">
                    This is exactly what happens to real systems when they're overwhelmed.
                    Your server couldn't keep up with the requests. In the real world,
                    this means angry users, lost revenue, and 2 AM wake-up calls.
                  </p>
                  <p className="text-sm text-quest-primary mt-2">
                    🎉 But hey—you just experienced why "scaling" exists! Let's learn how to prevent this.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentSection(0)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowRight size={18} className="rotate-180" />
                Back to Intro
              </button>

              <button
                onClick={() => setCurrentSection(2)}
                className="btn-primary flex items-center gap-2"
              >
                Learn the Concepts
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: CONCEPTS */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-6">📚 Key Concepts</h2>

            {/* Latency */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Clock className="text-quest-primary" size={24} />
                <Term
                  word="Latency"
                  definition="The time delay between a user's action and the system's response. Measured in milliseconds (ms)."
                  onLearn={learnTerm}
                />
              </h3>

              <p className="text-quest-muted mb-4">
                Latency is the time it takes for a request to travel to the server and
                back. Think of it like ordering at a restaurant—latency is the time between
                "I'll have the pizza" and the pizza arriving at your table.
              </p>

              <div className="bg-quest-bg rounded-lg p-4">
                <p className="text-sm font-mono mb-2">Real-world latency examples:</p>
                <ul className="text-sm text-quest-muted space-y-1">
                  <li>• <span className="text-quest-success">50ms</span> - Same city, feels instant</li>
                  <li>• <span className="text-quest-primary">150ms</span> - Cross-country, still good</li>
                  <li>• <span className="text-quest-warning">300ms</span> - Across the globe, noticeable</li>
                  <li>• <span className="text-quest-danger">1000ms+</span> - Users start leaving</li>
                </ul>
              </div>

              <DeepDive
                id="latency-why"
                title="Why Does Latency Matter So Much?"
                onRead={markDeepDiveRead}
              >
                <p className="text-sm text-quest-muted mb-3">
                  Amazon found that every 100ms of latency cost them 1% of sales. Google found
                  that a 500ms delay caused 20% fewer searches. Humans perceive anything over
                  100ms as "not instant."
                </p>
                <p className="text-sm text-quest-muted">
                  This is why system design cares so much about reducing latency—through caching
                  (which we'll cover in Level 4), CDNs (Level 10), and smart architecture choices.
                </p>
              </DeepDive>

              {/* FEEL THE LATENCY - Interactive Demo */}
              <FeelTheLatency />
            </div>

            {/* Throughput */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Activity className="text-quest-secondary" size={24} />
                <Term
                  word="Throughput"
                  definition="The number of requests a system can handle per unit of time. Usually measured in requests per second (RPS)."
                  onLearn={learnTerm}
                />
              </h3>

              <p className="text-quest-muted mb-4">
                If latency is how fast one pizza arrives, throughput is how many pizzas
                the kitchen can make per hour. A server might respond quickly (low latency)
                but can only handle 100 requests/second (limited throughput).
              </p>

              <div className="bg-quest-bg rounded-lg p-4">
                <p className="text-sm font-mono mb-2">Throughput depends on:</p>
                <ul className="text-sm text-quest-muted space-y-1">
                  <li>• CPU speed and cores (how fast can it think?)</li>
                  <li>• Memory (RAM) (how much can it remember at once?)</li>
                  <li>• Network bandwidth (how wide is the pipe?)</li>
                  <li>• Disk I/O (how fast can it read/write data?)</li>
                </ul>
              </div>
            </div>

            {/* Single Point of Failure */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="text-quest-warning" size={24} />
                <Term
                  word="Single Point of Failure (SPOF)"
                  definition="A component whose failure would cause the entire system to fail. If it goes down, everything goes down."
                  onLearn={learnTerm}
                />
              </h3>

              <p className="text-quest-muted mb-4">
                In our simulation, the server was a SPOF. When it crashed, the entire
                system was down. No backup, no failover, no mercy. This is the #1 problem
                with single-server architectures.
              </p>

              <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4">
                <p className="text-sm text-quest-danger font-semibold mb-2">
                  The Harsh Reality
                </p>
                <p className="text-sm text-quest-muted">
                  Hardware fails. Software has bugs. Networks go down. Power outages happen.
                  If you have one of anything critical, you're one bad day away from disaster.
                </p>
              </div>

              <DeepDive
                id="spof-examples"
                title="Famous SPOF Disasters"
                onRead={markDeepDiveRead}
              >
                <p className="text-sm text-quest-muted mb-3">
                  <strong>2017 - Amazon S3 Outage:</strong> A single engineer's typo took down
                  a significant portion of the internet. Websites like Slack, Trello, and Imgur
                  went dark because they all depended on S3.
                </p>
                <p className="text-sm text-quest-muted">
                  <strong>2021 - Facebook Outage:</strong> A configuration change caused Facebook,
                  Instagram, and WhatsApp to be unreachable for 6+ hours. Estimated loss: $60+ million.
                </p>
              </DeepDive>
            </div>

            {/* Looking Ahead */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">🔮 What's Coming Next?</h3>
              <p className="text-quest-muted">
                You've seen the problem: one server has limits and is a single point of failure.
                In the next level, you'll learn the two fundamental approaches to solve this:
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-quest-primary">→</span>
                  <strong>Vertical Scaling</strong> - Make the server bigger
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-quest-secondary">→</span>
                  <strong>Horizontal Scaling</strong> - Add more servers
                </li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentSection(1)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowRight size={18} className="rotate-180" />
                Back to Simulation
              </button>

              <button
                onClick={() => setCurrentSection(3)}
                className="btn-primary flex items-center gap-2"
              >
                Side Quest: Facebook Outage
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: SIDE QUEST - Facebook Outage Economics */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full font-medium">
                Optional Side Quest
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-4">The Day Facebook Disappeared</h2>
            <p className="text-quest-muted mb-2">
              October 4, 2021. 3.5 billion people suddenly couldn't reach Facebook, Instagram, or WhatsApp.
              For <strong>6 hours and 13 minutes</strong>, one of the world's biggest companies was invisible.
            </p>
            <p className="text-sm text-quest-muted italic mb-6">
              This is completely optional — skip to the quiz anytime. But if you want to understand
              why downtime is terrifying for companies, read on.
            </p>

            {/* What Happened - Simple */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">What Actually Happened?</h3>
              <p className="text-quest-muted mb-4">
                Imagine your house has an address (like "123 Main St"). People use that address to find you.
                Now imagine someone accidentally erased your address from every map, GPS, and phone book
                — all at once. You still exist, but <strong>nobody can find you</strong>.
              </p>
              <p className="text-quest-muted mb-4">
                That's basically what happened to Facebook. A routine maintenance command accidentally
                removed Facebook's{' '}
                <Term
                  word="BGP routes"
                  definition="Border Gateway Protocol routes — the 'directions' that tell the internet how to find a website. Without BGP routes, a server is invisible to the rest of the internet."
                  onLearn={learnTerm}
                />
                {' '}— the internet's directions to reach Facebook's servers.
              </p>
              <p className="text-quest-muted">
                Facebook's servers were still running. The data was still there. But the entire internet
                had no idea how to reach them. It was like being a restaurant with no address on any map.
              </p>
            </div>

            {/* Visual Timeline */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-6">The 6-Hour Timeline</h3>
              <div className="relative pl-8 border-l-2 border-quest-primary/30 space-y-6">
                {[
                  { time: '11:40 AM', emoji: '🔧', title: 'The Mistake', desc: 'An engineer runs a routine maintenance command. It contains a bug that wipes out BGP routes.' },
                  { time: '11:45 AM', emoji: '🚨', title: 'DNS Goes Dark', desc: 'Facebook\'s DNS servers can no longer be reached. Browsers everywhere show "This site can\'t be reached."' },
                  { time: '12:00 PM', emoji: '🌍', title: 'World Notices', desc: '3.5 billion users try to open Facebook, Instagram, WhatsApp. Nothing works. Twitter explodes with memes.' },
                  { time: '1:00 PM', emoji: '🔒', title: 'Locked Out', desc: 'Facebook engineers can\'t even get into their own buildings — the badge systems run on Facebook\'s network.' },
                  { time: '3:00 PM', emoji: '🔨', title: 'Physical Fix', desc: 'Engineers physically travel to data centers to manually reset servers. No remote access possible.' },
                  { time: '5:53 PM', emoji: '✅', title: 'Recovery Begins', desc: 'BGP routes start coming back. Services slowly recover over the next 30 minutes.' },
                ].map((event, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="relative"
                  >
                    <div className="absolute -left-[2.45rem] w-6 h-6 rounded-full bg-quest-surface border-2 border-quest-primary flex items-center justify-center text-xs">
                      {event.emoji}
                    </div>
                    <div className="bg-quest-surface/50 rounded-lg p-4">
                      <span className="text-xs font-mono text-quest-primary">{event.time}</span>
                      <h4 className="font-semibold mt-1">{event.title}</h4>
                      <p className="text-sm text-quest-muted mt-1">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* The Economics - The Money */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Follow the Money</h3>
              <p className="text-quest-muted mb-6">
                Let's break down <strong>where the $60+ million loss</strong> comes from.
                It's not just one thing — it's a cascade.
              </p>

              {/* Revenue Breakdown Visual */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-semibold text-quest-primary uppercase tracking-wide">How Facebook Makes Money</h4>
                <p className="text-sm text-quest-muted mb-4">
                  Facebook (now Meta) makes almost <strong>all</strong> its money from ads. In 2021, they
                  earned about <strong>$117 billion per year</strong> from advertising. Let's do the math:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div
                    className="bg-quest-surface rounded-lg p-4 text-center border border-quest-primary/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-3xl font-bold text-quest-primary">$117B</p>
                    <p className="text-xs text-quest-muted mt-1">per year</p>
                    <p className="text-xs text-quest-muted">(ad revenue in 2021)</p>
                  </motion.div>
                  <motion.div
                    className="bg-quest-surface rounded-lg p-4 text-center border border-quest-warning/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-3xl font-bold text-quest-warning">$320M</p>
                    <p className="text-xs text-quest-muted mt-1">per day</p>
                    <p className="text-xs text-quest-muted">($117B / 365 days)</p>
                  </motion.div>
                  <motion.div
                    className="bg-quest-surface rounded-lg p-4 text-center border border-quest-danger/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-3xl font-bold text-quest-danger">$13.3M</p>
                    <p className="text-xs text-quest-muted mt-1">per hour</p>
                    <p className="text-xs text-quest-muted">($320M / 24 hours)</p>
                  </motion.div>
                </div>

                <div className="bg-quest-danger/10 border border-quest-danger/30 rounded-lg p-4 mt-4">
                  <p className="text-sm text-quest-muted">
                    <strong className="text-quest-danger">6 hours down</strong> = at least <strong className="text-quest-danger">$79.8 million</strong> in
                    lost ad revenue alone. But ads are just the beginning...
                  </p>
                </div>
              </div>

              {/* The Ripple Effect */}
              <h4 className="text-sm font-semibold text-quest-primary uppercase tracking-wide mb-4">The Ripple Effect</h4>
              <p className="text-sm text-quest-muted mb-4">
                When Facebook goes down, it's not just Facebook that suffers. Think of all the businesses
                and people that <strong>depend</strong> on it:
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: '🏪',
                    title: 'Small Businesses',
                    amount: 'Millions lost collectively',
                    desc: '200+ million businesses use Facebook for advertising. A bakery in Mumbai running a promotion, a clothing store in Lagos getting orders via Instagram DMs, a tutor in Brazil finding students on WhatsApp — all frozen.',
                  },
                  {
                    icon: '📱',
                    title: 'Facebook Login / OAuth',
                    amount: 'Countless apps broken',
                    desc: 'Many apps let you "Log in with Facebook." When Facebook went down, those apps couldn\'t authenticate users either. Spotify, Tinder, Pinterest — all affected.',
                  },
                  {
                    icon: '🌍',
                    title: 'Entire Countries',
                    amount: 'Communication severed',
                    desc: 'In many countries (India, Brazil, Philippines), WhatsApp IS the phone system. Doctors, emergency contacts, government services — all unreachable.',
                  },
                  {
                    icon: '📉',
                    title: 'Stock Price',
                    amount: '-4.9% ($47.3 billion)',
                    desc: 'Facebook\'s stock dropped nearly 5% that day. Mark Zuckerberg personally lost about $6 billion in net worth in a single day.',
                  },
                  {
                    icon: '👩‍💼',
                    title: 'Facebook Employees',
                    amount: 'Locked out completely',
                    desc: 'Internal tools (email, Workplace chat, building access badges) all ran on the same network. Engineers couldn\'t communicate with each other to fix the problem.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-quest-surface/50 rounded-lg p-4 flex gap-4"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-semibold text-sm">{item.title}</h5>
                        <span className="text-xs text-quest-danger font-mono">{item.amount}</span>
                      </div>
                      <p className="text-xs text-quest-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Money Counter Visualization */}
            <FacebookOutageCostTicker />

            {/* The Real Cost */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Beyond the Dollars</h3>
              <p className="text-quest-muted mb-4">
                The $60-80 million in direct revenue loss is actually the <strong>smallest</strong> part
                of the total cost. Here's what's harder to measure:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <h5 className="font-semibold text-sm mb-2">Trust Damage</h5>
                  <p className="text-xs text-quest-muted">
                    Advertisers question: "Is my $10,000/day ad budget safe here?" Some diversified
                    to Google and TikTok ads after this. Lost trust takes years to rebuild.
                  </p>
                </div>
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <h5 className="font-semibold text-sm mb-2">User Migration</h5>
                  <p className="text-xs text-quest-muted">
                    70 million people joined Telegram in those 6 hours. Signal and Twitter saw massive
                    spikes. Some of those users never came back.
                  </p>
                </div>
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <h5 className="font-semibold text-sm mb-2">Engineering Cost</h5>
                  <p className="text-xs text-quest-muted">
                    Hundreds of the world's highest-paid engineers working around the clock.
                    Post-incident reviews, new safety systems, infrastructure changes — months of work.
                  </p>
                </div>
                <div className="bg-quest-surface/50 rounded-lg p-4">
                  <h5 className="font-semibold text-sm mb-2">Regulatory Attention</h5>
                  <p className="text-xs text-quest-muted">
                    Governments worldwide pointed to this as evidence that "too much depends on one company."
                    This fueled antitrust investigations and calls for regulation.
                  </p>
                </div>
              </div>
            </div>

            {/* Lesson Learned */}
            <div className="bg-gradient-to-r from-quest-primary/10 to-quest-secondary/10 rounded-lg p-6 border border-quest-primary/20">
              <h3 className="text-lg font-semibold mb-3">The System Design Lesson</h3>
              <p className="text-quest-muted mb-3">
                This outage is a perfect example of concepts you'll learn throughout this course:
              </p>
              <ul className="space-y-2 text-sm text-quest-muted">
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5">1.</span>
                  <span><strong>Single Point of Failure</strong> — One bad command took down everything because BGP configuration was a single point of failure. (This level!)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5">2.</span>
                  <span><strong>Cascading Failures</strong> — The network failure cascaded to DNS, then to auth systems, then to internal tools, then to physical building access. (Level 19)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5">3.</span>
                  <span><strong>Monitoring & Observability</strong> — When your monitoring tools run on the same network that's down, you're flying blind. (Level 23)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quest-primary mt-0.5">4.</span>
                  <span><strong>DNS & Networking</strong> — Understanding how DNS and BGP work is critical to understanding how the internet itself can "break." (Level 1 fundamentals)</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentSection(2)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowRight size={18} className="rotate-180" />
                Back to Concepts
              </button>

              <button
                onClick={() => setCurrentSection(4)}
                className="btn-primary flex items-center gap-2"
              >
                Take the Quiz
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: QUIZ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">🎯 Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Let's make sure you've got the fundamentals down. Don't worry—this isn't a test,
              it's a checkpoint.
            </p>

            <div className="space-y-8">
              {quizQuestions.map((q, qIndex) => (
                <div key={q.id} className="bg-quest-bg rounded-lg p-6">
                  <p className="font-medium mb-4">
                    {qIndex + 1}. {q.question}
                  </p>

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
                          className={`
                            w-full text-left p-3 rounded-lg border transition-all
                            ${isSelected
                              ? showResult
                                ? isCorrect
                                  ? 'border-quest-success bg-quest-success/10'
                                  : 'border-quest-danger bg-quest-danger/10'
                                : 'border-quest-primary bg-quest-primary/10'
                              : showResult && isCorrect
                                ? 'border-quest-success bg-quest-success/10'
                                : 'border-white/10 hover:border-white/30'
                            }
                          `}
                        >
                          <span className="flex items-center gap-3">
                            <span className={`
                              w-6 h-6 rounded-full border flex items-center justify-center text-xs
                              ${isSelected
                                ? showResult
                                  ? isCorrect
                                    ? 'border-quest-success bg-quest-success text-white'
                                    : 'border-quest-danger bg-quest-danger text-white'
                                  : 'border-quest-primary bg-quest-primary text-quest-bg'
                                : 'border-white/30'
                              }
                            `}>
                              {option.id.toUpperCase()}
                            </span>
                            {option.text}
                          </span>
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
                <h3 className="text-xl font-bold mb-2">Level Complete! 🎉</h3>
                <p className="text-quest-muted mb-4">
                  You've mastered the fundamentals of the client-server model.
                  You understand latency, throughput, and why single servers have limits.
                </p>
                <p className="text-sm text-quest-primary">
                  Ready to learn how to scale? Level 2 awaits!
                </p>
              </motion.div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setCurrentSection(3)}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowRight size={18} className="rotate-180" />
                Back to Side Quest
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

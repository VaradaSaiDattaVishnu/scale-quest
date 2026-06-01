import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, BookOpen, Gamepad2, CheckCircle } from 'lucide-react'
import useGameStore, { LEVELS } from '../context/gameStore'

// Import level components
import Level1 from '../levels/Level1'
import Level2 from '../levels/Level2'
import Level3 from '../levels/Level3'
import Level4 from '../levels/Level4'
import Level5 from '../levels/Level5'
import Level6 from '../levels/Level6'
import Level7 from '../levels/Level7'
import Level8 from '../levels/Level8'
import Level9 from '../levels/Level9'
import Level10 from '../levels/Level10'
import Level11 from '../levels/Level11'
import Level12 from '../levels/Level12'
import Level13 from '../levels/Level13'
import Level14 from '../levels/Level14'
import Level15 from '../levels/Level15'
import Level16 from '../levels/Level16'
import Level17 from '../levels/Level17'
import Level18 from '../levels/Level18'
import Level19 from '../levels/Level19'
import Level20 from '../levels/Level20'
import Level21 from '../levels/Level21'
import Level22 from '../levels/Level22'
import Level23 from '../levels/Level23'
import Level24 from '../levels/Level24'
import Level25 from '../levels/Level25'
import Level26 from '../levels/Level26'
import Level27 from '../levels/Level27'
import Level28 from '../levels/Level28'
import Level29 from '../levels/Level29'
import Level30 from '../levels/Level30'
import Level31 from '../levels/Level31'
import Level32 from '../levels/Level32'
import Level33 from '../levels/Level33'
import Level34 from '../levels/Level34'
import Level35 from '../levels/Level35'
import Level36 from '../levels/Level36'
import Level37 from '../levels/Level37'
import Level38 from '../levels/Level38'
import Level39 from '../levels/Level39'
import Level40 from '../levels/Level40'
import Level41 from '../levels/Level41'
import Level42 from '../levels/Level42'
import Level43 from '../levels/Level43'
import Level44 from '../levels/Level44'
import Level45 from '../levels/Level45'
import Level46 from '../levels/Level46'
import Level47 from '../levels/Level47'
import Level48 from '../levels/Level48'
import Level49 from '../levels/Level49'
import Level50 from '../levels/Level50'
import Level51 from '../levels/Level51'
import Level52 from '../levels/Level52'
import Level53 from '../levels/Level53'
import Level54 from '../levels/Level54'
import Level55 from '../levels/Level55'
import Level56 from '../levels/Level56'
import Level57 from '../levels/Level57'
import Level58 from '../levels/Level58'
import Level59 from '../levels/Level59'
import Level60 from '../levels/Level60'

const levelComponents = {
  1: Level1,
  2: Level2,
  3: Level3,
  4: Level4,
  5: Level5,
  6: Level6,
  7: Level7,
  8: Level8,
  9: Level9,
  10: Level10,
  11: Level11,
  12: Level12,
  13: Level13,
  14: Level14,
  15: Level15,
  16: Level16,
  17: Level17,
  18: Level18,
  19: Level19,
  20: Level20,
  21: Level21,
  22: Level22,
  23: Level23,
  24: Level24,
  25: Level25,
  26: Level26,
  27: Level27,
  28: Level28,
  29: Level29,
  30: Level30,
  31: Level31,
  32: Level32,
  33: Level33,
  34: Level34,
  35: Level35,
  36: Level36,
  37: Level37,
  38: Level38,
  39: Level39,
  40: Level40,
  41: Level41,
  42: Level42,
  43: Level43,
  44: Level44,
  45: Level45,
  46: Level46,
  47: Level47,
  48: Level48,
  49: Level49,
  50: Level50,
  51: Level51,
  52: Level52,
  53: Level53,
  54: Level54,
  55: Level55,
  56: Level56,
  57: Level57,
  58: Level58,
  59: Level59,
  60: Level60,
}

function Level() {
  const { levelId } = useParams()
  const navigate = useNavigate()
  const {
    completedLevels,
    isLevelUnlocked,
    completeLevel,
    learnTerm,
    unlockAchievement,
    markDeepDiveRead
  } = useGameStore()

  const id = parseInt(levelId)
  const level = LEVELS.find(l => l.id === id)
  const LevelContent = levelComponents[id]

  // Check if level exists and is unlocked
  if (!level) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Level not found</h1>
        <button onClick={() => navigate('/map')} className="btn-primary">
          Back to Journey
        </button>
      </div>
    )
  }

  if (!isLevelUnlocked(id)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">🔒 Level Locked</h1>
        <p className="text-quest-muted mb-6">
          Complete Level {id - 1} to unlock this level.
        </p>
        <button onClick={() => navigate('/map')} className="btn-primary">
          Back to Journey
        </button>
      </div>
    )
  }

  const isCompleted = completedLevels.includes(id)
  const hasNextLevel = id < LEVELS.length
  const hasPrevLevel = id > 1

  // Level completion handler
  const handleComplete = () => {
    completeLevel(id)
    // Could trigger confetti here
  }

  // Context for child components
  const levelContext = {
    levelId: id,
    level,
    isCompleted,
    onComplete: handleComplete,
    learnTerm,
    unlockAchievement,
    markDeepDiveRead,
  }

  return (
    <div className="min-h-[calc(100vh-140px)]">
      {/* Level Header */}
      <div className={`bg-gradient-to-r ${level.color} py-8`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/map')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Journey Map</span>
            </button>

            <div className="flex items-center gap-4">
              {isCompleted && (
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-1">
                  <CheckCircle size={16} />
                  <span className="text-sm">Completed</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center text-white">
            <span className="text-sm font-mono opacity-80">LEVEL {level.id}</span>
            <h1 className="text-3xl md:text-4xl font-bold mt-1">{level.title}</h1>
            <p className="text-lg opacity-90 mt-2">{level.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Level Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="container mx-auto px-4 py-8"
        >
          {LevelContent ? (
            <LevelContent {...levelContext} />
          ) : (
            <div className="text-center py-16">
              <Gamepad2 size={48} className="mx-auto text-quest-muted mb-4" />
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p className="text-quest-muted">
                This level is being built. Check back soon!
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="border-t border-white/5 py-6">
        <div className="container mx-auto px-4 flex justify-between">
          {hasPrevLevel ? (
            <button
              onClick={() => navigate(`/level/${id - 1}`)}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Previous Level
            </button>
          ) : (
            <div />
          )}

          {hasNextLevel && isCompleted && (
            <button
              onClick={() => navigate(`/level/${id + 1}`)}
              className="btn-primary flex items-center gap-2"
            >
              Next Level
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Level

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, CheckCircle, Play, ChevronRight } from 'lucide-react'
import useGameStore, { LEVELS } from '../context/gameStore'

function LevelMap() {
  const navigate = useNavigate()
  const { completedLevels, isLevelUnlocked } = useGameStore()

  const getLevelStatus = (levelId) => {
    if (completedLevels.includes(levelId)) return 'completed'
    if (isLevelUnlocked(levelId)) return 'unlocked'
    return 'locked'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Your Journey</h1>
        <p className="text-quest-muted">
          From a single server to global-scale systems. Each level builds on the last.
        </p>
        <div className="flex justify-center gap-8 mt-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-quest-success"></div>
            <span className="text-quest-muted">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-quest-primary"></div>
            <span className="text-quest-muted">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-quest-muted"></div>
            <span className="text-quest-muted">Locked</span>
          </div>
        </div>
      </motion.div>

      {/* Journey Path */}
      <div className="relative max-w-4xl mx-auto">
        {/* Connection Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-quest-primary via-quest-secondary to-quest-muted transform -translate-x-1/2 hidden md:block" />

        {/* Levels */}
        <div className="space-y-8">
          {LEVELS.map((level, index) => {
            const status = getLevelStatus(level.id)
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative flex items-center gap-6
                  ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
                `}
              >
                {/* Level Node */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xl
                      border-4 transition-all
                      ${status === 'completed'
                        ? 'bg-quest-success border-quest-success/50 shadow-lg shadow-quest-success/30'
                        : status === 'unlocked'
                          ? 'bg-quest-primary border-quest-primary/50 shadow-lg shadow-quest-primary/30'
                          : 'bg-quest-surface border-quest-muted'
                      }
                    `}
                    whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
                  >
                    {status === 'completed' ? (
                      <CheckCircle size={24} className="text-white" />
                    ) : status === 'locked' ? (
                      <Lock size={20} className="text-quest-muted" />
                    ) : (
                      <span>{level.icon}</span>
                    )}
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-1/2" />

                {/* Level Card */}
                <motion.div
                  className={`
                    level-card flex-1 md:w-1/2 p-6
                    ${status === 'locked' ? 'locked' : ''}
                    ${status === 'completed' ? 'completed' : ''}
                  `}
                  onClick={() => status !== 'locked' && navigate(`/level/${level.id}`)}
                  whileHover={status !== 'locked' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'locked' ? { scale: 0.98 } : {}}
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${level.color} rounded-t-xl`} />

                  <div className="flex items-start gap-4">
                    {/* Mobile icon */}
                    <div className={`
                      md:hidden w-12 h-12 rounded-full flex items-center justify-center text-xl
                      ${status === 'completed'
                        ? 'bg-quest-success/20'
                        : status === 'unlocked'
                          ? 'bg-quest-primary/20'
                          : 'bg-quest-surface'
                      }
                    `}>
                      {status === 'completed' ? (
                        <CheckCircle size={24} className="text-quest-success" />
                      ) : status === 'locked' ? (
                        <Lock size={20} className="text-quest-muted" />
                      ) : (
                        <span>{level.icon}</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-quest-muted">
                          LEVEL {level.id}
                        </span>
                        {status === 'completed' && (
                          <span className="text-xs bg-quest-success/20 text-quest-success px-2 py-0.5 rounded">
                            Complete
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold mb-1">{level.title}</h3>
                      <p className="text-sm text-quest-primary mb-2">{level.subtitle}</p>
                      <p className="text-sm text-quest-muted mb-4">{level.description}</p>

                      {/* Story teaser */}
                      <div className="bg-quest-bg/50 rounded-lg p-3 mb-4">
                        <p className="text-xs italic text-quest-muted">
                          "{level.story}"
                        </p>
                      </div>

                      {/* Concepts */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {level.concepts.map(concept => (
                          <span
                            key={concept}
                            className="text-xs px-2 py-1 bg-quest-surface rounded-full text-quest-muted"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      {status !== 'locked' && (
                        <button
                          className={`
                            flex items-center gap-2 text-sm font-medium
                            ${status === 'completed'
                              ? 'text-quest-success'
                              : 'text-quest-primary'
                            }
                          `}
                        >
                          {status === 'completed' ? (
                            <>Replay Level <ChevronRight size={16} /></>
                          ) : (
                            <>
                              <Play size={16} />
                              Start Level
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* End marker */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-quest-muted text-sm">System Design Master</p>
        </motion.div>
      </div>
    </div>
  )
}

export default LevelMap

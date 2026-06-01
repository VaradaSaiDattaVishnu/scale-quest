import { motion } from 'framer-motion'
import { Trophy, Lock, Star, Sparkles } from 'lucide-react'
import useGameStore from '../context/gameStore'

function Achievements() {
  const { achievements, xp, completedLevels, learnedTerms, deepDivesRead } = useGameStore()

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  // Group achievements by category
  const categories = {
    'Learning': achievements.filter(a => ['first_request', 'server_crash', 'scale_up', 'scale_out'].includes(a.id)),
    'Mastery': achievements.filter(a => ['load_balance', 'cache_hit', 'shard_master', 'cap_survivor', 'queue_hero', 'microservices', 'global_cdn'].includes(a.id)),
    'Excellence': achievements.filter(a => ['speedrun', 'perfectionist', 'curious', 'terminology'].includes(a.id)),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Trophy size={48} className="mx-auto text-quest-warning mb-4" />
        <h1 className="text-3xl font-bold mb-2">Achievements</h1>
        <p className="text-quest-muted mb-6">
          Track your progress and unlock badges as you master system design.
        </p>

        {/* Progress */}
        <div className="max-w-md mx-auto bg-quest-surface rounded-xl p-6">
          <div className="flex justify-between text-sm text-quest-muted mb-2">
            <span>Achievements Unlocked</span>
            <span>{unlockedCount} / {totalCount}</span>
          </div>
          <div className="h-3 bg-quest-bg rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-quest-warning to-quest-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="text-2xl font-bold text-quest-primary">{completedLevels.length}</p>
              <p className="text-quest-muted">Levels</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-quest-warning">{xp}</p>
              <p className="text-quest-muted">XP</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-quest-success">{learnedTerms.length}</p>
              <p className="text-quest-muted">Terms</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievement Categories */}
      {Object.entries(categories).map(([category, categoryAchievements]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            {category === 'Learning' && <Star className="text-quest-primary" />}
            {category === 'Mastery' && <Trophy className="text-quest-warning" />}
            {category === 'Excellence' && <Sparkles className="text-quest-secondary" />}
            {category}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative bg-quest-surface rounded-xl p-6 text-center
                  border-2 transition-all
                  ${achievement.unlocked
                    ? 'border-quest-warning/50'
                    : 'border-white/5 opacity-60'
                  }
                `}
              >
                {/* Badge */}
                <div className={`
                  mx-auto w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4
                  ${achievement.unlocked
                    ? 'bg-gradient-to-br from-quest-warning to-quest-primary shadow-lg shadow-quest-warning/30'
                    : 'bg-quest-bg'
                  }
                `}>
                  {achievement.unlocked ? (
                    achievement.icon
                  ) : (
                    <Lock size={24} className="text-quest-muted" />
                  )}
                </div>

                {/* Name */}
                <h3 className="font-semibold mb-1">{achievement.name}</h3>
                <p className="text-xs text-quest-muted">{achievement.description}</p>

                {/* Unlocked indicator */}
                {achievement.unlocked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-quest-success rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-lg">✓</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Stats Section */}
      <div className="mt-12 bg-quest-surface rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-6 text-center">Your Journey Stats</h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">{completedLevels.length}/10</div>
            <p className="text-sm text-quest-muted">Levels Completed</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-quest-warning mb-2">{xp}</div>
            <p className="text-sm text-quest-muted">Total XP Earned</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-quest-success mb-2">{learnedTerms.length}</div>
            <p className="text-sm text-quest-muted">Terms Learned</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-quest-secondary mb-2">{deepDivesRead.length}</div>
            <p className="text-sm text-quest-muted">Deep Dives Read</p>
          </div>
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-8 text-center text-quest-muted text-sm">
        <p>Keep learning to unlock all achievements! 🚀</p>
      </div>
    </div>
  )
}

export default Achievements

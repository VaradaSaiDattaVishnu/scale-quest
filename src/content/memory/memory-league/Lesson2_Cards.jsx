import { useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  FeynmanCheck,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 2 -- Speed Cards
 * Speed cards event. Visual deck display.
 */

export default function Lesson2_Cards({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Speed Cards
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          Memorize an entire shuffled deck. The signature event.
        </p>
      </header>

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Speed cards is the signature event of competitive memory and often the most dramatic to watch. The athlete is given a single shuffled deck of 52 playing cards and must memorize the entire sequence as quickly as possible. The current world record is under 13 seconds -- faster than most people can physically flip through the cards. At the beginner level, memorizing a full deck in under five minutes is a meaningful achievement, and most competitors reach this milestone within a few months of training.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The technique mirrors speed numbers: each card is pre-assigned a vivid person, action, or object. The most common approach assigns one image per card, then groups cards into threes. Each group of three cards becomes a single composite image (person from card 1, action from card 2, object from card 3) placed at a palace locus. With 52 cards grouped into threes, you need roughly 18 loci -- a small palace. The challenge is speed: you must encode each three-card group in about two seconds to finish a deck in under a minute.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER: Speed Cards ---- */}
      <VisualStepExplainer
        title="How Speed Cards Works"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-1">
                  {['A', 'K', 'Q', 'J', '10', '9', '8'].map((card, i) => (
                    <motion.div
                      key={i}
                      className="w-8 h-12 rounded-sm border-2 flex items-center justify-center"
                      style={{
                        borderColor: i < 3 ? '#4F7A5A' : '#5B6F8C',
                        backgroundColor: i < 3 ? 'rgba(79,122,90,0.06)' : 'rgba(91,111,140,0.04)',
                        transform: `rotate(${(i - 3) * 3}deg)`,
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-[10px] font-mono font-bold" style={{ color: i < 3 ? '#4F7A5A' : '#5B6F8C' }}>{card}</span>
                    </motion.div>
                  ))}
                  <span className="text-ink-tertiary self-center ml-1">...</span>
                </div>
                <p className="text-[10px] font-ui text-ink-tertiary">52 cards, shuffled, one chance to memorize the sequence</p>
              </div>
            ),
            caption: 'A shuffled deck: 52 cards in random order. Each card must be memorized in sequence. No going back, no second look.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>CARD-TO-IMAGE SYSTEM</p>
                <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
                  {[
                    { suit: 'Spades', symbol: 'S', examples: 'A=Atlas, K=King Kong', color: '#5B6F8C' },
                    { suit: 'Hearts', symbol: 'H', examples: 'A=Aphrodite, K=Henry VIII', color: '#B89466' },
                    { suit: 'Clubs', symbol: 'C', examples: 'A=Armstrong, K=Kong', color: '#4F7A5A' },
                    { suit: 'Diamonds', symbol: 'D', examples: 'A=Aladdin, K=King Midas', color: '#5B6F8C' },
                  ].map((suit, i) => (
                    <motion.div
                      key={i}
                      className="bg-surface rounded-calm p-2 border border-line-soft text-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-lg font-bold" style={{ color: suit.color }}>{suit.symbol}</span>
                      <p className="text-[8px] font-ui text-ink-tertiary">{suit.suit}</p>
                      <p className="text-[7px] font-ui text-ink-secondary mt-1">{suit.examples}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'Each card maps to a person with an action and object. Suits provide categories. Face cards get famous figures. Number cards follow a systematic pattern.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-full max-w-sm bg-surface rounded-calm border border-line-soft p-4">
                  <p className="text-[10px] font-ui font-bold mb-3" style={{ color: '#5B6F8C' }}>THREE-CARD COMPRESSION</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-1">
                      {['K', '7', '3'].map((c, i) => (
                        <div key={i} className="w-7 h-10 rounded-sm border flex items-center justify-center" style={{ borderColor: '#5B6F8C' }}>
                          <span className="text-[9px] font-mono font-bold" style={{ color: '#5B6F8C' }}>{c}</span>
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-ui text-ink-tertiary">=</span>
                    <span className="text-[10px] font-ui text-ink-secondary">1 composite image</span>
                  </div>
                  <div className="space-y-1 ml-2">
                    <p className="text-[9px] font-ui text-ink-secondary"><span style={{ color: '#4F7A5A' }}>Person:</span> from King of Spades</p>
                    <p className="text-[9px] font-ui text-ink-secondary"><span style={{ color: '#5B6F8C' }}>Action:</span> from 7 of Hearts</p>
                    <p className="text-[9px] font-ui text-ink-secondary"><span style={{ color: '#B89466' }}>Object:</span> from 3 of Clubs</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-line-soft">
                    <p className="text-[9px] font-ui text-ink-tertiary">52 cards / 3 = ~18 images = 18 palace loci</p>
                  </div>
                </div>
              </div>
            ),
            caption: 'Group cards in threes. Take the person from card 1, the action from card 2, the object from card 3. One vivid composite image per group, placed at one palace locus.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <p className="text-[10px] font-ui font-bold" style={{ color: '#4F7A5A' }}>SPEED PROGRESSION</p>
                <div className="w-full max-w-sm">
                  {[
                    { time: '10+ minutes', level: 'First attempt', width: '100%', color: '#B89466' },
                    { time: '5 minutes', level: '1-2 months practice', width: '50%', color: '#5B6F8C' },
                    { time: '2 minutes', level: '6 months practice', width: '20%', color: '#4F7A5A' },
                    { time: '<1 minute', level: 'Competitive level', width: '8%', color: '#4F7A5A' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 mb-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="w-16 text-right">
                        <span className="text-[10px] font-ui font-medium" style={{ color: item.color }}>{item.time}</span>
                      </div>
                      <div className="flex-1 h-3 bg-line-soft rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: item.width }}
                          transition={{ duration: 0.8, delay: i * 0.2 }}
                        />
                      </div>
                      <span className="text-[8px] font-ui text-ink-tertiary w-24">{item.level}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'The speed curve is steep. Most of the improvement comes in the first six months. The key is consistent daily practice with a real deck of cards.',
          },
        ]}
      />

      {/* Research paragraph */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Speed cards is often recommended as the best starting event for memory training because it has a natural, satisfying completion point: the full deck. You either got the sequence right or you did not. This binary feedback makes it easy to track progress. Additionally, the physical act of flipping through a deck of cards has a tactile quality that many competitors find more engaging than staring at digits on a screen. The kinesthetic component may also aid encoding through embodied cognition.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The practical advice from world-class competitors like Alex Mullen (who has held multiple world records) is to start slowly and focus on accuracy before speed. Begin by memorizing 10 cards, then 20, then a full deck. Only once you can reliably memorize a full deck with near-perfect accuracy should you start optimizing for speed. Accuracy first, speed second. This mirrors the principle of deliberate practice: technique must be correct before it is made fast.
        </p>
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'How many palace loci do you need for a full deck using three-card grouping?',
            options: [
              { id: '18', label: 'About 18 (52 divided by 3, rounded up)', correct: true },
              { id: '52', label: '52 (one per card)', correct: false },
              { id: '26', label: '26 (one per pair)', correct: false },
            ],
          },
          {
            prompt: 'In three-card compression, what comes from the second card?',
            options: [
              { id: 'action', label: 'The action', correct: true },
              { id: 'person', label: 'The person', correct: false },
              { id: 'object', label: 'The object', correct: false },
            ],
          },
          {
            prompt: 'What should beginners prioritize when starting speed cards?',
            options: [
              { id: 'accuracy', label: 'Accuracy first, speed second', correct: true },
              { id: 'speed', label: 'Speed first -- accuracy comes later', correct: false },
              { id: 'full', label: 'Always attempt the full deck', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="memory-league-l2-feynman"
        prompt="Explain to a skeptical friend how someone could memorize a shuffled deck of cards in under two minutes. What system do they use and how does it work?"
        rubric={[
          'You explained the card-to-image assignment system.',
          'You described three-card compression (person-action-object).',
          'You mentioned palace loci as the storage mechanism.',
          'Your friend would understand this is skill, not magic.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 2 of 5 &middot; Memory League
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Random Words
            </p>
          </div>
          <button onClick={onComplete} className="btn btn-primary">
            Continue
          </button>
        </div>
      </footer>
    </article>
  )
}

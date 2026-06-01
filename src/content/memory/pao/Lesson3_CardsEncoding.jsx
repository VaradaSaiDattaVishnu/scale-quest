import { motion } from 'framer-motion'
import {
  FeynmanCheck,
  ReflectionJournal,
  DragMatch,
} from '../../../components/widgets'
import {
  VisualStepExplainer,
  InteractiveQuiz,
} from '../../../components/visuals'

/**
 * Lesson 3 -- Cards Encoding
 * Maps playing cards to PAO images for memorizing entire decks.
 * Research grounding: card memorization in competition, dual coding,
 * systematic mapping strategies.
 */

export default function Lesson3_CardsEncoding({
  onComplete,
  learnTerm,
  addJournalEntry,
  savePromptAnswer,
}) {
  const suitColors = {
    spades: '#5B6F8C',
    hearts: '#B89466',
    diamonds: '#B89466',
    clubs: '#4F7A5A',
  }

  return (
    <article className="px-6 py-12 max-w-3xl mx-auto">
      {/* ---- TITLE ---- */}
      <header className="mb-8 text-center">
        <h1 className="font-ui text-ink-primary text-3xl font-bold mb-2">
          Cards Encoding with PAO
        </h1>
        <p className="font-ui text-ink-secondary text-lg">
          52 cards. 52 images. One system to memorize any shuffled deck.
        </p>
      </header>

      {/* Research paragraph: Card memorization in competition */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          Speed Cards -- memorizing the order of a shuffled 52-card deck as fast as possible -- is the most iconic event in memory competitions. The current world record, set by Shijir-Erdene Bat-Enkh of Mongolia in 2018, stands at 12.74 seconds. To an observer, it looks impossible. To a trained competitor, it is a matter of converting 52 cards into 17-18 composite PAO scenes and placing them along a well-practiced mental journey.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The first step is mapping each card to a unique two-digit number, which then activates the card's PAO image. There are several standard mapping conventions. The most common assigns each suit a number range: Clubs = 00-12, Diamonds = 13-25, Hearts = 26-38, Spades = 39-51. Within each suit, Ace through King map to sequential numbers. The exact system matters less than consistency -- once you choose a mapping, every practice session reinforces it.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Allan Paivio's dual coding theory (1971) explains why this conversion from cards to images is so powerful. The brain processes verbal/symbolic information and visual/spatial information through separate channels. A playing card label ("7 of Hearts") occupies only the verbal channel. A vivid PAO image ("your uncle surfing on a giant pizza") engages both channels simultaneously, effectively doubling the encoding bandwidth.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 1: Card-to-Number Mapping ---- */}
      <VisualStepExplainer
        title="Card-to-Image Pipeline"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-3 items-center">
                  {/* Card visual */}
                  <motion.div
                    className="w-16 h-22 rounded-calm bg-white border-2 flex flex-col items-center justify-center p-2"
                    style={{ borderColor: '#B89466' }}
                    initial={{ rotateY: 180 }}
                    animate={{ rotateY: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-lg font-bold" style={{ color: '#B89466' }}>7</span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="#B89466">
                      <path d="M7 0L9 5H14L10 8L11.5 13L7 10L2.5 13L4 8L0 5H5L7 0Z" />
                    </svg>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                      <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#5B6F8C" strokeWidth="2" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="w-14 h-14 rounded-calm border-2 flex items-center justify-center"
                    style={{ borderColor: '#5B6F8C' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="font-mono text-xl font-bold text-ink-primary">32</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                    <svg width="30" height="20" viewBox="0 0 30 20" fill="none">
                      <path d="M0 10H25M25 10L18 4M25 10L18 16" stroke="#5B6F8C" strokeWidth="2" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="px-3 py-2 rounded-gentle border-2 bg-surface"
                    style={{ borderColor: '#4F7A5A' }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <span className="text-xs font-ui" style={{ color: '#4F7A5A' }}>PAO Image</span>
                  </motion.div>
                </div>
              </div>
            ),
            caption: 'Pipeline: See card -> convert to number -> activate PAO image. With practice, the middle step disappears and the card triggers the image directly.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
                  {[
                    { suit: 'Clubs', symbol: '\u2663', range: '00-12', color: suitColors.clubs },
                    { suit: 'Diamonds', symbol: '\u2666', range: '13-25', color: suitColors.diamonds },
                    { suit: 'Hearts', symbol: '\u2665', range: '26-38', color: suitColors.hearts },
                    { suit: 'Spades', symbol: '\u2660', range: '39-51', color: suitColors.spades },
                  ].map((s, i) => (
                    <motion.div
                      key={s.suit}
                      className="bg-surface rounded-calm border border-line-soft p-3 text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      <span className="text-2xl" style={{ color: s.color }}>{s.symbol}</span>
                      <p className="text-[10px] font-ui text-ink-secondary mt-1">{s.suit}</p>
                      <p className="text-xs font-mono font-bold mt-1" style={{ color: s.color }}>{s.range}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ),
            caption: 'One common mapping: each suit gets a 13-number range. Ace = 0, 2 = 1, ..., King = 12. So Ace of Clubs = 00, King of Spades = 51.',
          },
          {
            visual: (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="flex gap-2 items-center">
                  {[
                    { card: '3\u2665', color: '#B89466' },
                    { card: 'K\u2663', color: '#4F7A5A' },
                    { card: '8\u2660', color: '#5B6F8C' },
                  ].map((c, i) => (
                    <motion.div
                      key={c.card}
                      className="w-12 h-16 rounded-sm bg-white border-2 flex items-center justify-center"
                      style={{ borderColor: c.color }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <span className="font-mono text-sm font-bold" style={{ color: c.color }}>{c.card}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="flex gap-2 items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-xs font-ui text-ink-tertiary">P from 28</span>
                  <span className="text-ink-tertiary">+</span>
                  <span className="text-xs font-ui text-ink-tertiary">A from 12</span>
                  <span className="text-ink-tertiary">+</span>
                  <span className="text-xs font-ui text-ink-tertiary">O from 46</span>
                </motion.div>
                <motion.div
                  className="rounded-gentle border-2 p-4 bg-surface"
                  style={{ borderColor: '#4F7A5A' }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="font-ui text-sm text-center text-ink-primary">
                    One composite scene = 3 cards memorized
                  </p>
                </motion.div>
              </div>
            ),
            caption: 'Take 3 cards at a time. First card supplies Person, second supplies Action, third supplies Object. 52 cards = 17 composite scenes (plus 1 leftover card).',
          },
        ]}
      />

      {/* Research paragraph: Practice progression */}
      <section className="my-8 max-w-2xl mx-auto">
        <p className="font-reading text-ink-secondary leading-relaxed mb-4">
          The transition from "card -> number -> PAO image" to "card -> PAO image directly" follows the same automaticity curve studied by Shiffrin and Schneider (1977). Initially, the conversion is slow and deliberate, consuming conscious attention. With consistent practice -- typically 20-30 minutes per day over 4-6 weeks -- the mapping becomes automatic. Competitors report that a well-practiced card triggers its image as instantly and involuntarily as a word triggers its meaning.
        </p>
        <p className="font-reading text-ink-secondary leading-relaxed">
          Ben Pridmore, a three-time World Memory Champion, recommends starting with a single suit. Master all 13 cards-to-images for Clubs before adding Diamonds. This chunked approach reduces interference -- the phenomenon where similar new learning disrupts existing associations. Once two suits are solid, the third and fourth go faster because the conversion habit is already established.
        </p>
      </section>

      {/* ---- VISUAL EXPLAINER 2: Practice Progression ---- */}
      <VisualStepExplainer
        title="Building Speed Over Time"
        steps={[
          {
            visual: (
              <div className="flex flex-col items-center gap-3 py-4">
                <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
                  {/* Axes */}
                  <line x1="40" y1="10" x2="40" y2="110" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  <line x1="40" y1="110" x2="270" y2="110" stroke="#5B6F8C" strokeWidth="1" opacity="0.3" />
                  {/* Speed curve -- gets faster over time */}
                  <motion.path
                    d="M40 20 Q80 18 120 40 Q160 62 200 85 Q240 100 270 105"
                    stroke="#4F7A5A"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                  {/* Labels */}
                  <text x="40" y="130" className="font-ui" fill="#5B6F8C" fontSize="9" textAnchor="middle">Week 1</text>
                  <text x="155" y="130" className="font-ui" fill="#5B6F8C" fontSize="9" textAnchor="middle">Week 4</text>
                  <text x="270" y="130" className="font-ui" fill="#5B6F8C" fontSize="9" textAnchor="middle">Week 8</text>
                  <text x="15" y="20" className="font-ui" fill="#5B6F8C" fontSize="8">Slow</text>
                  <text x="15" y="108" className="font-ui" fill="#4F7A5A" fontSize="8">Fast</text>
                </svg>
              </div>
            ),
            caption: 'Conversion speed follows a predictable curve. Expect slow, deliberate recall in weeks 1-2. By weeks 4-6, most cards trigger images within a second.',
          },
        ]}
      />

      {/* ---- DragMatch Exercise ---- */}
      <section className="my-10">
        <h2 className="font-ui text-ink-primary text-lg font-semibold text-center mb-2">
          Match Cards to Number Ranges
        </h2>
        <p className="font-ui text-xs text-ink-tertiary text-center mb-4">
          Drag each suit to its number range
        </p>
        <DragMatch
          pairs={[
            { left: 'Clubs (A-K)', right: '00-12' },
            { left: 'Diamonds (A-K)', right: '13-25' },
            { left: 'Hearts (A-K)', right: '26-38' },
            { left: 'Spades (A-K)', right: '39-51' },
          ]}
        />
      </section>

      {/* ---- INTERACTIVE QUIZ ---- */}
      <InteractiveQuiz
        questions={[
          {
            prompt: 'In a 52-card deck using PAO (3 cards per scene), how many composite scenes do you need?',
            options: [
              { id: '13', label: '13 scenes', correct: false },
              { id: '17', label: '17 scenes (plus 1 leftover card)', correct: true },
              { id: '26', label: '26 scenes', correct: false },
            ],
          },
          {
            prompt: 'What does dual coding theory say about why PAO works for cards?',
            options: [
              { id: 'verbal', label: 'Card labels use verbal channel; images add the visual channel', correct: true },
              { id: 'double', label: 'You study the cards twice', correct: false },
              { id: 'both', label: 'You use both hands to sort cards', correct: false },
            ],
          },
          {
            prompt: 'What is the recommended approach for learning card mappings?',
            options: [
              { id: 'all', label: 'Learn all 52 cards at once', correct: false },
              { id: 'suit', label: 'Master one suit at a time before adding the next', correct: true },
              { id: 'random', label: 'Pick random cards each day', correct: false },
            ],
          },
        ]}
      />

      {/* ---- FeynmanCheck ---- */}
      <FeynmanCheck
        id="pao-lesson3-feynman"
        prompt="Explain to a non-competitor how seeing three playing cards turns into one mental scene using PAO. Walk through a concrete example."
        rubric={[
          'You showed the card-to-number-to-image pipeline clearly.',
          'You explained why 3 cards combine (P from first, A from second, O from third).',
          'You mentioned dual coding or the advantage of images over symbols.',
          'Your example was specific enough that someone could picture it.',
        ]}
      />

      {/* ---- Footer ---- */}
      <footer className="mt-16 pt-8 border-t border-line-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-tertiary font-ui">
              Lesson 3 of 8 &middot; PAO System
            </p>
            <p className="text-sm text-ink-secondary font-ui mt-1">
              Next: Preparing for competition-style practice
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

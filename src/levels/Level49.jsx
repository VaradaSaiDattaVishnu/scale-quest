import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Dice1, ArrowUp, ArrowDown, Users, Trophy } from 'lucide-react'

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
// DEFAULT BOARD CONFIG
// ============================================
const DEFAULT_SNAKES = {
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  98: 78,
}

const DEFAULT_LADDERS = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
}

const PLAYER_COLORS = [
  { bg: 'bg-blue-500', text: 'text-blue-500', ring: 'ring-blue-400', label: 'Blue' },
  { bg: 'bg-red-500', text: 'text-red-500', ring: 'ring-red-400', label: 'Red' },
  { bg: 'bg-green-500', text: 'text-green-500', ring: 'ring-green-400', label: 'Green' },
  { bg: 'bg-yellow-500', text: 'text-yellow-500', ring: 'ring-yellow-400', label: 'Yellow' },
]

// ============================================
// HELPER: convert cell number (1-100) to row/col
// Board is numbered bottom-left to top-right, zigzag
// ============================================
function cellToRowCol(cell) {
  if (cell < 1 || cell > 100) return { row: 9, col: 0 }
  const idx = cell - 1
  const rowFromBottom = Math.floor(idx / 10)
  const row = 9 - rowFromBottom
  const colInRow = idx % 10
  const col = rowFromBottom % 2 === 0 ? colInRow : 9 - colInRow
  return { row, col }
}

// ============================================
// GAME BOARD COMPONENT
// ============================================
function GameBoard({ players, snakes, ladders, highlightCell }) {
  const cells = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const rowFromBottom = 9 - row
      const cellNum = rowFromBottom % 2 === 0
        ? rowFromBottom * 10 + col + 1
        : rowFromBottom * 10 + (9 - col) + 1
      cells.push({ row, col, num: cellNum })
    }
  }

  const isSnakeHead = (num) => snakes[num] !== undefined
  const isSnakeTail = (num) => Object.values(snakes).includes(num)
  const isLadderBottom = (num) => ladders[num] !== undefined
  const isLadderTop = (num) => Object.values(ladders).includes(num)

  return (
    <div className="relative">
      <div className="grid grid-cols-10 gap-0.5 bg-quest-bg rounded-lg p-1">
        {cells.map(({ row, col, num }) => {
          const playersHere = players.filter(p => p.position === num && !p.finished)
          const snake = isSnakeHead(num)
          const ladder = isLadderBottom(num)
          const snakeTail = isSnakeTail(num)
          const ladderTop = isLadderTop(num)
          const highlighted = highlightCell === num

          return (
            <motion.div
              key={`${row}-${col}`}
              className={`
                relative w-full aspect-square flex flex-col items-center justify-center rounded text-xs font-mono
                ${snake ? 'bg-red-900/40 border border-red-500/50' : ''}
                ${snakeTail ? 'bg-red-900/20' : ''}
                ${ladder ? 'bg-emerald-900/40 border border-emerald-500/50' : ''}
                ${ladderTop ? 'bg-emerald-900/20' : ''}
                ${!snake && !ladder && !snakeTail && !ladderTop ? 'bg-quest-surface/60' : ''}
                ${highlighted ? 'ring-2 ring-quest-primary' : ''}
              `}
              animate={highlighted ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <span className={`text-[10px] ${snake ? 'text-red-400' : ladder ? 'text-emerald-400' : 'text-quest-muted'}`}>
                {num}
              </span>
              {snake && (
                <ArrowDown size={10} className="text-red-400 absolute bottom-0.5 right-0.5" />
              )}
              {ladder && (
                <ArrowUp size={10} className="text-emerald-400 absolute bottom-0.5 right-0.5" />
              )}
              {/* Player tokens */}
              <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                {playersHere.map(p => (
                  <motion.div
                    key={p.id}
                    layoutId={`player-${p.id}`}
                    className={`w-2.5 h-2.5 rounded-full ${PLAYER_COLORS[p.id].bg} ring-1 ${PLAYER_COLORS[p.id].ring}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-2 text-xs text-quest-muted justify-center">
        <span className="flex items-center gap-1">
          <ArrowDown size={12} className="text-red-400" /> Snake
        </span>
        <span className="flex items-center gap-1">
          <ArrowUp size={12} className="text-emerald-400" /> Ladder
        </span>
        {players.map(p => (
          <span key={p.id} className="flex items-center gap-1">
            <span className={`w-2.5 h-2.5 rounded-full ${PLAYER_COLORS[p.id].bg} inline-block`} />
            {p.name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================
// DICE COMPONENT
// ============================================
function DiceRoller({ value, rolling, onRoll, disabled }) {
  const dotPositions = {
    1: [[1, 1]],
    2: [[0, 2], [2, 0]],
    3: [[0, 2], [1, 1], [2, 0]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
  }

  const dots = dotPositions[value] || dotPositions[1]

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        onClick={onRoll}
        disabled={disabled || rolling}
        className="relative w-20 h-20 bg-white rounded-xl shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        animate={rolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 0.9, 1.1, 0.9, 1] } : {}}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        whileHover={!disabled && !rolling ? { scale: 1.05 } : {}}
        whileTap={!disabled && !rolling ? { scale: 0.95 } : {}}
      >
        <div className="absolute inset-0 grid grid-rows-3 grid-cols-3 p-3">
          {[0, 1, 2].map(r =>
            [0, 1, 2].map(c => {
              const hasDot = dots.some(([dr, dc]) => dr === r && dc === c)
              return (
                <div key={`${r}-${c}`} className="flex items-center justify-center">
                  {hasDot && (
                    <motion.div
                      className="w-3 h-3 bg-gray-800 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: rolling ? 0.5 : 0 }}
                    />
                  )}
                </div>
              )
            })
          )}
        </div>
      </motion.button>
      <button
        onClick={onRoll}
        disabled={disabled || rolling}
        className="btn-primary flex items-center gap-2 disabled:opacity-50"
      >
        <Dice1 size={18} />
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  )
}

// ============================================
// CLASS DIAGRAM COMPONENT
// ============================================
function ClassDiagram() {
  const classes = [
    {
      name: 'Game',
      attrs: ['- board: Board', '- players: Player[]', '- dice: Dice', '- currentTurn: int', '- status: GameStatus'],
      methods: ['+ start()', '+ playTurn()', '+ isOver(): bool', '+ getWinner(): Player'],
      color: 'border-quest-primary',
      x: 'col-span-2 col-start-2',
    },
    {
      name: 'Board',
      attrs: ['- size: int', '- cells: Cell[]', '- snakes: Snake[]', '- ladders: Ladder[]'],
      methods: ['+ getCell(pos): Cell', '+ hasSnake(pos): Snake?', '+ hasLadder(pos): Ladder?', '+ getFinalPosition(pos): int'],
      color: 'border-quest-secondary',
      x: 'col-span-2 col-start-1',
    },
    {
      name: 'Player',
      attrs: ['- id: int', '- name: string', '- position: int', '- finished: bool'],
      methods: ['+ move(steps)', '+ getPosition(): int', '+ setPosition(pos)', '+ hasWon(): bool'],
      color: 'border-blue-400',
      x: 'col-span-1',
    },
    {
      name: 'Dice',
      attrs: ['- faceCount: int', '- lastRoll: int'],
      methods: ['+ roll(): int', '+ getLastRoll(): int'],
      color: 'border-yellow-400',
      x: 'col-span-1',
    },
    {
      name: 'Snake',
      attrs: ['- head: int', '- tail: int'],
      methods: ['+ getHead(): int', '+ getTail(): int', '+ getDropDistance(): int'],
      color: 'border-red-400',
      x: 'col-span-1',
    },
    {
      name: 'Ladder',
      attrs: ['- bottom: int', '- top: int'],
      methods: ['+ getBottom(): int', '+ getTop(): int', '+ getClimbDistance(): int'],
      color: 'border-emerald-400',
      x: 'col-span-1',
    },
    {
      name: 'Cell',
      attrs: ['- position: int', '- snake: Snake?', '- ladder: Ladder?'],
      methods: ['+ hasSnake(): bool', '+ hasLadder(): bool', '+ getRedirectPosition(): int'],
      color: 'border-purple-400',
      x: 'col-span-1',
    },
  ]

  return (
    <div className="space-y-3">
      {classes.map(cls => (
        <div
          key={cls.name}
          className={`bg-quest-surface rounded-lg border-l-4 ${cls.color} p-3`}
        >
          <h4 className="font-bold text-sm mb-2">{cls.name}</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-quest-muted mb-1 font-semibold">Attributes</p>
              {cls.attrs.map((a, i) => (
                <p key={i} className="font-mono text-quest-muted">{a}</p>
              ))}
            </div>
            <div>
              <p className="text-quest-muted mb-1 font-semibold">Methods</p>
              {cls.methods.map((m, i) => (
                <p key={i} className="font-mono text-quest-primary">{m}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="text-xs text-quest-muted mt-2 bg-quest-bg rounded p-3">
        <p className="font-semibold mb-1">Relationships:</p>
        <p>Game <span className="text-quest-primary">has-a</span> Board (composition)</p>
        <p>Game <span className="text-quest-primary">has-many</span> Players (aggregation)</p>
        <p>Game <span className="text-quest-primary">has-a</span> Dice (composition)</p>
        <p>Board <span className="text-quest-primary">has-many</span> Cells (composition)</p>
        <p>Board <span className="text-quest-primary">has-many</span> Snakes, Ladders (composition)</p>
        <p>Cell <span className="text-quest-primary">may-have</span> Snake or Ladder (association)</p>
      </div>
    </div>
  )
}

// ============================================
// MAIN LEVEL COMPONENT
// ============================================
export default function Level49({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  // Game simulation state
  const [numPlayers, setNumPlayers] = useState(2)
  const [players, setPlayers] = useState([
    { id: 0, name: 'Player 1', position: 0, finished: false },
    { id: 1, name: 'Player 2', position: 0, finished: false },
  ])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [diceValue, setDiceValue] = useState(1)
  const [rolling, setRolling] = useState(false)
  const [gameStatus, setGameStatus] = useState('waiting') // waiting, playing, finished
  const [turnHistory, setTurnHistory] = useState([])
  const [highlightCell, setHighlightCell] = useState(null)
  const [winner, setWinner] = useState(null)
  const [lastEvent, setLastEvent] = useState(null)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const sections = ['Concepts', 'Play Game', 'Class Design', 'Patterns', 'Quiz']

  // ============================================
  // GAME LOGIC
  // ============================================
  const initGame = useCallback((count) => {
    const newPlayers = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: `Player ${i + 1}`,
      position: 0,
      finished: false,
    }))
    setPlayers(newPlayers)
    setCurrentPlayer(0)
    setDiceValue(1)
    setGameStatus('playing')
    setTurnHistory([])
    setHighlightCell(null)
    setWinner(null)
    setLastEvent(null)
  }, [])

  const rollDice = useCallback(() => {
    if (rolling || gameStatus === 'finished') return

    setRolling(true)
    setLastEvent(null)

    // Animate rolling for 500ms then resolve
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 6) + 1
      setDiceValue(roll)
      setRolling(false)

      setPlayers(prev => {
        const updated = [...prev]
        const player = { ...updated[currentPlayer] }

        if (player.finished) {
          // Skip finished players
          return prev
        }

        const oldPos = player.position
        let newPos = oldPos + roll

        // Can't go past 100
        if (newPos > 100) {
          setLastEvent({ type: 'bounce', player: player.name, message: `${player.name} rolled ${roll} but needs exact number to reach 100. Stay at ${oldPos}.` })
          setTurnHistory(h => [...h, { player: player.name, roll, from: oldPos, to: oldPos, event: 'bounce' }])
          // Move to next player
          advanceTurn(prev)
          return prev
        }

        let event = null

        // Check for snakes
        if (DEFAULT_SNAKES[newPos] !== undefined) {
          const snakeDest = DEFAULT_SNAKES[newPos]
          event = { type: 'snake', player: player.name, message: `${player.name} hit a snake at ${newPos}! Slides down to ${snakeDest}.` }
          setHighlightCell(newPos)
          setTimeout(() => setHighlightCell(snakeDest), 600)
          setTimeout(() => setHighlightCell(null), 1200)
          const finalPos = snakeDest
          player.position = finalPos
          setTurnHistory(h => [...h, { player: player.name, roll, from: oldPos, to: finalPos, event: 'snake', via: newPos }])
        }
        // Check for ladders
        else if (DEFAULT_LADDERS[newPos] !== undefined) {
          const ladderDest = DEFAULT_LADDERS[newPos]
          event = { type: 'ladder', player: player.name, message: `${player.name} found a ladder at ${newPos}! Climbs up to ${ladderDest}.` }
          setHighlightCell(newPos)
          setTimeout(() => setHighlightCell(ladderDest), 600)
          setTimeout(() => setHighlightCell(null), 1200)
          const finalPos = ladderDest
          player.position = finalPos
          setTurnHistory(h => [...h, { player: player.name, roll, from: oldPos, to: finalPos, event: 'ladder', via: newPos }])
        }
        // Normal move
        else {
          player.position = newPos
          setHighlightCell(newPos)
          setTimeout(() => setHighlightCell(null), 800)
          setTurnHistory(h => [...h, { player: player.name, roll, from: oldPos, to: newPos, event: 'move' }])
        }

        // Check for win
        if (player.position === 100) {
          player.finished = true
          event = { type: 'win', player: player.name, message: `${player.name} reached 100 and wins the game!` }
          setGameStatus('finished')
          setWinner(player)
        }

        if (event) setLastEvent(event)

        updated[currentPlayer] = player

        // Advance turn if game not finished
        if (player.position !== 100) {
          advanceTurn(updated)
        }

        return updated
      })
    }, 500)
  }, [rolling, gameStatus, currentPlayer])

  const advanceTurn = useCallback((currentPlayers) => {
    setCurrentPlayer(prev => {
      let next = (prev + 1) % currentPlayers.length
      let attempts = 0
      while (currentPlayers[next].finished && attempts < currentPlayers.length) {
        next = (next + 1) % currentPlayers.length
        attempts++
      }
      return next
    })
  }, [])

  const resetGame = useCallback(() => {
    initGame(numPlayers)
  }, [numPlayers, initGame])

  // ============================================
  // QUIZ
  // ============================================
  const quizQuestions = [
    {
      id: 'q1',
      question: 'In a Snake and Ladder game, what design pattern best describes the game loop?',
      options: [
        { id: 'a', text: 'Observer Pattern - watch for board changes', correct: false },
        { id: 'b', text: 'State Machine - transitions between player turns with defined states (waiting, rolling, moving, checking)', correct: true },
        { id: 'c', text: 'Singleton Pattern - only one game instance', correct: false },
        { id: 'd', text: 'Factory Pattern - create new boards', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'How should snakes and ladders be validated when setting up the board?',
      options: [
        { id: 'a', text: 'No validation needed, any positions are fine', correct: false },
        { id: 'b', text: 'Only check that positions are within 1-100', correct: false },
        { id: 'c', text: 'Ensure no cell has both a snake head and ladder bottom, no cycles, and start/end within bounds', correct: true },
        { id: 'd', text: 'Just ensure snakes go down and ladders go up', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'What happens when a player rolls a number that would move them past cell 100?',
      options: [
        { id: 'a', text: 'They wrap around to the beginning', correct: false },
        { id: 'b', text: 'They stay at their current position (exact roll needed)', correct: true },
        { id: 'c', text: 'They automatically win', correct: false },
        { id: 'd', text: 'The extra moves are given to the next player', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'Which class should be responsible for checking snake/ladder redirects after a move?',
      options: [
        { id: 'a', text: 'Player - since the player is moving', correct: false },
        { id: 'b', text: 'Dice - since it generated the roll', correct: false },
        { id: 'c', text: 'Game - the orchestrator handles all game rules', correct: false },
        { id: 'd', text: 'Board - it owns the cells, snakes, and ladders and knows the final position', correct: true },
      ],
    },
    {
      id: 'q5',
      question: 'What is the Single Responsibility of the Dice class?',
      options: [
        { id: 'a', text: 'Generate random numbers, move players, and update the board', correct: false },
        { id: 'b', text: 'Only generate random numbers within a configured range (e.g., 1-6)', correct: true },
        { id: 'c', text: 'Decide which player goes next', correct: false },
        { id: 'd', text: 'Validate if the roll is legal for the current game state', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const quizScore = quizQuestions.reduce((acc, q) => {
    const selected = quizAnswers[q.id]
    const correct = q.options.find(o => o.correct)?.id
    return acc + (selected === correct ? 1 : 0)
  }, 0)

  // ============================================
  // RENDER
  // ============================================
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
            {section}
          </button>
        ))}
      </div>

      {/* ============================================ */}
      {/* SECTION 0: CONCEPTS */}
      {/* ============================================ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Level 49: Snakes and Ladders</h2>
            <p className="text-lg text-quest-muted mb-6">
              Design a Snake and Ladder game that supports multiple players and custom boards.
            </p>

            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Dice1 className="text-quest-primary" size={20} />
                Why This LLD Problem?
              </h3>
              <p className="text-quest-muted text-sm mb-4">
                Snake and Ladder is a classic LLD interview question because it tests your ability to model
                a <Term word="Game Loop" definition="A continuous cycle of receiving input, updating game state, and rendering output. In turn-based games, the loop processes one player's turn at a time." onLearn={learnTerm} />,
                manage <Term word="State Machine" definition="A model where the system is in exactly one of a finite number of states at any time. Transitions between states are triggered by events (e.g., dice roll, snake encounter)." onLearn={learnTerm} /> transitions,
                handle <Term word="Random Events" definition="Non-deterministic outcomes like dice rolls that drive the game forward. The system must handle randomness while maintaining consistent game rules." onLearn={learnTerm} />,
                and organize <Term word="Player Management" definition="Tracking multiple players, their turns, positions, and win conditions in a multi-player game context." onLearn={learnTerm} />.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-quest-surface rounded-lg p-4 border border-white/5">
                <h4 className="font-semibold mb-2 text-quest-primary">Core Requirements</h4>
                <ul className="text-sm text-quest-muted space-y-1">
                  <li>- 10x10 board (cells 1 to 100)</li>
                  <li>- Configurable snakes and ladders</li>
                  <li>- 2-4 players taking turns</li>
                  <li>- Standard 6-faced dice</li>
                  <li>- First player to reach 100 wins</li>
                  <li>- Exact roll needed to land on 100</li>
                </ul>
              </div>
              <div className="bg-quest-surface rounded-lg p-4 border border-white/5">
                <h4 className="font-semibold mb-2 text-quest-secondary">Key Entities</h4>
                <ul className="text-sm text-quest-muted space-y-1">
                  <li>- <strong>Board</strong>: Grid of cells with snakes/ladders</li>
                  <li>- <strong>Cell</strong>: Single position on the board</li>
                  <li>- <strong>Snake</strong>: Takes player from head to tail (down)</li>
                  <li>- <strong>Ladder</strong>: Takes player from bottom to top (up)</li>
                  <li>- <strong>Player</strong>: Token with position state</li>
                  <li>- <strong>Dice</strong>: Generates random rolls</li>
                  <li>- <strong>Game</strong>: Orchestrates the game loop</li>
                </ul>
              </div>
            </div>

            <DeepDive id="game-loop-detail" title="The Game Loop in Detail" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p>The game loop for Snake and Ladder follows a predictable state machine:</p>
                <div className="bg-quest-bg rounded p-4 font-mono text-xs space-y-1">
                  <p className="text-quest-muted">// Game State Machine</p>
                  <p><span className="text-quest-primary">WAITING_TO_START</span> --(start)--&gt; <span className="text-quest-primary">PLAYER_TURN</span></p>
                  <p><span className="text-quest-primary">PLAYER_TURN</span> --(rollDice)--&gt; <span className="text-quest-primary">ROLLING</span></p>
                  <p><span className="text-quest-primary">ROLLING</span> --(result)--&gt; <span className="text-quest-primary">MOVING</span></p>
                  <p><span className="text-quest-primary">MOVING</span> --(checkPosition)--&gt; <span className="text-quest-primary">CHECK_SNAKE_LADDER</span></p>
                  <p><span className="text-quest-primary">CHECK_SNAKE_LADDER</span> --(redirect)--&gt; <span className="text-quest-primary">MOVING</span></p>
                  <p><span className="text-quest-primary">CHECK_SNAKE_LADDER</span> --(none)--&gt; <span className="text-quest-primary">CHECK_WIN</span></p>
                  <p><span className="text-quest-primary">CHECK_WIN</span> --(won)--&gt; <span className="text-quest-primary">GAME_OVER</span></p>
                  <p><span className="text-quest-primary">CHECK_WIN</span> --(not won)--&gt; <span className="text-quest-primary">NEXT_PLAYER_TURN</span></p>
                </div>
                <p>
                  Each state transition is explicit and deterministic (given the dice roll). This makes it
                  easy to test, debug, and extend. For example, adding a "roll again on 6" rule is simply
                  a new transition from CHECK_WIN back to PLAYER_TURN for the same player.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="board-generation" title="Board Generation and Validation" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p>When allowing custom boards, you need to validate:</p>
                <ul className="space-y-1 ml-4">
                  <li>1. No cell has both a snake head and a ladder bottom</li>
                  <li>2. Snake head position &gt; snake tail position</li>
                  <li>3. Ladder top position &gt; ladder bottom position</li>
                  <li>4. No snake/ladder starts or ends at cell 1 or cell 100</li>
                  <li>5. No infinite loops (a ladder leading to a snake that leads back to the same ladder)</li>
                  <li>6. All positions are within bounds [2, 99]</li>
                </ul>
                <div className="bg-quest-bg rounded p-4 font-mono text-xs">
                  <p className="text-quest-muted">// Validation pseudocode</p>
                  <p>function validateBoard(snakes, ladders) {'{'}</p>
                  <p className="pl-4">occupiedCells = new Set()</p>
                  <p className="pl-4 text-quest-warning">for (snake in snakes) {'{'}</p>
                  <p className="pl-8">assert(snake.head &gt; snake.tail)</p>
                  <p className="pl-8">assert(!occupiedCells.has(snake.head))</p>
                  <p className="pl-8">occupiedCells.add(snake.head)</p>
                  <p className="pl-4 text-quest-warning">{'}'}</p>
                  <p className="pl-4 text-quest-success">for (ladder in ladders) {'{'}</p>
                  <p className="pl-8">assert(ladder.top &gt; ladder.bottom)</p>
                  <p className="pl-8">assert(!occupiedCells.has(ladder.bottom))</p>
                  <p className="pl-8">occupiedCells.add(ladder.bottom)</p>
                  <p className="pl-4 text-quest-success">{'}'}</p>
                  <p>{'}'}</p>
                </div>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => { setCurrentSection(1); if (gameStatus === 'waiting') initGame(numPlayers) }} className="btn-primary flex items-center gap-2">
                Play the Game
                <Dice1 size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============================================ */}
      {/* SECTION 1: PLAY GAME */}
      {/* ============================================ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Dice1 className="text-quest-primary" />
              Snake & Ladder Simulator
            </h2>

            {/* Game Setup */}
            {gameStatus === 'waiting' && (
              <div className="bg-quest-bg rounded-xl p-6 mb-6">
                <h3 className="font-semibold mb-4">Game Setup</h3>
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm text-quest-muted">Number of Players:</label>
                  <div className="flex gap-2">
                    {[2, 3, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setNumPlayers(n)}
                        className={`w-10 h-10 rounded-lg font-bold transition-all
                          ${numPlayers === n ? 'bg-quest-primary text-quest-bg' : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mb-4">
                  {Array.from({ length: numPlayers }, (_, i) => (
                    <span key={i} className={`flex items-center gap-1 text-sm ${PLAYER_COLORS[i].text}`}>
                      <span className={`w-3 h-3 rounded-full ${PLAYER_COLORS[i].bg}`} />
                      Player {i + 1}
                    </span>
                  ))}
                </div>
                <button onClick={() => initGame(numPlayers)} className="btn-primary flex items-center gap-2">
                  <Users size={18} />
                  Start Game
                </button>
              </div>
            )}

            {/* Active Game */}
            {(gameStatus === 'playing' || gameStatus === 'finished') && (
              <>
                {/* Game Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    {players.map(p => (
                      <div
                        key={p.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all
                          ${!p.finished && currentPlayer === p.id && gameStatus === 'playing'
                            ? `bg-quest-primary/20 border border-quest-primary ${PLAYER_COLORS[p.id].text} font-bold`
                            : p.finished
                              ? 'bg-quest-success/20 border border-quest-success/30 text-quest-success'
                              : 'bg-quest-surface text-quest-muted'
                          }`}
                      >
                        <span className={`w-3 h-3 rounded-full ${PLAYER_COLORS[p.id].bg}`} />
                        <span>{p.name}</span>
                        <span className="font-mono text-xs">({p.finished ? 'WON' : p.position})</span>
                        {p.finished && <Trophy size={14} className="text-quest-success" />}
                      </div>
                    ))}
                  </div>
                  <button onClick={resetGame} className="btn-secondary text-sm">
                    New Game
                  </button>
                </div>

                {/* Board + Dice */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Board */}
                  <div className="lg:col-span-2">
                    <GameBoard
                      players={players}
                      snakes={DEFAULT_SNAKES}
                      ladders={DEFAULT_LADDERS}
                      highlightCell={highlightCell}
                    />
                  </div>

                  {/* Dice + Info */}
                  <div className="space-y-4">
                    {gameStatus === 'playing' && (
                      <div className="bg-quest-bg rounded-xl p-4 flex flex-col items-center">
                        <p className={`text-sm font-semibold mb-3 ${PLAYER_COLORS[currentPlayer].text}`}>
                          {players[currentPlayer].name}'s Turn
                        </p>
                        <DiceRoller
                          value={diceValue}
                          rolling={rolling}
                          onRoll={rollDice}
                          disabled={gameStatus !== 'playing'}
                        />
                      </div>
                    )}

                    {gameStatus === 'finished' && winner && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-quest-success/10 border border-quest-success/30 rounded-xl p-6 text-center"
                      >
                        <Trophy size={40} className="mx-auto text-quest-success mb-2" />
                        <h3 className="text-xl font-bold text-quest-success mb-1">{winner.name} Wins!</h3>
                        <p className="text-sm text-quest-muted">Reached cell 100 in {turnHistory.length} total turns</p>
                        <button onClick={resetGame} className="btn-primary mt-4">
                          Play Again
                        </button>
                      </motion.div>
                    )}

                    {/* Last Event */}
                    <AnimatePresence mode="wait">
                      {lastEvent && (
                        <motion.div
                          key={lastEvent.message}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className={`rounded-lg p-3 text-sm border
                            ${lastEvent.type === 'snake' ? 'bg-red-900/20 border-red-500/30 text-red-300' : ''}
                            ${lastEvent.type === 'ladder' ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-300' : ''}
                            ${lastEvent.type === 'win' ? 'bg-quest-success/20 border-quest-success/30 text-quest-success' : ''}
                            ${lastEvent.type === 'bounce' ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300' : ''}
                            ${lastEvent.type === 'move' || !lastEvent.type ? 'bg-quest-surface border-white/10' : ''}
                          `}
                        >
                          {lastEvent.type === 'snake' && <ArrowDown size={14} className="inline mr-1" />}
                          {lastEvent.type === 'ladder' && <ArrowUp size={14} className="inline mr-1" />}
                          {lastEvent.type === 'win' && <Trophy size={14} className="inline mr-1" />}
                          {lastEvent.message}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Snakes & Ladders Reference */}
                    <div className="bg-quest-surface rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-quest-muted mb-2">Snakes (head to tail)</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs font-mono mb-3">
                        {Object.entries(DEFAULT_SNAKES).map(([h, t]) => (
                          <span key={h} className="text-red-400">{h} &rarr; {t}</span>
                        ))}
                      </div>
                      <h4 className="text-xs font-semibold text-quest-muted mb-2">Ladders (bottom to top)</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs font-mono">
                        {Object.entries(DEFAULT_LADDERS).map(([b, t]) => (
                          <span key={b} className="text-emerald-400">{b} &rarr; {t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Turn History */}
                    {turnHistory.length > 0 && (
                      <div className="bg-quest-surface rounded-lg p-3 max-h-48 overflow-y-auto">
                        <h4 className="text-xs font-semibold text-quest-muted mb-2">Turn History</h4>
                        <div className="space-y-1">
                          {[...turnHistory].reverse().slice(0, 20).map((turn, i) => (
                            <div key={i} className="text-xs font-mono text-quest-muted flex items-center gap-1">
                              <span className={PLAYER_COLORS[players.find(p => p.name === turn.player)?.id || 0]?.text}>
                                {turn.player}
                              </span>
                              <span>rolled {turn.roll}:</span>
                              <span>{turn.from}</span>
                              <span>&rarr;</span>
                              {turn.via && (
                                <>
                                  <span className={turn.event === 'snake' ? 'text-red-400' : 'text-emerald-400'}>{turn.via}</span>
                                  <span>&rarr;</span>
                                </>
                              )}
                              <span className={
                                turn.event === 'snake' ? 'text-red-400' :
                                turn.event === 'ladder' ? 'text-emerald-400' :
                                ''
                              }>{turn.to}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Class Design
                <ChevronDown size={18} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============================================ */}
      {/* SECTION 2: CLASS DESIGN */}
      {/* ============================================ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Class Design</h2>
            <p className="text-quest-muted mb-6">
              A well-designed Snake and Ladder game separates concerns across focused classes.
              Each class has a single responsibility.
            </p>

            <ClassDiagram />

            <DeepDive id="design-decisions" title="Key Design Decisions" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p><strong>1. Board owns validation:</strong> The Board class validates snake/ladder placement during construction. This ensures no invalid board state can exist.</p>
                <p><strong>2. Game orchestrates turns:</strong> The Game class manages turn order, win conditions, and the game loop. It delegates position resolution to Board.</p>
                <p><strong>3. Cell knows its redirects:</strong> Each Cell can optionally reference a Snake or Ladder. The Board queries cells to resolve final positions.</p>
                <p><strong>4. Dice is independent:</strong> The Dice class generates random values without knowledge of the board or players. This makes it easy to test with a mock.</p>
                <p><strong>5. Player is a data holder:</strong> Player tracks position and name but doesn't make game decisions. The Game moves the player.</p>
              </div>
            </DeepDive>

            <div className="bg-quest-bg rounded-xl p-6 mt-6 border border-white/5">
              <h3 className="font-semibold mb-3">Pseudocode: playTurn()</h3>
              <div className="font-mono text-xs space-y-1 text-quest-muted">
                <p><span className="text-quest-primary">function</span> playTurn() {'{'}</p>
                <p className="pl-4">player = getCurrentPlayer()</p>
                <p className="pl-4">roll = dice.roll()</p>
                <p className="pl-4">newPos = player.position + roll</p>
                <p className="pl-4"></p>
                <p className="pl-4 text-quest-warning">if (newPos &gt; board.size) {'{'}</p>
                <p className="pl-8">return <span className="text-quest-muted">// stay, need exact roll</span></p>
                <p className="pl-4 text-quest-warning">{'}'}</p>
                <p className="pl-4"></p>
                <p className="pl-4 text-quest-success">finalPos = board.getFinalPosition(newPos)</p>
                <p className="pl-4">player.setPosition(finalPos)</p>
                <p className="pl-4"></p>
                <p className="pl-4 text-quest-warning">if (finalPos == board.size) {'{'}</p>
                <p className="pl-8">setWinner(player)</p>
                <p className="pl-8">gameStatus = FINISHED</p>
                <p className="pl-4 text-quest-warning">{'}'} else {'{'}</p>
                <p className="pl-8">advanceToNextPlayer()</p>
                <p className="pl-4 text-quest-warning">{'}'}</p>
                <p>{'}'}</p>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Design Patterns
                <ChevronDown size={18} className="rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============================================ */}
      {/* SECTION 3: PATTERNS */}
      {/* ============================================ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">Design Patterns in the Game</h2>
            <p className="text-quest-muted mb-6">
              Several design patterns naturally emerge when building a Snake and Ladder game.
              Recognizing them helps you articulate your design in an interview.
            </p>

            <div className="space-y-4">
              {/* State Pattern */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-quest-primary/20 flex items-center justify-center text-quest-primary font-bold text-sm">S</span>
                  <Term
                    word="State Pattern"
                    definition="Allows an object to alter its behavior when its internal state changes. The game transitions between WAITING, PLAYING, and FINISHED states with different behaviors in each."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-3">
                  The Game class behaves differently depending on its current state. In WAITING state,
                  only start() is valid. In PLAYING, only playTurn() works. In FINISHED, only results
                  are available.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <p className="text-quest-muted">// State transitions</p>
                  <p><span className="text-yellow-400">WAITING</span> --start()--&gt; <span className="text-quest-primary">PLAYING</span></p>
                  <p><span className="text-quest-primary">PLAYING</span> --playerWins()--&gt; <span className="text-quest-success">FINISHED</span></p>
                  <p><span className="text-quest-success">FINISHED</span> --reset()--&gt; <span className="text-yellow-400">WAITING</span></p>
                </div>
              </div>

              {/* Strategy Pattern */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-quest-secondary/20 flex items-center justify-center text-quest-secondary font-bold text-sm">St</span>
                  <Term
                    word="Strategy Pattern"
                    definition="Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Used for different dice types or movement rules."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-3">
                  The Dice class can be swapped with different strategies: a standard die, a crooked die
                  (for testing), or a loaded die. The Game doesn't care how the number is generated.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <p className="text-quest-muted">// Different dice strategies</p>
                  <p><span className="text-quest-primary">interface</span> DiceStrategy {'{'}</p>
                  <p className="pl-4">roll(): int</p>
                  <p>{'}'}</p>
                  <p><span className="text-quest-success">class StandardDice</span> implements DiceStrategy</p>
                  <p><span className="text-quest-warning">class MockDice</span> implements DiceStrategy <span className="text-quest-muted">// for testing</span></p>
                </div>
              </div>

              {/* Observer Pattern */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">O</span>
                  <Term
                    word="Observer Pattern"
                    definition="Defines a one-to-many dependency so that when one object changes state, all dependents are notified. Useful for UI updates when game state changes."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-3">
                  The UI (or multiple UIs) can observe game state changes. When a player moves,
                  hits a snake, or wins, observers are notified to update the display.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <p className="text-quest-muted">// Game events observers can listen to</p>
                  <p>game.on(<span className="text-quest-success">'playerMoved'</span>, updateBoard)</p>
                  <p>game.on(<span className="text-red-400">'snakeEncountered'</span>, showSnakeAnimation)</p>
                  <p>game.on(<span className="text-emerald-400">'ladderClimbed'</span>, showLadderAnimation)</p>
                  <p>game.on(<span className="text-yellow-400">'gameOver'</span>, showWinnerScreen)</p>
                </div>
              </div>

              {/* Builder Pattern */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/5">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-sm">B</span>
                  <Term
                    word="Builder Pattern"
                    definition="Separates the construction of a complex object from its representation. Perfect for building custom game boards with varying snake/ladder configurations."
                    onLearn={learnTerm}
                  />
                </h3>
                <p className="text-quest-muted text-sm mb-3">
                  A BoardBuilder lets you construct boards step by step, adding snakes and ladders
                  with validation at each step, before producing the final Board object.
                </p>
                <div className="bg-quest-bg rounded p-3 font-mono text-xs">
                  <p className="text-quest-muted">// Building a custom board</p>
                  <p>board = <span className="text-quest-primary">new BoardBuilder(100)</span></p>
                  <p className="pl-4"><span className="text-red-400">.addSnake(16, 6)</span></p>
                  <p className="pl-4"><span className="text-red-400">.addSnake(47, 26)</span></p>
                  <p className="pl-4"><span className="text-emerald-400">.addLadder(1, 38)</span></p>
                  <p className="pl-4"><span className="text-emerald-400">.addLadder(4, 14)</span></p>
                  <p className="pl-4"><span className="text-quest-primary">.build()</span> <span className="text-quest-muted">// validates & returns Board</span></p>
                </div>
              </div>
            </div>

            <DeepDive id="extensibility" title="Extending the Game: Common Follow-ups" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p>Interviewers often ask how to extend the design. Here are common follow-ups:</p>
                <div className="space-y-2">
                  <p><strong>1. Roll again on 6:</strong> Add a rule in Game.playTurn() that doesn't advance the turn counter if the roll is 6. Use three consecutive 6s to cancel the turn (prevent infinite loops).</p>
                  <p><strong>2. Multiple dice:</strong> The Dice class already supports this via the Strategy pattern. Create a TwoDice strategy that rolls two dice and sums them.</p>
                  <p><strong>3. Power-ups on cells:</strong> Add a PowerUp interface with execute(Player) method. Cells can hold optional power-ups (shield from snakes, double move, etc.).</p>
                  <p><strong>4. Save/Load game:</strong> Implement Memento pattern. Serialize game state (player positions, turn order, board config) to JSON for persistence.</p>
                  <p><strong>5. Online multiplayer:</strong> Extract a GameServer that holds the Game instance. Players connect via WebSocket. The server validates moves and broadcasts state updates.</p>
                </div>
              </div>
            </DeepDive>

            <DeepDive id="testing-strategy" title="Testing Strategy" onRead={markDeepDiveRead}>
              <div className="text-sm text-quest-muted space-y-3">
                <p>A good testing strategy covers:</p>
                <div className="space-y-2">
                  <p><strong>Unit Tests:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>- Dice always returns 1-6</li>
                    <li>- Snake moves player down (position decreases)</li>
                    <li>- Ladder moves player up (position increases)</li>
                    <li>- Player can't move past 100</li>
                    <li>- Board rejects invalid snake/ladder configs</li>
                  </ul>
                  <p><strong>Integration Tests:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>- Full game with MockDice produces expected moves</li>
                    <li>- Turn rotation works with 2, 3, 4 players</li>
                    <li>- Landing on 100 ends the game</li>
                    <li>- Snake at destination of a ladder (chained redirects)</li>
                  </ul>
                  <p><strong>Key insight:</strong> By using a MockDice (Strategy pattern), you can make tests deterministic -- controlling exact rolls to verify specific scenarios.</p>
                </div>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ============================================ */}
      {/* SECTION 4: QUIZ */}
      {/* ============================================ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              Test your understanding of Snake and Ladder game design -- game loops, class responsibilities,
              board validation, and turn management.
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
                <h3 className="text-xl font-bold mb-2">Level 49 Complete!</h3>
                <p className="text-quest-muted mb-2">
                  You scored {quizScore}/{quizQuestions.length}!
                </p>
                <p className="text-quest-muted mb-4">
                  You've mastered the low-level design of a Snake and Ladder game -- from game loops
                  and state machines to class responsibilities and design patterns.
                </p>
                <p className="text-sm text-quest-primary">
                  Key takeaway: Good LLD separates concerns. The Board knows positions, the Dice generates
                  randomness, and the Game orchestrates everything.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

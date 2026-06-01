import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Crown, Shield, Swords, Grid3X3, RotateCcw } from 'lucide-react'

/* ── Reusable helpers ── */
function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span className="relative inline-block">
      <span
        className="term cursor-pointer"
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

/* ── Chess piece unicode symbols ── */
const PIECE_SYMBOLS = {
  K: { white: '\u2654', black: '\u265A' },
  Q: { white: '\u2655', black: '\u265B' },
  R: { white: '\u2656', black: '\u265C' },
  B: { white: '\u2657', black: '\u265D' },
  N: { white: '\u2658', black: '\u265E' },
  P: { white: '\u2659', black: '\u265F' },
}

/* ── Initial board setup (8x8 array, null = empty) ── */
function createInitialBoard() {
  const board = Array.from({ length: 8 }, () => Array(8).fill(null))
  const backRow = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  for (let c = 0; c < 8; c++) {
    board[0][c] = { type: backRow[c], color: 'black' }
    board[1][c] = { type: 'P', color: 'black' }
    board[6][c] = { type: 'P', color: 'white' }
    board[7][c] = { type: backRow[c], color: 'white' }
  }
  return board
}

/* ── Move validation helpers ── */
function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8
}

function getValidMoves(board, row, col) {
  const piece = board[row][col]
  if (!piece) return []
  const moves = []
  const { type, color } = piece
  const dir = color === 'white' ? -1 : 1

  const canMoveTo = (r, c) => {
    if (!inBounds(r, c)) return false
    const target = board[r][c]
    if (!target) return true
    return target.color !== color
  }

  const isEnemy = (r, c) => {
    if (!inBounds(r, c)) return false
    const target = board[r][c]
    return target && target.color !== color
  }

  const isEmpty = (r, c) => {
    return inBounds(r, c) && !board[r][c]
  }

  switch (type) {
    case 'P': {
      // Forward one
      if (isEmpty(row + dir, col)) {
        moves.push([row + dir, col])
        // Forward two from start
        const startRow = color === 'white' ? 6 : 1
        if (row === startRow && isEmpty(row + 2 * dir, col)) {
          moves.push([row + 2 * dir, col])
        }
      }
      // Diagonal captures
      if (isEnemy(row + dir, col - 1)) moves.push([row + dir, col - 1])
      if (isEnemy(row + dir, col + 1)) moves.push([row + dir, col + 1])
      break
    }
    case 'N': {
      const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]
      for (const [dr, dc] of knightMoves) {
        if (canMoveTo(row + dr, col + dc)) moves.push([row + dr, col + dc])
      }
      break
    }
    case 'B': {
      for (const [dr, dc] of [[-1,-1],[-1,1],[1,-1],[1,1]]) {
        for (let i = 1; i < 8; i++) {
          const r = row + dr * i, c = col + dc * i
          if (!inBounds(r, c)) break
          if (!board[r][c]) { moves.push([r, c]); continue }
          if (board[r][c].color !== color) moves.push([r, c])
          break
        }
      }
      break
    }
    case 'R': {
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        for (let i = 1; i < 8; i++) {
          const r = row + dr * i, c = col + dc * i
          if (!inBounds(r, c)) break
          if (!board[r][c]) { moves.push([r, c]); continue }
          if (board[r][c].color !== color) moves.push([r, c])
          break
        }
      }
      break
    }
    case 'Q': {
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
        for (let i = 1; i < 8; i++) {
          const r = row + dr * i, c = col + dc * i
          if (!inBounds(r, c)) break
          if (!board[r][c]) { moves.push([r, c]); continue }
          if (board[r][c].color !== color) moves.push([r, c])
          break
        }
      }
      break
    }
    case 'K': {
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]]) {
        if (canMoveTo(row + dr, col + dc)) moves.push([row + dr, col + dc])
      }
      break
    }
    default:
      break
  }

  return moves
}

/* ── Check detection ── */
function findKing(board, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p && p.type === 'K' && p.color === color) return [r, c]
    }
  }
  return null
}

function isInCheck(board, color) {
  const kingPos = findKing(board, color)
  if (!kingPos) return false
  const enemyColor = color === 'white' ? 'black' : 'white'
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c]
      if (p && p.color === enemyColor) {
        const moves = getValidMoves(board, r, c)
        if (moves.some(([mr, mc]) => mr === kingPos[0] && mc === kingPos[1])) return true
      }
    }
  }
  return false
}

/* ── Class hierarchy data ── */
const classHierarchy = [
  {
    name: 'Piece',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30',
    desc: 'Abstract base class',
    fields: ['color', 'position', 'isAlive'],
    methods: ['move()', 'getValidMoves()', 'toString()'],
  },
  {
    name: 'King',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    symbol: '\u2654',
    desc: 'Moves 1 square any direction',
    overrides: 'getValidMoves() -> 8 adjacent squares + castling',
  },
  {
    name: 'Queen',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    symbol: '\u2655',
    desc: 'Moves any direction, any distance',
    overrides: 'getValidMoves() -> all 8 directions, unlimited range',
  },
  {
    name: 'Rook',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    symbol: '\u2656',
    desc: 'Moves along ranks/files',
    overrides: 'getValidMoves() -> 4 straight directions, unlimited range',
  },
  {
    name: 'Bishop',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    symbol: '\u2657',
    desc: 'Moves diagonally',
    overrides: 'getValidMoves() -> 4 diagonal directions, unlimited range',
  },
  {
    name: 'Knight',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    symbol: '\u2658',
    desc: 'L-shaped jumps, can leap pieces',
    overrides: 'getValidMoves() -> 8 L-shaped positions, ignores obstacles',
  },
  {
    name: 'Pawn',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    symbol: '\u2659',
    desc: 'Moves forward, captures diagonally',
    overrides: 'getValidMoves() -> forward 1-2, diagonal captures, en passant',
  },
]

/* ── Observer pattern data ── */
const observers = [
  { id: 'ui', name: 'BoardUI', icon: Grid3X3, color: 'text-sky-400', desc: 'Re-renders the board visualization' },
  { id: 'logger', name: 'MoveLogger', icon: Swords, color: 'text-green-400', desc: 'Records move in algebraic notation' },
  { id: 'timer', name: 'GameTimer', icon: RotateCcw, color: 'text-yellow-400', desc: 'Switches clock to other player' },
  { id: 'check', name: 'CheckDetector', icon: Shield, color: 'text-red-400', desc: 'Evaluates if king is in check' },
  { id: 'score', name: 'ScoreKeeper', icon: Crown, color: 'text-purple-400', desc: 'Updates material advantage' },
]

/* ══════════════════════════════════════════════════════════════════
   Level 45 — "Checkmate" — Design a Chess Game
   ══════════════════════════════════════════════════════════════════ */
export default function Level45({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* ── Mini chess board state ── */
  const [board, setBoard] = useState(createInitialBoard)
  const [selectedSquare, setSelectedSquare] = useState(null)
  const [validMoves, setValidMoves] = useState([])
  const [turn, setTurn] = useState('white')
  const [moveHistory, setMoveHistory] = useState([])
  const [checkStatus, setCheckStatus] = useState(null)
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] })

  /* ── Polymorphism demo state ── */
  const [polyPiece, setPolyPiece] = useState('N')
  const [polyRow, setPolyCol] = useState(4)
  const [polyCol, setPolyRow] = useState(4)

  /* ── Observer pattern demo state ── */
  const [observerNotifications, setObserverNotifications] = useState([])
  const [activeObservers, setActiveObservers] = useState(new Set(['ui', 'logger', 'timer', 'check', 'score']))

  const sections = ['intro', 'hierarchy', 'polymorphism', 'gamestate', 'observer', 'quiz']

  const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

  /* ── Board click handler ── */
  const handleSquareClick = useCallback((row, col) => {
    if (selectedSquare) {
      const [sRow, sCol] = selectedSquare
      const isValid = validMoves.some(([mr, mc]) => mr === row && mc === col)

      if (isValid) {
        setBoard(prev => {
          const newBoard = prev.map(r => [...r])
          const movingPiece = newBoard[sRow][sCol]
          const capturedPiece = newBoard[row][col]

          // Record capture
          if (capturedPiece) {
            setCapturedPieces(cp => ({
              ...cp,
              [movingPiece.color]: [...cp[movingPiece.color], capturedPiece],
            }))
          }

          newBoard[row][col] = movingPiece
          newBoard[sRow][sCol] = null

          // Pawn promotion (auto-queen)
          if (movingPiece.type === 'P' && (row === 0 || row === 7)) {
            newBoard[row][col] = { ...movingPiece, type: 'Q' }
          }

          // Check detection
          const nextTurn = turn === 'white' ? 'black' : 'white'
          if (isInCheck(newBoard, nextTurn)) {
            setCheckStatus(nextTurn)
          } else {
            setCheckStatus(null)
          }

          // Record move
          const notation = `${movingPiece.type === 'P' ? '' : movingPiece.type}${colLabels[sCol]}${8 - sRow}${capturedPiece ? 'x' : '-'}${colLabels[col]}${8 - row}`
          setMoveHistory(prev => [...prev, { notation, color: turn }])

          // Fire observer notifications
          fireObservers(notation, movingPiece, capturedPiece, nextTurn, newBoard)

          return newBoard
        })

        setTurn(t => t === 'white' ? 'black' : 'white')
        setSelectedSquare(null)
        setValidMoves([])
      } else {
        // Clicking on own piece selects it
        const piece = board[row][col]
        if (piece && piece.color === turn) {
          setSelectedSquare([row, col])
          setValidMoves(getValidMoves(board, row, col))
        } else {
          setSelectedSquare(null)
          setValidMoves([])
        }
      }
    } else {
      const piece = board[row][col]
      if (piece && piece.color === turn) {
        setSelectedSquare([row, col])
        setValidMoves(getValidMoves(board, row, col))
      }
    }
  }, [selectedSquare, validMoves, board, turn, colLabels])

  /* ── Fire observer notifications ── */
  const fireObservers = useCallback((notation, piece, captured, nextTurn, newBoard) => {
    const newNotifs = []
    if (activeObservers.has('ui')) {
      newNotifs.push({ id: 'ui', message: 'Board re-rendered', time: Date.now() })
    }
    if (activeObservers.has('logger')) {
      newNotifs.push({ id: 'logger', message: `Logged: ${notation}`, time: Date.now() })
    }
    if (activeObservers.has('timer')) {
      newNotifs.push({ id: 'timer', message: `Clock switched to ${nextTurn}`, time: Date.now() })
    }
    if (activeObservers.has('check')) {
      const inCheck = isInCheck(newBoard, nextTurn)
      newNotifs.push({ id: 'check', message: inCheck ? `${nextTurn} is in CHECK!` : 'No check', time: Date.now() })
    }
    if (activeObservers.has('score') && captured) {
      const values = { P: 1, N: 3, B: 3, R: 5, Q: 9, K: 0 }
      newNotifs.push({ id: 'score', message: `+${values[captured.type]} material captured`, time: Date.now() })
    }
    setObserverNotifications(newNotifs)
  }, [activeObservers])

  /* ── Reset board ── */
  const resetBoard = () => {
    setBoard(createInitialBoard())
    setSelectedSquare(null)
    setValidMoves([])
    setTurn('white')
    setMoveHistory([])
    setCheckStatus(null)
    setCapturedPieces({ white: [], black: [] })
    setObserverNotifications([])
  }

  /* ── Get polymorphism demo valid moves ── */
  const getPolyMoves = useCallback(() => {
    const demoBoard = Array.from({ length: 8 }, () => Array(8).fill(null))
    demoBoard[polyRow][polyCol] = { type: polyPiece, color: 'white' }
    return getValidMoves(demoBoard, polyRow, polyCol)
  }, [polyPiece, polyRow, polyCol])

  /* ── Quiz ── */
  const quizQuestions = [
    {
      id: 'q1',
      question: 'Why should chess pieces use inheritance from a base Piece class?',
      options: [
        { id: 'a', text: 'So each piece type can override getValidMoves() with its own movement logic while sharing common fields like color and position', correct: true },
        { id: 'b', text: 'To make the code run faster by using compile-time optimizations', correct: false },
        { id: 'c', text: 'Because all pieces move exactly the same way', correct: false },
        { id: 'd', text: 'To avoid using any conditional logic in the codebase', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'How does polymorphism simplify the Board.movePiece() method?',
      options: [
        { id: 'a', text: 'It eliminates the need for a board entirely', correct: false },
        { id: 'b', text: 'The board calls piece.getValidMoves() without knowing the piece type -- each subclass handles its own movement rules', correct: true },
        { id: 'c', text: 'It makes all pieces move like queens to simplify logic', correct: false },
        { id: 'd', text: 'It prevents any piece from being captured', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'What is the best way to manage whose turn it is and detect check?',
      options: [
        { id: 'a', text: 'Store turn in a global variable and check for check only at game end', correct: false },
        { id: 'b', text: 'Let each piece track the turn independently', correct: false },
        { id: 'c', text: 'A Game class holds turn state; after each move, iterate enemy pieces to see if any can reach the king', correct: true },
        { id: 'd', text: 'Only the King piece checks for check on its own turn', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'Which approach correctly detects if a king is in check?',
      options: [
        { id: 'a', text: 'Check only the squares adjacent to the king', correct: false },
        { id: 'b', text: 'For every enemy piece, compute its valid moves; if any reach the king square, the king is in check', correct: true },
        { id: 'c', text: 'Only pawns and knights can give check, so ignore other pieces', correct: false },
        { id: 'd', text: 'The king is only in check when directly adjacent to an enemy piece', correct: false },
      ],
    },
    {
      id: 'q5',
      question: 'How does the Observer pattern apply to a chess game?',
      options: [
        { id: 'a', text: 'The board is the subject; UI renderer, move logger, timer, and check detector are observers notified on each move', correct: true },
        { id: 'b', text: 'Each piece observes every other piece to decide whether to move', correct: false },
        { id: 'c', text: 'The observer pattern is used to make pieces move autonomously', correct: false },
        { id: 'd', text: 'Only the King piece uses the observer pattern to watch for check', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  /* ══════════════════ RENDER ══════════════════ */
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-quest-surface border border-white/10 text-xs text-quest-muted mb-4">
          <Crown size={14} className="text-yellow-400" />
          Level 45 — Low Level Design
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
          <span className="text-4xl">{'\u265A'}</span> Checkmate
        </h1>
        <p className="text-quest-muted max-w-2xl mx-auto">
          Design a chess game -- can you model pieces, valid moves, and game rules elegantly?
        </p>
      </motion.div>

      {/* Section nav */}
      <div className="flex gap-1 bg-quest-surface/50 rounded-lg p-1 overflow-x-auto">
        {sections.map((s, i) => (
          <button
            key={s}
            onClick={() => setCurrentSection(i)}
            className={`flex-1 min-w-[80px] py-2 px-3 rounded-md text-xs font-medium transition-all whitespace-nowrap
              ${currentSection === i
                ? 'bg-quest-primary text-white shadow-lg'
                : 'text-quest-muted hover:text-quest-text hover:bg-white/5'
              }`}
          >
            {['Intro', 'Hierarchy', 'Polymorphism', 'Game State', 'Observer', 'Quiz'][i]}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: INTRO ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Crown className="text-yellow-400" />
              Designing a Chess Game
            </h2>

            <p className="text-quest-muted mb-4">
              Chess is a classic{' '}
              <Term
                word="Low-Level Design"
                definition="The process of designing the internal components, classes, interfaces, and interactions of a system. Focuses on code structure, design patterns, and OOP principles rather than distributed systems or infrastructure."
                onLearn={learnTerm}
              />{' '}
              interview problem. It tests your ability to model complex domain logic using{' '}
              <Term
                word="Inheritance"
                definition="An OOP mechanism where a subclass derives properties and behavior from a parent class. In chess, all pieces inherit from a base Piece class but override movement logic."
                onLearn={learnTerm}
              />
              ,{' '}
              <Term
                word="Polymorphism"
                definition="The ability for different classes to respond to the same method call in different ways. In chess, calling getValidMoves() on a Knight vs a Bishop produces completely different results, but the caller doesn't need to know which piece type it is."
                onLearn={learnTerm}
              />
              , and clean{' '}
              <Term
                word="Game State Management"
                definition="Tracking all dynamic information in a game: board layout, whose turn it is, captured pieces, move history, check/checkmate status, and any special move eligibility (castling, en passant)."
                onLearn={learnTerm}
              />
              .
            </p>

            <p className="text-quest-muted mb-6">
              The key insight is that chess pieces share a common interface but have vastly different
              movement rules. This is the textbook case for the{' '}
              <Term
                word="Strategy Pattern"
                definition="A design pattern where different algorithms (movement strategies) are encapsulated in separate classes that share a common interface. Each chess piece type has its own movement strategy."
                onLearn={learnTerm}
              />{' '}
              and{' '}
              <Term
                word="Observer Pattern"
                definition="A pattern where a subject maintains a list of observers and notifies them of state changes. In chess, the board (subject) notifies the UI, logger, timer, and check detector (observers) whenever a move is made."
                onLearn={learnTerm}
              />
              .
            </p>

            {/* Key concepts overview */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {[
                { icon: Crown, title: 'Piece Hierarchy', desc: 'Abstract Piece base class with 6 concrete subclasses, each defining unique movement logic.', color: 'text-yellow-400' },
                { icon: Shield, title: 'Move Validation', desc: 'Each piece type overrides getValidMoves() -- polymorphism ensures clean, extensible code.', color: 'text-blue-400' },
                { icon: Swords, title: 'Game Rules', desc: 'Turn management, check detection, move history, captures, and promotion.', color: 'text-red-400' },
              ].map(({ icon: Icon, title, desc, color }) => (
                <div key={title} className="bg-quest-bg rounded-xl p-4 border border-white/5">
                  <Icon size={20} className={`${color} mb-2`} />
                  <h4 className="text-sm font-semibold mb-1">{title}</h4>
                  <p className="text-[11px] text-quest-muted">{desc}</p>
                </div>
              ))}
            </div>

            {/* Core classes overview */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5">
              <h4 className="text-sm font-semibold mb-3">Core Class Overview</h4>
              <div className="font-mono text-xs space-y-2 text-quest-muted">
                <div className="flex items-center gap-2">
                  <span className="text-sky-400 w-24">Game</span>
                  <span>Orchestrates gameplay: turns, rules, win conditions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 w-24">Board</span>
                  <span>8x8 grid, manages piece positions, validates moves</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 w-24">Piece</span>
                  <span>Abstract base: color, position, getValidMoves()</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 w-24">Player</span>
                  <span>Name, color, captured pieces, time remaining</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 w-24">Move</span>
                  <span>From, to, piece, captured, notation, timestamp</span>
                </div>
              </div>
            </div>

            <DeepDive id="chess-lld-approach" title="How to Approach Chess in an LLD Interview" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Step 1: Clarify Requirements.</strong> Ask about scope --
                  is it two-player only? Do we need a timer? AI opponent? Online multiplayer? Start with the
                  minimal viable chess game and extend.
                </p>
                <p>
                  <strong className="text-quest-text">Step 2: Identify Core Entities.</strong> Game, Board,
                  Piece (abstract), Player, Move. Draw the relationships between them. The Board HAS pieces,
                  the Game HAS a Board and two Players.
                </p>
                <p>
                  <strong className="text-quest-text">Step 3: Design the Piece Hierarchy.</strong> This is
                  where you showcase OOP. Abstract Piece class with getValidMoves() overridden by each subclass.
                  Interviewers love seeing clean polymorphism here.
                </p>
                <p>
                  <strong className="text-quest-text">Step 4: Handle Special Rules.</strong> Castling, en passant,
                  pawn promotion, check/checkmate, stalemate. These are edge cases that show depth of understanding.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Class Hierarchy
                <Crown size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: HIERARCHY ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Crown className="text-yellow-400" />
              Piece Class Hierarchy
            </h2>

            <p className="text-quest-muted mb-6">
              The foundation of the chess game design is the piece{' '}
              <Term
                word="Class Hierarchy"
                definition="A tree-like structure of classes where subclasses inherit from parent classes. In chess, King, Queen, Rook, Bishop, Knight, and Pawn all extend the abstract Piece class."
                onLearn={learnTerm}
              />
              . An abstract <code className="text-sky-400 font-mono text-sm">Piece</code> base class defines
              common properties and a contract for movement. Each concrete piece type overrides the movement
              logic while reusing shared fields.
            </p>

            {/* Base class */}
            <div className={`rounded-xl p-5 border mb-4 ${classHierarchy[0].bg} ${classHierarchy[0].border}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`text-lg font-bold font-mono ${classHierarchy[0].color}`}>
                  abstract class Piece
                </div>
                <span className="text-xs text-quest-muted px-2 py-0.5 bg-white/5 rounded-full">
                  {classHierarchy[0].desc}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-quest-muted mb-2">Fields</p>
                  <div className="space-y-1">
                    {classHierarchy[0].fields.map(f => (
                      <div key={f} className="font-mono text-xs text-quest-muted flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-quest-muted mb-2">Methods</p>
                  <div className="space-y-1">
                    {classHierarchy[0].methods.map(m => (
                      <div key={m} className="font-mono text-xs text-quest-muted flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subclasses */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {classHierarchy.slice(1).map(cls => (
                <motion.div
                  key={cls.name}
                  whileHover={{ scale: 1.02 }}
                  className={`rounded-xl p-4 border ${cls.bg} ${cls.border} cursor-default`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{cls.symbol}</span>
                    <span className={`font-bold font-mono text-sm ${cls.color}`}>{cls.name}</span>
                  </div>
                  <p className="text-[11px] text-quest-muted mb-2">{cls.desc}</p>
                  <div className="font-mono text-[10px] text-quest-muted bg-quest-bg/50 rounded p-2">
                    <span className="text-green-400">@override</span>
                    <br />
                    {cls.overrides}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Inheritance arrows visualization */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Inheritance Diagram</h4>
              <div className="flex flex-col items-center">
                <div className="px-4 py-2 rounded-lg bg-sky-500/20 border border-sky-500/40 font-mono text-sm text-sky-400 font-bold">
                  Piece (abstract)
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex items-center gap-1">
                  {['King', 'Queen', 'Rook', 'Bishop', 'Knight', 'Pawn'].map((name, i) => {
                    const cls = classHierarchy[i + 1]
                    return (
                      <div key={name} className="flex flex-col items-center">
                        <div className="w-px h-4 bg-white/20" />
                        <div className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${cls.color} ${cls.bg} border ${cls.border}`}>
                          {cls.symbol} {name}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            <DeepDive id="piece-design-choices" title="Design Choices: Inheritance vs Composition" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Inheritance approach (classic):</strong> Each piece IS-A
                  Piece. Clean hierarchy, easy to understand. Works perfectly for chess since piece types are
                  fixed and well-defined. This is what interviewers expect.
                </p>
                <p>
                  <strong className="text-quest-text">Composition approach (alternative):</strong> A generic
                  Piece class HAS-A MovementStrategy. You could swap movement behaviors at runtime -- useful
                  if you were designing a game where pieces could change their movement rules. Overkill for
                  standard chess, but shows design pattern knowledge.
                </p>
                <p>
                  <strong className="text-quest-text">Enum approach (simple):</strong> Just use a PieceType
                  enum and a big switch statement. Works for small projects but violates the Open/Closed
                  Principle -- adding a new piece type requires modifying existing code.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <Crown size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Polymorphism
                <Swords size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: POLYMORPHISM ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Swords className="text-orange-400" />
              Polymorphism in Action
            </h2>

            <p className="text-quest-muted mb-6">
              Same method call -- <code className="text-green-400 font-mono text-sm">piece.getValidMoves(board)</code> --
              but wildly different results depending on the piece type. Select a piece below to see how the
              same interface produces different valid moves on an empty board.
            </p>

            {/* Piece selector */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {classHierarchy.slice(1).map(cls => (
                <button
                  key={cls.name}
                  onClick={() => setPolyPiece(cls.name[0] === 'K' && cls.name === 'Knight' ? 'N' : cls.name[0])}
                  className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all flex items-center gap-2
                    ${polyPiece === (cls.name[0] === 'K' && cls.name === 'Knight' ? 'N' : cls.name[0])
                      ? `${cls.bg} ${cls.border} ${cls.color}`
                      : 'border-white/10 text-quest-muted hover:border-white/30'
                    }`}
                >
                  <span className="text-lg">{cls.symbol}</span>
                  {cls.name}
                </button>
              ))}
            </div>

            {/* Polymorphism demo board */}
            <div className="bg-quest-bg rounded-xl p-4 border border-white/5 mb-6">
              <p className="text-xs text-quest-muted mb-3 text-center">
                Piece at e4 (row 4, col 4) -- highlighted squares show valid moves
              </p>
              <div className="flex justify-center">
                <div className="inline-grid grid-cols-8 gap-0 border border-white/20 rounded overflow-hidden">
                  {Array.from({ length: 8 }, (_, r) =>
                    Array.from({ length: 8 }, (_, c) => {
                      const isDark = (r + c) % 2 === 1
                      const isPiece = r === polyRow && c === polyCol
                      const polyMoves = getPolyMoves()
                      const isHighlighted = polyMoves.some(([mr, mc]) => mr === r && mc === c)

                      return (
                        <div
                          key={`${r}-${c}`}
                          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg md:text-xl relative
                            ${isDark ? 'bg-amber-800/60' : 'bg-amber-100/20'}
                            ${isHighlighted ? 'ring-2 ring-inset ring-green-400/60 bg-green-500/20' : ''}
                          `}
                        >
                          {isPiece && (
                            <span className="text-white drop-shadow-lg">
                              {PIECE_SYMBOLS[polyPiece]?.white || '?'}
                            </span>
                          )}
                          {isHighlighted && !isPiece && (
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs text-green-400 font-mono">
                  {polyPiece}.getValidMoves() → {getPolyMoves().length} valid squares
                </span>
              </div>
            </div>

            {/* Code comparison */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-3">The Power of Polymorphism</h4>
              <div className="font-mono text-xs space-y-4">
                <div>
                  <p className="text-quest-muted mb-1">// Without polymorphism (bad):</p>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3 text-red-300">
                    <p>if (piece.type === 'knight') {'{'}</p>
                    <p className="pl-4">// knight movement logic...</p>
                    <p>{'}'} else if (piece.type === 'bishop') {'{'}</p>
                    <p className="pl-4">// bishop movement logic...</p>
                    <p>{'}'} else if (piece.type === 'rook') {'{'}</p>
                    <p className="pl-4">// ... 6 more branches</p>
                  </div>
                </div>
                <div>
                  <p className="text-quest-muted mb-1">// With polymorphism (clean):</p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded p-3 text-green-300">
                    <p>const moves = piece.getValidMoves(board)</p>
                    <p className="text-quest-muted">// That's it. Each piece knows its own rules.</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="polymorphism-benefits" title="Why Polymorphism Matters for Extensibility" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Open/Closed Principle:</strong> With polymorphism, the
                  Board class is open for extension (add new piece types) but closed for modification (no need
                  to change Board code). Adding a custom piece like "Amazon" (moves like Queen + Knight) just
                  means creating a new subclass.
                </p>
                <p>
                  <strong className="text-quest-text">Single Responsibility:</strong> Each piece class is
                  responsible only for its own movement rules. The Board doesn't know or care how a Knight moves --
                  it just asks the Knight.
                </p>
                <p>
                  <strong className="text-quest-text">Testability:</strong> You can unit test each piece type
                  independently. Knight.getValidMoves() can be tested without caring about the Queen or Bishop.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <Crown size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Game State
                <Grid3X3 size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: GAME STATE ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Grid3X3 className="text-green-400" />
              Game State & Interactive Board
            </h2>

            <p className="text-quest-muted mb-4">
              A working chess game needs careful state management: the board layout, whose turn it is,
              captured pieces, move history, and check status. Play the mini board below to see these
              systems interact in real time.
            </p>

            {/* Game status bar */}
            <div className="bg-quest-bg rounded-xl p-4 border border-white/5 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${turn === 'white' ? 'bg-white text-black' : 'bg-gray-700 text-white'}`}>
                    {turn === 'white' ? '\u2654' : '\u265A'} {turn}'s turn
                  </div>
                  {checkStatus && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-xs font-bold text-red-400"
                    >
                      {checkStatus} in CHECK!
                    </motion.div>
                  )}
                </div>
                <button
                  onClick={resetBoard}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-quest-surface border border-white/10 text-xs text-quest-muted hover:border-white/30 transition-colors"
                >
                  <RotateCcw size={12} />
                  Reset
                </button>
              </div>
            </div>

            {/* Board + side panels */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Captured pieces (black's captures) */}
              <div className="md:w-20 flex md:flex-col gap-1 items-start">
                <p className="text-[10px] text-quest-muted mb-1 w-full">White captured:</p>
                <div className="flex flex-wrap gap-0.5">
                  {capturedPieces.white.map((p, i) => (
                    <span key={i} className="text-sm">{PIECE_SYMBOLS[p.type]?.[p.color]}</span>
                  ))}
                </div>
              </div>

              {/* Chess board */}
              <div className="flex-1 flex justify-center">
                <div>
                  <div className="flex mb-1">
                    <div className="w-6" />
                    {colLabels.map(l => (
                      <div key={l} className="w-8 md:w-10 text-center text-[10px] text-quest-muted">{l}</div>
                    ))}
                  </div>
                  <div className="inline-grid grid-cols-[auto_repeat(8,_1fr)] gap-0">
                    {Array.from({ length: 8 }, (_, r) => (
                      <div key={r} className="contents">
                        <div className="w-6 flex items-center justify-center text-[10px] text-quest-muted">
                          {8 - r}
                        </div>
                        {Array.from({ length: 8 }, (_, c) => {
                          const piece = board[r][c]
                          const isDark = (r + c) % 2 === 1
                          const isSelected = selectedSquare && selectedSquare[0] === r && selectedSquare[1] === c
                          const isValidMove = validMoves.some(([mr, mc]) => mr === r && mc === c)
                          const isKingInCheck = checkStatus && piece?.type === 'K' && piece?.color === checkStatus

                          return (
                            <motion.button
                              key={`${r}-${c}`}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSquareClick(r, c)}
                              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-lg md:text-xl relative transition-all
                                ${isDark ? 'bg-amber-800/60' : 'bg-amber-100/20'}
                                ${isSelected ? 'ring-2 ring-inset ring-sky-400 bg-sky-500/30' : ''}
                                ${isValidMove ? 'ring-2 ring-inset ring-green-400/60' : ''}
                                ${isKingInCheck ? 'bg-red-500/40 ring-2 ring-inset ring-red-400' : ''}
                                hover:brightness-110
                              `}
                            >
                              {piece && (
                                <span className={piece.color === 'white' ? 'text-white drop-shadow-lg' : 'text-gray-300 drop-shadow-lg'}>
                                  {PIECE_SYMBOLS[piece.type]?.[piece.color]}
                                </span>
                              )}
                              {isValidMove && !piece && (
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                              )}
                              {isValidMove && piece && (
                                <div className="absolute inset-0 ring-2 ring-inset ring-red-400/60 rounded-sm" />
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Captured pieces (white's captures) */}
              <div className="md:w-20 flex md:flex-col gap-1 items-start">
                <p className="text-[10px] text-quest-muted mb-1 w-full">Black captured:</p>
                <div className="flex flex-wrap gap-0.5">
                  {capturedPieces.black.map((p, i) => (
                    <span key={i} className="text-sm">{PIECE_SYMBOLS[p.type]?.[p.color]}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Move history */}
            <div className="bg-quest-bg rounded-xl p-4 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-2">Move History</h4>
              {moveHistory.length === 0 ? (
                <p className="text-xs text-quest-muted">Click a piece to select it, then click a highlighted square to move. Make a move to see history.</p>
              ) : (
                <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                  {moveHistory.map((m, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${m.color === 'white' ? 'bg-white/10 text-white' : 'bg-gray-600/30 text-gray-300'}`}
                    >
                      {Math.floor(i / 2) + 1}{m.color === 'white' ? '.' : '...'}{m.notation}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* State management diagram */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Game State Architecture</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-quest-bg rounded-lg p-3">
                  <p className="text-xs font-medium text-sky-400 mb-2">Game Class</p>
                  <div className="font-mono text-[10px] text-quest-muted space-y-1">
                    <p>- board: Board</p>
                    <p>- players: Player[2]</p>
                    <p>- currentTurn: Color</p>
                    <p>- status: ACTIVE | CHECK | CHECKMATE | STALEMATE</p>
                    <p>- moveHistory: Move[]</p>
                    <p className="text-green-400 mt-2">+ makeMove(from, to): boolean</p>
                    <p className="text-green-400">+ isCheckmate(): boolean</p>
                    <p className="text-green-400">+ undoLastMove(): void</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3">
                  <p className="text-xs font-medium text-green-400 mb-2">Board Class</p>
                  <div className="font-mono text-[10px] text-quest-muted space-y-1">
                    <p>- grid: Piece[8][8]</p>
                    <p>- capturedPieces: Piece[]</p>
                    <p className="text-green-400 mt-2">+ getPiece(row, col): Piece</p>
                    <p className="text-green-400">+ movePiece(from, to): void</p>
                    <p className="text-green-400">+ isSquareUnderAttack(pos, color): boolean</p>
                    <p className="text-green-400">+ getKingPosition(color): Position</p>
                  </div>
                </div>
              </div>
            </div>

            <DeepDive id="check-detection-algo" title="Check & Checkmate Detection Algorithm" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Check detection:</strong> After each move, find the
                  opponent's king position. Then iterate through ALL of the current player's pieces and compute
                  their valid moves. If any piece can reach the king's square, the king is in check.
                </p>
                <p>
                  <strong className="text-quest-text">Checkmate detection:</strong> The opponent is in checkmate
                  if: (1) their king is in check, AND (2) no legal move by any of their pieces removes the check.
                  For each of the opponent's pieces, try every valid move on a copy of the board. If after any move
                  the king is no longer in check, it is not checkmate.
                </p>
                <p>
                  <strong className="text-quest-text">Stalemate:</strong> The opponent's king is NOT in check,
                  but the opponent has NO legal moves. This is a draw, not a loss.
                </p>
                <p>
                  <strong className="text-quest-text">Performance note:</strong> Check detection runs after every
                  move, so it should be efficient. Iterating all enemy pieces and their moves is O(n * m) where n
                  is the number of pieces and m is the max moves per piece. In practice, this is fast enough for
                  a standard chess game.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <Swords size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Observer Pattern
                <Shield size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 4: OBSERVER PATTERN ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="text-purple-400" />
              Observer Pattern -- Decoupled Notifications
            </h2>

            <p className="text-quest-muted mb-6">
              When a move happens on the board, many systems need to react: the UI must re-render, the move
              logger records the notation, the timer switches, the check detector evaluates, and the score
              keeper updates. The{' '}
              <Term
                word="Observer Pattern"
                definition="A behavioral design pattern where an object (subject) maintains a list of dependents (observers) and notifies them automatically of any state changes. This decouples the subject from the concrete observers."
                onLearn={learnTerm}
              />{' '}
              decouples all of this beautifully.
            </p>

            {/* Observer toggle panel */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Active Observers</h4>
              <p className="text-xs text-quest-muted mb-4">
                Toggle observers on/off and make a move on the board below to see which get notified.
              </p>
              <div className="grid md:grid-cols-5 gap-2 mb-4">
                {observers.map(obs => {
                  const Icon = obs.icon
                  const isActive = activeObservers.has(obs.id)
                  return (
                    <button
                      key={obs.id}
                      onClick={() => {
                        setActiveObservers(prev => {
                          const next = new Set(prev)
                          if (next.has(obs.id)) next.delete(obs.id)
                          else next.add(obs.id)
                          return next
                        })
                      }}
                      className={`p-3 rounded-lg border text-center transition-all
                        ${isActive
                          ? 'border-white/30 bg-white/5'
                          : 'border-white/5 bg-quest-bg opacity-40'
                        }`}
                    >
                      <Icon size={18} className={`mx-auto mb-1 ${obs.color}`} />
                      <p className="text-[10px] font-medium">{obs.name}</p>
                      <p className={`text-[9px] mt-0.5 ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {isActive ? 'subscribed' : 'unsubscribed'}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Notification feed */}
              <div className="bg-quest-surface rounded-lg p-3 min-h-[80px]">
                <p className="text-[10px] text-quest-muted mb-2 font-semibold">Notification Feed (from last move):</p>
                {observerNotifications.length === 0 ? (
                  <p className="text-xs text-quest-muted italic">Make a move on the board in the Game State tab to see observer notifications here.</p>
                ) : (
                  <div className="space-y-1">
                    <AnimatePresence>
                      {observerNotifications.map((notif, i) => {
                        const obs = observers.find(o => o.id === notif.id)
                        return (
                          <motion.div
                            key={`${notif.id}-${i}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span className={`font-mono font-bold ${obs?.color || 'text-white'}`}>
                              {obs?.name || notif.id}:
                            </span>
                            <span className="text-quest-muted">{notif.message}</span>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Observer pattern architecture */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Observer Architecture</h4>

              {/* Subject */}
              <div className="flex flex-col items-center mb-4">
                <div className="px-6 py-3 rounded-lg bg-sky-500/20 border border-sky-500/40 text-center">
                  <p className="font-mono text-sm text-sky-400 font-bold">Game (Subject)</p>
                  <p className="text-[10px] text-quest-muted mt-1">notifyObservers(moveEvent)</p>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-[10px] text-quest-muted bg-quest-surface px-3 py-1 rounded-full">
                  broadcasts MoveEvent to all subscribers
                </div>
                <div className="w-px h-6 bg-white/20" />
              </div>

              {/* Observers */}
              <div className="flex flex-wrap justify-center gap-2">
                {observers.map(obs => {
                  const Icon = obs.icon
                  return (
                    <div key={obs.id} className="bg-quest-surface rounded-lg p-3 text-center w-36">
                      <Icon size={16} className={`mx-auto mb-1 ${obs.color}`} />
                      <p className="font-mono text-xs font-bold">{obs.name}</p>
                      <p className="text-[9px] text-quest-muted mt-1">{obs.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Code structure */}
            <div className="bg-quest-bg rounded-xl p-5 border border-white/5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Observer Pattern Code</h4>
              <div className="font-mono text-[11px] text-quest-muted space-y-3">
                <div className="bg-quest-surface rounded p-3">
                  <p className="text-sky-400">interface GameObserver {'{'}</p>
                  <p className="pl-4">onMoveMade(event: MoveEvent): void</p>
                  <p className="text-sky-400">{'}'}</p>
                </div>
                <div className="bg-quest-surface rounded p-3">
                  <p className="text-green-400">class Game {'{'}</p>
                  <p className="pl-4">private observers: GameObserver[] = []</p>
                  <p className="pl-4 mt-2 text-yellow-400">subscribe(observer: GameObserver) {'{'}</p>
                  <p className="pl-8">this.observers.push(observer)</p>
                  <p className="pl-4">{'}'}</p>
                  <p className="pl-4 mt-2 text-yellow-400">unsubscribe(observer: GameObserver) {'{'}</p>
                  <p className="pl-8">this.observers = this.observers.filter(o =&gt; o !== observer)</p>
                  <p className="pl-4">{'}'}</p>
                  <p className="pl-4 mt-2 text-yellow-400">makeMove(from, to) {'{'}</p>
                  <p className="pl-8">// ... validate and execute move ...</p>
                  <p className="pl-8 text-orange-400">this.observers.forEach(o =&gt; o.onMoveMade(event))</p>
                  <p className="pl-4">{'}'}</p>
                  <p className="text-green-400">{'}'}</p>
                </div>
              </div>
            </div>

            <DeepDive id="observer-vs-events" title="Observer Pattern vs Event Bus vs Pub-Sub" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Observer Pattern (used here):</strong> Direct relationship
                  between subject and observers. The Game object directly calls methods on registered observers.
                  Simple and appropriate for in-process communication.
                </p>
                <p>
                  <strong className="text-quest-text">Event Bus:</strong> A centralized event dispatcher.
                  Components emit events to the bus and subscribe to event types. More decoupled than observer
                  pattern but can become a "god object" that everything depends on.
                </p>
                <p>
                  <strong className="text-quest-text">Pub-Sub:</strong> Similar to event bus but typically
                  used across process/network boundaries (message queues like Kafka, RabbitMQ). Overkill for
                  a single-process chess game, but essential for distributed systems.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(3)} className="btn-secondary flex items-center gap-2">
                <Grid3X3 size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(5)} className="btn-primary flex items-center gap-2">
                Take the Quiz
                <CheckCircle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 5: QUIZ ═══════════════════ */}
      {currentSection === 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-sky-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Chess game design tests inheritance, polymorphism, state management, and design patterns.
              Let's verify your understanding.
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
                                : 'border-sky-500 bg-sky-500/10'
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
                <h3 className="text-xl font-bold mb-2">Level 45 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You've mastered chess game design -- class hierarchies, polymorphic movement,
                  game state management, check detection, and the observer pattern. These OOP
                  fundamentals apply far beyond chess to any complex domain modeling problem.
                </p>
                <p className="text-sm text-yellow-400">
                  Checkmate. Your design skills are unmatched.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

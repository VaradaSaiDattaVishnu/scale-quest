import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, DollarSign, Users, ArrowRight, Calculator, Wallet } from 'lucide-react'

/* ── Helper components ── */

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

/* ── Initial data ── */

const defaultMembers = ['Alice', 'Bob', 'Charlie', 'Diana']

const splitTypes = [
  { id: 'equal', label: 'Equal', desc: 'Split evenly among all selected members' },
  { id: 'exact', label: 'Exact', desc: 'Specify exact amount each person owes' },
  { id: 'percentage', label: 'Percentage', desc: 'Specify percentage each person owes' },
]

const sampleExpenses = [
  { id: 1, description: 'Dinner at Olive Garden', amount: 120, paidBy: 'Alice', splitType: 'equal', splits: { Alice: 30, Bob: 30, Charlie: 30, Diana: 30 } },
  { id: 2, description: 'Movie tickets', amount: 60, paidBy: 'Bob', splitType: 'equal', splits: { Alice: 15, Bob: 15, Charlie: 15, Diana: 15 } },
  { id: 3, description: 'Groceries', amount: 80, paidBy: 'Charlie', splitType: 'exact', splits: { Alice: 25, Bob: 20, Charlie: 15, Diana: 20 } },
  { id: 4, description: 'Taxi ride', amount: 40, paidBy: 'Diana', splitType: 'equal', splits: { Alice: 10, Bob: 10, Charlie: 10, Diana: 10 } },
]

const memberColors = {
  Alice: { bg: 'bg-sky-500/20', text: 'text-sky-400', border: 'border-sky-500/40', ring: 'ring-sky-500/20' },
  Bob: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/40', ring: 'ring-green-500/20' },
  Charlie: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/40', ring: 'ring-purple-500/20' },
  Diana: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40', ring: 'ring-amber-500/20' },
}

const memberPositions = {
  Alice: { x: 20, y: 20 },
  Bob: { x: 80, y: 20 },
  Charlie: { x: 80, y: 80 },
  Diana: { x: 20, y: 80 },
}

/* ── Quiz data ── */

const quizQuestions = [
  {
    id: 'q1',
    question: 'What is the most efficient algorithm for simplifying debts in a group?',
    options: [
      { id: 'a', text: 'Pay every individual debt separately', correct: false },
      { id: 'b', text: 'Compute net balances, then match creditors and debtors greedily', correct: true },
      { id: 'c', text: 'Have one person collect all money and redistribute', correct: false },
      { id: 'd', text: 'Use a round-robin payment schedule', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'In a group of N people with various debts, what is the minimum number of transactions needed to settle all debts after simplification?',
    options: [
      { id: 'a', text: 'Always N transactions', correct: false },
      { id: 'b', text: 'At most N-1 transactions', correct: true },
      { id: 'c', text: 'Always N*(N-1)/2 transactions', correct: false },
      { id: 'd', text: 'Exactly N/2 transactions', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'Which data structure best models the "who owes whom" relationship?',
    options: [
      { id: 'a', text: 'Array', correct: false },
      { id: 'b', text: 'Stack', correct: false },
      { id: 'c', text: 'Directed weighted graph', correct: true },
      { id: 'd', text: 'Binary tree', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'Which class is NOT typically part of the Splitwise LLD?',
    options: [
      { id: 'a', text: 'User', correct: false },
      { id: 'b', text: 'Expense', correct: false },
      { id: 'c', text: 'SplitStrategy', correct: false },
      { id: 'd', text: 'LoadBalancer', correct: true },
    ],
  },
  {
    id: 'q5',
    question: 'How should partial payments be handled in the debt graph?',
    options: [
      { id: 'a', text: 'Delete the edge entirely', correct: false },
      { id: 'b', text: 'Reduce the edge weight by the payment amount', correct: true },
      { id: 'c', text: 'Create a new reverse edge', correct: false },
      { id: 'd', text: 'Mark the edge as pending', correct: false },
    ],
  },
]

/* ── Utility functions ── */

function computeBalances(expenses, members) {
  const balances = {}
  members.forEach(m => { balances[m] = 0 })
  expenses.forEach(exp => {
    balances[exp.paidBy] = (balances[exp.paidBy] || 0) + exp.amount
    Object.entries(exp.splits).forEach(([person, share]) => {
      balances[person] = (balances[person] || 0) - share
    })
  })
  return balances
}

function computeDebts(expenses, members) {
  const debts = []
  members.forEach(from => {
    members.forEach(to => {
      if (from !== to) {
        let amount = 0
        expenses.forEach(exp => {
          if (exp.paidBy === to && exp.splits[from]) {
            amount += exp.splits[from]
          }
        })
        if (amount > 0) {
          debts.push({ from, to, amount: Math.round(amount * 100) / 100 })
        }
      }
    })
  })
  return debts
}

function simplifyDebts(expenses, members) {
  const balances = computeBalances(expenses, members)
  const creditors = []
  const debtors = []

  members.forEach(m => {
    const bal = Math.round(balances[m] * 100) / 100
    if (bal > 0.01) creditors.push({ name: m, amount: bal })
    else if (bal < -0.01) debtors.push({ name: m, amount: -bal })
  })

  creditors.sort((a, b) => b.amount - a.amount)
  debtors.sort((a, b) => b.amount - a.amount)

  const simplified = []
  let ci = 0, di = 0

  while (ci < creditors.length && di < debtors.length) {
    const transfer = Math.min(creditors[ci].amount, debtors[di].amount)
    if (transfer > 0.01) {
      simplified.push({
        from: debtors[di].name,
        to: creditors[ci].name,
        amount: Math.round(transfer * 100) / 100,
      })
    }
    creditors[ci].amount -= transfer
    debtors[di].amount -= transfer
    if (creditors[ci].amount < 0.01) ci++
    if (debtors[di].amount < 0.01) di++
  }

  return simplified
}

/* ── Main component ── */

export default function Level48({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [members] = useState(defaultMembers)
  const [expenses, setExpenses] = useState(sampleExpenses)
  const [nextId, setNextId] = useState(5)

  // Add expense form
  const [newDesc, setNewDesc] = useState('')
  const [newAmount, setNewAmount] = useState('')
  const [newPaidBy, setNewPaidBy] = useState('Alice')
  const [newSplitType, setNewSplitType] = useState('equal')
  const [customSplits, setCustomSplits] = useState({})

  // Debt graph state
  const [showSimplified, setShowSimplified] = useState(false)
  const [animatingSimplify, setAnimatingSimplify] = useState(false)

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const balances = computeBalances(expenses, members)
  const rawDebts = computeDebts(expenses, members)
  const simplifiedDebts = simplifyDebts(expenses, members)

  const handleAddExpense = () => {
    const amount = parseFloat(newAmount)
    if (!newDesc.trim() || isNaN(amount) || amount <= 0) return

    let splits = {}
    if (newSplitType === 'equal') {
      const share = amount / members.length
      members.forEach(m => { splits[m] = Math.round(share * 100) / 100 })
    } else if (newSplitType === 'exact') {
      const total = Object.values(customSplits).reduce((s, v) => s + (parseFloat(v) || 0), 0)
      if (Math.abs(total - amount) > 0.01) return
      members.forEach(m => { splits[m] = parseFloat(customSplits[m]) || 0 })
    } else if (newSplitType === 'percentage') {
      const totalPct = Object.values(customSplits).reduce((s, v) => s + (parseFloat(v) || 0), 0)
      if (Math.abs(totalPct - 100) > 0.01) return
      members.forEach(m => {
        splits[m] = Math.round((amount * (parseFloat(customSplits[m]) || 0)) / 100 * 100) / 100
      })
    }

    setExpenses(prev => [...prev, {
      id: nextId,
      description: newDesc.trim(),
      amount,
      paidBy: newPaidBy,
      splitType: newSplitType,
      splits,
    }])
    setNextId(n => n + 1)
    setNewDesc('')
    setNewAmount('')
    setCustomSplits({})
    setShowSimplified(false)
  }

  const handleSimplify = () => {
    setAnimatingSimplify(true)
    setTimeout(() => {
      setShowSimplified(true)
      setAnimatingSimplify(false)
    }, 800)
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    if (onComplete) onComplete()
  }

  const getColor = (name) => memberColors[name] || { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/40', ring: 'ring-gray-500/20' }

  const sections = [
    { label: 'Story', icon: DollarSign },
    { label: 'Expenses', icon: Calculator },
    { label: 'Debt Graph', icon: Users },
    { label: 'Balances', icon: Wallet },
    { label: 'Quiz', icon: CheckCircle },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Level header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-quest-muted">LEVEL 48</span>
          {isCompleted && <CheckCircle size={16} className="text-quest-success" />}
        </div>
        <h1 className="text-3xl font-bold mb-2">Split the Bill</h1>
        <p className="text-quest-muted">Design Splitwise — Low-Level Design Interview Problem</p>
      </motion.div>

      {/* Section nav */}
      <div className="flex gap-2 flex-wrap">
        {sections.map((sec, i) => {
          const Icon = sec.icon
          return (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${currentSection === i
                  ? 'bg-quest-primary/20 text-quest-primary border border-quest-primary/30'
                  : 'bg-quest-surface border border-white/10 text-quest-muted hover:border-white/20'}`}
            >
              <Icon size={14} />
              {sec.label}
            </button>
          )
        })}
      </div>

      {/* ═══════════════════ SECTION 0: STORY ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="text-green-400" />
              The Problem: Shared Expenses
            </h2>

            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <p className="text-lg italic text-quest-muted leading-relaxed mb-4">
                "Friends share expenses. A owes B, B owes C, C owes A. Simplify the debts."
              </p>
              <p className="text-sm text-quest-muted">
                Apps like Splitwise solve a deceptively complex problem: tracking shared expenses among
                groups and computing the minimum set of transactions to settle all debts. Behind the
                simple UI lies a{' '}
                <Term
                  word="Directed Weighted Graph"
                  definition="A graph where edges have both direction and weight. In Splitwise, nodes are people, directed edges represent 'who owes whom', and the weight is the amount owed."
                  onLearn={learnTerm}
                />{' '}
                and a{' '}
                <Term
                  word="Debt Simplification Algorithm"
                  definition="An algorithm that reduces the number of transactions needed to settle all debts. Instead of everyone paying everyone, compute net balances and match creditors with debtors greedily."
                  onLearn={learnTerm}
                />.
              </p>
            </div>

            {/* Key concepts grid */}
            <h3 className="font-semibold mb-3">Core Concepts</h3>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {[
                {
                  title: 'Graph Algorithms',
                  desc: 'Model debts as a directed weighted graph. Edges represent money owed between people. Simplification reduces edge count.',
                  color: 'text-sky-400',
                  bg: 'bg-sky-500/10',
                  border: 'border-sky-500/20',
                },
                {
                  title: 'Debt Simplification',
                  desc: 'Compute net balance for each person, then match positive (creditor) and negative (debtor) balances to minimize transactions.',
                  color: 'text-green-400',
                  bg: 'bg-green-500/10',
                  border: 'border-green-500/20',
                },
                {
                  title: 'Group Management',
                  desc: 'Users form groups, add members, and track shared expenses. Each group maintains its own expense ledger.',
                  color: 'text-purple-400',
                  bg: 'bg-purple-500/10',
                  border: 'border-purple-500/20',
                },
                {
                  title: 'Transaction History',
                  desc: 'Every expense and settlement is logged immutably. Audit trail ensures trust and accountability.',
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/10',
                  border: 'border-amber-500/20',
                },
              ].map((concept) => (
                <div key={concept.title} className={`${concept.bg} rounded-xl p-4 border ${concept.border}`}>
                  <h4 className={`text-sm font-semibold ${concept.color} mb-1`}>{concept.title}</h4>
                  <p className="text-xs text-quest-muted leading-relaxed">{concept.desc}</p>
                </div>
              ))}
            </div>

            {/* Class diagram */}
            <h3 className="font-semibold mb-3">Class Design Overview</h3>
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  {
                    name: 'User',
                    fields: ['id: String', 'name: String', 'email: String', 'balances: Map<userId, double>'],
                    methods: ['getNetBalance()', 'getOwedAmount(userId)'],
                    color: 'border-sky-500/30',
                  },
                  {
                    name: 'Expense',
                    fields: ['id: String', 'description: String', 'amount: double', 'paidBy: User', 'splitType: SplitType', 'splits: Map<User, double>'],
                    methods: ['validate()', 'getSplitForUser(user)'],
                    color: 'border-green-500/30',
                  },
                  {
                    name: 'Group',
                    fields: ['id: String', 'name: String', 'members: List<User>', 'expenses: List<Expense>'],
                    methods: ['addExpense()', 'getBalances()', 'simplifyDebts()'],
                    color: 'border-purple-500/30',
                  },
                ].map((cls) => (
                  <div key={cls.name} className={`bg-quest-surface rounded-lg p-3 border ${cls.color}`}>
                    <p className="text-xs font-bold text-quest-text mb-2 font-mono">{cls.name}</p>
                    <div className="mb-2">
                      {cls.fields.map(f => (
                        <p key={f} className="text-[10px] text-quest-muted font-mono leading-relaxed">- {f}</p>
                      ))}
                    </div>
                    <div className="border-t border-white/5 pt-1">
                      {cls.methods.map(m => (
                        <p key={m} className="text-[10px] text-green-400/70 font-mono leading-relaxed">+ {m}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional classes */}
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="bg-quest-surface rounded-lg p-3 border border-amber-500/30">
                  <p className="text-xs font-bold text-quest-text mb-2 font-mono">SplitStrategy (Interface)</p>
                  <p className="text-[10px] text-quest-muted font-mono">+ computeSplits(amount, members): Map</p>
                  <div className="mt-1 flex gap-2 flex-wrap">
                    {['EqualSplit', 'ExactSplit', 'PercentageSplit'].map(s => (
                      <span key={s} className="text-[9px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded font-mono">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-quest-surface rounded-lg p-3 border border-red-500/30">
                  <p className="text-xs font-bold text-quest-text mb-2 font-mono">DebtSimplifier</p>
                  <p className="text-[10px] text-quest-muted font-mono">- balanceMap: Map&lt;User, double&gt;</p>
                  <p className="text-[10px] text-green-400/70 font-mono">+ simplify(debts): List&lt;Transaction&gt;</p>
                  <p className="text-[10px] text-green-400/70 font-mono">+ computeNetBalances(): Map</p>
                </div>
              </div>
            </div>

            <DeepDive id="splitwise-architecture" title="Splitwise System Architecture" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Design Patterns:</strong> The Strategy pattern is used
                  for different split types (EqualSplit, ExactSplit, PercentageSplit). The Observer pattern
                  notifies members when a new expense is added. The Repository pattern abstracts data access.
                </p>
                <p>
                  <strong className="text-quest-text">Database Schema:</strong> Key tables include users, groups,
                  group_members (many-to-many), expenses, expense_splits, and settlements. The expense_splits
                  table stores per-user shares for each expense.
                </p>
                <p>
                  <strong className="text-quest-text">Concurrency:</strong> When two users add expenses
                  simultaneously, balance computation must be atomic. Use optimistic locking or
                  serializable transactions to prevent inconsistent state.
                </p>
                <p>
                  <strong className="text-quest-text">Scale Considerations:</strong> Splitwise handles
                  millions of users but relatively low write throughput (humans add expenses slowly).
                  Read-heavy workload benefits from caching net balances per group.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Add Expenses
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: EXPENSES ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Calculator className="text-sky-400" />
              Expense Tracker
            </h2>

            <p className="text-quest-muted mb-6">
              Add expenses to the group. Choose how to{' '}
              <Term
                word="Split"
                definition="Dividing an expense among group members. Can be equal (everyone pays the same), exact (specify amounts), or percentage-based."
                onLearn={learnTerm}
              />{' '}
              the cost: equally, by exact amounts, or by percentage. The system tracks who paid
              and computes each member's share.
            </p>

            {/* Add expense form */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h3 className="text-sm font-semibold mb-4">Add New Expense</h3>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs text-quest-muted mb-1 block">Description</label>
                  <input
                    type="text"
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="e.g., Pizza night"
                    className="w-full bg-quest-surface border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-quest-primary/50"
                  />
                </div>
                <div>
                  <label className="text-xs text-quest-muted mb-1 block">Amount ($)</label>
                  <input
                    type="number"
                    value={newAmount}
                    onChange={e => setNewAmount(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full bg-quest-surface border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-quest-primary/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs text-quest-muted mb-1 block">Paid by</label>
                  <select
                    value={newPaidBy}
                    onChange={e => setNewPaidBy(e.target.value)}
                    className="w-full bg-quest-surface border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-quest-primary/50"
                  >
                    {members.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-quest-muted mb-1 block">Split type</label>
                  <div className="flex gap-2">
                    {splitTypes.map(st => (
                      <button
                        key={st.id}
                        onClick={() => { setNewSplitType(st.id); setCustomSplits({}) }}
                        className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all border
                          ${newSplitType === st.id
                            ? 'bg-quest-primary/20 border-quest-primary/40 text-quest-primary'
                            : 'bg-quest-surface border-white/10 text-quest-muted hover:border-white/20'}`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Custom split inputs */}
              {newSplitType !== 'equal' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4"
                >
                  <label className="text-xs text-quest-muted mb-2 block">
                    {newSplitType === 'exact' ? 'Amount per person (must total to expense amount)' : 'Percentage per person (must total 100%)'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {members.map(m => (
                      <div key={m} className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${getColor(m).text}`}>{m}</span>
                        <input
                          type="number"
                          value={customSplits[m] || ''}
                          onChange={e => setCustomSplits(prev => ({ ...prev, [m]: e.target.value }))}
                          placeholder={newSplitType === 'exact' ? '0.00' : '25'}
                          className="flex-1 bg-quest-surface border border-white/10 rounded px-2 py-1 text-xs focus:outline-none focus:border-quest-primary/50"
                        />
                        {newSplitType === 'percentage' && <span className="text-xs text-quest-muted">%</span>}
                      </div>
                    ))}
                  </div>
                  {newSplitType === 'exact' && (
                    <p className="text-[10px] text-quest-muted mt-1">
                      Total: ${Object.values(customSplits).reduce((s, v) => s + (parseFloat(v) || 0), 0).toFixed(2)}
                      {newAmount && ` / $${parseFloat(newAmount).toFixed(2)}`}
                    </p>
                  )}
                  {newSplitType === 'percentage' && (
                    <p className="text-[10px] text-quest-muted mt-1">
                      Total: {Object.values(customSplits).reduce((s, v) => s + (parseFloat(v) || 0), 0).toFixed(1)}%
                    </p>
                  )}
                </motion.div>
              )}

              <button
                onClick={handleAddExpense}
                className="btn-primary text-sm"
              >
                Add Expense
              </button>
            </div>

            {/* Expense list */}
            <h3 className="text-sm font-semibold mb-3">Expense History ({expenses.length})</h3>
            <div className="space-y-2 mb-6">
              {expenses.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-quest-bg rounded-lg p-4 border border-white/5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${getColor(exp.paidBy).bg} flex items-center justify-center`}>
                      <DollarSign size={14} className={getColor(exp.paidBy).text} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{exp.description}</p>
                      <p className="text-xs text-quest-muted">
                        Paid by <span className={getColor(exp.paidBy).text}>{exp.paidBy}</span>
                        {' '}&middot; {exp.splitType} split
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-green-400">${exp.amount.toFixed(2)}</p>
                    <p className="text-[10px] text-quest-muted">{Object.keys(exp.splits).length} people</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <DeepDive id="split-strategies" title="Split Strategy Pattern (Design Pattern)" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Strategy Pattern:</strong> Each split type implements a
                  common interface <code className="text-xs font-mono">SplitStrategy.computeSplits(amount, members)</code>.
                  This makes it trivial to add new split types (by shares, by weight, etc.) without modifying
                  existing code. Open/Closed Principle in action.
                </p>
                <p>
                  <strong className="text-quest-text">Validation:</strong> Each strategy validates differently.
                  EqualSplit always works. ExactSplit checks that amounts sum to total. PercentageSplit checks
                  that percentages sum to 100. Validation should happen at the strategy level, not the caller.
                </p>
                <pre className="bg-quest-bg rounded-lg p-3 text-[11px] font-mono overflow-x-auto">
{`interface SplitStrategy {
  validate(amount, splits): boolean
  computeSplits(amount, members): Map<User, double>
}

class EqualSplit implements SplitStrategy {
  computeSplits(amount, members) {
    const share = amount / members.length
    return members.map(m => [m, share])
  }
}`}
                </pre>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                View Debt Graph
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: DEBT GRAPH ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="text-purple-400" />
              Debt Graph &amp; Simplification
            </h2>

            <p className="text-quest-muted mb-6">
              Debts form a{' '}
              <Term
                word="Directed Weighted Graph"
                definition="A graph where edges have both direction and weight. In Splitwise, nodes are people, directed edges represent 'who owes whom', and the weight is the amount owed."
                onLearn={learnTerm}
              />. Each arrow shows who owes whom and how much. The{' '}
              <Term
                word="Debt Simplification"
                definition="Reducing the number of transactions by computing net balances. Instead of 6 separate payments, you might need only 2. The algorithm computes net balance per person, then greedily matches creditors and debtors."
                onLearn={learnTerm}
              />{' '}
              algorithm reduces the number of transactions dramatically.
            </p>

            {/* Graph visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">
                  {showSimplified ? 'Simplified Debts' : 'Raw Debts'} ({showSimplified ? simplifiedDebts.length : rawDebts.length} transactions)
                </h3>
                <button
                  onClick={showSimplified ? () => setShowSimplified(false) : handleSimplify}
                  disabled={animatingSimplify}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border
                    ${showSimplified
                      ? 'bg-quest-surface border-white/10 text-quest-muted hover:border-white/20'
                      : 'bg-green-500/20 border-green-500/40 text-green-400 hover:bg-green-500/30'}
                    disabled:opacity-50`}
                >
                  {animatingSimplify ? 'Simplifying...' : showSimplified ? 'Show Raw Debts' : 'Simplify Debts'}
                </button>
              </div>

              {/* Visual graph area */}
              <div className="relative w-full aspect-square max-w-md mx-auto mb-4">
                {/* Member nodes */}
                {members.map((m) => {
                  const pos = memberPositions[m]
                  const col = getColor(m)
                  return (
                    <motion.div
                      key={m}
                      className={`absolute w-16 h-16 rounded-full ${col.bg} border-2 ${col.border} flex items-center justify-center`}
                      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                      animate={animatingSimplify ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <span className={`text-xs font-bold ${col.text}`}>{m.charAt(0)}</span>
                    </motion.div>
                  )
                })}

                {/* Debt arrows (SVG) */}
                <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
                  <defs>
                    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
                    </marker>
                    <marker id="arrowhead-green" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <polygon points="0 0, 8 3, 0 6" fill="#4ade80" />
                    </marker>
                  </defs>

                  <AnimatePresence mode="wait">
                    {(showSimplified ? simplifiedDebts : rawDebts).map((debt, i) => {
                      const fromPos = memberPositions[debt.from]
                      const toPos = memberPositions[debt.to]
                      if (!fromPos || !toPos) return null

                      const x1 = fromPos.x
                      const y1 = fromPos.y
                      const x2 = toPos.x
                      const y2 = toPos.y
                      const mx = (x1 + x2) / 2
                      const my = (y1 + y2) / 2

                      // Offset the midpoint slightly for label readability
                      const dx = x2 - x1
                      const dy = y2 - y1
                      const len = Math.sqrt(dx * dx + dy * dy) || 1
                      const offsetX = (-dy / len) * 4
                      const offsetY = (dx / len) * 4

                      return (
                        <motion.g
                          key={`${debt.from}-${debt.to}-${showSimplified ? 's' : 'r'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <line
                            x1={`${x1}%`}
                            y1={`${y1}%`}
                            x2={`${x2}%`}
                            y2={`${y2}%`}
                            stroke={showSimplified ? '#4ade80' : '#94a3b8'}
                            strokeWidth={showSimplified ? 2 : 1}
                            strokeDasharray={showSimplified ? 'none' : '4 2'}
                            markerEnd={showSimplified ? 'url(#arrowhead-green)' : 'url(#arrowhead)'}
                            opacity={0.6}
                          />
                          <rect
                            x={`${mx + offsetX - 5}%`}
                            y={`${my + offsetY - 2.5}%`}
                            width="10%"
                            height="5%"
                            rx="4"
                            fill={showSimplified ? 'rgba(34, 197, 94, 0.15)' : 'rgba(30, 30, 46, 0.9)'}
                            stroke={showSimplified ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255,255,255,0.1)'}
                            strokeWidth="1"
                          />
                          <text
                            x={`${mx + offsetX}%`}
                            y={`${my + offsetY}%`}
                            textAnchor="middle"
                            dominantBaseline="central"
                            fill={showSimplified ? '#4ade80' : '#cbd5e1'}
                            fontSize="10"
                            fontWeight="bold"
                          >
                            ${debt.amount.toFixed(0)}
                          </text>
                        </motion.g>
                      )
                    })}
                  </AnimatePresence>
                </svg>

                {/* Member labels */}
                {members.map(m => {
                  const pos = memberPositions[m]
                  const col = getColor(m)
                  return (
                    <div
                      key={`label-${m}`}
                      className="absolute text-center"
                      style={{ left: `${pos.x}%`, top: `${pos.y + 12}%`, transform: 'translateX(-50%)' }}
                    >
                      <span className={`text-xs font-medium ${col.text}`}>{m}</span>
                    </div>
                  )
                })}
              </div>

              {/* Debt list */}
              <div className="space-y-1.5">
                {(showSimplified ? simplifiedDebts : rawDebts).map((debt, i) => (
                  <motion.div
                    key={`${debt.from}-${debt.to}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs
                      ${showSimplified ? 'bg-green-500/5 border border-green-500/10' : 'bg-quest-surface border border-white/5'}`}
                  >
                    <span className={getColor(debt.from).text}>{debt.from}</span>
                    <ArrowRight size={12} className={showSimplified ? 'text-green-400' : 'text-quest-muted'} />
                    <span className={getColor(debt.to).text}>{debt.to}</span>
                    <span className="ml-auto font-bold">${debt.amount.toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>

              {/* Comparison stats */}
              {showSimplified && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-500/10 border border-green-500/20 rounded-lg p-4"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-red-400">{rawDebts.length}</p>
                      <p className="text-[10px] text-quest-muted">Raw transactions</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-quest-muted">-&gt;</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-400">{simplifiedDebts.length}</p>
                      <p className="text-[10px] text-quest-muted">Simplified</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-400 text-center mt-2">
                    Reduced by {rawDebts.length - simplifiedDebts.length} transaction{rawDebts.length - simplifiedDebts.length !== 1 ? 's' : ''}
                    ({rawDebts.length > 0 ? Math.round((1 - simplifiedDebts.length / rawDebts.length) * 100) : 0}% fewer)
                  </p>
                </motion.div>
              )}
            </div>

            {/* Algorithm explanation */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Simplification Algorithm</h4>
              <div className="space-y-3">
                {[
                  { step: 1, title: 'Compute Net Balances', desc: 'For each person, sum what they paid minus what they owe. Positive = creditor, negative = debtor.' },
                  { step: 2, title: 'Separate Creditors & Debtors', desc: 'Group people into those who are owed money (positive balance) and those who owe money (negative balance).' },
                  { step: 3, title: 'Greedy Matching', desc: 'Sort both lists by amount. Match the largest debtor with the largest creditor. Transfer the minimum of the two amounts.' },
                  { step: 4, title: 'Repeat', desc: 'Continue until all balances are zero. This produces at most N-1 transactions for N people.' },
                ].map(item => (
                  <div key={item.step} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-quest-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-quest-primary">{item.step}</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-quest-text">{item.title}</p>
                      <p className="text-[11px] text-quest-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DeepDive id="graph-theory" title="Graph Theory Behind Debt Simplification" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">NP-Hard in General:</strong> Finding the minimum number of
                  transactions to settle all debts is actually NP-hard (it reduces to a set partition problem).
                  The greedy algorithm gives at most N-1 transactions, which is optimal for most practical cases
                  but not always the absolute minimum.
                </p>
                <p>
                  <strong className="text-quest-text">Cycle Elimination:</strong> If A owes B $10, B owes C $10,
                  and C owes A $10, there is a cycle with equal weights. These debts cancel out completely.
                  Detecting and removing cycles in the debt graph is one approach to simplification.
                </p>
                <p>
                  <strong className="text-quest-text">Net Balance Approach:</strong> The most practical approach
                  ignores individual edges entirely. It computes each person's net balance (total paid minus
                  total share owed) and only looks at who has positive vs negative balance. This discards
                  the graph structure but gives an efficient O(N log N) solution.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                View Balances
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: BALANCES ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Wallet className="text-amber-400" />
              Balance Sheet &amp; Group Management
            </h2>

            <p className="text-quest-muted mb-6">
              The{' '}
              <Term
                word="Net Balance"
                definition="The overall financial position of a person in the group. Positive means they are owed money (creditor). Negative means they owe money (debtor). Zero means they are settled."
                onLearn={learnTerm}
              />{' '}
              of each member reflects their overall position. Positive means they are owed money,
              negative means they owe. The group view aggregates all expenses into a clear picture.
            </p>

            {/* Balance cards */}
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {members.map((m, i) => {
                const bal = Math.round(balances[m] * 100) / 100
                const col = getColor(m)
                const isPositive = bal > 0
                const isZero = Math.abs(bal) < 0.01
                return (
                  <motion.div
                    key={m}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-quest-bg rounded-xl p-5 border ${col.border}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full ${col.bg} flex items-center justify-center`}>
                          <span className={`text-sm font-bold ${col.text}`}>{m.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold">{m}</p>
                          <p className="text-[10px] text-quest-muted">
                            {expenses.filter(e => e.paidBy === m).length} expenses paid
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${isZero ? 'text-quest-muted' : isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {isZero ? '$0.00' : `${isPositive ? '+' : '-'}$${Math.abs(bal).toFixed(2)}`}
                        </p>
                        <p className={`text-[10px] ${isZero ? 'text-quest-muted' : isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {isZero ? 'Settled up' : isPositive ? 'gets back' : 'owes'}
                        </p>
                      </div>
                    </div>

                    {/* Balance bar */}
                    <div className="w-full h-2 bg-quest-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(Math.abs(bal) / 60 * 100, 100)}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                        className={`h-full rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                      />
                    </div>

                    {/* Per-expense breakdown */}
                    <div className="mt-3 space-y-1">
                      {expenses.map(exp => {
                        const paid = exp.paidBy === m ? exp.amount : 0
                        const share = exp.splits[m] || 0
                        const net = paid - share
                        if (Math.abs(net) < 0.01) return null
                        return (
                          <div key={exp.id} className="flex items-center justify-between text-[10px]">
                            <span className="text-quest-muted truncate mr-2">{exp.description}</span>
                            <span className={net > 0 ? 'text-green-400' : 'text-red-400'}>
                              {net > 0 ? '+' : ''}{net.toFixed(2)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Summary stats */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Group Summary</h4>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-quest-text">
                    ${expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-quest-muted">Total spent</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-quest-text">{expenses.length}</p>
                  <p className="text-[10px] text-quest-muted">Expenses</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-red-400">{rawDebts.length}</p>
                  <p className="text-[10px] text-quest-muted">Raw debts</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-400">{simplifiedDebts.length}</p>
                  <p className="text-[10px] text-quest-muted">After simplification</p>
                </div>
              </div>
            </div>

            {/* Settlement plan */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-green-500/20">
              <h4 className="text-sm font-semibold mb-3 text-green-400">Optimal Settlement Plan</h4>
              <p className="text-xs text-quest-muted mb-4">
                These are the minimum transactions needed to settle all debts:
              </p>
              {simplifiedDebts.length === 0 ? (
                <p className="text-sm text-quest-muted text-center py-4">All settled up! No payments needed.</p>
              ) : (
                <div className="space-y-2">
                  {simplifiedDebts.map((debt, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 bg-quest-surface rounded-lg p-3"
                    >
                      <div className={`w-8 h-8 rounded-full ${getColor(debt.from).bg} flex items-center justify-center`}>
                        <span className={`text-xs font-bold ${getColor(debt.from).text}`}>{debt.from.charAt(0)}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-1">
                        <span className={`text-xs font-medium ${getColor(debt.from).text}`}>{debt.from}</span>
                        <div className="flex-1 border-t border-dashed border-green-500/30 relative">
                          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-quest-surface px-2 text-xs font-bold text-green-400">
                            ${debt.amount.toFixed(2)}
                          </span>
                        </div>
                        <span className={`text-xs font-medium ${getColor(debt.to).text}`}>{debt.to}</span>
                      </div>
                      <div className={`w-8 h-8 rounded-full ${getColor(debt.to).bg} flex items-center justify-center`}>
                        <span className={`text-xs font-bold ${getColor(debt.to).text}`}>{debt.to.charAt(0)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Group management info */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-3">Group Management Features</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { title: 'Create Groups', desc: 'Trip, roommates, couple, or custom groups. Each group is an isolated expense ledger.', icon: Users },
                  { title: 'Add/Remove Members', desc: 'Invite via email or link. Removing a member requires settling their balance first.', icon: Users },
                  { title: 'Activity Feed', desc: 'Chronological log of all expenses, settlements, and member changes. Immutable audit trail.', icon: Calculator },
                  { title: 'Settle Up', desc: 'Record a payment between two members. Reduces the debt edge weight in the graph.', icon: Wallet },
                ].map(feature => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.title} className="bg-quest-bg rounded-lg p-3 border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon size={14} className="text-quest-primary" />
                        <p className="text-xs font-semibold">{feature.title}</p>
                      </div>
                      <p className="text-[11px] text-quest-muted">{feature.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <DeepDive id="partial-payments" title="Handling Partial Payments & Edge Cases" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Partial Payments:</strong> When someone pays only part of
                  what they owe, the debt edge weight is reduced by the payment amount. The simplification
                  algorithm must be re-run after each payment to recompute optimal settlements.
                </p>
                <p>
                  <strong className="text-quest-text">Currency Handling:</strong> Use integers (cents) internally
                  to avoid floating-point rounding errors. Display as dollars only in the UI. The penny
                  discrepancy from uneven splits goes to the person who paid.
                </p>
                <p>
                  <strong className="text-quest-text">Deleted Expenses:</strong> Soft-delete expenses instead of
                  hard-deleting. Mark them as deleted and exclude from balance computation. This preserves
                  the audit trail and allows undo functionality.
                </p>
                <p>
                  <strong className="text-quest-text">Concurrent Modifications:</strong> Two users adding expenses
                  at the same time can cause race conditions. Use optimistic concurrency control: each expense
                  includes a group version number. If the version has changed, reject and retry.
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-sky-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Splitwise combines graph algorithms, clean class design, and practical financial logic.
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
                <h3 className="text-xl font-bold mb-2">Level 48 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand how to design Splitwise: debt graphs, simplification algorithms,
                  split strategies, and group management. Every shared dinner just became a graph problem!
                </p>
                <p className="text-sm text-green-400">
                  The bill has been split. The debts are simplified. Friendships are preserved.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

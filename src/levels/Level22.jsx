import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp,
  Search, Database, Zap, FileText, Hash, Layers, BarChart3,
  Clock, Filter, BookOpen, AlertTriangle, Server, Split,
  Type, ArrowDownUp, Target, Cpu
} from 'lucide-react'

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

/* ── Sample product documents for the inverted index demo ── */
const sampleDocuments = [
  { id: 1, title: 'Wireless Bluetooth Headphones', description: 'Premium noise cancelling wireless headphones with deep bass', tags: ['electronics', 'audio', 'wireless'] },
  { id: 2, title: 'Bluetooth Speaker Portable', description: 'Waterproof portable bluetooth speaker with 20 hour battery', tags: ['electronics', 'audio', 'portable'] },
  { id: 3, title: 'Wireless Mouse Ergonomic', description: 'Ergonomic wireless mouse with silent clicks and long battery life', tags: ['electronics', 'computer', 'wireless'] },
  { id: 4, title: 'Noise Cancelling Earbuds', description: 'True wireless earbuds with active noise cancelling and premium sound', tags: ['electronics', 'audio', 'wireless'] },
  { id: 5, title: 'USB-C Charging Cable', description: 'Fast charging USB-C cable compatible with all devices', tags: ['electronics', 'accessories', 'charging'] },
  { id: 6, title: 'Portable Power Bank', description: 'High capacity portable power bank with wireless charging support', tags: ['electronics', 'portable', 'charging'] },
]

/* ── Analyzer pipeline steps ── */
const analyzerSteps = [
  { name: 'Character Filter', icon: Filter, desc: 'Strip HTML tags, convert special characters', example: '"<b>Wi-Fi</b> Ready!" → "Wi-Fi Ready!"' },
  { name: 'Tokenizer', icon: Split, desc: 'Split text into individual tokens (words)', example: '"Wi-Fi Ready!" → ["Wi-Fi", "Ready!"]' },
  { name: 'Lowercase Filter', icon: Type, desc: 'Convert all tokens to lowercase', example: '["Wi-Fi", "Ready!"] → ["wi-fi", "ready!"]' },
  { name: 'Stop Words', icon: Filter, desc: 'Remove common words (the, is, a, with)', example: '["the", "quick", "fox"] → ["quick", "fox"]' },
  { name: 'Stemming', icon: Target, desc: 'Reduce words to root form', example: '["running", "wireless"] → ["run", "wireless"]' },
]

/* ── Shard distribution visualization data ── */
const shardConfig = [
  { name: 'Node 1', shards: ['P0', 'R1', 'R2'], color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { name: 'Node 2', shards: ['P1', 'R0', 'R2'], color: 'text-green-400', bg: 'bg-green-500/20' },
  { name: 'Node 3', shards: ['P2', 'R0', 'R1'], color: 'text-purple-400', bg: 'bg-purple-500/20' },
]

/* ── Search comparison data ── */
const searchComparison = [
  {
    method: 'SQL LIKE',
    query: "SELECT * FROM products WHERE title LIKE '%wireless%'",
    time: '1200ms',
    timeNum: 1200,
    features: ['No relevance ranking', 'Full table scan', 'Exact substring match', 'No typo tolerance'],
    color: 'text-red-400',
    bg: 'bg-red-500/20',
  },
  {
    method: 'SQL Full-Text',
    query: "SELECT * FROM products WHERE MATCH(title) AGAINST('wireless')",
    time: '180ms',
    timeNum: 180,
    features: ['Basic relevance', 'Uses full-text index', 'Limited analyzers', 'No fuzzy matching'],
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
  },
  {
    method: 'Elasticsearch',
    query: '{ "query": { "multi_match": { "query": "wireless", "fields": ["title^3", "description"] } } }',
    time: '12ms',
    timeNum: 12,
    features: ['TF-IDF / BM25 scoring', 'Distributed index', 'Fuzzy matching', 'Custom analyzers'],
    color: 'text-green-400',
    bg: 'bg-green-500/20',
  },
]

/* ── Aggregation types ── */
const aggregationTypes = [
  { name: 'Terms Aggregation', desc: 'Group by category, count per bucket', example: '{ "aggs": { "by_tag": { "terms": { "field": "tags" } } } }', icon: Hash },
  { name: 'Range Aggregation', desc: 'Bucket by price ranges', example: '{ "aggs": { "price_ranges": { "range": { "field": "price", "ranges": [{"to": 50}, {"from": 50}] } } } }', icon: BarChart3 },
  { name: 'Avg Aggregation', desc: 'Calculate average price per category', example: '{ "aggs": { "avg_price": { "avg": { "field": "price" } } } }', icon: ArrowDownUp },
  { name: 'Date Histogram', desc: 'Orders per day/week/month', example: '{ "aggs": { "over_time": { "date_histogram": { "field": "created_at", "interval": "month" } } } }', icon: Clock },
]

export default function Level22({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* Inverted index builder state */
  const [indexedDocs, setIndexedDocs] = useState([])
  const [invertedIndex, setInvertedIndex] = useState({})
  const [indexingDoc, setIndexingDoc] = useState(null)
  const [tokenizing, setTokenizing] = useState(false)
  const [currentTokens, setCurrentTokens] = useState([])

  /* Search simulation state */
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [matchedTokens, setMatchedTokens] = useState([])
  const [showScoring, setShowScoring] = useState(false)

  /* Analyzer pipeline state */
  const [analyzerInput, setAnalyzerInput] = useState('The <em>Quick</em> Brown Foxes are Running!')
  const [activeAnalyzerStep, setActiveAnalyzerStep] = useState(-1)
  const [analyzerRunning, setAnalyzerRunning] = useState(false)
  const [analyzerOutputs, setAnalyzerOutputs] = useState([])

  /* Performance comparison state */
  const [runningComparison, setRunningComparison] = useState(false)
  const [comparisonResults, setComparisonResults] = useState([])
  const [comparisonQuery, setComparisonQuery] = useState('wireless headphones')

  /* Shard visualization state */
  const [activeShardQuery, setActiveShardQuery] = useState(null)
  const [shardQueryStep, setShardQueryStep] = useState(0)

  const sections = ['intro', 'index', 'analyzers', 'sharding', 'quiz']

  /* ── Build inverted index from a document ── */
  const tokenizeAndIndex = useCallback((doc) => {
    if (indexedDocs.includes(doc.id)) return
    setIndexingDoc(doc.id)
    setTokenizing(true)

    const text = `${doc.title} ${doc.description} ${doc.tags.join(' ')}`
    const tokens = text.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .split(/\s+/)
      .filter(t => !['the', 'a', 'an', 'is', 'are', 'with', 'and', 'or', 'of', 'in', 'to', 'for', 'all'].includes(t))

    setCurrentTokens(tokens)

    // Animate token indexing
    const uniqueTokens = [...new Set(tokens)]
    let i = 0
    const interval = setInterval(() => {
      if (i >= uniqueTokens.length) {
        clearInterval(interval)
        setTokenizing(false)
        setIndexingDoc(null)
        setIndexedDocs(prev => [...prev, doc.id])
        setCurrentTokens([])
        return
      }
      const token = uniqueTokens[i]
      const tf = tokens.filter(t => t === token).length
      setInvertedIndex(prev => {
        const existing = prev[token] || []
        if (existing.find(e => e.docId === doc.id)) return prev
        return {
          ...prev,
          [token]: [...existing, { docId: doc.id, tf, positions: tokens.reduce((acc, t, idx) => t === token ? [...acc, idx] : acc, []) }]
        }
      })
      i++
    }, 60)

    return () => clearInterval(interval)
  }, [indexedDocs])

  /* ── Index all documents at once ── */
  const indexAllDocuments = useCallback(() => {
    const unindexed = sampleDocuments.filter(d => !indexedDocs.includes(d.id))
    if (unindexed.length === 0) return

    const newIndex = { ...invertedIndex }
    const newIndexed = [...indexedDocs]

    unindexed.forEach(doc => {
      const text = `${doc.title} ${doc.description} ${doc.tags.join(' ')}`
      const tokens = text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .split(/\s+/)
        .filter(t => !['the', 'a', 'an', 'is', 'are', 'with', 'and', 'or', 'of', 'in', 'to', 'for', 'all'].includes(t))

      const uniqueTokens = [...new Set(tokens)]
      uniqueTokens.forEach(token => {
        const tf = tokens.filter(t => t === token).length
        const existing = newIndex[token] || []
        if (!existing.find(e => e.docId === doc.id)) {
          newIndex[token] = [...existing, { docId: doc.id, tf, positions: tokens.reduce((acc, t, idx) => t === token ? [...acc, idx] : acc, []) }]
        }
      })
      newIndexed.push(doc.id)
    })

    setInvertedIndex(newIndex)
    setIndexedDocs(newIndexed)
  }, [indexedDocs, invertedIndex])

  /* ── Search the inverted index ── */
  const executeSearch = useCallback(() => {
    if (!searchQuery.trim() || indexedDocs.length === 0) return
    setSearching(true)
    setShowScoring(false)

    const queryTokens = searchQuery.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .split(/\s+/)
      .filter(t => t.length > 0)

    setMatchedTokens(queryTokens.filter(t => invertedIndex[t]))

    // Calculate TF-IDF scores
    const totalDocs = indexedDocs.length
    const scores = {}

    queryTokens.forEach(token => {
      const postings = invertedIndex[token] || []
      const df = postings.length // document frequency
      if (df === 0) return

      const idf = Math.log(totalDocs / df) + 1 // inverse document frequency

      postings.forEach(posting => {
        const tf = posting.tf
        const tfidf = tf * idf
        scores[posting.docId] = (scores[posting.docId] || 0) + tfidf
      })
    })

    // Sort by score
    const results = Object.entries(scores)
      .map(([docId, score]) => ({
        doc: sampleDocuments.find(d => d.id === parseInt(docId)),
        score: Math.round(score * 100) / 100,
        matchedTerms: queryTokens.filter(t => {
          const postings = invertedIndex[t] || []
          return postings.some(p => p.docId === parseInt(docId))
        })
      }))
      .sort((a, b) => b.score - a.score)

    setTimeout(() => {
      setSearchResults(results)
      setSearching(false)
      setShowScoring(true)
    }, 400)
  }, [searchQuery, invertedIndex, indexedDocs])

  /* ── Run analyzer pipeline ── */
  const runAnalyzer = useCallback(() => {
    if (analyzerRunning) return
    setAnalyzerRunning(true)
    setActiveAnalyzerStep(-1)
    setAnalyzerOutputs([])

    let input = analyzerInput
    const outputs = []

    // Step 0: Character filter
    const step0 = input.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&')
    outputs.push(step0)

    // Step 1: Tokenize
    const step1 = step0.split(/[\s]+/).filter(t => t.length > 0)
    outputs.push(JSON.stringify(step1))

    // Step 2: Lowercase
    const step2 = step1.map(t => t.toLowerCase())
    outputs.push(JSON.stringify(step2))

    // Step 3: Stop words
    const stopWords = ['the', 'a', 'an', 'is', 'are', 'with', 'and', 'or', 'of', 'in', 'to', 'for']
    const step3 = step2.filter(t => !stopWords.includes(t.replace(/[^a-z]/g, '')))
    outputs.push(JSON.stringify(step3))

    // Step 4: Stemming (simplified)
    const step4 = step3.map(t => {
      let cleaned = t.replace(/[^a-z]/g, '')
      if (cleaned.endsWith('ing')) cleaned = cleaned.slice(0, -3)
      if (cleaned.endsWith('es')) cleaned = cleaned.slice(0, -2)
      if (cleaned.endsWith('s') && !cleaned.endsWith('ss')) cleaned = cleaned.slice(0, -1)
      return cleaned
    }).filter(t => t.length > 0)
    outputs.push(JSON.stringify(step4))

    let step = 0
    const interval = setInterval(() => {
      if (step >= 5) {
        clearInterval(interval)
        setAnalyzerRunning(false)
        return
      }
      setActiveAnalyzerStep(step)
      setAnalyzerOutputs(prev => [...prev, outputs[step]])
      step++
    }, 700)
  }, [analyzerInput, analyzerRunning])

  /* ── Run performance comparison ── */
  const runComparison = useCallback(() => {
    setRunningComparison(true)
    setComparisonResults([])

    let step = 0
    const interval = setInterval(() => {
      if (step >= searchComparison.length) {
        clearInterval(interval)
        setRunningComparison(false)
        return
      }
      setComparisonResults(prev => [...prev, searchComparison[step]])
      step++
    }, 800)
  }, [])

  /* ── Shard query animation ── */
  const animateShardQuery = useCallback(() => {
    setActiveShardQuery('search')
    setShardQueryStep(0)

    const steps = [
      'Coordinating node receives query',
      'Query broadcast to all shards (P0, P1, P2)',
      'Each shard searches its local inverted index',
      'Results from all shards merged and ranked',
      'Top-N results returned to client'
    ]

    let step = 0
    const interval = setInterval(() => {
      if (step >= steps.length) {
        clearInterval(interval)
        return
      }
      setShardQueryStep(step)
      step++
    }, 900)
  }, [])

  /* ── Quiz ── */
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is an inverted index?',
      options: [
        { id: 'a', text: 'A data structure that maps content (words/tokens) to the documents they appear in, enabling fast full-text search', correct: true },
        { id: 'b', text: 'A B-tree index that stores rows in reverse chronological order', correct: false },
        { id: 'c', text: 'A database table that stores documents upside-down for faster reads', correct: false },
        { id: 'd', text: 'A backup copy of the primary index stored on a different server', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'In TF-IDF scoring, what does a high IDF (Inverse Document Frequency) indicate about a term?',
      options: [
        { id: 'a', text: 'The term appears in every document, making it very important', correct: false },
        { id: 'b', text: 'The term is rare across documents, making it a more discriminating search signal', correct: true },
        { id: 'c', text: 'The term was recently added to the index', correct: false },
        { id: 'd', text: 'The term has been searched for many times', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'When should you choose Elasticsearch over a regular database query?',
      options: [
        { id: 'a', text: 'When you need ACID transactions for financial data', correct: false },
        { id: 'b', text: 'When you need to join data across many related tables', correct: false },
        { id: 'c', text: 'When you need fast full-text search with relevance ranking, fuzzy matching, and faceted navigation across millions of documents', correct: true },
        { id: 'd', text: 'When you need to store small amounts of structured data with simple lookups by primary key', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'What do analyzers do in Elasticsearch?',
      options: [
        { id: 'a', text: 'Monitor cluster health and report errors', correct: false },
        { id: 'b', text: 'Transform text into tokens through character filtering, tokenization, and token filtering (lowercasing, stemming, stop word removal) before indexing', correct: true },
        { id: 'c', text: 'Compress documents to save disk space', correct: false },
        { id: 'd', text: 'Encrypt sensitive fields in documents', correct: false },
      ],
    },
    {
      id: 'q5',
      question: 'How does sharding improve Elasticsearch search performance?',
      options: [
        { id: 'a', text: 'By storing a backup of every document on every node', correct: false },
        { id: 'b', text: 'By compressing the index to fit in memory', correct: false },
        { id: 'c', text: 'By splitting the index across multiple nodes so each shard searches a subset of data in parallel, then merging results', correct: true },
        { id: 'd', text: 'By caching all queries in a distributed cache layer', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const indexTokenCount = Object.keys(invertedIndex).length

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
                ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/25'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {section === 'intro' && 'Search Problem'}
            {section === 'index' && 'Inverted Index'}
            {section === 'analyzers' && 'Analyzers'}
            {section === 'sharding' && 'Sharding'}
            {section === 'quiz' && 'Quiz'}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION: INTRO ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Search className="text-amber-400" />
              Seek and You Shall Find
            </h2>
            <p className="text-quest-muted text-sm mb-6">
              Level 22 — Search Systems and Elasticsearch
            </p>

            {/* Story setup */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-amber-400 mb-2">The Problem</h3>
                  <p className="text-sm text-quest-muted leading-relaxed">
                    Your e-commerce platform has <strong className="text-quest-text">10 million products</strong>.
                    Users type "wireless noise cancelling headphones under $200" and expect results in under 100ms.
                    They misspell words. They use synonyms. They want results ranked by relevance, not just "found" or "not found."
                  </p>
                  <p className="text-sm text-quest-muted leading-relaxed mt-2">
                    A SQL <code className="text-xs font-mono bg-quest-surface px-1 py-0.5 rounded">LIKE '%wireless%'</code> query
                    does a full table scan. On 10 million rows, that takes <strong className="text-red-400">seconds</strong>.
                    You need a purpose-built search engine.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-quest-muted mb-6">
              Enter{' '}
              <Term
                word="Elasticsearch"
                definition="A distributed, open-source search and analytics engine built on Apache Lucene. It stores documents as JSON, indexes them using inverted indexes, and supports full-text search, structured queries, and analytics at massive scale."
                onLearn={learnTerm}
              />
              . It is a distributed search engine that uses an{' '}
              <Term
                word="Inverted Index"
                definition="A data structure that maps every unique term (word/token) to the list of documents containing that term, along with positions and frequency. Like a book's index at the back — instead of scanning every page, you look up a word and find exactly which pages mention it."
                onLearn={learnTerm}
              />{' '}
              to find documents in milliseconds, no matter how many you have. Instead of scanning every row,
              it looks up terms directly — like finding a word in a book by checking the index at the back,
              rather than reading every single page.
            </p>

            {/* Performance comparison interactive */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              Performance Showdown: Search 10M Products
            </h3>
            <p className="text-sm text-quest-muted mb-4">
              Click "Run Benchmark" to see how different search approaches compare on the same query.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={comparisonQuery}
                  onChange={(e) => setComparisonQuery(e.target.value)}
                  className="flex-1 bg-quest-surface border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500/50"
                  placeholder="Enter search query..."
                />
                <button
                  onClick={runComparison}
                  disabled={runningComparison}
                  className="btn-primary px-6 py-2 text-sm disabled:opacity-50"
                >
                  {runningComparison ? 'Running...' : 'Run Benchmark'}
                </button>
              </div>

              <div className="space-y-3">
                {searchComparison.map((method, idx) => {
                  const result = comparisonResults.find(r => r.method === method.method)
                  return (
                    <motion.div
                      key={method.method}
                      initial={false}
                      animate={result ? { opacity: 1 } : { opacity: 0.3 }}
                      className="bg-quest-surface rounded-lg p-4 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`text-sm font-semibold ${method.color}`}>{method.method}</h4>
                        {result && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`text-lg font-bold ${method.color}`}
                          >
                            {method.time}
                          </motion.span>
                        )}
                      </div>
                      <code className="text-[10px] text-quest-muted block font-mono mb-3 break-all leading-relaxed">
                        {method.query}
                      </code>
                      {result && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min((method.timeNum / 1200) * 100, 100)}%` }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className={`h-2 rounded-full ${method.bg}`}
                        />
                      )}
                      {result && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-wrap gap-2 mt-3"
                        >
                          {method.features.map((f, i) => (
                            <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-quest-bg text-quest-muted">
                              {f}
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* How Elasticsearch works overview */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-4">How Elasticsearch Works (High Level)</h4>
              <div className="grid md:grid-cols-4 gap-3">
                {[
                  { step: '1', title: 'Ingest', desc: 'Documents (JSON) are sent to ES via REST API', icon: FileText, color: 'text-blue-400' },
                  { step: '2', title: 'Analyze', desc: 'Text is tokenized, lowercased, stemmed by analyzers', icon: Filter, color: 'text-green-400' },
                  { step: '3', title: 'Index', desc: 'Tokens stored in an inverted index on the appropriate shard', icon: Database, color: 'text-purple-400' },
                  { step: '4', title: 'Search', desc: 'Queries hit all shards in parallel, results merged by score', icon: Search, color: 'text-amber-400' },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.step} className="bg-quest-bg rounded-lg p-4 text-center">
                      <div className={`w-10 h-10 rounded-full ${item.color.replace('text-', 'bg-').replace('400', '500/20')} flex items-center justify-center mx-auto mb-2`}>
                        <Icon size={18} className={item.color} />
                      </div>
                      <div className="text-xs font-bold text-quest-muted mb-1">Step {item.step}</div>
                      <div className="text-sm font-semibold mb-1">{item.title}</div>
                      <p className="text-[11px] text-quest-muted">{item.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <DeepDive id="es-vs-solr" title="Elasticsearch vs Solr vs Meilisearch" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Elasticsearch:</strong> The industry standard for large-scale search.
                  Used by Wikipedia, GitHub, Netflix, and Uber. Built on Apache Lucene. Excels at distributed search,
                  real-time analytics, and log aggregation (ELK stack). The ecosystem is massive.
                </p>
                <p>
                  <strong className="text-quest-text">Apache Solr:</strong> Also built on Lucene, predates Elasticsearch.
                  Strong for traditional search use cases. Has mature features like faceting and highlighting. Less popular
                  for new projects but battle-tested in enterprises. Configuration-heavy compared to ES.
                </p>
                <p>
                  <strong className="text-quest-text">Meilisearch:</strong> A newer, developer-friendly search engine
                  written in Rust. Incredibly fast for typo-tolerant, prefix search out of the box. Great for smaller
                  datasets (millions, not billions). Simpler to set up than ES but lacks its analytics and aggregation power.
                </p>
                <p>
                  <strong className="text-quest-text">Typesense:</strong> Another modern alternative, also written in C++.
                  Designed for instant search-as-you-type experiences. Very easy to self-host. Good for up to a few hundred
                  million documents. Like Meilisearch, it trades ES's flexibility for simplicity.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Build an Inverted Index
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION: INVERTED INDEX ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-blue-400" />
              The Inverted Index — Heart of Search
            </h2>

            <p className="text-quest-muted mb-6">
              An{' '}
              <Term
                word="Inverted Index"
                definition="Maps each unique term to the list of documents containing it, along with term frequency and positions. This is what makes search O(1) per term lookup instead of O(n) full scan. Think of it as a hashmap: term → [doc1, doc3, doc7]."
                onLearn={learnTerm}
              />{' '}
              is the core data structure behind every search engine. Instead of scanning every document
              to find matches, you look up a word and instantly get the list of documents containing it.
              Let us build one step by step.
            </p>

            {/* Document cards */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText size={18} className="text-blue-400" />
              Product Documents
            </h3>
            <p className="text-sm text-quest-muted mb-4">
              Click a document to tokenize and index it, or "Index All" to process everything at once.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
              {sampleDocuments.map(doc => {
                const isIndexed = indexedDocs.includes(doc.id)
                const isIndexing = indexingDoc === doc.id
                return (
                  <motion.button
                    key={doc.id}
                    onClick={() => !isIndexed && !tokenizing && tokenizeAndIndex(doc)}
                    disabled={isIndexed || tokenizing}
                    whileHover={!isIndexed ? { scale: 1.02 } : {}}
                    className={`text-left p-4 rounded-xl border transition-all
                      ${isIndexed
                        ? 'bg-green-500/10 border-green-500/30'
                        : isIndexing
                          ? 'bg-blue-500/10 border-blue-500/40 ring-1 ring-blue-500/20'
                          : 'bg-quest-bg border-white/5 hover:border-white/15'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-quest-muted">Doc #{doc.id}</span>
                      {isIndexed && <CheckCircle size={14} className="text-green-400" />}
                      {isIndexing && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          <Cpu size={14} className="text-blue-400" />
                        </motion.div>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold mb-1">{doc.title}</h4>
                    <p className="text-[11px] text-quest-muted leading-relaxed mb-2">{doc.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map(tag => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-quest-surface text-quest-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <button
              onClick={indexAllDocuments}
              disabled={indexedDocs.length === sampleDocuments.length || tokenizing}
              className="btn-secondary text-sm px-4 py-2 mb-6 disabled:opacity-50"
            >
              {indexedDocs.length === sampleDocuments.length ? 'All Documents Indexed' : 'Index All Documents'}
            </button>

            {/* Tokenization animation */}
            <AnimatePresence>
              {currentTokens.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-quest-bg rounded-xl p-4 mb-6 border border-blue-500/20"
                >
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Tokenizing Document #{indexingDoc}...</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentTokens.map((token, i) => (
                      <motion.span
                        key={`${token}-${i}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="text-[10px] px-2 py-1 rounded bg-blue-500/20 text-blue-300 font-mono"
                      >
                        {token}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Inverted Index visualization */}
            {Object.keys(invertedIndex).length > 0 && (
              <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <Hash size={16} className="text-purple-400" />
                    Inverted Index ({indexTokenCount} terms)
                  </h4>
                  <span className="text-[10px] text-quest-muted">{indexedDocs.length}/{sampleDocuments.length} docs indexed</span>
                </div>
                <div className="overflow-x-auto max-h-64 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-quest-bg">
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-3 text-quest-muted font-medium">Term</th>
                        <th className="text-left py-2 px-3 text-quest-muted font-medium">Doc IDs</th>
                        <th className="text-left py-2 px-3 text-quest-muted font-medium">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(invertedIndex)
                        .sort((a, b) => b[1].length - a[1].length)
                        .slice(0, 30)
                        .map(([term, postings]) => (
                          <tr key={term} className="border-b border-white/5 hover:bg-quest-surface/30">
                            <td className="py-1.5 px-3 font-mono text-amber-400">{term}</td>
                            <td className="py-1.5 px-3">
                              <div className="flex gap-1">
                                {postings.map(p => (
                                  <span key={p.docId} className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">
                                    #{p.docId}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-1.5 px-3 text-quest-muted">
                              {postings.map(p => `#${p.docId}:${p.tf}`).join(', ')}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Search the index */}
            {indexedDocs.length > 0 && (
              <div className="bg-quest-surface rounded-xl p-5 mb-6">
                <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Search size={16} className="text-amber-400" />
                  Search the Inverted Index
                </h4>
                <p className="text-[11px] text-quest-muted mb-3">
                  Type a query to see how the inverted index is consulted and how{' '}
                  <Term
                    word="Relevance Scoring"
                    definition="A mathematical formula (like TF-IDF or BM25) that assigns a score to each document based on how well it matches the query. Higher scores mean better matches. Factors include term frequency, inverse document frequency, field length, and boost weights."
                    onLearn={learnTerm}
                  />{' '}
                  ranks results.
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
                    className="flex-1 bg-quest-bg border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500/50"
                    placeholder='Try: "wireless headphones" or "portable charging"'
                  />
                  <button
                    onClick={executeSearch}
                    disabled={searching || !searchQuery.trim()}
                    className="btn-primary px-4 py-2 text-sm disabled:opacity-50"
                  >
                    {searching ? 'Searching...' : 'Search'}
                  </button>
                </div>

                {/* Matched tokens */}
                {matchedTokens.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[10px] text-quest-muted mb-2">Tokens found in index:</p>
                    <div className="flex gap-2">
                      {matchedTokens.map(t => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 font-mono">
                          {t} → {invertedIndex[t]?.length || 0} docs
                        </span>
                      ))}
                      {searchQuery.toLowerCase().split(/\s+/).filter(t => t.length > 0 && !invertedIndex[t]).map(t => (
                        <span key={t} className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 font-mono">
                          {t} → not found
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search results with scoring */}
                {searchResults.length > 0 && showScoring && (
                  <div className="space-y-2">
                    <p className="text-[10px] text-quest-muted mb-2">
                      Results ranked by{' '}
                      <Term
                        word="TF-IDF"
                        definition="Term Frequency-Inverse Document Frequency. TF measures how often a term appears in a document (more = more relevant). IDF measures how rare the term is across all documents (rarer = more discriminating). The product TF * IDF gives the final relevance score."
                        onLearn={learnTerm}
                      />{' '}
                      score:
                    </p>
                    {searchResults.map((result, i) => (
                      <motion.div
                        key={result.doc.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-quest-bg rounded-lg p-4 border border-white/5"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-sm font-semibold">{result.doc.title}</h5>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-quest-muted">Score:</span>
                            <span className="text-sm font-bold text-amber-400">{result.score}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-quest-muted mb-2">{result.doc.description}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-quest-muted">Matched:</span>
                          {result.matchedTerms.map(t => (
                            <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                        {/* Score breakdown */}
                        <div className="mt-2 pt-2 border-t border-white/5">
                          <div className="flex items-center gap-1">
                            <div
                              className="h-1.5 rounded-full bg-amber-500/60"
                              style={{ width: `${Math.min((result.score / (searchResults[0]?.score || 1)) * 100, 100)}%` }}
                            />
                            <span className="text-[9px] text-quest-muted">
                              {Math.round((result.score / (searchResults[0]?.score || 1)) * 100)}% relevance
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {searchResults.length === 0 && searchQuery && !searching && matchedTokens.length === 0 && showScoring && (
                  <p className="text-sm text-quest-muted text-center py-4">No documents matched your query.</p>
                )}
              </div>
            )}

            <DeepDive id="tf-idf-deep" title="TF-IDF and BM25 Scoring Explained" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">TF (Term Frequency):</strong> How often does the term appear
                  in this document? A document mentioning "wireless" 5 times is probably more relevant than one
                  mentioning it once. But there are diminishing returns — 50 mentions is not 50x more relevant.
                  Often computed as: <code className="text-xs font-mono">sqrt(tf)</code>.
                </p>
                <p>
                  <strong className="text-quest-text">IDF (Inverse Document Frequency):</strong> How rare is this
                  term across all documents? "the" appears everywhere (low IDF, not useful). "ergonomic" appears
                  rarely (high IDF, very discriminating). Formula: <code className="text-xs font-mono">log(totalDocs / docFreq)</code>.
                </p>
                <p>
                  <strong className="text-quest-text">BM25:</strong> The modern successor to TF-IDF used by Elasticsearch
                  by default. It adds two key improvements: (1) term frequency saturation — after a point, more mentions
                  do not increase the score, and (2) document length normalization — a match in a short title is weighted
                  higher than the same match in a long description. Parameters k1 (saturation) and b (length normalization)
                  are tunable.
                </p>
                <p>
                  <strong className="text-quest-text">Field Boosting:</strong> In Elasticsearch, you can boost
                  certain fields. <code className="text-xs font-mono">"title^3"</code> means a match in the title
                  is worth 3x a match in the description. This is crucial for relevance tuning.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Analyzers
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION: ANALYZERS ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Filter className="text-green-400" />
              Analyzers — Transforming Text into Tokens
            </h2>

            <p className="text-quest-muted mb-6">
              Before text hits the inverted index, it passes through an{' '}
              <Term
                word="Analyzer"
                definition="A pipeline of three components: character filters (clean raw text), a tokenizer (split text into tokens), and token filters (transform tokens via lowercasing, stemming, stop word removal). The analyzer determines what tokens get stored in the inverted index and how queries are processed."
                onLearn={learnTerm}
              />
              . The analyzer determines what gets indexed. "Running", "runs", and "ran" should all match
              a search for "run" — but only if the analyzer stems them to the same root form. Getting the
              analyzer right is the difference between good and terrible search results.
            </p>

            {/* Analyzer pipeline visualization */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Layers size={18} className="text-green-400" />
              Interactive Analyzer Pipeline
            </h3>
            <p className="text-sm text-quest-muted mb-4">
              Enter text and watch it flow through each stage of the analysis pipeline.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={analyzerInput}
                  onChange={(e) => setAnalyzerInput(e.target.value)}
                  className="flex-1 bg-quest-surface border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500/50"
                  placeholder="Enter text to analyze..."
                />
                <button
                  onClick={runAnalyzer}
                  disabled={analyzerRunning || !analyzerInput.trim()}
                  className="btn-primary px-6 py-2 text-sm disabled:opacity-50"
                >
                  {analyzerRunning ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>

              {/* Pipeline steps */}
              <div className="space-y-3">
                {analyzerSteps.map((step, idx) => {
                  const Icon = step.icon
                  const isActive = activeAnalyzerStep === idx
                  const isDone = activeAnalyzerStep > idx
                  const output = analyzerOutputs[idx]

                  return (
                    <motion.div
                      key={step.name}
                      animate={isActive ? { borderColor: 'rgba(74, 222, 128, 0.5)' } : {}}
                      className={`rounded-lg border p-4 transition-all
                        ${isActive
                          ? 'bg-green-500/10 border-green-500/40'
                          : isDone
                            ? 'bg-quest-surface border-green-500/20'
                            : 'bg-quest-surface/50 border-white/5'
                        }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                          ${isActive ? 'bg-green-500/30' : isDone ? 'bg-green-500/20' : 'bg-quest-bg'}`}>
                          {isDone ? (
                            <CheckCircle size={16} className="text-green-400" />
                          ) : (
                            <Icon size={16} className={isActive ? 'text-green-400' : 'text-quest-muted'} />
                          )}
                        </div>
                        <div>
                          <h4 className={`text-sm font-semibold ${isActive ? 'text-green-400' : ''}`}>
                            {step.name}
                          </h4>
                          <p className="text-[10px] text-quest-muted">{step.desc}</p>
                        </div>
                      </div>
                      <div className="ml-11">
                        <p className="text-[10px] text-quest-muted font-mono mb-1">{step.example}</p>
                        {output && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 p-2 rounded bg-quest-bg"
                          >
                            <span className="text-[9px] text-quest-muted block mb-1">Output:</span>
                            <code className="text-[11px] text-green-300 font-mono break-all">{output}</code>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Common analyzer types */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Built-in Elasticsearch Analyzers</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { name: 'Standard', desc: 'Default. Unicode-aware tokenization, lowercase filter. Good for most Western languages.', example: '"Quick Brown Fox" → [quick, brown, fox]', color: 'text-blue-400' },
                  { name: 'Simple', desc: 'Splits on non-letter characters, lowercases. No stop word removal.', example: '"Hello-World 123" → [hello, world]', color: 'text-green-400' },
                  { name: 'Whitespace', desc: 'Splits only on whitespace. No lowercasing, no filtering. Preserves everything.', example: '"Hello World!" → [Hello, World!]', color: 'text-yellow-400' },
                  { name: 'Language', desc: 'Language-specific: english, french, german etc. Includes stemming and stop words for that language.', example: '"The running foxes" → [run, fox]', color: 'text-purple-400' },
                  { name: 'Keyword', desc: 'No tokenization at all. The entire string is one token. Use for exact match fields like product SKUs.', example: '"ABC-123-XYZ" → [ABC-123-XYZ]', color: 'text-red-400' },
                  { name: 'Custom', desc: 'Build your own: combine any char filter + tokenizer + token filters. The most powerful option.', example: 'HTML strip → edge_ngram → lowercase → synonym', color: 'text-amber-400' },
                ].map(a => (
                  <div key={a.name} className="bg-quest-bg rounded-lg p-4">
                    <h5 className={`text-sm font-semibold ${a.color} mb-1`}>{a.name}</h5>
                    <p className="text-[11px] text-quest-muted mb-2">{a.desc}</p>
                    <code className="text-[10px] text-quest-muted font-mono">{a.example}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Full-Text Search features */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Search size={16} className="text-amber-400" />
                Full-Text Search Features
              </h4>
              <p className="text-[11px] text-quest-muted mb-4">
                <Term
                  word="Full-Text Search"
                  definition="Search that understands language, not just exact strings. It tokenizes queries, applies analyzers, handles synonyms, fuzzy matching, phrase proximity, and relevance scoring. Fundamentally different from SQL LIKE which does raw substring matching."
                  onLearn={learnTerm}
                />{' '}
                goes far beyond simple string matching. Here is what Elasticsearch gives you out of the box:
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { title: 'Fuzzy Matching', desc: 'Search "wireles" and still find "wireless". Uses Levenshtein distance to handle typos within an edit distance.', icon: '~' },
                  { title: 'Phrase Queries', desc: '"noise cancelling" as an exact phrase. Tokens must appear adjacent and in order. Slop parameter allows N words between terms.', icon: '""' },
                  { title: 'Prefix Queries', desc: 'Search "head" and match "headphones", "headset", "headers". Powers autocomplete and search-as-you-type.', icon: '*' },
                  { title: 'Boolean Queries', desc: 'must (AND), should (OR), must_not (NOT). Combine multiple conditions with fine-grained control.', icon: '&&' },
                  { title: 'Highlighting', desc: 'Returns matching snippets with the query terms wrapped in <em> tags. Users see exactly why each result matched.', icon: '<>' },
                  { title: 'Synonyms', desc: 'Configure "laptop" → "notebook" so searching either term finds both. Critical for user experience.', icon: '=' },
                ].map(f => (
                  <div key={f.title} className="flex gap-3 p-3 rounded-lg bg-quest-surface">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-mono text-xs font-bold flex-shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold mb-0.5">{f.title}</h5>
                      <p className="text-[10px] text-quest-muted leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Aggregations */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 size={18} className="text-purple-400" />
              Aggregations — Analytics on Your Data
            </h3>
            <p className="text-sm text-quest-muted mb-4">
              <Term
                word="Aggregations"
                definition="Elasticsearch's analytics framework. Aggregations let you group, count, average, and compute statistics over your data in real time. Think of them as SQL's GROUP BY on steroids — nested, composable, and run alongside search queries. Powers faceted navigation (filter by brand, price range, rating)."
                onLearn={learnTerm}
              />{' '}
              are what power those "filter by brand" sidebars and price range sliders on e-commerce sites.
              They run alongside search queries and compute statistics in real time.
            </p>

            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {aggregationTypes.map(agg => {
                const Icon = agg.icon
                return (
                  <div key={agg.name} className="bg-quest-bg rounded-lg p-4 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} className="text-purple-400" />
                      <h5 className="text-sm font-semibold">{agg.name}</h5>
                    </div>
                    <p className="text-[11px] text-quest-muted mb-2">{agg.desc}</p>
                    <code className="text-[9px] text-quest-muted font-mono break-all block bg-quest-surface rounded p-2">
                      {agg.example}
                    </code>
                  </div>
                )
              })}
            </div>

            <DeepDive id="mapping-types" title="Mappings and Field Types in Elasticsearch" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Mappings</strong> are like a database schema. They define
                  the type and behavior of each field. Unlike SQL databases, Elasticsearch can auto-detect types
                  (dynamic mapping), but explicit mappings give you control.
                </p>
                <p>
                  <strong className="text-quest-text">text vs keyword:</strong> The most important distinction.
                  <code className="text-xs font-mono"> text</code> fields are analyzed (tokenized, stemmed) for
                  full-text search. <code className="text-xs font-mono">keyword</code> fields are stored as-is for
                  exact match, sorting, and aggregations. A product name should be both: <code className="text-xs font-mono">
                  "name": {"{ \"type\": \"text\", \"fields\": { \"raw\": { \"type\": \"keyword\" } } }"}</code>.
                </p>
                <p>
                  <strong className="text-quest-text">Common field types:</strong> text (full-text), keyword (exact),
                  integer/long/float (numbers), date (timestamps), boolean, geo_point (latitude/longitude),
                  nested (objects that need independent querying), completion (autocomplete suggestions).
                </p>
                <p>
                  <strong className="text-quest-text">Index templates:</strong> Pre-define mappings and settings
                  for indexes that match a pattern. When you create a new index like "products-2024-03", the
                  template automatically applies the right mappings. Essential for time-series data.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Sharding
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION: SHARDING ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Server className="text-purple-400" />
              Sharding — Distributing the Index
            </h2>

            <p className="text-quest-muted mb-6">
              A single-node search engine works fine for small datasets. But when you have billions of documents,
              you need{' '}
              <Term
                word="Sharding"
                definition="Splitting an Elasticsearch index into smaller pieces called shards, distributed across multiple nodes. Each shard is a self-contained Lucene index. Queries are sent to all shards in parallel, and results are merged. This enables horizontal scaling — add more nodes to handle more data and queries."
                onLearn={learnTerm}
              />
              . Elasticsearch splits each index into multiple shards, distributes them across a cluster of nodes,
              and searches them all in parallel. This is how it handles petabytes of data.
            </p>

            {/* Shard distribution visualization */}
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Layers size={18} className="text-purple-400" />
              Shard Distribution Across a 3-Node Cluster
            </h3>
            <p className="text-sm text-quest-muted mb-4">
              An index with 3 primary shards and 1 replica each. Notice how primary and replica shards
              never live on the same node — if a node fails, the replica on another node takes over.
            </p>

            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {shardConfig.map((node) => (
                  <div key={node.name} className={`rounded-xl border ${node.bg.replace('bg-', 'border-')} p-4`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Server size={16} className={node.color} />
                      <h4 className={`text-sm font-semibold ${node.color}`}>{node.name}</h4>
                    </div>
                    <div className="space-y-2">
                      {node.shards.map((shard) => {
                        const isPrimary = shard.startsWith('P')
                        const isHighlighted = activeShardQuery && shardQueryStep >= 1
                        return (
                          <motion.div
                            key={shard}
                            animate={isHighlighted && isPrimary ? {
                              borderColor: ['rgba(255,255,255,0.1)', 'rgba(250, 204, 21, 0.5)', 'rgba(255,255,255,0.1)'],
                            } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className={`rounded-lg p-3 border text-center
                              ${isPrimary
                                ? 'bg-quest-surface border-white/10'
                                : 'bg-quest-surface/50 border-white/5 border-dashed'
                              }`}
                          >
                            <span className={`text-xs font-semibold ${isPrimary ? 'text-quest-text' : 'text-quest-muted'}`}>
                              {isPrimary ? 'Primary' : 'Replica'} {shard.slice(1)}
                            </span>
                            <div className={`text-[9px] mt-1 ${isPrimary ? 'text-amber-400' : 'text-quest-muted'}`}>
                              {isPrimary ? 'Handles writes + reads' : 'Read-only failover'}
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-[10px] text-quest-muted mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-quest-surface border border-white/10" />
                  Primary Shard
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-quest-surface/50 border border-white/5 border-dashed" />
                  Replica Shard
                </div>
              </div>

              {/* Animated query flow */}
              <button
                onClick={animateShardQuery}
                disabled={!!activeShardQuery}
                className="btn-primary text-sm px-4 py-2 mb-4 disabled:opacity-50"
              >
                {activeShardQuery ? 'Query in progress...' : 'Simulate a Distributed Search Query'}
              </button>

              {activeShardQuery && (
                <div className="space-y-2">
                  {[
                    'Coordinating node receives query',
                    'Query broadcast to all shards (P0, P1, P2)',
                    'Each shard searches its local inverted index',
                    'Results from all shards merged and ranked',
                    'Top-N results returned to client'
                  ].map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0.2 }}
                      animate={shardQueryStep >= idx ? { opacity: 1 } : { opacity: 0.2 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all
                        ${shardQueryStep >= idx ? 'bg-quest-surface border border-purple-500/20' : 'bg-quest-surface/30'}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                        ${shardQueryStep >= idx ? 'bg-purple-500/30 text-purple-300' : 'bg-quest-bg text-quest-muted'}`}>
                        {shardQueryStep > idx ? <CheckCircle size={12} /> : idx + 1}
                      </div>
                      <span className={`text-xs ${shardQueryStep >= idx ? 'text-quest-text' : 'text-quest-muted'}`}>
                        {step}
                      </span>
                      {idx === 1 && shardQueryStep >= idx && (
                        <span className="text-[9px] text-purple-400 ml-auto">scatter phase</span>
                      )}
                      {idx === 3 && shardQueryStep >= idx && (
                        <span className="text-[9px] text-purple-400 ml-auto">gather phase</span>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Shard sizing guidelines */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="text-sm font-semibold mb-4">Shard Sizing Best Practices</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { rule: 'Shard Size: 10-50 GB', detail: 'Each shard should be between 10-50 GB. Too small = overhead from too many shards. Too large = slow recovery and rebalancing.', severity: 'info' },
                  { rule: 'Shards per Node: < 20 per GB heap', detail: 'Each shard consumes memory. A node with 30 GB heap should have fewer than 600 shards. Track with _cat/shards API.', severity: 'warning' },
                  { rule: 'Replicas: At least 1', detail: 'Always have at least 1 replica for fault tolerance. More replicas = more read throughput but more storage. 1-2 is typical.', severity: 'info' },
                  { rule: 'Primary count is fixed', detail: 'You cannot change the number of primary shards after index creation. Choose wisely or use the _reindex API to migrate.', severity: 'danger' },
                ].map(item => (
                  <div key={item.rule} className="bg-quest-bg rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      {item.severity === 'danger' && <AlertTriangle size={12} className="text-red-400" />}
                      {item.severity === 'warning' && <AlertTriangle size={12} className="text-yellow-400" />}
                      {item.severity === 'info' && <CheckCircle size={12} className="text-blue-400" />}
                      <h5 className="text-xs font-semibold">{item.rule}</h5>
                    </div>
                    <p className="text-[10px] text-quest-muted leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cluster architecture */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6 border border-white/5">
              <h4 className="text-sm font-semibold mb-4">Elasticsearch Cluster Architecture</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { role: 'Master Node', desc: 'Manages cluster state: creates/deletes indexes, tracks nodes, assigns shards. Should be dedicated (no data). Run 3 for quorum.', icon: Cpu, color: 'text-red-400' },
                  { role: 'Data Node', desc: 'Stores shards and executes search/indexing operations. This is where the heavy lifting happens. Scale these horizontally.', icon: Database, color: 'text-blue-400' },
                  { role: 'Coordinating Node', desc: 'Routes queries to the right shards, merges results. Every node can coordinate, but dedicated coordinators help under heavy load.', icon: Layers, color: 'text-green-400' },
                ].map(node => {
                  const Icon = node.icon
                  return (
                    <div key={node.role} className="rounded-lg p-4 bg-quest-surface border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg ${node.color.replace('text-', 'bg-').replace('400', '500/20')} flex items-center justify-center`}>
                          <Icon size={16} className={node.color} />
                        </div>
                        <h5 className="text-sm font-semibold">{node.role}</h5>
                      </div>
                      <p className="text-[10px] text-quest-muted leading-relaxed">{node.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <DeepDive id="es-at-scale" title="Running Elasticsearch at Scale" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Index Lifecycle Management (ILM):</strong> For time-series data
                  (logs, metrics), ILM automates the lifecycle: hot phase (actively written, fast SSDs), warm phase
                  (read-only, cheaper storage), cold phase (infrequent access, compressed), delete phase (TTL expired).
                  This dramatically reduces storage costs.
                </p>
                <p>
                  <strong className="text-quest-text">Cross-Cluster Search:</strong> Search across multiple independent
                  ES clusters. Useful for multi-region deployments where each region has its own cluster but you need
                  global search. Also enables data sovereignty — keep EU data in EU cluster.
                </p>
                <p>
                  <strong className="text-quest-text">Snapshot and Restore:</strong> Automated backups to S3, GCS, or Azure Blob Storage.
                  Incremental snapshots are fast because only changed segments are uploaded. Essential for disaster recovery.
                  Test your restores regularly.
                </p>
                <p>
                  <strong className="text-quest-text">Circuit Breakers:</strong> ES has built-in memory circuit breakers that
                  reject queries likely to cause out-of-memory crashes. The fielddata circuit breaker prevents loading
                  too much text into memory for aggregations. The request circuit breaker limits single query memory usage.
                  These save you from your users' wild queries taking down the cluster.
                </p>
              </div>
            </DeepDive>

            <DeepDive id="es-alternatives" title="When NOT to Use Elasticsearch" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Primary database:</strong> Elasticsearch is not a replacement
                  for your primary database. It is not ACID-compliant, has eventual consistency, and losing data
                  during a bad cluster state change is possible. Always keep your source of truth in a real database
                  and sync to ES.
                </p>
                <p>
                  <strong className="text-quest-text">Simple lookups:</strong> If you just need to find a user by ID
                  or email, a database index is faster and simpler. Do not add ES complexity for key-value lookups.
                </p>
                <p>
                  <strong className="text-quest-text">Small datasets:</strong> Under 100K records? PostgreSQL full-text
                  search (tsvector/tsquery) is probably sufficient. Under 1M? Consider Meilisearch or Typesense for
                  simpler operations.
                </p>
                <p>
                  <strong className="text-quest-text">Operational cost:</strong> ES clusters are resource-hungry.
                  A production cluster needs at least 3 master-eligible nodes, data nodes with fast SSDs, and
                  significant RAM (ES loves heap memory). Managed services (Elastic Cloud, AWS OpenSearch) reduce ops
                  burden but cost more. Budget for this.
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

      {/* ═══════════════════ SECTION: QUIZ ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-amber-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Search is the backbone of every modern application. Let us verify your understanding
              of inverted indexes, scoring, analyzers, and distributed search.
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
                                : 'border-amber-500 bg-amber-500/10'
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
                <h3 className="text-xl font-bold mb-2">Level 22 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand inverted indexes, TF-IDF scoring, text analyzers, and distributed
                  search with sharding. Your users can search 10 million products in 12ms.
                </p>
                <p className="text-sm text-amber-400">
                  Seek and you shall find — in O(1) lookup time.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

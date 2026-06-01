import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, CheckCircle, HelpCircle, ChevronDown, ChevronUp, Send, Globe, Code, Zap,
  Server, Smartphone, Monitor, FileJson, Hash, Layers, GitBranch, Search, Plus, Trash2, Edit
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

export default function Level13({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Intro state
  const [showComparison, setShowComparison] = useState(false)
  const [restCallStep, setRestCallStep] = useState(0)
  const [graphqlCallStep, setGraphqlCallStep] = useState(0)

  // REST playground state
  const [selectedMethod, setSelectedMethod] = useState('GET')
  const [restEndpoint, setRestEndpoint] = useState('/users')
  const [restResponse, setRestResponse] = useState(null)
  const [restAnimating, setRestAnimating] = useState(false)

  // GraphQL builder state
  const [selectedFields, setSelectedFields] = useState({ id: true, name: true })
  const [gqlAnimating, setGqlAnimating] = useState(false)
  const [gqlResponse, setGqlResponse] = useState(null)

  // gRPC animation state
  const [grpcAnimStep, setGrpcAnimStep] = useState(0)

  const sections = ['intro', 'rest', 'graphql', 'grpc', 'quiz']

  // Intro animation
  useEffect(() => {
    if (currentSection === 0 && !showComparison) {
      const t1 = setTimeout(() => setRestCallStep(1), 600)
      const t2 = setTimeout(() => setRestCallStep(2), 1200)
      const t3 = setTimeout(() => setRestCallStep(3), 1800)
      const t4 = setTimeout(() => setGraphqlCallStep(1), 2400)
      const t5 = setTimeout(() => setShowComparison(true), 3200)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5) }
    }
  }, [currentSection, showComparison])

  // REST playground responses
  const restResponses = {
    'GET /users': { status: 200, color: 'text-quest-success', body: '[\n  { "id": 1, "name": "Alice", "email": "alice@example.com" },\n  { "id": 2, "name": "Bob", "email": "bob@example.com" }\n]' },
    'GET /users/:id': { status: 200, color: 'text-quest-success', body: '{\n  "id": 1,\n  "name": "Alice",\n  "email": "alice@example.com",\n  "created_at": "2024-01-15"\n}' },
    'POST /users': { status: 201, color: 'text-quest-success', body: '{\n  "id": 3,\n  "name": "Charlie",\n  "message": "User created"\n}' },
    'PUT /users': { status: 200, color: 'text-quest-success', body: '{\n  "id": 1,\n  "name": "Alice Updated",\n  "message": "User replaced"\n}' },
    'PATCH /users': { status: 200, color: 'text-quest-success', body: '{\n  "id": 1,\n  "name": "Alice Patched",\n  "message": "User updated"\n}' },
    'DELETE /users': { status: 200, color: 'text-quest-success', body: '{\n  "message": "User deleted"\n}' },
    'GET /users/:id/orders': { status: 200, color: 'text-quest-success', body: '[\n  { "id": 101, "total": "$99.00", "status": "shipped" },\n  { "id": 102, "total": "$45.50", "status": "pending" }\n]' },
    'POST /users/:id/orders': { status: 201, color: 'text-quest-success', body: '{\n  "id": 103,\n  "total": "$29.99",\n  "message": "Order created"\n}' },
  }

  const fireRestRequest = () => {
    setRestAnimating(true)
    const key = `${selectedMethod} ${restEndpoint}`
    const fallback = { status: selectedMethod === 'POST' ? 201 : selectedMethod === 'DELETE' ? 200 : 404, color: selectedMethod === 'DELETE' ? 'text-quest-success' : 'text-quest-warning', body: `{\n  "status": ${selectedMethod === 'POST' ? 201 : 404},\n  "message": "${selectedMethod === 'POST' ? 'Created' : 'Resource processed'}"\n}` }
    setTimeout(() => {
      setRestResponse(restResponses[key] || fallback)
      setRestAnimating(false)
    }, 800)
  }

  // GraphQL query builder
  const gqlSchema = {
    id: 'ID',
    name: 'String',
    email: 'String',
    orders: {
      _type: '[Order]',
      id: 'ID',
      total: 'Float',
      items: {
        _type: '[Item]',
        name: 'String',
        price: 'Float',
      },
    },
  }

  const toggleField = (path) => {
    setSelectedFields(prev => ({ ...prev, [path]: !prev[path] }))
    setGqlResponse(null)
  }

  const buildGqlQuery = () => {
    let lines = ['query {', '  user(id: 1) {']
    if (selectedFields.id) lines.push('    id')
    if (selectedFields.name) lines.push('    name')
    if (selectedFields.email) lines.push('    email')
    const hasOrders = selectedFields['orders.id'] || selectedFields['orders.total'] || selectedFields['orders.items.name'] || selectedFields['orders.items.price']
    if (hasOrders) {
      lines.push('    orders {')
      if (selectedFields['orders.id']) lines.push('      id')
      if (selectedFields['orders.total']) lines.push('      total')
      const hasItems = selectedFields['orders.items.name'] || selectedFields['orders.items.price']
      if (hasItems) {
        lines.push('      items {')
        if (selectedFields['orders.items.name']) lines.push('        name')
        if (selectedFields['orders.items.price']) lines.push('        price')
        lines.push('      }')
      }
      lines.push('    }')
    }
    lines.push('  }', '}')
    return lines.join('\n')
  }

  const buildGqlResponse = () => {
    const data = {}
    if (selectedFields.id) data.id = 1
    if (selectedFields.name) data.name = 'Alice'
    if (selectedFields.email) data.email = 'alice@example.com'
    const hasOrders = selectedFields['orders.id'] || selectedFields['orders.total'] || selectedFields['orders.items.name'] || selectedFields['orders.items.price']
    if (hasOrders) {
      const order = {}
      if (selectedFields['orders.id']) order.id = 101
      if (selectedFields['orders.total']) order.total = 99.0
      const hasItems = selectedFields['orders.items.name'] || selectedFields['orders.items.price']
      if (hasItems) {
        const item = {}
        if (selectedFields['orders.items.name']) item.name = 'Widget'
        if (selectedFields['orders.items.price']) item.price = 29.99
        order.items = [item]
      }
      data.orders = [order]
    }
    return JSON.stringify({ data: { user: data } }, null, 2)
  }

  const fireGqlQuery = () => {
    setGqlAnimating(true)
    setTimeout(() => {
      setGqlResponse(buildGqlResponse())
      setGqlAnimating(false)
    }, 800)
  }

  // gRPC animation
  useEffect(() => {
    if (currentSection === 3 && grpcAnimStep === 0) {
      const t1 = setTimeout(() => setGrpcAnimStep(1), 500)
      const t2 = setTimeout(() => setGrpcAnimStep(2), 1500)
      const t3 = setTimeout(() => setGrpcAnimStep(3), 2500)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [currentSection, grpcAnimStep])

  const quizQuestions = [
    {
      id: 'q1',
      question: 'When would you choose GraphQL over REST?',
      options: [
        { id: 'a', text: 'When you need maximum simplicity and caching', correct: false },
        { id: 'b', text: 'When different clients need different subsets of data and you want to avoid over-fetching', correct: true },
        { id: 'c', text: 'When you need binary serialization for performance', correct: false },
        { id: 'd', text: 'When you only have internal microservices communicating', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'What makes an API call idempotent?',
      options: [
        { id: 'a', text: 'It always returns a 200 status code', correct: false },
        { id: 'b', text: 'It uses HTTPS instead of HTTP', correct: false },
        { id: 'c', text: 'Making the same request multiple times produces the same result as making it once', correct: true },
        { id: 'd', text: 'It completes within a fixed time limit', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'What is the main advantage of Protocol Buffers in gRPC?',
      options: [
        { id: 'a', text: 'They are easier to read than JSON', correct: false },
        { id: 'b', text: 'Binary serialization that is smaller and faster to parse than JSON text', correct: true },
        { id: 'c', text: 'They work natively in web browsers', correct: false },
        { id: 'd', text: 'They do not require a schema definition', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'Which API style is best for internal microservice-to-microservice communication?',
      options: [
        { id: 'a', text: 'REST, because it is the most widely used', correct: false },
        { id: 'b', text: 'GraphQL, because of its flexible queries', correct: false },
        { id: 'c', text: 'gRPC, because of its high performance, strong typing, and streaming support', correct: true },
        { id: 'd', text: 'WebSockets, because they keep connections open', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const httpMethods = [
    { method: 'GET', icon: Search, label: 'Read', color: 'text-quest-success', safe: true, idempotent: true },
    { method: 'POST', icon: Plus, label: 'Create', color: 'text-quest-warning', safe: false, idempotent: false },
    { method: 'PUT', icon: Edit, label: 'Replace', color: 'text-quest-primary', safe: false, idempotent: true },
    { method: 'PATCH', icon: Edit, label: 'Update', color: 'text-quest-secondary', safe: false, idempotent: false },
    { method: 'DELETE', icon: Trash2, label: 'Remove', color: 'text-quest-danger', safe: false, idempotent: true },
  ]

  const endpoints = ['/users', '/users/:id', '/users/:id/orders']

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
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* SECTION: INTRO */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4">The Over-Fetching Problem</h2>

            <div className="bg-quest-bg rounded-lg p-6 mb-6">
              <p className="italic text-quest-muted">
                "Your mobile app needs 5 API calls to render one screen. The web app needs different data. What do you do?"
              </p>
            </div>

            <p className="text-quest-muted mb-6">
              The way your frontend talks to your backend matters enormously.{' '}
              <Term word="REST" definition="Representational State Transfer. An architectural style using HTTP methods on resources identified by URLs. The most common API paradigm." onLearn={learnTerm} />{' '}
              has been the default for years, but{' '}
              <Term word="GraphQL" definition="A query language for APIs developed by Facebook. Clients request exactly the data they need in a single request, solving over-fetching and under-fetching." onLearn={learnTerm} />{' '}
              and gRPC are changing the game.
            </p>

            {/* Over-fetching visualization */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* REST approach */}
              <div className="bg-quest-surface rounded-xl p-5 border border-white/10">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe size={18} className="text-quest-warning" /> REST Approach
                </h4>
                <div className="flex gap-4 items-start">
                  {/* Phone mockup */}
                  <div className="w-24 bg-quest-bg rounded-xl border border-white/20 p-2 flex-shrink-0">
                    <div className="text-[10px] text-quest-muted text-center mb-1">Mobile App</div>
                    <div className="space-y-1">
                      <div className="bg-white/5 rounded p-1 text-[9px]">Name?</div>
                      <div className="bg-white/5 rounded p-1 text-[9px]">Avatar?</div>
                      <div className="bg-white/5 rounded p-1 text-[9px]">Orders?</div>
                    </div>
                  </div>
                  {/* API calls */}
                  <div className="flex-1 space-y-2">
                    {[
                      { label: 'GET /user', size: '4.2 KB', fields: 'name, email, bio, settings, prefs...' },
                      { label: 'GET /user/avatar', size: '1.8 KB', fields: 'url, sizes, metadata, cdn...' },
                      { label: 'GET /user/orders', size: '9.0 KB', fields: 'all 50 orders with full details...' },
                    ].map((call, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={restCallStep > i ? { opacity: 1, x: 0 } : {}}
                        className="text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Send size={10} className="text-quest-warning" />
                          <span className="font-mono text-quest-warning">{call.label}</span>
                          <span className="text-quest-danger ml-auto">{call.size}</span>
                        </div>
                        <div className="ml-5 text-quest-muted text-[10px] mt-0.5">
                          <span className="text-quest-danger">Includes unused: </span>{call.fields}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-semibold text-quest-warning">3 API calls</span>
                  <span className="mx-2 text-quest-muted">|</span>
                  <span className="text-sm font-semibold text-quest-danger">~15 KB transferred</span>
                </div>
              </div>

              {/* GraphQL approach */}
              <div className="bg-quest-surface rounded-xl p-5 border border-quest-success/30">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Code size={18} className="text-quest-success" /> GraphQL Approach
                </h4>
                <div className="flex gap-4 items-start">
                  <div className="w-24 bg-quest-bg rounded-xl border border-quest-success/30 p-2 flex-shrink-0">
                    <div className="text-[10px] text-quest-muted text-center mb-1">Mobile App</div>
                    <div className="space-y-1">
                      <div className="bg-quest-success/10 rounded p-1 text-[9px] text-quest-success">Name</div>
                      <div className="bg-quest-success/10 rounded p-1 text-[9px] text-quest-success">Avatar</div>
                      <div className="bg-quest-success/10 rounded p-1 text-[9px] text-quest-success">3 Orders</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={graphqlCallStep > 0 ? { opacity: 1, x: 0 } : {}}
                      className="text-xs"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Send size={10} className="text-quest-success" />
                        <span className="font-mono text-quest-success">POST /graphql</span>
                        <span className="text-quest-success ml-auto">2 KB</span>
                      </div>
                      <div className="bg-quest-bg rounded p-2 font-mono text-[10px] text-quest-muted">
                        {'{ user(id:1) {'}<br />
                        {'  name'}<br />
                        {'  avatar { url }'}<br />
                        {'  orders(last:3) {'}<br />
                        {'    id, total'}<br />
                        {'  }'}<br />
                        {'}}'}
                      </div>
                      <div className="ml-5 text-quest-success text-[10px] mt-1">
                        Exactly the fields needed. Nothing more.
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-semibold text-quest-success">1 API call</span>
                  <span className="mx-2 text-quest-muted">|</span>
                  <span className="text-sm font-semibold text-quest-success">~2 KB transferred</span>
                </div>
              </div>
            </div>

            {/* Animated size comparison bars */}
            <AnimatePresence>
              {showComparison && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-quest-bg rounded-xl p-6 mb-6">
                  <h4 className="font-semibold mb-4 text-center">Data Transfer Comparison</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-quest-warning">REST (3 calls)</span>
                        <span className="text-quest-muted">~15 KB</span>
                      </div>
                      <div className="h-6 bg-quest-surface rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} className="h-full bg-quest-warning/60 rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-quest-success">GraphQL (1 call)</span>
                        <span className="text-quest-muted">~2 KB</span>
                      </div>
                      <div className="h-6 bg-quest-surface rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: '13%' }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-quest-success/60 rounded-full" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <DeepDive id="n-plus-1" title="The N+1 Problem in APIs" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>The pattern:</strong> You fetch a list of 50 users (1 request), then for each user you fetch their profile picture (50 requests). That's 51 API calls for one screen.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>REST workarounds:</strong> Embedding related resources (/users?include=avatar), compound documents, or BFF (Backend for Frontend) patterns. All add complexity.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>GraphQL's solution:</strong> DataLoader batches and caches requests on the server side, collapsing N+1 into 2 queries (one for users, one batch for all avatars).
              </p>
            </DeepDive>

            <div className="flex justify-end">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                Explore REST <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: REST */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Globe className="text-quest-primary" /> REST: HTTP Method Playground
            </h2>

            <p className="text-quest-muted mb-6">
              REST APIs use standard HTTP methods on resource URLs. Each method has specific semantics.
              Try the interactive console below to see how different methods work on resources.
            </p>

            {/* Interactive console */}
            <div className="bg-quest-bg rounded-xl border border-white/10 overflow-hidden mb-6">
              <div className="bg-quest-surface px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-quest-danger/60" />
                <div className="w-3 h-3 rounded-full bg-quest-warning/60" />
                <div className="w-3 h-3 rounded-full bg-quest-success/60" />
                <span className="ml-2 text-xs text-quest-muted font-mono">API Console</span>
              </div>
              <div className="p-4">
                {/* Method selector */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {httpMethods.map(m => (
                    <button
                      key={m.method}
                      onClick={() => { setSelectedMethod(m.method); setRestResponse(null) }}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all border
                        ${selectedMethod === m.method ? `${m.color} border-current bg-white/5` : 'text-quest-muted border-white/10 hover:border-white/30'}`}
                    >
                      {m.method}
                    </button>
                  ))}
                </div>
                {/* URL bar */}
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 flex items-center bg-quest-surface rounded border border-white/10 px-3">
                    <span className="text-xs text-quest-muted font-mono mr-1">https://api.example.com</span>
                    <select
                      value={restEndpoint}
                      onChange={e => { setRestEndpoint(e.target.value); setRestResponse(null) }}
                      className="flex-1 bg-transparent text-sm font-mono text-quest-text py-2 outline-none"
                    >
                      {endpoints.map(ep => <option key={ep} value={ep}>{ep}</option>)}
                    </select>
                  </div>
                  <button onClick={fireRestRequest} disabled={restAnimating} className="btn-primary px-4 py-2 flex items-center gap-2 text-sm">
                    <Send size={14} /> Send
                  </button>
                </div>
                {/* Response */}
                <div className="bg-quest-surface rounded border border-white/10 p-3 min-h-[120px]">
                  {restAnimating ? (
                    <div className="flex items-center justify-center h-20">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-quest-primary border-t-transparent rounded-full" />
                    </div>
                  ) : restResponse ? (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`font-mono font-bold text-sm ${restResponse.color}`}>
                          {restResponse.status}
                        </span>
                        <span className="text-xs text-quest-muted">
                          {restResponse.status === 200 ? 'OK' : restResponse.status === 201 ? 'Created' : restResponse.status === 404 ? 'Not Found' : 'Success'}
                        </span>
                      </div>
                      <pre className="text-xs font-mono text-quest-muted whitespace-pre-wrap">{restResponse.body}</pre>
                    </div>
                  ) : (
                    <p className="text-sm text-quest-muted text-center mt-8">Select a method and endpoint, then click Send</p>
                  )}
                </div>
              </div>
            </div>

            {/* Resource hierarchy */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <GitBranch size={16} className="text-quest-primary" /> REST Resource Hierarchy
              </h4>
              <div className="font-mono text-sm space-y-1 ml-2">
                <div className="text-quest-primary">/users</div>
                <div className="ml-4 text-quest-muted">
                  <span className="text-white/20">|--</span> /users/:id
                </div>
                <div className="ml-8 text-quest-muted">
                  <span className="text-white/20">|--</span> /users/:id/orders
                </div>
                <div className="ml-12 text-quest-muted">
                  <span className="text-white/20">|--</span> /users/:id/orders/:orderId
                </div>
                <div className="ml-8 text-quest-muted">
                  <span className="text-white/20">|--</span> /users/:id/avatar
                </div>
              </div>
            </div>

            {/* HTTP Methods table */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-4">HTTP Methods Reference</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3">Method</th>
                      <th className="text-left py-2 px-3">Action</th>
                      <th className="text-center py-2 px-3">Safe</th>
                      <th className="text-center py-2 px-3">
                        <Term word="Idempotency" definition="A property where making the same request multiple times has the same effect as making it once. GET, PUT, and DELETE are idempotent; POST is not." onLearn={learnTerm} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {httpMethods.map(m => (
                      <tr key={m.method} className="border-b border-white/5">
                        <td className={`py-2 px-3 font-mono font-bold ${m.color}`}>{m.method}</td>
                        <td className="py-2 px-3">{m.label}</td>
                        <td className="py-2 px-3 text-center">{m.safe ? <CheckCircle size={14} className="inline text-quest-success" /> : <span className="text-quest-muted">-</span>}</td>
                        <td className="py-2 px-3 text-center">{m.idempotent ? <CheckCircle size={14} className="inline text-quest-success" /> : <span className="text-quest-muted">-</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* HATEOAS & Versioning & Pagination */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-quest-surface rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">
                  <Term word="HATEOAS" definition="Hypermedia As The Engine Of Application State. REST responses include links to related actions, so clients discover the API by following links rather than hardcoding URLs." onLearn={learnTerm} />
                </h5>
                <div className="font-mono text-[10px] text-quest-muted bg-quest-bg rounded p-2">
                  {`{ "user": { "name": "Alice" },`}<br />
                  {`  "_links": {`}<br />
                  {`    "orders": "/users/1/orders",`}<br />
                  {`    "edit": "/users/1"`}<br />
                  {`  }}`}
                </div>
              </div>
              <div className="bg-quest-surface rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">
                  <Term word="API Versioning" definition="Strategies for evolving APIs without breaking clients: URL versioning (/v2/users), header versioning, or query parameter versioning." onLearn={learnTerm} />
                </h5>
                <div className="font-mono text-[10px] text-quest-muted space-y-1">
                  <div className="text-quest-primary">/v1/users (old)</div>
                  <div className="text-quest-success">/v2/users (new)</div>
                  <div className="text-quest-muted">Accept: application/vnd.api+json;v=2</div>
                </div>
              </div>
              <div className="bg-quest-surface rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">
                  <Term word="Pagination" definition="Splitting large result sets into pages. Common strategies: offset-based (?page=2&limit=20), cursor-based (?after=abc123), and keyset (?created_after=2024-01-01)." onLearn={learnTerm} />
                </h5>
                <div className="text-[10px] text-quest-muted space-y-1">
                  <div><span className="text-quest-warning">Offset:</span> ?page=2&limit=20</div>
                  <div><span className="text-quest-success">Cursor:</span> ?after=eyJpZCI6MTB9</div>
                  <div><span className="text-quest-primary">Keyset:</span> ?created_after=ts</div>
                </div>
              </div>
            </div>

            <DeepDive id="richardson-maturity" title="REST Maturity Model (Richardson)" onRead={markDeepDiveRead}>
              <div className="space-y-3">
                {[
                  { level: 'Level 0', name: 'The Swamp of POX', desc: 'One endpoint, one method (POST). Basically RPC over HTTP. Example: SOAP.' },
                  { level: 'Level 1', name: 'Resources', desc: 'Multiple URIs for different resources, but still only POST.' },
                  { level: 'Level 2', name: 'HTTP Verbs', desc: 'Proper use of GET, POST, PUT, DELETE. Most REST APIs stop here.' },
                  { level: 'Level 3', name: 'Hypermedia (HATEOAS)', desc: 'Responses include links to related actions. True REST. Very few APIs reach this level.' },
                ].map(l => (
                  <div key={l.level} className="flex gap-3 text-sm">
                    <span className="font-mono text-quest-primary font-bold whitespace-nowrap">{l.level}</span>
                    <div>
                      <span className="font-semibold">{l.name}</span>
                      <span className="text-quest-muted"> - {l.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Explore GraphQL <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: GRAPHQL */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Code className="text-quest-secondary" /> GraphQL: Query Builder
            </h2>

            <p className="text-quest-muted mb-6">
              With GraphQL, the client decides exactly what data it needs. Build a query below by
              selecting fields from the schema, then watch it execute.
            </p>

            {/* Interactive query builder */}
            <div className="bg-quest-bg rounded-xl border border-white/10 overflow-hidden mb-6">
              <div className="bg-quest-surface px-4 py-2 flex items-center gap-2 border-b border-white/10">
                <Code size={14} className="text-quest-secondary" />
                <span className="text-xs text-quest-muted font-mono">GraphQL Query Builder</span>
              </div>
              <div className="grid md:grid-cols-3 divide-x divide-white/10">
                {/* Schema panel */}
                <div className="p-4">
                  <h5 className="text-xs font-semibold text-quest-muted mb-3 uppercase tracking-wider">Schema</h5>
                  <div className="space-y-1 text-sm">
                    <div className="font-mono text-quest-secondary mb-2">User</div>
                    {[
                      { path: 'id', label: 'id: ID', depth: 1 },
                      { path: 'name', label: 'name: String', depth: 1 },
                      { path: 'email', label: 'email: String', depth: 1 },
                    ].map(f => (
                      <label key={f.path} className="flex items-center gap-2 cursor-pointer py-0.5 hover:bg-white/5 rounded px-1" style={{ paddingLeft: f.depth * 12 }}>
                        <input type="checkbox" checked={!!selectedFields[f.path]} onChange={() => toggleField(f.path)} className="accent-quest-secondary" />
                        <span className="font-mono text-xs text-quest-muted">{f.label}</span>
                      </label>
                    ))}
                    <div className="font-mono text-quest-warning mt-2 ml-3 text-xs">orders: [Order]</div>
                    {[
                      { path: 'orders.id', label: 'id: ID', depth: 2 },
                      { path: 'orders.total', label: 'total: Float', depth: 2 },
                    ].map(f => (
                      <label key={f.path} className="flex items-center gap-2 cursor-pointer py-0.5 hover:bg-white/5 rounded px-1" style={{ paddingLeft: f.depth * 12 }}>
                        <input type="checkbox" checked={!!selectedFields[f.path]} onChange={() => toggleField(f.path)} className="accent-quest-warning" />
                        <span className="font-mono text-xs text-quest-muted">{f.label}</span>
                      </label>
                    ))}
                    <div className="font-mono text-quest-primary mt-1 ml-6 text-xs">items: [Item]</div>
                    {[
                      { path: 'orders.items.name', label: 'name: String', depth: 3 },
                      { path: 'orders.items.price', label: 'price: Float', depth: 3 },
                    ].map(f => (
                      <label key={f.path} className="flex items-center gap-2 cursor-pointer py-0.5 hover:bg-white/5 rounded px-1" style={{ paddingLeft: f.depth * 12 }}>
                        <input type="checkbox" checked={!!selectedFields[f.path]} onChange={() => toggleField(f.path)} className="accent-quest-primary" />
                        <span className="font-mono text-xs text-quest-muted">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Query panel */}
                <div className="p-4">
                  <h5 className="text-xs font-semibold text-quest-muted mb-3 uppercase tracking-wider">Query</h5>
                  <pre className="font-mono text-xs text-quest-secondary whitespace-pre leading-relaxed">{buildGqlQuery()}</pre>
                  <button onClick={fireGqlQuery} disabled={gqlAnimating} className="btn-primary w-full mt-4 text-sm flex items-center justify-center gap-2">
                    <Send size={14} /> Execute Query
                  </button>
                </div>

                {/* Response panel */}
                <div className="p-4">
                  <h5 className="text-xs font-semibold text-quest-muted mb-3 uppercase tracking-wider">Response</h5>
                  {gqlAnimating ? (
                    <div className="flex items-center justify-center h-32">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-6 h-6 border-2 border-quest-secondary border-t-transparent rounded-full" />
                    </div>
                  ) : gqlResponse ? (
                    <pre className="font-mono text-xs text-quest-success whitespace-pre leading-relaxed">{gqlResponse}</pre>
                  ) : (
                    <p className="text-xs text-quest-muted mt-4 text-center">Select fields and execute</p>
                  )}
                </div>
              </div>
            </div>

            {/* Mutations example */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-3">Mutations (Writing Data)</h4>
              <div className="bg-quest-bg rounded p-3 font-mono text-xs text-quest-muted mb-3">
                <span className="text-quest-warning">mutation</span> {'{'}<br />
                {'  '}<span className="text-quest-secondary">createUser</span>{'(name: '}<span className="text-quest-success">"Alice"</span>{', email: '}<span className="text-quest-success">"alice@example.com"</span>{') {'}<br />
                {'    id'}<br />
                {'    name'}<br />
                {'  }'}<br />
                {'}'}
              </div>
              <div className="flex items-center gap-3 text-sm text-quest-muted">
                <Zap size={14} className="text-quest-warning" />
                <span><strong>Subscriptions</strong> use WebSockets for real-time updates (e.g., new messages)</span>
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-quest-success/10 rounded-lg p-4 border border-quest-success/30">
                <h4 className="font-semibold text-quest-success mb-3">Strengths</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>- No over-fetching or under-fetching</li>
                  <li>- Single endpoint, flexible queries</li>
                  <li>- Strongly typed schema</li>
                  <li>- Great for diverse clients (mobile, web, TV)</li>
                  <li>- Built-in introspection and documentation</li>
                </ul>
              </div>
              <div className="bg-quest-danger/10 rounded-lg p-4 border border-quest-danger/30">
                <h4 className="font-semibold text-quest-danger mb-3">Challenges</h4>
                <ul className="space-y-2 text-sm text-quest-muted">
                  <li>- HTTP caching is harder (single POST endpoint)</li>
                  <li>- Server-side N+1 without DataLoader</li>
                  <li>- Query complexity attacks possible</li>
                  <li>- Steeper learning curve</li>
                  <li>- File uploads are awkward</li>
                </ul>
              </div>
            </div>

            <DeepDive id="graphql-pitfalls" title="GraphQL Pitfalls" onRead={markDeepDiveRead}>
              <p className="text-sm text-quest-muted mb-3">
                <strong>N+1 on the Server:</strong> A nested query like users &gt; orders &gt; items can trigger hundreds of database queries if not batched. DataLoader solves this by batching and caching within a request.
              </p>
              <p className="text-sm text-quest-muted mb-3">
                <strong>Complexity Attacks:</strong> Malicious clients can send deeply nested queries that consume massive server resources. Use query depth limiting, cost analysis, and persisted queries.
              </p>
              <p className="text-sm text-quest-muted">
                <strong>Caching:</strong> REST uses URL-based HTTP caching naturally. GraphQL needs application-level caching (Apollo Cache, Relay Store) since all requests hit the same URL.
              </p>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back to REST
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Explore gRPC <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: gRPC */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-quest-warning" />{' '}
              <Term word="gRPC" definition="A high-performance, open-source RPC framework by Google. Uses Protocol Buffers for serialization and HTTP/2 for transport. Ideal for microservice communication." onLearn={learnTerm} />
              : Binary Speed
            </h2>

            <p className="text-quest-muted mb-6">
              While REST sends human-readable JSON text,{' '}
              <Term word="Protocol Buffers" definition="Google's language-neutral, platform-neutral mechanism for serializing structured data. Smaller, faster, and more efficient than JSON or XML. Requires a .proto schema definition." onLearn={learnTerm} />{' '}
              encode data in compact binary format. Combined with HTTP/2, gRPC is significantly faster.
            </p>

            {/* REST vs gRPC comparison animation */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h4 className="font-semibold mb-4 text-center">Serialization Comparison</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {/* REST / JSON */}
                <div className="text-center">
                  <div className="text-sm font-semibold text-quest-warning mb-3">REST + JSON</div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="bg-quest-surface rounded p-2 text-[10px] font-mono text-quest-muted w-20 text-left">
                      {'{"name":'}<br />
                      {'"Alice",'}<br />
                      {'"age":30}'}
                    </div>
                    <motion.div
                      animate={grpcAnimStep >= 1 ? { x: [0, 40, 80], opacity: [1, 1, 0.5] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      className="flex gap-1"
                    >
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-quest-warning/60 rounded-sm text-[6px] flex items-center justify-center text-quest-bg font-mono">T</div>
                      ))}
                    </motion.div>
                    <Server size={20} className="text-quest-muted" />
                  </div>
                  <div className="text-xs text-quest-muted">~95 bytes (text)</div>
                </div>
                {/* gRPC / Protobuf */}
                <div className="text-center">
                  <div className="text-sm font-semibold text-quest-success mb-3">gRPC + Protobuf</div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="bg-quest-surface rounded p-2 text-[10px] font-mono text-quest-success w-20 text-center">
                      0a 05 41<br />
                      6c 69 63<br />
                      65 10 1e
                    </div>
                    <motion.div
                      animate={grpcAnimStep >= 2 ? { x: [0, 40, 80], opacity: [1, 1, 0.5] } : {}}
                      transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                      className="flex gap-1"
                    >
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-3 h-3 bg-quest-success/60 rounded-sm text-[6px] flex items-center justify-center text-quest-bg font-mono">B</div>
                      ))}
                    </motion.div>
                    <Server size={20} className="text-quest-success" />
                  </div>
                  <div className="text-xs text-quest-success">~12 bytes (binary) - 87% smaller</div>
                </div>
              </div>
            </div>

            {/* Proto file example */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FileJson size={16} className="text-quest-warning" /> .proto File Definition
              </h4>
              <div className="bg-quest-bg rounded p-4 font-mono text-xs leading-relaxed">
                <span className="text-quest-secondary">syntax</span> = <span className="text-quest-success">"proto3"</span>;<br /><br />
                <span className="text-quest-secondary">service</span> <span className="text-quest-primary">UserService</span> {'{'}<br />
                {'  '}<span className="text-quest-secondary">rpc</span> GetUser (<span className="text-quest-warning">UserRequest</span>) <span className="text-quest-secondary">returns</span> (<span className="text-quest-warning">UserResponse</span>);<br />
                {'  '}<span className="text-quest-secondary">rpc</span> ListUsers (<span className="text-quest-warning">Empty</span>) <span className="text-quest-secondary">returns</span> (<span className="text-quest-secondary">stream</span> <span className="text-quest-warning">UserResponse</span>);<br />
                {'}'}<br /><br />
                <span className="text-quest-secondary">message</span> <span className="text-quest-warning">UserRequest</span> {'{'}<br />
                {'  '}<span className="text-quest-muted">int32</span> id = <span className="text-quest-primary">1</span>;<br />
                {'}'}<br /><br />
                <span className="text-quest-secondary">message</span> <span className="text-quest-warning">UserResponse</span> {'{'}<br />
                {'  '}<span className="text-quest-muted">int32</span> id = <span className="text-quest-primary">1</span>;<br />
                {'  '}<span className="text-quest-muted">string</span> name = <span className="text-quest-primary">2</span>;<br />
                {'  '}<span className="text-quest-muted">string</span> email = <span className="text-quest-primary">3</span>;<br />
                {'}'}
              </div>
            </div>

            {/* Streaming modes */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-4">gRPC Streaming Modes</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Unary',
                    desc: 'Simple request/response',
                    visual: (
                      <div className="flex items-center justify-center gap-3">
                        <Smartphone size={16} className="text-quest-primary" />
                        <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-quest-primary">
                          <ArrowRight size={14} />
                        </motion.div>
                        <Server size={16} className="text-quest-muted" />
                        <motion.div animate={{ x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="text-quest-success">
                          <ArrowRight size={14} className="rotate-180" />
                        </motion.div>
                        <Smartphone size={16} className="text-quest-primary" />
                      </div>
                    ),
                  },
                  {
                    name: 'Server Streaming',
                    desc: '1 request, many responses',
                    visual: (
                      <div className="flex items-center justify-center gap-2">
                        <Smartphone size={16} className="text-quest-primary" />
                        <ArrowRight size={14} className="text-quest-primary" />
                        <Server size={16} className="text-quest-muted" />
                        <div className="flex gap-0.5">
                          {[0, 0.3, 0.6].map((d, i) => (
                            <motion.div key={i} animate={{ x: [0, -8, 0], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: d }}>
                              <ArrowRight size={12} className="rotate-180 text-quest-success" />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ),
                  },
                  {
                    name: 'Client Streaming',
                    desc: 'Many requests, 1 response',
                    visual: (
                      <div className="flex items-center justify-center gap-2">
                        <Smartphone size={16} className="text-quest-primary" />
                        <div className="flex gap-0.5">
                          {[0, 0.3, 0.6].map((d, i) => (
                            <motion.div key={i} animate={{ x: [0, 8, 0], opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: d }}>
                              <ArrowRight size={12} className="text-quest-primary" />
                            </motion.div>
                          ))}
                        </div>
                        <Server size={16} className="text-quest-muted" />
                        <ArrowRight size={14} className="rotate-180 text-quest-success" />
                      </div>
                    ),
                  },
                  {
                    name: 'Bidirectional',
                    desc: 'Many requests and responses',
                    visual: (
                      <div className="flex items-center justify-center gap-2">
                        <Smartphone size={16} className="text-quest-primary" />
                        <div className="flex flex-col gap-0.5">
                          <motion.div animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                            <ArrowRight size={10} className="text-quest-primary" />
                          </motion.div>
                          <motion.div animate={{ x: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }}>
                            <ArrowRight size={10} className="rotate-180 text-quest-success" />
                          </motion.div>
                        </div>
                        <Server size={16} className="text-quest-muted" />
                      </div>
                    ),
                  },
                ].map(mode => (
                  <div key={mode.name} className="bg-quest-surface rounded-lg p-4">
                    <div className="font-semibold text-sm mb-1">{mode.name}</div>
                    <div className="text-xs text-quest-muted mb-3">{mode.desc}</div>
                    <div className="bg-quest-bg rounded p-3">{mode.visual}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* When to use */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-3">When to Use gRPC</h4>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { icon: Server, label: 'Internal microservice communication', color: 'text-quest-primary' },
                  { icon: Smartphone, label: 'Mobile apps (small payloads)', color: 'text-quest-warning' },
                  { icon: Zap, label: 'Real-time streaming data', color: 'text-quest-success' },
                ].map((use, i) => (
                  <div key={i} className="bg-quest-bg rounded-lg p-3 flex items-center gap-3">
                    <use.icon size={18} className={use.color} />
                    <span className="text-sm text-quest-muted">{use.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table: REST vs GraphQL vs gRPC */}
            <div className="bg-quest-bg rounded-xl p-5 mb-6">
              <h4 className="font-semibold mb-4 text-center">REST vs GraphQL vs gRPC</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-quest-muted">Aspect</th>
                      <th className="text-center py-2 px-3 text-quest-primary">REST</th>
                      <th className="text-center py-2 px-3 text-quest-secondary">GraphQL</th>
                      <th className="text-center py-2 px-3 text-quest-warning">gRPC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { aspect: 'Format', rest: 'JSON (text)', graphql: 'JSON (text)', grpc: 'Protobuf (binary)' },
                      { aspect: 'Transport', rest: 'HTTP/1.1+', graphql: 'HTTP/1.1+', grpc: 'HTTP/2' },
                      { aspect: 'Performance', rest: 'Good', graphql: 'Good', grpc: 'Excellent' },
                      { aspect: 'Use Case', rest: 'Public APIs', graphql: 'Flexible frontends', grpc: 'Microservices' },
                      { aspect: 'Learning Curve', rest: 'Low', graphql: 'Medium', grpc: 'High' },
                      { aspect: 'Browser Support', rest: 'Native', graphql: 'Native', grpc: 'Via grpc-web' },
                      { aspect: 'Streaming', rest: 'Limited', graphql: 'Subscriptions', grpc: 'Full support' },
                      { aspect: 'Caching', rest: 'HTTP caching', graphql: 'App-level', grpc: 'Custom' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 px-3 font-medium">{row.aspect}</td>
                        <td className="py-2 px-3 text-center text-quest-muted text-xs">{row.rest}</td>
                        <td className="py-2 px-3 text-center text-quest-muted text-xs">{row.graphql}</td>
                        <td className="py-2 px-3 text-center text-quest-muted text-xs">{row.grpc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <DeepDive id="grpc-faster" title="Why gRPC is Faster" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong>HTTP/2 multiplexing:</strong> Multiple requests share a single TCP connection, eliminating head-of-line blocking. REST typically uses HTTP/1.1 with separate connections.
                </p>
                <p>
                  <strong>Binary serialization:</strong> Protocol Buffers encode data in a compact binary format. A JSON object of 95 bytes might be just 12 bytes in Protobuf. Less data = faster transfer.
                </p>
                <p>
                  <strong>Header compression (HPACK):</strong> HTTP/2 compresses headers, which are often repetitive across API calls. REST sends full text headers every time.
                </p>
                <p>
                  <strong>Code generation:</strong> Protobuf schemas generate typed client/server stubs automatically. No manual serialization/deserialization overhead.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(2)} className="btn-secondary flex items-center gap-2">
                <ArrowRight size={18} className="rotate-180" /> Back to GraphQL
              </button>
              <button onClick={() => setCurrentSection(4)} className="btn-primary flex items-center gap-2">
                Take the Quiz <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SECTION: QUIZ */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
            <p className="text-quest-muted mb-6">
              API design impacts every part of your system. Let's verify your understanding of REST, GraphQL, and gRPC.
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
                <h3 className="text-xl font-bold mb-2">Level 13 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand the three major API paradigms and when to use each one.
                  This knowledge is essential for designing scalable system interfaces!
                </p>
                <p className="text-sm text-quest-primary">
                  REST for public APIs, GraphQL for flexible frontends, gRPC for high-performance microservices.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

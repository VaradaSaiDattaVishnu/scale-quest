import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, Shield, Lock, Gauge, Map, CheckCircle,
  HelpCircle, ChevronDown, ChevronUp, Smartphone, Monitor,
  Cpu, Server, Zap, AlertTriangle, RefreshCw, Clock,
  BarChart3, Layers, GitBranch, Eye, XCircle, Wifi,
  Globe, ArrowDown, ArrowUp, FileJson, Activity
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

/* ------------------------------------------------------------------ */
/*  Intro: "The Chaos Without a Gateway"                               */
/* ------------------------------------------------------------------ */
function IntroSection({ learnTerm, markDeepDiveRead, onNext }) {
  const [showDirectCalls, setShowDirectCalls] = useState(false)
  const [showGateway, setShowGateway] = useState(false)

  const clients = [
    { label: 'Mobile App', icon: Smartphone, color: 'text-blue-400' },
    { label: 'Web App', icon: Monitor, color: 'text-green-400' },
    { label: 'IoT Device', icon: Cpu, color: 'text-yellow-400' },
  ]

  const services = [
    'Auth Service', 'User Service', 'Order Service', 'Payment Service',
    'Inventory Service', 'Notification Service', 'Search Service', 'Analytics Service',
  ]

  const handleAddGateway = () => {
    setShowDirectCalls(false)
    setTimeout(() => setShowGateway(true), 300)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="concept-card">
        <h2 className="text-2xl font-bold mb-4">The Chaos Without a Gateway</h2>

        <div className="bg-quest-bg rounded-lg p-6 mb-6">
          <p className="italic text-quest-muted">
            "Clients are calling 10 different services directly. Security is a nightmare.
            We need a gatekeeper."
          </p>
        </div>

        <p className="text-quest-muted mb-6">
          In a microservices architecture, every client must know the address of every service,
          handle authentication independently, and deal with different response formats. An{' '}
          <Term
            word="API Gateway"
            definition="A server that acts as the single entry point for all clients. It handles cross-cutting concerns like authentication, rate limiting, request routing, and response aggregation."
            onLearn={learnTerm}
          />{' '}
          solves this by acting as the single front door.
        </p>

        {/* ------- interactive architecture diagram ------- */}
        <div className="bg-quest-bg rounded-xl p-6 mb-6 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Architecture View</h3>
            <div className="flex gap-2">
              {!showGateway && (
                <button
                  onClick={() => setShowDirectCalls(true)}
                  disabled={showDirectCalls}
                  className="btn-primary text-xs px-3 py-1 disabled:opacity-40"
                >
                  Show Direct Calls
                </button>
              )}
              {showDirectCalls && !showGateway && (
                <button onClick={handleAddGateway} className="btn-primary text-xs px-3 py-1 bg-green-600 hover:bg-green-500">
                  Add API Gateway
                </button>
              )}
            </div>
          </div>

          <div className="relative flex items-start justify-between min-h-[320px]">
            {/* Clients column */}
            <div className="flex flex-col gap-4 w-32 z-10">
              {clients.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-quest-surface rounded-lg p-3 text-center border border-white/10"
                >
                  <c.icon size={24} className={`mx-auto mb-1 ${c.color}`} />
                  <p className="text-xs font-medium">{c.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Gateway (middle) */}
            <AnimatePresence>
              {showGateway && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl p-5 text-center shadow-lg shadow-purple-500/30 border-2 border-white/20">
                    <Shield size={32} className="mx-auto mb-2 text-white" />
                    <p className="text-sm font-bold text-white">API Gateway</p>
                    <p className="text-[10px] text-white/70 mt-1">Auth | Rate Limit | Route</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG connector lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <AnimatePresence>
                {showDirectCalls && !showGateway && clients.map((_, ci) =>
                  services.map((_, si) => {
                    const x1 = 132
                    const y1 = 30 + ci * 68
                    const x2Pct = 0.78
                    const y2 = 16 + si * 38
                    return (
                      <motion.line
                        key={`${ci}-${si}`}
                        x1={x1} y1={y1}
                        x2="78%" y2={y2}
                        stroke={ci === 0 ? '#60a5fa' : ci === 1 ? '#4ade80' : '#facc15'}
                        strokeWidth={1}
                        strokeOpacity={0.5}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: (ci * services.length + si) * 0.03, duration: 0.4 }}
                      />
                    )
                  })
                )}
                {showGateway && (
                  <>
                    {clients.map((_, ci) => (
                      <motion.line
                        key={`gw-in-${ci}`}
                        x1={132} y1={30 + ci * 68}
                        x2="50%" y2="50%"
                        stroke="#a78bfa"
                        strokeWidth={2}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ delay: ci * 0.15, duration: 0.5 }}
                      />
                    ))}
                    {services.map((_, si) => (
                      <motion.line
                        key={`gw-out-${si}`}
                        x1="50%" y1="50%"
                        x2="78%" y2={16 + si * 38}
                        stroke="#818cf8"
                        strokeWidth={2}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.8 }}
                        transition={{ delay: 0.5 + si * 0.08, duration: 0.4 }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </svg>

            {/* Services column */}
            <div className="flex flex-col gap-1 w-36 z-10">
              {services.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-quest-surface rounded px-3 py-2 text-center border border-white/10"
                >
                  <p className="text-[10px] font-medium truncate">{s}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {showDirectCalls && !showGateway && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2">
              {[
                { icon: XCircle, text: 'Each client handles auth tokens differently', color: 'text-red-400' },
                { icon: XCircle, text: 'No centralized rate limiting', color: 'text-red-400' },
                { icon: XCircle, text: 'Service addresses hardcoded in every client', color: 'text-red-400' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <p.icon size={14} className={p.color} />
                  <span className="text-quest-muted">{p.text}</span>
                </div>
              ))}
            </motion.div>
          )}

          {showGateway && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2">
              {[
                { icon: CheckCircle, text: 'Single entry point for all clients', color: 'text-green-400' },
                { icon: CheckCircle, text: 'Centralized auth, rate limiting, logging', color: 'text-green-400' },
                { icon: CheckCircle, text: 'Clients only need one address', color: 'text-green-400' },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <p.icon size={14} className={p.color} />
                  <span className="text-quest-muted">{p.text}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <DeepDive id="gateway-vs-lb" title="API Gateway vs Load Balancer" onRead={markDeepDiveRead}>
          <p className="text-sm text-quest-muted mb-3">
            <strong>Load Balancer (Layer 4/7):</strong> Distributes traffic across multiple instances of the
            <em> same</em> service for high availability and scaling. It doesn't understand business logic.
          </p>
          <p className="text-sm text-quest-muted mb-3">
            <strong>API Gateway (Layer 7):</strong> Routes requests to <em>different</em> services based on
            the path, headers, or method. It handles cross-cutting concerns like authentication,
            rate limiting, request transformation, and response aggregation.
          </p>
          <p className="text-sm text-quest-muted">
            In practice you use both: the API gateway routes to the correct service, and a load balancer
            in front of the gateway (and/or in front of each service) distributes traffic across instances.
          </p>
        </DeepDive>

        <div className="flex justify-end">
          <button onClick={onNext} className="btn-primary flex items-center gap-2">
            Request Journey <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Gateway: "Request Journey" Animated Flow                           */
/* ------------------------------------------------------------------ */
function GatewaySection({ learnTerm, markDeepDiveRead, onBack, onNext }) {
  const [requestType, setRequestType] = useState(null) // 'auth' | 'unauth' | 'ratelimited'
  const [activeStep, setActiveStep] = useState(-1)

  const steps = [
    { label: 'Client Request', icon: Globe, color: 'bg-blue-500/20 text-blue-400', desc: 'Client sends HTTPS request to the gateway.' },
    { label: 'SSL Termination', icon: Lock, color: 'bg-yellow-500/20 text-yellow-400', desc: 'Gateway decrypts TLS. Backend traffic can stay HTTP internally.' },
    { label: 'Auth Check', icon: Shield, color: 'bg-purple-500/20 text-purple-400', desc: 'Validates JWT / API key. Rejects unauthenticated requests.' },
    { label: 'Rate Limiting', icon: Gauge, color: 'bg-orange-500/20 text-orange-400', desc: 'Checks per-client request quota. Returns 429 if exceeded.' },
    { label: 'Request Routing', icon: Map, color: 'bg-indigo-500/20 text-indigo-400', desc: 'Matches path + method to the target microservice.' },
    { label: 'Load Balancing', icon: Layers, color: 'bg-teal-500/20 text-teal-400', desc: 'Picks a healthy instance of the target service.' },
    { label: 'Response Back', icon: ArrowUp, color: 'bg-green-500/20 text-green-400', desc: 'Transforms and returns the response to the client.' },
  ]

  const runAnimation = useCallback((type) => {
    setRequestType(type)
    setActiveStep(0)
    let failAt = -1
    if (type === 'unauth') failAt = 2
    if (type === 'ratelimited') failAt = 3
    const maxStep = failAt >= 0 ? failAt : steps.length - 1

    let current = 0
    const iv = setInterval(() => {
      current += 1
      if (current > maxStep) { clearInterval(iv); return }
      setActiveStep(current)
    }, 700)
    return () => clearInterval(iv)
  }, [steps.length])

  const failedAt = requestType === 'unauth' ? 2 : requestType === 'ratelimited' ? 3 : -1

  const gatewayProducts = [
    { name: 'Kong', desc: 'Open-source, plugin-based, Lua/Nginx core. Great ecosystem.', color: 'text-green-400' },
    { name: 'AWS API Gateway', desc: 'Fully managed, deep AWS integration, pay-per-request.', color: 'text-yellow-400' },
    { name: 'Nginx', desc: 'High-performance reverse proxy, often used as lightweight gateway.', color: 'text-blue-400' },
    { name: 'Traefik', desc: 'Cloud-native, auto-discovery, great for containers/k8s.', color: 'text-purple-400' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="concept-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Shield className="text-purple-400" /> Request Journey Through the Gateway
        </h2>

        <p className="text-quest-muted mb-2">
          Every request passes through a pipeline of stages.{' '}
          <Term
            word="Request Routing"
            definition="The process by which the API gateway determines which backend microservice should handle an incoming request, based on the URL path, HTTP method, headers, or query parameters."
            onLearn={learnTerm}
          />{' '}
          and{' '}
          <Term
            word="Authentication"
            definition="Verifying the identity of a client making a request, typically via JWT tokens, API keys, or OAuth. The gateway centralizes this so individual services don't each need auth logic."
            onLearn={learnTerm}
          />{' '}
          are two of the most critical stages.
        </p>

        {/* Send request buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => runAnimation('auth')} className="btn-primary text-xs px-3 py-2 bg-green-600 hover:bg-green-500">
            Send Authenticated Request
          </button>
          <button onClick={() => runAnimation('unauth')} className="btn-primary text-xs px-3 py-2 bg-red-600 hover:bg-red-500">
            Send Unauthenticated Request
          </button>
          <button onClick={() => runAnimation('ratelimited')} className="btn-primary text-xs px-3 py-2 bg-orange-600 hover:bg-orange-500">
            Send Rate-Limited Request
          </button>
        </div>

        {/* Pipeline */}
        <div className="bg-quest-bg rounded-xl p-6 mb-6 space-y-3">
          {steps.map((step, i) => {
            const isActive = activeStep === i
            const isPassed = activeStep > i
            const isFailed = failedAt === i && activeStep >= i
            const isVisible = requestType !== null

            return (
              <motion.div
                key={step.label}
                initial={false}
                animate={{
                  opacity: isVisible ? 1 : 0.35,
                  scale: isActive ? 1.02 : 1,
                }}
                className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${
                  isFailed
                    ? 'border-red-500/60 bg-red-500/10'
                    : isActive
                      ? 'border-quest-primary/60 bg-quest-primary/10'
                      : isPassed
                        ? 'border-green-500/30 bg-green-500/5'
                        : 'border-white/5 bg-quest-surface/30'
                }`}
              >
                <div className={`p-2 rounded-lg ${step.color}`}>
                  <step.icon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{step.label}</p>
                  <p className="text-xs text-quest-muted">{step.desc}</p>
                </div>
                {isPassed && !isFailed && <CheckCircle size={18} className="text-green-400" />}
                {isFailed && (
                  <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
                    <XCircle size={16} />
                    {failedAt === 2 ? '401 Unauthorized' : '429 Too Many Requests'}
                  </span>
                )}
                {isActive && !isFailed && (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                    <RefreshCw size={16} className="text-quest-primary" />
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Comparison cards */}
        <h3 className="font-semibold mb-3">Popular API Gateways</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {gatewayProducts.map((gw) => (
            <div key={gw.name} className="bg-quest-surface rounded-lg p-4 border border-white/5">
              <p className={`font-semibold ${gw.color}`}>{gw.name}</p>
              <p className="text-xs text-quest-muted mt-1">{gw.desc}</p>
            </div>
          ))}
        </div>

        <DeepDive id="spof" title="API Gateway as Single Point of Failure" onRead={markDeepDiveRead}>
          <p className="text-sm text-quest-muted mb-3">
            If the gateway goes down, <em>everything</em> goes down. Mitigation strategies:
          </p>
          <ul className="text-sm text-quest-muted space-y-2 list-disc list-inside mb-3">
            <li><strong>Redundancy:</strong> Run multiple gateway instances behind a load balancer.</li>
            <li><strong>Health checks:</strong> Automated failover when an instance becomes unhealthy.</li>
            <li><strong>Graceful degradation:</strong> Return cached responses when backends fail.</li>
            <li><strong>Regional deployment:</strong> Deploy gateways in multiple regions / availability zones.</li>
          </ul>
          <p className="text-sm text-quest-muted">
            Managed gateways (AWS API Gateway, GCP Apigee) handle most of this for you, at the cost
            of vendor lock-in and potentially higher latency.
          </p>
        </DeepDive>

        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="btn-secondary flex items-center gap-2">
            <ArrowRight size={18} className="rotate-180" /> Back
          </button>
          <button onClick={onNext} className="btn-primary flex items-center gap-2">
            BFF Pattern <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  BFF: "Backend for Frontend" Pattern                                */
/* ------------------------------------------------------------------ */
function BffSection({ learnTerm, markDeepDiveRead, onBack, onNext }) {
  const [viewMode, setViewMode] = useState('single') // 'single' | 'bff'

  const singleApiResponse = {
    id: 1,
    username: 'alice_dev',
    email: 'alice@example.com',
    avatar_url: '/img/alice.png',
    bio: 'Full-stack developer...',
    preferences: { theme: 'dark', lang: 'en', notifications: true },
    activity_log: ['login 2h ago', 'edited profile', 'pushed commit'],
    friends: [{ id: 2, name: 'Bob' }, { id: 3, name: 'Carol' }],
    admin_notes: 'Verified account, enterprise plan',
    billing: { plan: 'enterprise', seats: 50, renewal: '2026-12-01' },
    audit_trail: [{ ts: '...', action: 'role_change' }],
  }

  const mobileFields = ['id', 'username', 'avatar_url']
  const webFields = ['id', 'username', 'email', 'avatar_url', 'bio', 'preferences', 'activity_log', 'friends']
  const adminFields = Object.keys(singleApiResponse)

  const bffResponses = {
    Mobile: Object.fromEntries(mobileFields.map(k => [k, singleApiResponse[k]])),
    Web: Object.fromEntries(webFields.map(k => [k, singleApiResponse[k]])),
    Admin: singleApiResponse,
  }

  const renderJson = (obj, highlight) => {
    const entries = Object.entries(obj)
    return (
      <pre className="text-[11px] leading-relaxed font-mono overflow-auto max-h-52">
        {'{\n'}
        {entries.map(([key, val], i) => {
          const isNeeded = !highlight || highlight.includes(key)
          const valStr = typeof val === 'object' ? JSON.stringify(val) : `"${val}"`
          return (
            <span key={key} className={isNeeded ? 'text-green-300' : 'text-red-400 line-through opacity-60'}>
              {'  '}&quot;{key}&quot;: {valStr}{i < entries.length - 1 ? ',' : ''}{'\n'}
            </span>
          )
        })}
        {'}'}
      </pre>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="concept-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <GitBranch className="text-indigo-400" /> Backend for Frontend (BFF)
        </h2>

        <p className="text-quest-muted mb-4">
          The{' '}
          <Term
            word="BFF Pattern"
            definition="Backend for Frontend: creating a separate backend service for each type of client (mobile, web, admin). Each BFF tailors API responses to the specific needs and constraints of its client."
            onLearn={learnTerm}
          />{' '}
          solves the problem of one-size-fits-all APIs. Mobile devices on slow networks
          shouldn't receive the same bloated payload as a desktop admin dashboard.
        </p>

        {/* Problem visual */}
        <div className="bg-quest-bg rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-sm mb-3">The Problem</h3>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            {[
              { icon: Smartphone, label: 'Mobile', need: 'Minimal data (slow 3G)', color: 'text-blue-400' },
              { icon: Monitor, label: 'Web', need: 'Rich, interactive data', color: 'text-green-400' },
              { icon: BarChart3, label: 'Admin', need: 'Everything + audit trails', color: 'text-yellow-400' },
            ].map(c => (
              <div key={c.label} className="bg-quest-surface rounded-lg p-3 text-center border border-white/5">
                <c.icon size={24} className={`mx-auto mb-1 ${c.color}`} />
                <p className="text-xs font-medium">{c.label}</p>
                <p className="text-[10px] text-quest-muted mt-1">{c.need}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-quest-muted text-center">
            A single generic API leads to <strong className="text-red-400">over-fetching</strong> for mobile
            and <strong className="text-red-400">under-fetching</strong> for admin.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setViewMode('single')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'single' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-quest-surface text-quest-muted'
            }`}
          >
            Single API
          </button>
          <button
            onClick={() => setViewMode('bff')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'bff' ? 'bg-green-500/20 text-green-300 border border-green-500/40' : 'bg-quest-surface text-quest-muted'
            }`}
          >
            BFF Pattern
          </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'single' ? (
            <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-quest-bg rounded-xl p-5 mb-4">
                <p className="text-xs text-quest-muted mb-2 font-semibold">GET /api/user/1 &mdash; same response for everyone:</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { label: 'Mobile receives', fields: mobileFields },
                    { label: 'Web receives', fields: webFields },
                    { label: 'Admin receives', fields: adminFields },
                  ].map(v => (
                    <div key={v.label}>
                      <p className="text-[10px] font-medium text-quest-muted mb-1">{v.label}:</p>
                      <div className="bg-quest-surface rounded p-2">
                        {renderJson(singleApiResponse, v.fields)}
                      </div>
                      <p className="text-[10px] text-red-400 mt-1">
                        {v.fields.length < adminFields.length
                          ? `${adminFields.length - v.fields.length} unused fields transferred`
                          : 'Needs extra call for audit detail'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="bff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="bg-quest-bg rounded-xl p-5 mb-4">
                <p className="text-xs text-quest-muted mb-2 font-semibold">Each BFF returns exactly what its client needs:</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(bffResponses).map(([client, data]) => (
                    <div key={client}>
                      <p className="text-[10px] font-medium text-green-400 mb-1">{client} BFF response:</p>
                      <div className="bg-quest-surface rounded p-2">
                        {renderJson(data, null)}
                      </div>
                      <p className="text-[10px] text-green-400 mt-1">
                        {Object.keys(data).length} fields &mdash; exactly what&apos;s needed
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response Aggregation */}
        <div className="bg-quest-surface rounded-xl p-5 mb-6">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Layers size={16} className="text-indigo-400" />
            <Term
              word="Response Aggregation"
              definition="The API gateway or BFF calls multiple backend services and combines their responses into a single, unified response for the client, reducing the number of round-trips."
              onLearn={learnTerm}
            />
          </h3>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['User Service', 'Order Service', 'Recommendation Service'].map((svc, i) => (
              <div key={svc} className="flex items-center gap-2">
                <div className="bg-quest-bg rounded px-3 py-2 text-xs border border-white/10">{svc}</div>
                {i < 2 && <span className="text-quest-muted">+</span>}
              </div>
            ))}
            <ArrowRight size={18} className="text-quest-muted mx-2" />
            <div className="bg-indigo-500/20 border border-indigo-500/40 rounded px-3 py-2 text-xs font-medium text-indigo-300">
              BFF combines
            </div>
            <ArrowRight size={18} className="text-quest-muted mx-2" />
            <div className="bg-green-500/20 border border-green-500/40 rounded px-3 py-2 text-xs font-medium text-green-300">
              Single response
            </div>
          </div>
          <p className="text-xs text-quest-muted text-center mt-3">
            The client makes <strong className="text-green-300">1 request</strong> instead of 3.
            The BFF handles the fan-out internally.
          </p>
        </div>

        <DeepDive id="bff-antipatterns" title="BFF Anti-Patterns" onRead={markDeepDiveRead}>
          <ul className="text-sm text-quest-muted space-y-3 list-disc list-inside">
            <li>
              <strong>Too many BFFs:</strong> Creating a separate BFF per screen or feature leads to an
              explosion of services. Stick to one per client <em>type</em> (mobile, web, admin).
            </li>
            <li>
              <strong>BFF becoming a monolith:</strong> If a BFF accumulates business logic, it becomes
              the very monolith you were trying to escape. Keep BFFs thin: aggregate, transform, pass through.
            </li>
            <li>
              <strong>Shared BFF code across clients:</strong> Sharing a library between BFFs re-couples them.
              Each BFF should be independently deployable. Duplication is acceptable here.
            </li>
          </ul>
        </DeepDive>

        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="btn-secondary flex items-center gap-2">
            <ArrowRight size={18} className="rotate-180" /> Back
          </button>
          <button onClick={onNext} className="btn-primary flex items-center gap-2">
            Gateway Features <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Features: "Gateway Capabilities" Interactive Dashboard              */
/* ------------------------------------------------------------------ */
function FeaturesSection({ markDeepDiveRead, onBack, onNext }) {
  const [activeCard, setActiveCard] = useState(null)

  const capabilities = [
    {
      id: 'transform',
      title: 'Request/Response Transformation',
      icon: RefreshCw,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/30',
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-quest-bg rounded p-2 font-mono text-[10px]">
              {'<user><name>Alice</name></user>'}
            </div>
            <ArrowRight size={14} className="text-quest-muted" />
            <div className="bg-quest-surface rounded px-2 py-1 text-[10px] font-medium text-blue-300">Gateway transforms</div>
            <ArrowRight size={14} className="text-quest-muted" />
            <div className="bg-quest-bg rounded p-2 font-mono text-[10px] text-green-300">
              {'{"name":"Alice"}'}
            </div>
          </div>
          <p className="text-[11px] text-quest-muted">
            XML to JSON, header injection, field renaming, protocol translation.
            Clients and services evolve independently.
          </p>
        </div>
      ),
    },
    {
      id: 'caching',
      title: 'Response Caching',
      icon: Clock,
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/30',
      demo: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-quest-bg rounded p-3 text-center border border-red-500/20">
              <p className="text-[10px] text-quest-muted mb-1">Without cache</p>
              <p className="text-lg font-bold text-red-400">~250ms</p>
              <p className="text-[10px] text-quest-muted">Hit backend every time</p>
            </div>
            <div className="bg-quest-bg rounded p-3 text-center border border-green-500/20">
              <p className="text-[10px] text-quest-muted mb-1">With gateway cache</p>
              <p className="text-lg font-bold text-green-400">~5ms</p>
              <p className="text-[10px] text-quest-muted">Served from gateway</p>
            </div>
          </div>
          <p className="text-[11px] text-quest-muted">
            Repeated identical requests served instantly. Configurable TTL per route.
            Reduces load on backend services dramatically.
          </p>
        </div>
      ),
    },
    {
      id: 'circuit',
      title: 'Circuit Breaking',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/30',
      demo: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            {['Req 1 OK', 'Req 2 OK', 'Req 3 FAIL', 'Req 4 FAIL', 'Req 5 FAIL'].map((r, i) => (
              <div key={i} className={`rounded px-2 py-1 text-[10px] font-medium ${
                r.includes('FAIL') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
              }`}>
                {r}
              </div>
            ))}
            <ArrowRight size={14} className="text-quest-muted" />
            <div className="bg-orange-500/20 text-orange-400 rounded px-2 py-1 text-[10px] font-bold">
              CIRCUIT OPEN
            </div>
          </div>
          <p className="text-[11px] text-quest-muted">
            After detecting repeated failures, the gateway stops forwarding requests and returns a
            fallback response. This prevents cascading failures across the system.
          </p>
        </div>
      ),
    },
    {
      id: 'versioning',
      title: 'API Versioning',
      icon: GitBranch,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/30',
      demo: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <code className="bg-quest-bg rounded px-2 py-1 text-[10px] font-mono">/v1/users</code>
              <ArrowRight size={14} className="text-quest-muted" />
              <span className="text-[10px] text-blue-300">User Service (legacy)</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="bg-quest-bg rounded px-2 py-1 text-[10px] font-mono">/v2/users</code>
              <ArrowRight size={14} className="text-quest-muted" />
              <span className="text-[10px] text-green-300">User Service v2 (new)</span>
            </div>
          </div>
          <p className="text-[11px] text-quest-muted">
            The gateway routes different API versions to different service deployments.
            Old clients keep working while new ones use updated APIs. Zero downtime migrations.
          </p>
        </div>
      ),
    },
    {
      id: 'monitoring',
      title: 'Logging & Monitoring',
      icon: BarChart3,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/30',
      demo: (
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Requests/sec', value: '12,847', trend: '+5%' },
              { label: 'Avg latency', value: '23ms', trend: '-12%' },
              { label: 'Error rate', value: '0.02%', trend: '-8%' },
              { label: '4xx/5xx', value: '14 / 3', trend: '' },
            ].map(m => (
              <div key={m.label} className="bg-quest-bg rounded p-2 text-center">
                <p className="text-[10px] text-quest-muted">{m.label}</p>
                <p className="text-sm font-bold">{m.value}</p>
                {m.trend && <p className="text-[9px] text-green-400">{m.trend}</p>}
              </div>
            ))}
          </div>
          <p className="text-[11px] text-quest-muted">
            Because all traffic flows through the gateway, it's the perfect place to collect
            metrics, distributed traces, and access logs for every service.
          </p>
        </div>
      ),
    },
  ]

  const realWorldArchitectures = [
    { name: 'Netflix Zuul', desc: 'JVM-based gateway that handles billions of requests/day. Filters for auth, routing, and load shedding.' },
    { name: 'Amazon API Gateway', desc: 'Serverless gateway with built-in Lambda integration. Scales automatically, pay per million requests.' },
    { name: 'Kong Gateway', desc: 'Nginx/OpenResty-based with 100+ plugins. Used by companies like Nasdaq, Cisco, and Samsung.' },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="concept-card">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Zap className="text-yellow-400" /> Gateway Capabilities Dashboard
        </h2>

        <p className="text-quest-muted mb-6">
          An API gateway does far more than routing. Click each capability to see it in action.
        </p>

        <div className="space-y-4 mb-6">
          {capabilities.map((cap) => (
            <div key={cap.id}>
              <button
                onClick={() => setActiveCard(activeCard === cap.id ? null : cap.id)}
                className={`w-full text-left rounded-lg p-4 border transition-all ${
                  activeCard === cap.id ? cap.bg : 'bg-quest-surface border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <cap.icon size={20} className={cap.color} />
                    <span className="font-medium">{cap.title}</span>
                  </div>
                  {activeCard === cap.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {activeCard === cap.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border border-t-0 border-white/5 rounded-b-lg bg-quest-bg/50">
                      {cap.demo}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Real-world architectures */}
        <h3 className="font-semibold mb-3">Real-World Gateway Architectures</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {realWorldArchitectures.map(a => (
            <div key={a.name} className="bg-quest-surface rounded-lg p-4 border border-white/5">
              <p className="font-semibold text-quest-primary">{a.name}</p>
              <p className="text-xs text-quest-muted mt-1">{a.desc}</p>
            </div>
          ))}
        </div>

        <DeepDive id="mesh-vs-gateway" title="Service Mesh vs API Gateway" onRead={markDeepDiveRead}>
          <p className="text-sm text-quest-muted mb-3">
            They look similar but operate at different levels:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-3">
            <div className="bg-quest-bg rounded p-3">
              <p className="font-semibold text-sm text-purple-400 mb-1">API Gateway</p>
              <ul className="text-xs text-quest-muted space-y-1 list-disc list-inside">
                <li>North-south traffic (client &rarr; services)</li>
                <li>External-facing, edge of the network</li>
                <li>Handles auth, rate limiting, API management</li>
              </ul>
            </div>
            <div className="bg-quest-bg rounded p-3">
              <p className="font-semibold text-sm text-teal-400 mb-1">Service Mesh (Istio / Envoy)</p>
              <ul className="text-xs text-quest-muted space-y-1 list-disc list-inside">
                <li>East-west traffic (service &harr; service)</li>
                <li>Internal, between microservices</li>
                <li>mTLS, retries, observability, traffic shaping</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-quest-muted mb-2">
            <strong>Sidecar pattern:</strong> In a service mesh, a proxy (e.g., Envoy) runs alongside
            each service instance as a "sidecar" container. All inter-service traffic flows through
            these sidecars, enabling encryption, retries, and metrics without changing application code.
          </p>
          <p className="text-sm text-quest-muted">
            <strong>When you need both:</strong> Most mature microservice deployments use an API gateway
            at the edge <em>and</em> a service mesh internally. The gateway handles external concerns;
            the mesh handles internal communication.
          </p>
        </DeepDive>

        <div className="flex justify-between mt-6">
          <button onClick={onBack} className="btn-secondary flex items-center gap-2">
            <ArrowRight size={18} className="rotate-180" /> Back
          </button>
          <button onClick={onNext} className="btn-primary flex items-center gap-2">
            Take the Quiz <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Quiz Section                                                       */
/* ------------------------------------------------------------------ */
function QuizSection({ onComplete, onBack }) {
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is the primary purpose of an API Gateway?',
      options: [
        { id: 'a', text: 'To store data closer to users for faster access', correct: false },
        { id: 'b', text: 'To provide a single entry point that handles cross-cutting concerns like authentication, rate limiting, and routing for all microservices', correct: true },
        { id: 'c', text: 'To replace load balancers in a microservices architecture', correct: false },
        { id: 'd', text: 'To monitor server hardware utilization', correct: false },
      ],
    },
    {
      id: 'q2',
      question: 'What problem does the BFF (Backend for Frontend) pattern solve?',
      options: [
        { id: 'a', text: 'Preventing DDoS attacks at the network edge', correct: false },
        { id: 'b', text: 'Automatically scaling backend services based on load', correct: false },
        { id: 'c', text: 'Different clients needing different data formats and amounts from the same backend services', correct: true },
        { id: 'd', text: 'Encrypting data at rest in the database', correct: false },
      ],
    },
    {
      id: 'q3',
      question: 'What is Response Aggregation?',
      options: [
        { id: 'a', text: 'Compressing response payloads with gzip to reduce bandwidth', correct: false },
        { id: 'b', text: 'The gateway calling multiple backend services and combining their responses into a single response for the client', correct: true },
        { id: 'c', text: 'Caching responses at the CDN level for repeated requests', correct: false },
        { id: 'd', text: 'Logging all responses for compliance auditing', correct: false },
      ],
    },
    {
      id: 'q4',
      question: 'Why might an API Gateway become a bottleneck?',
      options: [
        { id: 'a', text: 'It uses too much disk space for logging', correct: false },
        { id: 'b', text: 'It can only handle REST, not gRPC or WebSocket traffic', correct: false },
        { id: 'c', text: 'All traffic flows through it, making it a single point of failure that must be highly available and performant', correct: true },
        { id: 'd', text: 'It requires manual configuration for every new route', correct: false },
      ],
    },
  ]

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
    onComplete?.()
  }

  const score = quizSubmitted
    ? quizQuestions.filter(q => {
        const selected = quizAnswers[q.id]
        return q.options.find(o => o.id === selected)?.correct
      }).length
    : 0

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="concept-card">
        <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
        <p className="text-quest-muted mb-6">
          Let's see how well you understand API gateways and the BFF pattern.
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
          <div className="flex justify-between items-center mt-6">
            <button onClick={onBack} className="btn-secondary flex items-center gap-2">
              <ArrowRight size={18} className="rotate-180" /> Back
            </button>
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < quizQuestions.length}
              className="btn-primary disabled:opacity-50"
            >
              Submit Answers
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-quest-success/10 border border-quest-success/30 rounded-lg p-6 text-center"
          >
            <CheckCircle size={48} className="mx-auto text-quest-success mb-4" />
            <h3 className="text-xl font-bold mb-2">Level 17 Complete!</h3>
            <p className="text-quest-muted mb-2">
              Score: {score}/{quizQuestions.length}
            </p>
            <p className="text-quest-muted mb-4">
              You now understand how API gateways act as the gatekeeper for microservices,
              and how the BFF pattern tailors backends to each client's needs.
            </p>
            <p className="text-sm text-quest-primary">
              The gatekeeper is in place. Your architecture is secure, organized, and efficient.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Level17 Component                                             */
/* ------------------------------------------------------------------ */
export default function Level17({ onComplete, learnTerm, markDeepDiveRead }) {
  const [currentSection, setCurrentSection] = useState(0)

  const sections = ['intro', 'gateway', 'bff', 'features', 'quiz']

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
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'
              }`}
          >
            {index + 1}. {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {currentSection === 0 && (
        <IntroSection
          learnTerm={learnTerm}
          markDeepDiveRead={markDeepDiveRead}
          onNext={() => setCurrentSection(1)}
        />
      )}

      {currentSection === 1 && (
        <GatewaySection
          learnTerm={learnTerm}
          markDeepDiveRead={markDeepDiveRead}
          onBack={() => setCurrentSection(0)}
          onNext={() => setCurrentSection(2)}
        />
      )}

      {currentSection === 2 && (
        <BffSection
          learnTerm={learnTerm}
          markDeepDiveRead={markDeepDiveRead}
          onBack={() => setCurrentSection(1)}
          onNext={() => setCurrentSection(3)}
        />
      )}

      {currentSection === 3 && (
        <FeaturesSection
          markDeepDiveRead={markDeepDiveRead}
          onBack={() => setCurrentSection(2)}
          onNext={() => setCurrentSection(4)}
        />
      )}

      {currentSection === 4 && (
        <QuizSection
          onComplete={onComplete}
          onBack={() => setCurrentSection(3)}
        />
      )}
    </div>
  )
}

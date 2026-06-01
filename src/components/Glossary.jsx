import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, CheckCircle } from 'lucide-react'
import useGameStore from '../context/gameStore'

// Comprehensive glossary of system design terms
const GLOSSARY = [
  // Level 1 - Basics
  { term: 'Server', category: 'Fundamentals', definition: 'A computer that provides data or services to other computers (clients) over a network. It "serves" requests from clients.' },
  { term: 'Client', category: 'Fundamentals', definition: 'A computer or application that requests services or data from a server. Your web browser is a client.' },
  { term: 'Client-Server Model', category: 'Fundamentals', definition: 'An architecture where clients request services from centralized servers. The foundation of the web.' },
  { term: 'Latency', category: 'Fundamentals', definition: 'The time delay between an action and its response. In networking, the time for a request to travel to a server and back.' },
  { term: 'Throughput', category: 'Fundamentals', definition: 'The number of operations (requests, transactions) a system can handle per unit of time.' },
  { term: 'Single Point of Failure (SPOF)', category: 'Fundamentals', definition: 'A component whose failure causes the entire system to fail. Eliminating SPOFs is key to reliability.' },

  // Level 2 - Scaling
  { term: 'Vertical Scaling', category: 'Scaling', definition: 'Adding more power (CPU, RAM, storage) to an existing machine. Also called "scaling up".' },
  { term: 'Horizontal Scaling', category: 'Scaling', definition: 'Adding more machines to distribute load. Also called "scaling out". Enables theoretically unlimited scale.' },
  { term: 'Redundancy', category: 'Scaling', definition: 'Having duplicate components so if one fails, another can take over. Critical for high availability.' },
  { term: 'Stateless', category: 'Scaling', definition: 'A design where each request contains all information needed to process it. Servers don\'t remember previous requests.' },
  { term: 'Auto-scaling', category: 'Scaling', definition: 'Automatically adding or removing servers based on current demand. Cloud platforms enable this.' },

  // Level 3 - Load Balancing
  { term: 'Load Balancer', category: 'Load Balancing', definition: 'A component that distributes incoming traffic across multiple servers. The "traffic cop" of distributed systems.' },
  { term: 'Round Robin', category: 'Load Balancing', definition: 'A load balancing algorithm that distributes requests sequentially across servers, cycling through them in order.' },
  { term: 'Least Connections', category: 'Load Balancing', definition: 'A load balancing algorithm that sends new requests to the server with the fewest active connections.' },
  { term: 'IP Hash', category: 'Load Balancing', definition: 'A load balancing algorithm that routes requests based on client IP, ensuring the same client always hits the same server.' },
  { term: 'Sticky Sessions', category: 'Load Balancing', definition: 'Ensuring a user\'s requests always go to the same server. Needed for stateful applications.' },
  { term: 'Health Check', category: 'Load Balancing', definition: 'Periodic requests sent to servers to verify they\'re operational. Failed checks remove servers from the pool.' },
  { term: 'Connection Draining', category: 'Load Balancing', definition: 'Allowing existing connections to complete before removing a server, preventing dropped requests during deployment.' },

  // Level 4 - Caching
  { term: 'Cache', category: 'Caching', definition: 'A high-speed storage layer that stores copies of frequently accessed data, reducing the need to fetch from slower sources.' },
  { term: 'Cache Hit', category: 'Caching', definition: 'When requested data is found in the cache. Fast response, no need to query the original source.' },
  { term: 'Cache Miss', category: 'Caching', definition: 'When requested data is NOT in the cache. Must fetch from the original source, then typically cache it.' },
  { term: 'TTL (Time To Live)', category: 'Caching', definition: 'How long cached data remains valid before it expires and must be refreshed from the source.' },
  { term: 'Cache Invalidation', category: 'Caching', definition: 'Removing or updating cached data when the source data changes. One of the "hard problems" in CS.' },
  { term: 'Cache-Aside', category: 'Caching', definition: 'A pattern where the application checks the cache first, and on miss, fetches from DB and populates the cache.' },
  { term: 'Write-Through', category: 'Caching', definition: 'A caching pattern where writes go to both cache and database synchronously.' },
  { term: 'Write-Behind', category: 'Caching', definition: 'A caching pattern where writes go to cache first, then asynchronously to the database.' },
  { term: 'Redis', category: 'Caching', definition: 'A popular in-memory data structure store used as a cache, database, and message broker.' },
  { term: 'CDN (Content Delivery Network)', category: 'Caching', definition: 'A network of geographically distributed servers that cache content close to users.' },

  // Level 5 - Databases
  { term: 'SQL', category: 'Databases', definition: 'Structured Query Language. Relational databases with tables, rows, columns, and strict schemas.' },
  { term: 'NoSQL', category: 'Databases', definition: '"Not Only SQL" databases. Various types with flexible schemas: document, key-value, graph, column.' },
  { term: 'ACID', category: 'Databases', definition: 'Atomicity, Consistency, Isolation, Durability. Properties ensuring reliable database transactions.' },
  { term: 'BASE', category: 'Databases', definition: 'Basically Available, Soft state, Eventual consistency. NoSQL philosophy prioritizing availability.' },
  { term: 'Schema', category: 'Databases', definition: 'The structure that defines how data is organized: tables, columns, types, constraints.' },
  { term: 'Index', category: 'Databases', definition: 'A data structure that speeds up queries by allowing the database to find data without scanning every row.' },
  { term: 'Primary Key', category: 'Databases', definition: 'A unique identifier for each row in a table. No duplicates allowed.' },
  { term: 'Foreign Key', category: 'Databases', definition: 'A field in one table that references the primary key of another table. Defines relationships.' },
  { term: 'JOIN', category: 'Databases', definition: 'A SQL operation that combines rows from two or more tables based on a related column.' },
  { term: 'Normalization', category: 'Databases', definition: 'Organizing database tables to reduce redundancy and improve data integrity.' },
  { term: 'Denormalization', category: 'Databases', definition: 'Intentionally adding redundancy to improve read performance. Common in NoSQL and data warehouses.' },

  // Advanced - Distributed Systems
  { term: 'CAP Theorem', category: 'Distributed Systems', definition: 'States that a distributed system can only provide 2 of 3 guarantees: Consistency, Availability, Partition tolerance.' },
  { term: 'Consistency', category: 'Distributed Systems', definition: 'Every read receives the most recent write. All nodes see the same data at the same time.' },
  { term: 'Availability', category: 'Distributed Systems', definition: 'Every request receives a response (even if not the most recent data). System never goes down.' },
  { term: 'Partition Tolerance', category: 'Distributed Systems', definition: 'System continues to operate despite network failures between nodes.' },
  { term: 'Eventual Consistency', category: 'Distributed Systems', definition: 'Given enough time without new updates, all replicas will converge to the same value.' },
  { term: 'Strong Consistency', category: 'Distributed Systems', definition: 'After a write completes, all subsequent reads will return that value. No stale data.' },
  { term: 'Sharding', category: 'Distributed Systems', definition: 'Splitting data across multiple databases, each holding a subset. Enables horizontal scaling.' },
  { term: 'Partition Key', category: 'Distributed Systems', definition: 'The field used to determine which shard a piece of data belongs to.' },
  { term: 'Replication', category: 'Distributed Systems', definition: 'Copying data across multiple nodes. Improves availability and read performance.' },
  { term: 'Leader-Follower', category: 'Distributed Systems', definition: 'A replication pattern where one node (leader) handles writes and followers replicate from it.' },

  // Message Queues
  { term: 'Message Queue', category: 'Messaging', definition: 'A system that stores messages between services, enabling asynchronous communication.' },
  { term: 'Producer', category: 'Messaging', definition: 'A service that sends messages to a queue.' },
  { term: 'Consumer', category: 'Messaging', definition: 'A service that receives and processes messages from a queue.' },
  { term: 'Pub/Sub', category: 'Messaging', definition: 'Publish-Subscribe pattern where publishers send messages to topics, and subscribers receive them.' },
  { term: 'Dead Letter Queue', category: 'Messaging', definition: 'A queue for messages that couldn\'t be processed, for debugging and retry logic.' },
  { term: 'Backpressure', category: 'Messaging', definition: 'A mechanism to slow down producers when consumers can\'t keep up with the message rate.' },

  // Microservices
  { term: 'Microservices', category: 'Architecture', definition: 'An architecture where an application is built as a collection of small, independent services.' },
  { term: 'Monolith', category: 'Architecture', definition: 'An architecture where the entire application is one single, unified codebase and deployment unit.' },
  { term: 'API Gateway', category: 'Architecture', definition: 'A single entry point for all clients, handling routing, authentication, and rate limiting.' },
  { term: 'Service Discovery', category: 'Architecture', definition: 'A mechanism for services to find and communicate with each other in a dynamic environment.' },
  { term: 'Circuit Breaker', category: 'Architecture', definition: 'A pattern that prevents cascading failures by stopping requests to a failing service.' },

  // Performance
  { term: 'Rate Limiting', category: 'Performance', definition: 'Controlling how many requests a client can make in a time period. Protects against abuse.' },
  { term: 'Throttling', category: 'Performance', definition: 'Slowing down request processing to prevent system overload.' },
  { term: 'Connection Pooling', category: 'Performance', definition: 'Reusing database connections instead of creating new ones for each query.' },
  { term: 'Lazy Loading', category: 'Performance', definition: 'Loading data only when it\'s actually needed, not upfront.' },
  { term: 'Pagination', category: 'Performance', definition: 'Returning data in chunks (pages) instead of all at once. Essential for large datasets.' },
]

function Glossary() {
  const { learnedTerms } = useGameStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(GLOSSARY.map(item => item.category))]

  const filteredTerms = useMemo(() => {
    return GLOSSARY.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const learnedCount = GLOSSARY.filter(item => learnedTerms.includes(item.term)).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BookOpen size={48} className="mx-auto text-quest-primary mb-4" />
        <h1 className="text-3xl font-bold mb-2">System Design Glossary</h1>
        <p className="text-quest-muted">
          Master the terminology. Speak the language of distributed systems.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-quest-surface px-4 py-2 rounded-full text-sm">
          <CheckCircle size={16} className="text-quest-success" />
          <span>{learnedCount} / {GLOSSARY.length} terms learned</span>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-quest-muted" />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-quest-surface border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-quest-primary"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm transition-all
                ${selectedCategory === category
                  ? 'bg-quest-primary text-quest-bg'
                  : 'bg-quest-surface text-quest-muted hover:text-quest-text'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTerms.map((item, index) => {
          const isLearned = learnedTerms.includes(item.term)

          return (
            <motion.div
              key={item.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`concept-card ${isLearned ? 'border-quest-success/30' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-quest-primary">{item.term}</h3>
                {isLearned && (
                  <CheckCircle size={16} className="text-quest-success shrink-0" />
                )}
              </div>
              <span className="text-xs bg-quest-surface px-2 py-1 rounded text-quest-muted">
                {item.category}
              </span>
              <p className="text-sm text-quest-muted mt-3">{item.definition}</p>
            </motion.div>
          )
        })}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12 text-quest-muted">
          <p>No terms found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export default Glossary

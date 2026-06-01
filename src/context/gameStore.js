import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Comprehensive 55-level curriculum covering HLD, LLD, Design Patterns & Case Studies
export const LEVELS = [
  // ========================================
  // PART 1: HLD FUNDAMENTALS (Levels 1-5)
  // ========================================
  {
    id: 1,
    title: "The Single Server",
    subtitle: "Where Every Journey Begins",
    description: "Meet your first server. It's lonely, it's simple, and it's about to teach you the fundamentals of how the web actually works.",
    concepts: ["Client-Server Model", "HTTP Request/Response", "Latency", "Throughput", "DNS"],
    unlocked: true,
    icon: "🖥️",
    color: "from-blue-500 to-cyan-500",
    story: "You just launched your startup. One server, one dream. Let's see how long this lasts...",
    part: "HLD Fundamentals",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "When One Isn't Enough",
    subtitle: "The Scaling Crossroads",
    description: "Your app is getting popular! But your single server is sweating. Time to learn about vertical vs horizontal scaling.",
    concepts: ["Vertical Scaling", "Horizontal Scaling", "Single Point of Failure", "Redundancy"],
    unlocked: false,
    icon: "📈",
    color: "from-green-500 to-emerald-500",
    story: "Traffic is spiking! Your server is at 95% CPU. What do you do?",
    part: "HLD Fundamentals",
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "The Traffic Cop",
    subtitle: "Mastering Load Balancers",
    description: "Multiple servers mean nothing without someone directing traffic. Enter the load balancer.",
    concepts: ["Load Balancer", "Round Robin", "Least Connections", "Health Checks", "Sticky Sessions", "L4 vs L7"],
    unlocked: false,
    icon: "🚦",
    color: "from-yellow-500 to-orange-500",
    story: "Three servers stand ready. But how do users know which one to talk to?",
    part: "HLD Fundamentals",
    difficulty: "Beginner"
  },
  {
    id: 4,
    title: "Memory Lane",
    subtitle: "The Art of Caching",
    description: "Why compute something twice when you can remember it? Caching is the secret weapon of fast systems.",
    concepts: ["Cache", "Cache Hit/Miss", "TTL", "Cache Invalidation", "Write-Through", "Write-Back", "LRU"],
    unlocked: false,
    icon: "🧠",
    color: "from-purple-500 to-pink-500",
    story: "Your database is crying. Every request hits it hard. There must be a better way...",
    part: "HLD Fundamentals",
    difficulty: "Beginner"
  },
  {
    id: 5,
    title: "Data Decisions",
    subtitle: "SQL vs NoSQL & Beyond",
    description: "The great database debate. When to use what, and why your choice matters more than you think.",
    concepts: ["SQL", "NoSQL", "ACID", "BASE", "Document Store", "Key-Value Store", "Graph DB", "Time-Series DB"],
    unlocked: false,
    icon: "🗄️",
    color: "from-red-500 to-rose-500",
    story: "Your data is growing. Users want relationships. Products want flexibility. What database fits?",
    part: "HLD Fundamentals",
    difficulty: "Beginner"
  },

  // ========================================
  // PART 2: HLD DATA LAYER (Levels 6-10)
  // ========================================
  {
    id: 6,
    title: "The Great Divide",
    subtitle: "Database Sharding",
    description: "One database won't cut it anymore. Learn to split your data across multiple machines.",
    concepts: ["Sharding", "Partition Key", "Hash Sharding", "Range Sharding", "Shard Rebalancing", "Hotspots"],
    unlocked: false,
    icon: "🔀",
    color: "from-indigo-500 to-violet-500",
    story: "10 million users. One database. The math doesn't work. Time to divide and conquer.",
    part: "HLD Data Layer",
    difficulty: "Intermediate"
  },
  {
    id: 7,
    title: "Copy That",
    subtitle: "Database Replication",
    description: "One copy of your data is a liability. Multiple copies? That's reliability. But it comes with challenges.",
    concepts: ["Master-Slave", "Master-Master", "Synchronous Replication", "Async Replication", "Replication Lag", "Read Replicas"],
    unlocked: false,
    icon: "📋",
    color: "from-teal-500 to-emerald-500",
    story: "Your master database just died. Users lost all their data. Never again.",
    part: "HLD Data Layer",
    difficulty: "Intermediate"
  },
  {
    id: 8,
    title: "Promises & Compromises",
    subtitle: "CAP Theorem Deep Dive",
    description: "In distributed systems, you can't have everything. Understanding CAP is understanding reality.",
    concepts: ["CAP Theorem", "Consistency", "Availability", "Partition Tolerance", "CP vs AP", "PACELC", "Eventual Consistency"],
    unlocked: false,
    icon: "⚖️",
    color: "from-amber-500 to-yellow-500",
    story: "A network partition just happened. Your system must choose: consistency or availability?",
    part: "HLD Data Layer",
    difficulty: "Intermediate"
  },
  {
    id: 9,
    title: "The Ring of Power",
    subtitle: "Consistent Hashing",
    description: "How do you distribute data evenly and handle servers coming and going? Enter consistent hashing.",
    concepts: ["Consistent Hashing", "Hash Ring", "Virtual Nodes", "Rebalancing", "Data Distribution", "Node Addition/Removal"],
    unlocked: false,
    icon: "💍",
    color: "from-orange-500 to-red-500",
    story: "You added a new database server. Now ALL your cached data is invalid. There must be a better way.",
    part: "HLD Data Layer",
    difficulty: "Intermediate"
  },
  {
    id: 10,
    title: "Index Everything",
    subtitle: "Database Indexing & Query Optimization",
    description: "Why does this query take 30 seconds? Because you don't understand indexes yet.",
    concepts: ["B-Tree Index", "Hash Index", "Composite Index", "Covering Index", "Query Planner", "EXPLAIN", "Index Cardinality"],
    unlocked: false,
    icon: "📑",
    color: "from-cyan-500 to-blue-500",
    story: "A simple query brings your database to its knees. Time to learn why.",
    part: "HLD Data Layer",
    difficulty: "Intermediate"
  },

  // ========================================
  // PART 3: HLD COMMUNICATION (Levels 11-15)
  // ========================================
  {
    id: 11,
    title: "Message in a Bottle",
    subtitle: "Message Queues & Async Processing",
    description: "Not everything needs an immediate response. Message queues let your systems breathe.",
    concepts: ["Message Queue", "Producer/Consumer", "Kafka", "RabbitMQ", "SQS", "Dead Letter Queue", "Backpressure", "At-Least-Once"],
    unlocked: false,
    icon: "📬",
    color: "from-violet-500 to-purple-500",
    story: "A flash sale! 100,000 orders in 10 seconds. Your order service can only handle 100/second.",
    part: "HLD Communication",
    difficulty: "Intermediate"
  },
  {
    id: 12,
    title: "The Broadcast",
    subtitle: "Pub/Sub & Event-Driven Architecture",
    description: "When multiple services need to know about something, don't call them one by one. Broadcast!",
    concepts: ["Pub/Sub", "Event-Driven", "Event Sourcing", "CQRS", "Event Bus", "Fan-out", "Decoupling"],
    unlocked: false,
    icon: "📡",
    color: "from-pink-500 to-rose-500",
    story: "When a user signs up, 5 services need to know. Are you really going to call each one?",
    part: "HLD Communication",
    difficulty: "Intermediate"
  },
  {
    id: 13,
    title: "API Mastery",
    subtitle: "REST, GraphQL, gRPC",
    description: "How do services talk to each other and to clients? Master the art of API design.",
    concepts: ["REST", "GraphQL", "gRPC", "Protocol Buffers", "API Versioning", "HATEOAS", "Idempotency", "Pagination"],
    unlocked: false,
    icon: "🔌",
    color: "from-green-500 to-teal-500",
    story: "Your mobile app needs 5 API calls to render one screen. The web app needs different data. What do you do?",
    part: "HLD Communication",
    difficulty: "Intermediate"
  },
  {
    id: 14,
    title: "Real-Time Rush",
    subtitle: "WebSockets, SSE & Long Polling",
    description: "Sometimes you need data the instant it changes. Let's go real-time.",
    concepts: ["WebSockets", "Server-Sent Events", "Long Polling", "Socket.io", "Connection Pooling", "Heartbeat", "Reconnection"],
    unlocked: false,
    icon: "⚡",
    color: "from-yellow-500 to-amber-500",
    story: "Users want to see chat messages instantly, not after refreshing. Time to go real-time.",
    part: "HLD Communication",
    difficulty: "Intermediate"
  },
  {
    id: 15,
    title: "Speed Limits",
    subtitle: "Rate Limiting & Throttling",
    description: "Without limits, one bad actor can bring down your entire system. Let's set boundaries.",
    concepts: ["Rate Limiting", "Throttling", "Token Bucket", "Leaky Bucket", "Sliding Window", "Fixed Window", "API Quotas"],
    unlocked: false,
    icon: "🚧",
    color: "from-red-500 to-orange-500",
    story: "Someone is hammering your API with 10,000 requests per second. Time to say 'slow down'.",
    part: "HLD Communication",
    difficulty: "Intermediate"
  },

  // ========================================
  // PART 4: HLD MICROSERVICES (Levels 16-20)
  // ========================================
  {
    id: 16,
    title: "Breaking Apart",
    subtitle: "Monolith to Microservices",
    description: "Your monolith is a beast. Learn when, why, and how to break it into smaller services.",
    concepts: ["Microservices", "Monolith", "Service Boundary", "Domain-Driven Design", "Bounded Context", "Strangler Fig Pattern"],
    unlocked: false,
    icon: "🧩",
    color: "from-blue-500 to-indigo-500",
    story: "The auth team wants to deploy. But they're blocked by payments. Something's wrong.",
    part: "HLD Microservices",
    difficulty: "Advanced"
  },
  {
    id: 17,
    title: "The Gatekeeper",
    subtitle: "API Gateway & BFF",
    description: "A single entry point to your microservices. Authentication, routing, rate limiting - all in one place.",
    concepts: ["API Gateway", "BFF Pattern", "Kong", "AWS API Gateway", "Authentication", "Request Routing", "Response Aggregation"],
    unlocked: false,
    icon: "🚪",
    color: "from-purple-500 to-indigo-500",
    story: "Clients are calling 10 different services directly. Security is a nightmare. We need a gatekeeper.",
    part: "HLD Microservices",
    difficulty: "Advanced"
  },
  {
    id: 18,
    title: "Finding Friends",
    subtitle: "Service Discovery & Registry",
    description: "In a world of dynamic IPs and autoscaling, how do services find each other?",
    concepts: ["Service Discovery", "Service Registry", "Consul", "Eureka", "DNS-Based Discovery", "Client-Side vs Server-Side"],
    unlocked: false,
    icon: "🔍",
    color: "from-cyan-500 to-teal-500",
    story: "You spun up 5 new instances of the user service. How does the order service know about them?",
    part: "HLD Microservices",
    difficulty: "Advanced"
  },
  {
    id: 19,
    title: "Failing Gracefully",
    subtitle: "Circuit Breaker & Resilience",
    description: "Services will fail. The question is: will they take down everything else with them?",
    concepts: ["Circuit Breaker", "Bulkhead", "Retry Pattern", "Timeout", "Fallback", "Hystrix", "Resilience4j"],
    unlocked: false,
    icon: "🛡️",
    color: "from-emerald-500 to-green-500",
    story: "The recommendation service is down. Now the entire checkout is failing. This shouldn't happen.",
    part: "HLD Microservices",
    difficulty: "Advanced"
  },
  {
    id: 20,
    title: "The Long Transaction",
    subtitle: "Saga Pattern & Distributed Transactions",
    description: "When a transaction spans multiple services, ACID goes out the window. Enter the Saga.",
    concepts: ["Saga Pattern", "Choreography", "Orchestration", "Compensating Transaction", "Two-Phase Commit", "Outbox Pattern"],
    unlocked: false,
    icon: "🎭",
    color: "from-rose-500 to-pink-500",
    story: "User paid, but inventory update failed. Now they paid for nothing. How do you handle this?",
    part: "HLD Microservices",
    difficulty: "Advanced"
  },

  // ========================================
  // PART 5: HLD INFRASTRUCTURE (Levels 21-25)
  // ========================================
  {
    id: 21,
    title: "Edge of the World",
    subtitle: "CDN & Edge Computing",
    description: "Your users are global. Bring your content closer to them.",
    concepts: ["CDN", "Edge Computing", "PoP", "Cache Headers", "Purging", "Cloudflare", "CloudFront", "Edge Functions"],
    unlocked: false,
    icon: "🌍",
    color: "from-sky-500 to-blue-500",
    story: "Users in Australia complain about 3-second load times. Your server is in Virginia.",
    part: "HLD Infrastructure",
    difficulty: "Advanced"
  },
  {
    id: 22,
    title: "Seek and You Shall Find",
    subtitle: "Search Systems & Elasticsearch",
    description: "Users expect Google-like search. How do you build it?",
    concepts: ["Elasticsearch", "Inverted Index", "Full-Text Search", "Relevance Scoring", "Analyzers", "Sharding", "Aggregations"],
    unlocked: false,
    icon: "🔎",
    color: "from-amber-500 to-orange-500",
    story: "Users want to search millions of products by title, description, and tags. In milliseconds.",
    part: "HLD Infrastructure",
    difficulty: "Advanced"
  },
  {
    id: 23,
    title: "Watching the Watchers",
    subtitle: "Monitoring, Logging & Observability",
    description: "You can't fix what you can't see. Build visibility into every corner of your system.",
    concepts: ["Prometheus", "Grafana", "ELK Stack", "Distributed Tracing", "Jaeger", "Metrics", "Alerts", "SLO/SLA/SLI"],
    unlocked: false,
    icon: "👁️",
    color: "from-violet-500 to-indigo-500",
    story: "Something is wrong. Latency spiked 10x. But you have no idea where or why.",
    part: "HLD Infrastructure",
    difficulty: "Advanced"
  },
  {
    id: 24,
    title: "Lock and Key",
    subtitle: "Security Fundamentals",
    description: "Authentication, authorization, encryption - the holy trinity of security.",
    concepts: ["OAuth 2.0", "JWT", "HTTPS/TLS", "CORS", "XSS", "CSRF", "SQL Injection", "API Keys", "RBAC"],
    unlocked: false,
    icon: "🔐",
    color: "from-red-500 to-rose-500",
    story: "Someone leaked all your users' passwords. Let's make sure this never happens.",
    part: "HLD Infrastructure",
    difficulty: "Advanced"
  },
  {
    id: 25,
    title: "Blob Storage & Object Stores",
    subtitle: "Storing the Big Stuff",
    description: "Images, videos, files - they don't belong in your database. Learn where they do belong.",
    concepts: ["S3", "Object Storage", "Blob Storage", "Presigned URLs", "Multipart Upload", "Lifecycle Policies", "Versioning"],
    unlocked: false,
    icon: "📦",
    color: "from-teal-500 to-cyan-500",
    story: "Users upload 4K videos. Your server runs out of disk space. Where should these files live?",
    part: "HLD Infrastructure",
    difficulty: "Advanced"
  },

  // ========================================
  // PART 6: LLD - OOP FOUNDATIONS (Levels 26-30)
  // ========================================
  {
    id: 26,
    title: "The Four Pillars",
    subtitle: "OOP Fundamentals",
    description: "Encapsulation, Inheritance, Polymorphism, Abstraction - the foundation of object-oriented design.",
    concepts: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Classes", "Objects", "Interfaces"],
    unlocked: false,
    icon: "🏛️",
    color: "from-blue-500 to-purple-500",
    story: "Before you design systems, you must design classes. Let's master the fundamentals.",
    part: "LLD OOP Foundations",
    difficulty: "Intermediate"
  },
  {
    id: 27,
    title: "SOLID Ground",
    subtitle: "SOLID Principles",
    description: "Five principles that separate good code from great code. Master them.",
    concepts: ["Single Responsibility", "Open/Closed", "Liskov Substitution", "Interface Segregation", "Dependency Inversion"],
    unlocked: false,
    icon: "🎯",
    color: "from-green-500 to-emerald-500",
    story: "Your code works, but it's unmaintainable. Every change breaks something else.",
    part: "LLD OOP Foundations",
    difficulty: "Intermediate"
  },
  {
    id: 28,
    title: "Drawing the Blueprint",
    subtitle: "UML Diagrams",
    description: "Before you code, you design. Learn to communicate your designs visually.",
    concepts: ["Class Diagram", "Sequence Diagram", "Use Case Diagram", "Activity Diagram", "Relationships", "Multiplicity"],
    unlocked: false,
    icon: "📐",
    color: "from-indigo-500 to-violet-500",
    story: "The interviewer asks you to design on the whiteboard. Do you know what to draw?",
    part: "LLD OOP Foundations",
    difficulty: "Intermediate"
  },
  {
    id: 29,
    title: "Keep It Simple",
    subtitle: "DRY, KISS, YAGNI & More",
    description: "Design principles that keep your code clean and maintainable.",
    concepts: ["DRY", "KISS", "YAGNI", "Composition over Inheritance", "Law of Demeter", "Separation of Concerns"],
    unlocked: false,
    icon: "✨",
    color: "from-yellow-500 to-orange-500",
    story: "You built a framework when you needed a function. Let's learn when NOT to over-engineer.",
    part: "LLD OOP Foundations",
    difficulty: "Intermediate"
  },
  {
    id: 30,
    title: "Relationships Matter",
    subtitle: "Association, Aggregation, Composition",
    description: "How objects relate to each other defines your entire system structure.",
    concepts: ["Association", "Aggregation", "Composition", "Dependency", "Has-A vs Is-A", "Tight vs Loose Coupling"],
    unlocked: false,
    icon: "🔗",
    color: "from-pink-500 to-rose-500",
    story: "Is a Car 'has-a' Engine or 'is-a' Vehicle? These decisions shape everything.",
    part: "LLD OOP Foundations",
    difficulty: "Intermediate"
  },

  // ========================================
  // PART 7: LLD - CREATIONAL PATTERNS (Levels 31-33)
  // ========================================
  {
    id: 31,
    title: "One and Only",
    subtitle: "Singleton & Factory Patterns",
    description: "Control object creation. Sometimes you need exactly one instance. Sometimes you need flexibility.",
    concepts: ["Singleton Pattern", "Factory Pattern", "Factory Method", "Thread-Safe Singleton", "Lazy Initialization"],
    unlocked: false,
    icon: "🏭",
    color: "from-slate-500 to-gray-600",
    story: "Your database connection pool creates unlimited connections. Your DB crashes. Never again.",
    part: "LLD Creational Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 32,
    title: "Build It Right",
    subtitle: "Builder & Abstract Factory",
    description: "Complex objects need complex construction. Make it clean and flexible.",
    concepts: ["Builder Pattern", "Abstract Factory", "Fluent Interface", "Director", "Telescoping Constructor Anti-pattern"],
    unlocked: false,
    icon: "🔧",
    color: "from-orange-500 to-amber-500",
    story: "Your constructor has 15 parameters. Half are optional. There must be a better way.",
    part: "LLD Creational Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 33,
    title: "Clone Wars",
    subtitle: "Prototype Pattern",
    description: "Sometimes creating an object from scratch is expensive. Why not clone an existing one?",
    concepts: ["Prototype Pattern", "Shallow Copy", "Deep Copy", "Cloneable", "Object Pool", "Registry"],
    unlocked: false,
    icon: "🧬",
    color: "from-purple-500 to-violet-500",
    story: "Creating each game character takes 2 seconds of loading. Players are frustrated.",
    part: "LLD Creational Patterns",
    difficulty: "Intermediate"
  },

  // ========================================
  // PART 8: LLD - STRUCTURAL PATTERNS (Levels 34-37)
  // ========================================
  {
    id: 34,
    title: "Adapt or Die",
    subtitle: "Adapter & Facade Patterns",
    description: "Make incompatible interfaces work together. Simplify complex subsystems.",
    concepts: ["Adapter Pattern", "Facade Pattern", "Wrapper", "Interface Conversion", "Simplification"],
    unlocked: false,
    icon: "🔌",
    color: "from-cyan-500 to-blue-500",
    story: "The new payment API is completely different from the old one. You can't rewrite everything.",
    part: "LLD Structural Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 35,
    title: "Wrap It Up",
    subtitle: "Decorator & Proxy Patterns",
    description: "Add behavior to objects dynamically. Control access to objects.",
    concepts: ["Decorator Pattern", "Proxy Pattern", "Virtual Proxy", "Protection Proxy", "Dynamic Behavior"],
    unlocked: false,
    icon: "🎁",
    color: "from-pink-500 to-purple-500",
    story: "You need logging, caching, and authentication - but not always. How do you add them flexibly?",
    part: "LLD Structural Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 36,
    title: "Tree of Objects",
    subtitle: "Composite & Bridge Patterns",
    description: "Treat individual objects and groups uniformly. Separate abstraction from implementation.",
    concepts: ["Composite Pattern", "Bridge Pattern", "Tree Structure", "Part-Whole Hierarchy", "Decoupling"],
    unlocked: false,
    icon: "🌳",
    color: "from-green-500 to-teal-500",
    story: "Your file system has files and folders. Folders contain files and... other folders. How do you model this?",
    part: "LLD Structural Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 37,
    title: "Sharing is Caring",
    subtitle: "Flyweight Pattern",
    description: "When you have millions of similar objects, share the common parts.",
    concepts: ["Flyweight Pattern", "Intrinsic State", "Extrinsic State", "Object Sharing", "Memory Optimization"],
    unlocked: false,
    icon: "🪶",
    color: "from-amber-500 to-yellow-500",
    story: "Your text editor creates a new object for each character. With a million characters, you're out of memory.",
    part: "LLD Structural Patterns",
    difficulty: "Advanced"
  },

  // ========================================
  // PART 9: LLD - BEHAVIORAL PATTERNS (Levels 38-43)
  // ========================================
  {
    id: 38,
    title: "Watch and React",
    subtitle: "Observer & Mediator Patterns",
    description: "When one thing changes, many need to know. But they shouldn't know about each other.",
    concepts: ["Observer Pattern", "Mediator Pattern", "Event Listener", "Publish-Subscribe", "Decoupling"],
    unlocked: false,
    icon: "👀",
    color: "from-violet-500 to-purple-500",
    story: "The stock price changes. The UI, the alert system, and the logger all need to update. How?",
    part: "LLD Behavioral Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 39,
    title: "Choose Your Fighter",
    subtitle: "Strategy & State Patterns",
    description: "Change algorithms at runtime. Change behavior based on internal state.",
    concepts: ["Strategy Pattern", "State Pattern", "Context", "Runtime Algorithm Selection", "State Machine"],
    unlocked: false,
    icon: "🎮",
    color: "from-red-500 to-orange-500",
    story: "Your game character behaves differently when walking, running, or flying. If-else chains are getting crazy.",
    part: "LLD Behavioral Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 40,
    title: "Command & Conquer",
    subtitle: "Command & Chain of Responsibility",
    description: "Encapsulate requests as objects. Pass requests along a chain of handlers.",
    concepts: ["Command Pattern", "Chain of Responsibility", "Invoker", "Receiver", "Undo/Redo", "Request Pipeline"],
    unlocked: false,
    icon: "⛓️",
    color: "from-slate-500 to-zinc-600",
    story: "Users want to undo their actions. You need to record what they did. How do you model actions?",
    part: "LLD Behavioral Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 41,
    title: "The Template",
    subtitle: "Template Method & Iterator",
    description: "Define the skeleton of an algorithm. Traverse collections without exposing internals.",
    concepts: ["Template Method", "Iterator Pattern", "Hook Methods", "Hollywood Principle", "Internal vs External Iterator"],
    unlocked: false,
    icon: "📋",
    color: "from-blue-500 to-cyan-500",
    story: "All your reports follow the same structure, but details differ. How do you avoid code duplication?",
    part: "LLD Behavioral Patterns",
    difficulty: "Intermediate"
  },
  {
    id: 42,
    title: "Remember Me",
    subtitle: "Memento & Visitor Patterns",
    description: "Capture and restore object state. Add operations to objects without modifying them.",
    concepts: ["Memento Pattern", "Visitor Pattern", "Snapshot", "State History", "Double Dispatch"],
    unlocked: false,
    icon: "💾",
    color: "from-indigo-500 to-blue-500",
    story: "Users want to save their game and load it later. The game state is complex. How do you snapshot it?",
    part: "LLD Behavioral Patterns",
    difficulty: "Advanced"
  },
  {
    id: 43,
    title: "Null is Not Nothing",
    subtitle: "Null Object & Specification Patterns",
    description: "Avoid null checks. Combine business rules flexibly.",
    concepts: ["Null Object Pattern", "Specification Pattern", "Business Rules", "Composite Specification", "Null Safety"],
    unlocked: false,
    icon: "∅",
    color: "from-gray-500 to-slate-600",
    story: "Your code has null checks everywhere. One missed check = NullPointerException in production.",
    part: "LLD Behavioral Patterns",
    difficulty: "Advanced"
  },

  // ========================================
  // PART 10: LLD INTERVIEW PROBLEMS (Levels 44-50)
  // ========================================
  {
    id: 44,
    title: "Park It Right",
    subtitle: "Design a Parking Lot",
    description: "The classic LLD interview problem. Multiple floors, vehicle types, payment - design it all.",
    concepts: ["Class Design", "Inheritance", "Enums", "Strategy Pattern", "State Management"],
    unlocked: false,
    icon: "🅿️",
    color: "from-blue-600 to-blue-800",
    story: "\"Design a parking lot system\" - every interviewer's favorite question. Let's nail it.",
    part: "LLD Interview Problems",
    difficulty: "Advanced"
  },
  {
    id: 45,
    title: "Checkmate",
    subtitle: "Design a Chess Game",
    description: "Pieces, moves, rules, check, checkmate - model the entire game with clean OOP.",
    concepts: ["Inheritance", "Polymorphism", "Game State", "Move Validation", "Observer Pattern"],
    unlocked: false,
    icon: "♟️",
    color: "from-gray-700 to-gray-900",
    story: "\"Design a chess game\" - can you model pieces, valid moves, and game rules elegantly?",
    part: "LLD Interview Problems",
    difficulty: "Advanced"
  },
  {
    id: 46,
    title: "Going Up",
    subtitle: "Design an Elevator System",
    description: "Multiple elevators, multiple floors, optimization algorithms - a classic system design problem.",
    concepts: ["State Machine", "Strategy Pattern", "Scheduling Algorithms", "Concurrency"],
    unlocked: false,
    icon: "🛗",
    color: "from-zinc-600 to-zinc-800",
    story: "A 50-floor building with 6 elevators. How do you minimize wait times?",
    part: "LLD Interview Problems",
    difficulty: "Advanced"
  },
  {
    id: 47,
    title: "Book Your Show",
    subtitle: "Design BookMyShow",
    description: "Movie booking system with theaters, shows, seats, and concurrent booking handling.",
    concepts: ["Seat Locking", "Concurrent Access", "Payment Integration", "State Management"],
    unlocked: false,
    icon: "🎬",
    color: "from-red-600 to-rose-700",
    story: "Two users select the same seat at the same time. Only one should get it. How?",
    part: "LLD Interview Problems",
    difficulty: "Advanced"
  },
  {
    id: 48,
    title: "Split the Bill",
    subtitle: "Design Splitwise",
    description: "Expense sharing, debt simplification, and group management.",
    concepts: ["Graph Algorithms", "Debt Simplification", "Group Management", "Transaction History"],
    unlocked: false,
    icon: "💰",
    color: "from-green-600 to-emerald-700",
    story: "Friends share expenses. A owes B, B owes C, C owes A. Simplify the debts.",
    part: "LLD Interview Problems",
    difficulty: "Advanced"
  },
  {
    id: 49,
    title: "Snakes and Ladders",
    subtitle: "Design Snake & Ladder Game",
    description: "Board game with multiplayer support, special cells, and game rules.",
    concepts: ["Game Loop", "State Machine", "Random Events", "Player Management"],
    unlocked: false,
    icon: "🐍",
    color: "from-yellow-600 to-amber-700",
    story: "Design a Snake and Ladder game that supports multiple players and custom boards.",
    part: "LLD Interview Problems",
    difficulty: "Intermediate"
  },
  {
    id: 50,
    title: "Vending Machine",
    subtitle: "Design a Vending Machine",
    description: "State machine, inventory, payment, and dispensing logic.",
    concepts: ["State Pattern", "Inventory Management", "Payment Processing", "State Machine"],
    unlocked: false,
    icon: "🥤",
    color: "from-purple-600 to-violet-700",
    story: "Insert coin, select product, get snack. Simple? The state machine says otherwise.",
    part: "LLD Interview Problems",
    difficulty: "Intermediate"
  },

  // ========================================
  // PART 11: HLD CASE STUDIES (Levels 51-60)
  // ========================================
  {
    id: 51,
    title: "Design Twitter",
    subtitle: "Social Media at Scale",
    description: "Tweets, followers, timeline generation, trends - design a system for 500M users.",
    concepts: ["Fan-out", "Timeline Generation", "Caching", "Sharding", "Search", "Trending"],
    unlocked: false,
    icon: "🐦",
    color: "from-sky-500 to-blue-600",
    story: "500 million users, 500 million tweets per day. How does Twitter actually work?",
    part: "HLD Case Studies",
    difficulty: "Expert"
  },
  {
    id: 52,
    title: "Design Instagram",
    subtitle: "Photo Sharing at Scale",
    description: "Image upload, processing, feed generation, stories - design the visual social network.",
    concepts: ["Image Processing", "CDN", "Feed Algorithm", "Object Storage", "Recommendation"],
    unlocked: false,
    icon: "📸",
    color: "from-pink-500 to-purple-600",
    story: "2 billion users sharing photos. How do you store, process, and serve them all?",
    part: "HLD Case Studies",
    difficulty: "Expert"
  },
  {
    id: 53,
    title: "Design Netflix",
    subtitle: "Streaming at Scale",
    description: "Video encoding, adaptive streaming, recommendations, global CDN - build the entertainment giant.",
    concepts: ["Video Transcoding", "Adaptive Bitrate", "CDN", "Recommendation Engine", "A/B Testing"],
    unlocked: false,
    icon: "🎬",
    color: "from-red-600 to-red-800",
    story: "220 million subscribers streaming simultaneously. How does Netflix never buffer?",
    part: "HLD Case Studies",
    difficulty: "Expert"
  },
  {
    id: 54,
    title: "Design Uber",
    subtitle: "Ride-Sharing Architecture",
    description: "Real-time matching, dynamic pricing, ETA calculation, payment processing.",
    concepts: ["Geospatial Indexing", "Real-time Matching", "Surge Pricing", "ETA Algorithms", "Payment"],
    unlocked: false,
    icon: "🚗",
    color: "from-gray-800 to-gray-900",
    story: "Match riders with drivers in real-time, across 10,000 cities. Go.",
    part: "HLD Case Studies",
    difficulty: "Expert"
  },
  {
    id: 55,
    title: "Design WhatsApp",
    subtitle: "Messaging at Scale",
    description: "End-to-end encryption, message delivery, group chats, presence - design the messenger.",
    concepts: ["E2E Encryption", "Message Queue", "Presence System", "Group Management", "Media Transfer"],
    unlocked: false,
    icon: "💬",
    color: "from-green-500 to-green-700",
    story: "100 billion messages per day, end-to-end encrypted. Design WhatsApp.",
    part: "HLD Case Studies",
    difficulty: "Expert"
  },
  {
    id: 56,
    title: "Design YouTube",
    subtitle: "Video Platform Architecture",
    description: "Video upload, processing, streaming, recommendations, comments - the video giant.",
    concepts: ["Video Processing Pipeline", "Recommendation Algorithm", "Comments System", "Live Streaming"],
    unlocked: false,
    icon: "▶️",
    color: "from-red-500 to-red-700",
    story: "500 hours of video uploaded every minute. How does YouTube handle it?",
    part: "HLD Case Studies",
    difficulty: "Expert"
  },
  {
    id: 57,
    title: "Design URL Shortener",
    subtitle: "TinyURL Architecture",
    description: "Generate short URLs, redirect, analytics - a deceptively simple system with deep complexity.",
    concepts: ["Base62 Encoding", "Hash Collision", "Analytics", "Caching", "Redirection"],
    unlocked: false,
    icon: "🔗",
    color: "from-teal-500 to-cyan-600",
    story: "Turn long URLs into short ones. Easy? Let's see how it scales to billions.",
    part: "HLD Case Studies",
    difficulty: "Intermediate"
  },
  {
    id: 58,
    title: "Design Rate Limiter",
    subtitle: "API Protection System",
    description: "Token bucket, sliding window, distributed rate limiting - protect your APIs.",
    concepts: ["Token Bucket", "Sliding Window Log", "Fixed Window Counter", "Distributed Rate Limiting"],
    unlocked: false,
    icon: "⏱️",
    color: "from-orange-500 to-amber-600",
    story: "Your API is getting hammered. Design a system to say 'slow down' gracefully.",
    part: "HLD Case Studies",
    difficulty: "Intermediate"
  },
  {
    id: 59,
    title: "Design Notification System",
    subtitle: "Push, Email, SMS at Scale",
    description: "Multi-channel notifications, prioritization, rate limiting, user preferences.",
    concepts: ["Message Prioritization", "Channel Selection", "User Preferences", "Delivery Tracking"],
    unlocked: false,
    icon: "🔔",
    color: "from-violet-500 to-purple-600",
    story: "Send the right notification, to the right user, on the right channel, at the right time.",
    part: "HLD Case Studies",
    difficulty: "Advanced"
  },
  {
    id: 60,
    title: "Design Google Docs",
    subtitle: "Real-time Collaboration",
    description: "Concurrent editing, operational transformation, conflict resolution - collaborative editing magic.",
    concepts: ["Operational Transformation", "CRDT", "Conflict Resolution", "Real-time Sync", "Cursor Presence"],
    unlocked: false,
    icon: "📝",
    color: "from-blue-500 to-indigo-600",
    story: "50 people editing one document simultaneously. No conflicts. How?",
    part: "HLD Case Studies",
    difficulty: "Expert"
  }
]

// Achievement definitions expanded
export const ACHIEVEMENTS = [
  // Fundamentals
  { id: 'first_request', name: 'Hello, World!', description: 'Send your first HTTP request', icon: '👋', unlocked: false },
  { id: 'server_crash', name: 'Oops!', description: 'Crash your first server', icon: '💥', unlocked: false },
  { id: 'scale_up', name: 'Power Up', description: 'Vertically scale a server', icon: '💪', unlocked: false },
  { id: 'scale_out', name: 'Multiply', description: 'Add your first replica', icon: '✨', unlocked: false },
  { id: 'load_balance', name: 'Traffic Director', description: 'Balance load across 3+ servers', icon: '🎯', unlocked: false },
  { id: 'cache_hit', name: 'Memory Master', description: 'Achieve 90%+ cache hit rate', icon: '🧠', unlocked: false },

  // Data Layer
  { id: 'shard_master', name: 'Data Splitter', description: 'Successfully shard a database', icon: '⚔️', unlocked: false },
  { id: 'cap_survivor', name: 'Tradeoff Tactician', description: 'Navigate a CAP scenario', icon: '⚖️', unlocked: false },
  { id: 'consistent_hash', name: 'Ring Bearer', description: 'Master consistent hashing', icon: '💍', unlocked: false },

  // Communication
  { id: 'queue_hero', name: 'Patient One', description: 'Handle a traffic spike with queues', icon: '📬', unlocked: false },
  { id: 'realtime_master', name: 'Speed Demon', description: 'Build a real-time system', icon: '⚡', unlocked: false },
  { id: 'api_designer', name: 'Contract Writer', description: 'Design a clean API', icon: '📜', unlocked: false },

  // Microservices
  { id: 'microservices', name: 'Service Architect', description: 'Design a microservices system', icon: '🏗️', unlocked: false },
  { id: 'circuit_breaker', name: 'Fault Tolerant', description: 'Implement circuit breaker pattern', icon: '🛡️', unlocked: false },
  { id: 'saga_master', name: 'Transaction Master', description: 'Complete a distributed saga', icon: '🎭', unlocked: false },

  // Infrastructure
  { id: 'global_cdn', name: 'World Wide', description: 'Deploy content globally', icon: '🌍', unlocked: false },
  { id: 'security_expert', name: 'Lock Smith', description: 'Secure a system end-to-end', icon: '🔐', unlocked: false },
  { id: 'observability', name: 'All-Seeing Eye', description: 'Implement full observability', icon: '👁️', unlocked: false },

  // LLD
  { id: 'solid_master', name: 'SOLID Foundation', description: 'Master all SOLID principles', icon: '🎯', unlocked: false },
  { id: 'pattern_collector', name: 'Pattern Master', description: 'Learn 10 design patterns', icon: '🏆', unlocked: false },
  { id: 'lld_interviewer', name: 'Class Designer', description: 'Solve an LLD interview problem', icon: '♟️', unlocked: false },

  // Case Studies
  { id: 'twitter_architect', name: 'Tweeter', description: 'Design Twitter', icon: '🐦', unlocked: false },
  { id: 'uber_architect', name: 'Ride Master', description: 'Design Uber', icon: '🚗', unlocked: false },
  { id: 'netflix_architect', name: 'Stream King', description: 'Design Netflix', icon: '🎬', unlocked: false },

  // General
  { id: 'speedrun', name: 'Speed Run', description: 'Complete a level in under 5 minutes', icon: '⏱️', unlocked: false },
  { id: 'perfectionist', name: 'Perfectionist', description: 'Get 100% on any level quiz', icon: '💯', unlocked: false },
  { id: 'curious', name: 'Curious Mind', description: 'Read 20 "Deep Dive" sections', icon: '🔍', unlocked: false },
  { id: 'terminology', name: 'Fluent Speaker', description: 'Learn 100 system design terms', icon: '📚', unlocked: false },
  { id: 'completionist', name: 'Completionist', description: 'Complete all 60 levels', icon: '👑', unlocked: false },
  { id: 'hld_master', name: 'HLD Master', description: 'Complete all HLD levels', icon: '🏛️', unlocked: false },
  { id: 'lld_master', name: 'LLD Master', description: 'Complete all LLD levels', icon: '🔧', unlocked: false },
]

const useGameStore = create(
  persist(
    (set, get) => ({
      // Player state
      playerName: '',
      currentLevel: 1,
      completedLevels: [],
      xp: 0,

      // Progress within levels
      levelProgress: {},

      // Unlocked achievements
      achievements: ACHIEVEMENTS.map(a => ({ ...a })),

      // Terminology learned
      learnedTerms: [],

      // Deep dives read
      deepDivesRead: [],

      // Settings
      settings: {
        soundEnabled: true,
        animationsEnabled: true,
      },

      // Actions
      setPlayerName: (name) => set({ playerName: name }),

      completeLevel: (levelId) => {
        const { completedLevels, xp } = get()
        if (!completedLevels.includes(levelId)) {
          set({
            completedLevels: [...completedLevels, levelId],
            xp: xp + (levelId * 100), // More XP for later levels
            currentLevel: Math.max(get().currentLevel, levelId + 1)
          })
        }
      },

      unlockLevel: (levelId) => {
        const { completedLevels } = get()
        return levelId === 1 || completedLevels.includes(levelId - 1)
      },

      updateLevelProgress: (levelId, progress) => {
        const { levelProgress } = get()
        set({
          levelProgress: {
            ...levelProgress,
            [levelId]: { ...(levelProgress[levelId] || {}), ...progress }
          }
        })
      },

      unlockAchievement: (achievementId) => {
        const { achievements, xp } = get()
        const updated = achievements.map(a =>
          a.id === achievementId ? { ...a, unlocked: true } : a
        )
        set({
          achievements: updated,
          xp: xp + 50
        })
      },

      learnTerm: (term) => {
        const { learnedTerms, xp } = get()
        if (!learnedTerms.includes(term)) {
          set({
            learnedTerms: [...learnedTerms, term],
            xp: xp + 10
          })
        }
      },

      markDeepDiveRead: (deepDiveId) => {
        const { deepDivesRead, xp } = get()
        if (!deepDivesRead.includes(deepDiveId)) {
          set({
            deepDivesRead: [...deepDivesRead, deepDiveId],
            xp: xp + 25
          })
        }
      },

      updateSettings: (newSettings) => {
        const { settings } = get()
        set({ settings: { ...settings, ...newSettings } })
      },

      resetProgress: () => set({
        currentLevel: 1,
        completedLevels: [],
        xp: 0,
        levelProgress: {},
        achievements: ACHIEVEMENTS.map(a => ({ ...a })),
        learnedTerms: [],
        deepDivesRead: [],
      }),

      // Computed
      getLevel: (levelId) => LEVELS.find(l => l.id === levelId),
      isLevelUnlocked: (levelId) => {
        return true // All levels unlocked for free study
      },
      getPlayerLevel: () => {
        const { xp } = get()
        return Math.floor(Math.sqrt(xp / 100)) + 1
      },
      getXpForNextLevel: () => {
        const playerLevel = get().getPlayerLevel()
        return Math.pow(playerLevel, 2) * 100
      },
      getLevelsByPart: () => {
        const parts = {}
        LEVELS.forEach(level => {
          if (!parts[level.part]) parts[level.part] = []
          parts[level.part].push(level)
        })
        return parts
      }
    }),
    {
      name: 'scale-quest-storage',
    }
  )
)

export default useGameStore

export const profile = {
  name: 'Hoh Kok Young',
  role: 'Software Engineer',
  company: 'The Software Practice',
  location: 'Singapore',
  email: 'kokyoung1520@gmail.com',
  github: 'https://github.com/hohkokyoung',
  linkedin: 'https://www.linkedin.com/in/kokyoung',
}

// The wheel, in order. `media` is what the card shows.
export const work = [
  {
    id: 'pokerag',
    title: 'pokérag',
    kind: 'Web app, AI retrieval',
    year: '2026',
    tagline: 'A Pokédex with an assistant that cites its sources.',
    summary:
      'Browse all 1,025 Pokémon, build and grade teams, run damage and catch-rate calculations, and ask questions in plain English. Every answer cites the records it came from, and says so when the data can’t answer.',
    highlights: [
      {
        title: 'Plans, not prompts',
        body: 'Each question becomes one to six typed tool calls. A keyword planner handles confident cases, so a question costs at most three LLM calls and closed-form ones cost none.',
      },
      {
        title: 'SQL first, vectors for prose',
        body: 'Rankings, learnsets and matchups are exact SQL. Lore questions use pgvector and full-text search merged with Reciprocal Rank Fusion.',
      },
      {
        title: 'Cite or abstain',
        body: 'The model only sees numbered chunks and must cite them or decline. A labelled eval set grades plans, recall, citations and abstention.',
      },
      {
        title: 'Works without a key',
        body: 'Rankings, learn checks, type charts and damage results are written by code. With no LLM key, or on a 429 or timeout, it falls back to an extractive answer that quotes the chunks.',
      },
      {
        title: 'Local embeddings',
        body: 'About 9,500 chunks, a profile per Pokémon plus every English dex entry, embedded locally with bge-small under an HNSW index. No embedding API.',
      },
      {
        title: 'Coaches that ask first',
        body: 'The team coach and damage-calc coach run on the same agent. They can propose set changes and drafts, but writes are gated in code behind the user’s click.',
      },
    ],
    stack: ['Next.js', 'React 19', 'FastAPI', 'PostgreSQL', 'pgvector', 'Claude API'],
    links: [
      { label: 'Source', href: 'https://github.com/hohkokyoung/pokedex-rag' },
      { label: 'Full 2-minute tour', href: 'https://github.com/hohkokyoung/pokedex-rag/blob/main/docs/media/pokerag-tour.mp4' },
    ],
    media: { type: 'video', src: 'media/pokerag-promo.mp4', poster: 'media/pokerag-poster.jpg', audio: false },
    diagram: 'pokerag',
  },
  {
    id: 'snuggle',
    title: 'Snuggle',
    kind: 'Mobile app, full stack',
    year: '2026',
    tagline: 'A dating app whose rules are enforced by the database.',
    summary:
      'Swipe through a ranked deck of people nearby, match when a like is mutual, and chat in real time with typing indicators, photos and push notifications. Premium adds Boosts, Incognito, Rewind and advanced filters.',
    highlights: [
      {
        title: 'Security in Postgres',
        body: 'The app talks to Supabase directly for chat and photos, so premium, incognito and blocks are enforced with row-level security, not just API checks.',
      },
      {
        title: 'A fair Discover deck',
        body: 'One database function scores activity, distance, profile quality and newness, then damps popular profiles so attention spreads out.',
      },
      {
        title: 'Chat that feels instant',
        body: 'Messages are stored on the device, appear before the server confirms, and sync over one realtime channel per conversation.',
      },
      {
        title: 'Matches can’t be missed',
        body: 'The database creates a match the moment a like becomes mutual. Each pair is stored once in a fixed order, so simultaneous likes can’t duplicate it.',
      },
      {
        title: 'Premium that can’t be bypassed',
        body: 'Incognito is a row rule, hidden activity is blocked at the realtime channel, and a constraint makes a second free Boost impossible even with two requests at once.',
      },
      {
        title: 'Private photos',
        body: 'Every photo is served through a link that expires in an hour. Locked “Liked You” cards carry an encrypted token, not a user id, and every reveal is re-checked.',
      },
      {
        title: 'House rules as tests',
        body: 'Tests read the source: no hard-coded colours, no uncapped queries, no unsigned photos, no swallowed errors. They run after every edit through Claude Code hooks.',
      },
    ],
    stack: ['Flutter', 'Riverpod', 'FastAPI', 'Supabase', 'PostgreSQL', 'Redis', 'FCM'],
    links: [],
    note: 'Source is private. Happy to walk through it on a call.',
    media: { type: 'video', src: 'media/snuggle-demo.mp4', poster: 'media/snuggle-poster.jpg', audio: true },
    gallery: {
      device: 'phone',
      shots: [
        { src: 'media/snuggle-discover.jpg', caption: 'Discover' },
        { src: 'media/snuggle-details.jpg', caption: 'Profile details' },
        { src: 'media/snuggle-match.jpg', caption: 'It’s a match' },
        { src: 'media/snuggle-chat.jpg', caption: 'Chat' },
        { src: 'media/snuggle-activity.jpg', caption: 'Activity' },
        { src: 'media/snuggle-profile.jpg', caption: 'Your profile' },
        { src: 'media/snuggle-premium.jpg', caption: 'Premium' },
        { src: 'media/snuggle-filters.jpg', caption: 'Filters' },
      ],
    },
    diagram: 'snuggle',
  },
  {
    id: 'ticket-rag',
    title: 'Ticket RAG',
    kind: 'AI retrieval, evaluation',
    year: '2026',
    tagline: 'Suggests a resolution for a new support ticket from 34,000 past ones.',
    summary:
      'Given a new ticket, it finds the most relevant historical tickets across several languages and drafts a resolution with an LLM. The interesting part is the measurement: retrieval and answers are scored against real resolutions.',
    highlights: [
      {
        title: 'Hybrid retrieval',
        body: 'Dense and BM25 search fused with Reciprocal Rank Fusion, with HyDE query expansion and MMR for diversity, then reranked by a cross-encoder.',
      },
      {
        title: 'Measured, not eyeballed',
        body: '70% category precision@1. Answers scored 4.38 / 5 by an LLM judge and 0.915 cosine similarity against human-written resolutions.',
      },
    ],
    stack: ['Python', 'Claude API', 'Groq', 'Vector DB', 'BM25', 'Cross-encoder'],
    links: [{ label: 'Source', href: 'https://github.com/hohkokyoung/ticket-rag' }],
    media: { type: 'visual', visual: 'rrf' },
  },
  {
    id: 'leap',
    title: 'SLA Land Portal',
    kind: 'Government platform, at work',
    year: '2022 – now',
    tagline: 'Singapore Land Authority’s platform for land sales and leases.',
    summary:
      'The Land Enhancement Administration Portal, intranet and internet, which modernised how the government sells State land and manages leases. I co-lead its development and maintenance at The Software Practice.',
    highlights: [
      {
        title: 'Real payments',
        body: 'Led the payment gateway integration that collects hundreds of thousands in land betterment charges via PayNow or fund transfer, with safeguards against unauthorised and duplicate payments.',
      },
      {
        title: 'Migrations without loss',
        body: 'Led migrations of 100,000+ records and files while keeping integrity and backwards compatibility.',
      },
      {
        title: 'Built to government standards',
        body: 'Input sanitisation, PII masking and compliance-aligned audit logging, with 80%+ test coverage and SonarQube in CI.',
      },
      {
        title: 'A pipeline that checks itself',
        body: 'GitLab Runner CI with SonarQube vulnerability and code-smell scans, Moq-isolated unit tests, and per-environment VM deployments.',
      },
      {
        title: 'Agents in the team’s workflow',
        body: 'Introduced an agentic development workflow to the team: 60% faster delivery and 20% fewer recurring tickets.',
      },
    ],
    stack: ['C#', 'ASP.NET Razor Pages', 'EF Core', 'MySQL', 'Alpine.js', 'AWS'],
    links: [{ label: 'Live site', href: 'https://app.sla.gov.sg/leap' }],
    media: { type: 'image', src: 'media/leap.jpg', alt: 'The Land Enhancement Administration Portal landing page' },
  },
  {
    id: 'stangent',
    title: 'Stangent',
    kind: 'Developer tooling, agents',
    year: '2026',
    tagline: 'A Claude Code workflow that turns a written spec into tested code.',
    summary:
      'An agentic development workflow that installs into any project. Agents are organised by role, not by stack: a planner, implementer, reviewer and docs writer hand work along a pipeline from spec to committed, tested code.',
    highlights: [
      {
        title: 'Catch it before coding',
        body: 'Checks a spec for contradictions and bootstraps architectural decisions before any code is written.',
      },
      {
        title: 'Grounded in the real schema',
        body: 'Reads the live database schema through DBHub MCP, so generated code matches the actual tables.',
      },
    ],
    stack: ['Claude Code', 'Multi-agent', 'MCP', 'Python'],
    links: [{ label: 'Source', href: 'https://github.com/hohkokyoung/stangent' }],
    media: { type: 'visual', visual: 'planner' },
  },
  {
    id: 'cyberbullying',
    title: 'Cyberbullying Detection',
    kind: 'Machine learning, final-year project',
    year: '2021',
    tagline: 'Flags cyberbullying on Twitter/X for Malaysian agencies and NGOs.',
    summary:
      'A year-long project built after interviews with victims, government agencies and NGOs. It streams tweets, flags likely cyberbullying, and lets agencies reach the people involved directly.',
    highlights: [
      {
        title: 'A model for how Malaysians write',
        body: 'A custom sentiment model trained on code-switched Malay–English text, reaching 88% recall.',
      },
      {
        title: 'Private by default',
        body: 'Traceable user information is encrypted with AES-256, with JWT authentication and role-based access.',
      },
      {
        title: 'Built with the people it serves',
        body: 'Requirements came from interviews with victims, agencies and NGOs. A D3.js map shows where incidents cluster so agencies can respond.',
      },
    ],
    stack: ['TensorFlow', 'scikit-learn', 'Flask', 'React', 'D3.js', 'MongoDB'],
    links: [{ label: 'Source', href: 'https://github.com/hohkokyoung/cyberbullying-detection-system' }],
    media: { type: 'visual', visual: 'map' },
    gallery: {
      device: 'desktop',
      shots: [
        { src: 'media/cds-dashboard-map.jpg', caption: 'Incidents by state on the dashboard map' },
        { src: 'media/cds-dashboard.jpg', caption: 'Dashboard: weekly statistics and incident trend' },
        { src: 'media/cds-messages.jpg', caption: 'A profile’s flagged incidents, with reply and dismiss actions' },
        { src: 'media/cds-support-messages.jpg', caption: 'Sending a private support message' },
        { src: 'media/cds-login.jpg', caption: 'Sign-in for agencies and NGOs' },
        { src: 'media/cds-system-architecture.jpg', caption: 'System architecture' },
      ],
    },
  },
]

export const experiences = [
  {
    company: 'The Software Practice',
    location: 'Singapore',
    role: 'Software Engineer',
    period: 'Sep 2022 – now',
    points: [
      'Co-lead Singapore Land Authority’s land portal',
      'Built its PayNow payment gateway',
      'Migrated 100,000+ records without loss',
      'Agentic workflow: 60% faster delivery',
      'CI/CD with SonarQube, 80%+ test coverage',
    ],
  },
  {
    company: 'Redsquare Software',
    location: 'Kuala Lumpur',
    role: 'Junior Software Engineer',
    period: 'Aug 2021 – Aug 2022',
    points: ['Built MyWheels, a used-car marketplace', 'Fixed N+1 queries, added SSR', 'Signed URLs for private files'],
  },
  {
    company: 'Redsquare Software',
    location: 'Kuala Lumpur',
    role: 'Software Engineer Intern',
    period: 'Jul 2020 – Nov 2020',
    points: ['Built a React Native talent-booking app', 'Made report generation 20% faster'],
  },
]

export const skills = [
  { group: 'Languages', items: 'Python, TypeScript, C#, Dart, SQL' },
  { group: 'Product', items: 'React, Next.js, Flutter, FastAPI, ASP.NET, Django' },
  { group: 'AI', items: 'Claude API, RAG, pgvector, multi-agent, LLM evals' },
  { group: 'Data and infra', items: 'PostgreSQL, MySQL, Supabase, Redis, AWS, Docker' },
]

export const education = [
  { degree: 'BSc (Hons) Software Engineering', school: 'Asia Pacific University × Staffordshire', note: 'First Class, Best Student Award, GPA 3.93', year: '2021' },
  { degree: 'Diploma in ICT, Software Engineering', school: 'Asia Pacific University', note: 'GPA 3.97', year: '2019' },
  { degree: 'AWS Solutions Architect, Associate', school: 'Amazon Web Services', year: '2022' },
  { degree: 'AWS Cloud Practitioner', school: 'Amazon Web Services', year: '2021' },
]

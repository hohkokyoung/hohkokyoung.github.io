export const experiences = [
  {
    company: 'The Software Practice (TSP) Pte Ltd',
    location: 'Singapore, SG',
    role: 'Software Engineer',
    period: 'Sep 2022 – Present',
    current: true,
    highlights: [
      'Co-led development & maintenance of the Singapore Land Authority – Land Enhancement Administration Portal (intranet + internet), modernizing government land sales and lease management using C#, EF Core, ASP.NET Razor Pages, MySQL, Alpine.js, Tailwind CSS, and AWS.',
      'Led integration of third-party payment gateway enabling organizations to process hundreds of thousands in land betterment charges via PayNow or fund transfer, with safeguards against unauthorized or duplicate payments.',
      'Led multiple data migrations of 100,000+ records and files, ensuring data integrity, stability, and backwards compatibility for further data patching.',
      'Integrated agentic development workflow into internal engineering processes using Copilot, improving development efficiency by 60% and reducing recurring tickets by 20%.',
      'Built CI/CD pipeline with GitLab Runner for automated SonarQube vulnerability & code smell scanning and per-environment VM deployments.',
      'Achieved 80%+ code coverage using Moq — implementing mocking techniques to isolate dependencies and enhance test reliability.',
      'Hardened security via input sanitization, PII masking, and compliance-aligned DB operation logging per Singaporean government standards.',
      'Supervised junior engineers, conducted code reviews, and authored sequence diagrams to communicate implementations to stakeholders.',
    ],
  },
  {
    company: 'Redsquare Software Sdn Bhd',
    location: 'Kuala Lumpur, KL',
    role: 'Junior Software Engineer',
    period: 'Aug 2021 – Aug 2022',
    current: false,
    highlights: [
      'Developed second-hand car sales platform MyWheels using Python (Django), GraphQL, Wagtail CMS, React, and AWS (RDS & S3).',
      'Improved website performance by eliminating N+1 query problems and reducing time complexities.',
      'Built a daily fuel price scraper using BeautifulSoup and CronJob.',
      'Enhanced security with signed URLs for private images and one-time token-based file downloads to prevent anonymous access.',
      'Implemented SSR on key pages for faster load times and top SERP rankings.',
    ],
  },
  {
    company: 'Redsquare Software Sdn Bhd',
    location: 'Kuala Lumpur, KL',
    role: 'Software Engineer Intern',
    period: 'Jul 2020 – Nov 2020',
    current: false,
    highlights: [
      'Built a mobile app using React Native and Redux integrated with REST APIs to connect online talents and entertainers.',
      'Significantly improved UX through animations, reduced component rendering, pagination, and parallelized API calls.',
      'Refactored Excel sheet generation code, improving maintainability and performance by 20%.',
    ],
  },
]

export const projects = [
  {
    title: 'Stangent — AI Development Framework',
    emoji: '🤖',
    tag: 'AI / Agents',
    featured: true,
    desc: "Architected a multi-agent pipeline (planner → implementer → reviewer → doc) on Claude Code that automates feature delivery from natural-language spec to committed, tested code. Includes automatic architectural decision bootstrapping, pre-spec contradiction detection, and DBHub MCP integration for live database schema access.",
    tech: ['Claude API', 'Multi-agent', 'Claude Code', 'DBHub MCP'],
    github: 'https://github.com/hohkokyoung/stangent',
    live: null,
  },
  {
    title: 'Ticket RAG',
    emoji: '🎫',
    tag: 'AI / Backend',
    featured: false,
    desc: 'RAG system for customer support tickets achieving 70% Category Precision@1 across 34,000 multilingual tickets. Hybrid dense + BM25 retrieval fused via RRF, reranked with a cross-encoder. Answers scored 4.38/5 by an LLM judge and 0.915 cosine similarity against human-written resolutions.',
    tech: ['Python', 'RAG', 'Claude API', 'Vector DB', 'BM25'],
    github: 'https://github.com/hohkokyoung/ticket-rag',
    live: null,
  },
  {
    title: 'Cyberbullying Detection System',
    emoji: '🛡️',
    tag: 'ML / Full-stack',
    featured: false,
    desc: 'FYP — ML-based cyberbullying detection web app from Twitter/X for Malaysian government agencies. Custom NLP model in TensorFlow with 88% recall on code-switching text, D3.js map visualizations, and JWT+RBAC auth.',
    tech: ['Flask', 'React', 'TensorFlow', 'scikit-learn', 'D3.js'],
    github: null,
    live: null,
  },
  {
    title: 'SLA Land Enhancement Portal',
    emoji: '🏛️',
    tag: 'Enterprise',
    featured: false,
    desc: "Government intranet & internet portal modernizing Singapore's land sales and lease management. Handles PayNow payment processing, compliance logging, and complex workflow automation at scale.",
    tech: ['C#', 'ASP.NET', 'EF Core', 'MySQL', 'AWS'],
    github: null,
    live: 'https://app.sla.gov.sg/leap',
  },
]

export const skills = [
  {
    category: 'Languages',
    icon: '💻',
    items: ['Python', 'JavaScript', 'TypeScript', 'C#', 'Java'],
  },
  {
    category: 'Web & Frameworks',
    icon: '🌐',
    items: ['React', 'Django', 'ASP.NET', 'Svelte', 'Node.js', 'Razor Pages', 'Tailwind CSS', 'Bootstrap', 'GraphQL'],
  },
  {
    category: 'AI & LLM',
    icon: '🤖',
    items: ['Claude API', 'RAG', 'Multi-agent', 'LLM Evaluation', 'Prompt Caching'],
  },
  {
    category: 'Infrastructure & Cloud',
    icon: '☁️',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD', 'SonarQube'],
  },
  {
    category: 'Databases',
    icon: '🗄️',
    items: ['MySQL', 'PostgreSQL', 'SQL Server', 'MongoDB', 'Prisma', 'EF Core'],
  },
  {
    category: 'Data & ML',
    icon: '📊',
    items: ['TensorFlow', 'scikit-learn', 'pandas', 'Matplotlib'],
  },
]

export const certifications = [
  { name: 'AWS Solutions Architect', level: 'Associate', year: '2022', icon: '☁️', color: '#FF9900' },
  { name: 'AWS Cloud Practitioner', level: 'Foundational', year: '2021', icon: '☁️', color: '#FF9900' },
  { name: 'Flutter & Dart', level: 'Udemy', year: '2020', icon: '📱', color: '#54C5F8' },
]

export const education = [
  {
    school: 'Asia Pacific University (APU)',
    degree: 'Bachelor of Science (Dual Degree with Staffordshire University)',
    major: 'Software Engineering',
    period: 'Dec 2021',
    gpa: '3.93 / 4.0',
    honors: ['Best Student Award', 'First Class Honours'],
  },
  {
    school: 'Asia Pacific University (APU)',
    degree: 'Diploma in Information & Communication Technology',
    major: 'Software Engineering',
    period: 'May 2019',
    gpa: '3.97 / 4.0',
    honors: [],
  },
]

/* Core factual data — Muhammad Ramis. Lens-rich content lives in content.js (window.CONTENT) and posts.js (window.POSTS). */
window.DATA = {
  profile: {
    name: 'Muhammad Ramis',
    initials: 'MR',
    headline: 'Penetration Tester & Security-Minded Engineer',
    location: 'Nottingham, United Kingdom',
    availability: 'Open to UK roles · relocation',
    // Email is split to deter scrapers; revealed on interaction by app.js.
    emailUser: 'mramis1',
    emailDomain: 'outlook.com',
    domain: 'ramis.me',
    socials: [
      { id: 'linkedin', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com/in/imramis' },
      { id: 'github', label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/imRamis' },
      { id: 'tryhackme', label: 'TryHackMe', icon: 'fa-solid fa-flag', url: 'https://tryhackme.com/p/mriramis' },
      { id: 'stackoverflow', label: 'Stack Overflow', icon: 'fa-brands fa-stack-overflow', url: 'https://stackoverflow.com/users/16912003/ramis' }
    ],
    cvByLens: {
      overview: 'assets/cv/muhammad-ramis-cv.pdf',
      cybersecurity: 'assets/cv/muhammad-ramis-offensive-security.pdf',
      engineering: 'assets/cv/muhammad-ramis-software-engineer.pdf',
      aiml: 'assets/cv/muhammad-ramis-ai-security.pdf',
      uiux: 'assets/cv/muhammad-ramis-web-developer.pdf'
    }
  },

  // Rotating roles for the gateway typewriter — lead with the full duality,
  // then rotate through facets (red / blue / purple + every discipline).
  roles: [
    'Red + Blue = Purple Teamer',
    'Offensive  &  Defensive Security',
    'Penetration Tester × Software Engineer',
    'Exploit Developer  ·  OSED next',
    'Detection & Security Engineer',
    'Bug Bounty Hunter  ·  51 findings',
    'Java · .NET · Kafka Backend Engineer',
    'AI / LLM Security Researcher',
    'Accessible UI / UX Engineer',
    'Builder & Breaker'
  ],

  // Gateway / switcher metadata. Rich content per id comes from window.CONTENT.tracks
  lenses: [
    { id: 'cybersecurity', label: 'Cybersecurity', short: 'Cybersecurity', icon: 'fa-shield-halved',
      blurb: 'Red + blue — pen testing, exploit dev, detection engineering and a 51-finding bug-bounty record.',
      rgb: '255,77,109', rgb2: '255,154,61' },
    { id: 'engineering', label: 'Software Engineering', short: 'Engineering', icon: 'fa-code',
      blurb: 'Java/Spring + Kafka, .NET, Go & Node microservices and high-scale APIs (6.5M req/day).',
      rgb: '129,140,248', rgb2: '56,189,248' },
    { id: 'aiml', label: 'AI / ML Engineering', short: 'AI / ML', icon: 'fa-brain',
      blurb: 'LLM security, AI agents, ML for security telemetry and applied research.',
      rgb: '52,211,153', rgb2: '34,211,238' },
    { id: 'uiux', label: 'UI / UX Engineering', short: 'UI / UX', icon: 'fa-pen-ruler',
      blurb: 'Accessible React/TypeScript design systems, dashboards and product UX.',
      rgb: '251,113,133', rgb2: '251,191,36' }
  ],
  overviewLens: { id: 'overview', label: 'The full picture', short: 'Overview', icon: 'fa-layer-group',
    blurb: 'Not sure where to start? See everything — security, engineering, AI, games and design together.',
    rgb: '110,231,255', rgb2: '139,123,255' },

  marquee: [
    'OSCP+', 'OSED (scheduled)', 'MSc Cyber Security & AI — Distinction', '51 bug-bounty findings',
    'Burp Suite', 'Ghidra', 'Active Directory', 'Java · Spring Boot', 'Apache Kafka', 'C#/.NET', 'Go', 'Rust',
    'AWS · Azure · GCP', 'Kubernetes', 'PyTorch · LLM agents', 'React · TypeScript', 'WCAG 2.2 AA',
    'Semgrep · CodeQL', 'OWASP · MITRE ATT&CK', 'BugTraceAI'
  ],

  certifications: [
    { name: 'OSCP+', full: 'Offensive Security Certified Professional+', org: 'OffSec', date: 'Apr 2025',
      icon: 'fa-shield-halved', status: 'verified', url: 'https://credentials.offsec.com/559e642d-824b-4657-bdd9-8b315e1845f7',
      desc: 'Hands-on penetration testing certification — exploitation, AD attacks, privilege escalation and reporting. The “+” extends validity through continued education.' },
    { name: 'OSCP', full: 'Offensive Security Certified Professional', org: 'OffSec', date: 'Apr 2025',
      icon: 'fa-user-secret', status: 'verified', url: 'https://credentials.offsec.com/5185a463-88bf-4ad2-8546-2555585d8cc4',
      desc: 'Industry benchmark for practical offensive security: identify, exploit and document vulnerabilities across diverse systems.' },
    { name: 'OSED', full: 'Offensive Security Exploit Developer', org: 'OffSec', date: 'Exam Jul 2026',
      icon: 'fa-bug', status: 'progress',
      desc: 'Windows user-mode exploit development — reverse engineering, bypassing mitigations and building custom exploits. Exam scheduled.' }
  ],
  education: [
    { name: 'MSc Cyber Security & AI', org: 'University of Sheffield', date: '2024 – 2025', grade: 'Distinction',
      icon: 'fa-graduation-cap',
      desc: 'Russell Group university. Dissertation: a comparative framework for post-quantum blind signature schemes — a multi-language (Python/Rust/Node.js) library over gRPC/REST with a Django analysis dashboard and reproducible benchmarks.' },
    { name: 'BSc Computer Science', org: 'PAF-KIET, Karachi', date: '2014 – 2018', grade: 'First Class',
      icon: 'fa-university',
      desc: 'Final-year project: a full-stack React Native carpooling platform with a Laravel backend, GPS tracking, chat and admin portal (~10k downloads).' }
  ],

  experience: [
    {
      role: 'Independent Security Researcher / Bug Bounty Hunter',
      company: 'Self-directed',
      period: '2024 — Present',
      desc: 'Full-time offensive research across public bug-bounty programs and AI/LLM security.',
      points: [
        'Exploit-tested public web apps and APIs for authorization bypass, IDOR/BOLA, race conditions, SSRF and sensitive-data exposure — 51 accepted findings across five programs (Bugcrowd, HackerOne, Google, YesWeHack, Intigriti).',
        'Built repeatable Burp + Python workflows for endpoint discovery, authorization-matrix testing and reproducible evidence capture.',
        'Researched AI/LLM abuse: prompt injection, unsafe tool invocation and model data leakage across agent trust boundaries; shipped BugTraceAI, a self-hosted AI security scanner.'
      ],
      metrics: ['51 accepted findings', '5 programs', 'AI / LLM research'],
      tags: ['Bug Bounty', 'Burp Suite', 'Python', 'API Testing', 'AI/LLM Security']
    },
    {
      role: 'Lead Software / AppSec & Senior Java Backend Engineer',
      company: 'Sorvox Groups',
      period: '2022 — 2024',
      desc: 'Led penetration testing end-to-end while building Spring Boot/Kafka microservices and the security automation around them.',
      points: [
        'Built Spring Boot microservices integrating Apache Kafka for event-driven architectures handling 50K+ daily financial transactions; led a team of 8 with TDD (JUnit 5, TestContainers), reaching 88% coverage and cutting production incidents 65%.',
        'Owned web, API and infra penetration tests across Linux/Windows/Active Directory and AWS/Azure; identified BOLA, injection, SSRF and IAM over-permissioning chains and drove remediation.',
        'Shipped an LLM triage layer over scanner output that cut duplicate review 61%; added observability (Micrometer, Prometheus, Grafana, distributed tracing) with defined SLIs/SLOs.'
      ],
      metrics: ['50K+ daily txns', '88% test coverage', '-65% incidents', '-61% triage noise'],
      tags: ['Java · Spring Boot', 'Apache Kafka', 'AWS EKS', 'Web/API Pentest', 'Semgrep · CodeQL']
    },
    {
      role: 'IT Department Lead / Secure SDLC & Senior Java Backend Engineer',
      company: 'Apricart (e-commerce & payments)',
      period: '2020 — 2022',
      desc: 'Ran security and secure delivery for a regulated, payment-handling e-commerce platform built on Java microservices.',
      points: [
        'Built highly-scalable Spring Boot microservices serving 800K+ daily requests at 99.8% availability (Spring Data JPA, Hibernate); event-driven order/inventory/payment flows with Kafka consumers.',
        'Hardened authentication, authorization and PCI-relevant payment flows; ran network/infra testing (Kali, Nessus) and remediated injection, IDOR, weak validation and secrets exposure.',
        'Mapped 74 PII fields and closed 24 GDPR Article 30/32 control gaps; optimised PostgreSQL + Redis caching to cut DB load 40%.'
      ],
      metrics: ['800K+ daily req', '99.8% uptime', '24 GDPR gaps closed'],
      tags: ['Java · Spring Boot', 'Kafka', 'PostgreSQL · Redis', 'Secure SDLC', 'PCI · GDPR']
    },
    {
      role: 'Software Engineer (Full-Stack / Lead) & Startup CTO',
      company: 'Creative Drop DMCC & Chatcloud',
      period: '2016 — 2019',
      desc: 'Delivered real-time products and APIs with security built in from the client layer down.',
      points: [
        'Built a real-time messaging platform (Spring Boot, Spring WebSocket, JPA persistence); delivered MVP in 4 months, scaling to 8K+ users with AWS auto-scaling.',
        'Delivered REST APIs and admin journeys with input validation, CSRF protection, secure sessions and role/data-access controls.',
        'Acted as the primary offensive tester for early-stage deployments and championed secure-by-default configuration.'
      ],
      metrics: ['8K+ users', 'sub-100ms delivery', 'MVP in 4 months'],
      tags: ['Java · Spring', 'WebSockets', 'REST APIs', 'AWS', 'Secure Coding']
    }
  ],

  achievements: [
    { title: 'OffSec “The Gauntlet: Echo Response”', meta: '4th globally · 2025', icon: 'fa-trophy',
      desc: 'Placed 4th of ~9,000 competitors in OffSec’s forensic evidence-analysis challenge under time pressure.' },
    { title: 'ShefESH Capture The Flag', meta: '1st place', icon: 'fa-flag-checkered',
      desc: 'Won the web-exploitation track — documenting impact and remediation alongside the exploit chain.' },
    { title: 'ShefESH × TryHackMe', meta: '2nd place · 2025', icon: 'fa-medal',
      desc: 'Runner-up in the joint University of Sheffield / TryHackMe competition.' },
    { title: 'ACM-ICPC Regional Finals', meta: 'Top 10 · Fastest Solver', icon: 'fa-bolt',
      desc: 'Regional finalist and fastest problem solver — strong algorithmic and data-structure foundations.' },
    { title: 'Logistic Hunt — Speed Programming', meta: '1st place', icon: 'fa-stopwatch',
      desc: 'First place in an inter-university speed-programming contest; rapid implementation under constraints.' },
    { title: 'Employee of the Month', meta: 'Apricart E-Stores', icon: 'fa-star',
      desc: 'Recognised for security and delivery contributions while leading the IT department.' }
  ]
};

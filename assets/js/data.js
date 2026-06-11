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
    ]
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
      desc: 'Windows user-mode exploit development — reverse engineering, bypassing mitigations and building custom exploits. Exam scheduled.' },
    { name: 'CREST CRT / CPSA', full: 'Registered Penetration Tester / Practitioner Security Analyst', org: 'CREST', date: 'In progress',
      icon: 'fa-certificate', status: 'progress',
      desc: 'UK-recognised offensive-security certifications — actively pursuing to align practical penetration-testing capability with the UK market.' }
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
      role: 'Independent Security Researcher & Bug-Bounty Hunter',
      company: 'Self-directed',
      location: 'Nottingham, UK',
      period: '2024 — Present',
      desc: 'Full-time offensive research across public bug-bounty programs and AI/LLM security, alongside the MSc at Sheffield.',
      points: [
        'Exploit-tested public web apps and APIs for authorization bypass, IDOR/BOLA, race conditions, SSRF and sensitive-data exposure — 51 accepted findings across five programs (Bugcrowd, HackerOne, Google, YesWeHack, Intigriti).',
        'Built repeatable Burp + Python workflows for endpoint discovery, authorization-matrix testing and reproducible evidence capture.',
        'Researched AI/LLM abuse: prompt injection, unsafe tool invocation and model data leakage across agent trust boundaries; shipped BugTraceAI, a self-hosted AI security scanner.'
      ],
      metrics: ['51 accepted findings', '5 programs', 'AI / LLM research'],
      tags: ['Bug Bounty', 'Burp Suite', 'Python', 'API Testing', 'AI/LLM Security']
    },
    {
      role: 'Postgraduate Teaching Assistant',
      company: 'University of Sheffield',
      location: 'Sheffield, UK',
      period: '2024 — 2025',
      desc: 'Supported undergraduate computer-science and security modules while completing the MSc in Cyber Security & AI.',
      points: [
        'Ran and supported lab sessions for programming and security modules, helping students debug code and grasp secure-development concepts hands-on.',
        'Marked coursework against rubrics with structured, actionable feedback, and held office hours to support students who were struggling.',
        'Produced worked examples and supporting materials for practical exercises in secure software development.'
      ],
      metrics: ['CS & security modules', 'Lab demonstrating', 'Coursework marking'],
      tags: ['Teaching', 'Mentoring', 'Secure Development', 'Python']
    },
    {
      role: 'Senior Software Engineer (Security-Focused) & Lead AppSec',
      company: 'Sorvox Groups',
      location: 'Karachi, PK',
      period: 'Apr 2022 — Jun 2024',
      desc: 'Led security assessments for client web apps and APIs while building and hardening the platforms and automation behind them.',
      points: [
        'Led comprehensive web and API security assessments with Burp Suite, Nessus and Nmap — identifying and reporting critical SQLi, XSS and RCE issues and driving an ~30% reduction in client operational vulnerabilities.',
        'Engineered hardening for Linux cloud infrastructure (AWS, Docker, Kubernetes), improving availability ~25% and deploying an ELK SIEM and Suricata IDS/IPS with Ansible-automated patching toward a zero-trust design.',
        'Built Python automation for vulnerability scanning and log analysis (~20% more efficient security ops) and architected RESTful APIs secured with OAuth 2.0 / JWT.'
      ],
      metrics: ['-30% client vulns', '+25% availability', 'OAuth2 / JWT APIs', 'ELK · Suricata'],
      tags: ['Pentesting', 'Burp Suite', 'AWS · Docker · K8s', 'ELK · Suricata', 'Python']
    },
    {
      role: 'IT Department Lead → Secure SDLC & Senior Engineer',
      company: 'Apricart E-Stores',
      location: 'Karachi, PK',
      period: '2020 — 2022',
      desc: 'Progressed from senior engineer to IT department lead for a payment-handling e-commerce platform, owning security and secure delivery.',
      points: [
        'Directed a 15-member IT department with a security-first approach, sustaining 99.9% uptime; led an AWS cloud migration establishing VPC, security-group and IAM governance.',
        'Led a 10-person engineering team on secure coding (OWASP SAMM) and regular security code reviews, cutting post-deployment security bugs ~40%.',
        'Engineered a PCI-DSS-compliant payment gateway with strong authentication and end-to-end encryption (zero payment-related incidents) and hardened AWS (EC2/S3/RDS) for ~35% better resilience.',
        'Ran security-awareness training that measurably reduced staff susceptibility to phishing.'
      ],
      metrics: ['15-person dept', '99.9% uptime', '-40% security bugs', 'PCI-DSS gateway'],
      tags: ['Secure SDLC', 'AWS · IAM', 'PCI DSS', 'OWASP SAMM', 'Leadership']
    },
    {
      role: 'Full-Stack Developer (Security Integration)',
      company: 'Creative Drop DMCC',
      location: 'Karachi, PK',
      period: 'Dec 2019 — Aug 2020',
      desc: 'Delivered e-commerce and CMS solutions for multiple clients with security built into the stack.',
      points: [
        'Built and shipped e-commerce and CMS solutions for multiple clients, embedding input validation, output encoding and secure authentication from the client layer down.',
        'Integrated secure payment flows and third-party APIs, and tuned delivery (CDN, caching) for faster, more reliable pages.',
        'Acted as the security-minded engineer on client work, reviewing code and configuration before release.'
      ],
      metrics: ['Multi-client delivery', 'Secure-by-default', 'E-commerce · CMS'],
      tags: ['Full-Stack', 'PHP · JS', 'E-commerce', 'Secure Coding']
    },
    {
      role: 'Software Engineer (Backend & Real-Time)',
      company: 'Chatcloud.co',
      location: 'Karachi, PK',
      period: '2016 — 2018',
      desc: 'Built a scalable real-time messaging backend and secured its infrastructure end to end.',
      points: [
        'Engineered a scalable real-time messaging backend with secure API endpoints and transport-layer security, scaling to thousands of concurrent users.',
        'Secured infrastructure on Azure with network segmentation and firewall rules, and built admin and analytics journeys for operators.',
        'Owned reliability and secure-by-default configuration for the messaging product.'
      ],
      metrics: ['Real-time at scale', 'Azure-secured', 'TLS APIs'],
      tags: ['Backend', 'Real-Time', 'Azure', 'REST APIs']
    },
    {
      role: 'Freelance Developer — Independent Projects',
      company: 'Self-employed',
      location: 'Pakistan',
      period: '2014 — 2016',
      desc: 'Delivered web, mobile and e-commerce projects across domains, with security and payments a recurring theme.',
      points: [
        'Built diverse web, mobile and e-commerce projects for clients, implementing secure payment gateways and custom integrations.',
        'Ordersmokes (CMS cigar dealer): neutralised an active attack on a live CMS, ran post-incident forensics, remediated 5+ critical vulnerabilities (incl. RCE) and deployed an IDPS against future attacks.',
        'Hostsorvox (hosting & domain reseller): tuned shared-hosting response times ~30% and enforced OWASP protocols with log monitoring and automated alerts.'
      ],
      metrics: ['Secure payments', 'Live-attack mitigation', 'Web · mobile · e-commerce'],
      tags: ['Freelance', 'Web · Mobile', 'E-commerce', 'Incident Response']
    }
  ],

  achievements: [
    { title: 'OffSec “The Gauntlet: Echo Response”', meta: '4th globally · 2025', icon: 'fa-trophy',
      desc: 'Placed 4th of ~9,000 competitors in OffSec’s forensic evidence-analysis challenge under time pressure — blending offensive analysis with incident reconstruction.' },
    { title: 'ShefESH Capture The Flag — 1st place', meta: 'Sheffield Ethical Hacking · 2024–2025', icon: 'fa-flag-checkered',
      desc: 'Won the web-exploitation track at the University of Sheffield Ethical Hacking Society CTF, documenting impact and remediation alongside each exploit chain.' },
    { title: 'ShefESH × TryHackMe — 2nd place', meta: 'Joint competition · 2024–2025', icon: 'fa-medal',
      desc: 'Runner-up in the joint University of Sheffield Ethical Hacking Society / TryHackMe competition.' },
    { title: 'Crypto Chicks Hackathon — Winner', meta: '1st place · 2019', icon: 'fa-trophy',
      desc: 'Won the hackathon, taking First Position in Speed Programming and the Fastest Problem Solver award for rapid, well-architected solutions under time pressure.' },
    { title: 'ICPC Lahore Regional — Fastest Problem Solver', meta: 'ACM-ICPC · 2017', icon: 'fa-bolt',
      desc: 'Recognised as fastest problem solver at the ACM-ICPC Lahore regional for efficient, elegant solutions to complex algorithmic problems — strong algorithmic and data-structure foundations.' },
    { title: 'MSc Cyber Security & AI — Distinction', meta: 'University of Sheffield · 2025', icon: 'fa-graduation-cap',
      desc: 'Distinction at a Russell Group, world top-100 university — digital forensics, development of secure software, security mechanisms and scalable ML, plus a post-quantum blind-signature dissertation.' },
    { title: 'OSCP+ & OSCP — OffSec', meta: 'Certified · Apr 2025', icon: 'fa-shield-halved',
      desc: 'Hands-on offensive-security certification (credential ID 140250238); the OSCP+ continuing-education status keeps it valid for three years.' },
    { title: '51 accepted bug-bounty findings', meta: '5 public programs', icon: 'fa-bug',
      desc: 'Coordinated-disclosure findings across Bugcrowd, HackerOne, Google Bug Hunters, YesWeHack and Intigriti — authorization, logic, race-condition and SSRF flaws, each with a reproducible PoC.' },
    { title: 'Employee of the Month', meta: 'Apricart E-Stores · 2021', icon: 'fa-star',
      desc: 'Recognised for security and delivery contributions while leading the IT department, sustaining 99.9% uptime.' },
    { title: 'CTF competitor — HackTheBox & TryHackMe', meta: 'Ongoing', icon: 'fa-flag',
      desc: 'Regularly competes in Capture-the-Flag events and HackTheBox/TryHackMe labs to sharpen offensive skills and explore new attack vectors.' }
  ]
};

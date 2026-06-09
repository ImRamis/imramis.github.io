/* Core factual data — Muhammad Ramis. Lens-rich content lives in content.js (window.CONTENT). */
window.DATA = {
  profile: {
    name: 'Muhammad Ramis',
    initials: 'MR',
    headline: 'Penetration Tester & Security-Minded Engineer',
    location: 'Nottingham, United Kingdom',
    availability: 'Open to UK roles · SC/NSV clearable · relocation',
    email: 'mramis1@outlook.com',
    phone: '+44 7789 399920',
    domain: 'ramis.me',
    socials: [
      { id: 'linkedin', label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', url: 'https://linkedin.com/in/imramis' },
      { id: 'github', label: 'GitHub', icon: 'fa-brands fa-github', url: 'https://github.com/imRamis' },
      { id: 'stackoverflow', label: 'Stack Overflow', icon: 'fa-brands fa-stack-overflow', url: 'https://stackoverflow.com/users/16912003/ramis' },
      { id: 'tryhackme', label: 'TryHackMe', icon: 'fa-solid fa-flag', url: 'https://tryhackme.com/p/mriramis' }
    ],
    cvByLens: {
      overview: 'assets/cv/muhammad-ramis-cv.pdf',
      offensive: 'assets/cv/muhammad-ramis-offensive-security.pdf',
      defensive: 'assets/cv/muhammad-ramis-security-engineer.pdf',
      engineering: 'assets/cv/muhammad-ramis-software-engineer.pdf',
      uiux: 'assets/cv/muhammad-ramis-web-developer.pdf'
    }
  },

  // Gateway / switcher metadata. Rich content per id comes from window.CONTENT.tracks
  lenses: [
    { id: 'offensive',   label: 'Offensive Security',  short: 'Offensive',   icon: 'fa-user-secret',
      blurb: 'Pen testing, red/purple teaming, exploit dev and a 51-finding bug-bounty record.',
      rgb: '255,71,111' },
    { id: 'defensive',   label: 'Defensive & Security Eng.', short: 'Defensive', icon: 'fa-shield-halved',
      blurb: 'Detection, SAST/DAST automation, hardening, GDPR controls and incident response.',
      rgb: '34,211,238' },
    { id: 'engineering', label: 'Software Engineering', short: 'Engineering', icon: 'fa-code',
      blurb: 'Cloud-native .NET/Node/Go microservices and high-scale APIs (6.5M req/day).',
      rgb: '167,139,250' },
    { id: 'uiux',        label: 'UI / UX Engineering',  short: 'UI·UX',       icon: 'fa-pen-ruler',
      blurb: 'React/TypeScript design systems, accessible dashboards and WCAG 2.2 AA delivery.',
      rgb: '244,114,182' }
  ],
  overviewLens: { id: 'overview', label: 'The full picture', short: 'Overview', icon: 'fa-layer-group',
    blurb: 'Not sure where to start? See everything — the offensive, defensive, engineering and design sides together.',
    rgb: '110,231,255' },

  marquee: [
    'OSCP+', 'OSED (scheduled)', 'MSc Cyber Security & AI — Distinction', '51 bug-bounty findings',
    'Burp Suite', 'Ghidra', 'Active Directory', 'AWS · Azure · GCP', 'Kubernetes', 'C#/.NET', 'Rust', 'Go',
    'React · TypeScript', 'WCAG 2.2 AA', 'Semgrep · CodeQL', 'OWASP · MITRE ATT&CK', 'BugTraceAI'
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
        'Exploit-tested public web apps and APIs for authorization bypass, IDOR/BOLA, race conditions, SSRF and sensitive-data exposure — 51 accepted findings across five programs.',
        'Built repeatable Burp + Python workflows for endpoint discovery, authorization-matrix testing and reproducible evidence capture.',
        'Researched AI/LLM abuse: prompt injection, unsafe tool invocation and model data leakage across agent trust boundaries.'
      ],
      tags: ['Bug Bounty', 'Burp Suite', 'Python', 'API Testing', 'AI/LLM Security']
    },
    {
      role: 'Lead Software Engineer / AppSec Engineer',
      company: 'Sorvox Groups',
      period: '2022 — 2024',
      desc: 'Led web, API and infrastructure penetration tests end-to-end while building the security automation around them.',
      points: [
        'Owned web, REST API and internal/external infra pentests across Linux, Windows and Active Directory estates; drove remediation with engineering teams and executive boards.',
        'Identified complex vulnerability chains (BOLA, auth/session flaws, injection, SSRF, insecure uploads) and audited AWS/Azure for IAM over-permissioning, exposed storage and leaked secrets.',
        'Built an LLM triage layer over scanner output that cut duplicate review 61%; mentored junior testers through shadowing, code review and purple-team workshops.'
      ],
      tags: ['Web/API Pentest', 'AWS · Azure', 'Burp · Nessus · Nmap', 'Semgrep · CodeQL', 'Python · Rust']
    },
    {
      role: 'IT Department Lead / Secure SDLC',
      company: 'Apricart (e-commerce & payments)',
      period: '2020 — 2022',
      desc: 'Ran security and secure delivery for a regulated, payment-handling e-commerce platform.',
      points: [
        'Hardened authentication, authorization and PCI-relevant payment flows handling sensitive financial and customer data.',
        'Ran network and infrastructure testing (Kali, Nessus) across Linux, Windows and Active Directory; remediated injection, IDOR, weak validation and secrets exposure.',
        'Mapped 74 PII fields and closed 24 GDPR Article 30/32 control gaps; maintained the internal testing methodology and secure-coding standards.'
      ],
      tags: ['PHP/Laravel', 'Secure SDLC', 'PCI', 'GDPR', 'Network/Infra Testing']
    },
    {
      role: 'Software Engineer (Full-Stack / Lead) & Startup CTO',
      company: 'Creative Drop DMCC & Chatcloud',
      period: '2016 — 2019',
      desc: 'Delivered real-time products and APIs with security built in from the client layer down.',
      points: [
        'Built API, admin and real-time messaging features with input validation, CSRF protection, secure session handling and role/data-access controls.',
        'Designed real-time messaging on WebSockets/REST scaling to thousands of concurrent users at sub-100ms delivery, on AWS/Azure infrastructure.',
        'Acted as the primary offensive tester for early-stage deployments and championed secure-by-default configuration.'
      ],
      tags: ['Node.js', 'WebSockets', 'REST APIs', 'AWS · Azure', 'Secure Coding']
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

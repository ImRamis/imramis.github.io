// js/data/skills.js - Skills Data

const SKILLS = [
    {
        category: 'Cybersecurity & Penetration Testing',
        icon: 'fa-shield-alt',
        skills: [
            'Web Application Security (OWASP Top 10)',
            'Network Penetration Testing',
            'Active Directory Exploitation',
            'Cloud Security (AWS/Azure/GCP)',
            'Wireless Security Audits',
            'Vulnerability Assessment & Management',
            'Secure Code Review',
            'Threat Modeling & Risk Analysis',
            'Incident Response & Digital Forensics',
            'Cloud Security Posture Management (CSPM)',
            'Red Teaming & Adversary Simulation',
            'API Security Testing'
        ]
    },
    {
        category: 'Programming Languages',
        icon: 'fa-code',
        skills: [
            'Python',
            'JavaScript/TypeScript',
            'Go',
            'C#/.NET',
            'Java',
            'SQL',
            'Solidity',
            'Bash/PowerShell',
            'Rust',
            'C/C++',
            'Swift',
            'Objective-C',
            'Kotlin',
            'Dart',
            'PHP',
            'Assembly (x86)/ARM',
        ]
    },
    {
        category: 'Frameworks & Technologies',
        icon: 'fa-layer-group',
        skills: [
            'Django/Flask',
            'Express.js',
            'Spring Boot',
            'Ruby on Rails',
            'ASP.NET Core',
            'FastAPI',
            'Laravel',
            'React/Next.js',
            'Angular',
            'Vue.js/Nuxt.js',
            'Svelte/Sapper',
            'Node.js/Express',
            'Entity Framework/.NET Core',
            'GraphQL/Apollo',
            'RESTful APIs',
            'CodeIgniter',
            'Angular',
            'FastAPI',
            'RESTful APIs & GraphQL',
            'Microservices Communication (gRPC, Kafka)',
            'Serverless Frameworks (AWS Lambda, Azure Functions)',
            'WebAssembly (Wasm)',
            'Progressive Web Apps (PWAs)',
            'Hybrid Mobile Apps (React Native, Flutter)',
            'Real-time Applications (Socket.IO, SignalR)',
            'WebRTC for Real-time Communication',
            'WebSockets'
        ]
    },
    {
        category: 'Databases & Data Management',
        icon: 'fa-database',
        skills: [
            'PostgreSQL',
            'MongoDB',
            'Redis',
            'MySQL/MariaDB',
            'Database Security & Encryption',
            'Data Modeling & Normalization',
            'SQL Optimization & Indexing',
            'NoSQL Database Design',
            'ETL Processes & Data Pipelines',
            'Data Warehousing (e.g., Redshift, BigQuery)',
            'Backup & Disaster Recovery Planning',
            'Data Governance & Compliance (GDPR, CCPA)',
            'Graph Databases (Neo4j, ArangoDB)',
            'Time-Series Databases (InfluxDB, TimescaleDB)',
            'Search Engines (Elasticsearch, Solr)',
            'Data Lakes & Big Data Technologies (Hadoop, Spark)',
        ]
    },
    {
        category: 'Software Architecture & Design Principles',
        icon: 'fa-sitemap',
        skills: [
            'Microservices Architecture',
            'Event-Driven Architecture (EDA)',
            'SOLID Principles',
            'Design Patterns (GoF, Enterprise)',
            'Domain-Driven Design (DDD)',
            'API Design Best Practices (REST, GraphQL)',
            'System Design for Scalability & Performance',
            'Resiliency, Fault Tolerance & Chaos Engineering',
            'Secure Software Development Lifecycle (SSDLC)',
            'Cloud-Native Architecture Patterns',
        ]
    },
    {
        category: 'E-commerce & CMS',
        icon: 'fa-shopping-cart',
        skills: [
            'Magento 2',
            'WordPress/WooCommerce',
            'Shopify API & Theming',
            'Payment Gateway Integration (Stripe, PayPal)',
            'PCI DSS Compliance Knowledge',
            'Custom CMS Development',
            'Headless CMS (e.g., Strapi, Contentful)',
            'PrestaShop/OpenCart',
            'BigCommerce',
            'Salesforce Commerce Cloud Basics',
            'E-commerce Security Best Practices',
            'Subscription Management Systems',
            'Content Delivery Networks (CDN) for E-commerce',
            'Search Engine Optimization (SEO) for E-commerce',
            'Customer Relationship Management (CRM) Integration',
            'Inventory Management Systems',
            'Order Management Systems (OMS)',
        ]
    },
    {
        category: 'DevOps & Infrastructure',
        icon: 'fa-server',
        skills: [
            'Linux Administration (Debian, CentOS, Alpine)',
            'Docker & Kubernetes (EKS, AKS, GKE)',
            'CI/CD Pipelines (Jenkins, GitHub Actions, GitLab CI)',
            'AWS Cloud Services (EC2, S3, RDS, VPC, IAM)',
            'Azure Cloud Services (VMs, Blob, SQL DB, VNet)',
            'Nginx/Apache Configuration & Optimization',
            'Git Version Control & GitFlow/GitHub Flow',
            'Infrastructure as Code (Terraform, Ansible)',
            'GitOps Principles & Tools (ArgoCD, Flux)',
            'Service Mesh (e.g., Istio, Linkerd)',
            'Monitoring & Logging (Prometheus, Grafana, ELK Stack)',
            'Configuration Management (Ansible, Chef, Puppet)',
            'Load Balancing & Auto-scaling',
            'Network Protocols & Security (TCP/IP, HTTP/S, DNS)',
            'Virtualization (VMware, KVM, Hyper-V)',
            'Container Orchestration (Kubernetes, Docker Swarm)',
            'Serverless Architectures (AWS Lambda, Azure Functions)',
            'Continuous Monitoring & Incident Management',
            'Backup & Disaster Recovery Solutions',
            'Performance Tuning & Optimization',
            'Database Management & Optimization (MySQL, PostgreSQL, MongoDB)',
        ]
    },
    {
        category: 'Cloud & Networking',
        icon: 'fa-cloud',
        skills: [
            'AWS Security Best Practices & Services',
            'Load Balancing (ALB, NLB) & CDN (CloudFront, Akamai)',
            'VPN Setup & Firewall Configuration (iptables, pfSense, opnSense)',
            'Network Protocols (TCP/IP, UDP, ICMP)',
            'DNS Management & Security (DNSSEC, Route53)',
            'SSL/TLS Certificates & PKI Management',
            'Serverless Architecture (AWS Lambda, Azure Functions)',
        ]
    },
    {
        category: 'Blockchain & Emerging Tech',
        icon: 'fa-link',
        skills: [
            'Ethereum/Smart Contracts (Solidity)',
            'Web3.js/Ethers.js Development',
            'DeFi Protocols',
            'Hyperledger Fabric & Besu',
            'NFT Development (ERC-721/1155) & Marketplaces',
            'AI/ML Model Development & MLOps',
            'AI Security & Adversarial ML',
            'IoT Security Architecture & Protocols',
            'Quantum Computing Concepts & Cryptographic Impact',
            'Decentralized Identity (DID) & Verifiable Credentials'
        ]
    },
    {
        category: 'Security Tools',
        icon: 'fa-tools',
        skills: [
            'Burp Suite Professional',
            'Metasploit Framework',
            'Nmap & Advanced Scanning Techniques',
            'Wireshark & Network Protocol Analysis',
            'John the Ripper/Hashcat & Password Cracking',
            'SQLMap & Automated Injection Tools',
            'OWASP ZAP / Nikto',
            'Nessus/OpenVAS & Vulnerability Scanners',
            'IDA Pro/Ghidra & Reverse Engineering',
            'SIEM Systems (Splunk, ELK Stack, Wazuh)',
            'SAST/DAST Tools (e.g., SonarQube, Checkmarx, Veracode)',
            'Digital Forensics Tools (e.g., Volatility, Autopsy, FTK Imager)',
            'Threat Intelligence Platforms (e.g., MISP, ThreatConnect)',
            'Network Security Monitoring (e.g., Zeek, Suricata)',
            'Endpoint Detection & Response (EDR) Solutions',
            'Cloud Security Posture Management (CSPM) Tools',
            'Container Security Tools (e.g., Aqua, Twistlock)',
            'API Security Testing Tools (e.g., Postman, Insomnia)',
        ]
    },
    {
        category: 'Leadership & Management',
        icon: 'fa-users',
        skills: [
            'Team Leadership & Mentoring',
            'Project Management (Agile/Scrum, Kanban)',
            'Risk Assessment & Mitigation Planning',
            'Technical Writing & Documentation Standards',
        ]
    }
];

// Function to render skills
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    SKILLS.forEach((category, index) => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category fade-in-up';
        skillCategory.style.animationDelay = `${index * 0.1}s`;
        
        skillCategory.innerHTML = `
            <h3><i class="fas ${category.icon}"></i> ${category.category}</h3>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        container.appendChild(skillCategory);
    });
}

// Make function available globally
window.renderSkills = renderSkills;
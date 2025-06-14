const SKILLS = [
    {
        category: 'Offensive Security & Penetration Testing',
        icon: 'fa-user-secret',
        skills: [
            'Web Application Penetration Testing (OWASP Top 10, Burp Suite Pro, OWASP ZAP, SQLMap, Nikto)',
            'API Security Testing (REST, GraphQL, Postman, Burp Suite)',
            'Network Penetration Testing (Internal/External, Nmap, Nessus, Metasploit)',
            'Active Directory Exploitation (BloodHound, Mimikatz, Kerberoasting, Pass-the-Hash)',
            'Cloud Security Testing (AWS: EC2, S3, IAM, VPC; Azure: VMs, VNet, Blob Storage)',
            'Vulnerability Scanning & Assessment (Nessus, OpenVAS)',
            'Privilege Escalation (Windows, Linux)',
            'Wireless Network Auditing (Aircrack-ng, Kismet)',
            'Mobile Application Testing Basics (Android, iOS)',
            'IoT/Embedded Systems Security Assessment Basics',
            'Social Engineering Techniques & Simulation',
            'Red Teaming Concepts & C2 Framework Exposure (Cobalt Strike)',
            'Antivirus Evasion Techniques',
            'Buffer Overflows (Conceptual & Basic Practical)',
            'Client-Side Attacks (XSS, CSRF)',
            'Pivoting & Lateral Movement',
            'Post-Exploitation Techniques',
            'Fuzzing',
            'Basic Binary Analysis (Ghidra, IDA Pro)'
        ]
    },
    {
        category: 'Security Tools & Platforms',
        icon: 'fa-tools',
        skills: [
            'Kali Linux Suite', 'Burp Suite Professional', 'Metasploit Framework', 'Nmap', 'Wireshark',
            'Nessus', 'OWASP ZAP', 'SQLMap', 'John the Ripper', 'Hashcat', 'Ghidra', 'IDA Pro (Basic)',
            'Responder', 'Impacket Suite', 'Cobalt Strike (Exposure)',
            'SIEM (Splunk, ELK Stack - Usage & Analysis)', 'IDS/IPS (Suricata, Snort - Concepts & Basic Config)',
            'Digital Forensics Tools (Autopsy, FTK Imager - Basic)', 'Volatility Framework (Basic Memory Analysis)'
        ]
    },
    {
        category: 'Programming & Scripting Languages',
        icon: 'fa-code',
        skills: [
            'Python (Advanced: Scripting, Automation, Tool Dev, Web Dev - Flask/Django)',
            'JavaScript (ES6+, Node.js, React, Next.js, Angular, Vue.js)',
            'PHP (Laravel, Magento, WordPress, Custom CMS)',
            'Bash (Shell Scripting, Automation)',
            'PowerShell (Windows Automation, AD Scripting)',
            'SQL (MySQL, PostgreSQL, MSSQL, SQLite)',
            'Java (Spring Boot, Android Basics)',
            'C#/.NET (ASP.NET Core Basics)',
            'Go (Basic: CLI tools, Microservices)',
            'TypeScript',
            'Ruby (Rails Basics)',
            'Swift / Objective-C (iOS Basics)',
            'Kotlin (Android Basics)',
            'Dart (Flutter)',
            'Solidity (Smart Contract Basics)',
            'C/C++ (Understanding Exploits, Basic Dev)',
            'Assembly (x86/ARM - Basic RE understanding)'
        ]
    },
    {
        category: 'Web Development & Frameworks',
        icon: 'fa-laptop-code',
        skills: [
            'Full-Stack Development', 'RESTful APIs', 'GraphQL APIs',
            'Frontend: React, Next.js, Angular, Vue.js, HTML5, CSS3, SASS/LESS, JavaScript (DOM Manipulation)',
            'Backend: Node.js (Express.js), Python (Django, Flask, FastAPI), PHP (Laravel, Symfony, CodeIgniter), Java (Spring Boot), Ruby on Rails, ASP.NET Core',
            'Magento 2 Development (Modules, Theming, APIs)', 'WordPress Development (Themes, Plugins)',
            'Progressive Web Apps (PWAs)', 'Single Page Applications (SPAs)',
            'WebSockets & Real-time Communication (Socket.IO)', 'WebRTC Basics'
        ]
    },
    {
        category: 'Mobile App Development',
        icon: 'fa-mobile-alt',
        skills: [
            'React Native (Cross-Platform)',
            'Flutter (Dart, Cross-Platform)',
            'Native Android (Java/Kotlin Basics)',
            'Native iOS (Swift/Objective-C Basics)',
            'Mobile UI/UX Principles',
            'API Integration for Mobile Apps',
            'Push Notifications'
        ]
    },
    {
        category: 'Databases & Data Management',
        icon: 'fa-database',
        skills: [
            'Relational Databases: MySQL, PostgreSQL, SQL Server, SQLite',
            'NoSQL Databases: MongoDB, Redis, Elasticsearch',
            'Database Design & Modeling (Normalization, ERDs)',
            'SQL Query Optimization & Indexing',
            'ORM/ODM (e.g., SQLAlchemy, Mongoose, TypeORM, Eloquent)',
            'Data Migration & ETL Basics',
            'Database Security Best Practices',
            'Backup & Recovery Strategies'
        ]
    },
    {
        category: 'DevOps, Cloud & Infrastructure',
        icon: 'fa-server',
        skills: [
            'Linux Administration (RHEL, Debian, CentOS, Ubuntu, Kali, Alpine)',
            'Windows Server Administration (Basics)',
            'Cloud Platforms: AWS (EC2, S3, RDS, VPC, IAM, ELB, Route 53, Lambda), Azure (VMs, Blob, SQL DB, VNet, Functions)',
            'Containerization: Docker (Dockerfile, Compose, Swarm)',
            'Orchestration: Kubernetes (AKS, EKS, Minikube, Kubeadm)',
            'CI/CD Pipelines (GitHub Actions, Jenkins, GitLab CI)',
            'Infrastructure as Code (IaC): Ansible, Terraform (Basic)',
            'Version Control: Git, GitHub, GitLab, Bitbucket (GitFlow)',
            'Web Servers: Nginx, Apache (Configuration, Optimization, Reverse Proxy)',
            'Load Balancing (Nginx, HAProxy, AWS ELB, Azure Load Balancer)',
            'Monitoring & Logging: ELK Stack (Elasticsearch, Logstash, Kibana), Prometheus, Grafana',
            'Virtualization (VMware vSphere/ESXi, Proxmox VE, KVM)',
            'Network Protocols (TCP/IP, HTTP/S, DNS, SMTP, FTP)',
            'Firewall Configuration (iptables, ufw, pfSense concepts)',
            'VPN Setup & Management (OpenVPN basics)'
        ]
    },
    {
        category: 'Software Architecture & Design',
        icon: 'fa-sitemap',
        skills: [
            'Microservices Architecture',
            'Monolithic Architecture',
            'Event-Driven Architecture (EDA)',
            'SOLID Principles',
            'Design Patterns (GoF, MVC, MVVM)',
            'Domain-Driven Design (DDD) Concepts',
            'API Design (REST Best Practices, GraphQL Schema Design)',
            'System Design for Scalability, Performance & Resilience',
            'Secure Software Development Lifecycle (SSDLC)',
            'Threat Modeling (STRIDE, DREAD)',
            'Data Modeling'
        ]
    },
    {
        category: 'E-commerce & CMS Platforms',
        icon: 'fa-shopping-cart',
        skills: [
            'Magento 2 (Development, Theming, Custom Modules, API Integration)',
            'WooCommerce (WordPress)',
            'Shopify (API, Theming Basics)',
            'Custom CMS Development (PHP)',
            'Headless CMS Concepts (Strapi, Contentful - Exposure)',
            'Payment Gateway Integration (Stripe, PayPal, JS Bank, etc.)',
            'PCI DSS Compliance (Understanding & Implementation Context)'
        ]
    },
     {
        category: 'Blockchain & Emerging Technologies',
        icon: 'fa-link',
        skills: [
            'Blockchain Concepts (Distributed Ledger, Consensus Mechanisms)',
            'Ethereum & Smart Contracts (Solidity - Basics)',
            'Web3.js / Ethers.js (Interacting with Smart Contracts)',
            'Hyperledger Fabric (Conceptual Understanding, Hackathon Experience)',
            'NFT Development Basics (ERC-721/1155)',
            'AI/ML Concepts (Application in Cybersecurity, Basic Model Understanding)',
            'IoT Security (Conceptual Understanding, Basic Assessment)'
        ]
    },
    {
        category: 'Leadership & Project Management',
        icon: 'fa-users',
        skills: [
            'Team Leadership & Mentoring (up to 15 members)',
            'IT Department Management',
            'Project Management (Agile/Scrum, Kanban)',
            'Strategic Planning & Execution',
            'Budget Management & Resource Allocation',
            'Risk Assessment & Mitigation',
            'Technical Writing & Documentation (Reports, Policies, User Guides)',
            'Client Communication & Stakeholder Management',
            'Vendor Management'
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
// js/data/projects.js - Projects Data

const PROJECTS = [
    {
        title: 'Full-Stack E-commerce Platform (Apricart)',
        company: 'Apricart E-Stores Private Ltd',
        category: 'development',
        type: 'Full-Stack E-commerce Solution',
        description: 'Led the end-to-end development of the Apricart e-commerce platform. Engineered the backend using Magento 2 (PHP) and a high-performance, responsive frontend with Next.js. Key responsibilities included developing a Python-based competitor price crawler with automated dynamic pricing and daily reporting/alerts. Managed AWS infrastructure (Route 53, EC2, S3, ELB, staging/sandbox environments, load balancing), built RESTful APIs for a Flutter mobile app, and created the ReactJS PWA. Integrated reporting analytics, marketing tools, and cross-platform notifications. Optimized web server performance (Nginx, HTTP/3, Varnish, reverse proxying), developed numerous custom Magento modules, and led a development team, ensuring high platform availability for 100K+ active customers.',
        technologies: [
            'Magento 2', 'PHP', 'Next.js', 'Python (Crawler & Automation)', 'MySQL', 'Redis', 'Elasticsearch',
            'AWS (Route 53, EC2, S3, ELB)', 'Docker', 'Linux (Server Admin)',
            'REST APIs', 'Flutter (Mobile App Backend)', 'ReactJS (PWA)',
            'JavaScript', 'Nginx', 'HTTP/3', 'Varnish Cache',
            'Payment Gateway Integration', 'Cron Jobs', 'Git', 'JIRA', 'Agile Development'
        ],
        achievements: [
            'Led end-to-end development of a core e-commerce platform.',
            'Engineered backend with Magento 2 and frontend with Next.js.',
            'Developed a Python-based crawler for automated competitor price tracking, dynamic pricing, data management, and daily reporting with alerts.',
            'Managed comprehensive AWS infrastructure including Route 53, sandboxes, staging environments, and load balancing.',
            'Built robust RESTful APIs supporting a full-featured Flutter mobile application and ReactJS PWA.',
            'Integrated reporting analytics, marketing tools, and multi-platform notification systems.',
            'Optimized web server performance by 25% using HTTP/3, reverse proxying, and load balancing.',
            'Developed 15+ custom Magento 2 modules, enhancing B2B functionality and improving checkout conversion by 25%.',
            'Led and managed a development team, overseeing the project lifecycle.',
            'Successfully handled 2K+ active customers and maintained 99.9%+ platform availability.',
            'Contributed to a 35% boost in overall system resilience.'
        ],
        icon: 'fa-shopping-cart'
    },
    {
        title: 'Secure Payment Gateway Implementation (Apricart)',
        company: 'Apricart E-Stores Private Ltd',
        category: 'security',
        type: 'Security Implementation & Integration',
        description: 'Engineered and integrated a fully PCI DSS compliant payment gateway with JS Bank for the Apricart e-commerce platform. Implemented advanced fingerprinting authentication, robust encryption protocols, and fraud detection mechanisms to ensure secure transaction processing.',
        technologies: ['Magento 2', 'Laravel', 'PHP', 'Payment APIs (JS Bank)', 'PCI DSS Compliance', 'Fingerprinting Authentication', 'OAuth 2.0', 'JWT', 'Fraud Detection Algorithms', 'End-to-End Encryption', 'Tokenization'],
        achievements: [
            'Achieved zero security incidents related to payment processing post-implementation.',
            'Ensured full PCI DSS compliance for the payment gateway.',
            'Reduced payment fraud rate to 0.01%.',
            'Decreased end-to-end payment processing time by 30%.',
            'Significantly boosted overall system resilience by 35% related to payment systems.'
        ],
        icon: 'fa-credit-card'
    },
    {
        title: 'The Romp Magazine - Digital Publishing Platform',
        company: 'Sorvox Groups (Client Project)',
        category: 'development',
        type: 'Multi-Platform Digital Publishing Solution',
        description: 'Engineered a comprehensive digital publishing solution ("Netflix-style" for magazine content) across web, mobile (iOS/Android), and TV (tvOS/Android TV) platforms. Developed the full-stack application leveraging Next.js (React) for web, React Native & Capacitor.js for mobile/TV apps, and Laravel (PHP) for the backend CMS and APIs. Implemented enterprise-grade DRM for premium content protection, secure e-commerce for subscriptions/shops, and optimized for global scalability with CDN (Cloudflare) and advanced caching. Features included custom remote mapping for TV app navigation, robust analytics, and Stripe payment integration.',
        technologies: [
            'Next.js (React)', 'React Native', 'Capacitor.js', 'Laravel (PHP)', 'MySQL',
            'iOS Development', 'Android Development', 'tvOS Development', 'Android TV Development',
            'Enterprise DRM', 'E-commerce Integration', 'Stripe API',
            'Custom APIs (REST/GraphQL)', 'CDN (Cloudflare)', 'AWS (EC2, S3)', 'Nginx', 'Varnish Cache',
            'Load Balancing', 'Performance Optimization', 'Analytics Integration', 'Content Management System (CMS)',
            'Push Notifications', 'User Authentication (OAuth, JWT)'
        ],
        achievements: [
            'Reduced average page load times by 25% through strategic CDN optimization and advanced caching.',
            'Decreased project time-to-market by 20% using agile methodologies and efficient full-stack development.',
            'Implemented enterprise-grade DRM, successfully protecting premium content.',
            'Delivered a unified user experience across web, mobile, and TV platforms.',
            'Integrated secure e-commerce functionality for subscriptions and merchandise.',
            'Increased user engagement by 40% through interactive features and optimized performance.'
        ],
        icon: 'fa-newspaper'
    },
    {
        title: 'Streamrolla - Secure No-Code Streaming Platform',
        company: 'Sorvox Groups (Client Project)',
        category: 'development',
        type: 'SaaS Platform for Content Creators',
        description: 'Architected and developed a full-stack no-code platform for content creators, enabling video streaming, secure payment integration (Stripe), and subscription management. Built with Laravel (PHP) for the backend and React for the user-facing interface. Implemented CDN for efficient video delivery and WebRTC for potential real-time interactions. Focused on high concurrency, low latency streaming, automated billing, and domain management features.',
        technologies: [
            'Laravel (PHP)', 'React', 'MySQL', 'Redis', 'Stripe API', 'Video Streaming (HLS/DASH)',
            'CDN Integration', 'WebRTC (Exploratory)', 'AWS (S3 for storage)', 'Docker', 'Nginx',
            'API Development', 'Payment Integration', 'Domain Management APIs', 'Automated Billing Systems',
            'Security Hardening', 'Load Balancing', 'High Concurrency Design', 'HTTP/3', 'WebSockets', 'Real-time Notifications'
        ],
        achievements: [
            'Increased project delivery efficiency by 20% through structured planning and agile development.',
            'Reduced video streaming buffering times by 25% through server optimization and CDN usage.',
            'Decreased payment transaction errors by 30% via robust Stripe merchant integration.',
            'Applied stringent security measures across 100% of streaming and payment functionalities.',
            'Successfully supported high concurrent user streams with 99.95% streaming uptime.',
            'Implemented automated billing and basic domain management features for creators.'
        ],
        icon: 'fa-play-circle'
    },
    {
        title: 'Enterprise Linux Infrastructure Hardening & Automation',
        company: 'Sorvox Groups (Client & Internal)',
        category: 'security',
        type: 'Infrastructure Security & DevOps',
        description: 'Led initiatives to harden Linux cluster environments for clients and internal systems. Deployed SIEM (ELK Stack) and IDS/IPS (Suricata) solutions, developed Ansible playbooks for automated patching and configuration hardening based on CIS benchmarks. Designed and implemented elements of a zero-trust architecture, significantly reducing operational vulnerabilities.',
        technologies: ['Linux (RHEL, Debian, CentOS)', 'Docker', 'Kubernetes', 'Ansible', 'Terraform (Basic)', 'SIEM (ELK Stack)', 'IDS/IPS (Suricata)', 'CIS Benchmarks', 'Firewalls (iptables, ufw)', 'Bash Scripting', 'Python (Automation)', 'Network Segmentation', 'Zero Trust Architecture'],
        achievements: [
            'Reduced operational vulnerabilities by 30% across hardened systems.',
            'Improved incident response time by 50% through enhanced monitoring and automation.',
            'Increased system availability to 99.99% uptime for critical services.',
            'Improved data retrieval speeds by 30% in secured Docker/Kubernetes deployments.',
            'Designed and implemented key components of a zero-trust architecture.',
            'Automated security patching and configuration management using Ansible.'
        ],
        icon: 'fa-server'
    },
    {
        title: 'Live Attack Mitigation & CMS Hardening (Ordersmokes)',
        company: 'Ordersmokes (Pre-Sorvox Freelance Project)',
        category: 'security',
        type: 'Incident Response & Application Security',
        description: 'Neutralised an active cyber-attack on a live CMS. Conducted post-incident forensic analysis and performed penetration testing (Burp Suite, Metasploit) to identify and remediate 5+ critical vulnerabilities (including RCE). Re-architected the CMS core against OWASP Top 10 threats and deployed an Intrusion Detection and Prevention System (IDPS).',
        technologies: ['Incident Response', 'Digital Forensics (Basic)', 'Penetration Testing', 'Burp Suite', 'Metasploit', 'Nmap', 'OWASP Top 10', 'PHP', 'MySQL', 'CMS Security', 'IDPS (e.g., Snort/Suricata setup)', 'Vulnerability Remediation', 'Security Architecture Review'],
        achievements: [
            'Restored full system integrity in under 2 hours after neutralizing an active cyber-attack.',
            'Identified and eliminated 5+ critical vulnerabilities, including potential Remote Code Execution (RCE) flaws.',
            'Achieved a 100% reduction in subsequent security breaches by re-architecting the CMS core and deploying an IDPS.',
            'Performed rapid incident response to identify and mitigate the initial exploit vector.'
        ],
        icon: 'fa-shield-alt'
    },
    {
        title: 'Scalable Real-Time Chat Platform (Chatcloud.co)',
        company: 'Chatcloud.co',
        category: 'development',
        type: 'Microservices-based SaaS',
        description: 'Engineered a microservices-based real-time chat platform supporting over 1,000 concurrent users (designed for 10K+). Implemented WebSockets for low-latency communication and Redis for message queuing. Deployed on Azure using Kubernetes with auto-scaling and Nginx load balancing. Enhanced security with JWT authentication and rate limiting. Developed a custom admin panel from scratch for user management, analytics, and support. Created client-side JavaScript plugins for easy integration into various platforms with customizable embedded chatbox designs.',
        technologies: [
            'Node.js', 'Express.js', 'Microservices Architecture', 'WebSockets (Socket.IO)', 'MongoDB', 'Redis',
            'Azure Cloud Services', 'Kubernetes (AKS)', 'Docker', 'Nginx (Load Balancing)',
            'API Development (REST)', 'JWT Authentication', 'Rate Limiting', 'Angular (Admin Panel)',
            'JavaScript (Client Plugins)', 'HTML5', 'CSS3', 'Real-time Communication', 'High Availability Design', 'Scalability'
        ],
        achievements: [
            'Successfully supported over 500+ concurrent users with sub-100ms message delivery.',
            'Achieved 99.9% platform uptime.',
            'Reduced infrastructure costs by 15% through Azure optimization and efficient architecture.',
            'Improved API call reliability by 40% with secure authentication.',
            'Developed a full-featured admin panel for user management, support, and analytics.',
            'Created versatile client-side plugins and customizable embedded chat interfaces for cross-platform support.'
        ],
        icon: 'fa-comments'
    },
    {
        title: 'Hostsorvox - Automated Hosting Platform',
        company: 'Independent Project / Early Business Venture',
        category: 'development',
        type: 'Web Hosting & Domain Reseller Solution',
        description: 'Developed a hosting and domain reseller platform with automated provisioning using WHMCS and cPanel/WHM APIs. Implemented security hardening for shared hosting environments, billing integration with payment gateways, and DNS management features. Created a custom admin panel for managing domains, hosting accounts, and customer billing.',
        technologies: [
            'PHP', 'WHMCS API', 'cPanel/WHM API', 'MySQL', 'Linux Server Administration (Apache/Nginx)',
            'HTML', 'CSS', 'JavaScript (for Admin Panel)', 'Payment Gateway Integration (e.g., PayPal, 2Checkout)',
            'DNS Management', 'Security Hardening (ModSecurity, CSF Firewall)', 'Automated Provisioning Scripts (Bash/PHP)',
            'Billing Systems', 'Customer Support Systems (Basic)'
        ],
        achievements: [
            'Automated domain registration and hosting account provisioning, reducing manual effort by 80%.',
            'Improved shared hosting server response times by 30% through Nginx tuning and caching.',
            'Integrated automated billing and invoicing with multiple payment gateways.',
            'Implemented security monitoring and automated alerts for unauthorized access attempts.',
            'Successfully managed and supported 10+ active domains and hosting accounts.',
            'Achieved 99.9% uptime for hosted services.'
        ],
        icon: 'fa-globe'
    },
    {
        title: 'Blockchain Supply Chain Tracking (Hackathon)',
        company: 'Crypto Chicks Hackathon Project',
        category: 'blockchain',
        type: 'Proof-of-Concept Blockchain Solution',
        description: 'Developed an IBM Hyperledger Fabric-based supply chain tracking proof-of-concept during the Crypto Chicks Hackathon. The solution aimed to provide real-time tracking and an immutable audit trail for goods, integrating with conceptual IoT devices for data input. Focused on smart contract development for transaction logic.',
        technologies: ['Blockchain', 'IBM Hyperledger Fabric', 'Smart Contracts (Go/Node.js)', 'Docker', 'Node.js (for client app)', 'IoT Integration Concepts'],
        achievements: [
            'Reached Finalist stage in the Crypto Chicks Hackathon.',
            'Demonstrated real-time tracking capability for simulated supply chain assets.',
            'Created an immutable audit trail for all transactions on the blockchain.',
            'Designed to reduce supply chain disputes and improve transparency (conceptual).',
            'Showcased integration with conceptual IoT devices for automated data capture.'
        ],
        icon: 'fa-link'
    }
];


// Function to initialize projects
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!projectsGrid) return;
    

    function renderProjects(filter = 'security') {
        projectsGrid.innerHTML = '';

        const filteredProjects = filter === 'all'
            ? PROJECTS
            : PROJECTS.filter(p => p.category === filter);

        if (filteredProjects.length === 0) {
            projectsGrid.innerHTML = '<p class="no-projects-message" style="text-align: center; opacity: 1; color: var(--text-secondary); padding: 20px;">No projects found for this category.</p>';
        } else {
            filteredProjects.forEach((project, index) => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card fade-in-up';

                projectCard.innerHTML = `
                    <div class="project-header">
                        <i class="fas ${project.icon}"></i>
                        <span class="project-type">${project.type}</span>
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-achievements">
                        ${project.achievements.map(a => `<div class="achievement"><i class="fas fa-check"></i> ${a}</div>`).join('')}
                    </div>
                `; 
                projectsGrid.appendChild(projectCard);
                setTimeout(() => {
                    projectCard.classList.add('visible');
                }, 50 + (index * 100));
            });
        }
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });
    
    renderProjects();
}

// Make function available globally
window.initProjects = initProjects;
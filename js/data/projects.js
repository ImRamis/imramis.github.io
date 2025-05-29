// js/data/projects.js - Projects Data

const PROJECTS = [
    {
        title: 'Enterprise E-commerce Platform - Apricart',
        category: 'development',
        type: 'E-commerce Development',
        description: 'Led development of large-scale e-commerce platform using Magento 2, serving 100K+ customers with advanced features and payment integrations.',
        technologies: ['Magento 2', 'PHP', 'Laravel', 'MySQL', 'Redis', 'Elasticsearch', 'Payment Gateways'],
        achievements: [
            'Handled 100K+ active customers',
            '99.9% uptime achieved',
            'Integrated 5+ payment gateways',
            '40% improvement in page load times'
        ],
        icon: 'fa-shopping-cart'
    },
    {
        title: 'Payment Gateway Security Implementation',
        category: 'security',
        type: 'Security Implementation',
        description: 'Implemented secure payment gateway with JS Bank featuring PCI DSS compliance, fingerprinting authentication, and advanced fraud detection.',
        technologies: ['Laravel', 'PHP', 'Payment API', 'PCI DSS', 'OAuth', 'Fraud Detection', 'Encryption'],
        achievements: [
            'Zero security incidents',
            'PCI DSS certified implementation',
            '0.01% fraud rate achieved',
            'Reduced payment processing time by 30%'
        ],
        icon: 'fa-credit-card'
    },
    {
        title: 'Magento 2 Custom Modules Development',
        category: 'development',
        type: 'E-commerce Extension',
        description: 'Developed 15+ custom Magento 2 modules for enhanced functionality including advanced product filters, custom checkout, and B2B features.',
        technologies: ['Magento 2', 'PHP', 'JavaScript', 'Knockout.js', 'RequireJS', 'XML', 'MySQL'],
        achievements: [
            'Developed 15+ custom modules',
            'Improved checkout conversion by 25%',
            'Enhanced B2B functionality',
            'Reduced cart abandonment by 20%'
        ],
        icon: 'fa-puzzle-piece'
    },
    {
        title: 'Linux Infrastructure Hardening',
        category: 'security',
        type: 'Infrastructure Security',
        description: 'Enhanced Linux cluster security configurations, implemented comprehensive monitoring, and established security baselines.',
        technologies: ['Linux', 'iptables', 'Docker', 'Kubernetes', 'Monitoring Tools', 'SIEM', 'IDS/IPS'],
        achievements: [
            '25% improvement in availability',
            '30% reduction in vulnerabilities',
            'Implemented zero-trust architecture',
            'Automated security patching'
        ],
        icon: 'fa-server'
    },
    {
        title: 'Blockchain Supply Chain Platform',
        category: 'blockchain',
        type: 'Blockchain Solution',
        description: 'IBM Hyperledger-based supply chain tracking solution developed during Crypto Chicks Hackathon - Winner project.',
        technologies: ['Blockchain', 'IBM Hyperledger', 'Docker', 'Smart Contracts', 'Node.js', 'Go'],
        achievements: [
            'Hackathon Winner',
            'Real-time tracking capability',
            'Immutable audit trail',
            'Reduced supply chain disputes by 60%'
        ],
        icon: 'fa-link'
    },
    {
        title: 'Streamrolla Platform',
        category: 'development',
        type: 'SaaS Platform',
        description: 'No-code platform for content creators with secure payment integration, video streaming capabilities, and subscription management.',
        technologies: ['Laravel', 'React', 'Stripe API', 'Video Streaming', 'CDN', 'WebRTC', 'AWS'],
        achievements: [
            '20% increase in creator productivity',
            '25% reduced buffering times',
            'Supported 10K+ concurrent streams',
            '99.95% streaming uptime'
        ],
        icon: 'fa-play-circle'
    },
    {
        title: 'E-commerce Security Assessment Framework',
        category: 'security',
        type: 'Security Testing',
        description: 'Comprehensive security assessment of multiple e-commerce platforms including Magento, WooCommerce, and custom solutions.',
        technologies: ['Burp Suite', 'OWASP Top 10', 'SQL Injection', 'XSS Testing', 'Magento Security', 'PCI DSS'],
        achievements: [
            'Identified 50+ critical vulnerabilities',
            'Improved security posture by 70%',
            'Achieved PCI compliance for clients',
            'Developed security best practices guide'
        ],
        icon: 'fa-shield-alt'
    },
    {
        title: 'Scalable Chat Platform',
        category: 'enterprise',
        type: 'Microservices Architecture',
        description: 'Microservices-based chat solution supporting 10K+ concurrent users with real-time messaging and video capabilities.',
        technologies: ['Node.js', 'Microservices', 'WebSocket', 'MongoDB', 'Redis', 'Kubernetes', 'Load Balancing'],
        achievements: [
            '10K+ concurrent users',
            '99.9% uptime',
            'Sub-100ms message delivery',
            '25% reduction in infrastructure costs'
        ],
        icon: 'fa-comments'
    },
    {
        title: 'The Romp Magazine Platform',
        category: 'development',
        type: 'Digital Publishing',
        description: 'Digital magazine platform with web, mobile, and TV app integration featuring optimized content delivery and subscription management.',
        technologies: ['Laravel', 'React Native', 'CDN', 'API Development', 'Stripe', 'Push Notifications'],
        achievements: [
            '25% reduction in page load times',
            '20% reduction in time-to-market',
            'Cross-platform synchronization',
            '40% increase in user engagement'
        ],
        icon: 'fa-newspaper'
    },
    {
        title: 'Multi-vendor E-commerce Marketplace',
        category: 'development',
        type: 'Marketplace Platform',
        description: 'Built multi-vendor marketplace using Magento 2 with advanced vendor management, commission system, and automated payouts.',
        technologies: ['Magento 2', 'Laravel', 'Vue.js', 'Payment Splitting', 'API Integration', 'Elasticsearch'],
        achievements: [
            'Onboarded 500+ vendors',
            'Automated commission calculations',
            'Reduced payout processing by 80%',
            'Handled $2M+ in transactions'
        ],
        icon: 'fa-store'
    },
    {
        title: 'Cloud Migration & Optimization',
        category: 'enterprise',
        type: 'Cloud Architecture',
        description: 'Led cloud migration of e-commerce infrastructure from on-premise to AWS with auto-scaling and disaster recovery.',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation', 'Load Balancing', 'CDN'],
        achievements: [
            'Reduced infrastructure costs by 40%',
            'Improved scalability by 300%',
            'Achieved 99.99% uptime',
            'Automated disaster recovery'
        ],
        icon: 'fa-cloud'
    },
    {
        title: 'API Security Enhancement Platform',
        category: 'security',
        type: 'API Development',
        description: 'Implemented secure RESTful and GraphQL APIs with JWT authentication, rate limiting, and API gateway protection.',
        technologies: ['Node.js', 'JWT', 'OAuth 2.0', 'Rate Limiting', 'API Gateway', 'GraphQL', 'Redis'],
        achievements: [
            '40% improvement in API reliability',
            '30% faster response times',
            'Zero security breaches',
            'Handled 10M+ API calls/day'
        ],
        icon: 'fa-plug'
    },
    {
        title: 'Vulnerability Assessment Automation',
        category: 'security',
        type: 'Security Tools',
        description: 'Custom automation framework for vulnerability assessment following PTES methodology with integration of multiple security tools.',
        technologies: ['Python', 'Burp Suite API', 'Nmap', 'Metasploit', 'OWASP ZAP', 'Custom Scripts', 'Docker'],
        achievements: [
            '40% reduction in testing time',
            '60% faster vulnerability discovery',
            'Automated report generation',
            'Integration with ticketing systems'
        ],
        icon: 'fa-bug'
    },
    {
        title: 'Hostsorvox Hosting Platform',
        category: 'development',
        type: 'Hosting Solution',
        description: 'Hosting and domain reseller platform with automated provisioning, security hardening, and billing integration.',
        technologies: ['PHP', 'cPanel API', 'WHMCS', 'Linux', 'Security Tools', 'Payment Integration', 'DNS'],
        achievements: [
            '30% improvement in server response',
            'Automated security monitoring',
            'Managed 1000+ domains',
            '99.9% uptime SLA achieved'
        ],
        icon: 'fa-globe'
    },
    {
        title: 'Payment Gateway Aggregator',
        category: 'development',
        type: 'Fintech Solution',
        description: 'Unified payment gateway solution integrating Stripe, PayPal, Square, and local payment methods with fraud detection.',
        technologies: ['Laravel', 'Payment APIs', 'Machine Learning', 'Redis', 'Queue Systems', 'Webhooks'],
        achievements: [
            'Integrated 10+ payment providers',
            'Reduced fraud by 75%',
            'Improved payment success rate by 15%',
            'Processing $5M+ monthly'
        ],
        icon: 'fa-money-check-alt'
    }
];

// Function to initialize projects
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!projectsGrid) return;
    
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? PROJECTS 
            : PROJECTS.filter(p => p.category === filter);
        
        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in-up';
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
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
        });
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
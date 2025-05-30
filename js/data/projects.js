// js/data/projects.js - Projects Data

const PROJECTS = [
    {
        title: 'E-commerce Platform - Apricart',
        category: 'development',
        type: 'Full-Stack E-commerce Solution',
        description: 'Led the end-to-end development and enhancement of the Apricart e-commerce platform (Magento 2). Key responsibilities included developing a Python-based competitor price crawler with automated dynamic pricing and daily reporting/alerts. Managed AWS infrastructure (Route 53, staging/sandbox environments, load balancing), built RESTful APIs for a Flutter mobile app, and created a ReactJS PWA. Integrated reporting analytics, marketing tools, and cross-platform notifications. Optimized web server performance (HTTP/3, reverse proxying), developed custom Magento modules, and led a development team.',
        technologies: [
            'Magento 2', 'PHP', 'Python', 'MySQL', 'Redis', 'Elasticsearch',
            'AWS (Route 53, EC2, S3, ELB)', 'Docker', 'Linux',
            'REST APIs', 'Flutter', 'ReactJS (PWA)',
            'JavaScript', 'Nginx', 'HTTP/3', 'Varnish',
            'Payment Gateways', 'Cron', 'Git', 'JIRA'
        ],
        achievements: [
            'Developed a Python-based crawler for automated competitor price tracking, dynamic pricing, data management, and daily reporting with alerts.',
            'Managed AWS infrastructure: Route 53, sandboxes, staging environments, and load balancing.',
            'Built RESTful APIs for a full-featured Flutter mobile application.',
            'Created and deployed a ReactJS Progressive Web App (PWA) consuming custom APIs.',
            'Integrated reporting analytics, marketing tools, and multi-platform notification systems.',
            'Optimized web server with HTTP/3, reverse proxying, and load balancing.',
            'Developed numerous custom Magento 2 modules for various business needs.',
            'Led and managed a development team, overseeing project lifecycle.',
            'Successfully handled 100K+ active customers and maintained high platform availability.'
        ],
        icon: 'fa-shopping-cart'
    },
    {
        title: 'Payment Gateway Security Implementation',
        category: 'security',
        type: 'Security Implementation',
        description: 'Implemented secure payment gateway with JS Bank featuring PCI DSS compliance, fingerprinting authentication, and advanced fraud detection.',
        technologies: ['Magento2', 'Laravel', 'PHP', 'Payment API', 'PCI DSS', 'OAuth', 'Fraud Detection', 'Encryption'],
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
        technologies: ['Linux', 'iptables', 'Docker', 'Kubernetes', 'Monitoring Tools', 'SIEM', 'IDS/IPS', 'Ansible', 'Terraform'],
        achievements: [
            'Improvement in availability',
            'Reduction in vulnerabilities',
            'Implemented zero-trust architecture',
            'Automated security patching',
            'Enhanced incident response time by 50%',
            'Achieved 99.99% uptime'
        ],
        icon: 'fa-server'
    },
    {
        title: 'Blockchain Supply Chain Platform',
        category: 'blockchain',
        type: 'Blockchain Solution',
        description: 'IBM Hyperledger-based supply chain tracking solution developed during Crypto Chicks Hackathon - Finalist project.',
        technologies: ['Blockchain', 'IBM Hyperledger', 'Docker', 'Smart Contracts', 'Node.js', 'Go'],
        achievements: [
            'Hackathon Finalist',
            'Real-time tracking capability',
            'Immutable audit trail',
            'Reduced supply chain disputes by 60%',
            'Improved transparency and trust',
            'Integrated with IoT devices for real-time data',
            'Supported 100K+ transactions (Demonstration)',
        ],
        icon: 'fa-link'
    },
    {
        title: 'Streamrolla Platform',
        category: 'development',
        type: 'SaaS Platform',
        description: 'No-code platform for content creators with secure payment integration, video streaming capabilities, and subscription management. Developed using Laravel and React with Stripe API integration. Implemented CDN for video delivery and WebRTC for real-time interactions. Optimized for high concurrency and low latency streaming. Domain Management and automated billing features included.',
        technologies: ['Laravel', 'React', 'Stripe API', 'Video Streaming', 'CDN', 'WebRTC', 'AWS', 'Docker', 'MySQL', 'Redis', 'Nginx', 'API Development', 'Payment Integration', 'Domain Management', 'Automated Billing', 'Security Hardening', 'Load Balancing', 'High Concurrency', 'Http/3', 'WebSockets', 'Real-time Notifications'],
        achievements: [
            '20% increase in creator productivity',
            'reduced buffering times',
            'Supported concurrent streams',
            '99.95% streaming uptime',
            'Automated billing and domain management',
            'Enhanced security with payment integration',  
            'Optimized for high concurrency and low latency',
            'Implemented real-time notifications and WebSockets for instant updates'
        ],
        icon: 'fa-play-circle'
    },
    {
        title: 'E-commerce Security Assessment Framework',
        category: 'security',
        type: 'Security Testing',
        description: 'Comprehensive security assessment of multiple e-commerce platforms including Magento, WooCommerce, and custom solutions. Focused on vulnerability scanning, penetration testing, and compliance with OWASP Top 10 and PCI DSS standards. Developed custom scripts for automated security checks and reporting.',
        technologies: ['Burp Suite', 'OWASP Top 10', 'SQL Injection', 'XSS Testing', 'Magento Security', 'PCI DSS', 'Vulnerability Scanning', 'Security Best Practices', 'Custom Scripts'],
        achievements: [
            'Identified 50+ critical vulnerabilities',
            'Improved security posture by 70%',
            'Achieved PCI compliance for clients',
            'Developed security best practices guide',
            'Automated vulnerability scanning',
            'Enhanced incident response procedures',
            'Conducted training sessions for development teams',
        ],
        icon: 'fa-shield-alt'
    },
    {
        //for this add in admin panel from scratch support panel, and add a section for admin panel, client plugins for different platforms supported throoughought embedded chatbox with custom designs
        title: 'Scalable Chat Platform',
        category: 'enterprise',
        type: 'Microservices Architecture',
        description: 'Microservices-based chat solution supporting 10K+ concurrent users with real-time messaging and video capabilities. Implemented WebSocket for low-latency communication and Redis for message queuing. Deployed on Kubernetes with auto-scaling and load balancing. Enhanced security with JWT authentication and rate limiting. Developed custom admin panel for user management and analytics.',
        technologies: ['Node.js', 'Microservices', 'WebSocket', 'MongoDB', 'Redis', 'Kubernetes', 'Load Balancing', 'Docker', 'API Development', 'Real-time Communication', 'Security Hardening', 'Monitoring Tools', 'CI/CD', 'High Availability', 'Auto-scaling', 'JWT Authentication', 'Rate Limiting', 'Admin Panel', 'Client Plugins', 'Custom Designs', 'Embedded Chatbox', 'Cross-platform Support'],
        achievements: [
            '50+ concurrent users',
            '99.9% uptime',
            'Sub-100ms message delivery',
            '25% reduction in infrastructure costs',
            'Enhanced user engagement with real-time features',
            'Implemented custom admin panel for user management and analytics',
            'Developed client plugins for various platforms',
            'Cross-platform support with embedded chatbox',
            'Custom designs for chat interfaces'
        ],
        icon: 'fa-comments'
    },
    {
        // this had a netflix like strucute had shops ecommerce and full video player that showed enterprise drm based content also developed ios mobile app and tv app reactjs,reactnative, custom remote mapping, custom api, cdn ,cache , aws , cloudflare , load balancing, nginx tuning, mysql and laravel php based , had stripe payment, analytics and such ,
        title: 'The Romp Magazine Platform',
        category: 'development',
        type: 'Digital Publishing',
        description: 'Digital magazine platform with web, mobile, and TV app integration featuring optimized content delivery and subscription management. Developed using Laravel and React Native with CDN for fast content delivery. Implemented Stripe for secure payments and push notifications for user engagement. Focused on cross-platform synchronization and performance optimization. Developed custom APIs for content management and user interactions. Integrated analytics for user behavior tracking and content performance. Implemented security measures for content protection and user data privacy.',
        technologies: ['Laravel', 'React Native', 'CDN', 'API Development', 'Stripe', 'Push Notifications', 'MySQL', 'Nginx', 'AWS', 'Cloudflare', 'Load Balancing', 'Docker', 'Mobile App Development', 'TV App Development', 'Content Management System (CMS)', 'Custom APIs', 'Analytics Integration', 'Security Hardening', 'Cross-platform Synchronization', 'Performance Optimization', 'User Engagement Features', 'Content Delivery Network (CDN)', 'Remote Mapping', 'Custom Remote Mapping', 'Custom API', 'Cache Management', 'Content Protection', 'User Data Privacy', 'Subscription Management', 'Content Management', 'User Interactions'],
        achievements: [
            '25% reduction in page load times',
            '20% reduction in time-to-market',
            'Cross-platform synchronization',
            '40% increase in user engagement',
            'Implemented custom APIs for content management and user interactions',
            'Integrated analytics for user behavior tracking and content performance', 
            'Enhanced security measures for content protection and user data privacy',
            'Developed mobile and TV apps for seamless user experience'
        ],
        icon: 'fa-newspaper'
    },
    {
        //this used whmcs api and cpanel api to automate domain and hosting provisioning, security hardening, billing integration, and dns management, had custom admin panel for managing domains and hosting accounts, integrated payment gateways for automated billing, implemented security measures for domain and hosting accounts, developed custom scripts for automated provisioning and management
        title: 'Hostsorvox Hosting Platform',
        category: 'development',
        type: 'Hosting Solution',
        description: 'Hosting and domain reseller platform with automated provisioning, security hardening, and billing integration. Developed using PHP and cPanel API with WHMCS integration for automated domain and hosting management. Implemented security measures for domain and hosting accounts, including automated monitoring and alerts. Developed custom scripts for provisioning and management of hosting accounts. Integrated payment gateways for automated billing and invoicing. Focused on high availability, performance optimization, and user-friendly admin panel for managing domains and hosting accounts. Implemented DNS management features for seamless domain handling.',
        technologies: ['PHP', 'cPanel API', 'WHMCS', 'Linux', 'Security Tools', 'Payment Integration', 'DNS', 'MySQL', 'Nginx', 'Docker', 'API Development', 'Automated Provisioning', 'Security Hardening', 'Billing Integration', 'Custom Scripts', 'Monitoring Tools', 'High Availability', 'Performance Optimization', 'User-friendly Admin Panel'],
        achievements: [
            '30% improvement in server response',
            'Automated security monitoring',
            'Managed 5+ domains',
            '99.9% uptime SLA achieved',
            'Automated domain and hosting provisioning using WHMCS and cPanel APIs',
            'Integrated payment gateways for automated billing and invoicing',
            'Implemented security measures for domain and hosting accounts',
            'Developed custom scripts for automated provisioning and management',
        ],
        icon: 'fa-globe'
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
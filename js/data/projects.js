// js/data/projects.js - Projects Data

const PROJECTS = [
    {
        title: 'Enterprise Payment Gateway Integration',
        category: 'security',
        type: 'Security Implementation',
        description: 'Implemented secure payment gateway with JS Bank featuring PCI DSS compliance and advanced fraud detection.',
        technologies: ['Laravel', 'PHP', 'Payment API', 'PCI DSS', 'OAuth'],
        achievements: ['Zero security incidents', 'PCI DSS certified', '0.01% fraud rate'],
        icon: 'fa-credit-card'
    },
    {
        title: 'Linux Infrastructure Hardening',
        category: 'security',
        type: 'Infrastructure Security',
        description: 'Enhanced Linux cluster security configurations and implemented comprehensive monitoring solutions.',
        technologies: ['Linux', 'iptables', 'Docker', 'Kubernetes', 'Monitoring Tools'],
        achievements: ['25% improvement in availability', '30% reduction in vulnerabilities'],
        icon: 'fa-server'
    },
    {
        title: 'Streamrolla Platform',
        category: 'development',
        type: 'Full-Stack Development',
        description: 'No-code platform for content creators with secure payment integration and video streaming capabilities.',
        technologies: ['Laravel', 'React', 'Stripe API', 'Video Streaming', 'CDN'],
        achievements: ['20% increase in project delivery', '25% reduced buffering times'],
        icon: 'fa-play-circle'
    },
    {
        title: 'Scalable Chat Platform',
        category: 'enterprise',
        type: 'Microservices Architecture',
        description: 'Microservices-based chat solution supporting 10K+ concurrent users with real-time messaging.',
        technologies: ['Node.js', 'Microservices', 'WebSocket', 'MongoDB', 'Redis'],
        achievements: ['10K+ concurrent users', '99.9% uptime', '25% increase in system uptime'],
        icon: 'fa-comments'
    },
    {
        title: 'The Romp Magazine',
        category: 'development',
        type: 'Digital Platform',
        description: 'Digital magazine platform with web, mobile, and TV app integration featuring optimized content delivery.',
        technologies: ['Laravel', 'React Native', 'CDN', 'API Development'],
        achievements: ['25% reduction in page load times', '20% reduction in time-to-market'],
        icon: 'fa-newspaper'
    },
    {
        title: 'Vulnerability Assessment Framework',
        category: 'security',
        type: 'Security Tools',
        description: 'Custom automation framework for vulnerability assessment following PTES methodology.',
        technologies: ['Python', 'Burp Suite API', 'Nmap', 'Metasploit', 'OWASP ZAP'],
        achievements: ['40% reduction in testing time', '60% faster vulnerability discovery'],
        icon: 'fa-shield-alt'
    },
    {
        title: 'Blockchain Supply Chain',
        category: 'enterprise',
        type: 'Blockchain Solution',
        description: 'IBM Hyperledger-based supply chain tracking solution developed during Crypto Chicks Hackathon.',
        technologies: ['Blockchain', 'IBM Hyperledger', 'Docker', 'Smart Contracts'],
        achievements: ['Hackathon Winner', 'Real-time tracking', 'Immutable audit trail'],
        icon: 'fa-link'
    },
    {
        title: 'Hostsorvox Platform',
        category: 'development',
        type: 'Hosting Solution',
        description: 'Hosting and domain reseller platform with automated provisioning and security hardening.',
        technologies: ['PHP', 'cPanel API', 'WHMCS', 'Linux', 'Security Tools'],
        achievements: ['30% improvement in server response', 'Automated security monitoring'],
        icon: 'fa-globe'
    },
    {
        title: 'E-commerce Security Assessment',
        category: 'security',
        type: 'Penetration Testing',
        description: 'Comprehensive security assessment of e-commerce platforms identifying critical vulnerabilities.',
        technologies: ['Burp Suite', 'OWASP Top 10', 'SQL Injection', 'XSS Testing'],
        achievements: ['Identified critical vulnerabilities', 'Improved security posture'],
        icon: 'fa-shopping-cart'
    },
    {
        title: 'API Security Enhancement',
        category: 'enterprise',
        type: 'API Development',
        description: 'Implemented secure RESTful APIs with JWT authentication and rate limiting.',
        technologies: ['Node.js', 'JWT', 'OAuth', 'Rate Limiting', 'API Gateway'],
        achievements: ['40% improvement in API reliability', '30% faster response times'],
        icon: 'fa-plug'
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
        
        filteredProjects.forEach(project => {
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
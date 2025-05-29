// js/data/experience.js - Professional Experience Data

const EXPERIENCE = [
    {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Sorvox Groups',
        location: 'Pakistan (Remote)',
        period: 'Apr 2022 - Jun 2024',
        current: false,
        type: 'Professional',
        description: 'Led security-focused development initiatives, conducted vulnerability assessments, and enhanced infrastructure security.',
        responsibilities: [
            'Enhanced Linux cluster uptime by optimising configurations, reaching 25% increase in system availability',
            'Conducted vulnerability assessments on web and API applications with tools like Nessus, Nmap, and Burp Suite',
            'Refined SAN/NAS storage and streamlined Docker and Kubernetes deployments, leading to 30% faster data retrieval',
            'Integrated scalable infrastructure solutions aligned with client needs',
            'Established data visualization tools and testing environments (Proxmox, VMware, WSL)'
        ],
        achievements: [
            '25% increase in system availability',
            '30% reduction in operational vulnerabilities',
            '30% reduction in release times',
            '20% faster decision-making through real-time insights'
        ],
        technologies: ['Linux', 'Docker', 'Kubernetes', 'Python', 'Nessus', 'Burp Suite', 'VMware', 'Proxmox']
    },
    {
        id: 2,
        title: 'IT Department Head',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Jul 2021 - Mar 2022',
        current: false,
        type: 'Leadership',
        description: 'Promoted to lead entire IT department after demonstrating exceptional leadership. Managed cross-functional teams and strategic technology initiatives.',
        responsibilities: [
            'Led IT department with 15+ team members across development, infrastructure, and security',
            'Developed and implemented IT strategy aligned with business objectives',
            'Managed departmental budget and resource allocation',
            'Oversaw enterprise-wide security initiatives and compliance',
            'Drove digital transformation initiatives across the organization',
            'Established IT governance and best practices',
            'Managed vendor relationships and technology partnerships'
        ],
        achievements: [
            'Reduced IT operational costs by 20%',
            'Improved system uptime to 99.9%',
            'Successfully led cloud migration project',
            'Implemented company-wide security awareness program'
        ],
        technologies: ['Leadership', 'Strategic Planning', 'Budget Management', 'Cloud Architecture', 'Security Governance']
    },
    {
        id: 3,
        title: 'Team Lead - Software Engineering',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Jan 2021 - Jun 2021',
        current: false,
        type: 'Leadership',
        description: 'Promoted to Team Lead after 3 months. Led software engineering team and managed critical e-commerce platform development.',
        responsibilities: [
            'Led team of 8 software engineers and 2 QA engineers',
            'Coordinated sprint planning and daily standups',
            'Mentored junior developers and conducted code reviews',
            'Architected scalable solutions for e-commerce platform',
            'Collaborated with product management on technical requirements',
            'Ensured delivery of high-quality software on schedule',
            'Implemented agile best practices and improved team velocity by 30%'
        ],
        achievements: [
            'Improved team productivity by 35%',
            'Reduced bug rate by 40%',
            'Successfully delivered 5 major features ahead of schedule',
            'Achieved 95% sprint completion rate'
        ],
        technologies: ['Team Leadership', 'Agile/Scrum', 'Code Review', 'Architecture Design','Spring Boot', 'Java', 'Python' ,'Crawlers', 'Automation', 'Scripting', 'DNS','Laravel', 'PHP', 'Magento 2', 'AWS', 'Payment Gateway', 'PCI DSS', 'RESTful API']
    },
    {
        id: 4,
        title: 'Senior Software Engineer',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Oct 2020 - Dec 2020',
        current: false,
        type: 'Professional',
        description: 'Started as Senior Software Engineer, quickly recognized for technical expertise and leadership potential.',
        responsibilities: [
            'Developed and maintained e-commerce platform using Laravel and Magento 2',
            'Integrated secure payment gateways including JS Bank with Fingerprinting authentication',
            'Improved RESTful API performance, reducing response times by 25%',
            'Configured AWS infrastructure including EC2, S3, RDS, and load balancers',
            'Implemented PCI DSS compliance measures for payment processing',
            'Built custom Magento 2 modules for enhanced functionality',
            'Developed CRON jobs and crawlers for automated data processing'
        ],
        achievements: [
            'Employee of the Month (2021)',
            '35% boost in system resilience',
            '20% increase in cloud stability',
            'Zero security incidents in payment processing'
        ],
        technologies: ['Laravel', 'Magento 2', 'Team Leadership', 'Agile/Scrum', 'Code Review', 'Architecture Design']
    },
    {
        id: 5,
        title: 'Full Stack Developer',
        company: 'Creative Drop DMCC',
        location: 'Dubai, UAE (Remote)',
        period: 'Dec 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Fostered scalable CMS backends and integrated secure API solutions for international clients.',
        responsibilities: [
            'Developed scalable CMS backends using PHP Laravel',
            'Integrated secure API solutions with PHP, Node, and Python',
            'Built custom e-commerce solutions with payment gateway integrations',
            'Enriched DNS configurations for improved domain stability',
            'Automated DNS management with scripting, reducing manual work by 30%',
            'Implemented JWT and OAuth for secure authentication',
            'Developed RESTful and GraphQL APIs for mobile applications'
        ],
        achievements: [
            '35% improvement in content management efficiency',
            '20% increase in system reliability',
            '30% reduction in manual DNS management',
            'Successfully delivered 10+ client projects'
        ],
        technologies: ['PHP', 'Laravel', 'CMS Integrations','Mobile Application', 'E-Commerce Development', 'Node.js', 'Python', 'JWT', 'OAuth', 'DNS Management', 'GraphQL']
    },
    {
        id: 6,
        title: 'Software Engineer',
        company: 'Chatcloud.co',
        location: 'Pakistan',
        period: 'Jan 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Executed security measures for backend systems and built scalable chat infrastructure.',
        responsibilities: [
            'Engineered scalable backend solutions with Node.js microservices on Kubernetes',
            'Enhanced API call reliability by 40% with secure key-based authentication',
            'Managed MongoDB chat backend supporting WebSocket connections',
            'Directed infrastructure configurations on Azure and Debian OS',
            'Implemented clustering and virtualization for improved performance',
            'Built real-time messaging features supporting 10K+ concurrent users',
            'Developed load balancing solutions using Nginx'
        ],
        achievements: [
            '25% increase in system uptime through HTTP failover',
            '40% improvement in API call reliability',
            'Supported 10K+ concurrent users',
            'Reduced infrastructure costs by 15%'
        ],
        technologies: ['Node.js','Plugin Development', 'Realtime','SocketIO', 'Microservices', 'Kubernetes', 'MongoDB', 'WebSocket', 'Azure', 'Load Balancing']
    },
    {
        id: 7,
        title: 'Freelance Developer',
        company: 'Independent Projects',
        location: 'Pakistan',
        period: '2017 - 2019',
        current: false,
        type: 'Professional',
        description: 'Completed various development projects including blockchain implementations, e-commerce solutions, and hosting services.',
        responsibilities: [
            'Developed Streamrolla - No code platform for content creators with secure payment integration',
            'Created The Romp Magazine - Digital Magazine Web/Mobile/TV App',
            'Built Hostsorvox - Hosting and Domain Reseller platform',
            'Implemented blockchain solutions using IBM Hyperledger',
            'Developed custom e-commerce solutions using Magento and WooCommerce',
            'Created secure payment gateway integrations for multiple platforms',
            'Participated in competitive programming and hackathons'
        ],
        achievements: [
            'Crypto Chicks Hackathon Winner (2019) - Blockchain Supply Chain Solution',
            'ICPC Lahore Regional - Fastest Problem Solver (2017)',
            'COMBAT Algorithm Competition Organizer (2018)',
            '20% increase in project delivery efficiency',
            'Successfully delivered 25+ client projects'
        ],
        technologies: ['Blockchain', 'IBM Hyperledger', 'Laravel', 'PHP', 'Python', '.NET', 'JavaScript', 'Magento', 'WooCommerce', 'Payment Gateways']
    }
];

// Function to render experience timeline
function renderExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    EXPERIENCE.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'} fade-in-up`;
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-header">
                    <h3>${exp.title}</h3>
                    <h4>${exp.company}</h4>
                    <div class="timeline-meta">
                        <span class="timeline-period">${exp.period}</span>
                        ${exp.current ? '<span class="timeline-current">Current</span>' : ''}
                        <span class="timeline-location"><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                    </div>
                </div>
                <p class="timeline-description">${exp.description}</p>
                <div class="timeline-details">
                    <h5>Key Responsibilities:</h5>
                    <ul class="timeline-list">
                        ${exp.responsibilities.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                    ${exp.achievements.length > 0 ? `
                        <h5>Achievements:</h5>
                        <ul class="timeline-achievements">
                            ${exp.achievements.map(a => `<li><i class="fas fa-trophy"></i> ${a}</li>`).join('')}
                        </ul>
                    ` : ''}
                    <div class="timeline-tech">
                        ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="timeline-dot"></div>
        `;
        
        timeline.appendChild(timelineItem);
    });
}

// Make function available globally
window.renderExperience = renderExperience;
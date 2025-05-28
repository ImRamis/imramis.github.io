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
        technologies: ['Linux', 'Docker', 'Kubernetes', 'Python', 'Nessus', 'Burp Suite', 'VMware']
    },
    {
        id: 2,
        title: 'Senior Software Engineer',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Oct 2020 - Mar 2022',
        current: false,
        type: 'Professional',
        description: 'Aligned technical solutions with client requirements, enhancing product growth, security, and client relationships.',
        responsibilities: [
            'Increased scalability and resilience of RHEL infrastructure on AWS by configuring EC2, DNS, and load balancers',
            'Improved RESTful API performance, dipping response times by 25% for smoother user experience',
            'Developed CRON jobs and crawlers to strengthen monitoring and improve data-driven reporting by 30%',
            'Configured Docker, Kubernetes, AWS services, and firewalls (iptables)',
            'Led secure payment gateway integrations with JS Bank, implementing Fingerprinting authentication'
        ],
        achievements: [
            'Employee of the Month (2021)',
            '35% boost in system resilience',
            '20% increase in cloud stability',
            '15% decrease in potential downtime'
        ],
        technologies: ['Laravel', 'PHP', 'AWS', 'Docker', 'Kubernetes', 'RESTful API', 'Payment Gateway']
    },
    {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Creative Drop DMCC',
        location: 'Dubai, UAE (Remote)',
        period: 'Dec 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Fostered scalable CMS backends and integrated secure API solutions.',
        responsibilities: [
            'Developed scalable CMS backends using PHP Laravel, resulting in 35% improvement in content management efficiency',
            'Integrated secure API solutions with PHP, Node, and Python, utilizing JWT and OAuth',
            'Enriched DNS configurations, reaching greater domain stability',
            'Automated DNS management with scripting, reducing manual work by 30%'
        ],
        achievements: [
            '35% improvement in content management efficiency',
            '20% increase in system reliability',
            '30% reduction in manual DNS management'
        ],
        technologies: ['PHP', 'Laravel', 'Node.js', 'Python', 'JWT', 'OAuth', 'DNS Management']
    },
    {
        id: 4,
        title: 'Software Engineer',
        company: 'Chatcloud.co',
        location: 'Pakistan',
        period: 'Jan 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Executed security measures for backend systems on Microsoft and Linux platforms.',
        responsibilities: [
            'Proposed and engineered scalable backend solutions with Node.js microservices on Kubernetes',
            'Enhanced API call reliability by 40% with secure key-based authentication',
            'Managed MongoDB chat backend with WebSocket connections',
            'Directed infrastructure configurations on Azure and Debian OS',
            'Augmented security with clustering and virtualization techniques'
        ],
        achievements: [
            '25% increase in system uptime through HTTP failover',
            '40% improvement in API call reliability',
            'Supported 10K+ concurrent users'
        ],
        technologies: ['Node.js', 'Microservices', 'Kubernetes', 'MongoDB', 'WebSocket', 'Azure']
    },
    {
        id: 5,
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
            'Implemented security measures for CMS systems and mitigated ongoing attacks',
            'Participated in competitive programming and hackathons'
        ],
        achievements: [
            'Crypto Chicks Hackathon Winner (2019)',
            'ICPC Lahore Regional - Fastest Problem Solver (2017)',
            'COMBAT Algorithm Competition Organizer (2018)',
            '20% increase in project delivery efficiency'
        ],
        technologies: ['Blockchain', 'IBM Hyperledger', 'Laravel', 'PHP', 'Python', 'JavaScript', 'OWASP']
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
                    <h3 class="timeline-title">${exp.title}</h3>
                    <h4 class="timeline-company">${exp.company}</h4>
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
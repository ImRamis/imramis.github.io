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
        description: 'Led security assessments and spearheaded the development of secure software solutions for diverse client projects. Optimized cloud infrastructure for enhanced security and performance, and delivered numerous full-stack applications with a strong emphasis on robust security practices.',
        responsibilities: [
            'Led security assessments using Nessus, Nmap, and Burp Suite, identifying critical flaws that contributed to a 30% reduction in operational vulnerabilities for client projects.',
            'Delivered over 15 full-stack projects, including Python automation scripts for security tasks, mobile applications with secure backends, and reverse-engineered game modifications for vulnerability analysis.',
            'Optimised and secured Linux cloud infrastructure (AWS), improving system availability by 25% and increasing data retrieval speeds by 30% through streamlined Docker and Kubernetes deployments.',
            'Architected and secured high-performance RESTful APIs for diverse client projects, implementing robust authentication (OAuth 2.0, JWT) and authorization mechanisms, ensuring data protection for e-commerce and business applications.',
            'Engineered and implemented security enhancements for Linux cloud infrastructure, bolstering defences against common attack vectors.',
            'Developed Python automation scripts for vulnerability scanning and security log analysis, improving the efficiency of security operations by 20%.',
            'Contributed to incident response activities, analysing security events and implementing corrective actions to mitigate threats.',
            'Established data visualization tools and testing environments (Proxmox, VMware, WSL) for security testing and performance analysis.'
        ],
        achievements: [
            'Contributed to a 30% reduction in client operational vulnerabilities through comprehensive security assessments.',
            'Improved system availability by 25% for Linux cloud infrastructure.',
            'Increased data retrieval speeds by 30% via Docker and Kubernetes optimization.',
            'Improved efficiency of security operations by 20% through Python automation scripts.',
            'Successfully delivered over 15 diverse full-stack projects with a security-first approach.'
        ],
        technologies: ['Python', 'Linux', 'Docker', 'Kubernetes', 'AWS', 'Nessus', 'Nmap', 'Burp Suite', 'REST APIs', 'OAuth 2.0', 'JWT', 'Security Assessments', 'Vulnerability Management', 'Full-Stack Development', 'Proxmox', 'VMware']
    },
    {
        id: 2,
        title: 'IT Department Lead',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Jul 2021 - Mar 2022',
        current: false,
        type: 'Leadership',
        description: 'Directed a 15-member IT department, championing a security-first approach. Led strategic IT initiatives, including a major cloud migration to AWS, and significantly enhanced the company\'s security posture and operational efficiency.',
        responsibilities: [
            'Directed a 15-member IT department, encompassing development, infrastructure, and security teams, fostering a security-first culture.',
            'Reduced annual operational costs by 20% through strategic planning, resource optimisation, and technology consolidation.',
            'Achieved and maintained 99.9% system uptime by leading a successful cloud migration project to AWS and establishing new security governance frameworks.',
            'Directed an overhaul of the tech architecture using automation tools, significantly reducing downtime and ensuring uninterrupted enterprise workflows.',
            'Established IT governance, policies, and best practices, including comprehensive security protocols.',
            'Implemented security awareness training programs for staff, reducing susceptibility to phishing and social engineering attacks.',
            'Managed departmental budget, vendor relationships, and technology partnerships.'
        ],
        achievements: [
            'Reduced annual IT operational costs by 20%.',
            'Achieved and maintained 99.9% system uptime.',
            'Successfully led enterprise-wide cloud migration to AWS.',
            'Established new security governance frameworks, enhancing overall security posture.',
            'Significantly reduced staff susceptibility to phishing attacks through awareness programs.'
        ],
        technologies: ['Leadership', 'Strategic IT Planning', 'Budget Management', 'AWS Cloud Migration', 'Security Governance', 'Risk Management', 'Automation Strategy', 'Vendor Management', 'Team Building']
    },
    {
        id: 3,
        title: 'Team Lead - Software Engineering',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Jan 2021 - Jun 2021',
        current: false,
        type: 'Leadership',
        description: 'Promoted to Team Lead after 3 months. Led a 10-person engineering team, instilling secure coding best practices (OWASP SAMM) and conducting regular security code reviews. Architected a migration to a scalable and secure microservices framework, ensuring high-quality software delivery.',
        responsibilities: [
            'Led team of 8 software engineers and 2 QA engineers',
            'Coordinated sprint planning and daily standups',
            'Mentored junior developers and conducted code reviews',
            'Architected scalable solutions for e-commerce platform',
            'Collaborated with product management on technical requirements',
            'Ensured delivery of high-quality software on schedule',
            'Implemented agile best practices and improved team velocity by 30%',
            'Managed technical debt and code quality standards',
            'Facilitated cross-team collaboration for integrated solutions',
            'Developed and maintained RESTful APIs for e-commerce features',
            'Integrated payment gateways and ensured PCI DSS compliance',
        ],
        achievements: [
            'Led a 10-person engineering team (8 developers, 2 QA), improving team productivity by 35% and achieving a 95% sprint completion rate through Agile best practices.',
            'Architected the successful migration to a scalable microservices framework, ensuring security was embedded throughout the design and development lifecycle (DevSecOps).',
            'Improved team productivity by 35%',
            'Reduced bug rate by 40%',
            'Successfully delivered 5 major features ahead of schedule',
            'Achieved 95% sprint completion rate',
            'Enhanced API security with JWT and OAuth',
            'Implemented automated testing framework, reducing regression issues by 50%',
            'Led successful migration to microservices architecture, improving system scalability',
            'Increased code coverage to 85% through unit and integration tests',
        ],
        technologies: ['Team Leadership', 'Agile/Scrum', 'Code Review', 'Architecture Design','Spring Boot', 'Java', 'Python' ,'Crawlers', 'Automation', 'Scripting', 'DNS','Laravel', 'PHP', 'Magento 2', 'AWS', 'Payment Gateway', 'PCI DSS', 'RESTful API', 'Magento 2', 'E-Commerce Development', 'Security Code Review', 'OWASP SAMM', 'Mentorship', 'Microservices Architecture', 'Automated Testing', 'Security']
    },
    {
        id: 4,
        title: 'Senior Software Engineer',
        company: 'Apricart E-Stores Private Ltd',
        location: 'Pakistan',
        period: 'Oct 2020 - Dec 2020',
        current: false,
        type: 'Professional',
        description: 'Engineered secure e-commerce solutions, including a PCI DSS compliant payment gateway. Focused on API security, secure data handling, and hardening AWS infrastructure. Led architecture design discussions and proposed improvements to enhance system resilience and performance.',
        responsibilities: [
            'Engineered secure e-commerce solutions using Laravel and Magento 2',
            'Integrated secure payment gateways, including JS Bank with fingerprinting authentication',
            'Improved RESTful API performance, reducing response times by 25%',
            'Configured and hardened AWS infrastructure (EC2, S3, RDS, load balancers)',
            'Implemented PCI DSS compliance measures for payment processing',
            'Built custom Magento 2 modules for enhanced functionality',
            'Developed CRON jobs and crawlers for automated data processing',
            'Conducted code reviews and provided mentorship to junior developers',
            'Collaborated with cross-functional teams to gather requirements and deliver solutions',
            'Led architecture design discussions and proposed improvements',
            'Managed DNS configurations and domain setups for e-commerce sites',
            'Automated DNS management with scripting, reducing manual work by 30%',
            'Implemented JWT and OAuth for secure authentication'
        ],
            // 'Employee of the Month (2021)',
            // '35% boost in system resilience',
            // '20% increase in cloud stability',
            // 'Zero security incidents in payment processing',
            // 'Successfully delivered 3 major projects ahead of schedule',
            // 'Enhanced API security with JWT and OAuth',
            // 'Achieved zero security incidents for the integrated payment gateway.',
            // 'Improved RESTful API performance by 25%.',
            // 'Contributed to a 35% boost in system resilience via AWS hardening.',
            // 'Increased cloud stability by 20%.',
            // 'Awarded Employee of the Month (2021) for contributions during this period and subsequent roles.'
        //based on the commented creata a new achivements array that focuses on security, performance, and system resilience and development achievements        
        achievements: [
            'Successfully delivered 3 major projects ahead of schedule',
            'Enhanced API security with JWT and OAuth',
            'Achieved zero security incidents for the integrated payment gateway',
            'Improved RESTful API performance by 25%',
            'Contributed to a 35% boost in system resilience via AWS hardening',
            'Increased cloud stability by 20%',
            'Awarded Employee of the Month (2021) for contributions during this period and subsequent roles'
        ],
        technologies: ['Laravel', 'PHP', 'Magento 2', 'Python', 'Crawlers', 'RESTful APIs', 'AWS', 'PCI DSS', 'Payment Gateway Integration', 'Fingerprinting Authentication', 'JWT', 'OAuth', 'DNS Management', 'Security Hardening', 'Team Leadership', 'Agile/Scrum', 'Code Review', 'Architecture Design', 'Spring Boot', 'Java', 'Automation', 'Scripting']
    },
    {
        // for them converted normal static websites to cms using custom cms based system not laravel, around 10+ projects also did some mobile application development also added some dns management and api integration also did some e-commerce development
        id: 5,
        title: 'Full Stack Developer',
        company: 'Creative Drop DMCC',
        location: 'Pakistan',
        period: 'Dec 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Delivered end-to-end development for 10+ client projects, integrating security measures into e-commerce and CMS solutions. Engineered scalable backends and robust APIs.',
        responsibilities: [
            'Delivered end-to-end development for over 10 client projects, building custom e-commerce and CMS solutions from requirements gathering to final deployment, integrating security measures (input validation, output encoding, secure authentication).',
            'Engineered scalable CMS backends using PHP Laravel, which improved content management efficiency for clients by 35%.',
            'Integrated robust user authentication (JWT, OAuth) for RESTful and GraphQL APIs using PHP, Node.js, and Python to meet client requirements.',
            'Developed custom automation scripts to streamline DNS management, enhancing configuration accuracy and improving infrastructure reliability by reducing attack surfaces.',
            'Converted static websites to dynamic CMS-based systems using custom solutions.',
            'Developed mobile applications and integrated various third-party APIs.'
        ],
        achievements: [
            'Improved content management efficiency for clients by 35%',
            'Successfully delivered over 10 diverse client projects with integrated security',
            'Enhanced infrastructure reliability through automated DNS management',
            'Streamlined workflows and increased system reliability by 20% for API solutions'
        ],
        technologies: ['PHP', 'Laravel', 'Node.js', 'Python', 'RESTful APIs', 'GraphQL', 'JWT', 'OAuth', 'CMS Development', 'E-commerce Development', 'DNS Management', 'Scripting', 'API Integration', 'Mobile App Development (Conceptual/Backend Support)']
    },
    {
        id: 6,
        title: 'Software Engineer',
        company: 'Chatcloud.co',
        location: 'Pakistan',
        period: 'Jan 2016 - Dec 2018',
        current: false,
        type: 'Professional',
        description: 'Engineered a scalable real-time messaging backend, implementing secure API endpoints and transport layer security. Secured infrastructure on Azure and developed key client-facing components.',
        responsibilities: [
            'Engineered a scalable real-time messaging backend using Node.js, MongoDB, and WebSockets to successfully support over 1,000 concurrent users securely.',
            'Developed a universal JavaScript plugin for seamless client-side integration and built a responsive, Angular-based dashboard for customer support and system monitoring.',
            'Achieved 99.9% system availability by implementing Nginx load balancing, clustering on Azure, and HTTP failover mechanisms, contributing to a 15% reduction in infrastructure costs.',
            'Secured API endpoints with key-based authentication and transport layer security, contributing to a 40% improvement in API call reliability.',
            'Implemented network segmentation, firewall rules, and VPN-based isolation for backend systems on Azure (Debian OS).',
            'Conducted security audits and implemented data protection best practices.'
        ],
        achievements: [
            'Successfully supported over 1,000 concurrent users on the messaging platform.',
            'Achieved 99.9% system availability.',
            'Reduced infrastructure costs by 15%.',
            'Improved API call reliability by 40% through enhanced security.',
            'Engineered backend supporting 500+ concurrent users (design capacity, achieved 1K+ live)'
        ],
        technologies: ['Node.js', 'MongoDB', 'WebSockets', 'JavaScript (Plugins)', 'Angular (Dashboard)', 'Azure', 'Nginx', 'Load Balancing', 'Clustering', 'Microservices (Concepts)', 'API Security', 'Debian OS', 'Real-time Communication']
    },
    {
        id: 7,
        title: 'Freelance Developer',
        company: 'Independent Projects',
        location: 'Pakistan',
        period: 'Jan 2013 - Dec 2015',
        current: false,
        type: 'Professional',
        description: 'Delivered diverse web and mobile solutions for multiple clients, focusing on custom development, e-commerce, and integrating foundational security measures. Provided consultancy on web security best practices.',
        responsibilities: [
            'Developed and secured custom CMS systems for small to medium-sized businesses.',
            'Integrated secure payment gateways (e.g., PayPal, Stripe) for e-commerce platforms.',
            'Built RESTful APIs for mobile applications and third-party services.',
            'Managed DNS configurations, domain setups, and basic hosting environments.',
            'Created web crawlers and automation scripts using Python and PHP.',
            'Developed mobile applications for Android and iOS (native and hybrid approaches).',
            'Implemented web application security measures (input validation, output encoding, secure session management).',
            'Provided technical guidance and security consultancy to clients on 30+ projects.'
        ],
        achievements: [
            'Successfully delivered over 30 diverse client projects on time and within budget.',
            'Achieved high client satisfaction with 95% positive feedback.',
            'Reduced project delivery times by an average of 20% through efficient development practices.',
            'Helped clients improve their web security posture through consultancy and secure development.'
        ],
        technologies: ['PHP', 'Laravel', 'Python', '.NET', 'JavaScript', 'HTML5', 'CSS3', 'Magento', 'WooCommerce', 'WordPress', 'Payment Gateway Integration', 'DNS Management', 'API Development', 'Custom CMS', 'Web Crawlers', 'Android Development', 'iOS Development', 'Web Security Basics', 'Blockchain (IBM Hyperledger - early explorations)']
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
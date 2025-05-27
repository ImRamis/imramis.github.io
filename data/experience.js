// js/data/experience.js - Professional Experience Data

const EXPERIENCE = [
    {
        id: 1,
        title: 'MSc Student & OSCP Graduate',
        company: 'University of Sheffield',
        location: 'Sheffield, UK',
        period: 'Sep 2024 - Present',
        current: true,
        type: 'Education',
        description: 'Completing MSc in Cybersecurity and Artificial Intelligence with Merit classification expected. Achieved OSCP and OSCP+ certifications while studying.',
        responsibilities: [
            'Advanced coursework in Digital Forensics and Machine Learning for Security',
            'Completed OSCP certification (April 2025) during studies',
            'Research project on AI-powered threat detection systems',
            'Pursuing CREST certification for UK market readiness'
        ],
        achievements: [
            'OSCP and OSCP+ certified while maintaining academic excellence',
            'Expected Merit classification',
            'Active participant in university CTF competitions'
        ],
        technologies: ['Python', 'Machine Learning', 'Digital Forensics', 'Security Research']
    },
    {
        id: 2,
        title: 'Senior Software Engineer',
        company: 'Sorvox Groups',
        location: 'Pakistan (Remote)',
        period: 'Apr 2022 - Jun 2024',
        current: false,
        type: 'Professional',
        description: 'Led security-focused development initiatives and infrastructure hardening projects, achieving significant improvements in system reliability and security posture.',
        responsibilities: [
            'Conducted comprehensive security assessments and penetration testing',
            'Enhanced Linux cluster security configurations improving availability by 25%',
            'Implemented DevSecOps practices across development pipeline',
            'Led team of 5 developers in secure coding practices',
            'Designed and deployed security testing environments'
        ],
        achievements: [
            '25% improvement in system availability through security enhancements',
            'Zero security incidents during tenure',
            'Implemented automated security scanning in CI/CD pipeline',
            'Reduced vulnerability discovery time by 60%'
        ],
        technologies: ['Linux', 'Docker', 'Kubernetes', 'Python', 'Security Tools', 'DevSecOps']
    },
    {
        id: 3,
        title: 'Senior Software Engineer',
        company: 'Apricart E-Stores',
        location: 'Pakistan',
        period: 'Oct 2020 - Mar 2022',
        current: false,
        type: 'Professional',
        description: 'Led secure payment gateway integrations and e-commerce platform development, ensuring PCI DSS compliance and maintaining perfect security record.',
        responsibilities: [
            'Architected secure payment gateway integration with JS Bank',
            'Ensured PCI DSS compliance across all payment processes',
            'Improved API security and response times by 30%',
            'Developed real-time monitoring and alerting systems',
            'Led security code reviews and vulnerability assessments'
        ],
        achievements: [
            'Employee of the Month Award (2021)',
            'Zero payment security incidents',
            'PCI DSS compliance achieved and maintained',
            '30% improvement in API performance'
        ],
        technologies: ['Laravel', 'PHP', 'Payment APIs', 'PCI DSS', 'MySQL', 'Redis', 'Security Monitoring']
    },
    {
        id: 4,
        title: 'Full Stack Developer',
        company: 'Creative Drop DMCC',
        location: 'Dubai, UAE (Remote)',
        period: 'Dec 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Developed secure CMS backends and implemented robust authentication systems for enterprise clients.',
        responsibilities: [
            'Built secure CMS backends with role-based access control',
            'Implemented JWT and OAuth authentication systems',
            'Automated DNS management with security-focused scripting',
            'Developed RESTful APIs with comprehensive security measures',
            'Created custom WordPress plugins with security hardening'
        ],
        achievements: [
            'Delivered 10+ secure CMS implementations',
            'Reduced authentication vulnerabilities by 80%',
            'Automated security patching processes'
        ],
        technologies: ['PHP', 'Laravel', 'WordPress', 'JavaScript', 'OAuth', 'JWT', 'MySQL']
    },
    {
        id: 5,
        title: 'Software Engineer',
        company: 'Chatcloud.co',
        location: 'Pakistan',
        period: 'Jan 2019 - Aug 2020',
        current: false,
        type: 'Professional',
        description: 'Implemented security measures for scalable chat platform serving 10K+ concurrent users.',
        responsibilities: [
            'Developed secure backend systems on Microsoft and Linux platforms',
            'Built scalable microservices with key-based authentication',
            'Enhanced infrastructure security through clustering',
            'Implemented end-to-end encryption for chat messages',
            'Created real-time threat detection systems'
        ],
        achievements: [
            'Supported 10K+ concurrent users with 99.9% uptime',
            'Implemented zero-trust security architecture',
            'Reduced security incidents by 90%'
        ],
        technologies: ['Node.js', 'Microservices', 'Redis', 'WebSockets', 'Go', 'Security Architecture']
    },
    {
        id: 6,
        title: 'Junior Software Developer',
        company: 'Freelance Projects',
        location: 'Pakistan',
        period: '2017 - 2019',
        current: false,
        type: 'Professional',
        description: 'Completed various development projects including blockchain implementations and e-commerce solutions.',
        responsibilities: [
            'Developed blockchain-based solutions for supply chain tracking',
            'Created e-commerce platforms with Magento 2',
            'Built custom CRM systems with Laravel',
            'Implemented payment gateway integrations',
            'Participated in competitive programming and hackathons'
        ],
        achievements: [
            'Crypto Chicks Hackathon Winner (2019)',
            'ICPC Lahore Regional Fastest Problem Solver (2017)',
            'Delivered 20+ successful projects'
        ],
        technologies: ['Blockchain', 'Solidity', 'Magento 2', 'Laravel', 'React', 'Payment Gateways']
    }
];

// Function to render experience timeline
function renderExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    
    timeline.innerHTML = '';
    
    EXPERIENCE.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'} fade-in-up stagger-${index + 1}`;
        
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderExperience);
} else {
    renderExperience();
}
// js/data/certifications.js - Certifications & Education Data

const CERTIFICATIONS = [
    {
        id: 1,
        name: 'OSCP',
        fullName: 'Offensive Security Certified Professional',
        organization: 'Offensive Security',
        date: 'April 2025',
        status: 'completed',
        verificationUrl: 'https://credentials.offsec.com/5185a463-88bf-4ad2-8546-2555585d8cc4',
        credentialId: '140250188',
        type: 'certification',
        category: 'security',
        icon: 'fa-shield-alt',
        description: 'OSCP is a hands-on penetration testing certification that demonstrates the ability to identify and exploit vulnerabilities in various systems. It is widely recognized in the cybersecurity industry as a benchmark for practical skills.',
        skills: ['Buffer Overflow', 'Active Directory', 'OSCP', 'Burp Suite', 'Bash Scripting', 'Client-side Attacks', 'Nmap', 'Kali Linux', 'Practical Tools', 'Threat Modelling', 'Wireshark', 'Windows Buffer Overflows', 'Command Line', 'Cyber-security', 'Metasploit', 'Vulnerability Scanning', 'Locating Public Exploits', 'Vulnerability Assessment and Penetration Testing (VAPT)', 'Web Application Attacks', 'Penetration Testing', 'Linux Buffer Overflows', 'Privilege Escalation', 'Post-Exploitation', 'Windows Security', 'Linux Security', 'Active Directory', 'Pivoting', 'Lateral Movement']
    },
    {
        id: 2,
        name: 'OSCP+',
        fullName: 'Offensive Security Certified Professional+',
        organization: 'Offensive Security',
        date: 'April 2025',
        status: 'completed',
        verificationUrl: 'https://credentials.offsec.com/559e642d-824b-4657-bdd9-8b315e1845f7',
        credentialId: '140250238',
        type: 'certification',
        category: 'security',
        icon: 'fa-shield-alt',
        description: 'OSCP+ is an extension of OSCP, extending the certification validity to 3 years.',
        skills:['Buffer Overflow', 'Active Directory', 'OSCP', 'Burp Suite', 'Bash Scripting', 'Client-side Attacks', 'Nmap', 'Kali Linux', 'Practical Tools', 'Threat Modelling', 'Wireshark', 'Windows and Linux Buffer Overflows', 'Command Line', 'Cyber-security', 'Metasploit', 'Vulnerability Scanning', 'Locating Public Exploits', 'Vulnerability Assessment and Penetration Testing (VAPT)', 'Web Application Attacks', 'Penetration Testing', 'Linux Buffer Overflows', 'Privilege Escalation', 'Post-Exploitation', 'Windows Security', 'Linux Security', 'Active Directory', 'Pivoting', 'Lateral Movement', 'Advanced Penetration Testing', 'Complex Network Exploitation', 'Evasion Techniques', 'Custom Exploit Development Concepts', 'Advanced Active Directory Attacks', 'Web Application Security Deep Dive', 'Cloud Penetration Testing Basics']
    },
    {
        id: 3,
        name: 'CREST',
        fullName: 'CREST Registered Penetration Tester / Practitioner Security Analyst',
        organization: 'CREST UK',
        date: 'Expected July 2025',
        status: 'in-progress',
        type: 'certification',
        category: 'security',
        icon: 'fa-flag',
        description: 'UK\'s premier penetration testing qualification recognized by government and enterprise organizations for security testing excellence.',
        skills: ['UK Security Standards', 'Enterprise Penetration Testing', 'Compliance Reporting', 'Professional Ethics', 'Methodical Security Testing', 'Client Engagement', 'Professional Standards']
    },
    {
        id: 4,
        name: 'MSc Cybersecurity & AI',
        fullName: 'Master of Science in Cybersecurity and Artificial Intelligence',
        organization: 'University of Sheffield',
        date: 'Sep 2024 - Sep 2025 (Expected)',
        status: 'in-progress',
        type: 'education',
        category: 'academic',
        icon: 'fa-graduation-cap',
        description: 'Advanced degree from Russell Group university (World Top 100) covering cybersecurity, AI applications in security, digital forensics, and secure software development.',
        skills: ['Machine Learning', 'Digital Forensics', 'Natural Language Processing', 'Secure Software Development', 'AI Security'],
        achievements: ['Studying at a Russell Group University', 'Enrolled in a World Top 100 University Program', 'Expected Merit Classification']
    },
    {
        id: 5,
        name: 'BSc Computer Science',
        fullName: 'Bachelor of Science in Computer Science',
        organization: 'Pakistan Air Force Karachi Institute of Economics and Technology',
        date: 'Aug 2014 - Dec 2018',
        status: 'completed',
        type: 'education',
        category: 'academic',
        icon: 'fa-university',
        description: 'Comprehensive computer science education with focus on software engineering, algorithms, network security, and AI fundamentals.',
        skills: ['Software Engineering Principles', 'Algorithm Design', 'Data Structures Implementation', 'Network Security Fundamentals', 'Database Management Systems', 'Network Programming', 'AI Concepts', 'Design Patterns'],
        achievements: ['Multiple Hackathon Participations & Wins', 'Competitive Programming Awards (ICPC Regional Recognition)']
    }
];

const TRAINING = [
    {
        id: 1,
        name: 'PEN-200',
        fullName: 'Penetration Testing with Kali Linux',
        organization: 'Offensive Security',
        status: 'completed',
        category: 'offensive',
        description: 'The foundational and mandatory course for the OSCP certification, covering a wide array of penetration testing methodologies, tools, and techniques using Kali Linux.'
    },
    {
        id: 2,
        name: 'CPENT (LPT)',
        fullName: 'Certified Penetration Testing Professional - Licensed Penetration Tester',
        organization: 'EC-Council',
        status: 'planned',
        category: 'offensive',
        description: 'A comprehensive penetration testing program covering advanced techniques, report writing, and methodologies for professional testers, leading to the LPT (Master) credential.'
    },
    {
        id: 3,
        name: 'PEN-300',
        fullName: 'Evasion Techniques and Breaching Defenses', 
        organization: 'Offensive Security',
        status: 'planned',
        category: 'offensive',
        description: 'An advanced course focusing on evading security defenses, modifying exploits, and advanced post-exploitation techniques. Prepares for the OSEP certification.'
    }
];

const AWARDS = [
    {
        id: 1,
        title: 'Employee of the Month',
        organization: 'Apricart E-Stores',
        date: '2021',
        icon: 'fa-trophy',
        description: 'Recognized for outstanding contributions, driving a 20% increase in team productivity and significantly contributing to key security and development projects.'
    },
    {
        id: 2,
        title: 'ICPC Lahore Regional - Fastest Problem Solver',
        organization: 'ACM ICPC',
        date: '2017',
        icon: 'fa-code',
        description: 'Awarded for exceptional speed and efficiency in solving complex algorithmic problems during the ACM International Collegiate Programming Contest regionals, placing among the top performers.'
    },
    {
        id: 3,
        title: 'Crypto Chicks Hackathon Finalist',
        organization: 'Crypto Chicks',
        date: '2019',
        icon: 'fa-medal',
        description: 'Led a team to the finals by designing and constructing an innovative blockchain-based supply chain solution using IBM Hyperledger and Docker.'
    },
    {
        id: 4,
        title: 'Logistic Hunt - 1st Position Speed Programming',
        organization: 'University Competition', 
        date: '2017',
        icon: 'fa-bolt', 
        description: 'Achieved first place in a speed programming competition, showcasing rapid coding abilities and problem-solving skills under pressure.'
    },
    {
        id: 5,
        title: 'COMBAT Algorithm Competition Organizer',
        organization: 'University Event',
        date: '2018',
        icon: 'fa-users',
        description: 'Successfully spearheaded and organized the "Algo Mania" inter-university algorithm competition, managing logistics, problem-setting, and attracting over 50 participants.'
    }
];

// Function to render certifications
function renderCertifications() {
    const certGrid = document.getElementById('certifications-grid');
    if (!certGrid) return;
    
    certGrid.innerHTML = '';
    
    // Certifications Section
    const certSection = document.createElement('div');
    certSection.className = 'cert-section fade-in-up';
    
    const certTitle = document.createElement('h3');
    certTitle.className = 'cert-section-title';
    certTitle.innerHTML = '<i class="fas fa-certificate"></i> Professional Certifications';
    certSection.appendChild(certTitle);
    
    const certCards = document.createElement('div');
    certCards.className = 'cert-items-grid';
    
    CERTIFICATIONS.filter(c => c.type === 'certification').forEach(cert => {
        const certCard = document.createElement('div');
        certCard.className = `cert-card ${cert.status === 'in-progress' ? 'in-progress' : ''}`;
        certCard.innerHTML = `
            <div class="cert-badge">
                <i class="fas ${cert.icon}"></i>
            </div>
            <h4 class="cert-name">${cert.name}</h4>
            <h5 class="cert-full-name">${cert.fullName}</h5>
            <p class="cert-org">${cert.organization}</p>
            <div class="cert-date">${cert.date}</div>
            ${cert.status === 'in-progress' ? '<div class="cert-status in-progress">In Progress</div>' : ''}
            ${cert.verificationUrl ? `<div class="cert-status verified"><a href="${cert.verificationUrl}" target="_blank"><i class="fas fa-check-circle"></i> Verified</a></div>` : ''}
            <p class="cert-description">${cert.description}</p>
            <div class="cert-skills">
                ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        certCards.appendChild(certCard);
    });
    
    certSection.appendChild(certCards);
    certGrid.appendChild(certSection);
    
    // Education Section
    const eduSection = document.createElement('div');
    eduSection.className = 'cert-section fade-in-up';
    
    const eduTitle = document.createElement('h3');
    eduTitle.className = 'cert-section-title';
    eduTitle.innerHTML = '<i class="fas fa-graduation-cap"></i> Education';
    eduSection.appendChild(eduTitle);
    
    const eduCards = document.createElement('div');
    eduCards.className = 'cert-items-grid';
    
    CERTIFICATIONS.filter(c => c.type === 'education').forEach(edu => {
        const eduCard = document.createElement('div');
        eduCard.className = `cert-card ${edu.status === 'in-progress' ? 'in-progress' : ''}`;
        eduCard.innerHTML = `
            <div class="cert-badge">
                <i class="fas ${edu.icon}"></i>
            </div>
            <h4 class="cert-name">${edu.name}</h4>
            <h5 class="cert-full-name">${edu.fullName}</h5>
            <p class="cert-org">${edu.organization}</p>
            <div class="cert-date">${edu.date}</div>
            ${edu.status === 'in-progress' ? '<div class="cert-status in-progress">In Progress</div>' : ''}
            <p class="cert-description">${edu.description}</p>
            <div class="cert-skills">
                ${edu.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            ${edu.achievements ? `
                <div class="cert-achievements">
                    ${edu.achievements.map(a => `<div class="achievement-item"><i class="fas fa-star"></i> ${a}</div>`).join('')}
                </div>
            ` : ''}
        `;
        eduCards.appendChild(eduCard);
    });
    
    eduSection.appendChild(eduCards);
    certGrid.appendChild(eduSection);
    
    // Training Section
    const trainingSection = document.createElement('div');
    trainingSection.className = 'cert-section fade-in-up';
    
    const trainingTitle = document.createElement('h3');
    trainingTitle.className = 'cert-section-title';
    trainingTitle.innerHTML = '<i class="fas fa-book"></i> Professional Training';
    trainingSection.appendChild(trainingTitle);
    
    const trainingGrid = document.createElement('div');
    trainingGrid.className = 'training-grid';
    
    TRAINING.forEach(training => {
        const trainingCard = document.createElement('div');
        trainingCard.className = `training-card ${training.status}`;
        trainingCard.innerHTML = `
            <h4 class="training-name">${training.name} - ${training.fullName}</h4>
            <p class="training-org">${training.organization}</p>
            <p class="training-desc">${training.description}</p>
            <div class="training-status ${training.status}">${training.status === 'completed' ? 'Completed' : 'Planned'}</div>
        `;
        trainingGrid.appendChild(trainingCard);
    });
    
    trainingSection.appendChild(trainingGrid);
    certGrid.appendChild(trainingSection);
    
    // Awards Section
    const awardsSection = document.createElement('div');
    awardsSection.className = 'cert-section fade-in-up';
    
    const awardsTitle = document.createElement('h3');
    awardsTitle.className = 'cert-section-title';
    awardsTitle.innerHTML = '<i class="fas fa-trophy"></i> Awards & Recognition';
    awardsSection.appendChild(awardsTitle);
    
    const awardsGrid = document.createElement('div');
    awardsGrid.className = 'awards-grid';
    
    AWARDS.forEach(award => {
        const awardCard = document.createElement('div');
        awardCard.className = 'award-card';
        awardCard.innerHTML = `
            <div class="award-icon"><i class="fas ${award.icon}"></i></div>
            <h4 class="award-title">${award.title}</h4>
            <p class="award-org">${award.organization} • ${award.date}</p>
            <p class="award-description">${award.description}</p>
        `;
        awardsGrid.appendChild(awardCard);
    });
    
    awardsSection.appendChild(awardsGrid);
    certGrid.appendChild(awardsSection);
}

// Make function available globally
window.renderCertifications = renderCertifications;
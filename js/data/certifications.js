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
        skills: ['Buffer Overflow', 'Active Directory', 'OSCP', 'Burp Suite', 'Bash Scripting', 'Client-side Attacks', 'Nmap', 'Kali Linux', 'Practical Tools', 'Threat Modelling', 'Wireshark', 'Windows Buffer Overflows', 'Command Line', 'Cyber-security', 'Metasploit', 'Vulnerability Scanning', 'Locating Public Exploits', 'Vulnerability Assessment and Penetration Testing (VAPT)', 'Web Application Attacks', 'Penetration Testing']
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
        description: 'OSCP+ is an extension of OSCP that provides additional training and resources, extending the certification validity to 3 years. It includes advanced topics in penetration testing and security assessments.',
        skills:['Buffer Overflow', 'Active Directory', 'OSCP', 'Burp Suite', 'Bash Scripting', 'Client-side Attacks', 'Nmap', 'Kali Linux', 'Practical Tools', 'Threat Modelling', 'Wireshark', 'Windows and Linux Buffer Overflows', 'Command Line', 'Cyber-security', 'Metasploit', 'Vulnerability Scanning', 'Locating Public Exploits', 'Vulnerability Assessment and Penetration Testing (VAPT)', 'Web Application Attacks', 'Penetration Testing']
    },
    {
        id: 3,
        name: 'CREST',
        fullName: 'CREST Penetration Testing Certification',
        organization: 'CREST UK',
        date: 'Expected July 2025',
        status: 'in-progress',
        type: 'certification',
        category: 'security',
        icon: 'fa-flag',
        description: 'UK\'s premier penetration testing qualification recognized by government and enterprise organizations for security testing excellence.',
        skills: ['UK Security Standards', 'Enterprise Testing', 'Compliance', 'Professional Standards']
    },
    {
        id: 4,
        name: 'MSc Cybersecurity & AI',
        fullName: 'Master of Science in Cybersecurity and Artificial Intelligence',
        organization: 'University of Sheffield',
        date: 'Sep 2024 - Present',
        status: 'in-progress',
        type: 'education',
        category: 'academic',
        icon: 'fa-graduation-cap',
        description: 'Advanced degree from Russell Group university (World Top 100) covering cybersecurity, AI applications in security, digital forensics, and secure software development.',
        skills: ['Machine Learning', 'Digital Forensics', 'Natural Language Processing', 'Secure Software Development', 'AI Security'],
        achievements: ['Russell Group University', 'World Top 100 University', 'Merit Classification Expected']
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
        skills: ['Software Engineering', 'Algorithms', 'Data Structures', 'Network Security', 'Database Systems'],
        achievements: ['Multiple Hackathon Wins', 'Programming Competition Awards']
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
        description: 'Core OSCP preparation course covering exploitation techniques and methodology'
    },
    {
        id: 2,
        name: 'CPENT (LPT)',
        fullName: 'Certified Penetration Testing Professional - Licensed Penetration Tester',
        organization: 'EC-Council',
        status: 'planned',
        category: 'offensive',
        description: 'Comprehensive penetration testing course covering advanced techniques and methodologies for professional testers'
    },
    {
        id: 3,
        name: 'PEN-300',
        fullName: 'Advanced Evasion Techniques (Planned)',
        organization: 'Offensive Security',
        status: 'planned',
        category: 'offensive',
        description: 'Advanced penetration testing and AV evasion'
    }
];

const AWARDS = [
    {
        id: 1,
        title: 'Employee of the Month',
        organization: 'Apricart E-Stores',
        date: '2021',
        icon: 'fa-trophy',
        description: 'Recognized for outstanding contributions, driving 20% increase in team productivity & Sales through key security and development projects.'
    },
    {
        id: 2,
        title: 'Promoted to IT Department Head',
        organization: 'Apricart E-Stores',
        date: '2021',
        icon: 'fa-medal',
        description: 'Rapid career progression from Senior Software Engineer to Team Lead to IT Department Head within 9 months.'
    },
    {
        id: 3,
        title: 'Crypto Chicks Hackathon Finalist',
        organization: 'Crypto Chicks',
        date: '2019',
        icon: 'fa-medal',
        description: 'Constructed blockchain supply chain solution using IBM Hyperledger and Docker, highlighting innovation with emerging technologies.'
    },
    {
        id: 4,
        title: 'ICPC Lahore Regional - Fastest Problem Solver - Top 10',
        organization: 'ACM ICPC',
        date: '2017',
        icon: 'fa-code',
        description: 'Awarded for collaborative, efficient solutions to complex algorithmic problems in competitive programming.'
    },
    {
        id: 5,
        title: 'COMBAT Algorithm Competition Organizer',
        organization: 'University Event',
        date: '2018',
        icon: 'fa-users',
        description: 'Spearheaded the Algo Mania competition, drawing over 50 participants and gaining recognition as a valuable technical event.'
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
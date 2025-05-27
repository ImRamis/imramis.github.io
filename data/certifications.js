// js/data/certifications.js - Certifications & Education Data

const CERTIFICATIONS = [
    {
        id: 1,
        name: 'OSCP',
        fullName: 'Offensive Security Certified Professional',
        organization: 'Offensive Security',
        date: 'April 2025',
        status: 'completed',
        verificationUrl: 'https://credentials.offsec.com/5185a463-88bf-4ad2-8546-2555585d8cc4#acc.fFbVLAta',
        credentialId: '140250238',
        type: 'certification',
        category: 'security',
        icon: 'fa-shield-alt',
        description: 'Advanced penetration testing certification covering manual exploitation, privilege escalation, Active Directory attacks, and comprehensive security assessments.',
        skills: ['Penetration Testing', 'Privilege Escalation', 'Active Directory', 'Buffer Overflow', 'Web Exploitation']
    },
    {
        id: 2,
        name: 'OSCP+',
        fullName: 'OSCP+ Advanced Certification',
        organization: 'Offensive Security',
        date: 'April 2025',
        status: 'completed',
        verificationUrl: 'https://credentials.offsec.com/559e642d-824b-4657-bdd9-8b315e1845f7#acc.MxVIzcvH',
        credentialId: '140250238',
        type: 'certification',
        category: 'security',
        icon: 'fa-cloud',
        description: 'Advanced cloud enumeration and exploitation techniques, password spray attacks, and enterprise-level security testing methodologies.',
        skills: ['Cloud Security', 'AWS/Azure Testing', 'Password Attacks', 'Enterprise Security']
    },
    {
        id: 3,
        name: 'CREST',
        fullName: 'CREST Penetration Testing Certification',
        organization: 'CREST UK',
        date: 'Expected Aug 2025',
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
        date: '2024-2025',
        status: 'completed',
        type: 'education',
        category: 'academic',
        icon: 'fa-graduation-cap',
        description: 'Advanced degree from Russell Group university (World Top 100) covering cybersecurity, AI applications in security, digital forensics, and secure software development.',
        skills: ['AI/ML Security', 'Digital Forensics', 'Research', 'Academic Excellence'],
        achievements: ['Merit Classification Expected', 'Russell Group University', 'World Top 100 University']
    },
    {
        id: 5,
        name: 'BS Computer Science',
        fullName: 'Bachelor of Science in Computer Science',
        organization: 'COMSATS University',
        date: '2015-2019',
        status: 'completed',
        type: 'education',
        category: 'academic',
        icon: 'fa-university',
        description: 'Comprehensive computer science education with focus on software engineering, algorithms, and security fundamentals.',
        skills: ['Software Engineering', 'Algorithms', 'Data Structures', 'System Design'],
        achievements: ['Multiple Hackathon Wins', 'Programming Competition Awards']
    }
];

const AWARDS = [
    {
        id: 1,
        title: 'Employee of the Month',
        organization: 'Apricart E-Stores',
        date: '2021',
        icon: 'fa-trophy',
        description: 'Recognition for outstanding performance in secure payment gateway implementation and team leadership.'
    },
    {
        id: 2,
        title: 'Crypto Chicks Hackathon Winner',
        organization: 'Crypto Chicks',
        date: '2019',
        icon: 'fa-medal',
        description: 'First place in blockchain and AI hackathon for innovative supply chain solution.'
    },
    {
        id: 3,
        title: 'ICPC Lahore Regional - Fastest Problem Solver',
        organization: 'ACM ICPC',
        date: '2017',
        icon: 'fa-code',
        description: 'Recognized for solving complex algorithmic problems in record time at regional programming competition.'
    }
];

const TRAINING = [
    {
        id: 1,
        name: 'PEN-200',
        fullName: 'Penetration Testing with Kali Linux',
        organization: 'Offensive Security',
        status: 'completed',
        hours: '200+',
        skills: ['Kali Linux', 'Exploitation', 'Post-Exploitation']
    },
    {
        id: 2,
        name: 'PEN-210',
        fullName: 'Wi-Fi Attacks',
        organization: 'Offensive Security',
        status: 'completed',
        hours: '40+',
        skills: ['Wireless Security', 'WPA/WPA2 Attacks', 'Evil Twin']
    },
    {
        id: 3,
        name: 'PEN-300',
        fullName: 'Advanced Evasion Techniques',
        organization: 'Offensive Security',
        status: 'completed',
        hours: '60+',
        skills: ['AV Evasion', 'Advanced Exploitation', 'Custom Payloads']
    },
    {
        id: 4,
        name: 'SOC-200',
        fullName: 'Security Operations',
        organization: 'Offensive Security',
        status: 'completed',
        hours: '80+',
        skills: ['SOC Operations', 'Incident Response', 'Threat Hunting']
    },
    {
        id: 5,
        name: 'WEB-200',
        fullName: 'Web Application Security',
        organization: 'Offensive Security',
        status: 'completed',
        hours: '100+',
        skills: ['OWASP Top 10', 'Web Exploitation', 'API Security']
    }
];

// Function to render certifications
function renderCertifications() {
    const certGrid = document.getElementById('certifications-grid');
    if (!certGrid) return;
    
    certGrid.innerHTML = '';
    
    // Create sections for different types
    const sections = {
        certification: {
            title: 'Professional Certifications',
            items: CERTIFICATIONS.filter(c => c.type === 'certification'),
            icon: 'fa-certificate'
        },
        education: {
            title: 'Education',
            items: CERTIFICATIONS.filter(c => c.type === 'education'),
            icon: 'fa-graduation-cap'
        },
        training: {
            title: 'Professional Training',
            items: TRAINING,
            icon: 'fa-book'
        },
        awards: {
            title: 'Awards & Recognition',
            items: AWARDS,
            icon: 'fa-trophy'
        }
    };
    
    Object.entries(sections).forEach(([key, section]) => {
        if (section.items.length === 0) return;
        
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'cert-section fade-in-up';
        
        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'cert-section-title';
        sectionTitle.innerHTML = `<i class="fas ${section.icon}"></i> ${section.title}`;
        sectionDiv.appendChild(sectionTitle);
        
        const sectionGrid = document.createElement('div');
        sectionGrid.className = 'cert-items-grid';
        
        section.items.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = `cert-card ${item.status === 'in-progress' ? 'in-progress' : ''} ${item.category || ''}`;
            
            if (key === 'certification' || key === 'education') {
                itemCard.innerHTML = `
                    <div class="cert-badge">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <h4 class="cert-name">${item.name}</h4>
                    <h5 class="cert-full-name">${item.fullName}</h5>
                    <p class="cert-org">${item.organization}</p>
                    <div class="cert-date">${item.date}</div>
                    ${item.status === 'in-progress' ? '<div class="cert-status in-progress">In Progress</div>' : ''}
                    ${item.verificationUrl ? `<div class="cert-status verified"><a href="${item.verificationUrl}" target="_blank"><i class="fas fa-check-circle"></i> Verified</a></div>` : ''}
                    <p class="cert-description">${item.description}</p>
                    ${item.skills ? `
                        <div class="cert-skills">
                            ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${item.achievements ? `
                        <div class="cert-achievements">
                            ${item.achievements.map(a => `<div class="achievement-item"><i class="fas fa-star"></i> ${a}</div>`).join('')}
                        </div>
                    ` : ''}
                `;
            } else if (key === 'training') {
                itemCard.innerHTML = `
                    <h4 class="training-name">${item.name} - ${item.fullName}</h4>
                    <p class="training-org">${item.organization}</p>
                    <div class="training-hours"><i class="fas fa-clock"></i> ${item.hours} hours</div>
                    <div class="training-skills">
                        ${item.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                `;
                itemCard.className = 'training-card';
            } else if (key === 'awards') {
                itemCard.innerHTML = `
                    <div class="award-icon"><i class="fas ${item.icon}"></i></div>
                    <h4 class="award-title">${item.title}</h4>
                    <p class="award-org">${item.organization} • ${item.date}</p>
                    <p class="award-description">${item.description}</p>
                `;
                itemCard.className = 'award-card';
            }
            
            sectionGrid.appendChild(itemCard);
        });
        
        sectionDiv.appendChild(sectionGrid);
        certGrid.appendChild(sectionDiv);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderCertifications);
} else {
    renderCertifications();
}
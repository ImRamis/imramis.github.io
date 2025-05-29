// js/data/skills.js - Skills Data

const SKILLS = [
    {
        category: 'Cybersecurity & Penetration Testing',
        icon: 'fa-shield-alt',
        skills: [
            'Web Application Security',
            'Network Penetration Testing',
            'Active Directory Exploitation',
            'OWASP Top 10',
            'Cloud Security (AWS/Azure)',
            'Wireless Security',
            'Vulnerability Assessment',
            'Security Code Review',
            'Social Engineering',
            'Physical Security Testing',
            'Mobile Application Security',
            'API Security Testing'
        ]
    },
    {
        category: 'Programming Languages',
        icon: 'fa-code',
        skills: [
            'Python',
            'PHP',
            'JavaScript/TypeScript',
            'Go',
            'C#/.NET',
            'Java',
            'SQL',
            'Solidity',
            'Bash/PowerShell',
            'Assembly (x86)',
            'Ruby',
            'Rust'
        ]
    },
    {
        category: 'Frameworks & Technologies',
        icon: 'fa-layer-group',
        skills: [
            'Laravel',
            'Django/Flask',
            'React/Next.js',
            'Node.js/Express',
            'Entity Framework',
            'CodeIgniter',
            'Vue.js',
            'Angular',
            'FastAPI',
            'RESTful APIs',
            'GraphQL',
            'Microservices'
        ]
    },
    {
        category: 'E-commerce & CMS',
        icon: 'fa-shopping-cart',
        skills: [
            'Magento 2',
            'WordPress/WooCommerce',
            'Shopify',
            'Payment Gateway Integration',
            'Stripe/PayPal APIs',
            'PCI DSS Compliance',
            'Custom CMS Development',
            'PrestaShop',
            'OpenCart',
            'BigCommerce',
            'Salesforce Commerce Cloud',
            'E-commerce Security'
        ]
    },
    {
        category: 'DevOps & Infrastructure',
        icon: 'fa-server',
        skills: [
            'Linux Administration',
            'Docker/Kubernetes',
            'CI/CD Pipelines',
            'AWS (EC2, S3, Lambda, RDS)',
            'Azure',
            'Nginx/Apache',
            'Git/GitHub/GitLab',
            'Infrastructure as Code',
            'Terraform',
            'Ansible',
            'Jenkins/GitHub Actions',
            'Monitoring & Logging'
        ]
    },
    {
        category: 'Cloud & Networking',
        icon: 'fa-cloud',
        skills: [
            'AWS Security',
            'Azure Security',
            'Load Balancing',
            'CDN Configuration',
            'VPN Setup',
            'Firewall Configuration',
            'DNS Management',
            'SSL/TLS',
            'HTTP/3 & QUIC',
            'Network Segmentation',
            'Cloud Migration',
            'Hybrid Cloud Architecture'
        ]
    },
    {
        category: 'Blockchain & Emerging Tech',
        icon: 'fa-link',
        skills: [
            'Ethereum/Smart Contracts',
            'Web3.js',
            'DeFi Protocols',
            'Blockchain Security',
            'IPFS',
            'Hyperledger Fabric',
            'NFT Development',
            'Cryptocurrency',
            'Machine Learning/AI',
            'IoT Security',
            'Quantum Computing Basics',
            'AR/VR Development'
        ]
    },
    {
        category: 'Security Tools',
        icon: 'fa-tools',
        skills: [
            'Burp Suite',
            'Metasploit',
            'Nmap',
            'Wireshark',
            'John the Ripper',
            'Hashcat',
            'SQLMap',
            'OWASP ZAP',
            'Nessus',
            'IDA Pro/Ghidra',
            'GDB',
            'Cobalt Strike'
        ]
    },
    {
        category: 'Leadership & Management',
        icon: 'fa-users',
        skills: [
            'Team Leadership',
            'Project Management',
            'Agile/Scrum',
            'Strategic Planning',
            'Budget Management',
            'Stakeholder Communication',
            'Performance Management',
            'Risk Assessment',
            'Compliance Management',
            'Vendor Management',
            'Technical Documentation',
            'Client Relations'
        ]
    }
];

// Function to render skills
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    SKILLS.forEach((category, index) => {
        const skillCategory = document.createElement('div');
        skillCategory.className = 'skill-category fade-in-up';
        skillCategory.style.animationDelay = `${index * 0.1}s`;
        
        skillCategory.innerHTML = `
            <h3><i class="fas ${category.icon}"></i> ${category.category}</h3>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        
        container.appendChild(skillCategory);
    });
}

// Make function available globally
window.renderSkills = renderSkills;
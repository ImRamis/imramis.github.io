// js/config.js - Portfolio Configuration

const CONFIG = {
    // Personal Information
    name: 'Muhammad Ramis',
    title: 'OSCP-Certified Cybersecurity Professional & Full-Stack Developer',
    email: 'mramis1@outlook.com',
    phone: '07789 399 920',
    location: 'Leeds, West Yorkshire, UK',
    
    // Social Links
    social: {
        linkedin: 'https://linkedin.com/in/imramis',
        github: 'https://github.com/imRamis',
        tryhackme: 'https://tryhackme.com/p/mriramis',
        hackthebox: 'https://ctf.hackthebox.com/user/profile/744664'
    },
    
    // CV Download Link
    cvLink: 'assets/Muhammad_Ramis_CV.pdf',
    
    // Typed.js Strings (Hero Section)
    typedStrings: [
        'OSCP-Certified Penetration Tester',
        'Full-Stack Developer',
        'Sheffield University Graduate',
        'Laravel & Django Expert',
        'Cybersecurity Specialist',
        'Blockchain Developer',
        'Payment Systems Expert',
        'DevSecOps Engineer',
        'Security Researcher',
        'Enterprise Architecture Specialist',
        'Cloud Security Professional',
        'Digital Forensics Analyst'
    ],
    
    // Analytics
    googleAnalyticsId: 'G-GKD7JXRS66',
    
    // Site Settings
    siteUrl: 'https://imramis.github.io',
    siteName: 'Muhammad Ramis - Portfolio',
    siteDescription: 'OSCP-certified cybersecurity specialist and full-stack developer with 5+ years experience. Sheffield University MSc graduate seeking opportunities in the UK.',
    
    // Default Theme
    defaultTheme: 'monochrome',
    
    // Animation Settings
    animationSpeed: {
        fast: 300,
        normal: 600,
        slow: 1000
    },
    
    // Particle.js Density
    particleDensity: 50,
    
    // Terminal Commands (for hero section animation)
    terminalCommands: [
        { 
            cmd: '$ whoami', 
            output: 'Muhammad Ramis - OSCP Certified Professional' 
        },
        { 
            cmd: '$ cat skills.txt', 
            output: 'Penetration Testing | Full-Stack Development | DevSecOps' 
        },
        { 
            cmd: '$ ls certifications/', 
            output: 'OSCP ✓ | OSCP+ ✓ | MSc Cybersecurity ✓ | CREST (In Progress)' 
        },
        { 
            cmd: '$ grep experience cv.txt', 
            output: '5+ Years | Laravel | Django | React | Blockchain | Security' 
        },
        { 
            cmd: '$ echo $LOCATION', 
            output: 'Leeds, West Yorkshire, UK - Available for immediate start' 
        },
        {
            cmd: '$ sudo show-achievements',
            output: 'Employee of Month | Hackathon Winner | 25% Security Improvement'
        }
    ],
    
    // Contact Form Settings
    contactFormEndpoint: null, // Using mailto for now
    
    // Feature Flags
    features: {
        particles: true,
        matrixRain: true,
        terminalAnimation: true,
        smoothScroll: true,
        lazyLoading: true,
        analytics: true
    }
};
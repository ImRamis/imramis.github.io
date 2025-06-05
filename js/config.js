// js/config.js - Portfolio Configuration

const CONFIG = {
    // Personal Information
    name: 'Muhammad Ramis',
    title: 'OSCP Certified Penetration Tester | Cybersecurity MSc Student',
    email: 'AAsyCAoBVDQkEA1dXVwGVzAKDg==', // From Python xor_strings.py
    location: 'United Kingdom',
    
    // Social Links
    social: {
        linkedin: 'https://linkedin.com/in/imramis',
        github: 'https://github.com/imRamis',
        stackoverflow: 'https://stackoverflow.com/users/16912003/ramis',
        tryhackme: 'https://tryhackme.com/p/mriramis',
        hackthebox: 'https://ctf.hackthebox.com/user/profile/744664'
    },
    
    // CV Download Link
    // cvLink: 'assets/Muhammad_Ramis_CV.pdf',
    
    // Analytics
    googleAnalyticsId: 'G-GKD7JXRS66',
    microsoftClarityId: 'rpwqh3rock',
    
    // Site Settings
    siteUrl: 'https://imramis.github.io',
    siteName: 'Muhammad Ramis - Portfolio',
    siteDescription: 'OSCP-certified penetration tester and Software Engineer with MSc in Cybersecurity and AI from University of Sheffield. 5+ years experience in security testing, team leadership, and Development.',
        
    // Theme Settings
    defaultTheme: 'monochrome',
    defaultAccentColor: '#000000',
    
    // Animation Settings
    animationSpeed: {
        fast: 300,
        normal: 600,
        slow: 1000
    },
    
    // Particle.js Settings
    particleCount: 80,
    particleDensity: 800,
    
    // Terminal Settings
    terminalCommands: [
        { cmd: '$ whoami', output: 'Muhammad Ramis - OSCP Certified Professional | Software Engineer' },
        { cmd: '$ cat skills.txt', output: 'Penetration Testing | Team Leadership | Laravel | Django | Magento 2 | DevSecOps' },
        { cmd: '$ ls certifications/', output: 'OSCP.cert ✓ | OSCP+.cert ✓ | MSc_Cybersecurity_AI.ongoing | CREST.pending' },
        { cmd: '$ grep experience cv.txt', output: '5+ Years | Senior Software Engineer → Team Lead → IT Department Lead' },
        { cmd: '$ echo $EXPERTISE', output: 'Security Testing | E-commerce | Cloud Infrastructure | Blockchain | Payment Gateways' },
    ],
    terminalTypingSpeed: 50,
    terminalLineDelay: 1500,
    typedStringsNames: [
        "محمد رامس",
        "Muhammad Ramis",
        // "ムハンマド・ラミス",
        // "むはんまど・らみす"
        // "मुहम्मद रामिस",
        // "Мухаммад Рамис",
        // "穆罕默德·拉米斯",
        // "무함마드 라미스",
        // "Μουχάμαντ Ραμίς",
        // "מוחמד ראמיס",
        // "محمد رامیس",
        // "মুহাম্মদ রামিস",
        // "முகம்மது ராமிஸ்",
        // "มูฮัมหมัด รามิส",
        // "ሙሐመድ ራሚስ"
    ],
    // Typed.js Settings
    typedStringsJobs: [
        'OSCP Certified Penetration Tester',
        'MSc Cybersecurity & AI Student at University of Sheffield',
        'Senior Software Engineer',
        'IT Department Lead',
        'Full-Stack Developer',
        'Security Researcher',
        'DevSecOps Engineer',
        'Team Leader',
        'E-commerce Specialist'
    ],
    typedSpeed: 60,
    typedBackSpeed: 30,
    typedBackDelay: 2000,
    
    // Feature Flags
    features: {
        particles: true,
        matrixRain: true,
        terminalAnimation: true,
        smoothScroll: true,
        lazyLoading: true,
        analytics: true,
        cookieConsent: true,
        animations: true
    },
    
    // SEO Settings
    seo: {
        keywords: [
            'penetration tester',
            'OSCP certified',
            'senior software engineer',
            'IT Department Lead',
            'team lead',
            'cybersecurity',
            'University of Sheffield',
            'MSc Cybersecurity AI',
            'Laravel developer',
            'Django developer',
            'Magento 2 expert',
            'e-commerce specialist',
            'security researcher',
            'DevSecOps',
            'Leeds UK',
            'payment gateway integration',
            'blockchain developer'
        ],
        author: 'Muhammad Ramis',
        ogImage: 'https://imramis.github.io/assets/og-image.jpg',
        twitterImage: 'https://imramis.github.io/assets/twitter-card.jpg'
    },
    
    // Performance Settings
    performance: {
        imageLoadDelay: 100,
        scrollThrottle: 16,
        resizeDebounce: 250,
        intersectionThreshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
};

// Export the config globally
window.CONFIG = CONFIG;
// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.social);
Object.freeze(CONFIG.animationSpeed);
Object.freeze(CONFIG.features);
Object.freeze(CONFIG.seo);
Object.freeze(CONFIG.performance);
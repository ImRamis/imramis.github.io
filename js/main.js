// js/main.js

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    const themeManager = new ThemeManager();
    
    // Loading
    setTimeout(() => {
        const loading = document.getElementById('loading');
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Navigation
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Scroll Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    });
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Typed Text
    new Typed('#typed-text', {
        strings: [
            'OSCP Certified Penetration Tester',
            'MSc Cybersecurity & AI Student',
            'Senior Software Engineer',
            'Full-Stack Developer',
            'Security Researcher',
            'DevSecOps Engineer'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });
    
    // Terminal Animation
    const terminal = document.getElementById('terminal-output');
    const commands = [
        { cmd: '$ whoami', output: 'Muhammad Ramis - OSCP Certified Professional' },
        { cmd: '$ cat education.txt', output: 'MSc Cybersecurity & AI - University of Sheffield (Russell Group)' },
        { cmd: '$ ls certifications/', output: 'OSCP.cert  PEN-200.training  CREST.pending' },
        { cmd: '$ grep experience cv.txt', output: '5+ Years | Senior Software Engineer | Penetration Testing | DevSecOps' },
        { cmd: '$ echo $SKILLS', output: 'Laravel | Django | React | Python | Burp Suite | Metasploit' }
    ];
    
    let currentCommand = 0;
    let currentChar = 0;
    let isTyping = false;
    let currentLine = null;
    
    function typeCharacter() {
        if (!isTyping) return;
        
        const command = commands[currentCommand];
        
        if (currentChar === 0) {
            currentLine = document.createElement('div');
            currentLine.className = 'terminal-line';
            const span = document.createElement('span');
            span.className = 'typing';
            span.style.color = '#666';
            currentLine.appendChild(span);
            terminal.appendChild(currentLine);
        }
        
        const typingSpan = currentLine.querySelector('.typing');
        
        if (currentChar < command.cmd.length) {
            typingSpan.textContent = command.cmd.substring(0, currentChar + 1);
            currentChar++;
            setTimeout(typeCharacter, 50);
        } else {
            typingSpan.classList.remove('typing');
            
            setTimeout(() => {
                const outputLine = document.createElement('div');
                outputLine.style.color = 'var(--accent-color)';
                outputLine.textContent = command.output;
                terminal.appendChild(outputLine);
                
                currentCommand = (currentCommand + 1) % commands.length;
                currentChar = 0;
                
                if (currentCommand === 0) {
                    setTimeout(() => {
                        terminal.innerHTML = '';
                        isTyping = true;
                        typeCharacter();
                    }, 3000);
                } else {
                    setTimeout(() => {
                        isTyping = true;
                        typeCharacter();
                    }, 1500);
                }
            }, 300);
            
            isTyping = false;
        }
    }
    
    isTyping = true;
    typeCharacter();
    
    // Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: false
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.6,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            }
        },
        retina_detect: true
    });
    
    // Matrix Rain Effect
    function initMatrixRain() {
        const matrix = document.getElementById('matrix-rain');
        const chars = '01';
        
        function createChar() {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.fontSize = (Math.random() * 10 + 10) + 'px';
            matrix.appendChild(char);
            
            setTimeout(() => {
                char.remove();
            }, 5000);
        }
        
        setInterval(createChar, 200);
    }
    initMatrixRain();
    
    // Contact Form
    const form = document.getElementById('contact-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
        const mailtoLink = `mailto:mramis1@outlook.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
    });
    
    // Load experience, certifications, and projects
    if (typeof window.renderExperience === 'function') window.renderExperience();
    if (typeof window.renderCertifications === 'function') window.renderCertifications();
    if (typeof window.initProjects === 'function') window.initProjects();
});

// Cookie consent
window.addEventListener('load', function() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        document.getElementById('cookie-consent').classList.add('show');
    }
});

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-consent').classList.remove('show');
    gtag('consent', 'update', {
        'analytics_storage': 'granted'
    });
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-consent').classList.remove('show');
    gtag('consent', 'update', {
        'analytics_storage': 'denied'
    });
}
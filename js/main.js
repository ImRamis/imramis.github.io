// js/main.js - Main Application Logic

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    const themeManager = new ThemeManager();
    
    initLoading();
    
    setTimeout(() => {
        initNavigation();
        initScrollProgress();
        initTypedText();
        initTerminal();
        initParticles();
        initMatrixRain();
        initAnimations();
        initProjects();
        initContactForm();
        initAnalytics();
        renderExperience();
        renderCertifications();
    }, 1000);
});

// Loading Screen
function initLoading() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1500);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    
    mobileToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks?.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' });
    
    sections.forEach(section => observer.observe(section));
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';
        
        // Track scroll depth
        if (typeof gtag !== 'undefined') {
            const scrollPercentage = Math.round(scrolled);
            if (scrollPercentage % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                gtag('event', 'scroll_depth', {
                    event_category: 'engagement',
                    event_label: `${scrollPercentage}%`
                });
            }
        }
    });
}

// Typed Text Effect
function initTypedText() {
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
}

// Terminal Animation with typing effect
function initTerminal() {
    const terminal = document.getElementById('terminal-output');
    if (!terminal) return;
    
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
                outputLine.className = 'terminal-output-line';
                outputLine.style.color = '#00ff00';
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
    
    // Start typing
    isTyping = true;
    typeCharacter();
}

// Particles.js
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#00ff00' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ff00',
                opacity: 0.4,
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
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });
}

// Matrix Rain Effect
function initMatrixRain() {
    const matrix = document.getElementById('matrix-rain');
    if (!matrix) return;
    
    const chars = '01';
    
    function createChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.fontSize = (Math.random() * 10 + 10) + 'px';
        matrix.appendChild(char);
        
        setTimeout(() => char.remove(), 5000);
    }
    
    setInterval(createChar, 200);
}

// Animations
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        animationObserver.observe(el);
    });
}

// Projects
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (!projectsGrid || typeof PROJECTS === 'undefined') return;
    
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? PROJECTS 
            : PROJECTS.filter(p => p.category === filter);
        
        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in-up';
            projectCard.innerHTML = `
                <div class="project-header">
                    <i class="fas ${project.icon}"></i>
                    <span class="project-type">${project.type}</span>
                </div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-achievements">
                    ${project.achievements.map(a => `<div class="achievement"><i class="fas fa-check"></i> ${a}</div>`).join('')}
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
        
        initAnimations();
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });
    
    renderProjects();
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
        const mailtoLink = `mailto:mramis1@outlook.com?subject=${subject}&body=${body}`;
        
        window.location.href = mailtoLink;
        
        // Track contact form submission
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form', {
                event_category: 'conversion',
                event_label: 'Email Contact'
            });
        }
    });
}

// Analytics
function initAnalytics() {
    // Track CV downloads
    document.querySelectorAll('[href*="CV.pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    event_category: 'conversion',
                    event_label: 'CV Download'
                });
            }
        });
    });
    
    // Track social links
    document.querySelectorAll('.social-links a, .social-link').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_click', {
                    event_category: 'social',
                    event_label: link.getAttribute('aria-label') || 'Social Link'
                });
            }
        });
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                event_category: 'engagement',
                name: 'time_on_page',
                value: timeSpent
            });
        }
    });
}

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

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});
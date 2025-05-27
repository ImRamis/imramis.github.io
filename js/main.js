// js/main.js - Main Application Logic

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    const themeManager = new ThemeManager();
    
    // Initialize loading screen
    initLoading();
    
    // Initialize all components
    setTimeout(() => {
        initNavigation();
        initScrollProgress();
        initTypedText();
        initTerminal();
        initParticles();
        initAnimations();
        initProjects();
        initContactForm();
        initAnalytics();
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
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Scroll Progress
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Typed Text Effect
function initTypedText() {
    new Typed('#typed-text', {
        strings: CONFIG.typedStrings,
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
    });
}

// Terminal Animation
function initTerminal() {
    const terminal = document.getElementById('terminal-output');
    const commands = [
        { cmd: '$ whoami', output: 'Muhammad Ramis - OSCP Certified Professional' },
        { cmd: '$ cat skills.txt', output: 'Penetration Testing | Full-Stack Development | DevSecOps' },
        { cmd: '$ ls certifications/', output: 'OSCP ✓ | OSCP+ ✓ | MSc Cybersecurity ✓ | CREST (In Progress)' },
        { cmd: '$ grep experience cv.txt', output: '5+ Years | Laravel | Django | React | Blockchain | Security' },
        { cmd: '$ echo $LOCATION', output: 'Leeds, West Yorkshire, UK' }
    ];
    
    let currentCommand = 0;
    
    function typeCommand() {
        if (currentCommand >= commands.length) {
            currentCommand = 0;
            terminal.innerHTML = '';
        }
        
        const { cmd, output } = commands[currentCommand];
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span style="color: #666;">${cmd}</span>`;
        terminal.appendChild(commandLine);
        
        setTimeout(() => {
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';
            outputLine.textContent = output;
            terminal.appendChild(outputLine);
            
            currentCommand++;
            setTimeout(typeCommand, 2000);
        }, 500);
    }
    
    setTimeout(typeCommand, 1000);
}

// Particles.js
function initParticles() {
    const theme = document.body.getAttribute('data-theme');
    const themeColors = {
        monochrome: '#000000',
        red: '#dc2626',
        blue: '#0ea5e9',
        green: '#059669',
        purple: '#7c3aed'
    };
    
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
                value: themeColors[theme] || '#000000'
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
                color: themeColors[theme] || '#000000',
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
}

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

// Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        animationObserver.observe(el);
    });
    
    // Initialize matrix rain
    initMatrixRain();
}

// Projects
function initProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Render projects
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
        
        // Re-initialize animations for new elements
        initAnimations();
    }
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.getAttribute('data-filter'));
        });
    });
    
    // Initial render
    renderProjects();
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Create mailto link
        const subject = encodeURIComponent(data.subject);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
        const mailtoLink = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        form.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Thank you for your message!</h3>
                <p>I'll get back to you as soon as possible.</p>
            </div>
        `;
    });
}

// Analytics
function initAnalytics() {
    // Track page views
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }
    
    // Track important interactions
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', () => {
            gtag('event', 'click', {
                event_category: 'engagement',
                event_label: btn.textContent.trim()
            });
        });
    });
    
    // Track CV downloads
    document.querySelectorAll('[href*="CV.pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'download', {
                event_category: 'conversion',
                event_label: 'CV Download'
            });
        });
    });
    
    // Track social links
    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'click', {
                event_category: 'social',
                event_label: link.getAttribute('aria-label')
            });
        });
    });
}

// Smooth scrolling for all anchor links
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

// Performance optimization
if ('IntersectionObserver' in window) {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});
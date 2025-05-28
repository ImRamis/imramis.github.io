// js/animations.js - Animation Scripts

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Track scroll depth for analytics
                const section = entry.target.closest('section');
                if (section && typeof gtag !== 'undefined') {
                    const sectionId = section.getAttribute('id');
                    gtag('event', 'section_view', {
                        event_category: 'engagement',
                        event_label: sectionId
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.fade-in-up, .slide-in-left, .slide-in-right, .timeline-item, .reveal'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Parallax effect for hero section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    const particles = document.getElementById('particles-js');
    const matrixRain = document.getElementById('matrix-rain');
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (particles) {
            particles.style.transform = `translateY(${rate * 0.8}px)`;
        }
        
        if (matrixRain) {
            matrixRain.style.transform = `translateY(${rate * 0.6}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Smooth scroll with progress tracking
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
                
                // Track navigation
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'navigation', {
                        event_category: 'engagement',
                        event_label: targetId
                    });
                }
            }
        });
    });
}

// Text scramble effect for hero name
function initTextScramble() {
    const element = document.querySelector('.hero-name');
    if (!element) return;
    
    const originalText = element.textContent;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let iteration = 0;
    
    const scramble = () => {
        element.textContent = originalText
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if (iteration < originalText.length) {
            iteration += 1/3;
            requestAnimationFrame(scramble);
        }
    };
    
    // Start scramble on page load
    setTimeout(scramble, 500);
    
    // Scramble on hover
    element.addEventListener('mouseenter', () => {
        iteration = 0;
        scramble();
    });
}

// Cursor trail effect
function initCursorTrail() {
    const trail = [];
    const trailLength = 8;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${4 + i * 2}px;
            height: ${4 + i * 2}px;
            border-radius: 50%;
            background: var(--accent-color);
            pointer-events: none;
            z-index: 9999;
            opacity: ${0.5 - i * 0.05};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x - dot.offsetWidth / 2 + 'px';
            dot.style.top = y - dot.offsetHeight / 2 + 'px';
            
            x += (nextDot.offsetLeft - dot.offsetLeft) * 0.4;
            y += (nextDot.offsetTop - dot.offsetTop) * 0.4;
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    // Only enable on desktop
    if (window.innerWidth > 768) {
        animateTrail();
    }
}

// Magnetic buttons effect
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.btn, .social-links a');
    
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            elem.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0, 0)';
        });
    });
}

// Progress ring animation for stats
function initProgressRings() {
    const stats = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && statNumber.textContent.includes('%')) {
                    const value = parseInt(statNumber.textContent);
                    animateValue(statNumber, 0, value, 2000);
                }
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Animate numeric values
function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    if (CONFIG.features.smoothScroll) {
        initSmoothScroll();
    }
    
    initScrollAnimations();
    initParallax();
    initTextScramble();
    initMagneticButtons();
    initProgressRings();
    
    // Optional cursor trail (can be disabled for performance)
    if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
        initCursorTrail();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Clean up any running animations
    const cursorTrails = document.querySelectorAll('.cursor-trail');
    cursorTrails.forEach(trail => trail.remove());
});
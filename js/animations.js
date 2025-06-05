// js/animations.js - Animation Scripts

class AnimationManager {
    constructor() {
        if (!CONFIG.features.animations) return;
        
        this.init();
    }
    
    init() {
        this.initScrollAnimations();
        this.initNavbarAnimation();
        // this.initHeroAnimations();
        this.initCounterAnimations();
        this.initMagneticButtons();
        this.initParallax();
    }
    
    initScrollAnimations() {
        const observerOptions = {
            threshold: CONFIG.performance.intersectionThreshold,
            rootMargin: CONFIG.performance.rootMargin
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
            '.fade-in-up, .slide-in-left, .slide-in-right, .scale-in, ' +
            '.timeline-item, .cert-card, .project-card, .skill-category, ' +
            '.stat-card, .training-card, .award-card'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    initNavbarAnimation() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        
        let lastScroll = 0;
        let ticking = false;
        
        const updateNavbar = () => {
            const currentScroll = window.pageYOffset;
            
            // Add/remove scrolled class
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    // initHeroAnimations() {
    //     // Text scramble effect for hero name
    //     const heroTitle = document.querySelector('.hero-title');
    //     if (!heroTitle) return;
        
    //     const originalText = heroTitle.textContent;
    //     const chars = '';
        
    //     const scramble = () => {
    //         let iteration = 0;
            
    //         const interval = setInterval(() => {
    //             heroTitle.textContent = originalText
    //                 .split('')
    //                 .map((letter, index) => {
    //                     if (index < iteration) {
    //                         return originalText[index];
    //                     }
    //                     return chars[Math.floor(Math.random() * chars.length)];
    //                 })
    //                 .join('');
                
    //             if (iteration >= originalText.length) {
    //                 clearInterval(interval);
    //             }
                
    //             iteration += 1/3;
    //         }, 5);
    //     };
        
    //     // Initial scramble
    //     setTimeout(scramble, 1000);
        
    //     // Scramble on hover
    //     heroTitle.addEventListener('mouseenter', scramble);
    // }
    
    initCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element) => {
            const text = element.textContent;
            const hasPercent = text.includes('%');
            const hasPlus = text.includes('+');
            const target = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (isNaN(target)) return;
            
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                let displayValue = Math.floor(current);
                if (hasPercent) displayValue += '%';
                if (hasPlus) displayValue += '+';
                
                element.textContent = displayValue;
            }, 16);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    initMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn, .social-links a, .filter-btn');
        
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
    
    initParallax() {
        const heroSection = document.querySelector('.hero-section');
        const matrixRain = document.getElementById('matrix-rain');
        
        if (!heroSection) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (matrixRain) {
                matrixRain.style.transform = `translateY(${rate * 0.6}px)`;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    // Cursor trail effect (optional, for desktop only)
    initCursorTrail() {
        if (window.innerWidth <= 1024 || 'ontouchstart' in window) return;
        
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
        
        const animateTrail = () => {
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
        };
        
        animateTrail();
    }
}

// Initialize animations when DOM is ready
let animationManager;
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animationManager = new AnimationManager();
    }, 2000);
});

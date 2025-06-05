// js/smooth-scroll.js - Smooth Scroll Functionality

class SmoothScroll {
    constructor() {
        this.init();
        this.setupScrollProgress();
        this.setupActiveNavHighlight();
    }
    
    init() {
        // Handle all anchor links with hash
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (!targetElement) return;
                
                this.scrollToElement(targetElement);
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
                
                // Close mobile menu if open
                const navLinks = document.getElementById('nav-links');
                const navToggle = document.getElementById('mobile-toggle');
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle?.classList.remove('active');
                }
                
                // Track navigation
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'navigation', {
                        event_category: 'engagement',
                        event_label: targetId
                    });
                }
            });
        });
    }
    
    scrollToElement(element, duration = 200) {
        const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const targetPosition = elementPosition - navHeight - 20;

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const startTime = performance.now();

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }

        function animation(currentTime) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuad(progress);
            window.scrollTo(0, startPosition + (distance * ease));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    
    setupScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;
        
        const updateProgress = () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        };
        
        // Throttle scroll events
        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        updateProgress(); // Initial call
    }
    
    setupActiveNavHighlight() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to current link
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    activeLink?.classList.add('active');
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sections.forEach(section => observer.observe(section));
    }
    
    // Scroll to top method
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}


// Show the button when scrolled down 100px
window.addEventListener('scroll', () => {
    const button = document.getElementById('goTopBtn');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});

// Scroll smoothly to top when clicked
document.getElementById('goTopBtn').addEventListener('click', () => {
    const startPosition = window.pageYOffset;
    const duration = 200;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animateScroll(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startPosition * (1 - ease));
        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
});


// Initialize smooth scroll when DOM is ready
let smoothScroll;
document.addEventListener('DOMContentLoaded', () => {
    if (CONFIG.features.smoothScroll) {
        smoothScroll = new SmoothScroll();
    }
});



window.xorDecrypt = function(base64Str, key) {
    const encrypted = atob(base64Str);
    let decrypted = '';
    for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
}

window.decryptEmail = function() {
    const encrypted =  window.CONFIG['email'];
    const key = "mySecretKey123"; // Must match encryption key
    const email = xorDecrypt(encrypted, key);
    return email;
}

window.revealEmail = function () {
    const email = window.decryptEmail();
    const link = document.getElementById("reveal-email");
    link.removeAttribute("onclick");
    link.href = "mailto:" + email;
    link.textContent = email;
}


class App {
    constructor() {
        this.init();
    }
    
    init() {
        // Initialize components when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
        
        // Initialize features that don't require DOM
        this.initAnalytics();
    }
    
    onDOMReady() {
        // Loading screen
        this.hideLoading();
        
        // Initialize navigation
        this.initNavigation();
        
        setTimeout(() => {
            // Initialize typed text for name
            this.initTypedTextName();

            // Initialize typed text
            this.initTypedTextDesignation();
        },6000)
        
        // Initialize contact form
        this.initContactForm();
        
        // Initialize cookie consent
        this.initCookieConsent();
        
        // Render dynamic content
        this.renderContent();
        
        // Initialize tooltips
        this.initTooltips();
        
        // Performance optimizations
        this.lazyLoadImages();
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1000);
        }
    }
    
    initNavigation() {
        const mobileToggle = document.getElementById('mobile-toggle');
        const navLinks = document.getElementById('nav-links');
        
        // Mobile menu toggle
        mobileToggle?.addEventListener('click', () => {
            navLinks?.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks?.classList.remove('active');
                mobileToggle?.classList.remove('active');
            });
        });
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                navLinks?.classList.remove('active');
                mobileToggle?.classList.remove('active');
            }
        });
    }

    
    initTypedTextName() {
        const typedElement = document.getElementById('hero-title');
        if (!typedElement) return;
        
        // new Typed('#hero-title', {
        //     strings: CONFIG.typedStringsNames,
        //     typeSpeed: 0.1,
        //     backSpeed: 0.1,
        //     backDelay: CONFIG.typedBackDelay+2000,
        //     loop: true,
        //     showCursor: false
        // });
        let index = 0;

        function updateName() {
            typedElement.classList.remove('fade-in');
            typedElement.classList.add('fade-out');
            setTimeout(() => {
                typedElement.textContent = CONFIG.typedStringsNames[index];
                index = (index + 1) % CONFIG.typedStringsNames.length;
                typedElement.classList.remove('fade-out');
                typedElement.classList.add('fade-in');
            }, 500); 
        }

        updateName(); // Initial display
        setInterval(updateName, 3000); // Change every 3 seconds
    }
    

    initTypedTextDesignation() {
        const typedElement = document.getElementById('typed-text');
        if (!typedElement) return;
        
        setTimeout(() => {
            new window.Typed('#typed-text', {
                strings: CONFIG.typedStringsJobs,
                typeSpeed: CONFIG.typedSpeed,
                backSpeed: CONFIG.typedBackSpeed,
                backDelay: CONFIG.typedBackDelay,
                loop: true,
                showCursor: false
            });
        },2000);
    }
    
    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Create mailto link
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n\n` +
                `Message:\n${data.message}`
            );
            
            const mailtoLink = `mailto:${window.decryptEmail()}?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
            
            // Track form submission
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submit', {
                    event_category: 'engagement',
                    event_label: 'contact_form'
                });
            }
            
            // Show success message (optional)
            this.showNotification('Opening your email client...', 'success');
        });
    }
    
    initCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        const banner = document.getElementById('cookie-consent');
        
        if (!consent && banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 2000);
        }
    }
    
    renderContent() {
        // Render all dynamic content
        if (typeof window.renderSkills === 'function') {
            window.renderSkills();
        }
        
        if (typeof window.renderExperience === 'function') {
            window.renderExperience();
        }
        
        if (typeof window.renderCertifications === 'function') {
            window.renderCertifications();
        }
        
        if (typeof window.initProjects === 'function') {
            window.initProjects();
        }
    }
    
    initTooltips() {
        // Simple tooltip implementation
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('tooltip-active');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('tooltip-active');
            });
        });
    }
    
    lazyLoadImages() {
        if (!CONFIG.features.lazyLoading) return;
        
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    initAnalytics() {
        if (!CONFIG.features.analytics) return;
        
        // Track page views
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--bg-secondary);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px var(--shadow-color);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Cookie consent functions
window.acceptCookies = function() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-consent')?.classList.remove('show');
    
    // Enable analytics
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
};

window.declineCookies = function() {
    localStorage.setItem('cookieConsent', 'declined');
    document.getElementById('cookie-consent')?.classList.remove('show');
    
    // Disable analytics
    if (typeof gtag !== 'undefined') {
        gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
};

// Initialize app
const app = new App();

// Export for debugging (optional)
window.app = app;
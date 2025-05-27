// js/theme.js - Theme Management System

class ThemeManager {
    constructor() {
        this.themes = ['monochrome', 'red', 'blue', 'green', 'purple'];
        this.currentTheme = this.loadTheme() || CONFIG.defaultTheme || 'monochrome';
        this.init();
    }
    
    init() {
        // Apply saved theme on load
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
    }
    
    loadTheme() {
        // Try to load from localStorage
        try {
            return localStorage.getItem('portfolio-theme');
        } catch (e) {
            // If localStorage is blocked, use sessionStorage
            return sessionStorage.getItem('portfolio-theme');
        }
    }
    
    saveTheme(theme) {
        try {
            localStorage.setItem('portfolio-theme', theme);
        } catch (e) {
            // Fallback to sessionStorage if localStorage is blocked
            sessionStorage.setItem('portfolio-theme', theme);
        }
    }
    
    applyTheme(theme) {
        if (!this.themes.includes(theme)) {
            console.warn(`Theme '${theme}' not found. Using default.`);
            theme = 'monochrome';
        }
        
        document.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.updateThemeButtons();
        this.updateParticles();
        this.updateMetaTheme();
        
        // Dispatch custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    updateThemeButtons() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }
    
    updateParticles() {
        // Update particle colors based on theme
        const themeColors = {
            monochrome: '#000000',
            red: '#dc2626',
            blue: '#0ea5e9',
            green: '#059669',
            purple: '#7c3aed'
        };
        
        if (window.pJSDom && window.pJSDom[0]) {
            const color = themeColors[this.currentTheme];
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    updateMetaTheme() {
        // Update meta theme-color for mobile browsers
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        const themeColors = {
            monochrome: '#000000',
            red: '#dc2626',
            blue: '#0ea5e9',
            green: '#059669',
            purple: '#7c3aed'
        };
        
        if (metaTheme) {
            metaTheme.content = themeColors[this.currentTheme];
        } else {
            const meta = document.createElement('meta');
            meta.name = 'theme-color';
            meta.content = themeColors[this.currentTheme];
            document.head.appendChild(meta);
        }
    }
    
    setupEventListeners() {
        // Theme button clicks
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.applyTheme(theme);
                
                // Add ripple effect
                this.addRippleEffect(btn);
            });
        });
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (this.currentTheme === 'monochrome' && e.matches) {
                    // Optional: Switch to dark variant of monochrome
                    console.log('System switched to dark mode');
                }
            });
        }
    }
    
    setupKeyboardShortcuts() {
        // Alt + T to cycle through themes
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }
    
    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex]);
        
        // Show notification
        this.showThemeNotification(this.themes[nextIndex]);
    }
    
    showThemeNotification(theme) {
        // Remove existing notification
        const existing = document.querySelector('.theme-notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.textContent = `Theme changed to ${theme}`;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color);
            color: var(--secondary-color);
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10000;
            animation: fadeInUp 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    addRippleEffect(element) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    // API Methods
    getTheme() {
        return this.currentTheme;
    }
    
    setTheme(theme) {
        this.applyTheme(theme);
    }
    
    getAvailableThemes() {
        return this.themes;
    }
    
    resetTheme() {
        this.applyTheme(CONFIG.defaultTheme || 'monochrome');
    }
}

// Add ripple animation to stylesheet if not exists
if (!document.querySelector('#ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, 20px);
            }
        }
    `;
    document.head.appendChild(style);
}
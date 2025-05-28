// js/theme.js - Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = 'dark';
        this.customColor = '#00ff00';
        this.init();
    }
    
    init() {
        // Load saved preferences
        this.loadPreferences();
        this.applyTheme();
        this.setupEventListeners();
    }
    
    loadPreferences() {
        // Load theme from memory (no localStorage)
        const savedTheme = this.getMemoryStorage('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }
        
        const savedColor = this.getMemoryStorage('accentColor');
        if (savedColor) {
            this.customColor = savedColor;
        }
    }
    
    // Memory storage fallback
    memoryStorage = {};
    
    getMemoryStorage(key) {
        return this.memoryStorage[key];
    }
    
    setMemoryStorage(key, value) {
        this.memoryStorage[key] = value;
    }
    
    applyTheme() {
        document.body.setAttribute('data-theme', this.currentTheme);
        document.documentElement.style.setProperty('--accent-color', this.customColor);
        this.updateThemeButtons();
        this.updateParticleColor();
        this.updateMetaTheme();
    }
    
    updateThemeButtons() {
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === this.currentTheme) {
                btn.classList.add('active');
            }
        });
    }
    
    updateParticleColor() {
        if (window.pJSDom && window.pJSDom[0]) {
            const color = this.currentTheme === 'dark' ? this.customColor : '#0066cc';
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    updateMetaTheme() {
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        const color = this.currentTheme === 'dark' ? '#0a0a0a' : '#ffffff';
        if (metaTheme) {
            metaTheme.content = color;
        }
    }
    
    setupEventListeners() {
        // Theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        const themeDropdown = document.getElementById('theme-dropdown');
        
        themeToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            themeDropdown?.classList.remove('show');
        });
        
        // Theme options
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = btn.getAttribute('data-theme');
                this.setTheme(theme);
            });
        });
        
        // Color picker
        const colorPicker = document.getElementById('accent-color');
        colorPicker?.addEventListener('input', (e) => {
            this.customColor = e.target.value;
            this.setMemoryStorage('accentColor', this.customColor);
            this.applyTheme();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        this.setMemoryStorage('theme', theme);
        this.applyTheme();
        
        // Track theme change
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                event_category: 'engagement',
                event_label: theme
            });
        }
    }
    
    toggleTheme() {
        this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    }
}
// js/theme.js - Theme Management

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || CONFIG.defaultTheme;
        this.customColor = localStorage.getItem('customColor') || CONFIG.defaultAccentColor;
        this.init();
    }
    
    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Apply custom color if using custom theme
        if (this.currentTheme === 'custom') {
            this.applyCustomColor(this.customColor);
        }
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update particles color based on theme
        this.updateParticleColor();
        
        // Update matrix rain based on theme
        this.updateMatrixRain();
        
        // Trigger theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    applyCustomColor(color) {
        this.customColor = color;
        document.documentElement.style.setProperty('--custom-color', color);
        localStorage.setItem('customColor', color);
        
        if (this.currentTheme === 'custom') {
            this.updateParticleColor();
        }
    }
    
    updateParticleColor() {
        if (!window.pJSDom || !window.pJSDom[0]) return;
        
        let color = '#000000';
        let lineColor = '#000000';
        let opacity = 0.5;
        
        switch (this.currentTheme) {
            case 'monochrome':
                color = '#ffffff';
                lineColor = '#ffffff';
                opacity = 0.3;
                break;
            case 'hacker':
                color = '#ff0000';
                lineColor = '#ff0000';
                opacity = 0.7;
                break;
            case 'dark':
                color = '#ffffff';
                lineColor = '#ffffff';
                opacity = 0.5;
                break;
            case 'light':
                color = '#0066ff';
                lineColor = '#0066ff';
                opacity = 0.9;
                break;
            case 'custom':
                color = this.customColor;
                lineColor = this.customColor;
                opacity = 0.5;
                break;
        }
        
        // Update particle settings
        const pJS = window.pJSDom[0].pJS;
        pJS.particles.color.value = color;
        pJS.particles.line_linked.color = lineColor;
        pJS.particles.opacity.value = opacity;
        pJS.fn.particlesRefresh();
    }
    
    updateMatrixRain() {
        const matrixContainer = document.getElementById('matrix-rain');
        if (!matrixContainer) return;
        
        // Clear existing characters
        matrixContainer.innerHTML = '';
        
        // Only show matrix rain in certain themes
        if (this.currentTheme === 'hacker' || this.currentTheme === 'dark') {
            this.startMatrixRain();
        }
    }
    
    startMatrixRain() {
        const matrixContainer = document.getElementById('matrix-rain');
        if (!matrixContainer) return;
        
        const chars = this.currentTheme === 'hacker' ? '01' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        
        const createChar = () => {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = chars[Math.floor(Math.random() * chars.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.fontSize = (Math.random() * 10 + 10) + 'px';
            char.style.animationDelay = Math.random() * 2 + 's';
            matrixContainer.appendChild(char);
            
            // Remove character after animation
            setTimeout(() => {
                char.remove();
            }, 5000);
        };
        
        // Create initial batch of characters
        for (let i = 0; i < 20; i++) {
            setTimeout(createChar, i * 100);
        }
        
        // Continue creating characters
        this.matrixInterval = setInterval(createChar, 200);
    }
    
    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeDropdown = document.getElementById('theme-dropdown');
        
        // Theme toggle button
        themeToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            themeDropdown?.classList.remove('show');
        });
        
        // Theme option buttons
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = btn.getAttribute('data-theme');
                this.applyTheme(theme);
                themeDropdown.classList.remove('show');
            });
        });
        
        // Color samples
        document.querySelectorAll('.color-sample').forEach(sample => {
            sample.addEventListener('click', () => {
                const color = sample.getAttribute('data-color');
                document.getElementById('accent-color').value = color;
                this.applyCustomColor(color);
                this.applyTheme('custom');
            });
        });
        
        // Color picker
        const colorPicker = document.getElementById('accent-color');
        colorPicker?.addEventListener('input', (e) => {
            this.applyCustomColor(e.target.value);
            this.applyTheme('custom');
        });
        
        // Set initial color picker value
        if (colorPicker) {
            colorPicker.value = this.customColor;
        }
    }
    
    // Cleanup method
    destroy() {
        if (this.matrixInterval) {
            clearInterval(this.matrixInterval);
        }
    }
}

// Initialize theme manager when DOM is ready
let themeManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager = new ThemeManager();
    });
} else {
    themeManager = new ThemeManager();
}
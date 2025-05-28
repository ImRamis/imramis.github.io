// Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = 'monochrome';
        this.customColor = '#ffffff';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.applyTheme('monochrome');
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        if (theme === 'custom') {
            document.documentElement.style.setProperty('--custom-color', this.customColor);
        }
        
        this.updateParticleColor();
    }
    
    updateParticleColor() {
        if (window.pJSDom && window.pJSDom[0]) {
            let color = '#00ff00';
            if (this.currentTheme === 'monochrome') {
                color = '#ffffff';
            } else if (this.currentTheme === 'custom') {
                color = this.customColor;
            }
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeDropdown = document.getElementById('theme-dropdown');
        
        themeToggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            themeDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', () => {
            themeDropdown?.classList.remove('show');
        });
        
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = btn.getAttribute('data-theme');
                this.applyTheme(theme);
            });
        });
        
        // Color samples
        document.querySelectorAll('.color-sample').forEach(sample => {
            sample.addEventListener('click', () => {
                const color = sample.getAttribute('data-color');
                this.customColor = color;
                document.getElementById('accent-color').value = color;
                this.applyTheme('custom');
            });
        });
        
        // Color picker
        const colorPicker = document.getElementById('accent-color');
        colorPicker?.addEventListener('input', (e) => {
            this.customColor = e.target.value;
            this.applyTheme('custom');
        });
    }
}
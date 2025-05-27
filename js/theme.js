// Theme Management
class ThemeManager {
    constructor() {
        this.themes = ['monochrome', 'red', 'blue', 'green', 'purple'];
        this.currentTheme = this.loadTheme() || 'monochrome';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
    }
    
    loadTheme() {
        return localStorage.getItem('portfolio-theme');
    }
    
    saveTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.updateThemeButtons();
        this.updateParticles();
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
    
    setupEventListeners() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.applyTheme(theme);
            });
        });
    }
}
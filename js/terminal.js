// js/terminal.js - Terminal Animation

class Terminal {
    constructor() {
        this.terminal = document.getElementById('terminal-output');
        this.commands = CONFIG.terminalCommands;
        this.currentCommand = 0;
        this.currentChar = 0;
        this.isTyping = false;
        this.currentLine = null;
        
        if (this.terminal && CONFIG.features.terminalAnimation) {
            this.startAnimation();
        }
    }
    
    startAnimation() {
        this.isTyping = true;
        this.typeCharacter();
    }
    
    typeCharacter() {
        if (!this.isTyping) return;
        
        const command = this.commands[this.currentCommand];
        
        // Create new line for command
        if (this.currentChar === 0) {
            this.currentLine = document.createElement('div');
            this.currentLine.className = 'terminal-line';
            const span = document.createElement('span');
            span.className = 'typing';
            span.style.color = 'var(--text-tertiary)';
            this.currentLine.appendChild(span);
            this.terminal.appendChild(this.currentLine);
            
            // Scroll to bottom
            this.terminal.scrollTop = this.terminal.scrollHeight;
        }
        
        const typingSpan = this.currentLine.querySelector('.typing');
        
        // Type command character by character
        if (this.currentChar < command.cmd.length) {
            typingSpan.textContent = command.cmd.substring(0, this.currentChar + 1);
            this.currentChar++;
            setTimeout(() => this.typeCharacter(), CONFIG.terminalTypingSpeed);
        } else {
            // Command typed, remove cursor and show output
            typingSpan.classList.remove('typing');
            
            setTimeout(() => {
                // Create output line(s)
                const outputLines = command.output.split('\n');
                outputLines.forEach((line, index) => {
                    const outputDiv = document.createElement('div');
                    outputDiv.className = 'terminal-output';
                    outputDiv.textContent = line;
                    outputDiv.style.opacity = '0';
                    this.terminal.appendChild(outputDiv);
                    
                    // Fade in output
                    setTimeout(() => {
                        outputDiv.style.transition = 'opacity 0.3s ease';
                        outputDiv.style.opacity = '1';
                    }, index * 50);
                });
                
                // Scroll to bottom
                this.terminal.scrollTop = this.terminal.scrollHeight;
                
                // Move to next command
                this.currentCommand = (this.currentCommand + 1) % this.commands.length;
                this.currentChar = 0;
                
                // Loop or continue to next command
                if (this.currentCommand === 0) {
                    // Clear terminal and restart after delay
                    setTimeout(() => {
                        this.terminal.innerHTML = '';
                        this.isTyping = true;
                        this.typeCharacter();
                    }, 3000);
                } else {
                    // Continue to next command
                    setTimeout(() => {
                        this.isTyping = true;
                        this.typeCharacter();
                    }, CONFIG.terminalLineDelay);
                }
            }, 300);
            
            this.isTyping = false;
        }
    }
    
    // Pause animation
    pause() {
        this.isTyping = false;
    }
    
    // Resume animation
    resume() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.typeCharacter();
        }
    }
    
    // Clear terminal
    clear() {
        this.terminal.innerHTML = '';
        this.currentCommand = 0;
        this.currentChar = 0;
    }
}

// Initialize terminal when DOM is ready
let terminal;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        terminal = new Terminal();
    });
} else {
    terminal = new Terminal();
}
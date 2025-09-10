// Global App Object
const App = {
    init() {
        this.initCursor();
        this.initParallax();
        this.initRevealAnimations();
        this.initCounters();
        this.initSkillBars();
    },

    // Custom Cursor
    initCursor() {
        const cursor = {
            dot: document.querySelector('.cursor-dot'),
            outline: document.querySelector('.cursor-outline')
        };

        if (!cursor.dot || !cursor.outline) return;

        let cursorX = 0;
        let cursorY = 0;
        let outlineX = 0;
        let outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            
            cursor.dot.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
        });

        const animateOutline = () => {
            outlineX += (cursorX - outlineX) * 0.1;
            outlineY += (cursorY - outlineY) * 0.1;
            
            cursor.outline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
            
            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Cursor hover effects
        document.querySelectorAll('a, button, .skill-card, .achievement-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.outline.style.width = '60px';
                cursor.outline.style.height = '60px';
                cursor.outline.style.borderColor = 'var(--color-accent-alt)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.outline.style.width = '40px';
                cursor.outline.style.height = '40px';
                cursor.outline.style.borderColor = 'var(--color-accent)';
            });
        });
    },

    // Parallax Effect
    initParallax() {
        const elements = document.querySelectorAll('.float-element');
        
        if (elements.length === 0) return;

        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            
            elements.forEach(el => {
                const speed = el.dataset.speed || 1;
                const translateX = x * speed * 50;
                const translateY = y * speed * 50;
                
                el.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
    },

    // Reveal Animations
    initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-item');
        
        if (reveals.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    },

    // Number Counters
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.count);
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target;
                        }
                    };

                    updateCounter();
                    entry.target.classList.add('counted');
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    },

    // Skill Bars Animation
    initSkillBars() {
        const bars = document.querySelectorAll('.level-bar');
        
        if (bars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.dataset.level;
                    entry.target.style.width = `${level}%`;
                }
            });
        }, {
            threshold: 0.5
        });

        bars.forEach(bar => observer.observe(bar));
    }
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});


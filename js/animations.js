// Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.initTextAnimations();
        this.initHoverEffects();
        this.initScrollTriggers();
        this.initLoadingStates();
    }

    initTextAnimations() {
        // Typewriter effect for hero title
        const heroTitle = document.querySelector('.hero-title .line');
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = '';
            let index = 0;

            const typeWriter = () => {
                if (index < text.length) {
                    heroTitle.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 100);
                }
            };

            setTimeout(typeWriter, 500);
        }

        // Glitch effect on hover
        document.querySelectorAll('[data-glitch]').forEach(el => {
            el.classList.add('text-glitch');
            el.setAttribute('data-text', el.textContent);
        });
    }

    initHoverEffects() {
        // Magnetic buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });

        // Tilt effect on cards
        document.querySelectorAll('.skill-card, .achievement-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const tiltX = (y - 0.5) * 10;
                const tiltY = (x - 0.5) * -10;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    initScrollTriggers() {
        // Parallax scrolling
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent), var(--color-accent-alt));
            z-index: 10000;
            transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }

    initLoadingStates() {
        // Simulate loading for demo
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Remove loading states after animations
            setTimeout(() => {
                document.querySelectorAll('.skeleton').forEach(el => {
                    el.classList.remove('skeleton');
                });
            }, 1000);
        });
    }
}

// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations
}, 10));

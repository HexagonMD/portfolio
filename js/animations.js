// ============================================
// Animation Controller
// ============================================
class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        this.initHoverEffects();
    }

    // Subtle hover tilt on cards
    initHoverEffects() {
        const cards = document.querySelectorAll('.skill-card, .about-stat-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                const tiltX = (y - 0.5) * 3;
                const tiltY = (x - 0.5) * -3;

                card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

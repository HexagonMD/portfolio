// ============================================
// Navigation Handler
// ============================================
class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.nav = document.querySelector('.nav');
        this.navMenu = document.getElementById('navMenu');
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }

    init() {
        this.handleMobileMenu();
        this.handleScroll();
        this.handleSmoothScroll();
        this.handleActiveLink();
    }

    handleMobileMenu() {
        if (!this.navToggle) return;

        this.navOverlay = document.getElementById('navOverlay');

        const openMenu = () => {
            this.navMenu.classList.add('active');
            this.navToggle.classList.add('active');
            if (this.navOverlay) this.navOverlay.classList.add('active');
        };

        const closeMenu = () => {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
            if (this.navOverlay) this.navOverlay.classList.remove('active');
        };

        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.contains('active') ? closeMenu() : openMenu();
        });

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => closeMenu());
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // オーバーレイクリックで閉じる
        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', () => closeMenu());
        }

        // デスクトップ幅にリサイズされたら閉じる
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        }, { passive: true });
    }

    handleScroll() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (window.scrollY > 50) {
                        this.header.classList.add('scrolled');
                    } else {
                        this.header.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    handleSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offset = 80;
                        const targetPosition = targetSection.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    handleActiveLink() {
        const observerOptions = {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (navLink) {
                    if (entry.isIntersecting) {
                        this.navLinks.forEach(l => l.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        this.sections.forEach(section => observer.observe(section));
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
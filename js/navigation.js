// Navigation Handler
class Navigation {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.navMenu = document.querySelector('.nav-menu');
        this.navToggle = document.querySelector('.nav-toggle');
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

        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            });
        });
    }

    handleScroll() {
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add background on scroll
            if (currentScroll > 50) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }

            // Hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                this.nav.style.transform = 'translateY(-100%)';
            } else {
                this.nav.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    handleSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // Only handle smooth scroll for internal anchor links (starting with #)
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        // Ensure the target section is visible before scrolling
                        targetSection.classList.add('active');

                        const offset = 80;
                        const targetPosition = targetSection.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
                // External links (like pages/*.html) will work normally without preventDefault
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
                
                if (entry.isIntersecting && navLink) {
                    // Remove active from all links
                    this.navLinks.forEach(link => link.classList.remove('active'));
                    // Add active to current link
                    navLink.classList.add('active');
                }
            });
        }, observerOptions);

        this.sections.forEach(section => observer.observe(section));
    }
}

// Initialize Navigation
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});
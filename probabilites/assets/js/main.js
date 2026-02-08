/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COURS INTERACTIF DE PROBABILITÉS - JAVASCRIPT PRINCIPAL
 * Version: 2.0 | Licence Universitaire
 * Features: Theme Toggle, Animations, Navigation, Utilities
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────
// THEME MANAGER - Dark/Light Mode
// ─────────────────────────────────────────────────────────────────────────
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Setup toggle button
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.theme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', this.theme);
            }
        });
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        
        // Trigger custom event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: this.theme } }));
    }

    getTheme() {
        return this.theme;
    }
}

// ─────────────────────────────────────────────────────────────────────────
// HEADER SCROLL EFFECT
// ─────────────────────────────────────────────────────────────────────────
class HeaderManager {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

// ─────────────────────────────────────────────────────────────────────────
// MOBILE NAVIGATION
// ─────────────────────────────────────────────────────────────────────────
class MobileNav {
    constructor() {
        this.menuToggle = document.querySelector('.menu-toggle');
        this.nav = document.querySelector('.nav');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.nav) return;

        this.menuToggle.addEventListener('click', () => this.toggle());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    toggle() {
        this.menuToggle.classList.toggle('active');
        this.nav.classList.toggle('active');
        document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }

    close() {
        this.menuToggle.classList.remove('active');
        this.nav.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ─────────────────────────────────────────────────────────────────────────
// SOLUTION & HINT TOGGLES
// ─────────────────────────────────────────────────────────────────────────
class SolutionManager {
    constructor() {
        this.init();
    }

    init() {
        // Solution toggles
        document.querySelectorAll('.solution-toggle').forEach(btn => {
            btn.addEventListener('click', () => this.toggleSolution(btn));
        });

        // Hint toggles
        document.querySelectorAll('.hint-btn').forEach(btn => {
            btn.addEventListener('click', () => this.toggleHint(btn));
        });
    }

    toggleSolution(btn) {
        const content = btn.nextElementSibling;
        if (!content) return;

        btn.classList.toggle('active');
        content.classList.toggle('show');

        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = content.classList.contains('show') 
                ? 'fas fa-eye-slash' 
                : 'fas fa-eye';
        }

        const text = btn.querySelector('span');
        if (text) {
            text.textContent = content.classList.contains('show')
                ? 'Masquer la correction'
                : 'Voir la correction détaillée';
        }
    }

    toggleHint(btn) {
        const content = btn.nextElementSibling;
        if (!content) return;

        content.classList.toggle('show');
        
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = content.classList.contains('show')
                ? 'fas fa-lightbulb'
                : 'far fa-lightbulb';
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS - Active Section Tracking
// ─────────────────────────────────────────────────────────────────────────
class TOCManager {
    constructor() {
        this.tocLinks = document.querySelectorAll('.toc-link');
        this.sections = [];
        this.init();
    }

    init() {
        if (this.tocLinks.length === 0) return;

        // Get all sections
        this.tocLinks.forEach(link => {
            const id = link.getAttribute('href')?.replace('#', '');
            if (id) {
                const section = document.getElementById(id);
                if (section) this.sections.push(section);
            }
        });

        // Observe sections
        const observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { rootMargin: '-100px 0px -50% 0px' }
        );

        this.sections.forEach(section => observer.observe(section));
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                this.setActive(id);
            }
        });
    }

    setActive(id) {
        this.tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────
// ANIMATION ON SCROLL
// ─────────────────────────────────────────────────────────────────────────
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        this.elements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animation = el.dataset.animate || 'fadeInUp';
                const delay = el.dataset.delay || 0;

                setTimeout(() => {
                    el.style.opacity = '1';
                    el.classList.add(`animate-${animation}`);
                }, delay);
            }
        });
    }
}

// ─────────────────────────────────────────────────────────────────────────
// MATHJAX CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
    },
    options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        ignoreHtmlClass: 'tex2jax_ignore'
    },
    startup: {
        ready: () => {
            MathJax.startup.defaultReady();
            MathJax.startup.promise.then(() => {
                console.log('MathJax ready!');
            });
        }
    }
};

// ─────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────
const Utils = {
    // Format number with fixed decimals
    formatNumber(num, decimals = 2) {
        return Number(num).toFixed(decimals);
    },

    // Generate random integer between min and max (inclusive)
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Factorial
    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    },

    // Combination C(n, k)
    combination(n, k) {
        if (k > n || k < 0) return 0;
        if (k === 0 || k === n) return 1;
        return this.factorial(n) / (this.factorial(k) * this.factorial(n - k));
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Smooth scroll to element
    scrollTo(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    // Copy to clipboard
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            return false;
        }
    }
};

// ─────────────────────────────────────────────────────────────────────────
// INITIALIZE ALL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    window.themeManager = new ThemeManager();
    window.headerManager = new HeaderManager();
    window.mobileNav = new MobileNav();
    window.solutionManager = new SolutionManager();
    window.tocManager = new TOCManager();
    window.scrollAnimations = new ScrollAnimations();

    // Expose utilities globally
    window.Utils = Utils;

    // Chapter Completion Tracker
    (function() {
        const match = window.location.pathname.match(/chapitre(\d+)/);
        if (!match) return;
        const num = parseInt(match[1]);
        let done = false;
        const check = () => {
            if (done) return;
            const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (pct > 0.85) {
                done = true;
                const arr = JSON.parse(localStorage.getItem('proba_rd_completed') || '[]');
                if (!arr.includes(num)) { arr.push(num); localStorage.setItem('proba_rd_completed', JSON.stringify(arr)); }
            }
        };
        window.addEventListener('scroll', check);
        setTimeout(check, 2000);
    })();

    console.log('🎲 Probas RD - Initialized!');
});

// ─────────────────────────────────────────────────────────────────────────
// EXPORT FOR MODULES
// ─────────────────────────────────────────────────────────────────────────
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, Utils };
}

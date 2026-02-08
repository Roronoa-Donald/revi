/**
 * RD-SQL Main Application Module v2.0
 * ThemeManager, MobileNav, TOCManager, ScrollAnimations, SolutionManager, HeaderManager
 */

// ============ THEME MANAGER ============
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('rd_sql_theme') || this.getSystemPreference();
        this.apply();
        this.bindToggle();
    }

    getSystemPreference() {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    apply() {
        document.documentElement.setAttribute('data-theme', this.theme);
        // Update Tailwind bg classes
        const body = document.body;
        if (this.theme === 'light') {
            body.classList.remove('bg-slate-900');
            body.classList.add('bg-slate-50');
        } else {
            body.classList.remove('bg-slate-50');
            body.classList.add('bg-slate-900');
        }
        // Update toggle icon
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('rd_sql_theme', this.theme);
        this.apply();
        document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: this.theme } }));
    }

    bindToggle() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggle();
            }
        });
    }
}

// ============ HEADER MANAGER ============
class HeaderManager {
    constructor() {
        this.header = document.querySelector('nav');
        if (!this.header) return;
        this.scrollThreshold = 50;
        window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    }

    onScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.header.classList.add('scrolled');
            this.header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            this.header.classList.remove('scrolled');
            this.header.style.boxShadow = '';
        }
    }
}

// ============ MOBILE NAV ============
class MobileNav {
    constructor() {
        this.overlay = document.getElementById('mobile-nav-overlay');
        this.panel = document.getElementById('mobile-nav-panel');
        this.btn = document.getElementById('hamburger-btn');

        if (!this.overlay || !this.panel || !this.btn) return;

        this.btn.addEventListener('click', () => this.toggle());
        this.overlay.addEventListener('click', () => this.close());

        // ESC to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) this.close();
        });
    }

    isOpen() {
        return this.panel?.classList.contains('active');
    }

    toggle() {
        if (this.isOpen()) this.close();
        else this.open();
    }

    open() {
        this.overlay.classList.add('active');
        this.panel.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('active');
        this.panel.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============ TABLE OF CONTENTS MANAGER ============
class TOCManager {
    constructor() {
        this.links = document.querySelectorAll('.toc-sidebar a[href^="#"]');
        if (this.links.length === 0) return;

        this.sections = [];
        this.links.forEach(link => {
            const id = link.getAttribute('href').slice(1);
            const section = document.getElementById(id);
            if (section) this.sections.push({ id, el: section, link });
        });

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.setActive(entry.target.id);
                    }
                });
            }, { rootMargin: '-20% 0px -60% 0px' });

            this.sections.forEach(s => this.observer.observe(s.el));
        }
    }

    setActive(id) {
        this.links.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.toc-sidebar a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
    }
}

// ============ SCROLL ANIMATIONS ============
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-animate]');
        if (this.elements.length === 0) return;

        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const delay = entry.target.dataset.delay || 0;
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, parseInt(delay));
                        this.observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            this.elements.forEach(el => this.observer.observe(el));
        } else {
            // Fallback: show all
            this.elements.forEach(el => el.classList.add('visible'));
        }
    }
}

// ============ SOLUTION MANAGER ============
class SolutionManager {
    constructor() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.solution-toggle');
            if (!btn) return;

            const targetId = btn.dataset.target;
            const solution = document.getElementById(targetId);
            if (!solution) return;

            const isHidden = solution.classList.contains('hidden');
            solution.classList.toggle('hidden');

            const icon = btn.querySelector('i');
            const text = btn.querySelector('.toggle-text');
            if (icon) {
                icon.className = isHidden ? 'fas fa-eye-slash' : 'fas fa-eye';
            }
            if (text) {
                text.textContent = isHidden ? 'Masquer' : 'Voir la solution';
            }
        });
    }
}

// ============ PROGRESS BAR (Scroll) ============
class ReadingProgress {
    constructor() {
        this.bar = document.querySelector('.progress-bar-fill');
        if (!this.bar) return;
        window.addEventListener('scroll', () => this.update(), { passive: true });
    }

    update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        this.bar.style.width = `${Math.min(progress, 100)}%`;
    }
}

// ============ GAMIFICATION BRIDGE (Connects DataBot to index UI) ============
class GamificationBridge {
    constructor() {
        this.connectProgress();
    }

    connectProgress() {
        const saved = localStorage.getItem('rd_sql_progress');
        if (!saved) return;
        try {
            const state = JSON.parse(saved);
            // Update level text
            const levelEl = document.getElementById('user-level');
            if (levelEl) {
                const titles = ['Novice', 'Apprenti', 'Développeur', 'Architecte', 'DBA', 'Maître SQL', 'Légende'];
                levelEl.textContent = titles[Math.min(state.level - 1, titles.length - 1)] || `Lvl ${state.level}`;
            }
            // Update progress bar
            const progressEl = document.getElementById('global-progress');
            if (progressEl) {
                const needed = state.level * 100;
                const pct = Math.min((state.xp / needed) * 100, 100);
                progressEl.style.width = `${pct}%`;
            }
            // Update XP displays
            const xpEl = document.getElementById('user-xp');
            if (xpEl) xpEl.textContent = `Lvl ${state.level} | XP: ${state.xp}`;

            // Update module completion on index
            const completedArr = state.completed && Array.isArray(state.completed) ? state.completed : [];
            // Also merge from rd_sql_completed tracker
            try {
                const tracked = JSON.parse(localStorage.getItem('rd_sql_completed') || '[]');
                tracked.forEach(n => { if (!completedArr.includes(n)) completedArr.push(n); });
            } catch(e) {}
            const completedCount = document.getElementById('completed-count');
            if (completedCount) completedCount.textContent = completedArr.length;
        } catch (e) { /* silent */ }
    }
}

// ============ UTILITIES ============
const Utils = {
    debounce(fn, delay = 250) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    smoothScrollTo(selector) {
        const el = document.querySelector(selector);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            return false;
        }
    }
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    new HeaderManager();
    new MobileNav();
    new TOCManager();
    new ScrollAnimations();
    new SolutionManager();
    new ReadingProgress();
    new GamificationBridge();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            e.preventDefault();
            Utils.smoothScrollTo(targetId);
        });
    });

    // Module Completion Tracker
    (function() {
        const match = window.location.pathname.match(/mod(\d+)/);
        if (!match) return;
        const num = parseInt(match[1]);
        let done = false;
        const check = () => {
            if (done) return;
            const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (pct > 0.85) {
                done = true;
                const arr = JSON.parse(localStorage.getItem('rd_sql_completed') || '[]');
                if (!arr.includes(num)) {
                    arr.push(num);
                    localStorage.setItem('rd_sql_completed', JSON.stringify(arr));
                    // Sync with gamification progress
                    try {
                        const progress = JSON.parse(localStorage.getItem('rd_sql_progress') || '{}');
                        if (!progress.completed) progress.completed = [];
                        if (!progress.completed.includes(num)) progress.completed.push(num);
                        localStorage.setItem('rd_sql_progress', JSON.stringify(progress));
                    } catch(e) {}
                    if (typeof DataBot !== 'undefined') DataBot.addXP(20, 'Module complété');
                }
            }
        };
        window.addEventListener('scroll', check);
        setTimeout(check, 2000);
    })();
});

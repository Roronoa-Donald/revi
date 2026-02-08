/* ============================================================
   LINUX ADMINISTRATION — main.js
   Theme toggle, Mobile nav, Reading progress, Scroll reveal
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* === Theme Manager === */
    const ThemeManager = {
        init() {
            this.toggle = document.querySelector('.theme-toggle');
            if (!this.toggle) return;
            const saved = localStorage.getItem('rd_linux_theme');
            if (saved) {
                document.documentElement.setAttribute('data-theme', saved);
                document.documentElement.classList.toggle('dark', saved === 'dark');
                this.updateIcon(saved);
            } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
                document.documentElement.setAttribute('data-theme', 'light');
                this.updateIcon('light');
            }
            this.toggle.addEventListener('click', () => this.switch());
        },
        switch() {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            document.documentElement.classList.toggle('dark', next === 'dark');
            localStorage.setItem('rd_linux_theme', next);
            this.updateIcon(next);
        },
        updateIcon(theme) {
            if (!this.toggle) return;
            this.toggle.innerHTML = theme === 'light'
                ? '<i class="fas fa-moon"></i>'
                : '<i class="fas fa-sun"></i>';
        }
    };

    /* === Mobile Nav === */
    const MobileNav = {
        init() {
            this.overlay = document.querySelector('.mobile-nav-overlay');
            this.panel = document.querySelector('.mobile-nav-panel');
            this.btn = document.querySelector('.hamburger-btn');
            this.closeBtn = document.querySelector('.mobile-nav-close');
            if (!this.overlay || !this.btn) return;

            this.btn.addEventListener('click', () => this.open());
            this.overlay.addEventListener('click', () => this.close());
            if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
            document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });

            // Close on link click
            this.panel?.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', () => this.close());
            });
        },
        open() {
            this.overlay?.classList.add('active');
            this.panel?.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.btn?.setAttribute('aria-expanded', 'true');
        },
        close() {
            this.overlay?.classList.remove('active');
            this.panel?.classList.remove('active');
            document.body.style.overflow = '';
            this.btn?.setAttribute('aria-expanded', 'false');
        }
    };

    /* === Reading Progress === */
    const ReadingProgress = {
        init() {
            this.bar = document.querySelector('.reading-progress');
            if (!this.bar) return;
            window.addEventListener('scroll', () => this.update(), { passive: true });
        },
        update() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            this.bar.style.width = Math.min(progress, 100) + '%';
        }
    };

    /* === Scroll Reveal === */
    const ScrollReveal = {
        init() {
            const els = document.querySelectorAll('.reveal-on-scroll');
            if (!els.length) return;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
            els.forEach(el => observer.observe(el));
        }
    };

    /* === Active Nav Link === */
    const ActiveNavLink = {
        init() {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            document.querySelectorAll('.nav-links a, .mobile-nav-panel a').forEach(a => {
                const href = a.getAttribute('href')?.split('/').pop();
                if (href === currentPage) a.classList.add('active');
            });
        }
    };

    /* === Smooth Scroll === */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Init all
    ThemeManager.init();
    MobileNav.init();
    ReadingProgress.init();
    ScrollReveal.init();
    ActiveNavLink.init();

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
                const arr = JSON.parse(localStorage.getItem('rd_linux_completed') || '[]');
                if (!arr.includes(num)) {
                    arr.push(num);
                    localStorage.setItem('rd_linux_completed', JSON.stringify(arr));
                    if (typeof GameEngine !== 'undefined') GameEngine.completeChapter(num);
                }
            }
        };
        window.addEventListener('scroll', check);
        setTimeout(check, 2000);
    })();
});

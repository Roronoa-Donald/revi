/* ============================================
   RD WINSERVER — Main JS
   Theme, Nav, Progress, Scroll Reveal
   ============================================ */

// ---- Theme Manager ----
const ThemeManager = {
    init() {
        const saved = localStorage.getItem('rd_winserver_theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        }
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', () => this.toggle());
        });
    },
    toggle() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('rd_winserver_theme',
            document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        document.querySelectorAll('.theme-toggle i').forEach(i => {
            i.className = document.documentElement.classList.contains('dark') ? 'fas fa-moon' : 'fas fa-sun';
        });
    }
};

// ---- Mobile Nav ----
const MobileNav = {
    init() {
        const btn = document.querySelector('.hamburger-btn');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const panel = document.querySelector('.mobile-nav-panel');
        const close = document.querySelector('.mobile-nav-close');
        if (!btn || !panel) return;
        const toggle = () => {
            panel.classList.toggle('active');
            overlay?.classList.toggle('active');
        };
        btn.addEventListener('click', toggle);
        overlay?.addEventListener('click', toggle);
        close?.addEventListener('click', toggle);
    }
};

// ---- Reading Progress ----
const ReadingProgress = {
    init() {
        const bar = document.querySelector('.reading-progress');
        if (!bar) return;
        window.addEventListener('scroll', () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
        });
    }
};

// ---- Scroll Reveal ----
const ScrollReveal = {
    init() {
        const els = document.querySelectorAll('.reveal-on-scroll');
        if (!els.length) return;
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
        }, { threshold: 0.1 });
        els.forEach(el => obs.observe(el));
    }
};

// ---- Active Nav Link ----
const ActiveNavLink = {
    init() {
        const path = window.location.pathname;
        document.querySelectorAll('.nav-links a, .mobile-nav-panel a').forEach(a => {
            if (a.getAttribute('href') && path.includes(a.getAttribute('href').replace('../', '').replace('./', ''))) {
                a.classList.add('active');
            }
        });
    }
};

// ---- Chapter Completion Tracker ----
const ChapterTracker = {
    key: 'rd_winserver_completed',
    init() {
        const match = window.location.pathname.match(/chapitre(\d+)/);
        if (!match) return;
        const num = parseInt(match[1]);
        let done = false;
        const check = () => {
            if (done) return;
            const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (pct > 0.85) {
                done = true;
                this.complete(num);
            }
        };
        window.addEventListener('scroll', check);
        setTimeout(check, 2000);
    },
    complete(n) {
        const arr = this.getAll();
        if (!arr.includes(n)) {
            arr.push(n);
            localStorage.setItem(this.key, JSON.stringify(arr));
        }
    },
    getAll() {
        try { return JSON.parse(localStorage.getItem(this.key)) || []; }
        catch { return []; }
    },
    isDone(n) { return this.getAll().includes(n); }
};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    MobileNav.init();
    ReadingProgress.init();
    ScrollReveal.init();
    ActiveNavLink.init();
    ChapterTracker.init();
    // Set theme icon
    document.querySelectorAll('.theme-toggle i').forEach(i => {
        i.className = document.documentElement.classList.contains('dark') ? 'fas fa-moon' : 'fas fa-sun';
    });
});

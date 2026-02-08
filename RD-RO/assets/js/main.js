/* ============================================================
   OPTIMIZATION MASTER — main.js
   Global behaviours: mobile menu, theme toggle, progress bar,
   scroll-to-top, smooth reveal on scroll.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Theme Toggle ---------- */
    const THEME_KEY = 'ro-theme';

    function setTheme(mode) {
        document.documentElement.setAttribute('data-theme', mode);
        localStorage.setItem(THEME_KEY, mode);
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.innerHTML = mode === 'dark'
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
            btn.setAttribute('aria-label', mode === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre');
        });
    }

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme);

    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    });

    /* ---------- Mobile Hamburger ---------- */
    const hamburger = document.querySelector('.hamburger-btn');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const panel = document.querySelector('.mobile-nav-panel');

    function openMobileNav() {
        if (overlay) overlay.classList.add('active');
        if (panel) panel.classList.add('active');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }
    function closeMobileNav() {
        if (overlay) overlay.classList.remove('active');
        if (panel) panel.classList.remove('active');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', openMobileNav);
    if (overlay) overlay.addEventListener('click', closeMobileNav);
    if (panel) {
        panel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
    }

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeMobileNav();
    });

    /* ---------- Reading Progress Bar ---------- */
    const progressBar = document.querySelector('.reading-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                progressBar.style.width = Math.min((scrollTop / docHeight) * 100, 100) + '%';
            }
        }, { passive: true });
    }

    /* ---------- Scroll-to-Top ---------- */
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('opacity-0', window.scrollY < 400);
            scrollBtn.classList.toggle('pointer-events-none', window.scrollY < 400);
        }, { passive: true });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------- Smooth Reveal on Scroll ---------- */
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => observer.observe(el));
    }

    /* ---------- Active Nav Link Highlight ---------- */
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a[href]').forEach(link => {
        const href = link.getAttribute('href').split('/').pop();
        if (href === currentPage) {
            link.classList.add('text-emerald-400', 'font-semibold');
        }
    });

    /* ---------- Chapter Completion Tracker ---------- */
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
                const arr = JSON.parse(localStorage.getItem('rd_ro_completed') || '[]');
                if (!arr.includes(num)) { arr.push(num); localStorage.setItem('rd_ro_completed', JSON.stringify(arr)); }
            }
        };
        window.addEventListener('scroll', check);
        setTimeout(check, 2000);
    })();

});

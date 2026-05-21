
document.addEventListener('DOMContentLoaded', () => {
  const progress = document.getElementById('reading-progress');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('mobile-nav-close');
  const themeToggle = document.getElementById('theme-toggle');

  function setMobile(open) {
    if (!mobileNav || !overlay) return;
    mobileNav.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
  }

  if (hamburger) hamburger.addEventListener('click', () => setMobile(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setMobile(false));
  if (overlay) overlay.addEventListener('click', () => setMobile(false));

  if (themeToggle) {
    const key = document.body.dataset.courseThemeKey || 'course-theme';
    const saved = localStorage.getItem(key);
    if (saved === 'light') document.body.classList.add('light-mode');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(key, document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  }

  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  }
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));

  document.addEventListener('click', (event) => {
    const reveal = event.target.closest('.reveal-btn');
    if (reveal) {
      const target = reveal.nextElementSibling;
      if (target) {
        target.classList.toggle('show');
        reveal.textContent = target.classList.contains('show') ? 'Masquer la correction' : 'Voir la correction';
      }
    }

    const option = event.target.closest('.quiz-option');
    if (!option) return;
    const card = option.closest('.quiz-card');
    if (!card || card.dataset.locked === 'true') return;
    const answer = Number(card.dataset.answer);
    const picked = Number(option.dataset.index);
    card.dataset.locked = 'true';
    card.querySelectorAll('.quiz-option').forEach((btn) => {
      const idx = Number(btn.dataset.index);
      btn.classList.add('disabled');
      if (idx === answer) btn.classList.add('correct');
      if (idx === picked && picked !== answer) btn.classList.add('incorrect');
    });
    const explain = card.querySelector('.quiz-explain');
    if (explain) explain.classList.add('show');
  });
});

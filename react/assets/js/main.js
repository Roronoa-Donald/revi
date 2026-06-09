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
    if (localStorage.getItem(key) === 'light') document.body.classList.add('light-mode');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(key, document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
  }

  function updateProgress() {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, pct)) + '%';
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
    const flash = event.target.closest('.flashcard');
    if (flash) {
      flash.classList.toggle('is-flipped');
      return;
    }

    const option = event.target.closest('.quiz-option');
    if (option) handleQuiz(option);

    const check = event.target.closest('.check-exercise');
    if (check) handleExercise(check);
  });

  function handleQuiz(option) {
    const card = option.closest('.quiz-card');
    if (!card || card.dataset.locked === 'true') return;
    const answer = Number(card.dataset.answer);
    const picked = Number(option.dataset.index);
    const status = card.querySelector('.quiz-status');
    let attempts = Number(card.dataset.attempts || '0') + 1;
    card.dataset.attempts = String(attempts);

    option.classList.add(picked === answer ? 'correct' : 'incorrect');
    if (picked === answer || attempts >= 2) {
      card.dataset.locked = 'true';
      card.querySelectorAll('.quiz-option').forEach((btn) => {
        const idx = Number(btn.dataset.index);
        btn.classList.add('disabled');
        if (idx === answer) btn.classList.add('correct');
      });
      const explain = card.querySelector('.quiz-explain');
      if (explain) explain.classList.add('show');
      if (status) status.textContent = picked === answer ? 'Reussi: correction debloquee.' : 'Deux essais faits: correction debloquee.';
    } else if (status) {
      status.textContent = 'Pas encore. Reessaie une fois avant de debloquer la correction.';
    }
  }

  function normalize(text) {
    return (text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function handleExercise(button) {
    const card = button.closest('.exercise-card, .code-lab');
    if (!card) return;
    const textarea = card.querySelector('textarea');
    const feedback = card.querySelector('.exercise-feedback');
    const solution = card.querySelector('.exercise-solution');
    const terms = (card.dataset.terms || '').split('|').map(normalize).filter(Boolean);
    const value = normalize(textarea ? textarea.value : '');
    const ok = terms.every((term) => value.includes(term));
    let attempts = Number(card.dataset.attempts || '0') + 1;
    card.dataset.attempts = String(attempts);

    if (ok || attempts >= 2) {
      if (solution) solution.classList.add('show');
      if (feedback) feedback.textContent = ok ? 'Reussi: correction debloquee.' : 'Deux essais faits: correction debloquee. Compare avec la solution.';
    } else if (feedback) {
      feedback.textContent = 'Il manque encore un element attendu. Reessaie: cherche les mots-cles du chapitre.';
    }
  }
});
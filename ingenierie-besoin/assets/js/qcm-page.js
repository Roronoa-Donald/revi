const bank = window.COURSE_QCM || [];
const area = document.getElementById('qcmArea');
const scoreDisplay = document.getElementById('scoreDisplay');
const fill = document.getElementById('progressFill');
const storageKey = (document.body.dataset.courseThemeKey || 'course') + '-qcm-errors';
let current = [];
let score = 0;
let answered = 0;

function getErrors() {
  return JSON.parse(localStorage.getItem(storageKey) || '[]');
}

function setErrors(ids) {
  localStorage.setItem(storageKey, JSON.stringify([...new Set(ids)]));
}

function updateScore() {
  scoreDisplay.textContent = 'Score : ' + score + ' / ' + current.length;
  fill.style.width = (current.length ? (answered / current.length) * 100 : 0) + '%';
}

function render(list) {
  current = list;
  score = 0;
  answered = 0;
  updateScore();
  area.innerHTML = '';
  if (!current.length) {
    area.innerHTML = '<section class="content-block">Aucune question pour ce filtre.</section>';
    return;
  }
  current.forEach((q, index) => {
    const card = document.createElement('section');
    card.className = 'quiz-card reveal-on-scroll is-visible';
    card.dataset.answer = q.a;
    card.dataset.qid = q.id;
    card.innerHTML = '<div class="quiz-question">' + (index + 1) + '. ' + q.q + '</div>' +
      '<div class="quiz-options">' + q.o.map((opt, i) => '<button class="quiz-option" data-index="' + i + '">' + opt + '</button>').join('') + '</div>' +
      '<div class="quiz-status"></div>' +
      '<div class="quiz-explain"><strong>Correction :</strong> ' + q.e + '</div>';
    area.appendChild(card);
  });
}

function applyMode(mode) {
  if (mode === 'all') render(bank);
  else if (mode === 'errors') {
    const ids = getErrors();
    render(bank.filter((q) => ids.includes(q.id)));
  } else {
    const ch = Number(mode);
    render(bank.filter((q) => q.ch === ch));
  }
}

document.querySelectorAll('.mode-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach((item) => item.classList.remove('active'));
    btn.classList.add('active');
    applyMode(btn.dataset.mode);
  });
});

area.addEventListener('click', (event) => {
  const option = event.target.closest('.quiz-option');
  if (!option) return;
  const card = option.closest('.quiz-card');
  if (!card || card.dataset.locked === 'true') return;
  const answer = Number(card.dataset.answer);
  const picked = Number(option.dataset.index);
  const qid = Number(card.dataset.qid);
  let attempts = Number(card.dataset.attempts || '0') + 1;
  card.dataset.attempts = String(attempts);
  option.classList.add(picked === answer ? 'correct' : 'incorrect');
  const status = card.querySelector('.quiz-status');
  if (picked === answer || attempts >= 2) {
    card.dataset.locked = 'true';
    card.querySelectorAll('.quiz-option').forEach((btn) => {
      const idx = Number(btn.dataset.index);
      btn.classList.add('disabled');
      if (idx === answer) btn.classList.add('correct');
    });
    card.querySelector('.quiz-explain').classList.add('show');
    answered += 1;
    const errors = getErrors();
    if (picked === answer) {
      score += 1;
      setErrors(errors.filter((id) => id !== qid));
      if (status) status.textContent = 'Reussi: correction debloquee.';
    } else {
      setErrors(errors.concat(qid));
      if (status) status.textContent = 'Deux essais faits: correction debloquee.';
    }
    updateScore();
  } else if (status) {
    status.textContent = 'Pas encore. Reessaie une fois avant de debloquer la correction.';
  }
});

render(bank);
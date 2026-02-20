/* ═══════════════════════════════════════════════════════════════
   CCNA — chapter-exercises.js
   Moteur d'exercices interactifs inline (Guidés / QCM / Drag & Drop)
   Lit les données depuis defined_exercises (exercises.js)
   ═══════════════════════════════════════════════════════════════ */

const ChapterExerciseEngine = {
  chapter: null,
  guided: [],
  qcm: [],
  drag: [],

  init() {
    const container = document.getElementById('interactive-exercise');
    if (!container || typeof defined_exercises === 'undefined') return;

    const match = window.location.pathname.match(/chapitre(\d+)/);
    if (!match) return;
    this.chapter = parseInt(match[1]);

    const chapterExos = defined_exercises.filter(e => e.chapter === this.chapter);
    this.guided = chapterExos.filter(e => e.type === 'guided');
    this.qcm    = chapterExos.filter(e => e.type === 'qcm');
    this.drag   = chapterExos.filter(e => e.type === 'drag');

    if (this.guided.length + this.qcm.length + this.drag.length === 0) return;
    this.render(container);
  },

  render(container) {
    container.innerHTML = `
      <h2><i class="fa-solid fa-dumbbell" style="color:var(--accent);margin-right:.5rem"></i>Exercices Interactifs</h2>
      <div class="exercise-tabs">
        <button class="ex-tab active" data-tab="guided"><i class="fa-solid fa-hands-helping"></i> Guidés (${this.guided.length})</button>
        <button class="ex-tab" data-tab="quiz"><i class="fa-solid fa-question-circle"></i> Quiz (${this.qcm.length})</button>
        <button class="ex-tab" data-tab="dragdrop"><i class="fa-solid fa-arrows-alt"></i> Drag & Drop (${this.drag.length})</button>
      </div>
      <div id="ex-guided" class="ex-panel active">${this.renderGuided()}</div>
      <div id="ex-quiz" class="ex-panel">${this.renderQuiz()}</div>
      <div id="ex-dragdrop" class="ex-panel">${this.renderDragDrop()}</div>
    `;
    this.bindTabs(container);
    this.bindGuided(container);
    this.bindQuiz(container);
    this.bindDragDrop(container);
  },

  /* ── Onglets ── */
  bindTabs(container) {
    container.querySelectorAll('.ex-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        container.querySelectorAll('.ex-tab').forEach(t => t.classList.remove('active'));
        container.querySelectorAll('.ex-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        container.querySelector('#ex-' + tab.dataset.tab).classList.add('active');
      });
    });
  },

  /* ══════════ GUIDED (step-by-step) ══════════ */
  renderGuided() {
    return this.guided.map((g, i) => {
      const steps = [];
      for (let s = 0; s < g.steps.length; s += 2) {
        steps.push({ prompt: g.steps[s], answer: g.steps[s + 1] });
      }
      return `
        <div class="guided-exercise" data-index="${i}">
          <p class="guided-q"><strong>${g.title || 'Exercice ' + (i+1)}</strong></p>
          <p class="guided-desc">${g.question}</p>
          <div class="guided-steps">
            ${steps.map((st, si) => `
              <div class="guided-step" data-step="${si}">
                <span class="step-prompt">${st.prompt}</span>
                <span class="step-answer" id="step-${i}-${si}">${st.answer}</span>
                <button class="step-reveal-btn" data-gi="${i}" data-si="${si}">👁 Révéler</button>
              </div>
            `).join('')}
          </div>
          <div class="guided-solution-zone">
            <button class="show-solution-btn" data-index="${i}"><i class="fa-solid fa-lightbulb"></i> Voir la solution complète</button>
            <div class="guided-solution" id="gsolution-${i}">
              <div class="solution-content"><i class="fa-solid fa-check-circle"></i> ${g.answer}</div>
            </div>
          </div>
        </div>`;
    }).join('');
  },

  bindGuided(container) {
    container.querySelectorAll('.step-reveal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const gi = btn.dataset.gi, si = btn.dataset.si;
        const el = document.getElementById(`step-${gi}-${si}`);
        el.classList.toggle('visible');
        btn.textContent = el.classList.contains('visible') ? '🙈 Cacher' : '👁 Révéler';
        if (el.classList.contains('visible') && typeof GameEngine !== 'undefined') {
          GameEngine.addXP(2, 'Étape révélée');
        }
      });
    });
    container.querySelectorAll('.show-solution-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sol = document.getElementById(`gsolution-${btn.dataset.index}`);
        sol.classList.toggle('visible');
        btn.innerHTML = sol.classList.contains('visible')
          ? '<i class="fa-solid fa-eye-slash"></i> Cacher la solution'
          : '<i class="fa-solid fa-lightbulb"></i> Voir la solution complète';
        if (sol.classList.contains('visible') && typeof GameEngine !== 'undefined') {
          GameEngine.addXP(5, 'Exercice guidé consulté');
        }
      });
    });
  },

  /* ══════════ QCM ══════════ */
  renderQuiz() {
    return this.qcm.map((q, i) => `
      <div class="quiz-question" data-index="${i}">
        <p><strong>Q${i + 1}.</strong> ${q.question}</p>
        <div class="mcq-options">
          ${q.options.map((o, oi) => `<button class="mcq-btn" data-qi="${i}" data-oi="${oi}">${o}</button>`).join('')}
        </div>
        <div class="quiz-feedback" id="qfeedback-${i}"></div>
      </div>`
    ).join('');
  },

  bindQuiz(container) {
    container.querySelectorAll('.mcq-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const qi = parseInt(btn.dataset.qi);
        const oi = parseInt(btn.dataset.oi);
        const fb = document.getElementById(`qfeedback-${qi}`);
        const btns = container.querySelectorAll(`.mcq-btn[data-qi="${qi}"]`);
        btns.forEach(b => { b.disabled = true; b.classList.remove('correct', 'incorrect'); });
        if (oi === this.qcm[qi].correct) {
          btn.classList.add('correct');
          fb.innerHTML = '✅ Bonne réponse ! +10 XP';
          fb.className = 'quiz-feedback correct';
          if (typeof GameEngine !== 'undefined') {
            GameEngine.addXP(10, 'Quiz réussi');
            if (GameEngine.state) { GameEngine.state.quizCorrect = (GameEngine.state.quizCorrect||0) + 1; GameEngine.save(); }
          }
        } else {
          btn.classList.add('incorrect');
          btns[this.qcm[qi].correct].classList.add('correct');
          fb.innerHTML = '❌ Mauvaise réponse.';
          fb.className = 'quiz-feedback incorrect';
        }
      });
    });
  },

  /* ══════════ DRAG & DROP ══════════ */
  renderDragDrop() {
    return this.drag.map((dd, i) => {
      const shuffled = [...dd.pairs.map(p => p.right)].sort(() => Math.random() - 0.5);
      return `
        <div class="dd-exercise" data-index="${i}">
          <p><strong>Exercice ${i + 1}.</strong> ${dd.question}</p>
          <div class="dd-targets">
            ${dd.pairs.map((p, pi) => `
              <div class="dd-row" data-pair="${pi}">
                <span class="dd-key">${p.left}</span>
                <span class="dd-dropzone" data-expected="${p.right}" data-pi="${pi}">Glisse ici</span>
              </div>
            `).join('')}
          </div>
          <div class="dd-pool" id="dd-pool-${i}">
            ${shuffled.map(v => `<span class="dd-item" draggable="true" data-value="${v}">${v}</span>`).join('')}
          </div>
          <button class="dd-check-btn" data-index="${i}">Vérifier</button>
          <div class="dd-feedback" id="ddfeedback-${i}"></div>
        </div>`;
    }).join('');
  },

  bindDragDrop(container) {
    let draggedItem = null;

    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('dragstart', e => {
        draggedItem = item;
        item.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        draggedItem = null;
      });
    });

    container.querySelectorAll('.dd-dropzone').forEach(zone => {
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', e => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (!draggedItem) return;
        if (zone.querySelector('.dd-item')) {
          const existing = zone.querySelector('.dd-item');
          const pool = container.querySelector(`#dd-pool-${zone.closest('.dd-exercise').dataset.index}`);
          pool.appendChild(existing);
        }
        zone.textContent = '';
        zone.appendChild(draggedItem);
      });
    });

    /* Mobile : tap-to-select */
    let selectedItem = null;
    container.querySelectorAll('.dd-item').forEach(item => {
      item.addEventListener('click', () => {
        if (selectedItem) selectedItem.classList.remove('selected');
        selectedItem = item;
        item.classList.add('selected');
      });
    });
    container.querySelectorAll('.dd-dropzone').forEach(zone => {
      zone.addEventListener('click', () => {
        if (!selectedItem) return;
        if (zone.querySelector('.dd-item')) {
          const existing = zone.querySelector('.dd-item');
          const pool = container.querySelector(`#dd-pool-${zone.closest('.dd-exercise').dataset.index}`);
          pool.appendChild(existing);
        }
        zone.textContent = '';
        zone.appendChild(selectedItem);
        selectedItem.classList.remove('selected');
        selectedItem = null;
      });
    });

    container.querySelectorAll('.dd-check-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = parseInt(btn.dataset.index);
        const exercise = container.querySelector(`.dd-exercise[data-index="${i}"]`);
        const zones = exercise.querySelectorAll('.dd-dropzone');
        const fb = document.getElementById(`ddfeedback-${i}`);
        let correct = 0;
        zones.forEach(zone => {
          const placed = zone.querySelector('.dd-item');
          zone.classList.remove('dd-correct', 'dd-incorrect');
          if (placed && placed.dataset.value === zone.dataset.expected) {
            zone.classList.add('dd-correct'); correct++;
          } else {
            zone.classList.add('dd-incorrect');
          }
        });
        if (correct === zones.length) {
          fb.innerHTML = `✅ Parfait ! ${correct}/${zones.length} — +20 XP`;
          fb.className = 'dd-feedback correct';
          btn.disabled = true;
          if (typeof GameEngine !== 'undefined') {
            GameEngine.addXP(20, 'Drag & Drop parfait');
            if (GameEngine.state) { GameEngine.state.dragDropWins = (GameEngine.state.dragDropWins||0) + 1; GameEngine.save(); }
          }
        } else {
          fb.innerHTML = `❌ ${correct}/${zones.length} correct(s). Réessaie !`;
          fb.className = 'dd-feedback incorrect';
        }
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => ChapterExerciseEngine.init());

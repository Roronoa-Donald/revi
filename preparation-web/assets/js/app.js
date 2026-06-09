(function() {
  const projects = window.PREPARATION_PROJECTS || [];
  const LOCAL_KEY = 'preparation-web-progress-v1';
  const SAVE_DELAY = 650;

  const $ = (selector) => document.querySelector(selector);
  const refs = {
    shell: $('.app-shell'),
    workspace: $('.workspace'),
    projectList: $('#projectList'),
    studentName: $('#studentName'),
    studentRank: $('#studentRank'),
    studentXp: $('#studentXp'),
    progressBar: $('#globalProgressBar'),
    progressText: $('#globalProgressText'),
    trackLabel: $('#trackLabel'),
    projectTitle: $('#projectTitle'),
    statXp: $('#statXp'),
    progressTrigger: $('#progressTrigger'),
    statBadges: $('#statBadges'),
    saveState: $('#saveState'),
    lessonTitle: $('#lessonTitle'),
    lessonContent: $('#lessonContent'),
    lessonMiniCourse: $('#lessonMiniCourse'),
    lessonExercise: $('#lessonExercise'),
    prevStep: $('#prevStep'),
    nextStep: $('#nextStep'),
    stepIndicator: $('#stepIndicator'),
    htmlEditor: $('#htmlEditor'),
    cssEditor: $('#cssEditor'),
    jsEditor: $('#jsEditor'),
    htmlLockLabel: $('#htmlLockLabel'),
    jsLockLabel: $('#jsLockLabel'),
    previewFrame: $('#previewFrame'),
    previewTitle: $('#previewTitle'),
    feedbackCard: $('#feedbackCard'),
    feedbackList: $('#feedbackList'),
    quizSection: $('#quizSection'),
    quizContent: $('#quizContent'),
    leaderboard: $('#leaderboard'),
    toast: $('#toast'),
    solutionModal: $('#solutionModal'),
    solutionContent: $('#solutionContent'),
    solutionBtn: $('#solutionBtn'),
    progressModal: $('#progressModal'),
    progressList: $('#progressList'),
    progressTimeline: $('#progressTimeline'),
    closeProgress: $('#closeProgress'),
    toggleLesson: $('#toggleLesson'),
    toggleFocus: $('#toggleFocus'),
    cssToggle: $('#cssToggle'),
    cssToggleLabel: $('#cssToggleLabel'),
    aiFab: $('#aiFab'),
    aiPanel: $('#aiPanel'),
    aiClose: $('#aiClose'),
    aiInput: $('#aiInput'),
    aiSend: $('#aiSend'),
    aiMessages: $('#aiMessages'),
    autocompleteBox: $('#autocompleteBox')
  };

  const state = {
    currentId: projects.length > 0 ? projects[0].id : 1,
    activeTab: 'html',
    profile: null,
    leaderboard: [],
    progress: {},
    quizAnswers: {},
    quizBank: {},
    localKey: LOCAL_KEY,
    saveTimer: null,
    canUseServer: true,
    previewCssEnabled: true,
    focusMode: false,
    aiBusy: false,
    railWasCollapsed: false
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  const GUIDE_MARKERS = {
    html: { start: '<!-- GUIDE START', end: 'GUIDE END -->' },
    js: { start: '/* GUIDE START', end: 'GUIDE END */' }
  };

  const editorState = {
    html: null,
    css: null,
    js: null
  };

  function initCodeMirror() {
    if (!window.CodeMirror || !refs.htmlEditor || !refs.cssEditor || !refs.jsEditor) return;
    const baseOptions = {
      theme: 'proba-black',
      lineNumbers: false,
      lineWrapping: true,
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,
      autoCloseBrackets: true
    };
    editorState.html = window.CodeMirror.fromTextArea(refs.htmlEditor, {
      ...baseOptions,
      mode: 'htmlmixed',
      autoCloseTags: true
    });
    editorState.css = window.CodeMirror.fromTextArea(refs.cssEditor, {
      ...baseOptions,
      mode: 'css',
      readOnly: 'nocursor'
    });
    editorState.js = window.CodeMirror.fromTextArea(refs.jsEditor, {
      ...baseOptions,
      mode: 'javascript'
    });
  }

  function getEditor(type) {
    return editorState[type] || null;
  }

  function getEditorValue(type) {
    const editor = getEditor(type);
    if (editor) return editor.getValue();
    const fallback = refs[`${type}Editor`];
    return fallback ? fallback.value : '';
  }

  function setEditorValue(type, value) {
    const next = String(value || '');
    const editor = getEditor(type);
    if (editor) {
      if (editor.getValue() !== next) editor.setValue(next);
      return;
    }
    const fallback = refs[`${type}Editor`];
    if (fallback) fallback.value = next;
  }

  function setEditorReadOnly(type, locked) {
    const editor = getEditor(type);
    if (editor) {
      editor.setOption('readOnly', locked ? 'nocursor' : false);
      return;
    }
    const fallback = refs[`${type}Editor`];
    if (fallback) fallback.readOnly = locked;
  }

  function refreshEditor(type) {
    const editor = getEditor(type);
    if (editor) editor.refresh();
  }

  function showToast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.add('is-visible');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => refs.toast.classList.remove('is-visible'), 3600);
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.message || 'Erreur API');
      error.data = data;
      error.status = response.status;
      throw error;
    }
    return data;
  }

  async function loadQuizBank() {
    try {
      const response = await fetch('assets/data/preparation-quiz.json', { cache: 'no-store' });
      const data = await response.json();
      state.quizBank = data || {};
    } catch {
      state.quizBank = {};
    }
  }

  function projectById(id) {
      return projects.find((project) => String(project.id) === String(id));
    }

  function defaultProgress(project) {
    return {
      projectId: project.id,
      htmlCode: project.starterHtml || '',
      jsCode: project.starterJs || '',
      completed: false,
      projectXp: 0,
      quizXp: 0,
      quizScore: 0,
      quizCompleted: false,
      usedHint: false,
      usedSolution: false,
      attempts: 0,
      lessonStep: 0,
      hintLevel: 0,
      updatedAt: new Date(0).toISOString()
    };
  }

  function loadLocalState() {
    try {
      return JSON.parse(localStorage.getItem(state.localKey)) || {};
    } catch {
      return {};
    }
  }

  function saveLocalState() {
    localStorage.setItem(state.localKey, JSON.stringify({
      progress: state.progress,
      quizAnswers: state.quizAnswers,
      currentId: state.currentId,
      savedAt: new Date().toISOString()
    }));
  }

  function hydrateDefaults() {
    const local = loadLocalState();
    for (const project of projects) {
      state.progress[project.id] = {
        ...defaultProgress(project),
        ...((local.progress || {})[project.id] || {})
      };
    }
    state.quizAnswers = local.quizAnswers || {};
    if (local.currentId) {
      const storedId = Number(local.currentId);
      if (Number.isFinite(storedId) && projectById(storedId)) {
        state.currentId = storedId;
      }
    }
  }

  function mergeServerProgress(rows) {
    for (const row of rows || []) {
      const project = projectById(row.projectId);
      if (!project) continue;

      const local = state.progress[row.projectId] || defaultProgress(project);
      const localTime = new Date(local.updatedAt || 0).getTime();
      const serverTime = new Date(row.updatedAt || 0).getTime();

      if (serverTime >= localTime) {
        state.progress[row.projectId] = {
          ...local,
          ...row,
          htmlCode: row.htmlCode || local.htmlCode || project.starterHtml || '',
          jsCode: row.jsCode || local.jsCode || project.starterJs || ''
        };
      } else if (localTime > serverTime && state.canUseServer) {
        scheduleServerSave(row.projectId, true);
      }
    }
    saveLocalState();
  }

  function completedBefore(projectId) {
      const normalized = Number(projectId);
      const idx = projects.findIndex(p => Number(p.id) === normalized);
      if (idx <= 0) return true; // first project is always unlocked
      for (let i = 0; i < idx; i++) {
        const id = projects[i].id;
        if (!state.progress[id] || !state.progress[id].completed) return false;
      }
      return true;
    }

  function unlockedProjectId() {
      for (const project of projects) {
        if (!state.progress[project.id].completed) return project.id;
      }
      return projects.length > 0 ? projects[projects.length - 1].id : null;
    }

    function renderProjectList() {
      refs.projectList.innerHTML = projects.map((project) => {
        const progress = state.progress[project.id] || defaultProgress(project);
      const locked = !completedBefore(project.id);
      const status = progress.completed ? 'valide' : locked ? 'verrouille' : 'en cours';
      return `
        <button class="project-button ${project.id === state.currentId ? 'is-active' : ''} ${locked ? 'is-locked' : ''}" data-project-id="${project.id}" type="button">
          <span class="project-number">${project.id}</span>
          <span>
            <span class="project-title">${escapeHtml(project.title)}</span>
            <span class="project-meta">${escapeHtml(project.track)} · ${status}</span>
          </span>
          <span>${progress.completed ? 'OK' : locked ? 'LOCK' : 'GO'}</span>
        </button>
      `;
    }).join('');
  }

  function renderStats() {
    const completed = Object.values(state.progress).filter((item) => item.completed).length;
    const totalXp = state.profile ? state.profile.totalXp : Object.values(state.progress).reduce((sum, item) => sum + Number(item.projectXp || 0) + Number(item.quizXp || 0), 0);
    const rank = state.profile && state.profile.rank ? `Rang #${state.profile.rank}` : 'Rang --';
    const badges = buildBadges().length;

    refs.studentName.textContent = state.profile ? state.profile.displayName : 'Apprenant B2';
    refs.studentRank.textContent = rank;
    refs.studentXp.textContent = `${totalXp} XP`;
    refs.progressBar.style.width = `${Math.round((completed / projects.length) * 100)}%`;
    refs.progressText.textContent = `${completed}/${projects.length} projets valides`;
    refs.statXp.textContent = totalXp;
    if (refs.progressTrigger) refs.progressTrigger.textContent = `${completed}/${projects.length}`;
    refs.statBadges.textContent = badges;
  }

  function buildBadges() {
    const done = Object.values(state.progress).filter((item) => item.completed).length;
    const badges = [];
    if (done >= 1) badges.push('Premier projet');
    if (state.progress[5] && state.progress[5].completed) badges.push('HTML valide');
    if (state.progress[9] && state.progress[9].completed) badges.push('JS solide');
    if (state.progress[10] && state.progress[10].completed) badges.push('Finaliste');
    return badges;
  }

  function renderProgressModal() {
    if (!refs.progressList || !refs.progressTimeline) return;
    const rows = projects.map((project) => {
      const progress = state.progress[project.id] || defaultProgress(project);
      const status = progress.completed ? 'valide' : completedBefore(project.id) ? 'en cours' : 'verrouille';
      return `
        <div class="progress-row">
          <strong>${project.id}</strong>
          <div>
            <div>${escapeHtml(project.title)}</div>
            <span>${escapeHtml(project.track)} · ${status}</span>
          </div>
          <div class="progress-status">${progress.completed ? 'OK' : '...'}</div>
        </div>
      `;
    }).join('');
    refs.progressList.innerHTML = rows;

    const nodes = projects.map((project) => {
      const progress = state.progress[project.id] || defaultProgress(project);
      return `<span class="progress-node ${progress.completed ? 'is-done' : ''}"></span>`;
    }).join('');
    refs.progressTimeline.innerHTML = nodes;
  }

  function openProgressModal() {
    renderProgressModal();
    refs.progressModal.classList.remove('is-hidden');
  }

  function closeProgressModal() {
    refs.progressModal.classList.add('is-hidden');
  }

  function setFocusMode(enabled) {
    state.focusMode = !!enabled;
    refs.workspace.classList.toggle('focus-code', state.focusMode);
    if (refs.toggleFocus) refs.toggleFocus.textContent = state.focusMode ? 'Mode normal' : 'Focus code';
    if (state.focusMode) {
      state.railWasCollapsed = refs.shell.classList.contains('rail-collapsed');
      refs.shell.classList.add('rail-collapsed');
    } else if (!state.railWasCollapsed) {
      refs.shell.classList.remove('rail-collapsed');
    }
    localStorage.setItem('preparation-web-focus', state.focusMode ? '1' : '0');
  }

  function setPreviewCss(enabled) {
    state.previewCssEnabled = !!enabled;
    if (refs.cssToggle) refs.cssToggle.checked = state.previewCssEnabled;
    if (refs.cssToggleLabel) {
      refs.cssToggleLabel.textContent = state.previewCssEnabled ? 'Structure + CSS' : 'Structure';
    }
    localStorage.setItem('preparation-web-preview-css', state.previewCssEnabled ? '1' : '0');
    renderPreview();
  }

  function lessonSteps(project) {
    if (project.steps && project.steps.length) return project.steps;
    const lesson = project.lesson || {};
    return lesson.steps && lesson.steps.length ? lesson.steps : [project.checkInstructions || project.description || 'Suis la consigne et valide le projet.'];
  }

  function clampStepIndex(project, progress) {
    const steps = lessonSteps(project);
    const current = Number(progress.lessonStep || 0);
    return Math.min(Math.max(current, 0), Math.max(steps.length - 1, 0));
  }

  function buildList(items) {
    if (!items || !items.length) return '';
    return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function buildBlock(title, content, extraClass) {
    if (!content) return '';
    return `<article class="lesson-block ${extraClass || ''}"><h3>${escapeHtml(title)}</h3>${content}</article>`;
  }

  function buildMiniCourse(project) {
    if (project.pedagogy) {
      return project.pedagogy;
    }

    const blocks = [];
    if (project.objective) blocks.push(buildBlock('Objectif', `<p>${escapeHtml(project.objective)}</p>`));
    if (project.build) blocks.push(buildBlock('Ce que tu construis', `<p>${escapeHtml(project.build)}</p>`));
    if (project.concepts && project.concepts.length) blocks.push(buildBlock('Notions apprises', buildList(project.concepts)));
    if (project.memos && project.memos.length) blocks.push(buildBlock('Memo rapide', buildList(project.memos), 'memo'));
    if (project.commonErrors && project.commonErrors.length) blocks.push(buildBlock('Erreurs frequentes', buildList(project.commonErrors)));
    if (project.tips && project.tips.length) blocks.push(buildBlock('Astuces', buildList(project.tips)));
    if (project.glossary && project.glossary.length) blocks.push(buildBlock('Glossaire', buildList(project.glossary)));

    if (!blocks.length) {
      return `
        <h3>Mini-cours</h3>
        <p>${escapeHtml(project.description || 'Lis la consigne puis realise l exercice.')}</p>
      `;
    }

    return `<h3>Mini-cours</h3>${blocks.join('')}`;
  }

  function buildExercise(project, stepText) {
    const blocks = [];
    blocks.push(`<h3>Exercice etape par etape</h3><p>${escapeHtml(stepText)}</p>`);

    if (project.checklist && project.checklist.length) {
      blocks.push(buildBlock('Checklist', buildList(project.checklist), 'memo'));
    }

    blocks.push(buildBlock('Validation finale', `<p>Clique sur Valider pour verifier automatiquement ton projet.</p>`));

    return blocks.join('');
  }

  function buildGuideBlock(type, text) {
    if (!text) return '';
    const marker = GUIDE_MARKERS[type];
    const cleaned = String(text).trim();
    return `${marker.start}\n${cleaned}\n${marker.end}\n`;
  }

  function stripGuideBlock(code, type) {
    if (!code) return '';
    const marker = GUIDE_MARKERS[type];
    const pattern = new RegExp(`${escapeRegExp(marker.start)}[\\s\\S]*?${escapeRegExp(marker.end)}\\n?`, 'gm');
    return String(code).replace(pattern, '');
  }

  function applyGuideBlock(code, type, text) {
    const cleaned = stripGuideBlock(code || '', type).trimStart();
    if (!text) return cleaned;
    return buildGuideBlock(type, text) + cleaned;
  }

  function guideTextFor(project, stepIndex, type) {
    const list = type === 'html' ? project.guideHtml : project.guideJs;
    if (!list || !list.length) return '';
    return list[Math.min(stepIndex, list.length - 1)] || '';
  }

  function syncGuideBlocks(project, stepIndex) {
    const progress = currentProgress();
    let changed = false;

    if (project.guideHtml) {
      const base = getEditorValue('html') || progress.htmlCode || project.starterHtml || '';
      const next = applyGuideBlock(base, 'html', guideTextFor(project, stepIndex, 'html'));
      if (next !== base) {
        setEditorValue('html', next);
        progress.htmlCode = next;
        changed = true;
      }
    }

    if (project.guideJs) {
      const base = getEditorValue('js') || progress.jsCode || project.starterJs || '';
      const next = applyGuideBlock(base, 'js', guideTextFor(project, stepIndex, 'js'));
      if (next !== base) {
        setEditorValue('js', next);
        progress.jsCode = next;
        changed = true;
      }
    }

    if (changed) {
      progress.updatedAt = new Date().toISOString();
      saveLocalState();
    }
  }

  function renderLesson(project) {
    const progress = currentProgress();
    const steps = lessonSteps(project);
    const stepIndex = clampStepIndex(project, progress);
    const stepText = steps[stepIndex] || steps[0];

    progress.lessonStep = stepIndex;
    refs.lessonTitle.textContent = project.title;
    refs.lessonMiniCourse.innerHTML = buildMiniCourse(project);
    refs.lessonExercise.innerHTML = buildExercise(project, stepText);
    refs.stepIndicator.textContent = `Etape ${stepIndex + 1}/${steps.length}`;
    syncGuideBlocks(project, stepIndex);
  }

  function currentProgress() {
    return state.progress[state.currentId];
  }

  function canEditHtml(project) {
    return project.mode === 'html' || project.mode === 'final';
  }

  function canEditJs(project) {
    return project.mode === 'js' || project.mode === 'final';
  }

  function renderProject() {
    hideAutocomplete();
    const project = projectById(state.currentId);
    const progress = currentProgress();

    refs.trackLabel.textContent = project.track;
    refs.projectTitle.textContent = project.title;
    refs.previewTitle.textContent = project.description || '';
    setEditorValue('html', progress.htmlCode);
    setEditorValue('css', project.providedCss || project.starterCss || '');
    setEditorValue('js', progress.jsCode);
    setEditorReadOnly('html', !canEditHtml(project));
    setEditorReadOnly('js', !canEditJs(project));
    setEditorReadOnly('css', true);
    refs.htmlLockLabel.textContent = canEditHtml(project) ? 'editable' : 'visible verrouille';
    refs.jsLockLabel.textContent = canEditJs(project) ? 'editable' : 'visible verrouille';
    refs.solutionBtn.classList.toggle('is-hidden', progress.attempts < 2);

    renderLesson(project);
    renderProjectList();
    renderStats();
    renderEditorTab(state.activeTab);
    renderPreview();
    renderFeedback(['Ecris le code demande puis clique sur Valider.'], 'neutral');
    renderQuiz(project);
  }

  function renderEditorTab(tab) {
    state.activeTab = tab;
    document.querySelectorAll('.tab').forEach((button) => {
      button.classList.toggle('is-active', button.dataset.editorTab === tab);
    });
    document.querySelectorAll('.editor-card').forEach((panel) => {
      panel.classList.toggle('is-hidden', panel.dataset.panel !== tab);
    });
    refreshEditor(tab);
  }

  function changeLessonStep(delta) {
    const project = projectById(state.currentId);
    const progress = currentProgress();
    const steps = lessonSteps(project);
    const next = Math.min(Math.max(Number(progress.lessonStep || 0) + delta, 0), Math.max(steps.length - 1, 0));
    if (next === progress.lessonStep) return;
    progress.lessonStep = next;
    progress.updatedAt = new Date().toISOString();
    saveLocalState();
    renderLesson(project);
  }

  function composePreview(project, progress) {
    const safeJs = String(progress.jsCode || '').replace(/<\/script/gi, '<\\/script');
    const css = state.previewCssEnabled ? (project.providedCss || project.starterCss || '') : '';
    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${css}</style>
</head>
<body>
${progress.htmlCode || ''}
<script>
window.addEventListener('error', function(event) {
  var box = document.createElement('pre');
  box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;padding:12px;border-radius:12px;background:#7f1d1d;color:white;white-space:pre-wrap;font:14px monospace;';
  box.textContent = 'Erreur JS: ' + event.message;
  document.body.appendChild(box);
});
try {
${safeJs}
} catch (error) {
  var errorBox = document.createElement('pre');
  errorBox.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:9999;padding:12px;border-radius:12px;background:#7f1d1d;color:white;white-space:pre-wrap;font:14px monospace;';
  errorBox.textContent = 'Erreur JS: ' + error.message;
  document.body.appendChild(errorBox);
}
<\/script>
</body>
</html>`;
  }

  function renderPreview() {
    const project = projectById(state.currentId);
    refs.previewFrame.srcdoc = composePreview(project, currentProgress());
  }

  function renderFeedback(messages, type) {
    refs.feedbackCard.classList.toggle('is-ok', type === 'ok');
    refs.feedbackCard.classList.toggle('is-error', type === 'error');
    if (!messages || messages.length === 0) {
      refs.feedbackList.textContent = 'Aucun message.';
      return;
    }
    if (messages.length === 1) {
      refs.feedbackList.textContent = messages[0];
      return;
    }
    refs.feedbackList.innerHTML = `<ul>${messages.map((message) => `<li>${escapeHtml(message)}</li>`).join('')}</ul>`;
  }

  function updateCurrentCodeFromEditors() {
    const project = projectById(state.currentId);
    const progress = currentProgress();
    if (canEditHtml(project)) progress.htmlCode = getEditorValue('html');
    if (canEditJs(project)) progress.jsCode = getEditorValue('js');
    progress.updatedAt = new Date().toISOString();
  }

  function markSaveState(label) {
    refs.saveState.textContent = label;
  }

  function scheduleSave() {
    updateCurrentCodeFromEditors();
    saveLocalState();
    renderPreview();
    markSaveState('Local...');
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => scheduleServerSave(state.currentId), SAVE_DELAY);
  }

  async function scheduleServerSave(projectId, silent) {
    if (!state.canUseServer) return;
    const progress = state.progress[projectId];
    try {
      await api('/api/preparation/progress', {
        method: 'POST',
        body: JSON.stringify(progress)
      });
      markSaveState('Serveur');
    } catch (error) {
      state.canUseServer = error.status !== 401 && error.status !== 403 ? state.canUseServer : false;
      markSaveState('Local');
      if (!silent) showToast(error.message || 'Sauvegarde serveur impossible pour le moment.');
    }
  }

  function hasExactClass(doc, className) {
    return Array.from(doc.querySelectorAll('[class]')).some((el) =>
      Array.from(el.classList).includes(className)
    );
  }

  function similarClassHints(doc, className) {
    const target = className.toLowerCase();
    return Array.from(doc.querySelectorAll('[class]'))
      .flatMap((el) => Array.from(el.classList))
      .filter((name) => name.toLowerCase() === target && name !== className);
  }

  function validateHtml(project, htmlCode) {
    const rules = project.validation || {};
    const doc = new DOMParser().parseFromString(`<main>${htmlCode || ''}</main>`, 'text/html');
    const errors = [];

    for (const tag of rules.tags || []) {
      if (!doc.getElementsByTagName(tag).length) {
        errors.push(`La balise <${tag}> est attendue.`);
      }
    }

    for (const className of rules.classes || []) {
      if (!hasExactClass(doc, className)) {
        const hints = similarClassHints(doc, className);
        const targetTag = rules.classMap && rules.classMap[className];
        if (targetTag && doc.getElementsByTagName(targetTag).length) {
          errors.push(`Ta balise <${targetTag}> existe, mais il manque class="${className}".`);
        } else if (hints.length) {
          errors.push(`La classe "${className}" existe presque, mais tu as ecrit "${hints[0]}". Attention aux majuscules/minuscules.`);
        } else {
          errors.push(`La classe "${className}" est introuvable.`);
        }
      }
    }

    for (const type of rules.inputTypes || []) {
      if (!doc.querySelector(`input[type="${type}"]`)) {
        errors.push(`Ajoute un <input type="${type}">.`);
      }
    }

    for (const attr of rules.dataAttrs || []) {
      if (!doc.querySelector(`[data-${attr}]`)) {
        errors.push(`L attribut data-${attr} est attendu.`);
      }
    }

    for (const rule of rules.minElements || []) {
      const count = doc.querySelectorAll(rule.selector).length;
      if (count < Number(rule.count || 0)) {
        errors.push(rule.message || `Il manque des elements ${rule.selector}.`);
      }
    }

    return errors;
  }

  function validateJsNames(project, jsCode) {
    const errors = [];
    const names = (project.validation || {}).jsNames || [];
    for (const name of names) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`\\b(function\\s+${escaped}|const\\s+${escaped}|let\\s+${escaped}|var\\s+${escaped}|${escaped}\\s*=\\s*(function|\\([^)]*\\)\\s*=>))\\b`);
      if (!pattern.test(jsCode || '')) {
        errors.push(`Le JavaScript doit contenir le nom "${name}".`);
      }
    }
    return errors;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function validateBehavior(project, progress) {
    const behavior = (project.validation || {}).behavior;
    if (!behavior) return [];

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:absolute;width:1px;height:1px;left:-9999px;top:-9999px;';
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
    document.body.appendChild(iframe);

    try {
      iframe.srcdoc = composePreview(project, progress);
      await new Promise((resolve) => {
        iframe.onload = resolve;
        setTimeout(resolve, 900);
      });
      await wait(120);

      const doc = iframe.contentDocument;
      const errors = [];

      if (behavior === 'counter') {
        const button = doc.getElementById('incrementBtn');
        const value = doc.getElementById('countValue');
        if (!button || !value) errors.push('Le bouton #incrementBtn et le compteur #countValue doivent exister.');
        if (!errors.length) {
          button.click();
          await wait(80);
          if (Number(value.textContent.trim()) !== 1) errors.push('Quand on clique sur Ajouter +1, #countValue doit passer a 1.');
        }
      }

      if (behavior === 'quiz') {
        const button = doc.querySelector('.answer[data-correct="true"]');
        const feedback = doc.getElementById('quizFeedback');
        const score = doc.getElementById('quizScore');
        if (!button || !feedback || !score) errors.push('Le quiz doit garder .answer, #quizFeedback et #quizScore.');
        if (!errors.length) {
          button.click();
          await wait(80);
          if (!feedback.textContent.trim() || !/\d+/.test(score.textContent)) {
            errors.push('Apres une bonne reponse, le feedback et le score doivent etre mis a jour.');
          }
        }
      }

      if (behavior === 'todo') {
        const input = doc.getElementById('todoInput');
        const button = doc.getElementById('addTodoBtn');
        const list = doc.getElementById('todoList');
        if (!input || !button || !list) errors.push('La todo list doit garder #todoInput, #addTodoBtn et #todoList.');
        if (!errors.length) {
          input.value = 'Reviser HTML';
          button.click();
          await wait(80);
          if (!list.querySelector('li') || !list.textContent.includes('Reviser HTML')) {
            errors.push('Quand on ajoute une tache, un <li> doit apparaitre dans #todoList.');
          }
        }
      }

      if (behavior === 'calculator') {
        const a = doc.getElementById('numberA');
        const b = doc.getElementById('numberB');
        const plus = doc.querySelector('[data-op="+"]');
        const result = doc.getElementById('calcResult');
        if (!a || !b || !plus || !result) errors.push('La calculatrice doit garder #numberA, #numberB, [data-op="+"] et #calcResult.');
        if (!errors.length) {
          a.value = '2';
          b.value = '5';
          plus.click();
          await wait(80);
          if (!result.textContent.includes('7')) errors.push('2 + 5 doit afficher 7 dans #calcResult.');
        }
      }

      if (behavior === 'rps') {
        const buttons = doc.querySelectorAll('.choice-btn');
        const playerScore = doc.getElementById('playerScore');
        const botScore = doc.getElementById('botScore');
        const message = doc.getElementById('resultMessage');
        const resetBtn = doc.getElementById('resetBtn');
        if (buttons.length < 3 || !playerScore || !botScore || !message || !resetBtn) {
          errors.push('Le jeu doit avoir 3 .choice-btn, #playerScore, #botScore, #resultMessage et #resetBtn.');
        }
        if (!errors.length) {
          buttons[0].click();
          await wait(120);
          const scoresAreNumbers = /^\d+$/.test(playerScore.textContent.trim()) && /^\d+$/.test(botScore.textContent.trim());
          if (!message.textContent.trim() || !scoresAreNumbers) {
            errors.push('Apres un choix, le message et les scores numeriques doivent etre visibles.');
          }
        }
      }

      return errors;
    } catch (error) {
      return [`Le comportement JS n a pas pu etre teste: ${error.message}`];
    } finally {
      iframe.remove();
    }
  }

  async function validateCurrentProject() {
    const project = projectById(state.currentId);
    const progress = currentProgress();
    updateCurrentCodeFromEditors();
    progress.attempts = Number(progress.attempts || 0) + 1;
    progress.updatedAt = new Date().toISOString();

    let errors = [];
    if (project.mode === 'html' || project.mode === 'final') {
      errors = errors.concat(validateHtml(project, progress.htmlCode));
    }
    if (project.mode === 'js' || project.mode === 'final') {
      errors = errors.concat(validateJsNames(project, progress.jsCode));
      errors = errors.concat(await validateBehavior(project, progress));
    }

    if (errors.length) {
      refs.solutionBtn.classList.toggle('is-hidden', progress.attempts < 2);
      renderFeedback(errors, 'error');
      saveLocalState();
      scheduleServerSave(project.id, true);
      showToast(progress.attempts >= 2 ? 'La solution est maintenant disponible, mais reecris-la a la main.' : 'Encore un petit ajustement. Le feedback te dit quoi corriger.');
      return;
    }

    try {
      const data = await api('/api/preparation/validate', {
        method: 'POST',
        body: JSON.stringify(progress)
      });
      progress.completed = true;
      progress.projectXp = Math.max(Number(progress.projectXp || 0), Number(data.projectXp || 0));
      if (data.progress) state.progress[project.id] = { ...progress, ...data.progress };
      if (data.profile) state.profile = data.profile;
      if (data.leaderboard) state.leaderboard = data.leaderboard;
      saveLocalState();
      renderFeedback([`Projet valide. XP gagnes: ${data.projectXp || progress.projectXp}.`], 'ok');
      showToast('Projet valide. La prochaine etape est deverrouillee.');
      renderAll();
    } catch (error) {
      const serverErrors = error.data && error.data.errors ? error.data.errors : [error.message || 'Validation serveur refusee.'];
      renderFeedback(serverErrors, 'error');
      showToast('La validation locale passe, mais le serveur demande une correction.');
    }
  }

  function getQuizQuestions(project) {
    const bank = state.quizBank[project.id];
    if (bank && bank.length) return bank;
    return (project.quiz || []).map((item) => ({
      type: 'single',
      prompt: item.question,
      options: item.options,
      answer: item.answer,
      explanation: item.explanation
    }));
  }

  function quizScore(projectId) {
    const answers = state.quizAnswers[projectId] || {};
    return Object.values(answers).filter((entry) => entry && entry.correct).length;
  }

  function quizAnsweredCount(projectId) {
    const answers = state.quizAnswers[projectId] || {};
    return Object.values(answers).filter((entry) => entry && entry.answered).length;
  }

  function renderQuiz(project) {
    const progress = state.progress[project.id];
    const quiz = getQuizQuestions(project);

    if (!quiz.length) {
      refs.quizContent.innerHTML = '<p>Quiz indisponible pour ce projet.</p>';
      return;
    }

    if (!progress.completed) {
      refs.quizContent.innerHTML = '<p>Valide le projet pour debloquer le quiz bonus. Il n est pas obligatoire, mais il rapporte des XP.</p>';
      return;
    }

    if (progress.quizCompleted) {
      refs.quizContent.innerHTML = `
        <div class="lesson-block">
          <h3>Quiz deja valide</h3>
          <p>Score: ${progress.quizScore}/${quiz.length}. XP quiz: ${progress.quizXp}.</p>
        </div>
      `;
      return;
    }

    state.quizAnswers[project.id] = state.quizAnswers[project.id] || {};
    const currentScore = quizScore(project.id);
    refs.quizContent.innerHTML = `
      <div class="quiz-score">Score: <strong>${currentScore}</strong> / ${quiz.length}</div>
      ${quiz.map((item, index) => {
        if (item.type === 'multi') {
          return `
            <article class="quiz-question" data-quiz-index="${index}" data-quiz-type="multi">
              <strong>${index + 1}. ${escapeHtml(item.prompt)}</strong>
              <div class="quiz-options">
                ${item.options.map((option, optionIndex) => `
                  <label class="quiz-check">
                    <input type="checkbox" data-quiz-index="${index}" data-option-index="${optionIndex}">
                    <span>${escapeHtml(option)}</span>
                  </label>
                `).join('')}
              </div>
              <button class="mini-button" data-quiz-action="check-multi" data-quiz-index="${index}" type="button">Verifier</button>
              <p class="quiz-explanation is-hidden" data-explanation="${index}">${escapeHtml(item.explanation || '')}</p>
            </article>
          `;
        }

        if (item.type === 'short') {
          return `
            <article class="quiz-question" data-quiz-index="${index}" data-quiz-type="short">
              <strong>${index + 1}. ${escapeHtml(item.prompt)}</strong>
              <div class="quiz-short">
                <input class="quiz-input" data-quiz-index="${index}" type="text" placeholder="Ta reponse">
                <button class="mini-button" data-quiz-action="check-short" data-quiz-index="${index}" type="button">Verifier</button>
              </div>
              <p class="quiz-explanation is-hidden" data-explanation="${index}">${escapeHtml(item.explanation || '')}</p>
            </article>
          `;
        }

        const options = item.type === 'tf' ? ['Vrai', 'Faux'] : item.options || [];
        return `
          <article class="quiz-question" data-quiz-index="${index}" data-quiz-type="${item.type || 'single'}">
            <strong>${index + 1}. ${escapeHtml(item.prompt)}</strong>
            <div class="quiz-options">
              ${options.map((option, optionIndex) => `
                <button class="quiz-option" data-quiz-action="pick" data-quiz-index="${index}" data-option-index="${optionIndex}" type="button">${escapeHtml(option)}</button>
              `).join('')}
            </div>
            <p class="quiz-explanation is-hidden" data-explanation="${index}">${escapeHtml(item.explanation || '')}</p>
          </article>
        `;
      }).join('')}
    `;
  }

  function normalizeAnswer(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[\s\t\n]+/g, ' ')
      .replace(/[^a-z0-9 \-]/g, '')
      .trim();
  }

  function markQuizAnswer(projectId, index, correct) {
    state.quizAnswers[projectId] = state.quizAnswers[projectId] || {};
    state.quizAnswers[projectId][index] = { answered: true, correct: !!correct };
    const progress = state.progress[projectId];
    progress.quizScore = quizScore(projectId);
    progress.updatedAt = new Date().toISOString();
    saveLocalState();
  }

  function updateQuizScoreDisplay(projectId, total) {
    const scoreEl = refs.quizContent.querySelector('.quiz-score strong');
    if (scoreEl) scoreEl.textContent = `${quizScore(projectId)}`;
    const totalEl = refs.quizContent.querySelector('.quiz-score');
    if (totalEl && total) totalEl.dataset.total = total;
  }

  async function finalizeQuizIfDone(project, quiz) {
    const progress = currentProgress();
    const answered = quizAnsweredCount(project.id);
    if (answered < quiz.length) return;

    const score = quizScore(project.id);
    progress.quizCompleted = true;
    progress.quizScore = score;
    progress.quizXp = Math.max(progress.quizXp || 0, score * 4);
    progress.updatedAt = new Date().toISOString();
    saveLocalState();

    if (!state.canUseServer) {
      renderAll();
      return;
    }
    try {
      const data = await api('/api/preparation/quiz', {
        method: 'POST',
        body: JSON.stringify({
          projectId: project.id,
          score,
          total: quiz.length
        })
      });
      progress.quizXp = Math.max(progress.quizXp || 0, data.quizXp || 0);
      if (data.progress) state.progress[project.id] = { ...progress, ...data.progress };
      if (data.profile) state.profile = data.profile;
      if (data.leaderboard) state.leaderboard = data.leaderboard;
      saveLocalState();
    } catch {
      // Ignore quiz server failure, local progress already saved.
    } finally {
      renderAll();
    }
  }

  function renderLeaderboard() {
    if (!refs.leaderboard) return;
    if (!state.leaderboard || !state.leaderboard.length) {
      refs.leaderboard.innerHTML = '<p>Le classement apparaitra quand les participants auront valide des projets.</p>';
      return;
    }
    refs.leaderboard.innerHTML = state.leaderboard.map((row) => `
      <div class="leader-row">
        <strong>#${row.rank}</strong>
        <span>${escapeHtml(row.name)}</span>
        <span>${row.xp} XP</span>
        <span>${row.projectsCompleted}/10 projets</span>
      </div>
    `).join('');
  }

  async function refreshLeaderboard() {
    if (!state.canUseServer) return;
    try {
      const data = await api('/api/preparation/leaderboard');
      state.leaderboard = data.leaderboard || [];
      renderLeaderboard();
    } catch {
      // Le classement n'est pas critique pour continuer a coder.
    }
  }

  function renderBadgesInLesson() {
    const badges = buildBadges();
    if (!badges.length) return;
    refs.lessonContent.querySelectorAll('.lesson-block.badges').forEach((node) => node.remove());
    const box = document.createElement('article');
    box.className = 'lesson-block badges';
    box.innerHTML = `<h3>Badges obtenus</h3><div class="badge-list">${badges.map((badge) => `<span class="badge">${escapeHtml(badge)}</span>`).join('')}</div>`;
    refs.lessonContent.appendChild(box);
  }

  function renderAll() {
    renderProject();
    renderLeaderboard();
    renderBadgesInLesson();
    if (refs.progressModal && !refs.progressModal.classList.contains('is-hidden')) renderProgressModal();
  }

  function showHint() {
    const project = projectById(state.currentId);
    const progress = currentProgress();
    const lesson = project.lesson || {};
    const hints = (lesson.hints && lesson.hints.length ? lesson.hints : null)
      || (project.hints && project.hints.length ? project.hints : null)
      || (project.memos && project.memos.length ? project.memos : []);
    const level = Number(progress.hintLevel || 0);
    const safeLevel = hints.length ? Math.min(level, hints.length - 1) : 0;
    const hint = hints[safeLevel] || 'Relis la checklist: elle contient les noms exacts attendus.';
    progress.usedHint = true;
    progress.hintLevel = hints.length ? Math.min(level + 1, hints.length - 1) : level;
    progress.updatedAt = new Date().toISOString();
    saveLocalState();
    scheduleServerSave(project.id, true);
    renderFeedback([`Indice ${Math.min(level + 1, Math.max(hints.length, 1))}: ${hint}`], 'neutral');
    showToast('Indice utilise. Tu peux continuer, avec un petit bonus XP en moins.');
  }

  function showSolution() {
    const project = projectById(state.currentId);
    const progress = currentProgress();
    if (progress.attempts < 2) {
      showToast('La solution se debloque apres au moins deux echecs.');
      return;
    }
    progress.usedSolution = true;
    progress.updatedAt = new Date().toISOString();
    saveLocalState();
    scheduleServerSave(project.id, true);
    const htmlSolution = project.solutionHtml ? `HTML\n${project.solutionHtml}` : '';
    const jsSolution = project.solutionJs ? `\n\nJavaScript\n${project.solutionJs}` : '';
    refs.solutionContent.textContent = `${htmlSolution}${jsSolution}`.trim();
    refs.solutionModal.classList.remove('is-hidden');
  }

  function appendAiMessage(text, isUser) {
    if (!refs.aiMessages) return;
    const item = document.createElement('div');
    item.className = `ai-message ${isUser ? 'is-user' : ''}`.trim();
    item.textContent = text;
    refs.aiMessages.appendChild(item);
    refs.aiMessages.scrollTop = refs.aiMessages.scrollHeight;
  }

  function buildAiSystemPrompt(project, stepText) {
    return `Tu es RD-AI, assistant pedagogique pour un atelier HTML/JavaScript.

REGLES STRICTES:
- Donne uniquement des indices textuels, jamais de code.
- Pas de blocs de code, pas de pseudo-code, pas de balises HTML a recopier.
- 2 a 4 phrases courtes, claires, concretes.
- Explique la notion utile, sans donner la solution.
- Encourage l etudiant a tester et verifier.

CONTEXTE:
- Projet: ${project.title}
- Track: ${project.track}
- Etape: ${stepText}`;
  }

  function wrapAiUserPrompt(question, project, stepText) {
    return `Contexte: Projet ${project.title} (${project.track}). Etape: ${stepText}.
Question de l etudiant: ${question}
Reponds uniquement avec des indices textuels, sans code.`;
  }

  function stripAiCode(text) {
    return String(text || '')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`[^`]*`/g, '')
      .split('\n')
      .filter((line) => !(/[{};]|=>|\b(const|let|var|function|document|querySelector|addEventListener|getElementById)\b/i.test(line)))
      .join(' ')
      .replace(/[<>]/g, '')
      .trim();
  }

  async function sendAiHint() {
    if (!refs.aiInput || state.aiBusy) return;
    const question = refs.aiInput.value.trim();
    if (!question) {
      showToast('Explique ta difficulte pour obtenir un indice.');
      return;
    }

    const project = projectById(state.currentId);
    const steps = lessonSteps(project);
    const stepIndex = clampStepIndex(project, currentProgress());
    const stepText = steps[stepIndex] || '';

    appendAiMessage(question, true);
    refs.aiInput.value = '';
    state.aiBusy = true;

    try {
      const payload = {
        messages: [
          { role: 'system', content: buildAiSystemPrompt(project, stepText) },
          { role: 'user', content: wrapAiUserPrompt(question, project, stepText) }
        ],
        temperature: 0.5,
        max_tokens: 180
      };
      console.log('[AI Debug] Request to /api/ai-chat:', payload);
      const data = await api('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      console.log('[AI Debug] Response from /api/ai-chat:', data);
      const raw = data && data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : 'Je suis la pour t aider. Dis-moi ou ca bloque.';
      appendAiMessage(stripAiCode(raw) || 'Je suis la pour t aider. Dis-moi ou ca bloque.', false);
    } catch (error) {
      console.log('[AI Debug] Error during fetch:', error);
      appendAiMessage('Service IA indisponible pour le moment. Utilise le bouton Indice ou relis le mini-cours.', false);
    } finally {
      state.aiBusy = false;
    }
  }

  function resetCurrentProject() {
    const project = projectById(state.currentId);
    const progress = currentProgress();
    if (!confirm('Reinitialiser le code du projet actuel ? La progression deja validee reste conservee.')) return;
    progress.htmlCode = project.starterHtml || '';
    progress.jsCode = project.starterJs || '';
    progress.updatedAt = new Date().toISOString();
    saveLocalState();
    scheduleServerSave(project.id, true);
    renderProject();
    showToast('Code du projet reinitialise.');
  }

  const AUTOCOMPLETE = {
    html: [
      '<section class="">',
      '<article class="">',
      '<div class="">',
      '<img class="" src="" alt="">',
      '<h1></h1>',
      '<p></p>',
      '<ul>\n  <li></li>\n</ul>',
      '<button></button>',
      '<a href=""></a>'
    ],
    js: [
      'const ',
      'let ',
      'function name() {\n  \n}',
      'document.getElementById(\'\')',
      'document.querySelector(\'\')',
      "addEventListener('click', () => {\n  \n});",
      'textContent = ',
      'Number()'
    ]
  };

  function hideAutocomplete() {
    if (!refs.autocompleteBox) return;
    refs.autocompleteBox.classList.add('is-hidden');
    refs.autocompleteBox.innerHTML = '';
  }

  function insertAtCursor(editor, text) {
    if (editor && typeof editor.replaceSelection === 'function') {
      editor.replaceSelection(text, 'end');
      editor.focus();
      scheduleSave();
      return;
    }
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = editor.value.slice(0, start) + text + editor.value.slice(end);
    const nextPos = start + text.length;
    editor.selectionStart = editor.selectionEnd = nextPos;
    editor.focus();
    scheduleSave();
  }

  function showAutocomplete(editor, type) {
    if (!refs.autocompleteBox || !editor) return;
    const isReadOnly = typeof editor.getOption === 'function'
      ? !!editor.getOption('readOnly')
      : !!editor.readOnly;
    if (isReadOnly) {
      showToast('Autocompletion disponible uniquement sur un fichier editable.');
      return;
    }
    const items = AUTOCOMPLETE[type] || [];
    if (!items.length) return;

    refs.autocompleteBox.innerHTML = items.map((item) => (
      `<button class="autocomplete-item" type="button">${escapeHtml(item)}</button>`
    )).join('');

    refs.autocompleteBox.classList.remove('is-hidden');
    Array.from(refs.autocompleteBox.querySelectorAll('button')).forEach((button, index) => {
      button.addEventListener('click', () => {
        insertAtCursor(editor, items[index]);
        hideAutocomplete();
      });
    });
  }

  const VOID_TAGS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  function cloneEmmetNode(node) {
    return {
      tag: node.tag,
      id: node.id,
      classes: node.classes.slice(),
      children: []
    };
  }

  function parseEmmetElement(token) {
    const raw = String(token || '').trim();
    if (!raw) return null;
    let tag = 'div';
    let rest = raw;
    const tagMatch = raw.match(/^([a-zA-Z][\w-]*)/);
    if (tagMatch) {
      tag = tagMatch[1];
      rest = raw.slice(tag.length);
    }
    const classes = [];
    let id = '';
    const matcher = /([.#])([\w-]+)/g;
    let match;
    while ((match = matcher.exec(rest))) {
      if (match[1] === '#') {
        if (!id) id = match[2];
      } else {
        classes.push(match[2]);
      }
    }
    return { tag, id, classes, children: [] };
  }

  function splitEmmet(str, delimiter) {
    const parts = [];
    let buffer = '';
    let depth = 0;
    for (const char of String(str || '')) {
      if (char === '(') depth += 1;
      if (char === ')') depth = Math.max(depth - 1, 0);
      if (char === delimiter && depth === 0) {
        parts.push(buffer);
        buffer = '';
      } else {
        buffer += char;
      }
    }
    if (buffer) parts.push(buffer);
    return parts;
  }

  function buildEmmetTree(abbreviation) {
    const segments = splitEmmet(abbreviation, '+');
    const roots = [];

    segments.forEach((segment) => {
      const chain = splitEmmet(segment, '>').filter(Boolean);
      let currentParents = [];
      let segmentRoots = [];

      chain.forEach((part) => {
        const match = part.match(/^(.*?)(?:\*(\d+))?$/);
        const token = match ? match[1] : part;
        const multiplier = match && match[2] ? Number(match[2]) : 1;
        const template = parseEmmetElement(token);
        if (!template) return;

        const nodes = Array.from({ length: Math.max(multiplier, 1) }, () => cloneEmmetNode(template));
        if (!segmentRoots.length) {
          segmentRoots = nodes;
          currentParents = nodes;
        } else {
          const nextParents = [];
          currentParents.forEach((parent) => {
            nodes.forEach((node) => {
              const child = cloneEmmetNode(node);
              parent.children.push(child);
              nextParents.push(child);
            });
          });
          currentParents = nextParents;
        }
      });

      roots.push(...segmentRoots);
    });

    return roots;
  }

  function renderEmmetNode(node) {
    const attrs = [];
    if (node.id) attrs.push(`id="${node.id}"`);
    if (node.classes && node.classes.length) attrs.push(`class="${node.classes.join(' ')}"`);
    const attrText = attrs.length ? ` ${attrs.join(' ')}` : '';
    if (VOID_TAGS.includes(node.tag)) {
      return `<${node.tag}${attrText}>`;
    }
    if (!node.children || !node.children.length) {
      return `<${node.tag}${attrText}></${node.tag}>`;
    }
    const inner = node.children.map(renderEmmetNode).join('');
    return `<${node.tag}${attrText}>${inner}</${node.tag}>`;
  }

  function expandEmmetLite(abbreviation) {
    if (!abbreviation) return '';
    const roots = buildEmmetTree(abbreviation);
    if (!roots.length) return '';
    return roots.map(renderEmmetNode).join('');
  }

  function expandEmmetAbbreviation(abbreviation, type) {
    const emmet = window.emmet;
    if (emmet) {
      try {
        if (typeof emmet.expandAbbreviation === 'function') {
          return emmet.expandAbbreviation(abbreviation, { type: type === 'css' ? 'stylesheet' : 'markup' });
        }
        if (typeof emmet.expand === 'function') {
          return emmet.expand(abbreviation);
        }
        if (emmet.default && typeof emmet.default === 'function') {
          return emmet.default(abbreviation);
        }
      } catch {
        // Fall back to the lite expansion below.
      }
    }
    return expandEmmetLite(abbreviation);
  }

  function findEmmetAbbreviation(cm) {
    const cursor = cm.getCursor();
    const line = cm.getLine(cursor.line);
    const before = line.slice(0, cursor.ch);
    const match = before.match(/([^\s<>]+)$/);
    if (!match) return null;
    const abbreviation = match[1];
    if (!abbreviation || abbreviation.includes('<') || abbreviation.includes('=')) return null;
    return {
      abbreviation,
      from: { line: cursor.line, ch: cursor.ch - abbreviation.length },
      to: cursor
    };
  }

  function findEmmetAbbreviationInText(value, cursorIndex) {
    const before = String(value || '').slice(0, cursorIndex);
    const match = before.match(/([^\s<>]+)$/);
    if (!match) return null;
    const abbreviation = match[1];
    if (!abbreviation || abbreviation.includes('<') || abbreviation.includes('=')) return null;
    return {
      abbreviation,
      start: cursorIndex - abbreviation.length,
      end: cursorIndex
    };
  }

  function tryEmmetExpandTextarea(editor) {
    const found = findEmmetAbbreviationInText(editor.value, editor.selectionStart || 0);
    if (!found) return false;
    const expanded = expandEmmetAbbreviation(found.abbreviation, 'html');
    if (!expanded) return false;
    editor.setRangeText(expanded, found.start, found.end, 'end');
    return true;
  }

  function tryEmmetExpand(cm, type) {
    const found = findEmmetAbbreviation(cm);
    if (!found) return false;
    const expanded = expandEmmetAbbreviation(found.abbreviation, type);
    if (!expanded) return false;
    cm.replaceRange(expanded, found.from, found.to, 'emmet');
    return true;
  }

  function autoCloseTag(editor) {
    const pos = editor.selectionStart;
    const before = editor.value.slice(0, pos);
    if (before.endsWith('/>')) return;
    const match = before.match(/<([a-zA-Z][\w-]*)[^<>]*>$/);
    if (!match) return;
    const tag = match[1].toLowerCase();
    if (VOID_TAGS.includes(tag)) return;
    const closing = `</${tag}>`;
    editor.value = editor.value.slice(0, pos) + closing + editor.value.slice(pos);
    editor.selectionStart = editor.selectionEnd = pos;
  }

  function wireEditorEvents() {
    if (editorState.html || editorState.js) {
      if (editorState.html) {
        editorState.html.on('change', scheduleSave);
        editorState.html.on('copy', (cm, event) => {
          if (cm.getOption('readOnly')) {
            event.preventDefault();
            showToast('Copie bloquee pour ce fichier verrouille.');
          }
        });
        editorState.html.on('keydown', (cm, event) => {
          if (event.key === 'Tab') {
            event.preventDefault();
            if (!tryEmmetExpand(cm, 'html')) {
              cm.replaceSelection('  ', 'end');
            }
            return;
          }
          if ((event.ctrlKey || event.metaKey) && (event.code === 'Space' || event.key === ' ')) {
            event.preventDefault();
            showAutocomplete(cm, 'html');
          }
          if (event.key === 'Escape') hideAutocomplete();
        });
      }
      if (editorState.js) {
        editorState.js.on('change', scheduleSave);
        editorState.js.on('copy', (cm, event) => {
          if (cm.getOption('readOnly')) {
            event.preventDefault();
            showToast('Copie bloquee pour ce fichier verrouille.');
          }
        });
        editorState.js.on('keydown', (cm, event) => {
          if (event.key === 'Tab') {
            event.preventDefault();
            cm.replaceSelection('  ', 'end');
            return;
          }
          if ((event.ctrlKey || event.metaKey) && (event.code === 'Space' || event.key === ' ')) {
            event.preventDefault();
            showAutocomplete(cm, 'js');
          }
          if (event.key === 'Escape') hideAutocomplete();
        });
      }
      if (editorState.css) {
        editorState.css.on('copy', (cm, event) => {
          event.preventDefault();
          showToast('Copie bloquee pour le CSS fourni.');
        });
      }
      return;
    }

    [refs.htmlEditor, refs.jsEditor].forEach((editor) => {
      editor.addEventListener('input', scheduleSave);
      editor.addEventListener('copy', (event) => {
        if (editor.readOnly) {
          event.preventDefault();
          showToast('Copie bloquee pour ce fichier verrouille.');
        }
      });
      editor.addEventListener('keydown', (event) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          if (editor === refs.htmlEditor && tryEmmetExpandTextarea(editor)) {
            scheduleSave();
            return;
          }
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.value = editor.value.slice(0, start) + '  ' + editor.value.slice(end);
          editor.selectionStart = editor.selectionEnd = start + 2;
          scheduleSave();
        }
        if (event.ctrlKey && event.code === 'Space') {
          event.preventDefault();
          showAutocomplete(editor, editor === refs.htmlEditor ? 'html' : 'js');
        }
        if (event.key === 'Escape') {
          hideAutocomplete();
        }
        if (editor === refs.htmlEditor && event.key === '>' && !event.ctrlKey && !event.metaKey && !event.altKey) {
          setTimeout(() => autoCloseTag(editor), 0);
        }
      });
    });

    if (refs.cssEditor) {
      refs.cssEditor.addEventListener('copy', (event) => {
        event.preventDefault();
        showToast('Copie bloquee pour le CSS fourni.');
      });
    }
  }

  function wireEvents() {
    refs.projectList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-project-id]');
      if (!button) return;
      const id = Number(button.dataset.projectId);
      if (!completedBefore(id)) {
        showToast('Chronologie obligatoire: termine les projets precedents avant celui-ci.');
        return;
      }
      state.currentId = id;
      saveLocalState();
      renderAll();
    });

    document.querySelectorAll('.tab').forEach((button) => {
      button.addEventListener('click', () => renderEditorTab(button.dataset.editorTab));
    });

    wireEditorEvents();

    $('#validateBtn').addEventListener('click', validateCurrentProject);
    $('#refreshPreview').addEventListener('click', renderPreview);
    $('#hintBtn').addEventListener('click', showHint);
    $('#solutionBtn').addEventListener('click', showSolution);
    $('#closeSolution').addEventListener('click', () => refs.solutionModal.classList.add('is-hidden'));
    $('#resetBtn').addEventListener('click', resetCurrentProject);
    $('#toggleRail').addEventListener('click', () => refs.shell.classList.toggle('rail-collapsed'));
    $('#toggleLesson').addEventListener('click', () => refs.workspace.classList.toggle('lesson-collapsed'));
    $('#collapseLesson').addEventListener('click', () => refs.workspace.classList.add('lesson-collapsed'));

    if (refs.prevStep) refs.prevStep.addEventListener('click', () => changeLessonStep(-1));
    if (refs.nextStep) refs.nextStep.addEventListener('click', () => changeLessonStep(1));
    if (refs.progressTrigger) refs.progressTrigger.addEventListener('click', openProgressModal);
    if (refs.closeProgress) refs.closeProgress.addEventListener('click', closeProgressModal);
    if (refs.progressModal) {
      refs.progressModal.addEventListener('click', (event) => {
        if (event.target === refs.progressModal) closeProgressModal();
      });
    }
    if (refs.toggleFocus) refs.toggleFocus.addEventListener('click', () => setFocusMode(!state.focusMode));
    if (refs.cssToggle) refs.cssToggle.addEventListener('change', (event) => setPreviewCss(event.target.checked));

    if (refs.aiFab) refs.aiFab.addEventListener('click', () => refs.aiPanel.classList.toggle('is-hidden'));
    if (refs.aiClose) refs.aiClose.addEventListener('click', () => refs.aiPanel.classList.add('is-hidden'));
    if (refs.aiSend) refs.aiSend.addEventListener('click', sendAiHint);
    if (refs.aiInput) {
      refs.aiInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          sendAiHint();
        }
      });
    }

    document.addEventListener('click', (event) => {
      if (!refs.autocompleteBox || refs.autocompleteBox.classList.contains('is-hidden')) return;
      if (!refs.autocompleteBox.contains(event.target)) {
        hideAutocomplete();
      }
    });

    refs.quizContent.addEventListener('click', (event) => {
      const project = projectById(state.currentId);
      const quiz = getQuizQuestions(project);
      const action = event.target.dataset.quizAction;

      if (action === 'pick') {
        const qIndex = Number(event.target.dataset.quizIndex);
        const optionIndex = Number(event.target.dataset.optionIndex);
        const answered = state.quizAnswers[project.id] && state.quizAnswers[project.id][qIndex] && state.quizAnswers[project.id][qIndex].answered;
        if (answered) return;
        const question = quiz[qIndex];
        const correct = Number(question.answer) === optionIndex;
        markQuizAnswer(project.id, qIndex, correct);
        const card = event.target.closest('.quiz-question');
        card.querySelectorAll('.quiz-option').forEach((btn, idx) => {
          btn.classList.toggle('is-selected', idx === optionIndex);
          btn.disabled = true;
          if (Number(question.answer) === idx) btn.classList.add('is-correct');
          if (idx === optionIndex && !correct) btn.classList.add('is-wrong');
        });
        const explanation = card.querySelector('[data-explanation]');
        if (explanation) explanation.classList.remove('is-hidden');
        updateQuizScoreDisplay(project.id, quiz.length);
        finalizeQuizIfDone(project, quiz);
        return;
      }

      if (action === 'check-multi') {
        const qIndex = Number(event.target.dataset.quizIndex);
        const answered = state.quizAnswers[project.id] && state.quizAnswers[project.id][qIndex] && state.quizAnswers[project.id][qIndex].answered;
        if (answered) return;
        const question = quiz[qIndex];
        const card = event.target.closest('.quiz-question');
        const checked = Array.from(card.querySelectorAll('input[type="checkbox"]'))
          .filter((input) => input.checked)
          .map((input) => Number(input.dataset.optionIndex));
        const expected = (question.answers || []).map(Number).sort();
        const got = checked.sort();
        const correct = expected.length === got.length && expected.every((val, idx) => val === got[idx]);
        markQuizAnswer(project.id, qIndex, correct);
        card.querySelectorAll('input[type="checkbox"]').forEach((input) => {
          input.disabled = true;
        });
        const explanation = card.querySelector('[data-explanation]');
        if (explanation) explanation.classList.remove('is-hidden');
        updateQuizScoreDisplay(project.id, quiz.length);
        finalizeQuizIfDone(project, quiz);
        return;
      }

      if (action === 'check-short') {
        const qIndex = Number(event.target.dataset.quizIndex);
        const answered = state.quizAnswers[project.id] && state.quizAnswers[project.id][qIndex] && state.quizAnswers[project.id][qIndex].answered;
        if (answered) return;
        const question = quiz[qIndex];
        const card = event.target.closest('.quiz-question');
        const input = card.querySelector('.quiz-input');
        const value = normalizeAnswer(input ? input.value : '');
        const valid = (question.answers || []).map(normalizeAnswer).includes(value);
        markQuizAnswer(project.id, qIndex, valid);
        if (input) input.disabled = true;
        event.target.disabled = true;
        const explanation = card.querySelector('[data-explanation]');
        if (explanation) explanation.classList.remove('is-hidden');
        updateQuizScoreDisplay(project.id, quiz.length);
        finalizeQuizIfDone(project, quiz);
      }
    });

    refs.solutionContent.addEventListener('copy', (event) => {
      event.preventDefault();
      showToast('La solution est a reecrire a la main.');
    });
  }

  async function init() {
    initCodeMirror();
    wireEvents();
    if (window.innerWidth < 1180) refs.shell.classList.add('rail-collapsed');

    // Focus mode par defaut desactive (null => '0')
    const focusPref = localStorage.getItem('preparation-web-focus') || '0';
    state.focusMode = focusPref === '1';
    refs.workspace.classList.toggle('focus-code', state.focusMode);
    if (refs.toggleFocus) refs.toggleFocus.textContent = state.focusMode ? 'Mode normal' : 'Focus code';

    const cssPref = localStorage.getItem('preparation-web-preview-css');
    state.previewCssEnabled = cssPref !== '0';
    if (refs.cssToggle) refs.cssToggle.checked = state.previewCssEnabled;
    if (refs.cssToggleLabel) refs.cssToggleLabel.textContent = state.previewCssEnabled ? 'Structure + CSS' : 'Structure';

    try {
      const status = await api('/api/preparation/status');
      if (!status.enabled || !status.unlocked) {
        window.location.href = '../index.html?preparation=locked';
        return;
      }

      state.localKey = status.storageKey ? `${LOCAL_KEY}-${status.storageKey}` : LOCAL_KEY;
      hydrateDefaults();
      const data = await api('/api/preparation/progress');
      state.profile = data.profile || status.profile || null;
      state.leaderboard = data.leaderboard || [];
      if (data.storageKey) state.localKey = `${LOCAL_KEY}-${data.storageKey}`;
      mergeServerProgress(data.progress || []);
      if (refs.leaderboard) setInterval(refreshLeaderboard, 20000);
    } catch (error) {
      state.canUseServer = false;
      hydrateDefaults();
      showToast('Mode local temporaire: impossible de joindre l API Preparation.');
    }

    await loadQuizBank();

    const maxUnlocked = unlockedProjectId();
    if (!completedBefore(state.currentId)) state.currentId = maxUnlocked;
    if (!projectById(state.currentId) && projects.length > 0) {
      state.currentId = projects[0].id; // Fallback for invalid local storage
    }
    renderAll();
  }

  init();
})();

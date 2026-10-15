/**
 * Atelier de code — éditeur Monaco + exécution + tuteur IA.
 *
 * Contrat DOM attendu (produit par scripts/generate-code-labs.js) :
 *
 *   <div class="lab" data-lab data-language="python" data-height="300"
 *        data-exercise="py-c1-e1" data-title="…" data-stdin="…"
 *        data-languages="1">        <!-- 1 = sélecteur de langage (atelier libre) -->
 *     <script type="text/plain" data-lab-starter>…</script>
 *   </div>
 *
 * Le script remplit lui-même la coquille (éditeur, barre d'actions, console) :
 * une page peut ainsi n'embarquer qu'un marqueur, et tout le reste vient d'ici.
 *
 * Règles suivies :
 *   - aucun appel réseau à la frappe (le quota du fournisseur est partagé) ;
 *   - un seul appel par clic, boutons verrouillés pendant l'exécution ;
 *   - l'élève n'a jamais la clé du fournisseur : tout passe par le serveur ;
 *   - aucune icône en emoji : uniquement le sprite SVG partagé.
 */
(function () {
  'use strict';

  var SPRITE = '/assets/img/ui-icons.svg';
  var MONACO_BASE = '/assets/vendor/monaco/vs';
  var MONACO_TIMEOUT_MS = 12000;

  // La sauvegarde locale est cloisonnée par cours : le premier segment du
  // chemin sert de clé (`/b1-c-cpp/chapitres/…` → `b1-c-cpp:lab:`). Le même
  // script sert à plusieurs cours sans que leurs brouillons se mélangent.
  var COURSE_KEY = (function () {
    var first = (location.pathname || '').split('/').filter(Boolean)[0];
    return first || 'cours';
  })();
  var STORAGE_PREFIX = COURSE_KEY + ':lab:';

  // ========================
  // Utilitaires
  // ========================

  function icon(name, extraClass) {
    return '<svg class="ic ' + (extraClass || '') + '" aria-hidden="true" focusable="false">' +
      '<use href="' + SPRITE + '#i-' + name + '"></use></svg>';
  }

  function esc(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTutorText(text) {
    if (!text) return '';
    var escaped = esc(text);
    var formatted = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

    var lines = formatted.split('\n');
    var html = [];
    var inList = false;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        continue;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList) {
          html.push('<ul>');
          inList = true;
        }
        html.push('<li>' + line.slice(2).trim() + '</li>');
      } else {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        html.push('<p>' + line + '</p>');
      }
    }
    if (inList) html.push('</ul>');
    return html.join('');
  }

  var STATUS_ICON = {
    idle: 'dot',
    running: 'hourglass',
    success: 'check-circle',
    compile_error: 'x',
    runtime_error: 'warning',
    api_error: 'cloud',
    rate_limited: 'hourglass',
    timeout: 'hourglass',
    cancelled: 'x',
    unknown_error: 'search'
  };

  var STATUS_LABEL = {
    idle: 'Prêt',
    running: 'Exécution en cours…',
    success: 'Exécution terminée',
    compile_error: 'Le programme ne compile pas',
    runtime_error: 'Le programme s’est arrêté sur une erreur',
    api_error: 'Service d’exécution indisponible',
    rate_limited: 'Trop de demandes d’exécution',
    timeout: 'Délai d’exécution dépassé (boucle infinie)',
    cancelled: 'Exécution interrompue',
    unknown_error: 'Réponse d’exécution non reconnue'
  };

  /** Message lisible pour un échec de requête, sans détail technique. */
  function httpMessage(status, data) {
    if (data && typeof data.error === 'string' && data.error) return data.error;
    if (status === 401) return 'Votre session a expiré. Rechargez la page et reconnectez-vous.';
    if (status === 429) return 'Trop de demandes d’exécution. Réessayez dans quelques instants.';
    if (status === 400) return 'La demande a été refusée.';
    if (status >= 500) return 'Le service d’exécution est momentanément indisponible.';
    return 'Une erreur est survenue pendant la requête.';
  }

  function postJSON(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (response) {
      return response.json().catch(function () { return null; }).then(function (data) {
        return { ok: response.ok, status: response.status, data: data };
      });
    });
  }

  // ========================
  // Routeur d'exécution (Navigateur / Serveur)
  // ========================

  var routerInstance = null;
  var routerPromise = null;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.getAttribute('data-loaded') === '1') return resolve();
        existing.addEventListener('load', resolve);
        existing.addEventListener('error', reject);
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () {
        s.setAttribute('data-loaded', '1');
        resolve();
      };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadRouter() {
    if (routerPromise) return routerPromise;

    routerPromise = new Promise(function (resolve) {
      if (window.ExecutionRouter) {
        routerInstance = new window.ExecutionRouter();
        return resolve(routerInstance);
      }

      loadScript('/assets/js/engines/engine-interface.js')
        .then(function () { return loadScript('/assets/js/engines/worker-runner.js'); })
        .then(function () { return loadScript('/assets/js/engines/pseudo-code-engine.js'); })
        .then(function () { return loadScript('/assets/js/engines/sql-wasm-engine.js'); })
        .then(function () { return loadScript('/assets/js/engines/server-engine.js'); })
        .then(function () { return loadScript('/assets/js/execution-router.js'); })
        .then(function () {
          routerInstance = new window.ExecutionRouter();
          resolve(routerInstance);
        })
        .catch(function (err) {
          console.warn('[CodeLab] Repli sur le moteur serveur direct :', err);
          routerInstance = {
            supportsBrowser: function () { return false; },
            getProvenanceInfo: function () {
              return { mode: 'server', label: 'Serveur', title: 'Serveur distant', icon: 'cloud' };
            },
            execute: function (lang, code, stdin) {
              return postJSON('/api/execute', { language: lang, code: code, stdin: stdin })
                .then(function (res) {
                  if (!res.ok) {
                    var kind = res.status === 429 ? 'rate_limited' : 'api_error';
                    return {
                      status: kind,
                      stdout: '',
                      stderr: httpMessage(res.status, res.data),
                      compileError: '',
                      exitCode: 1,
                      provenance: 'server',
                      provider: 'Serveur',
                      userMessage: httpMessage(res.status, res.data)
                    };
                  }
                  var p = res.data || {};
                  p.provenance = 'server';
                  return p;
                });
            },
            cancel: function () {}
          };
          resolve(routerInstance);
        });
    });

    return routerPromise;
  }

  // ========================
  // Monaco
  // ========================

  var monacoPromise = null;
  var themeReady = false;

  function defineTheme(monaco) {
    if (themeReady) return;
    themeReady = true;
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';

    monaco.editor.defineTheme('latte', {
      base: dark ? 'vs-dark' : 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: dark ? '7d7871' : '6b6560', fontStyle: 'italic' },
        { token: 'keyword', foreground: dark ? '7491ff' : '1d4ed8' },
        { token: 'string', foreground: dark ? '6ee7b7' : '047857' },
        { token: 'number', foreground: dark ? 'fbbf24' : 'a16207' },
        { token: 'type', foreground: dark ? 'd3b8ff' : '6d28d9' }
      ],
      colors: dark ? {
        'editor.background': '#141210',
        'editorLineNumber.foreground': '#78716c',
        'editorLineNumber.activeForeground': '#7491ff',
        'editor.lineHighlightBackground': '#1c1917',
        'editorCursor.foreground': '#7491ff',
        'editor.selectionBackground': '#2b3a6b'
      } : {
        'editor.background': '#ffffff',
        'editor.foreground': '#141414',
        'editorLineNumber.foreground': '#a8a29e',
        'editorLineNumber.activeForeground': '#3556d9',
        'editor.selectionBackground': '#dbe4ff',
        'editor.inactiveSelectionBackground': '#eef2ff',
        'editor.lineHighlightBackground': '#f7f4ef',
        'editorCursor.foreground': '#3556d9',
        'editorIndentGuide.background1': '#f0ebe2',
        'editorIndentGuide.activeBackground1': '#d6cfc2',
        'editorWidget.background': '#faf7f2',
        'editorWidget.border': '#e7e1d7',
        'scrollbarSlider.background': '#d6cfc280',
        'scrollbarSlider.hoverBackground': '#d6cfc2',
        'scrollbarSlider.activeBackground': '#a8a29e'
      }
    });
  }

  /** Charge Monaco une seule fois par page, quel que soit le nombre d'ateliers. */
  function loadMonaco() {
    if (monacoPromise) return monacoPromise;

    monacoPromise = new Promise(function (resolve, reject) {
      if (window.monaco && window.monaco.editor) return resolve(window.monaco);

      function boot() {
        if (!window.require || !window.require.config) {
          return reject(new Error('chargeur AMD indisponible'));
        }
        window.require.config({ paths: { vs: MONACO_BASE } });
        window.require(['vs/editor/editor.main'], function () {
          if (!window.monaco || !window.monaco.editor) return reject(new Error('éditeur absent'));
          defineTheme(window.monaco);
          resolve(window.monaco);
        }, function (error) {
          reject(error || new Error('module éditeur introuvable'));
        });
      }

      if (window.require && window.require.config) return boot();

      var script = document.createElement('script');
      script.src = MONACO_BASE + '/loader.js';
      script.async = true;
      script.onload = boot;
      script.onerror = function () { reject(new Error('loader.js introuvable')); };
      document.head.appendChild(script);
    });

    return monacoPromise;
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(function (_, reject) {
        setTimeout(function () { reject(new Error('délai dépassé')); }, ms);
      })
    ]);
  }

  // ========================
  // Atelier
  // ========================

  function Lab(root) {
    this.root = root;
    this.exerciseId = root.getAttribute('data-exercise') || '';
    this.language = root.getAttribute('data-language') || 'python';
    this.height = parseInt(root.getAttribute('data-height'), 10) || 300;
    this.withPicker = root.getAttribute('data-languages') === '1';
    this.starter = readStarter(root);
    this.editor = null;
    this.fallback = null;
    this.running = false;
    this.lastOutcome = null;
    this.activeTab = 'out';
  }

  function readStarter(root) {
    var node = root.querySelector('[data-lab-starter]');
    var text = node ? node.textContent : '';
    return text.replace(/^\n/, '').replace(/\s+$/, '\n');
  }

  Lab.prototype.storageKey = function () {
    return STORAGE_PREFIX + (this.exerciseId || 'libre') + ':' + this.language;
  };

  Lab.prototype.getCode = function () {
    if (this.editor) return this.editor.getValue();
    if (this.fallback) return this.fallback.value;
    return '';
  };

  Lab.prototype.setCode = function (code) {
    if (this.editor) this.editor.setValue(code);
    else if (this.fallback) this.fallback.value = code;
  };

  // ── Construction de l'interface ────────────────────────────────────────

  Lab.prototype.mount = function () {
    this.editorWrap = document.createElement('div');
    this.editorWrap.className = 'lab__editor-wrap';
    this.editorWrap.innerHTML =
      '<div class="lab__loading">' + icon('code') + '<span>Préparation de l’éditeur…</span></div>';

    this.bar = this.buildBar();
    this.stdinBlock = this.buildStdin();
    this.consoleEl = this.buildConsole();
    this.reportEl = document.createElement('div');
    this.reportEl.className = 'lab__report';
    this.reportEl.hidden = true;
    this.tutorEl = this.buildTutor();

    this.root.appendChild(this.editorWrap);
    this.root.appendChild(this.bar);
    this.root.appendChild(this.stdinBlock);
    this.root.appendChild(this.consoleEl);
    this.root.appendChild(this.reportEl);
    this.root.appendChild(this.tutorEl);
  };

  Lab.prototype.buildBar = function () {
    var bar = document.createElement('div');
    bar.className = 'lab__bar';

    var picker = '';
    if (this.withPicker) {
      picker = '<label class="lab__picker">' + icon('code') +
        '<span>Langage</span>' +
        '<select data-lab-picker aria-label="Langage d’exécution">' +
        '<option value="' + esc(this.language) + '">Chargement…</option>' +
        '</select></label>';
    }

    bar.innerHTML =
      picker +
      '<button type="button" class="lab__btn lab__btn--run" data-lab-run>' +
      icon('play') + '<span>Exécuter</span></button>' +
      '<button type="button" class="lab__btn lab__btn--stop" data-lab-stop hidden>' +
      icon('x') + '<span>Arrêter</span></button>' +
      (this.exerciseId
        ? '<button type="button" class="lab__btn lab__btn--submit" data-lab-submit>' +
          icon('check') + '<span>Valider</span></button>'
        : '') +
      '<button type="button" class="lab__btn lab__btn--help" data-lab-help disabled>' +
      icon('brain') + '<span>Expliquer mon erreur</span></button>' +
      '<button type="button" class="lab__btn lab__btn--ghost" data-lab-reset>' +
      icon('refresh') + '<span>Réinitialiser</span></button>' +
      '<span class="lab__badge-provenance" data-lab-provenance></span>' +
      '<span class="lab__status" data-lab-status role="status" aria-live="polite"></span>';

    this.controls = {
      run: bar.querySelector('[data-lab-run]'),
      stop: bar.querySelector('[data-lab-stop]'),
      submit: bar.querySelector('[data-lab-submit]'),
      help: bar.querySelector('[data-lab-help]'),
      reset: bar.querySelector('[data-lab-reset]'),
      provenance: bar.querySelector('[data-lab-provenance]'),
      status: bar.querySelector('[data-lab-status]'),
      picker: bar.querySelector('[data-lab-picker]')
    };
    return bar;
  };

  Lab.prototype.buildStdin = function () {
    var details = document.createElement('details');
    details.className = 'lab__stdin';
    details.innerHTML =
      '<summary>' + icon('keyboard') + '<span>Entrée du programme (ce que le programme lira)</span></summary>' +
      '<textarea data-lab-stdin spellcheck="false" aria-label="Entrée standard du programme"></textarea>';

    var initialStdin = this.root.getAttribute('data-stdin') || '';
    if (!initialStdin.trim()) {
      var sampleParts = this.root.querySelectorAll('.lab__sample-part');
      for (var i = 0; i < sampleParts.length; i++) {
        var part = sampleParts[i];
        var title = part.querySelector('b');
        if (title && /entr[eé]e/i.test(title.textContent)) {
          var pre = part.querySelector('pre');
          if (pre && pre.textContent.trim()) {
            initialStdin = pre.textContent.trim();
            break;
          }
        }
      }
    }
    this.initialStdin = initialStdin;

    var area = details.querySelector('[data-lab-stdin]');
    area.value = initialStdin;
    this.stdinEl = area;

    // Une entrée prévue par l'énoncé change la donne : on la déplie d'emblée.
    if (area.value.trim()) details.open = true;

    this.stdinBlock = details;
    return details;
  };

  Lab.prototype.buildConsole = function () {
    var consoleEl = document.createElement('div');
    consoleEl.className = 'lab__console';
    var uid = 'lab-' + Math.random().toString(36).slice(2, 9);
    this.uid = uid;

    consoleEl.innerHTML =
      '<div class="lab__tabs" role="tablist" aria-label="Console d’exécution">' +
      '<button type="button" class="lab__tab" role="tab" id="' + uid + '-tab-out" ' +
      'aria-controls="' + uid + '-out" aria-selected="true" data-lab-tab="out">' +
      icon('terminal') + 'Sortie<b data-lab-count="out" hidden>0</b></button>' +
      '<button type="button" class="lab__tab" role="tab" id="' + uid + '-tab-err" ' +
      'aria-controls="' + uid + '-err" aria-selected="false" data-lab-tab="err">' +
      icon('warning') + 'Erreurs<b data-lab-count="err" hidden>0</b></button>' +
      '<button type="button" class="lab__tab" role="tab" id="' + uid + '-tab-detail" ' +
      'aria-controls="' + uid + '-detail" aria-selected="false" data-lab-tab="detail">' +
      icon('search') + 'Détails</button>' +
      '</div>' +
      '<div class="lab__panes">' +
      '<pre class="lab__pane" role="tabpanel" id="' + uid + '-out" ' +
      'aria-labelledby="' + uid + '-tab-out" data-lab-pane="out" tabindex="0" ' +
      'data-empty="1" data-empty-text="Rien à afficher pour l’instant. Lancez l’exécution."></pre>' +
      '<pre class="lab__pane lab__pane--err" role="tabpanel" id="' + uid + '-err" hidden ' +
      'aria-labelledby="' + uid + '-tab-err" data-lab-pane="err" tabindex="0" ' +
      'data-empty="1" data-empty-text="Aucune erreur signalée."></pre>' +
      '<pre class="lab__pane lab__pane--detail" role="tabpanel" id="' + uid + '-detail" hidden ' +
      'aria-labelledby="' + uid + '-tab-detail" data-lab-pane="detail" tabindex="0" ' +
      'data-empty="1" data-empty-text="Les détails de la dernière exécution apparaîtront ici."></pre>' +
      '</div>' +
      '<div class="lab__console-help" data-lab-console-help hidden>' +
      '<button type="button" class="lab__btn lab__btn--inline-help" data-lab-inline-help>' +
      icon('brain') + '<span>Demander une explication au tuteur IA</span></button>' +
      '</div>';

    this.panes = {
      out: consoleEl.querySelector('[data-lab-pane="out"]'),
      err: consoleEl.querySelector('[data-lab-pane="err"]'),
      detail: consoleEl.querySelector('[data-lab-pane="detail"]')
    };
    this.consoleHelp = consoleEl.querySelector('[data-lab-console-help]');
    this.tabs = {
      out: consoleEl.querySelector('[data-lab-tab="out"]'),
      err: consoleEl.querySelector('[data-lab-tab="err"]'),
      detail: consoleEl.querySelector('[data-lab-tab="detail"]')
    };
    this.counts = {
      out: consoleEl.querySelector('[data-lab-count="out"]'),
      err: consoleEl.querySelector('[data-lab-count="err"]')
    };

    var self = this;
    var inlineHelpBtn = consoleEl.querySelector('[data-lab-inline-help]');
    if (inlineHelpBtn) {
      inlineHelpBtn.addEventListener('click', function () {
        self.explain();
      });
    }

    Object.keys(this.tabs).forEach(function (name) {
      self.tabs[name].addEventListener('click', function () { self.showTab(name); });
      self.tabs[name].addEventListener('keydown', function (event) {
        var order = ['out', 'err', 'detail'];
        var index = order.indexOf(name);
        if (event.key === 'ArrowRight') { event.preventDefault(); self.focusTab(order[(index + 1) % order.length]); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); self.focusTab(order[(index + order.length - 1) % order.length]); }
      });
    });

    return consoleEl;
  };

  Lab.prototype.buildTutor = function () {
    var tutor = document.createElement('div');
    tutor.className = 'lab__tutor';
    tutor.hidden = true;
    tutor.innerHTML =
      '<div class="lab__tutor-title">' + icon('brain') + '<span>Tuteur IA</span></div>' +
      '<label class="lab__question">' +
      '<span>Précisez votre question (facultatif)</span>' +
      '<input type="text" data-lab-question maxlength="300" spellcheck="false" ' +
      'placeholder="Par exemple : pourquoi mon accumulateur reste à zéro ?">' +
      '</label>' +
      '<div class="lab__tutor-text" data-lab-tutor></div>' +
      '<div class="lab__tutor-notice" data-lab-tutor-notice hidden></div>';

    this.questionEl = tutor.querySelector('[data-lab-question]');
    this.tutorText = tutor.querySelector('[data-lab-tutor]');
    this.tutorNotice = tutor.querySelector('[data-lab-tutor-notice]');

    var self = this;
    tutor.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && event.target === self.questionEl) {
        event.preventDefault();
        if (self.canExplain()) self.explain();
      }
    });

    return tutor;
  };

  Lab.prototype.focusTab = function (name) {
    this.showTab(name);
    this.tabs[name].focus();
  };

  // Le changement d'onglet est programmatique (après un run) : il ne doit
  // jamais voler le focus de l'élève, qui est dans l'éditeur.
  Lab.prototype.showTab = function (name) {
    this.activeTab = name;
    var self = this;
    Object.keys(this.tabs).forEach(function (key) {
      self.tabs[key].setAttribute('aria-selected', key === name ? 'true' : 'false');
    });
    Object.keys(this.panes).forEach(function (key) {
      self.panes[key].hidden = key !== name;
    });
  };

  // ── Affichage ──────────────────────────────────────────────────────────

  Lab.prototype.setStatus = function (kind, text) {
    var el = this.controls.status;
    el.setAttribute('data-kind', kind);
    var spinning = kind === 'running';
    el.innerHTML = (spinning
      ? '<span class="lab__spinner" aria-hidden="true"></span>'
      : icon(STATUS_ICON[kind] || 'dot')) +
      '<span>' + esc(text || STATUS_LABEL[kind] || '') + '</span>';
  };

  Lab.prototype.setPane = function (name, text, count) {
    var pane = this.panes[name];
    var value = String(text === undefined || text === null ? '' : text);
    pane.textContent = value;
    if (value.trim()) {
      pane.removeAttribute('data-empty');
    } else {
      pane.setAttribute('data-empty', '1');
    }
    if (count !== undefined && this.counts[name]) {
      if (count > 0) {
        this.counts[name].textContent = String(count);
        this.counts[name].hidden = false;
      } else {
        this.counts[name].hidden = true;
      }
    }
  };

  Lab.prototype.setBusy = function (busy, label) {
    this.running = busy;
    this.controls.run.disabled = busy;
    if (this.controls.stop) {
      this.controls.stop.hidden = !busy;
      this.controls.stop.disabled = !busy;
    }
    if (this.controls.submit) this.controls.submit.disabled = busy;
    this.controls.reset.disabled = busy;
    this.controls.run.innerHTML = busy
      ? '<span class="lab__spinner" aria-hidden="true"></span><span>' + esc(label || 'Exécution…') + '</span>'
      : icon('play') + '<span>Exécuter</span>';
    this.refreshHelpState();
  };

  Lab.prototype.stop = function () {
    if (this.running) {
      if (this.router) {
        this.router.cancel();
      }
      this.setStatus('cancelled', 'Exécution interrompue par l’utilisateur.');
      this.setBusy(false);
    }
  };

  Lab.prototype.updateProvenanceBadge = function () {
    if (!this.controls.provenance) return;
    var self = this;
    loadRouter().then(function (router) {
      self.router = router;
      var info = router.getProvenanceInfo(self.language);
      self.controls.provenance.setAttribute('data-mode', info.mode);
      self.controls.provenance.title = info.title;
      self.controls.provenance.innerHTML = icon(info.icon) + '<span>' + esc(info.label) + '</span>';
    });
  };

  Lab.prototype.refreshHelpState = function () {
    var usable = this.canExplain() && !this.running;
    this.controls.help.disabled = !usable;
    this.controls.help.setAttribute('data-ready', usable ? '1' : '0');
    if (this.consoleHelp) {
      this.consoleHelp.hidden = !usable;
    }
  };

  Lab.prototype.canExplain = function () {
    var outcome = this.lastOutcome;
    if (!outcome) return false;
    return Boolean((outcome.stderr && outcome.stderr.trim()) ||
      (outcome.compileError && outcome.compileError.trim()) ||
      (outcome.stop && (outcome.stop.stderr || outcome.stop.compileError || outcome.stop.reason === 'wrong_output')));
  };

  // ── Éditeur ────────────────────────────────────────────────────────────

  Lab.prototype.paintFallback = function (message) {
    this.editorWrap.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.className = 'lab__fallback-note';
    if (message) {
      wrap.innerHTML = '<p class="lab__note">' + icon('warning') + ' ' + esc(message) + '</p>';
    }
    this.fallback = document.createElement('textarea');
    this.fallback.className = 'lab__fallback';
    this.fallback.spellcheck = false;
    this.fallback.setAttribute('aria-label', 'Éditeur de code');
    this.fallback.value = this.loadDraft();
    this.fallback.style.height = this.height + 'px';
    wrap.appendChild(this.fallback);
    this.editorWrap.appendChild(wrap);

    var self = this;
    var timer = null;
    this.fallback.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { self.saveDraft(); }, 500);
    });
  };

  Lab.prototype.loadDraft = function () {
    try {
      var stored = window.localStorage.getItem(this.storageKey());
      if (typeof stored === 'string' && stored.length) return stored;
    } catch (error) {
      // localStorage indisponible (mode privé, quota) : on continue sans.
    }
    return this.starter;
  };

  Lab.prototype.saveDraft = function () {
    try {
      window.localStorage.setItem(this.storageKey(), this.getCode());
    } catch (error) {
      // Sans persistance locale, l'atelier reste utilisable.
    }
  };

  Lab.prototype.clearDraft = function () {
    try {
      window.localStorage.removeItem(this.storageKey());
    } catch (error) {
      // rien à faire
    }
  };

  Lab.prototype.initEditor = function () {
    var self = this;

    withTimeout(loadMonaco(), MONACO_TIMEOUT_MS).then(function (monaco) {
      self.editorWrap.innerHTML = '';
      var host = document.createElement('div');
      host.className = 'lab__editor';
      host.style.height = self.height + 'px';
      self.editorWrap.appendChild(host);

      self.editor = monaco.editor.create(host, {
        value: self.loadDraft(),
        language: self.language,
        theme: 'latte',
        automaticLayout: true,
        fontSize: 13,
        lineHeight: 21,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        tabSize: 4,
        insertSpaces: true,
        renderWhitespace: 'selection',
        lineNumbersMinChars: 3,
        padding: { top: 12, bottom: 12 },
        wordWrap: 'on',
        quickSuggestions: false,
        wordBasedSuggestions: 'off',
        tabCompletion: 'off',
        occurrencesHighlight: 'off',
        scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
        ariaLabel: 'Éditeur de code Python',
        // L'atelier n'exécute jamais à la frappe : le quota est partagé.
        tabFocusMode: false
      });

      var timer = null;
      self.editor.onDidChangeModelContent(function () {
        clearTimeout(timer);
        timer = setTimeout(function () { self.saveDraft(); }, 600);
      });

      self.editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function () {
        if (!self.running) self.run();
      });

      self.setStatus('idle', 'Prêt — Ctrl + Entrée pour exécuter');
    }).catch(function () {
      self.paintFallback('L’éditeur enrichi n’a pas pu être chargé. Vous pouvez coder dans cette zone : tout le reste fonctionne.');
      self.setStatus('idle', 'Prêt');
    });
  };

  Lab.prototype.setEditorLanguage = function (language) {
    this.language = language;
    this.saveDraft();
    if (this.editor && window.monaco) {
      window.monaco.editor.setModelLanguage(this.editor.getModel(), language);
    }
    this.setCode(this.loadDraft());
    this.updateProvenanceBadge();
  };

  Lab.prototype.loadLanguages = function () {
    var self = this;
    fetch('/api/execute/languages', { headers: { Accept: 'application/json' } })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) {
        var list = data && Array.isArray(data.languages) ? data.languages : [];
        if (!list.length) throw new Error('catalogue vide');
        self.controls.picker.innerHTML = list.map(function (lang) {
          return '<option value="' + esc(lang.id) + '"' +
            (lang.id === self.language ? ' selected' : '') + '>' + esc(lang.label) + '</option>';
        }).join('');
        self.controls.picker.addEventListener('change', function () {
          self.setEditorLanguage(self.controls.picker.value);
        });
      })
      .catch(function () {
        // Repli local : on ne bloque jamais l'atelier sur un catalogue indisponible.
        self.controls.picker.innerHTML = '<option value="' + esc(self.language) + '" selected>' +
          esc(self.language === 'python' ? 'Python' : self.language) + '</option>';
      });
  };

  // ── Actions ────────────────────────────────────────────────────────────

  Lab.prototype.run = function () {
    var self = this;
    if (this.running) return;

    var code = this.getCode();
    if (!code.trim()) {
      this.setStatus('idle', 'Écrivez du code avant d’exécuter.');
      return;
    }

    this.setBusy(true, 'Exécution…');
    this.setStatus('running');
    this.setPane('detail', '');
    this.lastOutcome = null;
    this.refreshHelpState();

    loadRouter().then(function (router) {
      self.router = router;
      return router.execute(self.language, code, self.stdinEl.value, { timeoutMs: 6000 });
    }).then(function (payload) {
      self.lastOutcome = payload;

      var stdout = payload.stdout || '';
      var stderr = payload.stderr || '';
      var compileError = payload.compileError || '';

      self.setPane('out', stdout, stdout.trim() ? String(stdout.trim().split('\n').length) : 0);
      var errText = [compileError, stderr].filter(function (part) { return part && part.trim(); }).join('\n\n');
      self.setPane('err', errText, errText.trim() ? String(errText.trim().split('\n').length) : 0);
      self.renderDetails(payload);

      var statusText = payload.status === 'success'
        ? (stdout.trim() ? 'Exécution terminée' : 'Exécution terminée (aucune sortie)')
        : (payload.userMessage || STATUS_LABEL[payload.status] || '');
      self.setStatus(payload.status, statusText);

      if (compileError.trim() || stderr.trim() || payload.status === 'compile_error' || payload.status === 'runtime_error' || payload.status === 'timeout') {
        self.showTab('err');
      } else {
        self.showTab('out');
      }

      if ((compileError.indexOf('EOFError') !== -1 || stderr.indexOf('EOFError') !== -1) && self.stdinBlock) {
        self.stdinBlock.open = true;
        if (self.stdinEl && !self.stdinEl.value.trim()) {
          try { self.stdinEl.focus(); } catch (_) {}
        }
      }
      self.refreshHelpState();
    }).catch(function (err) {
      var msg = err && err.message ? err.message : 'Impossible de joindre le service d’exécution.';
      self.setStatus('api_error', msg);
      self.renderDetails({ status: 'api_error', userMessage: msg });
      self.showTab('detail');
    }).then(function () {
      self.setBusy(false);
    });
  };

  Lab.prototype.renderDetails = function (payload) {
    var rows = [];
    function row(label, value) {
      if (value === undefined || value === null || value === '') return;
      rows.push('<div class="lab__detail-row"><span>' + esc(label) + '</span><span>' +
        esc(String(value)) + '</span></div>');
    }

    row('État', STATUS_LABEL[payload.status] || payload.status);
    row('Langage', this.language);
    row('Environnement', payload.provenance === 'browser' ? 'Navigateur (local, instantané)' : 'Serveur d’exécution distant');
    row('Code de sortie', payload.exitCode);
    row('Temps d’exécution', payload.executionTime === null || payload.executionTime === undefined
      ? null : payload.executionTime + ' s');
    row('Mémoire', payload.memory === null || payload.memory === undefined
      ? null : payload.memory + ' Ko');
    row('Lien de partage', payload.permalink);
    row('Moteur d’exécution', payload.provider);
    if (payload.quota) {
      row('Exécutions restantes aujourd’hui', payload.quota.remaining + ' / ' + payload.quota.limit);
    }
    if (payload.userMessage) {
      rows.push('<div class="lab__detail-row"><span>Message</span><span>' +
        esc(payload.userMessage) + '</span></div>');
    }

    var warnings = (payload.warnings || []).filter(Boolean);
    var html = rows.join('');
    if (warnings.length) {
      html += '<div class="lab__detail-row"><span>Remarques</span><span>' +
        esc(warnings.join(' · ')) + '</span></div>';
    }
    if (payload.raw) {
      html += '<div class="lab__diag-cell" data-kind="raw"><b>Réponse brute du service</b><pre>' +
        esc(payload.raw) + '</pre></div>';
    }

    this.setPane('detail', '');
    this.panes.detail.innerHTML = html || '';
    if (!html) this.panes.detail.setAttribute('data-empty', '1');
  };

  Lab.prototype.submit = function () {
    var self = this;
    if (this.running || !this.exerciseId) return;

    var code = this.getCode();
    if (!code.trim()) {
      this.setStatus('idle', 'Écrivez du code avant de valider.');
      return;
    }

    this.setBusy(true, 'Correction…');
    this.setStatus('running', 'Vérification des tests…');
    this.reportEl.hidden = true;

    postJSON('/api/exercise/submit', { exerciseId: this.exerciseId, code: code })
      .then(function (result) {
        if (!result.ok) {
          var kind = result.status === 429 ? 'rate_limited' : 'api_error';
          self.setStatus(kind, httpMessage(result.status, result.data));
          self.reportEl.hidden = false;
          self.reportEl.innerHTML = '<div class="lab__report-head" data-kind="ko">' +
            icon('warning') + '<span>' + esc(httpMessage(result.status, result.data)) + '</span></div>';
          return;
        }

        var report = result.data || {};
        self.renderReport(report);

        // L'erreur du premier test en échec alimente le tuteur IA.
        self.lastOutcome = report.stop
          ? {
              stop: report.stop,
              stderr: report.stop.stderr,
              compileError: report.stop.compileError,
              status: report.stop.reason,
              expected: report.stop.expected,
              actual: report.stop.actual
            }
          : null;
        self.refreshHelpState();

        var allPassed = report.total > 0 && report.passed === report.total;
        self.setStatus(allPassed ? 'success' : (report.stop && report.stop.reason === 'compile_error' ? 'compile_error' : 'runtime_error'),
          allPassed
            ? 'Exercice validé'
            : 'Exercice à revoir : ' + report.passed + ' / ' + report.total + ' test(s) validé(s)');
      })
      .catch(function () {
        self.setStatus('api_error', 'Impossible de joindre le serveur de correction.');
      })
      .then(function () { self.setBusy(false); });
  };

  Lab.prototype.renderReport = function (report) {
    var total = report.total || 0;
    var passed = report.passed || 0;
    var allPassed = total > 0 && passed === total;

    var html = '<div class="lab__report-head" data-kind="' + (allPassed ? 'ok' : 'ko') + '">' +
      icon(allPassed ? 'check-circle' : 'warning') +
      '<span>' + passed + ' / ' + total + ' test(s) validé(s)' +
      (allPassed ? ' — exercice réussi' : '') + '</span></div>';

    if (Array.isArray(report.results) && report.results.length) {
      html += '<ul class="lab__tests">' + report.results.map(function (item) {
        return '<li data-ok="' + (item.ok ? '1' : '0') + '">' +
          icon(item.ok ? 'check' : 'x') + '<span>' + esc(item.label) + '</span></li>';
      }).join('') + '</ul>';
    }

    var stop = report.stop;
    if (stop) {
      if (stop.reason === 'wrong_output') {
        html += '<div class="lab__diag">' +
          '<div class="lab__diag-title">' + icon('search') +
          '<span>Premier test en échec — ' + esc(stop.label) + '</span></div>' +
          '<div class="lab__diag-grid">' +
          this.diagCell('Entrée', stop.input || '(aucune)', 'input') +
          this.diagCell('Sortie attendue', stop.expected, 'expected') +
          this.diagCell('Votre sortie', stop.actual || '(vide)', 'actual') +
          '</div></div>';
      } else if (stop.reason === 'compile_error') {
        html += this.diagBlock('Le programme ne compile pas', [['Message du compilateur', stop.compileError]]) ;
      } else if (stop.reason === 'runtime_error') {
        html += this.diagBlock('Le programme s’est arrêté sur une erreur', [
          ['Message d’erreur', stop.stderr],
          ['Code de sortie', stop.exitCode]
        ]);
      } else {
        html += this.diagBlock('Le test n’a pas pu être exécuté', [
          ['Information', stop.userMessage || STATUS_LABEL[stop.reason] || stop.reason]
        ]);
      }
    }

    if (!allPassed && report.stop) {
      html += '<div class="lab__report-help">' +
        '<button type="button" class="lab__btn lab__btn--inline-help" data-lab-report-help>' +
        icon('brain') + '<span>Demander au tuteur IA d’expliquer l’erreur</span></button>' +
        '</div>';
    }

    if (allPassed && report.quota) {
      html += '<p class="lab__note">' + icon('check') + ' Exécutions restantes aujourd’hui : ' +
        report.quota.remaining + ' / ' + report.quota.limit + '.</p>';
    }

    this.reportEl.innerHTML = html;
    this.reportEl.hidden = false;

    var reportHelpBtn = this.reportEl.querySelector('[data-lab-report-help]');
    if (reportHelpBtn) {
      var self = this;
      reportHelpBtn.addEventListener('click', function () {
        self.explain();
      });
    }
  };

  Lab.prototype.diagCell = function (label, value, kind) {
    return '<div class="lab__diag-cell" data-kind="' + esc(kind) + '"><b>' + esc(label) + '</b><pre>' +
      esc(value === undefined || value === null || value === '' ? '(vide)' : value) + '</pre></div>';
  };

  Lab.prototype.diagBlock = function (title, rows) {
    var cells = rows.filter(function (pair) {
      return pair[1] !== undefined && pair[1] !== null && pair[1] !== '';
    }).map(function (pair) {
      return '<div class="lab__diag-cell"><b>' + esc(pair[0]) + '</b><pre>' + esc(pair[1]) + '</pre></div>';
    }).join('');
    return '<div class="lab__diag"><div class="lab__diag-title">' + icon('warning') + '<span>' +
      esc(title) + '</span></div><div class="lab__diag-grid">' + cells + '</div></div>';
  };

  Lab.prototype.explain = function () {
    var self = this;
    if (this.running || !this.canExplain()) return;

    var outcome = this.lastOutcome || {};
    var stop = outcome.stop || {};

    this.setBusy(true, 'Le tuteur rédige…');
    this.setStatus('running', 'Le tuteur analyse votre code…');
    this.tutorEl.hidden = false;
    this.tutorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    this.tutorText.innerHTML = '<span class="lab__note">' + icon('hourglass') +
      ' Analyse de votre code en cours…</span>';
    this.tutorNotice.hidden = true;

    postJSON('/api/code-help', {
      exerciseId: this.exerciseId || undefined,
      code: this.getCode(),
      stdout: outcome.stdout || '',
      stderr: stop.stderr || outcome.stderr || '',
      compileError: stop.compileError || outcome.compileError || '',
      expected: stop.expected || outcome.expected || '',
      actual: stop.actual || outcome.actual || '',
      question: this.questionEl.value || ''
    }).then(function (result) {
      if (!result.ok) {
        self.tutorText.innerHTML = '<span class="lab__note">' + icon('warning') + ' ' +
          esc(httpMessage(result.status, result.data)) + '</span>';
        self.setStatus('api_error', 'Le tuteur IA est indisponible');
        return;
      }
      var data = result.data || {};
      self.tutorText.innerHTML = formatTutorText(data.explanation || '');
      if (data.notice) {
        self.tutorNotice.hidden = false;
        self.tutorNotice.innerHTML = icon('ban') + '<span>' + esc(data.notice) + '</span>';
      }
      self.setStatus('idle', 'Explications fournies — à vous de corriger');
    }).catch(function () {
      self.tutorText.innerHTML = '<span class="lab__note">' + icon('warning') +
        ' Impossible de joindre le tuteur IA pour le moment.</span>';
    }).then(function () {
      self.setBusy(false);
    });
  };

  Lab.prototype.reset = function () {
    if (this.running) return;
    this.clearDraft();
    this.setCode(this.starter);
    if (this.stdinEl && typeof this.initialStdin === 'string') {
      this.stdinEl.value = this.initialStdin;
      if (this.stdinBlock) {
        this.stdinBlock.open = Boolean(this.initialStdin.trim());
      }
    }
    this.lastOutcome = null;
    this.reportEl.hidden = true;
    this.tutorEl.hidden = true;
    this.setPane('out', '');
    this.setPane('err', '');
    this.setPane('detail', '');
    this.setStatus('idle', 'Code de départ restauré');
    this.refreshHelpState();
  };

  Lab.prototype.wire = function () {
    var self = this;
    this.controls.run.addEventListener('click', function () { self.run(); });
    if (this.controls.stop) this.controls.stop.addEventListener('click', function () { self.stop(); });
    if (this.controls.submit) this.controls.submit.addEventListener('click', function () { self.submit(); });
    this.controls.help.addEventListener('click', function () { self.explain(); });
    this.controls.reset.addEventListener('click', function () { self.reset(); });
  };

  // ========================
  // Démarrage
  // ========================

  function start() {
    var labs = Array.prototype.slice.call(document.querySelectorAll('[data-lab]'));
    labs.forEach(function (root) {
      if (root.getAttribute('data-lab-ready') === '1') return;
      root.setAttribute('data-lab-ready', '1');

      var lab = new Lab(root);
      root.__lab = lab;
      lab.mount();
      lab.wire();
      lab.setStatus('idle', 'Prêt');
      lab.initEditor();
      lab.updateProvenanceBadge();
      if (lab.withPicker && lab.controls.picker) lab.loadLanguages();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  window.CodeLab = { start: start };
})();

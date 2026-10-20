/**
 * Routeur d'exécution de code multi-langages.
 * Oriente les exécutions vers les moteurs du navigateur (Python/Skulpt, JavaScript, Pseudo-code, SQL)
 * ou le serveur d'exécution (/api/execute pour C, C++, Java, PHP, Bash, etc.).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./engines/engine-interface'),
      require('./engines/worker-runner'),
      require('./engines/pseudo-code-engine'),
      require('./engines/sql-wasm-engine'),
      require('./engines/server-engine')
    );
  } else {
    root.ExecutionRouter = factory(
      root.ExecutionInterface,
      root.WorkerRunner,
      root.PseudoCodeEngine,
      root.SqlWasmEngine,
      root.ServerEngine
    );
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (
  ExecutionInterface,
  WorkerRunner,
  PseudoCodeEngine,
  SqlWasmEngine,
  ServerEngine
) {
  'use strict';

  var STATUS = ExecutionInterface ? ExecutionInterface.STATUS : {
    SUCCESS: 'success',
    RUNTIME_ERROR: 'runtime_error',
    COMPILE_ERROR: 'compile_error',
    TIMEOUT: 'timeout',
    CANCELLED: 'cancelled',
    API_ERROR: 'api_error'
  };

  // Langages supportés en exécution locale dans le navigateur
  var BROWSER_LANGUAGES = {
    'python': {
      workerUrl: '/assets/js/engines/skulpt-worker.js',
      provider: 'Python 3 (Skulpt dans le navigateur)',
      type: 'worker'
    },
    'py': {
      workerUrl: '/assets/js/engines/skulpt-worker.js',
      provider: 'Python 3 (Skulpt dans le navigateur)',
      type: 'worker'
    },
    'javascript': {
      workerUrl: '/assets/js/engines/javascript-worker.js',
      provider: 'JavaScript (Web Worker)',
      type: 'worker'
    },
    'js': {
      workerUrl: '/assets/js/engines/javascript-worker.js',
      provider: 'JavaScript (Web Worker)',
      type: 'worker'
    },
    'algo': {
      provider: 'Interpréteur Pseudo-code (Navigateur)',
      type: 'pseudo'
    },
    'pseudocode': {
      provider: 'Interpréteur Pseudo-code (Navigateur)',
      type: 'pseudo'
    },
    'pseudo-code': {
      provider: 'Interpréteur Pseudo-code (Navigateur)',
      type: 'pseudo'
    },
    'sql': {
      provider: 'SQLite 3 (WebAssembly)',
      type: 'sql'
    }
  };

  function ExecutionRouter(options) {
    this.options = options || {};
    this.serverEngine = ServerEngine ? new ServerEngine(this.options.serverEndpoint || '/api/execute') : null;
    this.activeRunner = null;
    this.currentMode = null; // 'browser' | 'server'
  }

  /**
   * Vérifie si un langage peut être exécuté localement dans le navigateur.
   */
  ExecutionRouter.prototype.supportsBrowser = function (language) {
    if (!language) return false;
    var norm = String(language).toLowerCase().trim();
    return Boolean(BROWSER_LANGUAGES[norm]);
  };

  /**
   * Retourne les métadonnées de provenance (badge UI).
   */
  ExecutionRouter.prototype.getProvenanceInfo = function (language) {
    var norm = String(language || '').toLowerCase().trim();
    if (norm === 'analyse') {
      return {
        mode: 'server',
        label: 'Étude de cas',
        title: 'Évaluation méthodologique structurée sur le serveur.',
        icon: 'book'
      };
    }
    var isBrowser = this.supportsBrowser(language);
    if (isBrowser) {
      return {
        mode: 'browser',
        label: 'Navigateur',
        title: 'Exécuté localement dans votre navigateur — 0 latence, aucun quota consommé.',
        icon: 'lightning'
      };
    }
    return {
      mode: 'server',
      label: 'Serveur',
      title: 'Exécuté de manière isolée sur le serveur distant.',
      icon: 'cloud'
    };
  };

  /**
   * Exécute le code en sélectionnant automatiquement le moteur adapté.
   *
   * @param {string} language Identifiant du langage (python, javascript, c, php, etc.)
   * @param {string} code Code source
   * @param {string} stdin Entrée standard
   * @param {Object} options { timeoutMs, forceServer, ... }
   * @returns {Promise<Object>} Résultat standardisé
   */
  ExecutionRouter.prototype.execute = function (language, code, stdin, options) {
    var self = this;
    var opts = options || {};
    var normLang = String(language || 'python').toLowerCase().trim();

    this.cancel();

    // 1. Choix du moteur : navigateur/local vs serveur
    var browserConfig = BROWSER_LANGUAGES[normLang];
    var isBrowserEnv = typeof window !== 'undefined';
    var isWorkerAvailable = typeof Worker !== 'undefined';
    var isFetchMocked = isBrowserEnv && typeof window.fetch === 'function' && (
      Boolean(window.__FORCE_SERVER_EXEC__) ||
      !/\[native code\]/.test(Function.prototype.toString.call(window.fetch))
    );
    var canRunLocally = browserConfig && !opts.forceServer && !isFetchMocked && (
      browserConfig.type === 'pseudo' ||
      (isBrowserEnv && (browserConfig.type === 'sql' || (browserConfig.type === 'worker' && isWorkerAvailable)))
    );

    if (canRunLocally) {
      this.currentMode = 'browser';

      // Cas A : Pseudo-code
      if (browserConfig.type === 'pseudo' && PseudoCodeEngine) {
        return PseudoCodeEngine.execute(code, stdin, opts);
      }

      // Cas B : SQL WebAssembly
      if (browserConfig.type === 'sql' && SqlWasmEngine) {
        return SqlWasmEngine.execute(code, stdin, opts);
      }

      // Cas C : Web Worker (Python Skulpt ou JavaScript)
      if (browserConfig.type === 'worker' && WorkerRunner) {
        var runner = new WorkerRunner(browserConfig.workerUrl, {
          providerName: browserConfig.provider,
          timeoutMs: opts.timeoutMs || 6000
        });
        this.activeRunner = runner;

        return runner.run({
          code: code,
          stdin: stdin,
          language: normLang,
          options: opts
        }).then(function (result) {
          self.activeRunner = null;
          return result;
        }).catch(function (workerErr) {
          self.activeRunner = null;
          // Repli vers le serveur en cas d'impossibilité d'exécuter le worker
          if (self.serverEngine) {
            return self.serverEngine.execute(normLang, code, stdin, opts);
          }
          throw workerErr;
        });
      }
    }

    // 2. Moteur Serveur (/api/execute)
    this.currentMode = 'server';
    if (!this.serverEngine) {
      if (ServerEngine) this.serverEngine = new ServerEngine(this.options.serverEndpoint || '/api/execute');
      else {
        return Promise.reject(new Error('Moteur serveur indisponible'));
      }
    }

    return this.serverEngine.execute(normLang, code, stdin, opts).then(function (result) {
      self.currentMode = null;
      return result;
    });
  };

  /**
   * Annule immédiatement l'exécution en cours (worker ou requête réseau).
   */
  ExecutionRouter.prototype.cancel = function () {
    if (this.activeRunner) {
      try {
        this.activeRunner.terminate();
      } catch (e) {}
      this.activeRunner = null;
    }
    if (this.serverEngine) {
      try {
        this.serverEngine.cancel();
      } catch (e) {}
    }
    this.currentMode = null;
  };

  return ExecutionRouter;
});

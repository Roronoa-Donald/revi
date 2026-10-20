/**
 * Gestionnaire générique et sécurisé de Web Workers pour l'exécution de code.
 * Gère l'isolation, le délai d'expiration (timeout), l'annulation immédiate et le plafonnement des sorties.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./engine-interface'));
  } else {
    root.WorkerRunner = factory(root.ExecutionInterface);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (ExecutionInterface) {
  'use strict';

  var DEFAULT_TIMEOUT_MS = ExecutionInterface ? ExecutionInterface.DEFAULT_TIMEOUT_MS : 6000;
  var createResult = ExecutionInterface ? ExecutionInterface.createResult : function (r) { return r; };
  var STATUS = ExecutionInterface ? ExecutionInterface.STATUS : {
    SUCCESS: 'success',
    RUNTIME_ERROR: 'runtime_error',
    COMPILE_ERROR: 'compile_error',
    TIMEOUT: 'timeout',
    CANCELLED: 'cancelled'
  };

  function WorkerRunner(workerUrl, options) {
    this.workerUrl = workerUrl;
    this.options = options || {};
    this.activeWorker = null;
    this.timeoutTimer = null;
    this.currentReject = null;
    this.currentResolve = null;
  }

  /**
   * Lance l'exécution dans un Worker dédié.
   *
   * @param {Object} payload { code, stdin, language, options }
   * @returns {Promise<Object>} Résultat standardisé
   */
  WorkerRunner.prototype.run = function (payload) {
    var self = this;
    this.terminate(); // Arrête tout worker antérieur encore vivant

    var timeoutMs = (payload.options && payload.options.timeoutMs) || self.options.timeoutMs || DEFAULT_TIMEOUT_MS;
    var startTime = Date.now();

    return new Promise(function (resolve) {
      self.currentResolve = resolve;

      try {
        self.activeWorker = new Worker(self.workerUrl);
      } catch (workerErr) {
        return resolve(createResult({
          status: STATUS.RUNTIME_ERROR,
          stderr: 'Impossible d’initialiser l’environnement d’exécution local (Web Worker) : ' + (workerErr.message || workerErr),
          userMessage: 'Échec d’initialisation du Web Worker dans ce navigateur.',
          provenance: 'browser'
        }));
      }

      // Garde-fou d'interruption automatique sur dépassement de temps
      self.timeoutTimer = setTimeout(function () {
        var elapsed = (Date.now() - startTime) / 1000;
        self.terminate();
        resolve(createResult({
          status: STATUS.TIMEOUT,
          exitCode: 124,
          executionTime: elapsed,
          stderr: 'Délai d’exécution dépassé (' + (timeoutMs / 1000) + 's). Le programme s’est probablement bloqué dans une boucle infinie.',
          userMessage: 'Temps limite dépassé. Vérifiez vos boucles et conditions d’arrêt.',
          provenance: 'browser',
          provider: self.options.providerName || 'Navigateur (Web Worker)'
        }));
      }, timeoutMs);

      self.activeWorker.onmessage = function (event) {
        var data = event.data || {};
        if (data.type === 'DONE') {
          self.cleanup();
          var elapsed = (Date.now() - startTime) / 1000;
          var res = data.result || {};
          res.executionTime = typeof res.executionTime === 'number' ? res.executionTime : elapsed;
          res.provenance = 'browser';
          if (!res.provider) res.provider = self.options.providerName || 'Navigateur (Web Worker)';
          resolve(createResult(res));
        }
      };

      self.activeWorker.onerror = function (event) {
        self.cleanup();
        var elapsed = (Date.now() - startTime) / 1000;
        var msg = (event && (event.message || event.filename))
          ? ('Erreur interne du Worker : ' + (event.message || '') + ' (' + (event.filename || '') + ':' + (event.lineno || '') + ')')
          : 'Erreur inattendue dans le Web Worker.';
        resolve(createResult({
          status: STATUS.RUNTIME_ERROR,
          exitCode: 1,
          executionTime: elapsed,
          stderr: msg,
          userMessage: 'Une erreur est survenue lors de l’exécution locale.',
          provenance: 'browser',
          provider: self.options.providerName || 'Navigateur (Web Worker)'
        }));
      };

      // Démarrage de l'exécution
      self.activeWorker.postMessage({
        type: 'EXECUTE',
        code: payload.code,
        stdin: payload.stdin || '',
        options: payload.options || {}
      });
    });
  };

  /**
   * Interrompt immédiatement l'exécution en cours (ex: clic sur "Arrêter").
   */
  WorkerRunner.prototype.terminate = function () {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    if (this.activeWorker) {
      try {
        this.activeWorker.terminate();
      } catch (e) {
        // Ignorer
      }
      this.activeWorker = null;
    }
    if (this.currentResolve) {
      var resolve = this.currentResolve;
      this.currentResolve = null;
      resolve(createResult({
        status: STATUS.CANCELLED,
        exitCode: 130,
        stderr: 'Exécution interrompue à la demande de l’utilisateur.',
        userMessage: 'Exécution arrêtée.',
        provenance: 'browser',
        provider: this.options.providerName || 'Navigateur (Web Worker)'
      }));
    }
  };

  WorkerRunner.prototype.cleanup = function () {
    if (this.timeoutTimer) {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    if (this.activeWorker) {
      try {
        this.activeWorker.terminate();
      } catch (e) {}
      this.activeWorker = null;
    }
    this.currentResolve = null;
  };

  return WorkerRunner;
});

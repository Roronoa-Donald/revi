/**
 * Moteur d'exécution serveur (repli via /api/execute).
 * Utilisé pour les langages compilés (C, C++, Java) et interprétés serveur (PHP, Bash)
 * ou lorsque l'exécution locale n'est pas supportée.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('./engine-interface'));
  } else {
    root.ServerEngine = factory(root.ExecutionInterface);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (ExecutionInterface) {
  'use strict';

  var createResult = ExecutionInterface ? ExecutionInterface.createResult : function (r) { return r; };
  var STATUS = ExecutionInterface ? ExecutionInterface.STATUS : {
    SUCCESS: 'success',
    RUNTIME_ERROR: 'runtime_error',
    COMPILE_ERROR: 'compile_error',
    API_ERROR: 'api_error',
    CANCELLED: 'cancelled'
  };

  function ServerEngine(endpoint) {
    this.endpoint = endpoint || '/api/execute';
    this.currentController = null;
  }

  function httpErrorMessage(status, data) {
    if (data && typeof data.error === 'string' && data.error) return data.error;
    if (status === 401) return 'Session requise. Veuillez vous connecter pour utiliser le serveur d’exécution.';
    if (status === 429) return 'Trop de demandes d’exécution. Limite quotidienne ou par minute atteinte.';
    if (status === 400) return 'Requête invalide ou langage non autorisé par le serveur.';
    if (status === 503) return 'Le service d’exécution serveur est temporairement indisponible.';
    if (status >= 500) return 'Erreur interne du service d’exécution serveur.';
    return 'Une erreur réseau est survenue.';
  }

  ServerEngine.prototype.execute = function (language, code, stdin, options) {
    var self = this;
    this.cancel();

    if (typeof AbortController !== 'undefined') {
      this.currentController = new AbortController();
    }
    var signal = this.currentController ? this.currentController.signal : undefined;
    var startTime = Date.now();

    return fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        language: language,
        code: code,
        stdin: stdin || ''
      }),
      signal: signal
    }).then(function (response) {
      return response.json().catch(function () { return null; }).then(function (data) {
        return { ok: response.ok, status: response.status, data: data };
      });
    }).then(function (res) {
      self.currentController = null;
      var elapsed = (Date.now() - startTime) / 1000;

      if (!res.ok) {
        var isLimit = res.status === 429;
        return createResult({
          status: isLimit ? STATUS.API_ERROR : STATUS.API_ERROR,
          exitCode: 1,
          executionTime: elapsed,
          stderr: httpErrorMessage(res.status, res.data),
          provenance: 'server',
          provider: (res.data && res.data.provider) || 'Serveur d’exécution',
          userMessage: httpErrorMessage(res.status, res.data),
          warnings: (res.data && res.data.warnings) || []
        });
      }

      var payload = res.data || {};
      return createResult({
        status: payload.status || STATUS.SUCCESS,
        stdout: payload.stdout || '',
        stderr: payload.stderr || '',
        compileError: payload.compileError || '',
        exitCode: typeof payload.exitCode === 'number' ? payload.exitCode : 0,
        executionTime: typeof payload.executionTime === 'number' ? payload.executionTime : elapsed,
        memory: payload.memory || null,
        provenance: 'server',
        provider: payload.provider || 'Serveur d’exécution',
        userMessage: payload.userMessage || (payload.status === STATUS.SUCCESS ? 'Exécution terminée sur le serveur.' : ''),
        warnings: payload.warnings || []
      });
    }).catch(function (fetchErr) {
      self.currentController = null;
      var elapsedErr = (Date.now() - startTime) / 1000;
      if (fetchErr && fetchErr.name === 'AbortError') {
        return createResult({
          status: STATUS.CANCELLED,
          exitCode: 130,
          executionTime: elapsedErr,
          stderr: 'Requête serveur annulée par l’utilisateur.',
          provenance: 'server',
          provider: 'Serveur d’exécution',
          userMessage: 'Exécution interrompue.'
        });
      }

      return createResult({
        status: STATUS.API_ERROR,
        exitCode: 1,
        executionTime: elapsedErr,
        stderr: 'Impossible de joindre le serveur d’exécution : ' + (fetchErr.message || fetchErr),
        provenance: 'server',
        provider: 'Serveur d’exécution',
        userMessage: 'Le serveur d’exécution distant est inaccessible.'
      });
    });
  };

  ServerEngine.prototype.cancel = function () {
    if (this.currentController) {
      try {
        this.currentController.abort();
      } catch (e) {}
      this.currentController = null;
    }
  };

  return ServerEngine;
});

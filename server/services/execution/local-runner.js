'use strict';

/**
 * Moteur d'exécution local embarqué (in-process).
 *
 * Permet au serveur de corriger les exercices Python (Skulpt), JavaScript (Node VM)
 * et Pseudo-code (AST) directement et de manière 100% autonome, sans dépendre
 * d'un service distant et sans générer de coût réseau ni de 503.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

let skulptCache = null;

function loadSkulpt() {
  if (skulptCache) return skulptCache;
  try {
    skulptCache = require('../../vendor/skulpt/skulpt-bundle');
    return skulptCache;
  } catch (e1) {
    try {
      const minPath = path.join(__dirname, '../../../assets/vendor/skulpt/skulpt.min.js');
      const stdPath = path.join(__dirname, '../../../assets/vendor/skulpt/skulpt-stdlib.js');
      if (fs.existsSync(minPath) && fs.existsSync(stdPath)) {
        skulptCache = {
          core: fs.readFileSync(minPath, 'utf8'),
          stdlib: fs.readFileSync(stdPath, 'utf8')
        };
        return skulptCache;
      }
    } catch (e2) {}
  }
  return null;
}

let pseudoEngineCache = null;

function loadPseudoCodeEngine() {
  if (pseudoEngineCache) return pseudoEngineCache;
  try {
    pseudoEngineCache = require('../../vendor/engines/pseudo-code-engine');
    return pseudoEngineCache;
  } catch (e1) {
    try {
      pseudoEngineCache = require('../../../assets/js/engines/pseudo-code-engine');
      return pseudoEngineCache;
    } catch (e2) {}
  }
  return null;
}

function canHandle(languageId) {
  const norm = String(languageId || '').toLowerCase().trim();
  return ['python', 'py', 'javascript', 'js', 'algo', 'pseudo-code', 'pseudocode'].includes(norm);
}

function runPython(code, stdin, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const sk = loadSkulpt();
    if (!sk) {
      return resolve({
        ok: false,
        httpStatus: 500,
        data: { stdout: '', stderr: 'Moteur Skulpt local introuvable', exit_code: 1 }
      });
    }

    let stdout = '';
    let stderr = '';
    const stdinLines = String(stdin || '').split('\n');
    let stdinIdx = 0;

    const sandbox = {
      window: {},
      document: { createElement: () => ({}) },
      navigator: { userAgent: 'node' },
      console: { log: () => {} }
    };

    try {
      vm.createContext(sandbox);
      vm.runInContext(sk.core, sandbox);
      vm.runInContext(sk.stdlib, sandbox);

      sandbox.Sk.configure({
        output: text => { stdout += text; },
        read: filename => {
          if (sandbox.Sk.builtinFiles && sandbox.Sk.builtinFiles['files'][filename]) {
            return sandbox.Sk.builtinFiles['files'][filename];
          }
          throw new Error('File not found: ' + filename);
        },
        inputfun: () => {
          if (stdinIdx < stdinLines.length) {
            return stdinLines[stdinIdx++];
          }
          return '';
        },
        inputfunTakesPrompt: false,
        execLimit: timeoutMs
      });

      sandbox.Sk.misceval.asyncToPromise(() => {
        return sandbox.Sk.importMainWithBody('<stdin>', false, code, true);
      }).then(() => {
        resolve({
          ok: true,
          httpStatus: 200,
          data: {
            stdout,
            stderr: '',
            exit_code: 0
          }
        });
      }).catch(err => {
        stderr = String(err && err.toString ? err.toString() : err);
        resolve({
          ok: true,
          httpStatus: 200,
          data: {
            stdout,
            stderr,
            exit_code: 1
          }
        });
      });
    } catch (err) {
      resolve({
        ok: true,
        httpStatus: 200,
        data: {
          stdout: '',
          stderr: String(err && err.message ? err.message : err),
          exit_code: 1
        }
      });
    }
  });
}

function runJavaScript(code, stdin, timeoutMs = 5000) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    const stdinLines = String(stdin || '').split('\n');
    let stdinIdx = 0;

    const sandbox = {
      console: {
        log: (...args) => { stdout += args.map(String).join(' ') + '\n'; },
        error: (...args) => { stderr += args.map(String).join(' ') + '\n'; },
        warn: (...args) => { stderr += args.map(String).join(' ') + '\n'; },
        info: (...args) => { stdout += args.map(String).join(' ') + '\n'; }
      },
      readline: () => {
        if (stdinIdx < stdinLines.length) return stdinLines[stdinIdx++];
        return '';
      },
      input: () => {
        if (stdinIdx < stdinLines.length) return stdinLines[stdinIdx++];
        return '';
      }
    };

    try {
      const script = new vm.Script(code);
      const context = vm.createContext(sandbox);
      script.runInContext(context, { timeout: timeoutMs });
      resolve({
        ok: true,
        httpStatus: 200,
        data: {
          stdout,
          stderr,
          exit_code: 0
        }
      });
    } catch (err) {
      stderr += (err && err.message ? err.message : String(err)) + '\n';
      resolve({
        ok: true,
        httpStatus: 200,
        data: {
          stdout,
          stderr,
          exit_code: 1
        }
      });
    }
  });
}

function runPseudoCode(code, stdin) {
  return new Promise((resolve) => {
    const engine = loadPseudoCodeEngine();
    if (!engine) {
      return resolve({
        ok: false,
        httpStatus: 500,
        data: { stdout: '', stderr: 'Moteur pseudo-code introuvable', exit_code: 1 }
      });
    }
    const res = engine.execute(code, stdin);
    resolve({
      ok: true,
      httpStatus: 200,
      data: {
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        exit_code: res.exitCode !== null ? res.exitCode : (res.ok ? 0 : 1)
      }
    });
  });
}

function run(payload) {
  const norm = String(payload.language || payload.languageId || '').toLowerCase().trim();
  if (norm === 'python' || norm === 'py') {
    return runPython(payload.code, payload.stdin);
  }
  if (norm === 'javascript' || norm === 'js') {
    return runJavaScript(payload.code, payload.stdin);
  }
  if (norm === 'algo' || norm === 'pseudo-code' || norm === 'pseudocode') {
    return runPseudoCode(payload.code, payload.stdin);
  }
  return Promise.resolve({
    ok: false,
    httpStatus: 400,
    data: { stdout: '', stderr: `Langage ${norm} non pris en charge par le runner local`, exit_code: 1 }
  });
}

module.exports = {
  canHandle,
  run,
  runPython,
  runJavaScript,
  runPseudoCode
};

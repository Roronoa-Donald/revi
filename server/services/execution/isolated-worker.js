'use strict';

/**
 * Worker d'exécution isolé (processus enfant jetable sans secrets ni privilèges).
 *
 * Exécuté via child_process.spawn avec :
 *   - env minimal (aucun secret du processus serveur Fastify)
 *   - --max-old-space-size=64
 *   - --permission et --allow-fs-read restreints aux seuls fichiers du worker et de Skulpt
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. Purge et verrouillage immédiats de process.env
for (const key of Object.keys(process.env)) {
  delete process.env[key];
}
try {
  Object.defineProperty(process, 'env', {
    value: Object.freeze(Object.create(null)),
    writable: false,
    configurable: false
  });
} catch {}

// 2. Désactivation des primitives réseau globales
try { globalThis.fetch = undefined; } catch {}
try { globalThis.WebSocket = undefined; } catch {}
try { globalThis.XMLHttpRequest = undefined; } catch {}

const MAX_OUTPUT_BYTES = 65536; // 64 Ko

function appendCapped(current, chunk, maxBytes = MAX_OUTPUT_BYTES) {
  const str = String(chunk || '');
  if (!str) return current;
  const currentBytes = Buffer.byteLength(current, 'utf8');
  if (currentBytes >= maxBytes) return current;
  const chunkBuf = Buffer.from(str, 'utf8');
  const remaining = maxBytes - currentBytes;
  if (chunkBuf.length <= remaining) {
    return current + str;
  }
  return current + chunkBuf.subarray(0, remaining).toString('utf8');
}

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

function executeJavaScriptIsolated(code, stdin, timeoutMs = 5000) {
  let stdout = '';
  let stderr = '';
  const stdinLines = String(stdin || '').split('\n');
  let stdinIdx = 0;

  const writeStdout = function (text) {
    try {
      stdout = appendCapped(stdout, typeof text === 'string' ? text : '');
    } catch {}
  };
  const writeStderr = function (text) {
    try {
      stderr = appendCapped(stderr, typeof text === 'string' ? text : '');
    } catch {}
  };
  const readLine = function () {
    try {
      if (stdinIdx < stdinLines.length) {
        return String(stdinLines[stdinIdx++]);
      }
    } catch {}
    return '';
  };

  Object.setPrototypeOf(writeStdout, null);
  Object.freeze(writeStdout);
  Object.setPrototypeOf(writeStderr, null);
  Object.freeze(writeStderr);
  Object.setPrototypeOf(readLine, null);
  Object.freeze(readLine);

  const rawSandbox = Object.create(null);
  rawSandbox.__writeStdout = writeStdout;
  rawSandbox.__writeStderr = writeStderr;
  rawSandbox.__readLine = readLine;

  const context = vm.createContext(rawSandbox, {
    codeGeneration: { strings: false, wasm: false }
  });

  // Bootstrap interne au contexte VM : aucune fonction hôte n'est exposée au code étudiant
  const bootstrapCode = `
    (function () {
      const out = globalThis.__writeStdout;
      const err = globalThis.__writeStderr;
      const rl = globalThis.__readLine;
      delete globalThis.__writeStdout;
      delete globalThis.__writeStderr;
      delete globalThis.__readLine;
      Object.setPrototypeOf(globalThis, null);

      function formatArgs(args) {
        const parts = [];
        for (let i = 0; i < args.length; i++) {
          try {
            parts.push(String(args[i]));
          } catch (e) {
            parts.push('[Object]');
          }
        }
        return parts.join(' ') + '\\n';
      }

      const logFn = function (...args) { out(formatArgs(args)); };
      const errFn = function (...args) { err(formatArgs(args)); };
      const rlFn = function () {
        const val = rl();
        return typeof val === 'string' ? val : '';
      };

      globalThis.console = {
        log: logFn,
        info: logFn,
        error: errFn,
        warn: errFn
      };
      globalThis.readline = rlFn;
      globalThis.input = rlFn;
      globalThis.process = undefined;
      globalThis.require = undefined;
      globalThis.fetch = undefined;
      globalThis.WebSocket = undefined;
      globalThis.XMLHttpRequest = undefined;
    })();
  `;

  try {
    vm.runInContext(bootstrapCode, context, { timeout: 1000 });
    const script = new vm.Script(String(code || ''), { filename: 'program.js' });
    script.runInContext(context, { timeout: timeoutMs });
    return {
      ok: true,
      httpStatus: 200,
      data: {
        stdout,
        stderr,
        exit_code: 0
      }
    };
  } catch (err) {
    const msg = (err && err.message ? err.message : String(err)) + '\n';
    stderr = appendCapped(stderr, msg);
    return {
      ok: true,
      httpStatus: 200,
      data: {
        stdout,
        stderr,
        exit_code: 1
      }
    };
  }
}

function executePythonIsolated(code, stdin, timeoutMs = 6000) {
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
        output: text => {
          stdout = appendCapped(stdout, text);
        },
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
        return sandbox.Sk.importMainWithBody('<stdin>', false, String(code || ''), true);
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
        stderr = appendCapped('', String(err && err.toString ? err.toString() : err));
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
          stderr: appendCapped('', String(err && err.message ? err.message : err)),
          exit_code: 1
        }
      });
    }
  });
}

async function main() {
  let rawInput = '';
  for await (const chunk of process.stdin) {
    rawInput += chunk.toString('utf8');
  }

  let payload = {};
  try {
    payload = JSON.parse(rawInput || '{}');
  } catch {
    process.stdout.write(JSON.stringify({
      ok: false,
      httpStatus: 400,
      data: { stdout: '', stderr: 'Payload JSON invalide', exit_code: 1 }
    }));
    return;
  }

  const lang = String(payload.language || '').toLowerCase().trim();
  const code = typeof payload.code === 'string' ? payload.code : '';
  const stdin = typeof payload.stdin === 'string' ? payload.stdin : '';
  const timeoutMs = Number(payload.timeoutMs) > 0 ? Number(payload.timeoutMs) : 5000;

  let result;
  if (lang === 'javascript' || lang === 'js') {
    result = executeJavaScriptIsolated(code, stdin, timeoutMs);
  } else if (lang === 'python' || lang === 'py') {
    result = await executePythonIsolated(code, stdin, timeoutMs);
  } else {
    result = {
      ok: false,
      httpStatus: 400,
      data: { stdout: '', stderr: `Langage non supporté par isolated-worker: ${lang}`, exit_code: 1 }
    };
  }

  process.stdout.write(JSON.stringify(result));
}

main().catch((err) => {
  process.stdout.write(JSON.stringify({
    ok: true,
    httpStatus: 200,
    data: {
      stdout: '',
      stderr: String(err && err.message ? err.message : err),
      exit_code: 1
    }
  }));
});

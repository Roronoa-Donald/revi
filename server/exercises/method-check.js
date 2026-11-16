'use strict';

const { randomBytes } = require('node:crypto');
const { LIMITS, normalizeOutput } = require('../services/execution');
const PseudoCodeEngine = require('../../assets/js/engines/pseudo-code-engine');

const methodExercises = Object.freeze(['algo-c6-e3', 'algo-c9-e1', 'algo-c9-e3', 'algo-c10-e3']);
const BUILTIN_NAMES = new Set(['longueur', 'formater', 'abs']);
const COMPARISON_OPS = new Set(['<', '<=', '>', '>=', '==', '!=']);
const LOOP_TYPES = new Set(['ForStatement', 'WhileStatement', 'RepeatStatement']);

function seededShuffle(values, seedHex) {
  const arr = [...values];
  for (let i = arr.length - 1; i > 0; i--) {
    const byteIndex = (i * 2) % seedHex.length;
    const raw = parseInt(seedHex.slice(byteIndex, byteIndex + 4), 16) || i;
    const j = raw % (i + 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function probeInputFor(exerciseId, seed) {
  if (exerciseId === 'algo-c6-e3') {
    const perm = seededShuffle([1, 2, 3, 4, 5, 6], seed);
    return `${perm.length}\n${perm.join('\n')}`;
  }
  if (exerciseId === 'algo-c9-e1') {
    const perm = seededShuffle([1, 2, 3, 4, 5], seed);
    return `${perm.length}\n${perm.join('\n')}`;
  }
  if (exerciseId === 'algo-c9-e3') return '2\n4\n84\n30';
  if (exerciseId === 'algo-c10-e3') return '4\n3\n3\n3\n3';
  return '';
}

function walkExpr(expr, onExpr) {
  if (!expr || typeof expr !== 'object') return;
  onExpr(expr);
  switch (expr.type) {
    case 'BinaryExpression':
      walkExpr(expr.left, onExpr);
      walkExpr(expr.right, onExpr);
      break;
    case 'UnaryExpression':
      walkExpr(expr.argument, onExpr);
      break;
    case 'IndexExpression':
      for (const idx of expr.indices || []) walkExpr(idx, onExpr);
      break;
    case 'CallExpression':
      for (const arg of expr.args || []) walkExpr(arg, onExpr);
      break;
    default:
      break;
  }
}

function walkStatements(stmts, onStmt, onExpr, depth = 0) {
  for (const stmt of stmts || []) {
    if (!stmt || typeof stmt !== 'object') continue;
    onStmt(stmt, depth);
    const nextDepth = LOOP_TYPES.has(stmt.type) ? depth + 1 : depth;
    switch (stmt.type) {
      case 'TableauDeclaration':
        for (const dim of stmt.dimensions || []) walkExpr(dim, onExpr);
        break;
      case 'PrintStatement':
        for (const arg of stmt.args || []) walkExpr(arg, onExpr);
        break;
      case 'ReadStatement':
        for (const target of stmt.targets || []) {
          for (const idx of target.indices || []) walkExpr(idx, onExpr);
        }
        break;
      case 'AssignmentStatement':
        walkExpr(stmt.value, onExpr);
        break;
      case 'IndexedAssignmentStatement':
        for (const idx of stmt.indices || []) walkExpr(idx, onExpr);
        walkExpr(stmt.value, onExpr);
        break;
      case 'IfStatement':
        walkExpr(stmt.condition, onExpr);
        walkStatements(stmt.thenBranch, onStmt, onExpr, depth);
        if (stmt.elseBranch) walkStatements(stmt.elseBranch, onStmt, onExpr, depth);
        break;
      case 'ForStatement':
        walkExpr(stmt.start, onExpr);
        walkExpr(stmt.end, onExpr);
        if (stmt.step) walkExpr(stmt.step, onExpr);
        walkStatements(stmt.body, onStmt, onExpr, nextDepth);
        break;
      case 'WhileStatement':
      case 'RepeatStatement':
        walkExpr(stmt.condition, onExpr);
        walkStatements(stmt.body, onStmt, onExpr, nextDepth);
        break;
      case 'ReturnStatement':
        walkExpr(stmt.value, onExpr);
        break;
      case 'ExpressionStatement':
        walkExpr(stmt.expression, onExpr);
        break;
      default:
        break;
    }
  }
}

function parsePseudoAst(code) {
  const lexer = new PseudoCodeEngine.Lexer(code);
  const tokens = lexer.tokenize();
  const parser = new PseudoCodeEngine.Parser(tokens);
  return parser.parse();
}

function validateStaticMethod(exerciseId, ast) {
  const functionsByName = new Map();
  for (const fn of ast.functions || []) {
    const key = fn.name.toLowerCase();
    if (functionsByName.has(key) || BUILTIN_NAMES.has(key)) {
      return { ok: false, reason: 'fonctions_dupliquees' };
    }
    functionsByName.set(key, fn);
  }

  if (exerciseId === 'algo-c6-e3' || exerciseId === 'algo-c9-e1') {
    let maxLoopDepth = 0;
    let hasRead = false;
    let hasIndexedWrite = false;
    const allBodies = [...(ast.body || []), ...(ast.functions || []).flatMap(f => f.body || [])];
    walkStatements(allBodies, (stmt, depth) => {
      if (LOOP_TYPES.has(stmt.type)) maxLoopDepth = Math.max(maxLoopDepth, depth + 1);
      if (stmt.type === 'ReadStatement') hasRead = true;
      if (stmt.type === 'IndexedAssignmentStatement') hasIndexedWrite = true;
    }, () => {});
    if (maxLoopDepth < 2 || !hasRead || !hasIndexedWrite) {
      return { ok: false, reason: 'structure_tri_absente' };
    }
    return { ok: true };
  }

  if (exerciseId === 'algo-c9-e3') {
    for (const req of ['puissance', 'pgcd']) {
      const fn = functionsByName.get(req);
      if (!fn) return { ok: false, reason: `fonction_${req}_absente` };
      let hasLoop = false;
      let hasSelfCall = false;
      walkStatements(fn.body, stmt => {
        if (LOOP_TYPES.has(stmt.type)) hasLoop = true;
      }, expr => {
        if (expr.type === 'CallExpression' && expr.name.toLowerCase() === req) hasSelfCall = true;
      });
      if (hasLoop) return { ok: false, reason: `boucle_dans_${req}` };
      if (!hasSelfCall) return { ok: false, reason: `recursion_absente_${req}` };
    }
    return { ok: true };
  }

  if (exerciseId === 'algo-c10-e3') {
    const required = ['attente_totale', 'temps_moyen'];
    for (const req of required) {
      const fn = functionsByName.get(req);
      if (!fn) return { ok: false, reason: `fonction_${req}_absente` };
      const locals = new Set(fn.params.map(p => p.toLowerCase()));
      walkStatements(fn.body, stmt => {
        if (stmt.type === 'AssignmentStatement') locals.add(stmt.variable.toLowerCase());
        if (stmt.type === 'ForStatement') locals.add(stmt.variable.toLowerCase());
        if (stmt.type === 'TableauDeclaration') locals.add(stmt.name.toLowerCase());
        if (stmt.type === 'ReadStatement') {
          for (const t of stmt.targets || []) {
            if (!t.indices) locals.add(t.name.toLowerCase());
          }
        }
      }, () => {});

      let usesGlobal = false;
      walkStatements(fn.body, stmt => {
        if (stmt.type === 'IndexedAssignmentStatement' && !locals.has(stmt.name.toLowerCase())) usesGlobal = true;
      }, expr => {
        if ((expr.type === 'Identifier' || expr.type === 'IndexExpression') && !locals.has(expr.name.toLowerCase())) {
          usesGlobal = true;
        }
      });
      if (usesGlobal) return { ok: false, reason: `variable_globale_dans_${req}` };
    }

    const called = new Set();
    let nonReadLoopInMain = false;
    walkStatements(ast.body, stmt => {
      if (LOOP_TYPES.has(stmt.type)) {
        const inner = [];
        walkStatements(stmt.body, s => inner.push(s.type), () => {});
        if (!inner.length || inner.some(t => t !== 'ReadStatement')) nonReadLoopInMain = true;
      }
    }, expr => {
      if (expr.type === 'CallExpression') called.add(expr.name.toLowerCase());
    });
    if (nonReadLoopInMain) return { ok: false, reason: 'boucle_calcul_hors_fonction' };
    if (!called.has('attente_totale') || !called.has('temps_moyen')) {
      return { ok: false, reason: 'appel_fonction_absent' };
    }
    return { ok: true };
  }

  return { ok: false, reason: 'exercice_inconnu' };
}

function runInstrumented(ast, stdin) {
  const interp = new PseudoCodeEngine.Interpreter(String(stdin || ''));
  const stats = {
    arrayReads: 0,
    sortWrites: 0,
    comparisons: 0,
    calls: Object.create(null),
    recursiveCalls: Object.create(null),
    lastReturns: Object.create(null),
    stepsInsideFunctions: 0
  };
  let inRead = false;
  const callStack = [];

  const origExec = interp.execStatement.bind(interp);
  interp.execStatement = function (stmt) {
    if (callStack.length > 0) stats.stepsInsideFunctions++;
    if (stmt && stmt.type === 'ReadStatement') {
      inRead = true;
      try { return origExec(stmt); }
      finally { inRead = false; }
    }
    return origExec(stmt);
  };

  const origReadIndex = interp.readIndex.bind(interp);
  interp.readIndex = function (name, indices, node) {
    stats.arrayReads++;
    return origReadIndex(name, indices, node);
  };

  const origWriteIndex = interp.writeIndex.bind(interp);
  interp.writeIndex = function (name, indices, value, node) {
    if (!inRead) stats.sortWrites++;
    return origWriteIndex(name, indices, value, node);
  };

  const origEvalExpr = interp.evalExpression.bind(interp);
  interp.evalExpression = function (expr) {
    if (expr && expr.type === 'BinaryExpression' && COMPARISON_OPS.has(expr.operator)) {
      let hasIndex = false;
      walkExpr(expr, node => { if (node.type === 'IndexExpression') hasIndex = true; });
      if (hasIndex) stats.comparisons++;
    }
    return origEvalExpr(expr);
  };

  const origCallFn = interp.callFunction.bind(interp);
  interp.callFunction = function (name, args, node) {
    const key = name.toLowerCase();
    const isUser = Boolean(this.functions[key]);
    if (isUser) {
      stats.calls[key] = (stats.calls[key] || 0) + 1;
      if (callStack.includes(key)) {
        stats.recursiveCalls[key] = (stats.recursiveCalls[key] || 0) + 1;
      }
      callStack.push(key);
    }
    try {
      const res = origCallFn(name, args, node);
      if (isUser) stats.lastReturns[key] = res;
      return res;
    } finally {
      if (isUser) callStack.pop();
    }
  };

  const output = interp.eval(ast);
  return { output, stats };
}

function verifyDynamicMethod(exerciseId, ast, seed, stdin) {
  try {
    if (exerciseId === 'algo-c6-e3') {
      const sortedProbe = runInstrumented(ast, '6\n1\n2\n3\n4\n5\n6');
      if (normalizeOutput(sortedProbe.output) !== '1 2 3 4 5 6') return { ok: false };
      if (sortedProbe.stats.comparisons < 15 || sortedProbe.stats.arrayReads < 15) return { ok: false };

      const reverseProbe = runInstrumented(ast, '6\n6\n5\n4\n3\n2\n1');
      if (normalizeOutput(reverseProbe.output) !== '1 2 3 4 5 6') return { ok: false };
      if (reverseProbe.stats.sortWrites > 10) return { ok: false };

      const seedInput = probeInputFor(exerciseId, seed);
      const seededProbe = runInstrumented(ast, seedInput);
      if (normalizeOutput(seededProbe.output) !== '1 2 3 4 5 6') return { ok: false };

      let mainRun = seededProbe;
      if (stdin !== undefined) {
        mainRun = runInstrumented(ast, stdin);
        const tokens = stdin.trim().split(/\s+/).filter(Boolean);
        const n = parseInt(tokens[0], 10);
        if (Number.isInteger(n) && n >= 2) {
          const minPairs = (n * (n - 1)) / 2;
          if (mainRun.stats.comparisons < minPairs || mainRun.stats.sortWrites > 2 * (n - 1)) {
            return { ok: false };
          }
        }
      }
      return {
        ok: true,
        output: mainRun.output,
        counts: {
          comparaisons: sortedProbe.stats.comparisons,
          ecritures_inverse: reverseProbe.stats.sortWrites
        }
      };
    }

    if (exerciseId === 'algo-c9-e1') {
      const reverseProbe = runInstrumented(ast, '5\n5\n4\n3\n2\n1');
      if (normalizeOutput(reverseProbe.output) !== '1 2 3 4 5\n4') return { ok: false };
      if (reverseProbe.stats.comparisons !== 10 || reverseProbe.stats.sortWrites !== 20) return { ok: false };

      const sortedProbe = runInstrumented(ast, '5\n1\n2\n3\n4\n5');
      if (normalizeOutput(sortedProbe.output) !== '1 2 3 4 5\n1') return { ok: false };
      if (sortedProbe.stats.comparisons < 4 || sortedProbe.stats.sortWrites !== 0) return { ok: false };

      const seedInput = probeInputFor(exerciseId, seed);
      const seededProbe = runInstrumented(ast, seedInput);

      let mainRun = seededProbe;
      if (stdin !== undefined) {
        mainRun = runInstrumented(ast, stdin);
        const tokens = stdin.trim().split(/\s+/).filter(Boolean);
        const n = parseInt(tokens[0], 10);
        if (Number.isInteger(n) && n >= 2 && mainRun.stats.comparisons < n - 1) {
          return { ok: false };
        }
      }
      return {
        ok: true,
        output: mainRun.output,
        counts: {
          inverse: { comparaisons: reverseProbe.stats.comparisons, affectations: reverseProbe.stats.sortWrites },
          arret: { comparaisons: sortedProbe.stats.comparisons, affectations: sortedProbe.stats.sortWrites }
        }
      };
    }

    if (exerciseId === 'algo-c9-e3') {
      const probe = runInstrumented(ast, probeInputFor(exerciseId, seed));
      if (normalizeOutput(probe.output) !== '16\n6') return { ok: false };
      if (!(probe.stats.recursiveCalls.puissance > 0) || !(probe.stats.recursiveCalls.pgcd > 0)) {
        return { ok: false };
      }

      let mainRun = probe;
      if (stdin !== undefined) {
        mainRun = runInstrumented(ast, stdin);
        const nums = stdin.trim().split(/\s+/).map(Number);
        const exp = nums[1];
        const b = nums[3];
        if (!(mainRun.stats.calls.puissance > 0) || !(mainRun.stats.calls.pgcd > 0)) return { ok: false };
        if (Number.isFinite(exp) && exp > 0 && !(mainRun.stats.recursiveCalls.puissance > 0)) return { ok: false };
        if (Number.isFinite(b) && b !== 0 && !(mainRun.stats.recursiveCalls.pgcd > 0)) return { ok: false };
      }
      return {
        ok: true,
        output: mainRun.output,
        counts: { appels_recursifs: mainRun.stats.recursiveCalls }
      };
    }

    if (exerciseId === 'algo-c10-e3') {
      const probe = runInstrumented(ast, probeInputFor(exerciseId, seed));
      if (normalizeOutput(probe.output) !== '18\n4.50') return { ok: false };
      if (!(probe.stats.calls.attente_totale > 0) || !(probe.stats.calls.temps_moyen > 0)) return { ok: false };
      if (probe.stats.stepsInsideFunctions <= 0) return { ok: false };

      let mainRun = probe;
      if (stdin !== undefined) {
        mainRun = runInstrumented(ast, stdin);
        if (!(mainRun.stats.calls.attente_totale > 0) || !(mainRun.stats.calls.temps_moyen > 0)) return { ok: false };
        const lines = normalizeOutput(mainRun.output).split('\n').filter(Boolean);
        const expectedLines = [
          String(mainRun.stats.lastReturns.attente_totale),
          Number(mainRun.stats.lastReturns.temps_moyen).toFixed(2)
        ];
        if (lines.length < 2 || lines[0] !== expectedLines[0] || lines[1] !== expectedLines[1]) {
          return { ok: false };
        }
      }
      return {
        ok: true,
        output: mainRun.output,
        counts: {
          appels: mainRun.stats.calls,
          operations: mainRun.stats.stepsInsideFunctions
        }
      };
    }
  } catch {
    return { ok: false };
  }
  return { ok: false };
}

function buildMethodProbe(exerciseId, code, seed = randomBytes(16).toString('hex'), stdin) {
  if (!methodExercises.includes(exerciseId) || typeof code !== 'string') throw new TypeError('Méthode inconnue.');
  if (!/^[a-f0-9]{32}$/.test(seed)) throw new TypeError('Graine invalide.');
  if (stdin !== undefined && typeof stdin !== 'string') throw new TypeError('Entrée invalide.');
  if (Buffer.byteLength(code, 'utf8') > LIMITS.code) return null;
  return JSON.stringify({ exerciseId, source: code, seed, stdin: stdin ?? probeInputFor(exerciseId, seed) });
}

async function checkMethod(exerciseId, code, execute, stdin, seed = randomBytes(16).toString('hex')) {
  const probe = buildMethodProbe(exerciseId, code, seed, stdin);
  if (!probe) return { status: 'not_evaluable' };

  let ast;
  try {
    ast = parsePseudoAst(code);
  } catch {
    return { status: 'not_evaluable', reason: 'syntaxe' };
  }

  const staticCheck = validateStaticMethod(exerciseId, ast);
  if (!staticCheck.ok) {
    return { status: 'not_evaluable', reason: staticCheck.reason };
  }

  const dynamicCheck = verifyDynamicMethod(exerciseId, ast, seed, stdin);
  if (!dynamicCheck.ok) {
    return { status: 'not_evaluable', reason: 'methode_non_conforme' };
  }

  const targetStdin = stdin !== undefined ? stdin : probeInputFor(exerciseId, seed);
  if (typeof execute === 'function') {
    const outcome = await execute({ language: 'algo', code, stdin: targetStdin });
    if (!outcome || !outcome.ok || typeof outcome.stdout !== 'string') {
      return { status: 'unavailable' };
    }
    if (normalizeOutput(outcome.stdout) !== normalizeOutput(dynamicCheck.output)) {
      return { status: 'unavailable' };
    }
    return {
      schema: 'revi-methode-v2',
      status: 'verified',
      output: outcome.stdout,
      counts: dynamicCheck.counts
    };
  }

  return {
    schema: 'revi-methode-v2',
    status: 'verified',
    output: dynamicCheck.output,
    counts: dynamicCheck.counts
  };
}

module.exports = { methodExercises, buildMethodProbe, checkMethod };

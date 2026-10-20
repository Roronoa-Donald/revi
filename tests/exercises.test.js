/**
 * tests/exercises.test.js — catalogue d'exercices, correction et garde-fous API.
 * Les tests cachés ne doivent jamais atteindre le navigateur : c'est vérifié ici
 * sur les fichiers réellement servis, pas seulement sur l'objet de projection.
 */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const exercises = require('../server/exercises');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const execution = require('../server/services/execution');
const budget = require('../server/services/execution/budget');

const courseConfig = require('../server/exercises/course-config');

const ROOT = path.resolve(__dirname, '..');

function normalize(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

/** Décode les entités écrites par le générateur dans les attributs. */
function decodeAttr(value) {
  return String(value)
    .replace(/&#10;/g, '\n')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// ========================
// Intégrité du catalogue
// ========================

test('catalogue : aucune anomalie de structure', () => {
  assert.deepStrictEqual(exercises.validateCatalogue(), []);
});

test('catalogue : trois exercices minimum par module', () => {
  for (const [courseId, config] of Object.entries(courseConfig)) {
    const byChapter = new Map();
    for (const ex of exercises.listExercises().filter(e => e.course === courseId)) {
      byChapter.set(ex.chapter, (byChapter.get(ex.chapter) || 0) + 1);
    }
    for (let chapter = 1; chapter <= config.chapters; chapter++) {
      assert.ok(
        byChapter.get(chapter) >= 3,
        `${courseId} module ${chapter} : ${byChapter.get(chapter) || 0} exercice(s)`
      );
    }
  }
});

test('catalogue : chaque exercice a des tests cachés distincts de l’exemple', () => {
  for (const ex of exercises.listExercises()) {
    const examples = ex.examples.map(e => `${e.stdin}|${e.expected}`);
    for (const test_ of ex.tests) {
      assert.ok(
        !examples.includes(`${test_.stdin}|${test_.expected}`),
        `${ex.id} : un test caché recopie l’exemple visible`
      );
    }
    const stderrs = ex.tests.map(t => t.stdin || '');
    assert.strictEqual(new Set(stderrs).size, ex.tests.length, `${ex.id} : entrées de test dupliquées`);
  }
});

test('catalogue : les identifiants sont cohérents avec leur module', () => {
  for (const ex of exercises.listExercises()) {
    const config = courseConfig[ex.course];
    assert.ok(config, `${ex.id} : cours « ${ex.course} » absent de course-config`);
    assert.ok(
      ex.id.startsWith(`${config.idPrefix}-c${ex.chapter}-`),
      `${ex.id} : préfixe incohérent avec ${config.idPrefix}`
    );
  }
});

// ========================
// Projection vers le client
// ========================

test('projection : tests et corrigé ne sortent jamais du serveur', async () => {
  const ex = exercises.getExercise('py-c3-e1');
  const client = exercises.toClient(ex);

  assert.strictEqual(client.tests, undefined);
  assert.strictEqual(client.solution, undefined);
  assert.ok(client.starter && client.brief && client.title);
  assert.ok(Array.isArray(client.examples) && client.examples.length === 1);

  const serialized = JSON.stringify(client);
  assert.ok(!serialized.includes(normalize(ex.solution).slice(0, 40)));
  for (const test_ of ex.tests) {
    assert.ok(!serialized.includes(test_.stdin), `${ex.id} : entrée de test divulguée`);
  }
});

test('projection : les pages servies ne contiennent ni corrigé ni test caché', () => {
  for (const [courseId, config] of Object.entries(courseConfig)) {
    const chapterDir = path.join(ROOT, config.dir, config.chapterDir);
    const pages = fs.readdirSync(chapterDir).filter(f => /^chapitre\d+\.html$/.test(f));
    assert.strictEqual(pages.length, config.chapters, `${courseId} : ${config.chapters} chapitres attendus`);

    for (const file of pages) {
    const html = fs.readFileSync(path.join(chapterDir, file), 'utf8');
    const chapter = Number(file.match(/chapitre(\d+)/)[1]);
    const list = exercises.listExercises().filter(ex => ex.course === courseId && ex.chapter === chapter);
    assert.ok(list.length >= 3, `${file} : exercices manquants`);

    // Les seules données lisibles par le navigateur sont les attributs du
    // balisage et le code de départ. C'est là qu'une fuite se produirait ; la
    // prose pédagogique, elle, peut légitimement contenir les mêmes mots.
    const starters = [...html.matchAll(/<script type="text\/plain" data-lab-starter>([\s\S]*?)<\/script>/g)]
      .map(match => match[1]);
    const stdins = [...html.matchAll(/data-stdin="([^"]*)"/g)]
      .map(match => decodeAttr(match[1]));

    assert.strictEqual(starters.length, list.length, `${file} : nombre de codes de départ incohérent`);
    assert.strictEqual(stdins.length, list.length, `${file} : nombre d’entrées d’exemple incohérent`);

    for (const ex of list) {
      assert.ok(html.includes(`data-exercise="${ex.id}"`), `${file} : bloc ${ex.id} absent`);

      // Le corrigé complet ne doit apparaître nulle part. Le préambule de
      // lecture d'entrée est commun au code de départ : seule la solution
      // entière constitue une fuite.
      assert.ok(
        !normalize(html).includes(normalize(ex.solution)),
        `${file} : corrigé de ${ex.id} présent dans la page`
      );

      // L'entrée de chaque test caché doit être absente des attributs : seule
      // celle de l'exemple visible y figure.
      const visibleInputs = ex.examples.map(e => e.stdin);
      for (const test_ of ex.tests) {
        const stdin = test_.stdin || '';
        if (visibleInputs.includes(stdin)) continue;
        assert.ok(!stdins.includes(stdin), `${file} : entrée du test « ${test_.label} » divulguée`);
        // Une entrée d'un seul caractère (« 0 », « 1 ») apparaît forcément dans
        // un code de départ : seul un motif multi-ligne est discriminant.
        if (stdin.includes('\n')) {
          assert.ok(!starters.some(code => code.includes(stdin)),
            `${file} : entrée du test « ${test_.label} » présente dans un code de départ`);
        }
      }

      // Et chaque code de départ doit être celui de l'exercice, pas un autre.
      const starter = starters.find(code => code.includes(ex.starter.split('\n')[0].trim()));
      assert.ok(starter, `${file} : code de départ de ${ex.id} introuvable`);
    }
    }
  }
});

test('génération : les pages servies correspondent au catalogue', () => {
  // Même principe que le contrôle de synchronisation des cours : si une fiche
  // d'exercice change sans que les pages soient régénérées, l'atelier affiche
  // un énoncé qui ne correspond plus à ce que le serveur corrige.
  const result = spawnSync(process.execPath, [path.join(ROOT, 'scripts', 'generate-code-labs.js'), '--check'], {
    encoding: 'utf8'
  });
  assert.strictEqual(result.status, 0, `scripts/generate-code-labs.js --check a échoué :\n${result.stderr || result.stdout}`);
});

// ========================
// Moteur de correction
// ========================

test('correction : tous les tests passent', async () => {
  const ex = exercises.getExercise('py-c1-e1');
  const expected = ex.tests.map(t => t.expected);
  let index = 0;

  const report = await runTests(ex, 'code', {
    execute: async () => ({ ok: true, status: 'success', stdout: expected[index++], stderr: '' })
  });

  assert.strictEqual(report.ok, true);
  assert.strictEqual(report.passed, ex.tests.length);
  assert.strictEqual(report.total, ex.tests.length);
  assert.strictEqual(report.stop, null);
  assert.ok(report.results.every(r => r.ok));
});

test('correction : mauvais résultat → arrêt immédiat et diagnostic', async () => {
  const ex = exercises.getExercise('py-c1-e1');
  let calls = 0;

  const report = await runTests(ex, 'code', {
    execute: async () => {
      calls++;
      return { ok: true, status: 'success', stdout: 'mauvais', stderr: '' };
    }
  });

  assert.strictEqual(calls, 1, 'on ne consomme pas de quota pour des tests déjà perdus');
  assert.strictEqual(report.passed, 0);
  assert.strictEqual(report.total, ex.tests.length);
  assert.strictEqual(report.stop.reason, 'wrong_output');
  assert.strictEqual(report.stop.expected, ex.tests[0].expected);
  assert.strictEqual(report.stop.actual, 'mauvais');
  assert.strictEqual(report.stop.input, ex.tests[0].stdin);
});

test('correction : erreur de compilation → un seul appel', async () => {
  const ex = exercises.getExercise('py-c6-e1');
  let calls = 0;

  const report = await runTests(ex, 'code', {
    execute: async () => {
      calls++;
      return { ok: false, status: 'compile_error', stdout: '', stderr: '', compileError: 'SyntaxError' };
    }
  });

  assert.strictEqual(calls, 1);
  assert.strictEqual(report.stop.reason, 'compile_error');
  assert.strictEqual(report.stop.compileError, 'SyntaxError');
  assert.strictEqual(report.passed, 0);
});

test('correction : erreur d’exécution remontée telle quelle', async () => {
  const ex = exercises.getExercise('py-c3-e2');
  const report = await runTests(ex, 'code', {
    execute: async () => ({
      ok: false,
      status: 'runtime_error',
      stdout: '',
      stderr: 'ZeroDivisionError: division by zero',
      exitCode: 1
    })
  });

  assert.strictEqual(report.stop.reason, 'runtime_error');
  assert.ok(report.stop.stderr.includes('ZeroDivisionError'));
  assert.strictEqual(report.stop.exitCode, 1);
});

test('correction : les sorties sont comparées après normalisation', async () => {
  const ex = exercises.getExercise('py-c1-e2');
  const attendu = ex.tests[0].expected;

  // Tolérance : espaces de fin de ligne, sauts de ligne de bord, retours chariot.
  // L'indentation de début de ligne est conservée : elle peut être signifiante.
  const bruit = attendu + '  \r\n\r\n';
  const report = await runTests(ex, 'code', {
    execute: async () => ({ ok: true, status: 'success', stdout: bruit, stderr: '' })
  });
  assert.strictEqual(report.results[0].ok, true, 'espaces de fin et sauts de ligne parasites tolérés');

  const indented = await runTests(ex, 'code', {
    execute: async () => ({ ok: true, status: 'success', stdout: ' ' + attendu, stderr: '' })
  });
  assert.strictEqual(indented.results[0].ok, false, 'une indentation en trop reste une erreur de format');
});

test('correction : les tests s’exécutent en séquence, jamais en parallèle', async () => {
  const ex = exercises.getExercise('py-c1-e3');
  const expected = ex.tests.map(t => t.expected);
  let index = 0;
  let active = 0;
  let maxActive = 0;

  await runTests(ex, 'code', {
    execute: async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await new Promise(resolve => setTimeout(resolve, 5));
      active--;
      return { ok: true, status: 'success', stdout: expected[index++], stderr: '' };
    }
  });

  assert.strictEqual(maxActive, 1, 'le plan gratuit n’autorise que 2 requêtes/seconde : pas de rafale');
});

test('correction : nombre d’appels borné par MAX_TESTS', async () => {
  const ex = { ...exercises.getExercise('py-c3-e3'), tests: new Array(10).fill({ stdin: '', expected: 'oui' }) };
  let calls = 0;
  await runTests(ex, 'code', {
    execute: async () => { calls++; return { ok: true, status: 'success', stdout: 'oui', stderr: '' }; }
  });
  assert.strictEqual(calls, MAX_TESTS);
});

test('correction : panne du service → pas d’échec imputé à l’élève', async () => {
  const ex = exercises.getExercise('py-c1-e1');
  const report = await runTests(ex, 'code', {
    execute: async () => {
      const error = new Error('boom');
      error.code = 'upstream_unreachable';
      error.userMessage = 'Service indisponible.';
      throw error;
    }
  });

  assert.strictEqual(report.ok, false);
  assert.strictEqual(report.error.code, 'upstream_unreachable');
  assert.strictEqual(report.passed, 0);
  assert.strictEqual(report.results.length, 0);
});

test('correction : exercice inconnu', () => {
  assert.strictEqual(exercises.getExercise('inconnu'), null);
  assert.strictEqual(exercises.getExercise(''), null);
  assert.strictEqual(exercises.getExercise(null), null);
  // Tentative de traversée de registre.
  assert.strictEqual(exercises.getExercise('__proto__'), null);
});

// ========================
// Erreurs d'exécution → HTTP
// ========================

test('errorToHttp : chaque code d’erreur a une réponse HTTP dédiée', () => {
  const cases = [
    ['invalid_request', 400],
    ['not_configured', 503],
    ['timeout', 504],
    ['upstream_unreachable', 502]
  ];
  for (const [code, status] of cases) {
    const error = new Error('interne');
    error.code = code;
    assert.strictEqual(execution.errorToHttp(error).statusCode, status, code);
  }
  // Aucun détail technique ne doit atteindre l'élève.
  const mapped = execution.errorToHttp(Object.assign(new Error('ECONNREFUSED 10.0.0.1:443'), { code: 'timeout' }));
  assert.ok(!mapped.message.includes('ECONNREFUSED'));
});

// ========================
// Garde-fous des routes API
// ========================

test('API : /api/execute exige une session', async () => {
  const { buildApp } = require('../server/app');
  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'POST',
      url: '/api/execute',
      payload: { language: 'python', code: 'print(1)' }
    });
    assert.strictEqual(res.statusCode, 401);
  } finally {
    await app.close();
  }
});

test('API : langage refusé avant tout appel sortant', async () => {
  const jwt = require('jsonwebtoken');
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret-de-test';
  const token = jwt.sign({ userId: 'u-test', email: 'test@example.com' }, process.env.JWT_SECRET);

  const { buildApp } = require('../server/app');
  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'POST',
      url: '/api/execute',
      cookies: { auth_token: token },
      payload: { language: 'brainfuck', code: '+++++.' }
    });
    assert.strictEqual(res.statusCode, 400);
    assert.ok(/langage/i.test(res.json().error));
  } finally {
    await app.close();
  }
});

test('API : soumission sur un exercice inconnu', async () => {
  const jwt = require('jsonwebtoken');
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret-de-test';
  const token = jwt.sign({ userId: 'u-test', email: 'test@example.com' }, process.env.JWT_SECRET);

  const { buildApp } = require('../server/app');
  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      cookies: { auth_token: token },
      payload: { exerciseId: 'py-inexistant', code: 'print(1)' }
    });
    assert.strictEqual(res.statusCode, 400);
  } finally {
    await app.close();
  }
});

test('API : la clé du fournisseur n’est jamais renvoyée au navigateur', async () => {
  const jwt = require('jsonwebtoken');
  process.env.JWT_SECRET = process.env.JWT_SECRET || 'secret-de-test';
  const token = jwt.sign({ userId: 'u-test', email: 'test@example.com' }, process.env.JWT_SECRET);

  // Sans clé configurée, la route répond 503 : le service est annoncé comme
  // indisponible, jamais comme « clé manquante » avec des détails internes.
  const saved = process.env.OANOR_API_KEY;
  delete process.env.OANOR_API_KEY;
  budget.reset();

  const { buildApp } = require('../server/app');
  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'POST',
      url: '/api/execute',
      cookies: { auth_token: token },
      payload: { language: 'python', code: 'print(1)' }
    });
    assert.strictEqual(res.statusCode, 503);
    const body = JSON.stringify(res.json());
    assert.ok(!/oanor_live|api[_-]?key/i.test(body), 'aucune référence à la clé ne doit sortir');
  } finally {
    await app.close();
    if (saved) process.env.OANOR_API_KEY = saved;
    budget.reset();
  }
});

test('API /code-help : authentification requise pour les chapitres 2+', async () => {
  const { buildApp } = require('../server/app');
  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'POST',
      url: '/api/code-help',
      payload: { exerciseId: 'py-c2-e1', code: 'print(1)' }
    });
    assert.strictEqual(res.statusCode, 401);
  } finally {
    await app.close();
  }
});

test('API /code-help : libre pour le chapitre 1 et transmet les variables sans erreur 500', async () => {
  const { buildApp } = require('../server/app');
  const aiPool = require('../server/services/ai-pool');
  const originalChat = aiPool.chatCompletion;

  let captured = null;
  aiPool.chatCompletion = async (opts) => {
    captured = opts;
    return {
      data: {
        choices: [{
          message: {
            content: 'Votre boucle for contient une faute de syntaxe sur les deux-points.\n```python\nfor i in range(10):\n```\nVérifiez la ponctuation.'
          }
        }]
      }
    };
  };

  const app = buildApp({ logger: false });
  try {
    const res = await app.inject({
      method: 'POST',
      url: '/api/code-help',
      payload: {
        exerciseId: 'py-c1-e1',
        code: 'for i in range(10)\n  print(i)',
        stdout: '',
        stderr: 'SyntaxError: expected \':\'',
        compileError: '',
        question: 'Pourquoi ma boucle échoue ?'
      }
    });

    assert.strictEqual(res.statusCode, 200);
    const body = res.json();
    assert.ok(body.explanation.includes('faute de syntaxe'), 'explication présente');
    assert.strictEqual(body.stripped, 1, 'le bloc de code a été retiré');
    assert.ok(!body.explanation.includes('```'), 'aucun bloc markdown ne subsiste');
    assert.ok(captured, 'aiPool.chatCompletion a bien été invoqué');
    assert.strictEqual(captured.task, 'code-help');
  } finally {
    aiPool.chatCompletion = originalChat;
    await app.close();
  }
});


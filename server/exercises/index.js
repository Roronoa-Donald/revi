/**
 * Registre des exercices de code.
 *
 * Les fiches complètes, tests cachés et corrigés compris, vivent côté serveur.
 * `toClient()` est le seul passage autorisé vers le navigateur : il retire
 * systématiquement `tests` et `solution`.
 */

const RAW_EXERCISES = {
  'b1-python': require('./b1-python'),
  'b1-c-cpp': require('./b1-c-cpp'),
  'b1-algo': require('./b1-algo'),
  'b1-php': require('./b1-php'),
  'b1-algebre': require('./b1-algebre'),
  'b1-stats': require('./b1-stats'),
  'b1-prog-web': require('./b1-prog-web'),
  'b1-robotique': require('./b1-robotique'),
  'b1-linux': require('./b1-linux'),
  'b1-git': require('./b1-git'),
  'b1-cyber': require('./b1-cyber'),
  'b1-merise': require('./b1-merise'),
  'b1-droit': require('./b1-droit'),
  'b1-anglais': require('./b1-anglais'),
  'b1-fr-pro': require('./b1-fr-pro'),
  'b1-reseaux': require('./b1-reseaux'),
  'b1-bureautique': require('./b1-bureautique'),
  'b1-ccna1': require('./b1-ccna1'),
  'b1-architecture': require('./b1-architecture'),
  'b1-admin-windows': require('./b1-admin-windows'),
  'b1-virtualisation': require('./b1-virtualisation'),
  'b1-projet': require('./b1-projet'),
  'b1-sql': require('./b1-sql'),
  'b1-vb-excel': require('./b1-vb-excel'),
  'linux': require('./linux'),
  'php': require('./php'),
  'probabilites': require('./probabilites'),
  'rd_java': require('./rd_java'),
  'rd_winserver': require('./rd_winserver'),
  'admin-vm': require('./admin-vm'),
  'droit': require('./droit'),
  'react': require('./react'),
  'api-rest-flask': require('./api-rest-flask'),
  'erp-si': require('./erp-si'),
  'ingenierie-besoin': require('./ingenierie-besoin'),
  'masterclass-apprendre': require('./masterclass-apprendre'),
  'RD-RO': require('./RD-RO'),
  'assembleur': require('./assembleur'),
  'Cyber securite B2': require('./cyber-securite-b2'),
  'sql': require('./sql'),
  'csharp': require('./csharp'),
  'ccna': require('./ccna'),
  'uml': require('./uml'),
  'uiux': require('./uiux'),
  'docker': require('./docker'),
  'infographie': require('./infographie'),
  'b3-algo': require('./b3-algo'),
  'b3-cloud-computing': require('./b3-cloud-computing'),
  'b3-devops': require('./b3-devops'),
  'b3-document-technique': require('./b3-document-technique'),
  'b3-etude-quantitative': require('./b3-etude-quantitative'),
  'b3-firewall': require('./b3-firewall'),
  'b3-github': require('./b3-github'),
  'b3-linux': require('./b3-linux'),
  'b3-agile': require('./b3-agile'),
  'b3-pfsense': require('./b3-pfsense'),
  'b3-reseau-lan': require('./b3-reseau-lan'),
  'b3-sql': require('./b3-sql'),
  'b3-veille': require('./b3-veille'),
  'b3-windows-server': require('./b3-windows-server'),
  'b3-anglais': require('./b3-anglais'),
  'b3-cloud-azure': require('./b3-cloud-azure'),
  'b3-cryptographie': require('./b3-cryptographie'),
  'b3-google-cloud': require('./b3-google-cloud'),
  'b3-hacking': require('./b3-hacking'),
  'b3-cloud-aws': require('./b3-cloud-aws'),
  'b3-supervision': require('./b3-supervision'),
  'b3-voip': require('./b3-voip'),
  'b3-virtualisation': require('./b3-virtualisation')
};

const ALL = new Map();

for (const [course, list] of Object.entries(RAW_EXERCISES)) {
  for (const exercise of list) {
    if (ALL.has(exercise.id)) {
      throw new Error(`Identifiant d'exercice dupliqué : ${exercise.id}`);
    }
    ALL.set(exercise.id, { ...exercise, course });
  }
}

function getExercise(id) {
  if (typeof id !== 'string') return null;
  return ALL.get(id) || null;
}

function listExercises() {
  return [...ALL.values()];
}

/**
 * Vue publique d'un exercice : tout ce qui peut être affiché sans permettre
 * de tricher (ni attendus des tests cachés, ni corrigé).
 */
function toClient(exercise) {
  return {
    id: exercise.id,
    course: exercise.course,
    chapter: exercise.chapter,
    level: exercise.level,
    title: exercise.title,
    goal: exercise.goal,
    brief: exercise.brief,
    starter: exercise.starter,
    language: exercise.language,
    hints: exercise.hints || [],
    examples: exercise.language === 'analyse'
      ? (exercise.examples || []).map(example => ({ stdin: typeof example.stdin === 'string' ? example.stdin : '' }))
      : exercise.examples || []
  };
}

/**
 * Contrôle d'intégrité du catalogue, utilisé par les tests.
 * @returns {string[]} liste des anomalies (vide si tout est cohérent)
 */
function validateCatalogue() {
  const problems = [];
  const seen = new Set();

  for (const exercise of listExercises()) {
    const where = exercise.id;
    if (seen.has(where)) problems.push(`${where} : identifiant dupliqué`);
    seen.add(where);

    if (!/^[a-z0-9-]+$/.test(where)) problems.push(`${where} : identifiant non conforme`);
    if (!exercise.title) problems.push(`${where} : titre manquant`);
    if (!exercise.brief) problems.push(`${where} : énoncé manquant`);
    if (typeof exercise.chapter !== 'number') problems.push(`${where} : chapitre manquant`);
    if (!exercise.starter || !exercise.starter.trim()) problems.push(`${where} : code de départ manquant`);
    if (!exercise.solution || !exercise.solution.trim()) problems.push(`${where} : corrigé manquant`);
    if (!Array.isArray(exercise.tests) || exercise.tests.length < 2) {
      problems.push(`${where} : au moins 2 tests cachés sont requis`);
    }
    if (!Array.isArray(exercise.examples) || exercise.examples.length < 1) {
      problems.push(`${where} : au moins 1 exemple visible est requis`);
    }
    if (exercise.verifyFirstExample === true &&
        (exercise.language === 'analyse' || !Array.isArray(exercise.examples) || !exercise.examples[0] ||
         typeof exercise.examples[0].stdin !== 'string' || typeof exercise.examples[0].expected !== 'string')) {
      problems.push(`${where} : exemple visible à vérifier invalide`);
    }
    if (!Array.isArray(exercise.hints) || exercise.hints.length < 1) {
      problems.push(`${where} : au moins 1 indice est requis`);
    }

    for (const test of exercise.tests || []) {
      if (typeof test.expected !== 'string') problems.push(`${where} : test sans sortie attendue`);
    }

    // Le code de départ ne doit pas déjà contenir le corrigé entier. On compare
    // les formes normalisées en entier : le préambule de lecture d'entrée est
    // légitimement commun aux deux, seule la solution complète serait fautive.
    if (exercise.solution && exercise.starter) {
      const solution = exercise.solution.replace(/\s+/g, ' ').trim();
      const starter = exercise.starter.replace(/\s+/g, ' ').trim();
      if (solution && (starter === solution || starter.includes(solution))) {
        problems.push(`${where} : le code de départ contient déjà le corrigé`);
      }
    }
  }

  return problems;
}

const LANGUAGE_PITFALLS = {
  python: 'Vérifiez le typage des entrées (int/float), les bornes des boucles et le format exact de print().',
  c: 'Contrôlez les types (scanf/printf), les dépassements d’index, les retours à la ligne et la valeur de retour de main.',
  cpp: 'Vérifiez la lecture sur std::cin, le formatage sur std::cout et les cas limites (tableau vide, valeurs nulles ou négatives).',
  php: 'Vérifiez la lecture de STDIN, les conversions de types et l’affichage exact sans espaces ou retours superflus.',
  javascript: 'Contrôlez la lecture complète de l’entrée standard, la conversion Number/parseInt et le format exact de console.log.',
  java: 'Vérifiez la classe Main, la lecture complète de Scanner et le format exact des sorties.',
  csharp: 'Vérifiez Console.ReadLine(), le parsing numérique invariant et le format exact de Console.WriteLine().',
  bash: 'Protégez vos variables entre guillemets, vérifiez les espaces autour des crochets [ ... ] et gérez les entrées vides.',
  powershell: 'Vérifiez le parsing des entrées, le nommage exact des variables et le format de sortie Write-Output.',
  algo: 'Vérifiez l’initialisation des variables, les bornes des boucles Pour/TantQue et le format exact des instructions Ecrire.',
  analyse: 'Vérifiez chaque critère demandé, les unités, la justification pas à pas et les hypothèses ou cas limites.'
};

/**
 * Construit un résumé pédagogique (« Ce qu'il faut retenir ») pour un exercice
 * une fois le corrigé débloqué. Ne doit jamais être exposé par toClient().
 */
function buildTakeaway(exercise) {
  if (!exercise || typeof exercise !== 'object') return '';
  if (typeof exercise.takeaway === 'string' && exercise.takeaway.trim()) {
    return exercise.takeaway.trim();
  }
  const goal = typeof exercise.goal === 'string' && exercise.goal.trim()
    ? exercise.goal.trim().replace(/\.$/, '')
    : 'Maîtriser le principe de l’exercice';
  const lang = String(exercise.language || '').toLowerCase();
  const pitfall = LANGUAGE_PITFALLS[lang]
    || 'Relisez les cas limites, le format des données en entrée et le format exact de la sortie attendue.';
  const hint = Array.isArray(exercise.hints) && typeof exercise.hints[0] === 'string' && exercise.hints[0].trim()
    ? ` Point d’attention : ${exercise.hints[0].trim().replace(/\.$/, '')}.`
    : '';
  return `Objectif clé : ${goal}. Réflexe à retenir : ${pitfall}${hint}`;
}

module.exports = { getExercise, listExercises, toClient, buildTakeaway, validateCatalogue };

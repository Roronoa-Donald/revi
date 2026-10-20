/**
 * Catalogue des langages exécutables via le fournisseur d'exécution.
 *
 * C'est une LISTE BLANCHE : elle est la seule source d'identifiants acceptés
 * par l'API. Une requête cliente qui demande autre chose est refusée avant
 * tout appel sortant (validation d'entrée, cf. spec fournisseur §25).
 *
 * Deux identifiants cohabitent et ne sont pas interchangeables :
 *   - `id`     : identifiant interne du site (celui des pages et des exercices)
 *   - `monaco` : identifiant attendu par Monaco Editor
 *   - `oanor`  : identifiant attendu par le fournisseur d'exécution
 *   - `aliases`: variantes sous lesquelles le fournisseur peut annoncer ce
 *                langage dans /v1/languages (sert au recoupement dynamique)
 *
 * ATTENTION : les valeurs `oanor` proviennent de la documentation publique du
 * fournisseur, qui n'est pas exhaustive. Le recoupement avec /v1/languages
 * (`matchDeclared`) permet de n'exposer que ce que le service déclare vraiment.
 */

const LANGUAGES = [
  { id: 'python',     label: 'Python',     monaco: 'python',     oanor: 'python',     ext: 'py',   aliases: ['python', 'python3'] },
  { id: 'javascript', label: 'JavaScript', monaco: 'javascript', oanor: 'javascript', ext: 'js',   aliases: ['javascript', 'js', 'nodejs', 'node'] },
  { id: 'typescript', label: 'TypeScript', monaco: 'typescript', oanor: 'typescript', ext: 'ts',   aliases: ['typescript', 'ts'] },
  { id: 'c',          label: 'C',          monaco: 'c',          oanor: 'c',          ext: 'c',    aliases: ['c'] },
  { id: 'cpp',        label: 'C++',        monaco: 'cpp',        oanor: 'c++',        ext: 'cpp',  aliases: ['c++', 'cpp', 'cplusplus'] },
  { id: 'csharp',     label: 'C#',         monaco: 'csharp',     oanor: 'c#',         ext: 'cs',   aliases: ['c#', 'csharp', 'cs'] },
  { id: 'java',       label: 'Java',       monaco: 'java',       oanor: 'java',       ext: 'java', aliases: ['java'] },
  { id: 'php',        label: 'PHP',        monaco: 'php',        oanor: 'php',        ext: 'php',  aliases: ['php'] },
  { id: 'go',         label: 'Go',         monaco: 'go',         oanor: 'go',         ext: 'go',   aliases: ['go', 'golang'] },
  { id: 'rust',       label: 'Rust',       monaco: 'rust',       oanor: 'rust',       ext: 'rs',   aliases: ['rust'] },
  { id: 'ruby',       label: 'Ruby',       monaco: 'ruby',       oanor: 'ruby',       ext: 'rb',   aliases: ['ruby'] },
  { id: 'kotlin',     label: 'Kotlin',     monaco: 'kotlin',     oanor: 'kotlin',     ext: 'kt',   aliases: ['kotlin'] },
  { id: 'swift',      label: 'Swift',      monaco: 'swift',      oanor: 'swift',      ext: 'swift',aliases: ['swift'] },
  { id: 'haskell',    label: 'Haskell',    monaco: 'haskell',    oanor: 'haskell',    ext: 'hs',   aliases: ['haskell'] },
  { id: 'scala',      label: 'Scala',      monaco: 'scala',      oanor: 'scala',      ext: 'scala',aliases: ['scala'] },
  { id: 'lua',        label: 'Lua',        monaco: 'lua',        oanor: 'lua',        ext: 'lua',  aliases: ['lua'] },
  { id: 'r',          label: 'R',          monaco: 'r',          oanor: 'r',          ext: 'r',    aliases: ['r', 'rscript'] },
  { id: 'shell',      label: 'Bash',       monaco: 'shell',      oanor: 'bash',       ext: 'sh',   aliases: ['bash', 'shell', 'sh'] },
  { id: 'powershell', label: 'PowerShell', monaco: 'powershell', oanor: 'powershell', ext: 'ps1',  aliases: ['powershell', 'pwsh'] },
  { id: 'sql',        label: 'SQL',        monaco: 'sql',        oanor: 'sql',        ext: 'sql',  aliases: ['sql', 'sqlite', 'sqlite3'] },
  { id: 'analyse',    label: 'Étude de cas', monaco: 'plaintext', oanor: 'analyse',   ext: 'txt',  sample: '# Grille d\'analyse\n', aliases: ['analyse'] }
];

const BY_ID = new Map(LANGUAGES.map(l => [l.id, l]));

/** Identifiant interne → définition complète, ou null. */
function getLanguage(id) {
  if (typeof id !== 'string') return null;
  return BY_ID.get(id.toLowerCase()) || null;
}

function isSupported(id) {
  return getLanguage(id) !== null;
}

function listLanguages() {
  return LANGUAGES.map(l => ({ id: l.id, label: l.label, monaco: l.monaco, ext: l.ext }));
}

/**
 * Recoupe notre liste blanche avec les langages réellement annoncés par le
 * fournisseur, et renvoie pour chacun la chaîne exacte à lui transmettre.
 *
 * @param {unknown} declared réponse brute de /v1/languages
 * @returns {{languages: Array, matched: number}}
 */
function matchDeclared(declared) {
  const announced = extractAnnounced(declared);
  if (!announced.size) {
    // Liste indisponible : on retombe sur notre table statique, en le signalant
    // par `matched: 0` (l'appelant décide d'afficher la sélection ou non).
    return { languages: listLanguages().map(l => ({ ...l, verified: false })), matched: 0 };
  }

  const languages = [];
  let matched = 0;
  for (const lang of LANGUAGES) {
    const found = lang.aliases.find(a => announced.has(a));
    if (!found) continue;
    matched++;
    languages.push({
      id: lang.id,
      label: lang.label,
      monaco: lang.monaco,
      ext: lang.ext,
      verified: true,
      oanor: announced.get(found)
    });
  }
  return { languages, matched };
}

/**
 * Normalise les différentes formes possibles de la réponse /v1/languages en
 * `Map<minuscule, chaîne exacte>`.
 */
function extractAnnounced(declared) {
  const out = new Map();
  const push = value => {
    if (typeof value !== 'string') return;
    const raw = value.trim();
    if (!raw) return;
    out.set(raw.toLowerCase(), raw);
  };

  const visit = node => {
    if (!node) return;
    if (typeof node === 'string') return push(node);
    if (Array.isArray(node)) return node.forEach(visit);
    if (typeof node !== 'object') return;
    // Dictionnaire imbriqué : chercher d'abord un id/nom explicite.
    for (const key of ['id', 'name', 'language', 'value', 'slug', 'key']) {
      if (typeof node[key] === 'string') return push(node[key]);
    }
    // Traiter les alias déclarés dans un objet de runtime (spécification Piston)
    if (Array.isArray(node.aliases)) {
      node.aliases.forEach(visit);
    }
    // Sinon, descendre dans les collections connues.
    for (const key of ['languages', 'data', 'result']) {
      if (node[key]) return visit(node[key]);
    }
  };

  visit(declared);
  return out;
}

module.exports = {
  LANGUAGES,
  getLanguage,
  isSupported,
  listLanguages,
  matchDeclared,
  extractAnnounced
};

/**
 * Exercices de code — Programmation Web (B1), 3 par module, en JavaScript.
 *
 * Le cours couvre HTML, CSS et JavaScript ; les exercices portent donc sur ce
 * qui se <em>calcule</em> : structure d'une URL, familles de codes HTTP, lecture
 * d'un extrait HTML, validation de formulaire, échappement, spécificité CSS,
 * modèle de boîte, unités relatives, flexbox, grille responsive et construction
 * du DOM à partir de données.
 *
 * Les exercices sont exécutés par Node (liste blanche OANOR : `javascript`).
 * Comme le DOM n'existe pas hors navigateur, aucune fiche ne le manipule :
 * chaque fiche lit son entrée standard et écrit son résultat — c'est la logique
 * que l'élève réutilisera ensuite dans une page, débarrassée du navigateur.
 *
 * Idiome de lecture commun, montré dans chaque code de départ :
 *   const fs = require('fs');
 *   const lignes = fs.readFileSync(0, 'utf8').trim().split('\n');
 *
 * Même contrat que les autres catalogues : `brief`, `starter`, `examples`
 * (visibles), `tests` (cachés), `hints` (en mots), `solution` (serveur seul).
 */

/** Lecture de l'entrée standard, ligne à ligne. */
const LIRE = `const fs = require('fs');
const lignes = fs.readFileSync(0, 'utf8').trim().split('\\n');
`;

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — Le Web : clients, serveurs, URL, HTTP
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'javascript',
    title: 'Décomposer une URL',
    goal: 'Séparer une adresse en ses quatre composantes : protocole, hôte, chemin, requête.',
    brief: '<p>Le programme reçoit une adresse sur une seule ligne. Affichez ses quatre composantes, ' +
      'chacune sur sa ligne, dans l’ordre : le <strong>protocole</strong> (ce qui précède <code>://</code>), ' +
      'l’<strong>hôte</strong> (jusqu’au premier <code>/</code>), le <strong>chemin</strong> (jusqu’au ' +
      '<code>?</code>) et la <strong>requête</strong> (ce qui suit le <code>?</code>). Si l’adresse n’a pas ' +
      'de chemin, affichez <code>/</code> ; si elle n’a pas de requête, affichez <code>-</code>.</p>',
    starter: LIRE + `
const url = lignes[0];

// À compléter : afficher le protocole, l’hôte, le chemin et la requête.
`,
    hints: [
      'indexOf() renvoie -1 quand le caractère cherché n’est pas là : c’est ce qui distingue « absent » de « présent ».',
      'Pour couper une chaîne en deux à un séparateur, slice() suffit : slice(0, i) et slice(i + 1).'
    ],
    examples: [
      { stdin: 'https://campus.exemple.fr/cours/index.html?page=2', expected: 'https\ncampus.exemple.fr\n/cours/index.html\npage=2', note: 'Les quatre composantes, dans l’ordre.' }
    ],
    tests: [
      { label: 'Avec port et plusieurs paramètres', stdin: 'http://localhost:3000/api/notes?limit=10&tri=desc', expected: 'http\nlocalhost:3000\n/api/notes\nlimit=10&tri=desc' },
      { label: 'Sans chemin ni requête', stdin: 'https://exemple.fr', expected: 'https\nexemple.fr\n/\n-' },
      { label: 'Chemin seul, sans requête', stdin: 'https://campus.fr/notes/index.html', expected: 'https\ncampus.fr\n/notes/index.html\n-' }
    ],
    solution: LIRE + `
const url = lignes[0];

const [protocole, reste] = url.split('://');
const barre = reste.indexOf('/');
const hote = barre === -1 ? reste : reste.slice(0, barre);
const cheminRequete = barre === -1 ? '' : reste.slice(barre);
const interrogation = cheminRequete.indexOf('?');

const chemin = interrogation === -1 ? cheminRequete : cheminRequete.slice(0, interrogation);
const requete = interrogation === -1 ? '-' : cheminRequete.slice(interrogation + 1);

console.log(protocole);
console.log(hote);
console.log(chemin || '/');
console.log(requete);
`
  },
  {
    id: 'web-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'javascript',
    title: 'Familles de codes HTTP',
    goal: 'Traduire un code de statut en la famille qu’il annonce au client.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> codes de statut HTTP ' +
      '(un par ligne). Affichez, pour chacun, une ligne <code>code famille</code> où la famille vaut : ' +
      '<code>information</code> (1xx), <code>succès</code> (2xx), <code>redirection</code> (3xx), ' +
      '<code>erreur client</code> (4xx) ou <code>erreur serveur</code> (5xx).</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const codes = lignes.slice(1, 1 + n).map(Number);

// À compléter : afficher chaque code suivi de sa famille.
`,
    hints: [
      'La famille se lit sur le chiffre des centaines : 200 → 2xx → succès.',
      'Une table qui associe le chiffre des centaines au libellé évite cinq if imbriqués.'
    ],
    examples: [
      { stdin: '3\n200\n404\n301', expected: '200 succès\n404 erreur client\n301 redirection', note: 'Trois codes, trois familles.' }
    ],
    tests: [
      { label: 'Erreur serveur', stdin: '1\n500', expected: '500 erreur serveur' },
      { label: 'Information', stdin: '1\n100', expected: '100 information' },
      { label: 'Les cinq familles', stdin: '5\n204\n302\n403\n503\n101', expected: '204 succès\n302 redirection\n403 erreur client\n503 erreur serveur\n101 information' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const codes = lignes.slice(1, 1 + n).map(Number);

const familles = {
  1: 'information',
  2: 'succès',
  3: 'redirection',
  4: 'erreur client',
  5: 'erreur serveur'
};

for (const code of codes) {
  console.log(code + ' ' + familles[Math.floor(code / 100)]);
}
`
  },
  {
    id: 'web-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'javascript',
    title: 'Méthodes HTTP et idempotence',
    goal: 'Distinguer les méthodes qu’on peut rejouer sans conséquence des autres.',
    brief: '<p>Une méthode est <strong>idempotente</strong> quand rejouer la même requête laisse le serveur ' +
      'dans le même état : <code>GET</code>, <code>HEAD</code>, <code>PUT</code>, <code>DELETE</code>, ' +
      '<code>OPTIONS</code> et <code>TRACE</code> le sont ; <code>POST</code> et <code>PATCH</code> ne le ' +
      'sont pas. Le programme reçoit un entier <code>n</code>, puis <code>n</code> méthodes (une par ligne, ' +
      'en majuscules). Affichez pour chacune <code>MÉTHODE oui</code> ou <code>MÉTHODE non</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const methodes = lignes.slice(1, 1 + n);

// À compléter : afficher chaque méthode suivie de « oui » ou « non ».
`,
    hints: [
      'Un tableau de méthodes idempotentes et un test includes() suffisent.',
      'La casse compte : normalise en majuscules si l’entrée n’est pas garantie.'
    ],
    examples: [
      { stdin: '2\nGET\nPOST', expected: 'GET oui\nPOST non', note: 'GET ne modifie rien, POST crée quelque chose.' }
    ],
    tests: [
      { label: 'Trois méthodes', stdin: '3\nPATCH\nDELETE\nPUT', expected: 'PATCH non\nDELETE oui\nPUT oui' },
      { label: 'Méthodes de lecture', stdin: '2\nHEAD\nOPTIONS', expected: 'HEAD oui\nOPTIONS oui' },
      { label: 'Inspection et création', stdin: '2\nTRACE\nPOST', expected: 'TRACE oui\nPOST non' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const methodes = lignes.slice(1, 1 + n);

const idempotentes = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];

for (const methode of methodes) {
  const m = methode.trim().toUpperCase();
  console.log(m + ' ' + (idempotentes.includes(m) ? 'oui' : 'non'));
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — HTML : structure et sémantique
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'javascript',
    title: 'Titre de la page',
    goal: 'Extraire le contenu d’une balise parmi un extrait de HTML.',
    brief: '<p>Le programme reçoit un extrait de HTML, une ligne par ligne. Affichez le contenu de la ' +
      'balise <code>&lt;title&gt;</code>, espaces de début et de fin retirés. Si l’extrait n’en contient ' +
      'aucune, affichez <code>-</code>.</p>',
    starter: LIRE + `
const html = lignes.join('\\n');

// À compléter : afficher le contenu de <title>, ou « - » s’il n’y en a pas.
`,
    hints: [
      'Une expression régulière non gourmande — /<title>([\\s\\S]*?)<\\/title>/ — capture ce qui est entre les deux balises.',
      'Le caractère \\s dans une expression régulière couvre aussi les retours à la ligne.'
    ],
    examples: [
      { stdin: '<html>\n<head><title>Mes notes</title></head>\n</html>', expected: 'Mes notes', note: 'Le contenu de la balise, sans les balises.' }
    ],
    tests: [
      { label: 'Espaces autour du titre', stdin: '<head>\n<title>   Espaces   </title>\n</head>', expected: 'Espaces' },
      { label: 'Entité HTML dans le titre', stdin: '<head>\n    <title>Cours B1 &amp; B2</title>\n</head>', expected: 'Cours B1 &amp; B2' },
      { label: 'Titre absent', stdin: '<main>\n<p>Aucun titre</p>\n</main>', expected: '-' }
    ],
    solution: LIRE + `
const html = lignes.join('\\n');

const trouve = /<title>([\\s\\S]*?)<\\/title>/.exec(html);
console.log(trouve ? trouve[1].trim() : '-');
`
  },
  {
    id: 'web-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'javascript',
    title: 'Adresses des liens',
    goal: 'Parcourir un document et extraire une valeur d’attribut, quel que soit l’ordre des attributs.',
    brief: '<p>Le programme reçoit un extrait de HTML, une ligne par ligne. Affichez la valeur de ' +
      'l’attribut <code>href</code> de chaque lien, une par ligne, <strong>dans l’ordre d’apparition</strong>. ' +
      'Un lien sans <code>href</code> ne produit rien ; <code>href</code> écrite en majuscules ne compte pas.</p>',
    starter: LIRE + `
const html = lignes.join('\\n');

// À compléter : afficher les adresses des liens, une par ligne.
`,
    hints: [
      'matchAll() renvoie tous les résultats d’une expression régulière globale, avec leurs groupes de capture.',
      'Le motif doit accepter d’autres attributs avant href : <a[^>]*href="([^"]*)" .'
    ],
    examples: [
      { stdin: '<nav>\n<a href="/cours.html">Cours</a>\n<p>texte</p>\n<a href="https://x.fr" target="_blank">X</a>\n</nav>', expected: '/cours.html\nhttps://x.fr', note: 'Deux liens, deux adresses.' }
    ],
    tests: [
      { label: 'Un seul lien', stdin: '<p><a href="/notes">Mes notes</a></p>', expected: '/notes' },
      { label: 'Attribut après d’autres', stdin: '<a class="btn" id="go" href="/atelier">Atelier</a>', expected: '/atelier' },
      { label: 'Lien sans href ignoré', stdin: '<a name="ancre">Ancre</a>\n<a href="/a">A</a>\n<a href="/b">B</a>', expected: '/a\n/b' }
    ],
    solution: LIRE + `
const html = lignes.join('\\n');

for (const lien of html.matchAll(/<a[^>]*href="([^"]*)"/g)) {
  console.log(lien[1]);
}
`
  },
  {
    id: 'web-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'javascript',
    title: 'Hiérarchie des titres',
    goal: 'Contrôler une règle d’accessibilité qui se vérifie sans navigateur.',
    brief: '<p>Une page est bien structurée si son premier titre est un <code>h1</code> et si l’on ne ' +
      'descend jamais de plus d’un niveau d’un titre au suivant. Le programme reçoit un entier ' +
      '<code>n</code>, puis <code>n</code> noms de balises de titres (<code>h1</code>…<code>h6</code>, un par ' +
      'ligne). Affichez <code>conforme</code> ou <code>non conforme</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const titres = lignes.slice(1, 1 + n).map(texte => Number(texte.trim()[1]));

// À compléter : afficher « conforme » ou « non conforme ».
`,
    hints: [
      'Deux règles à vérifier : le premier niveau vaut 1, et chaque niveau ne dépasse pas le précédent de plus de 1.',
      'Remonter d’un h3 à un h2 est autorisé : seule la descente trop rapide pose problème.'
    ],
    examples: [
      { stdin: '3\nh1\nh2\nh3', expected: 'conforme', note: 'Descente d’un niveau à la fois.' }
    ],
    tests: [
      { label: 'La page commence par h2', stdin: '2\nh2\nh3', expected: 'non conforme' },
      { label: 'Saut de deux niveaux', stdin: '3\nh1\nh3\nh4', expected: 'non conforme' },
      { label: 'Deux titres de même niveau', stdin: '5\nh1\nh2\nh2\nh3\nh4', expected: 'conforme' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const titres = lignes.slice(1, 1 + n).map(texte => Number(texte.trim()[1]));

let conforme = titres[0] === 1;
for (let i = 1; i < titres.length; i++) {
  if (titres[i] > titres[i - 1] + 1) conforme = false;
}

console.log(conforme ? 'conforme' : 'non conforme');
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Formulaires, validation et sécurité
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'javascript',
    title: 'Valider une adresse électronique',
    goal: 'Écrire une validation explicite plutôt que de se reposer sur le navigateur.',
    brief: '<p>Le programme reçoit une adresse électronique sur une seule ligne. Elle est valide si elle ' +
      'contient <strong>exactement un</strong> <code>@</code>, si la partie avant est non vide, si la partie ' +
      'après contient un point qui n’est ni le premier ni le dernier caractère, et si elle ne contient aucun ' +
      'espace. Affichez <code>valide</code> ou <code>invalide</code>.</p>',
    starter: LIRE + `
const adresse = lignes[0];

// À compléter : afficher « valide » ou « invalide ».
`,
    hints: [
      'Compte les @ avec split("@"): le tableau obtenu ne doit contenir que deux éléments.',
      'Pour la partie domaine : elle doit contenir un point, et ni commencer ni finir par ce point.'
    ],
    examples: [
      { stdin: 'etudiant.b1@campus.fr', expected: 'valide', note: 'Un seul @, domaine avec un point, pas d’espace.' }
    ],
    tests: [
      { label: 'Sans arobase', stdin: 'pas-une-adresse', expected: 'invalide' },
      { label: 'Partie locale vide', stdin: '@domaine.fr', expected: 'invalide' },
      { label: 'Domaine sans point', stdin: 'nom@domaine', expected: 'invalide' }
    ],
    solution: LIRE + `
const adresse = lignes[0];

function valide(texte) {
  if (texte.includes(' ')) return false;
  const parties = texte.split('@');
  if (parties.length !== 2) return false;
  const [locale, domaine] = parties;
  if (!locale) return false;
  const point = domaine.indexOf('.');
  return point > 0 && point < domaine.length - 1;
}

console.log(valide(adresse) ? 'valide' : 'invalide');
`
  },
  {
    id: 'web-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'javascript',
    title: 'Force d’un mot de passe',
    goal: 'Compter des critères, puis traduire un score en conseil lisible.',
    brief: '<p>Le programme reçoit un mot de passe sur une seule ligne. Comptez cinq critères : au moins ' +
      '8 caractères ; au moins une majuscule ; au moins une minuscule ; au moins un chiffre ; au moins un ' +
      'caractère qui n’est ni lettre ni chiffre. Affichez <code>score conseil</code> où le conseil vaut ' +
      '<code>faible</code> (score ≤ 2), <code>moyen</code> (3 ou 4) ou <code>fort</code> (5).</p>',
    starter: LIRE + `
const motDePasse = lignes[0];

// À compléter : compter les cinq critères, puis afficher « score conseil ».
`,
    hints: [
      'Trois expressions régulières (majuscule, minuscule, chiffre) suffisent ; le caractère spécial s’obtient par différence.',
      'Les critères vrais valent 1 et les faux 0 : la somme donne directement le score.'
    ],
    examples: [
      { stdin: 'B1-secret!', expected: '5 fort', note: 'Longueur, majuscule, minuscule, chiffre et symbole.' }
    ],
    tests: [
      { label: 'Lettres minuscules seulement', stdin: 'abcdefgh', expected: '2 faible' },
      { label: 'Tout sauf un symbole', stdin: 'Abcdefg1', expected: '4 moyen' },
      { label: 'Trop court', stdin: 'abc', expected: '1 faible' }
    ],
    solution: LIRE + `
const motDePasse = lignes[0];

const criteres = [
  motDePasse.length >= 8,
  /[A-Z]/.test(motDePasse),
  /[a-z]/.test(motDePasse),
  /[0-9]/.test(motDePasse),
  /[^A-Za-z0-9]/.test(motDePasse)
];

const score = criteres.filter(Boolean).length;
const conseil = score <= 2 ? 'faible' : score < 5 ? 'moyen' : 'fort';

console.log(score + ' ' + conseil);
`
  },
  {
    id: 'web-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'javascript',
    title: 'Échapper du HTML',
    goal: 'Neutraliser un texte saisi par l’utilisateur avant de l’insérer dans une page.',
    brief: '<p>Le programme reçoit un texte saisi par un visiteur, sur une seule ligne. Affichez ce texte ' +
      'après échappement : <code>&amp;</code> devient <code>&amp;amp;</code>, <code>&lt;</code> devient ' +
      '<code>&amp;lt;</code>, <code>&gt;</code> devient <code>&amp;gt;</code>, <code>"</code> devient ' +
      '<code>&amp;quot;</code> et <code>\'</code> devient <code>&amp;#39;</code>.</p>',
    starter: LIRE + `
const texte = lignes[0];

// À compléter : afficher le texte échappé.
`,
    hints: [
      'L’ordre des remplacements n’est pas neutre : commence impérativement par le & , sinon tu ré-échapperas les entités créées.',
      'replace() avec une expression régulière globale — le drapeau g — remplace toutes les occurrences, pas seulement la première.'
    ],
    examples: [
      { stdin: '5 < 10 & "ok"', expected: '5 &lt; 10 &amp; &quot;ok&quot;', note: 'Chaque caractère sensible est remplacé.' }
    ],
    tests: [
      { label: 'Tentative d’injection', stdin: '<script>alert(1)</script>', expected: '&lt;script&gt;alert(1)&lt;/script&gt;' },
      { label: 'Apostrophe et guillemets', stdin: 'C\'est "vrai"', expected: 'C&#39;est &quot;vrai&quot;' },
      { label: 'Texte sans caractère sensible', stdin: 'Rien a signaler', expected: 'Rien a signaler' }
    ],
    solution: LIRE + `
const texte = lignes[0];

const echappe = texte
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

console.log(echappe);
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — CSS : sélecteurs, cascade et modèle de boîte
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c4-e1',
    chapter: 4,
    level: 'n3',
    language: 'javascript',
    title: 'Spécificité d’un sélecteur',
    goal: 'Calculer le triplet (identifiants, classes, types) qui décide du style gagnant.',
    brief: '<p>Le programme reçoit un sélecteur CSS sur une seule ligne (sans virgule, combinateurs par ' +
      'espaces). Affichez ses trois compteurs sur une ligne : nombre d’<strong>identifiants</strong> ' +
      '(<code>#…</code>), nombre de <strong>classes</strong> (<code>.…</code>, y compris plusieurs sur un ' +
      'même élément) et nombre de <strong>types</strong> (noms de balises). Le sélecteur universel ' +
      '<code>*</code> ne compte pas.</p>',
    starter: LIRE + `
const selecteur = lignes[0];

// À compléter : afficher ids, classes et types séparés par des espaces.
`,
    hints: [
      'Découpe sur les espaces pour obtenir les éléments du sélecteur : chacun se juge séparément.',
      'Un élément qui commence par . peut porter plusieurs classes : compte les points, pas les éléments.'
    ],
    examples: [
      { stdin: 'div#main.item p', expected: '1 1 2', note: 'Un identifiant, une classe, deux types.' }
    ],
    tests: [
      { label: 'Deux classes sur le même élément', stdin: '.btn.btn--primary', expected: '0 2 0' },
      { label: 'Identifiant en tête', stdin: '#app section h2', expected: '1 0 2' },
      { label: 'Sélecteur universel', stdin: '*', expected: '0 0 0' }
    ],
    solution: LIRE + `
const selecteur = lignes[0];

let ids = 0;
let classes = 0;
let types = 0;

for (const element of selecteur.trim().split(/\\s+/)) {
  ids += (element.match(/#/g) || []).length;
  classes += (element.match(/\\./g) || []).length;
  // Le premier caractère dit si l’élément commence par un nom de balise.
  if (/^[a-zA-Z]/.test(element)) types++;
}

console.log(ids + ' ' + classes + ' ' + types);
`
  },
  {
    id: 'web-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'javascript',
    title: 'Modèle de boîte : content-box ou border-box',
    goal: 'Voir par le calcul ce que change box-sizing sur la largeur réellement occupée.',
    brief: '<p>Le programme reçoit une ligne <code>largeur padding border margin</code> (quatre nombres de ' +
      'pixels). Affichez trois lignes : la largeur de la boîte avec <code>box-sizing: content-box</code> ' +
      '(largeur de contenu + 2·padding + 2·border) ; la place totale occupée avec les marges, dans tous les ' +
      'cas (largeur déclarée + 2·margin) ; enfin la largeur de contenu restante avec ' +
      '<code>box-sizing: border-box</code> (largeur déclarée − 2·padding − 2·border).</p>',
    starter: LIRE + `
const [largeur, padding, bordure, marge] = lignes[0].split(' ').map(Number);

// À compléter : afficher les trois largeurs, sur trois lignes.
`,
    hints: [
      'En content-box, la largeur déclarée ne concerne que le contenu : les marges internes et la bordure s’ajoutent.',
      'En border-box, la largeur déclarée englobe padding et bordure ; le contenu rétrécit d’autant.'
    ],
    examples: [
      { stdin: '200 10 2 5', expected: '224\n210\n176', note: '200 + 20 + 4 = 224 ; 200 + 10 = 210 ; 200 − 20 − 4 = 176.' }
    ],
    tests: [
      { label: 'Boîte sans ornement', stdin: '100 0 0 0', expected: '100\n100\n100' },
      { label: 'Sans marge', stdin: '300 20 5 0', expected: '350\n300\n250' },
      { label: 'Petit padding et grande marge', stdin: '150 5 1 8', expected: '162\n166\n138' }
    ],
    solution: LIRE + `
const [largeur, padding, bordure, marge] = lignes[0].split(' ').map(Number);

const contentBox = largeur + 2 * padding + 2 * bordure;
const placeTotale = largeur + 2 * marge;
const contenuEnBorderBox = largeur - 2 * padding - 2 * bordure;

console.log(contentBox);
console.log(placeTotale);
console.log(contenuEnBorderBox);
`
  },
  {
    id: 'web-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'javascript',
    title: 'Convertir rem, em et px',
    goal: 'Maîtriser les unités relatives, qui font toute la différence en responsive.',
    brief: '<p>Le programme reçoit une taille de référence en pixels, puis un entier <code>n</code>, puis ' +
      '<code>n</code> déclarations de la forme <code>valeur unité</code>, où l’unité vaut <code>px</code>, ' +
      '<code>rem</code> (1 rem = taille de référence) ou <code>em</code> (l’élément parent a ici la taille de ' +
      'référence). Affichez chaque valeur convertie en pixels, deux décimales, une par ligne.</p>',
    starter: LIRE + `
const base = Number(lignes[0]);
const n = Number(lignes[1]);
const declarations = lignes.slice(2, 2 + n);

// À compléter : afficher chaque déclaration convertie en pixels, deux décimales.
`,
    hints: [
      'toFixed(2) formate un nombre à deux décimales.',
      'px se recopie tel quel ; rem et em multiplient par la taille de référence.'
    ],
    examples: [
      { stdin: '16\n3\n1.5 rem\n2 em\n10 px', expected: '24.00\n32.00\n10.00', note: '16 × 1,5 = 24 ; 16 × 2 = 32 ; 10 px reste 10.' }
    ],
    tests: [
      { label: 'Base 20', stdin: '20\n2\n1 rem\n0.5 em', expected: '20.00\n10.00' },
      { label: 'Base 12', stdin: '12\n2\n2 rem\n3 px', expected: '24.00\n3.00' },
      { label: 'Décimal', stdin: '16\n1\n1.25 em', expected: '20.00' }
    ],
    solution: LIRE + `
const base = Number(lignes[0]);
const n = Number(lignes[1]);
const declarations = lignes.slice(2, 2 + n);

for (const declaration of declarations) {
  const [valeur, unite] = declaration.trim().split(' ');
  const nombre = Number(valeur);
  const pixels = unite === 'px' ? nombre : nombre * base;
  console.log(pixels.toFixed(2));
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — CSS : mise en page et responsive
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'javascript',
    title: 'Largeur des éléments d’un flex',
    goal: 'Calculer la place réellement disponible quand une flexbox partage son espace.',
    brief: '<p>Le programme reçoit une ligne <code>largeur_du_conteneur espacement nombre_d’éléments</code>. ' +
      'Affichez la largeur de chaque élément, arrondie à deux décimales, sachant que les espacements séparent ' +
      'les éléments et que <code>nombre − 1</code> espaces sont consommés.</p>',
    starter: LIRE + `
const [conteneur, espacement, nombre] = lignes[0].split(' ').map(Number);

// À compléter : afficher la largeur d’un élément, deux décimales.
`,
    hints: [
      'Pour 4 éléments, il y a 3 espaces : l’espace disponible est conteneur − (nombre − 1) × espacement.',
      'Divise ensuite par le nombre d’éléments, puis formate avec toFixed(2).'
    ],
    examples: [
      { stdin: '1000 20 4', expected: '235.00', note: '1000 − 60 = 940 ; 940/4 = 235.' }
    ],
    tests: [
      { label: 'Trois cartes', stdin: '600 10 3', expected: '193.33' },
      { label: 'Deux éléments collés', stdin: '320 0 2', expected: '160.00' },
      { label: 'Cinq colonnes espacées', stdin: '900 40 5', expected: '148.00' }
    ],
    solution: LIRE + `
const [conteneur, espacement, nombre] = lignes[0].split(' ').map(Number);

const disponible = conteneur - (nombre - 1) * espacement;
console.log((disponible / nombre).toFixed(2));
`
  },
  {
    id: 'web-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'javascript',
    title: 'Grille responsive : nombre de colonnes',
    goal: 'Traduire des points de rupture (breakpoints) en règle de mise en page.',
    brief: '<p>La mise en page utilise trois paliers : <strong>1 colonne</strong> sous ' +
      '600 px, <strong>2 colonnes</strong> de 600 à 899 px, <strong>3 colonnes</strong> à partir de ' +
      '900 px. Le programme reçoit un entier <code>n</code>, puis <code>n</code> largeurs de fenêtre ' +
      '(une par ligne). Affichez pour chacune <code>largeur colonnes</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const largeurs = lignes.slice(1, 1 + n).map(Number);

// À compléter : afficher chaque largeur suivie du nombre de colonnes.
`,
    hints: [
      'Les paliers se lisent dans l’ordre : la première condition vraie décide.',
      'Attention aux bornes : 600 appartient au palier des 2 colonnes, 900 à celui des 3.'
    ],
    examples: [
      { stdin: '1\n1200', expected: '1200 3', note: 'Au-delà de 900 px, trois colonnes.' }
    ],
    tests: [
      { label: 'Téléphone', stdin: '1\n375', expected: '375 1' },
      { label: 'Tablette, borne basse des deux colonnes', stdin: '1\n600', expected: '600 2' },
      { label: 'Trois largeurs', stdin: '3\n599\n899\n900', expected: '599 1\n899 2\n900 3' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const largeurs = lignes.slice(1, 1 + n).map(Number);

for (const largeur of largeurs) {
  const colonnes = largeur < 600 ? 1 : largeur < 900 ? 2 : 3;
  console.log(largeur + ' ' + colonnes);
}
`
  },
  {
    id: 'web-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'javascript',
    title: 'Position d’une cellule dans une grille',
    goal: 'Retrouver ligne et colonne d’un élément placé dans une grille à n colonnes.',
    brief: '<p>Le programme reçoit une ligne <code>colonnes position</code> : le nombre de colonnes de la ' +
      'grille et le rang de l’élément (le premier élément est en position 1, dans la première ligne). ' +
      'Affichez <code>ligne colonne</code>, tous deux comptés à partir de 1.</p>',
    starter: LIRE + `
const [colonnes, position] = lignes[0].split(' ').map(Number);

// À compléter : afficher le numéro de ligne puis le numéro de colonne.
`,
    hints: [
      'Le rang 1 correspond à la ligne 1, colonne 1 : c’est exactement le cas où la division tombait juste.',
      'Math.ceil(position / colonnes) donne la ligne ; le reste de la division donne la colonne.'
    ],
    examples: [
      { stdin: '3 7', expected: '3 1', note: 'Septième élément : ligne 3, colonne 1.' }
    ],
    tests: [
      { label: 'Fin de première ligne', stdin: '4 4', expected: '1 4' },
      { label: 'Deux colonnes', stdin: '2 5', expected: '3 1' },
      { label: 'Premier élément', stdin: '1 1', expected: '1 1' }
    ],
    solution: LIRE + `
const [colonnes, position] = lignes[0].split(' ').map(Number);

const ligne = Math.ceil(position / colonnes);
const colonne = ((position - 1) % colonnes) + 1;

console.log(ligne + ' ' + colonne);
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — JavaScript : données, DOM et événements
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'javascript',
    title: 'Construire une liste HTML depuis des données',
    goal: 'Produire le balisage que l’on injecterait dans le DOM, à partir d’un tableau.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes ' +
      '<code>nom note</code>. Affichez une liste HTML : la ligne <code>&lt;ul&gt;</code>, puis une ligne ' +
      '<code>&lt;li&gt;nom : note&lt;/li&gt;</code> par étudiant dans l’ordre reçu, puis la ligne ' +
      '<code>&lt;/ul&gt;</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const eleves = lignes.slice(1, 1 + n);

// À compléter : afficher la liste HTML construite à partir des données.
`,
    hints: [
      'Un tableau de morceaux rejoint avec join("\\n") produit du HTML lisible.',
      'Le format exact demandé est « nom : note » avec un espace avant et après les deux-points.'
    ],
    examples: [
      { stdin: '2\nAda 18\nLinus 15', expected: '<ul>\n<li>Ada : 18</li>\n<li>Linus : 15</li>\n</ul>', note: 'Deux élèves, deux lignes de liste.' }
    ],
    tests: [
      { label: 'Un seul élève', stdin: '1\nGrace 17', expected: '<ul>\n<li>Grace : 17</li>\n</ul>' },
      { label: 'Trois élèves', stdin: '3\nAl 12\nBo 9\nCy 14', expected: '<ul>\n<li>Al : 12</li>\n<li>Bo : 9</li>\n<li>Cy : 14</li>\n</ul>' },
      { label: 'Noms composés', stdin: '2\nAda Lovelace 20\nAlan Turing 19', expected: '<ul>\n<li>Ada Lovelace : 20</li>\n<li>Alan Turing : 19</li>\n</ul>' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const eleves = lignes.slice(1, 1 + n);

const morceaux = ['<ul>'];
for (const eleve of eleves) {
  const separe = eleve.trim().split(' ');
  const note = separe.pop();
  const nom = separe.join(' ');
  morceaux.push('<li>' + nom + ' : ' + note + '</li>');
}
morceaux.push('</ul>');

console.log(morceaux.join('\\n'));
`
  },
  {
    id: 'web-c6-e2',
    chapter: 6,
    level: 'n3',
    language: 'javascript',
    title: 'Filtrer et trier un tableau',
    goal: 'Enchaîner filter() et sort() : le geste le plus fréquent du JavaScript de données.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes ' +
      '<code>nom note</code>. Affichez les noms des étudiants ayant <strong>au moins 10</strong>, triés par ' +
      'note décroissante, puis par ordre alphabétique en cas d’égalité, un nom par ligne.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const eleves = lignes.slice(1, 1 + n);

// À compléter : afficher les noms des admis, triés par note décroissante.
`,
    hints: [
      'sort() prend une fonction de comparaison ; elle renvoie un nombre négatif pour placer a avant b.',
      'En cas d’égalité de notes, compare les noms avec localeCompare().'
    ],
    examples: [
      { stdin: '3\nAda 18\nBob 8\nChloe 15', expected: 'Ada\nChloe', note: 'Bob est éliminé avec 8.' }
    ],
    tests: [
      { label: 'Égalité tranchée par ordre alphabétique', stdin: '2\nAl 12\nBo 12', expected: 'Al\nBo' },
      { label: 'Un seul admis', stdin: '2\nZoe 10\nYves 4', expected: 'Zoe' },
      { label: 'Ordre déjà mélangé', stdin: '4\nA 15\nB 20\nC 9\nD 17', expected: 'B\nD\nA' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const eleves = lignes.slice(1, 1 + n);

const fiches = eleves.map(ligne => {
  const parties = ligne.trim().split(' ');
  return { nom: parties.slice(0, -1).join(' '), note: Number(parties[parties.length - 1]) };
});

fiches
  .filter(fiche => fiche.note >= 10)
  .sort((a, b) => b.note - a.note || a.nom.localeCompare(b.nom))
  .forEach(fiche => console.log(fiche.nom));
`
  },
  {
    id: 'web-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'javascript',
    title: 'Simuler un gestionnaire d’événements',
    goal: 'Faire l’état des lieux d’un compteur avant de l’écrire dans le DOM.',
    brief: '<p>Un bouton déclenche un JavaScript qui gère deux événements : <code>click</code> incrémente ' +
      'un compteur, <code>reset</code> le remet à zéro. Le programme reçoit un entier <code>n</code>, puis ' +
      '<code>n</code> noms d’événements (un par ligne). Affichez sur la première ligne le nombre total de ' +
      '<code>click</code> reçus, puis sur la seconde la valeur finale du compteur.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const evenements = lignes.slice(1, 1 + n);

// À compléter : afficher le nombre total de clics, puis la valeur finale du compteur.
`,
    hints: [
      'Ce sont deux informations différentes : un clic suivi d’une remise à zéro compte 1 clic mais laisse 0.',
      'deux variables : une qui ne fait que croître, une qui peut revenir à zéro.'
    ],
    examples: [
      { stdin: '4\nclick\nclick\nreset\nclick', expected: '3\n1', note: 'Trois clics au total, mais un seul après la remise à zéro.' }
    ],
    tests: [
      { label: 'Aucune remise à zéro', stdin: '4\nclick\nclick\nclick\nclick', expected: '4\n4' },
      { label: 'Remise à zéro initiale', stdin: '2\nreset\nreset', expected: '0\n0' },
      { label: 'Alternance', stdin: '5\nclick\nreset\nclick\nclick\nreset', expected: '3\n0' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const evenements = lignes.slice(1, 1 + n).map(e => e.trim());

let clics = 0;
let compteur = 0;

for (const evenement of evenements) {
  if (evenement === 'click') {
    clics++;
    compteur++;
  } else if (evenement === 'reset') {
    compteur = 0;
  }
}

console.log(clics);
console.log(compteur);
`
  }
];

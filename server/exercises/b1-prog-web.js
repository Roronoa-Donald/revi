/**
 * Exercices de code — Programmation Web (B1), 3 par module, en JavaScript.
 *
 * Chapitre 1 porte sur le protocole HTTP et l'anatomie des URL.
 * Chapitres 2 à 6 (`preview: 'html'`) produisent de véritables composants
 * HTML5, feuilles CSS (<style>) et widgets DOM/JS rendus en direct dans
 * l'onglet « Aperçu Web » (iframe `sandbox="allow-scripts"` sans
 * `allow-same-origin`) tout en restant évaluables côté serveur Node/Oanor.
 */

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
    goal: 'Séparer une adresse HTTP simplifiée en protocole, autorité, chemin et requête.',
    brief: '<p>Le programme reçoit une adresse HTTP absolue simplifiée, sans fragment ni identifiants, sur une seule ligne. ' +
      'Si une requête est présente, l’adresse fournie contient un <code>/</code> entre l’autorité et le <code>?</code>. Affichez ses quatre composantes, ' +
      'chacune sur sa ligne, dans l’ordre : le <strong>protocole</strong> (ce qui précède <code>://</code>), ' +
      'l’<strong>autorité</strong> (hôte et port éventuel, jusqu’au premier <code>/</code>), le <strong>chemin</strong> (jusqu’au ' +
      '<code>?</code>) et la <strong>requête</strong> (ce qui suit le <code>?</code>). Si l’adresse n’a pas ' +
      'de chemin, affichez <code>/</code> ; si elle n’a pas de requête, affichez <code>-</code>.</p>',
    starter: LIRE + `
const url = lignes[0];

// À compléter : afficher le protocole, l’hôte, le chemin et la requête.
`,
    hints: [
      "Comment repérer la position d’un séparateur et vérifier s’il est absent ?",
      "Pour couper une chaîne en deux à un séparateur, slice() suffit : slice(0, i) et slice(i + 1).",
      "Coupez d’abord à « :// », puis au premier « / » pour le chemin et à « ? » pour la requête (sinon « - »)."
    ],
    takeaway: 'Une URL HTTP se découpe de gauche à droite en schéma (://), autorité (hôte:port), chemin (/) et chaîne de requête (?).',
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
      "Quel chiffre du code permet de reconnaître sa famille ?",
      "Une table qui associe le chiffre des centaines au libellé évite cinq if imbriqués.",
      "Prenez Math.floor(code / 100) pour indexer les 5 libellés : 1 information, 2 succès, 3 redirection, 4 erreur client, 5 erreur serveur."
    ],
    takeaway: 'Le chiffre des centaines d’un statut HTTP (1xx à 5xx) indique immédiatement si la requête réussit, redirige ou échoue côté client/serveur.',
    examples: [
      { stdin: '3\n200\n404\n301', expected: '200 succès\n404 erreur client\n301 redirection', note: 'Trois codes, trois familles.' }
    ],
    tests: [
      { label: 'Fin de chaque classe et code 451', stdin: '5\n199\n299\n399\n451\n499', expected: '199 information\n299 succès\n399 redirection\n451 erreur client\n499 erreur client' },
      { label: 'Erreur serveur', stdin: '1\n500', expected: '500 erreur serveur' },
      { label: 'Information', stdin: '1\n100', expected: '100 information' },
      { label: 'Les cinq familles', stdin: '5\n204\n302\n403\n503\n101', expected: '204 succès\n302 redirection\n403 erreur client\n503 erreur serveur\n101 information' },
      { label: 'Ligne surnuméraire ignorée', stdin: '2\n200\n404\n999', expected: '200 succès\n404 erreur client' }
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
    goal: 'Reconnaître les méthodes définies comme idempotentes par HTTP.',
    brief: '<p>Une méthode est <strong>idempotente</strong> lorsque répéter une même requête a le même effet ' +
      'demandé qu’une seule. HTTP définit <code>GET</code>, <code>HEAD</code>, <code>PUT</code>, <code>DELETE</code>, ' +
      '<code>OPTIONS</code> et <code>TRACE</code> comme idempotentes ; il ne garantit pas cette propriété pour ' +
      '<code>POST</code> et <code>PATCH</code>, même si une opération particulière peut l’être. Le programme ' +
      'reçoit un entier <code>n</code>, puis <code>n</code> de ces méthodes (une par ligne, ' +
      'en majuscules). Affichez <code>MÉTHODE oui</code> quand HTTP définit la méthode comme idempotente ; ' +
      'sinon, affichez <code>MÉTHODE non</code>, même si une opération particulière peut être idempotente.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const methodes = lignes.slice(1, 1 + n);

// À compléter : afficher chaque méthode suivie de « oui » ou « non ».
`,
    hints: [
      "Comment vérifier si une méthode appartient au groupe des méthodes idempotentes ?",
      "La casse compte : normalisez en majuscules avec .trim().toUpperCase().",
      "Testez si la méthode figure dans ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'] → oui, sinon (POST, PATCH) → non."
    ],
    takeaway: 'En HTTP, GET, HEAD, PUT, DELETE, OPTIONS et TRACE sont définies idempotentes, contrairement à POST et PATCH.',
    examples: [
      { stdin: '2\nGET\nPOST', expected: 'GET oui\nPOST non', note: 'GET est défini comme idempotent ; POST ne le garantit pas.' }
    ],
    tests: [
      { label: 'Trois méthodes', stdin: '3\nPATCH\nDELETE\nPUT', expected: 'PATCH non\nDELETE oui\nPUT oui' },
      { label: 'Méthodes de lecture', stdin: '2\nHEAD\nOPTIONS', expected: 'HEAD oui\nOPTIONS oui' },
      { label: 'Inspection et création', stdin: '2\nTRACE\nPOST', expected: 'TRACE oui\nPOST non' },
      { label: 'Ligne surnuméraire ignorée', stdin: '2\nGET\nPOST\nEXTRA', expected: 'GET oui\nPOST non' }
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
  // Module 2 — HTML : structure sémantique (avec Aperçu Web sandboxé)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'javascript',
    preview: 'html',
    title: 'Construire une page HTML5 sémantique',
    goal: 'Assembler les repères HTML5 (<header>, <nav>, <main>, <footer>) et observer leur rendu.',
    brief: '<p>Le programme reçoit une ligne <code>titre</code> puis un entier <code>n</code> et <code>n</code> liens ' +
      '<code>libelle|href</code>. Construisez et affichez le balisage HTML5 exact (à voir aussi dans <strong>Aperçu Web</strong>) : ' +
      '<code>&lt;header&gt;&lt;h1&gt;titre&lt;/h1&gt;&lt;nav&gt;&lt;a href="href"&gt;libelle&lt;/a&gt;...&lt;/nav&gt;&lt;/header&gt;</code>, ' +
      'suivi de <code>&lt;main&gt;&lt;p&gt;Contenu principal&lt;/p&gt;&lt;/main&gt;</code> et <code>&lt;footer&gt;Pied de page&lt;/footer&gt;</code> ' +
      '(un bloc par ligne, liens séparés par un espace).</p>',
    starter: LIRE + `
const titre = lignes[0].trim();
const n = Number(lignes[1]);
const liens = lignes.slice(2, 2 + n);

// À compléter : construire et afficher <header>, <main> et <footer> en HTML5.
`,
    hints: [
      "Découpez chaque lien sur '|' avec .split('|') pour obtenir [libelle, href].",
      "Enveloppez la barre de liens dans <nav>...</nav> à l’intérieur de <header>, sans oublier <main> et <footer>.",
      "Assemblez les 3 lignes : `<header><h1>${titre}</h1><nav>${ancres}</nav></header>`, `<main><p>Contenu principal</p></main>`, `<footer>Pied de page</footer>`."
    ],
    takeaway: 'Les balises sémantiques <header>, <nav>, <main> et <footer> structurent une page pour les navigateurs et les lecteurs d’écran bien mieux que des <div>.',
    examples: [
      { stdin: 'Mon Campus\n2\nAccueil|/index.html\nCours|/cours.html', expected: '<header><h1>Mon Campus</h1><nav><a href="/index.html">Accueil</a> <a href="/cours.html">Cours</a></nav></header>\n<main><p>Contenu principal</p></main>\n<footer>Pied de page</footer>', note: 'Cliquez sur Exécuter puis consultez l’onglet Aperçu Web.' }
    ],
    tests: [
      { label: 'Un seul lien de navigation', stdin: 'Portail B1\n1\nAtelier|/atelier.html', expected: '<header><h1>Portail B1</h1><nav><a href="/atelier.html">Atelier</a></nav></header>\n<main><p>Contenu principal</p></main>\n<footer>Pied de page</footer>' },
      { label: 'Trois liens', stdin: 'Docs\n3\nHTML|#html\nCSS|#css\nJS|#js', expected: '<header><h1>Docs</h1><nav><a href="#html">HTML</a> <a href="#css">CSS</a> <a href="#js">JS</a></nav></header>\n<main><p>Contenu principal</p></main>\n<footer>Pied de page</footer>' },
      { label: 'Navigation vide', stdin: 'Page Vide\n0', expected: '<header><h1>Page Vide</h1><nav></nav></header>\n<main><p>Contenu principal</p></main>\n<footer>Pied de page</footer>' }
    ],
    solution: LIRE + `
const titre = lignes[0].trim();
const n = Number(lignes[1]);
const liens = lignes.slice(2, 2 + n).map(l => {
  const [libelle, href] = l.trim().split('|');
  return '<a href="' + href + '">' + libelle + '</a>';
}).join(' ');

console.log('<header><h1>' + titre + '</h1><nav>' + liens + '</nav></header>');
console.log('<main><p>Contenu principal</p></main>');
console.log('<footer>Pied de page</footer>');
`
  },
  {
    id: 'web-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'javascript',
    preview: 'html',
    title: 'Tableau HTML accessible avec caption et th',
    goal: 'Générer un vrai tableau HTML structuré (<caption>, <thead>, <tbody>, <th scope="col">).',
    brief: '<p>Le programme reçoit une ligne <code>legende</code>, puis un entier <code>n</code> et <code>n</code> lignes ' +
      '<code>nom|note</code>. Affichez un tableau HTML accessible complet sur une ligne par balise principale : ' +
      '<code>&lt;table&gt;</code>, <code>&lt;caption&gt;legende&lt;/caption&gt;</code>, ' +
      '<code>&lt;thead&gt;&lt;tr&gt;&lt;th scope="col"&gt;Nom&lt;/th&gt;&lt;th scope="col"&gt;Note&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;</code>, ' +
      '<code>&lt;tbody&gt;</code> puis chaque ligne <code>&lt;tr&gt;&lt;td&gt;nom&lt;/td&gt;&lt;td&gt;note&lt;/td&gt;&lt;/tr&gt;</code>, puis <code>&lt;/tbody&gt;</code> et <code>&lt;/table&gt;</code>.</p>',
    starter: LIRE + `
const legende = lignes[0].trim();
const n = Number(lignes[1]);
const lignesTableau = lignes.slice(2, 2 + n);

// À compléter : générer le <table> avec <caption>, <thead> (<th scope="col">) et <tbody>.
`,
    hints: [
      "Un tableau accessible relie toujours un titre (<caption>) et des en-têtes explicites (<th scope=\"col\">).",
      "Séparez les colonnes de chaque ligne avec .split('|') avant de produire <tr><td>...</td><td>...</td></tr>.",
      "N’oubliez pas de fermer </tbody> puis </table> après la boucle sur les lignes."
    ],
    takeaway: '<caption> décrit le sujet du tableau et <th scope="col"> associe explicitement chaque colonne à ses cellules <td> pour l’accessibilité.',
    examples: [
      { stdin: 'Notes B1\n2\nAda|18\nLinus|15', expected: '<table>\n<caption>Notes B1</caption>\n<thead><tr><th scope="col">Nom</th><th scope="col">Note</th></tr></thead>\n<tbody>\n<tr><td>Ada</td><td>18</td></tr>\n<tr><td>Linus</td><td>15</td></tr>\n</tbody>\n</table>' }
    ],
    tests: [
      { label: 'Une seule ligne', stdin: 'Bilan\n1\nGrace|19', expected: '<table>\n<caption>Bilan</caption>\n<thead><tr><th scope="col">Nom</th><th scope="col">Note</th></tr></thead>\n<tbody>\n<tr><td>Grace</td><td>19</td></tr>\n</tbody>\n</table>' },
      { label: 'Trois étudiants', stdin: 'Semestre 1\n3\nAlice|14\nBob|11\nChloé|17', expected: '<table>\n<caption>Semestre 1</caption>\n<thead><tr><th scope="col">Nom</th><th scope="col">Note</th></tr></thead>\n<tbody>\n<tr><td>Alice</td><td>14</td></tr>\n<tr><td>Bob</td><td>11</td></tr>\n<tr><td>Chloé</td><td>17</td></tr>\n</tbody>\n</table>' },
      { label: 'Ligne supplémentaire ignorée', stdin: 'Test\n1\nNora|16\nExtra|0', expected: '<table>\n<caption>Test</caption>\n<thead><tr><th scope="col">Nom</th><th scope="col">Note</th></tr></thead>\n<tbody>\n<tr><td>Nora</td><td>16</td></tr>\n</tbody>\n</table>' }
    ],
    solution: LIRE + `
const legende = lignes[0].trim();
const n = Number(lignes[1]);
const entrees = lignes.slice(2, 2 + n);

const out = [
  '<table>',
  '<caption>' + legende + '</caption>',
  '<thead><tr><th scope="col">Nom</th><th scope="col">Note</th></tr></thead>',
  '<tbody>'
];
for (const ligne of entrees) {
  const [nom, note] = ligne.trim().split('|');
  out.push('<tr><td>' + nom + '</td><td>' + note + '</td></tr>');
}
out.push('</tbody>', '</table>');
console.log(out.join('\\n'));
`
  },
  {
    id: 'web-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Plan de titres HTML et validation sémantique',
    goal: 'Contrôler une hiérarchie h1–h6 sans saut de niveau et générer l’aperçu structuré correspondant.',
    brief: '<p>Une page est bien structurée si son premier titre est un <code>h1</code> et si l’on ne descend jamais ' +
      'de plus d’un niveau d’un titre au suivant. Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes ' +
      '<code>niveau|texte</code> (ex. <code>h2|Introduction</code>). S’il est conforme, affichez ' +
      '<code>&lt;article data-conforme="1"&gt;</code> puis chaque balise <code>&lt;hX&gt;texte&lt;/hX&gt;</code> puis ' +
      '<code>&lt;/article&gt;</code> ; sinon affichez <code>&lt;p role="alert"&gt;Hierarchie non conforme&lt;/p&gt;</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const items = lignes.slice(1, 1 + n).map(l => {
  const [balise, texte] = l.trim().split('|');
  return { balise, niveau: Number(balise[1]), texte };
});

// À compléter : vérifier h1 initial et écart <= 1 à la descente, puis émettre l'article HTML ou l'alerte.
`,
    hints: [
      "Le premier élément doit avoir niveau === 1 ; pour chaque suivant i > 0, vérifiez items[i].niveau <= items[i - 1].niveau + 1.",
      "Remonter d’un h3 vers un h2 est valide : seule une descente brusque (ex. h1 → h3) enfreint l’accessibilité.",
      "Si conforme vaut true, entourez les `<${b}>${texte}</${b}>` de `<article data-conforme=\"1\">` et `</article>`."
    ],
    takeaway: 'Ne jamais sauter de niveau de titre (ex. h1 → h3) garantit un plan de document navigable au lecteur d’écran.',
    examples: [
      { stdin: '3\nh1|Cours Web\nh2|Chapitre 2\nh3|Balises', expected: '<article data-conforme="1">\n<h1>Cours Web</h1>\n<h2>Chapitre 2</h2>\n<h3>Balises</h3>\n</article>' }
    ],
    tests: [
      { label: 'Commence par h2', stdin: '2\nh2|Sous-titre\nh3|Suite', expected: '<p role="alert">Hierarchie non conforme</p>' },
      { label: 'Saut h1 vers h3', stdin: '2\nh1|Titre\nh3|Saut', expected: '<p role="alert">Hierarchie non conforme</p>' },
      { label: 'Remontée h3 vers h2 autorisée', stdin: '4\nh1|Site\nh2|Part 1\nh3|Detail\nh2|Part 2', expected: '<article data-conforme="1">\n<h1>Site</h1>\n<h2>Part 1</h2>\n<h3>Detail</h3>\n<h2>Part 2</h2>\n</article>' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const items = lignes.slice(1, 1 + n).map(l => {
  const [balise, texte] = l.trim().split('|');
  return { balise, niveau: Number(balise[1]), texte };
});

let conforme = items.length > 0 && items[0].niveau === 1;
for (let i = 1; i < items.length; i++) {
  if (items[i].niveau > items[i - 1].niveau + 1) conforme = false;
}

if (!conforme) {
  console.log('<p role="alert">Hierarchie non conforme</p>');
} else {
  const out = ['<article data-conforme="1">'];
  for (const it of items) {
    out.push('<' + it.balise + '>' + it.texte + '</' + it.balise + '>');
  }
  out.push('</article>');
  console.log(out.join('\\n'));
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Formulaires HTML5, validation et sécurité XSS
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'javascript',
    preview: 'html',
    title: 'Formulaire e-mail HTML5 et retour d’état',
    goal: 'Construire un formulaire HTML5 accessible (<label for>) et afficher un retour de validation.',
    brief: '<p>Le programme reçoit une adresse e-mail sur une ligne. Elle est valide s’il y a exactement un <code>@</code>, ' +
      'une partie locale non vide, un domaine contenant un <code>.</code> ni au début ni à la fin, et aucun espace. ' +
      'Affichez le composant HTML de formulaire à 3 lignes : ' +
      '<code>&lt;form class="champ"&gt;</code>, <code>&lt;label for="email"&gt;Courriel&lt;/label&gt;&lt;input id="email" type="email" value="ADRESSE"&gt;</code> ' +
      '(échappez <code>"</code>, <code>&lt;</code>, <code>&gt;</code> dans value si besoin? Ici entrées simples alphanumériques), ' +
      'et <code>&lt;p role="status" data-etat="valide|invalide"&gt;valide|invalide&lt;/p&gt;&lt;/form&gt;</code>.</p>',
    starter: LIRE + `
const adresse = lignes[0].trim();

// À compléter : valider l'adresse et générer le <form> avec <label> + <input type="email"> + retour <p role="status">.
`,
    hints: [
      "Vérifiez que l’adresse ne contient pas d’espace, a split('@').length === 2, un identifiant local non vide, et un '.' interne au domaine.",
      "Associez toujours <label for=\"email\"> au champ <input id=\"email\" type=\"email\">.",
      "Émettez exactement <p role=\"status\" data-etat=\"...\">valide|invalide</p></form> en dernière ligne."
    ],
    takeaway: 'Un <label for="..."> lié à l’id du champ rend le formulaire utilisable au clavier/lecteur d’écran, en complément d’une validation JS explicite.',
    examples: [
      { stdin: 'etudiant.b1@campus.fr', expected: '<form class="champ">\n<label for="email">Courriel</label><input id="email" type="email" value="etudiant.b1@campus.fr">\n<p role="status" data-etat="valide">valide</p></form>' }
    ],
    tests: [
      { label: 'Sans arobase', stdin: 'pas-une-adresse', expected: '<form class="champ">\n<label for="email">Courriel</label><input id="email" type="email" value="pas-une-adresse">\n<p role="status" data-etat="invalide">invalide</p></form>' },
      { label: 'Domaine sans point', stdin: 'nom@domaine', expected: '<form class="champ">\n<label for="email">Courriel</label><input id="email" type="email" value="nom@domaine">\n<p role="status" data-etat="invalide">invalide</p></form>' },
      { label: 'Espace interdit', stdin: 'user name@domaine.fr', expected: '<form class="champ">\n<label for="email">Courriel</label><input id="email" type="email" value="user name@domaine.fr">\n<p role="status" data-etat="invalide">invalide</p></form>' },
      { label: 'Domaine court valide', stdin: 'contact@x.org', expected: '<form class="champ">\n<label for="email">Courriel</label><input id="email" type="email" value="contact@x.org">\n<p role="status" data-etat="valide">valide</p></form>' }
    ],
    solution: LIRE + `
const adresse = lignes[0].trim();

function estValide(texte) {
  if (!texte || texte.includes(' ')) return false;
  const parts = texte.split('@');
  if (parts.length !== 2 || !parts[0]) return false;
  const point = parts[1].indexOf('.');
  return point > 0 && point < parts[1].length - 1;
}

const etat = estValide(adresse) ? 'valide' : 'invalide';
console.log('<form class="champ">');
console.log('<label for="email">Courriel</label><input id="email" type="email" value="' + adresse + '">');
console.log('<p role="status" data-etat="' + etat + '">' + etat + '</p></form>');
`
  },
  {
    id: 'web-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Indicateur HTML/CSS de force de mot de passe',
    goal: 'Évaluer 5 critères de robustesse et restituer une jauge CSS colorée dans l’aperçu.',
    brief: '<p>Le programme reçoit un mot de passe. Évaluez 5 critères : ≥ 8 caractères ; ≥ 1 majuscule ; ≥ 1 minuscule ; ' +
      '≥ 1 chiffre ; ≥ 1 caractère spécial (<code>[^A-Za-z0-9]</code>). Calculez <code>score</code> et <code>conseil</code> ' +
      '(<code>faible</code> si score ≤ 2, <code>moyen</code> si 3–4, <code>fort</code> si 5). Affichez le bloc HTML+CSS : ' +
      '<code>&lt;style&gt;.jauge{padding:8px;border-radius:6px}.faible{background:#fee2e2;color:#991b1b}.moyen{background:#fef3c7;color:#92400e}.fort{background:#dcfce7;color:#166534}&lt;/style&gt;</code> ' +
      'puis <code>&lt;div class="jauge CONSEIL" data-score="SCORE"&gt;SCORE/5 : CONSEIL&lt;/div&gt;</code>.</p>',
    starter: LIRE + `
const motDePasse = lignes[0];

// À compléter : compter les 5 critères et afficher le <style> + <div class="jauge ...">.
`,
    hints: [
      "Sommez les 5 booléens avec [length >= 8, /[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(Boolean).length.",
      "Déduisez conseil : score <= 2 ? 'faible' : score < 5 ? 'moyen' : 'fort'.",
      "Affichez la ligne <style> exacte suivie du <div class=\"jauge ...\" data-score=\"...\">SCORE/5 : CONSEIL</div>."
    ],
    takeaway: 'Un retour visuel immédiat associe calcul de règles JS et classes CSS sémantiques (.faible, .moyen, .fort) sans exposer le mot de passe en clair.',
    examples: [
      { stdin: 'B1-secret!', expected: '<style>.jauge{padding:8px;border-radius:6px}.faible{background:#fee2e2;color:#991b1b}.moyen{background:#fef3c7;color:#92400e}.fort{background:#dcfce7;color:#166534}</style>\n<div class="jauge fort" data-score="5">5/5 : fort</div>' }
    ],
    tests: [
      { label: 'Minuscules seules', stdin: 'abcdefgh', expected: '<style>.jauge{padding:8px;border-radius:6px}.faible{background:#fee2e2;color:#991b1b}.moyen{background:#fef3c7;color:#92400e}.fort{background:#dcfce7;color:#166534}</style>\n<div class="jauge faible" data-score="2">2/5 : faible</div>' },
      { label: 'Moyen sans symbole', stdin: 'Abcdefg1', expected: '<style>.jauge{padding:8px;border-radius:6px}.faible{background:#fee2e2;color:#991b1b}.moyen{background:#fef3c7;color:#92400e}.fort{background:#dcfce7;color:#166534}</style>\n<div class="jauge moyen" data-score="4">4/5 : moyen</div>' },
      { label: 'Trop court', stdin: 'abc', expected: '<style>.jauge{padding:8px;border-radius:6px}.faible{background:#fee2e2;color:#991b1b}.moyen{background:#fef3c7;color:#92400e}.fort{background:#dcfce7;color:#166534}</style>\n<div class="jauge faible" data-score="1">1/5 : faible</div>' }
    ],
    solution: LIRE + `
const motDePasse = lignes[0];
const score = [
  motDePasse.length >= 8,
  /[A-Z]/.test(motDePasse),
  /[a-z]/.test(motDePasse),
  /[0-9]/.test(motDePasse),
  /[^A-Za-z0-9]/.test(motDePasse)
].filter(Boolean).length;
const conseil = score <= 2 ? 'faible' : score < 5 ? 'moyen' : 'fort';
console.log('<style>.jauge{padding:8px;border-radius:6px}.faible{background:#fee2e2;color:#991b1b}.moyen{background:#fef3c7;color:#92400e}.fort{background:#dcfce7;color:#166534}</style>');
console.log('<div class="jauge ' + conseil + '" data-score="' + score + '">' + score + '/5 : ' + conseil + '</div>');
`
  },
  {
    id: 'web-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Neutraliser une injection XSS dans un composant HTML',
    goal: 'Échapper toute saisie utilisateur avant insertion dans du HTML afin qu’un <script> reste un texte inoffensif.',
    brief: '<p>Le programme reçoit une saisie visiteur sur une ligne. Échappez dans l’ordre <code>&amp;</code> (→ <code>&amp;amp;</code>), ' +
      '<code>&lt;</code> (→ <code>&amp;lt;</code>), <code>&gt;</code> (→ <code>&amp;gt;</code>), <code>"</code> (→ <code>&amp;quot;</code>) ' +
      'et <code>\'</code> (→ <code>&amp;#39;</code>), puis affichez : ' +
      '<code>&lt;article class="commentaire"&gt;&lt;p&gt;TEXTE_ECHAPPE&lt;/p&gt;&lt;/article&gt;</code>. ' +
      'Vérifiez dans l’Aperçu Web que <code>&lt;script&gt;</code> s’affiche littéralement sans s’exécuter.</p>',
    starter: LIRE + `
const texte = lignes[0];

// À compléter : échapper &, <, >, " et ' puis envelopper dans <article class="commentaire"><p>...</p></article>.
`,
    hints: [
      "Commencez obligatoirement par remplacer & → &amp; avant < et >, sinon vos propres entités seront double-échappées.",
      "Utilisez .replace(/.../g, ...) sur les 5 caractères sensibles.",
      "Enveloppez le résultat dans '<article class=\"commentaire\"><p>' + echappe + '</p></article>'."
    ],
    takeaway: 'Échapper & en premier puis <, >, ", \' empêche tout texte saisi de devenir du code HTML/JS exécutable (faille XSS).',
    examples: [
      { stdin: '5 < 10 & "ok"', expected: '<article class="commentaire"><p>5 &lt; 10 &amp; &quot;ok&quot;</p></article>' }
    ],
    tests: [
      { label: 'Injection script bloquée', stdin: '<script>alert(1)</script>', expected: '<article class="commentaire"><p>&lt;script&gt;alert(1)&lt;/script&gt;</p></article>' },
      { label: 'Apostrophe et guillemets', stdin: 'C\'est "vrai"', expected: '<article class="commentaire"><p>C&#39;est &quot;vrai&quot;</p></article>' },
      { label: 'Texte sain', stdin: 'Rien a signaler', expected: '<article class="commentaire"><p>Rien a signaler</p></article>' }
    ],
    solution: LIRE + `
const texte = lignes[0];
const echappe = texte
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');
console.log('<article class="commentaire"><p>' + echappe + '</p></article>');
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — CSS : sélecteurs, variables, modèle de boîte
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'javascript',
    preview: 'html',
    title: 'Feuille CSS : variables et spécificité des cartes',
    goal: 'Générer une feuille <style> avec variables CSS (--accent) et vérifier la priorité de classe modificateur.',
    brief: '<p>Le programme reçoit une ligne <code>titre|couleur|prioritaire</code> (<code>prioritaire</code> vaut <code>oui</code> ou <code>non</code>). ' +
      'Produisez une carte HTML stylée : ligne 1 <code>&lt;style&gt;:root{--accent:COULEUR}.carte{border:2px solid #cbd5e1;padding:12px;border-radius:8px}.carte--top{border-color:var(--accent);background:#eff6ff}&lt;/style&gt;</code>, ' +
      'ligne 2 <code>&lt;section class="carte[ carte--top]"&gt;&lt;h2&gt;TITRE&lt;/h2&gt;&lt;/section&gt;</code> (ajoutez <code>carte--top</code> uniquement si <code>prioritaire === "oui"</code>).</p>',
    starter: LIRE + `
const [titre, couleur, prioritaire] = lignes[0].trim().split('|');

// À compléter : afficher le <style> avec --accent et la <section class="carte..."> correspondante.
`,
    hints: [
      "Injectez la couleur dans --accent via :root{--accent:" + "COULEUR}.",
      "Si prioritaire vaut 'oui', la classe devient 'carte carte--top' ; sinon simplement 'carte'.",
      "En CSS, .carte--top gagne sur .carte par l’ordre de déclaration à spécificité égale (0,1,0)."
    ],
    takeaway: 'Les variables CSS (--accent) centralisent les couleurs réutilisables et la cascade départage les classes selon leur ordre ou spécificité.',
    examples: [
      { stdin: 'Alerte réseau|#dc2626|oui', expected: '<style>:root{--accent:#dc2626}.carte{border:2px solid #cbd5e1;padding:12px;border-radius:8px}.carte--top{border-color:var(--accent);background:#eff6ff}</style>\n<section class="carte carte--top"><h2>Alerte réseau</h2></section>' }
    ],
    tests: [
      { label: 'Carte standard', stdin: 'Note B1|#2563eb|non', expected: '<style>:root{--accent:#2563eb}.carte{border:2px solid #cbd5e1;padding:12px;border-radius:8px}.carte--top{border-color:var(--accent);background:#eff6ff}</style>\n<section class="carte"><h2>Note B1</h2></section>' },
      { label: 'Carte prioritaire verte', stdin: 'Validation|#16a34a|oui', expected: '<style>:root{--accent:#16a34a}.carte{border:2px solid #cbd5e1;padding:12px;border-radius:8px}.carte--top{border-color:var(--accent);background:#eff6ff}</style>\n<section class="carte carte--top"><h2>Validation</h2></section>' },
      { label: 'Autre accent sans mise en avant', stdin: 'Archive|#9333ea|non', expected: '<style>:root{--accent:#9333ea}.carte{border:2px solid #cbd5e1;padding:12px;border-radius:8px}.carte--top{border-color:var(--accent);background:#eff6ff}</style>\n<section class="carte"><h2>Archive</h2></section>' }
    ],
    solution: LIRE + `
const [titre, couleur, prioritaire] = lignes[0].trim().split('|');
const cls = prioritaire === 'oui' ? 'carte carte--top' : 'carte';
console.log('<style>:root{--accent:' + couleur + '}.carte{border:2px solid #cbd5e1;padding:12px;border-radius:8px}.carte--top{border-color:var(--accent);background:#eff6ff}</style>');
console.log('<section class="' + cls + '"><h2>' + titre + '</h2></section>');
`
  },
  {
    id: 'web-c4-e2',
    chapter: 4,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Comparateur visuel content-box vs border-box',
    goal: 'Générer deux boîtes CSS côte à côte pour visualiser la différence de largeur finale entre content-box et border-box.',
    brief: '<p>Le programme reçoit <code>largeur padding bordure</code> (3 entiers en px). Calculez la largeur rendue en ' +
      '<code>content-box</code> (<code>largeur + 2*padding + 2*bordure</code>) et la largeur utile du contenu en ' +
      '<code>border-box</code> (<code>largeur - 2*padding - 2*bordure</code>). Affichez : ' +
      'ligne 1 <code>&lt;style&gt;.box{width:Lpx;padding:Ppx;border:Bpx solid #2563eb;margin-bottom:8px;background:#dbeafe}.cb{box-sizing:content-box}.bb{box-sizing:border-box}&lt;/style&gt;</code>, ' +
      'ligne 2 <code>&lt;div class="box cb"&gt;content-box : total TOTALpx&lt;/div&gt;</code>, ' +
      'ligne 3 <code>&lt;div class="box bb"&gt;border-box : contenu CONTENUpx&lt;/div&gt;</code>.</p>',
    starter: LIRE + `
const [largeur, padding, bordure] = lignes[0].trim().split(' ').map(Number);

// À compléter : calculer total content-box et contenu border-box, puis émettre <style> et les 2 <div>.
`,
    hints: [
      "En content-box, la largeur totale vaut largeur + 2 * padding + 2 * bordure.",
      "En border-box, la largeur totale reste égale à largeur, donc la zone de contenu vaut largeur - 2 * padding - 2 * bordure.",
      "Ouvrez Aperçu Web après exécution pour comparer visuellement la largeur des deux boîtes bleues."
    ],
    takeaway: 'Avec box-sizing: border-box, width inclut padding et border, évitant les débordements fréquents avec content-box.',
    examples: [
      { stdin: '200 10 2', expected: '<style>.box{width:200px;padding:10px;border:2px solid #2563eb;margin-bottom:8px;background:#dbeafe}.cb{box-sizing:content-box}.bb{box-sizing:border-box}</style>\n<div class="box cb">content-box : total 224px</div>\n<div class="box bb">border-box : contenu 176px</div>' }
    ],
    tests: [
      { label: 'Boîte nue', stdin: '100 0 0', expected: '<style>.box{width:100px;padding:0px;border:0px solid #2563eb;margin-bottom:8px;background:#dbeafe}.cb{box-sizing:content-box}.bb{box-sizing:border-box}</style>\n<div class="box cb">content-box : total 100px</div>\n<div class="box bb">border-box : contenu 100px</div>' },
      { label: 'Grand padding', stdin: '300 20 5', expected: '<style>.box{width:300px;padding:20px;border:5px solid #2563eb;margin-bottom:8px;background:#dbeafe}.cb{box-sizing:content-box}.bb{box-sizing:border-box}</style>\n<div class="box cb">content-box : total 350px</div>\n<div class="box bb">border-box : contenu 250px</div>' },
      { label: 'Bordure fine', stdin: '150 5 1', expected: '<style>.box{width:150px;padding:5px;border:1px solid #2563eb;margin-bottom:8px;background:#dbeafe}.cb{box-sizing:content-box}.bb{box-sizing:border-box}</style>\n<div class="box cb">content-box : total 162px</div>\n<div class="box bb">border-box : contenu 138px</div>' }
    ],
    solution: LIRE + `
const [largeur, padding, bordure] = lignes[0].trim().split(' ').map(Number);
const total = largeur + 2 * padding + 2 * bordure;
const contenu = largeur - 2 * padding - 2 * bordure;
console.log('<style>.box{width:' + largeur + 'px;padding:' + padding + 'px;border:' + bordure + 'px solid #2563eb;margin-bottom:8px;background:#dbeafe}.cb{box-sizing:content-box}.bb{box-sizing:border-box}</style>');
console.log('<div class="box cb">content-box : total ' + total + 'px</div>');
console.log('<div class="box bb">border-box : contenu ' + contenu + 'px</div>');
`
  },
  {
    id: 'web-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Échelle typographique CSS en rem et px',
    goal: 'Convertir des unités CSS relatives (rem, em, px) en pixels et afficher leur rendu typographique.',
    brief: '<p>Le programme reçoit une base <code>rootPx</code> (ex. <code>16</code>), puis <code>n</code> et <code>n</code> lignes ' +
      '<code>libelle|valeur unite</code> (<code>px</code>, <code>rem</code> ou <code>em</code> par rapport à la base). ' +
      'Pour chaque entrée, calculez la taille en pixels avec 2 décimales et affichez ' +
      '<code>&lt;p style="font-size:XX.XXpx"&gt;libelle (XX.XXpx)&lt;/p&gt;</code>.</p>',
    starter: LIRE + `
const base = Number(lignes[0]);
const n = Number(lignes[1]);
const entrees = lignes.slice(2, 2 + n);

// À compléter : convertir px/rem/em en px (.toFixed(2)) et afficher <p style="font-size:...px">...</p>.
`,
    hints: [
      "Séparez libelle et expression sur '|', puis valeur et unite sur ' '.",
      "Multipliez par base si l’unité est rem ou em ; gardez la valeur brute si c’est px.",
      "Formatez avec .toFixed(2) à la fois dans style=\"font-size:...px\" et dans le texte entre parenthèses."
    ],
    takeaway: 'En CSS, 1 rem dépend toujours de la taille de <html> tandis que 1 em dépend du parent, permettant des interfaces proportionnelles et zoomables.',
    examples: [
      { stdin: '16\n3\nTitre|1.5 rem\nSous-titre|2 em\nNote|10 px', expected: '<p style="font-size:24.00px">Titre (24.00px)</p>\n<p style="font-size:32.00px">Sous-titre (32.00px)</p>\n<p style="font-size:10.00px">Note (10.00px)</p>' }
    ],
    tests: [
      { label: 'Base 20', stdin: '20\n2\nNormal|1 rem\nPetit|0.5 em', expected: '<p style="font-size:20.00px">Normal (20.00px)</p>\n<p style="font-size:10.00px">Petit (10.00px)</p>' },
      { label: 'Base 12', stdin: '12\n2\nGros|2 rem\nMicro|3 px', expected: '<p style="font-size:24.00px">Gros (24.00px)</p>\n<p style="font-size:3.00px">Micro (3.00px)</p>' },
      { label: 'Décimal', stdin: '16\n1\nCorps|1.25 em', expected: '<p style="font-size:20.00px">Corps (20.00px)</p>' }
    ],
    solution: LIRE + `
const base = Number(lignes[0]);
const n = Number(lignes[1]);
const entrees = lignes.slice(2, 2 + n);

for (const e of entrees) {
  const [libelle, expr] = e.trim().split('|');
  const [val, unite] = expr.trim().split(' ');
  const num = Number(val);
  const px = (unite === 'px' ? num : num * base).toFixed(2);
  console.log('<p style="font-size:' + px + 'px">' + libelle + ' (' + px + 'px)</p>');
}
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — CSS : Flexbox, Grid et Responsive
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'javascript',
    preview: 'html',
    title: 'Rangée Flexbox réelle avec display: flex et gap',
    goal: 'Construire un conteneur Flexbox (display: flex; gap) et calculer la largeur exacte de chaque carte.',
    brief: '<p>Le programme reçoit <code>conteneur gap nombre</code> (trois nombres). La largeur d’une carte vaut ' +
      '<code>(conteneur - (nombre - 1) * gap) / nombre</code> à 2 décimales. Affichez : ' +
      'ligne 1 <code>&lt;style&gt;.flex{display:flex;gap:GAPpx;max-width:CONTENEURpx}.item{flex:0 0 LARGEURpx;background:#e0f2fe;padding:8px;text-align:center}&lt;/style&gt;</code>, ' +
      'ligne 2 <code>&lt;div class="flex"&gt;</code> + <code>nombre</code> blocs <code>&lt;div class="item"&gt;LARGEURpx&lt;/div&gt;</code> + <code>&lt;/div&gt;</code>.</p>',
    starter: LIRE + `
const [conteneur, gap, nombre] = lignes[0].trim().split(' ').map(Number);

// À compléter : calculer largeur à 2 décimales, puis afficher le <style> Flexbox et la <div class="flex">.
`,
    hints: [
      "Pour N éléments séparés par gap, il y a exactement N - 1 gouttières entre eux.",
      "Calculez largeur = ((conteneur - (nombre - 1) * gap) / nombre).toFixed(2).",
      "Répétez '<div class=\"item\">' + largeur + 'px</div>' nombre fois dans <div class=\"flex\">...</div>."
    ],
    takeaway: 'En Flexbox, gap n’est inséré qu’entre les enfants (n - 1 espaces) et laisse chaque item calculer sa base sur l’espace restant.',
    examples: [
      { stdin: '1000 20 4', expected: '<style>.flex{display:flex;gap:20px;max-width:1000px}.item{flex:0 0 235.00px;background:#e0f2fe;padding:8px;text-align:center}</style>\n<div class="flex"><div class="item">235.00px</div><div class="item">235.00px</div><div class="item">235.00px</div><div class="item">235.00px</div></div>' }
    ],
    tests: [
      { label: 'Trois cartes', stdin: '600 10 3', expected: '<style>.flex{display:flex;gap:10px;max-width:600px}.item{flex:0 0 193.33px;background:#e0f2fe;padding:8px;text-align:center}</style>\n<div class="flex"><div class="item">193.33px</div><div class="item">193.33px</div><div class="item">193.33px</div></div>' },
      { label: 'Deux éléments collés', stdin: '320 0 2', expected: '<style>.flex{display:flex;gap:0px;max-width:320px}.item{flex:0 0 160.00px;background:#e0f2fe;padding:8px;text-align:center}</style>\n<div class="flex"><div class="item">160.00px</div><div class="item">160.00px</div></div>' },
      { label: 'Deux larges cartes', stdin: '500 20 2', expected: '<style>.flex{display:flex;gap:20px;max-width:500px}.item{flex:0 0 240.00px;background:#e0f2fe;padding:8px;text-align:center}</style>\n<div class="flex"><div class="item">240.00px</div><div class="item">240.00px</div></div>' }
    ],
    solution: LIRE + `
const [conteneur, gap, nombre] = lignes[0].trim().split(' ').map(Number);
const largeur = ((conteneur - (nombre - 1) * gap) / nombre).toFixed(2);
const items = Array.from({ length: nombre }, () => '<div class="item">' + largeur + 'px</div>').join('');
console.log('<style>.flex{display:flex;gap:' + gap + 'px;max-width:' + conteneur + 'px}.item{flex:0 0 ' + largeur + 'px;background:#e0f2fe;padding:8px;text-align:center}</style>');
console.log('<div class="flex">' + items + '</div>');
`
  },
  {
    id: 'web-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'javascript',
    preview: 'html',
    title: 'Grille CSS responsive selon la largeur d’écran',
    goal: 'Générer une CSS Grid (grid-template-columns: repeat(k, 1fr)) adaptée à un point de rupture.',
    brief: '<p>Selon la largeur reçue sur une ligne : <strong>1 colonne</strong> (&lt; 600 px), <strong>2 colonnes</strong> (600–899 px), ' +
      '<strong>3 colonnes</strong> (≥ 900 px). Affichez un aperçu HTML+CSS avec autant de cartes que de colonnes : ' +
      'ligne 1 <code>&lt;style&gt;.grille{display:grid;grid-template-columns:repeat(COLS,1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}&lt;/style&gt;</code>, ' +
      'ligne 2 <code>&lt;div class="grille" data-width="LARGEUR" data-cols="COLS"&gt;</code> + <code>COLS</code> blocs <code>&lt;div class="col"&gt;Col i&lt;/div&gt;</code> + <code>&lt;/div&gt;</code>.</p>',
    starter: LIRE + `
const largeur = Number(lignes[0]);

// À compléter : choisir 1, 2 ou 3 colonnes selon largeur puis générer <style> et <div class="grille">.
`,
    hints: [
      "Paliers CSS Mobile-First : largeur < 600 ? 1 : largeur < 900 ? 2 : 3.",
      "Injectez cols dans repeat(COLS,1fr) et dans data-cols=\"COLS\".",
      "Répétez <div class=\"col\">Col i</div> pour i allant de 1 à cols."
    ],
    takeaway: 'En responsive mobile-first, on part d’une colonne sur petit écran et on augmente grid-template-columns aux points de rupture (@media).',
    examples: [
      { stdin: '1200', expected: '<style>.grille{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}</style>\n<div class="grille" data-width="1200" data-cols="3"><div class="col">Col 1</div><div class="col">Col 2</div><div class="col">Col 3</div></div>' }
    ],
    tests: [
      { label: 'Smartphone 375px', stdin: '375', expected: '<style>.grille{display:grid;grid-template-columns:repeat(1,1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}</style>\n<div class="grille" data-width="375" data-cols="1"><div class="col">Col 1</div></div>' },
      { label: 'Tablette 600px', stdin: '600', expected: '<style>.grille{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}</style>\n<div class="grille" data-width="600" data-cols="2"><div class="col">Col 1</div><div class="col">Col 2</div></div>' },
      { label: 'Borne haute tablette 899px', stdin: '899', expected: '<style>.grille{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}</style>\n<div class="grille" data-width="899" data-cols="2"><div class="col">Col 1</div><div class="col">Col 2</div></div>' },
      { label: 'Bureau 900px exact', stdin: '900', expected: '<style>.grille{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}</style>\n<div class="grille" data-width="900" data-cols="3"><div class="col">Col 1</div><div class="col">Col 2</div><div class="col">Col 3</div></div>' }
    ],
    solution: LIRE + `
const largeur = Number(lignes[0]);
const cols = largeur < 600 ? 1 : largeur < 900 ? 2 : 3;
const blocs = Array.from({ length: cols }, (_, i) => '<div class="col">Col ' + (i + 1) + '</div>').join('');
console.log('<style>.grille{display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:12px}.col{background:#f1f5f9;padding:12px;border:1px solid #cbd5e1}</style>');
console.log('<div class="grille" data-width="' + largeur + '" data-cols="' + cols + '">' + blocs + '</div>');
`
  },
  {
    id: 'web-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Placement explicite grid-row et grid-column',
    goal: 'Placer visuellement une tuile à sa position exacte dans une CSS Grid avec grid-row et grid-column.',
    brief: '<p>Le programme reçoit <code>colonnes position</code> (1-indexés). Calculez <code>ligne = Math.ceil(position / colonnes)</code> et ' +
      '<code>colonne = ((position - 1) % colonnes) + 1</code>. Affichez : ' +
      'ligne 1 <code>&lt;style&gt;.g{display:grid;grid-template-columns:repeat(COLS,1fr);gap:6px}.cible{grid-row:LIGNE;grid-column:COLONNE;background:#2563eb;color:#fff;padding:10px;text-align:center}&lt;/style&gt;</code>, ' +
      'ligne 2 <code>&lt;div class="g"&gt;&lt;div class="cible"&gt;L LIGNE C COLONNE&lt;/div&gt;&lt;/div&gt;</code>.</p>',
    starter: LIRE + `
const [colonnes, position] = lignes[0].trim().split(' ').map(Number);

// À compléter : calculer ligne et colonne puis émettre la CSS Grid ciblée.
`,
    hints: [
      "Pour passer d’un rang 1-indexé aux coordonnées (ligne, colonne), soustrayez 1 avant le modulo : ((position - 1) % colonnes) + 1.",
      "Math.ceil(position / colonnes) donne directement le numéro de ligne.",
      "Injectez ces valeurs dans grid-row et grid-column puis vérifiez la position dans Aperçu Web."
    ],
    takeaway: 'grid-row et grid-column positionnent directement un enfant sur n’importe quelle cellule nommée ou numérotée d’une grille CSS.',
    examples: [
      { stdin: '3 7', expected: '<style>.g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.cible{grid-row:3;grid-column:1;background:#2563eb;color:#fff;padding:10px;text-align:center}</style>\n<div class="g"><div class="cible">L 3 C 1</div></div>' }
    ],
    tests: [
      { label: 'Fin de première ligne', stdin: '4 4', expected: '<style>.g{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.cible{grid-row:1;grid-column:4;background:#2563eb;color:#fff;padding:10px;text-align:center}</style>\n<div class="g"><div class="cible">L 1 C 4</div></div>' },
      { label: 'Deux colonnes rang 5', stdin: '2 5', expected: '<style>.g{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}.cible{grid-row:3;grid-column:1;background:#2563eb;color:#fff;padding:10px;text-align:center}</style>\n<div class="g"><div class="cible">L 3 C 1</div></div>' },
      { label: 'Origine', stdin: '1 1', expected: '<style>.g{display:grid;grid-template-columns:repeat(1,1fr);gap:6px}.cible{grid-row:1;grid-column:1;background:#2563eb;color:#fff;padding:10px;text-align:center}</style>\n<div class="g"><div class="cible">L 1 C 1</div></div>' }
    ],
    solution: LIRE + `
const [colonnes, position] = lignes[0].trim().split(' ').map(Number);
const ligne = Math.ceil(position / colonnes);
const colonne = ((position - 1) % colonnes) + 1;
console.log('<style>.g{display:grid;grid-template-columns:repeat(' + colonnes + ',1fr);gap:6px}.cible{grid-row:' + ligne + ';grid-column:' + colonne + ';background:#2563eb;color:#fff;padding:10px;text-align:center}</style>');
console.log('<div class="g"><div class="cible">L ' + ligne + ' C ' + colonne + '</div></div>');
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — JavaScript : données, DOM réel et événements interactifs
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'web-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'javascript',
    preview: 'html',
    title: 'Construire une liste HTML réelle depuis des données',
    goal: 'Transformer un tableau de données en une liste <ul> stylée et rendue dans l’Aperçu Web.',
    brief: '<p>Le programme reçoit un entier <code>n</code>, puis <code>n</code> lignes <code>nom note</code>. ' +
      'Affichez la liste HTML : <code>&lt;ul&gt;</code>, puis une ligne <code>&lt;li&gt;nom : note&lt;/li&gt;</code> ' +
      'par étudiant dans l’ordre reçu, puis <code>&lt;/ul&gt;</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const eleves = lignes.slice(1, 1 + n);

// À compléter : produire <ul>, un <li>nom : note</li> par étudiant, puis </ul>.
`,
    hints: [
      "Utilisez .pop() sur la ligne découpée par ' ' pour isoler la note finale, puis .join(' ') pour conserver un nom composé.",
      "Le format exact demandé est `<li>${nom} : ${note}</li>` avec un espace de chaque côté des deux-points.",
      "Consultez l’onglet Aperçu Web pour visualiser la liste à puces générée."
    ],
    takeaway: 'Séparer les données brutes du gabarit HTML (via map + join ou createElement) rend le rendu dynamique fiable et maintenable.',
    examples: [
      { stdin: '2\nAda 18\nLinus 15', expected: '<ul>\n<li>Ada : 18</li>\n<li>Linus : 15</li>\n</ul>', note: 'Deux élèves, deux lignes de liste.' }
    ],
    tests: [
      { label: 'Un seul élève', stdin: '1\nGrace 17', expected: '<ul>\n<li>Grace : 17</li>\n</ul>' },
      { label: 'Trois élèves', stdin: '3\nAl 12\nBo 9\nCy 14', expected: '<ul>\n<li>Al : 12</li>\n<li>Bo : 9</li>\n<li>Cy : 14</li>\n</ul>' },
      { label: 'Noms composés', stdin: '2\nAda Lovelace 20\nAlan Turing 19', expected: '<ul>\n<li>Ada Lovelace : 20</li>\n<li>Alan Turing : 19</li>\n</ul>' },
      { label: 'Ligne surnuméraire ignorée', stdin: '2\nAl 10\nBo 15\nCy 20', expected: '<ul>\n<li>Al : 10</li>\n<li>Bo : 15</li>\n</ul>' }
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
    preview: 'html',
    title: 'Tableau d’admis filtré et trié en HTML',
    goal: 'Enchaîner filter() et sort() pour produire une liste HTML ordonnée des étudiants admis.',
    brief: '<p>Le programme reçoit <code>n</code> puis <code>n</code> lignes <code>nom note</code>. Ne gardez que les admis ' +
      '(<code>note &gt;= 10</code>), triez par note décroissante puis par ordre alphabétique du nom (<code>localeCompare</code>). ' +
      'Affichez <code>&lt;ol class="admis"&gt;</code>, puis chaque <code>&lt;li&gt;nom (note/20)&lt;/li&gt;</code>, puis <code>&lt;/ol&gt;</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const eleves = lignes.slice(1, 1 + n);

// À compléter : filter >= 10, sort note desc puis nom asc, et émettre <ol class="admis">...</ol>.
`,
    hints: [
      "Triez avec `(a, b) => b.note - a.note || a.nom.localeCompare(b.nom)` pour départager les égalités.",
      "Ne modifiez pas la note affichée : conservez l’entier/décimal d’origine dans `<li>${nom} (${note}/20)</li>`.",
      "Entourez les lignes par `<ol class=\"admis\">` et `</ol>`."
    ],
    takeaway: 'En JavaScript, filter().sort() prépare les données avant le rendu DOM, garantissant ordre déterministe et séparation logique/affichage.',
    examples: [
      { stdin: '3\nAda 18\nBob 8\nChloe 15', expected: '<ol class="admis">\n<li>Ada (18/20)</li>\n<li>Chloe (15/20)</li>\n</ol>' }
    ],
    tests: [
      { label: 'Égalité alphabétique', stdin: '2\nBo 12\nAl 12', expected: '<ol class="admis">\n<li>Al (12/20)</li>\n<li>Bo (12/20)</li>\n</ol>' },
      { label: 'Un seul admis à 10', stdin: '2\nZoe 10\nYves 9', expected: '<ol class="admis">\n<li>Zoe (10/20)</li>\n</ol>' },
      { label: 'Aucun admis', stdin: '2\nA 5\nB 9', expected: '<ol class="admis">\n</ol>' },
      { label: 'Ligne surnuméraire ignorée', stdin: '2\nAl 12\nBo 14\nCy 16', expected: '<ol class="admis">\n<li>Bo (14/20)</li>\n<li>Al (12/20)</li>\n</ol>' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const admis = lignes.slice(1, 1 + n).map(l => {
  const parts = l.trim().split(' ');
  const note = Number(parts.pop());
  return { nom: parts.join(' '), note };
}).filter(e => e.note >= 10).sort((a, b) => b.note - a.note || a.nom.localeCompare(b.nom));

const out = ['<ol class="admis">'];
for (const e of admis) {
  out.push('<li>' + e.nom + ' (' + e.note + '/20)</li>');
}
out.push('</ol>');
console.log(out.join('\\n'));
`
  },
  {
    id: 'web-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'javascript',
    preview: 'html',
    title: 'Compteur DOM interactif avec état initial et événements',
    goal: 'Simuler une séquence d’événements click/reset et générer un composant DOM cliquable en direct.',
    brief: '<p>Le programme reçoit <code>n</code>, puis <code>n</code> événements (<code>click</code> ou <code>reset</code>). ' +
      'Calculez le cumul <code>totalClics</code> et l’état courant <code>valeur</code> (repart à 0 sur <code>reset</code>). ' +
      'Affichez ce composant HTML+JS cliquable dans l’Aperçu Web : ' +
      '<code>&lt;div class="widget" data-clics="TOTAL" data-valeur="VAL"&gt;&lt;span id="v"&gt;VAL&lt;/span&gt; (&lt;span id="t"&gt;TOTAL&lt;/span&gt; clics) &lt;button id="b"&gt;+1&lt;/button&gt; &lt;button id="r"&gt;RAZ&lt;/button&gt;&lt;/div&gt;</code> ' +
      'suivi d’une balise <code>&lt;script&gt;</code> qui incrémente <code>v</code> et <code>t</code> au clic sur <code>#b</code> et remet <code>v</code> à 0 sur <code>#r</code>.</p>',
    starter: LIRE + `
const n = Number(lignes[0]);
const events = lignes.slice(1, 1 + n).map(e => e.trim());

// À compléter : compter totalClics et valeur courante, puis émettre le composant DOM + <script> interactif.
`,
    hints: [
      "Maintenez deux compteurs distincts : click incrémente totalClics et valeur ; reset ne remet que valeur à 0.",
      "Dans le <script> émis, initialisez let total = TOTAL, val = VAL puis branchez addEventListener('click', ...) sur document.getElementById('b') et 'r'.",
      "Testez directement les boutons +1 et RAZ dans l’onglet Aperçu Web."
    ],
    takeaway: 'addEventListener relie l’interface DOM à un état JavaScript mutable que les gestionnaires mettent à jour sans recharger la page.',
    examples: [
      { stdin: '4\nclick\nclick\nreset\nclick', expected: '<div class="widget" data-clics="3" data-valeur="1"><span id="v">1</span> (<span id="t">3</span> clics) <button id="b">+1</button> <button id="r">RAZ</button></div>\n<script>(function(){var t=3,v=1,ev=document.getElementById("v"),et=document.getElementById("t");document.getElementById("b").addEventListener("click",function(){t++;v++;ev.textContent=v;et.textContent=t;});document.getElementById("r").addEventListener("click",function(){v=0;ev.textContent=v;});})();</script>' }
    ],
    tests: [
      { label: 'Quatre clics directs', stdin: '4\nclick\nclick\nclick\nclick', expected: '<div class="widget" data-clics="4" data-valeur="4"><span id="v">4</span> (<span id="t">4</span> clics) <button id="b">+1</button> <button id="r">RAZ</button></div>\n<script>(function(){var t=4,v=4,ev=document.getElementById("v"),et=document.getElementById("t");document.getElementById("b").addEventListener("click",function(){t++;v++;ev.textContent=v;et.textContent=t;});document.getElementById("r").addEventListener("click",function(){v=0;ev.textContent=v;});})();</script>' },
      { label: 'Remise à zéro', stdin: '2\nreset\nreset', expected: '<div class="widget" data-clics="0" data-valeur="0"><span id="v">0</span> (<span id="t">0</span> clics) <button id="b">+1</button> <button id="r">RAZ</button></div>\n<script>(function(){var t=0,v=0,ev=document.getElementById("v"),et=document.getElementById("t");document.getElementById("b").addEventListener("click",function(){t++;v++;ev.textContent=v;et.textContent=t;});document.getElementById("r").addEventListener("click",function(){v=0;ev.textContent=v;});})();</script>' },
      { label: 'Alternance et ligne surnuméraire', stdin: '2\nclick\nclick\nreset', expected: '<div class="widget" data-clics="2" data-valeur="2"><span id="v">2</span> (<span id="t">2</span> clics) <button id="b">+1</button> <button id="r">RAZ</button></div>\n<script>(function(){var t=2,v=2,ev=document.getElementById("v"),et=document.getElementById("t");document.getElementById("b").addEventListener("click",function(){t++;v++;ev.textContent=v;et.textContent=t;});document.getElementById("r").addEventListener("click",function(){v=0;ev.textContent=v;});})();</script>' }
    ],
    solution: LIRE + `
const n = Number(lignes[0]);
const events = lignes.slice(1, 1 + n).map(e => e.trim());
let t = 0;
let v = 0;
for (const ev of events) {
  if (ev === 'click') { t++; v++; }
  else if (ev === 'reset') { v = 0; }
}
console.log('<div class="widget" data-clics="' + t + '" data-valeur="' + v + '"><span id="v">' + v + '</span> (<span id="t">' + t + '</span> clics) <button id="b">+1</button> <button id="r">RAZ</button></div>');
console.log('<script>(function(){var t=' + t + ',v=' + v + ',ev=document.getElementById("v"),et=document.getElementById("t");document.getElementById("b").addEventListener("click",function(){t++;v++;ev.textContent=v;et.textContent=t;});document.getElementById("r").addEventListener("click",function(){v=0;ev.textContent=v;});})();<\\/script>');
`
  }
];

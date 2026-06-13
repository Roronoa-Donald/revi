const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const projectsPath = path.join(ROOT, 'preparation-web', 'assets', 'js', 'projects.js');
const quizPath = path.join(ROOT, 'preparation-web', 'assets', 'data', 'preparation-quiz.json');
const serverContentPath = path.join(ROOT, 'server', 'preparation-content.js');

function loadProjects() {
  const code = fs.readFileSync(projectsPath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(code, context, { filename: 'projects.js' });
  return context.window.PREPARATION_PROJECTS;
}

function renumberTitle(project) {
  project.title = project.title.replace(/^\d+\./, `${project.id}.`);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function makeProject6() {
  return {
    id: 6,
    title: '6. Message dynamique',
    track: 'JavaScript',
    mode: 'js',
    description: 'Change un texte avec JavaScript, comme une premiere mise a jour d interface.',
    objective: 'Comprendre le lien entre une variable, un clic et le texte visible.',
    build: 'Une petite carte avec un message qui change quand on clique sur un bouton.',
    concepts: ['getElementById', 'textContent', 'function', 'click'],
    steps: [
      'Cible #messageText et #changeMessageBtn.',
      'Cree une fonction changeMessage().',
      'Dans la fonction, remplace le texte avec textContent.',
      'Branche le clic du bouton avec addEventListener.'
    ],
    checklist: [
      'Constantes messageText et changeMessageBtn',
      'Fonction changeMessage()',
      'Mise a jour de messageText.textContent',
      'Clic branche sur le bouton'
    ],
    memos: [
      'Le DOM est la page HTML vue par JavaScript.',
      'textContent change uniquement le texte visible.',
      'Un event click lance une fonction.'
    ],
    commonErrors: [
      'Changer le texte avant de cliquer, mais oublier addEventListener.',
      'Ecrire textcontent au lieu de textContent.',
      'Oublier les parentheses quand tu appelles une fonction.'
    ],
    tips: [
      'Teste le clic plusieurs fois.',
      'Commence par afficher un message simple, puis rends-le plus personnel.'
    ],
    glossary: [
      'DOM: representation de la page pour JavaScript.',
      'event: action de l utilisateur.',
      'handler: fonction lancee par un evenement.'
    ],
    reactBridge: 'En React, tu ne modifies pas directement le DOM avec textContent, mais l idee reste la meme: une action utilisateur change une donnee, puis l interface affiche la nouvelle valeur.',
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu passes de HTML statique a une interface qui repond. Le bouton devient une action, et le paragraphe devient une zone que JavaScript peut mettre a jour.</p>
      </article>
      <article class="lesson-block">
        <h3>Le reflexe DOM</h3>
        <p>Pour agir sur une page, tu suis trois gestes: cibler un element, creer une fonction, brancher un evenement. C est le coeur de presque toutes les interfaces.</p>
        <p><strong>getElementById</strong> recupere un element. <strong>textContent</strong> change son texte. <strong>addEventListener</strong> relie un clic a une fonction.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>const messageText = document.getElementById('messageText');
const changeMessageBtn = document.getElementById('changeMessageBtn');

function changeMessage() {
  messageText.textContent = 'Message modifie avec JavaScript';
}

changeMessageBtn.addEventListener('click', changeMessage);</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>On cible avant d agir.</li>
          <li>La fonction contient ce qui doit se passer.</li>
          <li>Le clic declenche la fonction.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        'Commence par cibler messageText et changeMessageBtn.',
        'Dans changeMessage(), modifie messageText.textContent.',
        'Le bouton doit ecouter le clic avec addEventListener.'
      ]
    },
    guideJs: [
      `Etape 1/4
const messageText = document.getElementById('messageText')
Objectif: cibler le texte.`,
      `Etape 2/4
function changeMessage() { }
Objectif: creer la fonction.`,
      `Etape 3/4
messageText.textContent = '...'
Objectif: changer le texte visible.`,
      `Etape 4/4
changeMessageBtn.addEventListener('click', changeMessage)
Objectif: brancher le clic.`
    ],
    starterHtml: `<div class="message-card">
  <h2>Message dynamique</h2>
  <p id="messageText">Clique sur le bouton pour changer ce message.</p>
  <button id="changeMessageBtn">Changer le message</button>
</div>`,
    starterJs: `const messageText = document.getElementById('messageText');
const changeMessageBtn = document.getElementById('changeMessageBtn');

function changeMessage() {
  // Change le texte de messageText ici
}

changeMessageBtn.addEventListener('click', changeMessage);`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.message-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }
#messageText { color: #a7f3d0; line-height: 1.6; font-weight: 700; }
#changeMessageBtn { border: none; border-radius: 999px; padding: 10px 16px; background: #34d399; color: #052e25; font-weight: 800; cursor: pointer; }`,
    validation: {
      jsNames: ['messageText', 'changeMessage'],
      behavior: 'message'
    }
  };
}

function makeProject7() {
  return {
    id: 7,
    title: '7. Carte interactive',
    track: 'JavaScript',
    mode: 'js',
    description: 'Change un etat visuel avec classList et un bouton.',
    objective: 'Comprendre comment une classe CSS peut representer un etat.',
    build: 'Une carte qui passe de "En attente" a "Actif" quand on clique.',
    concepts: ['classList.toggle', 'etat', 'condition', 'textContent'],
    steps: [
      'Cible #statusBadge et #toggleStatusBtn.',
      'Declare une variable isActive a false.',
      'Cree une fonction toggleStatus().',
      'Inverse isActive, change la classe et le texte.',
      'Branche le clic du bouton.'
    ],
    checklist: [
      'Variable isActive',
      'Fonction toggleStatus()',
      'classList.toggle ou classList.add/remove',
      'Texte du badge mis a jour',
      'Clic branche sur le bouton'
    ],
    memos: [
      'Un etat est une valeur qui dit ou en est l interface.',
      'classList.toggle ajoute ou retire une classe.',
      'Une condition choisit quoi afficher.'
    ],
    commonErrors: [
      'Changer la classe mais pas le texte.',
      'Oublier de modifier isActive.',
      'Brancher le clic sur le mauvais id.'
    ],
    tips: [
      'Teste deux clics: actif puis en attente.',
      'Garde isActive en booleen true/false.'
    ],
    glossary: [
      'etat: valeur qui represente la situation actuelle.',
      'booleen: true ou false.',
      'toggle: bascule entre deux situations.'
    ],
    reactBridge: 'C est la transition directe vers React: isActive ressemble a un state, et le texte affiche depend de ce state.',
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas manipuler un etat. Une interface moderne change souvent selon une valeur: actif/inactif, ouvert/ferme, connecte/deconnecte.</p>
      </article>
      <article class="lesson-block">
        <h3>Etat + rendu</h3>
        <p>La variable <strong>isActive</strong> garde la situation actuelle. Quand elle change, tu mets a jour le texte et la classe visuelle.</p>
        <p>Ce reflexe prepare tres bien React: une donnee controle ce que l utilisateur voit.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>let isActive = false;

function toggleStatus() {
  isActive = !isActive;
  statusBadge.textContent = isActive ? 'Actif' : 'En attente';
  statusBadge.classList.toggle('is-active', isActive);
}</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>!isActive inverse true et false.</li>
          <li>classList.toggle peut recevoir une condition.</li>
          <li>Le texte doit suivre l etat.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        'isActive doit commencer a false.',
        'Utilise isActive = !isActive pour inverser.',
        'Mets a jour le texte et la classe dans la meme fonction.'
      ]
    },
    guideJs: [
      `Etape 1/5
const statusBadge = document.getElementById('statusBadge')
Objectif: cibler le badge.`,
      `Etape 2/5
let isActive = false
Objectif: stocker l etat.`,
      `Etape 3/5
function toggleStatus() { isActive = !isActive }
Objectif: basculer l etat.`,
      `Etape 4/5
statusBadge.textContent = isActive ? 'Actif' : 'En attente'
Objectif: afficher l etat.`,
      `Etape 5/5
toggleStatusBtn.addEventListener('click', toggleStatus)
Objectif: brancher le clic.`
    ],
    starterHtml: `<div class="status-card">
  <h2>Carte interactive</h2>
  <p id="statusBadge" class="status-badge">En attente</p>
  <button id="toggleStatusBtn">Basculer</button>
</div>`,
    starterJs: `const statusBadge = document.getElementById('statusBadge');
const toggleStatusBtn = document.getElementById('toggleStatusBtn');

let isActive = false;

function toggleStatus() {
  // 1) inverse isActive
  // 2) change le texte du badge
  // 3) ajoute ou retire la classe is-active
}

toggleStatusBtn.addEventListener('click', toggleStatus);`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.status-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; text-align: center; }
.status-badge { margin: 0 auto; width: max-content; border-radius: 999px; padding: 8px 14px; background: rgba(251, 191, 36, 0.14); color: #fde68a; font-weight: 900; }
.status-badge.is-active { background: rgba(52, 211, 153, 0.18); color: #a7f3d0; }
#toggleStatusBtn { border: none; border-radius: 999px; padding: 10px 16px; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }`,
    validation: {
      jsNames: ['isActive', 'toggleStatus'],
      behavior: 'toggle'
    }
  };
}

function makeSolutions(publicProjects, oldSolutions) {
  const solutions = {};
  for (const project of publicProjects) {
    if (project.id === 6) {
      solutions[6] = {
        html: project.starterHtml,
        js: `const messageText = document.getElementById('messageText');
const changeMessageBtn = document.getElementById('changeMessageBtn');

function changeMessage() {
  messageText.textContent = 'Bravo, tu viens de modifier la page avec JavaScript.';
}

changeMessageBtn.addEventListener('click', changeMessage);`
      };
      continue;
    }
    if (project.id === 7) {
      solutions[7] = {
        html: project.starterHtml,
        js: `const statusBadge = document.getElementById('statusBadge');
const toggleStatusBtn = document.getElementById('toggleStatusBtn');

let isActive = false;

function toggleStatus() {
  isActive = !isActive;
  statusBadge.textContent = isActive ? 'Actif' : 'En attente';
  statusBadge.classList.toggle('is-active', isActive);
}

toggleStatusBtn.addEventListener('click', toggleStatus);`
      };
      continue;
    }
    const oldId = project.id >= 8 ? project.id - 2 : project.id;
    solutions[project.id] = oldSolutions[oldId] || { html: '', js: '' };
  }
  return solutions;
}

function buildBehaviorRules() {
  return {
    6: {
      htmlIds: ['messageText', 'changeMessageBtn'],
      jsChecks: [
        { pattern: 'messageText', message: 'Le script doit cibler #messageText.' },
        { pattern: 'changeMessageBtn', message: 'Le script doit cibler #changeMessageBtn.' },
        { pattern: 'textContent', message: 'Le message doit etre modifie avec textContent.' },
        { pattern: 'addEventListener', message: 'Le bouton doit ecouter un clic.' }
      ]
    },
    7: {
      htmlIds: ['statusBadge', 'toggleStatusBtn'],
      htmlClasses: ['status-card', 'status-badge'],
      jsChecks: [
        { pattern: 'isActive', message: 'Le script doit utiliser un etat isActive.' },
        { pattern: 'classList|className', message: 'La carte doit changer de classe selon l etat.' },
        { pattern: 'textContent', message: 'Le texte du badge doit etre mis a jour.' },
        { pattern: 'addEventListener', message: 'Le bouton doit ecouter un clic.' }
      ]
    },
    8: {
      htmlIds: ['countValue', 'incrementBtn'],
      jsChecks: [
        { pattern: 'countValue', message: 'Le script doit lire ou mettre a jour #countValue.' },
        { pattern: 'incrementBtn', message: 'Le script doit ecouter le clic de #incrementBtn.' },
        { pattern: 'textContent|innerText', message: 'Le compteur doit mettre a jour le texte affiche.' }
      ]
    },
    9: {
      htmlClasses: ['answer'],
      htmlIds: ['quizFeedback', 'quizScore'],
      dataAttrs: ['correct'],
      jsChecks: [
        { pattern: 'dataset|getAttribute\\([^)]*data-correct', message: 'Le script doit lire data-correct.' },
        { pattern: 'quizScore|score', message: 'Le script doit mettre a jour le score.' }
      ]
    },
    10: {
      htmlIds: ['todoInput', 'addTodoBtn', 'todoList'],
      jsChecks: [
        { pattern: "createElement\\(['\"]li['\"]\\)", message: 'La todo doit creer un element li.' },
        { pattern: 'appendChild|append\\(', message: 'La todo doit ajouter le li a la liste.' }
      ]
    },
    11: {
      htmlIds: ['numberA', 'numberB', 'calcResult'],
      dataAttrs: ['op'],
      jsChecks: [
        { pattern: 'Number\\(|parseFloat\\(', message: 'La calculatrice doit convertir les valeurs en nombres.' },
        { pattern: 'calcResult', message: 'Le script doit mettre a jour #calcResult.' }
      ]
    },
    12: {
      htmlClasses: ['choice-btn'],
      htmlIds: ['playerScore', 'botScore', 'resultMessage', 'resetBtn'],
      dataAttrs: ['choice'],
      jsChecks: [
        { pattern: 'Math\\.random', message: 'Le bot doit faire un choix aleatoire.' },
        { pattern: 'resultMessage', message: 'Le script doit afficher le message de resultat.' },
        { pattern: 'reset', message: 'Le script doit gerer le bouton reset.' }
      ]
    }
  };
}

function buildValidationRules(projects) {
  const rules = {};
  for (const project of projects) {
    const validation = project.validation || {};
    rules[project.id] = {
      htmlTags: validation.tags || [],
      classes: validation.classes || [],
      inputTypes: validation.inputTypes || [],
      dataAttrs: validation.dataAttrs || [],
      jsNames: validation.jsNames || [],
      minElements: validation.minElements || []
    };
  }
  return rules;
}

function loadQuiz() {
  const fixed = fs.readFileSync(quizPath, 'utf8')
    .replace('"explanation": "type="email" valide le format."', '"explanation": "type=\\"email\\" valide le format."');
  return JSON.parse(fixed);
}

function buildQuiz(oldQuiz) {
  const quiz = {};
  for (let id = 1; id <= 5; id += 1) quiz[id] = oldQuiz[id] || [];
  quiz[6] = [
    {
      type: 'single',
      prompt: 'Quelle propriete change le texte visible d un element ?',
      options: ['textContent', 'href', 'class'],
      answer: 0,
      explanation: 'textContent remplace le texte affiche dans l element.'
    },
    {
      type: 'tf',
      prompt: 'addEventListener peut lancer une fonction quand on clique.',
      answer: 0,
      explanation: 'On ecoute le click puis on appelle une fonction.'
    },
    {
      type: 'multi',
      prompt: 'Quelles etapes sont utiles pour modifier un message ?',
      options: ['Cibler l element', 'Creer une fonction', 'Brancher un clic', 'Supprimer le bouton'],
      answers: [0, 1, 2],
      explanation: 'Cibler, agir dans une fonction, puis brancher le clic.'
    },
    {
      type: 'short',
      prompt: 'Quel id contient le texte du message ?',
      answers: ['messagetext'],
      explanation: '#messageText contient le texte a modifier.'
    },
    {
      type: 'single',
      prompt: 'Pourquoi separer fonction et clic ?',
      options: ['Pour rendre l action reutilisable', 'Pour eviter HTML', 'Pour supprimer le DOM'],
      answer: 0,
      explanation: 'Une fonction nommee est plus claire et reutilisable.'
    }
  ];
  quiz[7] = [
    {
      type: 'single',
      prompt: 'Quel type de valeur represente true ou false ?',
      options: ['Booleen', 'Image', 'Balise'],
      answer: 0,
      explanation: 'Un booleen vaut true ou false.'
    },
    {
      type: 'tf',
      prompt: 'classList.toggle peut ajouter ou retirer une classe.',
      answer: 0,
      explanation: 'toggle bascule une classe selon l etat.'
    },
    {
      type: 'multi',
      prompt: 'Que doit faire une carte interactive ?',
      options: ['Changer un etat', 'Mettre a jour le texte', 'Changer une classe', 'Recharger la page'],
      answers: [0, 1, 2],
      explanation: 'L etat controle le texte et la classe visible.'
    },
    {
      type: 'short',
      prompt: 'Quel nom de variable stocke l etat actif ?',
      answers: ['isactive'],
      explanation: 'isActive indique si la carte est active.'
    },
    {
      type: 'single',
      prompt: 'Quel lien avec React ?',
      options: ['Une donnee controle l affichage', 'React supprime JavaScript', 'React remplace HTML par SQL'],
      answer: 0,
      explanation: 'React repose beaucoup sur state -> affichage.'
    }
  ];
  for (let id = 6; id <= 10; id += 1) quiz[id + 2] = oldQuiz[id] || [];
  return quiz;
}

function main() {
  const oldProjects = loadProjects();
  const oldSolutions = {};
  for (const project of oldProjects) {
    oldSolutions[project.id] = {
      html: project.solutionHtml || '',
      js: project.solutionJs || ''
    };
  }

  const publicProjects = [];
  for (const project of oldProjects) {
    const next = clone(project);
    delete next.solutionHtml;
    delete next.solutionJs;
    if (next.id >= 6) next.id += 2;
    renumberTitle(next);
    publicProjects.push(next);
  }

  publicProjects.splice(5, 0, makeProject6(), makeProject7());

  const bridges = {
    1: 'Pense chaque carte comme un futur composant React: un bloc autonome, avec des donnees claires a afficher.',
    2: 'Une fiche produit est typiquement un composant React: image, titre, prix, description et bouton viennent souvent de props.',
    3: 'Les formulaires React utilisent les memes champs HTML, puis ajoutent une gestion d etat pour les valeurs.',
    4: 'Un mini CV peut devenir une liste de sections React generees depuis des donnees.',
    5: 'Un portfolio prepare la logique de composants reutilisables: hero, liste de competences, cartes de projets.',
    8: 'Le compteur annonce useState: une valeur change, puis l affichage suit.',
    9: 'Le quiz prepare les handlers React: un clic donne une information, puis on met a jour le score.',
    10: 'La todo list prepare le rendu de listes React: une valeur saisie devient un nouvel item affiche.',
    11: 'La calculatrice prepare les formulaires controles: lire des valeurs, calculer, afficher un resultat.',
    12: 'Le jeu final assemble handlers, conditions et etat: exactement les bases utiles avant React.'
  };
  for (const project of publicProjects) {
    if (!project.reactBridge && bridges[project.id]) project.reactBridge = bridges[project.id];
  }

  const solutions = makeSolutions(publicProjects, oldSolutions);
  const validationRules = buildValidationRules(publicProjects);
  const behaviorRules = buildBehaviorRules();
  const quiz = buildQuiz(loadQuiz());

  fs.writeFileSync(projectsPath, `window.PREPARATION_PROJECTS = ${JSON.stringify(publicProjects, null, 2)};\n`, 'utf8');
  fs.writeFileSync(quizPath, `${JSON.stringify(quiz, null, 2)}\n`, 'utf8');
  fs.writeFileSync(serverContentPath, `const PROJECT_COUNT = ${publicProjects.length};\n\nconst VALIDATION_RULES = ${JSON.stringify(validationRules, null, 2)};\n\nconst BEHAVIOR_RULES = ${JSON.stringify(behaviorRules, null, 2)};\n\nconst SOLUTIONS = ${JSON.stringify(solutions, null, 2)};\n\nmodule.exports = { PROJECT_COUNT, VALIDATION_RULES, BEHAVIOR_RULES, SOLUTIONS };\n`, 'utf8');
}

main();

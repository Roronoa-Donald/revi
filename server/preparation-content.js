const PROJECT_COUNT = 12;

const VALIDATION_RULES = {
  "1": {
    "htmlTags": [
      "section",
      "img",
      "h1",
      "p",
      "ul",
      "li",
      "a"
    ],
    "classes": [
      "profile-card",
      "profile-avatar",
      "profile-name",
      "profile-role",
      "profile-bio",
      "profile-skills",
      "profile-link"
    ],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [],
    "minElements": []
  },
  "2": {
    "htmlTags": [
      "article",
      "img",
      "h2",
      "p",
      "ul",
      "li",
      "button"
    ],
    "classes": [
      "product-card",
      "product-image",
      "product-title",
      "product-price",
      "product-description",
      "product-features",
      "buy-button"
    ],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [],
    "minElements": []
  },
  "3": {
    "htmlTags": [
      "form",
      "label",
      "input",
      "textarea",
      "select",
      "button"
    ],
    "classes": [
      "contact-form",
      "form-row",
      "form-label",
      "form-input",
      "form-textarea",
      "form-select",
      "submit-button"
    ],
    "inputTypes": [
      "text",
      "email",
      "password",
      "checkbox",
      "radio"
    ],
    "dataAttrs": [],
    "jsNames": [],
    "minElements": []
  },
  "4": {
    "htmlTags": [
      "header",
      "section",
      "h1",
      "h2",
      "p",
      "ul",
      "li",
      "a"
    ],
    "classes": [
      "cv-card",
      "cv-header",
      "cv-name",
      "cv-title",
      "cv-section",
      "skill-list",
      "cv-contact"
    ],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [],
    "minElements": []
  },
  "5": {
    "htmlTags": [
      "main",
      "section",
      "h1",
      "h2",
      "article",
      "p",
      "ul",
      "li",
      "a"
    ],
    "classes": [
      "portfolio-page",
      "hero-section",
      "portfolio-title",
      "portfolio-tagline",
      "portfolio-skills",
      "skill-list",
      "project-grid",
      "project-card",
      "contact-link"
    ],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [],
    "minElements": []
  },
  "6": {
    "htmlTags": [],
    "classes": [],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [
      "messageText",
      "changeMessage"
    ],
    "minElements": []
  },
  "7": {
    "htmlTags": [],
    "classes": [],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [
      "isActive",
      "toggleStatus"
    ],
    "minElements": []
  },
  "8": {
    "htmlTags": [],
    "classes": [],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [
      "score",
      "incrementer"
    ],
    "minElements": []
  },
  "9": {
    "htmlTags": [],
    "classes": [],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [
      "score",
      "checkAnswer"
    ],
    "minElements": []
  },
  "10": {
    "htmlTags": [],
    "classes": [],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [
      "addTodo"
    ],
    "minElements": []
  },
  "11": {
    "htmlTags": [],
    "classes": [],
    "inputTypes": [],
    "dataAttrs": [],
    "jsNames": [
      "calculate"
    ],
    "minElements": []
  },
  "12": {
    "htmlTags": [
      "button"
    ],
    "classes": [
      "game-board",
      "choice-btn",
      "score-board",
      "result-message",
      "reset-btn"
    ],
    "inputTypes": [],
    "dataAttrs": [
      "choice"
    ],
    "jsNames": [
      "choices",
      "playRound",
      "resetGame"
    ],
    "minElements": [
      {
        "selector": ".choice-btn",
        "count": 3,
        "message": "Le jeu doit contenir trois boutons .choice-btn: pierre, papier et ciseaux."
      }
    ]
  }
};

const BEHAVIOR_RULES = {
  "6": {
    "htmlIds": [
      "messageText",
      "changeMessageBtn"
    ],
    "jsChecks": [
      {
        "pattern": "messageText",
        "message": "Le script doit cibler #messageText."
      },
      {
        "pattern": "changeMessageBtn",
        "message": "Le script doit cibler #changeMessageBtn."
      },
      {
        "pattern": "textContent",
        "message": "Le message doit etre modifie avec textContent."
      },
      {
        "pattern": "addEventListener",
        "message": "Le bouton doit ecouter un clic."
      }
    ]
  },
  "7": {
    "htmlIds": [
      "statusBadge",
      "toggleStatusBtn"
    ],
    "htmlClasses": [
      "status-card",
      "status-badge"
    ],
    "jsChecks": [
      {
        "pattern": "isActive",
        "message": "Le script doit utiliser un etat isActive."
      },
      {
        "pattern": "classList|className",
        "message": "La carte doit changer de classe selon l etat."
      },
      {
        "pattern": "textContent",
        "message": "Le texte du badge doit etre mis a jour."
      },
      {
        "pattern": "addEventListener",
        "message": "Le bouton doit ecouter un clic."
      }
    ]
  },
  "8": {
    "htmlIds": [
      "countValue",
      "incrementBtn"
    ],
    "jsChecks": [
      {
        "pattern": "countValue",
        "message": "Le script doit lire ou mettre a jour #countValue."
      },
      {
        "pattern": "incrementBtn",
        "message": "Le script doit ecouter le clic de #incrementBtn."
      },
      {
        "pattern": "textContent|innerText",
        "message": "Le compteur doit mettre a jour le texte affiche."
      }
    ]
  },
  "9": {
    "htmlClasses": [
      "answer"
    ],
    "htmlIds": [
      "quizFeedback",
      "quizScore"
    ],
    "dataAttrs": [
      "correct"
    ],
    "jsChecks": [
      {
        "pattern": "dataset|getAttribute\\([^)]*data-correct",
        "message": "Le script doit lire data-correct."
      },
      {
        "pattern": "quizScore|score",
        "message": "Le script doit mettre a jour le score."
      }
    ]
  },
  "10": {
    "htmlIds": [
      "todoInput",
      "addTodoBtn",
      "todoList"
    ],
    "jsChecks": [
      {
        "pattern": "createElement\\(['\"]li['\"]\\)",
        "message": "La todo doit creer un element li."
      },
      {
        "pattern": "appendChild|append\\(",
        "message": "La todo doit ajouter le li a la liste."
      }
    ]
  },
  "11": {
    "htmlIds": [
      "numberA",
      "numberB",
      "calcResult"
    ],
    "dataAttrs": [
      "op"
    ],
    "jsChecks": [
      {
        "pattern": "Number\\(|parseFloat\\(",
        "message": "La calculatrice doit convertir les valeurs en nombres."
      },
      {
        "pattern": "calcResult",
        "message": "Le script doit mettre a jour #calcResult."
      }
    ]
  },
  "12": {
    "htmlClasses": [
      "choice-btn"
    ],
    "htmlIds": [
      "playerScore",
      "botScore",
      "resultMessage",
      "resetBtn"
    ],
    "dataAttrs": [
      "choice"
    ],
    "jsChecks": [
      {
        "pattern": "Math\\.random",
        "message": "Le bot doit faire un choix aleatoire."
      },
      {
        "pattern": "resultMessage",
        "message": "Le script doit afficher le message de resultat."
      },
      {
        "pattern": "reset",
        "message": "Le script doit gerer le bouton reset."
      }
    ]
  }
};

const SOLUTIONS = {
  "1": {
    "html": "<section class=\"profile-card\">\n  <img class=\"profile-avatar\" src=\"https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=80\" alt=\"Portrait de Lea\">\n  <h1 class=\"profile-name\">Lea Martin</h1>\n  <p class=\"profile-role\">Etudiante web</p>\n  <p class=\"profile-bio\">J aime creer des interfaces claires et apprendre le JavaScript pas a pas.</p>\n  <ul class=\"profile-skills\">\n    <li>HTML</li>\n    <li>Organisation</li>\n    <li>Curiosite</li>\n  </ul>\n  <div class=\"profile-actions\">\n    <a class=\"profile-link\" href=\"mailto:lea@mail.com\">Me contacter</a>\n  </div>\n</section>",
    "js": ""
  },
  "2": {
    "html": "<article class=\"product-card\">\n  <img class=\"product-image\" src=\"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80\" alt=\"Sac a dos urbain\">\n  <div class=\"product-body\">\n    <h2 class=\"product-title\">Sac a dos urbain</h2>\n    <p class=\"product-price\">49,00 EUR</p>\n    <p class=\"product-description\">Un sac compact pour transporter ordinateur, cahiers et accessoires.</p>\n    <ul class=\"product-features\">\n      <li>Compartiment 14 pouces</li>\n      <li>Tissu impermeable</li>\n      <li>Poignee renforcee</li>\n    </ul>\n    <button class=\"buy-button\">Ajouter au panier</button>\n  </div>\n</article>",
    "js": ""
  },
  "3": {
    "html": "<form class=\"contact-form\">\n  <div class=\"form-row\">\n    <label class=\"form-label\" for=\"fullname\">Nom complet</label>\n    <input class=\"form-input\" id=\"fullname\" type=\"text\" placeholder=\"Ton nom\" required>\n  </div>\n  <div class=\"form-row\">\n    <label class=\"form-label\" for=\"email\">Email</label>\n    <input class=\"form-input\" id=\"email\" type=\"email\" placeholder=\"nom@mail.com\" required>\n  </div>\n  <div class=\"form-row\">\n    <label class=\"form-label\" for=\"pwd\">Mot de passe</label>\n    <input class=\"form-input\" id=\"pwd\" type=\"password\" placeholder=\"********\" required>\n  </div>\n  <div class=\"form-row\">\n    <label class=\"form-label\" for=\"topic\">Sujet</label>\n    <select class=\"form-select\" id=\"topic\">\n      <option>HTML</option>\n      <option>JavaScript</option>\n    </select>\n  </div>\n  <div class=\"form-row\">\n    <label class=\"form-label\" for=\"message\">Message</label>\n    <textarea class=\"form-textarea\" id=\"message\" placeholder=\"Ecris ici...\"></textarea>\n  </div>\n  <div class=\"form-row\">\n    <label class=\"form-label\"><input type=\"checkbox\" required> J accepte les conditions</label>\n  </div>\n  <div class=\"form-row\">\n    <label class=\"form-label\"><input type=\"radio\" name=\"contact\" required> Contact par email</label>\n  </div>\n  <div class=\"form-actions\">\n    <button class=\"submit-button\" type=\"submit\">Envoyer</button>\n  </div>\n</form>",
    "js": ""
  },
  "4": {
    "html": "<section class=\"cv-card\">\n  <header class=\"cv-header\">\n    <h1 class=\"cv-name\">Sarah Benali</h1>\n    <p class=\"cv-title\">Etudiante en reseaux</p>\n  </header>\n  <section class=\"cv-section\">\n    <h2>Competences</h2>\n    <ul class=\"skill-list\">\n      <li>HTML</li>\n      <li>Organisation</li>\n      <li>Travail en equipe</li>\n    </ul>\n  </section>\n  <section class=\"cv-section\">\n    <h2>Experience</h2>\n    <p>Stage support IT - 2025</p>\n  </section>\n  <a class=\"cv-contact\" href=\"mailto:sarah@mail.com\">Me contacter</a>\n</section>",
    "js": ""
  },
  "5": {
    "html": "<main class=\"portfolio-page\">\n  <section class=\"hero-section\">\n    <h1 class=\"portfolio-title\">Nora Dupont</h1>\n    <p class=\"portfolio-tagline\">Je cree des pages claires et modernes pour debuter sur le web.</p>\n  </section>\n  <section class=\"portfolio-skills\">\n    <h2>Competences</h2>\n    <ul class=\"skill-list\">\n      <li>HTML</li>\n      <li>Organisation</li>\n      <li>Creativite</li>\n    </ul>\n  </section>\n  <section class=\"project-grid\">\n    <article class=\"project-card\">\n      <h3>Carte profil</h3>\n      <p>Une carte simple avec photo et bio.</p>\n    </article>\n    <article class=\"project-card\">\n      <h3>Fiche produit</h3>\n      <p>Une mise en page avec image, prix et bouton.</p>\n    </article>\n  </section>\n  <section class=\"contact-section\">\n    <h2>Contact</h2>\n    <a class=\"contact-link\" href=\"mailto:nora@mail.com\">Ecrire un message</a>\n  </section>\n</main>",
    "js": ""
  },
  "6": {
    "html": "<div class=\"message-card\">\n  <h2>Message dynamique</h2>\n  <p id=\"messageText\">Clique sur le bouton pour changer ce message.</p>\n  <button id=\"changeMessageBtn\">Changer le message</button>\n</div>",
    "js": "const messageText = document.getElementById('messageText');\nconst changeMessageBtn = document.getElementById('changeMessageBtn');\n\nfunction changeMessage() {\n  messageText.textContent = 'Bravo, tu viens de modifier la page avec JavaScript.';\n}\n\nchangeMessageBtn.addEventListener('click', changeMessage);"
  },
  "7": {
    "html": "<div class=\"status-card\">\n  <h2>Carte interactive</h2>\n  <p id=\"statusBadge\" class=\"status-badge\">En attente</p>\n  <button id=\"toggleStatusBtn\">Basculer</button>\n</div>",
    "js": "const statusBadge = document.getElementById('statusBadge');\nconst toggleStatusBtn = document.getElementById('toggleStatusBtn');\n\nlet isActive = false;\n\nfunction toggleStatus() {\n  isActive = !isActive;\n  statusBadge.textContent = isActive ? 'Actif' : 'En attente';\n  statusBadge.classList.toggle('is-active', isActive);\n}\n\ntoggleStatusBtn.addEventListener('click', toggleStatus);"
  },
  "8": {
    "html": "<div class=\"counter-card\">\n  <h2>Compteur</h2>\n  <div id=\"countValue\" class=\"counter-value\">0</div>\n  <button id=\"incrementBtn\" class=\"counter-button\">Ajouter +1</button>\n</div>",
    "js": "const countValue = document.getElementById('countValue');\nconst incrementBtn = document.getElementById('incrementBtn');\n\nlet score = 0;\n\nfunction incrementer() {\n  score = score + 1;\n  countValue.textContent = score;\n}\n\nincrementBtn.addEventListener('click', incrementer);"
  },
  "9": {
    "html": "<div class=\"quiz-card\">\n  <h2 id=\"quizQuestion\">Quel langage structure une page web ?</h2>\n  <div class=\"quiz-answers\">\n    <button class=\"answer\" data-correct=\"true\">HTML</button>\n    <button class=\"answer\" data-correct=\"false\">CSS</button>\n    <button class=\"answer\" data-correct=\"false\">Photoshop</button>\n  </div>\n  <p id=\"quizFeedback\">Choisis une reponse.</p>\n  <p>Score: <span id=\"quizScore\">0</span></p>\n</div>",
    "js": "const answers = document.querySelectorAll('.answer');\nconst feedback = document.getElementById('quizFeedback');\nconst quizScore = document.getElementById('quizScore');\n\nlet score = 0;\n\nfunction checkAnswer(event) {\n  const isCorrect = event.currentTarget.dataset.correct === 'true';\n  if (isCorrect) {\n    score = score + 1;\n    feedback.textContent = 'Bonne reponse !';\n  } else {\n    feedback.textContent = 'Essaie encore.';\n  }\n  quizScore.textContent = score;\n}\n\nanswers.forEach((button) => {\n  button.addEventListener('click', checkAnswer);\n});"
  },
  "10": {
    "html": "<div class=\"todo-card\">\n  <h2>Todo list</h2>\n  <div class=\"todo-input\">\n    <input id=\"todoInput\" type=\"text\" placeholder=\"Nouvelle tache\">\n    <button id=\"addTodoBtn\">Ajouter</button>\n  </div>\n  <ul id=\"todoList\"></ul>\n</div>",
    "js": "const todoInput = document.getElementById('todoInput');\nconst addTodoBtn = document.getElementById('addTodoBtn');\nconst todoList = document.getElementById('todoList');\n\nfunction addTodo() {\n  const value = todoInput.value.trim();\n  if (!value) return;\n  const li = document.createElement('li');\n  li.textContent = value;\n  todoList.appendChild(li);\n  todoInput.value = '';\n}\n\naddTodoBtn.addEventListener('click', addTodo);"
  },
  "11": {
    "html": "<div class=\"calc-card\">\n  <h2>Calculatrice</h2>\n  <div class=\"calc-inputs\">\n    <input id=\"numberA\" type=\"number\" placeholder=\"A\">\n    <input id=\"numberB\" type=\"number\" placeholder=\"B\">\n  </div>\n  <div class=\"calc-actions\">\n    <button data-op=\"+\">+</button>\n    <button data-op=\"-\">-</button>\n    <button data-op=\"*\">*</button>\n    <button data-op=\"/\">/</button>\n  </div>\n  <p>Resultat: <span id=\"calcResult\">0</span></p>\n</div>",
    "js": "const numberA = document.getElementById('numberA');\nconst numberB = document.getElementById('numberB');\nconst calcResult = document.getElementById('calcResult');\nconst buttons = document.querySelectorAll('[data-op]');\n\nfunction calculate(operation) {\n  const a = Number(numberA.value);\n  const b = Number(numberB.value);\n  let result = 0;\n  if (operation === '+') result = a + b;\n  if (operation === '-') result = a - b;\n  if (operation === '*') result = a * b;\n  if (operation === '/') result = b === 0 ? 0 : a / b;\n  calcResult.textContent = result;\n}\n\nbuttons.forEach((button) => {\n  button.addEventListener('click', () => calculate(button.dataset.op));\n});"
  },
  "12": {
    "html": "<section class=\"game-board\">\n  <div>\n    <button class=\"choice-btn\" data-choice=\"pierre\">Pierre</button>\n    <button class=\"choice-btn\" data-choice=\"papier\">Papier</button>\n    <button class=\"choice-btn\" data-choice=\"ciseaux\">Ciseaux</button>\n  </div>\n  <div class=\"score-board\">\n    <p>Joueur: <span id=\"playerScore\">0</span></p>\n    <p>Bot: <span id=\"botScore\">0</span></p>\n  </div>\n  <p id=\"resultMessage\" class=\"result-message\">Fais un choix pour commencer.</p>\n  <button id=\"resetBtn\" class=\"reset-btn\">Reinitialiser</button>\n</section>",
    "js": "const choices = ['pierre', 'papier', 'ciseaux'];\nconst choiceButtons = document.querySelectorAll('.choice-btn');\nconst resultMessage = document.getElementById('resultMessage');\nconst playerScoreEl = document.getElementById('playerScore');\nconst botScoreEl = document.getElementById('botScore');\nconst resetBtn = document.getElementById('resetBtn');\n\nlet playerScore = 0;\nlet botScore = 0;\n\nfunction playRound(playerChoice) {\n  const botChoice = choices[Math.floor(Math.random() * choices.length)];\n  if (playerChoice === botChoice) {\n    resultMessage.textContent = 'Egalite ! Bot: ' + botChoice;\n  } else if (\n    (playerChoice === 'pierre' && botChoice === 'ciseaux') ||\n    (playerChoice === 'papier' && botChoice === 'pierre') ||\n    (playerChoice === 'ciseaux' && botChoice === 'papier')\n  ) {\n    playerScore += 1;\n    resultMessage.textContent = 'Gagne ! Bot: ' + botChoice;\n  } else {\n    botScore += 1;\n    resultMessage.textContent = 'Perdu ! Bot: ' + botChoice;\n  }\n  playerScoreEl.textContent = playerScore;\n  botScoreEl.textContent = botScore;\n}\n\nfunction resetGame() {\n  playerScore = 0;\n  botScore = 0;\n  playerScoreEl.textContent = '0';\n  botScoreEl.textContent = '0';\n  resultMessage.textContent = 'Fais un choix pour commencer.';\n}\n\nchoiceButtons.forEach((button) => {\n  button.addEventListener('click', () => playRound(button.dataset.choice));\n});\nresetBtn.addEventListener('click', resetGame);"
  }
};

module.exports = { PROJECT_COUNT, VALIDATION_RULES, BEHAVIOR_RULES, SOLUTIONS };

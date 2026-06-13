window.PREPARATION_PROJECTS = [
  {
    "id": 1,
    "title": "1. Carte de profil",
    "track": "HTML",
    "mode": "html",
    "description": "Construis une carte de profil simple et lisible.",
    "objective": "Structurer un petit bloc avec une image, un titre, un texte et une liste.",
    "build": "Une carte de profil avec photo, nom, role, bio, competences et un lien.",
    "concepts": [
      "section",
      "img + alt",
      "h1",
      "p",
      "ul/li",
      "class"
    ],
    "steps": [
      "Cree une section class=\"profile-card\".",
      "Ajoute une image avec class=\"profile-avatar\" et un alt descriptif.",
      "Ajoute un h1 class=\"profile-name\" pour le nom.",
      "Ajoute deux paragraphes: role (profile-role) et bio (profile-bio).",
      "Ajoute une liste ul class=\"profile-skills\" avec 3 li.",
      "Ajoute un lien a class=\"profile-link\" dans un bloc profile-actions."
    ],
    "checklist": [
      "Une section .profile-card",
      "Une image .profile-avatar avec alt",
      "Un h1 .profile-name",
      "Un p .profile-role et un p .profile-bio",
      "Une liste ul.profile-skills avec 3 li",
      "Un lien .profile-link"
    ],
    "memos": [
      "class relie ton HTML au CSS.",
      "alt decrit l image pour l accessibilite.",
      "Un h1 doit etre unique dans la page."
    ],
    "commonErrors": [
      "Oublier une classe exacte (casse).",
      "Mettre le lien hors de la carte.",
      "Oublier alt sur l image."
    ],
    "tips": [
      "Garde des textes courts et clairs.",
      "Teste le rendu avec et sans CSS."
    ],
    "glossary": [
      "section: regroupe un theme.",
      "class: etiquette CSS sur un element.",
      "alt: texte alternatif d une image."
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire une carte de profil simple. L idee est d apprendre a ranger une information visuelle: une photo, un nom, un role, une bio, des competences et un lien. Quand tu sais organiser ce type de bloc, tu peux creer des profils, des cartes produit ou des sections d equipe.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Balise, attribut, classe (tag / attribute / class)</h3>\n        <p>Une balise (tag) est un mot entre &lt; &gt; qui dit au navigateur ce que tu poses dans la page: &lt;section&gt;, &lt;img&gt;, &lt;p&gt;.</p>\n        <p>Un attribut (attribute) ajoute une info a la balise. Par exemple, &lt;img&gt; a besoin de <strong>src</strong> pour l image et de <strong>alt</strong> pour decrire la photo.</p>\n        <p>Une classe (class) est une etiquette que tu choisis. Elle relie ton HTML au CSS. Si tu changes la classe, le style ne s applique plus.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Structure logique de la carte</h3>\n        <p>Tout le contenu doit rester dans la section avec <strong>class=\"profile-card\"</strong>. Mets ensuite l image, le titre principal (h1), le role, la bio, la liste de competences, puis le lien. L ordre n est pas magique, mais cette logique rend la carte facile a lire.</p>\n        <p>Rappel important: un <strong>h1</strong> doit etre unique dans la page, donc on le reserve au nom du profil.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>&lt;section class=\"profile-card\"&gt;\n  &lt;!-- 1) Le conteneur de la carte --&gt;\n  &lt;img class=\"profile-avatar\" src=\"photo.jpg\" alt=\"Portrait de Lea\"&gt;\n  &lt;!-- 2) L image avec alt descriptif --&gt;\n  &lt;h1 class=\"profile-name\"&gt;Lea Martin&lt;/h1&gt;\n  &lt;!-- 3) Le titre principal unique --&gt;\n  &lt;p class=\"profile-role\"&gt;Etudiante web&lt;/p&gt;\n  &lt;!-- 4) Le role --&gt;\n  &lt;p class=\"profile-bio\"&gt;Bio courte et claire.&lt;/p&gt;\n  &lt;!-- 5) La bio --&gt;\n  &lt;ul class=\"profile-skills\"&gt;\n    &lt;li&gt;HTML&lt;/li&gt;\n    &lt;li&gt;Organisation&lt;/li&gt;\n    &lt;li&gt;Curiosite&lt;/li&gt;\n  &lt;/ul&gt;\n  &lt;!-- 6) La liste de competences --&gt;\n  &lt;div class=\"profile-actions\"&gt;\n    &lt;a class=\"profile-link\" href=\"mailto:lea@mail.com\"&gt;Me contacter&lt;/a&gt;\n  &lt;/div&gt;\n  &lt;!-- 7) Le lien dans la carte --&gt;\n&lt;/section&gt;</code></pre>\n        <p>Lis ce bloc comme une histoire: conteneur, image, titre, infos, liste, action. Si tu respectes cette logique, le CSS fera le reste.</p>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>class relie ton HTML au CSS: si la classe change, le style ne s applique plus.</li>\n          <li>alt decrit l image et aide l accessibilite.</li>\n          <li>Un h1 doit etre unique dans la page.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier une classe exacte (majuscule ou tiret).</li>\n          <li>Mettre le lien en dehors de la carte.</li>\n          <li>Oublier l attribut alt sur l image.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Garde des textes courts et clairs.</li>\n          <li>Teste le rendu avec et sans CSS pour voir si la structure tient.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Regarde d abord les classes attendues dans la checklist.",
        "L image doit avoir class=\"profile-avatar\".",
        "Le lien doit avoir class=\"profile-link\"."
      ]
    },
    "guideHtml": [
      "Etape 1/6\n<section class=\"profile-card\">\nObjectif: conteneur principal de la carte.",
      "Etape 2/6\n<img class=\"profile-avatar\" alt=\"Portrait\">\nObjectif: image avec alt descriptif.",
      "Etape 3/6\n<h1 class=\"profile-name\">Nom</h1>\nObjectif: nom du profil (h1 unique).",
      "Etape 4/6\n<p class=\"profile-role\">Role</p>\n<p class=\"profile-bio\">Bio</p>\nObjectif: role puis bio.",
      "Etape 5/6\n<ul class=\"profile-skills\">\n  <li>Competence 1</li>\n  <li>Competence 2</li>\n  <li>Competence 3</li>\n</ul>\nObjectif: 3 competences.",
      "Etape 6/6\n<a class=\"profile-link\" href=\"mailto:...\">Contact</a>\nObjectif: lien d action dans la carte."
    ],
    "starterHtml": "<section class=\"profile-card\">\n  <!-- Ajoute ici l image, le nom, le role et la bio -->\n  <ul class=\"profile-skills\">\n    <!-- Ajoute 3 competences -->\n  </ul>\n  <div class=\"profile-actions\">\n    <!-- Ajoute le lien -->\n  </div>\n</section>",
    "starterJs": "",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #f8fafc; margin: 0; padding: 32px; }\n.profile-card { max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 18px; padding: 24px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12); }\n.profile-avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid #34d399; }\n.profile-name { margin: 16px 0 4px; font-size: 1.6rem; }\n.profile-role { color: #0f766e; font-weight: 600; margin: 0; }\n.profile-bio { color: #475569; line-height: 1.6; }\n.profile-skills { list-style: none; padding: 0; display: grid; gap: 6px; }\n.profile-skills li { background: #f1f5f9; border-radius: 10px; padding: 6px 10px; }\n.profile-actions { margin-top: 16px; }\n.profile-link { display: inline-block; padding: 10px 16px; border-radius: 999px; background: #34d399; color: #052e25; text-decoration: none; font-weight: 700; }",
    "validation": {
      "tags": [
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
      "classMap": {
        "profile-card": "section",
        "profile-avatar": "img",
        "profile-name": "h1",
        "profile-role": "p",
        "profile-bio": "p",
        "profile-skills": "ul",
        "profile-link": "a"
      }
    },
    "reactBridge": "Pense chaque carte comme un futur composant React: un bloc autonome, avec des donnees claires a afficher."
  },
  {
    "id": 2,
    "title": "2. Fiche produit",
    "track": "HTML",
    "mode": "html",
    "description": "Construis une fiche produit claire et attractive.",
    "objective": "Structurer une fiche produit avec image, prix et action.",
    "build": "Une carte produit avec photo, titre, prix, description, liste et bouton.",
    "concepts": [
      "article",
      "img",
      "h2",
      "p",
      "ul/li",
      "button",
      "class"
    ],
    "steps": [
      "Cree un article class=\"product-card\".",
      "Ajoute une image class=\"product-image\".",
      "Ajoute un h2 class=\"product-title\".",
      "Ajoute un p class=\"product-price\".",
      "Ajoute un p class=\"product-description\".",
      "Ajoute une liste ul class=\"product-features\" avec 3 li.",
      "Ajoute un bouton class=\"buy-button\"."
    ],
    "checklist": [
      "Article .product-card",
      "Image .product-image",
      "Titre .product-title",
      "Prix .product-price",
      "Description .product-description",
      "Liste ul.product-features avec 3 li",
      "Bouton .buy-button"
    ],
    "memos": [
      "Un article represente un bloc autonome.",
      "Le prix doit etre visible et court."
    ],
    "commonErrors": [
      "Oublier la classe exacte du bouton.",
      "Mettre le prix dans un h2 au lieu d un p."
    ],
    "tips": [
      "Utilise un texte de bouton tres clair."
    ],
    "glossary": [
      "article: bloc autonome",
      "button: action cliquable"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire une fiche produit simple. Le but est d apprendre a presenter l info qui compte: image, titre, prix, description, points forts et action.</p>\n        <p>Un visiteur doit comprendre en quelques secondes ce qui est vendu et quoi faire ensuite.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Balises utiles (tag / attribute / class)</h3>\n        <p><strong>article</strong> sert de bloc autonome. <strong>img</strong> affiche la photo et a besoin d un <strong>alt</strong> descriptif.</p>\n        <p>Le titre va dans <strong>h2</strong>, le prix et la description dans des <strong>p</strong>. Les points forts vont dans <strong>ul</strong> et <strong>li</strong>. L action finale utilise un <strong>button</strong>.</p>\n        <p>Les classes (class) relient chaque piece au CSS. Une classe mal ecrite et le style ne s applique plus.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Structure logique</h3>\n        <p>Commence par un <strong>article</strong> avec <strong>class=\"product-card\"</strong>, puis l image. Ensuite un bloc <strong>product-body</strong> avec titre, prix, description, liste et bouton.</p>\n        <p>Garde le prix visible et court. Le bouton doit etre le dernier element pour guider l action.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>&lt;article class=\"product-card\"&gt;\n  &lt;!-- 1) Le bloc produit --&gt;\n  &lt;img class=\"product-image\" src=\"image.jpg\" alt=\"Sac urbain\"&gt;\n  &lt;div class=\"product-body\"&gt;\n    &lt;h2 class=\"product-title\"&gt;Sac urbain&lt;/h2&gt;\n    &lt;p class=\"product-price\"&gt;49,00 EUR&lt;/p&gt;\n    &lt;p class=\"product-description\"&gt;Compact et solide.&lt;/p&gt;\n    &lt;ul class=\"product-features\"&gt;\n      &lt;li&gt;Tissu impermeable&lt;/li&gt;\n      &lt;li&gt;Poche 14 pouces&lt;/li&gt;\n      &lt;li&gt;Dos renforce&lt;/li&gt;\n    &lt;/ul&gt;\n    &lt;button class=\"buy-button\"&gt;Ajouter au panier&lt;/button&gt;\n  &lt;/div&gt;\n&lt;/article&gt;</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>alt decrit l image pour l accessibilite.</li>\n          <li>Le prix reste dans un p, pas dans un h2.</li>\n          <li>Les classes doivent etre exactes.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier la classe du bouton.</li>\n          <li>Mettre le lien ou le bouton hors de la carte.</li>\n          <li>Oublier l attribut alt sur l image.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Utilise un prix court et visible.</li>\n          <li>Choisis un verbe clair pour le bouton.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Le conteneur principal est un article.",
        "Le prix doit avoir class=\"product-price\".",
        "Le bouton doit avoir class=\"buy-button\"."
      ]
    },
    "guideHtml": [
      "Etape 1/7\n<article class=\"product-card\">\nObjectif: conteneur produit.",
      "Etape 2/7\n<img class=\"product-image\" alt=\"Produit\">\nObjectif: photo du produit.",
      "Etape 3/7\n<h2 class=\"product-title\">Titre</h2>\nObjectif: titre du produit.",
      "Etape 4/7\n<p class=\"product-price\">49,00 EUR</p>\nObjectif: prix visible.",
      "Etape 5/7\n<p class=\"product-description\">Description courte.</p>\nObjectif: description courte.",
      "Etape 6/7\n<ul class=\"product-features\">\n  <li>Point fort</li>\n  <li>Point fort</li>\n  <li>Point fort</li>\n</ul>\nObjectif: points forts.",
      "Etape 7/7\n<button class=\"buy-button\">Ajouter au panier</button>\nObjectif: bouton d action."
    ],
    "starterHtml": "<article class=\"product-card\">\n  <!-- Ajoute l image du produit -->\n  <div class=\"product-body\">\n    <!-- Ajoute le titre, le prix, la description, la liste et le bouton -->\n  </div>\n</article>",
    "starterJs": "",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.product-card { max-width: 520px; margin: 0 auto; background: #111827; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.35); }\n.product-image { width: 100%; height: 220px; object-fit: cover; }\n.product-body { padding: 22px; display: grid; gap: 8px; }\n.product-title { margin: 0; font-size: 1.4rem; }\n.product-price { font-size: 1.1rem; color: #34d399; font-weight: 700; }\n.product-description { color: #cbd5f5; line-height: 1.6; }\n.product-features { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }\n.product-features li { background: rgba(255,255,255,0.06); padding: 6px 10px; border-radius: 10px; }\n.buy-button { margin-top: 8px; padding: 10px 16px; border: none; border-radius: 999px; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }",
    "validation": {
      "tags": [
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
      "classMap": {
        "product-card": "article",
        "product-image": "img",
        "product-title": "h2",
        "product-price": "p",
        "product-description": "p",
        "product-features": "ul",
        "buy-button": "button"
      }
    },
    "reactBridge": "Une fiche produit est typiquement un composant React: image, titre, prix, description et bouton viennent souvent de props."
  },
  {
    "id": 3,
    "title": "3. Formulaire",
    "track": "HTML",
    "mode": "html",
    "description": "Apprends a structurer un formulaire complet.",
    "objective": "Utiliser form, label, input, textarea, select et button.",
    "build": "Un formulaire de contact avec plusieurs types d input.",
    "concepts": [
      "form",
      "label/for",
      "input types",
      "textarea",
      "select",
      "required"
    ],
    "steps": [
      "Cree un form class=\"contact-form\".",
      "Ajoute une ligne avec label + input text (class form-label/form-input).",
      "Ajoute une ligne avec input email.",
      "Ajoute une ligne avec input password.",
      "Ajoute un select class=\"form-select\".",
      "Ajoute une textarea class=\"form-textarea\".",
      "Ajoute une checkbox et une radio.",
      "Ajoute un bouton class=\"submit-button\"."
    ],
    "checklist": [
      "Formulaire .contact-form",
      "Labels avec class .form-label",
      "Inputs avec class .form-input",
      "Textarea .form-textarea",
      "Select .form-select",
      "Checkbox + radio",
      "Bouton .submit-button"
    ],
    "memos": [
      "label for doit viser l id de l input.",
      "required rend un champ obligatoire."
    ],
    "commonErrors": [
      "Oublier le type email.",
      "Ne pas lier label et input."
    ],
    "tips": [
      "Garde des labels simples et directs."
    ],
    "glossary": [
      "label: nom visible d un champ",
      "required: champ obligatoire"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire un formulaire de contact. L idee est de comprendre comment un utilisateur saisit des donnees et comment tu ranges ces champs.</p>\n        <p>Un formulaire bien structure est lisible et facile a remplir.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Balises et attributs (tag / attribute)</h3>\n        <p><strong>form</strong> est le conteneur. Chaque champ a un <strong>label</strong> et un <strong>input</strong> ou une <strong>textarea</strong>.</p>\n        <p>L attribut <strong>for</strong> du label doit viser l <strong>id</strong> du champ. Cela relie le texte au champ.</p>\n        <p>Le type (attribute) d un input change son comportement: text, email, password, checkbox, radio.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Structure logique</h3>\n        <p>Le formulaire contient des lignes (.form-row) avec un label puis le champ. Ajoute un select, une textarea, puis les cases a cocher.</p>\n        <p>Le bouton submit termine le formulaire. Pense a <strong>required</strong> sur les champs importants.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>&lt;form class=\"contact-form\"&gt;\n  &lt;div class=\"form-row\"&gt;\n    &lt;label class=\"form-label\" for=\"email\"&gt;Email&lt;/label&gt;\n    &lt;input class=\"form-input\" id=\"email\" type=\"email\" required&gt;\n  &lt;/div&gt;\n  &lt;div class=\"form-row\"&gt;\n    &lt;label class=\"form-label\" for=\"message\"&gt;Message&lt;/label&gt;\n    &lt;textarea class=\"form-textarea\" id=\"message\"&gt;&lt;/textarea&gt;\n  &lt;/div&gt;\n  &lt;button class=\"submit-button\" type=\"submit\"&gt;Envoyer&lt;/button&gt;\n&lt;/form&gt;</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>for doit viser l id du champ.</li>\n          <li>required rend un champ obligatoire.</li>\n          <li>type=\"email\" verifie le format.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier de lier label et input.</li>\n          <li>Mettre un input sans type.</li>\n          <li>Oublier la classe .submit-button.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Garde des labels courts.</li>\n          <li>Teste en cliquant sur le label: le champ doit se focus.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Chaque champ doit avoir un label clair.",
        "Ajoute au moins une checkbox et un radio.",
        "Le bouton doit avoir class=\"submit-button\"."
      ]
    },
    "guideHtml": [
      "Etape 1/8\n<form class=\"contact-form\">\nObjectif: conteneur du formulaire.",
      "Etape 2/8\n<label class=\"form-label\" for=\"fullname\">Nom complet</label>\n<input class=\"form-input\" id=\"fullname\" type=\"text\">\nObjectif: ligne nom.",
      "Etape 3/8\n<label class=\"form-label\" for=\"email\">Email</label>\n<input class=\"form-input\" id=\"email\" type=\"email\">\nObjectif: ligne email.",
      "Etape 4/8\n<label class=\"form-label\" for=\"pwd\">Mot de passe</label>\n<input class=\"form-input\" id=\"pwd\" type=\"password\">\nObjectif: ligne mot de passe.",
      "Etape 5/8\n<label class=\"form-label\" for=\"topic\">Sujet</label>\n<select class=\"form-select\" id=\"topic\"></select>\nObjectif: liste deroulante.",
      "Etape 6/8\n<label class=\"form-label\" for=\"message\">Message</label>\n<textarea class=\"form-textarea\" id=\"message\"></textarea>\nObjectif: message.",
      "Etape 7/8\n<label class=\"form-label\"><input type=\"checkbox\"> J accepte</label>\n<label class=\"form-label\"><input type=\"radio\" name=\"contact\"> Contact par email</label>\nObjectif: checkbox et radio.",
      "Etape 8/8\n<button class=\"submit-button\" type=\"submit\">Envoyer</button>\nObjectif: bouton Envoyer."
    ],
    "starterHtml": "<form class=\"contact-form\">\n  <!-- Ajoute ici tes lignes de formulaire -->\n</form>",
    "starterJs": "",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 32px; }\n.contact-form { max-width: 560px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 14px; }\n.form-row { display: grid; gap: 6px; }\n.form-label { font-weight: 700; color: #a7f3d0; }\n.form-input, .form-textarea, .form-select { border-radius: 12px; border: 1px solid rgba(148,163,184,0.3); background: #0f172a; color: #e2e8f0; padding: 10px 12px; }\n.form-textarea { min-height: 120px; resize: vertical; }\n.form-actions { display: flex; justify-content: flex-end; }\n.submit-button { border: none; border-radius: 999px; padding: 10px 18px; background: #34d399; color: #052e25; font-weight: 800; }",
    "validation": {
      "tags": [
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
      "classMap": {
        "contact-form": "form",
        "form-label": "label",
        "form-input": "input",
        "form-textarea": "textarea",
        "form-select": "select",
        "submit-button": "button"
      }
    },
    "reactBridge": "Les formulaires React utilisent les memes champs HTML, puis ajoutent une gestion d etat pour les valeurs."
  },
  {
    "id": 4,
    "title": "4. Mini CV",
    "track": "HTML",
    "mode": "html",
    "description": "Organise un mini CV clair et structure.",
    "objective": "Structurer un profil avec sections competences et experience.",
    "build": "Un CV simple avec entete, sections et lien de contact.",
    "concepts": [
      "header",
      "section",
      "h1/h2",
      "ul/li",
      "a"
    ],
    "steps": [
      "Cree une section class=\"cv-card\".",
      "Ajoute un header class=\"cv-header\" avec h1.cv-name et p.cv-title.",
      "Ajoute une section class=\"cv-section\" pour les competences.",
      "Ajoute une liste ul.skill-list avec au moins 3 competences.",
      "Ajoute une section cv-section pour experience ou formation.",
      "Ajoute un lien class=\"cv-contact\"."
    ],
    "checklist": [
      "Section .cv-card",
      "Header .cv-header avec h1.cv-name",
      "Paragraphe .cv-title",
      "Section competences + ul.skill-list",
      "Section experience/formation",
      "Lien .cv-contact"
    ],
    "memos": [
      "Chaque section commence par un h2."
    ],
    "commonErrors": [
      "Oublier la classe .cv-title."
    ],
    "tips": [
      "Utilise des phrases courtes."
    ],
    "glossary": [
      "header: entete du bloc",
      "section: partie thematique"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire un mini CV. L idee est d organiser tes infos comme une mini page de presentation: nom, titre, competences, experience et contact.</p>\n        <p>Un CV clair se lit vite et chaque section a un role.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Balises utiles (tag / class)</h3>\n        <p><strong>header</strong> sert d entete. <strong>section</strong> regroupe un theme. <strong>h1</strong> est reserve au nom, <strong>h2</strong> annonce chaque section.</p>\n        <p>La liste de competences va dans <strong>ul</strong> et <strong>li</strong>. Le lien de contact est un <strong>a</strong>.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Structure logique</h3>\n        <p>Dans la section avec <strong>class=\"cv-card\"</strong>, commence par un header avec le nom et le titre. Ensuite une section competences, puis une section experience.</p>\n        <p>Termine par un lien de contact clair.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>&lt;section class=\"cv-card\"&gt;\n  &lt;header class=\"cv-header\"&gt;\n    &lt;h1 class=\"cv-name\"&gt;Sarah Benali&lt;/h1&gt;\n    &lt;p class=\"cv-title\"&gt;Etudiante en reseaux&lt;/p&gt;\n  &lt;/header&gt;\n  &lt;section class=\"cv-section\"&gt;\n    &lt;h2&gt;Competences&lt;/h2&gt;\n    &lt;ul class=\"skill-list\"&gt;\n      &lt;li&gt;HTML&lt;/li&gt;\n      &lt;li&gt;Organisation&lt;/li&gt;\n      &lt;li&gt;Travail en equipe&lt;/li&gt;\n    &lt;/ul&gt;\n  &lt;/section&gt;\n  &lt;a class=\"cv-contact\" href=\"mailto:sarah@mail.com\"&gt;Me contacter&lt;/a&gt;\n&lt;/section&gt;</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>Un h1 doit etre unique dans la page.</li>\n          <li>Chaque section commence par un h2.</li>\n          <li>Les classes doivent etre exactes.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier la classe .cv-title.</li>\n          <li>Mettre la liste hors de .skill-list.</li>\n          <li>Oublier le lien de contact.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Garde des phrases courtes.</li>\n          <li>Ajoute 3 competences max pour rester lisible.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Le header doit contenir le nom et le titre.",
        "La liste de competences doit etre dans ul.skill-list.",
        "Ajoute un lien de contact a la fin."
      ]
    },
    "guideHtml": [
      "Etape 1/6\n<section class=\"cv-card\">\nObjectif: conteneur du CV.",
      "Etape 2/6\n<header class=\"cv-header\">\n  <h1 class=\"cv-name\">Nom</h1>\n  <p class=\"cv-title\">Titre</p>\n</header>\nObjectif: nom + titre.",
      "Etape 3/6\n<section class=\"cv-section\">\n  <h2>Competences</h2>\n</section>\nObjectif: section competences.",
      "Etape 4/6\n<ul class=\"skill-list\">\n  <li>Competence</li>\n  <li>Competence</li>\n  <li>Competence</li>\n</ul>\nObjectif: liste de competences.",
      "Etape 5/6\n<section class=\"cv-section\">\n  <h2>Experience</h2>\n  <p>Detail</p>\n</section>\nObjectif: experience ou formation.",
      "Etape 6/6\n<a class=\"cv-contact\" href=\"mailto:...\">Me contacter</a>\nObjectif: lien de contact."
    ],
    "starterHtml": "<section class=\"cv-card\">\n  <!-- Ajoute ici ton header, tes sections et ton lien -->\n</section>",
    "starterJs": "",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #f8fafc; margin: 0; padding: 32px; }\n.cv-card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 24px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12); display: grid; gap: 16px; }\n.cv-header { display: grid; gap: 6px; }\n.cv-name { margin: 0; font-size: 2rem; }\n.cv-title { margin: 0; color: #0f766e; font-weight: 600; }\n.cv-section h2 { margin: 0 0 6px; font-size: 1.1rem; }\n.skill-list { list-style: none; padding: 0; display: grid; gap: 6px; }\n.skill-list li { background: #f1f5f9; padding: 6px 10px; border-radius: 10px; }\n.cv-contact { color: #0f766e; font-weight: 700; text-decoration: none; }",
    "validation": {
      "tags": [
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
      "classMap": {
        "cv-card": "section",
        "cv-header": "header",
        "cv-name": "h1",
        "cv-title": "p",
        "cv-section": "section",
        "skill-list": "ul",
        "cv-contact": "a"
      }
    },
    "reactBridge": "Un mini CV peut devenir une liste de sections React generees depuis des donnees."
  },
  {
    "id": 5,
    "title": "5. Mini portfolio",
    "track": "HTML",
    "mode": "html",
    "description": "Projet autonome pour valider la partie HTML.",
    "objective": "Creer une page complete avec presentation, projets et contact.",
    "build": "Un mini portfolio avec sections claires et classes attendues.",
    "concepts": [
      "main",
      "section",
      "article",
      "ul/li",
      "a"
    ],
    "steps": [
      "Cree un main class=\"portfolio-page\".",
      "Ajoute une section hero-section avec h1 et un paragraphe.",
      "Ajoute une section portfolio-skills avec une liste skill-list.",
      "Ajoute une section class=\"project-grid\" avec au moins 2 article class=\"project-card\".",
      "Ajoute une section contact avec un lien class=\"contact-link\"."
    ],
    "checklist": [
      "main .portfolio-page",
      "section .hero-section avec h1 + p",
      "section .portfolio-skills + ul.skill-list",
      "section class=\"project-grid\" avec 2 article class=\"project-card\"",
      "Lien .contact-link"
    ],
    "memos": [
      "Les classes doivent etre exactes."
    ],
    "commonErrors": [
      "Oublier une classe sur une section."
    ],
    "tips": [
      "Ajoute des titres courts pour chaque projet."
    ],
    "glossary": [
      "portfolio: page qui montre tes projets"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire une page portfolio complete. L idee est de regrouper presentation, competences, projets et contact dans un seul ensemble.</p>\n        <p>Tu apprends a creer une page simple mais structuree, comme un mini site.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Balises utiles (tag / class)</h3>\n        <p><strong>main</strong> est le conteneur principal. Chaque partie est une <strong>section</strong>.</p>\n        <p>Les projets sont des <strong>article</strong> car ce sont des blocs autonomes. Un <strong>h1</strong> pour le nom, des <strong>h2</strong> pour les sections.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Structure logique</h3>\n        <p>Dans le <strong>main</strong> avec <strong>class=\"portfolio-page\"</strong>, ajoute une section hero, une section competences, une section projets, puis une section contact.</p>\n        <p>Dans la grille projets, mets au moins deux <strong>article</strong> avec <strong>class=\"project-card\"</strong>.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>&lt;main class=\"portfolio-page\"&gt;\n  &lt;section class=\"hero-section\"&gt;\n    &lt;h1 class=\"portfolio-title\"&gt;Nora Dupont&lt;/h1&gt;\n    &lt;p class=\"portfolio-tagline\"&gt;Je cree des pages claires.&lt;/p&gt;\n  &lt;/section&gt;\n  &lt;section class=\"project-grid\"&gt;\n    &lt;article class=\"project-card\"&gt;\n      &lt;h3&gt;Carte profil&lt;/h3&gt;\n      &lt;p&gt;Une carte simple.&lt;/p&gt;\n    &lt;/article&gt;\n  &lt;/section&gt;\n  &lt;section class=\"contact-section\"&gt;\n    &lt;a class=\"contact-link\" href=\"mailto:nora@mail.com\"&gt;Ecrire un message&lt;/a&gt;\n  &lt;/section&gt;\n&lt;/main&gt;</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>main doit etre unique dans la page.</li>\n          <li>Les cartes projets sont des article.</li>\n          <li>Les classes doivent etre exactes.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier la section contact.</li>\n          <li>Mettre une div a la place de article.</li>\n          <li>Oublier une classe attendue.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Donne des titres courts aux projets.</li>\n          <li>Garde 2 ou 3 phrases max par section.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Commence par le main .portfolio-page.",
        "La grille de projets doit utiliser .project-grid et .project-card.",
        "Le lien final doit etre .contact-link."
      ]
    },
    "guideHtml": [
      "Etape 1/5\n<main class=\"portfolio-page\">\nObjectif: conteneur principal.",
      "Etape 2/5\n<section class=\"hero-section\">\n  <h1 class=\"portfolio-title\">Nom</h1>\n  <p class=\"portfolio-tagline\">Phrase courte.</p>\n</section>\nObjectif: presentation.",
      "Etape 3/5\n<section class=\"portfolio-skills\">\n  <ul class=\"skill-list\">\n    <li>Skill</li>\n    <li>Skill</li>\n    <li>Skill</li>\n  </ul>\n</section>\nObjectif: competences.",
      "Etape 4/5\n<section class=\"project-grid\">\n  <article class=\"project-card\">Projet 1</article>\n  <article class=\"project-card\">Projet 2</article>\n</section>\nObjectif: 2 projets minimum.",
      "Etape 5/5\n<section class=\"contact-section\">\n  <a class=\"contact-link\" href=\"mailto:...\">Contact</a>\n</section>\nObjectif: lien de contact."
    ],
    "starterHtml": "<main class=\"portfolio-page\">\n  <!-- Ajoute ici les sections hero, competences, projets et contact -->\n</main>",
    "starterJs": "",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.portfolio-page { max-width: 900px; margin: 0 auto; display: grid; gap: 18px; }\n.hero-section, .portfolio-skills, .project-grid, .contact-section { background: #111827; padding: 20px; border-radius: 18px; }\n.hero-section h1 { margin: 0 0 6px; }\n.portfolio-tagline { color: #cbd5f5; }\n.skill-list { list-style: none; padding: 0; display: flex; gap: 8px; flex-wrap: wrap; }\n.skill-list li { background: rgba(52,211,153,0.15); padding: 6px 10px; border-radius: 999px; }\n.project-grid { display: grid; gap: 12px; }\n.project-card { background: rgba(255,255,255,0.05); padding: 14px; border-radius: 14px; }\n.contact-link { display: inline-block; padding: 10px 14px; border-radius: 999px; background: #34d399; color: #052e25; text-decoration: none; font-weight: 800; }",
    "validation": {
      "tags": [
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
      "classMap": {
        "portfolio-page": "main",
        "hero-section": "section",
        "portfolio-title": "h1",
        "portfolio-tagline": "p",
        "portfolio-skills": "section",
        "skill-list": "ul",
        "project-grid": "section",
        "project-card": "article",
        "contact-link": "a"
      }
    },
    "reactBridge": "Un portfolio prepare la logique de composants reutilisables: hero, liste de competences, cartes de projets."
  },
  {
    "id": 6,
    "title": "6. Message dynamique",
    "track": "JavaScript",
    "mode": "js",
    "description": "Change un texte avec JavaScript, comme une premiere mise a jour d interface.",
    "objective": "Comprendre le lien entre une variable, un clic et le texte visible.",
    "build": "Une petite carte avec un message qui change quand on clique sur un bouton.",
    "concepts": [
      "getElementById",
      "textContent",
      "function",
      "click"
    ],
    "steps": [
      "Cible #messageText et #changeMessageBtn.",
      "Cree une fonction changeMessage().",
      "Dans la fonction, remplace le texte avec textContent.",
      "Branche le clic du bouton avec addEventListener."
    ],
    "checklist": [
      "Constantes messageText et changeMessageBtn",
      "Fonction changeMessage()",
      "Mise a jour de messageText.textContent",
      "Clic branche sur le bouton"
    ],
    "memos": [
      "Le DOM est la page HTML vue par JavaScript.",
      "textContent change uniquement le texte visible.",
      "Un event click lance une fonction."
    ],
    "commonErrors": [
      "Changer le texte avant de cliquer, mais oublier addEventListener.",
      "Ecrire textcontent au lieu de textContent.",
      "Oublier les parentheses quand tu appelles une fonction."
    ],
    "tips": [
      "Teste le clic plusieurs fois.",
      "Commence par afficher un message simple, puis rends-le plus personnel."
    ],
    "glossary": [
      "DOM: representation de la page pour JavaScript.",
      "event: action de l utilisateur.",
      "handler: fonction lancee par un evenement."
    ],
    "reactBridge": "En React, tu ne modifies pas directement le DOM avec textContent, mais l idee reste la meme: une action utilisateur change une donnee, puis l interface affiche la nouvelle valeur.",
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu passes de HTML statique a une interface qui repond. Le bouton devient une action, et le paragraphe devient une zone que JavaScript peut mettre a jour.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Le reflexe DOM</h3>\n        <p>Pour agir sur une page, tu suis trois gestes: cibler un element, creer une fonction, brancher un evenement. C est le coeur de presque toutes les interfaces.</p>\n        <p><strong>getElementById</strong> recupere un element. <strong>textContent</strong> change son texte. <strong>addEventListener</strong> relie un clic a une fonction.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>const messageText = document.getElementById('messageText');\nconst changeMessageBtn = document.getElementById('changeMessageBtn');\n\nfunction changeMessage() {\n  messageText.textContent = 'Message modifie avec JavaScript';\n}\n\nchangeMessageBtn.addEventListener('click', changeMessage);</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>On cible avant d agir.</li>\n          <li>La fonction contient ce qui doit se passer.</li>\n          <li>Le clic declenche la fonction.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Commence par cibler messageText et changeMessageBtn.",
        "Dans changeMessage(), modifie messageText.textContent.",
        "Le bouton doit ecouter le clic avec addEventListener."
      ]
    },
    "guideJs": [
      "Etape 1/4\nconst messageText = document.getElementById('messageText')\nObjectif: cibler le texte.",
      "Etape 2/4\nfunction changeMessage() { }\nObjectif: creer la fonction.",
      "Etape 3/4\nmessageText.textContent = '...'\nObjectif: changer le texte visible.",
      "Etape 4/4\nchangeMessageBtn.addEventListener('click', changeMessage)\nObjectif: brancher le clic."
    ],
    "starterHtml": "<div class=\"message-card\">\n  <h2>Message dynamique</h2>\n  <p id=\"messageText\">Clique sur le bouton pour changer ce message.</p>\n  <button id=\"changeMessageBtn\">Changer le message</button>\n</div>",
    "starterJs": "const messageText = document.getElementById('messageText');\nconst changeMessageBtn = document.getElementById('changeMessageBtn');\n\nfunction changeMessage() {\n  // Change le texte de messageText ici\n}\n\nchangeMessageBtn.addEventListener('click', changeMessage);",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.message-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }\n#messageText { color: #a7f3d0; line-height: 1.6; font-weight: 700; }\n#changeMessageBtn { border: none; border-radius: 999px; padding: 10px 16px; background: #34d399; color: #052e25; font-weight: 800; cursor: pointer; }",
    "validation": {
      "jsNames": [
        "messageText",
        "changeMessage"
      ],
      "behavior": "message"
    }
  },
  {
    "id": 7,
    "title": "7. Carte interactive",
    "track": "JavaScript",
    "mode": "js",
    "description": "Change un etat visuel avec classList et un bouton.",
    "objective": "Comprendre comment une classe CSS peut representer un etat.",
    "build": "Une carte qui passe de \"En attente\" a \"Actif\" quand on clique.",
    "concepts": [
      "classList.toggle",
      "etat",
      "condition",
      "textContent"
    ],
    "steps": [
      "Cible #statusBadge et #toggleStatusBtn.",
      "Declare une variable isActive a false.",
      "Cree une fonction toggleStatus().",
      "Inverse isActive, change la classe et le texte.",
      "Branche le clic du bouton."
    ],
    "checklist": [
      "Variable isActive",
      "Fonction toggleStatus()",
      "classList.toggle ou classList.add/remove",
      "Texte du badge mis a jour",
      "Clic branche sur le bouton"
    ],
    "memos": [
      "Un etat est une valeur qui dit ou en est l interface.",
      "classList.toggle ajoute ou retire une classe.",
      "Une condition choisit quoi afficher."
    ],
    "commonErrors": [
      "Changer la classe mais pas le texte.",
      "Oublier de modifier isActive.",
      "Brancher le clic sur le mauvais id."
    ],
    "tips": [
      "Teste deux clics: actif puis en attente.",
      "Garde isActive en booleen true/false."
    ],
    "glossary": [
      "etat: valeur qui represente la situation actuelle.",
      "booleen: true ou false.",
      "toggle: bascule entre deux situations."
    ],
    "reactBridge": "C est la transition directe vers React: isActive ressemble a un state, et le texte affiche depend de ce state.",
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas manipuler un etat. Une interface moderne change souvent selon une valeur: actif/inactif, ouvert/ferme, connecte/deconnecte.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Etat + rendu</h3>\n        <p>La variable <strong>isActive</strong> garde la situation actuelle. Quand elle change, tu mets a jour le texte et la classe visuelle.</p>\n        <p>Ce reflexe prepare tres bien React: une donnee controle ce que l utilisateur voit.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>let isActive = false;\n\nfunction toggleStatus() {\n  isActive = !isActive;\n  statusBadge.textContent = isActive ? 'Actif' : 'En attente';\n  statusBadge.classList.toggle('is-active', isActive);\n}</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>!isActive inverse true et false.</li>\n          <li>classList.toggle peut recevoir une condition.</li>\n          <li>Le texte doit suivre l etat.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "isActive doit commencer a false.",
        "Utilise isActive = !isActive pour inverser.",
        "Mets a jour le texte et la classe dans la meme fonction."
      ]
    },
    "guideJs": [
      "Etape 1/5\nconst statusBadge = document.getElementById('statusBadge')\nObjectif: cibler le badge.",
      "Etape 2/5\nlet isActive = false\nObjectif: stocker l etat.",
      "Etape 3/5\nfunction toggleStatus() { isActive = !isActive }\nObjectif: basculer l etat.",
      "Etape 4/5\nstatusBadge.textContent = isActive ? 'Actif' : 'En attente'\nObjectif: afficher l etat.",
      "Etape 5/5\ntoggleStatusBtn.addEventListener('click', toggleStatus)\nObjectif: brancher le clic."
    ],
    "starterHtml": "<div class=\"status-card\">\n  <h2>Carte interactive</h2>\n  <p id=\"statusBadge\" class=\"status-badge\">En attente</p>\n  <button id=\"toggleStatusBtn\">Basculer</button>\n</div>",
    "starterJs": "const statusBadge = document.getElementById('statusBadge');\nconst toggleStatusBtn = document.getElementById('toggleStatusBtn');\n\nlet isActive = false;\n\nfunction toggleStatus() {\n  // 1) inverse isActive\n  // 2) change le texte du badge\n  // 3) ajoute ou retire la classe is-active\n}\n\ntoggleStatusBtn.addEventListener('click', toggleStatus);",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.status-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; text-align: center; }\n.status-badge { margin: 0 auto; width: max-content; border-radius: 999px; padding: 8px 14px; background: rgba(251, 191, 36, 0.14); color: #fde68a; font-weight: 900; }\n.status-badge.is-active { background: rgba(52, 211, 153, 0.18); color: #a7f3d0; }\n#toggleStatusBtn { border: none; border-radius: 999px; padding: 10px 16px; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }",
    "validation": {
      "jsNames": [
        "isActive",
        "toggleStatus"
      ],
      "behavior": "toggle"
    }
  },
  {
    "id": 8,
    "title": "8. Compteur",
    "track": "JavaScript",
    "mode": "js",
    "description": "Fais un compteur qui augmente au clic.",
    "objective": "Comprendre variable, fonction et event click.",
    "build": "Un compteur qui passe de 0 a 1, 2, 3...",
    "concepts": [
      "let",
      "function",
      "addEventListener",
      "textContent"
    ],
    "steps": [
      "Declare une variable score a 0.",
      "Cree une fonction incrementer() qui ajoute 1.",
      "Met a jour #countValue avec score.",
      "Ajoute un clic sur #incrementBtn."
    ],
    "checklist": [
      "Variable score",
      "Fonction incrementer()",
      "Affichage dans #countValue",
      "Clic sur #incrementBtn"
    ],
    "memos": [
      "textContent change le texte visible."
    ],
    "commonErrors": [
      "Oublier de convertir en nombre."
    ],
    "tips": [
      "Teste en cliquant plusieurs fois."
    ],
    "glossary": [
      "event: action de l utilisateur"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas coder un compteur qui augmente au clic. C est le meilleur exercice pour comprendre variable (variable), fonction (function) et evenement (event).</p>\n        <p>Le principe: une valeur en memoire, puis tu mets a jour le texte affiche.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Les bases JS a connaitre</h3>\n        <p>Une variable stocke une valeur: <strong>let score = 0</strong>. Une fonction regroupe des actions: <strong>function incrementer()</strong>.</p>\n        <p>Un evenement (event) se declenche au clic. <strong>addEventListener</strong> relie le bouton a ta fonction.</p>\n        <p>Pour afficher un nombre, on change <strong>textContent</strong> de l element HTML.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>const countValue = document.getElementById('countValue');\nconst incrementBtn = document.getElementById('incrementBtn');\n\nlet score = 0;\n\nfunction incrementer() {\n  score = score + 1;\n  countValue.textContent = score;\n}\n\nincrementBtn.addEventListener('click', incrementer);</code></pre>\n        <p>Lis le code dans l ordre: on cible les elements, on prepare la variable, on cree la fonction, puis on branche le clic.</p>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>textContent change le texte visible.</li>\n          <li>score doit rester un nombre.</li>\n          <li>Le clic doit appeler incrementer().</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier de mettre a jour countValue.</li>\n          <li>Mettre score entre guillemets (ce n est plus un nombre).</li>\n          <li>Oublier l addEventListener.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Teste en cliquant 5 fois pour verifier.</li>\n          <li>Ajoute un console.log(score) si besoin.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "score doit commencer a 0.",
        "incrementer() ajoute 1 puis affiche.",
        "Le clic doit appeler incrementer()."
      ]
    },
    "guideJs": [
      "Etape 1/4\n    let score = 0\n    Objectif: variable du compteur.",
      "Etape 2/4\n    function incrementer() { score = score + 1; }\n    Objectif: augmente le score.",
      "Etape 3/4\n    countValue.textContent = score\n    Objectif: affiche le score.",
      "Etape 4/4\n    incrementBtn.addEventListener('click', incrementer)\n    Objectif: declenche au clic."
    ],
    "starterHtml": "<div class=\"counter-card\">\n  <h2>Compteur</h2>\n  <div id=\"countValue\" class=\"counter-value\">0</div>\n  <button id=\"incrementBtn\" class=\"counter-button\">Ajouter +1</button>\n</div>",
    "starterJs": "const countValue = document.getElementById('countValue');\nconst incrementBtn = document.getElementById('incrementBtn');\n\nlet score = 0;\n\nfunction incrementer() {\n  // 1) augmente score\n  // 2) affiche score dans countValue\n}\n\nincrementBtn.addEventListener('click', incrementer);",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.counter-card { max-width: 420px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; text-align: center; display: grid; gap: 12px; }\n.counter-value { font-size: 2.6rem; font-weight: 800; color: #34d399; }\n.counter-button { padding: 10px 16px; border-radius: 999px; border: none; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }",
    "validation": {
      "jsNames": [
        "score",
        "incrementer"
      ],
      "behavior": "counter"
    },
    "reactBridge": "Le compteur annonce useState: une valeur change, puis l affichage suit."
  },
  {
    "id": 9,
    "title": "9. Quiz",
    "track": "JavaScript",
    "mode": "js",
    "description": "Cree un mini quiz interactif.",
    "objective": "Lire une reponse et afficher un feedback.",
    "build": "Un quiz avec score et message.",
    "concepts": [
      "dataset",
      "condition",
      "textContent"
    ],
    "steps": [
      "Declare score a 0.",
      "Cree une fonction checkAnswer().",
      "Lis data-correct pour savoir si c est juste.",
      "Mets a jour #quizFeedback et #quizScore."
    ],
    "checklist": [
      "Variable score",
      "Fonction checkAnswer",
      "Feedback visible",
      "Score mis a jour"
    ],
    "memos": [
      "dataset lit data-* du HTML."
    ],
    "commonErrors": [
      "Oublier de convertir data-correct en booleen."
    ],
    "tips": [
      "Teste avec la bonne et la mauvaise reponse."
    ],
    "glossary": [
      "dataset: donnees sur un element"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas coder un mini quiz. Tu lis une reponse cliquee, tu compares si c est correct, puis tu affiches un message et un score.</p>\n        <p>C est un exercice parfait pour les conditions (condition) et les attributs data-*.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>dataset et conditions</h3>\n        <p>Dans le HTML, chaque bouton a <strong>data-correct</strong>. En JS, tu lis cela avec <strong>dataset</strong>.</p>\n        <p>Attention: dataset renvoie un texte. Il faut comparer a 'true' pour savoir si c est correct.</p>\n        <p>Ensuite, une condition <strong>if/else</strong> choisit le message et met a jour le score.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>let score = 0;\n\nfunction checkAnswer(event) {\n  const isCorrect = event.currentTarget.dataset.correct === 'true';\n  if (isCorrect) {\n    score = score + 1;\n    feedback.textContent = 'Bonne reponse !';\n  } else {\n    feedback.textContent = 'Essaie encore.';\n  }\n  quizScore.textContent = score;\n}</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>dataset renvoie un texte, pas un booleen.</li>\n          <li>Le score se met a jour apres chaque clic.</li>\n          <li>event.currentTarget pointe le bouton clique.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Comparer a true sans guillemets.</li>\n          <li>Oublier de mettre a jour quizScore.</li>\n          <li>Oublier d ajouter le clic sur chaque bouton.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Teste la bonne et la mauvaise reponse.</li>\n          <li>Garde le message court et clair.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "data-correct vaut 'true' ou 'false'.",
        "Ajoute un clic sur chaque bouton .answer.",
        "Mets a jour le score apres une bonne reponse."
      ]
    },
    "guideJs": [
      "Etape 1/4\n    let score = 0\n    Objectif: stocker le score.",
      "Etape 2/4\n    function checkAnswer(event) { ... }\n    Objectif: gerer le clic.",
      "Etape 3/4\n    const isCorrect = event.currentTarget.dataset.correct === 'true'\n    Objectif: lire data-correct.",
      "Etape 4/4\n    quizFeedback.textContent = ...; quizScore.textContent = score\n    Objectif: message + score."
    ],
    "starterHtml": "<div class=\"quiz-card\">\n  <h2 id=\"quizQuestion\">Quel langage structure une page web ?</h2>\n  <div class=\"quiz-answers\">\n    <button class=\"answer\" data-correct=\"true\">HTML</button>\n    <button class=\"answer\" data-correct=\"false\">CSS</button>\n    <button class=\"answer\" data-correct=\"false\">Photoshop</button>\n  </div>\n  <p id=\"quizFeedback\">Choisis une reponse.</p>\n  <p>Score: <span id=\"quizScore\">0</span></p>\n</div>",
    "starterJs": "const answers = document.querySelectorAll('.answer');\nconst feedback = document.getElementById('quizFeedback');\nconst quizScore = document.getElementById('quizScore');\n\nlet score = 0;\n\nfunction checkAnswer(event) {\n  // 1) lire data-correct\n  // 2) mettre a jour feedback\n  // 3) mettre a jour score\n}\n\nanswers.forEach((button) => {\n  button.addEventListener('click', checkAnswer);\n});",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.quiz-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }\n.quiz-answers { display: grid; gap: 8px; }\n.answer { padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #e2e8f0; cursor: pointer; }\n#quizFeedback { color: #a7f3d0; font-weight: 700; }",
    "validation": {
      "jsNames": [
        "score",
        "checkAnswer"
      ],
      "behavior": "quiz"
    },
    "reactBridge": "Le quiz prepare les handlers React: un clic donne une information, puis on met a jour le score."
  },
  {
    "id": 10,
    "title": "10. Todo list",
    "track": "JavaScript",
    "mode": "js",
    "description": "Ajoute des taches a une liste.",
    "objective": "Recuperer un input et ajouter un element HTML.",
    "build": "Une todo list avec ajout de taches.",
    "concepts": [
      "value",
      "createElement",
      "appendChild"
    ],
    "steps": [
      "Cree la fonction addTodo().",
      "Lis #todoInput et verifie qu il n est pas vide.",
      "Cree un li et ajoute le texte.",
      "Ajoute le li dans #todoList."
    ],
    "checklist": [
      "Fonction addTodo",
      "Lecture input",
      "Creation li",
      "Insertion dans la liste"
    ],
    "memos": [
      "trim() retire les espaces inutiles."
    ],
    "commonErrors": [
      "Oublier de vider l input."
    ],
    "tips": [
      "Teste avec plusieurs taches."
    ],
    "glossary": [
      "li: element de liste"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire une todo list. Tu lis ce que l utilisateur tape, tu crees un nouvel element, puis tu l ajoutes a la liste.</p>\n        <p>C est un exercice cle pour comprendre la creation d elements HTML en JavaScript.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Les 3 actions essentielles</h3>\n        <p>1) Lire la valeur de l input avec <strong>value</strong>. 2) Creer un element avec <strong>createElement</strong>. 3) L ajouter avec <strong>appendChild</strong>.</p>\n        <p>Avant d ajouter, utilise <strong>trim()</strong> pour eviter les taches vides.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>function addTodo() {\n  const value = todoInput.value.trim();\n  if (!value) return;\n  const li = document.createElement('li');\n  li.textContent = value;\n  todoList.appendChild(li);\n  todoInput.value = '';\n}</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>trim() evite les taches vides.</li>\n          <li>createElement cree un vrai element HTML.</li>\n          <li>appendChild ajoute l element a la liste.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier de vider l input.</li>\n          <li>Ajouter une tache vide.</li>\n          <li>Oublier d ajouter le li dans la liste.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Teste 3 taches de suite.</li>\n          <li>Ajoute un espace: il doit etre refuse.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Lis todoInput.value puis .trim().",
        "Utilise document.createElement('li').",
        "Ajoute le li dans todoList."
      ]
    },
    "guideJs": [
      "Etape 1/4\n    function addTodo() { }\n    Objectif: fonction d ajout.",
      "Etape 2/4\n    const value = todoInput.value.trim()\n    Objectif: lire l input.",
      "Etape 3/4\n    const li = document.createElement('li'); li.textContent = value\n    Objectif: creer le li.",
      "Etape 4/4\n    todoList.appendChild(li); todoInput.value = ''\n    Objectif: ajouter et vider."
    ],
    "starterHtml": "<div class=\"todo-card\">\n  <h2>Todo list</h2>\n  <div class=\"todo-input\">\n    <input id=\"todoInput\" type=\"text\" placeholder=\"Nouvelle tache\">\n    <button id=\"addTodoBtn\">Ajouter</button>\n  </div>\n  <ul id=\"todoList\"></ul>\n</div>",
    "starterJs": "const todoInput = document.getElementById('todoInput');\nconst addTodoBtn = document.getElementById('addTodoBtn');\nconst todoList = document.getElementById('todoList');\n\nfunction addTodo() {\n  // 1) lire todoInput\n  // 2) creer un li\n  // 3) ajouter le li dans todoList\n}\n\naddTodoBtn.addEventListener('click', addTodo);",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.todo-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }\n.todo-input { display: flex; gap: 8px; }\n.todo-input input { flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #0f172a; color: #e2e8f0; }\n.todo-input button { border: none; border-radius: 10px; background: #34d399; color: #052e25; font-weight: 800; padding: 10px 14px; }\n#todoList { list-style: none; padding: 0; display: grid; gap: 8px; }\n#todoList li { background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 10px; }",
    "validation": {
      "jsNames": [
        "addTodo"
      ],
      "behavior": "todo"
    },
    "reactBridge": "La todo list prepare le rendu de listes React: une valeur saisie devient un nouvel item affiche."
  },
  {
    "id": 11,
    "title": "11. Calculatrice",
    "track": "JavaScript",
    "mode": "js",
    "description": "Cree une mini calculatrice.",
    "objective": "Lire deux nombres et afficher un resultat.",
    "build": "Une calculatrice avec addition, soustraction, multiplication et division.",
    "concepts": [
      "Number()",
      "data-op",
      "conditions"
    ],
    "steps": [
      "Cree une fonction calculate(operation).",
      "Lis #numberA et #numberB.",
      "Calcule selon operation (+, -, *, /).",
      "Affiche le resultat dans #calcResult."
    ],
    "checklist": [
      "Fonction calculate",
      "Lecture des inputs",
      "Resultat affiche"
    ],
    "memos": [
      "Number() convertit un texte en nombre."
    ],
    "commonErrors": [
      "Oublier de convertir en nombre."
    ],
    "tips": [
      "Teste la division par 0."
    ],
    "glossary": [
      "data-op: indique l operation"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas construire une mini calculatrice. Le principe est simple: lire deux nombres, choisir une operation, afficher le resultat.</p>\n        <p>Tu apprends ici la conversion en nombre et l utilisation des data-*.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Number et data-op</h3>\n        <p>Les inputs renvoient du texte. Utilise <strong>Number()</strong> pour obtenir un vrai nombre.</p>\n        <p>Les boutons ont <strong>data-op</strong> pour savoir si on fait +, -, * ou /. Tu lis cela avec <strong>dataset.op</strong>.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>function calculate(operation) {\n  const a = Number(numberA.value);\n  const b = Number(numberB.value);\n  let result = 0;\n  if (operation === '+') result = a + b;\n  if (operation === '-') result = a - b;\n  if (operation === '*') result = a * b;\n  if (operation === '/') result = b === 0 ? 0 : a / b;\n  calcResult.textContent = result;\n}</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>Number() convertit le texte en nombre.</li>\n          <li>dataset.op donne l operation.</li>\n          <li>On affiche dans #calcResult.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier Number() et obtenir une concatenation.</li>\n          <li>Ne pas afficher le resultat.</li>\n          <li>Oublier de gerer la division par 0.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Teste avec 2 et 3, puis 10 et 0.</li>\n          <li>Si rien ne change, verifie les ids.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Utilise Number() pour lire les champs.",
        "data-op te donne l operation cliquee.",
        "Affiche le resultat dans calcResult."
      ]
    },
    "guideJs": [
      "Etape 1/4\n    function calculate(operation) { }\n    Objectif: fonction de calcul.",
      "Etape 2/4\n    const a = Number(numberA.value); const b = Number(numberB.value)\n    Objectif: lire A et B.",
      "Etape 3/4\n    if (operation === '+') result = a + b; ...\n    Objectif: appliquer l operation.",
      "Etape 4/4\n    calcResult.textContent = result\n    Objectif: afficher le resultat."
    ],
    "starterHtml": "<div class=\"calc-card\">\n  <h2>Calculatrice</h2>\n  <div class=\"calc-inputs\">\n    <input id=\"numberA\" type=\"number\" placeholder=\"A\">\n    <input id=\"numberB\" type=\"number\" placeholder=\"B\">\n  </div>\n  <div class=\"calc-actions\">\n    <button data-op=\"+\">+</button>\n    <button data-op=\"-\">-</button>\n    <button data-op=\"*\">*</button>\n    <button data-op=\"/\">/</button>\n  </div>\n  <p>Resultat: <span id=\"calcResult\">0</span></p>\n</div>",
    "starterJs": "const numberA = document.getElementById('numberA');\nconst numberB = document.getElementById('numberB');\nconst calcResult = document.getElementById('calcResult');\nconst buttons = document.querySelectorAll('[data-op]');\n\nfunction calculate(operation) {\n  // 1) lire les valeurs\n  // 2) calculer selon operation\n  // 3) afficher dans calcResult\n}\n\nbuttons.forEach((button) => {\n  button.addEventListener('click', () => calculate(button.dataset.op));\n});",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.calc-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }\n.calc-inputs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }\n.calc-inputs input { padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #0f172a; color: #e2e8f0; }\n.calc-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }\n.calc-actions button { padding: 10px; border-radius: 10px; border: none; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }",
    "validation": {
      "jsNames": [
        "calculate"
      ],
      "behavior": "calculator"
    },
    "reactBridge": "La calculatrice prepare les formulaires controles: lire des valeurs, calculer, afficher un resultat."
  },
  {
    "id": 12,
    "title": "12. Pierre Papier Ciseaux",
    "track": "Projet final",
    "mode": "final",
    "description": "Projet final: combine HTML + JavaScript.",
    "objective": "Creer un jeu complet avec score et reset.",
    "build": "Un jeu Pierre Papier Ciseaux avec choix joueur et bot.",
    "concepts": [
      "Math.random",
      "if/else",
      "mise a jour DOM"
    ],
    "steps": [
      "Cree trois boutons .choice-btn avec data-choice.",
      "Affiche les choix du joueur et du bot.",
      "Calcule le gagnant et mets a jour #resultMessage.",
      "Mets a jour #playerScore et #botScore.",
      "Ajoute un bouton #resetBtn pour repartir."
    ],
    "checklist": [
      "3 boutons .choice-btn",
      "Scores visibles",
      "Message resultat visible",
      "Bouton reset fonctionnel"
    ],
    "memos": [
      "Math.random() aide pour le bot."
    ],
    "commonErrors": [
      "Oublier de mettre data-choice."
    ],
    "tips": [
      "Teste plusieurs choix pour verifier le score."
    ],
    "glossary": [
      "bot: adversaire automatique"
    ],
    "pedagogy": "\n      <h3>Mini-cours</h3>\n      <article class=\"lesson-block\">\n        <h3>Objectif</h3>\n        <p>Tu vas coder un vrai petit jeu: Pierre Papier Ciseaux. Tu combines HTML et JavaScript pour lire un choix, tirer un choix bot, puis mettre a jour un score.</p>\n        <p>C est le resume de tout ce que tu as vu: evenements, conditions, DOM.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Logique du jeu</h3>\n        <p>On stocke les choix dans un tableau (array). Le bot choisit un index au hasard avec <strong>Math.random</strong>.</p>\n        <p>Ensuite on compare les choix avec des <strong>if/else</strong> pour savoir qui gagne. Chaque manche met a jour le message et les scores.</p>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Exemple commente</h3>\n        <pre><code>const choices = ['pierre', 'papier', 'ciseaux'];\nlet playerScore = 0;\nlet botScore = 0;\n\nfunction playRound(playerChoice) {\n  const botChoice = choices[Math.floor(Math.random() * choices.length)];\n  if (playerChoice === botChoice) {\n    resultMessage.textContent = 'Egalite ! Bot: ' + botChoice;\n  } else if (\n    (playerChoice === 'pierre' && botChoice === 'ciseaux') ||\n    (playerChoice === 'papier' && botChoice === 'pierre') ||\n    (playerChoice === 'ciseaux' && botChoice === 'papier')\n  ) {\n    playerScore += 1;\n  } else {\n    botScore += 1;\n  }\n  playerScoreEl.textContent = playerScore;\n  botScoreEl.textContent = botScore;\n}</code></pre>\n      </article>\n      <article class=\"lesson-block memo\">\n        <h3>Memo rapide</h3>\n        <ul>\n          <li>Math.random choisit un index au hasard.</li>\n          <li>Les scores doivent se mettre a jour a chaque manche.</li>\n          <li>reset remet tout a zero.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Erreurs frequentes</h3>\n        <ul>\n          <li>Oublier data-choice sur un bouton.</li>\n          <li>Ne pas mettre a jour le message.</li>\n          <li>Oublier de gerer le reset.</li>\n        </ul>\n      </article>\n      <article class=\"lesson-block\">\n        <h3>Astuces</h3>\n        <ul>\n          <li>Teste les 3 choix pour valider la logique.</li>\n          <li>Si le score ne bouge pas, verifie les ids.</li>\n        </ul>\n      </article>\n    ",
    "lesson": {
      "hints": [
        "Utilise un tableau choices pour le bot.",
        "Compare les choix avec if/else.",
        "N oublie pas de mettre a jour les scores."
      ]
    },
    "guideHtml": [
      "Etape 1/5\n        <section class=\"game-board\">\n        Objectif: conteneur du jeu.",
      "Etape 2/5\n        <button class=\"choice-btn\" data-choice=\"pierre\">Pierre</button>\n        <button class=\"choice-btn\" data-choice=\"papier\">Papier</button>\n        <button class=\"choice-btn\" data-choice=\"ciseaux\">Ciseaux</button>\n        Objectif: boutons de choix.",
      "Etape 3/5\n        <div class=\"score-board\">\n          <p>Joueur: <span id=\"playerScore\">0</span></p>\n          <p>Bot: <span id=\"botScore\">0</span></p>\n        </div>\n        Objectif: scores visibles.",
      "Etape 4/5\n        <p id=\"resultMessage\" class=\"result-message\">Message</p>\n        Objectif: message resultat.",
      "Etape 5/5\n        <button id=\"resetBtn\" class=\"reset-btn\">Reinitialiser</button>\n        Objectif: bouton reset."
    ],
    "guideJs": [
      "Etape 1/5\n      const choiceButtons = document.querySelectorAll('.choice-btn')\n      Objectif: cibler les boutons.",
      "Etape 2/5\n      function playRound(playerChoice) { const botChoice = ... }\n      Objectif: jouer une manche.",
      "Etape 3/5\n      if/else puis resultMessage.textContent = ...\n      Objectif: afficher le resultat.",
      "Etape 4/5\n      playerScoreEl.textContent = playerScore; botScoreEl.textContent = botScore\n      Objectif: mettre a jour les scores.",
      "Etape 5/5\n      resetBtn.addEventListener('click', resetGame)\n      Objectif: reset du jeu."
    ],
    "starterHtml": "<section class=\"game-board\">\n  <!-- Ajoute les boutons de choix ici -->\n  <div class=\"score-board\">\n    <p>Joueur: <span id=\"playerScore\">0</span></p>\n    <p>Bot: <span id=\"botScore\">0</span></p>\n  </div>\n  <p id=\"resultMessage\" class=\"result-message\">Fais un choix pour commencer.</p>\n  <button id=\"resetBtn\" class=\"reset-btn\">Reinitialiser</button>\n</section>",
    "starterJs": "const choices = ['pierre', 'papier', 'ciseaux'];\nlet playerScore = 0;\nlet botScore = 0;\n\nfunction playRound(playerChoice) {\n  // 1) choisir le bot\n  // 2) determiner le gagnant\n  // 3) mettre a jour le message et les scores\n}\n\nfunction resetGame() {\n  // remettre les scores a 0\n}\n",
    "providedCss": "body { font-family: \"Segoe UI\", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }\n.game-board { max-width: 560px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 14px; text-align: center; }\n.choice-btn { padding: 10px 14px; border-radius: 999px; border: none; background: #34d399; color: #052e25; font-weight: 800; cursor: pointer; margin: 4px; }\n.score-board { display: flex; justify-content: center; gap: 24px; font-weight: 700; }\n.result-message { color: #a7f3d0; font-weight: 700; }\n.reset-btn { border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; padding: 8px 14px; background: transparent; color: #e2e8f0; }",
    "validation": {
      "tags": [
        "button"
      ],
      "classes": [
        "game-board",
        "choice-btn",
        "score-board",
        "result-message",
        "reset-btn"
      ],
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
      ],
      "behavior": "rps"
    },
    "reactBridge": "Le jeu final assemble handlers, conditions et etat: exactement les bases utiles avant React."
  }
];

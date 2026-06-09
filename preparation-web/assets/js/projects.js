window.PREPARATION_PROJECTS = [
  {
    id: 1,
    title: "1. Carte de profil",
    track: "HTML",
    mode: "html",
    description: "Construis une carte de profil simple et lisible.",
    objective: "Structurer un petit bloc avec une image, un titre, un texte et une liste.",
    build: "Une carte de profil avec photo, nom, role, bio, competences et un lien.",
    concepts: ["section", "img + alt", "h1", "p", "ul/li", "class"],
    steps: [
      "Cree une section class=\"profile-card\".",
      "Ajoute une image avec class=\"profile-avatar\" et un alt descriptif.",
      "Ajoute un h1 class=\"profile-name\" pour le nom.",
      "Ajoute deux paragraphes: role (profile-role) et bio (profile-bio).",
      "Ajoute une liste ul class=\"profile-skills\" avec 3 li.",
      "Ajoute un lien a class=\"profile-link\" dans un bloc profile-actions."
    ],
    checklist: [
      "Une section .profile-card",
      "Une image .profile-avatar avec alt",
      "Un h1 .profile-name",
      "Un p .profile-role et un p .profile-bio",
      "Une liste ul.profile-skills avec 3 li",
      "Un lien .profile-link"
    ],
    memos: [
      "class relie ton HTML au CSS.",
      "alt decrit l image pour l accessibilite.",
      "Un h1 doit etre unique dans la page."
    ],
    commonErrors: [
      "Oublier une classe exacte (casse).",
      "Mettre le lien hors de la carte.",
      "Oublier alt sur l image."
    ],
    tips: [
      "Garde des textes courts et clairs.",
      "Teste le rendu avec et sans CSS."
    ],
    glossary: [
      "section: regroupe un theme.",
      "class: etiquette CSS sur un element.",
      "alt: texte alternatif d une image."
    ],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire une carte de profil simple. L idee est d apprendre a ranger une information visuelle: une photo, un nom, un role, une bio, des competences et un lien. Quand tu sais organiser ce type de bloc, tu peux creer des profils, des cartes produit ou des sections d equipe.</p>
      </article>
      <article class="lesson-block">
        <h3>Balise, attribut, classe (tag / attribute / class)</h3>
        <p>Une balise (tag) est un mot entre &lt; &gt; qui dit au navigateur ce que tu poses dans la page: &lt;section&gt;, &lt;img&gt;, &lt;p&gt;.</p>
        <p>Un attribut (attribute) ajoute une info a la balise. Par exemple, &lt;img&gt; a besoin de <strong>src</strong> pour l image et de <strong>alt</strong> pour decrire la photo.</p>
        <p>Une classe (class) est une etiquette que tu choisis. Elle relie ton HTML au CSS. Si tu changes la classe, le style ne s applique plus.</p>
      </article>
      <article class="lesson-block">
        <h3>Structure logique de la carte</h3>
        <p>Tout le contenu doit rester dans la section avec <strong>class="profile-card"</strong>. Mets ensuite l image, le titre principal (h1), le role, la bio, la liste de competences, puis le lien. L ordre n est pas magique, mais cette logique rend la carte facile a lire.</p>
        <p>Rappel important: un <strong>h1</strong> doit etre unique dans la page, donc on le reserve au nom du profil.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>&lt;section class="profile-card"&gt;
  &lt;!-- 1) Le conteneur de la carte --&gt;
  &lt;img class="profile-avatar" src="photo.jpg" alt="Portrait de Lea"&gt;
  &lt;!-- 2) L image avec alt descriptif --&gt;
  &lt;h1 class="profile-name"&gt;Lea Martin&lt;/h1&gt;
  &lt;!-- 3) Le titre principal unique --&gt;
  &lt;p class="profile-role"&gt;Etudiante web&lt;/p&gt;
  &lt;!-- 4) Le role --&gt;
  &lt;p class="profile-bio"&gt;Bio courte et claire.&lt;/p&gt;
  &lt;!-- 5) La bio --&gt;
  &lt;ul class="profile-skills"&gt;
    &lt;li&gt;HTML&lt;/li&gt;
    &lt;li&gt;Organisation&lt;/li&gt;
    &lt;li&gt;Curiosite&lt;/li&gt;
  &lt;/ul&gt;
  &lt;!-- 6) La liste de competences --&gt;
  &lt;div class="profile-actions"&gt;
    &lt;a class="profile-link" href="mailto:lea@mail.com"&gt;Me contacter&lt;/a&gt;
  &lt;/div&gt;
  &lt;!-- 7) Le lien dans la carte --&gt;
&lt;/section&gt;</code></pre>
        <p>Lis ce bloc comme une histoire: conteneur, image, titre, infos, liste, action. Si tu respectes cette logique, le CSS fera le reste.</p>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>class relie ton HTML au CSS: si la classe change, le style ne s applique plus.</li>
          <li>alt decrit l image et aide l accessibilite.</li>
          <li>Un h1 doit etre unique dans la page.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier une classe exacte (majuscule ou tiret).</li>
          <li>Mettre le lien en dehors de la carte.</li>
          <li>Oublier l attribut alt sur l image.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Garde des textes courts et clairs.</li>
          <li>Teste le rendu avec et sans CSS pour voir si la structure tient.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Regarde d abord les classes attendues dans la checklist.",
        "L image doit avoir class=\"profile-avatar\".",
        "Le lien doit avoir class=\"profile-link\"."
      ]
    },
        guideHtml: [
      `Etape 1/6
<section class="profile-card">
Objectif: conteneur principal de la carte.`,
      `Etape 2/6
<img class="profile-avatar" alt="Portrait">
Objectif: image avec alt descriptif.`,
      `Etape 3/6
<h1 class="profile-name">Nom</h1>
Objectif: nom du profil (h1 unique).`,
      `Etape 4/6
<p class="profile-role">Role</p>
<p class="profile-bio">Bio</p>
Objectif: role puis bio.`,
      `Etape 5/6
<ul class="profile-skills">
  <li>Competence 1</li>
  <li>Competence 2</li>
  <li>Competence 3</li>
</ul>
Objectif: 3 competences.`,
      `Etape 6/6
<a class="profile-link" href="mailto:...">Contact</a>
Objectif: lien d action dans la carte.`
        ],
    starterHtml: `<section class="profile-card">
  <!-- Ajoute ici l image, le nom, le role et la bio -->
  <ul class="profile-skills">
    <!-- Ajoute 3 competences -->
  </ul>
  <div class="profile-actions">
    <!-- Ajoute le lien -->
  </div>
</section>`,
    starterJs: "",
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #f8fafc; margin: 0; padding: 32px; }
.profile-card { max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 18px; padding: 24px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12); }
.profile-avatar { width: 96px; height: 96px; border-radius: 50%; object-fit: cover; border: 3px solid #34d399; }
.profile-name { margin: 16px 0 4px; font-size: 1.6rem; }
.profile-role { color: #0f766e; font-weight: 600; margin: 0; }
.profile-bio { color: #475569; line-height: 1.6; }
.profile-skills { list-style: none; padding: 0; display: grid; gap: 6px; }
.profile-skills li { background: #f1f5f9; border-radius: 10px; padding: 6px 10px; }
.profile-actions { margin-top: 16px; }
.profile-link { display: inline-block; padding: 10px 16px; border-radius: 999px; background: #34d399; color: #052e25; text-decoration: none; font-weight: 700; }`,
    solutionHtml: `<section class="profile-card">
  <img class="profile-avatar" src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=240&q=80" alt="Portrait de Lea">
  <h1 class="profile-name">Lea Martin</h1>
  <p class="profile-role">Etudiante web</p>
  <p class="profile-bio">J aime creer des interfaces claires et apprendre le JavaScript pas a pas.</p>
  <ul class="profile-skills">
    <li>HTML</li>
    <li>Organisation</li>
    <li>Curiosite</li>
  </ul>
  <div class="profile-actions">
    <a class="profile-link" href="mailto:lea@mail.com">Me contacter</a>
  </div>
</section>`,
    solutionJs: "",
    validation: {
      tags: ["section", "img", "h1", "p", "ul", "li", "a"],
      classes: ["profile-card", "profile-avatar", "profile-name", "profile-role", "profile-bio", "profile-skills", "profile-link"],
      classMap: {
        "profile-card": "section",
        "profile-avatar": "img",
        "profile-name": "h1",
        "profile-role": "p",
        "profile-bio": "p",
        "profile-skills": "ul",
        "profile-link": "a"
      }
    }
  },
  {
    id: 2,
    title: "2. Fiche produit",
    track: "HTML",
    mode: "html",
    description: "Construis une fiche produit claire et attractive.",
    objective: "Structurer une fiche produit avec image, prix et action.",
    build: "Une carte produit avec photo, titre, prix, description, liste et bouton.",
    concepts: ["article", "img", "h2", "p", "ul/li", "button", "class"],
    steps: [
      "Cree un article class=\"product-card\".",
      "Ajoute une image class=\"product-image\".",
      "Ajoute un h2 class=\"product-title\".",
      "Ajoute un p class=\"product-price\".",
      "Ajoute un p class=\"product-description\".",
      "Ajoute une liste ul class=\"product-features\" avec 3 li.",
      "Ajoute un bouton class=\"buy-button\"."
    ],
    checklist: [
      "Article .product-card",
      "Image .product-image",
      "Titre .product-title",
      "Prix .product-price",
      "Description .product-description",
      "Liste ul.product-features avec 3 li",
      "Bouton .buy-button"
    ],
    memos: [
      "Un article represente un bloc autonome.",
      "Le prix doit etre visible et court."
    ],
    commonErrors: [
      "Oublier la classe exacte du bouton.",
      "Mettre le prix dans un h2 au lieu d un p."
    ],
    tips: ["Utilise un texte de bouton tres clair."],
    glossary: ["article: bloc autonome", "button: action cliquable"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire une fiche produit simple. Le but est d apprendre a presenter l info qui compte: image, titre, prix, description, points forts et action.</p>
        <p>Un visiteur doit comprendre en quelques secondes ce qui est vendu et quoi faire ensuite.</p>
      </article>
      <article class="lesson-block">
        <h3>Balises utiles (tag / attribute / class)</h3>
        <p><strong>article</strong> sert de bloc autonome. <strong>img</strong> affiche la photo et a besoin d un <strong>alt</strong> descriptif.</p>
        <p>Le titre va dans <strong>h2</strong>, le prix et la description dans des <strong>p</strong>. Les points forts vont dans <strong>ul</strong> et <strong>li</strong>. L action finale utilise un <strong>button</strong>.</p>
        <p>Les classes (class) relient chaque piece au CSS. Une classe mal ecrite et le style ne s applique plus.</p>
      </article>
      <article class="lesson-block">
        <h3>Structure logique</h3>
        <p>Commence par un <strong>article</strong> avec <strong>class="product-card"</strong>, puis l image. Ensuite un bloc <strong>product-body</strong> avec titre, prix, description, liste et bouton.</p>
        <p>Garde le prix visible et court. Le bouton doit etre le dernier element pour guider l action.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>&lt;article class="product-card"&gt;
  &lt;!-- 1) Le bloc produit --&gt;
  &lt;img class="product-image" src="image.jpg" alt="Sac urbain"&gt;
  &lt;div class="product-body"&gt;
    &lt;h2 class="product-title"&gt;Sac urbain&lt;/h2&gt;
    &lt;p class="product-price"&gt;49,00 EUR&lt;/p&gt;
    &lt;p class="product-description"&gt;Compact et solide.&lt;/p&gt;
    &lt;ul class="product-features"&gt;
      &lt;li&gt;Tissu impermeable&lt;/li&gt;
      &lt;li&gt;Poche 14 pouces&lt;/li&gt;
      &lt;li&gt;Dos renforce&lt;/li&gt;
    &lt;/ul&gt;
    &lt;button class="buy-button"&gt;Ajouter au panier&lt;/button&gt;
  &lt;/div&gt;
&lt;/article&gt;</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>alt decrit l image pour l accessibilite.</li>
          <li>Le prix reste dans un p, pas dans un h2.</li>
          <li>Les classes doivent etre exactes.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier la classe du bouton.</li>
          <li>Mettre le lien ou le bouton hors de la carte.</li>
          <li>Oublier l attribut alt sur l image.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Utilise un prix court et visible.</li>
          <li>Choisis un verbe clair pour le bouton.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Le conteneur principal est un article.",
        "Le prix doit avoir class=\"product-price\".",
        "Le bouton doit avoir class=\"buy-button\"."
      ]
    },
        guideHtml: [
      `Etape 1/7
<article class="product-card">
Objectif: conteneur produit.`,
      `Etape 2/7
<img class="product-image" alt="Produit">
Objectif: photo du produit.`,
      `Etape 3/7
<h2 class="product-title">Titre</h2>
Objectif: titre du produit.`,
      `Etape 4/7
<p class="product-price">49,00 EUR</p>
Objectif: prix visible.`,
      `Etape 5/7
<p class="product-description">Description courte.</p>
Objectif: description courte.`,
      `Etape 6/7
<ul class="product-features">
  <li>Point fort</li>
  <li>Point fort</li>
  <li>Point fort</li>
</ul>
Objectif: points forts.`,
      `Etape 7/7
<button class="buy-button">Ajouter au panier</button>
Objectif: bouton d action.`
    ],
    starterHtml: `<article class="product-card">
  <!-- Ajoute l image du produit -->
  <div class="product-body">
    <!-- Ajoute le titre, le prix, la description, la liste et le bouton -->
  </div>
</article>`,
    starterJs: "",
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.product-card { max-width: 520px; margin: 0 auto; background: #111827; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.35); }
.product-image { width: 100%; height: 220px; object-fit: cover; }
.product-body { padding: 22px; display: grid; gap: 8px; }
.product-title { margin: 0; font-size: 1.4rem; }
.product-price { font-size: 1.1rem; color: #34d399; font-weight: 700; }
.product-description { color: #cbd5f5; line-height: 1.6; }
.product-features { list-style: none; padding: 0; margin: 0; display: grid; gap: 6px; }
.product-features li { background: rgba(255,255,255,0.06); padding: 6px 10px; border-radius: 10px; }
.buy-button { margin-top: 8px; padding: 10px 16px; border: none; border-radius: 999px; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }`,
    solutionHtml: `<article class="product-card">
  <img class="product-image" src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" alt="Sac a dos urbain">
  <div class="product-body">
    <h2 class="product-title">Sac a dos urbain</h2>
    <p class="product-price">49,00 EUR</p>
    <p class="product-description">Un sac compact pour transporter ordinateur, cahiers et accessoires.</p>
    <ul class="product-features">
      <li>Compartiment 14 pouces</li>
      <li>Tissu impermeable</li>
      <li>Poignee renforcee</li>
    </ul>
    <button class="buy-button">Ajouter au panier</button>
  </div>
</article>`,
    solutionJs: "",
    validation: {
      tags: ["article", "img", "h2", "p", "ul", "li", "button"],
      classes: ["product-card", "product-image", "product-title", "product-price", "product-description", "product-features", "buy-button"],
      classMap: {
        "product-card": "article",
        "product-image": "img",
        "product-title": "h2",
        "product-price": "p",
        "product-description": "p",
        "product-features": "ul",
        "buy-button": "button"
      }
    }
  },
  {
    id: 3,
    title: "3. Formulaire",
    track: "HTML",
    mode: "html",
    description: "Apprends a structurer un formulaire complet.",
    objective: "Utiliser form, label, input, textarea, select et button.",
    build: "Un formulaire de contact avec plusieurs types d input.",
    concepts: ["form", "label/for", "input types", "textarea", "select", "required"],
    steps: [
      "Cree un form class=\"contact-form\".",
      "Ajoute une ligne avec label + input text (class form-label/form-input).",
      "Ajoute une ligne avec input email.",
      "Ajoute une ligne avec input password.",
      "Ajoute un select class=\"form-select\".",
      "Ajoute une textarea class=\"form-textarea\".",
      "Ajoute une checkbox et une radio.",
      "Ajoute un bouton class=\"submit-button\"."
    ],
    checklist: [
      "Formulaire .contact-form",
      "Labels avec class .form-label",
      "Inputs avec class .form-input",
      "Textarea .form-textarea",
      "Select .form-select",
      "Checkbox + radio",
      "Bouton .submit-button"
    ],
    memos: [
      "label for doit viser l id de l input.",
      "required rend un champ obligatoire."
    ],
    commonErrors: [
      "Oublier le type email.",
      "Ne pas lier label et input."
    ],
    tips: ["Garde des labels simples et directs."],
    glossary: ["label: nom visible d un champ", "required: champ obligatoire"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire un formulaire de contact. L idee est de comprendre comment un utilisateur saisit des donnees et comment tu ranges ces champs.</p>
        <p>Un formulaire bien structure est lisible et facile a remplir.</p>
      </article>
      <article class="lesson-block">
        <h3>Balises et attributs (tag / attribute)</h3>
        <p><strong>form</strong> est le conteneur. Chaque champ a un <strong>label</strong> et un <strong>input</strong> ou une <strong>textarea</strong>.</p>
        <p>L attribut <strong>for</strong> du label doit viser l <strong>id</strong> du champ. Cela relie le texte au champ.</p>
        <p>Le type (attribute) d un input change son comportement: text, email, password, checkbox, radio.</p>
      </article>
      <article class="lesson-block">
        <h3>Structure logique</h3>
        <p>Le formulaire contient des lignes (.form-row) avec un label puis le champ. Ajoute un select, une textarea, puis les cases a cocher.</p>
        <p>Le bouton submit termine le formulaire. Pense a <strong>required</strong> sur les champs importants.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>&lt;form class="contact-form"&gt;
  &lt;div class="form-row"&gt;
    &lt;label class="form-label" for="email"&gt;Email&lt;/label&gt;
    &lt;input class="form-input" id="email" type="email" required&gt;
  &lt;/div&gt;
  &lt;div class="form-row"&gt;
    &lt;label class="form-label" for="message"&gt;Message&lt;/label&gt;
    &lt;textarea class="form-textarea" id="message"&gt;&lt;/textarea&gt;
  &lt;/div&gt;
  &lt;button class="submit-button" type="submit"&gt;Envoyer&lt;/button&gt;
&lt;/form&gt;</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>for doit viser l id du champ.</li>
          <li>required rend un champ obligatoire.</li>
          <li>type="email" verifie le format.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier de lier label et input.</li>
          <li>Mettre un input sans type.</li>
          <li>Oublier la classe .submit-button.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Garde des labels courts.</li>
          <li>Teste en cliquant sur le label: le champ doit se focus.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Chaque champ doit avoir un label clair.",
        "Ajoute au moins une checkbox et un radio.",
        "Le bouton doit avoir class=\"submit-button\"."
      ]
    },
        guideHtml: [
      `Etape 1/8
<form class="contact-form">
Objectif: conteneur du formulaire.`,
      `Etape 2/8
<label class="form-label" for="fullname">Nom complet</label>
<input class="form-input" id="fullname" type="text">
Objectif: ligne nom.`,
      `Etape 3/8
<label class="form-label" for="email">Email</label>
<input class="form-input" id="email" type="email">
Objectif: ligne email.`,
      `Etape 4/8
<label class="form-label" for="pwd">Mot de passe</label>
<input class="form-input" id="pwd" type="password">
Objectif: ligne mot de passe.`,
      `Etape 5/8
<label class="form-label" for="topic">Sujet</label>
<select class="form-select" id="topic"></select>
Objectif: liste deroulante.`,
      `Etape 6/8
<label class="form-label" for="message">Message</label>
<textarea class="form-textarea" id="message"></textarea>
Objectif: message.`,
      `Etape 7/8
<label class="form-label"><input type="checkbox"> J accepte</label>
<label class="form-label"><input type="radio" name="contact"> Contact par email</label>
Objectif: checkbox et radio.`,
      `Etape 8/8
<button class="submit-button" type="submit">Envoyer</button>
Objectif: bouton Envoyer.`
    ],
    starterHtml: `<form class="contact-form">
  <!-- Ajoute ici tes lignes de formulaire -->
</form>`,
    starterJs: "",
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 32px; }
.contact-form { max-width: 560px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 14px; }
.form-row { display: grid; gap: 6px; }
.form-label { font-weight: 700; color: #a7f3d0; }
.form-input, .form-textarea, .form-select { border-radius: 12px; border: 1px solid rgba(148,163,184,0.3); background: #0f172a; color: #e2e8f0; padding: 10px 12px; }
.form-textarea { min-height: 120px; resize: vertical; }
.form-actions { display: flex; justify-content: flex-end; }
.submit-button { border: none; border-radius: 999px; padding: 10px 18px; background: #34d399; color: #052e25; font-weight: 800; }`,
    solutionHtml: `<form class="contact-form">
  <div class="form-row">
    <label class="form-label" for="fullname">Nom complet</label>
    <input class="form-input" id="fullname" type="text" placeholder="Ton nom" required>
  </div>
  <div class="form-row">
    <label class="form-label" for="email">Email</label>
    <input class="form-input" id="email" type="email" placeholder="nom@mail.com" required>
  </div>
  <div class="form-row">
    <label class="form-label" for="pwd">Mot de passe</label>
    <input class="form-input" id="pwd" type="password" placeholder="********" required>
  </div>
  <div class="form-row">
    <label class="form-label" for="topic">Sujet</label>
    <select class="form-select" id="topic">
      <option>HTML</option>
      <option>JavaScript</option>
    </select>
  </div>
  <div class="form-row">
    <label class="form-label" for="message">Message</label>
    <textarea class="form-textarea" id="message" placeholder="Ecris ici..."></textarea>
  </div>
  <div class="form-row">
    <label class="form-label"><input type="checkbox" required> J accepte les conditions</label>
  </div>
  <div class="form-row">
    <label class="form-label"><input type="radio" name="contact" required> Contact par email</label>
  </div>
  <div class="form-actions">
    <button class="submit-button" type="submit">Envoyer</button>
  </div>
</form>`,
    solutionJs: "",
    validation: {
      tags: ["form", "label", "input", "textarea", "select", "button"],
      classes: ["contact-form", "form-row", "form-label", "form-input", "form-textarea", "form-select", "submit-button"],
      inputTypes: ["text", "email", "password", "checkbox", "radio"],
      classMap: {
        "contact-form": "form",
        "form-label": "label",
        "form-input": "input",
        "form-textarea": "textarea",
        "form-select": "select",
        "submit-button": "button"
      }
    }
  },
  {
    id: 4,
    title: "4. Mini CV",
    track: "HTML",
    mode: "html",
    description: "Organise un mini CV clair et structure.",
    objective: "Structurer un profil avec sections competences et experience.",
    build: "Un CV simple avec entete, sections et lien de contact.",
    concepts: ["header", "section", "h1/h2", "ul/li", "a"],
    steps: [
      "Cree une section class=\"cv-card\".",
      "Ajoute un header class=\"cv-header\" avec h1.cv-name et p.cv-title.",
      "Ajoute une section class=\"cv-section\" pour les competences.",
      "Ajoute une liste ul.skill-list avec au moins 3 competences.",
      "Ajoute une section cv-section pour experience ou formation.",
      "Ajoute un lien class=\"cv-contact\"."
    ],
    checklist: [
      "Section .cv-card",
      "Header .cv-header avec h1.cv-name",
      "Paragraphe .cv-title",
      "Section competences + ul.skill-list",
      "Section experience/formation",
      "Lien .cv-contact"
    ],
    memos: ["Chaque section commence par un h2."],
    commonErrors: ["Oublier la classe .cv-title."],
    tips: ["Utilise des phrases courtes."],
    glossary: ["header: entete du bloc", "section: partie thematique"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire un mini CV. L idee est d organiser tes infos comme une mini page de presentation: nom, titre, competences, experience et contact.</p>
        <p>Un CV clair se lit vite et chaque section a un role.</p>
      </article>
      <article class="lesson-block">
        <h3>Balises utiles (tag / class)</h3>
        <p><strong>header</strong> sert d entete. <strong>section</strong> regroupe un theme. <strong>h1</strong> est reserve au nom, <strong>h2</strong> annonce chaque section.</p>
        <p>La liste de competences va dans <strong>ul</strong> et <strong>li</strong>. Le lien de contact est un <strong>a</strong>.</p>
      </article>
      <article class="lesson-block">
        <h3>Structure logique</h3>
        <p>Dans la section avec <strong>class="cv-card"</strong>, commence par un header avec le nom et le titre. Ensuite une section competences, puis une section experience.</p>
        <p>Termine par un lien de contact clair.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>&lt;section class="cv-card"&gt;
  &lt;header class="cv-header"&gt;
    &lt;h1 class="cv-name"&gt;Sarah Benali&lt;/h1&gt;
    &lt;p class="cv-title"&gt;Etudiante en reseaux&lt;/p&gt;
  &lt;/header&gt;
  &lt;section class="cv-section"&gt;
    &lt;h2&gt;Competences&lt;/h2&gt;
    &lt;ul class="skill-list"&gt;
      &lt;li&gt;HTML&lt;/li&gt;
      &lt;li&gt;Organisation&lt;/li&gt;
      &lt;li&gt;Travail en equipe&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/section&gt;
  &lt;a class="cv-contact" href="mailto:sarah@mail.com"&gt;Me contacter&lt;/a&gt;
&lt;/section&gt;</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>Un h1 doit etre unique dans la page.</li>
          <li>Chaque section commence par un h2.</li>
          <li>Les classes doivent etre exactes.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier la classe .cv-title.</li>
          <li>Mettre la liste hors de .skill-list.</li>
          <li>Oublier le lien de contact.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Garde des phrases courtes.</li>
          <li>Ajoute 3 competences max pour rester lisible.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Le header doit contenir le nom et le titre.",
        "La liste de competences doit etre dans ul.skill-list.",
        "Ajoute un lien de contact a la fin."
      ]
    },
        guideHtml: [
      `Etape 1/6
<section class="cv-card">
Objectif: conteneur du CV.`,
      `Etape 2/6
<header class="cv-header">
  <h1 class="cv-name">Nom</h1>
  <p class="cv-title">Titre</p>
</header>
Objectif: nom + titre.`,
      `Etape 3/6
<section class="cv-section">
  <h2>Competences</h2>
</section>
Objectif: section competences.`,
      `Etape 4/6
<ul class="skill-list">
  <li>Competence</li>
  <li>Competence</li>
  <li>Competence</li>
</ul>
Objectif: liste de competences.`,
      `Etape 5/6
<section class="cv-section">
  <h2>Experience</h2>
  <p>Detail</p>
</section>
Objectif: experience ou formation.`,
      `Etape 6/6
<a class="cv-contact" href="mailto:...">Me contacter</a>
Objectif: lien de contact.`
    ],
    starterHtml: `<section class="cv-card">
  <!-- Ajoute ici ton header, tes sections et ton lien -->
</section>`,
    starterJs: "",
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #f8fafc; margin: 0; padding: 32px; }
.cv-card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 24px; box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12); display: grid; gap: 16px; }
.cv-header { display: grid; gap: 6px; }
.cv-name { margin: 0; font-size: 2rem; }
.cv-title { margin: 0; color: #0f766e; font-weight: 600; }
.cv-section h2 { margin: 0 0 6px; font-size: 1.1rem; }
.skill-list { list-style: none; padding: 0; display: grid; gap: 6px; }
.skill-list li { background: #f1f5f9; padding: 6px 10px; border-radius: 10px; }
.cv-contact { color: #0f766e; font-weight: 700; text-decoration: none; }`,
    solutionHtml: `<section class="cv-card">
  <header class="cv-header">
    <h1 class="cv-name">Sarah Benali</h1>
    <p class="cv-title">Etudiante en reseaux</p>
  </header>
  <section class="cv-section">
    <h2>Competences</h2>
    <ul class="skill-list">
      <li>HTML</li>
      <li>Organisation</li>
      <li>Travail en equipe</li>
    </ul>
  </section>
  <section class="cv-section">
    <h2>Experience</h2>
    <p>Stage support IT - 2025</p>
  </section>
  <a class="cv-contact" href="mailto:sarah@mail.com">Me contacter</a>
</section>`,
    solutionJs: "",
    validation: {
      tags: ["header", "section", "h1", "h2", "p", "ul", "li", "a"],
      classes: ["cv-card", "cv-header", "cv-name", "cv-title", "cv-section", "skill-list", "cv-contact"],
      classMap: {
        "cv-card": "section",
        "cv-header": "header",
        "cv-name": "h1",
        "cv-title": "p",
        "cv-section": "section",
        "skill-list": "ul",
        "cv-contact": "a"
      }
    }
  },
  {
    id: 5,
    title: "5. Mini portfolio",
    track: "HTML",
    mode: "html",
    description: "Projet autonome pour valider la partie HTML.",
    objective: "Creer une page complete avec presentation, projets et contact.",
    build: "Un mini portfolio avec sections claires et classes attendues.",
    concepts: ["main", "section", "article", "ul/li", "a"],
    steps: [
      "Cree un main class=\"portfolio-page\".",
      "Ajoute une section hero-section avec h1 et un paragraphe.",
      "Ajoute une section portfolio-skills avec une liste skill-list.",
      "Ajoute une section class=\"project-grid\" avec au moins 2 article class=\"project-card\".",
      "Ajoute une section contact avec un lien class=\"contact-link\"."
    ],
    checklist: [
      "main .portfolio-page",
      "section .hero-section avec h1 + p",
      "section .portfolio-skills + ul.skill-list",
      "section class=\"project-grid\" avec 2 article class=\"project-card\"",
      "Lien .contact-link"
    ],
    memos: ["Les classes doivent etre exactes."],
    commonErrors: ["Oublier une classe sur une section."],
    tips: ["Ajoute des titres courts pour chaque projet."],
    glossary: ["portfolio: page qui montre tes projets"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire une page portfolio complete. L idee est de regrouper presentation, competences, projets et contact dans un seul ensemble.</p>
        <p>Tu apprends a creer une page simple mais structuree, comme un mini site.</p>
      </article>
      <article class="lesson-block">
        <h3>Balises utiles (tag / class)</h3>
        <p><strong>main</strong> est le conteneur principal. Chaque partie est une <strong>section</strong>.</p>
        <p>Les projets sont des <strong>article</strong> car ce sont des blocs autonomes. Un <strong>h1</strong> pour le nom, des <strong>h2</strong> pour les sections.</p>
      </article>
      <article class="lesson-block">
        <h3>Structure logique</h3>
        <p>Dans le <strong>main</strong> avec <strong>class="portfolio-page"</strong>, ajoute une section hero, une section competences, une section projets, puis une section contact.</p>
        <p>Dans la grille projets, mets au moins deux <strong>article</strong> avec <strong>class="project-card"</strong>.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>&lt;main class="portfolio-page"&gt;
  &lt;section class="hero-section"&gt;
    &lt;h1 class="portfolio-title"&gt;Nora Dupont&lt;/h1&gt;
    &lt;p class="portfolio-tagline"&gt;Je cree des pages claires.&lt;/p&gt;
  &lt;/section&gt;
  &lt;section class="project-grid"&gt;
    &lt;article class="project-card"&gt;
      &lt;h3&gt;Carte profil&lt;/h3&gt;
      &lt;p&gt;Une carte simple.&lt;/p&gt;
    &lt;/article&gt;
  &lt;/section&gt;
  &lt;section class="contact-section"&gt;
    &lt;a class="contact-link" href="mailto:nora@mail.com"&gt;Ecrire un message&lt;/a&gt;
  &lt;/section&gt;
&lt;/main&gt;</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>main doit etre unique dans la page.</li>
          <li>Les cartes projets sont des article.</li>
          <li>Les classes doivent etre exactes.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier la section contact.</li>
          <li>Mettre une div a la place de article.</li>
          <li>Oublier une classe attendue.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Donne des titres courts aux projets.</li>
          <li>Garde 2 ou 3 phrases max par section.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Commence par le main .portfolio-page.",
        "La grille de projets doit utiliser .project-grid et .project-card.",
        "Le lien final doit etre .contact-link."
      ]
    },
        guideHtml: [
      `Etape 1/5
<main class="portfolio-page">
Objectif: conteneur principal.`,
      `Etape 2/5
<section class="hero-section">
  <h1 class="portfolio-title">Nom</h1>
  <p class="portfolio-tagline">Phrase courte.</p>
</section>
Objectif: presentation.`,
      `Etape 3/5
<section class="portfolio-skills">
  <ul class="skill-list">
    <li>Skill</li>
    <li>Skill</li>
    <li>Skill</li>
  </ul>
</section>
Objectif: competences.`,
      `Etape 4/5
<section class="project-grid">
  <article class="project-card">Projet 1</article>
  <article class="project-card">Projet 2</article>
</section>
Objectif: 2 projets minimum.`,
      `Etape 5/5
<section class="contact-section">
  <a class="contact-link" href="mailto:...">Contact</a>
</section>
Objectif: lien de contact.`
    ],
    starterHtml: `<main class="portfolio-page">
  <!-- Ajoute ici les sections hero, competences, projets et contact -->
</main>`,
    starterJs: "",
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.portfolio-page { max-width: 900px; margin: 0 auto; display: grid; gap: 18px; }
.hero-section, .portfolio-skills, .project-grid, .contact-section { background: #111827; padding: 20px; border-radius: 18px; }
.hero-section h1 { margin: 0 0 6px; }
.portfolio-tagline { color: #cbd5f5; }
.skill-list { list-style: none; padding: 0; display: flex; gap: 8px; flex-wrap: wrap; }
.skill-list li { background: rgba(52,211,153,0.15); padding: 6px 10px; border-radius: 999px; }
.project-grid { display: grid; gap: 12px; }
.project-card { background: rgba(255,255,255,0.05); padding: 14px; border-radius: 14px; }
.contact-link { display: inline-block; padding: 10px 14px; border-radius: 999px; background: #34d399; color: #052e25; text-decoration: none; font-weight: 800; }`,
    solutionHtml: `<main class="portfolio-page">
  <section class="hero-section">
    <h1 class="portfolio-title">Nora Dupont</h1>
    <p class="portfolio-tagline">Je cree des pages claires et modernes pour debuter sur le web.</p>
  </section>
  <section class="portfolio-skills">
    <h2>Competences</h2>
    <ul class="skill-list">
      <li>HTML</li>
      <li>Organisation</li>
      <li>Creativite</li>
    </ul>
  </section>
  <section class="project-grid">
    <article class="project-card">
      <h3>Carte profil</h3>
      <p>Une carte simple avec photo et bio.</p>
    </article>
    <article class="project-card">
      <h3>Fiche produit</h3>
      <p>Une mise en page avec image, prix et bouton.</p>
    </article>
  </section>
  <section class="contact-section">
    <h2>Contact</h2>
    <a class="contact-link" href="mailto:nora@mail.com">Ecrire un message</a>
  </section>
</main>`,
    solutionJs: "",
    validation: {
      tags: ["main", "section", "h1", "h2", "article", "p", "ul", "li", "a"],
      classes: ["portfolio-page", "hero-section", "portfolio-title", "portfolio-tagline", "portfolio-skills", "skill-list", "project-grid", "project-card", "contact-link"],
      classMap: {
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
    }
  },
  {
    id: 6,
    title: "6. Compteur",
    track: "JavaScript",
    mode: "js",
    description: "Fais un compteur qui augmente au clic.",
    objective: "Comprendre variable, fonction et event click.",
    build: "Un compteur qui passe de 0 a 1, 2, 3...",
    concepts: ["let", "function", "addEventListener", "textContent"],
    steps: [
      "Declare une variable score a 0.",
      "Cree une fonction incrementer() qui ajoute 1.",
      "Met a jour #countValue avec score.",
      "Ajoute un clic sur #incrementBtn."
    ],
    checklist: [
      "Variable score",
      "Fonction incrementer()",
      "Affichage dans #countValue",
      "Clic sur #incrementBtn"
    ],
    memos: ["textContent change le texte visible."],
    commonErrors: ["Oublier de convertir en nombre."],
    tips: ["Teste en cliquant plusieurs fois."],
    glossary: ["event: action de l utilisateur"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas coder un compteur qui augmente au clic. C est le meilleur exercice pour comprendre variable (variable), fonction (function) et evenement (event).</p>
        <p>Le principe: une valeur en memoire, puis tu mets a jour le texte affiche.</p>
      </article>
      <article class="lesson-block">
        <h3>Les bases JS a connaitre</h3>
        <p>Une variable stocke une valeur: <strong>let score = 0</strong>. Une fonction regroupe des actions: <strong>function incrementer()</strong>.</p>
        <p>Un evenement (event) se declenche au clic. <strong>addEventListener</strong> relie le bouton a ta fonction.</p>
        <p>Pour afficher un nombre, on change <strong>textContent</strong> de l element HTML.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>const countValue = document.getElementById('countValue');
const incrementBtn = document.getElementById('incrementBtn');

let score = 0;

function incrementer() {
  score = score + 1;
  countValue.textContent = score;
}

incrementBtn.addEventListener('click', incrementer);</code></pre>
        <p>Lis le code dans l ordre: on cible les elements, on prepare la variable, on cree la fonction, puis on branche le clic.</p>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>textContent change le texte visible.</li>
          <li>score doit rester un nombre.</li>
          <li>Le clic doit appeler incrementer().</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier de mettre a jour countValue.</li>
          <li>Mettre score entre guillemets (ce n est plus un nombre).</li>
          <li>Oublier l addEventListener.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Teste en cliquant 5 fois pour verifier.</li>
          <li>Ajoute un console.log(score) si besoin.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "score doit commencer a 0.",
        "incrementer() ajoute 1 puis affiche.",
        "Le clic doit appeler incrementer()."
      ]
    },
        guideJs: [
      `Etape 1/4
    let score = 0
    Objectif: variable du compteur.`,
      `Etape 2/4
    function incrementer() { score = score + 1; }
    Objectif: augmente le score.`,
      `Etape 3/4
    countValue.textContent = score
    Objectif: affiche le score.`,
      `Etape 4/4
    incrementBtn.addEventListener('click', incrementer)
    Objectif: declenche au clic.`
        ],
    starterHtml: `<div class="counter-card">
  <h2>Compteur</h2>
  <div id="countValue" class="counter-value">0</div>
  <button id="incrementBtn" class="counter-button">Ajouter +1</button>
</div>`,
    starterJs: `const countValue = document.getElementById('countValue');
const incrementBtn = document.getElementById('incrementBtn');

let score = 0;

function incrementer() {
  // 1) augmente score
  // 2) affiche score dans countValue
}

incrementBtn.addEventListener('click', incrementer);`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.counter-card { max-width: 420px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; text-align: center; display: grid; gap: 12px; }
.counter-value { font-size: 2.6rem; font-weight: 800; color: #34d399; }
.counter-button { padding: 10px 16px; border-radius: 999px; border: none; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }`,
    solutionHtml: `<div class="counter-card">
  <h2>Compteur</h2>
  <div id="countValue" class="counter-value">0</div>
  <button id="incrementBtn" class="counter-button">Ajouter +1</button>
</div>`,
    solutionJs: `const countValue = document.getElementById('countValue');
const incrementBtn = document.getElementById('incrementBtn');

let score = 0;

function incrementer() {
  score = score + 1;
  countValue.textContent = score;
}

incrementBtn.addEventListener('click', incrementer);`,
    validation: {
      jsNames: ["score", "incrementer"],
      behavior: "counter"
    }
  },
  {
    id: 7,
    title: "7. Quiz",
    track: "JavaScript",
    mode: "js",
    description: "Cree un mini quiz interactif.",
    objective: "Lire une reponse et afficher un feedback.",
    build: "Un quiz avec score et message.",
    concepts: ["dataset", "condition", "textContent"],
    steps: [
      "Declare score a 0.",
      "Cree une fonction checkAnswer().",
      "Lis data-correct pour savoir si c est juste.",
      "Mets a jour #quizFeedback et #quizScore."
    ],
    checklist: ["Variable score", "Fonction checkAnswer", "Feedback visible", "Score mis a jour"],
    memos: ["dataset lit data-* du HTML."],
    commonErrors: ["Oublier de convertir data-correct en booleen."],
    tips: ["Teste avec la bonne et la mauvaise reponse."],
    glossary: ["dataset: donnees sur un element"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas coder un mini quiz. Tu lis une reponse cliquee, tu compares si c est correct, puis tu affiches un message et un score.</p>
        <p>C est un exercice parfait pour les conditions (condition) et les attributs data-*.</p>
      </article>
      <article class="lesson-block">
        <h3>dataset et conditions</h3>
        <p>Dans le HTML, chaque bouton a <strong>data-correct</strong>. En JS, tu lis cela avec <strong>dataset</strong>.</p>
        <p>Attention: dataset renvoie un texte. Il faut comparer a 'true' pour savoir si c est correct.</p>
        <p>Ensuite, une condition <strong>if/else</strong> choisit le message et met a jour le score.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>let score = 0;

function checkAnswer(event) {
  const isCorrect = event.currentTarget.dataset.correct === 'true';
  if (isCorrect) {
    score = score + 1;
    feedback.textContent = 'Bonne reponse !';
  } else {
    feedback.textContent = 'Essaie encore.';
  }
  quizScore.textContent = score;
}</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>dataset renvoie un texte, pas un booleen.</li>
          <li>Le score se met a jour apres chaque clic.</li>
          <li>event.currentTarget pointe le bouton clique.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Comparer a true sans guillemets.</li>
          <li>Oublier de mettre a jour quizScore.</li>
          <li>Oublier d ajouter le clic sur chaque bouton.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Teste la bonne et la mauvaise reponse.</li>
          <li>Garde le message court et clair.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "data-correct vaut 'true' ou 'false'.",
        "Ajoute un clic sur chaque bouton .answer.",
        "Mets a jour le score apres une bonne reponse."
      ]
    },
        guideJs: [
      `Etape 1/4
    let score = 0
    Objectif: stocker le score.`,
      `Etape 2/4
    function checkAnswer(event) { ... }
    Objectif: gerer le clic.`,
      `Etape 3/4
    const isCorrect = event.currentTarget.dataset.correct === 'true'
    Objectif: lire data-correct.`,
      `Etape 4/4
    quizFeedback.textContent = ...; quizScore.textContent = score
    Objectif: message + score.`
        ],
    starterHtml: `<div class="quiz-card">
  <h2 id="quizQuestion">Quel langage structure une page web ?</h2>
  <div class="quiz-answers">
    <button class="answer" data-correct="true">HTML</button>
    <button class="answer" data-correct="false">CSS</button>
    <button class="answer" data-correct="false">Photoshop</button>
  </div>
  <p id="quizFeedback">Choisis une reponse.</p>
  <p>Score: <span id="quizScore">0</span></p>
</div>`,
    starterJs: `const answers = document.querySelectorAll('.answer');
const feedback = document.getElementById('quizFeedback');
const quizScore = document.getElementById('quizScore');

let score = 0;

function checkAnswer(event) {
  // 1) lire data-correct
  // 2) mettre a jour feedback
  // 3) mettre a jour score
}

answers.forEach((button) => {
  button.addEventListener('click', checkAnswer);
});`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.quiz-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }
.quiz-answers { display: grid; gap: 8px; }
.answer { padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #e2e8f0; cursor: pointer; }
#quizFeedback { color: #a7f3d0; font-weight: 700; }`,
    solutionHtml: `<div class="quiz-card">
  <h2 id="quizQuestion">Quel langage structure une page web ?</h2>
  <div class="quiz-answers">
    <button class="answer" data-correct="true">HTML</button>
    <button class="answer" data-correct="false">CSS</button>
    <button class="answer" data-correct="false">Photoshop</button>
  </div>
  <p id="quizFeedback">Choisis une reponse.</p>
  <p>Score: <span id="quizScore">0</span></p>
</div>`,
    solutionJs: `const answers = document.querySelectorAll('.answer');
const feedback = document.getElementById('quizFeedback');
const quizScore = document.getElementById('quizScore');

let score = 0;

function checkAnswer(event) {
  const isCorrect = event.currentTarget.dataset.correct === 'true';
  if (isCorrect) {
    score = score + 1;
    feedback.textContent = 'Bonne reponse !';
  } else {
    feedback.textContent = 'Essaie encore.';
  }
  quizScore.textContent = score;
}

answers.forEach((button) => {
  button.addEventListener('click', checkAnswer);
});`,
    validation: {
      jsNames: ["score", "checkAnswer"],
      behavior: "quiz"
    }
  },
  {
    id: 8,
    title: "8. Todo list",
    track: "JavaScript",
    mode: "js",
    description: "Ajoute des taches a une liste.",
    objective: "Recuperer un input et ajouter un element HTML.",
    build: "Une todo list avec ajout de taches.",
    concepts: ["value", "createElement", "appendChild"],
    steps: [
      "Cree la fonction addTodo().",
      "Lis #todoInput et verifie qu il n est pas vide.",
      "Cree un li et ajoute le texte.",
      "Ajoute le li dans #todoList."
    ],
    checklist: ["Fonction addTodo", "Lecture input", "Creation li", "Insertion dans la liste"],
    memos: ["trim() retire les espaces inutiles."],
    commonErrors: ["Oublier de vider l input."],
    tips: ["Teste avec plusieurs taches."],
    glossary: ["li: element de liste"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire une todo list. Tu lis ce que l utilisateur tape, tu crees un nouvel element, puis tu l ajoutes a la liste.</p>
        <p>C est un exercice cle pour comprendre la creation d elements HTML en JavaScript.</p>
      </article>
      <article class="lesson-block">
        <h3>Les 3 actions essentielles</h3>
        <p>1) Lire la valeur de l input avec <strong>value</strong>. 2) Creer un element avec <strong>createElement</strong>. 3) L ajouter avec <strong>appendChild</strong>.</p>
        <p>Avant d ajouter, utilise <strong>trim()</strong> pour eviter les taches vides.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>function addTodo() {
  const value = todoInput.value.trim();
  if (!value) return;
  const li = document.createElement('li');
  li.textContent = value;
  todoList.appendChild(li);
  todoInput.value = '';
}</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>trim() evite les taches vides.</li>
          <li>createElement cree un vrai element HTML.</li>
          <li>appendChild ajoute l element a la liste.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier de vider l input.</li>
          <li>Ajouter une tache vide.</li>
          <li>Oublier d ajouter le li dans la liste.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Teste 3 taches de suite.</li>
          <li>Ajoute un espace: il doit etre refuse.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Lis todoInput.value puis .trim().",
        "Utilise document.createElement('li').",
        "Ajoute le li dans todoList."
      ]
    },
        guideJs: [
      `Etape 1/4
    function addTodo() { }
    Objectif: fonction d ajout.`,
      `Etape 2/4
    const value = todoInput.value.trim()
    Objectif: lire l input.`,
      `Etape 3/4
    const li = document.createElement('li'); li.textContent = value
    Objectif: creer le li.`,
      `Etape 4/4
    todoList.appendChild(li); todoInput.value = ''
    Objectif: ajouter et vider.`
        ],
    starterHtml: `<div class="todo-card">
  <h2>Todo list</h2>
  <div class="todo-input">
    <input id="todoInput" type="text" placeholder="Nouvelle tache">
    <button id="addTodoBtn">Ajouter</button>
  </div>
  <ul id="todoList"></ul>
</div>`,
    starterJs: `const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
  // 1) lire todoInput
  // 2) creer un li
  // 3) ajouter le li dans todoList
}

addTodoBtn.addEventListener('click', addTodo);`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.todo-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }
.todo-input { display: flex; gap: 8px; }
.todo-input input { flex: 1; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #0f172a; color: #e2e8f0; }
.todo-input button { border: none; border-radius: 10px; background: #34d399; color: #052e25; font-weight: 800; padding: 10px 14px; }
#todoList { list-style: none; padding: 0; display: grid; gap: 8px; }
#todoList li { background: rgba(255,255,255,0.06); padding: 8px 12px; border-radius: 10px; }`,
    solutionHtml: `<div class="todo-card">
  <h2>Todo list</h2>
  <div class="todo-input">
    <input id="todoInput" type="text" placeholder="Nouvelle tache">
    <button id="addTodoBtn">Ajouter</button>
  </div>
  <ul id="todoList"></ul>
</div>`,
    solutionJs: `const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

function addTodo() {
  const value = todoInput.value.trim();
  if (!value) return;
  const li = document.createElement('li');
  li.textContent = value;
  todoList.appendChild(li);
  todoInput.value = '';
}

addTodoBtn.addEventListener('click', addTodo);`,
    validation: {
      jsNames: ["addTodo"],
      behavior: "todo"
    }
  },
  {
    id: 9,
    title: "9. Calculatrice",
    track: "JavaScript",
    mode: "js",
    description: "Cree une mini calculatrice.",
    objective: "Lire deux nombres et afficher un resultat.",
    build: "Une calculatrice avec addition, soustraction, multiplication et division.",
    concepts: ["Number()", "data-op", "conditions"],
    steps: [
      "Cree une fonction calculate(operation).",
      "Lis #numberA et #numberB.",
      "Calcule selon operation (+, -, *, /).",
      "Affiche le resultat dans #calcResult."
    ],
    checklist: ["Fonction calculate", "Lecture des inputs", "Resultat affiche"],
    memos: ["Number() convertit un texte en nombre."],
    commonErrors: ["Oublier de convertir en nombre."],
    tips: ["Teste la division par 0."],
    glossary: ["data-op: indique l operation"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas construire une mini calculatrice. Le principe est simple: lire deux nombres, choisir une operation, afficher le resultat.</p>
        <p>Tu apprends ici la conversion en nombre et l utilisation des data-*.</p>
      </article>
      <article class="lesson-block">
        <h3>Number et data-op</h3>
        <p>Les inputs renvoient du texte. Utilise <strong>Number()</strong> pour obtenir un vrai nombre.</p>
        <p>Les boutons ont <strong>data-op</strong> pour savoir si on fait +, -, * ou /. Tu lis cela avec <strong>dataset.op</strong>.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>function calculate(operation) {
  const a = Number(numberA.value);
  const b = Number(numberB.value);
  let result = 0;
  if (operation === '+') result = a + b;
  if (operation === '-') result = a - b;
  if (operation === '*') result = a * b;
  if (operation === '/') result = b === 0 ? 0 : a / b;
  calcResult.textContent = result;
}</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>Number() convertit le texte en nombre.</li>
          <li>dataset.op donne l operation.</li>
          <li>On affiche dans #calcResult.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier Number() et obtenir une concatenation.</li>
          <li>Ne pas afficher le resultat.</li>
          <li>Oublier de gerer la division par 0.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Teste avec 2 et 3, puis 10 et 0.</li>
          <li>Si rien ne change, verifie les ids.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Utilise Number() pour lire les champs.",
        "data-op te donne l operation cliquee.",
        "Affiche le resultat dans calcResult."
      ]
    },
        guideJs: [
      `Etape 1/4
    function calculate(operation) { }
    Objectif: fonction de calcul.`,
      `Etape 2/4
    const a = Number(numberA.value); const b = Number(numberB.value)
    Objectif: lire A et B.`,
      `Etape 3/4
    if (operation === '+') result = a + b; ...
    Objectif: appliquer l operation.`,
      `Etape 4/4
    calcResult.textContent = result
    Objectif: afficher le resultat.`
        ],
    starterHtml: `<div class="calc-card">
  <h2>Calculatrice</h2>
  <div class="calc-inputs">
    <input id="numberA" type="number" placeholder="A">
    <input id="numberB" type="number" placeholder="B">
  </div>
  <div class="calc-actions">
    <button data-op="+">+</button>
    <button data-op="-">-</button>
    <button data-op="*">*</button>
    <button data-op="/">/</button>
  </div>
  <p>Resultat: <span id="calcResult">0</span></p>
</div>`,
    starterJs: `const numberA = document.getElementById('numberA');
const numberB = document.getElementById('numberB');
const calcResult = document.getElementById('calcResult');
const buttons = document.querySelectorAll('[data-op]');

function calculate(operation) {
  // 1) lire les valeurs
  // 2) calculer selon operation
  // 3) afficher dans calcResult
}

buttons.forEach((button) => {
  button.addEventListener('click', () => calculate(button.dataset.op));
});`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.calc-card { max-width: 520px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 12px; }
.calc-inputs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
.calc-inputs input { padding: 10px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: #0f172a; color: #e2e8f0; }
.calc-actions { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.calc-actions button { padding: 10px; border-radius: 10px; border: none; background: #22d3ee; color: #052e25; font-weight: 800; cursor: pointer; }`,
    solutionHtml: `<div class="calc-card">
  <h2>Calculatrice</h2>
  <div class="calc-inputs">
    <input id="numberA" type="number" placeholder="A">
    <input id="numberB" type="number" placeholder="B">
  </div>
  <div class="calc-actions">
    <button data-op="+">+</button>
    <button data-op="-">-</button>
    <button data-op="*">*</button>
    <button data-op="/">/</button>
  </div>
  <p>Resultat: <span id="calcResult">0</span></p>
</div>`,
    solutionJs: `const numberA = document.getElementById('numberA');
const numberB = document.getElementById('numberB');
const calcResult = document.getElementById('calcResult');
const buttons = document.querySelectorAll('[data-op]');

function calculate(operation) {
  const a = Number(numberA.value);
  const b = Number(numberB.value);
  let result = 0;
  if (operation === '+') result = a + b;
  if (operation === '-') result = a - b;
  if (operation === '*') result = a * b;
  if (operation === '/') result = b === 0 ? 0 : a / b;
  calcResult.textContent = result;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => calculate(button.dataset.op));
});`,
    validation: {
      jsNames: ["calculate"],
      behavior: "calculator"
    }
  },
  {
    id: 10,
    title: "10. Pierre Papier Ciseaux",
    track: "Projet final",
    mode: "final",
    description: "Projet final: combine HTML + JavaScript.",
    objective: "Creer un jeu complet avec score et reset.",
    build: "Un jeu Pierre Papier Ciseaux avec choix joueur et bot.",
    concepts: ["Math.random", "if/else", "mise a jour DOM"],
    steps: [
      "Cree trois boutons .choice-btn avec data-choice.",
      "Affiche les choix du joueur et du bot.",
      "Calcule le gagnant et mets a jour #resultMessage.",
      "Mets a jour #playerScore et #botScore.",
      "Ajoute un bouton #resetBtn pour repartir."
    ],
    checklist: [
      "3 boutons .choice-btn",
      "Scores visibles",
      "Message resultat visible",
      "Bouton reset fonctionnel"
    ],
    memos: ["Math.random() aide pour le bot."],
    commonErrors: ["Oublier de mettre data-choice."],
    tips: ["Teste plusieurs choix pour verifier le score."],
    glossary: ["bot: adversaire automatique"],
    pedagogy: `
      <h3>Mini-cours</h3>
      <article class="lesson-block">
        <h3>Objectif</h3>
        <p>Tu vas coder un vrai petit jeu: Pierre Papier Ciseaux. Tu combines HTML et JavaScript pour lire un choix, tirer un choix bot, puis mettre a jour un score.</p>
        <p>C est le resume de tout ce que tu as vu: evenements, conditions, DOM.</p>
      </article>
      <article class="lesson-block">
        <h3>Logique du jeu</h3>
        <p>On stocke les choix dans un tableau (array). Le bot choisit un index au hasard avec <strong>Math.random</strong>.</p>
        <p>Ensuite on compare les choix avec des <strong>if/else</strong> pour savoir qui gagne. Chaque manche met a jour le message et les scores.</p>
      </article>
      <article class="lesson-block">
        <h3>Exemple commente</h3>
        <pre><code>const choices = ['pierre', 'papier', 'ciseaux'];
let playerScore = 0;
let botScore = 0;

function playRound(playerChoice) {
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  if (playerChoice === botChoice) {
    resultMessage.textContent = 'Egalite ! Bot: ' + botChoice;
  } else if (
    (playerChoice === 'pierre' && botChoice === 'ciseaux') ||
    (playerChoice === 'papier' && botChoice === 'pierre') ||
    (playerChoice === 'ciseaux' && botChoice === 'papier')
  ) {
    playerScore += 1;
  } else {
    botScore += 1;
  }
  playerScoreEl.textContent = playerScore;
  botScoreEl.textContent = botScore;
}</code></pre>
      </article>
      <article class="lesson-block memo">
        <h3>Memo rapide</h3>
        <ul>
          <li>Math.random choisit un index au hasard.</li>
          <li>Les scores doivent se mettre a jour a chaque manche.</li>
          <li>reset remet tout a zero.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Erreurs frequentes</h3>
        <ul>
          <li>Oublier data-choice sur un bouton.</li>
          <li>Ne pas mettre a jour le message.</li>
          <li>Oublier de gerer le reset.</li>
        </ul>
      </article>
      <article class="lesson-block">
        <h3>Astuces</h3>
        <ul>
          <li>Teste les 3 choix pour valider la logique.</li>
          <li>Si le score ne bouge pas, verifie les ids.</li>
        </ul>
      </article>
    `,
    lesson: {
      hints: [
        "Utilise un tableau choices pour le bot.",
        "Compare les choix avec if/else.",
        "N oublie pas de mettre a jour les scores."
      ]
    },
            guideHtml: [
          `Etape 1/5
        <section class="game-board">
        Objectif: conteneur du jeu.`,
          `Etape 2/5
        <button class="choice-btn" data-choice="pierre">Pierre</button>
        <button class="choice-btn" data-choice="papier">Papier</button>
        <button class="choice-btn" data-choice="ciseaux">Ciseaux</button>
        Objectif: boutons de choix.`,
          `Etape 3/5
        <div class="score-board">
          <p>Joueur: <span id="playerScore">0</span></p>
          <p>Bot: <span id="botScore">0</span></p>
        </div>
        Objectif: scores visibles.`,
          `Etape 4/5
        <p id="resultMessage" class="result-message">Message</p>
        Objectif: message resultat.`,
          `Etape 5/5
        <button id="resetBtn" class="reset-btn">Reinitialiser</button>
        Objectif: bouton reset.`
            ],
          guideJs: [
        `Etape 1/5
      const choiceButtons = document.querySelectorAll('.choice-btn')
      Objectif: cibler les boutons.`,
        `Etape 2/5
      function playRound(playerChoice) { const botChoice = ... }
      Objectif: jouer une manche.`,
        `Etape 3/5
      if/else puis resultMessage.textContent = ...
      Objectif: afficher le resultat.`,
        `Etape 4/5
      playerScoreEl.textContent = playerScore; botScoreEl.textContent = botScore
      Objectif: mettre a jour les scores.`,
        `Etape 5/5
      resetBtn.addEventListener('click', resetGame)
      Objectif: reset du jeu.`
          ],
    starterHtml: `<section class="game-board">
  <!-- Ajoute les boutons de choix ici -->
  <div class="score-board">
    <p>Joueur: <span id="playerScore">0</span></p>
    <p>Bot: <span id="botScore">0</span></p>
  </div>
  <p id="resultMessage" class="result-message">Fais un choix pour commencer.</p>
  <button id="resetBtn" class="reset-btn">Reinitialiser</button>
</section>`,
    starterJs: `const choices = ['pierre', 'papier', 'ciseaux'];
let playerScore = 0;
let botScore = 0;

function playRound(playerChoice) {
  // 1) choisir le bot
  // 2) determiner le gagnant
  // 3) mettre a jour le message et les scores
}

function resetGame() {
  // remettre les scores a 0
}
`,
    providedCss: `body { font-family: "Segoe UI", sans-serif; background: #0f172a; margin: 0; padding: 32px; color: #e2e8f0; }
.game-board { max-width: 560px; margin: 0 auto; background: #111827; padding: 24px; border-radius: 20px; display: grid; gap: 14px; text-align: center; }
.choice-btn { padding: 10px 14px; border-radius: 999px; border: none; background: #34d399; color: #052e25; font-weight: 800; cursor: pointer; margin: 4px; }
.score-board { display: flex; justify-content: center; gap: 24px; font-weight: 700; }
.result-message { color: #a7f3d0; font-weight: 700; }
.reset-btn { border: 1px solid rgba(255,255,255,0.2); border-radius: 999px; padding: 8px 14px; background: transparent; color: #e2e8f0; }`,
    solutionHtml: `<section class="game-board">
  <div>
    <button class="choice-btn" data-choice="pierre">Pierre</button>
    <button class="choice-btn" data-choice="papier">Papier</button>
    <button class="choice-btn" data-choice="ciseaux">Ciseaux</button>
  </div>
  <div class="score-board">
    <p>Joueur: <span id="playerScore">0</span></p>
    <p>Bot: <span id="botScore">0</span></p>
  </div>
  <p id="resultMessage" class="result-message">Fais un choix pour commencer.</p>
  <button id="resetBtn" class="reset-btn">Reinitialiser</button>
</section>`,
    solutionJs: `const choices = ['pierre', 'papier', 'ciseaux'];
const choiceButtons = document.querySelectorAll('.choice-btn');
const resultMessage = document.getElementById('resultMessage');
const playerScoreEl = document.getElementById('playerScore');
const botScoreEl = document.getElementById('botScore');
const resetBtn = document.getElementById('resetBtn');

let playerScore = 0;
let botScore = 0;

function playRound(playerChoice) {
  const botChoice = choices[Math.floor(Math.random() * choices.length)];
  if (playerChoice === botChoice) {
    resultMessage.textContent = 'Egalite ! Bot: ' + botChoice;
  } else if (
    (playerChoice === 'pierre' && botChoice === 'ciseaux') ||
    (playerChoice === 'papier' && botChoice === 'pierre') ||
    (playerChoice === 'ciseaux' && botChoice === 'papier')
  ) {
    playerScore += 1;
    resultMessage.textContent = 'Gagne ! Bot: ' + botChoice;
  } else {
    botScore += 1;
    resultMessage.textContent = 'Perdu ! Bot: ' + botChoice;
  }
  playerScoreEl.textContent = playerScore;
  botScoreEl.textContent = botScore;
}

function resetGame() {
  playerScore = 0;
  botScore = 0;
  playerScoreEl.textContent = '0';
  botScoreEl.textContent = '0';
  resultMessage.textContent = 'Fais un choix pour commencer.';
}

choiceButtons.forEach((button) => {
  button.addEventListener('click', () => playRound(button.dataset.choice));
});
resetBtn.addEventListener('click', resetGame);`,
    validation: {
      tags: ["button"],
      classes: ["game-board", "choice-btn", "score-board", "result-message", "reset-btn"],
      dataAttrs: ["choice"],
      jsNames: ["choices", "playRound", "resetGame"],
      minElements: [
        { selector: ".choice-btn", count: 3, message: "Le jeu doit contenir trois boutons .choice-btn: pierre, papier et ciseaux." }
      ],
      behavior: "rps"
    }
  }
];

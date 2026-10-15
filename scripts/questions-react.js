/**
 * 100 QCM pour le cours React
 */
module.exports = [
  // Chapitre 1: Penser en composants (1 à 13)
  {
    id: 1,
    ch: 1,
    q: "Qu'est-ce que React ?",
    o: [
      "Une bibliothèque JavaScript pour construire des interfaces utilisateur interactives.",
      "Un framework CSS concurrent de Bootstrap ou TailwindCSS.",
      "Un serveur de base de données relationnelles optimisé pour le web.",
      "Un compilateur transformant le langage Python en JavaScript."
    ],
    a: 0,
    e: "React est une bibliothèque JavaScript déclarative et basée sur des composants, développée par Meta."
  },
  {
    id: 2,
    ch: 1,
    q: "Que signifie le concept d'interface utilisateur 'déclarative' en React ?",
    o: [
      "Décrire le résultat visuel attendu pour un état donné, et laisser React synchroniser efficacement le DOM.",
      "Écrire des requêtes SQL directement dans le code HTML pour déclarer les tables.",
      "Déclarer toutes les variables CSS au début du fichier principal index.css.",
      "Envoyer une déclaration officielle de mise en service à l'hébergeur cloud."
    ],
    a: 0,
    e: "En React, on ne manipule pas le DOM manuellement (mode impératif). On déclare l'état visuel et React gère la mise à jour."
  },
  {
    id: 3,
    ch: 1,
    q: "Dans le modèle mental de React, comment imagine-t-on une page web ?",
    o: [
      "Comme un assemblage de briques (composants) autonomes et réutilisables.",
      "Comme un long fichier de code HTML statique sans aucune interactivité.",
      "Comme une suite d'appels de fonctions impératives manipulant document.getElementById.",
      "Comme une base de données contenant uniquement des balises de style."
    ],
    a: 0,
    e: "React structure l'interface sous forme d'un arbre de composants imbriqués les uns dans les autres."
  },
  {
    id: 4,
    ch: 1,
    q: "Quelle bibliothèque permet de monter et de rendre les composants React dans le DOM du navigateur ?",
    o: [
      "react-dom",
      "react-router",
      "react-bootstrap",
      "react-redux"
    ],
    a: 0,
    e: "react-dom fournit les méthodes spécifiques au navigateur, notamment createRoot pour monter l'application."
  },
  {
    id: 5,
    ch: 1,
    q: "Pourquoi React utilise-t-il un DOM virtuel (Virtual DOM) ?",
    o: [
      "Pour calculer en mémoire les différences de rendu et ne mettre à jour le DOM réel qu'aux endroits nécessaires, améliorant les performances.",
      "Pour masquer l'interface graphique du site aux yeux des utilisateurs non connectés.",
      "Pour faire fonctionner le site internet même en cas d'absence de connexion internet.",
      "Pour remplacer la base de données PostgreSQL par un stockage virtuel."
    ],
    a: 0,
    e: "La mise à jour du DOM réel est coûteuse. React calcule les différences (diffing) en mémoire pour minimiser les opérations réelles."
  },
  {
    id: 6,
    ch: 1,
    q: "Quel outil moderne le cours recommande-t-il pour initialiser et servir rapidement un projet React propre ?",
    o: [
      "Vite",
      "Create React App (obsolète)",
      "Webpack brut",
      "Gulp / Grunt"
    ],
    a: 0,
    e: "Vite est rapide, léger, propose un serveur de développement à rechargement à chaud (HMR) et est le standard recommandé."
  },
  {
    id: 7,
    ch: 1,
    q: "Quelle version minimale de Node.js est requise pour créer un projet React moderne avec Vite ?",
    o: [
      "Node.js 18 ou plus",
      "Node.js 8",
      "Toutes les versions de Node.js fonctionnent",
      "Node.js n'est pas nécessaire pour React"
    ],
    a: 0,
    e: "Vite et l'écosystème React moderne nécessitent des fonctionnalités de Node.js 18+ pour le build et l'exploitation locale."
  },
  {
    id: 8,
    ch: 1,
    q: "Quelle commande lance le serveur de développement local dans un projet initialisé avec Vite ?",
    o: [
      "npm run dev",
      "npm start",
      "node run app.js",
      "vite compile"
    ],
    a: 0,
    e: "Dans le package.json généré par Vite, le script 'dev' démarre le serveur de développement (généralement sur http://localhost:5173)."
  },
  {
    id: 9,
    ch: 1,
    q: "Qu'est-ce que l'architecture Single Page Application (SPA) adoptée par React ?",
    o: [
      "Une application où le serveur n'envoie qu'une seule page HTML, puis React prend le relais pour charger dynamiquement le contenu sans recharger la page.",
      "Un site internet qui ne possède qu'une seule section et aucun menu de navigation.",
      "Une page web optimisée exclusivement pour être affichée sur un écran de smartphone.",
      "Un site internet hébergé sur un serveur n'ayant qu'une seule adresse IP physique."
    ],
    a: 0,
    e: "Les SPAs offrent une expérience fluide similaire à une application de bureau en évitant les rechargements de page complets à chaque clic."
  },
  {
    id: 10,
    ch: 1,
    q: "Dans un projet React, qu'est-ce qu'un composant ?",
    o: [
      "Une fonction JavaScript qui commence par une majuscule et retourne du JSX.",
      "Un fichier CSS contenant uniquement les variables de couleurs.",
      "Une table relationnelle configurée au sein d'une base SQL.",
      "Un script shell utilisé pour cloner des dépôts Git."
    ],
    a: 0,
    e: "Un composant React est une brique de code réutilisable. La majuscule indique à React qu'il s'agit d'un composant et non d'une balise HTML standard."
  },
  {
    id: 11,
    ch: 1,
    q: "Pourquoi est-il déconseillé de manipuler directement le DOM avec 'document.querySelector' en React ?",
    o: [
      "Parce que cela court-circuite le cycle de rendu de React et peut provoquer des états d'affichage incohérents.",
      "Parce que React lève immédiatement une exception et arrête la compilation.",
      "Parce que le navigateur internet bloque ces appels pour des raisons de sécurité.",
      "Parce que cela consomme trop de bande passante réseau."
    ],
    a: 0,
    e: "React doit être la seule source de vérité pour le DOM. Modifier le DOM manuellement perturbe ses calculs de comparaison."
  },
  {
    id: 12,
    ch: 1,
    q: "Comment React sait-il qu'il doit rafraîchir une partie de l'interface graphique ?",
    o: [
      "Lorsque l'état (state) d'un composant ou ses propriétés (props) sont modifiés.",
      "Toutes les secondes de manière cyclique via un timer interne du navigateur.",
      "Uniquement lorsque l'utilisateur recharge manuellement la page dans son navigateur.",
      "Lorsque le serveur de base de données envoie un signal réseau d'interruption."
    ],
    a: 0,
    e: "La modification des données réactives (state/props) déclenche automatiquement le re-rendu de la branche de composants concernée."
  },
  {
    id: 13,
    ch: 1,
    q: "Que désigne le terme 'HMR' (Hot Module Replacement) fourni par le serveur de dev de Vite ?",
    o: [
      "La mise à jour instantanée du module modifié à l'écran sans perdre l'état actuel de l'application.",
      "Le remplacement physique des disques durs du serveur de production sans coupure.",
      "Le chiffrement à chaud des paquets réseau envoyés en transit.",
      "La réinitialisation complète de la base de données locale à chaque changement."
    ],
    a: 0,
    e: "Le HMR améliore le confort de développement en appliquant les changements de code en direct dans le navigateur sans rafraîchir toute la page."
  },

  // Chapitre 2: Vite et JSX (14 à 26)
  {
    id: 14,
    ch: 2,
    q: "Dans un projet Vite, quel fichier contient la balise '<div id=\"root\"></div>' qui accueille l'application ?",
    o: [
      "index.html (à la racine)",
      "src/main.jsx",
      "src/App.jsx",
      "vite.config.js"
    ],
    a: 0,
    e: "Vite place l'index.html à la racine du projet, qui sert de point d'entrée pour charger le script main.jsx."
  },
  {
    id: 15,
    ch: 2,
    q: "À quoi sert le fichier 'src/main.jsx' dans la structure standard de Vite ?",
    o: [
      "Il importe React et monte le composant racine (App) dans l'élément HTML 'root'.",
      "Il définit la configuration de build et de compilation pour la production.",
      "Il sert de feuille de style globale contenant toutes les règles CSS.",
      "Il contient la logique d'authentification et de cookies."
    ],
    a: 0,
    e: "main.jsx initialise le point de greffe (root) de l'arbre React à l'aide de react-dom/client."
  },
  {
    id: 16,
    ch: 2,
    q: "Qu'est-ce que JSX ?",
    o: [
      "Une extension de syntaxe JavaScript ressemblant à HTML qui permet de décrire l'interface graphique au sein du code JS.",
      "Un langage de programmation compilé concurrent de Java.",
      "Un framework de routage pour les applications monopages.",
      "Un format d'image compressé conçu pour les interfaces mobiles."
    ],
    a: 0,
    e: "JSX (JavaScript XML) permet de structurer l'affichage de manière intuitive tout en conservant toute la puissance de calcul du JS."
  },
  {
    id: 17,
    ch: 2,
    q: "Dans JSX, comment insère-t-on une expression ou une variable JavaScript ?",
    o: [
      "En l'entourant d'accolades simples : { expression }",
      "En l'écrivant entre doubles chevrons : << expression >>",
      "En la plaçant dans des balises de script : <script>expression</script>",
      "En la préfixant par un symbole de dollar : $expression"
    ],
    a: 0,
    e: "Les accolades indiquent au compilateur JSX d'évaluer le contenu comme du code JavaScript standard."
  },
  {
    id: 18,
    ch: 2,
    q: "Quelle règle de structure majeure doit respecter le retour JSX d'un composant ?",
    o: [
      "Il doit retourner un seul élément racine parent (ou un fragment vide).",
      "Il doit obligatoirement commencer par une balise de titre <h1>.",
      "Il ne doit pas contenir plus de trois niveaux de balises imbriquées.",
      "Il doit inclure au moins une balise de script JavaScript."
    ],
    a: 0,
    e: "Une fonction JavaScript ne peut retourner qu'une seule valeur. En JSX, cela se traduit par un unique élément parent englobant."
  },
  {
    id: 19,
    ch: 2,
    q: "Qu'est-ce qu'un Fragment React (<></>) ?",
    o: [
      "Une balise invisible qui regroupe plusieurs éléments JSX sans ajouter de balise div inutile dans le DOM réel.",
      "Un composant cassé qui a provoqué une erreur de compilation.",
      "Une directive CSS pour fractionner les grilles d'affichage.",
      "Une clé de chiffrement pour sécuriser les données locales."
    ],
    a: 0,
    e: "Le fragment vide `<></>` (ou `<React.Fragment></React.Fragment>`) évite de surcharger la hiérarchie HTML avec des conteneurs inutiles."
  },
  {
    id: 20,
    ch: 2,
    q: "Quel attribut JSX remplace l'attribut HTML classique 'class' pour appliquer des classes CSS ?",
    o: [
      "className",
      "class",
      "styleClass",
      "cssName"
    ],
    a: 0,
    e: "Puisque 'class' est un mot clé réservé en JavaScript, React utilise 'className' pour éviter les conflits de syntaxe."
  },
  {
    id: 21,
    ch: 2,
    q: "Comment écrit-on une balise auto-fermante sans enfant (comme img ou input) en JSX ?",
    o: [
      "Elle doit obligatoirement être fermée par un slash final : <img />",
      "Elle s'écrit comme en HTML classique sans fermeture obligatoire : <img>",
      "Elle doit être entourée de balises de commentaires : <!-- <img> -->",
      "Elle n'est pas autorisée en JSX et doit être remplacée par une div."
    ],
    a: 0,
    e: "JSX étant basé sur XML, toutes les balises doivent être explicitement fermées, y compris les balises auto-fermantes."
  },
  {
    id: 22,
    ch: 2,
    q: "Comment passe-t-on des styles CSS en ligne (inline styles) dans du JSX ?",
    o: [
      "Sous la forme d'un objet JavaScript : style={{ color: 'red', fontSize: '14px' }}",
      "Sous forme de chaîne de caractères comme en HTML : style=\"color: red; font-size: 14px\"",
      "En important un fichier CSS externe dans la même ligne",
      "React n'autorise pas les styles en ligne pour des raisons de performance"
    ],
    a: 0,
    e: "On utilise une double accolade : la première pour évaluer du JS, la seconde pour déclarer l'objet contenant les propriétés en camelCase."
  },
  {
    id: 23,
    ch: 2,
    q: "Dans JSX, comment écrit-on un commentaire ?",
    o: [
      "{/* Commentaire */}",
      "<!-- Commentaire -->",
      "// Commentaire",
      "/* Commentaire */"
    ],
    a: 0,
    e: "Pour commenter en JSX, on doit insérer une expression JavaScript contenant un commentaire de bloc standard."
  },
  {
    id: 24,
    ch: 2,
    q: "Quel attribut JSX remplace l'attribut HTML 'for' utilisé dans les balises label ?",
    o: [
      "htmlFor",
      "for",
      "labelFor",
      "inputId"
    ],
    a: 0,
    e: "'for' étant un mot clé JS (boucle), React utilise 'htmlFor' pour lier un label à son input."
  },
  {
    id: 25,
    ch: 2,
    q: "Qu'est-ce que l'évaluation de court-circuit (short-circuit evaluation) en JSX ?",
    o: [
      "Utiliser l'opérateur logical AND (&&) pour afficher conditionnellement un élément si la condition est vraie.",
      "Le fait de compiler le projet en ignorant les avertissements lints.",
      "Une technique réseau pour couper les requêtes trop lentes.",
      "Un outil de test pour mesurer le temps de réponse des fonctions."
    ],
    a: 0,
    e: "La syntaxe `{condition && <Composant />}` n'affiche le composant que si la condition est évaluée à vrai."
  },
  {
    id: 26,
    ch: 2,
    q: "Que se passe-t-il si une expression JSX retourne 'null', 'undefined' ou 'false' ?",
    o: [
      "React n'affiche absolument rien à l'écran pour cette expression.",
      "React lève une erreur critique indiquant un problème de rendu.",
      "React affiche le texte 'null' ou 'false' sous forme de chaîne brute.",
      "La compilation s'arrête et le serveur local redémarre."
    ],
    a: 0,
    e: "Les valeurs booléennes, null et undefined sont des valeurs de rendu ignorées (vides) par React."
  },

  // Chapitre 3: Composants et props (27 à 39)
  {
    id: 27,
    ch: 3,
    q: "Quelle règle de casse doit respecter le nom d'un composant personnalisé ?",
    o: [
      "Il doit obligatoirement commencer par une lettre majuscule (PascalCase).",
      "Il doit être écrit entièrement en majuscules (UPPERCASE).",
      "Il doit commencer par une minuscule (camelCase).",
      "Son nom doit contenir un tiret ou un caractère de soulignement."
    ],
    a: 0,
    e: "React utilise la première lettre : une minuscule indique une balise HTML standard (ex: <div>), une majuscule cible un composant."
  },
  {
    id: 28,
    ch: 3,
    q: "Que sont les 'props' en React ?",
    o: [
      "Des paramètres de configuration transmis par un composant parent à un composant enfant.",
      "Des fonctions internes servant uniquement à modifier le state local.",
      "Des variables de style CSS partagées par tous les fichiers.",
      "Les rapports d'erreurs générés par le serveur d'intégration."
    ],
    a: 0,
    e: "Les props (propriétés) permettent de personnaliser l'affichage et le comportement d'un composant enfant depuis son parent."
  },
  {
    id: 29,
    ch: 3,
    q: "Comment caractérise-t-on la mutabilité des 'props' au sein du composant enfant qui les reçoit ?",
    o: [
      "Elles sont en lecture seule (immutables) ; l'enfant ne doit jamais tenter de les modifier directement.",
      "Elles sont modifiables librement à l'aide de variables globales.",
      "L'enfant peut les modifier mais uniquement si la page est rechargée.",
      "Elles sont synchronisées bidirectionnellement par défaut."
    ],
    a: 0,
    e: "Le flux de données de React est unidirectionnel. Un enfant ne doit pas modifier ses props ; il doit notifier le parent s'il veut un changement."
  },
  {
    id: 30,
    ch: 3,
    q: "Quelle syntaxe JavaScript moderne permet de lire proprement les props à l'entrée d'un composant ?",
    o: [
      "La destructuration d'objet : function Carte({ titre, description })",
      "La concaténation de chaînes de caractères",
      "L'affectation par référence globale : window.props",
      "L'utilisation obligatoire de classes ES6"
    ],
    a: 0,
    e: "La destructuration permet d'extraire directement les clés de l'objet props sous forme de variables utilisables dans le composant."
  },
  {
    id: 31,
    ch: 3,
    q: "Que représente la propriété spéciale 'props.children' ?",
    o: [
      "Les éléments JSX placés entre la balise d'ouverture et de fermeture du composant lors de son appel.",
      "La liste des composants enfants déclarés au sein du même dossier.",
      "Un tableau contenant uniquement les variables d'état du parent.",
      "La référence vers le composant qui a rendu le composant actuel."
    ],
    a: 0,
    e: "`children` permet de créer des composants d'affichage enveloppants (layouts, cartes, modales) qui englobent du contenu libre."
  },
  {
    id: 32,
    ch: 3,
    q: "Comment appelle-t-on le fait de passer des props sur plusieurs niveaux de composants intermédiaires inutiles ?",
    o: [
      "Le Prop Drilling (perçage de props)",
      "La récursion de composants",
      "La composition de services",
      "Le levage d'état (state hoisting)"
    ],
    a: 0,
    e: "Le Prop Drilling est un anti-pattern qui alourdit le code. Il peut être évité par la composition de composants ou le Contexte."
  },
  {
    id: 33,
    ch: 3,
    q: "Pourquoi est-il recommandé de diviser son code en petits composants courts ?",
    o: [
      "Pour faciliter la réutilisation, la lisibilité, la maintenance et l'écriture des tests unitaires.",
      "Pour accélérer la compilation en production sur le serveur de build.",
      "Pour s'assurer que le projet contient le plus grand nombre de fichiers possible.",
      "React interdit l'écriture de fichiers de plus de 100 lignes."
    ],
    a: 0,
    e: "Un composant ciblé (principe de responsabilité unique) est plus simple à concevoir, à comprendre et à tester."
  },
  {
    id: 34,
    ch: 3,
    q: "Comment passe-t-on une prop de type booléen à 'true' en JSX de manière concise ?",
    o: [
      "En écrivant simplement son nom : <Composant disponible />",
      "En l'assignant avec des guillemets : <Composant disponible=\"true\" />",
      "En utilisant une expression JavaScript : <Composant disponible={true} />",
      "Les booléens doivent obligatoirement être passés sous forme de chaînes de caractères."
    ],
    a: 0,
    e: "Écrire le nom de la prop sans valeur équivaut à lui affecter implicitement la valeur booléenne `true`."
  },
  {
    id: 35,
    ch: 3,
    q: "Peut-on passer des fonctions JavaScript en tant que props à un composant enfant ?",
    o: [
      "Oui, c'est la méthode standard pour permettre à un enfant de communiquer un événement vers son parent.",
      "Non, les props ne peuvent contenir que des types de données primitifs (nombres, chaînes).",
      "Oui, mais uniquement si la fonction est déclarée globalement sur l'objet window.",
      "Non, les fonctions ne peuvent circuler que via des variables d'état locales."
    ],
    a: 0,
    e: "Passer des fonctions de rappel (callbacks) permet de lier des événements enfants à des traitements définis chez le parent."
  },
  {
    id: 36,
    ch: 3,
    q: "Comment définir une valeur par défaut pour une prop en JavaScript moderne ?",
    o: [
      "En utilisant les paramètres par défaut d'ES6 : function Composant({ prop = 'défaut' })",
      "En modifiant directement la prop au début de la fonction",
      "En utilisant l'objet global configuration",
      "Il est impossible de définir des valeurs par défaut pour les props"
    ],
    a: 0,
    e: "Les valeurs par défaut d'ES6 s'appliquent si la clé destructurée est absente ou vaut undefined lors de l'appel."
  },
  {
    id: 37,
    ch: 3,
    q: "Que se passe-t-il si un parent se re-rend (render) ?",
    o: [
      "Tous ses composants enfants se re-rendent également par défaut.",
      "Seuls les composants enfants ayant des variables d'état se re-rendent.",
      "Rien, le cycle de rendu des enfants est totalement déconnecté du parent.",
      "L'application se bloque et attend une action de l'utilisateur."
    ],
    a: 0,
    e: "React descend la hiérarchie pour recalculer l'affichage. (Note: on peut optimiser cela avec React.memo si nécessaire)."
  },
  {
    id: 38,
    ch: 3,
    q: "Peut-on passer un composant JSX complet en tant que prop à un autre composant ?",
    o: [
      "Oui, les props acceptent n'importe quelle expression JavaScript valide, y compris des éléments JSX.",
      "Non, JSX n'autorise le passage de balises qu'à travers props.children.",
      "Oui, mais uniquement s'il s'agit de balises HTML brutes et non de composants React.",
      "Non, le typage des props interdit formellement de transmettre du JSX."
    ],
    a: 0,
    e: "Le JSX étant traduit en objets JS en arrière-plan, il peut être stocké dans des variables et transmis en prop."
  },
  {
    id: 39,
    ch: 3,
    q: "Pourquoi dit-on que le flux de données de React est unidirectionnel ?",
    o: [
      "Parce que les données descendent toujours des parents vers les enfants via les props.",
      "Parce que les données remontent toujours des enfants vers les parents de manière automatique.",
      "Parce que les modifications de style s'appliquent du bas de l'écran vers le haut.",
      "Parce que le routeur réseau n'autorise que les requêtes dans un seul sens."
    ],
    a: 0,
    e: "Le flux unidirectionnel (top-down) rend le code plus prévisible et facilite le débogage en isolant la provenance des états."
  },

  // Chapitre 4: State, evenements et formulaires (40 à 52)
  {
    id: 40,
    ch: 4,
    q: "Qu'est-ce que le 'state' (état local) en React ?",
    o: [
      "Une donnée réactive et interne à un composant qui, lorsqu'elle change, déclenche un re-rendu de l'interface graphique.",
      "Une variable globale stockée dans la base de données PostgreSQL de l'éditeur.",
      "L'indice de performance réseau mesuré en continu par le serveur.",
      "Une feuille de style CSS modifiée à la volée par le navigateur."
    ],
    a: 0,
    e: "Le state permet de mémoriser les changements interactifs d'un composant (panier, compteurs, formulaires, filtres)."
  },
  {
    id: 41,
    ch: 4,
    q: "Quel Hook React permet de déclarer une variable d'état local ?",
    o: [
      "useState",
      "useEffect",
      "useContext",
      "useRef"
    ],
    a: 0,
    e: "useState est le hook de base pour instancier un état réactif au sein d'un composant fonctionnel."
  },
  {
    id: 42,
    ch: 4,
    q: "Que retourne l'appel de la fonction 'useState(valeurInitiale)' ?",
    o: [
      "Un tableau contenant la valeur actuelle de l'état et une fonction pour la mettre à jour.",
      "L'objet DOM réel correspondant à l'élément de l'interface.",
      "La clé unique de session chiffrée de l'utilisateur connecté.",
      "Une fonction qui recharge immédiatement le navigateur internet."
    ],
    a: 0,
    e: "useState retourne un tuple `[state, setter]` que l'on extrait généralement par destructuration."
  },
  {
    id: 43,
    ch: 4,
    q: "Peut-on modifier directement la variable d'état (ex: 'compte = compte + 1') ?",
    o: [
      "Non, il faut obligatoirement utiliser la fonction de mise à jour (setter) fournie pour notifier React du changement.",
      "Oui, c'est la méthode standard recommandée pour les compteurs.",
      "Oui, mais uniquement à l'intérieur d'une fonction fléchée.",
      "Non, le compilateur lève une erreur de syntaxe et refuse de démarrer."
    ],
    a: 0,
    e: "Modifier la variable directement ne déclenche pas le cycle de re-rendu. React ignore alors le changement visuel."
  },
  {
    id: 44,
    ch: 4,
    q: "Quand doit-on utiliser la mise à jour fonctionnelle du state (ex: 'setCompte(prev => prev + 1)') ?",
    o: [
      "Lorsque le nouvel état dépend de la valeur de l'état précédent, pour éviter les bugs liés à l'asynchronisme.",
      "Uniquement lorsque le composant reçoit des props depuis un parent asynchrone.",
      "Lorsque l'on veut réinitialiser le state à sa valeur par défaut.",
      "C'est une syntaxe obsolète remplacée par les classes ES6."
    ],
    a: 0,
    e: "Le setter de useState étant asynchrone, la forme fonctionnelle garantit d'utiliser la valeur la plus fraîche de l'état."
  },
  {
    id: 45,
    ch: 4,
    q: "Qu'est-ce qu'un formulaire ou un input 'contrôlé' en React ?",
    o: [
      "Un champ dont la valeur affichée est liée à une variable d'état et mise à jour via l'événement onChange.",
      "Un formulaire vérifié par un script de sécurité sur le serveur de production.",
      "Un input qui refuse la saisie de caractères spéciaux grâce à un masque.",
      "Un composant de saisie de mot de passe à double facteur obligatoire."
    ],
    a: 0,
    e: "L'input contrôlé fait de React la seule source de vérité pour la valeur du champ de saisie."
  },
  {
    id: 46,
    ch: 4,
    q: "Dans un gestionnaire d'événement de formulaire, à quoi sert 'e.preventDefault()' ?",
    o: [
      "À empêcher le navigateur de recharger entièrement la page lors de la soumission du formulaire.",
      "À supprimer les cookies d'authentification par mesure de sécurité.",
      "À effacer automatiquement le contenu de tous les champs de saisie.",
      "À bloquer l'envoi de la requête réseau vers la base SQL."
    ],
    a: 0,
    e: "Par défaut, un formulaire HTML recharge la page lors du submit. En SPA, on intercepte l'événement pour traiter la saisie en JS."
  },
  {
    id: 47,
    ch: 4,
    q: "Comment associe-t-on un écouteur de clic à un bouton en JSX ?",
    o: [
      "onClick={maFonction}",
      "onclick=\"maFonction()\"",
      "click={maFonction()}",
      "onPress={maFonction}"
    ],
    a: 0,
    e: "En React, les événements s'écrivent en camelCase (onClick) et reçoivent une référence de fonction, pas une chaîne."
  },
  {
    id: 48,
    ch: 4,
    q: "Que se passe-t-il si on écrit 'onClick={maFonction()}' (avec des parenthèses) lors de l'écouteur d'événement ?",
    o: [
      "La fonction s'exécute immédiatement lors du rendu du composant et non lors du clic sur le bouton.",
      "Le bouton fonctionne correctement et appelle la fonction lors du clic.",
      "React lève immédiatement une erreur de syntaxe empêchant le build.",
      "La fonction est mise en file d'attente pour le prochain montage."
    ],
    a: 0,
    e: "Ajouter des parenthèses invoque la fonction en direct. Il faut passer la référence de la fonction : `onClick={maFonction}`."
  },
  {
    id: 49,
    ch: 4,
    q: "Où doit-on déclarer les Hooks (comme useState) au sein d'un composant ?",
    o: [
      "Uniquement au niveau supérieur (top level) de la fonction du composant, en dehors de toute boucle, condition ou fonction imbriquée.",
      "Au tout début du fichier JS avant la déclaration de la fonction.",
      "N'importe où, y compris à l'intérieur de blocs if ou de boucles for.",
      "Dans un fichier de configuration séparé nommé hooks.config.js."
    ],
    a: 0,
    e: "React s'appuie sur l'ordre d'appel des hooks lors des rendus successifs pour associer l'état correct. Cet ordre doit rester stable."
  },
  {
    id: 50,
    ch: 4,
    q: "Comment regroupe-t-on plusieurs champs de formulaires liés au sein d'un seul state ?",
    o: [
      "En utilisant un objet dans le state et en mettant à jour les clés avec le spread operator : setForm(prev => ({ ...prev, [nom]: valeur }))",
      "En créant 50 variables useState différentes au sein du composant.",
      "En utilisant une variable globale window pour stocker l'intégralité du formulaire.",
      "React interdit d'utiliser des objets complexes au sein de useState."
    ],
    a: 0,
    e: "Le spread operator `...prev` conserve les autres champs de l'objet tout en remplaçant la clé modifiée."
  },
  {
    id: 51,
    ch: 4,
    q: "Que se passe-t-il si on omet l'écouteur 'onChange' sur un input possédant une prop 'value={monState}' ?",
    o: [
      "Le champ de saisie devient en lecture seule et l'utilisateur ne peut plus rien y écrire.",
      "Le champ fonctionne normalement mais génère un avertissement dans la console.",
      "React lève une exception et arrête immédiatement le serveur local.",
      "L'input se vide automatiquement à chaque fois que l'utilisateur appuie sur une touche."
    ],
    a: 0,
    e: "Puisque la valeur affichée est verrouillée sur le state et que le state ne change jamais sans onChange, le champ reste figé."
  },
  {
    id: 52,
    ch: 4,
    q: "Peut-on utiliser le state pour stocker des tableaux ou des objets ?",
    o: [
      "Oui, mais il faut créer une nouvelle référence (copie) de l'objet ou du tableau lors de la modification pour déclencher le rendu.",
      "Non, le state ne peut stocker que des nombres, des chaînes et des booléens.",
      "Oui, et on peut modifier le tableau en utilisant des méthodes mutables comme push ou splice.",
      "Uniquement si l'objet est converti préalablement en chaîne JSON."
    ],
    a: 0,
    e: "React compare les références. Modifier un tableau en direct (ex: `tab.push(x)`) ne change pas sa référence, donc aucun rendu n'est déclenché."
  },

  // Chapitre 5: Listes et donnees (53 à 64)
  {
    id: 53,
    ch: 5,
    q: "Quelle méthode JavaScript utilise-t-on le plus fréquemment pour transformer un tableau de données en éléments JSX ?",
    o: [
      "map",
      "forEach",
      "filter",
      "reduce"
    ],
    a: 0,
    e: "map retourne un nouveau tableau d'éléments JSX à partir du tableau d'origine, parfait pour le rendu de listes."
  },
  {
    id: 54,
    ch: 5,
    q: "Pourquoi chaque élément retourné au sein d'une boucle map doit-il posséder une prop 'key' unique ?",
    o: [
      "Pour aider React à identifier précisément quels éléments ont changé, ont été ajoutés ou supprimés lors de la comparaison du DOM virtuel.",
      "Pour appliquer des styles CSS spécifiques à chaque ligne de la liste.",
      "Pour crypter les lignes de données pour des raisons de sécurité de la base SQL.",
      "Pour permettre aux moteurs de recherche d'indexer le contenu de la liste."
    ],
    a: 0,
    e: "La key stable permet à React de réordonner les éléments physiques du DOM plutôt que de tout reconstruire, optimisant les performances."
  },
  {
    id: 55,
    ch: 5,
    q: "Quelle valeur doit-on privilégier pour configurer la prop 'key' d'un élément de liste ?",
    o: [
      "Un identifiant unique et stable fourni par les données (ex: produit.id)",
      "Un nombre aléatoire généré en direct par Math.random()",
      "L'index de l'élément dans le tableau (ex: key={index})",
      "Le titre ou le libellé texte de l'élément qui peut se répéter"
    ],
    a: 0,
    e: "L'identifiant unique de la base de données est le meilleur choix car il est stable d'un rendu à l'autre."
  },
  {
    id: 56,
    ch: 5,
    q: "Quel problème peut survenir si on utilise l'index du tableau ('key={index}') dans une liste dynamique ?",
    o: [
      "Des bugs d'affichage ou de conservation d'états dans les inputs si la liste est triée, filtrée ou si des éléments sont supprimés.",
      "L'application se bloque instantanément avec un message d'erreur de clé invalide.",
      "Les styles CSS du site internet cessent de s'appliquer à la liste.",
      "La base de données SQL refuse d'enregistrer les lignes modifiées."
    ],
    a: 0,
    e: "Si un élément en tête est supprimé, l'ancien index 1 devient l'index 0. React peut alors associer de fausses données de DOM à l'élément restant."
  },
  {
    id: 57,
    ch: 5,
    q: "Pourquoi est-il déconseillé d'utiliser 'Math.random()' pour générer des keys lors du rendu ?",
    o: [
      "Parce que la clé change à chaque rendu, forçant React à détruire et recréer inutilement le DOM de toute la liste, plombant les performances.",
      "Parce que Math.random n'est pas supporté par les navigateurs mobiles.",
      "Parce que cela provoque des boucles réseau infinies vers les serveurs.",
      "Parce que les clés doivent obligatoirement être des chaînes de caractères."
    ],
    a: 0,
    e: "Une clé doit être stable dans le temps. Si elle change à chaque calcul, React considère que tous les éléments sont neufs."
  },
  {
    id: 58,
    ch: 5,
    q: "Comment ajoute-t-on proprement un nouvel élément à un tableau stocké dans le state ?",
    o: [
      "En créant une copie avec le spread operator : setArticles(prev => [...prev, nouvelArticle])",
      "En utilisant la méthode push directe : articles.push(nouvelArticle)",
      "En réinitialisant le state avec le tableau vide initial",
      "En utilisant une boucle for pour copier les cases une par une"
    ],
    a: 0,
    e: "La syntaxe spread `[...prev, item]` crée une nouvelle référence de tableau, respectant le principe d'immutabilité du state."
  },
  {
    id: 59,
    ch: 5,
    q: "Comment retire-t-on proprement un élément d'un tableau du state par son identifiant ?",
    o: [
      "En utilisant la méthode filter : setArticles(prev => prev.filter(a => a.id !== idASupprimer))",
      "En utilisant la méthode splice directe sur la variable du state",
      "En effaçant la base de données SQL locale pour tout réimporter",
      "React supprime automatiquement l'élément si on lui passe une prop vide"
    ],
    a: 0,
    e: "La méthode `filter` retourne un nouveau tableau excluant l'élément ciblé, garantissant la création d'une nouvelle référence."
  },
  {
    id: 60,
    ch: 5,
    q: "Qu'est-ce que le concept de 'state dérivé' (derived state) ?",
    o: [
      "Calculer une valeur en direct lors du rendu à partir des states existants, sans la stocker dans un deuxième state inutile.",
      "Un state hérité d'un composant parent par le mécanisme des classes.",
      "Le clonage d'un state pour l'envoyer vers une base de données distante.",
      "Un state qui se met à jour uniquement en cas de panne réseau."
    ],
    a: 0,
    e: "Exemple : stocker la liste et dériver le nombre d'éléments filtrés avec `const total = list.length` évite les désynchronisations."
  },
  {
    id: 61,
    ch: 5,
    q: "Comment modifie-t-on un attribut précis d'un élément au sein d'un tableau du state ?",
    o: [
      "En utilisant map pour copier le tableau en modifiant l'objet ciblé : setTab(prev => prev.map(x => x.id === id ? { ...x, actif: !x.actif } : x))",
      "En écrivant directement la modification : tab[index].actif = !tab[index].actif",
      "En convertissant le tableau complet en chaîne de caractères",
      "En utilisant un second useState pour stocker les index modifiés"
    ],
    a: 0,
    e: "Cette approche retourne un nouveau tableau et copie l'objet ciblé tout en préservant intacts les autres éléments."
  },
  {
    id: 62,
    ch: 5,
    q: "Pourquoi l'immutabilité des données est-elle cruciale en React ?",
    o: [
      "Elle permet à React de faire des comparaisons de référence ultra-rapides (===) pour savoir si les données ont changé.",
      "Elle empêche les utilisateurs de modifier leurs mots de passe de connexion.",
      "Elle protège les disques durs des serveurs contre l'usure prématurée.",
      "Elle supprime la nécessité de tester l'application."
    ],
    a: 0,
    e: "Si les références ne changent pas, React présume que l'état n'a pas évolué et saute l'étape de rendu, ignorant les changements visuels."
  },
  {
    id: 63,
    ch: 5,
    q: "Comment filtre-t-on l'affichage d'une liste selon un mot-clé de recherche sans altérer le tableau d'origine ?",
    o: [
      "En calculant le tableau filtré lors du rendu : const visibles = items.filter(i => i.nom.includes(recherche))",
      "En supprimant définitivement les lignes non correspondantes du tableau d'origine du state",
      "En rechargeant la page avec un paramètre de requête dans l'URL",
      "En masquant les lignes non correspondantes avec du code CSS display:none manuel"
    ],
    a: 0,
    e: "Conserver la source originale intacte dans le state permet de modifier la recherche à la volée de manière réactive."
  },
  {
    id: 64,
    ch: 5,
    q: "Peut-on utiliser l'opérateur spread pour fusionner deux tableaux de données dans le state ?",
    o: [
      "Oui, la syntaxe [...tab1, ...tab2] crée un nouveau tableau combinant les éléments des deux tableaux.",
      "Non, l'opérateur spread ne fonctionne que sur les objets de configuration simples.",
      "Oui, mais uniquement si les deux tableaux contiennent moins de 10 éléments.",
      "Non, il faut utiliser la méthode destructive concaténation physique."
    ],
    a: 0,
    e: "La syntaxe de décomposition (spread) fusionne les valeurs de manière non destructive dans un nouveau tableau."
  },

  // Chapitre 6: useEffect et appels API (65 à 77)
  {
    id: 65,
    ch: 6,
    q: "Qu'est-ce qu'un effet de bord (side effect) en React ?",
    o: [
      "Une opération extérieure au cycle pur de rendu du composant (ex: requêtes API, abonnements, timers, manipulation directe du document).",
      "Le ralentissement visuel des animations graphiques de l'interface.",
      "Une erreur critique provoquant l'affichage d'une page blanche.",
      "La création d'un composant enfant non déclaré dans l'arborescence."
    ],
    a: 0,
    e: "Les effets de bord connectent React avec le monde extérieur ou des APIs du navigateur après l'affichage du composant."
  },
  {
    id: 66,
    ch: 6,
    q: "Quel Hook React permet de gérer les effets de bord ?",
    o: [
      "useEffect",
      "useState",
      "useMemo",
      "useCallback"
    ],
    a: 0,
    e: "useEffect planifie l'exécution d'une fonction de rappel après que le rendu a été validé et injecté dans le DOM."
  },
  {
    id: 67,
    ch: 6,
    q: "Que se passe-t-il si on omet totalement le tableau de dépendances de 'useEffect(callback)' (aucun tableau passé) ?",
    o: [
      "L'effet s'exécute après chaque rendu du composant, risquant de créer des boucles infinies en cas de mise à jour du state.",
      "L'effet ne s'exécute qu'une seule fois lors du montage initial.",
      "React refuse de compiler le fichier et affiche une erreur de syntaxe.",
      "L'effet s'exécute uniquement lors de la fermeture de l'application."
    ],
    a: 0,
    e: "Sans tableau, React relance l'effet à chaque cycle. Si l'effet modifie un state, cela relance un rendu, créant une boucle infinie."
  },
  {
    id: 68,
    ch: 6,
    q: "Comment indique-t-on à 'useEffect' de ne s'exécuter qu'une seule fois, au montage du composant ?",
    o: [
      "En lui passant un tableau de dépendances vide : []",
      "En configurant le paramètre once: true dans les options du hook",
      "En omettant le bloc return à la fin de la fonction d'effet",
      "En déclarant le hook en dehors de la fonction du composant"
    ],
    a: 0,
    e: "Le tableau vide indique à React que l'effet ne dépend d'aucune variable réactive, il ne se lancera donc qu'au chargement."
  },
  {
    id: 69,
    ch: 6,
    q: "À quel moment s'exécute la fonction de nettoyage (cleanup) retournée par 'useEffect' ?",
    o: [
      "Avant le prochain appel de l'effet, ou lors du démontage (destruction) du composant.",
      "Immédiatement avant le premier rendu du composant à l'écran.",
      "Toutes les 24 heures de manière asynchrone en arrière-plan.",
      "Uniquement si l'appel API fetch a renvoyé une erreur de code 500."
    ],
    a: 0,
    e: "Le cleanup permet de nettoyer les écouteurs d'événements, d'annuler les requêtes en cours ou de stopper les timers."
  },
  {
    id: 70,
    ch: 6,
    q: "Qu'est-ce que l'AbortController permet de faire dans un appel API fetch lié à un useEffect ?",
    o: [
      "Annuler une requête HTTP en cours si le composant est démonté avant d'avoir reçu la réponse.",
      "Chiffrer les données envoyées pour sécuriser les jetons d'accès.",
      "Forcer le serveur à renvoyer un code de statut 200 à la place d'une erreur.",
      "Sauvegarder les données dans le stockage local localStorage."
    ],
    a: 0,
    e: "Annuler les requêtes évite les fuites de mémoire (memory leaks) et les conflits d'affichage si l'utilisateur change de page rapidement."
  },
  {
    id: 71,
    ch: 6,
    q: "Quels sont les trois états fondamentaux d'un appel réseau que le frontend doit gérer ?",
    o: [
      "Chargement (loading), Données reçues (data), Erreur (error)",
      "Départ (start), Transit (transit), Arrivée (end)",
      "Synchrone (sync), Asynchrone (async), Réseau (network)",
      "Lecture (read), Écriture (write), Suppression (delete)"
    ],
    a: 0,
    e: "Gérer loading et error évite de présenter un écran vide ou figé en cas de problème réseau ou d'attente."
  },
  {
    id: 72,
    ch: 6,
    q: "Que se passe-t-il si vous lancez un appel 'fetch' modifiant le state à l'intérieur du corps du composant, en dehors de 'useEffect' ?",
    o: [
      "L'application va boucler indéfiniment en envoyant des requêtes HTTP sans s'arrêter.",
      "La requête s'exécute correctement et l'affichage se met à jour proprement.",
      "Le navigateur bloque la requête car elle n'est pas sécurisée.",
      "Rien, l'appel fetch est tout simplement ignoré en dehors des hooks."
    ],
    a: 0,
    e: "Chaque re-rendu exécute la fonction du composant. Sans useEffect, fetch se relance, change le state, relance le rendu, et ainsi de suite."
  },
  {
    id: 73,
    ch: 6,
    q: "Dans la commande 'useEffect(() => { ... }, [id])', quand l'effet se relance-t-il ?",
    o: [
      "À chaque fois que la valeur de la variable 'id' change.",
      "Une seule fois lors du chargement initial uniquement.",
      "Toutes les secondes tant que l'id est supérieur à zéro.",
      "Uniquement si l'id n'est plus présent dans les cookies."
    ],
    a: 0,
    e: "React compare la valeur actuelle de `id` avec sa valeur précédente. Si elle diffère, il réexécute l'effet."
  },
  {
    id: 74,
    ch: 6,
    q: "Comment attrape-t-on une erreur réseau lors d'un appel avec 'fetch' ?",
    o: [
      "En utilisant le bloc '.catch(err => ...)' d'une promesse ou un bloc try/catch avec async/await.",
      "En configurant le paramètre ignoreErrors: false dans l'input.",
      "Le navigateur gère les erreurs tout seul et les affiche à l'écran.",
      "En testant si la variable d'état data vaut undefined."
    ],
    a: 0,
    e: "Gérer l'échec d'une promesse évite les crashs silencieux de l'application et permet d'avertir l'utilisateur du problème."
  },
  {
    id: 75,
    ch: 6,
    q: "Comment déclenche-t-on un nettoyage de timer créé avec 'setInterval' dans un useEffect ?",
    o: [
      "En retournant une fonction contenant 'clearInterval(id)' : return () => clearInterval(id);",
      "En appelant la fonction stopTimer() à la fin de l'effet.",
      "React nettoie et supprime les timers automatiquement à la fin de l'effet.",
      "En passant le timer dans le tableau de dépendances du hook."
    ],
    a: 0,
    e: "Retourner une fonction de nettoyage garantit que le timer ne continuera pas à tourner en arrière-plan après la destruction du composant."
  },
  {
    id: 76,
    ch: 6,
    q: "Pourquoi fetch() ne rejette-t-il pas la promesse en cas de statut HTTP d'erreur (comme 404 ou 500) ?",
    o: [
      "Parce que fetch considère que la requête réseau a réussi tant qu'il a pu joindre le serveur ; il faut tester 'res.ok'.",
      "C'est un bug connu du navigateur Safari uniquement.",
      "Parce que les codes 400 et 500 font partie des réussites d'authentification.",
      "fetch rejette toujours les codes d'erreur, l'affirmation est fausse."
    ],
    a: 0,
    e: "La promesse n'est rejetée qu'en cas de panne réseau ou de blocage CORS. Pour les erreurs HTTP, il faut vérifier `if (!res.ok)`."
  },
  {
    id: 77,
    ch: 6,
    q: "Pourquoi est-il déconseillé de déclarer la fonction d'effet comme une fonction asynchrone en direct : 'useEffect(async () => ...)' ?",
    o: [
      "Parce qu'une fonction async retourne une promesse, alors que useEffect attend uniquement une fonction de nettoyage synchrone ou rien.",
      "Parce que JavaScript n'autorise pas l'asynchronisme au sein des hooks React.",
      "Parce que cela bloque le thread principal du navigateur internet.",
      "Cette syntaxe est recommandée et validée par les lints modernes."
    ],
    a: 0,
    e: "Il faut déclarer une fonction asynchrone *à l'intérieur* de l'effet et l'appeler immédiatement : `const fetchData = async () => {}; fetchData();`."
  },

  // Chapitre 7: Routing (78 à 89)
  {
    id: 78,
    ch: 7,
    q: "Quelle bibliothèque standard utilise-t-on pour gérer la navigation et les routes dans une application React ?",
    o: [
      "react-router-dom",
      "react-navigation",
      "react-route-manager",
      "react-link-dom"
    ],
    a: 0,
    e: "react-router-dom est le standard pour gérer la navigation côté client dans les Single Page Applications React pour le web."
  },
  {
    id: 79,
    ch: 7,
    q: "Quel composant doit envelopper l'intégralité de l'application pour activer le routage ?",
    o: [
      "BrowserRouter",
      "RouteProvider",
      "RouterContainer",
      "NavigationScope"
    ],
    a: 0,
    e: "BrowserRouter utilise l'API History d'HTML5 pour synchroniser l'URL du navigateur avec l'application."
  },
  {
    id: 80,
    ch: 7,
    q: "Comment déclare-t-on une association entre le chemin '/contact' et le composant '<Contact />' ?",
    o: [
      "<Route path=\"/contact\" element={<Contact />} />",
      "<Route href=\"/contact\" component={Contact} />",
      "<Link path=\"/contact\">Contact</Link>",
      "<RoutePath url=\"/contact\" element={Contact} />"
    ],
    a: 0,
    e: "Dans React Router v6, on utilise le composant Route avec les props path et element."
  },
  {
    id: 81,
    ch: 7,
    q: "Quel composant remplace la balise HTML classique '<a href=\"...\">' pour naviguer sans recharger la page en React ?",
    o: [
      "Link",
      "NavLink",
      "RouteLink",
      "Anchor"
    ],
    a: 0,
    e: "Le composant Link intercepte le clic pour mettre à jour l'URL et l'affichage localement sans faire de requête de page au serveur."
  },
  {
    id: 82,
    ch: 7,
    q: "Comment déclare-t-on une route dynamique capturant un paramètre nommé 'id' (ex: pour afficher un profil) ?",
    o: [
      "<Route path=\"/profil/:id\" element={<Profil />} />",
      "<Route path=\"/profil/id\" element={<Profil />} />",
      "<Route path=\"/profil/{id}\" element={<Profil />} />",
      "<Route path=\"/profil/*\" element={<Profil />} />"
    ],
    a: 0,
    e: "Le symbole deux-points (:) indique à React Router qu'il s'agit d'un paramètre dynamique de chemin."
  },
  {
    id: 83,
    ch: 7,
    q: "Quel Hook permet de récupérer la valeur du paramètre dynamique d'une route (comme l'id du profil) ?",
    o: [
      "useParams",
      "useRouteParams",
      "useNavigate",
      "useLocation"
    ],
    a: 0,
    e: "useParams retourne un objet contenant les clés/valeurs des paramètres dynamiques de l'URL actuelle."
  },
  {
    id: 84,
    ch: 7,
    q: "Comment configure-t-on une route '404 - Non Trouvé' pour capturer toutes les URLs inconnues ?",
    o: [
      "<Route path=\"*\" element={<NotFound />} />",
      "<Route path=\"/404\" element={<NotFound />} />",
      "<Route default element={<NotFound />} />",
      "<Route path=\"all\" element={<NotFound />} />"
    ],
    a: 0,
    e: "L'astérisque (*) sert de joker (catch-all) correspondant à n'importe quel chemin n'ayant pas de route plus précise."
  },
  {
    id: 85,
    ch: 7,
    q: "Quel Hook permet de naviguer programmatiquement vers une autre page (ex: après la soumission d'un formulaire) ?",
    o: [
      "useNavigate",
      "useRedirect",
      "useHistory",
      "useLink"
    ],
    a: 0,
    e: "useNavigate v6 retourne une fonction de navigation (ex: `navigate('/dashboard')`)."
  },
  {
    id: 86,
    ch: 7,
    q: "Pourquoi un serveur web classique (comme Nginx ou Apache) renvoie-t-il une erreur 404 lors du rafraîchissement d'une route React en production ?",
    o: [
      "Parce que le serveur cherche physiquement le fichier HTML de la route sur le disque dur ; il faut rediriger toutes les requêtes vers index.html.",
      "Parce que le build de production supprime le code source du routage.",
      "Parce que le protocole HTTPS bloque les routes côté client.",
      "Parce que l'application React n'a pas été compilée correctement."
    ],
    a: 0,
    e: "En SPA, le routage est géré en JS. Le serveur doit renvoyer index.html pour n'importe quelle requête afin que React Router prenne le relais."
  },
  {
    id: 87,
    ch: 7,
    q: "Quelle commande crée les fichiers compilés optimisés pour la production dans le dossier 'dist' ?",
    o: [
      "npm run build",
      "npm run compile",
      "vite export",
      "node build.js"
    ],
    a: 0,
    e: "npm run build compile le code source, supprime le debug et génère des assets statiques optimisés."
  },
  {
    id: 88,
    ch: 7,
    q: "Dans quel but utilise-t-on le composant 'NavLink' au lieu de 'Link' ?",
    o: [
      "Pour appliquer automatiquement une classe CSS active sur le lien correspondant à la page en cours de consultation.",
      "Pour charger la page cible plus rapidement en pré-téléchargeant les images.",
      "Pour sécuriser la navigation à l'aide d'un jeton d'authentification.",
      "NavLink est réservé aux menus mobiles et Link aux menus classiques."
    ],
    a: 0,
    e: "NavLink expose une fonction d'état active/pending très pratique pour styliser les onglets de navigation."
  },
  {
    id: 89,
    ch: 7,
    q: "Qu'est-ce que le dossier 'dist' généré par le build de production ?",
    o: [
      "Un dossier contenant uniquement des fichiers statiques prêts à être hébergés sur n'importe quel serveur web (CDN, Netlify, Vercel).",
      "Le dossier de développement contenant les sources non compressées.",
      "Une base de données locale cryptée temporaire utilisée pour les tests.",
      "Le dossier contenant les fichiers d'installation réseau de VS Code."
    ],
    a: 0,
    e: "dist (distribution) contient le résultat compilé purifié, libre de tout serveur de dev ou outil de compilation."
  },

  // Chapitre 8: Projet Todo List (90 à 100)
  {
    id: 90,
    ch: 8,
    q: "Dans le projet de Todo List, pourquoi sépare-t-on la logique de filtrage des composants enfants comme 'TodoItem' ?",
    o: [
      "Pour garder les composants enfants simples et réutilisables, le parent décidant de la liste des tâches à rendre visible.",
      "Parce que React interdit d'écrire des filtres dans les composants enfants.",
      "Pour réduire la taille du fichier CSS d'habillage graphique.",
      "Pour éviter que l'utilisateur ne supprime des tâches par erreur."
    ],
    a: 0,
    e: "La centralisation de la logique dans le composant parent coordonnateur simplifie le flux de données et évite les désynchronisations."
  },
  {
    id: 91,
    ch: 8,
    q: "Comment sauvegarde-t-on le tableau des tâches dans le navigateur pour qu'il survive au rechargement ?",
    o: [
      "En convertissant le tableau en chaîne JSON et en le stockant dans localStorage : localStorage.setItem('cle', JSON.stringify(tasks))",
      "En envoyant les données directement dans le fichier local index.html de l'utilisateur.",
      "En stockant le tableau dans une variable globale non volatile de l'ordinateur.",
      "En utilisant une connexion réseau vers un serveur cloud gratuit obligatoire."
    ],
    a: 0,
    e: "localStorage stocke des données textuelles de manière persistante sur le poste du client sans date d'expiration."
  },
  {
    id: 92,
    ch: 8,
    q: "Quelle méthode permet de lire et restaurer les tâches sauvegardées dans le localStorage au démarrage de l'application ?",
    o: [
      "JSON.parse(localStorage.getItem('tasks'))",
      "localStorage.read('tasks')",
      "JSON.stringify(localStorage.get('tasks'))",
      "fs.readFileSync('tasks')"
    ],
    a: 0,
    e: "On récupère le texte avec getItem, puis JSON.parse le retransforme en tableau exploitable par React."
  },
  {
    id: 93,
    ch: 8,
    q: "Que doit-on prévoir si 'localStorage.getItem()' ne trouve aucune tâche sauvegardée (première visite) ?",
    o: [
      "Renvoyer un tableau vide par défaut : || []",
      "Arrêter le rendu du composant et afficher un message d'erreur réseau.",
      "Forcer la saisie immédiate de 10 tâches par l'utilisateur.",
      "Réinitialiser l'intégralité du système d'exploitation du client."
    ],
    a: 0,
    e: "Il faut toujours prévoir une valeur de repli (fallback) pour éviter de passer une valeur nulle à useState."
  },
  {
    id: 94,
    ch: 8,
    q: "Où place-t-on idéalement le code de sauvegarde automatique du localStorage dans la Todo List ?",
    o: [
      "Dans un useEffect ayant la variable d'état des tâches dans son tableau de dépendances.",
      "Directement au début de la fonction de rendu principal du composant App.",
      "À l'intérieur de l'écouteur d'événement onClick du bouton reset.",
      "Dans le fichier de style CSS pour qu'il se lance en arrière-plan."
    ],
    a: 0,
    e: "useEffect s'exécutera automatiquement après chaque modification des tâches, assurant une sauvegarde transparente."
  },
  {
    id: 95,
    ch: 8,
    q: "Que représente le concept d'état minimal dans le design de la Todo List ?",
    o: [
      "Stocker uniquement les tâches brutes et dériver le nombre de tâches restantes ou filtrées par calcul à chaque rendu.",
      "Créer des variables d'état distinctes pour chaque lettre saisie à l'écran.",
      "Limiter le nombre maximal de tâches affichées à l'écran à 5.",
      "Désactiver toutes les variables d'état du projet par mesure de performance."
    ],
    a: 0,
    e: "Moins de state signifie moins de risques d'incohérences (ex: avoir un compteur de tâches en décalage avec le tableau réel)."
  },
  {
    id: 96,
    ch: 8,
    q: "Dans la Todo List, que contient généralement l'objet modélisant une tâche ?",
    o: [
      "Un identifiant unique (id), le texte de la tâche (text) et son état d'avancement (completed).",
      "L'URL de la route dynamique du profil de l'utilisateur ayant créé la tâche.",
      "Le code source CSS utilisé pour styliser le bouton de suppression.",
      "Un tableau contenant l'historique complet des saisies claviers."
    ],
    a: 0,
    e: "Cette structure minimale suffit pour piloter l'affichage, le filtrage et les actions de modification."
  },
  {
    id: 97,
    ch: 8,
    q: "Quelle clé React attribue-t-on de préférence à chaque composant 'TodoItem' rendu dans la liste ?",
    o: [
      "La clé unique stable 'task.id' de la tâche.",
      "L'index relatif de la ligne dans le tableau filtré.",
      "Le texte saisi par l'utilisateur qui peut être dupliqué.",
      "Une clé aléatoire recalculée à chaque clic de souris."
    ],
    a: 0,
    e: "La clé `task.id` est unique et immuable pour chaque tâche, garantissant un suivi parfait par React."
  },
  {
    id: 98,
    ch: 8,
    q: "Comment code-t-on le basculement d'état d'une tâche (complétée / active) de manière immutable ?",
    o: [
      "setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))",
      "setTasks(prev => { prev.find(t => t.id === id).completed = true; return prev; })",
      "setTasks(prev => prev.filter(t => t.id !== id))",
      "setTasks(prev => [...prev, { id, completed: true }])"
    ],
    a: 0,
    e: " map recrée un nouveau tableau et `{...t, completed: !t.completed}` recrée une copie de la tâche modifiée."
  },
  {
    id: 99,
    ch: 8,
    q: "À quoi sert de découper la Todo List en sous-composants comme 'TodoForm' et 'TodoItem' ?",
    o: [
      "À séparer les responsabilités du code, facilitant son évolution, son test et sa lisibilité globale.",
      "À obliger le navigateur internet à télécharger les fichiers CSS en parallèle.",
      "À masquer le code source de l'application aux yeux des autres développeurs.",
      "À pouvoir déployer chaque composant sur un serveur cloud différent."
    ],
    a: 0,
    e: "La modularité structure l'application. `TodoForm` s'occupe de la saisie, `TodoItem` de l'affichage d'une ligne."
  },
  {
    id: 100,
    ch: 8,
    q: "Quelle est la bonne pratique concernant l'initialisation de l'état local dans la Todo List ?",
    o: [
      "Utiliser un état vide initialisé au format du type attendu (ex: [] pour les tâches, '' pour la saisie).",
      "Initialiser le state à 'null' puis forcer le type au premier clic.",
      "Déclarer les variables sans leur affecter de valeur de départ.",
      "Initialiser toutes les variables d'état avec des chaînes de caractères quelconques."
    ],
    a: 0,
    e: "Fournir un type correct à l'initialisation évite les erreurs de rendu initial (ex: tenter de faire un map sur une valeur null)."
  }
];

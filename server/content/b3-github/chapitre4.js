/**
 * Chapitre 4 du cours « Git & GitHub B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Workflows d’Équipe, Gouvernance &amp; Protection de Branches',
  short: 'Gouvernance &amp; Workflows',
  toc: 'Modèles de collaboration (Git Flow, GitHub Flow, Trunk-Based Development), règles de protection de branches (Branch Protection Rules / Rulesets), signature cryptographique GPG et norme Conventional Commits 1.0.0.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans un contexte professionnel, la technique pure de Git ne suffit pas si elle n’est pas encadrée par une gouvernance d’équipe rigoureuse. La prolifération de branches orphelines, les fusions incontrôlées directement sur la branche principale en production et les messages de commits incompréhensibles constituent les causes majeures de régressions logicielles et de retards de livraison. L’ingénieur de niveau Bachelor 3 doit savoir choisir et formaliser la stratégie de branches appropriée (du modèle classique Git Flow jusqu’au Trunk-Based Development accéléré), configurer des règles d’accès strictes (Branch Protection Rules sur GitHub) exigeant approbations par les pairs et contrôles d’intégration continue, imposer la signature cryptographique des commits via GPG, et structurer les messages selon la norme Conventional Commits pour automatiser le versionnage sémantique (SemVer).',
  objectives: [
    'analyser et comparer de manière critique les flux de travail Git Flow, GitHub Flow et Trunk-Based Development ;',
    'concevoir une politique de gouvernance d’entreprise avec branches protégées, revues de code et historique linéaire ;',
    'configurer la signature cryptographique des commits avec GPG et clés SSH pour garantir l’authenticité des auteurs ;',
    'maîtriser la spécification formelle Conventional Commits 1.0.0 et son impact sur le calcul automatique de versions SemVer ;',
    'mettre en place des règles de protection de branche (Rulesets GitHub) empêchant les fusions sans statut CI valide ;',
    'développer en Python 3 des auditeurs de conformité de workflow, des évaluateurs de règles de fusion et des analyseurs sémantiques de messages.'
  ],
  sections: [
    {
      title: 'Modèles de Collaboration en Équipe : Du Git Flow au Trunk-Based Development',
      html: [
        '<p>Le choix d’un modèle de cycle de vie des branches (Branching Strategy) conditionne directement la cadence de déploiement et la stabilité des applications :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Le Modèle Git Flow (Historique &amp; Cycles Longs)</h4>',
        '    <p>Conçu par Vincent Driessen en 2010 pour les logiciels packagés à cycles de publication espacés :</p>',
        '    <ul>',
        '      <li><code>main</code> (ou <code>master</code>) : Reflète l’état exact de la production.</li>',
        '      <li><code>develop</code> : Branche d’intégration courante des fonctionnalités.</li>',
        '      <li>Branches éphémères : <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code>.</li>',
        '    </ul>',
        '    <p><strong>Limites :</strong> Modèle lourd, multiplication des fusions croisées et inadapté au déploiement continu moderne (CD).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Trunk-Based Development &amp; GitHub Flow (Moderne &amp; CI/CD)</h4>',
        '    <p>Le standard des géants du web (Google, Meta, Netflix) et des équipes DevOps modernes :</p>',
        '    <ul>',
        '      <li><strong>Trunk-Based :</strong> Tous les développeurs intègrent leurs modifications sur une branche unique <code>main</code> (le tronc) au moins une fois par jour.</li>',
        '      <li>Branches de fonctionnalités (Feature Branches) ultra-courtes : durée de vie inférieure à 24-48 heures.</li>',
        '      <li>Utilisation systématique de <strong>Feature Flags (bascules de code)</strong> pour masquer en production les fonctionnalités en cours de développement.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Gouvernance de Dépôt &amp; Règles de Protection de Branche (Branch Protection)',
      html: [
        '<p>Sur GitHub, une branche de production ne doit <strong>jamais être modifiable par un <code>git push</code> direct</strong>, même par le créateur du dépôt. La mise en place de <em>Branch Protection Rules</em> (ou <em>GitHub Repository Rulesets</em>) impose des garde-fous formels :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Règle de Protection</th><th>Description Technique</th><th>Bénéfice de Sécurité &amp; Qualité</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>Require pull request reviews</code></td>',
        '      <td>Exige au minimum 1 ou 2 approbations de relecteurs pairs (Peer Review) et l’accord des <code>CODEOWNERS</code>.</td>',
        '      <td>Empêche l’introduction de code unilatéral sans double regard critique.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>Require status checks to pass</code></td>',
        '      <td>La fusion est bloquée tant que les workflows CI (linter, tests unitaires, build) n’ont pas retourné un statut <code>SUCCESS</code>.</td>',
        '      <td>Garantit que la branche principale ne compile jamais de code cassé (Zero Broken Trunk).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>Require signed commits</code></td>',
        '      <td>Rejette tout commit dont la signature cryptographique GPG/SSH n’est pas vérifiée par GitHub.</td>',
        '      <td>Élimine totalement les attaques par usurpation d’identité d’auteur (Commit Spoofing).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>Require linear history</code></td>',
        '      <td>Interdit les commits de fusion à 2 parents (oblige Squash &amp; Merge ou Rebase).</td>',
        '      <td>Conserve un historique limpide, facilitant les audits et le fonctionnement de git bisect.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Signature Cryptographique : GPG &amp; Clés SSH Signées',
      html: [
        '<p>Par défaut, Git fait aveuglément confiance aux champs d’en-tête <code>user.name</code> et <code>user.email</code> d’un commit. N’importe qui peut commiter sous l’identité d’un administrateur sans mot de passe :</p>',
        '<pre><code>git config user.name "Linus Torvalds"\ngit config user.email "torvalds@linux-foundation.org"</code></pre>',
        box('danger', 'Usurpation d’Identité &amp; Badge « Verified » sur GitHub', [
          '<p>Pour contrer cette vulnérabilité, la signature cryptographique associe la clé privée du développeur au hash du commit :</p>',
          '<ul>',
          '  <li>Création d’une clé GPG (ou utilisation d’une clé SSH moderne avec <code>gpg.format = ssh</code>).</li>',
          '  <li>Signature automatique : <code>git commit -S -m "commit certifie"</code>.</li>',
          '  <li>GitHub vérifie la signature contre la clé publique enregistrée et appose le badge vert <strong>« Verified »</strong>. Tout commit forgé sans clé privée valide est rejeté ou marqué non vérifié.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Spécification Formelle Conventional Commits 1.0.0 &amp; SemVer',
      html: [
        '<p>La convention <strong>Conventional Commits 1.0.0</strong> structure les messages de commit pour permettre le calcul automatisé des versions selon le <em>Semantic Versioning (SemVer 2.0.0 - MAJOR.MINOR.PATCH)</em> et la génération sans intervention humaine du journal des modifications (CHANGELOG) :</p>',
        '<pre><code>&lt;type&gt;[scope optionnel][!]: &lt;description concise&gt;\n\n[corps detaille optionnel]\n\n[pied de page : BREAKING CHANGE: ... ou Closes #42]</code></pre>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Types Autorisés &amp; Sémantique</h4>',
        '    <ul>',
        '      <li><code>feat</code> : Nouvelle fonctionnalité (incrémente <strong>MINOR</strong>).</li>',
        '      <li><code>fix</code> : Correction de bogue (incrémente <strong>PATCH</strong>).</li>',
        '      <li><code>docs</code>, <code>chore</code>, <code>style</code>, <code>refactor</code>, <code>perf</code>, <code>test</code>, <code>ci</code> : Modifications internes sans impact fonctionnel (aucun incrément).</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Rupture de Compatibilité (Breaking Change)</h4>',
        '    <p>Une rupture d’API publique incrémente immédiatement le chiffre <strong>MAJOR</strong> (ex: de v1.4.2 à v2.0.0). Elle se signale formellement de deux manières :</p>',
        '    <ul>',
        '      <li>Par un point d’exclamation avant le deux-points : <code>feat(auth)!: bascule vers OAuth2 strict</code>.</li>',
        '      <li>Par la mention <code>BREAKING CHANGE:</code> dans le pied de page du commit.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Mise en Place de la Gouvernance de Dépôt',
  method: [
    'Étape 1 : Activer la protection de branche sur main (Settings -> Rules -> Rulesets) avec PR obligatoire et au moins 1 approbation.',
    'Étape 2 : Créer le fichier .github/CODEOWNERS pour assigner automatiquement les relecteurs référents selon les dossiers modifiés.',
    'Étape 3 : Rendre obligatoires les contrôles d’état CI (checks status) : le pipeline de validation doit réussir avant tout merge.',
    'Étape 4 : Activer l’exigence de signature des commits (Require signed commits) et configurer les clés GPG/SSH de l’équipe.',
    'Étape 5 : Installer un hook commit-msg validant la syntaxe Conventional Commits 1.0.0 sur les postes des développeurs.',
    'Étape 6 : Configurer un outil de release automatisé (semantic-release ou standard-version) sur GitHub Actions.'
  ],
  summary: [
    'Git Flow est un modèle à branches longues lourd ; Trunk-Based Development privilégie des intégrations continues quotidiennes sur le tronc.',
    'Les Feature Flags permettent de fusionner fréquemment sans exposer du code incomplet aux utilisateurs finaux.',
    'Les Branch Protection Rules protègent la branche main : PR obligatoire, 1-2 approbations, CI au vert, historique linéaire.',
    'N’importe qui peut forger l’auteur d’un commit sans mot de passe : la signature GPG/SSH est la seule preuve cryptographique d’authenticité.',
    'La norme Conventional Commits (feat, fix, docs...) normalise les messages et pilote l’incrémentation automatique de SemVer.',
    'Le caractère « ! » ou la mention BREAKING CHANGE déclenche immédiatement un saut de version majeure (MAJOR).'
  ],
  checklist: [
    'Je sais expliquer pourquoi Trunk-Based Development est le modèle privilégié en CI/CD moderne.',
    'Je connais le rôle et l’utilisation des Feature Flags en association avec le tronc principal.',
    'Je sais configurer une Branch Protection Rule exigeant des approbations de relecteurs et le statut vert de la CI.',
    'Je comprends comment fonctionne l’usurpation de commit Git et comment la signature GPG/SSH la neutralise.',
    'Je maîtrise la structure formelle de la spécification Conventional Commits 1.0.0.',
    'Je sais mapper les types de commits avec les incréments SemVer (MAJOR, MINOR, PATCH).'
  ],
  notions: [
    'Git Flow vs GitHub Flow',
    'Trunk-Based Development',
    'Feature Flags (Bascules de code)',
    'Règles de protection de branche (Rulesets)',
    'Revue par les pairs & CODEOWNERS',
    'Signature cryptographique GPG / SSH',
    'Norme Conventional Commits 1.0.0',
    'Semantic Versioning (SemVer)'
  ],
  pitfalls: [
    'Conserver des branches de fonctionnalités ouvertes pendant des semaines (garantie de conflits inextricables).',
    'Permettre aux administrateurs de contourner les règles de protection de branche en cochant « Do not apply to administrators ».',
    'Oublier le deux-points suivi d’un espace (« :  ») dans la syntaxe des messages Conventional Commits.',
    'Pousser des commits non signés sur un dépôt imposant la vérification GPG (le push sera rejeté).'
  ],
  questions: [
    {
      stem: 'Pourquoi les équipes adoptant la livraison continue (CI/CD) privilégient-elles Trunk-Based Development par rapport à Git Flow ?',
      opts: [
        'Parce que Git Flow ne supporte pas le langage Python',
        'Parce que Trunk-Based évite les branches à longue durée de vie et favorise l’intégration continue fréquente sur la branche principale',
        'Parce que Trunk-Based supprime le besoin d’exécuter des tests automatisés',
        'Parce que Git Flow exige obligatoirement des serveurs GitLab dédiés'
      ],
      correct: 1,
      exp: 'Trunk-Based Development évite la divergence de code en incitant les développeurs à fusionner de petites modifications quotidiennement sur le tronc, supprimant les crises de fusions douloureuses de Git Flow.'
    },
    {
      stem: 'Quel mécanisme logiciel permet de fusionner du code incomplet dans la branche principale sans impacter les utilisateurs finaux ?',
      opts: [
        'Les branches de correctifs hotfix',
        'Les Feature Flags (ou Feature Toggles)',
        'Les tags annotés GPG',
        'Le rebase interactif en mode drop'
      ],
      correct: 1,
      exp: 'Les Feature Flags permettent d’activer ou désactiver des morceaux de code via des variables de configuration, autorisant l’intégration continue du code inachevé sans risque pour la production.'
    },
    {
      stem: 'Que se passe-t-il si un développeur tente de pusher un commit sans signature GPG sur une branche protégée par « Require signed commits » ?',
      opts: [
        'GitHub signe automatiquement le commit avec la clé du serveur',
        'Le push est immédiatement rejeté par GitHub avec un message d’erreur',
        'Le commit est accepté mais placé dans un dossier d’attente',
        'Le dépôt bascule automatiquement en mode privé'
      ],
      correct: 1,
      exp: 'La règle de protection vérifie les métadonnées cryptographiques : tout commit dépourvu d’une signature valide issue d’une clé publique enregistrée sur le profil de l’utilisateur est bloqué.'
    },
    {
      stem: 'Dans la norme Conventional Commits 1.0.0, quel type de commit correspond à une nouvelle fonctionnalité ajoutée à l’application ?',
      opts: [
        'fix',
        'feat',
        'chore',
        'refactor'
      ],
      correct: 1,
      exp: 'Le type « feat » est réservé aux nouvelles fonctionnalités et entraîne automatiquement l’incrémentation du composant MINOR de la version sémantique SemVer.'
    },
    {
      stem: 'Quel incrément SemVer (X.Y.Z) est déclenché par un commit rédigé « feat(api)!: suppression du support XML » ?',
      opts: [
        'Incrément de PATCH (Z)',
        'Incrément de MINOR (Y)',
        'Incrément de MAJOR (X)',
        'Aucun incrément de version'
      ],
      correct: 2,
      exp: 'Le point d’exclamation « ! » signale une rupture de compatibilité ascendante (Breaking Change), ce qui déclenche obligatoirement l’incrémentation du chiffre majeur (MAJOR).'
    },
    {
      stem: 'Quel est l’intérêt d’imposer la règle « Require linear history » sur la branche principale GitHub ?',
      opts: [
        'Empêcher l’utilisation de git checkout',
        'Éliminer les commits de fusion parasites à deux parents pour maintenir un historique séquentiel lisible',
        'Forcer tous les développeurs à travailler sur la même machine',
        'Interdire l’utilisation de GitHub Actions'
      ],
      correct: 1,
      exp: 'Un historique linéaire ne contient aucun embranchement ni commit de fusion à plusieurs parents, ce qui facilite grandement la lecture chronologique, les audits de sécurité et le traçage bisect.'
    },
    {
      stem: 'Où doit être placé le fichier déclarant formellement les propriétaires de répertoires de code pour les revues de Pull Requests sur GitHub ?',
      opts: [
        'Dans .github/CODEOWNERS',
        'Dans .git/config/owners.json',
        'Dans package.json sous la clé "reviewers"',
        'Dans le README.md du projet'
      ],
      correct: 0,
      exp: 'GitHub lit nativement le fichier .github/CODEOWNERS (ou CODEOWNERS à la racine) pour assigner automatiquement les relecteurs requis dès qu’une Pull Request touche les fichiers sous leur responsabilité.'
    },
    {
      stem: 'Quelle information dans les en-têtes d’un commit Git peut être librement falsifiée sans clé de signature cryptographique ?',
      opts: [
        'L’empreinte SHA-1 finale',
        'Les champs Author Name et Author Email',
        'Le hash de l’objet tree racine',
        'Le nombre d’octets de la charge utile'
      ],
      correct: 1,
      exp: 'Git se fie aux variables d’environnement user.name et user.email configurées localement : sans signature GPG ou SSH, n’importe quel utilisateur peut prétendre être l’auteur d’un commit.'
    }
  ],
  flashcards: [
    {
      q: 'Quel est le principe fondamental du Trunk-Based Development ?',
      a: 'Tous les développeurs travaillent sur une branche unique partagée (le tronc main), intégrant fréquemment de petits commits via des branches de courte durée (< 2 jours).'
    },
    {
      q: 'À quoi servent les Feature Flags en développement logiciel moderne ?',
      a: 'À découpler le déploiement du code en production de l’activation effective de la fonctionnalité pour les utilisateurs finaux.'
    },
    {
      q: 'Quelles sont les 4 règles de protection de branche majeures sur GitHub ?',
      a: 'Revue de code obligatoire (PR reviews), passage des statuts CI requis, commits signés obligatoires (GPG/SSH) et historique linéaire strict.'
    },
    {
      q: 'Quel est le format standard d’un commit Conventional Commits 1.0.0 ?',
      a: '<type>[scope optionnel][!]: <description> (avec deux-points suivi impérativement d’un espace).'
    },
    {
      q: 'Comment un « Breaking Change » est-il formellement indiqué dans un commit sémantique ?',
      a: 'Par un point d’exclamation avant le deux-points (ex: feat!:) ou par la mention BREAKING CHANGE: dans le corps/pied de page.'
    },
    {
      q: 'Quel est le rôle du fichier .github/CODEOWNERS ?',
      a: 'Il associe des dossiers et fichiers du dépôt à des équipes ou experts désignés, qui sont automatiquement sollicités pour valider les Pull Requests concernées.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à justifier l’intérêt du Trunk-Based Development ou non-respect de la syntaxe Conventional Commits.'
    },
    {
      cls: 'medium',
      text: 'Bonne configuration des règles de protection de branche sur GitHub et rédaction rigoureuse des commits conventionnels.'
    },
    {
      cls: 'high',
      text: 'Excellente maîtrise de la gouvernance de dépôt à grande échelle, signature GPG des commits maîtrisée et orchestration automatisée de SemVer.'
    }
  ]
};

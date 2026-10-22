/**
 * Pages « examens » et « exercices » du cours « Git & GitHub B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées — Git &amp; GitHub B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences professionnelles et académiques de niveau Bachelor 3 en ingénierie de dépôts et CI/CD.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Modèle Objet Interne, Fusions Avancées &amp; Diagnostic Reflog', [
      '<h4>Partie 1 : Modèle Objet Git &amp; Adressage par Contenu (6 points)</h4>',
      '<ol>',
      '  <li>Détaillez la structure et le rôle des quatre types d’objets fondamentaux de la base Git (blobs, trees, commits, annotated tags). Expliquez pourquoi un blob ne contient ni son nom de fichier ni ses droits d’accès Unix. (3 pts)</li>',
      '  <li>Décrivez la formule exacte du préambule injecté avant le hachage cryptographique SHA-1/SHA-256 d’un objet Git. Pourquoi le format Git garantit-il l’immuabilité absolue de l’historique ? (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Stratégies de Fusion &amp; Réécriture d’Historique (7 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément une fusion <em>Fast-Forward</em> d’une fusion tridirectionnelle (<em>3-Way Merge</em>). Définissez le concept de Lowest Common Ancestor (LCA) et son rôle dans la résolution automatique des différences. (3 pts)</li>',
      '  <li>Énoncez la règle d’or du <code>git rebase</code>. Pourquoi l’opération de rebase modifie-t-elle systématiquement les identifiants SHA de tous les commits rejoués, et quelles en sont les conséquences pour une équipe de développement ? (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Voyage dans le Temps, Reflog &amp; Diagnostic de Régressions (7 points)</h4>',
      '<ol>',
      '  <li>Un développeur exécute par mégarde <code>git reset --hard HEAD~3</code> puis ferme son terminal. La branche semble avoir perdu 3 commits cruciaux. Expliquez comment le <code>git reflog</code> permet de localiser et récupérer l’intégralité des données en toute sécurité. (3 pts)</li>',
      '  <li>Présentez le fonctionnement de <code>git bisect</code>. Démontrez que sa complexité algorithmique est en <em>O(log2 N)</em> pour localiser une régression parmi N commits. Comment automatiser ce processus via un script shell de validation ? (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Modèle objet et séparation blob/tree (3 pts) :</strong> Le blob stocke uniquement la suite brute d’octets représentant le contenu d’un fichier. Le nom du fichier, ses permissions (ex: 100644 pour un fichier standard, 100755 pour un exécutable) et sa hiérarchie de répertoires sont portés par l’objet <em>tree</em> qui référence le hash du blob. Cette séparation permet la déduplication parfaite : deux fichiers identiques situés dans des dossiers différents ou renommés partagent le même blob sans duplication de stockage.</li>',
      '  <li><strong>Formule de hachage et immuabilité (3 pts) :</strong> Le préambule Git est composé de : <code>type taille\\0contenu</code> (ex: <code>blob 14\\0Bonjour monde!</code>). Le hash SHA-1 (40 caractères hexadécimaux) ou SHA-256 (64 caractères) est calculé sur cette séquence complète. Comme chaque commit contient le hash de son arborescence racine (tree) et le hash de ses commits parents, toute modification même minime d’un seul octet ou d’une date propage un changement de hash en cascade jusqu’à la racine du DAG (Merkle Tree), garantissant une intégrité cryptographique absolue.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Fast-Forward vs 3-Way Merge &amp; LCA (3 pts) :</strong> Un Fast-Forward survient lorsque la branche cible n’a pas divergé depuis la création de la branche source : Git déplace simplement le pointeur de référence sans créer de commit de fusion. Un 3-Way Merge intervient en cas de divergence : Git calcule le Lowest Common Ancestor (LCA), c’est-à-dire le dernier ancêtre commun le plus proche dans le graphe DAG, et compare les modifications de la branche source par rapport au LCA et de la branche cible par rapport au LCA pour synthétiser un commit de fusion à deux parents.</li>',
      '  <li><strong>Règle d’or du rebase (4 pts) :</strong> La règle d’or énonce : <em>« Ne jamais rebaser une branche publique déjà partagée avec d’autres collaborateurs »</em>. Le rebase déplace la base d’une branche en réappliquant chaque commit sous forme de patch sur la nouvelle base : comme le parent change, le hash de chaque commit est irrémédiablement recalculé. Si la branche a déjà été poussée sur GitHub, un rebase force un historique divergent pour tous les équipiers, obligeant des fusions enchevêtrées et brisant la synchronisation du dépôt.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Sauvetage via git reflog (3 pts) :</strong> Le journal de références (reflog) consigne localement chaque déplacement du pointeur HEAD (commits, checkouts, resets, merges). Même après un reset hard, les objets commits existent toujours dans la base <code>.git/objects/</code> et ne sont pas effacés immédiatement (ils attendent le garbage collector <code>git gc</code> après 30 jours par défaut). La commande <code>git reflog show HEAD</code> affiche l’historique des positions : il suffit de repérer l’entrée antérieure au reset (ex: <code>HEAD@{1}</code>) et d’exécuter <code>git checkout -b branche-recup HEAD@{1}</code> ou <code>git reset --hard HEAD@{1}</code> pour restaurer instantanément l’intégralité du travail.</li>',
      '  <li><strong>Fonctionnement et automatisation de git bisect (4 pts) :</strong> <code>git bisect</code> effectue une recherche binaire (dichotomie) dans l’intervalle de commits compris entre un commit réputé fonctionnel (<code>good</code>) et un commit avec régression (<code>bad</code>). À chaque étape, Git extrait le commit médian. Avec N commits, l’algorithme isole le commit coupable en au plus <code>ceil(log2(N))</code> étapes (ex: pour 1 000 commits, ~10 étapes suffisent). On peut l’automatiser complètement en fournissant un script de test retournant le code de sortie 0 (succès) ou 1 à 127 (échec) : <code>git bisect run pytest tests/test_regression.py</code>.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal (ET) — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Gouvernance de Dépôt, CI/CD Actions &amp; Sécurité des Dépôts', [
      '<h4>Partie 1 : Gouvernance de Dépôt, Branch Protection &amp; Conventional Commits (7 points)</h4>',
      '<ol>',
      '  <li>Comparez les stratégies de branches Git Flow et Trunk-Based Development. Pour quelles raisons les équipes adoptant l’Intégration et le Déploiement Continus (CI/CD) privilégient-elles le Trunk-Based Development ? (3 pts)</li>',
      '  <li>Détaillez les quatre règles de protection de branche (Branch Protection Rules) indispensables sur la branche principale <code>main</code> d’un dépôt d’entreprise. (2 pts)</li>',
      '  <li>Analysez la norme <em>Conventional Commits 1.0.0</em>. Expliquez comment la structure des messages de commit (<code>type(scope): description</code>) s’articule avec le versionnage sémantique SemVer (MAJOR, MINOR, PATCH) et les ruptures de compatibilité ascendante. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Orchestration CI/CD avec GitHub Actions &amp; Durcissement Sécuritaire (7 points)</h4>',
      '<ol>',
      '  <li>Décrivez la structure hiérarchique d’un workflow GitHub Actions (Workflows, Events, Jobs, Runners, Steps, Actions). Comment fonctionne la directive <code>strategy.matrix</code> et quel est son intérêt pour une suite de tests multi-environnements ? (3 pts)</li>',
      '  <li>Analysez la vulnérabilité critique d’injection de commande shell ci-dessous et proposez la remédiation sécurisée conforme aux bonnes pratiques GitHub Security :<br>' +
      '  <pre><code>- name: Traiter titre PR\n  run: echo "Titre recu : \${{ github.event.pull_request.title }}"</code></pre> (2 pts)</li>',
      '  <li>Expliquez pourquoi le token par défaut <code>GITHUB_TOKEN</code> doit toujours être configuré selon le principe du moindre privilège via le bloc déclaratif <code>permissions:</code>. Donnez un exemple de configuration pour un workflow de simple audit statique. (2 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Hygiène de Dépôt, Git LFS &amp; Purge d’Historique (6 points)</h4>',
      '<ol>',
      '  <li>Pourquoi Git est-il inefficace pour gérer de gros fichiers binaires (vidéos, modèles IA, bases SQLite) ? Expliquez le fonctionnement de Git LFS (pointeurs textuels légers et déport des objets volumineux). (3 pts)</li>',
      '  <li>Un développeur a commité par inadvertance une clé privée AWS dans l’historique d’un dépôt public. Pourquoi la commande <code>git rm cle.pem &amp;&amp; git commit</code> ne résout-elle absolument pas le problème ? Décrivez la procédure complète de remédiation en production avec <code>git-filter-repo</code>. (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Git Flow vs Trunk-Based Development (3 pts) :</strong> Git Flow utilise des branches à longue durée de vie (develop, release, hotfix, feature), ce qui retarde l’intégration, favorise des « conflits d’enfer » (merge hell) et ralentit le déploiement. Trunk-Based Development rassemble tous les développeurs sur une unique branche principale <code>main</code> (le tronc), avec des branches de fonctionnalités très courtes (moins de 24 à 48 heures) fusionnées fréquemment via des Pull Requests légères et des feature flags. Ce modèle évite les dérives de code et permet le déploiement continu automatisé en production plusieurs fois par jour.</li>',
      '  <li><strong>Règles de protection de branche (2 pts) :</strong><br>' +
      '    1. Requis d’une Pull Request avec au moins 1 ou 2 approbations de pairs avant fusion.<br>' +
      '    2. Passage obligatoire de tous les contrôles d’état CI (tests unitaires, linter, analyse SonarQube).<br>' +
      '    3. Signature cryptographique GPG obligatoire de tous les commits pour certifier l’identité des auteurs.<br>' +
      '    4. Historique linéaire strict (interdiction des commits de fusion classiques via rebase ou squash &amp; merge obligatoire).</li>',
      '  <li><strong>Conventional Commits &amp; SemVer (2 pts) :</strong> La norme formalise le message de commit :<br>' +
      '    - Le type <code>fix</code> incrémente le PATCH (bogue résolu, ex: 1.0.1).<br>' +
      '    - Le type <code>feat</code> incrémente le MINOR (nouvelle fonctionnalité compatible, ex: 1.1.0).<br>' +
      '    - La présence de <code>!</code> avant le deux-points (ex: <code>feat!:</code>) ou de la mention textuelle <code>BREAKING CHANGE:</code> dans le corps signale une rupture de compatibilité ascendante et incrémente le MAJOR (ex: 2.0.0). Des outils comme Semantic Release automatisent ainsi le changelog et la création des tags de version.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Structure GitHub Actions &amp; Matrix (3 pts) :</strong> Un workflow YAML réagit à des événements (push, pull_request, schedule). Il orchestre des jobs s’exécutant sur des machines virtuelles (runners). Chaque job contient une suite séquentielle d’étapes (steps) exécutant des scripts shell ou des actions réutilisables. <code>strategy.matrix</code> permet d’instancier dynamiquement un produit cartésien de configurations (ex: Python 3.10, 3.11, 3.12 sur Ubuntu, macOS et Windows), parallélisant les tests sur l’ensemble des matrices de support.</li>',
      '  <li><strong>Injection de commande et remédiation (2 pts) :</strong> La syntaxe <code>\${{ github.event.pull_request.title }}</code> est évaluée avant l’exécution du shell : si un attaquant nomme sa PR <code>"Test\"; rm -rf /; echo \""</code>, le shell bash exécutera la commande arbitraire injectée, compromettant le runner et les secrets du dépôt. La remédiation obligatoire consiste à passer la valeur par une variable d’environnement intermédiaire :<br>' +
      '  <pre><code>- name: Traiter titre PR de facon securisee\n  env:\n    PR_TITLE: \${{ github.event.pull_request.title }}\n  run: echo "Titre recu : \$PR_TITLE"</code></pre></li>',
      '  <li><strong>Permissions GITHUB_TOKEN (2 pts) :</strong> Par défaut sur certains dépôts, le token dispose d’accès d’écriture complets. En cas de faille dans une dépendance ou une action tierce compromise, l’attaquant peut pousser du code malveillant sur le dépôt ou altérer les releases. Pour un audit statique, on restreint explicitement les droits au strict minimum :<br>' +
      '  <pre><code>permissions:\n  contents: read\n  pull-requests: read</code></pre></li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Git LFS (3 pts) :</strong> Git standard conserve l’intégralité des versions de chaque fichier dans son historique sous forme compressée : modifier plusieurs fois un fichier de 500 Mo gonfle la taille du dossier <code>.git</code> de plusieurs gigaoctets, rendant chaque <code>clone</code> prohibitif pour l’équipe. Git LFS (Large File Storage) remplace le fichier volumineux dans l’arbre Git par un micro-pointeur textuel de quelques octets contenant son identifiant SHA-256 et sa taille. Le binaire réel est téléversé séparément sur un serveur de stockage d’objets dédié et n’est téléchargé en local que pour le commit actif au checkout.</li>',
      '  <li><strong>Purge d’un secret avec git-filter-repo (3 pts) :</strong> Un <code>git rm</code> crée simplement un nouveau commit supprimant le fichier dans la version courante ; la clé reste présente dans tous les commits antérieurs de l’historique et est accessible à quiconque clone le dépôt. Pour éliminer définitivement le secret :<br>' +
      '    1. Révoquer immédiatement la clé privée auprès d’AWS (première mesure d’urgence vitale !).<br>' +
      '    2. Utiliser <code>git-filter-repo --path cle.pem --invert-paths</code> ou <code>--replace-text</code> pour réécrire l’intégralité du DAG en purgeant l’objet de tous les arbres et commits.<br>' +
      '    3. Forcer la mise à jour des références distantes : <code>git push origin --force --all --tags</code>.<br>' +
      '    4. Prévenir l’ensemble des collaborateurs de cloner une copie neuve du dépôt assaini.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento des formules' }, { href: 'exercices.html', label: 'Accéder aux exercices pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs corrigés et barème détaillé du cours Git & GitHub B3 : Contrôle Continu et Examen Terminal.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Catalogue des Exercices ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices de programmation' }
  ]);

  const exercises = [
    { id: 'gh3-c1-e1', ch: 1, title: 'Calculateur du hash SHA-1 d’objet Git (git hash-object)', level: 'n1', lang: 'Bash', desc: 'Calculer le hash SHA-1 officiel avec injection du préambule standard header null-byte.' },
    { id: 'gh3-c1-e2', ch: 1, title: 'Parseur de structure d’arbre Git (git ls-tree)', level: 'n2', lang: 'Bash', desc: 'Décoder et filtrer les entrées d’un arbre Git (mode, type, hash SHA-1 et chemin).' },
    { id: 'gh3-c1-e3', ch: 1, title: 'Résolveur de références symboliques et pointeur HEAD (git rev-parse)', level: 'n3', lang: 'Bash', desc: 'Résoudre la chaîne de pointeurs de branches symboliques jusqu’au commit final.' },

    { id: 'gh3-c2-e1', ch: 2, title: 'Classificateur de stratégie de fusion : Fast-Forward vs 3-Way Merge (LCA)', level: 'n1', lang: 'Bash', desc: 'Identifier le Lowest Common Ancestor (LCA) et déterminer si un Fast-Forward est possible.' },
    { id: 'gh3-c2-e2', ch: 2, title: 'Simulateur de rebase interactif (git rebase -i)', level: 'n2', lang: 'Bash', desc: 'Simuler le traitement des directives pick, squash, drop et reword sur un historique.' },
    { id: 'gh3-c2-e3', ch: 3, title: 'Résolveur formel de conflits de fusion tridirectionnelle', level: 'n3', lang: 'Bash', desc: 'Effectuer l’arbitrage ligne par ligne entre ancêtre commun, branche locale et distante.' },

    { id: 'gh3-c3-e1', ch: 3, title: 'Analyseur de journal de références (git reflog) et sauvetage de commits', level: 'n1', lang: 'Bash', desc: 'Identifier les commits orphelins (dangling) détachés de tout pointeur de branche.' },
    { id: 'gh3-c3-e2', ch: 3, title: 'Moteur de recherche dichotomique de régressions (git bisect)', level: 'n2', lang: 'Bash', desc: 'Calculer les étapes binaires de bisect pour isoler le premier commit défaillant.' },
    { id: 'gh3-c3-e3', ch: 3, title: 'Gestionnaire de pile de remisage (git stash LIFO)', level: 'n3', lang: 'Bash', desc: 'Gérer la pile stash (push, pop, apply, drop) avec gestion des modifications de fichiers.' },

    { id: 'gh3-c4-e1', ch: 4, title: 'Auditeur de flux de travail : Git Flow vs GitHub Flow vs Trunk-Based', level: 'n1', lang: 'Bash', desc: 'Vérifier la conformité des noms et cycles de vie de branches selon le modèle d’équipe.' },
    { id: 'gh3-c4-e2', ch: 4, title: 'Évaluateur de règles de protection de branche (Branch Protection Rules)', level: 'n2', lang: 'Bash', desc: 'Valider les conditions de fusion (approbations, CI, signature GPG, historique linéaire).' },
    { id: 'gh3-c4-e3', ch: 4, title: 'Analyseur sémantique de commits selon Conventional Commits', level: 'n3', lang: 'Bash', desc: 'Vérifier la conformité formelle des messages selon la spécification Conventional Commits 1.0.0.' },

    { id: 'gh3-c5-e1', ch: 5, title: 'Auditeur de syntaxe et structure de workflow GitHub Actions', level: 'n1', lang: 'Bash', desc: 'Vérifier la présence des blocs obligatoires on, jobs et steps d’un fichier workflow.' },
    { id: 'gh3-c5-e2', ch: 5, title: 'Générateur de combinaisons matricielles (strategy.matrix)', level: 'n2', lang: 'Bash', desc: 'Calculer le produit cartésien des axes OS et versions avec inclusions/exclusions.' },
    { id: 'gh3-c5-e3', ch: 5, title: 'Détecteur de failles de sécurité et injections dans GitHub Actions', level: 'n3', lang: 'Bash', desc: 'Identifier les contextes non nettoyés dans les blocs run: et les fuites de secrets.' },

    { id: 'gh3-c6-e1', ch: 6, title: 'Générateur de pointeurs Git LFS (Large File Storage)', level: 'n1', lang: 'Bash', desc: 'Générer le texte formel du pointeur LFS v1 avec calcul du hash SHA-256 du fichier.' },
    { id: 'gh3-c6-e2', ch: 6, title: 'Vérificateur de hook pre-commit de sécurité et qualité de code', level: 'n2', lang: 'Bash', desc: 'Détecter les conflits non résolus et secrets avant de valider l’exécution du commit.' },
    { id: 'gh3-c6-e3', ch: 6, title: 'Purgeur d’historique de secrets (git-filter-repo)', level: 'n3', lang: 'Bash', desc: 'Simuler le nettoyage et le masquage de secrets fuités dans l’intégralité de l’historique.' }
  ];

  const cardsHtml = exercises.map(ex => [
    '    <article class="card card--exercise">',
    '      <div class="card__head">',
    '        <span class="badge badge--' + ex.level + '">' + (ex.level === 'n1' ? 'Fondamental' : ex.level === 'n2' ? 'Intermédiaire' : 'Avancé') + '</span>',
    '        <span class="card__num">Module ' + ex.ch + ' • ' + ex.id + '</span>',
    '      </div>',
    '      <h3 class="card__title"><a href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">' + ex.title + '</a></h3>',
    '      <p class="card__desc">' + ex.desc + '</p>',
    '      <div class="card__foot">',
    '        <span class="card__time">' + ic('terminal') + ' Langage : ' + ex.lang + '</span>',
    '        <a class="btn btn--sm" href="chapitres/chapitre' + ex.ch + '.html#' + ex.id + '">Résoudre dans le module ' + ic('arrow-right') + '</a>',
    '      </div>',
    '    </article>'
  ].join('\n')).join('\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Ateliers Pratiques de Code Lab — Git &amp; GitHub B3</h1>',
    '  <p class="lead">18 ateliers de pratique interactive (Bash) intégrés directement dans les modules de cours, corrigés avec tests d’évaluation automatisés.</p>',
    '',
    '  <div class="grid grid--2">' + cardsHtml + '</div>',
    '',
    chnav({ href: 'examens.html', label: 'Revenir aux épreuves d’examen' }, { href: 'chapitres/chapitre1.html', label: 'Démarrer le module 1' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Catalogue des exercices — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de programmation en Python 3 du cours Git & GitHub B3.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

/**
 * Chapitre 3 du cours « Git & GitHub B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 3,
  title: 'Diagnostic, Reflog &amp; Sauvetage de Données',
  short: 'Reflog &amp; Diagnostic Bisect',
  toc: 'Journal de références git reflog, sauvetage de commits orphelins (dangling), recherche dichotomique de régressions avec git bisect, gestion de la pile LIFO git stash et intégrité avec git fsck.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Dans le cycle de vie d’un projet logiciel, l’erreur humaine est inévitable : une commande destructive exécutée par inadvertance (git reset --hard, suppression accidentelle d’une branche non fusionnée), ou l’apparition d’un bogue silencieux introduit il y a plusieurs mois parmi des centaines de commits. L’ingénieur de niveau Bachelor 3 ne panique pas face à ces incidents : il sait que Git ne détruit presque jamais immédiatement les données. Grâce au journal de références (git reflog) et aux outils d’inspection d’intégrité (git fsck), chaque état passé reste récupérable. De plus, la recherche dichotomique automatisée (git bisect) permet d’identifier le commit exact responsable d’une régression en un temps logarithmique O(log2 N). Maîtriser ces outils de sauvetage et de diagnostic fait la différence entre des journées de travail perdues et une remédiation en quelques secondes.',
  objectives: [
    'comprendre le fonctionnement interne du journal de références local (git reflog) et son cycle de rétention ;',
    'restaurer des commits orphelins (dangling commits) et des branches supprimées par erreur après un reset destructif ;',
    'analyser l’intégrité du magasin d’objets avec la commande de bas niveau git fsck ;',
    'maîtriser la recherche dichotomique binaire de régressions avec git bisect en mode interactif et automatisé (git bisect run) ;',
    'manipuler la pile de remisage LIFO git stash (push, pop, apply, drop, list) et inspecter ses commits internes ;',
    'développer en Python 3 des analyseurs de reflog, des moteurs de bisect binaire et des gestionnaires de pile stash.'
  ],
  sections: [
    {
      title: 'Le Journal de Références : git reflog &amp; le Filet de Sécurité Ultime',
      html: [
        '<p>Alors que <code>git log</code> parcourt l’arbre des commits accessibles depuis la référence active en suivant les liens parents, <strong><code>git reflog</code> (Reference Log)</strong> consigne l’historique chronologique de tous les déplacements du pointeur <code>HEAD</code> et des références de branches sur la machine locale.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Fonctionnement &amp; Localisation</h4>',
        '    <p>Chaque fois que HEAD se déplace (création d’un commit, changement de branche, rebase, merge, reset), une entrée est inscrite dans <code>.git/logs/HEAD</code>.</p>',
        '    <p>La syntaxe de navigation temporelle est redoutable :</p>',
        '    <ul>',
        '      <li><code>HEAD@{0}</code> : Position actuelle de HEAD.</li>',
        '      <li><code>HEAD@{1}</code> : Position de HEAD juste avant la dernière commande.</li>',
        '      <li><code>HEAD@{5}</code> : Position il y a 5 opérations.</li>',
        '      <li><code>main@{yesterday}</code> : État de la branche main hier.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Procédure de Sauvetage après « reset --hard »</h4>',
        '    <p>Scénario critique : un développeur exécute par erreur <code>git reset --hard HEAD~3</code>.</p>',
        '    <ol>',
        '      <li>Exécuter <code>git reflog show HEAD</code> pour identifier l’entrée juste avant le reset (ex: <code>HEAD@{1}</code> avec son SHA).</li>',
        '      <li>Restaurer immédiatement l’état :<br><code>git checkout -b rescue HEAD@{1}</code><br>ou remettre la branche courante à niveau :<br><code>git reset --hard HEAD@{1}</code>.</li>',
        '    </ol>',
        '    <p>Le travail est intégralement restauré, sans aucune perte de code !</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Objets Orphelins (Dangling) &amp; Nettoyage Garbaged avec git fsck',
      html: [
        '<p>Dans Git, lorsqu’une branche est supprimée ou qu’un commit est écrasé lors d’un reset, les objets commits et blobs ne sont <strong>pas effacés physiquement</strong> de <code>.git/objects/</code>. Ils deviennent simplement inaccessibles depuis les branches actives (objets orphelins ou <em>dangling objects</em>).</p>',
        box('standard', 'Cycle de Vie des Objets &amp; Garbage Collector (git gc)', [
          '<p>Git conserve les objets orphelins par défaut pendant un délai de grâce configurable :</p>',
          '<ul>',
          '  <li>Les entrées du reflog sont conservées pendant <strong>90 jours</strong> pour les objets accessibles et <strong>30 jours</strong> pour les objets inaccessibles (<code>gc.reflogExpireUnreachable</code>).</li>',
          '  <li>Tant que ce délai n’est pas écoulé, le ramasse-miettes (<code>git gc</code>) ne supprime pas les données.</li>',
          '  <li>La commande de plomberie <code>git fsck --lost-found</code> scanne la base d’objets, identifie tous les commits orphelins et les exporte dans <code>.git/lost-found/commit/</code> pour inspection.</li>',
          '</ul>'
        ])
      ].join('\n')
    },
    {
      title: 'Isolation Dichotomique de Régressions : La Puissance de git bisect',
      html: [
        '<p>Lorsqu’une régression apparaît en production dans une application composée de centaines de commits, inspecter manuellement chaque commit est fastidieux et inefficace. <strong><code>git bisect</code></strong> applique l’algorithme de recherche binaire (dichotomie) pour diviser l’espace de recherche par deux à chaque itération.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Complexité Algorithmique</h4>',
        '    <p>Pour un historique de $N$ commits, le nombre maximal d’étapes d’évaluation nécessaires est borné par :</p>',
        '    <p style="font-size:1.15rem;font-weight:bold;text-align:center;">$\\lceil \\log_2(N) \\rceil$</p>',
        '    <p>Exemple : pour 1 024 commits, <strong>10 tests seulement</strong> suffisent pour désigner de façon certaine le commit fautif !</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Workflow Interactif &amp; Automatisé</h4>',
        '    <pre><code># 1. Démarrer la session\ngit bisect start\ngit bisect bad HEAD        # Le bogue est présent ici\ngit bisect good v2.1.0      # Ici tout fonctionnait\n\n# 2. Mode automatique avec script de test\ngit bisect run npm test</code></pre>',
        '    <p>Si le script retourne le code de sortie <code>0</code>, Git marque le commit comme <code>good</code> ; s’il retourne <code>1..127</code>, il le marque <code>bad</code>. Dès l’isolation terminée, <code>git bisect reset</code> remet la copie de travail à son état initial.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Gestion Avancée de la Pile de Remisage : L’Anatomie de git stash',
      html: [
        '<p>Le remisage (<code>git stash</code>) permet de mettre de côté des modifications non terminées dans la copie de travail et l’index pour basculer sur une urgence (hotfix) sans créer de commit provisoire « wip » polluant l’arbre.</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Commande</th><th>Rôle Technique &amp; Comportement</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr><td><code>git stash push -m "msg"</code></td><td>Empile l’état actuel de l’index et de la copie de travail avec un libellé clair.</td></tr>',
        '    <tr><td><code>git stash list</code></td><td>Affichez la pile LIFO des remises stockées (<code>stash@{0}</code>, <code>stash@{1}</code>, ...).</td></tr>',
        '    <tr><td><code>git stash apply stash@{N}</code></td><td>Réapplique les modifications de la remise sans la supprimer de la pile.</td></tr>',
        '    <tr><td><code>git stash pop</code></td><td>Réapplique la remise la plus récente (<code>stash@{0}</code>) et la dépile immédiatement.</td></tr>',
        '    <tr><td><code>git stash drop stash@{N}</code></td><td>Supprimez définitivement une remise spécifique de la pile.</td></tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Traque d’un Bogue Fantôme via git bisect automatisé',
  method: [
    'Étape 1 : Écrire un script de test unitaire déterministe (test.sh ou pytest) qui retourne 0 quand le code est sain et 1 en cas de bogue.',
    'Étape 2 : Identifier le dernier tag de version ou commit réputé 100% fonctionnel (ex: v1.0.0).',
    'Étape 3 : Initialiser bisect avec git bisect start HEAD v1.0.0 (HEAD étant défaillant et v1.0.0 fonctionnel).',
    'Étape 4 : Lancer l’automatisation : git bisect run bash ./test.sh.',
    'Étape 5 : Noter le SHA et l’auteur du premier commit fautif affiché par Git.',
    'Étape 6 : Clôturer la session de recherche avec git bisect reset et rédiger le correctif ciblé.'
  ],
  summary: [
    'git reflog enregistre localement chaque mouvement de HEAD dans .git/logs/HEAD.',
    'Après un reset --hard malencontreux, le reflog permet de restaurer le travail en quelques secondes.',
    'Les objets orphelins (dangling) restent stockés sur disque pendant 30 à 90 jours avant purge par git gc.',
    'git fsck inspecte l’intégrité du graphe et répertorie les commits détachés dans lost-found.',
    'git bisect divise l’espace de recherche par 2 à chaque étape (complexité en O(log2 N)).',
    'git bisect run automatise la détection grâce au code retour d’un script de test (0 = good, non-zéro = bad).',
    'git stash gère une pile LIFO de remises pour mettre de côté le travail en cours sans commit prématuré.'
  ],
  checklist: [
    'Je sais consulter et interpréter la sortie chronologique de git reflog show HEAD.',
    'Je suis capable de récupérer une branche supprimée par erreur à l’aide du reflog.',
    'Je comprends la différence de rétention entre objets accessibles et objets orphelins (dangling).',
    'Je maîtrise la syntaxe et les arguments de git bisect (start, bad, good, reset).',
    'Je sais automatiser git bisect avec un script de test retournant des codes de sortie standard.',
    'Je sais manipuler la pile git stash (push, list, pop, apply, drop).'
  ],
  notions: [
    'Journal de références (git reflog)',
    'Objets orphelins (Dangling commits)',
    'Intégrité de dépôt (git fsck)',
    'Recherche dichotomique (git bisect)',
    'Automatisation via git bisect run',
    'Pile de remisage LIFO (git stash)',
    'Garbage Collector Git (git gc)',
    'Délai de grâce de rétention des objets'
  ],
  pitfalls: [
    'Croire que git reflog est partagé sur GitHub (le reflog est strictement local à la machine du développeur).',
    'Penser qu’un git reset --hard supprime immédiatement et définitivement les commits du disque.',
    'Fournir un script pour git bisect run qui ne retourne pas 0 en cas de succès (cela fausserait tout l’aiguillage binaire).',
    'Confondre git stash pop (qui supprime la remise) et git stash apply (qui la laisse dans la pile).'
  ],
  questions: [
    {
      stem: 'Quelle information capitale le journal « git reflog » enregistre-t-il que « git log » n’affiche pas ?',
      opts: [
        'Les mots de passe saisis lors du push distant',
        'L’historique chronologique local de tous les mouvements du pointeur HEAD, y compris les commits orphelins',
        'Les adresses IP des serveurs distants connectés',
        'Les signatures cryptographiques GPG des tags annotés'
      ],
      correct: 1,
      exp: 'git log ne parcourt que les commits connectés à la branche courante. git reflog enregistre chronologiquement chaque déplacement de HEAD sur la machine locale, permettant de retrouver les commits détachés.'
    },
    {
      stem: 'Où les entrées du reflog pour le pointeur HEAD sont-elles physiquement stockées sur le disque ?',
      opts: [
        'Dans le fichier .git/logs/HEAD',
        'Dans .git/objects/reflog.db',
        'Sur le serveur distant GitHub dans l’API GraphQL',
        'Dans le fichier binaire .git/index'
      ],
      correct: 0,
      exp: 'Git écrit chaque transition dans des fichiers texte situés dans le sous-dossier masqué .git/logs/ (notamment .git/logs/HEAD et .git/logs/refs/heads/).'
    },
    {
      stem: 'Combien d’étapes de test au maximum sont nécessaires avec « git bisect » pour localiser une régression parmi 500 commits ?',
      opts: [
        '500 étapes',
        '250 étapes',
        '9 étapes',
        '50 étapes'
      ],
      correct: 2,
      exp: 'La recherche dichotomique a une complexité logarithmique en ceil(log2(500)) = ceil(8.96) = 9 étapes.'
    },
    {
      stem: 'Quel code de sortie doit renvoyer un script de test exécuté par « git bisect run » pour indiquer que le commit actuel est sain (sans bogue) ?',
      opts: [
        'Le code 0',
        'Le code 1',
        'Le code 128',
        'Le code -1'
      ],
      correct: 0,
      exp: 'Selon la convention Unix standard et la spécification de git bisect run, le code de sortie 0 signifie que le test réussit (commit « good ») ; un code entre 1 et 127 indique un échec (commit « bad »).'
    },
    {
      stem: 'Par défaut, pendant combien de temps Git conserve-t-il les objets inaccessibles (unreachable/dangling) avant que « git gc » ne les purge définitivement ?',
      opts: [
        '24 heures',
        '30 jours',
        '1 an',
        'Ils ne sont jamais purgés'
      ],
      correct: 1,
      exp: 'Par défaut, la directive gc.reflogExpireUnreachable conserve les objets orphelins pendant 30 jours, offrant une marge de sécurité confortable pour récupérer une fausse manipulation.'
    },
    {
      stem: 'Quelle commande permet de restaurer la dernière remise enregistrée tout en la supprimant de la pile de remisage ?',
      opts: [
        'git stash apply',
        'git stash pop',
        'git stash restore',
        'git stash pull'
      ],
      correct: 1,
      exp: 'git stash pop réapplique les modifications du stash supérieur (stash@{0}) et l’élimine immédiatement de la pile s’il n’y a pas eu de conflit lors de l’application.'
    },
    {
      stem: 'À quoi sert la commande de plomberie « git fsck --lost-found » ?',
      opts: [
        'À supprimer tous les fichiers non suivis de la copie de travail',
        'À vérifier l’intégrité de la base d’objets et copier les commits orphelins dans .git/lost-found/',
        'À réparer les dépendances corrompues dans package.json',
        'À synchroniser les commits orphelins avec le miroir GitHub'
      ],
      correct: 1,
      exp: 'git fsck (File System Check) contrôle la cohérence du magasin d’objets et l’option --lost-found extrait tous les objets orphelins inaccessibles pour permettre leur analyse.'
    },
    {
      stem: 'Si vous avez exécuté par erreur « git reset --hard HEAD~2 », quelle commande permet de revenir immédiatement à l’état antérieur ?',
      opts: [
        'git reset --hard HEAD@{1}',
        'git revert HEAD',
        'git checkout --undo',
        'git clean -fd'
      ],
      correct: 0,
      exp: 'HEAD@{1} correspond à la position de HEAD juste avant l’exécution du reset. Faire un git reset --hard HEAD@{1} réaligne instantanément la branche sur son état précédent.'
    }
  ],
  flashcards: [
    {
      q: 'Quelle est la différence fondamentale entre git log et git reflog ?',
      a: 'git log parcourt l’historique des commits reliés à la branche courante ; git reflog consigne chronologiquement tous les mouvements du pointeur HEAD sur la machine locale.'
    },
    {
      q: 'Qu’est-ce qu’un « dangling commit » (commit orphelin) ?',
      a: 'Un commit existant physiquement dans la base d’objets .git/objects/ mais vers lequel aucune branche ni tag ne pointe directement ou indirectement.'
    },
    {
      q: 'Quelle est la complexité algorithmique de git bisect ?',
      a: 'O(log2 N), car il applique une recherche binaire (dichotomique) en divisant par deux le nombre de commits à inspecter à chaque étape.'
    },
    {
      q: 'Que fait la commande « git bisect reset » ?',
      a: 'Elle met fin à la session de recherche dichotomique et replace la copie de travail sur la branche et le commit où se trouvait le développeur avant de lancer bisect.'
    },
    {
      q: 'Pourquoi le reflog ne peut-il pas être partagé lors d’un git push ?',
      a: 'Car le reflog est un journal strictement local retraçant les actions propres à la session de travail de chaque développeur sur son poste de travail.'
    },
    {
      q: 'Quelle est la structure de données utilisée par git stash ?',
      a: 'Une pile LIFO (Last In, First Out) où la remise la plus récente est référencée à l’indice 0 sous le nom stash@{0}.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Panique face à un reset dur ou méconnaissance du reflog et du fonctionnement de git bisect.'
    },
    {
      cls: 'medium',
      text: 'Bonne utilisation du reflog pour récupérer des commits perdus et manipulation de base de git stash et git bisect interactif.'
    },
    {
      cls: 'high',
      text: 'Maîtrise complète de git fsck, automatisation experte de git bisect run avec scripts de test et compréhension approfondie du ramasse-miettes git gc.'
    }
  ]
};

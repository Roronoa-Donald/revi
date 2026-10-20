/**
 * Chapitres 4 à 6 du cours de Git B1.
 *
 * Chapitre 4 : branches et fusions (workflow professionnel, TP3).
 * Chapitre 5 : dépôt distant (clone, push, pull, fetch — TP2 et TP4).
 * Chapitre 6 : stash, gitignore en pratique, archive et publication (TP5, TP4).
 *
 * Les ateliers de code (trois exercices Bash par chapitre) sont injectés avant
 * le QCM par `scripts/generate-code-labs.js` à partir de
 * `server/exercises/b1-git.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Branches : isoler, fusionner, supprimer',
    short: 'Branches',
    toc: 'Créer et basculer (checkout -b), lister les branches, fusionner avec merge, fast-forward et conflits.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le workflow professionnel du TP3 est formel : interdiction de travailler directement sur main. ' +
      'Chaque fonctionnalité vit sur sa branche, se développe tranquillement, puis fusionne dans main. ' +
      'Ce chapitre fait passer du « je commite tout sur main » au cycle main → feature → merge → main.',

    objectives: [
      'créer une branche et s\'y déplacer (branch + checkout, ou checkout -b) ;',
      'lister les branches locales et distantes ;',
      'fusionner une branche dans une autre et reconnaître un fast-forward ;',
      'identifier l\'origine d\'un conflit et choisir entre annulation et résolution.'
    ],

    sections: [
      {
        title: 'Créer et basculer',
        html: [
          '<p>Une <strong>branche</strong> est un pointeur mobile sur un commit : créer une branche ' +
          'n\'écrase rien, cela pose une étiquette. Deux façons, équivalentes :</p>',
          '<pre><code>git branch 15_query_database        # créer\n' +
          'git checkout 15_query_database      # puis se déplacer dessus\n' +
          '\n' +
          'git checkout -b 15_query_database   # créer ET se déplacer en une commande</code></pre>',
          '<p>Le TP3 l\'utilise : <code>git checkout -b feature-ajout-tache</code> depuis main — la ' +
          'fonctionnalité se développe maintenant hors du fil principal. La vérification : ' +
          '<code>git branch</code> liste les branches locales, la courante marquée d\'une étoile.</p>',
          box('mnemo', 'Mnémotechnique — « -b = branch + basculer »', 'pin',
            '    <p>checkout -b est la contraction du duo branch/checkout : la lettre b fait les deux ' +
            'd\'un coup. C\'est la forme du workflow professionnel, parce qu\'on ne crée presque jamais ' +
            'une branche sans aller travailler dessus aussitôt.</p>')
        ].join('\n')
      },
      {
        title: 'Changer de branche proprement',
        html: [
          '<p><code>git checkout nom</code> change la branche courante — possible seulement s\'il n\'y a ' +
          'pas de modification dans la copie de travail (fichier ajouté, modifié ou supprimé). Pour ' +
          'forcer le changement, deux solutions :</p>',
          '<table>\n' +
          '    <tr><th>Solution</th><th>Effet</th></tr>\n' +
          '    <tr><td><code>git checkout -f nom</code></td><td>force ; les fichiers modifiés sont définitivement perdus</td></tr>\n' +
          '    <tr><td><code>git stash</code></td><td>remise temporaire ; rien ne se perd (chapitre 6)</td></tr>\n' +
          '  </table>',
          '<p>Listes utiles : <code>git branch -v</code> pour les branches locales avec leur dernier ' +
          'commit, <code>git branch -r</code> pour les branches distantes. Suppression : ' +
          '<code>git branch -d nom</code> — le TP3 supprime la branche après fusion.</p>',
          box('pitfall', 'Piège — le checkout qui jette', 'warning',
            '    <p>checkout -f écrase les modifications non commitées, sans demande de confirmation. ' +
            'Avant de forcer un changement de branche, se demander ce que valent les fichiers modifiés : ' +
            'souvent, git stash est la réponse honnête.</p>')
        ].join('\n')
      },
      {
        title: 'Fusionner : merge et fast-forward',
        html: [
          '<p>Fusionner la branche feature dans main :</p>',
          '<pre><code>git checkout main\n' +
          'git merge feature-ajout-tache</code></pre>',
          '<p>Cas attendu du TP3 : le <strong>fast-forward</strong>. Quand main n\'a pas bougé depuis la ' +
          'création de la branche, la fusion avance simplement le pointeur : les commits de la branche ' +
          'deviennent des commits de main comme s\'ils y avaient toujours été. <strong>Il n\'y a plus ' +
          'trace de la branche</strong> dans l\'historique — impossible de voir quels commits ' +
          'constituaient la fonctionnalité.</p>',
          '<p>L\'option <code>--no-ff</code> (no fast-forward) force la création d\'un commit de fusion ' +
          'même quand le fast-forward est possible : l\'existence de la branche de fonctionnalité reste ' +
          'visible. Un merge en cours s\'annule avec <code>git merge --abort</code>.</p>',
          box('mnemo', 'Mnémotechnique — « ff avance, no-ff grave »', 'pin',
            '    <p>fast-forward : le pointeur glisse, l\'historique reste droit, la branche disparaît. ' +
            'no-ff : un commit de fusion grave la fonctionnalité dans l\'historique. Choix d\'équipe : ' +
            'traçabilité contre simplicité de lecture.</p>')
        ].join('\n')
      },
      {
        title: 'Conflits : pourquoi, comment',
        html: [
          '<p>Le conflit naît quand <strong>deux branches modifient la même zone d\'un même fichier</strong> : ' +
          'Git ne peut pas choisir à votre place. C\'est exactement le scénario des TP2 et TP5 : deux ' +
          'développeurs modifient main.py, la fusion s\'arrête, le fichier porte des marqueurs :</p>',
          '<pre><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD\n' +
          'print("Bienvenue dans le gestionnaire de tâches version finale")\n' +
          '=======\n' +
          'print("Bienvenue dans l\'application de gestion des tâches")\n' +
          '&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-message</code></pre>',
          '<p>Lecture des marqueurs : <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> ouvre la version de la ' +
          'branche courante, <code>=======</code> sépare, <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; branche</code> ' +
          'ferme la version de la branche fusionnée. La résolution se fait à la main : garder l\'une, ' +
          'l\'autre, ou les combiner — puis valider :</p>',
          '<pre><code>git add main.py\n' +
          'git commit -m "Résolution du conflit entre A et B"</code></pre>',
          '<p>Pour les fichiers binaires, pas de résolution à la main : choisir entre l\'ancienne version ' +
          '(<code>git checkout --ours fichier</code>) et la nouvelle (<code>git checkout --theirs ' +
          'fichier</code>).</p>',
          box('tech', 'Le fil du TP3 en une séquence', 'terminal',
            '    <p>checkout main → checkout -b feature-ajout-tache → deux commits atomiques → ' +
            'checkout main → merge feature → push origin main → git log --oneline --graph --all → ' +
            'branch -d feature. Le cycle complet du workflow professionnel.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que fait git checkout -b nom ?', opts: ['Supprime la branche', 'Crée la branche et s\'y déplace', 'Renomme la branche courante'], correct: 1, exp: '-b combine branch (créer) et checkout (basculer).' },
      { stem: 'Dans le fast-forward, que devient la branche fusionnée dans l\'historique ?', opts: ['Elle reste visible', 'Il n\'y a plus trace d\'elle', 'Elle devient une étiquette'], correct: 1, exp: 'Les commits s\'enchaînent comme s\'ils avaient toujours été sur main : plus de trace de la branche.' },
      { stem: 'Quelle option force la création d\'un commit de fusion ?', opts: ['--force', '--no-ff', '--abort'], correct: 1, exp: '--no-ff crée l\'objet commit même quand le fast-forward est possible : la branche reste visible.' },
      { stem: 'Un merge en cours s\'annule avec…', opts: ['git merge --abort', 'git reset --hard', 'git checkout -f'], correct: 0, exp: 'merge --abort remet la branche dans l\'état d\'avant fusion.' },
      { stem: 'Un conflit naît quand…', opts: ['deux branches existent', 'deux modifications touchent la même zone d\'un même fichier', 'un push est refusé'], correct: 1, exp: 'Git ne choisit pas à votre place entre deux versions d\'une même zone.' },
      { stem: 'Dans les marqueurs de conflit, HEAD désigne…', opts: ['la version de la branche courante', 'la version de la branche fusionnée', 'le dernier push'], correct: 0, exp: 'HEAD est la version courante ; la section après ======= vient de la branche fusionnée.' },
      { stem: 'Que fait git branch -d nom ?', opts: ['Bascule dessus', 'Supprime la branche', 'La fusionne'], correct: 1, exp: 'branch -d supprime — le TP3 le fait après fusion de la branche.' },
      { stem: 'checkout refuse de changer de branche quand…', opts: ['la branche n\'existe pas', 'la copie de travail porte des modifications', 'il y a un dépôt distant'], correct: 1, exp: 'Changer de branche écraserait les modifications : -f les perd, stash les garde.' }
    ],

    pitfalls: [
      '<strong>Travailler directement sur main</strong> : l\'interdiction n°1 du workflow du TP3.',
      '<strong>checkout -f par impatience</strong> : les modifications non commitées disparaissent.',
      '<strong>Fast-forward confondu avec fusion propre</strong> : ff efface la trace de la branche.',
      '<strong>Marqueurs de conflit commités</strong> : &lt;&lt;&lt;&lt;&lt;&lt;&lt; partis dans l\'historique par un add aveugle.',
      '<strong>Résoudre sans comprendre</strong> : choisir un côté au hasard fait perdre un travail.'
    ],

    methodTitle: 'Résoudre un conflit sans panique',
    method: [
      '<strong>Reconnaître l\'état</strong> : merge arrêté, fichier marqué par les chevrons.',
      '<strong>Relire les deux versions</strong> : HEAD (courante) et la branche fusionnée.',
      '<strong>Décider du contenu final</strong> : garder, combiner, ou réécrire — jamais au hasard.',
      '<strong>Nettoyer les marqueurs</strong> : plus aucun chevron dans le fichier.',
      '<strong>Valider la résolution</strong> : add puis commit dédié au conflit.'
    ],

    summary: [
      'checkout -b crée et bascule en une commande ; la courante porte l\'étoile dans git branch.',
      'Changer de branche exige une copie propre : -f perd les modifications, stash les garde.',
      'merge avance par fast-forward quand main n\'a pas bougé — sans trace de la branche.',
      '--no-ff grave un commit de fusion : l\'existence de la fonctionnalité reste lisible.',
      'Conflit = même zone, deux versions ; les chevrons se lisent, se résolvent, s\'add puis se commitent.'
    ],

    checklist: [
      'Je crée une branche de fonctionnalité et je m\'y place en une commande.',
      'Je fusionne dans main et je reconnais un fast-forward.',
      'Je lis des marqueurs de conflit et produis la version combinée.',
      'Je supprime une branche après fusion et vérifie le graphe avec log --graph.'
    ],

    notions: ['branche', 'checkout', 'checkout -b', 'merge', 'fast-forward', '--no-ff', 'conflit', 'marqueurs', '--ours', '--theirs'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le TP3 (branches puis fusion) en machine virtuelle.' },
      { cls: 'mid', text: '50–69 % — Dessine deux historiques : fast-forward et --no-ff.' },
      { cls: 'good', text: '70–89 % — Solide : résous un conflit à trois versions combinées.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, le dépôt distant.' }
    ],

    flashcards: [
      { q: 'Créer une branche et s\'y placer ?', a: 'git checkout -b nom (équivaut à git branch nom puis git checkout nom).' },
      { q: 'Qu\'est-ce qu\'un fast-forward ?', a: 'Une fusion qui avance simplement le pointeur de main : aucun commit de fusion, plus de trace de la branche.' },
      { q: 'Pourquoi --no-ff ?', a: 'Pour créer un commit de fusion même quand ff est possible : la branche de fonctionnalité reste visible dans l\'historique.' },
      { q: 'Les marqueurs de conflit ?', a: '<<<<<<< HEAD (version courante), =======, >>>>>>> branche (version fusionnée) : à éditer puis add + commit.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Dépôt distant : clone, push, pull, fetch',
    short: 'Distant',
    toc: 'origin et les liens distants, pousser ses commits, récupérer avec pull (fetch + merge), gérer un rejet.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le TP2 passe en binôme : le dépôt de l\'étudiant A part sur GitHub, l\'étudiant B clone, et les ' +
      'deux modifient le même fichier. Premier push refusé, premier pull, premier conflit — le cycle ' +
      'complet de la collaboration. Ce chapitre explique ce que chaque commande déplace entre les deux ' +
      'dépôts.',

    objectives: [
      'lier un dépôt local à un dépôt distant avec git remote add origin ;',
      'pousser ses commits avec git push et comprendre un rejet ;',
      'décomposer git pull en fetch + merge et voir ce que chacun met à jour ;',
      'rejouer le scénario du TP2 : deux développeurs, un conflit, une résolution.'
    ],

    sections: [
      {
        title: 'origin : le lien vers le distant',
        html: [
          '<p>Le dépôt local se lie au dépôt distant par une adresse. Le TP2 la pose ainsi :</p>',
          '<pre><code>git remote add origin https://github.com/&lt;user&gt;/gestion_taches.git\n' +
          'git branch -M main\n' +
          'git push -u origin main</code></pre>',
          '<p>Le nom <strong>origin</strong> est purement conventionnel : c\'est le nom par défaut du lien ' +
          'vers le dépôt distant, il peut être changé. La vérification : <code>git remote -v</code> liste ' +
          'les liens avec leurs URL. <code>git branch -M main</code> renomme la branche principale en ' +
          'main, et <code>push -u origin main</code> pousse en liant la branche locale à sa jumelle ' +
          'distante.</p>',
          box('mnemo', 'Mnémotechnique — « origin = l\'origine du clonage »', 'pin',
            '    <p>Un dépôt cloné connaît déjà son origin : le clone crée le lien automatiquement. Un ' +
            'dépôt initialisé en local doit se lier à la main avec remote add — c\'est l\'étape que le ' +
            'TP1 n\'a pas, et le TP2 oui.</p>')
        ].join('\n')
      },
      {
        title: 'push : envoyer, et se faire refuser',
        html: [
          '<p><code>git push</code> envoie tous les commits de la branche locale vers le dépôt distant. ' +
          'Sous une forme complète : <code>git push origin main</code>.</p>',
          '<p>Mais le push a une règle : <strong>on ne pousse que si l\'on a tout ce que le distant ' +
          'contient</strong>. Si un tiers a poussé entre-temps (l\'étudiant A dans le TP2), le push est ' +
          '<strong>rejeté</strong> : le distant refuse qu\'on écrive par-dessus des commits que notre ' +
          'local ne connaît pas. La séquence du TP2 est formelle :</p>',
          '<pre><code>git push                    → rejeté (l\'autre a poussé)\n' +
          'git pull origin main        → récupère et fusionne\n' +
          'git push                    → accepté</code></pre>',
          box('pitfall', 'Piège — le push sans pull', 'warning',
            '    <p>Le rejet n\'est pas une panne : c\'est la protection qui empêche d\'écraser le travail ' +
            'des autres. L\'exercice « push refusé » de l\'atelier rejoue exactement ce scénario et ' +
            'montre que le pull remet tout le monde d\'accord.</p>')
        ].join('\n')
      },
      {
        title: 'fetch et pull : deux façons de ramener',
        html: [
          '<p>Les deux commandes écoutent le distant, mais ne vont pas aussi loin l\'une que l\'autre :</p>',
          '<table>\n' +
          '    <tr><th>Commande</th><th>Effet</th></tr>\n' +
          '    <tr><td><code>git fetch origin</code></td><td>récupère tout l\'historique du dépôt distant et actualise les références locales — sans fusionner, sans toucher à la copie de travail</td></tr>\n' +
          '    <tr><td><code>git pull</code></td><td>fetch puis merge : ramène ET incorpore les modifications dans la branche courante</td></tr>\n' +
          '  </table>',
          '<p>Un git pull correspond donc exactement à :</p>',
          '<pre><code>git fetch origin\n' +
          'git merge origin/main</code></pre>',
          '<p>La nuance compte : après un fetch, on peut <strong>examiner</strong> ce qui est arrivé ' +
          '(git log origin/main, git diff) avant de décider de fusionner. Après un pull, la fusion a ' +
          'déjà eu lieu — conflits compris. Pour éviter les dérivations d\'historique, le vade-mecum ' +
          'propose aussi un pull avec rebase : <code>git pull --rebase=preserve origin main</code>.</p>',
          box('mnemo', 'Mnémotechnique — « fetch écoute, pull obéit »', 'pin',
            '    <p>fetch ramène les nouvelles sans toucher à votre travail : il met à jour les ' +
            'références distantes locales (origin/main). pull = fetch + merge : il avance aussi votre ' +
            'branche. En cas de doute, fetch d\'abord, on merge ensuite en connaissance de cause.</p>')
        ].join('\n')
      },
      {
        title: 'Le scénario complet du TP2',
        html: [
          '<p>Rejouons le fil du TP2, la scène de conflit la plus fréquente du travail en binôme :</p>',
          '<pre><code># Étudiant A (propriétaire) : init, commit, push initial\n' +
          'git init ; git add . ; git commit -m "Initialisation du projet"\n' +
          'git remote add origin ...\n' +
          'git branch -M main ; git push -u origin main\n' +
          '\n' +
          '# Étudiant B : clone\n' +
          'git clone ...\n' +
          '\n' +
          '# Les deux modifient main.py, chacun son côté :\n' +
          'A : add + commit + push          → accepté\n' +
          'B : add + commit + push          → REJETÉ (A a poussé avant)\n' +
          'B : git pull origin main         → CONFLIT sur main.py\n' +
          '# B résout les marqueurs, puis :\n' +
          'B : add + commit + push          → accepté</code></pre>',
          '<p>La leçon : le rejet et le conflit ne sont pas des accidents, ce sont les gardiens de la ' +
          'collaboration. On les rencontre chaque fois que deux personnes modifient la même zone — et la ' +
          'résolution se fait toujours de la même façon : lire les deux versions, décider, add, commit.</p>',
          box('tech', 'Aller plus loin : la distribution des sources', 'terminal',
            '    <p>Pour livrer une archive propre de la version courante sans le dossier .git : ' +
            'git archive --format=tar --prefix=dossier/ HEAD | gzip &gt; v1.4.0.tar.gz. L\'archive se ' +
            'décompresse dans un dossier nommé, avec tous les fichiers du dépôt.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Le nom origin désigne…', opts: ['le dépôt local', 'le lien conventionnel vers le dépôt distant', 'la branche principale'], correct: 1, exp: 'origin est le nom par défaut du lien distant ; il peut être changé.' },
      { stem: 'Quelle commande liste les liens distants ?', opts: ['git remote -v', 'git branch -r', 'git log origin'], correct: 0, exp: 'remote -v montre les liens et leurs URL ; branch -r liste les branches distantes.' },
      { stem: 'Un push est rejeté quand…', opts: ['le dépôt distant est plein', 'le distant contient des commits que le local n\'a pas', 'le message est trop long'], correct: 1, exp: 'Le distant refuse qu\'on écrive par-dessus ce que notre local ne connaît pas : pull d\'abord.' },
      { stem: 'Que fait git fetch ?', opts: ['Il fusionne le distant dans le local', 'Il actualise les références distantes sans fusionner', 'Il pousse les commits'], correct: 1, exp: 'fetch ramène l\'historique distant et met à jour origin/main, sans toucher à la copie.' },
      { stem: 'git pull équivaut à…', opts: ['fetch puis merge', 'push puis fetch', 'clone puis merge'], correct: 0, exp: 'pull = fetch + merge : il ramène ET incorpore dans la branche courante.' },
      { stem: 'Après un fetch, la copie de travail est…', opts: ['mise à jour', 'inchangée', 'supprimée'], correct: 1, exp: 'fetch ne touche ni à la copie de travail ni à la branche courante.' },
      { stem: 'Que fait git push -u origin main ?', opts: ['Renomme main', 'Pousse main et la lie à sa jumelle distante', 'Crée origin'], correct: 1, exp: '-u (upstream) lie la branche locale à la branche distante pour les push/pull suivants.' },
      { stem: 'Dans le TP2, le conflit survient parce que…', opts: ['les deux ont modifié le même fichier', 'le dépôt est public', 'B a cloné'], correct: 0, exp: 'Deux modifications de la même zone : la fusion demande un arbitrage humain.' }
    ],

    pitfalls: [
      '<strong>Pusher sans pull après un rejet</strong> : le rejet se lève par un pull, pas par l\'insistance.',
      '<strong>Confondre fetch et pull</strong> : l\'un écoute, l\'autre fusionne déjà.',
      '<strong>Croire que clone lie origin automatiquement mais pas remote add</strong> : le lien se crée dans les deux cas, manuellement ou non.',
      '<strong>Forcer un push (--force) pour passer</strong> : le travail des autres disparaît.',
      '<strong>Oublier branch -M main</strong> : le push vise main, le local s\'appelle peut-être master.'
    ],

    methodTitle: 'Synchroniser sans écraser personne',
    method: [
      '<strong>Lier correctement</strong> : remote add origin + branch -M main + push -u.',
      '<strong>Pousser tôt et souvent</strong> : moins de divergence, moins de conflits.',
      '<strong>Lire un rejet</strong> : il signifie « le distant avance, rattrape-le ».',
      '<strong>Fetch pour observer</strong>, pull pour incorporer : choisir en connaissance de cause.',
      '<strong>Résoudre les conflits</strong> comme au chapitre 4 : lire, décider, add, commit.'
    ],

    summary: [
      'remote add origin lie le local au distant ; remote -v vérifie ; clone crée le lien tout seul.',
      'push -u origin main pousse et lie la branche pour les échanges suivants.',
      'Un push est rejeté si le distant contient du travail inconnu du local : pull d\'abord.',
      'fetch actualise les références sans fusionner ; pull = fetch + merge.',
      'Rejet et conflit sont les protections de la collaboration : on les résout, jamais on ne les contourne.'
    ],

    checklist: [
      'Je lie un dépôt local à un distant et je vérifie avec remote -v.',
      'Je prédis l\'issue d\'un push d\'après l\'état des deux dépôts.',
      'Je décompose pull en fetch + merge et montre ce que chacun change.',
      'Je rejoue le scénario A/B du TP2 avec conflit et résolution.'
    ],

    notions: ['dépôt distant', 'origin', 'remote add', 'push', '-u', 'rejet', 'fetch', 'pull', 'upstream', 'collaboration'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le TP2 en binôme (ou en simulant les deux postes).' },
      { cls: 'mid', text: '50–69 % — Explique la différence fetch/pull avec un scénario chacune.' },
      { cls: 'good', text: '70–89 % — Solide : prédis l\'issue de chaque push du scénario A/B.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, stash, gitignore et archive.' }
    ],

    flashcards: [
      { q: 'Lier un dépôt local au distant ?', a: 'git remote add origin URL, puis git push -u origin main ; vérification avec git remote -v.' },
      { q: 'Pourquoi un push est-il rejeté ?', a: 'Le distant contient des commits absents du local : il faut pull (fetch + merge) puis repousser.' },
      { q: 'fetch vs pull ?', a: 'fetch actualise les références distantes sans fusionner ; pull = fetch + merge, il avance aussi la branche courante.' },
      { q: 'Que fait push -u origin main ?', a: 'Il pousse main et la lie (upstream) à origin/main pour les échanges futurs.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Stash, gitignore et publication',
    short: 'Outils du quotidien',
    toc: 'Remiser avec stash, filtrer avec .gitignore, archiver avec git archive, publier avec GitHub Pages.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Dernier tour d\'outils du semestre : remiser un travail en cours pour changer de branche sans ' +
      'perdre une ligne, tenir un .gitignore qui protège vraiment l\'historique, livrer une archive ' +
      'propre, et publier une page d\'accueil avec GitHub Pages — le TP4 dans son intégralité.',

    objectives: [
      'remiser et reprendre des modifications avec stash, pop et list ;',
      'construire un .gitignore effectif pour un projet réel ;',
      'produire une archive de version avec git archive ;',
      'publier une page via GitHub Pages (README, index.html, Settings).'
    ],

    sections: [
      {
        title: 'stash : remiser sans committer',
        html: [
          '<p>La copie de travail est modifiée, et Git bloque toute opération qui changerait son contenu : ' +
          'changer de branche, rapatrier un commit. Deux solutions : commiter (mais cela laisse une trace ' +
          'dans l\'historique) ou <strong>remiser temporairement</strong> :</p>',
          '<pre><code>git stash            remise : la copie redevient propre, les modifications patientent\n' +
          'git stash pop        reprend la remise la plus récente et la supprime de la pile\n' +
          'git stash list       liste les remises en attente\n' +
          'git stash drop       supprime la remise la plus récente</code></pre>',
          '<p>Après un stash, on se retrouve dans le même état qu\'après un reset --hard — mais les ' +
          'modifications <strong>ne sont pas perdues</strong> : elles dorment dans la pile des remises. ' +
          'C\'est la solution honnête avant un checkout -f ou un reset --hard.</p>',
          box('mnemo', 'Mnémotechnique — « la panière du artisan »', 'pin',
            '    <p>stash est une panière : on y dépose le chantier en cours pour libérer la table, on le ' +
            'ressort avec pop. La panière empile : dernier déposé, premier ressorti.</p>')
        ].join('\n')
      },
      {
        title: '.gitignore en conditions réelles',
        html: [
          '<p>Le chapitre 2 a posé la syntaxe ; ici, le contenu d\'un vrai projet Python (celui du TP1) :</p>',
          '<pre><code>__pycache__/\n' +
          '*.pyc\n' +
          'venv/\n',
          '</code></pre>',
          '<p>Chaque motif cible une pollution : <code>__pycache__/</code> le cache d\'exécution, ' +
          '<code>*.pyc</code> les fichiers compilés, <code>venv/</code> l\'environnement virtuel. Règle ' +
          'de maintien : le .gitignore se met à jour dès qu\'un fichier parasite apparaît dans git ' +
          'status — et pour les fichiers déjà suivis, rappel du chapitre 2, git rm --cached d\'abord.</p>',
          '<p>La commande <code>git ls-files --other --ignored --exclude-standard</code> liste tous les ' +
          'fichiers exclus du suivi dans le projet : le moyen de vérifier que le .gitignore fait son ' +
          'travail.</p>',
          box('pitfall', 'Piège — plusieurs .gitignore', 'warning',
            '    <p>Plusieurs .gitignore répartis dans les sous-dossiers se cumulent, mais la pratique est ' +
            'fortement déconseillée : les motifs peuvent s\'annuler les uns les autres. Un .gitignore à ' +
            'la racine, sauf besoin très particulier.</p>')
        ].join('\n')
      },
      {
        title: 'git archive : livrer sans .git',
        html: [
          '<p>Pour avoir une archive de la version de votre dépôt <strong>sans les fichiers ' +
          'inutiles</strong> tel le dossier .git :</p>',
          '<pre><code>cd depot\n' +
          'git archive --format=tar --prefix=dossier/ HEAD | gzip &gt; v1.4.0.tar.gz</code></pre>',
          '<p>L\'archive <code>v1.4.0.tar.gz</code> contient la dernière version de la branche courante. ' +
          'Décompressée, elle crée un dossier portant le préfixe demandé avec tous les fichiers du dépôt — ' +
          'et rien d\'autre : ni historique, ni fichiers ignorés.</p>',
          box('tech', 'Le réflexe qualité', 'terminal',
            '    <p>Une livraison propre = git archive depuis un historique propre = un .gitignore tenu à ' +
            'jour. Les trois outils du semestre se rejoignent : ce qui n\'est pas suivi ne part pas dans ' +
            'l\'archive.</p>')
        ].join('\n')
      },
      {
        title: 'Publier : README et GitHub Pages',
        html: [
          '<p>Le TP4 publie le projet sur GitHub avec une vraie page d\'accueil. Les étapes :</p>',
          '<pre><code>1. créer le dépôt sur GitHub (public)\n' +
          '2. lier : git remote add origin ... ; git push -u origin main\n' +
          '3. rédiger un README.md structuré : titre, description, fonctionnalités,\n' +
          '   installation (git clone + lancement), auteur\n' +
          '4. créer une page d\'accueil index.html minimaliste\n' +
          '5. Settings → Pages → Source : branch main, dossier /root\n' +
          '6. l\'URL https://&lt;user&gt;.github.io/gestion_taches/ sert la page</code></pre>',
          '<p>Le README professionnel du TP4 suit un plan fixe : <code># Titre</code>, ' +
          '<code>## Description</code>, <code>## Fonctionnalités</code> (une liste), ' +
          '<code>## Installation</code> (un bloc de code), auteur. Chaque modification passe par le cycle ' +
          'du chapitre 2 : add, commit avec message net, push.</p>',
          box('objectifs', 'Ce que l\'atelier fait tourner réellement', 'target',
            '    <p>Chaque chapitre de ce cours se termine par trois exercices Bash exécutés dans la page : ' +
            'dépôt et identité (chapitre 1), index et messages (chapitre 2), historique et annulations ' +
            '(chapitre 3), branches et fusions (chapitre 4), distant et rejets (chapitre 5), remises, ' +
            'filtres et rapports de version (chapitre 6). Le même bash que celui du terminal — seule la ' +
            'machine change.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que fait git stash ?', opts: ['Il commite', 'Il remise les modifications et rend la copie propre', 'Il pousse'], correct: 1, exp: 'stash empile les modifications de la copie : elle redevient propre, rien ne se perd.' },
      { stem: 'git stash pop fait quoi ?', opts: ['Ajoute une remise', 'Reprend la remise la plus récente et la retire de la pile', 'Liste les remises'], correct: 1, exp: 'pop dépile : les modifications remises reviennent dans la copie de travail.' },
      { stem: 'pop sur une pile vide…', opts: ['crée une remise vide', 'signale qu\'il n\'y a rien à reprendre', 'efface la copie'], correct: 1, exp: 'Sans remise en attente, pop n\'a rien à rendre — l\'atelier reproduit ce cas.' },
      { stem: 'Quel .gitignore pour un projet Python du TP1 ?', opts: ['*.py seulement', '__pycache__/, *.pyc, venv/', 'main.py'], correct: 1, exp: 'Cache d\'exécution, fichiers compilés et environnement virtuel : les trois pollutions du TP1.' },
      { stem: 'Comment vérifier ce que le .gitignore exclut ?', opts: ['git status', 'git ls-files --other --ignored --exclude-standard', 'git diff'], correct: 1, exp: 'Cette commande liste tous les fichiers exclus du suivi dans le projet.' },
      { stem: 'Que produit git archive ?', opts: ['Un clone du dépôt', 'Une archive de la version courante sans le dossier .git', 'Un commit spécial'], correct: 1, exp: 'archive livre la branche courante en tar/tar.gz, préfixe de dossier au choix.' },
      { stem: 'Où active-t-on GitHub Pages ?', opts: ['Dans le README', 'Settings → Pages, branch main, dossier /root', 'Dans .gitignore'], correct: 1, exp: 'Le service se règle dans Settings → Pages : il sert l\'URL user.github.io/depot.' },
      { stem: 'Stash ou commit avant de changer de branche ?', opts: ['Toujours commit', 'stash si le travail est en cours et ne mérite pas une trace', 'Aucun des deux'], correct: 1, exp: 'stash remise sans polluer l\'historique : idéal pour un chantier inachevé.' }
    ],

    pitfalls: [
      '<strong>Commit de chantier par flemme de stash</strong> : l\'historique se remplit de traces inutiles.',
      '<strong>drop au lieu de pop</strong> : la remise la plus récente est détruite au lieu d\'être reprise.',
      '<strong>.gitignore multi-niveaux</strong> : les motifs se cumulent et peuvent s\'annuler.',
      '<strong>Archive d\'un historique pollué</strong> : les fichiers ignorés manquent, les suivis encombrants partent.',
      '<strong>README sans plan</strong> : sans titre, description, installation, la page d\'accueil ne raconte rien.'
    ],

    methodTitle: 'Livrer une version propre',
    method: [
      '<strong>Nettoyer la copie</strong> : status, puis stash ou commit des chantiers.',
      '<strong>Vérifier les exclusions</strong> : ls-files --other --ignored pour auditer le .gitignore.',
      '<strong>Archiver</strong> : git archive avec préfixe et version nommée.',
      '<strong>Documenter</strong> : README au plan fixe, mis à jour à chaque fonctionnalité.',
      '<strong>Publier</strong> : push, puis Pages pour la page d\'accueil.'
    ],

    summary: [
      'stash remise la copie (propre immédiatement) ; pop reprend, list liste, drop détruit.',
      'Un .gitignore Python tient en trois lignes : __pycache__/, *.pyc, venv/.',
      'Les fichiers déjà suivis sortent du suivi par rm --cached, pas par .gitignore.',
      'git archive livre la version courante en tar.gz, sans .git ni fichiers ignorés.',
      'GitHub Pages sert l\'URL du projet depuis la branche main, dossier /root.'
    ],

    checklist: [
      'Je remise un chantier, je change de branche, je le reprends intact.',
      'J\'écris et j\'audite un .gitignore pour un projet Python.',
      'Je produis une archive de version nommée avec git archive.',
      'Je décris les six étapes de la publication GitHub Pages.'
    ],

    notions: ['stash', 'pop', 'list', 'drop', 'remise', '.gitignore', 'ls-files', 'git archive', 'README', 'GitHub Pages'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le cycle stash/pop sur un vrai dossier.' },
      { cls: 'mid', text: '50–69 % — Écris un .gitignore complet et audite-le avec ls-files.' },
      { cls: 'good', text: '70–89 % — Solide : produis une archive et vérifie son contenu.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : le cours est terminé, passe aux examens blancs et au projet.' }
    ],

    flashcards: [
      { q: 'Le trio stash ?', a: 'stash remise (copie propre), pop reprend la dernière (et la retire), drop la détruit ; list montre la pile.' },
      { q: '.gitignore minimal d\'un projet Python ?', a: '__pycache__/ (cache), *.pyc (compilés), venv/ (environnement virtuel).' },
      { q: 'Retirer du suivi un fichier déjà commité ?', a: 'git rm --cached fichier puis commit ; le .gitignore seul ne suffit pas pour un fichier suivi.' },
      { q: 'Que fait git archive --format=tar --prefix=d/ HEAD ?', a: 'Il produit une archive de la branche courante, décompressée dans un dossier préfixé, sans le dossier .git.' }
    ]
  }
];

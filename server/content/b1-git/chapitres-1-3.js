/**
 * Chapitres 1 à 3 du cours de Git B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Les ateliers de code (trois
 * exercices Bash par chapitre) sont injectés avant le QCM par
 * `scripts/generate-code-labs.js` à partir de `server/exercises/b1-git.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Créer un dépôt : init, config, status',
    short: 'Premier dépôt',
    toc: 'Qu\'est-ce que le versionnage, git init et .git, configurer son identité, lire git status.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Tu démarres le projet Python gestion_taches du TP : quatre fichiers, un dossier. Sans Git, ' +
      'chaque erreur se paie en copie manuelle « version_finale_v2 ». Avec Git, chaque état du projet ' +
      's\'archive proprement. Ce chapitre installe le réflexe du TP1 : init, config, status — dans cet ' +
      'ordre, toujours.',

    objectives: [
      'expliquer ce qu\'est un système de gestion de versions décentralisé ;',
      'créer un dépôt local avec git init et décrire le rôle du dossier .git ;',
      'configurer son identité avec git config (globale ou locale) ;',
      'lire la sortie de git status et citer les trois espaces de Git.'
    ],

    sections: [
      {
        title: 'Pourquoi versionner',
        html: [
          '<p>Git est le <strong>système de gestion de version décentralisé</strong> open source qui ' +
          'facilite les activités GitHub sur votre ordinateur. Décentralisé signifie que chaque machine ' +
          'possède <strong>tout l\'historique</strong> : on peut commité, revenir en arrière, brancher, ' +
          'sans réseau. Le réseau ne sert qu\'à la synchronisation entre dépôts.</p>',
          '<p>Les bénéfices concrets du TP : revenir à n\'importe quelle version d\'un fichier, savoir ' +
          'qui a changé quoi et quand, expérimenter sur une branche sans risquer la version qui marche, ' +
          'collaborer à plusieurs sans s\'écraser les fichiers.</p>',
          box('mnemo', 'Mnémotechnique — « tout l\'historique dans la poche »', 'pin',
            '    <p>Un dépôt Git complet vit dans un seul dossier .git : cloner un projet, c\'est ' +
            'transporter son passé entier. C\'est pourquoi un commit accidentel se rattrape toujours ' +
            'en local — tant qu\'il n\'est pas poussé.</p>')
        ].join('\n')
      },
      {
        title: 'git init : naître au versionnage',
        html: [
          '<p>Créer un dépôt local tient en trois lignes, exactement les premières du TP1 :</p>',
          '<pre><code>mkdir gestion_taches\n' +
          'cd gestion_taches\n' +
          'git init</code></pre>',
          '<p>La commande <code>git init</code> crée un sous-dossier <code>.git</code> qui contient le ' +
          'dépôt local : tout l\'historique, les branches, la configuration propre au projet. Supprimer ' +
          '.git revient à désamorcer le versionnage — les fichiers, eux, restent. On peut aussi créer un ' +
          'dépôt à partir d\'un projet existant avec <code>git init nom-du-projet</code>.</p>',
          '<p>L\'autre naissance possible : <code>git clone url</code> télécharge un projet et tout son ' +
          'historique de versions, et crée automatiquement le lien vers le dépôt distant.</p>',
          box('tech', 'Deux commandes de création à ne pas confondre', 'terminal',
            '    <p><code>git init</code> part du vide (ou d\'un dossier existant) et crée un dépôt local ; ' +
            '<code>git clone</code> part d\'un dépôt distant et reconstruit tout : dossier, historique, ' +
            'lien origin. Cloneer, c\'est hériter ; initier, c\'est fonder.</p>')
        ].join('\n')
      },
      {
        title: 'Configurer son identité',
        html: [
          '<p>Chaque commit porte la signature de son auteur. Sans configuration, Git peut refuser de ' +
          'commiter ou utiliser une identité incorrecte — l\'erreur classique du débutant que le TP1 ' +
          'signale en gras. Deux niveaux de configuration :</p>',
          '<pre><code>git config --global user.name "Votre Nom"\n' +
          'git config --global user.email "votre@email.com"\n' +
          '\n' +
          '# ou, projet par projet (sans --global) :\n' +
          'git config user.name "Votre Nom"\n' +
          'git config user.email "votre@email.com"\n' +
          '\n' +
          '# vérification :\n' +
          'git config --list</code></pre>',
          '<p>La configuration <strong>globale</strong> vaut pour tous les dépôts de la machine (recommandée ' +
          'en poste personnel) ; la <strong>locale</strong> ne vaut que pour le dépôt courant et écrase la ' +
          'globale — utile quand un projet professionnel exige une adresse différente.</p>',
          box('pitfall', 'Piège — le commit sans identité', 'warning',
            '    <p>Premier commit sans user.name ni user.email : refus. Git n\'invente pas d\'auteur. ' +
            'L\'exercice « identité et commits refusés » de l\'atelier reproduit ce refus et apprend à le ' +
            'lire avant de chercher ailleurs.</p>')
        ].join('\n')
      },
      {
        title: 'git status : les trois espaces',
        html: [
          '<p>La copie de travail distingue <strong>trois espaces</strong> : la <strong>copie de ' +
          'travail</strong> contient les fichiers créés et modifiés par le développeur ; l\'<strong>index</strong> ' +
          'est une zone de transit stockant les fichiers qui seront poussés vers le dépôt ; le ' +
          '<strong>dépôt local</strong> garde l\'historique des versions, repéré par sa tête nommée ' +
          '<code>HEAD</code>.</p>',
          '<pre><code>copie de travail  ──git add──→     index      ──git commit──→   dépôt local (HEAD)\n' +
          '                        ←──git reset HEAD──                    ←──git checkout──</code></pre>',
          '<p>La commande <code>git status</code> liste tous les nouveaux fichiers et les fichiers ' +
          'modifiés à commiter : c\'est l\'état des lieux permanent. « Untracked » (non suivi) pour un ' +
          'fichier jamais ajouté, « modified » pour un suivi qui a changé depuis l\'index, « staged » ' +
          '(indexé) pour un prêt à commiter.</p>',
          box('mnemo', 'Mnémotechnique — « la table, le plateau, l\'armoire »', 'pin',
            '    <p>La <strong>table</strong> (copie de travail) accueille tout ce qu\'on bricole ; le ' +
            '<strong>plateau</strong> (index) n\'embarque que ce qu\'on a posé exprès ; l\'<strong>armoire</strong> ' +
            '(dépôt) archive pour de bon. add pose sur le plateau, commit range dans l\'armoire, reset ' +
            'repose sur la table.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que crée exactement git init ?', opts: ['Un dépôt distant', 'Un sous-dossier .git contenant le dépôt local', 'Un fichier de configuration seul'], correct: 1, exp: 'git init crée le sous-dossier .git qui abrite tout le dépôt local.' },
      { stem: 'Sans user.name ni user.email configurés, un commit…', opts: ['est accepté anonymement', 'peut être refusé ou signé d\'une identité incorrecte', 'demande le mot de passe'], correct: 1, exp: 'C\'est l\'erreur classique du débutant signalée par le TP1 : configurer avant de commiter.' },
      { stem: 'La configuration --global s\'applique…', opts: ['au dépôt courant seulement', 'à tous les dépôts de la machine', 'au dépôt distant'], correct: 1, exp: '--global vaut pour tous les dépôts locaux ; sans elle, la configuration ne vaut que pour le dépôt courant.' },
      { stem: 'Quels sont les trois espaces de Git ?', opts: ['RAM, disque, cloud', 'Copie de travail, index, dépôt local', 'main, feature, origin'], correct: 1, exp: 'Copie de travail, index (zone de transit) et dépôt local (historique, tête HEAD).' },
      { stem: 'Quelle commande fait un état des lieux permanent ?', opts: ['git add', 'git log', 'git status'], correct: 2, exp: 'git status liste nouveaux fichiers et modifications à commiter.' },
      { stem: 'Un fichier « untracked » est…', opts: ['supprimé', 'jamais ajouté au suivi', 'en conflit'], correct: 1, exp: 'Non suivi : présent dans la copie de travail mais jamais passé par git add.' },
      { stem: 'git clone fait quoi, de plus que copier des fichiers ?', opts: ['Rien de plus', 'Télécharge le projet et tout son historique, et crée le lien origin', 'Crée un .gitignore'], correct: 1, exp: 'Le clone reconstruit l\'historique complet et le lien vers le dépôt distant.' },
      { stem: 'Quelle commande vérifie la configuration posée ?', opts: ['git config --list', 'git status', 'git log'], correct: 0, exp: 'git config --list liste toutes les valeurs de configuration actives.' }
    ],

    pitfalls: [
      '<strong>Committer avant de configurer</strong> : refus ou identité fausse — le premier réflexe du TP1 est git config.',
      '<strong>Confondre init et clone</strong> : init fonde, clone hérite d\'un historique existant.',
      '<strong>Supprimer .git pour « nettoyer »</strong> : c\'est effacer tout l\'historique.',
      '<strong>Croire que status archive</strong> : status ne déplace rien, il observe.',
      '<strong>Confondre les trois espaces</strong> : modifier n\'est pas indexer, indexer n\'est pas commiter.'
    ],

    methodTitle: 'Démarrer un dépôt sans faux pas',
    method: [
      '<strong>Créer le dossier et y entrer</strong> : mkdir puis cd, comme au TP1.',
      '<strong>Initialiser</strong> : git init — et vérifier la présence de .git.',
      '<strong>Configurer l\'identité</strong> : user.name et user.email, globale ou locale.',
      '<strong>Vérifier</strong> : git config --list puis git status.',
      '<strong>Se représenter les trois espaces</strong> avant chaque déplacement de fichier.'
    ],

    summary: [
      'Git est un gestionnaire de versions décentralisé : chaque machine a tout l\'historique.',
      'git init crée le sous-dossier .git ; git clone reconstruit dépôt et lien origin.',
      'user.name et user.email s\'imposent avant tout commit (--global pour la machine, local pour le projet).',
      'Trois espaces : copie de travail, index, dépôt local (HEAD) ; status les observe sans rien déplacer.',
      'add transite vers l\'index, commit archive, reset renvoie vers la copie.'
    ],

    checklist: [
      'Je décris ce que crée git init et ce que contient .git.',
      'Je configure mon identité globale et je la vérifie.',
      'Je classe un fichier dans l\'un des trois espaces d\'après la sortie de git status.',
      'Je distingue init et clone avec un cas d\'usage chacun.'
    ],

    notions: ['versionnage', 'décentralisé', 'git init', '.git', 'git config', 'user.name', 'git status', 'copie de travail', 'index', 'HEAD'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le TP1 ligne par ligne, en expliquant chaque commande.' },
      { cls: 'mid', text: '50–69 % — Dessine les trois espaces et les flèches add/commit/reset de mémoire.' },
      { cls: 'good', text: '70–89 % — Solide : simule un refus de commit sans identité et corrige-le.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, l\'index et les commits.' }
    ],

    flashcards: [
      { q: 'Que fait git init ?', a: 'Il crée un sous-dossier .git qui contient le dépôt local : historique, branches, configuration.' },
      { q: 'Les trois espaces de Git ?', a: 'Copie de travail (fichiers du développeur), index (zone de transit), dépôt local (historique, tête HEAD).' },
      { q: 'Pourquoi configurer user.name et user.email ?', a: 'Chaque commit porte une identité : sans elle, Git peut refuser le commit ou signer faux.' },
      { q: 'init vs clone ?', a: 'init fonde un dépôt local vide ; clone télécharge un projet avec tout son historique et crée le lien origin.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Index et commits : add, reset, commit',
    short: 'Index',
    toc: 'git add et ses options, exclure avec .gitignore, retirer de l\'index, écrire des messages de commit.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le projet avance : main.py a changé, utils.py est nouveau, un cache __pycache__ pollue le ' +
      'dossier. Tout n\'a pas vocation à partir dans l\'historique. Ce chapitre apprend à sélectionner ' +
      'exactement ce qu\'on archive — et à écrire des messages de commit qui se relisent.',
    objectives: [
      'ajouter au sélectif avec git add et connaître ses options (-A, ., -u) ;',
      'exclure du suivi avec .gitignore et comprendre sa limite ;',
      'retirer un fichier de l\'index avec git reset HEAD et git rm --cached ;',
      'écrire des messages de commit nets et comprendre l\'option --amend.'
    ],

    sections: [
      {
        title: 'git add : sélectionner',
        html: [
          '<p><code>git add</code> dépose les fichiers dans l\'index. Trois façons de cibler :</p>',
          '<pre><code>git add /chemin/vers/fichier.ext   un fichier précis\n' +
          'git add /chemin/vers/dossier      tout un dossier\n' +
          'git add .                         le dossier courant</code></pre>',
          '<p>Les options sélectionnent selon l\'état des fichiers :</p>',
          '<table>\n' +
          '    <tr><th>Option</th><th>Nouveaux</th><th>Modifiés</th><th>Détruits</th></tr>\n' +
          '    <tr><td><code>git add -A</code></td><td>oui</td><td>oui</td><td>oui</td></tr>\n' +
          '    <tr><td><code>git add .</code></td><td>oui</td><td>oui</td><td>oui</td></tr>\n' +
          '    <tr><td><code>git add -u</code></td><td>non</td><td>oui</td><td>oui</td></tr>\n' +
          '  </table>',
          '<p>Règle d\'or du vade-mecum : git add ajoute les fichiers <strong>tels qu\'ils sont au moment ' +
          'de la commande</strong>. Une modification ultérieure ne sera pas prise dans l\'index sans un ' +
          'nouveau add. En cas de doute, un <code>git status</code> fait l\'état des lieux.</p>',
          box('mnemo', 'Mnémotechnique — « -u = déjà suivis seulement »', 'pin',
            '    <p>L\'option -u (update) ne voit que ce que Git connaît déjà : ni nouveaux fichiers, ni ' +
            'dossiers entiers débarqués. Pratique pour indexer proprement des modifications sans ramasser ' +
            'les fichiers de travail en cours.</p>')
        ].join('\n')
      },
      {
        title: 'Exclure : .gitignore et sa limite',
        html: [
          '<p>Le fichier <code>.gitignore</code> contient la liste des fichiers ou dossiers à ne pas ' +
          'inclure lors des git add. La syntaxe utilise des motifs standards :</p>',
          '<pre><code>fichier     # exclure un fichier exact\ndossier/    # exclure un dossier\n*.pyc       # exclure tous les fichiers finissant par .pyc\n*~          # exclure tous les fichiers se terminant par ~</code></pre>',
          '<p>Le TP1 ajoute un .gitignore Python : <code>__pycache__/</code>, <code>*.pyc</code>, ' +
          '<code>venv/</code>. Et une limite essentielle : <strong>si un fichier est déjà suivi, ' +
          'l\'ajouter au .gitignore ne le retire pas du suivi</strong>. La solution est ' +
          '<code>git rm --cached fichier</code> : le fichier sort de l\'index et de la liste des suivis, ' +
          'mais reste physiquement sur le disque.</p>',
          box('pitfall', 'Piège — le .gitignore rétrospectif', 'warning',
            '    <p>Un fichier déjà commité ne disparaît pas de l\'historique parce qu\'on l\'a écrit dans ' +
            '.gitignore. Il faut d\'abord git rm --cached (puis commiter) : le .gitignore ne s\'applique ' +
            'qu\'aux fichiers pas encore suivis. L\'exercice « gitignore » de l\'atelier fait tester ce ' +
            'filtre sur des adds réels.</p>'),
          box('tech', 'Trois rm à distinguer', 'terminal',
            '    <p><code>git rm fichier</code> supprime de la copie de travail ET de l\'index ; ' +
            '<code>git rm --cached fichier</code> de l\'index seulement (le fichier reste sur disque et ' +
            'devient non suivi) ; <code>/bin/rm fichier</code> de la copie de travail seulement. Et ' +
            '<code>git mv ancien nouveau</code> renomme en préparant le changement pour le commit.</p>')
        ].join('\n')
      },
      {
        title: 'Retirer de l\'index : reset HEAD',
        html: [
          '<p><code>git reset HEAD</code> est l\'inverse de git add : il vide l\'index. Pour un seul ' +
          'fichier : <code>git reset HEAD /chemin/vers/fichier.ext</code>. Ainsi, pour indexer tout un ' +
          'dossier sauf un fichier :</p>',
          '<pre><code>git add /chemin/vers/dossier\n' +
          'git reset /chemin/vers/dossier/fichier.ext</code></pre>',
          '<p>Différence avec rm --cached : après un reset, le fichier reste <strong>suivi</strong> — ' +
          'simplement, ses dernières modifications repartent dans la copie de travail. Après un rm ' +
          '--cached, il n\'est plus suivi du tout.</p>'
        ].join('\n')
      },
      {
        title: 'Committer et renommer l\'archive',
        html: [
          '<p><code>git commit -m "message"</code> déplace les fichiers de l\'index vers le dépôt : une ' +
          'nouvelle ligne dans l\'historique, indexée par un <strong>SHA-1</strong> et décrite par le ' +
          'message. Le commit archive <strong>l\'état de l\'index</strong>, pas la copie de travail.</p>',
          '<p><code>git log</code> montre l\'historique des archivages, avec beaucoup d\'options ' +
          'd\'affichage. Et pour corriger le dernier commit — changer le message, ou ajouter/retirer des ' +
          'fichiers oubliés :</p>',
          '<pre><code>git commit --amend -m "Mon nouveau message"</code></pre>',
          '<p>Amend crée un <strong>nouveau SHA-1</strong> : à ne faire que si le commit n\'a pas encore ' +
          'été poussé, sinon les autres collaborateurs subissent le changement d\'identifiant.</p>',
          box('pitfall', 'Piège — le message qui ne raconte rien', 'warning',
            '    <p>« modifications », « fix », « mise à jour » : un message sans verbe ni objet ne sert ' +
              'qu\'à polluer git log. La convention de l\'atelier : commence par une majuscule, 50 ' +
              'caractères au plus, pas de point final — « Ajout du fichier gitignore pour les caches ».</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'git add . et git add -A ont en commun de…', opts: ['ignorer les fichiers détruits', 'prendre nouveaux, modifiés et détruits', 'ne prendre que les modifiés'], correct: 1, exp: 'Les deux couvrent les trois états ; -u, lui, ignore les nouveaux fichiers.' },
      { stem: 'Que fait git add -u ?', opts: ['Indexe les nouveaux fichiers', 'Indexe modifications et destructions des fichiers suivis', 'Met à jour le dépôt distant'], correct: 1, exp: '-u (update) ne voit que les fichiers déjà suivis : modifiés et détruits.' },
      { stem: 'Un fichier déjà suivi est ajouté au .gitignore : que se passe-t-il ?', opts: ['Il sort du suivi', 'Il reste suivi — il faut git rm --cached', 'Il est supprimé'], correct: 1, exp: 'Le .gitignore ne s\'applique qu\'aux fichiers pas encore suivis.' },
      { stem: 'Que fait git rm --cached fichier ?', opts: ['Supprime le fichier du disque', 'Retire l\'index et le suivi, le fichier reste sur disque', 'Ne fait rien'], correct: 1, exp: '--cached sort de l\'index et du suivi sans détruire physiquement le fichier.' },
      { stem: 'git reset HEAD fichier fait quoi ?', opts: ['Efface le fichier', 'Retire ses modifications de l\'index, qui repartent dans la copie', 'Crée un commit'], correct: 1, exp: 'reset HEAD est l\'inverse de git add : le fichier reste suivi.' },
      { stem: 'Que contient un commit ?', opts: ['La copie de travail entière', 'L\'état de l\'index, décrit par le message, identifié par un SHA-1', 'Les fichiers du dépôt distant'], correct: 1, exp: 'Le commit archive ce que l\'index contient au moment de la commande.' },
      { stem: 'Quand peut-on commit --amend sans risque ?', opts: ['Toujours', 'Si le commit n\'a pas encore été poussé', 'Après un push'], correct: 1, exp: 'Amend change le SHA-1 : les autres collaborateurs subiraient le déplacement d\'historique.' },
      { stem: 'Après un commit, l\'index est…', opts: ['plein', 'vide', 'inversé'], correct: 1, exp: 'Le commit a transféré tout l\'index vers le dépôt : l\'index se vide.' }
    ],

    pitfalls: [
      '<strong>Add oublié après modification</strong> : le commit n\'embarque que l\'état indexé au moment du add.',
      '<strong>-u attendu pour les nouveaux fichiers</strong> : -u ignore tout ce qui n\'est pas déjà suivi.',
      '<strong>.gitignore rétrospectif</strong> : sans git rm --cached, le fichier suivi reste suivi.',
      '<strong>rm --cached et rm confondus</strong> : l\'un garde le fichier sur disque, l\'autre le détruit.',
      '<strong>Amend après push</strong> : le SHA change, l\'historique partagé se casse.'
    ],

    methodTitle: 'Composer un commit propre',
    method: [
      '<strong>Faire l\'état des lieux</strong> : git status avant toute sélection.',
      '<strong>Sélectionner précisément</strong> : add fichier par fichier, ou add -u pour les suivis.',
      '<strong>Filtrer le bruit</strong> : .gitignore pour les caches, venv, fichiers temporaires.',
      '<strong>Vérifier l\'index</strong> : git status — seul ce qui est indexé partira.',
      '<strong>Committer avec un message utile</strong> : majuscule, concis, sans point final.'
    ],

    summary: [
      'git add dépose dans l\'index : fichier, dossier, . (tout) ; -A prend tout, -u seulement les suivis.',
      'L\'index reflète l\'état au moment du add : toute modification ultérieure demande un nouvel add.',
      '.gitignore filtre les adds des fichiers non suivis ; pour un suivi, git rm --cached d\'abord.',
      'reset HEAD renvoie les modifications de l\'index vers la copie de travail, sans dé-suivre.',
      'Le commit archive l\'index avec un SHA-1 ; amend le réécrit — avant tout push.'
    ],

    checklist: [
      'Je choisis la bonne option de add selon ce que je veux indexer.',
      'J\'écris un .gitignore correct pour un projet Python.',
      'Je retire proprement un fichier de l\'index (reset) ou du suivi (rm --cached).',
      'Je formule des messages de commit lisibles et je sais quand utiliser amend.'
    ],

    notions: ['git add', 'index', '-A', '-u', '.gitignore', 'git rm', '--cached', 'git reset HEAD', 'commit', 'SHA-1', 'amend'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le tableau des options de git add avec un cas chacune.' },
      { cls: 'mid', text: '50–69 % — Simule un fichier suivi qu\'on veut ignorer : la séquence exacte.' },
      { cls: 'good', text: '70–89 % — Solide : explique la différence rm / rm --cached / reset HEAD.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, l\'historique et les annulations.' }
    ],

    flashcards: [
      { q: 'Options de git add : -A vs -u ?', a: '-A : nouveaux, modifiés, détruits. -u : modifications et destructions des fichiers déjà suivis seulement.' },
      { q: 'Retirer du suivi un fichier déjà commité ?', a: 'git rm --cached fichier (il reste sur disque), puis commit. Le .gitignore seul ne suffit pas.' },
      { q: 'reset HEAD vs rm --cached ?', a: 'reset HEAD retire de l\'index (le fichier reste suivi) ; rm --cached retire aussi le suivi.' },
      { q: 'Que se passe-t-il après git commit ?', a: 'L\'index est transféré au dépôt (une entrée SHA-1 + message) et l\'index se vide.' },
      { q: 'Quand commit --amend ?', a: 'Pour corriger le dernier commit avant tout push : il crée un nouveau SHA-1.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Historique et annulations : log, reset, revert',
    short: 'Historique',
    toc: 'Lire git log, revenir en arrière avec reset (soft, mixed, hard), annuler avec trace via revert.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Un commit part trop tôt, une modification casse tout, un message est faux. Git sait revenir en ' +
      'arrière — mais chaque méthode laisse une trace différente. Savoir choisir entre reset et revert, ' +
      'entre soft, mixed et hard, c\'est ce qui distingue un utilisateur d\'un administrateur de dépôt.',

    objectives: [
      'lire l\'historique avec git log et ses formats d\'affichage ;',
      'distinguer les trois options de git reset et leurs effets sur les trois espaces ;',
      'annuler un commit avec trace grâce à git revert ;',
      'comparer deux états avec git diff.'
    ],

    sections: [
      {
        title: 'Lire l\'historique',
        html: [
          '<p><code>git log</code> montre l\'historique des versions pour la branche courante : du plus ' +
          'récent au plus ancien, chaque entrée porte son SHA-1, son auteur, sa date et son message. ' +
          'Quelques formats utiles :</p>',
          '<pre><code>git log                      l\'historique complet\n' +
          'git log --oneline            une ligne par commit (SHA abrégé + message)\n' +
          'git log --oneline --graph --all   avec le graphe des branches\n' +
          'git log --follow fichier     l\'historique d\'un fichier, renommages compris\n' +
          'git show SHA                 le contenu exact d\'un commit</code></pre>',
          '<p>C\'est le format <code>--oneline</code> que le TP1 utilise pour vérifier la propreté de ' +
          'l\'historique : une ligne, un commit, un message qui raconte quelque chose.</p>',
          box('mnemo', 'Mnémotechnique — « le log lit, le show montre »', 'pin',
            '    <p>log liste les états dans le temps ; show détaille <strong>un</strong> état : ses ' +
            'modifications de métadonnées et de contenu. Pour inspecter une régression, on log pour ' +
            'trouver le SHA suspect, puis show pour voir exactement ce qu\'il a changé.</p>')
        ].join('\n')
      },
      {
        title: 'reset : les trois options',
        html: [
          '<p><code>git reset</code> ramène les trois espaces vers un état passé. Avec une référence ' +
          '(HEAD~3 = trois commits en arrière), il déplace la tête du dépôt :</p>',
          '<table>\n' +
          '    <tr><th>Option</th><th>Dépôt (HEAD)</th><th>Index</th><th>Copie de travail</th></tr>\n' +
          '    <tr><td><code>--soft</code></td><td>revient</td><td>les commits annulés y remontent</td><td>inchangée</td></tr>\n' +
          '    <tr><td><code>--mixed</code> (défaut)</td><td>revient</td><td>vidé</td><td>les modifications restent</td></tr>\n' +
          '    <tr><td><code>--hard</code></td><td>revient</td><td>vidé</td><td>effacée</td></tr>\n' +
          '  </table>',
          '<p>Exemples du vade-mecum : <code>git reset --soft HEAD^</code> (revenir à l\'avant-dernier ' +
          'commit), <code>git reset --soft HEAD~3</code> (trois commits en arrière), ' +
          '<code>git reset --hard SHA</code> (tout effacer après ce commit — les trois espaces ' +
          'deviennent identiques).</p>',
          box('pitfall', 'Piège — hard ne pardonne pas', 'warning',
            '    <p>reset --hard détruit les modifications de la copie de travail, sans confirmation. ' +
            'C\'est l\'option la plus utile et la plus dangereuse : en cas de doute, remiser avec git ' +
            'stash (chapitre 6) avant de reset — les modifications restent récupérables.</p>')
        ].join('\n')
      },
      {
        title: 'revert : annuler avec trace',
        html: [
          '<p>Comme reset, <code>git revert</code> revient en arrière — mais il <strong>ajoute un ' +
          'commit</strong> à l\'historique pour signaler cette réversion. Rien ne disparaît : l\'erreur ' +
          'et son annulation restent toutes deux visibles.</p>',
          '<pre><code>git revert HEAD^      annule le commit d\'avant-dernier par un nouveau commit</code></pre>',
          '<p>Le choix entre les deux : <strong>reset</strong> quand l\'historique n\'a pas été partagé ' +
          '(le commit est local et frais), <strong>revert</strong> quand il a été poussé — les autres ' +
          'collaborateurs conservent un historique cohérent, et l\'annulation se propage proprement.</p>',
          box('mnemo', 'Mnémotechnique — « reset efface, revert écrit l\'inverse »', 'pin',
            '    <p>reset réécrit le passé (avant push) ; revert écrit une page de plus : « voici ' +
            'l\'annulation de ce commit ». Sur un dépôt partagé, l\'historique est un contrat — revert ' +
            'le respecte.</p>')
        ].join('\n')
      },
      {
        title: 'comparer : git diff',
        html: [
          '<p><code>git diff</code> compare les espaces entre eux. Les variantes du vade-mecum :</p>',
          '<pre><code>git diff                    copie de travail ↔ index\n' +
          'git diff --cached           index ↔ dépôt local\n' +
          'git diff --staged           index ↔ dernier commit\n' +
          'git diff fichier            copie de travail ↔ index, pour un fichier\n' +
          'git diff HEAD^              copie de travail ↔ commit précédent\n' +
          'git diff master..feature1   deux branches</code></pre>',
          '<p>En guise de discipline : avant chaque commit, un <code>git diff --staged</code> relit ce ' +
          'qui part vraiment. C\'est le réflexe qui évite les « modifications » comme message de commit.</p>',
          box('tech', 'Ce que diff ne montre pas', 'terminal',
            '    <p>diff ne montre que les fichiers modifiés : les fichiers non suivis (jamais ajoutés) ' +
            'n\'apparaissent pas. C\'est git status qui les liste — les deux commandes se complètent.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quelle commande montre une ligne par commit ?', opts: ['git show', 'git log --oneline', 'git diff'], correct: 1, exp: 'log --oneline : SHA abrégé + message, du plus récent au plus ancien.' },
      { stem: 'Avec reset --soft, où remontent les commits annulés ?', opts: ['Dans la corbeille', 'Dans l\'index', 'Nulle part'], correct: 1, exp: 'soft ramène les modifications dans l\'index : prêtes à être re-commitées.' },
      { stem: 'Quelle option de reset efface aussi la copie de travail ?', opts: ['--soft', '--mixed', '--hard'], correct: 2, exp: 'hard aligne les trois espaces sur le commit visé — les modifications locales sont perdues.' },
      { stem: 'Quelle est l\'option par défaut de git reset ?', opts: ['--soft', '--mixed', '--hard'], correct: 1, exp: 'Sans option, reset agit comme --mixed : index vidé, copie conservée.' },
      { stem: 'Que fait git revert ?', opts: ['Il supprime un commit de l\'historique', 'Il ajoute un commit qui annule un commit existant', 'Il remet le dépôt à zéro'], correct: 1, exp: 'revert annule avec trace : l\'historique gagne un commit de réversion.' },
      { stem: 'Sur un dépôt partagé, quelle annulation privilégier ?', opts: ['reset --hard', 'revert', 'git rm'], correct: 1, exp: 'revert préserve l\'historique partagé ; reset réécrirait le passé des autres.' },
      { stem: 'git diff --cached compare…', opts: ['copie ↔ index', 'index ↔ dépôt local', 'deux branches'], correct: 1, exp: '--cached (comme --staged) montre ce que l\'index contient par rapport au dépôt.' },
      { stem: 'Que ne montre pas git diff ?', opts: ['Les fichiers modifiés', 'Les fichiers non suivis', 'Les branches'], correct: 1, exp: 'diff ne voit que le suivi : les non suivis apparaissent dans git status.' }
    ],

    pitfalls: [
      '<strong>reset --hard par réflexe</strong> : les modifications locales disparaissent sans retour.',
      '<strong>reset sur un dépôt partagé</strong> : les autres subissent un historique réécrit.',
      '<strong>Confondre revert et reset</strong> : revert ajoute une trace, reset efface.',
      '<strong>HEAD~1 et HEAD^ confondus</strong> : les deux notent le parent, mais HEAD~n compte n génération.',
      '<strong>Se fier à diff seul</strong> : les fichiers non suivis n\'y figurent pas.'
    ],

    methodTitle: 'Revenir en arrière proprement',
    method: [
      '<strong>Identifier l\'état à rejoindre</strong> : SHA, HEAD~n, ou HEAD^.',
      '<strong>Se demander qui voit l\'historique</strong> : seul (reset possible) ou partagé (revert).',
      '<strong>Choisir l\'option de reset</strong> selon ce qu\'on garde : soft (index), mixed (copie), hard (rien).',
      '<strong>Sécuriser avant hard</strong> : stash ou copie de sauvegarde.',
      '<strong>Vérifier après</strong> : git log puis git status pour l\'état des trois espaces.'
    ],

    summary: [
      'git log liste les commits du plus récent au plus ancien ; --oneline une ligne par commit.',
      'reset déplace HEAD vers le passé : soft (index plein), mixed (défaut, index vide), hard (copie effacée).',
      'revert annule en ajoutant un commit de réversion : la méthode des dépôts partagés.',
      'git diff compare copie ↔ index (--cached : index ↔ dépôt) ; les non suivis restent dans status.',
      'Avant un reset --hard, stash : la récupération reste possible.'
    ],

    checklist: [
      'Je lis un git log --oneline et j\'identifie le commit cible.',
      'Je prédis l\'état des trois espaces après chaque option de reset.',
      'Je choisis reset ou revert selon que l\'historique est partagé ou non.',
      'Je compare deux états avec la bonne variante de git diff.'
    ],

    notions: ['git log', 'oneline', 'SHA-1', 'reset', 'soft', 'mixed', 'hard', 'revert', 'git diff', 'staged'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais le tableau des trois reset avec un scénario chacun.' },
      { cls: 'mid', text: '50–69 % — Simule un mauvais commit et corrige-le de deux façons.' },
      { cls: 'good', text: '70–89 % — Solide : prédis la sortie de git log après deux reverts.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les branches et les fusions.' }
    ],

    flashcards: [
      { q: 'Les trois options de git reset ?', a: '--soft : commits remontés dans l\'index ; --mixed (défaut) : index vidé, copie gardée ; --hard : tout aligné sur le commit cible.' },
      { q: 'reset vs revert ?', a: 'reset réécrit l\'historique (local, avant push) ; revert ajoute un commit d\'annulation (dépôts partagés).' },
      { q: 'git diff --cached montre quoi ?', a: 'Les différences entre l\'index et le dépôt local — ce qui partira au prochain commit.' },
      { q: 'Que montre git log --follow ?', a: 'L\'historique d\'un fichier, renommages compris.' }
    ]
  }
];

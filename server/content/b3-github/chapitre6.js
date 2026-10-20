/**
 * Chapitre 6 du cours « Git & GitHub B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Administration Avancée, LFS, Hooks &amp; Purge d’Historique',
  short: 'Administration, LFS &amp; Purge',
  toc: 'Gestion des gros fichiers binaires avec Git LFS, automatisation avec les hooks client et serveur, hygiène de dépôt, réécriture complète du DAG et purge de secrets compromis avec git-filter-repo.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Au fur et à mesure que les projets d’entreprise grandissent, deux fléaux majeurs menacent la viabilité des dépôts : l’explosion de la taille du dossier .git due au stockage inapproprié de gros fichiers binaires (datasets, modèles d’IA, fichiers multimédias), et la fuite catastrophique d’identifiants de production (clés API, mots de passe, certificats SSL) commis par mégarde dans l’historique. Un ingénieur de niveau Bachelor 3 doit maîtriser l’administration de haut niveau d’un dépôt : déporter les binaires lourds via l’architecture de pointeurs Git LFS, automatiser les contrôles qualité et sécurité au plus près des postes de travail grâce aux hooks Git, et maîtriser les techniques de réécriture complète de graphe (DAG rewrite) avec l’outil moderne git-filter-repo pour purger définitivement les secrets compromis sans corrompre l’intégrité du projet.',
  objectives: [
    'comprendre l’architecture de Git LFS (Large File Storage) et la spécification formelle de ses pointeurs textuels ;',
    'configurer le suivi de motifs de fichiers avec .gitattributes pour déporter les binaires volumineux vers un stockage d’objets dédié ;',
    'concevoir et déployer des hooks Git côté client (pre-commit, commit-msg) et côté serveur (pre-receive) ;',
    'analyser l’impact de l’empaquetage d’objets (.pack/.idx) et du garbage collector (git gc, git prune) sur les performances ;',
    'maîtriser l’utilisation de git-filter-repo pour expurger des secrets et supprimer des dossiers volumineux de l’historique complet ;',
    'développer en Python 3 des générateurs de pointeurs LFS, des vérificateurs de hooks pre-commit et des moteurs de purge de secrets.'
  ],
  sections: [
    {
      title: 'Gestion des Fichiers Volumineux : Architecture de Git LFS',
      html: [
        '<p>Par conception, Git est conçu pour le code source textuel : il calcule des deltas compressés efficaces entre versions successives. En revanche, pour des fichiers binaires volumineux (vidéos, modèles de Deep Learning, fichiers audio, archives compressées), toute modification infime réécrit l’intégralité du fichier, provoquant une <strong>croissance exponentielle de la taille du dépôt</strong> lors du clonage.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Fonctionnement de Git LFS</h4>',
        '    <p><strong>Git LFS (Large File Storage)</strong> remplace le fichier lourd dans l’arborescence Git par un <strong>micro-pointeur textuel</strong> de quelques octets :</p>',
        '    <ul>',
        '      <li>Le fichier binaire réel est téléversé séparément sur un serveur de stockage d’objets compatible LFS (ex: Amazon S3 ou stockage GitHub LFS).</li>',
        '      <li>Lors du <code>git checkout</code>, le client LFS télécharge uniquement les binaires nécessaires pour la version courante.</li>',
        '      <li>La configuration s’effectue dans le fichier tracé <code>.gitattributes</code> : <code>*.bin filter=lfs diff=lfs merge=lfs -text</code>.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Format Formel d’un Pointeur LFS (v1)</h4>',
        '    <p>Un pointeur LFS est un fichier texte strict respectant la spécification suivante :</p>',
        '    <pre><code>version https://git-lfs.github.com/spec/v1\noid sha256:4d7a214614ab2935c9470e9b14...\nsize 12345678</code></pre>',
        '    <p>Le champ <code>oid</code> contient l’identifiant d’objet calculé par la fonction de hachage <strong>SHA-256</strong> sur le contenu brut du binaire, suivi de sa taille exacte en octets.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Automatisation Locale &amp; Serveur : Les Hooks Git',
      html: [
        '<p>Les <strong>hooks (crochets)</strong> sont des scripts exécutables situés dans le dossier <code>.git/hooks/</code> (ou gérés via des frameworks modernes comme <code>pre-commit</code>) déclenchés automatiquement lors d’événements clés du cycle Git :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Nom du Hook</th><th>Emplacement</th><th>Moment d’Exécution</th><th>Cas d’Usage &amp; Pouvoir de Blocage</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>pre-commit</code></td>',
        '      <td>Client local</td>',
        '      <td>Avant la création du commit (après <code>git commit</code>).</td>',
        '      <td>Vérifie le formatage du code (Black, ESLint), détecte les clés d’API en clair ou les marqueurs de conflits non résolus. Si le script renvoie un code non-zéro, le commit est annulé.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>commit-msg</code></td>',
        '      <td>Client local</td>',
        '      <td>Après saisie du message de commit.</td>',
        '      <td>Valide le format du message selon la spécification Conventional Commits ou vérifie la présence d’un numéro de ticket JIRA.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>pre-push</code></td>',
        '      <td>Client local</td>',
        '      <td>Avant l’envoi des commits vers le serveur distant.</td>',
        '      <td>Exécute la suite de tests rapides pour éviter de pousser du code cassé sur le dépôt distant.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>pre-receive</code></td>',
        '      <td>Serveur distant</td>',
        '      <td>À la réception d’un push, avant mise à jour des refs.</td>',
        '      <td>Le garde-fou ultime d’entreprise : rejette tout push contenant des secrets, des commits non signés ou des branches non conformes à la politique PSSI.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Purge Radicale de Secrets &amp; Réécriture du DAG avec git-filter-repo',
      html: [
        '<p>L’incident de sécurité le plus redouté : un développeur commite par inadvertance un fichier <code>.env</code> contenant des clés privées AWS de production ou un token d’API Stripe dans un dépôt public.</p>',
        box('danger', 'Pourquoi « git rm » Ne Sert Absolument à Rien Face à une Fuite', [
          '<p>Exécuter <code>git rm .env &amp;&amp; git commit -m "suppression secret"</code> ne résout aucunement la compromission :</p>',
          '<p>Le secret est <strong>toujours présent et intact dans les commits antérieurs de l’historique</strong>. N’importe quel utilisateur qui clone le projet ou consulte l’arborescence passée peut extraire la clé !</p>'
        ]),
        '<p>Pour expurger définitivement un secret ou un fichier volumineux, il est indispensable de <strong>réécrire l’intégralité du graphe orienté acyclique (DAG)</strong> afin de supprimer ou anonymiser l’objet dans chaque commit passé. L’outil officiel et moderne recommandé par la documentation Git est <strong><code>git-filter-repo</code></strong> (remplaçant avantageusement le vieil outil obsolète et lent <code>git filter-branch</code>) :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Suppression Définitive d’un Fichier</h4>',
        '    <pre><code># Supprimer completement un fichier de tout l’historique\ngit-filter-repo --path .env --invert-paths</code></pre>',
        '    <p>Cette commande recalcule tous les arbres (trees) et tous les commits sans le fichier cible.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Remplacement de Secrets en Texte</h4>',
        '    <pre><code># Remplacer une cle par un texte factice\necho "AKIAIOSFODNN7EXAMPLE==>REDACTED" > expressions.txt\ngit-filter-repo --replace-text expressions.txt</code></pre>',
        '    <p>Tous les commits contenant la chaîne sont réécrits de manière atomique et instantanée.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Procédure Post-Purge en Production &amp; Révocation d’Urgence',
      html: [
        '<p>Une réécriture d’historique sur un dépôt d’entreprise requiert un protocole opérationnel millimétré :</p>',
        '<ol>',
        '  <li><strong>Révocation immédiate :</strong> Considérer le secret comme irrémédiablement compromis et le révoquer sur la plateforme cloud avant même de toucher à Git.</li>',
        '  <li><strong>Exécution de la purge locale :</strong> Cloner un miroir frais (<code>git clone --bare</code>) et appliquer <code>git-filter-repo</code>.</li>',
        '  <li><strong>Forçage des références distantes :</strong> <code>git push origin --force --all --tags</code>.</li>',
        '  <li><strong>Re-synchronisation de l’équipe :</strong> Tous les collaborateurs doivent jeter leur copie locale et re-cloner le dépôt assaini pour éviter de réintroduire les anciens commits réécrits.</li>',
        '</ol>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Protocole d’Assainissement d’un Dépôt après Fuite de Secret',
  method: [
    'Étape 1 : Révoquer et renouveler immédiatement le secret compromis auprès du fournisseur tiers (AWS, GitHub, Stripe, BDD).',
    'Étape 2 : Créer une sauvegarde bare de sécurité du dépôt dans un dossier isolé : git clone --bare mon-depot.git backup.git.',
    'Étape 3 : Sur un clone de travail dédié, exécuter git-filter-repo avec le motif de fichier ou l’expression de remplacement ciblée.',
    'Étape 4 : Vérifier avec git log -S "secret" que la chaîne compromise est devenue totalement introuvable dans tout l’historique.',
    'Étape 5 : Réassocier le remote distant et forcer la mise à jour : git push origin --force --all --tags.',
    'Étape 6 : Informer l’équipe technique et invalider les caches des serveurs d’intégration continue (runners CI).'
  ],
  summary: [
    'Git gère mal les fichiers binaires lourds : Git LFS résout ce problème en utilisant des pointeurs textuels légers (SHA-256).',
    'Le fichier .gitattributes spécifie les motifs de fichiers capturés par le filtre LFS (filter=lfs).',
    'Les hooks Git permettent d’automatiser des vérifications qualité et sécurité avant commit (pre-commit) ou à la réception serveur (pre-receive).',
    'Un git rm ne supprime pas un secret compromis des commits passés dans l’historique.',
    'git-filter-repo réécrit l’intégralité du DAG pour expurger définitivement fichiers volumineux ou données sensibles.',
    'Après une fuite de secret, la révocation immédiate de la clé auprès du service concerné est la priorité numéro un absolue.',
    'Toute réécriture d’historique modifie les hashes et impose un re-clonage propre par l’ensemble des collaborateurs.'
  ],
  checklist: [
    'Je comprends l’architecture de Git LFS et la structure d’un pointeur LFS v1.',
    'Je sais configurer .gitattributes pour orienter des fichiers binaires vers Git LFS.',
    'Je connais la différence entre un hook client (pre-commit) et un hook serveur (pre-receive).',
    'Je sais expliquer pourquoi git rm est inefficace pour corriger la fuite d’un mot de passe dans l’historique.',
    'Je maîtrise la commande git-filter-repo pour purger un fichier ou masquer un secret.',
    'Je connais la procédure opérationnelle complète à suivre en cas de fuite de clé de production.'
  ],
  notions: [
    'Git LFS (Large File Storage)',
    'Pointeurs textuels LFS (v1 spec)',
    'Fichier de configuration .gitattributes',
    'Hooks côté client (pre-commit, commit-msg)',
    'Hooks côté serveur (pre-receive)',
    'Réécriture de graphe (DAG Rewrite)',
    'Outil officiel git-filter-repo',
    'Protocole de remédiation post-fuite de secrets'
  ],
  pitfalls: [
    'Penser qu’effacer un secret dans le commit le plus récent élimine la vulnérabilité (il reste dans l’historique antérieur).',
    'Utiliser le vieil outil obsolète git filter-branch au lieu de git-filter-repo (trop lent et sujet à des corruptions).',
    'Oublier de révoquer le secret chez le fournisseur de service en pensant que réécrire Git suffit.',
    'Pousser de gros fichiers binaires dans Git sans LFS, ce qui fait exploser définitivement la taille du clone pour l’équipe.'
  ],
  questions: [
    {
      stem: 'Pourquoi le stockage direct de gros fichiers binaires dans Git classique pose-t-il un problème majeur de performance ?',
      opts: [
        'Parce que Git refuse les fichiers dont l’extension n’est pas en UTF-8',
        'Parce que Git conserve l’intégralité des versions successives dans le packfile, rendant les opérations de clone extrêmement lourdes',
        'Parce que les fichiers binaires empêchent l’utilisation de git branch',
        'Parce que le hachage SHA-1 ne fonctionne que sur du texte ASCII'
      ],
      correct: 1,
      exp: 'Git télécharge l’historique complet lors du clone. Pour des fichiers binaires non compressibles par deltas, la taille du dossier .git enfle de plusieurs gigaoctets, saturant le réseau et les disques.'
    },
    {
      stem: 'Que contient physiquement dans l’arbre Git un fichier suivi par Git LFS (Large File Storage) ?',
      opts: [
        'Le fichier binaire complet compressé avec gzip',
        'Un court pointeur textuel contenant la version LFS, le hash SHA-256 et la taille en octets',
        'Une clé API pointant vers un bucket Google Cloud Storage',
        'Un lien symbolique Unix vers le système de fichiers hôte'
      ],
      correct: 1,
      exp: 'Git LFS remplace le binaire par un micro-pointeur textuel contenant l’identifiant SHA-256 (oid) et la taille du fichier. Le binaire réel est déporté sur un serveur de stockage dédié.'
    },
    {
      stem: 'Dans quel fichier de configuration les règles associant des extensions de fichiers au filtre LFS sont-elles déclarées et tracées ?',
      opts: [
        '.git/config',
        '.gitattributes',
        '.lfsconfig',
        '.gitignore'
      ],
      correct: 1,
      exp: 'Le fichier .gitattributes versionné à la racine du dépôt définit les filtres appliqués aux fichiers lors des checkouts et commits (ex: *.psd filter=lfs diff=lfs merge=lfs -text).'
    },
    {
      stem: 'Quel hook Git côté client permet d’interrompre automatiquement un commit si des marqueurs de conflit non résolus sont détectés ?',
      opts: [
        'post-commit',
        'pre-commit',
        'post-merge',
        'prepare-commit-msg'
      ],
      correct: 1,
      exp: 'Le hook pre-commit s’exécute immédiatement après le lancement de git commit : s’il retourne un code de sortie non-zéro (suite à la détection de conflits ou erreurs de linter), Git interrompt la validation.'
    },
    {
      stem: 'Où le hook d’entreprise « pre-receive » s’exécute-t-il et quel est son avantage stratégique pour la sécurité ?',
      opts: [
        'Sur le poste du développeur pour chiffrer ses fichiers en local',
        'Sur le serveur distant à la réception d’un push, permettant de rejeter tout commit non conforme avant écriture',
        'Dans le navigateur web lors de la création d’une Pull Request',
        'Dans l’agent de signature GPG'
      ],
      correct: 1,
      exp: 'pre-receive s’exécute sur le serveur Git distant. Il examine l’ensemble des commits reçus et peut bloquer définitivement le push s’il contient des secrets, du code mal formaté ou des violations de politiques.'
    },
    {
      stem: 'Quelle commande moderne recommandée permet d’effacer définitivement un fichier confidentiel de l’historique complet d’un dépôt ?',
      opts: [
        'git reset --hard HEAD',
        'git-filter-repo --path secret.txt --invert-paths',
        'git rm --cached secret.txt',
        'git revert HEAD~1'
      ],
      correct: 1,
      exp: 'git-filter-repo avec l’option --path secret.txt --invert-paths réécrit tout le graphe DAG en excluant le fichier désigné de chaque commit passé.'
    },
    {
      stem: 'Quelle est la première action vitale à accomplir immédiatement dès qu’une clé d’API sensible est découverte sur un dépôt Git public ?',
      opts: [
        'Supprimer le dépôt de GitHub',
        'Révoquer et invalider immédiatement la clé auprès du fournisseur du service tiers concerné',
        'Faire un git commit pour supprimer le fichier .env',
        'Envoyer un email à l’équipe support de Git'
      ],
      correct: 1,
      exp: 'Même si le dépôt est nettoyé quelques minutes plus tard, des robots scrappeurs automatisés surveillent en permanence GitHub pour voler les secrets publiés. La seule parade absolue est la révocation immédiate du secret.'
    },
    {
      stem: 'Que doivent impérativement faire les membres de l’équipe de développement après une réécriture d’historique complète (purge de secrets) poussée sur le serveur ?',
      opts: [
        'Exécuter un simple git pull pour fusionner les branches',
        'Re-cloner une copie fraîche du dépôt assaini et supprimer leur ancien clone local',
        'Désinstaller puis réinstaller le client Git',
        'Créer un nouveau compte utilisateur GitHub'
      ],
      correct: 1,
      exp: 'Puisque la réécriture a modifié tous les hashes SHA de l’historique, faire un git pull réintroduirait les anciens commits non purgés. Les collaborateurs doivent cloner une copie neuve et supprimer l’ancienne.'
    }
  ],
  flashcards: [
    {
      q: 'Quel problème fondamental résout Git LFS ?',
      a: 'L’explosion de la taille du dossier .git lors du suivi de gros fichiers binaires, en remplaçant les binaires par de micro-pointeurs textuels légers.'
    },
    {
      q: 'Quels champs composent un pointeur textuel Git LFS v1 ?',
      a: 'La version de la spécification (version https://...), le hash SHA-256 du binaire (oid sha256:...) et sa taille en octets (size ...).'
    },
    {
      q: 'Quelle est la différence entre un hook pre-commit et un hook pre-receive ?',
      a: 'pre-commit s’exécute localement sur le poste du développeur avant la création du commit ; pre-receive s’exécute sur le serveur distant lors d’un push pour valider ou rejeter l’envoi.'
    },
    {
      q: 'Pourquoi « git rm » ne suffit-il pas pour effacer un secret commité par erreur ?',
      a: 'Car git rm crée un nouveau commit de suppression, mais le secret demeure intact et lisible dans tous les commits antérieurs de l’historique.'
    },
    {
      q: 'Quel outil remplace officiellement l’ancien et obsolète « git filter-branch » ?',
      a: 'git-filter-repo, un outil en Python infiniment plus rapide, fiable et simple pour réécrire le graphe DAG.'
    },
    {
      q: 'Quelle mesure d’urgence absolue prime sur le nettoyage de Git en cas de fuite de secret ?',
      a: 'La révocation immédiate de la clé auprès de la plateforme tierce (AWS, Stripe, etc.) afin de désactiver tout accès frauduleux.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à comprendre le rôle de Git LFS ou tentative de corriger une fuite de secret par un simple git rm.'
    },
    {
      cls: 'medium',
      text: 'Bonne configuration de .gitattributes pour LFS, utilisation de hooks pre-commit basiques et compréhension de git-filter-repo.'
    },
    {
      cls: 'high',
      text: 'Maîtrise complète de l’administration de dépôts à grande échelle, conception de hooks pre-receive stricts et orchestration rigoureuse des purges de secrets d’entreprise.'
    }
  ]
};

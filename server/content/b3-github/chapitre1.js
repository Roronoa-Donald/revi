/**
 * Chapitre 1 du cours « Git & GitHub B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'Modèle Objet Git &amp; Arborescence Interne',
  short: 'Modèle Objet &amp; Plomberie Git',
  toc: 'Anatomie du dossier .git, modèle objet immuable (blobs, trees, commits, tags), hachage SHA-1/SHA-256, adressage par contenu et commandes de plomberie.',
  time: '≈ 2 h 45 de travail',
  free: true,
  situation: 'Pour la majorité des utilisateurs débutants, Git apparaît comme une boîte noire mystérieuse où s’enchaînent des commandes mnémotechniques sans compréhension des structures sous-jacentes. Pourtant, au niveau Bachelor 3, l’ingénieur logiciel doit appréhender Git pour ce qu’il est réellement : un système de fichiers adressable par contenu (Content-Addressable Storage) doublé d’une base de données orientée graphe (Directed Acyclic Graph - DAG). Chaque fichier, chaque dossier, chaque commit et chaque étiquette est sérialisé en un objet immuable indexé par son empreinte cryptographique. Face à un dépôt corrompu, une défaillance de synchronisation ou l’écriture d’outils d’automatisation CI/CD, la maîtrise des commandes de plomberie (plumbing commands) et de l’arborescence interne du répertoire .git est la clé qui sépare l’utilisateur passif de l’expert en ingénierie logicielle.',
  objectives: [
    'analyser la structure détaillée et le rôle de chaque composant du répertoire interne .git (objects, refs, HEAD, index) ;',
    'comprendre le principe du stockage adressable par contenu et le calcul des identifiants cryptographiques SHA-1 et SHA-256 ;',
    'distinguer la structure, les métadonnées et le rôle des quatre types d’objets fondamentaux : blob, tree, commit et annotated tag ;',
    'démontrer le fonctionnement de l’arbre de Merkle et l’immuabilité cryptographique de l’historique de versions ;',
    'manipuler les commandes de plomberie de bas niveau (git hash-object, git cat-file, git ls-tree, git rev-parse) ;',
    'développer en Python 3 des parseurs de structures Git internes, des calculateurs de hashes conformes et des résolveurs de références.'
  ],
  sections: [
    {
      title: 'Anatomie Interne du Dossier .git &amp; Système Adressable par Contenu',
      html: [
        '<p>Lors de l’initialisation d’un dépôt via <code>git init</code>, Git génère un répertoire masqué <code>.git/</code> contenant l’intégralité de la base de données de versionnage. Contrairement aux systèmes centralisés (SVN, CVS) qui stockent des deltas successifs fichier par fichier sur un serveur distant, Git conserve des <strong>instantanés complets (snapshots)</strong> au sein d’une base de données clé-valeur locale.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>Architecture du Dossier <code>.git/</code></h4>',
        '    <ul>',
        '      <li><code>HEAD</code> : Référence symbolique pointant vers la branche active courante (ex: <code>ref: refs/heads/main</code>).</li>',
        '      <li><code>objects/</code> : Magasin d’objets adressés par leur empreinte SHA-1/SHA-256. Organisé en sous-dossiers de 2 caractères hexadécimaux pour optimiser les performances des systèmes de fichiers.</li>',
        '      <li><code>refs/</code> : Pointeurs vers des commits (branches locales dans <code>refs/heads/</code>, branches distantes dans <code>refs/remotes/</code>, étiquettes dans <code>refs/tags/</code>).</li>',
        '      <li><code>index</code> : Fichier binaire représentant la zone de transit (Staging Area), faisant le lien entre la copie de travail et la base d’objets.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Principe de l’Adressage par Contenu</h4>',
        '    <p>Une clé dans la base d’objets est la valeur de hachage cryptographique du contenu de l’objet préfixé par son en-tête. La clé détermine l’emplacement physique :</p>',
        '    <p>Un objet de hash <code>3b18e512...</code> sera sauvegardé dans le fichier <code>.git/objects/3b/18e512...</code> compressé avec l’algorithme DEFLATE (zlib).</p>',
        '    <p>Ce paradigme garantit une <strong>déduplication native</strong> : deux fichiers au contenu identique, quel que soit leur nom ou leur emplacement, partagent exactement la même entrée dans la base.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Les Quatre Types Fondamentaux d’Objets Git',
      html: [
        '<p>La base de données Git ne gère que quatre types d’objets atomiques, chacun ayant une structure et une responsabilité précises dans la reconstruction du projet :</p>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Type d’Objet</th><th>En-tête &amp; Format Brut</th><th>Contenu Stocké</th><th>Comportement vis-à-vis des Métadonnées</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>blob</code></td>',
        '      <td><code>blob &lt;taille&gt;\\0&lt;octets&gt;</code></td>',
        '      <td>Contenu brut du fichier (texte, image, binaire).</td>',
        '      <td><strong>Aucune métadonnée</strong> : ni nom de fichier, ni date, ni permissions d’accès Unix ne sont conservés dans un blob.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>tree</code></td>',
        '      <td><code>tree &lt;taille&gt;\\0[entrées...]</code></td>',
        '      <td>Liste ordonnée de références représentant un dossier.</td>',
        '      <td>Chaque entrée contient le mode Unix (<code>100644</code> pour standard, <code>100755</code> pour exécutable, <code>040000</code> pour sous-dossier), le type, le hash de l’objet cible et le nom du fichier.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>commit</code></td>',
        '      <td><code>commit &lt;taille&gt;\\0[en-têtes + message]</code></td>',
        '      <td>Instantané de projet avec traçabilité complète.</td>',
        '      <td>Pointe vers l’arbre racine (<code>tree</code>), les commits parents (0 pour le commit initial, 1 pour standard, 2+ pour fusion), l’auteur, le committer et le message.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>tag</code></td>',
        '      <td><code>tag &lt;taille&gt;\\0[cible + tagger + msg]</code></td>',
        '      <td>Objet d’étiquette annotée immuable.</td>',
        '      <td>Pointe vers un objet cible (généralement un commit), contient l’identifiant du signataire, un horodatage et optionnellement une signature cryptographique GPG.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    },
    {
      title: 'Cryptographie du Graphe : Hachage SHA, Immuabilité &amp; Arbre de Merkle',
      html: [
        '<p>La rigueur de Git découle de son organisation sous forme d’<strong>arbre de Merkle</strong> (Merkle Tree). Toute modification d’un seul caractère dans un fichier modifie son hash de blob, ce qui modifie le hash du tree parent, qui modifie le hash du commit qui le référence, jusqu’à la tête du graphe.</p>',
        box('standard', 'Calcul Exact de l’Empreinte SHA-1 d’un Objet Git', [
          '<p>Le hash affiché par Git n’est pas le simple hash du fichier : Git injecte un en-tête canonique avant le calcul cryptographique :</p>',
          '<pre><code>format_brut = f"{type_objet} {taille_en_octets}\\0{contenu_du_fichier}"\nsha1 = hashlib.sha1(format_brut).hexdigest()</code></pre>',
          '<p>Par exemple, pour un fichier contenant le mot <code>test\\n</code> (5 octets) :</p>',
          '<ul>',
          '  <li>En-tête : <code>blob 5\\0</code></li>',
          '  <li>Charge utile : <code>test\\n</code></li>',
          '  <li>Total à hacher : <code>blob 5\\0test\\n</code> (12 octets au total)</li>',
          '  <li>Empreinte SHA-1 résultante : <code>9daeafb9864cf43055ae93beb0afd6c7d144bfa4</code></li>',
          '</ul>'
        ]),
        '<p>En 2017, la première collision pratique sur SHA-1 (attaque SHAttered par le CWI et Google) a démontré la vulnérabilité théorique de l’algorithme. Depuis la version 2.29, Git supporte une transition architecturale vers <strong>SHA-256</strong> (hashes de 64 caractères hexadécimaux), renforçant la résilience cryptographique face aux ordinateurs modernes et attaques par collision ciblée.</p>'
      ].join('\n')
    },
    {
      title: 'Commandes de Plomberie vs Porcelaine : Contrôle de Bas Niveau',
      html: [
        '<p>Dans la terminologie inventée par Linus Torvalds, Git distingue deux couches d’interfaces :</p>',
        '<ul>',
        '  <li><strong>La porcelaine (Porcelain) :</strong> Commandes de haut niveau destinées à l’humain (<code>git status</code>, <code>git commit</code>, <code>git log</code>, <code>git checkout</code>). Elles masquent la complexité en orchestrant plusieurs actions de bas niveau.</li>',
        '  <li><strong>La plomberie (Plumbing) :</strong> Commandes spécialisées conçues pour les scripts et les outils internes. Elles manipulent directement les objets bruts et les références de la base de données.</li>',
        '</ul>',
        '<table class="table">',
        '  <thead>',
        '    <tr><th>Commande de Plomberie</th><th>Syntaxe Opérationnelle</th><th>Effet Technique</th></tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td><code>git hash-object</code></td>',
        '      <td><code>git hash-object -w fichier.txt</code></td>',
        '      <td>Calcule le SHA et écrit (<code>-w</code>) l’objet compressé dans le magasin <code>.git/objects/</code>.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>git cat-file</code></td>',
        '      <td><code>git cat-file -p &lt;hash&gt;</code> / <code>-t &lt;hash&gt;</code></td>',
        '      <td>Affiche le contenu formaté (<code>-p</code> pour pretty-print) ou le type de l’objet (<code>-t</code>).</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>git ls-tree</code></td>',
        '      <td><code>git ls-tree -r HEAD</code></td>',
        '      <td>Parcourt récursivement l’objet <code>tree</code> pour lister les blobs et sous-arbres avec leurs modes.</td>',
        '    </tr>',
        '    <tr>',
        '      <td><code>git rev-parse</code></td>',
        '      <td><code>git rev-parse HEAD</code></td>',
        '      <td>Résout une référence symbolique ou relative en son identifiant SHA canonique à 40 caractères.</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthode d’Ingénierie : Inspection & Audit des Objets Internes Git',
  method: [
    'Étape 1 : Localiser la référence courante en lisant le fichier .git/HEAD pour identifier la branche ou le commit actif.',
    'Étape 2 : Résoudre la référence symbolique via git rev-parse pour obtenir le hash SHA-1/SHA-256 complet du commit cible.',
    'Étape 3 : Inspecter la structure du commit via git cat-file -p pour extraire le hash de l’arbre racine (tree) et les parents.',
    'Étape 4 : Dérouler l’arborescence des répertoires et fichiers en explorant les entrées tree via git ls-tree.',
    'Étape 5 : Vérifier l’intégrité d’un fichier en recalculant son empreinte avec git hash-object et en la comparant au hash stocké.'
  ],
  summary: [
    'Git est un système de fichiers adressable par contenu reposant sur un graphe orienté acyclique (DAG).',
    'Le dossier .git/ contient toute la base de données : HEAD, objects/, refs/ et index.',
    'Quatre types d’objets immuables : blob (contenu pur), tree (répertoire), commit (instantané tracé), tag (étiquette annotée).',
    'Un blob ne stocke jamais son nom de fichier ni ses droits : ces métadonnées sont encapsulées dans les objets tree.',
    'Le hachage Git injecte toujours un préambule normalisé : type taille\\0contenu avant le calcul SHA-1 ou SHA-256.',
    'L’architecture en arbre de Merkle garantit que la modification d’un seul bit invalide et propage de nouveaux hashes en cascade.',
    'Les commandes de plomberie (hash-object, cat-file, ls-tree, rev-parse) permettent l’automatisation et le diagnostic précis.'
  ],
  checklist: [
    'Je sais expliquer la structure et le contenu du dossier masqué .git.',
    'Je connais la formule exacte du préambule injecté avant le hachage d’un objet Git.',
    'Je sais pourquoi un objet blob ne contient ni son nom de fichier ni ses permissions d’accès Unix.',
    'Je maîtrise la différence entre un objet tree et un objet commit dans le graphe DAG.',
    'Je sais utiliser git cat-file (-p, -t) pour inspecter n’importe quel objet de la base.',
    'Je suis capable de résoudre une référence symbolique vers un hash absolu avec git rev-parse.'
  ],
  notions: [
    'Système de fichiers adressable par contenu (CAS)',
    'Graphe Orienté Acyclique (DAG)',
    'Arbre de Merkle (Merkle Tree)',
    'Objet Blob (Binary Large Object)',
    'Objet Tree & modes de permissions Unix',
    'Objet Commit & chaîne d’ancêtres parents',
    'Empreintes cryptographiques SHA-1 & SHA-256',
    'Commandes de plomberie (Plumbing vs Porcelain)'
  ],
  pitfalls: [
    'Croire que Git stocke des fichiers entiers sous leur nom réel dans .git/objects/ (ils sont compressés et renommés selon leur hash).',
    'Penser qu’un blob conserve le nom du fichier (le nom est uniquement stocké dans l’objet tree parent).',
    'Oublier l’octet nul (« \\0 ») dans le calcul manuel du hash SHA-1 d’un objet Git.',
    'Confondre les références symboliques (HEAD pointant vers refs/heads/main) et les hashes absolus de commits.'
  ],
  questions: [
    {
      stem: 'Quelles informations sont réellement conservées à l’intérieur d’un objet Git de type « blob » ?',
      opts: [
        'Le nom du fichier, ses permissions Unix et son contenu brut',
        'Uniquement le contenu brut du fichier, sans nom ni droits d’accès',
        'Le chemin d’accès relatif, la date de modification et le hash SHA-1',
        'L’historique des deltas et modifications ligne par ligne du fichier'
      ],
      correct: 1,
      exp: 'Un blob ne contient que le contenu brut en octets du fichier. Le nom du fichier et les droits d’accès (permissions Unix) sont exclusivement portés par l’objet tree parent.'
    },
    {
      stem: 'Quelle formule correspond exactement à la chaîne d’octets hachée par Git pour un objet blob de 10 octets ?',
      opts: [
        'sha1("blob 10:" + contenu)',
        'sha1("blob 10\\0" + contenu)',
        'sha1(contenu + "\\0blob 10")',
        'sha1("file 10\\n" + contenu)'
      ],
      correct: 1,
      exp: 'Le standard Git injecte toujours le préambule : type + espace + taille_en_octets + octet_nul (\\0) suivi du contenu brut avant d’appliquer la fonction de hachage cryptographique.'
    },
    {
      stem: 'Dans quelle structure Git les permissions d’accès Unix d’un fichier (ex: 100644 ou 100755) sont-elles enregistrées ?',
      opts: [
        'Dans le fichier .git/config du dépôt local',
        'Dans l’en-tête de l’objet blob lui-même',
        'Dans les entrées de l’objet tree parent',
        'Dans les métadonnées de l’objet commit'
      ],
      correct: 2,
      exp: 'C’est l’objet tree qui référence chaque blob en lui associant son mode Unix (100644 pour un fichier normal, 100755 pour un exécutable, 120000 pour un lien symbolique) et son nom.'
    },
    {
      stem: 'À quoi sert la commande de plomberie « git cat-file -t <hash> » ?',
      opts: [
        'À afficher le type de l’objet Git (blob, tree, commit ou tag)',
        'À imprimer le contenu formatté du fichier',
        'À tester si le hash correspond à une branche distante',
        'À transformer un objet SHA-1 en objet SHA-256'
      ],
      correct: 0,
      exp: 'L’option -t (type) de git cat-file retourne le nom du type de l’objet correspondant au hash dans la base de données Git (blob, tree, commit ou tag).'
    },
    {
      stem: 'Que contient le fichier spécial « .git/HEAD » dans un état normal sur la branche principale « main » ?',
      opts: [
        'Le hash SHA-1 direct du dernier commit de la branche',
        'La chaîne « ref: refs/heads/main »',
        'L’arbre racine (root tree) de la copie de travail',
        'La liste de tous les commits créés au cours de la session courante'
      ],
      correct: 1,
      exp: 'HEAD est une référence symbolique pointant vers la branche active. Son contenu est textuellement « ref: refs/heads/main » (sauf en état de tête détachée / detached HEAD où il contient un SHA-1 direct).'
    },
    {
      stem: 'Quel est l’impact de la modification d’un seul octet dans un fichier sur l’arbre de Merkle du dépôt ?',
      opts: [
        'Seul le hash du blob est modifié, le reste du dépôt conserve les mêmes hashes',
        'Le hash du blob, du tree parent et de tous les commits ancêtres subséquents sont recalculés',
        'Le fichier .git/index est corrompu et doit être réinitialisé via git init',
        'Git stocke un patch de différence sans toucher à la chaîne des objets SHA'
      ],
      correct: 1,
      exp: 'L’arbre de Merkle garantit l’intégrité en cascade : changer le blob modifie le tree qui le contient, ce qui modifie le commit qui référence ce tree, garantissant l’immuabilité de l’historique.'
    },
    {
      stem: 'Quelle commande de plomberie permet d’écrire directement un nouvel objet blob dans le magasin .git/objects/ ?',
      opts: [
        'git commit-tree',
        'git write-tree',
        'git hash-object -w',
        'git update-ref'
      ],
      correct: 2,
      exp: 'L’option -w (write) de git hash-object ordonne à Git de calculer le hash et d’enregistrer physiquement l’objet compressé dans le répertoire .git/objects/.'
    },
    {
      stem: 'Combien de parents possède le tout premier commit (commit initial) créé dans un dépôt Git ?',
      opts: [
        'Aucun parent (0 parent)',
        'Exactement 1 parent pointant sur HEAD',
        '2 parents pointant vers le système de fichiers',
        '1 parent fictif constitué de 40 zéros'
      ],
      correct: 0,
      exp: 'Le commit initial (root commit) n’a aucun commit parent. Un commit standard en possède un, et un commit de fusion en possède au moins deux.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce qu’un système de fichiers adressable par contenu (CAS) dans Git ?',
      a: 'Un système où chaque élément est stocké et retrouvé non par son nom arbitraire, mais par la valeur de hachage cryptographique (SHA-1 ou SHA-256) de son contenu et de son en-tête.'
    },
    {
      q: 'Quelle est la différence fondamentale entre un objet blob et un objet tree ?',
      a: 'Le blob stocke le contenu pur du fichier sans nom ni permissions ; le tree représente un répertoire en associant des noms de fichiers, des permissions Unix et des hashes d’objets cibles.'
    },
    {
      q: 'Quel est le format exact de l’en-tête injecté par Git avant de calculer l’empreinte SHA ?',
      a: '<type> <taille_en_octets>\\0 (ex: "blob 25\\0", où \\0 est l’octet nul terminateur).'
    },
    {
      q: 'Que signifie l’expression « Detached HEAD » (tête détachée) ?',
      a: 'La référence HEAD contient directement le hash d’un commit au lieu de pointer symboliquement vers une branche (ex: ref: refs/heads/main).'
    },
    {
      q: 'Pourquoi l’attaque SHAttered a-t-elle poussé Git à préparer la transition vers SHA-256 ?',
      a: 'Car SHAttered a démontré qu’une collision pratique sur SHA-1 était réalisable (deux contenus différents produisant le même hash), menaçant l’intégrité du graphe Git.'
    },
    {
      q: 'À quoi sert la commande « git rev-parse » ?',
      a: 'À résoudre et convertir n’importe quel spécificateur de révision symbolique ou relatif (HEAD, main, HEAD~2) en son identifiant de commit SHA-1/SHA-256 canonique.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Difficultés à distinguer blobs et trees ou méconnaissance de la structure interne du répertoire .git.'
    },
    {
      cls: 'medium',
      text: 'Bonne compréhension du modèle objet, calcul manuel du hash SHA-1 maîtrisé et utilisation régulière des commandes cat-file et rev-parse.'
    },
    {
      cls: 'high',
      text: 'Excellente maîtrise du modèle DAG, manipulation fluide de la plomberie Git, compréhension rigoureuse des arbres de Merkle et transition vers SHA-256.'
    }
  ]
};

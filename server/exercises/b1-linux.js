/**
 * Exercices de code — Linux B1, 3 par module, en Bash (langage `shell`).
 *
 * Le support couvre l'arborescence, les commandes de base, la recherche, les
 * droits d'accès et la gestion des utilisateurs. Dans le service d'exécution,
 * chaque fiche tourne dans un bac à sable sans root : ce qui se *calcule* en
 * shell est simulé sur des données lues sur l'entrée standard (arborescences
 * en texte, ls -l artificiels, /etc/passwd factice), et ce qui se *fait* sur
 * la machine (useradd, chmod réel) reste du papier — c'est annoncé dans les
 * énoncés.
 *
 * Idiome commun : le script lit ses données sur l'entrée standard, ligne par
 * ligne, avec `read`. Aucune commande d'administration n'est nécessaire.
 *
 * Même contrat que les autres catalogues : `brief`, `starter`, `examples`
 * (visibles), `tests` (cachés), `hints` (en mots), `solution` (serveur seul).
 */

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Module 1 — L'arborescence et le shell
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Chemins absolus ou relatifs',
    goal: 'Classifier des chemins et résoudre un chemin relatif depuis un répertoire courant.',
    brief: '<p>Le script lit d\'abord le <strong>répertoire courant</strong> (une ligne), puis ' +
      '<strong>n chemins</strong> (une ligne chacun). Pour chaque chemin, il affiche ' +
      '<code>absolu</code> s\'il commence par <code>/</code>, sinon <code>relatif</code> suivi, après ' +
      '« <code> → </code> », de sa résolution depuis le répertoire courant : ' +
      '<code>/home/user/docs</code> + <code>cours/linux</code> donnent ' +
      '<code>relatif → /home/user/docs/cours/linux</code>.</p>',
    starter: `read -r cwd
read -r n
for ((i=0; i<n; i++)); do
  read -r chemin
  # À compléter : afficher « absolu » ou « relatif → chemin résolu ».
done
`,
    hints: [
      'Un chemin est absolu exactement quand son premier caractère est « / » : test \${chemin:0:1} = "/".',
      'Un chemin relatif se résout en le collant au répertoire courant : `"$cwd/$chemin"`.'
    ],
    examples: [
      { stdin: '/home/user/docs\n3\n/etc/passwd\ncours/linux\n./notes.txt\n', expected: 'absolu\nrelatif → /home/user/docs/cours/linux\nrelatif → /home/user/docs/./notes.txt', note: 'Seul le premier caractère décide ; ./notes.txt reste relatif.' }
    ],
    tests: [
      { label: 'Racine et remontée', stdin: '/var/log\n2\n/\n../cache\n', expected: 'absolu\nrelatif → /var/log/../cache' },
      { label: 'Répertoire racine courant', stdin: '/\n2\nbin\ndoc.txt\n', expected: 'relatif → //bin\nrelatif → //doc.txt' },
      { label: 'Un seul chemin', stdin: '/tmp\n1\n/home\n', expected: 'absolu' }
    ],
    solution: `read -r cwd
read -r n
for ((i=0; i<n; i++)); do
  read -r chemin
  if [ "\${chemin:0:1}" = "/" ]; then
    echo "absolu"
  else
    echo "relatif → $cwd/$chemin"
  fi
done
`
  },
  {
    id: 'lx-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Fonctions d\'une arborescence',
    goal: 'Associer chaque répertoire standard à son rôle et retrouver le rôle d\'un chemin demandé.',
    brief: '<p>Le script lit <strong>une requête par ligne</strong> (jusqu\'à la fin de l\'entrée) : ' +
      'un chemin standard (<code>/home</code>, <code>/tmp</code>, <code>/etc</code>, <code>/var</code>, ' +
      '<code>/bin</code>, <code>/usr</code>, <code>/root</code>, <code>/dev</code>). Pour chacune il ' +
      'affiche son rôle exactement comme ci-dessous ; un chemin inconnu donne ' +
      '<code>inconnu</code>.</p>\n' +
      '<p>Rôles attendus : /home → <code>repertoires personnels</code> ; /tmp → ' +
      '<code>fichiers temporaires</code> ; /etc → <code>configuration</code> ; /var → ' +
      '<code>donnees variables</code> ; /bin → <code>binaires essentiels</code> ; /usr → ' +
      '<code>applications et librairies</code> ; /root → <code>repertoire de root</code> ; ' +
      '/dev → <code>fichiers de peripheriques</code>.</p>',
    starter: `while read -r chemin; do
  case "$chemin" in
    # À compléter : un motif par répertoire, avec son rôle.
  esac
done
`,
    hints: [
      'Le case de bash : "*) ... ;;" pour l\'inconnu, en dernier motif.',
      'Chaque branche affiche exactement la chaîne demandée : pas d\'accent dans les sorties attendues.'
    ],
    examples: [
      { stdin: '/tmp\n/home\n/donnees\n', expected: 'fichiers temporaires\nrepertoires personnels\ninconnu', note: 'Les rôles, dans l\'ordre des requêtes.' }
    ],
    tests: [
      { label: 'Configuration et variables', stdin: '/etc\n/var\n', expected: 'configuration\ndonnees variables' },
      { label: 'Binaires et root', stdin: '/bin\n/root\n', expected: 'binaires essentiels\nrepertoire de root' },
      { label: 'Inconnus et périphériques', stdin: '/dev\n/data\n/mnt\n', expected: 'fichiers de peripheriques\ninconnu\ninconnu' }
    ],
    solution: `while read -r chemin; do
  case "$chemin" in
    /home) echo "repertoires personnels" ;;
    /tmp)  echo "fichiers temporaires" ;;
    /etc)  echo "configuration" ;;
    /var)  echo "donnees variables" ;;
    /bin)  echo "binaires essentiels" ;;
    /usr)  echo "applications et librairies" ;;
    /root) echo "repertoire de root" ;;
    /dev)  echo "fichiers de peripheriques" ;;
    *)     echo "inconnu" ;;
  esac
done
`
  },
  {
    id: 'lx-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Arborescence artificielle',
    goal: 'Maintenir une arborescence simulée : créer, lister et compter les éléments par type.',
    brief: '<p>Le script gère une arborescence en texte. Il lit <strong>n lignes</strong> d\'opérations : ' +
      '<code>mkdir chemin</code>, <code>touch chemin</code> (création), ou ' +
      '<code>ls</code> (lister). À chaque <code>ls</code> il affiche les chemins créés, dans l\'ordre de ' +
      'création, sous la forme <code>repertoire: chemin</code> ou <code>fichier: chemin</code> selon le ' +
      'type. La dernière ligne affiche le bilan : <code>bilan : R repertoire(s) F fichier(s)</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op chemin
  # À compléter : mémoriser chaque création, répondre au ls.
done
# À compléter : afficher le bilan.
`,
    hints: [
      'Deux tableaux (ou deux chaînes) suffisent : un pour les répertoires, un pour les fichiers, remplis dans l\'ordre.',
      'Pour ls, parcourir les deux tableaux dans l\'ordre de création ; le bilan compte les éléments de chacun.'
    ],
    examples: [
      { stdin: '6\nmkdir /home/user\ntouch /etc/passwd\nls\nmkdir /var/log\ntouch /var/log/syslog\nls\n', expected: 'repertoire: /home/user\nfichier: /etc/passwd\nrepertoire: /home/user\nfichier: /etc/passwd\nrepertoire: /var/log\nfichier: /var/log/syslog\nbilan : 2 repertoire(s) 2 fichier(s)', note: 'Chaque ls rejoue toute la création depuis le début.' }
    ],
    tests: [
      { label: 'Rien qu\'un ls vide', stdin: '1\nls\n', expected: 'bilan : 0 repertoire(s) 0 fichier(s)' },
      { label: 'Que des répertoires', stdin: '3\nmkdir /a\nmkdir /a/b\nls\n', expected: 'repertoire: /a\nrepertoire: /a/b\nbilan : 2 repertoire(s) 0 fichier(s)' },
      { label: 'Fichiers seuls', stdin: '2\ntouch x.txt\nls\n', expected: 'fichier: x.txt\nbilan : 0 repertoire(s) 1 fichier(s)' }
    ],
    solution: `read -r n
repertoires=()
fichiers=()
ordre=()
for ((i=0; i<n; i++)); do
  read -r op chemin
  if [ "$op" = "mkdir" ]; then
    repertoires+=("$chemin"); ordre+=("r:$chemin")
  elif [ "$op" = "touch" ]; then
    fichiers+=("$chemin"); ordre+=("f:$chemin")
  elif [ "$op" = "ls" ]; then
    for item in "\${ordre[@]}"; do
      if [ "\${item:0:2}" = "r:" ]; then
        echo "repertoire: \${item:2}"
      else
        echo "fichier: \${item:2}"
      fi
    done
  fi
done
echo "bilan : \${#repertoires[@]} repertoire(s) \${#fichiers[@]} fichier(s)"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 2 — Fichiers : ls -l, métadonnées, liens
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Lire une ligne ls -l',
    goal: 'Décoder les neuf caractères de droits d\'une ligne ls -l en classes utilisateur/groupe/autres.',
    brief: '<p>Le script lit <strong>n lignes</strong> au format ls -l réduit : ' +
      '<code>DROITS NOM</code> (ex. <code>-rw-r--r-- notes.txt</code>). Le premier caractère est le type ' +
      '(<code>-</code> fichier, <code>d</code> répertoire) ; les neuf suivants sont les droits. Pour ' +
      'chaque ligne il affiche : <code>NOM : TYPE, u=DROITSu, g=DROITSg, o=DROITSo</code> où DROITSu/g/o ' +
      'sont les triplets (ex. <code>rw-</code>).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r droits nom
  # À compléter : découper les neuf caractères en trois triplets.
done
`,
    hints: [
      'Les triplets se découpent par positions : `\${droits:1:3}`, `\${droits:4:3}`, `\${droits:7:3}`.',
      'Le type est \${droits:0:1} : traduire - en « fichier » et d en « repertoire ».'
    ],
    examples: [
      { stdin: '2\n-rw-r--r-- notes.txt\ndrwxr-x--- dossier\n', expected: 'notes.txt : fichier, u=rw-, g=r--, o=r--\ndossier : repertoire, u=rwx, g=r-x, o=---', note: 'Un fichier et un répertoire classiques.' }
    ],
    tests: [
      { label: 'Script exécutable', stdin: '1\n-rwxr-xr-x run.sh\n', expected: 'run.sh : fichier, u=rwx, g=r-x, o=r-x' },
      { label: 'Tout interdit', stdin: '1\n---------- vide.txt\n', expected: 'vide.txt : fichier, u=---, g=---, o=---' },
      { label: 'Répertoire privé', stdin: '2\ndrwx------ secret\n-rw-rw-rw- partagé\n', expected: 'secret : repertoire, u=rwx, g=---, o=---\npartagé : fichier, u=rw-, g=rw-, o=rw-' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r droits nom
  type="fichier"
  [ "\${droits:0:1}" = "d" ] && type="repertoire"
  echo "$nom : $type, u=\${droits:1:3}, g=\${droits:4:3}, o=\${droits:7:3}"
done
`
  },
  {
    id: 'lx-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Compter les permissions',
    goal: 'Convertir chaque triplet symbolique en valeur octale et produire les trois chiffres de chmod.',
    brief: '<p>Le script lit <strong>n lignes</strong> <code>DROITS NOM</code> comme au format ls -l ' +
      '(<code>-rw-r--r-- notes.txt</code>). Pour chacune il calcule la <strong>valeur octale</strong> ' +
      'des droits (r = 4, w = 2, x = 1, par triplet) et affiche ' +
      '<code>NOM : octal</code> — par exemple <code>rw-r--r--</code> donne <code>644</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r droits nom
  # À compléter : convertir chaque triplet en un chiffre octal.
done
`,
    hints: [
      'Pour un triplet, additionner : 4 si le premier caractère est r, 2 si le second est w, 1 si le troisième est x.',
      'Boucler sur les trois positions du triplet avec une coupe \${triplet:i:1}, et construire la chaîne octale chiffre par chiffre.'
    ],
    examples: [
      { stdin: '3\n-rw-rw-r-- liste\ndrwx------ prive\n-r-xr-x--- vue\n', expected: 'liste : 664\nprive : 700\nvue : 550', note: 'rw- = 6, rw- = 6, r-- = 4 ; rwx = 7 ; r-x = 5.' }
    ],
    tests: [
      { label: 'Exécutable complet', stdin: '1\n-rwxrwxrwx script.sh\n', expected: 'script.sh : 777' },
      { label: 'Aucun droit', stdin: '1\n---------- vide\n', expected: 'vide : 000' },
      { label: 'Mélange', stdin: '3\n-rw-r----- log\ndr-xr-xr-x pub\n-rw------- cle.pem\n', expected: 'log : 640\npub : 555\ncle.pem : 600' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r droits nom
  octal=""
  for debut in 1 4 7; do
    valeur=0
    [ "\${droits:$debut:1}" = "r" ] && valeur=$((valeur + 4))
    [ "\${droits:$((debut + 1)):1}" = "w" ] && valeur=$((valeur + 2))
    [ "\${droits:$((debut + 2)):1}" = "x" ] && valeur=$((valeur + 1))
    octal="$octal$valeur"
  done
  echo "$nom : $octal"
done
`
  },
  {
    id: 'lx-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'Liens symboliques simulés',
    goal: 'Suivre une chaîne de liens symboliques vers un fichier, une destination absente ou un cycle.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> ' +
      '<code>lien destination</code> décrivant des liens : <code>ln -s destination lien</code> crée ' +
      'un lien qui pointe vers sa destination. Il lit ensuite <strong>m</strong>, puis <strong>m lignes</strong> ' +
      'contenant chacune le nom d\'un fichier existant, et enfin le <strong>point de départ</strong>. ' +
      'Les noms sont des mots non vides sans espace ; les noms des liens sont distincts et ne figurent pas ' +
      'parmi les fichiers existants. Ces tables simulent le système de fichiers.</p>' +
      '<p>Suivre les liens et afficher le nom du fichier final s\'il existe dans la liste. Si le nom ' +
      'final, y compris le point de départ, n\'est ni un lien ni un fichier existant, afficher ' +
      '<code>casse</code>. Si un nom de lien est rencontré à nouveau, afficher <code>boucle</code>.</p>',
    starter: `read -r n
declare -A liens
for ((i=0; i<n; i++)); do
  read -r lien destination
  liens["$lien"]="$destination"
done
read -r m
declare -A fichiers
for ((i=0; i<m; i++)); do
  read -r fichier
  fichiers[$fichier]=1
done
read -r depart
# À compléter : suivre la chaîne jusqu'au fichier final.
`,
    hints: [
      'Tant que le nom courant est une clé de liens[\${entree}], avancer vers sa destination.',
      'Mémoriser les noms de liens déjà visités : une répétition signale un cycle. Sinon, vérifier si le nom final figure dans fichiers.',
      'Pour afficher le nom final, printf évite que echo interprète un nom comme -n comme une option.'
    ],
    examples: [
      { stdin: '3\ntexte texte.txt\ntexte.txt fichier\ndoc texte\n1\nfichier\ndoc\n', expected: 'fichier', note: 'doc → texte → texte.txt → fichier ; fichier figure dans la liste des fichiers existants.' },
      { stdin: '1\nalias disparu\n0\nalias\n', expected: 'casse', note: 'Le nom disparu ne figure ni parmi les liens ni parmi les fichiers existants.' }
    ],
    tests: [
      { label: 'Chaîne vers un fichier', stdin: '2\nraccourci entree\nentree -n\n1\n-n\nraccourci\n', expected: '-n' },
      { label: 'Lien cassé', stdin: '2\nalpha beta\nbeta disparition\n1\nphoto\nalpha\n', expected: 'casse' },
      { label: 'Départ inconnu', stdin: '1\nb a\n1\na\ninconnu\n', expected: 'casse' },
      { label: 'Boucle', stdin: '2\na b\nb a\n1\nc\na\n', expected: 'boucle' },
      { label: 'Chaîne de 101 liens', stdin: `101\n${Array.from({ length: 101 }, (_, index) =>
        `lien${index} ${index === 100 ? 'fichier' : `lien${index + 1}`}`).join('\n')}\n1\nfichier\nlien0\n`, expected: 'fichier' },
      { label: 'Chaîne longue cassée', stdin: `101\n${Array.from({ length: 101 }, (_, index) =>
        `lien${index} ${index === 100 ? 'absent' : `lien${index + 1}`}`).join('\n')}\n0\nlien0\n`, expected: 'casse' }
    ],
    solution: `read -r n
declare -A liens
for ((i=0; i<n; i++)); do
  read -r lien destination
  liens["$lien"]="$destination"
done
read -r m
declare -A fichiers
for ((i=0; i<m; i++)); do
  read -r fichier
  fichiers[$fichier]=1
done
read -r depart

courant="$depart"
declare -A visites
while [ -n "\${liens[$courant]+x}" ]; do
  if [ -n "\${visites[$courant]+x}" ]; then
    echo "boucle"
    exit 0
  fi
  visites["$courant"]=1
  courant="\${liens[$courant]}"
done
if [ -n "\${fichiers[$courant]+x}" ]; then
  printf '%s\\n' "$courant"
else
  echo "casse"
fi
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 3 — Recherche : find, filtres et tri
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'find -name simulé',
    goal: 'Filtrer des chemins par motif de nom : commencent par, finissent par, contiennent.',
    brief: '<p>Le script lit <strong>n chemins</strong> (une ligne chacun), puis <strong>un motif</strong> : ' +
      '<code>prefixe:X</code> (noms de base commençant par X), <code>suffixe:X</code> (finissant par X) ou ' +
      '<code>contient:X</code>. Il affiche les chemins retenus, dans l\'ordre d\'entrée, puis la dernière ' +
      'ligne <code>trouves : K</code>. Le motif porte sur le <strong>nom de base</strong> (après le ' +
      'dernier <code>/</code>), jamais sur les répertoires parents.</p>',
    starter: `read -r n
chemins=()
for ((i=0; i<n; i++)); do
  read -r chemin
  chemins+=("$chemin")
done
read -r motif
# À compléter : filtrer selon le motif, sur le nom de base.
`,
    hints: [
      'Le nom de base s\'obtient avec \${chemin##*/} : tout supprimer jusqu\'au dernier /.',
      'Trois formes de motif : `\${base#"$X"} != "$base"` (commence), `\${base%"$X"} != "$base"` (finit), ou un test de sous-chaîne.'
    ],
    examples: [
      { stdin: '4\n/tmp/fichier1\n/tmp/fichier2\n/home/testfichier1\n/etc/passwd\nprefixe:fichier\n', expected: '/tmp/fichier1\n/tmp/fichier2\ntrouves : 2', note: 'Le /home/testfichier1 a « test » devant : pas de correspondance de préfixe.' }
    ],
    tests: [
      { label: 'Suffixe', stdin: '3\n/a/notes.txt\n/b/log\n/c/config.txt\nsuffixe:.txt\n', expected: '/a/notes.txt\n/c/config.txt\ntrouves : 2' },
      { label: 'Contient', stdin: '3\n/var/log/syslog\n/var/auth.log\n/etc/hosts\ncontient:log\n', expected: '/var/log/syslog\n/var/auth.log\ntrouves : 2' },
      { label: 'Aucune correspondance', stdin: '2\n/a/x\n/b/y\ncontient:zzz\n', expected: 'trouves : 0' },
      { label: 'Préfixe du nom, pas du dossier', stdin: '4\n/usr/log/catalogue\n/archives/log2026\n/log/prefixe\n/var/logfile\nprefixe:log\n', expected: '/archives/log2026\n/var/logfile\ntrouves : 2' }
    ],
    solution: `read -r n
chemins=()
for ((i=0; i<n; i++)); do
  read -r chemin
  chemins+=("$chemin")
done
read -r motif
genre="\${motif%%:*}"
valeur="\${motif#*:}"
trouves=0
for chemin in "\${chemins[@]}"; do
  base="\${chemin##*/}"
  retenu=0
  if [ "$genre" = "prefixe" ] && [ "\${base#"$valeur"}" != "$base" ]; then
    retenu=1
  elif [ "$genre" = "suffixe" ] && [ "\${base%"$valeur"}" != "$base" ]; then
    retenu=1
  elif [ "$genre" = "contient" ] && [[ "$base" == *"$valeur"* ]]; then
    retenu=1
  fi
  if [ "$retenu" = "1" ]; then
    echo "$chemin"
    trouves=$((trouves + 1))
  fi
done
echo "trouves : $trouves"
`
  },
  {
    id: 'lx-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'find par taille',
    goal: 'Convertir des tailles en octets, filtrer par seuil et trier le résultat.',
    brief: '<p>Le script lit d\'abord <strong>un seuil</strong>, puis <strong>n</strong> et ' +
      '<strong>n lignes</strong> <code>NOM TAILLE</code>. Le seuil et TAILLE s\'écrivent ' +
      '<code>123</code> (octets), <code>45K</code> ou <code>2M</code>. ' +
      'Les nombres sont des entiers décimaux non négatifs ; les zéros initiaux sont autorisés, y compris pour n. ' +
      'Dans cette simulation, K représente 1024 octets (1 Kio) et M représente 1048576 octets (1 Mio), ' +
      'à distinguer des préfixes décimaux kilo et méga. Après conversion, les tailles ' +
      'et le seuil ne dépassent pas <code>9223372036854775807</code> octets. ' +
      'Il affiche les fichiers dont la taille est ' +
      '<strong>strictement supérieure</strong> au seuil, convertis en octets sous la forme ' +
      '<code>NOM OCTETS</code>, triés de la plus grosse taille à la plus petite (tailles égales : ordre ' +
      'd\'entrée). La dernière ligne : <code>total : K fichier(s)</code>.</p>',
    starter: `read -r seuil
read -r n
n=$((10#$n))
for ((i=0; i<n; i++)); do
  read -r nom taille
  # À compléter : convertir, filtrer, mémoriser.
done
# À compléter : afficher le rapport trié puis le total.
`,
    hints: [
      'Le seuil arrive en première ligne : le lire avant n, sinon la boucle le prend pour un fichier.',
      'Conversion : retirer K ou M, lire le nombre en base 10 avec 10#, puis multiplier par 1024 ou 1024 × 1024.',
      'Un tri simple à la main : boucler en prenant à chaque tour le maximum restant, ou trier le tableau par insertion.'
    ],
    examples: [
      { stdin: '1M\n4\ngros.txt 3M\nmoyen.log 500K\npetit.txt 100\nimage.png 2M\n', expected: 'gros.txt 3145728\nimage.png 2097152\ntotal : 2 fichier(s)', note: '3M et 2M dépassent 1M ; 500K et 100 octets restent sous le seuil.' }
    ],
    tests: [
      { label: 'Seuil en kilo-octets', stdin: '1K\n3\na 2K\nb 1K\nc 3K\n', expected: 'c 3072\na 2048\ntotal : 2 fichier(s)' },
      { label: 'Égalité exclue', stdin: '1M\n2\na 1M\nb 1M\n', expected: 'total : 0 fichier(s)' },
      { label: 'Tailles égales', stdin: '1M\n3\na 2M\nb 2M\nc 3M\n', expected: 'c 3145728\na 2097152\nb 2097152\ntotal : 3 fichier(s)' },
      { label: 'Seuil en octets', stdin: '1023\n4\nk 1K\na 1023\nb 1024\nm 1M\n', expected: 'm 1048576\nk 1024\nb 1024\ntotal : 3 fichier(s)' },
      { label: 'Zéros initiaux et égalité', stdin: '08K\n4\npetit 1K\negal 008K\ngrand 09K\naussi 9K\n', expected: 'grand 9216\naussi 9216\ntotal : 2 fichier(s)' },
      { label: 'Compte et octets décimaux', stdin: '0008\n08\negal 0008\nneuf 0009\nzero 0\nautre 009\nhuit 08\npetit 1\ngrand 10\nneuf2 9\n', expected: 'grand 10\nneuf 9\nautre 9\nneuf2 9\ntotal : 4 fichier(s)' },
      { label: 'Borne entière après conversion', stdin: '9223372036854774783\n2\nlimite 9007199254740991K\nmax 9223372036854775807\n', expected: 'max 9223372036854775807\nlimite 9223372036854774784\ntotal : 2 fichier(s)' }
    ],
    solution: `convertir() {
  local valeur="$1"
  local facteur=1
  case "$valeur" in
    *K) valeur="\${valeur%K}"; facteur=1024 ;;
    *M) valeur="\${valeur%M}"; facteur=1048576 ;;
  esac
  printf '%s\\n' "$((10#$valeur * facteur))"
}
read -r seuil
seuil_octets="$(convertir "$seuil")"
noms=()
tailles=()
read -r n
n=$((10#$n))
for ((i=0; i<n; i++)); do
  read -r nom taille
  noms+=("$nom")
  tailles+=("$(convertir "$taille")")
done

retenus_nom=()
retenus_taille=()
for ((i=0; i<n; i++)); do
  if [ "\${tailles[$i]}" -gt "$seuil_octets" ]; then
    retenus_nom+=("\${noms[$i]}")
    retenus_taille+=("\${tailles[$i]}")
  fi
done

total=\${#retenus_nom[@]}
for ((i=0; i<total; i++)); do
  # Tri par insertion avec test strict : les ex aequo gardent l'ordre d'entree.
  cle_nom="\${retenus_nom[$i]}"
  cle_taille="\${retenus_taille[$i]}"
  j=$((i - 1))
  while [ "$j" -ge 0 ] && [ "\${retenus_taille[$j]}" -lt "$cle_taille" ]; do
    retenus_taille[$((j + 1))]="\${retenus_taille[$j]}"
    retenus_nom[$((j + 1))]="\${retenus_nom[$j]}"
    j=$((j - 1))
  done
  retenus_taille[$((j + 1))]="$cle_taille"
  retenus_nom[$((j + 1))]="$cle_nom"
done

for ((i=0; i<total; i++)); do
  echo "\${retenus_nom[$i]} \${retenus_taille[$i]}"
done
echo "total : $total fichier(s)"
`
  },
  {
    id: 'lx-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Squelette de /etc/passwd',
    goal: 'Analyser le format login:x:UID:GID:... du fichier passwd : filtrer, compter, retrouver.',
    brief: '<p>Dans cette simulation, la convention choisie classe comme système tout UID inférieur à 1000 et comme humain tout UID supérieur ou égal à 1000 ; les plages réelles sont configurables. Le script lit <strong>n lignes</strong> au format <code>/etc/passwd</code> réduit : ' +
      '<code>login:UID:GID:shell</code> (quatre champs séparés par <code>:</code>). Il affiche trois ' +
      'lignes : <code>utilisateurs : K</code> (total), <code>systeme : S</code> (UID &lt; 1000) et ' +
      '<code>humains : H</code> (UID ≥ 1000), puis la liste des logins humains, un par ligne, dans ' +
      'l\'ordre d\'entrée.</p>',
    starter: `read -r n
systeme=0
humains=0
for ((i=0; i<n; i++)); do
  read -r ligne
  # À compléter : découper les champs, compter, mémoriser.
done
# À compléter : afficher les trois comptes puis les logins humains.
`,
    hints: [
      'Découper par deux-points : IFS=":" read -r login uid gid shell <<< "$ligne".',
      'Un test arithmétique [ "$uid" -lt 1000 ] sépare comptes système et comptes humains.'
    ],
    examples: [
      { stdin: '4\nroot:0:0:/bin/bash\nsys:99:99:/usr/sbin/nologin\nalice:1000:1000:/bin/bash\nbob:1001:1001:/bin/sh\n', expected: 'utilisateurs : 4\nsysteme : 2\nhumains : 2\nalice\nbob', note: 'UID 0 et 99 sont système ; 1000 et 1001 sont humains.' }
    ],
    tests: [
      { label: 'Que des humains', stdin: '2\ncarol:1002:1002:/bin/zsh\ndan:1050:1000:/bin/bash\n', expected: 'utilisateurs : 2\nsysteme : 0\nhumains : 2\ncarol\ndan' },
      { label: 'Que du système', stdin: '2\ndaemon:1:1:/usr/sbin/nologin\nbin:2:2:/usr/sbin/nologin\n', expected: 'utilisateurs : 2\nsysteme : 2\nhumains : 0' },
      { label: 'Frontière 1000', stdin: '3\na:999:999:/bin/sh\nb:1000:1000:/bin/sh\nc:1000:1001:/bin/sh\n', expected: 'utilisateurs : 3\nsysteme : 1\nhumains : 2\nb\nc' }
    ],
    solution: `read -r n
systeme=0
humains=0
humain_logins=()
for ((i=0; i<n; i++)); do
  read -r ligne
  IFS=":" read -r login uid gid shell <<< "$ligne"
  if [ "$uid" -lt 1000 ]; then
    systeme=$((systeme + 1))
  else
    humains=$((humains + 1))
    humain_logins+=("$login")
  fi
done
echo "utilisateurs : $n"
echo "systeme : $systeme"
echo "humains : $humains"
for login in "\${humain_logins[@]}"; do
  echo "$login"
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 4 — chmod : modifier les droits
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'chmod octal → symbolique',
    goal: 'Traduire les trois chiffres octaux de chmod en droits symboliques type ls -l.',
    brief: '<p>Le script lit <strong>n lignes</strong> <code>OCTAL NOM</code> (ex. <code>644 ' +
      'notes.txt</code>). Pour chacune il affiche la chaîne de droits complète type ls -l : le caractère ' +
      'de type <code>-</code> (fichiers uniquement ici), puis les neuf caractères. ' +
      '<code>644</code> donne <code>rw-r--r--</code>. La sortie est <code>NOM : -DROITS</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r octal nom
  # À compléter : convertir chaque chiffre en triplet rwx.
done
`,
    hints: [
      'Pour un chiffre : le 4 vaut r, le 2 vaut w, le 1 vaut x — construire le triplet caractère par caractère.',
      'Isoler chaque chiffre avec `\${octal:0:1}`, `\${octal:1:1}`, `\${octal:2:1}` et une petite fonction ou trois tests.'
    ],
    examples: [
      { stdin: '2\n644 notes.txt\n755 run.sh\n', expected: 'notes.txt : -rw-r--r--\nrun.sh : -rwxr-xr-x', note: '6 = rw-, 4 = r--, 5 = r-x.' }
    ],
    tests: [
      { label: 'Tout ou rien', stdin: '2\n777 libre\n000 vide\n', expected: 'libre : -rwxrwxrwx\nvide : ----------' },
      { label: 'Clé privée', stdin: '1\n600 cle.pem\n', expected: 'cle.pem : -rw-------' },
      { label: 'Valeurs mixtes', stdin: '3\n710 boite\n147 etrange\n550 duo\n', expected: 'boite : -rwx--x---\netrange : ---xr--rwx\nduo : -r-xr-x---' }
    ],
    solution: `read -r n
triplet() {
  local chiffre="$1"
  local r="-" w="-" x="-"
  if [ "$chiffre" -ge 4 ]; then r="r"; chiffre=$((chiffre - 4)); fi
  if [ "$chiffre" -ge 2 ]; then w="w"; chiffre=$((chiffre - 2)); fi
  if [ "$chiffre" -ge 1 ]; then x="x"; fi
  echo "$r$w$x"
}
for ((i=0; i<n; i++)); do
  read -r octal nom
  droits="-$(triplet "\${octal:0:1}")$(triplet "\${octal:1:1}")$(triplet "\${octal:2:1}")"
  echo "$nom : $droits"
done
`
  },
  {
    id: 'lx-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'chmod symbolique simple',
    goal: 'Appliquer une modification symbolique (une ou plusieurs classes u/g/o/a, suivies de + ou - et de rwx) à des droits existants.',
    brief: '<p>Le script lit <strong>n lignes</strong> <code>DROITS MODIF</code> où DROITS est une chaîne ' +
      'de neuf caractères (sans le type) et MODIF s\'écrit <code>classe action lettres</code>, sans espaces : ' +
      'classe est composée d\'une ou plusieurs lettres <code>u</code>, <code>g</code>, <code>o</code> ' +
      'ou <code>a</code> (toutes), dans n\'importe quel ordre ; les répétitions sont sans effet. Action vaut ' +
      '<code>+</code> ou <code>-</code>, lettres valent une à trois lettres parmi r, w, x (ex. ' +
      '<code>o-r</code>, <code>ug+x</code>). Il applique la modification et affiche les neuf nouveaux ' +
      'caractères.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r droits modif
  # À compléter : appliquer l'action aux classes visées.
done
`,
    hints: [
      'Positions des classes : u = 0-2, g = 3-5, o = 6-8 ; a désigne les trois. Combiner les positions de toutes les lettres de classe.',
      'Pour + : poser la lettre si la position correspond ; pour - : la remplacer par -. Parcourir les lettres demandées une à une.'
    ],
    examples: [
      { stdin: '2\nrw-r--r-- o-r\nrwxr-xr-x go+w\n', expected: 'rw-r-----\nrwxrwxrwx', note: 'o-r retire la lecture des autres ; go+w ajoute écriture au groupe et aux autres.' }
    ],
    tests: [
      { label: 'Retrait multiple', stdin: '1\nrwxrwxrwx a-w\n', expected: 'r-xr-xr-x' },
      { label: 'Ajout au propriétaire', stdin: '1\n--------- u+rwx\n', expected: 'rwx------' },
      { label: 'Classe a', stdin: '2\nrw------- a+r\nrwxrwxrwx go-rwx\n', expected: 'rw-r--r--\nrwx------' },
      { label: 'Classes combinées', stdin: '5\n--------- ug+x\nrwxrwxrwx go-rw\n--------- ou+w\nrwx------ ga+w\n--------- uu+r\n', expected: '--x--x---\nrwx--x--x\n-w-----w-\nrwx-w--w-\nr--------' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r droits modif
  # La classe est tout ce qui precede le signe, les lettres tout ce qui suit :
  # cela accepte les classes multi-lettres comme ug ou go.
  if [[ "$modif" == *"+"* ]]; then action="+"; else action="-"; fi
  classe="\${modif%%"$action"*}"
  lettres="\${modif#*"$action"}"

  # Chaque lettre de la classe (u, g, o) ajoute son triplet de positions.
  positions=""
  case "$classe" in
    a) positions="0 1 2 3 4 5 6 7 8" ;;
    *)
      for ((c=0; c<\${#classe}; c++)); do
        case "\${classe:$c:1}" in
          u) positions="$positions 0 1 2" ;;
          g) positions="$positions 3 4 5" ;;
          o) positions="$positions 6 7 8" ;;
          a) positions="$positions 0 1 2 3 4 5 6 7 8" ;;
        esac
      done
      ;;
  esac

  tableau=()
  for ((k=0; k<9; k++)); do tableau+=("\${droits:$k:1}"); done

  for pos in $positions; do
    # Quelle lettre correspond à cette position ? r aux positions 0/3/6, etc.
    case "$pos" in
      0|3|6) lettre_place="r" ;;
      1|4|7) lettre_place="w" ;;
      2|5|8) lettre_place="x" ;;
    esac
    case "$lettres" in
      *"$lettre_place"*)
        if [ "$action" = "+" ]; then
          tableau[$pos]="$lettre_place"
        else
          tableau[$pos]="-"
        fi
        ;;
    esac
  done

  resultat=""
  for ((k=0; k<9; k++)); do resultat="$resultat\${tableau[$k]}"; done
  echo "$resultat"
done
`
  },
  {
    id: 'lx-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Droits et accès : qui peut quoi',
    goal: 'Décider, pour chaque demande d\'accès (r, w ou x) par un propriétaire, un groupe ou un autre, si elle est accordée.',
    brief: '<p>Le script lit d\'abord <strong>une ligne de droits</strong> (neuf caractères, ex. ' +
      '<code>rw-r-x---</code>), puis <strong>m demandes</strong> : <code>classe lettre</code> (classe = ' +
      'u, g ou o ; lettre = r, w ou x). Pour chaque demande il affiche <code>accordé</code> ou ' +
      '<code>refusé</code>. Rappel : pour la classe u ce sont les caractères 0-2, g les 3-5, o les 6-8 ; ' +
      '<code>r</code> en première position du triplet, <code>w</code> en deuxième, <code>x</code> en ' +
      'troisième.</p>',
    starter: `read -r droits
read -r m
for ((i=0; i<m; i++)); do
  read -r classe lettre
  # À compléter : décider selon la position de la lettre dans le triplet.
done
`,
    hints: [
      'Décaler la base selon la classe : u → 0, g → 3, o → 6 ; puis r → +0, w → +1, x → +2 dans le triplet.',
      'Un seul test suffit : le caractère à la position calculée vaut-il la lettre demandée ?'
    ],
    examples: [
      { stdin: 'rw-r-x---\n4\nu w\ng x\no r\ng w\n', expected: 'accordé\naccordé\nrefusé\nrefusé', note: 'Le groupe a r-x : exécution accordée, écriture refusée ; les autres n\'ont rien.' }
    ],
    tests: [
      { label: 'Propriétaire tout puissant', stdin: 'rwx------\n3\nu r\nu w\nu x\n', expected: 'accordé\naccordé\naccordé' },
      { label: 'Autres sans rien', stdin: 'rwxr-x---\n2\no w\no x\n', expected: 'refusé\nrefusé' },
      { label: 'Lecture seule', stdin: 'r--r--r--\n3\nu w\ng r\no x\n', expected: 'refusé\naccordé\nrefusé' }
    ],
    solution: `read -r droits
read -r m
for ((i=0; i<m; i++)); do
  read -r classe lettre
  case "$classe" in
    u) base=0 ;;
    g) base=3 ;;
    o) base=6 ;;
  esac
  case "$lettre" in
    r) decalage=0 ;;
    w) decalage=1 ;;
    x) decalage=2 ;;
  esac
  position=$((base + decalage))
  if [ "\${droits:$position:1}" = "$lettre" ]; then
    echo "accordé"
  else
    echo "refusé"
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 5 — Utilisateurs et groupes (simulation)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'useradd et /etc/passwd simulés',
    goal: 'Générer les lignes /etc/passwd à partir d\'opérations useradd/userdel, avec UID automatique.',
    brief: '<p>Le script simule la gestion des comptes, avec une convention propre à cet exercice : les plages réelles d’UID sont configurables. Il lit <strong>n opérations</strong> : ' +
      '<code>useradd login</code> (crée le compte avec le prochain UID libre à partir de 1000, ' +
      'GID = UID), <code>userdel login</code> (supprime), ou <code>ls</code>. À chaque <code>ls</code>, ' +
      'il affiche les lignes <code>passwd</code> des comptes courants, dans l\'ordre de création : ' +
      '<code>login:x:UID:GID:/home/login:/bin/bash</code>. Un <code>useradd</code> d\'un login existant ' +
      'affiche <code>existe</code> ; un <code>userdel</code> d\'un login absent affiche ' +
      '<code>inconnu</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op login
  # À compléter : maintenir les comptes et répondre aux ls.
done
`,
    hints: [
      'Un tableau des logins créés + un compteur d\'UID : le prochain UID est 1000 + le nombre de créations réussies.',
      'Pour userdel, chercher la position du login dans le tableau et retirer l\'élément ; pour ls, rejouer le tableau.'
    ],
    examples: [
      { stdin: '6\nuseradd alice\nuseradd bob\nls\nuserdel alice\nls\nuseradd carol\n', expected: 'alice:x:1000:1000:/home/alice:/bin/bash\nbob:x:1001:1001:/home/bob:/bin/bash\nbob:x:1001:1001:/home/bob:/bin/bash\n', note: 'Après suppression d\'alice, seul bob reste ; carol est créée après le dernier ls.' }
    ],
    tests: [
      { label: 'Doublon refusé', stdin: '2\nuseradd toto\nuseradd toto\n', expected: 'existe' },
      { label: 'Suppression inconnue', stdin: '1\nuserdel fantome\n', expected: 'inconnu' },
      { label: 'Comptes consécutifs', stdin: '4\nuseradd a\nuserdel a\nuseradd b\nls\n', expected: 'b:x:1001:1001:/home/b:/bin/bash', note: 'L\'UID 1000 a été consommé par a : b prend 1001.' }
    ],
    solution: `read -r n
logins=()
uids=()
uid_suivant=1000
for ((i=0; i<n; i++)); do
  read -r op login
  if [ "$op" = "useradd" ]; then
    deja=0
    for l in "\${logins[@]}"; do
      [ "$l" = "$login" ] && deja=1
    done
    if [ "$deja" = "1" ]; then
      echo "existe"
    else
      logins+=("$login")
      uids+=("$uid_suivant")
      uid_suivant=$((uid_suivant + 1))
    fi
  elif [ "$op" = "userdel" ]; then
    nouveau=()
    nouveaux_uids=()
    trouve=0
    for idx in "\${!logins[@]}"; do
      if [ "\${logins[$idx]}" = "$login" ]; then
        trouve=1
      else
        nouveau+=("\${logins[$idx]}")
        nouveaux_uids+=("\${uids[$idx]}")
      fi
    done
    if [ "$trouve" = "1" ]; then
      logins=("\${nouveau[@]}")
      uids=("\${nouveaux_uids[@]}")
    else
      echo "inconnu"
    fi
  elif [ "$op" = "ls" ]; then
    for idx in "\${!logins[@]}"; do
      echo "\${logins[$idx]}:x:\${uids[$idx]}:\${uids[$idx]}:/home/\${logins[$idx]}:/bin/bash"
    done
  fi
done
`
  },
  {
    id: 'lx-c5-e2',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'groupadd et appartenance',
    goal: 'Gérer des groupes simulés : créer, ajouter des membres, répondre aux requêtes d\'appartenance.',
    brief: '<p>Le script lit <strong>n opérations</strong> : <code>groupadd groupe</code>, ' +
      '<code>usermod groupe login</code> (ajoute login au groupe), ou <code>groups login</code>. À chaque ' +
      '<code>groups login</code> il affiche, séparés par des virgules, les <strong>groupes dont login est ' +
      'membre</strong>, dans l\'ordre de création des groupes — ou <code>aucun</code> si l\'utilisateur ' +
      'n\'appartient à rien. Un <code>usermod</code> vers un groupe inexistant affiche ' +
      '<code>groupe inconnu</code> ; ajouter deux fois le même membre ne duplique pas.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r op arg1 arg2
  # À compléter : maintenir les groupes et répondre aux requêtes.
done
`,
    hints: [
      'Un tableau associatif groupe → liste de membres (séparés par des espaces) garde l\'ordre des groupes.',
      'Pour groups, parcourir les groupes dans l\'ordre de création et tester la présence du login dans la liste.'
    ],
    examples: [
      { stdin: '6\ngroupadd etudiants\ngroupadd profs\nusermod etudiants alice\nusermod profs alice\ngroups alice\ngroups bob\n', expected: 'etudiants,profs\naucun', note: 'alice est dans les deux groupes, bob dans aucun.' }
    ],
    tests: [
      { label: 'Groupe inconnu', stdin: '1\nusermod fanclub toto\n', expected: 'groupe inconnu' },
      { label: 'Un seul groupe', stdin: '3\ngroupadd dev\ngroups zoe\nusermod dev zoe\n', expected: 'aucun' },
      { label: 'Pas de doublon', stdin: '4\ngroupadd g\nusermod g a\nusermod g a\ngroups a\n', expected: 'g' },
      { label: 'Ordre de création des groupes', stdin: '5\ngroupadd alpha\ngroupadd beta\nusermod beta mimi\nusermod alpha mimi\ngroups mimi\n', expected: 'alpha,beta' }
    ],
    solution: `read -r n
declare -A membres
groupes=()
for ((i=0; i<n; i++)); do
  read -r op arg1 arg2
  if [ "$op" = "groupadd" ]; then
    if [ -z "\${membres[$arg1]+x}" ]; then
      membres[$arg1]=""
      groupes+=("$arg1")
    fi
  elif [ "$op" = "usermod" ]; then
    if [ -z "\${membres[$arg1]+x}" ]; then
      echo "groupe inconnu"
    else
      case " \${membres[$arg1]} " in
        *" $arg2 "*) ;;
        *) membres[$arg1]="\${membres[$arg1]} $arg2" ;;
      esac
    fi
  elif [ "$op" = "groups" ]; then
    resultat=""
    for g in "\${groupes[@]}"; do
      case " \${membres[$g]} " in
        *" $arg1 "*) resultat="\${resultat:+$resultat,}$g" ;;
      esac
    done
    echo "\${resultat:-aucun}"
  fi
done
`
  },
  {
    id: 'lx-c5-e3',
    chapter: 5,
    level: 'n4',
    language: 'shell',
    title: 'Audit des comptes',
    goal: 'Examiner des champs de mot de passe shadow simulés sans conclure au statut global du compte.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> ' +
      '<code>login:champ-mdp</code> représentant deux ' +
      'champs de /etc/shadow simulés. Dans ce modèle limité, un champ commençant par <code>!</code> ou ' +
      'égal à <code>*</code> empêche l\'usage d\'un mot de passe Unix. Un champ vide ne contient pas de ' +
      'mot de passe ; certaines applications peuvent néanmoins refuser cet accès. Les autres champs non ' +
      'vides ne sont pas analysés et leur validité n\'est pas supposée. D\'autres méthodes de connexion ' +
      'peuvent rester possibles selon la configuration : le script ne déduit pas le statut global du compte. ' +
      'Le nombre n est décimal, non négatif et peut commencer par des zéros.</p>' +
      '<p>Afficher <code>total : K</code>, <code>mdp_bloques : D</code> pour les marqueurs ! et *, ' +
      '<code>champs_vides : R</code>, puis les logins dont le champ est vide, un par ligne et dans ' +
      'l\'ordre — ou <code>aucun</code> si R vaut 0.</p>',
    starter: `read -r n
n=$((10#$n))
for ((i=0; i<n; i++)); do
  read -r ligne
  # À compléter : classer chaque champ.
done
# À compléter : afficher l'audit.
`,
    hints: [
      'Couper au premier deux-points : `login="\${ligne%%:*}"`, `champ="\${ligne#*:}"`.',
      'Compter le champ * et les préfixes ! pour les mots de passe Unix ; relever séparément les champs vides.'
    ],
    examples: [
      { stdin: '4\nroot:$6$sel$hash\nsys:*\nancien:!!\nvide:\n', expected: 'total : 4\nmdp_bloques : 2\nchamps_vides : 1\nvide', note: 'Deux champs portent un marqueur de mot de passe bloqué ; le champ vide est signalé séparément.' }
    ],
    tests: [
      { label: 'Champs non analysés', stdin: '2\na:$6$sel$hash\nb:x\n', expected: 'total : 2\nmdp_bloques : 0\nchamps_vides : 0\naucun' },
      { label: 'Multiples champs vides', stdin: '3\na:\nb:\nc:x\n', expected: 'total : 3\nmdp_bloques : 0\nchamps_vides : 2\na\nb' },
      { label: 'Marqueurs et préfixes', stdin: '4\na:*\nb:!!\nc:!$6$sel$hash\nd:!\n', expected: 'total : 4\nmdp_bloques : 4\nchamps_vides : 0\naucun' },
      { label: 'Aucun champ', stdin: '0\n', expected: 'total : 0\nmdp_bloques : 0\nchamps_vides : 0\naucun' },
      { label: 'Autres valeurs non analysées', stdin: '3\na:*NP*\nb:x\nc:\n', expected: 'total : 3\nmdp_bloques : 0\nchamps_vides : 1\nc' },
      { label: 'Compte décimal avec zéro initial', stdin: '08\na:!\nb:*\nc:\nd:x\ne:!!\nf:hash\ng:!hachage\nh:\n', expected: 'total : 8\nmdp_bloques : 4\nchamps_vides : 2\nc\nh' }
    ],
    solution: `read -r n
n=$((10#$n))
total=0
mdp_bloques=0
champs_vides=0
logins_vides=()
for ((i=0; i<n; i++)); do
  read -r ligne
  total=$((total + 1))
  login="\${ligne%%:*}"
  champ="\${ligne#*:}"
  case "$champ" in
    '!'*|'*') mdp_bloques=$((mdp_bloques + 1)) ;;
    '') champs_vides=$((champs_vides + 1)); logins_vides+=("$login") ;;
  esac
done
echo "total : $total"
echo "mdp_bloques : $mdp_bloques"
echo "champs_vides : $champs_vides"
if [ "$champs_vides" = "0" ]; then
  echo "aucun"
else
  for login in "\${logins_vides[@]}"; do
    printf '%s\\n' "$login"
  done
fi
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Module 6 — Écrire des scripts
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    requiredShebang: '#!/bin/bash',
    title: 'Le shebang et la syntaxe',
    goal: 'Écrire un script avec shebang correct et lire une ligne sur l’entrée standard.',
    brief: '<p>Le script lit <strong>une ligne</strong> : un mot. Il affiche trois lignes : ' +
      '<code>script : $0 est le nom du script</code> — littéralement, sans substituer — puis le mot ' +
      'reçu, puis <code>fin</code>. La première ligne du script doit être exactement le shebang ' +
      '<code>#!/bin/bash</code>, sans caractère avant ni après.</p>',
    starter: `#!/bin/bash
read -r mot

# À compléter : les trois lignes attendues.
`,
    hints: [
      'Le shebang #!/bin/bash désigne l\'interpréteur : le placer sur la toute première ligne, sans caractère supplémentaire.',
      'Afficher les trois lignes ; pour $mot, printf évite que echo interprète -n comme une option.',
      'La première ligne est un texte littéral : $0 s\'écrit tel quel dans une chaîne simple, non substituée.'
    ],
    examples: [
      { stdin: 'bonjour\n', expected: 'script : $0 est le nom du script\nbonjour\nfin', note: 'La sortie attendue, sans substitution de $0.' }
    ],
    tests: [
      { label: 'Autre mot', stdin: 'test\n', expected: 'script : $0 est le nom du script\ntest\nfin' },
      { label: 'Mot technique', stdin: 'if\n', expected: 'script : $0 est le nom du script\nif\nfin' },
      { label: 'Mot composé', stdin: 'ma-variable_1\n', expected: 'script : $0 est le nom du script\nma-variable_1\nfin' },
      { label: 'Mot ressemblant à une option', stdin: '-n\n', expected: 'script : $0 est le nom du script\n-n\nfin' },
      { label: 'Casse à préserver', stdin: 'ReVi_5\n', expected: 'script : $0 est le nom du script\nReVi_5\nfin' }
    ],
    solution: `#!/bin/bash
read -r mot

echo 'script : $0 est le nom du script'
printf '%s\\n' "$mot"
echo "fin"
`
  },
  {
    id: 'lx-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Compteurs dans une boucle de surveillance',
    goal: 'Traiter un flux de niveaux d\'alerte et produire un rapport conditionnel.',
    brief: '<p>Le script lit <strong>n lignes</strong> : des niveaux <code>OK</code>, ' +
      '<code>WARN</code> ou <code>CRIT</code>. Il affiche un rapport de quatre lignes : ' +
      '<code>OK : K</code>, <code>WARN : W</code>, <code>CRIT : C</code>, puis le verdict : ' +
      '<code>alarme</code> si C ≥ 1, <code>surveillance</code> si W ≥ 1 (et C = 0), ' +
      '<code>nominal</code> sinon.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r niveau
  # À compléter : compter les trois niveaux.
done
# À compléter : afficher le rapport et le verdict.
`,
    hints: [
      'Trois compteurs initialisés à 0, un case sur "$niveau" pour incrémenter le bon.',
      'Le verdict se décide par ordre de gravité : CRIT d\'abord, puis WARN, sinon nominal.'
    ],
    examples: [
      { stdin: '5\nOK\nOK\nWARN\nOK\nCRIT\n', expected: 'OK : 3\nWARN : 1\nCRIT : 1\nalarme', note: 'Une seule alerte critique suffit à déclencher l\'alarme.' }
    ],
    tests: [
      { label: 'Surveillance', stdin: '3\nOK\nWARN\nOK\n', expected: 'OK : 2\nWARN : 1\nCRIT : 0\nsurveillance' },
      { label: 'Nominal', stdin: '2\nOK\nOK\n', expected: 'OK : 2\nWARN : 0\nCRIT : 0\nnominal' },
      { label: 'Tout critique', stdin: '2\nCRIT\nCRIT\n', expected: 'OK : 0\nWARN : 0\nCRIT : 2\nalarme' },
      { label: 'Une seule alerte critique', stdin: '3\nWARN\nOK\nCRIT\n', expected: 'OK : 1\nWARN : 1\nCRIT : 1\nalarme' }
    ],
    solution: `read -r n
ok=0
warn=0
crit=0
for ((i=0; i<n; i++)); do
  read -r niveau
  case "$niveau" in
    OK)   ok=$((ok + 1)) ;;
    WARN) warn=$((warn + 1)) ;;
    CRIT) crit=$((crit + 1)) ;;
  esac
done
echo "OK : $ok"
echo "WARN : $warn"
echo "CRIT : $crit"
if [ "$crit" -ge 1 ]; then
  echo "alarme"
elif [ "$warn" -ge 1 ]; then
  echo "surveillance"
else
  echo "nominal"
fi
`
  },
  {
    id: 'lx-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Rapport de parc',
    goal: 'Produire un rapport d\'inventaire : comptage par moteur, prix total et voiture la plus chère.',
    brief: '<p>Le script lit <strong>n lignes</strong> <code>marque moteur prix</code> (le prix est un ' +
      'entier). Il affiche un rapport : pour chaque moteur présent (DIESEL, ESSENCE, HYBRIDE, ' +
      'ELECTRIQUE — dans cet ordre, seulement s\'il existe), une ligne <code>MOTEUR : K</code> avec son ' +
      'effectif ; puis <code>budget : TOTAL</code> (somme des prix) et <code>max : MARQUE PRIX</code> ' +
      '(première voiture du prix maximal, dans l\'ordre d\'entrée).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r marque moteur prix
  # À compléter : compter par moteur, cumuler le budget, suivre le max.
done
# À complémenter : afficher le rapport.
`,
    hints: [
      'Quatre compteurs nommés, incrémentés par case sur le moteur, évitent les tableaux associatifs.',
      'Le maximum se suit en un test : si prix > max_courant (ou premier tour), mémoriser marque et prix.'
    ],
    examples: [
      { stdin: '4\nTOYOTA HYBRIDE 20000000\nMB DIESEL 6000000\nBMW ESSENCE 50000000\nKIA ESSENCE 50000000\n', expected: 'DIESEL : 1\nESSENCE : 2\nHYBRIDE : 1\nbudget : 126000000\nmax : BMW 50000000', note: 'ELECTRIQUE absent : pas de ligne. À budget égal, la première entrée gagne.' }
    ],
    tests: [
      { label: 'Un seul moteur', stdin: '2\nA ELECTRIQUE 100\nB ELECTRIQUE 200\n', expected: 'ELECTRIQUE : 2\nbudget : 300\nmax : B 200' },
      { label: 'Max en premier', stdin: '3\nX DIESEL 90\nY ESSENCE 10\nZ ESSENCE 20\n', expected: 'DIESEL : 1\nESSENCE : 2\nbudget : 120\nmax : X 90' },
      { label: 'Petits prix', stdin: '3\nA DIESEL 1\nB ESSENCE 2\nC HYBRIDE 3\n', expected: 'DIESEL : 1\nESSENCE : 1\nHYBRIDE : 1\nbudget : 6\nmax : C 3' },
      { label: 'Égalité du maximum', stdin: '3\nA ESSENCE 10\nB DIESEL 10\nC HYBRIDE 2\n', expected: 'DIESEL : 1\nESSENCE : 1\nHYBRIDE : 1\nbudget : 22\nmax : A 10' }
    ],
    solution: `read -r n
diesel=0
essence=0
hybride=0
electrique=0
budget=0
max_prix=-1
max_marque=""
for ((i=0; i<n; i++)); do
  read -r marque moteur prix
  case "$moteur" in
    DIESEL)     diesel=$((diesel + 1)) ;;
    ESSENCE)    essence=$((essence + 1)) ;;
    HYBRIDE)    hybride=$((hybride + 1)) ;;
    ELECTRIQUE) electrique=$((electrique + 1)) ;;
  esac
  budget=$((budget + prix))
  if [ "$prix" -gt "$max_prix" ]; then
    max_prix="$prix"
    max_marque="$marque"
  fi
done
[ "$diesel" -gt 0 ] && echo "DIESEL : $diesel"
[ "$essence" -gt 0 ] && echo "ESSENCE : $essence"
[ "$hybride" -gt 0 ] && echo "HYBRIDE : $hybride"
[ "$electrique" -gt 0 ] && echo "ELECTRIQUE : $electrique"
echo "budget : $budget"
echo "max : $max_marque $max_prix"
`
  }
];

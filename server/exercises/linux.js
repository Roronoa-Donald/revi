/**
 * Catalogue des 18 exercices shell du cours « Administration Linux » B2 :
 * l'administration d'un serveur Debian — chemins et arborescence, manipulation
 * de fichiers, droits et comptes, réseau et SSH, scripts Bash, puis services,
 * processus et tâches planifiées.
 *
 * Chapitre 1 : commandes de base et arborescence (chemins, listage).
 * Chapitre 2 : manipulation de fichiers et recherche (cp/mv, filtrage, journal).
 * Chapitre 3 : droits, permissions, utilisateurs et groupes.
 * Chapitre 4 : réseau statique et SSH (validation, classement, cibles).
 * Chapitre 5 : scripts Bash (paramètres, boucles, fonctions).
 * Chapitre 6 : services, processus et planification (systemd, zombies, cron).
 *
 * Conventions : language 'shell', ids 'lx2-cN-eM', niveaux n1/n2/n3, entrées
 * stdin mono-lignes terminées par \\n, exemple distinct des tests cachés.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Commandes de base et arborescence
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Reconnaître un chemin absolu',
    goal: 'Classer chaque chemin en absolu ou relatif, puis compter les absolus.',
    brief: '<p>Le script lit <strong>n lignes</strong>, chacune un chemin. Un chemin est ' +
      '<strong>absolu</strong> s’il commence par <code>/</code> ; sinon il est <strong>relatif</strong>. ' +
      'Pour chaque chemin, le script affiche <code>chemin : absolu</code> ou <code>chemin : relatif</code>, ' +
      'puis à la fin <code>absolus : X</code>.</p>',
    starter: `read -r n
a=0
for ((i=0; i<n; i++)); do
  read -r chemin
  # À compléter : tester le premier caractère du chemin, afficher et compter.
done
# À compléter : le total des chemins absolus.
`,
    hints: [
      'Le motif `/*` en début de case correspond à tout chemin commençant par un slash.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '2\n/etc/hosts\nhome/rd\n', expected: '/etc/hosts : absolu\nhome/rd : relatif\nabsolus : 1' }
    ],
    tests: [
      { label: 'Trois chemins', stdin: '3\n/var/log\n./tmp\n/usr/bin\n', expected: '/var/log : absolu\n./tmp : relatif\n/usr/bin : absolu\nabsolus : 2' },
      { label: 'Suite relative', stdin: '3\nbin\n../etc\n/dev\n', expected: 'bin : relatif\n../etc : relatif\n/dev : absolu\nabsolus : 1' },
      { label: 'Parcours mixte', stdin: '4\n/home\n/opt\n/tmp\nvar\n', expected: '/home : absolu\n/opt : absolu\n/tmp : absolu\nvar : relatif\nabsolus : 3' }
    ],
    solution: `read -r n
a=0
for ((i=0; i<n; i++)); do
  read -r chemin
  case "$chemin" in
    /*) echo "$chemin : absolu"; a=$((a + 1)) ;;
    *) echo "$chemin : relatif" ;;
  esac
done
echo "absolus : $a"
`
  },
  {
    id: 'lx2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Compter les entrées par type',
    goal: 'Dresser le bilan d’un répertoire : fichiers, répertoires et liens.',
    brief: '<p>Le script lit <strong>n lignes</strong> « nom type » où <code>type</code> vaut ' +
      '<code>fichier</code>, <code>repertoire</code> ou <code>lien</code>. Il affiche trois compteurs, ' +
      'dans cet ordre : <code>fichiers : X</code>, <code>repertoires : Y</code>, <code>liens : Z</code>.</p>',
    starter: `read -r n
f=0
d=0
l=0
for ((i=0; i<n; i++)); do
  read -r nom type
  # À compléter : incrémenter le bon compteur selon le type.
done
# À compléter : afficher les trois compteurs.
`,
    hints: [
      'Un case sur le type : fichier, repertoire, lien.',
      'Les trois lignes de bilan sortent dans l’ordre fichiers, repertoires, liens.'
    ],
    examples: [
      { stdin: '3\netc repertoire\nbashrc lien\nnotes fichier\n', expected: 'fichiers : 1\nrepertoires : 1\nliens : 1' }
    ],
    tests: [
      { label: 'Répertoire fourni', stdin: '4\npasswd fichier\nshadow fichier\ninit.d repertoire\nrc.local lien\n', expected: 'fichiers : 2\nrepertoires : 1\nliens : 1' },
      { label: 'Beaucoup de dossiers', stdin: '4\nusr repertoire\nbin repertoire\nlib repertoire\nhostname fichier\n', expected: 'fichiers : 1\nrepertoires : 3\nliens : 0' },
      { label: 'Arborescence sans lien', stdin: '3\nreadme fichier\nsrc repertoire\nmain.c fichier\n', expected: 'fichiers : 2\nrepertoires : 1\nliens : 0' }
    ],
    solution: `read -r n
f=0
d=0
l=0
for ((i=0; i<n; i++)); do
  read -r nom type
  case "$type" in
    fichier) f=$((f + 1)) ;;
    repertoire) d=$((d + 1)) ;;
    lien) l=$((l + 1)) ;;
  esac
done
echo "fichiers : $f"
echo "repertoires : $d"
echo "liens : $l"
`
  },
  {
    id: 'lx2-c1-e3',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Assembler un chemin',
    goal: 'Joindre un répertoire et un nom de fichier sans doubler le séparateur.',
    brief: '<p>Le script lit <strong>n lignes</strong> « repertoire nom ». Il affiche le chemin ' +
      'assemblé : <code>repertoire/nom</code>, sauf si le répertoire se termine déjà par ' +
      '<code>/</code>, auquel cas la barre n’est pas répétée. Une seule ligne par entrée.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r repertoire nom
  # À compléter : joindre les deux en évitant un double slash.
done
`,
    hints: [
      'Le motif `*/` en début de case repère un répertoire terminé par un slash.',
      'Ne pas oublier le cas simple, sans slash final, dans la branche par défaut.'
    ],
    examples: [
      { stdin: '2\n/etc hosts\n/var/ log\n', expected: '/etc/hosts\n/var/log' }
    ],
    tests: [
      { label: 'Deux niveaux', stdin: '3\n/home rd\n/mnt/ data\n/tmp x\n', expected: '/home/rd\n/mnt/data\n/tmp/x' },
      { label: 'Tout avec slash', stdin: '2\n/usr/ bin\n/opt/ app\n', expected: '/usr/bin\n/opt/app' },
      { label: 'Tout sans slash', stdin: '3\n/etc/nginx nginx.conf\n/var/log syslog\n/root .bashrc\n', expected: '/etc/nginx/nginx.conf\n/var/log/syslog\n/root/.bashrc' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r repertoire nom
  case "$repertoire" in
    */) echo "$repertoire$nom" ;;
    *) echo "$repertoire/$nom" ;;
  esac
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Manipulation de fichiers et recherche
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx2-c2-e1',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Copier ou déplacer',
    goal: 'Consigner les opérations de fichiers et en dresser le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « op source cible » où <code>op</code> vaut ' +
      '<code>cp</code> ou <code>mv</code>. Il affiche pour chaque ligne ' +
      '<code>copie source vers cible</code> (pour <code>cp</code>) ou ' +
      '<code>deplacement source vers cible</code> (pour <code>mv</code>). Il termine par ' +
      '<code>copies : C</code> puis <code>deplacements : D</code>.</p>',
    starter: `read -r n
c=0
m=0
for ((i=0; i<n; i++)); do
  read -r op src dst
  # À compléter : afficher l’opération et incrémenter le bon compteur.
done
# À compléter : le bilan des deux compteurs.
`,
    hints: [
      'Un case sur op : cp pour une copie, mv pour un déplacement.',
      'Les deux compteurs s’affichent dans l’ordre copies puis deplacements.'
    ],
    examples: [
      { stdin: '2\ncp a.txt b.txt\nmv b.txt c.txt\n', expected: 'copie a.txt vers b.txt\ndeplacement b.txt vers c.txt\ncopies : 1\ndeplacements : 1' }
    ],
    tests: [
      { label: 'Sauvegarde', stdin: '3\ncp /etc/fstab /root/fstab.bak\ncp /etc/hosts /root/hosts.bak\nmv /root/hosts.bak /root/old\n', expected: 'copie /etc/fstab vers /root/fstab.bak\ncopie /etc/hosts vers /root/hosts.bak\ndeplacement /root/hosts.bak vers /root/old\ncopies : 2\ndeplacements : 1' },
      { label: 'Renommages', stdin: '2\nmv notes.txt notes.md\ncp notes.md sauvegarde.md\n', expected: 'deplacement notes.txt vers notes.md\ncopie notes.md vers sauvegarde.md\ncopies : 1\ndeplacements : 1' },
      { label: 'Uniquement des copies', stdin: '3\ncp a b\ncp c d\ncp e f\n', expected: 'copie a vers b\ncopie c vers d\ncopie e vers f\ncopies : 3\ndeplacements : 0' }
    ],
    solution: `read -r n
c=0
m=0
for ((i=0; i<n; i++)); do
  read -r op src dst
  case "$op" in
    cp) echo "copie $src vers $dst"; c=$((c + 1)) ;;
    mv) echo "deplacement $src vers $dst"; m=$((m + 1)) ;;
  esac
done
echo "copies : $c"
echo "deplacements : $m"
`
  },
  {
    id: 'lx2-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Rechercher par extension',
    goal: 'Filtrer une liste de fichiers et ne garder que les scripts shell.',
    brief: '<p>Le script lit <strong>n lignes</strong>, chacune un nom de fichier. Il n’affiche que ' +
      'ceux qui se terminent par <code>.sh</code>, dans leur ordre d’apparition, puis termine par ' +
      '<code>scripts : X</code>.</p>',
    starter: `read -r n
s=0
for ((i=0; i<n; i++)); do
  read -r fichier
  # À compléter : ne garder que les fichiers finissant par .sh.
done
# À compléter : le total des scripts.
`,
    hints: [
      'Le motif `*.sh` correspond à tout nom se terminant par .sh.',
      'Si aucun fichier ne correspond, seul le bilan s’affiche, avec 0.'
    ],
    examples: [
      { stdin: '3\ninstall.sh\nnotes.txt\nbackup.sh\n', expected: 'install.sh\nbackup.sh\nscripts : 2' }
    ],
    tests: [
      { label: 'Parc d’administration', stdin: '4\nstart.sh\nreadme.md\nstop.sh\nconfig.conf\n', expected: 'start.sh\nstop.sh\nscripts : 2' },
      { label: 'Aucun script', stdin: '3\nindex.html\nstyle.css\napp.js\n', expected: 'scripts : 0' },
      { label: 'Série complète', stdin: '5\na.sh\nb.txt\nc.sh\nd.sh\ne.log\n', expected: 'a.sh\nc.sh\nd.sh\nscripts : 3' }
    ],
    solution: `read -r n
s=0
for ((i=0; i<n; i++)); do
  read -r fichier
  case "$fichier" in
    *.sh) echo "$fichier"; s=$((s + 1)) ;;
  esac
done
echo "scripts : $s"
`
  },
  {
    id: 'lx2-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Compter les erreurs d’un journal',
    goal: 'Parcourir un journal ligne par ligne et compter les entrées critiques.',
    brief: '<p>Le script lit <strong>n lignes</strong> « niveau message » où <code>niveau</code> vaut ' +
      '<code>INFO</code>, <code>WARN</code> ou <code>ERROR</code>. Il compte les lignes de niveau ' +
      '<code>ERROR</code> et affiche à la fin <code>erreurs : X</code>.</p>',
    starter: `read -r n
e=0
for ((i=0; i<n; i++)); do
  read -r niveau message
  # À compléter : comparer le niveau à ERROR et compter.
done
# À compléter : le total des erreurs.
`,
    hints: [
      '`read -r niveau message` laisse le reste de la ligne dans message.',
      'La comparaison se fait sur le niveau seul, avec [ "$niveau" = "ERROR" ].'
    ],
    examples: [
      { stdin: '3\nINFO demarrage\nERROR disque plein\nWARN memoire faible\n', expected: 'erreurs : 1' }
    ],
    tests: [
      { label: 'Journal de service', stdin: '4\nINFO ok\nERROR echec\nINFO retry\nERROR echec\n', expected: 'erreurs : 2' },
      { label: 'Aucune erreur', stdin: '3\nINFO a\nWARN b\nINFO c\n', expected: 'erreurs : 0' },
      { label: 'Nuit difficile', stdin: '5\nERROR a\nERROR b\nWARN c\nERROR d\nINFO e\n', expected: 'erreurs : 3' }
    ],
    solution: `read -r n
e=0
for ((i=0; i<n; i++)); do
  read -r niveau message
  if [ "$niveau" = "ERROR" ]; then
    e=$((e + 1))
  fi
done
echo "erreurs : $e"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Droits, permissions, utilisateurs et groupes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx2-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Décoder une permission',
    goal: 'Convertir une permission symbolique en notation octale.',
    brief: '<p>Le script lit <strong>n lignes</strong>, chacune une permission symbolique de neuf ' +
      'caractères (ex. <code>rwxr-xr-x</code>). Pour chaque trio, <code>r</code> vaut 4, ' +
      '<code>w</code> vaut 2 et <code>x</code> vaut 1. Il affiche <code>permission : octal</code>, ' +
      'par exemple <code>permission : 755</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r perm
  # À compléter : pour chaque trio, additionner 4/2/1 et composer l’octal.
done
`,
    hints: [
      'Trois trios : les caractères 1-3, 4-6 puis 7-9 de la permission.',
      'Un case sur le trio : *r* ajoute 4, *w* ajoute 2, *x* ajoute 1.'
    ],
    examples: [
      { stdin: '1\nrwxr-xr-x\n', expected: 'permission : 755' }
    ],
    tests: [
      { label: 'Deux fichiers', stdin: '2\nrw-r--r--\nrwx------\n', expected: 'permission : 644\npermission : 700' },
      { label: 'Fichiers sensibles', stdin: '3\nrw-r-----\nrwxrwxrwx\nr--------\n', expected: 'permission : 640\npermission : 777\npermission : 400' },
      { label: 'Sans exécution', stdin: '2\nrw-rw-r--\nrwxr-x---\n', expected: 'permission : 664\npermission : 750' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r perm
  o=""
  for pos in 1 4 7; do
    trio=$(printf '%s' "$perm" | cut -c"$pos-$((pos + 2))")
    v=0
    case "$trio" in *r*) v=$((v + 4)) ;; esac
    case "$trio" in *w*) v=$((v + 2)) ;; esac
    case "$trio" in *x*) v=$((v + 1)) ;; esac
    o="$o$v"
  done
  echo "permission : $o"
done
`
  },
  {
    id: 'lx2-c3-e2',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Interroger une permission',
    goal: 'Vérifier si le propriétaire possède le droit demandé.',
    brief: '<p>Le script lit <strong>n lignes</strong> « permission action » où <code>action</code> ' +
      'vaut <code>lire</code>, <code>ecrire</code> ou <code>executer</code>. Il considère uniquement ' +
      'le <strong>premier trio</strong> (le propriétaire) : si le droit demandé est présent, il ' +
      'affiche <code>droit : oui</code>, sinon <code>droit : non</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r perm action
  # À compléter : examiner le premier trio selon l’action demandée.
done
`,
    hints: [
      'Le premier trio correspond aux caractères 1 à 3 de la permission.',
      'Lire cherche r, ecrire cherche w, executer cherche x.'
    ],
    examples: [
      { stdin: '2\nrw-r--r-- lire\nrw-r--r-- executer\n', expected: 'droit : oui\ndroit : non' }
    ],
    tests: [
      { label: 'Propriétaire complet', stdin: '2\nrwxr-xr-x lire\nrwxr-xr-x executer\n', expected: 'droit : oui\ndroit : oui' },
      { label: 'Fichier en lecture seule', stdin: '3\nr--r--r-- lire\nr--r--r-- ecrire\nrwx------ executer\n', expected: 'droit : oui\ndroit : non\ndroit : oui' },
      { label: 'Dossier restreint', stdin: '2\nrwx------ lire\nrwx------ ecrire\n', expected: 'droit : oui\ndroit : oui' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r perm action
  trio=$(printf '%s' "$perm" | cut -c1-3)
  ok="non"
  case "$action" in
    lire) case "$trio" in *r*) ok="oui" ;; esac ;;
    ecrire) case "$trio" in *w*) ok="oui" ;; esac ;;
    executer) case "$trio" in *x*) ok="oui" ;; esac ;;
  esac
  echo "droit : $ok"
done
`
  },
  {
    id: 'lx2-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Vérifier une appartenance',
    goal: 'Contrôler le groupe de chaque utilisateur contre l’annuaire du service.',
    brief: '<p>L’annuaire du service associe un groupe à chaque compte : <code>rd</code> appartient ' +
      'à <code>it</code>, <code>sam</code> à <code>dev</code>, <code>ada</code> à ' +
      '<code>admin</code>. Le script lit <strong>n lignes</strong> « utilisateur groupe » et affiche ' +
      '<code>utilisateur : membre</code> si le groupe est le bon, <code>utilisateur : non membre</code> ' +
      'sinon.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r user groupe
  # À compléter : retrouver le groupe attendu et comparer.
done
`,
    hints: [
      'Un case sur user : rd → it, sam → dev, ada → admin.',
      'La comparaison se fait ensuite avec [ "$groupe" = "$attendu" ].'
    ],
    examples: [
      { stdin: '2\nrd it\nsam admin\n', expected: 'rd : membre\nsam : non membre' }
    ],
    tests: [
      { label: 'Équipe complète', stdin: '3\nrd it\nsam dev\nada admin\n', expected: 'rd : membre\nsam : membre\nada : membre' },
      { label: 'Mélange', stdin: '3\nrd admin\nada dev\nsam dev\n', expected: 'rd : non membre\nada : non membre\nsam : membre' },
      { label: 'Deux bons', stdin: '4\nada admin\nrd it\nsam admin\nada dev\n', expected: 'ada : membre\nrd : membre\nsam : non membre\nada : non membre' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r user groupe
  case "$user" in
    rd) attendu="it" ;;
    sam) attendu="dev" ;;
    ada) attendu="admin" ;;
  esac
  if [ "$groupe" = "$attendu" ]; then
    echo "$user : membre"
  else
    echo "$user : non membre"
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Réseau statique et SSH
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx2-c4-e1',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Valider une adresse IPv4',
    goal: 'Contrôler qu’une adresse est bien formée avant de la configurer.',
    brief: '<p>Le script lit <strong>n lignes</strong>, chacune une adresse IPv4. Une adresse est ' +
      '<strong>valide</strong> si elle compte exactement quatre octets séparés par des points, ' +
      'chacun entre 0 et 255. Il affiche <code>ip : valide</code> ou <code>ip : invalide</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r ip
  # À compléter : compter les octets et vérifier chacun entre 0 et 255.
done
`,
    hints: [
      'Le premier contrôle est le nombre de champs : quatre octets exactement.',
      'Chaque octet ne doit contenir que des chiffres et rester inférieur ou égal à 255.'
    ],
    examples: [
      { stdin: '3\n192.168.1.1\n10.0.0\n256.1.1.1\n', expected: 'ip : valide\nip : invalide\nip : invalide' }
    ],
    tests: [
      { label: 'Adressage local', stdin: '3\n127.0.0.1\n172.16.0.10\n192.168.0\n', expected: 'ip : valide\nip : valide\nip : invalide' },
      { label: 'Hors plage', stdin: '3\n300.0.0.1\n10.10.10.10\n1.2.3.4.5\n', expected: 'ip : invalide\nip : valide\nip : invalide' },
      { label: 'Cas limites', stdin: '3\n0.0.0.0\n255.255.255.255\n192.168.1.\n', expected: 'ip : valide\nip : valide\nip : invalide' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r ip
  ok=$(printf '%s' "$ip" | awk -F'.' '{ if (NF != 4) { print "invalide"; exit } for (i = 1; i <= 4; i++) { if ($i == "" || $i !~ /^[0-9]+$/ || $i + 0 > 255) { print "invalide"; exit } } print "valide" }')
  echo "ip : $ok"
done
`
  },
  {
    id: 'lx2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Classer une adresse privée ou publique',
    goal: 'Repérer les adresses réservées aux réseaux internes.',
    brief: '<p>Le script lit <strong>n lignes</strong>, chacune une adresse IPv4. Sont ' +
      '<strong>privées</strong> les adresses <code>10.*</code>, <code>192.168.*</code> et ' +
      '<code>172.16.*</code> à <code>172.31.*</code>. Les autres sont <strong>publiques</strong>. ' +
      'Il affiche <code>classe : privee</code> ou <code>classe : publique</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r ip
  # À compléter : reconnaître les préfixes privés, sinon publique.
done
`,
    hints: [
      'Un case sur le préfixe suffit : 10.* et 192.168.* sont privés.',
      'Pour 172, seules les plages 16 à 31 sont privées ; 172.15 et 172.32 ne le sont pas.'
    ],
    examples: [
      { stdin: '3\n10.0.0.5\n8.8.8.8\n192.168.1.1\n', expected: 'classe : privee\nclasse : publique\nclasse : privee' }
    ],
    tests: [
      { label: 'Réseau d’entreprise', stdin: '3\n172.16.5.4\n172.32.1.1\n192.168.10.20\n', expected: 'classe : privee\nclasse : publique\nclasse : privee' },
      { label: 'Internet', stdin: '3\n203.0.113.7\n198.51.100.9\n172.20.0.1\n', expected: 'classe : publique\nclasse : publique\nclasse : privee' },
      { label: 'Plage 172', stdin: '4\n172.15.0.1\n172.16.0.1\n172.31.255.1\n172.32.0.1\n', expected: 'classe : publique\nclasse : privee\nclasse : privee\nclasse : publique' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r ip
  case "$ip" in
    10.*|192.168.*) echo "classe : privee" ;;
    172.1[6-9].*|172.2[0-9].*|172.3[01].*) echo "classe : privee" ;;
    *) echo "classe : publique" ;;
  esac
done
`
  },
  {
    id: 'lx2-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Décoder une cible SSH',
    goal: 'Extraire utilisateur, hôte et port d’une chaîne de connexion.',
    brief: '<p>Le script lit <strong>n lignes</strong> au format ' +
      '<code>utilisateur@hote:port</code>. Pour chacune, il affiche trois lignes : ' +
      '<code>utilisateur : X</code>, <code>hote : Y</code>, <code>port : Z</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r cible
  # À compléter : découper la chaîne sur @ puis sur :.
done
`,
    hints: [
      'cut -d@ sépare la partie utilisateur de la partie hôte:port.',
      'cut -d: sépare ensuite le nom d’hôte du port.'
    ],
    examples: [
      { stdin: '2\nrd@10.0.0.5:22\nadmin@192.168.1.1:2222\n', expected: 'utilisateur : rd\nhote : 10.0.0.5\nport : 22\nutilisateur : admin\nhote : 192.168.1.1\nport : 2222' }
    ],
    tests: [
      { label: 'Deux cibles', stdin: '2\nroot@server:22\ntoto@192.168.0.10:2200\n', expected: 'utilisateur : root\nhote : server\nport : 22\nutilisateur : toto\nhote : 192.168.0.10\nport : 2200' },
      { label: 'Ports personnalisés', stdin: '2\nsam@172.16.0.4:8022\nada@10.10.10.10:22\n', expected: 'utilisateur : sam\nhote : 172.16.0.4\nport : 8022\nutilisateur : ada\nhote : 10.10.10.10\nport : 22' },
      { label: 'Nom d’hôte', stdin: '1\nweb@linux-box:22\n', expected: 'utilisateur : web\nhote : linux-box\nport : 22' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r cible
  user=$(printf '%s' "$cible" | cut -d@ -f1)
  reste=$(printf '%s' "$cible" | cut -d@ -f2)
  hote=$(printf '%s' "$reste" | cut -d: -f1)
  port=$(printf '%s' "$reste" | cut -d: -f2)
  echo "utilisateur : $user"
  echo "hote : $hote"
  echo "port : $port"
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Scripts Bash
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx2-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Additionner une série de valeurs',
    goal: 'Cumuler les entiers lus et afficher le total.',
    brief: '<p>Le script lit <strong>n</strong>, puis <strong>n lignes</strong> contenant chacune un ' +
      'entier (éventuellement négatif). Il calcule la somme et affiche <code>somme : X</code>.</p>',
    starter: `read -r n
s=0
for ((i=0; i<n; i++)); do
  read -r v
  # À compléter : ajouter v à s.
done
# À compléter : afficher la somme.
`,
    hints: [
      'L’addition arithmétique s’écrit s=$((s + v)).',
      'La somme s’affiche une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\n4\n6\n10\n', expected: 'somme : 20' }
    ],
    tests: [
      { label: 'Tickets', stdin: '4\n12\n8\n5\n15\n', expected: 'somme : 40' },
      { label: 'Dépenses', stdin: '3\n100\n250\n50\n', expected: 'somme : 400' },
      { label: 'Avec des négatifs', stdin: '4\n10\n-3\n7\n-4\n', expected: 'somme : 10' }
    ],
    solution: `read -r n
s=0
for ((i=0; i<n; i++)); do
  read -r v
  s=$((s + v))
done
echo "somme : $s"
`
  },
  {
    id: 'lx2-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Trouver le maximum',
    goal: 'Parcourir une série et garder la plus grande valeur.',
    brief: '<p>Le script lit <strong>n</strong>, puis <strong>n lignes</strong> contenant chacune un ' +
      'entier. Il affiche <code>max : X</code> où X est la plus grande valeur rencontrée.</p>',
    starter: `read -r n
read -r max
for ((i=1; i<n; i++)); do
  read -r v
  # À compléter : remplacer max si v lui est supérieur.
done
# À compléter : afficher le maximum.
`,
    hints: [
      'La première valeur sert de maximum initial.',
      'On compare ensuite chaque nouvelle valeur à max avec [ "$v" -gt "$max" ].'
    ],
    examples: [
      { stdin: '3\n5\n9\n2\n', expected: 'max : 9' }
    ],
    tests: [
      { label: 'Relevés', stdin: '4\n12\n30\n18\n25\n', expected: 'max : 30' },
      { label: 'Croissant', stdin: '3\n1\n2\n3\n', expected: 'max : 3' },
      { label: 'Décroissant', stdin: '4\n99\n40\n8\n1\n', expected: 'max : 99' }
    ],
    solution: `read -r n
read -r max
for ((i=1; i<n; i++)); do
  read -r v
  if [ "$v" -gt "$max" ]; then
    max="$v"
  fi
done
echo "max : $max"
`
  },
  {
    id: 'lx2-c5-e3',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Classer des fichiers par taille',
    goal: 'Écrire une règle de diagnostic et compter les gros fichiers.',
    brief: '<p>Le script lit <strong>n lignes</strong> « nom taille » où <code>taille</code> est un ' +
      'nombre d’octets. Il affiche <code>nom : gros</code> si la taille est <strong>supérieure ou ' +
      'égale à 1024</strong>, <code>nom : petit</code> sinon, puis termine par ' +
      '<code>gros : X</code>.</p>',
    starter: `read -r n
g=0
for ((i=0; i<n; i++)); do
  read -r nom taille
  # À compléter : comparer taille à 1024, afficher et compter.
done
# À compléter : le total des gros fichiers.
`,
    hints: [
      'La comparaison se fait avec [ "$taille" -ge 1024 ].',
      'Le seuil est inclusif : 1024 est déjà « gros ».'
    ],
    examples: [
      { stdin: '2\nlog.txt 2048\nnotes 512\n', expected: 'log.txt : gros\nnotes : petit\ngros : 1' }
    ],
    tests: [
      { label: 'Sauvegardes', stdin: '3\nbackup.tar 4096\nreadme 100\nimage.png 1500\n', expected: 'backup.tar : gros\nreadme : petit\nimage.png : gros\ngros : 2' },
      { label: 'Tout petit', stdin: '2\nid_rsa 800\nconfig 200\n', expected: 'id_rsa : petit\nconfig : petit\ngros : 0' },
      { label: 'Autour du seuil', stdin: '3\na 1023\nb 1024\nc 1025\n', expected: 'a : petit\nb : gros\nc : gros\ngros : 2' }
    ],
    solution: `read -r n
g=0
for ((i=0; i<n; i++)); do
  read -r nom taille
  if [ "$taille" -ge 1024 ]; then
    echo "$nom : gros"
    g=$((g + 1))
  else
    echo "$nom : petit"
  fi
done
echo "gros : $g"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Services, processus et planification
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'lx2-c6-e1',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Superviser un service',
    goal: 'Décider de l’action à mener selon l’état d’un service systemd.',
    brief: '<p>Le script lit <strong>n lignes</strong> « service etat » où <code>etat</code> vaut ' +
      '<code>active</code>, <code>inactive</code> ou <code>failed</code>. Il affiche pour chacun ' +
      '<code>service : rien a faire</code> (active), <code>service : demarrer</code> (inactive) ou ' +
      '<code>service : redemarrer</code> (failed). Il termine par <code>alertes : X</code>, le nombre ' +
      'de services non actifs.</p>',
    starter: `read -r n
a=0
for ((i=0; i<n; i++)); do
  read -r service etat
  # À compléter : choisir la bonne action et compter les alertes.
done
# À compléter : le total des alertes.
`,
    hints: [
      'Trois cas : active, inactive (démarrer), failed (redémarrer).',
      'Une alerte est comptée pour tout service qui n’est pas active.'
    ],
    examples: [
      { stdin: '3\nssh active\nnginx inactive\nmysql failed\n', expected: 'ssh : rien a faire\nnginx : demarrer\nmysql : redemarrer\nalertes : 2' }
    ],
    tests: [
      { label: 'Serveur web', stdin: '3\napache2 active\nmysql inactive\nredis active\n', expected: 'apache2 : rien a faire\nmysql : demarrer\nredis : rien a faire\nalertes : 1' },
      { label: 'Tout en panne', stdin: '3\nnginx failed\nphp-fpm failed\nssh inactive\n', expected: 'nginx : redemarrer\nphp-fpm : redemarrer\nssh : demarrer\nalertes : 3' },
      { label: 'Tout va bien', stdin: '4\ncron active\nssh active\ndocker active\nlogrotate active\n', expected: 'cron : rien a faire\nssh : rien a faire\ndocker : rien a faire\nlogrotate : rien a faire\nalertes : 0' }
    ],
    solution: `read -r n
a=0
for ((i=0; i<n; i++)); do
  read -r service etat
  case "$etat" in
    active) echo "$service : rien a faire" ;;
    inactive) echo "$service : demarrer"; a=$((a + 1)) ;;
    failed) echo "$service : redemarrer"; a=$((a + 1)) ;;
  esac
done
echo "alertes : $a"
`
  },
  {
    id: 'lx2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Détecter un processus anormal',
    goal: 'Repérer les processus zombies et dresser la liste des actifs.',
    brief: '<p>Le script lit <strong>n lignes</strong> « pid etat » où <code>etat</code> vaut ' +
      '<code>running</code>, <code>sleeping</code> ou <code>zombie</code>. Il affiche ' +
      '<code>pid : actif</code>, <code>pid : en attente</code> ou <code>pid : a nettoyer</code>, ' +
      'puis termine par <code>zombies : X</code>.</p>',
    starter: `read -r n
z=0
for ((i=0; i<n; i++)); do
  read -r pid etat
  # À compléter : traiter les trois états et compter les zombies.
done
# À compléter : le total des zombies.
`,
    hints: [
      'Trois états possibles : running, sleeping, zombie.',
      'Seuls les zombies alimentent le compteur final.'
    ],
    examples: [
      { stdin: '3\n101 running\n205 sleeping\n309 zombie\n', expected: '101 : actif\n205 : en attente\n309 : a nettoyer\nzombies : 1' }
    ],
    tests: [
      { label: 'Un zombie', stdin: '3\n11 running\n12 zombie\n13 sleeping\n', expected: '11 : actif\n12 : a nettoyer\n13 : en attente\nzombies : 1' },
      { label: 'Aucun zombie', stdin: '2\n7 running\n8 sleeping\n', expected: '7 : actif\n8 : en attente\nzombies : 0' },
      { label: 'Plusieurs zombies', stdin: '4\n21 zombie\n22 running\n23 zombie\n24 zombie\n', expected: '21 : a nettoyer\n22 : actif\n23 : a nettoyer\n24 : a nettoyer\nzombies : 3' }
    ],
    solution: `read -r n
z=0
for ((i=0; i<n; i++)); do
  read -r pid etat
  case "$etat" in
    running) echo "$pid : actif" ;;
    sleeping) echo "$pid : en attente" ;;
    zombie) echo "$pid : a nettoyer"; z=$((z + 1)) ;;
  esac
done
echo "zombies : $z"
`
  },
  {
    id: 'lx2-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Vérifier une tâche planifiée',
    goal: 'Classer les tâches cron selon qu’elles s’exécutent le matin ou l’après-midi.',
    brief: '<p>Le script lit <strong>n lignes</strong> « heure minute tache ». Une tâche dont ' +
      '<code>heure</code> est strictement inférieure à 12 s’exécute <strong>le matin</strong> ; sinon ' +
      'elle s’exécute <strong>l’après-midi</strong>. Il affiche <code>tache : matin</code> ou ' +
      '<code>tache : apres-midi</code>, puis termine par <code>matin : X</code>.</p>',
    starter: `read -r n
m=0
for ((i=0; i<n; i++)); do
  read -r heure minute tache
  # À compléter : comparer heure à 12, afficher et compter.
done
# À compléter : le total des tâches du matin.
`,
    hints: [
      'La comparaison se fait sur l’heure seule : [ "$heure" -lt 12 ].',
      'Midi (12) et au-delà sont considérés comme l’après-midi.'
    ],
    examples: [
      { stdin: '2\n6 30 sauvegarde\n23 0 nettoyage\n', expected: 'sauvegarde : matin\nnettoyage : apres-midi\nmatin : 1' }
    ],
    tests: [
      { label: 'Routine du soir', stdin: '3\n20 0 purge\n3 15 backup\n14 45 rapport\n', expected: 'purge : apres-midi\nbackup : matin\nrapport : apres-midi\nmatin : 1' },
      { label: 'Routine du matin', stdin: '2\n7 0 demarrage\n9 30 synchronisation\n', expected: 'demarrage : matin\nsynchronisation : matin\nmatin : 2' },
      { label: 'Autour de midi', stdin: '4\n11 59 maintenance\n12 0 audit\n5 0 releve\n18 30 cloture\n', expected: 'maintenance : matin\naudit : apres-midi\nreleve : matin\ncloture : apres-midi\nmatin : 2' }
    ],
    solution: `read -r n
m=0
for ((i=0; i<n; i++)); do
  read -r heure minute tache
  if [ "$heure" -lt 12 ]; then
    echo "$tache : matin"
    m=$((m + 1))
  else
    echo "$tache : apres-midi"
  fi
done
echo "matin : $m"
`
  }
];

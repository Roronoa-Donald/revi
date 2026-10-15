module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Fondamentaux et architectures
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 're-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'LAN ou WAN',
    goal: 'Classer les réseaux selon leur portée : LAN à l\'intérieur d\'un immeuble, WAN au-delà de 100 km.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau portee » : portee vaut <code>local</code> ' +
      '(immeuble, campus, salle) ou <code>etendu</code> (villes, pays). Pour chaque ligne il affiche ' +
      '<code>reseau : LAN</code> ou <code>reseau : WAN</code>. Il termine par deux lignes de comptage : ' +
      '<code>lan : X</code> puis <code>wan : Y</code>.</p>',
    starter: `read -r n
lan=0
wan=0
for ((i=0; i<n; i++)); do
  read -r reseau portee
  # À compléter : classer selon la portée, compter.
done
# À compléter : les deux totaux.
`,
    hints: [
      'Un if sur la portee suffit : local et etendu sont les deux seules valeurs.',
      'Les deux totaux sortent après la boucle, lan d\'abord, wan ensuite.'
    ],
    examples: [
      { stdin: '3\ncampus local\nfiliale etendu\nsalle local\n', expected: 'campus : LAN\nfiliale : WAN\nsalle : LAN\nlan : 2\nwan : 1' }
    ],
    tests: [
      { label: 'Un seul etendu', stdin: '1\nnational etendu\n', expected: 'national : WAN\nlan : 0\nwan : 1' },
      { label: 'Deux locaux', stdin: '2\npmi local\ncampus local\n', expected: 'pmi : LAN\ncampus : LAN\nlan : 2\nwan : 0' },
      { label: 'Cinq reseaux', stdin: '5\nsalle local\npays etendu\nville etendu\nclasse local\ncontinent etendu\n', expected: 'salle : LAN\npays : WAN\nville : WAN\nclasse : LAN\ncontinent : WAN\nlan : 2\nwan : 3' }
    ],
    solution: `read -r n
lan=0
wan=0
for ((i=0; i<n; i++)); do
  read -r reseau portee
  if [ "$portee" = "local" ]; then
    echo "$reseau : LAN"
    lan=$((lan + 1))
  else
    echo "$reseau : WAN"
    wan=$((wan + 1))
  fi
done
echo "lan : $lan"
echo "wan : $wan"
`
  },
  {
    id: 're-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Workgroup ou client-serveur',
    goal: 'Distinguer le groupe de travail (chaque poste est client et serveur) de l\'architecture client-serveur (données centralisées).',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau modele » : modele vaut <code>pairapair</code> ' +
      '(chaque poste met ses ressources à disposition, mots de passe partout) ou <code>centralise</code> ' +
      '(un serveur unique détient les comptes). Pour chaque ligne il affiche <code>reseau : workgroup</code> ou ' +
      '<code>reseau : client-serveur</code>. Il termine par <code>centralises : oui</code> si au moins un réseau ' +
      'est centralisé, <code>centralises : non</code> sinon.</p>',
    starter: `read -r n
centralise=0
for ((i=0; i<n; i++)); do
  read -r reseau modele
  # À compléter : nommer l'architecture, repérer la centralisation.
done
# À compléter : verdict sur les mots de passe.
`,
    hints: [
      'Un case à deux modèles : pairapair donne workgroup, centralise donne client-serveur.',
      'Un drapeau passe à 1 au premier réseau centralisé ; le verdict le teste après la boucle.'
    ],
    examples: [
      { stdin: '3\natelier pairapair\nagence centralise\nsdb pairapair\n', expected: 'atelier : workgroup\nagence : client-serveur\nsdb : workgroup\ncentralises : oui' }
    ],
    tests: [
      { label: 'Un seul centralise', stdin: '1\nagence centralise\n', expected: 'agence : client-serveur\ncentralises : oui' },
      { label: 'Que du pairapair', stdin: '2\ntpe pairapair\ncabine pairapair\n', expected: 'tpe : workgroup\ncabine : workgroup\ncentralises : non' },
      { label: 'Cinq reseaux', stdin: '5\na pairapair\nb centralise\nc pairapair\nd pairapair\ne centralise\n', expected: 'a : workgroup\nb : client-serveur\nc : workgroup\nd : workgroup\ne : client-serveur\ncentralises : oui' }
    ],
    solution: `read -r n
centralise=0
for ((i=0; i<n; i++)); do
  read -r reseau modele
  case "$modele" in
    pairapair) echo "$reseau : workgroup" ;;
    centralise) echo "$reseau : client-serveur" ; centralise=1 ;;
  esac
done
if [ "$centralise" = "1" ]; then
  echo "centralises : oui"
else
  echo "centralises : non"
fi
`
  },
  {
    id: 're-c1-e3',
    chapter: 1,
    level: 'n3',
    language: 'shell',
    title: 'Les cinq types de réseaux',
    goal: 'Ranger les réseaux dans les cinq familles du support : PAN, LAN, WLAN, MAN, WAN.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau code » : code vaut <code>p</code> (PAN : ' +
      'dessert une personne), <code>l</code> (LAN : réseau local filaire), <code>w</code> (WLAN : LAN sans ' +
      'fil), <code>m</code> (MAN : à l\'échelle d\'une ville) ou <code>g</code> (WAN : région, pays, ' +
      'continent). Pour chaque ligne il affiche <code>reseau : TYPE</code> avec le type en majuscules. Il ' +
      'termine par <code>sans fil : X/n</code> (les WLAN).</p>',
    starter: `read -r n
sansfil=0
for ((i=0; i<n; i++)); do
  read -r reseau code
  # À compléter : traduire le code en type, compter les WLAN.
done
# À compléter : bilan des réseaux sans fil.
`,
    hints: [
      'Un case à cinq codes : p, l, w, m, g — chacun donne son sigle en majuscules.',
      'Seul le code w compte comme réseau sans fil dans ce contrôle.'
    ],
    examples: [
      { stdin: '5\niphone p\nbox l\nwifi w\nmairie m\noperateur g\n', expected: 'iphone : PAN\nbox : LAN\nwifi : WLAN\nmairie : MAN\noperateur : WAN\nsans fil : 1/5' }
    ],
    tests: [
      { label: 'Un seul WLAN', stdin: '1\nlycee w\n', expected: 'lycee : WLAN\nsans fil : 1/1' },
      { label: 'Aucun sans fil', stdin: '2\nstudio p\ncampus m\n', expected: 'studio : PAN\ncampus : MAN\nsans fil : 0/2' },
      { label: 'Six reseaux', stdin: '6\na p\nb l\nc w\nd m\ne g\nf w\n', expected: 'a : PAN\nb : LAN\nc : WLAN\nd : MAN\ne : WAN\nf : WLAN\nsans fil : 2/6' }
    ],
    solution: `read -r n
sansfil=0
for ((i=0; i<n; i++)); do
  read -r reseau code
  case "$code" in
    p) echo "$reseau : PAN" ;;
    l) echo "$reseau : LAN" ;;
    w) echo "$reseau : WLAN" ; sansfil=$((sansfil + 1)) ;;
    m) echo "$reseau : MAN" ;;
    g) echo "$reseau : WAN" ;;
  esac
done
echo "sans fil : $sansfil/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Topologies et supports
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 're-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Bus, anneau, étoile',
    goal: 'Caractériser les trois topologies : bus fragile, anneau en boucle, étoile centralisée.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau topo » : topo vaut <code>bus</code> (un seul ' +
      'câble), <code>anneau</code> (boucle fermée à jeton) ou <code>etoile</code> (point central). Pour chaque ' +
      'ligne il affiche <code>reseau : fragile</code> (bus), <code>reseau : boucle</code> (anneau) ou ' +
      '<code>reseau : centralise</code> (étoile). Il termine par <code>etoiles : X/n</code>.</p>',
    starter: `read -r n
etoiles=0
for ((i=0; i<n; i++)); do
  read -r reseau topo
  # À compléter : caractériser chaque topologie, compter les étoiles.
done
# À compléter : bilan des étoiles.
`,
    hints: [
      'Un case à trois topologies, trois verdicts : fragile, boucle, centralise.',
      'Le compteur suit exactement les lignes « etoile ».'
    ],
    examples: [
      { stdin: '3\nthinnet bus\ntokenring anneau\ncampus etoile\n', expected: 'thinnet : fragile\ntokenring : boucle\ncampus : centralise\netoiles : 1/3' }
    ],
    tests: [
      { label: 'Une seule etoile', stdin: '1\ntour etoile\n', expected: 'tour : centralise\netoiles : 1/1' },
      { label: 'Deux bus', stdin: '2\nusine bus\nlabo bus\n', expected: 'usine : fragile\nlabo : fragile\netoiles : 0/2' },
      { label: 'Cinq reseaux', stdin: '5\na bus\nb etoile\nc anneau\nd etoile\ne bus\n', expected: 'a : fragile\nb : centralise\nc : boucle\nd : centralise\ne : fragile\netoiles : 2/5' }
    ],
    solution: `read -r n
etoiles=0
for ((i=0; i<n; i++)); do
  read -r reseau topo
  case "$topo" in
    bus) echo "$reseau : fragile" ;;
    anneau) echo "$reseau : boucle" ;;
    etoile) echo "$reseau : centralise" ; etoiles=$((etoiles + 1)) ;;
  esac
done
echo "etoiles : $etoiles/$n"
`
  },
  {
    id: 're-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Choisir le support',
    goal: 'Conseiller le bon support de transmission : UTP 100 m, STP blindé, fibre longue distance, Wi-Fi sans fil.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau support » : support vaut <code>utp</code> ' +
      '(paire torsadée non blindée, 100 m max), <code>stp</code> (blindé contre les interférences), ' +
      '<code>fibre</code> (longue distance, haut débit) ou <code>wifi</code> (ondes radio 802.11). Pour chaque ' +
      'ligne il affiche <code>reseau : conseille</code> (utp, stp, fibre), <code>reseau : sans fil</code> ' +
      '(wifi) ou <code>reseau : support inconnu</code>. Il termine par <code>blindes : X/n</code> (les STP).</p>',
    starter: `read -r n
blindes=0
for ((i=0; i<n; i++)); do
  read -r reseau support
  # À compléter : conseiller le support, compter les blindés.
done
# À compléter : bilan des blindés.
`,
    hints: [
      'Un case à quatre supports, plus le cas par défaut pour l\'inconnu.',
      'Seul le support stp est blindé dans ce contrôle.'
    ],
    examples: [
      { stdin: '4\nbureau utp\natelier stp\ncities fibre\nreunion wifi\n', expected: 'bureau : conseille\natelier : conseille\ncities : conseille\nreunion : sans fil\nblindes : 1/4' }
    ],
    tests: [
      { label: 'Un seul blindé', stdin: '1\nchaudiere stp\n', expected: 'chaudiere : conseille\nblindes : 1/1' },
      { label: 'Support inconnu', stdin: '2\nbureau coaxial\nsalle utp\n', expected: 'bureau : support inconnu\nsalle : conseille\nblindes : 0/2' },
      { label: 'Cinq reseaux', stdin: '5\na utp\nb wifi\nc stp\nd fibre\ne stp\n', expected: 'a : conseille\nb : sans fil\nc : conseille\nd : conseille\ne : conseille\nblindes : 2/5' }
    ],
    solution: `read -r n
blindes=0
for ((i=0; i<n; i++)); do
  read -r reseau support
  case "$support" in
    utp|stp|fibre) echo "$reseau : conseille" ;;
    wifi) echo "$reseau : sans fil" ;;
    *) echo "$reseau : support inconnu" ;;
  esac
  if [ "$support" = "stp" ]; then
    blindes=$((blindes + 1))
  fi
done
echo "blindes : $blindes/$n"
`
  },
  {
    id: 're-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'La panne de câble',
    goal: 'Simuler l\'effet d\'une coupure selon la topologie : bus hors service, anneau bascule sur le secondaire, étoile isole un poste.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau topo panne » : topo vaut <code>bus</code>, ' +
      '<code>anneau</code> ou <code>etoile</code> ; panne vaut <code>ok</code> ou <code>coupe</code> (câble ' +
      'coupé). Pour chaque ligne il affiche : <code>reseau : liaison correcte</code> (ok) ; sinon ' +
      '<code>reseau : reseau hors service</code> (bus), <code>reseau : bascule anneau secondaire</code> ' +
      '(anneau) ou <code>reseau : un poste isole</code> (étoile). Il termine par <code>pannes : X/n</code>.</p>',
    starter: `read -r n
pannes=0
for ((i=0; i<n; i++)); do
  read -r reseau topo panne
  # À compléter : appliquer la règle de la topologie, compter les pannes.
done
# À compléter : bilan des pannes.
`,
    hints: [
      'Un if sur panne, puis un case sur topo : ok court-circuite tout.',
      'Le compteur suit exactement les lignes « coupe », quelle que soit la topologie.'
    ],
    examples: [
      { stdin: '4\na bus ok\nb bus coupe\nc anneau coupe\nd etoile coupe\n', expected: 'a : liaison correcte\nb : reseau hors service\nc : bascule anneau secondaire\nd : un poste isole\npannes : 3/4' }
    ],
    tests: [
      { label: 'Anneau double', stdin: '1\nr1 anneau coupe\n', expected: 'r1 : bascule anneau secondaire\npannes : 1/1' },
      { label: 'Rien ne casse', stdin: '2\na etoile ok\nb anneau ok\n', expected: 'a : liaison correcte\nb : liaison correcte\npannes : 0/2' },
      { label: 'Cinq reseaux', stdin: '5\na bus coupe\nb etoile ok\nc bus ok\nd etoile coupe\ne anneau coupe\n', expected: 'a : reseau hors service\nb : liaison correcte\nc : liaison correcte\nd : un poste isole\ne : bascule anneau secondaire\npannes : 3/5' }
    ],
    solution: `read -r n
pannes=0
for ((i=0; i<n; i++)); do
  read -r reseau topo panne
  if [ "$panne" = "ok" ]; then
    echo "$reseau : liaison correcte"
  else
    pannes=$((pannes + 1))
    case "$topo" in
      bus) echo "$reseau : reseau hors service" ;;
      anneau) echo "$reseau : bascule anneau secondaire" ;;
      etoile) echo "$reseau : un poste isole" ;;
    esac
  fi
done
echo "pannes : $pannes/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Le modèle OSI
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 're-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Les sept couches OSI',
    goal: 'Ranger chaque élément dans sa couche OSI, de la couche 1 physique à la couche 7 application.',
    brief: '<p>Le script lit <strong>n lignes</strong> « objet couche » : couche vaut <code>c1</code> à ' +
      '<code>c7</code>. Pour chaque ligne il affiche <code>objet : N-nom</code>, où N est le numéro et nom la ' +
      'couche : <code>1-physique</code>, <code>2-liaison</code>, <code>3-reseau</code>, ' +
      '<code>4-transport</code>, <code>5-session</code>, <code>6-presentation</code>, ' +
      '<code>7-application</code>. Il termine par <code>routeurs : X/n</code> (les objets de la couche 3).</p>',
    starter: `read -r n
routeurs=0
for ((i=0; i<n; i++)); do
  read -r objet couche
  # À compléter : nommer la couche, compter les couches réseau.
done
# À compléter : bilan des couches réseau.
`,
    hints: [
      'Un case à sept valeurs, chaque valeur donnant « N-nom ».',
      'La couche 3 (reseau) est celle des routeurs : c\'est elle qu\'on compte.'
    ],
    examples: [
      { stdin: '4\ncable c1\nadresse c3\nport c4\nnavigateur c7\n', expected: 'cable : 1-physique\nadresse : 3-reseau\nport : 4-transport\nnavigateur : 7-application\nrouteurs : 1/4' }
    ],
    tests: [
      { label: 'Un seul c3', stdin: '1\npaquet c3\n', expected: 'paquet : 3-reseau\nrouteurs : 1/1' },
      { label: 'Couche 2', stdin: '2\ntrame c1\nmac c2\n', expected: 'trame : 1-physique\nmac : 2-liaison\nrouteurs : 0/2' },
      { label: 'Cinq objets', stdin: '5\na c7\nb c2\nc c3\nd c5\ne c6\n', expected: 'a : 7-application\nb : 2-liaison\nc : 3-reseau\nd : 5-session\ne : 6-presentation\nrouteurs : 1/5' }
    ],
    solution: `read -r n
routeurs=0
for ((i=0; i<n; i++)); do
  read -r objet couche
  case "$couche" in
    c1) echo "$objet : 1-physique" ;;
    c2) echo "$objet : 2-liaison" ;;
    c3) echo "$objet : 3-reseau" ; routeurs=$((routeurs + 1)) ;;
    c4) echo "$objet : 4-transport" ;;
    c5) echo "$objet : 5-session" ;;
    c6) echo "$objet : 6-presentation" ;;
    c7) echo "$objet : 7-application" ;;
  esac
done
echo "routeurs : $routeurs/$n"
`
  },
  {
    id: 're-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Où travaille l\'équipement',
    goal: 'Placer les équipements dans leurs couches : câble (1), commutateur (2), routeur (3), application (7).',
    brief: '<p>Le script lit <strong>n lignes</strong> « equipement couche » : couche vaut <code>c1</code> ' +
      '(câble, connecteur), <code>c2</code> (commutateur), <code>c3</code> (routeur) ou <code>c7</code> ' +
      '(navigateur, messagerie). Pour chaque ligne il affiche <code>equipement : couche N</code> si ' +
      'l\'équipement correspond bien à cette couche, <code>equipement : hors couche</code> sinon. Il termine ' +
      'par <code>routeurs : X/n</code> (les équipements placés correctement en couche 3).</p>',
    starter: `read -r n
routeurs=0
for ((i=0; i<n; i++)); do
  read -r equipement couche
  # À compléter : vérifier que l'équipement habite bien cette couche.
done
# À compléter : bilan des routeurs bien placés.
`,
    hints: [
      'Un case sur la couche donne l\'équipement attendu : c1 cable, c2 commutateur, c3 routeur, c7 application.',
      'La comparaison équipement reçu contre équipement attendu décide du verdict.'
    ],
    examples: [
      { stdin: '4\nrouteur c3\nswitch c2\ncable c1\nrouteur c2\n', expected: 'routeur : couche 3\nswitch : couche 2\ncable : couche 1\nrouteur : hors couche\nrouteurs : 1/4' }
    ],
    tests: [
      { label: 'Un routeur bien placé', stdin: '1\nrouteur c3\n', expected: 'routeur : couche 3\nrouteurs : 1/1' },
      { label: 'Hors couche', stdin: '2\nswitch c3\nnavigateur c2\n', expected: 'switch : hors couche\nnavigateur : hors couche\nrouteurs : 0/2' },
      { label: 'Cinq equipements', stdin: '5\nrouteur c3\nswitch c2\ncable c1\napplication c7\nswitch c3\n', expected: 'routeur : couche 3\nswitch : couche 2\ncable : couche 1\napplication : couche 7\nswitch : hors couche\nrouteurs : 1/5' }
    ],
    solution: `read -r n
routeurs=0
for ((i=0; i<n; i++)); do
  read -r equipement couche
  case "$couche" in
    c1) attendu="cable" ; numero=1 ;;
    c2) attendu="switch" ; numero=2 ;;
    c3) attendu="routeur" ; numero=3 ;;
    c7) attendu="application" ; numero=7 ;;
  esac
  if [ "$equipement" = "$attendu" ]; then
    echo "$equipement : couche $numero"
    if [ "$couche" = "c3" ]; then
      routeurs=$((routeurs + 1))
    fi
  else
    echo "$equipement : hors couche"
  fi
done
echo "routeurs : $routeurs/$n"
`
  },
  {
    id: 're-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Le dépannage par couches',
    goal: 'Appliquer la méthode du professionnel : en cas de panne, remonter les couches OSI depuis la couche physique.',
    brief: '<p>Le script lit <strong>n lignes</strong> « incident couche » : couche est la couche où se ' +
      'situe la panne — <code>c1</code> (câble débranché), <code>c2</code> (carte réseau fautive), ' +
      '<code>c3</code> (routage absent) ou <code>c7</code> (application en cause). Pour chaque ligne il ' +
      'affiche : <code>incident : verifier les cables</code> (c1), <code>incident : verifier la carte</code> ' +
      '(c2), <code>incident : verifier le routage</code> (c3), <code>incident : verifier les applications</code> ' +
      '(c7). Il termine par <code>physiques : X/n</code> (les pannes de couche 1, les plus fréquentes).</p>',
    starter: `read -r n
physiques=0
for ((i=0; i<n; i++)); do
  read -r incident couche
  # À compléter : donner le geste de dépannage, compter les pannes physiques.
done
# À compléter : bilan des pannes de couche 1.
`,
    hints: [
      'Un case à quatre couches, quatre gestes : cables, carte, routage, applications.',
      'Le compteur suit exactement les incidents de couche 1.'
    ],
    examples: [
      { stdin: '4\npc1 c1\npc2 c2\nsrv c3\nweb c7\n', expected: 'pc1 : verifier les cables\npc2 : verifier la carte\nsrv : verifier le routage\nweb : verifier les applications\nphysiques : 1/4' }
    ],
    tests: [
      { label: 'Cable debranche', stdin: '1\nimprimante c1\n', expected: 'imprimante : verifier les cables\nphysiques : 1/1' },
      { label: 'Routage absent', stdin: '2\nvlan c3\nappli c7\n', expected: 'vlan : verifier le routage\nappli : verifier les applications\nphysiques : 0/2' },
      { label: 'Cinq incidents', stdin: '5\na c1\nb c3\nc c2\nd c1\ne c7\n', expected: 'a : verifier les cables\nb : verifier le routage\nc : verifier la carte\nd : verifier les cables\ne : verifier les applications\nphysiques : 2/5' }
    ],
    solution: `read -r n
physiques=0
for ((i=0; i<n; i++)); do
  read -r incident couche
  case "$couche" in
    c1) echo "$incident : verifier les cables" ; physiques=$((physiques + 1)) ;;
    c2) echo "$incident : verifier la carte" ;;
    c3) echo "$incident : verifier le routage" ;;
    c7) echo "$incident : verifier les applications" ;;
  esac
done
echo "physiques : $physiques/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Le modèle TCP/IP
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 're-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Les quatre couches TCP/IP',
    goal: 'Ranger chaque élément dans les quatre couches du modèle TCP/IP : accès réseau, internet, transport, application.',
    brief: '<p>Le script lit <strong>n lignes</strong> « objet couche » : couche vaut <code>ac</code> (accès ' +
      'réseau), <code>in</code> (internet), <code>tr</code> (transport) ou <code>ap</code> (application). Pour ' +
      'chaque ligne il affiche <code>objet : acces-reseau</code>, <code>objet : internet</code>, ' +
      '<code>objet : transport</code> ou <code>objet : application</code>. Il termine par ' +
      '<code>transport : X/n</code>.</p>',
    starter: `read -r n
tr=0
for ((i=0; i<n; i++)); do
  read -r objet couche
  # À compléter : nommer la couche TCP/IP, compter le transport.
done
# À compléter : bilan du transport.
`,
    hints: [
      'Un case à quatre codes : ac, in, tr, ap.',
      'Le compteur suit exactement les lignes « transport ».'
    ],
    examples: [
      { stdin: '4\nethernet ac\nip in\ntcp tr\nhttp ap\n', expected: 'ethernet : acces-reseau\nip : internet\ntcp : transport\nhttp : application\ntransport : 1/4' }
    ],
    tests: [
      { label: 'Un seul transport', stdin: '1\nudp tr\n', expected: 'udp : transport\ntransport : 1/1' },
      { label: 'Couche internet', stdin: '2\nicmp in\narp in\n', expected: 'icmp : internet\narp : internet\ntransport : 0/2' },
      { label: 'Cinq objets', stdin: '5\na ac\nb ap\nc in\nd tr\ne ap\n', expected: 'a : acces-reseau\nb : application\nc : internet\nd : transport\ne : application\ntransport : 1/5' }
    ],
    solution: `read -r n
tr=0
for ((i=0; i<n; i++)); do
  read -r objet couche
  case "$couche" in
    ac) echo "$objet : acces-reseau" ;;
    in) echo "$objet : internet" ;;
    tr) echo "$objet : transport" ; tr=$((tr + 1)) ;;
    ap) echo "$objet : application" ;;
  esac
done
echo "transport : $tr/$n"
`
  },
  {
    id: 're-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Le three-way handshake',
    goal: 'Vérifier la séquence TCP : SYN, puis SYN-ACK, puis ACK — sinon la connexion échoue.',
    brief: '<p>Le script lit <strong>n lignes</strong> « paquet etape » : etape vaut <code>syn</code>, ' +
      '<code>synack</code> ou <code>ack</code>. La connexion est correcte si les paquets arrivent dans l\'ordre ' +
      'syn, puis synack, puis ack. Pour chaque ligne il affiche <code>paquet : etape N</code> (1, 2 ou 3) si le ' +
      'paquet est dans l\'ordre, <code>paquet : hors sequence</code> sinon. Final : <code>connexion : ' +
      'etablie</code> si les trois étapes sont passées dans l\'ordre, <code>connexion : echouee</code> sinon.</p>',
    starter: `read -r n
etape=0
for ((i=0; i<n; i++)); do
  read -r paquet etape_recue
  # À compléter : suivre syn, puis synack, puis ack.
done
# À compléter : verdict sur la connexion.
`,
    hints: [
      'Trois étapes numérotées : syn avance à 1, synack avance à 2 (seulement si on est à 1), ack avance à 3.',
      'Un drapeau rompu : toute sortie d\'ordre casse la connexion pour la suite.'
    ],
    examples: [
      { stdin: '3\np1 syn\np2 synack\np3 ack\n', expected: 'p1 : etape 1\np2 : etape 2\np3 : etape 3\nconnexion : etablie' }
    ],
    tests: [
      { label: 'Ack sans syn', stdin: '1\np1 ack\n', expected: 'p1 : hors sequence\nconnexion : echouee' },
      { label: 'Syn repete', stdin: '2\np1 syn\np2 syn\n', expected: 'p1 : etape 1\np2 : hors sequence\nconnexion : echouee' },
      { label: 'Cinq paquets', stdin: '5\np1 syn\np2 synack\np3 ack\np4 syn\np5 ack\n', expected: 'p1 : etape 1\np2 : etape 2\np3 : etape 3\np4 : hors sequence\np5 : hors sequence\nconnexion : echouee' }
    ],
    solution: `read -r n
etape=0
rompu=0
for ((i=0; i<n; i++)); do
  read -r paquet etape_recue
  if [ "$rompu" = "0" ]; then
    if [ "$etape_recue" = "syn" ] && [ "$etape" = "0" ]; then
      etape=1 ; echo "$paquet : etape 1"
    elif [ "$etape_recue" = "synack" ] && [ "$etape" = "1" ]; then
      etape=2 ; echo "$paquet : etape 2"
    elif [ "$etape_recue" = "ack" ] && [ "$etape" = "2" ]; then
      etape=3 ; echo "$paquet : etape 3"
    else
      rompu=1 ; echo "$paquet : hors sequence"
    fi
  else
    echo "$paquet : hors sequence"
  fi
done
if [ "$rompu" = "0" ] && [ "$etape" = "3" ]; then
  echo "connexion : etablie"
else
  echo "connexion : echouee"
fi
`
  },
  {
    id: 're-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'TCP contre UDP',
    goal: 'Choisir entre TCP (fiable, accusés de réception, full-duplex) et UDP (rapide, sans accusé).',
    brief: '<p>Le script lit <strong>n lignes</strong> « flux protocole » : protocole vaut <code>tcp</code> ' +
      '(transferts exigeant la fiabilité) ou <code>udp</code> (flux temps réel tolérant aux pertes). Pour chaque ' +
      'ligne il affiche <code>flux : fiable</code> (tcp) ou <code>flux : rapide</code> (udp). Il termine par ' +
      '<code>fiables : X/n</code>.</p>',
    starter: `read -r n
fiables=0
for ((i=0; i<n; i++)); do
  read -r flux protocole
  # À compléter : juger le protocole, compter les fiables.
done
# À compléter : bilan des fiables.
`,
    hints: [
      'Un if sur le protocole suffit : tcp et udp sont les deux seules valeurs.',
      'Le compteur suit exactement les flux « fiable ».'
    ],
    examples: [
      { stdin: '3\ncourriel tcp\ndns udp\ntransfert tcp\n', expected: 'courriel : fiable\ndns : rapide\ntransfert : fiable\nfiables : 2/3' }
    ],
    tests: [
      { label: 'Un seul UDP', stdin: '1\nvoix udp\n', expected: 'voix : rapide\nfiables : 0/1' },
      { label: 'Que du TCP', stdin: '2\nsite tcp\nbanque tcp\n', expected: 'site : fiable\nbanque : fiable\nfiables : 2/2' },
      { label: 'Cinq flux', stdin: '5\na tcp\nb udp\nc udp\nd tcp\ne tcp\n', expected: 'a : fiable\nb : rapide\nc : rapide\nd : fiable\ne : fiable\nfiables : 3/5' }
    ],
    solution: `read -r n
fiables=0
for ((i=0; i<n; i++)); do
  read -r flux protocole
  if [ "$protocole" = "tcp" ]; then
    echo "$flux : fiable"
    fiables=$((fiables + 1))
  else
    echo "$flux : rapide"
  fi
done
echo "fiables : $fiables/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — L'adressage réseau
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 're-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Lire une adresse MAC',
    goal: 'Valider une adresse MAC : 48 bits, soit exactement 12 chiffres hexadécimaux.',
    brief: '<p>Le script lit <strong>n lignes</strong> « carte mac » : mac est une suite de caractères ' +
      'prétendant être une adresse MAC (sans séparateurs, par exemple <code>aabbccddeeff</code>). Une MAC ' +
      'valide compte <strong>exactement 12 chiffres hexadécimaux</strong> (0-9, a-f, A-F) : les 6 premiers ' +
      'forment l\'OUI du fabricant, les 6 derniers le numéro de série. Pour chaque ligne il affiche ' +
      '<code>carte : mac valide</code> ou <code>carte : mac invalide</code>. Il termine par ' +
      '<code>invalides : X/n</code>.</p>',
    starter: `read -r n
invalides=0
for ((i=0; i<n; i++)); do
  read -r carte mac
  # À compléter : vérifier 12 caractères hexadécimaux, compter.
done
# À compléter : bilan des invalides.
`,
    hints: [
      'Un case avec douze classes [0-9a-fA-F] de suite valide la forme : le motif doit couvrir tout le mot.',
      'Trop courte, trop longue ou avec un caractère étranger : tout tombe dans le cas invalide.'
    ],
    examples: [
      { stdin: '3\npc1 aabbccddeeff\npc2 aabbccdd\npc3 aabbccddeexf\n', expected: 'pc1 : mac valide\npc2 : mac invalide\npc3 : mac invalide\ninvalides : 2/3' }
    ],
    tests: [
      { label: 'Une seule valide', stdin: '1\nsrv 001A2B3C4D5E\n', expected: 'srv : mac valide\ninvalides : 0/1' },
      { label: 'Trop longue', stdin: '2\npc1 aabbccddeeff1\npc2 aabbccddeeff\n', expected: 'pc1 : mac invalide\npc2 : mac valide\ninvalides : 1/2' },
      { label: 'Cinq cartes', stdin: '5\na aabbccddeeff\nb AABBCCDDEEFF\nc aabbccddeegf\nd aabbccddee\ne zzbccddeeff1\n', expected: 'a : mac valide\nb : mac valide\nc : mac invalide\nd : mac invalide\ne : mac invalide\ninvalides : 3/5' }
    ],
    solution: `read -r n
invalides=0
for ((i=0; i<n; i++)); do
  read -r carte mac
  case "$mac" in
    [0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F][0-9a-fA-F])
      echo "$carte : mac valide" ;;
    *)
      echo "$carte : mac invalide"
      invalides=$((invalides + 1)) ;;
  esac
done
echo "invalides : $invalides/$n"
`
  },
  {
    id: 're-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Réseau ou hôte',
    goal: 'Découper une adresse IP selon sa classe : quel octet appartient à la partie réseau, lequel à la partie hôte.',
    brief: '<p>Le script lit <strong>n lignes</strong> « classe octet » : classe vaut <code>a</code> (1 octet ' +
      'réseau), <code>b</code> (2 octets réseau) ou <code>c</code> (3 octets réseau) ; octet vaut ' +
      '<code>o1</code>, <code>o2</code>, <code>o3</code> ou <code>o4</code>. Pour chaque ligne il affiche ' +
      '<code>octet : reseau</code> si l\'octet appartient à la partie réseau de cette classe, ' +
      '<code>octet : hote</code> sinon. Il termine par <code>reseau : X/n</code>.</p>',
    starter: `read -r n
reseau=0
for ((i=0; i<n; i++)); do
  read -r classe octet
  # À compléter : décider de la partie selon la classe et le rang d'octet.
done
# À compléter : bilan de la partie réseau.
`,
    hints: [
      'Un case sur la classe fixe le nombre d\'octets réseau : a 1, b 2, c 3.',
      'Un second case sur l\'octet (o1 à o4) compare son rang à ce nombre.'
    ],
    examples: [
      { stdin: '5\nc o1\nc o2\nc o4\na o2\nb o2\n', expected: 'o1 : reseau\no2 : reseau\no4 : hote\no2 : hote\no2 : reseau\nreseau : 3/5' }
    ],
    tests: [
      { label: 'Classe A, premier octet', stdin: '1\na o1\n', expected: 'o1 : reseau\nreseau : 1/1' },
      { label: 'Classe C, tout le dernier', stdin: '2\nc o3\nc o4\n', expected: 'o3 : reseau\no4 : hote\nreseau : 1/2' },
      { label: 'Six lignes', stdin: '6\nb o1\nb o3\nb o4\na o4\na o1\nc o2\n', expected: 'o1 : reseau\no3 : hote\no4 : hote\no4 : hote\no1 : reseau\no2 : reseau\nreseau : 3/6' }
    ],
    solution: `read -r n
reseau=0
for ((i=0; i<n; i++)); do
  read -r classe octet
  case "$classe" in
    a) reseau_octets=1 ;;
    b) reseau_octets=2 ;;
    c) reseau_octets=3 ;;
  esac
  case "$octet" in
    o1) rang=1 ;;
    o2) rang=2 ;;
    o3) rang=3 ;;
    o4) rang=4 ;;
  esac
  if [ "$rang" -le "$reseau_octets" ]; then
    echo "$octet : reseau"
    reseau=$((reseau + 1))
  else
    echo "$octet : hote"
  fi
done
echo "reseau : $reseau/$n"
`
  },
  {
    id: 're-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'La classe de l\'adresse',
    goal: 'Identifier la classe IPv4 par le premier octet : A (1-126), B (128-191), C (192-223), D et E réservées.',
    brief: '<p>Le script lit <strong>n lignes</strong> « adresse premieroctet » : premieroctet est un entier ' +
      '(0 à 255). Pour chaque ligne il affiche : <code>adresse : classe A</code> (1-126), <code>adresse : ' +
      'classe B</code> (128-191), <code>adresse : classe C</code> (192-223), <code>adresse : classe D</code> ' +
      '(224-239, multicast), <code>adresse : classe E</code> (240-254, expérimentale), <code>adresse : boucle ' +
      'locale</code> (127) ou <code>adresse : reservee</code> (0 et 255). Il termine par ' +
      '<code>speciales : X/n</code> (boucle locale et réservées).</p>',
    starter: `read -r n
speciales=0
for ((i=0; i<n; i++)); do
  read -r adresse premieroctet
  # À compléter : classifier par tranches d'entiers, compter les spéciales.
done
# À compléter : bilan des adresses spéciales.
`,
    hints: [
      'Une suite de if/elif avec -le et -ge évite le case : les tranches sont numériques.',
      'Boucle locale (127), 0 et 255 sont les cas « speciales » à compter.'
    ],
    examples: [
      { stdin: '4\nrc 10\nuni 172\npmi 192\ngroupe 224\n', expected: 'rc : classe A\nuni : classe B\npmi : classe C\ngroupe : classe D\nspeciales : 0/4' }
    ],
    tests: [
      { label: 'Boucle locale', stdin: '1\nlocalhost 127\n', expected: 'localhost : boucle locale\nspeciales : 1/1' },
      { label: 'Classe E', stdin: '2\nlabo 240\npmi 193\n', expected: 'labo : classe E\npmi : classe C\nspeciales : 0/2' },
      { label: 'Six adresses', stdin: '6\na 1\nb 126\nc 128\nd 191\ne 255\nf 0\n', expected: 'a : classe A\nb : classe A\nc : classe B\nd : classe B\ne : reservee\nf : reservee\nspeciales : 2/6' }
    ],
    solution: `read -r n
speciales=0
for ((i=0; i<n; i++)); do
  read -r adresse premieroctet
  if [ "$premieroctet" -eq 0 ] || [ "$premieroctet" -eq 255 ]; then
    echo "$adresse : reservee"
    speciales=$((speciales + 1))
  elif [ "$premieroctet" -eq 127 ]; then
    echo "$adresse : boucle locale"
    speciales=$((speciales + 1))
  elif [ "$premieroctet" -le 126 ]; then
    echo "$adresse : classe A"
  elif [ "$premieroctet" -le 191 ]; then
    echo "$adresse : classe B"
  elif [ "$premieroctet" -le 223 ]; then
    echo "$adresse : classe C"
  elif [ "$premieroctet" -le 239 ]; then
    echo "$adresse : classe D"
  else
    echo "$adresse : classe E"
  fi
done
echo "speciales : $speciales/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Le sous-réseautage
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 're-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Emprunter des bits',
    goal: 'Calculer l\'effet de l\'emprunt de bits d\'hôte : combien de sous-réseaux créés, combien d\'hôtes valides chacun.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau emprunt » : emprunt est le nombre de bits ' +
      'empruntés à la partie hôte d\'un /24 (entier de 1 à 6). Pour chaque ligne il affiche <code>reseau : /C ' +
      '(S sous-reseaux, H hotes)</code>, où C = 24 + emprunt, S = 2^emprunt et H = 2^(8-emprunt) - 2. Si ' +
      'l\'emprunt vaut 7 ou plus, afficher <code>reseau : emprunt trop grand</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r reseau emprunt
  # À compléter : calculer le préfixe, les sous-réseaux et les hôtes.
done
`,
    hints: [
      'La puissance de deux se calcule en Bash avec le décalage : (1 << e) vaut 2 puissance e.',
      'Les hôtes valides retirent l\'adresse réseau et l\'adresse de diffusion : 2^k - 2.'
    ],
    examples: [
      { stdin: '3\nagence 3\nagence2 2\nagence3 1\n', expected: 'agence : /27 (8 sous-reseaux, 30 hotes)\nagence2 : /26 (4 sous-reseaux, 62 hotes)\nagence3 : /25 (2 sous-reseaux, 126 hotes)' }
    ],
    tests: [
      { label: 'Emprunt d un bit', stdin: '1\nres1 1\n', expected: 'res1 : /25 (2 sous-reseaux, 126 hotes)' },
      { label: 'Emprunt trop grand', stdin: '2\nres1 7\nres2 3\n', expected: 'res1 : emprunt trop grand\nres2 : /27 (8 sous-reseaux, 30 hotes)' },
      { label: 'Cinq reseaux', stdin: '5\na 1\nb 2\nc 3\nd 4\ne 5\n', expected: 'a : /25 (2 sous-reseaux, 126 hotes)\nb : /26 (4 sous-reseaux, 62 hotes)\nc : /27 (8 sous-reseaux, 30 hotes)\nd : /28 (16 sous-reseaux, 14 hotes)\ne : /29 (32 sous-reseaux, 6 hotes)' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r reseau emprunt
  if [ "$emprunt" -ge 7 ]; then
    echo "$reseau : emprunt trop grand"
  else
    sous=$((1 << emprunt))
    hotes=$(( (1 << (8 - emprunt)) - 2 ))
    cidr=$((24 + emprunt))
    echo "$reseau : /$cidr ($sous sous-reseaux, $hotes hotes)"
  fi
done
`
  },
  {
    id: 're-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Le nouveau masque',
    goal: 'Convertir l\'emprunt de bits en masque décimal : 3 bits empruntés sur le 4e octet donnent 255.255.255.224.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau emprunt » : emprunt est le nombre de bits ' +
      'mis à 1 dans le 4e octet du masque (entier de 1 à 6). Le 4e octet vaut 256 - 2^(8-emprunt) : 3 bits ' +
      'empruntés donnent 224, 2 bits donnent 192, etc. Pour chaque ligne il affiche <code>reseau : ' +
      '255.255.255.X (/C)</code> où C = 24 + emprunt. Si l\'emprunt vaut 7 ou plus, afficher <code>reseau : ' +
      'emprunt trop grand</code>. Il termine par <code>slash28 : X/n</code> (les emprunts de 4 bits).</p>',
    starter: `read -r n
slash28=0
for ((i=0; i<n; i++)); do
  read -r reseau emprunt
  # À compléter : convertir l'emprunt en octet décimal, compter les /28.
done
# À compléter : bilan des /28.
`,
    hints: [
      'L\'octet vaut 256 moins la puissance de deux restante : 256 - (1 << (8 - emprunt)).',
      'L\'emprunt de 4 bits donne 240 : c\'est le /28 à compter.'
    ],
    examples: [
      { stdin: '3\nagence 3\nagence2 2\nagence3 4\n', expected: 'agence : 255.255.255.224 (/27)\nagence2 : 255.255.255.192 (/26)\nagence3 : 255.255.255.240 (/28)\nslash28 : 1/3' }
    ],
    tests: [
      { label: 'Un seul bit', stdin: '1\nres1 1\n', expected: 'res1 : 255.255.255.128 (/25)\nslash28 : 0/1' },
      { label: 'Emprunt trop grand', stdin: '2\nres1 8\nres2 2\n', expected: 'res1 : emprunt trop grand\nres2 : 255.255.255.192 (/26)\nslash28 : 0/2' },
      { label: 'Cinq reseaux', stdin: '5\na 1\nb 2\nc 3\nd 4\ne 6\n', expected: 'a : 255.255.255.128 (/25)\nb : 255.255.255.192 (/26)\nc : 255.255.255.224 (/27)\nd : 255.255.255.240 (/28)\ne : 255.255.255.252 (/30)\nslash28 : 1/5' }
    ],
    solution: `read -r n
slash28=0
for ((i=0; i<n; i++)); do
  read -r reseau emprunt
  if [ "$emprunt" -ge 7 ]; then
    echo "$reseau : emprunt trop grand"
  else
    octet=$((256 - (1 << (8 - emprunt))))
    cidr=$((24 + emprunt))
    echo "$reseau : 255.255.255.$octet (/$cidr)"
    if [ "$emprunt" = "4" ]; then
      slash28=$((slash28 + 1))
    fi
  fi
done
echo "slash28 : $slash28/$n"
`
  },
  {
    id: 're-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Le plan d\'adressage VLSM',
    goal: 'Dimensionner les sous-réseaux de chaque site : le plus petit bloc dont la capacité couvre les hôtes demandés.',
    brief: '<p>Le script lit <strong>n lignes</strong> « site hotes » : hotes est le nombre d\'hôtes requis ' +
      '(entier de 1 à 254). Pour chaque site le script cherche le plus petit bloc valable : la capacité vaut ' +
      '2^k - 2 hôtes pour k bits d\'hôte, et le préfixe vaut 32 - k. Il affiche <code>site : /P (C hotes)</code> ' +
      'où P est le préfixe et C la capacité du bloc retenu. Si plus de 254 hôtes sont demandés, afficher ' +
      '<code>site : impossible</code>. Il termine par <code>liaisons : X/n</code> (les sites servis en /30, ' +
      'capacité 2 : liaisons point-à-point).</p>',
    starter: `read -r n
liaisons=0
for ((i=0; i<n; i++)); do
  read -r site hotes
  # À compléter : chercher k tel que 2^k - 2 couvre les hôtes.
done
# À compléter : bilan des liaisons point-à-point.
`,
    hints: [
      'Une boucle while augmente k tant que (2^k - 2) est inférieur au besoin ; le préfixe vaut 32 - k.',
      'Un /30 a une capacité de 2 hôtes : c\'est la liaison point-à-point du plan.'
    ],
    examples: [
      { stdin: '4\nbureau1 30\nbureau2 6\nliaison 2\nsiege 100\n', expected: 'bureau1 : /27 (30 hotes)\nbureau2 : /29 (6 hotes)\nliaison : /30 (2 hotes)\nsiege : /25 (126 hotes)\nliaisons : 1/4' }
    ],
    tests: [
      { label: 'Une seule liaison', stdin: '1\nrouteurs 2\n', expected: 'routeurs : /30 (2 hotes)\nliaisons : 1/1' },
      { label: 'Besoin impossible', stdin: '2\ndatacenter 500\nbureau 10\n', expected: 'datacenter : impossible\nbureau : /28 (14 hotes)\nliaisons : 0/2' },
      { label: 'Cinq sites', stdin: '5\na 2\nb 10\nc 50\nd 1\ne 200\n', expected: 'a : /30 (2 hotes)\nb : /28 (14 hotes)\nc : /26 (62 hotes)\nd : /30 (2 hotes)\ne : /24 (254 hotes)\nliaisons : 2/5' }
    ],
    solution: `read -r n
liaisons=0
for ((i=0; i<n; i++)); do
  read -r site hotes
  k=1
  while [ $(( (1 << k) - 2 )) -lt "$hotes" ]; do
    k=$((k + 1))
  done
  if [ "$k" -gt 8 ]; then
    echo "$site : impossible"
  else
    capacite=$(( (1 << k) - 2 ))
    prefixe=$((32 - k))
    echo "$site : /$prefixe ($capacite hotes)"
    if [ "$k" = "2" ]; then
      liaisons=$((liaisons + 1))
    fi
  fi
done
echo "liaisons : $liaisons/$n"
`
  }
];

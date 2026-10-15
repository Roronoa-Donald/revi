module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Généralités sur les réseaux : composantes et câblage
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cc-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Quel équipement pour quel rôle',
    goal: 'Classer les composantes du réseau : terminal, routeur, commutateurs L2/L3, concentrateur, pare-feu.',
    brief: '<p>Le script lit <strong>n lignes</strong> « equipement role » : role est un code parmi ' +
      '<code>terminal</code>, <code>routeur</code>, <code>switchl2</code>, <code>switchl3</code>, ' +
      '<code>hub</code> ou <code>parefeu</code>. Pour chaque ligne il affiche ' +
      '<code>equipement : OK</code> quand le rôle annoncé correspond à l\'équipement — PC et ' +
      'imprimante sont des <em>terminaux</em>, le routeur relie les réseaux, le switch L2 commute sur ' +
      'un LAN, le switch L3 route entre VLAN, le hub répéter bêtement, le pare-feu filtre — sinon ' +
      '<code>equipement : ERREUR</code>. Il termine par <code>roles corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r equipement role
  # À compléter : valider le rôle, compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l\'équipement donne le rôle attendu ; compare-le au rôle saisi.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\npc terminal\nsw1 switchl2\nhub switchl3\n', expected: 'pc : OK\nsw1 : OK\nhub : ERREUR\nroles corrects : 2/3' }
    ],
    tests: [
      { label: 'Les six équipements', stdin: '6\npc terminal\nr1 routeur\nsw1 switchl2\nsw3 switchl3\nhub hub\nfw parefeu\n', expected: 'pc : OK\nr1 : OK\nsw1 : OK\nsw3 : OK\nhub : OK\nfw : OK\nroles corrects : 6/6' },
      { label: 'Deux confusions', stdin: '3\nhub routeur\nsw3 switchl2\npc terminal\n', expected: 'hub : ERREUR\nsw3 : ERREUR\npc : OK\nroles corrects : 1/3' },
      { label: 'Réseau complet', stdin: '5\nserveur terminal\nr1 routeur\nsw1 switchl2\nsw3 switchl3\nfw parefeu\n', expected: 'serveur : OK\nr1 : OK\nsw1 : OK\nsw3 : OK\nfw : OK\nroles corrects : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r equipement role
  case "$equipement" in
    pc|serveur|imprimante) attendu="terminal" ;;
    r1|r2|r3) attendu="routeur" ;;
    sw1|sw2) attendu="switchl2" ;;
    sw3|sw4) attendu="switchl3" ;;
    hub) attendu="hub" ;;
    fw) attendu="parefeu" ;;
  esac
  if [ "$role" = "$attendu" ]; then
    echo "$equipement : OK"
    ok=$((ok + 1))
  else
    echo "$equipement : ERREUR"
  fi
done
echo "roles corrects : $ok/$n"
`
  },
  {
    id: 'cc-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Câble droit ou câble croisé',
    goal: 'Appliquer la règle du brochage : câble droit entre appareils différents, croisé entre appareils similaires.',
    brief: '<p>Le script lit <strong>n lignes</strong> « liaisontype typeannonce » : liaisontype est un ' +
      'code parmi <code>pc-switch</code>, <code>pc-pc</code>, <code>switch-switch</code>, ' +
      '<code>pc-routeur</code> ou <code>routeur-routeur</code> et typeannonce un code parmi ' +
      '<code>droit</code> ou <code>croise</code>. Règle du support : un <strong>câble droit</strong> relie ' +
      'deux appareils <em>différents</em> (pc-switch, pc-routeur), un <strong>câble croisé</strong> relie ' +
      'deux appareils <em>similaires</em> (pc-pc, switch-switch, routeur-routeur). Pour chaque ligne il ' +
      'affiche <code>liaison : conforme</code> ou <code>liaison : a revoir</code>, puis ' +
      '<code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r liaisontype typeannonce
  # À compléter : conforme ou à revoir ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Deux appareils différents → droit ; deux appareils similaires → croisé.',
      'Un case sur la liaison donne le brochage attendu.'
    ],
    examples: [
      { stdin: '3\npc-switch droit\nswitch-switch droit\npc-pc croise\n', expected: 'pc-switch : conforme\nswitch-switch : a revoir\npc-pc : conforme\nconformes : 2/3' }
    ],
    tests: [
      { label: 'Les cinq liaisons', stdin: '5\npc-switch droit\npc-routeur droit\npc-pc croise\nswitch-switch croise\nrouteur-routeur croise\n', expected: 'pc-switch : conforme\npc-routeur : conforme\npc-pc : conforme\nswitch-switch : conforme\nrouteur-routeur : conforme\nconformes : 5/5' },
      { label: 'Inversions', stdin: '2\npc-switch croise\npc-pc droit\n', expected: 'pc-switch : a revoir\npc-pc : a revoir\nconformes : 0/2' },
      { label: 'Baie de brassage', stdin: '4\npc-switch droit\nsw1-sw2 croise\npc-routeur droit\nr1-r2 croise\n', expected: 'pc-switch : conforme\nsw1-sw2 : conforme\npc-routeur : conforme\nr1-r2 : conforme\nconformes : 4/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r liaisontype typeannonce
  case "$liaisontype" in
    pc-switch|pc-routeur) attendu="droit" ;;
    pc-pc|switch-switch|routeur-routeur|sw1-sw2|r1-r2) attendu="croise" ;;
  esac
  if [ "$typeannonce" = "$attendu" ]; then
    echo "$liaisontype : conforme"
    ok=$((ok + 1))
  else
    echo "$liaisontype : a revoir"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'cc-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Choisir la catégorie du câble',
    goal: 'Conseiller la catégorie de paires torsadées selon le débit visé.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « site debit » ' +
      'où debit est un code parmi <code>100m</code>, <code>1g</code> ou <code>10g</code>. Règle du ' +
      'support : la catégorie 5e porte le gigabit, la catégorie 6a porte le 10 Gigabit ; en dessous, la ' +
      'catégorie 3 couvre le Fast Ethernet 100 Mbit/s. Pour chaque site il affiche ' +
      '<code>site : cat5e</code>, <code>site : cat6a</code> ou <code>site : cat3</code>, puis ' +
      '<code>cat6a posees : X</code> (nombre de câbles 10G).</p>',
    starter: `read -r n
c6a=0
for ((i=0; i<n; i++)); do
  read -r site debit
  # À compléter : la catégorie, compter les 10G.
done
# À compléter : le bilan.
`,
    hints: [
      '1g → cat5e ; 10g → cat6a ; 100m → cat3.',
      'Compte les cat6a posées pour le bilan.'
    ],
    examples: [
      { stdin: '3\nbureau 1g\nsalle 10g\nreception 100m\n', expected: 'bureau : cat5e\nsalle : cat6a\nreception : cat3\ncat6a posees : 1' }
    ],
    tests: [
      { label: 'Que du gigabit', stdin: '2\nlabo 1g\nbureau 1g\n', expected: 'labo : cat5e\nbureau : cat5e\ncat6a posees : 0' },
      { label: 'Datacenter', stdin: '2\nrack1 10g\nrack2 10g\n', expected: 'rack1 : cat6a\nrack2 : cat6a\ncat6a posees : 2' },
      { label: 'Étage mixte', stdin: '4\ncompta 1g\ncafe 100m\nreunion 10g\naccueil 100m\n', expected: 'compta : cat5e\ncafe : cat3\nreunion : cat6a\naccueil : cat3\ncat6a posees : 1' }
    ],
    solution: `read -r n
c6a=0
for ((i=0; i<n; i++)); do
  read -r site debit
  case "$debit" in
    1g) echo "$site : cat5e" ;;
    10g)
      echo "$site : cat6a"
      c6a=$((c6a + 1))
      ;;
    100m) echo "$site : cat3" ;;
  esac
done
echo "cat6a posees : $c6a"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Les modèles TCP/IP et OSI
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cc-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Couches TCP/IP à 4 ou 5',
    goal: 'Classer les éléments dans le modèle TCP/IP à 4 couches puis à 5 couches (modèle d\'actualité).',
    brief: '<p>Le script lit <strong>n lignes</strong> « element modele couche » : modele est un code ' +
      'parmi <code>tcp4</code> ou <code>tcp5</code>. Dans le modèle à 4 couches, les couches sont ' +
      '<code>acces</code>, <code>internet</code>, <code>transport</code> et <code>application</code> ; ' +
      'dans le modèle à 5 couches (d\'actualité), la couche <code>physique</code> est séparée de l\'accès ' +
      'réseau. Pour chaque ligne il affiche <code>element : OK</code> si la couche existe dans ce ' +
      'modèle, sinon <code>element : ABSENT</code> (physique est absent du modèle 4 couches). Il ' +
      'termine par <code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r element modele couche
  # À compléter : la couche existe-t-elle dans ce modèle ?
done
# À compléter : le bilan.
`,
    hints: [
      'Le modèle 4 couches n\'a pas de couche physique : seule la 5 couches l\'a.',
      'Le verdict porte sur la couche, pas sur l\'élément.'
    ],
    examples: [
      { stdin: '3\ncable tcp5 physique\ncable tcp4 physique\nip tcp4 internet\n', expected: 'cable : OK\ncable : ABSENT\nip : OK\nconformes : 2/3' }
    ],
    tests: [
      { label: 'Modèle 4', stdin: '4\ntrame tcp4 acces\nsegment tcp4 transport\npage tcp4 application\nbits tcp4 physique\n', expected: 'trame : OK\nsegment : OK\npage : OK\nbits : ABSENT\nconformes : 3/4' },
      { label: 'Modèle 5', stdin: '4\nbits tcp5 physique\ntrame tcp5 acces\nsegment tcp5 transport\npage tcp5 application\n', expected: 'bits : OK\ntrame : OK\nsegment : OK\npage : OK\nconformes : 4/4' },
      { label: 'Comparaison', stdin: '4\nbits tcp4 physique\nbits tcp5 physique\ninternet tcp4 internet\ninternet tcp5 internet\n', expected: 'bits : ABSENT\nbits : OK\ninternet : OK\ninternet : OK\nconformes : 3/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r element modele couche
  if [ "$modele" = "tcp4" ] && [ "$couche" = "physique" ]; then
    echo "$element : ABSENT"
  else
    echo "$element : OK"
    ok=$((ok + 1))
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'cc-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Les sept couches OSI',
    goal: 'Placer chaque unité de données dans sa couche OSI, du bit (1) à la donnée applicative (7).',
    brief: '<p>Le script lit <strong>n lignes</strong> « unite couche » : couche est un numéro de 1 à 7. ' +
      'Correspondances du support : bits (1), trame (2), paquet (3), segment (4), donnée de session ' +
      '(5), donnée codée (6), donnée applicative (7). Pour chaque ligne il affiche ' +
      '<code>unite : couche N</code> — ou <code>unite : NON</code> quand l\'unité ne correspond pas à ' +
      'la couche annoncée — puis <code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r unite couche
  # À compléter : l'unité appartient-elle à la couche ?
done
# À compléter : le bilan.
`,
    hints: [
      'bits=1, trame=2, paquet=3, segment=4, session=5, codage=6, appli=7.',
      'Le numéro affiché est celui de la couche attendue.'
    ],
    examples: [
      { stdin: '3\nbits 1\ntrame 3\npaquet 3\n', expected: 'bits : couche 1\ntrame : NON\npaquet : couche 3\njustes : 2/3' }
    ],
    tests: [
      { label: 'Les sept', stdin: '7\nbits 1\ntrame 2\npaquet 3\nsegment 4\nsession 5\ncodage 6\nappli 7\n', expected: 'bits : couche 1\ntrame : couche 2\npaquet : couche 3\nsegment : couche 4\nsession : couche 5\ncodage : couche 6\nappli : couche 7\njustes : 7/7' },
      { label: 'Trois erreurs', stdin: '3\ntrame 1\npaquet 2\nsegment 3\n', expected: 'trame : NON\npaquet : NON\nsegment : NON\njustes : 0/3' },
      { label: 'Basse et haute', stdin: '2\nbits 1\nappli 7\n', expected: 'bits : couche 1\nappli : couche 7\njustes : 2/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r unite couche
  case "$unite" in
    bits) attendu=1 ;;
    trame) attendu=2 ;;
    paquet) attendu=3 ;;
    segment) attendu=4 ;;
    session) attendu=5 ;;
    codage) attendu=6 ;;
    appli) attendu=7 ;;
  esac
  if [ "$couche" = "$attendu" ]; then
    echo "$unite : couche $attendu"
    ok=$((ok + 1))
  else
    echo "$unite : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'cc-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Qui fait quoi entre OSI et TCP/IP',
    goal: 'Relier chaque tâche au modèle qui la porte : OSI 7 couches (référentiel) ou TCP/IP 5 couches (actualité).',
    brief: '<p>Le script lit <strong>n lignes</strong> « tache modele » : modele est un code parmi ' +
      '<code>osi</code> ou <code>tcp5</code>. Tâches du référentiel OSI : <code>codage</code> (couche 6), ' +
      '<code>session</code> (couche 5). Tâches du modèle d\'actualité TCP/IP 5 couches : ' +
      '<code>routage</code> (internet), <code>ports</code> (transport), <code>cables</code> (physique). ' +
      'Pour chaque ligne il affiche <code>tache : conforme</code> ou <code>tache : a revoir</code>, puis ' +
      '<code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r tache modele
  # À compléter : conforme ou à revoir ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'codage et session → OSI ; routage, ports, cables → TCP/IP 5 couches.',
      'Le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '2\ncodage osi\nroutage osi\n', expected: 'codage : conforme\nroutage : a revoir\nconformes : 1/2' }
    ],
    tests: [
      { label: 'Le référentiel', stdin: '2\ncodage osi\nsession osi\n', expected: 'codage : conforme\nsession : conforme\nconformes : 2/2' },
      { label: 'L\'actualité', stdin: '3\nroutage tcp5\nports tcp5\ncables tcp5\n', expected: 'routage : conforme\nports : conforme\ncables : conforme\nconformes : 3/3' },
      { label: 'Tout inversé', stdin: '2\nports osi\nsession tcp5\n', expected: 'ports : a revoir\nsession : a revoir\nconformes : 0/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r tache modele
  case "$tache" in
    codage|session) attendu="osi" ;;
    routage|ports|cables) attendu="tcp5" ;;
  esac
  if [ "$modele" = "$attendu" ]; then
    echo "$tache : conforme"
    ok=$((ok + 1))
  else
    echo "$tache : a revoir"
  fi
done
echo "conformes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Les réseaux locaux Ethernet
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cc-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Trame Ethernet : compter les octets',
    goal: 'Valider la taille des champs d\'une trame Ethernet 802.3 (en-tête, données, FCS).',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « champ octets » ' +
      'où octets est la taille annoncée. Champs du support : préambule 7, SFD 1, MAC destination 6, ' +
      'MAC source 6, type 2, données 46 à 1500, FCS 4. Pour chaque ligne il affiche ' +
      '<code>champ : OK</code> quand la taille annoncée est juste, sinon ' +
      '<code>champ : KO (attendu X)</code>. Il termine par <code>champs justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r champ octets
  # À compléter : la taille annoncée est-elle juste ?
done
# À compléter : le bilan.
`,
    hints: [
      'Préambule 7, SFD 1, destination 6, source 6, type 2, FCS 4 ; données entre 46 et 1500.',
      'En cas d\'erreur, affiche la taille attendue entre parenthèses.'
    ],
    examples: [
      { stdin: '3\ndestination 6\ntype 4\nfcs 4\n', expected: 'destination : OK\ntype : KO (attendu 2)\nfcs : OK\nchamps justes : 2/3' }
    ],
    tests: [
      { label: 'En-tête complet', stdin: '5\npreamble 7\nsfd 1\ndestination 6\nsource 6\ntype 2\n', expected: 'preamble : OK\nsfd : OK\ndestination : OK\nsource : OK\ntype : OK\nchamps justes : 5/5' },
      { label: 'Données bornées', stdin: '3\ndonnees 46\ndonnees 1500\ndonnees 1501\n', expected: 'donnees : OK\ndonnees : OK\ndonnees : KO (attendu 46-1500)\nchamps justes : 2/3' },
      { label: 'FCS faussé', stdin: '2\nfcs 2\npreamble 7\n', expected: 'fcs : KO (attendu 4)\npreamble : OK\nchamps justes : 1/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r champ octets
  case "$champ" in
    preamble) attendu=7 ;;
    sfd) attendu=1 ;;
    destination|source) attendu=6 ;;
    type) attendu=2 ;;
    fcs) attendu=4 ;;
    donnees)
      if [ "$octets" -ge 46 ] && [ "$octets" -le 1500 ]; then
        echo "$champ : OK"
        ok=$((ok + 1))
      else
        echo "$champ : KO (attendu 46-1500)"
      fi
      continue
      ;;
  esac
  if [ "$octets" = "$attendu" ]; then
    echo "$champ : OK"
    ok=$((ok + 1))
  else
    echo "$champ : KO (attendu $attendu)"
  fi
done
echo "champs justes : $ok/$n"
`
  },
  {
    id: 'cc-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'SOHO ou entreprise',
    goal: 'Distinguer le réseau local SOHO du réseau local d\'entreprise selon l\'équipement décrit.',
    brief: '<p>Le script lit <strong>n lignes</strong> « reseau usage » : usage est un code parmi ' +
      '<code>soho</code> ou <code>entreprise</code>. Réseau <strong>SOHO</strong> : un seul commutateur ' +
      'pour tous les postes, ou un « routeur sans fil » unique qui fait tout. Réseau ' +
      '<strong>d\'entreprise</strong> : un commutateur par étage dans la salle technique, point d\'accès ' +
      'par étage. Pour chaque ligne il affiche <code>reseau : conforme</code> ou ' +
      '<code>reseau : a revoir</code>, puis <code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r reseau usage
  # À compléter : conforme ou à revoir ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Un seul appareil qui fait tout → SOHO ; un commutateur par étage → entreprise.',
      'Un case par usage donne la famille attendue.'
    ],
    examples: [
      { stdin: '2\ndomicile soho\netage1 soho\n', expected: 'domicile : conforme\netage1 : a revoir\nconformes : 1/2' }
    ],
    tests: [
      { label: 'La maison', stdin: '2\ndomicile soho\nappartement soho\n', expected: 'domicile : conforme\nappartement : conforme\nconformes : 2/2' },
      { label: 'La tour', stdin: '3\netage1 entreprise\netage2 entreprise\netage3 entreprise\n', expected: 'etage1 : conforme\netage2 : conforme\netage3 : conforme\nconformes : 3/3' },
      { label: 'Inversé', stdin: '2\netage1 soho\ndomicile entreprise\n', expected: 'etage1 : a revoir\ndomicile : a revoir\nconformes : 0/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r reseau usage
  case "$reseau" in
    domicile|appartement) attendu="soho" ;;
    etage1|etage2|etage3) attendu="entreprise" ;;
  esac
  if [ "$usage" = "$attendu" ]; then
    echo "$reseau : conforme"
    ok=$((ok + 1))
  else
    echo "$reseau : a revoir"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'cc-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Duplex intégral : le chemin de la trame',
    goal: 'Reproduire le chemin d\'une trame Ethernet dans un LAN moderne à commutateurs (duplex intégral).',
    brief: '<p>Le script lit <strong>n lignes</strong> « etape action » : etape est un code parmi ' +
      '<code>pc1</code>, <code>sw1</code>, <code>sw2</code> ou <code>pc2</code> et action un code parmi ' +
      '<code>construit</code>, <code>relais</code>, <code>livre</code> ou ' +
      '<code>reconnait</code>. Chemin du support : PC1 construit et envoie la trame, SW1 relaie de G0/1 ' +
      'vers SW2, SW2 livre de F0/2 vers PC2, PC2 reconnaît sa MAC et traite. Pour chaque ligne il ' +
      'affiche <code>etape : OUI</code> quand le couple est juste, sinon <code>etape : NON</code>, puis ' +
      '<code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r etape action
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Les quatre couples : pc1-construit, sw1-relais, sw2-livre, pc2-reconnait.',
      'Le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '4\npc1 construit\nsw1 relais\nsw2 livre\npc2 livre\n', expected: 'pc1 : OUI\nsw1 : OUI\nsw2 : OUI\npc2 : NON\njustes : 3/4' }
    ],
    tests: [
      { label: 'Chemin complet', stdin: '4\npc1 construit\nsw1 relais\nsw2 livre\npc2 reconnait\n', expected: 'pc1 : OUI\nsw1 : OUI\nsw2 : OUI\npc2 : OUI\njustes : 4/4' },
      { label: 'Trame perdue', stdin: '3\nsw1 construit\npc1 relais\npc2 reconnait\n', expected: 'sw1 : NON\npc1 : NON\npc2 : OUI\njustes : 1/3' },
      { label: 'Départ et arrivée', stdin: '2\npc1 construit\npc2 reconnait\n', expected: 'pc1 : OUI\npc2 : OUI\njustes : 2/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r etape action
  case "$etape" in
    pc1) attendu="construit" ;;
    sw1) attendu="relais" ;;
    sw2) attendu="livre" ;;
    pc2) attendu="reconnait" ;;
  esac
  if [ "$action" = "$attendu" ]; then
    echo "$etape : OUI"
    ok=$((ok + 1))
  else
    echo "$etape : NON"
  fi
done
echo "justes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — WAN et routage IP
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cc-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Même sous-réseau ou routé',
    goal: 'Appliquer les deux règles d\'or du sous-réseautage : séparés par un routeur ou non.',
    brief: '<p>Le script lit <strong>n lignes</strong> « couple verdict » : couple est un code de liaison ' +
      'et verdict un code parmi <code>memegroupe</code> ou <code>groupesdifferents</code>. Règles du ' +
      'support : deux adresses <strong>non séparées</strong> par un routeur appartiennent au <em>même ' +
      'groupe</em> (sous-réseau) ; deux adresses <strong>séparées</strong> par au moins un routeur ' +
      'appartiennent à des <em>groupes différents</em>. Couples du support : <code>mmelAN</code> et ' +
      '<code>mmelRouteur</code> (même LAN, avec ou sans routeur entre les deux). Pour chaque ligne il ' +
      'affiche <code>couple : conforme</code> ou <code>couple : a revoir</code>, puis ' +
      '<code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r couple verdict
  # À compléter : conforme ou à revoir ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'mmelAN → memegroupe ; mmelRouteur → groupesdifferents.',
      'Un case par couple donne le verdict attendu.'
    ],
    examples: [
      { stdin: '2\nmmelAN memegroupe\nmmelAN groupesdifferents\n', expected: 'mmelAN : conforme\nmmelAN : a revoir\nconformes : 1/2' }
    ],
    tests: [
      { label: 'Les deux règles', stdin: '2\nmmelAN memegroupe\nmmelRouteur groupesdifferents\n', expected: 'mmelAN : conforme\nmmelRouteur : conforme\nconformes : 2/2' },
      { label: 'Inversées', stdin: '2\nmmelAN groupesdifferents\nmmelRouteur memegroupe\n', expected: 'mmelAN : a revoir\nmmelRouteur : a revoir\nconformes : 0/2' },
      { label: 'Série mixte', stdin: '3\nmmelRouteur groupesdifferents\nmmelAN memegroupe\nmmelRouteur memegroupe\n', expected: 'mmelRouteur : conforme\nmmelAN : conforme\nmmelRouteur : a revoir\nconformes : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r couple verdict
  case "$couple" in
    mmelAN) attendu="memegroupe" ;;
    mmelRouteur) attendu="groupesdifferents" ;;
  esac
  if [ "$verdict" = "$attendu" ]; then
    echo "$couple : conforme"
    ok=$((ok + 1))
  else
    echo "$couple : a revoir"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'cc-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Les quatre étapes du routage',
    goal: 'Dérouler la logique interne du routeur : FCS, désencapsulation, table de routage, réencapsulation.',
    brief: '<p>Le script lit <strong>n lignes</strong> « etape action » : etape est un numéro de 1 à 4 et ' +
      'action un code parmi <code>fcs</code>, <code>desencapsule</code>, <code>table</code> ou ' +
      '<code>encapsule</code>. Les quatre étapes du support : 1 vérifier le FCS (jeter si erreur), 2 ' +
      'supprimer l\'ancien en-tête de liaison de données, 3 chercher la meilleure route pour l\'IP de ' +
      'destination, 4 encapsuler dans un nouvel en-tête et transmettre. Pour chaque ligne il affiche ' +
      '<code>etape N : OUI</code> quand le couple est juste, sinon <code>etape N : NON</code>, puis ' +
      '<code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r etape action
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      '1-fcs, 2-desencapsule, 3-table, 4-encapsule : l\'ordre du support.',
      'Le numéro affiché est celui de l\'étape.'
    ],
    examples: [
      { stdin: '3\n1 fcs\n2 desencapsule\n4 encapsule\n', expected: 'etape 1 : OUI\netape 2 : OUI\netape 4 : OUI\njustes : 3/3' }
    ],
    tests: [
      { label: 'Ordre parfait', stdin: '4\n1 fcs\n2 desencapsule\n3 table\n4 encapsule\n', expected: 'etape 1 : OUI\netape 2 : OUI\netape 3 : OUI\netape 4 : OUI\njustes : 4/4' },
      { label: 'Permutation', stdin: '3\n1 table\n2 desencapsule\n3 fcs\n', expected: 'etape 1 : NON\netape 2 : OUI\netape 3 : NON\njustes : 1/3' },
      { label: 'Milieu juste', stdin: '2\n2 desencapsule\n3 table\n', expected: 'etape 2 : OUI\netape 3 : OUI\njustes : 2/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r etape action
  case "$etape" in
    1) attendu="fcs" ;;
    2) attendu="desencapsule" ;;
    3) attendu="table" ;;
    4) attendu="encapsule" ;;
  esac
  if [ "$action" = "$attendu" ]; then
    echo "etape $etape : OUI"
    ok=$((ok + 1))
  else
    echo "etape $etape : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'cc-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Les trois protocoles de routage apprennent',
    goal: 'Simuler l\'apprentissage des routes par protocole de routage : connexes, annonces, métrique.',
    brief: '<p>Le script lit d\'abord <strong>n</strong> (nombre de routeurs R1..Rn), puis ' +
      '<strong>n lignes</strong> « routeur sousreseau » annoncés dans l\'ordre de propagation (le ' +
      'dernier routeur est connecté au sous-réseau, les annonces remontent vers le premier). Le ' +
      'protocole de routage suit trois étapes du support : chaque routeur ajoute d\'abord ses routes ' +
      '<em>connectées</em>, les voisins s\'annoncent leurs routes, la meilleure route (métrique) entre ' +
      'dans la table. Le script affiche pour chaque routeur (du dernier vers le premier) ' +
      '<code>routeur : apprend sousreseau</code>, puis <code>routes apprises : n</code>.</p>',
    starter: `read -r n
for ((i=n; i>=1; i--)); do
  read -r routeur sousreseau
  # À compléter : annoncer dans l'ordre inverse.
done
# À compléter : le total.
`,
    hints: [
      'Les annonces remontent du routeur connecté (dernier lu) vers le premier.',
      'Chaque routeur du chemin apprend exactement une route.'
    ],
    examples: [
      { stdin: '3\nR1 150.150.4.0\nR2 150.150.4.0\nR3 150.150.4.0\n', expected: 'R3 : apprend 150.150.4.0\nR2 : apprend 150.150.4.0\nR1 : apprend 150.150.4.0\nroutes apprises : 3' }
    ],
    tests: [
      { label: 'Deux routeurs', stdin: '2\nR1 10.0.0.0\nR2 10.0.0.0\n', expected: 'R2 : apprend 10.0.0.0\nR1 : apprend 10.0.0.0\nroutes apprises : 2' },
      { label: 'Cinq routeurs', stdin: '5\nR1 172.16.0.0\nR2 172.16.0.0\nR3 172.16.0.0\nR4 172.16.0.0\nR5 172.16.0.0\n', expected: 'R5 : apprend 172.16.0.0\nR4 : apprend 172.16.0.0\nR3 : apprend 172.16.0.0\nR2 : apprend 172.16.0.0\nR1 : apprend 172.16.0.0\nroutes apprises : 5' },
      { label: 'Un seul', stdin: '1\nR1 192.168.1.0\n', expected: 'R1 : apprend 192.168.1.0\nroutes apprises : 1' }
    ],
    solution: `read -r n
declare -A routeurs
declare -A sousreseaux
for ((i=1; i<=n; i++)); do
  read -r routeur sousreseau
  routeurs[\$i]=\$routeur
  sousreseaux[\$i]=\$sousreseau
done
for ((i=n; i>=1; i--)); do
  echo "\${routeurs[\$i]} : apprend \${sousreseaux[\$i]}"
done
echo "routes apprises : \$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — L'interface en ligne de commande
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cc-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Les trois modes de la CLI',
    goal: 'Valider l\'escalade des modes Cisco : user, enable, configuration — et le retour avec exit.',
    brief: '<p>Le script lit <strong>n lignes</strong> « commande modeattendu » : commande est un code ' +
      'parmi <code>enable</code>, <code>configure</code>, <code>exit</code> ou ' +
      '<code>showversion</code> ; modeattendu est un code parmi <code>user</code>, ' +
      '<code>enable</code> ou <code>config</code>. Règles du support : <code>enable</code> fait passer de ' +
      'user à enable ; <code>configure</code> (terminal) fait passer d\'enable à config ; ' +
      '<code>exit</code> redescend d\'un mode ; <code>showversion</code> s\'exécute en user (non ' +
      'perturbant). Pour chaque ligne il affiche <code>commande : OK</code> si le mode annoncé est ' +
      'cohérent, sinon <code>commande : REFUSE</code>, puis <code>valides : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r commande modeattendu
  # À compléter : valider le couple, compter.
done
# À compléter : le bilan.
`,
    hints: [
      'enable→enable (depuis user), configure→config, exit→tous les modes (redescend), showversion→user.',
      'Un case par commande donne le mode attendu.'
    ],
    examples: [
      { stdin: '3\nenable enable\nconfigure config\nshowversion enable\n', expected: 'enable : OK\nconfigure : OK\nshowversion : REFUSE\nvalides : 2/3' }
    ],
    tests: [
      { label: 'Escalade complète', stdin: '3\nenable enable\nconfigure config\nexit enable\n', expected: 'enable : OK\nconfigure : OK\nexit : OK\nvalides : 3/3' },
      { label: 'Commandes interdites', stdin: '2\nreload user\nconfigure user\n', expected: 'reload : REFUSE\nconfigure : REFUSE\nvalides : 0/2' },
      { label: 'Série mixte', stdin: '3\nshowversion user\nenable user\nexit config\n', expected: 'showversion : OK\nenable : REFUSE\nexit : OK\nvalides : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r commande modeattendu
  case "$commande" in
    enable) attendu="enable" ;;
    configure) attendu="config" ;;
    exit) ok=$((ok + 1)) ; echo "$commande : OK" ; continue ;;
    showversion) attendu="user" ;;
    reload) attendu="enable" ;;
  esac
  if [ "$modeattendu" = "$attendu" ]; then
    echo "$commande : OK"
    ok=$((ok + 1))
  else
    echo "$commande : REFUSE"
  fi
done
echo "valides : $ok/$n"
`
  },
  {
    id: 'cc-c5-e2',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Console, Telnet ou SSH',
    goal: 'Comparer les trois accès à la CLI : câble console (physique), Telnet (clair), SSH (chiffré).',
    brief: '<p>Le script lit <strong>n lignes</strong> « acces propriete » : acces est un code parmi ' +
      '<code>console</code>, <code>telnet</code> ou <code>ssh</code> et propriete un code parmi ' +
      '<code>physique</code>, <code>clair</code> ou <code>chiffre</code>. Couples du support : la console ' +
      'exige une connexion <em>physique</em> ; Telnet transmet en <em>clair</em> (y compris les mots de ' +
      'passe) ; SSH <em>chiffre</em> toutes les données. Pour chaque ligne il affiche ' +
      '<code>acces : OUI</code> quand le couple est juste, sinon <code>acces : NON</code>, puis ' +
      '<code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r acces propriete
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Les trois couples : console-physique, telnet-clair, ssh-chiffre.',
      'SSH est le seul accès chiffré ; Telnet le seul en clair.'
    ],
    examples: [
      { stdin: '3\nconsole physique\ntelnet clair\nssh clair\n', expected: 'console : OUI\ntelnet : OUI\nssh : NON\njustes : 2/3' }
    ],
    tests: [
      { label: 'Les trois', stdin: '3\nconsole physique\ntelnet clair\nssh chiffre\n', expected: 'console : OUI\ntelnet : OUI\nssh : OUI\njustes : 3/3' },
      { label: 'Confusions', stdin: '2\nssh clair\ntelnet chiffre\n', expected: 'ssh : NON\ntelnet : NON\njustes : 0/2' },
      { label: 'Console seule', stdin: '2\nconsole physique\nconsole chiffre\n', expected: 'console : OUI\nconsole : NON\njustes : 1/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r acces propriete
  case "$acces" in
    console) attendu="physique" ;;
    telnet) attendu="clair" ;;
    ssh) attendu="chiffre" ;;
  esac
  if [ "$propriete" = "$attendu" ]; then
    echo "$acces : OUI"
    ok=$((ok + 1))
  else
    echo "$acces : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'cc-c5-e3',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'RAM, NVRAM, flash et ROM',
    goal: 'Placer les fichiers et programmes du commutateur dans les quatre mémoires Cisco.',
    brief: '<p>Le script lit <strong>n lignes</strong> « fichier memoire » : memoire est un code parmi ' +
      '<code>ram</code>, <code>nvram</code>, <code>flash</code> ou <code>rom</code>. Placements du ' +
      'support : <strong>running-config</strong> vit en RAM (perdue à l\'extinction), ' +
      '<strong>startup-config</strong> en NVRAM (conservée), l\'<strong>IOS</strong> en flash, le ' +
      '<strong>bootstrap</strong> (programme d\'amorçage) en ROM. Pour chaque ligne il affiche ' +
      '<code>fichier : OK</code> quand le placement est juste, sinon <code>fichier : KO (attendu X)</code>, ' +
      'puis <code>placements justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r fichier memoire
  # À compléter : le placement est-il juste ?
done
# À compléter : le bilan.
`,
    hints: [
      'running-config → ram ; startup-config → nvram ; ios → flash ; bootstrap → rom.',
      'En cas d\'erreur, affiche la mémoire attendue entre parenthèses.'
    ],
    examples: [
      { stdin: '3\nrunning-config ram\nstartup-config ram\nios flash\n', expected: 'running-config : OK\nstartup-config : KO (attendu nvram)\nios : OK\nplacements justes : 2/3' }
    ],
    tests: [
      { label: 'Tout en place', stdin: '4\nrunning-config ram\nstartup-config nvram\nios flash\nbootstrap rom\n', expected: 'running-config : OK\nstartup-config : OK\nios : OK\nbootstrap : OK\nplacements justes : 4/4' },
      { label: 'Confusions classiques', stdin: '2\nstartup-config flash\nios nvram\n', expected: 'startup-config : KO (attendu nvram)\nios : KO (attendu flash)\nplacements justes : 0/2' },
      { label: 'RAM volatile', stdin: '2\nrunning-config ram\nrunning-config nvram\n', expected: 'running-config : OK\nrunning-config : KO (attendu ram)\nplacements justes : 1/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r fichier memoire
  case "$fichier" in
    running-config) attendu="ram" ;;
    startup-config) attendu="nvram" ;;
    ios) attendu="flash" ;;
    bootstrap) attendu="rom" ;;
  esac
  if [ "$memoire" = "$attendu" ]; then
    echo "$fichier : OK"
    ok=$((ok + 1))
  else
    echo "$fichier : KO (attendu $attendu)"
  fi
done
echo "placements justes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Configuration de base du commutateur
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cc-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Sécuriser les accès',
    goal: 'Associer chaque protection de la CLI à sa commande de configuration.',
    brief: '<p>Le script lit <strong>n lignes</strong> « protection commande » : commande est un code ' +
      'parmi <code>passwordlogin</code> (mot de passe simple + login), <code>loginlocal</code> ' +
      '(noms d\'utilisateurs locaux), <code>enablesecret</code> ou <code>transportinput</code>. ' +
      'Protections du support : <code>passwordlogin</code> protège console et vty avec un mot de passe ' +
      'partagé ; <code>loginlocal</code> exige un couple utilisateur/mot de passe local ; ' +
      '<code>enablesecret</code> protège le mode enable ; <code>transportinput</code> choisit les ' +
      'protocoles vty (ssh, telnet, all). Pour chaque ligne il affiche <code>protection : OK</code> ou ' +
      '<code>protection : ERREUR</code>, puis <code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r protection commande
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'passwordlogin → password + login ; loginlocal → login local ; enablesecret → enable secret ; transportinput → transport input.',
      'Le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '2\npasswordlogin passwordlogin\ntransportinput enablesecret\n', expected: 'passwordlogin : OK\ntransportinput : ERREUR\nconformes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre', stdin: '4\npasswordlogin passwordlogin\nloginlocal loginlocal\nenablesecret enablesecret\ntransportinput transportinput\n', expected: 'passwordlogin : OK\nloginlocal : OK\nenablesecret : OK\ntransportinput : OK\nconformes : 4/4' },
      { label: 'Deux erreurs', stdin: '2\nloginlocal passwordlogin\nenablesecret transportinput\n', expected: 'loginlocal : ERREUR\nenablesecret : ERREUR\nconformes : 0/2' },
      { label: 'Série mixte', stdin: '3\nenablesecret enablesecret\npasswordlogin transportinput\ntransportinput transportinput\n', expected: 'enablesecret : OK\npasswordlogin : ERREUR\ntransportinput : OK\nconformes : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r protection commande
  if [ "$protection" = "$commande" ]; then
    echo "$protection : OK"
    ok=$((ok + 1))
  else
    echo "$protection : ERREUR"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'cc-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'IPv4 sur le commutateur',
    goal: 'Dérouler la configuration IPv4 de gestion : SVI, adresse/masque, no shutdown, passerelle.',
    brief: '<p>Le script lit <strong>n lignes</strong> « etape commande » : etape est un numéro de 1 à 5 et ' +
      'commande un code parmi <code>svi</code>, <code>ipaddress</code>, <code>noshutdown</code>, ' +
      '<code>gateway</code> ou <code>nameserver</code>. Étapes du support : 1 <code>interface vlan 1</code> ' +
      '(la SVI), 2 <code>ip address</code> (adresse + masque), 3 <code>no shutdown</code>, 4 ' +
      '<code>ip default-gateway</code> (obligatoire pour parler hors du sous-réseau), 5 ' +
      '<code>ip name-server</code> (facultatif, DNS). Pour chaque ligne il affiche ' +
      '<code>etape N : OK</code> ou <code>etape N : NON</code>, puis <code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r etape commande
  # À compléter : la commande est-elle à sa place ?
done
# À compléter : le bilan.
`,
    hints: [
      '1-svi, 2-ipaddress, 3-noshutdown, 4-gateway, 5-nameserver : l\'ordre du support.',
      'L\'étape 5 est facultative mais garde sa place dans l\'ordre.'
    ],
    examples: [
      { stdin: '3\n1 svi\n2 ipaddress\n4 gateway\n', expected: 'etape 1 : OK\netape 2 : OK\netape 4 : OK\njustes : 3/3' }
    ],
    tests: [
      { label: 'Ordre parfait', stdin: '5\n1 svi\n2 ipaddress\n3 noshutdown\n4 gateway\n5 nameserver\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netape 5 : OK\njustes : 5/5' },
      { label: 'Deux inversions', stdin: '3\n1 svi\n2 gateway\n3 ipaddress\n', expected: 'etape 1 : OK\netape 2 : NON\netape 3 : NON\njustes : 1/3' },
      { label: 'Cœur de config', stdin: '3\n2 ipaddress\n3 noshutdown\n4 gateway\n', expected: 'etape 2 : OK\netape 3 : OK\netape 4 : OK\njustes : 3/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r etape commande
  case "$etape" in
    1) attendu="svi" ;;
    2) attendu="ipaddress" ;;
    3) attendu="noshutdown" ;;
    4) attendu="gateway" ;;
    5) attendu="nameserver" ;;
  esac
  if [ "$commande" = "$attendu" ]; then
    echo "etape $etape : OK"
    ok=$((ok + 1))
  else
    echo "etape $etape : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'cc-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Le confort du laboratoire',
    goal: 'Simuler les trois commandes de confort : logging synchronous, exec-timeout, no ip domain-lookup.',
    brief: '<p>Le script lit d\'abord <strong>n</strong> (nombre de sessions console), puis <strong>n ' +
      'lignes</strong> « session reglages » où reglages est une suite de codes sans espace : ' +
      '<code>s</code> = logging synchronous activé, <code>t</code> = exec-timeout à 0 (jamais déconnecté), ' +
      '<code>d</code> = no ip domain-lookup, le tiret <code>-</code> = aucun réglage. Effets du support : ' +
      'sans <code>s</code>, les messages syslog s\'invitent en pleine saisie ; sans <code>t</code>, la ' +
      'session expire après 5 minutes ; sans <code>d</code>, une commande mal tapée bloque une minute sur ' +
      'une résolution DNS. Pour chaque session il affiche <code>session : fluide</code> si les trois ' +
      'réglages sont présents, sinon <code>session : gene (motif X)</code> où X vaut <code>syslog</code>, ' +
      '<code>timeout</code> ou <code>dns</code> (premier motif manquant dans l\'ordre s, t, d). Il termine ' +
      'par <code>sessions fluides : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r session reglages
  # À compléter : analyser la suite de réglages.
done
# À compléter : le bilan.
`,
    hints: [
      'Parcours la suite caractère par caractère : s, t, d dans cet ordre.',
      'Signale le PREMIER réglage manquant ; le tiret vaut absence de tout réglage.'
    ],
    examples: [
      { stdin: '3\ns1 std\ns2 st\ns3 -\n', expected: 's1 : fluide\ns2 : gene (motif dns)\ns3 : gene (motif syslog)\nsessions fluides : 1/3' }
    ],
    tests: [
      { label: 'Parfaites', stdin: '2\nlab1 std\nlab2 std\n', expected: 'lab1 : fluide\nlab2 : fluide\nsessions fluides : 2/2' },
      { label: 'Sans timeout', stdin: '2\nlab1 sd\nlab2 std\n', expected: 'lab1 : gene (motif timeout)\nlab2 : fluide\nsessions fluides : 1/2' },
      { label: 'Aucun réglage', stdin: '3\nlab1 -\nlab2 d\nlab3 t\n', expected: 'lab1 : gene (motif syslog)\nlab2 : gene (motif syslog)\nlab3 : gene (motif syslog)\nsessions fluides : 0/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r session reglages
  if [ "$reglages" = "-" ]; then
    echo "$session : gene (motif syslog)"
    continue
  fi
  motif=""
  for ((j=0; j<\${#reglages}; j++)); do
    c=\${reglages:$j:1}
    case "$c" in
      s) s=1 ;;
      t) t=1 ;;
      d) d=1 ;;
    esac
  done
  if [ "\${s:-0}" = "0" ]; then motif="syslog"
  elif [ "\${t:-0}" = "0" ]; then motif="timeout"
  elif [ "\${d:-0}" = "0" ]; then motif="dns"
  fi
  if [ -z "$motif" ]; then
    echo "$session : fluide"
    ok=$((ok + 1))
  else
    echo "$session : gene (motif $motif)"
  fi
  unset s t d
done
echo "sessions fluides : $ok/$n"
`
  }
];

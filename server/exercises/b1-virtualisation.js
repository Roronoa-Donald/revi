/**
 * Catalogue des 18 exercices shell du cours « Virtualisation des serveurs » B1,
 * aligné sur le support B1 du module (dossier « cours B1 IT / Virtualisation
 * des serveurs ») : l'histoire « Le serveur fainéant et les machines
 * ambitieuses » et ses questions de compréhension, d'analyse technique et de
 * réflexion — le paresseux à 80 % d'inactivité, le partage de ressources
 * (mémoire, processeur, disque), les services virtualisés (base de données,
 * site web, pare-feu, serveur de test), la rentabilisation à 100 %, et les
 * risques de surcharge quand « trop de machines ambitieuses » s'invitent.
 *
 * Chapitre 1 : le serveur fainéant (gaspillage, constat).
 * Chapitre 2 : la virtualisation et le partage des ressources.
 * Chapitre 3 : les services virtualisés de l'histoire.
 * Chapitre 4 : rentabilisation et dimensionnement.
 * Chapitre 5 : les risques de la surcharge.
 * Chapitre 6 : convaincre le responsable informatique.
 *
 * Conventions : language 'shell', ids 'vt-cN-eM', niveaux n1/n2/n3, entrées
 * stdin mono-mots terminées par \n, exemple distinct des tests cachés.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Le serveur fainéant
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'vt-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Le rapport d’inactivité du serveur',
    goal: 'Classer les heures du serveur : inactif ou utile, selon le seuil des 80 % de l’histoire.',
    brief: '<p>Dans l’histoire, « le serveur passait 80 % de son temps à ne rien faire ». Le script lit ' +
      '<strong>n lignes</strong> « heure inactif » (heures de la journée, inactif en minutes sur ' +
      'l’heure). Une heure est <code>perdue</code> si au moins 48 minutes (80 %) sont inactives, sinon ' +
      '<code>utile</code>. Pour chaque ligne il affiche <code>heure : verdict</code>, puis ' +
      '<code>heures perdues : X/n</code> et <code>inactivite : Y min</code> (somme des minutes ' +
      'd’inactivité).</p>',
    starter: `read -r n
perdues=0
total=0
for ((i=0; i<n; i++)); do
  read -r heure inactif
  # À compléter : verdict au seuil 48, compteurs.
done
# À compléter : les deux bilans.
`,
    hints: [
      '80 % d’une heure = 48 minutes : inactif -ge 48 → perdue, sinon utile.',
      'La somme des minutes progresse dans les deux cas ; les bilans sortent après la boucle.'
    ],
    examples: [
      { stdin: '3\n00h 50\n01h 30\n02h 48\n', expected: '00h : perdue\n01h : utile\n02h : perdue\nheures perdues : 2/3\ninactivite : 128 min' }
    ],
    tests: [
      { label: 'Journée du paresseux', stdin: '4\n08h 55\n09h 40\n10h 48\n11h 12\n', expected: '08h : perdue\n09h : utile\n10h : perdue\n11h : utile\nheures perdues : 2/4\ninactivite : 155 min' },
      { label: 'Serveur très fainéant', stdin: '3\n22h 60\n23h 59\n00h 48\n', expected: '22h : perdue\n23h : perdue\n00h : perdue\nheures perdues : 3/3\ninactivite : 167 min' },
      { label: 'Frontière exacte', stdin: '3\na 47\nb 48\nc 49\n', expected: 'a : utile\nb : perdue\nc : perdue\nheures perdues : 2/3\ninactivite : 144 min' }
    ],
    solution: `read -r n
perdues=0
total=0
for ((i=0; i<n; i++)); do
  read -r heure inactif
  total=$((total + inactif))
  if [ "$inactif" -ge 48 ]; then
    echo "$heure : perdue"
    perdues=$((perdues + 1))
  else
    echo "$heure : utile"
  fi
done
echo "heures perdues : $perdues/$n"
echo "inactivite : $total min"
`
  },
  {
    id: 'vt-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Un service par serveur : le constat',
    goal: 'Compter les serveurs mono-service et calculer le coût du gaspillage.',
    brief: '<p>Dans l’histoire, le serveur fainéant « n’héberge qu’un seul système et un seul service ». Le ' +
      'script lit <strong>n lignes</strong> « serveur services cout » (services hébergés, coût mensuel ' +
      'en francs). Un serveur est <code>faineant</code> s’il héberge moins de 2 services. Pour chaque ' +
      'ligne il affiche <code>serveur : verdict</code> (faineant ou sature si plus de 4 services, sinon ' +
      '<code>equilibre</code>), puis <code>faineants : X</code> et <code>gaspillage : Y FCFA</code> (80 % ' +
      'du coût de chaque fainéant, arrondi à l’entier inférieur).</p>',
    starter: `read -r n
f=0
gaspillage=0
for ((i=0; i<n; i++)); do
  read -r serveur services cout
  # À compléter : verdict selon les services, coût du gaspillage des fainéants.
done
# À compléter : les deux bilans.
`,
    hints: [
      'Trois cas : services -lt 2 → faineant ; services -gt 4 → sature ; sinon equilibre.',
      'Le gaspillage d’un fainéant : cout * 80 / 100 (division entière bash = arrondi inférieur).'
    ],
    examples: [
      { stdin: '3\nweb1 1 100000\nbd1 3 200000\ntest1 1 50000\n', expected: 'web1 : faineant\nbd1 : equilibre\ntest1 : faineant\nfaineants : 2\ngaspillage : 120000 FCFA' }
    ],
    tests: [
      { label: 'Salle serveur', stdin: '4\nsrv1 1 80000\nsrv2 5 300000\nsrv3 3 150000\nsrv4 1 100000\n', expected: 'srv1 : faineant\nsrv2 : sature\nsrv3 : equilibre\nsrv4 : faineant\nfaineants : 2\ngaspillage : 144000 FCFA' },
      { label: 'Que du farniente', stdin: '3\na 1 50000\nb 1 50000\nc 1 50000\n', expected: 'a : faineant\nb : faineant\nc : faineant\nfaineants : 3\ngaspillage : 120000 FCFA' },
      { label: 'Frontières', stdin: '4\na 0 100000\nb 1 100000\nc 4 100000\nd 5 100000\n', expected: 'a : faineant\nb : faineant\nc : equilibre\nd : sature\nfaineants : 2\ngaspillage : 160000 FCFA' }
    ],
    solution: `read -r n
f=0
gaspillage=0
for ((i=0; i<n; i++)); do
  read -r serveur services cout
  if [ "$services" -lt 2 ]; then
    echo "$serveur : faineant"
    f=$((f + 1))
    gaspillage=$((gaspillage + cout * 80 / 100))
  elif [ "$services" -gt 4 ]; then
    echo "$serveur : sature"
  else
    echo "$serveur : equilibre"
  fi
done
echo "faineants : $f"
echo "gaspillage : $gaspillage FCFA"
`
  },
  {
    id: 'vt-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Le serveur se plaint : facture d’électricité',
    goal: 'Relier l’inactivité à la facture : « il mangeait de l’électricité pour rien ».',
    brief: '<p>L’histoire dit du serveur qu’il « mangeait de l’électricité pour rien ». Le script lit ' +
      '<strong>n lignes</strong> « serveur watt heures » : consommation en watts, heures de marche du ' +
      'mois. L’énergie consommée vaut watt × heures / 1000 (kWh) ; à 100 francs le kWh, le script ' +
      'affiche pour chaque serveur <code>serveur : X kWh — Y FCFA</code> (nombres entiers), puis ' +
      '<code>facture : Z FCFA</code> (somme) et <code>gaspille : W FCFA</code> (part des serveurs à plus ' +
      'de 700 kWh, 80 % de leur facture).</p>',
    starter: `read -r n
facture=0
gaspille=0
for ((i=0; i<n; i++)); do
  read -r serveur watt heures
  # À compléter : kWh, coût, bilans, part gaspillée.
done
# À compléter : les deux bilans.
`,
    hints: [
      'kWh = watt * heures / 1000 (division entière) ; coût = kWh * 100.',
      'Serveur à plus de 700 kWh : sa part gaspillée vaut cout * 80 / 100, à ajouter au total.'
    ],
    examples: [
      { stdin: '2\nparesseux 500 720\nactif 400 600\n', expected: 'paresseux : 360 kWh — 36000 FCFA\nactif : 240 kWh — 24000 FCFA\nfacture : 60000 FCFA\ngaspille : 0 FCFA' }
    ],
    tests: [
      { label: 'Trois serveurs', stdin: '3\na 1000 500\nb 500 800\nc 750 1000\n', expected: 'a : 500 kWh — 50000 FCFA\nb : 400 kWh — 40000 FCFA\nc : 750 kWh — 75000 FCFA\nfacture : 165000 FCFA\ngaspille : 60000 FCFA' },
      { label: 'Aucun gros consommateur', stdin: '2\na 300 720\nb 200 720\n', expected: 'a : 216 kWh — 21600 FCFA\nb : 144 kWh — 14400 FCFA\nfacture : 36000 FCFA\ngaspille : 0 FCFA' },
      { label: 'Seuil exact', stdin: '2\na 700 1000\nb 701 1000\n', expected: 'a : 700 kWh — 70000 FCFA\nb : 701 kWh — 70100 FCFA\nfacture : 140100 FCFA\ngaspille : 56080 FCFA' }
    ],
    solution: `read -r n
facture=0
gaspille=0
for ((i=0; i<n; i++)); do
  read -r serveur watt heures
  kwh=$((watt * heures / 1000))
  cout=$((kwh * 100))
  facture=$((facture + cout))
  if [ "$kwh" -gt 700 ]; then
    gaspille=$((gaspille + cout * 80 / 100))
  fi
  echo "$serveur : $kwh kWh — $cout FCFA"
done
echo "facture : $facture FCFA"
echo "gaspille : $gaspille FCFA"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — La virtualisation et le partage des ressources
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'vt-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Ce que partagent les machines virtuelles',
    goal: 'Associer chaque ressource de l’histoire à sa mise en commun.',
    brief: '<p>Les VM de l’histoire promettent : « on va se partager ta mémoire, ton processeur et même ' +
      'ton disque dur ». Le script lit <strong>n lignes</strong> « ressource partage » : partage est un ' +
      'code parmi <code>vive</code> (mémoire), <code>calcul</code> (processeur), <code>stockage</code> ' +
      '(disque) ou <code>pas-partage</code> (ressource qui reste propre à chaque machine, comme la ' +
      'carte réseau dédiée d’une VM configurée ainsi). Pour chaque ligne il affiche <code>ressource : ' +
      'OK</code> ou <code>ressource : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r ressource partage
  # À compléter : le partage attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la ressource : memoire → vive, processeur → calcul, disque → stockage, reseau-dediee → pas-partage.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nmemoire vive\nprocesseur calcul\ndisque stockage\n', expected: 'memoire : OK\nprocesseur : OK\ndisque : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Les trois ressources', stdin: '4\nmemoire vive\nprocesseur calcul\ndisque stockage\nreseau-dediee pas-partage\n', expected: 'memoire : OK\nprocesseur : OK\ndisque : OK\nreseau-dediee : OK\ncorrectes : 4/4' },
      { label: 'Trois confusions', stdin: '4\nmemoire calcul\ndisque vive\nprocesseur stockage\nreseau-dediee pas-partage\n', expected: 'memoire : ERREUR\ndisque : ERREUR\nprocesseur : ERREUR\nreseau-dediee : OK\ncorrectes : 1/4' },
      { label: 'Fiche de révision', stdin: '4\ndisque stockage\nprocesseur calcul\nreseau-dediee pas-partage\nmemoire vive\n', expected: 'disk-memoire : OK\nprocesseur : OK\nreseau-dediee : OK\nmemoire : OK\ncorrectes : 4/4'.replace('disk-memoire', 'disque') }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r ressource partage
  case "$ressource" in
    memoire) attendu="vive" ;;
    processeur) attendu="calcul" ;;
    disque) attendu="stockage" ;;
    reseau-dediee) attendu="pas-partage" ;;
  esac
  if [ "$partage" = "$attendu" ]; then
    echo "$ressource : OK"
    ok=$((ok + 1))
  else
    echo "$ressource : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'vt-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: '« On ne prendra que ce dont on a besoin »',
    goal: 'Allouer les ressources demandées sans dépasser la capacité du serveur.',
    brief: '<p>La promesse des VM : « on ne prendra chacun que ce dont on a besoin ». Le script lit ' +
      'd’abord une ligne <code>ram disque</code> : la capacité du serveur (Go). Puis <strong>n ' +
      'lignes</strong> « vm ram disque » : les demandes. Pour chaque VM il affiche <code>vm : allouee</code> ' +
      'si la demande tient dans le <strong>reste</strong> disponible, sinon <code>vm : refusee</code> — ' +
      'et la ressource refusée n’est pas consommée. Enfin <code>allouees : X/n</code> et ' +
      '<code>reste : R ram D disque</code>.</p>',
    starter: `read -r ram disque
ok=0
for ((i=0; i<n; i++)); do
  read -r vm r d
  # À compléter : contrôler ram puis disque, allouer si possible.
done
read -r n
# Attention : l'ordre des lectures est à organiser — n se lit en premier !
`,
    hints: [
      'Lire n AVANT la capacité : l’ordre du format est n, puis « ram disque », puis les VM.',
      'Deux conditions en ET : r <= reste_ram et d <= reste_disque ; sinon refusee sans toucher aux restes.'
    ],
    examples: [
      { stdin: '3\n64 500\nweb 16 50\nbd 32 200\ntest 32 400\n', expected: 'web : allouee\nbd : allouee\ntest : refusee\nallouees : 2/3\nreste : 16 ram 250 disque' }
    ],
    tests: [
      { label: 'Parc réaliste', stdin: '4\n128 1000\nweb 16 50\nbd 64 300\nfeu 8 20\ntest 64 700\n', expected: 'web : allouee\nbd : allouee\nfeu : allouee\ntest : refusee\nallouees : 3/4\nreste : 40 ram 630 disque' },
      { label: 'Serveur petit', stdin: '3\n16 100\na 16 50\nb 1 60\nc 1 1\n', expected: 'a : allouee\nb : refusee\nc : refusee\nallouees : 1/3\nreste : 0 ram 50 disque' },
      { label: 'Demandes exactes', stdin: '2\n32 100\na 32 100\nb 0 0\n', expected: 'a : allouee\nb : allouee\nallouees : 2/2\nreste : 0 ram 0 disque' }
    ],
    solution: `read -r n
read -r ram disque
reste_r=$ram
reste_d=$disque
ok=0
for ((i=0; i<n; i++)); do
  read -r vm r d
  if [ "$r" -le "$reste_r" ] && [ "$d" -le "$reste_d" ]; then
    echo "$vm : allouee"
    reste_r=$((reste_r - r))
    reste_d=$((reste_d - d))
    ok=$((ok + 1))
  else
    echo "$vm : refusee"
  fi
done
echo "allouees : $ok/$n"
echo "reste : $reste_r ram $reste_d disque"
`
  },
  {
    id: 'vt-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'Le réveil du serveur : la conversation',
    goal: 'Rejouer la conversation de l’histoire entre l’ingénieur, le serveur et les VM.',
    brief: '<p>Le script lit <strong>n lignes</strong> « acteur replique » : acteur est un code parmi ' +
      '<code>ingenieur</code>, <code>serveur</code> ou <code>vms</code> ; replique est un code parmi ' +
      '<code>idee</code> (proposer la virtualisation), <code>colere</code> (refuser, « vous êtes fous ! »), ' +
      '<code>partage</code> (proposer le partage des ressources) ou <code>accepte</code>. Le scénario de ' +
      'l’histoire fixe l’ordre : ingenieur → idee, serveur → colere, vms → partage, serveur → accepte. ' +
      'Pour chaque ligne il affiche <code>acteur : OK</code> si la réplique est celle de l’histoire à ' +
      'cette étape, sinon <code>acteur : NON</code>, puis <code>fidele : X/n</code>.</p>',
    starter: `for ((i=1; i<=4; i++)); do
  read -r acteur replique
  # À compléter : la réplique attendue selon l'étape, les deux comparaisons.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l’étape : 1 → ingenieur/idee, 2 → serveur/colere, 3 → vms/partage, 4 → serveur/accepte.',
      'Acteur ET réplique doivent être justes en même temps pour un OK.'
    ],
    examples: [
      { stdin: 'ingenieur idee\nserveur colere\nvms partage\nserveur accepte\n', expected: 'ingenieur : OK\nserveur : OK\nvms : OK\nserveur : OK\nfidele : 4/4' }
    ],
    tests: [
      { label: 'Colère inversée', stdin: 'ingenieur idee\nserveur accepte\nvms partage\nserveur colere\n', expected: 'ingenieur : OK\nserveur : NON\nvms : OK\nserveur : NON\nfidele : 2/4' },
      { label: 'Repliques échangées', stdin: 'ingenieur idee\nserveur colere\nvms idee\nserveur accepte\n', expected: 'ingenieur : OK\nserveur : OK\nvms : NON\nserveur : OK\nfidele : 3/4' },
      { label: 'Scénario mélangé', stdin: 'vms partage\ningenieur idee\nserveur colere\nserveur accepte\n', expected: 'vms : NON\ningenieur : NON\nserveur : NON\nserveur : OK\nfidele : 1/4' }
    ],
    solution: `ok=0
for ((i=1; i<=4; i++)); do
  read -r acteur replique
  case "$i" in
    1) attendu_a="ingenieur" ; attendu_r="idee" ;;
    2) attendu_a="serveur" ; attendu_r="colere" ;;
    3) attendu_a="vms" ; attendu_r="partage" ;;
    4) attendu_a="serveur" ; attendu_r="accepte" ;;
  esac
  if [ "$acteur" = "$attendu_a" ] && [ "$replique" = "$attendu_r" ]; then
    echo "$acteur : OK"
    ok=$((ok + 1))
  else
    echo "$acteur : NON"
  fi
done
echo "fidele : $ok/4"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Les services virtualisés
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'vt-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Les services de l’histoire',
    goal: 'Valider les quatre services virtualisés : base, site, pare-feu, test.',
    brief: '<p>L’histoire se termine : le serveur « hébergeait maintenant une base de données, un site web, ' +
      'un pare-feu virtuel et même un serveur de test ». Le script lit <strong>n lignes</strong> « service ' +
      'categorie » : categorie est un code parmi <code>donnees</code> (base de données), ' +
      '<code>publication</code> (site web), <code>protection</code> (pare-feu) ou ' +
      '<code>recette</code> (serveur de test). Pour chaque ligne il affiche <code>service : OK</code> ou ' +
      '<code>service : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r service categorie
  # À compléter : la catégorie attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le service : base → donnees, site → publication, pare-feu → protection, test → recette.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nbase donnees\nsite publication\npare-feu protection\n', expected: 'base : OK\nsite : OK\npare-feu : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Le parc complet', stdin: '4\nbase donnees\nsite publication\npare-feu protection\ntest recette\n', expected: 'base : OK\nsite : OK\npare-feu : OK\ntest : OK\ncorrectes : 4/4' },
      { label: 'Trois confusions', stdin: '4\nbase publication\nsite protection\npare-feu recette\ntest recette\n', expected: 'base : ERREUR\nsite : ERREUR\npare-feu : ERREUR\ntest : OK\ncorrectes : 1/4' },
      { label: 'Ordre mélangé', stdin: '4\ntest recette\npare-feu protection\nsite publication\nbase donnees\n', expected: 'test : OK\npare-feu : OK\nsite : OK\nbase : OK\ncorrectes : 4/4' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r service categorie
  case "$service" in
    base) attendu="donnees" ;;
    site) attendu="publication" ;;
    pare-feu) attendu="protection" ;;
    test) attendu="recette" ;;
  esac
  if [ "$categorie" = "$attendu" ]; then
    echo "$service : OK"
    ok=$((ok + 1))
  else
    echo "$service : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'vt-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Une machine par service : l’inventaire',
    goal: 'Dresser l’inventaire des VM par type de service et compter les catégories.',
    brief: '<p>Le script lit <strong>n lignes</strong> « vm service » puis affiche chaque ligne ' +
      '<code>vm : service</code>. Ensuite, pour chaque service <strong>dans l’ordre de première ' +
      'apparition</strong>, il affiche <code>service : X vm</code>, et enfin <code>services : Y</code> — ' +
      'l’inventaire de ce que le serveur héberge maintenant, comme à la fin de l’histoire.</p>',
    starter: `read -r n
declare -A compte
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r vm service
  echo "$vm : $service"
  # À compléter : nouveau service → ordre ; compteur incrémenté.
done
# À compléter : bilans par service, puis nombre de services.
`,
    hints: [
      'Nouveau service : [ -z "\${compte[$service]+x}" ] → ordre[$g]=$service et g=$((g+1)).',
      'Les bilans sortent après la boucle, dans l’ordre du tableau ordre, puis g.'
    ],
    examples: [
      { stdin: '3\nvm-bd base\nvm-web site\nvm-bd2 base\n', expected: 'vm-bd : base\nvm-web : site\nvm-bd2 : base\nbase : 2 vm\nsite : 1 vm\nservices : 2' }
    ],
    tests: [
      { label: 'Le parc de la fin', stdin: '4\nvm1 base\nvm2 site\nvm3 pare-feu\nvm4 test\n', expected: 'vm1 : base\nvm2 : site\nvm3 : pare-feu\nvm4 : test\nbase : 1 vm\nsite : 1 vm\npare-feu : 1 vm\ntest : 1 vm\nservices : 4' },
      { label: 'Fermes de VM', stdin: '5\nweb1 site\nweb2 site\nbd1 base\nbd2 base\nbd3 base\n', expected: 'web1 : site\nweb2 : site\nbd1 : base\nbd2 : base\nbd3 : base\nsite : 2 vm\nbase : 3 vm\nservices : 2' },
      { label: 'Ordre d’apparition', stdin: '4\na test\nb site\nc test\nd pare-feu\n', expected: 'a : test\nb : site\nc : test\nd : pare-feu\ntest : 2 vm\nsite : 1 vm\npare-feu : 1 vm\nservices : 3' }
    ],
    solution: `read -r n
declare -A compte
declare -A ordre
g=0
for ((i=0; i<n; i++)); do
  read -r vm service
  echo "$vm : $service"
  if [ -z "\${compte[$service]+x}" ]; then
    ordre[$g]=$service
    g=$((g + 1))
  fi
  compte[$service]=$((\${compte[$service]:-0} + 1))
done
for ((i=0; i<g; i++)); do
  service=\${ordre[$i]}
  echo "$service : \${compte[$service]} vm"
done
echo "services : $g"
`
  },
  {
    id: 'vt-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'La charge de chaque service',
    goal: 'Calculer la charge par service et repérer celui qui consomme le plus.',
    brief: '<p>Le script lit <strong>n lignes</strong> « vm service charge » (charge en % CPU), puis ' +
      'affiche pour chaque service <strong>dans l’ordre de première apparition</strong> ' +
      '<code>service : X% de charge</code> (somme des charges), puis <code>service le plus charge : NOM ' +
      '(Y%)</code> — le premier atteignant le maximum gagne, comme au support « on ne prendra chacun que ' +
      'ce dont on a besoin » : au-delà de 70 % cumulés, le service est <code>service : X% de charge ' +
      '(a surveiller)</code>.</p>',
    starter: `read -r n
declare -A charge
declare -A ordre
g=0
max=0
max_nom="-"
for ((i=0; i<n; i++)); do
  read -r vm service c
  # À compléter : somme par service, ordre, maximum au sens strict.
done
# À compléter : bilans (avec a surveiller au-delà de 70) + service le plus chargé.
`,
    hints: [
      'Somme par service dans un tableau ; nouveau service → enregistrer l’ordre (g).',
      'Maximum au sens strict : charge > max → max=charge, max_nom=service (le premier atteignant le max gagne).'
    ],
    examples: [
      { stdin: '4\nvm1 base 40\nvm2 site 30\nvm3 base 20\nvm4 test 5\n', expected: 'base : 60% de charge\nsite : 30% de charge\ntest : 5% de charge\nservice le plus charge : base (60%)' }
    ],
    tests: [
      { label: 'Pare-feu chargé', stdin: '4\nvm1 site 50\nvm2 pare-feu 45\nvm3 site 20\nvm4 base 10\n', expected: 'site : 70% de charge\npare-feu : 45% de charge\nbase : 10% de charge\nservice le plus charge : site (70%)' },
      { label: 'Égalité de charge', stdin: '3\nvm1 base 35\nvm2 site 35\nvm3 test 10\n', expected: 'base : 35% de charge\nsite : 35% de charge\ntest : 10% de charge\nservice le plus charge : base (35%)' },
      { label: 'Un seul service', stdin: '2\nvm1 base 50\nvm2 base 30\n', expected: 'base : 80% de charge (a surveiller)\nservice le plus charge : base (80%)' }
    ],
    solution: `read -r n
declare -A charge
declare -A ordre
g=0
max=-1
max_nom="-"
for ((i=0; i<n; i++)); do
  read -r vm service c
  if [ -z "\${charge[$service]+x}" ]; then
    ordre[$g]=$service
    g=$((g + 1))
  fi
  charge[$service]=$((\${charge[$service]:-0} + c))
  if [ "\${charge[$service]}" -gt "$max" ]; then
    max=\${charge[$service]}
    max_nom=$service
  fi
done
for ((i=0; i<g; i++)); do
  service=\${ordre[$i]}
  s=\${charge[$service]}
  if [ "$s" -gt 70 ]; then
    echo "$service : $s% de charge (a surveiller)"
  else
    echo "$service : $s% de charge"
  fi
done
echo "service le plus charge : $max_nom ($max%)"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Rentabilisation et dimensionnement
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'vt-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'De 80 % à 100 % : le taux de rentabilisation',
    goal: 'Calculer le taux de rentabilisation de chaque serveur avant/après virtualisation.',
    brief: '<p>Le serveur de l’histoire « se retrouva rentabilisé à 100 % ». Le script lit <strong>n ' +
      'lignes</strong> « serveur avant apres » (taux d’utilisation en %). Un serveur est <code>reveille</code> ' +
      'si le taux passe sous 30 % avant à 80 % ou plus après ; <code>en progres</code> si le taux ' +
      'augmente sans atteindre 80 % ; sinon <code>insuffisant</code>. Pour chaque ligne il affiche ' +
      '<code>serveur : verdict</code>, puis <code>reveilles : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r serveur avant apres
  # À compléter : les trois verdicts, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Trois cas : avant -lt 30 ET apres -ge 80 → reveille ; apres -gt avant → en progres ; sinon insuffisant.',
      'Le compteur ne progresse que pour les reveilles ; bilan après la boucle.'
    ],
    examples: [
      { stdin: '3\nsrv1 20 90\nsrv2 40 60\nsrv3 25 50\n', expected: 'srv1 : reveille\nsrv2 : en progres\nsrv3 : en progres\nreveilles : 1/3' }
    ],
    tests: [
      { label: 'Parc virtualisé', stdin: '4\na 10 95\nb 15 80\nc 35 90\nd 20 30\n', expected: 'a : reveille\nb : reveille\nc : en progres\nd : en progres\nreveilles : 2/4' },
      { label: 'Déjà occupé', stdin: '3\na 50 85\nb 60 90\nc 45 50\n', expected: 'a : en progres\nb : en progres\nc : en progres\nreveilles : 0/3' },
      { label: 'Frontières exactes', stdin: '3\na 29 80\nb 30 80\nc 29 79\n', expected: 'a : reveille\nb : en progres\nc : en progres\nreveilles : 1/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r serveur avant apres
  if [ "$avant" -lt 30 ] && [ "$apres" -ge 80 ]; then
    echo "$serveur : reveille"
    ok=$((ok + 1))
  elif [ "$apres" -gt "$avant" ]; then
    echo "$serveur : en progres"
  else
    echo "$serveur : insuffisant"
  fi
done
echo "reveilles : $ok/$n"
`
  },
  {
    id: 'vt-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Combien de serveurs économisés ?',
    goal: 'Comparer le parc physique avant et le parc virtualisé après.',
    brief: '<p>Le script lit d’abord <strong>n lignes</strong> « serveur cout » du parc physique actuel, ' +
      'puis une ligne <code>cout_vm</code> (coût mensuel d’une VM). La consolidation regroupe tous les ' +
      'services sur des VM : le nombre de VM nécessaires est le plafond de (total des coûts / cout_vm) — ' +
      'division entière plus 1 si le reste est non nul. Le script affiche <code>parc actuel : n serveurs ' +
      '— X FCFA</code>, <code>parc virtualise : Y vm — Z FCFA</code> (Y × cout_vm) et ' +
      '<code>economie : W FCFA (T%)</code> où T est la part économisée (0 à 100).</p>',
    starter: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r serveur cout
  # À compléter : somme des coûts du parc actuel.
done
read -r cout_vm
# À compléter : nb de VM (plafond de la division), coûts, économie et pourcentage.
`,
    hints: [
      'Plafond : vm = total / cout_vm ; si total % cout_vm != 0 alors vm = vm + 1.',
      'Pourcentage : economie * 100 / total (division entière).'
    ],
    examples: [
      { stdin: '3\nsrv1 100000\nsrv2 80000\nsrv3 60000\n40000\n', expected: 'parc actuel : 3 serveurs — 240000 FCFA\nparc virtualise : 6 vm — 240000 FCFA\neconomie : 0 FCFA (0%)' }
    ],
    tests: [
      { label: 'Consolidation rentable', stdin: '4\na 200000\nb 150000\nc 180000\nd 120000\n50000\n', expected: 'parc actuel : 4 serveurs — 650000 FCFA\nparc virtualise : 13 vm — 650000 FCFA\neconomie : 0 FCFA (0%)' },
      { label: 'Petites VM', stdin: '3\na 100000\nb 100000\nc 100000\n60000\n', expected: 'parc actuel : 3 serveurs — 300000 FCFA\nparc virtualise : 5 vm — 300000 FCFA\neconomie : 0 FCFA (0%)' },
      { label: 'Vraie économie', stdin: '2\na 100000\nb 100000\n80000\n', expected: 'parc actuel : 2 serveurs — 200000 FCFA\nparc virtualise : 3 vm — 240000 FCFA\neconomie : -40000 FCFA (-20%)' }
    ],
    solution: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r serveur cout
  total=$((total + cout))
done
read -r cout_vm
vm=$((total / cout_vm))
if [ $((total % cout_vm)) -ne 0 ]; then
  vm=$((vm + 1))
fi
apres=$((vm * cout_vm))
eco=$((total - apres))
pct=$((eco * 100 / total))
echo "parc actuel : $n serveurs — $total FCFA"
echo "parc virtualise : $vm vm — $apres FCFA"
echo "economie : $eco FCFA ($pct%)"
`
  },
  {
    id: 'vt-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Le plan de consolidation',
    goal: 'Décider quel serveur physique héberger chaque VM selon la capacité restante.',
    brief: '<p>Le script lit d’abord <strong>m lignes</strong> « hote capacite » (les serveurs physiques, ' +
      'dans l’ordre), puis <strong>n lignes</strong> « vm besoin ». On place chaque VM sur le <strong>premier ' +
      'hôte</strong> dont la capacité restante suffit (l’ordre du fichier fait foi). Pour chaque VM il ' +
      'affiche <code>vm : hote</code> ou <code>vm : sans-place</code>, décrémente la capacité de l’hôte ' +
      'choisi, et à la fin affiche une ligne <code>hote : reste</code> par hôte puis ' +
      '<code>orinelles : X/n</code> — pardon, <code>non-placees : X/n</code>.</p>',
    starter: `read -r m
declare -A capacite
declare -A ordre
for ((i=0; i<m; i++)); do
  read -r hote c
  # À compléter : mémoriser capacité et ordre.
done
read -r n
non=0
for ((i=0; i<n; i++)); do
  read -r vm besoin
  # À compléter : premier hôte suffisant, décrément, sinon non placée.
done
# À compléter : bilans par hôte + non placées.
`,
    hints: [
      'Premier hôte suffisant : parcourir ordre, prendre le premier avec capacite[hote] -ge besoin.',
      'Une VM non placée ne décrémente rien ; les bilans sortent dans l’ordre des hôtes.'
    ],
    examples: [
      { stdin: '2\nsrv1 100\nsrv2 100\n2\nvm-a 60\nvm-b 60\n', expected: 'vm-a : srv1\nvm-b : srv2\nsrv1 : 40\nsrv2 : 40\nnon-placees : 0/2' }
    ],
    tests: [
      { label: 'Trois VM, deux hôtes', stdin: '2\nsrv1 100\nsrv2 100\n3\nvm-a 60\nvm-b 60\nvm-c 60\n', expected: 'vm-a : srv1\nvm-b : srv2\nvm-c : sans-place\nsrv1 : 40\nsrv2 : 40\nnon-placees : 1/3' },
      { label: 'Remplissage optimal', stdin: '2\nsrv1 100\nsrv2 50\n4\nvm-a 50\nvm-b 50\nvm-c 50\nvm-d 50\n', expected: 'vm-a : srv1\nvm-b : srv1\nvm-c : srv2\nvm-d : sans-place\nsrv1 : 0\nsrv2 : 0\nnon-placees : 1/4' },
      { label: 'Un seul hôte généreux', stdin: '1\nfainéant 200\n3\nvm-bd 80\nvm-web 40\nvm-feu 80\n', expected: 'vm-bd : fainéant\nvm-web : fainéant\nvm-feu : fainéant\nfainéant : 0\nnon-placees : 0/3' }
    ],
    solution: `read -r m
declare -A capacite
declare -A ordre
for ((i=0; i<m; i++)); do
  read -r hote c
  capacite[$hote]=$c
  ordre[$i]=$hote
done
read -r n
non=0
for ((i=0; i<n; i++)); do
  read -r vm besoin
  place=0
  for ((j=0; j<m; j++)); do
    hote=\${ordre[$j]}
    if [ "$place" = "0" ] && [ "\${capacite[$hote]}" -ge "$besoin" ]; then
      echo "$vm : $hote"
      capacite[$hote]=$((\${capacite[$hote]} - besoin))
      place=1
    fi
  done
  if [ "$place" = "0" ]; then
    echo "$vm : sans-place"
    non=$((non + 1))
  fi
done
for ((j=0; j<m; j++)); do
  hote=\${ordre[$j]}
  echo "$hote : \${capacite[$hote]}"
done
echo "non-placees : $non/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Les risques de la surcharge
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'vt-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Les questions techniques de l’histoire',
    goal: 'Associer chaque concept de la question technique à sa définition.',
    brief: '<p>L’histoire pose trois questions techniques : le concept illustré, les avantages, et les ' +
      'risques. Le script lit <strong>n lignes</strong> « concept role » : role est un code parmi ' +
      '<code>partage</code> (plusieurs VM sur un même serveur physique), <code>avantage</code> ' +
      '(rentabilisation, moins de machines) ou <code>risque</code> (surcharge, saturation des ressources). ' +
      'Pour chaque ligne il affiche <code>concept : OK</code> ou <code>concept : ERREUR</code>, puis ' +
      '<code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r concept role
  # À compléter : le rôle attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le concept : mutualisation → partage, rentabilisation → avantage, surcharge → risque.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nrentabilisation avantage\nmutualisation partage\nsurcharge risque\n', expected: 'rentabilisation : OK\nmutualisation : OK\nsurcharge : OK\ncorrectes : 3/3' }
    ],
    tests: [
      { label: 'Les trois concepts', stdin: '3\nmutualisation partage\nrentabilisation avantage\nsurcharge risque\n', expected: 'mutualisation : OK\nrentabilisation : OK\nsurcharge : OK\ncorrectes : 3/3' },
      { label: 'Trois confusions', stdin: '4\nmutualisation risque\nsurcharge avantage\nrentabilisation partage\nmutualisation partage\n', expected: 'mutualisation : ERREUR\nsurcharge : ERREUR\nrentabilisation : ERREUR\nmutualisation : OK\ncorrectes : 1/4' },
      { label: 'Interro écrite', stdin: '3\nsurcharge risque\nmutualisation partage\nrentabilisation avantage\n', expected: 'surcharge : OK\nmutualisation : OK\nrentabilisation : OK\ncorrectes : 3/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r concept role
  case "$concept" in
    mutualisation) attendu="partage" ;;
    rentabilisation) attendu="avantage" ;;
    surcharge) attendu="risque" ;;
  esac
  if [ "$role" = "$attendu" ]; then
    echo "$concept : OK"
    ok=$((ok + 1))
  else
    echo "$concept : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'vt-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Le seuil de saturation du serveur',
    goal: 'Surveiller la charge totale et refuser les VM quand le serveur menace de saturer.',
    brief: '<p>La dernière question de l’histoire : « que se passerait-il si trop de machines virtuelles ' +
      'étaient créées sur un seul serveur ? ». Le script lit une ligne <code>capacite</code> (100 par ' +
      'défaut si la ligne vaut <code>-</code>), puis <strong>n lignes</strong> « vm charge ». La charge ' +
      'totale s’accumule : si elle reste <= capacité, la VM est <code>vm : hebergee</code> ; si elle la ' +
      'dépasse, <code>vm : refusee (saturation)</code> et la charge n’est pas ajoutée. À la fin : ' +
      '<code>charge : X/capacite</code> et <code>hebergees : Y/n</code> — et si X atteint exactement la ' +
      'capacité, une dernière ligne <code>serveur plein</code>.</p>',
    starter: `read -r capacite
[ "$capacite" = "-" ] && capacite=100
read -r n
ok=0
total=0
for ((i=0; i<n; i++)); do
  read -r vm charge
  # À compléter : accumuler sans dépasser la capacité, compteurs.
done
# À compléter : bilans + verdict de saturation exacte.
`,
    hints: [
      'Tester avant d’ajouter : si total + charge <= capacite → hebergee et total augmente, sinon refusee.',
      'Après la boucle : total -eq capacite → afficher « serveur plein ».'
    ],
    examples: [
      { stdin: '-\n3\nvm1 40\nvm2 40\nvm3 30\n', expected: 'vm1 : hebergee\nvm2 : hebergee\nvm3 : refusee (saturation)\ncharge : 80/100\nhebergees : 2/3' }
    ],
    tests: [
      { label: 'Trop de machines ambitieuses', stdin: '100\n4\na 30\nb 30\nc 30\nd 30\n', expected: 'a : hebergee\nb : hebergee\nc : hebergee\nd : refusee (saturation)\ncharge : 90/100\nhebergees : 3/4' },
      { label: 'Capacité réduite', stdin: '50\n3\na 25\nb 25\nc 25\n', expected: 'a : hebergee\nb : hebergee\nc : refusee (saturation)\ncharge : 50/50\nhebergees : 2/3\nserveur plein' },
      { label: 'Rien à signaler', stdin: '-\n2\na 10\nb 20\n', expected: 'a : hebergee\nb : hebergee\ncharge : 30/100\nhebergees : 2/2' }
    ],
    solution: `read -r capacite
[ "$capacite" = "-" ] && capacite=100
read -r n
ok=0
total=0
for ((i=0; i<n; i++)); do
  read -r vm charge
  if [ $((total + charge)) -le "$capacite" ]; then
    echo "$vm : hebergee"
    total=$((total + charge))
    ok=$((ok + 1))
  else
    echo "$vm : refusee (saturation)"
  fi
done
echo "charge : $total/$capacite"
echo "hebergees : $ok/$n"
if [ "$total" -eq "$capacite" ]; then
  echo "serveur plein"
fi
`
  },
  {
    id: 'vt-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Les symptômes de la surcharge',
    goal: 'Détecter les symptômes de surcharge et conseiller l’action du support.',
    brief: '<p>Le script lit <strong>n lignes</strong> « serveur cpu ram reponses » : cpu et ram en %, ' +
      'reponses = temps de réponse en ms des services hébergés. Symptômes : cpu > 90 OU ram > 90 OU ' +
      'reponses > 500 → le serveur est <code>serveur : surcharge (symptome)</code> avec symptome = ' +
      '<code>cpu</code>, <code>ram</code>, <code>reponses</code> ou <code>multiple</code> (dans cet ordre ' +
      'de détection) ; l’action conseillée est alors <code>serveur : action = deplacer une VM</code>. ' +
      'Sinon <code>serveur : sain</code>. Enfin <code>surcharges : X/n</code> et ' +
      '<code>deplacements : X</code>.</p>',
    starter: `read -r n
x=0
for ((i=0; i<n; i++)); do
  read -r serveur cpu ram reponses
  # À compléter : détection des symptômes dans l'ordre, action, compteurs.
done
# À compléter : les deux bilans.
`,
    hints: [
      'Compter les symptômes : c=0 ; cpu -gt 90 → c+1 et nom cpu ; ram -gt 90 → idem ; reponses -gt 500 → idem.',
      'c = 0 → sain ; c = 1 → le nom du symptôme ; c >= 2 → multiple ; dans tous les cas de surcharge, action = deplacer une VM.'
    ],
    examples: [
      { stdin: '3\na 95 50 100\nb 60 95 200\nc 50 50 600\n', expected: 'a : surcharge (cpu)\na : action = deplacer une VM\nb : surcharge (ram)\nb : action = deplacer une VM\nc : surcharge (reponses)\nc : action = deplacer une VM\nsurcharges : 3/3\ndeplacements : 3' }
    ],
    tests: [
      { label: 'Serveur sain', stdin: '2\na 50 60 100\nb 80 85 300\n', expected: 'a : sain\nb : sain\nsurcharges : 0/2\ndeplacements : 0' },
      { label: 'Symptôme multiple', stdin: '2\na 95 95 100\nb 99 99 999\n', expected: 'a : surcharge (multiple)\na : action = deplacer une VM\nb : surcharge (multiple)\nb : action = deplacer une VM\nsurcharges : 2/2\ndeplacements : 2' },
      { label: 'Mixte', stdin: '4\na 95 60 100\nb 60 95 200\nc 60 60 600\nd 60 60 100\n', expected: 'a : surcharge (cpu)\na : action = deplacer une VM\nb : surcharge (ram)\nb : action = deplacer une VM\nc : surcharge (reponses)\nc : action = deplacer une VM\nd : sain\nsurcharges : 3/4\ndeplacements : 3' }
    ],
    solution: `read -r n
x=0
for ((i=0; i<n; i++)); do
  read -r serveur cpu ram reponses
  c=0
  symptome=""
  if [ "$cpu" -gt 90 ]; then
    c=$((c + 1))
    symptome="cpu"
  fi
  if [ "$ram" -gt 90 ]; then
    c=$((c + 1))
    symptome="ram"
  fi
  if [ "$reponses" -gt 500 ]; then
    c=$((c + 1))
    symptome="reponses"
  fi
  if [ "$c" -eq 0 ]; then
    echo "$serveur : sain"
  else
    if [ "$c" -ge 2 ]; then
      symptome="multiple"
    fi
    echo "$serveur : surcharge ($symptome)"
    echo "$serveur : action = deplacer une VM"
    x=$((x + 1))
  fi
done
echo "surcharges : $x/$n"
echo "deplacements : $x"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Convaincre le responsable informatique
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'vt-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'L’argumentaire en trois arguments',
    goal: 'Valider l’ordre de l’argumentaire : constat, solution, bénéfice.',
    brief: '<p>Le script lit <strong>4 lignes</strong> « etape argument » dans l’ordre du pitch : le script ' +
      'vérifie que l’étape 1 est <code>constat</code> (argument attendu <code>gaspillage</code>), l’étape 2 ' +
      '<code>idee</code> (<code>virtualisation</code>), l’étape 3 <code>preuve</code> ' +
      '(<code>rentabilisation</code>) et l’étape 4 <code>verdict</code> (<code>plein</code>). Pour chaque ' +
      'ligne il affiche <code>etape N : OK</code> quand l’étape ET son argument sont justes, sinon ' +
      '<code>etape N : NON</code>, puis <code>etapes correctes : X/4</code>.</p>',
    starter: `for ((i=1; i<=4; i++)); do
  read -r etape argument
  # À compléter : l'argument attendu selon l'étape, les deux comparaisons.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le numéro : 1 → constat/gaspillage, 2 → idee/virtualisation, 3 → preuve/rentabilisation, 4 → verdict/plein.',
      'Étape ET argument doivent être justes en même temps.'
    ],
    examples: [
      { stdin: 'constat gaspillage\nidee virtualisation\npreuve rentabilisation\nverdict plein\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : OK\netape 4 : OK\netapes correctes : 4/4' }
    ],
    tests: [
      { label: 'Deux dernières inversées', stdin: 'constat gaspillage\nidee virtualisation\nverdict plein\npreuve rentabilisation\n', expected: 'etape 1 : OK\netape 2 : OK\netape 3 : NON\netape 4 : NON\netapes correctes : 2/4' },
      { label: 'Arguments échangés', stdin: 'constat virtualisation\nidee gaspillage\npreuve rentabilisation\nverdict plein\n', expected: 'etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4' },
      { label: 'Pitch mélangé', stdin: 'idee virtualisation\nconstat gaspillage\npreuve rentabilisation\nverdict plein\n', expected: 'etape 1 : NON\netape 2 : NON\netape 3 : OK\netape 4 : OK\netapes correctes : 2/4' }
    ],
    solution: `ok=0
for ((i=1; i<=4; i++)); do
  read -r etape argument
  case "$i" in
    1) attendu_e="constat" ; attendu_a="gaspillage" ;;
    2) attendu_e="idee" ; attendu_a="virtualisation" ;;
    3) attendu_e="preuve" ; attendu_a="rentabilisation" ;;
    4) attendu_e="verdict" ; attendu_a="plein" ;;
  esac
  if [ "$etape" = "$attendu_e" ] && [ "$argument" = "$attendu_a" ]; then
    echo "etape $i : OK"
    ok=$((ok + 1))
  else
    echo "etape $i : NON"
  fi
done
echo "etapes correctes : $ok/4"
`
  },
  {
    id: 'vt-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Le bilan avant/après du parc',
    goal: 'Produire le tableau de bord de l’argumentaire : gaspillage avant, rente après.',
    brief: '<p>Le script lit <strong>n lignes</strong> « serveur avant apres » (taux d’utilisation %). Il ' +
      'affiche pour chaque serveur <code>serveur : avant=A% apres=B%</code>, puis trois bilans : ' +
      '<code>reveilles : X</code> (passés de moins de 30 % à 80 % ou plus), <code>moyenne avant : Y%</code> ' +
      'et <code>moyenne apres : Z%</code> (moyennes arrondies à l’entier inférieur).</p>',
    starter: `read -r n
reveilles=0
somme_avant=0
somme_apres=0
for ((i=0; i<n; i++)); do
  read -r serveur avant apres
  # À compléter : affichage, compteur des réveillés, sommes.
done
# À compléter : les trois bilans (moyennes en division entière).
`,
    hints: [
      'Réveillé : avant -lt 30 ET apres -ge 80.',
      'Moyennes : somme_avant / n et somme_apres / n (division entière bash).'
    ],
    examples: [
      { stdin: '3\nsrv1 20 90\nsrv2 30 50\nsrv3 10 85\n', expected: 'srv1 : avant=20% apres=90%\nsrv2 : avant=30% apres=50%\nsrv3 : avant=10% apres=85%\nreveilles : 2\nmoyenne avant : 20%\nmoyenne apres : 75%' }
    ],
    tests: [
      { label: 'Parc du support', stdin: '4\na 10 95\nb 20 80\nc 40 45\nd 50 55\n', expected: 'a : avant=10% apres=95%\nb : avant=20% apres=80%\nc : avant=40% apres=45%\nd : avant=50% apres=55%\nreveilles : 2\nmoyenne avant : 30%\nmoyenne apres : 68%' },
      { label: 'Tout réveillé', stdin: '3\na 5 90\nb 10 85\nc 0 100\n', expected: 'a : avant=5% apres=90%\nb : avant=10% apres=85%\nc : avant=0% apres=100%\nreveilles : 3\nmoyenne avant : 5%\nmoyenne apres : 91%' },
      { label: 'Rien ne bouge', stdin: '2\na 60 60\nb 70 65\n', expected: 'a : avant=60% apres=60%\nb : avant=70% apres=65%\nreveilles : 0\nmoyenne avant : 65%\nmoyenne apres : 62%' }
    ],
    solution: `read -r n
reveilles=0
somme_avant=0
somme_apres=0
for ((i=0; i<n; i++)); do
  read -r serveur avant apres
  somme_avant=$((somme_avant + avant))
  somme_apres=$((somme_apres + apres))
  echo "$serveur : avant=$avant% apres=$apres%"
  if [ "$avant" -lt 30 ] && [ "$apres" -ge 80 ]; then
    reveilles=$((reveilles + 1))
  fi
done
echo "reveilles : $reveilles"
echo "moyenne avant : $((somme_avant / n))%"
echo "moyenne apres : $((somme_apres / n))%"
`
  },
  {
    id: 'vt-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Le plan de « réveil » des vieux serveurs',
    goal: 'Élaborer le plan final : quoi virtualiser, quoi garder, verdict du projet.',
    brief: '<p>Dernière question de l’histoire : « comment réveiller les vieux serveurs pour être efficace ' +
      'mais pas surchargé ? ». Le script lit d’abord <strong>n lignes</strong> « serveur config » où config ' +
      'est une suite de lettres sans espace — <code>v</code> = virtualisable (matériel compatible), ' +
      '<code>e</code> = économe (moins de 30 % d’utilisation), <code>s</code> = sûr (sauvegardes ' +
      'existantes), <code>-</code> = aucune information. Puis <strong>m lignes</strong> « vm charge » de la ' +
      'charge des VM prévues. Pour chaque serveur : <code>serveur : a virtualiser</code> si les trois ' +
      'lettres sont présentes, sinon <code>serveur : a etudier (manque X)</code> (première lettre ' +
      'manquante dans l’ordre v, e, s). Pour les VM : <code>vm : charge=X</code>. Verdict final : ' +
      '<code>plan pret</code> si tous les serveurs sont virtualisables ET que la charge totale des VM est ' +
      'de 200 au plus, <code>plan a ajuster</code> si les serveurs sont prêts mais la charge dépasse 200, ' +
      '<code>plan impossible</code> sinon.</p>',
    starter: `read -r n
tous_prets=1
for ((i=0; i<n; i++)); do
  read -r serveur config
  # À compléter : parsing lettre à lettre, premier manque dans l'ordre v, e, s.
done
read -r m
total=0
for ((i=0; i<m; i++)); do
  read -r vm charge
  # À compléter : affichage et somme des charges.
done
# À compléter : verdict en trois états.
`,
    hints: [
      'Parsing : boucle sur les caractères de config comme dans le projet b1-projet ; config = "-" → tout manquant.',
      'Verdict : tous_prets=1 ET total <= 200 → plan pret ; tous_prets=1 → plan a ajuster ; sinon plan impossible.'
    ],
    examples: [
      { stdin: '2\nsrv1 ves\nsrv2 ve\n2\nvm1 100\nvm2 80\n', expected: 'srv1 : a virtualiser\nsrv2 : a etudier (manque s)\nvm1 : charge=100\nvm2 : charge=80\nverdict : plan impossible' }
    ],
    tests: [
      { label: 'Plan idéal', stdin: '2\nsrv1 ves\nsrv2 vse\n2\nvm1 120\nvm2 80\n', expected: 'srv1 : a virtualiser\nsrv2 : a virtualiser\nvm1 : charge=120\nvm2 : charge=80\nverdict : plan pret' },
      { label: 'Charge trop forte', stdin: '1\nsrv1 ves\n3\nvm1 100\nvm2 100\nvm3 100\n', expected: 'srv1 : a virtualiser\nvm1 : charge=100\nvm2 : charge=100\nvm3 : charge=100\nverdict : plan a ajuster' },
      { label: 'Rien de virtualisable', stdin: '2\nsrv1 -\nsrv2 e\n1\nvm1 50\n', expected: 'srv1 : a etudier (manque v)\nsrv2 : a etudier (manque v)\nvm1 : charge=50\nverdict : plan impossible' }
    ],
    solution: `read -r n
tous_prets=1
for ((i=0; i<n; i++)); do
  read -r serveur config
  v=0 ; e=0 ; s=0
  if [ "$config" != "-" ]; then
    for ((j=0; j<\${#config}; j++)); do
      lettre=\${config:$j:1}
      case "$lettre" in
        v) v=1 ;;
        e) e=1 ;;
        s) s=1 ;;
      esac
    done
  fi
  if [ "$v" = "1" ] && [ "$e" = "1" ] && [ "$s" = "1" ]; then
    echo "$serveur : a virtualiser"
  elif [ "$v" = "0" ]; then
    echo "$serveur : a etudier (manque v)" ; tous_prets=0
  elif [ "$e" = "0" ]; then
    echo "$serveur : a etudier (manque e)" ; tous_prets=0
  else
    echo "$serveur : a etudier (manque s)" ; tous_prets=0
  fi
done
read -r m
total=0
for ((i=0; i<m; i++)); do
  read -r vm charge
  total=$((total + charge))
  echo "$vm : charge=$charge"
done
if [ "$tous_prets" = "1" ] && [ "$total" -le 200 ]; then
  echo "verdict : plan pret"
elif [ "$tous_prets" = "1" ]; then
  echo "verdict : plan a ajuster"
else
  echo "verdict : plan impossible"
fi
`
  }
];

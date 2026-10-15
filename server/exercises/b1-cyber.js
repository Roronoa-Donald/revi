/**
 * server/exercises/b1-cyber.js — catalogue d'exercices du cours « Cybersécurité B1 ».
 *
 * Les concepts du cours (calcul de risque, triade CIA, familles de malwares,
 * détection de phishing, 2FA, cryptographie, contrôle d'accès, correctifs,
 * SIEM, logs, réponse à incident, RGPD, sauvegarde 3-2-1) sont simulés en Bash
 * pur : le script lit des données sur son entrée standard et produit le rapport
 * qu'un analyste attend — sans lancer d'outil réel.
 *
 * Pièges de rédaction appliqués (vécus sur b1-linux et b1-git) :
 *   - `${...}` bash échappé `\${...}` dans les template literals JS ;
 *   - chaque entrée stdin se termine par `\n` (le dernier `read` échoue à l'EOF) ;
 *   - entrées d'un même chapitre toutes distinctes entre elles ;
 *   - `declare -A` obligatoire avant tout accès à un tableau associatif ;
 *   - pas de `[ ... ] && echo` en dernière ligne du script ;
 *   - corrigés exécutés en réel par tests/exercise-solutions.test.js.
 */
'use strict';

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Fondements : risque et triade CIA
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cy-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Calculateur de risque',
    goal: 'Appliquer la formule Risque = Menace × Vulnérabilité × Impact sur une liste d’actifs.',
    brief: '<p>Le script lit <strong>n lignes</strong> « menace vulnérabilité » (deux entiers de 1 à 3). ' +
      'Pour chaque actif il calcule la somme et affiche <code>actif K : niveau</code>, où K est le ' +
      'numéro de la ligne (à partir de 1) et niveau vaut <code>Faible</code> (somme 2 ou 3), ' +
      '<code>Moyenne</code> (somme 4 ou 5) ou <code>Critique</code> (somme 6).</p>',
    starter: `read -r n
for ((i=1; i<=n; i++)); do
  read -r menace vuln
  # À compléter : niveau de risque pour chaque actif.
done
`,
    hints: [
      'Le numéro de l’actif est déjà la variable i de la boucle : inutile de le lire.',
      'Trois plages de somme : 2-3, 4-5, 6. Un if/elif/else suffit après avoir calculé somme=$((menace + vuln)).'
    ],
    examples: [
      { stdin: '3\n1 2\n3 3\n2 1\n', expected: 'actif 1 : Faible\nactif 2 : Critique\nactif 3 : Faible' }
    ],
    tests: [
      { label: 'Faible et moyen', stdin: '2\n1 1\n2 3\n', expected: 'actif 1 : Faible\nactif 2 : Moyenne' },
      { label: 'Quatre actifs mixtes', stdin: '4\n2 2\n1 3\n3 3\n1 1\n', expected: 'actif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Critique\nactif 4 : Faible' },
      { label: 'Cinq actifs', stdin: '5\n3 2\n2 2\n1 1\n2 3\n3 3\n', expected: 'actif 1 : Moyenne\nactif 2 : Moyenne\nactif 3 : Faible\nactif 4 : Moyenne\nactif 5 : Critique' }
    ],
    solution: `read -r n
for ((i=1; i<=n; i++)); do
  read -r menace vuln
  somme=$((menace + vuln))
  if [ "$somme" -le 3 ]; then
    echo "actif $i : Faible"
  elif [ "$somme" -le 5 ]; then
    echo "actif $i : Moyenne"
  else
    echo "actif $i : Critique"
  fi
done
`
  },
  {
    id: 'cy-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Police de la triade CIA',
    goal: 'Classer des menaces selon la composante de la triade CIA qu’elles violent, puis dresser le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « lettre menace » : lettre vaut C (confidentialité), ' +
      'I (intégrité) ou D (disponibilité). Pour chaque ligne il affiche <code>lettre : menace</code>. ' +
      'Enfin il affiche <code>bilan : X/n protégées</code>, X étant le nombre de lettres ' +
      '<em>distinctes</em> rencontrées : une menace n’est contenue que si la composante visée est protégée.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r lettre menace
  # À compléter : afficher la ligne, puis compter les lettres distinctes.
done
`,
    hints: [
      'Trois drapeaux (un par lettre) valent mieux qu’un tableau : ils passent à 1 quand la lettre apparaît.',
      'Le nombre de lettres distinctes est la somme des trois drapeaux à la fin.'
    ],
    examples: [
      { stdin: '5\nC stockage\nI interception\nC divulgation\nD ransomware\nD coupure\n', expected: 'C : stockage\nI : interception\nC : divulgation\nD : ransomware\nD : coupure\nbilan : 3/5 protégées' }
    ],
    tests: [
      { label: 'Une seule menace', stdin: '1\nC ecoute\n', expected: 'C : ecoute\nbilan : 1/1 protégées' },
      { label: 'Deux composantes', stdin: '3\nC vol\nC vol\nI altération\n', expected: 'C : vol\nC : vol\nI : altération\nbilan : 2/3 protégées' },
      { label: 'Deux composantes, autre répartition', stdin: '4\nD panne\nD panne\nI fuite\nI fuite\n', expected: 'D : panne\nD : panne\nI : fuite\nI : fuite\nbilan : 2/4 protégées' }
    ],
    solution: `read -r n
c=0
i_lettre=0
d=0
for ((i=0; i<n; i++)); do
  read -r lettre menace
  echo "$lettre : $menace"
  if [ "$lettre" = "C" ]; then c=1; fi
  if [ "$lettre" = "I" ]; then i_lettre=1; fi
  if [ "$lettre" = "D" ]; then d=1; fi
done
distinct=$((c + i_lettre + d))
echo "bilan : $distinct/$n protégées"
`
  },
  {
    id: 'cy-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Historique des incidents',
    goal: 'Relire une chronologie d’incidents célèbres et en extraire les bornes, pour ancrer les dates du cours.',
    brief: '<p>Le script lit <strong>n lignes</strong> « annee nom » (année <code>&lt;</code> 9999, nom sans ' +
      'espace). Il réaffiche chaque ligne telle quelle, puis conclut par trois lignes : ' +
      '<code>plus ancien : annee nom</code>, <code>plus recent : annee nom</code> et ' +
      '<code>enseignement : les incidents s\'enchaînent, la vigilance aussi</code>.</p>',
    starter: `read -r n
min_annee=9999
max_annee=0
for ((i=0; i<n; i++)); do
  read -r annee nom
  # À compléter : réafficher la ligne et retenir les bornes.
done
`,
    hints: [
      'Garde la ligne complète (année et nom) dans une variable, pas seulement l’année : l’affichage final la réclame.',
      'Deux comparaisons par ligne : -lt pour le plus ancien, -gt pour le plus récent.'
    ],
    examples: [
      { stdin: '5\n2017 WannaCry\n2013 CryptoLocker\n1988 Morris\n2021 Log4Shell\n2024 XZ Utils\n', expected: '2017 WannaCry\n2013 CryptoLocker\n1988 Morris\n2021 Log4Shell\n2024 XZ Utils\nplus ancien : 1988 Morris\nplus recent : 2024 XZ Utils\nenseignement : les incidents s\'enchaînent, la vigilance aussi' }
    ],
    tests: [
      { label: 'Deux incidents', stdin: '2\n2021 Log4Shell\n2017 WannaCry\n', expected: '2021 Log4Shell\n2017 WannaCry\nplus ancien : 2017 WannaCry\nplus recent : 2021 Log4Shell\nenseignement : les incidents s\'enchaînent, la vigilance aussi' },
      { label: 'Trois incidents', stdin: '3\n1988 Morris\n2024 XZ Utils\n2013 CryptoLocker\n', expected: '1988 Morris\n2024 XZ Utils\n2013 CryptoLocker\nplus ancien : 1988 Morris\nplus recent : 2024 XZ Utils\nenseignement : les incidents s\'enchaînent, la vigilance aussi' },
      { label: 'Quatre incidents du siècle', stdin: '4\n2000 ILOVEYOU\n2008 Conficker\n2010 Stuxnet\n2019 Emotet\n', expected: '2000 ILOVEYOU\n2008 Conficker\n2010 Stuxnet\n2019 Emotet\nplus ancien : 2000 ILOVEYOU\nplus recent : 2019 Emotet\nenseignement : les incidents s\'enchaînent, la vigilance aussi' }
    ],
    solution: `read -r n
min_annee=9999
max_annee=0
min_ligne=""
max_ligne=""
for ((i=0; i<n; i++)); do
  read -r annee nom
  echo "$annee $nom"
  if [ "$annee" -lt "$min_annee" ]; then min_annee=$annee; min_ligne="$annee $nom"; fi
  if [ "$annee" -gt "$max_annee" ]; then max_annee=$annee; max_ligne="$annee $nom"; fi
done
echo "plus ancien : $min_ligne"
echo "plus recent : $max_ligne"
echo "enseignement : les incidents s'enchaînent, la vigilance aussi"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Menaces et attaques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cy-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Diagnostic des malwares',
    goal: 'Associer à chaque famille de malware la première mesure qui s’impose.',
    brief: '<p>Le script lit <strong>n lignes</strong> « famille cible » : famille vaut <code>ransomware</code>, ' +
      '<code>virus</code>, <code>ver</code> ou <code>spyware</code>. Pour chaque ligne il affiche ' +
      '<code>famille cible : mesure</code> avec : restaure une sauvegarde hors ligne (ransomware), ' +
      'supprime et re-scanne (virus), isole la machine du réseau (ver), change les mots de passe ' +
      '(spyware). Enfin <code>rapport : n malwares</code>.</p>',
    starter: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r famille cible
  # À compléter : la mesure qui correspond à chaque famille.
done
`,
    hints: [
      'Un case à quatre branches couvre exactement les quatre familles.',
      'Le rapport final affiche n : le compteur total existe déjà, il ne reste qu’à l’afficher après la boucle.'
    ],
    examples: [
      { stdin: '6\nransomware rapport.pdf\nvirus photo.exe\nver cle_usb\nspyware navigateur\nvirus installateur.exe\nspyware clavier\n', expected: 'ransomware rapport.pdf : restaure une sauvegarde hors ligne\nvirus photo.exe : supprime et re-scanne\nver cle_usb : isole la machine du réseau\nspyware navigateur : change les mots de passe\nvirus installateur.exe : supprime et re-scanne\nspyware clavier : change les mots de passe\nrapport : 6 malwares' }
    ],
    tests: [
      { label: 'Ver et virus', stdin: '2\nver partage\nvirus jeu.exe\n', expected: 'ver partage : isole la machine du réseau\nvirus jeu.exe : supprime et re-scanne\nrapport : 2 malwares' },
      { label: 'Ransomware et spyware', stdin: '3\nransomware disque\nspyware tache\nransomware sauvegarde\n', expected: 'ransomware disque : restaure une sauvegarde hors ligne\nspyware tache : change les mots de passe\nransomware sauvegarde : restaure une sauvegarde hors ligne\nrapport : 3 malwares' },
      { label: 'Cinq familles mélangées', stdin: '5\nvirus a.exe\nver b\nspyware c\nver d\nvirus e.exe\n', expected: 'virus a.exe : supprime et re-scanne\nver b : isole la machine du réseau\nspyware c : change les mots de passe\nver d : isole la machine du réseau\nvirus e.exe : supprime et re-scanne\nrapport : 5 malwares' }
    ],
    solution: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r famille cible
  case "$famille" in
    ransomware) echo "ransomware $cible : restaure une sauvegarde hors ligne" ;;
    virus) echo "virus $cible : supprime et re-scanne" ;;
    ver) echo "ver $cible : isole la machine du réseau" ;;
    spyware) echo "spyware $cible : change les mots de passe" ;;
  esac
  total=$((total + 1))
done
echo "rapport : $total malwares"
`
  },
  {
    id: 'cy-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Score de mot de passe',
    goal: 'Implémenter une politique de mots de passe : liste noire, longueur minimale, verdict.',
    brief: '<p>Le script lit <strong>n mots de passe</strong> (sans espace). Pour chacun il affiche ' +
      '<code>mdp_minuscules : verdict</code> : <code>faible</code> s’il figure (en minuscules) dans la liste ' +
      'noire <code>123456 password motdepasse autruche azerty qwerty 2024 2025 ete</code> ou s’il fait ' +
      'moins de 8 caractères ; <code>fort</code> s’il en fait 12 ou plus ; <code>moyen</code> sinon. ' +
      'Le mot affiché est la version minuscules du mot de passe.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r mdp
  # À compléter : liste noire, longueur, verdict.
done
`,
    hints: [
      'minuscules=$(echo "$mdp" | tr \'[:upper:]\' \'[:lower:]\') puis parcourir la liste noire avec un case « *mot* ».',
      'La longueur s’obtient avec ${#mdp} : moins de 8 c’est faible, 12 ou plus c’est fort — teste la liste noire d’abord, la longueur ensuite.'
    ],
    examples: [
      { stdin: '5\nAutruche2024\nkP9!v$2zR#mQ\n123456\nLeChatBleuMangeUnePomme!\nete2025!\n', expected: 'autruche2024 : faible\nkp9!v$2zr#mq : fort\n123456 : faible\nlechatbleumangeunepomme! : fort\nete2025! : faible' }
    ],
    tests: [
      { label: 'Deux mots de passe usuels', stdin: '2\npassword\nMotDePasse1\n', expected: 'password : faible\nmotdepasse1 : faible' },
      { label: 'Un moyen au milieu', stdin: '3\nBonjour2024\nchaton99xx\nBonjour\n', expected: 'bonjour2024 : faible\nchaton99xx : moyen\nbonjour : faible' },
      { label: 'Fort, faible, court', stdin: '3\nMot2PasseLong!\nEte2024\nchat\n', expected: 'mot2passelong! : fort\nete2024 : faible\nchat : faible' }
    ],
    solution: `read -r n
liste_noire="123456 password motdepasse autruche azerty qwerty 2024 2025 ete"
for ((i=0; i<n; i++)); do
  read -r mdp
  bas=$(echo "$mdp" | tr '[:upper:]' '[:lower:]')
  verdict="moyen"
  if [ "\${#mdp}" -lt 8 ]; then
    verdict="faible"
  fi
  for mot in $liste_noire; do
    case "$bas" in
      *"$mot"*) verdict="faible" ;;
    esac
  done
  if [ "$verdict" = "moyen" ] && [ "\${#mdp}" -ge 12 ]; then
    verdict="fort"
  fi
  echo "$bas : $verdict"
done
`
  },
  {
    id: 'cy-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'Détection de phishing',
    goal: 'Retrouver les indices d’hameçonnage d’une URL à partir de son type.',
    brief: '<p>Le script lit <strong>n lignes</strong> « type url » : type vaut <code>https</code>, ' +
      '<code>http</code>, <code>ip</code> (URL en adresse IP) ou <code>domaine</code> (nom trompeur en ' +
      '.info/.tk). Pour chaque ligne il affiche <code>type url : etiquette</code> : ' +
      '<code>normal</code> (https), <code>nom trompeur</code> (http), <code>pas de nom</code> (ip), ' +
      '<code>domaine douteux</code> (domaine). Enfin <code>soupçons : X/n</code> où X compte les ' +
      'lignes non « normal ».</p>',
    starter: `read -r n
suspects=0
for ((i=0; i<n; i++)); do
  read -r type url
  # À compléter : une étiquette par type, puis le compteur de soupçons.
done
`,
    hints: [
      'Le case doit tester https AVANT http : autrement le motif http matcherait aussi les URL https.',
      'Une étiquette différente de « normal » fait monter le compteur de soupçons d’un cran.'
    ],
    examples: [
      { stdin: '5\nhttps banque-exemple.fr\nhttp banque-securite.fr\nip 192.168.12.7\ndomaine paypal-compte.info\nhttps impots.gouv.fr\n', expected: 'https banque-exemple.fr : normal\nhttp banque-securite.fr : nom trompeur\nip 192.168.12.7 : pas de nom\ndomaine paypal-compte.info : domaine douteux\nhttps impots.gouv.fr : normal\nsoupçons : 3/5' }
    ],
    tests: [
      { label: 'Une IP et un https', stdin: '2\nip 10.0.0.2\nhttps adresse.gouv.fr\n', expected: 'ip 10.0.0.2 : pas de nom\nhttps adresse.gouv.fr : normal\nsoupçons : 1/2' },
      { label: 'Domaine douteux et http', stdin: '3\ndomaine microsoft-securite.tk\nhttp portail.fr\nhttps ecli.bzh\n', expected: 'domaine microsoft-securite.tk : domaine douteux\nhttp portail.fr : nom trompeur\nhttps ecli.bzh : normal\nsoupçons : 2/3' },
      { label: 'Cinq URL variées', stdin: '5\nhttps ssl.gouv.fr\nip 172.16.0.9\ndomaine compte-ameli.info\nhttp suivi-colis.fr\nhttps git.bzh\n', expected: 'https ssl.gouv.fr : normal\nip 172.16.0.9 : pas de nom\ndomaine compte-ameli.info : domaine douteux\nhttp suivi-colis.fr : nom trompeur\nhttps git.bzh : normal\nsoupçons : 3/5' }
    ],
    solution: `read -r n
suspects=0
for ((i=0; i<n; i++)); do
  read -r type url
  case "$type" in
    https) etiquette="normal" ;;
    http) etiquette="nom trompeur" ;;
    ip) etiquette="pas de nom" ;;
    *) etiquette="domaine douteux" ;;
  esac
  if [ "$etiquette" != "normal" ]; then suspects=$((suspects + 1)); fi
  echo "$type $url : $etiquette"
done
echo "soupçons : $suspects/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Authentification, cryptographie, contrôle d'accès
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cy-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Compteur de clés',
    goal: 'Vérifier par le calcul pourquoi le chiffrement symétrique ne passe pas à l’échelle.',
    brief: '<p>Le script lit <strong>n</strong> puis n valeurs : le nombre de machines de n groupes de ' +
      'travail. Il cumule le total, puis affiche le nombre de clés secrètes nécessaires : ' +
      '<code>symétrique : k(k-1)/2 clés</code> contre <code>asymétrique : 2×k(k-1)/2 clés</code> — ' +
      'soit une paire de clés par machine, avec k le total de machines.</p>',
    starter: `read -r n
somme=0
for ((i=0; i<n; i++)); do
  read -r machines
  # À compléter : accumuler, puis appliquer la formule de la main à la main.
done
`,
    hints: [
      'Accumule d’abord : somme=$((somme + machines)), la formule vient après la boucle.',
      'k(k-1)/2 s’écrit en Bash : paire=$((somme * (somme - 1) / 2)). L’asymétrique en vaut le double.'
    ],
    examples: [
      { stdin: '5\n8\n3\n9\n2\n5\n', expected: 'symétrique : 351 clés\nasymétrique : 702 clés' }
    ],
    tests: [
      { label: 'Un seul groupe', stdin: '1\n4\n', expected: 'symétrique : 6 clés\nasymétrique : 12 clés' },
      { label: 'Trois groupes', stdin: '3\n2\n10\n6\n', expected: 'symétrique : 153 clés\nasymétrique : 306 clés' },
      { label: 'Deux gros groupes', stdin: '2\n25\n50\n', expected: 'symétrique : 2775 clés\nasymétrique : 5550 clés' }
    ],
    solution: `read -r n
somme=0
for ((i=0; i<n; i++)); do
  read -r machines
  somme=$((somme + machines))
done
paire=$((somme * (somme - 1) / 2))
echo "symétrique : $paire clés"
echo "asymétrique : $((paire * 2)) clés"
`
  },
  {
    id: 'cy-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Vérificateur de 2FA',
    goal: 'Appliquer la règle des deux facteurs : deux catégories différentes, sinon refus.',
    brief: '<p>Le script lit <strong>n lignes</strong> « preuve categorie » : preuve vaut ' +
      '<code>password</code>, <code>code_totp</code>, <code>code_sms</code> ou <code>empreinte</code> ; ' +
      'categorie vaut <code>connaissance</code>, <code>possession</code> ou <code>inherence</code>. ' +
      'Le verdict par ligne : <code>ok</code> (password+connaissance, code_totp+possession), ' +
      '<code>fragile</code> (code_sms+possession, SMS interceptable), <code>refusé</code> ' +
      '(toute autre combinaison). Enfin <code>bilan : a solides, b fragile, c refusés</code>.</p>',
    starter: `read -r n
solides=0
fragiles=0
refuses=0
for ((i=0; i<n; i++)); do
  read -r preuve categorie
  # À compléter : ok, fragile ou refusé selon la combinaison.
done
`,
    hints: [
      'Un case sur « $preuve $categorie » avec deux motifs exacts gagne : password\\ connaissance) et code_totp\\ possession).',
      'N’incrémente les compteurs qu’une fois, au moment où le verdict est posé.'
    ],
    examples: [
      { stdin: '5\npassword connaissance\ncode_totp possession\npassword possession\ncode_sms possession\nempreinte inherence\n', expected: 'password connaissance : ok\ncode_totp possession : ok\npassword possession : refusé\ncode_sms possession : fragile\nempreinte inherence : refusé\nbilan : 2 solides, 1 fragile, 2 refusés' }
    ],
    tests: [
      { label: 'Une preuve valide', stdin: '1\npassword connaissance\n', expected: 'password connaissance : ok\nbilan : 1 solides, 0 fragile, 0 refusés' },
      { label: 'Refus puis réussite', stdin: '2\nempreinte inherence\ncode_totp possession\n', expected: 'empreinte inherence : refusé\ncode_totp possession : ok\nbilan : 1 solides, 0 fragile, 1 refusés' },
      { label: 'Quatre combinaisons', stdin: '4\ncode_sms possession\npassword connaissance\ncode_sms possession\nempreinte inherence\n', expected: 'code_sms possession : fragile\npassword connaissance : ok\ncode_sms possession : fragile\nempreinte inherence : refusé\nbilan : 1 solides, 2 fragile, 1 refusés' }
    ],
    solution: `read -r n
solides=0
fragiles=0
refuses=0
for ((i=0; i<n; i++)); do
  read -r preuve categorie
  case "$preuve $categorie" in
    "password connaissance"|"code_totp possession") verdict="ok" ;;
    "code_sms possession") verdict="fragile" ;;
    *) verdict="refusé" ;;
  esac
  if [ "$verdict" = "ok" ]; then
    solides=$((solides + 1))
  elif [ "$verdict" = "fragile" ]; then
    fragiles=$((fragiles + 1))
  else
    refuses=$((refuses + 1))
  fi
  echo "$preuve $categorie : $verdict"
done
echo "bilan : $solides solides, $fragiles fragile, $refuses refusés"
`
  },
  {
    id: 'cy-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Modèle de contrôle d’accès',
    goal: 'Relier chaque politique d’accès à son mécanisme de décision.',
    brief: '<p>Le script lit <strong>n lignes</strong> « politique ressource ». Politique : ' +
      '<code>DAC</code> (le propriétaire décide → <code>propriétaire</code>), <code>MAC</code> ' +
      '(politique imposée par le système → <code>politique</code>), <code>RBAC</code> ' +
      '(permissions par rôle → <code>role</code>), <code>ABAC</code> (critères dynamiques → ' +
      '<code>attribut</code>), <code>ACL</code> (liste explicite → <code>liste</code>). Toute autre ' +
      'politique est affichée <code>inconnu</code>. Enfin <code>bilan : a modèles, b inconnus</code>.</p>',
    starter: `read -r n
modeles=0
inconnus=0
for ((i=0; i<n; i++)); do
  read -r politique ressource
  # À compléter : une étiquette par modèle, puis les deux compteurs.
done
`,
    hints: [
      'Cinq motifs exacts dans le case, puis *) pour l’inconnu : l’étiquette se choisit en un seul case.',
      'Le bilan se calcule avec un if sur l’étiquette après le echo, pas dans chaque branche du case.'
    ],
    examples: [
      { stdin: '6\nDAC messagerie\nRBAC paie\nACL facture\nMAC projet\nABAC archivage\nRBAC RH\n', expected: 'DAC messagerie : propriétaire\nRBAC paie : role\nACL facture : liste\nMAC projet : politique\nABAC archivage : attribut\nRBAC RH : role\nbilan : 6 modèles, 0 inconnus' }
    ],
    tests: [
      { label: 'Un rôle', stdin: '1\nRBAC paie\n', expected: 'RBAC paie : role\nbilan : 1 modèles, 0 inconnus' },
      { label: 'Une politique inconnue', stdin: '2\nPEP inventaire\nACL facture\n', expected: 'PEP inventaire : inconnu\nACL facture : liste\nbilan : 1 modèles, 1 inconnus' },
      { label: 'Quatre modèles', stdin: '4\nMAC projet\nABAC archivage\nDAC messagerie\nACL facture\n', expected: 'MAC projet : politique\nABAC archivage : attribut\nDAC messagerie : propriétaire\nACL facture : liste\nbilan : 4 modèles, 0 inconnus' }
    ],
    solution: `read -r n
modeles=0
inconnus=0
for ((i=0; i<n; i++)); do
  read -r politique ressource
  case "$politique" in
    DAC) etiquette="propriétaire" ;;
    MAC) etiquette="politique" ;;
    RBAC) etiquette="role" ;;
    ABAC) etiquette="attribut" ;;
    ACL) etiquette="liste" ;;
    *) etiquette="inconnu" ;;
  esac
  echo "$politique $ressource : $etiquette"
  if [ "$etiquette" = "inconnu" ]; then
    inconnus=$((inconnus + 1))
  else
    modeles=$((modeles + 1))
  fi
done
echo "bilan : $modeles modèles, $inconnus inconnus"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Sécurité des systèmes et des applications
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cy-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Guichet des correctifs',
    goal: 'Classer les produits selon l’âge de leur dernier correctif de sécurité.',
    brief: '<p>Le script lit <strong>n lignes</strong> « produit jours » (jours = nombre de jours depuis ' +
      'le dernier correctif de sécurité). Verdict par ligne <code>produit : statut</code> : ' +
      '<code>dans les temps</code> (45 jours ou moins), <code>hors delai</code> (46 à 90), ' +
      '<code>critique</code> (plus de 90).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r produit jours
  # À compléter : trois tranches, trois statuts.
done
`,
    hints: [
      'Deux comparaisons numériques suffisent : -le 45 puis -le 90, le reste tombe dans le else.',
      'Le statut est un simple texte : pas besoin de case, un if/elif/else sur $jours suffit.'
    ],
    examples: [
      { stdin: '6\nserveur_web 46\nbase_donnees 12\nposte_compta 46\nborne_acces 90\nmessagerie 30\ncluster_bdd 3\n', expected: 'serveur_web : hors delai\nbase_donnees : dans les temps\nposte_compta : hors delai\nborne_acces : hors delai\nmessagerie : dans les temps\ncluster_bdd : dans les temps' }
    ],
    tests: [
      { label: 'La frontière des 45 jours', stdin: '2\nserveur_web 46\nserveur_web 45\n', expected: 'serveur_web : hors delai\nserveur_web : dans les temps' },
      { label: 'Trois tranches', stdin: '3\nborne_acces 91\nbase_donnees 20\nserveur_web 60\n', expected: 'borne_acces : critique\nbase_donnees : dans les temps\nserveur_web : hors delai' },
      { label: 'Quatre produits', stdin: '4\nmessagerie 1\ncluster_bdd 99\nposte_compta 5\nbase_donnees 46\n', expected: 'messagerie : dans les temps\ncluster_bdd : critique\nposte_compta : dans les temps\nbase_donnees : hors delai' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r produit jours
  if [ "$jours" -le 45 ]; then
    echo "$produit : dans les temps"
  elif [ "$jours" -le 90 ]; then
    echo "$produit : hors delai"
  else
    echo "$produit : critique"
  fi
done
`
  },
  {
    id: 'cy-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Filtre d’entrées',
    goal: 'Coder le premier réflexe du développement sécurisé : refuser les payloads suspects.',
    brief: '<p>Le script lit <strong>n charges utiles</strong> (sans espace). Une charge est refusée si elle ' +
      'contient une apostrophe (injection SQL), un chevron <code>&lt;</code> ou <code>&gt;</code> ' +
      '(XSS) ou un double tiret <code>--</code> (commentaire SQL) : le script affiche alors ' +
      '<code>charge : refuse</code>, sinon <code>charge : accepte</code>. Enfin ' +
      '<code>rapport : a acceptes, b refuses</code>.</p>',
    starter: `read -r n
acceptes=0
refuses=0
for ((i=0; i<n; i++)); do
  read -r charge
  # À compléter : détecter ', <, > et -- dans la charge.
done
`,
    hints: [
      'Un case sur « $charge » avec des motifs du type *"\'"* ou *"--"* sait détecter une sous-chaîne.',
      'Compte acceptés et refusés dans les deux branches du if, et affiche le rapport après la boucle.'
    ],
    examples: [
      { stdin: '6\nadmin\'--\n<script>alert(1)</script>\nRobert\');--\nalert(1)\nPomme2026\nO\'Brien\n', expected: 'admin\'-- : refuse\n<script>alert(1)</script> : refuse\nRobert\');-- : refuse\nalert(1) : accepte\nPomme2026 : accepte\nO\'Brien : refuse\nrapport : 2 acceptes, 4 refuses' }
    ],
    tests: [
      { label: 'Un nom honnête, une injection', stdin: '2\nnom_proprietaire\nRobert\');--\n', expected: 'nom_proprietaire : accepte\nRobert\');-- : refuse\nrapport : 1 acceptes, 1 refuses' },
      { label: 'Chevron, texte sain, tirets simples', stdin: '3\n<img src=x>\nPomme2026\nenvoie-un-message\n', expected: '<img src=x> : refuse\nPomme2026 : accepte\nenvoie-un-message : accepte\nrapport : 2 acceptes, 1 refuses' },
      { label: 'Double tiret collé', stdin: '3\nid--commentaire\nalert(1)\nPomme2026\n', expected: 'id--commentaire : refuse\nalert(1) : accepte\nPomme2026 : accepte\nrapport : 2 acceptes, 1 refuses' }
    ],
    solution: `read -r n
acceptes=0
refuses=0
for ((i=0; i<n; i++)); do
  read -r charge
  refuse=0
  case "$charge" in
    *"'"*|*"<"*|*">"*|*"--"*) refuse=1 ;;
  esac
  if [ "$refuse" = "1" ]; then
    echo "$charge : refuse"
    refuses=$((refuses + 1))
  else
    echo "$charge : accepte"
    acceptes=$((acceptes + 1))
  fi
done
echo "rapport : $acceptes acceptes, $refuses refuses"
`
  },
  {
    id: 'cy-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'ACL du serveur de fichiers',
    goal: 'Simuler une liste de contrôle d’accès : ajouter, retirer, refuser le retrait d’une entrée absente.',
    brief: '<p>Le script gère une ACL vide au départ et lit <strong>n lignes</strong> « action fichier » : ' +
      '<code>add fichier</code> l’ajoute et affiche <code>add fichier : ok</code> ; ' +
      '<code>remove fichier</code> la retire si présente (<code>remove fichier : ok</code>) ou échoue ' +
      '(<code>remove fichier : introuvable</code>). Enfin <code>bilan : K éléments</code> avec K le ' +
      'nombre d’entrées <em>distinctes</em> restantes — ajouter deux fois le même fichier ne le compte ' +
      'qu’une fois, et un add sur un nom présent est refusé.</p>',
    starter: `read -r n
noms=()
for ((i=0; i<n; i++)); do
  read -r action fichier
  # À compléter : deux tableaux parallèles, recherche linéaire, retrait.
done
`,
    hints: [
      'Pour savoir si le fichier est présent, balaie le tableau avec ${#noms[@]} et compare chaque case.',
      'Le retrait se fait en reconstruisant le tableau sans la valeur visée, puis noms=("${liste[@]}").'
    ],
    examples: [
      { stdin: '6\nadd rapports\nadd photo_a.png\nadd rapports\nremove photo_a.png\nadd photo_a.png\nremove factures\n', expected: 'add rapports : ok\nadd photo_a.png : ok\nadd rapports : refuse\nremove photo_a.png : ok\nadd photo_a.png : ok\nremove factures : introuvable\nbilan : 2 éléments' }
    ],
    tests: [
      { label: 'Ajout puis retrait', stdin: '2\nadd rapports\nremove rapports\n', expected: 'add rapports : ok\nremove rapports : ok\nbilan : 0 éléments' },
      { label: 'Retrait à vide, double ajout', stdin: '3\nremove archivage\nadd factures\nadd factures\n', expected: 'remove archivage : introuvable\nadd factures : ok\nadd factures : refuse\nbilan : 1 éléments' },
      { label: 'Quatre opérations', stdin: '4\nadd notes.txt\nadd notes.txt\nremove notes.txt\nadd paie\n', expected: 'add notes.txt : ok\nadd notes.txt : refuse\nremove notes.txt : ok\nadd paie : ok\nbilan : 1 éléments' }
    ],
    solution: `read -r n
noms=()
for ((i=0; i<n; i++)); do
  read -r action fichier
  if [ "$action" = "add" ]; then
    present=0
    for ((k=0; k<\${#noms[@]}; k++)); do
      if [ "\${noms[$k]}" = "$fichier" ]; then present=1; fi
    done
    if [ "$present" = "1" ]; then
      echo "add $fichier : refuse"
    else
      noms+=("$fichier")
      echo "add $fichier : ok"
    fi
  else
    trouve=0
    for ((k=0; k<\${#noms[@]}; k++)); do
      if [ "\${noms[$k]}" = "$fichier" ]; then trouve=1; fi
    done
    if [ "$trouve" = "1" ]; then
      liste=()
      for ((k=0; k<\${#noms[@]}; k++)); do
        if [ "\${noms[$k]}" != "$fichier" ]; then liste+=("\${noms[$k]}"); fi
      done
      noms=("\${liste[@]}")
      echo "remove $fichier : ok"
    else
      echo "remove $fichier : introuvable"
    fi
  fi
done
echo "bilan : \${#noms[@]} éléments"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Gestion des incidents
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cy-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Triage des alertes',
    goal: 'Router chaque alerte du SIEM vers le canal qui correspond à sa gravité.',
    brief: '<p>Le script lit <strong>n lignes</strong> « niveau evenement ». Route par ligne ' +
      '<code>niveau evenement : canal</code> : <code>pager</code> (CRITIQUE), <code>ticket</code> ' +
      '(AVERTISSEMENT), <code>journal</code> (INFO). Enfin <code>pager : a, ticket : b, journal : c</code>.</p>',
    starter: `read -r n
pager=0
ticket=0
journal=0
for ((i=0; i<n; i++)); do
  read -r niveau evenement
  # À compléter : router chaque alerte et compter les canaux.
done
`,
    hints: [
      'Un case à trois branches exactes, un canal par niveau : l’aiguillage et le comptage vivent ensemble.',
      'Le récapitulatif s’affiche une seule fois, après la boucle — jamais à l’intérieur.'
    ],
    examples: [
      { stdin: '6\nCRITIQUE exfiltration\nINFO rotation_cles\nAVERTISSEMENT echecs_connexion\nCRITIQUE ransomware\nINFO sauvegarde\nAVERTISSEMENT trafic_sortant\n', expected: 'CRITIQUE exfiltration : pager\nINFO rotation_cles : journal\nAVERTISSEMENT echecs_connexion : ticket\nCRITIQUE ransomware : pager\nINFO sauvegarde : journal\nAVERTISSEMENT trafic_sortant : ticket\npager : 2, ticket : 2, journal : 2' }
    ],
    tests: [
      { label: 'Une info, une critique', stdin: '2\nINFO rotation_cles\nCRITIQUE intrusion\n', expected: 'INFO rotation_cles : journal\nCRITIQUE intrusion : pager\npager : 1, ticket : 0, journal : 1' },
      { label: 'Deux avertissements', stdin: '3\nAVERTISSEMENT trafic_sortant\nAVERTISSEMENT echecs_connexion\nINFO sauvegarde\n', expected: 'AVERTISSEMENT trafic_sortant : ticket\nAVERTISSEMENT echecs_connexion : ticket\nINFO sauvegarde : journal\npager : 0, ticket : 2, journal : 1' },
      { label: 'Cinq alertes', stdin: '5\nCRITIQUE ransomware\nCRITIQUE exfiltration\nINFO sauvegarde\nAVERTISSEMENT echecs_connexion\nINFO rotation_cles\n', expected: 'CRITIQUE ransomware : pager\nCRITIQUE exfiltration : pager\nINFO sauvegarde : journal\nAVERTISSEMENT echecs_connexion : ticket\nINFO rotation_cles : journal\npager : 2, ticket : 1, journal : 2' }
    ],
    solution: `read -r n
pager=0
ticket=0
journal=0
for ((i=0; i<n; i++)); do
  read -r niveau evenement
  case "$niveau" in
    CRITIQUE) canal="pager" ;;
    AVERTISSEMENT) canal="ticket" ;;
    *) canal="journal" ;;
  esac
  if [ "$canal" = "pager" ]; then pager=$((pager + 1)); fi
  if [ "$canal" = "ticket" ]; then ticket=$((ticket + 1)); fi
  if [ "$canal" = "journal" ]; then journal=$((journal + 1)); fi
  echo "$niveau $evenement : $canal"
done
echo "pager : $pager, ticket : $ticket, journal : $journal"
`
  },
  {
    id: 'cy-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Journal d’authentification',
    goal: 'Détecter une attaque par force brute dans un journal : compter les échecs par adresse IP.',
    brief: '<p>Le script lit <strong>n lignes</strong> « resultat heure ip » (resultat = SUCCES ou ECHEC). ' +
      'Il réaffiche chaque ligne au format <code>heure ip : resultat</code>, puis deux lignes finales : ' +
      '<code>bilan : X echecs sur IP</code> (IP la plus fautive, échecs cumulés) et ' +
      '<code>alerte : oui</code> si elle en totalise 3 ou plus, <code>alerte : non</code> sinon. ' +
      'Sans aucun échec, l’IP rapportée est celle de la première ligne.</p>',
    starter: `read -r n
declare -A echecs=()
for ((i=0; i<n; i++)); do
  read -r resultat heure ip
  # À compléter : afficher, compter les échecs par IP, trouver la fautive.
done
`,
    hints: [
      'declare -A echecs=() doit venir AVANT la boucle : echecs["$ip"]=$((\${echecs[$ip]:-0} + 1)) compte par IP.',
      'Balaye ensuite ${!echecs[@]} pour trouver le maximum, et garde l’IP de la première ligne pour le cas zéro échec.'
    ],
    examples: [
      { stdin: '6\nECHEC 03:02:11 45.61.10.9\nECHEC 03:02:15 45.61.10.9\nECHEC 03:02:20 45.61.10.9\nSUCCES 03:03:00 45.61.10.9\nSUCCES 09:14:32 10.0.4.15\nECHEC 09:15:01 10.0.4.15\n', expected: '03:02:11 45.61.10.9 : ECHEC\n03:02:15 45.61.10.9 : ECHEC\n03:02:20 45.61.10.9 : ECHEC\n03:03:00 45.61.10.9 : SUCCES\n09:14:32 10.0.4.15 : SUCCES\n09:15:01 10.0.4.15 : ECHEC\nbilan : 3 echecs sur 45.61.10.9\nalerte : oui' }
    ],
    tests: [
      { label: 'Un seul échec', stdin: '2\nSUCCES 08:00:01 10.0.4.15\nECHEC 08:00:10 10.0.4.15\n', expected: '08:00:01 10.0.4.15 : SUCCES\n08:00:10 10.0.4.15 : ECHEC\nbilan : 1 echecs sur 10.0.4.15\nalerte : non' },
      { label: 'Que des succès', stdin: '3\nSUCCES 08:00:01 10.0.4.15\nSUCCES 08:00:02 10.0.4.15\nSUCCES 08:00:03 10.0.4.15\n', expected: '08:00:01 10.0.4.15 : SUCCES\n08:00:02 10.0.4.15 : SUCCES\n08:00:03 10.0.4.15 : SUCCES\nbilan : 0 echecs sur 10.0.4.15\nalerte : non' },
      { label: 'Deux IP concurrentes', stdin: '5\nECHEC 23:59:01 198.51.100.7\nSUCCES 23:59:30 198.51.100.7\nECHEC 23:59:45 198.51.100.7\nECHEC 23:59:50 198.51.100.7\nSUCCES 00:00:10 10.0.4.15\n', expected: '23:59:01 198.51.100.7 : ECHEC\n23:59:30 198.51.100.7 : SUCCES\n23:59:45 198.51.100.7 : ECHEC\n23:59:50 198.51.100.7 : ECHEC\n00:00:10 10.0.4.15 : SUCCES\nbilan : 3 echecs sur 198.51.100.7\nalerte : oui' }
    ],
    solution: `read -r n
declare -A echecs=()
premiere_ip=""
for ((i=0; i<n; i++)); do
  read -r resultat heure ip
  echo "$heure $ip : $resultat"
  if [ -z "$premiere_ip" ]; then premiere_ip=$ip; fi
  if [ "$resultat" = "ECHEC" ]; then
    echecs["$ip"]=$((\${echecs[$ip]:-0} + 1))
  fi
done
pire_ip=""
pire_total=0
for ip in "\${!echecs[@]}"; do
  if [ "\${echecs[$ip]}" -gt "$pire_total" ]; then
    pire_total="\${echecs[$ip]}"
    pire_ip="$ip"
  fi
done
if [ -z "$pire_ip" ]; then pire_ip=$premiere_ip; fi
echo "bilan : $pire_total echecs sur $pire_ip"
if [ "$pire_total" -ge 3 ]; then
  echo "alerte : oui"
else
  echo "alerte : non"
fi
`
  },
  {
    id: 'cy-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Les étapes de la réponse',
    goal: 'Dérouler la réponse à incident dans l’ordre, chronométrée, avec rejet des étapes inconnues.',
    brief: '<p>Le script lit <strong>n lignes</strong> « motif duree ». Les motifs valides sont ' +
      '<code>identifier</code>, <code>contenir</code>, <code>eradiquer</code>, <code>retablir</code>. ' +
      'Pour la ligne K (à partir de 1) : <code>etape K : motif (duree h)</code> et cumul de la durée ; ' +
      'motif inconnu : <code>etape K : motif inconnu (identifier, contenir, eradiquer, retablir attendus)</code> ' +
      'sans cumul. La numérotation continue même après un rejet. Enfin <code>total : X h</code>.</p>',
    starter: `read -r n
total=0
for ((i=1; i<=n; i++)); do
  read -r motif duree
  # À compléter : valider le motif, formater la ligne, cumuler.
done
`,
    hints: [
      'Le numéro d’étape est l’index i de la boucle : un motif rejeté ne doit ni le reculer ni le faire sauter.',
      'Le case accepte quatre motifs : identifier|contenir|eradiquer|retablir) fait les quatre d’un coup, *) rejette.'
    ],
    examples: [
      { stdin: '4\nidentifier 2\ncontenir 3\neradiquer 6\nretablir 13\n', expected: 'etape 1 : identifier (2 h)\netape 2 : contenir (3 h)\netape 3 : eradiquer (6 h)\netape 4 : retablir (13 h)\ntotal : 24 h' }
    ],
    tests: [
      { label: 'Un motif inconnu au passage', stdin: '4\nidentifier 1\ncache 2\ncontenir 3\nretablir 5\n', expected: 'etape 1 : identifier (1 h)\netape 2 : motif inconnu (identifier, contenir, eradiquer, retablir attendus)\netape 3 : contenir (3 h)\netape 4 : retablir (5 h)\ntotal : 9 h' },
      { label: 'Zéro minute et nuit blanche', stdin: '4\nidentifier 0\ncontenir 12\neradiquer 9\nretablir 5\n', expected: 'etape 1 : identifier (0 h)\netape 2 : contenir (12 h)\netape 3 : eradiquer (9 h)\netape 4 : retablir (5 h)\ntotal : 26 h' },
      { label: 'Étapes dans le désordre', stdin: '4\ncontenir 1\nidentifier 1\neradiquer 1\nretablir 1\n', expected: 'etape 1 : contenir (1 h)\netape 2 : identifier (1 h)\netape 3 : eradiquer (1 h)\netape 4 : retablir (1 h)\ntotal : 4 h' }
    ],
    solution: `read -r n
total=0
for ((i=1; i<=n; i++)); do
  read -r motif duree
  case "$motif" in
    identifier|contenir|eradiquer|retablir)
      echo "etape $i : $motif ($duree h)"
      total=$((total + duree))
      ;;
    *)
      echo "etape $i : motif inconnu (identifier, contenir, eradiquer, retablir attendus)"
      ;;
  esac
done
echo "total : $total h"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Conformité et bonnes pratiques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'cy-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Calculateur d’amende RGPD',
    goal: 'Comparer chaque amende envisagée au plafond du RGPD : 20 millions d’euros ou 4 % du CA mondial.',
    brief: '<p>Le script lit <strong>n lignes</strong> « nombre unite » avec unite = <code>euros</code> ' +
      '(montant en euros) ou <code>percent</code> (part du chiffre d’affaires). Contexte : le CA de ' +
      'l’entreprise vaut 1 milliard d’euros, donc 1 % = 10 M€. Pour la ligne K il affiche ' +
      '<code>candidat K : X M€</code> (division entière pour les euros). Enfin ' +
      '<code>plafond : 20 M€ ou 4 %</code>.</p>',
    starter: `read -r n
for ((i=1; i<=n; i++)); do
  read -r valeur unite
  # À compléter : euros divisés, pourcents multipliés, puis le plafond.
done
`,
    hints: [
      'Euros : me=$((valeur / 1000000)) — division entière. Pourcent : me=$((valeur * 10)) car 1 % de 1 Md€ vaut 10 M€.',
      'La ligne de plafond ne dépend d’aucune donnée : elle s’affiche une fois, après la boucle.'
    ],
    examples: [
      { stdin: '5\n12000000 euros\n40 percent\n20 percent\n35000000 euros\n1 percent\n', expected: 'candidat 1 : 12 M€\ncandidat 2 : 400 M€\ncandidat 3 : 200 M€\ncandidat 4 : 35 M€\ncandidat 5 : 10 M€\nplafond : 20 M€ ou 4 %' }
    ],
    tests: [
      { label: 'Un montant en euros', stdin: '1\n10000000 euros\n', expected: 'candidat 1 : 10 M€\nplafond : 20 M€ ou 4 %' },
      { label: 'Deux parts de CA', stdin: '2\n9 percent\n60 percent\n', expected: 'candidat 1 : 90 M€\ncandidat 2 : 600 M€\nplafond : 20 M€ ou 4 %' },
      { label: 'Trois candidats', stdin: '3\n25 percent\n19000000 euros\n2 percent\n', expected: 'candidat 1 : 250 M€\ncandidat 2 : 19 M€\ncandidat 3 : 20 M€\nplafond : 20 M€ ou 4 %' }
    ],
    solution: `read -r n
for ((i=1; i<=n; i++)); do
  read -r valeur unite
  if [ "$unite" = "euros" ]; then
    me=$((valeur / 1000000))
  else
    me=$((valeur * 10))
  fi
  echo "candidat $i : $me M€"
done
echo "plafond : 20 M€ ou 4 %"
`
  },
  {
    id: 'cy-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Conformité ISO 27001',
    goal: 'Relier chaque pratique de sécurité à la norme qui l’exige, puis mesurer la couverture.',
    brief: '<p>Le script lit <strong>n lignes</strong> « pratique norme » avec norme = RGPD, NIS2, PCIDSS ' +
      'ou ISO27001. Pour chaque ligne il affiche <code>norme : pratique</code>. Enfin ' +
      '<code>couvert : X/n</code> où X compte les normes <em>distinctes</em> rencontrées : une norme ' +
      'n’est couverte qu’une fois, même si plusieurs pratiques la concernent.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r pratique norme
  # À compléter : afficher le lien, puis compter les normes distinctes.
done
`,
    hints: [
      'Quatre drapeaux (RGPD, NIS2, PCIDSS, ISO27001) passent à 1 quand la norme apparaît.',
      'La couverture est la somme des drapeaux sur n : même mécanique que la triade CIA du chapitre 1.'
    ],
    examples: [
      { stdin: '5\nchiffrement RGPD\nplan_reponse NIS2\njeton_banque PCIDSS\nsmsi ISO27001\njournalisation RGPD\n', expected: 'RGPD : chiffrement\nNIS2 : plan_reponse\nPCIDSS : jeton_banque\nISO27001 : smsi\nRGPD : journalisation\ncouvert : 4/5' }
    ],
    tests: [
      { label: 'Une norme', stdin: '1\nsmsi ISO27001\n', expected: 'ISO27001 : smsi\ncouvert : 1/1' },
      { label: 'Deux pratiques, une norme', stdin: '2\nsmsi ISO27001\nsoc ISO27001\n', expected: 'ISO27001 : smsi\nISO27001 : soc\ncouvert : 1/2' },
      { label: 'Trois normes', stdin: '3\njeton_banque PCIDSS\nplan_reponse NIS2\nchiffrement RGPD\n', expected: 'PCIDSS : jeton_banque\nNIS2 : plan_reponse\nRGPD : chiffrement\ncouvert : 3/3' }
    ],
    solution: `read -r n
rgpd=0
nis2=0
pcidss=0
iso=0
for ((i=0; i<n; i++)); do
  read -r pratique norme
  echo "$norme : $pratique"
  case "$norme" in
    RGPD) rgpd=1 ;;
    NIS2) nis2=1 ;;
    PCIDSS) pcidss=1 ;;
    ISO27001) iso=1 ;;
  esac
done
couvert=$((rgpd + nis2 + pcidss + iso))
echo "couvert : $couvert/$n"
`
  },
  {
    id: 'cy-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Coffre 3-2-1',
    goal: 'Auditer une stratégie de sauvegarde contre la règle 3-2-1 et son évolution immuable.',
    brief: '<p>Le script lit <strong>n lignes</strong> « lettre description » : lettre = ' +
      '<code>C</code> (copie des données), <code>S</code> (support distinct), <code>H</code> ' +
      '(copie hors site) ou <code>I</code> (copie immuable). Pour chaque ligne il affiche ' +
      '<code>lettre description : libellé</code> avec copie, support, hors site, immuable. ' +
      'Le verdict final exige C, H et I présents — S aide mais ne suffit jamais : ' +
      '<code>verdict : conforme au 3-2-1</code>, sinon <code>verdict : 3-2-1 incomplet (manque X)</code> ' +
      'avec X la première lettre manquante parmi C, H, I.</p>',
    starter: `read -r n
c=0
s=0
h=0
im=0
for ((i=0; i<n; i++)); do
  read -r lettre description
  # À compléter : afficher chaque élément, puis vérifier C, H et I.
done
`,
    hints: [
      'Quatre drapeaux comme d’habitude ; le verdict s’écrit après la boucle avec des if imbriqués.',
      'L’ordre de priorité du verdict est imposé : C d’abord, puis H, puis I — trois if/elif suffisent.'
    ],
    examples: [
      { stdin: '4\nS nas\nC copie_production\nI airgap\nH bande_offsite\n', expected: 'S nas : support\nC copie_production : copie\nI airgap : immuable\nH bande_offsite : hors site\nverdict : conforme au 3-2-1' }
    ],
    tests: [
      { label: 'Stratégie conforme', stdin: '4\nC copie_production\nS nas\nH bande_offsite\nI airgap\n', expected: 'C copie_production : copie\nS nas : support\nH bande_offsite : hors site\nI airgap : immuable\nverdict : conforme au 3-2-1' },
      { label: 'Aucune copie hors site', stdin: '2\nC copie_production\nS nas\n', expected: 'C copie_production : copie\nS nas : support\nverdict : 3-2-1 incomplet (manque H)' },
      { label: 'Deux supports, pas d’immuable', stdin: '3\nC copie_production\nS nas\nS cloud\n', expected: 'C copie_production : copie\nS nas : support\nS cloud : support\nverdict : 3-2-1 incomplet (manque H)' }
    ],
    solution: `read -r n
c=0
s=0
h=0
im=0
for ((i=0; i<n; i++)); do
  read -r lettre description
  case "$lettre" in
    C) echo "C $description : copie" ; c=$((c + 1)) ;;
    S) echo "S $description : support" ; s=$((s + 1)) ;;
    H) echo "H $description : hors site" ; h=$((h + 1)) ;;
    I) echo "I $description : immuable" ; im=$((im + 1)) ;;
  esac
done
if [ "$c" = "0" ]; then
  echo "verdict : 3-2-1 incomplet (manque C)"
elif [ "$h" = "0" ]; then
  echo "verdict : 3-2-1 incomplet (manque H)"
elif [ "$im" = "0" ]; then
  echo "verdict : 3-2-1 incomplet (manque I)"
else
  echo "verdict : conforme au 3-2-1"
fi
`
  }
];

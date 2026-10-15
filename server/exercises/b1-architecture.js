module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Généralités : ordinateur, système informatique, unités
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ar-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Materiel ou logiciel',
    goal: 'Classer les composantes du système informatique entre hardware et software.',
    brief: '<p>Le script lit <strong>n lignes</strong> « composant categorie » : categorie est un code ' +
      'parmi <code>materiel</code> ou <code>logiciel</code>. Rappel du support : le <strong>hardware</strong> ' +
      'regroupe les parties physiques (clavier, processeur, RAM, disque, écran) et le <strong>software</strong> ' +
      'les programmes (système Linux, traitement de texte Word, navigateur, antivirus). Pour chaque ligne il ' +
      'affiche <code>composant : OK</code> quand la catégorie annoncée est juste, sinon ' +
      '<code>composant : ERREUR</code>, puis le bilan <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r composant categorie
  # À compléter : le rôle attendu selon le composant, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le composant donne la catégorie attendue ; compare-la à la catégorie saisie.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nclavier materiel\nlinux logiciel\nram logiciel\n', expected: 'clavier : OK\nlinux : OK\nram : ERREUR\ncorrectes : 2/3' }
    ],
    tests: [
      { label: 'Les sept composantes', stdin: '7\nclavier materiel\nprocesseur materiel\nram materiel\ndisque materiel\necran materiel\nlinux logiciel\nword logiciel\n', expected: 'clavier : OK\nprocesseur : OK\nram : OK\ndisque : OK\necran : OK\nlinux : OK\nword : OK\ncorrectes : 7/7' },
      { label: 'Deux confusions', stdin: '4\nnavigateur logiciel\ndisque logiciel\nantivirus materiel\necran materiel\n', expected: 'navigateur : OK\ndisque : ERREUR\nantivirus : ERREUR\necran : OK\ncorrectes : 2/4' },
      { label: 'Parc complet', stdin: '5\nprocesseur materiel\nword logiciel\nram materiel\nlinux logiciel\nclavier materiel\n', expected: 'processeur : OK\nword : OK\nram : OK\nlinux : OK\nclavier : OK\ncorrectes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r composant categorie
  case "$composant" in
    clavier|processeur|ram|disque|ecran) attendu="materiel" ;;
    linux|word|navigateur|antivirus) attendu="logiciel" ;;
  esac
  if [ "$categorie" = "$attendu" ]; then
    echo "$composant : OK"
    ok=$((ok + 1))
  else
    echo "$composant : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'ar-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Convertir Ko, Mo et Go',
    goal: 'Appliquer la règle des puissances de 2 : 1 Mo = 1024 Ko et 1 Go = 1024 Mo.',
    brief: '<p>Le script lit <strong>n lignes</strong> « valeur unite » : unite est un code parmi ' +
      '<code>ko</code>, <code>mo</code> ou <code>go</code>. Règle du support : 1 Mo = 1024 Ko et ' +
      '1 Go = 1024 Mo (puissances de 2, pas 1000). Pour chaque ligne il convertit la taille en Mo et ' +
      'affiche <code>valeur unite : X mo</code>, puis le bilan <code>conversions : n</code>. Les valeurs ' +
      'fournies donnent toujours un résultat entier.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r valeur unite
  # À compléter : la conversion vers Mo selon l'unité, puis l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur l\'unité : ko divise par 1024, mo garde la valeur, go multiplie par 1024.',
      'La division entière s\'écrit $((valeur / 1024)).'
    ],
    examples: [
      { stdin: '3\n2048 ko\n512 mo\n2 go\n', expected: '2048 ko : 2 mo\n512 mo : 512 mo\n2 go : 2048 mo\nconversions : 3' }
    ],
    tests: [
      { label: 'Les trois unités melangees', stdin: '4\n1024 ko\n768 mo\n1 go\n4096 ko\n', expected: '1024 ko : 1 mo\n768 mo : 768 mo\n1 go : 1024 mo\n4096 ko : 4 mo\nconversions : 4' },
      { label: 'Que des go', stdin: '3\n3 go\n1 go\n5 go\n', expected: '3 go : 3072 mo\n1 go : 1024 mo\n5 go : 5120 mo\nconversions : 3' },
      { label: 'Que des ko', stdin: '3\n512 ko\n3072 ko\n8192 ko\n', expected: '512 ko : 0 mo\n3072 ko : 3 mo\n8192 ko : 8 mo\nconversions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r valeur unite
  case "$unite" in
    ko) mo=$((valeur / 1024)) ;;
    mo) mo=$valeur ;;
    go) mo=$((valeur * 1024)) ;;
  esac
  echo "$valeur $unite : $mo mo"
done
echo "conversions : $n"
`
  },
  {
    id: 'ar-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Mo/s ou Mbps',
    goal: 'Distinguer débit de stockage (Mo/s) et débit réseau (Mbps) : 1 octet = 8 bits.',
    brief: '<p>Le script lit <strong>n lignes</strong> « valeur unite » : unite est un code parmi ' +
      '<code>mos</code> (Mo/s, débit de stockage) ou <code>mbps</code> (Mbit/s, débit réseau). Règle du ' +
      'support : un octet vaut 8 bits, donc MBps = 8 Mbps. Pour chaque ligne il convertit dans l\'autre ' +
      'unité : <code>valeur mos : X mbps</code> (valeur × 8) ou <code>valeur mbps : X mos</code> (valeur ÷ 8), ' +
      'puis le bilan <code>conversions : n</code>. Les valeurs divisées par 8 donnent un résultat entier.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r valeur unite
  # À compléter : la conversion selon l'unité, puis l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'Mo/s vers Mbps : multiplier par 8. Mbps vers Mo/s : diviser par 8.',
      'Un case sur l\'unité suffit, comme pour les Ko et les Mo.'
    ],
    examples: [
      { stdin: '3\n2 mos\n64 mbps\n10 mos\n', expected: '2 mos : 16 mbps\n64 mbps : 8 mos\n10 mos : 80 mbps\nconversions : 3' }
    ],
    tests: [
      { label: 'Aller-retour complet', stdin: '4\n16 mos\n96 mbps\n40 mbps\n25 mos\n', expected: '16 mos : 128 mbps\n96 mbps : 12 mos\n40 mbps : 5 mos\n25 mos : 200 mbps\nconversions : 4' },
      { label: 'Que du reseau', stdin: '3\n8 mbps\n24 mbps\n80 mbps\n', expected: '8 mbps : 1 mos\n24 mbps : 3 mos\n80 mbps : 10 mos\nconversions : 3' },
      { label: 'Que du stockage', stdin: '3\n5 mos\n12 mos\n100 mos\n', expected: '5 mos : 40 mbps\n12 mos : 96 mbps\n100 mos : 800 mbps\nconversions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r valeur unite
  case "$unite" in
    mos) converti=$((valeur * 8)); cible="mbps" ;;
    mbps) converti=$((valeur / 8)); cible="mos" ;;
  esac
  echo "$valeur $unite : $converti $cible"
done
echo "conversions : $n"
`
  },
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Numération : bases 2, 8, 10, 16 et conversions
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ar-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Du binaire au decimal',
    goal: 'Convertir un nombre binaire en décimal en sommant les poids des bits à 1.',
    brief: '<p>Le script lit <strong>n lignes</strong> contenant chacune un <strong>binaire</strong> ' +
      '(10 bits au plus). Pour chaque ligne il convertit en décimal — le bit de poids le plus fort (MSB) ' +
      'porte le poids 2 puissance 9, le bit de poids le plus faible (LSB) porte 2 puissance 0 — et affiche ' +
      '<code>binaire : decimal=X</code>, puis le bilan <code>conversions : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r binaire
  # À compléter : la conversion en décimal, puis l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'Bash sait convertir une base : $((2#1010)) vaut 10.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\n1010\n11111111\n10000000\n', expected: '1010 : decimal=10\n11111111 : decimal=255\n10000000 : decimal=128\nconversions : 3' }
    ],
    tests: [
      { label: 'Du plus petit au plus grand', stdin: '5\n1\n1011\n10000\n11111\n11001100\n', expected: '1 : decimal=1\n1011 : decimal=11\n10000 : decimal=16\n11111 : decimal=31\n11001100 : decimal=204\nconversions : 5' },
      { label: 'Trois bits', stdin: '4\n10\n110\n111\n1001\n', expected: '10 : decimal=2\n110 : decimal=6\n111 : decimal=7\n1001 : decimal=9\nconversions : 4' },
      { label: 'Mots de huit bits', stdin: '3\n101010\n110000\n11111110\n', expected: '101010 : decimal=42\n110000 : decimal=48\n11111110 : decimal=254\nconversions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r binaire
  decimal=$((2#$binaire))
  echo "$binaire : decimal=$decimal"
done
echo "conversions : $n"
`
  },
  {
    id: 'ar-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Divisions successives',
    goal: 'Convertir un décimal en binaire par divisions successives, du reste au quotient.',
    brief: '<p>Le script lit <strong>n lignes</strong> contenant chacune un <strong>décimal</strong> ' +
      '(0 à 255). Pour chaque ligne il applique la méthode du support : diviser par 2, noter le reste, ' +
      'recommencer jusqu\'au quotient nul, puis lire les restes de bas en haut. Il affiche ' +
      '<code>decimal : binaire=X</code>, puis le bilan <code>conversions : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r decimal
  # À compléter : les divisions successives, la construction du binaire.
done
# À compléter : le bilan.
`,
    hints: [
      'Le reste vaut $((v % 2)) et le quotient $((v / 2)) ; chaque reste se place devant le résultat.',
      'Traite le cas 0 à part : son binaire est 0.'
    ],
    examples: [
      { stdin: '3\n13\n32\n255\n', expected: '13 : binaire=1101\n32 : binaire=100000\n255 : binaire=11111111\nconversions : 3' }
    ],
    tests: [
      { label: 'Avec le zero', stdin: '4\n0\n2\n9\n200\n', expected: '0 : binaire=0\n2 : binaire=10\n9 : binaire=1001\n200 : binaire=11001000\nconversions : 4' },
      { label: 'Puissances de deux', stdin: '3\n1\n128\n170\n', expected: '1 : binaire=1\n128 : binaire=10000000\n170 : binaire=10101010\nconversions : 3' },
      { label: 'Motifs simples', stdin: '3\n7\n64\n254\n', expected: '7 : binaire=111\n64 : binaire=1000000\n254 : binaire=11111110\nconversions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r decimal
  v=$decimal
  bin=""
  if [ "$v" -eq 0 ]; then
    bin="0"
  fi
  while [ "$v" -gt 0 ]; do
    reste=$((v % 2))
    v=$((v / 2))
    bin="$reste$bin"
  done
  echo "$decimal : binaire=$bin"
done
echo "conversions : $n"
`
  },
  {
    id: 'ar-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'De l\'hexadecimal a l\'octal',
    goal: 'Enchaîner deux conversions : hexadécimal vers décimal puis décimal vers octal.',
    brief: '<p>Le script lit <strong>n lignes</strong> contenant chacune un nombre ' +
      '<strong>hexadécimal</strong> (chiffres 0 à 9 et lettres A à F). Pour chaque ligne il passe par le ' +
      'décimal — comme dans la série d\'exercices du support — puis fournit l\'octal : ' +
      '<code>hexa : octal=X</code>, suivi du bilan <code>conversions : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r hexa
  # À compléter : hexa vers décimal, puis décimal vers octal.
done
# À compléter : le bilan.
`,
    hints: [
      'Bash lit aussi l\'hexa : $((16#FF)) vaut 255.',
      'printf \'%o\' valeur affiche l\'octal correspondant.'
    ],
    examples: [
      { stdin: '3\nF\n10\nFF\n', expected: 'F : octal=17\n10 : octal=20\nFF : octal=377\nconversions : 3' }
    ],
    tests: [
      { label: 'Serie de revision', stdin: '4\nA\n7F\n100\nC0\n', expected: 'A : octal=12\n7F : octal=177\n100 : octal=400\nC0 : octal=300\nconversions : 4' },
      { label: 'Petites valeurs', stdin: '3\nB\n20\n3E\n', expected: 'B : octal=13\n20 : octal=40\n3E : octal=76\nconversions : 3' },
      { label: 'Autres motifs', stdin: '3\n1A\n55\n6C\n', expected: '1A : octal=32\n55 : octal=125\n6C : octal=154\nconversions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r hexa
  decimal=$((16#$hexa))
  octal=$(printf '%o' "$decimal")
  echo "$hexa : octal=$octal"
done
echo "conversions : $n"
`
  },
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Nombres signés : compléments et arithmétique binaire
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ar-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Complement a un',
    goal: 'Inverser tous les bits d\'un mot binaire pour obtenir son complément à 1.',
    brief: '<p>Le script lit <strong>n lignes</strong> contenant chacune un <strong>binaire de 4 bits</strong>. ' +
      'Pour chaque ligne il calcule le complément à 1 — chaque bit 0 devient 1 et chaque bit 1 devient 0, ' +
      'première représentation des nombres signés vue en cours — et affiche ' +
      '<code>binaire : c1=XXXX</code>, puis le bilan <code>complements : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r binaire
  # À compléter : l'inversion de chaque bit, puis l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'La commande tr \'01\' \'10\' inverse tous les bits d\'un mot.',
      'Passe par une variable : c1=$(printf \'%s\' "$binaire" | tr ...).'
    ],
    examples: [
      { stdin: '3\n0110\n0000\n1010\n', expected: '0110 : c1=1001\n0000 : c1=1111\n1010 : c1=0101\ncomplements : 3' }
    ],
    tests: [
      { label: 'Inversion double', stdin: '4\n1111\n1001\n0011\n0101\n', expected: '1111 : c1=0000\n1001 : c1=0110\n0011 : c1=1100\n0101 : c1=1010\ncomplements : 4' },
      { label: 'Bords opposes', stdin: '3\n0001\n1110\n0111\n', expected: '0001 : c1=1110\n1110 : c1=0001\n0111 : c1=1000\ncomplements : 3' },
      { label: 'Poids fort a un', stdin: '2\n1000\n1101\n', expected: '1000 : c1=0111\n1101 : c1=0010\ncomplements : 2' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r binaire
  c1=$(printf '%s' "$binaire" | tr '01' '10')
  echo "$binaire : c1=$c1"
done
echo "complements : $n"
`
  },
  {
    id: 'ar-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Complement a deux',
    goal: 'Obtenir la représentation d\'un nombre négatif : complément à 1 puis ajout de 1.',
    brief: '<p>Le script lit <strong>n lignes</strong> contenant chacune un <strong>binaire de 4 bits</strong> ' +
      'représentant un nombre positif. Pour chaque ligne il calcule la représentation en complément à 2 de ' +
      'son opposé : on inverse les bits (complément à 1) puis on ajoute 1 — méthode officielle du support. ' +
      'Il affiche <code>binaire : c2=XXXX</code>, puis le bilan <code>complements : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r binaire
  # À compléter : valeur, complément à 2, reconstruction sur 4 bits.
done
# À compléter : le bilan.
`,
    hints: [
      'L\'opposé d\'une valeur v sur 4 bits vaut $(((16 - v) % 16)).',
      'Reconstruis le mot de 4 bits par divisions successives, du reste au quotient.'
    ],
    examples: [
      { stdin: '3\n0001\n0110\n1111\n', expected: '0001 : c2=1111\n0110 : c2=1010\n1111 : c2=0001\ncomplements : 3' }
    ],
    tests: [
      { label: 'Quatre opposés', stdin: '4\n0010\n0101\n1000\n0111\n', expected: '0010 : c2=1110\n0101 : c2=1011\n1000 : c2=1000\n0111 : c2=1001\ncomplements : 4' },
      { label: 'Du zero au grand', stdin: '3\n0000\n0011\n1100\n', expected: '0000 : c2=0000\n0011 : c2=1101\n1100 : c2=0100\ncomplements : 3' },
      { label: 'Verification croisee', stdin: '3\n1010\n1001\n1110\n', expected: '1010 : c2=0110\n1001 : c2=0111\n1110 : c2=0010\ncomplements : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r binaire
  v=$((2#$binaire))
  c2=$(( (16 - v) % 16 ))
  tmp=$c2
  res=""
  for ((j=0; j<4; j++)); do
    reste=$((tmp % 2))
    tmp=$((tmp / 2))
    res="$reste$res"
  done
  echo "$binaire : c2=$res"
done
echo "complements : $n"
`
  },
  {
    id: 'ar-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Addition binaire',
    goal: 'Poser l\'addition de deux binaires : retenues de proche en proche, débordement visible.',
    brief: '<p>Le script lit <strong>n lignes</strong> « a b » où a et b sont deux <strong>binaires de 4 bits</strong>. ' +
      'Pour chaque ligne il pose l\'addition binaire — 0+0 donne 0, 1+0 donne 1, 1+1 donne 0 avec retenue 1, ' +
      '1+1+1 donne 1 avec retenue 1 — et affiche le total sur 4 ou 5 bits : <code>a + b : somme=X</code>, ' +
      'puis le bilan <code>additions : n</code>. Le résultat dépasse parfois 4 bits : c\'est le débordement ' +
      'à observer.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b
  # À compléter : l'addition, la conversion du total en binaire.
done
# À compléter : le bilan.
`,
    hints: [
      'Bash additionne les bases : $((2#1010 + 2#0101)).',
      'Reconstruis le binaire du total par divisions successives, comme pour la conversion décimal vers binaire.'
    ],
    examples: [
      { stdin: '3\n1010 0101\n0110 0011\n1111 1111\n', expected: '1010 + 0101 : somme=1111\n0110 + 0011 : somme=1001\n1111 + 1111 : somme=11110\nadditions : 3' }
    ],
    tests: [
      { label: 'Avec retenues en chaine', stdin: '4\n0001 0001\n1101 0110\n1000 1000\n0000 0000\n', expected: '0001 + 0001 : somme=10\n1101 + 0110 : somme=10011\n1000 + 1000 : somme=10000\n0000 + 0000 : somme=0\nadditions : 4' },
      { label: 'Puissances de deux', stdin: '3\n0111 0001\n1010 1010\n0011 0100\n', expected: '0111 + 0001 : somme=1000\n1010 + 1010 : somme=10100\n0011 + 0100 : somme=111\nadditions : 3' },
      { label: 'Debordements', stdin: '3\n1110 0010\n0101 0110\n1001 0111\n', expected: '1110 + 0010 : somme=10000\n0101 + 0110 : somme=1011\n1001 + 0111 : somme=10000\nadditions : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b
  total=$(( (2#$a) + (2#$b) ))
  tmp=$total
  somme=""
  if [ "$tmp" -eq 0 ]; then
    somme="0"
  fi
  while [ "$tmp" -gt 0 ]; do
    reste=$((tmp % 2))
    tmp=$((tmp / 2))
    somme="$reste$somme"
  done
  echo "$a + $b : somme=$somme"
done
echo "additions : $n"
`
  },
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Circuits logiques combinatoires
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ar-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Portes logiques de base',
    goal: 'Retrouver la sortie des huit portes : NOT, AND, NAND, OR, NOR, XOR, NXOR.',
    brief: '<p>Le script lit <strong>n lignes</strong> « a b porte » : a et b valent 0 ou 1 et porte est un ' +
      'code parmi <code>and</code>, <code>or</code>, <code>xor</code>, <code>nand</code>, <code>nor</code> ou ' +
      '<code>xnor</code>. Rappel du support : AND donne 1 si les deux entrées valent 1, OR si au moins une ' +
      'vaut 1, XOR si elles diffèrent ; NAND, NOR et NXOR sont les négations des trois premières. Pour chaque ' +
      'ligne il affiche <code>a b : porte=X</code>, puis le bilan <code>bilan : n portes</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b porte
  # À compléter : la table de vérité de chaque porte, l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur la porte : and donne 1 si a et b valent 1, or si au moins un vaut 1, xor si a diffère de b.',
      'Nand, nor et xnor sont le contraire de and, or et xor.'
    ],
    examples: [
      { stdin: '3\n1 1 and\n1 0 or\n1 0 xor\n', expected: '1 1 : and=1\n1 0 : or=1\n1 0 : xor=1\nbilan : 3 portes' }
    ],
    tests: [
      { label: 'Les six portes', stdin: '6\n1 1 nand\n0 0 nor\n1 0 nand\n0 1 xnor\n1 1 nor\n0 0 and\n', expected: '1 1 : nand=0\n0 0 : nor=1\n1 0 : nand=1\n0 1 : xnor=0\n1 1 : nor=0\n0 0 : and=0\nbilan : 6 portes' },
      { label: 'Cas extremes', stdin: '4\n0 0 or\n0 1 and\n1 0 xnor\n1 1 xor\n', expected: '0 0 : or=0\n0 1 : and=0\n1 0 : xnor=0\n1 1 : xor=0\nbilan : 4 portes' },
      { label: 'Portes negatrices', stdin: '4\n1 1 xnor\n0 1 nor\n0 0 nand\n1 0 or\n', expected: '1 1 : xnor=1\n0 1 : nor=0\n0 0 : nand=1\n1 0 : or=1\nbilan : 4 portes' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b porte
  case "$porte" in
    and)  if [ "$a" -eq 1 ] && [ "$b" -eq 1 ]; then r=1; else r=0; fi ;;
    or)   if [ "$a" -eq 1 ] || [ "$b" -eq 1 ]; then r=1; else r=0; fi ;;
    xor)  if [ "$a" -ne "$b" ]; then r=1; else r=0; fi ;;
    nand) if [ "$a" -eq 1 ] && [ "$b" -eq 1 ]; then r=0; else r=1; fi ;;
    nor)  if [ "$a" -eq 1 ] || [ "$b" -eq 1 ]; then r=0; else r=1; fi ;;
    xnor) if [ "$a" -eq "$b" ]; then r=1; else r=0; fi ;;
  esac
  echo "$a $b : $porte=$r"
done
echo "bilan : $n portes"
`
  },
  {
    id: 'ar-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Additionneur complet 1 bit',
    goal: 'Simuler l\'additionneur : somme et retenue sortante à partir de a, b et de la retenue entrante.',
    brief: '<p>Le script lit <strong>n lignes</strong> « a b c » où a, b sont les deux bits à additionner et ' +
      'c la <strong>retenue entrante</strong>. Rappel du support : la somme vaut 1 quand le nombre de bits à 1 ' +
      'est impair, la retenue sortante vaut 1 dès que deux entrées au moins valent 1. Pour chaque ligne il ' +
      'affiche <code>a + b + c : somme=X retenue=Y</code>, puis le bilan <code>additions : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b c
  # À compléter : le total, la somme, la retenue, l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'Fais le total $((a + b + c)) : la somme est son reste modulo 2, la retenue son quotient par 2.',
      'Vérifie avec la table : 1+1+1 donne somme 1 et retenue 1.'
    ],
    examples: [
      { stdin: '3\n0 0 0\n1 0 0\n1 1 1\n', expected: '0 + 0 + 0 : somme=0 retenue=0\n1 + 0 + 0 : somme=1 retenue=0\n1 + 1 + 1 : somme=1 retenue=1\nadditions : 3' }
    ],
    tests: [
      { label: 'Les huit combinaisons partielles', stdin: '4\n0 0 1\n0 1 1\n1 0 1\n1 1 0\n', expected: '0 + 0 + 1 : somme=1 retenue=0\n0 + 1 + 1 : somme=0 retenue=1\n1 + 0 + 1 : somme=0 retenue=1\n1 + 1 + 0 : somme=0 retenue=1\nadditions : 4' },
      { label: 'Retour au calme', stdin: '3\n0 1 0\n1 0 0\n1 1 1\n', expected: '0 + 1 + 0 : somme=1 retenue=0\n1 + 0 + 0 : somme=1 retenue=0\n1 + 1 + 1 : somme=1 retenue=1\nadditions : 3' },
      { label: 'Sortie du zero', stdin: '2\n0 0 0\n1 1 0\n', expected: '0 + 0 + 0 : somme=0 retenue=0\n1 + 1 + 0 : somme=0 retenue=1\nadditions : 2' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b c
  total=$((a + b + c))
  somme=$((total % 2))
  retenue=$((total / 2))
  echo "$a + $b + $c : somme=$somme retenue=$retenue"
done
echo "additions : $n"
`
  },
  {
    id: 'ar-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Decodeur 2 vers 4',
    goal: 'Activer une seule sortie parmi quatre selon les deux bits d\'entrée.',
    brief: '<p>Le script lit <strong>n lignes</strong> « a b » : a est le bit de poids faible et b le bit de ' +
      'poids fort d\'une adresse de 2 bits. Le décodeur du support active une seule sortie : Y0 quand l\'adresse ' +
      'vaut 00, Y1 pour 01, Y2 pour 10 et Y3 pour 11 (a et b lus dans cet ordre : a d\'abord, b ensuite). Pour ' +
      'chaque ligne il affiche <code>a b : Y3Y2Y1Y0 = XXXX</code> où XXXX est le mot de sortie, puis le bilan ' +
      '<code>decodages : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b
  # À compléter : le mot de sortie selon l'adresse, l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'L\'indice de la sortie active vaut 2 fois b plus a.',
      'Un if imbrique ou un case sur les deux bits donne le mot de 4 caractères.'
    ],
    examples: [
      { stdin: '3\n0 0\n1 0\n1 1\n', expected: '0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\n1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 3' }
    ],
    tests: [
      { label: 'Les quatre adresses', stdin: '4\n0 1\n1 1\n0 0\n1 0\n', expected: '0 1 : Y3Y2Y1Y0 = 0100\n1 1 : Y3Y2Y1Y0 = 1000\n0 0 : Y3Y2Y1Y0 = 0001\n1 0 : Y3Y2Y1Y0 = 0010\ndecodages : 4' },
      { label: 'Alternance', stdin: '2\n1 0\n0 1\n', expected: '1 0 : Y3Y2Y1Y0 = 0010\n0 1 : Y3Y2Y1Y0 = 0100\ndecodages : 2' },
      { label: 'Adresse haute', stdin: '1\n1 1\n', expected: '1 1 : Y3Y2Y1Y0 = 1000\ndecodages : 1' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r a b
  if [ "$a" -eq 0 ] && [ "$b" -eq 0 ]; then
    code="0001"
  elif [ "$a" -eq 1 ] && [ "$b" -eq 0 ]; then
    code="0010"
  elif [ "$a" -eq 0 ] && [ "$b" -eq 1 ]; then
    code="0100"
  else
    code="1000"
  fi
  echo "$a $b : Y3Y2Y1Y0 = $code"
done
echo "decodages : $n"
`
  },
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Circuits séquentiels : bascules et compteur
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ar-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Bascule D',
    goal: 'Suivre l\'état d\'une bascule D : la sortie recopie l\'entrée à chaque front d\'horloge.',
    brief: '<p>Le script lit d\'abord <strong>n</strong> (nombre de fronts d\'horloge), puis <strong>n lignes</strong> ' +
      'contenant chacune la valeur <strong>d</strong> (0 ou 1) appliquée à l\'entrée D. Rappel du support : à ' +
      'chaque front d\'horloge, la bascule D recopie son entrée sur sa sortie Q. Pour chaque front il affiche ' +
      '<code>front i : Q=X</code>, puis <code>etat final : Q=X</code>.</p>',
    starter: `read -r n
q=0
for ((i=1; i<=n; i++)); do
  read -r d
  # À compléter : la mise à jour de Q, l'affichage du front.
done
# À compléter : l'état final.
`,
    hints: [
      'À chaque front, Q prend simplement la valeur de D.',
      'L\'état final s\'affiche une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '4\n1\n0\n1\n1\n', expected: 'front 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\netat final : Q=1' }
    ],
    tests: [
      { label: 'Cinq fronts', stdin: '5\n0\n0\n1\n0\n1\n', expected: 'front 1 : Q=0\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=0\nfront 5 : Q=1\netat final : Q=1' },
      { label: 'Reste a un', stdin: '3\n1\n1\n1\n', expected: 'front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=1\netat final : Q=1' },
      { label: 'Retour a zero', stdin: '4\n0\n1\n0\n0\n', expected: 'front 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0' }
    ],
    solution: `read -r n
q=0
for ((i=1; i<=n; i++)); do
  read -r d
  q=$d
  echo "front $i : Q=$q"
done
echo "etat final : Q=$q"
`
  },
  {
    id: 'ar-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Bascule JK',
    goal: 'Appliquer les quatre modes de la bascule JK : mémoriser, mettre à 1, mettre à 0, basculer.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « j k » (chaque valeur ' +
      'vaut 0 ou 1). Rappel du support : J=0 et K=0 mémorise l\'état, J=1 et K=0 met Q à 1 (set), J=0 et K=1 ' +
      'met Q à 0 (reset), J=1 et K=1 fait <strong>basculer</strong> Q (toggle). Pour chaque front il affiche ' +
      '<code>front i : Q=X</code>, puis <code>etat final : Q=X</code>.</p>',
    starter: `read -r n
q=0
for ((i=1; i<=n; i++)); do
  read -r j k
  # À compléter : les quatre modes, l'affichage du front.
done
# À compléter : l'état final.
`,
    hints: [
      'Un if imbrique sur j et k : 00 garde, 10 met à 1, 01 met à 0, 11 inverse.',
      'Pour le mode toggle : si Q vaut 0 il devient 1, sinon il devient 0.'
    ],
    examples: [
      { stdin: '4\n1 0\n0 0\n1 1\n0 1\n', expected: 'front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=0\nfront 4 : Q=0\netat final : Q=0' }
    ],
    tests: [
      { label: 'Basculements en serie', stdin: '5\n1 1\n1 1\n1 1\n0 0\n0 1\n', expected: 'front 1 : Q=1\nfront 2 : Q=0\nfront 3 : Q=1\nfront 4 : Q=1\nfront 5 : Q=0\netat final : Q=0' },
      { label: 'Set puis toggle', stdin: '3\n0 1\n1 0\n1 1\n', expected: 'front 1 : Q=0\nfront 2 : Q=1\nfront 3 : Q=0\netat final : Q=0' },
      { label: 'Memoire puis set', stdin: '4\n1 1\n0 0\n0 0\n1 0\n', expected: 'front 1 : Q=1\nfront 2 : Q=1\nfront 3 : Q=1\nfront 4 : Q=1\netat final : Q=1' }
    ],
    solution: `read -r n
q=0
for ((i=1; i<=n; i++)); do
  read -r j k
  if [ "$j" -eq 0 ] && [ "$k" -eq 0 ]; then
    q=$q
  elif [ "$j" -eq 1 ] && [ "$k" -eq 0 ]; then
    q=1
  elif [ "$j" -eq 0 ] && [ "$k" -eq 1 ]; then
    q=0
  else
    if [ "$q" -eq 0 ]; then q=1; else q=0; fi
  fi
  echo "front $i : Q=$q"
done
echo "etat final : Q=$q"
`
  },
  {
    id: 'ar-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Compteur modulo 8',
    goal: 'Simuler un compteur binaire qui revient à zéro après 8 fronts et compter ses retours à zéro.',
    brief: '<p>Le script lit d\'abord <strong>n</strong> (nombre de fronts d\'horloge), puis une ligne ' +
      '<strong>depart</strong> (valeur initiale entre 0 et 7). Le compteur avance de 1 à chaque front et revient ' +
      'à 0 après 7 (comptage modulo 8). Pour chaque front il affiche <code>front i : compteur=X</code>, puis ' +
      '<code>retours : k</code> où k est le nombre de fois où le compteur est repassé par 0 pendant la ' +
      'simulation.</p>',
    starter: `read -r n
read -r depart
# À compléter : la boucle des fronts, le comptage des retours a zero.
# À compléter : le bilan des retours.
`,
    hints: [
      'La valeur au front i vaut (depart + i) modulo 8.',
      'Le nombre de retours vaut (depart + n) divisé par 8, en division entière.'
    ],
    examples: [
      { stdin: '10\n6\n', expected: 'front 1 : compteur=7\nfront 2 : compteur=0\nfront 3 : compteur=1\nfront 4 : compteur=2\nfront 5 : compteur=3\nfront 6 : compteur=4\nfront 7 : compteur=5\nfront 8 : compteur=6\nfront 9 : compteur=7\nfront 10 : compteur=0\nretours : 2' }
    ],
    tests: [
      { label: 'Cinq fronts depuis trois', stdin: '5\n3\n', expected: 'front 1 : compteur=4\nfront 2 : compteur=5\nfront 3 : compteur=6\nfront 4 : compteur=7\nfront 5 : compteur=0\nretours : 1' },
      { label: 'Sans retour', stdin: '4\n0\n', expected: 'front 1 : compteur=1\nfront 2 : compteur=2\nfront 3 : compteur=3\nfront 4 : compteur=4\nretours : 0' },
      { label: 'Deux cycles complets', stdin: '16\n7\n', expected: 'front 1 : compteur=0\nfront 2 : compteur=1\nfront 3 : compteur=2\nfront 4 : compteur=3\nfront 5 : compteur=4\nfront 6 : compteur=5\nfront 7 : compteur=6\nfront 8 : compteur=7\nfront 9 : compteur=0\nfront 10 : compteur=1\nfront 11 : compteur=2\nfront 12 : compteur=3\nfront 13 : compteur=4\nfront 14 : compteur=5\nfront 15 : compteur=6\nfront 16 : compteur=7\nretours : 2' }
    ],
    solution: `read -r n
read -r depart
total=$((depart + n))
retours=$((total / 8))
for ((i=1; i<=n; i++)); do
  valeur=$(( (depart + i) % 8 ))
  echo "front $i : compteur=$valeur"
done
echo "retours : $retours"
`
  },
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Architecture PC : von Neumann, périphériques, qualification
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'ar-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Peripheriques : entree, sortie ou les deux',
    goal: 'Classer les périphériques entre entrée, sortie et entrée-sortie.',
    brief: '<p>Le script lit <strong>n lignes</strong> « peripherique typeannonce » : typeannonce est un code ' +
      'parmi <code>entree</code>, <code>sortie</code> ou <code>double</code>. Rappel du support : clavier, ' +
      'souris et scanner envoient des données vers l\'unité centrale (entrée) ; écran, imprimante et ' +
      'haut-parleur en reçoivent (sortie) ; écran tactile et modem font les deux. Pour chaque ligne il affiche ' +
      '<code>peripherique : OK</code> ou <code>peripherique : ERREUR</code>, puis <code>correctes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r peripherique typeannonce
  # À compléter : le type attendu, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le périphérique donne le type attendu ; compare-le au type annoncé.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nclavier entree\necran sortie\ntactile sortie\n', expected: 'clavier : OK\necran : OK\ntactile : ERREUR\ncorrectes : 2/3' }
    ],
    tests: [
      { label: 'Les huit peripheriques', stdin: '8\nclavier entree\nsouris entree\nscanner entree\necran sortie\nimprimante sortie\nhautparleur sortie\ntactile double\nmodem double\n', expected: 'clavier : OK\nsouris : OK\nscanner : OK\necran : OK\nimprimante : OK\nhautparleur : OK\ntactile : OK\nmodem : OK\ncorrectes : 8/8' },
      { label: 'Deux confusions', stdin: '4\nsouris sortie\nmodem entree\nscanner entree\nimprimante sortie\n', expected: 'souris : ERREUR\nmodem : ERREUR\nscanner : OK\nimprimante : OK\ncorrectes : 2/4' },
      { label: 'Bureau equipe', stdin: '5\nclavier entree\necran sortie\nimprimante sortie\ntactile double\nsouris entree\n', expected: 'clavier : OK\necran : OK\nimprimante : OK\ntactile : OK\nsouris : OK\ncorrectes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r peripherique typeannonce
  case "$peripherique" in
    clavier|souris|scanner) attendu="entree" ;;
    ecran|imprimante|hautparleur) attendu="sortie" ;;
    tactile|modem) attendu="double" ;;
  esac
  if [ "$typeannonce" = "$attendu" ]; then
    echo "$peripherique : OK"
    ok=$((ok + 1))
  else
    echo "$peripherique : ERREUR"
  fi
done
echo "correctes : $ok/$n"
`
  },
  {
    id: 'ar-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Les blocs de von Neumann',
    goal: 'Ranger chaque composant dans le bloc du modèle de von Neumann : calcul, contrôle, mémoire, E/S.',
    brief: '<p>Le script lit <strong>n lignes</strong> « bloc famille » : famille est un code parmi ' +
      '<code>calcul</code> (UAL), <code>controle</code> (unité de commande), <code>memoire</code> ou ' +
      '<code>es</code> (entrées-sorties). Rappel du support : l\'UAL fait les calculs, l\'unité de commande ' +
      'orchestre, la mémoire conserve (RAM, ROM, disque) et les E/S communiquent avec l\'extérieur (clavier, ' +
      'écran, imprimante). Pour chaque ligne il affiche <code>bloc : OK</code> ou <code>bloc : ERREUR</code>, ' +
      'puis <code>corrects : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r bloc famille
  # À compléter : la famille attendue, la comparaison, le compteur.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le bloc : ual va en calcul, ucc en contrôle, ram et rom et disque en mémoire, clavier et ecran et imprimante en E/S.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\nual calcul\nucc calcul\nram memoire\n', expected: 'ual : OK\nucc : ERREUR\nram : OK\ncorrects : 2/3' }
    ],
    tests: [
      { label: 'Les huit blocs', stdin: '8\nual calcul\nucc controle\nram memoire\nrom memoire\ndisque memoire\nclavier es\necran es\nimprimante es\n', expected: 'ual : OK\nucc : OK\nram : OK\nrom : OK\ndisque : OK\nclavier : OK\necran : OK\nimprimante : OK\ncorrects : 8/8' },
      { label: 'Deux erreurs ciblees', stdin: '4\ndisque es\nucc memoire\nrom memoire\nual calcul\n', expected: 'disque : ERREUR\nucc : ERREUR\nrom : OK\nual : OK\ncorrects : 2/4' },
      { label: 'Machine complete', stdin: '6\nucc controle\nram memoire\nclavier es\nual calcul\necran es\ndisque memoire\n', expected: 'ucc : OK\nram : OK\nclavier : OK\nual : OK\necran : OK\ndisque : OK\ncorrects : 6/6' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r bloc famille
  case "$bloc" in
    ual) attendu="calcul" ;;
    ucc) attendu="controle" ;;
    ram|rom|disque) attendu="memoire" ;;
    clavier|ecran|imprimante) attendu="es" ;;
  esac
  if [ "$famille" = "$attendu" ]; then
    echo "$bloc : OK"
    ok=$((ok + 1))
  else
    echo "$bloc : ERREUR"
  fi
done
echo "corrects : $ok/$n"
`
  },
  {
    id: 'ar-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Qualifier un poste de travail',
    goal: 'Classer des postes selon la fréquence du processeur et la RAM, critères de choix du support.',
    brief: '<p>Le script lit <strong>n lignes</strong> « frequence memoire » : frequence est la cadence du ' +
      'processeur en MHz et memoire la RAM en Mo. Règle du support adaptée : un poste est ' +
      '<code>multimedia</code> si la fréquence atteint 2000 MHz et la RAM 4096 Mo, <code>bureautique</code> ' +
      'si la fréquence atteint 1000 MHz et la RAM 2048 Mo, sinon <code>basique</code>. Pour chaque ligne il ' +
      'affiche <code>frequence memoire : profil</code>, puis le bilan <code>postes : n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r frequence memoire
  # À compléter : le profil selon les deux seuils, l'affichage.
done
# À compléter : le bilan.
`,
    hints: [
      'Teste d\'abord le profil le plus exigeant : -ge 2000 et -ge 4096, puis le profil intermédiaire.',
      'Sinon le poste est basique.'
    ],
    examples: [
      { stdin: '3\n2400 8192\n1500 2048\n800 1024\n', expected: '2400 8192 : multimedia\n1500 2048 : bureautique\n800 1024 : basique\npostes : 3' }
    ],
    tests: [
      { label: 'Aux frontieres des seuils', stdin: '4\n2200 4096\n2000 2048\n999 2048\n3000 512\n', expected: '2200 4096 : multimedia\n2000 2048 : bureautique\n999 2048 : basique\n3000 512 : basique\npostes : 4' },
      { label: 'Salles machine', stdin: '3\n1000 2048\n2600 16384\n500 512\n', expected: '1000 2048 : bureautique\n2600 16384 : multimedia\n500 512 : basique\npostes : 3' },
      { label: 'Petit parc', stdin: '2\n2100 8192\n1200 1024\n', expected: '2100 8192 : multimedia\n1200 1024 : basique\npostes : 2' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r frequence memoire
  if [ "$frequence" -ge 2000 ] && [ "$memoire" -ge 4096 ]; then
    profil="multimedia"
  elif [ "$frequence" -ge 1000 ] && [ "$memoire" -ge 2048 ]; then
    profil="bureautique"
  else
    profil="basique"
  fi
  echo "$frequence $memoire : $profil"
done
echo "postes : $n"
`
  }
];

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Généralités sur le droit
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dr-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Droit objectif et droits subjectifs',
    goal: 'Trier des énoncés entre règles de droit (objectif) et prérogatives (subjectif), puis dresser le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « type libelle » : type vaut <code>o</code> (objectif) ' +
      'ou <code>s</code> (subjectif). Pour chaque ligne il affiche <code>libelle : categorie</code>, où ' +
      'categorie vaut <code>regle</code> (objectif) ou <code>prerogative</code> (subjectif). Enfin il affiche ' +
      '<code>bilan : X regles / Y prerogatives</code>, X et Y étant les compteurs.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r type libelle
  # À compléter : afficher la catégorie, puis compter.
done
`,
    hints: [
      'Deux compteurs posés à 0 avant la boucle, incrémentés dans les branches du if.',
      'Le bilan sort après la boucle, au format exact « X regles / Y prerogatives ».'
    ],
    examples: [
      { stdin: '3\no code civil\ns droit de propriete\no reglement\n', expected: 'code civil : regle\ndroit de propriete : prerogative\nreglement : regle\nbilan : 2 regles / 1 prerogatives' }
    ],
    tests: [
      { label: 'Une seule prérogative', stdin: '1\ns droit de vote\n', expected: 'droit de vote : prerogative\nbilan : 0 regles / 1 prerogatives' },
      { label: 'Deux règles', stdin: '2\no loi\no decret\n', expected: 'loi : regle\ndecret : regle\nbilan : 2 regles / 0 prerogatives' },
      { label: 'Cinq éléments mixtes', stdin: '5\no code penal\ns droit a l image\no coutume\ns droit de propriete\no arrrete\n', expected: 'code penal : regle\ndroit a l image : prerogative\ncoutume : regle\ndroit de propriete : prerogative\narrrete : regle\nbilan : 3 regles / 2 prerogatives' }
    ],
    solution: `read -r n
regles=0
prerogatives=0
for ((i=0; i<n; i++)); do
  read -r type libelle
  if [ "$type" = "o" ]; then
    echo "$libelle : regle"
    regles=$((regles + 1))
  else
    echo "$libelle : prerogative"
    prerogatives=$((prerogatives + 1))
  fi
done
echo "bilan : $regles regles / $prerogatives prerogatives"
`
  },
  {
    id: 'dr-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les caractères de la règle de droit',
    goal: 'Vérifier qu\'un texte proposé remplit les deux caractères de la règle de droit : générale/abstraite et obligatoire/coercitive.',
    brief: '<p>Le script lit <strong>n lignes</strong> « general obligatoire texte » : general et obligatoire ' +
      'valent <code>oui</code> ou <code>non</code>. Le texte est une <code>regle de droit</code> si les deux ' +
      'valent oui ; <code>regle morale</code> si la règle est générale mais non coercitive ; ' +
      '<code>mesure individuelle</code> dans les autres cas. Pour chaque ligne il affiche ' +
      '<code>texte : qualification</code>. Il termine par <code>regles de droit : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r general obligatoire texte
  # À compléter : qualifier, puis compter les vraies règles de droit.
done
`,
    hints: [
      'Trois qualifications : oui/oui → règle de droit ; oui/non → règle morale ; le reste → mesure individuelle.',
      'Incrémentez seulement dans la branche « regle de droit ».'
    ],
    examples: [
      { stdin: '3\noui oui tout voleur sera puni\noui non il faut etre honnete\nnon oui le client Kossi payera 5000\n', expected: 'tout voleur sera puni : regle de droit\nil faut etre honnete : regle morale\nle client Kossi payera 5000 : mesure individuelle\nregles de droit : 1/3' }
    ],
    tests: [
      { label: 'Une seule règle', stdin: '1\noui oui nul n ignore la loi\n', expected: 'nul n ignore la loi : regle de droit\nregles de droit : 1/1' },
      { label: 'Une mesure individuelle', stdin: '1\nnon oui l entreprise X est fermee\n', expected: 'l entreprise X est fermee : mesure individuelle\nregles de droit : 0/1' },
      { label: 'Quatre textes mixtes', stdin: '4\noui oui la loi interdit le vol\noui non la charite est recommandee\nnon non avis interne\noui oui la loi fixe la majorite\n', expected: 'la loi interdit le vol : regle de droit\nla charite est recommandee : regle morale\navis interne : mesure individuelle\nla loi fixe la majorite : regle de droit\nregles de droit : 2/4' }
    ],
    solution: `read -r n
regles=0
for ((i=0; i<n; i++)); do
  read -r general obligatoire texte
  if [ "$general" = "oui" ] && [ "$obligatoire" = "oui" ]; then
    echo "$texte : regle de droit"
    regles=$((regles + 1))
  elif [ "$general" = "oui" ]; then
    echo "$texte : regle morale"
  else
    echo "$texte : mesure individuelle"
  fi
done
echo "regles de droit : $regles/$n"
`
  },
  {
    id: 'dr-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Les sanctions de la règle de droit',
    goal: 'Classer des sanctions par nature (pénale, civile, administrative, disciplinaire) et dresser la répartition.',
    brief: '<p>Le script lit <strong>n lignes</strong> « sanction nature » : nature vaut <code>pen</code>, ' +
      '<code>civ</code>, <code>adm</code> ou <code>dis</code>. Pour chaque ligne il affiche ' +
      '<code>sanction : nature_complete</code>, où nature_complete vaut <code>penale</code>, ' +
      '<code>civile</code>, <code>administrative</code> ou <code>disciplinaire</code>. Il termine par quatre ' +
      'lignes de comptage, toujours dans cet ordre : <code>penales : X</code>, <code>civiles : X</code>, ' +
      '<code>administratives : X</code> et <code>disciplinaires : X</code>.</p>',
    starter: `read -r n
pen=0
civ=0
adm=0
dis=0
for ((i=0; i<n; i++)); do
  read -r sanction nature
  # À compléter : afficher la nature complète et compter.
done
# À compléter : les quatre lignes de comptage.
`,
    hints: [
      'Un case à quatre branches remplit les deux rôles : afficher et incrémenter.',
      'Les quatre totaux sortent après la boucle, dans l\'ordre demandé, même quand le compteur vaut 0.'
    ],
    examples: [
      { stdin: '3\namende pen\ndommages civ\nlicenciement dis\n', expected: 'amende : penale\ndommages : civile\nlicenciement : disciplinaire\npenales : 1\nciviles : 1\nadministratives : 0\ndisciplinaires : 1' }
    ],
    tests: [
      { label: 'Une seule sanction', stdin: '1\nemprisonnement pen\n', expected: 'emprisonnement : penale\npenales : 1\nciviles : 0\nadministratives : 0\ndisciplinaires : 0' },
      { label: 'Deux administratives', stdin: '2\nsuspension adm\nretrait adm\n', expected: 'suspension : administrative\nretrait : administrative\npenales : 0\nciviles : 0\nadministratives : 2\ndisciplinaires : 0' },
      { label: 'Cinq sanctions mixtes', stdin: '5\namende pen\nblame dis\nretrait adm\ndommages civ\nemprisonnement pen\n', expected: 'amende : penale\nblame : disciplinaire\nretrait : administrative\ndommages : civile\nemprisonnement : penale\npenales : 2\nciviles : 1\nadministratives : 1\ndisciplinaires : 1' }
    ],
    solution: `read -r n
pen=0
civ=0
adm=0
dis=0
for ((i=0; i<n; i++)); do
  read -r sanction nature
  case "$nature" in
    pen) echo "$sanction : penale" ; pen=$((pen + 1)) ;;
    civ) echo "$sanction : civile" ; civ=$((civ + 1)) ;;
    adm) echo "$sanction : administrative" ; adm=$((adm + 1)) ;;
    dis) echo "$sanction : disciplinaire" ; dis=$((dis + 1)) ;;
  esac
done
echo "penales : $pen"
echo "civiles : $civ"
echo "administratives : $adm"
echo "disciplinaires : $dis"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Les sources du droit
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dr-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Sources directes et indirectes',
    goal: 'Classer les sources du droit entre directes (loi, coutume) et indirectes (jurisprudence, doctrine).',
    brief: '<p>Le script lit <strong>n lignes</strong> « source categorie » : categorie vaut <code>d</code> ' +
      '(directe) ou <code>i</code> (indirecte). Pour chaque ligne il affiche <code>source : poids</code>, où ' +
      'poids vaut <code>principale</code> (directe) ou <code>interpretative</code> (indirecte). Il termine par ' +
      '<code>sources directes : X/n</code>, X étant le nombre de sources directes.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r source categorie
  # À compléter : afficher le poids, puis compter les directes.
done
`,
    hints: [
      'Un if sur la catégorie suffit : d et i sont les deux seules valeurs.',
      'Le compteur suit exactement les lignes « principale ».'
    ],
    examples: [
      { stdin: '4\nloi d\ncoutume d\njurisprudence i\ndoctrine i\n', expected: 'loi : principale\ncoutume : principale\njurisprudence : interpretative\ndoctrine : interpretative\nsources directes : 2/4' }
    ],
    tests: [
      { label: 'Une seule source', stdin: '1\ncoutume d\n', expected: 'coutume : principale\nsources directes : 1/1' },
      { label: 'Deux indirectes', stdin: '2\njurisprudence i\ndoctrine i\n', expected: 'jurisprudence : interpretative\ndoctrine : interpretative\nsources directes : 0/2' },
      { label: 'Cinq sources mixtes', stdin: '5\nloi d\ndoctrine i\ncoutume d\narrets i\nreglement d\n', expected: 'loi : principale\ndoctrine : interpretative\ncoutume : principale\narrets : interpretative\nreglement : principale\nsources directes : 3/5' }
    ],
    solution: `read -r n
directes=0
for ((i=0; i<n; i++)); do
  read -r source categorie
  if [ "$categorie" = "d" ]; then
    echo "$source : principale"
    directes=$((directes + 1))
  else
    echo "$source : interpretative"
  fi
done
echo "sources directes : $directes/$n"
`
  },
  {
    id: 'dr-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Du vote à l\'entrée en vigueur',
    goal: 'Reconstituer la chronologie d\'établissement d\'une loi : adoption, promulgation, parution, jour franc, entrée en vigueur.',
    brief: '<p>Le script lit <strong>n lignes</strong> « jour etape » : jour est un entier croissant ' +
      '(numéro du jour) et l\'étape appartient à la séquence <code>adoption</code> (1), <code>promulgation</code> ' +
      '(2), <code>parution</code> (3), <code>jourfranc</code> (4), <code>vigueur</code> (5). Le script vérifie ' +
      'que les étapes arrivent dans cet ordre. Pour chaque ligne il affiche <code>etape : ok</code> ou ' +
      '<code>etape : hors sequence</code>. Il termine par <code>sequence : X/n valides</code>.</p>',
    starter: `read -r n
suivante=1
for ((i=0; i<n; i++)); do
  read -r jour etape
  # À compléter : vérifier l'ordre attendu des étapes.
done
`,
    hints: [
      'La variable suivante contient le rang de l\'étape attendue (1 à 5) : mappez chaque étape à son rang et comparez.',
      'Une étape hors séquence lève un drapeau : tout ce qui suit est hors séquence, même si l\'étape redevient attendue.'
    ],
    examples: [
      { stdin: '5\n1 adoption\n2 promulgation\n3 parution\n4 jourfranc\n5 vigueur\n', expected: 'adoption : ok\npromulgation : ok\nparution : ok\njourfranc : ok\nvigueur : ok\nsequence : 5/5 valides' }
    ],
    tests: [
      { label: 'Une seule étape', stdin: '1\n1 adoption\n', expected: 'adoption : ok\nsequence : 1/1 valides' },
      { label: 'Jour franc oublié', stdin: '4\n1 adoption\n2 promulgation\n3 parution\n5 vigueur\n', expected: 'adoption : ok\npromulgation : ok\nparution : ok\nvigueur : hors sequence\nsequence : 3/4 valides' },
      { label: 'Promulgation répétée', stdin: '3\n1 adoption\n2 promulgation\n2 promulgation\n', expected: 'adoption : ok\npromulgation : ok\npromulgation : hors sequence\nsequence : 2/3 valides' }
    ],
    solution: `read -r n
suivante=1
rompu=0
valides=0
for ((i=0; i<n; i++)); do
  read -r jour etape
  rang=0
  case "$etape" in
    adoption) rang=1 ;;
    promulgation) rang=2 ;;
    parution) rang=3 ;;
    jourfranc) rang=4 ;;
    vigueur) rang=5 ;;
  esac
  if [ "$rompu" = "0" ] && [ "$rang" = "$suivante" ]; then
    echo "$etape : ok"
    valides=$((valides + 1))
    suivante=$((suivante + 1))
  else
    rompu=1
    echo "$etape : hors sequence"
  fi
done
echo "sequence : $valides/$n valides"
`
  },
  {
    id: 'dr-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'La pyramide des normes',
    goal: 'Appliquer la hiérarchie des normes : contrôler la conformité de chaque norme à sa norme supérieure.',
    brief: '<p>Le script lit <strong>n lignes</strong> « niveau texte » : niveau vaut <code>const</code> ' +
      '(constitution), <code>trait</code> (traité), <code>loi</code> ou <code>regl</code> (règlement). Il ' +
      'vérifie que les niveaux arrivent en ordre décroissant de la pyramide (const, puis trait, puis loi, ' +
      'puis regl — chaque niveau peut apparaître plusieurs fois). Pour chaque ligne il affiche ' +
      '<code>texte : conforme</code> si le niveau respecte l\'ordre, <code>texte : viole la hierarchie</code> ' +
      'sinon. Il termine par <code>pyramide : X/n conformes</code>. La loi l\'emporte sur le règlement en cas ' +
      'de conflit : toute inversion fait basculer les lignes suivantes.</p>',
    starter: `read -r n
rang_actuel=4
for ((i=0; i<n; i++)); do
  read -r niveau texte
  # À compléter : chaque niveau doit être inférieur ou égal au précédent (rang décroissant).
done
`,
    hints: [
      'Attribuez un rang : const = 4, trait = 3, loi = 2, regl = 1 ; l\'ordre pyramidal impose rang ≤ rang_actuel.',
      'Mettez à jour rang_actuel à chaque ligne conforme ; une inversion rompt le reste.'
    ],
    examples: [
      { stdin: '4\nconst constitution 2024\ntrait traites OUA\nloi code du travail\nregl decret d application\n', expected: 'constitution 2024 : conforme\ntraites OUA : conforme\ncode du travail : conforme\ndecret d application : conforme\npyramide : 4/4 conformes' }
    ],
    tests: [
      { label: 'Une seule constitution', stdin: '1\nconst constitution\n', expected: 'constitution : conforme\npyramide : 1/1 conformes' },
      { label: 'Règlement avant la loi', stdin: '2\nregl arrete ministeriel\nloi code des impots\n', expected: 'arrete ministeriel : conforme\ncode des impots : viole la hierarchie\npyramide : 1/2 conformes' },
      { label: 'Cinq normes mixtes', stdin: '5\nconst constitution\nloi loi organique\nregl decret\nloi loi ordinaire\nregl arrrete\n', expected: 'constitution : conforme\nloi organique : conforme\ndecret : conforme\nloi ordinaire : viole la hierarchie\narrrete : viole la hierarchie\npyramide : 3/5 conformes' }
    ],
    solution: `read -r n
rang_actuel=4
rompu=0
conformes=0
for ((i=0; i<n; i++)); do
  read -r niveau texte
  rang=0
  case "$niveau" in
    const) rang=4 ;;
    trait) rang=3 ;;
    loi) rang=2 ;;
    regl) rang=1 ;;
  esac
  if [ "$rompu" = "0" ] && [ "$rang" -le "$rang_actuel" ]; then
    echo "$texte : conforme"
    conformes=$((conformes + 1))
    rang_actuel=$rang
  else
    rompu=1
    echo "$texte : viole la hierarchie"
  fi
done
echo "pyramide : $conformes/$n conformes"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — L'organisation judiciaire
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dr-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Les juridictions de droit commun',
    goal: 'Router un dossier vers la bonne juridiction : TPI, Cour d\'Appel ou Cour Suprême.',
    brief: '<p>Le script lit <strong>n lignes</strong> « dossier degre » : degre vaut <code>1</code> ' +
      '(première instance : TPI), <code>2</code> (appel) ou <code>3</code> (cassation). Pour chaque ligne il ' +
      'affiche <code>degre : juridiction</code>, où juridiction vaut <code>TPI</code>, ' +
      '<code>Cour d Appel</code> ou <code>Cour Supreme</code>. Il termine par ' +
      '<code>dossiers premier degre : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r degre dossier
  # À compléter : router vers la juridiction, compter les premiers degrés.
done
`,
    hints: [
      'Un case à trois branches traduit le degré en juridiction.',
      'Comptez seulement les dossiers de premier degré (TPI).'
    ],
    examples: [
      { stdin: '4\n1 D001\n2 D002\n3 D003\n1 D004\n', expected: 'D001 : TPI\nD002 : Cour d Appel\nD003 : Cour Supreme\nD004 : TPI\ndossiers premier degre : 2/4' }
    ],
    tests: [
      { label: 'Un seul pourvoi', stdin: '1\n3 X\n', expected: 'X : Cour Supreme\ndossiers premier degre : 0/1' },
      { label: 'Deux appels', stdin: '2\n2 B\n2 C\n', expected: 'B : Cour d Appel\nC : Cour d Appel\ndossiers premier degre : 0/2' },
      { label: 'Cinq dossiers mixtes', stdin: '5\n1 A\n2 B\n1 C\n3 D\n2 E\n', expected: 'A : TPI\nB : Cour d Appel\nC : TPI\nD : Cour Supreme\nE : Cour d Appel\ndossiers premier degre : 2/5' }
    ],
    solution: `read -r n
premiers=0
for ((i=0; i<n; i++)); do
  read -r degre dossier
  case "$degre" in
    1) echo "$dossier : TPI" ; premiers=$((premiers + 1)) ;;
    2) echo "$dossier : Cour d Appel" ;;
    3) echo "$dossier : Cour Supreme" ;;
  esac
done
echo "dossiers premier degre : $premiers/$n"
`
  },
  {
    id: 'dr-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Le double degré de juridiction',
    goal: 'Vérifier le principe du double degré : chaque appel doit correspondre à une affaire jugée en première instance.',
    brief: '<p>Le script lit <strong>n lignes</strong> « acte affaire » : acte vaut <code>jugement</code> ou ' +
      '<code>appel</code>. Un appel est <code>recevable</code> si l\'affaire a déjà fait l\'objet d\'un ' +
      'jugement (première instance), <code>irrecevable</code> sinon (rien à appeler). Pour chaque ligne il ' +
      'affiche <code>acte affaire : statut</code> ou <code>appel affaire : irrecevable</code>. Il termine par ' +
      '<code>appels recevables : X</code>. Un même affaire peut être jugée puis appelée, une seule fois ' +
      'chacune ; un appel sur affaire déjà appelée est irrecevable.</p>',
    starter: `read -r n
declare -A juges
declare -A appeles
for ((i=0; i<n; i++)); do
  read -r acte affaire
  # À compléter : enregistrer les jugements, contrôler les appels.
done
`,
    hints: [
      'Deux tableaux associatifs : juges[affaire]=1 à chaque jugement, appeles[affaire]=1 à chaque appel.',
      'Un appel est recevable si juges[affaire] existe et appeles[affaire] n\'existe pas.'
    ],
    examples: [
      { stdin: '4\njugement A\nappel A\nappel B\nappel A\n', expected: 'jugement A : ok\nappel A : recevable\nappel B : irrecevable\nappel A : irrecevable\nappels recevables : 1' }
    ],
    tests: [
      { label: 'Un appel direct', stdin: '1\nappel A\n', expected: 'appel A : irrecevable\nappels recevables : 0' },
      { label: 'Deux jugements deux appels', stdin: '4\njugement A\njugement B\nappel A\nappel B\n', expected: 'jugement A : ok\njugement B : ok\nappel A : recevable\nappel B : recevable\nappels recevables : 2' },
      { label: 'Cinq actes mixtes', stdin: '5\njugement A\nappel A\njugement B\nappel B\nappel B\n', expected: 'jugement A : ok\nappel A : recevable\njugement B : ok\nappel B : recevable\nappel B : irrecevable\nappels recevables : 2' }
    ],
    solution: `read -r n
declare -A juges
declare -A appeles
recevables=0
for ((i=0; i<n; i++)); do
  read -r acte affaire
  if [ "$acte" = "jugement" ]; then
    juges[$affaire]=1
    echo "$acte $affaire : ok"
  else
    if [ -n "\${juges[$affaire]:-}" ] && [ -z "\${appeles[$affaire]:-}" ]; then
      appeles[$affaire]=1
      echo "appel $affaire : recevable"
      recevables=$((recevables + 1))
    else
      echo "appel $affaire : irrecevable"
    fi
  fi
done
echo "appels recevables : $recevables"
`
  },
  {
    id: 'dr-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Nul ne peut se faire justice',
    goal: 'Traiter un registre de litiges : la justice revient à l\'État, les vengeances privées sont sanctionnées.',
    brief: '<p>Le script lit <strong>n lignes</strong> « victoire action » : action vaut <code>plainte</code> ' +
      '(voie légale) ou <code>riposte</code> (justice privée). Une riposte produit ' +
      '<code>sanction : riposte</code> et une amende (lue en fin : <code>amende</code> entier). Une plainte ' +
      'produit <code>audience : victoire</code>. En fin de script : une ligne par riposte ' +
      '<code>sanction : amende de X</code> (X = amende par riposte), puis <code>justice privee : X cas</code> ' +
      'et <code>voie legale : Y cas</code>.</p>',
    starter: `read -r n
declare -A ripostes
for ((i=0; i<n; i++)); do
  read -r victoire action
  # À compléter : juger chaque ligne, retenir les ripostes.
done
read -r amende
# À compléter : sanctions et bilan.
`,
    hints: [
      'Retenez les victoires qui ont riposté dans un tableau ; comptez aussi les deux catégories.',
      'Les amendes s\'affichent après la lecture de l\'amende, une ligne par riposte dans l\'ordre d\'apparition.'
    ],
    examples: [
      { stdin: '4\nKossi plainte\nAma riposte\nYao plainte\nKoffi riposte\n2000\n', expected: 'Kossi : audience\nAma : sanction\nYao : audience\nKoffi : sanction\namende de 2000\namende de 2000\njustice privee : 2 cas\nvoie legale : 2 cas' }
    ],
    tests: [
      { label: 'Une seule plainte', stdin: '1\nKossi plainte\n1000\n', expected: 'Kossi : audience\njustice privee : 0 cas\nvoie legale : 1 cas' },
      { label: 'Que des ripostes', stdin: '2\nAma riposte\nYao riposte\n500\n', expected: 'Ama : sanction\nYao : sanction\namende de 500\namende de 500\njustice privee : 2 cas\nvoie legale : 0 cas' },
      { label: 'Cinq lignes mixtes', stdin: '5\nA plainte\nB riposte\nC plainte\nD riposte\nE riposte\n750\n', expected: 'A : audience\nB : sanction\nC : audience\nD : sanction\nE : sanction\namende de 750\namende de 750\namende de 750\njustice privee : 3 cas\nvoie legale : 2 cas' }
    ],
    solution: `read -r n
declare -A ripostes
jp=0
vl=0
for ((i=0; i<n; i++)); do
  read -r victoire action
  if [ "$action" = "plainte" ]; then
    echo "$victoire : audience"
    vl=$((vl + 1))
  else
    echo "$victoire : sanction"
    ripostes[$victoire]=1
    jp=$((jp + 1))
  fi
done
read -r amende
for coupable in "\${!ripostes[@]}"; do
  echo "amende de $amende"
done
echo "justice privee : $jp cas"
echo "voie legale : $vl cas"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — La personnalité juridique
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dr-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Personnes physiques et morales',
    goal: 'Classer les sujets de droit entre personnes physiques et morales, puis entre droit public et privé.',
    brief: '<p>Le script lit <strong>n lignes</strong> « sujet type » : type vaut <code>phys</code>, ' +
      '<code>morp</code> (morale de droit public) ou <code>morv</code> (morale de droit privé). Pour chaque ' +
      'ligne il affiche <code>sujet : categorie</code> où categorie vaut <code>personne physique</code>, ' +
      '<code>morale publique</code> ou <code>morale privee</code>. Il termine par <code>personnes : X/n</code>, ' +
      'X étant le nombre de personnes morales (publiques + privées).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r sujet type
  # À compléter : classifier, compter les personnes morales.
done
`,
    hints: [
      'Trois types, trois catégories : un case à trois branches.',
      'Les personnes morales = morp + morv, comptées ensemble.'
    ],
    examples: [
      { stdin: '4\nKossi phys\nEtat morp\nSARL morv\nAssociation morv\n', expected: 'Kossi : personne physique\nEtat : morale publique\nSARL : morale privee\nAssociation : morale privee\npersonnes : 3/4' }
    ],
    tests: [
      { label: 'Une seule personne', stdin: '1\nAma phys\n', expected: 'Ama : personne physique\npersonnes : 0/1' },
      { label: 'Deux publiques', stdin: '2\nEtat morp\nCommune morp\n', expected: 'Etat : morale publique\nCommune : morale publique\npersonnes : 2/2' },
      { label: 'Cinq sujets mixtes', stdin: '5\nKossi phys\nUniversite morp\nSARL morv\nFondation morv\nAma phys\n', expected: 'Kossi : personne physique\nUniversite : morale publique\nSARL : morale privee\nFondation : morale privee\nAma : personne physique\npersonnes : 3/5' }
    ],
    solution: `read -r n
morales=0
for ((i=0; i<n; i++)); do
  read -r sujet type
  case "$type" in
    phys) echo "$sujet : personne physique" ;;
    morp) echo "$sujet : morale publique" ; morales=$((morales + 1)) ;;
    morv) echo "$sujet : morale privee" ; morales=$((morales + 1)) ;;
  esac
done
echo "personnes : $morales/$n"
`
  },
  {
    id: 'dr-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Naissance, décès, absence, disparition',
    goal: 'Déterminer si une personne physique a la personnalité juridique selon son état civil.',
    brief: '<p>Le script lit <strong>n lignes</strong> « nom situation » : situation vaut <code>naissance</code>, ' +
      '<code>vivant</code>, <code>deces</code>, <code>absent</code> (sans nouvelles depuis 5 ans) ou ' +
      '<code>disparu</code> (corps introuvable, décès probable). La personnalité existe pour naissance, ' +
      'vivant et disparu (présomption de décès) ; elle est éteinte pour deces ; pour absent, elle subsiste ' +
      'jusqu\'à la déclaration d\'absence : le script affiche <code>en instance</code>. Pour chaque ligne il ' +
      'affiche <code>nom : verdict</code> où verdict vaut <code>titulaire</code>, <code>en instance</code> ou ' +
      '<code>eteinte</code>. Il termine par <code>titulaires : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r nom situation
  # À compléter : statuer sur la personnalité.
done
`,
    hints: [
      'Un case à cinq situations, trois verdicts : titulaire (naissance, vivant, disparu), en instance (absent), éteinte (deces).',
      'Comptez seulement les titulaires.'
    ],
    examples: [
      { stdin: '4\nbebe naissance\nKossi vivant\nTante deces\nVoyageur disparu\n', expected: 'bebe : titulaire\nKossi : titulaire\nTante : eteinte\nVoyageur : titulaire\ntitulaires : 3/4' }
    ],
    tests: [
      { label: 'Un absent', stdin: '1\nExile absent\n', expected: 'Exile : en instance\ntitulaires : 0/1' },
      { label: 'Un décès', stdin: '1\nFeu deces\n', expected: 'Feu : eteinte\ntitulaires : 0/1' },
      { label: 'Cinq situations', stdin: '5\nA naissance\nB vivant\nC absent\nD deces\nE disparu\n', expected: 'A : titulaire\nB : titulaire\nC : en instance\nD : eteinte\nE : titulaire\ntitulaires : 3/5' }
    ],
    solution: `read -r n
titulaires=0
for ((i=0; i<n; i++)); do
  read -r nom situation
  case "$situation" in
    naissance) echo "$nom : titulaire" ; titulaires=$((titulaires + 1)) ;;
    vivant) echo "$nom : titulaire" ; titulaires=$((titulaires + 1)) ;;
    disparu) echo "$nom : titulaire" ; titulaires=$((titulaires + 1)) ;;
    absent) echo "$nom : en instance" ;;
    deces) echo "$nom : eteinte" ;;
  esac
done
echo "titulaires : $titulaires/$n"
`
  },
  {
    id: 'dr-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'L\'enfant conçu et la succession',
    goal: 'Appliquer la règle de l\'enfant simplement conçu : la personnalité peut remonter à la conception.',
    brief: '<p>Le script lit <strong>n lignes</strong> « heritier annee_naissance annee_deces condition » : ' +
      'condition vaut <code>ne</code> (né vivant et viable à l\'ouverture de la succession) ou ' +
      '<code>concu</code> (simplement conçu). L\'héritier recueille si : né (naissance ≤ décès) ou conçu ' +
      'avec naissance ≥ décès (l\'enfant à naître). Pour chaque ligne il affiche <code>heritier : succede</code> ' +
      'ou <code>heritier : ecarte</code>. Il termine par <code>succession : X/n parts</code>, X étant le nombre ' +
      'd\'héritiers qui succèdent.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r heritier naissance deces condition
  # À compléter : statuer sur chaque héritier.
done
`,
    hints: [
      'Né : la naissance est antérieure ou égale au décès. Conçu : la naissance vient après le décès (personnalité remontée à la conception).',
      'Comparez avec -le et -gt sur les années ; comptez les parts qui succèdent.'
    ],
    examples: [
      { stdin: '3\naine 1990 2024 ne\ncadet 2024 2024 ne\nconcu 2025 2024 concu\n', expected: 'aine : succede\ncadet : succede\nconcu : succede\nsuccession : 3/3 parts' }
    ],
    tests: [
      { label: 'Héritier né après', stdin: '1\ntardif 2030 2024 ne\n', expected: 'tardif : ecarte\nsuccession : 0/1 parts' },
      { label: 'Deux conçus', stdin: '2\npremier 2025 2024 concu\nsecond 2026 2024 concu\n', expected: 'premier : succede\nsecond : succede\nsuccession : 2/2 parts' },
      { label: 'Cinq héritiers mixtes', stdin: '5\nA 1980 2024 ne\nB 2030 2024 ne\nC 2025 2024 concu\nD 1990 2024 ne\nE 2040 2024 ne\n', expected: 'A : succede\nB : ecarte\nC : succede\nD : succede\nE : ecarte\nsuccession : 3/5 parts' }
    ],
    solution: `read -r n
parts=0
for ((i=0; i<n; i++)); do
  read -r heritier naissance deces condition
  if [ "$condition" = "ne" ]; then
    if [ "$naissance" -le "$deces" ]; then
      echo "$heritier : succede"
      parts=$((parts + 1))
    else
      echo "$heritier : ecarte"
    fi
  else
    if [ "$naissance" -gt "$deces" ]; then
      echo "$heritier : succede"
      parts=$((parts + 1))
    else
      echo "$heritier : ecarte"
    fi
  fi
done
echo "succession : $parts/$n parts"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — L'application de la loi dans le temps
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dr-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Le jour franc',
    goal: 'Calculer la date d\'entrée en vigueur d\'une loi : parution au journal officiel, puis jour franc.',
    brief: '<p>Le script lit <strong>n lignes</strong> « loi jour_parution » (jour entier). La loi entre en ' +
      'vigueur 24 heures après la parution : jour de vigueur = jour_parution + 1. Pour chaque ligne il ' +
      'affiche <code>loi : vigueur au jour X</code>. Il termine par <code>lois en vigueur : X/n</code> avec ' +
      'X = nombre de lois dont le jour de parution est strictement positif (parution valide).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r loi jour
  # À compléter : calculer la vigueur, compter les parutions valides.
done
`,
    hints: [
      'Le calcul est un simple jour + 1, affiché dans la phrase exacte.',
      'Validez la parution : jour > 0 (sinon la ligne ne compte pas comme loi parue).'
    ],
    examples: [
      { stdin: '3\nloiA 3\nloiB 4\nloiC 0\n', expected: 'loiA : vigueur au jour 4\nloiB : vigueur au jour 5\nloiC : parution invalide\nlois en vigueur : 2/3' }
    ],
    tests: [
      { label: 'Une seule loi', stdin: '1\nloiA 1\n', expected: 'loiA : vigueur au jour 2\nlois en vigueur : 1/1' },
      { label: 'Deux parutions valides', stdin: '2\nloiB 10\nloiC 29\n', expected: 'loiB : vigueur au jour 11\nloiC : vigueur au jour 30\nlois en vigueur : 2/2' },
      { label: 'Quatre lois mixtes', stdin: '4\nloiD 5\nloiE 0\nloiF 12\nloiG 1\n', expected: 'loiD : vigueur au jour 6\nloiE : parution invalide\nloiF : vigueur au jour 13\nloiG : vigueur au jour 2\nlois en vigueur : 3/4' }
    ],
    solution: `read -r n
valides=0
for ((i=0; i<n; i++)); do
  read -r loi jour
  if [ "$jour" -gt 0 ]; then
    vigueur=$((jour + 1))
    echo "$loi : vigueur au jour $vigueur"
    valides=$((valides + 1))
  else
    echo "$loi : parution invalide"
  fi
done
echo "lois en vigueur : $valides/$n"
`
  },
  {
    id: 'dr-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Non-rétroactivité et effet immédiat',
    goal: 'Statuer sur des situations juridiques selon la loi applicable : ancienne, nouvelle, effet immédiat.',
    brief: '<p>Le script lit d\'abord <code>vigueur</code> (jour d\'entrée en vigueur de la loi nouvelle). ' +
      'Puis il lit <code>n</code>, puis <strong>n lignes</strong> « situation naissance fin » : la situation ' +
      'juridique est née au jour naissance et a fini de produire ses effets au jour fin (fin ≥ naissance). ' +
      'Si fin &lt; vigueur : situation éteinte avant la loi nouvelle → <code>loi ancienne</code> ' +
      '(non-rétroactivité). Sinon (née après, ou née avant et encore en cours) → <code>loi nouvelle</code> : ' +
      'la loi nouvelle s\'applique immédiatement. Affichage : <code>situation : verdict</code>. Bilan : ' +
      '<code>situations sous loi nouvelle : X/n</code>.</p>',
    starter: `read -r vigueur
read -r n
for ((i=0; i<n; i++)); do
  read -r situation naissance fin
  # À compléter : statuer selon les dates.
done
`,
    hints: [
      'Deux tests dans l\'ordre : fin < vigueur → ancienne ; sinon → nouvelle (effet immédiat, y compris situations en cours).',
      'Le compteur suit exactement les verdicts « loi nouvelle ».'
    ],
    examples: [
      { stdin: '3\n5\nA 1 2\nB 6 9\nC 3 7\nD 2 2\nE 5 8\n', expected: 'A : loi ancienne\nB : loi nouvelle\nC : loi nouvelle\nD : loi ancienne\nE : loi nouvelle\nsituations sous loi nouvelle : 3/5' }
    ],
    tests: [
      { label: 'Une seule situation', stdin: '10\n1\nX 2 2\n', expected: 'X : loi ancienne\nsituations sous loi nouvelle : 0/1' },
      { label: 'Situations en cours', stdin: '5\n2\nS1 1 9\nS2 5 6\n', expected: 'S1 : loi nouvelle\nS2 : loi nouvelle\nsituations sous loi nouvelle : 2/2' },
      { label: 'Cinq situations', stdin: '6\n5\nA 1 5\nB 2 6\nC 6 9\nD 4 4\nE 7 8\n', expected: 'A : loi ancienne\nB : loi nouvelle\nC : loi nouvelle\nD : loi ancienne\nE : loi nouvelle\nsituations sous loi nouvelle : 3/5' }
    ],
    solution: `read -r vigueur
read -r n
nouvelles=0
for ((i=0; i<n; i++)); do
  read -r situation naissance fin
  if [ "$fin" -lt "$vigueur" ]; then
    echo "$situation : loi ancienne"
  else
    echo "$situation : loi nouvelle"
    nouvelles=$((nouvelles + 1))
  fi
done
echo "situations sous loi nouvelle : $nouvelles/$n"
`
  },
  {
    id: 'dr-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Abrogation expresse et tacite',
    goal: 'Détecter l\'abrogation : expresse (texte nouveau qui le dit) ou tacite (incompatibilité).',
    brief: '<p>Le script lit <strong>n lignes</strong> « texte disposition » : disposition vaut ' +
      '<code>compatible</code>, <code>incompatible</code> ou <code>abroge</code>. Un <code>abroge</code> ' +
      'marque l\'abrogation expresse de la disposition ancienne. Une <code>incompatible</code> marque ' +
      'l\'abrogation tacite. Pour chaque ligne il affiche <code>disposition : maintenue</code>, ' +
      '<code>disposition : abrogee tacitement</code> ou <code>disposition : abrogee expressément</code>. ' +
      'Une disposition déjà abrogée qui réapparaît affiche <code>disposition : deja abrogee</code>. Il ' +
      'termine par <code>abrogations : X/n</code> (expresses + tacites).</p>',
    starter: `read -r n
declare -A etat
for ((i=0; i<n; i++)); do
  read -r texte disposition
  # À compléter : suivre l'état de chaque disposition.
done
`,
    hints: [
      'Un tableau etat[texte] retient le statut : vide = maintenue, t = abrogée tacitement, e = abrogée expressément.',
      'Une ligne sur une disposition déjà abrogée (e ou t) affiche « deja abrogee », quel que soit l\'événement.'
    ],
    examples: [
      { stdin: '5\nart1 compatible\nart2 incompatible\nart3 abroge\nart2 incompatible\nart1 compatible\n', expected: 'art1 : maintenue\nart2 : abrogee tacitement\nart3 : abrogee expressément\nart2 : deja abrogee\nart1 : maintenue\nabrogations : 2/5' }
    ],
    tests: [
      { label: 'Une seule abrogation', stdin: '1\nartA abroge\n', expected: 'artA : abrogee expressément\nabrogations : 1/1' },
      { label: 'Répétition après expresse', stdin: '3\nartB abroge\nartB abroge\nartB incompatible\n', expected: 'artB : abrogee expressément\nartB : deja abrogee\nartB : deja abrogee\nabrogations : 1/3' },
      { label: 'Cinq lignes mixtes', stdin: '5\nart1 compatible\nart2 abroge\nart3 incompatible\nart3 compatible\nart2 incompatible\n', expected: 'art1 : maintenue\nart2 : abrogee expressément\nart3 : abrogee tacitement\nart3 : deja abrogee\nart2 : deja abrogee\nabrogations : 2/5' }
    ],
    solution: `read -r n
declare -A etat
abrogations=0
for ((i=0; i<n; i++)); do
  read -r texte disposition
  statut="\${etat[$texte]:-}"
  if [ "$statut" = "e" ] || [ "$statut" = "t" ]; then
    echo "$texte : deja abrogee"
  elif [ "$disposition" = "abroge" ]; then
    etat[$texte]=e
    echo "$texte : abrogee expressément"
    abrogations=$((abrogations + 1))
  elif [ "$disposition" = "incompatible" ]; then
    etat[$texte]=t
    echo "$texte : abrogee tacitement"
    abrogations=$((abrogations + 1))
  else
    echo "$texte : maintenue"
  fi
done
echo "abrogations : $abrogations/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Contrats et obligations
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'dr-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Conditions de validité du contrat',
    goal: 'Vérifier les quatre conditions de validité d\'un contrat : capacité, consentement, objet, cause.',
    brief: '<p>Le script lit <strong>n lignes</strong> « contrat capacite consentement objet cause » : chaque ' +
      'condition vaut <code>ok</code> ou <code>ko</code>. Le contrat est <code>valide</code> si les quatre ' +
      'conditions sont ok, sinon <code>nullite : X manquantes</code> où X est le nombre de conditions ko. ' +
      'Il termine par <code>contrats valides : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r contrat capacite consentement objet cause
  # À compléter : compter les ko, statuer.
done
`,
    hints: [
      'Un compteur de conditions ko remis à 0 à chaque contrat : incrémentez pour chaque condition qui vaut ko.',
      'Quatre conditions ok = valide ; sinon affichez le nombre de manquantes.'
    ],
    examples: [
      { stdin: '2\nvente ok ok ok ok\nlocation ok ko ok ok\n', expected: 'vente : valide\nlocation : nullite : 1 manquantes\ncontrats valides : 1/2' }
    ],
    tests: [
      { label: 'Un contrat parfait', stdin: '1\nA ok ok ok ok\n', expected: 'A : valide\ncontrats valides : 1/1' },
      { label: 'Deux manquantes', stdin: '1\nB ko ko ok ok\n', expected: 'B : nullite : 2 manquantes\ncontrats valides : 0/1' },
      { label: 'Quatre contrats', stdin: '4\nC ok ok ok ok\nD ok ok ok ko\nE ok ok ko ko\nF ok ok ok ok\n', expected: 'C : valide\nD : nullite : 1 manquantes\nE : nullite : 2 manquantes\nF : valide\ncontrats valides : 2/4' }
    ],
    solution: `read -r n
valides=0
for ((i=0; i<n; i++)); do
  read -r contrat capacite consentement objet cause
  ko=0
  for cond in "$capacite" "$consentement" "$objet" "$cause"; do
    if [ "$cond" = "ko" ]; then
      ko=$((ko + 1))
    fi
  done
  if [ "$ko" = "0" ]; then
    echo "$contrat : valide"
    valides=$((valides + 1))
  else
    echo "$contrat : nullite : $ko manquantes"
  fi
done
echo "contrats valides : $valides/$n"
`
  },
  {
    id: 'dr-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Vices du consentement',
    goal: 'Détecter les vices du consentement (erreur, dol, violence) et leurs effets sur le contrat.',
    brief: '<p>Le script lit <strong>n lignes</strong> « contrat vice » : vice vaut <code>aucun</code>, ' +
      '<code>erreur</code>, <code>dol</code> (manœuvre frauduleuse), <code>violence</code> ou ' +
      '<code>lesion</code>. Tout vice sauf aucun entraîne la <code>relativement nullite</code> (nullité ' +
      'relative, action de la victime) ; la lésion n\'est sanctionnée que dans les cas prévus par la loi : ' +
      'elle produit <code>lesion : selon la loi</code> sans annuler. Affichage : <code>contrat : verdict</code> ' +
      'où verdict vaut <code>consentement libre</code>, <code>relativement nullite</code> ou ' +
      '<code>selon la loi</code>. Bilan : <code>contrats touches : X/n</code> (nullités relatives + lésions).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r contrat vice
  # À compléter : statuer selon le vice.
done
`,
    hints: [
      'Trois verdicts : aucun → libre ; erreur/dol/violence → nullité relative ; lesion → selon la loi.',
      'Comptez ensemble les nullités relatives et les lésions.'
    ],
    examples: [
      { stdin: '4\nA aucun\nB dol\nC lesion\nD violence\n', expected: 'A : consentement libre\nB : relativement nullite\nC : selon la loi\nD : relativement nullite\ncontrats touches : 3/4' }
    ],
    tests: [
      { label: 'Une erreur', stdin: '1\nX erreur\n', expected: 'X : relativement nullite\ncontrats touches : 1/1' },
      { label: 'Que du libre', stdin: '2\nY aucun\nZ aucun\n', expected: 'Y : consentement libre\nZ : consentement libre\ncontrats touches : 0/2' },
      { label: 'Cinq contrats', stdin: '5\nA erreur\nB aucun\nC dol\nD lesion\nE violence\n', expected: 'A : relativement nullite\nB : consentement libre\nC : relativement nullite\nD : selon la loi\nE : relativement nullite\ncontrats touches : 4/5' }
    ],
    solution: `read -r n
touches=0
for ((i=0; i<n; i++)); do
  read -r contrat vice
  case "$vice" in
    aucun) echo "$contrat : consentement libre" ;;
    lesion) echo "$contrat : selon la loi" ; touches=$((touches + 1)) ;;
    *) echo "$contrat : relativement nullite" ; touches=$((touches + 1)) ;;
  esac
done
echo "contrats touches : $touches/$n"
`
  },
  {
    id: 'dr-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'La responsabilité contractuelle',
    goal: 'Statuer sur des litiges : inexécution contractuelle, force majeure, ou responsabilité délictuelle.',
    brief: '<p>Le script lit d\'abord <code>seuil</code> (montant du dommage au-delà duquel des dommages-intérêts ' +
      'sont dus, entier). Puis il lit <strong>n lignes</strong> « litige montant cause » : cause vaut ' +
      '<code>contractuel</code>, <code>forcemajeure</code> ou <code>delictuel</code>. Verdicts : ' +
      'forcemajeure → <code>dispense</code> (le débiteur est libéré) ; contractuel → <code>dommages</code> si ' +
      'montant ≥ seuil, sinon <code>exequatur</code> (exécution forcée) ; delictuel → <code>dommages</code> ' +
      'toujours (responsabilité délictuelle, pas de seuil). Affichage : <code>litige : verdict</code>. ' +
      'Bilan : <code>condamnations : X/n</code> et <code>total alloue : M</code> (somme des montants des ' +
      'condamnations).</p>',
    starter: `read -r seuil
read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r litige montant cause
  # À compléter : statuer, cumuler les condamnations.
done
`,
    hints: [
      'Trois causes, quatre verdicts : forcemajeure → dispense ; contractuel → dommages ou exequatur selon le seuil ; delictuel → dommages.',
      'Le total ne cumule que les condamnations à dommages-intérêts.'
    ],
    examples: [
      { stdin: '5000\n4\nA 7000 contractuel\nB 3000 contractuel\nC 9000 forcemajeure\nD 4000 delictuel\n', expected: 'A : dommages\nB : exequatur\nC : dispense\nD : dommages\ncondamnations : 2/4\ntotal alloue : 11000' }
    ],
    tests: [
      { label: 'Un seul litige', stdin: '1000\n1\nX 2000 delictuel\n', expected: 'X : dommages\ncondamnations : 1/1\ntotal alloue : 2000' },
      { label: 'Que des dispenses', stdin: '1000\n2\nY 500 forcemajeure\nZ 9000 forcemajeure\n', expected: 'Y : dispense\nZ : dispense\ncondamnations : 0/2\ntotal alloue : 0' },
      { label: 'Cinq litiges', stdin: '4000\n5\nA 5000 contractuel\nB 3000 contractuel\nC 6000 forcemajeure\nD 2000 delictuel\nE 4000 contractuel\n', expected: 'A : dommages\nB : exequatur\nC : dispense\nD : dommages\nE : dommages\ncondamnations : 3/5\ntotal alloue : 11000' }
    ],
    solution: `read -r seuil
read -r n
total=0
condamnations=0
for ((i=0; i<n; i++)); do
  read -r litige montant cause
  if [ "$cause" = "forcemajeure" ]; then
    echo "$litige : dispense"
  elif [ "$cause" = "delictuel" ]; then
    echo "$litige : dommages"
    condamnations=$((condamnations + 1))
    total=$((total + montant))
  else
    if [ "$montant" -ge "$seuil" ]; then
      echo "$litige : dommages"
      condamnations=$((condamnations + 1))
      total=$((total + montant))
    else
      echo "$litige : exequatur"
    fi
  fi
done
echo "condamnations : $condamnations/$n"
echo "total alloue : $total"
`
  }
];

module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Le système d'information et l'entreprise
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'mr-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Donnée ou information',
    goal: 'Trier des éléments entre données et informations, puis dresser le bilan du tri.',
    brief: '<p>Le script lit <strong>n lignes</strong> « type libelle » : type vaut <code>d</code> (donnée) ' +
      'ou <code>i</code> (information). Pour chaque ligne il affiche <code>libelle : categorie</code>, où ' +
      'categorie vaut <code>matiere premiere</code> (donnée) ou <code>interpretee</code> (information). ' +
      'Enfin il affiche <code>bilan : X donnees / Y informations</code>, X et Y étant les compteurs.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r type libelle
  # À compléter : afficher la catégorie, puis compter.
done
`,
    hints: [
      'Un if/elif sur la variable type suffit : « d » et « i » sont les deux seules valeurs à traiter.',
      'Deux compteurs posés à 0 avant la boucle, incrémentés dedans, affichés après.'
    ],
    examples: [
      { stdin: '3\nd bleu\ni bleu du ciel\nd 30545454\n', expected: 'bleu : matiere premiere\nbleu du ciel : interpretee\n30545454 : matiere premiere\nbilan : 2 donnees / 1 informations' }
    ],
    tests: [
      { label: 'Une seule ligne', stdin: '1\ni facture 12000\n', expected: 'facture 12000 : interpretee\nbilan : 0 donnees / 1 informations' },
      { label: 'Deux données', stdin: '2\nd prix\nd quantite\n', expected: 'prix : matiere premiere\nquantite : matiere premiere\nbilan : 2 donnees / 0 informations' },
      { label: 'Quatre éléments mixtes', stdin: '4\nd 12000\ni chiffre d affaires\nd nom client\ni relance paiement\n', expected: '12000 : matiere premiere\nchiffre d affaires : interpretee\nnom client : matiere premiere\nrelance paiement : interpretee\nbilan : 2 donnees / 2 informations' }
    ],
    solution: `read -r n
donnees=0
informations=0
for ((i=0; i<n; i++)); do
  read -r type libelle
  if [ "$type" = "d" ]; then
    echo "$libelle : matiere premiere"
    donnees=$((donnees + 1))
  else
    echo "$libelle : interpretee"
    informations=$((informations + 1))
  fi
done
echo "bilan : $donnees donnees / $informations informations"
`
  },
  {
    id: 'mr-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les trois sous-systèmes',
    goal: 'Router les flux de l\'entreprise vers le bon sous-système : décision, opérant ou information.',
    brief: '<p>Le script lit <strong>n lignes</strong> « flux sous_systeme » : sous_systeme vaut ' +
      '<code>d</code> (décision), <code>o</code> (opérant) ou <code>si</code> (information). Pour chaque ' +
      'ligne il affiche <code>flux : role</code>, où role vaut <code>piloter</code> (décision), ' +
      '<code>produire</code> (opérant) ou <code>memoriser</code> (information). Il termine par ' +
      '<code>flux si : X/n</code>, X étant le nombre de lignes dirigées vers le système d\'information.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r flux sous_systeme
  # À compléter : afficher le rôle, puis compter les flux du système d'information.
done
`,
    hints: [
      'Un case avec trois branches couvre d, o et si ; ajoutez une branche *) par sécurité.',
      'Le compteur du système d\'information s\'incrémente seulement dans la branche si.'
    ],
    examples: [
      { stdin: '4\nobjectifs d\nassemblage o\nstockage si\ncontroles d\n', expected: 'objectifs : piloter\nassemblage : produire\nstockage : memoriser\ncontroles : piloter\nflux si : 1/4' }
    ],
    tests: [
      { label: 'Un seul flux opérant', stdin: '1\nproduction o\n', expected: 'production : produire\nflux si : 0/1' },
      { label: 'Deux flux SI', stdin: '2\ncommandes si\nlivraisons si\n', expected: 'commandes : memoriser\nlivraisons : memoriser\nflux si : 2/2' },
      { label: 'Cinq flux mixtes', stdin: '5\nbudget d\nfabrication o\nfactures si\ninventaire si\nrecrutement d\n', expected: 'budget : piloter\nfabrication : produire\nfactures : memoriser\ninventaire : memoriser\nrecrutement : piloter\nflux si : 2/5' }
    ],
    solution: `read -r n
compte_si=0
for ((i=0; i<n; i++)); do
  read -r flux sous_systeme
  case "$sous_systeme" in
    d) echo "$flux : piloter" ;;
    o) echo "$flux : produire" ;;
    si) echo "$flux : memoriser" ; compte_si=$((compte_si + 1)) ;;
  esac
done
echo "flux si : $compte_si/$n"
`
  },
  {
    id: 'mr-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Domaine de la gestion',
    goal: 'Classer des informations par domaine (économique, juridique, technique, commercial) et dresser la répartition.',
    brief: '<p>Le script lit <strong>n lignes</strong> « info domaine » : domaine vaut <code>eco</code>, ' +
      '<code>jur</code>, <code>tech</code> ou <code>com</code>. Pour chaque ligne il affiche ' +
      '<code>info : domaine_complet</code>, où domaine_complet vaut <code>economique</code>, ' +
      '<code>juridique</code>, <code>technique</code> ou <code>commercial</code>. Il termine par quatre ' +
      'lignes de comptage, toujours dans cet ordre : <code>economique : X</code>, <code>juridique : X</code>, ' +
      '<code>technique : X</code> et <code>commercial : X</code>.</p>',
    starter: `read -r n
eco=0
jur=0
tech=0
com=0
for ((i=0; i<n; i++)); do
  read -r info domaine
  # À compléter : afficher le domaine complet et compter.
done
# À compléter : les quatre lignes de comptage.
`,
    hints: [
      'Un case à quatre branches remplit les deux rôles : afficher et incrémenter.',
      'Les quatre lignes finales sortent après la boucle, dans l\'ordre demandé, même quand le compteur vaut 0.'
    ],
    examples: [
      { stdin: '3\nconjoncture eco\nloi jur\nconcurrence com\n', expected: 'conjoncture : economique\nloi : juridique\nconcurrence : commercial\neconomique : 1\njuridique : 1\ntechnique : 0\ncommercial : 1' }
    ],
    tests: [
      { label: 'Un seul domaine', stdin: '1\nmateriel tech\n', expected: 'materiel : technique\neconomique : 0\njuridique : 0\ntechnique : 1\ncommercial : 0' },
      { label: 'Deux techniques', stdin: '2\nprocessus tech\nserveur tech\n', expected: 'processus : technique\nserveur : technique\neconomique : 0\njuridique : 0\ntechnique : 2\ncommercial : 0' },
      { label: 'Quatre domaines', stdin: '4\nmarche eco\ndirective jur\nmodes com\nclientele com\n', expected: 'marche : economique\ndirective : juridique\nmodes : commercial\nclientele : commercial\neconomique : 1\njuridique : 1\ntechnique : 0\ncommercial : 2' }
    ],
    solution: `read -r n
eco=0
jur=0
tech=0
com=0
for ((i=0; i<n; i++)); do
  read -r info domaine
  case "$domaine" in
    eco) echo "$info : economique" ; eco=$((eco + 1)) ;;
    jur) echo "$info : juridique" ; jur=$((jur + 1)) ;;
    tech) echo "$info : technique" ; tech=$((tech + 1)) ;;
    com) echo "$info : commercial" ; com=$((com + 1)) ;;
  esac
done
echo "economique : $eco"
echo "juridique : $jur"
echo "technique : $tech"
echo "commercial : $com"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — La méthode MERISE : niveaux et étapes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'mr-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Les trois niveaux',
    goal: 'Associer des modèles MERISE à leur niveau : conceptuel, logique/organisationnel ou physique.',
    brief: '<p>Le script lit <strong>n lignes</strong> « modele niveau » : niveau vaut <code>c</code> ' +
      '(conceptuel), <code>l</code> (logique/organisationnel) ou <code>p</code> (physique). Pour chaque ' +
      'ligne il affiche <code>modele : question</code>, où question vaut <code>quoi</code> (conceptuel), ' +
      '<code>comment organiser</code> (logique/organisationnel) ou <code>comment realiser</code> ' +
      '(physique). Il termine par <code>conceptuel : X/n</code>, X étant le nombre de modèles conceptuels.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r modele niveau
  # À compléter : afficher la question, puis compter les conceptuels.
done
`,
    hints: [
      'Un case à trois branches traduit la lettre en question.',
      'Comptez seulement la branche c ; le format final est « conceptuel : X/n ».'
    ],
    examples: [
      { stdin: '4\nMCD c\nMLD l\nMPD p\nMCT c\n', expected: 'MCD : quoi\nMLD : comment organiser\nMPD : comment realiser\nMCT : quoi\nconceptuel : 2/4' }
    ],
    tests: [
      { label: 'Un seul modèle physique', stdin: '1\nprogrammes p\n', expected: 'programmes : comment realiser\nconceptuel : 0/1' },
      { label: 'Deux logiques', stdin: '2\nMOD l\nMLD l\n', expected: 'MOD : comment organiser\nMLD : comment organiser\nconceptuel : 0/2' },
      { label: 'Cinq modèles mixtes', stdin: '5\nMCD c\nMOT l\nMOpT p\nMLD l\nMCT c\n', expected: 'MCD : quoi\nMOT : comment organiser\nMOpT : comment realiser\nMLD : comment organiser\nMCT : quoi\nconceptuel : 2/5' }
    ],
    solution: `read -r n
conceptuels=0
for ((i=0; i<n; i++)); do
  read -r modele niveau
  case "$niveau" in
    c) echo "$modele : quoi" ; conceptuels=$((conceptuels + 1)) ;;
    l) echo "$modele : comment organiser" ;;
    p) echo "$modele : comment realiser" ;;
  esac
done
echo "conceptuel : $conceptuels/$n"
`
  },
  {
    id: 'mr-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Ordre des étapes du projet',
    goal: 'Vérifier qu\'une liste d\'étapes suit l\'ordre canonique du cycle MERISE et localiser la première inversion.',
    brief: '<p>Le script lit <strong>n lignes</strong> « rang etape » : rang est un entier 1 à 5 et l\'étape ' +
      'appartient à la séquence <code>etude existant</code> (1), <code>conception</code> (2), ' +
      '<code>organisation</code> (3), <code>realisation</code> (4), <code>maintenance</code> (5). ' +
      'Le script vérifie que les rangs arrivent en ordre strictement croissant. Pour chaque ligne il ' +
      'affiche <code>etape : ok</code> ou <code>etape : hors ordre</code> (première ligne qui rompt la ' +
      'croissance et toutes les suivantes). Il termine par <code>verdict : X/n valides</code>.</p>',
    starter: `read -r n
precedent=0
for ((i=0; i<n; i++)); do
  read -r rang etape
  # À compléter : comparer au rang précédent, afficher le verdict de la ligne.
done
`,
    hints: [
      'Un drapeau « rompu » passé à 1 à la première inversion : les lignes suivantes sont toutes hors ordre, même si leur rang repart à la hausse.',
      'Comparez chaque rang au précédent avec -gt ; mettez à jour precedent seulement tant que la séquence est encore valide.'
    ],
    examples: [
      { stdin: '5\n1 etude existant\n2 conception\n3 organisation\n4 realisation\n5 maintenance\n', expected: 'etude existant : ok\nconception : ok\norganisation : ok\nrealisation : ok\nmaintenance : ok\nverdict : 5/5 valides' }
    ],
    tests: [
      { label: 'Une seule étape', stdin: '1\n1 etude existant\n', expected: 'etude existant : ok\nverdict : 1/1 valides' },
      { label: 'Inversion au milieu', stdin: '4\n1 etude existant\n3 organisation\n2 conception\n4 realisation\n', expected: 'etude existant : ok\norganisation : ok\nconception : hors ordre\nrealisation : hors ordre\nverdict : 2/4 valides' },
      { label: 'Rang répété', stdin: '3\n1 etude existant\n1 redite\n2 conception\n', expected: 'etude existant : ok\nredite : hors ordre\nconception : hors ordre\nverdict : 1/3 valides' }
    ],
    solution: `read -r n
precedent=0
rompu=0
valides=0
for ((i=0; i<n; i++)); do
  read -r rang etape
  if [ "$rompu" = "0" ] && [ "$rang" -gt "$precedent" ]; then
    echo "$etape : ok"
    valides=$((valides + 1))
    precedent=$rang
  else
    rompu=1
    echo "$etape : hors ordre"
  fi
done
echo "verdict : $valides/$n valides"
`
  },
  {
    id: 'mr-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'TVA : donnée ou traitement',
    goal: 'Illustrer la séparation données/traitements : mémoriser un taux, recalculer, vérifier la pérennité.',
    brief: '<p>Le script lit d\'abord <code>taux</code> (entier, pourcentage). Puis il lit <strong>n ' +
      'lignes</strong> « montant » (entiers). Pour chaque montant il affiche <code>montant HT → TTC X</code> ' +
      'où X = montant + montant × taux / 100 (division entière). Il termine par <code>nouveau taux ?</code> ' +
      'puis lit <code>taux2</code> et affiche à nouveau le TTC du <strong>premier</strong> montant avec ' +
      'taux2 : la donnée a changé, aucun programme à réécrire.</p>',
    starter: `read -r taux
read -r n
for ((i=0; i<n; i++)); do
  read -r montant
  # À compléter : afficher le TTC de chaque montant.
done
echo "nouveau taux ?"
read -r taux2
# À compléter : afficher le TTC du premier montant avec le nouveau taux.
`,
    hints: [
      'Retenez le premier montant dans une variable au premier tour de boucle (test sur la variable vide).',
      'Le calcul est ttc = montant + montant * taux / 100 en une seule expression $(( )).'
    ],
    examples: [
      { stdin: '18\n2\n1000\n2500\n20\n', expected: '1000 HT → TTC 1180\n2500 HT → TTC 2950\nnouveau taux ?\n1000 HT → TTC 1200' }
    ],
    tests: [
      { label: 'Zéro pour cent', stdin: '0\n1\n500\n19\n', expected: '500 HT → TTC 500\nnouveau taux ?\n500 HT → TTC 595' },
      { label: 'Un seul montant', stdin: '7\n1\n300\n0\n', expected: '300 HT → TTC 321\nnouveau taux ?\n300 HT → TTC 300' },
      { label: 'Trois montants, taux élevé', stdin: '25\n3\n200\n80\n1000\n10\n', expected: '200 HT → TTC 250\n80 HT → TTC 100\n1000 HT → TTC 1250\nnouveau taux ?\n200 HT → TTC 220' }
    ],
    solution: `read -r taux
read -r n
premier=""
for ((i=0; i<n; i++)); do
  read -r montant
  if [ -z "$premier" ]; then
    premier=$montant
  fi
  ttc=$((montant + montant * taux / 100))
  echo "$montant HT → TTC $ttc"
done
echo "nouveau taux ?"
read -r taux2
ttc2=$((premier + premier * taux2 / 100))
echo "$premier HT → TTC $ttc2"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Dictionnaire de données et dépendances fonctionnelles
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'mr-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Le dictionnaire de données',
    goal: 'Construire un dictionnaire de données : filtrer les propriétés élémentaires et repérer les calculées.',
    brief: '<p>Le script lit <strong>n lignes</strong> « nom type » : type vaut <code>el</code> ' +
      '(élémentaire), <code>co</code> (composée) ou <code>ca</code> (calculée). Le dictionnaire ne retient ' +
      'que les propriétés <strong>élémentaires et composées</strong>. Pour chaque ligne retenue il affiche ' +
      '<code>nom : conservee</code>, pour les autres <code>nom : ecartee</code>. Il termine par ' +
      '<code>dictionnaire : X proprietes</code>, X étant le nombre de propriétés retenues.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r nom type
  # À compléter : filtrer selon le type, puis compter.
done
`,
    hints: [
      'Seul le type « ca » écarte une propriété : les deux autres passent.',
      'Le compteur suit exactement les lignes affichées « conservee ».'
    ],
    examples: [
      { stdin: '4\nNumClt el\nNomClt el\nAdresseClt co\nMontantTTC ca\n', expected: 'NumClt : conservee\nNomClt : conservee\nAdresseClt : conservee\nMontantTTC : ecartee\ndictionnaire : 3 proprietes' }
    ],
    tests: [
      { label: 'Une seule calculée', stdin: '1\nAge ca\n', expected: 'Age : ecartee\ndictionnaire : 0 proprietes' },
      { label: 'Deux élémentaires', stdin: '2\nNumPrdt el\nPrixPrdt el\n', expected: 'NumPrdt : conservee\nPrixPrdt : conservee\ndictionnaire : 2 proprietes' },
      { label: 'Cinq propriétés mixtes', stdin: '5\nNumCde el\nDateCde el\nNomClient co\nTotalCde ca\nQteCdée el\n', expected: 'NumCde : conservee\nDateCde : conservee\nNomClient : conservee\nTotalCde : ecartee\nQteCdée : conservee\ndictionnaire : 4 proprietes' }
    ],
    solution: `read -r n
retenues=0
for ((i=0; i<n; i++)); do
  read -r nom type
  if [ "$type" = "ca" ]; then
    echo "$nom : ecartee"
  else
    echo "$nom : conservee"
    retenues=$((retenues + 1))
  fi
done
echo "dictionnaire : $retenues proprietes"
`
  },
  {
    id: 'mr-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Les règles de gestion',
    goal: 'Extraire les dépendances fonctionnelles des règles de gestion et éliminer les règles redondantes.',
    brief: '<p>Le script lit <strong>n lignes</strong> « source cible » décrivant une règle de gestion ' +
      '« source détermine cible ». Pour chaque ligne il affiche <code>source → cible</code> si le couple ' +
      'n\'a jamais été énoncé, sinon <code>source → cible : redondante</code> (règle répétée). ' +
      'Il termine par <code>df elementaires : X/n</code>, X étant le nombre de couples distincts.</p>',
    starter: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r source cible
  # À compléter : afficher la DF, détecter les sources multi-cibles, compter.
done
`,
    hints: [
      'La clé du tableau associatif est le couple complet : vues[source|cible].',
      'Un couple nouveau s\'affiche et se compte ; un couple déjà vu s\'affiche « : redondante » et ne se compte pas.'
    ],
    examples: [
      { stdin: '4\nNumClt NomClt\nNumClt AdrClt\nNumCde DateCde\nNumClt NomClt\n', expected: 'NumClt → NomClt\nNumClt → AdrClt\nNumCde → DateCde\nNumClt → NomClt : redondante\ndf elementaires : 3/4' }
    ],
    tests: [
      { label: 'Une seule DF', stdin: '1\nNumPrdt PrixPrdt\n', expected: 'NumPrdt → PrixPrdt\ndf elementaires : 1/1' },
      { label: 'Source multi-cible sans redondance', stdin: '3\nNumClt NomClt\nNumClt AdrClt\nNumCde DateCde\n', expected: 'NumClt → NomClt\nNumClt → AdrClt\nNumCde → DateCde\ndf elementaires : 3/3' },
      { label: 'Deux redondances', stdin: '4\nNumFou NomFou\nNumFou NomFou\nNumPrdt PrixPrdt\nNumFou NomFou\n', expected: 'NumFou → NomFou\nNumFou → NomFou : redondante\nNumPrdt → PrixPrdt\nNumFou → NomFou : redondante\ndf elementaires : 2/4' }
    ],
    solution: `read -r n
declare -A vues
elementaires=0
for ((i=0; i<n; i++)); do
  read -r source cible
  if [ -n "\${vues[$source|$cible]:-}" ]; then
    echo "$source → $cible : redondante"
  else
    vues[$source|$cible]=1
    echo "$source → $cible"
    elementaires=$((elementaires + 1))
  fi
done
echo "df elementaires : $elementaires/$n"
`
  },
  {
    id: 'mr-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'La matrice des dépendances',
    goal: 'Construire la matrice des dépendances fonctionnelles et déduire l\'identifiant de l\'entité.',
    brief: '<p>Le script lit <strong>n lignes</strong> « source cible » (DF élémentaires, sans doublon de ' +
      'couple). Il dénombre pour chaque source le nombre de cibles qu\'elle détermine, puis désigne ' +
      'l\'identifiant candidat : la source qui détermine le plus de propriétés (une seule gagnante ' +
      'garantie par les données). Affichage : une ligne <code>source : X cibles</code> par source ' +
      'distincte, triée par ordre d\'apparition, puis <code>identifiant candidat : source</code> et ' +
      '<code>propriete : cible</code> pour chaque cible de l\'identifiant, dans l\'ordre d\'apparition.</p>',
    starter: `read -r n
declare -A comptes
declare -A cibles_par_source
# À compléter : lire, compter, mémoriser les cibles par source.
# À compléter : désigner l'identifiant et lister ses cibles.
`,
    hints: [
      'Deux structures : un compteur par source et, par source, la liste des cibles (concaténées avec un séparateur).',
      'Un second passage sur les sources distinctes (tableau des clés) trouve le maximum ; l\'ordre d\'apparition se conserve avec un tableau indexé des sources à leur première apparition.'
    ],
    examples: [
      { stdin: '4\nNumClt NomClt\nNumClt AdrClt\nNumClt TelClt\nNumCde NumClt\n', expected: 'NumClt : 3 cibles\nNumCde : 1 cibles\nidentifiant candidat : NumClt\npropriete : NomClt\npropriete : AdrClt\npropriete : TelClt' }
    ],
    tests: [
      { label: 'Une seule source', stdin: '2\nNumPrdt PrixPrdt\nNumPrdt NomPrdt\n', expected: 'NumPrdt : 2 cibles\nidentifiant candidat : NumPrdt\npropriete : PrixPrdt\npropriete : NomPrdt' },
      { label: 'Deux sources équilibrées en apparence', stdin: '3\nNumCde DateCde\nNumCde NumClt\nNumClt NomClt\n', expected: 'NumCde : 2 cibles\nNumClt : 1 cibles\nidentifiant candidat : NumCde\npropriete : DateCde\npropriete : NumClt' },
      { label: 'Trois sources', stdin: '5\nNumFou NomFou\nNumFou AdrFou\nNumPrdt PrixPrdt\nNumPrdt NomPrdt\nNumCde DateCde\n', expected: 'NumFou : 2 cibles\nNumPrdt : 2 cibles\nNumCde : 1 cibles\nidentifiant candidat : NumFou\npropriete : NomFou\npropriete : AdrFou' }
    ],
    solution: `read -r n
declare -A comptes
declare -A listes
declare -A ordre
sources=()
for ((i=0; i<n; i++)); do
  read -r source cible
  if [ -z "\${comptes[$source]:-}" ]; then
    comptes[$source]=0
    listes[$source]=""
    ordre[$source]=$((\${#sources[@]}))
    sources+=("$source")
  fi
  comptes[$source]=$((\${comptes[$source]} + 1))
  listes[$source]="\${listes[$source]} $cible"
done
max=0
identifiant=""
for s in "\${sources[@]}"; do
  echo "$s : \${comptes[$s]} cibles"
  if [ "\${comptes[$s]}" -gt "$max" ]; then
    max="\${comptes[$s]}"
    identifiant="$s"
  fi
done
echo "identifiant candidat : $identifiant"
for cible in \${listes[$identifiant]}; do
  echo "propriete : $cible"
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Le modèle conceptuel des données (MCD)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'mr-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Lecture des cardinalités',
    goal: 'Vérifier des couples de cardinalités (min,max) et classer les associations.',
    brief: '<p>Le script lit <strong>n lignes</strong> « min max association » : min et max valent 0 ou 1, ' +
      'ou max vaut n. Un couple valide exige min ≤ max (0 ≤ 0, 0 ≤ 1, 0 ≤ n, 1 ≤ 1, 1 ≤ n). Pour chaque ' +
      'ligne il affiche <code>association : valide</code> ou <code>association : invalide</code>. ' +
      'Il termine par <code>un-à-plusieurs : X</code>, X étant le nombre de couples valides de la forme ' +
      '(0,n) ou (1,n) avec l\'autre extrémité de l\'association comptée ici.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r min max association
  # À compléter : valider le couple, puis compter les max = n.
done
`,
    hints: [
      'Il n\'y a que cinq couples valides : testez-les explicitement plutôt que de comparer des lettres.',
      '« un-à-plusieurs » : chaque ligne valide dont le max vaut n.'
    ],
    examples: [
      { stdin: '4\n0 n Commander\n1 1 Fournir\n1 n Appartenir\n1 0 Erreur\n', expected: 'Commander : valide\nFournir : valide\nAppartenir : valide\nErreur : invalide\nun-à-plusieurs : 2' }
    ],
    tests: [
      { label: 'Un seul couple invalide', stdin: '1\n1 0 Tordu\n', expected: 'Tordu : invalide\nun-à-plusieurs : 0' },
      { label: 'Tous valides sans n', stdin: '3\n0 0 Vivre\n1 1 Habiter\n0 1 Louer\n', expected: 'Vivre : valide\nHabiter : valide\nLouer : valide\nun-à-plusieurs : 0' },
      { label: 'Cinq couples mixtes', stdin: '5\n0 n Commander\n0 n Fournir\n1 1 Diriger\n1 0 Inverse\nn n Bizarre\n', expected: 'Commander : valide\nFournir : valide\nDiriger : valide\nInverse : invalide\nBizarre : invalide\nun-à-plusieurs : 2' }
    ],
    solution: `read -r n
plusieurs=0
for ((i=0; i<n; i++)); do
  read -r min max association
  if [ "$min" = "0" ] && [ "$max" = "0" ]; then
    echo "$association : valide"
  elif [ "$min" = "0" ] && [ "$max" = "1" ]; then
    echo "$association : valide"
  elif [ "$min" = "0" ] && [ "$max" = "n" ]; then
    echo "$association : valide"
    plusieurs=$((plusieurs + 1))
  elif [ "$min" = "1" ] && [ "$max" = "1" ]; then
    echo "$association : valide"
  elif [ "$min" = "1" ] && [ "$max" = "n" ]; then
    echo "$association : valide"
    plusieurs=$((plusieurs + 1))
  else
    echo "$association : invalide"
  fi
done
echo "un-à-plusieurs : $plusieurs"
`
  },
  {
    id: 'mr-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Association porteuse ou non',
    goal: 'Distinguer associations hiérarchiques (sans donnée portée) et non hiérarchiques (porteuses).',
    brief: '<p>Le script lit <strong>n lignes</strong> « association k » : k est le nombre de données portées ' +
      'par l\'association (entier ≥ 0). Une association est <code>hierarchique</code> si k vaut 0, sinon ' +
      '<code>portuese</code>. Pour chaque ligne il affiche <code>association : type</code>. Il termine par ' +
      '<code>tables en MLD : X</code>, X étant le nombre d\'entités (non lu ici, réglé à 2) plus le nombre ' +
      'd\'associations porteuses : chaque association porteuse deviendra une table au niveau logique.</p>',
    starter: `read -r n
entites=2
for ((i=0; i<n; i++)); do
  read -r association k
  # À compléter : classer l'association, puis compter les tables.
done
`,
    hints: [
      'Le test est un simple [ "$k" -eq 0 ] : classez, incrémentez.',
      'La table de départ vaut entites = 2 ; chaque association porteuse ajoute une table.'
    ],
    examples: [
      { stdin: '3\nCommander 2\nFournir 1\nAppartenir 0\n', expected: 'Commander : portuese\nFournir : portuese\nAppartenir : hierarchique\ntables en MLD : 4' }
    ],
    tests: [
      { label: 'Une seule hiérarchique', stdin: '1\nDiriger 0\n', expected: 'Diriger : hierarchique\ntables en MLD : 2' },
      { label: 'Deux porteuses', stdin: '2\nLouer 3\nPayer 1\n', expected: 'Louer : portuese\nPayer : portuese\ntables en MLD : 4' },
      { label: 'Cinq associations mixtes', stdin: '5\nCommander 2\nVivre 0\nHabiter 0\nLouer 3\nSigner 1\n', expected: 'Commander : portuese\nVivre : hierarchique\nHabiter : hierarchique\nLouer : portuese\nSigner : portuese\ntables en MLD : 5' }
    ],
    solution: `read -r n
entites=2
porteuses=0
for ((i=0; i<n; i++)); do
  read -r association k
  if [ "$k" -eq 0 ]; then
    echo "$association : hierarchique"
  else
    echo "$association : portuese"
    porteuses=$((porteuses + 1))
  fi
done
tables=$((entites + porteuses))
echo "tables en MLD : $tables"
`
  },
  {
    id: 'mr-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'La facture TogoMall',
    goal: 'Traduire l\'application facture du support : vérifier les règles de gestion entre clients et factures.',
    brief: '<p>Le script lit <strong>n lignes</strong> « client facture » (noms sans espace). Règles du ' +
      'sujet : un client existe dès sa première facture (il apparaît côté client au moins une fois) ; ' +
      'une facture concerne un et un seul client (une même facture ne peut pas être liée à deux clients ' +
      'différents). Pour chaque ligne il affiche <code>client facture : ok</code> si la règle est ' +
      'respectée, sinon <code>facture : conflit client1/client2</code> (premier client lié à cette ' +
      'facture / client de la ligne courante). Il termine par <code>clients : X</code> et ' +
      '<code>factures : Y</code>, X et Y étant les nombres d\'occurrences distinctes.</p>',
    starter: `read -r n
declare -A proprietaire
for ((i=0; i<n; i++)); do
  read -r client facture
  # À compléter : vérifier l'exclusivité, compter les occurrences distinctes.
done
`,
    hints: [
      'Un tableau associatif proprietaire[facture] retient le premier client lié ; s\'il est déjà pris par un autre client, conflit.',
      'Deux autres tableaux comptent les clients et factures distincts (incrémentés à la première apparition seulement).'
    ],
    examples: [
      { stdin: '4\nKossi F001\nKossi F002\nAma F003\nKossi F001\n', expected: 'Kossi F001 : ok\nKossi F002 : ok\nAma F003 : ok\nKossi F001 : ok\nclients : 2\nfactures : 3' }
    ],
    tests: [
      { label: 'Une seule facture', stdin: '1\nAma F100\n', expected: 'Ama F100 : ok\nclients : 1\nfactures : 1' },
      { label: 'Conflit de propriétaire', stdin: '3\nKossi F001\nAma F001\nAma F002\n', expected: 'Kossi F001 : ok\nF001 : conflit Kossi/Ama\nAma F002 : ok\nclients : 2\nfactures : 2' },
      { label: 'Cinq lignes mixtes', stdin: '5\nKossi F001\nAma F002\nKossi F001\nKossi F003\nAma F002\n', expected: 'Kossi F001 : ok\nAma F002 : ok\nKossi F001 : ok\nKossi F003 : ok\nAma F002 : ok\nclients : 2\nfactures : 3' }
    ],
    solution: `read -r n
declare -A proprietaire
declare -A clients_vus
declare -A factures_vues
nb_clients=0
nb_factures=0
for ((i=0; i<n; i++)); do
  read -r client facture
  if [ -z "\${proprietaire[$facture]:-}" ]; then
    proprietaire[$facture]=$client
    echo "$client $facture : ok"
  elif [ "\${proprietaire[$facture]}" != "$client" ]; then
    echo "$facture : conflit \${proprietaire[$facture]}/$client"
  else
    echo "$client $facture : ok"
  fi
  if [ -z "\${clients_vus[$client]:-}" ]; then
    clients_vus[$client]=1
    nb_clients=$((nb_clients + 1))
  fi
  if [ -z "\${factures_vues[$facture]:-}" ]; then
    factures_vues[$facture]=1
    nb_factures=$((nb_factures + 1))
  fi
done
echo "clients : $nb_clients"
echo "factures : $nb_factures"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Le modèle logique des données (MLD relationnel)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'mr-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Les règles de passage MCD vers MLD',
    goal: 'Appliquer les règles de passage : entités et associations porteuses deviennent des tables.',
    brief: '<p>Le script lit <strong>n lignes</strong> « nom nature » : nature vaut <code>entite</code> ou ' +
      '<code>assoc</code> (association). Une association avec des données portées (toute ligne ' +
      '<code>assoc</code> de ce sujet) devient une table ; une association sans données portées (nature ' +
      '<code>assoc0</code>) n\'en devient pas. Pour chaque ligne il affiche <code>nom : table</code> ou ' +
      '<code>nom : ignoree</code>. Il termine par <code>MLD : X tables</code>.</p>',
    starter: `read -r n
tables=0
for ((i=0; i<n; i++)); do
  read -r nom nature
  # À compléter : entite → table, assoc → table, assoc0 → ignoree.
done
`,
    hints: [
      'Trois natures, trois comportements : entite et assoc créent une table, assoc0 non.',
      'Incrémentez le compteur dans chaque branche qui crée une table.'
    ],
    examples: [
      { stdin: '4\nCLIENT entite\nPRODUIT entite\nFOURNIR assoc\nAPPARTENIR assoc0\n', expected: 'CLIENT : table\nPRODUIT : table\nFOURNIR : table\nAPPARTENIR : ignoree\nMLD : 3 tables' }
    ],
    tests: [
      { label: 'Une seule entité', stdin: '1\nCLIENT entite\n', expected: 'CLIENT : table\nMLD : 1 tables' },
      { label: 'Deux associations hiérarchiques', stdin: '2\nVIVRE assoc0\nHABITER assoc0\n', expected: 'VIVRE : ignoree\nHABITER : ignoree\nMLD : 0 tables' },
      { label: 'Cinq éléments mixtes', stdin: '5\nCLIENT entite\nCOMMANDE entite\nCONCERNER assoc\nPRODUIT entite\nDIRIGER assoc0\n', expected: 'CLIENT : table\nCOMMANDE : table\nCONCERNER : table\nPRODUIT : table\nDIRIGER : ignoree\nMLD : 4 tables' }
    ],
    solution: `read -r n
tables=0
for ((i=0; i<n; i++)); do
  read -r nom nature
  if [ "$nature" = "entite" ] || [ "$nature" = "assoc" ]; then
    echo "$nom : table"
    tables=$((tables + 1))
  else
    echo "$nom : ignoree"
  fi
done
echo "MLD : $tables tables"
`
  },
  {
    id: 'mr-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'La clé primaire et les étrangères',
    goal: 'Valider les clés : unicité des primaires, références des étrangères (intégrité référentielle).',
    brief: '<p>Le script lit <strong>n lignes</strong> « table cle type » : type vaut <code>pk</code> (clé ' +
      'primaire à déclarer) ou <code>fk:REF</code> (clé étrangère référençant la table REF). Pour chaque ' +
      'ligne il affiche <code>table : cle ok</code>, ou <code>table : doublon</code> si la même clé ' +
      'primaire est déclarée deux fois, ou <code>table : REF inconnue</code> si la table référencée ' +
      'n\'a pas (encore ou jamais) de clé primaire déclarée. Il termine par <code>lignes valides : X/n</code>.</p>',
    starter: `read -r n
declare -A primaires
for ((i=0; i<n; i++)); do
  read -r table cle type
  # À compléter : pk déclare, fk vérifie la référence.
done
`,
    hints: [
      'Un tableau associatif primaires[REF] est rempli par les lignes pk ; les fk consultent ce même tableau.',
      'L\'ordre compte : une fk qui référence une table dont la pk arrive plus tard est « inconnue » à cette ligne.'
    ],
    examples: [
      { stdin: '4\nCLIENT NumClt pk\nCOMMANDE NumCde pk\nCOMMANDE NumClt fk:CLIENT\nLIVRAISON NumClt fk:FOURNISSEUR\n', expected: 'CLIENT : NumClt ok\nCOMMANDE : NumCde ok\nCOMMANDE : NumClt ok\nLIVRAISON : FOURNISSEUR inconnue\nlignes valides : 3/4' }
    ],
    tests: [
      { label: 'Une seule pk', stdin: '1\nPRODUIT NumPrdt pk\n', expected: 'PRODUIT : NumPrdt ok\nlignes valides : 1/1' },
      { label: 'Doublon de pk', stdin: '2\nCLIENT NumClt pk\nCLIENT NumClt pk\n', expected: 'CLIENT : NumClt ok\nCLIENT : doublon\nlignes valides : 1/2' },
      { label: 'Cinq lignes mixtes', stdin: '5\nCLIENT NumClt pk\nCLIENT NumClt pk\nCOMMANDE NumCde pk\nCOMMANDE NumClt fk:CLIENT\nPAIEMENT NumCde fk:ORDER\n', expected: 'CLIENT : NumClt ok\nCLIENT : doublon\nCOMMANDE : NumCde ok\nCOMMANDE : NumClt ok\nPAIEMENT : ORDER inconnue\nlignes valides : 3/5' }
    ],
    solution: `read -r n
declare -A primaires
declare -A couples
valides=0
for ((i=0; i<n; i++)); do
  read -r table cle type
  if [ "$type" = "pk" ]; then
    if [ -n "\${primaires[$table]:-}" ]; then
      echo "$table : doublon"
    else
      primaires[$table]=$cle
      couples[$table|$cle]=1
      echo "$table : $cle ok"
      valides=$((valides + 1))
    fi
  else
    ref="\${type#fk:}"
    if [ -z "\${primaires[$ref]:-}" ]; then
      echo "$table : $ref inconnue"
    else
      echo "$table : $cle ok"
      valides=$((valides + 1))
    fi
  fi
done
echo "lignes valides : $valides/$n"
`
  },
  {
    id: 'mr-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Le schéma relationnel complet',
    goal: 'Assembler un schéma relationnel : table (cle, attributs..., fk#) vérifiée champ par champ.',
    brief: '<p>Le script lit d\'abord <code>n_tables</code> puis déclare chaque table par une ligne ' +
      '<code>table cle</code>. Puis il lit <code>n_attrs</code> lignes « table champ » où champ est soit ' +
      'la clé de la table (il devient <code>#pk</code> dans l\'affichage), soit une clé étrangère ' +
      'référençant une table déclarée (affichée <code>champ#</code>), soit un attribut simple (affiché ' +
      'tel quel). Chaque champ connu est affiché <code>table : champ_role</code> où role vaut ' +
      '<code>pk</code>, <code>fk</code> ou <code>attr</code>. Un champ appartenant à une table non ' +
      'déclarée produit <code>champ : table inconnue</code>.</p>',
    starter: `read -r n_tables
declare -A cles
for ((i=0; i<n_tables; i++)); do
  read -r table cle
  cles[$table]=$cle
done
read -r n_attrs
for ((i=0; i<n_attrs; i++)); do
  read -r table champ
  # À compléter : classer le champ selon la clé de sa table et les autres clés.
done
`,
    hints: [
      'Premier test : la table est-elle déclarée ? Deuxième : le champ est-il la clé de sa table ? Troisième : le champ est-il la clé d\'une autre table (donc fk) ? Sinon attribut.',
      'Parcourez le tableau des clés déclarées pour savoir si le champ en est une.'
    ],
    examples: [
      { stdin: '2\nCLIENT NumClt\nCOMMANDE NumCde\n4\nCLIENT NomClt\nCOMMANDE NumCde\nCOMMANDE NumClt\nCOMMANDE DateCde\n', expected: 'CLIENT : NomClt attr\nCOMMANDE : NumCde pk\nCOMMANDE : NumClt fk\nCOMMANDE : DateCde attr' }
    ],
    tests: [
      { label: 'Table inconnue', stdin: '1\nCLIENT NumClt\n2\nFOURNISSEUR NumFou\nCLIENT NomClt\n', expected: 'NumFou : table inconnue\nCLIENT : NomClt attr' },
      { label: 'Une seule table, que sa clé', stdin: '1\nPRODUIT NumPrdt\n1\nPRODUIT NumPrdt\n', expected: 'PRODUIT : NumPrdt pk' },
      { label: 'Trois tables et quatre champs', stdin: '3\nCLIENT NumClt\nCOMMANDE NumCde\nPRODUIT NumPrdt\n4\nCOMMANDE NumCde\nCOMMANDE NumClt\nPRODUIT PrixPrdt\nPRODUIT NumPrdt\n', expected: 'COMMANDE : NumCde pk\nCOMMANDE : NumClt fk\nPRODUIT : PrixPrdt attr\nPRODUIT : NumPrdt pk' }
    ],
    solution: `read -r n_tables
declare -A cles
tables=()
for ((i=0; i<n_tables; i++)); do
  read -r table cle
  cles[$table]=$cle
  tables+=("$table")
done
read -r n_attrs
for ((i=0; i<n_attrs; i++)); do
  read -r table champ
  if [ -z "\${cles[$table]:-}" ]; then
    echo "$champ : table inconnue"
  elif [ "$champ" = "\${cles[$table]}" ]; then
    echo "$table : $champ pk"
  else
    fk=""
    for t in "\${tables[@]}"; do
      if [ "$t" != "$table" ] && [ "$champ" = "\${cles[$t]}" ]; then
        fk="oui"
      fi
    done
    if [ -n "$fk" ]; then
      echo "$table : $champ fk"
    else
      echo "$table : $champ attr"
    fi
  fi
done
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — La normalisation du MLD
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'mr-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Première forme normale',
    goal: 'Vérifier la 1FN : chaque attribut doit être monovalué et non décomposable.',
    brief: '<p>Le script lit <strong>n lignes</strong> « attribut k » : k est le nombre de valeurs prises ' +
      'par l\'attribut sur une ligne (1 = monovalué). Un attribut est <code>1FN ok</code> si k vaut ' +
      'exactement 1, sinon <code>multivalue</code>. Il termine par <code>1FN : verdict</code> où verdict ' +
      'vaut <code>respectee</code> si tous les attributs sont ok, <code>violee</code> sinon.</p>',
    starter: `read -r n
violee=0
for ((i=0; i<n; i++)); do
  read -r attribut k
  # À compléter : classer l'attribut, lever le drapeau si multivalué.
done
# À compléter : verdict final.
`,
    hints: [
      'Un drapeau violee=0 posé avant la boucle, passé à 1 au premier attribut multivalué.',
      'Le verdict se décide après la boucle, sur l\'état du drapeau.'
    ],
    examples: [
      { stdin: '3\nNom 1\nPrenom 1\nDiplomes 3\n', expected: 'Nom : 1FN ok\nPrenom : 1FN ok\nDiplomes : multivalue\n1FN : violee' }
    ],
    tests: [
      { label: 'Un seul attribut', stdin: '1\nEnfants 2\n', expected: 'Enfants : multivalue\n1FN : violee' },
      { label: 'Tous monovalués', stdin: '2\nNom 1\nVille 1\n', expected: 'Nom : 1FN ok\nVille : 1FN ok\n1FN : respectee' },
      { label: 'Quatre attributs mixtes', stdin: '4\nNom 1\nTelephones 2\nAdresse 1\nEnfants 3\n', expected: 'Nom : 1FN ok\nTelephones : multivalue\nAdresse : 1FN ok\nEnfants : multivalue\n1FN : violee' }
    ],
    solution: `read -r n
violee=0
for ((i=0; i<n; i++)); do
  read -r attribut k
  if [ "$k" -eq 1 ]; then
    echo "$attribut : 1FN ok"
  else
    echo "$attribut : multivalue"
    violee=1
  fi
done
if [ "$violee" = "0" ]; then
  echo "1FN : respectee"
else
  echo "1FN : violee"
fi
`
  },
  {
    id: 'mr-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Dépendance partielle : la 2FN',
    goal: 'Détecter les dépendances partielles sur clé composée : un attribut qui ne dépend que d\'une partie.',
    brief: '<p>Le script lit d\'abord <code>cle1 cle2</code> (clé composée de deux parties). Puis il lit ' +
      '<strong>n lignes</strong> « attribut partie » : partie vaut <code>c1</code>, <code>c2</code> ou ' +
      '<code>cle</code>. Une dépendance sur <code>cle</code> (toute la clé) est <code>totale</code> ; une ' +
      'dépendance sur <code>c1</code> ou <code>c2</code> seule est <code>partielle</code>. Pour chaque ' +
      'ligne il affiche <code>attribut : type</code>. Il termine par <code>2FN : verdict</code> où verdict ' +
      'vaut <code>respectee</code> si aucune dépendance partielle, <code>violee</code> sinon.</p>',
    starter: `read -r cle1 cle2
read -r n
violee=0
for ((i=0; i<n; i++)); do
  read -r attribut partie
  # À compléter : classer la dépendance, lever le drapeau si partielle.
done
`,
    hints: [
      'Seule la ligne entière « cle » déclenche « totale » : c1 et c2 seules sont partielles.',
      'Même mécanique de drapeau que la 1FN : violee passe à 1 au premier attribut partiel.'
    ],
    examples: [
      { stdin: 'NumCde RefPdt\n3\nQuantite cle\nDesignationPdt c1\nRemise cle\n', expected: 'Quantite : totale\nDesignationPdt : partielle\nRemise : totale\n2FN : violee' }
    ],
    tests: [
      { label: 'Toute la clé', stdin: 'NumCde RefPdt\n1\nQuantite cle\n', expected: 'Quantite : totale\n2FN : respectee' },
      { label: 'Deuxièmes parties', stdin: 'NumCde RefPdt\n2\nPrixPrdt c2\nQuantite cle\n', expected: 'PrixPrdt : partielle\nQuantite : totale\n2FN : violee' },
      { label: 'Quatre dépendances mixtes', stdin: 'NumCde RefPdt\n4\nQuantite cle\nDateCde c1\nRemise cle\nDesignationPdt c2\n', expected: 'Quantite : totale\nDateCde : partielle\nRemise : totale\nDesignationPdt : partielle\n2FN : violee' }
    ],
    solution: `read -r cle1 cle2
read -r n
violee=0
for ((i=0; i<n; i++)); do
  read -r attribut partie
  if [ "$partie" = "cle" ]; then
    echo "$attribut : totale"
  else
    echo "$attribut : partielle"
    violee=1
  fi
done
if [ "$violee" = "0" ]; then
  echo "2FN : respectee"
else
  echo "2FN : violee"
fi
`
  },
  {
    id: 'mr-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Dépendance transitive : la 3FN',
    goal: 'Détecter la dépendance transitive : un attribut non clé qui en détermine un autre.',
    brief: '<p>Le script lit <strong>n lignes</strong> « source cible » où la source est un attribut non clé. ' +
      'Une même source qui détermine deux cibles différentes crée une dépendance transitive (l\'attribut ' +
      'source joue le rôle d\'une seconde clé cachée). Pour chaque ligne il affiche ' +
      '<code>source → cible</code>. À la première transitive il affiche en plus ' +
      '<code>3FN : transitive par source</code>. Il termine par <code>3FN : verdict</code> où verdict vaut ' +
      '<code>respectee</code> (aucune transitive) ou <code>violee</code>.</p>',
    starter: `read -r n
declare -A vues
transitive=0
for ((i=0; i<n; i++)); do
  read -r source cible
  # À compléter : afficher la DF, détecter la source multi-cible.
done
`,
    hints: [
      'Même détection que les DF élémentaires du chapitre 3 : un tableau vues[source] retient la première cible.',
      'Le message « transitive par source » n\'apparaît qu\'une fois (drapeau) ; le verdict final tient compte du drapeau.'
    ],
    examples: [
      { stdin: '4\nNumClt NomClt\nNumClt AdrClt\nCodeCateg LibCateg\nCodeCateg Remise\n', expected: 'NumClt → NomClt\nNumClt → AdrClt\n3FN : transitive par NumClt\nCodeCateg → LibCateg\nCodeCateg → Remise\n3FN : violee' }
    ],
    tests: [
      { label: 'Sources uniques', stdin: '2\nNumClt NomClt\nCodeCateg Remise\n', expected: 'NumClt → NomClt\nCodeCateg → Remise\n3FN : respectee' },
      { label: 'Même cible répétée', stdin: '3\nNumClt NomClt\nNumClt NomClt\nCodeCateg Remise\n', expected: 'NumClt → NomClt\nNumClt → NomClt\nCodeCateg → Remise\n3FN : respectee' },
      { label: 'Deux transitives', stdin: '5\nNumClt NomClt\nCodeCateg LibCateg\nCodeCateg Remise\nNumClt AdrClt\nCodeCateg Plafond\n', expected: 'NumClt → NomClt\nCodeCateg → LibCateg\nCodeCateg → Remise\n3FN : transitive par CodeCateg\nNumClt → AdrClt\nCodeCateg → Plafond\n3FN : violee' }
    ],
    solution: `read -r n
declare -A vues
transitive=0
source_transitive=""
for ((i=0; i<n; i++)); do
  read -r source cible
  echo "$source → $cible"
  if [ -n "\${vues[$source]:-}" ] && [ "\${vues[$source]}" != "$cible" ]; then
    if [ "$transitive" = "0" ]; then
      transitive=1
      source_transitive=$source
      echo "3FN : transitive par $source"
    fi
  else
    vues[$source]=$cible
  fi
done
if [ "$transitive" = "0" ]; then
  echo "3FN : respectee"
else
  echo "3FN : violee"
fi
`
  }
];

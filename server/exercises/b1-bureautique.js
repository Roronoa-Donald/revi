module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Word : l'interface et la saisie
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'bu-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Onglets et groupes',
    goal: 'Retrouver l\'organisation du ruban : chaque groupe appartient à un onglet précis.',
    brief: '<p>Le script lit <strong>n lignes</strong> « groupe onglet » : onglet est un code de ' +
      '<code>accueil</code>, <code>insertion</code>, <code>miseenpage</code>, <code>revision</code> ou ' +
      '<code>affichage</code>. Pour chaque ligne il affiche <code>groupe : OK</code> si le groupe ' +
      'appartient bien à cet onglet, sinon <code>groupe : ERREUR</code>. Il termine par ' +
      '<code>conformes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r groupe onglet
  # À compléter : vérifier l'appartenance, compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le groupe donne l\'onglet attendu ; compare-le à l\'onglet saisi.',
      'Le bilan sort une seule fois, après la boucle.'
    ],
    examples: [
      { stdin: '3\npolice accueil\ntableaux insertion\nzoom revision\n', expected: 'police : OK\ntableaux : OK\nzoom : ERREUR\nconformes : 2/3' }
    ],
    tests: [
      { label: 'Deux erreurs', stdin: '3\npolice accueil\nzoom revision\nstyles insertion\n', expected: 'police : OK\nzoom : ERREUR\nstyles : ERREUR\nconformes : 1/3' },
      { label: 'Tout conforme', stdin: '2\ntableaux insertion\nfiligrane miseenpage\n', expected: 'tableaux : OK\nfiligrane : OK\nconformes : 2/2' },
      { label: 'Cinq groupes', stdin: '5\npressepapier accueil\nsymbole insertion\nthemes miseenpage\nsuivi revision\nmacros affichage\n', expected: 'pressepapier : OK\nsymbole : OK\nthemes : OK\nsuivi : OK\nmacros : OK\nconformes : 5/5' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r groupe onglet
  case "$groupe" in
    police|pressepapier|styles|paragraphe) attendu="accueil" ;;
    tableaux|symbole|illustrations) attendu="insertion" ;;
    themes|filigrane|marges|orientation) attendu="miseenpage" ;;
    suivi|commentaire|verifier) attendu="revision" ;;
    zoom|macros|fenetre) attendu="affichage" ;;
  esac
  if [ "$onglet" = "$attendu" ]; then
    echo "$groupe : OK"
    ok=$((ok + 1))
  else
    echo "$groupe : ERREUR"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'bu-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les cinq modes d\'affichage',
    goal: 'Retrouver la définition de chaque mode d\'affichage du document.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mode Question » : mode est un code parmi ' +
      '<code>page</code>, <code>pleinecran</code>, <code>web</code>, <code>plan</code> ou ' +
      '<code>brouillon</code> et Question un code parmi <code>defaut</code>, <code>ruban</code>, ' +
      '<code>html</code>, <code>titres</code> ou <code>rapide</code>. Il affiche ' +
      '<code>mode : OUI</code> quand le couple est juste, <code>mode : NON</code> sinon, puis ' +
      '<code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r mode question
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Chaque mode a une seule réponse juste : page-defaut, pleinecran-ruban, web-html, plan-titres, brouillon-rapide.',
      'Un case sur le mode donne la réponse attendue ; une comparaison suffit.'
    ],
    examples: [
      { stdin: '2\npage defaut\nweb titres\n', expected: 'page : OUI\nweb : NON\njustes : 1/2' }
    ],
    tests: [
      { label: 'Trois couples', stdin: '3\npleinecran ruban\nplan titres\nbrouillon defaut\n', expected: 'pleinecran : OUI\nplan : OUI\nbrouillon : NON\njustes : 2/3' },
      { label: 'Tout juste', stdin: '2\npage defaut\nbrouillon rapide\n', expected: 'page : OUI\nbrouillon : OUI\njustes : 2/2' },
      { label: 'Deux justes', stdin: '2\nweb html\nplan titres\n', expected: 'web : OUI\nplan : OUI\njustes : 2/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r mode question
  case "$mode" in
    page) attendu="defaut" ;;
    pleinecran) attendu="ruban" ;;
    web) attendu="html" ;;
    plan) attendu="titres" ;;
    brouillon) attendu="rapide" ;;
  esac
  if [ "$question" = "$attendu" ]; then
    echo "$mode : OUI"
    ok=$((ok + 1))
  else
    echo "$mode : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'bu-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Sélectionner sans la souris',
    goal: 'Associer chaque geste de sélection à sa portée : mot, phrase, paragraphe, document.',
    brief: '<p>Le script lit <strong>n lignes</strong> « geste cible » : geste est un code parmi ' +
      '<code>doubleclic</code>, <code>ctrlclic</code>, <code>tripleclic</code> ou <code>ctrla</code> et ' +
      'cible un code parmi <code>mot</code>, <code>phrase</code>, <code>paragraphe</code> ou ' +
      '<code>document</code>. Il affiche <code>geste : cible</code> si le couple est juste, sinon ' +
      '<code>geste : AUTRE</code>, puis <code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r geste cible
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Les quatre gestes du support : doubleclic-mot, ctrlclic-phrase, tripleclic-paragraphe, ctrla-document.',
      'Compare la cible annoncée à la cible attendue du geste.'
    ],
    examples: [
      { stdin: '2\ndoubleclic mot\nctrla phrase\n', expected: 'doubleclic : mot\nctrla : AUTRE\njustes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre gestes', stdin: '4\ndoubleclic mot\nctrlclic phrase\ntripleclic paragraphe\nctrla document\n', expected: 'doubleclic : mot\nctrlclic : phrase\ntripleclic : paragraphe\nctrla : document\njustes : 4/4' },
      { label: 'Deux confusions', stdin: '3\nctrlclic mot\ndoubleclic phrase\ntripleclic paragraphe\n', expected: 'ctrlclic : AUTRE\ndoubleclic : AUTRE\ntripleclic : paragraphe\njustes : 1/3' },
      { label: 'Document entier', stdin: '2\nctrla document\ntripleclic document\n', expected: 'ctrla : document\ntripleclic : AUTRE\njustes : 1/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r geste cible
  case "$geste" in
    doubleclic) attendu="mot" ;;
    ctrlclic) attendu="phrase" ;;
    tripleclic) attendu="paragraphe" ;;
    ctrla) attendu="document" ;;
  esac
  if [ "$cible" = "$attendu" ]; then
    echo "$geste : $cible"
    ok=$((ok + 1))
  else
    echo "$geste : AUTRE"
  fi
done
echo "justes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Word : mise en forme et mise en page
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'bu-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Les quatre alignements',
    goal: 'Décrire ce que fait chaque alignement de paragraphe sur les bords du texte.',
    brief: '<p>Le script lit <strong>n lignes</strong> « alignement bord » : bord est un code parmi ' +
      '<code>gauche</code>, <code>droite</code>, <code>centre</code> ou <code>justifie</code>. Il affiche ' +
      '<code>alignement : OUI</code> quand le bord annoncé correspond (gauche→gauche, droite→droite, ' +
      'centre→centre, justifie→les deux bords), <code>alignement : NON</code> sinon, puis ' +
      '<code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r alignement bord
  # À compléter : le bord annoncé correspond-il ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Seul « justifie » aligne les deux bords à la fois ; les trois autres ne touchent qu\'à leur bord.',
      'Un case par alignement donne le bord attendu.'
    ],
    examples: [
      { stdin: '2\ncentre centre\njustifie droite\n', expected: 'centre : OUI\njustifie : NON\njustes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre', stdin: '4\ngauche gauche\ndroite droite\ncentre centre\njustifie lesdeux\n', expected: 'gauche : OUI\ndroite : OUI\ncentre : OUI\njustifie : OUI\njustes : 4/4' },
      { label: 'Deux erreurs', stdin: '3\ngauche droite\njustifie lesdeux\ncentre gauche\n', expected: 'gauche : NON\njustifie : OUI\ncentre : NON\njustes : 1/3' },
      { label: 'Justifie partout', stdin: '2\njustifie lesdeux\ngauche lesdeux\n', expected: 'justifie : OUI\ngauche : NON\njustes : 1/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r alignement bord
  case "$alignement" in
    gauche) attendu="gauche" ;;
    droite) attendu="droite" ;;
    centre) attendu="centre" ;;
    justifie) attendu="lesdeux" ;;
  esac
  if [ "$bord" = "$attendu" ]; then
    echo "$alignement : OUI"
    ok=$((ok + 1))
  else
    echo "$alignement : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'bu-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Portrait ou paysage',
    goal: 'Valider l\'orientation demandée pour chaque type de document.',
    brief: '<p>Le script lit <strong>n lignes</strong> « document orientation » : orientation est un code ' +
      'parmi <code>portrait</code> ou <code>paysage</code>. Pour chaque ligne il affiche ' +
      '<code>document : conforme</code> quand l\'orientation correspond à l\'usage normal — lettres et ' +
      'rapports en portrait, tableaux larges et diaporamas en paysage — sinon ' +
      '<code>document : a revoir</code>. Il termine par <code>conformes : X/n</code>. À titre de règle, un ' +
      '<code>lettre</code> exige <code>portrait</code>, un <code>tableau</code> exige <code>paysage</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r document orientation
  # À compléter : conforme ou à revoir ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Un case sur le document donne l\'orientation attendue.',
      'Les autres documents sont signalés mais pas comptés comme conformes.'
    ],
    examples: [
      { stdin: '2\nlettre portrait\ntableau portrait\n', expected: 'lettre : conforme\ntableau : a revoir\nconformes : 1/2' }
    ],
    tests: [
      { label: 'Deux usages', stdin: '2\nlettre portrait\ntableau paysage\n', expected: 'lettre : conforme\ntableau : conforme\nconformes : 2/2' },
      { label: 'Inversés', stdin: '2\nlettre paysage\ntableau portrait\n', expected: 'lettre : a revoir\ntableau : a revoir\nconformes : 0/2' },
      { label: 'Trois documents', stdin: '3\nlettre portrait\nrapport portrait\ntableau portrait\n', expected: 'lettre : conforme\nrapport : conforme\ntableau : a revoir\nconformes : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r document orientation
  case "$document" in
    lettre|rapport) attendu="portrait" ;;
    tableau) attendu="paysage" ;;
  esac
  if [ "$orientation" = "$attendu" ]; then
    echo "$document : conforme"
    ok=$((ok + 1))
  else
    echo "$document : a revoir"
  fi
done
echo "conformes : $ok/$n"
`
  },
  {
    id: 'bu-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Raccourcis de l\'essentiel',
    goal: 'Retrouver l\'effet de chaque raccourci-clavier de Word.',
    brief: '<p>Le script lit <strong>n lignes</strong> « raccourci action » : raccourci est un code parmi ' +
      '<code>ctrls</code>, <code>ctrlp</code>, <code>ctrla</code> ou <code>ctrlz</code> et action un code ' +
      'parmi <code>enregistrer</code>, <code>imprimer</code>, <code>toutselectionner</code> ou ' +
      '<code>annuler</code>. Il affiche <code>raccourci : OUI</code> si le couple est juste, ' +
      '<code>raccourci : NON</code> sinon, puis <code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r raccourci action
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'ctrls-enregistrer, ctrlp-imprimer, ctrla-toutselectionner, ctrlz-annuler.',
      'Le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '2\nctrls enregistrer\nctrlp annuler\n', expected: 'ctrls : OUI\nctrlp : NON\njustes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre', stdin: '4\nctrls enregistrer\nctrlp imprimer\nctrla toutselectionner\nctrlz annuler\n', expected: 'ctrls : OUI\nctrlp : OUI\nctrla : OUI\nctrlz : OUI\njustes : 4/4' },
      { label: 'Deux confusions', stdin: '2\nctrla annuler\nctrlz toutselectionner\n', expected: 'ctrla : NON\nctrlz : NON\njustes : 0/2' },
      { label: 'Série mixte', stdin: '3\nctrlp imprimer\nctrls imprimer\nctrlz annuler\n', expected: 'ctrlp : OUI\nctrls : NON\nctrlz : OUI\njustes : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r raccourci action
  case "$raccourci" in
    ctrls) attendu="enregistrer" ;;
    ctrlp) attendu="imprimer" ;;
    ctrla) attendu="toutselectionner" ;;
    ctrlz) attendu="annuler" ;;
  esac
  if [ "$action" = "$attendu" ]; then
    echo "$raccourci : OUI"
    ok=$((ok + 1))
  else
    echo "$raccourci : NON"
  fi
done
echo "justes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Excel : la feuille de calcul
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'bu-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Texte ou nombre',
    goal: 'Simuler l\'alignement par défaut d\'Excel : le texte à gauche, les chiffres à droite.',
    brief: '<p>Le script lit <strong>n lignes</strong> « valeur type » : type est un code parmi ' +
      '<code>texte</code> ou <code>nombre</code>. Pour chaque ligne il affiche ' +
      '<code>valeur : aligne a gauche</code> si type vaut <code>texte</code>, ' +
      '<code>valeur : aligne a droite</code> si type vaut <code>nombre</code>, et rien pour tout autre ' +
      'type. Il termine par <code>textes : X / nombres : Y</code>.</p>',
    starter: `read -r n
textes=0
nombres=0
for ((i=0; i<n; i++)); do
  read -r valeur type
  # À compléter : alignement par défaut, compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Deux cas seulement : texte à gauche, nombre à droite.',
      'Le bilan affiche les deux compteurs sur une seule ligne.'
    ],
    examples: [
      { stdin: '3\nclient texte\n1200 nombre\nADresse texte\n', expected: 'client : aligne a gauche\n1200 : aligne a droite\nADresse : aligne a gauche\ntextes : 2 / nombres : 1' }
    ],
    tests: [
      { label: 'Deux nombres', stdin: '2\n99 nombre\n42 nombre\n', expected: '99 : aligne a droite\n42 : aligne a droite\ntextes : 0 / nombres : 2' },
      { label: 'Mixte', stdin: '4\na texte\n1 nombre\nb texte\n2 nombre\n', expected: 'a : aligne a gauche\n1 : aligne a droite\nb : aligne a gauche\n2 : aligne a droite\ntextes : 2 / nombres : 2' },
      { label: 'Un seul', stdin: '1\nzip texte\n', expected: 'zip : aligne a gauche\ntextes : 1 / nombres : 0' }
    ],
    solution: `read -r n
textes=0
nombres=0
for ((i=0; i<n; i++)); do
  read -r valeur type
  if [ "$type" = "texte" ]; then
    echo "$valeur : aligne a gauche"
    textes=$((textes + 1))
  else
    echo "$valeur : aligne a droite"
    nombres=$((nombres + 1))
  fi
done
echo "textes : $textes / nombres : $nombres"
`
  },
  {
    id: 'bu-c3-e2',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Les barres de la fenêtre',
    goal: 'Retrouver le rôle de chaque barre de la fenêtre Excel.',
    brief: '<p>Le script lit <strong>n lignes</strong> « barre role » : barre est un code parmi ' +
      '<code>formule</code>, <code>titre</code>, <code>etat</code> ou <code>accesrapide</code> et role un ' +
      'code parmi <code>cellule</code>, <code>nomdoc</code>, <code>options</code> ou ' +
      '<code>commandes</code>. Il affiche <code>barre : OUI</code> quand le couple est juste — ' +
      'formule voit le contenu de la cellule, titre affiche nomdoc, etat montre les options activées, ' +
      'accesrapide regroupe les commandes — sinon <code>barre : NON</code>, puis ' +
      '<code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r barre role
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Les quatre couples du support : formule-cellule, titre-nomdoc, etat-options, accesrapide-commandes.',
      'Un case sur la barre donne le rôle attendu.'
    ],
    examples: [
      { stdin: '2\nformule cellule\netat cellule\n', expected: 'formule : OUI\netat : NON\njustes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre', stdin: '4\nformule cellule\ntitre nomdoc\netat options\naccesrapide commandes\n', expected: 'formule : OUI\ntitre : OUI\netat : OUI\naccesrapide : OUI\njustes : 4/4' },
      { label: 'Deux confusions', stdin: '3\ntitre cellule\netat nomdoc\nformule cellule\n', expected: 'titre : NON\netat : NON\nformule : OUI\njustes : 1/3' },
      { label: 'Acces rapide', stdin: '2\naccesrapide commandes\naccesrapide options\n', expected: 'accesrapide : OUI\naccesrapide : NON\njustes : 1/2' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r barre role
  case "$barre" in
    formule) attendu="cellule" ;;
    titre) attendu="nomdoc" ;;
    etat) attendu="options" ;;
    accesrapide) attendu="commandes" ;;
  esac
  if [ "$role" = "$attendu" ]; then
    echo "$barre : OUI"
    ok=$((ok + 1))
  else
    echo "$barre : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'bu-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Gérer les feuilles',
    goal: 'Nommer l\'effet de chaque action sur une feuille de calcul.',
    brief: '<p>Le script lit <strong>n lignes</strong> « action effet » : action est un code parmi ' +
      '<code>renommer</code>, <code>inserer</code>, <code>copier</code> ou <code>supprimer</code> et effet ' +
      'un code parmi <code>nouveaunom</code>, <code>nouvellefeuille</code>, <code>doublon</code> ou ' +
      '<code>disparition</code>. Il affiche <code>action : OUI</code> si le couple est juste, sinon ' +
      '<code>action : NON</code>, puis <code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r action effet
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Clic droit sur l\'onglet : renommer-nouveaunom, inserer-nouvellefeuille, copier-doublon, supprimer-disparition.',
      'Le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '2\nrenommer nouveaunom\ncopier disparition\n', expected: 'renommer : OUI\ncopier : NON\njustes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre', stdin: '4\nrenommer nouveaunom\ninserer nouvellefeuille\ncopier doublon\nsupprimer disparition\n', expected: 'renommer : OUI\ninserer : OUI\ncopier : OUI\nsupprimer : OUI\njustes : 4/4' },
      { label: 'Deux confusions', stdin: '2\ninserer doublon\ncopier nouvellefeuille\n', expected: 'inserer : NON\ncopier : NON\njustes : 0/2' },
      { label: 'Série mixte', stdin: '3\nsupprimer disparition\nrenommer doublon\ninserer nouvellefeuille\n', expected: 'supprimer : OUI\nrenommer : NON\ninserer : OUI\njustes : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r action effet
  case "$action" in
    renommer) attendu="nouveaunom" ;;
    inserer) attendu="nouvellefeuille" ;;
    copier) attendu="doublon" ;;
    supprimer) attendu="disparition" ;;
  esac
  if [ "$effet" = "$attendu" ]; then
    echo "$action : OUI"
    ok=$((ok + 1))
  else
    echo "$action : NON"
  fi
done
echo "justes : $ok/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Excel : les formules et les fonctions statistiques
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'bu-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'La formule commence par =',
    goal: 'Reproduire un mini tableur : lire des valeurs et calculer somme, moyenne et étendue.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n valeurs entières</strong>, une par ' +
      'ligne. Il affiche <code>somme : X</code>, <code>moyenne : Y</code> (division entière) puis ' +
      '<code>etendue : max - min</code> — la différence entre la plus grande et la plus petite valeur, ' +
      'comme le font ensemble MAX et MIN.</p>',
    starter: `read -r n
somme=0
max=0
min=999999
for ((i=0; i<n; i++)); do
  read -r v
  # À compléter : cumul, max, min.
done
# À compléter : somme, moyenne entière, étendue.
`,
    hints: [
      'Mets à jour max si v est plus grand, min si v est plus petit, et cumule la somme.',
      'La moyenne entière se calcule avec / (bash refuse les décimales) ; l\'étendue vaut max - min.'
    ],
    examples: [
      { stdin: '4\n10\n20\n30\n40\n', expected: 'somme : 100\nmoyenne : 25\netendue : 30' }
    ],
    tests: [
      { label: 'Trois valeurs', stdin: '3\n8\n2\n5\n', expected: 'somme : 15\nmoyenne : 5\netendue : 6' },
      { label: 'Valeurs égales', stdin: '2\n7\n7\n', expected: 'somme : 14\nmoyenne : 7\netendue : 0' },
      { label: 'Ordre inversé', stdin: '4\n40\n30\n20\n10\n', expected: 'somme : 100\nmoyenne : 25\netendue : 30' }
    ],
    solution: `read -r n
somme=0
max=0
min=999999
for ((i=0; i<n; i++)); do
  read -r v
  somme=$((somme + v))
  if [ "$v" -gt "$max" ]; then max=$v ; fi
  if [ "$v" -lt "$min" ]; then min=$v ; fi
done
moyenne=$((somme / n))
etendue=$((max - min))
echo "somme : $somme"
echo "moyenne : $moyenne"
echo "etendue : $etendue"
`
  },
  {
    id: 'bu-c4-e2',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Somme, moyenne, max, min',
    goal: 'Simuler les quatre fonctions statistiques de base sur une colonne de notes.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n notes entières</strong>. Il affiche ' +
      'successivement <code>=SOMME(...) → X</code>, <code>=MOYENNE(...) → Y</code> (division entière), ' +
      '<code>=MAX(...) → M</code> puis <code>=MIN(...) → m</code>, dans cet ordre exact.</p>',
    starter: `read -r n
somme=0
for ((i=0; i<n; i++)); do
  read -r note
  # À compléter : cumul et extrêmes.
done
# À compléter : les quatre lignes de résultats.
`,
    hints: [
      'Même logique que la fiche précédente, mais avec les noms de fonctions dans la sortie.',
      'L\'ordre de sortie est somme, moyenne, max, min.'
    ],
    examples: [
      { stdin: '3\n12\n16\n14\n', expected: '=SOMME(...) -> 42\n=MOYENNE(...) -> 14\n=MAX(...) -> 16\n=MIN(...) -> 12' }
    ],
    tests: [
      { label: 'Deux notes', stdin: '2\n9\n11\n', expected: '=SOMME(...) -> 20\n=MOYENNE(...) -> 10\n=MAX(...) -> 11\n=MIN(...) -> 9' },
      { label: 'Cinq notes', stdin: '5\n10\n20\n15\n5\n18\n', expected: '=SOMME(...) -> 68\n=MOYENNE(...) -> 13\n=MAX(...) -> 20\n=MIN(...) -> 5' },
      { label: 'Identiques', stdin: '3\n8\n8\n8\n', expected: '=SOMME(...) -> 24\n=MOYENNE(...) -> 8\n=MAX(...) -> 8\n=MIN(...) -> 8' }
    ],
    solution: `read -r n
somme=0
max=0
min=999999
for ((i=0; i<n; i++)); do
  read -r note
  somme=$((somme + note))
  if [ "$note" -gt "$max" ]; then max=$note ; fi
  if [ "$note" -lt "$min" ]; then min=$note ; fi
done
echo "=SOMME(...) -> $somme"
echo "=MOYENNE(...) -> $((somme / n))"
echo "=MAX(...) -> $max"
echo "=MIN(...) -> $min"
`
  },
  {
    id: 'bu-c4-e3',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'NB et NBVAL',
    goal: 'Distinguer les cellules numériques (NB) des cellules non vides (NBVAL).',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n cellules</strong> au format ' +
      '<code>contenu type</code> où type vaut <code>nombre</code>, <code>texte</code> ou ' +
      '<code>vide</code>. Pour chaque cellule non vide il affiche <code>cellule : occupee</code> ; il ' +
      'termine par <code>NB : X</code> (cellules numériques), <code>NBVAL : Y</code> (non vides) et ' +
      '<code>vides : Z</code>.</p>',
    starter: `read -r n
nb=0
nbval=0
vides=0
for ((i=0; i<n; i++)); do
  read -r contenu type
  # À compléter : compter selon le type.
done
# À compléter : les trois lignes de bilan.
`,
    hints: [
      'NB compte les nombres ; NBVAL compte tout ce qui n\'est pas vide.',
      'Trois compteurs distincts, trois lignes de bilan dans l\'ordre NB, NBVAL, vides.'
    ],
    examples: [
      { stdin: '4\n12 nombre\nchat texte\n - vide\n7 nombre\n', expected: '12 : occupee\nchat : occupee\n7 : occupee\nNB : 2\nNBVAL : 3\nvides : 1' }
    ],
    tests: [
      { label: 'Aucun vide', stdin: '3\n1 nombre\ndeux texte\n3 nombre\n', expected: '1 : occupee\ndeux : occupee\n3 : occupee\nNB : 2\nNBVAL : 3\nvides : 0' },
      { label: 'Que des nombres', stdin: '2\n5 nombre\n9 nombre\n', expected: '5 : occupee\n9 : occupee\nNB : 2\nNBVAL : 2\nvides : 0' },
      { label: 'Majorite vide', stdin: '3\n - vide\n - vide\n8 nombre\n', expected: '8 : occupee\nNB : 1\nNBVAL : 1\nvides : 2' }
    ],
    solution: `read -r n
nb=0
nbval=0
vides=0
for ((i=0; i<n; i++)); do
  read -r contenu type
  if [ "$type" = "vide" ]; then
    vides=$((vides + 1))
  else
    echo "$contenu : occupee"
    nbval=$((nbval + 1))
    if [ "$type" = "nombre" ]; then
      nb=$((nb + 1))
    fi
  fi
done
echo "NB : $nb"
echo "NBVAL : $nbval"
echo "vides : $vides"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Excel : conditionnelles et texte
  // ═════════════════════ seuil: commission du responsable commercial
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'bu-c5-e1',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'La fonction SI',
    goal: 'Transposer la commission du support : le SI d\'Excel devient un if en Bash.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « agent ca » ' +
      '(chiffre d\'affaires entier). Commission du support : <code>10%</code> si CA &lt; 10000, ' +
      '<code>15%</code> si 10000 &lt;= CA &lt; 50000, <code>20%</code> si CA &gt;= 50000. Pour chaque ' +
      'agent il affiche <code>agent : X%</code> ; il termine par <code>commission moyenne : P%</code> ' +
      '(moyenne entière des taux).</p>',
    starter: `read -r n
tot=0
for ((i=0; i<n; i++)); do
  read -r agent ca
  # À compléter : le taux selon le CA, cumuler.
done
# À compléter : la commission moyenne entière.
`,
    hints: [
      'Teste d\'abord le plus grand seuil : >= 50000, puis >= 10000, sinon 10.',
      'Cumule les taux pour la moyenne entière.'
    ],
    examples: [
      { stdin: '3\nana 5000\nben 20000\ncleo 60000\n', expected: 'ana : 10%\nben : 15%\ncleo : 20%\ncommission moyenne : 15%' }
    ],
    tests: [
      { label: 'Aux seuils', stdin: '2\nana 10000\nben 50000\n', expected: 'ana : 15%\nben : 20%\ncommission moyenne : 17%' },
      { label: 'Petits CA', stdin: '2\nana 9999\nben 0\n', expected: 'ana : 10%\nben : 10%\ncommission moyenne : 10%' },
      { label: 'Trois zones', stdin: '3\nana 15000\nben 45000\ncleo 55000\n', expected: 'ana : 15%\nben : 15%\ncleo : 20%\ncommission moyenne : 16%' }
    ],
    solution: `read -r n
tot=0
for ((i=0; i<n; i++)); do
  read -r agent ca
  if [ "$ca" -ge 50000 ]; then taux=20
  elif [ "$ca" -ge 10000 ]; then taux=15
  else taux=10
  fi
  echo "$agent : $taux%"
  tot=$((tot + taux))
done
echo "commission moyenne : $((tot / n))%"
`
  },
  {
    id: 'bu-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Gauche, droite, STXT',
    goal: 'Reproduire les fonctions de texte sur des chaînes : Gauche, Droite et STXT.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « chaine op a b » ' +
      'où op est un code parmi <code>gauche</code>, <code>droite</code> ou <code>stxt</code> : pour ' +
      'gauche et droite, a est le nombre de caractères (b vaut 0) ; pour stxt, a est la position de ' +
      'départ (1 = première lettre) et b le nombre de caractères. Il affiche le résultat de chaque ' +
      'opération : Gauche extrait les a premiers caractères, Droite les a derniers, STXT extrait b ' +
      'caractères à partir de la position a.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r chaine op a b
  # À compléter : extraire selon l'opération.
done
`,
    hints: [
      'Gauche : ${chaine:0:n} ; Droite : ${chaine: -n} — attention à l\'espace avant le signe moins.',
      'STXT : ${chaine:n1-1:n2} — la position Excel commence à 1, l\'extraction bash à 0.'
    ],
    examples: [
      { stdin: '3\ninformatique gauche 3 0\ninformatique droite 5 0\ninformatique stxt 2 3\n', expected: 'inf\ntique\nnfo' }
    ],
    tests: [
      { label: 'Un caractère', stdin: '2\nword gauche 1 0\nword droite 1 0\n', expected: 'w\nd' },
      { label: 'Chaîne entière', stdin: '2\nexcel gauche 5 0\nexcel stxt 1 5\n', expected: 'excel\nexcel' },
      { label: 'Milieu et fin', stdin: '2\nbureautique stxt 5 4\nbureautique droite 4 0\n', expected: 'auti\nique' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r chaine op a b
  case "$op" in
    gauche) echo "\${chaine:0:a}" ;;
    droite) echo "\${chaine: -a}" ;;
    stxt) echo "\${chaine:a-1:b}" ;;
  esac
done
`
  },
  {
    id: 'bu-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Le SI imbriqué',
    goal: 'Reproduire la fonction SI imbriquée : mention selon la note, avec messages composés.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « eleve note ». ' +
      'Il applique la fonction SI imbriquée du support : note &gt;= 16 → <code>eleve : tres bien</code> ; ' +
      'note &gt;= 14 → <code>eleve : bien</code> ; note &gt;= 10 → <code>eleve : passe</code> ; sinon ' +
      '<code>eleve : rattrapage</code>. Il termine par <code>recales : X</code> (notes sous 10).</p>',
    starter: `read -r n
recales=0
for ((i=0; i<n; i++)); do
  read -r eleve note
  # À compléter : la mention, compter les recales.
done
# À compléter : le bilan.
`,
    hints: [
      'Le SI imbriqué teste du plus strict au plus large : 16, 14, 10, sinon rattrapage.',
      'Compte un recale pour chaque note strictement sous 10.'
    ],
    examples: [
      { stdin: '4\nana 17\nben 14\ncleo 10\ndan 8\n', expected: 'ana : tres bien\nben : bien\ncleo : passe\ndan : rattrapage\nrecales : 1' }
    ],
    tests: [
      { label: 'Frontières', stdin: '3\nana 16\nben 15\ncleo 14\n', expected: 'ana : tres bien\nben : bien\ncleo : bien\nrecales : 0' },
      { label: 'Tous recales', stdin: '2\nana 9\nben 0\n', expected: 'ana : rattrapage\nben : rattrapage\nrecales : 2' },
      { label: 'Classe complète', stdin: '5\na 18\nb 13\nc 10\nd 9\ne 16\n', expected: 'a : tres bien\nb : passe\nc : passe\nd : rattrapage\ne : tres bien\nrecales : 1' }
    ],
    solution: `read -r n
recales=0
for ((i=0; i<n; i++)); do
  read -r eleve note
  if [ "$note" -ge 16 ]; then
    echo "$eleve : tres bien"
  elif [ "$note" -ge 14 ]; then
    echo "$eleve : bien"
  elif [ "$note" -ge 10 ]; then
    echo "$eleve : passe"
  else
    echo "$eleve : rattrapage"
    recales=$((recales + 1))
  fi
done
echo "recales : $recales"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — PowerPoint : la présentation
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'bu-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Les modes d\'affichage',
    goal: 'Retrouver la vocation de chaque mode d\'affichage de PowerPoint.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mode usage » : mode est un code parmi ' +
      '<code>normal</code>, <code>trieuse</code>, <code>diaporama</code> ou <code>commentaire</code> et ' +
      'usage un code parmi <code>edition</code>, <code>vueglobale</code>, <code>projection</code> ou ' +
      '<code>notes</code>. Il affiche <code>mode : OUI</code> si le couple est juste, sinon ' +
      '<code>mode : NON</code>, puis <code>justes : X/n</code>.</p>',
    starter: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r mode usage
  # À compléter : le couple juste ? Compter.
done
# À compléter : le bilan.
`,
    hints: [
      'Les quatre couples : normal-edition, trieuse-vueglobale, diaporama-projection, commentaire-notes.',
      'Un case sur le mode donne l\'usage attendu.'
    ],
    examples: [
      { stdin: '2\nnormal edition\ndiaporama edition\n', expected: 'normal : OUI\ndiaporama : NON\njustes : 1/2' }
    ],
    tests: [
      { label: 'Les quatre', stdin: '4\nnormal edition\ntrieuse vueglobale\ndiaporama projection\ncommentaire notes\n', expected: 'normal : OUI\ntrieuse : OUI\ndiaporama : OUI\ncommentaire : OUI\njustes : 4/4' },
      { label: 'Deux confusions', stdin: '2\ntrieuse projection\ncommentaire edition\n', expected: 'trieuse : NON\ncommentaire : NON\njustes : 0/2' },
      { label: 'Série mixte', stdin: '3\ndiaporama projection\nnormal vueglobale\ntrieuse vueglobale\n', expected: 'diaporama : OUI\nnormal : NON\ntrieuse : OUI\njustes : 2/3' }
    ],
    solution: `read -r n
ok=0
for ((i=0; i<n; i++)); do
  read -r mode usage
  case "$mode" in
    normal) attendu="edition" ;;
    trieuse) attendu="vueglobale" ;;
    diaporama) attendu="projection" ;;
    commentaire) attendu="notes" ;;
  esac
  if [ "$usage" = "$attendu" ]; then
    echo "$mode : OUI"
    ok=$((ok + 1))
  else
    echo "$mode : NON"
  fi
done
echo "justes : $ok/$n"
`
  },
  {
    id: 'bu-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Composer le diaporama',
    goal: 'Valider la construction d\'une présentation : chaque diapositive a un rôle et une place.',
    brief: '<p>Le script lit <strong>n lignes</strong> « diapo type » : type est un code parmi ' +
      '<code>titre</code>, <code>contenu</code>, <code>graphique</code> ou <code>conclusion</code>. ' +
      'Présentation conforme : la diapositive 1 est un <code>titre</code>, la dernière une ' +
      '<code>conclusion</code>, les autres un <code>contenu</code> ou un <code>graphique</code>. Pour ' +
      'chaque diapositive il affiche <code>diapo : conforme</code> ou <code>diapo : a revoir</code> ; il ' +
      'termine par <code>presentation : conforme</code> si TOUTES les diapositives sont conformes, ' +
      '<code>presentation : a revoir</code> dès qu\'une seule faute.</p>',
    starter: `read -r n
valide=1
for ((i=1; i<=n; i++)); do
  read -r diapo type
  # À compléter : conforme selon la place, invalider si besoin.
done
# À compléter : le verdict de la présentation.
`,
    hints: [
      'Le numéro de la diapositive est le compteur i : 1 = titre, n = conclusion, entre les deux contenu ou graphique.',
      'Une seule diapositive fautive invalide toute la présentation.'
    ],
    examples: [
      { stdin: '3\nd1 titre\nd2 contenu\nd3 conclusion\n', expected: 'd1 : conforme\nd2 : conforme\nd3 : conforme\npresentation : conforme' }
    ],
    tests: [
      { label: 'Titre mal placé', stdin: '3\nd1 contenu\nd2 contenu\nd3 conclusion\n', expected: 'd1 : a revoir\nd2 : conforme\nd3 : conforme\npresentation : a revoir' },
      { label: 'Avec graphique', stdin: '4\nd1 titre\nd2 graphique\nd3 contenu\nd4 conclusion\n', expected: 'd1 : conforme\nd2 : conforme\nd3 : conforme\nd4 : conforme\npresentation : conforme' },
      { label: 'Fin manquante', stdin: '3\nd1 titre\nd2 contenu\nd3 contenu\n', expected: 'd1 : conforme\nd2 : conforme\nd3 : a revoir\npresentation : a revoir' }
    ],
    solution: `read -r n
valide=1
for ((i=1; i<=n; i++)); do
  read -r diapo type
  if [ "$i" = "1" ]; then
    attendu="titre"
  elif [ "$i" = "$n" ]; then
    attendu="conclusion"
  fi
  if [ "$i" != "1" ] && [ "$i" != "$n" ]; then
    if [ "$type" = "contenu" ] || [ "$type" = "graphique" ]; then
      echo "$diapo : conforme"
    else
      echo "$diapo : a revoir"
      valide=0
    fi
  elif [ "$type" = "$attendu" ]; then
    echo "$diapo : conforme"
  else
    echo "$diapo : a revoir"
    valide=0
  fi
done
if [ "$valide" = "1" ]; then
  echo "presentation : conforme"
else
  echo "presentation : a revoir"
fi
`
  },
  {
    id: 'bu-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'Le minutage du diaporama',
    goal: 'Simuler le minutage automatique : chaque diapositive s\'affiche selon sa durée annoncée.',
    brief: '<p>Le script lit d\'abord <strong>n</strong>, puis <strong>n lignes</strong> « diapo duree » ' +
      '(durée entière en secondes). Le diaporama avance automatiquement : il affiche ' +
      '<code>diapo : Xs</code> pour chaque diapositive, puis <code>total : T</code> et ' +
      '<code>moyenne : M</code> (division entière). Une durée à 0 bloque la présentation : dans ce cas ' +
      'le script affiche <code>diapo : duree nulle</code> à sa place, <code>total : -1</code> et ' +
      '<code>moyenne : -1</code>.</p>',
    starter: `read -r n
total=0
bloque=0
for ((i=0; i<n; i++)); do
  read -r diapo duree
  # À compléter : cumuler ou signaler la durée nulle.
done
# À compléter : total, moyenne ou les deux à -1.
`,
    hints: [
      'Dès qu\'une durée vaut 0, pose bloque=1 sans jamais la remettre à 0 : le bilan passe à -1.',
      'La moyenne entière ne se calcule que si rien ne bloque.'
    ],
    examples: [
      { stdin: '3\nd1 10\nd2 20\nd3 30\n', expected: 'd1 : 10s\nd2 : 20s\nd3 : 30s\ntotal : 60\nmoyenne : 20' }
    ],
    tests: [
      { label: 'Duree nulle', stdin: '3\nd1 10\nd2 0\nd3 30\n', expected: 'd1 : 10s\nd2 : duree nulle\nd3 : 30s\ntotal : -1\nmoyenne : -1' },
      { label: 'Une diapo', stdin: '1\nd1 15\n', expected: 'd1 : 15s\ntotal : 15\nmoyenne : 15' },
      { label: 'Arrondi entier', stdin: '3\nd1 10\nd2 11\nd3 12\n', expected: 'd1 : 10s\nd2 : 11s\nd3 : 12s\ntotal : 33\nmoyenne : 11' }
    ],
    solution: `read -r n
total=0
bloque=0
for ((i=0; i<n; i++)); do
  read -r diapo duree
  if [ "$duree" = "0" ]; then
    echo "$diapo : duree nulle"
    bloque=1
  else
    echo "$diapo : \${duree}s"
    total=$((total + duree))
  fi
done
if [ "$bloque" = "1" ]; then
  echo "total : -1"
  echo "moyenne : -1"
else
  echo "total : $total"
  echo "moyenne : $((total / n))"
fi
`
  }
];

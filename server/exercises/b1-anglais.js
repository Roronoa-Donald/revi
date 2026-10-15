module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — Business vocabulary basics
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'en-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Business or not',
    goal: 'Trier les mots entre registre professionnel et registre familier, puis dresser le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « type mot » : type vaut <code>b</code> (business) ' +
      'ou <code>c</code> (casual). Pour chaque ligne il affiche <code>mot : categorie</code>, où categorie ' +
      'vaut <code>professionnel</code> (business) ou <code>familier</code> (casual). Enfin il affiche ' +
      '<code>bilan : X business / Y casual</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r type mot
  # À compléter : afficher la catégorie, puis compter.
done
`,
    hints: [
      'Deux compteurs posés à 0 avant la boucle : b et c incrémentent chacun le sien.',
      'Le bilan sort après la boucle, au format exact « X business / Y casual ».'
    ],
    examples: [
      { stdin: '4\nb invoice\nc gonna\nb report\nc wanna\n', expected: 'invoice : professionnel\ngonna : familier\nreport : professionnel\nwanna : familier\nbilan : 2 business / 2 casual' }
    ],
    tests: [
      { label: 'Un seul mot familier', stdin: '1\nc hey\n', expected: 'hey : familier\nbilan : 0 business / 1 casual' },
      { label: 'Deux mots business', stdin: '2\nb stakeholder\nb deadline\n', expected: 'stakeholder : professionnel\ndeadline : professionnel\nbilan : 2 business / 0 casual' },
      { label: 'Cinq mots mixtes', stdin: '5\nb budget\nc yo\nb quarterly\nc gotta\nb sprint\n', expected: 'budget : professionnel\nyo : familier\nquarterly : professionnel\ngotta : familier\nsprint : professionnel\nbilan : 3 business / 2 casual' }
    ],
    solution: `read -r n
b=0
c=0
for ((i=0; i<n; i++)); do
  read -r type mot
  if [ "$type" = "b" ]; then
    echo "$mot : professionnel"
    b=$((b + 1))
  else
    echo "$mot : familier"
    c=$((c + 1))
  fi
done
echo "bilan : $b business / $c casual"
`
  },
  {
    id: 'en-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Client or customer',
    goal: 'Appliquer la distinction clé du support : le client (relation longue) contre le customer (achat ponctuel).',
    brief: '<p>Le script lit <strong>n lignes</strong> « personne relation » : relation vaut <code>long</code> ' +
      '(relation suivie) ou <code>once</code> (achat ponctuel). Pour chaque ligne il affiche ' +
      '<code>personne : statut</code>, où statut vaut <code>client</code> (long) ou <code>customer</code> ' +
      '(once). Il termine par <code>clients fideles : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r personne relation
  # À compléter : statuer, puis compter les relations longues.
done
`,
    hints: [
      'Un if sur la relation suffit : long et once sont les deux seules valeurs.',
      'Le compteur suit exactement les statuts « client ».'
    ],
    examples: [
      { stdin: '3\nTanaka long\nWalker once\nRivera long\n', expected: 'Tanaka : client\nWalker : customer\nRivera : client\nclients fideles : 2/3' }
    ],
    tests: [
      { label: 'Un seul achat', stdin: '1\nSmith once\n', expected: 'Smith : customer\nclients fideles : 0/1' },
      { label: 'Deux relations longues', stdin: '2\nDialou long\nKossi long\n', expected: 'Dialou : client\nKossi : client\nclients fideles : 2/2' },
      { label: 'Cinq personnes mixtes', stdin: '5\nA long\nB once\nC long\nD once\nE long\n', expected: 'A : client\nB : customer\nC : client\nD : customer\nE : client\nclients fideles : 3/5' }
    ],
    solution: `read -r n
fideles=0
for ((i=0; i<n; i++)); do
  read -r personne relation
  if [ "$relation" = "long" ]; then
    echo "$personne : client"
    fideles=$((fideles + 1))
  else
    echo "$personne : customer"
  fi
done
echo "clients fideles : $fideles/$n"
`
  },
  {
    id: 'en-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'False friends',
    goal: 'Repérer les faux amis français-anglais : actually, eventually, library — et corriger la phrase.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot sens » : sens vaut <code>now</code> (en fait, ' +
      'pour actually), <code>finally</code> (finalement, pour eventually), <code>bookshop</code> (librairie) ' +
      'ou <code>ok</code> (faux ami absent). Le script signale chaque piège : pour now il affiche ' +
      '<code>mot : signifie en fait</code>, pour finally <code>mot : signifie finalement</code>, pour ' +
      'bookshop <code>mot : signifie bibliotheque</code>, pour ok <code>mot : sans piege</code>. Il termine ' +
      'par <code>faux amis : X/n</code> (les trois premiers sens).</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r mot sens
  # À compléter : traduire le sens, compter les pièges.
done
`,
    hints: [
      'Un case à quatre sens couvre toutes les lignes.',
      'Comptez ensemble now, finally et bookshop : ce sont les trois faux amis du support.'
    ],
    examples: [
      { stdin: '4\nactually now\neventually finally\nlibrary bookshop\nmeeting ok\n', expected: 'actually : signifie en fait\neventually : signifie finalement\nlibrary : signifie bibliotheque\nmeeting : sans piege\nfaux amis : 3/4' }
    ],
    tests: [
      { label: 'Un seul piège', stdin: '1\nactually now\n', expected: 'actually : signifie en fait\nfaux amis : 1/1' },
      { label: 'Que des mots sûrs', stdin: '2\nsprint ok\nbudget ok\n', expected: 'sprint : sans piege\nbudget : sans piege\nfaux amis : 0/2' },
      { label: 'Cinq lignes mixtes', stdin: '5\nlibrary bookshop\ndeployment ok\neventually finally\nUAT ok\nactually now\n', expected: 'library : signifie bibliotheque\ndeployment : sans piege\neventually : signifie finalement\nUAT : sans piege\nactually : signifie en fait\nfaux amis : 3/5' }
    ],
    solution: `read -r n
pieges=0
for ((i=0; i<n; i++)); do
  read -r mot sens
  case "$sens" in
    now) echo "$mot : signifie en fait" ; pieges=$((pieges + 1)) ;;
    finally) echo "$mot : signifie finalement" ; pieges=$((pieges + 1)) ;;
    bookshop) echo "$mot : signifie bibliotheque" ; pieges=$((pieges + 1)) ;;
    ok) echo "$mot : sans piege" ;;
  esac
done
echo "faux amis : $pieges/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Professional email writing
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'en-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'The CLEAR method',
    goal: 'Classer les phrases d\'un email selon la méthode CLEAR : Context, Logistics, Expectation, Action, Respect.',
    brief: '<p>Le script lit <strong>n lignes</strong> « phrase partie » : partie vaut <code>C</code>, ' +
      '<code>L</code>, <code>E</code>, <code>A</code> ou <code>R</code>. Pour chaque ligne il affiche ' +
      '<code>phrase : nom_complet</code>, où nom_complet vaut <code>context</code>, <code>logistics</code>, ' +
      '<code>expectation</code>, <code>action</code> ou <code>respect</code>. Il termine par ' +
      '<code>emails complets : ok</code> si les cinq parties sont présentes au moins une fois, ' +
      '<code>emails complets : manquant</code> sinon.</p>',
    starter: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r phrase partie
  # À compléter : afficher le nom complet, marquer la partie vue.
done
# À compléter : vérifier que les cinq parties sont présentes.
`,
    hints: [
      'Un case traduit la lettre en nom complet ; un tableau vues[partie]=1 marque le passage.',
      'Le verdict final vérifie les cinq clés : C, L, E, A, R.'
    ],
    examples: [
      { stdin: '5\np1 C\np2 L\np3 E\np4 A\np5 R\n', expected: 'p1 : context\np2 : logistics\np3 : expectation\np4 : action\np5 : respect\nemails complets : ok' }
    ],
    tests: [
      { label: 'Respect manquant', stdin: '4\np1 C\np2 L\np3 E\np4 A\n', expected: 'p1 : context\np2 : logistics\np3 : expectation\np4 : action\nemails complets : manquant' },
      { label: 'Deux contexts', stdin: '5\np1 C\np2 C\np3 L\np4 A\np5 R\n', expected: 'p1 : context\np2 : context\np3 : logistics\np4 : action\np5 : respect\nemails complets : manquant' },
      { label: 'Six phrases', stdin: '6\np1 R\np2 L\np3 C\np4 A\np5 E\np6 C\n', expected: 'p1 : respect\np2 : logistics\np3 : context\np4 : action\np5 : expectation\np6 : context\nemails complets : ok' }
    ],
    solution: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r phrase partie
  case "$partie" in
    C) echo "$phrase : context" ;;
    L) echo "$phrase : logistics" ;;
    E) echo "$phrase : expectation" ;;
    A) echo "$phrase : action" ;;
    R) echo "$phrase : respect" ;;
  esac
  vues[$partie]=1
done
complet=1
for partie in C L E A R; do
  if [ -z "\${vues[$partie]:-}" ]; then
    complet=0
  fi
done
if [ "$complet" = "1" ]; then
  echo "emails complets : ok"
else
  echo "emails complets : manquant"
fi
`
  },
  {
    id: 'en-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Formal or semi-formal',
    goal: 'Choisir le ton de l\'email selon le destinataire : formel (nouveau client, direction), semi-formel (collègue), jamais familier.',
    brief: '<p>Le script lit <strong>n lignes</strong> « destinataire audience » : audience vaut ' +
      '<code>formal</code> (nouveau client, direction), <code>semi</code> (collègue, client régulier) ou ' +
      '<code>casual</code> (jamais en entreprise). Pour chaque ligne il affiche <code>destinataire : salutation</code>, ' +
      'où salutation vaut <code>Dear Mr Smith</code> (formal), <code>Hello Sarah</code> (semi) ou ' +
      '<code>jamais en entreprise</code> (casual). Il termine par <code>emails formels : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r destinataire audience
  # À compléter : choisir la salutation, compter les formels.
done
`,
    hints: [
      'Un case à trois audiences, trois salutations.',
      'Comptez seulement les salutations formelles.'
    ],
    examples: [
      { stdin: '3\nCEO formal\nSarah semi\nMike casual\n', expected: 'CEO : Dear Mr Smith\nSarah : Hello Sarah\nMike : jamais en entreprise\nemails formels : 1/3' }
    ],
    tests: [
      { label: 'Un seul semi-formel', stdin: '1\nJohn semi\n', expected: 'John : Hello Sarah\nemails formels : 0/1' },
      { label: 'Deux formels', stdin: '2\nRivera formal\nTanaka formal\n', expected: 'Rivera : Dear Mr Smith\nTanaka : Dear Mr Smith\nemails formels : 2/2' },
      { label: 'Cinq destinataires', stdin: '5\nA formal\nB semi\nC casual\nD formal\nE semi\n', expected: 'A : Dear Mr Smith\nB : Hello Sarah\nC : jamais en entreprise\nD : Dear Mr Smith\nE : Hello Sarah\nemails formels : 2/5' }
    ],
    solution: `read -r n
formels=0
for ((i=0; i<n; i++)); do
  read -r destinataire audience
  case "$audience" in
    formal) echo "$destinataire : Dear Mr Smith" ; formels=$((formels + 1)) ;;
    semi) echo "$destinataire : Hello Sarah" ;;
    casual) echo "$destinataire : jamais en entreprise" ;;
  esac
done
echo "emails formels : $formels/$n"
`
  },
  {
    id: 'en-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'The reply all disaster',
    goal: 'Simuler la catastrophe du Reply All : suivre les destinataires, éviter la tempête d\'emails.',
    brief: '<p>Le script lit <strong>n lignes</strong> « action boite » : action vaut <code>envoi</code> ' +
      '(nouvel email à la boite), <code>replyall</code> (réponse à tous) ou <code>desabonne</code> (retirer la ' +
      'boite de la liste). La liste commence avec 0 boites ; chaque envoi ou replyall ajoute toutes les ' +
      'boites manquantes présentes sur la ligne (une seule boite par ligne). Les réponses à tous multiplient ' +
      'le trafic : chaque replyall sur une liste de X boites produit X messages. Affichage ligne par ligne : ' +
      '<code>action boite : trafic total T</code>. Final : <code>boites : X</code> et ' +
      '<code>trafic total : T</code>.</p>',
    starter: `read -r n
trafic=0
declare -A liste
for ((i=0; i<n; i++)); do
  read -r action boite
  # À compléter : gérer la liste et le trafic.
done
`,
    hints: [
      'liste[boite]=1 marque la présence ; un envoi sur une boite absente l\'ajoute (trafic +1) ; sur une boite présente, rien.',
      'Un replyall sur une boite déjà présente éclate : trafic += nombre de boites dans la liste.'
    ],
    examples: [
      { stdin: '4\nenvoi a\nenvoi b\nreplyall a\ndesabonne b\n', expected: 'envoi a : trafic total 1\nenvoi b : trafic total 2\nreplyall a : trafic total 4\ndesabonne b : trafic total 4\nboites : 1\ntrafic total : 4' }
    ],
    tests: [
      { label: 'Un envoi seul', stdin: '1\nenvoi a\n', expected: 'envoi a : trafic total 1\nboites : 1\ntrafic total : 1' },
      { label: 'Replyall sur boite absente', stdin: '2\nenvoi a\nreplyall a\n', expected: 'envoi a : trafic total 1\nreplyall a : trafic total 2\nboites : 1\ntrafic total : 2' },
      { label: 'Cinq actions', stdin: '5\nenvoi a\nenvoi b\nenvoi c\nreplyall a\nreplyall b\n', expected: 'envoi a : trafic total 1\nenvoi b : trafic total 2\nenvoi c : trafic total 3\nreplyall a : trafic total 6\nreplyall b : trafic total 9\nboites : 3\ntrafic total : 9' }
    ],
    solution: `read -r n
trafic=0
boites=0
declare -A liste
for ((i=0; i<n; i++)); do
  read -r action boite
  if [ "$action" = "envoi" ]; then
    if [ -z "\${liste[$boite]:-}" ]; then
      liste[$boite]=1
      boites=$((boites + 1))
      trafic=$((trafic + 1))
    fi
  elif [ "$action" = "replyall" ]; then
    if [ -n "\${liste[$boite]:-}" ]; then
      trafic=$((trafic + boites))
    fi
  else
    if [ -n "\${liste[$boite]:-}" ]; then
      unset 'liste[$boite]'
      boites=$((boites - 1))
    fi
  fi
  echo "$action $boite : trafic total $trafic"
done
echo "boites : $boites"
echo "trafic total : $trafic"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Oral presentations
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'en-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'The three-part structure',
    goal: 'Vérifier la structure Opening / Body / Closing d\'une présentation : dire, dire, dire.',
    brief: '<p>Le script lit <strong>n lignes</strong> « minute partie » : partie vaut <code>open</code> ' +
      '(0-30 s), <code>body</code> (1,5-2 min) ou <code>close</code> (30 s). La présentation est ' +
      '<code>valide</code> si les parties arrivent dans l\'ordre open, puis body, puis close (body peut ' +
      'apparaître plusieurs fois). Pour chaque ligne il affiche <code>partie : ok</code> ou ' +
      '<code>partie : hors structure</code>. Final : <code>presentation : valide</code> ou ' +
      '<code>presentation : a revoir</code>.</p>',
    starter: `read -r n
etape=0
for ((i=0; i<n; i++)); do
  read -r minute partie
  # À compléter : suivre open → body → close.
done
`,
    hints: [
      'Trois étapes numérotées : open avance à 1, body avance à 2 (ou reste 2), close avance à 3.',
      'Un drapeau rompu : toute sortie d\'ordre casse la présentation pour la suite.'
    ],
    examples: [
      { stdin: '4\n1 open\n2 body\n3 body\n4 close\n', expected: 'open : ok\nbody : ok\nbody : ok\nclose : ok\npresentation : valide' }
    ],
    tests: [
      { label: 'Close sans open', stdin: '1\n1 close\n', expected: 'close : hors structure\npresentation : a revoir' },
      { label: 'Ouverture double', stdin: '2\n1 open\n2 open\n', expected: 'open : ok\nopen : hors structure\npresentation : a revoir' },
      { label: 'Cinq minutes', stdin: '5\n1 open\n2 body\n3 body\n4 close\n5 close\n', expected: 'open : ok\nbody : ok\nbody : ok\nclose : ok\nclose : hors structure\npresentation : a revoir' }
    ],
    solution: `read -r n
etape=0
rompu=0
for ((i=0; i<n; i++)); do
  read -r minute partie
  if [ "$rompu" = "0" ]; then
    if [ "$partie" = "open" ] && [ "$etape" = "0" ]; then
      etape=1 ; echo "open : ok"
    elif [ "$partie" = "body" ] && [ "$etape" = "1" -o "$etape" = "2" ]; then
      etape=2 ; echo "body : ok"
    elif [ "$partie" = "close" ] && [ "$etape" = "2" ]; then
      etape=3 ; echo "close : ok"
    else
      rompu=1 ; echo "$partie : hors structure"
    fi
  else
    echo "$partie : hors structure"
  fi
done
if [ "$rompu" = "0" ] && [ "$etape" = "3" ]; then
  echo "presentation : valide"
else
  echo "presentation : a revoir"
fi
`
  },
  {
    id: 'en-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'The Grandma Rule',
    goal: 'Simplifier le jargon technique pour un public non technique : compter les termes complexes restants.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot famille » : famille vaut <code>tech</code> ' +
      '(jargon) ou <code>simple</code>. Chaque terme tech porte une pénalité de 2 points, chaque mot simple ' +
      '0 point. Affichage ligne par ligne : <code>mot : penalite P</code>. Final : ' +
      '<code>score clarte : S/10</code> où S = 10 − somme des pénalités (jamais en dessous de 0), et ' +
      '<code>grandma : comprend</code> si S ≥ 6, <code>grandma : perdu</code> sinon.</p>',
    starter: `read -r n
penalite=0
for ((i=0; i<n; i++)); do
  read -r mot famille
  # À compléter : compter la pénalité de chaque mot.
done
# À compléter : score final et verdict grandma.
`,
    hints: [
      'tech = 2 points de pénalité, simple = 0 : un if suffit.',
      'Le score est borné : si 10 − pénalités est négatif, on affiche 0.'
    ],
    examples: [
      { stdin: '4\ndeployment tech\nrelease simple\nsettings simple\nfailure tech\n', expected: 'deployment : penalite 2\nrelease : penalite 0\nsettings : penalite 0\nfailure : penalite 2\nscore clarte : 6/10\ngrandma : comprend' }
    ],
    tests: [
      { label: 'Que des mots simples', stdin: '2\nserver simple\ncrash simple\n', expected: 'server : penalite 0\ncrash : penalite 0\nscore clarte : 10/10\ngrandma : comprend' },
      { label: 'Que du jargon', stdin: '3\nAPI tech\nendpoint tech\nexception tech\n', expected: 'API : penalite 2\nendpoint : penalite 2\nexception : penalite 2\nscore clarte : 4/10\ngrandma : perdu' },
      { label: 'Cinq mots', stdin: '5\npipeline tech\nmismatch tech\nsetup simple\nwire simple\nfix simple\n', expected: 'pipeline : penalite 2\nmismatch : penalite 2\nsetup : penalite 0\nwire : penalite 0\nfix : penalite 0\nscore clarte : 6/10\ngrandma : comprend' }
    ],
    solution: `read -r n
penalite=0
for ((i=0; i<n; i++)); do
  read -r mot famille
  if [ "$famille" = "tech" ]; then
    penalite=$((penalite + 2))
    echo "$mot : penalite 2"
  else
    echo "$mot : penalite 0"
  fi
done
score=$((10 - penalite))
if [ "$score" -lt 0 ]; then
  score=0
fi
echo "score clarte : $score/10"
if [ "$score" -ge 6 ]; then
  echo "grandma : comprend"
else
  echo "grandma : perdu"
fi
`
  },
  {
    id: 'en-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'Transition phrases',
    goal: 'Compter les transitions et vérifier qu\'aucune ne manque : First, Next, Then, Finally, To summarize.',
    brief: '<p>Le script lit <strong>n lignes</strong> « position transition » : transition vaut ' +
      '<code>first</code>, <code>next</code>, <code>then</code>, <code>finally</code> ou ' +
      '<code>summary</code>. Pour chaque ligne il affiche <code>position : transition</code>. Final : une ' +
      'ligne par transition attendue, dans l\'ordre First, Next, Then, Finally, Summary : ' +
      '<code>Transition : presente</code> ou <code>Transition : absente</code>. Puis ' +
      '<code>transitions : X/5</code>.</p>',
    starter: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r position transition
  # À compléter : afficher, marquer la transition vue.
done
# À compléter : bilan des cinq transitions.
`,
    hints: [
      'Un tableau vues[transition]=1 marque le passage ; la liste d\'audit est fixe.',
      'L\'audit parcourt les cinq transitions dans l\'ordre demandé et compte les présentes.'
    ],
    examples: [
      { stdin: '5\n1 first\n2 next\n3 then\n4 finally\n5 summary\n', expected: '1 : first\n2 : next\n3 : then\n4 : finally\n5 : summary\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : presente\ntransitions : 5/5' }
    ],
    tests: [
      { label: 'Summary oubliée', stdin: '4\n1 first\n2 next\n3 then\n4 finally\n', expected: '1 : first\n2 : next\n3 : then\n4 : finally\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : absente\ntransitions : 4/5' },
      { label: 'Deux répetitions', stdin: '4\n1 first\n2 first\n3 next\n4 then\n', expected: '1 : first\n2 : first\n3 : next\n4 : then\nFirst : presente\nNext : presente\nThen : presente\nFinally : absente\nSummary : absente\ntransitions : 3/5' },
      { label: 'Sept positions', stdin: '7\n1 summary\n2 first\n3 next\n4 then\n5 finally\n6 summary\n7 first\n', expected: '1 : summary\n2 : first\n3 : next\n4 : then\n5 : finally\n6 : summary\n7 : first\nFirst : presente\nNext : presente\nThen : presente\nFinally : presente\nSummary : presente\ntransitions : 5/5' }
    ],
    solution: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r position transition
  echo "$position : $transition"
  vues[$transition]=1
done
compteur=0
audit_first=First ; audit_next=Next ; audit_then=Then ; audit_final=Finally ; audit_sum=Summary
for paire in first:First next:Next then:Then finally:Finally summary:Summary; do
  cle="\${paire%%:*}"
  libelle="\${paire##*:}"
  if [ -n "\${vues[$cle]:-}" ]; then
    echo "$libelle : presente"
    compteur=$((compteur + 1))
  else
    echo "$libelle : absente"
  fi
done
echo "transitions : $compteur/5"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Pronunciation and fluency
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'en-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'The three -ed endings',
    goal: 'Classer les verbes au prétérit selon la prononciation du -ed : /t/, /d/ ou /ɪd/.',
    brief: '<p>Le script lit <strong>n lignes</strong> « verbe son » : son vaut <code>t</code> (walked), ' +
      '<code>d</code> (played) ou <code>id</code> (wanted). Pour chaque ligne il affiche ' +
      '<code>verbe : /X/</code> où X est t, d ou ɪd. Il termine par trois lignes de comptage dans cet ordre : ' +
      '<code>son-t : X</code>, <code>son-d : X</code>, <code>son-id : X</code>.</p>',
    starter: `read -r n
t=0
d=0
id=0
for ((i=0; i<n; i++)); do
  read -r verbe son
  # À compléter : afficher le son, compter.
done
`,
    hints: [
      'Un case à trois sons : t, d, id.',
      'Les trois totaux sortent après la boucle, dans l\'ordre demandé.'
    ],
    examples: [
      { stdin: '3\nwalked t\nplayed d\nwanted id\n', expected: 'walked : /t/\nplayed : /d/\nwanted : /ɪd/\nson-t : 1\nson-d : 1\nson-id : 1' }
    ],
    tests: [
      { label: 'Un seul son', stdin: '1\nneeded id\n', expected: 'needed : /ɪd/\nson-t : 0\nson-d : 0\nson-id : 1' },
      { label: 'Deux son t', stdin: '2\nfixed t\nmissed t\n', expected: 'fixed : /t/\nmissed : /t/\nson-t : 2\nson-d : 0\nson-id : 0' },
      { label: 'Cinq verbes', stdin: '5\nlaughed t\ncalled d\nstarted id\ndeployed d\nended id\n', expected: 'laughed : /t/\ncalled : /d/\nstarted : /ɪd/\ndeployed : /d/\nended : /ɪd/\nson-t : 1\nson-d : 2\nson-id : 2' }
    ],
    solution: `read -r n
t=0
d=0
id=0
for ((i=0; i<n; i++)); do
  read -r verbe son
  case "$son" in
    t) echo "$verbe : /t/" ; t=$((t + 1)) ;;
    d) echo "$verbe : /d/" ; d=$((d + 1)) ;;
    id) echo "$verbe : /ɪd/" ; id=$((id + 1)) ;;
  esac
done
echo "son-t : $t"
echo "son-d : $d"
echo "son-id : $id"
`
  },
  {
    id: 'en-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Word stress pairs',
    goal: 'Distinguer les paires d\'accentuation : REcord (nom) / reCORD (verbe) — le sens change avec l\'accent.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot classe » : classe vaut <code>noun</code> ou ' +
      '<code>verb</code>. Pour chaque ligne il affiche <code>mot : forme</code>, où forme vaut ' +
      '<code>REcord</code> (noun) ou <code>reCORD</code> (verb). Il termine par <code>noms : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r mot classe
  # À compléter : afficher la forme accentuée, compter les noms.
done
`,
    hints: [
      'Un if sur la classe suffit : noun et verb sont les deux seules valeurs.',
      'Comptez seulement les noms (accent en tête).'
    ],
    examples: [
      { stdin: '4\nrecord noun\nrecord verb\npresent noun\npresent verb\n', expected: 'record : REcord\nrecord : reCORD\npresent : PREsent\npresent : preSENT\nnoms : 2/4' }
    ],
    tests: [
      { label: 'Un seul verbe', stdin: '1\nconduct verb\n', expected: 'conduct : conDUCT\nnoms : 0/1' },      { label: 'Deux noms', stdin: '2\nobject noun\nsubject noun\n', expected: 'object : OBject\nsubject : SUBject\nnoms : 2/2' },
      { label: 'Cinq mots', stdin: '5\nrecord noun\nrecord verb\nobject verb\nobject noun\nconduct verb\n', expected: 'record : REcord\nrecord : reCORD\nobject : obJECT\nobject : OBject\nconduct : conDUCT\nnoms : 2/5' }
    ],
    solution: `read -r n
noms=0
for ((i=0; i<n; i++)); do
  read -r mot classe
  case "$mot" in
    record)
      if [ "$classe" = "noun" ]; then echo "$mot : REcord" ; noms=$((noms + 1))
      else echo "$mot : reCORD"; fi ;;
    present)
      if [ "$classe" = "noun" ]; then echo "$mot : PREsent" ; noms=$((noms + 1))
      else echo "$mot : preSENT"; fi ;;
    object)
      if [ "$classe" = "noun" ]; then echo "$mot : OBject" ; noms=$((noms + 1))
      else echo "$mot : obJECT"; fi ;;
    subject)
      if [ "$classe" = "noun" ]; then echo "$mot : SUBject" ; noms=$((noms + 1))
      else echo "$mot : subJECT"; fi ;;
    conduct)
      if [ "$classe" = "noun" ]; then echo "$mot : CONduct" ; noms=$((noms + 1))
      else echo "$mot : conDUCT"; fi ;;
  esac
done
echo "noms : $noms/$n"
`
  },
  {
    id: 'en-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'Thought groups and pausing',
    goal: 'Simuler les groupes de souffle : couper la phrase aux bons endroits pour ne plus sonner comme un robot.',
    brief: '<p>Le script lit <strong>n lignes</strong> « position groupe » : position est un entier et ' +
      'groupe vaut <code>pause</code> ou <code>run</code>. Le script mesure la longueur des séquences ' +
      'consecutives de run séparées par des pause : une séquence de plus de 4 mots sonne robot. Pour chaque ' +
      'ligne il affiche <code>position groupe : compteur</code> où compteur est la longueur de la séquence ' +
      'courante de run (0 si pause). Final : <code>sequences robot : X</code> (nombre de séquences de run ' +
      'de longueur strictement supérieure à 4).</p>',
    starter: `read -r n
courant=0
robots=0
for ((i=0; i<n; i++)); do
  read -r position groupe
  # À compléter : mesurer les séquences de run.
done
`,
    hints: [
      'run incrémente le compteur courant ; pause clôture la séquence : si courant > 4, robots++ puis courant = 0.',
      'Ne pas oublier la dernière séquence si elle se termine sans pause finale.'
    ],
    examples: [
      { stdin: '5\n1 run\n2 run\n3 pause\n4 run\n5 pause\n', expected: '1 run : compteur 1\n2 run : compteur 2\n3 pause : compteur 0\n4 run : compteur 1\n5 pause : compteur 0\nsequences robot : 0' }
    ],
    tests: [
      { label: 'Une seule longue séquence', stdin: '6\n1 run\n2 run\n3 run\n4 run\n5 run\n6 pause\n', expected: '1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\n6 pause : compteur 0\nsequences robot : 1' },
      { label: 'Séquence non clôturée', stdin: '5\n1 run\n2 run\n3 run\n4 run\n5 run\n', expected: '1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\nsequences robot : 1' },
      { label: 'Huit positions', stdin: '8\n1 run\n2 run\n3 run\n4 run\n5 run\n6 pause\n7 run\n8 pause\n', expected: '1 run : compteur 1\n2 run : compteur 2\n3 run : compteur 3\n4 run : compteur 4\n5 run : compteur 5\n6 pause : compteur 0\n7 run : compteur 1\n8 pause : compteur 0\nsequences robot : 1' }
    ],
    solution: `read -r n
courant=0
robots=0
for ((i=0; i<n; i++)); do
  read -r position groupe
  if [ "$groupe" = "run" ]; then
    courant=$((courant + 1))
    echo "$position $groupe : compteur $courant"
  else
    if [ "$courant" -gt 4 ]; then
      robots=$((robots + 1))
    fi
    courant=0
    echo "$position $groupe : compteur 0"
  fi
done
if [ "$courant" -gt 4 ]; then
  robots=$((robots + 1))
fi
echo "sequences robot : $robots"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — Reductions and register
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'en-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Gonna, wanna, gotta',
    goal: 'Remplacer les réductions familières par leur forme formelle, et compter les corrections.',
    brief: '<p>Le script lit <strong>n lignes</strong> « registre mot » : registre vaut <code>form</code> ' +
      '(déjà formel) ou <code>reduce</code> (réduction familière). Pour chaque ligne il affiche ' +
      '<code>mot : forme</code>, où forme vaut <code>formel</code> (form) ou ' +
      '<code>correction : going to</code> (reduce). Il termine par <code>corrections : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r registre mot
  # À compléter : afficher la forme, compter les corrections.
done
`,
    hints: [
      'Un if sur le registre suffit : form et reduce sont les deux seules valeurs.',
      'Le compteur suit exactement les lignes « correction ».'
    ],
    examples: [
      { stdin: '4\nform deploy\nreduce gonna\nform send\nreduce wanna\n', expected: 'deploy : formel\ngonna : correction : going to\nsend : formel\nwanna : correction : want to\ncorrections : 2/4' }
    ],
    tests: [
      { label: 'Une seule correction', stdin: '1\nreduce gotta\n', expected: 'gotta : correction : got to\ncorrections : 1/1' },
      { label: 'Que du formel', stdin: '2\nform review\nform attach\n', expected: 'review : formel\nattach : formel\ncorrections : 0/2' },
      { label: 'Cinq lignes', stdin: '5\nreduce gonna\nform budget\nreduce wanna\nform sprint\nreduce gotta\n', expected: 'gonna : correction : going to\nbudget : formel\nwanna : correction : want to\nsprint : formel\ngotta : correction : got to\ncorrections : 3/5' }
    ],
    solution: `read -r n
corrections=0
for ((i=0; i<n; i++)); do
  read -r registre mot
  if [ "$registre" = "form" ]; then
    echo "$mot : formel"
  else
    case "$mot" in
      gonna) echo "$mot : correction : going to" ;;
      wanna) echo "$mot : correction : want to" ;;
      gotta) echo "$mot : correction : got to" ;;
      *) echo "$mot : correction : forme formelle" ;;
    esac
    corrections=$((corrections + 1))
  fi
done
echo "corrections : $corrections/$n"
`
  },
  {
    id: 'en-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Intonation rising or falling',
    goal: 'Choisir l\'intonation : montante (questions oui/non), descendante (déclarations, questions WH).',
    brief: '<p>Le script lit <strong>n lignes</strong> « phrase type » : type vaut <code>yesno</code> ' +
      '(question oui/non), <code>wh</code> (question WH) ou <code>statement</code> (déclaration). Pour chaque ' +
      'ligne il affiche <code>phrase : intonation</code>, où intonation vaut <code>montante</code> (yesno) ' +
      'ou <code>descendante</code> (wh et statement). Il termine par <code>questions montantes : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r phrase type
  # À compléter : choisir l'intonation, compter les montantes.
done
`,
    hints: [
      'Seules les questions oui/non montent : wh et statement descendent.',
      'Le compteur suit exactement les intonations montantes.'
    ],
    examples: [
      { stdin: '3\nq1 yesno\nq2 wh\ns1 statement\n', expected: 'q1 : montante\nq2 : descendante\ns1 : descendante\nquestions montantes : 1/3' }
    ],
    tests: [
      { label: 'Une seule question WH', stdin: '1\nq wh\n', expected: 'q : descendante\nquestions montantes : 0/1' },
      { label: 'Deux yesno', stdin: '2\nq1 yesno\nq2 yesno\n', expected: 'q1 : montante\nq2 : montante\nquestions montantes : 2/2' },
      { label: 'Cinq lignes', stdin: '5\nq1 yesno\ns1 statement\nq2 wh\nq3 yesno\ns2 statement\n', expected: 'q1 : montante\ns1 : descendante\nq2 : descendante\nq3 : montante\ns2 : descendante\nquestions montantes : 2/5' }
    ],
    solution: `read -r n
montantes=0
for ((i=0; i<n; i++)); do
  read -r phrase type
  if [ "$type" = "yesno" ]; then
    echo "$phrase : montante"
    montantes=$((montantes + 1))
  else
    echo "$phrase : descendante"
  fi
done
echo "questions montantes : $montantes/$n"
`
  },
  {
    id: 'en-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'The fluency tracker',
    goal: 'Suivre une semaine d\'entraînement : enregistrer, écouter, corriger — et décider si la fluidité progresse.',
    brief: '<p>Le script lit <strong>n lignes</strong> « jour defauts » (defauts = nombre de défauts de ' +
      'prononciation relevés ce jour-là, entier). Pour chaque ligne il affiche <code>jour : defauts X</code>. ' +
      'Le script compte ensuite les jours d\'amélioration (moins de défauts que le jour précédent) et affiche ' +
      '<code>ameliorations : X/n-1</code> (0 si n = 1), puis <code>verdict : progresse</code> si les ' +
      'améliorations sont majoritaires, <code>verdict : stagne</code> sinon.</p>',
    starter: `read -r n
precedent=""
ameliorations=0
for ((i=0; i<n; i++)); do
  read -r jour defauts
  # À compléter : comparer au jour précédent.
done
`,
    hints: [
      'Retenez la valeur du jour précédent ; comparez seulement quand elle existe.',
      'Le décompte des comparaisons est n - 1 ; le verdict est un test de majorité.'
    ],
    examples: [
      { stdin: '4\nlun 8\nmar 6\nmer 7\njeu 5\n', expected: 'lun : defauts 8\nmar : defauts 6\nmer : defauts 7\njeu : defauts 5\nameliorations : 2/3\nverdict : progresse' }
    ],
    tests: [
      { label: 'Un seul jour', stdin: '1\nlun 5\n', expected: 'lun : defauts 5\nameliorations : 0/0\nverdict : stagne' },
      { label: 'Que des hausses', stdin: '3\nlun 2\nmar 4\nmer 6\n', expected: 'lun : defauts 2\nmar : defauts 4\nmer : defauts 6\nameliorations : 0/2\nverdict : stagne' },
      { label: 'Cinq jours', stdin: '5\nlun 9\nmar 7\nmer 8\njeu 5\nven 6\n', expected: 'lun : defauts 9\nmar : defauts 7\nmer : defauts 8\njeu : defauts 5\nven : defauts 6\nameliorations : 2/4\nverdict : stagne' }
    ],
    solution: `read -r n
precedent=""
ameliorations=0
for ((i=0; i<n; i++)); do
  read -r jour defauts
  echo "$jour : defauts $defauts"
  if [ -n "$precedent" ] && [ "$defauts" -lt "$precedent" ]; then
    ameliorations=$((ameliorations + 1))
  fi
  precedent=$defauts
done
comparaisons=$((n - 1))
if [ "$comparaisons" -lt 0 ]; then
  comparaisons=0
fi
echo "ameliorations : $ameliorations/$comparaisons"
majorite=$((comparaisons / 2 + 1))
if [ "$ameliorations" -ge "$majorite" ]; then
  echo "verdict : progresse"
else
  echo "verdict : stagne"
fi
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Professional grammar
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'en-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Polite requests',
    goal: 'Corriger les phrases télégraphiques en requêtes polies : sujet + verbe conjugué + formule.',
    brief: '<p>Le script lit <strong>n lignes</strong> « phrase problème » : problème vaut <code>sujet</code> ' +
      '(sujet manquant), <code>verbe</code> (verbe non conjugué) ou <code>politesse</code> (formule polie ' +
      'absente). Une phrase correcte vaut <code>aucun</code>. Pour chaque ligne il affiche ' +
      '<code>phrase : probleme</code> ou <code>phrase : correcte</code>. Final : ' +
      '<code>phrases correctes : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r phrase probleme
  # À compléter : statuer, compter les correctes.
done
`,
    hints: [
      'Seule la valeur aucun donne « correcte » : sujet, verbe et politesse sont des défauts.',
      'Le compteur suit exactement les phrases correctes.'
    ],
    examples: [
      { stdin: '3\np1 sujet\np2 aucun\np3 politesse\n', expected: 'p1 : probleme\np2 : correcte\np3 : probleme\nphrases correctes : 1/3' }
    ],
    tests: [
      { label: 'Une seule correcte', stdin: '1\np aucun\n', expected: 'p : correcte\nphrases correctes : 1/1' },
      { label: 'Que des défauts', stdin: '2\np1 verbe\np2 sujet\n', expected: 'p1 : probleme\np2 : probleme\nphrases correctes : 0/2' },
      { label: 'Cinq phrases', stdin: '5\np1 aucun\np2 verbe\np3 aucun\np4 politesse\np5 aucun\n', expected: 'p1 : correcte\np2 : probleme\np3 : correcte\np4 : probleme\np5 : correcte\nphrases correctes : 3/5' }
    ],
    solution: `read -r n
correctes=0
for ((i=0; i<n; i++)); do
  read -r phrase probleme
  if [ "$probleme" = "aucun" ]; then
    echo "$phrase : correcte"
    correctes=$((correctes + 1))
  else
    echo "$phrase : probleme"
  fi
done
echo "phrases correctes : $correctes/$n"
`
  },
  {
    id: 'en-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Subject verb agreement',
    goal: 'Vérifier l\'accord sujet-verbe : la phrase est correcte quand le verbe correspond au sujet.',
    brief: '<p>Le script lit <strong>n lignes</strong> « phrase accord » : accord vaut <code>ok</code> ' +
      '(accord correct), <code>singular</code> (sujet singulier, verbe pluriel) ou <code>plural</code> ' +
      '(sujet pluriel, verbe singulier). Pour chaque ligne il affiche <code>phrase : verdict</code> où verdict ' +
      'vaut <code>correcte</code> (ok) ou <code>accorder</code> (à corriger). Final : ' +
      '<code>erreurs : X</code> et <code>taux : Y/n</code> avec Y = nombre de phrases correctes.</p>',
    starter: `read -r n
erreurs=0
for ((i=0; i<n; i++)); do
  read -r phrase accord
  # À compléter : statuer, compter les erreurs.
done
`,
    hints: [
      'Seul ok donne « correcte » : singular et plural sont des erreurs d\'accord.',
      'Deux compteurs suffisent : erreurs, et le taux se déduit (n - erreurs).'
    ],
    examples: [
      { stdin: '4\np1 ok\np2 singular\np3 plural\np4 ok\n', expected: 'p1 : correcte\np2 : accorder\np3 : accorder\np4 : correcte\nerreurs : 2\ntaux : 2/4' }
    ],
    tests: [
      { label: 'Une seule erreur', stdin: '1\np singular\n', expected: 'p : accorder\nerreurs : 1\ntaux : 0/1' },
      { label: 'Que des accords', stdin: '2\np1 ok\np2 ok\n', expected: 'p1 : correcte\np2 : correcte\nerreurs : 0\ntaux : 2/2' },
      { label: 'Cinq phrases', stdin: '5\np1 ok\np2 plural\np3 ok\np4 singular\np5 ok\n', expected: 'p1 : correcte\np2 : accorder\np3 : correcte\np4 : accorder\np5 : correcte\nerreurs : 2\ntaux : 3/5' }
    ],
    solution: `read -r n
erreurs=0
for ((i=0; i<n; i++)); do
  read -r phrase accord
  if [ "$accord" = "ok" ]; then
    echo "$phrase : correcte"
  else
    echo "$phrase : accorder"
    erreurs=$((erreurs + 1))
  fi
done
correctes=$((n - erreurs))
echo "erreurs : $erreurs"
echo "taux : $correctes/$n"
`
  },
  {
    id: 'en-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'The final assessment',
    goal: 'Évaluer le parcours complet (le test final du support) : quatre compétences notées, verdict de passage.',
    brief: '<p>Le script lit d\'abord <code>seuil</code> (score minimal, entier). Puis il lit <strong>n ' +
      'lignes</strong> « competence score » (score entier). Pour chaque ligne il affiche ' +
      '<code>competence : score X</code>. Final : <code>moyenne : M</code> (moyenne entière arrondie vers le ' +
      'bas) et <code>verdict : admis</code> si M ≥ seuil, <code>verdict : entrainement</code> sinon. Si ' +
      'n = 0, afficher <code>moyenne : 0</code>.</p>',
    starter: `read -r seuil
read -r n
somme=0
for ((i=0; i<n; i++)); do
  read -r competence score
  # À compléter : afficher et cumuler les scores.
done
# À compléter : moyenne et verdict.
`,
    hints: [
      'Cumulez les scores puis divisez : la division entière bash arrondit vers le bas naturellement.',
      'Protégez le cas n = 0 pour éviter une division par zéro.'
    ],
    examples: [
      { stdin: '70\n4\nvocabulaire 80\nemails 90\npresentations 60\nprononciation 75\n', expected: 'vocabulaire : score 80\nemails : score 90\npresentations : score 60\nprononciation : score 75\nmoyenne : 76\nverdict : admis' }
    ],
    tests: [
      { label: 'Sous le seuil', stdin: '80\n2\nvocabulaire 70\nemails 75\n', expected: 'vocabulaire : score 70\nemails : score 75\nmoyenne : 72\nverdict : entrainement' },
      { label: 'Aucune competence', stdin: '60\n0\n', expected: 'moyenne : 0\nverdict : entrainement' },
      { label: 'Cinq competences', stdin: '75\n5\na 80\nb 70\nc 90\nd 65\ne 75\n', expected: 'a : score 80\nb : score 70\nc : score 90\nd : score 65\ne : score 75\nmoyenne : 76\nverdict : admis' }
    ],
    solution: `read -r seuil
read -r n
somme=0
for ((i=0; i<n; i++)); do
  read -r competence score
  echo "$competence : score $score"
  somme=$((somme + score))
done
if [ "$n" -gt 0 ]; then
  moyenne=$((somme / n))
else
  moyenne=0
fi
echo "moyenne : $moyenne"
if [ "$moyenne" -ge "$seuil" ]; then
  echo "verdict : admis"
else
  echo "verdict : entrainement"
fi
`
  }
];

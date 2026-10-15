module.exports = [
  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 1 — La communication
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'fr-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les trois canaux de Mehrabian',
    goal: 'Classer chaque élément d\'une prise de parole selon la théorie de Mehrabian : verbal, para-verbal, non-verbal.',
    brief: '<p>Le script lit <strong>n lignes</strong> « element canal » : canal vaut <code>mot</code> ' +
      '(les mots prononcés), <code>voix</code> (rythme, intonation, volume) ou <code>corps</code> ' +
      '(gestuelle, regard, tenue). Pour chaque ligne il affiche <code>element : canal</code>, où canal ' +
      'vaut <code>verbal</code>, <code>para-verbal</code> ou <code>non-verbal</code>. Il termine par ' +
      '<code>para-verbal : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r element canal
  # À compléter : afficher le canal nommé, compter les para-verbaux.
done
# À compléter : bilan para-verbal.
`,
    hints: [
      'Un case à trois canaux : mot, voix, corps — chacun traduit son nom complet.',
      'Le compteur suit exactement les lignes « voix » ; le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '3\nlexical mot\nrythme voix\ngestuelle corps\n', expected: 'lexical : verbal\nrythme : para-verbal\ngestuelle : non-verbal\npara-verbal : 1/3' }
    ],
    tests: [
      { label: 'Un seul element corporel', stdin: '1\nposture corps\n', expected: 'posture : non-verbal\npara-verbal : 0/1' },
      { label: 'Deux elements mixtes', stdin: '2\nintonation voix\nvocabulaire mot\n', expected: 'intonation : para-verbal\nvocabulaire : verbal\npara-verbal : 1/2' },
      { label: 'Cinq elements', stdin: '5\nmots mot\nvolume voix\nexpressions corps\narticulation voix\nvestimentaire corps\n', expected: 'mots : verbal\nvolume : para-verbal\nexpressions : non-verbal\narticulation : para-verbal\nvestimentaire : non-verbal\npara-verbal : 2/5' }
    ],
    solution: `read -r n
pv=0
for ((i=0; i<n; i++)); do
  read -r element canal
  case "$canal" in
    mot) echo "$element : verbal" ;;
    voix) echo "$element : para-verbal" ; pv=$((pv + 1)) ;;
    corps) echo "$element : non-verbal" ;;
  esac
done
echo "para-verbal : $pv/$n"
`
  },
  {
    id: 'fr-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Logos, pathos, ethos',
    goal: 'Appliquer la grille d\'Aristote : un discours n\'est équilibré que si la raison, l\'émotion et la crédibilité parlent toutes trois.',
    brief: '<p>Le script lit <strong>n lignes</strong> « argument famille » : famille vaut <code>raison</code> ' +
      '(logos), <code>emotion</code> (pathos) ou <code>confiance</code> (éthos). Pour chaque ligne il ' +
      'affiche <code>argument : nom_grec</code>, où nom_grec vaut <code>logos</code>, <code>pathos</code> ou ' +
      '<code>ethos</code>. Il termine par <code>discours : equilibre</code> si les trois ressorts sont ' +
      'présents au moins une fois, <code>discours : incomplet</code> sinon.</p>',
    starter: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r argument famille
  # À compléter : afficher le ressort, marquer sa présence.
done
# À compléter : vérifier que logos, pathos et ethos sont tous présents.
`,
    hints: [
      'Un case traduit la famille en nom grec ; un tableau vues[nom]=1 marque le passage.',
      'Le verdict final teste les trois clés logos, pathos, ethos.'
    ],
    examples: [
      { stdin: '3\nchiffres raison\ntemoignage emotion\ndiplomes confiance\n', expected: 'chiffres : logos\ntemoignage : pathos\ndiplomes : ethos\ndiscours : equilibre' }
    ],
    tests: [
      { label: 'Que des chiffres', stdin: '2\nchiffres raison\ndonnees raison\n', expected: 'chiffres : logos\ndonnees : logos\ndiscours : incomplet' },
      { label: 'Pathos dominant', stdin: '3\nplaidoyer emotion\nhistoire emotion\nreferences confiance\n', expected: 'plaidoyer : pathos\nhistoire : pathos\nreferences : ethos\ndiscours : incomplet' },
      { label: 'Cinq arguments', stdin: '5\nstats raison\nexemples raison\nrecit emotion\nassurance confiance\nexprience confiance\n', expected: 'stats : logos\nexemples : logos\nrecit : pathos\nassurance : ethos\nexprience : ethos\ndiscours : equilibre' }
    ],
    solution: `read -r n
declare -A vues
for ((i=0; i<n; i++)); do
  read -r argument famille
  case "$famille" in
    raison) echo "$argument : logos" ; vues[logos]=1 ;;
    emotion) echo "$argument : pathos" ; vues[pathos]=1 ;;
    confiance) echo "$argument : ethos" ; vues[ethos]=1 ;;
  esac
done
if [ -n "\${vues[logos]:-}" ] && [ -n "\${vues[pathos]:-}" ] && [ -n "\${vues[ethos]:-}" ]; then
  echo "discours : equilibre"
else
  echo "discours : incomplet"
fi
`
  },
  {
    id: 'fr-c1-e3',
    chapter: 1,
    level: 'n3',
    language: 'shell',
    title: 'Explicite et implicite',
    goal: 'Séparer ce qui est dit de ce qui est voulu : « Il fait chaud dans ta chambre » est une demande déguisée.',
    brief: '<p>Le script lit <strong>n lignes</strong> « message sens » : sens vaut <code>mot</code> ' +
      '(explicite : ce que la personne dit) ou <code>voile</code> (implicite : ce qu\'elle veut dire). Pour ' +
      'chaque ligne il affiche <code>message : explicite</code> ou <code>message : implicite</code>. Il ' +
      'termine par <code>implicites : X/n</code>, puis <code>communication : a decoder</code> si les ' +
      'implicites sont strictement majoritaires, <code>communication : directe</code> sinon.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r message sens
  # À compléter : trancher, compter les implicites.
done
# À compléter : bilan et verdict.
`,
    hints: [
      'Seule la valeur voile donne « implicite » : mot donne « explicite ».',
      'Strictement majoritaires : le nombre d\'implicites doit dépasser celui des explicites (n - implicites).'
    ],
    examples: [
      { stdin: '4\nm1 voile\nm2 mot\nm3 voile\nm4 mot\n', expected: 'm1 : implicite\nm2 : explicite\nm3 : implicite\nm4 : explicite\nimplicites : 2/4\ncommunication : directe' }
    ],
    tests: [
      { label: 'Une seule sous-entendu', stdin: '1\nm1 voile\n', expected: 'm1 : implicite\nimplicites : 1/1\ncommunication : a decoder' },
      { label: 'Que du litteral', stdin: '2\nm1 mot\nm2 mot\n', expected: 'm1 : explicite\nm2 : explicite\nimplicites : 0/2\ncommunication : directe' },
      { label: 'Cinq messages', stdin: '5\nm1 voile\nm2 mot\nm3 mot\nm4 mot\nm5 voile\n', expected: 'm1 : implicite\nm2 : explicite\nm3 : explicite\nm4 : explicite\nm5 : implicite\nimplicites : 2/5\ncommunication : directe' }
    ],
    solution: `read -r n
implicites=0
for ((i=0; i<n; i++)); do
  read -r message sens
  if [ "$sens" = "voile" ]; then
    echo "$message : implicite"
    implicites=$((implicites + 1))
  else
    echo "$message : explicite"
  fi
done
echo "implicites : $implicites/$n"
if [ "$implicites" -gt $((n - implicites)) ]; then
  echo "communication : a decoder"
else
  echo "communication : directe"
fi
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 2 — Les registres de langue
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'fr-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Familier, courant, soutenu',
    goal: 'Ranger chaque mot dans son niveau de langue : cailler, avoir très froid, être mort de froid.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot registre » : registre vaut <code>fam</code> ' +
      '(familier), <code>cour</code> (courant) ou <code>sout</code> (soutenu). Pour chaque ligne il affiche ' +
      '<code>mot : niveau</code>, où niveau vaut <code>familier</code>, <code>courant</code> ou ' +
      '<code>soutenu</code>. Il termine par trois lignes de comptage dans cet ordre : <code>familier : X</code>, ' +
      '<code>courant : Y</code>, <code>soutenu : Z</code>.</p>',
    starter: `read -r n
fam=0
cour=0
sout=0
for ((i=0; i<n; i++)); do
  read -r mot registre
  # À compléter : afficher le niveau, compter.
done
# À compléter : les trois totaux, dans l'ordre.
`,
    hints: [
      'Un case à trois registres : fam, cour, sout.',
      'Les trois totaux sortent après la boucle, dans l\'ordre familier, courant, soutenu.'
    ],
    examples: [
      { stdin: '3\nbouffer fam\nmanger cour\nsustenter sout\n', expected: 'bouffer : familier\nmanger : courant\nsustenter : soutenu\nfamilier : 1\ncourant : 1\nsoutenu : 1' }
    ],
    tests: [
      { label: 'Un seul familier', stdin: '1\ncailler fam\n', expected: 'cailler : familier\nfamilier : 1\ncourant : 0\nsoutenu : 0' },
      { label: 'Deux niveaux', stdin: '2\nzyeuter fam\nregarder cour\n', expected: 'zyeuter : familier\nregarder : courant\nfamilier : 1\ncourant : 1\nsoutenu : 0' },
      { label: 'Cinq mots', stdin: '5\nbagnole fam\nvoiture cour\nautomobile sout\ndegoter fam\ndecouvrir sout\n', expected: 'bagnole : familier\nvoiture : courant\nautomobile : soutenu\ndegoter : familier\ndecouvrir : soutenu\nfamilier : 2\ncourant : 1\nsoutenu : 2' }
    ],
    solution: `read -r n
fam=0
cour=0
sout=0
for ((i=0; i<n; i++)); do
  read -r mot registre
  case "$registre" in
    fam) echo "$mot : familier" ; fam=$((fam + 1)) ;;
    cour) echo "$mot : courant" ; cour=$((cour + 1)) ;;
    sout) echo "$mot : soutenu" ; sout=$((sout + 1)) ;;
  esac
done
echo "familier : $fam"
echo "courant : $cour"
echo "soutenu : $sout"
`
  },
  {
    id: 'fr-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Le trio des trois registres',
    goal: 'Vérifier qu\'une notion est couverte par les trois niveaux : bouffer, manger, se sustenter.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot notion registre » : notion vaut <code>manger</code>, ' +
      '<code>regarder</code> ou <code>dormir</code> ; registre vaut <code>fam</code>, <code>cour</code> ou ' +
      '<code>sout</code>. Pour chaque ligne il affiche <code>mot : niveau</code> (familier, courant ou ' +
      'soutenu). Il termine par une ligne par notion, dans l\'ordre manger, regarder, dormir : ' +
      '<code>notion : complete</code> (les trois registres vus), <code>notion : partielle</code> (au moins un) ' +
      'ou <code>notion : absente</code>. Puis <code>trios : X/3</code>.</p>',
    starter: `read -r n
declare -A vf
declare -A vc
declare -A vs
for ((i=0; i<n; i++)); do
  read -r mot notion registre
  # À compléter : afficher le niveau, marquer la notion par registre.
done
# À compléter : audit des trois notions, puis le compteur de trios.
`,
    hints: [
      'Trois tableaux associatifs : vf[notion]=1 pour fam, vc pour cour, vs pour sout.',
      'Une notion est complete seulement si les trois tableaux la connaissent ; partielle si un seul au moins.'
    ],
    examples: [
      { stdin: '6\nbouffer manger fam\nmanger manger cour\nsustenter manger sout\nzyeuter regarder fam\nregarder regarder cour\nconsidere regarder sout\n', expected: 'bouffer : familier\nmanger : courant\nsustenter : soutenu\nzyeuter : familier\nregarder : courant\nconsidere : soutenu\nmanger : complete\nregarder : complete\ndormir : absente\ntrios : 2/3' }
    ],
    tests: [
      { label: 'Un trio complet seulement', stdin: '3\nbouffer manger fam\nmanger manger cour\nsustenter manger sout\n', expected: 'bouffer : familier\nmanger : courant\nsustenter : soutenu\nmanger : complete\nregarder : absente\ndormir : absente\ntrios : 1/3' },
      { label: 'Trio incomplet', stdin: '2\nroupiller dormir fam\nassoupir dormir sout\n', expected: 'roupiller : familier\nassoupir : soutenu\nmanger : absente\nregarder : absente\ndormir : partielle\ntrios : 0/3' },
      { label: 'Deux notions melangees', stdin: '5\nzyeuter regarder fam\nregarder regarder cour\nconsidere regarder sout\nbouffer manger fam\nmanger manger cour\n', expected: 'zyeuter : familier\nregarder : courant\nconsidere : soutenu\nbouffer : familier\nmanger : courant\nmanger : partielle\nregarder : complete\ndormir : absente\ntrios : 1/3' }
    ],
    solution: `read -r n
declare -A vf
declare -A vc
declare -A vs
for ((i=0; i<n; i++)); do
  read -r mot notion registre
  case "$registre" in
    fam) echo "$mot : familier" ; vf[$notion]=1 ;;
    cour) echo "$mot : courant" ; vc[$notion]=1 ;;
    sout) echo "$mot : soutenu" ; vs[$notion]=1 ;;
  esac
done
trios=0
for notion in manger regarder dormir; do
  if [ -n "\${vf[$notion]:-}" ] && [ -n "\${vc[$notion]:-}" ] && [ -n "\${vs[$notion]:-}" ]; then
    echo "$notion : complete"
    trios=$((trios + 1))
  elif [ -n "\${vf[$notion]:-}" ] || [ -n "\${vc[$notion]:-}" ] || [ -n "\${vs[$notion]:-}" ]; then
    echo "$notion : partielle"
  else
    echo "$notion : absente"
  fi
done
echo "trios : $trios/3"
`
  },
  {
    id: 'fr-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'shell',
    title: 'Verbes passe-partout',
    goal: 'Traquer donner, faire et avoir au profit de verbes précis : prodiguer, commettre, détenir.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot verbe » : verbe vaut <code>donner</code>, ' +
      '<code>faire</code> ou <code>avoir</code> (passe-partout à remplacer) ou <code>precis</code> (verbe ' +
      'précis déjà employé). Pour chaque ligne il affiche <code>mot : verbe passe-partout (donner)</code> ' +
      '(ou faire, ou avoir) ou <code>mot : precise</code>. Il termine par <code>passe-partout : X/n</code>, ' +
      'puis <code>texte : a enrichir</code> si les passe-partout sont strictement majoritaires, ' +
      '<code>texte : acceptable</code> sinon.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r mot verbe
  # À compléter : signaler les passe-partout, compter.
done
# À compléter : bilan et verdict.
`,
    hints: [
      'Un case à quatre valeurs : donner, faire, avoir, tout le reste tombant dans precis.',
      'Strictement majoritaires : le double du compteur doit dépasser n.'
    ],
    examples: [
      { stdin: '4\nprodiguer precis\nconseils donner\nenquete faire\ndetient precis\n', expected: 'prodiguer : precise\nconseils : verbe passe-partout (donner)\nenquete : verbe passe-partout (faire)\ndetient : precise\npasse-partout : 2/4\ntexte : acceptable' }
    ],
    tests: [
      { label: 'Un seul faire', stdin: '1\nfaire faire\n', expected: 'faire : verbe passe-partout (faire)\npasse-partout : 1/1\ntexte : a enrichir' },
      { label: 'Que des verbes precis', stdin: '2\ncommettre precis\nintenter precis\n', expected: 'commettre : precise\nintenter : precise\npasse-partout : 0/2\ntexte : acceptable' },
      { label: 'Cinq verbes', stdin: '5\ndonner donner\nconferer precis\nfaire faire\netablir precis\navoir avoir\n', expected: 'donner : verbe passe-partout (donner)\nconferer : precise\nfaire : verbe passe-partout (faire)\netablir : precise\navoir : verbe passe-partout (avoir)\npasse-partout : 3/5\ntexte : a enrichir' }
    ],
    solution: `read -r n
pp=0
for ((i=0; i<n; i++)); do
  read -r mot verbe
  case "$verbe" in
    donner) echo "$mot : verbe passe-partout (donner)" ; pp=$((pp + 1)) ;;
    faire) echo "$mot : verbe passe-partout (faire)" ; pp=$((pp + 1)) ;;
    avoir) echo "$mot : verbe passe-partout (avoir)" ; pp=$((pp + 1)) ;;
    *) echo "$mot : precise" ;;
  esac
done
echo "passe-partout : $pp/$n"
if [ $((pp * 2)) -gt "$n" ] && [ "$pp" -gt 0 ]; then
  echo "texte : a enrichir"
else
  echo "texte : acceptable"
fi
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 3 — Les fautes au bureau
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'fr-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Jours et mois sans majuscule',
    goal: 'Corriger la date professionnelle : lundi et juillet sont des noms communs, et les pluriels se marquent.',
    brief: '<p>Le script lit <strong>n lignes</strong> « mot casse » : casse vaut <code>ok</code> (écriture ' +
      'correcte), <code>maj</code> (majuscule fautive sur un jour ou un mois) ou <code>sing</code> ' +
      '(pluriel manquant). Pour chaque ligne il affiche <code>mot : correct</code>, ' +
      '<code>mot : majuscule a enlever</code> ou <code>mot : mettre au pluriel</code>. Il termine par ' +
      '<code>fautes : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r mot casse
  # À compléter : statuer sur chaque ligne, compter les fautes.
done
# À compléter : bilan des fautes.
`,
    hints: [
      'Un case à trois cas : ok, maj, sing — les deux derniers comptent pour une faute.',
      'Le compteur suit exactement les lignes fautives ; le bilan sort après la boucle.'
    ],
    examples: [
      { stdin: '4\ndimanche ok\nJuin maj\njeudi sing\nvendredi ok\n', expected: 'dimanche : correct\nJuin : majuscule a enlever\njeudi : mettre au pluriel\nvendredi : correct\nfautes : 2/4' }
    ],
    tests: [
      { label: 'Un pluriel manquant', stdin: '1\nsamedi sing\n', expected: 'samedi : mettre au pluriel\nfautes : 1/1' },
      { label: 'Deux majuscules', stdin: '2\nMars maj\nAout maj\n', expected: 'Mars : majuscule a enlever\nAout : majuscule a enlever\nfautes : 2/2' },
      { label: 'Cinq mots', stdin: '5\nlundi ok\nMardi maj\njanvier ok\noctobre ok\nmercredi sing\n', expected: 'lundi : correct\nMardi : majuscule a enlever\njanvier : correct\noctobre : correct\nmercredi : mettre au pluriel\nfautes : 2/5' }
    ],
    solution: `read -r n
fautes=0
for ((i=0; i<n; i++)); do
  read -r mot casse
  case "$casse" in
    ok) echo "$mot : correct" ;;
    maj) echo "$mot : majuscule a enlever" ; fautes=$((fautes + 1)) ;;
    sing) echo "$mot : mettre au pluriel" ; fautes=$((fautes + 1)) ;;
  esac
done
echo "fautes : $fautes/$n"
`
  },
  {
    id: 'fr-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Ci-joint, veuillez, de toute façon',
    goal: 'Arbitrer les pièges du courrier : ci-joint invariable ou accordé, veuillez contre veillez, de toute façon au singulier.',
    brief: '<p>Le script lit <strong>n lignes</strong> « phrase regle » : regle vaut <code>ok</code> (phrase ' +
      'correcte), <code>invariable</code> (ci-joint en tête de phrase, correct), <code>accord</code> ' +
      '(ci-joint qui devrait s\'accorder), <code>veillez</code> (veuillez attendu) ou <code>facons</code> ' +
      '("de toutes les façons" fautive). Pour chaque ligne il affiche <code>phrase : correcte</code> ou ' +
      '<code>phrase : a corriger : accord</code> (ou <code>veuillez</code>, ou <code>singulier</code>). Il ' +
      'termine par <code>corrections : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r phrase regle
  # À compléter : nommer la faute ou approuver, compter.
done
# À compléter : bilan des corrections.
`,
    hints: [
      'ok et invariable donnent « correcte » ; accord, veillez et facons donnent « a corriger » suivi du remède.',
      'Le remède est nommé en minuscules : accord, veuillez, singulier.'
    ],
    examples: [
      { stdin: '4\np1 invariable\np2 accord\np3 ok\np4 veillez\n', expected: 'p1 : correcte\np2 : a corriger : accord\np3 : correcte\np4 : a corriger : veuillez\ncorrections : 2/4' }
    ],
    tests: [
      { label: 'Une facon fautive', stdin: '1\np1 facons\n', expected: 'p1 : a corriger : singulier\ncorrections : 1/1' },
      { label: 'Tout est correct', stdin: '2\np1 ok\np2 invariable\n', expected: 'p1 : correcte\np2 : correcte\ncorrections : 0/2' },
      { label: 'Cinq phrases', stdin: '5\np1 veillez\np2 invariable\np3 accord\np4 ok\np5 facons\n', expected: 'p1 : a corriger : veuillez\np2 : correcte\np3 : a corriger : accord\np4 : correcte\np5 : a corriger : singulier\ncorrections : 3/5' }
    ],
    solution: `read -r n
corrections=0
for ((i=0; i<n; i++)); do
  read -r phrase regle
  case "$regle" in
    ok) echo "$phrase : correcte" ;;
    invariable) echo "$phrase : correcte" ;;
    accord) echo "$phrase : a corriger : accord" ; corrections=$((corrections + 1)) ;;
    veillez) echo "$phrase : a corriger : veuillez" ; corrections=$((corrections + 1)) ;;
    facons) echo "$phrase : a corriger : singulier" ; corrections=$((corrections + 1)) ;;
  esac
done
echo "corrections : $corrections/$n"
`
  },
  {
    id: 'fr-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'shell',
    title: 'L\'audit du courrier',
    goal: 'Croiser trois règles du bureau — article de profession, majuscule de mois, abréviation M. — et décider de la relecture.',
    brief: '<p>Le script lit <strong>n lignes</strong> « phrase regle » : regle vaut <code>ok</code>, ' +
      '<code>art</code> (« Je suis un chercheur » : article superflu), <code>maj</code> (majuscule sur un ' +
      'jour ou un mois) ou <code>abrev</code> (« Mr » au lieu de « M. »). Pour chaque ligne il affiche ' +
      '<code>phrase : correcte</code>, <code>phrase : article a enlever</code>, ' +
      '<code>phrase : majuscule a enlever</code> ou <code>phrase : abreviation a corriger</code>. Il termine ' +
      'par trois lignes <code>article : X</code>, <code>majuscule : Y</code>, <code>abreviation : Z</code>, ' +
      'puis <code>total : T/n</code> et <code>relecture : urgente</code> si les fautes sont strictement ' +
      'majoritaires, <code>relecture : legere</code> sinon.</p>',
    starter: `read -r n
art=0
maj=0
abrev=0
for ((i=0; i<n; i++)); do
  read -r phrase regle
  # À compléter : nommer la faute, incrémenter le bon compteur.
done
# À compléter : totaux par règle, total général, verdict.
`,
    hints: [
      'Trois compteurs distincts : art, maj, abrev — un case les tient à jour.',
      'Strictement majoritaires : le total doit dépasser n/2 (division entière).'
    ],
    examples: [
      { stdin: '5\np1 art\np2 maj\np3 ok\np4 abrev\np5 ok\n', expected: 'p1 : article a enlever\np2 : majuscule a enlever\np3 : correcte\np4 : abreviation a corriger\np5 : correcte\narticle : 1\nmajuscule : 1\nabreviation : 1\ntotal : 3/5\nrelecture : urgente' }
    ],
    tests: [
      { label: 'Tout est fautif', stdin: '3\np1 art\np2 art\np3 maj\n', expected: 'p1 : article a enlever\np2 : article a enlever\np3 : majuscule a enlever\narticle : 2\nmajuscule : 1\nabreviation : 0\ntotal : 3/3\nrelecture : urgente' },
      { label: 'Courier propre', stdin: '2\np1 ok\np2 ok\n', expected: 'p1 : correcte\np2 : correcte\narticle : 0\nmajuscule : 0\nabreviation : 0\ntotal : 0/2\nrelecture : legere' },
      { label: 'Six phrases', stdin: '6\np1 art\np2 abrev\np3 abrev\np4 ok\np5 maj\np6 ok\n', expected: 'p1 : article a enlever\np2 : abreviation a corriger\np3 : abreviation a corriger\np4 : correcte\np5 : majuscule a enlever\np6 : correcte\narticle : 1\nmajuscule : 1\nabreviation : 2\ntotal : 4/6\nrelecture : urgente' }
    ],
    solution: `read -r n
art=0
maj=0
abrev=0
for ((i=0; i<n; i++)); do
  read -r phrase regle
  case "$regle" in
    ok) echo "$phrase : correcte" ;;
    art) echo "$phrase : article a enlever" ; art=$((art + 1)) ;;
    maj) echo "$phrase : majuscule a enlever" ; maj=$((maj + 1)) ;;
    abrev) echo "$phrase : abreviation a corriger" ; abrev=$((abrev + 1)) ;;
  esac
done
total=$((art + maj + abrev))
echo "article : $art"
echo "majuscule : $maj"
echo "abreviation : $abrev"
echo "total : $total/$n"
if [ "$total" -gt $((n / 2)) ]; then
  echo "relecture : urgente"
else
  echo "relecture : legere"
fi
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 4 — Pléonasmes, barbarismes, solécismes
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'fr-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Repérer les pléonasmes',
    goal: 'Signaler le double emploi : allumer la lumière, au jour d\'aujourd\'hui, assez suffisantes.',
    brief: '<p>Le script lit <strong>n lignes</strong> « expression type » : type vaut <code>pleonasme</code> ' +
      '(double emploi) ou <code>bon</code> (tour correct). Pour chaque ligne il affiche ' +
      '<code>expression : pleonasme (un mot de trop)</code> ou <code>expression : correcte</code>. Il termine ' +
      'par <code>pleonasmes : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r expression type
  # À compléter : signaler les pléonasmes, compter.
done
# À compléter : bilan des pléonasmes.
`,
    hints: [
      'Seule la valeur pleonasme déclenche le signalement.',
      'Le compteur suit exactement les lignes signalées.'
    ],
    examples: [
      { stdin: '3\nlumiere pleonasme\ncauchemar bon\nunanimite pleonasme\n', expected: 'lumiere : pleonasme (un mot de trop)\ncauchemar : correcte\nunanimite : pleonasme (un mot de trop)\npleonasmes : 2/3' }
    ],
    tests: [
      { label: 'Un seul pléonasme', stdin: '1\nsuffisantes pleonasme\n', expected: 'suffisantes : pleonasme (un mot de trop)\npleonasmes : 1/1' },
      { label: 'Tout est correct', stdin: '2\nexterieure bon\nselection bon\n', expected: 'exterieure : correcte\nselection : correcte\npleonasmes : 0/2' },
      { label: 'Cinq expressions', stdin: '5\nlumiere pleonasme\nexterieure bon\nunanimite pleonasme\ncauchemar bon\nsuffisantes pleonasme\n', expected: 'lumiere : pleonasme (un mot de trop)\nexterieure : correcte\nunanimite : pleonasme (un mot de trop)\ncauchemar : correcte\nsuffisantes : pleonasme (un mot de trop)\npleonasmes : 3/5' }
    ],
    solution: `read -r n
pleonasmes=0
for ((i=0; i<n; i++)); do
  read -r expression type
  if [ "$type" = "pleonasme" ]; then
    echo "$expression : pleonasme (un mot de trop)"
    pleonasmes=$((pleonasmes + 1))
  else
    echo "$expression : correcte"
  fi
done
echo "pleonasmes : $pleonasmes/$n"
`
  },
  {
    id: 'fr-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Corriger les barbarismes',
    goal: 'Rendre à chaque mot sa vraie forme : pécuniaire, maligne, dilemme, empreintes.',
    brief: '<p>Le script lit <strong>n mots</strong>, un par ligne, sans autre champ. Chaque mot est soit un ' +
      'barbarisme connu, soit une forme correcte. Les barbarismes connus du cours : <code>pecuniers</code>, ' +
      '<code>maline</code>, <code>benine</code>, <code>disez</code>, <code>empruntes</code>, ' +
      '<code>dilemne</code>, <code>contreverse</code>, <code>renumere</code>, <code>rabattent</code>, ' +
      '<code>indemmes</code>, <code>dilettant</code>, <code>definitif</code>. Pour chaque mot le script ' +
      'affiche <code>mot : forme_corrigee</code> (par exemple <code>maline : maligne</code>) ou ' +
      '<code>mot : correct</code> si le mot est bien formé. Il termine par <code>barbarismes : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r mot
  # À compléter : corriger les barbarismes connus, approuver les autres.
done
# À compléter : bilan des barbarismes.
`,
    hints: [
      'Un case sur le mot lui-même : chaque barbarisme connu donne sa forme corrigée.',
      'Le cas par défaut (*) approuve ; il n\'incrémente pas le compteur.'
    ],
    examples: [
      { stdin: '4\npecuniers\nmaline\ndilemme\ncontreverse\n', expected: 'pecuniers : pecuniaires\nmaline : maligne\ndilemme : correct\ncontreverse : controverse\nbarbarismes : 3/4' }
    ],
    tests: [
      { label: 'Un seul dilemne', stdin: '1\ndilemne\n', expected: 'dilemne : dilemme\nbarbarismes : 1/1' },
      { label: 'Formes correctes', stdin: '2\ndites\nmaligne\n', expected: 'dites : correct\nmaligne : correct\nbarbarismes : 0/2' },
      { label: 'Six mots', stdin: '6\nempruntes\ndefinitif\nbenine\ndilettant\ndilemme\nrecouvre\n', expected: 'empruntes : empreintes\ndefinitif : definitive\nbenine : benigne\ndilettant : dilettante\ndilemme : correct\nrecouvre : correct\nbarbarismes : 4/6' }
    ],
    solution: `read -r n
barbarismes=0
for ((i=0; i<n; i++)); do
  read -r mot
  case "$mot" in
    pecuniers) echo "$mot : pecuniaires" ; barbarismes=$((barbarismes + 1)) ;;
    maline) echo "$mot : maligne" ; barbarismes=$((barbarismes + 1)) ;;
    benine) echo "$mot : benigne" ; barbarismes=$((barbarismes + 1)) ;;
    disez) echo "$mot : dites" ; barbarismes=$((barbarismes + 1)) ;;
    empruntes) echo "$mot : empreintes" ; barbarismes=$((barbarismes + 1)) ;;
    dilemne) echo "$mot : dilemme" ; barbarismes=$((barbarismes + 1)) ;;
    contreverse) echo "$mot : controverse" ; barbarismes=$((barbarismes + 1)) ;;
    renumere) echo "$mot : remunere" ; barbarismes=$((barbarismes + 1)) ;;
    rabattent) echo "$mot : rebattent" ; barbarismes=$((barbarismes + 1)) ;;
    indemmes) echo "$mot : indemnes" ; barbarismes=$((barbarismes + 1)) ;;
    dilettant) echo "$mot : dilettante" ; barbarismes=$((barbarismes + 1)) ;;
    definitif) echo "$mot : definitive" ; barbarismes=$((barbarismes + 1)) ;;
    *) echo "$mot : correct" ;;
  esac
done
echo "barbarismes : $barbarismes/$n"
`
  },
  {
    id: 'fr-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'shell',
    title: 'La construction des verbes',
    goal: 'Éviter le solécisme : on pallie quelque chose, on se rappelle quelque chose, on téléphone à quelqu\'un.',
    brief: '<p>Le script lit <strong>n lignes</strong> « verbe construction » : verbe vaut <code>rappeler</code>, ' +
      '<code>pallier</code> ou <code>enfreindre</code> (ces trois verbes exigent un complément direct) ou ' +
      '<code>telephoner</code> (qui exige un complément en à) ; construction vaut <code>direct</code> ou ' +
      '<code>a</code>. Pour chaque ligne il affiche <code>verbe : construction correcte</code> ou ' +
      '<code>verbe : construction fautive</code>. Il termine par <code>solecismes : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r verbe construction
  # À compléter : rappeler la construction attendue, comparer.
done
# À compléter : bilan des solécismes.
`,
    hints: [
      'Le case sur le verbe pose la construction attendue (direct ou a) ; un simple test compare ensuite.',
      'Le compteur suit exactement les constructions fautives.'
    ],
    examples: [
      { stdin: '4\nrappeler direct\npallier a\ntelephoner a\nenfreindre a\n', expected: 'rappeler : construction correcte\npallier : construction fautive\ntelephoner : construction correcte\nenfreindre : construction fautive\nsolecismes : 2/4' }
    ],
    tests: [
      { label: 'Pallier bien construit', stdin: '1\npallier direct\n', expected: 'pallier : construction correcte\nsolecismes : 0/1' },
      { label: 'Deux solécismes', stdin: '2\ntelephoner direct\nrappeler a\n', expected: 'telephoner : construction fautive\nrappeler : construction fautive\nsolecismes : 2/2' },
      { label: 'Cinq verbes', stdin: '5\nenfreindre direct\ntelephoner a\npallier a\nrappeler direct\ntelephoner direct\n', expected: 'enfreindre : construction correcte\ntelephoner : construction correcte\npallier : construction fautive\nrappeler : construction correcte\ntelephoner : construction fautive\nsolecismes : 2/5' }
    ],
    solution: `read -r n
solecismes=0
for ((i=0; i<n; i++)); do
  read -r verbe construction
  case "$verbe" in
    rappeler|pallier|enfreindre) correcte="direct" ;;
    telephoner) correcte="a" ;;
  esac
  if [ "$construction" = "$correcte" ]; then
    echo "$verbe : construction correcte"
  else
    echo "$verbe : construction fautive"
    solecismes=$((solecismes + 1))
  fi
done
echo "solecismes : $solecismes/$n"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 5 — La lettre de motivation
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'fr-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'shell',
    title: 'Les neuf blocs de la lettre',
    goal: 'Vérifier que chaque bloc de la lettre de motivation est à sa place : coordonnées, destinataire, date, objet, appel, corps, rendez-vous, politesse, signature.',
    brief: '<p>Le script lit <strong>n lignes</strong> « element ordre » : element vaut ' +
      '<code>coordonnees</code>, <code>destinataire</code>, <code>date</code>, <code>objet</code>, ' +
      '<code>appel</code>, <code>corps</code>, <code>rendezvous</code>, <code>politesse</code> ou ' +
      '<code>signature</code> ; ordre est le numéro de bloc annoncé (1 à 9). Pour chaque ligne il affiche ' +
      '<code>element : bloc N</code> si le numéro est le bon, <code>element : hors place</code> sinon. Il ' +
      'termine par <code>lettres valides : ok</code> si aucun bloc n\'est hors place, ' +
      '<code>lettres valides : a revoir</code> sinon.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r element ordre
  # À compléter : retrouver le bloc attendu, comparer.
done
# À compléter : verdict sur la lettre entière.
`,
    hints: [
      'Un case sur l\'element pose le numéro attendu (coordonnees 1 … signature 9).',
      'Un drapeau passe à 0 au premier « hors place » ; le verdict le teste après la boucle.'
    ],
    examples: [
      { stdin: '5\ncoordonnees 1\ndestinataire 2\ndate 3\nobjet 4\nappel 5\n', expected: 'coordonnees : bloc 1\ndestinataire : bloc 2\ndate : bloc 3\nobjet : bloc 4\nappel : bloc 5\nlettres valides : ok' }
    ],
    tests: [
      { label: 'Deux blocs en place', stdin: '2\nobjet 4\npolitesse 8\n', expected: 'objet : bloc 4\npolitesse : bloc 8\nlettres valides : ok' },
      { label: 'Appel et objet inverses', stdin: '2\nappel 4\nobjet 5\n', expected: 'appel : hors place\nobjet : hors place\nlettres valides : a revoir' },
      { label: 'Six blocs melanges', stdin: '6\ncoordonnees 1\ndestinataire 2\ndate 3\nappel 5\ncorps 6\nsignature 9\n', expected: 'coordonnees : bloc 1\ndestinataire : bloc 2\ndate : bloc 3\nappel : bloc 5\ncorps : bloc 6\nsignature : bloc 9\nlettres valides : ok' }
    ],
    solution: `read -r n
valide=1
for ((i=0; i<n; i++)); do
  read -r element ordre
  case "$element" in
    coordonnees) attendu=1 ;;
    destinataire) attendu=2 ;;
    date) attendu=3 ;;
    objet) attendu=4 ;;
    appel) attendu=5 ;;
    corps) attendu=6 ;;
    rendezvous) attendu=7 ;;
    politesse) attendu=8 ;;
    signature) attendu=9 ;;
  esac
  if [ "$ordre" = "$attendu" ]; then
    echo "$element : bloc $attendu"
  else
    echo "$element : hors place"
    valide=0
  fi
done
if [ "$valide" = "1" ]; then
  echo "lettres valides : ok"
else
  echo "lettres valides : a revoir"
fi
`
  },
  {
    id: 'fr-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'shell',
    title: 'Appel et politesse',
    goal: 'Valider les formules : « Madame, Monsieur, » pour l\'appel, « Cordialement, » pour le courriel — jamais « Bonjour Madame ».',
    brief: '<p>Le script lit <strong>n lignes</strong> « formule type » : formule vaut <code>madame</code>, ' +
      '<code>monsieur</code>, <code>madamemonsieur</code>, <code>madamedirectrice</code> (appels), ' +
      '<code>cordialement</code>, <code>bienavous</code>, <code>sinceres</code>, <code>salutations</code> ' +
      '(politesse), ou autre chose ; type vaut <code>appel</code> ou <code>politesse</code>. Pour chaque ' +
      'ligne il affiche <code>formule : valide</code> si la formule appartient au type annoncé, ' +
      '<code>formule : inadaptee</code> si elle appartient à l\'autre type, <code>formule : inconnue</code> ' +
      'sinon (par exemple « Bonjour Madame »). Il termine par <code>valides : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r formule type
  # À compléter : classer la formule, comparer au type annoncé.
done
# À compléter : bilan des formules valides.
`,
    hints: [
      'Un case sur la formule détermine sa famille réelle : appel, politesse ou inconnue.',
      'Famille égale au type annoncé : valide ; famille différente : inadaptee ; famille inconnue : inconnue.'
    ],
    examples: [
      { stdin: '4\nmadame appel\nsalutations politesse\ncordialement appel\nbonjour appel\n', expected: 'madame : valide\nsalutations : valide\ncordialement : inadaptee\nbonjour : inconnue\nvalides : 2/4' }
    ],
    tests: [
      { label: 'Appel collectif', stdin: '1\nmadamemonsieur appel\n', expected: 'madamemonsieur : valide\nvalides : 1/1' },
      { label: 'Politesse bien placee', stdin: '2\ncordialement politesse\nsinceres politesse\n', expected: 'cordialement : valide\nsinceres : valide\nvalides : 2/2' },
      { label: 'Cinq formules', stdin: '5\nmonsieur appel\nmadame appel\nsalutations appel\nbienavous politesse\nchere appel\n', expected: 'monsieur : valide\nmadame : valide\nsalutations : inadaptee\nbienavous : valide\nchere : inconnue\nvalides : 3/5' }
    ],
    solution: `read -r n
valides=0
for ((i=0; i<n; i++)); do
  read -r formule type
  case "$formule" in
    madame|monsieur|madamemonsieur|madamedirectrice) famille="appel" ;;
    cordialement|bienavous|sinceres|salutations) famille="politesse" ;;
    *) famille="inconnue" ;;
  esac
  if [ "$famille" = "inconnue" ]; then
    echo "$formule : inconnue"
  elif [ "$famille" = "$type" ]; then
    echo "$formule : valide"
    valides=$((valides + 1))
  else
    echo "$formule : inadaptee"
  fi
done
echo "valides : $valides/$n"
`
  },
  {
    id: 'fr-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'shell',
    title: 'Le corps en trois paragraphes',
    goal: 'Contrôler la structure imposée : paragraphe 1 l\'entreprise, paragraphe 2 les compétences, paragraphe 3 les motivations personnelles.',
    brief: '<p>Le script lit <strong>n lignes</strong> « paragraphe contenu » : paragraphe vaut ' +
      '<code>p1</code>, <code>p2</code> ou <code>p3</code> ; contenu vaut <code>entreprise</code>, ' +
      '<code>competences</code> ou <code>personnel</code>. Le contenu attendu est entreprise pour p1, ' +
      'competences pour p2, personnel pour p3. Pour chaque ligne il affiche <code>paragraphe : conforme</code> ' +
      'ou <code>paragraphe : hors sujet (attendu X)</code>. Il termine par <code>corps : conforme</code> si ' +
      'toutes les lignes sont conformes et les trois paragraphes présents, <code>corps : a revoir</code> ' +
      'sinon ; puis <code>paragraphes : X/3</code> (paragraphes distincts conformes).</p>',
    starter: `read -r n
declare -A conformes
for ((i=0; i<n; i++)); do
  read -r paragraphe contenu
  # À compléter : vérifier le contenu attendu, marquer les conformes.
done
# À compléter : compter les paragraphes couverts, donner le verdict.
`,
    hints: [
      'Le case sur le paragraphe donne le contenu attendu ; conformes[p1]=1 marque le passage.',
      'Deux conditions pour « conforme » : trois paragraphes distincts marqués, et aucune ligne hors sujet.'
    ],
    examples: [
      { stdin: '3\np1 entreprise\np2 competences\np3 personnel\n', expected: 'p1 : conforme\np2 : conforme\np3 : conforme\ncorps : conforme\nparagraphes : 3/3' }
    ],
    tests: [
      { label: 'Tout est inverse', stdin: '2\np1 competences\np2 entreprise\n', expected: 'p1 : hors sujet (attendu entreprise)\np2 : hors sujet (attendu competences)\ncorps : a revoir\nparagraphes : 0/3' },
      { label: 'Le p3 decroche', stdin: '4\np1 entreprise\np1 entreprise\np2 competences\np3 competences\n', expected: 'p1 : conforme\np1 : conforme\np2 : conforme\np3 : hors sujet (attendu personnel)\ncorps : a revoir\nparagraphes : 2/3' },
      { label: 'Cinq lignes dans le desordre', stdin: '5\np3 personnel\np1 entreprise\np2 competences\np2 competences\np1 entreprise\n', expected: 'p3 : conforme\np1 : conforme\np2 : conforme\np2 : conforme\np1 : conforme\ncorps : conforme\nparagraphes : 3/3' }
    ],
    solution: `read -r n
declare -A conformes
rompu=0
for ((i=0; i<n; i++)); do
  read -r paragraphe contenu
  case "$paragraphe" in
    p1) attendu="entreprise" ;;
    p2) attendu="competences" ;;
    p3) attendu="personnel" ;;
  esac
  if [ "$contenu" = "$attendu" ]; then
    echo "$paragraphe : conforme"
    conformes[$paragraphe]=1
  else
    echo "$paragraphe : hors sujet (attendu $attendu)"
    rompu=1
  fi
done
compte=0
for paragraphe in p1 p2 p3; do
  if [ -n "\${conformes[$paragraphe]:-}" ]; then
    compte=$((compte + 1))
  fi
done
if [ "$compte" = "3" ] && [ "$rompu" = "0" ]; then
  echo "corps : conforme"
else
  echo "corps : a revoir"
fi
echo "paragraphes : $compte/3"
`
  },

  // ═══════════════════════════════════════════════════════════════════════
  // Chapitre 6 — Grammaire professionnelle
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'fr-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Avoir ou être',
    goal: 'Choisir l\'auxiliaire du passé composé : les verbes de mouvement prennent être, les autres avoir.',
    brief: '<p>Le script lit <strong>n lignes</strong> « verbe auxiliaire » : verbe vaut <code>aller</code>, ' +
      '<code>partir</code>, <code>arriver</code>, <code>sortir</code>, <code>venir</code>, ' +
      '<code>naitre</code>, <code>mourir</code>, <code>rester</code>, <code>descendre</code> ou ' +
      '<code>coucher</code> (être, comme les verbes pronominaux) ou <code>acheter</code>, ' +
      '<code>parler</code>, <code>finir</code>, <code>travailler</code>, <code>manger</code>, ' +
      '<code>faire</code>, <code>telephoner</code> (avoir) ; auxiliaire vaut <code>avoir</code> ou ' +
      '<code>etre</code>. Pour chaque ligne il affiche <code>verbe : auxiliaire correct</code> ou ' +
      '<code>verbe : auxiliaire fautif</code>. Il termine par <code>erreurs : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r verbe auxiliaire
  # À compléter : retrouver l'auxiliaire attendu, comparer.
done
# À compléter : bilan des erreurs.
`,
    hints: [
      'Le case sur le verbe pose l\'auxiliaire attendu : être pour les verbes de mouvement et pronominaux, avoir pour les autres.',
      'Le compteur suit exactement les auxiliaires fautifs.'
    ],
    examples: [
      { stdin: '4\naller etre\nacheter avoir\npartir avoir\nparler avoir\n', expected: 'aller : auxiliaire correct\nacheter : auxiliaire correct\npartir : auxiliaire fautif\nparler : auxiliaire correct\nerreurs : 1/4' }
    ],
    tests: [
      { label: 'Naitre avec etre', stdin: '1\nnaitre etre\n', expected: 'naitre : auxiliaire correct\nerreurs : 0/1' },
      { label: 'Deux auxiliaires inverses', stdin: '2\nfinir etre\nsortir avoir\n', expected: 'finir : auxiliaire fautif\nsortir : auxiliaire fautif\nerreurs : 2/2' },
      { label: 'Cinq verbes', stdin: '5\nvenir etre\ndescendre avoir\nmanger avoir\ncoucher etre\ntelephoner etre\n', expected: 'venir : auxiliaire correct\ndescendre : auxiliaire fautif\nmanger : auxiliaire correct\ncoucher : auxiliaire correct\ntelephoner : auxiliaire fautif\nerreurs : 2/5' }
    ],
    solution: `read -r n
erreurs=0
for ((i=0; i<n; i++)); do
  read -r verbe auxiliaire
  case "$verbe" in
    aller|partir|arriver|sortir|venir|naitre|mourir|rester|descendre|coucher) correcte="etre" ;;
    acheter|parler|finir|travailler|manger|faire|telephoner) correcte="avoir" ;;
  esac
  if [ "$auxiliaire" = "$correcte" ]; then
    echo "$verbe : auxiliaire correct"
  else
    echo "$verbe : auxiliaire fautif"
    erreurs=$((erreurs + 1))
  fi
done
echo "erreurs : $erreurs/$n"
`
  },
  {
    id: 'fr-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Accorder le participe passé',
    goal: 'Faire accorder le participe passé avec être comme un adjectif : allé, allée, allés, allées.',
    brief: '<p>Le script lit <strong>n lignes</strong> « famille forme sujet » : famille vaut <code>aller</code> ' +
      '(participe masculin <code>alle</code>) ou <code>sortir</code> (participe masculin ' +
      '<code>sorti</code>) ; forme est le participe proposé (sans accents codés) ; sujet vaut ' +
      '<code>il</code>, <code>elle</code>, <code>ils</code> ou <code>elles</code>. Le participe attendu est ' +
      'la forme masculine suivie de rien (il), e (elle), s (ils) ou es (elles). Pour chaque ligne il affiche ' +
      '<code>forme : conforme</code> ou <code>forme : accord fautif (attendu X)</code>. Il termine par ' +
      '<code>accords : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r famille forme sujet
  # À compléter : reconstruire la forme attendue, comparer.
done
# À compléter : bilan des accords.
`,
    hints: [
      'Deux case : le premier donne la forme masculine (alle ou sorti), le second le marqueur du sujet (vide, e, s, es).',
      'La forme attendue se concatène : attendu="$radical$terminaison".'
    ],
    examples: [
      { stdin: '4\naller allee elle\naller alle il\nsortir sorties elles\nsortir sortie ils\n', expected: 'allee : conforme\nalle : conforme\nsorties : conforme\nsortie : accord fautif (attendu sortis)\naccords : 3/4' }
    ],
    tests: [
      { label: 'Ils au masculin pluriel', stdin: '1\naller alles ils\n', expected: 'alles : conforme\naccords : 1/1' },
      { label: 'Deux accords manques', stdin: '2\nsortir sorti elle\naller allee il\n', expected: 'sorti : accord fautif (attendu sortie)\nallee : accord fautif (attendu alle)\naccords : 0/2' },
      { label: 'Cinq formes', stdin: '5\naller allee elle\naller allees elles\nsortir sorti il\naller alle elles\nsortir sortie elle\n', expected: 'allee : conforme\nallees : conforme\nsorti : conforme\nalle : accord fautif (attendu allees)\nsortie : conforme\naccords : 4/5' }
    ],
    solution: `read -r n
accords=0
for ((i=0; i<n; i++)); do
  read -r famille forme sujet
  case "$famille" in
    aller) radical="alle" ;;
    sortir) radical="sorti" ;;
  esac
  case "$sujet" in
    il) terminaison="" ;;
    elle) terminaison="e" ;;
    ils) terminaison="s" ;;
    elles) terminaison="es" ;;
  esac
  attendu="$radical$terminaison"
  if [ "$forme" = "$attendu" ]; then
    echo "$forme : conforme"
    accords=$((accords + 1))
  else
    echo "$forme : accord fautif (attendu $attendu)"
  fi
done
echo "accords : $accords/$n"
`
  },
  {
    id: 'fr-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'shell',
    title: 'L\'évaluation finale du cours',
    goal: 'Noter les cinq compétences du français professionnel et rendre le verdict : admis ou reprise.',
    brief: '<p>Le script lit d\'abord <code>seuil</code> (score minimal, entier). Puis il lit <strong>n ' +
      'lignes</strong> « competence score » (score entier) parmi communication, registres, orthographe, ' +
      'lettre, grammaire. Pour chaque ligne il affiche <code>competence : score X</code>. Il termine par ' +
      '<code>moyenne : M</code> (moyenne entière arrondie vers le bas) et <code>verdict : admis</code> si ' +
      'M ≥ seuil, <code>verdict : reprise</code> sinon. Si n = 0, afficher <code>moyenne : 0</code>.</p>',
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
      'Cumulez les scores puis divisez : la division entière de Bash arrondit vers le bas naturellement.',
      'Protégez le cas n = 0 pour éviter une division par zéro.'
    ],
    examples: [
      { stdin: '70\n5\ncommunication 80\nregistres 75\northographe 65\nlettre 90\ngrammaire 70\n', expected: 'communication : score 80\nregistres : score 75\northographe : score 65\nlettre : score 90\ngrammaire : score 70\nmoyenne : 76\nverdict : admis' }
    ],
    tests: [
      { label: 'Sous le seuil', stdin: '80\n2\ncommunication 70\nregistres 85\n', expected: 'communication : score 70\nregistres : score 85\nmoyenne : 77\nverdict : reprise' },
      { label: 'Aucune competence', stdin: '60\n0\n', expected: 'moyenne : 0\nverdict : reprise' },
      { label: 'Cinq competences', stdin: '75\n5\ncommunication 80\nregistres 70\northographe 90\nlettre 65\ngrammaire 75\n', expected: 'communication : score 80\nregistres : score 70\northographe : score 90\nlettre : score 65\ngrammaire : score 75\nmoyenne : 76\nverdict : admis' }
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
  echo "verdict : reprise"
fi
`
  }
];

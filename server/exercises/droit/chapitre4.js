/**
 * Chapitre 4 — Sources du droit du numérique.
 *
 * Fiches exécutables en Bash (langage `shell`). Préfixe `dr2`.
 */
'use strict';

module.exports = [
  {
    id: 'dr2-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'shell',
    title: 'Classer une source',
    goal: 'Ranger une source du droit du numérique dans sa famille et faire le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>nat</code> ' +
      '(source nationale), <code>sup</code> (source supranationale) ou <code>nor</code> (source normative). ' +
      'Pour chaque ligne il affiche <code>libelle : nationales</code>, <code>libelle : supranationales</code> ' +
      'ou <code>libelle : normatives</code>. Enfin <code>bilan : X nationales / Y supranationales / Z normatives</code>.</p>',
    starter: `read -r n
nat=0
sup=0
nor=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : afficher la famille de la source, compter chaque famille.
done
`,
    hints: [
      'nat → nationales ; sup → supranationales ; nor → normatives.',
      'Trois compteurs, comme dans les classifications précédentes.'
    ],
    examples: [
      { stdin: '2\nnat article 9 du code civil\nsup convention europeenne\n', expected: 'article 9 du code civil : nationales\nconvention europeenne : supranationales\nbilan : 1 nationales / 1 supranationales / 0 normatives' }
    ],
    tests: [
      { label: 'Une source normative', stdin: '1\nnor loi informatique et libertes\n', expected: 'loi informatique et libertes : normatives\nbilan : 0 nationales / 0 supranationales / 1 normatives' },
      { label: 'Trois sources nationales', stdin: '3\nnat loi sur la presse\nnat code civil\nnat code penal\n', expected: 'loi sur la presse : nationales\ncode civil : nationales\ncode penal : nationales\nbilan : 3 nationales / 0 supranationales / 0 normatives' },
      { label: 'Quatre sources mixtes', stdin: '4\nnor loi 2019-014\nsup traite de l OMPI\nnat article 29\nsup charte des droits\n', expected: 'loi 2019-014 : normatives\ntraite de l OMPI : supranationales\narticle 29 : nationales\ncharte des droits : supranationales\nbilan : 1 nationales / 2 supranationales / 1 normatives' }
    ],
    solution: `read -r n
nat=0
sup=0
nor=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    nat)
      echo "$libelle : nationales"
      nat=$((nat + 1))
      ;;
    sup)
      echo "$libelle : supranationales"
      sup=$((sup + 1))
      ;;
    nor)
      echo "$libelle : normatives"
      nor=$((nor + 1))
      ;;
  esac
done
echo "bilan : $nat nationales / $sup supranationales / $nor normatives"
`
  },
  {
    id: 'dr2-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Chronologie des textes',
    goal: 'Associer un texte de référence à son année et compter les textes cités.',
    brief: '<p>Le script lit <strong>n codes</strong> (un par ligne). Chaque code désigne un texte : ' +
      '<code>cedh</code> (1950), <code>loi78</code> (loi Informatique et Libertés, 1978), <code>ompi</code> ' +
      '(traités OMPI, 1996), <code>rgpdue</code> (RGPD UE, 2018), <code>rpdto</code> (RGPD Togo, 2019), ' +
      '<code>loi2019</code> (loi n° 2019-014, 2019). Pour chaque code il affiche <code>code : annee</code>. ' +
      'Enfin <code>textes : X</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r code
  # À compléter : afficher le code et l'année correspondante.
done
echo "textes : $n"
`,
    hints: [
      'Un case sur le code suffit : cedh → 1950, loi78 → 1978, ompi → 1996, rgpdue → 2018, rpdto et loi2019 → 2019.',
      'Deux codes peuvent partager la même année : traitez-les séparément dans le case.'
    ],
    examples: [
      { stdin: '2\nloi78\nrgpdue\n', expected: 'loi78 : 1978\nrgpdue : 2018\ntextes : 2' }
    ],
    tests: [
      { label: 'Un texte', stdin: '1\nompi\n', expected: 'ompi : 1996\ntextes : 1' },
      { label: 'Deux textes de 2019', stdin: '2\nrpdto\nloi2019\n', expected: 'rpdto : 2019\nloi2019 : 2019\ntextes : 2' },
      { label: 'Quatre textes', stdin: '4\ncedh\nloi78\nompi\nrgpdue\n', expected: 'cedh : 1950\nloi78 : 1978\nompi : 1996\nrgpdue : 2018\ntextes : 4' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r code
  case "$code" in
    cedh) annee=1950 ;;
    loi78) annee=1978 ;;
    ompi) annee=1996 ;;
    rgpdue) annee=2018 ;;
    rpdto) annee=2019 ;;
    loi2019) annee=2019 ;;
    *) annee=0 ;;
  esac
  echo "$code : $annee"
done
echo "textes : $n"
`
  },
  {
    id: 'dr2-c4-e3',
    chapter: 4,
    level: 'n2',
    language: 'shell',
    title: 'Traités et conventions internationales',
    goal: 'Classer un instrument international selon sa nature, puis dresser le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>ompi_da</code> ' +
      '(traité OMPI sur le droit d\'auteur), <code>ompi_ph</code> (traité OMPI sur les interprétations et ' +
      'phonogrammes), <code>cedh</code> (convention européenne des droits de l\'homme) ou <code>loi</code> ' +
      '(loi nationale). Pour chaque ligne il affiche <code>libelle : traite OMPI</code>, ' +
      '<code>libelle : convention europeenne</code> ou <code>libelle : loi nationale</code>. Enfin ' +
      '<code>bilan : X traite OMPI / Y convention europeenne / Z loi nationale</code>.</p>',
    starter: `read -r n
ompi=0
cedh=0
lois=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : classer l'instrument et compter chaque famille.
done
`,
    hints: [
      'ompi_da et ompi_ph → traite OMPI ; cedh → convention europeenne ; loi → loi nationale.',
      'Deux codes distincts peuvent pointer vers la même famille.'
    ],
    examples: [
      { stdin: '2\nompi_da protection des auteurs\ncedh droits fondamentaux\n', expected: 'protection des auteurs : traite OMPI\ndroits fondamentaux : convention europeenne\nbilan : 1 traite OMPI / 1 convention europeenne / 0 loi nationale' }
    ],
    tests: [
      { label: 'Une loi', stdin: '1\nloi protection des donnees\n', expected: 'protection des donnees : loi nationale\nbilan : 0 traite OMPI / 0 convention europeenne / 1 loi nationale' },
      { label: 'Deux traités OMPI', stdin: '2\nompi_da droit d auteur\nompi_ph phonogrammes\n', expected: 'droit d auteur : traite OMPI\nphonogrammes : traite OMPI\nbilan : 2 traite OMPI / 0 convention europeenne / 0 loi nationale' },
      { label: 'Quatre instruments', stdin: '4\ncedh libertes\nloi 2019-014\nompi_da oeuvres\nompi_ph interpretations\n', expected: 'libertes : convention europeenne\n2019-014 : loi nationale\noeuvres : traite OMPI\ninterpretations : traite OMPI\nbilan : 2 traite OMPI / 1 convention europeenne / 1 loi nationale' }
    ],
    solution: `read -r n
ompi=0
cedh=0
lois=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    ompi_da|ompi_ph)
      echo "$libelle : traite OMPI"
      ompi=$((ompi + 1))
      ;;
    cedh)
      echo "$libelle : convention europeenne"
      cedh=$((cedh + 1))
      ;;
    loi)
      echo "$libelle : loi nationale"
      lois=$((lois + 1))
      ;;
  esac
done
echo "bilan : $ompi traite OMPI / $cedh convention europeenne / $lois loi nationale"
`
  }
];

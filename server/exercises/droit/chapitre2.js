/**
 * Chapitre 2 — Données personnelles et données sensibles.
 *
 * Fiches exécutables en Bash (langage `shell`). Préfixe `dr2`.
 */
'use strict';

module.exports = [
  {
    id: 'dr2-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Données personnelles ou non',
    goal: 'Classer une information en donnée personnelle directe, indirecte ou non personnelle.',
    brief: '<p>Le script lit <strong>n lignes</strong> « type libelle » : type vaut <code>di</code> ' +
      '(directe : nom, empreinte), <code>ii</code> (indirecte : téléphone, plaque) ou <code>np</code> ' +
      '(non personnelle : coordonnées d\'entreprise). Pour chaque ligne il affiche ' +
      '<code>libelle : personnelle directe</code>, <code>libelle : personnelle indirecte</code> ou ' +
      '<code>libelle : non personnelle</code>. Enfin <code>personnelles : X/n</code>.</p>',
    starter: `read -r n
perso=0
for ((i=0; i<n; i++)); do
  read -r type libelle
  # À compléter : qualifier la donnée, compter les données personnelles.
done
`,
    hints: [
      'di → personnelle directe ; ii → personnelle indirecte ; np → non personnelle.',
      'Les coordonnées d\'entreprise ne sont pas, en principe, des données personnelles.'
    ],
    examples: [
      { stdin: '2\ndi nom et prenom\nnp contact de la societe\n', expected: 'nom et prenom : personnelle directe\ncontact de la societe : non personnelle\npersonnelles : 1/2' }
    ],
    tests: [
      { label: 'Une donnée indirecte', stdin: '1\nii numero de telephone\n', expected: 'numero de telephone : personnelle indirecte\npersonnelles : 1/1' },
      { label: 'Aucune donnée personnelle', stdin: '2\nnp siege social\nnp raison sociale\n', expected: 'siege social : non personnelle\nraison sociale : non personnelle\npersonnelles : 0/2' },
      { label: 'Quatre informations', stdin: '4\ndi empreinte digitale\nii plaque d immatriculation\nnp courriel generique de service\ndi numero de matricule\n', expected: 'empreinte digitale : personnelle directe\nplaque d immatriculation : personnelle indirecte\ncourriel generique de service : non personnelle\nnumero de matricule : personnelle directe\npersonnelles : 3/4' }
    ],
    solution: `read -r n
perso=0
for ((i=0; i<n; i++)); do
  read -r type libelle
  if [ "$type" = "di" ]; then
    echo "$libelle : personnelle directe"
    perso=$((perso + 1))
  elif [ "$type" = "ii" ]; then
    echo "$libelle : personnelle indirecte"
    perso=$((perso + 1))
  else
    echo "$libelle : non personnelle"
  fi
done
echo "personnelles : $perso/$n"
`
  },
  {
    id: 'dr2-c2-e2',
    chapter: 2,
    level: 'n1',
    language: 'shell',
    title: 'Les données sensibles',
    goal: 'Repérer les données à caractère sensible et les distinguer des données ordinaires.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>ori</code> ' +
      '(origine raciale ou ethnique), <code>opi</code> (opinions religieuses, philosophiques, politiques, ' +
      'syndicales), <code>san</code> (santé ou vie sexuelle), <code>msr</code> (mesures sociales, poursuites, ' +
      'sanctions) ou <code>ord</code> (donnée ordinaire). Pour chaque ligne il affiche ' +
      '<code>libelle : sensible</code> ou <code>libelle : ordinaire</code>. Enfin <code>sensibles : X/n</code>.</p>',
    starter: `read -r n
sensibles=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : sensible si ori/opi/san/msr, ordinaire si ord.
done
`,
    hints: [
      'ori, opi, san et msr désignent des données sensibles ; ord ne l\'est pas.',
      'Un case avec les quatre codes sensibles, et un cas par défaut, suffit.'
    ],
    examples: [
      { stdin: '2\nori origine ethnique\nord adresse postale\n', expected: 'origine ethnique : sensible\nadresse postale : ordinaire\nsensibles : 1/2' }
    ],
    tests: [
      { label: 'Une donnée de santé', stdin: '1\nsan dossier medical\n', expected: 'dossier medical : sensible\nsensibles : 1/1' },
      { label: 'Aucune donnée sensible', stdin: '2\nord date de naissance\nord langue parlee\n', expected: 'date de naissance : ordinaire\nlangue parlee : ordinaire\nsensibles : 0/2' },
      { label: 'Cinq données mixtes', stdin: '5\nopi appartenance syndicale\nmsr sanction administrative\nord centre de loisirs\nsan vie sexuelle\nori appartenance ethnique\n', expected: 'appartenance syndicale : sensible\nsanction administrative : sensible\ncentre de loisirs : ordinaire\nvie sexuelle : sensible\nappartenance ethnique : sensible\nsensibles : 4/5' }
    ],
    solution: `read -r n
sensibles=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    ori|opi|san|msr)
      echo "$libelle : sensible"
      sensibles=$((sensibles + 1))
      ;;
    *)
      echo "$libelle : ordinaire"
      ;;
  esac
done
echo "sensibles : $sensibles/$n"
`
  },
  {
    id: 'dr2-c2-e3',
    chapter: 2,
    level: 'n2',
    language: 'shell',
    title: 'Opérations constitutives d\'un traitement',
    goal: 'Décider si une opération portant sur des données est un traitement au sens du RGPD.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code désigne une opération : ' +
      '<code>col</code> (collecte), <code>enr</code> (enregistrement), <code>org</code> (organisation), ' +
      '<code>con</code> (conservation), <code>uta</code> (utilisation ou adaptation) ou <code>ces</code> ' +
      '(cession). Toute opération de cette liste constitue un <em>traitement</em>. Le code <code>x</code> ne ' +
      'constitue pas un traitement. Pour chaque ligne, affichez <code>libelle : traitement</code> ou ' +
      '<code>libelle : hors traitement</code>. Enfin <code>traitements : X/n</code>.</p>',
    starter: `read -r n
traitements=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : les six opérations listées sont des traitements, x ne l'est pas.
done
`,
    hints: [
      'Une entreprise réalise un traitement dès qu\'elle effectue une de ces opérations.',
      'Le code x (aucune opération) n\'est pas un traitement.'
    ],
    examples: [
      { stdin: '2\ncol collecte des adresses\nx affichage publicitaire\n', expected: 'collecte des adresses : traitement\naffichage publicitaire : hors traitement\ntraitements : 1/2' }
    ],
    tests: [
      { label: 'Une cession', stdin: '1\nces vente a un partenaire\n', expected: 'vente a un partenaire : traitement\ntraitements : 1/1' },
      { label: 'Aucun traitement', stdin: '2\nx creation d affiche\nx impression papier\n', expected: 'creation d affiche : hors traitement\nimpression papier : hors traitement\ntraitements : 0/2' },
      { label: 'Cinq opérations', stdin: '5\nenr inscription au fichier\norg classement des fiches\ncon archivage cinq ans\nuta analyse statistique\nx tri du courrier\n', expected: 'inscription au fichier : traitement\nclassement des fiches : traitement\narchivage cinq ans : traitement\nanalyse statistique : traitement\ntri du courrier : hors traitement\ntraitements : 4/5' }
    ],
    solution: `read -r n
traitements=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    col|enr|org|con|uta|ces)
      echo "$libelle : traitement"
      traitements=$((traitements + 1))
      ;;
    *)
      echo "$libelle : hors traitement"
      ;;
  esac
done
echo "traitements : $traitements/$n"
`
  }
];

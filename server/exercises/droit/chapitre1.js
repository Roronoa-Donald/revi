/**
 * Chapitre 1 — Notions générales du droit de l'informatique.
 *
 * Fiches exécutables en Bash (langage `shell`), comme `b1-droit` : la logique
 * juridique (classification, comptage, verdict) est simulée sur l'entrée
 * standard. Préfixe `dr2`.
 */
'use strict';

module.exports = [
  {
    id: 'dr2-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Classer les notions',
    goal: 'Distinguer le droit, l\'informatique et le droit du numérique, puis dresser le bilan.',
    brief: '<p>Le script lit <strong>n lignes</strong> « type libelle » : type vaut <code>d</code> (droit), ' +
      '<code>i</code> (informatique) ou <code>n</code> (droit du numérique). Pour chaque ligne il affiche ' +
      '<code>libelle : categorie</code>, où categorie vaut <code>droit</code>, <code>informatique</code> ou ' +
      '<code>droit du numerique</code>. Enfin il affiche <code>bilan : X droit / Y informatique / Z numerique</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r type libelle
  # À compléter : afficher la catégorie, puis compter chaque famille.
done
`,
    hints: [
      'Trois compteurs posés à 0 avant la boucle, incrémentés dans les branches du if.',
      'Le bilan sort après la boucle, au format exact « X droit / Y informatique / Z numerique ».'
    ],
    examples: [
      { stdin: '3\nd ensemble des regles\ni traitement de l information\nn regles du numerique\n', expected: 'ensemble des regles : droit\ntraitement de l information : informatique\nregles du numerique : droit du numerique\nbilan : 1 droit / 1 informatique / 1 numerique' }
    ],
    tests: [
      { label: 'Uniquement du droit', stdin: '2\nd code civil\nd constitution\n', expected: 'code civil : droit\nconstitution : droit\nbilan : 2 droit / 0 informatique / 0 numerique' },
      { label: 'Uniquement de l informatique', stdin: '1\ni algorithme\n', expected: 'algorithme : informatique\nbilan : 0 droit / 1 informatique / 0 numerique' },
      { label: 'Cinq éléments mixtes', stdin: '5\nd regle de droit\ni logiciel\nn donnees personnelles\nd jurisprudence\nn droit de l internet\n', expected: 'regle de droit : droit\nlogiciel : informatique\ndonnees personnelles : droit du numerique\njurisprudence : droit\ndroit de l internet : droit du numerique\nbilan : 2 droit / 1 informatique / 2 numerique' }
    ],
    solution: `read -r n
droits=0
informatiques=0
numeriques=0
for ((i=0; i<n; i++)); do
  read -r type libelle
  if [ "$type" = "d" ]; then
    echo "$libelle : droit"
    droits=$((droits + 1))
  elif [ "$type" = "i" ]; then
    echo "$libelle : informatique"
    informatiques=$((informatiques + 1))
  else
    echo "$libelle : droit du numerique"
    numeriques=$((numeriques + 1))
  fi
done
echo "bilan : $droits droit / $informatiques informatique / $numeriques numerique"
`
  },
  {
    id: 'dr2-c1-e2',
    chapter: 1,
    level: 'n1',
    language: 'shell',
    title: 'Les fondements du droit du numérique',
    goal: 'Associer un code à son fondement juridique et compter les occurrences.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>dp</code> ' +
      '(protection des données personnelles), <code>pi</code> (propriété intellectuelle), ' +
      '<code>ci</code> (contrats informatiques) ou <code>rc</code> (responsabilité civile). Pour chaque ligne ' +
      'il affiche <code>libelle : fondement</code> avec le libellé du fondement. Enfin il affiche ' +
      '<code>fondements : X/n</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : afficher le fondement correspondant au code, puis compter.
done
`,
    hints: [
      'Quatre codes : dp → donnees personnelles, pi → propriete intellectuelle, ci → contrats informatiques, rc → responsabilite civile.',
      'Le compteur « fondements » s\'incrémente à chaque ligne traitée.'
    ],
    examples: [
      { stdin: '2\ndp loi informatique et libertes\npi droit d auteur\n', expected: 'loi informatique et libertes : donnees personnelles\ndroit d auteur : propriete intellectuelle\nfondements : 2/2' }
    ],
    tests: [
      { label: 'Un contrat', stdin: '1\nci licence logicielle\n', expected: 'licence logicielle : contrats informatiques\nfondements : 1/1' },
      { label: 'Responsabilité', stdin: '2\nrc faille de securite\nrc systeme defaillant\n', expected: 'faille de securite : responsabilite civile\nsysteme defaillant : responsabilite civile\nfondements : 2/2' },
      { label: 'Quatre fondements', stdin: '4\ndp consentement\npi marque deposee\nci service cloud\nrc dommage\n', expected: 'consentement : donnees personnelles\nmarque deposee : propriete intellectuelle\nservice cloud : contrats informatiques\ndommage : responsabilite civile\nfondements : 4/4' }
    ],
    solution: `read -r n
total=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    dp) echo "$libelle : donnees personnelles" ;;
    pi) echo "$libelle : propriete intellectuelle" ;;
    ci) echo "$libelle : contrats informatiques" ;;
    rc) echo "$libelle : responsabilite civile" ;;
  esac
  total=$((total + 1))
done
echo "fondements : $total/$n"
`
  },
  {
    id: 'dr2-c1-e3',
    chapter: 1,
    level: 'n2',
    language: 'shell',
    title: 'Les droits numériques',
    goal: 'Reconnaître parmi des droits lesquels font partie des droits numériques.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>le</code> ' +
      '(liberté d\'expression), <code>vp</code> (vie privée), <code>ai</code> (accès à l\'information) ou ' +
      '<code>x</code> (aucun des trois). Pour chaque ligne il affiche <code>libelle : oui</code> si le droit ' +
      'fait partie des droits du numérique, <code>libelle : non</code> sinon. Enfin il affiche ' +
      '<code>droits numeriques : X/n</code>.</p>',
    starter: `read -r n
droits=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : tester si le code est le/vp/ai, afficher oui ou non, compter.
done
`,
    hints: [
      'le, vp et ai sont des droits du numérique ; x ne l\'est pas.',
      'Utilisez un test avec plusieurs alternatives (case) pour rester lisible.'
    ],
    examples: [
      { stdin: '2\nvp respect de la vie privee\nx droit de cuissage\n', expected: 'respect de la vie privee : oui\ndroit de cuissage : non\ndroits numeriques : 1/2' }
    ],
    tests: [
      { label: 'Un seul droit', stdin: '1\nle liberte d expression\n', expected: 'liberte d expression : oui\ndroits numeriques : 1/1' },
      { label: 'Aucun droit', stdin: '2\nx droit de preemption\nx droit de retrait\n', expected: 'droit de preemption : non\ndroit de retrait : non\ndroits numeriques : 0/2' },
      { label: 'Quatre droits mixtes', stdin: '4\nai acces a l information\nvp vie privee\nx droit de chasse\nle opinion\n', expected: 'acces a l information : oui\nvie privee : oui\ndroit de chasse : non\nopinion : oui\ndroits numeriques : 3/4' }
    ],
    solution: `read -r n
droits=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    le|vp|ai)
      echo "$libelle : oui"
      droits=$((droits + 1))
      ;;
    *)
      echo "$libelle : non"
      ;;
  esac
done
echo "droits numeriques : $droits/$n"
`
  }
];

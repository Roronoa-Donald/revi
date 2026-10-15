/**
 * Chapitre 3 — Défis et enjeux du droit du numérique.
 *
 * Fiches exécutables en Bash (langage `shell`). Préfixe `dr2`.
 */
'use strict';

module.exports = [
  {
    id: 'dr2-c3-e1',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Enjeux de l\'affaire Cambridge Analytica',
    goal: 'Repérer, dans une liste de griefs, ceux qui constituent de vrais enjeux juridiques.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>una</code> ' +
      '(utilisation non autorisée des données), <code>mp</code> (manipulation électorale par profilage), ' +
      '<code>tc</code> (non-respect de la transparence et du consentement) ou <code>au</code> (autre grief). ' +
      'Pour chaque ligne il affiche <code>libelle : oui</code> si le grief est un enjeu juridique ' +
      '(una, mp, tc), <code>libelle : non</code> sinon. Enfin <code>enjeux : X/n</code>.</p>',
    starter: `read -r n
enjeux=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : una, mp et tc sont des enjeux juridiques.
done
`,
    hints: [
      'Trois codes constituent un enjeu : una, mp, tc.',
      'Les autres griefs sont sans portée juridique directe.'
    ],
    examples: [
      { stdin: '2\nuna usage non autorise\nau couleur du logo\n', expected: 'usage non autorise : oui\ncouleur du logo : non\nenjeux : 1/2' }
    ],
    tests: [
      { label: 'Un seul enjeu', stdin: '1\nmp profilage psychologique\n', expected: 'profilage psychologique : oui\nenjeux : 1/1' },
      { label: 'Aucun enjeu', stdin: '2\nau retard de livraison\nau budget depasse\n', expected: 'retard de livraison : non\nbudget depasse : non\nenjeux : 0/2' },
      { label: 'Quatre griefs', stdin: '4\nuna donnees detournees\ntc consentement absent\nau design du site\nmp manipulation electorale\n', expected: 'donnees detournees : oui\nconsentement absent : oui\ndesign du site : non\nmanipulation electorale : oui\nenjeux : 3/4' }
    ],
    solution: `read -r n
enjeux=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    una|mp|tc)
      echo "$libelle : oui"
      enjeux=$((enjeux + 1))
      ;;
    *)
      echo "$libelle : non"
      ;;
  esac
done
echo "enjeux : $enjeux/$n"
`
  },
  {
    id: 'dr2-c3-e2',
    chapter: 3,
    level: 'n1',
    language: 'shell',
    title: 'Contenus numériques à réguler',
    goal: 'Trier des contenus problématiques et établir le bilan par catégorie.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>hai</code> ' +
      '(discours de haine), <code>des</code> (désinformation) ou <code>dif</code> (diffamation). Pour chaque ' +
      'ligne il affiche <code>libelle : haine</code>, <code>libelle : desinformation</code> ou ' +
      '<code>libelle : diffamation</code>. Enfin <code>bilan : X haine / Y desinformation / Z diffamation</code>.</p>',
    starter: `read -r n
haine=0
desinfo=0
diffam=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : afficher la catégorie et incrémenter le bon compteur.
done
`,
    hints: [
      'Trois compteurs distincts, un par catégorie.',
      'Le bilan reproduit exactement l\'ordre « haine / desinformation / diffamation ».'
    ],
    examples: [
      { stdin: '2\nhai propos violents\ndif accusation fausse\n', expected: 'propos violents : haine\naccusation fausse : diffamation\nbilan : 1 haine / 0 desinformation / 1 diffamation' }
    ],
    tests: [
      { label: 'Une désinformation', stdin: '1\ndes fausse nouvelle\n', expected: 'fausse nouvelle : desinformation\nbilan : 0 haine / 1 desinformation / 0 diffamation' },
      { label: 'Trois haines', stdin: '3\nhai insulte\nhai menace\nhai harcelement\n', expected: 'insulte : haine\nmenace : haine\nharcelement : haine\nbilan : 3 haine / 0 desinformation / 0 diffamation' },
      { label: 'Quatre contenus mixtes', stdin: '4\nhai attaque\ndes intox\ndif rumeur\nhai menace\n', expected: 'attaque : haine\nintox : desinformation\nrumeur : diffamation\nmenace : haine\nbilan : 2 haine / 1 desinformation / 1 diffamation' }
    ],
    solution: `read -r n
haine=0
desinfo=0
diffam=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    hai)
      echo "$libelle : haine"
      haine=$((haine + 1))
      ;;
    des)
      echo "$libelle : desinformation"
      desinfo=$((desinfo + 1))
      ;;
    dif)
      echo "$libelle : diffamation"
      diffam=$((diffam + 1))
      ;;
  esac
done
echo "bilan : $haine haine / $desinfo desinformation / $diffam diffamation"
`
  },
  {
    id: 'dr2-c3-e3',
    chapter: 3,
    level: 'n2',
    language: 'shell',
    title: 'Addictions numériques',
    goal: 'Identifier les manifestations d\'addiction évoquées par le cours et en faire le compte.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>nomo</code> ' +
      '(nomophobie), <code>selfi</code> (selfitisme), <code>fomo</code> (peur de rater une information) ou ' +
      '<code>vibr</code> (syndrome des vibrations fantômes). Tout autre code est <code>autre</code>. Pour chaque ' +
      'ligne il affiche <code>libelle : addiction</code> ou <code>libelle : autre</code>. Enfin ' +
      '<code>addictions : X/n</code>.</p>',
    starter: `read -r n
addictions=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : nomo, selfi, fomo et vibr sont des addictions.
done
`,
    hints: [
      'Quatre codes décrivent une addiction : nomo, selfi, fomo, vibr.',
      'Le case avec plusieurs motifs « a|b|c » traite plusieurs codes à la fois.'
    ],
    examples: [
      { stdin: '2\nfomo besoin de surveiller\nautre lecture papier\n', expected: 'besoin de surveiller : addiction\nlecture papier : autre\naddictions : 1/2' }
    ],
    tests: [
      { label: 'Un syndrome', stdin: '1\nvibr telephone qui vibre sans raison\n', expected: 'telephone qui vibre sans raison : addiction\naddictions : 1/1' },
      { label: 'Aucune addiction', stdin: '2\nautre sport\nautre cuisine\n', expected: 'sport : autre\ncuisine : autre\naddictions : 0/2' },
      { label: 'Cinq usages', stdin: '5\nnomo peur sans telephone\nselfi culte de soi\nautre jardinage\nvibr fausse vibration\nfomo peur de rater\n', expected: 'peur sans telephone : addiction\nculte de soi : addiction\njardinage : autre\nfausse vibration : addiction\npeur de rater : addiction\naddictions : 4/5' }
    ],
    solution: `read -r n
addictions=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    nomo|selfi|fomo|vibr)
      echo "$libelle : addiction"
      addictions=$((addictions + 1))
      ;;
    *)
      echo "$libelle : autre"
      ;;
  esac
done
echo "addictions : $addictions/$n"
`
  }
];

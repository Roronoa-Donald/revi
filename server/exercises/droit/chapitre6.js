/**
 * Chapitre 6 — Cadre institutionnel et dispositions pénales (Togo).
 *
 * Fiches exécutables en Bash (langage `shell`). Préfixe `dr2`.
 */
'use strict';

module.exports = [
  {
    id: 'dr2-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'shell',
    title: 'Articles du cadre institutionnel',
    goal: 'Associer quelques articles de la loi togolaise à leur objet.',
    brief: '<p>Le script lit <strong>n codes</strong> d\'articles (un par ligne). <code>a55</code> crée ' +
      'l\'IPDCP, <code>a68</code> définit sa mission de contrôle, <code>a79</code> réprime les traitements ' +
      'sans formalités préalables. Pour chaque code, affichez <code>code : objet</code> : ' +
      '<code>a55 : creation de l IPDCP</code>, <code>a68 : mission de controle</code>, ' +
      '<code>a79 : traitements sans formalites</code>. Enfin <code>articles : X</code>.</p>',
    starter: `read -r n
for ((i=0; i<n; i++)); do
  read -r code
  # À compléter : afficher l'objet de l'article.
done
echo "articles : $n"
`,
    hints: [
      'a55 → création ; a68 → contrôle ; a79 → traitements sans formalités.',
      'Un case à trois motifs suffit.'
    ],
    examples: [
      { stdin: '2\na55\na79\n', expected: 'a55 : creation de l IPDCP\na79 : traitements sans formalites\narticles : 2' }
    ],
    tests: [
      { label: 'La mission de contrôle', stdin: '1\na68\n', expected: 'a68 : mission de controle\narticles : 1' },
      { label: 'Article 68 deux fois', stdin: '2\na68\na68\n', expected: 'a68 : mission de controle\na68 : mission de controle\narticles : 2' },
      { label: 'Trois articles', stdin: '3\na55\na68\na79\n', expected: 'a55 : creation de l IPDCP\na68 : mission de controle\na79 : traitements sans formalites\narticles : 3' }
    ],
    solution: `read -r n
for ((i=0; i<n; i++)); do
  read -r code
  case "$code" in
    a55) echo "a55 : creation de l IPDCP" ;;
    a68) echo "a68 : mission de controle" ;;
    a79) echo "a79 : traitements sans formalites" ;;
  esac
done
echo "articles : $n"
`
  },
  {
    id: 'dr2-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Calcul de la sanction pénale (Togo)',
    goal: 'Déterminer la peine encourue et l\'amende minimale selon le caractère intentionnel ou négligent.',
    brief: '<p>Le script lit d\'abord le <strong>type</strong> d\'infraction (<code>intentionnel</code> ou ' +
      '<code>negligence</code>), puis le <strong>nombre d\'infractions</strong> (entier). Art. 79 : ' +
      'l\'infraction intentionnelle est punie de <em>1 an à 5 ans</em> et d\'une amende de <em>1 000 000 à ' +
      '10 000 000</em> de francs CFA ; l\'infraction par négligence, de <em>1 an à 3 ans</em> et de ' +
      '<em>500 000 à 5 000 000</em>. Affichez <code>emprisonnement : X</code> (la fourchette) puis ' +
      '<code>amende minimale : Y</code>, Y étant la somme des amendes minimales.</p>',
    starter: `read -r type
read -r nombre
# À compléter : fourchette d'emprisonnement selon le type, puis amende minimale cumulée.
`,
    hints: [
      'intentionnel → « 1 a 5 ans » et 1 000 000 par infraction ; negligence → « 1 a 3 ans » et 500 000.',
      'L\'amende minimale cumulée vaut nombre × montant minimal unitaire.'
    ],
    examples: [
      { stdin: 'intentionnel\n2\n', expected: 'emprisonnement : 1 a 5 ans\namende minimale : 2000000' }
    ],
    tests: [
      { label: 'Négligence simple', stdin: 'negligence\n1\n', expected: 'emprisonnement : 1 a 3 ans\namende minimale : 500000' },
      { label: 'Trois infractions par négligence', stdin: 'negligence\n3\n', expected: 'emprisonnement : 1 a 3 ans\namende minimale : 1500000' },
      { label: 'Quatre infractions intentionnelles', stdin: 'intentionnel\n4\n', expected: 'emprisonnement : 1 a 5 ans\namende minimale : 4000000' }
    ],
    solution: `read -r type
read -r nombre
if [ "$type" = "intentionnel" ]; then
  echo "emprisonnement : 1 a 5 ans"
  unite=1000000
else
  echo "emprisonnement : 1 a 3 ans"
  unite=500000
fi
echo "amende minimale : $((unite * nombre))"
`
  },
  {
    id: 'dr2-c6-e3',
    chapter: 6,
    level: 'n2',
    language: 'shell',
    title: 'Qualification des infractions',
    goal: 'Rattacher une infraction à l\'article de la loi togolaise qui la réprime, puis compter.',
    brief: '<p>Le script lit <strong>n lignes</strong> « code libelle ». Le code vaut : <code>a86</code> ' +
      '(données sensibles sans consentement), <code>a87</code> (données relatives aux condamnations ou mesures ' +
      'de sûreté), <code>a93</code> (entrave à l\'action de l\'Instance de contrôle). Pour chaque ligne il ' +
      'affiche <code>libelle : objet</code> : <code>donnees sensibles</code>, <code>condamnations</code> ou ' +
      '<code>entrave au controle</code>. Enfin <code>infractions : X/n</code>.</p>',
    starter: `read -r n
infractions=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  # À compléter : qualifier l'infraction selon l'article, puis compter.
done
`,
    hints: [
      'a86 → donnees sensibles ; a87 → condamnations ; a93 → entrave au controle.',
      'Le compteur « infractions » s\'incrémente à chaque ligne.'
    ],
    examples: [
      { stdin: '2\na86 origine ethnique stockee\na93 refus de communication\n', expected: 'origine ethnique stockee : donnees sensibles\nrefus de communication : entrave au controle\ninfractions : 2/2' }
    ],
    tests: [
      { label: 'Une condamnation', stdin: '1\na87 fichier des condamnations\n', expected: 'fichier des condamnations : condamnations\ninfractions : 1/1' },
      { label: 'Deux entraves', stdin: '2\na93 documents caches\na93 programme refuse\n', expected: 'documents caches : entrave au controle\nprogramme refuse : entrave au controle\ninfractions : 2/2' },
      { label: 'Quatre infractions', stdin: '4\na86 sante\na87 surete\na93 controle empeche\na86 vie sexuelle\n', expected: 'sante : donnees sensibles\nsurete : condamnations\ncontrole empeche : entrave au controle\nvie sexuelle : donnees sensibles\ninfractions : 4/4' }
    ],
    solution: `read -r n
infractions=0
for ((i=0; i<n; i++)); do
  read -r code libelle
  case "$code" in
    a86) echo "$libelle : donnees sensibles" ;;
    a87) echo "$libelle : condamnations" ;;
    a93) echo "$libelle : entrave au controle" ;;
  esac
  infractions=$((infractions + 1))
done
echo "infractions : $infractions/$n"
`
  }
];

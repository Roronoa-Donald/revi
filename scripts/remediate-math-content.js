'use strict';

const fs = require('fs');
const path = require('path');

console.log('=== REMEDIATION DU CONTENU DES COURS DE MATHS (b1-algebre & b1-stats) ===\n');

// ─────────────────────────────────────────────────────────────────────────────
// 1. server/content/b1-algebre/pages.js
// ─────────────────────────────────────────────────────────────────────────────
{
  const filePath = path.join(__dirname, '..', 'server', 'content', 'b1-algebre', 'pages.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace method box in index
  const oldMethod = [
    "box('method', 'Comment ce cours s’articule', 'compass', [",
    "      '    <p>Chaque chapitre part d’un problème concret, pose les définitions, déroule un exemple ' +",
    "      'calculé ligne à ligne, puis se termine par <strong>trois exercices de code en Python</strong> : ' +",
    "      'tu écris vraiment un programme qui calcule (somme de vecteurs, produit de matrices, déterminant, ' +",
    "      'résolution de système), il est réellement exécuté puis corrigé par des tests que tu ne vois pas.</p>',",
    "      '    <p>Le langage Python sert ici de <em>calculatrice vérifiable</em> : il n’est jamais le sujet du ' +",
    "      'cours, il est le moyen de contrôler que la méthode est comprise. Les formules restent celles du ' +",
    "      'support, en notation mathématique.</p>'",
    "    ].join('\\n'))"
  ].join('\n');

  const newMethod = [
    "box('method', 'Comment ce cours s’articule', 'compass', [",
    "      '    <p>Chaque chapitre part d’un problème concret, pose les définitions formelles, déroule un exemple ' +",
    "      'calculé pas à pas, puis se termine par <strong>trois applications pratiques graduées</strong> : ' +",
    "      'tu appliques directement les formules du cours (combinaison linéaire, produit de matrices, inversion de Gauss, ' +",
    "      'calcul de déterminant, résolution de systèmes de Cramer) sur des grilles d’analyse vérifiables.</p>',",
    "      '    <p>L’accent est mis sur la <strong>rigueur mathématique et le sens géométrique</strong> : ' +",
    "      'comprendre ce que représente une transformation, un noyau ou un changement de base est la clé ' +",
    "      'pour maîtriser l’informatique graphique, l’intelligence artificielle et la cryptographie.</p>'",
    "    ].join('\\n'))"
  ].join('\n');

  content = content.replace(oldMethod, newMethod);

  // Replace Python mentions in sommaire
  const oldSommaireText = "  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> à écrire et à exécuter ' +\n" +
    "    'dans la page : ton programme est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +\n" +
    "    'L’<a href=\"atelier.html\">atelier de calcul</a> permet de manipuler librement.</p>";

  const newSommaireText = "  <p>Chaque chapitre se termine par <strong>trois études de cas pratiques</strong> à résoudre ' +\n" +
    "    'directement dans la page : vos calculs sont confrontés aux critères attendus pour valider chaque étape. ' +\n" +
    "    'L’<a href=\"atelier.html\">atelier de calcul</a> permet de poser librement vos grilles matricielles.</p>";

  content = content.replace(oldSommaireText, newSommaireText);

  content = content.replace(
    '<span class="toc__d">Écrire et exécuter du Python directement dans la page.</span>',
    '<span class="toc__d">Vérifier vos calculs matriciels directement dans la page.</span>'
  );

  content = content.replace(
    /exercices Python exécutables/g,
    'études de cas et exercices pratiques'
  );

  // Replace atelier lead
  const oldAtelierLead = "'  <p class=\"lead\">Un éditeur dans la page, un vrai interpréteur Python derrière. Écris un calcul, ' +\n" +
    "    'donne-lui ses données, exécute-le et lis ce qu’il affiche. C’est ici qu’une formule devient un réflexe.</p>'";

  const newAtelierLead = "'  <p class=\"lead\">Un espace de travail interactif pour poser vos matrices, dérouler les combinaisons linéaires ' +\n" +
    "    'et vérifier chaque étape de vos calculs algébriques sans calculatrice opaque.</p>'";

  content = content.replace(oldAtelierLead, newAtelierLead);

  // Replace atelier objectifs
  const oldAtelierObj = [
    "box('objectifs', 'Comment fonctionne l’atelier', 'target', [",
    "      '    <ul>',
    "      '      <li><strong>Exécuter</strong> fait tourner votre code Python tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',",
    "      '      <li><strong>Entrée du programme</strong> contient ce que <code>input()</code> lira, une valeur par ligne.</li>',",
    "      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',",
    "      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',",
    "      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',",
    "      '    </ul>'",
    "    ].join('\\n'))"
  ].join('\n');

  const newAtelierObj = [
    "box('objectifs', 'Comment utiliser l’atelier de calcul matriciel', 'target', [",
    "      '    <ul>',
    "      '      <li><strong>Vérifier</strong> confronte votre grille de calcul et vos coefficients aux critères attendus.</li>',
    "      '      <li><strong>Grille de calcul</strong> structure les étapes : dimension, coefficients, pivots et résultat.</li>',
    "      '      <li><strong>Expliquer mon erreur</strong> fournit un guidage méthodologique détaillé sans donner la solution brute.</li>',
    "      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> lance la validation de la grille.</li>',
    "      '      <li>Vos calculs et brouillons sont sauvegardés localement dans votre navigateur.</li>',
    "      '    </ul>'",
    "    ].join('\\n'))"
  ].join('\n');

  content = content.replace(oldAtelierObj, newAtelierObj);

  // Replace lab starter in atelier
  const oldLabStarter = [
    "      '     data-language=\"python\"',",
    "      '     data-height=\"360\"',",
    "      '     data-languages=\"1\"',",
    "      '     data-stdin=\"1&#10;1&#10;1\">',",
    "      '  <script type=\"text/plain\" data-lab-starter># Zone libre : calculez, cassez, recommencez.',",
    "      '# Rien de ce que vous écrirez ici n’est noté.',",
    "      '#',",
    "      '# Exemple proposé : produit d’une matrice 3×3 par un vecteur.',",
    "      '# Le script lit un vecteur de 3 entiers (une valeur par ligne)',",
    "      '# puis affiche le produit avec la matrice [[2,1,0],[0,3,1],[1,0,4]].',",
    "      '',",
    "      'MATRICE = [[2, 1, 0], [0, 3, 1], [1, 0, 4]]',",
    "      '',",
    "      'def produit_matrice_vecteur(m, v):',",
    "      '    return [sum(m[i][j] * v[j] for j in range(len(v))) for i in range(len(m))]',",
    "      '',",
    "      'vecteur = [int(input()) for _ in range(3)]',",
    "      'resultat = produit_matrice_vecteur(MATRICE, vecteur)',",
    "      'print(\" \".join(str(x) for x in resultat))',",
    "      '</script>'"
  ].join('\n');

  const newLabStarter = [
    "      '     data-language=\"analyse\"',",
    "      '     data-height=\"360\"',",
    "      '     data-languages=\"1\">',",
    "      '  <script type=\"text/plain\" data-lab-starter># Grille de calcul matriciel libre',",
    "      '# Posez vos matrices et appliquez les opérations du cours.',",
    "      '',",
    "      '[Matrice A (3x3)]',",
    "      '# Coefficients par ligne :',",
    "      '# 2  1  0',",
    "      '# 0  3  1',",
    "      '# 1  0  4',",
    "      '',",
    "      '[Vecteur v (3x1)]',",
    "      '# Composantes :',",
    "      '# 1',",
    "      '# 1',",
    "      '# 1',",
    "      '',",
    "      '[Produit A x v]',",
    "      '# Calculez le vecteur résultant (3x1) :',",
    "      '# L1 = 2*1 + 1*1 + 0*1 = 3',",
    "      '# L2 = 0*1 + 3*1 + 1*1 = 4',",
    "      '# L3 = 1*1 + 0*1 + 4*1 = 5',",
    "      '3',",
    "      '4',",
    "      '5',",
    "      '</script>'"
  ].join('\n');

  content = content.replace(oldLabStarter, newLabStarter);

  content = content.replace(
    "'      <span class=\"lab__lang\">' + ic('terminal') + ' Python</span>',",
    "'      <span class=\"lab__lang\">' + ic('calculator') + ' Algèbre matricielle</span>',"
  );

  content = content.replace(
    '<h3 class="lab__title">Zone libre — produit matrice × vecteur</h3>',
    '<h3 class="lab__title">Grille libre — produit matrice × vecteur</h3>'
  );

  const oldBrief = [
    "      '<p>Le script proposé calcule le produit d’une matrice fixe par un vecteur lu sur l’entrée standard. ' +",
    "      'Modifie la matrice, change la dimension, ou remplace tout le script par le calcul que tu veux vérifier.</p>',",
    "      '<p>Une erreur n’est pas un échec : c’est le message que Python te laisse pour comprendre ce qu’il attendait.</p>'"
  ].join('\n');

  const newBrief = [
    "      '<p>La grille ci-dessus illustre le produit d’une matrice carrée 3×3 par un vecteur colonne. ' +",
    "      'Modifiez les coefficients, changez la dimension ou appliquez une autre opération matricielle (addition, transposée, déterminant).</p>',",
    "      '<p>La rigueur des étapes de calcul garantit des résultats exacts et reproductibles.</p>'"
  ].join('\n');

  content = content.replace(oldBrief, newBrief);

  const oldTech = [
    "box('tech', 'Ce que fait l’atelier, côté technique', 'terminal', [",
    "      '    <ul>',
    "      '      <li>Votre code est envoyé à ce serveur, qui le transmet à un service d’exécution isolé : rien ne tourne sur votre machine, et aucun accès au système n’est possible.</li>',",
    "      '      <li>La clé du service reste sur le serveur ; le navigateur ne la voit jamais.</li>',",
    "      '      <li>Le nombre d’exécutions est limité par jour, pour tout le monde. L’atelier n’exécute donc que sur un clic.</li>',",
    "      '    </ul>'",
    "    ].join('\\n'))"
  ].join('\n');

  const newTech = [
    "box('standard', 'Règles fondamentales du calcul matriciel', [",
    "      '    <ul>',
    "      '      <li><strong>Compatibilité des tailles</strong> : pour multiplier A (m×k) par B (k×n), le nombre de colonnes de A doit égaler le nombre de lignes de B.</li>',
    "      '      <li><strong>Non-commutativité</strong> : en règle générale, A · B ≠ B · A. L’ordre des facteurs est capital.</li>',
    "      '      <li><strong>Déterminant non nul</strong> : une matrice carrée est inversible si et seulement si son déterminant est non nul (det(A) ≠ 0).</li>',
    "      '    </ul>'",
    "    ].join('\\n'))"
  ].join('\n');

  content = content.replace(oldTech, newTech);

  content = content.replace(
    "'  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Python corrigés ' +\n" +
    "    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +\n" +
    "    'que le cours est vraiment acquis.</p>',",
    "'  <p>Les ' + course.chapters.length + ' chapitres proposent chacun trois études de cas méthodiques. ' +\n" +
    "    'Une fois les règles maîtrisées, elles constituent le socle indispensable pour réussir vos examens.</p>',"
  );

  content = content.replace(
    "title: 'Atelier de calcul — écrire du Python | ' + course.brand,",
    "title: 'Atelier de calcul matriciel | ' + course.brand,"
  );

  content = content.replace(
    "description: 'Atelier de calcul du cours d’algèbre linéaire B1 : éditeur dans le navigateur, exécution ' +\n" +
    "        'réelle du programme Python, entrée standard, console de sortie et tuteur qui explique les erreurs.',",
    "description: 'Atelier de calcul matriciel du cours d’algèbre linéaire B1 : grilles interactives, résolution pas à pas et validation méthodologique des calculs.',"
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[OK] b1-algebre/pages.js mis à jour.');
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. server/content/b1-stats/pages.js
// ─────────────────────────────────────────────────────────────────────────────
{
  const filePath = path.join(__dirname, '..', 'server', 'content', 'b1-stats', 'pages.js');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace method box in index
  const oldMethod = [
    "box('method', 'Comment ce cours s’articule', 'compass', [",
    "      '    <p>Chaque chapitre part d’un jeu de données concret, pose le vocabulaire, montre un calcul ' +",
    "      'détaillé ligne à ligne, puis se termine par <strong>trois exercices de code en Python</strong> : ' +",
    "      'tu écris vraiment un programme qui résume une série (effectifs, moyenne, médiane, variance, ' +",
    "      'coefficient de corrélation), il est réellement exécuté puis corrigé par des tests que tu ne vois pas.</p>',",
    "      '    <p>Python sert ici de <em>calculatrice vérifiable</em> : les formules restent celles du support, ' +",
    "      'en notation statistique. Chaque énoncé précise si la variance se divise par N ou par N − 1.</p>'",
    "    ].join('\\n'))"
  ].join('\n');

  const newMethod = [
    "box('method', 'Comment ce cours s’articule', 'compass', [",
    "      '    <p>Chaque chapitre part d’une série statistique concrète, pose le vocabulaire précis (individus, caractères, ' +",
    "      'modalités), détaille chaque formule mathématique étape par étape, puis se termine par <strong>trois études de cas graduées</strong> : ' +",
    "      'vous calculez et interprétez les indicateurs clés (effectifs cumulés, médiane, quartiles, variance, écart-type, ' +",
    "      'coefficient de corrélation, droite des moindres carrés) directement sur des grilles d’analyse vérifiables.</p>',",
    "      '    <p>L’accent est mis sur <strong>l’interprétation décisionnelle et la rigueur de calcul</strong> : ' +",
    "      'savoir lire un tableau, repérer les anomalies et quantifier la dispersion sans se tromper dans les effectifs.</p>'",
    "    ].join('\\n'))"
  ].join('\n');

  content = content.replace(oldMethod, newMethod);

  // Replace Python mentions in sommaire
  const oldSommaireText = "  <p>Chaque chapitre se termine par <strong>trois exercices en Python</strong> à écrire et à exécuter ' +\n" +
    "    'dans la page : ton programme est réellement lancé, puis corrigé par des tests que tu ne vois pas. ' +\n" +
    "    'L’<a href=\"atelier.html\">atelier de calcul</a> permet de manipuler librement.</p>";

  const newSommaireText = "  <p>Chaque chapitre se termine par <strong>trois applications d’analyse statistique</strong> à résoudre ' +\n" +
    "    'directement dans la page : vos résultats sont vérifiés critère par critère. ' +\n" +
    "    'L’<a href=\"atelier.html\">atelier de calcul</a> permet d’expérimenter librement sur vos propres séries.</p>";

  content = content.replace(oldSommaireText, newSommaireText);

  content = content.replace(
    '<span class="toc__d">Écrire et exécuter du Python directement dans la page.</span>',
    '<span class="toc__d">Résumer et analyser une série statistique dans la page.</span>'
  );

  content = content.replace(
    /exercices Python exécutables/g,
    'études de cas et exercices pratiques'
  );

  // Replace atelier lead
  const oldAtelierLead = "'  <p class=\"lead\">Un éditeur dans la page, un vrai interpréteur Python derrière. Donne une série de ' +\n" +
    "    'nombres sur l’entrée standard, écris la formule ou appelle la fonction, exécute et lis le résultat. ' +\n" +
    "    'C’est ici qu’une moyenne ou un écart-type devient un réflexe.</p>'";

  const newAtelierLead = "'  <p class=\"lead\">Un atelier interactif pour poser vos séries statistiques, calculer les fréquences, ' +\n" +
    "    'les paramètres de position et de dispersion, et valider vos calculs pas à pas.</p>'";

  content = content.replace(oldAtelierLead, newAtelierLead);

  // Replace atelier objectifs
  const oldAtelierObj = [
    "box('objectifs', 'Comment fonctionne l’atelier', 'target', [",
    "      '    <ul>',
    "      '      <li><strong>Exécuter</strong> fait tourner votre code Python tel quel et affiche sa sortie, ses erreurs et son code de sortie.</li>',",
    "      '      <li><strong>Entrée du programme</strong> contient la série, une valeur par ligne ou séparée par des espaces.</li>',",
    "      '      <li><strong>Expliquer mon erreur</strong> demande au tuteur, quand il y a une erreur, pourquoi elle survient et par où chercher. Il explique en mots : il n’écrit jamais de code à votre place.</li>',",
    "      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> exécute le script sans quitter l’éditeur.</li>',",
    "      '      <li>Votre code est conservé dans ce navigateur, par exercice et par cours.</li>',",
    "      '    </ul>'",
    "    ].join('\\n'))"
  ].join('\n');

  const newAtelierObj = [
    "box('objectifs', 'Comment utiliser l’atelier d’analyse statistique', 'target', [",
    "      '    <ul>',
    "      '      <li><strong>Vérifier</strong> valide votre grille statistique et confronte vos calculs aux valeurs exactes.</li>',
    "      '      <li><strong>Grille statistique</strong> structure vos résultats : effectif total N, moyenne, médiane, étendue, variance et écart-type.</li>',
    "      '      <li><strong>Expliquer mon erreur</strong> explicite les pièges fréquents (division par N vs N-1, cumul croissant vs décroissant).</li>',
    "      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> lance l’évaluation instantanée.</li>',
    "      '      <li>Vos données restent enregistrées localement dans votre navigateur.</li>',
    "      '    </ul>'",
    "    ].join('\\n'))"
  ].join('\n');

  content = content.replace(oldAtelierObj, newAtelierObj);

  // Replace lab starter in atelier
  const oldLabStarter = [
    "      '     data-language=\"python\"',",
    "      '     data-height=\"360\"',",
    "      '     data-languages=\"1\"',",
    "      '     data-stdin=\"2&#10;4&#10;4&#10;6\">',",
    "      '  <script type=\"text/plain\" data-lab-starter># Zone libre : calculez, cassez, recommencez.',",
    "      '# Rien de ce que vous écrirez ici n’est noté.',",
    "      '#',",
    "      '# Exemple proposé : moyenne et variance d’une série lue sur l’entrée standard.',",
    "      '# Le script lit un nombre par ligne jusqu’à la fin, puis affiche :',",
    "      '# moyenne : X.XX',",
    "      '# variance : Y.YY',",
    "      '',",
    "      'import sys',",
    "      '',",
    "      'serie = [float(x) for x in sys.stdin.read().split() if x]',",
    "      'if not serie:',",
    "      '    print(\"Série vide\")',",
    "      '    sys.exit(0)',",
    "      '',",
    "      'n = len(serie)',",
    "      'moyenne = sum(serie) / n',",
    "      'variance = sum((x - moyenne) ** 2 for x in serie) / n',",
    "      '',",
    "      'print(f\"moyenne : {moyenne:.2f}\")',",
    "      'print(f\"variance : {variance:.2f}\")',",
    "      '</script>'"
  ].join('\n');

  const newLabStarter = [
    "      '     data-language=\"analyse\"',",
    "      '     data-height=\"360\"',",
    "      '     data-languages=\"1\">',",
    "      '  <script type=\"text/plain\" data-lab-starter># Grille d\\'analyse statistique libre',",
    "      '# Saisissez les caractéristiques résumées de votre série :',",
    "      '',",
    "      '[Série observée]',",
    "      '# Valeurs x_i : 2, 4, 6',",
    "      '# Effectifs n_i: 1, 2, 1',",
    "      '# Effectif total N = 4',",
    "      '',",
    "      '[Paramètres de position]',",
    "      '# Moyenne pondérée x_bar = (2*1 + 4*2 + 6*1) / 4 = 16 / 4 :',",
    "      'moyenne : 4.00',",
    "      '',",
    "      '# Médiane (50 % des effectifs) :',",
    "      'mediane : 4.00',",
    "      '',",
    "      '[Paramètres de dispersion]',",
    "      '# Étendue = x_max - x_min = 6 - 2 :',",
    "      'étendue : 4.00',",
    "      '',",
    "      '# Variance V = (1/4)*(1*(2-4)^2 + 2*(4-4)^2 + 1*(6-4)^2) = (4 + 0 + 4)/4 = 2.00 :',",
    "      'variance : 2.00',",
    "      '',",
    "      '# Écart-type sigma = sqrt(2) :',",
    "      'écart-type : 1.41',",
    "      '</script>'"
  ].join('\n');

  content = content.replace(oldLabStarter, newLabStarter);

  content = content.replace(
    "'      <span class=\"lab__lang\">' + ic('terminal') + ' Python</span>',",
    "'      <span class=\"lab__lang\">' + ic('chart') + ' Statistique descriptive</span>',"
  );

  content = content.replace(
    '<h3 class="lab__title">Zone libre — moyenne et variance d’une série</h3>',
    '<h3 class="lab__title">Grille libre — moyenne et variance d’une série</h3>'
  );

  const oldStatsBrief = [
    "      '<p>Le script proposé calcule les indicateurs usuels d’une série lue sur l’entrée standard. ' +",
    "      'Colle tes données, change la formule, ou écris le calcul d’une médiane, de quartiles ou d’un écart-type.</p>',",
    "      '<p>Une erreur n’est pas un échec : c’est le message que Python te laisse pour comprendre ce qu’il attendait.</p>'"
  ].join('\n');

  const newStatsBrief = [
    "      '<p>La grille ci-dessus synthétise les indicateurs fondamentaux d’une série statistique discrète. ' +",
    "      'Modifiez les effectifs ou complétez avec d’autres séries pour tester vos calculs de quartiles et d’écart-type.</p>',",
    "      '<p>L’analyse rigoureuse des paramètres de position et de dispersion garantit une lecture fidèle des données.</p>'"
  ].join('\n');

  content = content.replace(oldStatsBrief, newStatsBrief);

  content = content.replace(
    "'  <p>Les ' + course.chapters.length + ' chapitres contiennent chacun trois exercices Python corrigés ' +\n" +
    "    'automatiquement dans la page. Une fois l’atelier apprivoisé, ils sont la meilleure façon de vérifier ' +\n" +
    "    'que le cours est vraiment acquis.</p>',",
    "'  <p>Les ' + course.chapters.length + ' chapitres proposent chacun trois études de cas complètes. ' +\n" +
    "    'Une fois les formules automatisées, vous disposerez de toutes les clés pour réussir vos partiels.</p>',"
  );

  content = content.replace(
    "title: 'Atelier de calcul — écrire du Python | ' + course.brand,",
    "title: 'Atelier de calcul statistique | ' + course.brand,"
  );

  content = content.replace(
    "description: 'Atelier de calcul du cours de statistique descriptive B1 : éditeur dans le navigateur, ' +\n" +
    "        'exécution réelle du programme Python, entrée standard, console de sortie et tuteur qui explique les erreurs.',",
    "description: 'Atelier de statistique descriptive B1 : grilles interactives, indicateurs de position et de dispersion pas à pas et validation méthodologique.',"
  );

  content = content.replace(
    'produit un véritable rapport d’analyse. Les programmes sont en Python, comme aux ateliers.',
    'produit un véritable rapport d’analyse avec grilles méthodologiques détaillées.'
  );

  content = content.replace(
    'calculs gradués et rapport d’analyse d’une série en Python.',
    'calculs gradués et rapport d’analyse d’une série statistique.'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[OK] b1-stats/pages.js mis à jour.');
}

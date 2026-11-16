/**
 * Catalogue des 18 exercices — Programmation VBA sous Excel B1 (vba-c1-e1 .. vba-c6-e3).
 *
 * Construit d'après le support officiel « Programmation VBA » (Dr TCHAZINO Tchamiè,
 * 47 pages, support1.pdf). Chaque chapitre propose 3 études de cas graduées (n1, n2, n3)
 * avec exampleTitle, 3 indices progressifs (dont Étapes :), réponses tolérantes (||)
 * et corrigé détaillé (takeaway).
 */
'use strict';

module.exports = [
  /* ==================== Chapitre 1 — Introduction à VBA, Enregistreur & VBE ==================== */
  {
    id: 'vba-c1-e1',
    chapter: 1,
    level: 'n1',
    language: 'analyse',
    title: 'Paramétrer l’enregistreur de macros au cabinet Kossi Audit',
    exampleTitle: 'Exemple résolu — la macro d’en-tête du service paie',
    goal: 'Choisir le bon format de fichier, l’emplacement d’enregistrement (Ce classeur vs PERSO.XLS) et un nom de macro valide.',
    brief:
      '<p><strong>Énoncé.</strong> Afi débute son stage au cabinet comptable <strong>Kossi Audit</strong> à Lomé. ' +
      'Son tuteur lui demande d’automatiser la mise en forme des balances mensuelles à l’aide de l’enregistreur de ' +
      'macros d’Excel, en respectant les règles du chapitre 1 (support du Dr TCHAZINO Tchamiè) :</p>' +
      '<table>' +
      '  <tr><th>Besoin du cabinet</th><th>Règle VBA / Excel à appliquer</th></tr>' +
      '  <tr><td>Afficher les outils de macros dans le ruban Excel</td><td>Activer l’onglet dédié du ruban</td></tr>' +
      '  <tr><td>Conserver le code VBA à la sauvegarde du fichier</td><td>Enregistrer au format prenant en charge les macros (et non <code>.xlsx</code>)</td></tr>' +
      '  <tr><td>Rendre une macro utilisable dans tous les classeurs du poste</td><td>Enregistrer dans le classeur de macros personnelles caché</td></tr>' +
      '  <tr><td>Nommer la macro d’export sans erreur de syntaxe</td><td>Commencer par une lettre, sans espace ni tiret (utiliser <code>_</code>)</td></tr>' +
      '  <tr><td>Arrêter la capture des gestes une fois le formatage fini</td><td>Cliquer sur Arrêter l’enregistrement</td></tr>' +
      '</table>' +
      '<ol>' +
      '  <li>Quel onglet du ruban Excel Afi doit-elle activer pour accéder à l’enregistreur de macros et à Visual Basic ? (un mot)</li>' +
      '  <li>Quelle extension de fichier moderne (4 lettres commençant par un point ou sans point) doit-elle choisir pour ne pas perdre ses macros à la fermeture ?</li>' +
      '  <li>Quel est le nom du classeur caché de macros personnelles (en version française classique du support) qui rend une macro disponible dans tous les classeurs ?</li>' +
      '  <li>Entre <code>Export Balance</code>, <code>1_Export</code> et <code>Export_Balance</code>, quel est l’unique nom de macro valide ?</li>' +
      '  <li>Si Afi enregistre sa macro dans « Ce classeur », sera-t-elle disponible quand ce classeur est fermé ? (oui ou non)</li>' +
      '</ol>',
    starter:
      '# Exercice — Paramétrer l\'enregistreur de macros au cabinet Kossi Audit\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Onglet du ruban à activer]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Extension de classeur prenant en charge les macros]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Classeur de macros personnelles]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Nom de macro valide]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Macro de « Ce classeur » disponible une fois fermé ?]\n' +
      'A_COMPLETER\n',
    hints: [
      'L’onglet qui regroupe Visual Basic, Macros et Enregistrer une macro porte le nom du métier qui écrit du code.',
      'Le format standard .xlsx supprime le code VBA : remplacez le x final par la lettre m (comme Macro) ; pour les macros personnelles, le support cite PERSO.XLS (ou PERSONAL.XLSB).',
      'Étapes : identifier l’onglet Développeur ; retenir l’extension .xlsm ; citer PERSO.XLS pour les macros globales ; choisir Export_Balance (sans espace ni chiffre initial) ; répondre non pour un classeur fermé.'
    ],
    examples: [
      {
        stdin:
          'Le service paie crée une macro de mise en page :\n' +
          '1) Onglet activé : Développeur.\n' +
          '2) Nom proposé : Mise_En_Page_Paie (valide, sans espace).\n' +
          '3) Emplacement : PERSO.XLS pour l\'utiliser sur les 12 fichiers mensuels.',
        expected: 'Développeur — Mise_En_Page_Paie — PERSO.XLS',
        note: 'Un nom de macro ne contient jamais d’espace et PERSO.XLS rend la macro accessible dans tous les classeurs.'
      }
    ],
    tests: [
      { label: 'Question 1 — Onglet du ruban à activer', stdin: 'q:1', expected: 'développeur||developpeur||onglet développeur||onglet developpeur' },
      { label: 'Question 2 — Extension prenant en charge les macros', stdin: 'q:2', expected: '.xlsm||xlsm||.xls||xls' },
      { label: 'Question 3 — Classeur de macros personnelles', stdin: 'q:3', expected: 'perso.xls||personal.xlsb||perso||classeur de macros personnelles' },
      { label: 'Question 4 — Nom de macro valide', stdin: 'q:4', expected: 'export_balance' },
      { label: 'Question 5 — Disponible une fois fermé ?', stdin: 'q:5', expected: 'non' }
    ],
    solution:
      '[Question 1 — Onglet du ruban à activer]\n' +
      'Développeur\n\n' +
      '[Question 2 — Extension de classeur prenant en charge les macros]\n' +
      '.xlsm\n\n' +
      '[Question 3 — Classeur de macros personnelles]\n' +
      'PERSO.XLS\n\n' +
      '[Question 4 — Nom de macro valide]\n' +
      'Export_Balance\n\n' +
      '[Question 5 — Macro de « Ce classeur » disponible une fois fermé ?]\n' +
      'non',
    takeaway:
      '1) L’onglet Développeur donne accès à l’enregistreur de macros, à la sécurité des macros et à l’éditeur VBE.\n' +
      '2) Un classeur contenant des macros doit être enregistré en .xlsm (ou .xls ancien format) : le format .xlsx supprime le code VBA.\n' +
      '3) Le classeur de macros personnelles PERSO.XLS (ou PERSONAL.XLSB) est chargé automatiquement en arrière-plan au démarrage d’Excel.\n' +
      '4) Export_Balance est seul valide : Export Balance contient un espace interdit et 1_Export commence par un chiffre.\n' +
      '5) Non : une macro enregistrée dans « Ce classeur » n’est utilisable que lorsque ce classeur est ouvert.'
  },
  {
    id: 'vba-c1-e2',
    chapter: 1,
    level: 'n2',
    language: 'analyse',
    title: 'Références absolues vs relatives et navigation dans VBE',
    exampleTitle: 'Exemple résolu — déboguer une macro d’enregistrement au clavier',
    goal: 'Distinguer le code généré en références absolues et relatives et associer chaque tâche VBE à son raccourci clavier.',
    brief:
      '<p><strong>Énoncé.</strong> Yao a enregistré deux macros sous Excel, puis souhaite les inspecter dans ' +
      'l’éditeur Visual Basic (VBE). Dans la première macro, le bouton « Utiliser les références relatives » était ' +
      'désactivé (mode par défaut) et Yao a cliqué sur <code>B2</code>. Dans la seconde, ce bouton était activé ' +
      'et Yao est descendu de 3 lignes et allé 2 colonnes à droite à partir de la cellule active.</p>' +
      '<ol>' +
      '  <li>Quel raccourci clavier Yao utilise-t-il pour ouvrir l’éditeur VBE depuis Excel ?</li>' +
      '  <li>Par défaut (bouton « Utiliser les références relatives » non enfoncé), l’enregistreur travaille-t-il en références <code>absolues</code> ou <code>relatives</code> ?</li>' +
      '  <li>En références relatives, quelle propriété de <code>ActiveCell</code> traduit le décalage de lignes et de colonnes (ex. <code>ActiveCell.______(3, 2)</code>) ?</li>' +
      '  <li>Dans VBE, quelle touche de fonction lance l’exécution <strong>pas à pas détaillé</strong> (ligne par ligne) ?</li>' +
      '  <li>Dans VBE, quelle touche de fonction exécute la macro entière d’un seul trait ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Références absolues vs relatives et navigation dans VBE\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Raccourci d\'ouverture de VBE]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Mode par défaut de l\'enregistreur (absolues ou relatives)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Propriété de décalage relatif sur ActiveCell]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Touche du mode pas à pas détaillé]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Touche d\'exécution complète immédiate]\n' +
      'A_COMPLETER\n',
    hints: [
      'Pour basculer d’Excel vers VBE, combinez la touche Alt avec l’une des dernières touches de fonction du clavier.',
      'Par défaut, cliquer sur B2 écrit Range("B2").Select : c’est une position fixe ; le mode relatif utilise un mot anglais signifiant « décalage ».',
      'Étapes : noter Alt+F11 pour ouvrir VBE ; répondre absolues pour le mode par défaut ; écrire Offset pour ActiveCell.Offset(3, 2) ; retenir F8 pour le pas à pas et F5 pour l’exécution continue.'
    ],
    examples: [
      {
        stdin:
          'Inspection d\'un module dans VBE :\n' +
          '- Ouvrir l\'Explorateur de projets : Ctrl+R\n' +
          '- Ouvrir la fenêtre Propriétés : F4\n' +
          '- Exécuter pas à pas : F8',
        expected: 'Ctrl+R — F4 — F8',
        note: 'F8 surligne en jaune chaque ligne exécutée : c’est l’outil roi pour comprendre ce que fait une macro enregistrée.'
      }
    ],
    tests: [
      { label: 'Question 1 — Raccourci d\'ouverture de VBE', stdin: 'q:1', expected: 'alt+f11||alt + f11||alt f11' },
      { label: 'Question 2 — Mode par défaut de l\'enregistreur', stdin: 'q:2', expected: 'absolues||absolue||références absolues||references absolues' },
      { label: 'Question 3 — Propriété de décalage relatif', stdin: 'q:3', expected: 'offset||.offset||activecell.offset' },
      { label: 'Question 4 — Touche du mode pas à pas détaillé', stdin: 'q:4', expected: 'f8||touche f8' },
      { label: 'Question 5 — Touche d\'exécution complète immédiate', stdin: 'q:5', expected: 'f5||touche f5' }
    ],
    solution:
      '[Question 1 — Raccourci d\'ouverture de VBE]\n' +
      'Alt+F11\n\n' +
      '[Question 2 — Mode par défaut de l\'enregistreur (absolues ou relatives)]\n' +
      'absolues\n\n' +
      '[Question 3 — Propriété de décalage relatif sur ActiveCell]\n' +
      'Offset\n\n' +
      '[Question 4 — Touche du mode pas à pas détaillé]\n' +
      'F8\n\n' +
      '[Question 5 — Touche d\'exécution complète immédiate]\n' +
      'F5',
    takeaway:
      '1) Alt+F11 ouvre l’éditeur Visual Basic (VBE) et permet de revenir à Excel.\n' +
      '2) Par défaut, l’enregistreur travaille en références absolues (Range("B2").Select).\n' +
      '3) En références relatives, l’enregistreur utilise ActiveCell.Offset(lignes, colonnes).\n' +
      '4) La touche F8 exécute la macro pas à pas (ligne par ligne) en surlignant l’instruction active en jaune.\n' +
      '5) La touche F5 lance l’exécution complète de la procédure Sub.'
  },
  {
    id: 'vba-c1-e3',
    chapter: 1,
    level: 'n3',
    language: 'analyse',
    title: 'Lire et nettoyer le code d’une première procédure Sub',
    exampleTitle: 'Exemple résolu — la macro ChangerStyleReference du support',
    goal: 'Identifier les mots-clés de structure, la couleur syntaxique dans VBE et l’appel entre procédures avec Call.',
    brief:
      '<p><strong>Énoncé.</strong> En ouvrant le dossier <code>Modules → Module1</code> dans l’Explorateur de projets ' +
      '(<code>Ctrl+R</code>), vous trouvez la macro suivante enregistrée lors du TP n°1 du support :</p>' +
      '<pre><code>Sub ChangerStyleReference()\n' +
      '\' Macro enregistrée par Dr TCHAZINO Tchamiè\n' +
      '    Application.ReferenceStyle = xlR1C1\n' +
      '    Call MessageConfirmation\n' +
      'End Sub</code></pre>' +
      '<ol>' +
      '  <li>Dans quel dossier de l’Explorateur de projets VBE l’enregistreur place-t-il automatiquement <code>Module1</code> ? (un mot)</li>' +
      '  <li>Par quel mot-clé commence toujours une procédure de macro standard ?</li>' +
      '  <li>Par quels deux mots se termine obligatoirement cette procédure ?</li>' +
      '  <li>En quelle couleur l’éditeur VBE affiche-t-il la ligne commençant par une apostrophe <code>\' Macro enregistrée...</code> ?</li>' +
      '  <li>Quel mot-clé de la ligne 4 permet d’appeler et d’exécuter la seconde procédure <code>MessageConfirmation</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Lire et nettoyer le code d\'une première procédure Sub\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Dossier contenant Module1 dans l\'Explorateur de projets]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Mot-clé d\'ouverture de la procédure]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Mots-clés de fermeture de la procédure]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Couleur d\'affichage des commentaires dans VBE]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Mot-clé d\'appel d\'une autre procédure]\n' +
      'A_COMPLETER\n',
    hints: [
      'Regardez l’arborescence de VBAProject : les feuilles vivent dans Microsoft Excel Objects et les modules standards dans un dossier homonyme.',
      'Les commentaires précédés d’une apostrophe sont colorés comme l’herbe dans VBE, tandis que les mots-clés de structure sont en bleu.',
      'Étapes : noter le dossier Modules ; relever Sub en première ligne et End Sub en dernière ligne ; indiquer la couleur verte (vert) pour le commentaire ; relever le mot-clé Call.'
    ],
    examples: [
      {
        stdin:
          'Analyse d\'une ligne en erreur dans VBE :\n' +
          '- Mot-clé Sub / End Sub : affiché en bleu\n' +
          '- Commentaire \' Note : affiché en vert\n' +
          '- Ligne avec faute de syntaxe : affichée en rouge',
        expected: 'bleu — vert — rouge',
        note: 'La coloration syntaxique de VBE permet de repérer immédiatement un commentaire (vert) ou une erreur de syntaxe (rouge).'
      }
    ],
    tests: [
      { label: 'Question 1 — Dossier contenant Module1', stdin: 'q:1', expected: 'modules||dossier modules' },
      { label: 'Question 2 — Mot-clé d\'ouverture', stdin: 'q:2', expected: 'sub' },
      { label: 'Question 3 — Mots-clés de fermeture', stdin: 'q:3', expected: 'end sub' },
      { label: 'Question 4 — Couleur des commentaires', stdin: 'q:4', expected: 'vert||verte||en vert' },
      { label: 'Question 5 — Mot-clé d\'appel', stdin: 'q:5', expected: 'call' }
    ],
    solution:
      '[Question 1 — Dossier contenant Module1 dans l\'Explorateur de projets]\n' +
      'Modules\n\n' +
      '[Question 2 — Mot-clé d\'ouverture de la procédure]\n' +
      'Sub\n\n' +
      '[Question 3 — Mots-clés de fermeture de la procédure]\n' +
      'End Sub\n\n' +
      '[Question 4 — Couleur d\'affichage des commentaires dans VBE]\n' +
      'vert\n\n' +
      '[Question 5 — Mot-clé d\'appel d\'une autre procédure]\n' +
      'Call',
    takeaway:
      '1) Les macros enregistrées sont stockées dans le dossier Modules (Module1, Module2…).\n' +
      '2) Toute procédure de macro s’ouvre par le mot-clé Sub suivi de son nom et de parenthèses.\n' +
      '3) Elle se referme obligatoirement par End Sub.\n' +
      '4) Toute ligne commençant par une apostrophe (\') est un commentaire affiché en vert par VBE.\n' +
      '5) L’instruction Call permet d’enchaîner l’exécution d’une autre procédure Sub.'
  },

  /* ==================== Chapitre 2 — Le Modèle Objet Excel ==================== */
  {
    id: 'vba-c2-e1',
    chapter: 2,
    level: 'n1',
    language: 'analyse',
    title: 'Remonter la hiérarchie du Modèle Objet chez Togo Fret',
    exampleTitle: 'Exemple résolu — qualifier complètement une cellule de tarif',
    goal: 'Identifier la classe ou la collection correspondant à chaque niveau du Modèle Objet Excel et distinguer ThisWorkbook de ActiveWorkbook.',
    brief:
      '<p><strong>Énoncé.</strong> Kodjo écrit une macro de consolidation pour la société logistique <strong>Togo Fret</strong>. ' +
      'Sa macro réside dans le fichier <code>Consolidation.xlsm</code> et lit des données dans le fichier ' +
      '<code>Navires_Mai.xlsx</code> qui vient d’être ouvert au premier plan. Pour éviter toute confusion, ' +
      'il écrit la référence complète suivante :</p>' +
      '<pre><code>Application.Workbooks("Navires_Mai.xlsx").Worksheets("Quai_1").Range("D12")</code></pre>' +
      '<ol>' +
      '  <li>Quel objet place-t-on tout au sommet (à la racine) de la hiérarchie pour désigner le logiciel Excel lui-même ?</li>' +
      '  <li>Quelle collection (au pluriel) regroupe l’ensemble des classeurs actuellement ouverts ?</li>' +
      '  <li>Quelle collection (au pluriel) regroupe uniquement les feuilles de calcul d’un classeur (sans les feuilles graphiques) ?</li>' +
      '  <li>Pendant que <code>Navires_Mai.xlsx</code> est affiché au premier plan, quel objet spécial désigne malgré tout le classeur <code>Consolidation.xlsm</code> qui contient le code VBA ?</li>' +
      '  <li>Si Kodjo écrit simplement <code>Range("D12")</code> sans préciser de feuille, quelle feuille Excel cible-t-il implicitement (nom de l’objet VBA) ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Remonter la hiérarchie du Modèle Objet chez Togo Fret\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Objet racine représentant Excel]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Collection des classeurs ouverts]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Collection des feuilles de calcul]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Objet désignant le classeur porteur de la macro]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Objet désignant la feuille active par défaut]\n' +
      'A_COMPLETER\n',
    hints: [
      'Les trois premiers niveaux apparaissent dans l’ordre exact de la ligne de code : Application.Workbooks(...).Worksheets(...).',
      'Pour distinguer le classeur porteur du code de celui qui est au premier plan, opposez This (celui-ci, où vit le code) à Active (celui qui est actif à l’écran).',
      'Étapes : extraire Application (racine), Workbooks (classeurs) et Worksheets (feuilles de calcul) ; utiliser ThisWorkbook pour le classeur contenant la macro ; utiliser ActiveSheet pour la feuille active implicite.'
    ],
    examples: [
      {
        stdin:
          'Deux fichiers sont ouverts : Macro_Paie.xlsm (contient le code) et Employes.xlsx (au premier plan).\n' +
          '- ThisWorkbook.Name -> Macro_Paie.xlsm\n' +
          '- ActiveWorkbook.Name -> Employes.xlsx',
        expected: 'ThisWorkbook = Macro_Paie.xlsm — ActiveWorkbook = Employes.xlsx',
        note: 'ThisWorkbook ne change jamais au cours de l’exécution, même lorsqu’on ouvre d’autres classeurs.'
      }
    ],
    tests: [
      { label: 'Question 1 — Objet racine représentant Excel', stdin: 'q:1', expected: 'application||objet application' },
      { label: 'Question 2 — Collection des classeurs ouverts', stdin: 'q:2', expected: 'workbooks||collection workbooks' },
      { label: 'Question 3 — Collection des feuilles de calcul', stdin: 'q:3', expected: 'worksheets||collection worksheets' },
      { label: 'Question 4 — Classeur porteur de la macro', stdin: 'q:4', expected: 'thisworkbook' },
      { label: 'Question 5 — Feuille active par défaut', stdin: 'q:5', expected: 'activesheet' }
    ],
    solution:
      '[Question 1 — Objet racine représentant Excel]\n' +
      'Application\n\n' +
      '[Question 2 — Collection des classeurs ouverts]\n' +
      'Workbooks\n\n' +
      '[Question 3 — Collection des feuilles de calcul]\n' +
      'Worksheets\n\n' +
      '[Question 4 — Objet désignant le classeur porteur de la macro]\n' +
      'ThisWorkbook\n\n' +
      '[Question 5 — Objet désignant la feuille active par défaut]\n' +
      'ActiveSheet',
    takeaway:
      '1) Application est l’objet racine représentant le programme Excel.\n' +
      '2) Workbooks est la collection de tous les classeurs ouverts.\n' +
      '3) Worksheets est la collection des feuilles de calcul du classeur (tandis que Sheets inclut aussi les graphiques Charts).\n' +
      '4) ThisWorkbook pointe toujours vers le classeur qui héberge la macro exécutée.\n' +
      '5) Sans qualification de feuille, Range("D12") cible implicitement ActiveSheet.'
  },
  {
    id: 'vba-c2-e2',
    chapter: 2,
    level: 'n2',
    language: 'analyse',
    title: 'Conversion entre Range("A1") et Cells(ligne, colonne)',
    exampleTitle: 'Exemple résolu — la grille d’inventaire de la pharmacie',
    goal: 'Convertir sans erreur des coordonnées Cells(ligne, colonne) en références A1 et compter les cellules d’une plage.',
    brief:
      '<p><strong>Énoncé.</strong> Dans la feuille de stock d’une pharmacie, les colonnes sont numérotées ' +
      '(A = 1, B = 2, C = 3, D = 4, E = 5, F = 6). Une macro parcourt le tableau en utilisant tantôt ' +
      '<code>Range</code>, tantôt <code>Cells(ligne, colonne)</code>. Rappel du cours : dans <code>Cells(ligne, colonne)</code>, ' +
      'le premier nombre est <strong>toujours la ligne</strong> et le second <strong>la colonne</strong>.</p>' +
      '<ol>' +
      '  <li>Quelle cellule en notation A1 (ex. <code>B2</code>) est désignée par <code>Cells(7, 2)</code> ?</li>' +
      '  <li>Quelle cellule en notation A1 est désignée par <code>Cells(2, 5)</code> ?</li>' +
      '  <li>Pour cibler la cellule <code>D9</code> avec <code>Cells(ligne, colonne)</code>, quel est le premier argument (le numéro de ligne) ?</li>' +
      '  <li>Et quel est le second argument (le numéro de colonne) pour cibler <code>D9</code> ?</li>' +
      '  <li>Combien de cellules contient la plage rectangulaire <code>Range("A1:C4")</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Conversion entre Range("A1") et Cells(ligne, colonne)\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Cellule désignée par Cells(7, 2)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Cellule désignée par Cells(2, 5)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Premier argument (ligne) de Cells pour D9]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Second argument (colonne) de Cells pour D9]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Nombre de cellules dans Range("A1:C4")]\n' +
      'A_COMPLETER\n',
    hints: [
      'Ne vous laissez pas piéger par l’ordre de lecture A1 : dans Cells(lig, col), le premier chiffre donne la ligne horizontale, le second la lettre de colonne (1=A, 2=B, 3=C, 4=D, 5=E).',
      'Pour D9, la ligne est 9 et la colonne D est la 4e lettre de l’alphabet.',
      'Étapes : traduire Cells(7, 2) en B7 ; traduire Cells(2, 5) en E2 ; décomposer D9 en ligne 9 et colonne 4 ; multiplier 3 colonnes (A..C) par 4 lignes (1..4) = 12 cellules.'
    ],
    examples: [
      {
        stdin:
          'Grille de stock :\n' +
          '- Cells(3, 1) -> ligne 3, colonne 1 (A) -> A3\n' +
          '- Cells(1, 3) -> ligne 1, colonne 3 (C) -> C1\n' +
          '- Range("A1:B3").Count -> 2 colonnes x 3 lignes = 6 cellules',
        expected: 'A3 — C1 — 6',
        note: 'Inverser Cells(3, 1) et Cells(1, 3) transpose la ligne et la colonne.'
      }
    ],
    tests: [
      { label: 'Question 1 — Cellule Cells(7, 2)', stdin: 'q:1', expected: 'b7||cellule b7' },
      { label: 'Question 2 — Cellule Cells(2, 5)', stdin: 'q:2', expected: 'e2||cellule e2' },
      { label: 'Question 3 — Premier argument pour D9', stdin: 'q:3', expected: '9' },
      { label: 'Question 4 — Second argument pour D9', stdin: 'q:4', expected: '4' },
      { label: 'Question 5 — Nombre de cellules dans Range("A1:C4")', stdin: 'q:5', expected: '12' }
    ],
    solution:
      '[Question 1 — Cellule désignée par Cells(7, 2)]\n' +
      'B7\n\n' +
      '[Question 2 — Cellule désignée par Cells(2, 5)]\n' +
      'E2\n\n' +
      '[Question 3 — Premier argument (ligne) de Cells pour D9]\n' +
      '9\n\n' +
      '[Question 4 — Second argument (colonne) de Cells pour D9]\n' +
      '4\n\n' +
      '[Question 5 — Nombre de cellules dans Range("A1:C4")]\n' +
      '12',
    takeaway:
      '1) Cells(7, 2) désigne la ligne 7 et la colonne 2 (B), soit B7.\n' +
      '2) Cells(2, 5) désigne la ligne 2 et la colonne 5 (E), soit E2.\n' +
      '3) Pour cibler D9, le numéro de ligne (premier argument) est 9.\n' +
      '4) Le numéro de colonne (second argument) pour la colonne D est 4 (Cells(9, 4)).\n' +
      '5) Range("A1:C4") couvre 3 colonnes (A, B, C) sur 4 lignes (1 à 4), soit 3 × 4 = 12 cellules.'
  },
  {
    id: 'vba-c2-e3',
    chapter: 2,
    level: 'n3',
    language: 'analyse',
    title: 'Déplacements relatifs avec Offset(lignes, colonnes)',
    exampleTitle: 'Exemple résolu — naviguer autour d’une cellule pivot',
    goal: 'Calculer la cellule cible d’une chaîne d’instructions Offset à partir d’une cellule de départ.',
    brief:
      '<p><strong>Énoncé.</strong> Dans une feuille de paie, la cellule active (<code>ActiveCell</code>) est ' +
      'initialement positionnée sur <strong><code>C5</code></strong> (ligne 5, colonne 3). Rappel du cours : ' +
      '<code>Offset(dLig, dCol)</code> décale de <code>dLig</code> lignes (positif vers le bas, négatif vers le haut) ' +
      'et de <code>dCol</code> colonnes (positif vers la droite, négatif vers la gauche).</p>' +
      '<ol>' +
      '  <li>Partant de <code>C5</code>, quelle cellule (en notation A1) est désignée par <code>ActiveCell.Offset(2, 1)</code> ?</li>' +
      '  <li>Partant de <code>C5</code>, quelle cellule est désignée par <code>ActiveCell.Offset(-3, -2)</code> ?</li>' +
      '  <li>Partant de <code>C5</code>, quelle cellule est désignée par <code>ActiveCell.Offset(0, 3)</code> ?</li>' +
      '  <li>Partant de <code>C5</code>, quelle cellule est désignée par <code>ActiveCell.Offset(0, 0)</code> ?</li>' +
      '  <li>Quelle est la touche de fonction qui ouvre l’Explorateur d’objets dans VBE pour vérifier la documentation de <code>Offset</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Déplacements relatifs avec Offset(lignes, colonnes)\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Cellule atteinte par ActiveCell.Offset(2, 1) depuis C5]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Cellule atteinte par ActiveCell.Offset(-3, -2) depuis C5]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Cellule atteinte par ActiveCell.Offset(0, 3) depuis C5]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Cellule atteinte par ActiveCell.Offset(0, 0) depuis C5]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Touche de l\'Explorateur d\'objets dans VBE]\n' +
      'A_COMPLETER\n',
    hints: [
      'Convertissez d’abord C5 en coordonnées (ligne = 5, colonne = 3), puis additionnez séparément le décalage de ligne et le décalage de colonne.',
      'Reconvertissez ensuite le couple obtenu (nouvelle_ligne, nouvelle_colonne) en notation A1 (1=A, 2=B, 3=C, 4=D, 5=E, 6=F).',
      'Étapes : (5+2, 3+1) = (7, 4) -> D7 ; (5-3, 3-2) = (2, 1) -> A2 ; (5+0, 3+3) = (5, 6) -> F5 ; (5+0, 3+0) -> C5 ; touche F2 pour l’Explorateur d’objets.'
    ],
    examples: [
      {
        stdin:
          'Départ en B4 (ligne 4, colonne 2) :\n' +
          '- Offset(1, 2) -> ligne 5, col 4 -> D5\n' +
          '- Offset(-2, -1) -> ligne 2, col 1 -> A2',
        expected: 'D5 — A2',
        note: 'Un décalage nul (0) conserve la même ligne ou la même colonne.'
      }
    ],
    tests: [
      { label: 'Question 1 — Offset(2, 1) depuis C5', stdin: 'q:1', expected: 'd7||cellule d7' },
      { label: 'Question 2 — Offset(-3, -2) depuis C5', stdin: 'q:2', expected: 'a2||cellule a2' },
      { label: 'Question 3 — Offset(0, 3) depuis C5', stdin: 'q:3', expected: 'f5||cellule f5' },
      { label: 'Question 4 — Offset(0, 0) depuis C5', stdin: 'q:4', expected: 'c5||cellule c5' },
      { label: 'Question 5 — Touche de l\'Explorateur d\'objets', stdin: 'q:5', expected: 'f2||touche f2' }
    ],
    solution:
      '[Question 1 — Cellule atteinte par ActiveCell.Offset(2, 1) depuis C5]\n' +
      'D7\n\n' +
      '[Question 2 — Cellule atteinte par ActiveCell.Offset(-3, -2) depuis C5]\n' +
      'A2\n\n' +
      '[Question 3 — Cellule atteinte par ActiveCell.Offset(0, 3) depuis C5]\n' +
      'F5\n\n' +
      '[Question 4 — Cellule atteinte par ActiveCell.Offset(0, 0) depuis C5]\n' +
      'C5\n\n' +
      '[Question 5 — Touche de l\'Explorateur d\'objets dans VBE]\n' +
      'F2',
    takeaway:
      '1) Depuis C5 (lig 5, col 3), Offset(2, 1) donne ligne 7 et colonne 4 (D), soit D7.\n' +
      '2) Depuis C5, Offset(-3, -2) donne ligne 2 et colonne 1 (A), soit A2.\n' +
      '3) Depuis C5, Offset(0, 3) reste en ligne 5 et passe en colonne 6 (F), soit F5.\n' +
      '4) Offset(0, 0) ne déplace ni la ligne ni la colonne et désigne C5.\n' +
      '5) La touche F2 ouvre l’Explorateur d’objets dans VBE.'
  },

  /* ==================== Chapitre 3 — Propriétés, Méthodes & Événements ==================== */
  {
    id: 'vba-c3-e1',
    chapter: 3,
    level: 'n1',
    language: 'analyse',
    title: 'Distinguer Propriétés et Méthodes sur un modèle de facture',
    exampleTitle: 'Exemple résolu — réinitialiser le modèle sans casser ses bordures',
    goal: 'Qualifier chaque membre VBA comme propriété ou méthode et choisir entre Clear, ClearContents et ClearFormats.',
    brief:
      '<p><strong>Énoncé.</strong> Essi prépare un bouton « Nouvelle facture » pour vider la plage de saisie ' +
      '<code>B8:E25</code> tout en conservant les bordures, les couleurs et le format monétaire du tableau. ' +
      'Elle hésite entre plusieurs instructions VBA :</p>' +
      '<table>' +
      '  <tr><th>Instruction VBA</th><th>Effet sur la feuille</th></tr>' +
      '  <tr><td><code>Range("B4").Value = "Facture n° 104"</code></td><td>Écrit le titre dans B4</td></tr>' +
      '  <tr><td><code>Range("B8:E25").ClearContents</code></td><td>Vide les valeurs sans toucher au format</td></tr>' +
      '  <tr><td><code>Range("B8:E25").Clear</code></td><td>Efface tout (valeurs, bordures et couleurs)</td></tr>' +
      '  <tr><td><code>Range("B4").Font.Bold = True</code></td><td>Met la police de B4 en gras</td></tr>' +
      '  <tr><td><code>Columns("B:E").AutoFit</code></td><td>Ajuste la largeur des colonnes B à E</td></tr>' +
      '</table>' +
      '<ol>' +
      '  <li>Dans <code>Range("B4").Value = "Facture n° 104"</code>, <code>Value</code> est-il une <code>propriete</code> ou une <code>methode</code> ?</li>' +
      '  <li>Dans <code>Columns("B:E").AutoFit</code>, <code>AutoFit</code> est-il une <code>propriete</code> ou une <code>methode</code> ?</li>' +
      '  <li>Quelle méthode Essi doit-elle choisir pour vider les valeurs de <code>B8:E25</code> tout en conservant ses bordures et couleurs ?</li>' +
      '  <li>Quel sous-objet de <code>Range</code> permet de modifier la couleur de fond (remplissage) d’une cellule : <code>Font</code> ou <code>Interior</code> ?</li>' +
      '  <li>Quelle propriété booléenne de <code>Application</code> met-on à <code>False</code> en début de macro pour figer le rafraîchissement d’écran et accélérer l’exécution ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Distinguer Propriétés et Méthodes sur un modèle de facture\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Nature de Value (propriete ou methode)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Nature de AutoFit (propriete ou methode)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Méthode effaçant le contenu sans effacer la mise en forme]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Sous-objet gérant la couleur de fond (Font ou Interior)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Propriété d\'Application figeant le rafraîchissement écran]\n' +
      'A_COMPLETER\n',
    hints: [
      'Ce à quoi on affecte une valeur avec le signe = est une propriété ; ce qui déclenche une action sans signe = est une méthode.',
      'Pour effacer seulement le contenu (contents en anglais) sans détruire le cadre du tableau, évitez Clear tout court.',
      'Étapes : classer Value comme propriete et AutoFit comme methode ; retenir ClearContents ; choisir Interior pour la couleur de fond ; citer ScreenUpdating (Application.ScreenUpdating = False).'
    ],
    examples: [
      {
        stdin:
          'Mise en forme d\'une cellule :\n' +
          '- Range("A1").Font.Size = 14 -> propriété (affectation avec =)\n' +
          '- Range("A1:B5").Copy -> méthode (action de copie)',
        expected: 'Size : propriete — Copy : methode',
        note: 'Une propriété décrit un état de l’objet ; une méthode exécute une action sur l’objet.'
      }
    ],
    tests: [
      { label: 'Question 1 — Nature de Value', stdin: 'q:1', expected: 'propriété||propriete||une propriété||une propriete' },
      { label: 'Question 2 — Nature de AutoFit', stdin: 'q:2', expected: 'méthode||methode||une méthode||une methode' },
      { label: 'Question 3 — Méthode gardant la mise en forme', stdin: 'q:3', expected: 'clearcontents||.clearcontents' },
      { label: 'Question 4 — Sous-objet de couleur de fond', stdin: 'q:4', expected: 'interior||.interior' },
      { label: 'Question 5 — Propriété figeant l\'écran', stdin: 'q:5', expected: 'screenupdating||application.screenupdating' }
    ],
    solution:
      '[Question 1 — Nature de Value (propriete ou methode)]\n' +
      'propriete\n\n' +
      '[Question 2 — Nature de AutoFit (propriete ou methode)]\n' +
      'methode\n\n' +
      '[Question 3 — Méthode effaçant le contenu sans effacer la mise en forme]\n' +
      'ClearContents\n\n' +
      '[Question 4 — Sous-objet gérant la couleur de fond (Font ou Interior)]\n' +
      'Interior\n\n' +
      '[Question 5 — Propriété d\'Application figeant le rafraîchissement écran]\n' +
      'ScreenUpdating',
    takeaway:
      '1) Value est une propriété (lue ou modifiée avec =).\n' +
      '2) AutoFit est une méthode (action d’ajustement automatique de largeur/hauteur).\n' +
      '3) ClearContents efface uniquement les valeurs et formules en conservant bordures, couleurs et formats.\n' +
      '4) Le sous-objet Interior gère le fond de la cellule (Interior.Color ou Interior.ColorIndex), tandis que Font gère la police.\n' +
      '5) Application.ScreenUpdating = False désactive le rafraîchissement de l’écran pendant l’exécution de la macro.'
  },
  {
    id: 'vba-c3-e2',
    chapter: 3,
    level: 'n2',
    language: 'analyse',
    title: 'Factoriser avec With...End With et calculer avec WorksheetFunction',
    exampleTitle: 'Exemple résolu — le bandeau récapitulatif des ventes',
    goal: 'Compléter un bloc With...End With et utiliser Application.WorksheetFunction pour appeler les fonctions Excel en VBA.',
    brief:
      '<p><strong>Énoncé.</strong> Pour éviter de répéter cinq fois <code>Worksheets("Bilan").Range("A1:F1")</code>, ' +
      'Mawuli utilise un bloc de factorisation et calcule ensuite la somme de la plage <code>D2:D100</code> :</p>' +
      '<pre><code>With Worksheets("Bilan").Range("A1:F1")\n' +
      '    .Font.Bold = True\n' +
      '    .Font.Size = 12\n' +
      '    .Interior.ColorIndex = 6\n' +
      'End With\n\n' +
      'Range("D101").Value = Application.WorksheetFunction.Sum(Range("D2:D100"))</code></pre>' +
      '<ol>' +
      '  <li>Par quel mot-clé s’ouvre un bloc qui factorise les accès à un même objet ?</li>' +
      '  <li>Par quels deux mots se ferme obligatoirement ce bloc ?</li>' +
      '  <li>Par quel signe de ponctuation commence chacune des lignes à l’intérieur du bloc (devant <code>Font</code> et <code>Interior</code>) ? (écrivez le nom du signe, ex. <code>point</code>, ou le caractère <code>.</code>)</li>' +
      '  <li>Quel sous-objet de <code>Application</code> permet d’appeler les fonctions de feuille de calcul d’Excel (comme <code>Sum</code>, <code>Average</code>, <code>VLookup</code>) depuis VBA ?</li>' +
      '  <li>Dans <code>WorksheetFunction.Sum(...)</code>, les noms des fonctions Excel s’écrivent-ils en <code>anglais</code> ou en <code>francais</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Factoriser avec With...End With et calculer avec WorksheetFunction\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Mot-clé d\'ouverture du bloc de factorisation]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Mots-clés de fermeture du bloc]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Signe placé devant Font et Interior dans le bloc]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Objet exposant les fonctions natives d\'Excel en VBA]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Langue des fonctions dans WorksheetFunction (anglais ou francais)]\n' +
      'A_COMPLETER\n',
    hints: [
      'Le bloc de factorisation porte le nom anglais signifiant « Avec ».',
      'À l’intérieur du bloc, chaque propriété est rattachée à l’objet de l’en-tête par son point d’accès.',
      'Étapes : noter With à l’ouverture et End With à la fermeture ; indiquer le point (.) devant les propriétés internes ; relever WorksheetFunction ; préciser anglais (Sum, Average, VLookup).'
    ],
    examples: [
      {
        stdin:
          'Calcul de la moyenne de B2:B30 en VBA :\n' +
          'moy = Application.WorksheetFunction.Average(Range("B2:B30"))',
        expected: 'WorksheetFunction.Average',
        note: 'Même sur un Excel en français, le code VBA et WorksheetFunction utilisent les noms anglais (Sum, Average, Max, Min).'
      }
    ],
    tests: [
      { label: 'Question 1 — Mot-clé d\'ouverture', stdin: 'q:1', expected: 'with' },
      { label: 'Question 2 — Mots-clés de fermeture', stdin: 'q:2', expected: 'end with' },
      { label: 'Question 3 — Signe devant les propriétés', stdin: 'q:3', expected: '.||point||le point||un point' },
      { label: 'Question 4 — Objet exposant les fonctions Excel', stdin: 'q:4', expected: 'worksheetfunction||application.worksheetfunction' },
      { label: 'Question 5 — Langue des fonctions', stdin: 'q:5', expected: 'anglais||en anglais' }
    ],
    solution:
      '[Question 1 — Mot-clé d\'ouverture du bloc de factorisation]\n' +
      'With\n\n' +
      '[Question 2 — Mots-clés de fermeture du bloc]\n' +
      'End With\n\n' +
      '[Question 3 — Signe placé devant Font et Interior dans le bloc]\n' +
      'point\n\n' +
      '[Question 4 — Objet exposant les fonctions natives d\'Excel en VBA]\n' +
      'WorksheetFunction\n\n' +
      '[Question 5 — Langue des fonctions dans WorksheetFunction (anglais ou francais)]\n' +
      'anglais',
    takeaway:
      '1) Le bloc s’ouvre par With suivi de l’objet cible.\n' +
      '2) Il se referme obligatoirement par End With.\n' +
      '3) Chaque propriété ou méthode interne commence par un point (.Font.Bold = True).\n' +
      '4) Application.WorksheetFunction permet d’appeler les fonctions natives d’Excel depuis VBA.\n' +
      '5) Les méthodes de WorksheetFunction portent toujours leur nom anglais (Sum, Average, VLookup, CountIf).'
  },
  {
    id: 'vba-c3-e3',
    chapter: 3,
    level: 'n3',
    language: 'analyse',
    title: 'Procédures événementielles : Workbook_Open et Worksheet_Change',
    exampleTitle: 'Exemple résolu — horodatage automatique à la saisie',
    goal: 'Placer chaque procédure événementielle dans le bon module VBE et exploiter le paramètre Target.',
    brief:
      '<p><strong>Énoncé.</strong> Le directeur financier souhaite deux automatisations sans bouton :</p>' +
      '<ul>' +
      '  <li><strong>Automatisation 1</strong> : dès l’ouverture du classeur, afficher automatiquement la feuille <code>"Accueil"</code> via l’événement <code>Workbook_Open()</code>.</li>' +
      '  <li><strong>Automatisation 2</strong> : sur la feuille <code>Feuil1</code>, dès qu’un comptable modifie un montant dans la colonne B (colonne 2), inscrire automatiquement la date du jour dans la colonne C située juste à droite, grâce au code suivant :</li>' +
      '</ul>' +
      '<pre><code>Private Sub Worksheet_Change(ByVal Target As Range)\n' +
      '    If Target.Column = 2 Then\n' +
      '        Target.Offset(0, 1).Value = Date\n' +
      '    End If\n' +
      'End Sub</code></pre>' +
      '<ol>' +
      '  <li>Dans quel module de l’Explorateur de projets faut-il écrire <code>Workbook_Open()</code> pour qu’elle se déclenche à l’ouverture du classeur ?</li>' +
      '  <li>Dans quel module faut-il écrire <code>Worksheet_Change</code> : dans <code>Module1</code> ou dans le module de la feuille (<code>Feuil1</code>) ?</li>' +
      '  <li>Comment s’appelle le paramètre de type <code>Range</code> qui désigne la cellule qui vient d’être modifiée dans <code>Worksheet_Change</code> ?</li>' +
      '  <li>Quelle propriété de <code>Target</code> renvoie le numéro de la colonne modifiée (testée à <code>2</code> dans le code) ?</li>' +
      '  <li>Si le comptable modifie la cellule <code>B10</code>, dans quelle cellule (en notation A1) l’instruction <code>Target.Offset(0, 1).Value = Date</code> écrit-elle la date ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Procédures événementielles : Workbook_Open et Worksheet_Change\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Module où placer Workbook_Open()]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Module où placer Worksheet_Change (Module1 ou Feuil1)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Nom du paramètre représentant la cellule modifiée]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Propriété de Target donnant le numéro de colonne]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Cellule où la date est écrite si Target est B10]\n' +
      'A_COMPLETER\n',
    hints: [
      'Un événement qui concerne le classeur entier vit dans l’objet classeur ; un événement qui concerne une feuille vit dans l’objet feuille.',
      'Dans la signature Private Sub Worksheet_Change(ByVal Target As Range), lisez le nom de l’argument avant As Range.',
      'Étapes : placer Workbook_Open dans ThisWorkbook ; placer Worksheet_Change dans Feuil1 ; nommer le paramètre Target ; relever la propriété Column ; décaler B10 de Offset(0, 1) vers C10.'
    ],
    examples: [
      {
        stdin:
          'L\'utilisateur clique sur la cellule D4 de Feuil2 :\n' +
          '- Événement déclenché : Worksheet_SelectionChange dans Feuil2\n' +
          '- Target.Address -> "$D$4"\n' +
          '- Target.Row -> 4, Target.Column -> 4',
        expected: 'Feuil2 — Target = D4 (Row=4, Column=4)',
        note: 'Une procédure événementielle placée par erreur dans Module1 ne se déclenche jamais.'
      }
    ],
    tests: [
      { label: 'Question 1 — Module de Workbook_Open', stdin: 'q:1', expected: 'thisworkbook||module thisworkbook' },
      { label: 'Question 2 — Module de Worksheet_Change', stdin: 'q:2', expected: 'feuil1||module de la feuille||la feuille' },
      { label: 'Question 3 — Nom du paramètre', stdin: 'q:3', expected: 'target' },
      { label: 'Question 4 — Propriété donnant le numéro de colonne', stdin: 'q:4', expected: 'column||.column||target.column' },
      { label: 'Question 5 — Cellule écrite si Target est B10', stdin: 'q:5', expected: 'c10||cellule c10' }
    ],
    solution:
      '[Question 1 — Module où placer Workbook_Open()]\n' +
      'ThisWorkbook\n\n' +
      '[Question 2 — Module où placer Worksheet_Change (Module1 ou Feuil1)]\n' +
      'Feuil1\n\n' +
      '[Question 3 — Nom du paramètre représentant la cellule modifiée]\n' +
      'Target\n\n' +
      '[Question 4 — Propriété de Target donnant le numéro de colonne]\n' +
      'Column\n\n' +
      '[Question 5 — Cellule où la date est écrite si Target est B10]\n' +
      'C10',
    takeaway:
      '1) Workbook_Open() doit obligatoirement être placée dans le module de l’objet ThisWorkbook.\n' +
      '2) Worksheet_Change doit être placée dans le module de la feuille surveillée (Feuil1) et jamais dans un module standard Module1.\n' +
      '3) Le paramètre Target (de type Range) représente la cellule ou plage qui vient d’être modifiée.\n' +
      '4) Target.Column renvoie le numéro de colonne (2 pour la colonne B) et Target.Row le numéro de ligne.\n' +
      '5) Depuis B10, Target.Offset(0, 1) décale d’une colonne vers la droite sur la même ligne, soit C10.'
  },

  /* ==================== Chapitre 4 — Variables, Types, Opérateurs & Fonctions ==================== */
  {
    id: 'vba-c4-e1',
    chapter: 4,
    level: 'n1',
    language: 'analyse',
    title: 'Typage des variables et Option Explicit au service comptable',
    exampleTitle: 'Exemple résolu — éviter le dépassement de capacité Integer',
    goal: 'Choisir les bons types VBA (Long, Double, String, Boolean, Variant, Object avec Set) et appliquer Option Explicit.',
    brief:
      '<p><strong>Énoncé.</strong> Akouvi révise une macro qui plante avec l’erreur <em>« Dépassement de capacité (Overflow) »</em> ' +
      'lorsqu’elle parcourt un grand fichier de 50 000 lignes clients. En tête du module, elle examine les déclarations suivantes :</p>' +
      '<pre><code>Option Explicit\n\n' +
      'Sub AnalyserClients()\n' +
      '    Dim numLigne As Long\n' +
      '    Dim ancienCompteur As Integer\n' +
      '    Dim codeClient, nomClient As String\n' +
      '    Dim estActif As Boolean\n' +
      '    Dim plageClients As Range\n' +
      '    Set plageClients = Range("A2:D50000")\n' +
      'End Sub</code></pre>' +
      '<ol>' +
      '  <li>Quelle directive de deux mots placée en première ligne oblige à déclarer toutes les variables du module ?</li>' +
      '  <li>Pourquoi <code>ancienCompteur As Integer</code> plante-t-il sur 50 000 lignes : quelle est la valeur maximale d’un <code>Integer</code> en VBA ?</li>' +
      '  <li>Quel type entier sur 4 octets (utilisé pour <code>numLigne</code>) faut-il toujours privilégier pour les numéros de lignes Excel ?</li>' +
      '  <li>Dans la ligne <code>Dim codeClient, nomClient As String</code>, quel est le type réel attribué par VBA à <code>codeClient</code> ?</li>' +
      '  <li>Quel mot-clé de 3 lettres est obligatoire au début de la ligne qui affecte la référence d’objet à <code>plageClients</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Typage des variables et Option Explicit au service comptable\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Directive imposant la déclaration des variables]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Valeur maximale positive du type Integer]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Type entier recommandé pour les numéros de lignes Excel]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Type réel de codeClient dans Dim codeClient, nomClient As String]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Mot-clé obligatoire pour affecter une variable objet]\n' +
      'A_COMPLETER\n',
    hints: [
      'La directive figure tout en haut du code ; un Integer signé sur 2 octets va de -32 768 à +32 767.',
      'En VBA, toute variable qui n’est pas immédiatement suivie de sa propre clause As Type reçoit le type générique par défaut.',
      'Étapes : relever Option Explicit ; indiquer 32767 (32 767) comme plafond d’Integer ; citer Long pour les lignes Excel ; répondre Variant pour codeClient ; noter le mot-clé Set pour l’objet Range.'
    ],
    examples: [
      {
        stdin:
          'Déclaration correcte de deux entiers longs et d\'une feuille :\n' +
          'Dim i As Long, j As Long\n' +
          'Dim f As Worksheet\n' +
          'Set f = ThisWorkbook.Worksheets("Ventes")',
        expected: 'i : Long — j : Long — f : affecté avec Set',
        note: 'Toujours répéter As Type après chaque variable sur une même ligne Dim.'
      }
    ],
    tests: [
      { label: 'Question 1 — Directive en tête de module', stdin: 'q:1', expected: 'option explicit' },
      { label: 'Question 2 — Plafond positif d\'Integer', stdin: 'q:2', expected: '32767||32 767' },
      { label: 'Question 3 — Type recommandé pour les lignes', stdin: 'q:3', expected: 'long' },
      { label: 'Question 4 — Type réel de codeClient', stdin: 'q:4', expected: 'variant' },
      { label: 'Question 5 — Mot-clé pour affecter un objet', stdin: 'q:5', expected: 'set' }
    ],
    solution:
      '[Question 1 — Directive imposant la déclaration des variables]\n' +
      'Option Explicit\n\n' +
      '[Question 2 — Valeur maximale positive du type Integer]\n' +
      '32767\n\n' +
      '[Question 3 — Type entier recommandé pour les numéros de lignes Excel]\n' +
      'Long\n\n' +
      '[Question 4 — Type réel de codeClient dans Dim codeClient, nomClient As String]\n' +
      'Variant\n\n' +
      '[Question 5 — Mot-clé obligatoire pour affecter une variable objet]\n' +
      'Set',
    takeaway:
      '1) Option Explicit impose la déclaration explicite de chaque variable avec Dim.\n' +
      '2) Le type Integer (2 octets) plafonne à 32 767 : au-delà, VBA déclenche une erreur de dépassement de capacité (Overflow).\n' +
      '3) Le type Long (4 octets, jusqu’à plus de 2 milliards) est indispensable pour les numéros de lignes Excel.\n' +
      '4) Dans Dim codeClient, nomClient As String, codeClient n’a pas de As Type propre et devient donc Variant.\n' +
      '5) L’affectation d’une référence d’objet (Range, Worksheet, Workbook) exige toujours le mot-clé Set.'
  },
  {
    id: 'vba-c4-e2',
    chapter: 4,
    level: 'n2',
    language: 'analyse',
    title: 'Opérateurs VBA (&, \\, Mod) et portée des variables',
    exampleTitle: 'Exemple résolu — décomposer un stock en cartons et unités',
    goal: 'Évaluer les opérateurs VBA de division entière, de reste (Mod) et de concaténation (&) ainsi que la portée des déclarations.',
    brief:
      '<p><strong>Énoncé.</strong> Un entrepôt conditionne ses articles par cartons de <strong>10 unités</strong>. ' +
      'Pour <strong>47 articles</strong> en stock, la macro exécute les calculs suivants :</p>' +
      '<pre><code>Public Const TAILLE_CARTON As Long = 10\n\n' +
      'Sub CalculerColisage()\n' +
      '    Dim stock As Long, cartons As Long, reste As Long\n' +
      '    Dim message As String\n' +
      '    stock = 47\n' +
      '    cartons = stock \\ TAILLE_CARTON\n' +
      '    reste = stock Mod TAILLE_CARTON\n' +
      '    message = "Cartons : " & cartons & " / Reste : " & reste\n' +
      'End Sub</code></pre>' +
      '<ol>' +
      '  <li>Que vaut la variable <code>cartons</code> après la division entière <code>47 \\ 10</code> ?</li>' +
      '  <li>Que vaut la variable <code>reste</code> après l’opération modulo <code>47 Mod 10</code> ?</li>' +
      '  <li>Quel symbole d’opérateur est utilisé à la dernière ligne pour concaténer le texte et les nombres dans <code>message</code> ?</li>' +
      '  <li>La variable <code>stock</code>, déclarée avec <code>Dim</code> à l’intérieur de <code>Sub CalculerColisage()</code>, a-t-elle une portée <code>locale</code> ou <code>publique</code> ?</li>' +
      '  <li>Quel mot-clé placé devant <code>TAILLE_CARTON</code> garantit que la valeur <code>10</code> ne pourra jamais être modifiée par le programme ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Opérateurs VBA (&, \\, Mod) et portée des variables\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Valeur de cartons (47 \\ 10)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Valeur de reste (47 Mod 10)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Opérateur de concaténation de chaînes]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Portée de la variable stock (locale ou publique)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Mot-clé déclarant une constante]\n' +
      'A_COMPLETER\n',
    hints: [
      'L’antislash \\ donne le quotient entier (combien de fois 10 rentre dans 47) et Mod donne le reste de cette division.',
      'Une variable déclarée à l’intérieur d’un Sub n’existe que pendant l’exécution de ce Sub.',
      'Étapes : calculer 47 \\ 10 = 4 ; calculer 47 Mod 10 = 7 ; relever l’esperluette & pour la concaténation ; qualifier la portée de locale ; noter le mot-clé Const.'
    ],
    examples: [
      {
        stdin:
          'Conversion de 135 minutes en heures et minutes :\n' +
          '- heures = 135 \\ 60 -> 2\n' +
          '- minutes = 135 Mod 60 -> 15\n' +
          '- texte = heures & "h" & minutes -> "2h15"',
        expected: '2 heures et 15 minutes ("2h15")',
        note: 'En VBA, / effectue la division décimale (135 / 60 = 2.25) tandis que \\ effectue la division entière (2).'
      }
    ],
    tests: [
      { label: 'Question 1 — Valeur de cartons (47 \\ 10)', stdin: 'q:1', expected: '4' },
      { label: 'Question 2 — Valeur de reste (47 Mod 10)', stdin: 'q:2', expected: '7' },
      { label: 'Question 3 — Opérateur de concaténation', stdin: 'q:3', expected: '&||esperluette' },
      { label: 'Question 4 — Portée de la variable stock', stdin: 'q:4', expected: 'locale||portée locale||portee locale' },
      { label: 'Question 5 — Mot-clé déclarant une constante', stdin: 'q:5', expected: 'const' }
    ],
    solution:
      '[Question 1 — Valeur de cartons (47 \\ 10)]\n' +
      '4\n\n' +
      '[Question 2 — Valeur de reste (47 Mod 10)]\n' +
      '7\n\n' +
      '[Question 3 — Opérateur de concaténation de chaînes]\n' +
      '&\n\n' +
      '[Question 4 — Portée de la variable stock (locale ou publique)]\n' +
      'locale\n\n' +
      '[Question 5 — Mot-clé déclarant une constante]\n' +
      'Const',
    takeaway:
      '1) La division entière 47 \\ 10 donne 4 cartons complets.\n' +
      '2) L’opérateur modulo 47 Mod 10 donne le reste de la division entière, soit 7 unités.\n' +
      '3) L’esperluette (&) est l’opérateur de concaténation de chaînes en VBA.\n' +
      '4) Déclarée par Dim à l’intérieur d’une procédure Sub, la variable stock a une portée locale à cette procédure.\n' +
      '5) Le mot-clé Const déclare une constante dont la valeur est figée.'
  },
  {
    id: 'vba-c4-e3',
    chapter: 4,
    level: 'n3',
    language: 'analyse',
    title: 'Créer et appeler une fonction personnalisée Function (UDF)',
    exampleTitle: 'Exemple résolu — la fonction de calcul de TVA dans une feuille Excel',
    goal: 'Comprendre la syntaxe d’une Function VBA, son mécanisme de retour et les différences de séparateurs entre VBA et Excel.',
    brief:
      '<p><strong>Énoncé.</strong> Le responsable commercial veut disposer dans Excel d’une fonction personnalisée ' +
      '<code>PrixNet(montantHT, tauxRemise)</code> utilisable comme une formule native. Vous écrivez dans <code>Module1</code> :</p>' +
      '<pre><code>Option Explicit\n\n' +
      'Function PrixNet(montantHT As Double, tauxRemise As Double) As Double\n' +
      '    PrixNet = montantHT * (1 - tauxRemise)\n' +
      'End Function</code></pre>' +
      '<ol>' +
      '  <li>Quel mot-clé déclare une procédure qui calcule et renvoie une valeur (par opposition à <code>Sub</code>) ?</li>' +
      '  <li>À quelle cible affecte-t-on le résultat <code>montantHT * (1 - tauxRemise)</code> pour que la fonction le renvoie ? (écrivez l’identifiant placé à gauche du signe <code>=</code>)</li>' +
      '  <li>Que renvoie l’appel VBA <code>PrixNet(20000, 0.1)</code> ?</li>' +
      '  <li>Dans le code VBA, quel caractère sépare le chiffre des unités des décimales dans <code>0.1</code> : le <code>point</code> ou la <code>virgule</code> ?</li>' +
      '  <li>Dans une feuille de calcul Excel en français, quel caractère sépare les deux arguments lorsqu’on tape la formule <code>=PrixNet(A2 ; 0,1)</code> : le <code>point-virgule</code> ou la <code>virgule</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Créer et appeler une fonction personnalisée Function (UDF)\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Mot-clé déclarant une fonction qui renvoie une valeur]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Identifiant auquel on affecte la valeur de retour]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Résultat de PrixNet(20000, 0.1)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Séparateur décimal dans le code VBA (point ou virgule)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Séparateur d\'arguments dans une formule Excel française]\n' +
      'A_COMPLETER\n',
    hints: [
      'En VBA, il n’y a pas de mot-clé return : regardez ce qui se trouve à gauche du signe = à l’intérieur de la fonction.',
      'Une remise de 0.1 correspond à 10 % de 20 000 FCFA (soit 2 000 FCFA déduits).',
      'Étapes : noter Function ; indiquer PrixNet (le nom de la fonction) ; calculer 20000 * 0.9 = 18000 ; répondre point pour le décimal en VBA ; répondre point-virgule (;) pour séparer les arguments dans Excel français.'
    ],
    examples: [
      {
        stdin:
          'Function DoubleValeur(x As Double) As Double\n' +
          '    DoubleValeur = x * 2\n' +
          'End Function\n' +
          '- En VBA : y = DoubleValeur(12.5) -> 25\n' +
          '- Dans une cellule Excel : =DoubleValeur(A1)',
        expected: 'Retour par DoubleValeur = x * 2 -> 25',
        note: 'Une Function placée dans un module standard est immédiatement utilisable dans les formules de la feuille de calcul.'
      }
    ],
    tests: [
      { label: 'Question 1 — Mot-clé déclarant une fonction', stdin: 'q:1', expected: 'function' },
      { label: 'Question 2 — Identifiant recevant la valeur de retour', stdin: 'q:2', expected: 'prixnet||nom de la fonction||le nom de la fonction' },
      { label: 'Question 3 — Résultat de PrixNet(20000, 0.1)', stdin: 'q:3', expected: '18000||18 000' },
      { label: 'Question 4 — Séparateur décimal en code VBA', stdin: 'q:4', expected: 'point||.||le point' },
      { label: 'Question 5 — Séparateur d\'arguments dans Excel FR', stdin: 'q:5', expected: 'point-virgule||;||point virgule||le point-virgule' }
    ],
    solution:
      '[Question 1 — Mot-clé déclarant une fonction qui renvoie une valeur]\n' +
      'Function\n\n' +
      '[Question 2 — Identifiant auquel on affecte la valeur de retour]\n' +
      'PrixNet\n\n' +
      '[Question 3 — Résultat de PrixNet(20000, 0.1)]\n' +
      '18000\n\n' +
      '[Question 4 — Séparateur décimal dans le code VBA (point ou virgule)]\n' +
      'point\n\n' +
      '[Question 5 — Séparateur d\'arguments dans une formule Excel française]\n' +
      'point-virgule',
    takeaway:
      '1) Le mot-clé Function déclare une fonction qui renvoie un résultat typé.\n' +
      '2) En VBA, la valeur de retour est renvoyée en l’affectant au nom même de la fonction (PrixNet = ...).\n' +
      '3) Pour 20 000 avec 10 % de remise (0.1), PrixNet renvoie 20 000 × 0,9 = 18 000.\n' +
      '4) Dans l’éditeur VBE, le séparateur décimal est toujours le point (0.1) et les arguments sont séparés par une virgule.\n' +
      '5) Dans une cellule Excel francophone, les arguments de la formule sont séparés par un point-virgule (;).'
  },

  /* ==================== Chapitre 5 — Structures de contrôle (Conditions & Boucles) ==================== */
  {
    id: 'vba-c5-e1',
    chapter: 5,
    level: 'n1',
    language: 'analyse',
    title: 'Barème de remises avec If...Then...ElseIf et Select Case',
    exampleTitle: 'Exemple résolu — la grille tarifaire des grossistes',
    goal: 'Évaluer l’exécution d’un bloc If...ElseIf...Else et maîtriser les mots-clés To, Is et Case Else d’un Select Case.',
    brief:
      '<p><strong>Énoncé.</strong> Une coopérative agricole applique une prime de fidélité selon le tonnage annuel ' +
      'livré par chaque producteur, codée en VBA de deux façons équivalentes :</p>' +
      '<pre><code>\' Version 1 : If...Then...ElseIf\n' +
      'If tonnage >= 50 Then\n' +
      '    prime = 100000\n' +
      'ElseIf tonnage >= 20 Then\n' +
      '    prime = 40000\n' +
      'Else\n' +
      '    prime = 10000\n' +
      'End If\n\n' +
      '\' Version 2 : Select Case\n' +
      'Select Case tonnage\n' +
      '    Case Is >= 50 : prime = 100000\n' +
      '    Case 20 To 49.99 : prime = 40000\n' +
      '    Case Else : prime = 10000\n' +
      'End Select</code></pre>' +
      '<ol>' +
      '  <li>Quelle est la valeur de <code>prime</code> pour un producteur qui a livré <code>tonnage = 35</code> ?</li>' +
      '  <li>Quelle est la valeur de <code>prime</code> pour un producteur qui a livré exactement <code>tonnage = 50</code> ?</li>' +
      '  <li>Dans <code>Select Case</code>, quel mot-clé de 2 lettres précède l’opérateur de comparaison dans <code>Case ___ >= 50</code> ?</li>' +
      '  <li>Quel mot-clé de 2 lettres exprime l’intervalle fermé dans <code>Case 20 ___ 49.99</code> ?</li>' +
      '  <li>Quelle clause du <code>Select Case</code> récupère tous les cas qui n’ont correspondu à aucun des cas précédents ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Barème de remises avec If...Then...ElseIf et Select Case\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Valeur de prime pour tonnage = 35]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Valeur de prime pour tonnage = 50]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Mot-clé devant >= dans Case ___ >= 50]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Mot-clé d\'intervalle dans Case 20 ___ 49.99]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Clause par défaut d\'un Select Case]\n' +
      'A_COMPLETER\n',
    hints: [
      'Suivez les tests dans l’ordre : pour 35, le premier test (>= 50) est faux, mais le second (>= 20) est vrai.',
      'Pour 50, le signe >= signifie « supérieur ou égal » : la borne 50 est donc incluse dans le premier palier.',
      'Étapes : trouver 40000 pour tonnage = 35 ; trouver 100000 pour tonnage = 50 ; relever le mot-clé Is devant >= ; relever le mot-clé To entre 20 et 49.99 ; noter Case Else pour le cas par défaut.'
    ],
    examples: [
      {
        stdin:
          'Test de tonnage = 12 :\n' +
          '- tonnage >= 50 (faux)\n' +
          '- tonnage >= 20 (faux)\n' +
          '- Branche Else / Case Else -> prime = 10000',
        expected: '10000',
        note: 'Dès qu’une branche ElseIf ou Case est exécutée, VBA saute toutes les branches suivantes.'
      }
    ],
    tests: [
      { label: 'Question 1 — Prime pour tonnage = 35', stdin: 'q:1', expected: '40000||40 000' },
      { label: 'Question 2 — Prime pour tonnage = 50', stdin: 'q:2', expected: '100000||100 000' },
      { label: 'Question 3 — Mot-clé devant >=', stdin: 'q:3', expected: 'is' },
      { label: 'Question 4 — Mot-clé d\'intervalle', stdin: 'q:4', expected: 'to' },
      { label: 'Question 5 — Clause par défaut', stdin: 'q:5', expected: 'case else' }
    ],
    solution:
      '[Question 1 — Valeur de prime pour tonnage = 35]\n' +
      '40000\n\n' +
      '[Question 2 — Valeur de prime pour tonnage = 50]\n' +
      '100000\n\n' +
      '[Question 3 — Mot-clé devant >= dans Case ___ >= 50]\n' +
      'Is\n\n' +
      '[Question 4 — Mot-clé d\'intervalle dans Case 20 ___ 49.99]\n' +
      'To\n\n' +
      '[Question 5 — Clause par défaut d\'un Select Case]\n' +
      'Case Else',
    takeaway:
      '1) Pour tonnage = 35, la condition tonnage >= 50 est fausse mais ElseIf tonnage >= 20 est vraie : prime = 40 000.\n' +
      '2) Pour tonnage = 50, la condition tonnage >= 50 est vraie dès la première ligne : prime = 100 000.\n' +
      '3) Dans Select Case, toute comparaison (<, >, <=, >=, <>) s’écrit avec le mot-clé Is (Case Is >= 50).\n' +
      '4) Un intervalle borné s’écrit avec le mot-clé To (Case 20 To 49.99).\n' +
      '5) La clause Case Else traite tous les cas restants.'
  },
  {
    id: 'vba-c5-e2',
    chapter: 5,
    level: 'n2',
    language: 'analyse',
    title: 'Boucles For...Next, Step -1 et For Each sur une feuille de stock',
    exampleTitle: 'Exemple résolu — purger les articles épuisés sans sauter de ligne',
    goal: 'Tracer l’exécution d’une boucle For...Next, appliquer Step -1 pour la suppression de lignes et utiliser For Each.',
    brief:
      '<p><strong>Énoncé.</strong> Le gestionnaire de stock souhaite d’abord compter les articles en rupture sur ' +
      'la plage <code>C2:C6</code>, puis supprimer les lignes correspondantes :</p>' +
      '<table>' +
      '  <tr><th>Ligne Excel</th><th>Article (Colonne B)</th><th>Quantité en stock (Colonne C)</th></tr>' +
      '  <tr><td>Ligne 2</td><td>Clavier USB</td><td>15</td></tr>' +
      '  <tr><td>Ligne 3</td><td>Souris optique</td><td>0</td></tr>' +
      '  <tr><td>Ligne 4</td><td>Câble HDMI</td><td>0</td></tr>' +
      '  <tr><td>Ligne 5</td><td>Écran 24 pouces</td><td>8</td></tr>' +
      '  <tr><td>Ligne 6</td><td>Onduleur</td><td>0</td></tr>' +
      '</table>' +
      '<ol>' +
      '  <li>Si l’on parcourt la plage avec <code>For Each cel In Range("C2:C6")</code>, combien de cellules vérifient <code>cel.Value = 0</code> ?</li>' +
      '  <li>Quelle est la somme totale des quantités en stock sur les lignes 2 à 6 ?</li>' +
      '  <li>Pour supprimer les lignes où le stock vaut 0 avec <code>For i = 6 To 2 Step -1</code>, quelle est la première valeur prise par le compteur <code>i</code> ?</li>' +
      '  <li>Dans cette boucle de suppression à rebours, quel est le pas précisé après le mot-clé <code>Step</code> ?</li>' +
      '  <li>Si l’on utilisait à tort une boucle croissante <code>For i = 2 To 6</code> pour faire <code>Rows(i).Delete</code>, quelle ligne en rupture (juste après la ligne 3) serait sautée par décalage : la ligne <code>4</code> ou la ligne <code>5</code> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Boucles For...Next, Step -1 et For Each sur une feuille de stock\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Nombre de cellules où cel.Value = 0]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Somme totale des quantités en stock]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Première valeur de i dans For i = 6 To 2 Step -1]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Valeur du pas après Step pour descendre]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Numéro de la ligne en rupture sautée en boucle croissante]\n' +
      'A_COMPLETER\n',
    hints: [
      'Comptez les zéros dans la colonne C (lignes 3, 4 et 6), puis additionnez 15 + 0 + 0 + 8 + 0.',
      'Quand la ligne 3 est supprimée en boucle croissante, l’ancienne ligne 4 (Câble HDMI, stock 0) remonte à la ligne 3 alors que le compteur passe à i = 4.',
      'Étapes : compter 3 articles à 0 ; sommer 15 + 8 = 23 ; partir de i = 6 ; utiliser le pas -1 ; identifier la ligne 4 comme la ligne sautée après la suppression de la ligne 3.'
    ],
    examples: [
      {
        stdin:
          'Suppression à rebours sur les lignes 6 à 2 (Step -1) :\n' +
          '- i = 6 (stock 0) -> supprimée\n' +
          '- i = 5 (stock 8) -> conservée\n' +
          '- i = 4 (stock 0) -> supprimée\n' +
          '- i = 3 (stock 0) -> supprimée\n' +
          '- i = 2 (stock 15) -> conservée',
        expected: '3 lignes supprimées sans aucun oubli (restent Clavier USB et Écran 24 pouces)',
        note: 'En descendant de 6 vers 2 avec Step -1, deux lignes consécutives à zéro (lignes 4 et 3) sont toutes deux supprimées proprement.'
      }
    ],
    tests: [
      { label: 'Question 1 — Nombre de cellules à 0', stdin: 'q:1', expected: '3' },
      { label: 'Question 2 — Somme totale du stock', stdin: 'q:2', expected: '23' },
      { label: 'Question 3 — Première valeur de i', stdin: 'q:3', expected: '6' },
      { label: 'Question 4 — Valeur du pas après Step', stdin: 'q:4', expected: '-1||step -1' },
      { label: 'Question 5 — Ligne sautée en boucle croissante', stdin: 'q:5', expected: '4||ligne 4||la ligne 4' }
    ],
    solution:
      '[Question 1 — Nombre de cellules où cel.Value = 0]\n' +
      '3\n\n' +
      '[Question 2 — Somme totale des quantités en stock]\n' +
      '23\n\n' +
      '[Question 3 — Première valeur de i dans For i = 6 To 2 Step -1]\n' +
      '6\n\n' +
      '[Question 4 — Valeur du pas après Step pour descendre]\n' +
      '-1\n\n' +
      '[Question 5 — Numéro de la ligne en rupture sautée en boucle croissante]\n' +
      '4',
    takeaway:
      '1) Trois cellules ont une quantité égale à 0 (lignes 3, 4 et 6).\n' +
      '2) La somme totale du stock vaut 15 + 0 + 0 + 8 + 0 = 23.\n' +
      '3) Dans For i = 6 To 2 Step -1, le compteur démarre à 6 (la dernière ligne du tableau).\n' +
      '4) Le pas de décrémentation est -1.\n' +
      '5) En boucle croissante, supprimer la ligne 3 fait remonter l’ancienne ligne 4 (Câble HDMI, stock 0) en position 3, pendant que i passe à 4 : l’ancienne ligne 4 est donc sautée.'
  },
  {
    id: 'vba-c5-e3',
    chapter: 5,
    level: 'n3',
    language: 'analyse',
    title: 'Parcours conditionnel Do While...Loop et arrêt sur cellule vide',
    exampleTitle: 'Exemple résolu — lecture d’un journal de caisse à longueur variable',
    goal: 'Suivre l’évolution des variables dans une boucle Do While...Loop et utiliser Exit Do.',
    brief:
      '<p><strong>Énoncé.</strong> Une macro parcourt la colonne A à partir de la ligne 2 jusqu’à rencontrer une ' +
      'cellule vide :</p>' +
      '<pre><code>Dim lig As Long, cumul As Long\n' +
      'lig = 2\n' +
      'cumul = 0\n' +
      'Do While Cells(lig, 1).Value <> ""\n' +
      '    cumul = cumul + Cells(lig, 1).Value\n' +
      '    lig = lig + 1\n' +
      'Loop</code></pre>' +
      '<p>Les valeurs de la colonne A sont : <code>A2 = 100</code>, <code>A3 = 250</code>, <code>A4 = 150</code>, ' +
      'et <code>A5</code> est <strong>vide</strong> (<code>""</code>).</p>' +
      '<ol>' +
      '  <li>Combien de fois le corps de la boucle <code>Do While</code> est-il exécuté avant de s’arrêter ?</li>' +
      '  <li>Quelle est la valeur finale de la variable <code>cumul</code> à la sortie de la boucle ?</li>' +
      '  <li>Quelle est la valeur finale de la variable <code>lig</code> au moment où la condition <code>Cells(lig, 1).Value &lt;&gt; ""</code> devient fausse ?</li>' +
      '  <li>Si l’on remplaçait <code>Do While Cells(lig, 1).Value &lt;&gt; ""</code> par <code>Do _____ Cells(lig, 1).Value = ""</code>, quel mot-clé (signifiant « jusqu’à ce que ») faudrait-il écrire ?</li>' +
      '  <li>Quelle instruction de deux mots permettrait de quitter immédiatement la boucle <code>Do</code> si <code>cumul</code> dépassait un plafond d’alerte ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Parcours conditionnel Do While...Loop et arrêt sur cellule vide\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Nombre d\'itérations exécutées]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Valeur finale de cumul]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Valeur finale de lig à la sortie de la boucle]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Mot-clé remplaçant While devant Cells(lig, 1).Value = ""]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Instruction de sortie anticipée d\'une boucle Do]\n' +
      'A_COMPLETER\n',
    hints: [
      'Suivez lig tour par tour : lig=2 (A2=100, cumul=100, lig passe à 3) ; lig=3 (A3=250, cumul=350, lig passe à 4) ; lig=4 (A4=150, cumul=500, lig passe à 5).',
      'Au test suivant, lig vaut 5 et A5 est vide : la condition <> "" est fausse et on sort de la boucle.',
      'Étapes : compter 3 tours (lignes 2, 3, 4) ; additionner 100 + 250 + 150 = 500 ; noter lig = 5 à la sortie ; écrire Until pour « jusqu’à ce que » ; citer Exit Do pour la sortie anticipée.'
    ],
    examples: [
      {
        stdin:
          'Si A2 est déjà vide au départ (lig = 2) :\n' +
          '- Do While Cells(2, 1).Value <> "" est faux dès le premier test\n' +
          '- Nombre de passages : 0, cumul = 0, lig reste à 2.',
        expected: '0 passage — cumul = 0 — lig = 2',
        note: 'Le test en entrée (Do While) protège le programme si le tableau est entièrement vide.'
      }
    ],
    tests: [
      { label: 'Question 1 — Nombre d\'itérations', stdin: 'q:1', expected: '3' },
      { label: 'Question 2 — Valeur finale de cumul', stdin: 'q:2', expected: '500' },
      { label: 'Question 3 — Valeur finale de lig', stdin: 'q:3', expected: '5' },
      { label: 'Question 4 — Mot-clé signifiant jusqu\'à ce que', stdin: 'q:4', expected: 'until||do until' },
      { label: 'Question 5 — Sortie anticipée d\'une boucle Do', stdin: 'q:5', expected: 'exit do' }
    ],
    solution:
      '[Question 1 — Nombre d\'itérations exécutées]\n' +
      '3\n\n' +
      '[Question 2 — Valeur finale de cumul]\n' +
      '500\n\n' +
      '[Question 3 — Valeur finale de lig à la sortie de la boucle]\n' +
      '5\n\n' +
      '[Question 4 — Mot-clé remplaçant While devant Cells(lig, 1).Value = ""]\n' +
      'Until\n\n' +
      '[Question 5 — Instruction de sortie anticipée d\'une boucle Do]\n' +
      'Exit Do',
    takeaway:
      '1) La boucle s’exécute 3 fois (pour les lignes 2, 3 et 4).\n' +
      '2) cumul additionne 100 + 250 + 150 = 500.\n' +
      '3) À la fin du 3e tour, lig = lig + 1 fait passer lig à 5 ; A5 étant vide, la boucle s’arrête avec lig = 5 (ce qui donne aussi l’indice de la première ligne vide !).\n' +
      '4) Do Until Cells(lig, 1).Value = "" (boucler jusqu’à ce que la cellule soit vide) est l’exact équivalent de Do While Cells(lig, 1).Value <> "".\n' +
      '5) Exit Do permet de quitter immédiatement une boucle Do...Loop.'
  },

  /* ==================== Chapitre 6 — MsgBox, InputBox, On Error GoTo & UserForm ==================== */
  {
    id: 'vba-c6-e1',
    chapter: 6,
    level: 'n1',
    language: 'analyse',
    title: 'Dialogue utilisateur avec InputBox et MsgBox',
    exampleTitle: 'Exemple résolu — confirmation avant clôture mensuelle',
    goal: 'Maîtriser les constantes de boutons et de retour de MsgBox, le comportement d’InputBox et les arguments nommés (:=).',
    brief:
      '<p><strong>Énoncé.</strong> Avant d’archiver les factures du mois, la macro interroge l’utilisateur :</p>' +
      '<pre><code>Dim mois As String, reponse As Integer\n' +
      'mois = InputBox(Prompt:="Mois à clôturer :", Title:="Clôture")\n' +
      'If mois = "" Then Exit Sub\n\n' +
      'reponse = MsgBox("Archiver le mois de " & mois & " ?", vbYesNo + vbQuestion, "Confirmation")\n' +
      'If reponse = vbYes Then\n' +
      '    Call ArchiverFactures(mois)\n' +
      'End If</code></pre>' +
      '<ol>' +
      '  <li>Quelle fonction VBA ouvre une boîte de dialogue permettant à l’utilisateur de saisir un texte au clavier ?</li>' +
      '  <li>Que renvoie <code>InputBox</code> si l’utilisateur clique sur le bouton <strong>Annuler</strong> : <code>""</code> (chaîne vide) ou <code>0</code> ?</li>' +
      '  <li>Quel opérateur de deux caractères (utilisé après <code>Prompt</code> et <code>Title</code>) permet de passer un argument par son nom ?</li>' +
      '  <li>Quelle constante VBA passée à <code>MsgBox</code> affiche les deux boutons <strong>Oui</strong> et <strong>Non</strong> ?</li>' +
      '  <li>Quelle constante VBA renvoyée dans <code>reponse</code> indique que l’utilisateur a cliqué sur le bouton <strong>Oui</strong> ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Dialogue utilisateur avec InputBox et MsgBox\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Fonction de saisie de texte au clavier]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Valeur renvoyée par InputBox sur clic Annuler]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Opérateur d\'affectation d\'un argument nommé]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Constante affichant les boutons Oui et Non]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Constante testant le clic sur le bouton Oui]\n' +
      'A_COMPLETER\n',
    hints: [
      'InputBox saisit une entrée (Input) et MsgBox affiche un message (Message).',
      'Pour les arguments nommés, regardez les deux caractères collés entre Prompt et "Mois à clôturer :".',
      'Étapes : citer InputBox ; répondre "" (chaîne vide) en cas d’annulation ; noter l’opérateur := ; relever vbYesNo pour afficher Oui/Non et vbYes pour tester la réponse Oui.'
    ],
    examples: [
      {
        stdin:
          'Si l\'utilisateur clique sur Non dans MsgBox(..., vbYesNo) :\n' +
          '- reponse reçoit la constante vbNo (valeur 7)\n' +
          '- Le test If reponse = vbYes est faux : ArchiverFactures n\'est pas appelée.',
        expected: 'reponse = vbNo -> annulation propre de l\'archivage',
        note: 'Toujours tester si InputBox renvoie "" avant de lancer la suite du traitement.'
      }
    ],
    tests: [
      { label: 'Question 1 — Fonction de saisie', stdin: 'q:1', expected: 'inputbox' },
      { label: 'Question 2 — Retour d\'InputBox sur Annuler', stdin: 'q:2', expected: '""||chaine vide||chaîne vide||vide' },
      { label: 'Question 3 — Opérateur d\'argument nommé', stdin: 'q:3', expected: ':=' },
      { label: 'Question 4 — Constante des boutons Oui et Non', stdin: 'q:4', expected: 'vbyesno' },
      { label: 'Question 5 — Constante du clic sur Oui', stdin: 'q:5', expected: 'vbyes' }
    ],
    solution:
      '[Question 1 — Fonction de saisie de texte au clavier]\n' +
      'InputBox\n\n' +
      '[Question 2 — Valeur renvoyée par InputBox sur clic Annuler]\n' +
      '""\n\n' +
      '[Question 3 — Opérateur d\'affectation d\'un argument nommé]\n' +
      ':=\n\n' +
      '[Question 4 — Constante affichant les boutons Oui et Non]\n' +
      'vbYesNo\n\n' +
      '[Question 5 — Constante testant le clic sur le bouton Oui]\n' +
      'vbYes',
    takeaway:
      '1) InputBox affiche une zone de saisie et renvoie le texte entré par l’utilisateur.\n' +
      '2) Si l’utilisateur clique sur Annuler, InputBox renvoie une chaîne vide "".\n' +
      '3) L’opérateur := permet de passer des arguments par leur nom (Prompt:="...", Title:="...").\n' +
      '4) La constante vbYesNo affiche les boutons Oui et Non dans MsgBox.\n' +
      '5) La constante vbYes permet de vérifier que l’utilisateur a cliqué sur Oui (et vbNo sur Non).'
  },
  {
    id: 'vba-c6-e2',
    chapter: 6,
    level: 'n2',
    language: 'analyse',
    title: 'Gestion des erreurs d’exécution avec On Error GoTo et l’objet Err',
    exampleTitle: 'Exemple résolu — sécuriser une division et l’ouverture d’une feuille',
    goal: 'Structurer un gestionnaire d’erreur On Error GoTo et identifier les propriétés de l’objet Err ainsi que les codes d’erreur classiques.',
    brief:
      '<p><strong>Énoncé.</strong> Pour éviter qu’une erreur d’exécution n’interrompe brutalement le travail ' +
      'de l’utilisateur, Kofi protège sa procédure avec un gestionnaire d’erreur :</p>' +
      '<pre><code>Sub CalculerRatio( nomFeuille As String )\n' +
      '    On Error GoTo GestionErreur\n' +
      '    Worksheets(nomFeuille).Activate\n' +
      '    Range("D2").Value = Range("B2").Value / Range("C2").Value\n' +
      '    Exit Sub\n\n' +
      'GestionErreur:\n' +
      '    MsgBox "Erreur n° " & Err.Number & " : " & Err.Description, vbCritical, "Anomalie"\n' +
      'End Sub</code></pre>' +
      '<ol>' +
      '  <li>Quelle instruction de trois mots en début de procédure branche l’exécution vers l’étiquette <code>GestionErreur</code> en cas d’anomalie ?</li>' +
      '  <li>Quelle instruction de deux mots placée juste avant <code>GestionErreur:</code> est indispensable pour que la procédure s’arrête normalement quand aucune erreur ne survient ?</li>' +
      '  <li>Quel est le nom de l’objet VBA qui stocke les informations sur l’erreur qui vient de se produire ?</li>' +
      '  <li>Quelle propriété de cet objet renvoie le code numérique de l’erreur (par ex. <code>9</code> ou <code>11</code>) ?</li>' +
      '  <li>Si <code>Range("C2").Value</code> vaut <code>0</code>, quel est le numéro de l’erreur VBA « Division par zéro » (<code>9</code> ou <code>11</code>) ?</li>' +
      '</ol>',
    starter:
      '# Exercice — Gestion des erreurs d\'exécution avec On Error GoTo et l\'objet Err\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Instruction activant le branchement sur erreur]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Instruction empêchant d\'entrer dans GestionErreur hors erreur]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Objet VBA portant les détails de l\'erreur]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Propriété donnant le code numérique de l\'erreur]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Numéro de l\'erreur VBA « Division par zéro » (9 ou 11)]\n' +
      'A_COMPLETER\n',
    hints: [
      'Lisez les deux premières lignes et la ligne située juste au-dessus de l’étiquette GestionErreur:.',
      'Dans le MsgBox final, l’objet d’erreur expose deux propriétés : son numéro (Number) et son texte (Description).',
      'Étapes : relever On Error GoTo ; noter Exit Sub avant l’étiquette ; citer l’objet Err ; indiquer la propriété Number (Err.Number) ; retenir le code 11 pour la division par zéro (9 étant l’indice en dehors de la plage).'
    ],
    examples: [
      {
        stdin:
          'Codes d\'erreur classiques en VBA Excel :\n' +
          '- Erreur 9 : Indice en dehors de la plage (ex. Worksheets("Inconnue"))\n' +
          '- Erreur 11 : Division par zéro\n' +
          '- Erreur 13 : Incompatibilité de type (Type mismatch)',
        expected: '9 = feuille introuvable — 11 = division par zéro — 13 = type incompatible',
        note: 'Exit Sub avant l’étiquette est obligatoire : sans lui, le message d’erreur s’afficherait même quand tout réussit.'
      }
    ],
    tests: [
      { label: 'Question 1 — Instruction de branchement sur erreur', stdin: 'q:1', expected: 'on error goto||on error go to||on error goto gestionerreur' },
      { label: 'Question 2 — Instruction avant l\'étiquette', stdin: 'q:2', expected: 'exit sub' },
      { label: 'Question 3 — Objet portant l\'erreur', stdin: 'q:3', expected: 'err||objet err' },
      { label: 'Question 4 — Propriété du code numérique', stdin: 'q:4', expected: 'number||err.number||.number' },
      { label: 'Question 5 — Code de la division par zéro', stdin: 'q:5', expected: '11||erreur 11' }
    ],
    solution:
      '[Question 1 — Instruction activant le branchement sur erreur]\n' +
      'On Error GoTo\n\n' +
      '[Question 2 — Instruction empêchant d\'entrer dans GestionErreur hors erreur]\n' +
      'Exit Sub\n\n' +
      '[Question 3 — Objet VBA portant les détails de l\'erreur]\n' +
      'Err\n\n' +
      '[Question 4 — Propriété donnant le code numérique de l\'erreur]\n' +
      'Number\n\n' +
      '[Question 5 — Numéro de l\'erreur VBA « Division par zéro » (9 ou 11)]\n' +
      '11',
    takeaway:
      '1) On Error GoTo <Etiquette> détourne l’exécution vers le gestionnaire d’erreur dès qu’une anomalie survient.\n' +
      '2) Exit Sub placé juste avant l’étiquette empêche l’exécution normale de tomber dans le gestionnaire d’erreur.\n' +
      '3) L’objet intrinsèque Err stocke les informations de la dernière erreur.\n' +
      '4) Err.Number fournit le numéro de l’erreur et Err.Description son message explicatif.\n' +
      '5) L’erreur 11 correspond à une division par zéro (tandis que l’erreur 9 signale un indice en dehors de la plage, comme un nom de feuille inexistant).'
  },
  {
    id: 'vba-c6-e3',
    chapter: 6,
    level: 'n3',
    language: 'analyse',
    title: 'Concevoir et piloter un formulaire UserForm de saisie client',
    exampleTitle: 'Exemple résolu — le formulaire FrmInscription du support',
    goal: 'Identifier les contrôles d’un UserForm, initialiser une ComboBox avec AddItem et distinguer Show, Hide et Unload Me.',
    brief:
      '<p><strong>Énoncé.</strong> Conformément au dernier chapitre du support du Dr TCHAZINO Tchamiè, vous créez ' +
      'un formulaire personnalisé <code>FrmClient</code> contenant une zone de texte <code>TextBoxNom</code>, ' +
      'une liste déroulante <code>ComboBoxVille</code> et un bouton <code>ButtonOK</code> :</p>' +
      '<pre><code>Private Sub UserForm_Initialize()\n' +
      '    ComboBoxVille.AddItem "Lomé"\n' +
      '    ComboBoxVille.AddItem "Kara"\n' +
      '    ComboBoxVille.AddItem "Sokodé"\n' +
      'End Sub\n\n' +
      'Private Sub ButtonOK_Click()\n' +
      '    Range("A2").Value = TextBoxNom.Value\n' +
      '    Range("B2").Value = ComboBoxVille.Value\n' +
      '    Unload Me\n' +
      'End Sub</code></pre>' +
      '<ol>' +
      '  <li>Quelle méthode appliquée à <code>FrmClient</code> (ex. <code>FrmClient.______</code>) permet d’afficher le formulaire à l’écran depuis un module standard ?</li>' +
      '  <li>Dans l’événement <code>UserForm_Initialize()</code>, quelle méthode permet d’ajouter chacune des villes à la liste déroulante <code>ComboBoxVille</code> ?</li>' +
      '  <li>Quel type de contrôle de la Boîte à outils (en anglais : <code>Label</code> ou <code>TextBox</code>) permet à l’utilisateur de saisir librement son nom au clavier ?</li>' +
      '  <li>Quelle méthode (<code>Hide</code> ou <code>Unload</code>) masque visuellement le formulaire tout en <strong>conservant ses valeurs en mémoire vive</strong> ?</li>' +
      '  <li>Que fait l’instruction finale <code>Unload Me</code> : conserve-t-elle le formulaire en mémoire ou le <strong>décharge-t-elle complètement de la mémoire</strong> ? (répondez <code>decharge</code> ou <code>conserve</code>)</li>' +
      '</ol>',
    starter:
      '# Exercice — Concevoir et piloter un formulaire UserForm de saisie client\n' +
      '# Lisez l\'énoncé complet ci-dessus, puis répondez à chaque question dans son bloc.\n\n' +
      '[Question 1 — Méthode affichant le UserForm à l\'écran]\n' +
      'A_COMPLETER\n\n' +
      '[Question 2 — Méthode ajoutant un élément à une ComboBox]\n' +
      'A_COMPLETER\n\n' +
      '[Question 3 — Contrôle de saisie libre de texte (Label ou TextBox)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 4 — Méthode masquant le formulaire en gardant la mémoire (Hide ou Unload)]\n' +
      'A_COMPLETER\n\n' +
      '[Question 5 — Effet de Unload Me sur la mémoire (decharge ou conserve)]\n' +
      'A_COMPLETER\n',
    hints: [
      'En anglais, afficher se dit Show et masquer se dit Hide.',
      'Dans UserForm_Initialize, regardez la méthode appelée après ComboBoxVille. pour insérer "Lomé", "Kara" et "Sokodé".',
      'Étapes : noter Show pour afficher le formulaire ; relever AddItem pour remplir la ComboBox ; choisir TextBox pour la zone de saisie ; indiquer Hide pour masquer en mémoire ; répondre decharge pour Unload Me.'
    ],
    examples: [
      {
        stdin:
          'Cycle de vie d\'un UserForm :\n' +
          '1) FrmClient.Show -> déclenche UserForm_Initialize() et affiche la fenêtre\n' +
          '2) Saisie par l\'utilisateur puis clic sur ButtonOK -> copie dans Range("A2:B2")\n' +
          '3) Unload Me -> ferme la fenêtre et libère la mémoire.',
        expected: 'Show -> UserForm_Initialize (AddItem) -> ButtonOK_Click -> Unload Me',
        note: 'Toujours recopier les valeurs des contrôles dans la feuille avant d’exécuter Unload Me.'
      }
    ],
    tests: [
      { label: 'Question 1 — Méthode affichant le UserForm', stdin: 'q:1', expected: 'show||.show||frmclient.show' },
      { label: 'Question 2 — Méthode ajoutant à la ComboBox', stdin: 'q:2', expected: 'additem||.additem' },
      { label: 'Question 3 — Contrôle de saisie libre', stdin: 'q:3', expected: 'textbox||zone de texte' },
      { label: 'Question 4 — Méthode masquant en mémoire', stdin: 'q:4', expected: 'hide||.hide||me.hide' },
      { label: 'Question 5 — Effet de Unload Me', stdin: 'q:5', expected: 'decharge||décharge||le décharge||libère la mémoire||libere la memoire' }
    ],
    solution:
      '[Question 1 — Méthode affichant le UserForm à l\'écran]\n' +
      'Show\n\n' +
      '[Question 2 — Méthode ajoutant un élément à une ComboBox]\n' +
      'AddItem\n\n' +
      '[Question 3 — Contrôle de saisie libre de texte (Label ou TextBox)]\n' +
      'TextBox\n\n' +
      '[Question 4 — Méthode masquant le formulaire en gardant la mémoire (Hide ou Unload)]\n' +
      'Hide\n\n' +
      '[Question 5 — Effet de Unload Me sur la mémoire (decharge ou conserve)]\n' +
      'decharge',
    takeaway:
      '1) La méthode .Show (FrmClient.Show) charge et affiche le UserForm à l’écran.\n' +
      '2) La méthode .AddItem ajoute dynamiquement une option dans une ComboBox ou une ListBox lors de UserForm_Initialize().\n' +
      '3) Le contrôle TextBox (Zone de texte) permet la saisie libre, tandis que Label (Intitulé) affiche un texte fixe.\n' +
      '4) La méthode .Hide (Me.Hide) masque le formulaire tout en conservant les valeurs saisies en mémoire vive.\n' +
      '5) L’instruction Unload Me ferme le formulaire et le décharge complètement de la mémoire vive.'
  }
];

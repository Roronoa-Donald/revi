/**
 * Chapitres 1 à 3 du cours de Programmation VBA sous Excel — B1.
 *
 * Basé sur le support officiel B1 IT « Programmation VBA » (Dr TCHAZINO Tchamiè,
 * 47 pages, support1.pdf) :
 * - Chapitre 1 : Introduction à VBA, l'onglet Développeur, l'enregistreur de
 *                macros et l'éditeur VBE (Alt+F11).
 * - Chapitre 2 : Le Modèle Objet Excel (Application → Workbooks → Worksheets →
 *                Range / Cells).
 * - Chapitre 3 : Propriétés (Value, Formula, Interior.Color, Font.Bold),
 *                Méthodes (Select, ClearContents, Copy, AutoFit) et Événements
 *                (Workbook_Open, Worksheet_Change).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Introduction à VBA, l’onglet Développeur, l’enregistreur de macros et l’éditeur VBE (Alt+F11)',
    short: 'VBA, macros & VBE',
    toc: 'Automatiser Excel avec VBA ; activer l’onglet Développeur et le format .xlsm ; l’enregistreur de macros (PERSO.XLS, références absolues vs relatives) ; l’éditeur Visual Basic VBE (Alt+F11, Ctrl+R, F4, F5, F8) ; structure Sub...End Sub.',
    time: '≈ 2 h 30 de travail',
    free: true,

    situation:
      'Le support de cours du Dr TCHAZINO Tchamiè (support1.pdf, 47 pages) s’ouvre sur un constat quotidien : ' +
      'dans un service comptable ou financier, répéter chaque matin la même mise en forme de tableau, les mêmes ' +
      'tris et les mêmes calculs sur des dizaines de feuilles fait perdre du temps et multiplie les erreurs ' +
      'humaines. Une macro Excel — programme écrit en langage VBA (Visual Basic for Applications) — permet ' +
      'd’enregistrer ou de coder une fois pour toutes cette séquence d’actions pour l’exécuter d’un simple clic ' +
      'ou d’un raccourci clavier.',

    objectives: [
      'définir une macro et distinguer les deux modes de création : enregistrement automatique et écriture dans VBE ;',
      'activer l’onglet Développeur, configurer la sécurité des macros et choisir l’emplacement d’enregistrement (Ce classeur vs PERSO.XLS / PERSONAL.XLSB) ;',
      'différencier l’enregistrement en références absolues (Range("B2").Select) et en références relatives (ActiveCell.Offset) ;',
      'maîtriser l’environnement VBE (Alt+F11) : Explorateur de projets (Ctrl+R), fenêtre Propriétés (F4), fenêtre de code, exécution (F5) et pas à pas (F8) ;',
      'lire et modifier une procédure Sub...End Sub générée par l’enregistreur et chaîner des macros avec Call.'
    ],

    sections: [
      {
        title: 'Qu’est-ce qu’une macro VBA et comment activer l’onglet Développeur ?',
        html: [
          '<p>Une <strong>macro</strong> est une suite d’instructions regroupées dans une procédure en langage ' +
          '<strong>VBA (Visual Basic for Applications)</strong> qui s’exécute automatiquement à la demande de ' +
          'l’utilisateur pour accomplir une tâche répétitive dans Excel (mise en forme d’un rapport, import de ' +
          'données, contrôle de saisie, génération de factures). On crée une macro de deux manières complémentaires : ' +
          'soit par l’<strong>enregistreur automatique de macros</strong>, qui traduit en direct chaque geste ' +
          '(clic, saisie, formatage) en code VBA, soit en écrivant directement les instructions dans l’<strong>éditeur ' +
          'Visual Basic (VBE)</strong> lorsque l’on a besoin de variables, de boucles, de conditions ou de boîtes de dialogue.</p>',
          '<p>Par défaut, les commandes de programmation sont masquées dans le ruban d’Excel. Il faut d’abord afficher ' +
          'l’onglet <strong>Développeur</strong> (via <em>Fichier → Options → Personnaliser le ruban → cocher Développeur</em>, ' +
          'ou dans les versions antérieures via les options d’affichage du ruban). Un classeur contenant du code VBA doit ' +
          'impérativement être sauvegardé au format <strong>Classeur Excel prenant en charge les macros (<code>.xlsm</code> ' +
          'ou <code>.xls</code>)</strong> : enregistrer en <code>.xlsx</code> standard supprime toutes les macros du fichier.</p>',
          box('mnemo', 'Règle d’or de sécurité et d’enregistrement', 'pin',
            '    <p>Dans <em>Développeur → Sécurité des macros</em>, le niveau recommandé est <strong>Désactiver toutes les macros avec notification</strong> : Excel bloque l’exécution automatique à l’ouverture d’un fichier inconnu mais affiche un bandeau permettant d’activer le contenu si la source est sûre.</p>')
        ].join('\n')
      },
      {
        title: 'L’enregistreur de macros : nom, raccourci, PERSO.XLS et références absolues vs relatives',
        html: [
          '<p>Pour enregistrer une macro (<em>Développeur → Enregistrer une macro</em> ou <em>Outils → Macro → Nouvelle macro</em>), ' +
          'Excel ouvre une boîte de dialogue demandant quatre paramètres :</p>',
          '<ul>',
          '  <li><strong>Nom de la macro</strong> : commence obligatoirement par une lettre, sans espace ni caractère spécial (utiliser le souligné <code>_</code> ou la casse CamelCase, par ex. <code>Format_Entete</code> ou <code>ChangerStyleReference</code>).</li>',
          '  <li><strong>Touche de raccourci</strong> : une combinaison <code>Ctrl + lettre</code> (ou <code>Ctrl + Maj + lettre</code> pour éviter d’écraser un raccourci natif comme <code>Ctrl+C</code> ou <code>Ctrl+Z</code>).</li>',
          '  <li><strong>Enregistrer la macro dans</strong> : trois destinations possibles :' +
          '    <ul>' +
          '      <li><strong>Ce classeur</strong> : la macro n’est disponible que lorsque ce fichier précis est ouvert ;</li>' +
          '      <li><strong>Nouveau classeur</strong> : la macro est créée dans un classeur vierge ;</li>' +
          '      <li><strong>Classeur de macros personnelles (<code>PERSO.XLS</code> / <code>PERSONAL.XLSB</code>)</strong> : classeur caché chargé automatiquement au démarrage d’Excel, rendant la macro accessible depuis <strong>tous les classeurs</strong> du poste.</li>' +
          '    </ul>' +
          '  </li>',
          '  <li><strong>Description</strong> : commentaire libre documentant l’auteur, la date et le rôle de la macro.</li>',
          '</ul>',
          '<p>Dès que l’on clique sur OK, chaque action est traduite en VBA jusqu’au clic sur <strong>Arrêter l’enregistrement</strong>. ' +
          'Le support insiste sur une distinction fondamentale lors de la sélection des cellules pendant l’enregistrement :</p>',
          '<ul>',
          '  <li><strong>Enregistrement en références absolues (par défaut)</strong> : si vous cliquez sur la cellule <code>B2</code>, l’enregistreur écrit <code>Range("B2").Select</code>. À chaque exécution future, la macro retournera invariablement sur <code>B2</code>, quelle que soit la cellule sélectionnée au départ.</li>',
          '  <li><strong>Enregistrement en références relatives (bouton « Utiliser les références relatives » activé)</strong> : Excel enregistre le déplacement par rapport à la cellule active au moyen de la propriété <code>Offset</code>. Descendre de 2 lignes et aller 1 colonne à droite génère <code>ActiveCell.Offset(2, 1).Range("A1").Select</code>. La macro peut alors être rejouée à partir de n’importe quelle ligne du tableau.</li>',
          '</ul>',
          box('pitfall', 'Pièges fréquents avec l’enregistreur de macros', 'warning',
            '    <ul>\n' +
            '      <li>Oublier de cliquer sur <strong>Arrêter l’enregistrement</strong> : tous vos clics d’exploration suivants continuent d’alourdir la macro.</li>\n' +
            '      <li>Enregistrer un formatage de ligne en références absolues alors qu’on souhaite l’appliquer sur la ligne courante sélectionnée par l’utilisateur.</li>\n' +
            '      <li>Remplacer par mégarde <code>Ctrl+C</code> (copier) ou <code>Ctrl+S</code> (enregistrer) comme raccourci clavier de la macro.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'L’éditeur Visual Basic (VBE — Alt+F11) et l’anatomie d’une procédure Sub',
        html: [
          '<p>Le raccourci universel <strong><code>Alt+F11</code></strong> bascule instantanément entre la feuille Excel et ' +
          'l’<strong>éditeur Visual Basic (VBE — Visual Basic Editor)</strong>. L’interface VBE s’articule autour de trois fenêtres essentielles :</p>',
          '<ul>',
          '  <li><strong>L’Explorateur de projets (<code>Ctrl+R</code>)</strong> : affiche l’arborescence de chaque classeur ouvert (<code>VBAProject</code>) avec ses dossiers : <em>Microsoft Excel Objects</em> (les feuilles <code>Feuil1</code>, <code>Feuil2</code> et l’objet classeur <code>ThisWorkbook</code>), le dossier <em>Modules</em> (<code>Module1</code>, <code>Module2</code>… où l’enregistreur place le code standard, ou créés via <em>Insertion → Module</em>) et le dossier <em>Feuilles</em> (contenant les formulaires <code>UserForm</code>).</li>',
          '  <li><strong>La fenêtre Propriétés (<code>F4</code>)</strong> : affiche les attributs de l’élément sélectionné dans l’Explorateur (par exemple la propriété <code>(Name)</code> permettant de renommer <code>Module1</code> en <code>Mod_Facturation</code>).</li>',
          '  <li><strong>La fenêtre de code (double-clic sur un module ou <code>F7</code>)</strong> : zone d’édition dotée d’une coloration syntaxique immédiate — les <strong>commentaires</strong> (précédés d’une apostrophe <code>\'</code>) s’affichent en <strong>vert</strong>, les <strong>mots-clés réservés VBA</strong> (<code>Sub</code>, <code>End Sub</code>, <code>Dim</code>, <code>With</code>) en <strong>bleu</strong>, le code courant en <strong>noir</strong> et les lignes comportant une <strong>erreur de syntaxe</strong> en <strong>rouge</strong>.</li>',
          '</ul>',
          '<p>Toute macro enregistrée prend la forme d’une procédure délimitée par <code>Sub NomMacro()</code> et <code>End Sub</code>. ' +
          'Par exemple, le premier TP du support bascule le style de référence d’Excel en notation L1C1 :</p>',
          '<pre><code>Sub ChangerStyleReference()\n' +
          '\' Macro enregistrée par Dr TCHAZINO Tchamiè\n' +
          '\' Bascule la grille Excel en style L1C1 (Ligne / Colonne)\n' +
          '    Application.ReferenceStyle = xlR1C1\n' +
          'End Sub\n\n' +
          'Sub RetablirStyleA1()\n' +
          '    Application.ReferenceStyle = xlA1\n' +
          '    Call AfficherConfirmation\n' +
          'End Sub</code></pre>',
          '<p>Depuis VBE, la touche <strong><code>F5</code></strong> (ou le bouton lecture vert) exécute la procédure entière d’un trait, ' +
          'tandis que la touche <strong><code>F8</code></strong> exécute la macro <strong>pas à pas détaillé</strong> (ligne par ligne, surlignée en jaune), ' +
          'ce qui permet d’observer en temps réel l’effet de chaque instruction sur la feuille Excel. Enfin, l’instruction ' +
          '<code>Call AutreMacro</code> (ou simplement le nom <code>AutreMacro</code>) permet d’appeler une procédure depuis une autre.</p>'
        ].join('\n')
      }
    ],

    questions: [
      {
        q: 'Quel raccourci clavier permet d’ouvrir directement l’éditeur Visual Basic (VBE) depuis Excel ?',
        opts: ['Alt+F11', 'Ctrl+R', 'Alt+F8', 'F4'],
        correct: 0,
        exp: 'Alt+F11 bascule entre Excel et l’éditeur VBE. Alt+F8 ouvre la boîte de dialogue de lancement des macros, Ctrl+R affiche l’Explorateur de projets dans VBE et F4 ouvre la fenêtre Propriétés.'
      },
      {
        q: 'Dans quel emplacement faut-il enregistrer une macro pour qu’elle soit disponible dans tous les classeurs Excel ouverts sur l’ordinateur ?',
        opts: [
          'Ce classeur',
          'Le classeur de macros personnelles (PERSO.XLS / PERSONAL.XLSB)',
          'Un nouveau classeur vierge (.xlsx)',
          'Le module événementiel Feuil1'
        ],
        correct: 1,
        exp: 'Le classeur de macros personnelles (PERSO.XLS ou PERSONAL.XLSB) est un classeur masqué chargé automatiquement au démarrage d’Excel, ce qui rend ses macros accessibles depuis n’importe quel classeur.'
      },
      {
        q: 'Lors de l’enregistrement d’une macro en références relatives, quelle instruction VBA traduit un déplacement de 2 lignes vers le bas et 1 colonne vers la droite ?',
        opts: [
          'Range("B3").Select',
          'Cells(1, 2).Select',
          'ActiveCell.Offset(2, 1).Range("A1").Select',
          'ActiveSheet.Move(2, 1)'
        ],
        correct: 2,
        exp: 'En références relatives, l’enregistreur utilise ActiveCell.Offset(décalage_lignes, décalage_colonnes) : Offset(2, 1) descend de 2 lignes (+2) et décale d’1 colonne à droite (+1).'
      },
      {
        q: 'Dans la fenêtre de code de l’éditeur VBE, par quel caractère commence un commentaire (affiché en vert et ignoré à l’exécution) ?',
        opts: [
          'Le double slash //',
          'Le symbole dièse #',
          'Le point-virgule ;',
          'L’apostrophe simple \''
        ],
        correct: 3,
        exp: 'En VBA, toute ligne ou fin de ligne précédée d’une apostrophe simple (\') ou du mot-clé historique Rem est un commentaire affiché en vert par l’éditeur VBE.'
      },
      {
        q: 'Quelle touche de fonction permet d’exécuter une macro instruction par instruction (pas à pas détaillé) dans VBE pour observer son comportement ?',
        opts: ['F8', 'F5', 'F2', 'F4'],
        correct: 0,
        exp: 'F8 exécute la procédure ligne par ligne en surlignant en jaune l’instruction courante. F5 exécute toute la macro d’un coup, F2 ouvre l’Explorateur d’objets et F4 ouvre la fenêtre Propriétés.'
      },
      {
        q: 'Où l’enregistreur de macros stocke-t-il le code VBA des macros enregistrées dans un classeur ?',
        opts: [
          'Dans un formulaire UserForm',
          'Dans un module standard du dossier Modules (Module1, Module2…)',
          'Dans une cellule cachée de la feuille active',
          'Dans la barre de formule d’Excel'
        ],
        correct: 1,
        exp: 'L’enregistreur crée automatiquement un dossier Modules dans le projet VBA du classeur et y place la procédure Sub...End Sub à l’intérieur d’un module standard (Module1).'
      },
      {
        q: 'Parmi les noms suivants, lequel est un nom de macro VBA syntaxiquement valide ?',
        opts: [
          '1_CalculerTotal',
          'Calculer Total Mensuel',
          'Calculer_Total_Mensuel',
          'Calculer-Total'
        ],
        correct: 2,
        exp: 'Un nom de macro VBA doit commencer par une lettre et ne comporter ni espace ni trait d’union (interprété comme le signe moins) ; le caractère souligné (_) est autorisé.'
      },
      {
        q: 'Que fait l’instruction VBA Application.ReferenceStyle = xlR1C1 étudiée dans le support de cours ?',
        opts: [
          'Elle efface la ligne 1 et la colonne 1 de la feuille active',
          'Elle sélectionne la cellule A1 du premier classeur',
          'Elle verrouille les références absolues dans les formules',
          'Elle bascule l’affichage des en-têtes d’Excel en style de référence L1C1 (numéros de lignes et de colonnes)'
        ],
        correct: 3,
        exp: 'Application.ReferenceStyle = xlR1C1 active l’option « Style de référence L1C1 » d’Excel (et xlA1 rétablit les lettres de colonnes A, B, C).'
      }
    ],

    pitfalls: [
      'Enregistrer un classeur contenant des macros au format .xlsx au lieu de .xlsm : tout le code VBA est perdu à la fermeture.',
      'Laisser l’enregistreur en références absolues quand on veut une macro applicable à n’importe quelle ligne sélectionnée.',
      'Mettre des espaces ou commencer par un chiffre dans le nom d’une procédure Sub.',
      'Confondre F5 (exécution complète immédiate) et F8 (exécution pas à pas ligne par ligne).'
    ],

    methodTitle: 'Méthode — réussir sa première macro en 4 étapes',
    method: [
      'Définir si les déplacements doivent viser des cellules fixes (références absolues) ou partir de la cellule active (références relatives).',
      'Lancer l’enregistreur avec un nom explicite sans espace, choisir Ce classeur ou PERSO.XLS, réaliser les gestes sans clic superflu puis arrêter l’enregistrement.',
      'Ouvrir VBE avec Alt+F11, localiser la procédure dans Modules → Module1 (Ctrl+R) et commenter le code avec une apostrophe \'.',
      'Tester la macro en mode pas à pas avec F8 en observant côte à côte la fenêtre VBE et la feuille Excel.'
    ],

    summary: [
      'Une macro est une procédure VBA (Sub...End Sub) qui automatise une suite d’actions dans Excel.',
      'L’enregistreur traduit les gestes en code VBA dans un module standard (Module1) ; PERSO.XLS rend une macro disponible dans tous les classeurs.',
      'En références absolues, VBA cible Range("B2") ; en références relatives, il utilise ActiveCell.Offset(lig, col).',
      'VBE (Alt+F11) réunit l’Explorateur de projets (Ctrl+R), la fenêtre Propriétés (F4) et la fenêtre de code (F5 exécuter, F8 pas à pas).'
    ],

    checklist: [
      'Je sais activer l’onglet Développeur et enregistrer un classeur en .xlsm.',
      'Je sais choisir entre Ce classeur et PERSO.XLS lors de l’enregistrement.',
      'Je sais expliquer la différence entre Range("B2").Select et ActiveCell.Offset(2, 1).',
      'Je sais ouvrir VBE (Alt+F11), lire un Sub...End Sub et déboguer avec F8.'
    ],

    notions: [
      '<strong>VBA (Visual Basic for Applications)</strong> : langage de programmation intégré aux applications Microsoft Office.',
      '<strong>Enregistreur de macros</strong> : outil traduisant les actions de l’utilisateur à l’écran en instructions VBA.',
      '<strong>PERSO.XLS / PERSONAL.XLSB</strong> : classeur de macros personnelles masqué, chargé à chaque ouverture d’Excel.',
      '<strong>Références relatives</strong> : mode d’enregistrement générant des déplacements <code>ActiveCell.Offset(lignes, colonnes)</code>.',
      '<strong>VBE (<code>Alt+F11</code>)</strong> : environnement de développement intégré (Visual Basic Editor).',
      '<strong>Explorateur de projets (<code>Ctrl+R</code>)</strong> : arborescence des objets Excel, modules standards et UserForms.',
      '<strong>Procédure <code>Sub...End Sub</code></strong> : bloc d’instructions exécutables formant une macro.',
      '<strong>Pas à pas détaillé (<code>F8</code>)</strong> : exécution ligne par ligne d’une macro pour le débogage.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends la différence entre références absolues/relatives et les raccourcis VBE.' },
      { cls: 'mid', text: '50–69 % — vérifie le rôle de PERSO.XLS et l’organisation de l’Explorateur de projets.' },
      { cls: 'good', text: '70–94 % — bon niveau, entraîne-toi sur les 3 études de cas du chapitre.' },
      { cls: 'top', text: '≥ 95 % — maîtrise complète de l’environnement VBA et de l’enregistreur.' }
    ],

    flashcards: [
      { q: 'Raccourci pour ouvrir l’éditeur VBE ?', a: 'Alt+F11 (et dans VBE : Ctrl+R pour l’Explorateur de projets, F4 pour la fenêtre Propriétés, F2 pour l’Explorateur d’objets).' },
      { q: 'Différence entre Ce classeur et PERSO.XLS ?', a: 'Ce classeur limite la macro au fichier courant ; PERSO.XLS (classeur de macros personnelles caché) rend la macro disponible dans tous les classeurs d’Excel.' },
      { q: 'Référence absolue vs référence relative dans l’enregistreur ?', a: 'Absolue (défaut) : Range("B2").Select cible toujours B2. Relative : ActiveCell.Offset(lig, col) se déplace à partir de la cellule active.' },
      { q: 'Code couleur dans l’éditeur VBE ?', a: 'Vert = commentaire (commence par \') ; Bleu = mot-clé réservé (Sub, Dim, End Sub) ; Noir = code normal ; Rouge = erreur de syntaxe.' },
      { q: 'Différence entre F5 et F8 dans VBE ?', a: 'F5 exécute toute la macro d’un seul trait ; F8 exécute la macro pas à pas (ligne par ligne) pour le débogage.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Le Modèle Objet Excel (Application → Workbooks → Worksheets → Range / Cells)',
    short: 'Modèle Objet Excel',
    toc: 'Hiérarchie des objets Excel ; Objets et Collections (index vs nom) ; ActiveWorkbook vs ThisWorkbook ; référencer les plages avec Range, Cells(ligne, colonne), Rows, Columns et Offset ; l’Explorateur d’objets (F2).',
    time: '≈ 2 h 30 de travail',
    free: false,

    situation:
      'Dès que l’on ouvre le code généré par l’enregistreur de macros, on découvre des expressions séparées par ' +
      'des points : Application.Workbooks("Bilan.xlsm").Worksheets("Janvier").Range("B4"). Pour écrire ses propres ' +
      'macros sans se tromper de classeur ni de feuille, il faut comprendre comment Excel organise tous ses ' +
      'composants sous forme d’une hiérarchie d’objets emboîtés : le Modèle Objet Excel.',

    objectives: [
      'parcourir la hiérarchie descendante Application → Workbooks → Worksheets → Range / Cells ;',
      'distinguer un objet individuel (Workbook, Worksheet) de sa collection (Workbooks, Worksheets, Sheets) et cibler par nom ou par index ;',
      'différencier sans jamais les confondre ActiveWorkbook et ThisWorkbook, ainsi que ActiveSheet et ActiveCell ;',
      'adresser n’importe quelle zone avec Range("A1:B10"), Cells(ligne, colonne), Rows, Columns et Offset(lig, col) ;',
      'chercher une classe ou un membre dans l’Explorateur d’objets de VBE (touche F2).'
    ],

    sections: [
      {
        title: 'La hiérarchie du Modèle Objet Excel et la notion de Collection',
        html: [
          '<p>En VBA, chaque élément manipulable d’Excel (l’application, un classeur, une feuille, une cellule, un ' +
          'graphique, une police) est un <strong>objet</strong>. Ces objets sont rangés selon une arborescence stricte ' +
          'où l’on descend du conteneur le plus général vers l’élément le plus précis en séparant chaque niveau par un <strong>point (<code>.</code>)</strong> :</p>',
          '<pre><code>Application → Workbooks("Ventes.xlsm") → Worksheets("Togo") → Range("C5")</code></pre>',
          '<ul>',
          '  <li><strong><code>Application</code></strong> : la racine de la hiérarchie, qui représente le programme Microsoft Excel lui-même (ses options globales, sa barre d’état, le rafraîchissement d’écran).</li>',
          '  <li><strong><code>Workbooks</code></strong> : la <strong>collection</strong> de tous les classeurs actuellement ouverts dans Excel. Chaque élément est un objet <code>Workbook</code>.</li>',
          '  <li><strong><code>Worksheets</code></strong> : la collection des feuilles de calcul d’un classeur (chaque élément est un objet <code>Worksheet</code>). La collection plus large <strong><code>Sheets</code></strong> regroupe à la fois les feuilles de calcul (<code>Worksheets</code>) et les feuilles graphiques (<code>Charts</code>).</li>',
          '  <li><strong><code>Range</code> / <code>Cells</code></strong> : représente une cellule unique, une ligne, une colonne ou une plage de cellules à l’intérieur d’une feuille de calcul.</li>',
          '</ul>',
          '<p>Une <strong>collection</strong> (toujours écrite au pluriel) s’interroge de deux façons : soit par le ' +
          '<strong>nom entre guillemets</strong> — <code>Worksheets("Facture")</code> —, soit par le <strong>numéro d’index</strong> ' +
          '(à partir de 1) — <code>Worksheets(1)</code> désigne la première feuille en partant de la gauche dans la barre d’onglets. ' +
          'Cibler par le nom est plus robuste si l’utilisateur réorganise l’ordre des onglets.</p>',
          box('mnemo', 'Racine implicite et raccourcis contextuels', 'pin',
            '    <p>Si vous écrivez simplement <code>Range("A1").Value = 100</code> sans préciser le classeur ni la feuille, VBA applique automatiquement la instruction à la feuille active (<strong><code>ActiveSheet</code></strong>) du classeur actif au premier plan (<strong><code>ActiveWorkbook</code></strong>). En revanche, <strong><code>ThisWorkbook</code></strong> désigne toujours le classeur qui porte le code VBA en cours d’exécution, même si un autre fichier est affiché à l’écran.</p>')
        ].join('\n')
      },
      {
        title: 'Cibler les cellules : Range, Cells(ligne, colonne), Rows, Columns et Offset',
        html: [
          '<p>Le support du Dr TCHAZINO Tchamiè détaille cinq constructions complémentaires pour désigner des cellules dans une feuille :</p>',
          '<table>',
          '  <thead><tr><th>Syntaxe VBA</th><th>Ce qu’elle désigne</th><th>Usage privilégié</th></tr></thead>',
          '  <tbody>',
          '    <tr><td><code>Range("B3")</code></td><td>La cellule unique B3</td><td>Accès direct à une cellule fixe connue</td></tr>',
          '    <tr><td><code>Range("A1:D10")</code></td><td>La plage rectangulaire continue de A1 à D10 (40 cellules)</td><td>Mise en forme ou effacement d’un bloc</td></tr>',
          '    <tr><td><code>Range("A1:A5,C1:C5")</code></td><td>Deux plages disjointes (virgule séparatrice entre guillemets)</td><td>Sélection multiple non contiguë</td></tr>',
          '    <tr><td><code>Cells(ligne, colonne)</code><br>ex. <code>Cells(4, 2)</code> ou <code>Cells(4, "B")</code></td><td>La cellule située à la <strong>ligne 4, colonne 2</strong>, soit <strong>B4</strong> (<code>Cells</code> seul désigne toutes les cellules de la feuille)</td><td>Parcours par boucle avec des variables <code>Cells(i, j)</code></td></tr>',
          '    <tr><td><code>Rows(3)</code> / <code>Rows("3:6")</code><br><code>Columns(2)</code> / <code>Columns("B:D")</code></td><td>La ligne 3 (ou les lignes 3 à 6) ; la colonne B (ou B à D)</td><td>Suppression, insertion ou ajustement (<code>AutoFit</code>) de lignes/colonnes</td></tr>',
          '    <tr><td><code>ActiveCell.Offset(lig, col)</code><br>ex. <code>Range("C5").Offset(-1, 2)</code></td><td>La cellule décalée de <code>lig</code> lignes et <code>col</code> colonnes (ici : ligne 4, colonne E soit <strong>E4</strong>)</td><td>Déplacement relatif autour d’une cellule pivot</td></tr>',
          '  </tbody>',
          '</table>',
          box('pitfall', 'L’inversion classique entre Range("B4") et Cells(4, 2)', 'warning',
            '    <ul>\n' +
            '      <li>Dans <code>Range("B4")</code>, on écrit la <strong>colonne (B) puis la ligne (4)</strong> comme dans une formule Excel.</li>\n' +
            '      <li>Dans <code>Cells(4, 2)</code>, on passe <strong>d’abord le numéro de ligne (4), puis le numéro de colonne (2)</strong> ! Écrire <code>Cells(2, 4)</code> cible D2 et non B2.</li>\n' +
            '      <li>Dans <code>Offset(lignes, colonnes)</code>, un nombre positif descend (lignes) ou va à droite (colonnes) ; un nombre négatif remonte ou va à gauche ; <code>0</code> reste sur la même ligne ou colonne.</li>\n' +
            '    </ul>')
        ].join('\n')
      },
      {
        title: 'Selection vs ActiveCell et l’Explorateur d’objets (F2)',
        html: [
          '<p>Lorsque l’utilisateur sélectionne une plage de plusieurs cellules (par exemple <code>B2:D6</code>), ' +
          'deux objets coexistent : <strong><code>Selection</code></strong> représente l’intégralité des 15 cellules ' +
          'sélectionnées, tandis que <strong><code>ActiveCell</code></strong> désigne l’unique cellule active (celle qui ' +
          'reste sur fond clair à l’intérieur de la sélection, en général <code>B2</code>, où s’effectue la saisie au clavier).</p>',
          '<p>Pour explorer les centaines d’objets disponibles sans les apprendre par cœur, l’éditeur VBE intègre ' +
          'l’<strong>Explorateur d’objets</strong> accessible par la touche <strong><code>F2</code></strong> (ou <em>Affichage → Explorateur d’objets</em>). ' +
          'En filtrant sur la bibliothèque <code>Excel</code> ou <code>VBA</code>, on y visualise pour chaque classe ' +
          '(<code>Workbook</code>, <code>Worksheet</code>, <code>Range</code>) la liste complète de ses propriétés ' +
          '(icône main tenant une fiche), de ses méthodes (icône brique verte en mouvement) et de ses événements (icône éclair jaune).</p>'
        ].join('\n')
      }
    ],

    questions: [
      {
        q: 'Quel est l’ordre exact de la hiérarchie du Modèle Objet Excel, du plus général au plus précis ?',
        opts: [
          'Application → Workbooks → Worksheets → Range',
          'Workbooks → Application → Range → Worksheets',
          'Application → Worksheets → Workbooks → Cells',
          'Range → Worksheets → Workbooks → Application'
        ],
        correct: 0,
        exp: 'La racine est Application (Excel), qui contient la collection Workbooks (classeurs), dont chaque Workbook contient Worksheets (feuilles), qui contiennent les objets Range / Cells.'
      },
      {
        q: 'Quelle cellule de la feuille active est désignée par l’expression VBA Cells(5, 2) ?',
        opts: [
          'La cellule E2',
          'La cellule B5',
          'La cellule B2',
          'La cellule E5'
        ],
        correct: 1,
        exp: 'Cells(ligne, colonne) prend le numéro de ligne en premier (5) et le numéro de colonne en second (colonne 2 = B), ce qui correspond à la cellule B5.'
      },
      {
        q: 'Quelle est la différence entre ActiveWorkbook et ThisWorkbook en VBA ?',
        opts: [
          'Aucune, ce sont deux synonymes exacts',
          'ActiveWorkbook désigne PERSO.XLS alors que ThisWorkbook désigne un fichier .xlsx',
          'ActiveWorkbook est le classeur actuellement au premier plan, tandis que ThisWorkbook est le classeur qui contient la macro en cours d’exécution',
          'ThisWorkbook ne peut contenir qu’une seule feuille de calcul'
        ],
        correct: 2,
        exp: 'Si une macro ouvre un second fichier de données, ce second fichier devient ActiveWorkbook, mais ThisWorkbook continue de pointer de façon fiable vers le classeur qui héberge le code VBA.'
      },
      {
        q: 'Si la cellule active (ActiveCell) est C4, quelle cellule est ciblée par ActiveCell.Offset(-1, 2) ?',
        opts: [
          'La cellule B6',
          'La cellule D3',
          'La cellule A5',
          'La cellule E3'
        ],
        correct: 3,
        exp: 'À partir de C4 (ligne 4, colonne 3) : -1 sur les lignes remonte à la ligne 3 ; +2 sur les colonnes avance de C (3) vers E (5). On cible donc la cellule E3.'
      },
      {
        q: 'Quelle syntaxe VBA permet de sélectionner simultanément les deux plages non adjacentes A1:A5 et C1:C5 ?',
        opts: [
          'Range("A1:A5,C1:C5").Select',
          'Range("A1:A5;C1:C5").Select',
          'Cells("A1:A5", "C1:C5").Select',
          'Range("A1:C5").Offset(0, 2).Select'
        ],
        correct: 0,
        exp: 'En VBA (syntaxe anglo-saxonne), l’union de plusieurs plages dans une chaîne Range("...") utilise la virgule comme séparateur : Range("A1:A5,C1:C5").'
      },
      {
        q: 'Quelle est la différence entre les collections Worksheets et Sheets d’un classeur ?',
        opts: [
          'Sheets ne contient que les feuilles masquées',
          'Worksheets ne contient que les feuilles de calcul, tandis que Sheets inclut aussi les feuilles graphiques (Charts)',
          'Worksheets commence à l’index 0 alors que Sheets commence à l’index 1',
          'Sheets désigne uniquement les onglets d’un autre classeur fermé'
        ],
        correct: 1,
        exp: 'La collection Worksheets regroupe exclusivement les feuilles de calcul (grilles), alors que la collection Sheets regroupe toutes les feuilles du classeur, y compris les feuilles de graphiques (Charts).'
      },
      {
        q: 'Dans l’éditeur VBE, quelle touche de fonction ouvre l’Explorateur d’objets permettant de consulter toutes les classes, propriétés et méthodes d’Excel ?',
        opts: ['F4', 'F8', 'F2', 'F5'],
        correct: 2,
        exp: 'La touche F2 ouvre l’Explorateur d’objets dans VBE (F4 ouvre la fenêtre Propriétés, F5 exécute la macro et F8 lance le pas à pas).'
      },
      {
        q: 'Que désigne l’instruction Worksheets(1) dans un classeur Excel ?',
        opts: [
          'Toujours la feuille qui porte le nom "Feuil1", même si elle a été déplacée en dernière position',
          'La feuille active au moment de l’exécution',
          'La première cellule de la feuille courante',
          'La première feuille de calcul en partant de la gauche dans la barre d’onglets du classeur'
        ],
        correct: 3,
        exp: 'Un index numérique Worksheets(1) désigne la feuille selon sa position physique dans la barre d’onglets (1 = la plus à gauche), quel que soit son nom.'
      }
    ],

    pitfalls: [
      'Inverser ligne et colonne dans Cells(ligne, colonne) en pensant à la notation A1 (colonne puis ligne).',
      'Utiliser un point-virgule Range("A1:A5;C1:C5") au lieu d’une virgule Range("A1:A5,C1:C5") dans le code VBA.',
      'Se fier à Worksheets(1) dans un classeur où les utilisateurs déplacent les onglets : préférer Worksheets("NomFeuille").',
      'Confondre ActiveWorkbook et ThisWorkbook lorsqu’une macro manipule plusieurs fichiers ouverts.'
    ],

    methodTitle: 'Méthode — construire une référence d’objet sans erreur',
    method: [
      'Identifier le classeur cible : ThisWorkbook (celui de la macro), ActiveWorkbook, ou Workbooks("Nom.xlsm").',
      'Identifier la feuille cible par son nom d’onglet : .Worksheets("Janvier").',
      'Choisir Range("A1:B10") pour une plage fixe ou Cells(i, j) lorsque le numéro de ligne i varie dans une boucle.',
      'Utiliser .Offset(dLig, dCol) pour lire ou écrire dans une colonne voisine à partir d’une cellule repère.'
    ],

    summary: [
      'Le Modèle Objet Excel suit la hiérarchie Application → Workbooks → Worksheets → Range / Cells.',
      'Une collection (au pluriel) s’indexe par position Worksheets(1) ou par nom Worksheets("Ventes").',
      'Cells(ligne, colonne) place toujours la ligne avant la colonne (Cells(3, 2) = B3).',
      'Offset(lig, col) permet de se décaler relativement (+ descend/droite, - remonte/gauche, 0 sur place).'
    ],

    checklist: [
      'Je sais écrire le chemin complet d’une cellule depuis Application jusqu’à Range.',
      'Je sais convertir instantanément Cells(ligne, col) en notation A1 et inversement.',
      'Je sais calculer la cellule atteinte par ActiveCell.Offset(lig, col).',
      'Je sais expliquer pourquoi ThisWorkbook est plus sûr qu’ActiveWorkbook.'
    ],

    notions: [
      '<strong>Modèle Objet Excel</strong> : représentation hiérarchique des composants d’Excel manipulables en VBA.',
      '<strong>Collection</strong> : ensemble ordonné d’objets de même type (<code>Workbooks</code>, <code>Worksheets</code>, <code>Cells</code>).',
      '<strong><code>ThisWorkbook</code> vs <code>ActiveWorkbook</code></strong> : classeur porteur de la macro vs classeur au premier plan.',
      '<strong><code>Range("A1:B4")</code></strong> : objet représentant une cellule, une plage continue ou une sélection multiple.',
      '<strong><code>Cells(ligne, colonne)</code></strong> : adressage matriciel (ligne d’abord, colonne ensuite).',
      '<strong><code>Offset(lignes, colonnes)</code></strong> : propriété renvoyant une plage décalée par rapport à la plage de départ.',
      '<strong><code>Selection</code> vs <code>ActiveCell</code></strong> : plage totale sélectionnée vs cellule active unique de saisie.',
      '<strong>Explorateur d’objets (<code>F2</code>)</strong> : catalogue intégré à VBE listant toutes les classes et leurs membres.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — revois la hiérarchie Application → Workbooks → Worksheets → Range et l’ordre de Cells(ligne, col).' },
      { cls: 'mid', text: '50–69 % — entraîne-toi sur les calculs de déplacement Offset(lig, col) positifs et négatifs.' },
      { cls: 'good', text: '70–94 % — bon niveau, vérifie la distinction ThisWorkbook / ActiveWorkbook.' },
      { cls: 'top', text: '≥ 95 % — maîtrise solide du Modèle Objet Excel.' }
    ],

    flashcards: [
      { q: 'Hiérarchie des 4 grands niveaux du Modèle Objet Excel ?', a: 'Application → Workbooks (classeurs) → Worksheets (feuilles de calcul) → Range / Cells (cellules).' },
      { q: 'Quelle cellule désigne Cells(4, 3) ?', a: 'C4 : ligne 4 et colonne 3 (C). Dans Cells(ligne, colonne), la ligne vient toujours en premier.' },
      { q: 'Différence entre ThisWorkbook et ActiveWorkbook ?', a: 'ThisWorkbook est le classeur qui contient le code VBA exécuté ; ActiveWorkbook est le classeur actuellement affiché au premier plan.' },
      { q: 'Partant de B3, quelle cellule désigne Range("B3").Offset(2, -1) ?', a: 'A5 : +2 lignes fait passer de la ligne 3 à la ligne 5 ; -1 colonne fait reculer de la colonne B à la colonne A.' },
      { q: 'Comment désigner toutes les cellules d’une feuille ou ajuster la colonne B ?', a: 'Cells (sans argument) désigne toutes les cellules de la feuille ; Columns("B") ou Columns(2) désigne la colonne B entière.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Propriétés (Value, Formula, Interior.Color, Font.Bold), Méthodes (Select, ClearContents, Copy, AutoFit) et Événements (Workbook_Open, Worksheet_Change)',
    short: 'Propriétés, Méthodes & Événements',
    toc: 'Distinguer Propriété (attribut =) et Méthode (action) ; Value, Formula, Font.Bold, Interior.Color/ColorIndex ; Select, Clear vs ClearContents, Copy, AutoFit ; bloc With...End With et WorksheetFunction ; événements Workbook_Open et Worksheet_Change(Target).',
    time: '≈ 3 h de travail',
    free: false,

    situation:
      'Maintenant que nous savons désigner précisément un classeur, une feuille ou une plage de cellules, ' +
      'que pouvons-nous faire dessus ? En VBA, on agit sur un objet de trois façons : lire ou modifier ses ' +
      'caractéristiques (ses Propriétés), lui ordonner d’exécuter une action (ses Méthodes), ou programmer une ' +
      'réaction automatique lorsqu’un événement survient sur le classeur ou la feuille (les Événements).',

    objectives: [
      'distinguer syntaxiquement et conceptuellement une Propriété (attribut affecté avec =) d’une Méthode (action exécutée sur l’objet) ;',
      'manipuler les propriétés clés de Range : Value, Formula, Count, Row, Column, Font (Bold, Size, Color) et Interior (Color, ColorIndex) ;',
      'utiliser les méthodes essentielles : Select, Activate, Clear vs ClearContents vs ClearFormats, Copy, Delete, Insert, AutoFit ;',
      'factoriser le code avec With...End With et appeler les fonctions Excel via Application.WorksheetFunction ;',
      'écrire des procédures événementielles Workbook_Open (dans ThisWorkbook) et Worksheet_Change(ByVal Target As Range) (dans une feuille).'
    ],

    sections: [
      {
        title: 'Propriétés : lire et modifier les caractéristiques d’un objet (Value, Formula, Font, Interior)',
        html: [
          '<p>Une <strong>propriété</strong> est un attribut (une caractéristique) d’un objet que l’on peut ' +
          '<strong>lire</strong> ou <strong>modifier</strong> à l’aide de l’opérateur d’affectation <code>=</code> ' +
          '(syntaxe : <code>Objet.Propriete = Valeur</code>). Certaines propriétés sont en <em>lecture/écriture</em> ' +
          '(comme <code>Value</code> ou <code>Name</code>), tandis que d’autres sont en <em>lecture seule</em> ' +
          '(comme <code>Count</code>, <code>Row</code>, <code>Column</code> ou <code>Address</code>).</p>',
          '<ul>',
          '  <li><strong><code>Value</code></strong> : contient la valeur de la cellule (propriété par défaut de <code>Range</code>). Ex. : <code>Range("B2").Value = 15000</code> ou <code>montant = Range("B2").Value</code>.</li>',
          '  <li><strong><code>Formula</code> et <code>FormulaLocal</code></strong> : <code>Formula</code> injecte une formule en syntaxe anglaise avec séparateur virgule (ex. <code>Range("C2").Formula = "=SUM(A2:B2)"</code>), tandis que <code>FormulaLocal</code> utilise les noms de fonctions de la langue d’Excel installée (ex. <code>"=SOMME(A2:B2)"</code>).</li>',
          '  <li><strong>Mise en forme de la police (sous-objet <code>Font</code>)</strong> : <code>Range("A1").Font.Bold = True</code> (gras), <code>.Font.Italic = True</code> (italique), <code>.Font.Size = 14</code> (taille), <code>.Font.Name = "Calibri"</code>, <code>.Font.Color = RGB(255, 0, 0)</code> (texte rouge).</li>',
          '  <li><strong>Couleur de fond de cellule (sous-objet <code>Interior</code>)</strong> : <code>Range("A1:D1").Interior.Color = RGB(220, 240, 255)</code> ou via la palette de 56 couleurs d’Excel <code>Range("A1").Interior.ColorIndex = 6</code> (jaune). Pour retirer la couleur de fond : <code>.Interior.ColorIndex = xlNone</code>.</li>',
          '  <li><strong>Propriétés de feuille et d’application</strong> : <code>Worksheets(1).Name = "Bilan_2026"</code> renomme l’onglet ; <code>Worksheets("Calculs").Visible = False</code> masque la feuille ; <code>Application.ScreenUpdating = False</code> fige le rafraîchissement de l’écran pendant l’exécution d’une macro lourde (ce qui l’accélère considérablement et évite le scintillement).</li>',
          '</ul>',
          box('mnemo', 'Écrire directement dans .Value sans passer par .Select', 'pin',
            '    <p>L’enregistreur de macros génère deux lignes : <code>Range("B2").Select</code> puis <code>ActiveCell.FormulaR1C1 = "100"</code>. En vrai code VBA professionnel, on écrit directement en une seule ligne <strong><code>Range("B2").Value = 100</code></strong> sans déplacer le curseur de sélection : le code est 10 fois plus rapide et plus lisible.</p>')
        ].join('\n')
      },
      {
        title: 'Méthodes (Select, ClearContents, Copy, AutoFit), bloc With...End With et WorksheetFunction',
        html: [
          '<p>Une <strong>méthode</strong> est une <strong>action</strong> que l’on ordonne à un objet d’accomplir ' +
          '(syntaxe : <code>Objet.Methode [Arguments]</code>, sans signe <code>=</code> devant la méthode) :</p>',
          '<ul>',
          '  <li><strong>Effacer une plage (la distinction cruciale d’examen)</strong> :' +
          '    <ul>' +
          '      <li><strong><code>Range("A2:D20").ClearContents</code></strong> : efface <strong>uniquement le contenu</strong> (valeurs et formules) tout en <strong>conservant la mise en forme</strong> (bordures, couleurs, formats numériques) ;</li>' +
          '      <li><strong><code>Range("A2:D20").ClearFormats</code></strong> : réinitialise uniquement la mise en forme en gardant les valeurs ;</li>' +
          '      <li><strong><code>Range("A2:D20").Clear</code></strong> : efface absolument tout (contenu, formats et commentaires).</li>' +
          '    </ul>' +
          '  </li>',
          '  <li><strong>Copier, supprimer, ajuster</strong> : <code>Range("A1:B10").Copy Destination:=Range("E1")</code> copie la plage vers E1 en une seule instruction ; <code>Rows(5).Delete</code> supprime la ligne 5 ; <code>Columns("A:F").AutoFit</code> ajuste automatiquement la largeur des colonnes A à F à leur contenu.</li>',
          '  <li><strong>Gérer les classeurs et feuilles</strong> : <code>Workbooks.Add</code> (nouveau classeur), <code>Workbooks.Open("C:\\Rapports\\Mai.xlsx")</code>, <code>ThisWorkbook.Save</code>, <code>Worksheets.Add</code> (nouvelle feuille).</li>',
          '</ul>',
          '<p>Lorsqu’on modifie plusieurs propriétés ou appelle plusieurs méthodes sur le <strong>même objet</strong>, ' +
          'le bloc <strong><code>With ... End With</code></strong> évite de répéter le nom de l’objet à chaque ligne. ' +
          'De plus, l’objet <strong><code>Application.WorksheetFunction</code></strong> permet d’utiliser directement ' +
          'les fonctions de calcul d’Excel (<code>Sum</code>, <code>Average</code>, <code>Max</code>, <code>Min</code>, <code>VLookup</code>, <code>CountIf</code>) en VBA :</p>',
          '<pre><code>With Worksheets("Facture").Range("A1:E1")\n' +
          '    .Font.Bold = True\n' +
          '    .Font.Size = 12\n' +
          '    .Interior.Color = RGB(33, 115, 70)\n' +
          '    .Columns.AutoFit\n' +
          'End With\n\n' +
          '\' Calculer la somme de B2:B50 via WorksheetFunction :\n' +
          'Range("B51").Value = Application.WorksheetFunction.Sum(Range("B2:B50"))</code></pre>'
        ].join('\n')
      },
      {
        title: 'Les procédures événementielles : Workbook_Open et Worksheet_Change',
        html: [
          '<p>Jusqu’ici, nos macros étaient lancées manuellement (bouton, raccourci clavier ou menu). Une ' +
          '<strong>procédure événementielle</strong> s’exécute <strong>automatiquement</strong> en réponse à un événement ' +
          'déclenché par l’utilisateur ou par Excel. Contrairement aux macros classiques, elle ne se place <strong>jamais ' +
          'dans un module standard (<code>Module1</code>)</strong>, mais dans le module de l’objet surveillé :</p>',
          '<ul>',
          '  <li><strong>Dans le module <code>ThisWorkbook</code> (événements du classeur)</strong> :' +
          '    <ul>' +
          '      <li><strong><code>Private Sub Workbook_Open()</code></strong> : s’exécute automatiquement dès l’ouverture du classeur (idéal pour afficher un message d’accueil, activer la feuille du menu principal ou initialiser des paramètres).</li>' +
          '      <li><strong><code>Private Sub Workbook_BeforeClose(Cancel As Boolean)</code></strong> : s’exécute juste avant la fermeture du classeur (mettre <code>Cancel = True</code> annule la fermeture si une vérification échoue).</li>' +
          '    </ul>' +
          '  </li>',
          '  <li><strong>Dans le module d’une feuille <code>Feuil1</code> (événements de feuille)</strong> :' +
          '    <ul>' +
          '      <li><strong><code>Private Sub Worksheet_Change(ByVal Target As Range)</code></strong> : se déclenche dès que l’utilisateur modifie la valeur d’une cellule de cette feuille. Le paramètre automatique <strong><code>Target</code></strong> désigne exactement la cellule (ou la plage) qui vient d’être modifiée !</li>' +
          '      <li><strong><code>Private Sub Worksheet_SelectionChange(ByVal Target As Range)</code></strong> : se déclenche à chaque fois que l’utilisateur clique sur une autre cellule (<code>Target</code> est la nouvelle sélection).</li>' +
          '      <li><strong><code>Private Sub Worksheet_Activate()</code></strong> : se déclenche lorsque l’utilisateur clique sur l’onglet de la feuille pour l’afficher.</li>' +
          '    </ul>' +
          '  </li>',
          '</ul>',
          '<pre><code>\' Dans le module de la feuille Feuil1 (et non dans Module1) :\n' +
          'Private Sub Worksheet_Change(ByVal Target As Range)\n' +
          '    \' Si la cellule modifiée se trouve dans la colonne B (colonne 2) :\n' +
          '    If Target.Column = 2 And Target.Row >= 2 Then\n' +
          '        Target.Offset(0, 1).Value = Date  \' Inscrit la date de saisie en colonne C\n' +
          '    End If\n' +
          'End Sub</code></pre>',
          box('pitfall', 'Pièges classiques sur les méthodes et les événements', 'warning',
            '    <ul>\n' +
            '      <li>Utiliser <code>.Clear</code> au lieu de <code>.ClearContents</code> pour vider un modèle de facture : toutes les bordures et couleurs du tableau sont détruites !</li>\n' +
            '      <li>Écrire <code>Sub Workbook_Open()</code> dans <code>Module1</code> : Excel ne l’exécutera pas automatiquement à l’ouverture (elle doit résider dans <code>ThisWorkbook</code>).</li>\n' +
            '      <li>Oublier le point initial (<code>.Font.Bold = True</code>) à l’intérieur d’un bloc <code>With Range("A1") ... End With</code>.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      {
        q: 'Quelle méthode de l’objet Range permet d’effacer uniquement les valeurs et formules d’une plage tout en conservant ses bordures et couleurs ?',
        opts: ['ClearContents', 'Clear', 'ClearFormats', 'Delete'],
        correct: 0,
        exp: 'ClearContents vide uniquement le contenu des cellules en préservant toute la mise en forme. Clear efface tout (contenu + formats), ClearFormats n’efface que le style et Delete supprime physiquement les cellules en décalant la feuille.'
      },
      {
        q: 'Parmi les écritures suivantes appliquées à Range("A1"), laquelle met correctement le texte en gras et illustre la modification d’une propriété ?',
        opts: [
          'Range("A1").Bold.Select',
          'Range("A1").Font.Bold = True',
          'Range("A1").Font = Bold',
          'Call Range("A1").Font.Bold'
        ],
        correct: 1,
        exp: 'Bold est une propriété booléenne du sous-objet Font de Range : on lui affecte la valeur True avec le signe = (Range("A1").Font.Bold = True).'
      },
      {
        q: 'Dans quel module de l’Explorateur de projets faut-il placer la procédure Private Sub Workbook_Open() pour qu’elle s’exécute automatiquement à l’ouverture du fichier ?',
        opts: [
          'Dans Module1 (dossier Modules)',
          'Dans le module de Feuil1',
          'Dans le module de l’objet ThisWorkbook',
          'Dans un UserForm'
        ],
        correct: 2,
        exp: 'Les événements liés au classeur entier (Workbook_Open, Workbook_BeforeClose, Workbook_BeforeSave) doivent obligatoirement être écrits dans le module de l’objet ThisWorkbook.'
      },
      {
        q: 'Dans la procédure événementielle Private Sub Worksheet_Change(ByVal Target As Range), que représente le paramètre Target ?',
        opts: [
          'Le classeur actif tout entier',
          'La cellule A1 de la première feuille',
          'La feuille vers laquelle les données sont copiées',
          'La cellule ou la plage de cellules qui vient d’être modifiée par l’utilisateur'
        ],
        correct: 3,
        exp: 'Excel transmet automatiquement dans l’argument Target (de type Range) la référence exacte de la cellule ou de la plage dont la valeur vient de changer.'
      },
      {
        q: 'Quelle propriété permet de modifier la couleur de remplissage (fond) de la cellule A1 en VBA ?',
        opts: [
          'Range("A1").Interior.Color (ou .Interior.ColorIndex)',
          'Range("A1").Font.Color',
          'Range("A1").Background.Value',
          'Range("A1").Fill.Style'
        ],
        correct: 0,
        exp: 'Le sous-objet Interior gère le remplissage intérieur de la cellule via ses propriétés Color (avec RGB) ou ColorIndex (palette de 1 à 56). Font.Color modifie uniquement la couleur des caractères.'
      },
      {
        q: 'Quel est l’intérêt principal d’un bloc With Range("A1:F1") ... End With ?',
        opts: [
          'Répéter une boucle 10 fois sur la plage A1:F1',
          'Appliquer plusieurs propriétés et méthodes au même objet sans répéter son chemin complet à chaque ligne',
          'Protéger la plage A1:F1 par un mot de passe',
          'Créer un nouveau classeur contenant uniquement la plage A1:F1'
        ],
        correct: 1,
        exp: 'With...End With factorise la référence à l’objet : à l’intérieur du bloc, chaque ligne commençant par un point (.Font.Bold = True, .Interior.ColorIndex = 6) s’applique directement à cet objet.'
      },
      {
        q: 'Comment appeler la fonction SOMME d’Excel sur la plage B2:B20 depuis du code VBA pour stocker le résultat dans une variable ?',
        opts: [
          'total = Range("B2:B20").Sum()',
          'total = VBA.SOMME("B2:B20")',
          'total = Application.WorksheetFunction.Sum(Range("B2:B20"))',
          'total = ActiveSheet.Formula("=SUM(B2:B20)")'
        ],
        correct: 2,
        exp: 'L’objet Application.WorksheetFunction expose les fonctions de feuille de calcul d’Excel (en anglais, comme Sum, Average, Max, VLookup) pour les évaluer directement en VBA.'
      },
      {
        q: 'Quelle méthode ajuste automatiquement la largeur des colonnes A à D à la longueur de leur contenu ?',
        opts: [
          'Columns("A:D").Resize',
          'Range("A:D").ClearFormats',
          'Columns("A:D").Select',
          'Columns("A:D").AutoFit'
        ],
        correct: 3,
        exp: 'La méthode AutoFit appliquée à un objet Columns (ou Rows) ajuste automatiquement la largeur des colonnes (ou la hauteur des lignes) au contenu le plus long.'
      }
    ],

    pitfalls: [
      'Confondre Clear (efface contenu ET mise en forme) avec ClearContents (efface uniquement les valeurs/formules).',
      'Placer une procédure événementielle (Workbook_Open ou Worksheet_Change) dans un module standard Module1 où elle restera inactive.',
      'Oublier le point devant les propriétés (.Font.Bold) à l’intérieur d’un bloc With...End With.',
      'Abuser de .Select et .Activate alors qu’on peut modifier directement Range("...").Value.'
    ],

    methodTitle: 'Méthode — agir proprement sur une plage Excel en VBA',
    method: [
      'Se demander s’il s’agit de modifier un attribut (Propriété avec =) ou de déclencher une action (Méthode sans =).',
      'Regrouper les modifications portant sur un même objet dans un bloc With ... End With en commençant chaque ligne par un point.',
      'Préférer ClearContents à Clear pour réinitialiser les zones de saisie d’un modèle sans détruire ses bordures.',
      'Pour automatiser une réaction sur saisie ou ouverture, placer le code dans Feuil1 (Worksheet_Change) ou ThisWorkbook (Workbook_Open).'
    ],

    summary: [
      'Une propriété (Value, Formula, Font.Bold, Interior.Color, Name, Row, Column) se lit ou se modifie avec =.',
      'Une méthode (Select, ClearContents, Clear, Copy, Delete, AutoFit, Open, Save) exécute une action sur l’objet.',
      'With...End With factorise les accès à un même objet ; Application.WorksheetFunction appelle les fonctions natives d’Excel.',
      'Workbook_Open (dans ThisWorkbook) et Worksheet_Change(ByVal Target As Range) (dans une feuille) réagissent automatiquement aux événements.'
    ],

    checklist: [
      'Je sais distinguer une propriété d’une méthode dans n’importe quelle ligne de code VBA.',
      'Je sais choisir entre Clear, ClearContents et ClearFormats selon le besoin.',
      'Je sais écrire un bloc With...End With pour formater un en-tête de tableau.',
      'Je sais utiliser Target dans Worksheet_Change(ByVal Target As Range).'
    ],

    notions: [
      '<strong>Propriété</strong> : caractéristique d’un objet lue ou modifiée avec <code>=</code> (<code>Value</code>, <code>Formula</code>, <code>Name</code>).',
      '<strong>Méthode</strong> : action exécutée par un objet (<code>Select</code>, <code>Copy</code>, <code>ClearContents</code>, <code>AutoFit</code>).',
      '<strong><code>ClearContents</code> vs <code>Clear</code></strong> : effacer uniquement les valeurs/formules vs effacer valeurs et mise en forme.',
      '<strong><code>Font</code> &amp; <code>Interior</code></strong> : sous-objets de <code>Range</code> gérant la police et la couleur de fond.',
      '<strong><code>With ... End With</code></strong> : structure appliquant une série d’instructions au même objet sans le répéter.',
      '<strong><code>Application.WorksheetFunction</code></strong> : passerelle permettant d’appeler les fonctions Excel (<code>Sum</code>, <code>VLookup</code>) en VBA.',
      '<strong><code>Workbook_Open()</code></strong> : procédure événementielle de <code>ThisWorkbook</code> exécutée à l’ouverture du fichier.',
      '<strong><code>Worksheet_Change(ByVal Target As Range)</code></strong> : événement de feuille déclenché à chaque modification de cellule (<code>Target</code>).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — revois la différence entre Propriété (=) et Méthode ainsi que Clear vs ClearContents.' },
      { cls: 'mid', text: '50–69 % — pratique l’écriture des blocs With...End With et l’emplacement des événements.' },
      { cls: 'good', text: '70–94 % — bon niveau, vérifie l’utilisation du paramètre Target dans Worksheet_Change.' },
      { cls: 'top', text: '≥ 95 % — maîtrise complète des propriétés, méthodes et événements Excel.' }
    ],

    flashcards: [
      { q: 'Différence entre Clear, ClearContents et ClearFormats ?', a: 'ClearContents efface uniquement le contenu (garde le style) ; ClearFormats efface uniquement le style (garde les valeurs) ; Clear efface tout.' },
      { q: 'Comment mettre A1 en gras sur fond jaune en VBA ?', a: 'Range("A1").Font.Bold = True et Range("A1").Interior.ColorIndex = 6 (ou .Interior.Color = RGB(255, 255, 0)).' },
      { q: 'Où placer Workbook_Open() et Worksheet_Change() ?', a: 'Workbook_Open() se place dans le module ThisWorkbook ; Worksheet_Change(ByVal Target As Range) se place dans le module de la feuille concernée (ex. Feuil1).' },
      { q: 'Que représente Target dans Worksheet_Change(ByVal Target As Range) ?', a: 'Target est l’objet Range représentant la cellule (ou la plage) qui vient d’être modifiée par l’utilisateur.' },
      { q: 'À quoi sert Application.ScreenUpdating = False ?', a: 'À désactiver temporairement le rafraîchissement de l’écran pendant qu’une macro s’exécute, ce qui supprime le scintillement et accélère fortement le traitement.' }
    ]
  }
];

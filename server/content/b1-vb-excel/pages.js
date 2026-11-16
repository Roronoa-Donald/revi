/**
 * Pages transverses du cours de Programmation VBA sous Excel — B1.
 *
 * Construit à partir du support officiel B1 IT « Programmation VBA »
 * (Dr TCHAZINO Tchamiè, 47 pages, support1.pdf) : accueil, sommaire, atelier,
 * cartes, mémo, examens blancs, exercices. Les chapitres sont composés par
 * `kit.chapter` à partir des données de `chapitres-1-3.js` / `4-6.js`.
 */
'use strict';

const { ic, box, qcm, cards, bands, crumb } = require('../../../scripts/course-kit');

function chnav(back, forward) {
  const links = ['  <div class="chnav">'];
  if (back) links.push('    <a class="btn" href="' + back.href + '">' + ic('arrow-left') + ' ' + back.label + '</a>');
  if (forward) links.push('    <a class="btn btn--primary" href="' + forward.href + '">' + forward.label + ' ' + ic('arrow-right') + '</a>');
  links.push('  </div>');
  return links.join('\n');
}

function disclaimer(course, extra) {
  return '  <p class="disclaimer">Objectif de maîtrise 19/20 — votre note réelle dépend aussi de votre travail.\n  ' +
    (extra || '') + 'Sources : ' + course.sources + '.</p>';
}

/* ======================== Accueil ======================== */

function index(course, chapterList) {
  const toc = chapterList.map(chapitre =>
    '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
    '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span></span></a>'
  ).join('\n');

  const body = [
    crumb(course, [{ href: '/index.html', label: 'Portail des cours' }, { label: course.brand }]),
    '  <div class="chapmeta">',
    '    <span class="tag">Licence 1 · B1</span>',
    '    <span class="tag tag--time">VBA &amp; Macros Excel</span>',
    '    <span class="tag tag--time">' + chapterList.length + ' chapitres · 18 exercices</span>',
    '  </div>',
    '  <h1>' + course.title + '</h1>',
    '  <p class="lead">' + course.lead + '</p>',
    box('objectifs', 'Ce que vous saurez faire à la fin du cours', 'target', [
      '    <ul>',
      '      <li>activer l’onglet Développeur, utiliser l’enregistreur de macros (<code>PERSO.XLS</code>, références absolues vs relatives) et naviguer dans VBE (<code>Alt+F11</code>, <code>Ctrl+R</code>, <code>F4</code>, <code>F5</code>, <code>F8</code>) ;</li>',
      '      <li>parcourir le Modèle Objet Excel (<code>Application → Workbooks → Worksheets → Range / Cells</code>) et utiliser <code>Offset(lig, col)</code> ;</li>',
      '      <li>manipuler les propriétés (<code>Value</code>, <code>Formula</code>, <code>Interior.Color</code>, <code>Font.Bold</code>), les méthodes (<code>Select</code>, <code>ClearContents</code>, <code>Copy</code>, <code>AutoFit</code>) et les événements (<code>Workbook_Open</code>, <code>Worksheet_Change</code>) ;</li>',
      '      <li>déclarer des variables typées avec <code>Option Explicit</code> (<code>Integer</code>, <code>Long</code>, <code>Double</code>, <code>String</code>, <code>Boolean</code>, <code>Object</code> avec <code>Set</code>, <code>Variant</code>) et écrire des fonctions personnalisées <code>Function</code> ;</li>',
      '      <li>structurer la logique avec <code>If...Then...ElseIf...End If</code>, <code>Select Case</code> et les boucles <code>For...Next</code> (dont <code>Step -1</code>), <code>For Each...In</code> et <code>Do While/Until...Loop</code> ;</li>',
      '      <li>créer des boîtes de dialogue (<code>MsgBox</code>, <code>InputBox</code>), intercepter les erreurs (<code>On Error GoTo</code>, objet <code>Err</code>) et concevoir des formulaires <code>UserForm</code>.</li>',
      '    </ul>'
    ].join('\n')),
    box('method', 'Refonte académique et programme officiel (Dr TCHAZINO Tchamiè)', 'compass', [
      '    <p>Ce module complet de <strong>Programmation VBA sous Excel (B1)</strong> est issu de la refonte académique ' +
      'intégrale des supports d’archive officiels (<code>support1.pdf</code> — 47 pages du Dr TCHAZINO Tchamiè, complété ' +
      'par les séquences applicatives <code>support1</code>, <code>support2</code> et <code>support3</code> du programme officiel B1 IT). ' +
      'Chaque chapitre associe la syntaxe exacte de Visual Basic for Applications à des cas concrets de gestion et de bureautique automatisée.</p>',
      '    <p>Chaque chapitre se termine par <strong>trois études de cas et exercices gradués</strong> (18 au total, de ' +
      '<code>vba-c1-e1</code> à <code>vba-c6-e3</code>) ainsi qu’un QCM corrigé de 8 questions pour valider la maîtrise ' +
      'immédiate avant de passer au chapitre suivant.</p>'
    ].join('\n')),
    '  <h2>Programme du cours</h2>',
    '  <div class="toc">',
    toc,
    '  </div>',
    box('it', 'Ressources du cours', 'wrench', [
      '    <p>',
      '      <a class="btn" href="chapitres/chapitre1.html">' + ic('rocket') + ' Commencer le chapitre 1</a>',
      '      <a class="btn" href="sommaire.html">' + ic('compass') + ' Sommaire détaillé</a>',
      '      <a class="btn" href="chapitres/cartes.html">' + ic('cards') + ' Flashcards</a>',
      '      <a class="btn" href="chapitres/formules.html">' + ic('file') + ' Mémo VBA Excel</a>',
      '      <a class="btn" href="atelier.html">' + ic('terminal') + ' Atelier VBA</a>',
      '      <a class="btn" href="exercices/exercices.html">' + ic('blocks') + ' Exercices &amp; projet</a>',
      '      <a class="btn" href="chapitres/simulateur-examen.html">' + ic('clipboard') + ' Examens blancs</a>',
      '    </p>'
    ].join('\n')),
    disclaimer(course)
  ].join('\n\n');

  return {
    'index.html': {
      title: 'VB Excel B1 — Programmation VBA & Macros Excel | Cours Interactif',
      description: course.description,
      active: null,
      body
    }
  };
}

/* ======================== Sommaire ======================== */

function sommaire(course, chapterList) {
  const toc = chapterList.map(chapitre => {
    const lock = chapitre.free
      ? '<br><span class="locknote">Accès libre</span>'
      : '<br><span class="locknote">' + ic('lock') + ' B1 et plus</span>';
    return '    <a class="toc__item" href="chapitres/chapitre' + chapitre.n + '.html"><span class="toc__n">' + chapitre.n +
      '</span><span><span class="toc__t">' + chapitre.title + '</span><br><span class="toc__d">' + chapitre.toc + '</span>' +
      lock + '</span></a>';
  }).join('\n');

  const body = [
    crumb(course, [{ href: 'index.html', label: course.brand }, { label: 'Sommaire' }]),
    '  <h1>Sommaire du cours — Programmation VBA sous Excel</h1>',
    '  <p class="lead">' + chapterList.length + ' chapitres progressifs couvrant l’intégralité du programme officiel ' +
    'du Dr TCHAZINO Tchamiè (<code>support1.pdf</code>, 47 pages), de l’enregistreur de macros jusqu’aux formulaires ' +
    '<code>UserForm</code> et à la gestion des erreurs. Le chapitre 1 est en accès libre.</p>',
    '  <p>Chaque chapitre comporte <strong>trois exercices pratiques contextualisés</strong> corrigés automatiquement ' +
    'et 8 questions de QCM. Vous pouvez également vous entraîner dans l’<a href="atelier.html">atelier principal</a>.</p>',
    '  <div class="toc">',
    toc,
    '  </div>',
    '  <h2>Ressources transverses</h2>',
    '  <div class="toc">',
    '    <a class="toc__item" href="chapitres/cartes.html"><span class="toc__n">' + ic('cards') + '</span><span><span class="toc__t">Cartes de révision</span><br><span class="toc__d">Toutes les notions clés des ' + chapterList.length + ' chapitres, à retourner pour s’auto-tester.</span></span></a>',
    '    <a class="toc__item" href="chapitres/formules.html"><span class="toc__n">' + ic('file') + '</span><span><span class="toc__t">Mémo VBA Excel</span><br><span class="toc__d">Raccourcis VBE, Modèle Objet, Propriétés/Méthodes, Types, Boucles, MsgBox et UserForms.</span></span></a>',
    '    <a class="toc__item" href="exercices/exercices.html"><span class="toc__n">' + ic('blocks') + '</span><span><span class="toc__t">Exercices &amp; projet intégrateur</span><br><span class="toc__d">Entraînement gradué et dossier de synthèse : application de facturation automatisée en VBA.</span></span></a>',
    '    <a class="toc__item" href="atelier.html"><span class="toc__n">' + ic('terminal') + '</span><span><span class="toc__t">Atelier d’analyse VBA</span><br><span class="toc__d">Résoudre et valider des études de cas VBA directement dans la page.</span></span></a>',
    '    <a class="toc__item" href="chapitres/simulateur-examen.html"><span class="toc__n">' + ic('clipboard') + '</span><span><span class="toc__t">Examens blancs</span><br><span class="toc__d">Deux sujets chronométrés de 2 h avec corrigés détaillés et QCM de maîtrise globale.</span></span></a>',
    '  </div>',
    chnav({ href: 'index.html', label: 'Accueil du cours' }, { href: 'chapitres/chapitre1.html', label: 'Commencer le chapitre 1' })
  ].join('\n\n');

  return {
    'sommaire.html': {
      title: 'Sommaire — ' + course.brand,
      description: 'Sommaire du cours de Programmation VBA sous Excel B1 : ' + chapterList.length +
        ' chapitres, 18 études de cas VBA, flashcards, mémo et examens blancs.',
      active: 'sommaire',
      body
    }
  };
}

/* ======================== Atelier ======================== */

function buildAtelierBody(course, prefix) {
  const p = prefix || '';
  return [
    crumb(course, [{ href: p + 'index.html', label: course.brand }, { href: p + 'sommaire.html', label: 'Sommaire' }, { label: 'Atelier' }]),
    '  <h1>Atelier d’analyse — Programmation VBA sous Excel</h1>',
    '  <p class="lead">Un environnement interactif dans la page pour vérifier vos diagnostics VBA, vos références ' +
    'du Modèle Objet (<code>Range</code>, <code>Cells</code>, <code>Offset</code>), le typage de vos variables et le ' +
    'déroulement de vos boucles et formulaires <code>UserForm</code>.</p>',
    box('objectifs', 'Comment fonctionne l’atelier', 'target', [
      '    <ul>',
      '      <li><strong>Exécuter / Valider</strong> vérifie votre grille d’analyse VBA et affiche le résultat obtenu.</li>',
      '      <li><strong>Indice</strong> dévoile progressivement 3 indices méthodologiques (dont le détail des <em>Étapes :</em>).</li>',
      '      <li><strong>Expliquer mon erreur</strong> sollicite le tuteur pédagogique pour comprendre un écart sans jamais donner la réponse toute faite.</li>',
      '      <li>Le raccourci <strong>Ctrl + Entrée</strong> lance la vérification directement depuis l’éditeur.</li>',
      '    </ul>'
    ].join('\n')),
    '  <h2>Zone libre</h2>',
    [
      '<div class="lab" data-lab',
      '     data-language="analyse"',
      '     data-height="360"',
      '     data-languages="1"',
      '     data-stdin="">',
      '  <script type="text/plain" data-lab-starter># Zone libre : testez vos analyses VBA (Modèle Objet, Offset, Types, Boucles).',
      '# Complétez chaque bloc puis cliquez sur Exécuter.',
      '',
      '[Question 1 — Cellule désignée par Cells(4, 2)]',
      'B4',
      '',
      '[Question 2 — Cellule atteinte par Range("C3").Offset(2, -1)]',
      'B5',
      '</script>',
      '  <div class="lab__head">',
      '    <h3 class="lab__title">Zone libre — simulateur d’analyse VBA Excel</h3>',
      '    <div class="lab__meta">',
      '      <span class="lab__lang">' + ic('terminal') + ' Étude de cas VBA</span>',
      '    </div>',
      '  </div>',
      '  <div class="lab__body">',
      '    <p class="lab__goal"><strong>Objectif :</strong> tester librement vos résolutions d’adressage <code>Cells(ligne, col)</code>, ' +
      'de décalage <code>Offset(lig, col)</code>, de choix entre <code>Clear</code> et <code>ClearContents</code> ou de trace de boucles <code>For...Next</code>.</p>',
      '    <div class="lab__brief">',
      '      <p>Chaque chapitre du cours contient 3 exercices notés automatiquement (soit 18 exercices de <code>vba-c1-e1</code> à <code>vba-c6-e3</code>). ' +
      'Cette zone libre vous permet de vous échauffer avant de valider les études de cas des chapitres.</p>',
      '    </div>',
      '    <div class="lab__sample">',
      '      <div class="lab__sample-part"><b>Exemple de trace VBA</b><pre>Cells(4, 2) -> ligne 4, colonne 2 -> B4',
      'Range("C3").Offset(2, -1) -> ligne 3+2=5, col C-1=B -> B5</pre></div>',
      '      <div class="lab__sample-part"><b>Résultat attendu</b><pre>B4',
      'B5</pre></div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n'),
    box('pitfall', 'Les quatre erreurs VBA les plus fréquentes à éviter', 'warning', [
      '    <ul>',
      '      <li><strong>Inverser ligne et colonne dans <code>Cells(ligne, col)</code></strong> : <code>Cells(5, 2)</code> désigne <code>B5</code> et non <code>E2</code>.</li>',
      '      <li><strong>Confondre <code>Clear</code> et <code>ClearContents</code></strong> : seul <code>ClearContents</code> préserve les bordures et couleurs d’un tableau.</li>',
      '      <li><strong>Oublier <code>Option Explicit</code> ou écrire <code>Dim a, b As Integer</code></strong> : sans type explicite sur chaque variable, <code>a</code> devient <code>Variant</code>.</li>',
      '      <li><strong>Supprimer des lignes dans une boucle croissante</strong> : toujours utiliser <code>For i = fin To debut Step -1</code>.</li>',
      '    </ul>'
    ].join('\n')),
    chnav({ href: p + 'sommaire.html', label: 'Sommaire' }, { href: p + 'chapitres/chapitre1.html', label: 'Chapitre 1 — Introduction à VBA & VBE' }),
    disclaimer(course)
  ].join('\n\n');
}

function atelier(course) {
  return {
    'atelier.html': {
      title: 'Atelier d’analyse VBA — ' + course.brand,
      description: 'Atelier interactif du cours de Programmation VBA sous Excel B1 : éditeur d’études de cas, validation immédiate et indices.',
      active: 'atelier',
      body: buildAtelierBody(course, '')
    }
  };
}

/* ======================== Cartes ======================== */

function buildCartesBody(course, chapterList, inChapitres) {
  const modules = chapterList.map(chapitre => ({
    title: 'Module ' + chapitre.n + ' — ' + chapitre.title,
    items: chapitre.flashcards
  }));
  const rootPrefix = inChapitres ? '../' : '';
  const chapPrefix = inChapitres ? '' : 'chapitres/';

  return [
    crumb(course, [{ href: rootPrefix + 'index.html', label: course.brand }, { href: rootPrefix + 'sommaire.html', label: 'Sommaire' }, { label: 'Cartes' }]),
    '  <h1>Cartes de révision — VBA Excel</h1>',
    '  <p class="lead">Cliquez sur une carte pour révéler la réponse. Objectif : répondre sans hésiter, dans les ' +
    'deux sens. Revenez à J+1, J+3, J+7 pour ancrer durablement la syntaxe VBA.</p>',
    cards(modules),
    chnav({ href: rootPrefix + 'sommaire.html', label: 'Sommaire' }, { href: chapPrefix + 'formules.html', label: 'Mémo VBA Excel' })
  ].join('\n\n');
}

function cartes(course, chapterList) {
  return {
    'chapitres/cartes.html': {
      title: 'Cartes de révision — ' + course.brand,
      description: 'Flashcards de révision du cours de Programmation VBA sous Excel B1 : notions clés des ' +
        chapterList.length + ' chapitres.',
      active: 'cartes',
      body: buildCartesBody(course, chapterList, true)
    }
  };
}

/* ======================== Mémo ======================== */

function buildFormulesBody(course, inChapitres) {
  const bloc = (titre, html) => '  <h2>' + titre + '</h2>\n' + html;
  const rootPrefix = inChapitres ? '../' : '';
  const chapPrefix = inChapitres ? '' : 'chapitres/';

  return [
    crumb(course, [{ href: rootPrefix + 'index.html', label: course.brand }, { href: rootPrefix + 'sommaire.html', label: 'Sommaire' }, { label: 'Mémo' }]),
    '  <h1>Mémo VBA sous Excel</h1>',
    '  <p class="lead">Toutes les syntaxes, propriétés, méthodes et structures du support du Dr TCHAZINO Tchamiè ' +
    'résumées sur une seule page de référence.</p>',

    bloc('1. Environnement VBE & Enregistreur de macros', [
      '<pre><code>Alt+F11  : Basculer entre Excel et l\'editeur VBE\n',
      'Ctrl+R   : Explorateur de projets (Modules, Feuil1, ThisWorkbook, UserForm)\n',
      'F4       : Fenetre Proprietes         F2 : Explorateur d\'objets\n',
      'F5       : Executer la macro          F8 : Pas a pas detaille (ligne par ligne)\n',
      'PERSO.XLS / PERSONAL.XLSB : Classeur de macros personnelles (tous classeurs)\n',
      'Absolue  : Range("B2").Select         Relative : ActiveCell.Offset(lig, col)\n',
      'Style    : Application.ReferenceStyle = xlR1C1  (ou xlA1)</code></pre>'
    ].join('\n')),

    bloc('2. Le Modèle Objet Excel', [
      '<pre><code>Hierarchie : Application -> Workbooks -> Worksheets -> Range / Cells\n',
      'Classeurs  : ThisWorkbook (contient la macro) != ActiveWorkbook (au 1er plan)\n',
      'Feuilles   : Worksheets("Ventes") ou Worksheets(1) (1er onglet a gauche)\n',
      '             Sheets inclut aussi les feuilles graphiques (Charts)\n',
      'Cellules   : Range("A1:B10")   Range("A1:A5,C1:C5") (union avec virgule)\n',
      '             Cells(ligne, colonne)  -> Cells(4, 2) = B4\n',
      '             Rows(3) / Columns("B:D")\n',
      'Decalage   : Range("C4").Offset(-1, 2) -> E3 (+ bas/droite, - haut/gauche)</code></pre>'
    ].join('\n')),

    bloc('3. Propriétés, Méthodes & Événements', [
      '<pre><code>Proprietes (=) : .Value  .Formula  .Font.Bold = True  .Font.Size = 12\n',
      '                 .Interior.Color = RGB(r,v,b)  .Interior.ColorIndex = 6\n',
      '                 .Count  .Row  .Column  .Name  Application.ScreenUpdating = False\n',
      'Methodes       : .Select  .Activate  .Copy Destination:=Range("E1")\n',
      '                 .ClearContents (garde le format) != .Clear (efface tout)\n',
      '                 .ClearFormats  .Delete  .Insert  Columns("A:D").AutoFit\n',
      'Fonctions Excel: Application.WorksheetFunction.Sum(Range("B2:B20"))\n',
      'Evenements     : Workbook_Open() -> dans ThisWorkbook\n',
      '                 Worksheet_Change(ByVal Target As Range) -> dans Feuil1</code></pre>'
    ].join('\n')),

    bloc('4. Variables, Types, Opérateurs & Function', [
      '<pre><code>Option Explicit : Oblige a declarer toutes les variables avec Dim\n',
      'Types entiers   : Byte (0..255), Integer (-32768..32767), Long (+-2 milliards)\n',
      'Types decimaux  : Single, Double (8 octets), Currency (monetaire fixe)\n',
      'Autres types    : String, Boolean (True/False), Date, Variant (defaut)\n',
      'Variable objet  : Dim plg As Range  ->  Set plg = Range("A1:A10")\n',
      'Operateurs      : & (concatenation), \\ (div. entiere), Mod (reste), <> (diff.)\n',
      'Function (UDF)  : Function CalculTTC(ht As Double) As Double\n',
      '                      CalculTTC = ht * 1.18   \' Retour par le nom de la fonction\n',
      '                  End Function</code></pre>'
    ].join('\n')),

    bloc('5. Structures de contrôle (Conditions & Boucles)', [
      '<pre><code>If cond Then ... ElseIf cond2 Then ... Else ... End If\n',
      'Select Case note : Case Is >= 16 / Case 12 To 15.99 / Case Else / End Select\n',
      'Boucle compteur  : For i = 2 To 50 ... Next i\n',
      'Suppression      : For i = 50 To 2 Step -1 -> Rows(i).Delete -> Next i\n',
      'Collection       : For Each cel In Range("A1:A20") ... Next cel\n',
      'Boucle cond.     : Do While Cells(i, 1).Value <> "" ... i = i + 1 ... Loop\n',
      '                   Do Until Cells(i, 1).Value = ""  ... i = i + 1 ... Loop\n',
      'Sorties          : Exit For / Exit Do / Exit Sub / Exit Function</code></pre>'
    ].join('\n')),

    bloc('6. Boîtes de dialogue, Erreurs & UserForms', [
      '<pre><code>MsgBox   : rep = MsgBox("Confirmer ?", vbYesNo + vbQuestion, "Titre")\n',
      '           If rep = vbYes Then ...   (Arguments nommes : Prompt:="...", Title:="...")\n',
      'InputBox : texte = InputBox("Nom :", "Saisie")   (renvoie "" si Annuler)\n',
      'Erreurs  : On Error GoTo Etiquette  ...  Exit Sub  ...  Etiquette: Err.Number\n',
      'UserForm : Label, TextBox, ComboBox (.AddItem dans UserForm_Initialize), CommandButton\n',
      '           Frm.Show (affiche) / Frm.Hide (masque en memoire) / Unload Me (decharge)</code></pre>'
    ].join('\n')),

    chnav({ href: chapPrefix + 'cartes.html', label: 'Cartes' }, { href: chapPrefix + 'simulateur-examen.html', label: 'Examens blancs' })
  ].join('\n\n');
}

function formules(course) {
  return {
    'chapitres/formules.html': {
      title: 'Mémo VBA Excel — ' + course.brand,
      description: 'Mémo de référence du cours de Programmation VBA sous Excel B1 : VBE, Modèle Objet, Propriétés, Méthodes, Types, Boucles et UserForms.',
      active: 'formules',
      body: buildFormulesBody(course, true)
    }
  };
}

/* ======================== Examens blancs ======================== */

function buildExamensBody(course, inChapitres) {
  const rootPrefix = inChapitres ? '../' : '';
  const sujets = [
    {
      title: 'Examen blanc n°1 — Fondamentaux VBE, Modèle Objet & Propriétés/Méthodes',
      intro: 'Sujet type épreuve (durée 2 h, /20) portant sur les chapitres 1 à 3 du support du Dr TCHAZINO Tchamiè.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Enregistreur de macros & VBE',
          text: '1) Quelle différence y a-t-il entre enregistrer une macro dans « Ce classeur » et dans « PERSO.XLS » ? 2) Expliquer la différence entre un enregistrement en références absolues et en références relatives (donner l’instruction VBA générée dans chaque cas). 3) Donner le rôle des raccourcis Alt+F11, Ctrl+R, F4, F5 et F8.',
          sol: '<strong>1)</strong> « Ce classeur » limite la macro au fichier actif ; <strong>PERSO.XLS (PERSONAL.XLSB)</strong> est un classeur caché chargé au démarrage d’Excel qui rend la macro disponible dans tous les classeurs. <strong>2)</strong> Référence absolue : <code>Range("B2").Select</code> (cible toujours B2) ; référence relative : <code>ActiveCell.Offset(lig, col).Range("A1").Select</code> (se décale à partir de la cellule active). <strong>3)</strong> <code>Alt+F11</code> : ouvrir VBE ; <code>Ctrl+R</code> : Explorateur de projets ; <code>F4</code> : fenêtre Propriétés ; <code>F5</code> : exécuter la macro entière ; <code>F8</code> : exécution pas à pas ligne par ligne.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Le Modèle Objet Excel',
          text: '1) Citer les quatre niveaux de la hiérarchie du Modèle Objet Excel. 2) Quelle cellule est désignée par Cells(6, 3) ? Et par Range("D4").Offset(-2, 1) ? 3) Pourquoi est-il plus sûr d’utiliser ThisWorkbook que ActiveWorkbook dans une macro qui ouvre plusieurs fichiers ?',
          sol: '<strong>1)</strong> <code>Application → Workbooks → Worksheets → Range / Cells</code>. <strong>2)</strong> <code>Cells(6, 3)</code> désigne la ligne 6, colonne 3 soit <strong>C6</strong>. Partant de D4 (ligne 4, col 4), <code>Offset(-2, 1)</code> remonte à la ligne 2 et avance à la colonne 5 (E), soit <strong>E2</strong>. <strong>3)</strong> <code>ThisWorkbook</code> désigne toujours le classeur contenant le code VBA en cours, tandis que <code>ActiveWorkbook</code> change dès qu’un autre classeur passe au premier plan.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — Propriétés, Méthodes et With...End With',
          text: '1) Expliquer la différence entre Range("A2:D20").Clear et Range("A2:D20").ClearContents. 2) Écrire un bloc With...End With qui met la plage A1:E1 de la feuille "Janvier" en gras, taille 12, fond jaune (ColorIndex = 6) et ajuste automatiquement la largeur des colonnes.',
          sol: '<strong>1)</strong> <code>ClearContents</code> efface uniquement les valeurs et formules en conservant les bordures et couleurs ; <code>Clear</code> efface tout (contenu et mise en forme). <strong>2)</strong><pre><code>With Worksheets("Janvier").Range("A1:E1")\n    .Font.Bold = True\n    .Font.Size = 12\n    .Interior.ColorIndex = 6\n    .Columns.AutoFit\nEnd With</code></pre>'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Procédures événementielles',
          text: '1) Où faut-il placer Workbook_Open() et Worksheet_Change(ByVal Target As Range) ? 2) Écrire une procédure Worksheet_Change qui, dès qu’une cellule de la colonne C (à partir de la ligne 2) est modifiée, inscrit "Modifié" dans la colonne D sur la même ligne.',
          sol: '<strong>1)</strong> <code>Workbook_Open()</code> se place dans <code>ThisWorkbook</code> ; <code>Worksheet_Change</code> se place dans le module de la feuille concernée (ex. <code>Feuil1</code>). <strong>2)</strong><pre><code>Private Sub Worksheet_Change(ByVal Target As Range)\n    If Target.Column = 3 And Target.Row >= 2 Then\n        Target.Offset(0, 1).Value = "Modifié"\n    End If\nEnd Sub</code></pre>'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 — Variables, Fonctions, Boucles, Erreurs & UserForms',
      intro: 'Sujet orienté algorithmique VBA, gestion des erreurs et formulaires (chapitres 4 à 6).',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 — Variables, Option Explicit et Function',
          text: '1) Quel est le rôle de Option Explicit et quel est le piège de la ligne Dim totalHT, totalTTC As Double ? 2) Écrire une fonction personnalisée Function RemiseCommerciale(montant As Double) As Double qui renvoie 15 % du montant si montant >= 100000, 5 % si montant >= 50000 et 0 sinon.',
          sol: '<strong>1)</strong> <code>Option Explicit</code> impose la déclaration de toutes les variables avec <code>Dim</code>. Dans <code>Dim totalHT, totalTTC As Double</code>, <code>totalHT</code> est de type <strong><code>Variant</code></strong> (seul <code>totalTTC</code> est <code>Double</code>). <strong>2)</strong><pre><code>Function RemiseCommerciale(montant As Double) As Double\n    If montant >= 100000 Then\n        RemiseCommerciale = montant * 0.15\n    ElseIf montant >= 50000 Then\n        RemiseCommerciale = montant * 0.05\n    Else\n        RemiseCommerciale = 0\n    End If\nEnd Function</code></pre>'
        },
        {
          num: 'Exercice 2',
          badge: '/5 — Boucles For...Next et suppression de lignes',
          text: 'Pourquoi est-il erroné d’utiliser For i = 2 To 100 pour supprimer les lignes dont la colonne B vaut 0 ? Écrire la boucle correcte permettant de supprimer toutes les lignes entre la ligne 2 et la ligne 100 où Cells(i, 2).Value = 0.',
          sol: 'En avançant de 2 à 100, supprimer la ligne <code>i</code> fait remonter l’ancienne ligne <code>i+1</code> au rang <code>i</code>, qui est alors sautée au tour suivant. Il faut parcourir à rebours avec <strong><code>Step -1</code></strong> :<pre><code>Dim i As Long\nFor i = 100 To 2 Step -1\n    If Cells(i, 2).Value = 0 Then\n        Rows(i).Delete\n    End If\nNext i</code></pre>'
        },
        {
          num: 'Exercice 3',
          badge: '/5 — MsgBox, InputBox et On Error GoTo',
          text: 'Écrire une procédure Sub SupprimerFeuille() qui demande un nom de feuille via InputBox, demande confirmation par MsgBox (boutons Oui/Non), puis supprime la feuille tout en interceptant l’erreur si la feuille n’existe pas.',
          sol: '<pre><code>Sub SupprimerFeuille()\n    Dim nom As String, rep As Integer\n    On Error GoTo ErreurFeuille\n    nom = InputBox("Nom de la feuille à supprimer :", "Suppression")\n    If nom = "" Then Exit Sub\n    rep = MsgBox("Confirmer la suppression de " & nom & " ?", vbYesNo + vbQuestion, "Confirmation")\n    If rep = vbYes Then\n        Worksheets(nom).Delete\n    End If\n    Exit Sub\nErreurFeuille:\n    MsgBox "Erreur " & Err.Number & " : feuille introuvable.", vbCritical, "Erreur"\nEnd Sub</code></pre>'
        },
        {
          num: 'Exercice 4',
          badge: '/5 — Formulaire UserForm',
          text: '1) Comment alimenter une liste déroulante ComboBoxPays avec "Togo", "Bénin" et "Sénégal" à l’ouverture d’un UserForm ? 2) Expliquer la différence entre Me.Hide et Unload Me lors de la fermeture du formulaire.',
          sol: '<strong>1)</strong> Dans l’événement <code>Private Sub UserForm_Initialize()</code>, on appelle trois fois la méthode <code>.AddItem</code> : <code>ComboBoxPays.AddItem "Togo"</code>, etc. <strong>2)</strong> <code>Me.Hide</code> masque le formulaire à l’écran mais conserve les valeurs de ses contrôles en mémoire vive ; <code>Unload Me</code> ferme le formulaire et libère la mémoire en réinitialisant tous les champs.'
        }
      ]
    }
  ];

  const itemHtml = (item) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="item__num">' + item.num + '</span><span class="badge">' + item.badge + '</span></div>',
    '    <p>' + item.text + '</p>',
    '    <details><summary>Corrigé détaillé</summary><div class="sol">' + item.sol + '</div></details>',
    '  </div>'
  ].join('\n');

  const mastery = [
    { stem: 'Quel raccourci ouvre l’éditeur Visual Basic (VBE) ?', opts: ['Alt+F11', 'Ctrl+R', 'F4', 'Alt+F8'], correct: 0, exp: 'Alt+F11 bascule entre Excel et VBE.' },
    { stem: 'Quelle cellule est désignée par Cells(3, 5) ?', opts: ['C5', 'E3', 'C3', 'E5'], correct: 1, exp: 'Ligne 3, colonne 5 (E) = cellule E3.' },
    { stem: 'Quelle méthode efface les valeurs d’une plage en conservant ses bordures et couleurs ?', opts: ['Clear', 'Delete', 'ClearContents', 'ClearFormats'], correct: 2, exp: 'ClearContents vide uniquement le contenu sans toucher au style.' },
    { stem: 'Quelle directive en tête de module rend obligatoire la déclaration des variables avec Dim ?', opts: ['Option Base 1', 'Dim Strict', 'Public All', 'Option Explicit'], correct: 3, exp: 'Option Explicit bloque toute variable non déclarée.' },
    { stem: 'Quel mot-clé est obligatoire pour affecter un objet Range à une variable objet ?', opts: ['Set', 'Let', 'Dim', 'Call'], correct: 0, exp: 'Set maPlage = Range("A1:B10").' },
    { stem: 'Quel pas faut-il utiliser dans une boucle For pour supprimer des lignes sans décalage ?', opts: ['Step 1', 'Step -1', 'Step 2', 'Step 0'], correct: 1, exp: 'On parcourt toujours du bas vers le haut avec Step -1.' },
    { stem: 'Quelle instruction doit précéder immédiatement l’étiquette d’un gestionnaire On Error GoTo ?', opts: ['Resume Next', 'End If', 'Exit Sub (ou Exit Function)', 'Err.Clear'], correct: 2, exp: 'Exit Sub empêche l’exécution normale d’entrer dans le bloc de gestion d’erreur.' },
    { stem: 'Quelle méthode ajoute un élément à une liste déroulante ComboBox dans un UserForm ?', opts: ['.Insert', '.Append', '.NewRow', '.AddItem'], correct: 3, exp: 'ComboBox1.AddItem "Valeur" dans UserForm_Initialize().' }
  ];

  return [
    crumb(course, [{ href: rootPrefix + 'index.html', label: course.brand }, { href: rootPrefix + 'sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examen — Programmation VBA sous Excel</h1>',
    '  <p class="lead">Deux sujets blancs chronométrés (durée 2 h, /20) couvrant l’ensemble du programme B1 ' +
    'du Dr TCHAZINO Tchamiè. Traitez-les sans consulter les corrigés, puis vérifiez votre score au QCM final.</p>',
    [
      '  <div class="box box--method" data-timer data-minutes="120">',
      '    <div class="box__title">' + ic('clock') + ' Chronomètre d’examen — 2 h</div>',
      '    <p>Lancez le chrono en démarrant votre sujet. <strong>Gardez 15 minutes de relecture</strong> pour vérifier : ' +
      'l’ordre ligne/colonne dans <code>Cells(lig, col)</code>, la présence de <code>Option Explicit</code>, <code>Set</code> sur les objets, ' +
      '<code>Step -1</code> sur les suppressions et <code>Exit Sub</code> avant les étiquettes d’erreur.</p>',
      '    <p><button class="btn btn--primary" data-start>' + ic('play') + ' Démarrer le chrono</button>',
      '       <span data-clock style="font-weight:800;font-size:1.1rem;margin-left:12px">120:00</span></p>',
      '  </div>'
    ].join('\n'),
    sujets.map(sujet => '  <h2>' + sujet.title + '</h2>\n\n  <p class="lead">' + sujet.intro + '</p>\n\n' +
      sujet.items.map(itemHtml).join('\n\n')).join('\n\n'),
    '  <h2>QCM final — toutes notions VBA</h2>',
    '  ' + qcm(mastery, { mastery: true, secure: true }),
    box('method', 'Barème de maîtrise', 'compass', '    ' + bands([
      { cls: 'low', text: '&lt; 50 % — reprends les chapitres concernés avant un nouveau sujet.' },
      { cls: 'mid', text: '50–69 % — refais les exercices des chapitres faibles.' },
      { cls: 'good', text: '70–94 % — bon niveau, cible les boucles Step -1 et les UserForms.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché avant l’épreuve.' }
    ])),
    chnav({ href: rootPrefix + 'sommaire.html', label: 'Sommaire' }, { href: rootPrefix + 'exercices/exercices.html', label: 'Exercices & projet' }),
    disclaimer(course, 'Sujets construits d’après le support officiel « Programmation VBA » (Dr TCHAZINO Tchamiè). ')
  ].join('\n\n');
}

function examens(course) {
  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Examens blancs du cours de Programmation VBA sous Excel B1 : sujets chronométrés avec corrigés détaillés.',
      active: 'examen',
      body: buildExamensBody(course, true)
    }
  };
}

/* ======================== Exercices & projet ======================== */

function exercices(course) {
  const item = (badge, cls, intro, solutions) => [
    '  <div class="item">',
    '    <div class="item__head"><span class="badge badge--' + cls + '">' + badge + '</span></div>',
    '    <ol>',
    intro.map(line => '      <li>' + line + '</li>').join('\n'),
    '    </ol>',
    '    <details><summary>Corrections &amp; procédures VBA</summary><div class="sol">' + solutions + '</div></details>',
    '  </div>'
  ].join('\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices supplémentaires &amp; projet d’automatisation VBA</h1>',
    '  <p class="lead">En complément des 18 exercices interactifs répartis dans les 6 chapitres (et accessibles ' +
    'depuis l’<a href="../atelier.html">atelier d’exercices</a>), voici des exercices d’entraînement gradués et un ' +
    'dossier complet de conception d’application Excel/VBA.</p>',

    '  <h2>Entraînement rapide (acquisition)</h2>',
    item('Échauffement', 'n1', [
      'Enregistrer une macro qui bascule Excel en style de référence L1C1 (<code>Application.ReferenceStyle = xlR1C1</code>), puis écrire la procédure inverse qui rétablit le style A1.',
      'Traduire en notation A1 les références <code>Cells(1, 4)</code>, <code>Cells(8, 2)</code> et <code>Range("C5").Offset(3, -2)</code>.',
      'Écrire une instruction VBA qui vide les cellules de saisie <code>B4:B15</code> de la feuille <code>"Devis"</code> sans effacer leurs bordures ni leur format monétaire.',
      'Corriger la déclaration fautive <code>Dim ligne, derniereLigne As Long</code> pour que les deux variables soient bien de type <code>Long</code>.'
    ], [
      '<p><strong>1. Style L1C1 / A1 :</strong> <code>Application.ReferenceStyle = xlR1C1</code> puis <code>Application.ReferenceStyle = xlA1</code>.</p>',
      '<p><strong>2. Adressage :</strong> <code>Cells(1, 4)</code> = <strong>D1</strong> ; <code>Cells(8, 2)</code> = <strong>B8</strong> ; <code>Range("C5").Offset(3, -2)</code> = ligne 8, colonne A soit <strong>A8</strong>.</p>',
      '<p><strong>3. Réinitialisation propre :</strong> <code>Worksheets("Devis").Range("B4:B15").ClearContents</code>.</p>',
      '<p><strong>4. Déclaration typée :</strong> <code>Dim ligne As Long, derniereLigne As Long</code> (avec <code>Option Explicit</code> en tête de module).</p>'
    ].join('\n')),

    '  <h2>Application</h2>',
    item('Application', 'n2', [
      'Écrire une fonction personnalisée <code>Function MentionJury(moyenne As Double) As String</code> utilisant <code>Select Case</code> pour renvoyer "Très Bien" (≥ 16), "Bien" (14 à 15,99), "Assez Bien" (12 à 13,99), "Passable" (10 à 11,99) ou "Ajourné" (&lt; 10).',
      'Écrire une boucle <code>For Each</code> qui parcourt la plage <code>C2:C100</code> et colorie en jaune (<code>ColorIndex = 6</code>) toutes les cellules dont le montant dépasse 500 000.',
      'Écrire une boucle <code>Do While</code> qui part de la ligne 2 et numérote automatiquement la colonne A jusqu’à la première ligne où la colonne B (nom du client) est vide.',
      'Écrire une procédure événementielle <code>Worksheet_Change</code> qui inscrit automatiquement en colonne E le nom de l’utilisateur (<code>Application.UserName</code>) dès qu’un montant est modifié en colonne D.'
    ], [
      '<p><strong>1. Fonction MentionJury :</strong> Utiliser <code>Select Case moyenne</code> avec <code>Case Is &gt;= 16</code>, <code>Case 14 To 15.99</code>, …, <code>Case Else</code> et affecter le texte à <code>MentionJury = ...</code>.</p>',
      '<p><strong>2. Boucle For Each :</strong> <code>For Each cel In Range("C2:C100") : If cel.Value &gt; 500000 Then cel.Interior.ColorIndex = 6 : Next cel</code>.</p>',
      '<p><strong>3. Boucle Do While :</strong> <code>i = 2 : Do While Cells(i, 2).Value &lt;&gt; "" : Cells(i, 1).Value = i - 1 : i = i + 1 : Loop</code>.</p>',
      '<p><strong>4. Événement Worksheet_Change :</strong> Dans le module de la feuille : <code>If Target.Column = 4 And Target.Row &gt;= 2 Then Target.Offset(0, 1).Value = Application.UserName</code>.</p>'
    ].join('\n')),

    '  <h2>Raisonnement</h2>',
    item('Raisonnement', 'n3', [
      'Écrire une procédure de purge qui supprime toutes les lignes entre la ligne 2 et la ligne 200 dont le statut en colonne F vaut "Annulé", sans sauter aucune ligne consécutive.',
      'Concevoir un formulaire <code>UserForm</code> d’enregistrement de commande comprenant un <code>TextBoxClient</code>, une <code>ComboBoxModePaiement</code> ("Espèces", "Virement", "Mobile Money") et un bouton <code>ButtonValider</code> qui ajoute la saisie sur la première ligne vide de la feuille.',
      'Sécuriser une procédure d’export avec <code>On Error GoTo</code> pour afficher le numéro (<code>Err.Number</code>) et la description (<code>Err.Description</code>) de l’erreur en cas de feuille ou de fichier manquant.'
    ], [
      '<p><strong>1. Purge à rebours :</strong> <code>For i = 200 To 2 Step -1 : If Cells(i, 6).Value = "Annulé" Then Rows(i).Delete : Next i</code>.</p>',
      '<p><strong>2. UserForm :</strong> Remplir la liste dans <code>UserForm_Initialize()</code> avec <code>.AddItem</code> ; dans <code>ButtonValider_Click()</code>, contrôler que les champs ne sont pas vides, trouver la première ligne vide avec une boucle <code>Do While</code>, écrire les valeurs puis appeler <code>Unload Me</code>.</p>',
      '<p><strong>3. Gestion d’erreurs :</strong> Placer <code>On Error GoTo GestionErr</code> en début de <code>Sub</code>, terminer le flux normal par <code>Exit Sub</code>, puis sous <code>GestionErr:</code> afficher <code>MsgBox Err.Number &amp; " : " &amp; Err.Description, vbCritical</code>.</p>'
    ].join('\n')),

    '  <h2>Dossier de synthèse — Application de Facturation &amp; Suivi de Stock sous Excel/VBA</h2>',
    box('situation', 'Cahier des charges du Projet B1', 'play', [
      '    <p>Concevoir un classeur <code>.xlsm</code> complet pour une PME commerciale comportant : une feuille <code>Catalogue</code>, une feuille <code>Facture</code> réinitialisable par un bouton (<code>ClearContents</code>), une fonction personnalisée de calcul de remise dégressive et un <code>UserForm</code> d’ajout rapide de nouveau client avec contrôle de saisie et gestion d’erreurs.</p>'
    ].join('\n')),
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices &amp; projet VBA — ' + course.brand,
      description: 'Exercices supplémentaires et projet de Programmation VBA sous Excel B1 : macros, Modèle Objet, boucles et UserForms.',
      active: 'exercices',
      body
    }
  };
}

/* ======================== Assemblage ======================== */

function render(kit, course, chapterList) {
  const pages = {};
  const chaptersWithNav = chapterList.map((chapitre, index) => {
    const next = chapterList[index + 1];
    return Object.assign({}, chapitre, {
      next: next
        ? { href: 'chapitre' + next.n + '.html', label: 'Chapitre ' + next.n + ' — ' + next.title }
        : { href: '../atelier.html', label: 'Atelier d’analyse VBA' }
    });
  });

  for (const chapitre of chaptersWithNav) {
    const body = kit.chapter(course, chapitre);
    pages['chapitres/chapitre' + chapitre.n + '.html'] = {
      title: 'Chapitre ' + chapitre.n + ' — ' + chapitre.title + ' | ' + course.brand,
      description: 'Chapitre ' + chapitre.n + ' du cours de Programmation VBA sous Excel B1 : ' + chapitre.toc +
        ' Théorie, exemples détaillés, études de cas d’application, QCM corrigés.',
      active: 'ch' + chapitre.n,
      dataChapter: chapitre.n,
      body
    };
  }

  Object.assign(pages, index(course, chapterList));
  Object.assign(pages, sommaire(course, chapterList));
  Object.assign(pages, atelier(course));
  Object.assign(pages, cartes(course, chapterList));
  Object.assign(pages, formules(course));
  Object.assign(pages, examens(course));
  Object.assign(pages, exercices(course));

  return pages;
}

module.exports = { render };

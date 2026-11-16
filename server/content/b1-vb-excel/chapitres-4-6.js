/**
 * Chapitres 4 à 6 du cours de Programmation VBA sous Excel — B1.
 *
 * Basé sur le support officiel B1 IT « Programmation VBA » (Dr TCHAZINO Tchamiè,
 * 47 pages, support1.pdf) :
 * - Chapitre 4 : Variables, Types de données (Integer, Long, Double, String,
 *                Boolean, Variant, Option Explicit), Opérateurs et Fonctions
 *                (Sub vs Function).
 * - Chapitre 5 : Structures de contrôle (If...Then...ElseIf...End If,
 *                Select Case, boucles For...Next, For Each...In,
 *                Do While/Until...Loop).
 * - Chapitre 6 : Boîtes de dialogue (MsgBox, InputBox), Gestion des erreurs
 *                (On Error GoTo) et Formulaires (UserForm).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Variables, Types de données (Integer, Long, Double, String, Boolean, Variant, Option Explicit), Opérateurs et Fonctions (Sub vs Function)',
    short: 'Variables, Types & Fonctions',
    toc: 'Déclarer avec Dim et imposer Option Explicit ; tableau des types VBA (Byte, Integer, Long, Single, Double, Currency, String, Boolean, Date, Object avec Set, Variant) ; portée (locale, module, Public, Const) ; opérateurs (&, Mod, And/Or/Not) ; procédures Sub vs fonctions personnalisées Function.',
    time: '≈ 3 h de travail',
    free: false,

    situation:
      'Lire et écrire directement dans les cellules de la feuille à chaque étape d’un calcul ralentit les macros ' +
      'et rend le code illisible. Le support du Dr TCHAZINO Tchamiè introduit alors les variables — zones nommées ' +
      'en mémoire vive (RAM) dotées d’un type précis — ainsi que les fonctions personnalisées (Function) capables ' +
      'd’enrichir Excel avec vos propres formules métier.',

    objectives: [
      'déclarer des variables typées avec Dim ... As Type et comprendre pourquoi Option Explicit est indispensable ;',
      'choisir le bon type de données (Integer vs Long pour les lignes Excel, Double/Currency, String, Boolean, Date, Object avec Set, Variant) ;',
      'distinguer la portée locale (Dim dans une procédure), module (Private/Dim en tête de module), publique (Public) et les constantes (Const) ;',
      'utiliser les opérateurs arithmétiques (dont \\ et Mod), de concaténation (&), de comparaison (<>) et logiques (And, Or, Not, Xor) ;',
      'différencier une procédure Sub d’une fonction Function et écrire une fonction personnalisable utilisable dans une cellule Excel.'
    ],

    sections: [
      {
        title: 'Déclaration des variables (Dim), règles de nommage et Option Explicit',
        html: [
          '<p>Une <strong>variable</strong> est un emplacement de la mémoire vive désigné par un identifiant (son nom) ' +
          'qui conserve une valeur modifiable au cours de l’exécution de la macro. En VBA, un nom de variable doit ' +
          'commencer par une <strong>lettre</strong>, compter au maximum 255 caractères, ne contenir <strong>ni espace, ' +
          'ni point, ni opérateur</strong> (le caractère souligné <code>_</code> est permis) et ne pas être un mot réservé ' +
          '(<code>Sub</code>, <code>Dim</code>, <code>For</code>, <code>Then</code>…). VBA ne distingue pas les majuscules ' +
          'des minuscules dans les noms.</p>',
          '<p>On déclare une variable avec le mot-clé <strong><code>Dim</code></strong> suivi de son type : ' +
          '<code>Dim compteur As Long</code>. Si l’on n’impose rien, VBA autorise l’utilisation de variables non déclarées ' +
          'en leur attribuant automatiquement le type universel <strong><code>Variant</code></strong>. C’est un piège ' +
          'redoutable : la moindre faute de frappe dans un nom de variable (par ex. <code>tauxTva</code> puis <code>tauxTav</code>) ' +
          'crée silencieusement une seconde variable vide valant <code>0</code> ! Pour l’interdire, on place toujours ' +
          'en première ligne du module l’directive :</p>',
          '<pre><code>Option Explicit</code></pre>',
          '<p>Avec <strong><code>Option Explicit</code></strong> (activable automatiquement dans VBE via <em>Outils → Options → ' +
          'onglet Éditeur → cocher Déclaration des variables obligatoire</em>), toute variable non déclarée déclenche ' +
          'immédiatement une erreur de compilation signalée avant même l’exécution.</p>',
          box('pitfall', 'Le piège de la déclaration multiple sur une seule ligne', 'warning',
            '    <p>En VBA, écrire <code>Dim a, b As Integer</code> ne déclare <strong>que <code>b</code></strong> en <code>Integer</code> : <code>a</code> (sans <code>As Type</code> explicite) devient un <strong><code>Variant</code></strong> ! Il faut toujours préciser le type de chaque variable : <strong><code>Dim a As Integer, b As Integer</code></strong>.</p>')
        ].join('\n')
      },
      {
        title: 'Les types de données VBA, le mot-clé Set (Object) et la portée des variables',
        html: [
          '<p>Le support de cours dresse le tableau des types fondamentaux de VBA selon la nature des données et la mémoire occupée :</p>',
          '<table>',
          '  <thead><tr><th>Type VBA</th><th>Taille mémoire</th><th>Plage de valeurs / Nature</th><th>Usage typique sous Excel</th></tr></thead>',
          '  <tbody>',
          '    <tr><td><code>Byte</code></td><td>1 octet</td><td>Entier de <code>0</code> à <code>255</code></td><td>Petits codes positifs, composantes RGB</td></tr>',
          '    <tr><td><code>Integer</code></td><td>2 octets</td><td>Entier signé de <code>-32 768</code> à <code>32 767</code></td><td>Petits compteurs (attention : dépassement de capacité au-delà de la ligne 32 767 !)</td></tr>',
          '    <tr><td><code>Long</code></td><td>4 octets</td><td>Entier signé de <code>-2 147 483 648</code> à <code>2 147 483 647</code></td><td><strong>Type recommandé pour tous les numéros de lignes Excel</strong> (une feuille moderne compte 1 048 576 lignes)</td></tr>',
          '    <tr><td><code>Single</code> / <code>Double</code></td><td>4 / 8 octets</td><td>Nombres décimaux à virgule flottante (simple / double précision)</td><td>Calculs scientifiques, moyennes, taux, pourcentages (<code>Double</code> par défaut)</td></tr>',
          '    <tr><td><code>Currency</code></td><td>8 octets</td><td>Décimal à virgule fixe (4 décimales exactes)</td><td>Montants comptables et financiers sans erreur d’arrondi binaire</td></tr>',
          '    <tr><td><code>String</code></td><td>Longueur variable</td><td>Chaîne de caractères entre guillemets <code>"..."</code></td><td>Noms, codes clients, messages texte</td></tr>',
          '    <tr><td><code>Boolean</code></td><td>2 octets</td><td>Valeur logique <code>True</code> (vrai) ou <code>False</code> (faux)</td><td>Drapeaux d’état, tests de validation</td></tr>',
          '    <tr><td><code>Date</code></td><td>8 octets</td><td>Dates et heures (littéraux entourés de <code>#</code>)</td><td>Échéances, calculs d’ancienneté</td></tr>',
          '    <tr><td><code>Object</code> (ou <code>Range</code>, <code>Worksheet</code>)</td><td>4 octets</td><td>Référence vers un objet Excel</td><td>S’affecte <strong>obligatoirement avec <code>Set</code></strong> : <code>Set plg = Range("A1:A10")</code></td></tr>',
          '    <tr><td><code>Variant</code></td><td>16 octets min.</td><td>Type générique par défaut pouvant contenir tout type</td><td>À réserver aux cas où le type est inconnu à l’avance (plus lourd et plus lent)</td></tr>',
          '  </tbody>',
          '</table>',
          '<p>La <strong>portée (visibilité)</strong> d’une variable dépend de l’endroit où elle est déclarée : ' +
          'déclarée avec <code>Dim</code> à l’intérieur d’une procédure <code>Sub</code> ou <code>Function</code>, elle est ' +
          '<strong>locale</strong> (créée à l’entrée de la procédure et détruite à sa sortie) ; déclarée avec <code>Dim</code> ' +
          'ou <code>Private</code> tout en haut d’un module (avant la première procédure), elle est partagée par ' +
          '<strong>toutes les procédures de ce module</strong> ; déclarée avec <strong><code>Public</code></strong> en tête ' +
          'd’un module standard, elle est accessible depuis <strong>tous les modules du projet</strong>. Enfin, une valeur ' +
          'fixe se déclare avec <strong><code>Const</code></strong> (ex. <code>Const TAUX_TVA As Double = 0.18</code>).</p>'
        ].join('\n')
      },
      {
        title: 'Opérateurs (&, Mod, logiques) et distinction Procédure Sub vs Fonction Function',
        html: [
          '<p>En VBA, les nombres décimaux s’écrivent toujours avec un <strong>point (<code>.</code>)</strong> comme séparateur ' +
          'décimal (<code>0.18</code>), jamais avec une virgule. Les opérateurs se répartissent en quatre familles :</p>',
          '<ul>',
          '  <li><strong>Arithmétiques</strong> : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code> (division décimale), <code>\\</code> (division entière : <code>7 \\ 2</code> vaut <code>3</code>), <code>Mod</code> (reste de la division entière : <code>7 Mod 2</code> vaut <code>1</code>) et <code>^</code> (puissance).</li>',
          '  <li><strong>Concaténation de texte</strong> : l’esperluette <strong><code>&amp;</code></strong> assemble deux chaînes ou du texte et un nombre (ex. <code>"Client " &amp; code &amp; " : " &amp; montant &amp; " FCFA"</code>). Toujours entourer <code>&amp;</code> d’espaces et l’utiliser de préférence à <code>+</code>.</li>',
          '  <li><strong>Comparaison</strong> : <code>=</code>, <code>&lt;&gt;</code> (différent de), <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</li>',
          '  <li><strong>Logiques</strong> : <code>And</code> (ET), <code>Or</code> (OU), <code>Not</code> (NON), <code>Xor</code> (OU exclusif).</li>',
          '</ul>',
          '<p>Le support établit enfin la distinction fondamentale entre une procédure <strong><code>Sub</code></strong> et ' +
          'une fonction <strong><code>Function</code></strong> :</p>',
          '<ul>',
          '  <li>Une procédure <strong><code>Sub</code></strong> réalise des actions (modifier des cellules, colorier, afficher un message) et <strong>ne renvoie pas de valeur</strong>.</li>',
          '  <li>Une fonction <strong><code>Function</code></strong> reçoit des arguments entre parenthèses, effectue un calcul et <strong>renvoie une valeur typée</strong>. En VBA, pour renvoyer le résultat, on l’affecte au <strong>nom même de la fonction</strong> (<code>NomFonction = resultat</code>) avant <code>End Function</code>.</li>',
          '</ul>',
          '<pre><code>Option Explicit\n\n' +
          '\' Fonction personnalisée (UDF) utilisable en VBA ET comme formule dans Excel :\n' +
          'Function MontantTTC(prixHT As Double, tauxTVA As Double) As Double\n' +
          '    MontantTTC = prixHT * (1 + tauxTVA)\n' +
          'End Function\n\n' +
          'Sub TesterCalcul()\n' +
          '    Dim ht As Double, ttc As Double\n' +
          '    ht = Range("B2").Value\n' +
          '    ttc = MontantTTC(ht, 0.18)  \' En VBA : séparateur virgule (,) et point décimal (.)\n' +
          '    Range("C2").Value = ttc\n' +
          'End Sub</code></pre>',
          box('mnemo', 'Utiliser sa Function directement dans une cellule Excel', 'pin',
            '    <p>Toute <code>Function</code> publique placée dans un module standard (<code>Module1</code>) apparaît dans la catégorie <em>Fonctions personnalisées</em> d’Excel. Dans une feuille Excel francophone, on l’appelle avec le <strong>point-virgule</strong> et la <strong>virgule décimale</strong> : <code>=MontantTTC(B2; 0,18)</code>, tandis que dans le code VBA on écrit <code>MontantTTC(ht, 0.18)</code>.</p>')
        ].join('\n')
      }
    ],

    questions: [
      {
        q: 'Quelle instruction placée tout en haut d’un module VBA oblige le programmeur à déclarer explicitement toutes ses variables avec Dim ?',
        opts: ['Option Explicit', 'Option Base 1', 'Dim Strict', 'Public Module'],
        correct: 0,
        exp: 'Option Explicit impose la déclaration préalable de chaque variable et bloque à la compilation toute variable non déclarée ou mal orthographiée.'
      },
      {
        q: 'Quel type de données VBA prend automatiquement une variable déclarée sans précision de type (par exemple Dim x) ?',
        opts: ['String', 'Variant', 'Integer', 'Object'],
        correct: 1,
        exp: 'En l’absence de clause As Type, VBA attribue par défaut le type générique Variant (au moins 16 octets en mémoire).'
      },
      {
        q: 'Pourquoi recommande-t-on le type Long plutôt que Integer pour une variable stockant un numéro de ligne Excel ?',
        opts: [
          'Parce que Integer n’accepte que des nombres à virgule',
          'Parce que Long consomme moins de mémoire vive que Integer',
          'Parce que Integer est limité à 32 767 et provoque une erreur de dépassement de capacité (Overflow) sur les feuilles dépassant 32 767 lignes',
          'Parce que la propriété Row renvoie une chaîne de caractères'
        ],
        correct: 2,
        exp: 'Le type Integer (2 octets) plafonne à 32 767, alors qu’une feuille Excel comporte jusqu’à 1 048 576 lignes. Le type Long (4 octets, jusqu’à plus de 2 milliards) évite l’erreur d’exécution 6 (Dépassement de capacité).'
      },
      {
        q: 'Comment affecte-t-on une référence d’objet (comme Range("A1:B10")) à une variable objet déclarée par Dim maPlage As Range ?',
        opts: [
          'maPlage = "A1:B10"',
          'Let maPlage = Range("A1:B10")',
          'Dim maPlage = Cells(1, 1)',
          'Set maPlage = Range("A1:B10")'
        ],
        correct: 3,
        exp: 'En VBA, toute affectation d’une référence d’objet (Range, Worksheet, Workbook, Object) exige obligatoirement le mot-clé Set devant le nom de la variable.'
      },
      {
        q: 'Comment une fonction personnalisée Function CalculPrime(ca As Double) As Double renvoie-t-elle son résultat en VBA ?',
        opts: [
          'En affectant le résultat au nom de la fonction : CalculPrime = ca * 0.05',
          'Avec l’instruction return ca * 0.05',
          'Avec l’instruction Exit Sub(ca * 0.05)',
          'En écrivant Result.Value = ca * 0.05'
        ],
        correct: 0,
        exp: 'VBA n’utilise pas return pour renvoyer la valeur d’une Function : on affecte la valeur de retour directement à l’identifiant de la fonction (CalculPrime = ca * 0.05).'
      },
      {
        q: 'Quel opérateur est recommandé en VBA pour concaténer (assembler) deux chaînes de caractères ou une chaîne et un nombre ?',
        opts: [
          'L’opérateur point .',
          'L’opérateur esperluette &',
          'L’opérateur double barre ||',
          'Le mot-clé Join'
        ],
        correct: 1,
        exp: 'L’opérateur & (entouré d’espaces) convertit automatiquement les nombres en texte et concatène sans risque d’ambiguïté avec l’addition arithmétique +.'
      },
      {
        q: 'Dans la déclaration VBA Dim montantHT, montantTTC As Double, quel est le type réel de la variable montantHT ?',
        opts: [
          'Double',
          'Single',
          'Variant',
          'Integer'
        ],
        correct: 2,
        exp: 'En VBA, chaque variable doit avoir son propre As Type. Dans Dim montantHT, montantTTC As Double, seule montantTTC est de type Double ; montantHT est de type Variant.'
      },
      {
        q: 'Quel mot-clé permet de déclarer en tête d’un module standard une variable globale accessible depuis tous les modules du projet VBA ?',
        opts: ['Local', 'Static', 'Const', 'Public'],
        correct: 3,
        exp: 'Le mot-clé Public placé en tête d’un module standard rend la variable visible dans l’ensemble des modules du projet VBA.'
      }
    ],

    pitfalls: [
      'Oublier Option Explicit et perdre une heure sur une variable mal orthographiée valant 0.',
      'Écrire Dim i, j As Long en croyant que i est de type Long (i est en réalité Variant !).',
      'Oublier le mot-clé Set lors de l’affectation d’une variable objet (Set f = Worksheets("Ventes")).',
      'Écrire un nombre décimal avec une virgule (0,18) dans l’éditeur VBE au lieu du point (0.18).'
    ],

    methodTitle: 'Méthode — choisir ses variables et structurer ses fonctions',
    method: [
      'Activer systématiquement Option Explicit en première ligne de chaque module.',
      'Déclarer les compteurs de lignes en Long, les montants en Double ou Currency, les textes en String et les plages en Range (avec Set).',
      'Utiliser une Function dès qu’un calcul doit renvoyer une valeur (ou être appelé comme formule dans une cellule Excel) et une Sub pour les actions sur l’interface.',
      'Tester la Function dans la feuille Excel avec le séparateur point-virgule (;).'
    ],

    summary: [
      'Option Explicit oblige à déclarer toutes les variables (Dim nom As Type) et élimine les bugs de faute de frappe.',
      'Types clés : Long (lignes Excel), Integer (≤ 32 767), Double/Currency (décimaux), String (texte), Boolean (True/False), Date, Object (affecté avec Set), Variant (défaut).',
      'L’opérateur & concatène les chaînes ; Mod donne le reste entier ; le point . est le séparateur décimal en code VBA.',
      'Une Sub exécute des actions sans retour ; une Function renvoie un résultat en l’affectant à son propre nom (NomFonction = resultat).'
    ],

    checklist: [
      'Je sais pourquoi Option Explicit et le type Long (au lieu de Integer) protègent mes macros.',
      'Je sais déclarer correctement plusieurs variables typées et utiliser Set pour les objets.',
      'Je sais écrire une Function VBA et l’appeler aussi bien dans un Sub que dans une cellule Excel.',
      'Je maîtrise la différence de portée entre Dim (procédure), Private (module) et Public (projet).'
    ],

    notions: [
      '<strong><code>Option Explicit</code></strong> : directive imposant la déclaration préalable de toutes les variables.',
      '<strong><code>Dim ... As Type</code></strong> : instruction de déclaration d’une variable typée en mémoire.',
      '<strong><code>Long</code> vs <code>Integer</code></strong> : entier 4 octets (±2 milliards, adapté aux lignes Excel) vs 2 octets (±32 767).',
      '<strong><code>Double</code> &amp; <code>Currency</code></strong> : nombres décimaux en virgule flottante double précision et en virgule fixe monétaire.',
      '<strong><code>Variant</code></strong> : type générique par défaut (16 octets min.) attribué aux variables non typées.',
      '<strong><code>Set</code></strong> : mot-clé obligatoire pour affecter une référence à une variable objet (<code>Range</code>, <code>Worksheet</code>).',
      '<strong>Opérateur <code>&amp;</code></strong> : opérateur de concaténation de chaînes de caractères en VBA.',
      '<strong><code>Function</code> (UDF)</strong> : procédure renvoyant une valeur par affectation à son nom, utilisable dans les formules Excel.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — revois le tableau des types VBA, Option Explicit et la syntaxe de retour d’une Function.' },
      { cls: 'mid', text: '50–69 % — attention aux pièges Dim a, b As Integer et à l’obligation du mot-clé Set.' },
      { cls: 'good', text: '70–94 % — bon niveau, vérifie la portée des variables et les opérateurs Mod et &.' },
      { cls: 'top', text: '≥ 95 % — maîtrise complète des variables, types et fonctions VBA.' }
    ],

    flashcards: [
      { q: 'À quoi sert Option Explicit en tête de module ?', a: 'À rendre obligatoire la déclaration de toutes les variables avec Dim, ce qui détecte immédiatement les fautes de frappe à la compilation.' },
      { q: 'Pourquoi préférer Long à Integer pour les lignes d’une feuille Excel ?', a: 'Integer plafonne à 32 767 (erreur Overflow au-delà), tandis que Long va jusqu’à 2 147 483 647 et couvre les 1 048 576 lignes d’Excel.' },
      { q: 'Quel est le piège de Dim x, y As Integer ?', a: 'Seul y est déclaré en Integer ; x, n’ayant pas de clause As Type, est créé en Variant. Il faut écrire Dim x As Integer, y As Integer.' },
      { q: 'Comment une Function renvoie-t-elle sa valeur en VBA ?', a: 'En affectant le résultat au nom même de la fonction avant End Function (ex. CalculTTC = ht * 1.18).' },
      { q: 'Quel mot-clé est obligatoire pour affecter un objet Range à une variable ?', a: 'Le mot-clé Set : Set maPlage = Range("A1:B10").' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Structures de contrôle (If...Then...ElseIf...End If, Select Case, boucles For...Next, For Each...In, Do While/Until...Loop)',
    short: 'Conditions & Boucles',
    toc: 'Branchements conditionnels If...Then...ElseIf...Else...End If et Select Case (To, Is, Case Else) ; boucles à compteur For...Next et Step -1 ; boucles de collection For Each...In ; boucles conditionnelles Do While / Do Until ; sorties anticipées Exit For, Exit Do, Exit Sub.',
    time: '≈ 3 h de travail',
    free: false,

    situation:
      'Une macro enregistrée est purement linéaire : elle répète toujours les mêmes lignes du début à la fin. ' +
      'Pour traiter un tableau de 500 factures où seules les factures impayées doivent être relancées, ou pour ' +
      's’arrêter automatiquement dès qu’une cellule vide est rencontrée, il faut doter notre programme des ' +
      'structures de contrôle du chapitre 5 du support : les conditions et les boucles.',

    objectives: [
      'écrire des tests conditionnels complets avec If...Then...ElseIf...Else...End If en ordonnant correctement les seuils ;',
      'remplacer une cascade de tests sur une même expression par un bloc Select Case (valeurs multiples, plage To, comparaison Is >=, Case Else) ;',
      'parcourir une plage de lignes avec For i = début To fin [Step pas]...Next i et utiliser Step -1 pour supprimer des lignes sans décalage ;',
      'parcourir une collection d’objets (cellules d’un Range ou feuilles d’un classeur) avec For Each élément In collection...Next ;',
      'maîtriser les boucles Do While...Loop et Do Until...Loop (test en entrée vs test en sortie) et éviter les boucles infinies.'
    ],

    sections: [
      {
        title: 'Les structures conditionnelles : If...Then...ElseIf...End If et Select Case',
        html: [
          '<p>Le test <strong><code>If ... Then ... ElseIf ... Else ... End If</code></strong> permet d’exécuter des blocs ' +
          'd’instructions différents selon qu’une condition booléenne est vraie (<code>True</code>) ou fausse (<code>False</code>). ' +
          'Dès qu’une branche est vérifiée, VBA exécute ses instructions puis saute directement à <code>End If</code> : ' +
          'comme avec la fonction <code>SI</code> d’Excel, il faut donc toujours tester les paliers <strong>du plus strict ' +
          'au plus large</strong>.</p>',
          '<pre><code>If montant >= 50000 Then\n' +
          '    tauxRemise = 0.15\n' +
          'ElseIf montant >= 10000 Then\n' +
          '    tauxRemise = 0.08\n' +
          'Else\n' +
          '    tauxRemise = 0\n' +
          'End If</code></pre>',
          '<p>Lorsqu’on évalue une <strong>même variable</strong> par rapport à plusieurs valeurs, intervalles ou seuils, ' +
          'la structure <strong><code>Select Case</code></strong> est beaucoup plus lisible qu’une suite de <code>ElseIf</code>. ' +
          'Le support détaille ses trois syntaxes de cas : liste de valeurs séparées par des virgules (<code>Case 1, 3, 5</code>), ' +
          'intervalle borné avec le mot-clé <strong><code>To</code></strong> (<code>Case 10 To 14</code>), comparaison ouverte ' +
          'avec le mot-clé <strong><code>Is</code></strong> (<code>Case Is &gt;= 15</code>), et cas par défaut <strong><code>Case Else</code></strong> :</p>',
          '<pre><code>Select Case note\n' +
          '    Case Is >= 16\n' +
          '        mention = "Très Bien"\n' +
          '    Case 14 To 15.99\n' +
          '        mention = "Bien"\n' +
          '    Case 12 To 13.99\n' +
          '        mention = "Assez Bien"\n' +
          '    Case 10 To 11.99\n' +
          '        mention = "Passable"\n' +
          '    Case Else\n' +
          '        mention = "Ajourné"\n' +
          'End Select</code></pre>'
        ].join('\n')
      },
      {
        title: 'Les boucles à compteur (For...Next, Step) et de collection (For Each...In)',
        html: [
          '<p>Lorsque le nombre d’itérations est connu, on utilise la boucle <strong><code>For compteur = début To fin [Step pas] ... Next compteur</code></strong>. ' +
          'Par défaut, le pas d’incrémentation (<code>Step</code>) vaut <code>+1</code>. On peut préciser un pas de <code>2</code> ' +
          '(<code>Step 2</code> pour traiter une ligne sur deux) ou un <strong>pas négatif (<code>Step -1</code>)</strong> pour parcourir ' +
          'un tableau de bas en haut :</p>',
          '<pre><code>Dim i As Long\n' +
          '\' Parcourir les lignes 2 à 20 pour calculer le montant TTC en colonne C :\n' +
          'For i = 2 To 20\n' +
          '    Cells(i, 3).Value = Cells(i, 2).Value * 1.18\n' +
          'Next i</code></pre>',
          box('pitfall', 'Pourquoi supprimer des lignes exige toujours For i = fin To début Step -1', 'warning',
            '    <p>Si vous supprimez la ligne <code>i</code> (<code>Rows(i).Delete</code>) dans une boucle croissante <code>For i = 2 To 20</code>, l’ancienne ligne <code>i + 1</code> remonte immédiatement au numéro <code>i</code>, tandis que le compteur passe à <code>i + 1</code> : la ligne qui vient de remonter est <strong>sautée et jamais contrôlée</strong> ! Pour supprimer des lignes sous condition, on parcourt <strong>toujours du bas vers le haut</strong> : <code>For i = 20 To 2 Step -1</code>.</p>'),
          '<p>Pour parcourir tous les objets d’une collection (toutes les cellules d’une plage ou toutes les feuilles d’un classeur) ' +
          'sans gérer de numéro d’indice, VBA offre la boucle <strong><code>For Each élément In collection ... Next élément</code></strong> :</p>',
          '<pre><code>Dim cel As Range\n' +
          'For Each cel In Range("B2:B50")\n' +
          '    If cel.Value < 0 Then\n' +
          '        cel.Interior.Color = RGB(255, 200, 200) \' Surligne les négatifs en rouge clair\n' +
          '    End If\n' +
          'Next cel</code></pre>'
        ].join('\n')
      },
      {
        title: 'Les boucles conditionnelles Do While / Do Until et les sorties anticipées (Exit)',
        html: [
          '<p>Lorsque le nombre de lignes du tableau est inconnu à l’avance (par exemple : lire une colonne jusqu’à la ' +
          'première cellule vide), on utilise une boucle conditionnelle <strong><code>Do ... Loop</code></strong>, qui se décline selon deux critères :</p>',
          '<ul>',
          '  <li><strong><code>While</code> (tant que) vs <code>Until</code> (jusqu’à ce que)</strong> : <code>Do While Cells(i, 1).Value &lt;&gt; ""</code> continue <em>tant que</em> la cellule n’est pas vide ; <code>Do Until Cells(i, 1).Value = ""</code> continue <em>jusqu’à ce que</em> la cellule soit vide. Ces deux écritures sont logiquement équivalentes.</li>',
          '  <li><strong>Condition en tête (<code>Do While...Loop</code>) vs condition en pied (<code>Do...Loop While</code>)</strong> : placée après <code>Do</code>, la condition est vérifiée <strong>avant</strong> la première itération (si la première cellule est déjà vide, le corps s’exécute <strong>0 fois</strong>). Placée après <code>Loop</code>, la condition est vérifiée <strong>à la fin</strong> : le corps de la boucle s’exécute donc <strong>au moins une fois</strong>.</li>',
          '</ul>',
          '<pre><code>Dim lig As Long\n' +
          'lig = 2\n' +
          'Do While Cells(lig, 1).Value <> ""\n' +
          '    Cells(lig, 4).Value = "Vérifié"\n' +
          '    lig = lig + 1  \' INDISPENSABLE pour éviter une boucle infinie !\n' +
          'Loop</code></pre>',
          '<p>Enfin, VBA permet de quitter prématurément une boucle ou une procédure dès qu’un objectif est atteint ' +
          '(par exemple, dès que le client recherché a été trouvé) grâce aux instructions de sortie anticipée : ' +
          '<strong><code>Exit For</code></strong> (sort de la boucle <code>For</code> ou <code>For Each</code>), ' +
          '<strong><code>Exit Do</code></strong> (sort de la boucle <code>Do...Loop</code>), ' +
          '<strong><code>Exit Sub</code></strong> et <strong><code>Exit Function</code></strong> (quitte immédiatement la procédure ou la fonction).</p>'
        ].join('\n')
      }
    ],

    questions: [
      {
        q: 'Dans un bloc If...Then...ElseIf...Else multi-lignes en VBA, quelle instruction est obligatoire pour fermer la structure ?',
        opts: ['End If', 'End Sub', 'Next If', 'Loop'],
        correct: 0,
        exp: 'Tout bloc If...Then écrit sur plusieurs lignes doit impérativement se terminer par End If (seul le If condensé sur une seule ligne ne prend pas de End If).'
      },
      {
        q: 'Dans une structure Select Case, quelle syntaxe permet de tester si la variable est supérieure ou égale à 100 ?',
        opts: [
          'Case >= 100 To Max',
          'Case Is >= 100',
          'Case Where >= 100',
          'Case Else >= 100'
        ],
        correct: 1,
        exp: 'Avec un opérateur de comparaison (<, >, <=, >=, <>) dans un Select Case, VBA utilise le mot-clé Is : Case Is >= 100 (et le mot-clé To pour un intervalle fermé comme Case 50 To 99).'
      },
      {
        q: 'Pourquoi utilise-t-on For i = 50 To 2 Step -1 plutôt que For i = 2 To 50 lorsqu’une macro supprime des lignes avec Rows(i).Delete ?',
        opts: [
          'Parce que Rows(i).Delete ne fonctionne que sur les numéros pairs',
          'Parce que Step -1 consomme deux fois moins de mémoire RAM',
          'Parce que supprimer une ligne en avançant décale vers le haut la ligne suivante, qui se retrouve sautée par le compteur',
          'Parce que VBA interdit Rows(i).Delete avec un pas positif'
        ],
        correct: 2,
        exp: 'Quand la ligne i est supprimée, l’ancienne ligne i+1 prend immédiatement le numéro i. Si le compteur monte à i+1, cette ligne n’est jamais examinée. En descendant avec Step -1, le décalage n’affecte que les lignes déjà traitées.'
      },
      {
        q: 'Quelle boucle est la plus adaptée pour parcourir directement chaque feuille de calcul d’un classeur sans gérer de compteur numérique ?',
        opts: [
          'Do Until Worksheets.End',
          'Select Case ActiveSheet',
          'While Workbooks.Count > 0',
          'For Each f In ThisWorkbook.Worksheets ... Next f'
        ],
        correct: 3,
        exp: 'La boucle For Each élément In collection ... Next parcourt automatiquement tous les objets d’une collection (ici chaque objet Worksheet f de ThisWorkbook.Worksheets).'
      },
      {
        q: 'Quelle est la différence entre Do While condition ... Loop et Do ... Loop While condition ?',
        opts: [
          'Do While...Loop teste la condition avant d’entrer (0 passage possible), tandis que Do...Loop While teste à la fin (au moins 1 passage garanti)',
          'Do...Loop While s’exécute deux fois plus vite',
          'Do While...Loop ne peut pas contenir d’instruction If',
          'Il n’existe aucune différence de comportement même si la condition est fausse au départ'
        ],
        correct: 0,
        exp: 'Lorsque le test est placé en tête (Do While condition), le corps ne s’exécute jamais si la condition est fausse d’emblée. Placé en pied (Loop While condition), le corps est exécuté une première fois avant le test.'
      },
      {
        q: 'Que se passe-t-il dans une boucle Do While Cells(i, 1).Value <> "" ... Loop si le programmeur oublie l’instruction i = i + 1 ?',
        opts: [
          'VBA incrémente automatiquement i de 1 à chaque tour',
          'La macro entre dans une boucle infinie en relisant indéfiniment la même ligne i (blocage d’Excel)',
          'La boucle s’arrête immédiatement après le premier tour',
          'Excel supprime la colonne A'
        ],
        correct: 1,
        exp: 'Contrairement à For...Next qui incrémente son compteur automatiquement, Do While...Loop exige que le programmeur fasse avancer la variable de parcours (i = i + 1), faute de quoi la condition reste éternellement vraie sur la même cellule.'
      },
      {
        q: 'Quelle instruction permet de quitter immédiatement une boucle For...Next dès que la valeur recherchée a été trouvée, sans attendre la fin du compteur ?',
        opts: ['Break', 'Stop For', 'Exit For', 'End For'],
        correct: 2,
        exp: 'En VBA, Exit For interrompt immédiatement la boucle For (ou For Each) en cours et poursuit l’exécution après le Next (de même, Exit Do quitte une boucle Do...Loop).'
      },
      {
        q: 'Combien de fois le corps de la boucle For k = 2 To 10 Step 2 ... Next k est-il exécuté ?',
        opts: [
          '10 fois',
          '8 fois',
          '4 fois',
          '5 fois (pour k = 2, 4, 6, 8 et 10)'
        ],
        correct: 3,
        exp: 'Avec un départ à 2, une fin à 10 incluse et un pas Step 2, la variable k prend successivement les 5 valeurs : 2, 4, 6, 8 et 10.'
      }
    ],

    pitfalls: [
      'Oublier d’incrémenter le compteur (i = i + 1) dans une boucle Do While / Do Until, provoquant une boucle infinie.',
      'Supprimer des lignes dans une boucle croissante For i = 2 To N au lieu de décroître avec Step -1.',
      'Oublier le mot-clé Is devant un opérateur de comparaison dans un Select Case (écrire Case Is >= 10 et non Case >= 10).',
      'Confondre Do While (continue tant que c’est vrai) et Do Until (continue jusqu’à ce que cela devienne vrai).'
    ],

    methodTitle: 'Méthode — choisir la bonne boucle pour chaque tâche Excel',
    method: [
      'Nombre de lignes connu et fixe (ex. lignes 2 à 100) : utiliser For i = 2 To 100 ... Next i.',
      'Suppression de lignes sous condition : utiliser impérativement For i = derniereLigne To 2 Step -1.',
      'Traitement de chaque cellule d’une plage ou de chaque feuille d’un classeur : utiliser For Each obj In collection.',
      'Parcours jusqu’à la première cellule vide (longueur inconnue) : utiliser Do While Cells(i, 1).Value <> "" avec i = i + 1.'
    ],

    summary: [
      'If...Then...ElseIf...Else...End If et Select Case (To, Is, Case Else) dirigent le flux selon des conditions.',
      'For i = début To fin [Step pas]...Next i répète à compteur ; Step -1 parcourt à l’envers (indispensable pour supprimer des lignes).',
      'For Each élément In collection...Next parcourt chaque objet d’un Range ou de Worksheets.',
      'Do While / Do Until...Loop boucle selon une condition (en entrée ou en sortie) ; Exit For / Exit Do / Exit Sub permettent de sortir immédiatement.'
    ],

    checklist: [
      'Je sais écrire un Select Case utilisant des valeurs multiples, To, Is >= et Case Else.',
      'Je sais expliquer pourquoi la suppression de lignes requiert Step -1.',
      'Je sais parcourir une plage avec For Each cel In Range("...").',
      'Je sais écrire une boucle Do While qui s’arrête à la première cellule vide sans boucler à l’infini.'
    ],

    notions: [
      '<strong><code>If ... Then ... ElseIf ... Else ... End If</code></strong> : structure conditionnelle à branchements multiples.',
      '<strong><code>Select Case ... End Select</code></strong> : aiguillage multi-cas utilisant <code>To</code> (intervalle), <code>Is</code> (comparaison) et <code>Case Else</code>.',
      '<strong><code>For ... To ... [Step pas] ... Next</code></strong> : boucle à compteur automatique (croissant ou décroissant avec <code>Step -1</code>).',
      '<strong><code>For Each ... In ... Next</code></strong> : boucle parcourant tous les objets d’une collection (cellules, feuilles, classeurs).',
      '<strong><code>Do While ... Loop</code></strong> : boucle répétée <em>tant que</em> la condition est vraie.',
      '<strong><code>Do Until ... Loop</code></strong> : boucle répétée <em>jusqu’à ce que</em> la condition devienne vraie.',
      '<strong><code>Exit For</code> / <code>Exit Do</code></strong> : sortie anticipée immédiate de la boucle en cours.',
      '<strong>Boucle infinie</strong> : erreur logique où la condition d’arrêt d’un <code>Do...Loop</code> n’est jamais atteinte (oubli de <code>i = i + 1</code>).'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends la syntaxe de If...End If, Select Case et For...Next.' },
      { cls: 'mid', text: '50–69 % — vérifie la différence entre Do While et Do Until ainsi que l’usage de Step -1.' },
      { cls: 'good', text: '70–94 % — bon niveau, entraîne-toi sur les parcours de tableaux des études de cas.' },
      { cls: 'top', text: '≥ 95 % — maîtrise complète des structures conditionnelles et des boucles VBA.' }
    ],

    flashcards: [
      { q: 'Comment écrire un intervalle et une comparaison dans un Select Case ?', a: 'Intervalle avec To (ex. Case 10 To 20) ; comparaison avec Is (ex. Case Is >= 50) ; défaut avec Case Else.' },
      { q: 'Pourquoi parcourir avec Step -1 pour supprimer des lignes ?', a: 'Parce que Rows(i).Delete fait remonter la ligne i+1 au rang i : en descendant (For i = N To 2 Step -1), on ne saute aucune ligne.' },
      { q: 'Différence entre Do While et Do Until ?', a: 'Do While répète TANT QUE la condition est vraie ; Do Until répète JUSQU’À CE QUE la condition devienne vraie.' },
      { q: 'Comment parcourir toutes les cellules de A1:A20 sans indice ?', a: 'Avec Dim c As Range puis For Each c In Range("A1:A20") ... Next c.' },
      { q: 'Comment sortir immédiatement d’une boucle For ou d’une procédure Sub ?', a: 'Exit For quitte la boucle For ; Exit Do quitte la boucle Do ; Exit Sub quitte immédiatement la procédure.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Boîtes de dialogue (MsgBox, InputBox), Gestion des erreurs (On Error GoTo) et Formulaires (UserForm)',
    short: 'MsgBox, Erreurs & UserForm',
    toc: 'Dialoguer avec l’utilisateur : MsgBox (boutons vbYesNo, retour vbYes/vbNo, arguments nommés :=) et InputBox ; intercepter les erreurs d’exécution (On Error GoTo, On Error Resume Next, objet Err) ; concevoir et piloter un formulaire UserForm (Label, TextBox, ComboBox, CommandButton, Show, Hide vs Unload Me).',
    time: '≈ 3 h de travail',
    free: false,

    situation:
      'Pour qu’un outil Excel devienne une véritable application métier utilisable par des collègues non ' +
      'informaticiens, il doit dialoguer clairement avec l’utilisateur (demander une confirmation, recueillir ' +
      'un paramètre, proposer un formulaire de saisie guidé UserForm) et ne jamais planter brutalement sur un ' +
      'message d’erreur technique incompréhensible.',

    objectives: [
      'afficher des messages et récupérer le choix de l’utilisateur avec MsgBox (vbYesNo, vbInformation, vbYes, vbNo) et les arguments nommés (:=) ;',
      'recueillir une saisie utilisateur avec InputBox et contrôler les cas d’annulation ou de saisie vide ;',
      'mettre en place une gestion d’erreurs robuste avec On Error GoTo Etiquette, Exit Sub, On Error Resume Next et l’objet Err (Err.Number, Err.Description) ;',
      'concevoir un formulaire UserForm dans VBE avec ses contrôles (Label, TextBox, ComboBox/ListBox, CommandButton) ;',
      'coder les événements du formulaire (UserForm_Initialize, AddItem, CommandButton_Click) et maîtriser son cycle de vie (Load, Show, Hide vs Unload Me).'
    ],

    sections: [
      {
        title: 'Les boîtes de dialogue natives : MsgBox et InputBox',
        html: [
          '<p>La fonction <strong><code>MsgBox(prompt, [buttons], [title])</code></strong> affiche une boîte de dialogue ' +
          'modale. Le support du Dr TCHAZINO Tchamiè distingue deux façons de l’appeler :</p>',
          '<ul>',
          '  <li><strong>Comme simple instruction d’information (sans valeur de retour)</strong> : on n’utilise <strong>pas de parenthèses</strong> autour des arguments (sauf si l’on utilise <code>Call</code>). Ex. : <code>MsgBox "Sauvegarde effectuée !", vbInformation, "Bilan"</code>.</li>',
          '  <li><strong>Comme fonction (pour savoir sur quel bouton l’utilisateur a cliqué)</strong> : on place les arguments <strong>entre parenthèses</strong> et on affecte le retour à une variable entière. On combine le choix des boutons (<code>vbOKOnly</code> = 0, <code>vbOKCancel</code> = 1, <code>vbYesNo</code> = 4, <code>vbYesNoCancel</code> = 3) et l’icône (<code>vbCritical</code> = 16, <code>vbQuestion</code> = 32, <code>vbExclamation</code> = 48, <code>vbInformation</code> = 64) avec le signe <code>+</code>, puis on teste la réponse (<code>vbOK</code> = 1, <code>vbCancel</code> = 2, <code>vbYes</code> = 6, <code>vbNo</code> = 7).</li>',
          '</ul>',
          '<p>On peut passer les arguments par position (dans l’ordre exact) ou <strong>par nom</strong> avec l’opérateur ' +
          '<strong><code>:=</code></strong> (dans n’importe quel ordre, par ex. <code>MsgBox Title:="Alerte", Prompt:="Vérifiez la ligne"</code>). ' +
          'Pour demander à l’utilisateur de saisir une valeur, on utilise <strong><code>InputBox(prompt, [title], [default])</code></strong>, ' +
          'qui renvoie toujours une chaîne de caractères <code>String</code> (vide <code>""</code> si l’utilisateur clique sur Annuler) :</p>',
          '<pre><code>Dim nomClient As String, rep As Integer\n' +
          'nomClient = InputBox("Entrez le nom du client :", "Nouveau dossier", "SARL Togo")\n' +
          'If nomClient = "" Then Exit Sub  \' Annulation ou saisie vide\n\n' +
          'rep = MsgBox("Créer la fiche de " & nomClient & " ?", vbYesNo + vbQuestion, "Confirmation")\n' +
          'If rep = vbYes Then\n' +
          '    Range("A2").Value = nomClient\n' +
          'End If</code></pre>'
        ].join('\n')
      },
      {
        title: 'La gestion des erreurs d’exécution : On Error GoTo et l’objet Err',
        html: [
          '<p>Une erreur d’exécution survient lorsqu’une instruction valide syntaxiquement échoue face aux données ' +
          'réelles : division par zéro (<strong>erreur 11</strong>), feuille ou classeur introuvable dans une collection ' +
          '(<strong>erreur 9</strong> <em>Indice en dehors de la plage / Subscript out of range</em>), texte saisi au lieu ' +
          'd’un nombre (<strong>erreur 13</strong> <em>Incompatibilité de type / Type mismatch</em>), ou action interdite ' +
          'sur une feuille protégée (<strong>erreur 1004</strong>).</p>',
          '<p>Pour éviter l’arrêt brutal d’Excel, on place en début de procédure une instruction <strong><code>On Error</code></strong> :</p>',
          '<ul>',
          '  <li><strong><code>On Error GoTo GestionErreur</code></strong> : dès qu’une erreur survient, VBA saute immédiatement à l’étiquette <code>GestionErreur:</code> placée en fin de procédure. Il faut impérativement placer <strong><code>Exit Sub</code></strong> (ou <code>Exit Function</code>) juste avant l’étiquette pour que l’exécution normale ne tombe pas dans le bloc d’erreur !</li>',
          '  <li><strong><code>On Error Resume Next</code></strong> : ignore l’erreur et passe à la ligne suivante (utile pour tenter une opération optionnelle puis tester <code>If Err.Number &lt;&gt; 0 Then</code>).</li>',
          '  <li><strong><code>On Error GoTo 0</code></strong> : désactive le gestionnaire courant et rétablit le comportement standard de VBA.</li>',
          '</ul>',
          '<pre><code>Sub ActiverFeuilleClient(nomFeuille As String)\n' +
          '    On Error GoTo FeuilleAbsente\n' +
          '    Worksheets(nomFeuille).Select\n' +
          '    Exit Sub  \' Sortie normale avant le gestionnaire !\n\n' +
          'FeuilleAbsente:\n' +
          '    MsgBox "Erreur " & Err.Number & " : la feuille [" & nomFeuille & "] n\'existe pas." & _\n' +
          '           vbCrLf & "Détail : " & Err.Description, vbCritical, "Feuille introuvable"\n' +
          'End Sub</code></pre>'
        ].join('\n')
      },
      {
        title: 'Les formulaires personnalisés (UserForm) : contrôles, initialisation et cycle de vie',
        html: [
          '<p>Lorsque <code>InputBox</code> ne suffit plus (saisie simultanée d’un nom, d’une catégorie dans une liste ' +
          'déroulante et d’un montant), on crée un <strong>formulaire personnalisé (<code>UserForm</code>)</strong> dans VBE ' +
          'via <em>Insertion → UserForm</em>. À l’aide de la <strong>Boîte à outils Contrôles</strong>, on y dépose :</p>',
          '<ul>',
          '  <li><strong>Intitulé (<code>Label</code>)</strong> : étiquette de texte fixe (propriété <code>Caption</code>).</li>',
          '  <li><strong>Zone de texte (<code>TextBox</code>)</strong> : champ de saisie libre (propriété <code>Value</code> ou <code>Text</code>).</li>',
          '  <li><strong>Zone de liste modifiable (<code>ComboBox</code>) / Zone de liste (<code>ListBox</code>)</strong> : liste déroulante alimentée soit par la propriété <code>RowSource</code> (ex. <code>Feuil1!A2:A10</code>), soit par programmation avec la méthode <strong><code>.AddItem</code></strong> dans l’événement <strong><code>UserForm_Initialize()</code></strong>.</li>',
          '  <li><strong>Case à cocher (<code>CheckBox</code>)</strong>, <strong>Bouton d’option (<code>OptionButton</code>)</strong> et <strong>Cadre (<code>Frame</code>)</strong>.</li>',
          '  <li><strong>Bouton de commande (<code>CommandButton</code>)</strong> : bouton Valider ou Annuler (propriétés <code>Caption</code>, <code>Default = True</code> pour la touche Entrée, <code>Cancel = True</code> pour Échap).</li>',
          '</ul>',
          '<p>Le support insiste sur le cycle de vie du <code>UserForm</code> et la différence cruciale entre <code>Hide</code> et <code>Unload</code> :</p>',
          '<ul>',
          '  <li><strong><code>MonForm.Show</code></strong> : charge (en déclenchant <code>Private Sub UserForm_Initialize()</code>) et affiche le formulaire à l’écran.</li>',
          '  <li><strong><code>MonForm.Hide</code> (ou <code>Me.Hide</code>)</strong> : masque visuellement le formulaire mais <strong>le conserve en mémoire vive</strong>, ce qui permet à la macro appelante de lire encore le contenu de <code>MonForm.TextBoxNom.Value</code>.</li>',
          '  <li><strong><code>Unload MonForm</code> (ou <code>Unload Me</code>)</strong> : ferme le formulaire et <strong>le décharge complètement de la mémoire</strong> (toutes les valeurs saisies dans les contrôles sont effacées).</li>',
          '</ul>',
          '<pre><code>\' Dans le module de code du UserForm (FrmSaisie) :\n' +
          'Private Sub UserForm_Initialize()\n' +
          '    ComboBoxService.AddItem "Comptabilité"\n' +
          '    ComboBoxService.AddItem "Logistique"\n' +
          '    ComboBoxService.AddItem "Direction"\n' +
          'End Sub\n\n' +
          'Private Sub ButtonOK_Click()\n' +
          '    If TextBoxNom.Value = "" Then\n' +
          '        MsgBox "Veuillez saisir un nom.", vbExclamation, "Champ requis"\n' +
          '        Exit Sub\n' +
          '    End If\n' +
          '    Range("A2").Value = TextBoxNom.Value\n' +
          '    Range("B2").Value = ComboBoxService.Value\n' +
          '    Unload Me\n' +
          'End Sub</code></pre>',
          box('mnemo', 'Ouverture d’autres applications Office depuis VBA (Automation)', 'pin',
            '    <p>Comme le montre la fin du support de cours, VBA peut aussi piloter Word ou un navigateur depuis Excel grâce à <code>CreateObject("Word.Application")</code> (automation COM/OLE) ou ouvrir un document/site avec <code>ActiveWorkbook.FollowHyperlink</code>.</p>')
        ].join('\n')
      }
    ],

    questions: [
      {
        q: 'Quelle constante VBA faut-il passer au paramètre buttons de MsgBox pour afficher les boutons Oui et Non, et quelle constante teste le clic sur Oui ?',
        opts: [
          'Boutons : vbYesNo — Test du clic Oui : vbYes',
          'Boutons : vbOKCancel — Test du clic Oui : True',
          'Boutons : vbOuiNon — Test du clic Oui : 1',
          'Boutons : vbQuestion — Test du clic Oui : "Oui"'
        ],
        correct: 0,
        exp: 'vbYesNo (valeur 4) affiche les boutons Oui et Non ; lorsque l’utilisateur clique sur Oui, la fonction MsgBox renvoie la constante vbYes (valeur 6, et vbNo = 7 pour Non).'
      },
      {
        q: 'Dans une procédure utilisant On Error GoTo GestionErreur, pourquoi faut-il placer Exit Sub juste avant l’étiquette GestionErreur: ?',
        opts: [
          'Pour supprimer automatiquement les variables locales',
          'Pour éviter que le bloc GestionErreur ne s’exécute aussi lorsque la procédure se déroule normalement sans aucune erreur',
          'Parce que VBE refuse de compiler une étiquette sans Exit Sub',
          'Pour enregistrer le classeur avant d’afficher le message d’erreur'
        ],
        correct: 1,
        exp: 'Une étiquette (GestionErreur:) n’arrête pas le flux séquentiel du programme : sans Exit Sub juste au-dessus, la macro exécuterait le code d’erreur même quand tout s’est bien passé.'
      },
      {
        q: 'Dans un formulaire UserForm, quel événement s’exécute automatiquement au chargement du formulaire et permet de remplir une ComboBox avec .AddItem ?',
        opts: [
          'Private Sub UserForm_Terminate()',
          'Private Sub ComboBox1_Change()',
          'Private Sub UserForm_Initialize()',
          'Private Sub Workbook_Open()'
        ],
        correct: 2,
        exp: 'L’événement Private Sub UserForm_Initialize() se déclenche lors du chargement en mémoire du formulaire (Load ou Show) avant son affichage : c’est l’endroit idéal pour initialiser les listes avec .AddItem.'
      },
      {
        q: 'Quelle est la différence fondamentale entre Me.Hide et Unload Me dans le code d’un UserForm ?',
        opts: [
          'Me.Hide supprime le UserForm du projet VBA alors que Unload Me le réduit dans la barre des tâches',
          'Unload Me conserve toutes les valeurs saisies alors que Me.Hide les efface',
          'Me.Hide ne fonctionne que sur les feuilles de calcul',
          'Me.Hide masque le formulaire en conservant ses valeurs en mémoire, tandis que Unload Me le ferme et libère la mémoire en réinitialisant ses contrôles'
        ],
        correct: 3,
        exp: 'Hide masque simplement la fenêtre (les valeurs des TextBox et ComboBox restent lisibles en mémoire), tandis que Unload décharge complètement l’objet de la mémoire vive.'
      },
      {
        q: 'Que renvoie la fonction standard InputBox("Votre âge ?") si l’utilisateur clique sur le bouton Annuler ?',
        opts: [
          'Une chaîne de caractères vide ""',
          'La valeur booléenne False',
          'Le nombre -1',
          'L’erreur d’exécution 1004'
        ],
        correct: 0,
        exp: 'La fonction VBA InputBox renvoie toujours une chaîne String : si l’utilisateur clique sur Annuler, elle renvoie la chaîne vide "".'
      },
      {
        q: 'Quel opérateur permet de passer des arguments par leur nom (par exemple Prompt:="Bonjour", Title:="Info") lors de l’appel d’une procédure ou de MsgBox ?',
        opts: [
          'L’opérateur =>',
          'L’opérateur deux-points égal :=',
          'L’opérateur double égal ==',
          'L’opérateur flèche ->'
        ],
        correct: 1,
        exp: 'En VBA, le passage d’arguments nommés utilise l’opérateur := (deux-points suivi de égal), ce qui permet de fournir les arguments dans n’importe quel ordre.'
      },
      {
        q: 'Quel objet VBA contient le numéro (Number) et le texte explicatif (Description) de la dernière erreur d’exécution interceptée ?',
        opts: [
          'L’objet Debug',
          'L’objet Application.Alert',
          'L’objet Err (Err.Number et Err.Description)',
          'L’objet Target'
        ],
        correct: 2,
        exp: 'L’objet intrinsèque Err stocke les informations de la dernière erreur d’exécution : Err.Number donne son code numérique (ex. 9, 11, 13, 1004) et Err.Description son libellé.'
      },
      {
        q: 'Quelle méthode d’un contrôle ComboBox permet d’ajouter par programmation un choix supplémentaire dans sa liste déroulante ?',
        opts: [
          'ComboBox1.InsertRow',
          'ComboBox1.AppendText',
          'ComboBox1.NewValue',
          'ComboBox1.AddItem'
        ],
        correct: 3,
        exp: 'La méthode .AddItem (par ex. ComboBox1.AddItem "Lomé") ajoute un nouvel élément à la liste d’un contrôle ComboBox ou ListBox.'
      }
    ],

    pitfalls: [
      'Mettre des parenthèses à MsgBox("Bonjour", vbInformation) sans récupérer la valeur de retour ni utiliser Call : VBE génère une erreur de syntaxe.',
      'Oublier Exit Sub juste avant l’étiquette du gestionnaire d’erreur On Error GoTo.',
      'Décharger un formulaire avec Unload Me avant d’avoir copié les valeurs de ses TextBox dans la feuille Excel.',
      'Oublier de vérifier si InputBox a renvoyé "" (clic sur Annuler) avant de convertir la saisie en nombre.'
    ],

    methodTitle: 'Méthode — construire une interface utilisateur fiable sous Excel',
    method: [
      'Pour une simple question Oui/Non ou une saisie unique, utiliser MsgBox(..., vbYesNo + vbQuestion) et InputBox en testant le cas d’annulation ("").',
      'Pour une saisie multi-champs, créer un UserForm, remplir ses ComboBox dans UserForm_Initialize() avec .AddItem et valider les champs dans CommandButtonOK_Click().',
      'Transférer les valeurs des contrôles (TextBox.Value, ComboBox.Value) vers les cellules de la feuille avant d’appeler Unload Me.',
      'Protéger les opérations sensibles (ouverture de fichier, sélection de feuille, division) par On Error GoTo Etiquette précédé de Exit Sub.'
    ],

    summary: [
      'MsgBox affiche un message ou pose une question (vbYesNo, retour vbYes/vbNo) ; InputBox recueille une chaîne String.',
      'Les arguments nommés s’écrivent avec := (Prompt:="...", Title:="...").',
      'On Error GoTo Etiquette (avec Exit Sub avant l’étiquette) et l’objet Err (Err.Number, Err.Description) interceptent proprement les erreurs.',
      'Un UserForm réunit Label, TextBox, ComboBox (.AddItem dans UserForm_Initialize) et CommandButton ; Show l’affiche, Hide le masque en mémoire et Unload Me le décharge.'
    ],

    checklist: [
      'Je sais utiliser MsgBox en instruction simple et en fonction avec vbYesNo / vbYes.',
      'Je sais structurer un gestionnaire d’erreur complet avec On Error GoTo, Exit Sub et Err.Number.',
      'Je sais initialiser une ComboBox avec .AddItem dans UserForm_Initialize().',
      'Je sais expliquer la différence entre Me.Hide et Unload Me.'
    ],

    notions: [
      '<strong><code>MsgBox</code></strong> : boîte de message modale (constantes <code>vbYesNo</code>, <code>vbInformation</code>, retours <code>vbYes</code>, <code>vbNo</code>).',
      '<strong><code>InputBox</code></strong> : boîte de saisie renvoyant la chaîne entrée par l’utilisateur (ou <code>""</code> sur Annuler).',
      '<strong>Arguments nommés (<code>:=</code>)</strong> : syntaxe permettant de passer les paramètres d’une procédure par leur nom.',
      '<strong><code>On Error GoTo</code> / <code>Resume Next</code></strong> : instructions de branchement ou de poursuite en cas d’erreur d’exécution.',
      '<strong>Objet <code>Err</code></strong> : porte le code (<code>Err.Number</code>) et le message (<code>Err.Description</code>) de l’erreur active.',
      '<strong><code>UserForm</code></strong> : boîte de dialogue personnalisée dotée de contrôles graphiques (<code>Label</code>, <code>TextBox</code>, <code>ComboBox</code>, <code>CommandButton</code>).',
      '<strong><code>UserForm_Initialize()</code> &amp; <code>.AddItem</code></strong> : événement de chargement du formulaire et méthode d’ajout dans une liste.',
      '<strong><code>Show</code>, <code>Hide</code> vs <code>Unload Me</code></strong> : afficher, masquer en gardant les données en mémoire, ou décharger complètement de la mémoire.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — revois la syntaxe de MsgBox/InputBox, On Error GoTo et les contrôles de UserForm.' },
      { cls: 'mid', text: '50–69 % — attention au rôle de Exit Sub avant l’étiquette d’erreur et à Hide vs Unload Me.' },
      { cls: 'good', text: '70–94 % — bon niveau, entraîne-toi sur les études de cas de validation de formulaires.' },
      { cls: 'top', text: '≥ 95 % — maîtrise complète des boîtes de dialogue, de la gestion d’erreurs et des UserForms.' }
    ],

    flashcards: [
      { q: 'Quand met-on des parenthèses autour des arguments de MsgBox ?', a: 'Uniquement lorsqu’on récupère la valeur du bouton cliqué dans une variable (rep = MsgBox("Continuer ?", vbYesNo, "Titre")) ou avec Call.' },
      { q: 'Quels sont les codes d’erreur VBA les plus fréquents (9, 11, 13, 1004) ?', a: '9 = Indice en dehors de la plage (feuille introuvable) ; 11 = Division par zéro ; 13 = Incompatibilité de type ; 1004 = Erreur définie par l’application ou par l’objet.' },
      { q: 'Pourquoi placer Exit Sub juste avant l’étiquette d’un On Error GoTo ?', a: 'Pour que la macro s’arrête normalement à la fin du code principal sans exécuter par erreur le bloc de gestion d’erreur.' },
      { q: 'Où et comment remplir une ComboBox à l’ouverture d’un UserForm ?', a: 'Dans l’événement Private Sub UserForm_Initialize() à l’aide de la méthode ComboBox1.AddItem "Valeur" (ou via la propriété RowSource).' },
      { q: 'Différence entre Me.Hide et Unload Me ?', a: 'Me.Hide masque le formulaire en conservant les valeurs de ses contrôles en mémoire ; Unload Me le ferme et libère toute sa mémoire.' }
    ]
  }
];

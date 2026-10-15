/**
 * Chapitres 1 à 3 du cours de robotique B1 (club).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Premier contact : un programme, une carte',
    short: 'Premier contact',
    toc: 'La boucle capter-décider-agir, structure d’un programme, affichage et calculs de bord.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Le club te prête une carte programmable. Branchée, elle n’affiche rien : ce n’est pas qu’elle est ' +
      'cassée, c’est qu’elle attend un programme. Avant de brancher la moindre LED, il faut comprendre ' +
      'ce qu’un programme pour carte a toujours : des lectures d’entrées, des calculs, des affichages ' +
      'exactement ordonnés. On écrit ce premier programme en Python, parce que MicroPython — la variante ' +
      'qui tourne sur les cartes du club — en est la copie presque conforme.',

    objectives: [
      'décrire la boucle capter, décider, agir qui anime tout robot ;',
      'écrire un programme qui lit une donnée et affiche une séquence exacte ;',
      'calculer somme, différence, produit, quotient entier et reste ;',
      'mettre en forme un rapport lisible avec des f-strings alignées.'
    ],

    sections: [
      {
        title: 'La boucle qui anime tout robot',
        html: [
          '<p>Un robot, une machine à laver, un drone : sous les différences, le même squelette de programme, ' +
          'répété sans fin.</p>',
          '<pre><code>capter    lire les entrées (capteur, bouton, horloge)\n' +
          'décider   comparer ces lectures à des seuils ou des règles\n' +
          'agir      commander les sorties (moteur, LED, buzzer)</code></pre>',
          '<p>Sur une carte Arduino, cette boucle tourne dans une fonction <code>loop()</code> réécrite sans ' +
          'arrêt. En simulation Python, on l’écrit explicitement : le programme lit, décide, agit — puis le ' +
          'programme s’arrête, parce qu’un affichage texte a une fin. La logique, elle, est la même.</p>',
          box('mnemo', 'Mnémotechnique — « Entrées, décisions, sorties »', 'pin',
            '    <p>Tout exercice de ce cours se pose dans cet ordre : <strong>quelles entrées</strong> lis-je, ' +
            '<strong>quelle décision</strong> prends-je, <strong>quelle sortie</strong> produis-je. Un programme ' +
            'qui affiche avant de lire ne peut pas marcher, quel que soit le reste du code.</p>')
        ].join('\\n')
      },
      {
        title: 'La structure d’un programme',
        html: [
          '<p>Un programme s’exécute <strong>ligne par ligne, de haut en bas</strong>. Chaque ligne est une ' +
          'instruction achevée : une lecture, un calcul, un affichage.</p>',
          '<table>\\n' +
          '    <tr><th>Instruction</th><th>Effet</th></tr>\\n' +
          '    <tr><td><code>x = input()</code></td><td>lit une ligne (du texte) et la range dans x</td></tr>\\n' +
          '    <tr><td><code>n = int(input())</code></td><td>lit une ligne et la convertit en entier</td></tr>\\n' +
          '    <tr><td><code>print("LED ON")</code></td><td>affiche le texte puis passe à la ligne</td></tr>\\n' +
          '    <tr><td><code>print(f"{nom}")</code></td><td>affiche le texte en insérant la valeur d’une variable</td></tr>\\n' +
          '  </table>',
          '<p>Le f-string <code>f"...{expression}..."</code> est le couteau suisse de l’affichage : tout ce ' +
          'qui figure entre accolades est évalué puis inséré dans le texte. C’est lui qui donne les messages ' +
          'précis qu’un moniteur série afficherait.</p>',
          box('pitfall', 'Piège — l’ordre d’exécution', 'warning',
            '    <p>Les instructions s’exécutent <strong>dans l’ordre écrit</strong>. Si l’énoncé attend ' +
            '« nom puis âge », lire l’âge d’abord produit un programme faux, même si chaque ligne est juste. ' +
            'Relire l’ordre des entrées avant d’écrire la première ligne est un réflexe de roboticien.</p>')
        ].join('\\n')
      },
      {
        title: 'Calculs de bord',
        html: [
          '<p>Une carte calcule tout : une distance parcourue, un temps d’attente, un partage de pièces. ' +
          'Les opérateurs entiers répondent aux deux questions « combien de fois » et « combien il reste ».</p>',
          '<pre><code>opération         opérateur    exemple\n' +
          'somme             a + b        10 + 5 = 15\n' +
          'différence        a - b        10 - 5 = 5\n' +
          'produit           a * b        10 * 5 = 50\n' +
          'quotient entier   a // b       10 // 3 = 3   (combien de fois)\n' +
          'reste             a % b        10 % 3 = 1    (combien il reste)</code></pre>',
          '<p>Le <strong>modulo</strong> <code>%</code> est l’opérateur fétiche du roboticien : il dit si un ' +
          'compteur est pair (<code>n % 2</code>), si une lettre revient au début de l’alphabet ' +
          '(<code>(i + k) % 26</code>), si un moteur a fini son tour.</p>',
          box('pitfall', 'Piège — la division par zéro', 'warning',
            '    <p><code>a // 0</code> arrête le programme avec une erreur. Sur une carte réelle, la ' +
            'conséquence est pire : le robot fige. Toute division dont le dénominateur vient d’une entrée ' +
            'doit être précédée d’un test <code>if b == 0</code>. L’énoncé du TP le demandait déjà en bonus.</p>'),
          box('tech', 'En Python', 'terminal',
            '    <pre><code>a, b = (int(x) for x in input().split())\n' +
            '\n' +
            'print(f"somme : {a + b}")\n' +
            'print(f"reste : {a % b}")</code></pre>\\n' +
            '    <p>La première ligne lit <strong>une seule ligne</strong> contenant « 10 5 » et la découpe : ' +
            '<code>split()</code> coupe aux espaces, la boucle convertit chaque morceau en entier.</p>')
        ].join('\\n')
      },
      {
        title: 'Mettre en forme un rapport',
        html: [
          '<p>Un moniteur série défile vite : le rapport lisible est aligné. Les f-strings alignent tout ' +
          'seules avec une largeur après les deux-points.</p>',
          '<pre><code>f&quot;{&#39;Membre&#39;:&lt;12}: {membre}&quot;   →   "Membre      : Alice"\n' +
          'f"{duree} min"              →   "90 min"\n' +
          'f"{moyenne:.2f}"            →   "13.67"   (deux décimales)\n' +
          'f"{t:g}"                    →   "30"      (sans zéros inutiles)</code></pre>',
          '<p>Le repère <code>:&lt;12</code> signifie « aligner à gauche en complétant avec des espaces ' +
          'jusqu’à 12 caractères ». Les libellés de même largeur forment une colonne : l’œil compare ' +
          'immédiatement, ce qui est le but d’un journal de séance.</p>'
        ].join('\\n')
      }
    ],

    questions: [
      { stem: 'Dans quel ordre s’exécutent les instructions d’un programme ?', opts: ['De la dernière à la première', 'De haut en bas, ligne par ligne', 'Dans un ordre imprévisible'], correct: 1, exp: 'L’exécution est séquentielle : chaque ligne finit avant que la suivante commence.' },
      { stem: 'Que vaut 17 % 5 ?', opts: ['2', '3', '3,4'], correct: 0, exp: '17 = 5 × 3 + 2 : le quotient entier vaut 3, le reste 2.' },
      { stem: 'Que vaut 17 // 5 ?', opts: ['2', '3', '3,4'], correct: 1, exp: 'Le quotient entier est la partie entière du quotient : 3.' },
      { stem: 'Que lit exactement input() ?', opts: ['Un nombre', 'Une ligne de texte', 'Un mot'], correct: 1, exp: 'input() renvoie une ligne complète sans son retour à la ligne ; c’est int() qui convertit.' },
      { stem: 'Que produit f&quot;{&#39;Seance&#39;:&lt;12}: 7&quot; ?', opts: ['Seance: 7', 'Seance      : 7', 'Une erreur'], correct: 1, exp: ':&lt;12 complète le libellé avec des espaces jusqu’à 12 caractères.' },
      { stem: 'Pourquoi tester la division par zéro avant de diviser ?', opts: ['Pour aller plus vite', 'Car a // 0 arrête le programme', 'Ce n’est pas nécessaire'], correct: 1, exp: 'La division par zéro lève une erreur qui interrompt le programme.' }
    ],

    pitfalls: [
      '<strong>Ordre des lectures inversé</strong> : lire l’âge avant le nom alors que l’énoncé donne le nom d’abord.',
      '<strong>Confusion / et //</strong> : afficher 3,3333 là où on attend le quotient entier 3.',
      '<strong>Division sans garde</strong> : le programme tombe sur b = 0 et s’arrête au milieu du rapport.',
      '<strong>Espaces oubliés</strong> : afficher « somme:15 » au lieu de « somme : 15 » — les tests comparent exactement.',
      '<strong>F-string sans f</strong> : print("{nom}") affiche les accolades littéralement.'
    ],

    methodTitle: 'Écrire un programme pour carte',
    method: [
      '<strong>Relire l’ordre des entrées</strong> : chaque ligne d’entrée a une position exacte.',
      '<strong>Choisir le type</strong> : texte brut, entier <code>int()</code>, décimal <code>float()</code>.',
      '<strong>Écrire les calculs</strong> dans l’ordre, en nommant les variables pour qu’on les relise.',
      '<strong>Mettre en forme</strong> la sortie avec des f-strings, virgule par virgule.',
      '<strong>Rejouer mentalement</strong> le cas d’exemple ligne par ligne avant d’exécuter.'
    ],

    summary: [
      'Un robot exécute la boucle capter, décider, agir — sur la carte dans loop(), en simulation dans le programme.',
      'Les instructions s’exécutent de haut en bas : l’ordre des lectures est imposé par l’énoncé.',
      'input() lit une ligne de texte ; int() ou float() la convertit en nombre.',
      '// donne le quotient entier, % le reste ; on garde toujours la division par zéro sous test.',
      'Les f-strings insèrent des valeurs, alignent (:&lt;12), arrondissent (:.2f) et nettoyent (:g).'
    ],

    checklist: [
      'Je décris la boucle capter, décider, agir avec mes mots.',
      'Je lis des entrées dans l’ordre exact de l’énoncé.',
      'Je calcule quotient et reste sans confondre / et //.',
      'Je produis un affichage aligné, au caractère près, avec des f-strings.'
    ],

    notions: ['boucle principale', 'entrée', 'sortie', 'instruction', 'f-string', 'quotient entier', 'modulo', 'formatage'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais les trois exercices en relisant chaque ligne à voix haute.' },
      { cls: 'mid', text: '50–69 % — Travaille les f-strings de mise en forme sur tes propres rapports.' },
      { cls: 'good', text: '70–89 % — Solide : rejoue le calculatrice de bord avec des valeurs négatives.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, les boucles et temporisations.' }
    ],

    flashcards: [
      { q: 'Quelles sont les trois phases de la boucle d’un robot ?', a: 'Capter (lire les entrées), décider (comparer), agir (commander les sorties).' },
      { q: 'Que renvoie input() et comment obtenir un entier ?', a: 'Une ligne de texte ; int(input()) la convertit en entier.' },
      { q: 'Différence entre / et // en Python ?', a: '/ donne un décimal ; // donne le quotient entier (la division euclidienne).' },
      { q: 'À quoi sert le modulo % ?', a: 'À donner le reste d’une division : tester la parité, boucler sur un alphabet, cadencer un compteur.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Boucles et temporisations',
    short: 'Boucles',
    toc: 'Répéter exactement k fois, réagir à une série d’états, cadencer une séquence, compter les événements.',
    time: '≈ 2 h 30 de travail',

    situation:
      'La LED clignote : allumée une seconde, éteinte une seconde, cinq fois, puis le programme rend la ' +
      'main. Ce « cinq fois » est toute une théorie : combien de répétitions, comment compter les ' +
      'allumages, comment cadencer une séquence de feux qui n’est pas une simple répétition mais un ' +
      'enchaînement. La simulation remplace la seconde d’attente par une ligne d’affichage — la structure ' +
      'du programme, elle, est exactement celle de la carte.',

    objectives: [
      'répéter un bloc exactement k fois avec for et range ;',
      'réagir à chaque valeur d’une série tout en tenant un compteur ;',
      'répéter une séquence de plusieurs étapes et annoncer le bilan ;',
      'traiter le cas limite k = 0 sans qu’il casse le programme.'
    ],

    sections: [
      {
        title: 'Répéter exactement k fois',
        html: [
          '<p>La boucle <code>for</code> exécute un bloc un nombre connu de fois. <code>range(k)</code> ' +
          'produit les entiers de 0 à k − 1 : exactement k passages.</p>',
          '<pre><code>for _ in range(5):\n' +
          '    print("LED ON")\n' +
          '    print("LED OFF")\n' +
          'print("Fin.")</code></pre>',
          '<p>L’<strong>indentation</strong> dessine le bloc : les deux print font partie de la boucle, le ' +
          '<code>print("Fin.")</code> — aligné au même niveau que le <code>for</code> — s’exécute une seule ' +
          'fois, après la boucle. C’est la première cause de bug du débutant : une ligne mal alignée sort de ' +
          'la boucle ou y entre par erreur.</p>',
          box('pitfall', 'Piège — le trait de soulignement', 'warning',
            '    <p><code>for _ in range(k)</code> : la variable de boucle existe mais on ne l’utilise pas — ' +
            'le trait bas la nomme « sans importance ». Dès que tu comptes quelque chose ou que le numéro du ' +
            'passage sert, donne-lui un vrai nom : <code>for tour in range(k)</code>.</p>')
        ].join('\\n')
      },
      {
        title: 'Réagir à une série et compter',
        html: [
          '<p>La carte ne répète pas aveuglément : elle réagit à ce qu’elle lit. La boucle parcours alors ' +
          '<strong>une série de valeurs</strong>, et une décision s’invite dans chaque passage.</p>',
          '<pre><code>allumages = 0\n' +
          'for etat in etats:\n' +
          '    if etat == 1:\n' +
          '        print("LED ON")\n' +
          '        allumages += 1\n' +
          '    else:\n' +
          '        print("LED OFF")\n' +
          'print(f"allumee : {allumages}")</code></pre>',
          '<p>Trois règles de position : le compteur s’<strong>initialise avant</strong> la boucle, il ' +
          's’<strong>incrémente dans</strong> le test qui compte, le <strong>bilan s’affiche après</strong> ' +
          'la boucle. Un compteur initialisé dans la boucle repart à zéro à chaque passage — il ne compte ' +
          'jamais rien.</p>',
          box('mnemo', 'Mnémotechnique — « Avant, dans, après »', 'pin',
            '    <p>Un compteur de boucle vit en trois temps : <strong>avant</strong> (initialisation), ' +
            '<strong>dans</strong> (mise à jour), <strong>après</strong> (exploitation). Vérifier ces trois ' +
            'emplacements élimine la moitié des bugs de boucle.</p>')
        ].join('\\n')
      },
      {
        title: 'Cadencer une séquence',
        html: [
          '<p>Le feu tricolore ne fait pas cinq fois la même chose : il enchaîne rouge 3 s, orange 1 s, ' +
          'verte 3 s, orange 1 s. La <strong>séquence</strong> tient dans le corps de la boucle ; la boucle ' +
          'ne fait que la rejouer.</p>',
          '<pre><code>for _ in range(cycles):\n' +
          '    print("rouge (3 s)")\n' +
          '    print("orange (1 s)")\n' +
          '    print("verte (3 s)")\n' +
          '    print("orange (1 s)")</code></pre>',
          '<p>Une seule LED à la fois : la séquence le garantit par construction, puisqu’aucune instruction ' +
          'n’allume deux états. C’est exactement le raisonnement qu’on tient sur la carte, où un état bas ' +
          'doit être écrit explicitement pour éteindre la LED précédente.</p>',
          box('intuition', 'Attention au cas zéro', 'compass',
            '    <p><code>range(0)</code> ne produit rien : la boucle ne s’exécute pas, et le programme saute ' +
            'directement au bilan. C’est le comportement correct — « terminé après 0 cycle » — et il tombe ' +
            'gratis si le bilan est écrit après la boucle, jamais dedans.</p>')
        ].join('\\n')
      },
      {
        title: 'Accorder le pluriel du bilan',
        html: [
          '<p>Le bilan « terminé après X cycle(s) » demande un détail : le <strong>s</strong> n’apparaît que ' +
          'si X dépasse 1. La f-string le décide à la volée.</p>',
          '<pre><code>print(f"termine apres {c} cycle{\'s\' if c &gt; 1 else \'\'}")\n' +
          '\n' +
          'c = 1  →  termine apres 1 cycle\n' +
          'c = 3  →  termine apres 3 cycles</code></pre>',
          '<p>L’expression conditionnelle <code>A if condition else B</code> choisit le texte sans écrire de ' +
          'bloc if complet. C’est le détail qui distingue un rapport soigné d’un rapport approximatif — et ' +
          'les tests le vérifient au caractère près.</p>'
        ].join('\\n')
      }
    ],

    questions: [
      { stem: 'Combien de fois s’exécute le corps de for _ in range(k) ?', opts: ['k fois', 'k + 1 fois', 'k − 1 fois'], correct: 0, exp: 'range(k) produit exactement k entiers, de 0 à k − 1.' },
      { stem: 'Où initialiser un compteur utilisé dans une boucle ?', opts: ['Dans la boucle', 'Avant la boucle', 'Après la boucle'], correct: 1, exp: 'Avant : sinon il repart à zéro à chaque passage.' },
      { stem: 'Que fait le programme si k vaut 0 dans for _ in range(k) ?', opts: ['Une erreur', 'Il passe au bilan sans exécuter le corps', 'Il boucle indéfiniment'], correct: 1, exp: 'range(0) est vide : aucun passage, le bilan s’affiche.' },
      { stem: 'Dans la séquence de feux, comment garantir une seule LED allumée ?', opts: ['En testant un drapeau', 'Par construction : la séquence n’allume qu’un état à la fois', 'Avec un compteur d’allumages'], correct: 1, exp: 'La séquence écrite n’allume qu’un état par étape : la contrainte est structurelle.' },
      { stem: 'Que vaut "s" if c > 1 else "" pour c = 1 ?', opts: ['"s"', '""', 'Une erreur'], correct: 1, exp: 'La condition est fausse : c’est la chaîne vide qui est choisie.' },
      { stem: 'Un print aligné au même niveau que le for s’exécute…', opts: ['À chaque passage', 'Une seule fois, après la boucle', 'Jamais'], correct: 1, exp: 'Hors indentation de la boucle : une seule fois, après le dernier passage.' }
    ],

    pitfalls: [
      '<strong>Indentation décalée</strong> : le bilan s’affiche à chaque passage au lieu d’une seule fois.',
      '<strong>Compteur réinitialisé dans la boucle</strong> : allumee : 1 quelle que soit la série.',
      '<strong>Pluriel ignoré</strong> : « 2 cycle » au lieu de « 2 cycles ».',
      '<strong>range(k + 1)</strong> par excès de zèle : un passage de trop.',
      '<strong>Corps vide oublié</strong> : une boucle qui ne fait rien parce que le bloc n’a pas été écrit.'
    ],

    methodTitle: 'Écrire une boucle de contrôle',
    method: [
      '<strong>Identifier ce qui se répète</strong> : une paire d’instructions, une décision, une séquence entière.',
      '<strong>Choisir le conducteur</strong> : range(k) pour k passages, une série pour réagir aux données.',
      '<strong>Placer les trois temps du compteur</strong> : initialisation avant, mise à jour dans le test, bilan après.',
      '<strong>Vérifier l’indentation</strong> ligne par ligne : qui est dans la boucle, qui en sort.',
      '<strong>Jouer le cas limite</strong> k = 0 mentalement avant d’exécuter.'
    ],

    summary: [
      'for _ in range(k) répète exactement k fois ; range(0) ne répète rien et saute au bilan.',
      'L’indentation définit le corps de la boucle : un print dé-indenté ne s’exécute qu’une fois, après.',
      'Un compteur s’initialise avant la boucle, s’incrémente dans la bonne branche, s’exploite après.',
      'Une séquence de feux est un corps de boucle : la rejouer, c’est garantir une LED à la fois.',
      'L’expression A if condition else B accorde le pluriel du bilan sans bloc if.'
    ],

    checklist: [
      'Je répète un bloc exactement k fois et j’annonce la fin hors de la boucle.',
      'Je compte des événements d’une série sans réinitialiser mon compteur.',
      'Je cadence une séquence de plusieurs étapes dans l’ordre imposé.',
      'Je traite k = 0 et j’accorde le pluriel du bilan.'
    ],

    notions: ['for', 'range', 'indentation', 'compteur', 'séquence', 'cas limite', 'expression conditionnelle', 'bilan'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Écris la boucle LED dix fois sur papier avant l’atelier.' },
      { cls: 'mid', text: '50–69 % — Refais le clignotement dirigé en comptant aussi les extinctions.' },
      { cls: 'good', text: '70–89 % — Solide : ajoute le compte des oranges au carrefour.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, les conditions et fonctions.' }
    ],

    flashcards: [
      { q: 'Combien de passages pour range(k) ?', a: 'Exactement k, de 0 à k − 1 ; range(0) n’en fait aucun.' },
      { q: 'Où placent-on initialisation, mise à jour et bilan d’un compteur ?', a: 'Initialisation avant la boucle, mise à jour dans la bonne branche, bilan après la boucle.' },
      { q: 'Comment accorder « cycle » en fonction du nombre ?', a: 'f"termine apres {c} cycle{\'s\' if c > 1 else \'\'}".' },
      { q: 'Pourquoi la séquence de feux garantit-elle une seule LED allumée ?', a: 'Par construction : chaque étape de la séquence n’allume qu’un état.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Conditions et fonctions',
    short: 'Conditions',
    toc: 'Tester la parité, écrire une fonction qui renvoie un booléen, tester la primalité, classer des relevés par seuil.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le robot doit distinguer : ce capteur est-il activé ? Ce relevé dépasse-t-il le seuil ? Cette ' +
      'valeur est-elle acceptable ? La décision se code avec des conditions — et dès qu’une décision ' +
      'mérite d’être réutilisée, elle sort du programme principal pour devenir une <strong>fonction</strong> ' +
      'qui renvoie True ou False. Le TP du club demandait une fonction is_even : c’est exactement ce ' +
      'chapitre.',

    objectives: [
      'écrire une fonction de test qui renvoie un booléen sans rien afficher ;',
      'compter les deux branches d’une condition sur une série ;',
      'implémenter un test de primalité qui s’arrête à la racine carrée ;',
      'classer des relevés par seuil strict et compter les alertes.'
    ],

    sections: [
      {
        title: 'Une fonction qui répond vrai ou faux',
        html: [
          '<p>Une <strong>fonction de test</strong> a un contrat précis : recevoir une valeur, renvoyer un ' +
          'booléen, <strong>ne rien afficher</strong>. C’est le programme qui décide quoi faire de la réponse.</p>',
          '<pre><code>def est_pair(x):\n' +
          '    return x % 2 == 0\n' +
          '\n' +
          'est_pair(4)   → True\n' +
          'est_pair(7)   → False</code></pre>',
          '<p>La comparaison <code>x % 2 == 0</code> <em>est déjà</em> un booléen : pas besoin d’écrire ' +
          '<code>if ... : return True else: return False</code>. Un return direct est plus court et dit la ' +
          'même chose.</p>',
          box('pitfall', 'Piège — la fonction qui bavarde', 'warning',
            '    <p>Une fonction de test qui <code>print</code> son verdict est à moitié inutilisable : on ne ' +
            'peut ni compter avec, ni la recombiner. <strong>Une fonction calcule et renvoie ; l’affichage ' +
            'appartient au programme principal.</strong> Cette séparation est ce qui permet de tester une ' +
            'fonction toute seule.</p>')
        ].join('\\n')
      },
      {
        title: 'Compter les deux branches',
        html: [
          '<p>Sur une série, la condition s’applique valeur par valeur, et les deux issues se comptent.</p>',
          '<pre><code>pairs = impairs = 0\n' +
          'for x in valeurs:\n' +
          '    if est_pair(x):\n' +
          '        pairs += 1\n' +
          '    else:\n' +
          '        impairs += 1</code></pre>',
          '<p>Chaque passage incrémente <strong>un seul</strong> compteur : la somme des deux vaut ' +
          'forcément n à la sortie. C’est un contrôle gratuit — si pairs + impairs ne vaut pas n, le ' +
          'programme a un bug ailleurs.</p>',
          box('mnemo', 'Mnémotechnique — « Un test, deux destins »', 'pin',
            '    <p>Dans un <code>if / else</code>, exactement une branche s’exécute par passage. Si un ' +
            'compteur double ou saute, c’est que le test n’est pas exclusif : relire l’opérateur de ' +
            'comparaison avant de soupçonner la boucle.</p>')
        ].join('\\n')
      },
      {
        title: 'Tester la primalité',
        html: [
          '<p>Un nombre <strong>premier</strong> possède exactement deux diviseurs : 1 et lui-même. 0 et 1 ' +
          'ne sont donc pas premiers. Tester tous les diviseurs jusqu’à x serait du gaspillage : il suffit ' +
          'd’aller jusqu’à <strong>la racine carrée</strong> de x.</p>',
          '<pre><code>def est_premier(x):\n' +
          '    if x &lt; 2:\n' +
          '        return False\n' +
          '    d = 2\n' +
          '    while d * d &lt;= x:\n' +
          '        if x % d == 0:\n' +
          '            return False\n' +
          '        d += 1\n' +
          '    return True</code></pre>',
          '<p>Pourquoi s’arrêter à la racine ? Si x = a × b avec a ≤ b, alors a ≤ √x. Un diviseur au-delà ' +
          'de la racine en entraîne donc un plus petit déjà testé. Pour 97, on essaie 2 à 9 au lieu de 2 à 96.</p>',
          box('intuition', 'Attention aux cas de bord', 'compass',
            '    <p>0, 1 et les nombres négatifs tombent dans le premier test <code>x &lt; 2</code>. Sans lui, ' +
            'la boucle while ne tournerait pas mais renverrait True pour 1 — un résultat faux. <strong>Les ' +
            'cas de bord se traitent d’abord, explicitement.</strong></p>')
        ].join('\\n')
      },
      {
        title: 'Classer des relevés par seuil',
        html: [
          '<p>Le capteur de distance du TP déclenche une alerte sous 10 cm. Le classement par seuil est la ' +
          'décision la plus fréquente en robotique.</p>',
          '<pre><code>if d &lt; seuil:      alerte\n' +
          'else:              tout va bien</code></pre>',
          '<p><strong>Strictement inférieur</strong> se traduit par <code>&lt;</code> : une distance égale au ' +
          'seuil n’alerte pas. Avec un <code>&lt;=</code>, la frontière changerait de camp — et les tests le ' +
          'remarquent, car ils incluent toujours le cas de la valeur exactement au seuil.</p>',
          box('tech', 'Trois états avec elif', 'terminal',
            '    <pre><code>if t &gt; 30:\n' +
            '    etat = "ALERTE CHALEUR"\n' +
            'elif t &lt; 15:\n' +
            '    etat = "ALERTE FROID"\n' +
            'else:\n' +
            '    etat = "normale"</code></pre>\\n' +
            '    <p>Les trois branches sont mutuellement exclusives : le premier test vrai gagne, les autres ' +
            'ne sont même pas évalués. L’ordre des tests fait partie de la logique.</p>')
        ].join('\\n')
      }
    ],

    questions: [
      { stem: 'Que doit faire une fonction de test ?', opts: ['Afficher son verdict', 'Renvoyer un booléen', 'Modifier la valeur reçue'], correct: 1, exp: 'Elle renvoie True ou False ; l’affichage appartient au programme.' },
      { stem: 'Que vaut est_pair(0) avec return x % 2 == 0 ?', opts: ['False', 'True', 'Une erreur'], correct: 1, exp: '0 % 2 vaut 0, donc 0 == 0 est True : zéro est pair.' },
      { stem: 'Pourquoi tester la primalité jusqu’à √x seulement ?', opts: ['Pour éviter les erreurs', 'Car un diviseur au-delà de la racine en suppose un plus petit déjà testé', 'Par convention'], correct: 1, exp: 'Si x = a × b avec a ≤ b, alors a ≤ √x : suffisant pour trouver un diviseur.' },
      { stem: 'Que vaut est_premier(1) ?', opts: ['True', 'False', 'Non défini'], correct: 1, exp: '1 n’a qu’un seul diviseur : il n’est pas premier, le test x < 2 le renvoie en False.' },
      { stem: 'd = seuil avec le test d < seuil : y a-t-il alerte ?', opts: ['Oui', 'Non', 'Cela dépend du signe'], correct: 1, exp: 'Strictement inférieur : la valeur égale au seuil n’alerte pas.' },
      { stem: 'Dans une chaîne if / elif / else, combien de branches s’exécutent ?', opts: ['Toutes les vraies', 'La première vraie seulement', 'La dernière vraie'], correct: 1, exp: 'Le premier test vrai gagne ; les suivants sont ignorés.' }
    ],

    pitfalls: [
      '<strong>Fonction qui affiche</strong> au lieu de renvoyer : impossible de compter avec son résultat.',
      '<strong>if ... : return True, else : return False</strong> : verbeux, mais surtout signe qu’on n’a pas vu que la comparaison est déjà un booléen.',
      '<strong>est_premier(1) mal géré</strong> : sans le test x &lt; 2, 1 sortirait « premier ».',
      '<strong>&lt;= au lieu de &lt;</strong> : la valeur au seuil change de camp et le compte d’alertes glisse.',
      '<strong>elif transformé en if séparés</strong> : un relevé peut alors être classé deux fois.'
    ],

    methodTitle: 'Décider puis compter',
    method: [
      '<strong>Isoler le critère</strong> dans une fonction de test qui renvoie un booléen.',
      '<strong>Traiter les cas de bord</strong> au début de la fonction (0, 1, négatifs).',
      '<strong>Comparer au seuil avec le bon opérateur</strong> : strict ou large, l’énoncé le dit.',
      '<strong>Compter chaque branche</strong> avec un compteur dédié initialisé avant la boucle.',
      '<strong>Contrôler</strong> que la somme des comptes redonne l’effectif total.'
    ],

    summary: [
      'Une fonction de test renvoie un booléen et n’affiche rien ; le programme principal décide.',
      'La comparaison est déjà un booléen : return x % 2 == 0 suffit.',
      'Premiers : x ≥ 2 et aucun diviseur jusqu’à √x ; 0 et 1 sont exclus d’entrée.',
      'Strict ou large au seuil : la frontière change de camp, les tests la vérifient toujours.',
      'if / elif / else : une seule branche par passage, la première vraie gagne.'
    ],

    checklist: [
      'J’écris une fonction de test qui renvoie True ou False sans afficher.',
      'Je gère les cas de bord avant la boucle de test.',
      'Je classe des relevés par seuil strict et je compte chaque catégorie.',
      'Je vérifie que mes comptes additionnés redonnent le total.'
    ],

    notions: ['fonction', 'booléen', 'return', 'primalité', 'racine carrée', 'seuil', 'elif', 'compteur'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Réécris est_pair et est_premier sans regarder le corrigé.' },
      { cls: 'mid', text: '50–69 % — Ajoute le compte des nombres composés pairs de la série.' },
      { cls: 'good', text: '70–89 % — Solide : passe le contrôle de seuil en fonction aussi.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les tableaux et algorithmes.' }
    ],

    flashcards: [
      { q: 'Quel est le contrat d’une fonction de test ?', a: 'Recevoir une valeur, renvoyer True ou False, ne rien afficher.' },
      { q: 'Comment teste-t-on la parité en Python ?', a: 'x % 2 == 0 — la comparaison renvoie directement le booléen.' },
      { q: 'Quels nombres sont exclus du test de primalité et pourquoi ?', a: 'Ceux inférieurs à 2 : 0 et 1 n’ont pas exactement deux diviseurs.' },
      { q: 'Jusqu’où cherche-t-on un diviseur et pourquoi ?', a: 'Jusqu’à la racine carrée : un diviseur au-delà en suppose un plus petit déjà testé.' }
    ]
  }
];

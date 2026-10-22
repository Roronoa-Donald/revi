/**
 * Chapitres 4 à 6 du cours de robotique B1 (club).
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Tableaux et algorithmes',
    short: 'Tableaux',
    toc: 'Trier à la main et compter les comparaisons, structurer des données en dictionnaires, chercher par dichotomie.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le club gère une liste de membres et trie des mesures. Un tableau se contente de stocker ; un ' +
      '<strong>algorithme</strong> sait où chercher et combien d’efforts il dépense. Le TP demandait le ' +
      'tri à bulles écrit à la main — pas le sort() tout fait — précisément parce que compter les ' +
      'comparaisons fait apparaître ce que « ça marche » cache : le coût.',

    objectives: [
      'implémenter le tri à bulles et compter ses comparaisons ;',
      'structurer des enregistrements dans une liste de dictionnaires ;',
      'extraire min, max et moyenne sur un champ précis ;',
      'écrire une recherche dichotomique avec renvoi de −1 si absente.'
    ],

    sections: [
      {
        title: 'Le tri à bulles, pas à pas',
        html: [
          '<p>Le principe : parcourir le tableau en comparant chaque couple de voisins, et échanger quand ' +
          'ils sont mal ordonnés. À chaque passage complet, la plus grande valeur restante « bulle » ' +
          'jusqu’à sa place définitive, en fin de tableau.</p>',
          '<pre><code>for i in range(n - 1):\n' +
          '    for j in range(n - 1 - i):\n' +
          '        if valeurs[j] &gt; valeurs[j + 1]:\n' +
          '            valeurs[j], valeurs[j + 1] = valeurs[j + 1], valeurs[j]</code></pre>',
          '<p>La borne intérieure <code>n - 1 - i</code> est le cœur de l’algorithme : après i passages, ' +
          'les i dernières places sont déjà remplies, inutile de les re-tester. L’échange Python ' +
          '<code>a, b = b, a</code> évite la variable temporaire que le C du TP oblige à écrire.</p>',
          box('mnemo', 'Mnémotechnique — « i mûrit, j compare »', 'pin',
            '    <p><code>i</code> compte les <strong>passages</strong> (ce qui est déjà trié en fin de ' +
            'tableau), <code>j</code> <strong>compare les voisins</strong>. Confondre les deux bornes est la ' +
            'faute classique qui laisse un tableau à moitié trié.</p>')
        ].join('\n')
      },
      {
        title: 'Compter les comparaisons',
        html: [
          '<p>Une <strong>comparaison</strong> = chaque exécution du test entre deux voisins, échange ou ' +
          'non. Le compteur s’incrémente donc <strong>juste avant</strong> le if, pas dedans.</p>',
          '<pre><code>comparaisons = 0\n' +
          'for i in range(n - 1):\n' +
          '    for j in range(n - 1 - i):\n' +
          '        comparaisons += 1\n' +
          '        if valeurs[j] &gt; valeurs[j + 1]:\n' +
          '            ...</code></pre>',
          '<table>\n' +
          '    <tr><th>Taille n</th><th>Comparaisons (double parcours complet)</th></tr>\n' +
          '    <tr><td>2</td><td>1</td></tr>\n' +
          '    <tr><td>3</td><td>3</td></tr>\n' +
          '    <tr><td>4</td><td>6</td></tr>\n' +
          '    <tr><td>5</td><td>10</td></tr>\n' +
          '  </table>',
          '<p>C’est la somme 1 + 2 + … + (n − 1) = n(n − 1)/2 : doubler la taille multiplie le travail par ' +
          'environ quatre. Une série déjà triée paie le même prix — c’est la faiblesse du tri à bulles ' +
          'simple, et c’est ce que le compteur rend visible.</p>'
        ].join('\n')
      },
      {
        title: 'Structurer avec des dictionnaires',
        html: [
          '<p>Un membre a un nom et un âge : deux données de types différents qui voyagent ensemble. La ' +
          'liste de dictionnaires est le format naturel — le <code>vector</code> de structures du TP en C++.</p>',
          '<pre><code>registre = []\n' +
          'for _ in range(n):\n' +
          '    parties = l’extraction des champs\n' +
          '    registre.append({"nom": parties[0], "age": int(parties[1])})\n' +
          '\n' +
          'jeune = min(registre, key=lambda m: m["age"])</code></pre>',
          '<p>Les fonctions <code>min</code> et <code>max</code> acceptent un paramètre <code>key=</code> : ' +
          'une fonction appliquée à chaque élément avant comparaison. Ici, on compare les dictionnaires ' +
          'par leur seul champ <code>age</code> — et min renvoie l’élément entier, pas juste l’âge.</p>',
          box('pitfall', 'Piège — lire l’entrée et convertir', 'warning',
            '    <p>Une ligne « Alice 20 » arrive comme <strong>une seule chaîne</strong>. ' +
            '<code>l’extraction des champs</code> la découpe en deux morceaux de texte ; c’est <code>int()</code> qui rend ' +
            'l’âge calculable. Oublier la conversion compile très bien — et plante à la première moyenne.</p>')
        ].join('\n')
      },
      {
        title: 'Chercher par dichotomie',
        html: [
          '<p>Dans un tableau <strong>trié</strong>, chaque comparaison élimine la moitié des candidats ' +
          'restants. On compare au milieu : trop petit, on repart à droite ; trop grand, à gauche ; égal, ' +
          'trouvé.</p>',
          '<pre><code>bas, haut = 0, n - 1\n' +
          'while bas &lt;= haut:\n' +
          '    milieu = (bas + haut) // 2\n' +
          '    if serie[milieu] == v:   trouvé\n' +
          '    elif serie[milieu] &lt; v:  bas = milieu + 1\n' +
          '    else:                    haut = milieu - 1</code></pre>',
          '<p>Pour n = 1000, la dichotomie conclut en dix comparaisons environ là où un parcours linéaire ' +
          'en demanderait jusqu’à mille. Condition d’entrée <code>bas &lt;= haut</code> : quand les bornes ' +
          'se croisent, la valeur n’est pas là — on renvoie <code>-1</code>, convention du « introuvable ».</p>',
          box('intuition', 'Pourquoi −1 et pas 0', 'compass',
            '    <p>Les indices valides commencent à 0 : renvoyer 0 pour « introuvable » serait ambigu. ' +
            '<strong>−1 est hors de l’intervalle des indices</strong>, donc sans ambiguïté. C’est la même ' +
            'convention que <code>indexOf</code> en JavaScript ou <code>find</code> en C++.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que vaut la borne intérieure du tri à bulles au passage i ?', opts: ['n − 1', 'n − 1 − i', 'i'], correct: 1, exp: 'Les i dernières places sont déjà triées : inutile de les re-tester.' },
      { stem: 'Combien de comparaisons pour n = 5 avec le double parcours complet ?', opts: ['5', '10', '25'], correct: 1, exp: '4 + 3 + 2 + 1 = 10, soit n(n − 1)/2.' },
      { stem: 'Quand incrémente-t-on le compteur de comparaisons ?', opts: ['Quand il y a échange', 'À chaque test, échange ou non', 'Après la boucle'], correct: 1, exp: 'La comparaison a lieu même sans échange : le test coûte.' },
      { stem: 'Que renvoie min(registre, key=lambda m: m["age"]) ?', opts: ['Le plus petit âge', 'Le dictionnaire du membre le plus jeune', 'La position du minimum'], correct: 1, exp: 'min/max avec key renvoient l’élément entier, comparé via la clé.' },
      { stem: 'Une ligne "Awa 22" arrive de donnees_actionneur. Que vaut parties après l’extraction des champs ?', opts: ['["Awa 22"]', '["Awa", "22"]', '["Awa", 22]'], correct: 1, exp: 'l’extraction des champs découpe la chaîne aux espaces : deux morceaux, tous deux du texte.' },
      { stem: 'La dichotomie exige que le tableau soit…', opts: ['rempli', 'trié', 'de taille paire'], correct: 1, exp: 'Comparer au milieu n’élimine une moitié que si l’ordre est garanti.' }
    ],

    pitfalls: [
      '<strong>Borne intérieure fausse</strong> : n − 1 au lieu de n − 1 − i, et le tri recommence des places déjà faites.',
      '<strong>Compteur dans le if</strong> : les comparaisons sans échange ne sont pas comptées et le total tombe faux.',
      '<strong>« avant » affiché après tri</strong> : la liste étant triée sur place, la série initiale doit être mémorisée d’abord.',
      '<strong>l’extraction des champs sans int()</strong> : l’âge reste du texte, la moyenne plante.',
      '<strong>Dichotomie sur série non triée</strong> : résultat arbitraire, sans erreur visible.'
    ],

    methodTitle: 'Traiter un tableau d’enregistrements',
    method: [
      '<strong>Choisir la structure</strong> : liste plate pour des valeurs seules, dictionnaires pour des enregistrements.',
      '<strong>Lire et convertir</strong> en une passe : l’extraction des champs puis int() ou float() sur le bon champ.',
      '<strong>Trier ou chercher</strong> avec l’algorithme écrit à la main quand l’énoncé le demande.',
      '<strong>Compter l’effort</strong> (comparaisons) quand la question du coût est posée.',
      '<strong>Vérifier</strong> sur le cas d’exemple : série initiale, série triée, compteur.'
    ],

    summary: [
      'Tri à bulles : i compte les passages, j compare les voisins, borne intérieure n − 1 − i.',
      'Comparaisons du double parcours : n(n − 1)/2, payées même sur une série déjà triée.',
      'Une liste de dictionnaires regroupe des enregistrements ; min/max comparant via key=.',
      'l’extraction des champs découpe la ligne en textes ; int() rend un champ calculable.',
      'Dichotomie : bas, milieu, haut ; bas <= haut tient la recherche, −1 dit « introuvable ».'
    ],

    checklist: [
      'J’écris le tri à bulles avec les bonnes bornes et j’explique chacune.',
      'Je compte mes comparaisons à l’endroit exact.',
      'Je structure des membres en dictionnaires et j’extrais extrêmes et moyenne.',
      'J’écris une dichotomie qui renvoie −1 quand la valeur manque.'
    ],

    notions: ['tri à bulles', 'comparaison', 'échange', 'dictionnaire', 'key', 'dichotomie', 'borne', 'convention −1'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Déroule le tri à bulles à la main sur 5 cartes numérotées.' },
      { cls: 'mid', text: '50–69 % — Refaites le registre en ajoutant le nom du membre d’âge médian.' },
      { cls: 'good', text: '70–94 % — Solide : compte aussi les échanges du tri, pas seulement les comparaisons.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, les portes logiques et le chiffrement.' }
    ],

    flashcards: [
      { q: 'Quelle est la borne intérieure du tri à bulles et pourquoi ?', a: 'n − 1 − i : après i passages, les i dernières places sont définitives.' },
      { q: 'Combien de comparaisons pour n éléments (double parcours complet) ?', a: 'n(n − 1)/2 — la somme 1 + 2 + … + (n − 1).' },
      { q: 'À quoi sert le paramètre key= de min et max ?', a: 'À comparer les éléments sur un champ précis (par exemple l’âge) sans réécrire la boucle.' },
      { q: 'Pourquoi la dichotomie renvoie-t-elle −1 ?', a: 'Convention « introuvable » : −1 est hors de l’intervalle des indices valides (0 à n − 1).' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Portes logiques et chiffrement',
    short: 'Logique et César',
    toc: 'Tables de vérité des cinq portes, additionneur complet bit à bit, chiffre de César avec casse conservée.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Dans CircuitVerse, on câble des portes à la souris ; sur la carte, on écrit des expressions ' +
      'bit à bit. C’est la même logique dans deux habits : ET, OU, NON d’un côté, &amp;, |, ~ de ' +
      'l’autre. Et parce qu’un ordinateur ne sait manipuler que des bits, le chiffre de César — ' +
      'décaler des lettres — est déjà de la logique : positions dans l’alphabet, modulo 26, retour ' +
      'circulaire.',

    objectives: [
      'calculer AND, OR, NAND, NOR et XOR sur un couple de bits ;',
      'appliquer les formules S et Cout de l’additionneur complet ;',
      'décaler chaque lettre d’un message avec retour circulaire modulo 26 ;',
      'préserver la casse et laisser intacts les caractères non alphabétiques.'
    ],

    sections: [
      {
        title: 'Les cinq portes de manière méthodique',
        html: [
          '<p>Cinq portes fondamentales, quatre fonctions : ET, OU, NON — et XOR qui vaut 1 exactement ' +
          'quand les bits diffèrent. NAND et NOR se déduisent des deux premières.</p>',
          '<table>\n' +
          '    <tr><th>a</th><th>b</th><th>AND</th><th>OR</th><th>NAND</th><th>NOR</th><th>XOR</th></tr>\n' +
          '    <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>\n' +
          '    <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>\n' +
          '    <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>1</td></tr>\n' +
          '    <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>0</td></tr>\n' +
          '  </table>',
          '<p>de manière méthodique : <code>a and b</code>, <code>a or b</code>, <code>not a</code>, et le XOR se ' +
          'réduit à <code>a != b</code>. Comme le résultat doit s’afficher en 0/1, on emballe le booléen ' +
          'dans <code>int(...)</code> — True devient 1, False devient 0.</p>',
          box('mnemo', 'Mnémotechnique — « NAND universelle »', 'pin',
            '    <p>La porte <strong>NAND</strong> est universelle : en la combinant avec elle-même, on ' +
            'reconstruit ET, OU, NON — donc tout circuit. C’est pourquoi les mémoires et processeurs ' +
            'historiques n’implantaient qu’elle.</p>')
        ].join('\n')
      },
      {
        title: 'L’additionneur complet',
        html: [
          '<p>Un bit, ça s’additionne : l’additionneur complet reçoit trois bits (a, b, retenue entrante ' +
          'cin) et rend la somme S et la retenue sortante Cout.</p>',
          '<pre><code>S    = a XOR b XOR cin\n' +
          'Cout = (a AND b) OR (cin AND (a XOR b))</code></pre>',
          '<p>de manière méthodique, les opérateurs bit à bit tombent bien : <code>^</code> est le XOR, <code>&amp;</code> ' +
          'le ET, <code>|</code> le OU. Sur des bits (0 ou 1), ils coïncident exactement avec les portes.</p>',
          '<pre><code>x = a ^ b\n' +
          'somme = x ^ cin\n' +
          'cout = (a &amp; b) | (cin &amp; x)</code></pre>',
          '<p>Vérification du cas 1 + 1 + 1 : x = 0, S = 1, cout = 1 — soit « 11 » en binaire, trois. La ' +
          'retenue sortante alimente l’étage supérieur : c’est exactement ainsi qu’on câble quatre ' +
          'additionneurs pour additionner deux octets.</p>',
          box('pitfall', 'Piège — ^ n’est pas « puissance »', 'warning',
            '    <p>de manière méthodique, la puissance se note <code>**</code> ; l’accent circonflexe <code>^</code> est ' +
            'le <strong>XOR</strong> bit à bit. Écrire <code>2 ^ 3</code> donne 1 (10 XOR 11 = 01), pas 8. ' +
            'Sur des bits isolés la confusion passe inaperçue ; sur des nombres, elle corrompt tout.</p>')
        ].join('\n')
      },
      {
        title: 'Le chiffre de César',
        html: [
          '<p>Décaler chaque lettre de k positions dans l’alphabet, avec <strong>retour circulaire</strong> : ' +
          'après z revient a. L’exemple du support : HELLO avec k = 3 donne KHOOR.</p>',
          '<pre><code>position      = ord(c) - ord("a")     # 0 à 25\n' +
          'decalée       = (position + k) % 26\n' +
          'lettre        = chr(decalée + ord("a"))</code></pre>',
          '<p><code>ord</code> convertit une lettre en code, <code>chr</code> fait le retour. Le modulo 26 ' +
          'est le rebond : pour z (position 25) et k = 1, (25 + 1) % 26 = 0 — on retombe sur a.</p>',
          '<pre><code>chiffre = ""\n' +
          'for c in message:\n' +
          '    if "a" &lt;= c &lt;= "z":\n' +
          '        chiffre += chr((ord(c) - ord("a") + k) % 26 + ord("a"))\n' +
          '    elif "A" &lt;= c &lt;= "Z":\n' +
          '        chiffre += chr((ord(c) - ord("A") + k) % 26 + ord("A"))\n' +
          '    else:\n' +
          '        chiffre += c</code></pre>',
          '<p>Les deux cas — minuscules et majuscules — utilisent chacun leur base (<code>ord("a")</code> ' +
          'ou <code>ord("A")</code>) : c’est ce qui <strong>conserve la casse</strong>. Le else laisse ' +
          'intacts chiffres, espaces et ponctuation : ils ne sont pas des lettres, ils ne bougent pas.</p>',
          box('intuition', 'Décaler de 25, c’est reculer de 1', 'compass',
            '    <p>k = 25 revient à reculer d’une lettre : A donne Z. Le modulo gère les deux sens sans ' +
            'aucun cas spécial — c’est aussi pourquoi une attaque par force brute n’a que 25 clés à ' +
            'essayer, le 26e décalage étant le message lui-même.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que vaut NOT(1) sur un bit ?', opts: ['0', '1', 'Non défini'], correct: 0, exp: 'NON inverse le bit : 1 donne 0.' },
      { stem: 'XOR vaut 1 exactement quand…', opts: ['les deux bits valent 1', 'les bits diffèrent', 'au moins un bit vaut 1'], correct: 1, exp: 'XOR est l’exclusivité : un seul des deux bits à 1.' },
      { stem: 'Que vaut Cout pour a = 1, b = 1, cin = 0 ?', opts: ['0', '1', '2'], correct: 1, exp: '(1 ET 1) OU (0 ET x) = 1 OU 0 = 1 : 1 + 1 = 10 en binaire.' },
      { stem: 'Que vaut 2 ^ 3 de manière méthodique ?', opts: ['8', '1', '5'], correct: 1, exp: '^ est le XOR : 10 XOR 11 = 01. La puissance se note **.' },
      { stem: 'Pourquoi (position + k) % 26 ?', opts: ['Pour arrondir', 'Pour rebondir après z et revenir à a', 'Pour éviter les négatifs'], correct: 1, exp: 'Le modulo 26 enroule l’alphabet : 25 + 1 retombe sur 0.' },
      { stem: 'Dans le chiffre de César, que devient le tiret de « Robot-2026 » ?', opts: ['Il est décalé', 'Il est supprimé', 'Il reste un tiret'], correct: 2, exp: 'Seules les lettres se décalent ; chiffres et ponctuation passent par le else inchangés.' }
    ],

    pitfalls: [
      '<strong>XOR confondu avec la puissance</strong> : ^ au lieu de **, résultats incohérents dès qu’on sort des bits.',
      '<strong>int(...) oublié</strong> : print affiche True au lieu de 1 — les tests comparent exactement.',
      '<strong>Base unique pour les deux casses</strong> : décaler une majuscule avec ord("a") sort de l’alphabet.',
      '<strong>Caractères non alphabétiques décalés</strong> : l’espace devient une lettre et le message se lit plus.',
      '<strong>Modulo oublié</strong> : z + 1 produit un caractère hors alphabet au lieu de rebondir sur a.'
    ],

    methodTitle: 'Passer du circuit à l’expression',
    method: [
      '<strong>Écrire la table de vérité</strong> de ce que l’on veut construire, avant le code.',
      '<strong>Traduire en expressions</strong> : and/or/not, ou les opérateurs bit à bit &amp; | ^.',
      '<strong>Emballer en 0/1</strong> avec int(...) quand le résultat s’affiche.',
      '<strong>Isoler la transformation par lettre</strong> : position, décalage, modulo, retour en lettre.',
      '<strong>Traiter les caractères non concernés</strong> explicitement, dans le else.'
    ],

    summary: [
      'Cinq portes, quatre expressions : and, or, not, et a != b pour XOR ; int(...) pour afficher 0/1.',
      'NAND est universelle : tout circuit se reconstruit avec elle seule.',
      'Additionneur complet : S = a ^ b ^ cin et Cout = (a & b) | (cin & (a ^ b)).',
      'César : (ord(c) − base + k) % 26 + base, la casse par la base (a ou A), le rebond par le modulo.',
      'Chiffres, espaces et ponctuation ne sont pas des lettres : ils traversent le chiffrement inchangés.'
    ],

    checklist: [
      'Je récite les tables de vérité des cinq portes sans hésiter.',
      'Je calcule S et Cout d’un additionneur complet sur n’importe quels bits.',
      'J’explique le rôle du modulo 26 dans le retour circulaire.',
      'Je chiffre un message mixte en conservant casse et ponctuation.'
    ],

    notions: ['porte logique', 'table de vérité', 'NAND universelle', 'additionneur complet', 'retenue', 'XOR', 'ord', 'chr', 'modulo 26'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Remplis la table des cinq portes à la main pour les quatre couples.' },
      { cls: 'mid', text: '50–69 % — Refaites l’additionneur en testant les huit combinaisons possibles.' },
      { cls: 'good', text: '70–94 % — Solide : chiffre votre prénom avec k = 7 et vérifie à la main.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, capteurs et régulation.' }
    ],

    flashcards: [
      { q: 'Comment se note XOR de manière méthodique ?', a: 'Avec l’opérateur ^ ; sur des bits, a != b donne le même résultat.' },
      { q: 'Formules de l’additionneur complet ?', a: 'S = a XOR b XOR cin ; Cout = (a AND b) OR (cin AND (a XOR b)).' },
      { q: 'Pourquoi NAND est-elle universelle ?', a: 'ET, OU et NON se reconstruisent avec des NAND seules, donc tout circuit aussi.' },
      { q: 'Comment le chiffre de César conserve-t-il la casse ?', a: 'En utilisant la base correspondante : ord("a") pour les minuscules, ord("A") pour les majuscules.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Capteurs, seuils et régulation',
    short: 'Capteurs',
    toc: 'Table de correspondance d’un afficheur 7 segments, classement de relevés par seuils, bilan minimum et moyenne.',
    time: '≈ 3 h de travail',

    situation:
      'Le robot est équipé : afficheur 7 segments pour compter, capteur de distance pour freiner, ' +
      'capteur de température pour alerter. Le matériel se branche en une heure ; le programme qui le ' +
      'pilote demande trois qualités : une <strong>table de correspondance</strong> claire, des ' +
      '<strong>seuils stricts</strong> assumés, un <strong>bilan</strong> qui résume la série. C’est le ' +
      'chapitre où tout le cours se combine.',

    objectives: [
      'associer chaque chiffre à ses segments via un dictionnaire ;',
      'classer des relevés par seuils stricts avec trois états ;',
      'réafficher des nombres sans zéros inutiles ;',
      'agréger une série en minimum et moyenne entière.'
    ],

    sections: [
      {
        title: 'L’afficheur 7 segments comme table',
        html: [
          '<p>Sept segments nommés de <code>a</code> à <code>g</code>. Chaque chiffre allume un sous-ensemble : ' +
          'le 0 allume tout sauf g, le 1 seulement b et c, le 8 tout. La correspondance est une ' +
          '<strong>donnée</strong>, pas un calcul : un dictionnaire la pose une fois pour toutes.</p>',
          '<pre><code>segments = {\n' +
          '    0: "a b c d e f",\n' +
          '    1: "b c",\n' +
          '    2: "a b d e g",\n' +
          '    ...\n' +
          '    8: "a b c d e f g"\n' +
          '}\n' +
          'print(segments[chiffre])</code></pre>',
          '<p>Le programme principal se réduit alors à une lecture et un affichage : toute la complexité ' +
          'est dans la table, lisible et vérifiable chiffre par chiffre. C’est le même réflexe qu’en ' +
          'électronique, où la table de vérité précède le câblage.</p>',
          box('mnemo', 'Mnémotechnique — « Le dictionnaire est un câblage »', 'pin',
            '    <p>Écrire <code>7: "a b c"</code> dans un dictionnaire, c’est brancher les segments a, b, c ' +
            'du chiffre 7. <strong>Une table de correspondance est plus sûre qu’un calcul</strong> : elle ne ' +
            'peut pas se tromper de formule, seulement d’entrée — et ça se voit d’un coup d’œil.</p>')
        ].join('\n')
      },
      {
        title: 'Trois états, deux seuils',
        html: [
          '<p>La station météo du TP classe chaque relevé : alerte chaleur au-dessus de 30, alerte froid ' +
          'en dessous de 15, normal entre les deux. Trois états, deux seuils, une chaîne if / elif / else.</p>',
          '<pre><code>if t &gt; 30:      "ALERTE CHALEUR"\n' +
          'elif t &lt; 15:    "ALERTE FROID"\n' +
          'else:           "normale"</code></pre>',
          '<p>Les seuils sont <strong>stricts</strong> : 30 exactement est normal, 15 exactement est normal. ' +
          'Les tests vérifient toujours la frontière — le relevé égal au seuil est le cas qui trahit un ' +
          '<code>&gt;=</code> écrit par distraction.</p>',
          box('pitfall', 'Piège — le relevé à la frontière', 'warning',
            '    <p>Un <code>&gt;=</code> au lieu de <code>&gt;</code> déplace tout le compte d’alertes : ' +
            '30.0 basculerait en alerte. <strong>L’énoncé fixe la frontière ; le code la respecte au ' +
            'caractère près.</strong> Si l’énoncé dit « strictement supérieur », le test est &gt;.</p>')
        ].join('\n')
      },
      {
        title: 'Afficher sans zéros inutiles',
        html: [
          '<p>Un relevé de 30.0 doit s’afficher « 30 », un relevé de 12.5 garde sa décimale. Le format ' +
          '<code>:g</code> fait exactement cela : il supprime les zéros de fin.</p>',
          '<pre><code>f"{t:g} C : normale"      →   "30 C : normale"\n' +
          'f"{t:g} C : normale"      →   "12.5 C : normale"\n' +
          'f"{t:.2f} C : normale"    →   "30.00 C : normale"   (à éviter ici)</code></pre>',
          '<p>Les trois formats à connaître : <code>:g</code> nettoie, <code>:.2f</code> arrondit à deux ' +
          'décimales, <code>:&lt;12</code> aligne à gauche. Choisir le mauvais n’est pas une erreur de style : ' +
          'c’est une sortie différente, et les tests la refusent.</p>'
        ].join('\n')
      },
      {
        title: 'Le bilan : minimum et moyenne entière',
        html: [
          '<p>Après le classement, le régulateur résume la série : le relevé le plus petit (le plus urgent) ' +
          'et la moyenne.</p>',
          '<pre><code>minimum = min(distances)\n' +
          'moyenne = sum(distances) // n        # division entière\n' +
          '\n' +
          'print(f"minimum : {minimum}")\n' +
          'print(f"moyenne : {moyenne}")</code></pre>',
          '<p>La <strong>division entière</strong> <code>//</code> est imposée par l’énoncé : 135 / 6 vaut ' +
          '22,5 mais <code>135 // 6</code> vaut 22. Le <code>min()</code> d’une liste non vide ne plante ' +
          'jamais ; c’est une liste vide qui le ferait — et l’énoncé garantit n ≥ 1.</p>',
          box('intuition', 'Suivre le minimum dans la boucle', 'compass',
            '    <p>Deux écoles : <code>min()</code> après coup, ou une variable suivie dans la boucle ' +
            '(« si d est plus petit, il devient le nouveau minimum »). Les deux sont justes ; la seconde est ' +
            'ce qu’on écrit sur une carte qui traite les relevés au fil de l’eau, sans les retenir tous.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quels segments s’allument pour le chiffre 8 ?', opts: ['a b c d e f', 'a b c d e f g', 'b c'], correct: 1, exp: 'Le 8 allume les sept segments.' },
      { stem: 't = 30 exactement avec le test t > 30 : quel état ?', opts: ['ALERTE CHALEUR', 'normale', 'ALERTE FROID'], correct: 1, exp: 'Seuil strict : 30 n’est pas strictement supérieur à 30, il reste normal.' },
      { stem: 'Que vaut 135 // 6 ?', opts: ['22,5', '22', '23'], correct: 1, exp: 'La division entière tronque : 22. Le reste serait 3.' },
      { stem: 'Que produit f"{12.5:g}" ?', opts: ['12.5', '13', '12.50'], correct: 0, exp: ':g affiche sans zéros inutiles : la décimale utile reste.' },
      { stem: 'Dans if / elif / else, le relevé 20 des seuils 30 et 15 tombe dans…', opts: ['la branche if', 'la branche elif', 'la branche else'], correct: 2, exp: 'Ni > 30 ni < 15 : c’est le else qui le classe normal.' },
      { stem: 'min() sur une liste vide…', opts: ['renvoie 0', 'renvoie None', 'lève une erreur'], correct: 2, exp: 'Il n’y a pas de minimum à une liste vide : l’énoncé garantit n ≥ 1.' }
    ],

    pitfalls: [
      '<strong>Table incomplète</strong> : un chiffre absent du dictionnaire lève KeyError à l’affichage.',
      '<strong>Seuil large au lieu de strict</strong> : 30 exactement compte en alerte et le total glisse.',
      '<strong>:.2f au lieu de :g</strong> : « 30.00 » s’affiche là où « 30 » est attendu.',
      '<strong>Moyenne vraie au lieu d’entière</strong> : 22.5 affiché là où // donne 22.',
      '<strong>min() sur liste vide</strong> : impossible ici (n ≥ 1), mais le réflexe de garde reste bon.'
    ],

    methodTitle: 'Piloter un capteur en simulation',
    method: [
      '<strong>Poser les données fixes</strong> dans une table (dictionnaire) plutôt qu’en calculs ad hoc.',
      '<strong>Fixer les seuils et leur strictesse</strong> tels que l’énoncé les écrit.',
      '<strong>Choisir le format d’affichage</strong> : :g pour nettoyer, :.2f pour arrondir, alignement pour les colonnes.',
      '<strong>Agréger après la boucle</strong> : min, max, somme, moyenne — jamais dans le classement.',
      '<strong>Rejouer les frontières</strong> : une valeur exactement au seuil, une sous le seuil, une au-dessus.'
    ],

    summary: [
      'Une correspondance chiffre → segments est une donnée : le dictionnaire la pose, l’affichage la lit.',
      'Trois états, deux seuils : if / elif / else, une seule branche par relevé.',
      'Seuils stricts : 30 et 15 exactement restent dans la zone normale.',
      ':g affiche sans zéros inutiles ; :.2f arrondit ; le choix du format change la sortie.',
      'Bilan : min() pour l’extrême, // pour la moyenne entière imposée par l’énoncé.'
    ],

    checklist: [
      'Je construis un dictionnaire de correspondance complet et je le lis proprement.',
      'Je classe des relevés avec des seuils stricts en trois états.',
      'J’affiche des nombres sans zéros inutiles au bon format.',
      'Je produis un bilan minimum et moyenne entière corrects.'
    ],

    notions: ['afficheur 7 segments', 'dictionnaire de correspondance', 'seuil strict', 'trois états', 'format :g', 'division entière', 'minimum', 'agrégation'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Complétez la table 7 segments pour tous les chiffres de 0 à 9.' },
      { cls: 'mid', text: '50–69 % — Refaites la station météo en comptant chaleurs et froids séparément.' },
      { cls: 'good', text: '70–94 % — Solide : ajoute le maximum et la position du minimum au régulateur.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : attaque le projet « relevé de télémétrie » de la page exercices.' }
    ],

    flashcards: [
      { q: 'Pourquoi une table (dictionnaire) plutôt qu’un calcul pour les segments ?', a: 'La correspondance est une donnée : elle ne peut pas se tromper de formule, seulement d’entrée, et ça se vérifie d’un coup d’œil.' },
      { q: 'Quel état pour t = 30 exactement (seuils > 30 et < 15) ?', a: 'Normal : les deux seuils sont stricts.' },
      { q: 'Différence entre :g et :.2f ?', a: ':g supprime les zéros inutiles (30.0 → 30) ; :.2f arrondit toujours à deux décimales (30 → 30.00).' },
      { q: 'Que vaut sum // n de plus que sum / n ?', a: 'Un entier tronqué : 135/6 = 22,5 mais 135 // 6 = 22.' }
    ]
  }
];

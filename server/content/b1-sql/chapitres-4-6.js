/**
 * Chapitres 4 à 6 du cours de bases de données & SQL B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Ce cours n'a pas d'atelier
 * de code : les exercices se font dans le simulateur SQL (page atelier.html).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Jointures : relier les tables',
    short: 'Jointures',
    toc: 'Pourquoi joindre, jointure sans JOIN puis INNER JOIN, LEFT JOIN, alias, lecture du résultat.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Les marques vivent dans une table, les voitures dans une autre — et la question « combien de ' +
      'voitures japonaises dans le parc ? » traverse les deux. La jointure est l’opération qui combine ' +
      'leurs lignes autour de leur point de passage : le code de marque. Une fois le principe vu, ' +
      'les questions à deux tables ne coûtent pas plus cher que les autres.',

    objectives: [
      'expliquer ce que produit une jointure : un résultat combinant les lignes ;',
      'écrire une jointure interne avec JOIN…ON et sans JOIN (virgules + WHERE) ;',
      'choisir entre INNER JOIN et LEFT JOIN selon la question ;',
      'utiliser des alias de tables pour écrire des requêtes lisibles.'
    ],

    sections: [
      {
        title: 'Le principe : combiner les lignes',
        html: [
          '<p>Une jointure combine les lignes de deux tables dans le résultat d’une requête, sans ' +
          'modifier les tables d’origine. Pour une jointure interne avec condition, imaginez toutes les ' +
          'combinaisons, puis gardez celles qui satisfont la condition. Le SGBD peut les calculer autrement.</p>',
          '<pre><code>Marque (un extrait)          Voiture (un extrait)\n' +
          'codemarque  nommarque        immat       codemarque\n' +
          'TOY         TOYOTA           TG-3733-AC  TOY\n' +
          'BMW         BMW              TG-5420-AL  BMW\n' +
          'REN         RENAULT          TG-2222-BC  REN\n' +
          '\n' +
          'jointure sur Marque.codemarque = Voiture.codemarque\n' +
          '→ TG-3733-AC  TOYOTA   TOYOTA   JAPON\n' +
          '→ TG-5420-AL  BMW      BMW      ALLEMAGNE\n' +
          '→ TG-2222-BC  RENAULT  RENAULT  FRANCE</code></pre>',
          '<p>La condition de jointure se repère dans le schéma : quelle colonne d’une table désigne la ' +
          'même réalité qu’une colonne de l’autre ? Ici les deux colonnes <code>codemarque</code> ' +
          'désignent la même marque. La clé étrangère composée contrôle aussi la cohérence du nom.</p>',
          box('mnemo', 'Mnémotechnique — « Le pont a deux rives »', 'pin',
            '    <p>Pour relier les lignes correspondantes, vérifiez la condition : elle peut s’écrire ' +
            'avec <code>ON</code>, <code>USING</code> ou, pour une jointure interne, dans <code>WHERE</code>. ' +
            'Un produit cartésien associe volontairement chaque ligne à toutes les autres ; il est valide, ' +
            'mais souvent involontaire.</p>')
        ].join('\n')
      },
      {
        title: 'Jointure sans JOIN, puis INNER JOIN',
        html: [
          '<p>La forme historique liste les tables séparées par des virgules et met la condition dans le ' +
          '<code>WHERE</code> :</p>',
          '<pre><code>SELECT V.immat, M.nommarque, M.paysmarque\n' +
          'FROM Voiture V, Marque M\n' +
          'WHERE V.codemarque = M.codemarque;</code></pre>',
          '<p>La forme moderne — celle du support et des normes — passe par <code>JOIN…ON</code> :</p>',
          '<pre><code>SELECT V.immat, M.nommarque, M.paysmarque\n' +
          'FROM Voiture V\n' +
          'INNER JOIN Marque M ON V.codemarque = M.codemarque;\n' +
          '\n' +
          '-- les clauses habituelles restent en place :\n' +
          'SELECT V.immat, V.marque\n' +
          'FROM Voiture V\n' +
          'INNER JOIN Marque M ON V.codemarque = M.codemarque\n' +
          'WHERE M.paysmarque = \'JAPON\'\n' +
          'ORDER BY V.immat;</code></pre>',
          '<p><code>INNER</code> est facultatif — <code>JOIN</code> seul signifie déjà jointure interne. ' +
          'La jointure interne ne retient que les lignes ayant <strong>une correspondance des deux ' +
          'côtés</strong> : une marque sans voiture du parc disparaît du résultat.</p>',
          '<p>Lorsque les deux tables portent le même nom de colonne, SQLite accepte aussi ' +
          '<code>USING (codemarque)</code>. <code>NATURAL JOIN</code> utilise automatiquement tous ' +
          'les noms de colonnes communs : ici, seul <code>codemarque</code> est commun. ' +
          'Ajouter une colonne de même nom aux deux tables peut donc changer le résultat.</p>',
          '<pre><code>SELECT V.immat, M.nommarque\n' +
          'FROM Voiture V JOIN Marque M USING (codemarque)\n' +
          'ORDER BY V.immat LIMIT 3;\n' +
          'SELECT COUNT(*) AS voitures FROM Voiture NATURAL JOIN Marque;\n' +
          'SELECT COUNT(*) AS combinaisons FROM Voiture CROSS JOIN Marque;</code></pre>',
          '<p>Dans la base initiale, NATURAL JOIN donne 23 correspondances ; CROSS JOIN, sans ' +
          'condition ici, produit 23 × 12 = 276 combinaisons.</p>',
          '<pre><code>SELECT COUNT(*) FROM Voiture V CROSS JOIN Marque M ON V.codemarque = M.codemarque;</code></pre>',
          '<p>SQLite accepte aussi une condition ON ou USING sur CROSS JOIN : cette extension non portable ' +
          'ne conserve que les combinaisons correspondantes (23 ici). Pour obtenir un produit cartésien, ' +
          'écrivez CROSS JOIN sans condition.</p>',
          box('intuition', 'Pourquoi la jointure interne « perd » des lignes', 'compass',
            '    <p>Si une marque n’a aucune voiture, aucune ligne de Voiture ne correspond : la ligne ' +
            'conjuguée n’existe pas, la marque disparaît. Ce n’est pas un bug — c’est la définition. Pour ' +
            'garder les marques sans voiture, il faut la jointure externe de la section suivante.</p>')
        ].join('\n')
      },
      {
        title: 'LEFT JOIN : garder la table de gauche',
        html: [
          '<p>« Combien de voitures par marque ? » avec un INNER JOIN omettrait les marques sans voiture. ' +
          'La <strong>jointure externe gauche</strong> garde toutes les lignes de la table de gauche, ' +
          'complétées de <code>NULL</code> quand la droite manque :</p>',
          '<pre><code>SELECT M.nommarque, COUNT(V.immat) AS nb\n' +
          'FROM Marque M\n' +
          'LEFT JOIN Voiture V ON V.codemarque = M.codemarque\n' +
          'GROUP BY M.nommarque\n' +
          'ORDER BY nb DESC, M.nommarque;</code></pre>',
          '<p>Le détail qui compte : compter <code>V.immat</code> et non <code>*</code>. Pour une marque ' +
          'sans voiture, <code>V.immat</code> vaut NULL et n’est pas compté — le total est juste (0), là ' +
          'où <code>COUNT(*)</code> compterait 1 (la ligne conjuguée à NULL existe dans la jointure). ' +
          'Dans la base initiale, les 12 marques ont au moins une voiture : ajoutez une marque fictive ' +
          'sans voiture pour observer un zéro, puis réinitialisez la base.</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Lignes retenues</th></tr>\n' +
          '    <tr><td>INNER JOIN</td><td>uniquement les correspondances des deux côtés</td></tr>\n' +
          '    <tr><td>LEFT JOIN</td><td>toutes les lignes de gauche, NULL à droite si absence</td></tr>\n' +
          '    <tr><td>RIGHT JOIN</td><td>symétrique : toutes les lignes de droite</td></tr>\n' +
          '  </table>'
        ].join('\n')
      },
      {
        title: 'Relier plusieurs voitures et équipements',
        html: [
          '<p>Une voiture peut avoir plusieurs équipements, et un même équipement peut équiper plusieurs ' +
          'voitures. La table <code>VoitureEquipement</code> enregistre chaque association par ' +
          'l’immatriculation et le code de l’équipement. Sa clé primaire composée interdit deux fois ' +
          'la même association ; ses deux clés étrangères désignent des lignes existantes.</p>',
          '<pre><code>SELECT V.immat, E.nomequipement\n' +
          'FROM Voiture V\n' +
          'INNER JOIN VoitureEquipement VE ON VE.immat = V.immat\n' +
          'INNER JOIN Equipement E ON E.codeequipement = VE.codeequipement\n' +
          'ORDER BY V.immat, E.nomequipement;</code></pre>',
          '<p>La première jointure retrouve les associations de chaque voiture ; la seconde retrouve ' +
          'le nom de chaque équipement. Dans ce parc fictif, supprimer une voiture ou un équipement ' +
          'supprime aussi ses associations grâce à <code>ON DELETE CASCADE</code>.</p>'
        ].join('\n')
      },
      {
        title: 'Les alias de tables',
        html: [
          '<p>Écrire <code>Marque.nommarque</code> à chaque colonne fatigue vite. L’alias renomme la table ' +
          '<strong>le temps de la requête</strong> :</p>',
          '<pre><code>SELECT M.codemarque, M.nommarque, V.immat\n' +
          'FROM Marque M\n' +
          'INNER JOIN Voiture V ON M.codemarque = V.codemarque\n' +
          'WHERE V.immat LIKE \'%AK\';</code></pre>',
          '<p>Trois règles : l’alias se déclare dans le FROM (M, V), il remplace le nom de table partout ' +
          'dans la requête, et une fois aliasée la table ne peut plus être désignée par son nom complet. ' +
          'Le support l’écrit : les alias « permettent notamment de renommer les tables, et ainsi ' +
          'd’écrire moins de code ».</p>',
          box('pitfall', 'Piège — les colonnes ambiguës', 'warning',
            '    <p>Quand deux tables jointes portent une colonne de même nom (ici <code>codemarque</code> ' +
            'dans Marque et Voiture), écrire la colonne sans préfixe est une erreur : ' +
            '« ambiguous column ». <strong>Toujours préfixer par l’alias</strong> : M.codemarque, V.codemarque.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que produit une jointure interne avec condition ?', opts: ['Une copie permanente des tables', 'Un résultat associant les lignes correspondantes', 'Une suppression des lignes sans correspondance'], correct: 1, exp: 'La requête produit un résultat sans modifier les tables ; le moteur ne crée pas nécessairement une table temporaire.' },
      { stem: 'Que retient une jointure interne ?', opts: ['Toutes les lignes des deux tables', 'Uniquement les correspondances des deux côtés', 'Les lignes de la première table'], correct: 1, exp: 'Sans correspondance, la ligne conjuguée n’existe pas.' },
      { stem: 'Quelle jointure garde les marques sans voiture ?', opts: ['INNER JOIN', 'LEFT JOIN (Marque à gauche)', 'Aucune'], correct: 1, exp: 'LEFT JOIN garde toute la table de gauche, complétée de NULL.' },
      { stem: 'Dans une LEFT JOIN, pourquoi COUNT(V.immat) plutôt que COUNT(*) ?', opts: ['C’est plus rapide', 'COUNT(V.immat) ignore les NULL : les marques sans voiture comptent 0', 'COUNT(*) est interdit en jointure'], correct: 1, exp: 'COUNT(colonne) ne compte que les non-NULL ; COUNT(*) compterait la ligne conjuguée.' },
      { stem: 'Que vaut l’erreur « ambiguous column » ?', opts: ['Une colonne mal typée', 'Une colonne nommée sans préfixe alors que deux tables jointes la portent', 'Une colonne NULL'], correct: 1, exp: 'Il faut préfixer par l’alias : M.codemarque ou V.codemarque.' },
      { stem: 'Une table aliasée en M peut encore s’écrire Marque dans la même requête ?', opts: ['Oui', 'Non, l’alias remplace le nom partout', 'Seulement dans le SELECT'], correct: 1, exp: 'Une fois déclarée, seule la forme aliasée est valide.' }
    ],

    pitfalls: [
      '<strong>Condition de jointure oubliée</strong> : produit cartésien, valide mais souvent non souhaité.',
      '<strong>INNER JOIN quand la question demande les absents</strong> : les marques sans voiture disparaissent.',
      '<strong>COUNT(*) sur une LEFT JOIN</strong> : les lignes conjuguées à NULL sont comptées à tort.',
      '<strong>Colonnes non préfixées</strong> : « ambiguous column » dès que deux tables partagent un nom.',
      '<strong>Alias déclarés mais non utilisés</strong> : la requête mélange les deux formes et se casse.'
    ],

    methodTitle: 'Écrire une jointure',
    method: [
      '<strong>Identifier le point de passage</strong> : quelle colonne désigne la même réalité des deux côtés ?',
      '<strong>Choisir la table de départ</strong> (FROM) selon ce qu’on ne veut jamais perdre.',
      '<strong>Écrire JOIN…ON</strong> avec la condition exacte, préfixée par les alias.',
      '<strong>Compléter</strong> WHERE, ORDER BY, LIMIT dans l’ordre fixe.',
      '<strong>Contrôler</strong> : le nombre de lignes correspond-il à la question (toutes, ou seulement les appariées) ?'
    ],

    summary: [
      'Une jointure combine les lignes ; ON, USING et NATURAL sont des formes possibles, CROSS JOIN produit ici toutes les combinaisons.',
      'INNER JOIN : correspondances des deux côtés ; LEFT JOIN : toute la table de gauche, NULL à droite.',
      'COUNT(colonne) ignore les NULL : c’est lui qu’on compte sur une LEFT JOIN.',
      'Les alias (M, V) raccourcissent la requête et remplacent le nom de table partout.',
      'Deux tables jointes qui partagent un nom de colonne : toujours préfixer, sinon ambiguïté.'
    ],

    checklist: [
      'J’écris une INNER JOIN avec la bonne condition ON.',
      'Je choisis LEFT JOIN quand la question porte sur « même sans ».',
      'Je compte avec COUNT(colonne) sur les jointures externes.',
      'Je préfixe toutes les colonnes ambiguës par leurs alias.'
    ],

    notions: ['jointure', 'INNER JOIN', 'LEFT JOIN', 'ON', 'table virtuelle', 'alias', 'colonne ambiguë', 'produit cartésien'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refaites la jointure Marque/Voiture dans le simulateur, colonne par colonne.' },
      { cls: 'mid', text: '50–69 % — Écrivez « voitures japonaises, triées par immatriculation » avec JOIN.' },
      { cls: 'good', text: '70–94 % — Solide : compte les voitures par pays avec LEFT JOIN et GROUP BY.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 5, les fonctions d’agrégation.' }
    ],

    flashcards: [
      { q: 'Que produit une jointure ?', a: 'Un résultat combinant des lignes ; ON ou USING peuvent définir les correspondances. CROSS JOIN peut produire toutes les combinaisons.' },
      { q: 'Différence INNER / LEFT JOIN ?', a: 'INNER ne garde que les correspondances ; LEFT garde toute la table de gauche, complétée de NULL.' },
      { q: 'Pourquoi COUNT(V.immat) et pas COUNT(*) sur une LEFT JOIN ?', a: 'COUNT(colonne) ignore les NULL : les marques sans voiture comptent 0, pas 1.' },
      { q: 'C’est quoi une colonne ambiguë ?', a: 'Un nom de colonne porté par deux tables jointes et écrit sans préfixe d’alias.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Agrégation : compter, regrouper, filtrer les groupes',
    short: 'Agrégation',
    toc: 'COUNT, MIN, MAX, SUM, AVG, GROUP BY, HAVING, ordre complet d’une requête.',
    time: '≈ 3 h de travail',

    situation:
      '« Combien de voitures par marque ? Quel budget total du parc ? Quelle marque domine ? » — aucune ' +
      'de ces réponses n’est une ligne de la table : ce sont des <strong>calculs sur des groupes de ' +
      'lignes</strong>. Les fonctions d’agrégation réduisent des colonnes à une valeur, et GROUP BY ' +
      'découpe la table en groupes avant le calcul. C’est le cœur de l’analyse de données en SQL.',

    objectives: [
      'calculer des totaux avec COUNT, MIN, MAX, SUM et AVG ;',
      'distinguer COUNT(*), COUNT(colonne) et COUNT(DISTINCT colonne) ;',
      'regrouper les lignes avec GROUP BY et lire le résultat ;',
      'filtrer les groupes avec HAVING, et le placer après WHERE.'
    ],

    sections: [
      {
        title: 'Les cinq fonctions d’agrégation',
        html: [
          '<p>Une fonction d’agrégation agit sur une colonne et renvoie <strong>une seule valeur</strong> ' +
          'pour toutes les lignes sélectionnées :</p>',
          '<table>\n' +
          '    <tr><th>Fonction</th><th>Résultat</th><th>Exemple sur le parc</th></tr>\n' +
          '    <tr><td>COUNT(*)</td><td>nombre de lignes</td><td>23 voitures</td></tr>\n' +
          '    <tr><td>COUNT(colonne)</td><td>lignes où la colonne n’est pas NULL</td><td>dates connues : 23</td></tr>\n' +
          '    <tr><td>MIN / MAX</td><td>plus petite / plus grande valeur</td><td>prix de 6 M à 50 M</td></tr>\n' +
          '    <tr><td>SUM</td><td>somme des valeurs</td><td>budget total : 613,8 M</td></tr>\n' +
          '    <tr><td>AVG</td><td>moyenne des valeurs</td><td>kilométrage moyen : 1 840,65</td></tr>\n' +
          '  </table>',
          '<p><code>MIN</code> et <code>MAX</code> ne sont pas réservés aux nombres : sur des chaînes ils ' +
          'renvoient la première et la dernière dans l’ordre alphabétique, sur des dates la plus ancienne ' +
          'et la plus récente — <code>SELECT MIN(immat), MAX(datecirc) FROM Voiture;</code> est une requête légale.</p>',
          box('pitfall', 'Piège — COUNT(*) vs COUNT(colonne)', 'warning',
            '    <p><code>COUNT(*)</code> compte <strong>toutes</strong> les lignes ; ' +
            '<code>COUNT(colonne)</code> saute celles où la colonne vaut NULL. Si, dans un autre jeu de ' +
            '34 voitures, 9 dates étaient inconnues, <code>COUNT(*)</code> vaudrait 34 et ' +
            '<code>COUNT(datecirc)</code> vaudrait 25. Dans notre base initiale, les 23 dates sont connues ; ' +
            'l’immatriculation, elle, ne peut jamais être NULL.</p>')
        ].join('\n')
      },
      {
        title: 'GROUP BY : calculer par groupe',
        html: [
          '<p>Pour savoir combien de Toyota, de BMW, de Kia en une seule requête, on regroupe les lignes ' +
          'par marque : <code>GROUP BY</code> réaménage le résultat en groupes où la colonne de ' +
          'regroupement a la même valeur, et l’agrégat se calcule <strong>pour chaque groupe</strong>.</p>',
          '<pre><code>SELECT marque, COUNT(*) AS nb\n' +
          'FROM Voiture\n' +
          'GROUP BY marque;\n' +
          '\n' +
          '-- avec un filtre sur les lignes, avant le regroupement :\n' +
          'SELECT moteur, COUNT(*), AVG(pxachat)\n' +
          'FROM Voiture\n' +
          'WHERE marque = \'TOYOTA\'\n' +
          'GROUP BY moteur;</code></pre>',
          '<p>Lecture du premier exemple : une ligne par marque présente dans le parc, avec son effectif — ' +
          'et rien d’autre. Pour obtenir un résultat portable et déterministe, affichez les colonnes ' +
          'de regroupement et les agrégats ; ne demandez pas une immatriculation arbitraire du groupe.</p>',
          box('tech', 'Différence de dialecte : colonne non agrégée', 'terminal',
            '    <p>SQLite accepte aussi la requête suivante : il renvoie 12 groupes et choisit pour ' +
            'chaque groupe une immatriculation d’une de ses lignes, sans garantir laquelle. D’autres ' +
            'SGBD ou réglages peuvent refuser cette forme. Préférez la requête précédente, qui ne ' +
            'demande que la marque et son effectif.</p>\n' +
            '    <pre><code>SELECT marque, immat, COUNT(*) AS nb FROM Voiture GROUP BY marque;</code></pre>'),
          box('mnemo', 'Mnémotechnique — « GROUP BY découpe, l’agrégat résume »', 'pin',
            '    <p>Chaque groupe devient <strong>une ligne du résultat</strong>. Si le résultat paraît ' +
            'étrange (trop de lignes, valeurs incohérentes), vérifier deux choses : la colonne de ' +
            'regroupement est-elle la bonne ? Chaque colonne affichée est-elle regroupée ou agrégée ?</p>')
        ].join('\n')
      },
      {
        title: 'HAVING : filtrer les groupes',
        html: [
          '<p>« Quelles marques ont plus de deux voitures ? » : la condition porte sur le <strong>résultat ' +
          'du regroupement</strong>, pas sur les lignes. C’est le rôle de <code>HAVING</code> — l’équivalent ' +
          'de WHERE appliqué aux groupes :</p>',
          '<pre><code>SELECT marque, COUNT(*) AS nb\n' +
          'FROM Voiture\n' +
          'GROUP BY marque\n' +
          'HAVING COUNT(*) &gt; 2;\n' +
          '\n' +
          '-- WHERE filtre les lignes AVANT le regroupement,\n' +
          '-- HAVING filtre les groupes APRÈS :\n' +
          'SELECT moteur, COUNT(*)\n' +
          'FROM Voiture\n' +
          'WHERE marque = \'TOYOTA\'\n' +
          'GROUP BY moteur\n' +
          'HAVING COUNT(*) &gt;= 1;</code></pre>',
          '<p>Dans SQLite, une requête agrégée sans GROUP BY forme aussi un groupe global ; ' +
          'HAVING peut le conserver ou l’écarter :</p>',
          '<pre><code>SELECT COUNT(*) AS nb FROM Voiture HAVING COUNT(*) &gt; 0;</code></pre>',
          '<p>Sur la base initiale, cette requête renvoie une ligne contenant 23. Avec ' +
          '<code>HAVING COUNT(*) &gt; 23</code>, elle ne renvoie aucune ligne. Les conditions acceptées ' +
          'par HAVING peuvent varier selon le dialecte.</p>',
          box('intuition', 'WHERE ou HAVING : la question à se poser', 'compass',
            '    <p>« Seulement les diesels » parle des <strong>lignes</strong> : WHERE. « Seulement les ' +
            'marques avec au moins 3 voitures » parle des <strong>groupes</strong> : HAVING. On ne place pas ' +
            'directement dans WHERE un agrégat du même SELECT ; une sous-requête peut cependant y calculer un agrégat.</p>')
        ].join('\n')
      },
      {
        title: 'L’ordre complet, une dernière fois',
        html: [
          '<p>Voici l’<strong>ordre d’écriture</strong> des clauses, lorsqu’elles sont présentes :</p>',
          '<pre><code>SELECT   colonnes, agrégats\n' +
          'FROM     tables (jointures éventuelles)\n' +
          'WHERE    filtre les LIGNES\n' +
          'GROUP BY découpe en GROUPES\n' +
          'HAVING   filtre les GROUPES\n' +
          'ORDER BY trie le résultat\n' +
          'LIMIT    borne le nombre de lignes</code></pre>',
          '<p>Pour comprendre le résultat, un ordre logique utile est FROM et jointures, WHERE, ' +
          'GROUP BY, HAVING, SELECT, puis ORDER BY et LIMIT. Ce n’est pas une promesse d’exécution ' +
          'physique : l’optimiseur choisit un plan équivalent.</p>',
          '<p>Exemple récapitulatif du parc : « les deux moteurs les plus répandus parmi les voitures de ' +
          'moins de 30 millions, avec leur prix moyen » :</p>',
          '<pre><code>SELECT moteur, COUNT(*) AS nb, AVG(pxachat) AS prix_moyen\n' +
          'FROM Voiture\n' +
          'WHERE pxachat &lt; 30000000\n' +
          'GROUP BY moteur\n' +
          'ORDER BY nb DESC\n' +
          'LIMIT 2;</code></pre>',
          box('tech', 'Vérifier dans le simulateur', 'terminal',
            '    <p>Chaque requête de ce chapitre s’exécute dans la page <a href="../atelier.html">atelier — ' +
            'simulateur SQL</a> : le jeu de données parc_auto y est chargé, et le résultat s’affiche en ' +
            'tableau. Une clause WHERE placée après GROUP BY provoque une erreur de syntaxe ; une ' +
            'colonne hors GROUP BY, en revanche, peut être acceptée par SQLite sans résultat déterministe.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que renvoie une fonction d’agrégation ?', opts: ['Une colonne', 'Une seule valeur (ou une par groupe)', 'Une table'], correct: 1, exp: 'Elle résume une colonne : une valeur totale, ou une par groupe avec GROUP BY.' },
      { stem: 'Dans un jeu hypothétique de 34 voitures dont 9 dates sont NULL, COUNT(datecirc) vaut…', opts: ['34', '25', '9'], correct: 1, exp: 'COUNT(colonne) ignore les NULL : 34 − 9 = 25. Ce jeu hypothétique diffère des 23 voitures initiales.' },
      { stem: 'Que compte COUNT(DISTINCT marque) ?', opts: ['Toutes les lignes', 'Les marques distinctes', 'Les marques NULL'], correct: 1, exp: 'DISTINCT élimine les doublons avant le comptage.' },
      { stem: 'En SQLite, que fait SELECT marque, immat, COUNT(*) FROM Voiture GROUP BY marque ?', opts: ['SQLite le refuse toujours', 'SQLite accepte et choisit une immatriculation du groupe sans garantir laquelle', 'SQLite choisit toujours la première immatriculation'], correct: 1, exp: 'SQLite accepte une colonne non regroupée et non agrégée ; sa valeur n’est pas déterministe. D’autres dialectes ou réglages peuvent la refuser.' },
      { stem: 'HAVING filtre…', opts: ['les lignes avant regroupement', 'les groupes après regroupement', 'les colonnes'], correct: 1, exp: 'WHERE filtre les lignes, HAVING filtre les groupes.' },
      { stem: 'Dans une même requête agrégée, où placer le filtre COUNT(*) > 2 ?', opts: ['Dans WHERE', 'Dans HAVING', 'Dans LIMIT'], correct: 1, exp: 'WHERE filtre les lignes avant le calcul de cet agrégat ; HAVING filtre les groupes après.' }
    ],

    pitfalls: [
      '<strong>Colonne affichée hors GROUP BY</strong> : SQLite peut l’accepter mais sa valeur peut être arbitraire.',
      '<strong>HAVING sans GROUP BY</strong> : en SQLite, il peut filtrer le groupe global d’une requête agrégée.',
      '<strong>COUNT(*) à la place de COUNT(colonne)</strong> : les NULL sont comptés à tort.',
      '<strong>Filtre de groupe mis dans WHERE</strong> : « HAVING COUNT(*) > 2 » ne s’écrit pas « WHERE COUNT(*) > 2 ».',
      '<strong>AVG sur une colonne textuelle</strong> : résultat sans sens — la moyenne d’un prix, oui ; d’une immatriculation, non.'
    ],

    methodTitle: 'Analyser une table par groupes',
    method: [
      '<strong>Traduire la question</strong> : quelle unité de compte (par marque, par moteur, par pays) ?',
      '<strong>Choisir l’agrégat</strong> : combien (COUNT), extrêmes (MIN/MAX), total (SUM), moyenne (AVG).',
      '<strong>Regrouper</strong> sur la colonne d’unité et n’afficher que regroupé ou agrégé.',
      '<strong>Filtrer au bon endroit</strong> : lignes dans WHERE, groupes dans HAVING.',
      '<strong>Présenter</strong> avec ORDER BY et LIMIT, puis contrôler les effectifs sur un cas connu.'
    ],

    summary: [
      'Cinq agrégats : COUNT, MIN, MAX, SUM, AVG — une valeur par table ou par groupe.',
      'COUNT(*) compte les lignes ; COUNT(colonne) ignore les NULL ; COUNT(DISTINCT …) dédoublonne.',
      'GROUP BY découpe en groupes ; pour un résultat déterministe, affichez les colonnes regroupées et les agrégats.',
      'HAVING filtre les groupes, ou le groupe global d’une requête agrégée SQLite ; WHERE filtre les lignes avant.',
      'Ordre logique : FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT ; le plan physique peut différer.'
    ],

    checklist: [
      'Je choisis le bon agrégat pour une question donnée.',
      'Je distingue COUNT(*), COUNT(colonne) et COUNT(DISTINCT colonne).',
      'J’écris un GROUP BY complet sans colonne hors regroupement.',
      'Je place WHERE et HAVING conformément à ce qu’ils filtrent.'
    ],

    notions: ['agrégation', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'GROUP BY', 'HAVING'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refaites les cinq agrégats sur Voiture dans le simulateur.' },
      { cls: 'mid', text: '50–69 % — Écrivez « nombre de voitures par moteur avec prix moyen » sans aide.' },
      { cls: 'good', text: '70–94 % — Solide : ajoute « seulement les moteurs avec au moins 2 voitures ».' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 6, mises à jour et droits.' }
    ],

    flashcards: [
      { q: 'Que renvoie une fonction d’agrégation ?', a: 'Une valeur unique par table (sans GROUP BY) ou par groupe (avec).' },
      { q: 'Différence COUNT(*) / COUNT(colonne) ?', a: 'COUNT(*) compte toutes les lignes ; COUNT(colonne) saute les NULL.' },
      { q: 'Règle d’or du GROUP BY ?', a: 'Pour un résultat déterministe et portable, sélectionnez les colonnes regroupées et les agrégats ; SQLite accepte aussi des colonnes arbitraires.' },
      { q: 'WHERE ou HAVING ?', a: 'WHERE filtre les lignes ; HAVING filtre les groupes et peut aussi filtrer le groupe global d’une requête agrégée SQLite.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'Modifier les données et gérer les droits',
    short: 'UPDATE et droits',
    toc: 'UPDATE, DELETE, ALTER, utilisateurs et CREATE USER, privilèges GRANT et REVOKE, GRANT OPTION.',
    time: '≈ 2 h 30 de travail',

    situation:
      'Le parc évolue : une voiture change de moteur, une autre est vendue, une colonne kilométrage ' +
      'doit être ajoutée. Et surtout, le club recrute : un gestionnaire qui peut consulter mais pas ' +
      'effacer, un admin qui hérite de tout. Un SGBD digne de ce nom ne se contente pas de lire : il ' +
      '<strong>modifie sous contrôle</strong> et <strong>répartit les droits</strong>.',

    objectives: [
      'modifier des lignes avec UPDATE et les supprimer avec DELETE, toujours avec WHERE ;',
      'faire évoluer une structure avec ALTER TABLE ;',
      'créer des utilisateurs et leur accorder des privilèges gradués ;',
      'comprendre le rôle du privilège GRANT OPTION et de REVOKE.'
    ],

    sections: [
      {
        title: 'UPDATE : modifier sous condition',
        html: [
          '<p>La syntaxe porte trois informations : quelle table, quelles colonnes changent, quelles ' +
          'lignes. Ce modèle utilise des noms à remplacer : il ne s’exécute pas tel quel.</p>',
          '<pre><code>UPDATE nom_table\n' +
          'SET colonne1 = valeur1, colonne2 = valeur2\n' +
          'WHERE condition;</code></pre>',
          '<p>Exemple exécutable sur le parc initial :</p>',
          '<pre><code>' +
          'UPDATE Voiture SET codemarque = \'TOY\' WHERE marque = \'TOYOTA\';\n' +
          'UPDATE Voiture SET codemarque = \'BMW\' WHERE marque = \'BMW\';</code></pre>',
          '<p>Le <code>WHERE</code> n’est pas décoratif : c’est lui qui limite la modification aux lignes ' +
          'visées. Dans le simulateur SQLite, un UPDATE sans WHERE s’applique à toutes les lignes, ' +
          'sans confirmation. Certains outils peuvent proposer une protection configurable ; ' +
          'ne supposez pas qu’elle est active. Les deux instructions ci-dessus réaffectent des codes ' +
          'déjà corrects dans la base initiale.</p>',
          box('pitfall', 'Piège — le UPDATE sans WHERE', 'warning',
            '    <p><code>UPDATE Voiture SET moteur = \'DIESEL\';</code> sans WHERE s’applique à ' +
            '<strong>toutes</strong> les lignes : 23 voitures passées au diesel en une requête. Toute ' +
            'modification sérieuse se prépare par le SELECT équivalent : il montre les lignes visées ' +
            'si les données restent inchangées. Contraintes, déclencheurs ou accès concurrents peuvent ' +
            'ensuite modifier le résultat ou provoquer un échec.</p>')
        ].join('\n')
      },
      {
        title: 'DELETE et ALTER',
        html: [
          '<p>La suppression suit le même principe : une table, une condition.</p>',
          '<pre><code>DELETE FROM Voiture WHERE immat = \'TG-7854-Z\';\n' +
          'DELETE FROM Voiture;        -- VIDE TOUTE LA TABLE, ligne par ligne</code></pre>',
          '<p>Le DELETE sans WHERE ne supprime pas la table : il la <strong>vide</strong>. La structure ' +
          'reste ; seule la commande <code>DROP TABLE</code> fait disparaître la table elle-même.</p>',
          '<p>La structure évolue par <code>ALTER TABLE</code> :</p>',
          '<pre><code>ALTER TABLE Voiture ADD COLUMN commentaire TEXT;\n' +
          'ALTER TABLE Voiture DROP COLUMN commentaire;</code></pre>',
          '<p>SQLite permet ces opérations sous certaines conditions ; une colonne utilisée par une ' +
          'contrainte, par exemple, peut empêcher sa suppression. Le chapitre 2 a déjà montré ' +
          '<code>ADD COLUMN</code> avec un DEFAULT.</p>',
          box('tech', 'Différence de dialecte : changement de type', 'terminal',
            '    <p>Le support MySQL utilise la forme suivante pour changer un type. Elle ne fonctionne ' +
            'pas dans le simulateur SQLite ; une modification de type y nécessite généralement de ' +
            'reconstruire la table en préservant ses données et contraintes.</p>\n' +
            '    <pre><code>ALTER TABLE Voiture MODIFY COLUMN km BIGINT;</code></pre>')
        ].join('\n')
      },
      {
        title: 'Utilisateurs : CREATE USER et l’hôte',
        html: [
          '<p>Cette section décrit MySQL, pas le simulateur SQLite, qui ne gère pas ces comptes. ' +
          'On ne se connecte pas « à MySQL » en général : on s’y connecte <strong>en tant qu’un ' +
          'utilisateur</strong>, défini par un <strong>login</strong> et un <strong>hôte</strong> — ' +
          'l’adresse depuis laquelle la connexion est autorisée :</p>',
          '<pre><code>CREATE USER \'login\'@\'hote\' [IDENTIFIED BY \'mot_de_passe\'];\n' +
          'DROP   USER \'login\'@\'hote\';\n' +
          '\n' +
          'CREATE USER \'delegueITB1\'@\'localhost\' IDENTIFIED BY \'wincrafts@Big\';\n' +
          'CREATE USER \'profside\'@\'192.168.66.9\' IDENTIFIED BY \'vivinve3\';</code></pre>',
          '<p>Dans MySQL 8.4, le joker <code>%</code> peut élargir le motif d’hôte. Les jokers ' +
          'dans les hôtes sont toutefois dépréciés : privilégiez des hôtes explicites et vérifiez ' +
          'les réglages du serveur.</p>',
          '<table>\n' +
          '    <tr><th>Utilisateur déclaré</th><th>Exemple de motif d’hôte</th></tr>\n' +
          '    <tr><td>\'leader\'@\'192.168.66.%\'</td><td>toute IP commençant par 192.168.66.</td></tr>\n' +
          '    <tr><td>\'youssoufa\'@\'%.camer.net\'</td><td>n’importe quel hôte du domaine camer.net</td></tr>\n' +
          '    <tr><td>\'yeslows\'@\'%\'</td><td>n’importe quel hôte (équivalent à \'yeslows\')</td></tr>\n' +
          '  </table>',
          '<p>Les guillemets entourent indépendamment login et hôte — jamais l’ensemble ' +
          '<code>\'login@hote\'</code>. Sans précision, la partie hôte vaut <code>%</code> ; ' +
          'préférez la préciser explicitement.</p>',
          box('mnemo', 'Mnémotechnique — « login@hôte : deux clés, une porte »', 'pin',
            '    <p>Le login dit <strong>qui</strong> entre, l’hôte dit <strong>d’où</strong>. Le même login ' +
            'peut exister en plusieurs exemplaires aux privilèges différents selon l’hôte — deux clés ' +
            'distinctes pour deux portes distinctes.</p>')
        ].join('\n')
      },
      {
        title: 'Privilèges : GRANT et REVOKE',
        html: [
          '<p>Un utilisateur MySQL nouvellement créé n’a <strong>aucun privilège</strong> par défaut ; ' +
          'sa connexion dépend aussi de son authentification. Un ' +
          'privilège est l’autorisation d’effectuer une action sur un objet, accordée par ' +
          '<code>GRANT</code> et retirée par <code>REVOKE</code> :</p>',
          '<pre><code>-- tous les droits sur une base :\n' +
          'GRANT ALL PRIVILEGES ON parc_auto.* TO \'IT_B1\'@\'localhost\';\n' +
          '\n' +
          '-- consultation seule :\n' +
          'GRANT SELECT ON parc_auto.* TO \'delegueITB1\'@\'localhost\';\n' +
          '\n' +
          '-- écriture limitée à une table :\n' +
          'GRANT SELECT, INSERT, UPDATE ON parc_auto.Voiture TO \'gestionnaire\'@\'localhost\';\n' +
          '\n' +
          '-- retirer :\n' +
          'REVOKE UPDATE ON parc_auto.Voiture FROM \'gestionnaire\'@\'localhost\';</code></pre>',
          '<p>Les privilèges s’appliquent à plusieurs <strong>niveaux</strong> : global (<code>*.*</code>), ' +
          'base (<code>parc_auto.*</code>), table (<code>parc_auto.Voiture</code>), voire colonne. Parmi les ' +
          'privilèges particuliers : <code>ALL</code> (tous, s’emploie seul), <code>USAGE</code> (aucun ' +
          'droit, toujours global) et <code>GRANT OPTION</code>.</p>',
          '<pre><code>GRANT SELECT, UPDATE ON parc_auto.*\n' +
          'TO \'admincdp\'@\'localhost\'\n' +
          'WITH GRANT OPTION;</code></pre>',
          '<p><code>GRANT OPTION</code> autorise son détenteur à <strong>transmettre</strong> les ' +
          'privilèges qu’il possède à d’autres utilisateurs ; il n’est pas compris dans ALL. Sans autre ' +
          'privilège administratif, il doit posséder les privilèges accordés. Certains privilèges ' +
          'administratifs supplémentaires constituent une exception. C’est la règle de sécurité du ' +
          'support : la délégation se contrôle, sinon chaque utilisateur pourrait créer sa hiérarchie ' +
          'de droits.</p>',
          box('pitfall', 'Piège — ALL et GRANT OPTION ensemble', 'warning',
            '    <p><code>GRANT ALL, GRANT OPTION ON …</code> est refusé : ALL s’emploie seul. Pour donner ' +
            'tout <strong>et</strong> le droit de transmettre, la forme est <code>GRANT ALL PRIVILEGES ON … ' +
            'TO … WITH GRANT OPTION</code>. La distinction est tombée en QCM du support.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que fait UPDATE sans clause WHERE ?', opts: ['Rien', 'Il modifie toutes les lignes de la table', 'Il modifie la première ligne'], correct: 1, exp: 'Sans condition, la modification s’applique à toute la table.' },
      { stem: 'DELETE FROM Voiture; (sans WHERE)…', opts: ['supprime la table', 'vide la table de ses lignes', 'est une erreur'], correct: 1, exp: 'La structure reste ; seule DROP TABLE supprime la table.' },
      { stem: 'Quelle commande ajoute une colonne à une table existante ?', opts: ['UPDATE', 'ALTER TABLE … ADD COLUMN', 'INSERT'], correct: 1, exp: 'ALTER TABLE fait évoluer la structure.' },
      { stem: 'En MySQL, un compte nouvellement créé avant tout GRANT possède…', opts: ['le droit de lire toutes les bases', 'aucun privilège par défaut', 'le droit de créer des tables'], correct: 1, exp: 'Le compte ne reçoit aucun privilège par défaut ; la connexion dépend aussi de l’authentification.' },
      { stem: 'En MySQL 8.4 avec le joker actif, \'leader\'@\'192.168.66.%\' désigne…', opts: ['un hôte uniquement : 192.168.66.9', 'un motif d’hôte commençant par 192.168.66.', 'un joker sur le login'], correct: 1, exp: '% élargit le motif d’hôte ; cet usage est déprécié dans MySQL 8.4.' },
      { stem: 'En MySQL, GRANT OPTION permet de…', opts: ['tout faire sur la base', 'transmettre à d’autres les privilèges qu’on possède', 'créer des utilisateurs sans mot de passe'], correct: 1, exp: 'C’est le droit de déléguer — jamais inclus dans ALL.' }
    ],

    pitfalls: [
      '<strong>UPDATE ou DELETE sans WHERE</strong> : toute la table est touchée — tester par le SELECT équivalent d’abord.',
      '<strong>DROP TABLE confondu avec DELETE</strong> : l’un efface la structure, l’autre les lignes.',
      '<strong>\'login@hote\' quoté en un seul bloc</strong> : login et hôte se quotent séparément.',
      '<strong>GRANT ALL, GRANT OPTION</strong> : syntaxe refusée — la clause est WITH GRANT OPTION.',
      '<strong>Accorder plus qu’on possède</strong> : GRANT OPTION seul ne le permet pas ; des privilèges administratifs supplémentaires peuvent faire exception.'
    ],

    methodTitle: 'Modifier ou déléguer sans casse',
    method: [
      '<strong>Écrire le SELECT équivalent</strong> avant tout UPDATE/DELETE pour repérer les lignes visées ; tenir compte des changements concurrents et des contraintes.',
      '<strong>Modifier les données</strong> (UPDATE/DELETE) sans confondre avec la structure (ALTER/DROP).',
      '<strong>Créer l’utilisateur</strong> avec son couple login@hôte exact.',
      '<strong>Accorder le minimum nécessaire</strong> : SELECT pour consulter, pas ALL par confort.',
      '<strong>Documenter les délégations</strong> : chaque WITH GRANT OPTION est une décision, pas un réflexe.'
    ],

    summary: [
      'UPDATE … SET … WHERE modifie ; DELETE FROM … WHERE supprime ; sans WHERE, c’est toute la table.',
      'ALTER TABLE fait évoluer la structure ; DROP TABLE la supprime ; DELETE la vide seulement.',
      'En MySQL, un utilisateur = login@hôte ; le joker % est déprécié dans l’hôte ; guillemets séparés.',
      'En MySQL, GRANT accorde, REVOKE retire ; niveaux global, base, table, colonne ; un nouveau compte n’a aucun privilège par défaut.',
      'GRANT OPTION autorise la transmission des privilèges propres ; ALL s’emploie seul, avec WITH GRANT OPTION.'
    ],

    checklist: [
      'Je teste chaque modification par le SELECT équivalent avant de l’exécuter.',
      'Je distingue DELETE, DROP TABLE et TRUNCATE sur une table.',
      'Je crée un utilisateur login@hôte et je lui accorde le minimum.',
      'J’explique GRANT OPTION et sa syntaxe exacte avec ALL.'
    ],

    notions: ['UPDATE', 'DELETE', 'DROP TABLE', 'ALTER TABLE', 'CREATE USER', 'hôte', 'GRANT', 'REVOKE', 'GRANT OPTION', 'privilège'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Relis les syntaxes UPDATE/DELETE et réécrivez-les de mémoire.' },
      { cls: 'mid', text: '50–69 % — Vérifiez les codes de marque puis essayez un UPDATE ciblé dans le simulateur.' },
      { cls: 'good', text: '70–94 % — Solide : écris le GRANT d’un gestionnaire qui lit tout mais n’écrit que Voiture.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : attaque les examens blancs du simulateur.' }
    ],

    flashcards: [
      { q: 'Pourquoi tester par SELECT avant un UPDATE ?', a: 'Le même WHERE montre les lignes visées si la base ne change pas ; contraintes ou déclencheurs peuvent ensuite modifier le résultat.' },
      { q: 'DELETE sans WHERE, effet ?', a: 'La table est vidée de ses lignes ; la structure reste (contrairement à DROP TABLE).' },
      { q: 'Comment définit-on un utilisateur MySQL ?', a: 'Par un couple login@hôte ; le joker % élargit l’hôte, mais cet usage est déprécié en MySQL 8.4.' },
      { q: 'Que permet GRANT OPTION en MySQL ?', a: 'De transmettre à d’autres les privilèges qu’on possède — avec WITH GRANT OPTION dans la clause.' }
    ]
  }
];

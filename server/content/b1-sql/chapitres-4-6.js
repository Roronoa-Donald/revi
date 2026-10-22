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
      'voitures japonaises dans le parc ? » traverse les deux. La jointure est l’opération qui assemble ' +
      'temporairement les tables autour de leur point de passage : la marque. Une fois le principe vu, ' +
      'les questions à deux tables ne coûtent pas plus cher que les autres.',

    objectives: [
      'expliquer ce que produit une jointure : une table virtuelle assemblée ;',
      'écrire une jointure interne avec JOIN…ON et sans JOIN (virgules + WHERE) ;',
      'choisir entre INNER JOIN et LEFT JOIN selon la question ;',
      'utiliser des alias de tables pour écrire des requêtes lisibles.'
    ],

    sections: [
      {
        title: 'Le principe : une table virtuelle',
        html: [
          '<p>Joindre deux tables, c’est construire une <strong>table virtuelle et temporaire</strong> qui ' +
          'reprend les lignes des deux, appariées par la condition de jointure. Le SGBD combine chaque ' +
          'ligne de la première avec chaque ligne de la seconde, puis ne garde que les combinaisons qui ' +
          'satisfont la condition.</p>',
          '<pre><code>Marque (un extrait)          Voiture (un extrait)\n' +
          'code   nommarque             immat       marque\n' +
          'TOY    TOYOTA                TG-3733-AC  TOYOTA\n' +
          'BMW    BMW                   TG-5420-AL  BMW\n' +
          'REN    RENAULT               TG-2222-BC  RENAULT\n' +
          '\n' +
          'jointure sur  nommarque = marque\n' +
          '→ TG-3733-AC  TOYOTA   TOYOTA   JAPON\n' +
          '→ TG-5420-AL  BMW      BMW      ALLEMAGNE\n' +
          '→ TG-2222-BC  RENAULT  RENAULT  FRANCE</code></pre>',
          '<p>La condition de jointure se repère dans le schéma : quelle colonne d’une table désigne la ' +
          'même réalité qu’une colonne de l’autre ? Ici <code>Marque.nommarque = Voiture.marque</code> — ' +
          'après normalisation, le support remplacerait ce doublon par la clé <code>codemarque</code>.</p>',
          box('mnemo', 'Mnémotechnique — « Le pont a deux rives »', 'pin',
            '    <p>Une jointure sans <strong>ON</strong> n’existe pas : la condition est le pont. Si le ' +
            'résultat paraît démultiplié (des centaines de lignes pour deux petites tables), la condition ' +
            'est absente ou fausse — le SGBD a alors apparié toutes les lignes avec toutes.</p>')
        ].join('\n')
      },
      {
        title: 'Jointure sans JOIN, puis INNER JOIN',
        html: [
          '<p>La forme historique liste les tables séparées par des virgules et met la condition dans le ' +
          '<code>WHERE</code> :</p>',
          '<pre><code>SELECT V.immat, M.nommarque, M.paysmarque\n' +
          'FROM Voiture V, Marque M\n' +
          'WHERE V.marque = M.nommarque;</code></pre>',
          '<p>La forme moderne — celle du support et des normes — passe par <code>JOIN…ON</code> :</p>',
          '<pre><code>SELECT V.immat, M.nommarque, M.paysmarque\n' +
          'FROM Voiture V\n' +
          'INNER JOIN Marque M ON V.marque = M.nommarque;\n' +
          '\n' +
          '-- les clauses habituelles restent en place :\n' +
          'SELECT V.immat, V.marque\n' +
          'FROM Voiture V\n' +
          'INNER JOIN Marque M ON V.marque = M.nommarque\n' +
          'WHERE M.paysmarque = \'JAPON\'\n' +
          'ORDER BY V.immat;</code></pre>',
          '<p><code>INNER</code> est facultatif — <code>JOIN</code> seul signifie déjà jointure interne. ' +
          'La jointure interne ne retient que les lignes ayant <strong>une correspondance des deux ' +
          'côtés</strong> : une marque sans voiture du parc disparaît du résultat.</p>',
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
          'LEFT JOIN Voiture V ON V.marque = M.nommarque\n' +
          'GROUP BY M.nommarque\n' +
          'ORDER BY nb DESC, M.nommarque;</code></pre>',
          '<p>Le détail qui compte : compter <code>V.immat</code> et non <code>*</code>. Pour une marque ' +
          'sans voiture, <code>V.immat</code> vaut NULL et n’est pas compté — le total est juste (0), là ' +
          'où <code>COUNT(*)</code> compterait 1 (la ligne conjuguée à NULL existe dans la jointure).</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Lignes retenues</th></tr>\n' +
          '    <tr><td>INNER JOIN</td><td>uniquement les correspondances des deux côtés</td></tr>\n' +
          '    <tr><td>LEFT JOIN</td><td>toutes les lignes de gauche, NULL à droite si absence</td></tr>\n' +
          '    <tr><td>RIGHT JOIN</td><td>symétrique : toutes les lignes de droite</td></tr>\n' +
          '  </table>'
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
            'dans Marque et dans Voiture normalisée), écrire la colonne sans préfixe est une erreur : ' +
            '« ambiguous column ». <strong>Toujours préfixer par l’alias</strong> : M.codemarque, V.codemarque.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que produit une jointure de deux tables ?', opts: ['Une copie des deux tables', 'Une table virtuelle appariée par la condition', 'Une fusion permanente'], correct: 1, exp: 'Temporaire et virtuelle : le résultat d’une requête n’altère rien.' },
      { stem: 'Que retient une jointure interne ?', opts: ['Toutes les lignes des deux tables', 'Uniquement les correspondances des deux côtés', 'Les lignes de la première table'], correct: 1, exp: 'Sans correspondance, la ligne conjuguée n’existe pas.' },
      { stem: 'Quelle jointure garde les marques sans voiture ?', opts: ['INNER JOIN', 'LEFT JOIN (Marque à gauche)', 'Aucune'], correct: 1, exp: 'LEFT JOIN garde toute la table de gauche, complétée de NULL.' },
      { stem: 'Dans une LEFT JOIN, pourquoi COUNT(V.immat) plutôt que COUNT(*) ?', opts: ['C’est plus rapide', 'COUNT(V.immat) ignore les NULL : les marques sans voiture comptent 0', 'COUNT(*) est interdit en jointure'], correct: 1, exp: 'COUNT(colonne) ne compte que les non-NULL ; COUNT(*) compterait la ligne conjuguée.' },
      { stem: 'Que vaut l’erreur « ambiguous column » ?', opts: ['Une colonne mal typée', 'Une colonne nommée sans préfixe alors que deux tables jointes la portent', 'Une colonne NULL'], correct: 1, exp: 'Il faut préfixer par l’alias : M.codemarque ou V.codemarque.' },
      { stem: 'Une table aliasée en M peut encore s’écrire Marque dans la même requête ?', opts: ['Oui', 'Non, l’alias remplace le nom partout', 'Seulement dans le SELECT'], correct: 1, exp: 'Une fois déclarée, seule la forme aliasée est valide.' }
    ],

    pitfalls: [
      '<strong>Condition de jointure oubliée</strong> : produit cartésien, des milliers de lignes absurdes.',
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
      'Une jointure assemble une table virtuelle autour d’une condition ON exacte.',
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
      { q: 'Que construit une jointure ?', a: 'Une table virtuelle et temporaire, appariée par la condition ON.' },
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
          '    <tr><td>COUNT(colonne)</td><td>lignes où la colonne n’est pas NULL</td><td>immatriculées : 23</td></tr>\n' +
          '    <tr><td>MIN / MAX</td><td>plus petite / plus grande valeur</td><td>prix de 6 M à 50 M</td></tr>\n' +
          '    <tr><td>SUM</td><td>somme des valeurs</td><td>budget total : 613,8 M</td></tr>\n' +
          '    <tr><td>AVG</td><td>moyenne des valeurs</td><td>kilométrage moyen : 1 840,65</td></tr>\n' +
          '  </table>',
          '<p><code>MIN</code> et <code>MAX</code> ne sont pas réservés aux nombres : sur des chaînes ils ' +
          'renvoient la première et la dernière dans l’ordre alphabétique, sur des dates la plus ancienne ' +
          'et la plus récente — <code>MIN(immat), MAX(datecirc)</code> sont des requêtes légales.</p>',
          box('pitfall', 'Piège — COUNT(*) vs COUNT(colonne)', 'warning',
            '    <p><code>COUNT(*)</code> compte <strong>toutes</strong> les lignes ; ' +
            '<code>COUNT(colonne)</code> saute celles où la colonne vaut NULL. Sur le support : « 25 voitures ' +
            'immatriculées sur 34 » — les 9 sans immatriculation existent dans COUNT(*) et disparaissent de ' +
            'COUNT(immat). Choisir l’un ou l’autre, c’est répondre à deux questions différentes.</p>')
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
          'et rien d’autre. C’est la règle qui surprend : <strong>toute colonne du SELECT doit être dans ' +
          'le GROUP BY ou dans un agrégat</strong>. <code>SELECT marque, immat … GROUP BY marque</code> est ' +
          'rejeté : quelle immatriculation choisir pour le groupe ?</p>',
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
          '<p>HAVING ne peut exister qu’après un GROUP BY, et son critère porte sur une fonction ' +
          'd’agrégation. La séquence d’exécution du SGBD l’explique : lignes filtrées (WHERE), puis ' +
          'regroupées (GROUP BY), puis groupes filtrés (HAVING), puis tri (ORDER BY).</p>',
          box('intuition', 'WHERE ou HAVING : la question à se poser', 'compass',
            '    <p>« Seulement les diesels » parle des <strong>lignes</strong> : WHERE. « Seulement les ' +
            'marques avec au moins 3 voitures » parle des <strong>groupes</strong> : HAVING. Une condition ' +
            'qui contient un agrégat (COUNT, AVG…) ne peut jamais vivre dans WHERE.</p>')
        ].join('\n')
      },
      {
        title: 'L’ordre complet, une dernière fois',
        html: [
          '<p>Toutes les clauses du cours se combinent dans cet ordre — qui est aussi l’ordre d’exécution ' +
          'du SGBD :</p>',
          '<pre><code>SELECT   colonnes, agrégats\n' +
          'FROM     tables (jointures éventuelles)\n' +
          'WHERE    filtre les LIGNES\n' +
          'GROUP BY découpe en GROUPES\n' +
          'HAVING   filtre les GROUPES\n' +
          'ORDER BY trie le résultat\n' +
          'LIMIT    borne le nombre de lignes</code></pre>',
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
            'tableau. Déformer volontairement une clause (WHERE après GROUP BY, colonne hors GROUP BY) pour ' +
            'lire le message d’erreur est un excellent exercice.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que renvoie une fonction d’agrégation ?', opts: ['Une colonne', 'Une seule valeur (ou une par groupe)', 'Une table'], correct: 1, exp: 'Elle résume une colonne : une valeur totale, ou une par groupe avec GROUP BY.' },
      { stem: 'COUNT(immat) sur 34 lignes dont 9 immat NULL vaut…', opts: ['34', '25', '9'], correct: 1, exp: 'COUNT(colonne) ignore les NULL : 34 − 9 = 25.' },
      { stem: 'Que compte COUNT(DISTINCT marque) ?', opts: ['Toutes les lignes', 'Les marques distinctes', 'Les marques NULL'], correct: 1, exp: 'DISTINCT élimine les doublons avant le comptage.' },
      { stem: 'Dans SELECT marque, immat … GROUP BY marque, que se passe-t-il ?', opts: ['Tout marche', 'Erreur : immat n’est ni regroupé ni agrégé', 'immat prend la première valeur'], correct: 1, exp: 'Toute colonne du SELECT doit être dans le GROUP BY ou agrégée.' },
      { stem: 'HAVING filtre…', opts: ['les lignes avant regroupement', 'les groupes après regroupement', 'les colonnes'], correct: 1, exp: 'WHERE filtre les lignes, HAVING filtre les groupes.' },
      { stem: 'Une condition avec COUNT(*) peut-elle vivre dans WHERE ?', opts: ['Oui', 'Non, seulement dans HAVING', 'Seulement avec LIMIT'], correct: 1, exp: 'Les agrégats ne sont calculés qu’au regroupement : HAVING uniquement.' }
    ],

    pitfalls: [
      '<strong>Colonne affichée hors GROUP BY</strong> : erreur immédiate du SGBD.',
      '<strong>HAVING sans GROUP BY</strong> : la clause est rejetée.',
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
      'GROUP BY découpe en groupes ; toute colonne affichée y figure ou est agrégée.',
      'HAVING filtre les groupes (condition avec agrégat) ; WHERE filtre les lignes avant.',
      'Ordre d’exécution : FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT.'
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
      { q: 'Règle d’or du GROUP BY ?', a: 'Toute colonne du SELECT est dans le GROUP BY ou dans un agrégat.' },
      { q: 'WHERE ou HAVING ?', a: 'WHERE filtre les lignes avant regroupement ; HAVING filtre les groupes, avec un agrégat.' }
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
          'lignes :</p>',
          '<pre><code>UPDATE nom_table\n' +
          'SET colonne1 = valeur1, colonne2 = valeur2\n' +
          'WHERE condition;\n' +
          '\n' +
          '-- le support normalise les codes de marque :\n' +
          'UPDATE Voiture SET codemarque = \'TOY\' WHERE marque = \'TOYOTA\';\n' +
          'UPDATE Voiture SET codemarque = \'BMW\' WHERE marque = \'BMW\';</code></pre>',
          '<p>Le <code>WHERE</code> n’est pas décoratif : c’est lui qui limite la modification aux lignes ' +
          'visées. Le support le rappelle en marge de ses exemples — et le SGBD se protège un peu : en ' +
          'mode par défaut prudent, un UPDATE sans WHERE est rejeté ou demande confirmation.</p>',
          box('pitfall', 'Piège — le UPDATE sans WHERE', 'warning',
            '    <p><code>UPDATE Voiture SET moteur = \'DIESEL\';</code> sans WHERE s’applique à ' +
            '<strong>toutes</strong> les lignes : 23 voitures passées au diesel en une requête. Toute ' +
            'modification sérieuse se teste d’abord par le SELECT équivalent — si le SELECT ramène les ' +
            'bonnes lignes, l’UPDATE avec le même WHERE les modifiera.</p>')
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
          '<pre><code>ALTER TABLE Voiture ADD COLUMN comment VARCHAR(100);\n' +
          'ALTER TABLE Marque DROP COLUMN paysmarque;   -- l’opération du support avant normalisation\n' +
          'ALTER TABLE Voiture MODIFY COLUMN km BIGINT;</code></pre>',
          '<p>Ajouter, supprimer, changer un type : ALTER est la commande d’évolution du schéma — elle ' +
          's’accompagne d’une réflexion sur les données existantes, qui doivent rester cohérentes avec ' +
          'la nouvelle structure.</p>'
        ].join('\n')
      },
      {
        title: 'Utilisateurs : CREATE USER et l’hôte',
        html: [
          '<p>On ne se connecte pas « à MySQL » en général : on s’y connecte <strong>en tant qu’un ' +
          'utilisateur</strong>, défini par un <strong>login</strong> et un <strong>hôte</strong> — ' +
          'l’adresse depuis laquelle la connexion est autorisée :</p>',
          '<pre><code>CREATE USER \'login\'@\'hote\' [IDENTIFIED BY \'mot_de_passe\'];\n' +
          'DROP   USER \'login\'@\'hote\';\n' +
          '\n' +
          'CREATE USER \'delegueITB1\'@\'localhost\' IDENTIFIED BY \'wincrafts@Big\';\n' +
          'CREATE USER \'profside\'@\'192.168.66.9\' IDENTIFIED BY \'vivinve3\';</code></pre>',
          '<p>Le joker <code>%</code> élargit l’hôte :</p>',
          '<table>\n' +
          '    <tr><th>Utilisateur déclaré</th><th>Connexion autorisée depuis</th></tr>\n' +
          '    <tr><td>\'leader\'@\'192.168.66.%\'</td><td>toute IP commençant par 192.168.66.</td></tr>\n' +
          '    <tr><td>\'youssoufa\'@\'%.camer.net\'</td><td>n’importe quel hôte du domaine camer.net</td></tr>\n' +
          '    <tr><td>\'yeslows\'@\'%\'</td><td>n’importe quel hôte (équivalent à \'yeslows\')</td></tr>\n' +
          '  </table>',
          '<p>Les guillemets entourent indépendamment login et hôte — jamais l’ensemble ' +
          '<code>\'login@hote\'</code>. Sans précision d’hôte, c’est l’équivalent de <code>%</code> : ' +
          'tous les hôtes.</p>',
          box('mnemo', 'Mnémotechnique — « login@hôte : deux clés, une porte »', 'pin',
            '    <p>Le login dit <strong>qui</strong> entre, l’hôte dit <strong>d’où</strong>. Le même login ' +
            'peut exister en plusieurs exemplaires aux privilèges différents selon l’hôte — deux clés ' +
            'distinctes pour deux portes distinctes.</p>')
        ].join('\n')
      },
      {
        title: 'Privilèges : GRANT et REVOKE',
        html: [
          '<p>Un utilisateur créé n’a <strong>aucun privilège</strong> : il peut à peine se connecter. Un ' +
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
          'privilèges qu’il possède à d’autres utilisateurs — il n’est pas compris dans ALL, et un ' +
          'utilisateur ne peut jamais accorder plus qu’il ne possède. C’est la règle de sécurité du ' +
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
      { stem: 'Un utilisateur créé avec CREATE USER, avant tout GRANT, peut…', opts: ['lire toutes les bases', 'à peine se connecter', 'créer des tables'], correct: 1, exp: 'Aucun privilège : ni données ni création d’objets.' },
      { stem: '\'leader\'@\'192.168.66.%\' signifie…', opts: ['connexion uniquement depuis 192.168.66.9', 'connexion depuis toute adresse commençant par 192.168.66.', 'un joker sur le login'], correct: 1, exp: '% élargit l’hôte ; ici tout le réseau 192.168.66.x.' },
      { stem: 'GRANT OPTION permet de…', opts: ['tout faire sur la base', 'transmettre à d’autres les privilèges qu’on possède', 'créer des utilisateurs sans mot de passe'], correct: 1, exp: 'C’est le droit de déléguer — jamais inclus dans ALL.' }
    ],

    pitfalls: [
      '<strong>UPDATE ou DELETE sans WHERE</strong> : toute la table est touchée — tester par le SELECT équivalent d’abord.',
      '<strong>DROP TABLE confondu avec DELETE</strong> : l’un efface la structure, l’autre les lignes.',
      '<strong>\'login@hote\' quoté en un seul bloc</strong> : login et hôte se quotent séparément.',
      '<strong>GRANT ALL, GRANT OPTION</strong> : syntaxe refusée — la clause est WITH GRANT OPTION.',
      '<strong>Accorder plus qu’on possède</strong> : impossible ; un utilisateur transmet au maximum ses propres droits.'
    ],

    methodTitle: 'Modifier ou déléguer sans casse',
    method: [
      '<strong>Écrire le SELECT équivalent</strong> avant tout UPDATE/DELETE : les lignes ramenées sont celles qui seront touchées.',
      '<strong>Modifier les données</strong> (UPDATE/DELETE) sans confondre avec la structure (ALTER/DROP).',
      '<strong>Créer l’utilisateur</strong> avec son couple login@hôte exact.',
      '<strong>Accorder le minimum nécessaire</strong> : SELECT pour consulter, pas ALL par confort.',
      '<strong>Documenter les délégations</strong> : chaque WITH GRANT OPTION est une décision, pas un réflexe.'
    ],

    summary: [
      'UPDATE … SET … WHERE modifie ; DELETE FROM … WHERE supprime ; sans WHERE, c’est toute la table.',
      'ALTER TABLE fait évoluer la structure ; DROP TABLE la supprime ; DELETE la vide seulement.',
      'Un utilisateur = login@hôte ; le joker % élargit l’hôte ; guillemets séparés sur chaque partie.',
      'GRANT accorde, REVOKE retire ; niveaux global, base, table, colonne ; un utilisateur créé n’a aucun droit.',
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
      { cls: 'low', text: '&lt; 50 % — Relis les syntaxes UPDATE/DELETE et réécris-les de mémoire.' },
      { cls: 'mid', text: '50–69 % — Normalise les codes de marque par UPDATE dans le simulateur.' },
      { cls: 'good', text: '70–94 % — Solide : écris le GRANT d’un gestionnaire qui lit tout mais n’écrit que Voiture.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : attaque les examens blancs du simulateur.' }
    ],

    flashcards: [
      { q: 'Pourquoi tester par SELECT avant un UPDATE ?', a: 'Le même WHERE ramène exactement les lignes qui seront modifiées : on voit avant de toucher.' },
      { q: 'DELETE sans WHERE, effet ?', a: 'La table est vidée de ses lignes ; la structure reste (contrairement à DROP TABLE).' },
      { q: 'Comment définit-on un utilisateur MySQL ?', a: 'Par un couple login@hôte, le joker % élargissant l’hôte.' },
      { q: 'Que permet GRANT OPTION ?', a: 'De transmettre à d’autres les privilèges qu’on possède — avec WITH GRANT OPTION dans la clause.' }
    ]
  }
];

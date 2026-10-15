/**
 * Chapitres 1 à 3 du cours de bases de données & SQL B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Ce cours n'a pas d'atelier
 * de code : les exercices se font dans le simulateur SQL (page atelier.html).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 1 ==================== */
  {
    n: 1,
    title: 'Bases de données et SGBD',
    short: 'Bases de données',
    toc: 'Définition d’une base de données, fonctions, types de bases, SGBD et exemples, modèle relationnel.',
    time: '≈ 2 h de travail',
    free: true,

    situation:
      'Le club gère un parc de voitures : immatriculations, marques, moteurs, prix d’achat. Dans un ' +
      'classeur, retrouver « toutes les diesels mises en circulation avant 2015 » demande une heure de ' +
      'feuilletage ; dans une base de données, une requête d’une seconde. Ce premier chapitre nomme ' +
      'précisément les objets avant de les manipuler : une base de données n’est pas un tas de fichiers, ' +
      'et un SGBD n’est pas un tableur.',

    objectives: [
      'définir une base de données et la distinguer d’un simple ensemble de fichiers ;',
      'citer les fonctions d’une base de données et les types de bases ;',
      'expliquer le rôle d’un SGBD et en donner des exemples réels ;',
      'décrire le modèle relationnel : table, ligne, colonne, clé primaire et étrangère.'
    ],

    sections: [
      {
        title: 'Qu’est-ce qu’une base de données ?',
        html: [
          '<p><strong>Définition.</strong> Une <strong>base de données</strong> (BDD) est un ensemble ' +
          'd’informations organisé pour être accessible, géré et mis à jour facilement par ses ' +
          'utilisateurs. Les données y sont organisées en lignes, colonnes et tableaux, et indexées pour ' +
          'faciliter les recherches.</p>',
          '<p>La définition a deux exigences qui excluent le classeur et le fichier désordonné :</p>',
          '<ul>\n' +
          '    <li>les données doivent être <strong>indépendantes</strong> des programmes qui les utilisent ;</li>\n' +
          '    <li>elles doivent être <strong>interrogeables par le contenu</strong> : retrouver tous les ' +
          'objets qui satisfont un critère (« tous les produits à moins de 100 francs »), sur n’importe ' +
          'quel critère.</li>\n' +
          '  </ul>',
          '<p>Une base peut être <strong>locale</strong> (une machine, un utilisateur) ou ' +
          '<strong>répartie</strong> (machines distantes accessibles par le réseau). Son avantage majeur : ' +
          'plusieurs utilisateurs y accèdent simultanément, le système gérant la concurrence.</p>',
          box('pitfall', 'Piège — l’abus de langage', 'warning',
            '    <p>« On a mis les notes dans une base de données » désigne souvent un simple tableau dans ' +
            'un fichier. Pour mériter le terme, l’ensemble doit être <strong>interrogeable par le ' +
            'contenu</strong> et sa <strong>structure consultable</strong> (savoir qu’un produit possède un ' +
            'nom, un prix, une quantité). Un tableur partagé n’en est pas un.</p>')
        ].join('\n')
      },
      {
        title: 'Fonctions et types de bases de données',
        html: [
          '<p>La structure d’une base répond à des fonctions fondamentales :</p>',
          '<ul>\n' +
          '    <li><strong>stocker</strong> l’information de façon fiable et la restituer à l’identique ;</li>\n' +
          '    <li>traiter de <strong>grands volumes</strong> (massification) et <strong>rapidement</strong> (optimisation) ;</li>\n' +
          '    <li><strong>sécuriser</strong> les accès : autorisations selon les utilisateurs ;</li>\n' +
          '    <li><strong>contrôler la qualité</strong> : cohérence par rapport à un modèle préétabli ;</li>\n' +
          '    <li><strong>partager</strong> les données entre applications et métiers, y compris en réseau.</li>\n' +
          '  </ul>',
          '<p>Historiquement, trois familles se sont succédé :</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Principe</th></tr>\n' +
          '    <tr><td>Hiérarchique</td><td>arborescence : chaque enregistrement dépend d’un niveau supérieur</td></tr>\n' +
          '    <tr><td>Réseau</td><td>relations multiples entre données, par liens ou pointeurs</td></tr>\n' +
          '    <tr><td>Orientée objets</td><td>données stockées sous forme d’objets avec leurs attributs</td></tr>\n' +
          '  </table>',
          '<p>Le modèle dominant aujourd’hui — celui du cours — est le <strong>modèle relationnel</strong> : ' +
          'les données vivent dans des <strong>tables</strong> à lignes et colonnes, reliées entre elles par ' +
          'des valeurs partagées.</p>',
          box('mnemo', 'Mnémotechnique — « FIQSCP »', 'pin',
            '    <p>Retenir les six fonctions par ce qu’elles donnent à l’utilisateur : <strong>F</strong>iable, ' +
            '<strong>I</strong>mportant (volumes), <strong>Q</strong>uick (rapide), <strong>S</strong>ûr ' +
            '(sécurité), <strong>C</strong>ohérent (qualité), <strong>P</strong>artagé. Une base qui échoue ' +
            'sur une de ces six promesses n’est pas une base.</p>')
        ].join('\n')
      },
      {
        title: 'Le SGBD',
        html: [
          '<p>La base de données est le contenu ; le <strong>SGBD</strong> (système de gestion de base de ' +
          'données) est le logiciel qui la gère. Il permet d’insérer, de modifier et de rechercher ' +
          'efficacement des données dans une grande masse d’informations partagée par de multiples ' +
          'utilisateurs.</p>',
          '<p>Le SGBD rend le partage <strong>transparent</strong> : chaque utilisateur a l’illusion d’être ' +
          'seul à travailler. Il sépare la <strong>description</strong> des données (types, formats, ' +
          'caractéristiques) de leur <strong>utilisation</strong> (mise à jour, recherche) — c’est ce qui le ' +
          'distingue d’un système de fichiers, qui ne connaît pas la structure de ce qu’il stocke.</p>',
          '<table>\n' +
          '    <tr><th>SGBD</th><th>Particularité</th></tr>\n' +
          '    <tr><td>MySQL / MariaDB</td><td>très répandu pour le web, gratuit, c’est celui du support</td></tr>\n' +
          '    <tr><td>PostgreSQL</td><td>puissant et conforme aux normes, très utilisé en entreprise</td></tr>\n' +
          '    <tr><td>Oracle Database</td><td>historique des grandes organisations, commercial</td></tr>\n' +
          '    <tr><td>SQL Server</td><td>l’offre de Microsoft, intégrée à ses écosystèmes</td></tr>\n' +
          '    <tr><td>SQLite</td><td>embarqué, sans serveur — c’est le moteur du simulateur de ce cours</td></tr>\n' +
          '  </table>',
          '<p>Tous parlent <strong>SQL</strong> (Structured Query Language), le langage standard de ' +
          'l’interrogation : ce que tu apprends ici se rejoue à l’identique d’un SGBD à l’autre, aux ' +
          'détails de dialecte près.</p>',
          box('intuition', 'Base, SGBD, SQL : trois rôles', 'compass',
            '    <p>La <strong>base</strong> est le garde-meuble (les données rangées), le <strong>SGBD</strong> ' +
            'est le gardien (il range, contrôle, arbitre), <strong>SQL</strong> est la langue qu’on lui parle ' +
            'pour demander quelque chose. Confondre les trois est la faute de vocabulaire la plus pénalisée ' +
            'à l’examen.</p>')
        ].join('\n')
      },
      {
        title: 'Le modèle relationnel',
        html: [
          '<p>Dans le modèle relationnel, les données vivent dans des <strong>tables</strong> (le terme ' +
          'officiel est « relation ») : chaque <strong>ligne</strong> est un enregistrement, chaque ' +
          '<strong>colonne</strong> un attribut. Le support l’illustre avec un parc automobile :</p>',
          '<pre><code>Marque                                Voiture\n' +
          '+------+--------------+-----------+    +------------+--------------+---------+-------+\n' +
          '| code | nommarque    | pays      |    | immat      | marque       | moteur  | prix  |\n' +
          '+------+--------------+-----------+    +------------+--------------+---------+-------+\n' +
          '| TOY  | TOYOTA       | JAPON     |    | TG-7854-Z  | MERCEDES BENZ| DIESEL  | 6 M   |\n' +
          '| BMW  | BMW          | ALLEMAGNE |    | TG-3733-AC | TOYOTA       | HYBRIDE | 20 M  |\n' +
          '| REN  | RENAULT      | FRANCE    |    | TG-2222-BC | RENAULT      | DIESEL  | 15 M  |\n' +
          '+------+--------------+-----------+    +------------+--------------+---------+-------+</code></pre>',
          '<p>Deux clés structurent le tout :</p>',
          '<ul>\n' +
          '    <li>la <strong>clé primaire</strong> identifie sans ambiguïté chaque ligne : une immatriculation ' +
          'désigne exactement une voiture, jamais deux ;</li>\n' +
          '    <li>la <strong>clé étrangère</strong> relie une table à une autre : la colonne « marque » de ' +
          'Voiture pointe vers une ligne de Marque — c’est elle qui permet les jointures du chapitre 4.</li>\n' +
          '  </ul>',
          box('pitfall', 'Piège — valeur manquante ≠ valeur nulle', 'warning',
            '    <p>Une voiture du parc sans immatriculation (donnée inconnue) se note <code>NULL</code> : ' +
            'l’absence d’information est une information. Ne la remplace jamais par un zéro, une chaîne vide ' +
            'ou un tiret : ces trois-là sont des <em>valeurs</em>, et elles polluent les calculs — un prix ' +
            'moyen qui compte des zéros inventés est faux.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Qu’est-ce qui distingue une vraie base de données d’un fichier désordonné ?', opts: ['Le volume de données', 'L’interrogation par le contenu et une structure consultable', 'La présence de tableaux'], correct: 1, exp: 'Une base est interrogeable sur n’importe quel critère et sa structure est consultable.' },
      { stem: 'Que signifie SGBD ?', opts: ['Système de Gestion de Big Data', 'Système de Gestion de Base de Données', 'Serveur de Gestion de Blocs de Données'], correct: 1, exp: 'Le logiciel qui gère la base : insertion, modification, recherche, partage.' },
      { stem: 'Une clé primaire sert à…', opts: ['trier les lignes', 'identifier sans ambiguïté chaque ligne', 'relier deux tables entre elles'], correct: 1, exp: 'Identification unique ; relier deux tables est le rôle de la clé étrangère.' },
      { stem: 'Quel modèle domine les bases de données actuelles ?', opts: ['Hiérarchique', 'Réseau', 'Relationnel'], correct: 2, exp: 'Tables à lignes et colonnes reliées par des valeurs partagées.' },
      { stem: 'Que représente NULL dans une colonne ?', opts: ['Zéro', 'Une chaîne vide', 'L’absence d’information'], correct: 2, exp: 'NULL n’est ni 0 ni vide : c’est l’absence de valeur, une information en soi.' },
      { stem: 'Quel est le rôle du SGBD vis-à-vis du partage ?', opts: ['Il bloque les accès simultanés', 'Il rend le partage transparent', 'Il duplique la base par utilisateur'], correct: 1, exp: 'Chaque utilisateur a l’illusion d’être seul, le SGBD arbitre la concurrence.' }
    ],

    pitfalls: [
      '<strong>Base de données confondue avec un tableur</strong> : pas d’interrogation par le contenu, pas de structure décrite.',
      '<strong>SGBD confondu avec la base</strong> : le SGBD est le logiciel, la base est le contenu.',
      '<strong>NULL remplacé par 0 ou chaîne vide</strong> : les moyennes et les comptages deviennent faux.',
      '<strong>Clé primaire multi-usage</strong> : un numéro de téléphone n’identifie pas une personne de façon sûre.',
      '<strong>Clé étrangère sans correspondance</strong> : une voiture dont la marque n’existe pas dans Marque casse la cohérence.'
    ],

    methodTitle: 'Décrire une base avant d’écrire une requête',
    method: [
      '<strong>Identifier les tables</strong> : quels objets du monde réel (marques, voitures, élèves) ?',
      '<strong>Choisir les clés primaires</strong> : ce qui identifie une ligne sans ambiguïté.',
      '<strong>Déclarer les clés étrangères</strong> : quelles tables pointent vers lesquelles ?',
      '<strong>Documenter les colonnes</strong> : type, présence possible de NULL.',
      '<strong>Vérifier la cohérence</strong> : chaque clé étrangère a-t-elle sa correspondance ?'
    ],

    summary: [
      'Une base de données est interrogeable par le contenu et décrite séparément de son utilisation.',
      'Six fonctions : fiable, massif, rapide, sûr, cohérent, partagé.',
      'Le SGBD est le logiciel qui gère la base ; MySQL, PostgreSQL, Oracle, SQL Server et SQLite en sont des exemples.',
      'Modèle relationnel : tables, lignes, colonnes ; clé primaire pour identifier, clé étrangère pour relier.',
      'NULL signifie l’absence d’information : jamais 0, jamais chaîne vide.'
    ],

    checklist: [
      'Je définis une base de données sans confondre avec un tableur.',
      'Je cite les fonctions d’une base et trois SGBD réels.',
      'Je distingue clé primaire et clé étrangère sur un exemple.',
      'J’explique ce que NULL représente et pourquoi on ne le remplace jamais.'
    ],

    notions: ['base de données', 'SGBD', 'SQL', 'modèle relationnel', 'table', 'clé primaire', 'clé étrangère', 'NULL'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Relis les définitions et réécris-les avec tes mots.' },
      { cls: 'mid', text: '50–69 % — Refais le schéma Marque/Voiture en nommant toutes les clés.' },
      { cls: 'good', text: '70–89 % — Solide : explique le rôle du SGBD à quelqu’un d’autre.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, types et création de tables.' }
    ],

    flashcards: [
      { q: 'Définis une base de données.', a: 'Un ensemble d’informations organisé pour être accessible, géré et mis à jour facilement, interrogeable par le contenu.' },
      { q: 'Rôle du SGBD ?', a: 'Logiciel qui gère la base : insertion, modification, recherche, sécurité, partage transparent entre utilisateurs.' },
      { q: 'Clé primaire vs clé étrangère ?', a: 'La primaire identifie chaque ligne sans ambiguïté ; l’étrangère pointe vers une ligne d’une autre table.' },
      { q: 'Que vaut NULL ?', a: 'L’absence d’information — ni 0, ni chaîne vide, ni tiret.' }
    ]
  },

  /* ==================== Chapitre 2 ==================== */
  {
    n: 2,
    title: 'Types de données et création de tables',
    short: 'Types et tables',
    toc: 'Types numériques, chaînes CHAR et VARCHAR, types temporels, CREATE TABLE, INSERT, clés.',
    time: '≈ 2 h 30 de travail',

    situation:
      'La base du parc auto ne se remplit pas à la main : on la décrit d’abord. Chaque colonne reçoit un ' +
      'type — un entier, une chaîne, une date — et ce choix engage tout : la place en mémoire, les ' +
      'comparaisons possibles, les erreurs évitées. Déclarer « prix » en texte n’affiche pas d’erreur ' +
      'aujourd’hui, mais interdit toute moyenne demain.',

    objectives: [
      'choisir le type adapté pour une colonne : numérique, chaîne, temporel ;',
      'distinguer CHAR et VARCHAR et savoir quand préférer l’un ;',
      'écrire une instruction CREATE TABLE complète avec clés ;',
      'insérer des lignes avec INSERT et comprendre le rôle de NULL.'
    ],

    sections: [
      {
        title: 'Les types numériques',
        html: [
          '<p>Pour les entiers, MySQL propose une gamme de tailles croissantes :</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Plage (signé)</th><th>Usage typique</th></tr>\n' +
          '    <tr><td>TINYINT</td><td>−128 à 127</td><td>un âge, un petit compteur</td></tr>\n' +
          '    <tr><td>SMALLINT</td><td>≈ −32 700 à 32 700</td><td>une année, une quantité</td></tr>\n' +
          '    <tr><td>MEDIUMINT</td><td>≈ −8,4 M à 8,4 M</td><td>un identifiant interne</td></tr>\n' +
          '    <tr><td>INT</td><td>≈ −2,1 Md à 2,1 Md</td><td>un prix en francs, un kilométrage</td></tr>\n' +
          '    <tr><td>BIGINT</td><td>≈ ±9,2 × 10¹⁸</td><td>des identifiants mondiaux, des horodatages</td></tr>\n' +
          '  </table>',
          '<p>Deux précisions du support : la notation <code>INT(x)</code> ne change <strong>pas</strong> la ' +
          'capacité de stockage, seulement l’affichage (avec <code>ZEROFILL</code>, elle complète de zéros). ' +
          'Pour les décimaux, on utilise <code>DECIMAL(p, s)</code> — précision p, s décimales — pour l’argent, ' +
          'et <code>FLOAT</code>/<code>DOUBLE</code> pour les mesures scientifiques.</p>',
          box('pitfall', 'Piège — l’argent en FLOAT', 'warning',
            '    <p><code>FLOAT</code> et <code>DOUBLE</code> arrondissent par nature : une somme de prix peut ' +
            'y perdre un franc. Pour toute valeur monétaire, le type exact est <strong>DECIMAL</strong> — ' +
            'c’est le seul qui calcule en décimal exact, comme un humain pose l’addition.</p>')
        ].join('\n')
      },
      {
        title: 'CHAR et VARCHAR',
        html: [
          '<p>Les chaînes de longueur fixe ou variable s’écrivent avec un paramètre de taille :</p>',
          '<table>\n' +
          '    <tr><th>Stocké</th><th>CHAR(5)</th><th>VARCHAR(5)</th></tr>\n' +
          '    <tr><td>« OK »</td><td>« OK&nbsp;&nbsp;&nbsp; » (complété d’espaces)</td><td>« OK » (tel quel)</td></tr>\n' +
          '    <tr><td>Mémoire</td><td>toujours 5 caractères</td><td>le contenu + 1 octet de longueur</td></tr>\n' +
          '  </table>',
          '<p><strong>CHAR(x)</strong> réserve toujours x caractères et complète les plus courts d’espaces : ' +
          'il convient quand la longueur est constante — un code de marque sur trois lettres, un code postal. ' +
          '<strong>VARCHAR(x)</strong> stocke jusqu’à x caractères, sans remplissage : c’est le choix par ' +
          'défaut pour un nom, une adresse, un immatriculé.</p>',
          '<p>Le support cite aussi les grands textes (<code>TEXT</code>) et les binaires (<code>BLOB</code>) ' +
          'pour les contenus longs — un commentaire, une image stockée en base.</p>',
          box('mnemo', 'Mnémotechnique — « Fixe = CHAR, variable = VARCHAR »', 'pin',
            '    <p>Un code de pays à trois lettres naît et meurt à trois lettres : <strong>CHAR(3)</strong>. ' +
            'Un nom de famille va de une lettre à vingt : <strong>VARCHAR(20)</strong>. Se tromper ne casse ' +
            'rien, mais gaspille — et un CHAR qui complète d’espaces surprend les comparaisons.</p>')
        ].join('\n')
      },
      {
        title: 'Les types temporels',
        html: [
          '<p>Cinq types pour le temps en MySQL :</p>',
          '<table>\n' +
          '    <tr><th>Type</th><th>Contenu</th><th>Format littéral</th></tr>\n' +
          '    <tr><td>DATE</td><td>une date</td><td>\'AAAA-MM-JJ\'</td></tr>\n' +
          '    <tr><td>TIME</td><td>une heure</td><td>\'HH:MM:SS\'</td></tr>\n' +
          '    <tr><td>DATETIME</td><td>date et heure</td><td>\'AAAA-MM-JJ HH:MM:SS\'</td></tr>\n' +
          '    <tr><td>TIMESTAMP</td><td>date et heure (fuseau géré)</td><td>idem DATETIME</td></tr>\n' +
          '    <tr><td>YEAR</td><td>une année</td><td>\'AAAA\' ou AAAA</td></tr>\n' +
          '  </table>',
          '<p>Le format littéral n’est pas décoratif : <code>\'2014-11-21\'</code> est compris partout, mais ' +
          '<code>\'21/11/2014\'</code> est rejeté ou mal interprété selon le SGBD. On écrit toujours les ' +
          'dates en SQL <strong>année, mois, jour</strong>.</p>',
          '<p>Le parc auto du support utilise <code>DATETIME</code> pour la mise en circulation — d’où des ' +
          'valeurs comme <code>\'2000-01-21 08:00:00\'</code> — et des comparaisons directes sont possibles : ' +
          '<code>WHERE datecirc &lt; \'2015-01-01\'</code>.</p>'
        ].join('\n')
      },
      {
        title: 'CREATE TABLE et INSERT',
        html: [
          '<p>La description d’une table passe par <code>CREATE TABLE</code> : chaque colonne reçoit un nom, ' +
          'un type, et des contraintes optionnelles (<code>NOT NULL</code>, <code>PRIMARY KEY</code>).</p>',
          '<pre><code>CREATE TABLE IF NOT EXISTS Voiture (\n' +
          '    immat     VARCHAR(10) PRIMARY KEY,\n' +
          '    marque    VARCHAR(20) NOT NULL,\n' +
          '    moteur    VARCHAR(10) NOT NULL,\n' +
          '    datecirc  DATETIME,\n' +
          '    km        INT DEFAULT 0,\n' +
          '    pxachat   INT NOT NULL,\n' +
          '    nbreplace TINYINT NOT NULL\n' +
          ');</code></pre>',
          '<p>Les lignes arrivent ensuite par <code>INSERT INTO</code>, en nommant les colonnes renseignées ' +
          '— celles qui manquent reçoivent NULL ou leur valeur par défaut :</p>',
          '<pre><code>INSERT INTO Voiture (immat, marque, moteur, datecirc, km, pxachat, nbreplace)\n' +
          'VALUES (\'TG-3733-AC\', \'TOYOTA\', \'HYBRIDE\', \'2010-01-21 18:00:00\', 0, 20000000, 7);\n' +
          '\n' +
          '-- plusieurs lignes d’un coup :\n' +
          'INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n' +
          '(\'TOY\', \'TOYOTA\', \'JAPON\'),\n' +
          '(\'BMW\', \'BMW\', \'ALLEMAGNE\');</code></pre>',
          box('tech', 'Le simulateur du cours', 'terminal',
            '    <p>La page <a href="../atelier.html">atelier — simulateur SQL</a> contient ce schéma et ces ' +
            'données déjà chargés : chaque requête des chapitres suivants s’y exécute en réel. Le moteur est ' +
            'SQLite, qui accepte les mêmes requêtes SELECT que MySQL pour tout ce cours.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel type choisir pour un prix en francs ?', opts: ['FLOAT', 'DECIMAL', 'VARCHAR'], correct: 1, exp: 'DECIMAL calcule en décimal exact ; FLOAT arrondit et fausse l’argent.' },
      { stem: 'INT(2) limite-t-il la valeur à deux chiffres ?', opts: ['Oui', 'Non, seule l’affichage change', 'Cela dépend du SGBD'], correct: 1, exp: 'INT(x) ne change pas le stockage, seulement l’affichage éventuel avec ZEROFILL.' },
      { stem: 'Un code de marque sur 3 lettres : quel type ?', opts: ['VARCHAR(3)', 'CHAR(3)', 'TEXT'], correct: 1, exp: 'Longueur constante : CHAR(3), qui réserve exactement la place.' },
      { stem: 'Comment s’écrit le 21 novembre 2014 en littéral SQL ?', opts: ['\'21/11/2014\'', '\'2014-11-21\'', '\'11-21-2014\''], correct: 1, exp: 'Toujours année, mois, jour : AAAA-MM-JJ.' },
      { stem: 'Dans INSERT INTO … (colonnes) VALUES (…), les colonnes non citées reçoivent…', opts: ['une erreur', 'NULL ou leur valeur par défaut', 'des zéros'], correct: 1, exp: 'C’est le sens du nommage explicite des colonnes.' },
      { stem: 'Que fait IF NOT EXISTS dans CREATE TABLE ?', opts: ['Vide la table si elle existe', 'Évite une erreur si la table existe déjà', 'Crée la table en mémoire'], correct: 1, exp: 'L’instruction devient sans effet (et sans erreur) si la table existe déjà.' }
    ],

    pitfalls: [
      '<strong>Argent en FLOAT/DOUBLE</strong> : arrondis invisibles qui faussent totaux et moyennes.',
      '<strong>Dates en format local</strong> : \'21/11/2014\' n’est pas un littéral SQL valide.',
      '<strong>CHAR confondu avec VARCHAR</strong> : les espaces de complément surprennent les comparaisons.',
      '<strong>Clé primaire oubliée</strong> : deux voitures avec la même immatriculation deviennent possibles.',
      '<strong>INSERT sans colonnes nommées</strong> : tout repose sur l’ordre des colonnes, fragile au moindre changement.'
    ],

    methodTitle: 'Déclarer une table proprement',
    method: [
      '<strong>Lister les colonnes</strong> et leur contenu réel (est-ce un nombre, un texte, une date ?).',
      '<strong>Choisir les types</strong> : DECIMAL pour l’argent, CHAR pour le fixe, VARCHAR pour le variable.',
      '<strong>Poser la clé primaire</strong> et les contraintes NOT NULL indispensables.',
      '<strong>Insérer des lignes de test</strong> en nommant toujours les colonnes.',
      '<strong>Vérifier</strong> avec SELECT * que la structure et les NULL sont conformes.'
    ],

    summary: [
      'Entiers : TINYINT à BIGINT selon la plage ; INT(x) ne change que l’affichage.',
      'L’argent se stocke en DECIMAL, jamais en FLOAT.',
      'CHAR pour la longueur fixe (complétée d’espaces), VARCHAR pour la longueur variable.',
      'Dates au format \'AAAA-MM-JJ\' ; DATETIME ajoute l’heure.',
      'CREATE TABLE décrit colonnes, types et clés ; INSERT nomme les colonnes renseignées.'
    ],

    checklist: [
      'Je choisis un type numérique adapté et je justifie DECIMAL pour l’argent.',
      'Je distingue CHAR et VARCHAR avec un exemple de chaque.',
      'J’écris un CREATE TABLE complet avec clé primaire.',
      'J’insère des lignes en nommant les colonnes et je prévois les NULL.'
    ],

    notions: ['TINYINT', 'INT', 'DECIMAL', 'FLOAT', 'CHAR', 'VARCHAR', 'DATE', 'DATETIME', 'CREATE TABLE', 'INSERT'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Relis le tableau des types et associe chaque colonne du parc à son type.' },
      { cls: 'mid', text: '50–69 % — Réécris CREATE TABLE Voiture sans regarder le cours.' },
      { cls: 'good', text: '70–89 % — Solide : insère trois voitures dans le simulateur et vérifie les NULL.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, les requêtes SELECT.' }
    ],

    flashcards: [
      { q: 'Quel type pour l’argent et pourquoi ?', a: 'DECIMAL(p, s) : calcul décimal exact, là où FLOAT arrondit.' },
      { q: 'Différence entre CHAR(x) et VARCHAR(x) ?', a: 'CHAR réserve toujours x caractères et complète d’espaces ; VARCHAR stocke jusqu’à x, tel quel.' },
      { q: 'Format d’un littéral DATE en SQL ?', a: '\'AAAA-MM-JJ\' — année, mois, jour, toujours dans cet ordre.' },
      { q: 'Que devient une colonne absente d’un INSERT ?', a: 'Elle reçoit NULL, ou sa valeur par défaut si DEFAULT est déclaré.' }
    ]
  },

  /* ==================== Chapitre 3 ==================== */
  {
    n: 3,
    title: 'Interroger : SELECT, WHERE, tri et restrictions',
    short: 'SELECT et WHERE',
    toc: 'Afficher et sélectionner, filtrer avec WHERE, éliminer les doublons, trier avec ORDER BY, limiter avec LIMIT.',
    time: '≈ 2 h 30 de travail',

    situation:
      'La base du parc est en place : 23 voitures, 12 marques. Reste à poser les questions — combien de ' +
      'diesels ? lesquelles avant 2015 ? quelles marques distinctes ? Toute question s’écrit avec le même ' +
      'squelette SELECT…FROM…WHERE, et l’ordre des clauses n’est pas négociable : le SGBD le lit dans un ' +
      'ordre fixe, et une clause mal placée est rejetée.',

    objectives: [
      'écrire une requête SELECT simple, sur des colonnes précises ou avec * ;',
      'filtrer les lignes avec WHERE et les opérateurs de comparaison et LIKE ;',
      'éliminer les doublons avec DISTINCT ;',
      'trier avec ORDER BY et restreindre le nombre de résultats avec LIMIT.'
    ],

    sections: [
      {
        title: 'SELECT : afficher et sélectionner',
        html: [
          '<p><code>SELECT</code> est la commande qui sélectionne — et aussi qui <strong>affiche</strong>. ' +
          'Elle fonctionne sans table :</p>',
          '<pre><code>SELECT \'Nous sommes au COLLEGE DE PARIS SUPERIEUR\';\n' +
          'SELECT 45 + 40 AS Effectif;</code></pre>',
          '<p>Mais son usage réel passe par <code>FROM</code> :</p>',
          '<pre><code>SELECT nommarque, paysmarque   -- les colonnes voulues, dans l’ordre voulu\n' +
          'FROM Marque;\n' +
          '\n' +
          'SELECT *                       -- toutes les colonnes\n' +
          'FROM Voiture;</code></pre>',
          '<p>Le mot-clé <code>AS</code> <strong>renomme une colonne du résultat</strong> — pas la table : ' +
          '<code>SELECT pxachat AS prix</code> affiche « prix » en tête de colonne. Un alias de lisibilité, ' +
          'sans effet sur les données.</p>',
          box('tech', 'Les commentaires en SQL', 'terminal',
            '    <pre><code>-- ce commentaire tient sur une ligne\n' +
            '/* celui-ci\n' +
            '   en tient plusieurs */</code></pre>\n' +
            '    <p>Les doubles tirets commentent jusqu’à la fin de ligne ; le support les utilise pour ' +
            'expliquer chaque requête — un réflexe à garder.</p>')
        ].join('\n')
      },
      {
        title: 'Filtrer avec WHERE',
        html: [
          '<p>La clause <code>WHERE</code> restreint les lignes du résultat selon une condition :</p>',
          '<pre><code>SELECT * FROM Voiture WHERE moteur = \'DIESEL\';\n' +
          'SELECT * FROM Voiture WHERE pxachat &gt;= 20000000;\n' +
          'SELECT * FROM Voiture WHERE marque = \'TOYOTA\' AND moteur = \'DIESEL\';\n' +
          'SELECT * FROM Voiture WHERE moteur = \'DIESEL\' OR moteur = \'HYBRIDE\';</code></pre>',
          '<table>\n' +
          '    <tr><th>Opérateur</th><th>Sens</th></tr>\n' +
          '    <tr><td>=  &lt;&gt; (ou !=)</td><td>égal, différent</td></tr>\n' +
          '    <tr><td>&lt;  &lt;=  &gt;  &gt;=</td><td>comparaisons (numériques ou alphabétiques)</td></tr>\n' +
          '    <tr><td>BETWEEN a AND b</td><td>dans l’intervalle inclus</td></tr>\n' +
          '    <tr><td>IN (…)</td><td>appartient à une liste</td></tr>\n' +
          '    <tr><td>LIKE</td><td>motif : % = n’importe quoi, _ = un caractère</td></tr>\n' +
          '    <tr><td>IS NULL / IS NOT NULL</td><td>absence d’information</td></tr>\n' +
          '  </table>',
          '<p>Deux pièges de la clause : les chaînes se quotent avec des <strong>apostrophes simples</strong> ' +
          '(<code>\'DIESEL\'</code>, jamais "DIESEL" en MySQL strict), et la comparaison avec NULL se fait ' +
          'uniquement par <code>IS NULL</code> — <code>= NULL</code> ne renvoie jamais vrai.</p>',
          box('pitfall', 'Piège — les immatriculations en AK', 'warning',
            '    <p>« Toutes les voitures immatriculées en AK » s’écrit <code>WHERE immat LIKE \'%AK\'</code> : ' +
            'le <code>%</code> remplace n’importe quel préfixe. Écrire <code>= \'%AK\'</code> chercherait une ' +
            'immatriculation qui s’appellerait littéralement « %AK » — et ne trouverait rien.</p>')
        ].join('\n')
      },
      {
        title: 'Doublons et tris',
        html: [
          '<p>« Quelles marques possédons-nous ? » : <code>SELECT marque FROM Voiture</code> renvoie autant ' +
          'de lignes TOYOTA que de Toyota dans le parc. Le mot-clé <code>DISTINCT</code>, placé juste après ' +
          'SELECT, élimine les doublons :</p>',
          '<pre><code>SELECT DISTINCT marque FROM Voiture;      -- 12 lignes, une par marque\n' +
          'SELECT COUNT(DISTINCT marque) FROM Voiture;   -- directement le nombre</code></pre>',
          '<p>Un doublon disparaît seulement si <strong>toute la ligne sélectionnée</strong> est identique à ' +
          'une autre : avec deux colonnes, DISTINCT agit sur le couple, pas colonne par colonne.</p>',
          '<p>Le tri passe par <code>ORDER BY</code>, placé après FROM/WHERE :</p>',
          '<pre><code>SELECT immat, marque, datecirc FROM Voiture ORDER BY datecirc;\n' +
          'SELECT immat FROM Voiture ORDER BY immat DESC;      -- décroissant\n' +
          'SELECT * FROM Voiture ORDER BY marque, datecirc;    -- tri à deux niveaux</code></pre>',
          '<p>Le second exemple trie par marque puis, <strong>à l’intérieur de chaque marque</strong>, par ' +
          'date : c’est la lecture des tris multi-colonnes. Sans précision, l’ordre est croissant (ASC).</p>'
        ].join('\n')
      },
      {
        title: 'LIMIT : restreindre le nombre de lignes',
        html: [
          '<p>Une requête peut ramener des milliers de lignes quand on n’en veut que cinq. La clause ' +
          '<code>LIMIT</code> borne le résultat :</p>',
          '<pre><code>SELECT immat, pxachat FROM Voiture\n' +
          'ORDER BY pxachat DESC\n' +
          'LIMIT 3;                    -- les 3 voitures les plus chères\n' +
          '\n' +
          'SELECT * FROM Voiture LIMIT 5 OFFSET 10;   -- 5 lignes à partir de la 11e</code></pre>',
          '<p>L’ordre complet d’une requête de lecture se mémorise une fois pour toutes :</p>',
          '<pre><code>SELECT   colonnes\n' +
          'FROM     tables\n' +
          'WHERE    condition sur les lignes\n' +
          'GROUP BY regroupement        (chapitre 5)\n' +
          'HAVING   condition sur les groupes  (chapitre 5)\n' +
          'ORDER BY tri\n' +
          'LIMIT    nombre de lignes</code></pre>',
          box('mnemo', 'Mnémotechnique — « SFWGHOL »', 'pin',
            '    <p>La séquence <strong>S</strong>elect <strong>F</strong>rom <strong>W</strong>here ' +
            '<strong>G</strong>roup <strong>H</strong>aving <strong>O</strong>rder <strong>L</strong>imit se ' +
            'lit comme un mot. Les clauses sont optionnelles, leur <strong>ordre ne l’est jamais</strong> : ' +
            'un ORDER BY avant le WHERE est une erreur de syntaxe.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Que fait SELECT DISTINCT marque FROM Voiture ?', opts: ['Compte les marques', 'Renvoie chaque marque une seule fois', 'Trie les marques'], correct: 1, exp: 'DISTINCT élimine les lignes dupliquées du résultat.' },
      { stem: 'Comment tester une valeur NULL dans WHERE ?', opts: ['= NULL', 'IS NULL', '== NULL'], correct: 1, exp: '= NULL ne renvoie jamais vrai : seule la forme IS NULL fonctionne.' },
      { stem: 'Dans LIKE \'%AK\', que remplace % ?', opts: ['Exactement un caractère', 'N’importe quelle suite de caractères', 'Un chiffre'], correct: 1, exp: '% = toute suite (même vide) ; _ remplace exactement un caractère.' },
      { stem: 'ORDER BY marque, datecirc trie…', opts: ['par marque seulement', 'par date seulement', 'par marque puis par date à l’intérieur de chaque marque'], correct: 2, exp: 'Les tris multi-colonnes s’appliquent de gauche à droite, par niveaux.' },
      { stem: 'Où place-t-on LIMIT dans une requête ?', opts: ['Juste après SELECT', 'Après ORDER BY, en dernière clause', 'Avant WHERE'], correct: 1, exp: 'LIMIT clôt la requête : SELECT FROM WHERE (GROUP HAVING) ORDER LIMIT.' },
      { stem: 'Comment quotent-on une chaîne en SQL ?', opts: ['"DIESEL"', '\'DIESEL\'', '`DIESEL`'], correct: 1, exp: 'Apostrophes simples pour les valeurs textuelles.' }
    ],

    pitfalls: [
      '<strong>Clause ORDER BY placée avant WHERE</strong> : l’ordre des clauses est imposé.',
      '<strong>= NULL au lieu de IS NULL</strong> : le filtre ne renvoie rien, sans message d’erreur.',
      '<strong>= \'%AK\' au lieu de LIKE \'%AK\'</strong> : le motif n’est interprété qu’avec LIKE.',
      '<strong>DISTINCT espéré colonne par colonne</strong> : il agit sur la ligne entière sélectionnée.',
      '<strong>Guillemets doubles autour des chaînes</strong> : selon le SGBD et le mode, c’est rejeté ou ambigu.'
    ],

    methodTitle: 'Construire une requête de lecture',
    method: [
      '<strong>Formuler la question en français</strong> : quelles colonnes, sur quelles lignes, dans quel ordre ?',
      '<strong>Écrire le squelette</strong> SELECT…FROM… dans l’ordre fixe des clauses.',
      '<strong>Filtrer</strong> avec WHERE, en citant les chaînes et en testant NULL avec IS NULL.',
      '<strong>Trier et borner</strong> avec ORDER BY puis LIMIT si la question demande un classement.',
      '<strong>Contrôler le résultat</strong> : nombre de lignes plausible, valeurs extrêmes cohérentes.'
    ],

    summary: [
      'SELECT affiche (constant, calcul) et sélectionne (FROM), AS renomme une colonne du résultat.',
      'WHERE filtre : comparaisons, AND/OR, BETWEEN, IN, LIKE avec % et _, IS NULL pour les absences.',
      'DISTINCT élimine les doublons sur la ligne complète sélectionnée.',
      'ORDER BY trie (ASC par défaut, DESC décroissant) par niveaux de gauche à droite.',
      'LIMIT borne le nombre de lignes, OFFSET décale le départ ; l’ordre des clauses est fixe.'
    ],

    checklist: [
      'J’écris une requête filtrée avec les bons opérateurs et les chaînes quotées.',
      'J’élimine les doublons sur la bonne colonne (ou le bon couple).',
      'Je trie sur deux colonnes et j’explique la hiérarchie.',
      'Je place LIMIT et OFFSET conformément à l’ordre fixe des clauses.'
    ],

    notions: ['SELECT', 'FROM', 'WHERE', 'LIKE', 'IS NULL', 'DISTINCT', 'ORDER BY', 'LIMIT'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Refais les requêtes du support dans le simulateur, une par une.' },
      { cls: 'mid', text: '50–69 % — Écris « diesels avant 2015, du plus ancien au plus récent » sans aide.' },
      { cls: 'good', text: '70–89 % — Solide : ajoute le classement des 3 voitures les plus chères.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les jointures.' }
    ],

    flashcards: [
      { q: 'Ordre fixe des clauses d’un SELECT ?', a: 'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.' },
      { q: 'Comment teste-t-on NULL ?', a: 'IS NULL ou IS NOT NULL — jamais = NULL.' },
      { q: 'Que font % et _ dans LIKE ?', a: '% remplace toute suite de caractères, _ exactement un caractère.' },
      { q: 'Que fait ORDER BY a, b DESC ?', a: 'Trie par a croissant puis, à l’intérieur, par b décroissant.' }
    ]
  }
];

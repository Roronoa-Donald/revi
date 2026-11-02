/**
 * Chapitres 1 à 3 du cours de bases de données & SQL B1.
 *
 * Chaque chapitre fournit la matière que `kit.chapter` met en page. Aucun titre
 * <h2> ici : la numérotation est ajoutée au rendu. Ce cours n'a pas d'atelier
 * de code : les exercices se font dans le simulateur SQL (page atelier.html).
 */
'use strict';

const { box } = require('../../../scripts/course-kit');
const { PARC_SQL } = require('../../../b1-sql/assets/js/sql-simulator');

const referenceSchema = PARC_SQL.slice(0, PARC_SQL.indexOf('INSERT INTO Marque')).trim();

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
      'décrire le modèle relationnel : table, ligne, colonne, clé primaire et étrangère ;',
      'interroger une table avec SELECT, DISTINCT et ORDER BY.'
    ],

    sections: [
      {
        title: 'Qu’est-ce qu’une base de données ?',
        html: [
          '<p><strong>Définition.</strong> Une <strong>base de données</strong> (BDD) est un ensemble ' +
          'd’informations organisé pour être accessible, géré et mis à jour facilement par ses ' +
          'utilisateurs. Dans une base relationnelle, elles sont présentées en tables, lignes et colonnes ; ' +
          'd’autres modèles organisent les données autrement.</p>',
          '<p>Un SGBD fournit notamment des outils pour :</p>',
          '<ul>\n' +
          '    <li>décrire les données et les rendre accessibles à plusieurs programmes ;</li>\n' +
          '    <li>les <strong>interroger par le contenu</strong> : par exemple, retrouver les produits à moins de 100 francs.</li>\n' +
          '  </ul>',
          '<p>Une base peut être <strong>locale</strong> (une machine, un utilisateur) ou ' +
          '<strong>répartie</strong> (machines distantes accessibles par le réseau). Selon le SGBD et sa ' +
          'configuration, plusieurs utilisateurs peuvent y accéder et leurs opérations concurrentes sont coordonnées.</p>',
          box('pitfall', 'Piège — l’abus de langage', 'warning',
            '    <p>Un tableur peut aussi organiser, filtrer et partager des données. Distinguez les données, ' +
            'leur format de stockage et le logiciel utilisé : un SGBD fournit des fonctions de gestion ' +
            'adaptées à la base et aux besoins du projet.</p>')
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
            '(sécurité), <strong>C</strong>ohérent (qualité), <strong>P</strong>artagé. Ces objectifs ' +
            'dépendent de l’outil et de sa configuration ; ils ne sont pas garantis automatiquement.</p>')
        ].join('\n')
      },
      {
        title: 'Le SGBD',
        html: [
          '<p>La base de données est le contenu ; le <strong>SGBD</strong> (système de gestion de base de ' +
          'données) est le logiciel qui la gère. Il permet d’insérer, de modifier et de rechercher ' +
          'efficacement des données dans une grande masse d’informations partagée par de multiples ' +
          'utilisateurs.</p>',
          '<p>Un SGBD peut gérer les accès concurrents selon ses mécanismes de transactions et de verrouillage. ' +
          'Il décrit aussi les données (types, formats, contraintes) et permet de les interroger ou modifier. ' +
          'Les capacités et limites varient selon les systèmes et leur configuration.</p>',
          '<table>\n' +
          '    <tr><th>SGBD</th><th>Particularité</th></tr>\n' +
          '    <tr><td>MySQL / MariaDB</td><td>très répandu pour le web, gratuit, c’est celui du support</td></tr>\n' +
          '    <tr><td>PostgreSQL</td><td>puissant et conforme aux normes, très utilisé en entreprise</td></tr>\n' +
          '    <tr><td>Oracle Database</td><td>historique des grandes organisations, commercial</td></tr>\n' +
          '    <tr><td>SQL Server</td><td>l’offre de Microsoft, intégrée à ses écosystèmes</td></tr>\n' +
          '    <tr><td>SQLite</td><td>embarqué, sans serveur — c’est le moteur du simulateur de ce cours</td></tr>\n' +
          '  </table>',
          '<p>Tous parlent <strong>SQL</strong> (Structured Query Language), le langage standard de ' +
          'l’interrogation. La syntaxe et les comportements peuvent différer selon les dialectes et les SGBD ; ' +
          'les exercices de ce chapitre utilisent SQLite.</p>',
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
          '<pre><code>Marque — extrait\n' +
          'codemarque | nommarque     | paysmarque\n' +
          'TOY        | TOYOTA        | JAPON\n' +
          'BMW        | BMW           | ALLEMAGNE\n' +
          'BNZ        | MERCEDES BENZ | ALLEMAGNE\n' +
          '\n' +
          'Voiture — extrait de lignes et de colonnes\n' +
          'immat      | marque        | codemarque | moteur  | pxachat\n' +
          'TG-7854-Z  | MERCEDES BENZ | BNZ        | DIESEL  | 6000000\n' +
          'TG-3733-AC | TOYOTA        | TOY        | HYBRIDE | 20000000\n' +
          'TG-5420-AL | BMW           | BMW        | ESSENCE | 50000000</code></pre>',
          '<p>Deux clés structurent le tout :</p>',
          '<ul>\n' +
          '    <li>la <strong>clé primaire</strong> identifie sans ambiguïté chaque ligne : une immatriculation ' +
          'désigne exactement une voiture, jamais deux ;</li>\n' +
          '    <li>la <strong>clé étrangère</strong> relie une table à une autre : dans Voiture, le couple ' +
          '<code>(codemarque, marque)</code> doit correspondre au couple <code>(codemarque, nommarque)</code> ' +
          'd’une ligne de Marque. Le code sert aussi aux jointures du chapitre 4.</li>\n' +
          '  </ul>',
          '<p>Le nom est répété dans Voiture pour faciliter les premières requêtes ; la clé étrangère ' +
          'composée vérifie qu’il correspond bien au code. Le schéma complet est au chapitre 2.</p>',
          box('pitfall', 'Piège — valeur manquante ≠ valeur nulle', 'warning',
            '    <p>Une date de mise en circulation inconnue peut être notée <code>NULL</code> dans ' +
            '<code>datecirc</code>. Les 23 voitures initiales ont une date ; l’exemple concerne une ' +
            'nouvelle voiture. L’immatriculation, clé primaire déclarée <code>NOT NULL</code>, ne peut pas ' +
            'être absente. Ne remplacez pas une donnée inconnue par zéro ou une chaîne vide : ce sont ' +
            'des valeurs distinctes qui peuvent fausser les calculs.</p>')
        ].join('\n')
      },
      {
        title: 'Poser une première question à la base : SELECT',
        html: [
          '<p>Une base de données ne sert à rien si l’on ne peut pas l’interroger. SQL le fait avec des ' +
          '<strong>requêtes</strong> ; la plus courante commence par <code>SELECT</code> (« sélectionner »). ' +
          'Les exercices de ce chapitre n’utilisent que quatre idées, que voici sur la table <code>Marque</code> ' +
          'du parc automobile (colonnes <code>codemarque</code>, <code>nommarque</code>, <code>paysmarque</code>).</p>',
          '<ul>\n' +
          '    <li><strong>Tout afficher</strong> : <code>SELECT * FROM Marque;</code> — l’étoile <code>*</code> signifie ' +
          '« toutes les colonnes », <code>FROM</code> indique dans quelle table lire.</li>\n' +
          '    <li><strong>Choisir des colonnes</strong> (on dit une <em>projection</em>) : ' +
          '<code>SELECT nommarque, paysmarque FROM Marque;</code> — seules ces deux colonnes apparaissent, dans cet ordre.</li>\n' +
          '    <li><strong>Supprimer les doublons</strong> : si deux voitures ont le même moteur, ' +
          '<code>SELECT moteur FROM Voiture;</code> répète la valeur ; <code>SELECT DISTINCT moteur FROM Voiture;</code> ' +
          'ne l’affiche qu’une fois : le parc possède quatre types de moteurs. Sans ORDER BY, leur ordre n’est pas garanti.</li>\n' +
          '    <li><strong>Trier</strong> : <code>SELECT * FROM Marque ORDER BY nommarque ASC;</code> — <code>ASC</code> ' +
          'classe par ordre croissant (A→Z), <code>DESC</code> par ordre décroissant.</li>\n' +
          '  </ul>',
          '<p>Voici les trois premières des 12 lignes du dernier résultat :</p>',
          '<pre><code>codemarque | nommarque | paysmarque\n' +
          'BMW        | BMW       | ALLEMAGNE\n' +
          'HYU        | HYUNDAI   | COREE DU SUD\n' +
          'KIA        | KIA       | COREE DU SUD\n' +
          '…</code></pre>',
          box('intuition', 'Lire une requête comme une phrase', 'lightbulb',
            '    <p><code>SELECT</code> dit <em>quoi</em> afficher, <code>FROM</code> dit <em>où</em> le prendre, ' +
            '<code>ORDER BY</code> dit <em>dans quel ordre</em>. Le point-virgule termine la requête. Une requête ' +
            '<code>SELECT</code> sert à interroger les données. Dans ces exemples simples, elle ne les modifie pas. ' +
            'Les chapitres 3 et 4 reprennent ces mots-clés et y ajoutent le filtrage (<code>WHERE</code>) ' +
            'et les jointures.</p>')
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'Quel est le rôle d’une base de données ?', opts: ['Rendre tous les fichiers illisibles', 'Organiser des informations pour pouvoir les consulter et les gérer', 'Remplacer le processeur'], correct: 1, exp: 'Une base organise des informations ; elle ne remplace pas le matériel ni ne rend les fichiers illisibles.' },
      { stem: 'Que signifie SGBD ?', opts: ['Système de Gestion de Big Data', 'Système de Gestion de Base de Données', 'Serveur de Gestion de Blocs de Données'], correct: 1, exp: 'Le logiciel qui gère la base : insertion, modification, recherche, partage.' },
      { stem: 'Une clé primaire sert à…', opts: ['trier les lignes', 'identifier sans ambiguïté chaque ligne', 'relier deux tables entre elles'], correct: 1, exp: 'Identification unique ; relier deux tables est le rôle de la clé étrangère.' },
      { stem: 'Quel modèle utilise des relations représentées ici par des tables ?', opts: ['Hiérarchique', 'Réseau', 'Relationnel'], correct: 2, exp: 'Le modèle relationnel décrit les données par des relations, présentées ici sous forme de tables.' },
      { stem: 'Que représente NULL dans une colonne ?', opts: ['Zéro', 'Une chaîne vide', 'L’absence d’information'], correct: 2, exp: 'NULL n’est ni 0 ni vide : c’est l’absence de valeur, une information en soi.' },
      { stem: 'Que peut faire un SGBD adapté au partage multiutilisateur ?', opts: ['Interdire systématiquement tout accès simultané', 'Coordonner les opérations concurrentes', 'Dupliquer obligatoirement la base par utilisateur'], correct: 1, exp: 'Le SGBD peut coordonner les opérations selon son mécanisme de transactions et de verrouillage ; les deux autres propositions ne sont pas des règles générales.' }
    ],

    pitfalls: [
      '<strong>Base et logiciel confondus</strong> : un tableur peut aussi filtrer des données ; comparez les besoins et les fonctions disponibles.',
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
      '<strong>Vérifier la cohérence</strong> : une clé étrangère renseignée possède-t-elle la correspondance requise ? Une valeur NULL peut être permise selon le schéma.'
    ],

    summary: [
      'Une base de données est interrogeable par le contenu et décrite séparément de son utilisation.',
      'Six fonctions : fiable, massif, rapide, sûr, cohérent, partagé.',
      'Le SGBD est le logiciel qui gère la base ; MySQL, PostgreSQL, Oracle, SQL Server et SQLite en sont des exemples.',
      'Modèle relationnel : tables, lignes, colonnes ; clé primaire pour identifier, clé étrangère pour relier.',
      'NULL signifie l’absence d’information : jamais 0, jamais chaîne vide.',
      'Une première requête : SELECT choisit les colonnes, FROM la table, DISTINCT retire les doublons, ORDER BY trie.'
    ],

    checklist: [
      'Je définis une base de données sans confondre avec un tableur.',
      'Je cite les fonctions d’une base et trois SGBD réels.',
      'Je distingue clé primaire et clé étrangère sur un exemple.',
      'J’explique ce que NULL représente et pourquoi on ne le remplace jamais.',
      'J’écris une requête SELECT simple : toutes les colonnes, quelques colonnes, sans doublons, triées.'
    ],

    notions: ['base de données', 'SGBD', 'SQL', 'modèle relationnel', 'table', 'clé primaire', 'clé étrangère', 'NULL'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Relis les définitions et réécrivez-les avec vos mots.' },
      { cls: 'mid', text: '50–69 % — Refaites le schéma Marque/Voiture en nommant toutes les clés.' },
      { cls: 'good', text: '70–94 % — Solide : explique le rôle du SGBD à quelqu’un d’autre.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 2, types et création de tables.' }
    ],

    flashcards: [
      { q: 'Définissez une base de données.', a: 'Un ensemble d’informations organisé pour être accessible, géré et mis à jour facilement, interrogeable par le contenu.' },
      { q: 'Rôle du SGBD ?', a: 'Logiciel qui gère la base : insertion, modification, recherche et, selon le système, contrôle des accès et partage.' },
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
      'comparaisons possibles, les erreurs évitées. Avec un prix stocké en texte, les conversions et les ' +
      'comparaisons dépendent du SGBD ; dans SQLite, une moyenne peut convertir le texte de façon inattendue.',

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
          '<p>Deux précisions du support MySQL : la notation <code>INT(x)</code> ne change <strong>pas</strong> la ' +
          'plage de valeurs ; elle indiquait une largeur d’affichage. Cette largeur et <code>ZEROFILL</code> ' +
          'sont dépréciés dans les versions récentes de MySQL. ' +
          'Pour les décimaux, on utilise <code>DECIMAL(p, s)</code> — précision p, s décimales — pour l’argent, ' +
          'et <code>FLOAT</code>/<code>DOUBLE</code> pour les mesures scientifiques.</p>',
          box('pitfall', 'Piège — l’argent et les dialectes', 'warning',
            '    <p>Les nombres flottants peuvent produire des arrondis. Dans MySQL, ' +
            '<code>DECIMAL</code> sert aux valeurs décimales exactes. SQLite traite <code>DECIMAL</code> ' +
            'avec une affinité numérique et ne garantit pas ce calcul décimal exact. Dans notre parc, ' +
            '<code>pxachat</code> est un entier en francs : <code>INTEGER</code>.</p>')
        ].join('\n')
      },
      {
        title: 'CHAR et VARCHAR',
        html: [
          '<p>En MySQL, les chaînes de longueur fixe ou variable s’écrivent avec un paramètre de taille :</p>',
          '<table>\n' +
          '    <tr><th>Stocké</th><th>CHAR(5)</th><th>VARCHAR(5)</th></tr>\n' +
          '    <tr><td>« OK »</td><td>« OK&nbsp;&nbsp;&nbsp; » (complété d’espaces)</td><td>« OK » (tel quel)</td></tr>\n' +
          '    <tr><td>Stockage</td><td>complété jusqu’à 5 caractères</td><td>contenu + 1 ou 2 octets de longueur</td></tr>\n' +
          '  </table>',
          '<p><strong>CHAR(x)</strong> réserve toujours x caractères et complète les plus courts d’espaces : ' +
          'il convient quand la longueur est constante — un code de marque sur trois lettres, un code postal. ' +
          '<strong>VARCHAR(x)</strong> stocke jusqu’à x caractères, sans remplissage : c’est le choix par ' +
          'défaut pour un nom, une adresse, un immatriculé.</p>',
          '<p>Dans SQLite, <code>CHAR</code> et <code>VARCHAR</code> ont une affinité texte : la longueur ' +
          'entre parenthèses n’est pas une limite imposée par le type. Notre schéma utilise <code>TEXT</code>.</p>',
          '<p>Le support cite aussi les grands textes (<code>TEXT</code>) et les binaires (<code>BLOB</code>) ' +
          'pour les contenus longs — un commentaire, une image stockée en base.</p>',
          box('mnemo', 'Mnémotechnique — « Fixe = CHAR, variable = VARCHAR »', 'pin',
            '    <p>En MySQL, un code de pays à trois lettres naît et meurt à trois lettres : <strong>CHAR(3)</strong>. ' +
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
          '<p>Le format littéral n’est pas décoratif : dans le parc, la date du 21 novembre 2014 s’écrit ' +
          '<code>\'2014-11-21\'</code>. La chaîne <code>\'21/11/2014\'</code> est valide comme texte SQL, ' +
          'mais ne respecte pas le format choisi pour les dates de ce parc.</p>',
          '<p>SQLite n’a pas de type de stockage spécifique aux dates. Dans notre parc, ' +
          '<code>datecirc</code> est un texte au format <code>AAAA-MM-JJ</code>, ou NULL si la date ' +
          'est inconnue. C’est une convention des données du parc : le type TEXT seul ne valide pas la date. ' +
          'Avec ce format homogène, on peut comparer : ' +
          '<code>SELECT immat FROM Voiture WHERE datecirc &lt; \'2015-01-01\';</code></p>'
        ].join('\n')
      },
      {
        title: 'CREATE TABLE et INSERT',
        html: [
          '<p>La description d’une table passe par <code>CREATE TABLE</code> : chaque colonne reçoit un nom, ' +
          'un type, et des contraintes optionnelles (<code>NOT NULL</code>, <code>PRIMARY KEY</code>).</p>',
          '<p>Voici le schéma exact du simulateur SQLite ; les tables existent déjà dans l’atelier. ' +
          'La première instruction active les clés étrangères pour cette connexion :</p>',
          '<pre><code>' + referenceSchema + '</code></pre>',
          '<p><code>immat</code> et <code>codemarque</code> sont des clés primaires non nulles. ' +
          'La clé étrangère composée assure que le code et le nom de chaque voiture désignent ensemble ' +
          'une marque existante. Seule <code>datecirc</code> peut manquer dans Voiture. ' +
          'Les tables <code>Equipement</code> et <code>VoitureEquipement</code> ajoutent des données ' +
          'fictives pour les jointures du chapitre 4. Dans Equipement, un prix omis vaut 0 par défaut ; ' +
          'un prix explicitement inconnu peut être NULL.</p>',
          '<p>Les lignes arrivent par <code>INSERT INTO</code>. Ajoutez d’abord deux marques fictives, ' +
          'puis une voiture dont la date est inconnue :</p>',
          '<pre><code>INSERT INTO Marque (codemarque, nommarque, paysmarque) VALUES\n' +
          '(\'TES\', \'EXEMPLE\', \'TOGO\'),\n' +
          '(\'ABC\', \'ATELIER\', \'BENIN\');\n' +
          'INSERT INTO Voiture (immat, marque, codemarque, moteur, datecirc, km, pxachat, nbreplace)\n' +
          'VALUES (\'TG-0001-TEST\', \'EXEMPLE\', \'TES\', \'ELECTRIQUE\', NULL, 0, 12000000, 5);\n' +
          'SELECT immat, datecirc FROM Voiture WHERE immat = \'TG-0001-TEST\';</code></pre>',
          '<p>Résultat : <code>TG-0001-TEST | NULL</code>. Réinitialisez le simulateur avant de ' +
          'recommencer pour éviter les clés déjà présentes. Une colonne omise reçoit son ' +
          '<code>DEFAULT</code>, sinon NULL ; si une contrainte <code>NOT NULL</code> est violée, ' +
          'l’insertion échoue. Une clé <code>INTEGER PRIMARY KEY</code> omise dans une table ordinaire ' +
          'peut recevoir un entier généré par SQLite.</p>',
          box('tech', 'Le simulateur du cours', 'terminal',
            '    <p>La page <a href="../atelier.html">atelier — simulateur SQL</a> charge ce schéma et ' +
            'les données du parc. SQLite et MySQL partagent de nombreuses syntaxes, mais leurs règles ' +
            'diffèrent notamment pour les types, les agrégats et l’administration.</p>')
        ].join('\n')
      },
      {
        title: 'Ajouter une colonne avant de s’exercer',
        html: [
          '<p><code>ALTER TABLE … ADD COLUMN</code> ajoute une colonne à une table existante. ' +
          'Dans une copie du parc, ajoutez provisoirement une garantie par défaut de 12 mois ' +
          'aux équipements :</p>',
          '<pre><code>ALTER TABLE Equipement ADD COLUMN garantie_mois INTEGER DEFAULT 12;\n' +
          'SELECT codeequipement, garantie_mois FROM Equipement WHERE codeequipement = \'AIR\';</code></pre>',
          '<p>Résultat : <code>AIR | 12</code>. La ligne existante reçoit cette valeur par défaut ' +
          'lors de sa lecture. Réinitialisez le simulateur pour retrouver le schéma de référence. ' +
          'Dans l’exercice, une version antérieure d’Equipement ne possède pas encore la colonne ' +
          '<code>prix</code> : vous l’ajouterez avec sa valeur par défaut. Au chapitre 6, vous étudierez ' +
          'd’autres évolutions de structure et leurs limites selon le SGBD.</p>'
        ].join('\n')
      }
    ],

    questions: [
      { stem: 'En MySQL, quel type convient à un prix avec des centimes ?', opts: ['FLOAT', 'DECIMAL', 'VARCHAR'], correct: 1, exp: 'MySQL propose DECIMAL pour les décimaux exacts ; un flottant peut arrondir et VARCHAR est du texte.' },
      { stem: 'En MySQL, INT(2) limite-t-il la valeur à deux chiffres ?', opts: ['Oui', 'Non, il ne limite pas la plage à deux chiffres', 'Oui, si la valeur est négative'], correct: 1, exp: 'INT(x) ne change pas la capacité de stockage ; la largeur concerne un affichage éventuel avec ZEROFILL.' },
      { stem: 'En MySQL, quel type à longueur fixe choisir pour un code de 3 caractères ?', opts: ['VARCHAR(3)', 'CHAR(3)', 'TEXT'], correct: 1, exp: 'CHAR(3) est le type fixe ; VARCHAR est variable et TEXT ne précise pas cette longueur.' },
      { stem: 'Dans le parc SQLite, quelle chaîne représente le 21 novembre 2014 ?', opts: ['\'21/11/2014\'', '\'2014-11-21\'', '\'11-21-2014\''], correct: 1, exp: 'Le parc choisit le format texte année, mois, jour : AAAA-MM-JJ.' },
      { stem: 'En SQLite, que peut recevoir une colonne ordinaire omise dans INSERT ?', opts: ['Toujours zéro', 'Son DEFAULT ou NULL, sous réserve des contraintes', 'Toujours une erreur'], correct: 1, exp: 'Un DEFAULT fournit la valeur ; sinon c’est NULL, sauf si une contrainte comme NOT NULL interdit l’insertion. Une INTEGER PRIMARY KEY ordinaire peut être générée.' },
      { stem: 'Que fait IF NOT EXISTS dans CREATE TABLE ?', opts: ['Vide la table si elle existe', 'Évite une erreur si la table existe déjà', 'Crée la table en mémoire'], correct: 1, exp: 'L’instruction devient sans effet (et sans erreur) si la table existe déjà.' }
    ],

    pitfalls: [
      '<strong>Argent en FLOAT/DOUBLE</strong> : arrondis invisibles qui faussent totaux et moyennes.',
      '<strong>Dates en format local</strong> : \'21/11/2014\' est une chaîne SQL valide, mais pas une date au format du parc.',
      '<strong>CHAR confondu avec VARCHAR</strong> : les espaces de complément surprennent les comparaisons.',
      '<strong>Clé primaire oubliée</strong> : deux voitures avec la même immatriculation deviennent possibles.',
      '<strong>INSERT sans colonnes nommées</strong> : tout repose sur l’ordre des colonnes, fragile au moindre changement.'
    ],

    methodTitle: 'Déclarer une table proprement',
    method: [
      '<strong>Lister les colonnes</strong> et leur contenu réel (est-ce un nombre, un texte, une date ?).',
      '<strong>Choisir les types</strong> selon le SGBD : DECIMAL exact en MySQL, INTEGER pour les francs entiers du parc SQLite.',
      '<strong>Poser la clé primaire</strong> et les contraintes NOT NULL indispensables.',
      '<strong>Insérer des lignes de test</strong> en nommant toujours les colonnes.',
      '<strong>Vérifier</strong> avec SELECT * que la structure et les NULL sont conformes.'
    ],

    summary: [
      'En MySQL, les entiers vont de TINYINT à BIGINT ; INT(x) ne change pas leur plage.',
      'En MySQL, DECIMAL convient à l’argent ; dans le parc SQLite, les francs entiers sont en INTEGER.',
      'En MySQL, CHAR est fixe et VARCHAR variable ; SQLite applique une affinité texte sans imposer leur longueur.',
      'Dans le parc SQLite, les dates sont du texte au format \'AAAA-MM-JJ\' ; en MySQL, DATETIME ajoute l’heure.',
      'CREATE TABLE décrit colonnes, types et clés ; INSERT nomme les colonnes renseignées.'
    ],

    checklist: [
      'Je choisis un type numérique adapté au SGBD et à la précision requise.',
      'Je distingue CHAR et VARCHAR avec un exemple de chaque.',
      'J’écris un CREATE TABLE complet avec clé primaire.',
      'J’insère des lignes en nommant les colonnes et je prévois les NULL.'
    ],

    notions: ['TINYINT', 'INT', 'DECIMAL', 'FLOAT', 'CHAR', 'VARCHAR', 'DATE', 'DATETIME', 'CREATE TABLE', 'INSERT'],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — Relis le tableau des types et associe chaque colonne du parc à son type.' },
      { cls: 'mid', text: '50–69 % — Réécrivez CREATE TABLE Voiture sans regarder le cours.' },
      { cls: 'good', text: '70–94 % — Solide : insère trois voitures dans le simulateur et vérifie les NULL.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 3, les requêtes SELECT.' }
    ],

    flashcards: [
      { q: 'Quel type pour l’argent et pourquoi ?', a: 'En MySQL, DECIMAL convient aux décimaux exacts ; le parc SQLite stocke les francs entiers en INTEGER.' },
      { q: 'Différence entre CHAR(x) et VARCHAR(x) ?', a: 'En MySQL, CHAR est fixe et VARCHAR variable ; SQLite leur donne une affinité texte sans imposer cette longueur.' },
      { q: 'Comment le parc SQLite représente-t-il datecirc ?', a: 'En TEXT au format \'AAAA-MM-JJ\', ou NULL si la date est inconnue.' },
      { q: 'Que devient une colonne absente d’un INSERT ?', a: 'En SQLite, elle reçoit son DEFAULT ou NULL, sauf erreur de contrainte NOT NULL. Dans une table ordinaire, une INTEGER PRIMARY KEY omise peut être générée.' },
      { q: 'À quoi sert TINYINT en MySQL ?', a: 'À stocker un petit entier : de −128 à 127 en version signée. SQLite donne à TINYINT une affinité INTEGER sans imposer cette plage.' },
      { q: 'Quelle différence entre DATE et DATETIME en MySQL ?', a: 'DATE représente une date ; DATETIME ajoute l’heure. Dans notre parc SQLite, datecirc est un texte AAAA-MM-JJ.' },
      { q: 'À quoi sert CREATE TABLE ?', a: 'À créer une table en définissant ses colonnes, leurs types et leurs contraintes, par exemple NOT NULL et PRIMARY KEY.' }
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
          '<code>SELECT pxachat AS prix FROM Voiture;</code> affiche « prix » en tête de colonne. Un alias de lisibilité, ' +
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
          '<p>Deux pièges de la clause : utilisez des <strong>apostrophes simples</strong> pour les ' +
          'chaînes (<code>\'DIESEL\'</code>). Le SQLite fourni accepte aussi certains textes entre ' +
          'guillemets doubles par compatibilité lorsqu’ils ne désignent pas une colonne : ne comptez pas ' +
          'sur ce comportement. Pour tester une valeur absente, utilisez <code>IS NULL</code> : ' +
          '<code>= NULL</code> ne renvoie pas vrai.</p>',
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
          '<p>Le troisième exemple trie par marque puis, <strong>à l’intérieur de chaque marque</strong>, par ' +
          'date : c’est la lecture des tris multi-colonnes. Sans précision, l’ordre est croissant (ASC).</p>'
        ].join('\n')
      },
      {
        title: 'LIMIT : restreindre le nombre de lignes',
        html: [
          '<p>Une requête peut ramener des milliers de lignes quand on n’en veut que cinq. La clause ' +
          '<code>LIMIT</code> borne le résultat :</p>',
          '<pre><code>SELECT immat, pxachat FROM Voiture\n' +
          'ORDER BY pxachat DESC, immat ASC\n' +
          'LIMIT 3;                    -- les 3 voitures les plus chères\n' +
          '\n' +
          'SELECT * FROM Voiture ORDER BY immat LIMIT 5 OFFSET 10;   -- 5 lignes à partir de la 11e</code></pre>',
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
      { stem: 'Comment tester une valeur NULL dans WHERE ?', opts: ['= NULL', 'IS NULL', '== NULL'], correct: 1, exp: 'Parmi ces propositions, IS NULL teste l’absence de valeur ; les comparaisons = NULL et == NULL ne renvoient pas vrai.' },
      { stem: 'Dans LIKE \'%AK\', que remplace % ?', opts: ['Exactement un caractère', 'N’importe quelle suite de caractères', 'Un chiffre'], correct: 1, exp: '% = toute suite (même vide) ; _ remplace exactement un caractère.' },
      { stem: 'ORDER BY marque, datecirc trie…', opts: ['par marque seulement', 'par date seulement', 'par marque puis par date à l’intérieur de chaque marque'], correct: 2, exp: 'Les tris multi-colonnes s’appliquent de gauche à droite, par niveaux.' },
      { stem: 'Dans SQLite, où place-t-on LIMIT si la requête contient ORDER BY ?', opts: ['Juste après SELECT', 'Après ORDER BY, en dernière clause', 'Avant WHERE'], correct: 1, exp: 'Dans cette forme, LIMIT suit ORDER BY et clôt la requête.' },
      { stem: 'Quelle écriture standard est recommandée pour une chaîne SQL ?', opts: ['"DIESEL"', '\'DIESEL\'', '`DIESEL`'], correct: 1, exp: 'Les apostrophes simples délimitent une chaîne. SQLite peut aussi accepter les guillemets doubles par compatibilité, mais ce n’est pas la forme standard.' }
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
      { cls: 'low', text: '&lt; 50 % — Refaites les requêtes du support dans le simulateur, une par une.' },
      { cls: 'mid', text: '50–69 % — Écrivez « diesels avant 2015, du plus ancien au plus récent » sans aide.' },
      { cls: 'good', text: '70–94 % — Solide : ajoute le classement des 3 voitures les plus chères.' },
      { cls: 'top', text: '≥ 95 % — Maîtrise : passe au chapitre 4, les jointures.' }
    ],

    flashcards: [
      { q: 'Ordre fixe des clauses d’un SELECT ?', a: 'SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT.' },
      { q: 'Comment teste-t-on NULL ?', a: 'IS NULL ou IS NOT NULL — jamais = NULL.' },
      { q: 'Que font % et _ dans LIKE ?', a: '% remplace toute suite de caractères, _ exactement un caractère.' },
      { q: 'Que fait ORDER BY a, b DESC ?', a: 'Trie par a croissant puis, à l’intérieur, par b décroissant.' },
      { q: 'Que fait DISTINCT dans un SELECT ?', a: 'Il retire les doublons du résultat : <code>SELECT DISTINCT paysmarque FROM Marque;</code> affiche chaque pays une seule fois.' }
    ]
  }
];

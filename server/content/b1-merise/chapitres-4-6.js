/**
 * Chapitres 4 à 6 du cours de Modélisation (MERISE) B1.
 *
 * Chapitre 4 : le modèle conceptuel des données (MCD).
 * Chapitre 5 : le modèle logique des données (MLD relationnel).
 * Chapitre 6 : la normalisation du MLD (1FN, 2FN, 3FN).
 *
 * Les ateliers de code (trois exercices Bash par chapitre) sont injectés avant
 * le QCM par `scripts/generate-code-labs.js` à partir de
 * `server/exercises/b1-merise.js`.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = [
  /* ==================== Chapitre 4 ==================== */
  {
    n: 4,
    title: 'Le modèle conceptuel des données (MCD)',
    short: 'Le MCD',
    toc: 'Entités, associations, cardinalités ; le formalisme entité-association ; l\'application facture.',
    time: '≈ 2 h de travail',

    situation:
      'Le dictionnaire est plein de propriétés, mais rien ne dit encore qui est lié à qui. Le MCD ' +
      'organise ces propriétés en entités (Client, Produit, Facture) reliées par des associations ' +
      'portées par des cardinalités. C\'est la pièce maîtresse de MERISE — et la réponse attendue à ' +
      'l\'application TogoMall du support.',

    objectives: [
      'définir entité, occurrence, association et propriété dans le formalisme entité-association ;',
      'choisir un identifiant stable, minimal et univalué ;',
      'poser les cardinalités (min,max) correctes des deux côtés d\'une association ;',
      'distinguer association hiérarchique et association porteuse de données.'
    ],

    sections: [
      {
        title: 'Entités, associations, cardinalités',
        html: [
          '<p>Le MCD — encore appelé <strong>Modèle Entité-Association</strong> (MEA) — met en œuvre ' +
          'trois concepts : l\'<strong>entité</strong> (la représentation d\'un objet ayant une existence ' +
          'propre conforme aux choix de gestion : Client, Produit), l\'<strong>association</strong> (le lien ' +
          'sémantique entre entités : Commander, Fournir) et la <strong>propriété</strong> (ce qui décrit ' +
          'les entités). Une <strong>occurrence</strong> est un élément individualisé d\'une entité : ' +
          '« Kossi » est une occurrence de Client.</p>',
          '<p>L\'<strong>identifiant</strong> d\'une entité est la ou les propriétés qui distinguent chaque ' +
          'occurrence : il doit être <strong>stable</strong>, <strong>minimal</strong> et ' +
          '<strong>univalué</strong>. Identifiant simple (une propriété : NumClt) ou composé (plusieurs : ' +
          'NumCde + RefPdt pour une ligne de commande).</p>',
          '<p>Les <strong>cardinalités</strong> se posent de chaque côté de l\'association, au format ' +
          '(min,max) : 0,1 (au plus une), 1,1 (exactement une), 0,n (plusieurs, éventuellement aucune), ' +
          '1,n (plusieurs, au moins une). « Un client peut recevoir plusieurs factures mais n\'existe comme ' +
          'client qu\'à partir de sa première facture » se traduit côté Client : 1,n — côté Facture : 1,1 ' +
          '(une facture concerne un et un seul client).</p>',
          '<pre><code>CLIENT                      PRODUIT\n',
          'NumClt      0,n     Commander      1,n\n',
          'NomClt  ----( Commander )----  NumPrdt\n',
          'AdrClt         (QteCdée)     PrixPrdt\n',
          'TelClt\n',
          '\n',
          'association hiérarchique : aucune donnée portée\n',
          'association porteuse     : des données (QteCdée, Montant...)</code></pre>',
          box('mnemo', 'Mnémotechnique — « lire la cardinalité depuis l\'entité »', 'pin',
            '    <p>La cardinalité se lit <strong>depuis l\'entité qu\'elle orne</strong> : côté Client, ' +
            '(0,n) Commander signifie « un client commande zéro ou plusieurs produits ». En examen, pose ' +
            'toujours les deux extrémités et vérifie-les avec une phrase du métier.</p>')
        ].join('\n')
      },
      {
        title: 'Construire un MCD : l\'application facture',
        html: [
          '<p>Méthode du support : partir des règles de gestion, les traduire en cardinalités, puis dessiner. ' +
          'Application TogoMall : « un client est considéré comme tel à partir de sa première facture » et ' +
          '« une facture concerne un et un seul client ».</p>',
          '<p>Traduction : CLIENT <strong>1,1 — émettre — 1,n</strong> FACTURE. Le côté facture porte 1,1 ' +
          '(une facture a exactement un client) ; le côté client porte 1,n (un client a au moins une ' +
          'facture — c\'est ce qui le définit). Si l\'énoncé disait « un prospect peut exister sans facture », ' +
          'le min passerait à 0 : 0,n.</p>',
          '<p>Vérifications systématiques avant de rendre le schéma : chaque entité a un identifiant ; ' +
          'chaque association porteuse liste ses données (Qté commandée, montant) ; les associations ' +
          'hiérarchiques (Appartenir entre Produit et Catégorie) ne portent rien ; aucune donnée ne ' +
          'apparaît deux fois ; les cardinalités se justifient chacune par une phrase du métier.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Cardinalité posée du mauvais côté : elle se lit depuis l\'entité qu\'elle orne.</li>\n' +
            '      <li>Identifiant instable (un numéro de téléphone) ou non univalué : il ne distingue plus les occurrences.</li>\n' +
            '      <li>Données portées sur une association hiérarchique : Appartenir ne porte rien, Commander porte QtéCdée.</li>\n' +
            '      <li>Entité sans identifiant : toute entité du MCD en possède un, sans exception.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Une occurrence d\'entité, c\'est…', opts: ['une entité parmi d\'autres', 'un élément individualisé de l\'entité', 'une association'], correct: 1, exp: '« Kossi » est une occurrence de l\'entité Client.' },
      { q: 'Un identifiant doit être…', opts: ['stable, minimal, univalué', 'long, chiffré, secret', 'numérique et daté'], correct: 0, exp: 'Stable (ne change pas), minimal (le moins de propriétés), univalué (une valeur par occurrence).' },
      { q: '(0,n) côté Client sur Commander signifie…', opts: ['un client commande au moins un produit', 'un client commande zéro ou plusieurs produits', 'un produit a plusieurs clients'], correct: 1, exp: 'La cardinalité se lit depuis l\'entité qu\'elle orne : zéro à plusieurs.' },
      { q: '« Une facture concerne un et un seul client » se traduit par…', opts: ['1,n côté Facture', '1,1 côté Facture', '0,1 côté Facture'], correct: 1, exp: 'Exactement un client par facture : (1,1).' },
      { q: '« Un client existe dès sa première facture » donne côté Client…', opts: ['0,n', '1,n', '1,1'], correct: 1, exp: 'Au moins une facture : min = 1 ; plusieurs possibles : max = n.' },
      { q: 'L\'association Commander porte QtéCdée : elle est…', opts: ['hiérarchique', 'porteuse', 'réflexive'], correct: 1, exp: 'Une association avec des données portées est non hiérarchique (porteuse).' },
      { q: 'Appartenir (Produit — Catégorie) sans donnée portée est…', opts: ['hiérarchique', 'porteuse', 'invalide'], correct: 0, exp: 'Sans donnée portée, l\'association est hiérarchique.' },
      { q: 'Un identifiant composé est…', opts: ['interdit', 'constitué de plusieurs propriétés élémentaires', 'une clé étrangère'], correct: 1, exp: 'Plusieurs propriétés élémentaires forment ensemble l\'identifiant (NumCde + RefPdt).' }
    ],

    pitfalls: [
      'Poser (1,1) côté client quand l\'énoncé dit « un et un seul client par facture » : le (1,1) est côté facture.',
      'Oublier le min de la cardinalité : (n) seul ne veut rien dire, il faut (min,max).',
      'Porter des données sur une association hiérarchique ou inversement.',
      'Choisir un identifiant mutable (téléphone, e-mail) : il doit rester stable.'
    ],

    methodTitle: 'Méthode — du texte au MCD',
    method: [
      'Souligner les noms (entités candidates) et les verbes (associations candidates) de l\'énoncé.',
      'Écrire chaque règle de gestion et la traduire en deux cardinalités (une par extrémité).',
      'Affecter les propriétés du dictionnaire aux entités ; les données entre deux entités vont sur l\'association.',
      'Vérifier : identifiants présents, données portées cohérentes, chaque cardinalité justifiée par une phrase.'
    ],

    summary: [
      'Le MCD (MEA) organise propriétés en entités reliées par des associations.',
      'Identifiant : stable, minimal, univalué ; simple ou composé.',
      'Cardinalités (min,max) : 0,1 ; 1,1 ; 0,n ; 1,n — lues depuis l\'entité qu\'elles ornent.',
      'Association hiérarchique : sans données portées. Porteuse : avec données (Qté, montant).'
    ],

    checklist: [
      'Je sais dessiner un MCD à trois entités et deux associations.',
      'Je sais justifier chaque cardinalité par une phrase du métier.',
      'Je sais distinguer association porteuse et hiérarchique.',
      'Je sais critiquer un identifiant instable.'
    ],

    notions: [
      '<strong>Entité</strong> : objet d\'intérêt avec une existence propre.',
      '<strong>Occurrence</strong> : élément individualisé d\'une entité.',
      '<strong>Association</strong> : lien sémantique entre entités.',
      '<strong>Propriété</strong> : caractéristique décrivant une entité.',
      '<strong>Identifiant</strong> : propriété(s) discriminante(s), stable, minimale, univaluée.',
      '<strong>Cardinalité</strong> : couple (min,max) posé de chaque côté d\'une association.',
      '<strong>Association porteuse</strong> : porte des données (QtéCdée, Montant).',
      '<strong>Association hiérarchique</strong> : ne porte aucune donnée.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends le formalisme entité-association.' },
      { cls: 'mid', text: '50–69 % — refais le MCD Client-Facture et Client-Produit.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible l\'application TogoMall complète.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Les trois concepts du MCD ?', a: 'Entité, association, propriété — avec occurrences et cardinalités.' },
      { q: 'Les trois qualités d\'un identifiant ?', a: 'Stable, minimal, univalué (il distingue chaque occurrence sans ambiguïté).' },
      { q: 'Les quatre cardinalités usuelles ?', a: '(0,1) au plus une ; (1,1) exactement une ; (0,n) zéro à plusieurs ; (1,n) au moins une.' },
      { q: 'Comment se lit une cardinalité ?', a: 'Depuis l\'entité qu\'elle orne : (0,n) sur Commander côté Client = un client commande zéro ou plusieurs produits.' },
      { q: 'Association porteuse vs hiérarchique ?', a: 'Porteuse : elle porte des données (QtéCdée) et deviendra une table au MLD ; hiérarchique : rien à porter.' }
    ]
  },

  /* ==================== Chapitre 5 ==================== */
  {
    n: 5,
    title: 'Le modèle logique des données (MLD relationnel)',
    short: 'Le MLD',
    toc: 'Attributs, tables, clés primaires et étrangères ; les règles de passage du MCD au MLD ; intégrité référentielle.',
    time: '≈ 2 h de travail',

    situation:
      'Le MCD est validé par le métier, mais l\'ordinateur ne comprend pas les bulles et les patates. ' +
      'Le MLD traduit : chaque entité devient une table, chaque association porteuse aussi, et les ' +
      'cardinalités deviennent des clés primaires et étrangères. C\'est la forme machinale du modèle — ' +
      'celle que le SGBD exécutera.',

    objectives: [
      'définir attribut, table (relation), clé primaire et clé étrangère ;',
      'appliquer les règles de passage du MCD au MLD ;',
      'écrire un schéma relationnel en notation textuelle avec les # ;',
      'expliquer les contraintes d\'intégrité de domaine, de relation et référentielle.'
    ],

    sections: [
      {
        title: 'Tables, clés et règles de passage',
        html: [
          '<p>Le <strong>MLD</strong> est la forme machinale du MCD : il s\'appuie sur le modèle ' +
          '<strong>relationnel</strong>. L\'' + '<strong>attribut</strong> est le plus petit élément ' +
          'd\'information manipulable ; la <strong>table</strong> (ou relation) est un ensemble d\'attributs ' +
          'significativement associés ; chaque ligne (tuple) est distinguée par une <strong>clé</strong>.</p>',
          '<p>Deux types de clés : la <strong>clé primaire</strong> (simple ou composée) identifie chaque ' +
          'ligne ; la <strong>clé étrangère</strong> est un attribut qui est clé primaire d\'une autre table ' +
          '— elle porte les liens du système d\'information et se note avec un # :</p>',
          '<pre><code>CLIENT (NumClt, NomClt, AdrClt)\n',
          'COMMANDE (NumCde, DateCde, #NumClt)\n',
          'LIGNE_CDE (#NumCde, #RefPdt, Quantite)</code></pre>',
          '<p>Les règles de passage du MCD au MLD :</p>',
          '<ul>\n' +
          '    <li><strong>Règle 1</strong> : toute entité devient une table ; son identifiant devient clé primaire, ses propriétés deviennent des attributs.</li>\n' +
          '    <li><strong>Règle 2</strong> : toute association non hiérarchique (porteuse, max = n) devient une table ; sa clé primaire est la concaténation des identifiants des entités participantes.</li>\n' +
          '    <li><strong>Règle 3</strong> : toute association hiérarchique avec une cardinalité (0,1) ou (1,1) migre sa clé comme étrangère dans la table côté (0,1)/(1,1) — pas de table nouvelle.</li>\n' +
          '  </ul>',
          box('mnemo', 'Mnémotechnique — « entité = table, porteuse = table, (x,1) = # »', 'pin',
            '    <p>Deux règles créent des tables (entité, association porteuse) ; la troisième déplace une ' +
            'clé. Un # dans le schéma = un lien vers une autre table, donc une intégrité à surveiller.</p>')
        ].join('\n')
      },
      {
        title: 'Les trois intégrités',
        html: [
          '<p>Les contraintes d\'intégrité contrôlent les valeurs prises par les attributs :</p>',
          '<ul>\n' +
          '    <li><strong>Intégrité de domaine</strong> : chaque attribut respecte son domaine de valeurs (une quantité est un entier positif).</li>\n' +
          '    <li><strong>Intégrité de relation</strong> : la clé primaire est unique et non nulle — deux clients ne peuvent porter le même numéro, aucun client ne va sans numéro.</li>\n' +
          '    <li><strong>Intégrité référentielle</strong> : une clé étrangère doit référencer une clé primaire existante — pas de NumClt 25 dans COMMANDE si les clients vont de 1 à 15.</li>\n' +
          '  </ul>',
          '<p>Le MLD peut ensuite être transformé en fichiers et en base de données (MPD) : choix du SGBD, ' +
          'des types SQL, des index. Le schéma relationnel textuel est le document de passage entre ' +
          'l\'analyse et l\'implémentation — celui que le développeur SQL lit.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>Oublier le # sur une clé étrangère : le lien disparaît du schéma.</li>\n' +
            '      <li>Créer une table pour une association hiérarchique (x,1) : sa clé migre comme étrangère, point.</li>\n' +
            '      <li>Confondre intégrité de relation (clé unique) et référentielle (fk existe dans la table référencée).</li>\n' +
            '      <li>MLD ≠ MPD : le MLD est logique (tables), le MPD est physique (SGBD, index, fichiers).</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Le MLD est…', opts: ['la forme machinale du MCD', 'une copie du MCD', 'le modèle physique'], correct: 0, exp: 'Le MCD n\'est pas compréhensible par l\'ordinateur ; le MLD est sa forme machinale (relationnelle).' },
      { q: 'Une clé étrangère est…', opts: ['une clé primaire d\'une autre table', 'un attribut décoratif', 'toujours composée'], correct: 0, exp: 'Elle est clé primaire ailleurs et crée le lien entre les tables.' },
      { q: 'Le symbole # marque…', opts: ['la clé primaire', 'la clé étrangère', 'un commentaire'], correct: 1, exp: 'COMMANDE (NumCde, DateCde, #NumClt) : NumClt référence CLIENT.' },
      { q: 'Règle 1 du passage MCD → MLD :', opts: ['toute entité devient une table', 'toute association devient une table', 'rien ne change'], correct: 0, exp: 'L\'identifiant devient clé primaire, les propriétés deviennent attributs.' },
      { q: 'Une association porteuse (max n) devient…', opts: ['une table dont la clé est la concaténation des identifiants', 'un attribut', 'une vue'], correct: 0, exp: 'Règle 2 : clé primaire = concaténation des identifiants des entités participantes.' },
      { q: 'Une association hiérarchique (0,1)…', opts: ['devient une table', 'migre sa clé comme étrangère', 'disparaît sans trace'], correct: 1, exp: 'Sa clé devient étrangère dans la table côté (0,1)/(1,1) : pas de table nouvelle.' },
      { q: 'L\'intégrité référentielle impose…', opts: ['que la fk référence une pk existante', 'que la table soit triée', 'que les champs soient textes'], correct: 0, exp: 'Pas de NumClt 25 si les clients s\'arrêtent à 15.' },
      { q: 'L\'intégrité de relation impose…', opts: ['clé primaire unique et non nulle', 'une fk par table', 'des index partout'], correct: 0, exp: 'Pas de doublon de clé, pas de ligne sans clé.' }
    ],

    pitfalls: [
      'Écrire le schéma sans les # : les liens sont invisibles pour le lecteur.',
      'Donner une clé primaire composée à une table qui n\'en a pas besoin (ou l\'inverse).',
      'Créer une table pour chaque association, même hiérarchique : les règles de passage existent.',
      'Confondre MLD et MPD : logique ≠ physique.'
    ],

    methodTitle: 'Méthode — du MCD au schéma',
    method: [
      'Une table par entité (règle 1) : clé primaire = identifiant.',
      'Une table par association porteuse (règle 2) : clé = concaténation des identifiants.',
      'Les associations (0,1)/(1,1) migrent leur clé en # (règle 3).',
      'Vérifier les trois intégrités sur le schéma final.'
    ],

    summary: [
      'MLD = forme machinale du MCD, en tables relationnelles.',
      'Clé primaire (simple ou composée) identifie chaque ligne ; clé étrangère (#) porte le lien.',
      'Règles de passage : entité → table ; association porteuse → table (clé concaténée) ; (0,1)/(1,1) → #.',
      'Trois intégrités : de domaine, de relation (pk unique non nulle), référentielle (fk → pk existante).'
    ],

    checklist: [
      'Je sais écrire CLIENT (NumClt, NomClt) et COMMANDE (NumCde, #NumClt).',
      'Je sais appliquer les trois règles de passage sur un MCD à trois entités.',
      'Je sais citer et illustrer les trois intégrités.',
      'Je sais dire ce qui distingue MLD et MPD.'
    ],

    notions: [
      '<strong>Attribut</strong> : plus petit élément d\'information manipulable.',
      '<strong>Table (relation)</strong> : ensemble d\'attributs significativement associés.',
      '<strong>Clé primaire</strong> : identifie chaque ligne, simple ou composée.',
      '<strong>Clé étrangère</strong> : pk d\'une autre table, notée #.',
      '<strong>Règle 1</strong> : entité → table.',
      '<strong>Règle 2</strong> : association porteuse → table, clé concaténée.',
      '<strong>Intégrité de relation</strong> : pk unique et non nulle.',
      '<strong>Intégrité référentielle</strong> : fk référence une pk existante.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends clés primaire/étrangère et les règles de passage.' },
      { cls: 'mid', text: '50–69 % — refais le passage MCD → MLD de la facture.' },
      { cls: 'good', text: '70–89 % — bon niveau, cible les trois intégrités.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'MLD vs MCD ?', a: 'Le MCD est conceptuel (bulles et associations) ; le MLD est sa forme machinale : tables relationnelles compréhensibles par le SGBD.' },
      { q: 'Les deux types de clés ?', a: 'Clé primaire (identifie la ligne, simple ou composée) ; clé étrangère (pk d\'une autre table, notée #).' },
      { q: 'Les règles de passage MCD → MLD ?', a: '1) entité → table. 2) association porteuse → table (clé = concaténation des identifiants). 3) association (0,1)/(1,1) → clé étrangère.' },
      { q: 'Les trois intégrités ?', a: 'De domaine (valeurs admises), de relation (pk unique non nulle), référentielle (fk existe comme pk dans la table référencée).' },
      { q: 'Écrire le schéma de la commande ?', a: 'COMMANDE (NumCde, DateCde, #NumClt) : NumCde pk, NumClt fk vers CLIENT.' }
    ]
  },

  /* ==================== Chapitre 6 ==================== */
  {
    n: 6,
    title: 'La normalisation du MLD : 1FN, 2FN, 3FN',
    short: 'Normalisation',
    toc: 'Anomalies d\'une base non normalisée ; formes normales 1FN, 2FN, 3FN ; dépendances partielles et transitives.',
    time: '≈ 2 h de travail',

    situation:
      'Le schéma est écrit, mais une même adresse se répète dix fois et une modification en oublie la ' +
      'moitié. La normalisation vérifie le MLD avec trois formes normales fondées sur les dépendances ' +
      'fonctionnelles : éliminer les redondances, donc les anomalies de mise à jour, d\'insertion et de ' +
      'suppression.',

    objectives: [
      'citer les anomalies d\'un schéma non normalisé (redondance, mise à jour, insertion, suppression) ;',
      'vérifier la 1FN : clé, attributs monovalués, non décomposables ;',
      'détecter une dépendance partielle (2FN) et une dépendance transitive (3FN) ;',
      'normaliser un schéma en décomposant les tables fautives.'
    ],

    sections: [
      {
        title: 'Pourquoi normaliser',
        html: [
          '<p>Le support le montre avec FOURNISSEUR (NomFournisseur, AdresseFournisseur, Produits, Prix) : ' +
          'pas de clé primaire (deux « Dupont » : même personne ou pas ?), adresse non décomposée ' +
          '(impossible de chercher par ville), plusieurs produits par fournisseur — donc adresse dupliquée ' +
          'dans chaque ligne.</p>',
          '<p>Résultat : <strong>redondance</strong> (la même adresse mille fois), <strong>anomalie de mise ' +
          'à jour</strong> (changer l\'adresse oblige à retoucher toutes les lignes), <strong>anomalie ' +
          'd\'insertion</strong> (ajouter un produit force à ressaisir l\'adresse), <strong>anomalie de ' +
          'suppression</strong> (supprimer le dernier produit efface le fournisseur).</p>',
          '<p>La normalisation élimine les redondances : base plus petite, moins de risques d\'incohérence, ' +
          'pas de mise à jour multiple des mêmes données. Les formes normales s\'appuient sur les ' +
          '<strong>dépendances fonctionnelles</strong> établies au chapitre 3.</p>',
          box('mnemo', 'Mnémotechnique — « la clé, toute la clé, rien que la clé »', 'pin',
            '    <p>1FN : des attributs atomiques sous une vraie clé. 2FN : tout dépend de <strong>toute la ' +
            'clé</strong> (pas de partie). 3FN : rien que la clé — aucune dépendance transitive vers un ' +
            'attribut non clé.</p>')
        ].join('\n')
      },
      {
        title: 'Les trois formes normales',
        html: [
          '<p><strong>1FN</strong> : la relation possède une clé identifiant chaque ligne de manière unique ' +
          'et stable ; chaque attribut est <strong>monovalué</strong> ; aucun attribut n\'est décomposable ' +
          'en plusieurs attributs significatifs. Contre-exemple du support : EMPLOYE (Nom, Prénom, Enfants, ' +
          'Diplômes) — plusieurs enfants, plusieurs diplômes, et Enfants décomposable en Prénom + Année.</p>',
          '<p><strong>2FN</strong> : être en 1FN et tout attribut non clé <strong>totalement dépendant de ' +
          'toute la clé</strong>. Elle ne se vérifie que pour les clés composées : une relation en 1FN à clé ' +
          'simple est toujours en 2FN. Contre-exemple : LIGNE_CDE (#NumCde, #RefPdt, DesignationPdt, ' +
          'Quantite) — DesignationPdt ne dépend que de RefPdt, pas de toute la clé : dépendance ' +
          '<strong>partielle</strong>. Correction : sortir (RefPdt, DesignationPdt) dans une table PRODUIT.</p>',
          '<p><strong>3FN</strong> : être en 2FN et tout attribut dépendre <strong>directement de la ' +
          'clé</strong> — aucune dépendance par <strong>transitivité</strong>. Contre-exemple : CLIENT ' +
          '(Num_client, Nom_client, code_categ, nom_categ) — Num_client → code_categ → nom_categ : ' +
          'nom_categ dépend d\'un attribut non clé. Correction : sortir (code_categ, nom_categ) dans une ' +
          'table CATEGORIE.</p>',
          box('pitfall', 'Confusions d\'examen', 'warning',
            '    <ul>\n' +
            '      <li>La 2FN ne concerne que les clés composées : à clé simple, 1FN implique 2FN.</li>\n' +
            '      <li>Dépendance partielle ≠ transitive : partielle = une partie de la clé ; transitive = un attribut non clé qui en détermine un autre.</li>\n' +
            '      <li>Normaliser ne supprime pas l\'information : ça la déplace dans une autre table (avec sa clé).</li>\n' +
            '      <li>Une propriété calculée (TTC) dans une table viole l\'esprit des formes normales : elle se recalcule.</li>\n' +
            '    </ul>')
        ].join('\n')
      }
    ],

    questions: [
      { q: 'Une base non normalisée souffre surtout de…', opts: ['redondances et anomalies de mise à jour', 'trop de tables', 'manque de utilisateurs'], correct: 0, exp: 'Redondance, anomalies d\'insertion, de mise à jour et de suppression.' },
      { q: 'La 1FN exige…', opts: ['une clé et des attributs monovalués non décomposables', 'trois tables minimum', 'des clés étrangères'], correct: 0, exp: 'Clé unique et stable, attributs atomiques.' },
      { q: 'EMPLOYE (Nom, Prénom, Enfants, Diplômes) viole…', opts: ['la 1FN', 'la 2FN seulement', 'rien'], correct: 0, exp: 'Enfants et Diplômes sont multivalués et décomposables : pas en 1FN.' },
      { q: 'La 2FN se vérifie seulement si…', opts: ['la clé est composée', 'la table a des fk', 'la base est petite'], correct: 0, exp: 'À clé simple, la 1FN implique déjà la 2FN.' },
      { q: 'DesignationPdt ne dépend que de RefPdt dans LIGNE_CDE : c\'est…', opts: ['une dépendance partielle', 'une dépendance transitive', 'une CIF'], correct: 0, exp: 'Un attribut dépend d\'une partie de la clé composée : 2FN violée.' },
      { q: 'Num_client → code_categ → nom_categ : c\'est…', opts: ['une dépendance transitive', 'une dépendance partielle', 'une intégrité de domaine'], correct: 0, exp: 'nom_categ dépend d\'un attribut non clé (code_categ) : 3FN violée.' },
      { q: 'Le remède à la 3FN violée est…', opts: ['sortir l\'attribut transitif dans sa table', 'dupliquer la colonne', 'supprimer la clé'], correct: 0, exp: 'Décomposer : (code_categ, nom_categ) devient une table CATEGORIE.' },
      { q: '« La clé, toute la clé, rien que la clé » résume…', opts: ['1FN, 2FN, 3FN', 'les trois intégrités', 'les trois sous-systèmes'], correct: 0, exp: 'Clé (1FN), toute la clé (2FN, pas de dépendance partielle), rien que la clé (3FN, pas de transitive).' }
    ],

    pitfalls: [
      'Vérifier la 2FN sur une clé simple : inutile, la 1FN la donne déjà.',
      'Confondre partielle (partie de clé) et transitive (attribut non clé).',
      'Garder une propriété calculée dans la table : le TTC se recalcule.',
      'Normaliser sans conserver les liens : la table sortie garde sa clé, référencée par la table d\'origine.'
    ],

    methodTitle: 'Méthode — vérifier un schéma en trois passes',
    method: [
      '1FN : y a-t-il une clé ? Des attributs multivalués ou décomposables ?',
      '2FN (clé composée) : chaque attribut non clé dépend-il de toute la clé ?',
      '3FN : chaque attribut non clé dépend-il directement de la clé (pas via un autre attribut) ?',
      'Décomposer les tables fautives en reportant la clé dans les tables créées.'
    ],

    summary: [
      'Anomalies d\'un schéma non normalisé : redondance, mise à jour multiple, insertion, suppression.',
      '1FN : clé unique et stable, attributs monovalués, non décomposables.',
      '2FN : tout attribut non clé dépend de toute la clé (à vérifier sur clé composée).',
      '3FN : aucun attribut ne dépend d\'un attribut non clé (pas de transitivité).'
    ],

    checklist: [
      'Je sais citer les quatre anomalies avec un exemple.',
      'Je sais vérifier 1FN, 2FN, 3FN sur un schéma donné.',
      'Je sais normaliser LIGNE_CDE et CLIENT (code_categ).',
      'Je sais réciter « la clé, toute la clé, rien que la clé ».'
    ],

    notions: [
      '<strong>Redondance</strong> : même information répétée dans plusieurs lignes.',
      '<strong>Anomalie de mise à jour</strong> : modifier une donnée en plusieurs endroits.',
      '<strong>1FN</strong> : clé + attributs monovalués et non décomposables.',
      '<strong>2FN</strong> : 1FN + pas de dépendance partielle (clé composée).',
      '<strong>3FN</strong> : 2FN + pas de dépendance transitive.',
      '<strong>Dépendance partielle</strong> : attribut dépendant d\'une partie de la clé.',
      '<strong>Dépendance transitive</strong> : clé → A → B, B dépend d\'un non-clé.',
      '<strong>Décomposition</strong> : sortir les attributs fautifs dans une nouvelle table.'
    ],

    mastery: [
      { cls: 'low', text: '&lt; 50 % — reprends les anomalies et la 1FN.' },
      { cls: 'mid', text: '50–69 % — refais les contre-exemples du support (EMPLOYE, LIGNE_CDE, CLIENT).' },
      { cls: 'good', text: '70–89 % — bon niveau, cible la distinction partielle/transitive.' },
      { cls: 'top', text: '≥ 95 % — niveau de maîtrise recherché.' }
    ],

    flashcards: [
      { q: 'Pourquoi normaliser ?', a: 'Éliminer les redondances : base plus petite, moins d\'incohérences, pas de mise à jour multiple ; et éviter les anomalies d\'insertion et de suppression.' },
      { q: 'Les conditions de la 1FN ?', a: 'Une clé unique et stable, des attributs monovalués, aucun attribut décomposable.' },
      { q: 'Quand vérifier la 2FN ?', a: 'Seulement pour les clés composées : tout attribut non clé doit dépendre de toute la clé (à clé simple, 1FN implique 2FN).' },
      { q: 'Qu\'est-ce qu\'une dépendance transitive ?', a: 'Num → code_categ → nom_categ : un attribut dépend d\'un autre attribut non clé ; 3FN violée, on décompose en CATEGORIE.' },
      { q: 'La devise des formes normales ?', a: '« La clé, toute la clé, rien que la clé » : 1FN, 2FN, 3FN.' }
    ]
  }
];

/**
 * Pages « examens blancs » et « exercices & projet » du cours « ERP & SI » B2.
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : Fondements du SI, BPMN & Architecture d’Intégration',
      intro: 'Sujet théorique et pratique : analyse organisationnelle, modélisation de workflows et topologies d’intégration applicative.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Rôle & Définition de l’ERP',
          text: 'Définissez un Progiciel de Gestion Intégré (ERP) à travers ses trois caractéristiques fondamentales. En quoi résout-il le problème des silos informationnels ?',
          sol: 'Un ERP se caractérise par : (1) <strong>Une base de données unique et centralisée</strong> éliminant les redondances ; (2) <strong>Des modules fonctionnels intégrés</strong> (finance, stocks, ventes, RH) partageant les mêmes référentiels ; (3) <strong>Un moteur de workflow</strong> synchronisant en temps réel les flux d’information, physiques et financiers. Il élimine les <em>silos informationnels</em> en assurant qu’une saisie unique (ex. une vente) met immédiatement à jour les stocks et génère l’écriture comptable sans ressaisie.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Modélisation BPMN 2.0',
          text: 'Quelle est la différence sémantique entre une passerelle exclusive (XOR) et une passerelle parallèle (AND) ? Pourquoi utilise-t-on des Pools et des Lanes ?',
          sol: 'Une passerelle <strong>XOR</strong> active un seul et unique chemin de sortie selon une condition logique. Une passerelle <strong>AND</strong> synchronise ou déclenche l’exécution simultanée de toutes ses branches sans condition. Les <strong>Pools</strong> représentent des organisations ou entités juridiques distinctes (ex. Client vs Entreprise), tandis que les <strong>Lanes</strong> subdivisent un Pool pour affecter les tâches aux services ou rôles internes (ex. Commercial, Magasinier, Comptable).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Topologies d’intégration de données',
          text: 'Comparez l’intégration Point-à-Point et l’intégration par Bus de services (ESB) pour une entreprise possédant 10 applications hétérogènes. Calculez le nombre d’interfaces nécessaires dans chaque cas.',
          sol: 'En intégration Point-à-point, le nombre de connecteurs requis est <code>N * (N - 1) / 2 = 10 * 9 / 2 = 45 interfaces</code> bilatérales, générant un couplage fort et une maintenance ingérable (effet plat de spaghetti). Avec un <strong>ESB</strong> (Enterprise Service Bus), chaque application ne développe qu’une seule interface vers le bus (soit <code>10 interfaces</code> au total). L’ESB assure le routage, la médiation et la transformation des formats pivots de manière découplée.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : ETL vs ELT',
          text: 'Quelle est la différence fondamentale entre les architectures ETL et ELT ? Quel paradigme est privilégié avec les Cloud Data Warehouses modernes ?',
          sol: 'Dans un <strong>ETL</strong> classique, les données sont extraites, transformées sur un serveur dédié de traitement intermédiaire, puis chargées dans la cible. Dans un <strong>ELT</strong>, les données brutes sont extraites et chargées directement dans l’entrepôt de données (Data Warehouse), puis les transformations sont exécutées nativement par la puissance de calcul parallèle du Cloud Data Warehouse (ex. BigQuery, Snowflake). L’ELT est aujourd’hui privilégié pour sa rapidité et sa flexibilité.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : Processus métiers, Gestion des stocks & Risques projet',
      intro: 'Sujet d’approfondissement : audit de processus, calculs de gestion des stocks et conduite de déploiement ERP.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Three-Way Matching & Sécurisation P2P',
          text: 'Décrivez précisément le mécanisme du Three-Way Matching dans le cycle Procure-to-Pay. Quels risques financiers prévient-il ?',
          sol: 'Le <strong>Three-Way Matching</strong> est un contrôle automatisé par l’ERP comparant trois pièces justificatives : (1) Le <strong>Bon de Commande (PO)</strong> émis (quantités et prix négociés) ; (2) Le <strong>Bon de Réception (GR)</strong> signé par l’entrepôt (quantités physiquement reçues) ; (3) La <strong>Facture Fournisseur</strong>. Il bloque automatiquement le paiement si la quantité facturée dépasse la quantité reçue ou si le tarif unitaire dépasse le bon de commande, évitant ainsi de payer pour des livraisons incomplètes ou des erreurs de tarification.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Calcul des Besoins Nets (MRP)',
          text: 'Une usine prévoit un besoin brut de 200 unités d’un composant en semaine 4. Le stock initial est de 50 unités, une livraison de 30 unités est attendue en semaine 2, et le stock de sécurité obligatoire est fixé à 40 unités. Calculez le Besoin Net.',
          sol: 'Formule du Besoin Net : <code>Besoin_Net = max(0, Besoin_Brut - Stock_Initial - Receptions_Prevues + Stock_Securite)</code>.<br>Application numérique : <code>Besoin_Net = max(0, 200 - 50 - 30 + 40) = max(0, 160) = 160 unités</code>. L’ERP devra donc planifier un ordre d’achat ou de fabrication de 160 composants pour la semaine 4.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Valorisation des stocks au CMUP',
          text: 'Un stock initial compte 100 articles valorisés à 20 € l’unité. L’entreprise réceptionne une commande de 50 articles achetés à 26 € l’unité. Calculez le nouveau CMUP.',
          sol: 'Formule : <code>CMUP = ((Stock_anc * CMUP_anc) + (Qté_recue * Prix_achat)) / (Stock_anc + Qté_recue)</code>.<br>Valeur initiale = 100 * 20 = 2 000 €.<br>Valeur entrée = 50 * 26 = 1 300 €.<br>Valeur totale = 3 300 € pour 150 articles.<br><code>Nouveau CMUP = 3 300 / 150 = 22,00 €</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Stratégie de bascule & Matrice des risques',
          text: 'Une entreprise hésite entre une bascule Big Bang et un déploiement progressif par module pour son nouvel ERP. Quels critères doivent orienter sa décision ? Comment calcule-t-on la criticité d’un risque projet ?',
          sol: 'Le <strong>Big Bang</strong> convient si l’interdépendance des modules rend les interfaces temporaires trop coûteuses, mais il comporte un risque opérationnel élevé en cas de défaillance. Le <strong>déploiement progressif</strong> est recommandé pour étaler la charge de travail et la formation, au prix d’une gestion transitoire plus longue. La <strong>criticité</strong> d’un risque s’évalue par : <code>Criticité = Probabilité (1 à 5) * Gravité (1 à 5)</code>. Un risque avec P=4 et G=4 donne une criticité de 16 (zone rouge), nécessitant un plan de contingence immédiat.'
        }
      ]
    }
  ];

  const htmlSujets = sujets.map((sujet) => [
    '  <h2>' + sujet.title + '</h2>',
    '  <p class="lead">' + sujet.intro + '</p>',
    sujet.items.map(item => [
      '  <div class="box box--it">',
      '    <div class="box__title">' + ic('clipboard') + ' ' + item.num + ' <span class="tag tag--time" style="margin-left:auto">' + item.badge + '</span></div>',
      '    <p><strong>Énoncé :</strong> ' + item.text + '</p>',
      '    <details style="margin-top:10px;cursor:pointer"><summary style="font-weight:700;color:var(--__S__-deep)">' + ic('check') + ' Voir le corrigé type</summary>',
      '      <div style="margin-top:10px;padding:12px;background:#fff;border-radius:8px;border:1px solid var(--__S__-bd)">' + item.sol + '</div>',
      '    </details>',
      '  </div>'
    ].join('\n')).join('\n')
  ].join('\n\n')).join('\n\n');

  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Examens' }]),
    '  <h1>Simulateur d’examens blancs</h1>',
    '  <p class="lead">Deux sujets complets notés sur 20 points, fidèles aux épreuves écrites et pratiques ' +
    'de Licence 2 en Systèmes d’Information et ERP. Entraîne-toi en conditions d’examen puis consulte les corrigés détaillés.</p>',
    box('method', 'Conseils méthodologiques pour l’épreuve', 'compass', [
      '    <ul>',
      '      <li><strong>Temps indicatif</strong> : 1 heure 30 par sujet sans document.</li>',
      '      <li><strong>Rigueur du vocabulaire</strong> : employez les termes consacrés (P2P, O2C, Three-Way Matching, BPMN, ESB, CMUP, Capex/Opex, UAT).</li>',
      '      <li><strong>Précision des calculs</strong> : détaillez toujours les formules littérales avant de procéder aux applications numériques.</li>',
      '    </ul>'
    ].join('\n')),
    htmlSujets,
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../atelier.html', label: 'Atelier de code' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Sujets d’examen blanc corrigés pour le cours ERP & Systèmes d’Information B2 : architecture SI, BPMN, intégration, cycles P2P/O2C, MRP, stocks et risques projet.',
      active: 'simulateur',
      body
    }
  };
}

/* ======================== Exercices & Projet ======================== */

function exercices(course) {
  const body = [
    crumb(course, [{ href: '../index.html', label: course.brand }, { href: '../sommaire.html', label: 'Sommaire' }, { label: 'Exercices' }]),
    '  <h1>Exercices pratiques &amp; projet fil conducteur</h1>',
    '  <p class="lead">18 ateliers de programmation Python répartis sur les six chapitres du cours, complétés ' +
    'par le cas pratique guidé d’un déploiement d’ERP pour l’entreprise <strong>TechMeuble SAS</strong>.</p>',

    box('objectifs', 'Le catalogue des 18 exercices Python interactifs', 'target', [
      '    <ul>',
      '      <li><strong>Chapitre 1</strong> : Contrôle d’intégrité d’article, calcul du coût de commande avec TVA, audit de cohérence de commande client.</li>',
      '      <li><strong>Chapitre 2</strong> : Validation de syntaxe BPMN, routage conditionnel de gateway XOR, calcul du temps de traversée d’un workflow.</li>',
      '      <li><strong>Chapitre 3</strong> : Conversion de commande pivot JSON vers XML, agrégation de factures par fournisseur, validation de message EDIFACT ORDERS.</li>',
      '      <li><strong>Chapitre 4</strong> : Algorithme de Three-Way Matching, calcul des besoins nets MRP I, simulation de décrémentation de stock O2C.</li>',
      '      <li><strong>Chapitre 5</strong> : Grand livre et équilibre en partie double, valorisation des stocks au CMUP après entrées, scoring de leads CRM et commissions.</li>',
      '      <li><strong>Chapitre 6</strong> : Modélisation TCO SaaS vs On-Premise sur 5 ans, matrice des risques projet ERP, audit d’urbanisation et interfaces redondantes.</li>',
      '    </ul>',
      '    <p><a class="btn" href="../atelier.html">' + ic('terminal') + ' Ouvrir l’atelier libre</a></p>'
    ].join('\n')),

    '  <h2>Projet fil conducteur : Déploiement ERP chez TechMeuble SAS</h2>',
    '  <p class="lead">Ce projet applique concrètement les démarches du cours pour remplacer le système ' +
    'd’information obsolète d’un fabricant de mobilier de bureau.</p>',

    box('it', 'Phase 1 : Cadrage &amp; Modélisation des flux cibles (BPMN)', 'compass', [
      '    <p>Cartographier le processus de vente en ligne et sur-mesure (Order-to-Cash) :</p>',
      '    <ul>',
      '      <li>Modéliser la collaboration entre le Client, le Service Commercial, la Production et la Logistique.</li>',
      '      <li>Intégrer une passerelle exclusive (XOR) pour vérifier la solvabilité du client avant validation de la commande.</li>',
      '      <li>Définir les déclencheurs d’alertes de stock en cas de rupture sur les panneaux de bois ou ferrures.</li>',
      '    </ul>'
    ].join('\n')),

    box('it', 'Phase 2 : Intégration de données &amp; Schéma pivot', 'code', [
      '    <p>Interconnecter le site e-commerce et le WMS (Warehouse Management System) à l’ERP via un ESB :</p>',
      '    <pre><code># Schéma JSON pivot standardisé pour les commandes entrantes\n{\n  "numero_commande": "CMD-2026-0891",\n  "client_id": "CLI-4402",\n  "date": "2026-10-04T10:00:00Z",\n  "lignes": [\n    {"ref": "BUREAU-ERG-160", "quantite": 2, "prix_unitaire_ht": 350.0}\n  ],\n  "total_ht": 700.0,\n  "tva_taux": 20.0,\n  "total_ttc": 840.0\n}</code></pre>'
    ].join('\n')),

    box('it', 'Phase 3 : Automatisation du Three-Way Matching', 'wrench', [
      '    <p>Implémenter la règle de réconciliation pour autoriser le paiement des factures fournisseurs :</p>',
      '    <pre><code>def reconcilier_facture(po, gr, facture):\n    if facture["montant_ttc"] &gt; po["montant_ttc"]:\n        return "BLOCAGE_PRIX"\n    if facture["quantite"] &gt; gr["quantite_recue"]:\n        return "BLOCAGE_QUANTITE"\n    return "BON_A_PAYER"</code></pre>'
    ].join('\n')),

    box('it', 'Phase 4 : Planification de production &amp; Calcul des Besoins Nets', 'play', [
      '    <p>Paramétrer l’algorithme MRP pour anticiper les approvisionnements de matières premières à partir des prévisions de vente du CRM et des délais fournisseurs (Lead Times).</p>'
    ].join('\n')),

    box('it', 'Phase 5 : Gestion des risques &amp; Bascule Go-Live', 'alert', [
      '    <p>Établir la matrice des risques d’implémentation :</p>',
      '    <ul>',
      '      <li><strong>Risque identifié</strong> : rejet du nouveau logiciel par les opérateurs d’entrepôt (P=4, G=4 &rarr; Criticité 16).</li>',
      '      <li><strong>Action préventive</strong> : intégrer des Key Users dès les phases de test UAT et doubler les sessions de formation sur terminal mobile.</li>',
      '      <li><strong>Choix de bascule</strong> : déploiement en Phasing (d’abord le siège et les finances, puis les ateliers de production trois mois plus tard).</li>',
      '    </ul>'
    ].join('\n')),

    chnav({ href: '../chapitres/formules.html', label: 'Mémo ERP &amp; SI' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices & projet — ' + course.brand,
      description: 'Catalogue des 18 exercices et cahier des charges du projet ERP TechMeuble pour le cours ERP & Systèmes d’Information B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

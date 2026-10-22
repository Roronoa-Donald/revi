/**
 * Chapitre 4 du cours « ERP & SI » B2 — Processus métiers & Cycles ERP.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Processus métiers & Cycles ERP',
  short: 'Processus & Cycles',
  toc: 'Chaîne de valeur de Porter, cycle Procure-to-Pay (P2P), cycle Order-to-Cash (O2C), Record-to-Report (R2R) et calcul des besoins MRP.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'L’entreprise ne fonctionne pas en départements cloisonnés mais en cycles transverses continus. ' +
    'De la réception d’une commande client jusqu’à l’encaissement en banque, ou du besoin de matière première ' +
    'jusqu’au paiement fournisseur, l’ERP synchronise les trois flux vitaux : flux physique, flux d’information et flux financier.',

  objectives: [
    'analyser la chaîne de valeur de Michael Porter et distinguer activités principales et de soutien ;',
    'maîtriser le déroulement complet du cycle Procure-to-Pay (P2P / Achats) ;',
    'maîtriser le déroulement complet du cycle Order-to-Cash (O2C / Ventes) ;',
    'comprendre le rôle du rapprochement à trois voies (Three-Way Matching) ;',
    'assimiler la logique de planification de production et le calcul des besoins nets (MRP).'
  ],

  sections: [
    {
      title: 'La chaîne de valeur de l’entreprise et les processus transverses',
      html: [
        '<p>Théorisée par <strong>Michael Porter</strong>, la <strong>chaîne de valeur</strong> décompose ' +
        'l’entreprise en un ensemble d’activités interdépendantes créatrices de valeur pour le client :</p>',
        '<ul>\n' +
        '  <li><strong>Activités principales</strong> : Logistique entrante &rarr; Production / Opérations &rarr; ' +
        'Logistique sortante &rarr; Commercialisation &amp; Vente &rarr; Services après-vente.</li>\n' +
        '  <li><strong>Activités de soutien</strong> : Infrastructure de l’entreprise (Direction, Juridique), ' +
        'Gestion des Ressources Humaines (GRH), Développement technologique (R&amp;D, SI) et Approvisionnements (Achats).</li>\n' +
        '</ul>',
        box('intuition', 'Les trois flux synchronisés par l’ERP', 'lightbulb',
          '    <p>À chaque étape d’un processus métier, l’ERP réconcilie simultanément :</p>\n' +
          '    <ol>\n' +
          '      <li><strong>Le flux physique</strong> : déplacement des palettes, transformation en atelier.</li>\n' +
          '      <li><strong>Le flux d’information</strong> : création des bons de commande, bordereaux d’expédition.</li>\n' +
          '      <li><strong>Le flux financier</strong> : écritures comptables, facturation, règlements bancaires.</li>\n' +
          '    </ol>')
      ].join('\n')
    },
    {
      title: 'Le cycle Procure-to-Pay (P2P / De l’Achat au Paiement)',
      html: [
        '<p>Le cycle <strong>P2P</strong> (<em>Procure-to-Pay</em>) couvre l’intégralité des relations avec les fournisseurs :</p>',
        '<ol>\n' +
        '  <li><strong>Expression du besoin</strong> : émission d’une Demande d’Achat (DA) interne par un service.</li>\n' +
        '  <li><strong>Validation &amp; Bon de Commande (Purchase Order - PO)</strong> : après workflow d’approbation, émission du bon envoyé au fournisseur.</li>\n' +
        '  <li><strong>Réception physique des marchandises (Goods Receipt - GR)</strong> : contrôle à quai et saisie du Bon de Réception dans l’ERP (entrée en stock immédiate).</li>\n' +
        '  <li><strong>Rapprochement à 3 voies (Three-Way Matching)</strong> : contrôle automatique comparant <em>Quantité/Prix commandés</em>, <em>Quantité reçue</em> et <em>Quantité/Prix facturés</em>.</li>\n' +
        '  <li><strong>Paiement fournisseur</strong> : émission de l’ordre de virement bancaire et lettrage de la facture en comptabilité.</li>\n' +
        '</ol>',
        box('tech', 'Importance du Three-Way Matching', 'code',
          '    <p>Ce rapprochement automatisé par l’ERP empêche de payer une facture supérieure au devis validé, ' +
          'ou de régler des articles qui n’ont jamais été livrés en entrepôt.</p>')
      ].join('\n')
    },
    {
      title: 'Le cycle Order-to-Cash (O2C / De la Vente à l’Encaissement)',
      html: [
        '<p>Le cycle <strong>O2C</strong> (<em>Order-to-Cash</em>) matérialise la génération de chiffre d’affaires :</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Étape O2C</th><th>Action dans l’ERP</th><th>Impact sur le Système</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td>1. Devis / Proposition</td><td>Saisie de l’offre commerciale avec prix et remises.</td><td>Aucun impact financier ou physique.</td></tr>\n' +
        '    <tr><td>2. Commande client (Sales Order)</td><td>Acceptation du devis par le client.</td><td>Réservation du stock physique disponible.</td></tr>\n' +
        '    <tr><td>3. Préparation &amp; Expédition</td><td>Génération du bon de livraison (Delivery Note).</td><td>Décrémentation physique du stock magasin.</td></tr>\n' +
        '    <tr><td>4. Facturation client</td><td>Émission de la facture de vente légale.</td><td>Comptabilisation du compte client (débit 411) et de la vente (crédit 707).</td></tr>\n' +
        '    <tr><td>5. Encaissement &amp; Lettrage</td><td>Rapprochement bancaire du virement ou chèque.</td><td>Solde du compte client et crédit du compte bancaire (512).</td></tr>\n' +
        '  </tbody>\n' +
        '</table>'
      ].join('\n')
    },
    {
      title: 'Planification industrielle et Calcul des Besoins (MRP)',
      html: [
        '<p>Dans les entreprises de transformation ou de fabrication, la logistique s’appuie sur le ' +
        '<strong>MRP</strong> (<em>Material Requirements Planning</em> / Calcul des Besoins Nets) :</p>',
        '<ul>\n' +
        '  <li><strong>MRP I</strong> : calcule les quantités de matières et composants nécessaires à partir des nomenclatures (<em>Bill of Materials - BOM</em>) et du stock disponible.</li>\n' +
        '  <li><strong>MRP II</strong> (<em>Manufacturing Resource Planning</em>) : étend le calcul aux capacités machines, aux outillages et aux ressources humaines (heures de main d’œuvre requises).</li>\n' +
        '</ul>',
        '<pre><code>Besoin Net = max(0, Besoin Brut - Stock Initial - Receptions Prevues + Stock Securite)</code></pre>',
        box('warn', 'Risque : L’effet coup de fouet (Bullwhip Effect)', 'shield',
          '    <p>Une petite variation de la demande client en fin de chaîne s’amplifie en remontant la chaîne logistique, ' +
          'créant des surstocks massifs chez les fournisseurs de composants. L’ERP atténue cet effet en partageant ' +
          'les prévisions en temps réel.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qui a théorisé le modèle de la chaîne de valeur en entreprise ?', opts: ['Michael Porter', 'Peter Drucker', 'Henry Ford'], correct: 0, exp: 'Michael Porter a formalisé la chaîne de valeur dans son ouvrage Competitive Advantage (1985).' },
    { stem: 'Que signifie l’acronyme P2P dans le contexte des processus ERP ?', opts: ['Procure-to-Pay (De l’achat au paiement)', 'Peer-to-Peer', 'Production-to-Plant'], correct: 0, exp: 'Procure-to-Pay désigne le cycle complet des approvisionnements fournisseurs.' },
    { stem: 'Qu’est-ce que le Three-Way Matching (rapprochement à 3 voies) ?', opts: ['La comparaison entre le bon de commande, le bon de réception et la facture', 'La triple sauvegarde des serveurs', 'La signature par 3 directeurs'], correct: 0, exp: 'Ce contrôle automatique vérifie que ce qui est facturé a bien été commandé et réceptionné.' },
    { stem: 'Que signifie l’acronyme O2C ?', opts: ['Order-to-Cash (De la commande à l’encaissement)', 'Operation-to-Cloud', 'Online-to-Client'], correct: 0, exp: 'Order-to-Cash est le cycle commercial complet de vente aux clients.' },
    { stem: 'À quelle étape du cycle O2C le stock physique est-il décrémenté dans l’ERP ?', opts: ['Lors de la validation de l’expédition / bon de livraison', 'Dès la création du devis', 'Au moment du paiement en banque'], correct: 0, exp: 'La sortie de stock effective s’opère lors de l’expédition physique des produits.' },
    { stem: 'Que calcule l’algorithme MRP I dans un module de production ?', opts: ['Les besoins nets en matières premières et composants selon les nomenclatures', 'Le salaire des commerciaux', 'Le taux d’imposition de l’entreprise'], correct: 0, exp: 'MRP I détermine les quantités et dates de commande des composants nécessaires.' },
    { stem: 'Quelle formule définit le Besoin Net en gestion de production ?', opts: ['max(0, Besoin Brut - Stock Initial - Réceptions Prévues + Stock Sécurité)', 'Besoin Brut * Taux de TVA', 'Stock Initial / 2'], correct: 0, exp: 'L’équation fondamentale déduit les ressources disponibles et intègre le stock tampon.' },
    { stem: 'Qu’est-ce qu’une nomenclature produit (BOM - Bill of Materials) ?', opts: ['La liste hiérarchique de tous les composants et matières entrant dans la fabrication d’un produit', 'La liste des clients en retard de paiement', 'Le barème des congés payés'], correct: 0, exp: 'La BOM décrit la composition détaillée (arborescence) d’un article fabriqué.' }
  ],

  pitfalls: [
    'Valider une facture fournisseur sans avoir vérifié le bon de réception préalable (risque de payer pour du matériel non livré).',
    'Décrémenter le stock dès la saisie d’un devis non encore accepté par le client.',
    'Négliger le paramétrage du stock de sécurité dans le calcul MRP, aboutissant à des ruptures de chaîne.',
    'Ignorer les délais de livraison fournisseurs (Lead Time) lors de la planification des ordres de fabrication.',
    'Oublier de lettrer régulièrement les comptes clients et fournisseurs en comptabilité.'
  ],

  methodTitle: 'Auditer l’exécution d’un cycle O2C ou P2P dans l’ERP',
  method: [
    '<strong>Suivre la chaîne documentaire</strong> : vérifier la liaison numérique continue entre devis, commande, livraison et facture.',
    '<strong>Contrôler les déclencheurs comptables</strong> : vérifier que chaque mouvement physique a généré son écriture financière exacte.',
    '<strong>Auditer les délais de cycle (Lead Times)</strong> : mesurer le temps écoulé entre chaque étape pour détecter les goulets d’étranglement.',
    '<strong>Vérifier les réconciliations</strong> : s’assurer que les rapprochements automatiques (matching) ont fonctionné sans contournement manuel.',
    '<strong>Analyser les écarts de stock</strong> : confronter l’état de stock théorique de l’ERP aux inventaires physiques tournants.'
  ],

  summary: [
    'Les processus ERP transcendent les frontières des services pour synchroniser flux physiques, d’information et financiers.',
    'Le cycle P2P régit les achats fournisseurs et sécurise les règlements par le Three-Way Matching.',
    'Le cycle O2C orchestre les ventes clients depuis le devis jusqu’à l’encaissement et au lettrage comptable.',
    'Le calcul MRP dimensionne les approvisionnements et ordres de fabrication selon les nomenclatures (BOM).',
    'La fluidité de ces cycles conditionne directement la trésorerie et la rentabilité opérationnelle de l’entreprise.'
  ],

  checklist: [
    'Je connais la structure de la chaîne de valeur de Michael Porter.',
    'Je sais décrire les étapes du cycle Procure-to-Pay (P2P).',
    'Je sais expliquer le fonctionnement et l’utilité du Three-Way Matching.',
    'Je maîtrise le déroulement du cycle Order-to-Cash (O2C).',
    'Je sais appliquer la formule de calcul des besoins nets (MRP).'
  ],

  notions: ['Chaîne de valeur', 'Porter', 'P2P', 'O2C', 'Three-Way Matching', 'MRP', 'CBN', 'BOM', 'Stock de sécurité', 'Lettrage'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les étapes clés des cycles P2P et O2C.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le Three-Way Matching et la formule du calcul MRP.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les cycles opérationnels et logistiques d’entreprise.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux modules fonctionnels de l’ERP au chapitre 5.' }
  ],

  flashcards: [
    { q: 'Que sont les trois flux synchronisés par un ERP ?', a: 'Le flux physique (matières/marchandises), le flux d’information (documents) et le flux financier (écritures/règlements).' },
    { q: 'Quels sont les 3 documents comparés dans le Three-Way Matching ?', a: 'Le Bon de Commande (PO), le Bon de Réception (GR) et la Facture Fournisseur (Invoice).' },
    { q: 'Quelle est la différence entre MRP I et MRP II ?', a: 'MRP I planifie les composants et matières (BOM) ; MRP II y intègre les capacités machines et humaines.' },
    { q: 'À quel moment une facture de vente est-elle comptabilisée dans l’ERP ?', a: 'Au moment de sa validation/émission : débit du compte client (411) et crédit du compte de vente (707).' },
    { q: 'Qu’est-ce que l’effet coup de fouet (Bullwhip Effect) ?', a: 'L’amplification croissante des fluctuations de la demande au fur et à mesure que l’on remonte vers les fournisseurs amont.' },
    { q: 'Quelle est la formule du Besoin Net en MRP ?', a: 'Besoin Net = max(0, Besoin Brut - Stock Initial - Réceptions Prévues + Stock Sécurité).' }
  ],

  next: {
    href: 'chapitre5.html',
    label: 'Chapitre 5 : Modules fonctionnels de l’ERP'
  }
};

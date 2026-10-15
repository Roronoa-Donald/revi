/**
 * Chapitre 5 du cours « ERP & SI » B2 — Modules fonctionnels de l’ERP.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Modules fonctionnels de l’ERP',
  short: 'Modules fonctionnels',
  toc: 'Finance &amp; comptabilité en partie double, valorisation des stocks (CMUP, FIFO), CRM &amp; ventes, SIRH.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Un ERP tire sa puissance de la spécialisation et de l’intégration étroite de ses modules fonctionnels. ' +
    'De la clôture comptable mensuelle à la valorisation continue des inventaires, en passant par le pipeline CRM ' +
    'et la gestion des collaborateurs dans le SIRH, chaque brique répond aux règles strictes de son domaine tout en partageant les mêmes référentiels de données.',

  objectives: [
    'maîtriser les principes du module Finance &amp; Comptabilité (partie double, grand livre, bilan) ;',
    'comprendre les mécanismes de valorisation des stocks (CMUP / PMP et FIFO) ;',
    'savoir dimensionner les réapprovisionnements grâce au modèle de Wilson (lot économique) ;',
    'analyser les fonctionnalités du module CRM et le suivi du pipeline de conversion ;',
    'identifier le périmètre et les enjeux d’un Système d’Information Ressources Humaines (SIRH).'
  ],

  sections: [
    {
      title: 'Le module Finance &amp; Comptabilité : le cœur névralgique de l’ERP',
      html: [
        '<p>Le module financier est le récepteur ultime de toutes les transactions opérationnelles de l’entreprise. ' +
        'Il repose sur le principe intangible de la <strong>comptabilité en partie double</strong> : toute opération donne lieu ' +
        'à une inscription simultanée au <strong>débit</strong> d’un ou plusieurs comptes et au <strong>crédit</strong> ' +
        'd’un ou plusieurs autres, avec équilibre strict : <code>&Sigma; Débits = &Sigma; Crédits</code>.</p>',
        '<ul>\n' +
        '  <li><strong>Plan comptable général (PCG)</strong> : nomenclature normalisée structurée en classes (ex. classe 4 pour les tiers, classe 6 pour les charges, classe 7 pour les produits).</li>\n' +
        '  <li><strong>Journal &amp; Grand Livre</strong> : journal chronologique des écritures, puis regroupement par compte dans le grand livre.</li>\n' +
        '  <li><strong>La Balance générale</strong> : état récapitulatif périodique vérifiant l’égalité globale débits/crédits.</li>\n' +
        '  <li><strong>Bilan et Compte de Résultat</strong> : le bilan photographie le patrimoine (Actif = Passif), le compte de résultat mesure la performance sur l’exercice (Produits - Charges = Résultat net).</li>\n' +
        '  <li><strong>Comptabilité analytique</strong> : ventilation des coûts par centres de responsabilité (centres de coûts ou de profits) pour mesurer la rentabilité par projet, produit ou filiale.</li>\n' +
        '</ul>',
        box('intuition', 'L’écriture automatique d’une facture client', 'lightbulb',
          '    <p>Lorsqu’un commercial valide une facture client de 1 200 € TTC (dont 200 € de TVA à 20 %) dans le module Ventes, l’ERP génère instantanément en comptabilité :</p>\n' +
          '    <ul>\n' +
          '      <li><strong>Débit</strong> du compte <code>411 Clients</code> : 1 200 € (créance due par le client).</li>\n' +
          '      <li><strong>Crédit</strong> du compte <code>707 Vente de marchandises</code> : 1 000 € HT (produit d’exploitation).</li>\n' +
          '      <li><strong>Crédit</strong> du compte <code>44571 TVA collectée</code> : 200 € (dette envers l’État).</li>\n' +
          '    </ul>\n' +
          '    <p>Le principe d’équilibre est respecté : 1 200 € au débit = 1 000 € + 200 € au crédit.</p>')
      ].join('\n')
    },
    {
      title: 'Le module Gestion des Stocks &amp; Logistique (SCM)',
      html: [
        '<p>La gestion des stocks dans l’ERP pilote les réceptions, expéditions, transferts entre entrepôts et inventaires périodiques. ' +
        'Une problématique centrale réside dans la <strong>valorisation financière des stocks</strong> : à quel coût comptabiliser les articles sortants lorsque les prix d’achat fluctuent ?</p>',
        '<ol>\n' +
        '  <li><strong>CMUP (Coût Moyen Unitaire Pondéré / PMP)</strong> : après chaque nouvelle entrée en stock, on recalcule le coût moyen par la formule :\n' +
        '    <br><code>CMUP_nouveau = ((Stock_précédent * CMUP_précédent) + (Quantité_reçue * Prix_unitaire_achat)) / (Stock_précédent + Quantité_reçue)</code>. ' +
        '    Toute sortie ultérieure est valorisée à ce CMUP.</li>\n' +
        '  <li><strong>FIFO (First In, First Out / PEPS)</strong> : les premiers articles entrés en stock sont réputés être les premiers sortis. Idéal pour les denrées périssables.</li>\n' +
        '  <li><strong>LIFO (Last In, First Out / DEPS)</strong> : les derniers articles entrés sortent les premiers (interdit par les normes IFRS et la fiscalité française car sous-évaluant les stocks en période d’inflation).</li>\n' +
        '</ol>',
        box('astuce', 'La formule de Wilson : optimiser la taille des commandes', 'code',
          '    <p>La formule de <strong>Wilson</strong> calcule la quantité économique de commande (<em>EOQ - Economic Order Quantity</em>) qui minimise la somme des coûts de commande et des coûts de possession du stock :</p>\n' +
          '    <pre><code>Q* = &radic;( (2 * D * C_s) / C_p )</code></pre>\n' +
          '    <p>où <strong>D</strong> est la demande annuelle en unités, <strong>C_s</strong> le coût fixe de passation d’une commande, et <strong>C_p</strong> le coût unitaire annuel de possession du stock.</p>')
      ].join('\n')
    },
    {
      title: 'Le module CRM &amp; Gestion des Ventes',
      html: [
        '<p>Le module <strong>CRM</strong> (<em>Customer Relationship Management</em>) centralise toute la relation avec les prospects et clients :</p>',
        '<ul>\n' +
        '  <li><strong>Gestion des leads &amp; qualification</strong> : capture des contacts depuis le web/salons, scoring automatique et affectation aux commerciaux.</li>\n' +
        '  <li><strong>Pipeline d’opportunités</strong> : suivi visuel (Kanban) des phases de vente (Qualification &rarr; Démonstration &rarr; Proposition commerciale &rarr; Négociation &rarr; Gagné/Perdu).</li>\n' +
        '  <li><strong>Gestion des devis et tarification dynamique</strong> : application des remises contractuelles, grilles tarifaires B2B et contrôle des marges minimales autorisées.</li>\n' +
        '  <li><strong>Calcul des commissions</strong> : calcul automatique des primes commerciales basé sur le chiffre d’affaires encaissé ou la marge brute dégagée.</li>\n' +
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Le module SIRH (Système d’Information Ressources Humaines)',
      html: [
        '<p>Le <strong>SIRH</strong> administre le capital humain de l’entreprise en conformité avec le droit social :</p>',
        '<ul>\n' +
        '  <li><strong>Gestion administrative et dossiers salariés</strong> : état civil, contrats de travail, avenants, visites médicales, RIB.</li>\n' +
        '  <li><strong>Gestion des Temps et des Activités (GTA)</strong> : badgeage, suivi des heures supplémentaires, gestion des congés payés, RTT et arrêts maladie.</li>\n' +
        '  <li><strong>Paie</strong> : calcul des cotisations patronales et salariales, génération des bulletins de paie et déclaration sociale nominative (DSN).</li>\n' +
        '  <li><strong>GPEC (Gestion Prévisionnelle des Emplois et des Compétences)</strong> : entretiens annuels, plans de formation continue, cartographie des compétences et plans de succession.</li>\n' +
        '</ul>',
        box('danger', 'Données personnelles et conformité RGPD dans le SIRH', 'alert',
          '    <p>Le SIRH manipule des données hautement sensibles (salaires, santé, évaluations). L’ERP doit garantir des contrôles d’accès stricts par rôles (RBAC), ' +
          'la traçabilité des consultations et le respect des durées légales de conservation prévues par le <strong>RGPD</strong>.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel principe comptable régit le module financier d’un ERP ?', opts: ['La comptabilité en partie double (Débit = Crédit)', 'La comptabilité en partie simple', 'Le tirage au sort des écritures'], correct: 0, exp: 'Chaque écriture doit obligatoirement équilibrer les débits et les crédits.' },
    { stem: 'Quelle formule donne le nouveau CMUP après une livraison de marchandises ?', opts: ['((Stock_actuel * CMUP_actuel) + (Qté_reçue * Prix_achat)) / (Stock_actuel + Qté_reçue)', 'Prix_achat / 2', 'Stock_actuel + Qté_reçue'], correct: 0, exp: 'Le Coût Moyen Unitaire Pondéré est calculé par la moyenne pondérée de la valeur résiduelle et de la nouvelle entrée.' },
    { stem: 'Pourquoi la méthode LIFO est-elle interdite en comptabilité française et selon les normes IFRS ?', opts: ['Parce qu’elle sous-évalue les stocks finaux en période d’inflation et fausse le résultat fiscal', 'Parce que les ordinateurs ne savent pas calculer à l’envers', 'Parce qu’elle oblige à jeter les produits récents'], correct: 0, exp: 'Le LIFO conduit à sous-estimer la valeur bilancielle du stock et le bénéfice taxable en période de hausse des prix.' },
    { stem: 'Quel est l’objectif de la formule de Wilson (Economic Order Quantity) ?', opts: ['Minimiser le coût total de gestion du stock (coûts de commande + coûts de possession)', 'Calculer le bonus du directeur logistique', 'Fixer le prix de vente au consommateur final'], correct: 0, exp: 'Elle optimise la taille des lots commandés pour minimiser les coûts logistiques globaux.' },
    { stem: 'Dans un module CRM, quelle étape succède généralement à la qualification d’un prospect ?', opts: ['La démonstration ou présentation de l’offre', 'L’émission immédiate d’une facture définitive', 'La clôture sans suite du compte'], correct: 0, exp: 'Une fois qualifié comme pertinent, le prospect passe en phase de présentation et démonstration de la solution.' },
    { stem: 'Dans quelle classe du Plan Comptable Général français se situent les comptes de tiers (clients et fournisseurs) ?', opts: ['Classe 4 (Comptes de tiers)', 'Classe 1 (Capitaux propres)', 'Classe 6 (Comptes de charges)'], correct: 0, exp: 'La classe 4 regroupe les clients (411), fournisseurs (401), personnel (421) et État (445).' },
    { stem: 'Que signifie le sigle GTA dans le module SIRH ?', opts: ['Gestion des Temps et des Activités', 'Groupe de Transmission Automatique', 'Guichet Téléphonique Administratif'], correct: 0, exp: 'La GTA pilote les heures de travail, pointages, congés, RTT et astreintes.' },
    { stem: 'Que signifie le sigle GPEC en gestion des ressources humaines ?', opts: ['Gestion Prévisionnelle des Emplois et des Compétences', 'Grille Ponctuelle d’Évaluation des Cadres', 'Gestion Partagée de l’Énergie Commerciale'], correct: 0, exp: 'La GPEC anticipe les besoins futurs en compétences et organise les formations adaptées.' }
  ],

  pitfalls: [
    'Enregistrer une écriture comptable déséquilibrée dans l’ERP (généralement bloqué nativement par le système).',
    'Confondre le chiffre d’affaires (ventes) et la trésorerie réelle en banque (décalage dû aux délais de paiement clients).',
    'Omettre de recalculer le CMUP après une réception fournisseur à un tarif promotionnel.',
    'Commander de trop petites quantités pour éviter de stocker, provoquant une explosion des frais de passation de commandes.',
    'Accorder des droits d’accès non restreints aux fiches de paie et données médicales des salariés dans le SIRH.'
  ],

  methodTitle: 'Paramétrer et contrôler un module ERP',
  method: [
    '<strong>Définir les règles de gestion</strong> : documenter les seuils d’alerte stock, les plafonds de remise commerciale et les circuits d’approbation.',
    '<strong>Configurer le plan de comptes et les tables de correspondance</strong> : associer chaque type d’article et de tiers au bon compte comptable par défaut.',
    '<strong>Tester les flux d’écritures automatiques</strong> : simuler une vente, un achat et une paie pour auditer les journaux comptables générés.',
    '<strong>Auditer la cohérence des stocks</strong> : confronter la valorisation CMUP de l’ERP avec les réceptions physiques et factures fournisseurs.',
    '<strong>Restreindre les habilitations</strong> : auditer la matrice RBAC (Role-Based Access Control) pour cloisonner l’accès aux données financières et RH.'
  ],

  summary: [
    'Le module Finance assure l’intégrité comptable par le principe de la partie double et ventile les coûts en analytique.',
    'La valorisation des stocks (CMUP, FIFO) et la formule de Wilson conditionnent la rentabilité industrielle et logistique.',
    'Le CRM dynamise la force commerciale en pilotant le cycle de vente depuis le lead jusqu’à la commande ferme.',
    'Le SIRH sécurise la gestion du personnel, de la GTA jusqu’à la paie et à la projection des compétences (GPEC).',
    'L’intégration native entre ces modules élimine les ressaisies et garantit l’alignement opérationnel et financier.'
  ],

  checklist: [
    'Je comprends le mécanisme de la comptabilité en partie double et l’égalité Débits = Crédits.',
    'Je sais calculer un nouveau CMUP après une livraison de stock.',
    'Je comprends l’arbitrage modélisé par la formule de Wilson pour la taille des lots.',
    'Je connais les étapes du pipeline CRM et la logique d’attribution des commissions.',
    'Je sais citer les composantes majeures d’un SIRH (GTA, Paie, GPEC).'
  ],

  notions: ['Partie double', 'CMUP', 'PMP', 'FIFO', 'LIFO', 'Wilson', 'EOQ', 'CRM', 'Pipeline', 'SIRH', 'GTA', 'GPEC'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les calculs de CMUP et la logique de la partie double comptable.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur la formule de Wilson et les composantes du SIRH.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises le fonctionnement des grands modules fonctionnels ERP.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à l’urbanisation et au déploiement au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Quelle est la règle d’or de la comptabilité en partie double ?', a: 'Le total des montants inscrits au Débit doit être rigoureusement égal au total des montants inscrits au Crédit.' },
    { q: 'Quelle est la formule du Coût Moyen Unitaire Pondéré (CMUP) après une entrée ?', a: 'CMUP = ((Stock_ancien * CMUP_ancien) + (Qté_entrée * Prix_entrée)) / (Stock_ancien + Qté_entrée).' },
    { q: 'Que compense la formule de Wilson dans la gestion des stocks ?', a: 'Elle équilibre le coût de lancement des commandes (qui diminue avec les gros lots) et le coût de possession du stock (qui augmente avec les gros lots).' },
    { q: 'Quels sont les deux états financiers obligatoires produits à la clôture de l’exercice ?', a: 'Le Bilan (patrimoine Actif/Passif) et le Compte de Résultat (performance Produits/Charges).' },
    { q: 'Que permet de suivre le pipeline commercial dans un module CRM ?', a: 'L’état d’avancement de chaque opportunité commerciale, du premier contact jusqu’à la conclusion du contrat.' },
    { q: 'Quelles sont les quatre briques fondamentales d’un SIRH ?', a: 'La gestion administrative du personnel, la Gestion des Temps et Activités (GTA), la Paie, et la GPEC / Formation.' }
  ],

  next: {
    href: 'chapitre6.html',
    label: 'Chapitre 6 : Déploiement, Urbanisation &amp; Avenir des ERP'
  }
};

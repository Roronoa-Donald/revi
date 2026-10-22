/**
 * Chapitre 2 du cours « Ingénierie du besoin » B2 — Types & Qualités des Exigences.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Types &amp; Qualités des Exigences',
  short: 'Types &amp; Qualités',
  toc: 'Exigences fonctionnelles et non-fonctionnelles, modèle FURPS+, critères de qualité ISO 29148 et traque des mots vagues.',
  time: '≈ 2 h 40 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Rédiger une exigence qui affirme simplement « le système doit être rapide et ergonomique » est une garantie ' +
    'quasi-certaine de litige lors de la recette client. Une exigence inexploitable coûte jusqu’à 100 fois plus cher ' +
    'à corriger en phase de production qu’en phase de cadrage. L’ingénieur des exigences doit savoir catégoriser ' +
    'les attentes et formuler des exigences vérifiables, non ambiguës et quantifiées.',

  objectives: [
    'différencier formellement exigences fonctionnelles (FR) et exigences non-fonctionnelles (NFR) ;',
    'appliquer le modèle de classification FURPS+ (Functionality, Usability, Reliability, Performance, Supportability) ;',
    'maîtriser les critères de qualité normatifs ISO/IEC/IEEE 29148 (vérifiable, non ambigu, complet, nécessaire) ;',
    'identifier et éradiquer le vocabulaire vague et non mesurable (« convivial », « performant », « si possible ») ;',
    'formuler des critères d’acceptation quantifiables avec des métriques de seuil précises.'
  ],

  sections: [
    {
      title: 'Exigences fonctionnelles (FR) vs exigences non-fonctionnelles (NFR)',
      html: [
        '<p>Une spécification logicielle équilibrée repose sur deux piliers indissociables :</p>',
        '<ul>\n' +
        '  <li><strong>Exigence Fonctionnelle (FR - Functional Requirement)</strong> : décrit <em>ce que le système doit faire</em>. ' +
        'Elle définit les services, les calculs, les comportements en réponse à des entrées spécifiques et les règles métier ' +
        '(ex. <em>« Le système doit générer une facture PDF après validation du paiement »</em>).</li>\n' +
        '  <li><strong>Exigence Non-Fonctionnelle (NFR - Non-Functional Requirement)</strong> : décrit <em>comment le système doit se comporter</em>. ' +
        'Elle impose des contraintes de qualité opérationnelle sur le service : temps de réponse, sécurité, disponibilité, ' +
        'maintenabilité ou ergonomie (ex. <em>« Le temps de génération du PDF doit être &lt; 800 ms pour 95 % des requêtes »</em>).</li>\n' +
        '</ul>',
        box('danger', 'L’omission des exigences non-fonctionnelles', 'alert',
          '    <p>Trop de projets se focalisent exclusivement sur les fonctionnalités visibles (écrans, boutons, formulaires) ' +
          'et découvrent en production que l’application s’effondre sous la charge de 500 utilisateurs simultanés ou ' +
          'viole les obligations du RGPD. Les NFR doivent être élicitées et validées dès le premier sprint.</p>')
      ].join('\n')
    },
    {
      title: 'La taxonomie de qualité FURPS+',
      html: [
        '<p>Initialement développé chez Hewlett-Packard puis repris par le Rational Unified Process (RUP), ' +
        'le modèle <strong>FURPS+</strong> structure l’ensemble des caractéristiques logicielles :</p>',
        '<ul>\n' +
        '  <li><strong>F (Functionality)</strong> : capacités fonctionnelles, fonctionnalités métier, sécurité, calculs.</li>\n' +
        '  <li><strong>U (Usability)</strong> : ergonomie, esthétique, accessibilité, documentation utilisateur et courbe d’apprentissage.</li>\n' +
        '  <li><strong>R (Reliability)</strong> : fiabilité, disponibilité (ex. 99,9 %), fréquence et gravité des pannes (MTBF), capacité de reprise après sinistre.</li>\n' +
        '  <li><strong>P (Performance)</strong> : temps de réponse, débit (transactions/seconde), consommation mémoire et processeur.</li>\n' +
        '  <li><strong>S (Supportability)</strong> : testabilité, maintenabilité, modularité, extensibilité et portabilité.</li>\n' +
        '  <li><strong>« + » (Contraintes)</strong> : contraintes de conception (ex. langage imposé), contraintes d’implémentation, ' +
        'contraintes d’interface (ex. connecteur SAP spécifique) et contraintes réglementaires (ex. RGPD, PCI-DSS).</li>\n' +
        '</ul>'
      ].join('\n')
    },
    {
      title: 'Les critères de qualité normatifs ISO 29148 &amp; SMART',
      html: [
        '<p>Pour être qualifiée de professionnelle, toute exigence doit satisfaire aux critères de la norme <strong>ISO/IEC/IEEE 29148</strong> :</p>',
        '<ul>\n' +
        '  <li><strong>Non ambiguë</strong> : une seule et unique interprétation possible par tous les lecteurs (développeurs, testeurs, clients).</li>\n' +
        '  <li><strong>Vérifiable (Testable)</strong> : il existe un protocole de test fini et quantifiable permettant de trancher sans équivoque si l’exigence est respectée.</li>\n' +
        '  <li><strong>Nécessaire</strong> : apporte une valeur démontrée au projet ; sa suppression entraînerait un manque métier.</li>\n' +
        '  <li><strong>Complète</strong> : contient toutes les informations requises sans laisser de zones d’ombre.</li>\n' +
        '  <li><strong>Cohérente</strong> : n’entre en contradiction avec aucune autre exigence du référentiel.</li>\n' +
        '  <li><strong>Réalisable</strong> : faisable sur le plan technique, budgétaire et temporel.</li>\n' +
        '</ul>',
        box('astuce', 'La méthode SMART transposée aux exigences', 'lightbulb',
          '    <p>Une exigence SMART est <strong>Spécifique</strong> (périmètre net), <strong>Mesurable</strong> (seuil chiffré), ' +
          '<strong>Atteignable</strong> (technologiquement réaliste), <strong>Pertinente / Relevant</strong> (alignée sur les objectifs stratégiques) ' +
          'et <strong>Temporellement définie</strong> (délai ou jalon d’exécution clair).</p>')
      ].join('\n')
    },
    {
      title: 'Traque et éradication des mots vagues',
      html: [
        '<p>Les litiges contractuels naissent presque toujours de mots élastiques. Un ingénieur des exigences proscrit ' +
        'strictement les formulations subjectives :</p>',
        '<table class="table-styled">\n' +
        '  <thead><tr><th>Terme interdit / Vague</th><th>Risque contractuel</th><th>Reformulation mesurable</th></tr></thead>\n' +
        '  <tbody>\n' +
        '    <tr><td>« Rapide »</td><td>Chacun a sa propre définition de la vitesse</td><td>« Temps de réponse &lt; 500 ms au percentile 95 »</td></tr>\n' +
        '    <tr><td>« Convivial / Intuitif »</td><td>Totalement subjectif</td><td>« Un utilisateur novice accomplit la tâche en &lt; 3 clics et &lt; 90 s sans formation »</td></tr>\n' +
        '    <tr><td>« Évolutif / Robuste »</td><td>Non testable</td><td>« Capacité d’absorber une hausse de 300 % du volume sans dégradation de latence »</td></tr>\n' +
        '    <tr><td>« Si possible / Éventuellement »</td><td>Ambiguïté sur l’obligation</td><td>Choisir formellement entre « Le système doit » (obligatoire) ou exclure du jalon</td></tr>\n' +
        '  </tbody>\n' +
        '</table>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Laquelle des exigences suivantes est une exigence non-fonctionnelle (NFR) de Performance ?', opts: ['Le système doit renvoyer la liste des résultats en moins de 350 ms pour 10 000 articles', 'Le client peut ajouter un article à son panier virtuel', 'L’administrateur réinitialise les mots de passe par email'], correct: 0, exp: 'Le seuil temporel de 350 ms contraint la qualité du service (Performance), alors que l’ajout au panier est une fonction métier (FR).' },
    { stem: 'Dans la taxonomie FURPS+, que représente la lettre « R » ?', opts: ['Reliability (Fiabilité et disponibilité)', 'Refactoring (Restructuration du code)', 'Reactivity (Rapidité de l’interface)'], correct: 0, exp: 'R correspond à Reliability (fiabilité, MTBF, disponibilité, reprise sur incident).' },
    { stem: 'Pourquoi la formulation « L’application doit être simple d’utilisation » est-elle rejetée par la norme ISO 29148 ?', opts: ['Elle est vague, subjective et non vérifiable par un test binaire', 'Elle impose un framework JavaScript précis', 'Elle est trop longue'], correct: 0, exp: 'La simplicité est une appréciation subjective : sans métrique de temps ou de taux d’erreur utilisateur, elle n’est pas vérifiable.' },
    { stem: 'Dans quelle catégorie FURPS+ classe-t-on la conformité obligatoire avec le RGPD ?', opts: ['Le « + » (Contraintes légales et réglementaires)', 'Functionality uniquement', 'Usability'], correct: 0, exp: 'Le « + » regroupe les contraintes d’environnement, de conception, d’implémentation et légales/réglementaires.' },
    { stem: 'Que signifie le critère de « Non-ambiguïté » d’une exigence ?', opts: ['L’énoncé n’admet qu’une seule et même interprétation par toutes les parties prenantes', 'L’exigence est rédigée en anglais technique', 'Le texte contient plus de 100 mots'], correct: 0, exp: 'Une exigence non ambiguë ne prête à aucune double interprétation entre l’équipe technique et le commanditaire.' },
    { stem: 'Quel mot-clé exprime une exigence impérative et non négociable selon la RFC 2119 / ISO 29148 ?', opts: ['DOIT (SHALL / MUST)', 'POURRAIT (COULD)', 'ÉVENTUELLEMENT (MAYBE)'], correct: 0, exp: 'Le verbe « DOIT » (SHALL en anglais normatif) formalise une obligation contractuelle stricte.' },
    { stem: 'La maintenabilité, l’extensibilité et la modularité d’un système relèvent de quelle catégorie FURPS+ ?', opts: ['Supportability', 'Usability', 'Performance'], correct: 0, exp: 'Supportability englobe la testabilité, la modularité, la maintenance et l’évolutivité du code.' },
    { stem: 'Une exigence qui contredit frontalement une règle de sécurité validée dans le même dossier viole quel critère de qualité ?', opts: ['La Cohérence (Consistency)', 'La Faisabilité', 'L’Atomicité'], correct: 0, exp: 'La cohérence garantit qu’aucune exigence du référentiel n’entre en conflit direct avec une autre.' }
  ],

  pitfalls: [
    'Rédiger des exigences avec des qualificatifs subjectifs comme « convivial », « rapide » ou « moderne » sans aucun seuil chiffré.',
    'Confondre contrainte technique (ex. « hébergé sur AWS ») et exigence fonctionnelle métier.',
    'Reléguer toutes les exigences de sécurité et de performance en fin de projet au moment de la livraison.',
    'Rédiger une exigence composée de plusieurs besoins disjoints (« Le système doit gérer les commandes et calculer la TVA et exporter vers la compta ») au lieu de l’atomiser.',
    'Ignorer les contraintes réglementaires (RGPD, accessibilité WCAG, archivage légal) lors de l’analyse initiale.'
  ],

  methodTitle: 'Valider la qualité d’une exigence selon ISO 29148',
  method: [
    '<strong>Qualifier la nature de l’exigence</strong> : déterminer s’il s’agit d’une FR ou d’une NFR (classée selon FURPS+).',
    '<strong>Détecter et bannir les adverbes flous</strong> : supprimer tout terme comme « environ », « généralement », « facile », « robuste ».',
    '<strong>Définir une métrique et un seuil</strong> : fixer une valeur chiffrée (seconde, pourcentage, volume) vérifiable par un scénario de test.',
    '<strong>Vérifier l’atomicité</strong> : s’assurer que la fiche n’exprime qu’un seul besoin élémentaire avec le verbe normatif « doit ».',
    '<strong>Valider la testabilité</strong> : rédiger immédiatement le protocole de vérification (inspection, démonstration, test automatisé ou analyse).'
  ],

  summary: [
    'Les exigences fonctionnelles (FR) définissent les services métier ; les NFR définissent les contraintes de qualité.',
    'Le modèle FURPS+ classe Functionality, Usability, Reliability, Performance, Supportability et contraintes annexes (+).',
    'La norme ISO 29148 exige qu’une exigence soit non ambiguë, vérifiable, nécessaire, complète et cohérente.',
    'Tout qualificatif vague (« rapide », « intuitif ») doit être proscrit ou remplacé par une métrique chiffrée.',
    'Le verbe normatif « doit » (shall) consacre l’obligation contractuelle d’une exigence formelle.'
  ],

  checklist: [
    'Je sais catégoriser une exigence dans le modèle FURPS+.',
    'Je sais repérer et reformuler les mots vagues dans un cahier des charges.',
    'Je connais les 6 critères de qualité fondamentaux de la norme ISO 29148.',
    'Je sais traduire une exigence de convivialité en critère mesurable d’utilisabilité.',
    'Je sais vérifier qu’une exigence est atomique et dotée d’un protocole de test clair.'
  ],

  notions: ['FR', 'NFR', 'FURPS+', 'ISO 29148', 'SMART', 'Atomicité', 'Testabilité', 'Non-ambiguïté', 'Qualité logicielle'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la différence FR/NFR et la classification FURPS+.' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur la traque des mots vagues et les critères de qualité ISO.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez les critères de qualification d’une exigence.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe aux techniques d’élicitation au chapitre 3.' }
  ],

  flashcards: [
    { q: 'Quelle est la différence fondamentale entre FR et NFR ?', a: 'FR décrit ce que fait le système (service métier) ; NFR décrit comment il se comporte (qualité, performance, sécurité).' },
    { q: 'Que signifie chaque lettre de l’acronyme FURPS+ ?', a: 'Functionality, Usability, Reliability, Performance, Supportability (+ Contraintes de conception, implémentation, interfaces, lois).' },
    { q: 'Pourquoi le mot « convivial » est-il interdit dans une spécification normée ?', a: 'Parce qu’il est subjectif et non vérifiable par un protocole de test objectif.' },
    { q: 'Comment rend-on vérifiable une exigence de performance ?', a: 'En précisant une métrique chiffrée et un percentile (ex. latence &lt; 500 ms à 95 % sous charge de 1 000 req/s).' },
    { q: 'Que signifie le critère d’atomicité d’une exigence ?', a: 'L’exigence n’exprime qu’un seul besoin élémentaire et ne peut pas être découpée en exigences indépendantes.' },
    { q: 'Quel verbe doit être employé pour marquer une exigence obligatoire selon les normes ?', a: 'Le verbe « doit » (ou « shall » en anglais normatif).' }
  ],

  next: {
    href: 'chapitre3.html',
    label: 'Chapitre 3 : Techniques d’Élicitation &amp; Découverte du Besoin'
  }
};

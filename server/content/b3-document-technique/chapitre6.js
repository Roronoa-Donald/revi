/**
 * Chapitre 6 du cours « Document Technique B3 ».
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 6,
  title: 'Qualité, Validation Automatisée &amp; Cycle de Vie du Document Technique',
  short: 'Qualité &amp; Cycle de Vie Documentaire',
  toc: 'Métriques de lisibilité (ASL, Flesch), link checking automatisé, détection d’obsolescence (stale docs), gouvernance et intégration dans la Definition of Done.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B3 et plus',
  situation: 'Rédiger une documentation technique de qualité n’est pas un acte ponctuel isolé, mais un engagement d’ingénierie continu. Une documentation non maintenue se dégrade inévitablement : des liens internes ou externes se brisent, des procédures d’exploitation décrivent des versions logicielles disparues depuis des mois, et des phrases excessivement alambiquées sèment la confusion lors d’incidents critiques en production. L’obsolescence documentaire (« Stale Documentation ») est l’une des principales causes d’erreurs humaines en exploitation informatique. Pour garantir la fiabilité des livrables, l’ingénieur de Bachelor 3 doit savoir instrumenter la qualité documentaire : mesurer la clarté rédactionnelle via des métriques scientifiques (ASL, scores de lisibilité), automatiser la vérification des liens en pipeline CI, détecter algorithmiquement les documents périmés et ancrer la révision documentaire dans la Definition of Done (DoD) des sprints d’ingénierie.',
  objectives: [
    'évaluer objectivement la lisibilité d’un texte technique via les métriques de lisibilité (Average Sentence Length - ASL, indice de Flesch) ;',
    'appliquer les règles de rédaction technique épurée : phrases courtes (&lt; 25 mots), voix active, suppression des ambiguïtés ;',
    'automatiser la détection des liens rompus (liens HTTP 404, ancres d’en-tête internes inexistantes) dans les pipelines d’intégration continue ;',
    'structurer les métadonnées de gouvernance documentaire via les en-têtes YAML frontmatter (`last_reviewed_date`, `owner`, `review_cycle`) ;',
    'mettre en place une politique d’archivage, de décommissionnement et d’intégration de la documentation dans la Definition of Done (DoD) ;',
    'concevoir en Python 3 des analyseurs d’ASL, des vérificateurs de liens d’ancres Markdown et des détecteurs automatisés de documents périmés.'
  ],
  sections: [
    {
      title: 'Métriques de Lisibilité &amp; Règles de Clarté Rédactionnelle',
      html: [
        '<p>En ingénierie technique, la clarté n’est pas une affaire de style littéraire ou d’éloquence, mais une exigence de précision opérationnelle. Un lecteur pressé ou stressé par un incident en astreinte doit comprendre l’instruction du premier coup.</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>L’Indicateur ASL (Average Sentence Length)</h4>',
        '    <p>L’<strong>ASL</strong> mesure le nombre moyen de mots par phrase dans un document. Les études ergonomiques et cognitives établissent les seuils suivants pour la documentation technique :</p>',
        '    <ul>',
        '      <li><strong>Idéal :</strong> 12 à 18 mots par phrase.</li>',
        '      <li><strong>Acceptable :</strong> 18 à 22 mots par phrase.</li>',
        '      <li><strong>Zone critique :</strong> Au-delà de 25 mots, la charge cognitive s’effondre et le taux d’erreur d’interprétation triple.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Scores de Flesch &amp; Flesch-Kincaid</h4>',
        '    <p>Le test de lisibilité de <strong>Flesch Reading Ease</strong> combine le nombre de mots par phrase et le nombre de syllabes par mot pour calculer un score sur 100 :</p>',
        '    <ul>',
        '      <li><strong>60 - 70 :</strong> Langage standard clair et fluide.</li>',
        '      <li><strong>30 - 50 :</strong> Texte technique exigeant mais accessible aux professionnels formés.</li>',
        '      <li><strong>&lt; 30 :</strong> Texte excessivement dense, jargonnant ou inutilement complexe, à simplifier d’urgence.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Vérification Automatisée des Liens &amp; Cohérence des Ancres',
      html: [
        '<p>L’apparition de liens morts (hyperlink rot) est le premier signe visible de la dégradation d’un portail technique. Deux types d’erreurs doivent être traqués en continu :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>1. Liens Externes &amp; Ressources HTTP</h4>',
        '    <p>Les URLs externes vers des documentations tierces, des bibliothèques ou des dépôts GitHub sont régulièrement déplacées ou supprimées. Des outils comme <strong>lychee</strong> ou <strong>markdown-link-check</strong> testent les requêtes HTTP (méthode HEAD ou GET) et alertent sur les codes 404 Not Found ou 410 Gone.</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>2. Ancres d’En-Têtes Internes (Slugs)</h4>',
        '    <p>Dans un document Markdown, un lien interne de la forme <code>[Consulter la configuration](#configuration-reseau)</code> pointe vers un titre <code>## Configuration Réseau</code>. Si un rédacteur renomme le titre en <code>## Configuration de l’Interface Réseau</code> sans mettre à jour l’ancre, le lien devient silencieusement inopérant.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Le Fléau des « Stale Docs » : Détection &amp; Algorithmes d’Alerte',
      html: [
        '<p>Un document obsolète est souvent plus dangereux que l’absence totale de documentation : il instille une fausse confiance et conduit à appliquer des commandes inadaptées en production.</p>',
        '<div class="grid grid-3">',
        '  <div class="card">',
        '    <h4>Métadonnées Frontmatter</h4>',
        '    <p>Chaque fichier technique doit comporter en en-tête des métadonnées normalisées (YAML Frontmatter) renseignant la propriété et le calendrier de révision :</p>',
        '    <pre><code>---\ntitle: Procédure Failover DB\nowner: equipe-dba@societe.fr\nlast_reviewed: 2025-08-15\nreview_interval_days: 90\nstatus: active\n---</code></pre>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Algorithme de Détection Stale</h4>',
        '    <p>Un script Python ou un job CI quotidien compare la date du jour avec la date <code>last_reviewed</code>. Si l’écart dépasse le seuil défini (ex. 90 jours pour un Runbook critique, 180 jours pour une SFD), une alerte est déclenchée (ticket Jira automatique ou notification Slack à l’équipe propriétaire).</p>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Historique Git &amp; Commits</h4>',
        '    <p>Si un fichier ne possède pas de frontmatter explicite, l’algorithme extrait la date du dernier commit Git ayant touché le fichier via <code>git log -1 --format=%cd &lt;fichier&gt;</code> pour calculer son ancienneté brute.</p>',
        '  </div>',
        '</div>'
      ].join('\n')
    },
    {
      title: 'Gouvernance, Definition of Done (DoD) &amp; Cycle de Vie Documentaire',
      html: [
        '<p>Pour que la documentation reste vivante et fiable, elle doit être intégrée dans les rituels de gouvernance de l’ingénierie logicielle :</p>',
        '<div class="grid grid-2">',
        '  <div class="card">',
        '    <h4>La Documentation dans la « Definition of Done »</h4>',
        '    <p>Dans un sprint Scrum ou un workflow Kanban, aucune fonctionnalité logicielle n’est considérée comme terminée (« Done ») tant que :</p>',
        '    <ul>',
        '      <li>La spécification OpenAPI a été mise à jour et validée.</li>',
        '      <li>Le Runbook d’exploitation intègre les nouveaux paramètres de configuration d’environnement.</li>',
        '      <li>Les tests de linters et de build documentaire passent au vert dans le pipeline CI.</li>',
        '    </ul>',
        '  </div>',
        '  <div class="card">',
        '    <h4>Cycle de Vie : Décommissionnement &amp; Archivage</h4>',
        '    <p>Lorsqu’un service ou une architecture devient obsolète :</p>',
        '    <ul>',
        '      <li><strong>Ne jamais supprimer brutalement l’URL :</strong> Cela briserait les favoris et historiques des utilisateurs.</li>',
        '      <li><strong>Ajouter un bandeau d’avertissement :</strong> Indiquer que le document est archivé et fournir le lien vers la nouvelle référence active.</li>',
        '      <li><strong>Redirections HTTP 301 :</strong> Si le contenu est complètement remplacé, configurer une redirection permanente dans le serveur web.</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n')
    }
  ],
  methodTitle: 'Méthodologie d’Audit &amp; de Maintenance de la Qualité Documentaire',
  method: [
    '1. Mesurer la lisibilité éditoriale : Calculer l’ASL (Average Sentence Length) et le score Flesch sur les sections clés pour identifier les phrases excessivement longues (> 25 mots).',
    '2. Découper et simplifier les instructions : Transformer les phrases complexes en listes à puces ordonnées ou en séquences directes sujet-verbe-complément.',
    '3. Auditer les hyperliens et ancres internes : Exécuter un linter de liens pour détecter toutes les URLs externes 404 et toutes les ancres d’en-têtes désynchronisées.',
    '4. Valider les métadonnées de gouvernance : Vérifier la présence des balises frontmatter `owner`, `last_reviewed` et `review_interval_days`.',
    '5. Exécuter le détecteur de péremption : Identifier les documents dont la dernière révision dépasse le délai fixé (90 ou 180 jours) et notifier les équipes référentes.',
    '6. Intégrer la validation dans la forge : Ajouter un job de gating en intégration continue bloquant la fusion de toute PR qui dégrade la qualité ou brise des liens.'
  ],
  summary: [
    'La qualité documentaire repose sur des critères mesurables : lisibilité objective, intégrité des liens et fraîcheur des contenus.',
    'L’indicateur ASL (Average Sentence Length) doit rester idéalement sous 20 mots par phrase pour minimiser les erreurs d’interprétation en production.',
    'La rupture des liens internes (ancres slugifiées déplacées ou renommées) et externes (404) doit être prévenue par des vérificateurs automatisés en CI.',
    'L’obsolescence documentaire (« Stale Documentation ») est un risque opérationnel majeur traqué via les métadonnées de frontmatter et les dates de commits Git.',
    'La documentation technique fait partie intégrante de la Definition of Done (DoD) : un ticket logiciel n’est pas livré tant que sa documentation n’est pas à jour.',
    'L’archivage propre des documents obsolètes conserve l’historique et oriente les utilisateurs via des bandeaux d’avertissement et des redirections 301.'
  ],
  checklist: [
    'Les phrases explicatives comptent-elles en moyenne moins de 20 mots sans subordonnées complexes superflues ?',
    'Tous les liens internes par ancres (`#mon-ancre`) correspondent-ils exactement à des titres présents dans le document ?',
    'Un outil de vérification de liens est-il exécuté automatiquement dans la chaîne d’intégration continue ?',
    'Chaque document clé comporte-t-il les métadonnées `owner` et `last_reviewed` dans son en-tête frontmatter ?',
    'Un mécanisme d’alerte signale-t-il les documents n’ayant pas été révisés depuis plus de 90 ou 180 jours ?',
    'La mise à jour documentaire est-elle explicitement inscrite dans les critères de validation de la Definition of Done ?'
  ],
  notions: [
    'Métrique Average Sentence Length (ASL)',
    'Indices de lisibilité Flesch &amp; Flesch-Kincaid',
    'Linters de prose et de style (Vale, cspell)',
    'Vérification automatisée de liens (link checking)',
    'Ancres slugifiées et intégrité hypertexte',
    'Détection des documents obsolètes (stale docs)',
    'Métadonnées de gouvernance YAML frontmatter',
    'Intégration dans la Definition of Done (DoD)'
  ],
  pitfalls: [
    'Rédiger des paragraphes entiers composés d’une unique phrase de 60 mots truffée de propositions relatives et de jargon inutile.',
    'Renommer un titre de section Markdown sans corriger les ancres internes qui pointaient vers son ancien identifiant.',
    'Considérer qu’une documentation rédigée il y a 18 mois est toujours exacte sans avoir vérifié les changements intervenus dans le code.',
    'Supprimer brutalement des pages de documentation sans mettre en place de bandeaux d’archivage ou de redirections HTTP 301.'
  ],
  questions: [
    {
      stem: 'Dans l’évaluation ergonomique de la documentation technique, que mesure précisément l’indicateur ASL (Average Sentence Length) ?',
      opts: [
        'Le temps moyen d’exécution d’un script shell',
        'Le nombre moyen de mots contenus par phrase dans le document',
        'La vitesse de compilation du serveur web statique',
        'Le nombre d’images vectorielles présentes par chapitre'
      ],
      correct: 1,
      exp: 'L’ASL (Average Sentence Length) calcule le ratio entre le nombre total de mots et le nombre total de phrases, servant d’étalon de concision rédactionnelle.'
    },
    {
      stem: 'Au-delà de quelle longueur de phrase en mots considère-t-on que la lisibilité et l’assimilation d’une consigne technique critique chutent drastiquement ?',
      opts: [
        'Au-delà de 5 mots',
        'Au-delà de 25 mots',
        'Au-delà de 250 mots',
        'Il n’y a aucune limite, les phrases de 100 mots sont idéales'
      ],
      correct: 1,
      exp: 'Au-delà de 25 mots par phrase, la mémoire de travail du lecteur est saturée, augmentant significativement le risque de mauvaise interprétation lors d’une intervention.'
    },
    {
      stem: 'Lorsqu’un rédacteur renomme le titre Markdown `## Sauvegarde BDD` en `## Sauvegarde Complète BDD`, quel incident survient pour le lien `[Voir](#sauvegarde-bdd)` ?',
      opts: [
        'Le document est automatiquement effacé du serveur',
        'Le lien devient brisé (ancre orpheline), ne pointant plus vers aucun titre valide et laissant le lecteur sans réaction au clic',
        'Le navigateur affiche un écran bleu d’erreur système',
        'Le fichier est converti automatiquement en PDF'
      ],
      correct: 1,
      exp: 'Le lien d’ancre recherche un identifiant dérivé du nouveau titre (`#sauvegarde-complete-bdd`). L’ancienne anbre `#sauvegarde-bdd` n’existant plus, le lien est rompu.'
    },
    {
      stem: 'Pourquoi l’obsolescence documentaire (« Stale Documentation ») représente-t-elle un risque de sécurité et d’exploitation majeur ?',
      opts: [
        'Car elle fait planter les disques durs des serveurs de bases de données',
        'Car elle donne une illusion d’exactitude conduisant des ingénieurs d’astreinte à appliquer des commandes périmées provoquant des interruptions de service',
        'Car elle est interdite par la Constitution',
        'Car elle augmente la facture d’électricité de la salle informatique'
      ],
      correct: 1,
      exp: 'Une documentation obsolète induit en erreur les exploitants, qui appliquent des procédures caduques pensant suivre les recommandations officielles de l’entreprise.'
    },
    {
      stem: 'Quel mécanisme permet de renseigner proprement le responsable et la date limite de révision d’un document Markdown dans un cadre Docs-as-Code ?',
      opts: [
        'Un commentaire manuscrit sur une feuille volante',
        'Un bloc d’en-tête de métadonnées YAML frontmatter placé tout en haut du fichier entre des délimiteurs `---` (`owner`, `last_reviewed`, etc.)',
        'Une image JPEG montrant la photo de l’auteur',
        'Un message envoyé sur un forum de discussion privé'
      ],
      correct: 1,
      exp: 'Le YAML frontmatter normalise les métadonnées de gouvernance en tête de fichier, permettant aux scripts automatisés de parser l’état de fraîcheur du document.'
    },
    {
      stem: 'Dans une équipe appliquant la méthodologie Scrum, que signifie inclure la documentation technique dans la « Definition of Done » (DoD) ?',
      opts: [
        'Interdire de commencer à développer tant que le roman complet n’est pas rédigé',
        'Considérer qu’une fonctionnalité n’est officiellement terminée et livrable que si sa documentation, ses schémas et ses runbooks associés sont à jour et validés',
        'Obliger le chef de projet à écrire tout le code source',
        'Supprimer la documentation dès que le sprint est clos'
      ],
      correct: 1,
      exp: 'La DoD garantit qu’aucune fonctionnalité n’est déclarée terminée si sa documentation associée n’a pas été mise à jour et vérifiée en intégration continue.'
    },
    {
      stem: 'Lorsqu’un service informatique est décommissionné, quelle est la bonne pratique concernant son ancienne documentation en ligne ?',
      opts: [
        'Supprimer brutalement toutes les pages sans avertissement ni redirection',
        'Maintenir la page avec un bandeau clair d’archivage/décommissionnement ou configurer une redirection HTTP 301 vers la documentation du nouveau service',
        'Remplacer le texte par une page blanche',
        'Modifier le mot de passe de tous les ingénieurs'
      ],
      correct: 1,
      exp: 'Conserver l’URL avec un avertissement visible ou rediriger via un code HTTP 301 évite les erreurs 404 et oriente correctement les utilisateurs historiques.'
    },
    {
      stem: 'Quel type d’outil permet d’analyser le style, le respect du vocabulaire d’entreprise et l’absence de tournures passives ou jargonnantes dans les textes Markdown ?',
      opts: [
        'Un linter de prose et de style tel que Vale ou proselint',
        'Un défragmenteur de disque dur',
        'Un compilateur assembleur x86',
        'Un serveur mandataire inverse (Reverse Proxy)'
      ],
      correct: 0,
      exp: 'Vale et proselint sont des linters de prose configurables qui vérifient la conformité éditoriale des documents texte par rapport à des règles prédéfinies.'
    }
  ],
  flashcards: [
    {
      q: 'Qu’est-ce que l’indicateur ASL en rédaction technique ?',
      a: 'L’Average Sentence Length : le nombre moyen de mots par phrase, qui doit idéalement rester sous les 20 mots pour une clarté maximale.'
    },
    {
      q: 'Pourquoi les liens d’ancres internes Markdown se brisent-ils fréquemment ?',
      a: 'Parce qu’un rédacteur renomme un titre sans mettre à jour les hyperliens (`#ancre`) qui pointaient vers l’ancien identifiant généré.'
    },
    {
      q: 'Qu’est-ce qu’un « Stale Document » ?',
      a: 'Un document technique obsolète dont le contenu n’a pas été révisé depuis une période critique et qui ne reflète plus l’état réel de la production.'
    },
    {
      q: 'Quel est l’intérêt du YAML frontmatter dans un document Docs-as-Code ?',
      a: 'Il permet de déclarer de façon lisible par machine des métadonnées essentielles : propriétaire (`owner`), date de révision (`last_reviewed`), statut.'
    },
    {
      q: 'Pourquoi la documentation doit-elle faire partie de la Definition of Done ?',
      a: 'Pour empêcher l’accumulation de dette documentaire en interdisant de considérer une tâche comme achevée si sa documentation n’est pas mise à niveau.'
    },
    {
      q: 'Quelle est la bonne pratique lors de l’archivage d’un document technique ?',
      a: 'Afficher un bandeau d’obsolescence pointant vers la nouvelle ressource ou mettre en place une redirection permanente HTTP 301.'
    }
  ],
  mastery: [
    {
      cls: 'low',
      text: 'Moins de 4/8 : Révisez les règles de concision (ASL), les vérifications d’ancres et la gestion de l’obsolescence documentaire.'
    },
    {
      cls: 'medium',
      text: 'Entre 5/8 et 7/8 : Bon niveau, approfondissez les algorithmes de détection stale docs et l’intégration continue avec Vale.'
    },
    {
      cls: 'high',
      text: '8/8 : Remarquable ! Vous maîtrisez la gouvernance, l’automatisation et le cycle de vie complet de la documentation technique.'
    }
  ]
};

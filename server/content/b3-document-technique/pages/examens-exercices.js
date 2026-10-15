/**
 * Pages « examens » et « exercices » du cours « Document Technique B3 ».
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens Blancs ======================== */

function examens(course) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Examens blancs' }
  ]);

  const body = [
    crumbs,
    '  <h1>Examens Blancs &amp; Épreuves Corrigées de Document Technique B3</h1>',
    '  <p class="lead">Deux épreuves d’évaluation complètes conformes aux exigences professionnelles et académiques de niveau Bachelor 3 / Licence 3.</p>',
    '',
    '  <h2>Épreuve 1 : Contrôle Continu (CC) — Durée 1 h 30 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet du Contrôle Continu — Typologies, Cadre 5W1H, SFD/STD &amp; Traçabilité RTM', [
      '<h4>Partie 1 : Typologies Documentaires &amp; Cadre 5W1H (6 points)</h4>',
      '<ol>',
      '  <li>Distinguez précisément le Dossier d’Architecture Technique (DAT) du Dossier d’Exploitation (DEX). Citez deux destinataires cibles distincts pour chacun de ces deux livrables. (3 pts)</li>',
      '  <li>Appliquez le cadre méthodologique 5W1H (QQOQCP) pour formaliser le paragraphe d’en-tête d’un guide d’installation d’une base de données PostgreSQL répliquée. Détaillez chacune des 6 dimensions. (3 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Spécifications Fonctionnelles &amp; Techniques (7 points)</h4>',
      '<ol>',
      '  <li>Quels sont les 5 éléments indispensables qui constituent un cas d’utilisation (Use Case) canonique dans une Spécification Fonctionnelle Détaillée (SFD) ? Pourquoi le scénario d’exception (ou alternatif) est-il tout aussi crucial que le scénario nominal ? (3 pts)</li>',
      '  <li>Une entreprise développe un système de gestion des commandes comportant 24 exigences métier (REQ). La matrice de traçabilité (RTM) montre que 20 exigences disposent d’une SFD et de tests de recette, 3 exigences sont spécifiées mais n’ont aucun cas de test, et 1 exigence n’a ni spécification ni test. Calculez le taux de couverture complète et commentez les risques projets associés. (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Rédaction de Contrats d’API REST &amp; OpenAPI (7 points)</h4>',
      '<ol>',
      '  <li>Dans une spécification OpenAPI 3.0, pour une route <code>POST /api/v1/abonnements</code>, quelles sont les trois réponses HTTP (codes statut) minimales à documenter impérativement ? Justifiez pour chacune la signification et le schéma de retour attendu. (3 pts)</li>',
      '  <li>Expliquez l’intérêt de l’approche « API-First » par rapport à une documentation rédigée a posteriori après le codage. (4 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé du Contrôle Continu', [
      '<h4>Corrigé Partie 1 (6 points)</h4>',
      '<ul>',
      '  <li><strong>DAT vs DEX (3 pts) :</strong> Le DAT décrit la structure globale statique et dynamique du système (serveurs, réseau, protocoles, stockage, briques logicielles) et s’adresse aux architectes d’entreprise, RSSI et intégrateurs. Le DEX (ou Runbook) décrit les procédures opérationnelles quotidiennes (démarrage ordonnancé, sauvegardes, restauration RTO/RPO, gestion des certificats, diagnostic d’incident) et s’adresse aux équipes d’exploitation, SRE et techniciens d’astreinte.</li>',
      '  <li><strong>Application 5W1H (3 pts) :</strong><br>' +
      '    - <em>QUI :</em> Administrateurs de bases de données (DBA) et ingénieurs DevOps.<br>' +
      '    - <em>QUOI :</em> Déploiement et configuration d’un cluster PostgreSQL 16 avec réplication streaming synchrone.<br>' +
      '    - <em>QUAND :</em> Phase de mise en service de l’infrastructure de production.<br>' +
      '    - <em>OÙ :</em> Deux machines virtuelles Linux Debian 12 sur le VPC interne privé.<br>' +
      '    - <em>POURQUOI :</em> Garantir la haute disponibilité des données avec un RPO = 0 et tolérance à la panne d’un nœud.<br>' +
      '    - <em>COMMENT :</em> Procédure pas-à-pas avec commandes Bash, script patron de configuration et playbook Ansible.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Use Case &amp; Scénarios alternatifs (3 pts) :</strong> Les 5 éléments requis sont : Acteur principal, Déclencheur (Trigger), Préconditions, Scénario nominal (étapes de succès) et Postconditions. Le scénario d’exception est fondamental car en production, la majorité des failles et comportements erratiques surviennent lors de situations dégradées (timeout réseau, solde insuffisant, token expiré) ; s’ils ne sont pas spécifiés, chaque développeur implémente une gestion arbitraire divergente.</li>',
      '  <li><strong>Calcul de Couverture RTM (4 pts) :</strong><br>' +
      '    $$Couverture_{complete} = \\frac{20}{24} \\times 100 \\approx 83.33\\,\\%$$<br>' +
      '    <strong>Risques identifiés :</strong> Les 3 exigences sans tests encourent un risque élevé de régression non détectée lors des déploiements. L’exigence orpheline (1/24 soit 4.17%) représente un angle mort critique : le besoin métier a été exprimé mais n’a jamais été pris en compte dans les spécifications ni dans le cycle de vérification.</li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Codes HTTP OpenAPI (3 pts) :</strong><br>' +
      '    - <code>201 Created :</code> Succès de création de l’abonnement, retourne l’objet abonnement créé avec son identifiant et l’en-tête <code>Location</code>.<br>' +
      '    - <code>400 Bad Request :</code> Données d’entrée invalides (champs obligatoires manquants, format email erroné), retourne un schéma d’erreur avec la liste détaillée des champs incriminés.<br>' +
      '    - <code>401 Unauthorized :</code> Absence ou invalidité du token JWT porteur.</li>',
      '  <li><strong>Approche API-First (4 pts) :</strong> L’approche API-First consiste à concevoir et faire valider la spécification OpenAPI du contrat d’interface <em>avant</em> toute écriture de code. Cela permet aux équipes front-end et back-end de développer en parallèle grâce à des serveurs de mocks générés automatiquement, élimine les ambiguïtés contractuelles et garantit que la documentation ne dérive jamais du code.</li>',
      '</ul>'
    ].join('\n')),
    '',
    '  <h2>Épreuve 2 : Examen Terminal — Durée 2 h 00 (Barème sur 20 points)</h2>',
    box('standard', 'Sujet de l’Examen Terminal — Dossier d’Exploitation, RTO/RPO, Docs-as-Code &amp; Maintenance Continue', [
      '<h4>Partie 1 : Dossier d’Exploitation (DEX), RTO &amp; RPO (7 points)</h4>',
      '<p>Dans le cadre d’un audit de résilience d’une plateforme bancaire, vous devez auditer les procédures d’exploitation :</p>',
      '<ol>',
      '  <li>Définissez précisément les métriques RTO (Recovery Time Objective) et RPO (Recovery Point Objective). (2 pts)</li>',
      '  <li>Le contrat de service impose un RTO maximal de 30 minutes et un RPO maximal de 15 minutes. La procédure de restauration actuelle repose sur une sauvegarde incrémentielle quotidienne effectuée chaque nuit à 02h00 et un temps de rechargement moyen mesuré à 45 minutes. Ce plan est-il conforme ? Justifiez par le calcul et proposez des mesures correctives d’ingénierie concrètes. (5 pts)</li>',
      '</ol>',
      '<h4>Partie 2 : Approche Docs-as-Code &amp; Outillage Collaboratif (7 points)</h4>',
      '<ol>',
      '  <li>Définissez le paradigme « Docs-as-Code » et exposez ses quatre piliers fondamentaux par comparaison avec la gestion documentaire bureautique traditionnelle (fichiers Word partagés par email). (3 pts)</li>',
      '  <li>Rédigez la syntaxe textuelle Mermaid pour représenter un diagramme de séquence illustrant l’authentification d’un utilisateur via un serveur d’autorisation OAuth2 (Acteurs : Utilisateur, Navigateur, Passerelle, Serveur OAuth2). (4 pts)</li>',
      '</ol>',
      '<h4>Partie 3 : Qualité Documentaire &amp; Prévention de l’Obsolescence (6 points)</h4>',
      '<ol>',
      '  <li>Qu’appelle-t-on la « Dette Documentaire » (Rotten Documentation) et quels sont les risques opérationnels directs lors d’une gestion de crise de production ? (3 pts)</li>',
      '  <li>Concevez l’architecture d’un pipeline de CI/CD automatisé chargé de vérifier la conformité de la documentation technique à chaque pull request (citer au moins 3 outils ou vérifications automatiques). (3 pts)</li>',
      '</ol>'
    ].join('\n')),
    '',
    box('solution', 'Corrigé type &amp; Barème détaillé de l’Examen Terminal', [
      '<h4>Corrigé Partie 1 (7 points)</h4>',
      '<ul>',
      '  <li><strong>RTO vs RPO (2 pts) :</strong> Le RTO est la durée maximale tolérée d’interruption de service avant remise en marche opérationnelle. Le RPO est la quantité maximale de données qu’une organisation peut accepter de perdre en cas de crash, exprimée en durée écoulée depuis la dernière sauvegarde valide.</li>',
      '  <li><strong>Audit &amp; Mesures correctives (5 pts) :</strong><br>' +
      '    - <em>Analyse RTO :</em> Temps de rechargement = 45 min &gt; RTO max contractuel (30 min). <strong>Non conforme (dépassement de 15 min).</strong><br>' +
      '    - <em>Analyse RPO :</em> Sauvegarde nocturne unique &rarr; si un sinistre survient à 18h00, 16 heures de données transactionnelles sont perdues, soit 960 minutes &gt; RPO max (15 min). <strong>Non conforme critique (dépassement de 945 min).</strong><br>' +
      '    - <em>Mesures correctives :</em> Mettre en place une réplication synchrone ou asynchrone des journaux de transactions (WAL shipping ou réplication streaming avec RPO &lt; 5 secondes) et automatiser le failover via orchestrateur (Patroni / Orchestrator) pour faire chuter le RTO sous 3 minutes.</li>',
      '</ul>',
      '<h4>Corrigé Partie 2 (7 points)</h4>',
      '<ul>',
      '  <li><strong>Paradigme Docs-as-Code (3 pts) :</strong> Traiter la documentation comme du code source logiciel :<br>' +
      '    1. <em>Formats textes légers :</em> Markdown ou AsciiDoc stockés dans le même dépôt Git que le code.<br>' +
      '    2. <em>Contrôle de version :</em> branches, commits atomiques et historique complet via Git.<br>' +
      '    3. <em>Revues collaboratives :</em> revue par les pairs (Peer Review) via Pull Requests.<br>' +
      '    4. <em>Automatisation CI/CD :</em> compilation, validation syntaxique et publication automatique sur serveur web (Docusaurus/MkDocs).</li>',
      '  <li><strong>Diagramme de Séquence Mermaid (4 pts) :</strong><br>' +
      '    <pre><code>sequenceDiagram\n    actor U as Utilisateur\n    participant B as Navigateur\n    participant G as Passerelle API\n    participant A as Serveur OAuth2\n    U->>B: Clic connexion\n    B->>A: Requete GET /authorize\n    A-->>B: Formulaire de login\n    U->>A: Saisie identifiants\n    A-->>B: Redirection avec Code d\'autorisation\n    B->>G: Echange Code contre Token JWT\n    G->>A: Validation du Code\n    A-->>G: Token JWT valide\n    G-->>B: Cookie de session securise\n    B-->>U: Connexion reussie</code></pre></li>',
      '</ul>',
      '<h4>Corrigé Partie 3 (6 points)</h4>',
      '<ul>',
      '  <li><strong>Dette Documentaire &amp; Risques (3 pts) :</strong> La dette documentaire désigne la dérive progressive entre le code en production et une documentation qui n’a pas été mise à jour lors des évolutions logicielles. En situation de crise (incident d’astreinte de nuit), une documentation obsolète induit en erreur les techniciens, les pousse à exécuter des commandes inadaptées, aggrave la panne et fait exploser le MTTR.</li>',
      '  <li><strong>Pipeline CI/CD Documentaire (3 pts) :</strong><br>' +
      '    1. <em>Markdownlint :</em> vérifie la syntaxe, la hiérarchie des titres et l’absence de sauts de niveau.<br>' +
      '    2. <em>Link Checker (ex. lychee) :</em> teste automatiquement tous les hyperliens internes et URLs externes pour interdire les liens brisés (erreur 404).<br>' +
      '    3. <em>Validateur OpenAPI (Spectral / Redocly CLI) :</em> contrôle la conformité des schémas JSON et la présence de descriptions sur chaque route avant déploiement sur GitHub Pages.</li>',
      '</ul>'
    ].join('\n')),
    '',
    chnav({ href: 'formules.html', label: 'Consulter le mémento des normes' }, { href: 'exercices.html', label: 'Accéder aux 18 exercices pratiques' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/examens.html': {
      title: 'Examens Blancs &amp; Épreuves Corrigées — ' + course.brand,
      description: 'Épreuves types de contrôle continu et d’examen terminal corrigées pour le cours Document Technique B3.',
      active: 'examens',
      body
    }
  };
}

/* ======================== Exercices Pratiques ======================== */

function exercices(course, chapterList) {
  const crumbs = crumb(course, [
    { label: 'Accueil', href: '../index.html' },
    { label: 'Sommaire', href: '../sommaire.html' },
    { label: 'Exercices pratiques' }
  ]);

  const exercisesByChapter = [
    {
      n: 1,
      title: 'Typologies, Cibles &amp; Enjeux Stratégiques de la Documentation IT',
      items: [
        { id: 'dt3-c1-e1', title: 'Classificateur de typologie documentaire et d’audience cible', goal: 'Déduire automatiquement la nature du document (USER_GUIDE, API_DOC, DAT, DEX, SFD) et son audience.' },
        { id: 'dt3-c1-e2', title: 'Auditeur de complétude du cadre 5W1H (QQOQCP)', goal: 'Vérifier la présence et la qualité des 6 dimensions obligatoires dans l’en-tête d’un document technique.' },
        { id: 'dt3-c1-e3', title: 'Évaluateur d’adéquation du registre lexical selon l’audience', goal: 'Mesurer la densité de jargon technique dans un texte pour valider son adéquation au public visé.' }
      ]
    },
    {
      n: 2,
      title: 'Spécifications Fonctionnelles (SFD) &amp; Techniques (STD)',
      items: [
        { id: 'dt3-c2-e1', title: 'Validateur formel de cas d’utilisation (Use Case) en SFD', goal: 'Vérifier la complétude structurelle d’une fiche de cas d’utilisation : acteur, préconditions, scénario, postconditions.' },
        { id: 'dt3-c2-e2', title: 'Matrice de traçabilité des exigences (Requirements Traceability Matrix - RTM)', goal: 'Auditer la couverture bidirectionnelle entre une exigence métier, sa spécification et son test de recette.' },
        { id: 'dt3-c2-e3', title: 'Validateur de matrice de flux réseau pour Spécification Technique Détaillée (STD)', goal: 'Analyser une matrice de flux pare-feu et alerter sur les règles trop permissives (ANY/ALL).' }
      ]
    },
    {
      n: 3,
      title: 'Architecture &amp; Documentation Système (DAT &amp; DEX)',
      items: [
        { id: 'dt3-c3-e1', title: 'Analyseur d’objectifs de reprise d’activité (RTO &amp; RPO) dans un DEX', goal: 'Confronter les temps estimés de reprise (RTO) et de perte de données (RPO) aux engagements contractuels.' },
        { id: 'dt3-c3-e2', title: 'Ordonnanceur de procédure d’arrêt et de démarrage d’infrastructure (Runbook DEX)', goal: 'Calculer la séquence d’exécution ordonnancée des couches de composants pour un démarrage ou arrêt sécurisé.' },
        { id: 'dt3-c3-e3', title: 'Analyseur de procédure de bascule de secours PRA (Failover Downtime)', goal: 'Calculer le temps total d’indisponibilité prévisionnel d’une bascule de secours et vérifier sa conformité au SLA.' }
      ]
    },
    {
      n: 4,
      title: 'Documentation d’API &amp; Référence Technique (OpenAPI / Swagger)',
      items: [
        { id: 'dt3-c4-e1', title: 'Validateur de spécification de route d’API REST (OpenAPI 3.0)', goal: 'Vérifier la méthode HTTP, le chemin normalisé et la documentation des codes 2xx et d’erreurs 4xx/5xx.' },
        { id: 'dt3-c4-e2', title: 'Extracteur et auditeur de docstrings de code (Format Google / Sphinx)', goal: 'Vérifier qu’une fonction possède une documentation complète de ses paramètres et de sa valeur de retour.' },
        { id: 'dt3-c4-e3', title: 'Validateur de contrat de schéma JSON (JSON Schema Contract)', goal: 'Vérifier la conformité typée d’un payload JSON par rapport au schéma contractuel documenté.' }
      ]
    },
    {
      n: 5,
      title: 'Approche Docs-as-Code &amp; Outils Modernes',
      items: [
        { id: 'dt3-c5-e1', title: 'Linter de hiérarchie des titres Markdown (Structure Docs-as-Code)', goal: 'Vérifier la structure stricte d’un document Markdown : H1 unique, pas de saut de niveau et pas de titre vide.' },
        { id: 'dt3-c5-e2', title: 'Validateur de diagramme textuel Mermaid (Docs-as-Code)', goal: 'Vérifier la validité de l’en-tête d’un diagramme Mermaid et la connectivité globale de ses nœuds.' },
        { id: 'dt3-c5-e3', title: 'Générateur d’arborescence de navigation MkDocs / Docusaurus (YAML Nav)', goal: 'Convertir une liste de fichiers Markdown hiérarchisés en section de navigation conforme triée.' }
      ]
    },
    {
      n: 6,
      title: 'Qualité Documentaire, Tests Automatisés &amp; Maintenance Continue',
      items: [
        { id: 'dt3-c6-e1', title: 'Calculateur de longueur moyenne de phrase et de clarté documentaire', goal: 'Mesurer la longueur moyenne des phrases (ASL) d’un texte pour alerter sur la complexité cognitive excessive.' },
        { id: 'dt3-c6-e2', title: 'Vérificateur automatisé de liens et d’ancres Markdown (Link Checker)', goal: 'Auditer les liens hypertextes et détecter les protocoles non sécurisés ou les ancres inexistantes.' },
        { id: 'dt3-c6-e3', title: 'Détecteur de dette documentaire et de désynchronisation (Stale Docs)', goal: 'Comparer l’horodatage de modification du code à celui de la documentation pour détecter l’obsolescence.' }
      ]
    }
  ];

  const sectionsHtml = exercisesByChapter.map(group => [
    '  <h3>Module ' + group.n + ' — ' + group.title + '</h3>',
    '  <div class="grid grid-3">',
    group.items.map(ex => [
      '    <div class="card">',
      '      <div class="card__head">',
      '        <span class="badge">' + ex.id + '</span>',
      '      </div>',
      '      <h4>' + ex.title + '</h4>',
      '      <p>' + ex.goal + '</p>',
      '      <a class="btn btn--sm" href="chapitre' + group.n + '.html#' + ex.id + '">Pratiquer dans le module ' + ic('arrow-right') + '</a>',
      '    </div>'
    ].join('\n')).join('\n'),
    '  </div>'
  ].join('\n')).join('\n\n');

  const body = [
    crumbs,
    '  <h1>Catalogue des 18 Exercices Pratiques de Document Technique</h1>',
    '  <p class="lead">Tous les ateliers interactifs en Python 3 intégrés au cours, couvrant la structuration Markdown, les contrats OpenAPI, la traçabilité RTM et l’audit de qualité.</p>',
    '',
    sectionsHtml,
    '',
    chnav({ href: 'examens.html', label: 'Consulter les examens blancs' }, { href: '../atelier.html', label: 'Ouvrir l’atelier libre' }),
    '',
    disclaimer()
  ].join('\n\n');

  return {
    'chapitres/exercices.html': {
      title: 'Exercices pratiques de code — ' + course.brand,
      description: 'Répertoire complet des 18 exercices de code Document Technique B3 avec objectifs et liens directs vers les ateliers.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

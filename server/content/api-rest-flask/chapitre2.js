/**
 * Chapitre 2 du cours « API REST avec Flask » B2 — Architecture REST & modélisation des ressources.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 2,
  title: 'Architecture REST & modélisation des ressources',
  short: 'REST & Ressources',
  toc: 'Contraintes architecturales de Roy Fielding, conventions d’URI, verbes HTTP canoniques, sécurité et idempotence.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Concevoir une API sans règles directrices produit des routes chaotiques (ex. /creerUtilisateur, /delete_item?id=5) ' +
    'difficiles à maintenir et à consommer. L’architecture REST standardise l’organisation autour de ressources ' +
    'identifiées par des URI stables et manipulées par les verbes natifs du protocole HTTP.',

  objectives: [
    'assimiler les contraintes fondatrices du style architectural REST ;',
    'comprendre le principe fondamental du Stateless (sans état) ;',
    'modéliser des URI canoniques basées sur des noms pluriels et hiérarchiques ;',
    'associer chaque verbe HTTP (GET, POST, PUT, PATCH, DELETE) à son usage canonique ;',
    'distinguer les notions clés de sécurité (safe) et d’idempotence des opérations.'
  ],

  sections: [
    {
      title: 'Les fondements de l’architecture REST',
      html: [
        '<p>L’acronyme <strong>REST</strong> (<em>Representational State Transfer</em>) désigne un style architectural ' +
        'théorisé en 2000 par <strong>Roy Fielding</strong> dans sa thèse de doctorat. REST ne constitue pas un protocole ' +
        'ou une norme fermée, mais un ensemble de contraintes architecturales guidant la conception d’API distribuées.</p>',
        '<p>Les 6 contraintes majeures de REST sont :</p>',
        '<ol>\n' +
        '  <li><strong>Architecture Client-Serveur</strong> : séparation stricte de l’interface utilisateur et de la logique de persistance.</li>\n' +
        '  <li><strong>Sans état (Stateless)</strong> : chaque requête du client doit contenir toutes les informations nécessaires à son traitement par le serveur. Aucune session de contexte client n’est conservée sur le serveur entre deux appels.</li>\n' +
        '  <li><strong>Mise en cache (Cacheable)</strong> : les réponses doivent explicitement se déclarer cachables ou non pour réduire la latence.</li>\n' +
        '  <li><strong>Interface uniforme</strong> : identification standardisée des ressources par URI, manipulation par représentations, messages auto-descriptifs et hypermédias (HATEOAS).</li>\n' +
        '  <li><strong>Système en couches (Layered System)</strong> : le client ne sait pas s’il communique avec le serveur final, un reverse proxy ou un répartiteur de charge.</li>\n' +
        '  <li><strong>Code à la demande (optionnel)</strong> : exécution de scripts côté client (ex. JavaScript).</li>\n' +
        '</ol>',
        box('intuition', 'Stateless : Pourquoi aucune session serveur ?', 'lightbulb',
          '    <p>Le principe du <em>Stateless</em> garantit une excellente scalabilité horizontale : n’importe ' +
          'quel nœud d’un cluster de serveurs peut traiter n’importe quelle requête client, à condition que le client ' +
          'transmette son jeton d’authentification à chaque fois.</p>')
      ].join('\n')
    },
    {
      title: 'Conception d’URI canoniques pour les ressources',
      html: [
        '<p>Dans une API RESTful, une <strong>ressource</strong> représente une entité métier du système ' +
        '(un utilisateur, un article, une facture). L’identification s’effectue à l’aide d’une <strong>URI</strong> ' +
        '(<em>Uniform Resource Identifier</em>).</p>',
        '<p>Règles d’or de nommage des URI REST :</p>',
        '<ul>\n' +
        '  <li><strong>Utiliser des noms, jamais des verbes</strong> : <code>/articles</code> et non <code>/getArticles</code>.</li>\n' +
        '  <li><strong>Privilégier le pluriel pour les collections</strong> : <code>/utilisateurs</code> pour la collection, <code>/utilisateurs/42</code> pour un élément.</li>\n' +
        '  <li><strong>Minuscules et tirets</strong> : privilégier le kebab-case (ex. <code>/centres-interet</code>) et bannir les majuscules ou underscores.</li>\n' +
        '  <li><strong>Hiérarchie logique d’imbrication</strong> : pour une sous-ressource dépendante : <code>/auteurs/7/livres</code> ou <code>/commandes/12/lignes/3</code>.</li>\n' +
        '</ul>',
        box('warn', 'Anti-pattern : Le verbe dans l’URI', 'shield',
          '    <p>Évitez à tout prix les URI contenant des actions comme <code>/api/ajouterUtilisateur</code> ' +
          'ou <code>/api/supprimerArticle?id=12</code>. En REST, l’URI désigne la ressource (le <em>quoi</em>) ' +
          'et le verbe HTTP exprime l’action (le <em>comment</em>).</p>')
      ].join('\n')
    },
    {
      title: 'Verbes HTTP et matrice CRUD',
      html: [
        '<p>L’interface uniforme REST mappe directement les opérations fondamentales de manipulation de données (CRUD) ' +
        'sur les méthodes standard du protocole HTTP :</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Verbe HTTP</th><th>URI cible</th><th>Rôle CRUD</th><th>Statut typique</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td><code>GET</code></td><td><code>/articles</code></td><td>Lister la collection</td><td><code>200 OK</code></td></tr>\n' +
        '    <tr><td><code>GET</code></td><td><code>/articles/42</code></td><td>Consulter une ressource individuelle</td><td><code>200 OK</code></td></tr>\n' +
        '    <tr><td><code>POST</code></td><td><code>/articles</code></td><td>Créer une nouvelle ressource</td><td><code>201 Created</code></td></tr>\n' +
        '    <tr><td><code>PUT</code></td><td><code>/articles/42</code></td><td>Remplacement complet d’une ressource</td><td><code>200 OK</code></td></tr>\n' +
        '    <tr><td><code>PATCH</code></td><td><code>/articles/42</code></td><td>Modification partielle d’attributs</td><td><code>200 OK</code></td></tr>\n' +
        '    <tr><td><code>DELETE</code></td><td><code>/articles/42</code></td><td>Suppression d’une ressource</td><td><code>204 No Content</code></td></tr>\n' +
        '  </tbody>\n' +
        '</table>'
      ].join('\n')
    },
    {
      title: 'Sécurité et Idempotence des opérations',
      html: [
        '<p>Deux propriétés fondamentales régissent le comportement prédictible des méthodes HTTP :</p>',
        '<ul>\n' +
        '  <li><strong>Méthode sûre (Safe)</strong> : n’altère aucunement l’état du serveur (aucune écriture ou modification en base). ' +
        'Seuls <code>GET</code>, <code>HEAD</code> et <code>OPTIONS</code> sont réputés sûrs.</li>\n' +
        '  <li><strong>Méthode idempotente</strong> : exécuter la requête une seule fois ou 100 fois consécutives produit exactement ' +
        'le même état final sur le serveur. <code>GET</code>, <code>PUT</code> et <code>DELETE</code> sont idempotents. ' +
        'En revanche, <code>POST</code> <strong>n’est pas idempotent</strong> (répéter la requête crée 100 ressources dupliquées).</li>\n' +
        '</ul>',
        box('tech', 'PUT vs PATCH : La nuance essentielle', 'code',
          '    <p><code>PUT</code> exige de fournir l’intégralité de la ressource : les champs omis sont souvent ' +
          'écrasés ou réinitialisés à leur valeur par défaut. <code>PATCH</code> ne transmet que les champs ' +
          'à modifier sans altérer les autres propriétés existantes.</p>')
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Qui a théorisé l’architecture REST en l’an 2000 ?', opts: ['Roy Fielding', 'Tim Berners-Lee', 'Linus Torvalds'], correct: 0, exp: 'Roy Fielding a présenté les principes fondamentaux de REST dans sa thèse doctorale.' },
    { stem: 'Que signifie la contrainte Stateless dans une API REST ?', opts: ['Le serveur ne conserve aucun état client entre deux requêtes successives', 'Le serveur ne possède aucune base de données', 'Les requêtes n’ont pas le droit de modifier les données'], correct: 0, exp: 'Chaque requête doit être auto-suffisante et fournir toutes les informations nécessaires à son traitement.' },
    { stem: 'Quelle URI respecte le mieux les conventions de nommage REST ?', opts: ['/api/v1/etudiants/42', '/api/v1/recupererEtudiant?id=42', '/api/v1/get_etudiant_42'], correct: 0, exp: 'Les URI REST utilisent des noms au pluriel et séparent l’identifiant par un slash.' },
    { stem: 'Quel verbe HTTP est utilisé pour remplacer intégralement une ressource ?', opts: ['PUT', 'PATCH', 'POST'], correct: 0, exp: 'PUT remplace l’intégralité de la ressource ciblée par la nouvelle représentation.' },
    { stem: 'Une méthode HTTP est dite idempotente si…', opts: ['La répéter plusieurs fois produit le même résultat sur le serveur', 'Elle ne renvoie jamais de code d’erreur 404', 'Elle est obligatoirement chiffrée en HTTPS'], correct: 0, exp: 'L’idempotence garantit qu’une répétition d’appels identiques ne modifie pas l’état du serveur au-delà du premier.' },
    { stem: 'Lequel de ces verbes HTTP n’est PAS idempotent ?', opts: ['POST', 'PUT', 'DELETE'], correct: 0, exp: 'Exécuter plusieurs requêtes POST identiques entraîne des créations multiples successives.' },
    { stem: 'Quelle méthode HTTP modifie partiellement certains attributs d’une ressource ?', opts: ['PATCH', 'PUT', 'GET'], correct: 0, exp: 'PATCH est conçu spécifiquement pour les modifications différentielles ou partielles.' },
    { stem: 'Pour lister les commandes passées par l’utilisateur 7, quelle URI est la plus RESTful ?', opts: ['/utilisateurs/7/commandes', '/commandes_utilisateur_7', '/listeCommandes?user=7'], correct: 0, exp: 'La hiérarchie /utilisateurs/7/commandes exprime élégamment la relation parent-enfant.' }
  ],

  pitfalls: [
    'Insérer des verbes d’action dans l’URI (ex. /modifierArticle au lieu de PUT /articles/1).',
    'Conserver des sessions utilisateur côté serveur (session cookie d’état) dans une API qui se veut RESTful.',
    'Utiliser le verbe GET pour effectuer une mutation ou une suppression (non-respect de la sécurité HTTP).',
    'Confondre PUT (remplacement intégral) et PATCH (mise à jour partielle d’attributs).',
    'Employer des noms au singulier de manière incohérente (/client puis /articles).'
  ],

  methodTitle: 'Modéliser une ressource et ses points d’accès REST',
  method: [
    '<strong>Identifier les entités métier</strong> : repérer les concepts clés du domaine (utilisateurs, commandes, produits).',
    '<strong>Fixer l’URI de base</strong> : choisir un substantif au pluriel en minuscules (ex. /produits).',
    '<strong>Structurer les relations</strong> : concevoir les sous-ressources imbriquées pour les dépendances fortes.',
    '<strong>Mapper les verbes HTTP</strong> : associer GET, POST, PUT, PATCH et DELETE aux besoins de l’application.',
    '<strong>Valider l’idempotence</strong> : s’assurer que les méthodes sûres et idempotentes respectent leur contrat.'
  ],

  summary: [
    'REST est un style architectural fondé sur le découplage client-serveur et l’absence d’état (Stateless).',
    'Les URI identifient des ressources au moyen de substantifs au pluriel, sans verbes d’action.',
    'Les verbes HTTP (GET, POST, PUT, PATCH, DELETE) expriment les opérations de manipulation.',
    'Une opération sûre ne modifie pas le serveur ; une opération idempotente peut être rejouée sans effet cumulé.',
    'PUT remplace la ressource en totalité, tandis que PATCH applique une mise à jour partielle.'
  ],

  checklist: [
    'Je connais les 6 contraintes architecturales majeures de REST.',
    'Je comprends l’intérêt du Stateless pour la montée en charge.',
    'Je sais concevoir des URI de collections et d’éléments cohérentes.',
    'Je sais choisir le bon verbe HTTP pour chaque cas d’usage CRUD.',
    'Je sais expliquer la différence entre sécurité et idempotence.'
  ],

  notions: ['REST', 'Roy Fielding', 'Stateless', 'Ressource', 'URI', 'CRUD', 'Idempotence', 'Sécurité HTTP', 'PUT', 'PATCH'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les 6 contraintes de REST et la règle du sans-état.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur le nommage d’URI et le choix du bon verbe HTTP.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises la conception et les nuances PUT/PATCH.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à l’implémentation pratique avec Flask au chapitre 3.' }
  ],

  flashcards: [
    { q: 'Que signifie REST ?', a: 'Representational State Transfer (Transfert d’état représentationnel).' },
    { q: 'Pourquoi les URI REST ne doivent-elles pas contenir de verbes ?', a: 'Parce que l’URI identifie la ressource ciblée, tandis que le verbe HTTP exprime l’action réalisée.' },
    { q: 'Qu’est-ce qu’une opération idempotente ?', a: 'Une opération dont l’exécution répétée plusieurs fois produit exactement le même effet qu’une seule exécution.' },
    { q: 'Le verbe POST est-il idempotent ?', a: 'Non : réexécuter une requête POST crée plusieurs ressources distinctes.' },
    { q: 'Quelle est la différence fondamentale entre PUT et PATCH ?', a: 'PUT remplace l’intégralité de la ressource, tandis que PATCH modifie uniquement les champs ciblés.' },
    { q: 'Quels sont les verbes HTTP considérés comme sûrs (safe) ?', a: 'Principalement GET, HEAD et OPTIONS, car ils n’altèrent pas les données du serveur.' }
  ],

  next: {
    href: 'chapitre3.html',
    label: 'Chapitre 3 : Démarrage avec Flask & Routage'
  }
};

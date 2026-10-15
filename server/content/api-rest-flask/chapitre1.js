/**
 * Chapitre 1 du cours « API REST avec Flask » B2 — API Web & le protocole HTTP.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 1,
  title: 'API Web & le protocole HTTP',
  short: 'API Web & HTTP',
  toc: 'Architecture client-serveur, cycle requête/réponse HTTP, en-têtes Content-Type et Accept, structure JSON et encodage.',
  time: '≈ 2 h 30 de travail',
  free: true,

  situation:
    'Dans les architectures logicielles actuelles, les applications frontend (React, Vue, mobile) et les ' +
    'micro-services doivent échanger des données de façon standardisée et découplée. Le protocole HTTP et ' +
    'le format JSON constituent le socle universel de cet échange moderne.',

  objectives: [
    'comprendre le modèle d’échange client-serveur sur le Web ;',
    'analyser la structure d’une requête et d’une réponse HTTP ;',
    'différencier les verbes HTTP fondamentaux (GET, POST, PUT, DELETE) ;',
    'maîtriser le rôle des en-têtes Content-Type et Accept pour la négociation de contenu ;',
    'manipuler les types de données fondamentaux du format JSON.'
  ],

  sections: [
    {
      title: 'L’architecture client-serveur et les API Web',
      html: [
        '<p>Une <strong>API</strong> (<em>Application Programming Interface</em>) définit un contrat formel ' +
        'permettant à deux programmes informatiques distincts de communiquer et d’échanger des données. ' +
        'Dans le contexte web, une API Web expose des points d’entrée (<em>endpoints</em>) accessibles via le ' +
        'protocole HTTP sur le réseau.</p>',
        '<p>Le modèle repose sur une stricte séparation des responsabilités :</p>',
        '<ul>\n' +
        '  <li><strong>Le Client</strong> : initie les demandes (navigateur web, application mobile, script serveur, outil cURL).</li>\n' +
        '  <li><strong>Le Serveur</strong> : reçoit les requêtes, traite la logique métier, interroge la base de données et renvoie une réponse structurée.</li>\n' +
        '</ul>',
        box('intuition', 'L’API comme menu de restaurant', 'lightbulb',
          '    <p>Le client est le client assis à table, le serveur est la cuisine, et l’API est le menu : ' +
          'le client commande un plat précis selon les règles du menu sans avoir besoin de savoir comment ' +
          'les cuisiniers préparent les ingrédients en cuisine.</p>')
      ].join('\n')
    },
    {
      title: 'Anatomie d’une requête et d’une réponse HTTP',
      html: [
        '<p>Le protocole <strong>HTTP</strong> (<em>Hypertext Transfer Protocol</em>) est un protocole de la couche ' +
        'application fonctionnant en mode requête/réponse textuel ou binaire.</p>',
        '<p>Une <strong>requête HTTP</strong> comprend quatre composantes clés :</p>',
        '<ol>\n' +
        '  <li><strong>La ligne de requête</strong> : méthode (ex. <code>GET</code>), chemin d’accès (ex. <code>/api/v1/articles</code>) et version du protocole (ex. <code>HTTP/1.1</code>).</li>\n' +
        '  <li><strong>Les en-têtes (Headers)</strong> : métadonnées sous forme de paires clé-valeur (ex. <code>Host</code>, <code>User-Agent</code>, <code>Content-Type</code>).</li>\n' +
        '  <li><strong>Une ligne vide</strong> : séparateur obligatoire entre les métadonnées et le corps.</li>\n' +
        '  <li><strong>Le corps (Body)</strong> : données transmises lors de mutations (JSON, formulaire), absent dans la plupart des requêtes <code>GET</code>.</li>\n' +
        '</ol>',
        '<pre><code>POST /api/v1/utilisateurs HTTP/1.1\nHost: api.monsite.fr\nContent-Type: application/json\nAccept: application/json\n\n{\n  "nom": "Camille",\n  "email": "camille@domaine.fr"\n}</code></pre>',
        box('tech', 'Format de la réponse HTTP', 'code',
          '    <p>La réponse envoyée par le serveur respecte une symétrie rigoureuse :</p>\n' +
          '    <pre><code>HTTP/1.1 201 Created\nContent-Type: application/json\n\n{\n  "id": 42,\n  "nom": "Camille",\n  "email": "camille@domaine.fr"\n}</code></pre>')
      ].join('\n')
    },
    {
      title: 'En-têtes HTTP et négociation de contenu',
      html: [
        '<p>Les en-têtes HTTP permettent au client et au serveur de négocier les caractéristiques de leur échange.</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>En-tête</th><th>Émetteur</th><th>Rôle</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td><code>Content-Type</code></td><td>Client ou Serveur</td><td>Indique le format des données incluses dans le corps (ex. <code>application/json</code>).</td></tr>\n' +
        '    <tr><td><code>Accept</code></td><td>Client</td><td>Indique les formats de données acceptés en retour (ex. <code>application/json</code>).</td></tr>\n' +
        '    <tr><td><code>Authorization</code></td><td>Client</td><td>Transmet les identifiants ou jetons d’authentification (ex. <code>Bearer &lt;token&gt;</code>).</td></tr>\n' +
        '  </tbody>\n' +
        '</table>',
        box('warn', 'Piège fréquent : Oublier le Content-Type', 'shield',
          '    <p>Si vous envoyez un corps JSON lors d’une requête POST sans préciser ' +
          '<code>Content-Type: application/json</code>, la plupart des frameworks comme Flask ignoreront ' +
          'le parsing JSON automatique et <code>request.get_json()</code> renverra <code>None</code>.</p>')
      ].join('\n')
    },
    {
      title: 'Le format JSON (JavaScript Object Notation)',
      html: [
        '<p><strong>JSON</strong> s’est imposé comme le format universel d’échange de données sur le web, ' +
        'remplaçant largement XML grâce à sa légèreté et sa facilité d’intégration dans tous les langages.</p>',
        '<p>Un document JSON ne peut contenir que six types de valeurs :</p>',
        '<ul>\n' +
        '  <li><strong>Objet</strong> : collection non ordonnée de paires <code>"clé": valeur</code> délimitée par <code>{ }</code>.</li>\n' +
        '  <li><strong>Tableau</strong> : liste ordonnée de valeurs délimitée par <code>[ ]</code>.</li>\n' +
        '  <li><strong>Chaîne</strong> : texte encadré obligatoirement de guillemets doubles <code>"..."</code>.</li>\n' +
        '  <li><strong>Nombre</strong> : entier ou flottant (ex. <code>42</code>, <code>3.14</code>).</li>\n' +
        '  <li><strong>Booléen</strong> : <code>true</code> ou <code>false</code> (en minuscules strictes).</li>\n' +
        '  <li><strong>Nul</strong> : <code>null</code> (absence de valeur).</li>\n' +
        '</ul>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Une API Web repose principalement sur quel protocole de communication ?', opts: ['HTTP / HTTPS', 'FTP', 'SMTP'], correct: 0, exp: 'HTTP (et sa variante chiffrée HTTPS) est le protocole de transport fondamental des API Web.' },
    { stem: 'Quelle partie d’une requête HTTP contient les données envoyées lors d’un POST ?', opts: ['Le corps (Body)', 'La chaîne de requête (Query string)', 'La ligne de statut'], correct: 0, exp: 'Le corps de la requête transporte la charge utile (payload) envoyée au serveur.' },
    { stem: 'Quel en-tête informe le serveur que les données soumises sont au format JSON ?', opts: ['Content-Type: application/json', 'Accept: text/html', 'Host: api.local'], correct: 0, exp: 'Content-Type décrit le format des données contenues dans le corps de la requête.' },
    { stem: 'En syntaxe JSON stricte, les clés d’un objet doivent obligatoirement être…', opts: ['Entourées de guillemets doubles ""', 'Entourées de guillemets simples \'\'', 'Écrites sans aucun guillemet'], correct: 0, exp: 'La spécification RFC 8259 impose des guillemets doubles pour toutes les clés JSON.' },
    { stem: 'Quel en-tête le client transmet-il pour indiquer le format attendu en réponse ?', opts: ['Accept', 'Content-Type', 'User-Agent'], correct: 0, exp: 'Accept permet la négociation de contenu pour spécifier le format de réponse désiré.' },
    { stem: 'Que contient la toute première ligne d’une requête HTTP standard ?', opts: ['La méthode, le chemin cible et la version du protocole', 'Le code d’état et le message de statut', 'Le token d’authentification Bearer'], correct: 0, exp: 'Exemple : GET /api/v1/users HTTP/1.1.' },
    { stem: 'Lequel de ces types de données est invalide en JSON standard ?', opts: ['Une fonction JavaScript', 'Un tableau de nombres', 'Une valeur booléenne false'], correct: 0, exp: 'JSON est un format de données pur ; il ne peut pas sérialiser de code exécutable ou de fonctions.' },
    { stem: 'Dans une URL, où se situe la query string ?', opts: ['Après le point d’interrogation ?', 'Avant le nom de domaine', 'Dans les en-têtes HTTP'], correct: 0, exp: 'La query string commence immédiatement après le caractère ? dans l’URL.' }
  ],

  pitfalls: [
    'Oublier l’en-tête Content-Type: application/json lors de requêtes POST ou PUT.',
    'Utiliser des guillemets simples (\') dans un payload JSON (invalide selon la norme RFC).',
    'Transmettre des données sensibles (mots de passe, tokens) en clair dans la query string d’une URL.',
    'Confondre le rôle de Content-Type (données envoyées) et d’Accept (données souhaitées en retour).',
    'Supposer que toutes les requêtes HTTP possèdent un corps (les requêtes GET n’en ont généralement pas).'
  ],

  methodTitle: 'Analyser une requête HTTP pour une API REST',
  method: [
    '<strong>Identifier la méthode</strong> : déterminer l’action demandée (GET, POST, PUT, DELETE).',
    '<strong>Examiner l’URI</strong> : vérifier la ressource ciblée et extraire les paramètres de chemin ou de requête.',
    '<strong>Contrôler les en-têtes</strong> : vérifier Content-Type, Accept et les jetons d’autorisation.',
    '<strong>Parser le corps</strong> : désérialiser la charge utile JSON reçue en structure de données interne.',
    '<strong>Formater la réponse</strong> : produire le corps JSON attendu et fixer les en-têtes appropriés.'
  ],

  summary: [
    'Une API Web définit un contrat formel de communication client-serveur sur le réseau.',
    'HTTP structure l’échange en requêtes (méthode, chemin, en-têtes, corps) et réponses (statut, en-têtes, corps).',
    'L’en-tête Content-Type indique le format de la charge utile transmise (ex. application/json).',
    'L’en-tête Accept permet la négociation du format de réponse souhaité par le client.',
    'JSON est le standard de sérialisation léger, strict et universel des architectures REST.'
  ],

  checklist: [
    'Je comprends l’architecture client-serveur d’une API Web.',
    'Je sais décomposer les éléments constitutifs d’une requête HTTP.',
    'Je connais la différence entre Content-Type et Accept.',
    'Je sais formater un document JSON valide sans erreur de syntaxe.',
    'Je sais extraire et lire les paramètres passés dans une query string.'
  ],

  notions: ['API Web', 'Client-Serveur', 'HTTP', 'Requête HTTP', 'Réponse HTTP', 'Content-Type', 'Accept', 'JSON', 'Payload', 'Query String'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise les bases de HTTP et la syntaxe JSON stricte.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi à identifier les en-têtes et le découpage de requête.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les fondamentaux du protocole HTTP.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la modélisation des ressources REST au chapitre 2.' }
  ],

  flashcards: [
    { q: 'Que signifie l’acronyme API ?', a: 'Application Programming Interface (Interface de programmation d’application).' },
    { q: 'Quels sont les 4 composants d’une requête HTTP ?', a: 'La ligne de requête (méthode + chemin + version), les en-têtes, la ligne vide et le corps (body).' },
    { q: 'À quoi sert l’en-tête Content-Type ?', a: 'À indiquer le type MIME des données envoyées dans le corps (ex. application/json).' },
    { q: 'Quelle est la différence entre Content-Type et Accept ?', a: 'Content-Type décrit le format des données envoyées ; Accept décrit le format attendu en réponse.' },
    { q: 'Quels guillemets sont obligatoires pour les chaînes et clés en JSON ?', a: 'Les guillemets doubles strictes ("...").' },
    { q: 'Comment débute la Query String dans une URL ?', a: 'Par un point d’interrogation (?) suivi de couples clé=valeur séparés par des esperluettes (&amp;).' }
  ],

  next: {
    href: 'chapitre2.html',
    label: 'Chapitre 2 : Architecture REST & ressources'
  }
};

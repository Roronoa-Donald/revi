/**
 * Chapitre 4 du cours « API REST avec Flask » B2 — Codes d'état HTTP & réponses JSON.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 4,
  title: 'Codes d’état HTTP & réponses JSON',
  short: 'Status codes & Réponses',
  toc: 'Familles de statuts HTTP, sérialisation avec jsonify(), tuples de réponse Flask, formatage d’erreurs et pagination.',
  time: '≈ 2 h 45 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Renvoyer systématiquement un code 200 OK avec un message {"erreur": "introuvable"} est une mauvaise pratique ' +
    'courante qui induit en erreur les bibliothèques clientes (Axios, Fetch, cURL). Une API RESTful ' +
    'utilise les codes d’état HTTP natifs pour signaler sans ambiguïté le succès ou la nature de l’échec.',

  objectives: [
    'maîtriser la signification des grandes familles de codes HTTP (2xx, 3xx, 4xx, 5xx) ;',
    'choisir le code de statut précis pour chaque scénario REST (200, 201, 204, 400, 404, 409) ;',
    'sérialiser des dictionnaires et listes avec jsonify() et comprendre ses optimisations ;',
    'construire des réponses Flask enrichies sous forme de tuples (body, status, headers) ;',
    'définir un schéma JSON cohérent pour les erreurs et la pagination de collections.'
  ],

  sections: [
    {
      title: 'Les familles de codes de statut HTTP',
      html: [
        '<p>Le protocole HTTP classe ses codes de réponse à trois chiffres en cinq catégories distinctes :</p>',
        '<ul>\n' +
        '  <li><strong>1xx (Informationnel)</strong> : requête reçue, traitement en cours (ex. <code>100 Continue</code>).</li>\n' +
        '  <li><strong>2xx (Succès)</strong> : l’action a été reçue, comprise et acceptée avec succès.</li>\n' +
        '  <li><strong>3xx (Redirection)</strong> : le client doit effectuer une action supplémentaire pour compléter la requête.</li>\n' +
        '  <li><strong>4xx (Erreur du client)</strong> : la requête contient une syntaxe erronée ou ne peut pas être honorée (responsabilité du client).</li>\n' +
        '  <li><strong>5xx (Erreur du serveur)</strong> : le serveur a rencontré une anomalie interne lors du traitement (responsabilité du backend).</li>\n' +
        '</ul>',
        box('intuition', 'À qui la faute ?', 'lightbulb',
          '    <p>Une règle mémotechnique simple pour débugger : si le code commence par <strong>4</strong>, ' +
          'c’est le client qui a envoyé une requête invalide, incomplète ou non autorisée. Si le code commence ' +
          'par <strong>5</strong>, c’est le serveur qui a planté ou généré une exception non interceptée.</p>')
      ].join('\n')
    },
    {
      title: 'Les codes de statut indispensables en REST',
      html: [
        '<p>Dans une API REST professionnelle, une dizaine de codes couvrent l’immense majorité des besoins :</p>',
        '<table class="data-table">\n' +
        '  <thead>\n' +
        '    <tr><th>Code</th><th>Libellé officiel</th><th>Usage canonique en REST</th></tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr><td><code>200</code></td><td>OK</td><td>Succès d’une lecture (GET) ou d’une modification (PUT/PATCH).</td></tr>\n' +
        '    <tr><td><code>201</code></td><td>Created</td><td>Succès d’une création (POST). Doit idéalement inclure l’en-tête <code>Location</code>.</td></tr>\n' +
        '    <tr><td><code>204</code></td><td>No Content</td><td>Succès sans contenu de retour (idéal pour DELETE).</td></tr>\n' +
        '    <tr><td><code>400</code></td><td>Bad Request</td><td>Corps JSON malformé ou champ obligatoire manquant.</td></tr>\n' +
        '    <tr><td><code>401</code></td><td>Unauthorized</td><td>Authentification requise ou identifiants/jeton invalides.</td></tr>\n' +
        '    <tr><td><code>403</code></td><td>Forbidden</td><td>Le client est authentifié mais ne possède pas les droits requis.</td></tr>\n' +
        '    <tr><td><code>404</code></td><td>Not Found</td><td>La ressource ou la route ciblée n’existe pas.</td></tr>\n' +
        '    <tr><td><code>409</code></td><td>Conflict</td><td>Violation de contrainte d’unicité (ex. email déjà enregistré).</td></tr>\n' +
        '    <tr><td><code>422</code></td><td>Unprocessable Entity</td><td>JSON valide syntaxiquement mais données sémantiquement invalides.</td></tr>\n' +
        '    <tr><td><code>500</code></td><td>Internal Server Error</td><td>Exception Python non gérée ou panne de base de données.</td></tr>\n' +
        '  </tbody>\n' +
        '</table>'
      ].join('\n')
    },
    {
      title: 'Sérialisation avec jsonify et tuples de réponse Flask',
      html: [
        '<p>Dans les versions récentes de Flask, retourner un dictionnaire Python (<code>dict</code>) ou ' +
        'une liste le convertit automatiquement en réponse JSON avec le code 200 par défaut.</p>',
        '<p>Cependant, l’utilisation explicite de la fonction <code>jsonify()</code> reste recommandée :</p>',
        '<ul>\n' +
        '  <li>Elle configure immédiatement l’en-tête <code>Content-Type: application/json</code>.</li>\n' +
        '  <li>Elle gère proprement la sérialisation des listes d’objets racines.</li>\n' +
        '</ul>',
        '<pre><code>from flask import jsonify\n\n@app.route("/utilisateurs/&lt;int:id&gt;")\ndef obtenir_utilisateur(id):\n    user = trouver_utilisateur(id)\n    if not user:\n        return jsonify({"erreur": "Utilisateur non trouvé"}), 404\n    return jsonify(user), 200</code></pre>',
        box('tech', 'Le tuple de réponse Flask', 'code',
          '    <p>Une fonction vue Flask peut retourner un tuple contenant jusqu’à 3 éléments :</p>\n' +
          '    <pre><code>return reponse, code_statut, en_tetes_dict\n# Exemple :\nreturn jsonify(article), 201, {"Location": f"/articles/{article[\'id\']}"}</code></pre>')
      ].join('\n')
    },
    {
      title: 'Format d’erreur standardisé et pagination',
      html: [
        '<p>Pour faciliter la tâche des développeurs frontend, une API doit renvoyer un format d’erreur prévisible :</p>',
        '<pre><code>{\n  "code": 404,\n  "error": "Not Found",\n  "message": "La facture 82 n’existe pas dans votre compte."\n}</code></pre>',
        '<p>De même, pour les collections volumineuses, l’enveloppe de pagination fournit les repères indispensables :</p>',
        '<pre><code>{\n  "total": 150,\n  "page": 2,\n  "limit": 20,\n  "data": [\n    {"id": 21, "titre": "Article 21"},\n    {"id": 22, "titre": "Article 22"}\n  ]\n}</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel code HTTP est retourné lors de la création réussie d’une nouvelle ressource ?', opts: ['201 Created', '200 OK', '204 No Content'], correct: 0, exp: '201 Created est le statut standard pour signaler une création réussie.' },
    { stem: 'Quel code de statut indique un succès sans aucun contenu dans le corps de réponse ?', opts: ['204 No Content', '200 OK', '202 Accepted'], correct: 0, exp: '204 No Content est couramment employé après une suppression (DELETE).' },
    { stem: 'Quelle est la différence entre 401 Unauthorized et 403 Forbidden ?', opts: ['401 concerne l’authentification (qui es-tu ?), 403 concerne les permissions (as-tu le droit ?)', '401 est une erreur serveur, 403 une erreur client', 'Il n’y a aucune différence, ils sont synonymes'], correct: 0, exp: '401 = non identifié ou jeton manquant ; 403 = identifié mais accès interdit.' },
    { stem: 'Quelle fonction Flask sérialise un dictionnaire en réponse HTTP JSON ?', opts: ['jsonify()', 'json.dumps()', 'flask.encode()'], correct: 0, exp: 'jsonify() génère un objet Response complet avec le Content-Type application/json.' },
    { stem: 'Quel code signale une ressource introuvable sur le serveur ?', opts: ['404 Not Found', '400 Bad Request', '502 Bad Gateway'], correct: 0, exp: '404 Not Found indique que la ressource demandée n’existe pas.' },
    { stem: 'Quel code HTTP utilise-t-on lorsqu’un email à inscrire existe déjà en base ?', opts: ['409 Conflict', '404 Not Found', '500 Server Error'], correct: 0, exp: '409 Conflict signale une violation de contrainte d’intégrité ou d’unicité.' },
    { stem: 'Dans un tuple de retour Flask (corps, 201, headers), quel est le rôle du 2e élément ?', opts: ['Le code de statut HTTP', 'Le nombre d’octets', 'Le temps de réponse en millisecondes'], correct: 0, exp: 'Le 2e élément du tuple Flask définit le code d’état HTTP de la réponse.' },
    { stem: 'Pourquoi est-il déconseillé de renvoyer 200 OK en cas d’erreur applicative ?', opts: ['Car le client considère la requête réussie et le traitement automatique échoue', 'Car cela consomme plus de bande passante', 'Car Flask plante si on utilise 200 pour une erreur'], correct: 0, exp: 'Les outils et librairies clientes s’appuient sur les codes d’état pour déclencher leurs blocs d’erreur.' }
  ],

  pitfalls: [
    'Renvoyer un code 200 OK avec un corps contenant {"succes": false, "erreur": "..."}.',
    'Renvoyer 200 OK au lieu de 201 Created lors d’une création par POST.',
    'Renvoyer du texte brut au lieu de JSON pour les messages d’erreur (incohérence de format).',
    'Confondre les codes 401 (non authentifié) et 403 (authentifié mais non autorisé).',
    'Oublier d’inclure le code de statut dans le tuple Flask : return jsonify(err) produit un 200 par défaut.'
  ],

  methodTitle: 'Construire une réponse REST conforme dans Flask',
  method: [
    '<strong>Déterminer l’issue métier</strong> : succès complet, création, suppression ou anomalie.',
    '<strong>Sélectionner le code HTTP</strong> : 200, 201, 204, 400, 401, 403, 404, 409 ou 500.',
    '<strong>Structurer le payload</strong> : préparer le dictionnaire de données ou l’objet d’erreur standardisé.',
    '<strong>Sérialiser avec jsonify()</strong> : envelopper la charge utile pour garantir l’en-tête JSON.',
    '<strong>Former le tuple de retour</strong> : retourner return jsonify(payload), code_statut.'
  ],

  summary: [
    'Les codes HTTP informent immédiatement le client sur le succès ou l’échec d’une opération.',
    'Les codes 2xx attestent du succès (200 OK, 201 Created, 204 No Content).',
    'Les codes 4xx indiquent une anomalie imputable au client (400, 401, 403, 404, 409).',
    'Flask permet de renvoyer un tuple (payload, statut, en-têtes) pour configurer la réponse.',
    'Standardiser le format des erreurs JSON et paginer les collections garantit une API professionnelle.'
  ],

  checklist: [
    'Je connais la classification des statuts HTTP (2xx, 3xx, 4xx, 5xx).',
    'Je sais quand employer 200, 201 et 204.',
    'Je fais la distinction précise entre 401 Unauthorized et 403 Forbidden.',
    'Je maîtrise l’utilisation de jsonify() et les tuples de retour Flask.',
    'Je structure des réponses d’erreur JSON prévisibles et informatives.'
  ],

  notions: ['Codes HTTP', '200 OK', '201 Created', '204 No Content', '400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found', 'jsonify', 'Tuple de réponse'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la signification des codes 200, 201, 204 et 404.' },
    { cls: 'mid', text: '50–69 % — Entraîne-toi sur les nuances 401/403 et l’écriture des tuples Flask.' },
    { cls: 'good', text: '70–89 % — Solide : tu maîtrises les codes et le formatage des réponses.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la validation des données au chapitre 5.' }
  ],

  flashcards: [
    { q: 'Quel statut HTTP indique qu’une ressource a été créée avec succès ?', a: '201 Created.' },
    { q: 'Quel statut HTTP est idéal pour une suppression réussie sans données retournées ?', a: '204 No Content.' },
    { q: 'Quelle est la différence entre 401 et 403 ?', a: '401 signifie que l’identité du client n’est pas vérifiée (non connecté), 403 signifie qu’il est connecté mais n’a pas la permission requise.' },
    { q: 'Quel code de statut correspond à un email déjà présent en base lors d’une inscription ?', a: '409 Conflict.' },
    { q: 'Comment Flask permet-il de préciser un code de statut personnalisé ?', a: 'En renvoyant un tuple (jsonify(...), code), par exemple return jsonify(data), 201.' },
    { q: 'Quel en-tête HTTP est automatiquement positionné par jsonify() ?', a: 'Content-Type: application/json.' }
  ],

  next: {
    href: 'chapitre5.html',
    label: 'Chapitre 5 : Validation & Gestion d’erreurs'
  }
};

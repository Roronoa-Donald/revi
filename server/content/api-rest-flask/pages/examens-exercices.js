/**
 * Pages « examens blancs » et « exercices & projet » du cours « API REST avec Flask » B2.
 */
'use strict';

const { ic, crumb, box } = require('../../../../scripts/course-kit');
const { chnav, disclaimer } = require('./helpers');

/* ======================== Examens blancs ======================== */

function examens(course) {
  const sujets = [
    {
      title: 'Examen blanc n°1 : Protocoles Web, Conception REST & Routage Flask',
      intro: 'Sujet théorique et pratique : dialogue HTTP, modélisation de ressources et système de routage de Flask.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Dialogue HTTP & En-têtes',
          text: 'Décrivez les quatre composantes d’une requête HTTP. Quelle est la différence fondamentale entre l’en-tête Content-Type et l’en-tête Accept ?',
          sol: 'Une requête HTTP se compose de : (1) <strong>La ligne de requête</strong> (méthode, chemin cible, version du protocole) ; (2) <strong>Les en-têtes</strong> (métadonnées clé-valeur) ; (3) <strong>Une ligne vide séparatrice</strong> ; (4) <strong>Le corps (body)</strong> portant la charge utile. <code>Content-Type</code> indique le format des données envoyées dans le corps (ex. <code>application/json</code>), tandis que <code>Accept</code> indique le format attendu par le client en retour.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Principes REST & Nommage d’URI',
          text: 'Rappelez les contraintes du principe Stateless. Donnez trois règles strictes de conception d’URI dans une architecture RESTful.',
          sol: 'Le principe <strong>Stateless</strong> impose que chaque requête client contienne toutes les informations nécessaires à son traitement ; aucun état de session n’est conservé sur le serveur entre deux appels. Trois règles d’URI : (1) <strong>Utiliser des noms et non des verbes</strong> (<code>/articles</code> et non <code>/getArticles</code>) ; (2) <strong>Employer des pluriels pour les collections</strong> (<code>/utilisateurs/42</code>) ; (3) <strong>Respecter une hiérarchie logique</strong> pour les sous-ressources (<code>/auteurs/7/livres</code>).'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Sécurité & Idempotence',
          text: 'Définissez une méthode HTTP sûre (safe) et une méthode idempotente. Classez GET, POST, PUT et DELETE dans ces catégories.',
          sol: 'Une méthode <strong>sûre</strong> ne modifie pas l’état du serveur (lecture seule). Une méthode <strong>idempotente</strong> produit le même résultat sur le serveur qu’elle soit exécutée une ou plusieurs fois. <code>GET</code> est sûre et idempotente. <code>PUT</code> et <code>DELETE</code> sont idempotents mais non sûrs. <code>POST</code> n’est ni sûr ni idempotent.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Routage dynamique dans Flask',
          text: 'Comment déclare-t-on une route acceptant un entier positif dans l’URL avec Flask ? Que se passe-t-il si un client passe une valeur textuelle non numérique ?',
          sol: 'On utilise le convertisseur typé : <code>@app.route("/utilisateurs/&lt;int:id&gt;")</code>. Si la valeur transmise n’est pas convertible en entier (ex. <code>/utilisateurs/abc</code>), Flask rejette immédiatement la requête avec une erreur <strong><code>404 Not Found</code></strong> sans exécuter la fonction vue.'
        }
      ]
    },
    {
      title: 'Examen blanc n°2 : Statuts HTTP, Validation défensive & Architecture',
      intro: 'Sujet d’approfondissement : gestion d’erreurs unifiée, prévention des failles et modularité professionnelle.',
      items: [
        {
          num: 'Exercice 1',
          badge: '/5 : Codes d’état HTTP REST',
          text: 'Associez chaque situation au code d’état HTTP recommandé : (a) Création réussie d’un compte ; (b) Suppression d’un article sans contenu retourné ; (c) Corps JSON sans champ obligatoire ; (d) Jeton JWT absent ou expiré.',
          sol: '(a) Création réussie : <strong><code>201 Created</code></strong> (avec en-tête Location). (b) Suppression sans contenu : <strong><code>204 No Content</code></strong>. (c) Données requises manquantes : <strong><code>400 Bad Request</code></strong>. (d) Jeton d’authentification absent : <strong><code>401 Unauthorized</code></strong>.'
        },
        {
          num: 'Exercice 2',
          badge: '/5 : Validation & Mass Assignment',
          text: 'Qu’est-ce que la vulnérabilité de Mass Assignment ? Comment l’empêcher concrètement lors de la réception d’un dictionnaire JSON dans Flask ?',
          sol: 'Le Mass Assignment survient lorsqu’un client injecte des attributs privilégiés (ex. <code>is_admin: true</code>) qui sont enregistrés en base sans contrôle. On s’en protège par une <strong>liste blanche (whitelisting)</strong> : <code>champs_permis = {"nom", "email"}</code> et on filtre le payload : <code>data = {k: v for k, v in request.get_json().items() if k in champs_permis}</code>.'
        },
        {
          num: 'Exercice 3',
          badge: '/5 : Gestion globale d’erreurs',
          text: 'À quoi sert le décorateur @app.errorhandler() ? Donnez un exemple d’implémentation pour garantir que les erreurs 404 renvoient du JSON.',
          sol: '<code>@app.errorhandler(404)</code> intercepte toutes les erreurs 404 de l’application pour unifier leur formatage :<br><code>@app.errorhandler(404)\ndef introuvable(err):\n    return jsonify({"code": 404, "error": "Not Found", "message": getattr(err, "description", "Introuvable")}), 404</code>.'
        },
        {
          num: 'Exercice 4',
          badge: '/5 : Blueprints & Mise en production',
          text: 'Quel est l’intérêt des Blueprints dans Flask ? Pourquoi ne doit-on jamais exécuter app.run(debug=True) sur un serveur public de production ?',
          sol: 'Les <strong>Blueprints</strong> découpent l’application en modules fonctionnels indépendants avec factorisation du préfixe d’URL (<code>url_prefix</code>). <code>app.run(debug=True)</code> est strictement interdit en production car le débogueur interactif de Werkzeug permet l’<strong>exécution arbitraire de code</strong> Python à distance ; on utilise un serveur WSGI dédié tel que <strong>Gunicorn</strong>.'
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
    'de Licence 2. Entraînez-vous en conditions réelles, puis consulte les corrigés détaillés.</p>',
    box('method', 'Conseils pour l’épreuve', 'compass', [
      '    <ul>',
      '      <li><strong>Temps indicatif</strong> : 1 heure 30 par sujet sans document.</li>',
      '      <li><strong>Précision du vocabulaire</strong> : employez les termes exacts (stateless, idempotence, convertisseur, code de statut, whitelisting).</li>',
      '      <li><strong>Conventions REST</strong> : veillez à bannir les verbes dans les URI et à bien typer les retours de statut.</li>',
      '    </ul>'
    ].join('\n')),
    htmlSujets,
    chnav({ href: '../sommaire.html', label: 'Sommaire' }, { href: '../atelier.html', label: 'Atelier de code' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'chapitres/simulateur-examen.html': {
      title: 'Examens blancs — ' + course.brand,
      description: 'Sujets d’examen blanc corrigés pour le cours d’API REST avec Flask B2 : HTTP, REST, routes, codes de statut, validation et architecture.',
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
    '  <p class="lead">18 ateliers de programmation répartis sur les six chapitres du cours, complétés ' +
    'par le développement guidé d’une API complète : la <strong>BookStore API (Gestion de bibliothèque)</strong>.</p>',

    box('objectifs', 'Le catalogue des 18 exercices Python', 'target', [
      '    <ul>',
      '      <li><strong>Chapitre 1</strong> : Découpage de requête HTTP, extraction de Query String ordonnée, validation des en-têtes JSON.</li>',
      '      <li><strong>Chapitre 2</strong> : Normalisation de chemins REST, association action/verbe canonique, détection collection vs ressource.</li>',
      '      <li><strong>Chapitre 3</strong> : Convertisseurs de route typés, simulateur de dispatch avec extraction, filtrage de méthodes HTTP 405.</li>',
      '      <li><strong>Chapitre 4</strong> : Attribution de codes d’état REST, format d’erreur JSON standardisé, enveloppe de collection paginée.</li>',
      '      <li><strong>Chapitre 5</strong> : Validation de champs requis 400, contrôle de conformité des types, filtrage whitelisting mass-assignment.</li>',
      '      <li><strong>Chapitre 6</strong> : Filtrage de collection en mémoire, création avec ID incrémenté 201, mutations UPDATE et DELETE.</li>',
      '    </ul>',
      '    <p><a class="btn" href="../atelier.html">' + ic('terminal') + ' Ouvrir l’atelier libre</a></p>'
    ].join('\n')),

    '  <h2>Projet fil conducteur : La BookStore API REST complète</h2>',
    '  <p class="lead">Ce projet intègre l’ensemble des notions du cours dans une API de production ' +
    'organisée en Blueprints modulaires.</p>',

    box('it', 'Étape 1 : Conception des ressources &amp; Endpoints', 'code', [
      '    <p>Définir le contrat d’API pour la ressource <code>/livres</code> :</p>',
      '    <ul>',
      '      <li><code>GET /api/v1/livres</code> : lister tous les livres avec filtres (?genre=roman&amp;dispo=true).</li>',
      '      <li><code>GET /api/v1/livres/&lt;int:id&gt;</code> : détail d’un livre spécifique (404 si absent).</li>',
      '      <li><code>POST /api/v1/livres</code> : ajout d’un nouvel ouvrage avec validation du corps (201 Created).</li>',
      '      <li><code>PATCH /api/v1/livres/&lt;int:id&gt;</code> : modification partielle (prix, disponibilité).</li>',
      '      <li><code>DELETE /api/v1/livres/&lt;int:id&gt;</code> : suppression définitive (204 No Content).</li>',
      '    </ul>'
    ].join('\n')),

    box('it', 'Étape 2 : Architecture modulaire avec Blueprint', 'wrench', [
      '    <p>Créer un module dédié pour isoler les routes de la bibliothèque :</p>',
      '    <pre><code># routes/livres.py\nfrom flask import Blueprint, jsonify, request, abort\n\nlivres_bp = Blueprint("livres", __name__, url_prefix="/api/v1/livres")\n\n@livres_bp.route("/", methods=["GET"])\ndef lister_livres():\n    return jsonify([])</code></pre>'
    ].join('\n')),

    box('it', 'Étape 3 : Validation défensive &amp; Whitelisting', 'play', [
      '    <p>Filtrer les attributs et vérifier les types avant toute insertion :</p>',
      '    <pre><code>CHAMPS_VALIDES = {"titre": str, "auteur": str, "prix": (int, float), "disponible": bool}\n\ndef valider_payload(data):\n    for champ, t in CHAMPS_VALIDES.items():\n        if champ not in data or not isinstance(data[champ], t):\n            abort(400, description=f"Champ {champ} invalide ou manquant")</code></pre>'
    ].join('\n')),

    box('it', 'Étape 4 : Gestion globale des exceptions JSON', 'bookmark', [
      '    <p>Enregistrer les intercepteurs pour garantir des réponses d’erreur 100% JSON :</p>',
      '    <pre><code>@app.errorhandler(400)\n@app.errorhandler(404)\ndef gerer_erreur_client(err):\n    return jsonify({\n        "code": err.code,\n        "error": err.name,\n        "message": getattr(err, "description", "")\n    }), err.code</code></pre>'
    ].join('\n')),

    box('it', 'Étape 5 : Déploiement avec Gunicorn', 'compass', [
      '    <p>Lancer le serveur en production avec 4 workers WSGI :</p>',
      '    <pre><code>gunicorn -w 4 -b 127.0.0.1:5000 wsgi:app</code></pre>'
    ].join('\n')),

    chnav({ href: '../chapitres/formules.html', label: 'Mémo syntaxe' }, { href: '../chapitres/simulateur-examen.html', label: 'Examens blancs' }),
    disclaimer(course)
  ].join('\n\n');

  return {
    'exercices/exercices.html': {
      title: 'Exercices & projet — ' + course.brand,
      description: 'Catalogue des 18 exercices et cahier des charges du projet BookStore API pour le cours d’API REST avec Flask B2.',
      active: 'exercices',
      body
    }
  };
}

module.exports = { examens, exercices };

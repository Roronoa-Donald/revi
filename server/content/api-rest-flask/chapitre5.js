/**
 * Chapitre 5 du cours « API REST avec Flask » B2 — Validation des données, gestion d’erreurs & outillage de test.
 */
'use strict';

const { box } = require('../../../scripts/course-kit');

module.exports = {
  n: 5,
  title: 'Validation des données & gestion d’erreurs',
  short: 'Validation & Erreurs',
  toc: 'Contrôle des entrées JSON, validation de types, gestionnaire global @app.errorhandler, abort() et tests avec test_client et cURL.',
  time: '≈ 3 h 00 de travail',
  free: false,
  lockLabel: 'Réservé B2 et plus',

  situation:
    'Faire aveuglément confiance aux données transmises par le client expose l’API aux injections, aux corruptions ' +
    'de base et aux plantages inattendus. Une API professionnelle valide chaque entrée, intercepte les anomalies ' +
    'via des gestionnaires globaux et dispose d’une suite de tests automatisés.',

  objectives: [
    'valider rigoureusement la présence et le type des données reçues dans le body JSON ;',
    'interrompre proprement une requête avec la fonction abort() de Flask ;',
    'centraliser la gestion des erreurs HTTP avec le décorateur @app.errorhandler ;',
    'protéger l’API contre le Mass Assignment via une liste blanche d’attributs ;',
    'tester et valider les endpoints avec cURL et le client de test natif de Flask (test_client).'
  ],

  sections: [
    {
      title: 'Validation défensive des données entrantes',
      html: [
        '<p>Tout corps JSON reçu via <code>request.get_json()</code> doit être rigoureusement audité avant traitement. ' +
        'Trois vérifications successives s’imposent :</p>',
        '<ol>\n' +
        '  <li><strong>Présence du payload</strong> : vérifier que le corps n’est pas <code>None</code> ou vide.</li>\n' +
        '  <li><strong>Champs obligatoires</strong> : s’assurer que les attributs clés (ex. titre, prix) figurent dans le dictionnaire.</li>\n' +
        '  <li><strong>Conformité des types et plages</strong> : s’assurer qu’un prix est un nombre positif, qu’une chaîne n’est pas vide.</li>\n' +
        '</ol>',
        '<pre><code>data = request.get_json()\nif not data:\n    return jsonify({"erreur": "Corps JSON manquant"}), 400\n\nchamps_requis = ["titre", "prix"]\nmanquants = [c for c in champs_requis if c not in data]\nif manquants:\n    return jsonify({"erreur": f"Champs obligatoires manquants: {\', \'.join(manquants)}"}), 400</code></pre>',
        box('warn', 'Danger : Le Mass Assignment', 'shield',
          '    <p>Ne jamais insérer directement <code>request.get_json()</code> dans votre base de données sans filtrage. ' +
          'Un attaquant pourrait injecter <code>{"is_admin": true, "solde": 999999}</code>. Définissez toujours une ' +
          'liste blanche (<em>whitelisting</em>) des attributs modifiables par l’utilisateur.</p>')
      ].join('\n')
    },
    {
      title: 'Interruption contrôlée avec abort() et erreurs personnalisées',
      html: [
        '<p>Flask fournit la fonction utilitaire <code>abort(code, description=...)</code> pour interrompre ' +
        'immédiatement le flux d’exécution et déclencher une réponse d’erreur HTTP standardisée :</p>',
        '<pre><code>from flask import abort\n\n@app.route("/articles/&lt;int:id&gt;")\ndef detail_article(id):\n    article = trouver_article(id)\n    if article is None:\n        abort(404, description=f"Aucun article trouvé avec l\'ID {id}")\n    return jsonify(article)</code></pre>',
        '<p>Par défaut, <code>abort()</code> renvoie une page d’erreur HTML générique. Dans une API REST, ' +
        'il est indispensable de capturer ces exceptions pour renvoyer exclusivement du JSON.</p>'
      ].join('\n')
    },
    {
      title: 'Centralisation avec @app.errorhandler',
      html: [
        '<p>Le décorateur <code>@app.errorhandler(code_ou_exception)</code> intercepte les erreurs pour ' +
        'l’ensemble de l’application et unifie le format de réponse JSON :</p>',
        '<pre><code>@app.errorhandler(404)\ndef introuvable(erreur):\n    return jsonify({\n        "code": 404,\n        "error": "Not Found",\n        "message": getattr(erreur, "description", "Ressource introuvable")\n    }), 404\n\n@app.errorhandler(500)\ndef erreur_serveur(erreur):\n    return jsonify({\n        "code": 500,\n        "error": "Internal Server Error",\n        "message": "Une anomalie imprévue est survenue côté serveur."\n    }), 500</code></pre>',
        box('tech', 'Bénéfice de la centralisation', 'code',
          '    <p>Cette approche évite la duplication de code d’erreur dans chaque route : toute levée de 404 ' +
          'ou 400 dans l’application passera automatiquement par cette fonction uniforme.</p>')
      ].join('\n')
    },
    {
      title: 'Tester son API : cURL et test_client natif',
      html: [
        '<p>Pour valider le bon fonctionnement des endpoints, deux approches complémentaires existent :</p>',
        '<p><strong>1. L’outil en ligne de commande cURL :</strong></p>',
        '<pre><code># Requête GET\ncurl -i http://localhost:5000/api/v1/articles\n\n# Requête POST avec en-têtes et JSON\ncurl -i -X POST http://localhost:5000/api/v1/articles \\\n     -H "Content-Type: application/json" \\\n     -d \'{"titre": "Guide Flask", "prix": 29.9}\'</code></pre>',
        '<p><strong>2. Le client de test automatisé Flask :</strong></p>',
        '<pre><code>def test_creation_article():\n    client = app.test_client()\n    reponse = client.post("/api/v1/articles", json={"titre": "Test", "prix": 10})\n    assert reponse.status_code == 201\n    assert reponse.get_json()["titre"] == "Test"</code></pre>'
      ].join('\n')
    },
    {
      title: 'Implémentation complète : Whitelisting, validation 400/422, @app.errorhandler et suite test_client()',
      html: [
        '<p>Assemblons la validation stricte des entrées, la protection contre le <em>Mass Assignment</em> et les gestionnaires ' +
        'globaux <code>@app.errorhandler</code> avec une suite complète de tests <code>app.test_client()</code> :</p>',
        '<pre><code class="language-python">from flask import Flask, request, jsonify, abort\n' +
        'from werkzeug.exceptions import HTTPException\n\n' +
        'app = Flask(__name__)\n' +
        'CHAMPS_AUTORISES = {"nom", "email", "age"}\n' +
        'COMPTES = {}\n\n' +
        '@app.errorhandler(HTTPException)\n' +
        'def gerer_exception_http(err):\n' +
        '    return jsonify({"code": err.code, "error": err.name, "message": err.description}), err.code\n\n' +
        '@app.route("/api/v1/comptes", methods=["POST"])\n' +
        'def inscrire_compte():\n' +
        '    brut = request.get_json(silent=True)\n' +
        '    if not isinstance(brut, dict):\n' +
        '        abort(400, description="Le corps de la requête doit être un objet JSON valide.")\n' +
        '    # Filtrage Whitelisting anti-Mass Assignment (ignore is_admin, role, etc.)\n' +
        '    propre = {k: brut[k] for k in CHAMPS_AUTORISES if k in brut}\n' +
        '    if "nom" not in propre or "email" not in propre:\n' +
        '        abort(422, description="Les attributs nom et email sont obligatoires.")\n' +
        '    if not isinstance(propre.get("age", 18), int) or propre.get("age", 18) < 0:\n' +
        '        abort(422, description="L’âge doit être un entier positif.")\n' +
        '    cid = len(COMPTES) + 1\n' +
        '    COMPTES[cid] = {"id": cid, **propre, "is_admin": False}\n' +
        '    return jsonify(COMPTES[cid]), 201\n\n' +
        'def executer_tests_validation():\n' +
        '    client = app.test_client()\n' +
        '    # Tentative de Mass Assignment avec is_admin=True\n' +
        '    r1 = client.post("/api/v1/comptes", json={"nom": "Ines", "email": "ines@ecole.fr", "is_admin": True})\n' +
        '    assert r1.status_code == 201 and r1.get_json()["is_admin"] is False\n' +
        '    # Payload incomplet -> 422 Unprocessable Entity\n' +
        '    r2 = client.post("/api/v1/comptes", json={"nom": "Ines"})\n' +
        '    assert r2.status_code == 422</code></pre>'
      ].join('\n')
    }
  ],

  questions: [
    { stem: 'Quel code de statut doit être renvoyé si un champ obligatoire est absent du corps ?', opts: ['404 Not Found', '400 Bad Request', '500 Server Error'], correct: 1, exp: '400 Bad Request signale que la charge utile soumise par le client est incomplète ou malformée.' },
    { stem: 'À quoi sert la fonction abort() dans Flask ?', opts: ["À interrompre immédiatement la requête et déclencher un code d’erreur HTTP","À arrêter complètement le serveur de développement Flask","À réinitialiser la base de données entre deux requêtes"], correct: 0, exp: "abort() lève une HTTPException qui interrompt la vue courante ; le serveur tourne toujours et la base reste intacte." },
    { stem: 'Quel décorateur intercepte globalement une erreur pour formater sa réponse ?', opts: ['@app.interceptor()', '@app.catch()', '@app.errorhandler()'], correct: 2, exp: '@app.errorhandler(code) enregistre un gestionnaire d’erreur global pour le code spécifié.' },
    { stem: 'Qu’est-ce que la vulnérabilité de Mass Assignment ?', opts: ['Le blocage du serveur par trop de requêtes simultanées', 'L’injection d’attributs sensibles non autorisés dans le payload par le client', 'Le vol du mot de passe administrateur par force brute'], correct: 1, exp: 'Le Mass Assignment survient lorsqu’une application persiste sans filtre les données d’un objet JSON.' },
    { stem: 'Quelle option de cURL permet d’afficher les en-têtes HTTP de la réponse ?', opts: ['-v uniquement', '-i (ou --include)', '-s'], correct: 1, exp: 'L’option -i affiche la ligne de statut et les en-têtes de réponse avant le corps.' },
    { stem: 'Comment instancie-t-on un client de test unitaire dans Flask ?', opts: ['app.test_client()', 'Flask.create_tester()', 'app.mock_client()'], correct: 0, exp: 'app.test_client() permet de simuler des requêtes HTTP sans démarrer de serveur réel.' },
    { stem: 'Comment passer un payload JSON avec le test_client de Flask ?', opts: ['client.send_raw(...)', 'client.post("/route", data_json=...)', 'client.post("/route", json={...})'], correct: 2, exp: 'Le paramètre json={...} sérialise automatiquement l’objet et positionne le Content-Type.' },
    { stem: 'Que contient l’attribut description d’une exception levée par abort(404, description="...") ?', opts: ['L’adresse IP du client', 'La pile d’appels Python complète', 'Le message personnalisé d’explication'], correct: 2, exp: 'description transporte le message explicatif passé lors de l’appel à abort().' }
  ],

  pitfalls: [
    'Négliger la validation des types (ex. accepter une chaîne de caractères à la place d’un prix numérique).',
    'Conserver les pages d’erreur HTML par défaut au lieu de renvoyer du JSON uniforme.',
    'Ne pas filtrer les clés du JSON reçu (vulnérabilité au Mass Assignment).',
    'Faire des tests uniquement avec le navigateur (qui n’envoie que des requêtes GET facilement).',
    'Oublier le drapeau -H "Content-Type: application/json" lors de tests avec cURL.'
  ],

  methodTitle: 'Sécuriser et valider un point d’entrée POST/PUT',
  method: [
    '<strong>Récupérer le payload</strong> : extraire les données avec data = request.get_json().',
    '<strong>Contrôler la non-vacuité</strong> : vérifier que data est un dictionnaire non nul.',
    '<strong>Valider les champs requis</strong> : vérifier la présence de chaque attribut obligatoire.',
    '<strong>Valider les types</strong> : s’assurer que chaque valeur respecte son type attendu (int, str, bool).',
    '<strong>Filtrer les champs (whitelisting)</strong> : ne retenir que les clés explicitement autorisées.'
  ],

  summary: [
    'La validation rigoureuse des entrées est le premier rempart de sécurité d’une API REST.',
    'La fonction abort() permet d’interrompre proprement le flux d’une requête invalide.',
    '@app.errorhandler() centralise la réponse d’erreur JSON pour toute l’application.',
    'Le Mass Assignment se neutralise par une liste blanche stricte des attributs autorisés.',
    'test_client et cURL permettent d’automatiser et de valider les contrats d’API.'
  ],

  checklist: [
    'Je sais vérifier la présence d’un corps JSON et des champs obligatoires.',
    'Je maîtrise l’utilisation de la fonction abort() pour les erreurs 400 et 404.',
    'Je sais unifier les réponses d’erreur en JSON avec @app.errorhandler.',
    'Je sais me prémunir du Mass Assignment par filtrage de propriétés.',
    'Je sais tester un point d’entrée avec cURL et app.test_client().'
  ],

  notions: ['Validation', 'abort()', '@app.errorhandler', 'Mass Assignment', 'Whitelisting', 'cURL', 'app.test_client', '400 Bad Request', '422 Unprocessable', 'Test unitaire'],

  mastery: [
    { cls: 'low', text: '&lt; 50 % — Révise la validation des champs obligatoires et l’usage de abort().' },
    { cls: 'mid', text: '50–69 % — Entraînez-vous sur le décorateur @app.errorhandler et les filtres whitelisting.' },
    { cls: 'good', text: '70–94 % — Solide : vous maîtrisez la sécurisation et les tests d’API.' },
    { cls: 'top', text: '≥ 95 % — Parfait : passe à la construction d’une API complète au chapitre 6.' }
  ],

  flashcards: [
    { q: 'Quelle fonction Flask interrompt immédiatement une requête avec un code HTTP ?', a: 'abort(code, description="...")' },
    { q: 'Comment intercepter les erreurs 404 dans toute l’application Flask ?', a: '@app.errorhandler(404) placé au-dessus d’une fonction renvoyant du JSON.' },
    { q: 'Qu’est-ce que le principe de Whitelisting pour un payload JSON ?', a: 'Ne conserver que les champs explicitement autorisés et ignorer toute clé inconnue ou sensible.' },
    { q: 'Quelle commande cURL envoie une requête POST avec un corps JSON ?', a: 'curl -X POST -H "Content-Type: application/json" -d \'{"clé":"valeur"}\' &lt;URL&gt;' },
    { q: 'Comment simuler une requête dans un test unitaire Flask sans lancer le serveur ?', a: 'client = app.test_client() puis reponse = client.get("/...")' },
    { q: 'Quel code de statut est adapté lorsqu’un corps JSON est vide ou malformé ?', a: '400 Bad Request.' }
  ],

  next: {
    href: 'chapitre6.html',
    label: 'Chapitre 6 : Mini API complète & persistance'
  }
};

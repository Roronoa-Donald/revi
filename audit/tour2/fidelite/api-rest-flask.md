# Fidélité aux Sources (Mission A) — `api-rest-flask` (API REST avec Flask · B2)

- **Cours** : `api-rest-flask` (API REST avec Flask) — Niveau **B2** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — API Web & le protocole HTTP** (1. L’architecture client-serveur et les API Web, 2. Anatomie d’une requête et d’une réponse HTTP, 3. En-têtes HTTP et négociation de contenu, 4. Le format JSON (JavaScript Object Notation))
  - `chapitres/chapitre2.html` : **Chapitre 2 — Architecture REST & modélisation des ressources** (1. Les fondements de l’architecture REST, 2. Conception d’URI canoniques pour les ressources, 3. Verbes HTTP et matrice CRUD, 4. Sécurité et Idempotence des opérations)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Démarrage avec Flask & Routage** (1. Introduction à Flask et installation, 2. Le système de routage et les convertisseurs de variables, 3. Filtrer les méthodes HTTP avec le paramètre methods, 4. Inspecter les données avec l’objet request)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Codes d’état HTTP & réponses JSON** (1. Les familles de codes de statut HTTP, 2. Les codes de statut indispensables en REST, 3. Sérialisation avec jsonify et tuples de réponse Flask, 4. Format d’erreur standardisé et pagination)
  - `chapitres/chapitre5.html` : **Chapitre 5 — Validation des données & gestion d’erreurs** (1. Validation défensive des données entrantes, 2. Interruption contrôlée avec abort() et erreurs personnalisées, 3. Centralisation avec @app.errorhandler, 4. Tester son API : cURL et test_client natif)
  - `chapitres/chapitre6.html` : **Chapitre 6 — Mini API complète & persistance** (1. Synthèse d’un CRUD RESTful complet, 2. Modulariser avec les Blueprints Flask, 3. Persistance avec SQLAlchemy, 4. Documentation OpenAPI et Déploiement en production)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `python`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.

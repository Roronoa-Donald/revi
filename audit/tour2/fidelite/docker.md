# Fidélité aux Sources (Mission A) — `docker` (Docker · B2)

- **Cours** : `docker` (Docker) — Niveau **B2** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Fondements des Conteneurs, Isolation Linux & Architecture Docker** (1. De la Machine Virtuelle au Conteneur Léger, 2. Les Primitives du Noyau Linux : Namespaces & Cgroups, 3. Architecture Interne du Moteur Docker et Standards OCI, 4. Premières Manipulations et Commandes de Base)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Images, Layers & Registres Docker** (1. Anatomie d’une Image et Empilement de Couches (Layers), 2. Le Pilote de Stockage Overlay2 et la Mécanique Copy-On-Write (CoW), 3. Registres d’Images, Tags Flottants vs Digests SHA256, 4. Commandes de Gestion et Distribution d’Images)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Dockerfile, Directives & Optimisation Multi-Stage** (1. Directives Clés du Dockerfile et Bonnes Pratiques, 2. Optimisation du Build Cache et Fichier .dockerignore, 3. CMD vs ENTRYPOINT : Forme Exec (JSON) vs Forme Shell, 4. Le Pattern Révolutionnaire du Multi-Stage Build)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Cycle de Vie des Conteneurs, Réseau & Stockage** (1. Machine à États Finis et Commandes du Cycle de Vie, 2. Réseaux Docker, Port Mapping et DNS Intégré, 3. Persistance des Données : Volumes Nommés vs Bind Mounts vs Tmpfs, 4. Commandes d’Exécution et Diagnostic en Production)
  - `chapitres/chapitre5.html` : **Chapitre 5 — Orchestration avec Docker Compose** (1. Du Script Impératif à la Déclaration d’Infrastructure as Code, 2. Structure Complète du Fichier docker-compose.yml, 3. Dépendances depends_on vs Sondes de Santé (Healthchecks), 4. Gestion des Variables d’Environnement et Fichiers .env)
  - `chapitres/chapitre6.html` : **Chapitre 6 — Sécurité, Production & Optimisation** (1. Le Principe du Moindre Privilège : Bannir l’Utilisateur Root, 2. Linux Capabilities et Dangers Mortels de --privileged, 3. Quotas de Ressources Cgroups : Prévenir le Déni de Service (DoS), 4. Scans de Vulnérabilités et Rotation des Logs en Production)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.

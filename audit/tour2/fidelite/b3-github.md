# Fidélité aux Sources (Mission A) — `b3-github` (Git & GitHub · B3)

- **Cours** : `b3-github` (Git & GitHub) — Niveau **B3** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Modèle Objet Git & Arborescence Interne** (1. Anatomie Interne du Dossier .git & Système Adressable par Contenu, 2. Les Quatre Types Fondamentaux d’Objets Git, 3. Cryptographie du Graphe : Hachage SHA, Immuabilité & Arbre de Merkle, 4. Commandes de Plomberie vs Porcelaine : Contrôle de Bas Niveau)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Stratégies de Fusion Avancées & Rebase Interactif** (1. Topologie des Fusions : Fast-Forward vs 3-Way Merge & Lowest Common Ancestor, 2. Les Moteurs de Fusion Git : De « recursive » à « ORT », 3. Le Rebase Interactif : Nettoyage d’Historique & la Règle d’Or, 4. Résolution Formelle des Conflits de Fusion Tridirectionnelle)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Diagnostic, Reflog & Sauvetage de Données** (1. Le Journal de Références : git reflog & le Filet de Sécurité Ultime, 2. Objets Orphelins (Dangling) & Nettoyage Garbaged avec git fsck, 3. Isolation Dichotomique de Régressions : La Puissance de git bisect, 4. Gestion Avancée de la Pile de Remisage : L’Anatomie de git stash)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Workflows d’Équipe, Gouvernance & Protection de Branches** (1. Modèles de Collaboration en Équipe : Du Git Flow au Trunk-Based Development, 2. Gouvernance de Dépôt & Règles de Protection de Branche (Branch Protection), 3. Signature Cryptographique : GPG & Clés SSH Signées, 4. Spécification Formelle Conventional Commits 1.0.0 & SemVer)
  - `chapitres/chapitre5.html` : **Chapitre 5 — Automatisation & CI/CD avec GitHub Actions** (1. Anatomie d’un Pipeline CI/CD : Workflows, Événements, Jobs & Runners, 2. Stratégie Matricielle (strategy.matrix) : Parallélisation Multi-Axes, 3. Sécurité des Workflows : Faille Critique d’Injection de Commande Shell, 4. Secrets de Dépôt, Principe du Moindre Privilège & GITHUB_TOKEN)
  - `chapitres/chapitre6.html` : **Chapitre 6 — Administration Avancée, LFS, Hooks & Purge d’Historique** (1. Gestion des Fichiers Volumineux : Architecture de Git LFS, 2. Automatisation Locale & Serveur : Les Hooks Git, 3. Purge Radicale de Secrets & Réécriture du DAG avec git-filter-repo, 4. Procédure Post-Purge en Production & Révocation d’Urgence)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.

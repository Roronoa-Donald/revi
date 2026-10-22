# Fidélité aux Sources (Mission A) — `csharp` (C# · B2)

- **Cours** : `csharp` (C#) — Niveau **B2** (6 chapitres)
- **Statut des sources PDF** : **Aucun PDF source dans `corpus-cours-revi.zip`**
- **Niveau de confiance (Mission A)** : **Nul (Aucun PDF source dans corpus-cours-revi.zip — Mission A impossible)**
- **Note importante (Épreuve officielle B2 dans `epreuves`)** : Bien qu'aucun PDF de cours C# ne figure dans l'archive, l'épreuve officielle d'examen B2 (`textes/Examens_et_Annales/Recueil_Epreuves_2024_2025.txt#PAGE 13-14` et `scans_originaux/Examens_et_Annales__Epreuves_Groupées.pdf` p. 11, 13–15) exige **3 heures d'écriture de classes C# (POO, Héritage, polymorphisme)**, alors que les 18 exercices du cours `csharp` (`csharp/chapitres/chapitre1.html:L160` à `chapitre6.html`) ont été convertis en grilles statiques `data-language="analyse"` (`D9`, gravité **S0**).

## 1. Mission A — Fidélité aux sources
Conformément à la section 2 du prompt, ce cours ne disposant d'aucun support PDF dans l'archive `corpus-cours-revi.zip`, **la comparaison aux sources (Mission A) est impossible**. Seule la cohérence interne des 6 chapitres du site est vérifiée ci-dessous.

## 2. Vérification de la cohérence interne sur le site
- **Progression des 6 chapitres** :
  - `chapitres/chapitre1.html` : **Chapitre 1 — Fondamentaux C# et Écosystème .NET** (1. L’Écosystème .NET & Le Common Language Runtime (CLR), 2. Système de Types : Pile (Stack) vs Tas (Heap), 3. Passage d’Arguments de Méthode : val, ref, out & in, 4. Pattern Matching & Switch Expressions Modernes)
  - `chapitres/chapitre2.html` : **Chapitre 2 — Encapsulation & Programmation Orientée Objet Moderne en C#** (1. Encapsulation & Propriétés C# Auto-implémentées, 2. Constructeurs, Chaînage : this() & Constructeurs Primaires, 3. Records C# & Mutabilité Non Destructive (with), 4. Études de cas & applications pratiques)
  - `chapitres/chapitre3.html` : **Chapitre 3 — Héritage, Polymorphisme & Interfaces** (1. Polymorphisme Dynamique (virtual / override) vs Masquage (new), 2. Classes Abstraites & Patron Template Method, 3. Interfaces Multiples & Implémentation Explicite, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre4.html` : **Chapitre 4 — Collections Génériques & Gestion Avancée des Exceptions** (1. Collections Génériques : List<T>, Dictionary<TKey, TValue> & HashSet<T>, 2. Gestion Robuste des Exceptions & Filtres catch ... when, 3. Contraintes de Généricité : La Clause where T, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre5.html` : **Chapitre 5 — LINQ, Délégués & Système Événementiel** (1. Délégués Prédéfinis & Expressions Lambdas, 2. LINQ Fluent API & Le Principe d’Exécution Différée, 3. Système Événementiel C# : Le Mot-clé event & Délégués Multicast, 4. Études de cas & applications pratiques)
  - `chapitres/chapitre6.html` : **Chapitre 6 — Programmation Asynchrone (TAP) & Gestion des Ressources** (1. Le Modèle Asynchrone TAP & La Machine à États Roslyn, 2. Concurrence avec Task.WhenAll & Gestion des AggregateException, 3. Libération Déterministe des Ressources : IDisposable & using, 4. Études de cas & applications pratiques)
- **Principaux constats de cohérence interne** :
  - Langage des ateliers : `analyse`
  - En-tête de prérequis explicites : absent (`C3`).
  - Cohérence Objectifs / Exercices / QCM : voir `audit/tour2/02-verification-rapport.md` (points B1 à B10) et le plan de corrections par lots `audit/tour2/04-plan-corrections.md`.

# LIVRABLE F — AUDIT DE LA STRUCTURE ET DE LA RÉPARTITION DES CHAPITRES

## 1. Principes d'architecture de la plateforme

La quasi-totalité des cours suit une structure standardisée appelée « kit » :
- 6 chapitres interactifs (sauf `b1-algo` en 10 chapitres, `b1-c-cpp` et `b1-php` en 8 chapitres).
- Chaque chapitre comporte :
  - 1 mise en situation
  - 1 encadré d'objectifs
  - 3 à 5 sections avec boîtes didactiques (Intuition, Technique, Méthode, Piège, Mnémotechnique)
  - 3 exercices de code lab (18 exercices par cours au total)
  - 1 QCM de 8 questions avec seuil de maîtrise (95 %) et corrigés explicatifs
- Des pages transversales d'auto-évaluation : `cartes.html` (flashcards), `formules.html` (mémo de révision), `simulateur-examen.html` (examens chronométrés), `atelier.html` (éditeur Monaco).

## 2. Recommandations par cours

| Cours | Structure actuelle | Recommandation | Justification pédagogique |
|---|---|:---:|---|
| `b1-vb-excel` | 0 chapitre (index seul) | **Créer 6 chapitres** | Rétablir la complétude du cours à partir du support existant (`support1.pdf`). |
| `b1-bureautique` | 6 chapitres | **Diviser en 8 chapitres** | 2 chapitres Word, 4 chapitres Excel (fonctions, TCD) et 2 chapitres PowerPoint pour éviter la surcharge cognitive. |
| `b1-algo` | 10 chapitres | **Conserver** | Découpage optimal pour un apprentissage progressif de l'algorithmique. |
| `b1-c-cpp` | 8 chapitres | **Conserver** | Bonne séparation entre les 6 chapitres C et l'introduction C++. |
| `b1-php` | 8 chapitres | **Conserver** | Progression saine de la syntaxe procédurale aux bases de données PDO. |
| `Cyber securite B2` | 6 chapitres | **Diviser en 8 chapitres** | Séparer le droit de la cybersécurité des volets techniques (firewall, chiffrement, attaques web). |
| `b3-devops` | 6 chapitres | **Diviser en 8 chapitres** | Périmètre trop massif (Docker, K8s, CI/CD, Ansible, Terraform) pour 6 chapitres de 2h. |
| `csharp` | 6 chapitres | **Conserver la théorie / Refondre les exercices** | Réécrire les 18 exercices en C# natif au lieu de Python 3. |
| Autres cours (60 cours) | 6 chapitres | **Conserver** | Unité pédagogique cohérente et charge de travail équilibrée. |

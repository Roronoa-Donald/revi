# 15 — Contenus et données affichés

> Chiffres issus de l'extraction (`evidence/pages.json`, `summary.json`). Ils décrivent ce qui est **réellement rendu** dans le HTML, pas ce que le produit prétend.

## 1. Volumétrie globale

| Indicateur | Valeur |
|---|---|
| Pages HTML | 1 067 |
| Cours au registre | 71 (B1 24, B2 24, B3 23) |
| Cours au portail | 70 cartes (23 + 24 + 23) |
| Cours archivé | 1 (`b1-vb-excel`) |
| Blocs de code lab | 1 326 |
| Blocs suspendus | 354 (122 pages, 21 cours) |
| Questions QCM rendues | 3 443 |
| Formulaires | 20 (8 servis) |
| Tableaux | 748 |
| Boutons | 13 811 |
| Liens | plusieurs dizaines de milliers (non comptés finement) |
| Pages avec emoji | 110 (3 servies seulement) |

## 2. Structure d'un cours généré (kit 13 pages)

| # | Fichier | Rôle | Contenu type |
|---|---|---|---|
| 1 | `index.html` | accueil | H1, 3 encadrés, programme |
| 2 | `sommaire.html` | plan | liste des chapitres + ressources |
| 3 | `chapitres/chapitre1.html` | chapitre 1 | situation, objectifs, 4–6 sections, lab, QCM, révision, maîtrise |
| 4 | `chapitres/chapitre2.html` | chapitre 2 | idem |
| 5 | `chapitres/chapitre3.html` | chapitre 3 | idem |
| 6 | `chapitres/chapitre4.html` | chapitre 4 | idem |
| 7 | `chapitres/chapitre5.html` | chapitre 5 | idem |
| 8 | `chapitres/cartes.html` | flashcards | grille de cartes recto/verso |
| 9 | `chapitres/formules.html` | mémo | formules, tableaux, pseudo-code |
| 10 | `chapitres/simulateur-examen.html` | examen blanc | chronomètre + QCM |
| 11 | `exercices/exercices.html` | banque d'exercices | liste des labs du cours |
| 12 | `atelier.html` | atelier libre | éditeur vierge + consignes |
| 13 | assets | `assets/css/cours.css`, `assets/js/cours.js` | styles et logique du cours |

Les cours historiques (`b1-python`, `b1-c-cpp`, `b1-algo`, `b1-php`, `b1-sql`) ont des pages écrites à la main, avec un nombre de chapitres variable et parfois des pages supplémentaires.

## 3. Contenu d'un chapitre

Sections récurrentes, dans cet ordre :

1. **Mise en situation** (`.box--situation`) : 1 paragraphe narratif.
2. **Objectifs** (`.box--objectifs`) : 4 puces « À la fin de ce chapitre, vous saurez… ».
3. **Sections numérotées** : intuition, technique, exemples, tableau comparatif.
4. **Encadrés** : `--tech`, `--pitfall`, `--mnemo`, `--it`, `--method`.
5. **Exercices de code** : 1 à 3 blocs `data-lab` selon le cours.
6. **QCM — niveau examen** : 5 à 10 questions.
7. **Erreurs classiques** : liste.
8. **Méthodologie** : procédure en étapes.
9. **Révision active** : checklist + flashcards inline.
10. **Test de maîtrise** : 4 bandes + case à cocher.
11. **Navigation** : retour sommaire, chapitre suivant.
12. **Disclaimer** : mention pédagogique.

Les chapitres contiennent en moyenne 1 500 à 2 500 mots.

## 4. Contenus par niveau

### B1 — 24 cours (23 affichés)

Cours à code lab : Python, C/C++, Algorithmique, PHP, Algèbre, Statistiques, Programmation Web, Robotique, Linux, Git, Cybersécurité, MÉRISE, Droit, Anglais, Français professionnel, Réseaux, Bureautique, CCNA1, Architecture, Administration Windows, Virtualisation, Projet, SQL.
Cours archivé : VB/Excel.

Langages de lab dominants : Python, Bash, HTML/CSS/JS, C.

### B2 — 24 cours

Linux, PHP POO, Probabilités, Java, Windows Server, Administration des machines virtuelles, Droit informatique, React, API REST Flask, ERP & SI, Ingénierie du besoin, Masterclass apprendre, Recherche opérationnelle, Assembleur, Cybersécurité, SQL, C#, CCNA, UML, UI/UX, Docker, Infographie, plus deux cours listés au registre mais sans page dédiée détectée.

Chaque cours B2 livré : 13 pages, 18 exercices de lab.

### B3 — 23 cours

Algorithmique, Cloud Computing, DevOps, Document technique, Étude quantitative, Firewall, GitHub, Linux, Agile, pfSense, Réseau LAN, SQL, Veille, Windows Server, Anglais, Cloud Azure, Cryptographie, Google Cloud, Hacking, Cloud AWS, Supervision, VoIP, Virtualisation avancée.
Chaque cours : 13 pages, 18 exercices, verrouillage « Réservé B3 et plus ».

## 5. QCM

| Indicateur | Valeur |
|---|---|
| Questions rendues | 3 443 |
| Format | `.q` + `.q__stem` + `.opts` (2–4 options) + `.q__exp` |
| Correction | côté navigateur (`scripts/templates/cours.js`) |
| Explication | toujours présente, révélée après réponse |
| Numérotation | automatique via CSS (`Q1.`, `Q2.`…) |
| Examens | `simulateur-examen.html`, chronométré |
| Annales | 23 questions réparties sur 8 matières |

Le contenu QCM est pédagogique : une seule bonne réponse par question, pas de question à choix multiple.

## 6. Exercices de code

| Indicateur | Valeur |
|---|---|
| Blocs de lab | 1 326 |
| Exercices notés (avec `data-exercise`) | une partie des blocs |
| Blocs suspendus | 354 |
| Langages | Python, C, C++, PHP, JavaScript, Java, Bash, PowerShell, HTML/CSS, SQL (local), analyse (non exécutable) |
| Structure | objectif, énoncé, exemple entrée/sortie, indices, code de départ, tests cachés, solution |
| Validation | cachée côté serveur, jamais exposée au client |

Les 354 suspensions sont affichées avec un avis explicite : l'énoncé reste lisible, la validation est désactivée. Elles concernent des exercices dont les tests n'ont pas été certifiés.

## 7. Annales (`epreuves/index.html`)

| Élément | Valeur |
|---|---|
| Mots | 6 376 |
| Sections | 8 matières |
| Questions | 23 |
| Blocs de code | 8 |
| Labs | 8 |
| Onglets | 8 |
| Source | examen blanc transversal |

## 8. Preparation Web (12 projets)

Contenu pédagogique HTML/CSS/JS : structure de page, sémantique, formulaires, mise en page, responsive, JavaScript, DOM, événements, accessibilité, performance, projet final. Chaque projet comporte des étapes, un code de départ, des critères, un quiz.

## 9. Contenus administratifs

- 6 compteurs (comptes, abonnés, gratuits, désactivés, sessions actives, expirations < 7 j).
- Tables utilisateurs, sessions, paiements, journal.
- 5 onglets, 3 cartes IA.
- Journal : types d'événements (connexion, inscription, activation, paiement, admin…), pagination.

## 10. Contenus absents

- Pas de blog, actualités, FAQ, page « à propos », mentions légales, CGU, politique de confidentialité.
- Pas de témoignages, prix détaillés au-delà de deux formules, page de contact (seul un lien WhatsApp dans le chat).
- Pas de programme officiel, d'emploi du temps, de relevé de notes.
- Pas de vidéo, audio, PDF intégré dans les cours (les PDF existent dans `epreuves/` mais ne sont pas liés depuis les pages extraites).

## 11. Ton et langue

- Français, tutoiement dans les labs et l'atelier (« Écris… », « Ta réponse… »), vouvoiement dans les pages de cours (« vous saurez »).
- Aucune majuscule criarde, pas d'emoji (règle produit), icônes SVG uniquement.
- Les messages d'erreur serveur sont parfois techniques (à ne pas recopier tels quels dans Stitch).

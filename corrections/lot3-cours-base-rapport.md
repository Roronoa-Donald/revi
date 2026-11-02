# Lot 3 — Rapport d'audit de bout en bout des 8 cours de base

**Date d'audit :** 31 octobre 2026  
**Périmètre :** Les 8 cours de base de bout en bout (tous les chapitres) :  
`b1-python`, `b1-algo`, `b1-sql`, `b1-c-cpp`, `b1-php`, `b1-prog-web`, `b1-linux`, `b1-reseaux`.  
**Banc de mutations :** 227 fiches suspendues analysées.  
**Déploiement :** Aucun déploiement (travaux 100 % locaux).

---

## 1. Définition du statut « Prêt » selon les 5 critères

Un cours est déclaré **Prêt** si et seulement si les 5 critères suivants sont cumulativement établis :

1. **Critère 1 — 0 constat S0 ou S1 factuel ouvert :** Tous les constats critiques (S0) et majeurs (S1) de `corrections/suivi.csv` affectant le cours sont soit corrigés et prouvés, soit nuancés et documentés. Aucun n'est à l'état `reporté` ou `ouvert`.
2. **Critère 2 — Exercices notés sous double preuve ou étiquetés « Entraînement non noté » :** Seuls les exercices disposant de deux entrées inédites démontrées et de deux variantes fautives distinctes rejetées sont notés. Tous les autres sont suspendus de notation et étiquetés « Entraînement, non noté » sur l'interface utilisateur.
3. **Critère 3 — QCM relus avec 1 seule réponse défendable et explications :** 100 % des questions du cours disposent d'exactement une option marquée correcte (`data-correct="1"`), sans doublon d'intitulé, avec une explication pédagogique complète.
4. **Critère 4 — Aucune alerte automatique ouverte :** Synchronisation stricte des cours (`courses:check`), des ateliers (`labs:check`), validation des tests unitaires (`npm test`), intégrité du balisage HTML (`analyser-pages`) et respect du design impeccable.
5. **Critère 5 — Tableau de relecture humaine prêt à remplir :** Une grille d'évaluation qualitative exhaustive chapitre par chapitre est fournie, prête pour la contre-lecture humaine finale.

---

## 2. Synthèse globale des 8 cours de base

| Cours | Chapitres | QCM (Total / Conformes) | Exercices (Notés / Entraînement) | Constats S0/S1 ouverts | Alertes auto | Statut technique |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **b1-python** | 6 | 61 / 61 (100 %) | 0 notés / 18 entraînement | **0** (F91 corrigé) | 0 | **Prêt pour relecture** |
| **b1-algo** | 10 | 61 / 61 (100 %) | 4 notés / 26 entraînement | **0** | 0 | **Prêt pour relecture** |
| **b1-sql** | 6 | 36 / 36 (100 %) | 0 notés / 18 entraînement | **0** | 0 | **Prêt pour relecture** |
| **b1-c-cpp** | 8 | 48 / 48 (100 %) | 0 notés / 24 entraînement | **0** | 0 | **Prêt pour relecture** |
| **b1-php** | 8 | 48 / 48 (100 %) | 0 notés / 24 entraînement | **0** | 0 | **Prêt pour relecture** |
| **b1-prog-web** | 6 | 36 / 36 (100 %) | 0 notés / 18 entraînement | **0** (F227 corrigé) | 0 | **Prêt pour relecture** |
| **b1-linux** | 6 | 56 / 56 (100 %) | 17 notés / 1 entraînement | **0** (F29 qualifié) | 0 | **Prêt pour relecture** |
| **b1-reseaux** | 6 | 48 / 48 (100 %) | 0 notés / 18 grilles format. | **0** | 0 | **Prêt pour relecture** |
| **TOTAL** | **56** | **394 / 394 (100 %)** | **21 notés / 147 entraînement** | **0 ouvert** | **0** | **Prêt pour relecture** |

---

## 3. Rapport détaillé par cours

### 3.1. b1-python — Algorithmique & Programmation Python B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | 9 constats historiques : 9 corrigés. F91 (alignement vouvoiement code/sortie `b1-python/chapitres/chapitre1.html:191`) corrigé et vérifié. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 18 exercices (`py-c1-e1` à `py-c6-e3`). 0 noté, 18 suspendus avec badge `.lab__training` « Entraînement, non noté » actif et vérifié. | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 61 questions sur 6 chapitres. 61/61 avec 1 seule option correcte, 0 doublon, explications détaillées présentes sur 100 % des questions. | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | `labs:check` OK, `analyser-pages` 0 erreur, syntaxe Python 3.14 OK. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-python
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Entraînement) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Environnement, variables et types | [ ] Validé | 10 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Conditions et logique booléenne | [ ] Validé | 10 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Fonctions et modularité | [ ] Validé | 10 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Boucles et itérations | [ ] Validé | 10 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Chaînes et manipulation de texte | [ ] Validé | 10 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Listes, tuples et dictionnaires | [ ] Validé | 11 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.2. b1-algo — Algorithmique Fondamentale B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | 15 constats : 10 corrigés, 5 nuancés (F108, F116, F117, F118, F205 documentés avec domaine borné). 0 ouvert. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 30 exercices. 4 notés prouvés (`algo-c6-e3`, `algo-c9-e1`, `algo-c9-e3`, `algo-c10-e3` sous double preuve dans `prelot3-methodes.json`) ; 26 étiquetés « Entraînement, non noté ». | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 61 questions sur 10 chapitres. 61/61 avec 1 seule option correcte, explications systématiques. | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | `labs:check` OK, tests algorithmiques unitaires au vert. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-algo
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Statut) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Notions fondamentales & Variables | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Structures conditionnelles | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Boucles déterministes (Pour) | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Boucles conditionnelles (Tant que) | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Tableaux à une dimension | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Algorithmes de tri classiques | [ ] Validé | 6 / [ ] | 2 Entraînement + 1 Noté (`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 7** | Fonctions et procédures | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 8** | Tableaux à deux dimensions | [ ] Validé | 6 / [ ] | 3 fiches (Entraînement) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 9** | Récursivité fondamentale | [ ] Validé | 7 / [ ] | 1 Entraînement + 2 Notés (`e1`,`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 10** | Complexité & Optimisation | [ ] Validé | 6 / [ ] | 2 Entraînement + 1 Noté (`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.3. b1-sql — Bases de Données & SQL B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | 15 constats : 7 corrigés, 7 nuancés documentés, F227 corrigé. 0 ouvert. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 18 exercices. Exécution via simulateur SQLite WebAssembly client-side. Notation serveur suspendue (`suspendedCourses`). 18/18 « Entraînement, non noté ». | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 36 questions sur 6 chapitres (6 par chapitre). 36/36 conformes, nuances SQLite/PostgreSQL explicitées. | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | `smoke-sql-simulator` OK, `courses:check` OK. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-sql
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Simulateur) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Introduction SGBD & Modèle relationnel | [ ] Validé | 6 / [ ] | 3 requêtes / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Création de tables (DDL) | [ ] Validé | 6 / [ ] | 3 requêtes / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Interrogation simple (SELECT, WHERE) | [ ] Validé | 6 / [ ] | 3 requêtes / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Jointures relationnelles (INNER, LEFT) | [ ] Validé | 6 / [ ] | 3 requêtes / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Fonctions d'agrégation (GROUP BY, HAVING)| [ ] Validé | 6 / [ ] | 3 requêtes / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Manipulation de données (DML : INSERT, UPDATE) | [ ] Validé | 6 / [ ] | 3 requêtes / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.4. b1-c-cpp — Programmation C / C++ B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | 0 constat historique ouvert. Clarification de `scanf`, gestion des types et pointeurs intégrée. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 24 exercices (`c-c1-e1` à `c-c8-e3`). 24/24 suspendus avec badge « Entraînement, non noté » vérifié. | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 48 questions sur 8 chapitres (6 par chapitre). 48/48 conformes avec une seule réponse exacte et explications. | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | Compilation GCC C11 / G++ C++17 sans avertissement, `labs:check` OK. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-c-cpp
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Entraînement) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Syntaxe de base & Types fondamentaux | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Entrées/Sorties formatées (printf/scanf)| [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Structures de contrôle | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Tableaux et chaînes de caractères | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Pointeurs et adresses mémoire | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Allocation dynamique de mémoire | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 7** | Structures et types personnalisés | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 8** | Introduction C++ & Références | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.5. b1-php — Programmation Web PHP B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | F68 corrigé. 0 constat factuel ouvert. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 24 exercices (`php-c1-e1` à `php-c8-e3`). 24/24 suspendus avec badge « Entraînement, non noté » actif. | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 48 questions sur 8 chapitres (6 par chapitre). 48/48 conformes avec explications complètes. | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | Interpréteur PHP CLI portable `tools/php-cli/php` fonctionnel à 100 %, 0 erreur de syntaxe. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-php
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Entraînement) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Syntaxe, variables et types | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Conditions et opérateurs logiques | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Boucles (for, while, foreach) | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Tableaux indexés et associatifs | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Fonctions et portée des variables | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Superglobales et formulaires ($_GET, $_POST) | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 7** | Gestion des sessions et cookies | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 8** | Traitement des erreurs et exceptions | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.6. b1-prog-web — Développement Web (HTML, CSS, JS) B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | F207 corrigé, F227 (S2, tutoiement vs vouvoiement au ch. 6) harmonisé au vouvoiement et régénéré. 0 ouvert. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 18 exercices (`web-c1-e1` à `web-c6-e3`). 18/18 suspendus avec badge « Entraînement, non noté ». | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 36 questions sur 6 chapitres (6 par chapitre). 36/36 conformes (RFC 9110 HTTP, sémantique DOM, CSS). | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | `courses:check` OK (13 pages régénérées), `labs:check` OK. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-prog-web
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Entraînement) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Protocoles Web & Architecture Client/Serveur | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | HTML5 Sémantique & Structure | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | CSS3 Fondamentaux & Sélecteurs | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Mise en page moderne (Flexbox & Grid) | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | JavaScript : Syntaxe & Logique de base | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Manipulation du DOM & Événements | [ ] Validé | 6 / [ ] | 3 fiches / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.7. b1-linux — Système d'Exploitation & Administration Linux B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | 21 constats : 15 corrigés, 6 nuancés documentés. F29 qualifié avec succès dans `verifier-langue.js`. 0 ouvert. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 18 exercices. 17 notés vérifiés (`lx-c1-e2` à `lx-c6-e3` avec preuves d'entrées inédites et variantes rejetées) ; 1 suspendu (`lx-c1-e1`, résolution de chemin, avec badge conforme). | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 56 questions sur 6 chapitres. 56/56 conformes avec 1 seule réponse correcte et explications techniques (inodes, MBR/GPT, FHS, permissions). | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | Exécution sous sandbox Bubblewrap isolée sans réseau au vert. `courses:check` OK. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-linux
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Statut) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Histoire, philosophie & Distributions | [ ] Validé | 8 / [ ] | 1 Entraînement (`e1`) + 2 Notés | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Arborescence FHS & Gestion des fichiers | [ ] Validé | 10 / [ ] | 3 Notés (`e1`,`e2`,`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Commandes usuelles & Recherche (find/grep)| [ ] Validé | 10 / [ ] | 3 Notés (`e1`,`e2`,`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Droits d'accès & Gestion des permissions | [ ] Validé | 10 / [ ] | 3 Notés (`e1`,`e2`,`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Utilisateurs, groupes & Fichiers de conf | [ ] Validé | 10 / [ ] | 3 Notés (`e1`,`e2`,`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Scripts Shell Bash fondamentaux | [ ] Validé | 8 / [ ] | 3 Notés (`e1`,`e2`,`e3`) | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

### 3.8. b1-reseaux — Réseaux Informatiques B1

#### Tableau d'évaluation des 5 critères
| Critère | Exigence | Résultat observé | Statut |
| :--- | :--- | :--- | :---: |
| **1. Constats S0/S1** | 0 constat factuel ouvert | 10 constats : 8 corrigés, 2 nuancés documentés. F40 (notion de WAN), F121 (double anneau) cadrés. 0 ouvert. | **CONFORME** |
| **2. Notation exercices** | Notés sous preuve, sinon "entraînement non noté" | 18 fiches de simulation formative (`language: 'analyse'`). Non évaluées comme du code machine, guidage méthodologique avec critères vérifiés. | **CONFORME** |
| **3. QCM** | 1 seule réponse défendable + explications | 48 questions sur 6 chapitres (8 par chapitre). 48/48 conformes : 1 seule réponse exacte, explications sur le modèle OSI, calculs de sous-réseaux, IPv4/IPv6. | **CONFORME** |
| **4. Alertes auto** | Aucune alerte bloquante | `courses:check` OK, `labs:check` OK, recalcul indépendant des scénarios de simulation réussi. | **CONFORME** |
| **5. Relecture humaine** | Tableau prêt à remplir | Fourni ci-dessous. | **CONFORME** |

#### Tableau de relecture humaine — b1-reseaux
| Chapitre | Titre | Objectifs & Théorie | QCM (Nb / Validé) | Ateliers (Simulation formative) | Avis Relecteur | Signature & Date |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **Ch. 1** | Notions fondamentales & Topologies | [ ] Validé | 8 / [ ] | 3 grilles d'analyse / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 2** | Médias de transmission & Câblage | [ ] Validé | 8 / [ ] | 3 grilles d'analyse / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 3** | Modèles en couches (OSI & TCP/IP) | [ ] Validé | 8 / [ ] | 3 grilles d'analyse / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 4** | Couche Liaison & Ethernet (MAC, CSMA/CD)| [ ] Validé | 8 / [ ] | 3 grilles d'analyse / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 5** | Adressage IPv4 & Classes d'adresses | [ ] Validé | 8 / [ ] | 3 grilles d'analyse / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |
| **Ch. 6** | Découpage en sous-réseaux (VLSM / CIDR) | [ ] Validé | 8 / [ ] | 3 grilles d'analyse / [ ] | [ ] Favorable [ ] Réserves | ___ / ___ / 2026 |

---

## 4. Bilan du banc de mutations sur les 227 fiches suspendues

### 4.1. Protocole d'expérimentation
Le banc a été exécuté sur l'intégralité des 227 fiches de code suspendues issues de `corrections/resultats/prelot3-preuves-289.tsv`.
- **Moteur d'exécution :** Outils locaux strictement confinés (Python 3.14, GCC C11, G++ C++17, PHP portable `tools/php-cli/php`, Node 22, Bash).
- **Mutations appliquées :** Mutations arithmétiques (`+` $\leftrightarrow$ `-`, `*` $\leftrightarrow$ `+`), logiques (`==` $\leftrightarrow$ `!=`, `<` $\leftrightarrow$ `<=`, `>` $\leftrightarrow$ `>=`), constantes numériques (`0` $\leftrightarrow$ `1`, `n+1`, `60` $\rightarrow$ `61`), et booléennes (`true` $\leftrightarrow$ `false`).
- **Objectif :** Vérifier si les jeux de tests existants rejettent les mutants ou si des mutants survivent (détectant ainsi des angles morts dans les tests).

### 4.2. Résultats statistiques globaux
- **Total fiches suspendues analysées :** 227
- **Corrigés officiels :** 100 % conformes (aucun corrigé n'échoue sur ses propres tests de référence).
- **Répartition des résultats :**
  - **Mutants tous rejetés (`tous_rejetes`) :** 101 fiches (44,5 %) — Les tests existants ont intercepté l'intégralité des mutants générés.
  - **Fiches avec mutants survivants (`survivants`) :** 55 fiches (24,2 %) — Au moins un mutant altérant la logique a produit la même sortie que le corrigé sur tous les tests existants.
  - **Sans mutant simple synthétisable (`sans_mutant`) :** 32 fiches (14,1 %) — Code purement déclaratif ou sans opérateur arithmétique élémentaire.
  - **Environnement spécifique non supporté en local (`outil_absent`) :** 39 fiches (17,2 %) — PowerShell (21) et Java (18) nécessitant un runner dédié.

### 4.3. Revue manuelle des 55 échecs (mutants survivants)

La revue manuelle des 55 fiches en échec met en évidence 4 catégories typiques de lacunes dans les tests cachés existants :

1. **Faiblesse sur les valeurs frontières temporelles et modulaires :**
   - *Exemple emblématique :* `algo-c1-e3` (conversion de secondes). La mutation `reste // 60` $\rightarrow$ `reste // 61` survit parce que les tests existants utilisent des durées où le nombre de minutes restantes est inférieur à 60 (2 min, 0 min, etc.). Or `125 // 60 == 2` et `125 // 61 == 2`. Le mutant ne produit une divergence que lorsque le reste est $\ge 60$ minutes.
2. **Bornes d'itérations ou de seuils non testées :**
   - *Exemple :* `c-c4-e1`, `c-c4-e3`, `c-c6-e3` où la constante `100` mutée en `101` survit parce que les cas de test ne fournissent que des entrées strictes dans l'intervalle $[1, 99]$ sans tester la frontière exacte 100.
   - *Exemple :* `al3-c1-e1`, `al3-c1-e2` (recherche dichotomique en B3) où l'indice `0` muté en `1` survit lorsque le premier élément du tableau n'est jamais la cible recherchée.
3. **Absence de test sur la branche négative / alternative :**
   - *Exemple :* `php-c5-e2`, `algo-c7-e3`, `web-c3-e1` où la valeur booléenne `true` $\leftrightarrow$ `false` survit car les tests ne vérifient que le cas passant et n'ont pas de scénario négatif invalidant.
4. **Calculs arithmétiques absorbés par les données de test :**
   - *Exemple :* `fl2-c1-e3`, `py-c5-e1` où l'inversion d'un signe `+` en `-` donne le même résultat sur les jeux de test symétriques ou contenant 0.

### 4.4. Conclusion sur le banc de mutations
Cette analyse manuelle valide parfaitement la politique de précaution adoptée : **le maintien de la suspension de notation (« Entraînement non noté ») sur ces fiches est rigoureusement fondé**. Ces fiches ne pourront être réactivées pour notation que lorsque des cas de test discriminants ciblant ces frontières auront été ajoutés et validés par double preuve.

---

## 5. Recommandations et prochaines étapes

1. **Relecture humaine finale :** Soumettre les tableaux de relecture des sections 3.1 à 3.8 aux équipes pédagogiques. Les 8 cours de base sont désormais dans un état assaini, cohérent et exempt de toute contradiction factuelle bloquante.
2. **Consolidation des tests de frontières :** Pour les 55 fiches identifiées au banc de mutations, enrichir les suites de tests avec des cas aux limites (frontières 0, max, restes modulo, cas d'échec) afin de préparer leur réactivation ultérieure.
3. **Statut Git et déploiement :** Aucun commit de déploiement n'a été effectué ; l'ensemble des modifications est confiné au répertoire de travail local.

# RAPPORT D'INTÉGRITÉ DU CATALOGUE & DES CONTENUS (CATALOGUE & CONTENT INTEGRITY REPORT)
## Plateforme REVI-MU — Interactive Computing Education Engine
**Cadre :** Rapprochement Multidimensionnel et Traçabilité des Données du Catalogue  
**Sources de Données Rapprochées :** `index.html`, `server/courses.js`, `server/content/`, `server/exercises/`, `middleware.js`, Répertoires Réels du Dépôt  

---

## 1. VUE D'ENSEMBLE DU RAPPROCHEMENT DU CATALOGUE

Le catalogue de formations de Revi-Mu souffre d'une fragmentation de ses sources de vérité. Plusieurs composants redéfinissent ou consomment la liste des cours de manière partiellement synchronisée, ce qui crée des décalages perceptibles pour l'apprenant et des angles morts pour la maintenance.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SOURCES DE VÉRITÉ EN CONFLIT                     │
├────────────────────────────────┬───────────────────────────────────────┤
│ 1. Vitrine Publique            │ index.html (68 cartes portal-card)    │
│ 2. Registre Serveur Node.js    │ server/courses.js (71 entrées)        │
│ 3. Moteur de Rendu des Pages   │ server/content/*.js (64 générateurs)  │
│ 4. Moteur d'Atelier de Code    │ server/exercises/course-config.js     │
│ 5. Middleware Edge Vercel      │ middleware.js (78 répertoires gardés) │
│ 6. Répertoires Physiques       │ Système de fichiers local             │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

## 2. ANOMALIES MAJEURES D'INTÉGRITÉ

### 2.1. L'Écart des 71 Cours : 71 Annoncés vs 68 Cours Réels
- **Allégation sur le portail :** *« 71 cours interactifs d'informatique — Licence 1 (24), Licence 2 (24), Licence 3 (23) »*.
- **Constat d'audit :**
  1. **Licence 1 (23 réels + 1 fantôme) :** Le dossier `b1-vb-excel` est un module fantôme. Il ne contient qu'un fichier `index.html` de 5 Ko sans sommaire, sans chapitres et sans aucun exercice. Il n'a même pas de carte sur la page d'accueil.
  2. **Licence 2 (22 réels + 2 modules hors-format) :** Les répertoires `epreuves` (recueil d'annales PDF) et `preparation-web` (simulateur web autonome) sont comptabilisés comme des cours réguliers dans `server/courses.js`, mais ne possèdent pas la structure d'un cours (pas de chapitres standard, pas de fiches de cours, pas de fiches de formules).
  3. **Licence 3 (23 réels) :** Tous les 23 cours de L3 existent et possèdent 6 chapitres et des ateliers de code.
- **Total Réel :** **68 cours interactifs complets.** L'affichage de « 71 cours » induit l'étudiant en erreur.

### 2.2. L'Espace Encodé sur la Carte `Cyber securite B2`
Dans `index.html`, la carte du cours de cybersécurité B2 utilise le lien suivant :
```html
<a href="Cyber%20securite%20B2/sommaire.html" class="card portal-card" ...>
```
L'URL-encoding de l'espace (`%20`) dans l'attribut `href` crée une divergence avec les scripts d'analyse qui recherchent `Cyber securite B2`. De plus, l'utilisation d'espaces et de majuscules dans un nom de dossier Web (`Cyber securite B2`) enfreint les conventions POSIX et Web standards (slugs kebab-case minuscules recommandés).

### 2.3. Les 4 Cours B1 « Dissidents » Hors du Moteur de Rendu
Dans `server/content/`, 64 fichiers de cours existent. Les 7 cours manquants sont :
- `preparation-web` et `epreuves` (non-cours)
- `b1-vb-excel` (fantôme)
- **`b1-algo`, `b1-c-cpp`, `b1-php`, `b1-python`** : Ces 4 cours fondamentaux de Licence 1 ne sont pas gérés par le générateur `scripts/generate-courses.js`. Ils sont conservés sous forme de code HTML statique écrit à la main.
  - **Risque :** Lorsque le script `npm run courses` est exécuté pour propager une modification du composant d'authentification ou du tuteur IA, ces 4 cours ne reçoivent pas la mise à jour et divergent silencieusement du reste de la plateforme.

---

## 3. ANALYSE DES DOUBLONS DISCIPLINAIRES ENTRE NIVEAUX

La présence de modules portant sur le même domaine entre les années a été examinée pour distinguer les redondances fautives des approfondissements pédagogiques légitimes.

### 3.1. Filière SQL & Bases de Données (3 cours)
- `b1-sql` (Licence 1 — 6 chapitres) : Fondations relationnelles, `SELECT`, filtres `WHERE`, tris `ORDER BY`, fonctions d'agrégation simples.
- `sql` (Licence 2 — 8 modules) : Jointures complexes (`INNER`, `LEFT`, `CROSS`), sous-requêtes corrélées, contraintes d'intégrité, modélisation physique.
- `b3-sql` (Licence 3 — 6 chapitres) : Indexation avancée, optimisation de plans d'exécution (`EXPLAIN ANALYZE`), transactions ACID, procédures stockées et triggers.
- **Verdict :** **LÉGITIME.** Progression spiralaire bien étagée du novice vers le perfectionnement DBA.

### 3.2. Filière Cisco / Réseaux (2 cours)
- `b1-ccna1` (Licence 1 — 6 chapitres) : Modèle OSI, adressage IPv4/IPv6, protocoles ARP/ICMP, câblage et commutation de base.
- `ccna` (Licence 2 — 6 chapitres) : Routage statique et dynamique (OSPF), VLANs, STP (Spanning Tree Protocol), sécurité des ports de switch.
- **Verdict :** **LÉGITIME.** Conforme au découpage officiel Cisco CCNA (Introduction aux Réseaux vs Routing & Switching Essentials).

---

## 4. TABLEAU DE RECONCILIATION CANONIQUE (71 MODULES)

| Slug | Titre Canonique | Niveau | Présent index.html | Nb Chap. HTML | server/content | Exercices Code | Statut Intégrité |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `b1-admin-windows` | Administration Windows | B1 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b1-algebre` | Algèbre linéaire | B1 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b1-algo` | Algorithmique | B1 | Oui | 10 | Non (Statique) | 30 (Algo) | Hors générateur |
| `b1-anglais` | Anglais des affaires | B1 | Oui | 6 | Oui | 18 (Shell) | Code lab forcé |
| `b1-architecture` | Architecture ordinateurs | B1 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b1-bureautique` | Bureautique | B1 | Oui | 6 | Oui | 18 (Shell) | Code lab forcé |
| `b1-c-cpp` | Langage C & C++ | B1 | Oui | 8 | Non (Statique) | 24 (C) | Hors générateur |
| `b1-ccna1` | CCNA 1 | B1 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b1-cyber` | Cybersécurité B1 | B1 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b1-droit` | Droit B1 | B1 | Oui | 6 | Oui | 18 (Shell) | Code lab forcé |
| `b1-fr-pro` | Français professionnel | B1 | Oui | 6 | Oui | 18 (Shell) | Code lab forcé |
| `b1-git` | Git | B1 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b1-linux` | Linux B1 | B1 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b1-merise` | MERISE | B1 | Oui | 6 | Oui | 18 (SQL) | Conforme |
| `b1-php` | PHP B1 | B1 | Oui | 8 | Non (Statique) | 24 (PHP) | Hors générateur |
| `b1-prog-web` | Programmation Web | B1 | Oui | 6 | Oui | 18 (JS) | Conforme |
| `b1-projet` | Projet B1 | B1 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b1-python` | Python B1 | B1 | Oui | 6 | Non (Statique) | 18 (Python) | Hors générateur |
| `b1-reseaux` | Réseaux B1 | B1 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b1-robotique` | Club robotique | B1 | Oui | 6 | Oui | 18 (C) | Conforme |
| `b1-sql` | SQL B1 | B1 | Oui | 6 | Oui | 18 (SQL) | Conforme |
| `b1-stats` | Statistique descriptive | B1 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b1-vb-excel` | VB Excel | B1 | **Non** | **0** | **Non** | **0** | **FANTÔME** |
| `b1-virtualisation` | Virtualisation B1 | B1 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `admin-vm` | Admin VM | B2 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `api-rest-flask` | Flask API REST | B2 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `assembleur` | Assembleur | B2 | Oui | 6 | Oui | 18 (ASM) | Conforme |
| `ccna` | CCNA 2 | B2 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `csharp` | C# .NET | B2 | Oui | 6 | Oui | 18 (C#) | Conforme |
| `Cyber securite B2` | Cybersécurité B2 | B2 | Oui (%20) | 6 | Oui | 18 (Python) | Slug avec espace |
| `docker` | Docker | B2 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `droit` | Droit B2 | B2 | Oui | 6 | Oui | 18 (Shell) | Code lab forcé |
| `epreuves` | Épreuves Passées | B2 | **Non (Header)**| **0 (PDF)** | **Non** | **0** | **Non-cours** |
| `erp-si` | ERP & SI | B2 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `infographie` | Infographie | B2 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `ingenierie-besoin` | Ingénierie du besoin | B2 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `linux` | Linux B2 | B2 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `masterclass-apprendre`| Apprendre à apprendre | B2 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `php` | PHP B2 | B2 | Oui | 6 | Oui | 18 (PHP) | Conforme |
| `preparation-web` | Préparation Web | B2 | **Non (Header)**| **0 (Sandbox)**| **Non** | **0** | **Outil tiers** |
| `probabilites` | Probabilités | B2 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `rd_java` | Java B2 | B2 | Oui | 6 | Oui | 18 (Java) | Conforme |
| `rd_winserver` | Windows Server B2 | B2 | Oui | 6 | Oui | 18 (PowerShell)| Conforme |
| `RD-RO` | Recherche Opérationnelle| B2 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `react` | React JS | B2 | Oui | 6 | Oui | 18 (JS) | Conforme |
| `sql` | SQL B2 | B2 | Oui | 8 | Oui | 24 (SQL) | Conforme |
| `uiux` | UI/UX Design | B2 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `uml` | Modélisation UML | B2 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b3-agile` | Méthodes Agiles | B3 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `b3-algo` | Algorithmique B3 | B3 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b3-anglais` | Anglais B3 | B3 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `b3-cloud-aws` | Cloud AWS | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-cloud-azure` | Cloud Azure | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-cloud-computing` | Cloud Computing | B3 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b3-cryptographie` | Cryptographie | B3 | Oui | 6 | Oui | 18 (Python) | Conforme |
| `b3-devops` | DevOps & CI/CD | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-document-technique`| Documentation Tech. | B3 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `b3-etude-quantitative`| Étude quantitative | B3 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `b3-firewall` | Firewall & Sécurité | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-github` | GitHub Avancé | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-google-cloud` | Google Cloud (GCP) | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-hacking` | Hacking Éthique | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-linux` | Linux Avancé B3 | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-pfsense` | pfSense | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-reseau-lan` | Réseaux LAN B3 | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-sql` | SQL Avancé B3 | B3 | Oui | 6 | Oui | 18 (SQL) | Conforme |
| `b3-supervision` | Supervision Réseau | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-veille` | Veille Technologique | B3 | Oui | 6 | Oui | 18 (Python) | Code lab forcé |
| `b3-virtualisation` | Virtualisation B3 | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-voip` | Téléphonie VoIP | B3 | Oui | 6 | Oui | 18 (Shell) | Conforme |
| `b3-windows-server` | Windows Server B3 | B3 | Oui | 6 | Oui | 18 (PowerShell)| Conforme |

---

## 5. PLAN D'ACTION POUR L'UNIFICATION DU CATALOGUE

1. **Supprimer le cours fantôme ou créer le contenu :** Déclarer officiellement 68 cours interactifs ou implémenter les 6 chapitres de `b1-vb-excel`.
2. **Renommer `Cyber securite B2` :** Remplacer le dossier par `cyber-securite-b2` (kebab-case) et mettre à jour les routes et redirections.
3. **Intégrer les 4 cours B1 dissidents :** Rapatrier `b1-algo`, `b1-c-cpp`, `b1-php` et `b1-python` dans `server/content/` pour les soumettre au build automatisé et aux vérifications statiques.
4. **Isoler les modules non-cours :** Déplacer `epreuves` et `preparation-web` hors du registre canonique `COURSES` vers une table `EXTENSIONS_AND_RESOURCES`.

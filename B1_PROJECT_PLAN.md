# 🎓 PLAN DE CRÉATION — Portail B1 (Bachelor 1)

> **Dernière mise à jour** : 20/02/2026  
> **Statut global** : � TERMINÉ  
> **Progression** : 52 / 52 chapitres créés

---

## 📋 DÉCISIONS VALIDÉES

| Décision | Choix |
|----------|-------|
| Nombre de matières | **7** (Algo+Pascal, C/C++, Python, Réseaux, Stats, FBD, MERISE existant) |
| Hébergement | **2 déploiements Vercel distincts** |
| Backend | **Dupliqué** dans le projet B1, **même DATABASE_URL** |
| Séparation BDD | Colonne `class` (b1/b2) dans `activation_keys`. B2 accède à B1, pas l'inverse |
| Admin | Chaque interface admin filtre par `class` correspondante |
| Design | **Même glass-card dark** avec couleurs personnalisées par matière |
| Mascottes | **Une par cours** |
| MERISE | **Garder existant** tel quel (6 chapitres) |
| Tutoriel Projet | **Ignoré** |

---

## 🎨 COULEURS PAR MATIÈRE

| Matière | Couleur | Hex | Icône FA | Mascotte |
|---------|---------|-----|----------|----------|
| Algorithmique | Vert émeraude | `#10b981` | `fa-sitemap` | AlgoBot 🤖 |
| C/C++ | Amber/Jaune | `#f59e0b` | `fa-microchip` | CeeBot ⚡ |
| Python | Cyan | `#06b6d4` | `fa-python` (fab) | PyBot 🐍 |
| Archi Réseaux | Bleu ciel | `#0ea5e9` | `fa-network-wired` | NetBot 🌐 |
| Stats Descriptives | Violet | `#8b5cf6` | `fa-chart-pie` | StatBot 📊 |
| FBD (Bases de Données) | Orange | `#ea580c` | `fa-database` | AutoBot 🔧 |
| MERISE | Teal (existant) | `#14b8a6` | `fa-database` | (existant) |

---

## 📂 STRUCTURE CIBLE DU PROJET B1

```
b1/
├── index.html                    ← Portail B1 (7 cartes)
├── package.json                  ← Dépendances (identiques au B2)
├── server.js                     ← Serveur Fastify (dupliqué, même BDD)
├── vercel.json                   ← Config déploiement B1
├── .env                          ← DATABASE_URL partagée + JWT_SECRET
├── render.yaml
├── server/
│   ├── app.js                    ← Routes API (identique sauf COURSES B1)
│   ├── db.js                     ← Connexion DB (identique + colonne class)
│   ├── routes/
│   │   ├── auth.js               ← Activation clés (filtre class='b1')
│   │   ├── admin.js              ← Admin (filtre class='b1')
│   │   └── ai-chat.js            ← Chat IA
│   ├── middleware/
│   │   └── access-control.js     ← Cours B1 + protection
│   └── utils/
│       └── keygen.js
├── public/                       ← Auth pages (identique)
│   ├── activate.html
│   ├── admin/
│   ├── css/
│   └── js/
├── scripts/
│   └── build.js                  ← Build B1 (copie cours B1 seulement)
├── rd-ai-chat.js
│
├── algo/                         ← Algorithmique + Pascal
│   ├── index.html
│   ├── assets/css/style.css
│   ├── assets/js/{main,gamification,exercises,download}.js
│   ├── assets/img/
│   ├── chapitres/
│   │   ├── chapitre1.html  → chapitre10.html
│   │   ├── formules.html
│   │   ├── cartes.html
│   │   └── simulateur-examen.html
│   └── exercices/exercices.html
│
├── c_cpp/                        ← Langage C / C++
│   ├── index.html
│   ├── assets/...
│   ├── chapitres/chapitre1-8.html + extras
│   └── exercices/exercices.html
│
├── python/                       ← Python Fondamentaux
│   ├── index.html
│   ├── assets/...
│   ├── chapitres/chapitre1-8.html + extras
│   └── exercices/exercices.html
│
├── reseaux/                      ← Architecture des Réseaux
│   ├── index.html
│   ├── assets/...
│   ├── chapitres/chapitre1-8.html + extras
│   └── exercices/exercices.html
│
├── stats/                        ← Statistiques Descriptives
│   ├── index.html
│   ├── assets/...
│   ├── chapitres/chapitre1-6.html + extras
│   └── exercices/exercices.html
│
├── fbd/                          ← FBD / Automatismes
│   ├── index.html
│   ├── assets/...
│   ├── chapitres/chapitre1-6.html + extras
│   └── exercices/exercices.html
│
└── merise/                       ← EXISTANT (ne pas toucher)
    ├── index.html
    ├── assets/...
    ├── chapitres/...
    └── exercices/...
```

---

## 📚 DÉCOUPAGE DES CHAPITRES PAR MATIÈRE

### 1. ALGORITHMIQUE + PASCAL (10 chapitres) — 🤖 AlgoBot
| # | Titre | Contenu clé | Statut |
|---|-------|-------------|--------|
| 1 | Introduction à l'algorithmique | Qu'est-ce qu'un algorithme ? Exemples de la vie quotidienne (recette, GPS). Organigrammes. | ✅ |
| 2 | Variables, types & constantes | Déclaration, types (entier, réel, chaîne, booléen), affectation. Pseudocode + Pascal. | ✅ |
| 3 | Entrées / Sorties | Lire(), Écrire(), interaction utilisateur. Pascal: Read, ReadLn, Write, WriteLn. | ✅ |
| 4 | Conditions (Si / Sinon / Selon) | Si...Alors...Sinon, Si imbriqués, Selon (case of). Pascal: if/then/else, case of. | ✅ |
| 5 | Boucles — Pour | Boucle Pour (compteur). Pascal: for...to...do / for...downto...do. | ✅ |
| 6 | Boucles — TantQue & Répéter | TantQue (while), Répéter...Jusqu'à (repeat...until). Différences. | ✅ |
| 7 | Tableaux (1D) | Déclaration, parcours, recherche, tri simple. Pascal: array[]. | ✅ |
| 8 | Tableaux (2D) & Chaînes | Matrices, chaînes de caractères, opérations sur chaînes. | ✅ |
| 9 | Fonctions & Procédures | Paramètres, retour, portée des variables. Pascal: function / procedure. | ✅ |
| 10 | Algorithmes classiques | Tri à bulles, tri par sélection, recherche dichotomique, récursivité intro. | ✅ |

### 2. C / C++ (8 chapitres) — ⚡ CeeBot
| # | Titre | Contenu clé | Statut |
|---|-------|-------------|--------|
| 1 | Introduction au C | Histoire, compilation (gcc), structure d'un programme, printf/scanf. | ✅ |
| 2 | Variables, types & opérateurs | int, float, char, double, sizeof, casting, opérateurs. | ✅ |
| 3 | Conditions & boucles | if/else, switch, for, while, do-while, break/continue. | ✅ |
| 4 | Tableaux & chaînes | Tableaux statiques, strings (char[]), fonctions string.h. | ✅ |
| 5 | Fonctions | Déclaration, prototypes, passage par valeur, variables locales/globales. | ✅ |
| 6 | Pointeurs | Adresses, *, &, arithmétique des pointeurs, pointeurs et tableaux. | ✅ |
| 7 | Structures & fichiers | struct, typedef, fopen/fclose/fprintf/fscanf, modes d'ouverture. | ✅ |
| 8 | Introduction au C++ | Différences C/C++, cout/cin, classes et objets (intro), new/delete. | ✅ |

### 3. PYTHON (8 chapitres) — 🐍 PyBot
| # | Titre | Contenu clé | Statut |
|---|-------|-------------|--------|
| 1 | Introduction à Python | Installation, premier script, print(), interpréteur, IDLE vs VSCode. | ✅ |
| 2 | Variables & types | int, float, str, bool, type(), conversion, input(). | ✅ |
| 3 | Conditions | if/elif/else, opérateurs de comparaison, opérateurs logiques. | ✅ |
| 4 | Boucles | for, while, range(), break/continue, boucles imbriquées. | ✅ |
| 5 | Listes & tuples | Création, indexation, slicing, méthodes, compréhension de liste. | ✅ |
| 6 | Dictionnaires & ensembles | dict, set, méthodes, parcours, cas d'usage. | ✅ |
| 7 | Fonctions | def, paramètres, return, valeurs par défaut, *args, **kwargs, lambda intro. | ✅ |
| 8 | Fichiers & modules | open/read/write, with, import, création de modules, pip intro. | ✅ |

### 4. ARCHITECTURE DES RÉSEAUX (8 chapitres) — 🌐 NetBot
| # | Titre | Contenu clé | Statut |
|---|-------|-------------|--------|
| 1 | Introduction aux réseaux | Définition, types (LAN/WAN/MAN), topologies, composants. | ✅ |
| 2 | Modèle OSI | 7 couches détaillées, rôle de chacune, encapsulation. | ✅ |
| 3 | Modèle TCP/IP | 4 couches, comparaison OSI, protocoles par couche. | ✅ |
| 4 | Adressage IP (IPv4) | Classes, masques, sous-réseaux, CIDR, calcul d'adresses. | ✅ |
| 5 | Protocoles couche transport | TCP vs UDP, ports, 3-way handshake, segmentation. | ✅ |
| 6 | Protocoles couche application | HTTP, FTP, DNS, DHCP, SMTP, SSH, Telnet. | ✅ |
| 7 | Équipements réseau | Hub, switch, routeur, pare-feu, point d'accès, câblage. | ✅ |
| 8 | Sécurité réseau (intro) | Menaces, pare-feu, VPN, chiffrement, bonnes pratiques. | ✅ |

### 5. STATISTIQUES DESCRIPTIVES (6 chapitres) — 📊 StatBot
| # | Titre | Contenu clé | Statut |
|---|-------|-------------|--------|
| 1 | Séries statistiques & vocabulaire | Population, échantillon, variable QQ/QT, effectifs, PEI/QQ mnémoniques. | ✅ |
| 2 | Fréquences & cumuls | Fréquences relatives, cumulées, classes, EFC mnémonique. | ✅ |
| 3 | Mesures de tendance centrale | Moyenne, médiane, mode, moyenne pondérée, MMM mnémonique. | ✅ |
| 4 | Mesures de dispersion | Étendue, variance, écart-type, CV, VÉR + König mnémoniques. | ✅ |
| 5 | Représentations graphiques | Barres, circulaire, histogramme, boîte à moustaches, BCHP mnémonique. | ✅ |
| 6 | Corrélation & régression | Nuage de points, coefficient r, droite Y=aX+b, tableaux croisés. | ✅ |

### 6. FBD — Fonctionnement des Bases de Données (6 chapitres) — 🔧 AutoBot
> ⚠️ **Changement de contenu** : Recentré sur les Bases de Données (plus pertinent B1) au lieu des automatismes.

| # | Titre | Contenu clé | Statut |
|---|-------|-------------|--------|
| 1 | Modèle relationnel | R.A.T.D., U.N.I., PK/FK, cardinalités, domaines, table de jonction. | ✅ |
| 2 | Algèbre relationnelle | S.P.R., U.I.D.P., σ/π/ρ, jointure, division, arbre algébrique. | ✅ |
| 3 | SQL Fondamentaux | D.M.C., S.F.W.O.L., C.R.U.D., CREATE/INSERT/SELECT/UPDATE/DELETE. | ✅ |
| 4 | SQL Avancé | I.L.R.F.C., C.S.A.M.M., JOINs, GROUP BY/HAVING, sous-requêtes. | ✅ |
| 5 | Normalisation | I.M.S., A.U.P., 1NF/2NF/3NF/BCNF, « La clé, toute la clé, rien que la clé ». | ✅ |
| 6 | Conception & Contraintes | E.A.R., E.R.D.U., A.C.L.P.N., passage E-R→Relationnel, 14 mnémoniques. | ✅ |

### 7. MERISE — ✅ EXISTANT (6 chapitres)
> Déjà créé et complet. Ne pas toucher.

---

## 🔧 FONCTIONNALITÉS PAR COURS (checklist)

Chaque cours B1 DOIT avoir :

| Fonctionnalité | Description |
|----------------|-------------|
| ✅ `index.html` | Page d'accueil du cours avec hero, chapitres, stats |
| ✅ `assets/css/style.css` | Feuille de style (glass-card dark, couleur accent) |
| ✅ `assets/js/main.js` | Navigation, sidebar, thème, scroll reveal |
| ✅ `assets/js/gamification.js` | XP, niveaux, badges, mascotte, notifications |
| ✅ `assets/js/exercises.js` | 18 exercices par chapitre (5 guidés + 10 quiz + 3 drag&drop) |
| ✅ `assets/js/download.js` | Téléchargement HTML du chapitre |
| ✅ `chapitres/chapitre*.html` | Cours détaillés avec analogies, mnémo, code, tableaux |
| ✅ `chapitres/formules.html` | Cheat Sheet (résumé complet du cours) |
| ✅ `chapitres/cartes.html` | Flashcards (recto/verso, filtre par chapitre) |
| ✅ `chapitres/simulateur-examen.html` | QCM examen (40 questions, timer, correction) |
| ✅ `exercices/exercices.html` | Exercices guidés pas à pas (16+ exercices) |
| ✅ Mnémotechniques | Au moins 1 par chapitre (acronyme + bullet list) |
| ✅ Analogies vie réelle | Chaque concept abstrait → analogie concrète |
| ✅ Responsive | Mobile-first, sidebar collapsible |

---

## 🏗️ PHASES D'IMPLÉMENTATION

### PHASE 0 : Infrastructure (backend + BDD + portail) �
| Tâche | Détail | Statut |
|-------|--------|--------|
| 0.1 | Migration BDD : ajouter colonne `class` (b1/b2) à `activation_keys` | ✅ |
| 0.2 | Mettre à jour les clés B2 existantes : `class = 'b2'` | ✅ |
| 0.3 | Créer structure b1/ avec server/, public/, scripts/ | ✅ |
| 0.4 | access-control.js B1 (7 cours B1) | ✅ |
| 0.5 | auth.js B1 (filtre class='b1', B2 accède B1 pas inverse) | ✅ |
| 0.6 | admin.js B1 (ne montre que class='b1') | ✅ |
| 0.7 | build.js B1 (copie cours B1 seulement) | ✅ |
| 0.8 | server.js B1 | ✅ |
| 0.9 | vercel.json B1 | ✅ |
| 0.10 | package.json B1 | ✅ |
| 0.11 | Portail b1/index.html (7 cartes, badge B1) | ✅ |
| 0.12 | Public auth pages B1 (activate.html, admin/) | ✅ |

### PHASE 1 : Algorithmique + Pascal (10 chapitres) �
| Tâche | Statut |
|-------|--------|
| 1.1 | Lire et extraire contenu des 4 PDFs Algo+Pascal+Boucles | ✅ |
| 1.2 | Créer algo/assets/ → **Mutualisé** dans b1/assets/ (CSS, JS: main, gamification, chapter-exercises, download, exercises) | ✅ |
| 1.3 | algo/index.html | ✅ |
| 1.4 | algo/chapitres/chapitre1-10.html (10 chapitres) | ✅ |
| 1.5 | algo/chapitres/formules.html (cheat sheet) | ✅ |
| 1.6 | algo/chapitres/cartes.html (flashcards) | ✅ |
| 1.7 | algo/chapitres/simulateur-examen.html | ✅ |
| 1.8 | algo/exercices/exercices.html | ✅ |
| 1.9 | Mnémotechniques (10, un par chapitre) | ✅ |
| 1.10 | Tests visuels | ✅ |

### PHASE 2 : C / C++ (8 chapitres) �
| Tâche | Statut |
|-------|--------|
| 2.1 | Lire et extraire contenu des 2 PDFs C + C++ | ✅ |
| 2.2 | c_cpp/assets/ → **Mutualisé** dans b1/assets/ | ✅ |
| 2.3 | c_cpp/index.html | ✅ |
| 2.4 | c_cpp/chapitres/chapitre1-8.html | ✅ |
| 2.5 | c_cpp/chapitres/formules+cartes+simulateur | ✅ |
| 2.6 | c_cpp/exercices/exercices.html | ✅ |
| 2.7 | Mnémotechniques (8+) | ✅ |

### PHASE 3 : Python (8 chapitres) �
| Tâche | Statut |
|-------|--------|
| 3.1 | Lire et extraire contenu des 2 PDFs Python | ✅ |
| 3.2 | python/assets/ → **Mutualisé** dans b1/assets/ | ✅ |
| 3.3 | python/index.html | ✅ |
| 3.4 | python/chapitres/chapitre1-8.html | ✅ |
| 3.5 | python/chapitres/formules+cartes+simulateur | ✅ |
| 3.6 | python/exercices/exercices.html | ✅ |
| 3.7 | Mnémotechniques (8+) | ✅ |

### PHASE 4 : Architecture des Réseaux (8 chapitres) �
| Tâche | Statut |
|-------|--------|
| 4.1 | Lire et extraire contenu des 2 PDFs Réseaux | ✅ |
| 4.2 | reseaux/assets/ → **Mutualisé** dans b1/assets/ | ✅ |
| 4.3 | reseaux/index.html | ✅ |
| 4.4 | reseaux/chapitres/chapitre1-8.html | ✅ |
| 4.5 | reseaux/chapitres/formules+cartes+simulateur | ✅ |
| 4.6 | reseaux/exercices/exercices.html | ✅ |
| 4.7 | Mnémotechniques (8+) | ✅ |

### PHASE 5 : Statistiques Descriptives (6 chapitres) �
| Tâche | Statut |
|-------|--------|
| 5.1 | Lire et extraire contenu du PDF Stats | ✅ |
| 5.2 | stats/assets/ → **Mutualisé** dans b1/assets/ | ✅ |
| 5.3 | stats/index.html | ✅ |
| 5.4 | stats/chapitres/chapitre1-6.html | ✅ |
| 5.5 | stats/chapitres/formules+cartes+simulateur | ✅ |
| 5.6 | stats/exercices/exercices.html | ✅ |
| 5.7 | Mnémotechniques (6+) | ✅ |

### PHASE 6 : FBD — Fonctionnement des Bases de Données (6 chapitres) 🟢
> ⚠️ Contenu recentré : Bases de Données (14 mnémoniques) au lieu d'Automatismes.

| Tâche | Statut |
|-------|--------|
| 6.1 | Lire et extraire contenu du PDF FBD | ✅ |
| 6.2 | fbd/assets/ → **Mutualisé** dans b1/assets/ | ✅ |
| 6.3 | fbd/index.html | ✅ |
| 6.4 | fbd/chapitres/chapitre1-6.html | ✅ |
| 6.5 | fbd/chapitres/formules+cartes+simulateur | ✅ |
| 6.6 | fbd/exercices/exercices.html | ✅ |
| 6.7 | Mnémotechniques (14 !) | ✅ |

### PHASE 7 : Modifications B2 (pour supporter B1) �
| Tâche | Statut |
|-------|--------|
| 7.1 | Modifier db.js B2 : migration colonne `class` | ✅ |
| 7.2 | Modifier admin.js B2 : filtre class='b2' | ✅ |
| 7.3 | Modifier auth.js B2 : scope B2, B2 accède B1 | ✅ |
| 7.4 | Modifier build.js B2 : exclure b1/ (par design — seuls les cours B2 listés sont copiés) | ✅ |
| 7.5 | Mettre à jour vercel.json B2 si nécessaire | ✅ |

---

## 📊 TABLEAU DE BORD — PROGRESSION

| Phase | Matière | Chapitres | Index | Extras | Status |
|-------|---------|-----------|-------|--------|--------|
| 0 | Infrastructure | — | — | Backend, BDD, Portail | � |
| 1 | Algorithmique | 10/10 | ✅ | 4/4 extras | 🟢 |
| 2 | C/C++ | 8/8 | ✅ | 4/4 extras | 🟢 |
| 3 | Python | 8/8 | ✅ | 4/4 extras | 🟢 |
| 4 | Réseaux | 8/8 | ✅ | 4/4 extras | 🟢 |
| 5 | Stats | 6/6 | ✅ | 4/4 extras | 🟢 |
| 6 | FBD (Bases de Données) | 6/6 | ✅ | 4/4 extras | 🟢 |
| 7 | Modifs B2 | — | — | 5/5 tâches | 🟢 |

**Légende** : 🔴 Non commencé | 🟡 En cours | 🟢 Terminé

---

## 🔑 NOTES TECHNIQUES

### Décisions d'architecture modifiées pendant l'implémentation

| Prévision plan | Réalité | Raison |
|---|---|---|
| Assets par cours (`algo/assets/`, `c_cpp/assets/`…) | **Assets mutualisés** dans `b1/assets/` (CSS+5 JS) | Élimination de la duplication, maintenance simplifiée |
| FBD = Automatismes/GRAFCET | **FBD = Bases de Données** (14 mnémoniques) | Plus pertinent pour B1 informatique, validé par l'utilisateur |
| Stats : ch.2=Graphiques, ch.5=Séries 2 var, ch.6=Indices | Réarrangé : ch.2=Fréquences, ch.5=Graphiques, ch.6=Corrélation | Progression pédagogique plus logique |
| `render.yaml` dans b1/ | Non créé (B1 cible Vercel uniquement) | Un seul hébergeur suffit |
| `b1/server/utils/keygen.js` | Non dupliqué (B1 utilise la BDD partagée via `server/db.js` du B2) | Éviter la duplication de code |
| `b1/rd-ai-chat.js` + `ai-chat.js` route | Non créés | À ajouter si fonctionnalité IA souhaitée pour B1 |
| `.env` dans b1/ | Non créé (fichier runtime, pas versionné) | Créé manuellement au déploiement |

### Fichiers créés — inventaire complet

| Dossier | Fichiers | Total |
|---------|----------|-------|
| `b1/` (racine) | index.html, package.json, server.js, vercel.json | 4 |
| `b1/server/` | app.js, middleware/access-control.js, routes/auth.js, routes/admin.js | 4 |
| `b1/public/` | activate.html, admin/, css/, js/ | ~6 |
| `b1/scripts/` | build.js | 1 |
| `b1/api/` | index.js | 1 |
| `b1/assets/` | css/style.css, js/main.js, js/gamification.js, js/chapter-exercises.js, js/download.js, js/exercises.js | 6 |
| `b1/algo/` | index.html + 10 chapitres + formules + cartes + simulateur + exercices | 14 |
| `b1/c_cpp/` | index.html + 8 chapitres + formules + cartes + simulateur + exercices | 12 |
| `b1/python/` | index.html + 8 chapitres + formules + cartes + simulateur + exercices | 12 |
| `b1/reseaux/` | index.html + 8 chapitres + formules + cartes + simulateur + exercices | 12 |
| `b1/stats/` | index.html + 6 chapitres + formules + cartes + simulateur + exercices | 10 |
| `b1/fbd/` | index.html + 6 chapitres + formules + cartes + simulateur + exercices | 10 |
| `b1/merise/` | Existant (inchangé) | ~11 |
| **TOTAL** | | **~103 fichiers** |

### Séparation des clés B1/B2
```sql
-- Migration BDD
ALTER TABLE activation_keys ADD COLUMN class VARCHAR(10) DEFAULT 'b2';
UPDATE activation_keys SET class = 'b2'; -- Toutes les clés existantes = B2

-- Nouvelle clé B1
INSERT INTO activation_keys (key_code, scope, class) VALUES ('XXXX-XXXX', 'all', 'b1');
```

### Logique d'accès
- Clé `class='b1'` → accède UNIQUEMENT aux cours sous `/b1/*`
- Clé `class='b2'` → accède aux cours B2 ET aux cours B1 (cross-access)
- L'admin B1 ne génère/voit que les clés `class='b1'`
- L'admin B2 ne génère/voit que les clés `class='b2'`

### Template de base pour chaque cours
Chaque cours suit exactement le pattern du C# :
- `style.css` : même structure, couleur `--accent` personnalisée
- `main.js` : navigation, sidebar, thème, scroll reveal
- `gamification.js` : XP, badges, mascotte, tips
- `exercises.js` : 18 exercices × N chapitres (guidés + quiz + drag)
- `download.js` : export HTML du chapitre
- Chaque chapitre : glass-card sections, code blocks, info-box, success-box, danger-box, mnémo

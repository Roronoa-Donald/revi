# 20 — Dépendances entre pages

> Trois familles de dépendances : **navigation** (liens), **données** (APIs, localStorage), **assets** (CSS/JS partagés, Monaco, sql.js).

## 1. Graphe de navigation

```
index.html
 ├─ <cours>/sommaire.html (×70)
 │   ├─ <cours>/index.html
 │   ├─ chapitres/chapitre1..N.html
 │   ├─ chapitres/cartes.html
 │   ├─ chapitres/formules.html
 │   ├─ chapitres/simulateur-examen.html
 │   ├─ exercices/exercices.html
 │   └─ atelier.html
 ├─ epreuves/index.html ──────────────► (PDF, protégés)
 ├─ preparation-web/index.html
 │   ├─ preparation-cheatsheet.html
 │   ├─ preparation-progression.html
 │   └─ preparation-classement.html
 ├─ /_auth/account.html
 │   ├─ /_auth/login.html
 │   └─ <cours>/index.html (sélecteur)
 └─ 404.html
/_auth/login.html ──► compte (succès) / reset (lien email)
/_auth/admin/login.html ──► /_auth/admin/dashboard.html ──► /
```

## 2. Dépendances de page à page (détail)

| Page | Dépend de | Type |
|---|---|---|
| Portail | `/api/verify`, `/api/courses` (indirect) | données |
| Portail | `assets/css/portal.css`, `tokens.css`, `components.css`, `rd-ai-chat.js` | assets |
| Sommaire | registre du cours, `assets/css/course.css` | contenu |
| Chapitre | `code-lab.js`, `code-lab.css`, Monaco, `assets/js/cours.js` | assets + données |
| Chapitre | `/api/execute`, `/api/exercise/submit`, `/api/code-help` | données |
| Cartes / mémo | `cours.js` (retournement), localStorage | données locales |
| Examen | `cours.js` (chronomètre, QCM) | local |
| Atelier de cours | `code-lab.js`, Monaco | assets |
| Login | `/api/login`, `/api/register`, `/api/forgot-password`, `/api/reset-password`, `/api/verify` | données |
| Compte | `/api/verify`, `/api/me`, `/api/courses`, `/api/fedapay/config`, `/api/fedapay/attempt`, `/api/fedapay/callback` | données |
| Compte | `checkout.js` (FedaPay), `account.js` | assets externes |
| Admin login | `/api/admin/login`, `/api/admin/verify` | données |
| Admin dashboard | 20+ routes `/api/admin/*` | données |
| Preparation | `/api/preparation/status`, `/unlock`, `/project`, `/validate`, `/solution`, `/quiz`, `/progress`, `/assistant` | données |
| Annales | aucune API ; `epreuves.css`, `cours.js` | local |
| 404 | aucun | — |

## 3. APIs par page

| API | Pages consommatrices |
|---|---|
| `POST /api/login` | login |
| `POST /api/register` | login (inscription) |
| `POST /api/logout` | compte |
| `GET /api/verify` | portail, login, compte, pages de cours (injecté) |
| `GET /api/me` | compte |
| `GET /api/courses` | compte |
| `POST /api/forgot-password` | login |
| `POST /api/reset-password` | login |
| `POST /api/execute` | chapitres, ateliers, annales |
| `GET /api/execute/languages` | code lab |
| `POST /api/exercise/submit` | chapitres, ateliers, annales |
| `POST /api/code-help` | code lab |
| `POST /api/ai-chat` | widget RD-AI (toutes pages équipées) |
| `GET /api/fedapay/config` | compte |
| `POST /api/fedapay/attempt` | compte |
| `POST /api/fedapay/callback` | retour de paiement |
| `/api/preparation/*` | Preparation |
| `/api/admin/*` | console admin |
| `/api/qcm/*` | **aucune page** |
| `/api/activate` | **aucune page** (410) |

## 4. Dépendances d'assets (partage)

| Asset | Pages |
|---|---|
| `tokens.css` | toutes |
| `components.css` | toutes |
| `ui-icons.svg` | toutes |
| `rd-ai-chat.js` | pages équipées du widget |
| `code-lab.js` + `code-lab.css` | 1 326 blocs de lab |
| `monaco/` | tout lab avec éditeur |
| `sqljs/` | simulateur SQL de `b1-sql` |
| `cours.js` | chapitres, cartes, mémo, examen |
| `auth-check.js` | pages publiques |

**Effet de bord important** : si `code-lab.js` échoue, tous les labs de la page restent en « Préparation de l'éditeur… » ; aucune page ne prévoit de repli statique.

## 5. Dépendances de données locales

| Clé (ou clé dérivée) | Écrit par | Lu par |
|---|---|---|
| Progression de cours (par cours) | chapitres, cartes | portail (carte Reprendre), sommaire |
| Chapitre maîtrisé | chapitre | sommaire |
| Niveau sélectionné (`portal_selected_level`) | portail | portail |
| Thème (`theme`) | toutes | toutes |
| Brouillon de code (par cours + exercice) | code lab | code lab |
| Messages du chat | widget | widget |
| Session d'examen | simulateur | simulateur |

Aucune synchronisation serveur : vider le stockage local efface la progression visible.

## 6. Dépendances externes

| Service | Rôle | Panne visible |
|---|---|---|
| PostgreSQL | comptes, sessions, clés, journal | 500, login impossible |
| Piston | exécution prioritaire | bascule Oanor |
| Oanor | exécution de secours | 503 exécution |
| OpenRouter / NVIDIA / Ollama | chat et tuteur | 503, messages d'erreur |
| FedaPay | paiement | bouton désactivé ou échec |
| Fournisseur email | reset de mot de passe | message générique, pas d'email |
| Google Fonts | **non utilisé** | — |

## 7. Couplages fragiles

1. **Chapitre → catalogue d'exercices** : identifiants `data-exercise` doivent correspondre au registre serveur, sinon validation impossible.
2. **Cours → configuration** (`course-config.js`) : un cours mal déclaré casse la génération.
3. **Portail → registre** : 70 cartes en dur dans le HTML, à resynchroniser avec `COURSES` (`sync-courses.js`).
4. **Login → niveau** : les compteurs cumulatifs divergent du portail.
5. **Compte → FedaPay** : deux versions de la page, une seule fonctionne.
6. **Build → dossiers** : `epreuves/` et `roadmap/` ne suivent pas les mêmes règles que le registre.
7. **Preparation → trois pages annexes** : cheatsheet, progression et classement doivent exister à la racine ; leur absence rendrait la topbar de l'atelier cassée.

## 8. Ordre de reconstruction conseillé

1. Tokens + icônes + composants de base.
2. Portail (dépend de peu).
3. Sommaire + chapitre 1 (public).
4. Login / compte.
5. Chapitre protégé (même gabarit).
6. Code lab (composant le plus complexe).
7. Cartes / mémo / examen.
8. Atelier de cours.
9. Annales.
10. Admin.
11. Preparation Web (application dans l'application).
12. États d'erreur et de verrouillage.

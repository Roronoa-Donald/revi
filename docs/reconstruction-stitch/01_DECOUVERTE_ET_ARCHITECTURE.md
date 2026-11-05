# 01 — Découverte et architecture complète

> Tout ce qui suit est déduit du dépôt lui-même. Aucune information externe n'a été utilisée.

## 1. Identité du produit

| Élément découvert | Valeur | Preuve |
|---|---|---|
| Nom affiché | **cours.interactifs** (pied de page : « © 2025-2026 Cours Interactifs — RD4SLOQ ») | `index.html` |
| Nom de code du dépôt | `cours-interactif-server`, domaine historique `revi-mu.vercel.app` | `package.json`, `vercel.json`, balise canonical |
| Domaine d'activité | Formation informatique : Licence 1, 2, 3 (B1/B2/B3) + atelier web + annales | `index.html`, `server/courses.js` |
| Public | Étudiants francophones en informatique, établissement unique (contenus nommés INF-1002, Bachelor 2, etc.) | pages de cours, `epreuves/index.html` |
| Langue | Français, vouvoiement systématique dans les cours | toutes les pages |
| Promesse affichée | « 68 cours interactifs d'informatique (+ Atelier Web & Annales) », chapitre 1 gratuit | `index.html` hero |
| Modèle économique | Compte gratuit + abonnement payant (FedaPay, Mobile Money / carte) pour le contenu au-delà du chapitre 1 | `public/account.html`, `server/routes/fedapay.js` |
| Identité visuelle | Thème « Latte » (papier chaud `#faf7f2`), JetBrains Mono partout, CTA vert à ombre dure, accent bleu periwinkle | `DESIGN.md`, `assets/css/tokens.css` |

**Ce que le produit n'est pas** : pas un réseau social, pas un forum, pas un éditeur de cours pour enseignants, pas de messagerie interne. Le seul dialogue est un assistant IA en lecture (chat RD-AI et tuteur de code).

## 2. Inventaire du produit

Le registre canonique est `server/courses.js` : **71 entrées**, dont une archivée (`b1-vb-excel`).

| Niveau | Cours au registre | Cartes au portail | Remarque |
|---|---|---|---|
| B1 — Licence 1 | 24 | 23 | `b1-vb-excel` archivé, sans carte |
| B2 — Licence 2 | 24 | 24 | dont `preparation-web` (Atelier) et `epreuves` (Annales) |
| B3 — Licence 3 | 23 | 23 | |
| **Total** | **71** | **70** | |

Chaque cours est un dossier racine servi directement. Un cours « standard » contient :

```
<course>/
  index.html                  page d'accueil du cours
  sommaire.html               programme + ressources
  atelier.html                bac à sable de code
  chapitres/
    chapitre1.html … chapitreN.html
    cartes.html               flashcards
    formules.html             mémo
    simulateur-examen.html    examen blanc chronométré
  exercices/exercices.html    exercices supplémentaires / projet
  assets/css/cours.css        identité visuelle du cours
  assets/js/cours.js          interactions pédagogiques
```

Variantes observées : `b1-php` et `b1-c-cpp` comptent 15 pages HTML (chapitres supplémentaires), `droit` 18, `sql` 32 (dossier plus riche), `b1-vb-excel` une seule page. Les cours sans code lab (`b1-sql`) embarquent un simulateur SQL client (sql.js).

## 3. Stack technique

| Couche | Technologie | Preuve |
|---|---|---|
| Pages | HTML statique généré ou écrit à la main, CSS et JavaScript vanilla (aucun framework front) | 1 067 fichiers HTML, `assets/js` |
| Serveur HTTP | Node 22 + Fastify 4 | `package.json`, `server/app.js` |
| Base de données | PostgreSQL (`pg`), schéma créé au démarrage | `server/db.js` |
| Auth | JWT en cookie HTTP-only (`auth_token`), sessions en base, `admin_token`, `preparation_token` | `server/routes/auth.js`, `server/routes/admin.js`, `server/routes/preparation.js` |
| Paiement | FedaPay (widget JS `checkout.js` + API serveur, webhook HMAC) | `server/routes/fedapay.js`, `public/account.html` |
| Exécution de code | Piston (primaire) ou Oanor (secours), derrière `/api/execute` | `server/services/execution/`, `server/routes/execute.js` |
| Assistant IA | OpenRouter / NVIDIA NIM / Ollama / endpoint custom, pool de clés | `server/services/ai-pool.js`, `server/routes/ai-chat.js` |
| Éditeur de code | Monaco Editor **vendoré** (`assets/vendor/monaco/`, 13 Mo) | AGENTS.md, `assets/js/code-lab.js` |
| SQL navigateur | sql.js / WebAssembly vendoré | `b1-sql/assets/vendor/sqljs/` |
| Atelier Web | CodeMirror 5 chargé depuis cdnjs | `preparation-web/index.html` |
| Maths | KaTeX rendu côté génération (classes `.katex-display`) | `DESIGN.md`, pages de cours |
| Build | `scripts/build.js` → `dist/`, injection des scripts d'auth | `package.json`, `vercel.json` |

## 4. Deux modes de service

### Mode Node (local et Render)

`server.js` fait trois choses : il monte l'app Fastify (`server/app.js`), il sert les fichiers statiques avec contrôle d'accès, il injecte dans chaque HTML servi :

```html
<link rel="stylesheet" href="/_auth/css/auth-styles.css">
<script src="/_auth/js/fingerprint.js"></script>
<script src="/_auth/js/auth-check.js"></script>
<script src="/assets/js/delight.js" defer></script>
```

Règles de service observées :

- `/` → `index.html` ; une URL terminée par `/` → `index.html` ; un dossier existant sans slash → redirection 307 vers `dossier/`.
- `/_auth/*` est lu depuis `public/` (et non depuis le dossier racine `_auth/`).
- Chemins bloqués : `/server/`, `/node_modules/`, `/public/`, `/.env`, `/.git/`, `/scripts/`, `/dist/`, `/b1/`, `/verification/`, `/corrections/`, `/tests/`, `/audit/`, `/.taskstate/`.
- Fichiers racine servis uniquement s'ils figurent dans une allowlist stricte : `index.html`, `rd-ai-chat.js`, `preparation-cheatsheet.html`, `preparation-progression.html`, `preparation-classement.html`, `robots.txt`, `sitemap.xml`, `404.html`.
- Les autres fichiers racine (`clarisse.html`, `my_perso.html`, `index-light-preview.html`, `test-light.html`) existent mais renvoient 404.

### Mode Vercel

- `api/index.js` expose l'app Fastify en fonction serverless.
- `middleware.js` (edge) refait le contrôle d'accès **avant** le statique, avec les mêmes règles de protection et des redirections 307 vers login / compte / portail.
- `vercel.json` réécrit `/api/*` vers `api/index.js`, inclut `server/**` et applique des en-têtes de sécurité.
- `dist/` est généré par `npm run build`; `epreuves/` **n'est pas** dans les dossiers du build, donc absent de la version statique Vercel.

## 5. Modèle de session et d'accès

```
Inscription / connexion
  POST /api/register | /api/login
  → vérifie email + mot de passe (scrypt/argon? voir server/utils/password.js)
  → limite à 3 sessions valides par utilisateur (les plus anciennes sont révoquées)
  → crée une session (jti) en base, pose le cookie auth_token (30 jours, httpOnly, SameSite=Lax)
```

- Un compte désactivé (`is_active = false`) ne peut pas se connecter (403) et ses sessions sont invalidées.
- L'abonnement est un champ du compte (`subscription_status`, `subscription_expires_at`) ; `hasActiveSubscription()` décide du scope `all`.
- Les niveaux sont **hiérarchiques** : B1 ⊂ B2 ⊂ B3. Un compte B3 accède aux cours B1, B2 et B3 ; un compte B1 ne voit pas les cours supérieurs autrement qu'en « verrouillé » dans le sélecteur.
- L'admin est un **cookie séparé** (`admin_token`, 8 h), indépendant des comptes apprenants.

### Gratuité observée

| Contenu | Accès |
|---|---|
| Portail, 404, pages d'accueil des cours, sommaires | Libre |
| `chapitre1.html` de chaque cours (y compris `chapitres/chapitre1.html`) | Libre |
| Chapitres 2+, ateliers, cartes, mémo, examens, exercices, PDF | Compte + niveau + abonnement |
| `epreuves/` (index compris) | Compte + niveau + abonnement |
| `preparation-web/` (hors `assets/`) | Compte B2+ + abonnement + mot de passe de section |
| Données QCM (`.js`/`.json` contenant « qcm »), PDF sous `assets/` | Protégés |

## 6. Cartographie du dépôt

```
/
├─ index.html               Portail : 70 cartes, filtres B1/B2/B3, recherche, reprise
├─ 404.html                 Page d'erreur
├─ preparation-cheatsheet.html / -progression.html / -classement.html
├─ public/                  Sources réellement servies sous /_auth/
│   ├─ login.html           Connexion / inscription / mot de passe (4 vues)
│   ├─ account.html         Compte, abonnement, sélecteur de cours
│   ├─ admin/login.html     Connexion admin
│   ├─ admin/dashboard.html Console d'administration (5 onglets)
│   ├─ css/, js/            Styles et fingerprint/auth-check
├─ _auth/                   Miroir racine non servi (divergent, voir 19)
├─ assets/
│   ├─ css/                 tokens, base, components, portal, course, code-lab, sommaire, icons, lucide
│   ├─ js/                  theme, progress, delight, code-lab, execution-router
│   ├─ fonts/               4 WOFF2 JetBrains Mono
│   ├─ img/                 ui-icons.svg (85 icônes), favicon.svg
│   └─ vendor/monaco/       Éditeur vendoré
├─ <68 dossiers de cours>/  Voir registre
├─ preparation-web/         Atelier HTML/JS (1 page + assets + données quiz)
├─ epreuves/                Annales (index + PDF)
├─ server/                  Fastify, routes, db, services, exercices, contenu
├─ scripts/                 Générateurs de cours et de labs, build, sync, smoke tests
├─ tests/                   Tests Node
├─ docs/reconstruction-stitch/  Le présent dossier
└─ hors produit             b1/, cours windows/, administration machine virtuel/, droitb2/,
                            roadmap/, old_exam/, design-bundle/, archives ZIP et dossiers d'audit
```

## 7. Pipeline de contenu

- **Cours générés** : `server/content/<cours>.js` (+ dossier) → `scripts/generate-courses.js` via `scripts/course-kit.js` → pages HTML + `cours.css`/`cours.js`. Ne jamais éditer à la main.
- **Cours écrits à la main** : `b1-python/`, `b1-c-cpp/`, `b1-algo/`, `b1-php/`.
- **Exercices** : catalogue `server/exercises/*.js`, projection client par `toClient()` (jamais de tests ni de solutions dans le navigateur), laboratoires injectés dans les chapitres entre les marqueurs `<!-- code-labs:start -->` et `<!-- code-labs:end -->`.
- **QCM** : dans le contenu du cours pour l'entraînement, rendu par `assets/js/cours.js`; un service `/api/qcm` existe pour un mode sécurisé, mais les pages statiques utilisent la correction locale.
- **Preparation Web** : 12 projets dans `preparation-web/assets/js/projects.js`, validation par règles dans `server/preparation-content.js`.

## 8. Stockage des données côté client

| Clé | Contenu | Utilisée par |
|---|---|---|
| `theme` (géré par `theme.js`) | `light` / `dark` | toutes les pages |
| `cours-progress-v1` | progression par cours, chapitre, exercice, dernière activité | `assets/js/progress.js`, carte « Reprendre » |
| clé propre au cours (`__STORE__`) | chapitres vus / maîtrisés | `assets/js/cours.js` |
| `portal_selected_level` | dernier filtre B1/B2/B3/Tous | portail |
| brouillons de code par exercice et par cours | code de l'éditeur | `assets/js/code-lab.js` |
| progression Preparation Web | via API + `localStorage` avec clé dérivée du compte | `preparation-web/assets/js/app.js` |

## 9. Points d'architecture qui ont un impact visuel

1. **Trois portes d'entrée** : portail gratuit, page de cours libre (chapitre 1), page de connexion. Toute tentative d'accès protégé renvoie vers `/_auth/login.html?redirect=…`.
2. **Deux redirections de refus** distinctes : niveau insuffisant (`account.html?level=denied`) et abonnement manquant (`account.html?payment=required`). Elles produisent deux messages différents sur la page compte.
3. **Le sélecteur de cours** de la page compte affiche les trois niveaux, y compris ceux auxquels le compte n'a pas droit, avec cadenas et opacité réduite : c'est un choix UX explicite (« montrer ce qui existe au-dessus »).
4. **L'atelier est une seconde porte** derrière l'abonnement : un compte abonné mais sans mot de passe de section est renvoyé au portail avec `?preparation=locked` et voit un bandeau refermable.
5. **Le code lab est le seul composant qui appelle un service externe payant** ; il n'exécute jamais à la frappe, seulement au clic (ou Ctrl+Entrée), pour préserver le quota partagé.

## 10. Zones non vérifiables sans runtime

- Contenu exact des messages d'erreur PostgreSQL et comportement en cas de base indisponible.
- Rendu réel de FedaPay (widget externe, iframe/redirection), au-delà du bouton et du retour `?payment=return`.
- Qualité des réponses de l'assistant IA et du tuteur (dépend du fournisseur).
- Différences de rendu entre Node et Vercel pour les pages protégées (le middleware edge applique les mêmes règles, mais le build `dist/` exclut `epreuves/`).
- Comportement des sessions d'examen `/api/qcm/*` : stockage en mémoire, non consommé par les pages statiques.

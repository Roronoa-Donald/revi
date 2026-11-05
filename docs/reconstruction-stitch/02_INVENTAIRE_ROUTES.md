# 02 — Inventaire exhaustif des routes

> Sources : `server.js`, `middleware.js`, `server/app.js`, `server/routes/*.js`, `vercel.json`.
> Les routes de pages sont des motifs ; les 1 067 URLs concrètes sont dans `evidence/pages.csv`.

## 1. Routes de pages (motifs)

| Motif d'URL | Page | Rendu | Accès | Statut |
|---|---|---|---|---|
| `/` | Portail | statique | libre | servi |
| `/index.html` | Portail | statique | libre | servi |
| `/404.html` | Erreur 404 | statique | libre | servi |
| `/robots.txt`, `/sitemap.xml` | SEO | statique | libre | servi |
| `/preparation-cheatsheet.html` | Mémo atelier | statique | libre | servi |
| `/preparation-progression.html` | Progression atelier | statique | libre | servi |
| `/preparation-classement.html` | Classement atelier | statique | libre | servi |
| `/_auth/login.html` | Connexion / inscription / mot de passe | `public/login.html` | libre | servi |
| `/_auth/account.html` | Compte, abonnement, sélecteur de cours | `public/account.html` | libre (contenu conditionnel) | servi |
| `/_auth/admin/login.html` | Connexion admin | `public/admin/login.html` | libre | servi |
| `/_auth/admin/dashboard.html` | Console admin | `public/admin/dashboard.html` | cookie `admin_token` sinon redirection login | servi |
| `/<cours>/index.html` | Accueil du cours | statique/généré | libre | servi |
| `/<cours>/sommaire.html` | Programme | statique/généré | libre | servi |
| `/<cours>/atelier.html` | Bac à sable | statique/généré | protégé (compte + niveau + abonnement) | servi |
| `/<cours>/chapitres/chapitre1.html` | Chapitre 1 | statique/généré | **libre** | servi |
| `/<cours>/chapitres/chapitreN.html` (N ≥ 2) | Chapitre N | statique/généré | protégé | servi |
| `/<cours>/chapitres/cartes.html` | Flashcards | statique/généré | protégé | servi |
| `/<cours>/chapitres/formules.html` | Mémo | statique/généré | protégé | servi |
| `/<cours>/chapitres/simulateur-examen.html` | Examen blanc | statique/généré | protégé | servi |
| `/<cours>/exercices/exercices.html` | Exercices | statique/généré | protégé | servi |
| `/preparation-web/index.html` | Atelier HTML/JS | statique + JS | B2 + abonnement + mot de passe de section | servi |
| `/epreuves/index.html` | Annales | statique | compte + niveau + abonnement (index compris) | servi |
| `/epreuves/*.pdf` | Sujets PDF | statique | protégé | servi |
| `/clarisse.html`, `/my_perso.html`, `/index-light-preview.html`, `/test-light.html` | Pages de travail | statique | **404** (allowlist) | non servi |
| `/b1/...` | Ancien cours | statique | **403** | bloqué |
| `/verification/...`, `/corrections/...`, `/tests/...`, `/audit/...` | Outils | statique | **403** | bloqué |
| `/<dossier-hors-registre>/...` | Archives locales | statique | accessible en local/Render seulement, absent de `dist/` | hors produit |
| `/dossier` (sans slash) | — | redirection 307 vers `/dossier/` | — | servi |

## 2. Redirections et portes d'accès

| Déclencheur | Cible | Code | Conséquence UI |
|---|---|---|---|
| Contenu protégé, non connecté | `/_auth/login.html?redirect=<url>` | 302 (Node) / 307 (edge) | Formulaire de connexion, puis retour à l'URL demandée |
| Compte connecté, niveau insuffisant | `/_auth/account.html?level=denied&redirect=<url>` | 307 | Page compte + message de refus (variable `level`) |
| Compte connecté, sans abonnement | `/_auth/account.html?payment=required&redirect=<url>` | 307 | Page compte + message d'abonnement requis |
| `preparation-web` sans mot de passe de section | `/index.html?preparation=locked` | 307 | Bandeau « L'atelier est protégé » refermable |
| Dashboard admin sans cookie valide | `/_auth/admin/login.html` | 307 | Formulaire admin |
| API admin sans cookie valide | JSON 401 `{success:false,message:"Non autorisé"}` | 401 | Redirection JS vers login admin |
| Dossier existant sans slash final | `/dossier/` | 307 | — |

## 3. API — routes publiques ou semi-publiques

Préfixe `/api`, enregistré par `server/app.js`.

| Méthode | Chemin | Auth | Rôle | Écran consommateur |
|---|---|---|---|---|
| GET | `/api/course-info?course=` | aucune | nom, icône, thème d'un cours | bartitle/meta dynamiques |
| POST | `/api/register` | aucune (rate-limit 5/min/IP) | création de compte + session | `login.html` vue inscription |
| POST | `/api/login` | aucune (10/min/IP) | connexion + session | `login.html` vue connexion |
| GET | `/api/verify` | cookie | état de session, niveau, scope, abonnement | portail, login, compte, pages |
| GET | `/api/me` | cookie (401 sinon) | compte, appareil, abonnement | `account.html` |
| GET | `/api/courses` | cookie ou `?level=` | catalogue par niveau, verrous | sélecteur `account.html` |
| POST | `/api/logout` | cookie | révoque la session, efface le cookie | bouton « Se déconnecter » |
| POST | `/api/forgot-password` | aucune (3/min) | envoi d'un lien de réinitialisation (réponse générique) | `login.html` vue mot de passe oublié |
| POST | `/api/reset-password` | token (5/min) | changement de mot de passe | `login.html?reset=…` |
| POST | `/api/activate` | — | **410 Gone** : les clés d'activation ne sont plus utilisées | aucun (compat) |
| POST | `/api/verify-fingerprint` | — | renvoie toujours `{valid:true}` | aucun (vestige) |

## 4. API — exécution et exercices

| Méthode | Chemin | Auth | Rôle |
|---|---|---|---|
| GET | `/api/execute/languages` | aucune | langages exécutables disponibles |
| POST | `/api/execute` | cookie recommandé | exécute un programme, renvoie stdout/stderr/exitCode/provider/quota |
| POST | `/api/exercise/submit` | cookie | exécute les tests cachés d'un exercice, renvoie un rapport passé/total |
| POST | `/api/code-help` | cookie | tuteur IA : explications uniquement, jamais de code |

Consommateurs : `assets/js/code-lab.js` (lignes 228, 1236, 1391, 1572), `assets/js/execution-router.js`.

## 5. API — QCM sécurisé

Préfixe `/api/qcm`. **Non appelée par les pages statiques** : le QCM rendu est corrigé localement par `assets/js/cours.js`. Ces routes existent pour un mode examen sécurisé et sont couvertes par `tests/qcm-security.test.js`.

| Méthode | Chemin | Rôle |
|---|---|---|
| POST | `/api/qcm/session/start`, `/api/qcm/exam/start` | ouvre une session d'examen (5 min à 4 h, défaut 60) |
| POST | `/api/qcm/verify`, `/api/qcm/practice/verify` | vérifie une réponse ; refus 403 sur un chapitre d'examen ou pendant une session active |
| POST | `/api/qcm/submit`, `/api/qcm/exam/submit` | soumet les réponses, score, `passed` ≥ 70 % |
| GET | `/api/qcm/session/:id`, `/api/qcm/exam/session/:id` | état, secondes restantes |
| GET | `/api/qcm/exam/review/:id` | correction après clôture définitive uniquement |

## 6. API — Preparation Web

Préfixe `/api/preparation`. Désactivée si `PREPARATION_PASSWORD` est absent (503).

| Méthode | Chemin | Auth | Rôle |
|---|---|---|---|
| GET | `/status` | cookie (réponse non bloquante) | `enabled`, `authenticated`, `unlocked`, `profile` |
| GET | `/config` | cookie | nombre de projets, barème XP |
| POST | `/login` | compte abonné | vérifie le mot de passe de section, pose `preparation_token` (365 j) |
| GET | `/progress` | compte + prep | profil, progression, classement |
| POST | `/progress` | idem | sauvegarde code et état d'un projet |
| POST | `/validate` | idem | valide un projet par règles, renvoie XP et erreurs (422) |
| POST | `/solution` | idem, ≥ 2 échecs | renvoie la solution (403 avant 2 échecs) |
| POST | `/quiz` | idem, projet validé | enregistre le score du quiz, XP (max 20) |
| GET | `/leaderboard` | idem | classement (20 par défaut) |

## 7. API — Administration

Préfixe `/api/admin`. Toutes les routes exigent `admin_token` sauf `POST /api/admin/login` et `GET /api/admin/courses`.

| Méthode | Chemin | Rôle |
|---|---|---|
| POST | `/login` | connexion admin (5/min/IP), cookie 8 h |
| POST | `/logout` | efface le cookie admin |
| GET | `/verify` | 200 si admin, sinon 401 |
| GET | `/courses` | registre des cours (public) |
| GET | `/stats` | 7 compteurs (comptes, abonnés, désactivés, sessions, expirations 7 j, revenus, paiements) |
| GET | `/users?filter=&search=` | liste filtrée et recherchée |
| POST | `/users` | création manuelle (email, mot de passe, nom, mois) |
| POST | `/users/:id/subscribe` | prolonge de 1 à 36 mois |
| POST | `/users/:id/unsubscribe` | retire l'abonnement et invalide les sessions |
| POST | `/users/:id/reset-sessions` | invalide toutes les sessions (déverrouille l'appareil) |
| POST | `/users/:id/toggle-active` | active/désactive le compte |
| DELETE | `/users/:id` | supprime définitivement |
| GET | `/sessions` | 500 dernières sessions avec email |
| POST | `/sessions/:id/revoke` | révoque une session |
| GET | `/payments` | 200 derniers paiements |
| GET | `/logs?limit=&offset=&type=` | journal d'activité paginé |
| GET/POST | `/ai/config` | lit / écrit fournisseur et modèles |
| GET/POST | `/ai/keys` | liste / ajoute une clé au pool |
| DELETE | `/ai/keys/:id` | supprime une clé |
| POST | `/ai/keys/:id/toggle` | active/désactive une clé |
| POST | `/ai/fetch-models` | liste les modèles du fournisseur |
| POST | `/ai/test-key` | teste la connectivité et la latence |

## 8. API — Paiement FedaPay

| Méthode | Chemin | Auth | Rôle |
|---|---|---|---|
| GET | `/api/fedapay/config` | aucune | `enabled`, clé publique, environnement, montants |
| POST | `/api/fedapay/attempt` | cookie | prépare une transaction (montant décidé serveur) |
| POST | `/api/fedapay/callback` | cookie | vérifie une transaction après retour navigateur |
| POST | `/api/fedapay/webhook` (+ alias) | signature HMAC | événement serveur-à-serveur idempotent |
| POST | `/api/fedapay/recover` | cookie | récupération manuelle d'un paiement approuvé |
| GET | `/api/fedapay/check-status` | cookie | état d'un paiement |
| GET | `/dashboard/abonnement/config` (+ alias) | aucune | alias de config |
| POST | `/dashboard/abonnement/attempt`, `/callback`, `/recover` | cookie | alias |
| POST | `/webhooks/fedapay`, `/api/payments/fedapay/webhook` | HMAC | alias webhook |
| GET | `/config`, `/attempt`, `/callback`, `/recover`, `/check-status` (sans préfixe) | selon | variantes montées par le routeur |

> **Incohérence confirmée** : `public/account.html` appelle `POST /api/fedapay/checkout`, route **absente** de `server/routes/fedapay.js`. Voir [19](19_FONCTIONNALITES_INCOMPLETES.md).

## 9. Sécurité et limites visibles dans l'UI

| Mécanisme | Valeur | Effet visible |
|---|---|---|
| Rate limit global | 100 req/min/IP | 429 générique |
| Inscription | 5/min/IP | message d'erreur inline |
| Connexion | 10/min/IP | message d'erreur inline |
| Mot de passe oublié | 3/min/IP | réponse générique |
| Reset | 5/min/IP | message « lien invalide ou expiré » |
| Admin login | 5/min/IP | « Identifiants incorrects » |
| Preparation login | 6/min/IP | « Mot de passe incorrect » |
| Sessions utilisateur | 3 simultanées | les plus anciennes sont révoquées silencieusement |
| Cookie utilisateur | 30 jours | expiration → retour login |
| Cookie admin | 8 heures | expiration → redirection login admin |
| Cookie preparation | 365 jours, lié à la version du mot de passe | changement de mot de passe → atelier reverrouillé |
| Corps de requête | 1 Mo max | 413 |
| CSP | `default-src 'self'`, scripts inline et eval autorisés, images https, frames FedaPay | pas visible, sauf blocages éventuels |

## 10. Routes non trouvées / non implémentées

- `/api/fedapay/checkout` : appelée par `_auth/account.html` (miroir obsolète), absente du routeur ; `public/account.html` utilise le widget FedaPay et `/api/fedapay/attempt` + `/callback`.
- Aucune route de suppression de compte côté apprenant, aucune route de changement de niveau, aucune route de profil éditable.
- Aucune route de recherche globale : la recherche du portail est purement côté client sur les 70 cartes.

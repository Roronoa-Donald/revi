# 11 — États conditionnels selon les rôles, permissions et données

> Les règles ci-dessous sont **confirmées par le code** (`server.js`, `middleware.js`, `server/routes/*`). Les effets visuels sont observés dans le HTML/JS des pages.

## 1. Les cinq rôles réels

| Rôle | Définition technique | Ce qu'il voit |
|---|---|---|
| **Anonyme** | pas de cookie `auth_token` | portail, index de cours, sommaires, chapitre 1, login, 404 |
| **Compte gratuit B1** | `level=b1`, `subscribed=false` | tout ce qui précède + chapitre 1 de tous les cours + sélecteur B1 |
| **Compte gratuit B2/B3** | `level=b2|b3`, `subscribed=false` | mêmes pages libres, mais sélecteur plus large (cours verrouillés) |
| **Abonné** | `subscribed=true` | contenu protégé de son niveau et inférieur |
| **Administrateur** | cookie `admin_token` | console admin uniquement (pas de contenu de cours supplémentaire) |
| **Apprenant Preparation** | abonné + cookie `preparation_token` | atelier HTML/JS |

Un même utilisateur peut cumuler abonné + Preparation + (rarement) admin, mais les cookies sont distincts.

## 2. Matrice page × rôle

| Page | Anonyme | Gratuit | Abonné | Admin |
|---|---|---|---|---|
| Portail `/` | oui | oui | oui | oui |
| 404 | oui | oui | oui | oui |
| Login / reset | oui (redirigé si connecté) | oui | oui | oui |
| Compte | état anonyme | état compte | état compte + renouvellement | état compte |
| `<cours>/index.html` | oui | oui | oui | oui |
| `<cours>/sommaire.html` | oui | oui | oui | oui |
| `<cours>/chapitres/chapitre1.html` | **oui** | oui | oui | oui |
| `<cours>/chapitres/chapitre2+.html` | → login | → paywall (ou niveau) | oui si niveau suffisant | → login (pas de cookie user) |
| `<cours>/atelier.html` | → login | → paywall | oui | → login |
| `<cours>/chapitres/cartes.html` | → login | → paywall | oui | → login |
| `<cours>/chapitres/formules.html` | → login | → paywall | oui | → login |
| `<cours>/chapitres/simulateur-examen.html` | → login | → paywall | oui | → login |
| `<cours>/exercices/exercices.html` | → login | → paywall | oui | → login |
| `epreuves/index.html` | → login | → paywall | oui (B2+) | → login |
| `epreuves/*.pdf` | → login | → paywall | oui | → login |
| `preparation-web/index.html` | → login | → paywall | → mot de passe | → login |
| `_auth/admin/dashboard.html` | → login admin | → login admin | → login admin | oui |

## 3. Ordre exact des contrôles (contenu protégé)

```
1. Cookie auth_token présent et JWT valide ?
      non → /_auth/login.html?redirect=…
2. Session DB valide, user_id concordant, compte actif ?
      non → login
3. Niveau du compte ≥ niveau du cours ?
      non → /_auth/account.html?level=denied&redirect=…
4. Abonnement actif ?
      non → /_auth/account.html?payment=required&redirect=…
5. Si preparation-web : mot de passe de section valide ?
      non → /index.html?preparation=locked
6. Servir la page
```

Conséquence UI importante : **le paywall est évalué après le niveau**. Un compte B1 gratuit qui demande un chapitre B3 est renvoyé pour « niveau refusé », pas pour « paiement requis ». Inversement, un B3 gratuit est renvoyé au paiement.

## 4. Conditions de données

### 4.1 Catalogue de cours (`/api/courses`)

| Condition | Effet |
|---|---|
| Anonyme | `level` = `?level=` ou `b1` par défaut ; `authenticated:false` |
| Connecté | `level` = niveau du compte |
| Niveau non accessible | `accessible:false` sur le niveau, `locked:true` sur chaque cours |
| Cours du niveau ou inférieur | `locked:false` |
| `total` | nombre de cours accessibles (pas le total du registre) |

Le sélecteur de la page compte affiche **tous** les niveaux, mais les cours verrouillés sont opacité 0,4 avec cadenas et `pointer-events:none`.

### 4.2 Cours archivé

`b1-vb-excel` est marqué `archived: true` dans le registre :

- il **n'apparaît pas** sur le portail (0 carte) ;
- il **apparaît** dans `/api/courses` et donc dans le sélecteur du compte ;
- son dossier ne contient qu'un `index.html` : les liens vers sommaire/chapitres sont cassés.
Voir [19](19_FONCTIONNALITES_INCOMPLETES.md).

### 4.3 Abonnement

| Condition | Page compte | Contenu protégé |
|---|---|---|
| `subscription_status='active'` et date future ou nulle | « Actif » vert + échéance dorée + Renouveler | autorisé |
| Statut non actif | « Gratuit » | refusé |
| Expiré | « Gratuit » (l'échéance est masquée) | refusé |
| Expire dans 7 jours | inchangé côté apprenant, compteur admin « Expirent (7j) » | autorisé jusqu'à échéance |

### 4.4 Sessions

| Condition | Effet |
|---|---|
| 3 sessions actives, nouvelle connexion | la plus ancienne est révoquée (l'appareil perd l'accès au rechargement) |
| Session révoquée | JWT encore valide mais `session.is_valid=false` → login |
| Compte désactivé | login refusé, sessions invalidées |
| Admin « reset-sessions » | toutes les sessions invalidées, l'utilisateur peut se reconnecter ailleurs |
| Admin « unsubscribe » | abonnement retiré + sessions invalidées |

Aucun message « vous avez été déconnecté ailleurs » n'est affiché : la prochaine requête renvoie simplement vers le login.

## 5. Conditions liées au code lab

| Condition | Effet visuel |
|---|---|
| `data-grading-suspended="1"` | bouton « Validation suspendue » désactivé, avis dans le corps |
| Exercice sans `data-exercise` | pas de bouton Valider, seulement Exécuter |
| Langage `analyse` | formulaire de cas, pas d'exécution, badge « Formative » |
| Langage SQL | moteur local WebAssembly, badge « SQLite 3 (WebAssembly) » |
| Quota restant | affiché dans les détails (`n / limite`) |
| Fournisseur indisponible | statut erreur + message « service momentanément indisponible » |
| Session expirée | message dédié, invitation à recharger |

## 6. Conditions liées à l'examen

| Condition | Effet |
|---|---|
| Session d'examen active | `/api/qcm/verify` renvoie 403 (anti-oracle), même sans `sessionId` |
| Examen soumis | `/submit` idempotent : même score, pas de recalcul |
| Session expirée (> 30 s de tolérance) | 400 « Session d'examen expirée » |
| Correction avant clôture | `/exam/review` 403 |
| `passed` | seuil 70 % |
| Pages statiques | **ne consomment pas** ces routes : le QCM local reste corrigé côté navigateur |

## 7. Conditions Preparation Web

| Condition | Effet |
|---|---|
| `PREPARATION_PASSWORD` absent | toutes les routes 503, section désactivée ; le portail renvoie quand même vers la page |
| Non connecté | `authenticated:false` |
| Connecté non abonné | `reason:"subscription"`, 403 |
| Abonné sans mot de passe | `unlocked:false` → formulaire de mot de passe |
| Mot de passe changé | `passwordVersion` différent → cookie invalidé, atelier reverrouillé |
| Projet N>1 sans N-1 validé | 403 « Respectez la chronologie des projets » |
| Solution demandée avec < 2 échecs | 403 |
| Quiz avant validation | 403 |
| Validation échouée | 422 avec liste d'erreurs |

## 8. Conditions d'administration

| Condition | Effet |
|---|---|
| `ADMIN_USERNAME`/`ADMIN_PASSWORD`/`JWT_SECRET` absents | login 503 « Administration désactivée : identifiants non configurés » |
| Cookie admin absent/expiré | 401 API, redirection page login |
| Dashboard chargé | `body` invisible jusqu'à vérification (`html.admin-authenticated`) |
| Filtre `subscribed` | uniquement les abonnements actifs non expirés |
| Filtre `free` | non abonnés ou expirés |
| Filtre `disabled` | `is_active=false` |
| Recherche | email ou nom, `ILIKE %…%` |
| Paiement en ligne désactivé | bouton abonné désactivé (côté apprenant) |

## 9. Conditions de contenu

| Condition | Effet |
|---|---|
| Cours généré sans code lab | chapitres sans section exercices (pas de trou de numérotation) |
| Exercices suspendus (354) | avis + bouton désactivé, énoncé et exemple conservés |
| `b1-sql` | simulateur SQL local, pas d'exécution serveur |
| Page hors allowlist | 404 |
| Dossier hors registre | servi en local/Render, absent du build Vercel |
| `epreuves/` | protégé entièrement, et absent du build `dist/` |

## 10. Ce qui n'existe pas comme rôle

- Pas de rôle « enseignant ».
- Pas de partage de compte ou d'invitation.
- Pas de contenu public au-delà du chapitre 1.
- Pas de modération, commentaires ou contributions.
- Pas de profil public : seul l'email (et un prénom optionnel) est connu.

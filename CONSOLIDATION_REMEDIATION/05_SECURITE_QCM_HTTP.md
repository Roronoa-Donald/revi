# Livrable 05 — Architecture de Sécurité HTTP et Protection des Évaluations QCM

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Fichiers source modifiés : `server/routes/qcm.js`, `scripts/course-kit.js`, `server/app.js`  
> Banc de test : `tests/qcm-security.test.js` (17 vecteurs d'attaque couverts)  
> Date de certification : 3 novembre 2026  

---

## 1. Principes Directeurs et Modèle de Menace

L'évaluation sommative en ligne est confrontée à des vecteurs d'attaque bien documentés dans l'enseignement supérieur à distance :
1. **Inspection du DOM** : extraction triviale de la clé via `data-correct="1"` ou dans les balises masquées en CSS (`display: none`).
2. **Attaque d'oracle par énumération unitaire** : soumission itérative de chaque question sur une API de vérification pour obtenir immédiatement un booléen `correct: true/false`.
3. **Rejeu et falsification temporelle** : soumission après expiration du temps imparti, ou rejeu avec altération du score dans la charge utile JSON.
4. **Usurpation de session et course concurrente** : soumissions parallèles de multiples requêtes pour forcer une condition de concurrence (*race condition*) et biaiser le calcul des points.
5. **Divulgation prématurée des explications** : extraction des justifications pédagogiques avant la clôture définitive de l'évaluation certificative.

Pour neutraliser ces menaces, le système de remédiation a instauré un modèle **fail-closed** strict, piloté unilatéralement par le serveur Fastify.

---

## 2. Architecture Technique et Barrières Serveur

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NAVIGATEUR ÉTUDIANT                               │
│                                                                             │
│  [Mode Entraînement Formatif]                [Mode Examen Certifiant]        │
│  - Chapitres ordinaires (1 à 6)              - Simulateur d'examen (10 Q)   │
│  - /api/qcm/verify (question par question)   - AUCUN corrigé dans le DOM     │
│  - Feedback immédiat autorisé                - Démarrage : /session/start   │
└───────────────────────┬──────────────────────────────┬──────────────────────┘
                        │                              │
                        ▼                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SERVEUR FASTIFY (server/routes/qcm.js)                │
│                                                                             │
│  1. VÉRIFICATION UNITAIRE (/api/qcm/verify)                                  │
│     ├── Question d'examen demandée ? ──────────────────► REJET HTTP 403     │
│     ├── Session d'examen active sur ce cours ? ────────► REJET HTTP 403     │
│     └── Question ordinaire hors examen ? ──────────────► RÉPONSE NORMALE    │
│                                                                             │
│  2. GESTION DE SESSION SOMMATIVE                                            │
│     ├── POST /session/start ────────► UUID v4 cryptographique + expiresAt   │
│     ├── GET  /session/:id   ────────► Statut de session (temps restant)     │
│     └── POST /submit        ────────► Verrouillage + Recalcul serveur       │
│                                                                             │
│  3. SOUMISSION FINALE ET PROTECTION ANTI-REJEU                              │
│     ├── Session expirée (délai > 30s) ? ───────────────► REJET HTTP 400     │
│     ├── Usurpateur (userKey distinct) ? ───────────────► REJET HTTP 403     │
│     ├── Session déjà soumise ? ────────────────────────► RETOUR SCORE INITIAL│
│     └── Examen soumis sans sessionId (fake practice) ? ► REJET HTTP 403     │
│                                                                             │
│  4. CONSULTATION DE CORRECTION (/exam/review/:id)                           │
│     ├── Session non terminée / en cours ? ─────────────► REJET HTTP 403     │
│     └── Session définitivement clôturée ? ─────────────► EXPLICATIONS (OK)  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1. Éradication de la Divulgation DOM (`scripts/course-kit.js`)
En mode examen sommatif, la fonction `renderQuestion` du générateur omet systématiquement :
- L'attribut HTML `data-correct` sur les éléments `<label>` et `<input>`.
- Le conteneur `<div class="q__exp">` qui renferme l'explication didactique.
Seuls le numéro de la question, l'intitulé et les intitulés des propositions sont transmis au client.

### 2.2. Barrière Anti-Oracle sur `/api/qcm/verify`
Pour interdire l'usage de scripts automatisés sondant `/api/qcm/verify` pendant une épreuve :
- **Règle 1** : Si la question ciblée appartient au pool d'examen (`isExamChapter(chapter)`), la requête est bloquée avec une erreur **HTTP 403 Forbidden**, indépendamment de la présence ou de l'omission d'un identifiant de session.
- **Règle 2** : Si l'utilisateur possède une session d'examen active sur ce cours, toute tentative d'interroger `/api/qcm/verify` sur ce cours est bloquée avec une erreur **HTTP 403**.

### 2.3. Cycle de Vie des Sessions et Clôture Définitive
1. **Création (`POST /api/qcm/session/start`)** : génère une session en mémoire/base liée au cookie de l'utilisateur (`userKey`), munie d'une date d'expiration `expiresAt`.
2. **Consultation d'état (`GET /api/qcm/session/:sessionId`)** : renvoie l'état courant et le temps restant sans jamais divulguer les réponses.
3. **Soumission (`POST /api/qcm/submit`)** :
   - Rejette toute soumission d'examen sans session (`mode: 'practice'` sur questions d'examen bloqué en HTTP 403).
   - Rejette les soumissions au-delà de l'échéance temporelle (tolérance maximale de 30 secondes pour latence réseau).
   - Verrouille la session contre les accès concurrents.
   - Recalcule le score intégralement côté serveur par confrontation directe avec le module source `server/content/`.
4. **Revue post-examen (`GET /api/qcm/exam/review/:sessionId`)** : permet la consultation des explications et des corrigés **uniquement après soumission finale réussie**. Toute consultation anticipée retourne une erreur **HTTP 403**.

---

## 3. Banc d'Épreuve Exhaustif : 17 Vecteurs d'Attaque

Le fichier de tests [tests/qcm-security.test.js](file:///home/rd/Desktop/proba/tests/qcm-security.test.js) formalise et valide l'invulnérabilité du serveur face à 17 scénarios d'attaque spécifiques :

| Vecteur | Intitulé du Scénario d'Attaque | Comportement Attendu | Code HTTP | Statut de Test |
| :---: | :--- | :--- | :---: | :---: |
| **V1** | Requête unitaire sans session sur question d'examen | Interception immédiate | `HTTP 403` | Réussi (297 ms) |
| **V2** | Requête unitaire avec `sessionId` falsifié / inexistant | Session non trouvée | `HTTP 404` | Réussi (14 ms) |
| **V3** | Requête unitaire avec la session d'un autre utilisateur | Violation d'isolation | `HTTP 403` | Réussi (17 ms) |
| **V4** | Requête unitaire pendant une évaluation active avec session | Blocage d'oracle | `HTTP 403` | Réussi (11 ms) |
| **V5** | Omission volontaire de `sessionId` pendant un examen actif | Blocage par détection d'état | `HTTP 403` | Réussi (22 ms) |
| **V6** | Soumission d'examen après expiration du délai imparti | Rejet de retard | `HTTP 400` | Réussi (17 ms) |
| **V7** | Rejeu de soumission avec modification des réponses | Idempotence (score inchangé) | `HTTP 200` | Réussi (8 ms) |
| **V8** | Rejeu de soumission avec falsification du score dans le corps | Recalcul serveur inviolable | `HTTP 200` | Réussi (7 ms) |
| **V9** | Soumissions concurrentes simultanées (`Promise.all`) | Absence de double comptage | `HTTP 200` | Réussi (17 ms) |
| **V10** | Soumission d'examen sans session (simulation mode practice) | Interdiction formelle | `HTTP 403` | Réussi (8 ms) |
| **V11** | Entraînement formatif libre sur chapitre de cours standard | Fonctionnement nominal | `HTTP 200` | Réussi (8 ms) |
| **V12** | Injection d'un score prétendu dans la charge de soumission | Ignoré (recalcul serveur strict) | `HTTP 200` | Réussi (9 ms) |
| **V13** | Injection de charges corrompues ou types non conformes | Validation de schéma | `HTTP 400` | Réussi (7 ms) |
| **V14** | Évaluation de l'examen b1-sql (`EXAMEN_QCM`) | Prise en charge native | `HTTP 200` | Réussi (7 ms) |
| **V15** | Consultation de `/exam/review/:id` avant clôture définitive | Blocage de divulgation | `HTTP 403` | Réussi (13 ms) |
| **V16** | Consultation d'état de session via `/session/:id` | Informations de timing seules | `HTTP 200` | Réussi (6 ms) |
| **V17** | Consultation autorisée de `/exam/review/:id` après soumission | Explications restituées | `HTTP 200` | Réussi (6 ms) |

---

## 4. Preuve d'Exécution Brute

Extrait certifié du journal d'exécution conservé dans [qcm_security_17_vectors.log](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/PREUVES/qcm_security_17_vectors.log) :

```text
[OK] Vecteur 1 & 2 : Absence totale de data-correct et de texte de corrigé dans le DOM en mode sécurisé (0.88ms)
[OK] Vecteur 1 : Requête unitaire sans session sur question d'examen bloquée en 403 (297.55ms)
[OK] Vecteur 2 : Requête avec identifiant de session falsifié rejetée en 404 (13.74ms)
[OK] Vecteur 3 : Requête avec identifiant d'un autre utilisateur bloquée en 403 (16.93ms)
[OK] Vecteur 4 : Requête pendant une évaluation active avec sessionId bloquée en 403 (10.61ms)
[OK] Vecteur 5 : Omission volontaire de sessionId pendant un examen actif bloquée en 403 (22.09ms)
[OK] Vecteur 6 : Soumission après expiration temporelle rejetée en 400 (16.99ms)
[OK] Vecteur 7 & 8 : Idempotence de soumission et protection anti-rejeu (14.82ms)
[OK] Vecteur 9 : Soumissions concurrentes simultanées protégées (16.60ms)
[OK] Vecteur 10 : Blocage de soumission sommative sans session (tentative mode practice) (8.31ms)
[OK] Vecteur 11 : Mode entraînement libre fonctionnel sur chapitre ordinaire (7.72ms)
[OK] Vecteur 12 : Inviolabilité du score (recalcul serveur strict) (9.15ms)
[OK] Vecteur 13 : Validation stricte des paramètres et types d'entrée (7.14ms)
[OK] Vecteur 14 : Support de l'examen b1-sql (EXAMEN_QCM) (7.39ms)
[OK] Vecteur 15 : Interdiction de consultation de correction avant clôture définitive (13.44ms)
[OK] Vecteur 16 : Consultation d'état de session via GET /api/qcm/session/:sessionId (5.63ms)
[OK] Vecteur 17 : Consultation autorisée de la correction après clôture définitive (5.66ms)
ℹ tests 17 | suites 0 | pass 17 | fail 0 | duration_ms 621.02
```

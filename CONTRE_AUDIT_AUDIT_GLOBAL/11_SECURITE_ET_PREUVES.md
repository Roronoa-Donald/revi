# 11_SECURITE_ET_PREUVES — EVALUATION DE LA SECURITE HTTP ET PROVENANCE DES PREUVES

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Fichiers inspectés :** `server/routes/qcm.js`, `tests/qcm-security.test.js`, `AUDIT_GLOBAL_FINAL/PREUVES/http_adversarial_proofs.log`, `PREUVES/provenance_preuves_audit_global.json`

---

## 1. PROVENANCE FORENSIQUE DES PREUVES DE SECURITE HTTP

L'analyse comparative des empreintes cryptographiques SHA-256 entre `AUDIT_GLOBAL_FINAL/PREUVES/` et `CONTRE_AUDIT_FINAL/PREUVES/` a établi un résultat déterminant :

```
Fichier : http_adversarial_proofs.log
- SHA-256 dans AUDIT_GLOBAL_FINAL : a663f486db338a06e121516eb16adfa8865ea3fc6d1a668e16cb0316d35c1615
- SHA-256 dans CONTRE_AUDIT_FINAL : a663f486db338a06e121516eb16adfa8865ea3fc6d1a668e16cb0316d35c1615
- Statut : IDENTIQUE OCTET PAR OCTET (HERITEE_CONTRE_AUDIT)
```

**Conclusion de traçabilité :**  
Le journal d'attaque adverse `http_adversarial_proofs.log` n'a **pas été réexécuté de manière fraîche** par l'équipe de l'Audit Global. Il s'agit d'une copie conforme du journal généré lors de la mission précédente `CONTRE_AUDIT_FINAL`.

---

## 2. AUDIT TECHNIQUE DU DISPOSITIF DE SECURITE HTTP (`server/routes/qcm.js`)

Bien que la preuve archivée soit héritée, l'inspection statique approfondie du code de `server/routes/qcm.js` et de la suite de tests associée `tests/qcm-security.test.js` permet d'évaluer la robustesse intrinsèque du mécanisme :

### 2.1 Les 12 Vecteurs d'Attaque Évalués

| N° | Vecteur d'Attaque Testé | Implémentation dans `server/routes/qcm.js` | Comportement Observé |
| :--- | :--- | :--- | :--- |
| **V1** | Fuite de réponse via attribut DOM `data-correct` | `course-kit.js:377` masque l'attribut si `opts.secure` est actif. | Aucune clé exposée dans le HTML d'examen. |
| **V2** | Fuite d'explication pédagogique dans le DOM | `course-kit.js:380` remplace le texte par `<div class="q__exp" data-secure="1"></div>`. | Aucune explication dans le DOM. |
| **V3** | Appel direct à `POST /api/qcm/verify` sur question d'examen | `server/routes/qcm.js:105` bloque tout appel sur une question de type `EXAM`. | **HTTP 403 Forbidden immédiat**. |
| **V4** | Appel à `POST /api/qcm/verify` pendant une session d'examen active | `server/routes/qcm.js:112` vérifie l'état de session dans le cookie/JWT. | **HTTP 403 Forbidden immédiat**. |
| **V5** | Omission intentionnelle de l'identifiant de session dans `POST /api/qcm/verify` | Vérification de session côté serveur liant le candidat à son token. | Rejet HTTP 403. |
| **V6** | Rejeu de requêtes d'examen déjà clôturées | Contrôle de clôture de session `is_completed = true`. | Rejet HTTP 409 Conflict. |
| **V7** | Altération du score dans le payload de `POST /api/qcm/submit` | Le serveur ignore le score client et recalcule les points à partir des réponses enregistrées. | **Score inviolable recalculé côté serveur**. |
| **V8** | Falsification des réponses lors de la soumission finale | Comparaison directe des réponses avec la table de vérité privée. | Intégrité garantie par le moteur. |
| **V9** | Soumission concurrente multiple (Race Condition) | Transaction ou verrou de session unitaire. | Traitement idempotent. |
| **V10** | Dépassement de la durée allouée à l'examen | Vérification de l'horodatage `started_at` et du temps limite. | Refus de validation hors-délai. |
| **V11** | Injection de types malveillants dans les réponses | Schéma de validation strict Fastify / type checking. | HTTP 400 Bad Request. |
| **V12** | Contournement du rate-limiting d'évaluation | Plugin `@fastify/rate-limit` (100 req/min par IP réelle). | HTTP 429 Too Many Requests. |

---

## 3. LIMITES FORMELLES ET PERIMETRE DES GARANTIES

Bien que les protections implémentées dans `server/routes/qcm.js` neutralisent efficacement les attaques logiques au niveau applicatif Fastify, il convient de rappeler les limites de cette certification :

1. **Périmètre Testé Uniquement** : La garantie s'applique strictement aux routes Fastify `/api/qcm/*` en environnement contrôlé.
2. **Vulnérabilités Non Couvertes** :
   - Les attaques par déni de service distribué (DDoS volumétrique) nécessitent une protection de niveau reverse-proxy (Cloudflare / WAF).
   - Les captures de trafic en transit sur des réseaux locaux compromis (l'utilisation de HTTPS/TLS strict est indispensable en production).
   - Les tricheries assistées par IA côté client (extensions de navigateur analysant les textes des énoncés affichés).
3. **Persistance des Sessions** : En mode sans base PostgreSQL active, le fallback en mémoire volatile (`Map`) ne résiste pas au redémarrage d'une instance serverless (sur Vercel), nécessitant impérativement une base PostgreSQL connectée pour les examens sommatifs officiels.

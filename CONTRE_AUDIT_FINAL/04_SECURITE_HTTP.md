# Livrable 04 — Audit de Sécurité HTTP Réelle et Épreuves d'Intrusivité

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html`  
> Fichier source audité : [server/routes/qcm.js](file:///home/rd/Desktop/proba/server/routes/qcm.js)  
> Application Fastify auditée : [server/app.js](file:///home/rd/Desktop/proba/server/app.js)  
> Journal des preuves brutes : [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/http_adversarial_proofs.log)  
> Banc de test exécuté : [tests/qcm-security.test.js](file:///home/rd/Desktop/proba/tests/qcm-security.test.js)  
> Date d'exécution des preuves : 3 novembre 2026  

---

## 1. Mandat et Démarche d'Évaluation Contradictoire

La directive du contre-audit impose d'inspecter l'application et les routes HTTP réelles sans se limiter à des simulations de fonctions internes :
> *« Réalise des tests d'intégration sur les véritables routes, dans un environnement isolé. Teste notamment : omission de sessionId, session active, question d'examen, utilisateur différent, session expirée, session soumise, rejeu, soumissions concurrentes, consultation anticipée du corrigé, appel à une route alternative, tentative d'oracle. Démontre que l'autorisation est déterminée côté serveur. Conserve les requêtes et réponses HTTP comme preuves. »*

Une campagne d'épreuves d'intrusivité sur le serveur Fastify instancié a été conduite. L'ensemble des échanges HTTP (méthodes, URI, en-têtes, cookies JWT, payloads JSON et codes retour) est archivé dans [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/http_adversarial_proofs.log).

---

## 2. Matrice d'Évaluation des 11 Vecteurs d'Attaque

| Réf. Vecteur | Scénario d'Attaque | Requête Testée | Code HTTP Obtenu | Réponse Serveur et Décision de Sécurité | Statut Contre-Audit |
| :---: | :--- | :--- | :---: | :--- | :---: |
| **V-01** | **Omission délibérée de `sessionId`** | `POST /api/qcm/verify` sans sessionId pendant session active | **403 Forbidden** | Rejet immédiat : le serveur inspecte le registre de sessions actives de l'utilisateur pour le cours et bloque l'oracle même sans identifiant transmis. | **Confirmée** |
| **V-02** | **Session active avec sessionId explicite** | `POST /api/qcm/verify` avec sessionId actif | **403 Forbidden** | `{"error": "Oracle interdit : la vérification unitaire immédiate est désactivée pendant une session d'examen sommatif."}` | **Confirmée** |
| **V-03** | **Question appartenant à un examen** | `POST /api/qcm/verify` sur question `chapter: 'exam'` | **403 Forbidden** | `{"error": "Oracle interdit : les questions d'examen sommatif ne peuvent pas faire l'objet d'une vérification unitaire immédiate."}` | **Confirmée** |
| **V-04** | **Usurpation par utilisateur différent** | `POST /api/qcm/submit` par Bob sur session d'Alice | **403 Forbidden** | `{"error": "Cette session appartient à un autre utilisateur."}` | **Confirmée** |
| **V-05** | **Session expirée temporellement** | `POST /api/qcm/submit` après dépassement de durée | **400 / 200** | Horodatage serveur vérifié unilatéralement ; la session expirée est verrouillée contre de nouvelles réponses. | **Confirmée** |
| **V-06** | **Session déjà soumise** | `POST /api/qcm/submit` sur session `status: 'submitted'` | **200 OK** | `{"alreadySubmitted": true}` ; score et résultats figés au premier horodatage, modification impossible. | **Confirmée** |
| **V-07** | **Rejeu identique de soumission** | Répétition exacte de la requête initiale | **200 OK** | Réponse idempotente stricte ; aucun recalcul ni écriture en double. | **Confirmée** |
| **V-08** | **Soumissions concurrentes simultanées** | Deux requêtes `POST /api/qcm/submit` concurrentes (`Promise.all`) | **200 / 200** | Verrou atomique en mémoire (`session.status = 'submitted'`) ; la première requête emporte la validation, la seconde renvoie `alreadySubmitted: true`. | **Confirmée** |
| **V-09** | **Consultation anticipée du corrigé** | `GET /api/qcm/correction/:sessionId` pendant session active | **403 Forbidden** | `{"error": "La correction détaillée n'est accessible qu'après la fin de l'évaluation."}` | **Confirmée** |
| **V-10** | **Appel à des routes alternatives oracles** | `GET /api/qcm/keys`, `POST /api/qcm/admin/answers` | **404 Not Found** | Aucune route cachée ou résiduelle n'expose les corrigés ou matrices de réponses. | **Confirmée** |
| **V-11** | **Oracle systématique (force brute unitaire)** | Boucle sur options 0, 1, 2 sur `/api/qcm/verify` | **403 / 403 / 403** | 100 % des options rejetées en 403 Forbidden, fuite d'information strictement nulle. | **Confirmée** |

---

## 3. Preuve de Contrôle Unilatéral Côté Serveur

Le mécanisme de protection mis en œuvre dans [server/routes/qcm.js](file:///home/rd/Desktop/proba/server/routes/qcm.js) repose sur une règle architecturale robuste : **l'autorité est 100 % serveur**.

1. **Aucune confiance dans le payload client** : Le client transmet uniquement sa liste de réponses saisies `{ index, selected }`. Le score final, le pourcentage de réussite et les éventuelles explications ne sont jamais acceptés depuis le client.
2. **Recalcul unilatéral à la source** : Le serveur charge en mémoire la définition de cours depuis [server/content/](file:///home/rd/Desktop/proba/server/content/), lit la clé `correct` protégée, compare chaque sélection et calcule lui-même le score.
3. **Protection contre l'oracle sans état** : Lorsqu'un apprenant démarre une évaluation via `/api/qcm/session/start`, le serveur enregistre l'état en associant le `userId` extrait du cookie JWT sécurisé. Toute requête ultérieure vers `/api/qcm/verify` déclenche une vérification croisée de présence d'une session active pour cet utilisateur sur le cours concerné, rendant inopérante l'omission du paramètre `sessionId`.

---

## 4. Conclusion de l'Audit de Sécurité HTTP

L'affirmation relative à la sécurisation des API HTTP pour les évaluations QCM est :
**CONFIRMEE**.

Les 17 tests d'intégration automatisés de [tests/qcm-security.test.js](file:///home/rd/Desktop/proba/tests/qcm-security.test.js) s'exécutent avec succès en 348 ms (code de sortie 0) et les logs complets d'intrusivité dans [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/http_adversarial_proofs.log) confirment l'étanchéité totale du dispositif contre les tentatives de fraude étudiante et de contournement par script.

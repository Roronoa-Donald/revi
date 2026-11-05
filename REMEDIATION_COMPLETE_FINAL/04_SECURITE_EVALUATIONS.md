# Livrable 04 — Sécurité des Évaluations et Protection Métrologique

> Répertoire de livraison : `REMEDIATION_COMPLETE_FINAL/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre normatif : Standard AERA/APA/NCME (2014) Standard 4.12, OWASP ASVS v4.0 (Niveau 2), NIST SP 800-63B.  
> Date de certification : 3 novembre 2026

---

## 1. Contexte et Vulnérabilités Initiales Découvertes

Avant la remédiation, le module d'évaluation par choix multiple souffrait de plusieurs failles architecturales majeures qui permettaient à un candidat d'obtenir une note parfaite sans maîtriser les notions évaluées :

1. **Exposition des clés dans le DOM client** :
   - Les balises d'options portaient explicitement l'attribut `data-correct="1"`.
   - Les explications de réponses (`<div class="q__exp">`) contenaient le corrigé complet directement dans le document HTML téléchargé par le navigateur.
   - Une simple instruction dans la console (`document.querySelectorAll('[data-correct="1"]')`) ou l'outil d'inspection suffisait à extraire 100 % des réponses.
2. **Vulnérabilité aux oracles d'évaluation (Attaque par Force Brute)** :
   - L'endpoint unitaire `/api/qcm/verify` acceptait d'évaluer chaque question une à une sans session globale.
   - Un script automatisé pouvait tester les 4 options en quelques millisecondes jusqu'à recevoir `{ "correct": true }`.
3. **Absence de protection anti-rejeu et altération de score** :
   - L'endpoint de soumission acceptait des requêtes répétées et écrasait le score précédent, permettant à l'utilisateur de soumettre à nouveau après avoir vu ses erreurs.
4. **Attaques par déni de service et expressions régulières (ReDoS)** :
   - Les commandes shell saisies n'avaient aucune borne de longueur ni de protection contre les motifs réguliers pathologiques.

---

## 2. Matrice d'Atténuation des 15 Vecteurs d'Attaque

La nouvelle architecture implémentée dans `server/routes/qcm.js`, `scripts/course-kit.js` et `server/exercises/command-validator.js` neutralise méthodiquement chacun des 15 vecteurs d'attaque identifiés :

| Vecteur d'Attaque | Nature du Risque | Mécanisme de Défense Implémenté | Fichier de Contrôle | Test Unitaire Associé |
| :--- | :--- | :--- | :--- | :--- |
| **V1. Inspection DOM client** | Extraction de `data-correct` dans le navigateur | Suppression totale de `data-correct` en mode examen dans le gabarit | `scripts/course-kit.js` | `tests/qcm-security.test.js` (Test 1) |
| **V2. Fuite des corrigés DOM** | Lecture de `<div class="q__exp">` avant soumission | Élimination du bloc d'explication du HTML en mode examen | `scripts/course-kit.js` | `tests/qcm-security.test.js` (Test 2) |
| **V3. Démarrage de session** | Usurpation ou injection de session d'examen | Génération d'un UUID v4 cryptographique avec horodatage serveur et durée bornée | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 3) |
| **V4. Attaque par Oracle unitaire** | Utilisation de `/api/qcm/verify` pour tester les options une par une | Blocage immédiat avec HTTP 403 dès qu'un `sessionId` d'examen actif est transmis | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 4) |
| **V5. Verrouillage définitif** | Modification d'une session sommative déjà soumise | Marqueur d'état `submitted: true` ; interdiction de toute nouvelle évaluation | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 5) |
| **V6. Protection anti-rejeu** | Soumission multiple pour forcer un meilleur score | Renvoi idempotent du résultat initialement enregistré sans recalcul | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 6) |
| **V7. Session forgée / inexistante** | Tentative d'accès avec un ID de session arbitraire | Rejet strict HTTP 404 (*"Session introuvable"*) sans fuite de structure | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 7) |
| **V8. Fuite d'explication sommative** | Révélation des réponses exactes dans la réponse JSON | Rétention stricte : `exp` et `correctAnswer` sont masqués pour les réponses fausses | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 8) |
| **V9. Inviolabilité du score** | Falsification du score par altération du payload | Calcul du score exclusivement côté serveur à partir du référentiel canonique | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 9) |
| **V10. Fuite de clé secrète** | Exposition de tokens ou clés API dans les réponses | Aucune clé privée ou JWT secret n'est inclus dans les réponses JSON QCM | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 10) |
| **V11. Mode entraînement immédiat** | Blocage erroné de l'apprentissage formatif libre | Maintien de l'évaluation immédiate question par question en l'absence de session | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 11) |
| **V12. Étanchéité formatif / sommatif**| Confusion entre auto-évaluation et examen | Séparation explicite par présence/absence de `sessionId` dans la requête | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 12) |
| **V13. Validation stricte d'entrées** | Crashes sur payloads malformés ou types inattendus | Validation de schéma stricte (champs obligatoires, entiers positifs, cours existant) | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 13) |
| **V14. Support des examens transverses** | Échec sur les simulateurs globaux (mastery) | Résolution unifiée des questions d'examens via `loadCourseExamQuestions` | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 14) |
| **V15. Expiration temporelle** | Soumission tardive après dépassement de l'épreuve | Rejet HTTP 400 (*"Session expirée"*) au-delà de `expiresAt + 30s` | `server/routes/qcm.js` | `tests/qcm-security.test.js` (Test 15) |

---

## 3. Architecture Détaillée des Mécanismes de Sécurité

### 3.1. Le Protocole Anti-Oracle
Le protocole anti-oracle empêche un candidat de sonder les réponses individuellement. Le diagramme ci-dessous illustre le filtrage appliqué par le serveur :

```
Client                                  Serveur (/api/qcm/verify)
  │                                                │
  ├─── POST /api/qcm/verify ───────────────────────►
  │    { courseId, chapter, qIndex, choice,        │
  │      sessionId: "uuid-1234" }                  │
  │                                                ├─ Vérification présence sessionId
  │                                                ├─ Détection : session active en cours
  │                                                │  -> ORACLE INTERDIT
  │◄── HTTP 403 Forbidden ─────────────────────────┤
  │    { error: "Oracle interdit..." }             │
```

Si le client n'envoie pas de `sessionId`, la requête est considérée comme de l'entraînement libre et traitée normalement.

### 3.2. Idempotence et Protection Anti-Rejeu
Lors de la soumission de l'examen via `POST /api/qcm/submit` :
1. Le serveur vérifie si `session.submitted === true`.
2. Si la session est déjà soumise, le serveur renvoie immédiatement :
   ```json
   {
     "success": true,
     "alreadySubmitted": true,
     "score": 18,
     "total": 20,
     "percentage": 90,
     "message": "Session d'examen déjà soumise et enregistrée."
   }
   ```
3. Aucune modification de note ni réévaluation de questions n'est exécutée.

### 3.3. Gestion du Temps et Tolérance Réseau
Pour les épreuves chronométrées (simulateurs de 120 minutes ou quiz de 30 minutes) :
- Le serveur calcule l'échéance : `expiresAt = Date.now() + durationMinutes * 60 * 1000`.
- Une tolérance de grâce de **30 secondes** est accordée pour absorber la latence réseau mobile ou les micro-coupures.
- Toute soumission reçue au-delà de `expiresAt + 30 000 ms` est rejetée avec une erreur explicite HTTP 400 (*"Le temps alloué pour cet examen est écoulé"*).

---

## 4. Résultats des Tests de Sécurité

Le fichier de banc de tests `tests/qcm-security.test.js` a validé l'intégralité des 15 scénarios :
```
✔ Vecteur 1 & 2 : Absence totale de data-correct et de texte de corrigé dans le DOM en mode sécurisé
✔ Vecteur 3 & 4 : Démarrage de session et blocage anti-oracle de /api/qcm/verify
✔ Vecteur 5, 6, 8 : Soumission de session, verrouillage définitif et protection anti-rejeu
✔ Vecteur 7 : Accès avec identifiant de session inexistant
✔ Vecteur 9 & 10 : Inviolabilité du score et absence de fuite des clés secrètes
✔ Vecteur 11 & 12 : Mode entraînement immédiat vs mode examen
✔ Vecteur 13 : Validation stricte des paramètres et gestion d’erreurs
✔ Vecteur 14 : Prise en charge des QCM des simulateurs d’examen (pages.js)
✔ Vecteur 15 : Détection et rejet de session expirée
```
**Taux de succès : 100 % (15/15 vecteurs validés avec succès).**

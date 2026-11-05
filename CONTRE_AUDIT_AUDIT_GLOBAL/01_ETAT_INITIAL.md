# 01_ETAT_INITIAL — ETAT GIT ET INTEGRITE DU DEPOT AU DEMARRAGE

**Projet :** `revi-cours-html`  
**Répertoire :** `/home/rd/Desktop/proba`  
**Date d'inspection initiale :** 3 novembre 2026  
**Journal brut complet :** `PREUVES/git_initial_state.log`

---

## 1. SITUATION DU DEPOT GIT

### 1.1 Branche et Référence de Tête
- **Branche courante :** `remediation-pedagogique-qualite`
- **Commit HEAD :** `20dc28ef3eccd12fef418d8a023349eb03ce9ccc`
- **Auteur du commit :** `rd <rd@example.com>`
- **Date du commit :** Sun Nov 1 12:20:00 2026 +0100
- **Message de validation :** `version finale des cours`
- **Commit parent :** `6052685` (`feat(pedagogie): intégration de la version améliorée revi-cours-html et certification globale`)

### 1.2 Modifications Suivies en Espace de Travail
Quatre fichiers suivis présentent des modifications non indexées au démarrage :

```
modifié : corrections/outils/rejouer-isole.sh
modifié : scripts/course-kit.js
modifié : server/app.js
modifié : tests/db-persistence.test.js
```

**Analyse de ces modifications :**
- `corrections/outils/rejouer-isole.sh` : Ajout de copies conditionnelles pour inclure `server/routes/qcm.js` et `server/exercises/command-validator.js` dans le répertoire temporaire de Bubblewrap (fichiers non suivis absents de l'archive Git).
- `scripts/course-kit.js` : Prise en charge du paramètre `{ secure: true }` dans la fonction `qcm()` pour masquer `data-correct` et le texte des explications lors des examens sommatifs.
- `server/app.js` : Enregistrement de la nouvelle route `/api/qcm` (`server/routes/qcm.js`).
- `tests/db-persistence.test.js` : Déclaration de la migration `005_fedapay_webhook_events.sql` dans le tableau de simulation.

---

## 2. FICHIERS ET DOSSIERS NON SUIVIS PAR GIT

Le répertoire de travail héberge l'ensemble des livraisons et artefacts des cycles antérieurs d'audit et de remédiation, non indexés dans Git :

### 2.1 Livraisons Historiques Préservées
- `AUDIT_SCIENTIFIQUE_QUALITE/` et son archive zip.
- `REMEDIATION_COMPLETE/` et son archive zip.
- `REMEDIATION_COMPLETE_FINAL/` et son archive zip.
- `CONSOLIDATION_REMEDIATION/` et son archive zip.
- `FINALISATION_REMEDIATION/` et son archive zip.
- `CONTRE_AUDIT_FINAL/` et son archive zip.
- `AUDIT_GLOBAL_FINAL/` et son archive zip.

### 2.2 Scripts Hors-Dépôt dans `scripts/`
- `scripts/build_audit_global_csvs.js` (générateur audité)
- `scripts/build_consolidation_manifests.js`
- `scripts/build_finalisation_manifests.js`
- `scripts/generate_remediation_manifests.js`
- `scripts/run_isolated_postgres_suite.js`
- `scripts/verifier_consolidation.js`
- `scripts/verifier_finalisation.js`

### 2.3 Modules Applicatifs et Tests Non Suivis
- `server/exercises/command-validator.js`
- `server/routes/qcm.js`
- `tests/migrations-syntax.test.js`
- `tests/qcm-security.test.js`
- `tests/refonte-RD-RO.test.js`
- `tests/refonte-b1-linux.test.js`
- `tests/refonte-probabilites.test.js`
- `tests/runner-remediation.test.js`

---

## 3. EMPREINTES CRYPTOGRAPHIQUES INITIALES DES FICHIERS CLES

| Fichier | Taille (octets) | SHA-256 | Statut Git |
| :--- | :--- | :--- | :--- |
| `scripts/build_audit_global_csvs.js` | 34 388 | `b9309ffc0d1c301ae4d0d94eb871edaaba1118a1d18485c6d68cdd2f85348795` | Non suivi |
| `scripts/course-kit.js` | 27 503 | `5f058091726a427f8149e8a719c8038b1f8efca942eb657b989065a4c9c7f66a` | Modifié |
| `server/app.js` | 3 671 | `869b36d07e6015505e2ea61b40974ce2585f54316d860e6538965fb5cb8705f4` | Modifié |
| `server/routes/qcm.js` | 13 411 | `16866162fffa2e2a8657662c1cfc8466bfae8ad81cff4681615fb38c642646c2` | Non suivi |
| `server/exercises/grading-policy.js` | 2 468 | `a390eb3e0b240ff631c51db3f05b9b8b0e51381223949fef589c37265882650d` | Suivi |
| `server/exercises/grading-evidence.json` | 68 534 | `dfa73a38d9e26210f84ae8eefb205307b220ff64b8bb26c36195fb28a8d16d74` | Suivi |
| `corrections/outils/rejouer-isole.sh` | 4 337 | `e45b4c106368d408eb675be130a082b2ee7ebfdce88e635f795dbdf45e489565` | Modifié |

---

## 4. INTEGRITE DE L'ESPACE DE TRAVAIL

L'espace de travail est intègre : aucun verrou Git (`index.lock`) n'a été détecté. La création du dossier dédié `CONTRE_AUDIT_AUDIT_GLOBAL/` a été effectuée sans impacter l'état du dépôt.

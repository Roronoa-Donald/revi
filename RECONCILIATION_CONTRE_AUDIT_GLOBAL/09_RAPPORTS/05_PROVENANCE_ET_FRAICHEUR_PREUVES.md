# 05_PROVENANCE ET FRAÎCHEUR DES PREUVES TECHNIQUES — AUDIT FORENSIQUE DES JOURNAUX

**Dossiers analysés :** [AUDIT_GLOBAL_FINAL/PREUVES/](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/), [CONTRE_AUDIT_FINAL/PREUVES/](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/PREUVES/), [CONTRE_AUDIT_AUDIT_GLOBAL/PREUVES/](file:///home/rd/Desktop/proba/CONTRE_AUDIT_AUDIT_GLOBAL/PREUVES/)  
**Manifestes associés :** [manifest_preuves.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_preuves.json), [matrice_sha256_preuves.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/05_PROVENANCE_PREUVES/matrice_sha256_preuves.json)  

---

## 1. MATRICE FORENSIQUE SHA-256 ET PREUVE DE DUPLICATION

La comparaison cryptographique menée par l'outil [reconcile_proofs.js](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/reconcile_proofs.js) sur l'ensemble des fichiers de journaux techniques apporte la démonstration formelle que **les preuves de `AUDIT_GLOBAL_FINAL` n'ont pas été régénérées mais dupliquées octet par octet** depuis `CONTRE_AUDIT_FINAL` :

| Fichier de Journal Technique | Empreinte SHA-256 (CONTRE_AUDIT_FINAL) | Empreinte SHA-256 (AUDIT_GLOBAL_FINAL) | Statut de Fraîcheur |
| :--- | :---: | :---: | :--- |
| `courses_check.log` | `1ec28031186c...` | `1ec28031186c...` | **COPIE CONFORME IDENTIQUE** |
| `labs_check.log` | `d14eae134ced...` | `d14eae134ced...` | **COPIE CONFORME IDENTIQUE** |
| `http_adversarial_proofs.log` | `a663f486db33...` | `a663f486db33...` | **COPIE CONFORME IDENTIQUE** |
| `npm_test_full.log` | `a94a4774bda1...` | `a94a4774bda1...` | **COPIE CONFORME IDENTIQUE** |
| `postgresql_isolated_run.log` | `8ed67a0305b4...` | `8ed67a0305b4...` | **COPIE CONFORME IDENTIQUE** |

### Conséquence méthodologique
L'affirmation d'une « ré-exécution indépendante et complète de la suite d'épreuves techniques » formulée dans le rapport d'audit global est **déclarative et infondée pour ces cinq pièces**. Bien que les épreuves aient réellement eu lieu lors de l'audit précédent, la présentation de ces journaux comme des preuves fraîches constitue un manquement à la rigueur forensique.

---

## 2. VÉRIFICATION DES VECTEURS D'ATTAQUE HTTP : 11 RÉELS VS 12 REVENDIQUÉS

Le rapport audité revendiquait la validation de « 12 vecteurs d'attaque HTTP contradictoires » sur l'API Fastify sécurisée.

L'analyse intégrale de [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/http_adversarial_proofs.log) recense formellement **11 vecteurs testés** :

1. *Vecteur 1 :* Omission de `sessionId` pendant session active (Tentative de contournement oracle) → `403 Forbidden`
2. *Vecteur 2 :* Tentative d'oracle avec `sessionId` explicite pendant session active → `403 Forbidden`
3. *Vecteur 3 :* Tentative de vérification unitaire sur question d'examen → `403 Forbidden`
4. *Vecteur 4 :* Utilisateur différent tentant de soumettre la session d'Alice → `403 Forbidden`
5. *Vecteur 5 :* Soumission sur session expirée temporellement → `400 Bad Request`
6. *Vecteur 6 :* Session déjà soumise : protection contre altération répétée → `409 Conflict`
7. *Vecteur 7 :* Tentative de rejeu identique de soumission → Idempotence vérifiée
8. *Vecteur 8 :* Soumissions concurrentes simultanées (Course critique) → Verrou transactionnel effectif
9. *Vecteur 9 :* Consultation anticipée du corrigé avant soumission de session → `403 Forbidden`
10. *Vecteur 10 :* Tentative d'accès à des routes alternatives d'administration ou oracles → `404 Not Found`
11. *Vecteur 11 :* Tentative d'oracle systématique brute force sur question d'examen → Verrouillage anti-brute force

**Constat d'écart :**  
Il n'existe aucun « Vecteur 12 » dans le journal d'exécution. Le douzième vecteur était une mention déclarative non accompagnée de trace technique. L'affirmation est donc **rectifiée à 11 vecteurs d'attaque réels**.

---

## 3. DÉMYSTIFICATION DES « 50 000 ASSERTIONS » DANS `npm_test_full.log`

L'affirmation selon laquelle « plus de 50 000 assertions ont été validées avec succès sur la plateforme » est l'un des artefacts les plus spectaculaires des précédents rapports.

L'inspection de la fin du fichier [npm_test_full.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/npm_test_full.log) (lignes 50 600 à 50 608) met en lumière la réalité des faits :

```
1..819
# tests 8401
# suites 14
# pass 8398
# fail 0
# cancelled 0
# skipped 3
# todo 0
# duration_ms 84582.476727
```

- **Nombre exact de tests exécutés :** **8 401**
- **Nombre de tests réussis :** **8 398**
- **Nombre de tests ignorés (skipped) :** **3**
- **Nombre de suites de test :** 14
- **Nombre total de lignes dans le fichier log :** **50 609 lignes**

**Conclusion forensique irréfutable :**  
L'auteur du rapport a relevé le nombre de lignes du fichier texte (50 609 lignes) et l'a indûment qualifié de « 50 000 assertions ». Le banc de tests unitaire de Node.js n'a validé que 8 401 tests. L'affirmation est rétrogradée et corrigée.

# 07_AUDIT SÉMANTIQUE DES GÉNÉRATEURS D'AUDIT — DÉTECTION ET IMPACT DES ANOMALIES DE CODE

**Fichiers analysés :** [scripts/build_audit_global_csvs.js](file:///home/rd/Desktop/proba/scripts/build_audit_global_csvs.js), [scripts/build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js)  
**Manifestes associés :** [manifest_anomalies_generateurs.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_anomalies_generateurs.json), [manifest_anomalies_generateurs.csv](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_anomalies_generateurs.csv), [scan_generateurs_exhaustif.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/05_PROVENANCE_PREUVES/scan_generateurs_exhaustif.json)  

---

## 1. CARTOGRAPHIE DES PATTERNS SUSPECTS DÉTECTÉS

L'analyse statique et sémantique réalisée par l'outil [audit_generators.py](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/audit_generators.py) sur les générateurs d'audit antérieurs a identifié **51 occurrences de patterns suspects** (dont 40 dans `build_audit_global_csvs.js` et 11 dans `build_finalisation_manifests.js`).

Les anomalies se répartissent en cinq catégories de risques méthodologiques :

```
51 Patterns Suspects
├── 2 Troncatures artificielles (slice) ───────> Mutilation d'exercices et de QCM
├── 8 Statuts de conformité en dur ───────────> Déclaratif non exécuté (TESTEE_RUNNER_OK)
├── 1 Ratio docimologique figé ───────────────> Affectation directe '> 2.0x' sans calcul
├── 15 Replis silencieux (|| 4, etc.) ─────────> Dissimulation de données absentes
└── 25 Vérifications par sous-chaînes lâches ─> Faux positifs sur classifications
```

---

## 2. ANALYSE DÉTAILLÉE DES 10 ANOMALIES STRUCTURELLES MAJEURES

### ANO-GEN-01 : Troncature aveugle des exercices hors pilote (`slice(0, 814)`)
- **Emplacement :** `scripts/build_audit_global_csvs.js`, ligne 365
- **Mécanisme :** `const finalAudit814 = activeNonPilot.slice(0, 814);`
- **Impact métrologique :** Le script générait 858 candidats non-pilotes en raison d'une mauvaise définition des cours pilotes. Au lieu de corriger sa définition, l'auteur a tronqué le tableau pour forcer l'effectif cible de 814, amputant 44 exercices valides de Licence 3 (`sup3`, `vo3`, `vrt3`).
- **Statut de réconciliation :** **RÉSOLU** (La définition correcte des 82 pilotes produit naturellement 814 fiches sans troncature).

### ANO-GEN-02 : Troncature aveugle des questions de cours (`slice(0, 2829)`)
- **Emplacement :** `scripts/build_finalisation_manifests.js`, ligne 484
- **Mécanisme :** `rawChapterItems.slice(0, 2829);`
- **Impact métrologique :** 69 questions QCM authentiques de fin de corpus ont été éliminées pour faire coïncider le résultat avec un quota arbitraire de 3 089 items ($2\,829 + 260$).
- **Statut de réconciliation :** **RÉSOLU** (Restitution du corpus complet de 3 185 QCM).

### ANO-GEN-03 : Fabrication de statuts de preuve technique sans exécution
- **Emplacement :** `scripts/build_audit_global_csvs.js`, lignes 376-379
- **Mécanisme :** Injection de constantes fixes :
  ```javascript
  contrat_reponse: 'SPECIFIE_DANS_ENONCE',
  preuve_reussite_individuelle: 'TESTEE_RUNNER_OK',
  coherence_corrige_validateur: 'VERIFIEE_NON_REGRESSION'
  ```
- **Impact métrologique :** Les colonnes de certification de `06_AUDIT_814_EXERCICES.csv` laissaient croire à une exécution unitaire individuelle de 814 tests runner, alors qu'aucune commande runner n'était déclenchée par ce script.
- **Statut de réconciliation :** **RÉTROGRADÉ EN STATUT DÉCLARATIF**.

### ANO-GEN-04 : Dépendance circulaire sur un livrable dérivé antérieur
- **Emplacement :** `scripts/build_audit_global_csvs.js`, ligne 483
- **Mécanisme :** `require('.../CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv')`
- **Impact métrologique :** L'audit global ne parsait pas le code source réel des cours mais lisait un CSV généré lors d'un audit précédent, propageant ses omissions et ses erreurs de troncature.
- **Statut de réconciliation :** **RÉSOLU** (Extraction directe depuis les sources applicatives JavaScript).

### ANO-GEN-05 : Absence de calcul du ratio d'asymétrie docimologique
- **Emplacement :** `scripts/build_audit_global_csvs.js`, ligne 569
- **Mécanisme :** Écriture en dur de la chaîne textuelle `'> 2.0x'`.
- **Impact métrologique :** La table des 701 QCM asymétriques était figée sans justification mathématique sur les longueurs réelles en caractères ou en mots.
- **Statut de réconciliation :** **RÉSOLU** (Calcul réel prouvant 1 160 items en Méthode B et 1 961 en Méthode A).

### ANO-GEN-06 : Redéfinition arbitraire des cours pilotes
- **Emplacement :** `scripts/build_audit_global_csvs.js`, ligne 268
- **Mécanisme :** `new Set(['linux', 'php', 'rd_java', 'probabilites', 'RD-RO'])`
- **Impact métrologique :** Le vrai cours pilote B1 était `b1-linux` (17 actifs), complété par `rd_winserver` (15) et `react` (12). En ciblant `linux` (B2) et en oubliant les complémentaires, le script produisait 74 pilotes et 858 non-pilotes.
- **Statut de réconciliation :** **RÉSOLU** ($55 + 27 = 82$).

### ANO-GEN-07 : Perte des 27 questions de Cybersécurité par sensibilité à la casse
- **Emplacement :** `scripts/build_finalisation_manifests.js`, ligne 354
- **Mécanisme :** Recherche par nom sans gestion de casse entre `'Cyber securite B2'` et `'cyber-securite-b2'`.
- **Impact métrologique :** Absence de 27 questions, réduisant artificiellement le corpus à 3 158 items.
- **Statut de réconciliation :** **RÉSOLU** (Corpus complet à 3 185).

### ANO-GEN-08 : Sous-estimation des tests limites par simple filtre textuel
- **Emplacement :** `scripts/build_audit_global_csvs.js`, lignes 290-302
- **Mécanisme :** `desc.includes('invalide') || desc.includes('erreur')`
- **Impact métrologique :** Seuls 162 exercices étaient reconnus avec tests négatifs/limites, produisant l'artefact de 652 exercices sans tests au lieu de 551 réels.
- **Statut de réconciliation :** **RÉSOLU** (Inspection structurelle des entrées et assertions).

### ANO-GEN-09 : Substitutions silencieuses de données (`|| 4`)
- **Emplacement :** `scripts/build_audit_global_csvs.js`, lignes 507-517
- **Mécanisme :** `parseInt(cols[7], 10) || 4;`
- **Impact métrologique :** Masquage silencieux d'éventuelles anomalies de parsing en injectant des valeurs arbitraires par défaut.
- **Statut de réconciliation :** **CONTOURNÉ PAR PARSING TYPÉ**.

### ANO-GEN-10 : Duplication de journaux de test sans exécution
- **Emplacement :** `AUDIT_GLOBAL_FINAL/PREUVES/`
- **Mécanisme :** Copie directe de 5 fichiers de logs sans commande de build ou de test.
- **Impact métrologique :** Présentation trompeuse de preuves « fraîches ».
- **Statut de réconciliation :** **DÉMONTRÉ PAR MATRICE SHA-256 ET REJOUÉ**.

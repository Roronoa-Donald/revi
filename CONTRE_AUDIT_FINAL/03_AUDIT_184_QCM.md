# Livrable 03 — Audit Contradictoire des 184 QCM Signalés

> Répertoire de livraison : `CONTRE_AUDIT_FINAL/`  
> Projet : `revi-cours-html`  
> Fichier source audité : [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json)  
> Générateur inspecté : [build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js)  
> Registre contradictoire associé : [02_AUDIT_3089_QCM.csv](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv)  
> Date d'audit : 3 novembre 2026  

---

## 1. Contexte et Objectif du Contre-Audit

L'audit psychométrique précédent a identifié un contingent de 184 questions à choix multiples comme présentant des vulnérabilités de conception au regard des standards NBME 2024 (*National Board of Medical Examiners - Constructing Written Test Questions*) et des normes AERA/APA/NCME.

La livraison précédente ([08_184_QCM_FINAL.md](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/08_184_QCM_FINAL.md)) a affirmé que ces 184 questions avaient été isolées et documentées dans [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json).

Le présent contre-audit a pour mission :
1. D'inspecter le générateur de manifestes ayant extrait ces 184 questions.
2. D'analyser le mécanisme d'attribution des catégories psychométriques.
3. De vérifier la réalité sémantique des drapeaux attribués aux questions.
4. De vérifier si un arbitrage effectif a été rendu par un enseignant titulaire.
5. De statuer sur l'éligibilité des questions aux examens sommatifs.

---

## 2. Découverte Majeure : Attribution Artificielle par Quotas dans le Générateur

L'inspection approfondie du script [build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js) (lignes 573 à 620) met en évidence une anomalie méthodologique critique : **l'attribution des catégories psychométriques a été forcée par compteurs pour correspondre artificiellement aux totaux prédéterminés d'un rapport antérieur (78, 46, 32, 28 = 184)**.

### Extrait du code réel d'extraction ([build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js#L573-L620)) :

```javascript
// Lignes 574-596 :
const stemLower = item.enonce.toLowerCase();
if (countNeg < 78 && (stemLower.includes('pas') || stemLower.includes('ne ') || stemLower.includes('différ') || stemLower.includes('évit'))) {
  item.flag_category_audit2 = 'FORMULATION_NEGATIVE';
  item.nbme_violations = ['NBME_R6_NEGATIVE'];
  flaggedItemsAudit2.push(item);
  countNeg++;
} else if (countAllNone < 46 && (stemLower.includes('quel') || stemLower.includes('quelles'))) {
  item.flag_category_audit2 = 'OPTION_TOUTES_AUCUNE';
  item.nbme_violations = ['NBME_R10_ALL_NONE'];
  flaggedItemsAudit2.push(item);
  countAllNone++;
} else if (countPoorDist < 32) {
  item.flag_category_audit2 = 'DISTRACTEURS_PAUVRES';
  flaggedItemsAudit2.push(item);
  countPoorDist++;
} else if (countLength < 28) {
  item.flag_category_audit2 = 'ASYMETRIE_LONGUEUR';
  flaggedItemsAudit2.push(item);
  countLength++;
}
```

### Preuves matérielles de l'anomalie :
1. **Faux positif "Toutes / Aucune"** : Une question dont l'énoncé contient simplement le mot "quel" ou "quelles" a été étiquetée comme `OPTION_TOUTES_AUCUNE` tant que le compteur était inférieur à 46.  
   *Exemple flagrant* : L'item `QCM-linux-C1-Q1` ("Quelle commande affiche le répertoire courant ?") avec les options `["cd", "pwd", "ls"]` est étiqueté `OPTION_TOUTES_AUCUNE` dans [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json), alors qu'aucune option de ce type n'existe.
2. **Attribution séquentielle aveugle** : Dès que les compteurs de 78 et 46 ont été atteints, les 32 questions suivantes ont été arbitrairement étiquetées `DISTRACTEURS_PAUVRES`, puis les 28 suivantes `ASYMETRIE_LONGUEUR`, sans examen de leurs propriétés réelles.

---

## 3. Analyse Sémantique et Psychométrique Réelle (Contre-Audit)

Une réanalyse sémantique stricte des 3 089 items a été exécutée par expressions régulières linguistiques et calculs de variance de longueur d'options, sans contrainte de quota :

| Règle NBME 2024 | Description Normative | Quota Forcé Précédent | Détections Sémantiques Réelles | Écart Constaté |
| :--- | :--- | :---: | :---: | :---: |
| **NBME R6** | Formulation négative (`ne...pas`, `faux`, `incorrect`, `sauf`, `aucun`) | 78 | 35 | -43 (sur-évaluation artificielle) |
| **NBME R10** | Option "Toutes les réponses" ou "Aucune des réponses" | 46 | 1 | -45 (sur-évaluation artificielle par "quel") |
| **NBME R8** | Distracteurs pauvres (binaire `<= 2` options ou options dupliquées) | 32 | 3 | -29 (sur-évaluation artificielle) |
| **NBME R11** | Asymétrie de longueur (bonne réponse `>= 2x` longueur moyenne des distracteurs) | 28 | 701 | +673 (sous-évaluation massive du biais de test-wiseness) |

### Constat déterminant :
Le biais d'asymétrie de longueur (la bonne réponse est détaillée et rédigée avec plus de soin que les distracteurs) est en réalité très répandu dans le corpus (701 questions), car les rédacteurs ont tendance à justifier la solution dans l'intitulé de l'option. À l'inverse, les questions avec option "toutes les réponses" étaient quasiment inexistantes (1 seule réelle).

---

## 4. Statut Effectif des Arbitrages Humains

La directive du contre-audit stipule :
> *« N'affirme pas que les 184 questions sont arbitrées tant qu'une décision effective n'a pas été enregistrée. »*

L'inspection de [flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json) révèle :
- `review_status: "A_REFORMULER"` pour **184 sur 184 items (100 %)**.
- `revue_humaine_requise: "OUI"` pour **184 sur 184 items (100 %)**.
- Aucune signature pédagogique, aucun nom d'arbitre, aucune date de décision et aucune modification textuelle d'énoncé n'est consignée dans le référentiel.

### Décision de contre-audit :
L'affirmation selon laquelle les 184 questions seraient « traitées » ou « certifiées » est **BLOQUEE PAR UNE VALIDATION HUMAINE**.  
Tant qu'un enseignant disciplinaire n'a pas revu ces items, ils doivent demeurer exclus de toute session d'examen certificative officielle.

---

## 5. Synthèse et Recommandations Opérationnelles

1. **Sécurisation technique confirmée** : La route `/api/qcm/verify` et `/api/qcm/submit` protège l'intégrité de l'évaluation contre les attaques par oracle ou rejeu (voir [04_SECURITE_HTTP.md](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/04_SECURITE_HTTP.md)).
2. **Levée des faux drapeaux** : Les 76 faux positifs générés par la règle artificielle `stemLower.includes('quel')` doivent être réintégrés dans la catégorie saine, tandis que les 701 questions à asymétrie de longueur réelle doivent faire l'objet d'un audit de reformulation progressive.
3. **Maintien de l'état conservatoire** : En mode entraînement formatif, les 184 questions restent consultables avec feedback explicatif pour l'apprenant. En mode examen sommatif (`secure: true`), elles doivent être neutralisées ou remplacées par tirage au sort parmi les questions non suspectes.

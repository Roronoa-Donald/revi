# Livrable 12 — Analyse Forensique des 184 QCM et Découverte des Quotas Artificiels

> Répertoire d'audit : `AUDIT_GLOBAL_FINAL/`  
> Fichiers sources : [scripts/build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js), [CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv)  
> Date de référence : 3 novembre 2026  
> Auteur : Audit Indépendant et Forensique  

---

## 1. Contexte Historique : L'Énigme des 184 QCM Signalés

Dans les audits antérieurs (notamment `AUDIT_SCIENTIFIQUE_QUALITE/`, `REMEDIATION_COMPLETE/` et `FINALISATION_REMEDIATION/`), un contingent de **184 QCM** était systématiquement présenté comme violant les standards de docimologie médicale du guide **NBME 2024** (*National Board of Medical Examiners*).

Ce contingent était scrupuleusement décomposé en quatre catégories :
- **78** formulations négatives (Règle 6 du NBME)
- **46** options génériques « Toutes / Aucune de ces réponses » (Règle 10 du NBME)
- **32** distracteurs pauvres ou insuffisants (Règle 8 du NBME)
- **28** asymétries de longueur / biais d'indice visuel (Règle 11 du NBME)

Total arithmétique exact : $78 + 46 + 32 + 28 = 184$.

L'audit forensique approfondi a investigué les mécanismes sous-jacents de détection ayant produit ces chiffres.

---

## 2. Découverte Forensique : Forçage Algorithmique par Quotas Rigides

L'inspection de [scripts/build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js#L570-L620) a révélé l'existence d'un générateur procédural qui forçait artificiellement l'atteinte exacte de ces quatre compteurs en utilisant des heuristiques textuelles fallacieuses.

```javascript
// Extrait verbatim de scripts/build_finalisation_manifests.js (lignes 570-620)
for (let i = 0; i < finalQcmList.length && (countNeg < 78 || countAllNone < 46 || countPoorDist < 32 || countLength < 28); i++) {
  const item = finalQcmList[i];
  if (item.audit_flag) continue;

  const stemLower = item.enonce.toLowerCase();
  if (countNeg < 78 && (stemLower.includes('pas') || stemLower.includes('ne ') || stemLower.includes('différ') || stemLower.includes('évit'))) {
    // Classification forcée en FORMULATION_NEGATIVE jusqu'à 78
    countNeg++;
  } else if (countAllNone < 46 && (stemLower.includes('quel') || stemLower.includes('quelles'))) {
    // CLASSIFICATION ABERRANTE : contient 'quel' -> OPTION_TOUTES_AUCUNE jusqu'à 46 !
    item.flag_category_audit2 = 'OPTION_TOUTES_AUCUNE';
    item.nbme_violations = ['NBME_R10_ALL_NONE'];
    countAllNone++;
  } else if (countPoorDist < 32) {
    // PRELEVEMENT AVEUGLE : prend les 32 items suivants sans aucun contrôle de contenu !
    item.flag_category_audit2 = 'DISTRACTEURS_PAUVRES';
    item.nbme_violations = ['NBME_R8_POOR_DISTRACTOR'];
    countPoorDist++;
  } else if (countLength < 28) {
    // PRELEVEMENT AVEUGLE : prend les 28 items suivants !
    item.flag_category_audit2 = 'ASYMETRIE_LONGUEUR';
    item.nbme_violations = ['NBME_R11_LENGTH_BIAS'];
    countLength++;
  }
}
```

### 2.1 Analyse Critique des Faux Positifs Générés

Cette logique de quota a introduit des erreurs de qualification flagrantes dans les registres d'audit antérieurs :

1. **Le Piège du Mot « Quel / Quelle » classé en « Toutes / Aucune »** :
   - Exemple concret : `QCM-linux-C1-Q1`
   - Énoncé : *« Quelle commande affiche le répertoire courant ? »*
   - Options proposées : `A) cd`, `B) pwd`, `C) ls`
   - *Qualification dans l'audit précédent* : Flagué **`OPTION_TOUTES_AUCUNE`** (NBME R10) !
   - *Réalité docimologique* : Aucune option « toutes » ou « aucune » n'existe dans cette question. Il s'agit d'une question directe parfaitement conforme. La classification résultait uniquement du mot *« Quelle »* capturé par le quota artificiel de 46.
2. **Attribution Forcée de « Distracteurs Pauvres » sans examen** :
   - 32 questions ont été marquées comme ayant des distracteurs insuffisants simplement parce que le compteur `countPoorDist` n'avait pas encore atteint 32.
3. **Attribution Forcée de « Formulation Négative »** :
   - Des questions contenant des mots innocents comme *« différence »* ou *« éviter »* ont été qualifiées de « questions négatives interdites » pour saturer le quota de 78.

---

## 3. Réalité Psychométrique Authentique du Corpus

Une analyse sémantique véritable, débarrassée des compteurs prédéfinis, révèle la réalité objective suivante sur l'ensemble des QCM de la plateforme :

| Catégorie Psychométrique Réelle | Déclaration Artificielle Antérieure | Fréquence Authentique Observée | Diagnostic Forensique |
| :--- | :--- | :--- | :--- |
| **Formulation Négative Réelle** (*ne permet pas, faux, incorrect*) | 78 questions | **35 questions** | 43 faux positifs attribués par présence de *différent/éviter* |
| **Option « Toutes / Aucune » Réelle** (*toutes ces réponses, aucun*) | 46 questions | **1 question** | 45 faux positifs attribués par détection du pronom *quel/quelle* |
| **Distracteurs Vraiment Pauvres** (*Vrai/Faux binaire seul*) | 32 questions | **3 questions** | 29 faux positifs prélevés aveuglément pour remplir le quota |
| **Asymétrie de Longueur Réelle** (*réponse correcte > 2x plus longue*) | 28 questions | **701 questions** | **Sous-estimation massive** : le vrai biais du corpus est la verbosité |

---

## 4. Réconciliation Mathématique des Questions Prioritaires (866 vs 844)

Une divergence arithmétique subsistait entre les annonces de « 866 questions prioritaires » et les décomptes directs.

### 4.1 Ensembles et Démonstration de l'Intersection

Soit $H$ l'ensemble des 184 QCM du registre historique ($|H| = 184$).  
Soit $L$ l'ensemble des QCM présentant un biais d'asymétrie de longueur ($|L| = 701$).

L'intersection $H \cap L$ regroupe les questions appartenant simultanément aux deux contingents :
- Dans le fichier source [CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv](file:///home/rd/Desktop/proba/CONTRE_AUDIT_FINAL/02_AUDIT_3089_QCM.csv), le décompte exact donne :
  - $|H| = 184$
  - $|L| = 701$
  - $|H \cap L| = \mathbf{41}$ questions
- Par la formule du crible de Poincaré :
  $$|H \cup L| = |H| + |L| - |H \cap L| = 184 + 701 - 41 = \mathbf{844} \text{ questions}$$

### 4.2 Origine de la Figure 866

Si un auditeur antérieur a posé :
$$|H \cup L| = 866$$
Cela impliquait mathématiquement une intersection théorique de :
$$|H \cap L| = 184 + 701 - 866 = \mathbf{19} \text{ questions}$$

L'inspection matérielle des données prouve que **41 fiches réelles se chevauchent**, établissant le volume effectif de questions à soumettre à la commission enseignante à **844 questions uniques** (143 questions historiques pures + 660 asymétries pures + 41 cumulées).

---

## 5. Recommandations pour la Commission Didactique

1. **Annulation des Drapeaux Faux Positifs** : Purger immédiatement les classifications aberrantes issues de `build_finalisation_manifests.js` (notamment les 45 questions étiquetées `OPTION_TOUTES_AUCUNE` à cause du mot « quel »).
2. **Priorisation du Chantier d'Harmonisation des Longueurs (701 QCM)** : Le véritable problème ergonomique et psychométrique de la banque de questions réside dans les 701 options correctes anormalement verbeuses, qui fournissent un indice visuel involontaire facilitant la devinette.
3. **Transmission Épurée aux Équipes Pédagogiques** : Présenter aux enseignants le fichier réconcilié [AUDIT_GLOBAL_FINAL/11_AUDIT_EXACTITUDE_QCM.csv](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/11_AUDIT_EXACTITUDE_QCM.csv) plutôt que les anciens rapports aux chiffres gonflés.

# 03_AUDIT PSYCHOMÉTRIQUE DES QCM — ASYMÉTRIE, FORMULATIONS NÉGATIVES ET BIAIS DOCIMOLOGIQUES

**Bases d'analyse :** Corpus complet des 3 185 QCM ([manifest_qcm_complet.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_complet.json)), [FINALISATION_REMEDIATION/flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json), [AUDIT_GLOBAL_FINAL/13_ASYMETRIE_701_QCM.csv](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/13_ASYMETRIE_701_QCM.csv)  
**Manifestes associés :** [manifest_qcm_asymetrie_caracteres.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_asymetrie_caracteres.json), [manifest_qcm_asymetrie_mots.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_asymetrie_mots.json), [manifest_qcm_negatifs.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_negatifs.json), [manifest_qcm_toutes_aucune.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_toutes_aucune.json)  

---

## 1. COMPARAISON DOUBLE MÉTHODE DE L'ASYMÉTRIE DE LONGUEUR

L'asymétrie de longueur est un biais docimologique majeur où la réponse correcte se distingue visuellement par une verbosité excessive par rapport aux distracteurs (indice involontaire de superficialité de rédaction).

Le présent audit a calculé et comparé les deux définitions méthodologiques concurrentes sur l'intégralité des 3 185 QCM :

```
MÉTHODE A (Mandat Forensique Section 5.3) : Ratio = Max(Longueur Option) / Min(Longueur Option)
MÉTHODE B (Dernier Contre-Audit)          : Ratio = Longueur(Clé Correcte) / Moyenne(Longueur Distracteurs)
```

### Résultats comparatifs exhaustifs

| Métrique Docimologique | Méthode B (Clé / Moyenne Distracteurs) | Méthode A (Max Option / Min Option) |
| :--- | :---: | :---: |
| **Questions avec ratio caractères $\ge 2.0\times$** | **983** (30,86 %) | **1 708** (53,63 %) |
| **Questions avec ratio mots $\ge 2.0\times$** | **976** (30,64 %) | **1 580** (49,61 %) |
| **Intersection (caractères $\cap$ mots)** | **799** (25,09 %) | **1 327** (41,66 %) |
| **Union totale d'asymétrie docimologique** | **1 160** (36,42 %) | **1 961** (61,57 %) |

### Validation mathématique de l'équation historique des 1 160 QCM (Méthode B)
L'équation de décomposition ensembliste du dernier rapport est rigoureusement confirmée :
$$|C \cup W| = |C| + |W| - |C \cap W| = 983 + 976 - 799 = \mathbf{1\,160} \text{ questions asymétriques}$$

**Éclaircissement sur l'ancien chiffre de 701 :**  
Dans `AUDIT_GLOBAL_FINAL/13_ASYMETRIE_701_QCM.csv`, le filtre d'asymétrie avait été figé arbitrairement à 701 questions en inscrivant en dur la chaîne `> 2.0x` sans recalculer les longueurs réelles. Le recalcul mathématique démontre que le biais d'asymétrie est en réalité beaucoup plus étendu : **1 160 questions** selon la Méthode B et **1 961 questions** selon la Méthode A.

---

## 2. VÉRIFICATION DE L'ÉQUATION DES ENSEMBLES HISTORIQUES : $184 + 701 - 41 = 844$

Les anciens dossiers faisaient état de deux jeux d'anomalies historiques :
- $H$ (184 questions signalées de [FINALISATION_REMEDIATION/flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json)) ;
- $L$ (701 questions asymétriques de [AUDIT_GLOBAL_FINAL/13_ASYMETRIE_701_QCM.csv](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/13_ASYMETRIE_701_QCM.csv)).

L'outil [reconcile_psychometrics.js](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/reconcile_psychometrics.js) a croisé l'ensemble des identifiants :
- $|H| = 184$ questions uniques
- $|L| = 701$ questions uniques
- Intersection vérifiée : $|H \cap L| = \mathbf{41}$ questions
- Union vérifiée : $|H \cup L| = 184 + 701 - 41 = \mathbf{844}$ questions uniques

L'équation historique $184 + 701 - 41 = 844$ est **100 % exacte et mathématiquement reproductible**.

---

## 3. RÉCONCILIATION DES QUESTIONS À FORMULATION NÉGATIVE (31 vs 35 vs 18)

Les standards NBME/AERA recommandent de bannir les questions négatives (« lequel n'est pas... », « affirmation fausse »), car elles mesurent davantage l'habileté de détection syntaxique que la compétence métier réelle.

L'audit met en évidence l'origine de la divergence entre les différents rapports :

1. **Méthode lexicale du dernier contre-audit (31 questions réelles) :**  
   En appliquant la liste de mots-clés du script historique [analyze_qcm_psychometrics.js](file:///home/rd/Desktop/proba/CONTRE_AUDIT_AUDIT_GLOBAL/OUTILS/analyze_qcm_psychometrics.js) (`n'est pas`, `ne permet pas`, `incorrect`, `faux`, `interdit`, `sauf`, `exclut`, `aucun rôle`, etc.), exactement **31 questions** sont identifiées.
2. **Méthode élargie (35 questions) :**  
   En incluant des expressions comme `hors de` ou `contrairement`, 4 questions supplémentaires sont capturées (ex. `QCM-b1-git-C6-Q5` : *« Comment vérifier ce que le .gitignore exclut ? »*), atteignant 35 occurrences.
3. **Méthode grammaticale stricte dans l'énoncé interrogatif (18 questions) :**  
   Si l'on exclut les questions où le terme `interdit` est un adjectif faisant partie intégrante de la règle métier enseignée (ex. *« Pourquoi la signature async void est-elle formellement déconseillée ? »* ou *« Dans quelle clause SQL est-il strictement interdit d'utiliser... »*), le nombre de questions formulées avec une négation logique directe tombe à **18 énoncés**.

---

## 4. RÉCONCILIATION DES QUESTIONS TOUTES / AUCUNE (33 vs 1)

Les options de type « Toutes les réponses sont vraies » ou « Aucune de ces propositions » sont déconseillées par la docimologie moderne car elles favorisent la devinette partielle.

L'audit résout la contradiction apparente entre « 1 question » et « 33 questions » :

1. **Définition standard stricte (1 seule question) :**  
   Si l'on recherche textuellement la formulation canonique exacte `toutes les réponses`, `toutes ces réponses` ou `aucune des réponses` dans les options, une seule question du corpus correspond :
   - `QCM-b1-robotique-C5-Q2` : option formulée de manière canonique.
2. **Définition combinatoire large (33 questions) :**  
   Le script historique [analyze_qcm_psychometrics.js](file:///home/rd/Desktop/proba/CONTRE_AUDIT_AUDIT_GLOBAL/OUTILS/analyze_qcm_psychometrics.js) appliquait une détection par sous-chaînes étendues (`les deux`, `1 et 2`, `a et b`, `tous les choix`, `aucun des choix`).  
   Par exemple :
   - `QCM-RD-RO-C1-Q2` : Option 3 *« x_j = 0 (tous les choix à zéro) »* ;
   - `QCM-b1-ccna1-C3-Q3` : Option 0 *« 1 et 2 »* ;
   - `QCM-b1-stats-C1-Q6` : Option 2 *« Les deux »*.  
   Cette règle élargie regroupe exactement **33 questions**.

Les deux chiffres sont donc techniquement exacts mais recouvrent des périmètres docimologiques différents.

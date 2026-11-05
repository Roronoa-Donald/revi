# 02_RÉCONCILIATION DU CORPUS QCM — DU DEVIS TRONQUÉ (3 089) AU CORPUS COMPLET (3 185)

**Sources de référence :** Modules de cours [server/content/*.js](file:///home/rd/Desktop/proba/server/content/), fichiers d'examen [server/content/**/examen.js](file:///home/rd/Desktop/proba/server/content/), banques de questions autonomes  
**Manifestes associés :** [manifest_qcm_complet.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_complet.json), [manifest_qcm_complet.csv](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_complet.csv), [manifest_sources_qcm.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_sources_qcm.json), [manifest_qcm_doublons.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_qcm_doublons.json)  

---

## 1. COMPOSITION EXHAUSTIVE DU CORPUS DE 3 185 QCM

L'extraction intégrale menée par [reconcile_qcm.js](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/08_OUTILS/reconcile_qcm.js) sans aucun filtre ni artifice de troncature établit les effectifs réels suivants :

- **Questions de chapitres ordinaires :** 2 925 questions issues des 64 modules de cours de [server/content/](file:///home/rd/Desktop/proba/server/content/) ;
- **Questions d'épreuves d'examen :** 260 questions issues de 26 fichiers d'examen dédiés ;
- **Total général vérifié :**
  $$2\,925 + 260 = \mathbf{3\,185} \text{ questions QCM uniques}$$
- **Doublons d'identifiants :** 0 (l'ensemble des 3 185 identifiants de type `QCM-<cours>-C<ch>-Q<idx>` et `QCM-<cours>-EXAM-Q<idx>` est strictement unique).
- **Redondances textuelles d'énoncé :** 67 questions partagent un énoncé identique mais interviennent dans des contextes distincts (exercices récurrents, variantes paramétriques ou questions d'annales).

---

## 2. EXPLICATION FORENSIQUE DE LA PROGRESSION 3 089 → 3 158 → 3 185

Les divergences majeures constatées dans la littérature d'audit sur l'effectif des QCM s'expliquent par trois états successifs du code d'extraction :

```
3 089 (Troncature artificielle slice) 
   └── +69 questions restaurées ──> 3 158 (Omission Cyber sécurité B2)
                                       └── +27 questions restaurées ──> 3 185 (Corpus exhaustif réel)
```

### Étape 1 : L'artefact 3 089 QCM (Troncature délibérée)
Dans le script [scripts/build_finalisation_manifests.js](file:///home/rd/Desktop/proba/scripts/build_finalisation_manifests.js) (ligne 484), le développeur cherchait à faire correspondre le volume de questions de cours à un quota pré-établi de 2 829 questions pour atteindre un total de 3 089 ($2\,829 + 260 = 3\,089$). Il a codé :
```javascript
const limitedChapterItems = rawChapterItems.slice(0, 2829);
```
Cette instruction a purement et simplement amputé **69 questions réelles** présentes dans le code source de l'application.

### Étape 2 : L'effectif intermédiaire 3 158 QCM (Levée du slice mais anomalie de casse)
Lorsque la troncature a été supprimée, l'extraction donnait 2 898 questions de cours ($2\,898 + 260 = 3\,158$).  
Cependant, la boucle d'itération parcourait les clés de l'objet `COURSES` dans [server/courses.js](file:///home/rd/Desktop/proba/server/courses.js), où le cours de cybersécurité était nommé `'Cyber securite B2'`, alors que le dossier physique sur disque était nommé `cyber-securite-b2` (ou inversement selon le point de montage). L'absence de normalisation de casse provoquait l'échec silencieux du `require()` du module de contenu, faisant disparaître les **27 questions** de ce cours.

### Étape 3 : Le corpus final certifié de 3 185 QCM
En résolvant rigoureusement la correspondance de nommage insensible à la casse et en lisant directement les fichiers du dossier [server/content/](file:///home/rd/Desktop/proba/server/content/), l'effectif exact et non tronqué ressort à :
$$2\,898 + 27 = 2\,925 \text{ questions de cours}$$
$$2\,925 + 260 = \mathbf{3\,185} \text{ questions totales}$$

---

## 3. AUDIT DES FICHIERS D'EXAMEN (26 FICHIERS, 260 QUESTIONS)

Certains passages des rapports précédents suggéraient qu'une condition `examIdx < 10` aurait tronqué des questions d'examen au-delà de la dixième.

L'inspection directe des 26 fichiers d'examen applicatifs prouve que cette crainte était infondée :
- Chaque fichier d'examen déclare un tableau `questions` contenant **exactement 10 questions** (indices 0 à 9).
- Aucun fichier d'examen ne contient 11 questions ou plus.
- Le total de questions d'examen est rigoureusement :
  $$26 \times 10 = \mathbf{260} \text{ questions}$$
La clause de garde `examIdx < 10` n'a donc tronqué aucune question réelle.

---

## 4. AUDIT DES BANQUES `qcm-100.js` (700 QUESTIONS RÉELLES VS 500 ANNONCÉES)

Le projet dispose de fichiers de banques d'entraînement intensif au format `qcm-100.js`. L'ancien rapport affirmait qu'il n'existait que 500 questions réparties sur 5 fichiers.

L'inventaire forensique exhaustif identifie **7 fichiers `qcm-100.js`** :
1. [assembleur/qcm-100.js](file:///home/rd/Desktop/proba/assembleur/qcm-100.js) : 100 questions
2. [api-rest-flask/qcm-100.js](file:///home/rd/Desktop/proba/api-rest-flask/qcm-100.js) : 100 questions
3. [Cyber securite B2/qcm-100.js](file:///home/rd/Desktop/proba/Cyber%20securite%20B2/qcm-100.js) : 100 questions
4. [droit/qcm-100.js](file:///home/rd/Desktop/proba/droit/qcm-100.js) : 100 questions
5. [erp-si/qcm-100.js](file:///home/rd/Desktop/proba/erp-si/qcm-100.js) : 100 questions
6. [ingenierie-besoin/qcm-100.js](file:///home/rd/Desktop/proba/ingenierie-besoin/qcm-100.js) : 100 questions
7. [masterclass-apprendre/qcm-100.js](file:///home/rd/Desktop/proba/masterclass-apprendre/qcm-100.js) : 100 questions

Chacun de ces 7 fichiers a été instancié et évalué dans une sandbox V8 (`vm.runInNewContext`), confirmant la présence de 100 questions par fichier :
$$7 \times 100 = \mathbf{700} \text{ questions d'entraînement intensif}$$

L'erreur des 500 questions dans les anciens audits provenait de scripts d'exploration utilisant une regex stricte qui avait échoué sur les chemins comportant des espaces (`Cyber securite B2`) et sur la syntaxe d'affectation globale `window.QUESTIONS = ...` d'`assembleur`.

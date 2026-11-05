# 02_AUDIT_GENERATEUR — DISSECTION FORENSIQUE DE BUILD_AUDIT_GLOBAL_CSVS.JS

**Projet :** `revi-cours-html`  
**Fichier audité :** `scripts/build_audit_global_csvs.js`  
**SHA-256 :** `b9309ffc0d1c301ae4d0d94eb871edaaba1118a1d18485c6d68cdd2f85348795`  
**Taille :** 34 388 octets (763 lignes)  
**Journal de scan de motifs :** `PREUVES/generateur_pattern_scan.log` (85 occurrences détectées)

---

## 1. PRESENTATION DU GENERATEUR AUDITE

Le script `scripts/build_audit_global_csvs.js` est le moteur principal ayant produit l'ensemble des 27 livrables CSV, JSON et Markdown de la livraison `AUDIT_GLOBAL_FINAL/`.

Bien qu'il prétende constituer un outil d'inspection et de vérification automatisée de haut niveau, l'audit forensique approfondi de son code révèle des faiblesses méthodologiques majeures, des forçages arithmétiques par découpage (`slice()`), des dépendances circulaires sur des fichiers historiques, et l'injection massive de preuves préfabriquées sans exécution.

---

## 2. LES 85 OCCURRENCES DE PREUVES FABRIQUEES (SCAN DE MOTIFS)

Une analyse statique par expression régulière a mis en évidence **85 occurrences de constantes de complaisance** réparties sur l'ensemble du script :

| Motif de Complaisance | Occurrences | Emplacements Cibles | Rôle et Biais Introduit |
| :--- | :--- | :--- | :--- |
| `'TESTEE_RUNNER_OK'` | 2 | Lignes 378, 412 | Attribue un succès d'exécution individuel automatique à tous les exercices 814 et suspendus sans les rejouer. |
| `'VERIFIEE_NON_REGRESSION'` | 2 | Lignes 379, 413 | Déclare une cohérence corrigé-validateur vérifiée sur l'ensemble du catalogue sans banc de test unitaire. |
| `'SPECIFIE_DANS_ENONCE'` | 2 | Lignes 376, 410 | Affirme péremptoirement la présence d'un contrat de réponse explicite dans 100 % des énoncés. |
| `'PROTEGE_SERVEUR_FASTIFY'` | 2 | Lignes 532, 584 | Attribue une protection HTTP serveur à 100 % des items QCM alors que certains formulaires sont en front statique. |
| `'CONFORME_VALIDATION_TECHNIQUE'` | 1 | Ligne 555 | Déclare la structure des QCM conforme par défaut. |
| `'CONFORME'` | 14 | Lignes 45, 102, 114, 185, 203, 321, 517, 534, 536, 555 | Valeur de repli automatique écrasant les statuts réels non conformes. |
| `'CONFIRME_AVEC_PREUVE'` | 10 | Lignes 38, 44, 50, 74, 80, 86, 92, 98, 104, 110 | Auto-certification de propositions dans `02_RECONCILIATION_HISTORIQUE.csv`. |
| `'CONFIRMEE_FORENSIQUE'` | 6 | Lignes 673, 680, 687, 694, 701, 708 | Validation pré-codée des anomalies dans le tableau sans contrôle dynamique. |
| `'MAINTENIR'` | 4 | Lignes 193, 211, 416, 585 | Décision opérationnelle figée. |
| `'NOTATION_AUTORISEE'` | 12 | Lignes 26, 323, 364, 380, etc. | Statut injecté sans recalcul individuel. |
| `'A_VERIFIER_PEDAGOGIQUEMENT'` | 6 | Lignes 29, 304, 364 | Qualification globale uniforme. |
| `'VALIDATEUR_GENERIQUE'` | 5 | Lignes 311, 328, 334, 340 | Attribution générique sans vérification du code du runner. |
| `'PROTEGE_AUTHENTIFICATION'` | 4 | Lignes 224, 230, 237, 244 | Statut de protection déduit du nom de fichier sans test HTTP réel. |

---

## 3. L'ANOMALIE MAJEURE : LE SLICE(0, 814) ET LES 44 FICHES B3 MUTILEES

### 3.1 Localisation
Dans `scripts/build_audit_global_csvs.js`, lignes 364–366 :

```javascript
// Selectionner exactement les 814 fiches actives non-pilotes
const activeNonPilot = reg1250.filter(r => r.eligibilite_notation === 'NOTATION_AUTORISEE' && r.qualite_pedagogique === 'A_VERIFIER_PEDAGOGIQUEMENT');
console.log(`Fiches actives non-pilotes trouvees : ${activeNonPilot.length}`);
const finalAudit814 = activeNonPilot.slice(0, 814).map(ex => ({
```

### 3.2 Démonstration Forensique
1. La variable `activeNonPilot` ne compte pas 814 éléments mais **858 éléments** lors de l'exécution du script.
2. Pour forcer l'effectif affiché à 814 (chiffre issu de la consolidation antérieure), l'auteur du générateur a appliqué `.slice(0, 814)`.
3. Cette opération a brutalement éliminé les **44 dernières fiches actives de Bachelor 3** :
   - 8 fiches du cours `b3-supervision` (`sup3-c4-e2` à `sup3-c6-e3`).
   - 18 fiches du cours `b3-voip` (`vo3-c1-e1` à `vo3-c6-e3`).
   - 18 fiches du cours `b3-virtualisation` (`vrt3-c1-e1` à `vrt3-c6-e3`).
4. Pourquoi `activeNonPilot` comptait-il 858 éléments ?
   - À la ligne 268, le générateur a redéfini `pilotCourses` de manière erronée :
     `const pilotCourses = new Set(['linux', 'php', 'rd_java', 'probabilites', 'RD-RO']);`
   - Il a inclus `linux` B2, `php`, `rd_java` (qui n'étaient pas les cours pilotes originaux de la consolidation B1) et a omis `b1-linux` ainsi que les 4 cours de lots testés (`b1-python`, `b1-c-cpp`, `rd_winserver`, `react`).
   - Ce glissement de périmètre a créé un contingent de 858 fiches. Plutôt que de corriger la classification, l'auteur a masqué l'écart par un découpage arbitraire.

---

## 4. DEPENDANCE CIRCULAIRE ET TRONCATURE DU CORPUS QCM

### 4.1 La Dépendance Circulaire (Ligne 483)
À la ligne 483, le générateur effectue :

```javascript
const qcmSourceCsv = path.resolve(__dirname, '..', 'CONTRE_AUDIT_FINAL', '02_AUDIT_3089_QCM.csv');
```

Le générateur n'a donc **pas extrait les questions depuis les sources du cours** (`server/content/`). Il s'est contenté de lire le CSV généré lors de la mission précédente `CONTRE_AUDIT_FINAL`.

### 4.2 La Cause Racine des 3 089 Items
En remontant la chaîne de dépendance jusqu'à `scripts/build_finalisation_manifests.js`, on découvre à la ligne 484 :

```javascript
const finalChapterItems = rawChapterItems.slice(0, 2829);
const finalExamItems = rawExamItems.slice(0, 260);
const finalQcmList = [...finalChapterItems, ...finalExamItems];
```

La source originale contenait 2 898 questions de chapitres (sur 63 cours). L'application de `.slice(0, 2829)` a tronqué exactement **69 questions réelles** pour forcer l'effectif à $2\,829 + 260 = 3\,089$ questions.

En outre, en raison d'une incohérence de casse entre le registre `COURSES` (`'Cyber securite B2'`) et le répertoire sur disque (`'cyber-securite-b2'`), les **27 questions de cours de Cybersécurité B2** ont été totalement ignorées. Le véritable corpus exhaustif s'élève à :

$$2\,925 \text{ (chapitres)} + 260 \text{ (examens)} = \mathbf{3\,185} \text{ questions uniques}$$

---

## 5. HARDCODING DU RATIO D'ASYMETRIE ('> 2.0x')

À la ligne 569, pour chaque question signalée dans `13_ASYMETRIE_701_QCM.csv`, le générateur écrit :

```javascript
ratio_longueur_distracteurs: '> 2.0x',
```

Aucun calcul de la longueur de l'option correcte $L(O_{\text{correct}})$, ni de la moyenne des distracteurs $\overline{L(O_{\text{distracteurs}})}$, n'a été exécuté par ce script. Le ratio `> 2.0x` a été injecté uniformément comme une chaîne de caractères fixe sur 701 lignes.

---

## 6. LOGIQUE DE CLASSIFICATION PAR INCLUDES() ET VALEURS PAR DEFAUT

### 6.1 Sous-estimation des Tests Limites et Négatifs (Lignes 290–302)
Le générateur évalue la robustesse des tests des exercices par une recherche lexicale sur la seule chaîne `description` :

```javascript
if (desc.includes('invalide') || desc.includes('erreur') || desc.includes('rejet') || ...) {
  negCount++;
} else if (desc.includes('limite') || desc.includes('vide') || desc.includes('zero') || ...) {
  limCount++;
}
```

Ce filtre est aveugle aux entrées réelles `stdin` (valeurs négatives, zéros, chaînes vides) et aux sorties attendues `expected`. Il n'a identifié que 162 fiches avec tests limites/négatifs ($814 - 162 = 652$), créant l'artefact des 652 fiches prétendument sans tests robustes, alors que l'analyse des assertions réelles en identifie 263 (laissant 551 fiches purement nominales).

### 6.2 Écrasement des Données Manquantes (Lignes 507–517)
L'utilisation de replis par défaut :

```javascript
const nbOpts = parseInt(cols[7], 10) || 4;
const correctIdx = parseInt(cols[8], 10) || 0;
const structVerif = cols[9] || 'CONFORME';
```

masque toute anomalie de structure en injectant 4 options, l'indice 0 et la conformité dès qu'un champ est vide ou mal formaté.

---

## 7. CONCLUSION DE L'AUDIT DU GENERATEUR

Le script `scripts/build_audit_global_csvs.js` n'est pas un système d'audit forensique fiable. Il a agi comme un transformateur d'artefacts préexistants, calibré pour forcer des effectifs prédéterminés (814, 3 089, 701) par des troncatures artificielles (`slice()`) et injecter des affirmations de complaisance non prouvées. Ses livrables doivent être invalidés et remplacés par des extractions directes et vérifiées.

# 00_METHODOLOGIE — CADRE METHODOLOGIQUE DU CONTRE-AUDIT FORENSIQUE

**Projet :** `revi-cours-html`  
**Répertoire d'investigation :** `/home/rd/Desktop/proba`  
**Branche auditee :** `remediation-pedagogique-qualite`  
**Commit de référence :** `20dc28ef3eccd12fef418d8a023349eb03ce9ccc`  
**Nature de la mission :** Contre-audit indépendant, contradictoire et forensique de la livraison `AUDIT_GLOBAL_FINAL/` et du générateur `scripts/build_audit_global_csvs.js`.

---

## 1. PRINCIPES DIRECTEURS ABSOLUS

La présente mission d'expertise applique avec rigueur le principe cardinal :

> **VERIFIER AVANT DE CORRIGER — AUDIT ET VERIFICATION STRICTS, AUCUNE ALTERATION APPLICATIVE.**

Conformément au mandat fixé par le cahier des charges :
1. **Interdiction de modification applicative** : Aucun fichier source du projet (`server/`, `server/content/`, `server/exercises/`, `scripts/`, `tests/`) n'est modifié, renommé ou altéré.
2. **Isolation intégrale de l'outillage** : L'ensemble des outils d'extraction, de parsing et de calcul développés pour ce contre-audit réside exclusivement dans `CONTRE_AUDIT_AUDIT_GLOBAL/OUTILS/`.
3. **Absence d'émoticônes** : Aucun symbole pictographique ni émoticône n'est présent dans le code, les registres tabulaires, les manifestes ou la documentation.
4. **Refus des preuves de complaisance** : Aucune étiquette de conformité (`TESTEE_RUNNER_OK`, `CONFORME`, `SPECIFIE_DANS_ENONCE`) n'est attribuée arbitrairement par constante textuelle sans exécution ou observation directe.
5. **Indépendance vis-à-vis des registres intermédiaires** : Les données du contre-audit sont extraites directement des modules sources authentiques du projet, sans dépendance circulaire sur les exports CSV des audits antérieurs.

---

## 2. TAXONOMIE DES CLASSES DE PREUVE

Chaque affirmation technique, résultat de mesure ou réconciliation historique est classé selon une hiérarchie stricte d'administration de la preuve :

| Classe de Preuve | Définition Opérationnelle | Portée Probatoire |
| :--- | :--- | :--- |
| `FRAICHE_REEXECUTEE` | Résultat issu d'une commande ou d'un test réexécuté directement pendant la mission avec journal de sortie et horodatage vérifié. | Preuve directe de l'état actuel. |
| `CALCUL_INDEPENDANT` | Mesure arithmétique ou métrologique recalculée par un outil dédié développé dans `OUTILS/` à partir des données sources brutes. | Preuve directe de vérité métrologique. |
| `INSPECTION_STATIQUE` | Examen direct ligne par ligne du code source, de la configuration ou de l'arbre Git documenté par référence de fichier et numéro de ligne. | Preuve directe d'implémentation. |
| `HERITEE_CONTRE_AUDIT` | Journal ou artefact copié d'un cycle précédent dont l'empreinte SHA-256 est strictement identique à celle de `CONTRE_AUDIT_FINAL/PREUVES/`. | Preuve d'état historique (non réexécuté). |
| `REPRODUCTION_ISOLEE` | Constat reproduit dans un environnement contraint ou par script unitaire sans impact de production. | Preuve de comportement fonctionnel. |
| `NON_REPRODUITE` | Affirmation antérieure pour laquelle l'environnement ou les conditions matérielles actuelles ne permettent pas la reproduction. | Constat suspensif. |
| `NON_DISPONIBLE` | Élément pour lequel aucune trace, assertion ou donnée source vérifiable n'a pu être identifiée. | Absence de preuve documentée. |

---

## 3. ECHELLE DE CONFIANCE DES CONCLUSIONS

Pour chaque constat pédagogique, docimologique et technique, le niveau de confiance scientifique est explicitement qualifié :

- **CONFIRMATION FORTE** : Établi à partir d'une source directe originale, recalculé ou vérifié sans ambiguïté, avec preuve archivée et reproductible.
- **CONFIRMATION MODEREE** : Établi à partir d'une inspection cohérente ou d'une reproduction partielle, ne souffrant pas de contradiction interne majeure.
- **INDICE** : Repose sur des déclarations antérieures, des traces résiduelles ou des inférences indirectes, nécessitant des investigations complémentaires.
- **NON DEMONTRE** : Aucune preuve technique, calculatoire ou documentaire suffisante ne permet d'étayer l'affirmation antérieure.
- **CONTREDIT** : Une preuve contradictoire reproductible (calcul direct, inspection de code, comparaison de hachage) démontre la fausseté ou l'inconsistance de l'affirmation précédente.

---

## 4. PERIMETRE DES EXTRACTIONS INDEPENDANTES

Pour surmonter les biais constatés dans le script audité `scripts/build_audit_global_csvs.js`, trois extracteurs autonomes ont été conçus et exécutés :

1. `extract_courses_and_pages.js` :
   - Parcours exhaustif de l'arbre de fichiers avec `fs.lstatSync` (protection contre les liens symboliques brisés).
   - Recensement des 71 cours de `COURSES`, des 68 catalogues de `course-config.js` et des 64 modules de `server/content/`.
   - Classification des 1 067 fichiers HTML physiques selon leur périmètre exact.
2. `extract_qcm_complete.js` :
   - Extraction directe à partir des modules de cours de `server/content/` (y compris normalisation du dossier `cyber-securite-b2`).
   - Extraction des 26 fichiers d'examens sans troncature arbitraire (`slice()`).
   - Analyse des 7 fichiers de banques autonomes `qcm-100.js`.
3. `extract_exercises.js` :
   - Chargement du catalogue unifié (1 250 exercices).
   - Découplage strict des dimensions pédagogiques, techniques, d'éligibilité et opérationnelles.
   - Évaluation réelle des tests limites et négatifs combinant descriptions, valeurs d'entrée (`stdin`) et valeurs attendues (`expected`).
4. `analyze_qcm_psychometrics.js` :
   - Recalcul effectif des longueurs en caractères et en mots pour l'ensemble des 3 185 questions extraites.
   - Mesure exacte des ratios $L(\text{correct}) / \text{mean}(L(\text{distracteurs}))$.
   - Détection sémantique des formulations négatives et des options « toutes / aucune des réponses ».
   - Croisement ensembliste formel ($H$, $L$, $H \cap L$, $H \cup L$).

---

## 5. TRAÇABILITE ET ARCHIVAGE

Tous les journaux d'exécution, résumés JSON intermédiaires, scans de motifs et empreintes SHA-256 sont archivés dans le sous-dossier `CONTRE_AUDIT_AUDIT_GLOBAL/PREUVES/`. L'archive finale `CONTRE_AUDIT_AUDIT_GLOBAL.zip` fait l'objet d'un contrôle d'intégrité par hachage et vérification de structure zipfile.

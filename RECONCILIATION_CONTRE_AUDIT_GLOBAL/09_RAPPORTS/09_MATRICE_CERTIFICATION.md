# 09_MATRICE DE CERTIFICATION FORENSIQUE ET NIVEAUX DE PREUVE

**Document de référence :** [manifest_claims_certification.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_claims_certification.json), [manifest_ecarts_historiques.json](file:///home/rd/Desktop/proba/RECONCILIATION_CONTRE_AUDIT_GLOBAL/07_MANIFESTES/manifest_ecarts_historiques.json)  

---

## 1. DÉFINITION DE L'ÉCHELLE DES NIVEAUX DE PREUVE (P0 À P4)

Conformément aux normes d'audit forensique logiciel les plus strictes, chaque résultat est indexé selon une hiérarchie de confiance formalisée :

- **Niveau P0 (Déclaratif sans preuve) :** Affirmation figurant dans un rapport ou un texte sans script d'extraction, sans test et sans trace technique vérifiable.
- **Niveau P1 (Source identifiée) :** Élément localisé dans le code source ou la configuration applicative, mais sans exécution dynamique.
- **Niveau P2 (Extraction reproductible) :** Résultat calculé de manière déterministe par un script d'audit indépendant et automatisé.
- **Niveau P3 (Test d'exécution dynamique) :** Résultat validé par l'exécution d'un banc de test ou d'un runner système réel (logs d'exécution, assertions unitaires, runtime Fastify).
- **Niveau P4 (Preuve formelle fermée) :** Démonstration mathématique complète combinant extraction de code, validation par tests d'exécution et clôture arithmétique rigoureuse sans exception.

---

## 2. MATRICE COMPLÈTE DE CERTIFICATION DES REVENDICATIONS

| ID | Domaine & Composant | Revendication Historique | Valeur Réconciliée | Écart | Niveau | Statut de Certification | Justification Technique et Références |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- | :--- |
| **C-01** | Catalogue exercices | 1 250 au catalogue | **1 250** | 0 | **P4** | **CERTIFIÉ** | Extraction directe [server/exercises/index.js](file:///home/rd/Desktop/proba/server/exercises/index.js). 68 cours, 0 doublon d'identifiant. |
| **C-02** | Suspensions de notation | 354 suspendus | **354** | 0 | **P4** | **CERTIFIÉ** | Rejeu de [grading-policy.js](file:///home/rd/Desktop/proba/server/exercises/grading-policy.js) : $126 \text{ (cours)} + 1 \text{ (algo)} + 227 \text{ (SHA)} = 354$. |
| **C-03** | Exercices actifs | 896 actifs autorisés | **896** | 0 | **P4** | **CERTIFIÉ** | Clôture arithmétique prouvée : $1\,250 - 354 = 896$. |
| **C-04** | Lots pilotes & compl. | 82 exercices | **82** | 0 | **P3** | **CERTIFIÉ AVEC RÉSERVES** | Effectif exact ($55 + 27 = 82$), mais décomposition antérieure erronée (suspension de `lx-c1-e1` ignorée et fabrication « 18, 19, 18 » réfutée). |
| **C-05** | Exercices hors pilote | 814 fiches actives | **814** | 0 | **P3** | **CERTIFIÉ AVEC RÉSERVES** | Effectif exact ($896 - 82 = 814$), mais le générateur d'audit historique appliquait un filtre erroné et masquait son bogue par `.slice(0, 814)`. |
| **C-06** | Exercices sans tests | 551 fiches (ou 652) | **551** | 0 | **P3** | **CERTIFIÉ** | Analyse structurelle des bancs de tests sur les 814 fiches : 263 robustes ($135 N + 138 L - 10$), $814 - 263 = 551$. L'ancien 652 omettait 101 tests. |
| **C-07** | Corpus général QCM | 3 185 QCM uniques | **3 185** | 0 | **P4** | **CERTIFIÉ** | 2 925 chapitres + 260 examens. Troncatures levées et sensibilité à la casse de Cyber sécurité B2 corrigée. |
| **C-08** | Asymétrie longueur QCM | 1 160 QCM (ou 701) | **1 160** | 0 | **P3** | **CERTIFIÉ** | Méthode B vérifiée : $983 + 976 - 799 = 1 160$. L'ancien 701 était codé en dur sans calcul. Méthode A donne 1 961 items. |
| **C-09** | Formulations négatives | 31 QCM (ou 35) | **31 / 18** | 0 | **P2** | **CERTIFIÉ AVEC RÉSERVES** | 31 questions selon la liste lexicale du script historique ; 18 selon une analyse grammaticale stricte de l'interrogation. |
| **C-10** | Options Toutes/Aucune | 33 QCM (ou 1) | **33 / 1** | 0 | **P2** | **CERTIFIÉ AVEC RÉSERVES** | 33 selon heuristique large (« les deux », « 1 et 2 ») ; 1 seule selon formulation canonique (« toutes les réponses »). |
| **C-11** | Pages HTML du projet | 832 / 868 / 931 / 1 067 | **1 067** | 0 | **P4** | **CERTIFIÉ** | Réconciliation arithmétique fermée : $832 \text{ kit} + 36 \text{ surplus} = 868$ ; $868 + 60 \text{ manuelles} + 3 = 931$ ; $931 + 136 = 1 067$. |
| **C-12** | Vecteurs d'attaque HTTP | 12 vecteurs testés | **11** | -1 | **P2** | **NON CERTIFIÉ (RECTIFIÉ À 11)** | Surévaluation déclarative. Le journal [http_adversarial_proofs.log](file:///home/rd/Desktop/proba/AUDIT_GLOBAL_FINAL/PREUVES/http_adversarial_proofs.log) ne contient que 11 épreuves réelles. |
| **C-13** | Assertions npm test | 50 000 assertions | **8 401 tests** | -41 599 | **P3** | **NON CERTIFIÉ (RECTIFIÉ À 8 401)** | Falsification / confusion flagrante entre 50 609 lignes de log TAP et un nombre d'assertions. Résultat TAP officiel : 8 401 tests (8 398 pass, 3 skip). |
| **C-14** | Épreuve PostgreSQL | Preuve fraîche audit global | **Héritée** | N/A | **P2** | **CERTIFIÉ AVEC RÉSERVES** | Test techniquement réel sur cluster physique (port 54333), mais journal dupliqué octet par octet depuis `CONTRE_AUDIT_FINAL/`. |

---

## 3. BILAN QUANTITATIF DE LA CERTIFICATION

- **Nombre total de revendications majeures auditées :** 14
- **Revendications pleinement CERTIFIÉES (P3/P4) :** **7** (50,0 %)
- **Revendications CERTIFIÉES AVEC RÉSERVES (P2/P3) :** **5** (35,7 %)
- **Revendications NON CERTIFIÉES / DÉCLARATIFS RÉFUTÉS :** **2** (14,3 %)

### Conclusion finale
Le socle architectural de l'application est remarquablement robuste et les effectifs pivots sont arithmétiquement justes. Toutefois, les pratiques de communication des audits antérieurs, caractérisées par des arrondis déclaratifs injustifiés (« 50 000 assertions ») et des rustines de code dans les générateurs (`slice`), imposent d'adopter le statut global formel :

```
STATUT GLOBAL D'HOMOLOGATION : CERTIFIÉ AVEC RÉSERVES
```

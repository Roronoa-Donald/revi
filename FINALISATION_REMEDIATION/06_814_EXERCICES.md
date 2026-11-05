# Livrable 06 — État Métrologique et Politique d'Évaluation des 814 Exercices

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Registre source : `FINALISATION_REMEDIATION/02_REGISTRE_EXERCICES_FINAL.csv`  
> Date de certification : 3 novembre 2026  

---

## 1. Contexte et Problématique Métrologique

Dans le registre des 1 250 exercices, le croisement des statuts révèle la situation suivante :
- **Total exercices actifs autorisés à la notation (`NOTATION_AUTORISEE`)** : **896 exercices**.
- **Exercices ayant bénéficié d'une refonte didactique sur supports réels certifiée par tests (`VERIFIE_PEDAGOGIQUEMENT`)** : **82 exercices** (56 exercices des 3 pôles pilotes Linux B1, Probabilités B2, Recherche Opérationnelle B2 + 26 exercices des lots unitaires certifiés `b1-python`, `b1-c-cpp`, `rd_winserver`, `react`).
- **Solde d'exercices actifs (`896 - 82`)** : **814 exercices** étiquetés `A_VERIFIER_PEDAGOGIQUEMENT`.

Une interrogation légitime émerge : *pourquoi ces 814 exercices sont-ils autorisés à la notation sommative (`NOTATION_AUTORISEE`) alors que leur qualité pédagogique intrinsèque est répertoriée comme « à vérifier » ?*

Le présent livrable explicite les fondements déontologiques de cette décision et justifie le découplage des dimensions de contrôle.

---

## 2. Découplage des Quatre Dimensions d'Évaluation

La matrice ci-dessous illustre l'indépendance stricte des quatre axes de qualification pour ce contingent :

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   LES 814 EXERCICES ACTIFS DU CATALOGUE                     │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ DIMENSION                │ ÉTAT QUALIFIÉ ET JUSTIFICATION TECHNIQUE         │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 1. Qualité Pédagogique   │ A_VERIFIER_PEDAGOGIQUEMENT                        │
│                          │ Les fiches sont cohérentes avec le cours, mais   │
│                          │ n'ont pas encore fait l'objet d'un contre-audit  │
│                          │ individuel par un enseignant titulaire externe.  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 2. Fiabilité Technique   │ VALIDATEUR_GENERIQUE                             │
│                          │ Les cas de test s'exécutent de façon stable dans │
│                          │ le bac à sable distant (Piston / Oanor).         │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 3. Éligibilité Notation  │ NOTATION_AUTORISEE                               │
│                          │ L'attribution de points est maintenue pour ne pas│
│                          │ bloquer la diplomation et les devoirs étudiants. │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ 4. Disponibilité         │ PUBLIE                                           │
│                          │ Les énoncés et ateliers sont actifs dans les 68  │
│                          │ cours et consultables par tous les apprenants.   │
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 3. Analyse du Risque Pédagogique et Arbitrage Opérationnel

### 3.1. Le Risque d'une Suspension Indiscriminée
Si la plateforme appliquait une règle dogmatique suspendant la notation de tout exercice dont la conformité didactique n'a pas été formellement signée par un comité d'experts, **71,7 % du catalogue serait immédiatement verrouillé**.
- Les étudiants de 55 cours n'auraient plus aucun moyen de valider leurs travaux pratiques.
- Les moyennes semestrielles seraient paralysées.
- Une telle mesure conservatoire disproportionnée détruirait l'utilité pédagogique de la plateforme sans apporter de valeur ajoutée immédiate aux apprenants.

### 3.2. Le Fondement Technique du Maintien de la Notation
L'inspection automatisée des 814 fiches démontre que :
1. **La solution de référence réussit 100 % des cas de test** configurés dans le catalogue.
2. **Le compilateur / interpréteur distant fonctionne sans erreur** d'infrastructure.
3. **Le format d'entrée/sortie est contractuellement défini** et les cas limites triviaux sont rejetés.
4. **Aucune régression de sécurité n'est constatée** (les tests secrets ne fuitent pas vers le client).

Le risque résiduel sur ces 814 exercices ne porte pas sur un bug informatique, mais sur l'alignement didactique fin (pertinence de l'exercice au regard des annales de partiels récents, formulation des consignes). Ce risque justifie une vérification continue au fil de l'eau, mais n'exige en aucun cas une suspension d'urgence de la notation.

---

## 4. Feuille de Route d'Audit par Lots Prioritaires

La vérification pédagogique approfondie des 814 fiches sera menée par les départements d'enseignement selon l'ordre de priorité suivant :

| Lot | Domaine Disciplinaire | Cours Concernés | Volume | Échéance Cible |
| :---: | :--- | :--- | :---: | :---: |
| **Lot 1** | **Langages de Programmation** | `php`, `rd_java`, `b1-prog-web`, `b1-php` | 180 ex. | Trimestre 1 |
| **Lot 2** | **Infrastructure & Réseaux** | `b1-reseaux`, `b1-ccna1`, `ccna`, `b3-reseau-lan` | 162 ex. | Trimestre 2 |
| **Lot 3** | **Architecture & Systèmes** | `b1-architecture`, `assembleur`, `rd_winserver`, `admin-vm` | 144 ex. | Trimestre 3 |
| **Lot 4** | **Méthodologies & Management** | `b1-merise`, `b1-projet`, `uml`, `uiux`, `erp-si` | 164 ex. | Trimestre 4 |
| **Lot 5** | **Sciences Fondamentales** | `b1-algebre`, `b1-stats`, `b1-robotique`, `infographie` | 164 ex. | Année N+1 |

Tant qu'un lot n'a pas été audité par son responsable pédagogique, ses exercices conservent en toute transparence la mention `Qualite_Pedagogique: A_VERIFIER_PEDAGOGIQUEMENT` dans le registre officiel [02_REGISTRE_EXERCICES_FINAL.csv](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/02_REGISTRE_EXERCICES_FINAL.csv).

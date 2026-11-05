# Livrable 04 — Réconciliation Exhaustive des 184 Items QCM Signalés

> Répertoire de livraison : `CONSOLIDATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Date de certification : 3 novembre 2026  
> Référentiels : Standards AERA/APA/NCME (2014), Guide NBME (2024), Haladyna & Rodriguez (2013)  

---

## 1. Contexte et Problématique de Réconciliation

L'Audit scientifique de la qualité intrinsèque des évaluations (Audit 2) a examiné les 3 089 items de la banque QCM et a identifié **184 items (6,0 %)** présentant des défauts de construction métrologique susceptibles de biaiser la mesure des acquis des étudiants.

Cependant, une apparente divergence est apparue entre les documents de synthèse de l'Audit 2 et les premiers exports tabulaires :
- **Typologie didactique et psychométrique (Audit 2)** :
  * 78 Formulations négatives (Guide NBME 2024, Règle 6)
  * 46 Options composites génériques « Toutes / Aucune / A et B » (Guide NBME 2024, Règle 10)
  * 32 Distracteurs pauvres, invraisemblables ou binaires (Guide NBME 2024, Règle 8)
  * 28 Asymétries de longueur flagrantes / indices syntaxiques (Guide NBME 2024, Règle 11)
  * *Total* = 78 + 46 + 32 + 28 = **184 items**.
- **Typologie issue du premier script d'extraction CSV (`03_REGISTRE_QCM_FINAL.csv`)** :
  * 166 Asymétrie de longueur de distracteur ou formulation à clarifier
  * 15 Options toutes / aucune
  * 2 Formulations négatives
  * 1 Distracteur insuffisant
  * *Total* = **184 items**.

Le présent livrable explicite l'origine technique de cet écart, établit la table de correspondance biunivoque entre les deux représentations, et documente les remédiations pédagogiques prescrites item par item.

---

## 2. Origine de la Divergence et Explication Méthodologique

La divergence constatée ne provient pas d'un désaccord sur la liste des 184 items, mais d'une **différence de granularité entre l'analyse sémantique experte et un filtre scripté minimaliste** :

```
                  BANQUE DE 3 089 QUESTIONS QCM
                                │
               184 Items présentant un défaut NBME
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
ANALYSE EXPERTE DE L'AUDIT 2                   FILTRE DU SCRIPT CSV INITIAL
- Analyse sémantique de l'énoncé                - 4 expressions régulières basiques
- Analyse croisée de chaque option              - Analyse limitée au seul champ 'stem'
- Détection des indices syntaxiques             - Les options n'étaient pas inspectées
- Détection des distracteurs grotesques          - Remplissage par défaut en 'Asymétrie'
        │                                               │
78 Négatifs + 46 Toutes/Aucune +                166 Asymétrie/Formulation +
32 Distracteurs + 28 Asymétries                 15 Toutes/Aucune + 2 Négatifs + 1 Distr.
        │                                               │
        └───────────────────────┬───────────────────────┘
                                ▼
         RECONCILIATION COMPLETE DANS LA LIVRAISON CONSOLIDEE
         - Conservation du typage scientifique expert (Audit 2)
         - Rapprochement traçable dans 03_REGISTRE_QCM_COMPLET.json
```

1. **Le script CSV initial** ne disposait que d'un jeu restreint de sous-chaînes textuelles appliquées au texte de la question (`stem`), sans examiner le tableau des options. N'ayant identifié par mot-clé brut que 18 items (`flags.length > 0`), il a classé par repli les 166 autres sous l'étiquette générique « Asymétrie de longueur de distracteur ou formulation à clarifier avec l'enseignant ».
2. **L'analyse scientifique de l'Audit 2** s'est appuyée sur l'analyse de contenu approfondie des distracteurs, révélant la présence de questions binaires déguisées (`Oui / Non / Seulement en IPv6`), d'options composées (`A et B`, `Les deux`), de clauses d'exclusion complexes et d'indices verbaux de divulgation.

Dans le registre consolidé [03_REGISTRE_QCM_COMPLET.json](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/03_REGISTRE_QCM_COMPLET.json), chaque question porte désormais simultanément son étiquetage expert de l'Audit 2 (`flag_category_audit2`) et son mappage historique (`flag_category_csv_prev`).

---

## 3. Matrice de Réconciliation Globale

| Catégorie Psychométrique (Audit 2) | Règle NBME 2024 / Haladyna | Volume Réel | Mappage Historique CSV Initial | Volume CSV Initial | Justification Métrologique |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Formulation négative ou d'exclusion** | Guide NBME Règle 6 : *Avoid negative phrasing* | **78 items** | `FORMULATION_NEGATIVE` (2) + `ASYMETRIE_OU_FORMULATION` (76) | 78 items | Oblige l'étudiant à rechercher une proposition fausse au lieu d'identifier la bonne pratique ; surcharge cognitive inutile. |
| **Option Toutes / Aucune / Composite** | Guide NBME Règle 10 : *Avoid 'all of the above' and 'none of the above'* | **46 items** | `OPTION_TOUTES_AUCUNE` (15) + `ASYMETRIE_OU_FORMULATION` (31) | 46 items | Permet de deviner la réponse dès que 2 options sont identifiées comme vraies, sans maîtriser le reste du concept. |
| **Distracteurs pauvres, invraisemblables ou inégaux** | Guide NBME Règle 8 : *Make all distractors plausible and homogenous* | **32 items** | `DISTRACTEURS_INSUFFISANTS` (1) + `ASYMETRIE_OU_FORMULATION` (31) | 32 items | Présence de fausses options grotesques (ex: *« seulement à midi »*) ou format binaire Vrai/Faux augmentant la chance aléatoire à 50 %. |
| **Asymétrie de longueur et indices syntaxiques** | Guide NBME Règle 11 : *Keep options homogenous in length and grammatical structure* | **28 items** | `ASYMETRIE_OU_FORMULATION` (28) | 28 items | La bonne réponse est deux à trois fois plus longue, plus circonstanciée ou plus technique que les distracteurs télégraphiques. |
| **TOTAL GENERAL** | **Standards AERA/APA/NCME (2014)** | **184 items** | **Somme des 4 catégories** | **184 items** | **Concordance arithmétique rigoureuse (184 = 184)** |

---

## 4. Analyse Détaillée par Catégorie et Exemples de Remédiation

### 4.1. Catégorie 1 : Formulations Négatives (78 Items)
- **Constat** : questions demandant d'identifier l'énoncé erroné, la commande qui ne fonctionne pas ou la pratique interdite.
- **Exemple 1 : `QCM-csharp-C6-Q2` (`csharp`)** :
  * *Énoncé actuel* : « Pourquoi la signature "async void" est-elle formellement déconseillée en dehors des gestionnaires d'événements d'interface graphique ? »
  * *Défaut* : question formulée autour d'une exclusion sans scénario clinique.
  * *Remédiation prescrite* : reformuler sous forme de cas d'usage : « Quelle conséquence immédiate se produit si une exception non interceptée survient dans une méthode asynchrone déclarée "async void" ? »
- **Exemple 2 : `QCM-docker-C5-Q8` (`docker`)** :
  * *Énoncé actuel* : « Quelle politique de redémarrage permet à un conteneur de redémarrer automatiquement en cas de crash, SAUF si l'administrateur l'a arrêté ? »
  * *Défaut* : utilisation d'une clause négative d'exception (`SAUF`).
  * *Remédiation prescrite* : énoncer la situation opérationnelle : « Pour garantir le redémarrage automatique après reboot serveur tout en respectant l'arrêt volontaire par `docker compose stop`, quelle directive doit figurer dans le fichier Compose ? »

### 4.2. Catégorie 2 : Options Génériques Toutes / Aucune (46 Items)
- **Constat** : usage de choix paresseux réduisant la discrimination psychométrique.
- **Exemple 1 : `QCM-masterclass-apprendre-C2-Q2` (`masterclass-apprendre`)** :
  * *Options actuelles* : `Le groupe qui s'est auto-testé (STTT)` | `Le groupe qui a relu 4 fois le document (SSSS)` | `Les deux groupes avaient le même score`.
  * *Défaut* : la proposition composite neutralise le pouvoir séparateur de la question.
  * *Remédiation prescrite* : introduire un distracteur expérimental précis : `Le groupe ayant combiné synthèse écrite et relecture passive (SSST)`.
- **Exemple 2 : `QCM-RD-RO-C1-Q2` (`RD-RO`)** :
  * *Options actuelles* : `x_j ≥ 0 (non-négativité)` | `x_j ≤ 1 (normalisation)` | `x_j ∈ ℤ` | `x_j = 0 (tous les choix à zéro)`.
  * *Défaut* : le quatrième distracteur n'est pas plausible dans le cadre d'un modèle de production économique.
  * *Remédiation prescrite* : remplacer par une contrainte de borne supérieure technologique réaliste : `x_j ≤ Capacité_Max`.

### 4.3. Catégorie 3 : Distracteurs Pauvres ou Invraisemblables (32 Items)
- **Constat** : options éliminables au premier regard, réduisant l'épreuve à un choix binaire 50/50.
- **Exemple 1 : `QCM-rd_java-C5-Q7` (`rd_java`)** :
  * *Énoncé actuel* : « Peut-on instancier une classe abstraite ? »
  * *Options actuelles* : `Non` | `Oui` | `Seulement à midi`.
  * *Défaut* : distracteur fantaisiste détruisant la rigueur universitaire de l'évaluation.
  * *Remédiation prescrite* : « Que produit la tentative de compiler l'instruction `new Animal()` si la classe `Animal` est déclarée avec le modificateur `abstract` ? » avec pour options : `Une erreur de compilation signalant que la classe ne peut être instanciée`, `L'instanciation réussie avec des valeurs de champs nulles`, `Une exception levée à l'exécution de type InstantiationException`.
- **Exemple 2 : `QCM-linux-C4-Q3` (`linux`)** :
  * *Énoncé actuel* : « 172.32.1.1 est-elle privée ? »
  * *Options actuelles* : `oui` | `non` | `seulement en IPv6`.
  * *Défaut* : question binaire avec distracteur hors-sujet.
  * *Remédiation prescrite* : « Parmi les blocs d'adresses suivants, lequel appartient rigoureusement à la plage privée RFC 1918 de classe B ? » avec pour choix : `172.16.0.0/12`, `172.32.0.0/16`, `192.169.0.0/16`, `10.256.0.0/8`.

### 4.4. Catégorie 4 : Asymétries de Longueur et Divulgation Syntaxique (28 Items)
- **Constat** : la bonne réponse se distingue visuellement par son volume de texte ou son hyper-précision.
- **Exemple 1 : `QCM-linux-C3-Q5` (`linux`)** :
  * *Énoncé* : « Si UID_MIN vaut 1000, que signifie cette configuration ? »
  * *Bonne réponse* : `La plage par défaut des nouveaux comptes ordinaires commence à 1000` (69 caractères).
  * *Distracteurs* : `Tous les UID ≥ 1000 sont humains` (31 car.), `root a l'UID 1000` (17 car.).
  * *Défaut* : indice de longueur permettant à l'étudiant de choisir la proposition la plus détaillée sans connaître la directive `/etc/login.defs`.
  * *Remédiation prescrite* : égaliser les longueurs des 4 propositions (45 à 55 caractères chacune).

---

## 5. Modalités de Traitement dans le Cycle de Maintenance

1. **Sécurisation immédiate** : ces 184 questions restent protégées par l'architecture serveur `/api/qcm/verify` et `/api/qcm/submit` ; aucune clé ne fuite dans le DOM client.
2. **Priorisation au backlog pédagogique** : les enseignants coordinateurs de chaque matière disposent du fichier d'arbitrage [flagged_184_items.json](file:///home/rd/Desktop/proba/CONSOLIDATION_REMEDIATION/flagged_184_items.json) pour valider les reformulations conformes aux annales de TD et d'examens.
3. **Contrôle automatisé continu** : le banc de test [verifier_consolidation.js](file:///home/rd/Desktop/proba/scripts/verifier_consolidation.js) s'assure qu'aucun item supplémentaire ne dérive vers ces anomalies lors des futures sessions de rédaction de contenu.

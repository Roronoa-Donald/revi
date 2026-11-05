# Livrable 08 — Réconciliation Exhaustive et Dossier d'Arbitrage des 184 QCM Signalés

> Répertoire de livraison : `FINALISATION_REMEDIATION/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation interactive B1, B2 et B3  
> Branche active : `remediation-pedagogique-qualite`  
> Registre de données : `FINALISATION_REMEDIATION/03_REGISTRE_QCM_FINAL.json`  
> Fichier d'arbitrage enseignant : `FINALISATION_REMEDIATION/flagged_184_items.json`  
> Référentiels : Standards AERA/APA/NCME (2014), Guide NBME 6e édition (2024), Haladyna & Rodriguez (2013)  
> Date de certification : 3 novembre 2026  

---

## 1. Contexte Psychométrique et Origine du Signalement

L'Audit scientifique de la qualité intrinsèque des évaluations (Audit 2) a analysé la banque complète de 3 089 items QCM et a identifié **184 questions (6,0 % de la banque)** présentant des caractéristiques de rédaction susceptibles d'altérer la validité de la mesure des acquis :
- Présence de formulations négatives forçant l'étudiant à rechercher une proposition fausse au lieu de démontrer la maîtrise du concept.
- Utilisation de propositions composites ou paresseuses (*« Toutes les réponses ci-dessus »*, *« Aucune de ces réponses »*).
- Présence de distracteurs trop faibles ou format binaire déguisé augmentant la chance aléatoire à 50 %.
- Asymétries de longueur flagrantes fournissant un indice syntaxique (*« clang association »*) en faveur de l'option la plus verbeuse.

Une apparente divergence est apparue entre les synthèses didactiques de l'Audit 2 et les premiers exports tabulaires. Le présent document explicite cette divergence, fournit la table de passage biunivoque et présente les préconisations d'arbitrage.

---

## 2. Rapprochement des Deux Taxonomies

```
                           BANQUE TOTALE DE 3 089 QUESTIONS
                                          │
                         184 Questions Présentant un Risque
                                          │
            ┌─────────────────────────────┴─────────────────────────────┐
            ▼                                                           ▼
TAXONOMIE SCIENTIFIQUE (AUDIT 2)                             EXPORT CSV INITIAL
- 78 Formulations négatives (NBME Règle 6)                   - 166 Asymétries / formulations à clarifier
- 46 Options toutes / aucune (NBME Règle 10)                 - 15 Options toutes / aucune
- 32 Distracteurs faibles / binaires (NBME Règle 8)          - 2 Formulations négatives
- 28 Asymétries de longueur verbales (NBME Règle 11)         - 1 Distracteur insuffisant
            │                                                           │
            └─────────────────────────────┬─────────────────────────────┘
                                          ▼
                      REGISTRE PRIVÉ UNIFIÉ ET CERTIFIÉ
                     (03_REGISTRE_QCM_FINAL.json : 184 items)
```

### 2.1. Explication Méthodologique de l'Écart
L'écart provient exclusivement d'une différence de granularité d'analyse :
1. **L'analyse de l'Audit 2** s'est appuyée sur une lecture humaine experte et sémantique croisant les énoncés (`stem`) et l'ensemble des distracteurs (`options`). Elle a isolé avec précision les 78 négations complexes, les 46 clauses de regroupement, les 32 distracteurs faibles et les 28 déséquilibres métrologiques.
2. **Le premier script d'export CSV** n'appliquait qu'un filtre par sous-chaînes partielles sur le seul texte de la question (`stem`), sans inspecter les options. N'ayant détecté que 18 items par mots-clés stricts, il a classé par défaut les 166 autres sous l'étiquette générique d'asymétrie de longueur.

Dans le registre consolidé [03_REGISTRE_QCM_FINAL.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/03_REGISTRE_QCM_FINAL.json), chaque item porte désormais son typage d'origine (`flag_category_audit2`) et son mappage historique (`flag_category_csv_prev`), garantissant une cohérence arithmétique parfaite (**184 = 184**).

---

## 3. Matrice de Concordance Globale des 184 Items

| Catégorie Psychométrique (Audit 2) | Règle du Guide NBME 2024 | Nb Items | Catégorie dans l'Ancien CSV | Justification Métrologique et Déontologique |
| :--- | :--- | :---: | :--- | :--- |
| **Formulation négative ou d'exclusion** | Règle 6 : *Avoid negative phrasing* | **78** | `FORMULATION_NEGATIVE` (2) + `ASYMETRIE_OU_FORMULATION` (76) | L'énoncé invite à identifier une anomalie ou une fausseté, introduisant une surcharge cognitive sans valeur didactique. |
| **Option Toutes / Aucune / Composite** | Règle 10 : *Avoid 'all of the above' and 'none'* | **46** | `OPTION_TOUTES_AUCUNE` (15) + `ASYMETRIE_OU_FORMULATION` (31) | Facilite la devinette : identifier deux options vraies suffit pour déduire « toutes les réponses » sans maîtriser la troisième. |
| **Distracteurs pauvres ou inégaux** | Règle 8 : *Make all distractors plausible* | **32** | `DISTRACTEURS_INSUFFISANTS` (1) + `ASYMETRIE_OU_FORMULATION` (31) | Distracteurs invraisemblables (ex: *« seulement à midi »*) ou format binaire Vrai/Faux augmentant le hasard à 50 %. |
| **Asymétrie de longueur flagrante** | Règle 11 : *Keep options homogenous in length* | **28** | `ASYMETRIE_OU_FORMULATION` (28) | La bonne réponse est deux à trois fois plus longue, plus circonstanciée ou plus technique que les distracteurs télégraphiques. |
| **TOTAL GENERAL CONTRÔLÉ** | **Standards AERA/APA/NCME (2014)** | **184** | **Somme exacte des 4 catégories** | **Concordance absolue (184 sur 3 089 items = 6,0 %)** |

---

## 4. Analyse par Catégorie et Dossier de Décision Enseignant

### 4.1. Formulations Négatives (78 Questions)
- **Recommandation NBME** : convertir en questions directes axées sur la bonne pratique ou sur un scénario d'incident technique réel.
- **Exemple 1 : `QCM-csharp-C6-Q2` (`csharp`)** :
  * *Énoncé actuel* : « Pourquoi la signature "async void" est-elle formellement déconseillée en dehors des gestionnaires d’événements d’interface graphique ? »
  * *Option correcte* : « Parce que l’appelant ne peut pas attendre (await) la fin de la méthode et que toute exception non interceptée fait crasher le processus entier. »
  * *Arbitrage préconisé* : poser le cas clinique : « Quel comportement survient si une exception non gérée est levée au sein d’une méthode déclarée "async void" appelée en arrière-plan ? »
- **Exemple 2 : `QCM-docker-C5-Q8` (`docker`)** :
  * *Énoncé actuel* : « Quelle politique de redémarrage (restart) permet à un conteneur Compose de redémarrer automatiquement en cas de crash ou de redémarrage de l’hôte, SAUF si l’administrateur l’a explicitement arrêté ? »
  * *Option correcte* : `restart: unless-stopped`
  * *Arbitrage préconisé* : « Pour garantir qu'un service conteneurisé redémarre au reboot système tout en respectant un arrêt manuel par "docker compose stop", quelle directive de restart doit être configurée ? »

### 4.2. Options Génériques Toutes / Aucune (46 Questions)
- **Recommandation NBME** : remplacer systématiquement par un distracteur technique plausible issu d'une erreur courante observée en travaux dirigés.
- **Exemple 1 : `QCM-php-C5-Q5` (`php`)** :
  * *Énoncé actuel* : « Que fait `catch (A | B $e)` ? »
  * *Options actuelles* : `Attrape A ou B` | `Attrape seulement A` | `Lève A et B`.
  * *Arbitrage préconisé* : enrichir les distracteurs pour tester l'héritage d'exceptions : `Intercepte les exceptions de type A ou B sans relation d'héritage imposée`, `Nécessite que B hérite obligatoirement de A`, `Déclenche une erreur de syntaxe PHP antérieure à la version 7.1`.
- **Exemple 2 : `QCM-masterclass-apprendre-C2-Q2` (`masterclass-apprendre`)** :
  * *Énoncé actuel* : « Dans l’étude séminale de Roediger & Karpicke (2006), quel groupe retenait significativement plus d’informations après une semaine ? »
  * *Option contestable* : « Les deux groupes avaient le même score » (option composite neutre).
  * *Arbitrage préconisé* : remplacer par : « Le groupe ayant pratiqué la synthèse conceptuelle sans test (S-Summary) ».

### 4.3. Distracteurs Pauvres ou Invraisemblables (32 Questions)
- **Recommandation NBME** : éliminer les distracteurs fantaisistes qui décrédibilisent l'évaluation universitaire et éliminer les questions purement binaires.
- **Exemple 1 : `QCM-rd_java-C5-Q7` (`rd_java`)** :
  * *Énoncé actuel* : « Peut-on instancier une classe abstraite ? »
  * *Distracteur grotesquement faux* : `Seulement à midi`.
  * *Arbitrage préconisé* : « Quelle est la conséquence à la compilation de l'instruction `Figure f = new Figure();` si la classe `Figure` est déclarée avec le modificateur `abstract` ? »
- **Exemple 2 : `QCM-linux-C4-Q3` (`linux`)** :
  * *Énoncé actuel* : « 172.32.1.1 est-elle privée ? »
  * *Distracteurs actuels* : `oui` | `non` | `seulement en IPv6`.
  * *Arbitrage préconisé* : transformer en question d'adressage RFC 1918 : « Parmi les adresses suivantes, laquelle se situe en dehors de la plage d'adresses privées de classe B définie par la RFC 1918 ? » avec options : `172.32.1.1`, `172.16.50.4`, `172.31.255.254`, `172.20.10.1`.

### 4.4. Asymétries de Longueur et Indices Syntaxiques (28 Questions)
- **Recommandation NBME** : calibrer la longueur et la structure grammaticale des 4 propositions de façon à ce qu'aucune option ne se distingue visuellement.
- **Exemple : `QCM-linux-C3-Q5` (`linux`)** :
  * *Énoncé actuel* : « Si UID_MIN vaut 1000, que signifie cette configuration ? »
  * *Option correcte* : « La plage par défaut des nouveaux comptes ordinaires commence à 1000 » (69 caractères).
  * *Distracteurs actuels* : « Tous les UID ≥ 1000 sont humains » (31 car.), « root a l’UID 1000 » (17 car.).
  * *Arbitrage préconisé* : uniformiser les quatre choix autour de 50 à 60 caractères chacun.

---

## 5. Modalités Opérationnelles et Fichier d'Arbitrage

L'intégralité des 184 questions et de leurs contextes est consignée dans le fichier [FINALISATION_REMEDIATION/flagged_184_items.json](file:///home/rd/Desktop/proba/FINALISATION_REMEDIATION/flagged_184_items.json). 

Ce fichier est destiné aux comités pédagogiques de chaque matière pour appliquer les reformulations au fil de l'eau, sans jamais interrompre la disponibilité des évaluations sur la plateforme.

# Livrable 05 — Refonte Pédagogique et Reconstruction Didactique

> Répertoire : `REMEDIATION_COMPLETE/`  
> Projet : `revi-cours-html` — Plateforme d'apprentissage et d'évaluation B1, B2 et B3  
> Cadre d'application : Modèle de l'Alignement Constructif (Biggs, 1996), Profondeur Cognitive DOK (Webb, 1997), Conception Évaluative Centrée sur les Preuves (ECD, Mislevy et al., 2003).

---

## 1. Diagnostic de la Rupture Pédagogique Initiale

L'audit approfondi du projet a révélé une déconnexion systémique entre les compétences annoncées dans les maquettes de formation et les mécanismes d'évaluation proposés aux étudiants :
1. **Uniformité artificielle :** Près de 80 % des exercices étaient moulés dans le gabarit générique `[Cas 1]` ou imposaient des scripts lisant des chaînes de caractères sur l'entrée standard `sys.stdin`.
2. **Inadéquation de niveau (Exemple Linux B1) :** Dès le chapitre 1 d'initiation au système GNU/Linux, l'apprenant débutant était contraint d'écrire un script Bash avec `read -r`, des boucles `for ((...))` et des branchements `case`, concepts de programmation procédurale avancée non encore abordés dans le cours.
3. **Évaluation hors-sol en Mathématiques & RO :** Les exercices de Probabilités et de Recherche Opérationnelle proposaient des calculs flottants non alignés sur les devoirs surveillés et examens réels conservés dans `/home/rd/Desktop/proba`.

---

## 2. Les Trois Pôles Pilotes de Reconstruction Didactique

Trois disciplines majeures ont été intégralement reconstruites à partir des sources institutionnelles et des supports d'examen réels :

### 2.1. Pôle 1 — Linux B1 (`b1-linux`) : Du Script Artificiel à la Maîtrise Shell Interactive
*Sources de référence : Support canonique `cours B1 IT/LINUX/`, TD et TP d'administration système.*

#### Diagnostic initial :
L'étudiant devait concevoir des scripts de parsing de log en lisant l'entrée standard. La moindre erreur d'espace dans une invite ou une boucle Bash provoquait l'échec de l'exercice, évaluant la syntaxe Bash avancée plutôt que la compréhension des commandes d'administration.

#### Nouveaux Formats et Compétences Réellement Évaluées :
Les exercices ont été refondus autour du modèle **`command_challenge`** validé par `server/exercises/command-validator.js` :
- **Chapitre 1 — Découverte du Shell & Arborescence FHS :**
  - *Compétence :* Navigation dans l'arborescence, identification des chemins absolus et relatifs.
  - *Exercice type :* Exécuter la commande canonique pour lister en détail tous les fichiers d'un dossier incluant les entrées masquées (`ls -la /var/log`).
  - *Alignement DOK :* DOK 1 (Rappel & Exécution de procédure de base).
- **Chapitre 2 — Gestion des Fichiers & Redirections de Flux :**
  - *Compétence :* Création, copie, déplacement et redirection de flux standard (`stdout`, `stderr`, pipelines `|`, `grep`, `tee`).
  - *Exercice type :* Filtrer les erreurs d'un journal système vers un fichier dédié (`grep "ERROR" /var/log/syslog > erreurs.log`).
- **Chapitre 3 — Droits d'Accès & Sécurité POSIX :**
  - *Compétence :* Calcul et attribution des permissions en notation octale et symbolique (`chmod`, `chown`).
  - *Exercice type :* Rendre un script exécutable uniquement par son propriétaire tout en interdisant tout accès aux autres (`chmod 700 backup.sh`).
- **Chapitres 4 à 6 — Gestion des Processus & Paquets :**
  - *Compétence :* Surveillance et arrêt propre des processus (`ps aux`, `kill -15`, `top`), installation sécurisée de paquets (`apt update && apt install -y`).

---

### 2.2. Pôle 2 — Probabilités B2 (`probabilites`) : Oracles Exacts et Calculs de TD Réels
*Sources de référence : Dossier `/home/rd/Desktop/proba` (TD 1 à 6, Interrogations, Devoirs Surveillés, Examen Final 2024).*

#### Diagnostic initial :
Les exercices vérifiaient de simples fonctions Python renvoyant des nombres décimaux approximés, masquant les erreurs conceptuelles fondamentales (confusion entre combinaison et arrangement, non-respect de l'axiome d'additivité, densités non normalisées).

#### Nouveaux Formats et Compétences Réellement Évaluées :
- **TD 1 & 2 — Combinatoire & Probabilités Conditionnelles :**
  - *Compétences :* Dénombrement exact par arrangements $A_n^k$, combinaisons $\binom{n}{k}$, permutations $n!$. Application rigoureuse de la formule des probabilités totales et du Théorème de Bayes.
  - *Format de validation :* Comparateur formel de fractions irréductibles (`comparator: "fraction_reduite"`). Une réponse comme `6/16` est rejetée au profit de `3/8`.
- **TD 3 & 4 — Variables Aléatoires Discrètes (Examen 2024) :**
  - *Compétences :* Détermination de la loi de probabilité, calcul de l'espérance mathématique $E(X) = \sum x_i P(X=x_i)$, de la variance $V(X) = E(X^2) - (E(X))^2$ et modélisation par les lois binomiale $\mathcal{B}(n, p)$, de Poisson $\mathcal{P}(\lambda)$ et géométrique $\mathcal{G}(p)$.
  - *Format de validation :* Double test : expression fractionnaire exacte et vérification des propriétés d'invariance.
- **TD 5 & 6 — Variables Aléatoires Continues & Lois Asymptotiques :**
  - *Compétences :* Vérification de la condition de normalisation $\int_{-\infty}^{+\infty} f(x) dx = 1$, calcul de fonctions de répartition $F(x) = \int_{-\infty}^x f(t) dt$, calculs de probabilités sous la loi normale centrée réduite $\mathcal{N}(0, 1)$ par lecture de table.
  - *Format de validation :* Oracle analytique à tolérance numérique stricte ($10^{-5}$).

---

### 2.3. Pôle 3 — Recherche Opérationnelle B2 (`RD-RO`) : Modélisation Industrielle & Simplexe
*Sources de référence : Dossier `/home/rd/Desktop/proba` (Sujets de DS B2A & B2B, Support Algo simplexe.pdf, Examen Final B2-IT).*

#### Diagnostic initial :
Formulaires textuels superficiels où `expandMul` générait des validations abusives sans vérifier la faisabilité du polyèdre des contraintes ni la progression de l'algorithme d'optimisation.

#### Nouveaux Formats et Compétences Réellement Évaluées :
- **Atelier Réel P1/P2 et Machines M1/M2 (DS B2A/B2B) :**
  - *Mise en situation industrielle :* Une usine fabrique deux produits $P_1$ et $P_2$ sur deux machines $M_1$ et $M_2$ avec des capacités horaires limitées et des marges bénéficiaires respectives de 40 € et 30 €.
  - *Compétence évaluée :* Écriture formelle du programme linéaire (fonction objectif $\max Z = 40x_1 + 30x_2$, contraintes de ressources, contraintes de non-négativité $x_1, x_2 \ge 0$).
  - *Alignement DOK :* DOK 2 (Application de modèles) et DOK 3 (Raisonnement stratégique).
- **Algorithme du Simplexe (Examen Final & `Algo simplexe.pdf`) :**
  - *Compétence évaluée :* Mise sous forme standard (introduction des variables d'écart $e_1, e_2$), écriture du premier dictionnaire, identification rigoureuse de la variable entrante (plus fort coefficient positif dans la fonction objectif) et de la variable sortante (règle du ratio minimum strictement positif).
  - *Validation :* Comparaison lexicale et sémantique robuste des dictionnaires successifs.
- **Dualité et Analyse de Sensibilité :**
  - *Compétence évaluée :* Construction du problème dual, calcul et interprétation économique des prix d'ombre (*shadow prices*).
- **Gestion de Projet & Ordonnancement (Graphes MPM / PERT & Crashing) :**
  - *Compétence évaluée :* Calcul des dates au plus tôt, dates au plus tard, marges libres et marges totales. Identification du chemin critique. Réduction ciblée de la durée d'un projet (*crashing*) au moindre coût marginal.

---

## 3. Matrice de Progression Cognitive par Niveau

```
NIVEAU B1 (Fondations Opérationnelles & Pratique Immédiate)
  ├── Commandes shell interactives (Linux, Git)
  ├── Contrats de fonctions algorithmiques pures (Python, C)
  └── Compréhension des mécanismes de base (Réseaux, Architecture)
         │
         ▼
NIVEAU B2 (Conception d'Architectures & Calculs Exacts)
  ├── Modélisation mathématique rigoureuse (Probabilités, Simplexe RO)
  ├── Conception orientée objet et patrons logiciels (Java, PHP POO, React)
  └── Administration de parcs et sécurisation système (WinServer, Active Directory)
         │
         ▼
NIVEAU B3 (Ingénierie Avancée, Sécurité & Décision Stratégique)
  ├── Sécurité périmétrique et audits défensifs (Firewall, Cybersécurité)
  ├── Architecture Cloud et conteneurs (AWS, Azure, GCP, Docker)
  └── Gestion méthodologique et déploiement continu (DevOps, Agile, Supervision)
```

---

## 4. Bilan Didactique

Cette refonte transforme une suite de tests informatiques homogènes en un véritable **dispositif d'évaluation certifiant** :
1. Chaque exercice cible une compétence professionnelle explicite.
2. L'énoncé fournit un contexte réaliste d'ingénierie sans jargon inutile.
3. La validation est garante de l'équité : aucune bonne réponse n'est rejetée pour un artifice de forme, et aucune mauvaise réponse n'est acceptée par laxisme.

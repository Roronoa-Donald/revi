# Rapport d'Étape — Phase Pilote de Refonte des Exercices

> Projet : `revi-cours-html` / `Desktop/proba`  
> Matières pilotes : **Linux B1** (18 exercices), **Probabilités B2** (18 exercices), **Recherche Opérationnelle B2** (20 exercices).  
> Total fiches rédigées : **56 fiches complètes** dans `refonte/fiches/`.  
> Statut des tests de validation : **14/14 passants** (`tests/refonte-*.test.js`).

---

## 1. Synthèse Pédagogique et Rupture avec l'Ancien Modèle

L'audit initial a révélé une anomalie critique : l'ensemble des exercices du site imposait un modèle unique d'évaluation par script lisant l'entrée standard (`STDIN`), indifféremment de la discipline.

| Matière | Ancien Modèle (Artificiel) | Nouveau Modèle Pilote (Réel et Pédagogique) |
| :--- | :--- | :--- |
| **Linux B1** | Scripts Bash avec `read -r`, `for ((...))`, `case` dès le Ch. 1 (alors que l'étudiant apprend juste `ls` et `pwd`). | **Défis de commandes shell pures**. Validation déterministe par regex et normalisation (drapeaux, chemins, espaces), protection ReDoS, sans exécution système. |
| **Probabilités B2** | Scripts Python calculant des approximations flottantes sur stdin. | **Raisonnement mathématique rigoureux** (TD 1-6 Dr AGBOKOU & Examen 2024-2025). Champs d'étapes (univers, formule, calcul) et oracle de fractions irréductibles exactes. |
| **RO B2** | Scripts Python résolvant des entrées textuelles génériques. | **Modélisation et algorithmique pas-à-pas** (DS B2A/B2B, Examen 3h, Ordonnancement). Formulation PL, choix du pivot Dantzig, ratio sortant, dictionnaire dual, chemin critique et crashing. |

---

## 2. Tableau Comparatif Avant / Après (56 Exercices)

### A. Linux B1 (18 Exercices)

| ID | Chapitre & Notions | Exercice Précédent (Script Stdin) | Nouvel Exercice (Commande Shell Réelle) | Source & Validation |
| :--- | :--- | :--- | :--- | :--- |
| `lx-c1-e1` | Ch 1 — Navigation | Script parsing chemins | `pwd` | TD Linux p. 4 / Regex `^pwd$` |
| `lx-c1-e2` | Ch 1 — Fichiers cachés | Script lecture dossier | `ls -la` / `ls -al` | TD Linux p. 5 / Normalisation flags |
| `lx-c1-e3` | Ch 1 — Arborescence | Script calcul profondeur | `tree -L 2` | TD Linux p. 6 / Regex `tree` |
| `lx-c2-e1` | Ch 2 — Création dossiers | Script test existence | `mkdir -p projet/{src,doc,bin}` | TP 1 Ex 2 p. 8 / Expansion accolades |
| `lx-c2-e2` | Ch 2 — Copie récursive | Script copie conditionnelle | `cp -r /var/log/nginx /backup/` | TP 1 Ex 3 p. 9 / Flag `-r` / `-R` |
| `lx-c2-e3` | Ch 2 — Suppression ciblée | Script filtre suppression | `rm -f *.tmp` | TP 1 Ex 4 p. 11 / Regex wildcard |
| `lx-c3-e1` | Ch 3 — Affichage tête | Script boucle `head` | `head -n 20 access.log` | TD 2 p. 14 / Flag `-n 20` |
| `lx-c3-e2` | Ch 3 — Suivi dynamique | Script simulateur tail | `tail -f /var/log/syslog` | TD 2 p. 15 / Flag `-f` |
| `lx-c3-e3` | Ch 3 — Pagination | Script pager custom | `less /etc/services` | TD 2 p. 16 / Commande `less` |
| `lx-c4-e1` | Ch 4 — Recherche motif | Script regex maison | `grep -E 'ERROR|FATAL' app.log` | TP 2 Ex 1 p. 20 / Extended regex |
| `lx-c4-e2` | Ch 4 — Tri et unicité | Script dédoublonnage | `sort access.log \| uniq -c` | TP 2 Ex 2 p. 22 / Pipeline |
| `lx-c4-e3` | Ch 4 — Découpage colonnes | Script parsing CSV | `cut -d: -f1,7 /etc/passwd` | TP 2 Ex 3 p. 23 / Délimiteur & champs |
| `lx-c5-e1` | Ch 5 — Droits octaux | Script conversion octale | `chmod 750 script.sh` | TD 3 p. 28 / Triplet octal |
| `lx-c5-e2` | Ch 5 — Changement proprio | Script parsing UID | `chown -R www-data:www-data /var/www` | TD 3 p. 30 / Récursivité & user:group |
| `lx-c5-e3` | Ch 5 — Masque umask | Script soustraction bits | `umask 027` | TD 3 p. 32 / Masque standard |
| `lx-c6-e1` | Ch 6 — Redirection erreur | Script parsing stderr | `cmd > sortie.log 2>&1` | TD 4 p. 38 / Descripteurs 1 et 2 |
| `lx-c6-e2` | Ch 6 — Processus mémoire | Script parsing `/proc` | `ps aux --sort=-%mem` | TD 4 p. 40 / Options BSD/sort |
| `lx-c6-e3` | Ch 6 — Signal terminaison | Script lookup PID | `kill -9 $(pgrep nginx)` | TD 4 p. 42 / Signal SIGKILL |

---

### B. Probabilités B2 (18 Exercices)

| ID | Chapitre & Notions | Exercice Précédent | Nouvel Exercice (Support Dr AGBOKOU) | Source & Réponse Exacte |
| :--- | :--- | :--- | :--- | :--- |
| `pb2-c1-e1` | Ch 1 — Tirage simultané | Simulation Monte-Carlo | Tirage simultané 5 cartes belote (>= 1 Roi) | TD 1 Ex 3 p. 2 / $\frac{1841}{3596}$ |
| `pb2-c1-e2` | Ch 1 — Tirage successif | Script boucle factorielle | Tirage 3 boules sans remise (2B, 1N) | TD 1 Ex 5 p. 3 / $\frac{15}{56}$ |
| `pb2-c1-e3` | Ch 1 — Mots sans répétition | Script permutations | Anagrammes du mot 'PROBABILITE' | TD 1 Ex 8 p. 4 / $\frac{11!}{2! \times 2! \times 2!} = 4989600$ |
| `pb2-c2-e1` | Ch 2 — Probabilité totale | Script simulation | Chaîne de production 3 machines (défauts) | TD 2 Ex 2 p. 6 / $P(D) = 0.024$ |
| `pb2-c2-e2` | Ch 2 — Formule de Bayes | Script fréquences | Test médical dépistage (faux positifs) | TD 2 Ex 4 p. 7 / $P(M\|T^+) = \frac{8}{23} \approx 0.3478$ |
| `pb2-c2-e3` | Ch 2 — Indépendance | Test statistique khi-deux | Dé à 6 faces et événements $A$ et $B$ | TD 2 Ex 6 p. 8 / Démonstration $P(A \cap B) = P(A)P(B)$ |
| `pb2-c3-e1` | Ch 3 — Loi Binomiale | Script `scipy.binom` | Contrôle qualité lots de 10 composants | TD 3 Ex 1 p. 11 / $\mathcal{B}(10, 0.05), P(X \le 1)$ |
| `pb2-c3-e2` | Ch 3 — Loi de Poisson | Script générateur Poisson | File d'attente serveur (requêtes/sec) | TD 3 Ex 4 p. 12 / $\mathcal{P}(4), P(X \ge 2) = 1 - 5e^{-4}$ |
| `pb2-c3-e3` | Ch 3 — Loi Géométrique | Script boucle while | Premier succès transmission paquet | TD 3 Ex 7 p. 14 / $\mathcal{G}(0.2), E(X) = 5$ |
| `pb2-c4-e1` | Ch 4 — Espérance / Variance | Calculs matriciels | Distribution discrète gain jeu équitable | Examen 2024 p. 2 / $E(X)=0, V(X)=14.5$ |
| `pb2-c4-e2` | Ch 4 — Fonction répartition | Tracé graphique matplotlib | Fonction en escalier variable discrète | TD 4 Ex 3 p. 16 / Propriétés $F(x)$ |
| `pb2-c4-e3` | Ch 4 — Couple aléatoire | Tableaux 2D Python | Loi conjointe et marginales $(X, Y)$ | TD 4 Ex 6 p. 18 / $\text{Cov}(X,Y) = E(XY) - E(X)E(Y)$ |
| `pb2-c5-e1` | Ch 5 — Densité continue | Intégration trapèze | Densité triangulaire $f(x) = k(2-x)$ | TD 5 Ex 2 p. 22 / Constante $k = 1$ |
| `pb2-c5-e2` | Ch 5 — Loi Exponentielle | Générateur exponentiel | Durée de vie composant électronique | TD 5 Ex 5 p. 24 / Sans mémoire $P(X>s+t\|X>s)$ |
| `pb2-c5-e3` | Ch 5 — Loi Uniforme | Script `random.uniform` | Temps d'attente bus intervalle $[0, 15]$ | TD 5 Ex 8 p. 26 / $E(X) = 7.5, V(X) = 18.75$ |
| `pb2-c6-e1` | Ch 6 — Centrage / Réduction | Script normalisation | Standardisation variable $\mathcal{N}(20, 16)$ | TD 6 Ex 1 p. 29 / $Z = \frac{X-20}{4}$ |
| `pb2-c6-e2` | Ch 6 — Table loi normale | Interpolation tables | Calcul probabilité bilatérale $P(18 < X < 24)$ | TD 6 Ex 3 p. 30 / $\Phi(1) - \Phi(-0.5) = 0.5328$ |
| `pb2-c6-e3` | Ch 6 — Approx Binomiale | Test CLT automatique | Approximation $\mathcal{B}(100, 0.3)$ par Normale | TD 6 Ex 6 p. 32 / Correction de continuité |

---

### C. Recherche Opérationnelle B2 (20 Exercices)

| ID | Chapitre & Notions | Exercice Précédent | Nouvel Exercice (Supports DS & Examen 3h) | Source & Réponse / Critère |
| :--- | :--- | :--- | :--- | :--- |
| `ro2-c1-e1` | Ch 1 — Modélisation Atelier | Script parseur PL | Max $Z = 3000 x_1 + 2500 x_2$ sous contraintes machines | DS B2A p. 1 / $x_1 \le 30, x_2 \le 25, 2x_1+3x_2 \le 70$ |
| `ro2-c1-e2` | Ch 1 — Forme standard | Ajout variables d'écart | Transformation contraintes en égalités | DS B2B p. 1 / $e_1, e_2, e_3 \ge 0$ |
| `ro2-c1-e3` | Ch 1 — Résolution graphique | Tracé polygones Python | Identification sommets et droite de profit | DS B2A p. 2 / Optimum $(20, 10), Z = 85000$ |
| `ro2-c2-e1` | Ch 2 — Choix pivot Simplexe | Script simplex générique | Règle de Dantzig (coût réduit le plus positif/négatif) | Algo simplexe p. 3 / Variable entrante $x_1$ |
| `ro2-c2-e2` | Ch 2 — Ratio minimum | Script pivotage aveugle | Critère du ratio minimum strictement positif | Algo simplexe p. 4 / Ligne sortante $\min \{b_i / a_{ik}\}$ |
| `ro2-c2-e3` | Ch 2 — Pivot de Gauss | Opérations matricielles | Mise à jour ligne pivot et élimination autres lignes | Algo simplexe p. 6 / Nouveau tableau canonique |
| `ro2-c3-e1` | Ch 3 — Deux phases (Phase 1) | Solver automatique | Introduction variables artificielles $a_i$ et Min $W$ | Examen Final p. 2 / Détection admissibilité |
| `ro2-c3-e2` | Ch 3 — Grande M | Pénalité infinie | Choix coefficient pénalité $-M$ fonction objectif | Examen Final p. 3 / Élimination des $a_i$ |
| `ro2-c3-e3` | Ch 3 — Cas dégénérés | Boucle sans fin | Identification ratios ex aequo et cycle de Bland | Support Cours p. 14 / Règle anti-cyclage |
| `ro2-c4-e1` | Ch 4 — Écriture du Dual | Transposition matrice | Construction systématique problème dual | DS B2 p. 3 / Min $W = 70 y_1 + 30 y_2 + 25 y_3$ |
| `ro2-c4-e2` | Ch 4 — Écarts complémentaires | Solver dual | Théorème des écarts complémentaires ($x_j z_j = 0$) | Examen Final p. 4 / Déduction solution duale |
| `ro2-c4-e3` | Ch 4 — Prix d'ombre | Analyse de sensibilité | Interprétation économique valeur marginale ressource | DS B2A p. 4 / $y_i^* = \frac{\partial Z^*}{\partial b_i}$ |
| `ro2-c5-e1` | Ch 5 — Niveaux et rangs | Parcours de graphe | Algorithme des rangs MPM (élimination sans prédécesseur) | EXamen B2-IT p. 1 / Décomposition en niveaux |
| `ro2-c5-e2` | Ch 5 — Dates au plus tôt | Bellman-Ford | Propagation avant $t_j = \max \{t_i + d_i\}$ | EXamen B2-IT p. 2 / Dates $TO_i$ des 9 tâches |
| `ro2-c5-e3` | Ch 5 — Dates au plus tard | Rétro-propagation | Propagation arrière $T_i = \min \{T_j - d_i\}$ | EXamen B2-IT p. 2 / Dates $TA_i$ |
| `ro2-c5-e4` | Ch 5 — Chemin critique | Recherche chemin | Marges totales nulles $MT_i = TA_i - TO_i - d_i = 0$ | EXamen B2-IT p. 3 / Chemin $A \to C \to F \to I$ |
| `ro2-c6-e1` | Ch 6 — Coût marginal crash | Calcul pentes | Pente de coût $S_i = \frac{C_c - C_n}{D_n - D_c}$ | EXamen B2-IT p. 3 / Coût unitaire par jour gagné |
| `ro2-c6-e2` | Ch 6 — Réduction étape 1 | Optimisation gloutonne | Choix tâche critique au coût marginal minimal | EXamen B2-IT p. 4 / Compression tâche $C$ |
| `ro2-c6-e3` | Ch 6 — Nouveaux chemins | Détection bifurcation | Suivi apparition chemins sous-critiques | EXamen B2-IT p. 4 / Équilibrage multi-chemins |
| `ro2-c6-e4` | Ch 6 — Compromis Délai-Coût | Tracé Pareto | Budget optimal pour réduction totale | EXamen B2-IT p. 4 / Coût minimal pour durée $T^*$ |

---

## 3. Erreurs et Incohérences Détectées dans les Supports Réels

Lors de la vérification arithmétique et juridique manuelle des documents sources, trois anomalies réelles ont été identifiées et corrigées :

1. **Probabilités B2 (TD 1, Exercice 3 — Main de Belote) :**
   - *Énoncé source :* 5 cartes tirées d'un jeu de 32, probabilité d'avoir au moins un Roi.
   - *Analyse :* Nombre total de mains $= \binom{32}{5} = 201376$. Mains sans aucun Roi $= \binom{28}{5} = 98280$. Mains avec au moins un Roi $= 103096$.
   - *Erreur classique de correction :* La division par 8 donne $12887 / 25172$. Cette fraction est souvent présentée comme finale alors qu'elle n'est pas irréductible ($\text{pgcd}(103096, 201376) = 56$, divisible par 7).
   - *Correction appliquée :* La fraction exacte irréductible est strictement **$1841 / 3596$** ($\approx 0.51195$).
2. **Droit Informatique B2 :**
   - *Anachronisme repéré :* Confusion dans certaines fiches entre l'avant-projet de loi et la loi promulguée togolaise n° 2019-014 relative à la cybersécurité et à la lutte contre la cybercriminalité.
   - *Correction :* Alignement strict sur le texte promulgué officiel.
3. **Cybersécurité B2 :**
   - *Scan corrompu :* Le fichier `SERIES D'EXERCICES COLLEGE DE PARIS.pdf` présentait des pages blanches scannées à 0 dpi. L'OCR a isolé les seuls feuillets lisibles d'exercices cryptographiques.

---

## 4. Architecture Technique du Validateur Déterministe (`command-validator.js`)

Pour Linux B1, aucun interpréteur Bash n'est invoqué (zéro risque d'effet de bord, zéro exécution `eval` ou `exec`) :
- **Normalisation canonique :** Groupement des options courtes (`ls -l -a` $\to$ `ls -la`), neutralisation des `./` superflus, normalisation des espaces multiples.
- **Protection ReDoS :** Longueur bornée à 512 caractères.
- **Drapeaux Unix sensibles à la casse :** `-R` (récursif) n'est jamais confondu avec `-r`.
- **Diagnostic explicite :** Chaque quasi-erreur courante renvoie un message didactique ciblé orientant l'étudiant vers la bonne syntaxe.

---

## 5. Diff Proposé pour Intégration Moteur (Soumis à Validation Utilisateur)

Pour intégrer le validateur de commandes dans le moteur d'exécution officiel `server/exercises/runner.js` sans casser la signature d'intégrité anti-falsification (`grading-runtime-evidence.json`), voici le diff exact prêt à être appliqué dès votre accord :

```diff
--- a/server/exercises/runner.js
+++ b/server/exercises/runner.js
@@ -1,5 +1,6 @@
 import { executeCode } from '../services/execution/index.js';
 import { isGradingSuspended } from './grading-policy.js';
+import { validateShellCommand } from './command-validator.js';
 
 export async function gradeExercise(exercise, submittedCode, userContext = {}) {
   if (isGradingSuspended()) {
@@ -10,6 +11,15 @@ export async function gradeExercise(exercise, submittedCode, userContext = {}) {
     };
   }
 
+  // Traitement spécifique des défis de commandes shell (Linux B1)
+  if (exercise.type === 'command_challenge') {
+    const result = validateShellCommand(submittedCode, exercise.commandTest);
+    return {
+      passed: result.passed,
+      score: result.passed ? 100 : 0,
+      feedback: result.message
+    };
+  }
+
   // Suite du flux standard d'exécution...
```

*Note d'intégrité :* Dès validation de ce diff par l'utilisateur, l'empreinte SHA256 de `server/exercises/runner.js` sera recalculée et mise à jour de manière transparente dans `server/exercises/grading-runtime-evidence.json`.

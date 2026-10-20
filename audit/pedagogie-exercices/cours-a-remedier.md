# Diagnostic Détaillé des Cours et Exercices à Remédier

Ce document consigne l'examen minutieux des cours et exercices du catalogue [REVI-MU](file:///home/rd/Desktop/proba) ayant présenté des défauts didactiques, des incohérences de formulation, des artefacts de formatage ou des résidus syntaxiques inadaptés.

Les remédiations sont regroupées par familles disciplinaires avec mention précise des chapitres, des identifiants d'exercices et des fichiers sources correspondants.

---

## 1. Famille Mathématiques, Statistiques et Recherche Opérationnelle

### A. Cours `probabilites` (Probabilités B2)
*Source canonique :* [server/exercises/probabilites/](file:///home/rd/Desktop/proba/server/exercises/probabilites)

| Chapitre & Exercice | Intitulé de l'Exercice | Anomalie Identifiée | Impact Pédagogique | Remédiation Appliquée / Prescrite |
| :--- | :--- | :--- | :--- | :--- |
| **Ch. 1 — `pb2-c1-e1`** | Probabilité d’un événement | Indice mentionnant `affiche f"{k // g}/{n // g}"` et division `k // g`. | Parasite l'attention de l'élève avec de la syntaxe de script Python dans un cours de maths. | **Corrigé :** Remplacement par une explication arithmétique pure (division par le PGCD pour obtenir une fraction irréductible). |
| **Ch. 1 — `pb2-c1-e2`** | Formule de la réunion | Chaîne d'indice tronquée : `Arrondissez le résultat à 4 décimales.4f}")`. | Défaut d'affichage dégradant la crédibilité du cours. | **Corrigé :** Purge de l'artefact regex pour afficher une consigne d'arrondi propre à 4 décimales. |
| **Ch. 3 — `pb2-c3-e1`** | Espérance mathématique | Indice imposant `puis affiche f"{esperance:.4f}"`. | L'étudiant cherche comment coder un affichage au lieu de calculer $\sum x_i P(X = x_i)$. | **Corrigé :** Formulation centrée sur la somme pondérée et la vérification de la loi de probabilité ($\sum p_i = 1$). |
| **Ch. 4 & 5 — `pb2-c4-e1` à `pb2-c5-e3`** | Lois usuelles (Binomiale, Poisson) | Données d'entrées numériques brutes sans scénario de modélisation. | L'élève applique aveuglément des formules sans savoir quel phénomène réel est modélisé. | **Prescrit :** Contextualiser avec des taux de pannes de serveurs ou des arrivées de paquets réseau. |

### B. Cours `b1-stats` (Statistique descriptive B1)
*Source canonique :* [server/exercises/b1-stats.js](file:///home/rd/Desktop/proba/server/exercises/b1-stats.js)

| Exercice | Intitulé | Anomalie Identifiée | Remédiation Appliquée |
| :--- | :--- | :--- | :--- |
| **`st-c1-e1`** | Effectif, minimum et maximum | Indice conseillant `len()`, `min()` et `max()`. | **Corrigé :** Définition statistique de l'effectif $N$ et des extremums de la série ordonnée. |
| **`st-c1-e2`** | Série ordonnée | Indice : `sorted(serie)` et `separateur " "`. | **Corrigé :** Explication de l'intérêt didactique du tri pour l'identification de la médiane et de l'étendue. |
| **`st-c1-e3`** | Nombre de modalités | Indice : `Un ensemble (set) en Python...`. | **Corrigé :** Distinction conceptuelle rigoureuse entre individu statistique et modalité distincte du caractère. |
| **`st-c3-e1`** | Moyenne arithmétique | Indice : `Attention en Python 3 : la division / donne un flottant...`. | **Corrigé :** Définition formelle de la moyenne $\bar{x} = \frac{1}{N}\sum x_i$ et tolérance décimale. |

### C. Cours `b1-algebre` (Algèbre linéaire B1)
*Source canonique :* [server/exercises/b1-algebre.js](file:///home/rd/Desktop/proba/server/exercises/b1-algebre.js)

| Exercice | Intitulé | Anomalie Identifiée | Remédiation Appliquée |
| :--- | :--- | :--- | :--- |
| **`al-c1-e1`** | Addition vectorielle | Indice : `range(n) te donne les indices... exactement ceux des listes Python`. | **Corrigé :** Explication vectorielle dans $\mathbb{R}^n$ (addition terme à terme dans le même espace). |
| **`al-c1-e3`** | Trace d'une matrice | Indice : `En Python, les indices commencent à 0 : matrice[i][i]`. | **Corrigé :** Définition de la diagonale principale d'une matrice carrée $A = (a_{i,j})$ avec $i = j$. |
| **`al-c2-e2`** | Transposition matricielle | Indice décrivant des boucles imbriquées `for i` et `for j`. | **Corrigé :** Règle mathématique d'inversion des dimensions ($M \in \mathcal{M}_{m,n} \implies M^T \in \mathcal{M}_{n,m}$) et échange lignes/colonnes. |

### D. Cours `RD-RO` (Recherche Opérationnelle B2)
*Source canonique :* [server/exercises/RD-RO/](file:///home/rd/Desktop/proba/server/exercises/RD-RO)

- **Chapitre 1 (`ro2-c1-e1` à `ro2-c1-e5`) :** Totalement rénové et validé lors de la phase précédente (suppression du format CSV `MAX;25,30;2,3`, introduction des contraintes contractuelles d'égalité, validation formelle des 4 hypothèses de George Dantzig, distinction PLNE/MIP, tolérance sur les fractions).
- **Chapitre 5 (`ro2-c5-e1` - Coin Nord-Ouest) :**
  * *Anomalie :* Indice mentionnant `Tant que i < len(offres) et j < len(demandes)`.
  * *Remédiation appliquée :* Remplacement par la démarche d'allocation séquentielle classique en recherche opérationnelle (saturation itérative des capacités d'offres et d'épuisement des demandes).

---

## 2. Famille Cybersécurité, Réseaux, Systèmes et Cloud

### A. Cours `Cyber securite B2`
*Source canonique :* [server/exercises/cyber-securite-b2/](file:///home/rd/Desktop/proba/server/exercises/cyber-securite-b2)

L'audit a révélé que **l'intégralité des 18 exercices** du cours présentait un bloc d'indices générique, répété à l'identique, imposant du code Python :
```text
"Lis l entrée standard avec input().strip() ou sys.stdin."
"Traite les cas selon la spécification de l exercice."
"Affiche le résultat exactement sous la forme attendue."
```
**Remédiation globale appliquée :**
Les 18 exercices ont été dotés d'indices d'ingénierie en cybersécurité réels et contextualisés :
- `cs2-c1-e1` : Calcul du score de risque ISO 27005 ($M \times V \times I$) et seuils de criticité (Faible, Moyen, Élevé, Critique) ;
- `cs2-c1-e2` : Triade CIA (Confidentialité, Intégrité, Disponibilité) et impacts directs (chiffrement malveillant, fuite, altération) ;
- `cs2-c1-e3` : Politiques de mots de passe robustes ANSSI / NIST SP 800-63B ;
- `cs2-c2-e1` : Propriétés du masque jetable (chiffre de Vernam) et involutivité du XOR ($A \oplus K \oplus K = A$) ;
- `cs2-c2-e2` : Effet avalanche des fonctions de hachage SHA-256 ;
- `cs2-c2-e3` : Mécanisme de signature asymétrique RSA (chiffrement du condensat avec clé privée) ;
- `cs2-c3-e1` : Évaluation ordonnée *First-Match* d'un pare-feu et politique par défaut *Default Deny* ;
- `cs2-c3-e2` : Détection des flux non chiffrés (Telnet 23, FTP 21, HTTP 80) et préconisations de durcissement ;
- `cs2-c3-e3` : Mécanisme d'attaque ARP Poisoning et détection d'incohérences de tables CAM/ARP ;
- `cs2-c4-e1` à `cs2-c4-e3` : Détection d'injections SQL (tautologies), assainissement XSS (échappement HTML) et failles d'autorisation IDOR ;
- `cs2-c5-e1` à `cs2-c5-e3` : Salage et étirement de clé (PBKDF2/bcrypt), failles JWT `alg=none`, matrice de contrôle d'accès RBAC ;
- `cs2-c6-e1` à `cs2-c6-e3` : Signatures NIDS Snort, seuils d'attaques par force brute et corrélation d'IoC (Threat Intelligence).

### B. Cours `b1-cyber` (Cybersécurité B1)
*Source canonique :* [server/exercises/b1-cyber.js](file:///home/rd/Desktop/proba/server/exercises/b1-cyber.js)

- **`cy-c3-e1` :** L'indice imposait un calcul en syntaxe Bash : `somme=$((somme + machines)) ... k(k-1)/2 s’écrit en Bash : paire=$((somme * (somme - 1) / 2))`.
  * *Correction :* Remplacement par la démonstration combinatoire du nombre de clés de session partagées dans un réseau maillé ($N(N-1)/2$).
- **`cy-c4-e3` :** L'indice contenait du code de manipulation de tableau Bash complexe : `Pour savoir si le fichier est présent, balaie le tableau avec ${#noms[@]} ... noms=("${liste[@]}")`.
  * *Correction :* Formulation orientée intégrité du système de fichiers et tenue d'un registre d'audit.
- **`cy-c5-e2` :** L'indice imposait un tableau associatif Bash : `declare -A echecs=() ... echecs["$ip"]=$((${echecs[$ip]:-0} + 1))`.
  * *Correction :* Règle d'analyse statistique des journaux d'authentification pour identifier la source d'une attaque.

### C. Cours `assembleur` (Assembleur B2)
*Source canonique :* [server/exercises/assembleur/](file:///home/rd/Desktop/proba/server/exercises/assembleur)

- **Balises HTML orphelines dans les consignes :**
  Dans `asm2-c1-e1`, `asm2-c1-e2`, `asm2-c3-e2`, `asm2-c4-e2` et `asm2-c5-e2`, une regex antérieure avait coupé le premier élément de liste `<li>`, laissant des `</li></ul>` non appariés dans le code HTML affiché.
  * *Correction :* Restauration complète des listes à puces HTML décrivant les opérandes d'entrée et le format de registre attendu.
- **Indices Python hors sujet :**
  Dans `asm2-c1-e1`, `asm2-c3-e3`, `asm2-c4-e2`, `asm2-c4-e3`, `asm2-c5-e2`, `asm2-c5-e3`, `asm2-c6-e1`, les indices expliquaient comment convertir en hexadécimal en Python (`int(s, 16)`, `f"HEX=0x{res:02X}"`, `stack.append()`).
  * *Correction :* Explications architecturales x86 authentiques (manipulation des registres, arithmétique en complément à 2, mode d'adressage `Base + Index * Scale + Déplacement` de l'instruction `LEA`, fonctionnement de la pile avec `ESP`).

### D. Cours Réseaux, Systèmes et Cloud B1 & B3
- **`b1-reseaux` (`re-c6-e1`) :** Remplacement de `(1 << e)` en Bash par le calcul binaire du masque de sous-réseau et de la formule $2^{32-p} - 2$.
- **`b1-architecture` (`ar-c2-e1`, `ar-c2-e3`, `ar-c3-e3`) :** Suppression des références à `$((2#1010))` et `$((16#FF))` au profit des puissances de 2 et des groupements de bits (quartets hexadécimaux et triplets octaux).
- **`b1-virtualisation` (`vt-c1-e2`, `vt-c6-e2`) :** Suppression des allusions aux tests de comparaison Bash (`-lt`, `-gt`, division entière) au profit de l'analyse de sous-utilisation de serveurs physiques.
- **`b3-cloud-computing`, `b3-cloud-azure`, `b3-cloud-aws`, `b3-cryptographie`, `b3-firewall`, `b3-github`, `b3-reseau-lan`, `b3-sql`, `b3-veille`, `b3-google-cloud`, `b3-hacking`, `b3-supervision` :**
  Purger les allusions aux bibliothèques Python (`math.exp`, `hashlib.sha1`, `setA & setB`, `collections.deque`) dans les grilles d'évaluation pour recentrer l'élève sur l'analyse des SLAs, les calculs de MTTR/MTBF, les topologies réseau et les protocoles de chiffrement.

---

## 3. Famille Droit, Gestion, Méthodologie et Langues

### A. Cours `b1-bureautique`
*Source canonique :* [server/exercises/b1-bureautique.js](file:///home/rd/Desktop/proba/server/exercises/b1-bureautique.js)
- **`bu-c4-e1` & `bu-c5-e2` :** Dans un cours destiné à enseigner les tableurs (Microsoft Excel, LibreOffice Calc), les indices expliquaient l'extraction de texte avec la syntaxe de découpage de chaînes Bash (`${chaine:0:n}`, `${chaine: -n}`).
  * *Correction :* Utilisation exclusive des véritables fonctions de formules de tableur (`GAUCHE`, `DROITE`, `STXT`, `MOYENNE`, `MAX`, `MIN`).

### B. Cours `b1-fr-pro` & `b1-anglais`
- **`fr-c6-e3`, `fr1-c5-e2`, `en-c6-e3` :** Suppression des mentions incongrues de « division entière Bash » dans l'évaluation de grilles de compétences linguistiques.
  * *Correction :* Alignement sur les descripteurs du Cadre Européen Commun de Référence pour les Langues (CECRL).

### C. Cours de Méthodologie (`masterclass-apprendre`, `ingenierie-besoin`, `erp-si`)
- **`mc2-c1-e3`, `mc2-c2-e3`, `mc2-c5-e1` :** Remplacement des instructions de découpage de listes Python (`elements[i:i+3]`, `len(mot) > 8`, `split()`) par les concepts neuroscientifiques d'ancrage mnésique (chunking de Miller, courbe de l'oubli d'Ebbinghaus, répétition espacée).
- **`ib2-c3-e2` :** Remplacement de `round(sum(notes) / len(notes), 1)` par le calcul formel de la moyenne pondérée des priorités métier.
- **`erp2-c1-e2` :** Remplacement des manipulations d'ensembles Python par la réconciliation comptable entre module de facturation et base de données commerciale.

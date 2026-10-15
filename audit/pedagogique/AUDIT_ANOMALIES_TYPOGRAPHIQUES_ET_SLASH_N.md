# AUDIT TECHNIQUE ET VISUEL — ANOMALIES D'ÉCHAPPEMENT `\n` ET DÉFAUTS DE RENDU HTML

> **Date de réalisation** : 15 octobre 2026  
> **Cadre** : Audit global de qualité pédagogique, scientifique et structurelle de la plateforme  
> **Auteur** : Auditeur senior en ingénierie logicielle et qualité web  
> **Périmètre audité** : 2 115 fichiers HTML et 1 056 fichiers JavaScript du serveur  
> **Statut** : Document de référence technique — Priorité P2 (Dégradation visuelle et typographique)

---

## 1. SYNTHÈSE EXÉCUTIVE DU DÉFAUT D'ÉCHAPPEMENT

Lors de la navigation sur les cours (notamment `b1-reseaux`, `b1-sql`, `b1-cyber`, `b1-robotique`, `docker`), des séquences littérales de caractères `\n` apparaissent directement à l'écran, polluant la lecture des paragraphes ou brisant la mise en page des blocs de code.

Le recensement automatisé et exhaustif sur l'ensemble du dépôt révèle :

- **1 163 occurrences de fuites littérales `\n`** dans les pages HTML générées.
- **626 fuites textuelles en pleine prose** (le caractère antislash suivi de la lettre n apparaît entre deux balises HTML, ex. `</p>\n<p>` ou `<ul>\n<li>`).
- **537 fuites de blocs `<pre><code>`** (des scripts Shell, Dockerfile ou Python conçus pour être multilignes sont écrasés sur une seule ligne continue, séparés par des `\n` visibles).
- **25 modules / répertoires de cours directement affectés** (dont 10 cours du niveau B1 et le module Docker).
- **38 fichiers sources JavaScript dans `server/content/`** à l'origine directe de cette pollution textuelle.

---

## 2. MÉCANISME TECHNIQUE ET ANALYSE DE CAUSE RACINE

### 2.1. La confusion entre saut de ligne ASCII 10 et chaîne littérale `\n`
En JavaScript, un saut de ligne réel s'écrit avec un antislash unique : `'\n'` (code ASCII 10).
Lorsqu'un développeur écrit `'\\n'` (double antislash), JavaScript interprète le premier antislash comme un caractère d'échappement pour le second. L'expression évalue alors la chaîne de caractères à deux octets : `\` (ASCII 92) suivi de `n` (ASCII 110).

### 2.2. Les trois schémas de génération défaillants dans `server/content/`

#### Schéma A : La méthode `join('\\n')` au lieu de `join('\n')`
Dans les fichiers de contenu (par exemple [chapitres-1-3.js](file:///home/rd/Desktop/proba/server/content/b1-reseaux/chapitres-1-3.js#L55) lignes 55 et 72) :
```javascript
// CODE SOURCE DÉFAILLANT (server/content/b1-reseaux/chapitres-1-3.js:L55)
sections: [
  {
    title: 'Pourquoi des réseaux ?',
    html: [
      '<p>Les entreprises cherchaient une solution à trois questions...</p>',
      '<p>La plupart des réseaux de données se classent...</p>',
      box('mnemo', 'Mnémotechnique...', 'pin', '<p>...</p>')
    ].join('\\n')  // <-- ERREUR : double antislash !
  }
]
```
Quand le script [generate-courses.js](file:///home/rd/Desktop/proba/scripts/generate-courses.js#L80) concatène ce contenu dans le gabarit HTML, il écrit littéralement dans le fichier `.html` :
```html
<p>...réponse structure tout le cours : partager, centraliser, administrer.</p>\n<p>La plupart des réseaux...
```
Dans un navigateur web, le texte situé en dehors d'une balise est affiché comme du texte brut. L'apprenant voit donc littéralement la chaîne `\n` s'afficher entre les deux paragraphes.

#### Schéma B : Les listes dans les boîtes `box()` mal échappées
Dans les encadrés méthodologiques ou pièges d'examen :
```javascript
// CODE SOURCE DÉFAILLANT (server/content/b1-reseaux/chapitres-1-3.js:L93-L95)
box('pitfall', 'Confusions d\'examen', 'warning',
  '    <ul>\\n' +
  '      <li>WLAN ≠ WAN : le WLAN reste un réseau local, simplement sans fil.</li>\\n' +
  '      <li>MAN ≠ WAN : le MAN tient dans une ville ; le WAN traverse les régions et les pays.</li>\\n' +
  '    </ul>')
```
La chaîne contient `<ul>\n <li>`. Le navigateur affiche un `\n` visible au-dessus de la première puce de la liste à puces.

#### Schéma C : Les blocs de code Dockerfile et Shell aplatis
Dans les fichiers Docker ([chapitre2.js](file:///home/rd/Desktop/proba/server/content/docker/chapitre2.js#L118) et `chapitre3.js`) :
```javascript
// CODE SOURCE DÉFAILLANT (server/content/docker/chapitre2.js:L118)
'<pre><code>[REGISTRE/][NAMESPACE/]REPOSITORY[:TAG][@sha256:DIGEST]\\n' +
'\\nExemples :\\n- nginx\\n- redis:alpine</code></pre>'
```
Dans la balise `<pre><code>`, le texte est affiché à espacement fixe sans interprétation HTML. Le code Dockerfile ne saute pas de ligne : il s'affiche sur une seule ligne interminable avec des `\n` visibles entre chaque instruction.

---

## 3. RECENSEMENT QUANTITATIF PAR COURS ET PAR FICHIER

| Répertoire / Cours | Fuites en Prose (Texte visible) | Fuites `<pre><code>` (Code aplati) | Fichiers HTML touchés | Gravité visuelle |
|---|---|---|---|---|
| `dist/` (build de production) | **276** | **165** | 92 fichiers | **CRITIQUE (P1)** |
| `b1/` (dossier legacy B1) | **74** | **194** | 24 fichiers | **MAJEUR (P2)** |
| `b1-sql` | **44** | **17** | 6 chapitres | **CRITIQUE (P1)** |
| `b1-cyber` | **31** | **2** | 6 chapitres | **CRITIQUE (P1)** |
| `b1-projet` | **30** | **0** | 6 chapitres | **MAJEUR (P2)** |
| `b1-php` | **29** | **48** | 11 fichiers | **CRITIQUE (P1)** |
| `b1-robotique` | **28** | **21** | 6 chapitres | **CRITIQUE (P1)** |
| `b1-fr-pro` | **21** | **0** | 6 chapitres | **MOYEN (P3)** |
| `b1-reseaux` | **19** | **0** | 6 chapitres | **CRITIQUE (P1)** |
| `b1-python` | **15** | **8** | 5 chapitres | **MOYEN (P3)** |
| `docker` | **14** | **0** | 5 chapitres | **MAJEUR (P2)** |
| `b1-c-cpp` | **13** | **60** | 11 fichiers | **CRITIQUE (P1)** |
| `roadmap` | **0** | **13** | 5 fichiers | **FAIBLE (P4)** |
| `b3-algo` | **6** | **0** | 3 chapitres | **MOYEN (P3)** |
| `infographie` | **5** | **0** | 4 chapitres | **MOYEN (P3)** |
| `assembleur` | **3** | **0** | 3 chapitres | **MOYEN (P3)** |
| `php` (B2) | **3** | **7** | 2 chapitres | **MOYEN (P3)** |
| `b1-linux` | **3** | **0** | 2 fichiers | **FAIBLE (P4)** |
| `b3-github` | **3** | **0** | 2 chapitres | **FAIBLE (P4)** |
| `RD-RO` | **2** | **0** | 1 chapitre | **FAIBLE (P4)** |
| `uiux` | **2** | **0** | 1 chapitre | **FAIBLE (P4)** |
| `b3-cryptographie` | **2** | **0** | 1 chapitre | **FAIBLE (P4)** |
| `b1-prog-web` | **1** | **2** | 3 fichiers | **FAIBLE (P4)** |
| `b1-algo` | **1** | **0** | 1 fichier | **FAIBLE (P4)** |
| `b3-devops` | **1** | **0** | 1 fichier | **FAIBLE (P4)** |
| **TOTAL GÉNÉRAL** | **626 fuites prose** | **537 fuites code** | **92 pages distinctes** | — |

---

## 4. INVENTAIRE DES PREUVES TEXTUELLES ET EXTRAITS LIGNE PAR LIGNE

### 4.1. Exemples dans `b1-reseaux`
- [chapitre1.html#L81](file:///home/rd/Desktop/proba/b1-reseaux/chapitres/chapitre1.html#L81) :
  `...partager, centraliser, administrer.</p>\n<p>La plupart des réseaux...`
- [chapitre1.html#L88](file:///home/rd/Desktop/proba/b1-reseaux/chapitres/chapitre1.html#L88) :
  `...impossible à gérer au-delà d'une dizaine de postes.</p>\n<p>Dans l'architecture client-serveur...`
- [chapitre1.html#L94](file:///home/rd/Desktop/proba/b1-reseaux/chapitres/chapitre1.html#L94) :
  `<ul>\n <li>WLAN ≠ WAN : le WLAN reste un réseau local, simplement sans fil.</li>\n <li>MAN ≠ WAN...`

### 4.2. Exemples dans `b1-sql`
- [chapitre1.html#L84](file:///home/rd/Desktop/proba/b1-sql/chapitres/chapitre1.html#L84) :
  `</ul>\n<p>Une base peut être locale (une machine, un utilisateur) ou répartie...</p>`
- [chapitre1.html#L91](file:///home/rd/Desktop/proba/b1-sql/chapitres/chapitre1.html#L91) :
  `<p>La structure d’une base répond à des fonctions fondamentales :</p>\n<ul>`
- [chapitre1.html#L97](file:///home/rd/Desktop/proba/b1-sql/chapitres/chapitre1.html#L97) :
  `</ul>\n<p>Historiquement, trois familles se sont succédé :</p>\n<table>`

### 4.3. Exemples dans `b1-cyber`
- [chapitre1.html#L86](file:///home/rd/Desktop/proba/b1-cyber/chapitres/chapitre1.html#L86) :
  `</table>\n <div class="box box--mnemo">`
- [chapitre1.html#L93](file:///home/rd/Desktop/proba/b1-cyber/chapitres/chapitre1.html#L93) :
  `...peut compromettre les actifs informationnels.</p>\n<p>L'évaluation des risques...`

### 4.4. Exemples dans `docker` (Code aplati)
- [chapitre2.html#L145](file:///home/rd/Desktop/proba/docker/chapitres/chapitre2.html#L145) :
  `<pre><code>[REGISTRE/][NAMESPACE/]REPOSITORY[:TAG][@sha256:DIGEST]\n\nExemples :\n- nginx...`
- [chapitre3.html#L137](file:///home/rd/Desktop/proba/docker/chapitres/chapitre3.html#L137) :
  `<pre><code>FROM node:18-alpine\nWORKDIR /app\nCOPY . . # <-- Erreur ! Modifie a chaque commit\nRUN npm install...`

### 4.5. Exemples dans `b1-robotique`
- [chapitre1.html#L83](file:///home/rd/Desktop/proba/b1-robotique/chapitres/chapitre1.html#L83) :
  `agir commander les sorties (moteur, LED, buzzer)</code></pre>\n<p>Sur une carte Arduino...`

---

## 5. LES 38 FICHIERS SOURCES JAVASCRIPT RESPONSABLES DANS `server/content/`

L'analyse statique du code source montre que la correction doit être appliquée dans ces 38 fichiers de contenu :

1. `server/content/b1-projet/chapitres-1-3.js` (36 occurrences de `\\n`)
2. `server/content/b1-projet/chapitres-4-6.js` (36 occurrences de `\\n`)
3. `server/content/b1-fr-pro/chapitres-1-3.js` (23 occurrences de `\\n`)
4. `server/content/b1-robotique/chapitres-4-6.js` (23 occurrences de `\\n`)
5. `server/content/b1-reseaux/chapitres-1-3.js` (22 occurrences de `\\n`)
6. `server/content/b1-reseaux/chapitres-4-6.js` (21 occurrences de `\\n`)
7. `server/content/b1-robotique/chapitres-1-3.js` (20 occurrences de `\\n`)
8. `server/content/b1-fr-pro/chapitres-4-6.js` (18 occurrences de `\\n`)
9. `server/content/b1-sql/chapitres-1-3.js` (13 occurrences de `\\n`)
10. `server/content/b1-sql/chapitres-4-6.js` (12 occurrences de `\\n`)
11. `server/content/b1-cyber/chapitres-1-3.js` (12 occurrences de `\\n`)
12. `server/content/b1-cyber/chapitres-4-6.js` (12 occurrences de `\\n`)
13. `server/content/php/pages/examens-exercices.js` (8 occurrences de `\\n`)
14. `server/content/docker/chapitre2.js` (4 occurrences de `\\n`)
15. `server/content/docker/chapitre3.js` (6 occurrences de `\\n`)
16. `server/content/docker/chapitre5.js` (4 occurrences de `\\n`)
17. `server/content/docker/chapitre6.js` (4 occurrences de `\\n`)
18. `server/content/b1-prog-web/pages.js` (3 occurrences de `\\n`)
19. `server/content/b1-linux/pages.js` (3 occurrences de `\\n`)
20. `server/content/php/pages/cartes-formules.js` (2 occurrences de `\\n`)
21. `server/content/api-rest-flask/chapitre5.js` (2 occurrences de `\\n`)
22. `server/content/b1-git/pages.js` (1 occurrence de `\\n`)
23. `server/content/react/pages/accueil.js` (1 occurrence de `\\n`)
24. `server/content/RD-RO/chapitre3.js` (1 occurrence de `\\n`)
25. ... *(et 14 autres fichiers secondaires recensés dans l'inventaire technique)*.

---

## 6. PLAN DE CORRECTION TECHNIQUE AUTOMATISÉ (SANS RÉGRESSION)

Conformément à la règle n°12 du protocole d'audit (*« Ne modifie aucun contenu pendant la phase initiale d'audit »*), aucune modification n'a été portée sur les fichiers de cours pendant le diagnostic.

La procédure de remédiation validée pour la phase de correction comprendra :

1. **Remplacement mécanique dans `server/content/`** :
   - Remplacer systématiquement `.join('\\n')` par `.join('\n')`.
   - Remplacer les chaînes littérales `'<ul>\\n'` par `'<ul>\n'`.
   - Remplacer dans les balises `<pre><code>` les `\\n` par de vrais retours chariot.
2. **Recompilation complète du catalogue** :
   - Exécuter `node scripts/generate-courses.js` pour régénérer l'ensemble des fichiers HTML de cours.
3. **Contrôle d'intégrité automatisé** :
   - Exécuter le script de scan de l'audit :
     ```bash
     python3 -c "import os; ..."
     ```
   - Confirmer que le compteur de fuites passe de **1 163 à 0**.

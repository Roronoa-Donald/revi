# Fidélité aux Sources (Mission A) — `b1-git` (Git · B1)

- **Cours** : `b1-git` (Git) — Niveau **B1** (6 chapitres)
- **Documents sources rattachés (3 fichiers, 33 pages)** :
- `textes/B1/Git/git_quotidien.txt` (15 pages, statut `ok`)
- `textes/B1/Git/github-git-aide-mémoire.txt` (2 pages, statut `ok`)
- `textes/B1/General/tutoriel_projet.txt` (16 pages, statut `ok`)
- **Niveau de confiance** : **Élevé (git_quotidien.txt [15 p., ENSICAEN] + github-git-aide-mémoire.txt [2 p.] + tutoriel_projet.txt [16 p.], statut ok)**

## 1. Ordre d'introduction des notions (Sources vs Site)
- **Verdict sur l'ordre** : **Déplacement de git clone du début (p. 2 de la source) au Chapitre 5 du site, et avancement de git diff au Chapitre 3**
- **Ordre dans la source principale (`textes/B1/Git/git_quotidien.txt#PAGE 1-15`)** : Section 1 : Création d'un projet (`1.1 git init` à `#PAGE 1`, **`1.2 git clone` et `origin` à `#PAGE 2`**) → Section 2 : Travailler localement (`git status`, `git add`, `.gitignore`, `git rm --cached`, `git reset HEAD`, `git commit`, `git log`, `git reset --soft/--mixed/--hard`, `git revert`, `#PAGE 2-7`) → Section 3 : Utiliser les branches (`git branch`, `git checkout`, `git merge`, résolution de conflits, `#PAGE 8-10`) → Section 4 : Synchroniser avec le dépôt distant (`git push`, `git fetch`, `git pull`, `#PAGE 11-13`) → Section 5 : Commandes annexes (`git diff`, `git stash`, `git archive`, `#PAGE 14-15`).
- **Ordre sur le site (`b1-git/chapitres/chapitre1..6.html`)** : Le site suit fidèlement les sections de `git_quotidien.txt`, mais regroupe `git clone` et `origin` (vus dès `#PAGE 2` de la source) avec `push/pull/fetch` au **Chapitre 5** (`chapitre5.html:L60`), et remonte `git diff` (vu à `#PAGE 14` de la source) au **Chapitre 3** (`chapitre3.html:L95`), ce qui est pédagogiquement cohérent.

## 2. Couverture (Lacunes & Ajouts)
- **Couverture** : 100 % des commandes de `git_quotidien.txt` (`#PAGE 1-15`) et de `github-git-aide-mémoire.txt` (`#PAGE 1-2`) sont couvertes, plus la publication GitHub Pages au Ch. 6 §4.

## 3. Comparaison de 3 Définitions-Clés (Source vs Site)
### Définition 1 — Les trois états / espaces de Git
- **Source PDF** : `textes/B1/Git/github-git-aide-mémoire.txt#PAGE 1` et `git_quotidien.txt#PAGE 2-3` : « Copie de travail (working directory), Index (zone de transit / staging area alimentée par `git add`) et Dépôt local `.git` (historique des commits validés par `git commit`). »
- **Site web** : `b1-git/chapitres/chapitre1.html:L92` : « Git articule trois espaces locaux : le répertoire de travail (working tree), l'index (staging area, préparé par `git add`) et le dépôt `.git` (commits figés par `git commit`). »
- **Diagnostic** : **Parfaitement fidèle**.

### Définition 2 — `git reset` vs `git revert`
- **Source PDF** : `textes/B1/Git/git_quotidien.txt#PAGE 6-7` : « `git reset` déplace le pointeur de branche vers un commit antérieur (sans garder de trace dans l'historique), tandis que `git revert` crée un nouveau commit qui applique l'inverse des modifications du commit ciblé (avec trace). »
- **Site web** : `b1-git/chapitres/chapitre3.html:L75-L88` : « `git reset` recule l'historique sans laisser de trace (`--soft`, `--mixed`, `--hard`), alors que `git revert` crée un nouveau commit inverse qui préserve l'historique partagé. »
- **Diagnostic** : **Identique et rigoureuse**.

### Définition 3 — `git fetch` vs `git pull`
- **Source PDF** : `textes/B1/Git/git_quotidien.txt#PAGE 12` : « `git fetch` rapatrie les nouveaux commits du dépôt distant sans modifier la copie de travail locale ; `git pull` enchaîne `git fetch` suivi immédiatement d'un `git merge`. »
- **Site web** : `b1-git/chapitres/chapitre5.html:L84` : « `git fetch` télécharge les nouveautés distantes dans `origin/main` sans toucher à ton travail ; `git pull` équivaut à `git fetch` + `git merge`. »
- **Diagnostic** : **Exactement alignée**.

## 4. Alignement des Exercices avec les TD/TP des Sources
- La source `git_quotidien.txt` est un vade-mecum de commandes Git sans exercices de programmation ; sur le site, les exercices font écrire des scripts Bash qui analysent ou simulent des sorties Git.

# REVI-MU — Application Web & Cours Interactifs (`cours-html`)

Bienvenue sur la branche ultra-légère **`cours-html`** de la plateforme d'apprentissage **REVI-MU**.

Cette branche est strictement dédiée à l'expérience d'apprentissage web interactive. Tous les gros fichiers binaires (vidéos de cours, images ISO d'installation de 1 Go, archives ZIP de plusieurs dizaines de mégaoctets et documents PDF bruts) ont été extraits et placés sur leurs branches dédiées :
- 📁 **`cours-pdf`** : Tous les cours, slides et supports au format PDF.
- 🎬 **`cours-media`** : Vidéos de cours MP4, image ISO pfSense et archives ZIP.

---

## 🚀 Contenu de cette Branche

- **68 cours interactifs complets** couvrant les trois années :
  - **B1** (23 cours interactifs + préparation web) : Algorithmique, C/C++, Linux, Python, SQL, Réseaux, Web, etc.
  - **B2** (21 cours interactifs) : Recherche Opérationnelle, Assembleur, Cybersécurité, Droit, PHP, etc.
  - **B3** (23 cours interactifs) : Cloud AWS/Azure/GCP, Cryptographie, DevOps, pfSense, Hacking, etc.
- **Portail d'Accueil Moderne** (`index.html`) avec système de filtrage instantané.
- **Moteur d'Exercices et Ateliers de Code** (`assets/js/code-lab.js`) :
  - Saisie native légère pour les matières théoriques (`language: 'analyse'`).
  - Éditeur Monaco compartimenté pour les matières de programmation pure.
- **Design System « Latte »** (`DESIGN.md`, `assets/css/tokens.css`) :
  - Typographie **JetBrains Mono** variable hébergée 100% hors-ligne dans `assets/fonts/`.
  - Mode sombre reposant avec transitions fluides sans flash.
- **Serveur Backend Fastify Sécurisé** (`server/app.js`) :
  - Exécution cloisonnée sécurisée, limitations de taux, protection fail-closed.
- **Suite de Tests Complète** : 100% verte sur l'intégralité du catalogue.

---

## 🛠️ Démarrage Rapide

### Prérequis
- Node.js version 20 ou supérieure (recommandé v22)
- npm

### Installation & Démarrage
```bash
# Installer les dépendances
npm install

# Lancer la suite complète de vérification (7 470 tests)
npm test

# Lancer le serveur en local sur le port 3000
npm start
```

### Compilation statique
```bash
node scripts/build.js
```

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
- **Suite de tests locale** : les résultats et leurs limites sont détaillés dans `corrections/`.

---

## 🛠️ Démarrage Rapide

### Prérequis
- Node.js 22.x (les vérifications locales utilisent les versions 22.23.2 et 22.23.4)
- npm

### Installation & Démarrage
```bash
# Installer les dépendances
npm install

# Lancer la suite de tests automatisée
npm test

# Lancer le serveur en local sur le port 3000
npm start
```

### Compilation statique
```bash
node scripts/build.js
```

### Déploiement et version de Node.js

- `package.json` et `package-lock.json` déclarent Node.js `22.x`. Par défaut, npm peut seulement avertir si la version locale ne correspond pas : vérifiez `node --version` avant installation et exécution.
- Sur Render, le blueprint `render.yaml` définit `NODE_VERSION=22.23.4`. Vérifiez que le service utilise ce blueprint et que la variable dans son tableau de bord a bien cette valeur ; `NODE_VERSION` est prioritaire sur les fichiers de version et sur `engines`.
- Sur Vercel, `engines.node` sélectionne la branche majeure `22.x`. Vercel gère les versions mineures et correctives ; la version exacte peut différer entre la construction et les fonctions. Vérifiez la version de la construction et, si nécessaire, `process.version` côté serveur.
- Ces paramètres décrivent la configuration voulue : ils ne confirment pas, à eux seuls, la version d'un déploiement existant.

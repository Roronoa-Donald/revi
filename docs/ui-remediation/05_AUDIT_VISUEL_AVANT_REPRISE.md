# 05 — Audit visuel avant reprise

Date : 5 novembre 2026. Périmètre : application réelle servie depuis `dist/`, comparée aux exports Stitch.

## 1. Ce que montrait le rendu précédent

La transformation précédente avait remplacé les **valeurs** des tokens et la famille typographique, sans remplacer la **composition**. Constats vérifiés dans le code et au navigateur :

| Symptôme | Cause réelle | Preuve |
|---|---|---|
| Rendu « proche » de Stitch mais pas fidèle | seules couleurs, polices, rayons et ombres avaient changé ; le DOM restait l'ancien | `scripts/course-kit.js` v4 : `<nav class="…nav">` avec lien « Portail » en bouton, aucune marque, pas de fil d'Ariane contextuel, aucun pied de page |
| Sommaire en liste de liens | `.toc__item` = flex, numéro en texte coloré, pas de pastille carrée ni colonne de méta | `scripts/templates/cours.css` v4 |
| Chapitre sans cartes de section | `h2` souligné, encadrés plats sans tuile d'icône | `cours.css` v4 |
| Conteneur trop large | `max-width: 920px` sur toutes les pages | `cours.css` v4 |
| Portail compact | `grid-template-columns: repeat(auto-fill, minmax(230px, 1fr))`, descriptions masquées | `assets/css/portal.css` v3 |
| Onglet de niveau illisible | règles inline en fin de `index.html` écrasant la feuille portail | `index.html`, bloc `.level-tab.is-active` |
| Authentification hors charte | `--font: 'JetBrains Mono'` dans le `<style>` de trois pages | `public/login.html`, `public/account.html`, `public/admin/dashboard.html` |
| 404 sans marque | 404 bleu, boutons génériques, pas de repère de marque | `404.html` |
| Aucun pied de page sur les cours | coquille terminée par les scripts | `scripts/course-kit.js` |

## 2. Pourquoi la suite de tests ne pouvait pas l'attraper

`npm test` vérifie l'intégrité fonctionnelle (contenus, tests cachés, protection, génération idempotente) et quelques garde-fous de style. Aucune assertion ne compare une capture réelle à une référence : des tokens à jour passent les tests sans que la composition change.

## 3. Méthode appliquée

1. lecture des 26 captures Stitch et des `code.html` correspondants ;
2. mesure des dimensions réelles des exports (206 → 1600 px de large) ;
3. réécriture du gabarit partagé et de la feuille de cours (une source pour 832 pages) ;
4. adaptateur de composition transformant les listes `.toc` des modules de contenu en lignes de chapitres et cartes de ressources Stitch, sans toucher au texte ;
5. reprise du portail, de l'authentification, du compte, de l'administration et de la 404 ;
6. campagne de captures sur toutes les pages de `dist/` (document 06) ;
7. comparaison pixel des références (document 07).

## 4. Écarts structurels corrigés (avant → après)

| Élément | Avant | Après |
|---|---|---|
| En-tête de cours | liens plats + bouton « Portail » | marque carrée verte, mot « cours.interactifs », fil d'Ariane « Portail / Matière », onglets soulignés |
| Largeur de lecture | 920 px partout | 980 px (sommaire), 896 px (chapitre), 1280 px (accueil) |
| Lignes de chapitres | lien texte numéroté | carte bord 2 px, pastille 40 px verte si libre, titre 17 px, description, pastille d'accès à droite |
| Sections de chapitre | prose nue | cartes blanches, encadrés à bord coloré, tuile d'icône 36 px |
| Ressources | liste de liens | grille de cartes (tuile, description, pied « Ouvrir → ») |
| Portail | héros centré, grille auto | héros Stitch, sélecteur segmenté + recherche sur une ligne, grille 4 colonnes, barre de section avec tri |
| Pied de page | absent sur les cours | pied chaud bordé ; pied encre sur le portail |
| Authentification | JetBrains Mono | Hanken Grotesk + Space Grotesk, vert #21c35e, rayons 12/8 |
| 404 | bleu sans marque | marque verte, 404 vert, boutons à enfoncement |

## 5. Limites

- Aucune capture « avant » n'a été archivée dans le dépôt : l'état antérieur est établi par le code et les observations de session.
- Les exports Stitch sont déjà mis à l'échelle (largeurs non standard) : la comparaison pixel est normalisée à leur largeur, ce qui introduit un facteur d'échelle (document 07).
- Les pages d'administration dépendant d'une session réelle ne peuvent pas être validées fonctionnellement sans base PostgreSQL ; seul le rendu statique est vérifié.

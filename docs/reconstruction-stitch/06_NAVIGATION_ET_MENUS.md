# 06 — Menus et systèmes de navigation

## 1. Carte globale de navigation

```
                       ┌──────────────────────────────┐
                       │  Portail  /  index.html      │
                       └───┬──────────┬───────────┬───┘
            70 cartes      │          │           │
        ┌──────────────────┘          │           └───────────────┐
        ▼                             ▼                           ▼
┌───────────────────┐        ┌────────────────────┐      ┌──────────────────┐
│ Cours (68)        │        │ /_auth/login.html  │      │ preparation-web  │
│ index → sommaire  │        │ 4 vues             │      │ atelier HTML/JS  │
│ → chapitres       │        └─────────┬──────────┘      └──────────────────┘
│ → atelier         │                  ▼
│ → cartes/mémo     │        ┌────────────────────┐      ┌──────────────────┐
│ → examens         │        │ /_auth/account    │─────▶│ FedaPay (externe)│
└───────────────────┘        │ compte+abonnement │      └──────────────────┘
                             │ sélecteur de cours │
                             └─────────┬──────────┘
                                       ▼
                             ┌────────────────────┐
                             │ /_auth/admin/*     │
                             │ login → dashboard  │
                             └────────────────────┘

        ┌──────────────────┐
        │ epreuves/index   │  (compte + abonnement)
        └──────────────────┘
```

Il n'existe **aucune navigation persistante unique** : chaque famille a sa propre barre. Le seul lien commun est le retour au portail (`/`), présent dans toutes les navigations de cours et les pages d'authentification.

## 2. Navigation du portail

| Zone | Élément | Cible | État |
|---|---|---|---|
| Topbar gauche | Logo + « cours.interactifs » | `/index.html` | aria-label « cours.interactifs — Accueil » |
| Topbar centre | « Épreuves » | `epreuves/index.html` | hover |
| Topbar centre | « Atelier » | `preparation-web/index.html` | hover |
| Topbar centre | « Mon compte » | `/_auth/account.html` | hover |
| Topbar droite | Bouton profil (icône utilisateur) | `/_auth/account.html` | `.is-authenticated` si connecté |
| Topbar droite | Bascule thème | — | soleil/lune, aria-label « Activer le mode sombre » |
| Hero | 4 onglets de niveau | — | `role=tablist`, flèches gauche/droite |
| Hero | Champ de recherche | — | filtrage direct |
| Grille | 70 cartes | `/<cours>/sommaire.html` | hover, focus |
| Section conditionnelle | Carte « Reprendre » | dernier cours consulté | `hidden` si aucune progression |
| Pied de page | Mon compte · Épreuves · Atelier | — | fond noir |

**Comportement des onglets** : clic ou flèches ←/→ ; `aria-selected` ; persistance dans `localStorage` (`portal_selected_level`) ; le niveau du compte connecté est appliqué **seulement** si aucun niveau n'est déjà mémorisé ni passé en URL (`?level=`).

## 3. Navigation d'un cours (`alnav`)

Présente sur toutes les pages du cours, sticky, largeur interne 980 px :

```
[🏠 Portail] / [icône] <Nom court>     Sommaire  Ch.1  [Ch.2 …]  Cartes  Mémo  Exercices  Atelier  Examen
```

Variantes observées :

- **Sommaire** : 7 liens (Sommaire, Chapitre 1, Cartes, Mémo, Exercices, Atelier, Examen).
- **Page de chapitre** : lien actif = chapitre courant (`.is-active`), pas de liste complète des chapitres.
- **Atelier** : liste complète des chapitres (Ch. 1 … Ch. N) + Cartes, Mémo, Exercices, Atelier actif.
- **`b1-sql`** : nav spécifique `sqlnav` avec lien d'évitement et chapitres 1 à N.
- **`b1-python`** : nav `pynav`.

Le nom court et l'icône sont propres au cours (`Algo B1`, `Python B1`, `SQL B1`). L'accent est la couleur du cours.

### Fil d'Ariane

`<Portail> › <Accueil du cours> › <Sommaire> › <Chapitre N | Atelier | Cartes | Mémo>`.
Le premier élément pointe vers `/` sur les pages d'accueil de cours, vers l'accueil du cours ailleurs.

### Navigation de bas de page

`.chnav` : bouton secondaire à gauche (retour sommaire/accueil), bouton primaire à droite (chapitre suivant / commencer le chapitre 1). Sur la page d'accueil du cours : « Portail des cours » + « Commencer ».

## 4. Navigation de la page compte

| Zone | Élément | Effet |
|---|---|---|
| Carte | Lien « Retour à l'accueil » | `/` |
| État anonyme | « Se connecter » | `/_auth/login.html` |
| État anonyme | « Créer un compte » | `/_auth/login.html?mode=register` |
| État connecté | « Se déconnecter » | `POST /api/logout` puis `/` |
| Sélecteur | « Mes cours » | liste par niveau |
| Sélecteur, niveau accessible | carte de cours | `/<cours>/index.html` |
| Sélecteur, niveau non accessible | carte `.is-locked` | aucun clic (pointer-events none), cadenas |
| En-tête de niveau | libellé + badge « n dispo » ou « n verrouillé » | opacité réduite si verrouillé |

**Important pour Stitch** : le sélecteur affiche **les trois niveaux**, pas seulement ceux du compte. Un compte B1 voit donc les cours B2/B3 en gris avec cadenas.

## 5. Navigation d'administration

| Zone | Élément | Effet |
|---|---|---|
| Header | Logo + titre | — |
| Header | « Site » | `/` |
| Header | « Déconnexion » | `POST /api/admin/logout` puis login |
| Onglets | Comptes | cartes création + liste |
| Onglets | Sessions | tableau des sessions |
| Onglets | Paiements | tableau des paiements |
| Onglets | Journal | filtres + liste paginée |
| Onglets | Fournisseurs & Clés IA | 3 cartes (config, pool, ajout) |
| Login | « Retour au site » | `/` |

Les onglets sont des boutons (pas des liens) : aucun rechargement, bascule par `style.display`.

## 6. Navigation de Preparation Web

| Zone | Élément | Effet |
|---|---|---|
| Topbar | Logo | `/index.html` |
| Topbar | Cheatsheet | `/preparation-cheatsheet.html` (nouvel onglet) |
| Topbar | Progression | `/preparation-progression.html` |
| Topbar | Classement | `/preparation-classement.html` |
| Topbar | Thème | bascule |
| Rail | 12 projets | change le projet courant |
| Rail | liens de bas de rail | cheatsheet, progression, classement, portail |
| Workspace | « Projets » | replie/déplie le rail |
| Workspace | « Cours » | replie/déplie le panneau de cours |
| Workspace | « Focus code » | masque les panneaux latéraux |
| Workspace | Précédent / Suivant | étapes du projet |
| Éditeur | HTML / CSS fourni / JavaScript | change d'onglet d'édition |
| Éditeur | Indice / Solution / Réinitialiser | actions |
| Aperçu | interrupteur Structure + CSS | bascule le rendu |
| Aperçu | Rafraîchir | recharge l'iframe |
| Flottant | FAB « IA » | ouvre le panneau d'indices |

## 7. Navigation des annales

- Sommaire interne des 8 matières (ancres/titres).
- 8 onglets `.sub-tab-btn` : une matière à la fois.
- Chaque panneau contient son QCM et son bloc de code ; le score est propre à la matière.
- Aucun lien de retour visible dans l'extraction : la page est une destination terminale (à vérifier en runtime).

## 8. Navigation clavier

| Contexte | Touche | Effet |
|---|---|---|
| Onglets de niveau (portail) | ← / → | onglet précédent/suivant + activation |
| Onglets de console (lab) | ← / → | onglet Sortie/Erreurs/Détails |
| Éditeur de code | Ctrl + Entrée | exécute |
| Champ question tuteur | Entrée | demande l'explication |
| Flashcard | Entrée / Espace | retourne la carte |
| Lien d'évitement | Tab | devient visible, saute au contenu |
| Modales Preparation | Échap (à vérifier) | fermeture (bouton × présent) |
| Admin | Tab | navigation séquentielle dans les formulaires |

## 9. Ce que la navigation ne fait pas

- Pas de menu déroulant, pas de sous-menu, pas de « mega-menu ».
- Pas de fil d'Ariane sur le portail, la page compte, l'admin, les annales.
- Pas de recherche globale depuis une page de cours.
- Pas de lien direct vers les chapitres 2+ depuis le portail (on passe par le sommaire).
- Pas de navigation entre cours depuis une page de cours (seulement le retour portail ou le sélecteur de la page compte).
- Pas d'indicateur de niveau global dans le `alnav`.

## 10. Recommandation de reconstruction

Pour Stitch, traiter la navigation comme **quatre systèmes distincts** à ne pas fusionner :

1. topbar du portail (3 liens + profil + thème) ;
2. `alnav` de cours (marque + 7 liens contextuels + fil d'Ariane) ;
3. carte d'authentification (onglets internes, pas une navigation de site) ;
4. coquille d'application Preparation (rail + barre d'outils + onglets d'éditeur).

Les onglets admin et annales sont des **onglets de contenu**, pas des menus de navigation.

# Connexion

> Fiche extraite du fichier `public/login.html` (407 lignes, 19.2 Ko, sha256 `04127fc7c864`).
> Famille : **sources-auth** · sous-type : `public` · statut : **source-publique-auth**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/_auth/login.html` |
| Titre du document | Connexion — Cours Interactifs |
| Description meta | — |
| Robots | noindex |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre |
| Statut de service | source-publique-auth |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | h1 | — | Connexion |
| 2 | form | loginForm, registerForm, forgotForm, resetForm | 4 formulaire(s) |

## 3. Hierarchie des titres

- **H1** — Connexion

## 4. Navigation et liens

Liens sortants : **1** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Retour à l'accueil | `/` | `.` | interne |

## 5. Formulaires et champs

### Formulaire 1 — `loginForm`

- action : `(aucune)` · methode : `GET` · classe : `view is-visible`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| input | email | `loginEmail` | Email | — | oui |
| input | password | `loginPassword` | Mot de passe | — | oui |

### Formulaire 2 — `registerForm`

- action : `(aucune)` · methode : `GET` · classe : `view`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| input | email | `regEmail` | Email | — | oui |
| input | text | `regName` | Prénom (optionnel) | — | non |
| input | password | `regPassword` | Mot de passe (8 caractères minimum) | — | oui |

### Formulaire 3 — `forgotForm`

- action : `(aucune)` · methode : `GET` · classe : `view hidden`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| input | email | `forgotEmail` | Email | — | oui |

### Formulaire 4 — `resetForm`

- action : `(aucune)` · methode : `GET` · classe : `view hidden`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| input | password | `resetPassword` | Nouveau mot de passe (8 caractères minimum) | — | oui |

## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| Se connecter |  | tabLogin | `tab is-active` | — | actif | — |
| S'inscrire |  | tabRegister | `tab` | — | actif | — |
| Se connecter | submit | loginBtn | `btn` | — | actif | — |
| Mot de passe oublié ? | button | showForgot | `link-btn` | — | actif | — |
| B1 Licence 1 24 cours | button | — | `level-card` | — | actif | data-level=b1 |
| B2 Licence 2 48 cours | button | — | `level-card is-selected` | — | actif | data-level=b2 |
| B3 Licence 3 71 cours | button | — | `level-card` | — | actif | data-level=b3 |
| Créer mon compte | submit | registerBtn | `btn` | — | actif | — |
| Recevoir le lien | submit | forgotBtn | `btn` | — | actif | — |
| Retour à la connexion | button | backToLogin | `link-btn` | — | actif | — |
| Enregistrer | submit | resetBtn | `btn` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page hors produit : aucun etat d'interface a reconstruire.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 3 · images : 0
- Icones du sprite utilisees : `#i-graduation`, `#i-arrow-left`
- Volume de texte : ~1402 mots · 72 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`
- Scripts externes : `/_auth/js/fingerprint.js`
- Blocs `<style>` inline : 1 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 21. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `view` | 4 |
| `msg` | 4 |
| `btn` | 4 |
| `level-card` | 3 |
| `lv-id` | 3 |
| `lv-name` | 3 |
| `lv-count` | 3 |
| `subtitle` | 2 |
| `tab` | 2 |
| `link-btn` | 2 |
| `hidden` | 2 |
| `card` | 1 |
| `logo` | 1 |
| `tabs` | 1 |
| `is-active` | 1 |
| `is-visible` | 1 |
| `level-grid` | 1 |
| `is-selected` | 1 |
| `level-hint` | 1 |
| `ic` | 1 |

Attributs `data-*` : `data-level` (3)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.

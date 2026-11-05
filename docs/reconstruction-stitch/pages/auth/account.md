# Mon compte

> Fiche extraite du fichier `_auth/account.html` (421 lignes, 19.9 Ko, sha256 `5434e87313eb`).
> Famille : **auth** · sous-type : `compte` · statut : **miroir-racine-auth**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/_auth/account.html (sert en realite public/...)` |
| Titre du document | Mon compte — Cours Interactifs |
| Description meta | — |
| Robots | noindex |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre |
| Statut de service | miroir-racine-auth |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | h1 | — | Mon compte |
| 2 | h2 | — | Mes cours |

## 3. Hierarchie des titres

- **H1** — Mon compte
- **H1** — Connexion requise
- **H1** — Mon compte
  - **H2** — Mes cours

## 4. Navigation et liens

Liens sortants : **4** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Se connecter | `/_auth/login.html` | `_auth/login.html` | interne |
| Créer un compte | `/_auth/login.html?mode=register` | `_auth/login.html?mode=register` | interne |
| Retour à l'accueil | `/` | `.` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| S'abonner — 1 000 F / mois |  | subscribeBtn | `btn` | — | actif | — |
| Renouveler — +1 mois (1 000 F) |  | renewBtn | `btn` | — | actif | — |
| Se déconnecter |  | logoutBtn | `btn is-white` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Vues mutuellement exclusives : connexion, inscription, mot de passe oublie, nouveau mot de passe.
- Messages d'erreur (rouge) et de succes (vert) inline ; bouton desactive pendant l'appel.
- Compte deja connecte : redirection vers la page compte.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 5 · images : 0
- Icones du sprite utilisees : `#i-graduation`, `#i-lock`, `#i-arrow-left`
- Volume de texte : ~1757 mots · 66 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`
- Scripts externes : `/_auth/js/fingerprint.js`
- Blocs `<style>` inline : 1 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 17. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `btn` | 5 |
| `row` | 4 |
| `k` | 4 |
| `v` | 4 |
| `state` | 3 |
| `logo` | 3 |
| `subtitle` | 3 |
| `is-white` | 2 |
| `back-link` | 2 |
| `hint` | 2 |
| `card` | 1 |
| `is-visible` | 1 |
| `ic` | 1 |
| `rows` | 1 |
| `msg` | 1 |
| `switcher` | 1 |
| `sw-sub` | 1 |

Aucun attribut `data-*`.

## 11. Controle qualite automatique

- Titres `h1` : 3 (a verifier)
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

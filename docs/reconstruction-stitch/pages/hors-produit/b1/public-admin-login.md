# Administration B1

> Fiche extraite du fichier `b1/public/admin/login.html` (90 lignes, 4.0 Ko, sha256 `8007be3fa6f0`).
> Famille : **hors-produit** · sous-type : `b1` · statut : **bloque-serveur**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1/... (403)` |
| Titre du document | Administration B1 - Connexion |
| Description meta | — |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `dark` |
| Chapitre (body) | — |
| Regle d'acces | Hors produit / archive |
| Statut de service | bloque-serveur |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | h1 | — | Administration B1 |
| 2 | form | loginForm | 1 formulaire(s) |

## 3. Hierarchie des titres

- **H1** — Administration B1

## 4. Navigation et liens

Liens sortants : **1** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Retour au site B1 | `/` | `.` | interne |

## 5. Formulaires et champs

### Formulaire 1 — `loginForm`

- action : `(aucune)` · methode : `GET` · classe : `—`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| input | text | `username` | Nom d'utilisateur | — | oui |
| input | password | `password` | Mot de passe | — | oui |

## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| Se connecter | submit | btnLogin | `auth-btn auth-btn-primary` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page hors produit : aucun etat d'interface a reconstruire.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 1 · images : 0
- Icones du sprite utilisees : aucune
- Volume de texte : ~181 mots · 33 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap`, `/_auth/css/auth-global.css`
- Scripts externes : aucun
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 17. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `auth-form-group` | 2 |
| `auth-label` | 2 |
| `auth-input` | 2 |
| `bg-gradient` | 1 |
| `bg-grid` | 1 |
| `auth-container` | 1 |
| `auth-card` | 1 |
| `auth-logo` | 1 |
| `auth-logo-icon` | 1 |
| `auth-title` | 1 |
| `auth-subtitle` | 1 |
| `auth-message` | 1 |
| `auth-message-error` | 1 |
| `auth-btn` | 1 |
| `auth-btn-primary` | 1 |
| `auth-btn-text` | 1 |
| `auth-back-link` | 1 |

Attributs `data-*` : `data-theme` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 2 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.

# Admin — Comptes & Abonnements

> Fiche extraite du fichier `_auth/admin/dashboard.html` (1032 lignes, 56.7 Ko, sha256 `9c22189bba3f`).
> Famille : **auth** · sous-type : `admin` · statut : **miroir-racine-auth**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/_auth/admin/dashboard.html (sert en realite public/...)` |
| Titre du document | Admin — Comptes & Abonnements |
| Description meta | — |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Cookie admin_token valide |
| Statut de service | miroir-racine-auth |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | h1 | — | Admin — Comptes & Abonnements |
| 2 | h2 | — | Créer un compte manuellement |
| 3 | h2 | — | Comptes utilisateurs |
| 4 | h2 | — | Sessions actives |
| 5 | h2 | — | Paiements FedaPay |
| 6 | h2 | — | Journal d'activité |
| 7 | h2 | — | Configuration IA Active & Modèles |
| 8 | h2 | — | Pool de Clés API & Tolérance aux Pannes |
| 9 | h2 | — | Ajouter une Clé API au Pool |
| 10 | form | createForm, aiConfigForm, addAiKeyForm | 3 formulaire(s) |
| 11 | table | — | 4 tableau(x) |
| 12 | .modal | dialogue | 3 element(s) |

## 3. Hierarchie des titres

- **H1** — Admin — Comptes & Abonnements
  - **H2** — Créer un compte manuellement
  - **H2** — Comptes utilisateurs
  - **H2** — Sessions actives
  - **H2** — Paiements FedaPay
  - **H2** — Journal d'activité
  - **H2** — Configuration IA Active & Modèles
  - **H2** — Pool de Clés API & Tolérance aux Pannes
  - **H2** — Ajouter une Clé API au Pool
    - **H3** — Confirmation

## 4. Navigation et liens

Liens sortants : **1** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Site | `/` | `.` | interne |

## 5. Formulaires et champs

### Formulaire 1 — `createForm`

- action : `(aucune)` · methode : `GET` · classe : `create-form`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| input | email | `userEmail` | — | eleve@exemple.com | oui |
| input | text | `userPassword` | — | à transmettre à l'élève | oui |
| input | text | `userDisplay` | — | Ex: Ahmed — formation Linux | non |
| select | — | `userMonths` | — | — | non |

### Formulaire 2 — `aiConfigForm`

- action : `(aucune)` · methode : `GET` · classe : `—`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| select | — | `aiProviderSelect` | — | — | non |
| select | — | `aiChatModelSelect` | — | — | non |
| input | text | `aiChatModelCustom` | — | Modèle personnalisé... | non |
| select | — | `aiCodeModelSelect` | — | — | non |
| input | text | `aiCodeModelCustom` | — | Modèle personnalisé... | non |

### Formulaire 3 — `addAiKeyForm`

- action : `(aucune)` · methode : `GET` · classe : `—`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| select | — | `newKeyProvider` | — | — | oui |
| input | password | `newKeySecret` | — | sk-or-... ou nvapi-... | oui |
| input | text | `newKeyLabel` | — | Ex: Clé Principale Pro #1 | non |
| input | text | `newKeyBaseUrl` | — | Ex: http://vps:11434/v1 | non |

## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| Déconnexion |  | — | `btn btn-ghost` | — | actif | — |
| Comptes |  | — | `tab active` | — | actif | — |
| Sessions |  | — | `tab` | — | actif | — |
| Paiements |  | — | `tab` | — | actif | — |
| Journal |  | — | `tab` | — | actif | — |
| Fournisseurs & Clés IA |  | — | `tab` | — | actif | — |
| Créer le compte | submit | btnCreate | `btn btn-success` | — | actif | — |
| Tous |  | — | `btn btn-ghost btn-sm active` | — | actif | data-filter=all |
| Abonnés |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=subscribed |
| Gratuits |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=free |
| Désactivés |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=disabled |
| Tout |  | — | `btn btn-ghost btn-sm active` | — | actif | data-logfilter= |
| Connexions |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=login |
| Inscriptions |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=user_registered |
| Paiements |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=payment_approved |
| Admin |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=admin_login |
| Actualiser modèles | button | btnFetchModels | `btn btn-ghost` | — | actif | — |
| Enregistrer | submit | btnSaveAiConfig | `btn btn-success` | — | actif | — |
| Toutes |  | — | `btn btn-ghost btn-sm active` | — | actif | data-aifilter= |
| OpenRouter |  | — | `btn btn-ghost btn-sm` | — | actif | data-aifilter=openrouter |
| NVIDIA NIM |  | — | `btn btn-ghost btn-sm` | — | actif | data-aifilter=nvidia |
| Ollama |  | — | `btn btn-ghost btn-sm` | — | actif | data-aifilter=ollama |
| Custom |  | — | `btn btn-ghost btn-sm` | — | actif | data-aifilter=custom |
| Tester | button | btnTestNewKey | `btn btn-ghost` | — | actif | — |
| Ajouter au Pool | submit | btnAddKey | `btn btn-success` | — | actif | — |
| Annuler |  | — | `btn btn-ghost` | — | actif | — |
| Confirmer |  | modalConfirm | `btn btn-danger` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Ecran masque tant que `/api/admin/verify` n'a pas repondu ; sinon redirection login.
- 5 onglets : Comptes, Sessions, Paiements, Journal, Fournisseurs & Cles IA.
- 6 cartes de statistiques, tableaux, etats vides, modale de confirmation, toast.

## 8. Tableaux, code et medias

- Tableaux : 4 (0 lignes / 7 en-tetes ; 0 lignes / 6 en-tetes ; 0 lignes / 7 en-tetes ; 0 lignes / 9 en-tetes)
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 25 · images : 0
- Icones du sprite utilisees : `#i-wrench`, `#i-book`, `#i-power`, `#i-users`, `#i-vm`, `#i-cards`, `#i-clipboard`, `#i-cpu`, `#i-plus`, `#i-hourglass`, `#i-refresh`, `#i-check`, `#i-key`, `#i-bolt`
- Volume de texte : ~4503 mots · 291 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`
- Scripts externes : aucun
- Blocs `<style>` inline : 2 · scripts inline : 2

## 10. Classes et attributs data observes

Classes distinctes : 37. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `icon-svg` | 25 |
| `btn` | 23 |
| `btn-ghost` | 19 |
| `form-group` | 14 |
| `btn-sm` | 14 |
| `card` | 8 |
| `card-header` | 8 |
| `card-body` | 8 |
| `stat-card` | 6 |
| `label` | 6 |
| `value` | 6 |
| `tab` | 5 |
| `empty-state` | 5 |
| `icon` | 5 |
| `active` | 4 |
| `table-wrapper` | 4 |
| `btn-success` | 3 |
| `filter-bar` | 3 |
| `v-accent` | 2 |
| `v-success` | 2 |

Attributs `data-*` : `data-logfilter` (5), `data-aifilter` (5), `data-filter` (4)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 13
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.

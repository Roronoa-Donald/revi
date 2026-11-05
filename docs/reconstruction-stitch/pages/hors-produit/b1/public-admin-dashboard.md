# ⚙️ Tableau de bord B1 — Bachelor 1

> Fiche extraite du fichier `b1/public/admin/dashboard.html` (772 lignes, 39.3 Ko, sha256 `f3e9e9eb4a2e`).
> Famille : **hors-produit** · sous-type : `b1` · statut : **bloque-serveur**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b1/... (403)` |
| Titre du document | Tableau de bord B1 - Administration |
| Description meta | — |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `dark` |
| Chapitre (body) | — |
| Regle d'acces | Hors produit / archive |
| Statut de service | bloque-serveur |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | h1 | — | ⚙️ Tableau de bord B1 — Bachelor 1 |
| 2 | h2 | — | 🔑 Créer des clés d'activation |
| 3 | h2 | — | 📋 Liste des clés |
| 4 | h2 | — | 🖥️ Sessions actives |
| 5 | h2 | — | 📊 Statistiques par cours |
| 6 | h2 | — | 📜 Journal d'activité |
| 7 | form | createForm | 1 formulaire(s) |
| 8 | table | — | 2 tableau(x) |
| 9 | .modal | dialogue | 3 element(s) |

## 3. Hierarchie des titres

- **H1** — ⚙️ Tableau de bord B1 — Bachelor 1
  - **H2** — 🔑 Créer des clés d'activation
      - **H4** — ✅ Clés générées (cliquez pour copier) :
  - **H2** — 📋 Liste des clés
  - **H2** — 🖥️ Sessions actives
  - **H2** — 📊 Statistiques par cours
  - **H2** — 📜 Journal d'activité
    - **H3** — Confirmation

## 4. Navigation et liens

Liens sortants : **1** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| 📚 Site | `/` | `.` | interne |

## 5. Formulaires et champs

### Formulaire 1 — `createForm`

- action : `(aucune)` · methode : `GET` · classe : `create-form`

| Champ | type | id / name | Label | Placeholder | Requis |
|---|---|---|---|---|---|
| select | — | `scopeType` | — | — | non |
| input | number | `keyCount` | — | — | non |
| select | — | `expiresIn` | — | — | non |
| input | text | `keyNote` | — | Ex: Pour Ahmed - formation Linux, Licence pro 2026, Client entreprise X... | non |

## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| 🚪 Déconnexion |  | — | `btn btn-ghost` | — | actif | — |
| 🔑 Clés |  | — | `tab active` | — | actif | — |
| 🖥️ Sessions |  | — | `tab` | — | actif | — |
| 📊 Stats par cours |  | — | `tab` | — | actif | — |
| 📜 Journal d'activité |  | — | `tab` | — | actif | — |
| ✨ Générer les clés | submit | btnCreate | `btn btn-success` | — | actif | — |
| Toutes |  | — | `btn btn-ghost btn-sm active` | — | actif | data-filter= |
| Disponibles |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=active |
| Utilisées |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=used |
| Révoquées |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=revoked |
| Expirées |  | — | `btn btn-ghost btn-sm` | — | actif | data-filter=expired |
| Tout |  | — | `btn btn-ghost btn-sm active` | — | actif | data-logfilter= |
| Activations |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=activation |
| Connexions admin |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=admin_login |
| Échecs login |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=admin_login_failed |
| Créations clés |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=key_created |
| Révocations |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=key_revoked |
| Sessions |  | — | `btn btn-ghost btn-sm` | — | actif | data-logfilter=session_created |
| Annuler |  | — | `btn btn-ghost` | — | actif | — |
| Confirmer |  | modalConfirm | `btn btn-danger` | — | actif | — |

## 7. Composants pedagogiques et etats observes


Etats et interactions a reconstruire :

- Page hors produit : aucun etat d'interface a reconstruire.

## 8. Tableaux, code et medias

- Tableaux : 2 (0 lignes / 8 en-tetes ; 0 lignes / 7 en-tetes)
- Blocs `pre` : 0 · elements `code` : 0
- SVG inline : 0 · images : 0
- Icones du sprite utilisees : aucune
- Volume de texte : ~3273 mots · 155 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap`
- Scripts externes : aucun
- Blocs `<style>` inline : 1 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 39. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `btn` | 17 |
| `btn-ghost` | 15 |
| `btn-sm` | 12 |
| `stat-card` | 6 |
| `label` | 6 |
| `value` | 6 |
| `form-group` | 6 |
| `card` | 5 |
| `card-header` | 5 |
| `card-body` | 5 |
| `tab` | 4 |
| `empty-state` | 4 |
| `icon` | 4 |
| `active` | 3 |
| `full` | 3 |
| `v-accent` | 2 |
| `v-error` | 2 |
| `table-wrapper` | 2 |
| `d-header` | 1 |
| `d-header-actions` | 1 |

Attributs `data-*` : `data-logfilter` (7), `data-filter` (5), `data-theme` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 4
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 38 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.

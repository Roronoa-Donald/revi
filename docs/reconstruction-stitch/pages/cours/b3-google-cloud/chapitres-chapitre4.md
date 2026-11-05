# Chapitre 4 — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge

> Fiche extraite du fichier `b3-google-cloud/chapitres/chapitre4.html` (518 lignes, 37.7 Ko, sha256 `cf0c087de113`).
> Famille : **cours-b3-google-cloud** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-google-cloud/chapitres/chapitre4.html` |
| Titre du document | Module 4 — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge \| Google Cloud Platform B3 |
| Description meta | Module 4 du cours Google Cloud Platform B3 : Virtual Private Cloud (VPC) mondial et mode sous-réseaux personnalisé (Custom Subnet Mode), plan d'adressage CIDR et les 4 adresses IP réservées par Google, passerelle Cloud NAT, règles de pare-feu VPC avec état (priorités et Network Tags), interconnexions (VPC Peering, Cloud VPN, Cloud Interconnect) et répartiteurs de charge mondiaux Anycast (Global External HTTP(S) Load Balancer, URL Maps, Cloud Armor et Cloud CDN). Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge |
| 3 | h2 | — | 1. Architecture du VPC Google Cloud : Réseau Global & Sous-Réseaux Régionaux |
| 4 | h2 | — | 2. Règles de Pare-Feu VPC (Firewall Rules) : Priorités & Tags Réseau |
| 5 | h2 | — | 3. Interconnexions Réseau : VPC Peering, Cloud VPN & Interconnect |
| 6 | h2 | — | 4. Cloud Load Balancing : Architecture Anycast Mondiale & URL Maps |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 5 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Réseau Virtuel VPC, Routage, Sécurité & Répartiteurs de Charge
  - **H2** — 1. Architecture du VPC Google Cloud : Réseau Global & Sous-Réseaux Régionaux
      - **H4** — Modes de Création d'un VPC
      - **H4** — Les 4 Adresses IP Réservées par Google
  - **H2** — 2. Règles de Pare-Feu VPC (Firewall Rules) : Priorités & Tags Réseau
      - **H4** — Composants d'une Règle de Pare-feu
      - **H4** — Règles Implicites par Défaut
  - **H2** — 3. Interconnexions Réseau : VPC Peering, Cloud VPN & Interconnect
      - **H4** — VPC Network Peering
      - **H4** — Cloud VPN (IPsec)
      - **H4** — Cloud Interconnect
  - **H2** — 4. Cloud Load Balancing : Architecture Anycast Mondiale & URL Maps
      - **H4** — Routage Mondial Anycast
      - **H4** — Chaîne de Composants du Load Balancer
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP
    - **H3** — Exercice 2 — Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules)
    - **H3** — Exercice 3 — Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-google-cloudnav` | Portail → `/`<br>Google Cloud Platform B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Google Cloud Platform B3 | `../index.html` | `b3-google-cloud/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-google-cloud/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-google-cloud/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-google-cloud/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-google-cloud/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-google-cloud/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-google-cloud/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-google-cloud/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-google-cloud/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-google-cloud/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-google-cloud/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-google-cloud/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-google-cloud/chapitres/formules.html` | interne |
| Module 5 — Stockage Distribué, Bases de Données & Pipeline Big Data | `chapitre5.html` | `b3-google-cloud/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 256 |  | — | `opt` | — | actif | — |
| 254 |  | — | `opt` | — | actif | — |
| 252 |  | — | `opt` | — | actif | data-correct=1 |
| 250 |  | — | `opt` | — | actif | — |
| La règle B (1000) car elle est plus permissive |  | — | `opt` | — | actif | — |
| La règle A (100) car les priorités les plus petites sont évaluées en premier |  | — | `opt` | — | actif | data-correct=1 |
| Les deux règles s'annulent |  | — | `opt` | — | actif | — |
| La règle la plus récente créée |  | — | `opt` | — | actif | — |
| Cloud Interconnect |  | — | `opt` | — | actif | — |
| Cloud NAT |  | — | `opt` | — | actif | data-correct=1 |
| Cloud CDN |  | — | `opt` | — | actif | — |
| Cloud Armor |  | — | `opt` | — | actif | — |
| La Global Forwarding Rule |  | — | `opt` | — | actif | — |
| Le Target HTTPS Proxy |  | — | `opt` | — | actif | — |
| L'URL Map |  | — | `opt` | — | actif | data-correct=1 |
| Le Cloud Router |  | — | `opt` | — | actif | — |
| Oui, le peering est toujours transitif |  | — | `opt` | — | actif | — |
| Non, le VPC Peering n'est pas transitif dans Google Cloud |  | — | `opt` | — | actif | data-correct=1 |
| Oui, uniquement si le protocole BGP est activé |  | — | `opt` | — | actif | — |
| Oui, si les deux VPC sont dans la même région |  | — | `opt` | — | actif | — |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `gcp3-c4-e1` | analyse | 300 | active | `SUBNET_CALC cidr=10.10.0.0/24` | Exercice 1 — Calculateur de Sous-réseaux VPC et Adresses IP Réservées GCP |
| `gcp3-c4-e2` | analyse | 300 | active | `RULE priority=1000 action=ALLOW proto=tcp port=443 RULE priority=1000 action=ALLOW proto=tcp port=80 RULE priority=2000 action=DENY proto=tcp port=all TEST_PACKET proto=tcp port=443 TEST_PACKET proto=tcp port=22` | Exercice 2 — Évaluateur et Linter de Règles de Pare-feu VPC (VPC Firewall Rules) |
| `gcp3-c4-e3` | analyse | 300 | active | `ROUTE_MAP host=api.cloud.corp path_prefix=/v1/users backend=user-service-backend protocol=HTTPS ROUTE_MAP host=api.cloud.corp path_prefix=/ backend=default-api-backend protocol=HTTPS DISPATCH_REQUEST host=api.cloud.corp path=/v1/users/list DISPATCH_REQUEST host=api.cloud.corp path=/health` | Exercice 3 — Simulateur de Répartiteur de Charge Global HTTP(S) et URL Maps |

- QCM : 1 bloc(s), **5 question(s)**.
- Encadres pedagogiques : 8 (`.box`, variantes `box--*`).
- Blocs replies : 3 (`<details>`).

Etats et interactions a reconstruire :

- En-tete compact : fil d'Ariane, titre, meta (module, duree, statut gratuit).
- Encadres pedagogiques : mise en situation, objectifs, intuition, piege, methode, technique, revision.
- Tableaux de donnees et blocs pseudo-code defilables horizontalement.
- Exercices de code (`div.lab[data-lab]`) : editeur, entree standard, console a 3 onglets, tuteur IA.
- Correction suspendue si `data-grading-suspended="1"` : bouton « Validation suspendue » desactive et avis visible.
- QCM : options desactivees apres reponse, bonne reponse `is-correct`, mauvaise `is-wrong`, explication `is-shown`.
- Score QCM : `Score : n/N (p %)` + palier de maitrise (4 bandes).
- Checklist de maitrise : case `data-mark-done`, etat persiste en localStorage par chapitre.
- Navigation de bas de page : chapitre precedent / suivant.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 35
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3300 mots · 480 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `opt` | 20 |
| `card` | 9 |
| `box` | 8 |
| `box__title` | 8 |
| `q` | 5 |
| `q__stem` | 5 |
| `opts` | 5 |
| `q__exp` | 5 |
| `grid` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid-2` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |

Attributs `data-*` : `data-correct` (5), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

## 11. Controle qualite automatique

- Titres `h1` : 1
- Boutons sans texte ni aria-label : 0
- Champs identifies sans label associe : 0
- Images sans attribut alt : 0
- Liens sans texte ni aria-label : 0
- Emoji detectes : 0 (la charte du produit les proscrit)

## 12. Renvois

- Layouts et gabarits : [04_LAYOUTS_ET_STRUCTURES.md](../../../04_LAYOUTS_ET_STRUCTURES.md)
- Composants et etats : [05_COMPOSANTS_REUTILISABLES.md](../../../05_COMPOSANTS_REUTILISABLES.md) · [10_ETATS_INTERFACE.md](../../../10_ETATS_INTERFACE.md)
- Regles d'acces : [11_ETATS_CONDITIONNELS.md](../../../11_ETATS_CONDITIONNELS.md) · [17_REGLES_METIER.md](../../../17_REGLES_METIER.md)
- Captures a produire : [22_REGISTRE_CAPTURES.md](../../../22_REGISTRE_CAPTURES.md)

*Fiche generee le 2026-11-05 par `tools/extract.mjs` ; donnees brutes dans `evidence/pages.json`.

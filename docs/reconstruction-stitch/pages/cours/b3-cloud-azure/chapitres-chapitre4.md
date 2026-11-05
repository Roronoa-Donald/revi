# Chapitre 4 — Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité)

> Fiche extraite du fichier `b3-cloud-azure/chapitres/chapitre4.html` (540 lignes, 41.7 Ko, sha256 `71237e7688a1`).
> Famille : **cours-b3-cloud-azure** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-azure/chapitres/chapitre4.html` |
| Titre du document | Module 4 — Réseau Virtuel Azure (Azure Virtual Network - VNet &amp; Sécurité) \| Cloud Azure B3 |
| Description meta | Module 4 du cours Cloud Microsoft Azure B3 : Architecture réseau logiciel (SDN) sous Azure : Virtual Networks (VNet), découpage CIDR en sous-réseaux (Subnets), les 5 adresses IP réservées par Azure dans chaque subnet, groupes de sécurité réseau (NSG), priorité de filtrage des flux et règles par défaut, accès distant sécurisé sans IP publique avec Azure Bastion, interconnexion privée par VNet Peering, topologie d’entreprise Hub-and-Spoke et passerelles VPN / ExpressRoute. Notions clés, architectures Azure, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité) |
| 3 | h2 | — | 1. Fondations SDN : Réseaux Virtuels Azure VNet et Adressage Réservé |
| 4 | h2 | — | 2. Sécurité Périmétrique : Network Security Groups (NSG) & Azure Bastion |
| 5 | h2 | — | 3. Interconnexion Réseau d'Entreprise : VNet Peering & Topologie Hub-and-Spoke |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |
| 14 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Réseau Virtuel Azure (Azure Virtual Network - VNet & Sécurité)
  - **H2** — 1. Fondations SDN : Réseaux Virtuels Azure VNet et Adressage Réservé
      - **H4** — Structure d'un VNet & Sous-réseaux
      - **H4** — Les 5 Adresses IP Réservées par Azure
  - **H2** — 2. Sécurité Périmétrique : Network Security Groups (NSG) & Azure Bastion
  - **H2** — 3. Interconnexion Réseau d'Entreprise : VNet Peering & Topologie Hub-and-Spoke
      - **H4** — Principes du VNet Peering
      - **H4** — Architecture Hub-and-Spoke
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur d'adressage Azure VNet & Adresses IP réservées
    - **H3** — Exercice 2 — Moteur d'évaluation de règles de sécurité NSG
    - **H3** — Exercice 3 — Validateur de Peering VNet & Topologie Hub-and-Spoke
  - **H2** — 5. QCM — niveau examen
  - **H2** — 6. Erreurs classiques — récapitulatif
  - **H2** — 7. Méthodologie de résolution
  - **H2** — 8. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 8 notions à connaître absolument
  - **H2** — 9. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-cloud-azurenav` | Portail → `/`<br>Cloud Azure B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **22** (externes : 1).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Cloud Azure B3 | `../index.html` | `b3-cloud-azure/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cloud-azure/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cloud-azure/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cloud-azure/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cloud-azure/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cloud-azure/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cloud-azure/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cloud-azure/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cloud-azure/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cloud-azure/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cloud-azure/chapitres/examens.html` | interne |
| FAQ réseau Microsoft | `https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq` | `https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq` | externe |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-azure/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-azure/chapitres/formules.html` | interne |
| Module 5 — Stockage Azure (Blob, Files, Disques) et Données Managées | `chapitre5.html` | `b3-cloud-azure/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 256 |  | — | `opt` | — | actif | — |
| 254 |  | — | `opt` | — | actif | — |
| 251 |  | — | `opt` | — | actif | data-correct=1 |
| 250 |  | — | `opt` | — | actif | — |
| Deux résolveurs DNS primaire et secondaire du sous-réseau |  | — | `opt` | — | actif | — |
| La correspondance des adresses Azure DNS dans l'espace du VNet |  | — | `opt` | — | actif | data-correct=1 |
| La passerelle par défaut et l'adresse de diffusion |  | — | `opt` | — | actif | — |
| Les deux premières machines virtuelles créées |  | — | `opt` | — | actif | — |
| La règle Deny l'emporte toujours sur la règle Allow |  | — | `opt` | — | actif | — |
| La règle ayant le numéro de priorité le plus faible est évaluée en premier et s'applique i |  | — | `opt` | — | actif | data-correct=1 |
| La règle la plus récemment modifiée s'applique |  | — | `opt` | — | actif | — |
| Les deux règles fusionnent |  | — | `opt` | — | actif | — |
| 100 |  | — | `opt` | — | actif | — |
| 1000 |  | — | `opt` | — | actif | — |
| 65000 |  | — | `opt` | — | actif | — |
| 65500 |  | — | `opt` | — | actif | data-correct=1 |
| Il augmente la mémoire RAM des serveurs de 50% |  | — | `opt` | — | actif | — |
| Il permet la connexion RDP et SSH depuis un navigateur web via HTTPS sans attribuer d'adre |  | — | `opt` | — | actif | data-correct=1 |
| Il supprime le besoin de mots de passe administrateur |  | — | `opt` | — | actif | — |
| Il remplace le système d'exploitation par Linux |  | — | `opt` | — | actif | — |
| Les deux VNets doivent être situés dans le même pays |  | — | `opt` | — | actif | — |
| Les espaces d'adressage IP (CIDR) des deux VNets ne doivent comporter aucun chevauchement |  | — | `opt` | — | actif | data-correct=1 |
| Les deux VNets doivent être gérés par le même abonnement |  | — | `opt` | — | actif | — |
| Les machines doivent utiliser le même système d'exploitation |  | — | `opt` | — | actif | — |
| Allow Gateway Transit |  | — | `opt` | — | actif | — |
| Use Remote Gateways |  | — | `opt` | — | actif | data-correct=1 |
| Enable Direct Route |  | — | `opt` | — | actif | — |
| Bypass Gateway |  | — | `opt` | — | actif | — |
| Uniquement entre deux datacenters de la même ville |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `az3-c4-e1` | analyse | 300 | active | `SUBNET name=snet-web cidr=10.0.1.0/24` | Exercice 1 — Calculateur d'adressage Azure VNet & Adresses IP réservées |
| `az3-c4-e2` | analyse | 300 | active | `RULE prio=100 name=Allow-HTTP direction=INBOUND source=Internet port=80 proto=TCP action=ALLOW RULE prio=200 name=Deny-SSH direction=INBOUND source=* port=22 proto=TCP action=DENY TEST_PACKET source=Internet port=80 proto=TCP TEST_PACKET source=Internet port=22 proto=TCP` | Exercice 2 — Moteur d'évaluation de règles de sécurité NSG |
| `az3-c4-e3` | analyse | 300 | active | `VNET id=vnet-hub cidr=10.0.0.0/16 VNET id=vnet-spoke1 cidr=10.1.0.0/16 PEERING vnet1=vnet-hub vnet2=vnet-spoke1 allow_gw_transit=true use_remote_gw=false` | Exercice 3 — Validateur de Peering VNet & Topologie Hub-and-Spoke |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 7 (`.box`, variantes `box--*`).
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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 3 · elements `code` : 66
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3679 mots · 532 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 68. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 7 |
| `box__title` | 7 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__formative` | 3 |
| `badge` | 3 |
| `lab__body` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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

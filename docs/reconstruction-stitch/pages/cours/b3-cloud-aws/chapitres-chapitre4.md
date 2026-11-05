# Chapitre 4 — Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL)

> Fiche extraite du fichier `b3-cloud-aws/chapitres/chapitre4.html` (529 lignes, 38.0 Ko, sha256 `4567536d44c4`).
> Famille : **cours-b3-cloud-aws** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-cloud-aws/chapitres/chapitre4.html` |
| Titre du document | Module 4 — Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL) \| Services Cloud AWS B3 |
| Description meta | Module 4 du cours Services Cloud AWS B3 : Amazon VPC, sous-réseaux multi-AZ, adresses réservées, tables de routage, Internet & NAT Gateways, Security Groups et Network ACLs. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL) |
| 3 | h2 | — | 1. Amazon VPC : Blocs CIDR & Sous-réseaux Multi-AZ |
| 4 | h2 | — | 2. Routage VPC : Internet Gateway, NAT Gateway & Tables de Routage |
| 5 | h2 | — | 3. Sécurité Réseau : Security Groups (Stateful) vs Network ACLs (Stateless) |
| 6 | h2 | — | 4. Interconnexion & Passerelles Privées : Peering, Transit Gateway & Endpoints |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Réseau Avancé — Amazon VPC, Sous-réseaux, Routage & Pare-feux (SG / NACL)
  - **H2** — 1. Amazon VPC : Blocs CIDR & Sous-réseaux Multi-AZ
      - **H4** — Plages d'Adresses CIDR (RFC 1918)
      - **H4** — Adresses IPv4 Réservées par Sous-Réseau hors BYOIP
  - **H2** — 2. Routage VPC : Internet Gateway, NAT Gateway & Tables de Routage
      - **H4** — Tables de Routage (Route Tables)
      - **H4** — Internet Gateway (IGW)
      - **H4** — NAT Gateway Managée
  - **H2** — 3. Sécurité Réseau : Security Groups (Stateful) vs Network ACLs (Stateless)
      - **H4** — Security Groups (SG) — Première Ligne (Instance)
      - **H4** — Network ACLs (NACL) — Seconde Ligne (Sous-Réseau)
  - **H2** — 4. Interconnexion & Passerelles Privées : Peering, Transit Gateway & Endpoints
      - **H4** — VPC Peering
      - **H4** — AWS Transit Gateway
      - **H4** — VPC Endpoints (PrivateLink)
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS
    - **H3** — Exercice 2 — Auditeur de Tables de Routage VPC (Public vs Privé vs Isolé)
    - **H3** — Exercice 3 — Simulateur de Pare-feu : Security Group (Stateful) vs Network ACL (Stateless)
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
| nav | `b3-cloud-awsnav` | Portail → `/`<br>Services Cloud AWS B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Services Cloud AWS B3 | `../index.html` | `b3-cloud-aws/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-cloud-aws/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-cloud-aws/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-cloud-aws/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-cloud-aws/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-cloud-aws/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-cloud-aws/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-cloud-aws/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-cloud-aws/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-cloud-aws/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-cloud-aws/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-cloud-aws/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-cloud-aws/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-cloud-aws/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-cloud-aws/chapitres/formules.html` | interne |
| Module 5 — Stockage & Données — Amazon S3, EFS, RDS & NoSQL DynamoDB | `chapitre5.html` | `b3-cloud-aws/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| 256 adresses |  | — | `opt` | — | actif | — |
| 254 adresses |  | — | `opt` | — | actif | — |
| 251 adresses |  | — | `opt` | — | actif | data-correct=1 |
| 250 adresses |  | — | `opt` | — | actif | — |
| Dans un sous-réseau public possédant une route vers une Internet Gateway |  | — | `opt` | — | actif | data-correct=1 |
| Dans un sous-réseau privé isolé |  | — | `opt` | — | actif | — |
| Sur un serveur physique sur site |  | — | `opt` | — | actif | — |
| Dans une Edge Location CloudFront |  | — | `opt` | — | actif | — |
| Car le port 80 est gratuit |  | — | `opt` | — | actif | — |
| Car les Security Groups sont avec état (Stateful) : le trafic retour d'une connexion accep |  | — | `opt` | — | actif | data-correct=1 |
| Car AWS désactive les pare-feux en sortie |  | — | `opt` | — | actif | — |
| Car l'Internet Gateway gère le filtrage sortant |  | — | `opt` | — | actif | — |
| Toutes les règles sont évaluées ensemble de façon aléatoire |  | — | `opt` | — | actif | — |
| Par ordre croissant de numéro de règle (1, 100, 200...) : la première règle correspondante |  | — | `opt` | — | actif | data-correct=1 |
| Les règles Deny sont toujours prioritaires quel que soit leur numéro |  | — | `opt` | — | actif | — |
| Par ordre alphabétique de protocole |  | — | `opt` | — | actif | — |
| Car le VPC Peering n'est pas compatible avec IPv4 |  | — | `opt` | — | actif | — |
| Car le routage par VPC Peering est strictement non-transitif : il n'y a pas de routage par |  | — | `opt` | — | actif | data-correct=1 |
| Car B bloque le trafic par défaut |  | — | `opt` | — | actif | — |
| Car il faut redémarrer les VPCs |  | — | `opt` | — | actif | — |
| 10.0.5.1 |  | — | `opt` | — | actif | — |
| 10.0.5.2 |  | — | `opt` | — | actif | data-correct=1 |
| 10.0.5.254 |  | — | `opt` | — | actif | — |
| 169.254.169.254 |  | — | `opt` | — | actif | — |
| AWS Direct Connect |  | — | `opt` | — | actif | data-correct=1 |
| VPC Peering |  | — | `opt` | — | actif | — |
| AWS Storage Gateway |  | — | `opt` | — | actif | — |
| Internet Gateway |  | — | `opt` | — | actif | — |
| /32 (1 adresse) |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `aws3-c4-e1` | analyse | 300 | active | `VPC_SUBNET CIDR=10.0.1.0/24` | Exercice 1 — Calculateur de Sous-réseaux CIDR & Adresses Réservées AWS |
| `aws3-c4-e2` | analyse | 300 | active | `ROUTE_AUDIT SUBNET=subnet-0a1b2c3d ROUTES=10.0.0.0/16->local;0.0.0.0/0->igw-11223344` | Exercice 2 — Auditeur de Tables de Routage VPC (Public vs Privé vs Isolé) |
| `aws3-c4-e3` | analyse | 300 | active | `FLOW_CHECK DIRECTION=INBOUND PORT=443 SG_IN=80,443 NACL_RULES=100:Allow:443;200:Deny:All;*:Deny:All` | Exercice 3 — Simulateur de Pare-feu : Security Group (Stateful) vs Network ACL (Stateless) |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 6 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 3 · elements `code` : 32
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-cloud`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3415 mots · 482 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 67. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 18 |
| `card` | 10 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `grid` | 4 |
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

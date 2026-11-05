# Chapitre 4 — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions

> Fiche extraite du fichier `b3-firewall/chapitres/chapitre4.html` (516 lignes, 37.2 Ko, sha256 `373e2c2c75c9`).
> Famille : **cours-b3-firewall** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-firewall/chapitres/chapitre4.html` |
| Titre du document | Chapitre 4 — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) &amp; Bastions \| Firewall & Sécurité Réseau B3 |
| Description meta | Chapitre 4 du cours Firewall & Sécurité Réseau B3 : Zone Démilitarisée (DMZ), règle cardinale inter-zones, topologies pare-feu (Dual-Homed, Triple-Homed, Back-to-Back en cascade), hôtes de rebond et bastions SSH d’administration. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 4 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 4 — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions |
| 3 | h2 | — | 1. Le Concept de Zone Démilitarisée (DMZ) & la Règle Cardinal de Sécurité |
| 4 | h2 | — | 2. Topologies Pare-feux : Dual-Homed, Triple-Homed & Back-to-Back |
| 5 | h2 | — | 3. Passerelles d’Administration Sécurisées : Bastions SSH & Jump Hosts |
| 6 | h2 | — | 4. Études de cas & applications pratiques |
| 7 | h2 | — | 5. QCM — niveau examen |
| 8 | h2 | — | 6. Erreurs classiques — récapitulatif |
| 9 | h2 | — | 7. Méthodologie de résolution |
| 10 | h2 | — | 8. Révision active |
| 11 | h2 | — | 9. Test de maîtrise |
| 12 | .lab | code lab | 3 bloc(s) |
| 13 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 4 — Architectures Réseau Sécurisées, Zone Démilitarisée (DMZ) & Bastions
  - **H2** — 1. Le Concept de Zone Démilitarisée (DMZ) & la Règle Cardinal de Sécurité
      - **H4** — Objectif Stratégique
      - **H4** — La Règle d’Or Absolue
  - **H2** — 2. Topologies Pare-feux : Dual-Homed, Triple-Homed & Back-to-Back
      - **H4** — 1. Dual-Homed (2 interfaces)
      - **H4** — 2. Triple-Homed (3 interfaces)
      - **H4** — 3. Back-to-Back (Cascade)
  - **H2** — 3. Passerelles d’Administration Sécurisées : Bastions SSH & Jump Hosts
      - **H4** — Architecture Bastion SSH (Jump Host)
      - **H4** — Rebond Contrôlé vers la Production
  - **H2** — 4. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Contrôleur de conformité des flux de sécurité DMZ
    - **H3** — Exercice 2 — Évaluateur d’architectures et topologies pare-feu
    - **H3** — Exercice 3 — Passerelle d’administration sécurisée et Bastion SSH / Jump Host
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
| nav | `b3-firewallnav` | Portail → `/`<br>Firewall & Sécurité Réseau B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Firewall & Sécurité Réseau B3 | `../index.html` | `b3-firewall/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-firewall/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-firewall/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-firewall/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-firewall/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-firewall/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-firewall/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-firewall/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-firewall/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-firewall/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-firewall/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-firewall/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-firewall/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-firewall/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-firewall/chapitres/formules.html` | interne |
| Chapitre 5 — Filtrage Applicatif L7, UTM & Pare-feux Nouvelle Génération (NGFW) | `chapitre5.html` | `b3-firewall/chapitres/chapitre5.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Aucune connexion ne doit jamais être initiée depuis la DMZ vers le LAN |  | — | `opt` | — | actif | data-correct=1 |
| Le LAN ne doit jamais pouvoir accéder à la DMZ |  | — | `opt` | — | actif | — |
| Tous les flux entre DMZ et LAN doivent être configurés en protocole UDP |  | — | `opt` | — | actif | — |
| Les serveurs DMZ doivent partager les mêmes adresses IP que les postes LAN |  | — | `opt` | — | actif | — |
| Le pare-feu constitue un point unique de défaillance matériel et logiciel (SPOF) |  | — | `opt` | — | actif | data-correct=1 |
| Elle ne permet pas de naviguer sur Internet en HTTPS |  | — | `opt` | — | actif | — |
| Elle exige obligatoirement trois adresses IP publiques différentes |  | — | `opt` | — | actif | — |
| Elle est incompatible avec le protocole TCP |  | — | `opt` | — | actif | — |
| Pour qu’une vulnérabilité zero-day touchant le pare-feu frontal n’impacte pas le pare-feu |  | — | `opt` | — | actif | data-correct=1 |
| Pour diviser par deux le coût des licences logicielles |  | — | `opt` | — | actif | — |
| Pour doubler automatiquement la vitesse de transmission des câbles |  | — | `opt` | — | actif | — |
| Pour éviter d’avoir à configurer des adresses IP privées |  | — | `opt` | — | actif | — |
| Un Bastion SSH (Jump Host) avec authentification forte et traçabilité des sessions |  | — | `opt` | — | actif | data-correct=1 |
| Un commutateur non administrable de niveau 2 |  | — | `opt` | — | actif | — |
| Un point d’accès Wi-Fi ouvert |  | — | `opt` | — | actif | — |
| Un répéteur Ethernet passif |  | — | `opt` | — | actif | — |
| Dans une zone interne protégée (LAN ou zone BDD dédiée), jamais directement en DMZ publiqu |  | — | `opt` | — | actif | data-correct=1 |
| Directement sur le routeur frontière Internet |  | — | `opt` | — | actif | — |
| En DMZ publique avec le port 3306 exposé à tous les internautes |  | — | `opt` | — | actif | — |
| Sur une clé USB branchée sur la passerelle |  | — | `opt` | — | actif | — |
| TCP sur le port 443 (HTTPS) |  | — | `opt` | — | actif | data-correct=1 |
| TCP sur le port 23 (Telnet) |  | — | `opt` | — | actif | — |
| TCP sur le port 3389 (RDP direct) |  | — | `opt` | — | actif | — |
| UDP sur le port 69 (TFTP) |  | — | `opt` | — | actif | — |
| Le serveur web dépose les données sur une file de messages intermédiaire ou c’est un servi |  | — | `opt` | — | actif | data-correct=1 |
| On désactive temporairement le pare-feu chaque nuit |  | — | `opt` | — | actif | — |
| On ouvre tous les ports entre la DMZ et le LAN sans aucune restriction |  | — | `opt` | — | actif | — |
| On installe un serveur DHCP sur le poste de l’administrateur |  | — | `opt` | — | actif | — |
| Directement sur le réseau local interne LAN (créant un risque majeur) ou externalisés chez |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `fw3-c4-e1` | analyse | 300 | active | `FLOW id=F1 src_zone=WAN dst_zone=DMZ dport=443 FLOW id=F2 src_zone=DMZ dst_zone=LAN dport=3306` | Exercice 1 — Contrôleur de conformité des flux de sécurité DMZ |
| `fw3-c4-e2` | analyse | 300 | active | `TOPOLOGY nom=Siege_Banque firewalls=2 zones=LAN,DMZ,WAN constructeurs=2` | Exercice 2 — Évaluateur d’architectures et topologies pare-feu |
| `fw3-c4-e3` | analyse | 300 | active | `ACCESS_REQ id=R1 user=alice target_zone=PROD port=22 via_bastion=NON mfa_valid=OUI ACCESS_REQ id=R2 user=alice target_zone=PROD port=22 via_bastion=OUI mfa_valid=OUI` | Exercice 3 — Passerelle d’administration sécurisée et Bastion SSH / Jump Host |

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

- Tableaux : 0
- Blocs `pre` : 3 · elements `code` : 63
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-info`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3235 mots · 481 noeuds HTML

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
| `card` | 7 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
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

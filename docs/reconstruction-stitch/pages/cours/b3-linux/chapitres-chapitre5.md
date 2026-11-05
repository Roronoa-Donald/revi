# Chapitre 5 — Réseau Avancé Linux : Namespaces, Bridges & Policy Routing

> Fiche extraite du fichier `b3-linux/chapitres/chapitre5.html` (490 lignes, 34.8 Ko, sha256 `64110f6eec0d`).
> Famille : **cours-b3-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-linux/chapitres/chapitre5.html` |
| Titre du document | Chapitre 5 — Réseau Avancé Linux : Namespaces, Bridges &amp; Policy Routing \| Linux Avancé B3 |
| Description meta | Chapitre 5 du cours Linux Avancé B3 : Interfaces virtuelles (veth pairs, Linux bridge, tap/tun), iproute2, routage par règles et politiques multiples (PBR, ip rule), et séquence de résolution NSSwitch. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 5 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 5 — Réseau Avancé Linux : Namespaces, Bridges & Policy Routing |
| 3 | h2 | — | 1. Interfaces Virtuelles & Interconnexion de Namespaces (veth & bridge) |
| 4 | h2 | — | 2. La Suite iproute2 : L’Outillage Moderne du Réseau Linux |
| 5 | h2 | — | 3. Routage par Politiques (PBR) & Tables de Routage Multiples |
| 6 | h2 | — | 4. Architecture de Résolution de Noms : NSSwitch (/etc/nsswitch.conf) |
| 7 | h2 | — | 5. Exercices de code |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 5 — Réseau Avancé Linux : Namespaces, Bridges & Policy Routing
  - **H2** — 1. Interfaces Virtuelles & Interconnexion de Namespaces (veth & bridge)
      - **H4** — 1. Les Paires veth (Virtual Ethernet)
      - **H4** — 2. Le Pont Logiciel Linux (Bridge)
  - **H2** — 2. La Suite iproute2 : L’Outillage Moderne du Réseau Linux
  - **H2** — 3. Routage par Politiques (PBR) & Tables de Routage Multiples
  - **H2** — 4. Architecture de Résolution de Noms : NSSwitch (/etc/nsswitch.conf)
      - **H4** — Ordre Standard de Résolution
      - **H4** — Critères de Continuité d’Évaluation
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge)
    - **H3** — Exercice 2 — Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables)
    - **H3** — Exercice 3 — Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf)
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
| nav | `b3-linuxnav` | Portail → `/`<br>Linux Avancé B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Linux Avancé B3 | `../index.html` | `b3-linux/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-linux/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-linux/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-linux/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-linux/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Chapitre 6 — Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd) | `chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Une interface loopback lo |  | — | `opt` | — | actif | — |
| Une paire d’interfaces virtuelles veth (veth pair) |  | — | `opt` | — | actif | data-correct=1 |
| Un disque LVM |  | — | `opt` | — | actif | — |
| Un socket Unix |  | — | `opt` | — | actif | — |
| ip netmask set 192.168.1.10/24 dev eth0 |  | — | `opt` | — | actif | — |
| ip addr add 192.168.1.10/24 dev eth0 |  | — | `opt` | — | actif | data-correct=1 |
| ip link ip 192.168.1.10/24 dev eth0 |  | — | `opt` | — | actif | — |
| route add 192.168.1.10/24 dev eth0 |  | — | `opt` | — | actif | — |
| Le routage classique utilise le Wi-Fi et PBR utilise la fibre |  | — | `opt` | — | actif | — |
| Le routage classique ne regarde que l’IP destination, alors que le PBR peut aiguiller les |  | — | `opt` | — | actif | data-correct=1 |
| Le PBR ne fonctionne que sur les conteneurs Docker |  | — | `opt` | — | actif | — |
| Le routage classique nécessite obligatoirement BGP |  | — | `opt` | — | actif | — |
| ip rule show |  | — | `opt` | — | actif | data-correct=1 |
| iptables -L |  | — | `opt` | — | actif | — |
| route print |  | — | `opt` | — | actif | — |
| cat /proc/net/routes |  | — | `opt` | — | actif | — |
| /etc/resolv.conf |  | — | `opt` | — | actif | — |
| /etc/hosts |  | — | `opt` | — | actif | — |
| /etc/nsswitch.conf |  | — | `opt` | — | actif | data-correct=1 |
| /etc/network/interfaces |  | — | `opt` | — | actif | — |
| Couche 1 (Physique) |  | — | `opt` | — | actif | — |
| Couche 2 (Liaison de données / Ethernet) |  | — | `opt` | — | actif | data-correct=1 |
| Couche 3 (Réseau / IP) |  | — | `opt` | — | actif | — |
| Couche 7 (Application) |  | — | `opt` | — | actif | — |
| Pour vider la mémoire tampon du disque dur |  | — | `opt` | — | actif | — |
| Pour purger le cache de routage du noyau et forcer la réévaluation immédiate des nouvelles |  | — | `opt` | — | actif | data-correct=1 |
| Pour redémarrer le démon DNS |  | — | `opt` | — | actif | — |
| Pour supprimer les adresses IP statiques |  | — | `opt` | — | actif | — |
| ip link set veth1 netns 4200 |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx3-c5-e1` | shell | 300 | suspendue | `NET_IFACE name=br0 type=bridge master=NONE ip=10.0.0.1/24 state=UP` | Exercice 1 — Validateur de topologie réseau virtuelle (veth pairs & Linux Bridge) |
| `lx3-c5-e2` | shell | 300 | suspendue | `RULE prio=100 src=192.168.1.50 dport=ANY table=vpn_tunnel RULE prio=32766 src=ANY dport=ANY table=main PACKET id=1 src=192.168.1.50 dport=443` | Exercice 2 — Moteur d’évaluation de Policy-Based Routing (ip rule & multi-tables) |
| `lx3-c5-e3` | shell | 300 | suspendue | `CONF_NSSWITCH order=files,dns QUERY_HOST name=localhost in_files=OUI in_dns=NON in_mdns=NON` | Exercice 3 — Parseur et simulateur de résolution NSSwitch (/etc/nsswitch.conf) |

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
- Blocs `pre` : 8 · elements `code` : 64
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-info`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2877 mots · 503 noeuds HTML

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
| `lab__note` | 6 |
| `lab__sample-part` | 6 |
| `card` | 4 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `lab` | 3 |
| `lab__head` | 3 |
| `lab__title` | 3 |
| `lab__meta` | 3 |
| `lab__lang` | 3 |
| `lab__training` | 3 |

Attributs `data-*` : `data-correct` (8), `data-lab` (3), `data-exercise` (3), `data-grading-suspended` (3), `data-language` (3), `data-height` (3), `data-stdin` (3), `data-lab-starter` (3), `data-chapter` (1), `data-mark-done` (1)

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

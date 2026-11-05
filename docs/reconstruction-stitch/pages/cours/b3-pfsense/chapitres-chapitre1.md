# Chapitre 1 — Architecture pfSense, Moteur BSD Packet Filter & Déploiement Réseau

> Fiche extraite du fichier `b3-pfsense/chapitres/chapitre1.html` (548 lignes, 41.9 Ko, sha256 `9a941c0caa92`).
> Famille : **cours-b3-pfsense** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-pfsense/chapitres/chapitre1.html` |
| Titre du document | Chapitre 1 — Architecture pfSense, Moteur BSD Packet Filter &amp; Déploiement Réseau \| pfSense & Routage B3 |
| Description meta | Chapitre 1 du cours pfSense & Routage B3 : Noyau FreeBSD, moteur Packet Filter pf, interfaces physiques WAN/LAN/Opt, adressage CIDR, passerelles, services DHCP et DNS Resolver Unbound. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 1 |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 1 — Architecture pfSense, Moteur BSD Packet Filter & Déploiement Réseau |
| 3 | h2 | — | 1. Architecture Système : Du Noyau FreeBSD au Moteur Packet Filter (pf) |
| 4 | h2 | — | 2. Assignation des Interfaces Réseau & Modèle de Routage |
| 5 | h2 | — | 3. Services d’Infrastructure Indispensables : DHCP & DNS Resolver Unbound |
| 6 | h2 | — | 4. Calcul de Plans d’Adressage CIDR (IPv4 / IPv6) & Syntaxe Native pf.conf |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |

## 3. Hierarchie des titres

- **H1** — Chapitre 1 — Architecture pfSense, Moteur BSD Packet Filter & Déploiement Réseau
  - **H2** — 1. Architecture Système : Du Noyau FreeBSD au Moteur Packet Filter (pf)
      - **H4** — 1. La Couche Noyau (FreeBSD Kernel)
      - **H4** — 2. La Couche d’Orchestration pfSense
  - **H2** — 2. Assignation des Interfaces Réseau & Modèle de Routage
      - **H4** — WAN (Wide Area Network)
      - **H4** — LAN (Local Area Network)
      - **H4** — OPT (Optional Interfaces)
  - **H2** — 3. Services d’Infrastructure Indispensables : DHCP & DNS Resolver Unbound
      - **H4** — 1. Le Serveur DHCP (ISC DHCPD / Kea)
      - **H4** — 2. Le DNS Resolver (Unbound)
  - **H2** — 4. Calcul de Plans d’Adressage CIDR (IPv4 / IPv6) & Syntaxe Native pf.conf
      - **H4** — 1. Calcul CIDR IPv4, RFC 3021 (/31) et IPv6 (/64)
      - **H4** — 2. Grammaire d’une directive native pf.conf
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR
    - **H3** — Exercice 2 — Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf)
    - **H3** — Exercice 3 — Auditeur de plage DHCP pfSense et détection de conflit de baux statiques
  - **H2** — 6. QCM — niveau examen
  - **H2** — 7. Erreurs classiques — récapitulatif
  - **H2** — 8. Méthodologie de résolution
  - **H2** — 9. Révision active
    - **H3** — Checklist de maîtrise
    - **H3** — Les 9 notions à connaître absolument
  - **H2** — 10. Test de maîtrise

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-pfsensenav` | Portail → `/`<br>pfSense & Routage B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examens.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| pfSense & Routage B3 | `../index.html` | `b3-pfsense/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-pfsense/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-pfsense/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-pfsense/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-pfsense/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-pfsense/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-pfsense/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-pfsense/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-pfsense/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-pfsense/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-pfsense/atelier.html` | interne |
| Examen | `../chapitres/examens.html` | `b3-pfsense/chapitres/examens.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-pfsense/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-pfsense/chapitres/formules.html` | interne |
| Chapitre 2 — Règles de Pare-Feu, Aliases, États de Connexion (Stateful) & Limiteurs | `chapitre2.html` | `b3-pfsense/chapitres/chapitre2.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Netfilter / iptables (noyau Linux) |  | — | `opt` | — | actif | — |
| Packet Filter (pf, intégré au noyau FreeBSD) |  | — | `opt` | — | actif | data-correct=1 |
| Unbound DNS Resolver |  | — | `opt` | — | actif | — |
| ISC DHCPD / Kea |  | — | `opt` | — | actif | — |
| /etc/pf.conf |  | — | `opt` | — | actif | — |
| /var/log/filter.log |  | — | `opt` | — | actif | — |
| /cf/conf/config.xml |  | — | `opt` | — | actif | data-correct=1 |
| /tmp/rules.debug |  | — | `opt` | — | actif | — |
| pfctl -e |  | — | `opt` | — | actif | data-correct=1 |
| pfctl -d |  | — | `opt` | — | actif | — |
| service firewall start |  | — | `opt` | — | actif | — |
| systemctl enable iptables |  | — | `opt` | — | actif | — |
| Tout le trafic entrant sur l’interface OPT1 (émis par les machines du réseau OPT1) est aut |  | — | `opt` | — | actif | — |
| Aucune règle n’est créée par défaut : tout trafic arrivant sur l’interface OPT1 (émis par |  | — | `opt` | — | actif | data-correct=1 |
| Le trafic entre OPT1 et LAN est autorisé, mais l’accès vers le WAN est bloqué |  | — | `opt` | — | actif | — |
| L’interface OPT1 hérite automatiquement des règles de filtrage de l’interface LAN |  | — | `opt` | — | actif | — |
| Elle empêche les postes du LAN de communiquer entre eux |  | — | `opt` | — | actif | — |
| Elle bloque tout paquet entrant sur le WAN ayant une adresse source privée RFC 1918 |  | — | `opt` | — | actif | data-correct=1 |
| Elle chiffre le trafic interne avec IPsec |  | — | `opt` | — | actif | — |
| Elle interdit l’accès à l’interface d’administration Web |  | — | `opt` | — | actif | — |
| Obligatoirement dans la plage du pool dynamique |  | — | `opt` | — | actif | — |
| En dehors de la plage d’adresses du pool dynamique, mais dans le même sous-réseau CIDR que |  | — | `opt` | — | actif | data-correct=1 |
| Dans un sous-réseau différent de l’interface |  | — | `opt` | — | actif | — |
| Sur l’adresse IP de broadcast du réseau |  | — | `opt` | — | actif | — |
| Transférer les fichiers d’amorçage réseau par TFTP |  | — | `opt` | — | actif | — |
| Résolveur DNS récursif local avec validation cryptographique DNSSEC (vérification des sign |  | — | `opt` | — | actif | data-correct=1 |
| Attribuer dynamiquement les adresses IP aux postes du LAN |  | — | `opt` | — | actif | — |
| Synchroniser l’horloge système par NTP |  | — | `opt` | — | actif | — |
| DHCP (Dynamic Host Configuration Protocol) |  | — | `opt` | — | actif | — |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `pf3-c1-e1` | analyse | 300 | active | `IFACE_CONFIG iface=lan ip=192.168.1.1/24` | Exercice 1 — Validateur d’assignation d’interfaces et calcul de sous-réseau CIDR |
| `pf3-c1-e2` | analyse | 300 | active | `GUI_RULE action=pass iface=lan proto=tcp src=192.168.1.0/24 dst=any port=443` | Exercice 2 — Convertisseur de règles pfSense WebGUI vers syntaxe native FreeBSD PF (pf.conf) |
| `pf3-c1-e3` | analyse | 300 | active | `DHCP_CHECK subnet=192.168.1.0/24 pool_start=192.168.1.100 pool_end=192.168.1.200 static_ip=192.168.1.50` | Exercice 3 — Auditeur de plage DHCP pfSense et détection de conflit de baux statiques |

- QCM : 1 bloc(s), **8 question(s)**.
- Encadres pedagogiques : 9 (`.box`, variantes `box--*`).
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
- Blocs `pre` : 4 · elements `code` : 73
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-shield`, `#i-play`, `#i-target`, `#i-warning`, `#i-book`, `#i-lightbulb`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3909 mots · 550 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `../assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `../assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 4

## 10. Classes et attributs data observes

Classes distinctes : 69. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `opt` | 32 |
| `ic` | 19 |
| `box` | 9 |
| `box__title` | 9 |
| `card` | 9 |
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
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

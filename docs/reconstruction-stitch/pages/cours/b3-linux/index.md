# Linux Avancé B3

> Fiche extraite du fichier `b3-linux/index.html` (213 lignes, 16.6 Ko, sha256 `84b360ec2cc2`).
> Famille : **cours-b3-linux** · sous-type : `index` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-linux/index.html` |
| Titre du document | Linux Avancé B3 — Noyau Linux, Systemd, Cgroups v2 &amp; Sécurité B3 |
| Description meta | Formation d’excellence en ingénierie système Linux pour le Bachelor 3 : architecture interne du noyau et diagnostic système (/proc, /sys, espace d’adressage virtuel VMMAP, détection de violations W^X, traçabilité des appels système avec strace et codes errno), gestion avancée de l’init avec systemd (PID 1, syntaxe déclarative des unités service/timer, graphe de dépendances directed acyclic graph DAG, détection de cycles After/Before/Requires et requêtes journald avec décodage des priorités RFC 5424), ingénierie du stockage d’entreprise (Logical Volume Manager LVM, calcul des Physical Extents PE, snapshots Copy-On-Write COW, surveillance d’états et reconstruction RAID logiciel mdadm, et détection de saturation des métadonnées d’inodes vs blocs de données), fondements de la conteneurisation moderne (les 8 Namespaces Linux PID/MNT/NET/IPC/UTS/USER/CGROUP/TIME, hiérarchie unifiée Cgroups v2 sous /sys/fs/cgroup, régulation stricte cpu.max et memory.max, et mécanique de sacrifice de l’OOM Killer avec oom_score_adj), réseau virtuel avancé et routage par politiques (interconnexion de conteneurs avec paires veth et ponts logiciels Linux bridge, suite moderne iproute2, Policy-Based Routing PBR avec tables multiples via ip rule et séquence de résolution /etc/nsswitch.conf), et durcissement sécuritaire du noyau Linux (paramétrage /etc/sysctl.conf, randomisation ASLR, masquage de pointeurs kptr_restrict, architecture modulaire PAM avec drapeaux required/requisite/sufficient, et traçabilité inaltérable avec auditd pour la détection d’élévations de privilèges EUID=0). |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | — |
| Regle d'acces | Libre (aucun compte) |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Linux Avancé B3 |
| 3 | h2 | — | Parcours d’apprentissage |
| 4 | h2 | — | Ingénierie Système & Philosophie de Linux Avancé en Troisième Année |

## 3. Hierarchie des titres

- **H1** — Linux Avancé B3
  - **H2** — Parcours d’apprentissage
    - **H3** — Noyau Linux, Pseudo-FS (/proc, /sys) & Appels Système
    - **H3** — Initialisation & Gestionnaire de Services Systemd Avancé
    - **H3** — Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes
    - **H3** — Isolation & Conteneurisation Noyau : Namespaces & Cgroups v2
    - **H3** — Réseau Avancé Linux : Namespaces, Bridges & Policy Routing
    - **H3** — Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd)
  - **H2** — Ingénierie Système & Philosophie de Linux Avancé en Troisième Année

## 4. Navigation et liens

| Zone | Classe | Liens |
|---|---|---|
| nav | `skip-nav` | Aller au contenu → `#content` |
| nav | `b3-linuxnav` | Portail → `/`<br>Linux Avancé B3 → `index.html`<br>Sommaire → `sommaire.html`<br>Ch. 1 → `chapitres/chapitre1.html`<br>Ch. 2 → `chapitres/chapitre2.html`<br>Ch. 3 → `chapitres/chapitre3.html`<br>Ch. 4 → `chapitres/chapitre4.html`<br>Ch. 5 → `chapitres/chapitre5.html`<br>Ch. 6 → `chapitres/chapitre6.html`<br>Cartes → `chapitres/cartes.html`<br>Mémo → `chapitres/formules.html`<br>Exercices → `chapitres/exercices.html`<br>Atelier → `atelier.html`<br>Examen → `chapitres/examens.html` |
| header | `hero` | Démarrer le cours → `chapitres/chapitre1.html`<br>Voir le sommaire → `sommaire.html`<br>Laboratoire Linux Avancé → `atelier.html` |

Liens sortants : **25** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Linux Avancé B3 | `index.html` | `b3-linux/index.html` | interne |
| Sommaire | `sommaire.html` | `b3-linux/sommaire.html` | interne |
| Ch. 1 | `chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Ch. 2 | `chapitres/chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |
| Ch. 3 | `chapitres/chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |
| Ch. 4 | `chapitres/chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |
| Ch. 5 | `chapitres/chapitre5.html` | `b3-linux/chapitres/chapitre5.html` | interne |
| Ch. 6 | `chapitres/chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |
| Cartes | `chapitres/cartes.html` | `b3-linux/chapitres/cartes.html` | interne |
| Mémo | `chapitres/formules.html` | `b3-linux/chapitres/formules.html` | interne |
| Exercices | `chapitres/exercices.html` | `b3-linux/chapitres/exercices.html` | interne |
| Atelier | `atelier.html` | `b3-linux/atelier.html` | interne |
| Examen | `chapitres/examens.html` | `b3-linux/chapitres/examens.html` | interne |
| Démarrer le cours | `chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Voir le sommaire | `sommaire.html` | `b3-linux/sommaire.html` | interne |
| Laboratoire Linux Avancé | `atelier.html` | `b3-linux/atelier.html` | interne |
| Noyau Linux, Pseudo-FS (/proc, /sys) & Appels Système | `chapitres/chapitre1.html` | `b3-linux/chapitres/chapitre1.html` | interne |
| Initialisation & Gestionnaire de Services Systemd Avancé | `chapitres/chapitre2.html` | `b3-linux/chapitres/chapitre2.html` | interne |
| Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes | `chapitres/chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |
| Isolation & Conteneurisation Noyau : Namespaces & Cgroups v2 | `chapitres/chapitre4.html` | `b3-linux/chapitres/chapitre4.html` | interne |
| Réseau Avancé Linux : Namespaces, Bridges & Policy Routing | `chapitres/chapitre5.html` | `b3-linux/chapitres/chapitre5.html` | interne |
| Sécurité Avancée, Durcissement du Noyau, PAM & Auditing (auditd) | `chapitres/chapitre6.html` | `b3-linux/chapitres/chapitre6.html` | interne |
| … | | | 1 lien(s) supplementaire(s) |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |

## 7. Composants pedagogiques et etats observes

- Encadres pedagogiques : 1 (`.box`, variantes `box--*`).

Etats et interactions a reconstruire :

- En-tête : marque + 3 liens (Epreuves, Atelier, Mon compte) + bouton profil + bascule de thème.
- Etat `prepLockedMsg` : bandeau « L'atelier est protege » si `?preparation=locked`, refermable.
- Filtre de niveau : 4 onglets (B1/B2/B3/Tous), onglet actif noir, persistance `portal_selected_level`.
- Recherche : champ `#courseSearch`, filtrage en direct sur `data-title` ; compteur `#activeFilterCount`.
- Etat vide : `#portalEmptyState` (bloc pointille) avec bouton de reinitialisation des filtres.
- Carte « Reprendre » : masquee par defaut (`hidden`), visible si progression locale > 0.
- Utilisateur connecte : bouton profil marque `is-authenticated`, nom en title/aria-label.

## 8. Tableaux, code et medias

- Tableaux : 0
- Blocs `pre` : 0 · elements `code` : 12
- SVG inline : 22 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-layers`, `#i-clock`, `#i-arrow-right`, `#i-info`
- Volume de texte : ~666 mots · 199 noeuds HTML

## 9. Ressources chargees

- Feuilles de style : `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap`, `/assets/css/tokens.css`, `assets/css/cours.css`, `/assets/css/code-lab.css`, `/assets/vendor/katex/katex.min.css`
- Scripts externes : `/assets/js/theme.js`, `assets/js/cours.js`, `/assets/vendor/katex/katex.min.js`, `/assets/vendor/katex/auto-render.min.js`, `/assets/js/code-lab.js`
- Blocs `<style>` inline : 0 · scripts inline : 1

## 10. Classes et attributs data observes

Classes distinctes : 42. Les plus frequentes :

| Classe | Occurrences |
|---|---|
| `ic` | 20 |
| `badge` | 7 |
| `card` | 6 |
| `card__head` | 6 |
| `card__num` | 6 |
| `card__title` | 6 |
| `card__desc` | 6 |
| `card__foot` | 6 |
| `card__time` | 6 |
| `card__link` | 6 |
| `btn` | 4 |
| `stat` | 4 |
| `stat__val` | 4 |
| `stat__lbl` | 4 |
| `btn--lg` | 3 |
| `btn--primary` | 2 |
| `skip-nav` | 1 |
| `skip-link` | 1 |
| `b3-linuxnav` | 1 |
| `b3-linuxnav__in` | 1 |

Aucun attribut `data-*`.

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

# Chapitre 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI)

> Fiche extraite du fichier `b3-virtualisation/chapitres/chapitre6.html` (520 lignes, 41.1 Ko, sha256 `c8b769fe014c`).
> Famille : **cours-b3-virtualisation** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-virtualisation/chapitres/chapitre6.html` |
| Titre du document | Module 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI) \| Virtualisation Avancée B3 |
| Description meta | Module 6 du cours Virtualisation Avancée B3 : Sauvegarde moderne sans agent par Changed Block Tracking (CBT) et APIs VADP, quiescing VSS, durcissement de sécurité ESXi (Lockdown mode, vTPM, chiffrement VM Encryption), architectures de virtualisation de postes VDI (VMware Horizon, Citrix HDX, Instant Clones) et dimensionnement IOPS Boot Storm. Notions clés, démonstrations, ateliers de code interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 6 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI) |
| 3 | h2 | — | 1. Sauvegarde d'Infrastructure Moderne : Changed Block Tracking (CBT) & APIs VADP |
| 4 | h2 | — | 2. Sécurité & Durcissement des Hyperviseurs : Lockdown Mode, TPM 2.0 & VM Encryption |
| 5 | h2 | — | 3. Virtualisation du Poste de Travail (VDI) : Architectures & Protocoles d'Affichage |
| 6 | h2 | — | 4. Dimensionnement du Stockage VDI & Absorption du Boot Storm |
| 7 | h2 | — | 5. Études de cas & applications pratiques |
| 8 | h2 | — | 6. QCM — niveau examen |
| 9 | h2 | — | 7. Erreurs classiques — récapitulatif |
| 10 | h2 | — | 8. Méthodologie de résolution |
| 11 | h2 | — | 9. Révision active |
| 12 | h2 | — | 10. Test de maîtrise |
| 13 | .lab | code lab | 3 bloc(s) |
| 14 | .qcm | QCM | 8 question(s) |
| 15 | table | — | 1 tableau(x) |

## 3. Hierarchie des titres

- **H1** — Chapitre 6 — Sauvegarde Avancée (CBT), Sécurité & Virtualisation du Poste de Travail (VDI)
  - **H2** — 1. Sauvegarde d'Infrastructure Moderne : Changed Block Tracking (CBT) & APIs VADP
      - **H4** — Mécanisme du Changed Block Tracking (CBT)
      - **H4** — Cohérence Applicative & Quiescing VSS
  - **H2** — 2. Sécurité & Durcissement des Hyperviseurs : Lockdown Mode, TPM 2.0 & VM Encryption
  - **H2** — 3. Virtualisation du Poste de Travail (VDI) : Architectures & Protocoles d'Affichage
      - **H4** — Pools de Postes Virtuels
      - **H4** — Protocoles d'Affichage Haute Performance
  - **H2** — 4. Dimensionnement du Stockage VDI & Absorption du Boot Storm
      - **H4** — Profils d'Utilisateurs & Besoins en IOPS
      - **H4** — Prise en Compte du Boot Storm
  - **H2** — 5. Études de cas & applications pratiques
    - **H3** — Exercice 1 — Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU
    - **H3** — Exercice 2 — Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage)
    - **H3** — Exercice 3 — Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking)
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
| nav | `b3-virtualisationnav` | Portail → `/`<br>Virtualisation Avancée B3 → `../index.html`<br>Sommaire → `../sommaire.html`<br>Ch. 1 → `../chapitres/chapitre1.html`<br>Ch. 2 → `../chapitres/chapitre2.html`<br>Ch. 3 → `../chapitres/chapitre3.html`<br>Ch. 4 → `../chapitres/chapitre4.html`<br>Ch. 5 → `../chapitres/chapitre5.html`<br>Ch. 6 → `../chapitres/chapitre6.html`<br>Cartes → `../chapitres/cartes.html`<br>Mémo → `../chapitres/formules.html`<br>Exercices → `../chapitres/exercices.html`<br>Atelier → `../atelier.html`<br>Examen → `../chapitres/examen-blanc.html` |

Liens sortants : **21** (externes : 0).

| Libelle | href | Cible resolue | Type |
|---|---|---|---|
| Aller au contenu | `#content` | `#content` | ancre |
| Portail | `/` | `.` | interne |
| Virtualisation Avancée B3 | `../index.html` | `b3-virtualisation/index.html` | interne |
| Sommaire | `../sommaire.html` | `b3-virtualisation/sommaire.html` | interne |
| Ch. 1 | `../chapitres/chapitre1.html` | `b3-virtualisation/chapitres/chapitre1.html` | interne |
| Ch. 2 | `../chapitres/chapitre2.html` | `b3-virtualisation/chapitres/chapitre2.html` | interne |
| Ch. 3 | `../chapitres/chapitre3.html` | `b3-virtualisation/chapitres/chapitre3.html` | interne |
| Ch. 4 | `../chapitres/chapitre4.html` | `b3-virtualisation/chapitres/chapitre4.html` | interne |
| Ch. 5 | `../chapitres/chapitre5.html` | `b3-virtualisation/chapitres/chapitre5.html` | interne |
| Ch. 6 | `../chapitres/chapitre6.html` | `b3-virtualisation/chapitres/chapitre6.html` | interne |
| Cartes | `../chapitres/cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo | `../chapitres/formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Exercices | `../chapitres/exercices.html` | `b3-virtualisation/chapitres/exercices.html` | interne |
| Atelier | `../atelier.html` | `b3-virtualisation/atelier.html` | interne |
| Examen | `../chapitres/examen-blanc.html` | `b3-virtualisation/chapitres/examen-blanc.html` | interne |
| Réviser avec les flashcards | `cartes.html` | `b3-virtualisation/chapitres/cartes.html` | interne |
| Mémo syntaxe | `formules.html` | `b3-virtualisation/chapitres/formules.html` | interne |
| Atelier de code | `../atelier.html` | `b3-virtualisation/atelier.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| Le fichier se terminant par -ctk.vmdk. |  | — | `opt` | — | actif | data-correct=1 |
| Le fichier se terminant par -flat.vmdk. |  | — | `opt` | — | actif | — |
| Le fichier se terminant par .nvram. |  | — | `opt` | — | actif | — |
| Le fichier se terminant par .vswp. |  | — | `opt` | — | actif | — |
| Elle garantit que les bases de données (SQL, Exchange) ont vidé leurs caches en mémoire su |  | — | `opt` | — | actif | data-correct=1 |
| Elle compresse les fichiers vidéo avec le codec MP4 haute définition. |  | — | `opt` | — | actif | — |
| Elle augmente la vitesse d'affichage des cartes graphiques virtuelles. |  | — | `opt` | — | actif | — |
| Elle permet de supprimer le mot de passe administrateur de la machine virtuelle. |  | — | `opt` | — | actif | — |
| Toute connexion administrative directe à l'hôte ESXi (web client, API), n'autorisant la ge |  | — | `opt` | — | actif | data-correct=1 |
| Tous les accès aux disques durs de l'hyperviseur pendant 24 heures. |  | — | `opt` | — | actif | — |
| L'accès à Internet pour l'ensemble des machines virtuelles du cluster. |  | — | `opt` | — | actif | — |
| Le démarrage des processeurs Intel si la température dépasse 30 degrés. |  | — | `opt` | — | actif | — |
| La puce de sécurité TPM 2.0 (Trusted Platform Module) associée à Secure Boot. |  | — | `opt` | — | actif | data-correct=1 |
| Le contrôleur RAID matériel de la baie de disques. |  | — | `opt` | — | actif | — |
| La carte réseau Gigabit Ethernet intégrée à la carte mère. |  | — | `opt` | — | actif | — |
| La batterie de secours du contrôleur de cache de stockage. |  | — | `opt` | — | actif | — |
| Les VM sont détruites à la déconnexion et recréées à l'identique depuis une image de référ |  | — | `opt` | — | actif | data-correct=1 |
| Chaque utilisateur a un disque dur fixe qui ne peut jamais être effacé ni mis à jour. |  | — | `opt` | — | actif | — |
| Les postes virtuels ne peuvent fonctionner que pendant 15 minutes par jour. |  | — | `opt` | — | actif | — |
| Le système d'exploitation doit impérativement être installé sur une clé USB. |  | — | `opt` | — | actif | — |
| VMware Blast Extreme. |  | — | `opt` | — | actif | data-correct=1 |
| Microsoft Remote Desktop Protocol (RDP) classique. |  | — | `opt` | — | actif | — |
| Protocole de terminal Telnet sur port 23. |  | — | `opt` | — | actif | — |
| File Transfer Protocol (FTP) en mode passif. |  | — | `opt` | — | actif | — |
| L'avalanche d'E/S disques simultanées lors du démarrage matinal massif de centaines de pos |  | — | `opt` | — | actif | data-correct=1 |
| Un orage électrique provoquant une coupure de courant dans le centre de données. |  | — | `opt` | — | actif | — |
| La propagation fulgurante d'un ver informatique entre machines virtuelles. |  | — | `opt` | — | actif | — |
| L'inondation des ventilateurs de serveurs par de la poussière. |  | — | `opt` | — | actif | — |
| 6 000 IOPS. |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `vrt3-c6-e1` | analyse | 300 | active | `UUID=a84f32c1-829d-43cb-b09e-128492049182 NAME=Control-Domain DOMAIN_TYPE=DOM0 VIRT_MODE=NATIVE MEMORY_MB=4096 VCPUS=4 UUID=b95e41a2-918c-42ba-c18f-993849182931 NAME=Linux-Web01 DOMAIN_TYPE=DOMU VIRT_MODE=PV MEMORY_MB=8192 VCPUS=2 UUID=c12a93e3-718a-41aa-d09a-449182930192 NAME=Win-Desktop DOMAIN_TYPE=DOMU VIRT_MODE=HVM MEMORY_MB=16384 VCPUS=8` | Exercice 1 — Parseur de Métadonnées XenServer / Citrix Hypervisor & Rôles Dom0 / DomU |
| `vrt3-c6-e2` | analyse | 300 | active | `CATALOG=CallCenter PROFILE=TASK_WORKER USERS=100 CONCURRENT_PCT=80.0 CATALOG=Engineering PROFILE=POWER_USER USERS=20 CONCURRENT_PCT=100.0 CATALOG=Sales PROFILE=KNOWLEDGE_WORKER USERS=50 CONCURRENT_PCT=60.0` | Exercice 2 — Dimensionneur de Catalogue VDI (Postes Virtuels, IOPS par Utilisateur, RAM & Stockage) |
| `vrt3-c6-e3` | analyse | 300 | active | `VM=vm-database SIZE_GB=500 DAILY_CHANGE_PCT=5.0 RETENTION_DAYS=7 DEDUP_RATIO=2.0 RESTORE_MBPS=150 VM=vm-app-server SIZE_GB=100 DAILY_CHANGE_PCT=2.0 RETENTION_DAYS=14 DEDUP_RATIO=2.5 RESTORE_MBPS=100` | Exercice 3 — Calculateur de RPO/RTO & Volumétrie Sauvegarde Incrémentielle CBT (Changed Block Tracking) |

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

- Tableaux : 1 (0 lignes / 3 en-tetes)
- Blocs `pre` : 4 · elements `code` : 37
- SVG inline : 20 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-vm`, `#i-play`, `#i-target`, `#i-book`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~3579 mots · 523 noeuds HTML

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
| `q` | 8 |
| `q__stem` | 8 |
| `opts` | 8 |
| `q__exp` | 8 |
| `box` | 6 |
| `box__title` | 6 |
| `card` | 6 |
| `btn` | 4 |
| `bandrow` | 4 |
| `tag` | 3 |
| `grid` | 3 |
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

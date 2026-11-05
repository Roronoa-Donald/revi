# Chapitre 2 — Initialisation & Gestionnaire de Services Systemd Avancé

> Fiche extraite du fichier `b3-linux/chapitres/chapitre2.html` (499 lignes, 34.7 Ko, sha256 `788a8973dcf8`).
> Famille : **cours-b3-linux** · sous-type : `chapitre` · statut : **servi-canonique**.
> Cette fiche decrit ce que le document contient reellement ; les elements deduits du JavaScript sont signales `[deduit]` et references au document thematique.

## 1. Identite et acces

| Champ | Valeur |
|---|---|
| URL servie | `/b3-linux/chapitres/chapitre2.html` |
| Titre du document | Chapitre 2 — Initialisation &amp; Gestionnaire de Services Systemd Avancé \| Linux Avancé B3 |
| Description meta | Chapitre 2 du cours Linux Avancé B3 : Séquence d’initialisation (UEFI, GRUB2, initramfs), architecture de Systemd (PID 1), gestion déclarative des unités (.service, .socket, .target), graphes de dépendances et analyse de journaux avec journald. Notions fondamentales, ateliers de programmation interactifs, QCM corrigés. |
| Robots | indexable (defaut) |
| Langue / theme | `fr` / `defaut` |
| Chapitre (body) | 2 |
| Regle d'acces | Compte connecte + niveau B3 ou superieur + abonnement actif |
| Statut de service | servi-canonique |

## 2. Structure du document (ordre observe)

| # | Element | Classe / role | Contenu cle |
|---|---|---|---|
| 1 | nav | skip-nav | 1 liens, aria="Accès rapide" |
| 2 | h1 | — | Chapitre 2 — Initialisation & Gestionnaire de Services Systemd Avancé |
| 3 | h2 | — | 1. La Séquence d’Initialisation Linux : De l’UEFI à Systemd (PID 1) |
| 4 | h2 | — | 2. Architecture des Unités Systemd : Types d’Unités & Directives |
| 5 | h2 | — | 3. Ordonnancement, Graphes de Dépendances & Socket Activation |
| 6 | h2 | — | 4. Journalisation Centralisée avec systemd-journald & journalctl |
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

- **H1** — Chapitre 2 — Initialisation & Gestionnaire de Services Systemd Avancé
  - **H2** — 1. La Séquence d’Initialisation Linux : De l’UEFI à Systemd (PID 1)
      - **H4** — 1. Matériel & Chargeur d’Amorçage (GRUB2)
      - **H4** — 2. Noyau, initramfs & switch_root
  - **H2** — 2. Architecture des Unités Systemd : Types d’Unités & Directives
  - **H2** — 3. Ordonnancement, Graphes de Dépendances & Socket Activation
      - **H4** — Dépendances vs Ordonnancement
      - **H4** — La Révolution de la Socket Activation
  - **H2** — 4. Journalisation Centralisée avec systemd-journald & journalctl
  - **H2** — 5. Exercices de code
    - **H3** — Exercice 1 — Validateur d’unité de service Systemd ([Unit], [Service], [Install])
    - **H3** — Exercice 2 — Résolveur de dépendances et détection de cycles Systemd
    - **H3** — Exercice 3 — Parseur et filtreur d’événements Systemd Journald
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
| Chapitre 3 — Gestion Avancée du Stockage : LVM, RAID Logiciel & Inodes | `chapitre3.html` | `b3-linux/chapitres/chapitre3.html` | interne |

## 5. Formulaires et champs

Aucun formulaire dans cette page.
## 6. Boutons et controles interactifs

| Libelle | type | id | classes | aria-label | Etat initial | data-* |
|---|---|---|---|---|---|---|
| (icone) | button | themeToggle | `theme-toggle` | Activer le mode sombre | actif | — |
| bash (PID 100) |  | — | `opt` | — | actif | — |
| systemd (PID 1) |  | — | `opt` | — | actif | data-correct=1 |
| grub2 (PID 0) |  | — | `opt` | — | actif | — |
| sshd (PID 2) |  | — | `opt` | — | actif | — |
| Parce que le système de fichiers ext4 interdit les chemins relatifs |  | — | `opt` | — | actif | — |
| Parce que Systemd s’exécute dans un environnement sans variable $PATH prédéfinie pour gara |  | — | `opt` | — | actif | data-correct=1 |
| Parce que les chemins relatifs consomment trop de mémoire dans le cache du processeur |  | — | `opt` | — | actif | — |
| Parce que Python refuse de s’exécuter avec des chemins relatifs |  | — | `opt` | — | actif | — |
| Requires=B.service |  | — | `opt` | — | actif | — |
| After=B.service |  | — | `opt` | — | actif | data-correct=1 |
| Wants=B.service |  | — | `opt` | — | actif | — |
| WantedBy=B.service |  | — | `opt` | — | actif | — |
| [Unit] |  | — | `opt` | — | actif | — |
| [Service] |  | — | `opt` | — | actif | — |
| [Install] |  | — | `opt` | — | actif | data-correct=1 |
| [Target] |  | — | `opt` | — | actif | — |
| Forcer tous les services à communiquer obligatoirement par des connexions Wi-Fi |  | — | `opt` | — | actif | — |
| Systemd écoute sur le socket dès le boot et ne démarre le démon en mémoire que lorsqu’un c |  | — | `opt` | — | actif | data-correct=1 |
| Chiffrer toutes les communications réseau avec une clé asymétrique RSA |  | — | `opt` | — | actif | — |
| Désactiver le pare-feu pendant l’exécution du service |  | — | `opt` | — | actif | — |
| cat /var/log/messages |  | — | `opt` | — | actif | — |
| journalctl -u mon-service.service -f |  | — | `opt` | — | actif | data-correct=1 |
| tail -f /proc/kmsg |  | — | `opt` | — | actif | — |
| dmesg --follow-all |  | — | `opt` | — | actif | — |
| systemctl restart all |  | — | `opt` | — | actif | — |
| systemctl daemon-reload |  | — | `opt` | — | actif | data-correct=1 |
| reboot |  | — | `opt` | — | actif | — |
| update-initramfs -u |  | — | `opt` | — | actif | — |
| Restart=on-failure |  | — | `opt` | — | actif | data-correct=1 |
| … | | | | | | 3 de plus |

## 7. Composants pedagogiques et etats observes

| Exercice | Langage | Hauteur | Correction | Entree standard | Titre |
|---|---|---|---|---|---|
| `lx3-c2-e1` | shell | 300 | suspendue | `SERVICE_DEF name=api.service desc="Backend API" exec_start=/usr/bin/python3 wanted_by=multi-user.target` | Exercice 1 — Validateur d’unité de service Systemd ([Unit], [Service], [Install]) |
| `lx3-c2-e2` | shell | 300 | suspendue | `UNIT_DEP name=db.service requires=NONE UNIT_DEP name=web.service requires=db.service` | Exercice 2 — Résolveur de dépendances et détection de cycles Systemd |
| `lx3-c2-e3` | shell | 300 | suspendue | `JOURNAL id=1 priority=6 unit=sshd.service msg="Server listening on port 22"` | Exercice 3 — Parseur et filtreur d’événements Systemd Journald |

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
- Blocs `pre` : 7 · elements `code` : 57
- SVG inline : 21 · images : 0
- Icones du sprite utilisees : `#i-house`, `#i-terminal`, `#i-play`, `#i-target`, `#i-info`, `#i-lightbulb`, `#i-warning`, `#i-compass`, `#i-pin`, `#i-cards`, `#i-file`, `#i-chart`, `#i-arrow-left`, `#i-arrow-right`
- Volume de texte : ~2728 mots · 500 noeuds HTML

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
